const images = {
    mercurio:"img/mercurio.webp",
    marte:"img/marte.webp",
    jupiter:"img/jupiter.webp",
    neptuno:"img/neptuno.webp",
    tierra:"img/planeta-tierra.webp",
    venus:"img/venus.webp",
    urano:"img/urano.webp",
    saturno:"img/saturno.webp",
};

document.getElementById("calcular").addEventListener("click", function() {
  let pesoTierra = parseFloat(document.getElementById("peso").value);
  let planeta = document.getElementById("planeta").value.toLowerCase(); 
  let gravedad, radio, composicion, lunas, distancia;


  if (planeta === "mercurio") {
    gravedad = 0.38; radio = "4,879 km"; composicion = "Rocoso / Núcleo ferroso";
    lunas = "0"; distancia = "57.9 millones km";
  } else if (planeta === "venus") {
    gravedad = 0.91; radio = "12,104 km"; composicion = "Rocoso / Atmósfera densa de CO₂";
    lunas = "0"; distancia = "108.2 millones km";
  } else if (planeta === "tierra") {
    gravedad = 1.00; radio = "12,742 km"; composicion = "Rocoso / Hidrosfera activa";
    lunas = "1"; distancia = "149.6 millones km";
  } else if (planeta === "marte") {
    gravedad = 0.38; radio = "6,779 km"; composicion = "Rocoso / Óxidos de hierro";
    lunas = "2"; distancia = "227.9 millones km";
  } else if (planeta === "jupiter") {
    gravedad = 2.53; radio = "139,820 km"; composicion = "Gaseoso / Hidrógeno y helio";
    lunas = "79"; distancia = "778.5 millones km";
  } else if (planeta === "saturno") {
    gravedad = 1.06; radio = "116,460 km"; composicion = "Gaseoso / Hidrógeno y helio";
    lunas = "83"; distancia = "1,429 millones km";
  } else if (planeta === "urano") {
    gravedad = 0.89; radio = "50,724 km"; composicion = "Gaseoso / Metano y amoníaco";
    lunas = "27"; distancia = "2,871 millones km";
  } else if (planeta === "neptuno") {
    gravedad = 1.14; radio = "49,244 km"; composicion = "Gaseoso / Metano y agua";
    lunas = "14"; distancia = "4,498 millones km";
  }

  let pesoFinal = pesoTierra * gravedad;

  document.getElementById("nombrePlaneta").textContent = planeta.charAt(0).toUpperCase() + planeta.slice(1);
  document.getElementById("pesoFinal").textContent = `Tu peso sería: ${pesoFinal.toFixed(2)} kg`;
  document.getElementById("infoPlaneta").innerHTML = `
    Radio: ${radio} | Composición: ${composicion} | Lunas: ${lunas} | Distancia al Sol: ${distancia}
  `;
  document.getElementById("imagenPlaneta").src = images[planeta];
});
