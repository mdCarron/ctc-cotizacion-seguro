class Seguro {
  constructor(marca, anio, tipo) {
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
  }
  cotizarSeguro() {
    let cantidad;
    let base = 2000;

    switch (this.marca) {
      case "1":
        cantidad = base * 1.15;
        break;
      case "2":
        cantidad = base * 1.05;
        break;
      case "3":
        cantidad = base * 1.35;
        break;
    }

    let diferencia = new Date().getFullYear() - this.anio;
    cantidad -= (diferencia * 3 * cantidad) / 100;

    if (this.tipo === "basico") {
      cantidad *= 1.3;
    } else {
      cantidad *= 1.5;
    }

    return cantidad;
  }
}

class Interfaz {
  mostrarMensaje(mensaje, tipo) {
    let div = document.createElement("div");
    if (tipo === "error") {
      div.classList.add("mensaje", "error");
    } else {
      div.classList.add("mensaje", "correcto");
    }
    div.innerHTML = `${mensaje}`;
    $formulario.insertBefore(div, document.querySelector(".form-group"));
    setTimeout(() => {
      document.querySelector(".mensaje").remove();
    }, 3000);
  }

  mostrarResultado(seguro, total) {
    const $resultado = document.querySelector("#resultado");
    let marca;
    switch (seguro.marca) {
      case "1":
        marca = "Americano";
        break;
      case "2":
        marca = "Asiatico";
        break;
      case "3":
        marca = "Europeo";
        break;
    }
    const div = document.createElement("div");
    div.innerHTML = `
          <p class="header">Tu resumen:</p>
          <p>Marca: ${marca}</p>
          <p>Año: ${seguro.anio}</p>
          <p>Seguro: ${seguro.tipo}</p>
          <p>Total: $${total}</p>
    `;
    let spinner = document.querySelector("#cargando img");
    spinner.style.display = "block";
    setTimeout(() => {
      spinner.style.display = "none";
      $resultado.appendChild(div);
    }, 3000);
  }
}

const $formulario = document.querySelector("#cotizar-seguro");
$formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const $marca = document.querySelector("#marca");
  const marcaSeleccionada = $marca.options[$marca.selectedIndex].value;
  const $anio = document.querySelector("#anio");
  const anioSeleccionado = $anio.options[$anio.selectedIndex].value;
  const $tipoSeleccionado = document.querySelector('input[name="tipo"]:checked')
    .value;

  const interfaz = new Interfaz();
  if (
    marcaSeleccionada === "" ||
    anioSeleccionado === "" ||
    $tipoSeleccionado === ""
  ) {
    interfaz.mostrarMensaje("El formulario esta incompleto.", "error");
  } else {
    const resultados = document.querySelector("#resultado div");
    if (resultados !== null) {
      resultados.remove();
    }

    const seguro = new Seguro(
      marcaSeleccionada,
      anioSeleccionado,
      $tipoSeleccionado
    );

    const cotizacion = seguro.cotizarSeguro(seguro);

    interfaz.mostrarResultado(seguro, cotizacion);
    interfaz.mostrarMensaje("Cotizando...", "correcto");
  }
});

const max = new Date().getFullYear();
const min = max - 20;
const $inputAnio = document.querySelector("#anio");
for (let i = max; i >= min; i--) {
  let option = document.createElement("option");
  option.value = i;
  option.innerHTML = i;
  $inputAnio.appendChild(option);
}
