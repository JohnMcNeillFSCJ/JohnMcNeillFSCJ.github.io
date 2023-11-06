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
  var keywords_aside = document.createElement("aside"); 

  //set aside element's ID to "keywords"
  keywords_aside.setAttribute("id", "keywords"); 

  //create an h1 child element
  var h1_keyword_list = document.createElement("h1"); 

  //append h1 keyword list to be a child element of the aside element
  h1_keyword_list.appendChild(keywords_aside); 

  //create text node
  var text_keyword_list = document.createTextNode("Keyword List"); 

  
  h1_keyword_list.

  //create an ol element
  var keywords_aside_ol = document.createElement("ol"); 

  //append it to the keywords aside element
  keywords_aside_ol.appendChild(keywords_aside); 
  
}


/* Supplied Functions */

function replaceWS(textStr) {
   var revText = textStr.replace(/\s+/g,"_");
   return revText;
}
