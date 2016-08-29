'use strict';

var orderObjectArray = [];

var Catalog = {
  cookie6: 8,
  cookie12: 15,
  cookie24: 28,
  cookie36: 38,
  cutter: 19,
  shirt: 25,
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
  return [trOne];
};

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

function populateTable(nodeArray, objectArray) {
  for (var i = 0; i < objectArray.length; i++) {
    var render = objectArray[i].render();
    for (var k = 0; k < nodeArray.length; k++) {
      nodeArray[k].appendChild(render[k]);
    };
  };
};

function createTable(htmlTag, totalFlag) {
  //create the headers for a table and return the table body node
  var mainData      = document.getElementById(htmlTag);
  var orderTable    = document.createElement('table');
  var orderHead     = document.createElement('thead');
  var tableRow      = document.createElement('tr');
  var tableBody     = document.createElement('tbody');
  var headers       = ['Name', 'Address', 'City', 'State', 'Zip Code', 'Order', 'Cost'];
  var headersLength = headers.length - 1 + totalFlag;

  for (var i = 0; i < headersLength; i++) {
    var th = document.createElement('th');
    th.textContent = headers[i];
    th.setAttribute('class', 'tableheader');
    tableRow.appendChild(th);
  }

  orderHead.appendChild(tableRow);
  orderTable.appendChild(orderHead);
  orderTable.appendChild(tableBody);
  mainData.appendChild(orderTable);

  return tableBody;
};

function updateOrderTable (event) {
  var key = event.key;
  var newValue = event.newValue;

  console.log(key);
  console.log(newValue);

  /*
  var keys        = ['name','address','city','state','zipcode','order'];
  var name        = localStorage.getItem(keys[0]);
  var address     = localStorage.getItem(keys[1]);
  var city        = localStorage.getItem(keys[2]);
  var state       = localStorage.getItem(keys[3]);
  var zipcode     = localStorage.getItem(keys[4]);
  var order       = localStorage.getItem(keys[5]);*/
  var newOrder    = new Order(name, address, city, state, zipcode, order);
  checkNumber(zipcode);
  //Need to pass it an array with the table object we want to append to
  populateTable([tableBodyNode],[newOrder]);
};

//main
var tableBodyNode = createTable('orders', 1);
window.addEventListener('storage', updateOrderTable, false);
