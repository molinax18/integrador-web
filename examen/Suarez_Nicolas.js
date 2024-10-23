<script>
        document.getElementById('miFormulario').addEventListener('submit', function(event) 
            event.preventDefault(); // Evita el envío del formulario

            // Limpiar mensajes de error previos
            const errorContainer = document.getElementById('errorContainer');
            errorContainer.innerHTML = '';
            const inputs = document.querySelectorAll('.input, input[type="radio"]');

            // Limpiar estilos de error
            inputs.forEach(input => input.classList.remove('error'));

            // Obtener valores del formulario
            const nombre = document.getElementById('nombre').value.trim();
            const edad = document.getElementById('edad').value.trim();
            const correo = document.getElementById('correo').value.trim();
            const genero = document.querySelector('input[name="genero"]:checked');
            const deporte = document.getElementById('deportes').value;

            let valid = true;
            const errors = [];

            // Validar nombre
            if (nombre === '') {
                valid = false;
                errors.push('El nombre es obligatorio.');
                document.getElementById('nombre').classList.add('error');
            }

            // Validar edad
            if (edad === '' || edad < 16) {
                valid = false;
                errors.push('La edad debe ser mayor o igual a 16 años.');
                document.getElementById('edad').classList.add('error');
            }

            // Validar correo
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (correo === '' || !emailRegex.test(correo)) {
                valid = false;
                errors.push('El correo electrónico es obligatorio y debe tener un formato válido.');
                document.getElementById('correo').classList.add('error');
            }

            // Validar género
            if (!genero) {
                valid = false;
                errors.push('Debes seleccionar un género.');
            }

            // Validar deporte
            if (deporte === '') {
                valid = false;
                errors.push('Debes seleccionar un deporte.');
            }

            // Mostrar errores
            if (!valid) {
                errors.forEach(error => {
                    const errorElement = document.createElement('p');
                    errorElement.className = 'error-message';
                    errorElement.textContent = error;
                    errorContainer.appendChild(errorElement);
                });
            } else {
                // Mostrar datos ingresados
                document.getElementById('fbNombre').textContent = 'Nombre: ' + nombre;
                document.getElementById('fbEdad').textContent = 'Edad: ' + edad;
                document.getElementById('fbCorreo').textContent = 'Correo Electronico: ' + correo;
                document.getElementById('fbGenero').textContent = 'Genero: ' + genero.value;
                document.getElementById('fbDeporte').textContent = 'Deporte: ' + deporte;

                // Limpiar el formulario
                document.getElementById('miFormulario').reset();
            }
        );
    </script>
</body>
</html>