"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Tutorial Case

   Order Form Script
   
   Author: 
   Date:   
   
   Filename: co_order.js
   
   Function List
   =============
   
   calcOrder()
      Calculates the cost of the customer order
      
   formatNumber(val, decimals)
      Format a numeric value, val, using the local
      numeric format to the number of decimal
      places specified by decimals
      
   formatUSACurrency(val)
      Formats val as U.S.A. currency
   
*/


window.addEventListener("load", function(){
   var cartForm = document.forms.cart;
   cartForm.elements.model.focus();

   //Calculate the cost of the order
   calcOrder();

   //Respond to any change events
   cartForm.elements.model.onchange = calcOrder;
   cartForm.elements.qty.onchange = calcOrder;

   var planOptions = document.querySelectorAll('input[name="protection"]');
   for (var i = 0; i < planOptions.length; i++) {
      planOptions[i].onclick = calcOrder;
   }
});

function calcOrder() {
   var cartForm = document.forms.cart;
   //Calculate Initial Cost of the Order

   var mIndex = cartForm.elements.model.selectedIndex;
   var mCost = cartForm.elements.model.options[mIndex].value;
   var qIndex = cartForm.elements.qty.selectedIndex;
   var quantity = cartForm.elements.qty[qIndex].value;


   var initialCost = parseFloat(mCost * quantity);
   cartForm.elements.initialCost.value = formatUSCurrency(initialCost);


   var pCost = parseFloat(document.querySelector("input[name='protection']:checked").value);
   cartForm.elements.protectionCost.value = formatNumber(pCost, 2);
   var sCost = parseFloat(document.querySelector("input[name='shipping']:checked").value);
   cartForm.elements.shipCost.value = formatNumber(sCost, 2);

   //Subtotal
   cartForm.elements.subtotal.value = formatNumber(initialCost + pCost + sCost, 2);

   //Sales Tax
   var salesTax = parseFloat(0.05 * (initialCost + pCost+sCost));
   cartForm.elements.salesTax.value = formatNumber(salesTax, 2);


   var totalCost = parseFloat(initialCost + pCost + sCost + salesTax);
   cartForm.elements.totalCost.value = formatUSCurrency(totalCost);

   cartForm.elements.protectionName.value = document.querySelector("input[name='protection']:checked").nextSibling.nodeValue;
   cartForm.elements.shipName.value = document.querySelector("input[name='shipping']:checked").nextSibling.nodeValue;
}

function formatNumber(val, decimals) {
   return val.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
   });
}

function formatUSCurrency (val) {
   return val.toLocaleString('en-US', {
      style: "currency", 
      currency: "USD"
   });
}
