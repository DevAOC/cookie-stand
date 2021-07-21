'use strict';
Store.storeList = [];
const hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
addStore('Seattle', 23, 65, 6.3);
addStore('Tokyo', 3, 24, 1.2);
addStore('Dubai', 11, 38, 3.7);
addStore('Paris', 20, 38, 2.3);
addStore('Lima', 2, 16, 4.6);
renderDataTable();
function Store(name, minHourlyCust, maxHourlyCust, avgCookieSales) {
  this.name = name;
  this.minHourlyCust = minHourlyCust;
  this.maxHourlyCust = maxHourlyCust;
  this.avgCookieSales = avgCookieSales;
  this.cookiesPerHour = [];
  this.cookieTotals = 0;
  (function() { // Self calling method to fill cookiesPerHour array
    for (let i = 0; i < hours.length; i++) {
      let custPerHour = Math.random() * (this.maxHourlyCust - this.minHourlyCust + 1) + this.minHourlyCust;
      this.cookiesPerHour[i] = Math.floor(custPerHour * this.avgCookieSales);
    }
  }());
  (function() {
    for (let i = 0; i < this.cookiesPerHour.length; i++) {
      this.cookieTotals = this.cookieTotals + this.cookiesPerHour[i];
    }
  }());
}

function addStore(name, minHourlyCust, maxHourlyCust, avgCookieSales) {
  const store = new Store(name, minHourlyCust, maxHourlyCust, avgCookieSales);
  Store.storeList.push(store);
}

function renderDataTable() {
  const storesSectionElem = document.getElementById('locations');
  const tableElem = makeElem('table', storesSectionElem, null);
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
  const trElem = makeElem('tr', tBodyElem, null);
  for (let i = 0; i < Store.storeList.length; i++) {
    Store.storeList[i].renderStoreData(trElem);
  }
}

function tableFooter(tableElem) {
  const tFootElem = makeElem('tfoot', tableElem, null);
  const trElem = makeElem('tr', tFootElem, null);
  makeElem('th', trElem, 'Totals');
  renderTotals(trElem);
}

Store.prototype.renderStoreData = function (trElem) {
  makeElem('th', trElem, this.name);
  for (let i = 0; i < this.cookiesPerHour.length; i++) {
    makeElem('td', trElem, this.cookiesPerHour[i]);
  }
  makeElem('td', trElem, this.cookieTotals);
};

function renderTotals(trElem) {
  for (let hourIndex = 0; hourIndex < hours.length; hourIndex++) {
    let hourlyTotals = 0;
    for (let storeArrIndex = 0; storeArrIndex < Store.storeList.length; storeArrIndex++) {
      hourlyTotals = hourlyTotals + Store.storeList[storeArrIndex].cookiesPerHour[hourIndex];
    }
    makeElem('td', trElem, hourlyTotals);
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
