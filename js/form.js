const form = document.getElementById("formContacto");
const inputs = document.querySelectorAll("input");
const errores = {
  nombre: false,
  apellido: false,
  correo: false
}
const expresiones = {
  texto: /^[a-zA-Z\s]+$/,
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

inputs.forEach(inp => {
  inp.addEventListener("blur", (e) => {
    const inp = e.target;
    const inpHeader = inp.previousElementSibling;
    const inpName = inp.name;
    const inpVal = inp.value.trim();

    switch (inpName) {
      case "nombre":
        if (!expresiones["texto"].test(inpVal)) {
          mostrarErrores(inpHeader, "Nombre inválido");
          errores[inpName] = true;
          return;
        }
        break;
    
      case "apellido":
        if (!expresiones["texto"].test(inpVal)) {
          mostrarErrores(inpHeader, "Apellido inválido");
          errores[inpName] = true;
          return;
        }
        break;

      case "correo":
        if (!expresiones["correo"].test(inpVal)) {
          mostrarErrores(inpHeader, "Correo inválido");
          errores[inpName] = true;
          return;
        }
        break;
    }

    if (inpHeader.children.length > 1) {
      inpHeader.querySelector("span").remove();
      inpHeader.querySelector("label").classList.remove("error-input");
    }
    
    errores[inpName] = false;
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  inputs.forEach(inp => {
    const inpHeader = inp.previousElementSibling; 
    
    if (inp.value.trim().length === 0) {
      errores[inp.name] = true;
      mostrarErrores(inpHeader, "Complete el campo");
      return;
    }
    
    if (inpHeader.children.length > 1) {
      inpHeader.querySelector("span").remove();
      inpHeader.querySelector("label").classList.remove("error-input");
    }
    
    errores[inp.name] = false;
  });
  
  const { nombre, apellido, correo } = errores;

  if (nombre || apellido || correo) return;

  const info = {
    nombre: e.target.nombre.value,
    apellido: e.target.apellido.value,
    correo: e.target.correo.value,
  }

  modal(info);
})

function mostrarErrores(inpHeader, errorMsj) {
  if (inpHeader.querySelector("span") === null) {
    const span = document.createElement("span");
    span.classList.add("error-input");
    inpHeader.appendChild(span);
  }
  
  inpHeader.querySelector("span").textContent = errorMsj;
  inpHeader.querySelector("label").classList.add("error-input");
}

function modal(info) {
  const { nombre, apellido, correo } = info;
  
  const elemPadre = document.createElement("div");
  elemPadre.classList.add("modal-container");

  const modal = document.createElement("section");
  modal.classList.add("modal");
  modal.innerHTML = `
    <header>
      <h3>Contacto</h3>
      <p>¿Quieres enviar estos datos de contacto?</p>
    </header>
    <div class="contenido-modal">
      <article>
        <h4>Nombre completo</h4>
        <p>${nombre} ${apellido}</p>
      </article>
      <article>
        <h4>Correo electrónico</h4>
        <p>${correo}</p>
      </article>
    </div>
    <footer>
      <button onclick="enviarForm()">Enviar</button>
      <button onclick="volverForm()">Volver</button>
    </footer>
  `
  document.body.appendChild(elemPadre);
  elemPadre.appendChild(modal);
}

function cardInfo(mensaje) {
  const cardInfo = document.createElement("div");
  cardInfo.classList.add("card-info");
  cardInfo.innerHTML = `
    <p>${mensaje}</p>
  `

  document.body.appendChild(cardInfo);
  setTimeout(() => cardInfo.remove(), 2500);
}

function enviarForm() {
  document.querySelector(".modal-container").remove();
  inputs.forEach(inp => inp.value = "");
  cardInfo("¡Se ha enviado el formulario!");
}

function volverForm() {
  document.querySelector(".modal-container").remove();
}