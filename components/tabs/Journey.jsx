import React, { useState } from 'react';
import { C } from '../../styles/theme';
import { JOURNEY_DATA, JOURNEY_INSIGHTS } from '../../data/static';

export function Journey() {
  const [selected, setSelected] = useState('F1');
  const fase = JOURNEY_DATA.find((f) => f.id === selected);
  const discColor = (d) =>
    d >= 6 ? C.red : d >= 4 ? C.orange : d >= 3 ? C.yellow : C.green;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div>
        <h2
          style={{
            margin: '0 0 4px',
            fontSize: 21,
            fontWeight: 700,
            fontFamily: "'Open Sans', sans-serif",
            color: C.txt,
          }}
        >
          🗺️ Journey del Paciente F1→F8
        </h2>
        <p style={{ margin: 0, fontSize: 13, color: C.muted }}>
          Mapa clínico-emocional completo del recorrido oncológico · Selecciona
          una fase para ver detalle
        </p>
      </div>

      <div
        style={{ display: 'flex', gap: 0, overflowX: 'auto', paddingBottom: 4 }}
      >
        {JOURNEY_DATA.map((f, i) => (
          <div
            key={f.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              flex: 1,
              minWidth: 90,
            }}
          >
            <div
              onClick={() => setSelected(f.id)}
              style={{
                flex: 1,
                padding: '10px 8px',
                borderRadius: 10,
                cursor: 'pointer',
                textAlign: 'center',
                background:
                  selected === f.id ? `${f.color}22` : '#f9fafb',
                border: `2px solid ${selected === f.id ? f.color : C.bord}`,
                transition: 'all .2s',
              }}
              onMouseEnter={(e) => {
                if (selected !== f.id)
                  e.currentTarget.style.borderColor = f.color + '80';
              }}
              onMouseLeave={(e) => {
                if (selected !== f.id)
                  e.currentTarget.style.borderColor = C.bord;
              }}
            >
              <div style={{ fontSize: 18, marginBottom: 3 }}>{f.emoji}</div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: selected === f.id ? f.color : C.muted,
                  lineHeight: 1.3,
                }}
              >
                {f.id}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: C.muted,
                  lineHeight: 1.2,
                  marginTop: 2,
                }}
              >
                {f.label.split('·')[1].trim()}
              </div>
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: discColor(f.discomfort),
                  margin: '5px auto 0',
                }}
                title={`Malestar: ${f.discomfort}/10`}
              />
            </div>
            {i < JOURNEY_DATA.length - 1 && (
              <div
                style={{
                  width: 18,
                  height: 2,
                  background: `linear-gradient(to right, ${f.color}60, ${
                    JOURNEY_DATA[i + 1].color
                  }60)`,
                  flexShrink: 0,
                }}
              />
            )}
          </div>
        ))}
      </div>

      {fase && (
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div
              style={{
                padding: 18,
                background: `${fase.color}10`,
                border: `1px solid ${fase.color}35`,
                borderRadius: 13,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                  marginBottom: 12,
                }}
              >
                <span style={{ fontSize: 32 }}>{fase.emoji}</span>
                <div>
                  <h3
                    style={{
                      margin: '0 0 4px',
                      fontSize: 17,
                      fontWeight: 700,
                      color: fase.color,
                      fontFamily: "'Open Sans', sans-serif",
                    }}
                  >
                    {fase.label}
                  </h3>
                  <div
                    style={{ display: 'flex', gap: 8, alignItems: 'center' }}
                  >
                    <span style={{ fontSize: 13, color: C.muted }}>
                      Estado mental:
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: fase.color,
                      }}
                    >
                      {fase.mindState}
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      gap: 8,
                      alignItems: 'center',
                      marginTop: 3,
                    }}
                  >
                    <span style={{ fontSize: 13, color: C.muted }}>
                      Malestar:
                    </span>
                    <div style={{ display: 'flex', gap: 2 }}>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <div
                          key={n}
                          style={{
                            width: 12,
                            height: 8,
                            borderRadius: 2,
                            background:
                              n <= fase.discomfort
                                ? discColor(fase.discomfort)
                                : '#e5e7eb',
                          }}
                        />
                      ))}
                    </div>
                    <span
                      style={{
                        fontSize: 12,
                        color: discColor(fase.discomfort),
                        fontWeight: 700,
                      }}
                    >
                      {fase.discomfort}/10
                    </span>
                  </div>
                </div>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: C.sub,
                  lineHeight: 1.6,
                }}
              >
                {fase.description}
              </p>
            </div>

            <div
              style={{
                padding: 16,
                background: C.surf,
                border: `1px solid ${C.bord}`,
                borderRadius: 13,
              }}
            >
              <h4
                style={{
                  margin: '0 0 11px',
                  fontSize: 13,
                  fontWeight: 700,
                  color: C.red,
                  textTransform: 'uppercase',
                  letterSpacing: 0.7,
                }}
              >
                ⚠️ Pain Points del Paciente
              </h4>
              {fase.painPoints.map((pp, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 8,
                    marginBottom: 8,
                    alignItems: 'flex-start',
                  }}
                >
                  <span style={{ color: C.red, fontSize: 12, marginTop: 2 }}>
                    ●
                  </span>
                  <span style={{ fontSize: 13, color: C.sub, lineHeight: 1.5 }}>
                    {pp}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                padding: 14,
                background: `${C.purple}10`,
                border: `1px solid ${C.purple}30`,
                borderRadius: 13,
              }}
            >
              <h4
                style={{
                  margin: '0 0 8px',
                  fontSize: 13,
                  fontWeight: 700,
                  color: C.purple,
                  textTransform: 'uppercase',
                  letterSpacing: 0.7,
                }}
              >
                💡 Insight Clínico
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: C.sub,
                  lineHeight: 1.6,
                  fontStyle: 'italic',
                }}
              >
                {fase.insight}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div
              style={{
                padding: 16,
                background: C.surf,
                border: `1px solid ${C.bord}`,
                borderRadius: 13,
              }}
            >
              <h4
                style={{
                  margin: '0 0 11px',
                  fontSize: 13,
                  fontWeight: 700,
                  color: C.blue,
                  textTransform: 'uppercase',
                  letterSpacing: 0.7,
                }}
              >
                🏥 Programas Recomendados
              </h4>
              {fase.programas.map((prog, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 8,
                    padding: '7px 10px',
                    background: `${C.blue}08`,
                    border: `1px solid ${C.blue}20`,
                    borderRadius: 8,
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      color: C.blue,
                      fontWeight: 700,
                      minWidth: 50,
                    }}
                  >
                    {prog.split('—')[0].trim()}
                  </span>
                  <span style={{ fontSize: 13, color: C.sub }}>
                    {prog.split('—')[1]?.trim()}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                padding: 16,
                background: `${fase.color}08`,
                border: `1px solid ${fase.color}30`,
                borderRadius: 13,
              }}
            >
              <h4
                style={{
                  margin: '0 0 10px',
                  fontSize: 13,
                  fontWeight: 700,
                  color: fase.color,
                  textTransform: 'uppercase',
                  letterSpacing: 0.7,
                }}
              >
                📦 Paquete Clínico Recomendado
              </h4>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: fase.color,
                  marginBottom: 6,
                }}
              >
                {fase.paquete}
              </div>
              <div style={{ fontSize: 13, color: C.muted }}>
                Diseñado específicamente para las necesidades de esta fase del
                journey oncológico.
              </div>
            </div>

            <div
              style={{
                padding: 14,
                background: C.surf,
                border: `1px solid ${C.bord}`,
                borderRadius: 13,
              }}
            >
              <h4
                style={{
                  margin: '0 0 10px',
                  fontSize: 13,
                  fontWeight: 700,
                  color: C.muted,
                  textTransform: 'uppercase',
                  letterSpacing: 0.7,
                }}
              >
                Navegar a otra fase
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {JOURNEY_DATA.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelected(f.id)}
                    style={{
                      padding: '5px 10px',
                      borderRadius: 7,
                      border: `1px solid ${
                        f.id === selected ? f.color : C.bord
                      }`,
                      background:
                        f.id === selected ? `${f.color}18` : 'transparent',
                      color: f.id === selected ? f.color : C.muted,
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {f.emoji} {f.id}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
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
          🔬 6 Insights Clave — Evidencia Clínica
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))',
            gap: 12,
          }}
        >
          {JOURNEY_INSIGHTS.map((ins, i) => (
            <div
              key={i}
              style={{
                padding: 14,
                background: C.surf,
                border: `1px solid ${C.bord}`,
                borderRadius: 12,
                transition: 'border-color .2s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = C.purple + '60')
              }
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.bord)}
            >
              <div style={{ fontSize: 20, marginBottom: 7 }}>{ins.icon}</div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: C.txt,
                  marginBottom: 6,
                }}
              >
                {ins.titulo}
              </div>
              <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
                {ins.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}