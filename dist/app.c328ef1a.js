// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"views.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayMonth = exports.displayPercentages = exports.displayBudget = exports.clearFields = exports.deleteListItem = exports.addListItem = exports.getInput = void 0;
var Dom = {
  type: ".add__type",
  description: ".add__description",
  value: ".add__value"
};

var getInput = function getInput() {
  return {
    type: document.querySelector(".add__type").value,
    description: document.querySelector(".add__description").value,
    value: parseFloat(document.querySelector(".add__value").value)
  };
};

exports.getInput = getInput;

var formatNumber = function formatNumber(n, type) {
  var num = n.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  var number = num * 1;
  type === "inc" ? "+ ".concat(number) : "- ".concat(number);
  return num;
};

var addListItem = function addListItem(obj, type) {
  var html, element;

  if (type === "inc") {
    element = document.querySelector(".income__list");
    html = " <div class=\"item\" id=\"inc-%id%\">\n      <div class=\"item__description\">%description%</div>\n      <div class=\"box__value\">\n      <div class=\"item__value item__value-income\">+ %value%</div>\n      <div class=\"item__delete\">\n      <svg class=\"icon-box-delete\">\n      <use xlink:href=\"img/sprite.svg#icon-cancel-circle\"></use>\n      </svg>\n      </div>\n      </div>\n      </div>";
  } else if (type === "exp") {
    element = document.querySelector(".expenses__list");
    html = "<div class=\"item\" id=\"exp-%id%\">\n  <div class=\"item__description\">%description%</div>\n  <div class=\"box__value\">\n  <div class=\"item__value item__value-expense\">- %value%</div>\n  <div class=\"item__percentage\">21%</div>\n  <div class=\"item__delete\">\n  <svg class=\"icon-box-delete\">\n  <use xlink:href=\"img/sprite.svg#icon-cancel-circle\"></use>\n  </svg>\n  </div>\n  </div>\n  </div>";
  }

  var newHtml = html.replace("%id%", obj.id);
  newHtml = newHtml.replace("%description%", obj.description);
  newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));
  element.insertAdjacentHTML("beforeend", newHtml);
};

exports.addListItem = addListItem;

var deleteListItem = function deleteListItem(id) {
  var el = document.getElementById(id);
  el.parentNode.removeChild(el);
};

exports.deleteListItem = deleteListItem;

var clearFields = function clearFields() {
  var fields = document.querySelectorAll("".concat(Dom.description, ", ").concat(Dom.value));
  fields.forEach(function (cur) {
    cur.value = "";
  });
  fields[0].focus();
};

exports.clearFields = clearFields;

var displayBudget = function displayBudget(obj) {
  document.querySelector(".budget__value").textContent = formatNumber(obj.budget);
  document.querySelector(".budget__income--value").textContent = formatNumber(obj.totalInc);
  document.querySelector(".budget__expenses--value").textContent = formatNumber(obj.totalExp);
  var expensesPercentage = document.querySelector(".budget__expenses--percentage");
  obj.percent > 0 ? expensesPercentage.textContent = "".concat(obj.percent, "%") : expensesPercentage.textContent = "---";
};

exports.displayBudget = displayBudget;

var displayPercentages = function displayPercentages(percentages) {
  var fields = document.querySelectorAll(".item__percentage");
  fields.forEach(function (cur, i) {
    cur.textContent = percentages[i] > 0 ? "".concat(percentages[i], "%") : "---";
  });
};

exports.displayPercentages = displayPercentages;

var displayMonth = function displayMonth() {
  var now = new Date();
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var day = now.getDay();
  var date = now.getDate();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var month = now.getMonth();
  var year = now.getFullYear();
  document.querySelector(".budget__title--month").textContent = "".concat(date, " ").concat(months[month], " ").concat(year, " (").concat(days[day], ")");
};

exports.displayMonth = displayMonth;
},{}],"model.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateLocalData = exports.deleteLocalData = exports.getLocalData = exports.localStorageData = exports.getBudget = exports.getPercentages = exports.calculatePercentages = exports.calculateBudget = exports.dataDeleteItem = exports.addItem = void 0;

var _views = require("./views.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Expense = /*#__PURE__*/function () {
  function Expense(id, description, value) {
    _classCallCheck(this, Expense);

    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  }

  _createClass(Expense, [{
    key: "calcPercentage",
    value: function calcPercentage(totalIncome) {
      if (totalIncome > 0) {
        this.percentage = Math.round(this.value / totalIncome * 100);
      } else {
        this.percentage = -1;
      }
    }
  }, {
    key: "getPercentage",
    value: function getPercentage() {
      return this.percentage;
    }
  }]);

  return Expense;
}();

var Income = function Income(id, description, value) {
  _classCallCheck(this, Income);

  this.id = id;
  this.description = description;
  this.value = value;
};

var data = {
  allItems: {
    exp: [],
    inc: []
  },
  totals: {
    exp: 0,
    inc: 0
  },
  budget: 0,
  percentage: -1
};
console.log(data);

var addItem = function addItem(type, des, val) {
  var ID;
  data.allItems[type].length > 0 ? ID = data.allItems[type][data.allItems[type].length - 1].id + 1 : ID = 0;
  var newItem;
  type === "exp" ? newItem = new Expense(ID, des, val) : newItem = new Income(ID, des, val);
  data.allItems[type].push(newItem);
  return newItem;
};

exports.addItem = addItem;

var dataDeleteItem = function dataDeleteItem(type, id) {
  var ids = data.allItems[type].map(function (cur) {
    return cur.id;
  });
  var index = ids.indexOf(id);

  if (index !== -1) {
    data.allItems[type].splice(index, 1);
  }
};

exports.dataDeleteItem = dataDeleteItem;

var calculateTotal = function calculateTotal(type) {
  var sum = 0;
  data.allItems[type].forEach(function (cur) {
    sum += cur.value;
  });
  data.totals[type] = sum;
};

var calculateBudget = function calculateBudget() {
  //calc total incom end expenses
  calculateTotal("exp");
  calculateTotal("inc"); //calc the budget inc-exp

  data.budget = data.totals.inc - data.totals.exp; //calc the percentage

  data.totals.inc > 0 ? data.percentage = Math.round(data.totals.exp / data.totals.inc * 100) : data.percentage = -1;
};

exports.calculateBudget = calculateBudget;

var calculatePercentages = function calculatePercentages() {
  data.allItems.exp.forEach(function (cur) {
    cur.calcPercentage(data.totals.inc);
  });
};

exports.calculatePercentages = calculatePercentages;

var getPercentages = function getPercentages() {
  var allPercentages = data.allItems.exp.map(function (cur) {
    return cur.getPercentage();
  });
  return allPercentages;
};

exports.getPercentages = getPercentages;

var getBudget = function getBudget() {
  return {
    budget: data.budget,
    totalInc: data.totals.inc,
    totalExp: data.totals.exp,
    percent: data.percentage
  };
}; //LocalStorage


exports.getBudget = getBudget;

var localStorageData = function localStorageData() {
  localStorage.setItem("data", JSON.stringify(data));
};

exports.localStorageData = localStorageData;

var getLocalData = function getLocalData() {
  var localData = JSON.parse(localStorage.getItem("data"));
  return localData;
};

exports.getLocalData = getLocalData;

var deleteLocalData = function deleteLocalData() {
  localStorage.removeItem("data");
};

exports.deleteLocalData = deleteLocalData;

var updateLocalData = function updateLocalData(localStorageData) {
  data.totals = localStorageData.totals;
  data.budget = localStorageData.budget;
  data.percentage = localStorageData.percentage;
};

exports.updateLocalData = updateLocalData;
},{"./views.js":"views.js"}],"controller.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = void 0;

var _views = require("./views.js");

var _model = require("./model.js");

var updateBudget = function updateBudget() {
  //Calculate the budget
  (0, _model.calculateBudget)(); //Return the budget

  var budget = (0, _model.getBudget)(); //Display the budget on the UI

  (0, _views.displayBudget)(budget);
};

var updatePercentages = function updatePercentages() {
  //calc the percentages
  (0, _model.calculatePercentages)(); //red percentages from the model

  var percentages = (0, _model.getPercentages)(); //update the Ui with th percentages

  (0, _views.displayPercentages)(percentages);
};

var getItem = function getItem() {
  var input = (0, _views.getInput)();
  console.log(input);

  if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
    var newItem = (0, _model.addItem)(input.type, input.description, input.value);
    (0, _views.addListItem)(newItem, input.type);
    (0, _views.clearFields)();
    updateBudget();
    updatePercentages();
    (0, _model.localStorageData)();
  }
};

var deleteItem = function deleteItem(e) {
  // const itemID = e.target.parentNode.parentNode.parentNode.id;
  var itemID = e.target.parentNode.parentNode.parentNode.id;
  console.log(itemID);

  if (itemID) {
    var splitID = itemID.split("-");
    var type = splitID[0];
    var ID = parseInt(splitID[1]);
    (0, _model.dataDeleteItem)(type, ID);
    (0, _views.deleteListItem)(itemID);
    updateBudget();
    updatePercentages();
    (0, _model.localStorageData)();
  }
};

var loadLocalStorageData = function loadLocalStorageData() {
  var localData = (0, _model.getLocalData)();

  if (localData) {
    (0, _model.updateLocalData)(localData);
    localData.allItems.inc.forEach(function (cur) {
      var newIncItem = (0, _model.addItem)("inc", cur.description, cur.value);
      (0, _views.addListItem)(newIncItem, "inc");
    });
    localData.allItems.exp.forEach(function (cur) {
      var newExpItem = (0, _model.addItem)("exp", cur.description, cur.value);
      (0, _views.addListItem)(newExpItem, "exp");
    });
    var budget = (0, _model.getBudget)();
    (0, _views.displayBudget)(budget);
    updatePercentages();
  }
};

var init = function init() {
  document.querySelector(".add__btn").addEventListener("click", getItem);
  document.addEventListener("keypress", function (event) {
    if (event.keyCode === 13 || event.which === 13) {
      getItem();
    }
  });
  document.querySelector(".container").addEventListener("click", deleteItem);
  (0, _views.displayMonth)();
  (0, _views.displayBudget)({
    budget: 0,
    totalInc: 0,
    totalExp: 0,
    percent: -1
  });
  loadLocalStorageData();
};

exports.init = init;
},{"./views.js":"views.js","./model.js":"model.js"}],"app.js":[function(require,module,exports) {
"use strict";

var _controller = require("./controller.js");

(0, _controller.init)();
},{"./controller.js":"controller.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "6886" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map