import React, { useState } from 'react';
import { C } from '../../styles/theme';
import { Th, Td, IE, btn } from '../UI';
import { DEFAULT_CAPEX_DETALLE } from '../../data/defaults';

export function Gastos({ fijos, setFijos, vars, setVars, capexDet, setCapexDet, centro = 'M', setCentro }) {
  const [delF, setDelF] = useState(null);
  const [delV, setDelV] = useState(null);
  const [delC, setDelC] = useState(null);

  const totalFijosMes = fijos.reduce((a, g) => a + (+g.coste || 0), 0);
  const totalFijosAnual = totalFijosMes * 12;
  const totalVarsValor = vars.reduce((a, v) => a + (+v.valor || 0), 0);
  const totalVarsAnual = totalVarsValor * 12;

  const capKey = centro.toLowerCase(); // s|m|l
  const capItems = capexDet.filter(x => x.concepto !== "TOTAL INVERSIÓN INICIAL");
  const capTotal =
    capexDet.find(x => x.concepto === "TOTAL INVERSIÓN INICIAL")?.[capKey] ??
    capItems.reduce((a, x) => a + (+x[capKey] || 0), 0);

  const updF = (id, f, v) => setFijos(prev => prev.map(x => x.id === id ? { ...x, [f]: f === "coste" ? +v : v } : x));
  const updV = (id, f, v) => setVars(prev => prev.map(x => x.id === id ? { ...x, [f]: (f === "valor") ? +v : v } : x));
  const updC = (id, f, v) => setCapexDet(prev => prev.map(x => x.id === id ? { ...x, [f]: ["s","m","l"].includes(f) ? +v : v } : x));

  const kpiBox = (label, value, color, sub) => (
    <div style={{ padding: "13px 14px", background: C.surf, border: `1px solid ${color}30`, borderRadius: 12 }}>
      <div style={{ fontSize: 18, fontWeight: 700, color, fontFamily: "'Open Sans', sans-serif", margin: "2px 0 4px" }}>{value}</div>
      <div style={{ fontSize: 12, color: C.muted, textTransform: "uppercase", letterSpacing: .7 }}>{label}</div>
      {sub && <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>{sub}</div>}
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div>
        <h2 style={{ margin: "0 0 4px", fontSize: 21, fontWeight: 700, fontFamily: "'Open Sans', sans-serif", color: C.txt }}>
          🧾 Gastos Operativos (OPEX) + Inversión Inicial (CAPEX)
        </h2>
        <p style={{ margin: 0, fontSize: 13, color: C.muted }}>
          Gastos fijos/variables típicos de una startup con clínica + CAPEX de implantación (Excel).
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px,1fr))", gap: 11 }}>
        {kpiBox("Gastos fijos/mes", totalFijosMes.toLocaleString("es-ES") + " €", C.pink, "Sin salarios (eso está en Personal)")}
        {kpiBox("Gastos variables/mes", totalVarsValor.toLocaleString("es-ES") + " €", C.pink)}
        {kpiBox("Gastos variables/año", totalVarsAnual.toLocaleString("es-ES") + " €", C.purple)}
        {kpiBox("Gastos fijos/año", totalFijosAnual.toLocaleString("es-ES") + " €", C.purple)}
        {kpiBox("CAPEX inicial", capTotal.toLocaleString("es-ES") + " €", C.orange, `Formato Centro ${centro}`)}
        {kpiBox("Amortización (5 años)", Math.round(capTotal / 60).toLocaleString("es-ES") + " €/mes", C.yellow)}
      </div>

      <div style={{ background: C.surf, border: `1px solid ${C.bord}`, borderRadius: 13, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: C.sub, textTransform: "uppercase", letterSpacing: .8 }}>
            🏷️ Gastos fijos (mensuales)
          </h3>
          <button
            onClick={() => setFijos(prev => [...prev, { id: "fx-" + Date.now(), categoria: "Otros", concepto: "Nuevo gasto fijo", periodicidad: "Mensual", coste: 0, notas: "" }])}
            style={btn(C.green)}
          >
            + Añadir
          </button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <Th>Categoría</Th><Th>Concepto</Th><Th>Periodicidad</Th><Th c={`${C.pink}10`}>Coste (€)</Th><Th>Notas</Th><Th></Th>
              </tr>
            </thead>
            <tbody>
              {fijos.map(g => (
                <tr key={g.id}
                  onMouseEnter={e => e.currentTarget.style.background = "#f0fdf9"}
                  onMouseLeave={e => e.currentTarget.style.background = ""}>
                  <Td><IE value={g.categoria} onChange={v => updF(g.id, "categoria", v)} width="130px" /></Td>
                  <Td><IE value={g.concepto} onChange={v => updF(g.id, "concepto", v)} width="240px" /></Td>
                  <Td><IE value={g.periodicidad} onChange={v => updF(g.id, "periodicidad", v)} width="90px" /></Td>
                  <Td s={{ color: C.pink, fontWeight: 700 }}><IE value={g.coste} onChange={v => updF(g.id, "coste", v)} type="number" width="90px" /> €</Td>
                  <Td s={{ color: C.muted }}><IE value={g.notas || ""} onChange={v => updF(g.id, "notas", v)} width="220px" /></Td>
                  <Td>
                    {delF === g.id
                      ? <>
                          <button onClick={() => { setFijos(prev => prev.filter(x => x.id !== g.id)); setDelF(null); }} style={{ ...btn(C.red), fontSize: 12, padding: "3px 7px", marginRight: 4 }}>Borrar</button>
                          <button onClick={() => setDelF(null)} style={{ ...btn(C.muted, true), fontSize: 12, padding: "3px 7px" }}>No</button>
                        </>
                      : <button onClick={() => setDelF(g.id)} style={{ background: "none", border: "none", cursor: "pointer", color: C.muted }}>✕</button>}
                  </Td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ borderTop: `2px solid ${C.bord}` }}>
                <Td colSpan={3} s={{ fontWeight: 700, color: C.sub }}>TOTAL</Td>
                <Td s={{ fontWeight: 800, color: C.pink }}>{totalFijosMes.toLocaleString("es-ES")} € / mes</Td>
                <Td colSpan={2} />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div style={{ background: C.surf, border: `1px solid ${C.bord}`, borderRadius: 13, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: C.sub, textTransform: "uppercase", letterSpacing: .8 }}>
            🔁 Gastos variables (por actividad)
          </h3>
          <button
            onClick={() => setVars(prev => [...prev, { id: "vr-" + Date.now(), categoria: "Otros", concepto: "Nuevo gasto variable", tipo: "€ por sesión", valor: 0, base: "Sesión", notas: "" }])}
            style={btn(C.green)}
          >
            + Añadir
          </button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <Th>Categoría</Th><Th>Concepto</Th><Th>Tipo</Th><Th c={`${C.yellow}10`}>Valor</Th><Th>Base</Th><Th>Notas</Th><Th></Th>
              </tr>
            </thead>
            <tbody>
              {vars.map(v => (
                <tr key={v.id}
                  onMouseEnter={e => e.currentTarget.style.background = "#f0fdf9"}
                  onMouseLeave={e => e.currentTarget.style.background = ""}>
                  <Td><IE value={v.categoria} onChange={x => updV(v.id, "categoria", x)} width="140px" /></Td>
                  <Td><IE value={v.concepto} onChange={x => updV(v.id, "concepto", x)} width="240px" /></Td>
                  <Td><IE value={v.tipo} onChange={x => updV(v.id, "tipo", x)} width="140px" /></Td>
                  <Td s={{ color: C.yellow, fontWeight: 700 }}><IE value={v.valor} onChange={x => updV(v.id, "valor", x)} type="number" width="90px" /></Td>
                  <Td s={{ color: C.muted }}><IE value={v.base || ""} onChange={x => updV(v.id, "base", x)} width="90px" /></Td>
                  <Td s={{ color: C.muted }}><IE value={v.notas || ""} onChange={x => updV(v.id, "notas", x)} width="190px" /></Td>
                  <Td>
                    {delV === v.id
                      ? <>
                          <button onClick={() => { setVars(prev => prev.filter(x => x.id !== v.id)); setDelV(null); }} style={{ ...btn(C.red), fontSize: 12, padding: "3px 7px", marginRight: 4 }}>Borrar</button>
                          <button onClick={() => setDelV(null)} style={{ ...btn(C.muted, true), fontSize: 12, padding: "3px 7px" }}>No</button>
                        </>
                      : <button onClick={() => setDelV(v.id)} style={{ background: "none", border: "none", cursor: "pointer", color: C.muted }}>✕</button>}
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ background: `${C.orange}07`, border: `1px solid ${C.orange}25`, borderRadius: 13, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: C.orange, textTransform: "uppercase", letterSpacing: .8 }}>
            🏗 CAPEX implantación clínica (detalle)
          </h3>
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={() => setCentro("S")} style={btn(C.red, centro !== "S")}>Centro S</button>
            <button onClick={() => setCentro("M")} style={btn(C.orange, centro !== "M")}>Centro M</button>
            <button onClick={() => setCentro("L")} style={btn(C.green, centro !== "L")}>Centro L</button>
            <button onClick={() => setCapexDet(DEFAULT_CAPEX_DETALLE)} style={btn(C.muted, true)}>Reset</button>
          </div>
        </div>

        <div style={{ background: C.surf, border: `1px solid ${C.bord}`, borderRadius: 13, padding: 14 }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <Th>Concepto</Th>
                  <Th c={`${C.red}10`}>S (€)</Th>
                  <Th c={`${C.orange}10`}>M (€)</Th>
                  <Th c={`${C.green}10`}>L (€)</Th>
                  <Th>Notas</Th>
                  <Th></Th>
                </tr>
              </thead>
              <tbody>
                {capexDet.map(it => (
                  <tr key={it.id}
                    style={{ background: it.concepto === "TOTAL INVERSIÓN INICIAL" ? "#f9fafb" : "" }}
                    onMouseEnter={e => e.currentTarget.style.background = it.concepto === "TOTAL INVERSIÓN INICIAL" ? "#f9fafb" : "#f0fdf9"}
                    onMouseLeave={e => e.currentTarget.style.background = it.concepto === "TOTAL INVERSIÓN INICIAL" ? "#f9fafb" : ""}>
                    <Td s={{ fontWeight: it.concepto === "TOTAL INVERSIÓN INICIAL" ? 800 : 500, color: it.concepto === "TOTAL INVERSIÓN INICIAL" ? C.orange : C.txt }}>
                      <IE value={it.concepto} onChange={v => updC(it.id, "concepto", v)} width="260px" />
                    </Td>
                    <Td s={{ color: C.red, fontWeight: 700 }}><IE value={it.s} onChange={v => updC(it.id, "s", v)} type="number" width="90px" /></Td>
                    <Td s={{ color: C.orange, fontWeight: 700 }}><IE value={it.m} onChange={v => updC(it.id, "m", v)} type="number" width="90px" /></Td>
                    <Td s={{ color: C.green, fontWeight: 700 }}><IE value={it.l} onChange={v => updC(it.id, "l", v)} type="number" width="90px" /></Td>
                    <Td s={{ color: C.muted }}><IE value={it.notas || ""} onChange={v => updC(it.id, "notas", v)} width="220px" /></Td>
                    <Td>
                      {it.concepto === "TOTAL INVERSIÓN INICIAL"
                        ? <span style={{ fontSize: 12, color: C.muted }}>—</span>
                        : delC === it.id
                          ? <>
                              <button onClick={() => { setCapexDet(prev => prev.filter(x => x.id !== it.id)); setDelC(null); }} style={{ ...btn(C.red), fontSize: 12, padding: "3px 7px", marginRight: 4 }}>Borrar</button>
                              <button onClick={() => setDelC(null)} style={{ ...btn(C.muted, true), fontSize: 12, padding: "3px 7px" }}>No</button>
                            </>
                          : <button onClick={() => setDelC(it.id)} style={{ background: "none", border: "none", cursor: "pointer", color: C.muted }}>✕</button>}
                    </Td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ borderTop: `2px solid ${C.bord}` }}>
                  <Td s={{ fontWeight: 800, color: C.sub }}>CAPEX total (Centro {centro})</Td>
                  <Td colSpan={3} s={{ fontWeight: 900, color: C.orange }}>{capTotal.toLocaleString("es-ES")} €</Td>
                  <Td colSpan={2} />
                </tr>
              </tfoot>
            </table>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
            <button
              onClick={() => setCapexDet(prev => {
                const total = prev.find(x => x.concepto === "TOTAL INVERSIÓN INICIAL") || { id: "cx-total", concepto: "TOTAL INVERSIÓN INICIAL", s: 0, m: 0, l: 0, notas: "" };
                const base = prev.filter(x => x.concepto !== "TOTAL INVERSIÓN INICIAL");
                return [...base, { id: "cx-" + Date.now(), concepto: "Nuevo concepto", s: 0, m: 0, l: 0, notas: "" }, total];
              })}
              style={btn(C.green)}
            >
              + Añadir
            </button>

            <div style={{ fontSize: 13, color: C.muted }}>
              Fuente: hoja <strong>INVERSIÓN INICIAL</strong> del Excel de planificación financiera.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}