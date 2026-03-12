import { c as commonjsGlobal, g as getDefaultExportFromCjs, d as document$1 } from "./document.js";
var window_1;
var hasRequiredWindow;
function requireWindow() {
  if (hasRequiredWindow) return window_1;
  hasRequiredWindow = 1;
  var win;
  if (typeof window !== "undefined") {
    win = window;
  } else if (typeof commonjsGlobal !== "undefined") {
    win = commonjsGlobal;
  } else if (typeof self !== "undefined") {
    win = self;
  } else {
    win = {};
  }
  window_1 = win;
  return window_1;
}
var windowExports = requireWindow();
const window$1 = /* @__PURE__ */ getDefaultExportFromCjs(windowExports);
const mejs = {};
mejs.version = "7.1.0";
mejs.html5media = {
  /**
   * @type {String[]}
   */
  properties: [
    // GET/SET
    "volume",
    "src",
    "currentTime",
    "muted",
    // GET only
    "duration",
    "paused",
    "ended",
    "buffered",
    "error",
    "networkState",
    "readyState",
    "seeking",
    "seekable",
    // OTHERS
    "currentSrc",
    "preload",
    "bufferedBytes",
    "bufferedTime",
    "initialTime",
    "startOffsetTime",
    "defaultPlaybackRate",
    "playbackRate",
    "played",
    "autoplay",
    "loop",
    "controls"
  ],
  readOnlyProperties: [
    "duration",
    "paused",
    "ended",
    "buffered",
    "error",
    "networkState",
    "readyState",
    "seeking",
    "seekable"
  ],
  /**
   * @type {String[]}
   */
  methods: [
    "load",
    "play",
    "pause",
    "canPlayType"
  ],
  /**
   * @type {String[]}
   */
  events: [
    "loadstart",
    "durationchange",
    "loadedmetadata",
    "loadeddata",
    "progress",
    "canplay",
    "canplaythrough",
    "suspend",
    "abort",
    "error",
    "emptied",
    "stalled",
    "play",
    "playing",
    "pause",
    "waiting",
    "seeking",
    "seeked",
    "timeupdate",
    "ended",
    "ratechange",
    "volumechange"
  ],
  /**
   * @type {String[]}
   */
  mediaTypes: [
    "audio/mp3",
    "audio/ogg",
    "audio/oga",
    "audio/wav",
    "audio/x-wav",
    "audio/wave",
    "audio/x-pn-wav",
    "audio/mpeg",
    "audio/mp4",
    "video/mp4",
    "video/webm",
    "video/ogg",
    "video/ogv"
  ]
};
window$1.mejs = mejs;
function escapeHTML(input) {
  if (typeof input !== "string") {
    throw new Error("Argument passed must be a string");
  }
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;"
  };
  return input.replace(/[&<>"]/g, (c) => {
    return map[c];
  });
}
function debounce(func, wait, immediate = false) {
  if (typeof func !== "function") {
    throw new Error("First argument must be a function");
  }
  if (typeof wait !== "number") {
    throw new Error("Second argument must be a numeric value");
  }
  let timeout;
  return () => {
    const context = this, args = arguments;
    const later = () => {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}
function isObjectEmpty(instance) {
  return Object.getOwnPropertyNames(instance).length <= 0;
}
function splitEvents(events, id) {
  const rwindow = /^((after|before)print|(before)?unload|hashchange|message|o(ff|n)line|page(hide|show)|popstate|resize|storage)\b/;
  const ret = { d: [], w: [] };
  (events || "").split(" ").forEach((v) => {
    const eventName = "".concat(v).concat(id ? ".".concat(id) : "");
    if (eventName.startsWith(".")) {
      ret.d.push(eventName);
      ret.w.push(eventName);
    } else {
      ret[rwindow.test(v) ? "w" : "d"].push(eventName);
    }
  });
  ret.d = ret.d.join(" ");
  ret.w = ret.w.join(" ");
  return ret;
}
function createEvent(eventName, target, isIframe) {
  if (typeof eventName !== "string") {
    throw new Error("Event name must be a string");
  }
  const eventFrags = eventName.match(/([a-z]+\.([a-z]+))/i), detail = {
    target,
    isIframe
  };
  if (eventFrags !== null) {
    eventName = eventFrags[1];
    detail.namespace = eventFrags[2];
  }
  return new window.CustomEvent(eventName, {
    detail
  });
}
function isNodeAfter(sourceNode, targetNode) {
  return !!(sourceNode && targetNode && sourceNode.compareDocumentPosition(targetNode) & 2);
}
function isString(value) {
  return typeof value === "string";
}
mejs.Utils = mejs.Utils || {};
mejs.Utils.escapeHTML = escapeHTML;
mejs.Utils.debounce = debounce;
mejs.Utils.isObjectEmpty = isObjectEmpty;
mejs.Utils.splitEvents = splitEvents;
mejs.Utils.createEvent = createEvent;
mejs.Utils.isNodeAfter = isNodeAfter;
mejs.Utils.isString = isString;
let typeChecks = [];
function absolutizeUrl(url) {
  if (typeof url !== "string") {
    throw new Error("`url` argument must be a string");
  }
  const el = document.createElement("div");
  el.innerHTML = '<a href="'.concat(escapeHTML(url), '">x</a>');
  return el.firstChild.href;
}
function formatType(url, type = "") {
  return url && !type ? getTypeFromFile(url) : type;
}
function getMimeFromType(type) {
  if (typeof type !== "string") {
    throw new Error("`type` argument must be a string");
  }
  return type && type.indexOf(";") > -1 ? type.substr(0, type.indexOf(";")) : type;
}
function getTypeFromFile(url) {
  if (typeof url !== "string") {
    throw new Error("`url` argument must be a string");
  }
  for (let i = 0, total = typeChecks.length; i < total; i++) {
    const type = typeChecks[i](url);
    if (type) {
      return type;
    }
  }
  const ext = getExtension(url), normalizedExt = normalizeExtension(ext);
  let mime = "video/mp4";
  if (normalizedExt) {
    if (~["mp4", "m4v", "ogg", "ogv", "webm", "mpeg"].indexOf(normalizedExt)) {
      mime = "video/".concat(normalizedExt);
    } else if ("mov" === normalizedExt) {
      mime = "video/quicktime";
    } else if (~["mp3", "oga", "wav", "mid", "midi"].indexOf(normalizedExt)) {
      mime = "audio/".concat(normalizedExt);
    }
  }
  return mime;
}
function getExtension(url) {
  if (typeof url !== "string") {
    throw new Error("`url` argument must be a string");
  }
  const baseUrl = url.split("?")[0], baseName = baseUrl.split("\\").pop().split("/").pop();
  return ~baseName.indexOf(".") ? baseName.substring(baseName.lastIndexOf(".") + 1) : "";
}
function normalizeExtension(extension) {
  if (typeof extension !== "string") {
    throw new Error("`extension` argument must be a string");
  }
  switch (extension) {
    case "mp4":
    case "m4v":
      return "mp4";
    case "webm":
    case "webma":
    case "webmv":
      return "webm";
    case "ogg":
    case "oga":
    case "ogv":
      return "ogg";
    default:
      return extension;
  }
}
mejs.Utils = mejs.Utils || {};
mejs.Utils.typeChecks = typeChecks;
mejs.Utils.absolutizeUrl = absolutizeUrl;
mejs.Utils.formatType = formatType;
mejs.Utils.getMimeFromType = getMimeFromType;
mejs.Utils.getTypeFromFile = getTypeFromFile;
mejs.Utils.getExtension = getExtension;
mejs.Utils.normalizeExtension = normalizeExtension;
class Renderer {
  constructor() {
    this.renderers = {};
    this.order = [];
  }
  /**
   * Register a new renderer.
   *
   * @param {Object} renderer - An object with all the rendered information (name REQUIRED)
   * @method add
   */
  add(renderer2) {
    if (renderer2.name === void 0) {
      throw new TypeError("renderer must contain at least `name` property");
    }
    this.renderers[renderer2.name] = renderer2;
    this.order.push(renderer2.name);
  }
  /**
   * Iterate a list of renderers to determine which one should the player use.
   *
   * @param {Object[]} mediaFiles - A list of source and type obtained from video/audio/source tags: [{src:'',type:''}]
   * @param {?String[]} renderers - Optional list of pre-selected renderers
   * @return {?Object} The renderer's name and source selected
   * @method select
   */
  select(mediaFiles, renderers = []) {
    const renderersLength = renderers.length;
    renderers = renderers.length ? renderers : this.order;
    if (!renderersLength) {
      const rendererIndicator = [
        /^(html5|native)/i,
        /iframe$/i
      ], rendererRanking = (renderer2) => {
        for (let i = 0, total = rendererIndicator.length; i < total; i++) {
          if (rendererIndicator[i].test(renderer2)) {
            return i;
          }
        }
        return rendererIndicator.length;
      };
      renderers.sort((a, b) => {
        return rendererRanking(a) - rendererRanking(b);
      });
    }
    for (let i = 0, total = renderers.length; i < total; i++) {
      const key = renderers[i], renderer2 = this.renderers[key];
      if (renderer2 !== null && renderer2 !== void 0) {
        for (let j = 0, jl = mediaFiles.length; j < jl; j++) {
          if (typeof renderer2.canPlayType === "function" && typeof mediaFiles[j].type === "string" && renderer2.canPlayType(mediaFiles[j].type)) {
            return {
              rendererName: renderer2.name,
              src: mediaFiles[j].src
            };
          }
        }
      }
    }
    return null;
  }
  // Setters/getters
  set order(order) {
    if (!Array.isArray(order)) {
      throw new TypeError("order must be an array of strings.");
    }
    this._order = order;
  }
  set renderers(renderers) {
    if (renderers !== null && typeof renderers !== "object") {
      throw new TypeError("renderers must be an array of objects.");
    }
    this._renderers = renderers;
  }
  get renderers() {
    return this._renderers;
  }
  get order() {
    return this._order;
  }
}
const renderer = new Renderer();
mejs.Renderers = renderer;
function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document$1.createElement("script");
    script.src = url;
    script.async = true;
    script.onload = () => {
      script.remove();
      resolve();
    };
    script.onerror = () => {
      script.remove();
      reject();
    };
    document$1.head.appendChild(script);
  });
}
function offset(el) {
  var rect = el.getBoundingClientRect(), scrollLeft = window$1.pageXOffset || document$1.documentElement.scrollLeft, scrollTop = window$1.pageYOffset || document$1.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}
let hasClassMethod, addClassMethod, removeClassMethod;
if ("classList" in document$1.documentElement) {
  hasClassMethod = (el, className) => el.classList !== void 0 && el.classList.contains(className);
  addClassMethod = (el, className) => el.classList.add(className);
  removeClassMethod = (el, className) => el.classList.remove(className);
} else {
  hasClassMethod = (el, className) => new RegExp("\\b" + className + "\\b").test(el.className);
  addClassMethod = (el, className) => {
    if (!hasClass(el, className)) {
      el.className += " " + className;
    }
  };
  removeClassMethod = (el, className) => {
    el.className = el.className.replace(new RegExp("\\b" + className + "\\b", "g"), "");
  };
}
const hasClass = hasClassMethod;
const addClass = addClassMethod;
const removeClass = removeClassMethod;
function toggleClass(el, className) {
  hasClass(el, className) ? removeClass(el, className) : addClass(el, className);
}
function fadeOut(el, duration = 400, callback) {
  if (!el.style.opacity) {
    el.style.opacity = 1;
  }
  let start = null;
  window$1.requestAnimationFrame(function animate(timestamp) {
    start = start || timestamp;
    const progress = timestamp - start;
    const opacity = parseFloat(1 - progress / duration, 2);
    el.style.opacity = opacity < 0 ? 0 : opacity;
    if (progress > duration) {
      if (callback && typeof callback === "function") {
        callback();
      }
    } else {
      window$1.requestAnimationFrame(animate);
    }
  });
}
function fadeIn(el, duration = 400, callback) {
  if (!el.style.opacity) {
    el.style.opacity = 0;
  }
  let start = null;
  window$1.requestAnimationFrame(function animate(timestamp) {
    start = start || timestamp;
    const progress = timestamp - start;
    const opacity = parseFloat(progress / duration, 2);
    el.style.opacity = opacity > 1 ? 1 : opacity;
    if (progress > duration) {
      if (callback && typeof callback === "function") {
        callback();
      }
    } else {
      window$1.requestAnimationFrame(animate);
    }
  });
}
function siblings(el, filter) {
  const siblings2 = [];
  el = el.parentNode.firstChild;
  do {
    if (!filter || filter(el)) {
      siblings2.push(el);
    }
  } while (el = el.nextSibling);
  return siblings2;
}
function visible(elem) {
  if (elem.getClientRects !== void 0 && elem.getClientRects === "function") {
    return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
  }
  return !!(elem.offsetWidth || elem.offsetHeight);
}
function ajax(url, dataType, success, error) {
  const xhr = window$1.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  let type = "application/x-www-form-urlencoded; charset=UTF-8", completed = false, accept = "*/".concat("*");
  switch (dataType) {
    case "text":
      type = "text/plain";
      break;
    case "json":
      type = "application/json, text/javascript";
      break;
    case "html":
      type = "text/html";
      break;
    case "xml":
      type = "application/xml, text/xml";
      break;
  }
  if (type !== "application/x-www-form-urlencoded") {
    accept = "".concat(type, ", */*; q=0.01");
  }
  if (xhr) {
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Accept", accept);
    xhr.onreadystatechange = function() {
      if (completed) {
        return;
      }
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          completed = true;
          let data;
          switch (dataType) {
            case "json":
              data = JSON.parse(xhr.responseText);
              break;
            case "xml":
              data = xhr.responseXML;
              break;
            default:
              data = xhr.responseText;
              break;
          }
          success(data);
        } else if (typeof error === "function") {
          error(xhr.status);
        }
      }
    };
    xhr.send();
  }
}
mejs.Utils = mejs.Utils || {};
mejs.Utils.offset = offset;
mejs.Utils.hasClass = hasClass;
mejs.Utils.addClass = addClass;
mejs.Utils.removeClass = removeClass;
mejs.Utils.toggleClass = toggleClass;
mejs.Utils.fadeIn = fadeIn;
mejs.Utils.fadeOut = fadeOut;
mejs.Utils.siblings = siblings;
mejs.Utils.visible = visible;
mejs.Utils.ajax = ajax;
mejs.Utils.loadScript = loadScript;
export {
  absolutizeUrl as a,
  isNodeAfter as b,
  createEvent as c,
  addClass as d,
  escapeHTML as e,
  formatType as f,
  getTypeFromFile as g,
  hasClass as h,
  isObjectEmpty as i,
  fadeIn as j,
  removeClass as k,
  fadeOut as l,
  mejs as m,
  isString as n,
  loadScript as o,
  renderer as r,
  splitEvents as s,
  typeChecks as t,
  visible as v,
  window$1 as w
};
