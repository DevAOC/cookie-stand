'use strict';
const hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
const storeList = [];
const addStoreForm = document.getElementById('addStoreForm');
function Store(name, minHourlyCust, maxHourlyCust, avgCookieSales, address, phoneNumber) {
  this.name = name;
  this.minHourlyCust = minHourlyCust;
  this.maxHourlyCust = maxHourlyCust;
  this.avgCookieSales = avgCookieSales;
  this.address = address;
  this.phoneNumber = phoneNumber;
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

Store.prototype.calculateResults = function () {
  this.calculateCookiesPerHour();
  this.getCookieTotals();
};

Store.prototype.renderResults = function(tBodyElem) {
  const trElem = makeElem('tr', tBodyElem, null);
  makeElem('th', trElem, this.name);
  for (let hourIndex = 0; hourIndex < this.cookiesPerHour.length; hourIndex++) {
    makeElem('td', trElem, this.cookiesPerHour[hourIndex]);
  }
  makeElem('td', trElem, this.cookieTotals);
};

function addStore(name, minHourlyCust, maxHourlyCust, avgCookieSales, address, phoneNumber) {
  const store = new Store(name, minHourlyCust, maxHourlyCust, avgCookieSales, address, phoneNumber);
  storeList.push(store);
}
// Move this to prototype and add this.calculateResults to addStore function
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

function renderDataTable(tableSectionElem) {
  const tableElem = makeElem('table', tableSectionElem, null);
  tableHeader(tableElem);
  tableBody(tableElem);
  tableFooter(tableElem);
}

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
  makeElem('td', trElem, dailyTotal);
}

function renderLocationsInfo(locationsHeaderElem) {
  for (let i = 0; i < storeList.length; i++) {
    makeElem('h2', locationsHeaderElem, storeList[i].name);
    const ulElem = makeElem('ul', locationsHeaderElem, null);
    makeElem('li', ulElem, `${storeList[i].address}`);
    makeElem('li', ulElem, `Hours: ${hours[0]} - ${hours[hours.length - 1]}`);
    makeElem('li', ulElem, `${storeList[i].phoneNumber}`);
  }
}

function handleSubmit(event) {
  event.preventDefault(); //Only needed for forms
  let name = event.target.name.value;
  let minHourlyCust = event.target.minHourlyCust.value;
  let maxHourlyCust = event.target.maxHourlyCust.value;
  let avgCookieSales = event.target.avgCookieSales.value;
  let address = event.target.address.value;
  let phoneNumber = event.target.phoneNumber.value;
  addStore(name, minHourlyCust, maxHourlyCust, avgCookieSales, address, phoneNumber);
  //Need to clear original render and add the new render
  event.target.reset;
  tableSectionElem.empty(); //Empties the table element
  renderDataTable(tableSectionElem);
}
// Event listener
addStoreForm.addEventListener('submit', handleSubmit);

addStore('Seattle', 23, 65, 6.3, '1124 Pike St, Seattle, WA 98101, United States', '+1 206-624-0173');
addStore('Tokyo', 3, 24, 1.2, '2 Chome-19-23 Aobadai, Meguro City, Tokyo 153-0042, Japan', '+81 3-6417-0202');
addStore('Dubai', 11, 38, 3.7, 'Centre of Palm Nakheel Mall - Dubai - United Arab Emirates', '+971 4 422 0050');
addStore('Paris', 20, 38, 2.3, '26 Avenue de l\'Opéra, 75001 Paris, France', '+33 1 40 20 08 37');
addStore('Lima', 2, 16, 4.6, 'Av Paseo de la República 144, Lima 15001, Peru', '+51 1 5055000');

const tableSectionElem = document.getElementById('storeTable');
if (tableSectionElem) {
  calculateAllResults();
  renderDataTable(tableSectionElem);
}

const locationsInfoElem = document.getElementById('locationsInfo');
if (locationsInfoElem) {
  const locationHeaderElem = makeElem('h1', locationsInfoElem, 'Locations');
  renderLocationsInfo(locationHeaderElem);
}
