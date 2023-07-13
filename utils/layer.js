// each layer is a Layer object that uses an index for identification
// drawing on multiple canvasses is enables by using 
// the createGraphics function of p5.js
function Layer() {
    // set current index to total amount of used layers
    this.index = layerCount;
    // create a new canvas with current width and height of the canvas
    this.layerCanvas = createGraphics(canvasContainer.width, canvasContainer.height);
}