import React, { memo, useMemo, useState } from 'react';
import { C } from '../../styles/theme';
import { Panel, SH, Th, Td, IE, Badge, btnStyle, inp } from '../UI';
import { calcProg } from '../../utils/helpers';

const AREA_PREFIXES = {
  'FX': 'Fisioterapia',
  'PS': 'Psico-Oncología',
  'NU': 'Nutrición',
  'ED': 'Digital',
  'PA': 'Paliativos',
  'SX': 'Sexología',
  'ES': 'Estética',
  'TS': 'Trabajo Social',
  'TO': 'Terapia Ocupacional',
};

export const Programas = memo(({ programas, setProgramas, paquetes, setPaquetes }) => {
  const [filtro, setFiltro] = useState('Todos');
  const [subTab, setSubTab] = useState('programas');
  const [del, setDel] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newProg, setNewProg] = useState({
    nombre: '',
    fase: 'F1',
    precio: 60,
    coste: 25,
    pacientes: 20,
    sesiones: 8,
  });
  const [selectedPrefix, setSelectedPrefix] = useState('FX');

  const areas = useMemo(() => ["Todos", ...new Set(programas.map(p => p.area))], [programas]);
  const cp = useMemo(() => programas.map(calcProg), [programas]);
  const filtrados = useMemo(() => filtro === "Todos" ? cp : cp.filter(p => p.area === filtro), [filtro, cp]);
  const mc = (m) => (m >= 0.6 ? C.green : m >= 0.5 ? C.yellow : C.orange);
  const paqColors = [C.red, C.orange, C.yellow, C.brand, C.purple];

  const openModal = (prefix) => {
    setSelectedPrefix(prefix);
    setNewProg({
      nombre: '',
      fase: 'F1',
      precio: 60,
      coste: 25,
      pacientes: 20,
      sesiones: 8,
    });
    setModalOpen(true);
  };

  const handleCreateProgram = () => {
    const area = AREA_PREFIXES[selectedPrefix] || 'Fisioterapia';
    const existingCodesWithPrefix = programas.filter(p => p.codigo.startsWith(selectedPrefix + '-')).map(p => p.codigo);
    let nextNumber = 1;
    while (existingCodesWithPrefix.includes(`${selectedPrefix}-${String(nextNumber).padStart(2, '0')}`)) {
      nextNumber++;
    }
    const newCodigo = `${selectedPrefix}-${String(nextNumber).padStart(2, '0')}`;

    setProgramas((prev) => [
      ...prev,
      {
        codigo: newCodigo,
        nombre: newProg.nombre || 'Nuevo programa',
        area,
        fase: newProg.fase,
        precio: +newProg.precio,
        coste: +newProg.coste,
        pacientes: +newProg.pacientes,
        sesiones: +newProg.sesiones,
      },
    ]);
    setModalOpen(false);
  };

  const upd = (codigo, field, val) =>
    setProgramas((prev) =>
      prev.map((p) =>
        p.codigo === codigo
          ? {
              ...p,
              [field]: ['precio', 'coste', 'pacientes', 'sesiones'].includes(
                field
              )
                ? +val
                : val,
            }
          : p
      )
    );
  const updPaq = (codigo, field, val) =>
    setPaquetes((prev) =>
      prev.map((pk) =>
        pk.codigo === codigo
          ? {
              ...pk,
              [field]: ['pvp', 'coste', 'sesiones'].includes(field)
                ? +val
                : val,
            }
          : pk
      )
    );

  return (
    <div className="ow-in" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <SH sub="Edita precio, coste y pacientes — margen e ingresos se recalculan solos">Programas & Paquetes</SH>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => setSubTab('programas')}
            style={{ ...btnStyle(C.brand, subTab !== "programas"), borderColor: subTab === "programas" ? C.brand : undefined, color: subTab === "programas" ? "#051a10" : C.sub, background: subTab === "programas" ? C.brand : "transparent" }}
          >
            Programas ({programas.length})
          </button>
          <button
            onClick={() => setSubTab('paquetes')}
            style={{ ...btnStyle(C.purple, subTab !== "paquetes"), borderColor: subTab === "paquetes" ? C.purple : undefined, color: subTab === "paquetes" ? "#fff" : C.sub, background: subTab === "paquetes" ? C.purple : "transparent" }}
          >
            Paquetes ({paquetes.length})
          </button>
        </div>
      </div>

      {subTab === 'programas' && (
        <>
          <div
            style={{
              display: 'flex',
              gap: 6,
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
              {areas.map((a) => (
                <button
                  key={a}
                  onClick={() => setFiltro(a)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 8,
                    border: `1px solid ${filtro === a ? C.brand : C.bord}`,
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: 600,
                    background:
                      filtro === a ? "rgba(0,122,88,0.08)" : "#f4f6f5",
                    color: filtro === a ? C.brand : C.sub,
                    transition: "all .15s"
                  }}
                >
                  {a}
                </button>
              ))}
            </div>
            <button
              onClick={() =>
                setProgramas((prev) => [
                  ...prev,
                  {
                    codigo: 'NW-' + String(prev.length + 1).padStart(2, '0'),
                    nombre: 'Nuevo programa',
                    area: 'Fisioterapia',
                    fase: 'F1',
                    precio: 60,
                    coste: 25,
                    pacientes: 20,
                    sesiones: 8,
                  },
                ])
              }
              style={btnStyle(C.brand)}
            >
              + Añadir
            </button>
          </div>

          <Panel style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr style={{ background: "#f0f5f3" }}>
                    <Th>Código</Th>
                    <Th>Nombre</Th>
                    <Th>Área</Th>
                    <Th>Fase</Th>
                    <Th highlight>Precio/ses €</Th>
                    <Th>Coste/ses €</Th>
                    <Th highlight>Margen %</Th>
                    <Th highlight>Pac./año</Th>
                    <Th>Sesiones</Th>
                    <Th highlight>Ingresos/año</Th>
                    <Th></Th>
                </tr></thead>
                <tbody>
                  {filtrados.map((p) => (
                    <tr key={p.codigo} className="ow-row">
                      <Td>
                        <span
                          onClick={() => {
                            const prefix = p.codigo.split('-')[0];
                            if (AREA_PREFIXES[prefix]) {
                              openModal(prefix);
                            }
                          }}
                          style={{ cursor: 'pointer' }}
                          title="Clic para crear un nuevo programa con este prefijo"
                        >
                          <Badge text={p.codigo} color={C.blue} />
                        </span>
                      </Td>
                      <Td>
                        <IE
                          value={p.nombre}
                          onChange={(v) => upd(p.codigo, 'nombre', v)}
                          width="190px"
                        />
                      </Td>
                      <Td>
                        <select
                          value={p.area}
                          onChange={(e) =>
                            upd(p.codigo, 'area', e.target.value)
                          }
                          style={{
                            ...inp,
                            width: 115,
                            padding: '3px 5px',
                            fontSize: 13,
                          }}
                        >
                          {[
                            'Fisioterapia',
                            'Psico-Oncología',
                            'Nutrición',
                            'Digital',
                            'Paliativos',
                            'Sexología',
                            'Estética',
                            'Trabajo Social',
                          ].map((a) => (
                            <option key={a}>{a}</option>
                          ))}
                        </select>
                      </Td>
                      <Td>
                        <IE
                          value={p.fase}
                          onChange={(v) => upd(p.codigo, 'fase', v)}
                          width="65px"
                        />
                      </Td>
                      <Td s={{ color: C.yellow }}>
                        <IE
                          value={p.precio}
                          onChange={(v) => upd(p.codigo, 'precio', v)}
                          type="number"
                          width="60px"
                        />
                      </Td>
                      <Td s={{ color: C.muted }}>
                        <IE
                          value={p.coste}
                          onChange={(v) => upd(p.codigo, 'coste', v)}
                          type="number"
                          width="60px"
                        />
                      </Td>
                      <Td s={{ color: mc(p.margen), fontWeight: 700 }}>
                        {(p.margen * 100).toFixed(1)}%
                      </Td>
                      <Td>
                        <IE
                          value={p.pacientes}
                          onChange={(v) => upd(p.codigo, 'pacientes', v)}
                          type="number"
                          width="60px"
                        />
                      </Td>
                      <Td>
                        <IE
                          value={p.sesiones}
                          onChange={(v) => upd(p.codigo, 'sesiones', v)}
                          type="number"
                          width="60px"
                        />
                      </Td>
                      <Td s={{ color: C.brand, fontWeight: 700 }}>
                        {p.ingresos.toLocaleString('es-ES')} €
                      </Td>
                      <Td>
                        {del === p.codigo ? (
                          <span style={{ display: "flex", gap: 5 }}>
                            <button
                              onClick={() => {
                                setProgramas((prev) =>
                                  prev.filter((x) => x.codigo !== p.codigo)
                                );
                                setDel(null);
                              }}
                              style={{ ...btnStyle(C.red), fontSize: 13, padding: '4px 10px' }}
                            >
                              Borrar
                            </button>
                            <button
                              onClick={() => setDel(null)}
                              style={{ ...btnStyle(C.muted, true), fontSize: 13, padding: '4px 10px' }}
                            >
                              No
                            </button>
                          </span>
                        ) : (
                          <button
                            onClick={() => setDel(p.codigo)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, fontSize: 16, lineHeight: 1, padding: "0 2px" }}
                          >
                            ✕
                          </button>
                        )}
                      </Td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr style={{ borderTop: "1px solid #c4d0cc" }}>
                    <Td colSpan={4} s={{ fontWeight: 700, color: C.sub }}>
                      TOTAL ({filtrados.length})
                    </Td>
                    <Td />
                    <Td />
                    <Td s={{ fontWeight: 700, color: C.brand }}>
                      {filtrados.length > 0
                        ? (
                            (filtrados.reduce((a, p) => a + p.margen, 0) /
                              filtrados.length) *
                            100
                          ).toFixed(1)
                        : 0}
                      %
                    </Td>
                    <Td s={{ fontWeight: 700, color: C.sub }}>
                      {filtrados.reduce((a, p) => a + p.pacientes, 0)}
                    </Td>
                    <Td />
                    <Td s={{ fontWeight: 700, color: C.brand }}>
                      {filtrados
                        .reduce((a, p) => a + p.ingresos, 0)
                        .toLocaleString('es-ES')}{' '}
                      €
                    </Td>
                    <Td />
                  </tr>
                </tfoot>
              </table>
            </div>
          </Panel>
        </>
      )}

      {subTab === 'paquetes' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))',
            gap: 14,
          }}
        >
          {paquetes.map((pk, i) => {
            const col = paqColors[i % paqColors.length];
            const mg =
              pk.pvp > 0
                ? (((pk.pvp - pk.coste) / pk.pvp) * 100).toFixed(1)
                : '0';
            return (
              <div
                key={pk.codigo}
                style={{
                  padding: 18,
                  background: `${col}08`,
                  border: `1px solid ${col}30`,
                  borderRadius: 13,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                  }}
                >
                  <Badge text={pk.codigo} color={col} />
                  <span
                    style={{ fontSize: 14, fontWeight: 700, color: C.green }}
                  >
                    {mg}% mg
                  </span>
                </div>
                <div style={{ marginBottom: 9 }}>
                  <label
                    style={{
                      fontSize: 12,
                      color: C.muted,
                      display: 'block',
                      marginBottom: 3,
                    }}
                  >
                    Nombre
                  </label>
                  <input
                    value={pk.nombre}
                    onChange={(e) =>
                      updPaq(pk.codigo, 'nombre', e.target.value)
                    }
                    style={{ ...inp, fontWeight: 600, fontSize: 13 }}
                  />
                </div>
                <div style={{ marginBottom: 12 }}>
                  <label
                    style={{
                      fontSize: 13, fontWeight: 600,
                      color: C.muted,
                      display: 'block',
                      marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5
                    }}
                  >
                    Fase del Journey
                  </label>
                  <input
                    value={pk.fase}
                    onChange={(e) => updPaq(pk.codigo, 'fase', e.target.value)}
                    style={{ ...inp, fontSize: 12 }}
                  />
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: 8,
                  }}
                >
                  {[
                    { l: 'PVP Pack €', f: 'pvp', c: col },
                    { l: 'Coste Est. €', f: 'coste', c: C.pink },
                    { l: 'Sesiones', f: 'sesiones', c: C.yellow },
                  ].map((x) => (
                    <div key={x.f}>
                      <label
                        style={{
                          fontSize: 13, fontWeight: 700,
                          color: C.muted,
                          display: 'block',
                          marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5
                        }}
                      >
                        {x.l}
                      </label>
                      <input
                        type="number"
                        value={pk[x.f]}
                        onChange={(e) => updPaq(pk.codigo, x.f, e.target.value)}
                        style={{
                          ...inp,
                          fontSize: 15,
                          fontWeight: 700,
                          color: x.c,
                          padding: '6px 8px',
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    marginTop: 12, paddingTop: 12, borderTop: "1px solid #eaeeec",
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 11
                  }}
                >
                  <span>
                    Margen bruto:{' '}
                    <strong style={{ color: col }}>
                      {(pk.pvp - pk.coste).toLocaleString('es-ES')} €
                    </strong>
                  </span>
                  <span>
                    Ahorro ~12%:{' '}
                    <strong style={{ color: C.brand }}>
                      {Math.round(pk.pvp * 0.12)} €
                    </strong>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)',
          }}
          onClick={() => setModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: C.surf,
              borderRadius: 16,
              padding: 32,
              maxWidth: 600,
              width: '90%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: C.txt }}>
                Crear nuevo programa {selectedPrefix}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 24,
                  color: C.muted,
                  cursor: 'pointer',
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: 16, padding: 12, background: `${C.blue}08`, border: `1px solid ${C.blue}30`, borderRadius: 10 }}>
              <div style={{ fontSize: 13, color: C.blue, fontWeight: 600, marginBottom: 4 }}>
                Area: {AREA_PREFIXES[selectedPrefix]}
              </div>
              <div style={{ fontSize: 12, color: C.muted }}>
                El codigo se generara automaticamente como {selectedPrefix}-XX
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: C.sub, marginBottom: 6 }}>
                  Nombre del programa
                </label>
                <input
                  autoFocus
                  type="text"
                  value={newProg.nombre}
                  onChange={(e) => setNewProg(prev => ({ ...prev, nombre: e.target.value }))}
                  placeholder="Ej: Prehabilitacion oncologica integral"
                  style={{ ...inp }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: C.sub, marginBottom: 6 }}>
                  Fase del Journey
                </label>
                <input
                  type="text"
                  value={newProg.fase}
                  onChange={(e) => setNewProg(prev => ({ ...prev, fase: e.target.value }))}
                  placeholder="Ej: F1-F2"
                  style={{ ...inp }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: C.sub, marginBottom: 6 }}>
                    Precio por sesion (EUR)
                  </label>
                  <input
                    type="number"
                    value={newProg.precio}
                    onChange={(e) => setNewProg(prev => ({ ...prev, precio: e.target.value }))}
                    style={{ ...inp }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: C.sub, marginBottom: 6 }}>
                    Coste por sesion (EUR)
                  </label>
                  <input
                    type="number"
                    value={newProg.coste}
                    onChange={(e) => setNewProg(prev => ({ ...prev, coste: e.target.value }))}
                    style={{ ...inp }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: C.sub, marginBottom: 6 }}>
                    Pacientes por año
                  </label>
                  <input
                    type="number"
                    value={newProg.pacientes}
                    onChange={(e) => setNewProg(prev => ({ ...prev, pacientes: e.target.value }))}
                    style={{ ...inp }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: C.sub, marginBottom: 6 }}>
                    Sesiones por paciente
                  </label>
                  <input
                    type="number"
                    value={newProg.sesiones}
                    onChange={(e) => setNewProg(prev => ({ ...prev, sesiones: e.target.value }))}
                    style={{ ...inp }}
                  />
                </div>
              </div>

              <div style={{ padding: 14, background: `${C.green}08`, border: `1px solid ${C.green}30`, borderRadius: 10 }}>
                <div style={{ fontSize: 12, color: C.muted, marginBottom: 4 }}>Vista previa</div>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <div>
                    <span style={{ fontSize: 11, color: C.muted }}>Margen: </span>
                    <strong style={{ fontSize: 14, color: C.green }}>
                      {newProg.precio > 0 ? (((newProg.precio - newProg.coste) / newProg.precio) * 100).toFixed(1) : '0'}%
                    </strong>
                  </div>
                  <div>
                    <span style={{ fontSize: 11, color: C.muted }}>Ingresos anuales: </span>
                    <strong style={{ fontSize: 14, color: C.brand }}>
                      {(newProg.precio * newProg.sesiones * newProg.pacientes).toLocaleString('es-ES')} EUR
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              <button
                onClick={handleCreateProgram}
                style={{ ...btnStyle(C.brand), flex: 1 }}
              >
                Crear programa
              </button>
              <button
                onClick={() => setModalOpen(false)}
                style={{ ...btnStyle(C.muted, true) }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});