import { g as getDefaultExportFromCjs, d as document$1 } from "./document.js";
var promise$1 = { exports: {} };
var promise = promise$1.exports;
var hasRequiredPromise;
function requirePromise() {
  if (hasRequiredPromise) return promise$1.exports;
  hasRequiredPromise = 1;
  (function(module) {
    (function(root) {
      var setTimeoutFunc = setTimeout;
      function noop() {
      }
      function bind(fn, thisArg) {
        return function() {
          fn.apply(thisArg, arguments);
        };
      }
      function Promise2(fn) {
        if (typeof this !== "object") throw new TypeError("Promises must be constructed via new");
        if (typeof fn !== "function") throw new TypeError("not a function");
        this._state = 0;
        this._handled = false;
        this._value = void 0;
        this._deferreds = [];
        doResolve(fn, this);
      }
      function handle(self, deferred) {
        while (self._state === 3) {
          self = self._value;
        }
        if (self._state === 0) {
          self._deferreds.push(deferred);
          return;
        }
        self._handled = true;
        Promise2._immediateFn(function() {
          var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
          if (cb === null) {
            (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
            return;
          }
          var ret;
          try {
            ret = cb(self._value);
          } catch (e) {
            reject(deferred.promise, e);
            return;
          }
          resolve(deferred.promise, ret);
        });
      }
      function resolve(self, newValue) {
        try {
          if (newValue === self) throw new TypeError("A promise cannot be resolved with itself.");
          if (newValue && (typeof newValue === "object" || typeof newValue === "function")) {
            var then = newValue.then;
            if (newValue instanceof Promise2) {
              self._state = 3;
              self._value = newValue;
              finale(self);
              return;
            } else if (typeof then === "function") {
              doResolve(bind(then, newValue), self);
              return;
            }
          }
          self._state = 1;
          self._value = newValue;
          finale(self);
        } catch (e) {
          reject(self, e);
        }
      }
      function reject(self, newValue) {
        self._state = 2;
        self._value = newValue;
        finale(self);
      }
      function finale(self) {
        if (self._state === 2 && self._deferreds.length === 0) {
          Promise2._immediateFn(function() {
            if (!self._handled) {
              Promise2._unhandledRejectionFn(self._value);
            }
          });
        }
        for (var i = 0, len = self._deferreds.length; i < len; i++) {
          handle(self, self._deferreds[i]);
        }
        self._deferreds = null;
      }
      function Handler(onFulfilled, onRejected, promise2) {
        this.onFulfilled = typeof onFulfilled === "function" ? onFulfilled : null;
        this.onRejected = typeof onRejected === "function" ? onRejected : null;
        this.promise = promise2;
      }
      function doResolve(fn, self) {
        var done = false;
        try {
          fn(function(value) {
            if (done) return;
            done = true;
            resolve(self, value);
          }, function(reason) {
            if (done) return;
            done = true;
            reject(self, reason);
          });
        } catch (ex) {
          if (done) return;
          done = true;
          reject(self, ex);
        }
      }
      Promise2.prototype["catch"] = function(onRejected) {
        return this.then(null, onRejected);
      };
      Promise2.prototype.then = function(onFulfilled, onRejected) {
        var prom = new this.constructor(noop);
        handle(this, new Handler(onFulfilled, onRejected, prom));
        return prom;
      };
      Promise2.all = function(arr) {
        var args = Array.prototype.slice.call(arr);
        return new Promise2(function(resolve2, reject2) {
          if (args.length === 0) return resolve2([]);
          var remaining = args.length;
          function res(i2, val) {
            try {
              if (val && (typeof val === "object" || typeof val === "function")) {
                var then = val.then;
                if (typeof then === "function") {
                  then.call(val, function(val2) {
                    res(i2, val2);
                  }, reject2);
                  return;
                }
              }
              args[i2] = val;
              if (--remaining === 0) {
                resolve2(args);
              }
            } catch (ex) {
              reject2(ex);
            }
          }
          for (var i = 0; i < args.length; i++) {
            res(i, args[i]);
          }
        });
      };
      Promise2.resolve = function(value) {
        if (value && typeof value === "object" && value.constructor === Promise2) {
          return value;
        }
        return new Promise2(function(resolve2) {
          resolve2(value);
        });
      };
      Promise2.reject = function(value) {
        return new Promise2(function(resolve2, reject2) {
          reject2(value);
        });
      };
      Promise2.race = function(values) {
        return new Promise2(function(resolve2, reject2) {
          for (var i = 0, len = values.length; i < len; i++) {
            values[i].then(resolve2, reject2);
          }
        });
      };
      Promise2._immediateFn = typeof setImmediate === "function" && function(fn) {
        setImmediate(fn);
      } || function(fn) {
        setTimeoutFunc(fn, 0);
      };
      Promise2._unhandledRejectionFn = function _unhandledRejectionFn(err) {
        if (typeof console !== "undefined" && console) {
          console.warn("Possible Unhandled Promise Rejection:", err);
        }
      };
      Promise2._setImmediateFn = function _setImmediateFn(fn) {
        Promise2._immediateFn = fn;
      };
      Promise2._setUnhandledRejectionFn = function _setUnhandledRejectionFn(fn) {
        Promise2._unhandledRejectionFn = fn;
      };
      if (module.exports) {
        module.exports = Promise2;
      } else if (!root.Promise) {
        root.Promise = Promise2;
      }
    })(promise);
  })(promise$1);
  return promise$1.exports;
}
var promiseExports = requirePromise();
const Promise$1 = /* @__PURE__ */ getDefaultExportFromCjs(promiseExports);
var svg4everybody$2 = { exports: {} };
var svg4everybody$1 = svg4everybody$2.exports;
var hasRequiredSvg4everybody;
function requireSvg4everybody() {
  if (hasRequiredSvg4everybody) return svg4everybody$2.exports;
  hasRequiredSvg4everybody = 1;
  (function(module) {
    !(function(root, factory) {
      module.exports ? (
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory()
      ) : root.svg4everybody = factory();
    })(svg4everybody$1, function() {
      function embed(parent, svg, target) {
        if (target) {
          var fragment = document.createDocumentFragment(), viewBox = !svg.hasAttribute("viewBox") && target.getAttribute("viewBox");
          viewBox && svg.setAttribute("viewBox", viewBox);
          for (var clone = target.cloneNode(true); clone.childNodes.length; ) {
            fragment.appendChild(clone.firstChild);
          }
          parent.appendChild(fragment);
        }
      }
      function loadreadystatechange(xhr) {
        xhr.onreadystatechange = function() {
          if (4 === xhr.readyState) {
            var cachedDocument = xhr._cachedDocument;
            cachedDocument || (cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument(""), cachedDocument.body.innerHTML = xhr.responseText, xhr._cachedTarget = {}), // clear the xhr embeds list and embed each item
            xhr._embeds.splice(0).map(function(item) {
              var target = xhr._cachedTarget[item.id];
              target || (target = xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id)), // embed the target into the svg
              embed(item.parent, item.svg, target);
            });
          }
        }, // test the ready state change immediately
        xhr.onreadystatechange();
      }
      function svg4everybody2(rawopts) {
        function oninterval() {
          for (var index = 0; index < uses.length; ) {
            var use = uses[index], parent = use.parentNode, svg = getSVGAncestor(parent), src = use.getAttribute("xlink:href") || use.getAttribute("href");
            if (!src && opts.attributeName && (src = use.getAttribute(opts.attributeName)), svg && src) {
              if (polyfill) {
                if (!opts.validate || opts.validate(src, svg, use)) {
                  parent.removeChild(use);
                  var srcSplit = src.split("#"), url = srcSplit.shift(), id = srcSplit.join("#");
                  if (url.length) {
                    var xhr = requests[url];
                    xhr || (xhr = requests[url] = new XMLHttpRequest(), xhr.open("GET", url), xhr.send(), xhr._embeds = []), // add the svg and id as an item to the xhr embeds list
                    xhr._embeds.push({
                      parent,
                      svg,
                      id
                    }), // prepare the xhr ready state change event
                    loadreadystatechange(xhr);
                  } else {
                    embed(parent, svg, document.getElementById(id));
                  }
                } else {
                  ++index, ++numberOfSvgUseElementsToBypass;
                }
              }
            } else {
              ++index;
            }
          }
          (!uses.length || uses.length - numberOfSvgUseElementsToBypass > 0) && requestAnimationFrame(oninterval, 67);
        }
        var polyfill, opts = Object(rawopts), newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/, webkitUA = /\bAppleWebKit\/(\d+)\b/, olderEdgeUA = /\bEdge\/12\.(\d+)\b/, edgeUA = /\bEdge\/.(\d+)\b/, inIframe = window.top !== window.self;
        polyfill = "polyfill" in opts ? opts.polyfill : newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537 || edgeUA.test(navigator.userAgent) && inIframe;
        var requests = {}, requestAnimationFrame = window.requestAnimationFrame || setTimeout, uses = document.getElementsByTagName("use"), numberOfSvgUseElementsToBypass = 0;
        polyfill && oninterval();
      }
      function getSVGAncestor(node) {
        for (var svg = node; "svg" !== svg.nodeName.toLowerCase() && (svg = svg.parentNode); ) {
        }
        return svg;
      }
      return svg4everybody2;
    });
  })(svg4everybody$2);
  return svg4everybody$2.exports;
}
var svg4everybodyExports = requireSvg4everybody();
const svg4everybody = /* @__PURE__ */ getDefaultExportFromCjs(svg4everybodyExports);
(function(arr) {
  arr.forEach(function(item) {
    if (Object.prototype.hasOwnProperty.call(item, "remove")) {
      return;
    }
    Object.defineProperty(item, "remove", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove() {
        this.parentNode.removeChild(this);
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
(function() {
  if (typeof window.CustomEvent === "function") {
    return false;
  }
  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: void 0 };
    const evt = document$1.createEvent("CustomEvent");
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }
  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();
if (typeof Object.assign !== "function") {
  Object.assign = function(target) {
    if (target === null || target === void 0) {
      throw new TypeError("Cannot convert undefined or null to object");
    }
    const to = Object(target);
    for (let index = 1, total = arguments.length; index < total; index++) {
      const nextSource = arguments[index];
      if (nextSource !== null) {
        for (const nextKey in nextSource) {
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  };
}
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
  };
}
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function(s) {
    let matches = (this.document || this.ownerDocument).querySelectorAll(s), i = matches.length - 1;
    while (--i >= 0 && matches.item(i) !== this) {
    }
    return i > -1;
  };
}
if (window.Element && !Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    let matches = (this.document || this.ownerDocument).querySelectorAll(s), i, el = this;
    do {
      i = matches.length;
      while (--i >= 0 && matches.item(i) !== el) {
      }
    } while (i < 0 && (el = el.parentElement));
    return el;
  };
}
(function() {
  let lastTime = 0;
  const vendors = ["ms", "moz", "webkit", "o"];
  for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
    window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
  }
  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback) {
      const currTime = (/* @__PURE__ */ new Date()).getTime();
      const timeToCall = Math.max(0, 16 - (currTime - lastTime));
      const id = window.setTimeout(
        function() {
          callback(currTime + timeToCall);
        },
        timeToCall
      );
      lastTime = currTime + timeToCall;
      return id;
    };
  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
})();
if (/firefox/i.test(navigator.userAgent)) {
  var getComputedStyle = window.getComputedStyle;
  window.getComputedStyle = (el, pseudoEl) => {
    const t = getComputedStyle(el, pseudoEl);
    return t === null ? { getPropertyValue: function() {
    } } : t;
  };
}
if (!window.Promise) {
  window.Promise = Promise$1;
}
svg4everybody();
(function(constructor) {
  if (constructor && constructor.prototype && constructor.prototype.children === null) {
    Object.defineProperty(constructor.prototype, "children", {
      get: function() {
        let i = 0, node, nodes = this.childNodes, children = [];
        while (node = nodes[i++]) {
          if (node.nodeType === 1) {
            children.push(node);
          }
        }
        return children;
      }
    });
  }
})(window.Node || window.Element);
