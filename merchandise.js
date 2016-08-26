'use strict';

var orderObjectArray = [];

var Catalog = {
  cookie6: 8,
  cookie12: 15,
  cookie24: 28,
  cookie36: 38,
  cutter: 19,
  shirt: 25
};

var Order = function(name, address, city, state, zip, order) {
  this.name = name;
  this.address = address;
  this.city = city;
  this.state = state;
  this.zip = zip;
  this.order = order;
  this.orderCost = Catalog[order];
  orderObjectArray.push(this);
  this.infoArray = [address,city,state,zip,order,orderCost];
};

Order.prototype.render = function() {
  var trOne        = document.createElement('tr');
  var headerLocOne = document.createElement('th');

  headerLocOne.textContent = this.name;
  trOne.appendChild(headerLocOne);

  for (var i = 0; i < this.infoArray.length; i++) {
    var tdOne = document.createElement('td');
    tdOne.textContent = this.infoArray[i];
    trOne.appendChild(tdOne);
  };
  return trOne;
};

function checkNumber(value) {
  var elMsg = document.getElementById('feedback');
  if (isNaN(value)) {
    elMsg.innerHTML = 'Please validate the numbers that were inputed. Make sure you use just Arabic numerals.';
    throw new Error('One input was not a number.');
  };
};

function populateTable(nodeArray, objectArray) {
  for (var i = 0; i < objectArray.length; i++) {
    var render = objectArray[i].render();
    for (var k = 0; k < nodeArray.length; k++) {
      nodeArray[k].appendChild(render[k]);
    };
  };
};

/*
//Adapt this function for this problem
function createTable(htmlTag, totalFlag) {
  var mainData      = document.getElementById(htmlTag);
  var salesTable    = document.createElement('table');
  var salesHead     = document.createElement('thead');
  var tableRow      = document.createElement('tr');
  var tableHead     = document.createElement('th');
  var tableBody     = document.createElement('tbody');
  var headers       = generateTimeArray();
  var headersLength = headers.length - 1 + totalFlag;

  tableRow.appendChild(tableHead);
  tableHead.setAttribute('class', 'tableheader');

  for (var i = 0; i < headersLength; i++) {
    var th = document.createElement('th');
    th.textContent = headers[i];
    th.setAttribute('class', 'tableheader');
    tableRow.appendChild(th);
  }

  salesHead.appendChild(tableRow);
  salesTable.appendChild(salesHead);
  salesTable.appendChild(tableBody);
  mainData.appendChild(salesTable);

  return tableBody;
};*/

function updateOrderTable (event) {
  event.preventDefault();
  var elMsg       = document.getElementById('feedback');
  elMsg.innerHTML = '';

  var name        = event.target.name.value.trim();
  var address     = event.target.address.value.trim();
  var city        = event.target.city.value.trim();
  var state       = event.target.state.value.trim();
  var zipcode     = Number(event.target.zipcode.value);
  var order       = event.target.merchandise.value;
  var newOrder    = new Order(name, address, city, state, zipcode, order);
  checkNumber(zipcode);
  //Need to pass it an array with the table object we want to append to
  populateTable([],[newOrder]);



  event.target.name.value = null;
  event.target.address.value = null;
  event.target.city.value = null;
  event.target.state.value = null;
  event.target.zipcode.value = null;
};

//main
var tableForm = document.getElementById('order_form');
tableForm.addEventListener('submit', updateOrderTable, false);
