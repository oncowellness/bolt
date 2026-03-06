import React, { useState } from 'react';
import { useLS } from '../../hooks/useLS';
import { C } from '../../styles/theme';
import { inp } from '../UI';
import { DEFAULT_B2B_PACKS } from '../../data/defaults';
import { LOOP_STEPS } from '../../data/static';

export function B2B() {
  const [b2bPacks, setB2bPacks] = useLS('ow_b2b_packs', DEFAULT_B2B_PACKS);
  const [selectedStep, setSelectedStep] = useState(1);
  const step = LOOP_STEPS.find((s) => s.n === selectedStep);

  const updPack = (id, field, val) =>
    setB2bPacks((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, [field]: ['pvp', 'coste'].includes(field) ? +val : val }
          : p
      )
    );

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
          🏢 Canal B2B — Empresas & Seguros
        </h2>
        <p style={{ margin: 0, fontSize: 13, color: C.muted }}>
          Welcome Packs corporativos · Loop estratégico de captación ·
          Comisiones del equipo embajador
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px,1fr))',
          gap: 11,
        }}
      >
        {[
          { icon: '🎯', label: 'Leads/mes objetivo', value: '2–3', color: C.blue },
          { icon: '🤝', label: 'Conversión reunión', value: '40–50%', color: C.pink },
          { icon: '📝', label: 'Cierres/trimestre', value: '1–2', color: C.yellow },
          { icon: '💶', label: 'Ticket mínimo', value: '2.500€', color: C.green },
          { icon: '📈', label: 'LTV objetivo', value: '>5.000€', color: C.purple },
          { icon: '🔄', label: 'Renovación objetivo', value: '80%+', color: C.orange },
        ].map((k) => (
          <div
            key={k.label}
            style={{
              padding: '13px 14px',
              background: C.surf,
              border: `1px solid ${k.color}30`,
              borderRadius: 12,
            }}
          >
            <div style={{ fontSize: 17 }}>{k.icon}</div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: k.color,
                fontFamily: "'Open Sans', sans-serif",
                margin: '5px 0 3px',
              }}
            >
              {k.value}
            </div>
            <div
              style={{
                fontSize: 12,
                color: C.muted,
                textTransform: 'uppercase',
                letterSpacing: 0.7,
              }}
            >
              {k.label}
            </div>
          </div>
        ))}
      </div>

      <div>
        <h3
          style={{
            margin: '0 0 13px',
            fontSize: 13,
            fontWeight: 700,
            color: C.sub,
            textTransform: 'uppercase',
            letterSpacing: 0.8,
          }}
        >
          🎁 Welcome Packs Corporativos
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px,1fr))',
            gap: 14,
          }}
        >
          {b2bPacks.map((pk) => {
            const mg =
              pk.pvp > 0
                ? (((pk.pvp - pk.coste) / pk.pvp) * 100).toFixed(1)
                : '0';
            return (
              <div
                key={pk.id}
                style={{
                  padding: 18,
                  background: `${pk.color}08`,
                  border: `1px solid ${pk.color}30`,
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
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: pk.color,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                    }}
                  >
                    Pack Corporativo
                  </span>
                  <span
                    style={{ fontSize: 13, fontWeight: 700, color: C.green }}
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
                    Nombre del pack
                  </label>
                  <input
                    value={pk.nombre}
                    onChange={(e) => updPack(pk.id, 'nombre', e.target.value)}
                    style={{
                      ...inp,
                      fontWeight: 600,
                      fontSize: 14,
                      color: pk.color,
                    }}
                  />
                </div>
                <div style={{ marginBottom: 10 }}>
                  <label
                    style={{
                      fontSize: 12,
                      color: C.muted,
                      display: 'block',
                      marginBottom: 3,
                    }}
                  >
                    Contenido del pack
                  </label>
                  <textarea
                    value={pk.incluye}
                    onChange={(e) => updPack(pk.id, 'incluye', e.target.value)}
                    style={{
                      ...inp,
                      fontSize: 13,
                      minHeight: 60,
                      resize: 'vertical',
                      lineHeight: 1.5,
                      color: C.sub,
                    }}
                  />
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 10,
                  }}
                >
                  <div>
                    <label
                      style={{
                        fontSize: 12,
                        color: C.muted,
                        display: 'block',
                        marginBottom: 3,
                      }}
                    >
                      PVP €
                    </label>
                    <input
                      type="number"
                      value={pk.pvp}
                      onChange={(e) => updPack(pk.id, 'pvp', e.target.value)}
                      style={{
                        ...inp,
                        fontSize: 17,
                        fontWeight: 700,
                        color: pk.color,
                        padding: '6px 8px',
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        fontSize: 12,
                        color: C.muted,
                        display: 'block',
                        marginBottom: 3,
                      }}
                    >
                      Coste est. €
                    </label>
                    <input
                      type="number"
                      value={pk.coste}
                      onChange={(e) => updPack(pk.id, 'coste', e.target.value)}
                      style={{
                        ...inp,
                        fontSize: 17,
                        fontWeight: 700,
                        color: C.pink,
                        padding: '6px 8px',
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    marginTop: 10,
                    padding: '8px 10px',
                    background: '#f9fafb',
                    borderRadius: 8,
                    fontSize: 13,
                  }}
                >
                  <span style={{ color: C.muted }}>Margen bruto: </span>
                  <strong style={{ color: pk.color }}>
                    {(pk.pvp - pk.coste).toLocaleString('es-ES')} €
                  </strong>
                  <span style={{ color: C.muted, marginLeft: 10 }}>
                    Amort. 5a aprox:{' '}
                  </span>
                  <strong style={{ color: C.muted }}>
                    {Math.round(pk.coste / 60)} €/mes
                  </strong>
                </div>
              </div>
            );
          })}
        </div>
      </div>

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
          🔄 Loop Estratégico de Captación B2B
        </h3>

        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {LOOP_STEPS.map((s, i) => (
            <div
              key={s.n}
              style={{ display: 'flex', alignItems: 'center', flex: 1 }}
            >
              <div
                onClick={() => setSelectedStep(s.n)}
                style={{
                  flex: 1,
                  padding: '12px 10px',
                  borderRadius: 10,
                  cursor: 'pointer',
                  textAlign: 'center',
                  background:
                    selectedStep === s.n
                      ? `${s.color}15`
                      : '#f9fafb',
                  border: `2px solid ${
                    selectedStep === s.n ? s.color : C.bord
                  }`,
                  transition: 'all .2s',
                }}
              >
                <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: selectedStep === s.n ? s.color : C.muted,
                  }}
                >
                  Paso {s.n}
                </div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>
                  {s.label}
                </div>
              </div>
              {i < LOOP_STEPS.length - 1 && (
                <div style={{ fontSize: 16, color: C.bord, padding: '0 4px' }}>
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        {step && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 14,
            }}
          >
            <div
              style={{
                padding: 16,
                background: `${step.color}08`,
                border: `1px solid ${step.color}30`,
                borderRadius: 13,
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 8 }}>{step.icon}</div>
              <h4
                style={{
                  margin: '0 0 8px',
                  fontSize: 14,
                  fontWeight: 700,
                  color: step.color,
                }}
              >
                {step.label}
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: C.sub,
                  lineHeight: 1.6,
                }}
              >
                {step.descripcion}
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
                  margin: '0 0 10px',
                  fontSize: 13,
                  fontWeight: 700,
                  color: C.blue,
                  textTransform: 'uppercase',
                  letterSpacing: 0.7,
                }}
              >
                📊 KPIs del Paso
              </h4>
              {step.kpis.map((k, i) => (
                <div
                  key={i}
                  style={{ display: 'flex', gap: 7, marginBottom: 8 }}
                >
                  <span style={{ color: C.blue, fontSize: 12, marginTop: 2 }}>
                    ▸
                  </span>
                  <span style={{ fontSize: 13, color: C.sub, lineHeight: 1.5 }}>
                    {k}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                padding: 16,
                background: `${C.green}08`,
                border: `1px solid ${C.green}30`,
                borderRadius: 13,
              }}
            >
              <h4
                style={{
                  margin: '0 0 10px',
                  fontSize: 13,
                  fontWeight: 700,
                  color: C.green,
                  textTransform: 'uppercase',
                  letterSpacing: 0.7,
                }}
              >
                💰 Bonus Equipo Embajador
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: C.green,
                  fontWeight: 600,
                  lineHeight: 1.6,
                }}
              >
                {step.bonus}
              </p>
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          padding: 18,
          background: `${C.purple}08`,
          border: `1px solid ${C.purple}30`,
          borderRadius: 13,
        }}
      >
        <h3
          style={{
            margin: '0 0 10px',
            fontSize: 13,
            fontWeight: 700,
            color: C.purple,
          }}
        >
          🌟 Argumento RSC para Empresas
        </h3>
        <p
          style={{
            margin: '0 0 12px',
            fontSize: 13,
            color: C.sub,
            lineHeight: 1.7,
          }}
        >
          El cáncer afecta al{' '}
          <strong style={{ color: C.txt }}>33% de la población activa</strong>{' '}
          en España. Cada empresa con más de 100 empleados tiene
          estadísticamente{' '}
          <strong style={{ color: C.txt }}>
            3–5 personas en proceso oncológico activo
          </strong>
          . OncoWellness ofrece a las empresas un programa de bienestar
          oncológico que reduce el absentismo, mejora la retención del talento y
          refuerza la imagen corporativa responsable.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: 10,
          }}
        >
          {[
            { v: '33%', l: 'empleados afectados por cáncer a lo largo de su vida laboral', c: C.red },
            { v: '35%', l: 'reducción del absentismo con programas de bienestar oncológico', c: C.green },
            { v: '2×', l: 'mayor retención de talento en empresas con programas de salud avanzados', c: C.blue },
            { v: '€€€', l: 'ahorro en bajas laborales y sustituciones por cada empleado acompañado', c: C.yellow },
          ].map((k) => (
            <div
              key={k.l}
              style={{
                padding: 12,
                background: `${k.c}08`,
                borderRadius: 9,
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: k.c,
                  fontFamily: "'Open Sans', sans-serif",
                }}
              >
                {k.v}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: C.muted,
                  marginTop: 4,
                  lineHeight: 1.4,
                }}
              >
                {k.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}