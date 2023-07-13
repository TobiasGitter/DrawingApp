Student: Tobias Vicenti
Semester project: Drawing App
Student Number: 210204278

Reporting Texts

- What is the function of the extension?
- How does the code fit into the templates design?
- How have you structured the extension's code?

Regarding the layer of the drawing app, I used bootstrap to structure the whole drawing app into rows and columns. I put buttons and tools in the first two rows at the top. The third row consists of the canvas on the left and the layers on the right. Colors and optional functionalities, that are displayed depending on the selected tool, are at the bottom below the canvas and layers.

For the structure of the code, I have four directories: an asset folder, a folder with the p5 libraries, a directory with all the tools of the toolbox. Most tools have a populateOptions- and an unselectTool-function that display and hide additional functionalities in the app that are specific to the selected tool. The fourth and last folder contains all important alone-standing code files like for example the color Palette, layer functionalities and the toolbox.

I created a whole layer system that allows the user to draw in different levels making the drawings way more flexible than just one layer. While in the course we mostly just used the createCanvas object to draw, p5 has the possibility to create multiple canvasses with the createGraphics object. In the file layerUtils.js I added layer functionalities like clearing and displaying different layers, but also deleting and adding new layers. Every additionally created layer has a transparent background making the white background from the default canvas shine through.

I also added different shapes to the stamp tool, added an eraser tool and a dragShape tool that allows the user drawing shapes by dragging the mouse. Unfortunately, the eraser tool isn’t really an eraser because it just paints white over existing drawings. Even the erase function from p5.js just prints white, which is unsatisfying because with the layer system users also paint over everything in the layers below. Users can solve this problem by changing the order of the layers with the shift layer buttons (with arrows) or the OPTION key combined with the arrow keys. I also adjusted things in existing tools so that for example the sprayCan tool sprays in a circle and not a square. And changed the editing of the editable shape tool. With the text box tool, the user can type things into the input box and draw them on the canvas like a stamp. I also used the tools given in the course material and put them into the layer system.

- How well did you stick to your schedule?
- Did you divide up the task and the time effectively?
- Did you have an unexpected difficulties or challenges?

All in all, my I stuck to my schedule. Some things took longer to implement than others so on average I was on time. The problem with solving bugs was that sometimes I would focus on one for a few hours without getting anything else done. After these hours I would get a little frustrated and distracted myself with something completely different. When coming back to the problem a few hours later or even the next day, the solution seemed to be right in front of my eyes. Unfortunately, that didn’t work with every bug so when I didn’t find the solution after a few hours or the next day I would focus on the next functionality I wanted to implement and came back to the “older” problem after solving the other one.

Even though my original plan sometimes differed from the actual development process the original plan I presented was useful to know what task to focus on next, which allowed me to switch between different tasks and get reminded what things I still need to implement. I struggled a long time to display the different canvasses of the layers correctly on different screens with different screen sizes. Other implementations like the drag tool or curved vertices I could implement in a rather straightforward way. One problem was after fixing or implementing one thing, another thing didn’t work properly so I needed to adjust that again. It was always a back and forth until everything worked correctly as a whole.

- What errors did you uncover?
- How did users respond to the application?
- How would you rectify these in a future version of the application?

I included an information section available through a button on the top right that gives a rough introduction to the different functionalities available in the app. I tried to make the app in a way so that everybody can use it as intuitively as possible. Firstly, I tried to use the app in every possible way I could think of and then give the app to my roommate and my sisters to try it out. I watched them try out the app and took notes on what I want to implement differently. When I was using the app from the original template, I didn’t really like the layout, so I changed it. I got inspired by the layout of photoshop and implemented a similar one in my app with bootstrap.

In my opinion, the final product is effective. It lets users create nice drawings very easily without a long learning process. With apps like photoshop users have lots more possibilities but it is also a long learning process just to use the app.

I started user testing late in the development process so people who are new to the app have a lot of things to try out. Before letting other users test the app, I tried to keep a beginner’s mindset when using my app. Doing things in different orders using different tools in different ways to cover a big part of the possibilities. There were some problems with selecting and deselecting tools and switching between layers.

- External sources:

For the circular spraying of the spray can tool I used the following code:
circle implementation from https://editor.p5js.org/zapra/sketches/rjIJR18fT
original idea: https://programming.guide/random-point-within-circle.html

Code for including an HTML object with the fetch function
https://css-tricks.com/the-simplest-ways-to-handle-html-includes/
Chris Coyier on Apr 30, 2019 (Updated on Jan 26, 2021)

https://play.google.com/store/apps/details?id=mobi.infolife.eraser&hl=de&gl=US

Editable Shape Tool Image: (last status 27th March 2022)
https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vectorstock.com%2Froyalty-free-vector%2Fconnected-dots-vector-5953317&psig=AOvVaw3K2a3nkR4yDbUIcrBCAcdw&ust=1645784642979000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCLCO_eCPmPYCFQAAAAAdAAAAABAD
