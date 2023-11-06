"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 12
   Review Assignment

   Author: John McNeill
   Date:   10/30/2023

   Filename: bc_keys.js

   Functions
   =========
   
   findKeyWords()
      Locate the keywords in the article indicated by the <dfn> tag
      and add those keywords in alphabetical order to a keyword box.
      
   makeKeyStyles()
      Create an embedded style sheet for the keyword box.

      
   replaceWS(textStr)
      Replaces occurences of one or more consecutive white space
      characters with the _ character.

*/

//event listeners that run the following functions when the page loads
window.addEventListener("load", findKeyWords);
window.addEventListener("load", makeKeyStyles);

function findKeyWords()
{
  //create an aside element
  var aside_element = document.createElement("aside"); 

  //set aside element's ID to "keywords"
  aside_element.setAttribute("id", "keywords"); 

   document.body.appendChild(aside_element);

  //create an h1 child element
  var heading_one_elem = document.createElement("h1");

  //create text node
  var heading_one_text = document.createTextNode("Keyword List"); 

  //append text node to h1 keyword list
  heading_one_elem.appendChild(heading_one_text); 

  //append h1 keyword list to be a child element of the aside element
  document.getElementById("keywords").appendChild(heading_one_elem);

  //create ol element
  var ol_element = document.createElement("ol");
  
  //append ol element to the aside element
  aside_element.appendChild(ol_element);
  
  //create an object collection named
  //keyWordElems referencing all dfn elements
  //within the doc article
  var keyWordElems = document.querySelectorAll("article#doc dfn");

  //create an array named keyWords
  //with a length equal to the length of 
  //the keyWordElems collection
  var keyWords = [keyWordElems.length];

  //add a for loop that loops through all 
  //of the items in the keyWordElems object    
  //collection
  for (var i = 0; i < keyWordElems.length; i++ )
  {
    //set the value of each item in 
    //keyWords array to the text of the 
    //corresponding item in the keyWordElems
    //object collection
    keyWords[i] = keyWordElems[i].textContent;

    //console.log("keyWords[" + i + "] = " + keyWords[i]); 

    //set the id of the current item in the 
    //keyWords array (no blank spaces)
    var linkID = replaceWS(keyWords[i]);

    //set the id of current item in the 
    //keyWordElems object collection to 
    //keyword_linkID
    keyWordElems[i].id = "keyword_" + linkID; 

    //console.log("keyWordElems[" + i + "] = " + keyWordElems[i].id); 
  }

  //sort the keyWords in alphabetical order
  keyWords.sort();

  //generate the list items in the keyword list

  //add a for loop that loops through each item in the
  //keyWords array
  for(var i = 0; i < keyWords.length; i++)
  {

    //store a list item element 
    var keyWordListItem = document.createElement("li");

    //store a link element
    var keyWordLink = document.createElement("a"); 

    //change the innerHTML of keyWordLink to the value of the
    //text of the current keyword
    keyWordLink.innerHTML = keyWords[i].toString(); 

    //declare the linkID variable containing the value returned 
    //by the replaceWS() function usign the current keyword as the
    //parameter value
    var linkID = replaceWS(keyWords[i].toString()); 

    //change the href attribute of keyWordLink to #keyword_linkID
    //where linkID is the value of the linkID variable. 
    keyWordLink.setAttribute("href", "#keyword_" + linkID.toString()); 

    //append keyWordLink to keyWOrdList
    keyWordListItem.appendChild(keyWordLink); 

    //append keyWordList to the ordered list created above
    ol_element.appendChild(keyWordListItem);

  }

  //insert the keywords list box defined above as the first child
  //of the article element with the id "doc"
  document.getElementById("doc").insertBefore(aside_element, document.getElementById("doc").firstChild);


}

function makeKeyStyles()
{
  //create a link element for the page view stylesheet
  var pageStyle = document.createElement("link"); 
  pageStyle.setAttribute("href", "bc_styles.css");
  pageStyle.setAtrribute("rel", "stylesheet"); 

  //append it to the document head
  document.head.appendChild(pageStyle);
}


/* Supplied Functions */

function replaceWS(textStr) {
   var revText = textStr.replace(/\s+/g,"_");
   return revText;
}
