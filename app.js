'use strict';

function generateTimeArray() {
  var timeArray = [];
  var startHour = 6;
  var hourToAfternoon = 12 - startHour;
  for (var i = 0; i < 14; i++) {
    if (i < hourToAfternoon) {
      timeArray[i] = (startHour + i) + ':00am';
    } else if ( i === hourToAfternoon) {
      timeArray[i] = (startHour + i) + ':00pm';
    } else {
      timeArray[i] = (i - hourToAfternoon) + ':00pm';
    }
  }
  var finalIndex = timeArray.length;
  timeArray[finalIndex] = 'Daily Location Total';
  return timeArray;
};

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
};

function populateTable(nodeArray, objectArray) {
  for (var i = 0; i < objectArray.length; i++) {
    var render = objectArray[i].render();
    for (var k = 0; k < nodeArray.length; k++) {
      nodeArray[k].appendChild(render[k]);
    };
  };
};

function calcFinal(node, objectListArray, totalFlag) {
  var tr          = document.createElement('tr');
  var theader     = document.createElement('th');
  var loopCounter = (generateTimeArray().length - 1 + totalFlag);
  theader.textContent = 'Totals';
  tr.appendChild(theader);
  theader.setAttribute('class', 'finalrow');
  for (var i = 0; i < loopCounter; i++) {
    var colTotal = 0;
    var td = document.createElement('td');
    td.setAttribute('class', 'finalrow');
    for (var k = 0; k < objectListArray.length; k++) {
      colTotal += objectListArray[k][i];
    }
    td.textContent = colTotal;
    tr.appendChild(td);
  }
  node.appendChild(tr);
  return tr;
};

function clearRow(nodeArray) {
  for (var i = 0; i < nodeArray.length; i++) {
    var elParentNode = nodeArray[i].parentNode;
    elParentNode.removeChild(nodeArray[i]);
  }
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

function validateMinMax(min, max){
  var elMsg = document.getElementById('feedback');
  if (min > max) {
    elMsg.innerHTML = 'Your min value is greater then your max value. Please input different values.';
    throw new Error('Min value was greater than max value.');
  };
}

function checkLocation(location) {
  var index = -1;
  for (var i = 0; i < storeObjectArray.length; i++) {
    if (location === storeObjectArray[i].location) {
      index = i;
      break;
    }
  }
  return index;
};

function populateListObjectArray() {
  for (var i = 0; i < storeObjectArray.length; i++) {
    listObjectArray.push(storeObjectArray[i].cookieHourArray);
  }
};

function updateListObjectArray(index) {
  listObjectArray[index] = storeObjectArray[index].cookieHourArray;
};

function updateObjects(index, minCust, maxCust, avgCookies) {
  storeObjectArray[index].minCust = minCust;
  storeObjectArray[index].maxCust = maxCust;
  storeObjectArray[index].avgCookies = avgCookies;
};

function updateTableRow(rowHeadName, replacementRows) {
  var rowsToReplace = document.querySelectorAll('th');
  var tempNodeArray = [];
  for (var j = 0; j < rowsToReplace.length; j++) {
    if (rowsToReplace[j].textContent === rowHeadName) {
      tempNodeArray.push(rowsToReplace[j]);
    }
  };
  for (var k = 0; k < replacementRows.length; k++) {
    var parent = tempNodeArray[k].parentNode.parentNode;
    parent.replaceChild(replacementRows[k], tempNodeArray[k].parentNode);
  }
};

function updateTable(event) {
  event.preventDefault();
  var elMsg       = document.getElementById('feedback');
  elMsg.innerHTML = '';

  var location    = event.target.location.value.trim();
  var minCust     = Number(event.target.min_cust.value);
  var maxCust     = Number(event.target.max_cust.value);
  var avgCookies  = Number(event.target.avg_cookies.value);
  var numArray    = [minCust, maxCust, avgCookies];

  for(var i = 0; i < numArray.length; i++) {
    checkNumber(numArray[i]);
  };
  validateMinMax(minCust, maxCust);

  clearRow([tableOneFinalRow]);

  var locIndex = checkLocation(location);

  if(locIndex === -1) {
    //create new store
    var newStore = new Store(location, minCust, maxCust, avgCookies);
    updateListObjectArray((storeObjectArray.length - 1));
    populateTable(nodeArray, [newStore]);
    tableOneFinalRow = calcFinal(tableBodyNodeOne, listObjectArray, 1);
  } else {
    //update table since entry already there
    updateObjects(locIndex, minCust, maxCust, avgCookies);
    var tr = storeObjectArray[locIndex].render();
    updateListObjectArray(locIndex);
    updateTableRow(location, tr);
    tableOneFinalRow = calcFinal(tableBodyNodeOne, listObjectArray, 1);
  };

  event.target.location.value = null;
  event.target.min_cust.value = null;
  event.target.max_cust.value = null;
  event.target.avg_cookies.value = null;
};

var Store = function(location, minCust, maxCust, avgCookies) {
  this.location = location;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookies = avgCookies;
  this.totalCookies = 0;
  this.cookieHourArray = [];
  this.tosserHour = [];
  this.timeArray = generateTimeArray();
  storeObjectArray.push(this);
};

Store.prototype.generateRandom = function() {
  var randomNumb = Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust);
  return randomNumb;
};

Store.prototype.cookiesPerHour = function() {
  var numCust = this.generateRandom();
  var generatedCookies = numCust * this.avgCookies;
  generatedCookies = Number(generatedCookies.toFixed(0));
  return [generatedCookies, numCust];
};

Store.prototype.cookiesPerDay = function() {
  this.totalCookies = 0;
  var custPerToss = 20;
  for (var i = 0; i < this.timeArray.length; i++) {
    var generatedValues = this.cookiesPerHour();
    var currentCookie = generatedValues[0];
    var tossersNeeded = Math.ceil(generatedValues[1] / custPerToss);
    var numToss = tossersNeeded > 2 ? tossersNeeded : 2;
    if (i === (this.timeArray.length - 1)) {
      this.cookieHourArray[i] = this.totalCookies;
    } else {
      this.totalCookies += currentCookie;
      this.cookieHourArray[i] = currentCookie;
      this.tosserHour[i] = numToss;
    }
  }
};

Store.prototype.render = function() {
  this.cookiesPerDay();
  var trOne        = document.createElement('tr');
  var headerLocOne = document.createElement('th');
  var trTwo        = document.createElement('tr');
  var headerLocTwo = document.createElement('th');

  headerLocOne.textContent = this.location;
  headerLocTwo.textContent = this.location;

  trOne.appendChild(headerLocOne);
  trTwo.appendChild(headerLocTwo);

  for (var i = 0; i < this.timeArray.length; i++) {
    var tdOne = document.createElement('td');
    tdOne.textContent = this.cookieHourArray[i];
    trOne.appendChild(tdOne);
  };

  for (var j = 0; j < this.tosserHour.length; j++) {
    var tdTwo = document.createElement('td');
    tdTwo.textContent = this.tosserHour[j];
    trTwo.appendChild(tdTwo);
  };
  return [trOne, trTwo];
};

//main
var storeObjectArray = [];
var listObjectArray = [];
new Store('1st and Pike', 23, 65, 6.3);
new Store('SeaTac Airport', 3, 24, 1.2);
new Store('Seattle Center', 11, 38, 3.7);
new Store('Capitol Hill', 20, 38, 2.3);
new Store('Alki', 2, 16, 4.6);
populateListObjectArray();

var tableBodyNodeOne = createTable('store_info', 1);
var tableBodyNodeTwo = createTable('tosser_info', 0);
var nodeArray = [tableBodyNodeOne, tableBodyNodeTwo];
populateTable(nodeArray, storeObjectArray);
var tableOneFinalRow = calcFinal(tableBodyNodeOne, listObjectArray, 1);

var tableForm = document.getElementById('new_store');
tableForm.addEventListener('submit', updateTable, false);
