function getStoredValues() {
    return {
        base: parseFloat(localStorage.getItem("base")) || 1,
        altura: parseFloat(localStorage.getItem("altura")) || 1,
        angulo: parseFloat(localStorage.getItem("angulo")) || 60
    };
}

function setStoredValues(base, altura) {
    localStorage.setItem("base", base);
    localStorage.setItem("altura", altura);
}

function validateInputs(base, altura) {
    if (base >= 1000 || altura >= 1000) {
        alert("No se puede generar la figura 3D si la base o altura son mayores o iguales a 1000.");
        return false;
    }
    if (isNaN(base) || isNaN(altura)) {
        alert("Por favor, ingrese valores válidos.");
        return false;
    }
    return true;
}