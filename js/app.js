'use strict';
function Store(name, openingTime, closingTime, minHourlyCust, maxHourlyCust, avgCookieSales) {
  this.name = name;
  this.openingTime = openingTime;
  this.closingTime = closingTime;
  this.minHourlyCust = minHourlyCust;
  this.maxHourlyCust = maxHourlyCust;
  this.avgCookieSales = avgCookieSales;
  this.cookiesPerHour = [];
  this.storeCookiesPerHour: (function() {
    
  }())
}


const seattle = {
  name: 'Seattle',
  hours: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'],
  minHourlyCust: 23,
  maxHourlyCust: 65,
  avgCookieSales: 6.3,
  cookiesPerHour: [],
  getHourlyCookies: function() {
    for (let i = 0; i < this.hours.length; i++) {
      let custPerHour = Math.random() * (this.maxHourlyCust - this.minHourlyCust + 1) + this.minHourlyCust;
      this.cookiesPerHour[i] = Math.floor(custPerHour * this.avgCookieSales);
    }
  },
  getCookieTotals: function() {
    let cookieTotals = 0;
    for (let i = 0; i < this.cookiesPerHour.length; i++) {
      cookieTotals = cookieTotals + this.cookiesPerHour[i];
    }
    return cookieTotals;
  }
};


const tokyo = {
  name: 'Tokyo',
  hours: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'],
  minHourlyCust: 3,
  maxHourlyCust: 24,
  avgCookieSales: 1.2,
  custPerHour: [],
  cookiesPerHour: [],
  getHourlyCust: function() {
    for (let i = 0; i < this.hours.length; i++) {
      this.custPerHour[i] = Math.random() * (this.maxHourlyCust - this.minHourlyCust + 1) + this.minHourlyCust;
    }
  },
  getHourlyCookies: function() {
    for (let i = 0; i < this.hours.length; i++) {
      this.cookiesPerHour[i] = Math.floor(this.custPerHour[i] * this.avgCookieSales);
    }
  },
  getCookieTotals: function() {
    let cookieTotals = 0;
    for (let i = 0; i < this.cookiesPerHour.length; i++) {
      cookieTotals = cookieTotals + this.cookiesPerHour[i];
    }
    return cookieTotals;
  }
};
const dubai = {
  name: 'Dubai',
  hours: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'],
  minHourlyCust: 11,
  maxHourlyCust: 38,
  avgCookieSales: 3.7,
  custPerHour: [],
  cookiesPerHour: [],
  getHourlyCust: function() {
    for (let i = 0; i < this.hours.length; i++) {
      this.custPerHour[i] = Math.random() * (this.maxHourlyCust - this.minHourlyCust + 1) + this.minHourlyCust;
    }
  },
  getHourlyCookies: function() {
    for (let i = 0; i < this.hours.length; i++) {
      this.cookiesPerHour[i] = Math.floor(this.custPerHour[i] * this.avgCookieSales);
    }
  },
  getCookieTotals: function() {
    let cookieTotals = 0;
    for (let i = 0; i < this.cookiesPerHour.length; i++) {
      cookieTotals = cookieTotals + this.cookiesPerHour[i];
    }
    return cookieTotals;
  }
};
const paris = {
  name: 'Paris',
  hours: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'],
  minHourlyCust: 20,
  maxHourlyCust: 38,
  avgCookieSales: 2.3,
  custPerHour: [],
  cookiesPerHour: [],
  getHourlyCust: function() {
    for (let i = 0; i < this.hours.length; i++) {
      this.custPerHour[i] = Math.random() * (this.maxHourlyCust - this.minHourlyCust + 1) + this.minHourlyCust;
    }
  },
  getHourlyCookies: function() {
    for (let i = 0; i < this.hours.length; i++) {
      this.cookiesPerHour[i] = Math.floor(this.custPerHour[i] * this.avgCookieSales);
    }
  },
  getCookieTotals: function() {
    let cookieTotals = 0;
    for (let i = 0; i < this.cookiesPerHour.length; i++) {
      cookieTotals = cookieTotals + this.cookiesPerHour[i];
    }
    return cookieTotals;
  }
};
const lima = {
  name: 'Lima',
  hours: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'],
  minHourlyCust: 2,
  maxHourlyCust: 16,
  avgCookieSales: 4.6,
  custPerHour: [],
  cookiesPerHour: [],
  getHourlyCust: function() {
    for (let i = 0; i < this.hours.length; i++) {
      this.custPerHour[i] = Math.random() * (this.maxHourlyCust - this.minHourlyCust + 1) + this.minHourlyCust;
    }
  },
  getHourlyCookies: function() {
    for (let i = 0; i < this.hours.length; i++) {
      this.cookiesPerHour[i] = Math.floor(this.custPerHour[i] * this.avgCookieSales);
    }
  },
  getCookieTotals: function() {
    let cookieTotals = 0;
    for (let i = 0; i < this.cookiesPerHour.length; i++) {
      cookieTotals = cookieTotals + this.cookiesPerHour[i];
    }
    return cookieTotals;
  }
};
const storeList = [seattle, tokyo, dubai, paris, lima];
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
