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

  if (nombre || apellido || correo) {
    alert("Los datos no son correctos, intenta de nuevo");
  } else {
    alert("El formulario se ha enviado correctamente");
    inputs.forEach(inp => {
      inp.value = "";
    });
  }
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