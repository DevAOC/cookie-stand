'use strict';
function Store(name, openingTime, closingTime, minHourlyCust, maxHourlyCust, avgCookieSales) {
  this.name = name;
  this.openingTime = openingTime;
  this.closingTime = closingTime;
  this.minHourlyCust = minHourlyCust;
  this.maxHourlyCust = maxHourlyCust;
  this.avgCookieSales = avgCookieSales;
  this.hoursOfOperation;
  this.cookiesPerHour = [];
  (function() { // Self calling method to calculate hoursOfOperation of operation
    this.hoursOfOperation = this.closingTime - this.openingTime;
  }());
  (function() { // Self calling method to fill cookiesPerHour array
    for (let i = 0; i < this.hoursOfOperation; i++) {
      let custPerHour = Math.random() * (this.maxHourlyCust - this.minHourlyCust + 1) + this.minHourlyCust;
      this.cookiesPerHour[i] = Math.floor(custPerHour * this.avgCookieSales);
    }
  }());
  this.getCookieTotals = function() {
    let cookieTotals = 0;
    for (let i = 0; i < this.cookiesPerHour.length; i++) {
      cookieTotals = cookieTotals + this.cookiesPerHour[i];
    }
    return cookieTotals;
  };
}
Store.prototype.renderStoreData = function () {
  
}
function addStore(name, openingTime, closingTime, minHourlyCust, maxHourlyCust, avgCookieSales) {
  const store = new Store(name, openingTime, closingTime, minHourlyCust, maxHourlyCust, avgCookieSales);
  Store.storeList.push(store);
}
addStore('Seattle', 6, 20, 23, 65, 6.3);
addStore('Tokyo', 6, 20, 3, 24, 1.2);
addStore('Dubai', 6, 20, 11, 38, 3.7);
addStore('Paris', 6, 20, 20, 38, 2.3);
addStore('Lima', 6, 20, 2, 16, 4.6);
Store.storeList = [];
const storesSectionElem = document.getElementById('locations');
for (let i = 0; i < Store.storeList.length; i++) {
  
}
function renderStoreList(store) {
  let articleElem = document.createElement('article');
  storesSectionElem.appendChild(articleElem);
  let h2Elem = document.createElement('h2');
  h2Elem.textContent = store.name;
  articleElem.appendChild(h2Elem);
  let ulElem = document.createElement('ul');
  articleElem.appendChild(ulElem);
  for (let i = 0; i < store.hours.length; i++) {
    let liElem = document.createElement('li');
    liElem.textContent = `${store.hours[i]}: ${store.cookiesPerHour[i]}`;
    ulElem.appendChild(liElem);
  }
  let liElem = document.createElement('li');
  liElem.textContent = `Total: ${store.getCookieTotals()}`;
  ulElem.appendChild(liElem);
}
