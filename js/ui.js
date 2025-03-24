function actualizarResultados() {
    const { base, altura } = getStoredValues();
    const area = calculateArea(base, altura);

    const resultadoElement = document.getElementById("resultado");
    const baseValorElement = document.getElementById("baseValor");
    const alturaValorElement = document.getElementById("alturaValor");
    const procedimientoElement = document.getElementById("procedimiento");

    if (resultadoElement) resultadoElement.innerText = area.toFixed(2);
    if (baseValorElement) baseValorElement.innerText = base;
    if (alturaValorElement) alturaValorElement.innerText = altura;
    if (procedimientoElement) procedimientoElement.innerText = getProcedimientoText(base, altura, area);
}

function inicializarValores() {
    const { base, altura } = getStoredValues();

    const baseValorElement = document.getElementById("baseValor");
    const alturaValorElement = document.getElementById("alturaValor");
    const resultadoElement = document.getElementById("resultado");
    const procedimientoElement = document.getElementById("procedimiento");

    if (base && altura) {
        if (baseValorElement) baseValorElement.textContent = base;
        if (alturaValorElement) alturaValorElement.textContent = altura;
        if (resultadoElement) resultadoElement.textContent = calculateArea(base, altura).toFixed(2);
        if (procedimientoElement) procedimientoElement.textContent = getProcedimientoText(base, altura, calculateArea(base, altura));

        dibujarTriangulo("#ff0000");
    }
}

function cambiarColor() {
    const colorInput = document.getElementById("color");
    if (colorInput) {
        const color = colorInput.value;
        dibujarTriangulo(color);
    }
}

function guardarValores() {
    const baseInput = document.getElementById("base");
    const alturaInput = document.getElementById("altura");

    if (!baseInput || !alturaInput) return;

    const base = parseFloat(baseInput.value);
    const altura = parseFloat(alturaInput.value);

    if (!validateInputs(base, altura)) return;

    setStoredValues(base, altura);

    const resultadoElement = document.getElementById("resultado");
    if (resultadoElement) resultadoElement.textContent = calculateArea(base, altura).toFixed(2);

    if (typeof actualizarGeometria3D === 'function') {
        actualizarGeometria3D(base, altura);
    }

    dibujarTriangulo("#007BFF");
}

function ver2D() {
    window.location.href = 'triangle2d.html';
}

function ver3D() {
    window.location.href = 'triangle3d.html';
}

function volver() {
    window.history.back();
}

document.addEventListener("DOMContentLoaded", function () {
    const baseInput = document.getElementById("base");
    const alturaInput = document.getElementById("altura");

    if (baseInput && alturaInput) {
        const { base, altura } = getStoredValues();
        baseInput.value = base;
        alturaInput.value = altura;
    }

    
    if (document.getElementById("canvas2D")) {
        actualizarResultados();
    }

    
    if (document.getElementById("canvasStatic")) {
        dibujarTrianguloEstatico();
    }

    
    const colorInput = document.getElementById("color");
    if (colorInput) {
        const color = colorInput.value;
        dibujarTriangulo(color);
    }
});