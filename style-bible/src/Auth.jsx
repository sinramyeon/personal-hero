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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const L = i18n[lang];
  const features = FEATURES[lang];

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
    setLoading(false);
    if (error) setError(error.message);
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
          <div className="auth-emoji">💖</div>
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

        <button className="google-login-btn" onClick={handleGoogleLogin} disabled={loading}>
          <svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          {loading
            ? "..."
            : lang === "kr" ? "Google로 계속하기" : "Continue with Google"}
        </button>
        {error && <p className="auth-error">{error}</p>}

        <p className="auth-footer">
          {lang === "kr"
            ? "Google 계정으로 간편하게 시작하세요"
            : "Sign in quickly with your Google account"}
        </p>
      </div>
    </div>
  );
}