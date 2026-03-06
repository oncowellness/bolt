import React from 'react';
import { useLS } from '../../hooks/useLS';
import { C } from '../../styles/theme';
import { Th, Td, btn, inp } from '../UI';
import { DEFAULT_PACKS_INCENTIVOS, DEFAULT_COMISIONES } from '../../data/defaults';

export function Incentivos() {
  const [packs, setPacks] = useLS('ow_inc_packs', DEFAULT_PACKS_INCENTIVOS);
  const [coms, setComs] = useLS('ow_inc_coms', DEFAULT_COMISIONES);
  const updP = (id, f, v) =>
    setPacks((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, [f]: ['sesiones', 'pvp', 'descuento'].includes(f) ? +v : v }
          : p
      )
    );
  const updC = (id, f, v) =>
    setComs((prev) => prev.map((c) => (c.id === id ? { ...c, [f]: v } : c)));
  const palColors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <h2
        style={{
          margin: '0 0 4px',
          fontSize: 21,
          fontWeight: 700,
          fontFamily: "'Open Sans', sans-serif",
          color: C.txt,
        }}
      >
        🎯 Sistema 360° de Incentivos
      </h2>

      <div>
        <h3
          style={{
            margin: '0 0 12px',
            fontSize: 13,
            fontWeight: 700,
            color: C.purple,
            textTransform: 'uppercase',
            letterSpacing: 0.8,
          }}
        >
          💊 Packs de Continuidad al Paciente
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px,1fr))',
            gap: 12,
          }}
        >
          {packs.map((pk, i) => {
            const col = palColors[i % palColors.length];
            const ahorro = Math.round(pk.pvp * (pk.descuento / 100));
            return (
              <div
                key={pk.id}
                style={{
                  padding: 16,
                  background: `${col}08`,
                  border: `1px solid ${col}30`,
                  borderRadius: 12,
                }}
              >
                <div style={{ marginBottom: 8 }}>
                  <label
                    style={{
                      fontSize: 12,
                      color: C.muted,
                      display: 'block',
                      marginBottom: 3,
                    }}
                  >
                    Nombre del pack
                  </label>
                  <input
                    value={pk.nombre}
                    onChange={(e) => updP(pk.id, 'nombre', e.target.value)}
                    style={{ ...inp, fontWeight: 600, fontSize: 13 }}
                  />
                </div>
                <div style={{ marginBottom: 8 }}>
                  <label
                    style={{
                      fontSize: 12,
                      color: C.muted,
                      display: 'block',
                      marginBottom: 3,
                    }}
                  >
                    Fase
                  </label>
                  <input
                    value={pk.fase}
                    onChange={(e) => updP(pk.id, 'fase', e.target.value)}
                    style={{ ...inp, fontSize: 11 }}
                  />
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: 7,
                  }}
                >
                  <div>
                    <label
                      style={{
                        fontSize: 12,
                        color: C.muted,
                        display: 'block',
                        marginBottom: 2,
                      }}
                    >
                      PVP €
                    </label>
                    <input
                      type="number"
                      value={pk.pvp}
                      onChange={(e) => updP(pk.id, 'pvp', e.target.value)}
                      style={{
                        ...inp,
                        fontSize: 15,
                        fontWeight: 700,
                        color: col,
                        padding: '5px 7px',
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        fontSize: 12,
                        color: C.muted,
                        display: 'block',
                        marginBottom: 2,
                      }}
                    >
                      Sesiones
                    </label>
                    <input
                      type="number"
                      value={pk.sesiones}
                      onChange={(e) => updP(pk.id, 'sesiones', e.target.value)}
                      style={{
                        ...inp,
                        fontSize: 15,
                        fontWeight: 700,
                        color: C.yellow,
                        padding: '5px 7px',
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        fontSize: 12,
                        color: C.muted,
                        display: 'block',
                        marginBottom: 2,
                      }}
                    >
                      Dto. %
                    </label>
                    <input
                      type="number"
                      value={pk.descuento}
                      onChange={(e) => updP(pk.id, 'descuento', e.target.value)}
                      style={{
                        ...inp,
                        fontSize: 15,
                        fontWeight: 700,
                        color: C.green,
                        padding: '5px 7px',
                      }}
                    />
                  </div>
                </div>
                <div style={{ marginTop: 8, fontSize: 12, color: C.muted }}>
                  Ahorro paciente:{' '}
                  <strong style={{ color: C.green }}>{ahorro} €</strong>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: 13,
              fontWeight: 700,
              color: C.yellow,
              textTransform: 'uppercase',
              letterSpacing: 0.8,
            }}
          >
            💼 Comisiones del Equipo
          </h3>
          <button
            onClick={() =>
              setComs((prev) => [
                ...prev,
                {
                  id: Date.now(),
                  rol: 'Recepción',
                  tipo: 'Nueva comisión',
                  cantidad: '—',
                  tope: '—',
                },
              ])
            }
            style={btn(C.yellow)}
          >
            + Añadir
          </button>
        </div>
        <div
          style={{
            background: C.surf,
            border: `1px solid ${C.bord}`,
            borderRadius: 13,
            padding: 16,
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <Th>Rol</Th>
                  <Th>Tipo de incentivo</Th>
                  <Th c={`${C.yellow}10`}>Cantidad / %</Th>
                  <Th c={`${C.pink}10`}>Tope</Th>
                  <Th></Th>
                </tr>
              </thead>
              <tbody>
                {coms.map((c) => (
                  <tr
                    key={c.id}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        '#f0fdf9')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = '')
                    }
                  >
                    <Td>
                      <select
                        value={c.rol}
                        onChange={(e) => updC(c.id, 'rol', e.target.value)}
                        style={{
                          ...inp,
                          width: 100,
                          padding: '4px 6px',
                          fontSize: 13,
                        }}
                      >
                        <option>Recepción</option>
                        <option>Clínico</option>
                        <option>Todos</option>
                      </select>
                    </Td>
                    <Td>
                      <input
                        value={c.tipo}
                        onChange={(e) => updC(c.id, 'tipo', e.target.value)}
                        style={{ ...inp, fontSize: 12 }}
                      />
                    </Td>
                    <Td>
                      <input
                        value={c.cantidad}
                        onChange={(e) => updC(c.id, 'cantidad', e.target.value)}
                        style={{
                          ...inp,
                          fontSize: 13,
                          color: C.yellow,
                          fontWeight: 600,
                        }}
                      />
                    </Td>
                    <Td>
                      <input
                        value={c.tope}
                        onChange={(e) => updC(c.id, 'tope', e.target.value)}
                        style={{ ...inp, fontSize: 13, color: C.pink }}
                      />
                    </Td>
                    <Td>
                      <button
                        onClick={() =>
                          setComs((prev) => prev.filter((x) => x.id !== c.id))
                        }
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: C.muted,
                        }}
                      >
                        ✕
                      </button>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ margin: '10px 0 0', fontSize: 13, color: C.muted }}>
            ⚠️ Marco Legal ES — Art. 26.3 ET. El clínico nunca percibe comisión
            directa por producto; su incentivo se vincula a adherencia y
            resultados clínicos.
          </p>
        </div>
      </div>
    </div>
  );
}