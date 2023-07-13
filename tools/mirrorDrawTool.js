function mirrorDrawTool() {
	this.name = "mirrorDraw";
	this.icon = "assets/mirrorDraw.jpg";

	//which axis is being mirrored (x or y) x is default
	this.axis = "x";
	//line of symmetry is halfway across the screen
	this.lineOfSymmetry = width / 2;
	//this changes in the jquery click handler. So storing it as
	//a variable self now means we can still access it in the handler
	var self = this;

	//where was the mouse on the last time draw was called.
	//set it to -1 to begin with
	var previousMouseX = -1;
	var previousMouseY = -1;

	//mouse coordinates for the other side of the Line of symmetry.
	var previousOppositeMouseX = -1;
	var previousOppositeMouseY = -1;

	this.draw = function () {
		//display the last save state of pixels
		layers[selectedIndex].layerCanvas.updatePixels();
		this.setDrawingSettings();

		//do the drawing if the mouse is pressed
		if (mouseIsPressed && mousePressedOnCanvas()) {
			//if the previous values are -1 set them to the current mouse location
			//and mirrored positions
			if (previousMouseX == -1) {
				this.startDrawing();
			}
			//if there are values in the previous locations
			//draw a line between them and the current positions
			else {
				this.drawLineAndMirrorLine();
			}
		}
		//if the mouse isn't pressed reset the previous values to -1
		else {
			previousMouseX = -1;
			previousMouseY = -1;

			previousOppositeMouseX = -1;
			previousOppositeMouseY = -1;
		}

		// after the drawing is done save the pixel state. We don't want the
		// line of symmetry to be part of our drawing
		layers[selectedIndex].layerCanvas.loadPixels();

		// push the drawing state so that we can set the stroke weight and colour
		// This is the only thing that gets drawn on the default canvas
		push();
		layers[selectedIndex].layerCanvas.strokeWeight(3);
		layers[selectedIndex].layerCanvas.stroke(255, 0, 0);
		//draw the line of symmetry
		if (this.axis == "x") {
			this.drawVerticalSymmetryAxis();
		} else {
			this.drawHorizontalSymmetryAxis();
		}
		//return to the original stroke
		pop();
	};

	// use the current selected settings for drawing the line
	this.setDrawingSettings = function () {
		// set current drawing color, stroke and stroke weight
		layers[selectedIndex].layerCanvas.fill(currentColor);
		layers[selectedIndex].layerCanvas.stroke(currentColor);
		layers[selectedIndex].layerCanvas.strokeWeight(slider.value() / 20);
	};

	// initiate the drawing process by setting previous values
	this.startDrawing = function () {
		// set previous to current mouse values to enable drawing 
		// lines from last to current mouseposition
		previousMouseX = mouseX;
		previousMouseY = mouseY;
		// also calculate opposite values 
		previousOppositeMouseX = this.calculateOpposite(previousMouseX, "x");
		previousOppositeMouseY = this.calculateOpposite(previousMouseY, "y");
	};

	// draw current line and calculated mirror line
	this.drawLineAndMirrorLine = function () {
		layers[selectedIndex].layerCanvas.line(previousMouseX, previousMouseY, mouseX, mouseY);
		// set previous coordinates to current mouseX and mouseY
		previousMouseX = mouseX;
		previousMouseY = mouseY;

		//these are for the mirrored drawing the other side of the
		//line of symmetry
		var oX = this.calculateOpposite(mouseX, "x");
		var oY = this.calculateOpposite(mouseY, "y");
		layers[selectedIndex].layerCanvas.line(previousOppositeMouseX, previousOppositeMouseY, oX, oY);
		// set previous opposite coordinates to current opposite of mouseX and mouseY
		previousOppositeMouseX = oX;
		previousOppositeMouseY = oY;
	};

	// draw vertical symmetry line
	this.drawVerticalSymmetryAxis = function () {
		layers[selectedIndex].layerCanvas.line(this.lineOfSymmetry, 0, this.lineOfSymmetry, 2500);
	};

	// draw horizontal symmetry line
	this.drawHorizontalSymmetryAxis = function () {
		layers[selectedIndex].layerCanvas.line(0, this.lineOfSymmetry, 1500, this.lineOfSymmetry);
	};

	/*calculate an opposite coordinate the other side of the
	 *symmetry line.
	 *@param n number: location for either x or y coordinate
	 *@param a [x,y]: the axis of the coordinate (y or y)
	 *@return number: the opposite coordinate
	 */
	this.calculateOpposite = function (n, a) {
		//if the axis isn't the one being mirrored return the same
		//value
		if (a != this.axis) {
			return n;
		}

		//if n is less than the line of symmetry return a coorindate
		//that is far greater than the line of symmetry by the distance from
		//n to that line.
		if (n < this.lineOfSymmetry) {
			return this.lineOfSymmetry + (this.lineOfSymmetry - n);
		}

		//otherwise a coordinate that is smaller than the line of symmetry
		//by the distance between it and n.
		else {
			return this.lineOfSymmetry - (n - this.lineOfSymmetry);
		}
	};


	//when the tool is deselected update the pixels to just show the drawing and
	//hide the line of symmetry. Also clear options
	this.unselectTool = function () {
		clear();
		if(selectedIndex != -1){
			layers[selectedIndex].layerCanvas.updatePixels();
		}
		//clear options
		select(".options").html("");
	}

	//adds a button and click handler to the options area. When clicked
	//toggle the line of symmetry between horizontal to vertical
	this.populateOptions = function () {
		var axisButton = createButton("Make Horizontal");
		axisButton.class("btn border rounded");
		axisButton.id("directionButton");
		// put button in the options part of index.html
		select(".options").child(axisButton);

		// click handler
		select("#directionButton").mouseClicked(function () {
			clear();
			var button = select("#" + this.elt.id);
			// when clicked, change axis, line of symmetry and html in axisButton
			if (self.axis == "x") {
				self.axis = "y";
				self.lineOfSymmetry = height / 2;
				button.html('Make Vertical');
			} else {
				self.axis = "x";
				self.lineOfSymmetry = width / 2;
				button.html('Make Horizontal');
			}
		});
	};
}