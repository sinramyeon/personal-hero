import { useState } from "react";
import i18n from "./i18n";
import "./ResultView.css";

const SEASON_ORDER = {
  kr: ["봄", "여름", "가을", "겨울"],
  en: ["Spring", "Summer", "Fall", "Winter"],
};
const SEASON_EMOJI = { "봄": "🌸", "여름": "☀️", "가을": "🍂", "겨울": "❄️", "Spring": "🌸", "Summer": "☀️", "Fall": "🍂", "Winter": "❄️" };

function LookbookSection({ looks, looksLoading, lang }) {
  const [activeSeason, setActiveSeason] = useState(0);
  const seasons = SEASON_ORDER[lang] || SEASON_ORDER.kr;

  if (looksLoading) {
    return (
      <section className="result-section lookbook-section">
        <h2 className="section-heading">{lang === "kr" ? "시즌별 룩북" : "Seasonal Lookbook"}</h2>
        <div className="lookbook-loading">
          <div className="lookbook-spinner" />
          <p>{lang === "kr" ? "AI가 룩북을 생성하고 있어요..." : "AI is generating your lookbook..."}</p>
        </div>
      </section>
    );
  }

  if (!looks || Object.keys(looks).length === 0) return null;

  const currentImages = looks[seasons[activeSeason]] || [];

  return (
    <section className="result-section lookbook-section">
      <h2 className="section-heading">{lang === "kr" ? "시즌별 룩북" : "Seasonal Lookbook"}</h2>
      <div className="season-tabs">
        {seasons.map((s, i) => (
          <button key={s}
            className={`season-tab ${i === activeSeason ? "active" : ""}`}
            onClick={() => setActiveSeason(i)}>
            <span className="season-emoji">{SEASON_EMOJI[s]}</span>
            <span>{s}</span>
          </button>
        ))}
      </div>
      <div className="lookbook-grid">
        {currentImages.map((look, i) => (
          <div key={i} className="lookbook-item">
            <img src={look.image} alt={`${seasons[activeSeason]} look ${i + 1}`} />
          </div>
        ))}
        {currentImages.length === 0 && (
          <p className="lookbook-empty">{lang === "kr" ? "이 시즌 이미지가 없어요" : "No images for this season"}</p>
        )}
      </div>
    </section>
  );
}

export default function ResultView({ result, onReanalyze, onContinue, lang, looks, looksLoading }) {
  if (!result) return null;
  const L = i18n[lang];
  const { personalColor, bodyType, styleRecommendation } = result;

  return (
    <div className="result-container">
      <div className="result-card">
        <h1 className="result-title">{L.resultTitle}</h1>

        {personalColor && (
          <section className="result-section">
            <h2 className="section-heading">{L.personalColor}</h2>
            <div className="color-badge">
              <span className="season-label">{personalColor.season}</span>
              {personalColor.subtype && <span className="subtype-label">{personalColor.subtype}</span>}
            </div>
            {personalColor.description && <p className="result-desc">{personalColor.description}</p>}
            {personalColor.bestColors?.length > 0 && (
              <div className="color-group">
                <h3>{L.bestColors}</h3>
                <div className="color-swatches">
                  {personalColor.bestColors.map((c, i) => (
                    <div key={i} className="swatch" style={{ background: c }}>
                      <span className="swatch-label">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {personalColor.worstColors?.length > 0 && (
              <div className="color-group">
                <h3>{L.avoidColors}</h3>
                <div className="color-swatches">
                  {personalColor.worstColors.map((c, i) => (
                    <div key={i} className="swatch avoid" style={{ background: c }}>
                      <span className="swatch-label">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {bodyType && (
          <section className="result-section">
            <h2 className="section-heading">{L.bodyType}</h2>
            <div className="body-badge">{bodyType.type}</div>
            {bodyType.description && <p className="result-desc">{bodyType.description}</p>}
            {bodyType.strengths?.length > 0 && (
              <div className="tip-card strengths-card">
                <h3>{L.strengths}</h3>
                <ul>
                  {bodyType.strengths.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>
            )}
            {bodyType.tips?.length > 0 && (
              <div className="tip-card tips-card">
                <h3>{L.styleTips}</h3>
                <ul>
                  {bodyType.tips.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>
            )}
          </section>
        )}

        {styleRecommendation && (
          <section className="result-section">
            <h2 className="section-heading">{L.styleReco}</h2>
            {styleRecommendation.summary && <p className="result-desc">{styleRecommendation.summary}</p>}
            <div className="do-dont-grid">
              {styleRecommendation.doList?.length > 0 && (
                <div className="tip-card do-card">
                  <h3>{L.doPick}</h3>
                  <ul>
                    {styleRecommendation.doList.map((t, i) => <li key={i}>{t}</li>)}
                  </ul>
                </div>
              )}
              {styleRecommendation.dontList?.length > 0 && (
                <div className="tip-card dont-card">
                  <h3>{L.dontPick}</h3>
                  <ul>
                    {styleRecommendation.dontList.map((t, i) => <li key={i}>{t}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        <LookbookSection looks={looks} looksLoading={looksLoading} lang={lang} />

        <div className="result-actions">
          <button className="reanalyze-btn" onClick={onReanalyze}>{L.btnReanalyze}</button>
          <button className="continue-btn" onClick={onContinue}>{L.btnContinue}</button>
        </div>
      </div>
    </div>
  );
}
