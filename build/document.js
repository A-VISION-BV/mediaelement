var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n) {
  if (Object.prototype.hasOwnProperty.call(n, "__esModule")) return n;
  var f = n.default;
  if (typeof f == "function") {
    var a = function a2() {
      var isInstance = false;
      try {
        isInstance = this instanceof a2;
      } catch (e) {
      }
      if (isInstance) {
        return Reflect.construct(f, arguments, this.constructor);
      }
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
const __viteBrowserExternal = {};
const __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __viteBrowserExternal
}, Symbol.toStringTag, { value: "Module" }));
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
var document_1;
var hasRequiredDocument;
function requireDocument() {
  if (hasRequiredDocument) return document_1;
  hasRequiredDocument = 1;
  var topLevel = typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof window !== "undefined" ? window : {};
  var minDoc = require$$0;
  var doccy;
  if (typeof document !== "undefined") {
    doccy = document;
  } else {
    doccy = topLevel["__GLOBAL_DOCUMENT_CACHE@4"];
    if (!doccy) {
      doccy = topLevel["__GLOBAL_DOCUMENT_CACHE@4"] = minDoc;
    }
  }
  document_1 = doccy;
  return document_1;
}
var documentExports = requireDocument();
const document$1 = /* @__PURE__ */ getDefaultExportFromCjs(documentExports);
export {
  commonjsGlobal as c,
  document$1 as d,
  getDefaultExportFromCjs as g
};
