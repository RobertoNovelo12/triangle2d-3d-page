let scene, camera, renderer, prism, controls;
let colorTriangulo = "#ff0000";

function iniciarEscena3D() {
    const { base, altura } = getStoredValues();
    const area = calculateArea(base, altura);

    document.getElementById("baseValor3d").textContent = base.toFixed(2);
    document.getElementById("alturaValor3d").textContent = altura.toFixed(2);
    document.getElementById("resultado3d").textContent = area.toFixed(2);

    const procedimiento = getProcedimientoText(base, altura, area);
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

document.addEventListener("DOMContentLoaded", function () {
    iniciarEscena3D();
    ajustarCanvas3D(); 
});