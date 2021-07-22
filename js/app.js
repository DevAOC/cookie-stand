'use strict';
function Store(name, minHourlyCust, maxHourlyCust, avgCookieSales, address, phoneNumber, openingTime, closingTime) {
  this.name = name;
  this.minHourlyCust = minHourlyCust;
  this.maxHourlyCust = maxHourlyCust;
  this.avgCookieSales = avgCookieSales;
  this.address = address;
  this.phoneNumber = phoneNumber;
  this.openingTime = openingTime;
  this.closingTime = closingTime;
  this.cookiesPerHour = [];
  this.cookieTotals = 0;
}

Store.prototype.randCustPerHour = function() {
  return Math.floor(Math.random() * (this.maxHourlyCust - this.minHourlyCust + 1) + this.minHourlyCust);
};

Store.prototype.calculateCookiesPerHour = function() {
  for (let i = 0; i < hours.length; i++) {
    this.cookiesPerHour[i] = Math.floor(this.randCustPerHour() * this.avgCookieSales);
  }
};

Store.prototype.getCookieTotals = function() {
  for (let i = 0; i < this.cookiesPerHour.length; i++) {
    this.cookieTotals = this.cookieTotals + this.cookiesPerHour[i];
  }
};
// Modified for new implementation
Store.prototype.calculateResults = function () {
  this.getHoursOfOperation();
  this.calculateCookiesPerHour();
  this.getCookieTotals();
};
//Needs changes for new implementation
Store.prototype.renderResults = function(tBodyElem) {
  const trElem = makeElem('tr', tBodyElem, null);
  makeElem('th', trElem, this.name);
  for (let hourIndex = 0; hourIndex < this.cookiesPerHour.length; hourIndex++) {
    makeElem('td', trElem, this.cookiesPerHour[hourIndex]);
  }
  makeElem('td', trElem, this.cookieTotals);
};
//New method for hours calculation
Store.prototype.getHoursOfOperation = function() {
  this.hoursOfOperation = this.closingTime - this.openingTime;
};
//addStore modified for new implementation
function addStore(name, minHourlyCust, maxHourlyCust, avgCookieSales, address, phoneNumber, openingTime, closingTime) {
  const store = new Store(name, minHourlyCust, maxHourlyCust, avgCookieSales, address, phoneNumber, openingTime, closingTime);
  storeList.push(store);
}

function calculateAllResults() {
  for (let i = 0; i < storeList.length; i++) {
    storeList[i].calculateResults();
  }
}

function makeElem(tagName, parent, textContent) {
  let elem = document.createElement(tagName);
  if (textContent) {
    elem.textContent = textContent;
  }
  parent.appendChild(elem);
  return elem;
}

function renderDataTable(tableElem) {
  tableHeader(tableElem);
  tableBody(tableElem);
  tableFooter(tableElem);
}
//Needs changes for new implementation
function tableHeader(tableElem) {
  const thead = makeElem('thead', tableElem, null);
  const trElem = makeElem('tr', thead, null);
  makeElem('th', trElem, null);
  for (let i = 0; i < hours.length; i++) {
    makeElem('th', trElem, hours[i]);
  }
  makeElem('th', trElem, 'Daily Location Total');
}

function tableBody(tableElem) {
  const tBodyElem = makeElem('tbody', tableElem, null);
  for (let i = 0; i < storeList.length; i++) {
    storeList[i].renderResults(tBodyElem);
  }
}

function tableFooter(tableElem) {
  const tFootElem = makeElem('tfoot', tableElem, null);
  const trElem = makeElem('tr', tFootElem, null);
  makeElem('th', trElem, 'Totals');
  renderTotals(trElem);
}
//Look at notebook for new functions that add beginning and trailing empty spaces
// Need total hours of operation check (using lowest and highest closing times)
function renderTotals(trElem) {
  let dailyTotal = 0;
  for (let hourIndex = 0; hourIndex < hours.length; hourIndex++) {
    let hourlyTotal = 0;
    for (let storeArrIndex = 0; storeArrIndex < storeList.length; storeArrIndex++) {
      hourlyTotal = hourlyTotal + storeList[storeArrIndex].cookiesPerHour[hourIndex];
    }
    makeElem('td', trElem, hourlyTotal);
    dailyTotal = dailyTotal + hourlyTotal;
  }
  makeElem('th', trElem, dailyTotal);
}
//Modified for new implementation
function renderLocationsInfo(locationsHeaderElem) {
  for (let i = 0; i < storeList.length; i++) {
    makeElem('h2', locationsHeaderElem, storeList[i].name);
    const ulElem = makeElem('ul', locationsHeaderElem, null);
    makeElem('li', ulElem, `${storeList[i].address}`);
    makeElem('li', ulElem, `Hours: ${storeList[i].openingTime} - ${storeList[i].closingTime}`);
    makeElem('li', ulElem, `${storeList[i].phoneNumber}`);
  }
}

const storeList = [];

addStore('Seattle', 23, 65, 6.3, '1124 Pike St, Seattle, WA 98101, United States', '+1 206-624-0173', 6, 20);
addStore('Tokyo', 3, 24, 1.2, '2 Chome-19-23 Aobadai, Meguro City, Tokyo 153-0042, Japan', '+81 3-6417-0202', 6, 20);
addStore('Dubai', 11, 38, 3.7, 'Centre of Palm Nakheel Mall - Dubai - United Arab Emirates', '+971 4 422 0050', 6, 20);
addStore('Paris', 20, 38, 2.3, '26 Avenue de l\'Opéra, 75001 Paris, France', '+33 1 40 20 08 37', 6, 20);
addStore('Lima', 2, 16, 4.6, 'Av Paseo de la República 144, Lima 15001, Peru', '+51 1 5055000', 6, 20);

calculateAllResults();
const tableElem = document.getElementById('storeTable');
if (tableElem) {
  renderDataTable(tableElem);
}

const locationsInfoElem = document.getElementById('locationsInfo');
if (locationsInfoElem) {
  const locationHeaderElem = makeElem('h1', locationsInfoElem, 'Locations');
  renderLocationsInfo(locationHeaderElem);
}


//Will need to check for what time each store opens and closes and reference to the min opening and closing time --- need a new function for highestClosingTime ---- functions for adding td for each empty td that is needed and subtracting for the same reason --- need to make a function that changes 24 hour clock times to 12 hour clock times
