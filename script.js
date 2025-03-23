// Función para actualizar los resultados del triángulo 2D
function actualizarResultados() {
    let base = parseFloat(localStorage.getItem("base")) || 1;
    let altura = parseFloat(localStorage.getItem("altura")) || 1;
    let angulo = parseFloat(localStorage.getItem("angulo")) || 60;

    // Calcular área y hipotenusa
    let area = (base * altura) / 2;

    // Actualizar los valores en la página
    document.getElementById("resultado").innerText = area.toFixed(2);
    document.getElementById("baseValor").innerText = base;
    document.getElementById("alturaValor").innerText = altura;

    // Mostrar el procedimiento de cálculo
    document.getElementById("procedimiento").innerText =
        `Área del triángulo:\n\n` +
        `A = (base × altura) / 2\n` +
        `A = (${base} × ${altura}) / 2\n` +
        `A = ${area.toFixed(2)}`;
}

function dibujarTriangulo(color) {
    let canvas = document.getElementById("canvas2D");
    if (!canvas) return;

    // Asegúrate de que el canvas tenga las dimensiones correctas
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Obtener base y altura desde el localStorage
    let base = parseFloat(localStorage.getItem("base")) || 300;
    let altura = parseFloat(localStorage.getItem("altura")) || (Math.sqrt(3) / 2) * base;

    // Ajustar escala para que el triángulo no se salga del canvas
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    let scale = Math.min(canvasWidth / base, canvasHeight / altura) * 0.8;

    // Calcular las coordenadas del triángulo
    let x1 = (canvasWidth - base * scale) / 2; // Centrar horizontalmente
    let y1 = canvasHeight - (canvasHeight - altura * scale) / 2; // Centrar verticalmente
    let x2 = x1 + base * scale;
    let y2 = y1;
    let x3 = x1 + (base * scale) / 2;
    let y3 = y1 - altura * scale;

    // Dibujar el triángulo
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
}

// Función para cambiar el color del triángulo 2D
function cambiarColor() {
    let color = document.getElementById("color").value;
    dibujarTriangulo(color);
}

// Función para la inicialización de los valores
function inicializarValores() {
    // Obtener los valores de base, altura y ángulo desde localStorage
    let base = localStorage.getItem("base");
    let altura = localStorage.getItem("altura");
    let angulo = localStorage.getItem("angulo");

    if (base && altura && angulo) {
        document.getElementById("baseValor").textContent = base;
        document.getElementById("alturaValor").textContent = altura;
        document.getElementById("resultado").textContent = (base * altura) / 2;

        document.getElementById("procedimiento").textContent = 
            `Área del triángulo:\n\n` +
            `A = (base × altura) / 2\n` +
            `A = (${base} × ${altura}) / 2\n` +
            `A = ${(base * altura) / 2}`;

        // Dibujar el triángulo automáticamente con un color predeterminado
        dibujarTriangulo("#ff0000");  // Color predeterminado rojo
    }
}

// Inicializar valores y dibujar el triángulo automáticamente cuando se cargue la página
document.addEventListener("DOMContentLoaded", function() {
    inicializarValores();
});

// Función para volver a la página anterior
function volver() {
    window.history.back();
}

function actualizarGeometria3D(base, altura) {
    let depth = base / 2; // Profundidad proporcional a la base

    // Vértices del triángulo isósceles en 3D
    const vertices = new Float32Array([ 
        -base / 2, 0, 0,               // Vértice 0 (izquierda, base)
        base / 2, 0, 0,                // Vértice 1 (derecha, base)
        0, altura, 0,                  // Vértice 2 (cima, altura)
        -base / 2, 0, -depth,          // Vértice 3 (izquierda, fondo)
        base / 2, 0, -depth,           // Vértice 4 (derecha, fondo)
        0, altura, -depth              // Vértice 5 (cima, fondo)
    ]);

    // Actualizar la geometría del prisma
    prism.geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    prism.geometry.computeVertexNormals();
}

// Función para guardar los valores de base, altura y ángulo en localStorage
function guardarValores() {
    let base = parseFloat(document.getElementById("base").value);
    let altura = parseFloat(document.getElementById("altura").value);

    if (isNaN(base) || isNaN(altura)) {
        alert("Por favor, ingrese valores válidos.");
        return;
    }

    localStorage.setItem("base", base);
    localStorage.setItem("altura", altura);

    document.getElementById("resultado").textContent = ((base * altura) / 2).toFixed(2);

    actualizarGeometria3D(base, altura);
    dibujarTriangulo("#007BFF"); // Redibuja en 2D
}

// Función para dibujar el triángulo estático en el canvas
function dibujarTrianguloEstatico() {
    let canvas = document.getElementById("canvasStatic");
    if (!canvas) return;

    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas antes de dibujar

    // Coordenadas de los vértices del triángulo
    let x1 = 30; // Vértice A (base izquierda)
    let y1 = 120; // Ajustamos para moverlo hacia el centro

    let x2 = 120; // Vértice B (base derecha)
    let y2 = 120; // Ajustamos para moverlo hacia el centro

    let x3 = 75;  // Vértice C (cima)
    let y3 = 30;  // Ajustamos para que la cima quede más cerca del centro

    // Dibujar el triángulo con valores estáticos
    ctx.beginPath();
    ctx.moveTo(x1, y1); // Vértice A
    ctx.lineTo(x2, y2); // Vértice B
    ctx.lineTo(x3, y3); // Vértice C
    ctx.closePath();

    // Establecer el color y el grosor del trazo
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Rellenar el triángulo con un color
    ctx.fillStyle = "#FFFFFF"; // Color blanco
    ctx.fill();
}

// Llamar a la función para dibujar el triángulo estático
document.addEventListener("DOMContentLoaded", function () {
    dibujarTrianguloEstatico();
});


// Función para ir a la vista 2D
function ver2D() {
    window.location.href = 'triangle2d.html';  // Asegúrate de tener esta página de 2D
}

// Función para ir a la vista 3D
function ver3D() {
    window.location.href = 'triangle3d.html';  // Asegúrate de tener esta página de 3D
}

// Cuando el DOM se cargue completamente, inicializa los valores si ya están guardados en localStorage
document.addEventListener("DOMContentLoaded", function () {
    let base = localStorage.getItem("base");
    let altura = localStorage.getItem("altura");
    let angulo = localStorage.getItem("angulo");

    if (base && altura && angulo) {
        document.getElementById("base").value = base;
        document.getElementById("altura").value = altura;
        document.getElementById("grados").value = angulo;
    }

    // Actualizar resultados para 2D
    if (document.getElementById("canvas2D")) {
        actualizarResultados();
    }

    // Dibujar el triángulo estático en la página principal
    dibujarTrianguloEstatico();

    // Cambiar el color del triángulo en `triangle2d.html`
    let color = document.getElementById("color") ? document.getElementById("color").value : "#000000";
    dibujarTriangulo(color);
});

let colorTriangulo = "#ff0000"; // Color por defecto
let scene, camera, renderer, prism, controls;

function iniciarEscena3D() {
    // Leer los valores desde localStorage
    const base = parseFloat(localStorage.getItem("base")) || 2;
    const altura = parseFloat(localStorage.getItem("altura")) || 2;
    const angulo = parseFloat(localStorage.getItem("angulo")) || 60;

    // Calcular hipotenusa y área
    const area = (base * altura) / 2;

    // Actualizar valores en la interfaz
    document.getElementById("baseValor3d").textContent = base.toFixed(2);
    document.getElementById("alturaValor3d").textContent = altura.toFixed(2);
    document.getElementById("resultado3d").textContent = area.toFixed(2);

    // Mostrar procedimiento
    const procedimiento =
        `Área del triángulo: \n` +
        `A = (base × altura) / 2\n` +
        `A = (${base} × ${altura}) / 2\n` +
        `A = ${area.toFixed(2)}`;
    document.getElementById("procedimiento3d").textContent = procedimiento;

    // Verificar si la escena ya está creada
    if (!scene) {
        // Crear la escena 3D
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xd0dce9);

        // Configurar la cuadrícula ajustada a la base
        const gridSize = base * 2; // Tamaño de la cuadrícula
        const gridDivisions = base * 2; // Número de divisiones igual al tamaño
        const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x000000, 0x808080);
        gridHelper.position.set(gridSize / 2, -0.01, 0); // Mueve la cuadrícula a la derecha
        scene.add(gridHelper);

        // Configurar la cámara
        camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);

        // Ajuste de la cámara con los valores específicos que pediste
        const cameraX = 40.705614742773273;
        const cameraY =20.753499582310589;
        const cameraZ =20.861897684189778;

        // Configuramos la cámara en la posición deseada
        camera.position.set(cameraX, cameraY, cameraZ);
        camera.lookAt(gridSize / 2, 0, 0); // Apuntar hacia el centro de la cuadrícula

        // Mostrar la posición de la cámara en consola
        console.log(`Posición de la cámara ajustada: X: ${cameraX}, Y: ${cameraY}, Z: ${cameraZ}`);

        // Configurar el renderizador
        renderer = new THREE.WebGLRenderer();
        const container = document.getElementById("container-3d");
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        // Crear el triángulo 3D alineado a la derecha
        const depth = base / 2; // Profundidad del prisma
        const offsetX = gridSize / 2; // Mueve el triángulo dentro de la cuadrícula

        const vertices = new Float32Array([ 
            offsetX, 0, 0,              // Vértice 0 (izquierda, base)
            offsetX + base, 0, 0,       // Vértice 1 (derecha, base)
            offsetX + base / 2, altura, 0, // Vértice 2 (cima, altura)
            offsetX, 0, -depth,         // Vértice 3 (izquierda, fondo)
            offsetX + base, 0, -depth,  // Vértice 4 (derecha, fondo)
            offsetX + base / 2, altura, -depth // Vértice 5 (cima, fondo)
        ]);

        const indices = new Uint16Array([ 
            0, 1, 2,
            3, 4, 5,
            0, 1, 4, 0, 4, 3,
            1, 2, 5, 1, 5, 4,
            2, 0, 3, 2, 3, 5
        ]);

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geometry.setIndex(new THREE.BufferAttribute(indices, 1));
        geometry.computeVertexNormals();

        prism = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: 0xff0000, side: THREE.DoubleSide }));
        scene.add(prism);

        // Agregar iluminación
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5).normalize();
        scene.add(light);

        const ambientLight = new THREE.AmbientLight(0x404040, 1);
        scene.add(ambientLight);

        // Controles de la cámara
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = false;

        // Animación
        function animate() {
            requestAnimationFrame(animate);
            controls.update();

            renderer.render(scene, camera);
        }
        animate();
    }
    else {
        // Si la escena ya existe, solo actualiza la geometría
        prism.material.color.set(colorTriangulo);
    }
}



// Cambiar color del triángulo
function cambiarColor3D() {
    const color = document.getElementById("color3d").value;
    colorTriangulo = color;
    prism.material.color.set(colorTriangulo); // Actualizar el color del triángulo
}

// Iniciar la escena 3D al cargar
document.addEventListener("DOMContentLoaded", function () {
    iniciarEscena3D();
});

// Ajustar cámara y renderizador cuando la ventana cambia de tamaño
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Selecciona los elementos
const iconoPC = document.getElementById('icono-pc');
const iconoMovil = document.getElementById('icono-movil');
const instruccionesPC = document.getElementById('instrucciones-pc');
const instruccionesMovil = document.getElementById('instrucciones-movil');

// Función para mostrar las instrucciones de PC
iconoPC.addEventListener('click', () => {
    // Activa el icono de PC y desactiva el de móvil
    iconoPC.classList.add('activo');
    iconoMovil.classList.remove('activo');

    // Muestra las instrucciones de PC y oculta las de móvil
    instruccionesPC.classList.add('activo');
    instruccionesMovil.classList.remove('activo');
});

// Función para mostrar las instrucciones de móvil
iconoMovil.addEventListener('click', () => {
    // Activa el icono de móvil y desactiva el de PC
    iconoMovil.classList.add('activo');
    iconoPC.classList.remove('activo');

    // Muestra las instrucciones de móvil y oculta las de PC
    instruccionesMovil.classList.add('activo');
    instruccionesPC.classList.remove('activo');
});


// Función para ajustar el tamaño del canvas 3D cuando cambie el tamaño de la pantalla
function ajustarCanvas3D() {
    const container = document.getElementById('container-3d');
    if (container && renderer) {
        const width = container.clientWidth; // Ancho del contenedor
        const height = container.clientHeight; // Altura del contenedor
        renderer.setSize(width, height); // Ajustar el tamaño del renderizador
        camera.aspect = width / height; // Ajustar la relación de aspecto de la cámara
        camera.updateProjectionMatrix(); // Actualizar la cámara
    }
}

// Llamar a la función cuando la ventana cambie de tamaño
window.addEventListener('resize', ajustarCanvas3D);

// Llamada inicial para configurar el tamaño correctamente
ajustarCanvas3D();