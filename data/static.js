export const JOURNEY_DATA = [
  {
    id: 'F1', label: 'F1 · Diagnóstico', emoji: '💔', color: '#ef4444', mindState: 'Shock → Cautela', discomfort: 6,
    description: 'El paciente recibe el diagnóstico y entra en un estado de shock emocional. Necesita orientación inmediata y activación rápida.',
    painPoints: ['Infoxicación y confusión por exceso de información médica', 'Sensación de aislamiento y soledad', 'Miedo extremo a lo desconocido', 'Falta de guía práctica sobre qué hacer primero'],
    programas: ['FX-01 — Prehabilitación integral', 'FX-02 — Sesión rápida al diagnóstico', 'PS-01 — Intervención breve diagnóstico', 'TS-01 — Navegación oncológica', 'ED-01 — Educación terapéutica'],
    paquete: 'PC-01 ❤️ Primeros Pasos (330€ · 5 sesiones)',
    insight: '"Entrada ciega": el paciente llega sin literacidad médica. Necesita navegación + sesión de activación inmediata.',
  },
  {
    id: 'F2', label: 'F2 · Prehabilitación', emoji: '🛡️', color: '#f97316', mindState: 'Seguridad → Vulnerabilidad', discomfort: 3,
    description: 'Ventana de oportunidad antes del tratamiento activo. El paciente está físicamente activo pero emocionalmente frágil.',
    painPoints: ['Miedo al tratamiento y sus efectos secundarios', 'Pasividad: esperar sin hacer nada', 'Desconocimiento de cómo preparar el cuerpo', 'Ansiedad anticipatoria'],
    programas: ['FX-01 — Prehabilitación oncológica', 'NU-01 — Plan nutricional precoz', 'PS-02 — Afrontamiento durante tto', 'ED-01 — Educación terapéutica'],
    paquete: 'PC-02 🛡️ Preparado para el Tratamiento (995€ · 14 sesiones)',
    insight: '"Preservación emocional": dificultad para comunicar la enfermedad al entorno. Grupos de iguales + comunidad digital + apoyo en sexualidad.',
  },
  {
    id: 'F3', label: 'F3 · Tratamiento Activo', emoji: '💧', color: '#eab308', mindState: 'Vulnerable → Agotado', discomfort: 5,
    description: 'QT/RT en curso. El paciente sufre los efectos adversos más intensos. Requiere acompañamiento continuo y soporte multimodal.',
    painPoints: ['Fatiga extrema y deterioro físico progresivo', 'Chemo brain (deterioro cognitivo)', 'Aislamiento social creciente', 'Dolor y efectos secundarios no anticipados'],
    programas: ['FX-03 — Ejercicio supervisado QT/RT', 'FX-04 — Rehab postquirúrgica', 'PS-02 — Afrontamiento', 'PS-03 — Ansiedad/depresión/insomnio', 'NU-02 — Soporte nutricional QT/RT', 'PA-01 — Clínica dolor oncológico', 'SX-01 — Taller sexualidad y cáncer'],
    paquete: 'PC-03 💧 A Tu Lado durante el Tratamiento (1.395€ · 52 sesiones)',
    insight: '"El chemo brain nunca se menciona": el equipo no anticipa el deterioro cognitivo. Ejercicio supervisado + TO + educación proactiva.',
  },
  {
    id: 'F4', label: 'F4 · Rehabilitación', emoji: '🌱', color: '#22c55e', mindState: 'Alivio → Preocupación', discomfort: 3,
    description: 'Fin del tratamiento activo. El paciente experimenta alivio pero también ansiedad post-tratamiento (scanxiety) y secuelas físicas persistentes.',
    painPoints: ['Dolor persistente y linfedema', 'Scanxiety (miedo a revisiones)', 'Dificultad para retomar vida cotidiana', 'Secuelas sexuales y de imagen corporal'],
    programas: ['FX-04 — Rehab postquirúrgica', 'FX-05 — Linfedema y edema', 'FX-06 — Fatiga y decondicionamiento', 'FX-07 — Fuerza y salud ósea', 'NU-04 — Alimentación supervivencia', 'ES-01 — Estética oncológica'],
    paquete: 'PC-04 🌱 De Vuelta a Tu Vida (2.200€ · 21 sesiones)',
    insight: '"La gente cree que ya estás bien": la transición a la normalidad es crítica. Rehabilitación escalonada + reincorporación laboral progresiva.',
  },
  {
    id: 'F5', label: 'F5 · Supervivencia', emoji: '⭐', color: '#06b6d4', mindState: 'Confianza → Sanando', discomfort: 3,
    description: 'El paciente entra en la fase de supervivencia a largo plazo. Busca recuperar su identidad y calidad de vida, pero con secuelas crónicas.',
    painPoints: ['Fatiga crónica persistente', 'Disfunción sexual y cambios hormonales', 'Miedo a la recidiva (constante)', 'Dificultad para reintegración social y laboral'],
    programas: ['FX-07 — Fuerza y salud ósea', 'FX-06 — Fatiga y decondicionamiento', 'PS-03 — Ansiedad/insomnio', 'NU-04 — Alimentación supervivencia', 'SX-02 — Disfunción sexual', 'ED-02 — Comunidad digital'],
    paquete: 'PC-04 🌱 De Vuelta a Tu Vida (2.200€ · 21 sesiones)',
    insight: '"Falta de modelo de atención compartida": el paciente coordina solo su cuidado. Navegación social + equipo interdisciplinar como referente.',
  },
  {
    id: 'F6', label: 'F6 · Recaída', emoji: '🌊', color: '#8b5cf6', mindState: 'Pérdida de control → Desorientado', discomfort: 6,
    description: 'La recaída representa una segunda catástrofe emocional, a menudo más devastadora que el diagnóstico inicial.',
    painPoints: ['Devastación emocional — sensación de traición del cuerpo', 'Agotamiento del tratamiento (fatiga terapéutica)', 'Re-impacto en la familia y entorno', 'Cuestionamiento existencial profundo'],
    programas: ['FX-08 — Ejercicio enf. avanzada', 'PS-04 — Acompañamiento en recaída', 'PS-03 — Ansiedad/depresión', 'NU-03 — Caquexia y pérdida de peso', 'PA-01 — Clínica dolor oncológico'],
    paquete: 'PC-05 🫂 Cuidar y Cuidarse (2.950€ · 38 sesiones)',
    insight: '"Recaída = traición": el paciente sabe más pero sufre más emocionalmente. Re-contención psicológica completa + fisio adaptada.',
  },
  {
    id: 'F7', label: 'F7 · Enfermedad Terminal', emoji: '🕯️', color: '#64748b', mindState: 'Carga → Perdonar', discomfort: 5,
    description: 'Fase paliativa. El objetivo pasa de curar a cuidar la calidad de vida restante y acompañar en el proceso final.',
    painPoints: ['Dolor total (físico, psíquico, social, espiritual)', 'Pérdida de autonomía y dependencia creciente', 'Carga del cuidador familiar', 'Necesidad de despedida y cierre vital'],
    programas: ['FX-09 — Fisio paliativa confort', 'FX-08 — Ejercicio enf. avanzada', 'PS-05 — Apoyo existencial final', 'PA-01 — Clínica dolor', 'NU-03 — Caquexia', 'TO-01 — Terapia Ocupacional'],
    paquete: 'PC-05 🫂 Cuidar y Cuidarse (2.950€ · 38 sesiones)',
    insight: '"El dolor total nunca se aborda de forma integral": modelo interdisciplinar físico + psíquico + social + espiritual.',
  },
  {
    id: 'F8', label: 'F8 · Duelo', emoji: '🕊️', color: '#94a3b8', mindState: 'Despedida → Integración', discomfort: 4,
    description: 'Acompañamiento a familiares y cuidadores tras el fallecimiento. Cierre del ciclo asistencial con la familia.',
    painPoints: ['Duelo anticipatorio durante la enfermedad', 'Duelo patológico o complicado en familiares', 'Agotamiento del cuidador principal', 'Necesidad de ritual de cierre y reconocimiento'],
    programas: ['PS-06 — Duelo para familiares', 'PS-05 — Apoyo existencial', 'ED-02 — Comunidad digital'],
    paquete: 'PC-05 🫂 Cuidar y Cuidarse (2.950€ · 38 sesiones)',
    insight: '"El cuidador invisible": la familia necesita atención propia, no solo como apoyo al paciente. Grupos de duelo + seguimiento post-óbito.',
  },
];

export const JOURNEY_INSIGHTS = [
  { icon: '🔍', titulo: 'Entrada Ciega', desc: 'El paciente llega sin literacidad médica, con infoxicación e incapacidad de priorizar. Necesita una sesión de navegación + activación inmediata (FX-02, PS-01).' },
  { icon: '💬', titulo: 'Preservación Emocional', desc: 'Dificultad para comunicar la enfermedad al entorno. Los grupos de iguales y la comunidad digital son la intervención más efectiva (ED-02, PS-02, SX-01).' },
  { icon: '🧠', titulo: 'Chemo Brain Silenciado', desc: 'El equipo médico raramente anticipa el deterioro cognitivo. El ejercicio supervisado + OT + educación proactiva cambia el pronóstico funcional (FX-03, ED-01).' },
  { icon: '🔄', titulo: 'Transición Invisible', desc: '"La gente cree que ya estás bien". La transición post-tratamiento es la fase más desatendida. Rehabilitación escalonada + retorno laboral (FX-04, FX-06, FX-07).' },
  { icon: '🏗', titulo: 'Falta Modelo Compartido', desc: 'El paciente coordina solo su cuidado entre especialistas desconectados. La navegación social + equipo interdisciplinar es la solución (TS-01, ED-02).' },
  { icon: '💔', titulo: 'Recaída = Traición', desc: 'La segunda vez el paciente sabe más pero sufre emocionalmente más. Requiere re-contención psicológica completa + fisio adaptada (PS-04, FX-08, PA-01).' },
];

export const LOOP_STEPS = [
  { n: 1, label: 'Detección del Lead', icon: '🔍', color: '#38bdf8', descripcion: 'Cualquier miembro del equipo detecta una oportunidad corporativa en su entorno.', kpis: ['2–3 leads/mes objetivo', 'Fuentes: pacientes con cargo directivo, redes profesionales, eventos'], bonus: '25€ fijo por lead cualificado entregado al responsable B2B' },
  { n: 2, label: 'Cualificación y Reunión', icon: '🤝', color: '#f472b6', descripcion: 'El responsable B2B contacta al lead, evalúa el fit corporativo y agenda reunión de presentación.', kpis: ['40–50% conversión lead → reunión', 'Criterios: +50 empleados, sector salud/pharma/seguros/tech'], bonus: '50€ adicionales si se consigue la reunión de presentación' },
  { n: 3, label: 'Cierre del Contrato', icon: '✍️', color: '#fbbf24', descripcion: 'Presentación de la propuesta personalizada, negociación y firma del acuerdo corporativo.', kpis: ['1–2 empresas cerradas por trimestre', 'Ticket mínimo: 2.500€/año · LTV objetivo: >5.000€'], bonus: '3% del valor del primer contrato (mínimo 75€, máximo 500€)' },
  { n: 4, label: 'Retención y Expansión', icon: '🔄', color: '#4ade80', descripcion: 'Seguimiento activo, renovación anual y expansión del contrato con nuevos servicios.', kpis: ['Renovación objetivo: 80%+', 'NPS corporativo ≥ 60 para bonus adicional'], bonus: '1,5% del valor de la renovación anual · 50€ bonus si NPS ≥ 60' },
];