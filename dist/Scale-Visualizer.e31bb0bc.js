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
})({"node_modules/piano-chart/piano-chart.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScaleHelper = exports.Scale = exports.PianoData = exports.NoteValue = exports.Instrument = void 0;
const t = {},
      e = [];

function i(e, n) {
  if (Array.isArray(e)) for (const t of e) i(t, n);else if ("object" != typeof e) s(Object.getOwnPropertyNames(n)), t[e] = Object.assign(t[e] || {}, n);else for (const t in e) i(t, e[t]);
}

function n(e) {
  return t[e] || {};
}

function s(t) {
  e.push(...t);
}

function r(t, e) {
  var i,
      n = t.length,
      s = [];

  for (i = 0; i < n; i++) s.push(e(t[i]));

  return s;
}

function h(t) {
  return t % 360 * Math.PI / 180;
}

function o(t) {
  return t.toLowerCase().replace(/-(.)/g, function (t, e) {
    return e.toUpperCase();
  });
}

function a(t) {
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function u(t, e, i, n) {
  return null != e && null != i || (n = n || t.bbox(), null == e ? e = n.width / n.height * i : null == i && (i = n.height / n.width * e)), {
    width: e,
    height: i
  };
}

function l(t, e) {
  const i = t.origin;
  let n, s;

  if ("string" == typeof i || null == i) {
    const r = (i || "center").toLowerCase().trim(),
          {
      height: h,
      width: o,
      x: a,
      y: u
    } = e.bbox(),
          l = r.includes("left") ? a : r.includes("right") ? a + o : a + o / 2,
          c = r.includes("top") ? u : r.includes("bottom") ? u + h : u + h / 2;
    n = null != t.ox ? t.ox : l, s = null != t.oy ? t.oy : c;
  } else n = i[0], s = i[1];

  return [n, s];
}

const c = "http://www.w3.org/2000/svg",
      d = "http://www.w3.org/2000/xmlns/",
      f = "http://www.w3.org/1999/xlink",
      p = {
  window: "undefined" == typeof window ? null : window,
  document: "undefined" == typeof document ? null : document
};

class m {}

const y = {},
      g = "___SYMBOL___ROOT___";

function v(t) {
  return p.document.createElementNS(c, t);
}

function _(t) {
  if (t instanceof m) return t;
  if ("object" == typeof t) return x(t);
  if (null == t) return new y[g]();
  if ("string" == typeof t && "<" !== t.charAt(0)) return x(p.document.querySelector(t));
  var e = v("svg");
  return e.innerHTML = t, t = x(e.firstChild);
}

function w(t, e) {
  return e instanceof p.window.Node ? e : v(t);
}

function b(t) {
  if (!t) return null;
  if (t.instance instanceof m) return t.instance;
  var e = a(t.nodeName || "Dom");
  return "LinearGradient" === e || "RadialGradient" === e ? e = "Gradient" : y[e] || (e = "Dom"), new y[e](t);
}

let x = b;

function O(t, e = t.name, i = !1) {
  return y[e] = t, i && (y[g] = t), s(Object.getOwnPropertyNames(t.prototype)), t;
}

let N = 1e3;

function S(t) {
  return "Svgjs" + a(t) + N++;
}

function k(t, e, i) {
  var n, s;

  for (s = (t = Array.isArray(t) ? t : [t]).length - 1; s >= 0; s--) for (n in e) {
    let r = e[n];
    i && (r = T(e[n])), t[s].prototype[n] = r;
  }
}

function T(t) {
  return function (...e) {
    const i = e[e.length - 1];
    return !i || i.constructor !== Object || i instanceof Array ? t.apply(this, e) : t.apply(this, e.slice(0, -1)).attr(i);
  };
}

i("Dom", {
  siblings: function () {
    return this.parent().children();
  },
  position: function () {
    return this.parent().index(this);
  },
  next: function () {
    return this.siblings()[this.position() + 1];
  },
  prev: function () {
    return this.siblings()[this.position() - 1];
  },
  forward: function () {
    var t = this.position() + 1,
        e = this.parent();
    return e.removeElement(this).add(this, t), "function" == typeof e.isRoot && e.isRoot() && e.node.appendChild(e.defs().node), this;
  },
  backward: function () {
    var t = this.position();
    return t > 0 && this.parent().removeElement(this).add(this, t - 1), this;
  },
  front: function () {
    var t = this.parent();
    return t.node.appendChild(this.node), "function" == typeof t.isRoot && t.isRoot() && t.node.appendChild(t.defs().node), this;
  },
  back: function () {
    return this.position() > 0 && this.parent().removeElement(this).add(this, 0), this;
  },
  before: function (t) {
    (t = _(t)).remove();

    var e = this.position();
    return this.parent().add(t, e), this;
  },
  after: function (t) {
    (t = _(t)).remove();

    var e = this.position();
    return this.parent().add(t, e + 1), this;
  },
  insertBefore: function (t) {
    return (t = _(t)).before(this), this;
  },
  insertAfter: function (t) {
    return (t = _(t)).after(this), this;
  }
});
const M = /^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i,
      A = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
      C = /rgb\((\d+),(\d+),(\d+)\)/,
      E = /(#[a-z0-9\-_]+)/i,
      I = /\)\s*,?\s*/,
      j = /\s/g,
      L = /^#[a-f0-9]{3,6}$/i,
      H = /^rgb\(/,
      D = /^(\s+)?$/,
      z = /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
      P = /\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i,
      R = /[\s,]+/,
      K = /([^e])-/gi,
      F = /[MLHVCSQTAZ]/gi,
      q = /[MLHVCSQTAZ]/i,
      W = /((\d?\.\d+(?:e[+-]?\d+)?)((?:\.\d+(?:e[+-]?\d+)?)+))+/gi,
      Y = /\./g;
i("Dom", {
  classes: function () {
    var t = this.attr("class");
    return null == t ? [] : t.trim().split(R);
  },
  hasClass: function (t) {
    return -1 !== this.classes().indexOf(t);
  },
  addClass: function (t) {
    if (!this.hasClass(t)) {
      var e = this.classes();
      e.push(t), this.attr("class", e.join(" "));
    }

    return this;
  },
  removeClass: function (t) {
    return this.hasClass(t) && this.attr("class", this.classes().filter(function (e) {
      return e !== t;
    }).join(" ")), this;
  },
  toggleClass: function (t) {
    return this.hasClass(t) ? this.removeClass(t) : this.addClass(t);
  }
}), i("Dom", {
  css: function (t, e) {
    const i = {};
    if (0 === arguments.length) return this.node.style.cssText.split(/\s*;\s*/).filter(function (t) {
      return !!t.length;
    }).forEach(function (t) {
      const e = t.split(/\s*:\s*/);
      i[e[0]] = e[1];
    }), i;

    if (arguments.length < 2) {
      if (Array.isArray(t)) {
        for (const e of t) {
          const t = o(e);
          i[t] = this.node.style[t];
        }

        return i;
      }

      if ("string" == typeof t) return this.node.style[o(t)];
      if ("object" == typeof t) for (const e in t) this.node.style[o(e)] = null == t[e] || D.test(t[e]) ? "" : t[e];
    }

    return 2 === arguments.length && (this.node.style[o(t)] = null == e || D.test(e) ? "" : e), this;
  },
  show: function () {
    return this.css("display", "");
  },
  hide: function () {
    return this.css("display", "none");
  },
  visible: function () {
    return "none" !== this.css("display");
  }
}), i("Dom", {
  data: function (t, e, i) {
    if ("object" == typeof t) for (e in t) this.data(e, t[e]);else if (arguments.length < 2) try {
      return JSON.parse(this.attr("data-" + t));
    } catch (e) {
      return this.attr("data-" + t);
    } else this.attr("data-" + t, null === e ? null : !0 === i || "string" == typeof e || "number" == typeof e ? e : JSON.stringify(e));
    return this;
  }
}), i("Dom", {
  remember: function (t, e) {
    if ("object" == typeof arguments[0]) for (var i in t) this.remember(i, t[i]);else {
      if (1 === arguments.length) return this.memory()[t];
      this.memory()[t] = e;
    }
    return this;
  },
  forget: function () {
    if (0 === arguments.length) this._memory = {};else for (var t = arguments.length - 1; t >= 0; t--) delete this.memory()[arguments[t]];
    return this;
  },
  memory: function () {
    return this._memory = this._memory || {};
  }
});
let B = 0;
const U = {};

function X(t) {
  let e = t.getEventHolder();
  return e === p.window && (e = U), e.events || (e.events = {}), e.events;
}

function G(t) {
  return t.getEventTarget();
}

function V(t, e, i, n, s) {
  var r = i.bind(n || t),
      h = _(t),
      o = X(h),
      a = G(h);

  e = Array.isArray(e) ? e : e.split(R), i._svgjsListenerId || (i._svgjsListenerId = ++B), e.forEach(function (t) {
    var e = t.split(".")[0],
        n = t.split(".")[1] || "*";
    o[e] = o[e] || {}, o[e][n] = o[e][n] || {}, o[e][n][i._svgjsListenerId] = r, a.addEventListener(e, r, s || !1);
  });
}

function $(t, e, i, n) {
  var s = _(t),
      r = X(s),
      h = G(s);

  ("function" != typeof i || (i = i._svgjsListenerId)) && (e = Array.isArray(e) ? e : (e || "").split(R)).forEach(function (t) {
    var e,
        o,
        a = t && t.split(".")[0],
        u = t && t.split(".")[1];
    if (i) r[a] && r[a][u || "*"] && (h.removeEventListener(a, r[a][u || "*"][i], n || !1), delete r[a][u || "*"][i]);else if (a && u) {
      if (r[a] && r[a][u]) {
        for (o in r[a][u]) $(h, [a, u].join("."), o);

        delete r[a][u];
      }
    } else if (u) for (t in r) for (e in r[t]) u === e && $(h, [t, u].join("."));else if (a) {
      if (r[a]) {
        for (e in r[a]) $(h, [a, e].join("."));

        delete r[a];
      }
    } else {
      for (t in r) $(h, t);

      !function (t) {
        const e = t.getEventHolder();
        e.events && (e.events = {});
      }(s);
    }
  });
}

function Q(t) {
  const e = Math.round(t),
        i = Math.max(0, Math.min(255, e)).toString(16);
  return 1 === i.length ? "0" + i : i;
}

function Z(t, e) {
  for (let i = e.length; i--;) if (null == t[e[i]]) return !1;

  return !0;
}

function J(t, e, i) {
  return i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6 ? t + 6 * (e - t) * i : i < .5 ? e : i < 2 / 3 ? t + (e - t) * (2 / 3 - i) * 6 : t;
}

class tt {
  constructor(...t) {
    this.init(...t);
  }

  init(t = 0, e = 0, i = 0, n = 0, s = "rgb") {
    if (t = t || 0, this.space) for (const t in this.space) delete this[this.space[t]];
    if ("number" == typeof t) s = "string" == typeof n ? n : s, n = "string" == typeof n ? 0 : n, Object.assign(this, {
      _a: t,
      _b: e,
      _c: i,
      _d: n,
      space: s
    });else if (t instanceof Array) this.space = e || ("string" == typeof t[3] ? t[3] : t[4]) || "rgb", Object.assign(this, {
      _a: t[0],
      _b: t[1],
      _c: t[2],
      _d: t[3] || 0
    });else if (t instanceof Object) {
      const i = function (t, e) {
        const i = Z(t, "rgb") ? {
          _a: t.r,
          _b: t.g,
          _c: t.b,
          space: "rgb"
        } : Z(t, "xyz") ? {
          _a: t.x,
          _b: t.y,
          _c: t.z,
          _d: 0,
          space: "xyz"
        } : Z(t, "hsl") ? {
          _a: t.h,
          _b: t.s,
          _c: t.l,
          _d: 0,
          space: "hsl"
        } : Z(t, "lab") ? {
          _a: t.l,
          _b: t.a,
          _c: t.b,
          _d: 0,
          space: "lab"
        } : Z(t, "lch") ? {
          _a: t.l,
          _b: t.c,
          _c: t.h,
          _d: 0,
          space: "lch"
        } : Z(t, "cmyk") ? {
          _a: t.c,
          _b: t.m,
          _c: t.y,
          _d: t.k,
          space: "cmyk"
        } : {
          _a: 0,
          _b: 0,
          _c: 0,
          space: "rgb"
        };
        return i.space = e || i.space, i;
      }(t, e);

      Object.assign(this, i);
    } else if ("string" == typeof t) if (H.test(t)) {
      const e = t.replace(j, ""),
            [i, n, s] = C.exec(e).slice(1, 4).map(t => parseInt(t));
      Object.assign(this, {
        _a: i,
        _b: n,
        _c: s,
        _d: 0,
        space: "rgb"
      });
    } else {
      if (!L.test(t)) throw Error("Unsupported string format, can't construct Color");
      {
        const e = t => parseInt(t, 16),
              [, i, n, s] = A.exec(function (t) {
          return 4 === t.length ? ["#", t.substring(1, 2), t.substring(1, 2), t.substring(2, 3), t.substring(2, 3), t.substring(3, 4), t.substring(3, 4)].join("") : t;
        }(t)).map(e);

        Object.assign(this, {
          _a: i,
          _b: n,
          _c: s,
          _d: 0,
          space: "rgb"
        });
      }
    }
    const {
      _a: r,
      _b: h,
      _c: o,
      _d: a
    } = this,
          u = "rgb" === this.space ? {
      r: r,
      g: h,
      b: o
    } : "xyz" === this.space ? {
      x: r,
      y: h,
      z: o
    } : "hsl" === this.space ? {
      h: r,
      s: h,
      l: o
    } : "lab" === this.space ? {
      l: r,
      a: h,
      b: o
    } : "lch" === this.space ? {
      l: r,
      c: h,
      h: o
    } : "cmyk" === this.space ? {
      c: r,
      m: h,
      y: o,
      k: a
    } : {};
    Object.assign(this, u);
  }

  rgb() {
    if ("rgb" === this.space) return this;

    if ("lab" === (t = this.space) || "xyz" === t || "lch" === t) {
      let {
        x: t,
        y: e,
        z: i
      } = this;

      if ("lab" === this.space || "lch" === this.space) {
        let {
          l: n,
          a: s,
          b: r
        } = this;

        if ("lch" === this.space) {
          const {
            c: t,
            h: e
          } = this,
                i = Math.PI / 180;
          s = t * Math.cos(i * e), r = t * Math.sin(i * e);
        }

        const h = (n + 16) / 116,
              o = s / 500 + h,
              a = h - r / 200,
              u = 16 / 116,
              l = .008856,
              c = 7.787;
        t = .95047 * (o ** 3 > l ? o ** 3 : (o - u) / c), e = 1 * (h ** 3 > l ? h ** 3 : (h - u) / c), i = 1.08883 * (a ** 3 > l ? a ** 3 : (a - u) / c);
      }

      const n = 3.2406 * t + -1.5372 * e + -.4986 * i,
            s = -.9689 * t + 1.8758 * e + .0415 * i,
            r = .0557 * t + -.204 * e + 1.057 * i,
            h = Math.pow,
            o = .0031308,
            a = n > o ? 1.055 * h(n, 1 / 2.4) - .055 : 12.92 * n,
            u = s > o ? 1.055 * h(s, 1 / 2.4) - .055 : 12.92 * s,
            l = r > o ? 1.055 * h(r, 1 / 2.4) - .055 : 12.92 * r;
      return new tt(255 * a, 255 * u, 255 * l);
    }

    if ("hsl" === this.space) {
      let {
        h: t,
        s: e,
        l: i
      } = this;

      if (t /= 360, e /= 100, i /= 100, 0 === e) {
        return i *= 255, new tt(i, i, i);
      }

      const n = i < .5 ? i * (1 + e) : i + e - i * e,
            s = 2 * i - n,
            r = 255 * J(s, n, t + 1 / 3),
            h = 255 * J(s, n, t),
            o = 255 * J(s, n, t - 1 / 3);
      return new tt(r, h, o);
    }

    if ("cmyk" === this.space) {
      const {
        c: t,
        m: e,
        y: i,
        k: n
      } = this,
            s = 255 * (1 - Math.min(1, t * (1 - n) + n)),
            r = 255 * (1 - Math.min(1, e * (1 - n) + n)),
            h = 255 * (1 - Math.min(1, i * (1 - n) + n));
      return new tt(s, r, h);
    }

    return this;
    var t;
  }

  lab() {
    const {
      x: t,
      y: e,
      z: i
    } = this.xyz();
    return new tt(116 * e - 16, 500 * (t - e), 200 * (e - i), "lab");
  }

  xyz() {
    const {
      _a: t,
      _b: e,
      _c: i
    } = this.rgb(),
          [n, s, r] = [t, e, i].map(t => t / 255),
          h = n > .04045 ? Math.pow((n + .055) / 1.055, 2.4) : n / 12.92,
          o = s > .04045 ? Math.pow((s + .055) / 1.055, 2.4) : s / 12.92,
          a = r > .04045 ? Math.pow((r + .055) / 1.055, 2.4) : r / 12.92,
          u = (.4124 * h + .3576 * o + .1805 * a) / .95047,
          l = (.2126 * h + .7152 * o + .0722 * a) / 1,
          c = (.0193 * h + .1192 * o + .9505 * a) / 1.08883,
          d = u > .008856 ? Math.pow(u, 1 / 3) : 7.787 * u + 16 / 116,
          f = l > .008856 ? Math.pow(l, 1 / 3) : 7.787 * l + 16 / 116,
          p = c > .008856 ? Math.pow(c, 1 / 3) : 7.787 * c + 16 / 116;
    return new tt(d, f, p, "xyz");
  }

  lch() {
    const {
      l: t,
      a: e,
      b: i
    } = this.lab(),
          n = Math.sqrt(e ** 2 + i ** 2);
    let s = 180 * Math.atan2(i, e) / Math.PI;
    return s < 0 && (s *= -1, s = 360 - s), new tt(t, n, s, "lch");
  }

  hsl() {
    const {
      _a: t,
      _b: e,
      _c: i
    } = this.rgb(),
          [n, s, r] = [t, e, i].map(t => t / 255),
          h = Math.max(n, s, r),
          o = Math.min(n, s, r),
          a = (h + o) / 2,
          u = h === o,
          l = h - o;
    return new tt(360 * (u ? 0 : h === n ? ((s - r) / l + (s < r ? 6 : 0)) / 6 : h === s ? ((r - n) / l + 2) / 6 : h === r ? ((n - s) / l + 4) / 6 : 0), 100 * (u ? 0 : a > .5 ? l / (2 - h - o) : l / (h + o)), 100 * a, "hsl");
  }

  cmyk() {
    const {
      _a: t,
      _b: e,
      _c: i
    } = this.rgb(),
          [n, s, r] = [t, e, i].map(t => t / 255),
          h = Math.min(1 - n, 1 - s, 1 - r);
    return 1 === h ? new tt(0, 0, 0, 1, "cmyk") : new tt((1 - n - h) / (1 - h), (1 - s - h) / (1 - h), (1 - r - h) / (1 - h), h, "cmyk");
  }

  _clamped() {
    const {
      _a: t,
      _b: e,
      _c: i
    } = this.rgb(),
          {
      max: n,
      min: s,
      round: r
    } = Math;
    return [t, e, i].map(t => n(0, s(r(t), 255)));
  }

  toHex() {
    const [t, e, i] = this._clamped().map(Q);

    return `#${t}${e}${i}`;
  }

  toString() {
    return this.toHex();
  }

  toRgb() {
    const [t, e, i] = this._clamped();

    return `rgb(${t},${e},${i})`;
  }

  toArray() {
    const {
      _a: t,
      _b: e,
      _c: i,
      _d: n,
      space: s
    } = this;
    return [t, e, i, n, s];
  }

  static random(t = "vibrant", e, i) {
    const {
      random: n,
      round: s,
      sin: r,
      PI: h
    } = Math;

    if ("vibrant" === t) {
      const t = 24 * n() + 57,
            e = 38 * n() + 45,
            i = 360 * n();
      return new tt(t, e, i, "lch");
    }

    if ("sine" === t) {
      const t = s(80 * r(2 * h * (e = null == e ? n() : e) / .5 + .01) + 150),
            i = s(50 * r(2 * h * e / .5 + 4.6) + 200),
            o = s(100 * r(2 * h * e / .5 + 2.3) + 150);
      return new tt(t, i, o);
    }

    if ("pastel" === t) {
      const t = 8 * n() + 86,
            e = 17 * n() + 9,
            i = 360 * n();
      return new tt(t, e, i, "lch");
    }

    if ("dark" === t) {
      const t = 10 + 10 * n(),
            e = 50 * n() + 86,
            i = 360 * n();
      return new tt(t, e, i, "lch");
    }

    if ("rgb" === t) {
      const t = 255 * n(),
            e = 255 * n(),
            i = 255 * n();
      return new tt(t, e, i);
    }

    if ("lab" === t) {
      const t = 100 * n(),
            e = 256 * n() - 128,
            i = 256 * n() - 128;
      return new tt(t, e, i, "lab");
    }

    if ("grey" === t) {
      const t = 255 * n();
      return new tt(t, t, t);
    }
  }

  static test(t) {
    return "string" == typeof t && (L.test(t) || H.test(t));
  }

  static isRgb(t) {
    return t && "number" == typeof t.r && "number" == typeof t.g && "number" == typeof t.b;
  }

  static isColor(t) {
    return t && (t instanceof tt || this.isRgb(t) || this.test(t));
  }

}

class et {
  constructor(...t) {
    this.init(...t);
  }

  init(t, e) {
    const i = 0,
          n = 0,
          s = Array.isArray(t) ? {
      x: t[0],
      y: t[1]
    } : "object" == typeof t ? {
      x: t.x,
      y: t.y
    } : {
      x: t,
      y: e
    };
    return this.x = null == s.x ? i : s.x, this.y = null == s.y ? n : s.y, this;
  }

  clone() {
    return new et(this);
  }

  transform(t) {
    return this.clone().transformO(t);
  }

  transformO(t) {
    nt.isMatrixLike(t) || (t = new nt(t));
    const {
      x: e,
      y: i
    } = this;
    return this.x = t.a * e + t.c * i + t.e, this.y = t.b * e + t.d * i + t.f, this;
  }

  toArray() {
    return [this.x, this.y];
  }

}

function it(t, e, i) {
  return Math.abs(e - t) < (i || 1e-6);
}

class nt {
  constructor(...t) {
    this.init(...t);
  }

  init(t) {
    var e = nt.fromArray([1, 0, 0, 1, 0, 0]);
    return t = t instanceof xt ? t.matrixify() : "string" == typeof t ? nt.fromArray(t.split(R).map(parseFloat)) : Array.isArray(t) ? nt.fromArray(t) : "object" == typeof t && nt.isMatrixLike(t) ? t : "object" == typeof t ? new nt().transform(t) : 6 === arguments.length ? nt.fromArray([].slice.call(arguments)) : e, this.a = null != t.a ? t.a : e.a, this.b = null != t.b ? t.b : e.b, this.c = null != t.c ? t.c : e.c, this.d = null != t.d ? t.d : e.d, this.e = null != t.e ? t.e : e.e, this.f = null != t.f ? t.f : e.f, this;
  }

  clone() {
    return new nt(this);
  }

  transform(t) {
    if (nt.isMatrixLike(t)) return new nt(t).multiplyO(this);
    var e = nt.formatTransforms(t);
    const {
      x: i,
      y: n
    } = new et(e.ox, e.oy).transform(this);
    var s = new nt().translateO(e.rx, e.ry).lmultiplyO(this).translateO(-i, -n).scaleO(e.scaleX, e.scaleY).skewO(e.skewX, e.skewY).shearO(e.shear).rotateO(e.theta).translateO(i, n);

    if (isFinite(e.px) || isFinite(e.py)) {
      const t = new et(i, n).transform(s),
            r = e.px ? e.px - t.x : 0,
            h = e.py ? e.py - t.y : 0;
      s.translateO(r, h);
    }

    return s.translateO(e.tx, e.ty), s;
  }

  compose(t) {
    t.origin && (t.originX = t.origin[0], t.originY = t.origin[1]);
    var e = t.originX || 0,
        i = t.originY || 0,
        n = t.scaleX || 1,
        s = t.scaleY || 1,
        r = t.shear || 0,
        h = t.rotate || 0,
        o = t.translateX || 0,
        a = t.translateY || 0;
    return new nt().translateO(-e, -i).scaleO(n, s).shearO(r).rotateO(h).translateO(o, a).lmultiplyO(this).translateO(e, i);
  }

  decompose(t = 0, e = 0) {
    var i = this.a,
        n = this.b,
        s = this.c,
        r = this.d,
        h = this.e,
        o = this.f,
        a = i * r - n * s,
        u = a > 0 ? 1 : -1,
        l = u * Math.sqrt(i * i + n * n),
        c = Math.atan2(u * n, u * i),
        d = 180 / Math.PI * c,
        f = Math.cos(c),
        p = Math.sin(c),
        m = (i * s + n * r) / a,
        y = s * l / (m * i - n) || r * l / (m * n + i);
    return {
      scaleX: l,
      scaleY: y,
      shear: m,
      rotate: d,
      translateX: h - t + t * f * l + e * (m * f * l - p * y),
      translateY: o - e + t * p * l + e * (m * p * l + f * y),
      originX: t,
      originY: e,
      a: this.a,
      b: this.b,
      c: this.c,
      d: this.d,
      e: this.e,
      f: this.f
    };
  }

  multiply(t) {
    return this.clone().multiplyO(t);
  }

  multiplyO(t) {
    var e = t instanceof nt ? t : new nt(t);
    return nt.matrixMultiply(this, e, this);
  }

  lmultiply(t) {
    return this.clone().lmultiplyO(t);
  }

  lmultiplyO(t) {
    var e = t instanceof nt ? t : new nt(t);
    return nt.matrixMultiply(e, this, this);
  }

  inverseO() {
    var t = this.a,
        e = this.b,
        i = this.c,
        n = this.d,
        s = this.e,
        r = this.f,
        h = t * n - e * i;
    if (!h) throw new Error("Cannot invert " + this);
    var o = n / h,
        a = -e / h,
        u = -i / h,
        l = t / h,
        c = -(o * s + u * r),
        d = -(a * s + l * r);
    return this.a = o, this.b = a, this.c = u, this.d = l, this.e = c, this.f = d, this;
  }

  inverse() {
    return this.clone().inverseO();
  }

  translate(t, e) {
    return this.clone().translateO(t, e);
  }

  translateO(t, e) {
    return this.e += t || 0, this.f += e || 0, this;
  }

  scale(t, e, i, n) {
    return this.clone().scaleO(...arguments);
  }

  scaleO(t, e = t, i = 0, n = 0) {
    3 === arguments.length && (n = i, i = e, e = t);
    const {
      a: s,
      b: r,
      c: h,
      d: o,
      e: a,
      f: u
    } = this;
    return this.a = s * t, this.b = r * e, this.c = h * t, this.d = o * e, this.e = a * t - i * t + i, this.f = u * e - n * e + n, this;
  }

  rotate(t, e, i) {
    return this.clone().rotateO(t, e, i);
  }

  rotateO(t, e = 0, i = 0) {
    t = h(t);
    const n = Math.cos(t),
          s = Math.sin(t),
          {
      a: r,
      b: o,
      c: a,
      d: u,
      e: l,
      f: c
    } = this;
    return this.a = r * n - o * s, this.b = o * n + r * s, this.c = a * n - u * s, this.d = u * n + a * s, this.e = l * n - c * s + i * s - e * n + e, this.f = c * n + l * s - e * s - i * n + i, this;
  }

  flip(t, e) {
    return this.clone().flipO(t, e);
  }

  flipO(t, e) {
    return "x" === t ? this.scaleO(-1, 1, e, 0) : "y" === t ? this.scaleO(1, -1, 0, e) : this.scaleO(-1, -1, t, e || t);
  }

  shear(t, e, i) {
    return this.clone().shearO(t, e, i);
  }

  shearO(t, e = 0, i = 0) {
    const {
      a: n,
      b: s,
      c: r,
      d: h,
      e: o,
      f: a
    } = this;
    return this.a = n + s * t, this.c = r + h * t, this.e = o + a * t - i * t, this;
  }

  skew(t, e, i, n) {
    return this.clone().skewO(...arguments);
  }

  skewO(t, e = t, i = 0, n = 0) {
    3 === arguments.length && (n = i, i = e, e = t), t = h(t), e = h(e);
    const s = Math.tan(t),
          r = Math.tan(e),
          {
      a: o,
      b: a,
      c: u,
      d: l,
      e: c,
      f: d
    } = this;
    return this.a = o + a * s, this.b = a + o * r, this.c = u + l * s, this.d = l + u * r, this.e = c + d * s - n * s, this.f = d + c * r - i * r, this;
  }

  skewX(t, e, i) {
    return this.skew(t, 0, e, i);
  }

  skewXO(t, e, i) {
    return this.skewO(t, 0, e, i);
  }

  skewY(t, e, i) {
    return this.skew(0, t, e, i);
  }

  skewYO(t, e, i) {
    return this.skewO(0, t, e, i);
  }

  aroundO(t, e, i) {
    var n = t || 0,
        s = e || 0;
    return this.translateO(-n, -s).lmultiplyO(i).translateO(n, s);
  }

  around(t, e, i) {
    return this.clone().aroundO(t, e, i);
  }

  equals(t) {
    var e = new nt(t);
    return it(this.a, e.a) && it(this.b, e.b) && it(this.c, e.c) && it(this.d, e.d) && it(this.e, e.e) && it(this.f, e.f);
  }

  toString() {
    return "matrix(" + this.a + "," + this.b + "," + this.c + "," + this.d + "," + this.e + "," + this.f + ")";
  }

  toArray() {
    return [this.a, this.b, this.c, this.d, this.e, this.f];
  }

  valueOf() {
    return {
      a: this.a,
      b: this.b,
      c: this.c,
      d: this.d,
      e: this.e,
      f: this.f
    };
  }

  static fromArray(t) {
    return {
      a: t[0],
      b: t[1],
      c: t[2],
      d: t[3],
      e: t[4],
      f: t[5]
    };
  }

  static isMatrixLike(t) {
    return null != t.a || null != t.b || null != t.c || null != t.d || null != t.e || null != t.f;
  }

  static formatTransforms(t) {
    var e = "both" === t.flip || !0 === t.flip,
        i = t.flip && (e || "x" === t.flip) ? -1 : 1,
        n = t.flip && (e || "y" === t.flip) ? -1 : 1,
        s = t.skew && t.skew.length ? t.skew[0] : isFinite(t.skew) ? t.skew : isFinite(t.skewX) ? t.skewX : 0,
        r = t.skew && t.skew.length ? t.skew[1] : isFinite(t.skew) ? t.skew : isFinite(t.skewY) ? t.skewY : 0,
        h = t.scale && t.scale.length ? t.scale[0] * i : isFinite(t.scale) ? t.scale * i : isFinite(t.scaleX) ? t.scaleX * i : i,
        o = t.scale && t.scale.length ? t.scale[1] * n : isFinite(t.scale) ? t.scale * n : isFinite(t.scaleY) ? t.scaleY * n : n,
        a = t.shear || 0,
        u = t.rotate || t.theta || 0,
        l = new et(t.origin || t.around || t.ox || t.originX, t.oy || t.originY),
        c = l.x,
        d = l.y,
        f = new et(t.position || t.px || t.positionX, t.py || t.positionY),
        p = f.x,
        m = f.y,
        y = new et(t.translate || t.tx || t.translateX, t.ty || t.translateY),
        g = y.x,
        v = y.y,
        _ = new et(t.relative || t.rx || t.relativeX, t.ry || t.relativeY);

    return {
      scaleX: h,
      scaleY: o,
      skewX: s,
      skewY: r,
      shear: a,
      theta: u,
      rx: _.x,
      ry: _.y,
      tx: g,
      ty: v,
      ox: c,
      oy: d,
      px: p,
      py: m
    };
  }

  static matrixMultiply(t, e, i) {
    var n = t.a * e.a + t.c * e.b,
        s = t.b * e.a + t.d * e.b,
        r = t.a * e.c + t.c * e.d,
        h = t.b * e.c + t.d * e.d,
        o = t.e + t.a * e.e + t.c * e.f,
        a = t.f + t.b * e.e + t.d * e.f;
    return i.a = n, i.b = s, i.c = r, i.d = h, i.e = o, i.f = a, i;
  }

}

function st() {
  if (!st.nodes) {
    const t = _().size(2, 0);

    t.node.style.cssText = ["opacity: 0", "position: absolute", "left: -100%", "top: -100%", "overflow: hidden"].join(";"), t.attr("focusable", "false"), t.attr("aria-hidden", "true");
    const e = t.path().node;
    st.nodes = {
      svg: t,
      path: e
    };
  }

  if (!st.nodes.svg.node.parentNode) {
    const t = p.document.body || p.document.documentElement;
    st.nodes.svg.addTo(t);
  }

  return st.nodes;
}

function rt(t) {
  return !(t.width || t.height || t.x || t.y);
}

O(nt, "Matrix");

class ht {
  constructor(...t) {
    this.init(...t);
  }

  init(t) {
    return t = "string" == typeof t ? t.split(R).map(parseFloat) : Array.isArray(t) ? t : "object" == typeof t ? [null != t.left ? t.left : t.x, null != t.top ? t.top : t.y, t.width, t.height] : 4 === arguments.length ? [].slice.call(arguments) : [0, 0, 0, 0], this.x = t[0] || 0, this.y = t[1] || 0, this.width = this.w = t[2] || 0, this.height = this.h = t[3] || 0, this.x2 = this.x + this.w, this.y2 = this.y + this.h, this.cx = this.x + this.w / 2, this.cy = this.y + this.h / 2, this;
  }

  merge(t) {
    const e = Math.min(this.x, t.x),
          i = Math.min(this.y, t.y),
          n = Math.max(this.x + this.width, t.x + t.width) - e,
          s = Math.max(this.y + this.height, t.y + t.height) - i;
    return new ht(e, i, n, s);
  }

  transform(t) {
    t instanceof nt || (t = new nt(t));
    let e = 1 / 0,
        i = -1 / 0,
        n = 1 / 0,
        s = -1 / 0;
    return [new et(this.x, this.y), new et(this.x2, this.y), new et(this.x, this.y2), new et(this.x2, this.y2)].forEach(function (r) {
      r = r.transform(t), e = Math.min(e, r.x), i = Math.max(i, r.x), n = Math.min(n, r.y), s = Math.max(s, r.y);
    }), new ht(e, n, i - e, s - n);
  }

  addOffset() {
    return this.x += p.window.pageXOffset, this.y += p.window.pageYOffset, this;
  }

  toString() {
    return this.x + " " + this.y + " " + this.width + " " + this.height;
  }

  toArray() {
    return [this.x, this.y, this.width, this.height];
  }

  isNulled() {
    return rt(this);
  }

}

function ot(t, e) {
  let i;

  try {
    if (i = t(this.node), rt(i) && (n = this.node) !== p.document && !(p.document.documentElement.contains || function (t) {
      for (; t.parentNode;) t = t.parentNode;

      return t === p.document;
    }).call(p.document.documentElement, n)) throw new Error("Element not in the dom");
  } catch (t) {
    i = e(this);
  }

  var n;
  return i;
}

i({
  viewbox: {
    viewbox(t, e, i, n) {
      return null == t ? new ht(this.attr("viewBox")) : this.attr("viewBox", new ht(t, e, i, n));
    },

    zoom(t, e) {
      let i = this.node.clientWidth,
          n = this.node.clientHeight;
      const s = this.viewbox();

      if (!i && !n) {
        var r = window.getComputedStyle(this.node);
        i = parseFloat(r.getPropertyValue("width")), n = parseFloat(r.getPropertyValue("height"));
      }

      const h = i / s.width,
            o = n / s.height,
            a = Math.min(h, o);
      if (null == t) return a;
      let u = a / t;
      u === 1 / 0 && (u = Number.MIN_VALUE), e = e || new et(i / 2 / h + s.x, n / 2 / o + s.y);
      const l = new ht(s).transform(new nt({
        scale: u,
        origin: e
      }));
      return this.viewbox(l);
    }

  }
}), O(ht, "Box");

const at = function () {
  try {
    return Function("name", "baseClass", "_constructor", ["baseClass = baseClass || Array", "return {", "  [name]: class extends baseClass {", "    constructor (...args) {", "      super(...args)", "      _constructor && _constructor.apply(this, args)", "    }", "  }", "}[name]"].join("\n"));
  } catch (t) {
    return (t, e = Array, i) => {
      const n = function () {
        e.apply(this, arguments), i && i.apply(this, arguments);
      };

      return (n.prototype = Object.create(e.prototype)).constructor = n, n.prototype.map = function (t) {
        const e = new n();
        return e.push.apply(e, Array.prototype.map.call(this, t)), e;
      }, n;
    };
  }
}(),
      ut = at("List", Array, function (t = []) {
  if ("number" == typeof t) return this;
  this.length = 0, this.push(...t);
});

k(ut, {
  each(t, ...e) {
    return "function" == typeof t ? this.map(e => t.call(e, e)) : this.map(i => i[t](...e));
  },

  toArray() {
    return Array.prototype.concat.apply([], this);
  }

});
const lt = ["toArray", "constructor", "each"];

function ct(t, e) {
  return new ut(r((e || p.document).querySelectorAll(t), function (t) {
    return b(t);
  }));
}

ut.extend = function (t) {
  t = t.reduce((t, e) => (lt.includes(e) || "_" === e[0] || (t[e] = function (...t) {
    return this.each(e, ...t);
  }), t), {}), k(ut, t);
};

class dt extends m {
  constructor({
    events: t = {}
  } = {}) {
    super(), this.events = t;
  }

  addEventListener() {}

  dispatch(t, e) {
    return function (t, e, i) {
      var n = G(t);
      return e instanceof p.window.Event || (e = new p.window.CustomEvent(e, {
        detail: i,
        cancelable: !0
      })), n.dispatchEvent(e), e;
    }(this, t, e);
  }

  dispatchEvent(t) {
    const e = this.getEventHolder().events;
    if (!e) return !0;
    const i = e[t.type];

    for (const e in i) for (const n in i[e]) i[e][n](t);

    return !t.defaultPrevented;
  }

  fire(t, e) {
    return this.dispatch(t, e), this;
  }

  getEventHolder() {
    return this;
  }

  getEventTarget() {
    return this;
  }

  off(t, e) {
    return $(this, t, e), this;
  }

  on(t, e, i, n) {
    return V(this, t, e, i, n), this;
  }

  removeEventListener() {}

}

function ft() {}

O(dt, "EventTarget");
const pt = 400,
      mt = ">",
      yt = 0,
      gt = {
  "fill-opacity": 1,
  "stroke-opacity": 1,
  "stroke-width": 0,
  "stroke-linejoin": "miter",
  "stroke-linecap": "butt",
  fill: "#000000",
  stroke: "#000000",
  opacity: 1,
  x: 0,
  y: 0,
  cx: 0,
  cy: 0,
  width: 0,
  height: 0,
  r: 0,
  rx: 0,
  ry: 0,
  offset: 0,
  "stop-opacity": 1,
  "stop-color": "#000000",
  "text-anchor": "start"
},
      vt = at("SVGArray", Array, function (t) {
  this.init(t);
});
k(vt, {
  init(t) {
    return "number" == typeof t || (this.length = 0, this.push(...this.parse(t))), this;
  },

  toArray() {
    return Array.prototype.concat.apply([], this);
  },

  toString() {
    return this.join(" ");
  },

  valueOf() {
    const t = [];
    return t.push(...this), t;
  },

  parse: (t = []) => t instanceof Array ? t : t.trim().split(R).map(parseFloat),

  clone() {
    return new this.constructor(this);
  },

  toSet() {
    return new Set(this);
  }

});

class _t {
  constructor(...t) {
    this.init(...t);
  }

  init(t, e) {
    return e = Array.isArray(t) ? t[1] : e, t = Array.isArray(t) ? t[0] : t, this.value = 0, this.unit = e || "", "number" == typeof t ? this.value = isNaN(t) ? 0 : isFinite(t) ? t : t < 0 ? -34e37 : 34e37 : "string" == typeof t ? (e = t.match(M)) && (this.value = parseFloat(e[1]), "%" === e[5] ? this.value /= 100 : "s" === e[5] && (this.value *= 1e3), this.unit = e[5]) : t instanceof _t && (this.value = t.valueOf(), this.unit = t.unit), this;
  }

  toString() {
    return ("%" === this.unit ? ~~(1e8 * this.value) / 1e6 : "s" === this.unit ? this.value / 1e3 : this.value) + this.unit;
  }

  toJSON() {
    return this.toString();
  }

  toArray() {
    return [this.value, this.unit];
  }

  valueOf() {
    return this.value;
  }

  plus(t) {
    return t = new _t(t), new _t(this + t, this.unit || t.unit);
  }

  minus(t) {
    return t = new _t(t), new _t(this - t, this.unit || t.unit);
  }

  times(t) {
    return t = new _t(t), new _t(this * t, this.unit || t.unit);
  }

  divide(t) {
    return t = new _t(t), new _t(this / t, this.unit || t.unit);
  }

  convert(t) {
    return new _t(this.value, t);
  }

}

const wt = [];

class bt extends dt {
  constructor(t, e) {
    super(t), this.node = t, this.type = t.nodeName, e && t !== e && this.attr(e);
  }

  add(t, e) {
    return t = _(t), null == e ? this.node.appendChild(t.node) : t.node !== this.node.childNodes[e] && this.node.insertBefore(t.node, this.node.childNodes[e]), this;
  }

  addTo(t) {
    return _(t).put(this);
  }

  children() {
    return new ut(r(this.node.children, function (t) {
      return b(t);
    }));
  }

  clear() {
    for (; this.node.hasChildNodes();) this.node.removeChild(this.node.lastChild);

    return this;
  }

  clone() {
    return this.writeDataToDom(), function t(e) {
      for (var i = e.children.length - 1; i >= 0; i--) t(e.children[i]);

      return e.id ? b(e).id(S(e.nodeName)) : b(e);
    }(this.node.cloneNode(!0));
  }

  each(t, e) {
    var i,
        n,
        s = this.children();

    for (i = 0, n = s.length; i < n; i++) t.apply(s[i], [i, s]), e && s[i].each(t, e);

    return this;
  }

  element(t) {
    return this.put(new bt(v(t)));
  }

  first() {
    return b(this.node.firstChild);
  }

  get(t) {
    return b(this.node.childNodes[t]);
  }

  getEventHolder() {
    return this.node;
  }

  getEventTarget() {
    return this.node;
  }

  has(t) {
    return this.index(t) >= 0;
  }

  id(t) {
    return void 0 !== t || this.node.id || (this.node.id = S(this.type)), this.attr("id", t);
  }

  index(t) {
    return [].slice.call(this.node.childNodes).indexOf(t.node);
  }

  last() {
    return b(this.node.lastChild);
  }

  matches(t) {
    const e = this.node;
    return (e.matches || e.matchesSelector || e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.oMatchesSelector).call(e, t);
  }

  parent(t) {
    var e = this;
    if (!e.node.parentNode) return null;
    if (e = b(e.node.parentNode), !t) return e;

    for (; e;) {
      if ("string" == typeof t ? e.matches(t) : e instanceof t) return e;
      if (!e.node.parentNode || "#document" === e.node.parentNode.nodeName || "#document-fragment" === e.node.parentNode.nodeName) return null;
      e = b(e.node.parentNode);
    }
  }

  put(t, e) {
    return this.add(t, e), t;
  }

  putIn(t) {
    return _(t).add(this);
  }

  remove() {
    return this.parent() && this.parent().removeElement(this), this;
  }

  removeElement(t) {
    return this.node.removeChild(t.node), this;
  }

  replace(t) {
    return t = _(t), this.node.parentNode.replaceChild(t.node, this.node), t;
  }

  round(t = 2, e) {
    const i = 10 ** t,
          n = this.attr();
    e || (e = Object.keys(n));
    const s = {};
    return e.forEach(t => {
      s[t] = Math.round(n[t] * i) / i;
    }), this.attr(s), this;
  }

  toString() {
    return this.id();
  }

  svg(t, e) {
    var i, n, s;

    if (!1 === t && (e = !1, t = null), null == t || "function" == typeof t) {
      e = null == e || e, this.writeDataToDom();
      let i = this;

      if (null != t) {
        if (i = b(i.node.cloneNode(!0)), e) {
          const e = t(i);
          if (i = e || i, !1 === e) return "";
        }

        i.each(function () {
          const e = t(this),
                i = e || this;
          !1 === e ? this.remove() : e && this !== i && this.replace(i);
        }, !0);
      }

      return e ? i.node.outerHTML : i.node.innerHTML;
    }

    for (e = null != e && e, i = p.document.createElementNS(c, "svg"), s = p.document.createDocumentFragment(), i.innerHTML = t, n = i.children.length; n--;) s.appendChild(i.firstElementChild);

    const r = this.parent();
    return e ? this.replace(s) && r : this.add(s);
  }

  words(t) {
    return this.node.textContent = t, this;
  }

  writeDataToDom() {
    return this.each(function () {
      this.writeDataToDom();
    }), this;
  }

}

k(bt, {
  attr: function (t, e, i) {
    if (null == t) {
      t = {}, e = this.node.attributes;

      for (const i of e) t[i.nodeName] = z.test(i.nodeValue) ? parseFloat(i.nodeValue) : i.nodeValue;

      return t;
    }

    if (t instanceof Array) return t.reduce((t, e) => (t[e] = this.attr(e), t), {});
    if ("object" == typeof t && t.constructor === Object) for (e in t) this.attr(e, t[e]);else if (null === e) this.node.removeAttribute(t);else {
      if (null == e) return null == (e = this.node.getAttribute(t)) ? gt[t] : z.test(e) ? parseFloat(e) : e;
      "number" == typeof (e = wt.reduce((e, i) => i(t, e, this), e)) ? e = new _t(e) : tt.isColor(e) ? e = new tt(e) : e.constructor === Array && (e = new vt(e)), "leading" === t ? this.leading && this.leading(e) : "string" == typeof i ? this.node.setAttributeNS(i, t, e.toString()) : this.node.setAttribute(t, e.toString()), !this.rebuild || "font-size" !== t && "x" !== t || this.rebuild();
    }
    return this;
  },
  find: function (t) {
    return ct(t, this.node);
  },
  findOne: function (t) {
    return b(this.node.querySelector(t));
  }
}), O(bt, "Dom");

class xt extends bt {
  constructor(t, e) {
    super(t, e), this.dom = {}, this.node.instance = this, t.hasAttribute("svgjs:data") && this.setData(JSON.parse(t.getAttribute("svgjs:data")) || {});
  }

  center(t, e) {
    return this.cx(t).cy(e);
  }

  cx(t) {
    return null == t ? this.x() + this.width() / 2 : this.x(t - this.width() / 2);
  }

  cy(t) {
    return null == t ? this.y() + this.height() / 2 : this.y(t - this.height() / 2);
  }

  defs() {
    return this.root().defs();
  }

  dmove(t, e) {
    return this.dx(t).dy(e);
  }

  dx(t = 0) {
    return this.x(new _t(t).plus(this.x()));
  }

  dy(t = 0) {
    return this.y(new _t(t).plus(this.y()));
  }

  root() {
    const t = this.parent(y[g]);
    return t && t.root();
  }

  getEventHolder() {
    return this;
  }

  height(t) {
    return this.attr("height", t);
  }

  inside(t, e) {
    const i = this.bbox();
    return t > i.x && e > i.y && t < i.x + i.width && e < i.y + i.height;
  }

  move(t, e) {
    return this.x(t).y(e);
  }

  parents(t = p.document) {
    t = _(t);
    const e = new ut();
    let i = this;

    for (; (i = i.parent()) && i.node !== t.node && i.node !== p.document;) e.push(i);

    return e;
  }

  reference(t) {
    if (!(t = this.attr(t))) return null;
    const e = t.match(E);
    return e ? _(e[1]) : null;
  }

  setData(t) {
    return this.dom = t, this;
  }

  size(t, e) {
    const i = u(this, t, e);
    return this.width(new _t(i.width)).height(new _t(i.height));
  }

  width(t) {
    return this.attr("width", t);
  }

  writeDataToDom() {
    return this.node.removeAttribute("svgjs:data"), Object.keys(this.dom).length && this.node.setAttribute("svgjs:data", JSON.stringify(this.dom)), super.writeDataToDom();
  }

  x(t) {
    return this.attr("x", t);
  }

  y(t) {
    return this.attr("y", t);
  }

}

k(xt, {
  bbox: function () {
    return new ht(ot.call(this, t => t.getBBox(), t => {
      try {
        const e = t.clone().addTo(st().svg).show(),
              i = e.node.getBBox();
        return e.remove(), i;
      } catch (e) {
        throw new Error('Getting bbox of element "' + t.node.nodeName + '" is not possible. ' + e.toString());
      }
    }));
  },
  rbox: function (t) {
    const e = new ht(ot.call(this, t => t.getBoundingClientRect(), t => {
      throw new Error('Getting rbox of element "' + t.node.nodeName + '" is not possible');
    }));
    return t ? e.transform(t.screenCTM().inverse()) : e.addOffset();
  },
  point: function (t, e) {
    return new et(t, e).transform(this.screenCTM().inverse());
  },
  ctm: function () {
    return new nt(this.node.getCTM());
  },
  screenCTM: function () {
    if ("function" == typeof this.isRoot && !this.isRoot()) {
      var t = this.rect(1, 1),
          e = t.node.getScreenCTM();
      return t.remove(), new nt(e);
    }

    return new nt(this.node.getScreenCTM());
  }
}), O(xt, "Element");
var Ot = {
  stroke: ["color", "width", "opacity", "linecap", "linejoin", "miterlimit", "dasharray", "dashoffset"],
  fill: ["color", "opacity", "rule"],
  prefix: function (t, e) {
    return "color" === e ? t : t + "-" + e;
  }
};

function Nt(t) {
  return this.attr("rx", t);
}

function St(t) {
  return this.attr("ry", t);
}

function kt(t) {
  return null == t ? this.cx() - this.rx() : this.cx(t + this.rx());
}

function Tt(t) {
  return null == t ? this.cy() - this.ry() : this.cy(t + this.ry());
}

function Mt(t) {
  return null == t ? this.attr("cx") : this.attr("cx", t);
}

function At(t) {
  return null == t ? this.attr("cy") : this.attr("cy", t);
}

function Ct(t) {
  return null == t ? 2 * this.rx() : this.rx(new _t(t).divide(2));
}

function Et(t) {
  return null == t ? 2 * this.ry() : this.ry(new _t(t).divide(2));
}

["fill", "stroke"].forEach(function (t) {
  var e,
      n = {};
  n[t] = function (i) {
    if (void 0 === i) return this.attr(t);
    if ("string" == typeof i || i instanceof tt || tt.isRgb(i) || i instanceof xt) this.attr(t, i);else for (e = Ot[t].length - 1; e >= 0; e--) null != i[Ot[t][e]] && this.attr(Ot.prefix(t, Ot[t][e]), i[Ot[t][e]]);
    return this;
  }, i(["Element", "Runner"], n);
}), i(["Element", "Runner"], {
  matrix: function (t, e, i, n, s, r) {
    return null == t ? new nt(this) : this.attr("transform", new nt(t, e, i, n, s, r));
  },
  rotate: function (t, e, i) {
    return this.transform({
      rotate: t,
      ox: e,
      oy: i
    }, !0);
  },
  skew: function (t, e, i, n) {
    return 1 === arguments.length || 3 === arguments.length ? this.transform({
      skew: t,
      ox: e,
      oy: i
    }, !0) : this.transform({
      skew: [t, e],
      ox: i,
      oy: n
    }, !0);
  },
  shear: function (t, e, i) {
    return this.transform({
      shear: t,
      ox: e,
      oy: i
    }, !0);
  },
  scale: function (t, e, i, n) {
    return 1 === arguments.length || 3 === arguments.length ? this.transform({
      scale: t,
      ox: e,
      oy: i
    }, !0) : this.transform({
      scale: [t, e],
      ox: i,
      oy: n
    }, !0);
  },
  translate: function (t, e) {
    return this.transform({
      translate: [t, e]
    }, !0);
  },
  relative: function (t, e) {
    return this.transform({
      relative: [t, e]
    }, !0);
  },
  flip: function (t, e) {
    var i = "string" == typeof t ? t : (isFinite(t), "both"),
        n = "both" === t && isFinite(e) ? [e, e] : "x" === t ? [e, 0] : "y" === t ? [0, e] : isFinite(t) ? [t, t] : [0, 0];
    return this.transform({
      flip: i,
      origin: n
    }, !0);
  },
  opacity: function (t) {
    return this.attr("opacity", t);
  }
}), i("radius", {
  radius: function (t, e) {
    var i = (this._element || this).type;
    return "radialGradient" === i || "radialGradient" === i ? this.attr("r", new _t(t)) : this.rx(t).ry(null == e ? t : e);
  }
}), i("Path", {
  length: function () {
    return this.node.getTotalLength();
  },
  pointAt: function (t) {
    return new et(this.node.getPointAtLength(t));
  }
}), i(["Element", "Runner"], {
  font: function (t, e) {
    if ("object" == typeof t) {
      for (e in t) this.font(e, t[e]);

      return this;
    }

    return "leading" === t ? this.leading(e) : "anchor" === t ? this.attr("text-anchor", e) : "size" === t || "family" === t || "weight" === t || "stretch" === t || "variant" === t || "style" === t ? this.attr("font-" + t, e) : this.attr(t, e);
  }
}), i("Text", {
  ax(t) {
    return this.attr("x", t);
  },

  ay(t) {
    return this.attr("y", t);
  },

  amove(t, e) {
    return this.ax(t).ay(e);
  }

}), i("Element", ["click", "dblclick", "mousedown", "mouseup", "mouseover", "mouseout", "mousemove", "mouseenter", "mouseleave", "touchstart", "touchmove", "touchleave", "touchend", "touchcancel"].reduce(function (t, e) {
  return t[e] = function (t) {
    return null === t ? $(this, e) : V(this, e, t), this;
  }, t;
}, {})), i("Element", {
  untransform: function () {
    return this.attr("transform", null);
  },
  matrixify: function () {
    return (this.attr("transform") || "").split(I).slice(0, -1).map(function (t) {
      var e = t.trim().split("(");
      return [e[0], e[1].split(R).map(function (t) {
        return parseFloat(t);
      })];
    }).reverse().reduce(function (t, e) {
      return "matrix" === e[0] ? t.lmultiply(nt.fromArray(e[1])) : t[e[0]].apply(t, e[1]);
    }, new nt());
  },
  toParent: function (t) {
    if (this === t) return this;
    var e = this.screenCTM(),
        i = t.screenCTM().inverse();
    return this.addTo(t).untransform().transform(i.multiply(e)), this;
  },
  toRoot: function () {
    return this.toParent(this.root());
  },
  transform: function (t, e) {
    if (null == t || "string" == typeof t) {
      var i = new nt(this).decompose();
      return null == t ? i : i[t];
    }

    nt.isMatrixLike(t) || (t = { ...t,
      origin: l(t, this)
    });
    var n = new nt(!0 === e ? this : e || !1).transform(t);
    return this.attr("transform", n);
  }
});
var It,
    jt = Object.freeze({
  __proto__: null,
  rx: Nt,
  ry: St,
  x: kt,
  y: Tt,
  cx: Mt,
  cy: At,
  width: Ct,
  height: Et
});

class Lt extends xt {}

O(Lt, "Shape");

class Ht extends Lt {
  constructor(t) {
    super(w("circle", t), t);
  }

  radius(t) {
    return this.attr("r", t);
  }

  rx(t) {
    return this.attr("r", t);
  }

  ry(t) {
    return this.rx(t);
  }

  size(t) {
    return this.radius(new _t(t).divide(2));
  }

}

k(Ht, {
  x: kt,
  y: Tt,
  cx: Mt,
  cy: At,
  width: Ct,
  height: Et
}), i({
  Container: {
    circle: T(function (t) {
      return this.put(new Ht()).size(t).move(0, 0);
    })
  }
}), O(Ht, "Circle");

class Dt extends xt {
  flatten(t) {
    return this.each(function () {
      return this instanceof Dt ? this.flatten(t).ungroup(t) : this.toParent(t);
    }), this.node.firstElementChild || this.remove(), this;
  }

  ungroup(t) {
    return t = t || this.parent(), this.each(function () {
      return this.toParent(t);
    }), this.remove(), this;
  }

}

O(Dt, "Container");

class zt extends Dt {
  constructor(t) {
    super(w("defs", t), t);
  }

  flatten() {
    return this;
  }

  ungroup() {
    return this;
  }

}

O(zt, "Defs");

class Pt extends Lt {
  constructor(t) {
    super(w("ellipse", t), t);
  }

  size(t, e) {
    var i = u(this, t, e);
    return this.rx(new _t(i.width).divide(2)).ry(new _t(i.height).divide(2));
  }

}

k(Pt, jt), i("Container", {
  ellipse: T(function (t = 0, e = t) {
    return this.put(new Pt()).size(t, e).move(0, 0);
  })
}), O(Pt, "Ellipse");

class Rt extends xt {
  constructor(t) {
    super(w("stop", t), t);
  }

  update(t) {
    return ("number" == typeof t || t instanceof _t) && (t = {
      offset: arguments[0],
      color: arguments[1],
      opacity: arguments[2]
    }), null != t.opacity && this.attr("stop-opacity", t.opacity), null != t.color && this.attr("stop-color", t.color), null != t.offset && this.attr("offset", new _t(t.offset)), this;
  }

}

function Kt(t, e) {
  return "radialGradient" === (this._element || this).type ? this.attr({
    fx: new _t(t),
    fy: new _t(e)
  }) : this.attr({
    x1: new _t(t),
    y1: new _t(e)
  });
}

function Ft(t, e) {
  return "radialGradient" === (this._element || this).type ? this.attr({
    cx: new _t(t),
    cy: new _t(e)
  }) : this.attr({
    x2: new _t(t),
    y2: new _t(e)
  });
}

O(Rt, "Stop");

class qt extends Dt {
  constructor(t, e) {
    super(w(t + "Gradient", "string" == typeof t ? null : t), e);
  }

  stop(t, e, i) {
    return this.put(new Rt()).update(t, e, i);
  }

  update(t) {
    return this.clear(), "function" == typeof t && t.call(this, this), this;
  }

  url() {
    return "url(#" + this.id() + ")";
  }

  toString() {
    return this.url();
  }

  attr(t, e, i) {
    return "transform" === t && (t = "gradientTransform"), super.attr(t, e, i);
  }

  targets() {
    return ct('svg [fill*="' + this.id() + '"]');
  }

  bbox() {
    return new ht();
  }

}

k(qt, Object.freeze({
  __proto__: null,
  from: Kt,
  to: Ft
})), i({
  Container: {
    gradient: T(function (t, e) {
      return this.defs().gradient(t, e);
    })
  },
  Defs: {
    gradient: T(function (t, e) {
      return this.put(new qt(t)).update(e);
    })
  }
}), O(qt, "Gradient");

class Wt extends Dt {
  constructor(t) {
    super(w("pattern", t), t);
  }

  url() {
    return "url(#" + this.id() + ")";
  }

  update(t) {
    return this.clear(), "function" == typeof t && t.call(this, this), this;
  }

  toString() {
    return this.url();
  }

  attr(t, e, i) {
    return "transform" === t && (t = "patternTransform"), super.attr(t, e, i);
  }

  targets() {
    return ct('svg [fill*="' + this.id() + '"]');
  }

  bbox() {
    return new ht();
  }

}

i({
  Container: {
    pattern(...t) {
      return this.defs().pattern(...t);
    }

  },
  Defs: {
    pattern: T(function (t, e, i) {
      return this.put(new Wt()).update(i).attr({
        x: 0,
        y: 0,
        width: t,
        height: e,
        patternUnits: "userSpaceOnUse"
      });
    })
  }
}), O(Wt, "Pattern");

class Yt extends Lt {
  constructor(t) {
    super(w("image", t), t);
  }

  load(t, e) {
    if (!t) return this;
    var i = new p.window.Image();
    return V(i, "load", function (t) {
      var n = this.parent(Wt);
      0 === this.width() && 0 === this.height() && this.size(i.width, i.height), n instanceof Wt && 0 === n.width() && 0 === n.height() && n.size(this.width(), this.height()), "function" == typeof e && e.call(this, t);
    }, this), V(i, "load error", function () {
      $(i);
    }), this.attr("href", i.src = t, f);
  }

}

It = function (t, e, i) {
  return "fill" !== t && "stroke" !== t || P.test(e) && (e = i.root().defs().image(e)), e instanceof Yt && (e = i.root().defs().pattern(0, 0, t => {
    t.add(e);
  })), e;
}, wt.push(It), i({
  Container: {
    image: T(function (t, e) {
      return this.put(new Yt()).size(0, 0).load(t, e);
    })
  }
}), O(Yt, "Image");
const Bt = at("PointArray", vt);
k(Bt, {
  toString() {
    for (var t = 0, e = this.length, i = []; t < e; t++) i.push(this[t].join(","));

    return i.join(" ");
  },

  toLine() {
    return {
      x1: this[0][0],
      y1: this[0][1],
      x2: this[1][0],
      y2: this[1][1]
    };
  },

  at(t) {
    if (!this.destination) return this;

    for (var e = 0, i = this.length, n = []; e < i; e++) n.push([this[e][0] + (this.destination[e][0] - this[e][0]) * t, this[e][1] + (this.destination[e][1] - this[e][1]) * t]);

    return new Bt(n);
  },

  parse(t = [[0, 0]]) {
    var e = [];

    if (t instanceof Array) {
      if (t[0] instanceof Array) return t;
    } else t = t.trim().split(R).map(parseFloat);

    t.length % 2 != 0 && t.pop();

    for (var i = 0, n = t.length; i < n; i += 2) e.push([t[i], t[i + 1]]);

    return e;
  },

  transform(t) {
    const e = [];

    for (let i = 0; i < this.length; i++) {
      const n = this[i];
      e.push([t.a * n[0] + t.c * n[1] + t.e, t.b * n[0] + t.d * n[1] + t.f]);
    }

    return new Bt(e);
  },

  move(t, e) {
    var i = this.bbox();
    if (t -= i.x, e -= i.y, !isNaN(t) && !isNaN(e)) for (var n = this.length - 1; n >= 0; n--) this[n] = [this[n][0] + t, this[n][1] + e];
    return this;
  },

  size(t, e) {
    var i,
        n = this.bbox();

    for (i = this.length - 1; i >= 0; i--) n.width && (this[i][0] = (this[i][0] - n.x) * t / n.width + n.x), n.height && (this[i][1] = (this[i][1] - n.y) * e / n.height + n.y);

    return this;
  },

  bbox() {
    var t = -1 / 0,
        e = -1 / 0,
        i = 1 / 0,
        n = 1 / 0;
    return this.forEach(function (s) {
      t = Math.max(s[0], t), e = Math.max(s[1], e), i = Math.min(s[0], i), n = Math.min(s[1], n);
    }), {
      x: i,
      y: n,
      width: t - i,
      height: e - n
    };
  }

});
const Ut = Bt;
var Xt = Object.freeze({
  __proto__: null,
  MorphArray: Ut,
  x: function (t) {
    return null == t ? this.bbox().x : this.move(t, this.bbox().y);
  },
  y: function (t) {
    return null == t ? this.bbox().y : this.move(this.bbox().x, t);
  },
  width: function (t) {
    const e = this.bbox();
    return null == t ? e.width : this.size(t, e.height);
  },
  height: function (t) {
    const e = this.bbox();
    return null == t ? e.height : this.size(e.width, t);
  }
});

class Gt extends Lt {
  constructor(t) {
    super(w("line", t), t);
  }

  array() {
    return new Bt([[this.attr("x1"), this.attr("y1")], [this.attr("x2"), this.attr("y2")]]);
  }

  plot(t, e, i, n) {
    return null == t ? this.array() : (t = void 0 !== e ? {
      x1: t,
      y1: e,
      x2: i,
      y2: n
    } : new Bt(t).toLine(), this.attr(t));
  }

  move(t, e) {
    return this.attr(this.array().move(t, e).toLine());
  }

  size(t, e) {
    var i = u(this, t, e);
    return this.attr(this.array().size(i.width, i.height).toLine());
  }

}

k(Gt, Xt), i({
  Container: {
    line: T(function (...t) {
      return Gt.prototype.plot.apply(this.put(new Gt()), null != t[0] ? t : [0, 0, 0, 0]);
    })
  }
}), O(Gt, "Line");

class Vt extends Dt {
  constructor(t) {
    super(w("marker", t), t);
  }

  width(t) {
    return this.attr("markerWidth", t);
  }

  height(t) {
    return this.attr("markerHeight", t);
  }

  ref(t, e) {
    return this.attr("refX", t).attr("refY", e);
  }

  update(t) {
    return this.clear(), "function" == typeof t && t.call(this, this), this;
  }

  toString() {
    return "url(#" + this.id() + ")";
  }

}

function $t(t, e) {
  return function (i) {
    return null == i ? this[i] : (this[t] = i, e && e.call(this), this);
  };
}

i({
  Container: {
    marker(...t) {
      return this.defs().marker(...t);
    }

  },
  Defs: {
    marker: T(function (t, e, i) {
      return this.put(new Vt()).size(t, e).ref(t / 2, e / 2).viewbox(0, 0, t, e).attr("orient", "auto").update(i);
    })
  },
  marker: {
    marker(t, e, i, n) {
      var s = ["marker"];
      return "all" !== t && s.push(t), s = s.join("-"), t = arguments[1] instanceof Vt ? arguments[1] : this.defs().marker(e, i, n), this.attr(s, t);
    }

  }
}), O(Vt, "Marker");
const Qt = {
  "-": function (t) {
    return t;
  },
  "<>": function (t) {
    return -Math.cos(t * Math.PI) / 2 + .5;
  },
  ">": function (t) {
    return Math.sin(t * Math.PI / 2);
  },
  "<": function (t) {
    return 1 - Math.cos(t * Math.PI / 2);
  },
  bezier: function (t, e, i, n) {
    return function (s) {
      return s < 0 ? t > 0 ? e / t * s : i > 0 ? n / i * s : 0 : s > 1 ? i < 1 ? (1 - n) / (1 - i) * s + (n - i) / (1 - i) : t < 1 ? (1 - e) / (1 - t) * s + (e - t) / (1 - t) : 1 : 3 * s * (1 - s) ** 2 * e + 3 * s ** 2 * (1 - s) * n + s ** 3;
    };
  },
  steps: function (t, e = "end") {
    e = e.split("-").reverse()[0];
    let i = t;
    return "none" === e ? --i : "both" === e && ++i, (n, s = !1) => {
      let r = Math.floor(n * t);
      const h = n * r % 1 == 0;
      return "start" !== e && "both" !== e || ++r, s && h && --r, n >= 0 && r < 0 && (r = 0), n <= 1 && r > i && (r = i), r / i;
    };
  }
};

class Zt {
  done() {
    return !1;
  }

}

class Jt extends Zt {
  constructor(t) {
    super(), this.ease = Qt[t || mt] || t;
  }

  step(t, e, i) {
    return "number" != typeof t ? i < 1 ? t : e : t + (e - t) * this.ease(i);
  }

}

class te extends Zt {
  constructor(t) {
    super(), this.stepper = t;
  }

  step(t, e, i, n) {
    return this.stepper(t, e, i, n);
  }

  done(t) {
    return t.done;
  }

}

function ee() {
  var t = (this._duration || 500) / 1e3,
      e = this._overshoot || 0,
      i = Math.PI,
      n = Math.log(e / 100 + 1e-10),
      s = -n / Math.sqrt(i * i + n * n),
      r = 3.9 / (s * t);
  this.d = 2 * s * r, this.k = r * r;
}

k(class extends te {
  constructor(t, e) {
    super(), this.duration(t || 500).overshoot(e || 0);
  }

  step(t, e, i, n) {
    if ("string" == typeof t) return t;
    if (n.done = i === 1 / 0, i === 1 / 0) return e;
    if (0 === i) return t;
    i > 100 && (i = 16), i /= 1e3;
    var s = n.velocity || 0,
        r = -this.d * s - this.k * (t - e),
        h = t + s * i + r * i * i / 2;
    return n.velocity = s + r * i, n.done = Math.abs(e - h) + Math.abs(s) < .002, n.done ? e : h;
  }

}, {
  duration: $t("_duration", ee),
  overshoot: $t("_overshoot", ee)
});
k(class extends te {
  constructor(t, e, i, n) {
    super(), t = null == t ? .1 : t, e = null == e ? .01 : e, i = null == i ? 0 : i, n = null == n ? 1e3 : n, this.p(t).i(e).d(i).windup(n);
  }

  step(t, e, i, n) {
    if ("string" == typeof t) return t;
    if (n.done = i === 1 / 0, i === 1 / 0) return e;
    if (0 === i) return t;
    var s = e - t,
        r = (n.integral || 0) + s * i,
        h = (s - (n.error || 0)) / i,
        o = this.windup;
    return !1 !== o && (r = Math.max(-o, Math.min(r, o))), n.error = s, n.integral = r, n.done = Math.abs(s) < .001, n.done ? e : t + (this.P * s + this.I * r + this.D * h);
  }

}, {
  windup: $t("windup"),
  p: $t("P"),
  i: $t("I"),
  d: $t("D")
});
const ie = at("PathArray", vt);

function ne(t, e, i, n) {
  return i + n.replace(Y, " .");
}

const se = {
  M: function (t, e, i) {
    return e.x = i.x = t[0], e.y = i.y = t[1], ["M", e.x, e.y];
  },
  L: function (t, e) {
    return e.x = t[0], e.y = t[1], ["L", t[0], t[1]];
  },
  H: function (t, e) {
    return e.x = t[0], ["H", t[0]];
  },
  V: function (t, e) {
    return e.y = t[0], ["V", t[0]];
  },
  C: function (t, e) {
    return e.x = t[4], e.y = t[5], ["C", t[0], t[1], t[2], t[3], t[4], t[5]];
  },
  S: function (t, e) {
    return e.x = t[2], e.y = t[3], ["S", t[0], t[1], t[2], t[3]];
  },
  Q: function (t, e) {
    return e.x = t[2], e.y = t[3], ["Q", t[0], t[1], t[2], t[3]];
  },
  T: function (t, e) {
    return e.x = t[0], e.y = t[1], ["T", t[0], t[1]];
  },
  Z: function (t, e, i) {
    return e.x = i.x, e.y = i.y, ["Z"];
  },
  A: function (t, e) {
    return e.x = t[5], e.y = t[6], ["A", t[0], t[1], t[2], t[3], t[4], t[5], t[6]];
  }
},
      re = "mlhvqtcsaz".split("");

for (var he = 0, oe = re.length; he < oe; ++he) se[re[he]] = function (t) {
  return function (e, i, n) {
    if ("H" === t) e[0] = e[0] + i.x;else if ("V" === t) e[0] = e[0] + i.y;else if ("A" === t) e[5] = e[5] + i.x, e[6] = e[6] + i.y;else for (var s = 0, r = e.length; s < r; ++s) e[s] = e[s] + (s % 2 ? i.y : i.x);
    return se[t](e, i, n);
  };
}(re[he].toUpperCase());

k(ie, {
  toString() {
    return function (t) {
      for (var e = 0, i = t.length, n = ""; e < i; e++) n += t[e][0], null != t[e][1] && (n += t[e][1], null != t[e][2] && (n += " ", n += t[e][2], null != t[e][3] && (n += " ", n += t[e][3], n += " ", n += t[e][4], null != t[e][5] && (n += " ", n += t[e][5], n += " ", n += t[e][6], null != t[e][7] && (n += " ", n += t[e][7])))));

      return n + " ";
    }(this);
  },

  move(t, e) {
    var i = this.bbox();
    if (t -= i.x, e -= i.y, !isNaN(t) && !isNaN(e)) for (var n, s = this.length - 1; s >= 0; s--) "M" === (n = this[s][0]) || "L" === n || "T" === n ? (this[s][1] += t, this[s][2] += e) : "H" === n ? this[s][1] += t : "V" === n ? this[s][1] += e : "C" === n || "S" === n || "Q" === n ? (this[s][1] += t, this[s][2] += e, this[s][3] += t, this[s][4] += e, "C" === n && (this[s][5] += t, this[s][6] += e)) : "A" === n && (this[s][6] += t, this[s][7] += e);
    return this;
  },

  size(t, e) {
    var i,
        n,
        s = this.bbox();

    for (s.width = 0 === s.width ? 1 : s.width, s.height = 0 === s.height ? 1 : s.height, i = this.length - 1; i >= 0; i--) "M" === (n = this[i][0]) || "L" === n || "T" === n ? (this[i][1] = (this[i][1] - s.x) * t / s.width + s.x, this[i][2] = (this[i][2] - s.y) * e / s.height + s.y) : "H" === n ? this[i][1] = (this[i][1] - s.x) * t / s.width + s.x : "V" === n ? this[i][1] = (this[i][1] - s.y) * e / s.height + s.y : "C" === n || "S" === n || "Q" === n ? (this[i][1] = (this[i][1] - s.x) * t / s.width + s.x, this[i][2] = (this[i][2] - s.y) * e / s.height + s.y, this[i][3] = (this[i][3] - s.x) * t / s.width + s.x, this[i][4] = (this[i][4] - s.y) * e / s.height + s.y, "C" === n && (this[i][5] = (this[i][5] - s.x) * t / s.width + s.x, this[i][6] = (this[i][6] - s.y) * e / s.height + s.y)) : "A" === n && (this[i][1] = this[i][1] * t / s.width, this[i][2] = this[i][2] * e / s.height, this[i][6] = (this[i][6] - s.x) * t / s.width + s.x, this[i][7] = (this[i][7] - s.y) * e / s.height + s.y);

    return this;
  },

  equalCommands(t) {
    var e, i, n;

    for (t = new ie(t), n = this.length === t.length, e = 0, i = this.length; n && e < i; e++) n = this[e][0] === t[e][0];

    return n;
  },

  morph(t) {
    return t = new ie(t), this.equalCommands(t) ? this.destination = t : this.destination = null, this;
  },

  at(t) {
    if (!this.destination) return this;
    var e,
        i,
        n,
        s,
        r = this.destination.value,
        h = [],
        o = new ie();

    for (e = 0, i = this.length; e < i; e++) {
      for (h[e] = [this[e][0]], n = 1, s = this[e].length; n < s; n++) h[e][n] = this[e][n] + (r[e][n] - this[e][n]) * t;

      "A" === h[e][0] && (h[e][4] = +(0 !== h[e][4]), h[e][5] = +(0 !== h[e][5]));
    }

    return o.value = h, o;
  },

  parse(t = [["M", 0, 0]]) {
    if (t instanceof ie) return t;
    var e,
        i = {
      M: 2,
      L: 2,
      H: 1,
      V: 1,
      C: 6,
      S: 4,
      Q: 4,
      T: 2,
      A: 7,
      Z: 0
    };
    t = "string" == typeof t ? t.replace(W, ne).replace(F, " $& ").replace(K, "$1 -").trim().split(R) : t.reduce(function (t, e) {
      return [].concat.call(t, e);
    }, []);
    var n = [],
        s = new et(),
        r = new et(),
        h = 0,
        o = t.length;

    do {
      q.test(t[h]) ? (e = t[h], ++h) : "M" === e ? e = "L" : "m" === e && (e = "l"), n.push(se[e].call(null, t.slice(h, h += i[e.toUpperCase()]).map(parseFloat), s, r));
    } while (o > h);

    return n;
  },

  bbox() {
    return st().path.setAttribute("d", this.toString()), st.nodes.path.getBBox();
  }

});

class ae {
  constructor(t) {
    this._stepper = t || new Jt("-"), this._from = null, this._to = null, this._type = null, this._context = null, this._morphObj = null;
  }

  from(t) {
    return null == t ? this._from : (this._from = this._set(t), this);
  }

  to(t) {
    return null == t ? this._to : (this._to = this._set(t), this);
  }

  type(t) {
    return null == t ? this._type : (this._type = t, this);
  }

  _set(t) {
    if (!this._type) {
      var e = typeof t;
      "number" === e ? this.type(_t) : "string" === e ? tt.isColor(t) ? this.type(tt) : R.test(t) ? this.type(F.test(t) ? ie : vt) : M.test(t) ? this.type(_t) : this.type(ue) : de.indexOf(t.constructor) > -1 ? this.type(t.constructor) : Array.isArray(t) ? this.type(vt) : "object" === e ? this.type(ce) : this.type(ue);
    }

    var i = new this._type(t);
    return this._type === tt && (i = this._to ? i[this._to[4]]() : this._from ? i[this._from[4]]() : i), i = i.toArray(), this._morphObj = this._morphObj || new this._type(), this._context = this._context || Array.apply(null, Array(i.length)).map(Object).map(function (t) {
      return t.done = !0, t;
    }), i;
  }

  stepper(t) {
    return null == t ? this._stepper : (this._stepper = t, this);
  }

  done() {
    return this._context.map(this._stepper.done).reduce(function (t, e) {
      return t && e;
    }, !0);
  }

  at(t) {
    var e = this;
    return this._morphObj.fromArray(this._from.map(function (i, n) {
      return e._stepper.step(i, e._to[n], t, e._context[n], e._context);
    }));
  }

}

class ue {
  constructor(...t) {
    this.init(...t);
  }

  init(t) {
    return t = Array.isArray(t) ? t[0] : t, this.value = t, this;
  }

  valueOf() {
    return this.value;
  }

  toArray() {
    return [this.value];
  }

}

class le {
  constructor(...t) {
    this.init(...t);
  }

  init(t) {
    return Array.isArray(t) && (t = {
      scaleX: t[0],
      scaleY: t[1],
      shear: t[2],
      rotate: t[3],
      translateX: t[4],
      translateY: t[5],
      originX: t[6],
      originY: t[7]
    }), Object.assign(this, le.defaults, t), this;
  }

  toArray() {
    var t = this;
    return [t.scaleX, t.scaleY, t.shear, t.rotate, t.translateX, t.translateY, t.originX, t.originY];
  }

}

le.defaults = {
  scaleX: 1,
  scaleY: 1,
  shear: 0,
  rotate: 0,
  translateX: 0,
  translateY: 0,
  originX: 0,
  originY: 0
};

class ce {
  constructor(...t) {
    this.init(...t);
  }

  init(t) {
    if (this.values = [], !Array.isArray(t)) {
      t = t || {};
      var e = [];

      for (const i in t) e.push([i, t[i]]);

      return e.sort((t, e) => t[0] - e[0]), this.values = e.reduce((t, e) => t.concat(e), []), this;
    }

    this.values = t;
  }

  valueOf() {
    for (var t = {}, e = this.values, i = 0, n = e.length; i < n; i += 2) t[e[i]] = e[i + 1];

    return t;
  }

  toArray() {
    return this.values;
  }

}

const de = [ue, le, ce];

class fe extends Lt {
  constructor(t) {
    super(w("path", t), t);
  }

  array() {
    return this._array || (this._array = new ie(this.attr("d")));
  }

  plot(t) {
    return null == t ? this.array() : this.clear().attr("d", "string" == typeof t ? t : this._array = new ie(t));
  }

  clear() {
    return delete this._array, this;
  }

  move(t, e) {
    return this.attr("d", this.array().move(t, e));
  }

  x(t) {
    return null == t ? this.bbox().x : this.move(t, this.bbox().y);
  }

  y(t) {
    return null == t ? this.bbox().y : this.move(this.bbox().x, t);
  }

  size(t, e) {
    var i = u(this, t, e);
    return this.attr("d", this.array().size(i.width, i.height));
  }

  width(t) {
    return null == t ? this.bbox().width : this.size(t, this.bbox().height);
  }

  height(t) {
    return null == t ? this.bbox().height : this.size(this.bbox().width, t);
  }

  targets() {
    return ct('svg textpath [href*="' + this.id() + '"]');
  }

}

fe.prototype.MorphArray = ie, i({
  Container: {
    path: T(function (t) {
      return this.put(new fe()).plot(t || new ie());
    })
  }
}), O(fe, "Path");
var pe = Object.freeze({
  __proto__: null,
  array: function () {
    return this._array || (this._array = new Bt(this.attr("points")));
  },
  plot: function (t) {
    return null == t ? this.array() : this.clear().attr("points", "string" == typeof t ? t : this._array = new Bt(t));
  },
  clear: function () {
    return delete this._array, this;
  },
  move: function (t, e) {
    return this.attr("points", this.array().move(t, e));
  },
  size: function (t, e) {
    const i = u(this, t, e);
    return this.attr("points", this.array().size(i.width, i.height));
  }
});

class me extends Lt {
  constructor(t) {
    super(w("polygon", t), t);
  }

}

i({
  Container: {
    polygon: T(function (t) {
      return this.put(new me()).plot(t || new Bt());
    })
  }
}), k(me, Xt), k(me, pe), O(me, "Polygon");

class ye extends Lt {
  constructor(t) {
    super(w("polyline", t), t);
  }

}

i({
  Container: {
    polyline: T(function (t) {
      return this.put(new ye()).plot(t || new Bt());
    })
  }
}), k(ye, Xt), k(ye, pe), O(ye, "Polyline");

class ge extends Lt {
  constructor(t) {
    super(w("rect", t), t);
  }

}

k(ge, {
  rx: Nt,
  ry: St
}), i({
  Container: {
    rect: T(function (t, e) {
      return this.put(new ge()).size(t, e);
    })
  }
}), O(ge, "Rect");

class ve {
  constructor() {
    this._first = null, this._last = null;
  }

  push(t) {
    var e = t.next ? t : {
      value: t,
      next: null,
      prev: null
    };
    return this._last ? (e.prev = this._last, this._last.next = e, this._last = e) : (this._last = e, this._first = e), e;
  }

  shift() {
    var t = this._first;
    return t ? (this._first = t.next, this._first && (this._first.prev = null), this._last = this._first ? this._last : null, t.value) : null;
  }

  first() {
    return this._first && this._first.value;
  }

  last() {
    return this._last && this._last.value;
  }

  remove(t) {
    t.prev && (t.prev.next = t.next), t.next && (t.next.prev = t.prev), t === this._last && (this._last = t.prev), t === this._first && (this._first = t.next), t.prev = null, t.next = null;
  }

}

const _e = {
  nextDraw: null,
  frames: new ve(),
  timeouts: new ve(),
  immediates: new ve(),
  timer: () => p.window.performance || p.window.Date,
  transforms: [],

  frame(t) {
    var e = _e.frames.push({
      run: t
    });

    return null === _e.nextDraw && (_e.nextDraw = p.window.requestAnimationFrame(_e._draw)), e;
  },

  timeout(t, e) {
    e = e || 0;

    var i = _e.timer().now() + e,
        n = _e.timeouts.push({
      run: t,
      time: i
    });

    return null === _e.nextDraw && (_e.nextDraw = p.window.requestAnimationFrame(_e._draw)), n;
  },

  immediate(t) {
    var e = _e.immediates.push(t);

    return null === _e.nextDraw && (_e.nextDraw = p.window.requestAnimationFrame(_e._draw)), e;
  },

  cancelFrame(t) {
    null != t && _e.frames.remove(t);
  },

  clearTimeout(t) {
    null != t && _e.timeouts.remove(t);
  },

  cancelImmediate(t) {
    null != t && _e.immediates.remove(t);
  },

  _draw(t) {
    for (var e = null, i = _e.timeouts.last(); (e = _e.timeouts.shift()) && (t >= e.time ? e.run() : _e.timeouts.push(e), e !== i););

    for (var n = null, s = _e.frames.last(); n !== s && (n = _e.frames.shift());) n.run(t);

    for (var r = null; r = _e.immediates.shift();) r();

    _e.nextDraw = _e.timeouts.first() || _e.frames.first() ? p.window.requestAnimationFrame(_e._draw) : null;
  }

};

var we = function (t) {
  var e = t.start,
      i = t.runner.duration();
  return {
    start: e,
    duration: i,
    end: e + i,
    runner: t.runner
  };
};

const be = function () {
  const t = p.window;
  return (t.performance || t.Date).now();
};

class xe extends dt {
  constructor(t = be) {
    super(), this._timeSource = t, this._startTime = 0, this._speed = 1, this._persist = 0, this._nextFrame = null, this._paused = !0, this._runners = [], this._runnerIds = [], this._lastRunnerId = -1, this._time = 0, this._lastSourceTime = 0, this._lastStepTime = 0, this._step = this._stepFn.bind(this, !1), this._stepImmediate = this._stepFn.bind(this, !0);
  }

  schedule(t, e, i) {
    if (null == t) return this._runners.map(we);
    var n = 0,
        s = this.getEndTime();
    if (e = e || 0, null == i || "last" === i || "after" === i) n = s;else if ("absolute" === i || "start" === i) n = e, e = 0;else if ("now" === i) n = this._time;else {
      if ("relative" !== i) throw new Error('Invalid value for the "when" parameter');
      {
        const i = this._runners[t.id];
        i && (n = i.start + e, e = 0);
      }
    }
    t.unschedule(), t.timeline(this);
    const r = t.persist(),
          h = {
      persist: null === r ? this._persist : r,
      start: n + e,
      runner: t
    };
    return this._lastRunnerId = t.id, this._runners.push(h), this._runners.sort((t, e) => t.start - e.start), this._runnerIds = this._runners.map(t => t.runner.id), this.updateTime()._continue(), this;
  }

  unschedule(t) {
    var e = this._runnerIds.indexOf(t.id);

    return e < 0 || (this._runners.splice(e, 1), this._runnerIds.splice(e, 1), t.timeline(null)), this;
  }

  getEndTime() {
    var t = this._runners[this._runnerIds.indexOf(this._lastRunnerId)],
        e = t ? t.runner.duration() : 0;

    return (t ? t.start : 0) + e;
  }

  getEndTimeOfTimeline() {
    let t = 0;

    for (var e = 0; e < this._runners.length; e++) {
      const n = this._runners[e];
      var i = n ? n.runner.duration() : 0;
      const s = (n ? n.start : 0) + i;
      s > t && (t = s);
    }

    return t;
  }

  updateTime() {
    return this.active() || (this._lastSourceTime = this._timeSource()), this;
  }

  play() {
    return this._paused = !1, this.updateTime()._continue();
  }

  pause() {
    return this._paused = !0, this._continue();
  }

  stop() {
    return this.time(0), this.pause();
  }

  finish() {
    return this.time(this.getEndTimeOfTimeline() + 1), this.pause();
  }

  speed(t) {
    return null == t ? this._speed : (this._speed = t, this);
  }

  reverse(t) {
    var e = this.speed();
    if (null == t) return this.speed(-e);
    var i = Math.abs(e);
    return this.speed(t ? i : -i);
  }

  seek(t) {
    return this.time(this._time + t);
  }

  time(t) {
    return null == t ? this._time : (this._time = t, this._continue(!0));
  }

  persist(t) {
    return null == t ? this._persist : (this._persist = t, this);
  }

  source(t) {
    return null == t ? this._timeSource : (this._timeSource = t, this);
  }

  _stepFn(t = !1) {
    var e = this._timeSource(),
        i = e - this._lastSourceTime;

    t && (i = 0);
    var n = this._speed * i + (this._time - this._lastStepTime);
    this._lastSourceTime = e, t || (this._time += n, this._time = this._time < 0 ? 0 : this._time), this._lastStepTime = this._time, this.fire("time", this._time);

    for (var s = this._runners.length; s--;) {
      const t = this._runners[s],
            e = t.runner;
      this._time - t.start <= 0 && e.reset();
    }

    for (var r = !1, h = 0, o = this._runners.length; h < o; h++) {
      const t = this._runners[h],
            e = t.runner;
      let i = n;
      const s = this._time - t.start;
      if (s <= 0) r = !0;else if (s < i && (i = s), e.active()) if (e.step(i).done) {
        if (!0 !== t.persist) {
          e.duration() - e.time() + this._time + t.persist < this._time && (e.unschedule(), --h, --o);
        }
      } else r = !0;
    }

    return r && !(this._speed < 0 && 0 === this._time) || this._runnerIds.length && this._speed < 0 && this._time > 0 ? this._continue() : (this.pause(), this.fire("finished")), this;
  }

  _continue(t = !1) {
    return _e.cancelFrame(this._nextFrame), this._nextFrame = null, t ? this._stepImmediate() : (this._paused || (this._nextFrame = _e.frame(this._step)), this);
  }

  active() {
    return !!this._nextFrame;
  }

}

i({
  Element: {
    timeline: function (t) {
      return null == t ? (this._timeline = this._timeline || new xe(), this._timeline) : (this._timeline = t, this);
    }
  }
});

class Oe extends dt {
  constructor(t) {
    super(), this.id = Oe.id++, t = "function" == typeof (t = null == t ? pt : t) ? new te(t) : t, this._element = null, this._timeline = null, this.done = !1, this._queue = [], this._duration = "number" == typeof t && t, this._isDeclarative = t instanceof te, this._stepper = this._isDeclarative ? t : new Jt(), this._history = {}, this.enabled = !0, this._time = 0, this._lastTime = 0, this._reseted = !0, this.transforms = new nt(), this.transformId = 1, this._haveReversed = !1, this._reverse = !1, this._loopsDone = 0, this._swing = !1, this._wait = 0, this._times = 1, this._frameId = null, this._persist = !!this._isDeclarative || null;
  }

  element(t) {
    return null == t ? this._element : (this._element = t, t._prepareRunner(), this);
  }

  timeline(t) {
    return void 0 === t ? this._timeline : (this._timeline = t, this);
  }

  animate(t, e, i) {
    var n = Oe.sanitise(t, e, i),
        s = new Oe(n.duration);
    return this._timeline && s.timeline(this._timeline), this._element && s.element(this._element), s.loop(n).schedule(n.delay, n.when);
  }

  schedule(t, e, i) {
    if (t instanceof xe || (i = e, e = t, t = this.timeline()), !t) throw Error("Runner cannot be scheduled without timeline");
    return t.schedule(this, e, i), this;
  }

  unschedule() {
    var t = this.timeline();
    return t && t.unschedule(this), this;
  }

  loop(t, e, i) {
    return "object" == typeof t && (e = t.swing, i = t.wait, t = t.times), this._times = t || 1 / 0, this._swing = e || !1, this._wait = i || 0, !0 === this._times && (this._times = 1 / 0), this;
  }

  delay(t) {
    return this.animate(0, t);
  }

  queue(t, e, i, n) {
    return this._queue.push({
      initialiser: t || ft,
      runner: e || ft,
      retarget: i,
      isTransform: n,
      initialised: !1,
      finished: !1
    }), this.timeline() && this.timeline()._continue(), this;
  }

  during(t) {
    return this.queue(null, t);
  }

  after(t) {
    return this.on("finished", t);
  }

  time(t) {
    if (null == t) return this._time;
    const e = t - this._time;
    return this.step(e), this;
  }

  duration() {
    return this._times * (this._wait + this._duration) - this._wait;
  }

  loops(t) {
    var e = this._duration + this._wait;

    if (null == t) {
      var i = Math.floor(this._time / e),
          n = (this._time - i * e) / this._duration;
      return Math.min(i + n, this._times);
    }

    var s = t % 1,
        r = e * Math.floor(t) + this._duration * s;
    return this.time(r);
  }

  persist(t) {
    return null == t ? this._persist : (this._persist = t, this);
  }

  position(t) {
    var e,
        i = this._time,
        n = this._duration,
        s = this._wait,
        r = this._times,
        h = this._swing,
        o = this._reverse;

    if (null == t) {
      const t = function (t) {
        var e = h * Math.floor(t % (2 * (s + n)) / (s + n)),
            i = e && !o || !e && o,
            r = Math.pow(-1, i) * (t % (s + n)) / n + i;
        return Math.max(Math.min(r, 1), 0);
      };

      var a = r * (s + n) - s;
      return e = i <= 0 ? Math.round(t(1e-5)) : i < a ? t(i) : Math.round(t(a - 1e-5));
    }

    var u = Math.floor(this.loops()),
        l = h && u % 2 == 0;
    return e = u + (l && !o || o && l ? t : 1 - t), this.loops(e);
  }

  progress(t) {
    return null == t ? Math.min(1, this._time / this.duration()) : this.time(t * this.duration());
  }

  step(t) {
    if (!this.enabled) return this;
    t = null == t ? 16 : t, this._time += t;
    var e = this.position(),
        i = this._lastPosition !== e && this._time >= 0;
    this._lastPosition = e;
    var n = this.duration(),
        s = this._lastTime <= 0 && this._time > 0,
        r = this._lastTime < n && this._time >= n;
    this._lastTime = this._time, s && this.fire("start", this);
    var h = this._isDeclarative;

    if (this.done = !h && !r && this._time >= n, this._reseted = !1, i || h) {
      this._initialise(i), this.transforms = new nt();

      var o = this._run(h ? t : e);

      this.fire("step", this);
    }

    return this.done = this.done || o && h, r && this.fire("finished", this), this;
  }

  reset() {
    return this._reseted || (this.time(0), this._reseted = !0), this;
  }

  finish() {
    return this.step(1 / 0);
  }

  reverse(t) {
    return this._reverse = null == t ? !this._reverse : t, this;
  }

  ease(t) {
    return this._stepper = new Jt(t), this;
  }

  active(t) {
    return null == t ? this.enabled : (this.enabled = t, this);
  }

  _rememberMorpher(t, e) {
    if (this._history[t] = {
      morpher: e,
      caller: this._queue[this._queue.length - 1]
    }, this._isDeclarative) {
      var i = this.timeline();
      i && i.play();
    }
  }

  _tryRetarget(t, e, i) {
    if (this._history[t]) {
      if (!this._history[t].caller.initialised) {
        const e = this._queue.indexOf(this._history[t].caller);

        return this._queue.splice(e, 1), !1;
      }

      this._history[t].caller.retarget ? this._history[t].caller.retarget(e, i) : this._history[t].morpher.to(e), this._history[t].caller.finished = !1;
      var n = this.timeline();
      return n && n.play(), !0;
    }

    return !1;
  }

  _initialise(t) {
    if (t || this._isDeclarative) for (var e = 0, i = this._queue.length; e < i; ++e) {
      var n = this._queue[e],
          s = this._isDeclarative || !n.initialised && t;
      t = !n.finished, s && t && (n.initialiser.call(this), n.initialised = !0);
    }
  }

  _run(t) {
    for (var e = !0, i = 0, n = this._queue.length; i < n; ++i) {
      var s = this._queue[i],
          r = s.runner.call(this, t);
      s.finished = s.finished || !0 === r, e = e && s.finished;
    }

    return e;
  }

  addTransform(t, e) {
    return this.transforms.lmultiplyO(t), this;
  }

  clearTransform() {
    return this.transforms = new nt(), this;
  }

  clearTransformsFromQueue() {
    this.done && this._timeline && this._timeline._runnerIds.includes(this.id) || (this._queue = this._queue.filter(t => !t.isTransform));
  }

  static sanitise(t, e, i) {
    var n = 1,
        s = !1,
        r = 0;
    return e = e || yt, i = i || "last", "object" != typeof (t = t || pt) || t instanceof Zt || (e = t.delay || e, i = t.when || i, s = t.swing || s, n = t.times || n, r = t.wait || r, t = t.duration || pt), {
      duration: t,
      delay: e,
      swing: s,
      times: n,
      wait: r,
      when: i
    };
  }

}

Oe.id = 0;

class Ne {
  constructor(t = new nt(), e = -1, i = !0) {
    this.transforms = t, this.id = e, this.done = i;
  }

  clearTransformsFromQueue() {}

}

k([Oe, Ne], {
  mergeWith(t) {
    return new Ne(t.transforms.lmultiply(this.transforms), t.id);
  }

});

const Se = (t, e) => t.lmultiplyO(e),
      ke = t => t.transforms;

function Te() {
  const t = this._transformationRunners.runners.map(ke).reduce(Se, new nt());

  this.transform(t), this._transformationRunners.merge(), 1 === this._transformationRunners.length() && (this._frameId = null);
}

class Me {
  constructor() {
    this.runners = [], this.ids = [];
  }

  add(t) {
    if (this.runners.includes(t)) return;
    const e = t.id + 1;
    return this.runners.push(t), this.ids.push(e), this;
  }

  getByID(t) {
    return this.runners[this.ids.indexOf(t + 1)];
  }

  remove(t) {
    const e = this.ids.indexOf(t + 1);
    return this.ids.splice(e, 1), this.runners.splice(e, 1), this;
  }

  merge() {
    let t = null;
    return this.runners.forEach((e, i) => {
      t && e.done && t.done && (!e._timeline || !e._timeline._runnerIds.includes(e.id)) && (!t._timeline || !t._timeline._runnerIds.includes(t.id)) && (this.remove(e.id), this.edit(t.id, e.mergeWith(t))), t = e;
    }), this;
  }

  edit(t, e) {
    const i = this.ids.indexOf(t + 1);
    return this.ids.splice(i, 1, t + 1), this.runners.splice(i, 1, e), this;
  }

  length() {
    return this.ids.length;
  }

  clearBefore(t) {
    const e = this.ids.indexOf(t + 1) || 1;
    return this.ids.splice(0, e, 0), this.runners.splice(0, e, new Ne()).forEach(t => t.clearTransformsFromQueue()), this;
  }

}

i({
  Element: {
    animate(t, e, i) {
      var n = Oe.sanitise(t, e, i),
          s = this.timeline();
      return new Oe(n.duration).loop(n).element(this).timeline(s.play()).schedule(n.delay, n.when);
    },

    delay(t, e) {
      return this.animate(0, t, e);
    },

    _clearTransformRunnersBefore(t) {
      this._transformationRunners.clearBefore(t.id);
    },

    _currentTransform(t) {
      return this._transformationRunners.runners.filter(e => e.id <= t.id).map(ke).reduce(Se, new nt());
    },

    _addRunner(t) {
      this._transformationRunners.add(t), _e.cancelImmediate(this._frameId), this._frameId = _e.immediate(Te.bind(this));
    },

    _prepareRunner() {
      null == this._frameId && (this._transformationRunners = new Me().add(new Ne(new nt(this))));
    }

  }
}), k(Oe, {
  attr(t, e) {
    return this.styleAttr("attr", t, e);
  },

  css(t, e) {
    return this.styleAttr("css", t, e);
  },

  styleAttr(t, e, i) {
    if ("object" == typeof e) {
      for (var n in e) this.styleAttr(t, n, e[n]);

      return this;
    }

    var s = new ae(this._stepper).to(i);
    return this.queue(function () {
      s = s.from(this.element()[t](e));
    }, function (i) {
      return this.element()[t](e, s.at(i)), s.done();
    }), this;
  },

  zoom(t, e) {
    if (this._tryRetarget("zoom", Ft, e)) return this;
    var i = new ae(this._stepper).to(new _t(t));
    return this.queue(function () {
      i = i.from(this.element().zoom());
    }, function (t) {
      return this.element().zoom(i.at(t), e), i.done();
    }, function (t, n) {
      e = n, i.to(t);
    }), this._rememberMorpher("zoom", i), this;
  },

  transform(t, e, i) {
    if (e = t.relative || e, this._isDeclarative && !e && this._tryRetarget("transform", t)) return this;
    var n = nt.isMatrixLike(t);
    i = null != t.affine ? t.affine : null != i ? i : !n;
    const s = new ae(this._stepper).type(i ? le : nt);
    let r, h, o, a, u;
    return this.queue(function () {
      h = h || this.element(), r = r || l(t, h), u = new nt(e ? void 0 : h), h._addRunner(this), e || h._clearTransformRunnersBefore(this);
    }, function (l) {
      e || this.clearTransform();
      const {
        x: c,
        y: d
      } = new et(r).transform(h._currentTransform(this));
      let f = new nt({ ...t,
        origin: [c, d]
      }),
          p = this._isDeclarative && o ? o : u;

      if (i) {
        f = f.decompose(c, d), p = p.decompose(c, d);
        const t = f.rotate,
              e = p.rotate,
              i = [t - 360, t, t + 360],
              n = i.map(t => Math.abs(t - e)),
              s = Math.min(...n),
              r = n.indexOf(s);
        f.rotate = i[r];
      }

      e && (n || (f.rotate = t.rotate || 0), this._isDeclarative && a && (p.rotate = a)), s.from(p), s.to(f);
      const m = s.at(l);
      return a = m.rotate, o = new nt(m), this.addTransform(o), h._addRunner(this), s.done();
    }, function (e) {
      (e.origin || "center").toString() !== (t.origin || "center").toString() && (r = l(t, h)), t = { ...e,
        origin: r
      };
    }, !0), this._isDeclarative && this._rememberMorpher("transform", s), this;
  },

  x(t, e) {
    return this._queueNumber("x", t);
  },

  y(t) {
    return this._queueNumber("y", t);
  },

  dx(t = 0) {
    return this._queueNumberDelta("x", t);
  },

  dy(t = 0) {
    return this._queueNumberDelta("y", t);
  },

  dmove(t, e) {
    return this.dx(t).dy(e);
  },

  _queueNumberDelta(t, e) {
    if (e = new _t(e), this._tryRetarget(t, e)) return this;
    var i = new ae(this._stepper).to(e),
        n = null;
    return this.queue(function () {
      n = this.element()[t](), i.from(n), i.to(n + e);
    }, function (e) {
      return this.element()[t](i.at(e)), i.done();
    }, function (t) {
      i.to(n + new _t(t));
    }), this._rememberMorpher(t, i), this;
  },

  _queueObject(t, e) {
    if (this._tryRetarget(t, e)) return this;
    var i = new ae(this._stepper).to(e);
    return this.queue(function () {
      i.from(this.element()[t]());
    }, function (e) {
      return this.element()[t](i.at(e)), i.done();
    }), this._rememberMorpher(t, i), this;
  },

  _queueNumber(t, e) {
    return this._queueObject(t, new _t(e));
  },

  cx(t) {
    return this._queueNumber("cx", t);
  },

  cy(t) {
    return this._queueNumber("cy", t);
  },

  move(t, e) {
    return this.x(t).y(e);
  },

  center(t, e) {
    return this.cx(t).cy(e);
  },

  size(t, e) {
    var i;
    return t && e || (i = this._element.bbox()), t || (t = i.width / i.height * e), e || (e = i.height / i.width * t), this.width(t).height(e);
  },

  width(t) {
    return this._queueNumber("width", t);
  },

  height(t) {
    return this._queueNumber("height", t);
  },

  plot(t, e, i, n) {
    if (4 === arguments.length) return this.plot([t, e, i, n]);
    if (this._tryRetarget("plot", t)) return this;
    var s = new ae(this._stepper).type(this._element.MorphArray).to(t);
    return this.queue(function () {
      s.from(this._element.array());
    }, function (t) {
      return this._element.plot(s.at(t)), s.done();
    }), this._rememberMorpher("plot", s), this;
  },

  leading(t) {
    return this._queueNumber("leading", t);
  },

  viewbox(t, e, i, n) {
    return this._queueObject("viewbox", new ht(t, e, i, n));
  },

  update(t) {
    return "object" != typeof t ? this.update({
      offset: arguments[0],
      color: arguments[1],
      opacity: arguments[2]
    }) : (null != t.opacity && this.attr("stop-opacity", t.opacity), null != t.color && this.attr("stop-color", t.color), null != t.offset && this.attr("offset", t.offset), this);
  }

}), k(Oe, {
  rx: Nt,
  ry: St,
  from: Kt,
  to: Ft
}), O(Oe, "Runner");

class Ae extends Dt {
  constructor(t) {
    super(w("svg", t), t), this.namespace();
  }

  isRoot() {
    return !(this.node.parentNode && this.node.parentNode instanceof p.window.SVGElement && "#document" !== this.node.parentNode.nodeName);
  }

  root() {
    return this.isRoot() ? this : super.root();
  }

  namespace() {
    return this.isRoot() ? this.attr({
      xmlns: c,
      version: "1.1"
    }).attr("xmlns:xlink", f, d).attr("xmlns:svgjs", "http://svgjs.com/svgjs", d) : this.root().namespace();
  }

  defs() {
    return this.isRoot() ? b(this.node.querySelector("defs")) || this.put(new zt()) : this.root().defs();
  }

  parent(t) {
    return this.isRoot() ? "#document" === this.node.parentNode.nodeName ? null : b(this.node.parentNode) : super.parent(t);
  }

  clear() {
    for (; this.node.hasChildNodes();) this.node.removeChild(this.node.lastChild);

    return delete this._defs, this;
  }

}

i({
  Container: {
    nested: T(function () {
      return this.put(new Ae());
    })
  }
}), O(Ae, "Svg", !0);

class Ce extends Dt {
  constructor(t) {
    super(w("symbol", t), t);
  }

}

i({
  Container: {
    symbol: T(function () {
      return this.put(new Ce());
    })
  }
}), O(Ce, "Symbol");
var Ee = Object.freeze({
  __proto__: null,
  plain: function (t) {
    return !1 === this._build && this.clear(), this.node.appendChild(p.document.createTextNode(t)), this;
  },
  length: function () {
    return this.node.getComputedTextLength();
  }
});

class Ie extends Lt {
  constructor(t) {
    super(w("text", t), t), this.dom.leading = new _t(1.3), this._rebuild = !0, this._build = !1;
  }

  x(t, e = this.bbox()) {
    return null == t ? e.x : this.attr("x", this.attr("x") + t - e.x);
  }

  y(t, e = this.bbox()) {
    return null == t ? e.y : this.attr("y", this.attr("y") + t - e.y);
  }

  move(t, e, i = this.bbox()) {
    return this.x(t, i).y(e, i);
  }

  cx(t, e = this.bbox()) {
    return null == t ? e.cx : this.attr("x", this.attr("x") + t - e.cx);
  }

  cy(t, e = this.bbox()) {
    return null == t ? e.cy : this.attr("y", this.attr("y") + t - e.cy);
  }

  center(t, e, i = this.bbox()) {
    return this.cx(t, i).cy(e, i);
  }

  text(t) {
    if (void 0 === t) {
      var e = this.node.childNodes,
          i = 0;
      t = "";

      for (var n = 0, s = e.length; n < s; ++n) "textPath" !== e[n].nodeName ? (n !== i && 3 !== e[n].nodeType && !0 === b(e[n]).dom.newLined && (t += "\n"), t += e[n].textContent) : 0 === n && (i = 1);

      return t;
    }

    if (this.clear().build(!0), "function" == typeof t) t.call(this, this);else for (var r = 0, h = (t = t.split("\n")).length; r < h; r++) this.tspan(t[r]).newLine();
    return this.build(!1).rebuild();
  }

  leading(t) {
    return null == t ? this.dom.leading : (this.dom.leading = new _t(t), this.rebuild());
  }

  rebuild(t) {
    if ("boolean" == typeof t && (this._rebuild = t), this._rebuild) {
      var e = this,
          i = 0,
          n = this.dom.leading;
      this.each(function () {
        var t = p.window.getComputedStyle(this.node).getPropertyValue("font-size"),
            s = n * new _t(t);
        this.dom.newLined && (this.attr("x", e.attr("x")), "\n" === this.text() ? i += s : (this.attr("dy", s + i), i = 0));
      }), this.fire("rebuild");
    }

    return this;
  }

  build(t) {
    return this._build = !!t, this;
  }

  setData(t) {
    return this.dom = t, this.dom.leading = new _t(t.leading || 1.3), this;
  }

}

k(Ie, Ee), i({
  Container: {
    text: T(function (t) {
      return this.put(new Ie()).text(t);
    }),
    plain: T(function (t) {
      return this.put(new Ie()).plain(t);
    })
  }
}), O(Ie, "Text");

class je extends Ie {
  constructor(t) {
    super(w("tspan", t), t);
  }

  text(t) {
    return null == t ? this.node.textContent + (this.dom.newLined ? "\n" : "") : ("function" == typeof t ? t.call(this, this) : this.plain(t), this);
  }

  dx(t) {
    return this.attr("dx", t);
  }

  dy(t) {
    return this.attr("dy", t);
  }

  x(t) {
    return this.attr("x", t);
  }

  y(t) {
    return this.attr("x", t);
  }

  move(t, e) {
    return this.x(t).y(e);
  }

  newLine() {
    var t = this.parent(Ie);
    this.dom.newLined = !0;
    var e = p.window.getComputedStyle(this.node).getPropertyValue("font-size"),
        i = t.dom.leading * new _t(e);
    return this.dy(i).attr("x", t.x());
  }

}

k(je, Ee), i({
  Tspan: {
    tspan: T(function (t) {
      var e = new je();
      return this._build || this.clear(), this.node.appendChild(e.node), e.text(t);
    })
  }
}), O(je, "Tspan");

class Le extends Dt {
  constructor(t) {
    super(w("clipPath", t), t);
  }

  remove() {
    return this.targets().forEach(function (t) {
      t.unclip();
    }), super.remove();
  }

  targets() {
    return ct('svg [clip-path*="' + this.id() + '"]');
  }

}

i({
  Container: {
    clip: T(function () {
      return this.defs().put(new Le());
    })
  },
  Element: {
    clipWith(t) {
      const e = t instanceof Le ? t : this.parent().clip().add(t);
      return this.attr("clip-path", 'url("#' + e.id() + '")');
    },

    unclip() {
      return this.attr("clip-path", null);
    },

    clipper() {
      return this.reference("clip-path");
    }

  }
}), O(Le, "ClipPath");

class He extends xt {
  constructor(t) {
    super(w("foreignObject", t), t);
  }

}

i({
  Container: {
    foreignObject: T(function (t, e) {
      return this.put(new He()).size(t, e);
    })
  }
}), O(He, "ForeignObject");

class De extends Dt {
  constructor(t) {
    super(w("g", t), t);
  }

  x(t, e = this.bbox()) {
    return null == t ? e.x : this.move(t, e.y, e);
  }

  y(t, e = this.bbox()) {
    return null == t ? e.y : this.move(e.x, t, e);
  }

  move(t = 0, e = 0, i = this.bbox()) {
    const n = t - i.x,
          s = e - i.y;
    return this.dmove(n, s);
  }

  dx(t) {
    return this.dmove(t, 0);
  }

  dy(t) {
    return this.dmove(0, t);
  }

  dmove(t, e) {
    return this.children().forEach((i, n) => {
      const s = i.bbox(),
            r = new nt(i),
            h = r.translate(t, e).transform(r.inverse()),
            o = new et(s.x, s.y).transform(h);
      i.move(o.x, o.y);
    }), this;
  }

  width(t, e = this.bbox()) {
    return null == t ? e.width : this.size(t, e.height, e);
  }

  height(t, e = this.bbox()) {
    return null == t ? e.height : this.size(e.width, t, e);
  }

  size(t, e, i = this.bbox()) {
    const n = u(this, t, e, i),
          s = n.width / i.width,
          r = n.height / i.height;
    return this.children().forEach((t, e) => {
      const n = new et(i).transform(new nt(t).inverse());
      t.scale(s, r, n.x, n.y);
    }), this;
  }

}

i({
  Container: {
    group: T(function () {
      return this.put(new De());
    })
  }
}), O(De, "G");

class ze extends Dt {
  constructor(t) {
    super(w("a", t), t);
  }

  to(t) {
    return this.attr("href", t, f);
  }

  target(t) {
    return this.attr("target", t);
  }

}

i({
  Container: {
    link: T(function (t) {
      return this.put(new ze()).to(t);
    })
  },
  Element: {
    linkTo: function (t) {
      var e = new ze();
      return "function" == typeof t ? t.call(e, e) : e.to(t), this.parent().put(e).put(this);
    }
  }
}), O(ze, "A");

class Pe extends Dt {
  constructor(t) {
    super(w("mask", t), t);
  }

  remove() {
    return this.targets().forEach(function (t) {
      t.unmask();
    }), super.remove();
  }

  targets() {
    return ct('svg [mask*="' + this.id() + '"]');
  }

}

i({
  Container: {
    mask: T(function () {
      return this.defs().put(new Pe());
    })
  },
  Element: {
    maskWith(t) {
      var e = t instanceof Pe ? t : this.parent().mask().add(t);
      return this.attr("mask", 'url("#' + e.id() + '")');
    },

    unmask() {
      return this.attr("mask", null);
    },

    masker() {
      return this.reference("mask");
    }

  }
}), O(Pe, "Mask");

class Re extends xt {
  constructor(t) {
    super(w("style", t), t);
  }

  addText(t = "") {
    return this.node.textContent += t, this;
  }

  font(t, e, i = {}) {
    return this.rule("@font-face", {
      fontFamily: t,
      src: e,
      ...i
    });
  }

  rule(t, e) {
    return this.addText(function (t, e) {
      if (!t) return "";
      if (!e) return t;
      var i = t + "{";

      for (var n in e) i += n.replace(/([A-Z])/g, function (t, e) {
        return "-" + e.toLowerCase();
      }) + ":" + e[n] + ";";

      return i += "}";
    }(t, e));
  }

}

i("Dom", {
  style: T(function (t, e) {
    return this.put(new Re()).rule(t, e);
  }),
  fontface: T(function (t, e, i) {
    return this.put(new Re()).font(t, e, i);
  })
}), O(Re, "Style");

class Ke extends Ie {
  constructor(t) {
    super(w("textPath", t), t);
  }

  array() {
    var t = this.track();
    return t ? t.array() : null;
  }

  plot(t) {
    var e = this.track(),
        i = null;
    return e && (i = e.plot(t)), null == t ? i : this;
  }

  track() {
    return this.reference("href");
  }

}

i({
  Container: {
    textPath: T(function (t, e) {
      return t instanceof Ie || (t = this.text(t)), t.path(e);
    })
  },
  Text: {
    path: T(function (t, e = !0) {
      var i = new Ke();
      let n;
      if (t instanceof fe || (t = this.defs().path(t)), i.attr("href", "#" + t, f), e) for (; n = this.node.firstChild;) i.node.appendChild(n);
      return this.put(i);
    }),

    textPath() {
      return this.findOne("textPath");
    }

  },
  Path: {
    text: T(function (t) {
      return t instanceof Ie || (t = new Ie().addTo(this.parent()).text(t)), t.path(this);
    }),

    targets() {
      return ct('svg [href*="' + this.id() + '"]');
    }

  }
}), Ke.prototype.MorphArray = ie, O(Ke, "TextPath");

class Fe extends Lt {
  constructor(t) {
    super(w("use", t), t);
  }

  element(t, e) {
    return this.attr("href", (e || "") + "#" + t, f);
  }

}

i({
  Container: {
    use: T(function (t, e) {
      return this.put(new Fe()).element(t, e);
    })
  }
}), O(Fe, "Use");
const qe = _;
k([Ae, Ce, Yt, Wt, Vt], n("viewbox")), k([Gt, ye, me, fe], n("marker")), k(Ie, n("Text")), k(fe, n("Path")), k(zt, n("Defs")), k([Ie, je], n("Tspan")), k([ge, Pt, Ht, qt], n("radius")), k(dt, n("EventTarget")), k(bt, n("Dom")), k(xt, n("Element")), k(Lt, n("Shape")), k(Dt, n("Container")), k(Oe, n("Runner")), ut.extend([...new Set(e)]), function (t = []) {
  de.push(...[].concat(t));
}([_t, tt, ht, nt, vt, Bt, ie]), k(de, {
  to(t) {
    return new ae().type(this.constructor).from(this.valueOf()).to(t);
  },

  fromArray(t) {
    return this.init(t), this;
  }

});
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var We = function (t, e) {
  return (We = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (t, e) {
    t.__proto__ = e;
  } || function (t, e) {
    for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
  })(t, e);
};

function Ye(t, e) {
  function i() {
    this.constructor = t;
  }

  We(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i());
}

var Be = function () {
  function t(t) {
    if ("string" == typeof t) {
      if (!(t.length > 0)) throw "Can't parse this note";

      if (this.note = t[0].toUpperCase(), t.length > 1) {
        var e = t.substr(1);
        ["#", "b"].indexOf(t[1]) > -1 && (t.length > 2 && t[1] === t[2] ? this.accidental = t.substr(1, 2) : this.accidental = t[1], e = t.substr(this.accidental.toString().length + 1)), e.length > 0 && (this.octave = Number.parseInt(e));
      }
    } else this.note = t.note, this.accidental = t.accidental, this.octave = t.octave;

    this.toString = this.toString.bind(this);
  }

  return Object.defineProperty(t.prototype, "baseNote", {
    get: function () {
      var t,
          e = this,
          i = [{
        note: "C"
      }, {
        note: "C",
        accidental: "#"
      }, {
        note: "D"
      }, {
        note: "D",
        accidental: "#"
      }, {
        note: "E"
      }, {
        note: "F"
      }, {
        note: "F",
        accidental: "#"
      }, {
        note: "G"
      }, {
        note: "G",
        accidental: "#"
      }, {
        note: "A"
      }, {
        note: "A",
        accidental: "#"
      }, {
        note: "B"
      }],
          n = i.findIndex(function (t) {
        return t.note === e.note && t.accidental === e.accidental;
      });
      if (n > -1) t = {
        note: i[n].note,
        accidental: i[n].accidental,
        octave: this.octave
      };else {
        switch (n = i.findIndex(function (t) {
          return t.note === e.note && void 0 === t.accidental;
        }), this.accidental) {
          case "#":
            n += 1;
            break;

          case "##":
            n += 2;
            break;

          case "b":
            n -= 1;
            break;

          case "bb":
            n -= 2;
        }

        var s = 0;
        n < 0 ? (n += 12, s = -1) : n > 11 && (n -= 12, s = 1), t = {
          note: i[n].note,
          accidental: i[n].accidental,
          octave: void 0 !== this.octave ? this.octave + s : void 0
        };
      }
      return t;
    },
    enumerable: !0,
    configurable: !0
  }), t.prototype.toString = function () {
    var t = this.note.toString();
    return void 0 !== this.accidental && (t += this.accidental.toString()), void 0 !== this.octave && (t += this.octave.toString()), t;
  }, t;
}(),
    Ue = function () {
  function t() {}

  return t.WHITE_KEY_RATIO = 6.4, t.BLACK_KEY_RATIO = 6.6, t.WHITE_BLACK_WIDTH_RATIO = 1.7, t.NOTE_LIST = ["C", "D", "E", "F", "G", "A", "B"], t.BLACK_BASE_NOTE_LIST = ["C", "D", "F", "G", "A"], t;
}(),
    Xe = function () {
  function t(t, e, i, n) {
    this.container = t, this.onKeyPress = i, this.onKeyRelease = n, this.instrumentSettings = e;
  }

  return Object.defineProperty(t.prototype, "boxWidth", {
    get: function () {
      return this.container.bbox().width;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(t.prototype, "boxHeight", {
    get: function () {
      return this.container.bbox().height;
    },
    enumerable: !0,
    configurable: !0
  }), t.prototype.move = function (t, e) {
    this.container.untransform(), this.container.translate(t, e);
  }, t.prototype.setInstrumentSettings = function (t) {
    this.instrumentSettings = t;
  }, t;
}(),
    Ge = function (t) {
  function e(e, i, n, s, r, h, o) {
    var a = t.call(this, e, i, n, s) || this;
    return a.highlightSize = 1, a.isPressed = !1, a.isMouseDown = !1, a.width = r, a.height = h, a._note = o, a._displayNote = o, a.addMouseListeners = a.addMouseListeners.bind(a), a.handleInputDown = a.handleInputDown.bind(a), a.handleInputUp = a.handleInputUp.bind(a), a;
  }

  return Ye(e, t), Object.defineProperty(e.prototype, "note", {
    get: function () {
      return this._note;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e.prototype, "displayNote", {
    get: function () {
      return this.isHighlighted ? this.getNoteIfHighlighted(function () {
        for (var t = 0, e = 0, i = arguments.length; e < i; e++) t += arguments[e].length;

        var n = Array(t),
            s = 0;

        for (e = 0; e < i; e++) for (var r = arguments[e], h = 0, o = r.length; h < o; h++, s++) n[s] = r[h];

        return n;
      }(this.instrumentSettings.highlightedNotes, this.instrumentSettings.specialHighlightedNotes)) : this._displayNote;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e.prototype, "isHighlighted", {
    get: function () {
      return void 0 !== this.getNoteIfHighlighted(this.instrumentSettings.highlightedNotes) || this.isSpecialHighlighted;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e.prototype, "isSpecialHighlighted", {
    get: function () {
      return void 0 !== this.getNoteIfHighlighted(this.instrumentSettings.specialHighlightedNotes);
    },
    enumerable: !0,
    configurable: !0
  }), e.prototype.addMouseListeners = function () {
    void 0 !== this._visual && (this._visual.on("mousedown", this.handleInputDown), this._visual.on("mouseup", this.handleInputUp), this._visual.on("mouseleave", this.handleInputUp), this._visual.on("touchstart", this.handleInputDown), this._visual.on("touchend", this.handleInputUp));
  }, e.prototype.handleInputDown = function () {
    this.isMouseDown = !0, void 0 !== this.onKeyPress && this.onKeyPress(this.note);
  }, e.prototype.handleInputUp = function () {
    this.isMouseDown && (this.isMouseDown = !1, void 0 !== this.onKeyRelease && this.onKeyRelease(this.note));
  }, e.prototype.press = function (t) {
    this.isPressed = !0, this._displayNote = t, this._label && "onpress" === this.instrumentSettings.showNoteNames && (this.updateLabel(), this._label.show());
  }, e.prototype.release = function () {
    this.isPressed = !1, this._label && "onpress" === this.instrumentSettings.showNoteNames && this._label.hide();
  }, e.prototype.backward = function () {
    this.container.backward();
  }, e.prototype.accidentalToUnicode = function (t) {
    return t.toString().replace(/#/g, "♯").replace(/b/g, "♭");
  }, e.prototype.createLabel = function (t) {
    this._label = this.container.group(), this._labelText = this._label.text("" + this.displayNote.note + (this.displayNote.accidental ? this.accidentalToUnicode(this.displayNote.accidental) : "")).fill(t).font({
      family: "Helvetica",
      size: this.width / 2,
      anchor: "middle"
    }), this._label.attr("pointer-events", "none"), this.layout(), "always" !== this.instrumentSettings.showNoteNames && this._label.hide();
  }, e.prototype.updateLabel = function () {
    this._labelText && (this._labelText.text("" + this.displayNote.note + (this.displayNote.accidental ? this.accidentalToUnicode(this.displayNote.accidental) : "")), this.layout());
  }, e.prototype.createHighlight = function (t) {
    this.highlightSize = t, this._highlight = this.container.circle(this.highlightSize), this._highlight.center(.5, .5), this._highlight.attr("pointer-events", "none");
    var e = this.instrumentSettings.highlightColor,
        i = this.instrumentSettings.specialHighlightColor,
        n = this.container.gradient("radial", function (t) {
      t.stop(0, "#fff"), t.stop(1, e);
    });
    n.attr({
      cx: .4,
      cy: .4
    });
    var s = this.container.gradient("radial", function (t) {
      t.stop(0, "#fff"), t.stop(1, i);
    });
    s.attr({
      cx: .4,
      cy: .4
    }), this._highlight.fill(this.isSpecialHighlighted ? s : n), this.layout();
  }, e.prototype.layout = function () {
    var t, e, i;
    null === (t = this._visual) || void 0 === t || t.size(this.width, this.height), this._label && this._labelText && (this._labelText.font({
      size: this.width / 2
    }), null === (e = this._label) || void 0 === e || e.untransform(), null === (i = this._label) || void 0 === i || i.translate(this.width / 2, this.height - 2 * this._labelText.bbox().height), "onhighlight" === this.instrumentSettings.showNoteNames && (this.isHighlighted ? this._label.show() : this._label.hide())), this._highlight && (this._highlight.radius(this.highlightSize).untransform().translate(this.width / 2, 4 * this.highlightSize), this.isHighlighted ? this._highlight.show() : this._highlight.hide());
  }, e.prototype.getNoteIfHighlighted = function (t) {
    var e = void 0 !== this.note.baseNote ? this.note.baseNote : this.note;
    return t.find(function (t) {
      var i = void 0 !== t.baseNote ? t.baseNote : t;
      return i.note === e.note && i.accidental === e.accidental && (i.octave === e.octave || void 0 === i.octave);
    });
  }, e;
}(Xe),
    Ve = function (t) {
  function e(e, i, n, s, r, h) {
    return t.call(this, e, i, n, s, h, h * Ue.WHITE_KEY_RATIO, r) || this;
  }

  return Ye(e, t), e.prototype.create = function () {
    this._visual = this.container.rect(this.width, this.height).fill("#fff").stroke({
      color: "#000",
      width: 2
    }), this.createLabel("#000"), this.createHighlight(this.width / Ue.WHITE_BLACK_WIDTH_RATIO / 8), this.addMouseListeners();
  }, e.prototype.resize = function (t) {
    this.width = t, this.height = t * Ue.WHITE_KEY_RATIO, this.layout();
  }, e.prototype.press = function (e) {
    var i, n;
    "subtle" === this.instrumentSettings.keyPressStyle ? (n = this.container.gradient("linear", function (t) {
      t.stop(0, "#fff"), t.stop(1, "#e8e8e8");
    })).attr({
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 1
    }) : n = this.instrumentSettings.vividKeyPressColor, this.isPressed || (t.prototype.press.call(this, e), null === (i = this._visual) || void 0 === i || i.fill(n).transform({
      origin: {
        x: this.width / 2,
        y: 0
      },
      skewX: .3
    }));
  }, e.prototype.release = function () {
    var e;
    this.isPressed && (t.prototype.release.call(this), null === (e = this._visual) || void 0 === e || e.fill("#fff").untransform());
  }, e;
}(Ge),
    $e = function (t) {
  function e(e, i, n, s, r, h, o) {
    var a = t.call(this, e, i, n, s, o, o * Ue.BLACK_KEY_RATIO, r) || this;
    return a._baseWhiteKey = h, a;
  }

  return Ye(e, t), Object.defineProperty(e.prototype, "baseWhiteKey", {
    get: function () {
      return this._baseWhiteKey;
    },
    enumerable: !0,
    configurable: !0
  }), e.prototype.create = function () {
    this._visual = this.container.rect(this.width, this.height).fill("#000").stroke({
      color: "#000",
      width: 2
    }), this.createLabel("#fff"), this.createHighlight(this.width / 8), this.addMouseListeners();
  }, e.prototype.resize = function (t) {
    this.width = t, this.height = t * Ue.BLACK_KEY_RATIO, this.layout();
  }, e.prototype.press = function (e) {
    var i, n;
    "subtle" === this.instrumentSettings.keyPressStyle ? (n = this.container.gradient("linear", function (t) {
      t.stop(0, "#000"), t.stop(1, "#555");
    })).attr({
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 1
    }) : (n = (n = new tt(this.instrumentSettings.vividKeyPressColor)).hsl()).l /= 1.2, this.isPressed || (t.prototype.press.call(this, e), null === (i = this._visual) || void 0 === i || i.fill(n));
  }, e.prototype.release = function () {
    var e;
    this.isPressed && (t.prototype.release.call(this), null === (e = this._visual) || void 0 === e || e.fill("#000"));
  }, e;
}(Ge),
    Qe = function (t) {
  function e(e, i, n, s, r, h, o, a) {
    var u = t.call(this, e, i, n, s) || this;
    return u.whiteKeys = [], u.blackKeys = [], u.LABEL_SIZE_RATIO = 30, u.container = e, u._octave = r, u.startNote = h, u.endNote = o, u.whiteKeyWidth = a, u.whiteKeyHeight = u.whiteKeyWidth * Ue.WHITE_KEY_RATIO, u;
  }

  return Ye(e, t), Object.defineProperty(e.prototype, "octave", {
    get: function () {
      return this._octave;
    },
    enumerable: !0,
    configurable: !0
  }), e.prototype.create = function () {
    for (var t = !1, e = Ue.NOTE_LIST.indexOf(this.startNote); e <= Ue.NOTE_LIST.indexOf(this.endNote); e++) {
      var i = Ue.NOTE_LIST[e],
          n = new Ve(this.container.group(), this.instrumentSettings, this.onKeyPress, this.onKeyRelease, new Be({
        note: i,
        octave: this._octave
      }), this.whiteKeyWidth);

      if (n.create(), this.whiteKeys.push(n), t && n.backward(), t = !1, Ue.BLACK_BASE_NOTE_LIST.indexOf(i) > -1 && (i !== this.endNote || "B" === this.endNote)) {
        var s = new $e(this.container.group(), this.instrumentSettings, this.onKeyPress, this.onKeyRelease, new Be({
          note: i,
          accidental: "#",
          octave: this._octave
        }), n, this.whiteKeyWidth / Ue.WHITE_BLACK_WIDTH_RATIO);
        s.create(), this.blackKeys.push(s), t = !0;
      }
    }

    this.createOctaveNumberLabel();
  }, e.prototype.layout = function (t) {
    var e,
        i,
        n = this;
    this.whiteKeyWidth = t, this.whiteKeyHeight = this.whiteKeyWidth * Ue.WHITE_KEY_RATIO;
    var s = 0;
    this.whiteKeys.forEach(function (t) {
      t.resize(n.whiteKeyWidth), t.move(s, 0), s += t.boxWidth;
      var e = n.blackKeys.find(function (e) {
        return e.baseWhiteKey === t;
      });
      e && (e.resize(n.whiteKeyWidth / Ue.WHITE_BLACK_WIDTH_RATIO), e.move(s - e.boxWidth / 2, 0));
    }), this._label && this._labelText && (this._labelText.font({
      size: this.whiteKeyHeight / this.LABEL_SIZE_RATIO
    }), null === (e = this._label) || void 0 === e || e.untransform(), null === (i = this._label) || void 0 === i || i.translate(this.whiteKeyHeight / this.LABEL_SIZE_RATIO / 2, this.whiteKeyHeight - 1.5 * this._labelText.bbox().height), this.instrumentSettings.showOctaveNumbers ? this._label.show() : this._label.hide());
  }, Object.defineProperty(e.prototype, "numberOfWhiteKeys", {
    get: function () {
      return Ue.NOTE_LIST.indexOf(this.endNote) - Ue.NOTE_LIST.indexOf(this.startNote) + 1;
    },
    enumerable: !0,
    configurable: !0
  }), e.prototype.keyDown = function (t) {
    var e = new Be(t).baseNote;
    if (void 0 === e.accidental) (i = this.whiteKeys.find(function (t) {
      return t.note.note === e.note;
    })) && i.press(t);else if ("#" === e.accidental) {
      var i;
      (i = this.blackKeys.find(function (t) {
        return t.note.note === e.note;
      })) && i.press(t);
    }
  }, e.prototype.keyUp = function (t) {
    var e = new Be(t).baseNote;
    if (void 0 === e.accidental) (i = this.whiteKeys.find(function (t) {
      return t.note.note === e.note;
    })) && i.release();else if ("#" === e.accidental) {
      var i;
      (i = this.blackKeys.find(function (t) {
        return t.note.note === e.note;
      })) && i.release();
    }
  }, e.prototype.setInstrumentSettings = function (e) {
    t.prototype.setInstrumentSettings.call(this, e), this.whiteKeys.forEach(function (t) {
      return t.setInstrumentSettings(e);
    }), this.blackKeys.forEach(function (t) {
      return t.setInstrumentSettings(e);
    });
  }, e.prototype.createOctaveNumberLabel = function () {
    this._label = this.container.group(), this._labelText = this._label.text("" + this.octave).fill("#000").font({
      family: "Helvetica",
      size: this.whiteKeyHeight / this.LABEL_SIZE_RATIO,
      anchor: "left"
    }), this._label.attr("pointer-events", "none");
  }, e;
}(Xe),
    Ze = function (t) {
  function e(e, i, n, s, r, h) {
    var o = t.call(this, e, h, i, n) || this;
    return o.octaves = [], o.availableWidth = s, o.availableHeight = r, o.instrumentSettings = h, o;
  }

  return Ye(e, t), e.prototype.create = function () {
    for (var t = this.instrumentSettings.startOctave; t <= this.instrumentSettings.endOctave; t++) {
      var e = new Qe(this.container.group(), this.instrumentSettings, this.onKeyPress, this.onKeyRelease, t, t === this.instrumentSettings.startOctave ? this.instrumentSettings.startNote : "C", t === this.instrumentSettings.endOctave ? this.instrumentSettings.endNote : "B", this.whiteKeyWidth);
      e.create(), this.octaves.push(e);
    }
  }, e.prototype.layout = function (t, e) {
    var i = this;
    this.availableWidth = t, this.availableHeight = e;
    var n = 0;
    this.octaves.forEach(function (t) {
      t.layout(i.whiteKeyWidth), t.move(n, 0), n += t.boxWidth;
    });
  }, Object.defineProperty(e.prototype, "numberOfWhiteKeys", {
    get: function () {
      for (var t = 0, e = Ue.NOTE_LIST, i = this.instrumentSettings.startOctave; i <= this.instrumentSettings.endOctave; i++) i === this.instrumentSettings.startOctave ? this.instrumentSettings.endOctave > this.instrumentSettings.startOctave ? t += 7 - e.indexOf(this.instrumentSettings.startNote) : t = e.indexOf(this.instrumentSettings.endNote) - e.indexOf(this.instrumentSettings.startNote) + 1 : i === this.instrumentSettings.endOctave ? t += e.indexOf(this.instrumentSettings.endNote) + 1 : t += 7;

      return t;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e.prototype, "whiteKeyWidth", {
    get: function () {
      var t = this.availableWidth / this.numberOfWhiteKeys;
      return t * Ue.WHITE_KEY_RATIO <= this.availableHeight ? t : this.availableHeight / Ue.WHITE_KEY_RATIO;
    },
    enumerable: !0,
    configurable: !0
  }), e.prototype.keyDown = function (t) {
    if (this.octaves.length > 0 && void 0 !== t.octave) {
      var e = new Be(t),
          i = this.octaves.find(function (t) {
        return t.octave === e.baseNote.octave;
      });
      i && i.keyDown(t);
    }
  }, e.prototype.keyUp = function (t) {
    if (this.octaves.length > 0 && void 0 !== t.octave) {
      var e = this.octaves.find(function (e) {
        return e.octave === t.octave;
      });
      e && e.keyUp(t);
    }
  }, e.prototype.setInstrumentSettings = function (e) {
    t.prototype.setInstrumentSettings.call(this, e), this.octaves.forEach(function (t) {
      return t.setInstrumentSettings(e);
    });
  }, e;
}(Xe),
    Je = function () {
  function t(t) {
    this.startOctave = 2, this.startNote = "C", this.endOctave = 6, this.endNote = "C", this.showNoteNames = "onpress", this.highlightedNotes = [], this.highlightColor = "#0c0", this.specialHighlightedNotes = [], this.specialHighlightColor = "#f00", this.showOctaveNumbers = !1, this.keyPressStyle = "subtle", this.vividKeyPressColor = "#f33", this._reloadNeeded = !1, this.applySettings(t);
  }

  return Object.defineProperty(t.prototype, "reloadNeded", {
    get: function () {
      return this._reloadNeeded;
    },
    enumerable: !0,
    configurable: !0
  }), t.prototype.applySettings = function (t) {
    var e = this;
    this._reloadNeeded = !1, void 0 !== t && (void 0 !== t.startOctave && (this.startOctave = t.startOctave, this._reloadNeeded = !0), void 0 !== t.startNote && (this.startNote = t.startNote, this._reloadNeeded = !0), void 0 !== t.endOctave && (this.endOctave = t.endOctave, this._reloadNeeded = !0), void 0 !== t.endNote && (this.endNote = t.endNote, this._reloadNeeded = !0), void 0 !== t.showNoteNames && (this.showNoteNames = t.showNoteNames, this._reloadNeeded = !0), void 0 !== t.highlightedNotes && (this.highlightedNotes.splice(0), t.highlightedNotes.forEach(function (t) {
      return e.highlightedNotes.push(new Be(t));
    })), void 0 !== t.highlightColor && (this.highlightColor = t.highlightColor), void 0 !== t.specialHighlightedNotes && (this.specialHighlightedNotes.splice(0), t.specialHighlightedNotes.forEach(function (t) {
      return e.specialHighlightedNotes.push(new Be(t));
    })), void 0 !== t.specialHighlightColor && (this.specialHighlightColor = t.specialHighlightColor), void 0 !== t.showOctaveNumbers && (this.showOctaveNumbers = t.showOctaveNumbers), void 0 !== t.keyPressStyle && (this.keyPressStyle = t.keyPressStyle), void 0 !== t.vividKeyPressColor && (this.vividKeyPressColor = t.vividKeyPressColor));
  }, t;
}(),
    ti = function () {
  function t(t, e) {
    this.keyPressEventHandlers = [], this.keyReleaseEventHandlers = [], this.resizeCounter = 0, this.container = t, this.settings = new Je(e), this.create = this.create.bind(this), this.layout = this.layout.bind(this), this.keyDown = this.keyDown.bind(this), this.keyUp = this.keyUp.bind(this), this.destroy = this.destroy.bind(this), this.handleMouseKeyDown = this.handleMouseKeyDown.bind(this), this.handleMouseKeyUp = this.handleMouseKeyUp.bind(this), this.handleResize = this.handleResize.bind(this), this.reload = this.reload.bind(this);
  }

  return t.prototype.create = function () {
    this.img = qe().addTo(this.container).size("100%", "100%"), this.img.css("-ms-user-select", "none"), this.img.css("-webkit-user-select", "none"), this.img.css("-moz-user-select", "none"), this.img.css("user-select", "none"), this.keybed = new Ze(this.img.group(), this.handleMouseKeyDown, this.handleMouseKeyUp, this.container.clientWidth, this.container.clientHeight, this.settings), this.keybed.create(), this.layout(), window.addEventListener("resize", this.handleResize);
  }, t.prototype.destroy = function () {
    this.container.removeChild(this.img.node), window.removeEventListener("resize", this.handleResize);
  }, t.prototype.keyDown = function (t) {
    this.keybed && this.keybed.keyDown(new Be(t));
  }, t.prototype.keyUp = function (t) {
    this.keybed && this.keybed.keyUp(new Be(t));
  }, t.prototype.addKeyMouseDownListener = function (t) {
    this.keyPressEventHandlers.push(t);
  }, t.prototype.addKeyMouseUpListener = function (t) {
    this.keyReleaseEventHandlers.push(t);
  }, t.prototype.removeKeyMouseDownListener = function (t) {
    void 0 !== t ? this.keyPressEventHandlers.indexOf(t) > -1 && this.keyPressEventHandlers.splice(this.keyPressEventHandlers.indexOf(t), 1) : this.keyPressEventHandlers.splice(0);
  }, t.prototype.removeKeyMouseUpListener = function (t) {
    void 0 !== t ? this.keyReleaseEventHandlers.indexOf(t) > -1 && this.keyReleaseEventHandlers.splice(this.keyReleaseEventHandlers.indexOf(t), 1) : this.keyReleaseEventHandlers.splice(0);
  }, t.prototype.reload = function () {
    this.destroy(), this.create();
  }, t.prototype.applySettings = function (t) {
    this.settings.applySettings(t), this.settings.reloadNeded ? this.reload() : (this.keybed && this.keybed.setInstrumentSettings(this.settings), this.layout());
  }, t.prototype.handleResize = function () {
    var t = this;
    this.resizeCounter++, setTimeout(function () {
      t.resizeCounter--, t.resizeCounter <= 0 && t.layout();
    }, 300);
  }, t.prototype.layout = function () {
    this.img && this.keybed && (this.img.size("100%", "100%"), this.keybed.layout(this.container.clientWidth, this.container.clientHeight), this.img.width(this.keybed.boxWidth).height(this.keybed.boxHeight));
  }, t.prototype.handleMouseKeyDown = function (t) {
    this.keyPressEventHandlers.forEach(function (e) {
      return e(t);
    });
  }, t.prototype.handleMouseKeyUp = function (t) {
    this.keyReleaseEventHandlers.forEach(function (e) {
      return e(t);
    });
  }, t.prototype.rasterize = function (t, e) {
    var i = document.createElement("canvas"),
        n = document.createElement("div"),
        s = qe().addTo(n).svg(this.img.svg()).size(this.img.width(), this.img.height());

    if (e) {
      var r = s.root().group();
      r.text(e).fill("#888").font({
        family: "Helvetica",
        size: 12,
        anchor: "start"
      }), s.height(s.height() + r.height() + 6), r.translate(s.width() - r.width() - 6, s.height() - 6);
    }

    i.width = s.width(), i.height = s.height();
    var h = s.svg(),
        o = i.getContext("2d"),
        a = window.URL,
        u = new Image(i.width, i.height);
    u.setAttribute("crossOrigin", "anonymous");
    var l = new Blob([h], {
      type: "image/svg+xml"
    }),
        c = a.createObjectURL(l);
    u.onload = function () {
      o.drawImage(u, 0, 0), a.revokeObjectURL(c), t(i.toDataURL("image/png"));
    }, u.src = c;
  }, t;
}(),
    ei = function () {
  function t(t, e) {
    this.notes = [], this.notes = t, this.mode = e;
  }

  return Object.defineProperty(t.prototype, "root", {
    get: function () {
      return this.notes.length > 0 ? this.notes[0] : {
        note: "C"
      };
    },
    enumerable: !0,
    configurable: !0
  }), t;
}(),
    ii = function () {
  function t() {}

  return t.getScale = function (e, i) {
    var n = new Be(e).baseNote,
        s = t.chromatic.notes.findIndex(function (t) {
      return n.note === t.note && n.accidental === t.accidental;
    }),
        r = t.modeSteps.get(i),
        h = [];

    if (void 0 !== r) {
      h.push(n);

      for (var o = s, a = 0; a < r.length; a++) o = (o + r[a]) % 12, h.push(t.chromatic.notes[o]);
    }

    return new ei(t.adjustScale(e, h), i);
  }, t.adjustScale = function (e, i) {
    var n = [];
    return i.forEach(function (i) {
      if ("b" === e.accidental && "#" === i.accidental) {
        var s = t.chromatic.notes.findIndex(function (t) {
          return t.note === i.note && t.accidental === i.accidental;
        });
        n.push({
          note: t.chromatic.notes[s + 1].note,
          accidental: "b"
        });
      } else n.push(i);
    }), n;
  }, t.chromatic = new ei([new Be("C"), new Be("C#"), new Be("D"), new Be("D#"), new Be("E"), new Be("F"), new Be("F#"), new Be("G"), new Be("G#"), new Be("A"), new Be("A#"), new Be("B")], "chromatic"), t.modeSteps = new Map([["major", [2, 2, 1, 2, 2, 2, 1]], ["minor", [2, 1, 2, 2, 1, 2, 2]], ["dorian", [2, 1, 2, 2, 2, 1, 2]], ["phrygian", [1, 2, 2, 2, 1, 2, 2]], ["lydian", [2, 2, 2, 1, 2, 2, 1]], ["mixolydian", [2, 2, 1, 2, 2, 1, 2]], ["locrian", [1, 2, 2, 1, 2, 2, 2]], ["majorpentatonic", [2, 2, 3, 2, 3]], ["minorpentatonic", [3, 2, 2, 3, 2]], ["harmonicminor", [2, 1, 2, 2, 1, 3, 1]], ["melodicminor", [2, 1, 2, 2, 2, 2, 1]]]), t;
}();

exports.ScaleHelper = ii;
exports.Scale = ei;
exports.Instrument = ti;
exports.PianoData = Ue;
exports.NoteValue = Be;
},{}],"ScaleGenerator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ScaleGenerator = /*#__PURE__*/function () {
  function ScaleGenerator() {
    _classCallCheck(this, ScaleGenerator);

    this.scales = {
      'Major': {
        'C': ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'],
        'C#': ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#', 'C#'],
        'Db': ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C', 'Db'],
        'D': ['D', 'E', 'F#', 'G', 'A', 'B', 'C#', 'D'],
        'D#': ['D#', 'E#', 'F##', 'G#', 'A#', 'B#', 'C##', 'D# '],
        'Eb': ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D', 'Eb'],
        'E': ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#', 'E'],
        'F': ['F', 'G', 'A', 'Bb', 'C', 'D', 'E', 'F'],
        'F#': ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#', 'F#'],
        'Gb': ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F', 'Gb'],
        'G': ['G', 'A', 'B', 'C', 'D', 'E', 'F#', 'G'],
        'G#': ['G#', 'A#', 'B#', 'C#', 'D#', 'E#', 'F##', 'G#'],
        'Ab': ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G', 'Ab'],
        'A': ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#', 'A'],
        'A#': ['A#', 'B#', 'C##', 'D#', 'E#', 'F##', 'G##', 'A#'],
        'Bb': ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A', 'Bb'],
        'B': [' B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#', 'B'],
        'Cb': ['Cb', 'Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bb', 'Cb']
      }
    };
  }

  _createClass(ScaleGenerator, [{
    key: "getScale",
    value: function getScale(type, root) {
      return this.scales[type][root];
    }
  }]);

  return ScaleGenerator;
}();

var _default = ScaleGenerator;
exports.default = _default;
},{}],"GUI.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pianoChart = require("piano-chart");

var _ScaleGenerator = _interopRequireDefault(require("./ScaleGenerator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GUI = function GUI(container) {
  _classCallCheck(this, GUI);

  this.container = container;
  this.generator = new _ScaleGenerator.default();
  var e = document.getElementById("dropdownRoot");
  var rootNote = e.options[e.selectedIndex].value;
  var e2 = document.getElementById("dropdownScale");
  var scale = e2.options[e2.selectedIndex].value;
  var notes = this.generator.getScale(scale, rootNote);
  this.piano = new _pianoChart.Instrument(container, {
    startOctave: 3,
    endOctave: 5,
    highlightedNotes: notes,
    specialHighlightedNotes: [{
      note: rootNote
    }]
  });
  this.piano.create();
};

var _default = GUI;
exports.default = _default;
},{"piano-chart":"node_modules/piano-chart/piano-chart.esm.js","./ScaleGenerator.js":"ScaleGenerator.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _pianoChart = require("piano-chart");

var _GUI = _interopRequireDefault(require("./GUI.js"));

var _ScaleGenerator = _interopRequireDefault(require("./ScaleGenerator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//const piano = new Instrument(document.getElementById('display'));
//piano.create();
//
var gui = new _GUI.default(document.getElementById("display"));
var generator = new _ScaleGenerator.default();
},{"piano-chart":"node_modules/piano-chart/piano-chart.esm.js","./GUI.js":"GUI.js","./ScaleGenerator.js":"ScaleGenerator.js"}],"../../../../../usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "42129" + '/');

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
},{}]},{},["../../../../../usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/Scale-Visualizer.e31bb0bc.js.map