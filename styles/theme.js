export const C = {
  // Backgrounds – clean white
  bg:         "#f9fafb",
  bgDeep:     "#f1f5f3",
  surf:       "#ffffff",
  surfHover:  "#f4faf8",
  surfActive: "rgba(0,191,148,0.07)",
  glass:      "rgba(255,255,255,0.97)",
  // Borders
  bord:       "#e5e7eb",
  bordStrong: "#d1d5db",
  bordBrand:  "rgba(0,191,148,0.35)",
  // Text
  txt:   "#111827",
  sub:   "#374151",
  muted: "#6b7280",
  // Brand
  brand:      "#00bf94",
  brandLight: "#00d4a6",
  brandDim:   "rgba(0,191,148,0.08)",
  // Semantic
  blue:   "#0077b6",
  purple: "#5b44d4",
  pink:   "#b5004f",
  yellow: "#7a5700",
  orange: "#a84400",
  red:    "#c0152a",
  green:  "#00a87e",
};

export const initGlobalStyles = () => {
  const _styleId = "ow-design-system-v2";
  if (!document.getElementById(_styleId)) {
    const s = document.createElement("style");
    s.id = _styleId;
    s.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        background: #f9fafb; color: #111827; font-size: 14px;
        -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;
      }
      ::-webkit-scrollbar { width: 4px; height: 4px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(0,191,148,0.35); border-radius: 4px; }
      ::-webkit-scrollbar-thumb:hover { background: rgba(0,191,148,0.55); }
      input[type=range] {
        -webkit-appearance: none; width: 100%; height: 2px;
        background: #e5e7eb; border-radius: 2px; outline: none; cursor: pointer;
      }
      input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none; width: 15px; height: 15px; border-radius: 50%;
        background: #00bf94; border: 2px solid #ffffff;
        box-shadow: 0 0 0 2px rgba(0,191,148,0.3); cursor: pointer;
        transition: box-shadow .18s, transform .18s;
      }
      input[type=range]::-webkit-slider-thumb:hover { box-shadow: 0 0 0 5px rgba(0,191,148,0.2); transform: scale(1.1); }
      select option { background: #ffffff; color: #111827; }
      input:focus, select:focus, textarea:focus {
        border-color: #00bf94 !important;
        box-shadow: 0 0 0 3px rgba(0,191,148,0.15) !important;
        outline: none;
      }
      @keyframes ow-in { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
      .ow-in { animation: ow-in 0.32s cubic-bezier(0.22,1,0.36,1) forwards; }
      .ow-row { transition: background .12s ease; }
      .ow-row:hover td { background: #f0fdf9 !important; }
      .ow-kpi { transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease !important; }
      .ow-kpi:hover { transform: translateY(-3px) !important; box-shadow: 0 12px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,191,148,0.3) !important; border-color: rgba(0,191,148,0.4) !important; }
      .ow-chip { transition: all .15s ease !important; }
      .ow-chip:hover { background: rgba(0,191,148,0.1) !important; color: #00a87e !important; border-color: rgba(0,191,148,0.4) !important; }
      .ow-insight { transition: border-color .18s ease, background .18s ease !important; cursor: default; }
      .ow-insight:hover { border-color: rgba(91,68,212,0.35) !important; background: rgba(91,68,212,0.04) !important; }
      .ow-btn-primary { transition: filter .15s, transform .15s, box-shadow .15s; }
      .ow-btn-primary:hover { filter: brightness(1.05); transform: translateY(-1px); box-shadow: 0 6px 18px rgba(0,191,148,0.3); }
      .ow-btn-ghost { transition: background .15s, border-color .15s, color .15s; }
      .ow-btn-ghost:hover { background: #f0fdf9 !important; border-color: #d1d5db !important; color: #111827 !important; }
      .ow-tab { transition: color .15s ease, border-color .15s ease !important; }
      .ow-tab:hover:not(.ow-tab-active) { color: #111827 !important; }
      .ow-phase { transition: all .2s ease !important; }
      .ow-step { transition: all .18s ease !important; cursor: pointer; }
      .ow-step:hover { transform: translateY(-2px); }
      .ow-card-accent { transition: border-color .18s, box-shadow .18s; }
      .ow-card-accent:hover { border-color: rgba(0,191,148,0.35) !important; box-shadow: 0 8px 24px rgba(0,0,0,0.1); }

      @media print {
        @page { margin: 1.2cm; size: landscape; }
        body { background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .no-print, nav, .ow-edit-banner, footer, .ow-btn-primary, .ow-btn-ghost, button { display: none !important; }
        header { position: static !important; height: auto !important; padding: 0 !important; box-shadow: none !important; margin-bottom: 20px; border-bottom: 2px solid #00bf94 !important; }
        main { padding: 0 !important; margin: 0 !important; max-width: none !important; }
        .ow-kpi, .ow-insight { break-inside: avoid; box-shadow: none !important; border: 1px solid #ddd !important; }
        input[type=range] { display: none !important; }
      }
    `;
    document.head.appendChild(s);
  }
};