"use strict";

/*
* Author: John McNeill
* Date: 12/10/23
*/



window.addEventListener("load", setupCart);

//initialized variables
var subtotal = 0.0; 
var tax = 0.0;
var total = 0.0; 

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

    //console.log(foodItem.getElementsByClassName("price")[0].innerText);

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
        if (cartBox.children[i].id == foodID)
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


    //console.log("Here");
    var food_price = parseFloat(foodItem.getElementsByClassName("price")[0].innerText); 
    //console.log(food_price);
    //console.log(typeof(food_price));

    subtotal += food_price; 

    var subtotal_input = document.getElementById("subtotal");

    subtotal_input.setAttribute("value", "$" + subtotal.toFixed(2));

    tax = subtotal * .075; 

    var tax_input = document.getElementById("tax"); 

    tax_input.setAttribute("value", "$" + tax.toFixed(2)); 

    total = subtotal + tax; 

    var total_input = document.getElementById("total"); 

    total_input.setAttribute("value", "$" + total.toFixed(2)); 
}