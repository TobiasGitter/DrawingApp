//a tool for drawing straight lines to the screen. Allows the user to preview
//the a line to the current mouse position before drawing the line to the 
//pixel array.
function LineToTool() {
	this.icon = "assets/lineTo.jpg";
	this.name = "LineTo";

	// set starting values to default
	var startMouseX = -1;
	var startMouseY = -1;
	// value for checking if user is currently drawing
	var drawing = false;

	var lineto_width_scaler;
	var lineto_height_scaler;

	//draws the line to the screen 
	this.draw = function () {
		this.setDrawingSettings();
		// refresh the default canvas
		clear();
		layers[selectedIndex].layerCanvas.updatePixels();
		// only draw when mouse is clicked
		if (mouseIsPressed ) {
			// if it's the start of drawing a new line
			if (startMouseX == -1) {
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;
			}
			// if not the start
			else {
				if (layers[selectedIndex].layerCanvas["imageData"]) {
					// if yes, set scalers to relation of imageData to current canvas size
					lineto_width_scaler = layers[selectedIndex].layerCanvas["imageData"].width / canvasContainer.width;
					lineto_height_scaler = layers[selectedIndex].layerCanvas["imageData"].height / canvasContainer.height;
				}
				// draw line from starting to current coordinates
				layers[selectedIndex].layerCanvas.line(startMouseX, startMouseY, mouseX, mouseY);
			}
		}
		// check if currently drawing but user doesn't press on canvas anymore
		else if (drawing) {
			// user is not drawing anymore
			drawing = false;
			// secure the canvas with loadpixels
			layers[selectedIndex].layerCanvas.loadPixels();
			// set starting values to default
			startMouseX = -1;
			startMouseY = -1;
		}
	};

	this.setDrawingSettings = function () {
		// set fill, stroke and strokeWeight to current chosen values
		layers[selectedIndex].layerCanvas.fill(currentColor);
		layers[selectedIndex].layerCanvas.stroke(currentColor);
		layers[selectedIndex].layerCanvas.strokeWeight(slider.value() / 10);
		updatePixels();
	}
}
