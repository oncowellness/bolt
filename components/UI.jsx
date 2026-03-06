import React, { useState } from 'react';
import { C } from '../styles/theme';

export const inp = {
  background: "#ffffff",
  border: "1px solid #b8c9c4",
  borderRadius: 9, padding: "9px 12px", color: C.txt, fontSize: 13,
  outline: "none", width: "100%",
  fontFamily: "'Open Sans', sans-serif",
  transition: "border-color .15s, box-shadow .15s",
  lineHeight: 1.4,
};

export const btnStyle = (c = C.brand, ghost = false) => {
  const isBrand = c === C.brand;
  return {
    padding: "9px 18px", borderRadius: 9,
    border: ghost ? `1px solid #c4d0cc` : "none",
    background: ghost ? "transparent" : (isBrand ? `linear-gradient(135deg, #00d4a6, #00bf94)` : c),
    color: ghost ? C.txt : "#fff",
    fontSize: 13, fontWeight: 600, cursor: "pointer",
    fontFamily: "'Open Sans', sans-serif", letterSpacing: 0.1,
    display: "inline-flex", alignItems: "center", gap: 6,
    boxShadow: (!ghost && isBrand) ? "0 2px 8px rgba(0,122,88,0.15)" : "none",
  };
};
export const btn = btnStyle;

export const SH = ({ children, sub }) => (
  <div style={{ marginBottom: 32 }}>
    <h2 style={{ fontSize: 21, fontWeight: 700, color: C.txt, letterSpacing: -0.4, lineHeight: 1.2, marginBottom: sub ? 6 : 0 }}>{children}</h2>
    {sub && <p style={{ fontSize: 13, color: C.sub, lineHeight: 1.55, marginTop: 4 }}>{sub}</p>}
  </div>
);

export const Panel = ({ children, style = {}, accent = false }) => (
  <div style={{
    background: accent ? "rgba(0,122,88,0.04)" : C.surf,
    border: `1px solid ${accent ? C.bordBrand : C.bord}`,
    borderRadius: 16, padding: 24,
    boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)",
    ...style,
  }}>{children}</div>
);

export const SL = ({ children, color = C.sub }) => (
  <div style={{ fontSize: 13, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: 1.1, marginBottom: 16, lineHeight: 1 }}>{children}</div>
);

export const Th = ({ children, highlight, c }) => (
  <th style={{
    padding: "12px 15px", textAlign: "left", color: c || C.sub, fontWeight: 600,
    fontSize: 13, textTransform: "uppercase", letterSpacing: 1,
    borderBottom: `1px solid ${C.bord}`, whiteSpace: "nowrap",
    background: highlight ? "#eef6f2" : "#f7faf9",
    fontFamily: "'Open Sans', sans-serif",
  }}>{children}</th>
);

export const Td = ({ children, s = {}, colSpan }) => (
  <td colSpan={colSpan} style={{
    padding: "12px 15px", fontSize: 13,
    borderBottom: "1px solid #eaeeec",
    color: C.txt, fontFamily: "'Open Sans', sans-serif",
    verticalAlign: "middle",
    ...s,
  }}>{children}</td>
);

export const Badge = ({ text, color }) => (
  <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 9px", borderRadius: 7, fontSize: 13, fontWeight: 700, letterSpacing: 0.2, background: `${color}15`, color, border: `1px solid ${color}2a`, lineHeight: 1.4 }}>{text}</span>
);

export const Bar = ({ v, max, color }) => (
  <div style={{ background: "#e4eeea", borderRadius: 3, height: 4, overflow: "hidden" }}>
    <div style={{ width: `${Math.min(100, (v / max) * 100)}%`, height: '100%', background: `linear-gradient(90deg, ${color}cc, ${color})`, borderRadius: 3, transition: "width .6s cubic-bezier(0.22,1,0.36,1)" }} />
  </div>
);

export const KPIBox = ({ icon, label, value, sub, color }) => (
  <div className="ow-kpi" style={{ background: C.surf, border: `1px solid ${C.bord}`, borderRadius: 16, padding: "20px 22px", position: "relative", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
    <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: `radial-gradient(circle, ${color}20, transparent 70%)`, pointerEvents: "none" }} />
    <div style={{ fontSize: 16, marginBottom: 12, lineHeight: 1 }}>{icon}</div>
    <div style={{ fontSize: 26, fontWeight: 700, color, letterSpacing: -0.8, lineHeight: 1, marginBottom: 7 }}>{value}</div>
    <div style={{ fontSize: 13, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 1.1, marginBottom: sub ? 4 : 0 }}>{label}</div>
    {sub && <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.4 }}>{sub}</div>}
  </div>
);

export function IE({ value, onChange, type = 'text', width = 'auto' }) {
  const [editing, setEditing] = useState(false);
  const [tmp, setTmp] = useState(value);
  if (!editing)
    return (
      <span
        onClick={() => { setTmp(value); setEditing(true); }}
        title="Clic para editar"
        style={{ cursor: "pointer", borderBottom: `1px dashed rgba(0,168,122,0.4)`, color: "#007a58", fontWeight: 600, fontSize: 13.5, paddingBottom: 1, transition: "opacity .15s" }}
      >
        {type === 'number' ? Number(value).toLocaleString('es-ES') : value}
      </span>
    );
  return (
    <input
      autoFocus
      onFocus={(e) => e.target.select()}
      type={type}
      value={tmp}
      style={{
        ...inp,
        width: width === "auto" ? "110px" : width,
        padding: "4px 8px", fontSize: 13,
        display: "inline-block",
        borderColor: "rgba(0,191,148,0.5)",
        boxShadow: "0 0 0 3px rgba(0,122,88,0.08)",
      }}
      onChange={(e) => setTmp(e.target.value)}
      onBlur={() => {
        onChange(type === 'number' ? +tmp : tmp);
        setEditing(false);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') e.currentTarget.blur();
        if (e.key === 'Escape') setEditing(false);
      }}
    />
  );
}