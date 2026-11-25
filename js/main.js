document.addEventListener("DOMContentLoaded", () => {
    // 1. AÑO DINÁMICO EN EL FOOTER
    const anioEl = document.getElementById("anioActual");
    if (anioEl) {
        anioEl.textContent = new Date().getFullYear();
    }

    // 2. MENÚ HAMBURGUESA RESPONSIVE (Cierre automático al seleccionar enlace)
    const checkMenu = document.getElementById("check");
    const enlacesMenu = document.querySelectorAll(".botonera a");

    enlacesMenu.forEach((enlace) => {
        enlace.addEventListener("click", () => {
            if (checkMenu && checkMenu.checked) {
                checkMenu.checked = false;
            }
        });
    });

    // 3. EFECTO MÁQUINA DE ESCRIBIR (TYPING EFFECT) EN EL BANNER
    const textoMaquina = document.getElementById("textoMaquina");
    const roles = [
        "Desarrolladora de Software",
        "Soporte Técnico & Electrónica",
        "Estudiante en TECSUP"
    ];
    let indiceRol = 0;
    let indiceLetra = 0;
    let borrando = false;

    function animarEscritura() {
        if (!textoMaquina) return;
        const fraseActual = roles[indiceRol];

        if (!borrando) {
            textoMaquina.textContent = fraseActual.substring(0, indiceLetra + 1);
            indiceLetra++;
            if (indiceLetra === fraseActual.length) {
                borrando = true;
                setTimeout(animarEscritura, 1800);
                return;
            }
        } else {
            textoMaquina.textContent = fraseActual.substring(0, indiceLetra - 1);
            indiceLetra--;
            if (indiceLetra === 0) {
                borrando = false;
                indiceRol = (indiceRol + 1) % roles.length;
            }
        }
        setTimeout(animarEscritura, borrando ? 45 : 85);
    }
    animarEscritura();

    // 4. NAVEGACIÓN ACTIVA AL HACER SCROLL, HEADER DINÁMICO Y BOTÓN VOLVER ARRIBA
    const header = document.getElementById("headerPrincipal");
    const btnSubir = document.getElementById("btnSubir");
    const secciones = document.querySelectorAll("section[id], main[id]");

    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;

        if (header) {
            header.classList.toggle("header-scroll", scrollY > 50);
        }
        if (btnSubir) {
            btnSubir.classList.toggle("mostrar", scrollY > 400);
        }

        let seccionActual = "inicio";
        secciones.forEach((sec) => {
            const top = sec.offsetTop - 140;
            if (scrollY >= top) {
                seccionActual = sec.getAttribute("id");
            }
        });

        enlacesMenu.forEach((link) => {
            link.classList.remove("activo");
            if (link.getAttribute("href") === `#${seccionActual}`) {
                link.classList.add("activo");
            }
        });
    });

    if (btnSubir) {
        btnSubir.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // 5. SCROLL REVEAL Y CONTADORES ANIMADOS
    const elementosRevelar = document.querySelectorAll(".revelar");
    const contadores = document.querySelectorAll(".contador");
    let contadoresIniciados = false;

    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visible");

                if (entrada.target.id === "nosotros" && !contadoresIniciados) {
                    contadoresIniciados = true;
                    contadores.forEach((contador) => {
                        const objetivo = Number(contador.dataset.objetivo);
                        let actual = 0;
                        const paso = Math.max(1, Math.ceil(objetivo / 30));
                        const intervalo = setInterval(() => {
                            actual += paso;
                            if (actual >= objetivo) {
                                contador.textContent = objetivo;
                                clearInterval(intervalo);
                            } else {
                                contador.textContent = actual;
                            }
                        }, 40);
                    });
                }
            }
        });
    }, { threshold: 0.15 });

    elementosRevelar.forEach((el) => observador.observe(el));

    // 6. FILTROS INTERACTIVOS DE LA GALERÍA DE PROYECTOS
    const botonesFiltro = document.querySelectorAll(".btn-filtro");
    const proyectos = document.querySelectorAll(".proyecto-item");

    botonesFiltro.forEach((boton) => {
        boton.addEventListener("click", () => {
            botonesFiltro.forEach((b) => b.classList.remove("activo"));
            boton.classList.add("activo");

            const categoria = boton.dataset.filtro;
            proyectos.forEach((proyecto) => {
                if (categoria === "todos" || proyecto.dataset.categoria === categoria) {
                    proyecto.classList.remove("oculto");
                } else {
                    proyecto.classList.add("oculto");
                }
            });
        });
    });

    // 7. MODAL DE VISTA RÁPIDA DE PROYECTOS
    const modal = document.getElementById("modalProyecto");
    const modalImg = document.getElementById("modalImg");
    const modalTitulo = document.getElementById("modalTitulo");
    const modalDesc = document.getElementById("modalDesc");
    const modalEnlace = document.getElementById("modalEnlace");
    const cerrarModal = document.getElementById("cerrarModal");

    document.querySelectorAll(".btn-detalles").forEach((btn) => {
        btn.addEventListener("click", () => {
            const tarjeta = btn.closest(".proyecto-item");
            const enlace = tarjeta.querySelector(".enlace-tarjeta");
            const img = tarjeta.querySelector("img");

            modalImg.src = img.src;
            modalTitulo.textContent = enlace.dataset.titulo;
            modalDesc.textContent = enlace.dataset.desc;
            modalEnlace.href = enlace.href;
            modal.classList.add("abierto");
        });
    });

    if (cerrarModal && modal) {
        cerrarModal.addEventListener("click", () => modal.classList.remove("abierto"));
        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.classList.remove("abierto");
        });
    }

    // 8. CONTADOR DE CARACTERES EN TIEMPO REAL Y SOLO NÚMEROS EN CELULAR
    const inputCelular = document.getElementById("celular");
    const textareaMensaje = document.getElementById("mensaje");
    const contadorChars = document.getElementById("contadorCaracteres");

    if (inputCelular) {
        inputCelular.addEventListener("input", () => {
            inputCelular.value = inputCelular.value.replace(/\D/g, "").slice(0, 9);
        });
    }

    if (textareaMensaje && contadorChars) {
        textareaMensaje.addEventListener("input", () => {
            contadorChars.textContent = `(${textareaMensaje.value.length}/300)`;
        });
    }

    // 9. ENVÍO ASÍNCRONO DEL FORMULARIO A PHP / MYSQL
    const formulario = document.getElementById("formContacto");
    const estadoMsg = document.getElementById("estadoFormulario");
    const btnEnviar = document.getElementById("btnEnviar");

    if (formulario) {
        formulario.addEventListener("submit", async (e) => {
            e.preventDefault();

            const nombre = document.getElementById("nombre").value.trim();
            const celular = inputCelular.value.trim();
            const mensaje = textareaMensaje.value.trim();

            if (nombre.length < 3) {
                mostrarEstado("Por favor, ingresa tus apellidos y nombres completos.", "error");
                return;
            }
            if (!/^\d{9}$/.test(celular)) {
                mostrarEstado("Ingresa un número de celular válido de 9 dígitos.", "error");
                return;
            }
            if (mensaje.length < 5) {
                mostrarEstado("Por favor, escribe un mensaje más detallado.", "error");
                return;
            }

            btnEnviar.disabled = true;
            btnEnviar.value = "Guardando...";
            mostrarEstado("Guardando mensaje en la base de datos...", "cargando");

            try {
                const datos = new FormData(formulario);
                const respuesta = await fetch(formulario.action, {
                    method: "POST",
                    body: datos
                });

                const resultado = await respuesta.json();

                if (resultado.ok) {
                    mostrarEstado(resultado.mensaje, "exito");
                    formulario.reset();
                    if (contadorChars) contadorChars.textContent = "(0/300)";
                } else {
                    mostrarEstado(resultado.mensaje || "No se pudo guardar el mensaje.", "error");
                }
            } catch (error) {
                mostrarEstado("Error de conexión. Asegúrate de ejecutarlo en InfinityFree o XAMPP.", "error");
            } finally {
                btnEnviar.disabled = false;
                btnEnviar.value = "Enviar";
            }
        });
    }

    function mostrarEstado(texto, tipo) {
        estadoMsg.textContent = texto;
        estadoMsg.className = "estado-msg " + tipo;
    }
});
