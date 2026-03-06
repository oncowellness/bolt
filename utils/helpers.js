export const STAFF_COST_CONFIG = {
  SS_RATE: 0.33,
  PROVISION_DAYS: 33,
  NOMINA_COST_PER_MONTH: 20,
  MEDICO_COST_PER_YEAR: 51,
  PRL_COST_BRACKETS: [
    { maxStaff: 5, cost: 300 },
    { maxStaff: 10, cost: 550 },
    { maxStaff: Infinity, cost: 1500 },
  ],
};

export function calculateCapexTotal(capexDetalle, capexCentro = 'M') {
  const key = (capexCentro || 'M').toLowerCase();
  const totalRow = capexDetalle.find(x => x.concepto === 'TOTAL INVERSIÓN INICIAL');
  if (totalRow && totalRow[key]) return totalRow[key];

  return capexDetalle.filter(x => x.concepto !== 'TOTAL INVERSIÓN INICIAL').reduce((a, x) => a + (+x[key] || 0), 0);
}

export function calcStaff(s, totalStaff = 1) {
  const esExterno = s.tipo === 'Autónomo' || s.tipo === 'Externo';

  const ss        = esExterno ? 0 : Math.round(s.salario * 0.33);
  const provision = esExterno ? 0 : Math.round((s.salario / 365) * 33);

  let extras = 0;
  if (!esExterno && totalStaff > 0) {
    const { NOMINA_COST_PER_MONTH, MEDICO_COST_PER_YEAR, PRL_COST_BRACKETS } = STAFF_COST_CONFIG;
    const nominaAnual = NOMINA_COST_PER_MONTH * 12;
    const prlBracket = PRL_COST_BRACKETS.find(b => totalStaff <= b.maxStaff);
    const costePRLTotal = prlBracket ? prlBracket.cost : 0;
    const prlPorEmpleado = costePRLTotal / (totalStaff || 1);
    extras = Math.round(nominaAnual + MEDICO_COST_PER_YEAR + prlPorEmpleado);
  }

  const costeTotal = s.salario + ss + provision + extras;
  return { ...s, ss, provision, extras, costeTotal, costeMes: Math.round(costeTotal / 12) };
}

export function calcProg(p) {
  const margen = p.precio > 0 ? (p.precio - p.coste) / p.precio : 0;
  return { ...p, margen, ingresos: p.precio * p.sesiones * p.pacientes };
}