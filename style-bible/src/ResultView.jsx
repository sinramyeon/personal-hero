import i18n from "./i18n";
import "./ResultView.css";

const SEASONS = ["Spring", "Summer", "Fall", "Winter"];
const SEASON_EMOJI = { Spring: "🌸", Summer: "☀️", Fall: "🍂", Winter: "❄️" };
const SEASON_KR = { Spring: "봄", Summer: "여름", Fall: "가을", Winter: "겨울" };

function LookbookPanel({ looks, looksLoading, looksError, onRetry, lang }) {
  const label = (s) => lang === "kr" ? SEASON_KR[s] : s;

  if (looksLoading) {
    return (
      <div className="lookbook-status">
        <div className="lookbook-spinner" />
        <p className="lookbook-status-title">{lang === "kr" ? "룩북 제작 중" : "Creating lookbook"}</p>
        <p className="lookbook-status-sub">{lang === "kr" ? "시즌별 코디를 생성하고 있어요" : "Generating seasonal outfits"}</p>
        <div className="lookbook-progress">
          {SEASONS.map((s) => (
            <div key={s} className="progress-dot">
              <span className="progress-emoji">{SEASON_EMOJI[s]}</span>
              <span className="progress-label">{label(s)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (looksError && (!looks || Object.keys(looks).length === 0)) {
    return (
      <div className="lookbook-status">
        <p className="lookbook-status-title">{lang === "kr" ? "룩북 생성 실패" : "Generation failed"}</p>
        {onRetry ? (
          <button className="lookbook-retry-btn" onClick={onRetry}>
            {lang === "kr" ? "다시 시도" : "Retry"}
          </button>
        ) : (
          <p className="lookbook-status-sub">{lang === "kr" ? "다시 분석하면 자동 생성돼요" : "Re-analyze to auto-generate"}</p>
        )}
      </div>
    );
  }

  if (!looks || Object.keys(looks).length === 0) {
    return (
      <div className="lookbook-status">
        <p className="lookbook-status-title">{lang === "kr" ? "나만의 룩북" : "Your Lookbook"}</p>
        <p className="lookbook-status-sub">{lang === "kr" ? "다시 분석하면 자동 생성돼요" : "Re-analyze to auto-generate"}</p>
      </div>
    );
  }

  return (
    <div className="lookbook-grid">
      {SEASONS.map((s) => {
        const imgs = looks[s] || looks[SEASON_KR[s]] || [];
        return imgs.map((look, i) => (
          <div key={`${s}-${i}`} className="lookbook-card">
            <div className="lookbook-item">
              <img src={look.image} alt={`${s} look`} />
            </div>
            <div className="lookbook-label">{SEASON_EMOJI[s]} {label(s)}</div>
          </div>
        ));
      })}
    </div>
  );
}

export default function ResultView({ result, onReanalyze, onLogout, onRetryLooks, lang, looks, looksLoading, looksError }) {
  if (!result) return null;
  const L = i18n[lang];
  const { personalColor, bodyType, styleRecommendation } = result;

  return (
    <div className="rv">
      {/* Sticky Header */}
      <header className="rv-header">
        <h1 className="rv-title">{L.resultTitle}</h1>
        <div className="rv-actions">
          <button className="rv-btn" onClick={onReanalyze}>{L.btnReanalyze}</button>
          <button className="rv-btn rv-btn-ghost" onClick={onLogout}>{L.btnLogout}</button>
        </div>
      </header>

      <main className="rv-body">
        {/* 1. Personal Color */}
        {personalColor && (
          <section className="rv-card">
            <h2 className="rv-heading">{L.personalColor}</h2>
            <div className="rv-badges">
              <span className="rv-badge-pink">{personalColor.season}</span>
              {personalColor.subtype && <span className="rv-badge-outline">{personalColor.subtype}</span>}
            </div>
            {personalColor.description && <p className="rv-text">{personalColor.description}</p>}
            {personalColor.bestColors?.length > 0 && (
              <div className="rv-colors">
                <h3 className="rv-sub">{L.bestColors}</h3>
                <div className="rv-swatches">
                  {personalColor.bestColors.map((c, i) => (
                    <div key={i} className="rv-swatch" style={{ background: c }}>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {personalColor.worstColors?.length > 0 && (
              <div className="rv-colors">
                <h3 className="rv-sub">{L.avoidColors}</h3>
                <div className="rv-swatches">
                  {personalColor.worstColors.map((c, i) => (
                    <div key={i} className="rv-swatch rv-swatch-avoid" style={{ background: c }}>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* 2. Body Type */}
        {bodyType && (
          <section className="rv-card">
            <h2 className="rv-heading">{L.bodyType}</h2>
            <span className="rv-badge-dark">{bodyType.type}</span>
            {bodyType.description && <p className="rv-text">{bodyType.description}</p>}
            {bodyType.strengths?.length > 0 && (
              <div className="rv-tip rv-tip-pink">
                <h3>{L.strengths}</h3>
                <ul>{bodyType.strengths.map((t, i) => <li key={i}>{t}</li>)}</ul>
              </div>
            )}
            {bodyType.tips?.length > 0 && (
              <div className="rv-tip">
                <h3>{L.styleTips}</h3>
                <ul>{bodyType.tips.map((t, i) => <li key={i}>{t}</li>)}</ul>
              </div>
            )}
          </section>
        )}

        {/* 3. Lookbook */}
        <section className="rv-card">
          <h2 className="rv-heading">{lang === "kr" ? "시즌별 룩북" : "Seasonal Lookbook"}</h2>
          <LookbookPanel looks={looks} looksLoading={looksLoading} looksError={looksError} onRetry={onRetryLooks} lang={lang} />
        </section>

        {/* 4. Style Recommendation */}
        {styleRecommendation && (
          <section className="rv-card">
            <h2 className="rv-heading">{L.styleReco}</h2>
            {styleRecommendation.summary && <p className="rv-text">{styleRecommendation.summary}</p>}
            {styleRecommendation.doList?.length > 0 && (
              <div className="rv-tip rv-tip-do">
                <h3>{L.doPick}</h3>
                <ul>{styleRecommendation.doList.map((t, i) => <li key={i}>{t}</li>)}</ul>
              </div>
            )}
            {styleRecommendation.dontList?.length > 0 && (
              <div className="rv-tip rv-tip-dont">
                <h3>{L.dontPick}</h3>
                <ul>{styleRecommendation.dontList.map((t, i) => <li key={i}>{t}</li>)}</ul>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
