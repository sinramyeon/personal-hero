import { useState } from "react";
import { supabase } from "./supabaseClient";
import i18n from "./i18n";
import "./Auth.css";

export default function Auth({ lang, onToggleLang }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const L = i18n[lang];

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const { error } = await supabase.auth.signInWithOtp({ email });
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
        <h1>{L.authTitle}</h1>
        <p className="auth-subtitle">{L.authSubtitle}</p>
        {sent ? (
          <div className="auth-sent">
            <p className="auth-sent-title">{L.authSent}</p>
            <p className="auth-sent-desc">{L.authSentDesc}</p>
          </div>
        ) : (
          <form onSubmit={handleLogin}>
            <input type="email" placeholder={L.authEmail}
              value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit">{L.authSend}</button>
            {error && <p className="auth-error">{L.authError}: {error}</p>}
          </form>
        )}
      </div>
    </div>
  );
}