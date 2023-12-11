"use strict"; 

/*
* Author: John McNeill
* Date: 12/10/23
*/


window.addEventListener("load", function ()
{
    //retrieve the field/value pairs from the URL
    var orderData = location.search;
    //console.log("location = " + orderData);
    //slice the orderData text string to remove the first '?' char,
    //replace every occurence of the '+' character with a blank space,
    //and decode the URI-encoded characters
    orderData = orderData.slice(orderData.indexOf('?'));
    orderData = orderData.replace(/\+/g, ' ');
    orderData = decodeURIComponent(orderData);

    //split the orderData variable at every occurence of a '&' or '=' character
    //and store the substrings in the orderFields array variable
    var orderFields = orderData.split(/[&=]/g);

    //console.log(orderFields[3]); 

    //assign data from orderFields into corresponding fields in the order form
    document.getElementById("subTotal").setAttribute("value", orderFields[1]);
    document.getElementById("salesTax").setAttribute("value", orderFields[3]);
    document.getElementById("cartTotal").setAttribute("value", orderFields[5]);

    //console.log(typeof document.getElementById("order").elements.salesTax.value)

});

//another eventListener for the window load event that runs different validation 
//event handlers when the page is loaded by the browser. 
window.addEventListener("load", function () 
{

    //run the runSubmit() function when the subButton is clicked. 
    document.getElementById("subButton").onclick = runSubmit;

    //run the validateName() function when a value is input into the cardHolder field
    document.getElementById("cardHolder").oninput = validateName;

    //run the validateNumber() function when a value is input into the cardNumber field
    document.getElementById("cardNumber").oninput = validateNumber;

    //run the validateDate() function when a value is input into the expDate field. 
    document.getElementById("expDate").oninput = validateDate;

    //run the validateCVC() function when a value is input into the cvc field. 
    document.getElementById("cvc").oninput = validateCVC;

});

//this function runs when the form is submitted
function runSubmit() 
{

    validateName();
    validateCredit();
    validateNumber();
    validateDate();
    validateCVC();

}

//the purpose of this function is to validate the credit card expiration date 
//stored in the expDate field
function validateDate() 
{
    var expDate = document.getElementById("expDate");

    //if no value has been entered for the expiration date
    if (expDate.validity.valueMissing)
    {
        //set the custom validation message 
        expDate.setCustomValidity("Enter the expiration date");
    }
    //if the expiration date does not match the regular expression pattern:
    else if (/^(0[1-9]|1[0-2])\/20[12]\d$/.test(expDate.value) === false)
    {
        //set the custom validation message
        expDate.setCustomValidity("Enter a valid expiration date");
    }
    else
    {
        //otherwise, set the custom validation message to an empty text string
        expDate.setCustomValidity("");
    }
}


/* Functions already provided in the file */

function validateName()
{
    var cardName = document.getElementById("cardHolder");
    if (cardName.validity.valueMissing)
    {
        cardName.setCustomValidity("Enter the card holder");
    } else
    {
        cardName.setCustomValidity("");
    }
}


function validateCredit()
{
    var creditCard = document.forms.credit.elements.company[0];
    if (creditCard.validity.valueMissing)
    {
        creditCard.setCustomValidity("Select your credit card");
    } else
    {
        creditCard.setCustomValidity("");
    }
}

function validateNumber()
{
    var cardNumber = document.getElementById("cardNumber");
    if (cardNumber.validity.valueMissing)
    {
        cardNumber.setCustomValidity("Enter your card number");
    } else if (cardNumber.validity.patternMismatch)
    {
        cardNumber.setCustomValidity("Enter a valid card number");
    } else if (luhn(cardNumber.value) === false)
    {
        cardNumber.setCustomValidity("Enter a legitimate card number");
    } else
    {
        cardNumber.setCustomValidity("");
    }
}

function validateCVC()
{

    var cardCVC = document.getElementById("cvc");
    var creditCard = document.querySelector('input[name="company"]:checked').value;

    if (cardCVC.validity.valueMissing)
    {
        cardCVC.setCustomValidity("Enter your code CVC number");
    } else if ((creditCard === "amex") && (/^\d{4}$/.test(cardCVC.value) === false))
    {
        cardCVC.setCustomValidity("Enter a 4-digit CVC number");
    } else if ((creditCard !== "amex") && (/^\d{3}$/.test(cardCVC.value) === false))
    {
        cardCVC.setCustomValidity("Enter a 3-digit CVC number");
    } else
    {
        cardCVC.setCustomValidity("");
    }


}

function sumDigits(numStr)
{
    var digitTotal = 0;
    for (var i = 0; i < numStr.length; i++)
    {
        digitTotal += parseInt(numStr.charAt(i));
    }
    return digitTotal;
}

function luhn(idNum)
{
    var string1 = "";
    var string2 = "";

    // Retrieve the odd-numbered digits
    for (var i = idNum.length - 1; i >= 0; i -= 2)
    {
        string1 += idNum.charAt(i);
    }
    // Retrieve the even-numbered digits and double them
    for (var i = idNum.length - 2; i >= 0; i -= 2)
    {
        string2 += 2 * idNum.charAt(i);
    }

    // Return whether the sum of the digits is divisible by 10
    return sumDigits(string1 + string2) % 10 === 0;
}