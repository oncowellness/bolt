import React, { useState, useMemo } from 'react';
import { C } from '../../styles/theme';
import { Th, Td, Badge } from '../UI';
import { calcStaff, calcProg, calculateCapexTotal } from '../../utils/helpers';

export function Financiero({ staff, programas, gastosFijos = [], gastosVars = [], capexDetalle = [], capexCentro = 'M', setCapexCentro, amortYears = 5, setAmortYears }) {
  const [sim, setSim] = useState({
    ocup: 85,
    ticket: 100,
    salas: 5,
    horas: 10,
  });
  const cs = useMemo(() => staff.map(s => calcStaff(s, staff.length)), [staff]);
  const cp = useMemo(() => programas.map(calcProg), [programas]);
  const costesComunes = useMemo(() => cs.filter(s => s.precioServicio === null).reduce((a, s) => a + s.costeTotal, 0), [cs]);
  const ingProy = useMemo(() => cp.reduce((a, p) => a + p.ingresos, 0), [cp]);
  const costesDirectosProy = useMemo(() => cp.reduce((a, p) => a + p.coste * p.sesiones * p.pacientes, 0), [cp]);
  const opexFijosMes = useMemo(() => (gastosFijos || []).reduce((a, g) => a + (+g.coste || 0), 0), [gastosFijos]);
  const opexFijosAno = opexFijosMes * 12;
  const totalSesiones = useMemo(() => cp.reduce((a, p) => a + p.sesiones * p.pacientes, 0), [cp]);
  const totalPacientes = useMemo(() => cp.reduce((a, p) => a + p.pacientes, 0), [cp]);
  const gastosVarsAnual = useMemo(() => (gastosVars || []).reduce((a, v) => {
    if (v.tipo === '% sobre ingresos') return a + (v.valor / 100) * ingProy;
    if (v.tipo === '€ por sesión') return a + v.valor * totalSesiones;
    if (v.tipo === '€ por paciente') return a + v.valor * totalPacientes;
    return a;
  }, 0), [gastosVars, ingProy, totalSesiones, totalPacientes]);
  const capTotal = useMemo(() => calculateCapexTotal(capexDetalle, capexCentro), [capexDetalle, capexCentro]);
  const dias = 226;
  const ingSim = Math.round(
    dias * sim.salas * sim.horas * (sim.ocup / 100) * sim.ticket
  );
  const amortAnual = capTotal > 0 ? Math.round(capTotal / amortYears) : 0;
  const fixedCosts = costesComunes + opexFijosAno;
  const beOcup =
    fixedCosts > 0
      ? Math.ceil((fixedCosts / (dias * sim.salas * sim.horas * sim.ticket)) * 100)
      : 0;

  const coste = useMemo(() => cs.reduce((a, s) => a + s.costeTotal, 0), [cs]);

  const rows = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50].map((o) => {
    const ing = Math.round(
      dias * sim.salas * sim.horas * (o / 100) * sim.ticket
    );
    return {
      o,
      ing,
      mg: ing > 0 ? (((ing - fixedCosts) / ing) * 100).toFixed(1) : '—',
      ok: ing > fixedCosts,
    };
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <h2
        style={{
          margin: '0 0 4px',
          fontSize: 21,
          fontWeight: 700,
          fontFamily: "'Open Sans', sans-serif",
          color: C.txt,
        }}
      >
        💰 Modelo Financiero
      </h2>

      <div
        style={{
          background: `${C.green}07`,
          border: `1px solid ${C.green}25`,
          borderRadius: 13,
          padding: 18,
        }}
      >
        <h3
          style={{
            margin: '0 0 14px',
            fontSize: 13,
            fontWeight: 700,
            color: C.green,
            textTransform: 'uppercase',
            letterSpacing: 0.8,
          }}
        >
          🎛 Simulador de Capacidad
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 14,
            marginBottom: 14,
          }}
        >
          {[
            { l: '% Ocupación', k: 'ocup', min: 20, max: 100, step: 5, c: C.green, suf: '%' },
            { l: 'Ticket Medio (€)', k: 'ticket', min: 30, max: 200, step: 5, c: C.yellow, suf: ' €' },
            { l: 'Nº Salas', k: 'salas', min: 1, max: 10, step: 1, c: C.purple, suf: '' },
            { l: 'Horas/Día', k: 'horas', min: 4, max: 14, step: 1, c: C.blue, suf: 'h' },
          ].map((s) => (
            <div key={s.k}>
              <label
                style={{
                  fontSize: 13,
                  color: C.sub,
                  display: 'block',
                  marginBottom: 4,
                }}
              >
                {s.l}:{' '}
                <strong style={{ color: s.c }}>
                  {sim[s.k]}
                  {s.suf}
                </strong>
              </label>
              <input
                type="range"
                min={s.min}
                max={s.max}
                step={s.step}
                value={sim[s.k]}
                onChange={(e) =>
                  setSim((p) => ({ ...p, [s.k]: +e.target.value }))
                }
                style={{ width: '100%', accentColor: s.c }}
              />
            </div>
          ))}
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: 10,
          }}
        >
          {[
            { l: 'Ingresos simulados/año', v: ingSim.toLocaleString('es-ES') + ' €', c: C.blue },
            { l: 'Costes fijos estructura', v: fixedCosts.toLocaleString('es-ES') + ' €', c: C.pink },
            { l: 'EBITDA simulado', v: (ingSim - fixedCosts).toLocaleString('es-ES', { maximumFractionDigits: 0 }) + ' €', c: ingSim > fixedCosts ? C.green : C.red },
            { l: 'Break-even ocupación', v: beOcup + '%', c: C.yellow },
          ].map((k) => (
            <div
              key={k.l}
              style={{
                textAlign: 'center',
                padding: 10,
                background: '#f9fafb',
                borderRadius: 8,
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: k.c,
                  fontFamily: "'Open Sans', sans-serif",
                }}
              >
                {k.v}
              </div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>
                {k.l}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          background: C.surf,
          border: `1px solid ${C.bord}`,
          borderRadius: 13,
          padding: 18,
        }}
      >
        <h3
          style={{
            margin: '0 0 12px',
            fontSize: 13,
            fontWeight: 700,
            color: C.sub,
            textTransform: 'uppercase',
            letterSpacing: 0.8,
          }}
        >
          📊 Proyección real (desde catálogo de programas)
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: 12,
          }}
        >
          {(() => {
            const ebitdaProy = ingProy - costesDirectosProy - costesComunes - opexFijosAno - gastosVarsAnual;
            const resultadoProy = ebitdaProy - amortAnual;
            return [
              { l: 'Ingresos proyectados', v: ingProy.toLocaleString('es-ES') + ' €', c: C.blue },
              { l: 'C. directos sesión (incl. personal clínico)', v: '− ' + costesDirectosProy.toLocaleString('es-ES') + ' €', c: C.red },
              { l: 'Plantilla estructura', v: '− ' + costesComunes.toLocaleString('es-ES') + ' €', c: C.pink },
              { l: 'OPEX fijos / año', v: '− ' + opexFijosAno.toLocaleString('es-ES') + ' €', c: C.orange },
              { l: 'Gastos variables (TPV, fungible, lab.)', v: '− ' + Math.round(gastosVarsAnual).toLocaleString('es-ES') + ' €', c: C.yellow },
              { l: 'EBITDA real proyectado', v: ebitdaProy.toLocaleString('es-ES') + ' €', c: ebitdaProy >= 0 ? C.green : C.red },
              { l: `Resultado tras amortización (${amortYears}a)`, v: resultadoProy.toLocaleString('es-ES') + ' €', c: resultadoProy >= 0 ? C.brand : C.red },
            ].map((k) => (
              <div key={k.l} style={{ padding: 14, background: '#f9fafb', borderRadius: 9 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: k.c, fontFamily: "'Open Sans', sans-serif" }}>{k.v}</div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>{k.l}</div>
              </div>
            ));
          })()}
        </div>
      </div>

      <div
        style={{
          background: C.surf,
          border: `1px solid ${C.bord}`,
          borderRadius: 13,
          padding: 18,
        }}
      >
        <h3
          style={{
            margin: '0 0 14px',
            fontSize: 13,
            fontWeight: 700,
            color: C.sub,
            textTransform: 'uppercase',
            letterSpacing: 0.8,
          }}
        >
          📈 Análisis de Sensibilidad
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <Th>% Ocupación</Th>
                <Th>Ingresos/Año</Th>
                <Th>Coste Personal</Th>
                <Th>Margen %</Th>
                <Th>Profitable</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.o}
                  style={{
                    borderBottom: `1px solid ${C.bord}`,
                    background: r.o === sim.ocup ? `${C.green}08` : '',
                  }}
                >
                  <Td
                    s={{
                      fontWeight: r.o === sim.ocup ? 700 : 400,
                      color: r.o === sim.ocup ? C.green : C.txt,
                    }}
                  >
                    {r.o}% {r.o === sim.ocup ? '← actual' : ''}
                  </Td>
                  <Td s={{ color: C.blue, fontWeight: 600 }}>
                    {r.ing.toLocaleString('es-ES')} €
                  </Td>
                  <Td s={{ color: C.pink }}>
                    {coste.toLocaleString('es-ES')} €
                  </Td>
                  <Td
                    s={{
                      color: parseFloat(r.mg) > 0 ? C.green : C.red,
                      fontWeight: 600,
                    }}
                  >
                    {r.mg}%
                  </Td>
                  <Td>
                    {r.ok ? (
                      <Badge text="✅ Sí" color={C.green} />
                    ) : (
                      <Badge text="❌ No" color={C.red} />
                    )}
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div
        style={{
          background: `${C.orange}07`,
          border: `1px solid ${C.orange}25`,
          borderRadius: 13,
          padding: 18,
        }}
      >
        <h3
          style={{
            margin: '0 0 14px',
            fontSize: 13,
            fontWeight: 700,
            color: C.orange,
            textTransform: 'uppercase',
            letterSpacing: 0.8,
          }}
        >
          🏗 CAPEX — Inversión Inicial
        </h3>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: C.muted, marginRight: 2 }}>Escenario de centro:</span>
            {['S', 'M', 'L'].map(c => (
              <button key={c} onClick={() => setCapexCentro(c)} style={{
                padding: '3px 11px', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 600,
                border: `1px solid ${capexCentro === c ? C.orange : C.bord}`,
                background: capexCentro === c ? `${C.orange}15` : 'transparent',
                color: capexCentro === c ? C.orange : C.muted,
              }}>Centro {c}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: C.muted, marginRight: 2 }}>Años de amortización:</span>
            {[3, 5, 7, 10].map(y => (
              <button key={y} onClick={() => setAmortYears(y)} style={{
                padding: '3px 11px', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 600,
                border: `1px solid ${amortYears === y ? C.brand : C.bord}`,
                background: amortYears === y ? 'rgba(0,191,148,0.08)' : 'transparent',
                color: amortYears === y ? C.brand : C.muted,
              }}>{y}a</button>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px,1fr))', gap: 12 }}>
          {capexDetalle
            .filter(x => x.concepto !== 'TOTAL INVERSIÓN INICIAL' && !x.concepto.startsWith('- '))
            .map(x => {
              const key = capexCentro.toLowerCase();
              const val = x[key] || 0;
              return (
                <div key={x.id} style={{ padding: 11, background: `${C.orange}06`, border: `1px solid ${C.orange}20`, borderRadius: 9 }}>
                  <div style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>{x.concepto}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.orange }}>{val.toLocaleString('es-ES')} €</div>
                </div>
              );
            })}
          <div style={{ padding: 12, background: `${C.orange}12`, border: `1px solid ${C.orange}40`, borderRadius: 9 }}>
            <div style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>TOTAL · Centro {capexCentro}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.orange, fontFamily: "'Open Sans', sans-serif" }}>
              {capTotal.toLocaleString('es-ES')} €
            </div>
            <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>
              Amort. {amortYears}a: {Math.round(capTotal / (amortYears * 12) / 100) * 100} €/mes
            </div>
          </div>
        </div>
        <p style={{ fontSize: 12, color: C.muted, margin: '10px 0 0' }}>
          Edita los importes en la pestaña <strong>🧾 Gastos</strong>. Los tres escenarios (S/M/L) reflejan distintos tamaños de centro.
        </p>
      </div>
    </div>
  );
}