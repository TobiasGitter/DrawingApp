function stampTool() {
    this.name = "stampTool";
    this.icon = "assets/circle.png";

    // slider values for stamp tool to set width and hight
    var width_slider;
    var height_slider;
    // html elements for adding sliders with labels to the hmtl page
    var width_slider_wrapper;
    var height_slider_wrapper;
    // selector with values for the drop down menu
    var selector;
    var shapes = [ "Circle", "Square", "Rect", "Triangle"];
    var x_pos;
    var y_pos;

    this.draw = function () {
        this.setDrawingSettings();
        // check if user is drawing something
        if (mouseIsPressed && mousePressedOnCanvas()) {
            // check for selected shape in drop down menu
            switch (selector.value()) {
                case "Square":
                    this.drawSquareStamp();
                    break;
                case "Circle":
                    this.drawCircleStamp();
                    break;
                case "Rect":
                    this.drawRectStamp();
                    break;
                case "Triangle":
                    this.drawTriangleStamp();
                    break;
                default:
                    // ellipse is default
                    layers[selectedIndex].layerCanvas.ellipse(mouseX, mouseY, width_slider.value(), height_slider.value());
                    break;
            }
        }
        // save current state of the canvas
        layers[selectedIndex].layerCanvas.loadPixels();
    }

    this.setDrawingSettings = function () {
        // set current drawing settings
        layers[selectedIndex].layerCanvas.fill(currentColor);
        layers[selectedIndex].layerCanvas.noStroke();
    };

    this.drawSquareStamp = function () {
        // getting a new x and y that allow drawing the square with mouse in the middle
        // therefore, get the max value of width and height slider and set
        // x_pos and y_pos relative to that
        var draw_size = max([width_slider.value(), height_slider.value()])
        x_pos = mouseX - (draw_size);
        y_pos = mouseY - (draw_size);
        // draw square so mouse is in the middle
        layers[selectedIndex].layerCanvas.rect(x_pos, y_pos, draw_size*2, draw_size*2);
    };

    this.drawCircleStamp = function () {
        // with the ellipse function, mouseX and mouseY are already in the middle
        layers[selectedIndex].layerCanvas.ellipse(mouseX, mouseY, width_slider.value(), height_slider.value());
    };

    this.drawRectStamp = function () {
        // to also draw the rect with mouse in middle adjust x and y according to sliders
        layers[selectedIndex].layerCanvas.rect(
            mouseX-width_slider.value(), mouseY-height_slider.value(), 
            width_slider.value()*2, height_slider.value()*2
            );
    };

    this.drawTriangleStamp = function () {
        // set different coordinates according to slider width and height
        // the mouse position gets treated as the middle of the triangle
        // to give a proper stamp feeling
        layers[selectedIndex].layerCanvas.triangle(
            mouseX - width_slider.value(), 
            mouseY + height_slider.value(),
            mouseX + width_slider.value(), 
            mouseY + height_slider.value(),
            mouseX,
            mouseY - height_slider.value()
            );
    };

    // triggered when user selects another tool 
    this.unselectTool = function () {
        // show default slider in top right
        document.getElementById("sliderWrapper").style.display =  "block";
        //clear options
        select(".options").html("");
    };

    //adds a button and click handler to the options area. When clicked
    //toggle the line of symmetry between horizonatl to vertical
    this.populateOptions = function () {
        // hide slider in the top right, because now two new sliders in the options are displayed
        document.getElementById("sliderWrapper").style.display =  "none";
        // create shapeoptions and shapesizes divs
        select(".options").html('<div class="row"><div class="col shapeoptions"></div><div class="col shapesizes"></div></div>');

        this.createDropDownStampShapes();
        this.createWidthSlider();
        this.createHeightSlider();
    };

    // creates a drop down list with all possible stamp shapes
    this.createDropDownStampShapes = function () {
        // create drop down menu for different shapes and put it into shapeoptions div
        selector = createSelect();
        selector.id("ShapeSelectorStamp");
        selector.class("border rounded");
        for (var i = 0; i < shapes.length; i++) {
            selector.option(shapes[i]);
        }
        select(".shapeoptions").child(selector);
    };

    // creates a width slider and puts it in the options part of the html
    this.createWidthSlider = function () {
        // create a div for the width slider and label
        width_slider_wrapper = createDiv("Width");
        width_slider_wrapper.id("widthContainer");
        width_slider_wrapper.style("text-align", "right");
        // create a slider with label (in a html div tag) for adjusting the width of the drawn shape
        width_slider = createSlider(0,255);
        width_slider.id("width_slider_stamp");
        width_slider.style("width", "80px");
        width_slider.style("margin-left", "10px");
        select("#widthContainer").child(width_slider);
        select(".shapesizes").child(width_slider_wrapper)
    };

    // creates a height slider and puts it in the options part of the html
    this.createHeightSlider = function () {
        // create a div for the height slider and label
        height_slider_wrapper = createDiv("Height");
        height_slider_wrapper.id("heightContainer");
        height_slider_wrapper.style("text-align", "right");
        // create a slider with label (in a html div tag) for adjusting the height of the drawn shape
        height_slider = createSlider(0,255);
        height_slider.id("height_slider_stamp");
        height_slider.style("width", "80px");
        height_slider.style("margin-left", "10px");
        select("#heightContainer").child(height_slider);
        select(".shapesizes").child(height_slider_wrapper)
    };
}