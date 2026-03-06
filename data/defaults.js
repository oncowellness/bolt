export const DEFAULT_STAFF = [
  { id: 'FX1', rol: 'Fisioterapeuta 1', espacio: 'Sala 1', tipo: 'Plantilla', salario: 32000, precioServicio: 70 },
  { id: 'FX2', rol: 'Fisioterapeuta 2', espacio: 'Sala 2', tipo: 'Plantilla', salario: 32000, precioServicio: 70 },
  { id: 'FX3', rol: 'Fisioterapeuta 3', espacio: 'Sala 3', tipo: 'Plantilla', salario: 32000, precioServicio: 70 },
  { id: 'EJ1', rol: 'Ejercicio Postcáncer', espacio: 'Gimnasio', tipo: 'Plantilla', salario: 32000, precioServicio: 70 },
  { id: 'NU1', rol: 'Nutricionista', espacio: 'Sala compartida', tipo: 'Plantilla', salario: 32000, precioServicio: 70 },
  { id: 'PS1', rol: 'Psiconcólogo', espacio: 'Sala compartida', tipo: 'Plantilla', salario: 32000, precioServicio: 70 },
  { id: 'ES1', rol: 'Estética Oncológica', espacio: 'Sala compartida', tipo: 'Plantilla', salario: 32000, precioServicio: 80 },
  { id: 'MI1', rol: 'Micropigmentación', espacio: 'Sala compartida', tipo: 'Plantilla', salario: 32000, precioServicio: 70 },
  { id: 'RC1', rol: 'Recepción 1', espacio: 'Recepción', tipo: 'Plantilla', salario: 22000, precioServicio: null },
  { id: 'RC2', rol: 'Recepción 2', espacio: 'Recepción', tipo: 'Plantilla', salario: 22000, precioServicio: null },
  { id: 'AD1', rol: 'Administración', espacio: 'Oficina', tipo: 'Plantilla', salario: 28000, precioServicio: null },
  { id: 'DC1', rol: 'Director Clínico', espacio: 'Dirección', tipo: 'Plantilla', salario: 42000, precioServicio: null },
  { id: 'LM1', rol: 'Limpieza/Mantenimiento', espacio: 'General', tipo: 'Externo', salario: 16000, precioServicio: null },
];

export const DEFAULT_PROGRAMAS = [
  { codigo: 'FX-01', nombre: 'Prehabilitación oncológica integral', area: 'Fisioterapia', fase: 'F1-F2', precio: 75, coste: 30, pacientes: 80, sesiones: 12 },
  { codigo: 'FX-02', nombre: 'Sesión rápida al diagnóstico', area: 'Fisioterapia', fase: 'F1', precio: 60, coste: 25, pacientes: 120, sesiones: 2 },
  { codigo: 'FX-03', nombre: 'Ejercicio supervisado QT/RT', area: 'Fisioterapia', fase: 'F3', precio: 65, coste: 28, pacientes: 60, sesiones: 24 },
  { codigo: 'FX-04', nombre: 'Rehabilitación postquirúrgica', area: 'Fisioterapia', fase: 'F3-F4', precio: 70, coste: 30, pacientes: 90, sesiones: 10 },
  { codigo: 'FX-05', nombre: 'Linfedema y edema complejo', area: 'Fisioterapia', fase: 'F4-F7', precio: 80, coste: 35, pacientes: 45, sesiones: 16 },
  { codigo: 'FX-06', nombre: 'Fatiga y decondicionamiento', area: 'Fisioterapia', fase: 'F4-F6', precio: 65, coste: 28, pacientes: 50, sesiones: 24 },
  { codigo: 'FX-07', nombre: 'Fuerza y salud ósea', area: 'Fisioterapia', fase: 'F4-F5', precio: 60, coste: 25, pacientes: 40, sesiones: 36 },
  { codigo: 'FX-08', nombre: 'Ejercicio enf. avanzada', area: 'Fisioterapia', fase: 'F6-F7', precio: 85, coste: 40, pacientes: 30, sesiones: 12 },
  { codigo: 'FX-09', nombre: 'Fisio paliativa confort', area: 'Fisioterapia', fase: 'F7-F8', precio: 90, coste: 45, pacientes: 25, sesiones: 8 },
  { codigo: 'PS-01', nombre: 'Intervención breve diagnóstico', area: 'Psico-Oncología', fase: 'F1', precio: 80, coste: 35, pacientes: 100, sesiones: 2 },
  { codigo: 'PS-02', nombre: 'Afrontamiento durante tto', area: 'Psico-Oncología', fase: 'F3', precio: 75, coste: 35, pacientes: 55, sesiones: 8 },
  { codigo: 'PS-03', nombre: 'Ansiedad, depresión, insomnio', area: 'Psico-Oncología', fase: 'F3-F6', precio: 75, coste: 35, pacientes: 45, sesiones: 10 },
  { codigo: 'PS-04', nombre: 'Acompañamiento en recaída', area: 'Psico-Oncología', fase: 'F6', precio: 85, coste: 40, pacientes: 25, sesiones: 5 },
  { codigo: 'PS-05', nombre: 'Apoyo existencial final', area: 'Psico-Oncología', fase: 'F7-F8', precio: 80, coste: 40, pacientes: 20, sesiones: 5 },
  { codigo: 'PS-06', nombre: 'Duelo para familiares', area: 'Psico-Oncología', fase: 'F8', precio: 70, coste: 30, pacientes: 20, sesiones: 6 },
  { codigo: 'NU-01', nombre: 'Plan nutricional precoz', area: 'Nutrición', fase: 'F2-F3', precio: 65, coste: 25, pacientes: 70, sesiones: 4 },
  { codigo: 'NU-02', nombre: 'Soporte nutricional QT/RT', area: 'Nutrición', fase: 'F3', precio: 60, coste: 22, pacientes: 55, sesiones: 6 },
  { codigo: 'NU-03', nombre: 'Caquexia y pérdida de peso', area: 'Nutrición', fase: 'F6-F7', precio: 60, coste: 25, pacientes: 20, sesiones: 8 },
  { codigo: 'NU-04', nombre: 'Alimentación en supervivencia', area: 'Nutrición', fase: 'F5', precio: 45, coste: 15, pacientes: 60, sesiones: 3 },
  { codigo: 'ED-02', nombre: 'Comunidad digital', area: 'Digital', fase: 'F1-F8', precio: 15, coste: 5, pacientes: 200, sesiones: 12 },
  { codigo: 'PA-01', nombre: 'Clínica dolor oncológico', area: 'Paliativos', fase: 'F3-F7', precio: 95, coste: 50, pacientes: 40, sesiones: 6 },
  { codigo: 'SX-01', nombre: 'Taller sexualidad y cáncer', area: 'Sexología', fase: 'F3-F5', precio: 50, coste: 18, pacientes: 30, sesiones: 4 },
  { codigo: 'SX-02', nombre: 'Disfunción sexual / dolor pélvico', area: 'Sexología', fase: 'F4-F7', precio: 75, coste: 32, pacientes: 30, sesiones: 7 },
];

export const DEFAULT_PAQUETES = [
  { codigo: 'PC-01', nombre: '❤️ Primeros Pasos', fase: 'F1 - Diagnóstico', sesiones: 5, pvp: 330, coste: 139 },
  { codigo: 'PC-02', nombre: '🛡️ Preparado para el Tratamiento', fase: 'F2 - Prehabilitación', sesiones: 14, pvp: 995, coste: 418 },
  { codigo: 'PC-03', nombre: '💧 A Tu Lado durante el Tratamiento', fase: 'F3 - Tto. Activo', sesiones: 52, pvp: 1395, coste: 586 },
  { codigo: 'PC-04', nombre: '🌱 De Vuelta a Tu Vida', fase: 'F4-F5 - Rehab/Supervivencia', sesiones: 21, pvp: 2200, coste: 924 },
  { codigo: 'PC-05', nombre: '🫂 Cuidar y Cuidarse', fase: 'F6-F8 - Avanzado/Duelo', sesiones: 38, pvp: 2950, coste: 1239 },
];

export const DEFAULT_PACKS_INCENTIVOS = [
  { id: 1, nombre: 'Pack Evaluación', fase: 'Diagnóstico/Pre-tto', sesiones: 3, pvp: 162, descuento: 10 },
  { id: 2, nombre: 'Pack Inicio', fase: 'Tto. activo QT/RT', sesiones: 16, pvp: 748, descuento: 15 },
  { id: 3, nombre: 'Pack Consolidación', fase: 'Post-tto inmediato', sesiones: 12, pvp: 522, descuento: 13 },
  { id: 4, nombre: 'Pack Mantenimiento', fase: 'Supervivencia LP', sesiones: 12, pvp: 422, descuento: 12 },
  { id: 5, nombre: 'Pack Familiar', fase: 'Transversal cuidador', sesiones: 8, pvp: 340, descuento: 15 },
];

export const DEFAULT_COMISIONES = [
  { id: 1, rol: 'Recepción', tipo: 'Venta producto retail', cantidad: '8% PVP', tope: '150€/mes' },
  { id: 2, rol: 'Recepción', tipo: 'Conversión Pack (sesión → bono)', cantidad: '15€/pack', tope: '200€/mes' },
  { id: 3, rol: 'Recepción', tipo: 'Venta Kit bundling', cantidad: '5€/kit', tope: 'Acumulable' },
  { id: 4, rol: 'Clínico', tipo: 'Bonus Adherencia Terapéutica', cantidad: '75-250€/trim', tope: '250€/trim' },
  { id: 5, rol: 'Clínico', tipo: 'Derivación cruzada exitosa', cantidad: '10€/derivación', tope: '80€/mes' },
  { id: 6, rol: 'Clínico', tipo: 'Bonus NPS ≥ 60', cantidad: '50€/trim', tope: '50€/trim' },
  { id: 7, rol: 'Todos', tipo: 'Embajador B2B – lead detectado', cantidad: '25€ fijo', tope: 'Ilimitado' },
  { id: 8, rol: 'Todos', tipo: 'Embajador B2B – cierre contrato', cantidad: '3% contrato', tope: '500€/contrato' },
];

export const DEFAULT_GASTOS_FIJOS = [
  { id: "fx-01", categoria: "Alquiler", concepto: "Alquiler local clínica", periodicidad: "Mensual", coste: 3500, notas: "Depende de ciudad y m²", prioridad: "Imprescindible" },
  { id: "fx-02", categoria: "Suministros", concepto: "Luz", periodicidad: "Mensual", coste: 450, notas: "Media anual", prioridad: "Imprescindible" },
  { id: "fx-03", categoria: "Suministros", concepto: "Agua", periodicidad: "Mensual", coste: 90, notas: "Media", prioridad: "Imprescindible" },
  { id: "fx-04", categoria: "Suministros", concepto: "Gas / Climatización", periodicidad: "Mensual", coste: 180, notas: "Si aplica", prioridad: "Necesario" },
  { id: "fx-05", categoria: "Telecom", concepto: "Internet + Telefonía", periodicidad: "Mensual", coste: 120, notas: "Fibra + líneas", prioridad: "Imprescindible" },
  { id: "fx-06", categoria: "Software", concepto: "Office / Google Workspace", periodicidad: "Mensual", coste: 45, notas: "Usuarios", prioridad: "Necesario" },
  { id: "fx-07", categoria: "Software", concepto: "CRM (básico)", periodicidad: "Mensual", coste: 80, notas: "Pipedrive/HubSpot starter", prioridad: "Deseable" },
  { id: "fx-08", categoria: "Software", concepto: "HubSpot (Marketing/Sales)", periodicidad: "Mensual", coste: 300, notas: "Solo si se usa", prioridad: "Deseable" },
  { id: "fx-09", categoria: "Software", concepto: "HCE / Historia clínica electrónica", periodicidad: "Mensual", coste: 180, notas: "Cumplimiento sanitario", prioridad: "Imprescindible" },
  { id: "fx-10", categoria: "Software", concepto: "Contabilidad / Facturación", periodicidad: "Mensual", coste: 60, notas: "Holded/Quipu", prioridad: "Necesario" },
  { id: "fx-11", categoria: "IA", concepto: "Claude / ChatGPT / IA", periodicidad: "Mensual", coste: 60, notas: "Plan pro", prioridad: "Deseable" },
  { id: "fx-12", categoria: "Seguros", concepto: "Seguro RC profesional", periodicidad: "Mensual", coste: 120, notas: "Clínica + profesionales", prioridad: "Imprescindible" },
  { id: "fx-13", categoria: "Seguros", concepto: "Seguro multirriesgo local", periodicidad: "Mensual", coste: 65, notas: "Incendio/daños", prioridad: "Imprescindible" },
  { id: "fx-14", categoria: "Legal", concepto: "Protección de datos / RGPD", periodicidad: "Mensual", coste: 80, notas: "DPO/asesoría", prioridad: "Imprescindible" },
  { id: "fx-15", categoria: "Gestoría", concepto: "Gestoría laboral/fiscal", periodicidad: "Mensual", coste: 220, notas: "Nóminas + impuestos", prioridad: "Imprescindible" },
  { id: "fx-16", categoria: "Limpieza", concepto: "Servicio limpieza", periodicidad: "Mensual", coste: 450, notas: "Si no está en staff externo", prioridad: "Necesario" },
  { id: "fx-17", categoria: "Mantenimiento", concepto: "Mantenimiento equipos/instalaciones", periodicidad: "Mensual", coste: 200, notas: "Preventivo", prioridad: "Necesario" },
  { id: "fx-18", categoria: "Marketing", concepto: "Marketing always-on", periodicidad: "Mensual", coste: 600, notas: "Ads + contenido", prioridad: "Necesario" },
  { id: "fx-19", categoria: "Otros", concepto: "Suscripciones varias (Calendly, Notion, etc.)", periodicidad: "Mensual", coste: 50, notas: "Opcional", prioridad: "Deseable" },
];

export const DEFAULT_GASTOS_VARIABLES = [
  { id: "vr-01", categoria: "Pasarela de pago", concepto: "Comisiones TPV / Stripe", tipo: "% sobre ingresos", valor: 1.4, base: "Ingresos", notas: "Varía por proveedor", prioridad: "Imprescindible" },
  { id: "vr-02", categoria: "Consumibles", concepto: "Material fungible (guantes, gel, vendas)", tipo: "€ por sesión", valor: 1.2, base: "Sesión", notas: "Estimación", prioridad: "Imprescindible" },
  { id: "vr-03", categoria: "Laboratorio", concepto: "Analíticas / terceros", tipo: "€ por paciente", valor: 6, base: "Paciente", notas: "Si aplica", prioridad: "Deseable" },
  { id: "vr-04", categoria: "Retail", concepto: "Coste de producto (cremas, kits)", tipo: "% sobre ventas retail", valor: 45, base: "Ventas retail", notas: "COGS típico", prioridad: "Necesario" },
  { id: "vr-05", categoria: "Logística", concepto: "Envíos", tipo: "€ por envío", valor: 4.5, base: "Envío", notas: "Si hay e-commerce", prioridad: "Deseable" },
];

export const DEFAULT_CAPEX_DETALLE = [
  { id: "cx-01", concepto: "Obra civil y acondicionamiento", s: 52000, m: 60000, l: 70000, notas: "Reforma, instalaciones, climatización", prioridad: "Imprescindible" },
  { id: "cx-02", concepto: "Equipamiento clínico", s: 40000, m: 46000, l: 50000, notas: "Camillas, electroterapia, equipos ejercicio", prioridad: "Imprescindible" },
  { id: "cx-03", concepto: "- Camillas fisioterapia", s: 12000, m: 16000, l: 20000, notas: "", prioridad: "Imprescindible" },
  { id: "cx-04", concepto: "- Equipos electroterapia/presoterapia", s: 15000, m: 18000, l: 22000, notas: "", prioridad: "Necesario" },
  { id: "cx-05", concepto: "- Sala ejercicio terapéutico", s: 10000, m: 12000, l: 15000, notas: "", prioridad: "Imprescindible" },
  { id: "cx-06", concepto: "- Equipos estética oncológica", s: 8000, m: 6000, l: 5000, notas: "", prioridad: "Deseable" },
  { id: "cx-07", concepto: "Mobiliario y decoración", s: 22000, m: 26000, l: 30000, notas: "Recepción, salas espera, consultas", prioridad: "Necesario" },
  { id: "cx-08", concepto: "Equipos informáticos y software", s: 15000, m: 18000, l: 20000, notas: "Ordenadores, tablets, licencias HCE", prioridad: "Imprescindible" },
  { id: "cx-09", concepto: "Licencias y permisos", s: 6000, m: 7000, l: 8000, notas: "Licencia actividad, sanitario, PRL", prioridad: "Imprescindible" },
  { id: "cx-10", concepto: "Gastos legales y asesoría", s: 4000, m: 4500, l: 5000, notas: "Constitución, contratos, RGPD", prioridad: "Imprescindible" },
  { id: "cx-11", concepto: "Stock inicial", s: 10000, m: 12000, l: 15000, notas: "Material consumible y retail", prioridad: "Necesario" },
  { id: "cx-12", concepto: "Marketing lanzamiento", s: 12000, m: 13000, l: 15000, notas: "Campaña pre-apertura 3 meses", prioridad: "Necesario" },
  { id: "cx-13", concepto: "Canon de entrada franquicia", s: 15000, m: 15000, l: 15000, notas: "Fee único de entrada a la red", prioridad: "Deseable" },
  { id: "cx-14", concepto: "Fondo de maniobra (3 meses)", s: 17000, m: 21000, l: 25000, notas: "3 meses personal + costes indirectos", prioridad: "Imprescindible" },
  { id: "cx-15", concepto: "Contingencia (5%)", s: 9450, m: 10900, l: 12350, notas: "Imprevistos 5%", prioridad: "Imprescindible" },
  { id: "cx-16", concepto: "TOTAL INVERSIÓN INICIAL", s: 198450, m: 228900, l: 259350, notas: "" },
];

export const DEFAULT_B2B_PACKS = [
  { id: 'b2b-01', nombre: 'Welcome Pack Basic', pvp: 95, coste: 45, incluye: 'Libro oncología práctica · Crema oncoskin · Agenda de salud · Carta personalizada · 1 sesión evaluación gratuita', color: '#38bdf8' },
  { id: 'b2b-02', nombre: 'Welcome Pack Premium', pvp: 395, coste: 195, incluye: 'Todo lo del Basic + Pack evaluación 3 sesiones + Bandas de resistencia + Suplemento adaptógeno + Caja regalo premium', color: '#818cf8' },
  { id: 'b2b-03', nombre: 'Suscripción Corporativa Anual', pvp: 2500, coste: 1100, incluye: 'X packs premium anuales + Talleres trimestrales empresa + Acceso plataforma .health + Gestor dedicado + Informe RSC anual', color: '#4ade80' },
];