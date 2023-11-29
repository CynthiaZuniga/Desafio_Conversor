const divConversor = document.querySelector(".conversor");
const convertir = document.querySelector("#boton");
const selectorMoneda = document.querySelector("#cambioMoneda");
const valorIngresado = document.querySelector("#monto-ingresado");
const resultadoCambio = document.querySelector(".Resultado");
const apiURL = "https://mindicador.cl/api/";
const apiURLDolar = "https://mindicador.cl/api/dolar";
const apiURLUf = "https://mindicador.cl/api/uf";
const apiURLEuro = "https://mindicador.cl/api/euro";
let grafico = "";

async function getMiIndicador() {
  const res = await fetch(apiURL);
  const conversor = await res.json();
  //console.log (conversor);
  return conversor;
}

async function renderConversor() {
  try {
    const moneda = await getMiIndicador();
    const dolar_obs = Number(moneda.dolar.valor);
    const uf_obs = Number(moneda.uf.valor);
    const euro_obs = Number(moneda.euro.valor);
    console.log(dolar_obs);

    convertir.addEventListener("click", () => {
      if (selectorMoneda.value == "dolar-observado") {
        let valorUSD = valorIngresado.value / dolar_obs;
        resultadoCambio.innerHTML = `${valorUSD.toFixed(2)} USD`;
        renderGraficaDolar();
      } else if (selectorMoneda.value == "uf") {
        let valorUF = valorIngresado.value / uf_obs;
        resultadoCambio.innerHTML = `${valorUF.toFixed(2)} UF`;
        renderGraficaUF();
      } else if (selectorMoneda.value == "euro") {
        let valorEuro = valorIngresado.value / euro_obs;
        resultadoCambio.innerHTML = `${valorEuro.toFixed(2)} €`;
        renderGraficaEuro();
      } else {
        resultadoCambio.innerHTML = "Selecciona una moneda";
        grafico.destroy();
        console.log(dolar_obs, uf_obs, euro_obs);
      }
    });
  } catch (err) {
    console.log(err.message);
  }
}

async function crearDatosDolar() {
  try {
    const res = await fetch(apiURLDolar);
    const datosSerie = await res.json();
    const labels = datosSerie.serie.map((serie) => serie.fecha.slice(0, 10));
    const data = datosSerie.serie.map((ele) => {
      const valorDolar = ele.valor;
      return Number(valorDolar);
    });
    const datasets = [
      {
        label: "Valor de los últimos 10 días del Dolar",
        borderColor: "rgb(255, 0, 0)",
        data,
      },
    ];
    return { labels, datasets };
  } catch (err) {
    console.log(err.message);
  }
}

async function renderGraficaDolar() {
  const data = await crearDatosDolar();
  const config = {
    type: "line",
    data,
  };
  const myChart = document.getElementById("myChart");
  myChart.style.backgroundColor = "white";
  if (grafico != "") {
    grafico.destroy();
    grafico = new Chart(myChart, config);
  } else {
    grafico = new Chart(myChart, config);
  }
}

async function crearDatosUF() {
  try {
    const res = await fetch(apiURLUf);
    const datosSerie = await res.json();
    const labels = datosSerie.serie.map((serie) => serie.fecha.slice(0, 10));
    const data = datosSerie.serie.map((ele) => {
      const valorUF = ele.valor;
      return Number(valorUF);
    });
    const datasets = [
      {
        label: "Valor de los últimos 10 días de la Unidad de Fomento",
        borderColor: "rgb(0, 255, 0)",
        data,
      },
    ];
    return { labels, datasets };
  } catch (err) {
    console.log(err.message);
  }
}

async function renderGraficaUF() {
  const data = await crearDatosUF();
  const config = {
    type: "line",
    data,
  };
  const myChart = document.getElementById("myChart");
  myChart.style.backgroundColor = "white";
  if (grafico != "") {
    grafico.destroy();
    grafico = new Chart(myChart, config);
  } else {
    grafico = new Chart(myChart, config);
  }
}

async function crearDatosEuro() {
  try {
    const res = await fetch(apiURLEuro);
    const datosSerie = await res.json();
    const labels = datosSerie.serie.map((serie) => serie.fecha.slice(0, 10));
    const data = datosSerie.serie.map((ele) => {
      const valorEuro = ele.valor;
      return Number(valorEuro);
    });
    const datasets = [
      {
        label: "Valor de los últimos 10 días del Euro",
        borderColor: "rgb(0, 10, 255)",
        data,
      },
    ];
    return { labels, datasets };
  } catch (err) {
    console.log(err.message);
  }
}

async function renderGraficaEuro() {
  const data = await crearDatosEuro();
  const config = {
    type: "line",
    data,
  };
  const myChart = document.getElementById("myChart");
  myChart.style.backgroundColor = "white";
  if (grafico != "") {
    grafico.destroy();
    grafico = new Chart(myChart, config);
  } else {
    grafico = new Chart(myChart, config);
  }
}

renderConversor();
