const canvas = document.getElementById("canvas");

if (!canvas.getContext) {
    return;
}
const context = canvas.getContext("2d");