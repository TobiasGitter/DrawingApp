function HelperFunctions() {
	// clears the selected layer
	// if no layer selected, clears content of all layers
	select("#clearButton").mouseClicked(function () {
		// clear the default canvas
		clear();
		// check if there is a layer selected
		if (selectedIndex == -1) {
			// go through all layers and clear each if no layer selected
			for (var i = 0; i < layers.length; i++) {
				layers[i].layerCanvas.clear();
			}
		}
		else {
			// clear selected layer
			layers[selectedIndex].layerCanvas.clear();
		}
		//call loadPixels to update the drawing state
		//this is needed for the mirror tool
		for (var i = 0; i < layers.length; i++) {
			layers[i].layerCanvas.loadPixels();
		}
	});

	// shifting layer buttons to change order of the layers
	select('#shiftLayerUpButton').mouseClicked(function (){
		shiftLayerHigher();
	});

	select('#shiftLayerDownButton').mouseClicked(function (){
		shiftLayerLower();
	});
	
	// opens up the tutorial field, big rectangle in the foreground with opacity 
	// decided not to create a whole other html but a simple pop up window
	select('#openInfoButton').mouseClicked(function() {
		select('#AppInformation').style("display", "block");
	});

	// closes the tutorial field
	select('#closeInfoButton').mouseClicked(function() {
		select('#AppInformation').style("display", "none");
	});

	//event handler for the save image button. saves the canvas to the
	//local file system.
	select("#saveImageButton").mouseClicked(function () {
		saveCanvas("myPicture", "jpg");
	});

	// adds a layer to the layer array (in the background) and a visible layer div to the app
	select("#addLayerButton").mouseClicked(function () {
		if (selectedIndex != -1 ) {
			// if a layer is selected save current state of canvas of selected layer
			if(toolbox.selectedTool.name == "mirrorDraw"){
				layers[selectedIndex].layerCanvas.updatePixels();
			}
			else {
				layers[selectedIndex].layerCanvas.loadPixels();
			}
		}
		// check if currently drawing a shape with the editable shape tool and ask the
		// user to finish that shape first
		if(toolbox.selectedTool.name == "editableShape" && editMode || currentShape.length > 0){
			alert("Please finish shape first.");
		}
		// if nothing is interfering, call the addlayer function (in layerUtils)
		else {
			addLayer();
		}
	});

	// deletes selected layer, if none selected asks user to select a layer to delete
	select("#deleteLayerButton").mouseClicked(function () {
		// check if one layer is selected
		if (selectedIndex == -1) {
			alert("Please select that you wan't to remove.");
		}
		else {
			deleteCurrentLayer();
		}
	});

	// scissors tool
	// enables the user to select an area that will be cut out an is 
	// avaible to display on the canvas multiple times
	select("#selectAreaButton").mouseClicked(function () {
		// check if a layer is selected
		if (selectedIndex != -1) {
			// check for current state, selectMode == 0 means no area has been selected
			// enables user to select an area
			if (selectMode == 0) {
				// increase select Mode if user decides to select an area by pressing the button
				selectMode++;
				// change innerhtml of selectAreaButton to ask user to 
				// select an area
				this.html("Cut!");
				this.style("background-color", "red")
			}
			else if (selectMode == 1) {
				// increase selectMode and enables user to paste area that was cut out 
				// to put on canvas multiple times
				selectMode++;
				// change inner html of button to indicate that it's possible to end pasting
				this.html("End Paste!")
				// refresh screen and current layer
				layers[selectedIndex].layerCanvas.updatePixels();
				var width_scaler = 1;
        		var height_scaler = 1;
				if (layers[selectedIndex].layerCanvas["imageData"]) {
					// if yes, set scalers to relation of imageData to current canvas size
					width_scaler = layers[selectedIndex].layerCanvas["imageData"].width / canvasContainer.width;
					height_scaler = layers[selectedIndex].layerCanvas["imageData"].height / canvasContainer.height;
				}
				// store pixels of the selected area
				selectedPixels = layers[selectedIndex].layerCanvas.get(
					selectedArea.x / width_scaler, selectedArea.y / height_scaler, selectedArea.width, selectedArea.height
				)
				// draw a white rectangle over the selected area
				// layers below will be affected by this, change order of layers to fix this
				layers[selectedIndex].layerCanvas.push();
				layers[selectedIndex].layerCanvas.noStroke();
				layers[selectedIndex].layerCanvas.fill(255);
				layers[selectedIndex].layerCanvas.rect(
					selectedArea.x, selectedArea.y, selectedArea.width, selectedArea.height
				);
				layers[selectedIndex].layerCanvas.pop();
				// save the current state of the canvas
				layers[selectedIndex].layerCanvas.loadPixels();
				layers[selectedIndex].layerCanvas.stroke(currentColor);
			}
			// check if user presses the button to end the pasting
			else if (selectMode == 2) {
				// reset selectMode and save canvas
				selectMode = 0;
				layers[selectedIndex].layerCanvas.loadPixels();
				// reset selected area and inner html of the button
				selectedArea = { x: 0, y: 0, width: 0, height: 0 };
				this.html("Select Area");
				this.style("background-color", "transparent")
			}
		}
		// if no layer selected, ask user to select one
		else {
			alert("Please select a layer first.");
		}
	});
}

// adds all available tools to toolbox
function createTools() {
	toolbox.addTool(new FreehandTool());
	toolbox.addTool(new LineToTool());
	toolbox.addTool(new SprayCanTool());
	toolbox.addTool(new mirrorDrawTool());
	toolbox.addTool(new stampTool());
	toolbox.addTool(new editableShapeTool());
	toolbox.addTool(new EraserTool());
	toolbox.addTool(new dragShapeTool());
	toolbox.addTool(new textTool());
}

// shows user what area will be cut out when pressing the button again
// is a dragable rectangle that will change each time the user drags and drops
function enableCuttingMode() {
	// refresh the canvas
	layers[selectedIndex].layerCanvas.updatePixels();
	clear();

	// set the drawing settings for the red rectangle with a little transparancy
	// with transparancy the user sees what is going to be cut out
	layers[selectedIndex].layerCanvas.noStroke();
	layers[selectedIndex].layerCanvas.fill(255, 0, 0, 100);
	// draw a rectangle with current values
	layers[selectedIndex].layerCanvas.rect(
		selectedArea.x,
		selectedArea.y,
		selectedArea.width,
		selectedArea.height
	);
	// change values to a completely transparant rect
	layers[selectedIndex].layerCanvas.stroke(255);
	layers[selectedIndex].layerCanvas.fill(255, 0, 0, 255);
}

// enables the user to change the order of the layers
// not using any other pressed keys
function keyPressed() {
	// check if a layer is selected, if not ask user to select one
	if (selectedIndex != -1) {
		// check if user wants to shift a layer up or down
		// use RIGHT ARROW for up
		if (keyIsDown(OPTION)
			&& keyCode == RIGHT_ARROW){
				shiftLayerHigher();
			}
		// use LEFT ARROW for down
		else if (keyIsDown(OPTION)
			&& keyCode == LEFT_ARROW){
				shiftLayerLower();
			}
		}	
	// ask user to select one if no layer is selected
	else {
		alert("Please select a layer to move!");
	}
}

