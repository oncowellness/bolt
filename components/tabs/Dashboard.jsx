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

  const ebitda = useMemo(() => totalIngresos - totalCostesDirectos - costesComunes - opexFijosAnual, [totalIngresos, totalCostesDirectos, costesComunes, opexFijosAnual]);
  const resultadoFinal = useMemo(() => ebitda - amortAnual, [ebitda, amortAnual]);

  const horasAnoTotal = useMemo(() => capacidad.salas * capacidad.horasDia * capacidad.diasAno, [capacidad]);
  const opexPorHora = useMemo(() => horasAnoTotal > 0 ? opexFijosAnual / horasAnoTotal : 0, [opexFijosAnual, horasAnoTotal]);
  const estructuraPorHora = useMemo(() => horasAnoTotal > 0 ? costesComunes / horasAnoTotal : 0, [costesComunes, horasAnoTotal]);
  const costeFijoPorSesion = useMemo(() => opexPorHora + estructuraPorHora, [opexPorHora, estructuraPorHora]);
  
  const unitEcon = useMemo(() => cp.map(p => {
    const costeTotalSesion = p.coste + costeFijoPorSesion;
    const margenReal = p.precio - costeTotalSesion;
    return { ...p, costeFijoAbsorbido: costeFijoPorSesion, costeTotalSesion, margenReal, margenRealPct: p.precio > 0 ? margenReal / p.precio : 0 };
  }).sort((a, b) => b.margenReal - a.margenReal), [cp, costeFijoPorSesion]);

  const plData = useMemo(() => {
    const areaRevMap = {};
    const areaCostMap = {};
    cp.forEach(p => {
      areaRevMap[p.area] = (areaRevMap[p.area] || 0) + p.ingresos;
      areaCostMap[p.area] = (areaCostMap[p.area] || 0) + (p.coste * p.sesiones * p.pacientes);
    });
    const areas = Object.keys(areaRevMap).sort((a, b) => areaRevMap[b] - areaRevMap[a]).map(area => {
      const ingresos = areaRevMap[area];
      const costesDirectos = areaCostMap[area] || 0;
      const margenBruto = ingresos - costesDirectos;
      return { area, ingresos, costesDirectos, margenBruto, margenBrutoPct: ingresos > 0 ? margenBruto / ingresos : 0 };
    });
    return { areas, costesComunes };
  }, [cp, costesComunes]);

  const areas = useMemo(() => {
    const map = {};
    cp.forEach(p => { map[p.area] = (map[p.area] || 0) + p.ingresos; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [cp]);
  const maxI = areas[0]?.[1] || 1;
  const top5 = useMemo(() => [...cp].sort((a, b) => b.ingresos - a.ingresos).slice(0, 5), [cp]);
  const topOpex = useMemo(() => [...(gastosFijos || [])].sort((a, b) => (b.coste || 0) - (a.coste || 0)).slice(0, 5), [gastosFijos]);
  const topCapex = useMemo(() => [...(capexDetalle || [])].filter((i) => i.concepto !== 'TOTAL INVERSIÓN INICIAL').sort((a, b) => (b.m || 0) - (a.m || 0)).slice(0, 5), [capexDetalle]);

  return (
    <div className="ow-in" style={{ display: "flex", flexDirection: "column", gap: 26 }}>
      {/* ... (Resto del JSX del Dashboard, omitido por brevedad pero iría aquí completo) ... */}
      {/* Para mantener el ejemplo conciso, asumo que copiarás el JSX del componente Dashboard original aquí */}
       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(164px,1fr))", gap: 12 }}>
        <KPIBox icon="💶" label="Ingresos / Año" value={`${(totalIngresos/1000).toFixed(0)}K €`} sub={`${cp.length} programas activos`} color={C.brand} />
        <KPIBox icon="🏥" label="Coste Plantilla" value={`${(totalCoste/1000).toFixed(0)}K €`} sub={`${cs.length} profesionales`} color={C.pink} />
        <KPIBox icon="📈" label="EBITDA real" value={`${(ebitda/1000).toFixed(0)}K €`} sub={`Incl. OPEX ${(opexFijosAnual/1000).toFixed(0)}K €/año`} color={ebitda >= 0 ? C.brand : C.red} />
        <KPIBox icon="📊" label="Margen Medio" value={`${(margenMedio * 100).toFixed(1)}%`} sub="Benchmark: 40–50%" color={margenMedio > 0.5 ? C.brand : C.yellow} />
        <KPIBox icon="👥" label="Pacientes / Año" value={totalPac.toLocaleString("es-ES")} sub="Proyección año 1" color={C.yellow} />
        <KPIBox icon="🏗" label="CAPEX Total" value={`${(capexTotal/1000).toFixed(0)}K €`} sub={`Centro ${capexCentro} · Amort. ${amortYears}a: ${Math.round(amortAnual/12/100)*100} €/mes`} color={C.orange} />
        <KPIBox icon="💰" label="Resultado final" value={`${(resultadoFinal/1000).toFixed(0)}K €`} sub={resultadoFinal >= 0 ? "✅ Rentable" : "❌ Pérdidas"} color={resultadoFinal >= 0 ? C.brand : C.red} />
        <KPIBox icon="📦" label="Paquetes" value={paquetes.length} sub="Journey F1–F8" color={C.purple} />
      </div>
      {/* ... Resto de paneles ... */}
    </div>
  );
});