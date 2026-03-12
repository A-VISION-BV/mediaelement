import { w as window, m as mejs, f as formatType, r as renderer, c as createEvent, g as getTypeFromFile, a as absolutizeUrl, i as isObjectEmpty, e as escapeHTML, b as isNodeAfter, h as hasClass, d as addClass, j as fadeIn, k as removeClass, l as fadeOut, v as visible, n as isString, s as splitEvents } from "./dom.js";
import { d as document$1 } from "./document.js";
const NAV = window.navigator;
const UA = NAV.userAgent.toLowerCase();
const IS_IPAD = /ipad/i.test(UA) && !window.MSStream;
const IS_IPHONE = /iphone/i.test(UA) && !window.MSStream;
const IS_IPOD = /ipod/i.test(UA) && !window.MSStream;
const IS_IOS = iOS();
function iOS() {
  return [
    "iPad Simulator",
    "iPhone Simulator",
    "iPod Simulator",
    "iPad",
    "iPhone",
    "iPod"
  ].includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend" in document$1;
}
const IS_ANDROID = /android/i.test(UA);
const IS_IE = /(trident|microsoft)/i.test(NAV.appName);
const IS_EDGE = "msLaunchUri" in NAV && !("documentMode" in document$1);
const IS_CHROME = /chrome/i.test(UA);
const IS_FIREFOX = /firefox/i.test(UA);
const IS_SAFARI = /safari/i.test(UA) && !IS_CHROME;
const IS_STOCK_ANDROID = /^mozilla\/\d+\.\d+\s\(linux;\su;/i.test(UA);
const HAS_MSE = "MediaSource" in window;
const SUPPORT_POINTER_EVENTS = true;
const SUPPORT_PASSIVE_EVENT = (() => {
  let supportsPassive = false;
  try {
    const opts = Object.defineProperty({}, "passive", {
      get: function() {
        supportsPassive = true;
        return true;
      }
    });
    window.addEventListener("test", null, opts);
  } catch (e) {
  }
  return supportsPassive;
})();
const html5Elements = ["source", "track", "audio", "video"];
let video;
for (let i = 0, total = html5Elements.length; i < total; i++) {
  video = document$1.createElement(html5Elements[i]);
}
const SUPPORTS_NATIVE_HLS = IS_SAFARI || IS_IE && /edge/i.test(UA);
let hasiOSFullScreen = video.webkitEnterFullscreen !== void 0;
let hasNativeFullscreen = video.requestFullscreen !== void 0;
if (hasiOSFullScreen && /mac os x 10_5/i.test(UA)) {
  hasNativeFullscreen = false;
  hasiOSFullScreen = false;
}
const hasWebkitNativeFullScreen = video.webkitRequestFullScreen !== void 0;
const hasMozNativeFullScreen = video.mozRequestFullScreen !== void 0;
const hasMsNativeFullScreen = video.msRequestFullscreen !== void 0;
const hasTrueNativeFullScreen = hasWebkitNativeFullScreen || hasMozNativeFullScreen || hasMsNativeFullScreen;
let nativeFullScreenEnabled = hasTrueNativeFullScreen;
let fullScreenEventName = "";
let isFullScreen, requestFullScreen, cancelFullScreen;
if (hasMozNativeFullScreen) {
  nativeFullScreenEnabled = document$1.mozFullScreenEnabled;
} else if (hasMsNativeFullScreen) {
  nativeFullScreenEnabled = document$1.msFullscreenEnabled;
}
if (IS_CHROME) {
  hasiOSFullScreen = false;
}
if (hasTrueNativeFullScreen) {
  if (hasWebkitNativeFullScreen) {
    fullScreenEventName = "webkitfullscreenchange";
  } else if (hasMozNativeFullScreen) {
    fullScreenEventName = "fullscreenchange";
  } else if (hasMsNativeFullScreen) {
    fullScreenEventName = "MSFullscreenChange";
  }
  isFullScreen = () => {
    if (hasMozNativeFullScreen) {
      return document$1.mozFullScreen;
    } else if (hasWebkitNativeFullScreen) {
      return document$1.webkitIsFullScreen;
    } else if (hasMsNativeFullScreen) {
      return document$1.msFullscreenElement !== null;
    }
  };
  requestFullScreen = (el) => {
    if (hasWebkitNativeFullScreen) {
      el.webkitRequestFullScreen();
    } else if (hasMozNativeFullScreen) {
      el.mozRequestFullScreen();
    } else if (hasMsNativeFullScreen) {
      el.msRequestFullscreen();
    }
  };
  cancelFullScreen = () => {
    if (hasWebkitNativeFullScreen) {
      document$1.webkitCancelFullScreen();
    } else if (hasMozNativeFullScreen) {
      document$1.mozCancelFullScreen();
    } else if (hasMsNativeFullScreen) {
      document$1.msExitFullscreen();
    }
  };
}
const HAS_NATIVE_FULLSCREEN = hasNativeFullscreen;
const HAS_WEBKIT_NATIVE_FULLSCREEN = hasWebkitNativeFullScreen;
const HAS_MOZ_NATIVE_FULLSCREEN = hasMozNativeFullScreen;
const HAS_MS_NATIVE_FULLSCREEN = hasMsNativeFullScreen;
const HAS_IOS_FULLSCREEN = hasiOSFullScreen;
const HAS_TRUE_NATIVE_FULLSCREEN = hasTrueNativeFullScreen;
const HAS_NATIVE_FULLSCREEN_ENABLED = nativeFullScreenEnabled;
const FULLSCREEN_EVENT_NAME = fullScreenEventName;
mejs.Features = mejs.Features || {};
mejs.Features.isiPad = IS_IPAD;
mejs.Features.isiPod = IS_IPOD;
mejs.Features.isiPhone = IS_IPHONE;
mejs.Features.isiOS = mejs.Features.isiPhone || mejs.Features.isiPad;
mejs.Features.isAndroid = IS_ANDROID;
mejs.Features.isIE = IS_IE;
mejs.Features.isEdge = IS_EDGE;
mejs.Features.isChrome = IS_CHROME;
mejs.Features.isFirefox = IS_FIREFOX;
mejs.Features.isSafari = IS_SAFARI;
mejs.Features.isStockAndroid = IS_STOCK_ANDROID;
mejs.Features.hasMSE = HAS_MSE;
mejs.Features.supportsNativeHLS = SUPPORTS_NATIVE_HLS;
mejs.Features.supportsPointerEvents = SUPPORT_POINTER_EVENTS;
mejs.Features.supportsPassiveEvent = SUPPORT_PASSIVE_EVENT;
mejs.Features.hasiOSFullScreen = HAS_IOS_FULLSCREEN;
mejs.Features.hasNativeFullscreen = HAS_NATIVE_FULLSCREEN;
mejs.Features.hasWebkitNativeFullScreen = HAS_WEBKIT_NATIVE_FULLSCREEN;
mejs.Features.hasMozNativeFullScreen = HAS_MOZ_NATIVE_FULLSCREEN;
mejs.Features.hasMsNativeFullScreen = HAS_MS_NATIVE_FULLSCREEN;
mejs.Features.hasTrueNativeFullScreen = HAS_TRUE_NATIVE_FULLSCREEN;
mejs.Features.nativeFullScreenEnabled = HAS_NATIVE_FULLSCREEN_ENABLED;
mejs.Features.fullScreenEventName = FULLSCREEN_EVENT_NAME;
mejs.Features.isFullScreen = isFullScreen;
mejs.Features.requestFullScreen = requestFullScreen;
mejs.Features.cancelFullScreen = cancelFullScreen;
class MediaElement {
  /**
   *
   * @param {String|Node} idOrNode
   * @param {Object} options
   * @param {Object[]} sources
   * @returns {Element|*}
   */
  constructor(idOrNode, options, sources) {
    const t = this;
    sources = Array.isArray(sources) ? sources : null;
    t.defaults = {
      /**
       * List of the renderers to use
       * @type {String[]}
       */
      renderers: [],
      /**
       * Name of MediaElement container
       * @type {String}
       */
      fakeNodeName: "div",
      /**
       * The path where the icon sprite is located
       * @type {String}
       */
      iconSprite: "mejs-controls.svg"
    };
    options = Object.assign(t.defaults, options);
    t.mediaElement = document$1.createElement(options.fakeNodeName);
    let id = idOrNode, error = false;
    if (typeof idOrNode === "string") {
      t.mediaElement.originalNode = document$1.getElementById(idOrNode);
    } else {
      t.mediaElement.originalNode = idOrNode;
      id = idOrNode.id;
    }
    if (t.mediaElement.originalNode === void 0 || t.mediaElement.originalNode === null) {
      return null;
    }
    t.mediaElement.options = options;
    id = id || "mejs_".concat(Math.random().toString().slice(2));
    t.mediaElement.originalNode.setAttribute("id", "".concat(id, "_from_mejs"));
    const tagName = t.mediaElement.originalNode.tagName.toLowerCase();
    if (["video", "audio"].indexOf(tagName) > -1 && !t.mediaElement.originalNode.getAttribute("preload")) {
      t.mediaElement.originalNode.setAttribute("preload", "none");
    }
    t.mediaElement.originalNode.setAttribute("tabindex", -1);
    t.mediaElement.originalNode.parentNode.insertBefore(t.mediaElement, t.mediaElement.originalNode);
    t.mediaElement.appendChild(t.mediaElement.originalNode);
    const processURL = (url, type) => {
      if (window.location.protocol === "https:" && url.indexOf("http:") === 0 && IS_IOS && mejs.html5media.mediaTypes.indexOf(type) > -1) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if (this.readyState === 4 && this.status === 200) {
            const url2 = window.URL || window.webkitURL, blobUrl = url2.createObjectURL(this.response);
            t.mediaElement.originalNode.setAttribute("src", blobUrl);
            return blobUrl;
          }
          return url;
        };
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.send();
      }
      return url;
    };
    let mediaFiles;
    if (sources !== null) {
      mediaFiles = sources;
    } else if (t.mediaElement.originalNode !== null) {
      mediaFiles = [];
      switch (t.mediaElement.originalNode.nodeName.toLowerCase()) {
        case "iframe":
          mediaFiles.push({
            type: "",
            src: t.mediaElement.originalNode.getAttribute("src")
          });
          break;
        case "audio":
        case "video":
          const sources2 = t.mediaElement.originalNode.children.length, nodeSource = t.mediaElement.originalNode.getAttribute("src");
          if (nodeSource) {
            const node = t.mediaElement.originalNode, type = formatType(nodeSource, node.getAttribute("type"));
            mediaFiles.push({
              type,
              src: processURL(nodeSource, type)
            });
          }
          for (let i = 0; i < sources2; i++) {
            const n = t.mediaElement.originalNode.children[i];
            if (n.tagName.toLowerCase() === "source") {
              const src = n.getAttribute("src"), type = formatType(src, n.getAttribute("type"));
              mediaFiles.push({ type, src: processURL(src, type) });
            }
          }
          break;
      }
    }
    t.mediaElement.id = id;
    t.mediaElement.renderers = {};
    t.mediaElement.events = {};
    t.mediaElement.promises = [];
    t.mediaElement.renderer = null;
    t.mediaElement.rendererName = null;
    t.mediaElement.changeRenderer = (rendererName, mediaFiles2) => {
      const t2 = this, media = Object.keys(mediaFiles2[0]).length > 2 ? mediaFiles2[0] : mediaFiles2[0].src;
      if (t2.mediaElement.renderer !== void 0 && t2.mediaElement.renderer !== null && t2.mediaElement.renderer.name === rendererName) {
        t2.mediaElement.renderer.pause();
        t2.mediaElement.renderer.show();
        t2.mediaElement.renderer.setSrc(media);
        return true;
      }
      if (t2.mediaElement.renderer !== void 0 && t2.mediaElement.renderer !== null) {
        t2.mediaElement.renderer.pause();
        t2.mediaElement.renderer.hide();
      }
      let newRenderer = t2.mediaElement.renderers[rendererName], newRendererType = null;
      if (newRenderer !== void 0 && newRenderer !== null) {
        newRenderer.show();
        newRenderer.setSrc(media);
        t2.mediaElement.renderer = newRenderer;
        t2.mediaElement.rendererName = rendererName;
        return true;
      }
      const rendererArray = t2.mediaElement.options.renderers.length ? t2.mediaElement.options.renderers : renderer.order;
      for (let i = 0, total = rendererArray.length; i < total; i++) {
        const index = rendererArray[i];
        if (index === rendererName) {
          const rendererList = renderer.renderers;
          newRendererType = rendererList[index];
          const renderOptions = Object.assign(newRendererType.options, t2.mediaElement.options);
          newRenderer = newRendererType.create(t2.mediaElement, renderOptions, mediaFiles2);
          newRenderer.name = rendererName;
          t2.mediaElement.renderers[newRendererType.name] = newRenderer;
          t2.mediaElement.renderer = newRenderer;
          t2.mediaElement.rendererName = rendererName;
          newRenderer.show();
          return true;
        }
      }
      return false;
    };
    t.mediaElement.setSize = (width, height) => {
      if (t.mediaElement.renderer !== void 0 && t.mediaElement.renderer !== null) {
        t.mediaElement.renderer.setSize(width, height);
      }
    };
    t.mediaElement.generateError = (message, urlList) => {
      message = message || "";
      urlList = Array.isArray(urlList) ? urlList : [];
      const event = createEvent("error", t.mediaElement);
      event.message = message;
      event.urls = urlList;
      t.mediaElement.dispatchEvent(event);
      error = true;
    };
    const props = mejs.html5media.properties, methods = mejs.html5media.methods, addProperty = (obj, name, onGet, onSet) => {
      let oldValue = obj[name];
      const getFn = () => onGet.apply(obj, [oldValue]), setFn = (newValue) => {
        oldValue = onSet.apply(obj, [newValue]);
        return oldValue;
      };
      Object.defineProperty(obj, name, {
        get: getFn,
        set: setFn
      });
    }, assignGettersSetters = (propName) => {
      if (propName !== "src") {
        const capName = "".concat(propName.substring(0, 1).toUpperCase()).concat(propName.substring(1)), getFn = () => t.mediaElement.renderer !== void 0 && t.mediaElement.renderer !== null && typeof t.mediaElement.renderer["get".concat(capName)] === "function" ? t.mediaElement.renderer["get".concat(capName)]() : null, setFn = (value) => {
          if (t.mediaElement.renderer !== void 0 && t.mediaElement.renderer !== null && typeof t.mediaElement.renderer["set".concat(capName)] === "function") {
            t.mediaElement.renderer["set".concat(capName)](value);
          }
        };
        addProperty(t.mediaElement, propName, getFn, setFn);
        t.mediaElement["get".concat(capName)] = getFn;
        t.mediaElement["set".concat(capName)] = setFn;
      }
    }, getSrc = () => t.mediaElement.renderer !== void 0 && t.mediaElement.renderer !== null ? t.mediaElement.renderer.getSrc() : null, setSrc = (value) => {
      const mediaFiles2 = [];
      if (typeof value === "string") {
        mediaFiles2.push({
          src: value,
          type: value ? getTypeFromFile(value) : ""
        });
      } else if (typeof value === "object" && value.src !== void 0) {
        const src = absolutizeUrl(value.src), type = value.type, media = Object.assign(value, {
          src,
          type: (type === "" || type === null || type === void 0) && src ? getTypeFromFile(src) : type
        });
        mediaFiles2.push(media);
      } else if (Array.isArray(value)) {
        for (let i = 0, total = value.length; i < total; i++) {
          const src = absolutizeUrl(value[i].src), type = value[i].type, media = Object.assign(value[i], {
            src,
            type: (type === "" || type === null || type === void 0) && src ? getTypeFromFile(src) : type
          });
          mediaFiles2.push(media);
        }
      }
      let renderInfo = renderer.select(
        mediaFiles2,
        t.mediaElement.options.renderers.length ? t.mediaElement.options.renderers : []
      ), event;
      if (!t.mediaElement.paused && !(t.mediaElement.src == null || t.mediaElement.src === "")) {
        t.mediaElement.pause();
        event = createEvent("pause", t.mediaElement);
        t.mediaElement.dispatchEvent(event);
      }
      t.mediaElement.originalNode.src = mediaFiles2[0].src || "";
      if (renderInfo === null && mediaFiles2[0].src) {
        t.mediaElement.generateError("No renderer found", mediaFiles2);
        return;
      }
      var shouldChangeRenderer = !(mediaFiles2[0].src == null || mediaFiles2[0].src === "");
      return shouldChangeRenderer ? t.mediaElement.changeRenderer(renderInfo.rendererName, mediaFiles2) : null;
    }, triggerAction = (methodName, args) => {
      try {
        if (methodName === "play" && (t.mediaElement.rendererName === "native_dash" || t.mediaElement.rendererName === "native_hls" || t.mediaElement.rendererName === "vimeo_iframe")) {
          const response = t.mediaElement.renderer[methodName](args);
          if (response && typeof response.then === "function") {
            response.catch(() => {
              if (t.mediaElement.paused) {
                setTimeout(() => {
                  const tmpResponse = t.mediaElement.renderer.play();
                  if (tmpResponse !== void 0) {
                    tmpResponse.catch(() => {
                      if (!t.mediaElement.renderer.paused) {
                        t.mediaElement.renderer.pause();
                      }
                    });
                  }
                }, 150);
              }
            });
          }
          return response;
        } else {
          return t.mediaElement.renderer[methodName](args);
        }
      } catch (e) {
        t.mediaElement.generateError(e, mediaFiles);
        throw e;
      }
    }, assignMethods = (methodName) => {
      t.mediaElement[methodName] = (...args) => {
        if (t.mediaElement.renderer !== void 0 && t.mediaElement.renderer !== null && typeof t.mediaElement.renderer[methodName] === "function") {
          if (t.mediaElement.promises.length) {
            return Promise.all(t.mediaElement.promises).then(() => {
              return triggerAction(methodName, args);
            }).catch((e) => {
              t.mediaElement.generateError(e, mediaFiles);
              return Promise.reject(e);
            });
          } else {
            return triggerAction(methodName, args);
          }
        }
        return null;
      };
    };
    addProperty(t.mediaElement, "src", getSrc, setSrc);
    t.mediaElement.getSrc = getSrc;
    t.mediaElement.setSrc = setSrc;
    for (let i = 0, total = props.length; i < total; i++) {
      assignGettersSetters(props[i]);
    }
    for (let i = 0, total = methods.length; i < total; i++) {
      assignMethods(methods[i]);
    }
    t.mediaElement.addEventListener = (eventName, callback) => {
      t.mediaElement.events[eventName] = t.mediaElement.events[eventName] || [];
      t.mediaElement.events[eventName].push(callback);
    };
    t.mediaElement.removeEventListener = (eventName, callback) => {
      if (!eventName) {
        t.mediaElement.events = {};
        return true;
      }
      const callbacks = t.mediaElement.events[eventName];
      if (!callbacks) {
        return true;
      }
      if (!callback) {
        t.mediaElement.events[eventName] = [];
        return true;
      }
      for (let i = 0; i < callbacks.length; i++) {
        if (callbacks[i] === callback) {
          t.mediaElement.events[eventName].splice(i, 1);
          return true;
        }
      }
      return false;
    };
    t.mediaElement.dispatchEvent = (event) => {
      const callbacks = t.mediaElement.events[event.type];
      if (callbacks) {
        for (let i = 0; i < callbacks.length; i++) {
          callbacks[i].apply(null, [event]);
        }
      }
    };
    t.mediaElement.destroy = () => {
      const mediaElement = t.mediaElement.originalNode.cloneNode(true);
      const wrapper = t.mediaElement.parentElement;
      mediaElement.removeAttribute("id");
      mediaElement.remove();
      t.mediaElement.remove();
      wrapper.appendChild(mediaElement);
    };
    if (mediaFiles.length) {
      t.mediaElement.src = mediaFiles;
    }
    if (t.mediaElement.promises.length) {
      Promise.all(t.mediaElement.promises).then(() => {
        if (t.mediaElement.options.success) {
          t.mediaElement.options.success(t.mediaElement, t.mediaElement.originalNode);
        }
      }).catch(() => {
        if (error && t.mediaElement.options.error) {
          t.mediaElement.options.error(t.mediaElement, t.mediaElement.originalNode);
        }
      });
    } else {
      if (t.mediaElement.options.success) {
        t.mediaElement.options.success(t.mediaElement, t.mediaElement.originalNode);
      }
      if (error && t.mediaElement.options.error) {
        t.mediaElement.options.error(t.mediaElement, t.mediaElement.originalNode);
      }
    }
    return t.mediaElement;
  }
}
window.MediaElement = MediaElement;
mejs.MediaElement = MediaElement;
class DefaultPlayer {
  /**
   *
   * @param {MediaElementPlayer} player
   */
  constructor(player) {
    this.media = player.media;
    this.isVideo = player.isVideo;
    this.classPrefix = player.options.classPrefix;
    this.createIframeLayer = () => player.createIframeLayer();
    this.setPoster = (url) => player.setPoster(url);
    return this;
  }
  get paused() {
    return this.media.paused;
  }
  set muted(muted) {
    this.setMuted(muted);
  }
  get muted() {
    return this.media.muted;
  }
  get ended() {
    return this.media.ended;
  }
  get readyState() {
    return this.media.readyState;
  }
  set currentTime(time) {
    this.setCurrentTime(time);
  }
  get currentTime() {
    return this.getCurrentTime();
  }
  get duration() {
    return this.getDuration();
  }
  get remainingTime() {
    return this.getDuration() - this.currentTime();
  }
  set volume(volume) {
    this.setVolume(volume);
  }
  get volume() {
    return this.getVolume();
  }
  set src(src) {
    this.setSrc(src);
  }
  get src() {
    return this.getSrc();
  }
  play() {
    return this.media.play();
  }
  pause() {
    return this.media.pause();
  }
  load() {
    const t = this;
    if (!t.isLoaded) {
      t.media.load();
    }
    t.isLoaded = true;
  }
  setCurrentTime(time) {
    this.media.setCurrentTime(time);
  }
  getCurrentTime() {
    return this.media.currentTime;
  }
  getDuration() {
    let duration = this.media.getDuration();
    if (duration === Infinity && this.media.seekable && this.media.seekable.length) {
      duration = this.media.seekable.end(0);
    }
    return duration;
  }
  setVolume(volume) {
    this.media.setVolume(volume);
  }
  getVolume() {
    return this.media.getVolume();
  }
  setMuted(value) {
    this.media.setMuted(value);
  }
  setSrc(src) {
    const t = this, layer = document.getElementById("".concat(t.media.id, "-iframe-overlay"));
    if (layer) {
      layer.remove();
    }
    t.media.setSrc(src);
    t.createIframeLayer();
    if (t.media.renderer !== null && typeof t.media.renderer.getPosterUrl === "function") {
      t.setPoster(t.media.renderer.getPosterUrl());
    }
  }
  getSrc() {
    return this.media.getSrc();
  }
  canPlayType(type) {
    return this.media.canPlayType(type);
  }
}
window.DefaultPlayer = DefaultPlayer;
const EN = {
  "mejs.plural-form": 1,
  // core/mediaelement.js
  "mejs.download-file": "Download File",
  // features/fullscreen.js
  "mejs.fullscreen": "Fullscreen",
  // features/playpause.js
  "mejs.play": "Play",
  "mejs.pause": "Pause",
  // features/progress.js
  "mejs.time-slider": "Time Slider",
  "mejs.time-help-text": "Use Left/Right Arrow keys to advance one second, Up/Down arrows to advance ten seconds.",
  "mejs.live-broadcast": "Live Broadcast",
  // features/time.js
  "mejs.current": "Current time",
  "mejs.duration": "Total duration",
  // features/volume.js
  "mejs.volume-help-text": "Use Up/Down Arrow keys to increase or decrease volume.",
  "mejs.unmute": "Unmute",
  "mejs.mute": "Mute",
  "mejs.volume-slider": "Volume Slider",
  // core/player.js
  "mejs.video-player": "Video Player",
  "mejs.audio-player": "Audio Player",
  // features/tracks.js
  "mejs.captions-subtitles": "Captions/Subtitles",
  "mejs.captions-chapters": "Chapters",
  "mejs.none": "None",
  "mejs.afrikaans": "Afrikaans",
  "mejs.albanian": "Albanian",
  "mejs.arabic": "Arabic",
  "mejs.belarusian": "Belarusian",
  "mejs.bulgarian": "Bulgarian",
  "mejs.catalan": "Catalan",
  "mejs.chinese": "Chinese",
  "mejs.chinese-simplified": "Chinese (Simplified)",
  "mejs.chinese-traditional": "Chinese (Traditional)",
  "mejs.croatian": "Croatian",
  "mejs.czech": "Czech",
  "mejs.danish": "Danish",
  "mejs.dutch": "Dutch",
  "mejs.english": "English",
  "mejs.estonian": "Estonian",
  "mejs.filipino": "Filipino",
  "mejs.finnish": "Finnish",
  "mejs.french": "French",
  "mejs.galician": "Galician",
  "mejs.german": "German",
  "mejs.greek": "Greek",
  "mejs.haitian-creole": "Haitian Creole",
  "mejs.hebrew": "Hebrew",
  "mejs.hindi": "Hindi",
  "mejs.hungarian": "Hungarian",
  "mejs.icelandic": "Icelandic",
  "mejs.indonesian": "Indonesian",
  "mejs.irish": "Irish",
  "mejs.italian": "Italian",
  "mejs.japanese": "Japanese",
  "mejs.korean": "Korean",
  "mejs.latvian": "Latvian",
  "mejs.lithuanian": "Lithuanian",
  "mejs.macedonian": "Macedonian",
  "mejs.malay": "Malay",
  "mejs.maltese": "Maltese",
  "mejs.norwegian": "Norwegian",
  "mejs.persian": "Persian",
  "mejs.polish": "Polish",
  "mejs.portuguese": "Portuguese",
  "mejs.romanian": "Romanian",
  "mejs.russian": "Russian",
  "mejs.serbian": "Serbian",
  "mejs.slovak": "Slovak",
  "mejs.slovenian": "Slovenian",
  "mejs.spanish": "Spanish",
  "mejs.swahili": "Swahili",
  "mejs.swedish": "Swedish",
  "mejs.tagalog": "Tagalog",
  "mejs.thai": "Thai",
  "mejs.turkish": "Turkish",
  "mejs.ukrainian": "Ukrainian",
  "mejs.vietnamese": "Vietnamese",
  "mejs.welsh": "Welsh",
  "mejs.yiddish": "Yiddish"
};
const i18n = { lang: "en", en: EN };
i18n.language = (...args) => {
  if (args !== null && args !== void 0 && args.length) {
    if (typeof args[0] !== "string") {
      throw new TypeError("Language code must be a string value");
    }
    if (!/^[a-z]{2,3}((-|_)[a-z]{2})?$/i.test(args[0])) {
      throw new TypeError("Language code must have format 2-3 letters and. optionally, hyphen, underscore followed by 2 more letters");
    }
    i18n.lang = args[0];
    if (i18n[args[0]] === void 0) {
      args[1] = args[1] !== null && args[1] !== void 0 && typeof args[1] === "object" ? args[1] : {};
      i18n[args[0]] = !isObjectEmpty(args[1]) ? args[1] : EN;
    } else if (args[1] !== null && args[1] !== void 0 && typeof args[1] === "object") {
      i18n[args[0]] = args[1];
    }
  }
  return i18n.lang;
};
i18n.t = (message, pluralParam = null) => {
  if (typeof message === "string" && message.length) {
    let str, pluralForm;
    const language = i18n.language();
    const _plural = (input, number, form) => {
      if (typeof input !== "object" || typeof number !== "number" || typeof form !== "number") {
        return input;
      }
      const _pluralForms = /* @__PURE__ */ (() => {
        return [
          // 0: Chinese, Japanese, Korean, Persian, Turkish, Thai, Lao, Aymará,
          // Tibetan, Chiga, Dzongkha, Indonesian, Lojban, Georgian, Kazakh, Khmer, Kyrgyz, Malay,
          // Burmese, Yakut, Sundanese, Tatar, Uyghur, Vietnamese, Wolof
          (...args) => args[1],
          // 1: Danish, Dutch, English, Faroese, Frisian, German, Norwegian, Swedish, Estonian, Finnish,
          // Hungarian, Basque, Greek, Hebrew, Italian, Portuguese, Spanish, Catalan, Afrikaans,
          // Angika, Assamese, Asturian, Azerbaijani, Bulgarian, Bengali, Bodo, Aragonese, Dogri,
          // Esperanto, Argentinean Spanish, Fulah, Friulian, Galician, Gujarati, Hausa,
          // Hindi, Chhattisgarhi, Armenian, Interlingua, Greenlandic, Kannada, Kurdish, Letzeburgesch,
          // Maithili, Malayalam, Mongolian, Manipuri, Marathi, Nahuatl, Neapolitan, Norwegian Bokmal,
          // Nepali, Norwegian Nynorsk, Norwegian (old code), Northern Sotho, Oriya, Punjabi, Papiamento,
          // Piemontese, Pashto, Romansh, Kinyarwanda, Santali, Scots, Sindhi, Northern Sami, Sinhala,
          // Somali, Songhay, Albanian, Swahili, Tamil, Telugu, Turkmen, Urdu, Yoruba
          (...args) => args[0] === 1 ? args[1] : args[2],
          // 2: French, Brazilian Portuguese, Acholi, Akan, Amharic, Mapudungun, Breton, Filipino,
          // Gun, Lingala, Mauritian Creole, Malagasy, Maori, Occitan, Tajik, Tigrinya, Uzbek, Walloon
          (...args) => args[0] === 0 || args[0] === 1 ? args[1] : args[2],
          // 3: Latvian
          (...args) => {
            if (args[0] % 10 === 1 && args[0] % 100 !== 11) {
              return args[1];
            } else if (args[0] !== 0) {
              return args[2];
            } else {
              return args[3];
            }
          },
          // 4: Scottish Gaelic
          (...args) => {
            if (args[0] === 1 || args[0] === 11) {
              return args[1];
            } else if (args[0] === 2 || args[0] === 12) {
              return args[2];
            } else if (args[0] > 2 && args[0] < 20) {
              return args[3];
            } else {
              return args[4];
            }
          },
          // 5:  Romanian
          (...args) => {
            if (args[0] === 1) {
              return args[1];
            } else if (args[0] === 0 || args[0] % 100 > 0 && args[0] % 100 < 20) {
              return args[2];
            } else {
              return args[3];
            }
          },
          // 6: Lithuanian
          (...args) => {
            if (args[0] % 10 === 1 && args[0] % 100 !== 11) {
              return args[1];
            } else if (args[0] % 10 >= 2 && (args[0] % 100 < 10 || args[0] % 100 >= 20)) {
              return args[2];
            } else {
              return [3];
            }
          },
          // 7: Belarusian, Bosnian, Croatian, Serbian, Russian, Ukrainian
          (...args) => {
            if (args[0] % 10 === 1 && args[0] % 100 !== 11) {
              return args[1];
            } else if (args[0] % 10 >= 2 && args[0] % 10 <= 4 && (args[0] % 100 < 10 || args[0] % 100 >= 20)) {
              return args[2];
            } else {
              return args[3];
            }
          },
          // 8:  Slovak, Czech
          (...args) => {
            if (args[0] === 1) {
              return args[1];
            } else if (args[0] >= 2 && args[0] <= 4) {
              return args[2];
            } else {
              return args[3];
            }
          },
          // 9: Polish
          (...args) => {
            if (args[0] === 1) {
              return args[1];
            } else if (args[0] % 10 >= 2 && args[0] % 10 <= 4 && (args[0] % 100 < 10 || args[0] % 100 >= 20)) {
              return args[2];
            } else {
              return args[3];
            }
          },
          // 10: Slovenian
          (...args) => {
            if (args[0] % 100 === 1) {
              return args[2];
            } else if (args[0] % 100 === 2) {
              return args[3];
            } else if (args[0] % 100 === 3 || args[0] % 100 === 4) {
              return args[4];
            } else {
              return args[1];
            }
          },
          // 11: Irish Gaelic
          (...args) => {
            if (args[0] === 1) {
              return args[1];
            } else if (args[0] === 2) {
              return args[2];
            } else if (args[0] > 2 && args[0] < 7) {
              return args[3];
            } else if (args[0] > 6 && args[0] < 11) {
              return args[4];
            } else {
              return args[5];
            }
          },
          // 12: Arabic
          (...args) => {
            if (args[0] === 0) {
              return args[1];
            } else if (args[0] === 1) {
              return args[2];
            } else if (args[0] === 2) {
              return args[3];
            } else if (args[0] % 100 >= 3 && args[0] % 100 <= 10) {
              return args[4];
            } else if (args[0] % 100 >= 11) {
              return args[5];
            } else {
              return args[6];
            }
          },
          // 13: Maltese
          (...args) => {
            if (args[0] === 1) {
              return args[1];
            } else if (args[0] === 0 || args[0] % 100 > 1 && args[0] % 100 < 11) {
              return args[2];
            } else if (args[0] % 100 > 10 && args[0] % 100 < 20) {
              return args[3];
            } else {
              return args[4];
            }
          },
          // 14: Macedonian
          (...args) => {
            if (args[0] % 10 === 1) {
              return args[1];
            } else if (args[0] % 10 === 2) {
              return args[2];
            } else {
              return args[3];
            }
          },
          // 15:  Icelandic
          (...args) => {
            return args[0] !== 11 && args[0] % 10 === 1 ? args[1] : args[2];
          },
          // New additions
          // 16:  Kashubian
          // In https://developer.mozilla.org/en-US/docs/Mozilla/Localization/Localization_and_Plurals#List_of__pluralRules
          // Breton is listed as #16 but in the Localization Guide it belongs to the group 2
          (...args) => {
            if (args[0] === 1) {
              return args[1];
            } else if (args[0] % 10 >= 2 && args[0] % 10 <= 4 && (args[0] % 100 < 10 || args[0] % 100 >= 20)) {
              return args[2];
            } else {
              return args[3];
            }
          },
          // 17:  Welsh
          (...args) => {
            if (args[0] === 1) {
              return args[1];
            } else if (args[0] === 2) {
              return args[2];
            } else if (args[0] !== 8 && args[0] !== 11) {
              return args[3];
            } else {
              return args[4];
            }
          },
          // 18:  Javanese
          (...args) => {
            return args[0] === 0 ? args[1] : args[2];
          },
          // 19:  Cornish
          (...args) => {
            if (args[0] === 1) {
              return args[1];
            } else if (args[0] === 2) {
              return args[2];
            } else if (args[0] === 3) {
              return args[3];
            } else {
              return args[4];
            }
          },
          // 20:  Mandinka
          (...args) => {
            if (args[0] === 0) {
              return args[1];
            } else if (args[0] === 1) {
              return args[2];
            } else {
              return args[3];
            }
          }
        ];
      })();
      return _pluralForms[form].apply(null, [number].concat(input));
    };
    if (i18n[language] !== void 0) {
      str = i18n[language][message];
      if (pluralParam !== null && typeof pluralParam === "number") {
        pluralForm = i18n[language]["mejs.plural-form"];
        str = _plural.apply(null, [str, pluralParam, pluralForm]);
      }
    }
    if (!str && i18n.en) {
      str = i18n.en[message];
      if (pluralParam !== null && typeof pluralParam === "number") {
        pluralForm = i18n.en["mejs.plural-form"];
        str = _plural.apply(null, [str, pluralParam, pluralForm]);
      }
    }
    str = str || message;
    if (pluralParam !== null && typeof pluralParam === "number") {
      str = str.replace("%1", pluralParam);
    }
    return escapeHTML(str);
  }
  return message;
};
mejs.i18n = i18n;
if (typeof mejsL10n !== "undefined") {
  mejs.i18n.language(mejsL10n.language, mejsL10n.strings);
}
function isDropFrame(fps = 25) {
  return !(fps % 1 === 0);
}
function secondsToTimeCode(time, forceHours = false, showFrameCount = false, fps = 25, secondsDecimalLength = 0, timeFormat = "hh:mm:ss") {
  time = !time || typeof time !== "number" || time < 0 ? 0 : time;
  let dropFrames = Math.round(fps * 0.066666), timeBase = Math.round(fps), framesPer24Hours = Math.round(fps * 3600) * 24, framesPer10Minutes = Math.round(fps * 600), frameSep = isDropFrame(fps) ? ";" : ":", hours, minutes, seconds, frames, f = Math.round(time * fps);
  if (isDropFrame(fps)) {
    if (f < 0) {
      f = framesPer24Hours + f;
    }
    f = f % framesPer24Hours;
    const d = Math.floor(f / framesPer10Minutes);
    const m = f % framesPer10Minutes;
    f = f + dropFrames * 9 * d;
    if (m > dropFrames) {
      f = f + dropFrames * Math.floor((m - dropFrames) / Math.round(timeBase * 60 - dropFrames));
    }
    const timeBaseDivision = Math.floor(f / timeBase);
    hours = Math.floor(Math.floor(timeBaseDivision / 60) / 60);
    minutes = Math.floor(timeBaseDivision / 60) % 60;
    if (showFrameCount) {
      seconds = timeBaseDivision % 60;
    } else {
      seconds = Math.floor(f / timeBase % 60).toFixed(secondsDecimalLength);
    }
  } else {
    hours = Math.floor(time / 3600) % 24;
    minutes = Math.floor(time / 60) % 60;
    if (showFrameCount) {
      seconds = Math.floor(time % 60);
    } else {
      seconds = Math.floor(time % 60).toFixed(secondsDecimalLength);
    }
  }
  hours = hours <= 0 ? 0 : hours;
  minutes = minutes <= 0 ? 0 : minutes;
  seconds = seconds <= 0 ? 0 : seconds;
  seconds = seconds === 60 ? 0 : seconds;
  minutes = minutes === 60 ? 0 : minutes;
  const timeFormatFrags = timeFormat.split(":");
  const timeFormatSettings = {};
  for (let i = 0, total = timeFormatFrags.length; i < total; ++i) {
    let unique = "";
    for (let j = 0, t = timeFormatFrags[i].length; j < t; j++) {
      if (unique.indexOf(timeFormatFrags[i][j]) < 0) {
        unique += timeFormatFrags[i][j];
      }
    }
    if (~["f", "s", "m", "h"].indexOf(unique)) {
      timeFormatSettings[unique] = timeFormatFrags[i].length;
    }
  }
  let result = forceHours || hours > 0 ? "".concat(hours < 10 && timeFormatSettings.h > 1 ? "0".concat(hours) : hours, ":") : "";
  result += "".concat(minutes < 10 && timeFormatSettings.m > 1 ? "0".concat(minutes) : minutes, ":");
  result += "".concat(seconds < 10 && timeFormatSettings.s > 1 ? "0".concat(seconds) : seconds);
  if (showFrameCount) {
    frames = (f % timeBase).toFixed(0);
    frames = frames <= 0 ? 0 : frames;
    result += frames < 10 && timeFormatSettings.f ? "".concat(frameSep, "0").concat(frames) : "".concat(frameSep).concat(frames);
  }
  return result;
}
function timeCodeToSeconds(time, fps = 25) {
  if (typeof time !== "string") {
    throw new TypeError("Time must be a string");
  }
  if (time.indexOf(";") > 0) {
    time = time.replace(";", ":");
  }
  if (!/\d{2}(:\d{2}){0,3}/i.test(time)) {
    throw new TypeError("Time code must have the format `00:00:00`");
  }
  const parts = time.split(":");
  let output, hours = 0, minutes = 0, seconds = 0, frames = 0, totalMinutes = 0, dropFrames = Math.round(fps * 0.066666), timeBase = Math.round(fps), hFrames = timeBase * 3600, mFrames = timeBase * 60;
  switch (parts.length) {
    default:
    case 1:
      seconds = parseInt(parts[0], 10);
      break;
    case 2:
      minutes = parseInt(parts[0], 10);
      seconds = parseInt(parts[1], 10);
      break;
    case 3:
      hours = parseInt(parts[0], 10);
      minutes = parseInt(parts[1], 10);
      seconds = parseInt(parts[2], 10);
      break;
    case 4:
      hours = parseInt(parts[0], 10);
      minutes = parseInt(parts[1], 10);
      seconds = parseInt(parts[2], 10);
      frames = parseInt(parts[3], 10);
      break;
  }
  if (isDropFrame(fps)) {
    totalMinutes = 60 * hours + minutes;
    output = hFrames * hours + mFrames * minutes + timeBase * seconds + frames - dropFrames * (totalMinutes - Math.floor(totalMinutes / 10));
  } else {
    output = (hFrames * hours + mFrames * minutes + fps * seconds + frames) / fps;
  }
  return parseFloat(output.toFixed(3));
}
function calculateTimeFormat(time, options, fps = 25) {
  time = !time || typeof time !== "number" || time < 0 ? 0 : time;
  const hours = Math.floor(time / 3600) % 24, minutes = Math.floor(time / 60) % 60, seconds = Math.floor(time % 60), frames = Math.floor((time % 1 * fps).toFixed(3)), lis = [
    [frames, "f"],
    [seconds, "s"],
    [minutes, "m"],
    [hours, "h"]
  ];
  let format = options.timeFormat, firstTwoPlaces = format[1] === format[0], separatorIndex = firstTwoPlaces ? 2 : 1, separator = format.length < separatorIndex ? format[separatorIndex] : ":", firstChar = format[0], required = false;
  for (let i = 0, len = lis.length; i < len; i++) {
    if (~format.indexOf(lis[i][1])) {
      required = true;
    } else if (required) {
      let hasNextValue = false;
      for (let j = i; j < len; j++) {
        if (lis[j][0] > 0) {
          hasNextValue = true;
          break;
        }
      }
      if (!hasNextValue) {
        break;
      }
      if (!firstTwoPlaces) {
        format = firstChar + format;
      }
      format = lis[i][1] + separator + format;
      if (firstTwoPlaces) {
        format = lis[i][1] + format;
      }
      firstChar = lis[i][1];
    }
  }
  options.timeFormat = format;
}
function convertSMPTEtoSeconds(SMPTE) {
  if (typeof SMPTE !== "string") {
    throw new TypeError("Argument must be a string value");
  }
  SMPTE = SMPTE.replace(",", ".");
  const decimalLen = ~SMPTE.indexOf(".") ? SMPTE.split(".")[1].length : 0;
  let secs = 0, multiplier = 1;
  SMPTE = SMPTE.split(":").reverse();
  for (let i = 0, total = SMPTE.length; i < total; i++) {
    multiplier = 1;
    if (i > 0) {
      multiplier = Math.pow(60, i);
    }
    secs += Number(SMPTE[i]) * multiplier;
  }
  return Number(secs.toFixed(decimalLen));
}
mejs.Utils = mejs.Utils || {};
mejs.Utils.secondsToTimeCode = secondsToTimeCode;
mejs.Utils.timeCodeToSeconds = timeCodeToSeconds;
mejs.Utils.calculateTimeFormat = calculateTimeFormat;
mejs.Utils.convertSMPTEtoSeconds = convertSMPTEtoSeconds;
function generateControlButton(playerId, ariaLabel, title, iconSprite, icons, classPrefix, buttonClass = null, ariaDescribedby = "", ariaPressed = null) {
  if (typeof playerId !== "string") {
    throw new Error("`ariaControls` argument must be a string");
  }
  if (typeof ariaLabel !== "string") {
    throw new Error("`ariaLabel` argument must be a string");
  }
  if (typeof title !== "string") {
    throw new Error("`title` argument must be a string");
  }
  if (typeof iconSprite !== "string") {
    throw new Error("`iconSprite` argument must be a string");
  }
  if (typeof ariaDescribedby !== "string") {
    throw new Error("`ariaDescribedby` argument must be a string");
  }
  if (!Array.isArray(icons)) {
    throw new Error("`icons` argument must be an array");
  }
  if (typeof classPrefix !== "string") {
    throw new Error("`classPrefix` argument must be a string");
  }
  const className = buttonClass ? 'class="'.concat(buttonClass, '" ') : "";
  const ariaDescribedbyAttr = ariaDescribedby !== "" ? 'aria-describedby="'.concat(ariaDescribedby, '" ') : "";
  const ariaPressedAttr = ariaPressed !== null ? 'aria-pressed="'.concat(ariaPressed, '"') : "";
  const iconHtml = icons.map((icon) => {
    return '<svg xmlns="http://www.w3.org/2000/svg" id="'.concat(playerId, "-").concat(icon, '" class="').concat(classPrefix).concat(icon, '" aria-hidden="true" focusable="false">\n				<use xlink:href="').concat(iconSprite, "#").concat(icon, '"></use>\n			</svg>\n');
  });
  return "<button ".concat(className, ' type="button" aria-controls="').concat(playerId, '" title="').concat(title, '" aria-label="').concat(ariaLabel, '" ').concat(ariaDescribedbyAttr, " ").concat(ariaPressedAttr, ">\n			").concat(iconHtml.join(""), "\n		</button>");
}
mejs.Utils = mejs.Utils || {};
mejs.Utils.generateControlButton = generateControlButton;
mejs.mepIndex = 0;
mejs.players = {};
const config = {
  // url to poster (to fix iOS 3.x)
  poster: "",
  // When the video is ended, show the poster.
  showPosterWhenEnded: false,
  // When the video is paused, show the poster.
  showPosterWhenPaused: false,
  // Default if the <video width> is not specified
  defaultVideoWidth: 480,
  // Default if the <video height> is not specified
  defaultVideoHeight: 270,
  // If set, overrides <video width>
  videoWidth: -1,
  // If set, overrides <video height>
  videoHeight: -1,
  // Default if the user doesn't specify
  defaultAudioWidth: 400,
  // Default if the user doesn't specify
  defaultAudioHeight: 40,
  // Default amount to move back when back key is pressed
  defaultSeekBackwardInterval: (media) => media.getDuration() * 0.05,
  // Default amount to move forward when forward key is pressed
  defaultSeekForwardInterval: (media) => media.getDuration() * 0.05,
  // Set dimensions via JS instead of CSS
  setDimensions: true,
  // sets maxWidth instead of width for just the container element.
  useMaxWidthForContainer: false,
  // Width of audio player
  audioWidth: -1,
  // Height of audio player
  audioHeight: -1,
  // Useful for <audio> player loops
  loop: false,
  // Rewind to beginning when media ends
  autoRewind: true,
  // Resize to media dimensions
  enableAutosize: true,
  /*
   * Time format to use. Default: 'mm:ss'
   * Supported units:
   *   h: hour
   *   m: minute
   *   s: second
   *   f: frame count
   * When using 'hh', 'mm', 'ss' or 'ff' we always display 2 digits.
   * If you use 'h', 'm', 's' or 'f' we display 1 digit if possible.
   *
   * Example to display 75 seconds:
   * Format 'mm:ss': 01:15
   * Format 'm:ss': 1:15
   * Format 'm:s': 1:15
   */
  timeFormat: "",
  // Force the hour marker (##:00:00)
  alwaysShowHours: false,
  // Show framecount in timecode (##:00:00:00)
  showTimecodeFrameCount: false,
  // Used when showTimecodeFrameCount is set to true
  framesPerSecond: 25,
  // Hide controls when playing and mouse is not over the video
  alwaysShowControls: false,
  // Display the video control when media is loading
  hideVideoControlsOnLoad: false,
  // Display the video controls when media is paused
  hideVideoControlsOnPause: false,
  // Enable click video element to toggle play/pause
  clickToPlayPause: true,
  // Time in ms to hide controls
  controlsTimeoutDefault: 1500,
  // Time in ms to trigger the timer when mouse moves
  controlsTimeoutMouseEnter: 2500,
  // Time in ms to trigger the timer when mouse leaves
  controlsTimeoutMouseLeave: 1e3,
  // Force iPad's native controls
  iPadUseNativeControls: false,
  // Force iPhone's native controls
  iPhoneUseNativeControls: false,
  // Force Android's native controls
  AndroidUseNativeControls: false,
  // Features to show
  features: ["playpause", "current", "progress", "duration", "tracks", "volume", "fullscreen"],
  // If set to `true`, all the default control elements listed in features above will be used, and the features will
  // add other features
  useDefaultControls: false,
  // Only for dynamic
  isVideo: true,
  // Stretching modes (auto, fill, responsive, none)
  stretching: "auto",
  // Prefix class names on elements
  classPrefix: "mejs__",
  // Turn keyboard support on and off for this instance
  enableKeyboard: true,
  // When this player starts, it will pause other players
  pauseOtherPlayers: true,
  // Number of decimal places to show if frames are shown
  secondsDecimalLength: 0,
  // If error happens, set up HTML message via string or function
  customError: null,
  // Array of keyboard actions such as play/pause
  keyActions: [],
  // Hide WAI-ARIA video player title so it can be added externally on the website
  hideScreenReaderTitle: false
};
mejs.MepDefaults = config;
class MediaElementPlayer {
  constructor(node, o) {
    const t = this, element = typeof node === "string" ? document$1.getElementById(node) : node;
    if (!(t instanceof MediaElementPlayer)) {
      return new MediaElementPlayer(element, o);
    }
    t.node = t.media = element;
    if (!t.node) {
      return;
    }
    if (t.media.player) {
      return t.media.player;
    }
    t.hasFocus = false;
    t.controlsAreVisible = true;
    t.controlsEnabled = true;
    t.controlsTimer = null;
    t.currentMediaTime = 0;
    t.proxy = null;
    if (o === void 0) {
      const options = t.node.getAttribute("data-mejsoptions");
      o = options ? JSON.parse(options) : {};
    }
    t.options = Object.assign({}, config, o);
    if (t.options.loop && !t.media.getAttribute("loop")) {
      t.media.loop = true;
      t.node.loop = true;
    } else if (t.media.loop) {
      t.options.loop = true;
    }
    if (!t.options.timeFormat) {
      t.options.timeFormat = "mm:ss";
      if (t.options.alwaysShowHours) {
        t.options.timeFormat = "hh:mm:ss";
      }
      if (t.options.showTimecodeFrameCount) {
        t.options.timeFormat += ":ff";
      }
    }
    calculateTimeFormat(0, t.options, t.options.framesPerSecond || 25);
    t.id = "mep_".concat(mejs.mepIndex++);
    mejs.players[t.id] = t;
    t.init();
    return t;
  }
  getElement(element) {
    return element;
  }
  // Added method for WP compatibility
  init() {
    const t = this, playerOptions = Object.assign({}, t.options, {
      success: (media, domNode) => {
        t._meReady(media, domNode);
      },
      error: (e) => {
        t._handleError(e);
      }
    }), tagName = t.node.tagName.toLowerCase();
    t.isDynamic = tagName !== "audio" && tagName !== "video" && tagName !== "iframe";
    t.isVideo = t.isDynamic ? t.options.isVideo : tagName !== "audio" && t.options.isVideo;
    t.mediaFiles = null;
    t.trackFiles = null;
    t.media.addEventListener("rendererready", this.updateNode.bind(this));
    if (IS_IPAD && t.options.iPadUseNativeControls || IS_IPHONE && t.options.iPhoneUseNativeControls) {
      t.node.setAttribute("controls", true);
      if (IS_IPAD && t.node.getAttribute("autoplay")) {
        t.play();
      }
    } else if ((t.isVideo || !t.isVideo && (t.options.features.length || t.options.useDefaultControls)) && !(IS_ANDROID && t.options.AndroidUseNativeControls)) {
      t.node.removeAttribute("controls");
      const videoPlayerTitle = t.isVideo ? i18n.t("mejs.video-player") : i18n.t("mejs.audio-player");
      if (!t.options.hideScreenReaderTitle) {
        const offscreen = document$1.createElement("span");
        offscreen.className = "".concat(t.options.classPrefix, "offscreen");
        offscreen.innerText = videoPlayerTitle;
        t.media.parentNode.insertBefore(offscreen, t.media);
      }
      t.container = document$1.createElement("div");
      t.getElement(t.container).id = t.id;
      t.getElement(t.container).className = "".concat(t.options.classPrefix, "container ").concat(t.options.classPrefix, "container-keyboard-inactive ").concat(t.media.className);
      t.getElement(t.container).tabIndex = 0;
      t.getElement(t.container).setAttribute("role", "application");
      t.getElement(t.container).setAttribute("aria-label", videoPlayerTitle);
      t.getElement(t.container).innerHTML = '<div class="'.concat(t.options.classPrefix, 'inner">') + '<div class="'.concat(t.options.classPrefix, 'mediaelement"></div>') + '<div class="'.concat(t.options.classPrefix, 'layers"></div>') + '<div class="'.concat(t.options.classPrefix, 'controls"></div>') + "</div>";
      t.getElement(t.container).addEventListener("focus", (e) => {
        if (!t.controlsAreVisible && !t.hasFocus && t.controlsEnabled) {
          t.showControls(true);
          const btnSelector = isNodeAfter(e.relatedTarget, t.getElement(t.container)) ? ".".concat(t.options.classPrefix, "controls .").concat(t.options.classPrefix, "button:last-child > button") : ".".concat(t.options.classPrefix, "playpause-button > button"), button = t.getElement(t.container).querySelector(btnSelector);
          button.focus();
        }
      });
      t.node.parentNode.insertBefore(t.getElement(t.container), t.node);
      if (!t.options.features.length && !t.options.useDefaultControls) {
        t.getElement(t.container).style.background = "transparent";
        t.getElement(t.container).querySelector(".".concat(t.options.classPrefix, "controls")).style.display = "none";
      }
      if (t.isVideo && t.options.stretching === "fill" && !hasClass(t.getElement(t.container).parentNode, "".concat(t.options.classPrefix, "fill-container"))) {
        t.outerContainer = t.media.parentNode;
        const wrapper = document$1.createElement("div");
        wrapper.className = "".concat(t.options.classPrefix, "fill-container");
        t.getElement(t.container).parentNode.insertBefore(wrapper, t.getElement(t.container));
        wrapper.appendChild(t.getElement(t.container));
      }
      if (IS_ANDROID) {
        addClass(t.getElement(t.container), "".concat(t.options.classPrefix, "android"));
      }
      if (IS_IOS) {
        addClass(t.getElement(t.container), "".concat(t.options.classPrefix, "ios"));
      }
      if (IS_IPAD) {
        addClass(t.getElement(t.container), "".concat(t.options.classPrefix, "ipad"));
      }
      if (IS_IPHONE) {
        addClass(t.getElement(t.container), "".concat(t.options.classPrefix, "iphone"));
      }
      addClass(t.getElement(t.container), t.isVideo ? "".concat(t.options.classPrefix, "video") : "".concat(t.options.classPrefix, "audio"));
      t.getElement(t.container).querySelector(".".concat(t.options.classPrefix, "mediaelement")).appendChild(t.node);
      t.media.player = t;
      t.controls = t.getElement(t.container).querySelector(".".concat(t.options.classPrefix, "controls"));
      t.layers = t.getElement(t.container).querySelector(".".concat(t.options.classPrefix, "layers"));
      const tagType = t.isVideo ? "video" : "audio", capsTagName = tagType.substring(0, 1).toUpperCase() + tagType.substring(1);
      if (t.options[tagType + "Width"] > 0 || t.options[tagType + "Width"].toString().indexOf("%") > -1) {
        t.width = t.options[tagType + "Width"];
      } else if (t.node.style.width !== "" && t.node.style.width !== null) {
        t.width = t.node.style.width;
      } else if (t.node.getAttribute("width")) {
        t.width = t.node.getAttribute("width");
      } else {
        t.width = t.options["default" + capsTagName + "Width"];
      }
      if (t.options[tagType + "Height"] > 0 || t.options[tagType + "Height"].toString().indexOf("%") > -1) {
        t.height = t.options[tagType + "Height"];
      } else if (t.node.style.height !== "" && t.node.style.height !== null) {
        t.height = t.node.style.height;
      } else if (t.node.getAttribute("height")) {
        t.height = t.node.getAttribute("height");
      } else {
        t.height = t.options["default" + capsTagName + "Height"];
      }
      t.initialAspectRatio = t.height >= t.width ? t.width / t.height : t.height / t.width;
      t.setPlayerSize(t.width, t.height);
    } else if (!t.isVideo && !t.options.features.length && !t.options.useDefaultControls) {
      t.node.style.display = "none";
    }
    playerOptions.pluginWidth = t.width;
    playerOptions.pluginHeight = t.height;
    mejs.MepDefaults = playerOptions;
    new MediaElement(t.media, playerOptions, t.mediaFiles);
    if (t.getElement(t.container) !== void 0 && t.options.features.length && t.controlsAreVisible && !t.options.hideVideoControlsOnLoad) {
      const event = createEvent("controlsshown", t.getElement(t.container));
      t.getElement(t.container).dispatchEvent(event);
    }
  }
  /**
   * Update the node references when a renderer was created, so features like tracks
   * are querying the correct node. Otherwise for example the track files can't be found.
   *
   * TODO: The features should look for the current active renderer instead of the node.
   * This current way has still a bug, when we switch between renderers that are already created.
   *
   * @param event event with renderer node as detail when renderer was created
   */
  updateNode(event) {
    let node, iframeId;
    const mediaElement = Object.prototype.hasOwnProperty.call(event.detail.target, "mediaElement") ? event.detail.target.mediaElement : event.detail.target;
    const originalNode = mediaElement.originalNode;
    if (event.detail.isIframe) {
      iframeId = mediaElement.renderer.id;
      node = mediaElement.querySelector("#".concat(iframeId));
      node.style.position = "absolute";
      if (originalNode.style.maxWidth) {
        node.style.maxWidth = originalNode.style.maxWidth;
      }
    } else {
      node = event.detail.target;
    }
    this.domNode = node;
    this.node = node;
  }
  showControls(doAnimation) {
    const t = this;
    doAnimation = doAnimation === void 0 || doAnimation;
    if (t.controlsAreVisible || !t.isVideo) {
      return;
    }
    if (doAnimation) {
      fadeIn(t.getElement(t.controls), 200, () => {
        removeClass(t.getElement(t.controls), "".concat(t.options.classPrefix, "offscreen"));
        const event = createEvent("controlsshown", t.getElement(t.container));
        t.getElement(t.container).dispatchEvent(event);
      });
      const controls = t.getElement(t.container).querySelectorAll(".".concat(t.options.classPrefix, "control"));
      for (let i = 0, total = controls.length; i < total; i++) {
        fadeIn(controls[i], 200, () => {
          removeClass(controls[i], "".concat(t.options.classPrefix, "offscreen"));
        });
      }
    } else {
      removeClass(t.getElement(t.controls), "".concat(t.options.classPrefix, "offscreen"));
      t.getElement(t.controls).style.display = "";
      t.getElement(t.controls).style.opacity = 1;
      const controls = t.getElement(t.container).querySelectorAll(".".concat(t.options.classPrefix, "control"));
      for (let i = 0, total = controls.length; i < total; i++) {
        removeClass(controls[i], "".concat(t.options.classPrefix, "offscreen"));
        controls[i].style.display = "";
      }
      const event = createEvent("controlsshown", t.getElement(t.container));
      t.getElement(t.container).dispatchEvent(event);
    }
    t.controlsAreVisible = true;
    t.setControlsSize();
  }
  hideControls(doAnimation, forceHide) {
    const t = this;
    doAnimation = doAnimation === void 0 || doAnimation;
    if (forceHide !== true && (!t.controlsAreVisible || t.options.alwaysShowControls || t.paused && t.readyState === 4 && (!t.options.hideVideoControlsOnLoad && t.currentTime <= 0 || !t.options.hideVideoControlsOnPause && t.currentTime > 0) || t.isVideo && !t.options.hideVideoControlsOnLoad && !t.readyState || t.ended)) {
      return;
    }
    if (doAnimation) {
      fadeOut(t.getElement(t.controls), 200, () => {
        addClass(t.getElement(t.controls), "".concat(t.options.classPrefix, "offscreen"));
        t.getElement(t.controls).style.display = "";
        const event = createEvent("controlshidden", t.getElement(t.container));
        t.getElement(t.container).dispatchEvent(event);
      });
      const controls = t.getElement(t.container).querySelectorAll(".".concat(t.options.classPrefix, "control"));
      for (let i = 0, total = controls.length; i < total; i++) {
        fadeOut(controls[i], 200, () => {
          addClass(controls[i], "".concat(t.options.classPrefix, "offscreen"));
          controls[i].style.display = "";
        });
      }
    } else {
      addClass(t.getElement(t.controls), "".concat(t.options.classPrefix, "offscreen"));
      t.getElement(t.controls).style.display = "";
      t.getElement(t.controls).style.opacity = 0;
      const controls = t.getElement(t.container).querySelectorAll(".".concat(t.options.classPrefix, "control"));
      for (let i = 0, total = controls.length; i < total; i++) {
        addClass(controls[i], "".concat(t.options.classPrefix, "offscreen"));
        controls[i].style.display = "";
      }
      const event = createEvent("controlshidden", t.getElement(t.container));
      t.getElement(t.container).dispatchEvent(event);
    }
    t.controlsAreVisible = false;
  }
  startControlsTimer(timeout) {
    const t = this;
    timeout = typeof timeout !== "undefined" ? timeout : t.options.controlsTimeoutDefault;
    t.killControlsTimer("start");
    t.controlsTimer = setTimeout(() => {
      t.hideControls();
      t.killControlsTimer("hide");
    }, timeout);
  }
  killControlsTimer() {
    const t = this;
    if (t.controlsTimer !== null) {
      clearTimeout(t.controlsTimer);
      delete t.controlsTimer;
      t.controlsTimer = null;
    }
  }
  disableControls() {
    const t = this;
    t.killControlsTimer();
    t.controlsEnabled = false;
    t.hideControls(false, true);
  }
  enableControls() {
    const t = this;
    t.controlsEnabled = true;
    t.showControls(false);
  }
  _setDefaultPlayer() {
    const t = this;
    if (t.proxy) {
      t.proxy.pause();
    }
    t.proxy = new DefaultPlayer(t);
    t.media.addEventListener("loadedmetadata", () => {
      if (t.getCurrentTime() > 0 && t.currentMediaTime > 0) {
        t.setCurrentTime(t.currentMediaTime);
        if (!IS_IOS && !IS_ANDROID) {
          t.play();
        }
      }
    });
  }
  /**
   * Set up all controls and events
   *
   * @param media
   * @param domNode
   * @private
   */
  _meReady(media, domNode) {
    const t = this, autoplayAttr = domNode.getAttribute("autoplay"), autoplay = !(autoplayAttr === void 0 || autoplayAttr === null || autoplayAttr === "false"), isNative = media.rendererName !== null && /(native|html5)/i.test(media.rendererName);
    if (t.getElement(t.controls)) {
      t.enableControls();
    }
    if (t.getElement(t.container) && t.getElement(t.container).querySelector(".".concat(t.options.classPrefix, "overlay-play"))) {
      t.getElement(t.container).querySelector(".".concat(t.options.classPrefix, "overlay-play")).style.display = "";
    }
    if (t.created) {
      return;
    }
    t.created = true;
    t.media = media;
    t.domNode = domNode;
    if (!(IS_ANDROID && t.options.AndroidUseNativeControls) && !(IS_IPAD && t.options.iPadUseNativeControls) && !(IS_IPHONE && t.options.iPhoneUseNativeControls)) {
      if (!t.isVideo && !t.options.features.length && !t.options.useDefaultControls) {
        if (autoplay && isNative) {
          t.play();
        }
        if (t.options.success) {
          if (typeof t.options.success === "string") {
            window[t.options.success](t.media, t.domNode, t);
          } else {
            t.options.success(t.media, t.domNode, t);
          }
        }
        return;
      }
      t.featurePosition = {};
      t._setDefaultPlayer();
      t.buildposter(t, t.getElement(t.controls), t.getElement(t.layers), t.media);
      t.buildkeyboard(t, t.getElement(t.controls), t.getElement(t.layers), t.media);
      t.buildoverlays(t, t.getElement(t.controls), t.getElement(t.layers), t.media);
      if (t.options.useDefaultControls) {
        const defaultControls = ["playpause", "current", "progress", "duration", "tracks", "volume", "fullscreen"];
        t.options.features = defaultControls.concat(t.options.features.filter((item) => defaultControls.indexOf(item) === -1));
      }
      t.buildfeatures(t, t.getElement(t.controls), t.getElement(t.layers), t.media);
      const event = createEvent("controlsready", t.getElement(t.container));
      t.getElement(t.container).dispatchEvent(event);
      t.setPlayerSize(t.width, t.height);
      t.setControlsSize();
      if (t.isVideo) {
        t.clickToPlayPauseCallback = () => {
          if (t.options.clickToPlayPause) {
            const button = t.getElement(t.container).querySelector(".".concat(t.options.classPrefix, "overlay-button")), pressed = button.getAttribute("aria-pressed");
            if (t.paused && pressed) {
              t.pause();
            } else if (t.paused) {
              t.play();
            } else {
              t.pause();
            }
            button.setAttribute("aria-pressed", !pressed);
            t.getElement(t.container).focus();
          }
        };
        t.createIframeLayer();
        t.media.addEventListener("click", t.clickToPlayPauseCallback);
        if ((IS_ANDROID || IS_IOS) && !t.options.alwaysShowControls) {
          t.node.addEventListener("touchstart", () => {
            if (t.controlsAreVisible) {
              t.hideControls(false);
            } else {
              if (t.controlsEnabled) {
                t.showControls(false);
              }
            }
          }, SUPPORT_PASSIVE_EVENT ? { passive: true } : false);
        } else {
          t.getElement(t.container).addEventListener("mouseenter", () => {
            if (t.controlsEnabled) {
              if (!t.options.alwaysShowControls) {
                t.killControlsTimer("enter");
                t.showControls();
                t.startControlsTimer(t.options.controlsTimeoutMouseEnter);
              }
            }
          });
          t.getElement(t.container).addEventListener("mousemove", () => {
            if (t.controlsEnabled) {
              if (!t.controlsAreVisible) {
                t.showControls();
              }
              if (!t.options.alwaysShowControls) {
                t.startControlsTimer(t.options.controlsTimeoutMouseEnter);
              }
            }
          });
          t.getElement(t.container).addEventListener("mouseleave", () => {
            if (t.controlsEnabled) {
              if (!t.paused && !t.options.alwaysShowControls) {
                t.startControlsTimer(t.options.controlsTimeoutMouseLeave);
              }
            }
          });
        }
        if (t.options.hideVideoControlsOnLoad) {
          t.hideControls(false);
        }
        if (t.options.enableAutosize) {
          t.media.addEventListener("loadedmetadata", (e) => {
            const target = e !== void 0 ? e.detail.target || e.target : t.media;
            if (t.options.videoHeight <= 0 && !t.domNode.getAttribute("height") && !t.domNode.style.height && target !== null && !isNaN(target.videoHeight)) {
              t.setPlayerSize(target.videoWidth, target.videoHeight);
              t.setControlsSize();
              t.media.setSize(target.videoWidth, target.videoHeight);
            }
          });
        }
      }
      t.media.addEventListener("play", () => {
        t.hasFocus = true;
        for (const playerIndex in mejs.players) {
          if (Object.prototype.hasOwnProperty.call(mejs.players, playerIndex)) {
            const p = mejs.players[playerIndex];
            if (p.id !== t.id && t.options.pauseOtherPlayers && !p.paused && !p.ended && p.options.ignorePauseOtherPlayersOption !== true) {
              p.pause();
              p.hasFocus = false;
            }
          }
        }
        if (!(IS_ANDROID || IS_IOS) && !t.options.alwaysShowControls && t.isVideo) {
          t.hideControls();
        }
      });
      t.media.addEventListener("ended", () => {
        if (t.options.autoRewind) {
          try {
            t.setCurrentTime(0);
            setTimeout(() => {
              const loadingElement = t.getElement(t.container).querySelector(".".concat(t.options.classPrefix, "overlay-loading"));
              if (loadingElement && loadingElement.parentNode) {
                loadingElement.parentNode.style.display = "none";
              }
            }, 20);
          } catch (exp) {
          }
        }
        t.pause();
        if (t.setProgressRail) {
          t.setProgressRail();
        }
        if (t.setCurrentRail) {
          t.setCurrentRail();
        }
        if (t.options.loop) {
          t.play();
        } else if (!t.options.alwaysShowControls && t.controlsEnabled) {
          t.showControls();
        }
      });
      t.media.addEventListener("loadedmetadata", () => {
        calculateTimeFormat(t.getDuration(), t.options, t.options.framesPerSecond || 25);
        if (t.updateDuration) {
          t.updateDuration();
        }
        if (t.updateCurrent) {
          t.updateCurrent();
        }
        if (!t.isFullScreen) {
          t.setPlayerSize(t.width, t.height);
          t.setControlsSize();
        }
      });
      let duration = null;
      t.media.addEventListener("timeupdate", () => {
        if (!isNaN(t.getDuration()) && duration !== t.getDuration()) {
          duration = t.getDuration();
          calculateTimeFormat(duration, t.options, t.options.framesPerSecond || 25);
          if (t.updateDuration) {
            t.updateDuration();
          }
          if (t.updateCurrent) {
            t.updateCurrent();
          }
          t.setControlsSize();
        }
      });
      if (t.options.enableKeyboard) {
        t.getElement(t.container).addEventListener("keydown", function(e) {
          const keyCode = e.keyCode || e.which || 0;
          if (e.target === t.container && keyCode === 13) {
            if (t.paused) {
              t.play();
            } else {
              t.pause();
            }
          }
        });
      }
      t.getElement(t.container).addEventListener("click", function(e) {
        addClass(e.currentTarget, "".concat(t.options.classPrefix, "container-keyboard-inactive"));
      });
      t.getElement(t.container).addEventListener("focusin", function(e) {
        removeClass(e.currentTarget, "".concat(t.options.classPrefix, "container-keyboard-inactive"));
        if (t.isVideo && !IS_ANDROID && !IS_IOS && t.controlsEnabled && !t.options.alwaysShowControls) {
          t.killControlsTimer("enter");
          t.showControls();
          t.startControlsTimer(t.options.controlsTimeoutMouseEnter);
        }
      });
      t.getElement(t.container).addEventListener("focusout", (e) => {
        setTimeout(() => {
          if (e.relatedTarget) {
            if (t.keyboardAction && !e.relatedTarget.closest(".".concat(t.options.classPrefix, "container"))) {
              t.keyboardAction = false;
              if (t.isVideo && !t.options.alwaysShowControls && !t.paused) {
                t.startControlsTimer(t.options.controlsTimeoutMouseLeave);
              }
            }
          }
        }, 0);
      });
      setTimeout(() => {
        t.setPlayerSize(t.width, t.height);
        t.setControlsSize();
      }, 0);
      t.globalResizeCallback = () => {
        if (t.isFullScreen || HAS_TRUE_NATIVE_FULLSCREEN && document$1.webkitIsFullScreen) {
          t.setPlayerSize(screen.width, screen.height);
        } else {
          t.setPlayerSize(t.width, t.height);
        }
        t.setControlsSize();
      };
      t.globalBind("resize", t.globalResizeCallback);
    }
    if (autoplay && isNative) {
      t.play();
    }
    if (t.options.success) {
      if (typeof t.options.success === "string") {
        window[t.options.success](t.media, t.domNode, t);
      } else {
        t.options.success(t.media, t.domNode, t);
      }
    }
  }
  /**
   *
   * @param {CustomEvent} e
   * @param {MediaElement} media
   * @param {HTMLElement} node
   * @private
   */
  _handleError(e, media, node) {
    const t = this, play = t.getElement(t.layers).querySelector(".".concat(t.options.classPrefix, "overlay-play"));
    if (play) {
      play.style.display = "none";
    }
    if (t.options.error) {
      t.options.error(e, media, node);
    }
    if (t.getElement(t.container).querySelector(".".concat(t.options.classPrefix, "cannotplay"))) {
      t.getElement(t.container).querySelector(".".concat(t.options.classPrefix, "cannotplay")).remove();
    }
    const errorContainer = document$1.createElement("div");
    errorContainer.className = "".concat(t.options.classPrefix, "cannotplay");
    errorContainer.style.width = "100%";
    errorContainer.style.height = "100%";
    let errorContent = typeof t.options.customError === "function" ? t.options.customError(t.media, t.media.originalNode) : t.options.customError, imgError = "";
    if (!errorContent) {
      const poster = t.media.originalNode.getAttribute("poster");
      if (poster) {
        imgError = '<img src="'.concat(poster, '" alt="').concat(mejs.i18n.t("mejs.download-file"), '">');
      }
      if (e.message) {
        errorContent = "<p>".concat(e.message, "</p>");
      }
      if (e.urls) {
        for (let i = 0, total = e.urls.length; i < total; i++) {
          const url = e.urls[i];
          errorContent += '<a href="'.concat(url.src, '" data-type="').concat(url.type, '"><span>').concat(mejs.i18n.t("mejs.download-file"), ": ").concat(url.src, "</span></a>");
        }
      }
    }
    if (errorContent && t.getElement(t.layers).querySelector(".".concat(t.options.classPrefix, "overlay-error"))) {
      errorContainer.innerHTML = errorContent;
      t.getElement(t.layers).querySelector(".".concat(t.options.classPrefix, "overlay-error")).innerHTML = "".concat(imgError).concat(errorContainer.outerHTML);
      t.getElement(t.layers).querySelector(".".concat(t.options.classPrefix, "overlay-error")).parentNode.style.display = "block";
    }
    if (t.controlsEnabled) {
      t.disableControls();
    }
  }
  setPlayerSize(width, height) {
    const t = this;
    if (!t.options.setDimensions) {
      return false;
    }
    if (typeof width !== "undefined") {
      t.width = width;
    }
    if (typeof height !== "undefined") {
      t.height = height;
    }
    if (t.isFullScreen || HAS_TRUE_NATIVE_FULLSCREEN && document$1.webkitIsFullScreen) {
      t.setDimensions(t.width, t.height);
      return;
    }
    switch (t.options.stretching) {
      case "fill":
        if (t.isVideo) {
          t.setFillMode();
        } else {
          t.setDimensions(t.width, t.height);
        }
        break;
      case "responsive":
        t.setResponsiveMode();
        break;
      case "none":
        t.setDimensions(t.width, t.height);
        break;
      // This is the 'auto' mode
      default:
        if (t.hasFluidMode() === true) {
          t.setResponsiveMode();
        } else {
          t.setDimensions(t.width, t.height);
        }
        break;
    }
  }
  hasFluidMode() {
    const t = this;
    return t.height.toString().indexOf("%") !== -1 || t.node && t.node.style.maxWidth && t.node.style.maxWidth !== "none" && t.node.style.maxWidth !== t.width || t.node && t.node.currentStyle && t.node.currentStyle.maxWidth === "100%";
  }
  setResponsiveMode() {
    const t = this, parent = (() => {
      let parentEl, el = t.getElement(t.container);
      while (el) {
        try {
          if (IS_FIREFOX && el.tagName.toLowerCase() === "html" && window.self !== window.top && window.frameElement !== null) {
            return window.frameElement;
          } else {
            parentEl = el.parentElement;
          }
        } catch (e) {
          parentEl = el.parentElement;
        }
        if (parentEl && visible(parentEl)) {
          return parentEl;
        }
        el = parentEl;
      }
      return null;
    })(), parentStyles = parent ? getComputedStyle(parent, null) : getComputedStyle(document$1.body, null), nativeWidth = (() => {
      if (t.isVideo) {
        if (t.node.videoWidth && t.node.videoWidth > 0) {
          return t.node.videoWidth;
        } else if (t.node.getAttribute("width")) {
          return t.node.getAttribute("width");
        } else {
          return t.options.defaultVideoWidth;
        }
      } else {
        return t.options.defaultAudioWidth;
      }
    })(), nativeHeight = (() => {
      if (t.isVideo) {
        if (t.node.videoHeight && t.node.videoHeight > 0) {
          return t.node.videoHeight;
        } else if (t.node.getAttribute("height")) {
          return t.node.getAttribute("height");
        } else {
          return t.options.defaultVideoHeight;
        }
      } else {
        return t.options.defaultAudioHeight;
      }
    })(), aspectRatio = (() => {
      if (!t.options.enableAutosize) {
        return t.initialAspectRatio;
      }
      let ratio = 1;
      if (!t.isVideo) {
        return ratio;
      }
      if (t.node.videoWidth && t.node.videoWidth > 0 && t.node.videoHeight && t.node.videoHeight > 0) {
        ratio = t.height >= t.width ? t.node.videoWidth / t.node.videoHeight : t.node.videoHeight / t.node.videoWidth;
      } else {
        ratio = t.initialAspectRatio;
      }
      if (isNaN(ratio) || ratio < 0.01 || ratio > 100) {
        ratio = 1;
      }
      return ratio;
    })(), parentHeight = parseFloat(parentStyles.height);
    let newHeight, parentWidth = parseFloat(parentStyles.width);
    if (t.isVideo) {
      if (t.height === "100%" && t.width === "100%") {
        newHeight = parentHeight;
      } else if (t.height === "100%") {
        newHeight = parseFloat(parentWidth * nativeHeight / nativeWidth, 10);
      } else {
        newHeight = t.height >= t.width ? parseFloat(parentWidth / aspectRatio, 10) : parseFloat(parentWidth * aspectRatio, 10);
      }
    } else {
      newHeight = nativeHeight;
    }
    if (newHeight <= t.container.querySelector(".".concat(t.options.classPrefix, "inner")).offsetHeight) {
      newHeight = t.container.querySelector(".".concat(t.options.classPrefix, "inner")).offsetHeight;
    }
    if (isNaN(newHeight)) {
      newHeight = parentHeight;
    }
    if (t.getElement(t.container).parentNode.length > 0 && t.getElement(t.container).parentNode.tagName.toLowerCase() === "body") {
      parentWidth = window.innerWidth || document$1.documentElement.clientWidth || document$1.body.clientWidth;
      newHeight = window.innerHeight || document$1.documentElement.clientHeight || document$1.body.clientHeight;
    }
    if (newHeight && parentWidth) {
      t.getElement(t.container).style.width = "".concat(parentWidth, "px");
      t.getElement(t.container).style.height = "".concat(newHeight, "px");
      t.node.style.width = "100%";
      t.node.style.height = "100%";
      if (t.isVideo && t.media.setSize) {
        t.media.setSize(parentWidth, newHeight);
      }
      if (newHeight <= t.container.querySelector(".".concat(t.options.classPrefix, "inner")).offsetHeight) {
        t.node.style.width = "auto";
        t.node.style.height = "auto";
      }
      const layerChildren = t.getElement(t.layers).children;
      for (let i = 0, total = layerChildren.length; i < total; i++) {
        layerChildren[i].style.width = "100%";
        layerChildren[i].style.height = "100%";
      }
    }
  }
  setFillMode() {
    const t = this;
    const isIframe = window.self !== window.top && window.frameElement !== null;
    const parent = (() => {
      let parentEl, el = t.getElement(t.container);
      while (el) {
        try {
          if (IS_FIREFOX && el.tagName.toLowerCase() === "html" && window.self !== window.top && window.frameElement !== null) {
            return window.frameElement;
          } else {
            parentEl = el.parentElement;
          }
        } catch (e) {
          parentEl = el.parentElement;
        }
        if (parentEl && visible(parentEl)) {
          return parentEl;
        }
        el = parentEl;
      }
      return null;
    })();
    let parentStyles = parent ? getComputedStyle(parent, null) : getComputedStyle(document$1.body, null);
    if (t.node.style.height !== "none" && t.node.style.height !== t.height) {
      t.node.style.height = "auto";
    }
    if (t.node.style.maxWidth !== "none" && t.node.style.maxWidth !== t.width) {
      t.node.style.maxWidth = "none";
    }
    if (t.node.style.maxHeight !== "none" && t.node.style.maxHeight !== t.height) {
      t.node.style.maxHeight = "none";
    }
    if (t.node.currentStyle) {
      if (t.node.currentStyle.height === "100%") {
        t.node.currentStyle.height = "auto";
      }
      if (t.node.currentStyle.maxWidth === "100%") {
        t.node.currentStyle.maxWidth = "none";
      }
      if (t.node.currentStyle.maxHeight === "100%") {
        t.node.currentStyle.maxHeight = "none";
      }
    }
    if (!isIframe && !parseFloat(parentStyles.width)) {
      parent.style.width = "".concat(t.media.offsetWidth, "px");
    }
    if (!isIframe && !parseFloat(parentStyles.height)) {
      parent.style.height = "".concat(t.media.offsetHeight, "px");
    }
    parentStyles = getComputedStyle(parent);
    const parentWidth = parseFloat(parentStyles.width), parentHeight = parseFloat(parentStyles.height);
    t.setDimensions("100%", "100%");
    const poster = t.getElement(t.container).querySelector(".".concat(t.options.classPrefix, "poster>img"));
    if (poster) {
      poster.style.display = "";
    }
    const targetElement = t.getElement(t.container).querySelectorAll("object, embed, iframe, video"), initHeight = parseFloat(t.height, 10), initWidth = parseFloat(t.width, 10), scaleX1 = parentWidth, scaleY1 = initHeight * parentWidth / initWidth, scaleX2 = initWidth * parentHeight / initHeight, scaleY2 = parentHeight, bScaleOnWidth = scaleX2 > parentWidth === false, finalWidth = bScaleOnWidth ? Math.floor(scaleX1) : Math.floor(scaleX2), finalHeight = bScaleOnWidth ? Math.floor(scaleY1) : Math.floor(scaleY2), width = bScaleOnWidth ? "".concat(parentWidth, "px") : "".concat(finalWidth, "px"), height = bScaleOnWidth ? "".concat(finalHeight, "px") : "".concat(parentHeight, "px");
    for (let i = 0, total = targetElement.length; i < total; i++) {
      targetElement[i].style.height = height;
      targetElement[i].style.width = width;
      if (t.media.setSize) {
        t.media.setSize(width, height);
      }
      targetElement[i].style.marginLeft = "".concat(Math.floor((parentWidth - finalWidth) / 2), "px");
      targetElement[i].style.marginTop = 0;
    }
  }
  setDimensions(width, height) {
    const t = this;
    width = isString(width) && width.indexOf("%") > -1 ? width : "".concat(parseFloat(width), "px");
    height = isString(height) && height.indexOf("%") > -1 ? height : "".concat(parseFloat(height), "px");
    if (t.options.useMaxWidthForContainer) {
      t.getElement(t.container).style.maxWidth = width;
    } else {
      t.getElement(t.container).style.width = width;
    }
    t.getElement(t.container).style.height = height;
    const isNative = t.media.rendererName !== null && /(html5|native)/i.test(t.media.rendererName);
    if ((t.isFullScreen || HAS_TRUE_NATIVE_FULLSCREEN && document$1.webkitIsFullScreen) && !isNative) {
      if (t.options.useMaxWidthForContainer) {
        t.node.style.maxWidth = width;
      } else {
        t.node.style.width = width;
      }
      t.node.style.height = height;
    }
    const layers = t.getElement(t.layers).children;
    for (let i = 0, total = layers.length; i < total; i++) {
      layers[i].style.width = width;
      layers[i].style.height = height;
    }
  }
  setControlsSize() {
    const t = this;
    if (!visible(t.getElement(t.container))) {
      return;
    }
    if (!(t.rail && visible(t.rail))) {
      const children = t.getElement(t.controls).children;
      let minWidth = 0;
      for (let i = 0, total = children.length; i < total; i++) {
        minWidth += children[i].offsetWidth;
      }
      t.getElement(t.container).style.minWidth = "".concat(minWidth, "px");
    }
  }
  /**
   * Add featured control element and cache its position in case features are reset
   *
   * @param {HTMLElement} element
   * @param {String} key
   */
  addControlElement(element, key) {
    const t = this;
    if (t.featurePosition[key] !== void 0) {
      const child = t.getElement(t.controls).children[t.featurePosition[key] - 1];
      child.parentNode.insertBefore(element, child.nextSibling);
    } else {
      t.getElement(t.controls).appendChild(element);
      const children = t.getElement(t.controls).children;
      for (let i = 0, total = children.length; i < total; i++) {
        if (element === children[i]) {
          t.featurePosition[key] = i;
          break;
        }
      }
    }
  }
  /**
   * Append layer to manipulate `<iframe>` elements safely.
   *
   * This allows the user to trigger events properly given that mouse/click don't get lost in the `<iframe>`.
   */
  createIframeLayer() {
    const t = this;
    if (t.isVideo && t.media.rendererName !== null && t.media.rendererName.indexOf("iframe") > -1 && !document$1.getElementById("".concat(t.media.id, "-iframe-overlay"))) {
      const layer = document$1.createElement("div"), target = document$1.getElementById("".concat(t.media.id, "_").concat(t.media.rendererName));
      layer.id = "".concat(t.media.id, "-iframe-overlay");
      layer.className = "".concat(t.options.classPrefix, "iframe-overlay");
      layer.addEventListener("click", (e) => {
        if (t.options.clickToPlayPause) {
          if (t.paused) {
            t.play();
          } else {
            t.pause();
          }
          e.preventDefault();
          e.stopPropagation();
        }
      });
      target.parentNode.insertBefore(layer, target);
    }
  }
  resetSize() {
    const t = this;
    setTimeout(() => {
      t.setPlayerSize(t.width, t.height);
      t.setControlsSize();
    }, 50);
  }
  setPoster(url) {
    const t = this;
    if (t.getElement(t.container)) {
      let posterDiv = t.getElement(t.container).querySelector(".".concat(t.options.classPrefix, "poster"));
      if (!posterDiv) {
        posterDiv = document$1.createElement("div");
        posterDiv.className = "".concat(t.options.classPrefix, "poster ").concat(t.options.classPrefix, "layer");
        t.getElement(t.layers).appendChild(posterDiv);
      }
      let posterImg = posterDiv.querySelector("img");
      if (!posterImg && url) {
        posterImg = document$1.createElement("img");
        posterImg.alt = "";
        posterImg.className = "".concat(t.options.classPrefix, "poster-img");
        posterImg.width = "100%";
        posterImg.height = "100%";
        posterDiv.style.display = "";
        posterDiv.appendChild(posterImg);
      }
      if (url) {
        posterImg.setAttribute("src", url);
        posterDiv.style.backgroundImage = 'url("'.concat(url, '")');
        posterDiv.style.display = "";
      } else if (posterImg) {
        posterDiv.style.backgroundImage = "none";
        posterDiv.style.display = "none";
        posterImg.remove();
      } else {
        posterDiv.style.display = "none";
      }
    } else if (IS_IPAD && t.options.iPadUseNativeControls || IS_IPHONE && t.options.iPhoneUseNativeControls || IS_ANDROID && t.options.AndroidUseNativeControls) {
      t.media.originalNode.poster = url;
    }
  }
  changeSkin(className) {
    const t = this;
    t.getElement(t.container).className = "".concat(t.options.classPrefix, "container ").concat(className);
    t.setPlayerSize(t.width, t.height);
    t.setControlsSize();
  }
  globalBind(events, callback) {
    const t = this, doc = t.node ? t.node.ownerDocument : document$1;
    events = splitEvents(events, t.id);
    if (events.d) {
      const eventList = events.d.split(" ");
      for (let i = 0, total = eventList.length; i < total; i++) {
        eventList[i].split(".").reduce(function(part, e) {
          doc.addEventListener(e, callback, false);
          return e;
        }, "");
      }
    }
    if (events.w) {
      const eventList = events.w.split(" ");
      for (let i = 0, total = eventList.length; i < total; i++) {
        eventList[i].split(".").reduce(function(part, e) {
          window.addEventListener(e, callback, false);
          return e;
        }, "");
      }
    }
  }
  globalUnbind(events, callback) {
    const t = this, doc = t.node ? t.node.ownerDocument : document$1;
    events = splitEvents(events, t.id);
    if (events.d) {
      const eventList = events.d.split(" ");
      for (let i = 0, total = eventList.length; i < total; i++) {
        eventList[i].split(".").reduce(function(part, e) {
          doc.removeEventListener(e, callback, false);
          return e;
        }, "");
      }
    }
    if (events.w) {
      const eventList = events.w.split(" ");
      for (let i = 0, total = eventList.length; i < total; i++) {
        eventList[i].split(".").reduce(function(part, e) {
          window.removeEventListener(e, callback, false);
          return e;
        }, "");
      }
    }
  }
  buildfeatures(player, controls, layers, media) {
    const t = this;
    for (let i = 0, total = t.options.features.length; i < total; i++) {
      const feature = t.options.features[i];
      if (t["build".concat(feature)]) {
        try {
          t["build".concat(feature)](player, controls, layers, media);
        } catch (e) {
          console.error("error building ".concat(feature), e);
        }
      }
    }
  }
  buildposter(player, controls, layers, media) {
    const t = this, poster = document$1.createElement("div");
    poster.className = "".concat(t.options.classPrefix, "poster ").concat(t.options.classPrefix, "layer");
    layers.appendChild(poster);
    let posterUrl = media.originalNode.getAttribute("poster");
    if (player.options.poster !== "") {
      if (posterUrl && IS_IOS) {
        media.originalNode.removeAttribute("poster");
      }
      posterUrl = player.options.poster;
    }
    if (posterUrl) {
      t.setPoster(posterUrl);
    } else if (t.media.renderer !== null && typeof t.media.renderer.getPosterUrl === "function") {
      t.setPoster(t.media.renderer.getPosterUrl());
    } else {
      poster.style.display = "none";
    }
    media.addEventListener("play", () => {
      poster.style.display = "none";
    });
    media.addEventListener("playing", () => {
      poster.style.display = "none";
    });
    if (player.options.showPosterWhenEnded && player.options.autoRewind) {
      media.addEventListener("ended", () => {
        poster.style.display = "";
      });
    }
    media.addEventListener("error", () => {
      poster.style.display = "none";
    });
    if (player.options.showPosterWhenPaused) {
      media.addEventListener("pause", () => {
        if (!player.ended) {
          poster.style.display = "";
        }
      });
    }
  }
  buildoverlays(player, controls, layers, media) {
    if (!player.isVideo) {
      return;
    }
    const t = this, loading = document$1.createElement("div"), error = document$1.createElement("div"), bigPlay = document$1.createElement("div");
    loading.style.display = "none";
    loading.className = "".concat(t.options.classPrefix, "overlay ").concat(t.options.classPrefix, "layer");
    loading.innerHTML = '<div class="'.concat(t.options.classPrefix, 'overlay-loading">') + '<div class="'.concat(t.options.classPrefix, 'overlay-loading-bg-img">\n					<svg xmlns="http://www.w3.org/2000/svg">\n						<use xlink:href="').concat(t.media.options.iconSprite, '#icon-loading-spinner"></use>\n					</svg>\n				</div>') + "</div>";
    layers.appendChild(loading);
    error.style.display = "none";
    error.className = "".concat(t.options.classPrefix, "overlay ").concat(t.options.classPrefix, "layer");
    error.innerHTML = '<div class="'.concat(t.options.classPrefix, 'overlay-error"></div>');
    layers.appendChild(error);
    bigPlay.className = "".concat(t.options.classPrefix, "overlay ").concat(t.options.classPrefix, "layer ").concat(t.options.classPrefix, "overlay-play");
    bigPlay.innerHTML = generateControlButton(t.id, i18n.t("mejs.play"), i18n.t("mejs.play"), "".concat(t.media.options.iconSprite), ["icon-overlay-play"], "".concat(t.options.classPrefix), "".concat(t.options.classPrefix, "overlay-button"), "", false);
    bigPlay.addEventListener("click", () => {
      if (t.options.clickToPlayPause) {
        const button = t.getElement(t.container).querySelector(".".concat(t.options.classPrefix, "overlay-button")), pressed = button.getAttribute("aria-pressed");
        if (t.paused) {
          t.play();
        } else {
          t.pause();
        }
        button.setAttribute("aria-pressed", !!pressed);
        t.getElement(t.container).focus();
      }
    });
    layers.appendChild(bigPlay);
    if (t.media.rendererName !== null && (/(youtube|facebook)/i.test(t.media.rendererName) && !(t.media.originalNode.getAttribute("poster") || player.options.poster || typeof t.media.renderer.getPosterUrl === "function" && t.media.renderer.getPosterUrl()) || IS_STOCK_ANDROID || t.media.originalNode.getAttribute("autoplay"))) {
      bigPlay.style.display = "none";
    }
    let hasError = false;
    media.addEventListener("play", () => {
      bigPlay.style.display = "none";
      loading.style.display = "none";
      error.style.display = "none";
      hasError = false;
    });
    media.addEventListener("playing", () => {
      bigPlay.style.display = "none";
      loading.style.display = "none";
      error.style.display = "none";
      hasError = false;
    });
    media.addEventListener("seeking", () => {
      bigPlay.style.display = "none";
      loading.style.display = "";
      hasError = false;
    });
    media.addEventListener("seeked", () => {
      bigPlay.style.display = t.paused && !IS_STOCK_ANDROID ? "" : "none";
      loading.style.display = "none";
      hasError = false;
    });
    media.addEventListener("pause", () => {
      loading.style.display = "none";
      if (!IS_STOCK_ANDROID && !hasError) {
        bigPlay.style.display = "";
      }
      hasError = false;
    });
    media.addEventListener("waiting", () => {
      loading.style.display = "";
      hasError = false;
    });
    media.addEventListener("loadeddata", () => {
      loading.style.display = "";
      if (IS_ANDROID) {
        media.canplayTimeout = setTimeout(() => {
          if (document$1.createEvent) {
            const evt = document$1.createEvent("HTMLEvents");
            evt.initEvent("canplay", true, true);
            return media.dispatchEvent(evt);
          }
        }, 300);
      }
      hasError = false;
    });
    media.addEventListener("canplay", () => {
      loading.style.display = "none";
      clearTimeout(media.canplayTimeout);
      hasError = false;
    });
    media.addEventListener("error", (e) => {
      t._handleError(e, t.media, t.node);
      loading.style.display = "none";
      bigPlay.style.display = "none";
      hasError = true;
    });
    media.addEventListener("loadedmetadata", () => {
      if (!t.controlsEnabled) {
        t.enableControls();
      }
    });
    media.addEventListener("keydown", (e) => {
      t.onkeydown(player, media, e);
      hasError = false;
    });
  }
  buildkeyboard(player, controls, layers, media) {
    const t = this;
    t.getElement(t.container).addEventListener("keydown", () => {
      t.keyboardAction = true;
    });
    t.globalKeydownCallback = (event) => {
      if (!document$1.activeElement) {
        return true;
      }
      const container = document$1.activeElement.closest(".".concat(t.options.classPrefix, "container")), target = t.media.closest(".".concat(t.options.classPrefix, "container"));
      t.hasFocus = !!(container && target && container.id === target.id);
      return t.onkeydown(player, media, event);
    };
    t.globalClickCallback = (event) => {
      t.hasFocus = !!event.target.closest(".".concat(t.options.classPrefix, "container"));
    };
    t.globalBind("keydown", t.globalKeydownCallback);
    t.globalBind("click", t.globalClickCallback);
  }
  onkeydown(player, media, e) {
    if (player.hasFocus && player.options.enableKeyboard) {
      for (let i = 0, total = player.options.keyActions.length; i < total; i++) {
        const keyAction = player.options.keyActions[i];
        for (let j = 0, jl = keyAction.keys.length; j < jl; j++) {
          if (e.keyCode === keyAction.keys[j]) {
            keyAction.action(player, media, e.keyCode, e);
            e.preventDefault();
            e.stopPropagation();
            return;
          }
        }
      }
    }
    return true;
  }
  get paused() {
    return this.proxy.paused;
  }
  get muted() {
    return this.proxy.muted;
  }
  set muted(muted) {
    this.setMuted(muted);
  }
  get ended() {
    return this.proxy.ended;
  }
  get readyState() {
    return this.proxy.readyState;
  }
  set currentTime(time) {
    this.setCurrentTime(time);
  }
  get currentTime() {
    return this.getCurrentTime();
  }
  get duration() {
    return this.getDuration();
  }
  set volume(volume) {
    this.setVolume(volume);
  }
  get volume() {
    return this.getVolume();
  }
  set src(src) {
    this.setSrc(src);
  }
  get src() {
    return this.getSrc();
  }
  play() {
    return this.proxy.play();
  }
  pause() {
    return this.proxy.pause();
  }
  load() {
    return this.proxy.load();
  }
  setCurrentTime(time, userInteraction = false) {
    this.seekUserInteraction = userInteraction;
    this.proxy.setCurrentTime(time);
  }
  getCurrentTime() {
    return this.proxy.currentTime;
  }
  getDuration() {
    return this.proxy.duration;
  }
  setVolume(volume) {
    this.proxy.volume = volume;
  }
  getVolume() {
    return this.proxy.getVolume();
  }
  setMuted(value) {
    this.proxy.setMuted(value);
  }
  setSrc(src) {
    if (!this.controlsEnabled) {
      this.enableControls();
    }
    this.proxy.setSrc(src);
  }
  getSrc() {
    return this.proxy.getSrc();
  }
  canPlayType(type) {
    return this.proxy.canPlayType(type);
  }
  remove() {
    const t = this, rendererName = t.media.rendererName, src = t.media.originalNode.src;
    for (const featureIndex in t.options.features) {
      const feature = t.options.features[featureIndex];
      if (t["clean".concat(feature)]) {
        try {
          t["clean".concat(feature)](t, t.getElement(t.layers), t.getElement(t.controls), t.media);
        } catch (e) {
          console.error("error cleaning ".concat(feature), e);
        }
      }
    }
    let nativeWidth = t.node.getAttribute("width"), nativeHeight = t.node.getAttribute("height");
    if (nativeWidth) {
      if (nativeWidth.indexOf("%") === -1) {
        nativeWidth = "".concat(nativeWidth, "px");
      }
    } else {
      nativeWidth = "auto";
    }
    if (nativeHeight) {
      if (nativeHeight.indexOf("%") === -1) {
        nativeHeight = "".concat(nativeHeight, "px");
      }
    } else {
      nativeHeight = "auto";
    }
    t.node.style.width = nativeWidth;
    t.node.style.height = nativeHeight;
    t.setPlayerSize(0, 0);
    if (!t.isDynamic) {
      t.node.setAttribute("controls", true);
      t.node.setAttribute("id", t.node.getAttribute("id").replace("_".concat(rendererName), "").replace("_from_mejs", ""));
      const poster = t.getElement(t.container).querySelector(".".concat(t.options.classPrefix, "poster>img"));
      if (poster) {
        t.node.setAttribute("poster", poster.src);
      }
      delete t.node.autoplay;
      t.node.setAttribute("src", "");
      if (t.media.canPlayType(getTypeFromFile(src)) !== "") {
        t.node.setAttribute("src", src);
      }
      if (rendererName && rendererName.indexOf("iframe") > -1) {
        const layer = document$1.getElementById("".concat(t.media.id, "-iframe-overlay"));
        layer.remove();
      }
      const node = t.node.cloneNode();
      node.style.display = "";
      t.getElement(t.container).parentNode.insertBefore(node, t.getElement(t.container));
      t.node.remove();
      if (t.mediaFiles) {
        for (let i = 0, total = t.mediaFiles.length; i < total; i++) {
          const source = document$1.createElement("source");
          source.setAttribute("src", t.mediaFiles[i].src);
          source.setAttribute("type", t.mediaFiles[i].type);
          node.appendChild(source);
        }
      }
      if (t.trackFiles) {
        for (let i = 0, total = t.trackFiles.length; i < total; i++) {
          const track = t.trackFiles[i];
          const newTrack = document$1.createElement("track");
          newTrack.kind = track.kind;
          newTrack.label = track.label;
          newTrack.srclang = track.srclang;
          newTrack.src = track.src;
          node.appendChild(newTrack);
          newTrack.addEventListener("load", function() {
            this.mode = "showing";
            node.textTracks[i].mode = "showing";
          });
        }
      }
      delete t.node;
      delete t.mediaFiles;
      delete t.trackFiles;
    } else {
      t.getElement(t.container).parentNode.insertBefore(t.node, t.getElement(t.container));
    }
    if (t.media.renderer && typeof t.media.renderer.destroy === "function") {
      t.media.renderer.destroy();
    }
    if (typeof t.getElement(t.container) === "object") {
      const offscreen = t.getElement(t.container).parentNode.querySelector(".".concat(t.options.classPrefix, "offscreen"));
      if (offscreen) {
        offscreen.remove();
      }
      t.getElement(t.container).remove();
    }
    t.globalUnbind("resize", t.globalResizeCallback);
    t.globalUnbind("keydown", t.globalKeydownCallback);
    t.globalUnbind("click", t.globalClickCallback);
    delete t.media.player;
  }
}
window.MediaElementPlayer = MediaElementPlayer;
mejs.MediaElementPlayer = MediaElementPlayer;
