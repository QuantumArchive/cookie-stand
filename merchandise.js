'use strict';

function checkNumber(value) {
  var elMsg = document.getElementById('feedback');
  if (isNaN(value)) {
    elMsg.innerHTML = 'Please validate the numbers that were inputed. Make sure you use just Arabic numerals.';
    throw new Error('One input was not a number.');
  };
  if (value < 0) {
    elMsg.innerHTML = 'One of your entries is negative, please double check your entries.';
    throw new Error('One input was negative.');
  }
};

function setVariables(event) {
  event.preventDefault();
  var name        = event.target.name.value.trim();
  var address     = event.target.address.value.trim();
  var city        = event.target.city.value.trim();
  var state       = event.target.state.value.trim();
  var zipcode     = Number(event.target.zipcode.value);
  var order       = event.target.merchandise.value;
  checkNumber(zipcode);
  var orderArray = [name, address, city, state, zipcode, order];

  localStorage.setItem('orderKey', orderArray);

  event.target.name.value = null;
  event.target.address.value = null;
  event.target.city.value = null;
  event.target.state.value = null;
  event.target.zipcode.value = null;
};

//main
var orderForm = document.getElementById('order_form');
orderForm.addEventListener('submit', setVariables, false);
