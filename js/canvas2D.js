function dibujarTriangulo(color) {
    let canvas = document.getElementById("canvas2D");
    if (!canvas) return;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let { base, altura } = getStoredValues();

    const scale = Math.min(canvas.width / base, canvas.height / altura) * 0.8;

    let x1 = (canvas.width - base * scale) / 2;
    let y1 = canvas.height - (canvas.height - altura * scale) / 2;
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