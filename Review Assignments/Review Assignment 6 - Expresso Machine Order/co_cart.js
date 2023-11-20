"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Review Assigment

   Shopping Cart Form Script
   
   Author: John McNeill
   Date:   11/13/23
   
   Filename: co_cart.js
   
   Function List
   =============
   
   calcCart()
      Calculates the cost of the customer order
      
   formatNumber(val, decimals)
      Format a numeric value, val, using the local
      numeric format to the number of decimal
      places specified by decimals
      
   formatUSACurrency(val)
      Formats val as U.S.A. currency
   
*/ 

//add an event listener that
//a.) runs CalcCart()
window.addEventListener("load", function() 
{

  //add an event handler to the modelQty field in the cart form that runs
  //the calcCart() function when the field value is changed. 
  document.getElementById("cart").elements.modelQty.onchange = calcCart; 

  //add a for loop that loops through every option in the 
  //group of shipping option buttosn, adding an event handler to run
  //the calcCart() function when each option button is clicked.
  var shippingOptions = document.querySelectorAll('input[name="shipping"]');

  for (var i = 0; i < shippingOptions.length; i++)
  {
    shippingOptions[i].onclick = calcCart; 
  }

});

//this function will calculate the cost of the customer's order
//using field values in the cart form. 
function calcCart() 
{
  //variable equal to the cost of the expresso machine stored in the modelCost
  //field multiplied by the quantity of machines ordered as stored in the 
  //modelQty field. 
  var orderCost = document.getElementById("cart").elements.modelCost.value 
    * document.getElementById("cart").elements.modelQty.value; 

  //display the value of orderCost in the orderCost field, formatted as US currency
  document.getElementById("cart").elements.orderCost.value 
    = formatUSCurrency(orderCost).toString(); 

  //variable equal to the value of the selected shipping option from the group of 
  //shipping option buttons multiplied by the quantity of machines ordered. 
  var shipCost 
    = document.querySelector('input[name="shipping"]:checked').value 
      * document.getElementById("cart").elements.modelQty.value;

  //console.log(formatNumber(shipCost, 2).toLocaleString());

  //display the value of shipCost variable in the shippingCost field, formatted with
  //a thousands separtor and to two decimal places
  document.getElementById("cart").elements.shippingCost.value 
    = formatNumber(shipCost, 2).toLocaleString(); 

  //in the subtotal field, display the sum of orderCost and shipCost formatted with
  //a thousands separtor and to two decimal places
  document.getElementById("cart").elements.subTotal.value 
    = formatNumber((orderCost + shipCost), 2).toLocaleString();

  //variable equal to 0.05 times the sum of the orderCost and shipCost variables
  var salesTax = Math.round((0.05 * (orderCost + shipCost)) * 100) / 100; 

  //display the value of salesTax in the salesTax field, formatted with a thousands
  //separator and to two decimal places
  document.getElementById("cart").elements.salesTax.value 
    = formatNumber(salesTax, 2).toLocaleString(); 

  //in the cart total field, display the sum of the orderCost, shipCost, and salesTax variables,
  //formated as US currency
  document.getElementById("cart").elements.cartTotal.value 
    = formatUSCurrency(orderCost + shipCost + salesTax).toString(); 

  //store the label text of the shipping option selected by the user from the shipping field in the hidden
  //shippingType field
  document.getElementById("cart").elements.shippingType.value 
    = document.querySelector('input[name="shipping"]:checked').nextSibling.nodeValue;

  //console.log(document.getElementById("cart").elements.shippingType.text);
  //console.log(document.querySelector('input[name="shipping"]:checked').nextSibling.nodeValue);
}








function formatNumber(val, decimals) {
   return val.toLocaleString(undefined, {minimumFractionDigits: decimals, 
                                         maximumFractionDigits: decimals});
}

function formatUSCurrency(val) {
   return val.toLocaleString('en-US', {style: "currency", currency: "USD"} );
}
