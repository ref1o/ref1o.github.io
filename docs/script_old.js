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
            pixels[index] = 153;   // red
            pixels[index + 1] = 203; // green
            pixels[index + 2] = 255; // blue
            pixels[index + 3] = 255; // alpha
        }
    }
    
    ctx.putImageData(imageData, 0, 0);
    setTimeout(update, 1000 / fps);
}

update();

class sand{
    
    constructor(canvas,options){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.sandColor = options?.sandColor ?? 'rgb(194, 178, 128)';
        this.maxDepth = options?.maxDepth ?? 10;
        this.minDepth = options?.minDepth ?? 1;
        this.fallSpeed = options?.fallSpeed ?? 2;
        this.sand = [];
        for (let y = 0; y < canvas.height; y++) {
            const row = [];
            for (let x = 0; x < canvas.width; x++) {
                row.push(0);
            }
            this.sand.push(row);
        }
        this.update = this.update.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.canvas.addEventListener('click', this.clickHandler);
        this.update();
    }
    
    fall(x, y) {
        if (y >= this.canvas.height - 1) return;
        
        let depth = this.sand[y][x] + this.fallSpeed;
        if (depth > this.maxDepth) depth = this.maxDepth;
        
        let direction = 0;
        const left = x > 0 ? this.sand[y + 1][x - 1] : Infinity;
        const right = x < this.canvas.width - 1 ? this.sand[y + 1][x + 1] : Infinity;
        if (left < depth && left < right) {
            direction = -1;
        } else if (right < depth && right < left) {
            direction = 1;
        }

        if (direction !== 0) {
            this.sand[y + 1][x + direction] += depth - this.minDepth;
            this.sand[y][x] = this.minDepth;
        } else {
            this.sand[y + 1][x] += depth - this.minDepth;
            this.sand[y][x] = this.minDepth;
        }
    }
    
    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let y = 0; y < this.canvas.height; y++) {
            for (let x = 0; x < this.canvas.width; x++) {
                if (this.sand[y][x] > 0) {
                    this.ctx.fillStyle = this.sandColor;
                    this.ctx.fillRect(x, y, 1, 1);
                }
            }
        }
        requestAnimationFrame(this.update);
    }
    
    destroy() {
        this.canvas.removeEventListener('click', this.clickHandler);
    }
}
