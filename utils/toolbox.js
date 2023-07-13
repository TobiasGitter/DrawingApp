//container object for storing the tools. Functions to add new tools and select a tool
function Toolbox() {
	var self = this;
	// array that contains all available tools
	this.tools = [];
	// no tool selected initially 
	this.selectedTool = null;

	// add functionality so user can select a tool by clicking on the html image 
	var toolbarItemClick = function () {
		// select tool that the user clicked on
		var toolName = this.id().split("sideBarItem")[0];
		self.selectTool(toolName);

		// if a layer is selected, save current state of the canvas
		if (selectedIndex != -1){
			layers[selectedIndex].layerCanvas.loadPixels();
		}
	}

	//add a new tool icon to the html page
	var addToolIcon = function (icon, name) {
		// create wrapper for the tool img
		var toolWrapper = createDiv();
		// set class with grey rounded border a little bigger than the img
		toolWrapper.class('p-1 sideBarItem img-fluid border rounded text-center');
		// set the id to select tool later
		toolWrapper.id(name + "sideBarItem");
		// set max width of the wrapper
		toolWrapper.style('max-width', '55px')
		// create the img element for the tool
		var toolImg = createImg(icon, name);
		// set the id to tool name
		toolImg.id(name);
		// set the max-width a little smaller than the wrapper
		toolImg.style('max-width', '40px');
		// put the wrapper in the sidebar element
		toolWrapper.parent('sidebar');
		// put the img in the wrapper
		select('#' + name + "sideBarItem").child(toolImg);
		// add select by clicking functionality
		toolWrapper.mouseClicked(toolbarItemClick);
	};

	//add a tool to the tools array
	this.addTool = function (tool) {
		//check that the object tool has an icon and a name
		if (!tool.hasOwnProperty("icon") || !tool.hasOwnProperty("name")) {
			alert("make sure your tool has both a name and an icon");
		}
		// add to tools array
		this.tools.push(tool);
		// add tool to html
		addToolIcon(tool.icon, tool.name);
		//if no tool is selected (ie. none have been added so far)
		//make this tool the selected one.
		if (this.selectedTool == null) {
			this.selectTool(tool.name);
		}
	};

	this.selectTool = function (toolName) {
		//search through the tools for one that's name matches
		//toolName
		if (this.selectedTool) {
			select("#" + this.selectedTool.name + 'sideBarItem').class('p-1 sideBarItem img-fluid border rounded text-center');
		}
		for (var i = 0; i < this.tools.length; i++) {
			if (this.tools[i].name == toolName) {
				//if the tool has an unselectTool method run it.
				if (this.selectedTool != null && this.selectedTool.hasOwnProperty(
					"unselectTool")) {
					this.selectedTool.unselectTool();
				}
				//select the tool and highlight it on the toolbar
				this.selectedTool = this.tools[i];
				select("#" + toolName + "sideBarItem").class("p-1 sideBarItem img-fluid border border-primary rounded text-center");

				//if the tool has an options area. Populate it now.
				if (this.selectedTool.hasOwnProperty("populateOptions")) {
					this.selectedTool.populateOptions();
				}
			}
		}

		// additional edits for to ensure layer functionalities
		if(this.selectedTool.name == "editableShape"){
			// if user selects editable shape tool finish the shape if there was a current shape
			finishShape();
		}
		// attention to the user that the eraser tool doesn't really erase but draws white
		if(this.selectedTool.name == "eraserTool"){
			alert("The eraser will use white as the erasing color. Before erasing it check if there is something in the layer beneath.")
		}
	};


}