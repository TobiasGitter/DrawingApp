function textTool() {
    this.name = "textTool";
    this.icon = "assets/text.png";

    var fontSelector;
    this.draw = function () {
        // set current drawing settings
        this.setDrawingSettings();

        // check if user is drawing something
        if (mouseIsPressed && mousePressedOnCanvas()) {
                // use current font
                layers[selectedIndex].layerCanvas.textFont(fonts[fontSelector.value()]);
                // draw text at mouse position
                layers[selectedIndex].layerCanvas.text(select("#textBoxInput").value(),mouseX, mouseY);
                // save current state of the canvas
                layers[selectedIndex].layerCanvas.loadPixels();
        }
    }

    // put text on canvas with current selected settings like color, size and font
    this.setDrawingSettings = function () {
        layers[selectedIndex].layerCanvas.fill(currentColor);
        layers[selectedIndex].layerCanvas.noStroke();
        layers[selectedIndex].layerCanvas.textAlign(CENTER);
        layers[selectedIndex].layerCanvas.textSize(slider.value());
    }

    this.unselectTool = function () {
        //clear options
        select(".options").html("");
    };

    //adds a drop down menu and text input field to the options area
    // decided not to create separate functions because used only when tool is selected
    this.populateOptions = function () {
        // use two rows to implement structur
        select(".options").html('<div class="row optionRow1"></div><div class="row optionRow2"></div>');
        // create input field for text that should be use for drawing
        var textBox = createInput("Change text...");
        textBox.id("textBoxInput");
        textBox.class("col border rounded");
        // put it in row 1
        select(".optionRow1").child(textBox);
        
        //create a drop down menu for the different fonts
        fontSelector = createSelect();
        fontSelector.id("fontSelector");
        fontSelector.class("col border rounded");
        for(key in fonts){
            fontSelector.option(key);
        }
        // place it into the second row
        select(".optionRow2").child(fontSelector);
    };

    
}