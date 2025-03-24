function calculateArea(base, altura) {
    return (base * altura) / 2;
}

function getProcedimientoText(base, altura, area) {
    return `Área del triángulo:\n\n` +
           `A = (base × altura) / 2\n` +
           `A = (${base} × ${altura}) / 2\n` +
           `A = ${area.toFixed(2)}`;
}