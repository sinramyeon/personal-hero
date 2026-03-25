import { useState, useRef, useEffect } from "react";
import i18n from "./i18n";
import "./PhotoUpload.css";

function getSteps(L) {
  return [
    { key: "face", title: L.faceTitle, desc: L.faceDesc, hint: L.faceHint, min: 2, max: 3 },
    { key: "body", title: L.bodyTitle, desc: L.bodyDesc, hint: L.bodyHint, min: 2, max: 3 },
    { key: "outfit", title: L.outfitTitle, desc: L.outfitDesc, hint: L.outfitHint, min: 2, max: 3 },
  ];
}

function compressImage(file) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const MAX = 400;
      let w = img.width, h = img.height;
      if (w > MAX || h > MAX) {
        if (w > h) { h = Math.round(h * MAX / w); w = MAX; }
        else { w = Math.round(w * MAX / h); h = MAX; }
      }
      canvas.width = w; canvas.height = h;
      canvas.getContext("2d").drawImage(img, 0, 0, w, h);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.4);
      URL.revokeObjectURL(img.src);
      resolve({ base64: dataUrl.split(",")[1], mediaType: "image/jpeg" });
    };
    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      // canvas 실패 시 → createImageBitmap으로 재시도 (HEIC 지원)
      createImageBitmap(file).then((bmp) => {
        const canvas = document.createElement("canvas");
        const MAX = 400;
        let w = bmp.width, h = bmp.height;
        if (w > MAX || h > MAX) {
          if (w > h) { h = Math.round(h * MAX / w); w = MAX; }
          else { w = Math.round(w * MAX / h); h = MAX; }
        }
        canvas.width = w; canvas.height = h;
        canvas.getContext("2d").drawImage(bmp, 0, 0, w, h);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.4);
        resolve({ base64: dataUrl.split(",")[1], mediaType: "image/jpeg" });
      }).catch(() => {
        // 최후 수단: FileReader지만 리사이즈 불가 → 스킵
        console.error("Cannot compress:", file.name);
        resolve(null);
      });
    };
    img.src = URL.createObjectURL(file);
  });
}


export default function PhotoUpload({ onAnalyze, lang }) {
  const L = i18n[lang];
  const STEPS = getSteps(L);
  const [step, setStep] = useState(0);
  const [allPhotos, setAllPhotos] = useState({ face: [], body: [], outfit: [] });
  const [allPreviews, setAllPreviews] = useState({ face: [], body: [], outfit: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const current = STEPS[step];
  const photos = allPhotos[current.key];
  const previews = allPreviews[current.key];

  const handleFiles = (files) => {
    const key = current.key;
    const up = [...allPhotos[key]], upP = [...allPreviews[key]];
    for (const f of files) {
      if (up.length >= current.max) break;
      if (!f.type.startsWith("image/")) continue;
      if (f.size > 5 * 1024 * 1024) { setError(f.name + " - " + L.sizeError); continue; }
      up.push(f); upP.push(URL.createObjectURL(f));
    }
    setAllPhotos({ ...allPhotos, [key]: up });
    setAllPreviews({ ...allPreviews, [key]: upP });
  };
  const handleChange = (e) => { handleFiles(Array.from(e.target.files)); e.target.value = ""; };
  const handleDrop = (e) => { e.preventDefault(); handleFiles(Array.from(e.dataTransfer.files)); };
  const removeFile = (i) => {
    const key = current.key;
    URL.revokeObjectURL(allPreviews[key][i]);
    setAllPhotos({ ...allPhotos, [key]: allPhotos[key].filter((_, j) => j !== i) });
    setAllPreviews({ ...allPreviews, [key]: allPreviews[key].filter((_, j) => j !== i) });
  };
  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const images = {};
      for (const s of STEPS) {
        const results = await Promise.all(allPhotos[s.key].map(compressImage));
        images[s.key] = results.filter(Boolean);
      }
      await onAnalyze(images);
    } catch (err) { setError(L.uploadError + err.message); }
    finally { setLoading(false); }
  };
  
  // Prevent accidental navigation during analysis
  useEffect(() => {
    if (!loading) return;
    const handler = (e) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [loading]);

  const canNext = photos.length >= current.min;
  const isLast = step === STEPS.length - 1;

  if (loading) return (
    <div className="upload-container">
      <div className="upload-card" style={{ padding: "4rem 2rem" }}>
        <div className="loader-wrap">
          <div className="loader-spinner" />
          <p className="loader-title">{L.btnAnalyzing}</p>
          <p className="loader-sub">{lang === "kr" ? "AI가 사진을 분석하고 있어요" : "AI is analyzing your photos"}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="upload-container">
      <div className="upload-card">
        <div className="step-indicator">
          {STEPS.map((s, i) => (
            <div key={s.key} className="step-dot-wrap">
              <div className={"step-dot" + (i < step ? " done" : "") + (i === step ? " active" : "")}>
                {i < step ? "\u2713" : i + 1}
              </div>
              {i < STEPS.length - 1 && <div className={"step-line" + (i < step ? " done" : "")} />}
            </div>
          ))}
        </div>
        <h2>{current.title}</h2>
        <p className="upload-desc">{current.desc}</p>
        <div className="dropzone" onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
          {previews.length === 0 ? (
            <>
              <span className="dropzone-icon">+</span>
              <span className="dropzone-text">{L.dropText}</span>
              <span className="dropzone-hint">{current.hint}</span>
            </>
          ) : (
            <div className="preview-grid">
              {previews.map((src, i) => (
                <div key={i} className="preview-item">
                  <img src={src} alt="" />
                  <button className="remove-btn" onClick={(e) => { e.stopPropagation(); removeFile(i); }}>&times;</button>
                </div>
              ))}
              {photos.length < current.max && <div className="preview-add"><span>+</span></div>}
            </div>
          )}
        </div>
        <input ref={inputRef} type="file" accept="image/*" multiple onChange={handleChange} style={{ display: "none" }} />
        <p className="upload-count">{photos.length}/{current.max}{L.uploadUnit}</p>
        <p className="upload-privacy">{lang === "kr" ? "사진은 분석 후 즉시 삭제돼요" : "Photos are deleted after analysis"}</p>
        {error && <p className="upload-error">{error}</p>}
        <div className="btn-row">
          {step > 0 && <button className="back-btn" onClick={() => setStep(step - 1)}>{L.btnPrev}</button>}
          {isLast ? (
            <button className="analyze-btn" disabled={!canNext || loading} onClick={handleSubmit}>
              {loading ? L.btnAnalyzing : L.btnAnalyze}
            </button>
          ) : (
            <button className="next-btn" disabled={!canNext} onClick={() => setStep(step + 1)}>{L.btnNext}</button>
          )}
        </div>
      </div>
    </div>
  );
}

