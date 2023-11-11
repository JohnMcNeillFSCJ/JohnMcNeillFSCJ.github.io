"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 12
   Case Problem 2

   Author: John McNeill 
   Date:   11/10/23

   Filename: sub_cart.js


   Functions List:
   setupCart() 
      Sets up the event handlers for the Add to Order buttons on the web page.
      
   addItem(e)
      Adds the food item associated with the Add to Order button to the shopping
      cart, keeping track of the number of items of each product ordered by 
      the customer.

*/

window.addEventListener("load", setupCart); 

function setupCart() 
{
  var addButtons = document.getElementsByClassName("addButton"); 

  for (var i = 0; i < addButtons.length; i++)
  {
    addButtons[i].onclick = addItem;
  }
}

function addItem(e) 
{
  //description of the food item is the next sibling element to the 
  //button that was clicked by the customer. 
  //Use the next Element Sibling property to reference the next sibling
  //element to the target of the event object. 
  //Store the sibling element in a variable
  var foodItem = e.target.nextElementSibling; 
  //console.log(foodItem);

  var foodID = foodItem.id; 

  //console.log(foodID);

  //use cloneNode() to create a copy of the foodItem element and all of 
  //its descendants. Store the clone node in a variable
  var foodDescription = foodItem.cloneNode(true); 
  //console.log(foodDescription.firstElementChild); 

  var cartBox = document.getElementById("cart"); 

  //console.log(cartBox.id);

  //The shopping cart needs to determine whether a product ordered by the customer
  //has already been ordered. To do this, add a span element to the top
  //of each item in the cart containing the number of items of each product ordered
  //and update that value when a product order is repeated. 

  var duplicateOrder = false; 
  
  //console.log(cartBox.childElementCount);

  for (var i = 0; i < cartBox.childElementCount; i++)
  {

    //console.log("Test");

    //determine whether the ID of the element node equals foodID.
    if(cartBox.children[i].id == foodID)
    {
    
      //console.log("Test");

      //if so, the customer has previously placed that menu item 
      //in the cart. 

      duplicateOrder = true; 

      //Increate the value of the first element child node by 1 to 
      //indicate an additional order and then break out of the for loop
      cartBox.children[i].firstChild.textContent++; 
      
      //console.log(cartBox.children[i].firstChild.textContent); 

      break;
    }
  }

  //test whether duplicateOrder is still false
  if (duplicateOrder === false)
  {
    //console.log("Here!");

    //if so, create a variable named orderCount storing a span element node
    var orderCount = document.createElement("span");

    //set the text content of the orderCount element to 1
    orderCount.textContent = 1; 

    //insert orderCount as the first child of the foodDescription node
    //structure 
    foodDescription.insertBefore(orderCount, foodDescription.firstChild);

    //append foodDescription to cartBox as a new productOrder
    cartBox.appendChild(foodDescription);

    //console.log(orderCount.textContent); 
  }
}

