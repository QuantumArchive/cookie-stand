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
};

Store.prototype.generateRandom = function() {
  return Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust);
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
var pike = new Store('1st and Pike', 23, 65, 6.3);
var seaTac = new Store('SeaTac Airport', 3, 24, 1.2);
var seaCenter = new Store('Seattle Center', 11, 38, 3.7);
var capHill = new Store('Capitol Hill', 20, 38, 2.3);
var alki = new Store('Alki', 2, 16, 4.6);
var locArray = [pike, seaTac, seaCenter, capHill, alki];

var tableBodyNodeOne = createTable('store_info', 1);
var tableBodyNodeTwo = createTable('tosser_info', 0);
var nodeArray = [tableBodyNodeOne, tableBodyNodeTwo];
populateTable(nodeArray, locArray);

var listObjectArray = [pike.cookieHourArray, seaTac.cookieHourArray, seaCenter.cookieHourArray, capHill.cookieHourArray, alki.cookieHourArray];
calcFinal(tableBodyNodeOne, listObjectArray, 1);

//In case you wanted to append totals row to the bottom of the table uncomment bottom two
//var listObjectArrayTosser = [pike.tosserHour, seaTac.tosserHour, seaCenter.tosserHour, capHill.tosserHour, alki.tosserHour];
//calcFinal(tableBodyNodeTwo, listObjectArrayTosser, 0);
