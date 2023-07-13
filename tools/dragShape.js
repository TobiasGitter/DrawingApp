// I really like creating shapes on the fly 
function dragShapeTool() {
    this.name = "dragShapeTool";
    this.icon = "assets/dragShape.png";
    // possible shapes that can be drawn by the user through dragging
    var shapes = ["Circle", "Rect", "Square"];
    // drop down menu for shapes
    var selector;
    // for square shape, gets assigned the biggest absolute value 
    // from the array of dragwidth and dragheight
    var drawsize;
    // get center of circle for a more satisfying drawing
    var x;
    var y;

    this.draw = function () {
        clear();
        updatePixels();
        if (!dragMode && mouseIsPressed && selectedIndex != -1) {
            this.initiateDragging();
        }
        // check if currently dragging and then update currently drawn shape
        else if (dragMode != selectedIndex != -1) {
            // updating the canvas of selected layer with newest shape
            layers[selectedIndex].layerCanvas.updatePixels();
            // check for current selected shape
            switch (selector.value()) {
                case "Circle":
                    this.drawDragCircle();
                    break;
                case "Rect":
                    this.drawDragRect();
                    break;
                case "Square":
                    this.drawDragSquare();
                    break;
                default:
                    // setting default to a normal rectangle
                    this.drawDragRect();
                    break;
            }
        }
    };

    // start drawing process, used when user starts to press on canvas
    this.initiateDragging = function () {
        // set to true if currently trying to draw something
        dragMode = true;
        // assign x and y of drag are quite similar to scissors tool
        selectedDragArea.x = mouseX;
        selectedDragArea.y = mouseY;
        // set fill and no stroke
        layers[selectedIndex].layerCanvas.noStroke();
        layers[selectedIndex].layerCanvas.fill(currentColor);
    };

    // draw a circle with dragging values
    this.drawDragCircle = function () {
        // get middle of circle to draw the ellipse correctly
        x = selectedDragArea.x + (selectedDragArea.width / 2);
        y = selectedDragArea.y + (selectedDragArea.height / 2);
        layers[selectedIndex].layerCanvas.ellipse(x, y, selectedDragArea.width, selectedDragArea.height);
    };

    // draw rectangle with current dragArea values
    this.drawDragRect = function () {
        layers[selectedIndex].layerCanvas.rect(
            selectedDragArea.x, 
            selectedDragArea.y, 
            selectedDragArea.width, 
            selectedDragArea.height);
    };

    // draw square with dragging values and using the max value of width and height
    this.drawDragSquare = function () {
        // get the maximum absolute value of width and hight
        drawsize = max([abs(selectedDragArea.width), abs(selectedDragArea.height)]);
        // check for each direction in which the user could possible drag the square and draw it accordingly
        if(mouseX >= selectedDragArea.x && mouseY >= selectedDragArea.y){
            layers[selectedIndex].layerCanvas.rect(selectedDragArea.x, selectedDragArea.y, drawsize, drawsize);                        
        }
        else if(mouseX >= selectedDragArea.x && mouseY < selectedDragArea.y){
            layers[selectedIndex].layerCanvas.rect(selectedDragArea.x, selectedDragArea.y, drawsize, -drawsize);
        }
        else if(mouseX < selectedDragArea.x && mouseY >= selectedDragArea.y){
            layers[selectedIndex].layerCanvas.rect(selectedDragArea.x, selectedDragArea.y, -drawsize, drawsize);
        }
        else if(mouseX < selectedDragArea.x && mouseY < selectedDragArea.y){
            layers[selectedIndex].layerCanvas.rect(selectedDragArea.x, selectedDragArea.y, -drawsize, -drawsize);
        }
        else {
            layers[selectedIndex].layerCanvas.rect(selectedDragArea.x, selectedDragArea.y, drawsize, drawsize);
        }
    };

    // used when user selects another tool
    this.unselectTool = function () {
        if(selectedIndex != -1){
            layers[selectedIndex].layerCanvas.updatePixels();
        }
        // clear the drop down menu for the different drag shapes
        select(".options").html("");
        // default to ensure, no other tool is interfering 
        dragMode = false;
    };

    // used when user selects this tool
    this.populateOptions = function () {
        // if dragShape tool is selected, create a drop down menu
        selector = createSelect();
        selector.id("ShapeSelectorStamp");
        selector.class("border rounded");
        // add all the shapes to the drop down to let the user choose
        for (var i = 0; i < shapes.length; i++) {
            selector.option(shapes[i]);
        }
        // put the drop down menu in the options part of index.html
        select(".options").child(selector);
    };
}