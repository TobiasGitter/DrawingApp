// this function displays selected layer if one layer is selected and 
// all layers if no layer is selected
function displayLayers() {
    // create a width_scaler and height_scaler variable to adjust images
    // for different screen sizes and resolutions
    // this fixes the problem that I had with the midterm project 
    var width_scaler = 1;
    var height_scaler = 1;
    // check if there is a layer selected
    if (selectedIndex == -1) {
        // if no layer is selected go through all layers and display them
        for (var i = 0; i < layers.length; i++) {
            // checking for imageData is liking checking if there is something
            // already displayed on the canvas
            if(layers[i]){
                if (layers[i].layerCanvas["imageData"]) {
                    // if yes, set scalers to relation of imageData to current canvas size
                    width_scaler = layers[i].layerCanvas["imageData"].width / canvasContainer.width;
                    height_scaler = layers[i].layerCanvas["imageData"].height / canvasContainer.height;
                }
                // display the image with adjusted down to correct size
                image(layers[i].layerCanvas, 0, 0, canvasContainer.width / width_scaler, canvasContainer.height / height_scaler);
            }
        }
    }
    // if layer is selected
    else {
        // checking for imageData is liking checking if there is something
        // already displayed on the canvas
        if (layers[selectedIndex].layerCanvas["imageData"]) {
            // if yes, set scalers to relation of imageData to current canvas size
            width_scaler = layers[selectedIndex].layerCanvas["imageData"].width / canvasContainer.width;
            height_scaler = layers[selectedIndex].layerCanvas["imageData"].height / canvasContainer.height;
        }
        // display the image with adjusted down to correct size
        image(layers[selectedIndex].layerCanvas, 0, 0, canvasContainer.width / width_scaler, canvasContainer.height / height_scaler);
    }
}

// adds a layer to layer array and a layer div to the html 
// called from helper functions from the add layer button
function addLayer() {
    // increase the total layer count
    layerCount++;
    // maximum of 10 layers
    if (layers.length < 10) {
        // add a new layer object to the layers array
        layers.push(new Layer(layerCount));
        // create a div for the new layer with correct id and class
        var layer = createDiv('L' + parseInt(layerCount));
        layer.id(str(layerCount));
        layer.class(layerClass);
        layer.mouseClicked(function () {
            layerItemClick(this.id());
        });
        // put it in the layers div of the html
        select(".layers").child(layer);
    }
    // if maximum of 10 layers reached
    else {
        alert("You can't add any more layers. Please delete layers to create new ones.")
    }
    // scale layer values like style and width and height to correct values
    scale_layers();
    layers[layers.length-1].layerCanvas.loadPixels();
}

// enable changing the selected layer by clicking on the html element of the layer
function layerItemClick(index) {
    // check if the user is currently editing a shape or creating a new shape
    // with the editable shape tool
    if(!editMode && currentShape.length == 0){
        // if not, select the layer that the user clicked on
        selectLayer(index);
    }
    else {
        // otherwise, ask user to finish current shape
        alert("Please finish shape first!");
    }
}

// enables selecting layers by clicking on the layer divs
function selectLayer(index) {
    clear();
    if(selectedIndex != -1 && toolbox.selectedTool.name == "mirrorDraw"){
        layers[selectedIndex].layerCanvas.updatePixels();
    }
    // Check if there is a layer selected
    // had to change selectors because new p5 version select doesn't ids starting with digits
    if (selectedIndex != -1) {
        // if layer is selected then check if user clicked on selected layer
        if (index == layers[selectedIndex].index) {
            // unselect layer by setting border to default
            document.getElementById(str(index)).className = layerClass;
            // and resetting selectedInded to default
            selectedIndex = -1;
        }
        // if a layer is selected and user clicked on other layer then the selected one
        else {
            // go through all layers and select the right one
            // identification works through the index property of the layer object
            for (var i = 0; i < layers.length; i++) {
                // check if loop found the right layer
                if (index == layers[i].index) {
                    // unselect current index by setting border to default
                    document.getElementById(str(layers[selectedIndex].index)).className = layerClass;
                    // change selectedIndex to current i 
                    selectedIndex = i;
                    // based on new selected index, set border of selectedIndex to selected style
                    document.getElementById(str(layers[selectedIndex].index)).className = layerClassSelected;
                    // finish shape if user was currently drawing something with the editable shape tool
                    if(toolbox.selectedTool.name == "editableShape") {
                        finishShape();
                    }
                }
            }
        }
    }
    // if no layer is selected
    else {
        // go through all layers and look for index of layer div element
        for (var i = 0; i < layers.length; i++) {
            // compare index of clicked element and current
            // element of the array
            if (index == layers[i].index) {
                // set border to selected style
                document.getElementById(str(index)).className = layerClassSelected;
                // change selected index to current i 
                selectedIndex = i;
            }
        }
    }
    // update inner html of the buttons, e.g. deleteLayer only works for selected layer etc.
    updateButtons();
}

// update inner html of buttons
function updateButtons() {
    // check if there is a layer selected and change inner html of clear and 
    // delete Layer button accordingly
    if (selectedIndex == -1) {
        select("#clearButton").html("Clear All");
        select("#deleteLayerButton").html("Delete not availabe");
    }
    else {
        select("#clearButton").html("Clear");
        select("#deleteLayerButton").html("Delete Layer");
    }
}

// delete selected layer, if there is one selected
function deleteCurrentLayer() {
    // check, if layer is selected
    if (selectedIndex == -1 ) {
        alert("No layer selected.");
    }
    // check, if user wants to delete only existing layer
    else if (layers.length <= 1) {
        alert("You can't delete the only existing layer. Add a layer and delete the current one please.")
    }
    else {
        // remove layer div from html by looking for the id (index)
        document.getElementById(layers[selectedIndex].index).remove();
        // remove layer at the selectedIndex from layer array
        layers.splice(selectedIndex, 1);
        // set selectedIndex to default
        selectedIndex = -1;
        selectLayer(layers[0].index);
    }
}

// set all width and height of all canvasses to current canvasContainer values
function scale_layers() {
    // select all canvasses
    canvasses = selectAll("canvas");
    // set width and height to canvasContainer values
    canvasses[canvasses.length - 1].attribute('width', canvasContainer.width);
    canvasses[canvasses.length - 1].attribute('height', canvasContainer.height);
}

// change the current html according to new order of layer array
// after user changes order of layers with keys
function restructureLayerHTML(){
    // grab all layers
    var htmllayers = document.getElementsByClassName("layer");
    // create an empty string that will contain all html code 
    // of the layers with new order
    var newhtmllayers = '';
    // compare which layers in the layers array and the 
    // and the layers in the html
    // layers array = correct
    // htmllayers = wrong order

    // go through all layers of layers array
    for (var i = 0; i < layers.length;i++){
        // for each layer go through html until correct index found
        for (var j = 0; j < htmllayers.length; j++){
            // compare current layer index with html layer id
            if(layers[i]){
                if(layers[i].index == htmllayers[j].id){
                    // push them in the correct order to the newhtmllayers string
                    newhtmllayers += htmllayers[j].outerHTML;
                }
            }
        }
    }
    // place new layers html into the layers div of the html
    document.getElementById("layers").innerHTML = newhtmllayers;

    // add the onClick function to all layers again
    // enables user to select layer by clicking on it
    // gets all layers
    var addOnlicks = selectAll(".layer");
    // loop through all layers in the html
    for (var i = 0; i < addOnlicks.length; i++){
        // add mouseClicked function
        addOnlicks[i].mouseClicked(function () {
            layerItemClick(this.id());
        });
    }
}

// enable user to move the selected layer on top of others
function shiftLayerHigher() {
	// check if selected layer is already at the highest position
	if(selectedIndex + 1 > layers.length - 1){
		alert("You can't move this layer higher.");
	}
	else {
		// change layers by using a temporary layer
		var tempLayer = layers[selectedIndex + 1];
		layers[selectedIndex + 1] = layers[selectedIndex];
		layers[selectedIndex] = tempLayer;
		// keep the selected layer selected by increasing the selectedIndex
		selectedIndex++;
		restructureLayerHTML();
	}
}

// enable user to move the selected layer beneath others
function shiftLayerLower() {
	// check if selected layer is already at the lowest position
	if(selectedIndex <= 0){
		alert("You can't move this layer lower.");
	}
	else{
		// change layers by using a temporary layer
		var tempLayer = layers[selectedIndex - 1];
		layers[selectedIndex - 1] = layers[selectedIndex];
		layers[selectedIndex] = tempLayer;
		// keep the selected layer selected by decreasing the selectedIndex
		selectedIndex--;
		restructureLayerHTML();
	}
}