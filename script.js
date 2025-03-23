function actualizarResultados() {
    let base = parseFloat(localStorage.getItem("base")) || 1;
    let altura = parseFloat(localStorage.getItem("altura")) || 1;
    let angulo = parseFloat(localStorage.getItem("angulo")) || 60;

    
    let area = (base * altura) / 2;

    
    document.getElementById("resultado").innerText = area.toFixed(2);
    document.getElementById("baseValor").innerText = base;
    document.getElementById("alturaValor").innerText = altura;

    
    document.getElementById("procedimiento").innerText =
        `Área del triángulo:\n\n` +
        `A = (base × altura) / 2\n` +
        `A = (${base} × ${altura}) / 2\n` +
        `A = ${area.toFixed(2)}`;
}

function dibujarTriangulo(color) {
    let canvas = document.getElementById("canvas2D");
    if (!canvas) return;

    
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    let base = parseFloat(localStorage.getItem("base")) || 300;
    let altura = parseFloat(localStorage.getItem("altura")) || (Math.sqrt(3) / 2) * base;

    
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    let scale = Math.min(canvasWidth / base, canvasHeight / altura) * 0.8;

    
    let x1 = (canvasWidth - base * scale) / 2; 
    let y1 = canvasHeight - (canvasHeight - altura * scale) / 2; 
    let x2 = x1 + base * scale;
    let y2 = y1;
    let x3 = x1 + (base * scale) / 2;
    let y3 = y1 - altura * scale;

    
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
}


function cambiarColor() {
    let color = document.getElementById("color").value;
    dibujarTriangulo(color);
}


function inicializarValores() {
    
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

        
        dibujarTriangulo("#ff0000");  
    }
}


document.addEventListener("DOMContentLoaded", function() {
    inicializarValores();
});


function volver() {
    window.history.back();
}

function actualizarGeometria3D(base, altura) {
    let depth = base / 2; 

    
    const vertices = new Float32Array([ 
        -base / 2, 0, 0,               
        base / 2, 0, 0,                
        0, altura, 0,                  
        -base / 2, 0, -depth,          
        base / 2, 0, -depth,           
        0, altura, -depth              
    ]);

    
    prism.geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    prism.geometry.computeVertexNormals();
}


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
    dibujarTriangulo("#007BFF"); 
}


function dibujarTrianguloEstatico() {
    let canvas = document.getElementById("canvasStatic");
    if (!canvas) return;

    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    
    let x1 = 30; 
    let y1 = 120; 

    let x2 = 120; 
    let y2 = 120; 

    let x3 = 75;  
    let y3 = 30;  

    
    ctx.beginPath();
    ctx.moveTo(x1, y1); 
    ctx.lineTo(x2, y2); 
    ctx.lineTo(x3, y3); 
    ctx.closePath();

    
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();

    
    ctx.fillStyle = "#FFFFFF"; 
    ctx.fill();
}


document.addEventListener("DOMContentLoaded", function () {
    dibujarTrianguloEstatico();
});



function ver2D() {
    window.location.href = 'triangle2d.html';  
}


function ver3D() {
    window.location.href = 'triangle3d.html';  
}


document.addEventListener("DOMContentLoaded", function () {
    let base = localStorage.getItem("base");
    let altura = localStorage.getItem("altura");
    let angulo = localStorage.getItem("angulo");

    if (base && altura && angulo) {
        document.getElementById("base").value = base;
        document.getElementById("altura").value = altura;
        document.getElementById("grados").value = angulo;
    }

    
    if (document.getElementById("canvas2D")) {
        actualizarResultados();
    }

    
    dibujarTrianguloEstatico();

    
    let color = document.getElementById("color") ? document.getElementById("color").value : "#000000";
    dibujarTriangulo(color);
});

let colorTriangulo = "#ff0000"; 
let scene, camera, renderer, prism, controls;

function iniciarEscena3D() {
    const base = parseFloat(localStorage.getItem("base")) || 2;
    const altura = parseFloat(localStorage.getItem("altura")) || 2;
    const angulo = parseFloat(localStorage.getItem("angulo")) || 60;

    
    const area = (base * altura) / 2;

    
    document.getElementById("baseValor3d").textContent = base.toFixed(2);
    document.getElementById("alturaValor3d").textContent = altura.toFixed(2);
    document.getElementById("resultado3d").textContent = area.toFixed(2);

    
    const procedimiento =
        `Área del triángulo: \n` +
        `A = (base × altura) / 2\n` +
        `A = (${base} × ${altura}) / 2\n` +
        `A = ${area.toFixed(2)}`;
    document.getElementById("procedimiento3d").textContent = procedimiento;

    
    if (!scene) {
        
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xd0dce9);

        
        const gridSize = base * 2;
        const gridDivisions = base * 2;
        const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x000000, 0x808080);
        gridHelper.position.set(base / 2, -0.01, 0); 
        scene.add(gridHelper);

        
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(10, 10, 10); 
        camera.lookAt(base / 2, 0, 0); 

        
        renderer = new THREE.WebGLRenderer();
        const container = document.getElementById("container-3d");
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        
        const depth = base / 2;
        const offsetX = base / 2;

        const vertices = new Float32Array([
            offsetX, 0, 0,
            offsetX + base, 0, 0,
            offsetX + base / 2, altura, 0,
            offsetX, 0, -depth,
            offsetX + base, 0, -depth,
            offsetX + base / 2, altura, -depth
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

        
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5).normalize();
        scene.add(light);

        const ambientLight = new THREE.AmbientLight(0x404040, 1);
        scene.add(ambientLight);

        
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.minDistance = 5; 
        controls.maxDistance = 50; 
        controls.enablePan = true; 
        controls.enableDamping = true; 
        controls.dampingFactor = 0.05; 

        
        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }
        animate();
    } else {
        
        prism.material.color.set(colorTriangulo);
    }
}




function cambiarColor3D() {
    const color = document.getElementById("color3d").value;
    colorTriangulo = color;
    prism.material.color.set(colorTriangulo); 
}


document.addEventListener("DOMContentLoaded", function () {
    iniciarEscena3D();
});


window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


const iconoPC = document.getElementById('icono-pc');
const iconoMovil = document.getElementById('icono-movil');
const instruccionesPC = document.getElementById('instrucciones-pc');
const instruccionesMovil = document.getElementById('instrucciones-movil');


iconoPC.addEventListener('click', () => {
    
    iconoPC.classList.add('activo');
    iconoMovil.classList.remove('activo');

    
    instruccionesPC.classList.add('activo');
    instruccionesMovil.classList.remove('activo');
});


iconoMovil.addEventListener('click', () => {
    
    iconoMovil.classList.add('activo');
    iconoPC.classList.remove('activo');

    
    instruccionesMovil.classList.add('activo');
    instruccionesPC.classList.remove('activo');
});



function ajustarCanvas3D() {
    const container = document.getElementById('container-3d');
    if (container && renderer) {
        const width = container.clientWidth; 
        const height = container.clientHeight; 
        renderer.setSize(width, height); 
        camera.aspect = width / height; 
        camera.updateProjectionMatrix(); 
    }
}


window.addEventListener('resize', ajustarCanvas3D);


ajustarCanvas3D();