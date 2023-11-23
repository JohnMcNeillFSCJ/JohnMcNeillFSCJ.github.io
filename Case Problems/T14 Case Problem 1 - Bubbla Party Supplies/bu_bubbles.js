"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 14
   Case Problem 1

   Author: John McNeill
   Date:   11/21/23
   
   Filename: bu_bubbles.js

*/

//object literal for the box object 
var box = {

  width: 1024, 
  height: 500
};

//bubble object constructor
function bubble(size, img) 
{

  this.radius = size; 
  this.imageURL = img; 

  //horizontal velocity of the bubble
  this.xVelocity = null; 

  //vertical velocity of the bubble
  this.yVelocity = null; 

  //horizontal position of the bubble
  this.xPos = null;

  //vertical position of the bubble
  this.yPos = null; 

  //bubble's opacity
  this.opacity = 1; 

  //bubble's hue value
  this.hue = 0; 

  //bubble's spin speed
  this.rotate = 0; 

  //bubble's spin direction
  this.rotateDirection = 1; 

}

//this method will cause the bubble to fade by reducin its opacity. 
bubble.prototype.fadeBubble = function()
{
  //decrease the value of the bubble's opacity
  this.opacity -= 0.0005; 
  return this.opacity; 
}

//this method will change the hue of the bubble
bubble.prototype.changeColor = function()
{
  //increase teh value of the bubble's hue 
  this.hue += 3; 
  //calculate the remainder
  this.hue = this.hue % 360; 
  return this.hue; 
}

//this method will rotate the bubble
bubble.prototype.rotateBubble = function()
{
  //increase the value of the rotate property
  this.rotate += this.rotateDirection;
  //calculate the remainder 
  this.rotate = this.rotate % 360; 
  return this.rotate; 
}

//this method will move the bubble across the bubble box,
//bouncing the bubble off the box's wall if necessary
bubble.prototype.moveBubble = function(height, width)
{
  var bubbleTop = this.yPos; 
  var bubbleBottom = this.yPos + this.radius; 
  var bubbleLeft = this.xPos; 
  var bubbleRight = this.xPos + this.radius; 

  //bubble hits the top or bottom wall
  if(bubbleTop < 0 || bubbleBottom > height)
  {
    //change the direction of the vertical velocity
    this.yVelocity = -this.yVelocity; 
  }

  //bubble has hit the left or right wall
  if(bubbleLeft < 0 || bubbleRight > width)
  {
    //change the direction of the hroizontal velocity
    this.xVelocity = -this.xVelocity; 
  }

  //move the bubble to its new location 
  this.yPos += this.yVelocity;
  this.xPos += this.xVelocity; 
}

window.addEventListener("load", function() {
   // Reference to the bubble box
   var bubbleBox = document.getElementById("bubbleBox");
   
   // Create a new bubble every half-second
   setInterval(function() {
      
      // Do not create more than 20 bubbles at any one time
      if (bubbleBox.childElementCount <= 20) 
      {
         
         //creater a new bubble
          var newBubble = new bubble(randInt(50, 120), 
            "bu_bubble" + randInt(1, 10) + ".png");

          //place new bubble in center of box 
          newBubble.xPos = (box.width) / 2;
          newBubble.yPos = (box.height) / 2; 

          newBubble.xVelocity = randInt(-5, 5); 
          newBubble.yVelocity = randInt(-5, 5); 

          newBubble.rotate = randInt(0, 360); 
          newBubble.hue = randInt(0, 360); 

          newBubble.rotateDirection = randInt(-2, 2);

          //create an inline image displaying the bubble image within
          //the bubble box
          var bubbleImg = document.createElement("img"); 
          bubbleImg.style.position = "absolute";
          bubbleImg.src = newBubble.imageURL; 
          bubbleImg.style.width = newBubble.radius + "px"; 
          bubbleImg.style.left = newBubble.xPos + "px";
          bubbleImg.style.top = newBubble.yPos + "px";
          bubbleBox.appendChild(bubbleImg);

          //console.log(bubbleImg.style.position); 

          //repeats an anon function every 25 milliseconds
          //storing the ID of the setInterval method
          var bubbleInterval = setInterval(function() {

            //decrease the bubble's opacity
            newBubble.fadeBubble();

            //if the opacity is less than 0
            if(newBubble.opacity < 0)
            {
              //remove bubble 

              //remove bubble img from bubble box
              bubbleBox.removeChild(bubbleImg); 

              //apply clearInterval() method to stop the animation effects
              //for the bubble. 
              clearInterval(bubbleInterval); 
            }
            else
            {
              //otherwise, animate the bubble 
              bubbleImg.style.opacity = newBubble.opacity; 
              newBubble.changeColor();
              bubbleImg.style.filter = "hue-rotate(" + newBubble.hue + "deg)"; 
              newBubble.rotateBubble();
              bubbleImg.style.transform = "rotate(" + newBubble.rotate + "deg)";

              //move the bubble 
              newBubble.moveBubble(box.height, box.width); 
              bubbleImg.style.top = newBubble.yPos;
              bubbleImg.style.left = newBubble.xPos; 

              
            }
            
          }, 25); 

      }

      
   }, 500);

   /* Function to return a random integer between minVal and maxValue inclusive */
   function randInt(minVal, maxVal) {
      var size = maxVal - minVal + 1;
      return Math.floor(minVal + size*Math.random());
   }  

});
