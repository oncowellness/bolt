import React, { memo, useMemo } from 'react';
import { C } from '../../styles/theme';
import { Panel, SL, KPIBox, Bar, Th, Td } from '../UI';
import { calcStaff, calcProg, calculateCapexTotal } from '../../utils/helpers';

const AREA_COLORS = { Fisioterapia: C.blue, "Psico-Oncología": C.purple, Nutrición: C.green, Digital: C.yellow, Paliativos: C.orange, Sexología: C.pink, Estética: "#b5004f" };
const MEDALS = ["🥇", "🥈", "🥉", "④", "⑤"];

export const Dashboard = memo(({ staff, programas, paquetes, gastosFijos = [], gastosVars = [], capexDetalle = [], capexCentro = 'M', setCapexCentro, amortYears = 5, setAmortYears, capacidad = { salas: 5, horasDia: 8, diasAno: 226 }, setCapacidad }) => {
  const cs = useMemo(() => staff.map(s => calcStaff(s, staff.length)), [staff]);
  const cp = useMemo(() => programas.map(calcProg), [programas]);
  const costesComunes = useMemo(() => cs.filter(s => s.precioServicio === null).reduce((a, s) => a + s.costeTotal, 0), [cs]);
  const capexTotal = useMemo(() => calculateCapexTotal(capexDetalle, capexCentro), [capexDetalle, capexCentro]);
  const opexFijosAnual = useMemo(() => (gastosFijos || []).reduce((a, g) => a + (+g.coste || 0), 0) * 12, [gastosFijos]);
  const amortAnual = useMemo(() => capexTotal > 0 ? Math.round(capexTotal / amortYears) : 0, [capexTotal, amortYears]);

  const totalIngresos = useMemo(() => cp.reduce((a, p) => a + p.ingresos, 0), [cp]);
  const totalCostesDirectos = useMemo(() => cp.reduce((a, p) => a + p.coste * p.sesiones * p.pacientes, 0), [cp]);
  const totalPac = useMemo(() => cp.reduce((a, p) => a + p.pacientes, 0), [cp]);
  const totalCoste = useMemo(() => cs.reduce((a, s) => a + s.costeTotal, 0), [cs]);
  const margenMedio = useMemo(() => cp.length ? cp.reduce((a, p) => a + p.margen, 0) / cp.length : 0, [cp]);
  const plantillaClinicaTotal = useMemo(() => totalCoste - costesComunes, [totalCoste, costesComunes]);

  const margenContribucion = useMemo(() => totalIngresos - totalCostesDirectos - plantillaClinicaTotal, [totalIngresos, totalCostesDirectos, plantillaClinicaTotal]);
  const ebitdaOperativo = useMemo(() => margenContribucion - costesComunes, [margenContribucion, costesComunes]);
  const ebitda = useMemo(() => ebitdaOperativo - opexFijosAnual, [ebitdaOperativo, opexFijosAnual]);
  const resultadoFinal = useMemo(() => ebitda - amortAnual, [ebitda, amortAnual]);

  const areas = useMemo(() => {
    const map = {};
    cp.forEach(p => { map[p.area] = (map[p.area] || 0) + p.ingresos; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [cp]);
  const maxI = areas[0]?.[1] || 1;

  const top5 = useMemo(() => [...cp].sort((a, b) => b.ingresos - a.ingresos).slice(0, 5), [cp]);
  const topOpex = useMemo(() => [...(gastosFijos || [])].sort((a, b) => (b.coste || 0) - (a.coste || 0)).slice(0, 5), [gastosFijos]);
  const topCapex = useMemo(() => [...(capexDetalle || [])].filter(i => i.concepto !== 'TOTAL INVERSIÓN INICIAL').sort((a, b) => (b.m || 0) - (a.m || 0)).slice(0, 5), [capexDetalle]);

  const plAreas = useMemo(() => {
    const areaRevMap = {};
    const areaCostMap = {};
    cp.forEach(p => {
      areaRevMap[p.area] = (areaRevMap[p.area] || 0) + p.ingresos;
      areaCostMap[p.area] = (areaCostMap[p.area] || 0) + (p.coste * p.sesiones * p.pacientes);
    });
    return Object.keys(areaRevMap).sort((a, b) => areaRevMap[b] - areaRevMap[a]).map(area => {
      const ingresos = areaRevMap[area];
      const costesDirectos = areaCostMap[area] || 0;
      const margenBruto = ingresos - costesDirectos;
      const plantillaClinica = totalIngresos > 0 ? Math.round(plantillaClinicaTotal * ingresos / totalIngresos) : 0;
      const margenContrib = margenBruto - plantillaClinica;
      return { area, ingresos, costesDirectos, margenBruto, margenBrutoPct: ingresos > 0 ? margenBruto / ingresos : 0, plantillaClinica, margenContrib };
    });
  }, [cp, plantillaClinicaTotal, totalIngresos]);

  const fmt = v => Math.round(v).toLocaleString('es-ES');
  const fmtK = v => `${(v / 1000).toFixed(0)}K`;
  const capexLabel = capexCentro === 'S' ? 'Pequeño' : capexCentro === 'M' ? 'Medio' : 'Grande';

  return (
    <div className="ow-in" style={{ display: "flex", flexDirection: "column", gap: 26 }}>

      {/* KPI Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(164px,1fr))", gap: 12 }}>
        <KPIBox icon="💶" label="Ingresos / Año" value={`${fmtK(totalIngresos)} €`} sub={`${cp.length} programas activos`} color={C.brand} />
        <KPIBox icon="🏥" label="Coste Plantilla" value={`${fmtK(totalCoste)} €`} sub={`${cs.length} profesionales`} color={C.pink} />
        <KPIBox icon="📈" label="EBITDA" value={`${fmtK(ebitda)} €`} sub={`OPEX ${fmtK(opexFijosAnual)} €/año`} color={ebitda >= 0 ? C.brand : C.red} />
        <KPIBox icon="📊" label="Margen Medio" value={`${(margenMedio * 100).toFixed(1)}%`} sub="Benchmark: 40–50%" color={margenMedio > 0.5 ? C.brand : C.yellow} />
        <KPIBox icon="👥" label="Pacientes / Año" value={totalPac.toLocaleString("es-ES")} sub="Proyección año 1" color={C.yellow} />
        <KPIBox icon="🏗" label="CAPEX Total" value={`${fmtK(capexTotal)} €`} sub={`Centro ${capexCentro} · Amort. ${amortYears}a`} color={C.orange} />
        <KPIBox icon="💰" label="Resultado final" value={`${fmtK(resultadoFinal)} €`} sub={resultadoFinal >= 0 ? "✅ Rentable" : "❌ Pérdidas"} color={resultadoFinal >= 0 ? C.brand : C.red} />
        <KPIBox icon="📦" label="Paquetes" value={paquetes.length} sub="Journey F1–F8" color={C.purple} />
      </div>

      {/* Ingresos por disciplina + Top 5 programas */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Panel>
          <SL>Ingresos por Disciplina</SL>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {areas.map(([area, ingresos]) => (
              <div key={area}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 13, color: C.txt, fontWeight: 600 }}>{area}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: AREA_COLORS[area] || C.muted }}>{fmt(ingresos)} €</span>
                </div>
                <Bar v={ingresos} max={maxI} color={AREA_COLORS[area] || C.muted} />
              </div>
            ))}
          </div>
        </Panel>
        <Panel>
          <SL>Top 5 Programas por Ingresos</SL>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {top5.map((p, i) => (
              <div key={p.codigo} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: C.bgDeep, borderRadius: 10 }}>
                <span style={{ fontSize: 18, minWidth: 24 }}>{MEDALS[i]}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.txt }}>{p.nombre}</div>
                  <div style={{ fontSize: 12, color: C.muted }}>{p.pacientes} pac · {p.sesiones} ses/pac</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.brand }}>{fmt(p.ingresos)} €</div>
                  <div style={{ fontSize: 12, color: C.muted }}>{(p.margen * 100).toFixed(1)}% mg</div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Top OPEX + Top CAPEX */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Panel>
          <SL>🧾 Top 5 Gastos Operativos (OPEX)</SL>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {topOpex.map((g, i) => (
              <div key={g.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: i < topOpex.length - 1 ? `1px solid ${C.bord}` : "none" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.txt }}>{g.concepto}</div>
                  <div style={{ fontSize: 12, color: C.muted }}>{g.categoria}</div>
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: C.red }}>{fmt(g.coste)} €</span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel>
          <SL>🏗 Top 5 Inversión (CAPEX)</SL>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {topCapex.map((c, i) => (
              <div key={c.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: i < topCapex.length - 1 ? `1px solid ${C.bord}` : "none" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.txt }}>{c.concepto}</div>
                  <div style={{ fontSize: 12, color: C.muted }}>Escenario {capexLabel}</div>
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: C.orange }}>{fmt(c[capexCentro.toLowerCase()] || 0)} €</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Cuenta de resultados analítica */}
      <Panel>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.txt, textTransform: "uppercase", letterSpacing: 0.9 }}>Cuenta de Resultados Analítica</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 13, color: C.muted }}>Amortización CAPEX:</span>
            {[3, 5, 7, 10].map(y => (
              <button key={y} onClick={() => setAmortYears(y)} style={{ padding: "4px 10px", borderRadius: 6, border: `1px solid ${amortYears === y ? C.brand : C.bord}`, background: amortYears === y ? C.brand : "transparent", color: amortYears === y ? "#fff" : C.muted, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .15s" }}>{y}a</button>
            ))}
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <Th>Área</Th>
                <Th highlight c={C.brand}>Ingresos</Th>
                <Th>C. Directos Sesión</Th>
                <Th highlight c={C.blue}>Margen Bruto</Th>
                <Th>Plantilla Clínica*</Th>
                <Th highlight c={C.green}>Margen Contribución</Th>
              </tr>
            </thead>
            <tbody>
              {plAreas.map(row => (
                <tr key={row.area} className="ow-row">
                  <Td>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: AREA_COLORS[row.area] || C.muted, display: "inline-block", flexShrink: 0 }} />
                      <span style={{ fontWeight: 600 }}>{row.area}</span>
                    </span>
                  </Td>
                  <Td s={{ color: C.brand, fontWeight: 700 }}>{fmt(row.ingresos)} €</Td>
                  <Td s={{ color: C.red }}>– {fmt(row.costesDirectos)} €</Td>
                  <Td s={{ color: C.blue, fontWeight: 700 }}>{fmt(row.margenBruto)} € ({(row.margenBrutoPct * 100).toFixed(1)}%)</Td>
                  <Td s={{ color: C.pink }}>– {fmt(row.plantillaClinica)} €</Td>
                  <Td s={{ color: row.margenContrib >= 0 ? C.green : C.red, fontWeight: 700 }}>
                    {fmt(row.margenContrib)} € ({row.ingresos > 0 ? (row.margenContrib / row.ingresos * 100).toFixed(1) : 0}%)
                  </Td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ borderTop: `2px solid ${C.bordStrong}`, background: "#f7faf9" }}>
                <Td s={{ fontWeight: 700, color: C.sub }}>TOTAL ÁREAS</Td>
                <Td s={{ color: C.brand, fontWeight: 700 }}>{fmt(totalIngresos)} €</Td>
                <Td s={{ color: C.red, fontWeight: 700 }}>– {fmt(totalCostesDirectos)} €</Td>
                <Td s={{ color: C.blue, fontWeight: 700 }}>{fmt(totalIngresos - totalCostesDirectos)} €</Td>
                <Td s={{ color: C.pink, fontWeight: 700 }}>– {fmt(plantillaClinicaTotal)} €</Td>
                <Td s={{ color: margenContribucion >= 0 ? C.green : C.red, fontWeight: 700 }}>{fmt(margenContribucion)} €</Td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p style={{ fontSize: 12, color: C.muted, marginTop: 12, lineHeight: 1.6 }}>
          * La plantilla clínica ({fmt(plantillaClinicaTotal)} € — profesionales con precio de servicio) se distribuye por área en proporción a los ingresos. La plantilla de estructura ({fmt(costesComunes)} € — recepción, admin, dirección) se imputa como coste común.
        </p>
      </Panel>

      {/* Waterfall financiero */}
      <Panel>
        {[
          { label: "Ingresos totales", value: totalIngresos, color: C.brand, bold: false },
          { label: "— Costes directos de sesión", value: -totalCostesDirectos, color: C.red, bold: false },
          { label: "— Plantilla clínica (reparto por área)", value: -plantillaClinicaTotal, color: C.red, bold: false },
          { label: "Suma margen de contribución", value: margenContribucion, color: margenContribucion >= 0 ? C.green : C.red, bold: true },
          { label: "— Plantilla de estructura (costes comunes)", value: -costesComunes, color: C.red, bold: false },
          { label: "EBITDA operativo", value: ebitdaOperativo, color: ebitdaOperativo >= 0 ? C.brand : C.red, bold: true },
          { label: `— OPEX fijos anuales (${gastosFijos.length} partidas)`, value: -opexFijosAnual, color: C.red, bold: false },
          { label: "EBITDA", value: ebitda, color: ebitda >= 0 ? C.brand : C.red, bold: true },
          { label: `— Amortización CAPEX (${amortYears} años)`, value: -amortAnual, color: C.red, bold: false },
          { label: "Resultado antes de impuestos", value: resultadoFinal, color: resultadoFinal >= 0 ? C.brand : C.red, bold: true },
        ].map((row, i) => (
          <div key={i} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "10px 0", borderBottom: `1px solid ${row.bold ? C.bordStrong : C.bord}`,
            background: row.bold ? `${row.color}05` : "transparent",
            marginLeft: row.bold ? -24 : 0, marginRight: row.bold ? -24 : 0,
            paddingLeft: row.bold ? 24 : 0, paddingRight: row.bold ? 24 : 0,
          }}>
            <span style={{ fontSize: 13, color: row.bold ? C.txt : C.sub, fontWeight: row.bold ? 700 : 400 }}>{row.label}</span>
            <span style={{ fontSize: row.bold ? 15 : 13, fontWeight: row.bold ? 700 : 600, color: row.color }}>{fmt(row.value)} €</span>
          </div>
        ))}
        {resultadoFinal < 0 && (
          <div style={{ marginTop: 16, padding: "10px 14px", background: `${C.red}08`, border: `1px solid ${C.red}25`, borderRadius: 10 }}>
            <span style={{ fontSize: 13, color: C.red }}>⚠️ <strong>Alerta financiera:</strong> El resultado final es negativo ({fmt(resultadoFinal)} €). El modelo no es rentable con los datos actuales. Revisa precios, ocupación o estructura de costes.</span>
          </div>
        )}
      </Panel>

    </div>
  );
});
