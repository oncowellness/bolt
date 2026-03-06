import React, { useState, useEffect } from 'react';
import { useLS } from './hooks/useLS';
import { C, initGlobalStyles } from './styles/theme';
import { btn } from './components/UI';
import {
  DEFAULT_STAFF, DEFAULT_PROGRAMAS, DEFAULT_PAQUETES,
  DEFAULT_GASTOS_FIJOS, DEFAULT_GASTOS_VARIABLES, DEFAULT_CAPEX_DETALLE
} from './data/defaults';

import { Dashboard } from './components/tabs/Dashboard';
import { Personal } from './components/tabs/Personal';
import { Programas } from './components/tabs/Programas';
import { Financiero } from './components/tabs/Financiero';
import { Incentivos } from './components/tabs/Incentivos';
import { Journey } from './components/tabs/Journey';
import { B2B } from './components/tabs/B2B';
import { Gastos } from './components/tabs/Gastos';

const APP_TABS = [
  { id: 'dash', label: '📊 Dashboard' },
  { id: 'personal', label: '👥 Personal' },
  { id: 'programas', label: '📋 Programas' },
  { id: 'financiero', label: '💰 Financiero' },
  { id: 'incentivos', label: '🎯 Incentivos' },
  { id: 'journey', label: '🗺️ Journey' },
  { id: 'b2b', label: '🏢 B2B' },
  { id: "gastos", label: "🧾 Gastos" },
];

export default function App() {
  useEffect(() => {
    initGlobalStyles();
  }, []);

  const [staff, setStaff] = useLS('ow_staff', DEFAULT_STAFF);
  const [programas, setProgramas] = useLS('ow_programas', DEFAULT_PROGRAMAS);
  const [paquetes, setPaquetes] = useLS('ow_paquetes', DEFAULT_PAQUETES);
  const [gastosFijos, setGastosFijos] = useLS("ow_gastos_fijos", DEFAULT_GASTOS_FIJOS);
  const [gastosVars, setGastosVars] = useLS("ow_gastos_vars", DEFAULT_GASTOS_VARIABLES);
  const [capexDetalle, setCapexDetalle] = useLS("ow_capex_detalle", DEFAULT_CAPEX_DETALLE);
  const [capexCentro, setCapexCentro] = useLS('ow_capex_centro', 'M');
  const [capacidad, setCapacidad] = useLS('ow_capacidad', { salas: 5, horasDia: 8, diasAno: 226 });
  const [tab, setTab] = useState('dash');
  const [showReset, setShowReset] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);
  const [amortYears, setAmortYears] = useLS('ow_amort_years', 5);

  const reset = () => {
    setStaff(DEFAULT_STAFF);
    setProgramas(DEFAULT_PROGRAMAS);
    setPaquetes(DEFAULT_PAQUETES);
    setGastosFijos(DEFAULT_GASTOS_FIJOS);
    setGastosVars(DEFAULT_GASTOS_VARIABLES);
    setCapexDetalle(DEFAULT_CAPEX_DETALLE);
    setCapexCentro('M');
    setCapacidad({ salas: 5, horasDia: 8, diasAno: 226 });
    setAmortYears(5);
    setShowReset(false);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2500);
  };

  return (
    <div style={{ minHeight: '100vh', background: C.bg, fontFamily: "'Open Sans', -apple-system, sans-serif", color: C.txt }}>
      <div style={{ position: 'relative' }}>
        {/* Header */}
        <div style={{ borderBottom: `1px solid ${C.bord}`, padding: '13px 26px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.97)', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #00d4a6, #00bf94)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>🎗</div>
            <div>
              <div style={{ fontFamily: "'Open Sans', sans-serif", fontWeight: 700, fontSize: 16, color: C.txt }}>Escenarios — OncoWellness</div>
              <div style={{ fontSize: 12, color: C.muted }}>Sistema de Gestión 360° — datos editables y persistentes</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {savedMsg && <span style={{ fontSize: 13, color: C.green, fontWeight: 600 }}>✓ Datos restaurados</span>}
            <span style={{ fontSize: 13, color: C.muted }}>💾 Auto-guardado activo</span>
            {showReset ? (
              <span style={{ display: 'flex', gap: 6 }}>
                <button onClick={reset} style={{ ...btn(C.red), fontSize: 11 }}>Confirmar reset</button>
                <button onClick={() => setShowReset(false)} style={{ ...btn(C.muted, true), fontSize: 11 }}>Cancelar</button>
              </span>
            ) : (
              <button onClick={() => setShowReset(true)} style={{ ...btn(C.muted, true), fontSize: 11 }}>↺ Restaurar originales</button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ borderBottom: `1px solid ${C.bord}`, padding: '0 26px', display: 'flex', gap: 1, background: '#ffffff' }}>
          {APP_TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: '10px 17px', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                background: 'transparent', color: tab === t.id ? C.brand : C.muted,
                borderBottom: tab === t.id ? `2px solid ${C.brand}` : '2px solid transparent',
                transition: 'all .15s', whiteSpace: 'nowrap',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Edit banner */}
        <div style={{ background: `${C.blue}0d`, borderBottom: `1px solid ${C.blue}20`, padding: '7px 26px' }}>
          <span style={{ fontSize: 13, color: C.blue }}>
            ✏️ <strong>Modo edición.</strong> Los valores <span style={{ borderBottom: `1px dashed ${C.blue}80` }}>subrayados en azul</span> son editables con un clic.
          </span>
        </div>

        {/* Content */}
        <div style={{ padding: '24px 26px 60px', maxWidth: 1360, margin: '0 auto' }}>
          {tab === 'dash' && <Dashboard staff={staff} programas={programas} paquetes={paquetes} gastosFijos={gastosFijos} gastosVars={gastosVars} amortYears={amortYears} setAmortYears={setAmortYears} capexDetalle={capexDetalle} capexCentro={capexCentro} setCapexCentro={setCapexCentro} capacidad={capacidad} setCapacidad={setCapacidad} />}
          {tab === 'personal' && <Personal staff={staff} setStaff={setStaff} capacidad={capacidad} />}
          {tab === 'programas' && <Programas programas={programas} setProgramas={setProgramas} paquetes={paquetes} setPaquetes={setPaquetes} />}
          {tab === 'financiero' && <Financiero staff={staff} programas={programas} gastosFijos={gastosFijos} gastosVars={gastosVars} capexDetalle={capexDetalle} capexCentro={capexCentro} setCapexCentro={setCapexCentro} amortYears={amortYears} setAmortYears={setAmortYears} />}
          {tab === 'incentivos' && <Incentivos />}
          {tab === 'journey' && <Journey />}
          {tab === 'b2b' && <B2B />}
          {tab === "gastos" && <Gastos fijos={gastosFijos} setFijos={setGastosFijos} vars={gastosVars} setVars={setGastosVars} capexDet={capexDetalle} setCapexDet={setCapexDetalle} centro={capexCentro} setCentro={setCapexCentro} />}
        </div>

        <div style={{ borderTop: `1px solid ${C.bord}`, padding: '12px 26px', textAlign: 'center', fontSize: 12, color: '#2a3a50' }}>
          Datos extraídos de: CALCULADORA_COSTES_SALARIALES.xlsx · PROGRAMAS.xlsx · PRESPUESTO_GLOBAL_CLINICA.xlsx · SISTEMA_360_INCENTIVOS.xlsx
        </div>
      </div>
    </div>
  );
}