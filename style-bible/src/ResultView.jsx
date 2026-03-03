import i18n from "./i18n";
import "./ResultView.css";

export default function ResultView({ result, onReanalyze, onContinue, lang }) {
  if (!result) return null;
  const L = i18n[lang];
  const { personalColor, bodyType, styleRecommendation } = result;

  return (
    <div className="result-container">
      <div className="result-card">
        <h1 className="result-title">{L.resultTitle}</h1>
        {personalColor && (
          <section className="result-section">
            <h2>{L.personalColor}</h2>
            <div className="color-badge">
              <span className="season-label">{personalColor.season}</span>
              {personalColor.subtype && <span className="subtype-label">{personalColor.subtype}</span>}
            </div>
            {personalColor.description && <p className="result-desc">{personalColor.description}</p>}
            {personalColor.bestColors?.length > 0 && (
              <div className="color-group"><h3>{L.bestColors}</h3>
                <div className="color-swatches">
                  {personalColor.bestColors.map((c, i) => (
                    <div key={i} className="swatch" style={{ background: c }}><span className="swatch-label">{c}</span></div>
                  ))}
                </div>
              </div>
            )}
            {personalColor.worstColors?.length > 0 && (
              <div className="color-group"><h3>{L.avoidColors}</h3>
                <div className="color-swatches">
                  {personalColor.worstColors.map((c, i) => (
                    <div key={i} className="swatch avoid" style={{ background: c }}><span className="swatch-label">{c}</span></div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
        {bodyType && (
          <section className="result-section">
            <h2>{L.bodyType}</h2>
            <div className="body-badge">{bodyType.type}</div>
            {bodyType.description && <p className="result-desc">{bodyType.description}</p>}
            {bodyType.strengths?.length > 0 && (
              <div className="tip-group"><h3>{L.strengths}</h3>
                <ul>{bodyType.strengths.map((t, i) => <li key={i}>{t}</li>)}</ul>
              </div>
            )}
            {bodyType.tips?.length > 0 && (
              <div className="tip-group"><h3>{L.styleTips}</h3>
                <ul>{bodyType.tips.map((t, i) => <li key={i}>{t}</li>)}</ul>
              </div>
            )}
          </section>
        )}
        {styleRecommendation && (
          <section className="result-section">
            <h2>{L.styleReco}</h2>
            {styleRecommendation.summary && <p className="result-desc">{styleRecommendation.summary}</p>}
            {styleRecommendation.doList?.length > 0 && (
              <div className="tip-group do-list"><h3>{L.doPick}</h3>
                <ul>{styleRecommendation.doList.map((t, i) => <li key={i}>{t}</li>)}</ul>
              </div>
            )}
            {styleRecommendation.dontList?.length > 0 && (
              <div className="tip-group dont-list"><h3>{L.dontPick}</h3>
                <ul>{styleRecommendation.dontList.map((t, i) => <li key={i}>{t}</li>)}</ul>
              </div>
            )}
          </section>
        )}
        <div className="result-actions">
          <button className="reanalyze-btn" onClick={onReanalyze}>{L.btnReanalyze}</button>
          <button className="continue-btn" onClick={onContinue}>{L.btnContinue}</button>
        </div>
      </div>
    </div>
  );
}