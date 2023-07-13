function SprayCanTool() {

	this.name = "sprayCanTool";
	this.icon = "assets/sprayCan.jpg";

	// set starting values
	var points = 40;
	var orig_spread = 10;
	// a and r are for the circle spray implementation
	var a;
	var r;

	this.draw = function () {
		this.setDrawingSettings();

		// circle implementation from https://editor.p5js.org/zapra/sketches/rjIJR18fT
		// original idea: https://programming.guide/random-point-within-circle.html
		if (mouseIsPressed && mousePressedOnCanvas()) {
			// draw point for each point in points scaled to values in 
			// a circle with random values within a circle
			for (var i = 0; i < points; i++) {
				a = random() * 2 * Math.PI;
				r = spread * Math.sqrt(random());
				layers[selectedIndex].layerCanvas.point(mouseX + r * Math.cos(a), mouseY + r * Math.sin(a));
			}
		}
		// save current state of canvas
		layers[selectedIndex].layerCanvas.loadPixels();
	};

	// use current selected values to spray on the canvas
	this.setDrawingSettings = function () {
		// set current drawing settings
		layers[selectedIndex].layerCanvas.fill(currentColor);
		layers[selectedIndex].layerCanvas.stroke(currentColor);
		layers[selectedIndex].layerCanvas.strokeWeight(1);

		// adjust radius according to slider value
		spread = orig_spread * slider.value() / 10;
	};
}