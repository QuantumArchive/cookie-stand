'use strict';

var pike = {
  minCust: 23,
  maxCust: 65,
  avgCookies: 6.3,
  totalCookies: 0,
  location: '1st and Pike',
  htmlID: 'store_info_pike',
  timeArray: ['6am: ', '7am: ', '8am: ', '10am: ', '11am: ', '12pm: ', '1pm: ', '2pm: ', '3pm: ', '4pm: ', '5pm: ', '6pm: ', '7pm: ', '8pm: ', 'Total: '],
  cookieHourArray: [],
  generateRandom: function() {
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust);
  },
  cookiesPerHour: function() {
    var generatedCookies = this.generateRandom() * this.avgCookies;
    return Number(generatedCookies.toFixed(0));
  },
  cookiesPerDay: function() {
    for (var i = 0; i < this.timeArray.length; i++) {
      var currentCookie = this.cookiesPerHour();
      if (i === (this.timeArray.length - 1)) {
        this.cookieHourArray[i] = this.timeArray[i] + this.totalCookies + ' cookies';
      } else {
        this.totalCookies += currentCookie;
        this.cookieHourArray[i] = this.timeArray[i] + currentCookie + ' cookies';
      }
    }
  },
  render: function() {
    var ul = document.createElement('ul');
    var h2 = document.createElement('h2');
    var hr = document.createElement('hr');
    var main = document.getElementById(this.htmlID);
    main.textContent = '';
    //check if main has an attribute
    if (!main.hasAttribute('class')) {
      main.setAttribute('class','listholder');
    };
    h2.textContent = this.location;
    ul.appendChild(h2);
    ul.appendChild(hr);

    for (var k = 0; k < this.cookieHourArray.length; k++) {
      var li = document.createElement('li');
      li.textContent = this.cookieHourArray[k];
      ul.appendChild(li);
    }
    main.appendChild(ul);
  }
};

var seatac = {
  minCust: 3,
  maxCust: 24,
  avgCookies: 1.2,
  totalCookies: 0,
  location: 'SeaTac Airport',
  htmlID: 'store_info_seatac',
  timeArray: ['6am: ', '7am: ', '8am: ', '10am: ', '11am: ', '12pm: ', '1pm: ', '2pm: ', '3pm: ', '4pm: ', '5pm: ', '6pm: ', '7pm: ', '8pm: ', 'Total: '],
  cookieHourArray: [],
  generateRandom: function() {
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust);
  },
  cookiesPerHour: function() {
    var generatedCookies = this.generateRandom() * this.avgCookies;
    return Number(generatedCookies.toFixed(0));
  },
  cookiesPerDay: function() {
    for (var i = 0; i < this.timeArray.length; i++) {
      var currentCookie = this.cookiesPerHour();
      if (i === (this.timeArray.length - 1)) {
        this.cookieHourArray[i] = this.timeArray[i] + this.totalCookies + ' cookies';
      } else {
        this.totalCookies += currentCookie;
        this.cookieHourArray[i] = this.timeArray[i] + currentCookie + ' cookies';
      }
    }
  },
  render: function() {
    var ul = document.createElement('ul');
    var h2 = document.createElement('h2');
    var hr = document.createElement('hr');
    var main = document.getElementById(this.htmlID);
    main.textContent = '';
    //check if main has an attribute
    if (!main.hasAttribute('class')) {
      main.setAttribute('class','listholder');
    };
    h2.textContent = this.location;
    ul.appendChild(h2);
    ul.appendChild(hr);

    for (var k = 0; k < this.cookieHourArray.length; k++) {
      var li = document.createElement('li');
      li.textContent = this.cookieHourArray[k];
      ul.appendChild(li);
    }
    main.appendChild(ul);
  }
};

var seacenter = {
  minCust: 11,
  maxCust: 38,
  avgCookies: 3.7,
  totalCookies: 0,
  location: 'Seattle Center',
  htmlID: 'store_info_seacenter',
  timeArray: ['6am: ', '7am: ', '8am: ', '10am: ', '11am: ', '12pm: ', '1pm: ', '2pm: ', '3pm: ', '4pm: ', '5pm: ', '6pm: ', '7pm: ', '8pm: ', 'Total: '],
  cookieHourArray: [],
  generateRandom: function() {
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust);
  },
  cookiesPerHour: function() {
    var generatedCookies = this.generateRandom() * this.avgCookies;
    return Number(generatedCookies.toFixed(0));
  },
  cookiesPerDay: function() {
    for (var i = 0; i < this.timeArray.length; i++) {
      var currentCookie = this.cookiesPerHour();
      if (i === (this.timeArray.length - 1)) {
        this.cookieHourArray[i] = this.timeArray[i] + this.totalCookies + ' cookies';
      } else {
        this.totalCookies += currentCookie;
        this.cookieHourArray[i] = this.timeArray[i] + currentCookie + ' cookies';
      }
    }
  },
  render: function() {
    var ul = document.createElement('ul');
    var h2 = document.createElement('h2');
    var hr = document.createElement('hr');
    var main = document.getElementById(this.htmlID);
    main.textContent = '';
    //check if main has an attribute
    if (!main.hasAttribute('class')) {
      main.setAttribute('class','listholder');
    };
    h2.textContent = this.location;
    ul.appendChild(h2);
    ul.appendChild(hr);

    for (var k = 0; k < this.cookieHourArray.length; k++) {
      var li = document.createElement('li');
      li.textContent = this.cookieHourArray[k];
      ul.appendChild(li);
    }
    main.appendChild(ul);
  }
};

var caphill = {
  minCust: 20,
  maxCust: 38,
  avgCookies: 2.3,
  totalCookies: 0,
  location: 'Capitol Hill',
  htmlID: 'store_info_caphill',
  timeArray: ['6am: ', '7am: ', '8am: ', '10am: ', '11am: ', '12pm: ', '1pm: ', '2pm: ', '3pm: ', '4pm: ', '5pm: ', '6pm: ', '7pm: ', '8pm: ', 'Total: '],
  cookieHourArray: [],
  generateRandom: function() {
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust);
  },
  cookiesPerHour: function() {
    var generatedCookies = this.generateRandom() * this.avgCookies;
    return Number(generatedCookies.toFixed(0));
  },
  cookiesPerDay: function() {
    for (var i = 0; i < this.timeArray.length; i++) {
      var currentCookie = this.cookiesPerHour();
      if (i === (this.timeArray.length - 1)) {
        this.cookieHourArray[i] = this.timeArray[i] + this.totalCookies + ' cookies';
      } else {
        this.totalCookies += currentCookie;
        this.cookieHourArray[i] = this.timeArray[i] + currentCookie + ' cookies';
      }
    }
  },
  render: function() {
    var ul = document.createElement('ul');
    var h2 = document.createElement('h2');
    var hr = document.createElement('hr');
    var main = document.getElementById(this.htmlID);
    main.textContent = '';
    //check if main has an attribute
    if (!main.hasAttribute('class')) {
      main.setAttribute('class','listholder');
    };
    h2.textContent = this.location;
    ul.appendChild(h2);
    ul.appendChild(hr);

    for (var k = 0; k < this.cookieHourArray.length; k++) {
      var li = document.createElement('li');
      li.textContent = this.cookieHourArray[k];
      ul.appendChild(li);
    }
    main.appendChild(ul);
  }
};

var alki = {
  minCust: 2,
  maxCust: 16,
  avgCookies: 4.6,
  totalCookies: 0,
  location: 'Alki',
  htmlID: 'store_info_alki',
  timeArray: ['6am: ', '7am: ', '8am: ', '10am: ', '11am: ', '12pm: ', '1pm: ', '2pm: ', '3pm: ', '4pm: ', '5pm: ', '6pm: ', '7pm: ', '8pm: ', 'Total: '],
  cookieHourArray: [],
  generateRandom: function() {
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust);
  },
  cookiesPerHour: function() {
    var generatedCookies = this.generateRandom() * this.avgCookies;
    return Number(generatedCookies.toFixed(0));
  },
  cookiesPerDay: function() {
    for (var i = 0; i < this.timeArray.length; i++) {
      var currentCookie = this.cookiesPerHour();
      if (i === (this.timeArray.length - 1)) {
        this.cookieHourArray[i] = this.timeArray[i] + this.totalCookies + ' cookies';
      } else {
        this.totalCookies += currentCookie;
        this.cookieHourArray[i] = this.timeArray[i] + currentCookie + ' cookies';
      }
    }
  },
  render: function() {
    var ul = document.createElement('ul');
    var h2 = document.createElement('h2');
    var hr = document.createElement('hr');
    var main = document.getElementById(this.htmlID);
    main.textContent = '';
    //check if main has an attribute
    if (!main.hasAttribute('class')) {
      main.setAttribute('class','listholder');
    };
    h2.textContent = this.location;
    ul.appendChild(h2);
    ul.appendChild(hr);

    for (var k = 0; k < this.cookieHourArray.length; k++) {
      var li = document.createElement('li');
      li.textContent = this.cookieHourArray[k];
      ul.appendChild(li);
    }
    main.appendChild(ul);
  }
};

pike.cookiesPerDay();
seatac.cookiesPerDay();
seacenter.cookiesPerDay();
caphill.cookiesPerDay();
alki.cookiesPerDay();

pike.render();
seatac.render();
seacenter.render();
caphill.render();
alki.render();
