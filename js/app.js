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

  // name: 'Seattle',
  // minHourlyCust: 23,
  // maxHourlyCust: 65,
  // avgCookieSales: 6.3,
  
  // name: 'Tokyo',
  // minHourlyCust: 3,
  // maxHourlyCust: 24,
  // avgCookieSales: 1.2,
  
  // name: 'Dubai',
  // minHourlyCust: 11,
  // maxHourlyCust: 38,
  // avgCookieSales: 3.7,
  
  // name: 'Paris',
  // minHourlyCust: 20,
  // maxHourlyCust: 38,
  // avgCookieSales: 2.3,
  
  // name: 'Lima',
  // minHourlyCust: 2,
  // maxHourlyCust: 16,
  // avgCookieSales: 4.6,
  
const storeList = [];
const storesSectionElem = document.getElementById('locations');
for (let i = 0; i < storeList.length; i++) {
  renderStoreList(storeList[i]);
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
