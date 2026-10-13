const images = {
  mercurio: "img/mercurio.webp",
  venus: "img/venus.webp",
  marte: "img/marte.webp",
  jupiter: "img/jupiter.webp",
  saturno: "img/saturno.webp",
  urano: "img/urano.webp",
  neptuno: "img/neptuno.webp",
};

// Textos de la interfaz
const translations = {
  es: {
    titulo: "sistema",
    nav1: "sistema solar activo",
    nav2: "planeta tierra",
    nav3: "carta orbital",
    nav4: "pozos gravitatorios",
    nav5: "dilatacion temporal",
    nav6: "telemetria visual",
    calculadora: "Calculadora",
    labelPeso: "Tu peso en la tierra (kg): ",
    placeholderPeso: "ej.80",
    labelPlaneta: "Selecciona planeta",
    calcular: "Calcular",
    pesoSera: "Tu peso sería",
    radio: "Radio",
    composicion: "Composición",
    lunas: "Lunas",
    distancia: "Distancia al Sol",
    millones: "millones km",
    errorPeso: "Ingresa un peso válido",
  },
  en: {
    titulo: "system",
    nav1: "active solar system",
    nav2: "planet earth",
    nav3: "orbital chart",
    nav4: "gravity wells",
    nav5: "time dilation",
    nav6: "visual telemetry",
    calculadora: "Calculator",
    labelPeso: "Your weight on Earth (kg): ",
    placeholderPeso: "e.g. 80",
    labelPlaneta: "Select planet",
    calcular: "Calculate",
    pesoSera: "Your weight would be",
    radio: "Radius",
    composicion: "Composition",
    lunas: "Moons",
    distancia: "Distance to the Sun",
    millones: "million km",
    errorPeso: "Enter a valid weight",
  },
};

// Datos de los planetas (con nombre y composición en cada idioma)
const planetas = {
  mercurio: { nombre: { es: "Mercurio", en: "Mercury" }, gravedad: 0.38, radio: "4,879 km",
    composicion: { es: "Rocoso / Núcleo ferroso", en: "Rocky / Iron core" }, lunas: 0, distancia: "57.9" },
  venus: { nombre: { es: "Venus", en: "Venus" }, gravedad: 0.91, radio: "12,104 km",
    composicion: { es: "Rocoso / Atmósfera densa de CO₂", en: "Rocky / Dense CO₂ atmosphere" }, lunas: 0, distancia: "108.2" },
  marte: { nombre: { es: "Marte", en: "Mars" }, gravedad: 0.38, radio: "6,779 km",
    composicion: { es: "Rocoso / Óxidos de hierro", en: "Rocky / Iron oxides" }, lunas: 2, distancia: "227.9" },
  jupiter: { nombre: { es: "Júpiter", en: "Jupiter" }, gravedad: 2.53, radio: "139,820 km",
    composicion: { es: "Gaseoso / Hidrógeno y helio", en: "Gaseous / Hydrogen and helium" }, lunas: 79, distancia: "778.5" },
  saturno: { nombre: { es: "Saturno", en: "Saturn" }, gravedad: 1.06, radio: "116,460 km",
    composicion: { es: "Gaseoso / Hidrógeno y helio", en: "Gaseous / Hydrogen and helium" }, lunas: 83, distancia: "1,429" },
  urano: { nombre: { es: "Urano", en: "Uranus" }, gravedad: 0.89, radio: "50,724 km",
    composicion: { es: "Gaseoso / Metano y amoníaco", en: "Gaseous / Methane and ammonia" }, lunas: 27, distancia: "2,871" },
  neptuno: { nombre: { es: "Neptuno", en: "Neptune" }, gravedad: 1.14, radio: "49,244 km",
    composicion: { es: "Gaseoso / Metano y agua", en: "Gaseous / Methane and water" }, lunas: 14, distancia: "4,498" },
};

let idiomaActual = localStorage.getItem("idioma") || "es";
let ultimoResultado = null; // { planeta, pesoTierra }

function aplicarIdioma(lang) {
  idiomaActual = lang;
  localStorage.setItem("idioma", lang);
  document.documentElement.lang = lang;
  const t = translations[lang];

  // Textos
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = t[el.dataset.i18n];
  });

  // Placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    el.placeholder = t[el.dataset.i18nPlaceholder];
  });

  // Opciones del select
  document.querySelectorAll("#planeta option").forEach(opt => {
    const p = planetas[opt.value];
    opt.textContent = `${p.nombre[lang]} (${p.gravedad})`;
  });

  // Si ya había un resultado, lo volvemos a mostrar traducido
  if (ultimoResultado) mostrarResultado();
}

function mostrarResultado() {
  const t = translations[idiomaActual];
  const { planeta, pesoTierra } = ultimoResultado;
  const p = planetas[planeta];
  const pesoFinal = pesoTierra * p.gravedad;

  document.getElementById("nombrePlaneta").textContent = p.nombre[idiomaActual];
  document.getElementById("pesoFinal").textContent = `${t.pesoSera}: ${pesoFinal.toFixed(2)} kg`;
  document.getElementById("infoPlaneta").textContent =
    `${t.radio}: ${p.radio} | ${t.composicion}: ${p.composicion[idiomaActual]} | ` +
    `${t.lunas}: ${p.lunas} | ${t.distancia}: ${p.distancia} ${t.millones}`;
  document.getElementById("imagenPlaneta").src = images[planeta];
}

// Botón calcular
document.getElementById("calcular").addEventListener("click", function () {
  const pesoTierra = parseFloat(document.getElementById("peso").value);
  const planeta = document.getElementById("planeta").value;

  if (isNaN(pesoTierra) || pesoTierra <= 0) {
    alert(translations[idiomaActual].errorPeso);
  }

  ultimoResultado = { planeta, pesoTierra };
  mostrarResultado();
})

// Botones de idioma
document.querySelectorAll(".lang-button").forEach(btn => {
  btn.addEventListener("click", () => aplicarIdioma(btn.dataset.language));
});

// Idioma inicial
aplicarIdioma(idiomaActual);
