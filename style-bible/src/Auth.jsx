import { useState } from "react";
import { supabase } from "./supabaseClient";
import i18n from "./i18n";
import "./Auth.css";

const FEATURES = {
  kr: [
    { icon: "🎨", title: "퍼스널 컬러 진단", desc: "AI가 사진을 분석해 나만의 컬러 시즌을 찾아줘요" },
    { icon: "📐", title: "체형 분석", desc: "체형의 강점을 파악하고 어울리는 핏을 추천해요" },
    { icon: "👗", title: "스타일 가이드", desc: "DO & DON'T 리스트로 나만의 스타일 바이블 완성" },
  ],
  en: [
    { icon: "🎨", title: "Personal Color", desc: "AI analyzes your photos to find your color season" },
    { icon: "📐", title: "Body Analysis", desc: "Discover your strengths and best-fitting silhouettes" },
    { icon: "👗", title: "Style Guide", desc: "Get a personalized DO & DON'T style bible" },
  ],
};

export default function Auth({ lang, onToggleLang }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const L = i18n[lang];
  const features = FEATURES[lang];

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    setLoading(false);
    if (error) setError(error.message);
    else setSent(true);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="lang-toggle">
          {["KR", "EN"].map((l) => (
            <button key={l}
              className={lang === l.toLowerCase() ? "lang-active" : ""}
              onClick={() => onToggleLang(l.toLowerCase())}>{l}</button>
          ))}
        </div>

        <div className="auth-hero">
          <div className="auth-emoji">✨</div>
          <h1>{L.authTitle}</h1>
          <p className="auth-subtitle">{L.authSubtitle}</p>
        </div>

        <div className="auth-features">
          {features.map((f, i) => (
            <div key={i} className="auth-feature">
              <span className="auth-feature-icon">{f.icon}</span>
              <span className="auth-feature-text">
                <strong>{f.title}</strong> — {f.desc}
              </span>
            </div>
          ))}
        </div>

        <div className="auth-divider">
          {lang === "kr" ? "시작하기" : "Get Started"}
        </div>

        {sent ? (
          <div className="auth-sent">
            <p className="auth-sent-title">{L.authSent}</p>
            <p className="auth-sent-desc">{L.authSentDesc}</p>
          </div>
        ) : (
          <form onSubmit={handleLogin}>
            <input type="email" placeholder={L.authEmail}
              value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit" disabled={loading}>
              {loading ? "..." : L.authSend}
            </button>
            {error && <p className="auth-error">{error}</p>}
          </form>
        )}

        <p className="auth-footer">
          {lang === "kr"
            ? "비밀번호 없이 이메일 링크로 로그인해요"
            : "No password needed — we'll send you a magic link"}
        </p>
      </div>
    </div>
  );
}