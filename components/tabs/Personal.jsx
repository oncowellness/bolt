import React, { memo, useMemo, useState } from 'react';
import { C } from '../../styles/theme';
import { Panel, SL, Th, Td, IE, btnStyle, inp } from '../UI';
import { calcStaff } from '../../utils/helpers';

export const Personal = memo(({ staff, setStaff, capacidad = { horasDia: 8, diasAno: 226 } }) => {
  const [ocup, setOcup] = useState(85);
  const [del, setDel] = useState(null);
  const cs = useMemo(() => staff.map(s => calcStaff(s, staff.length)), [staff]);
  const totalAnual = useMemo(() => cs.reduce((a, s) => a + s.costeTotal, 0), [cs]);
  const clinicos = useMemo(() => cs.filter(s => s.precioServicio !== null), [cs]);
  
  // Use dynamic capacity instead of hardcoded 1716
  const horasAnoClin = capacidad.horasDia * capacidad.diasAno;
  
  const ingresosOcup = useMemo(() => clinicos.reduce((a, s) => a + s.precioServicio * horasAnoClin * (ocup / 100), 0), [clinicos, ocup, horasAnoClin]);
  const margen = useMemo(() => ingresosOcup - totalAnual, [ingresosOcup, totalAnual]);
  const upd = (id, field, value) => setStaff(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));

  return (
    <div className="ow-in" style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <h2 style={{ fontSize: 21, fontWeight: 700, color: C.txt, letterSpacing: -0.4, lineHeight: 1.2, marginBottom: 6 }}>Personal & Costes Salariales</h2>
          <p style={{ fontSize: 13, color: C.sub, lineHeight: 1.5 }}>Haz clic en cualquier valor <span style={{ color: C.brand, borderBottom: "1px dashed rgba(0,168,122,0.4)" }}>subrayado</span> para editarlo. Los costes se recalculan automáticamente.</p>
        </div>
        <button onClick={() => setStaff(prev => [...prev, { id: "P" + Date.now() + Math.floor(Math.random() * 1000), rol: "Nuevo puesto", espacio: "—", tipo: "Plantilla", salario: 25000, precioServicio: null }])} className="ow-btn-primary" style={btnStyle(C.brand)}>+ Añadir persona</button>
      </div>

      <Panel accent>
        <SL color={C.brand}>Simulador de Ocupación</SL>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
          <span style={{ fontSize: 13, color: C.sub, minWidth: 145, flexShrink: 0 }}>Ocupación: <strong style={{ color: C.brand }}>{ocup}%</strong></span>
          <input type="range" min={20} max={100} step={5} value={ocup} onChange={e => setOcup(+e.target.value)} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
          {[
            { label: "Ingresos clínicos / año", value: ingresosOcup.toLocaleString("es-ES", { maximumFractionDigits: 0 }) + " €", color: C.brand },
            { label: "Coste total plantilla / año", value: totalAnual.toLocaleString("es-ES") + " €", color: C.pink },
            { label: "Margen vs. plantilla", value: margen.toLocaleString("es-ES", { maximumFractionDigits: 0 }) + " €", color: margen >= 0 ? C.brand : C.red },
            { label: "Break-even personal", value: margen >= 0 ? "✅ SÍ" : "❌ NO", color: margen >= 0 ? C.brand : C.red },
          ].map((k) => (
            <div key={k.label} style={{ padding: "16px 14px", background: "#f4f9f7", borderRadius: 11, border: "1px solid #dde4e1", textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: k.color, letterSpacing: -0.5, lineHeight: 1, marginBottom: 7 }}>{k.value}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: 0.5, lineHeight: 1.4 }}>{k.label}</div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: "#f0f5f3" }}>
                <Th>Puesto</Th><Th>Espacio</Th><Th>Tipo</Th>
                <Th highlight>Bruto</Th>
                <Th>SS (33%)</Th><Th>Provisión</Th><Th>OTROS</Th>
                <Th highlight>Coste/Año</Th><Th>Coste/Mes</Th>
                <Th highlight>Precio Serv.</Th><Th></Th>
              </tr>
            </thead>
            <tbody>
              {cs.map((s) => (
                <tr key={s.id} className="ow-row">
                  <Td><IE value={s.rol} onChange={(v) => upd(s.id, 'rol', v)} width="160px" /></Td>
                  <Td s={{ color: C.muted }}><IE value={s.espacio} onChange={(v) => upd(s.id, 'espacio', v)} width="110px" /></Td>
                  <Td>
                    <select value={s.tipo} onChange={(e) => upd(s.id, 'tipo', e.target.value)} style={{ ...inp, width: 105, padding: '5px 8px', fontSize: 12 }}>
                      <option>Plantilla</option><option>Externo</option><option>Autónomo</option>
                    </select>
                  </Td>
                  <Td s={{ color: C.blue, fontWeight: 600 }}><IE value={s.salario} onChange={(v) => upd(s.id, 'salario', v)} type="number" width="85px" /></Td>
                  <Td s={{ color: s.ss === 0 ? C.bord : C.muted }}>{s.ss === 0 ? '—' : s.ss.toLocaleString('es-ES')}</Td>
                  <Td s={{ color: s.provision === 0 ? C.bord : C.muted }}>{s.provision === 0 ? '—' : s.provision.toLocaleString('es-ES')}</Td>
                  <Td s={{ color: s.extras === 0 ? C.bord : C.muted }}>{s.extras === 0 ? '—' : s.extras}</Td>
                  <Td s={{ color: C.pink, fontWeight: 700 }}>{s.costeTotal.toLocaleString('es-ES')} €</Td>
                  <Td s={{ color: C.sub }}>{s.costeMes.toLocaleString('es-ES')} €</Td>
                  <Td>
                    {s.precioServicio !== null ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ color: C.yellow }}><IE value={s.precioServicio} onChange={(v) => upd(s.id, 'precioServicio', v)} type="number" width="60px" /> €</span>
                        <button onClick={() => upd(s.id, 'precioServicio', null)} title="Convertir a coste fijo" style={{ ...btnStyle(C.muted, true), padding: '0 5px', height: 20, fontSize: 10 }}>×</button>
                      </div>
                    ) : (
                      <span onClick={() => upd(s.id, 'precioServicio', 60)} title="Clic para asignar precio servicio" style={{ fontSize: 12, color: C.muted, cursor: "pointer", borderBottom: "1px dashed #ccc" }}>coste fijo</span>
                    )}
                  </Td>
                  <Td>
                    {del === s.id ? (
                      <span style={{ display: "flex", gap: 5 }}>
                        <button onClick={() => { setStaff((prev) => prev.filter((x) => x.id !== s.id)); setDel(null); }} style={{ ...btnStyle(C.red), fontSize: 13, padding: '4px 10px' }}>Confirmar</button>
                        <button onClick={() => setDel(null)} style={{ ...btnStyle(C.muted, true), fontSize: 13, padding: '4px 10px' }}>Cancelar</button>
                      </span>
                    ) : (
                      <button onClick={() => setDel(s.id)} title="Eliminar trabajador" style={{ background: `${C.red}12`, border: `1px solid ${C.red}30`, borderRadius: 7, cursor: 'pointer', color: C.red, fontSize: 13, fontWeight: 600, padding: '5px 10px', transition: 'background .15s, border-color .15s', whiteSpace: 'nowrap' }}>🗑 Eliminar</button>
                    )}
                  </Td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ borderTop: "1px solid #c4d0cc" }}>
                <Td s={{ fontWeight: 700, color: C.sub }}>TOTAL ({cs.length} personas)</Td>
                <Td colSpan={6} />
                <Td s={{ fontWeight: 700, color: C.pink }}>{totalAnual.toLocaleString('es-ES')} €</Td>
                <Td s={{ fontWeight: 700, color: C.sub }}>{Math.round(totalAnual / 12).toLocaleString('es-ES')} €/mes</Td>
                <Td colSpan={2} />
              </tr>
            </tfoot>
          </table>
        </div>
        <p style={{ fontSize: 13, color: C.muted, marginTop: 14, paddingTop: 14, borderTop: "1px solid #eaeeec" }}>
          💡 Solo edita el <strong style={{ color: C.sub }}>salario bruto</strong>. SS (33%), provisión
          por despido (33 días) y gastos de gestión (Nómina 20€/mes + PRL 300/550/1.500€ total ÷ plantilla + Médico 51€/año) se calculan
          automáticamente según el tamaño de la plantilla (tramos: 1-5, 6-10, &gt;10 trabajadores).
        </p>
      </Panel>
    </div>
  );
});