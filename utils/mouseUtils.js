// check if mousePressed for the scissors button
function mousePressed() {
    // check for current state of scissors functionality
    if (selectMode == 1 && mousePressedOnCanvas()) {
        // if user is selecting a new area set all values to default
        selectedArea.x = mouseX;
        selectedArea.y = mouseY;
        selectedArea.width = 0;
        selectedArea.height = 0;
    }
    // check if user selected an area and wants to put it on the canvas
    else if (selectMode == 2 && mousePressedOnCanvas()) {
        var width_scaler = 1;
        var height_scaler = 1;
			if (layers[selectedIndex].layerCanvas["imageData"]) {
				// if yes, set scalers to relation of imageData to current canvas size
				width_scaler = layers[selectedIndex].layerCanvas["imageData"].width / canvasContainer.width;
				height_scaler = layers[selectedIndex].layerCanvas["imageData"].height / canvasContainer.height;				
            }
        // display an image on the canvas according to current mouse position
        layers[selectedIndex].layerCanvas.image(selectedPixels,
            mouseX,
            mouseY,
            selectedPixels.width * width_scaler,
            selectedPixels.height * height_scaler);
        // save the current state of the canvas
        layers[selectedIndex].layerCanvas.loadPixels();
    }
    // check if no layer is selected to cut out an area from
    else if (selectMode == 0 && mousePressedOnCanvas() && selectedIndex == -1) {
        alert("Please select a layer first.")
    }
    // if user uses editable shape tool
    // check if currently not editing
    else if(
        toolbox.selectedTool.name == "editableShape" &&
        !editMode && 
        mousePressedOnCanvas()){
            // if user presses on canvas and releases mouse, a new vertex gets 
            // added to the current shape
            currentShape.push({
                x: mouseX,
                y: mouseY
            });
    }
}

// check mouseDragging for dragShape tool and scissors functionality
function mouseDragged() {
    // check if user is currently selecting an area for scissors functionality
    if (selectMode == 1 && mousePressedOnCanvas()) {
        // set width and height accordingly to difference between
        // starting and current mouse position
        selectedArea.width = mouseX - selectedArea.x;
        selectedArea.height = mouseY - selectedArea.y;
    }
    // check if user is currently selecting an area to draw a dragged shape
    else if (dragMode ){
        // set width and height accordingly to difference between
        // starting and current mouse position
        selectedDragArea.width = (mouseX - selectedDragArea.x);
        selectedDragArea.height = (mouseY - selectedDragArea.y);
    }
}

// check if user clicked on canvas
// return: boolean
// true if user clicked on canvas and false if not
function mousePressedOnCanvas() {
    // compare mouse coordinates with canvas coordinates
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        return true;
    }
    return false;
}

// check if mouse released
function mouseReleased() {
    // with the dragshape tool, the shape gets finally drawn when user 
    // releases the mouse
    if (toolbox.selectedTool.name == "dragShapeTool" && selectedIndex != -1) {
        // set dragMode to default, indicates user is not dragging mouse
        dragMode = false;
        // set selected area to default
        selectedDragArea = { x: 0, y: 0, width: 0, height: 0 };
        // save canvas with drawn shape
        layers[selectedIndex].layerCanvas.loadPixels();
    }
    // check if user is in editing mode and currently dragging one vertex
    // allows smoother changing of vertices and fixes the problem of 
    // changing multiple vertices to the same position
    // vertexGetsDragged means mouse is currently busy dragging a vertex and has the
    // value of the current index of the vertex that gets dragged
    else if(
        selectedIndex != -1 && 
        toolbox.selectedTool.name == "editableShape" && 
        editMode && 
        vertexGetsDragged != -1){    
            // update canvas
            updatePixels();
            layers[selectedIndex].layerCanvas.updatePixels();
            // once released, no vertex is getting dragged anymore
            // set vertexGetsDragged to default
            vertexGetsDragged = -1;
    }
    // if lineto tool is selected simply save the canvas
    // saves drawn line
    else if (selectedIndex != -1 && toolbox.selectedTool.name == "LineTo"){
        layers[selectedIndex].layerCanvas.loadPixels();
    }
}
