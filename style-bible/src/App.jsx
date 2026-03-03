import { useState } from "react";
import Seol from "./Seol";
import Robe from "./Robe";

export default function App() {
  const [active, setActive] = useState("seol");

  return (
    <div>
      <div style={{
        position: "sticky", top: 0, zIndex: 999,
        display: "flex", justifyContent: "center", gap: 0,
        background: "rgba(250,248,244,0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid #e8e4dc",
        padding: "8px 0",
      }}>
        <button onClick={() => setActive("seol")} style={{
          padding: "8px 28px", border: "none", cursor: "pointer",
          fontSize: 13, fontWeight: active === "seol" ? 700 : 400,
          color: active === "seol" ? "#c07068" : "#b0a8a0",
          background: "transparent",
          borderBottom: active === "seol" ? "2px solid #c07068" : "2px solid transparent",
          transition: "all 0.2s",
        }}>🌸 Seol</button>
        <button onClick={() => setActive("robe")} style={{
          padding: "8px 28px", border: "none", cursor: "pointer",
          fontSize: 13, fontWeight: active === "robe" ? 700 : 400,
          color: active === "robe" ? "#5C3A1E" : "#b0a8a0",
          background: "transparent",
          borderBottom: active === "robe" ? "2px solid #5C3A1E" : "2px solid transparent",
          transition: "all 0.2s",
        }}>🎸 Roberto</button>
      </div>

      {/* 콘텐츠 */}
      {active === "seol" ? <Seol /> : <Robe />}
    </div>
  );
}