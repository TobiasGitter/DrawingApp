// Student: Tobias Vicenti
// Semester project: Drawing App
// Student Number: 210204278

var toolbox = null;
var colourP = null;
var helpers = null;
var currentColor = null;
// slider for adjusting drawing sizes of all tools except stamp
var slider;

// buttons for the editable shape tool
var editButton;
var finishButton;
// current shape and edit mode for tracking of editable tool
var currentShape = [];
var editMode = false;
// if user edits shape, keep track of index, that gets dragged
var vertexGetsDragged = -1;
var useCurveVertex;

// layer variables
var layers = [];
var layerCount = 0;

// formatting of layer html elements
var layerClass = "layer border rounded";
var layerClassSelected = "layer border rounded border-primary";

// dragging tool
var dragMode = false;
var selectedDragArea;

// variables for scissors tool
var selectMode;
var selectedArea;
var selectedPixels;
var selectedIndex = -1;

// fonts object for textBox tool
var fonts;

// use preload function to load all additional fonts
function preload() {
	fonts = {
		"Cookie": loadFont("assets/fonts/Cookie.ttf"),
		"Fredoka": loadFont("assets/fonts/Fredoka.ttf"),
		"GloriaHallelujah": loadFont("assets/fonts/GloriaHallelujah.ttf"),
		"SourceCodePro": loadFont("assets/fonts/SourceCodePro.ttf")
	}
}

function setup() {
	//create a canvas to fill the content div from index.html
	canvasContainer = select('#content');
	canvas = createCanvas(canvasContainer.width, canvasContainer.height);
	canvas.parent("content");

	//create helper functions and the colour palette
	helpers = new HelperFunctions();

	// create Slider in top row for adjusting the drawing sizes
	slider = createSlider(1, 200).parent("slider");
	slider.id("sizeSlider");
	select("#sizeSlider").style('max-width', '100%')

	// create the ColorPallete
	colourP = new ColourPalette();
	currentColor = color(0);

	//create a toolbox for storing the tools
	toolbox = new Toolbox();

	//add the tools to the toolbox, function in helperFunctions
	createTools();

	// set width and height of layers
	scale_layers();
	
	// add and select the first layer
	addLayer();
	selectLayer(1);

	// initialize variables for scissors tool
	selectMode = 0;
	selectedArea = { x: 0, y: 0, width: 0, height: 0 };
	selectedDragArea = { x: 0, y: 0, width: 0, height: 0 };

	// set background of the default canvas to white
	background(255);
}

function draw() {
	// check if a layer is selected and select Area button is in default
	if (selectMode == 0 && selectedIndex != -1) {
		if (toolbox.selectedTool.hasOwnProperty("draw")) {
			toolbox.selectedTool.draw();
		} else {
			alert("it doesn't look like your tool has a draw method!");
		}
	}
	// if a layer is selected and user currently wants to select an area
	else if (selectMode == 1 && selectedIndex != -1) {
		enableCuttingMode(); // in helpful functions
	}
	// if layer is selected, display selected layer, if not, display all
	displayLayers();
}