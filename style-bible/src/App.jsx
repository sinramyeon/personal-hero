import { useState, useEffect, useRef } from "react";
import { supabase } from "./supabaseClient";
import i18n from "./i18n";
import Auth from "./Auth";
import PhotoUpload from "./PhotoUpload";
import ResultView from "./ResultView";
import Seol from "./Seol";
import Robe from "./Robe";
import "./App.css";

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [looks, setLooks] = useState(null);
  const [looksLoading, setLooksLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [view, setView] = useState("upload");
  const [activeTab, setActiveTab] = useState("seol");
  const faceImagesRef = useRef(null);
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem("sb-lang");
    if (saved) return saved;
    return navigator.language.startsWith("ko") ? "kr" : "en";
  });

  const L = i18n[lang];

  const toggleLang = (l) => { setLang(l); localStorage.setItem("sb-lang", l); };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { setSession(session); setLoading(false); });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) loadSavedResult();
  }, [session]);

  const loadSavedResult = async () => {
    setChecking(true);
    try {
      const { data } = await supabase
        .from("analysis_results")
        .select("result, looks")
        .eq("user_id", session.user.id)
        .maybeSingle();
      if (data?.result) {
        setResult(data.result);
        if (data.looks) setLooks(data.looks);
        setView("result");
      }
    } catch (e) { console.error(e); }
    finally { setChecking(false); }
  };

  const saveResult = async (r, l) => {
    const payload = {
      id: crypto.randomUUID(),
      user_id: session.user.id,
      result: r,
      updated_at: new Date().toISOString(),
    };
    if (l) payload.looks = l;
    await supabase.from("analysis_results").upsert(payload, { onConflict: "user_id" });
  };

  const generateLooks = async (faceImages, analysisResult) => {
    setLooksLoading(true);
    try {
      const res = await fetch("/api/generate-looks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ faceImages, analysisResult, lang }),
      });
      if (!res.ok) {
        console.error("Looks generation failed:", (await res.json()).error);
        return;
      }
      const { looks: generatedLooks } = await res.json();
      setLooks(generatedLooks);
      await saveResult(analysisResult, generatedLooks);
    } catch (e) { console.error("Looks generation error:", e); }
    finally { setLooksLoading(false); }
  };

  const handleAnalyze = async (images) => {
    // Save face images for lookbook generation
    faceImagesRef.current = images.face;

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ images }),
    });
    if (!res.ok) throw new Error((await res.json()).error || "Analysis failed");
    const { result: analysisResult } = await res.json();
    setResult(analysisResult);
    setView("result");
    await saveResult(analysisResult);

    // Start lookbook generation in background
    generateLooks(images.face, analysisResult);
  };

  const handleReanalyze = async () => {
    await supabase.from("analysis_results").delete().eq("user_id", session.user.id);
    setResult(null);
    setLooks(null);
    setView("upload");
  };

  const handleLogout = async () => { await supabase.auth.signOut(); setResult(null); setLooks(null); setView("upload"); };

  if (loading) return <div className="loading">{L.loading}</div>;
  if (!session) return <Auth lang={lang} onToggleLang={toggleLang} />;
  if (checking) return <div className="loading">{L.checkingResult}</div>;

  if (view === "upload") return <PhotoUpload onAnalyze={handleAnalyze} lang={lang} />;
  if (view === "result") return (
    <ResultView result={result} lang={lang}
      looks={looks} looksLoading={looksLoading}
      onReanalyze={handleReanalyze}
      onContinue={() => setView("bible")} />
  );

  return (
    <div className="app-container">
      <nav className="app-nav">
        <div className="nav-left">
          <button className={activeTab === "seol" ? "active" : ""} onClick={() => setActiveTab("seol")}>Seol</button>
          <button className={activeTab === "robe" ? "active" : ""} onClick={() => setActiveTab("robe")}>Robe</button>
        </div>
        <div className="nav-right">
          <button onClick={() => setView("result")}>{L.btnResults}</button>
          <button onClick={handleLogout}>{L.btnLogout}</button>
        </div>
      </nav>
      {activeTab === "seol" ? <Seol /> : <Robe />}
    </div>
  );
}
