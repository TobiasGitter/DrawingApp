/* took the editable shape tool and put it into the layers implementation
also adjusted editing the vertices with a different approach to ensure
that no multiple vertices are moved at the same time and allow quicker and 
smoother movements of the vertex*/
function editableShapeTool() {
    this.name = "editableShape";
    this.icon = "assets/connectedDots.png";

    this.draw = function () {
        this.setDrawingSettings();
        clear();

        // check if user wants to draw on canvas
        if (mouseIsPressed && mousePressedOnCanvas()) {
            // check if user is currently editing and dragging a vertex
            if (editMode && vertexGetsDragged != -1){
                // layers[selectedIndex].layerCanvas.updatePixels();
                // update vertex coordinates of currentShape at dragging index (vertexGetsDragged) to values of mouse
                currentShape[vertexGetsDragged].x = mouseX;
                currentShape[vertexGetsDragged].y = mouseY;
            }
            // check if user currently editing but not dragging a vertex
            else if (editMode && vertexGetsDragged == -1) {
                // check for all vertices if user wants to drag the vertex
                for (var i = 0; i < currentShape.length; i++) {
                    // check for distance of mouse to each vertex
                    if (dist(currentShape[i].x, currentShape[i].y, mouseX, mouseY) < 15) {
                        // if mouse in distance assign vertexGetsDragged to the index of the currentShape that is getting dragged
                        vertexGetsDragged = i;
                        break;
                    }
                }
            }
        }
        if (selectedIndex != -1) {
            // draw shape (from course material)
            layers[selectedIndex].layerCanvas.beginShape();
            for (var i = 0; i < currentShape.length; i++) {
                if(useCurveVertex){
                    curveVertex(currentShape[i].x, currentShape[i].y);
                }
                else {
                    vertex(currentShape[i].x, currentShape[i].y);
                }
            }
            layers[selectedIndex].layerCanvas.endShape();
        }
        

        // draw ellipses in on top of vertex to see them better
        if(editMode && selectedIndex != -1){
            layers[selectedIndex].layerCanvas.strokeWeight(1);
            layers[selectedIndex].layerCanvas.fill("red");
            for (var i = 0; i < currentShape.length; i++) {
                layers[selectedIndex].layerCanvas.ellipse(currentShape[i].x, currentShape[i].y, max([slider.value() / 10, 10]));
            }
            layers[selectedIndex].layerCanvas.noFill();
            layers[selectedIndex].layerCanvas.strokeWeight(slider.value() / 20);
        }
    }

    this.setDrawingSettings = function () {
        // set noFill, color of stroke, and stroke weight according to slider (top right)
        if(selectedIndex != -1){
            layers[selectedIndex].layerCanvas.noFill();
            layers[selectedIndex].layerCanvas.stroke(currentColor);
            layers[selectedIndex].layerCanvas.strokeWeight(slider.value() / 20);
            layers[selectedIndex].layerCanvas.updatePixels();
        }
    }

    this.unselectTool = function () {
        // clear both buttons for editing and finishing the shape
        finishShape();
        select(".options").html("");
    };


    this.populateOptions = function () {
        this.createButtonsForEditableShapeTool();
        // update edit mode and the label of the edit button according to current edit mode if button clicked
        select("#editButton").mouseClicked(function () {
            clear();
            if (editMode) {
                editMode = false;
                this.html("Edit Shape");
            }
            else {
                editMode = true;
                this.html("Add Vertices");
            }
        });
        // set editMode to false reset current shape to an empty array
        // secure the shape with loadPixels and update edit button if it was showing the wrong label
        select("#finishButton").mouseClicked( function() {
            if(selectedIndex != -1){
                clear();
                editMode = false;
                toolbox.selectedTool.draw();
                layers[selectedIndex].layerCanvas.loadPixels();
                currentShape = [];
                if(toolbox.selectedTool.name == "editableShape"){
                    select("#editButton").html("Edit Shape");
                }
            }
            else {
                alert("no layer is selected")
            }});
        select("#curveVertexButton").mouseClicked( function() {
            clear();
            useCurveVertex = !useCurveVertex;
            if(useCurveVertex){
                this.html("Normal Vertices");
            }
            else {
                this.html("Curved Vertices")
            }
            layers[selectedIndex].layerCanvas.updatePixels();
        });
    };

    this.createButtonsForEditableShapeTool = function () {
        // create the edit button and add to option part of the index.html
        var editShapeButton = createButton("Edit Shape");
        editShapeButton.id("editButton");
        editShapeButton.class("btn border rounded");
        select(".options").child(editShapeButton);

        // create the finish button and add to option part of the index.html
        var finishShapeButton = createButton("Finish Shape");
        finishShapeButton.class("btn border rounded");
        finishShapeButton.id("finishButton")
        select(".options").child(finishShapeButton);

        var curveVertexButton = createButton("Curved Vertices");
        curveVertexButton.class("btn border rounded");
        curveVertexButton.id("curveVertexButton")
        select(".options").child(curveVertexButton);
    };
}

function finishShape(){
    editMode = false;
    toolbox.selectedTool.draw();
    // draw shape (from course material)
    if(selectedIndex != -1){
        layers[selectedIndex].layerCanvas.beginShape();
        for (var i = 0; i < currentShape.length; i++) {
            if(useCurveVertex){
                layers[selectedIndex].layerCanvas.curveVertex(currentShape[i].x, currentShape[i].y);
            }
            else {
                layers[selectedIndex].layerCanvas.vertex(currentShape[i].x, currentShape[i].y);
            }
        }
        layers[selectedIndex].layerCanvas.endShape();
    }
    currentShape = [];
    if(toolbox.selectedTool.name == "editableShape"){
        select("#editButton").html("Edit Shape");
    }
}
