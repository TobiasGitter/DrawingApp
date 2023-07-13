function FreehandTool() {
	//set an icon and a name for the object
	this.icon = "assets/freehand.jpg";
	this.name = "freehand";

	// set prev x and y to default value if nothing is drawn
	var previousMouseX = -1;
	var previousMouseY = -1;

	this.draw = function () {
		//if the mouse is pressed
		if (mouseIsPressed) {
			//check if they previousX and Y are -1. set them to the current
			//mouse X and Y if they are.
			if (previousMouseX == -1) {
				previousMouseX = mouseX;
				previousMouseY = mouseY;
			}
			//if we already have values for previousX and Y we can draw a line from 
			//there to the current mouse location
			else {
				this.setDrawingSettings();
				// draw a line from previous x and y to current mouseX and mouseY
				layers[selectedIndex].layerCanvas.line(previousMouseX, previousMouseY, mouseX, mouseY);
				// set previous values to current to ensure next line works
				previousMouseX = mouseX;
				previousMouseY = mouseY;
				// secure the canvas
				layers[selectedIndex].layerCanvas.loadPixels();
			}
		}
		else {
			// if user doesn't press on canvas set prev values to default 
			previousMouseX = -1;
			previousMouseY = -1;
			// secure the canvas
			layers[selectedIndex].layerCanvas.loadPixels();
		}
	};

	this.setDrawingSettings = function () {
		// set fill, and stroke weight
		layers[selectedIndex].layerCanvas.fill(currentColor);
		layers[selectedIndex].layerCanvas.stroke(currentColor);
		layers[selectedIndex].layerCanvas.strokeWeight(slider.value() / 10);
	}
}