document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("container-3d")) {
        iniciarEscena3D();
    } else {
        inicializarValores();
    }
});