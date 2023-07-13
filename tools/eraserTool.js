function EraserTool() {
	//set an icon and a name for the object
	this.icon = "assets/eraser.png";
	this.name = "eraserTool";

	this.draw = function () {
		// set fill to white (background color)
		layers[selectedIndex].layerCanvas.noStroke();
		// check if user presses on canvas
		if (mouseIsPressed && mousePressedOnCanvas()) {
			console.log("drawing");
			// layers[selectedIndex].layerCanvas.erase();
			layers[selectedIndex].layerCanvas.fill(255);
			// I felt, the drawing ellipses like with the stamp tool works better than drawing a line
			layers[selectedIndex].layerCanvas.ellipse(mouseX, mouseY, slider.value(), slider.value());
			// layers[selectedIndex].layerCanvas.noErase();
		}
		// secure the canvas
		layers[selectedIndex].layerCanvas.loadPixels();
	}
}