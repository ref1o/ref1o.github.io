const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");
if (!canvas.getContext) {
    alert("Your browser does not support the canvas element.");
}
const width = canvas.width;
const height = canvas.height;
const fps = 60;

const imageData = ctx.getImageData(0, 0, width, height);
const pixels = imageData.data;
const numRows = height;
const numCols = width;


function update() {
    //modifico uno ad uno i pixel
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const index = (row * numCols + col) * 4;
            // modifica il pixel in base alle tue esigenze 
            pixels[index] = 255;   // red
            pixels[index + 1] = 35; // green
            pixels[index + 2] = 0; // blue
            pixels[index + 3] = 255; // alpha
        }
    }
    
    ctx.putImageData(imageData, 0, 0);
    setTimeout(update, 1000 / fps);
  }
  // avvia l'aggiornamento
  update();