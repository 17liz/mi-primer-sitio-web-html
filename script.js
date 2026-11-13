/*
  ============================================================
  script.js — Huellitas Vet
  ============================================================
  Lógica e interactividad del portal:
  1. Validación / envío del formulario de login (portal Mis Mascotas)
  2. Carrusel del equipo (botones + arrastre con el mouse)
  3. Envío del formulario de cita (Agendar cita)
  ============================================================
*/

document.addEventListener('DOMContentLoaded', () => {

    // --------------------------------------------------------
    // 1. Formulario de login (portal Mis Mascotas)
    //    - Evitamos el envío real del formulario (preventDefault)
    //    - Mostramos un mensaje de bienvenida con el usuario
    //    - Limpiamos los campos después del envío
    // --------------------------------------------------------
    const formLogin = document.getElementById('form-login');
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que la página se recargue
            const user = document.getElementById('usuario').value;
            alert(`¡Bienvenido/a a Huellitas Vet!\nAcceso al portal: ${user}`);
            formLogin.reset(); // Limpia los campos del formulario
        });
    }

    // --------------------------------------------------------
    // 2. Carrusel del equipo (botones + arrastre)
    //    - Botones "Anterior" y "Siguiente" desplazan el track
    //    - También se puede arrastrar con el mouse (mousedown/mousemove)
    // --------------------------------------------------------
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const track = document.getElementById('teachers-track');

    if (btnPrev && btnNext && track) {
        // Calcula cuánto desplazar según el ancho de una tarjeta
        const amount = () => {
            const card = track.querySelector('.team-card');
            return card ? card.offsetWidth + 20 : 260;
        };

        // Botón siguiente → desplaza hacia la derecha
        btnNext.addEventListener('click', () => {
            track.scrollBy({ left: amount(), behavior: 'smooth' });
        });

        // Botón anterior → desplaza hacia la izquierda
        btnPrev.addEventListener('click', () => {
            track.scrollBy({ left: -amount(), behavior: 'smooth' });
        });

        // --- Arrastre con el mouse ---
        let isDown = false, startX, scrollLeft;

        track.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - track.offsetLeft;
            scrollLeft = track.scrollLeft;
            track.style.scrollBehavior = 'auto'; // Sin animación mientras se arrastra
        });

        window.addEventListener('mouseup', () => {
            if (!isDown) return;
            isDown = false;
            track.style.scrollBehavior = 'smooth'; // Vuelve la animación suave
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            // Multiplicador 1.4 para que el arrastre se sienta más ágil
            track.scrollLeft = scrollLeft - (x - startX) * 1.4;
        });
    }

    // --------------------------------------------------------
    // 3. Formulario de cita (Agendar cita)
    //    - Captura los datos principales del formulario
    //    - Muestra un resumen en un alert (simulación de envío)
    //    - Reinicia el formulario para una nueva solicitud
    // --------------------------------------------------------
    const formCita = document.getElementById('form-hero-informes');
    if (formCita) {
        formCita.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita el envío real al servidor
            const nombre = document.getElementById('info_nombre').value;
            const mascota = document.getElementById('info_mascota').value;
            const servicio = document.getElementById('info_servicio').value;
            alert(
                `¡Cita solicitada!\n\nDueño: ${nombre}\nMascota: ${mascota}\nServicio: ${servicio}\n\nTe contactaremos pronto.\n— Huellitas Vet`
            );
            formCita.reset();
        });
    }
});
