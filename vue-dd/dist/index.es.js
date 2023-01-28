import './index.css';
import { openBlock as d, createElementBlock as h, normalizeClass as R, createTextVNode as ue, toDisplayString as C, createCommentVNode as b, createElementVNode as j, isReactive as Ue, isRef as je, resolveComponent as de, Fragment as Ze, renderList as We, createBlock as he, defineComponent as Ke, normalizeStyle as Ge } from "vue";
const ge = (e, t) => {
  const i = e.__vccOpts || e;
  for (const [o, s] of t)
    i[o] = s;
  return i;
}, Xe = {
  name: "NodePrimitive",
  inheritAttrs: !1,
  emits: ["openParent", "show", "focus"],
  props: [
    // ref
    "root",
    "rootId",
    // options
    "modelValue",
    "name",
    "escapeQuotes",
    "save",
    "saveFocus",
    "focus",
    "delimiter",
    // helpers
    "parentOpen",
    "pointer",
    "type",
    "parentType",
    "size",
    "position",
    "expanded",
    // functions
    "escapeQuotesFn",
    "emitFn"
  ],
  data() {
    return {
      id: this.makeId(),
      hover: !1
    };
  },
  methods: {
    showEmit() {
      return this.emit("show", {
        pointer: this.pointer,
        pointerElement: this.$refs.focusElement,
        type: "primitive"
      }), !0;
    },
    focusEmit() {
      this.emit("focus", {
        pointer: this.pointer,
        focusElement: this.$refs.focusElement
      });
    },
    emit(e, ...t) {
      this.emitFn(this, e, ...t);
    },
    makeId() {
      const e = this.pointer !== "" ? `${this.delimiter}${this.pointer}` : "";
      return `_${this.rootId}${e}`;
    }
  },
  mounted() {
    this.showEmit();
  },
  computed: {
    parentIsArray() {
      return this.parentType === "array";
    },
    nameString() {
      return String(this.name);
    },
    showName() {
      return !this.parentIsArray && this.nameString || this.parentIsArray && this.parentOpen;
    },
    shouldComma() {
      return this.size && this.position && this.position !== this.size;
    },
    isFocused() {
      return String(this.pointer) === String(this.focus);
    }
  }
}, qe = ["id"], Je = /* @__PURE__ */ j("span", { class: "vue-dd-colon" }, ":", -1), Ye = {
  key: 2,
  class: "vue-dd-null"
}, $e = {
  key: 3,
  class: "vue-dd-undefined"
}, et = {
  key: 4,
  class: "vue-dd-number"
}, tt = {
  key: 5,
  class: "vue-dd-bigint"
}, nt = {
  key: 6,
  class: "vue-dd-string"
}, it = {
  key: 8,
  class: "vue-dd-symbol"
}, st = {
  key: 9,
  class: "vue-dd-unknown"
}, rt = {
  key: 10,
  class: "vue-dd-comma"
};
function ot(e, t, i, o, s, n) {
  return d(), h("span", {
    id: s.id,
    class: "vue-dd-primitive",
    onClick: t[4] || (t[4] = (l) => e.$emit("openParent"))
  }, [
    n.showName ? (d(), h("span", {
      key: 0,
      class: R({
        "vue-dd-key": !0,
        "vue-dd-key-of-array": n.parentIsArray
      })
    }, [
      ue(C(i.name), 1),
      Je
    ], 2)) : b("", !0),
    i.parentOpen && i.saveFocus ? (d(), h("span", {
      key: 1,
      ref: "focusElement",
      class: R(["vue-dd-focus vue-dd-icon-eye", {
        "vue-dd-focus-hover": s.hover,
        "vue-dd-focus-selected": n.isFocused
      }]),
      onClick: t[0] || (t[0] = (...l) => n.focusEmit && n.focusEmit(...l)),
      onMouseenter: t[1] || (t[1] = (l) => s.hover = !0),
      onMouseup: t[2] || (t[2] = (l) => s.hover = !1),
      onMouseleave: t[3] || (t[3] = (l) => s.hover = !1)
    }, null, 34)) : b("", !0),
    i.type === "null" ? (d(), h("span", Ye, "null")) : i.type === "undefined" ? (d(), h("span", $e, "undefined")) : i.type === "number" ? (d(), h("span", et, C(i.modelValue), 1)) : i.type === "bigint" ? (d(), h("span", tt, C(i.modelValue), 1)) : i.type === "string" ? (d(), h("span", nt, '"' + C(i.escapeQuotesFn(i.modelValue)) + '"', 1)) : i.type === "boolean" ? (d(), h("span", {
      key: 7,
      class: R(["vue-dd-boolean", { "vue-dd-false": !i.modelValue }])
    }, C(i.modelValue), 3)) : i.type === "symbol" ? (d(), h("span", it, C(i.modelValue.toString()), 1)) : (d(), h("span", st, "[unknown_type]" + C(i.modelValue), 1)),
    n.shouldComma ? (d(), h("span", rt, ",")) : b("", !0)
  ], 8, qe);
}
const Be = /* @__PURE__ */ ge(Xe, [["render", ot]]);
function at(e) {
  let t = 0;
  for (let i = 0, o = e.length; i < o; i++) {
    let s = e.charCodeAt(i);
    t = (t << 5) - t + s, t |= 0;
  }
  return t;
}
function Ne(e) {
  return e && typeof e == "object" && !Array.isArray(e);
}
function lt(e) {
  return e !== null && typeof e == "object" && typeof e.then == "function" && typeof e.catch == "function";
}
let ct = 1;
function ut(e, t, i) {
  if (e !== "")
    return e;
  {
    const o = dt(i);
    return `${t}_${ct++}_${o}`;
  }
}
function dt(e) {
  const t = e.location.hash && typeof e.location.hash[1] < "u" && e.location.hash[1] === "/";
  let i = "";
  if (t)
    i = e.location.href.toString();
  else {
    const o = new URL(e.location.href);
    o.hash = "", i = o.toString();
  }
  return at(i).toString(16).replace("-", "_");
}
/*!
  Highlight.js v11.7.0 (git: 82688fad18)
  (c) 2006-2022 undefined and other contributors
  License: BSD-3-Clause
 */
var Se = { exports: {} };
function Ee(e) {
  return e instanceof Map ? e.clear = e.delete = e.set = () => {
    throw Error("map is read-only");
  } : e instanceof Set && (e.add = e.clear = e.delete = () => {
    throw Error("set is read-only");
  }), Object.freeze(e), Object.getOwnPropertyNames(e).forEach((t) => {
    var i = e[t];
    typeof i != "object" || Object.isFrozen(i) || Ee(i);
  }), e;
}
Se.exports = Ee, Se.exports.default = Ee;
class Ie {
  constructor(t) {
    t.data === void 0 && (t.data = {}), this.data = t.data, this.isMatchIgnored = !1;
  }
  ignoreMatch() {
    this.isMatchIgnored = !0;
  }
}
function Ve(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
}
function Q(e, ...t) {
  const i = /* @__PURE__ */ Object.create(null);
  for (const o in e)
    i[o] = e[o];
  return t.forEach((o) => {
    for (const s in o)
      i[s] = o[s];
  }), i;
}
const Ae = (e) => !!e.scope || e.sublanguage && e.language;
class ht {
  constructor(t, i) {
    this.buffer = "", this.classPrefix = i.classPrefix, t.walk(this);
  }
  addText(t) {
    this.buffer += Ve(t);
  }
  openNode(t) {
    if (!Ae(t))
      return;
    let i = "";
    i = t.sublanguage ? "language-" + t.language : ((o, { prefix: s }) => {
      if (o.includes(".")) {
        const n = o.split(".");
        return [`${s}${n.shift()}`, ...n.map((l, a) => `${l}${"_".repeat(a + 1)}`)].join(" ");
      }
      return `${s}${o}`;
    })(t.scope, { prefix: this.classPrefix }), this.span(i);
  }
  closeNode(t) {
    Ae(t) && (this.buffer += "</span>");
  }
  value() {
    return this.buffer;
  }
  span(t) {
    this.buffer += `<span class="${t}">`;
  }
}
const xe = (e = {}) => {
  const t = { children: [] };
  return Object.assign(t, e), t;
};
class Fe {
  constructor() {
    this.rootNode = xe(), this.stack = [this.rootNode];
  }
  get top() {
    return this.stack[this.stack.length - 1];
  }
  get root() {
    return this.rootNode;
  }
  add(t) {
    this.top.children.push(t);
  }
  openNode(t) {
    const i = xe({ scope: t });
    this.add(i), this.stack.push(i);
  }
  closeNode() {
    if (this.stack.length > 1)
      return this.stack.pop();
  }
  closeAllNodes() {
    for (; this.closeNode(); )
      ;
  }
  toJSON() {
    return JSON.stringify(this.rootNode, null, 4);
  }
  walk(t) {
    return this.constructor._walk(t, this.rootNode);
  }
  static _walk(t, i) {
    return typeof i == "string" ? t.addText(i) : i.children && (t.openNode(i), i.children.forEach((o) => this._walk(t, o)), t.closeNode(i)), t;
  }
  static _collapse(t) {
    typeof t != "string" && t.children && (t.children.every((i) => typeof i == "string") ? t.children = [t.children.join("")] : t.children.forEach((i) => {
      Fe._collapse(i);
    }));
  }
}
class gt extends Fe {
  constructor(t) {
    super(), this.options = t;
  }
  addKeyword(t, i) {
    t !== "" && (this.openNode(i), this.addText(t), this.closeNode());
  }
  addText(t) {
    t !== "" && this.add(t);
  }
  addSublanguage(t, i) {
    const o = t.root;
    o.sublanguage = !0, o.language = i, this.add(o);
  }
  toHTML() {
    return new ht(this, this.options).value();
  }
  finalize() {
    return !0;
  }
}
function re(e) {
  return e ? typeof e == "string" ? e : e.source : null;
}
function ze(e) {
  return J("(?=", e, ")");
}
function pt(e) {
  return J("(?:", e, ")*");
}
function ft(e) {
  return J("(?:", e, ")?");
}
function J(...e) {
  return e.map((t) => re(t)).join("");
}
function _e(...e) {
  return "(" + (((i) => {
    const o = i[i.length - 1];
    return typeof o == "object" && o.constructor === Object ? (i.splice(i.length - 1, 1), o) : {};
  })(e).capture ? "" : "?:") + e.map((i) => re(i)).join("|") + ")";
}
function He(e) {
  return RegExp(e.toString() + "|").exec("").length - 1;
}
const mt = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
function ke(e, { joinWith: t }) {
  let i = 0;
  return e.map((o) => {
    i += 1;
    const s = i;
    let n = re(o), l = "";
    for (; n.length > 0; ) {
      const a = mt.exec(n);
      if (!a) {
        l += n;
        break;
      }
      l += n.substring(0, a.index), n = n.substring(a.index + a[0].length), a[0][0] === "\\" && a[1] ? l += "\\" + (Number(a[1]) + s) : (l += a[0], a[0] === "(" && i++);
    }
    return l;
  }).map((o) => `(${o})`).join(t);
}
const Te = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", se = {
  begin: "\\\\[\\s\\S]",
  relevance: 0
}, yt = {
  scope: "string",
  begin: "'",
  end: "'",
  illegal: "\\n",
  contains: [se]
}, vt = {
  scope: "string",
  begin: '"',
  end: '"',
  illegal: "\\n",
  contains: [se]
}, pe = (e, t, i = {}) => {
  const o = Q({
    scope: "comment",
    begin: e,
    end: t,
    contains: []
  }, i);
  o.contains.push({
    scope: "doctag",
    begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
    end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
    excludeBegin: !0,
    relevance: 0
  });
  const s = _e("I", "a", "is", "so", "us", "to", "at", "if", "in", "it", "on", /[A-Za-z]+['](d|ve|re|ll|t|s|n)/, /[A-Za-z]+[-][a-z]+/, /[A-Za-z][a-z]{2,}/);
  return o.contains.push({ begin: J(/[ ]+/, "(", s, /[.]?[:]?([.][ ]|[ ])/, "){3}") }), o;
}, bt = pe("//", "$"), wt = pe("/\\*", "\\*/"), St = pe("#", "$");
var le = Object.freeze({
  __proto__: null,
  MATCH_NOTHING_RE: /\b\B/,
  IDENT_RE: "[a-zA-Z]\\w*",
  UNDERSCORE_IDENT_RE: "[a-zA-Z_]\\w*",
  NUMBER_RE: "\\b\\d+(\\.\\d+)?",
  C_NUMBER_RE: Te,
  BINARY_NUMBER_RE: "\\b(0b[01]+)",
  RE_STARTERS_RE: "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",
  SHEBANG: (e = {}) => {
    const t = /^#![ ]*\//;
    return e.binary && (e.begin = J(t, /.*\b/, e.binary, /\b.*/)), Q({
      scope: "meta",
      begin: t,
      end: /$/,
      relevance: 0,
      "on:begin": (i, o) => {
        i.index !== 0 && o.ignoreMatch();
      }
    }, e);
  },
  BACKSLASH_ESCAPE: se,
  APOS_STRING_MODE: yt,
  QUOTE_STRING_MODE: vt,
  PHRASAL_WORDS_MODE: {
    begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
  },
  COMMENT: pe,
  C_LINE_COMMENT_MODE: bt,
  C_BLOCK_COMMENT_MODE: wt,
  HASH_COMMENT_MODE: St,
  NUMBER_MODE: { scope: "number", begin: "\\b\\d+(\\.\\d+)?", relevance: 0 },
  C_NUMBER_MODE: { scope: "number", begin: Te, relevance: 0 },
  BINARY_NUMBER_MODE: {
    scope: "number",
    begin: "\\b(0b[01]+)",
    relevance: 0
  },
  REGEXP_MODE: {
    begin: /(?=\/[^/\n]*\/)/,
    contains: [{
      scope: "regexp",
      begin: /\//,
      end: /\/[gimuy]*/,
      illegal: /\n/,
      contains: [se, { begin: /\[/, end: /\]/, relevance: 0, contains: [se] }]
    }]
  },
  TITLE_MODE: { scope: "title", begin: "[a-zA-Z]\\w*", relevance: 0 },
  UNDERSCORE_TITLE_MODE: { scope: "title", begin: "[a-zA-Z_]\\w*", relevance: 0 },
  METHOD_GUARD: { begin: "\\.\\s*[a-zA-Z_]\\w*", relevance: 0 },
  END_SAME_AS_BEGIN: (e) => Object.assign(e, { "on:begin": (t, i) => {
    i.data._beginMatch = t[1];
  }, "on:end": (t, i) => {
    i.data._beginMatch !== t[1] && i.ignoreMatch();
  } })
});
function Et(e, t) {
  e.input[e.index - 1] === "." && t.ignoreMatch();
}
function kt(e, t) {
  e.className !== void 0 && (e.scope = e.className, delete e.className);
}
function Ot(e, t) {
  t && e.beginKeywords && (e.begin = "\\b(" + e.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)", e.__beforeBegin = Et, e.keywords = e.keywords || e.beginKeywords, delete e.beginKeywords, e.relevance === void 0 && (e.relevance = 0));
}
function Ft(e, t) {
  Array.isArray(e.illegal) && (e.illegal = _e(...e.illegal));
}
function _t(e, t) {
  if (e.match) {
    if (e.begin || e.end)
      throw Error("begin & end are not supported with match");
    e.begin = e.match, delete e.match;
  }
}
function Nt(e, t) {
  e.relevance === void 0 && (e.relevance = 1);
}
const It = (e, t) => {
  if (!e.beforeMatch)
    return;
  if (e.starts)
    throw Error("beforeMatch cannot be used with starts");
  const i = Object.assign({}, e);
  Object.keys(e).forEach((o) => {
    delete e[o];
  }), e.keywords = i.keywords, e.begin = J(i.beforeMatch, ze(i.begin)), e.starts = {
    relevance: 0,
    contains: [Object.assign(i, { endsParent: !0 })]
  }, e.relevance = 0, delete i.beforeMatch;
}, At = ["of", "and", "for", "in", "not", "or", "if", "then", "parent", "list", "value"];
function De(e, t, i = "keyword") {
  const o = /* @__PURE__ */ Object.create(null);
  return typeof e == "string" ? s(i, e.split(" ")) : Array.isArray(e) ? s(i, e) : Object.keys(e).forEach((n) => {
    Object.assign(o, De(e[n], t, n));
  }), o;
  function s(n, l) {
    t && (l = l.map((a) => a.toLowerCase())), l.forEach((a) => {
      const r = a.split("|");
      o[r[0]] = [n, xt(r[0], r[1])];
    });
  }
}
function xt(e, t) {
  return t ? Number(t) : ((i) => At.includes(i.toLowerCase()))(e) ? 0 : 1;
}
const Me = {}, q = (e) => {
  console.error(e);
}, Le = (e, ...t) => {
  console.log("WARN: " + e, ...t);
}, ee = (e, t) => {
  Me[`${e}/${t}`] || (console.log(`Deprecated as of ${e}. ${t}`), Me[`${e}/${t}`] = !0);
}, ce = Error();
function Re(e, t, { key: i }) {
  let o = 0;
  const s = e[i], n = {}, l = {};
  for (let a = 1; a <= t.length; a++)
    l[a + o] = s[a], n[a + o] = !0, o += He(t[a - 1]);
  e[i] = l, e[i]._emit = n, e[i]._multi = !0;
}
function Tt(e) {
  ((t) => {
    t.scope && typeof t.scope == "object" && t.scope !== null && (t.beginScope = t.scope, delete t.scope);
  })(e), typeof e.beginScope == "string" && (e.beginScope = {
    _wrap: e.beginScope
  }), typeof e.endScope == "string" && (e.endScope = {
    _wrap: e.endScope
  }), ((t) => {
    if (Array.isArray(t.begin)) {
      if (t.skip || t.excludeBegin || t.returnBegin)
        throw q("skip, excludeBegin, returnBegin not compatible with beginScope: {}"), ce;
      if (typeof t.beginScope != "object" || t.beginScope === null)
        throw q("beginScope must be object"), ce;
      Re(t, t.begin, { key: "beginScope" }), t.begin = ke(t.begin, { joinWith: "" });
    }
  })(e), ((t) => {
    if (Array.isArray(t.end)) {
      if (t.skip || t.excludeEnd || t.returnEnd)
        throw q("skip, excludeEnd, returnEnd not compatible with endScope: {}"), ce;
      if (typeof t.endScope != "object" || t.endScope === null)
        throw q("endScope must be object"), ce;
      Re(t, t.end, { key: "endScope" }), t.end = ke(t.end, { joinWith: "" });
    }
  })(e);
}
function Mt(e) {
  function t(s, n) {
    return RegExp(re(s), "m" + (e.case_insensitive ? "i" : "") + (e.unicodeRegex ? "u" : "") + (n ? "g" : ""));
  }
  class i {
    constructor() {
      this.matchIndexes = {}, this.regexes = [], this.matchAt = 1, this.position = 0;
    }
    addRule(n, l) {
      l.position = this.position++, this.matchIndexes[this.matchAt] = l, this.regexes.push([l, n]), this.matchAt += He(n) + 1;
    }
    compile() {
      this.regexes.length === 0 && (this.exec = () => null);
      const n = this.regexes.map((l) => l[1]);
      this.matcherRe = t(ke(n, {
        joinWith: "|"
      }), !0), this.lastIndex = 0;
    }
    exec(n) {
      this.matcherRe.lastIndex = this.lastIndex;
      const l = this.matcherRe.exec(n);
      if (!l)
        return null;
      const a = l.findIndex((v, m) => m > 0 && v !== void 0), r = this.matchIndexes[a];
      return l.splice(0, a), Object.assign(l, r);
    }
  }
  class o {
    constructor() {
      this.rules = [], this.multiRegexes = [], this.count = 0, this.lastIndex = 0, this.regexIndex = 0;
    }
    getMatcher(n) {
      if (this.multiRegexes[n])
        return this.multiRegexes[n];
      const l = new i();
      return this.rules.slice(n).forEach(([a, r]) => l.addRule(a, r)), l.compile(), this.multiRegexes[n] = l, l;
    }
    resumingScanAtSamePosition() {
      return this.regexIndex !== 0;
    }
    considerAll() {
      this.regexIndex = 0;
    }
    addRule(n, l) {
      this.rules.push([n, l]), l.type === "begin" && this.count++;
    }
    exec(n) {
      const l = this.getMatcher(this.regexIndex);
      l.lastIndex = this.lastIndex;
      let a = l.exec(n);
      if (this.resumingScanAtSamePosition() && !(a && a.index === this.lastIndex)) {
        const r = this.getMatcher(0);
        r.lastIndex = this.lastIndex + 1, a = r.exec(n);
      }
      return a && (this.regexIndex += a.position + 1, this.regexIndex === this.count && this.considerAll()), a;
    }
  }
  if (e.compilerExtensions || (e.compilerExtensions = []), e.contains && e.contains.includes("self"))
    throw Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
  return e.classNameAliases = Q(e.classNameAliases || {}), function s(n, l) {
    const a = n;
    if (n.isCompiled)
      return a;
    [kt, _t, Tt, It].forEach((v) => v(n, l)), e.compilerExtensions.forEach((v) => v(n, l)), n.__beforeBegin = null, [Ot, Ft, Nt].forEach((v) => v(n, l)), n.isCompiled = !0;
    let r = null;
    return typeof n.keywords == "object" && n.keywords.$pattern && (n.keywords = Object.assign({}, n.keywords), r = n.keywords.$pattern, delete n.keywords.$pattern), r = r || /\w+/, n.keywords && (n.keywords = De(n.keywords, e.case_insensitive)), a.keywordPatternRe = t(r, !0), l && (n.begin || (n.begin = /\B|\b/), a.beginRe = t(a.begin), n.end || n.endsWithParent || (n.end = /\B|\b/), n.end && (a.endRe = t(a.end)), a.terminatorEnd = re(a.end) || "", n.endsWithParent && l.terminatorEnd && (a.terminatorEnd += (n.end ? "|" : "") + l.terminatorEnd)), n.illegal && (a.illegalRe = t(n.illegal)), n.contains || (n.contains = []), n.contains = [].concat(...n.contains.map((v) => ((m) => (m.variants && !m.cachedVariants && (m.cachedVariants = m.variants.map((M) => Q(m, {
      variants: null
    }, M))), m.cachedVariants ? m.cachedVariants : Qe(m) ? Q(m, {
      starts: m.starts ? Q(m.starts) : null
    }) : Object.isFrozen(m) ? Q(m) : m))(v === "self" ? n : v))), n.contains.forEach((v) => {
      s(v, a);
    }), n.starts && s(n.starts, l), a.matcher = ((v) => {
      const m = new o();
      return v.contains.forEach((M) => m.addRule(M.begin, {
        rule: M,
        type: "begin"
      })), v.terminatorEnd && m.addRule(v.terminatorEnd, {
        type: "end"
      }), v.illegal && m.addRule(v.illegal, { type: "illegal" }), m;
    })(a), a;
  }(e);
}
function Qe(e) {
  return !!e && (e.endsWithParent || Qe(e.starts));
}
class Lt extends Error {
  constructor(t, i) {
    super(t), this.name = "HTMLInjectionError", this.html = i;
  }
}
const ve = Ve, Ce = Q, Pe = Symbol("nomatch");
var Oe = ((e) => {
  const t = /* @__PURE__ */ Object.create(null), i = /* @__PURE__ */ Object.create(null), o = [];
  let s = !0;
  const n = "Could not find the language '{}', did you forget to load/include a language module?", l = {
    disableAutodetect: !0,
    name: "Plain text",
    contains: []
  };
  let a = {
    ignoreUnescapedHTML: !1,
    throwUnescapedHTML: !1,
    noHighlightRe: /^(no-?highlight)$/i,
    languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
    classPrefix: "hljs-",
    cssSelector: "pre code",
    languages: null,
    __emitter: gt
  };
  function r(c) {
    return a.noHighlightRe.test(c);
  }
  function v(c, f, y) {
    let I = "", F = "";
    typeof f == "object" ? (I = c, y = f.ignoreIllegals, F = f.language) : (ee("10.7.0", "highlight(lang, code, ...args) has been deprecated."), ee("10.7.0", `Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`), F = c, I = f), y === void 0 && (y = !0);
    const k = { code: I, language: F };
    W("before:highlight", k);
    const A = k.result ? k.result : m(k.language, k.code, y);
    return A.code = k.code, W("after:highlight", A), A;
  }
  function m(c, f, y, I) {
    const F = /* @__PURE__ */ Object.create(null);
    function k() {
      if (!g.keywords)
        return void N.addText(w);
      let u = 0;
      g.keywordPatternRe.lastIndex = 0;
      let p = g.keywordPatternRe.exec(w), E = "";
      for (; p; ) {
        E += w.substring(u, p.index);
        const O = V.case_insensitive ? p[0].toLowerCase() : p[0], x = (S = O, g.keywords[S]);
        if (x) {
          const [H, ye] = x;
          if (N.addText(E), E = "", F[O] = (F[O] || 0) + 1, F[O] <= 7 && (X += ye), H.startsWith("_"))
            E += p[0];
          else {
            const ae = V.classNameAliases[H] || H;
            N.addKeyword(p[0], ae);
          }
        } else
          E += p[0];
        u = g.keywordPatternRe.lastIndex, p = g.keywordPatternRe.exec(w);
      }
      var S;
      E += w.substring(u), N.addText(E);
    }
    function A() {
      g.subLanguage != null ? (() => {
        if (w === "")
          return;
        let u = null;
        if (typeof g.subLanguage == "string") {
          if (!t[g.subLanguage])
            return void N.addText(w);
          u = m(g.subLanguage, w, !0, $[g.subLanguage]), $[g.subLanguage] = u._top;
        } else
          u = M(w, g.subLanguage.length ? g.subLanguage : null);
        g.relevance > 0 && (X += u.relevance), N.addSublanguage(u._emitter, u.language);
      })() : k(), w = "";
    }
    function T(u, p) {
      let E = 1;
      const S = p.length - 1;
      for (; E <= S; ) {
        if (!u._emit[E]) {
          E++;
          continue;
        }
        const O = V.classNameAliases[u[E]] || u[E], x = p[E];
        O ? N.addKeyword(x, O) : (w = x, k(), w = ""), E++;
      }
    }
    function _(u, p) {
      return u.scope && typeof u.scope == "string" && N.openNode(V.classNameAliases[u.scope] || u.scope), u.beginScope && (u.beginScope._wrap ? (N.addKeyword(w, V.classNameAliases[u.beginScope._wrap] || u.beginScope._wrap), w = "") : u.beginScope._multi && (T(u.beginScope, p), w = "")), g = Object.create(u, { parent: {
        value: g
      } }), g;
    }
    function L(u, p, E) {
      let S = ((O, x) => {
        const H = O && O.exec(x);
        return H && H.index === 0;
      })(u.endRe, E);
      if (S) {
        if (u["on:end"]) {
          const O = new Ie(u);
          u["on:end"](p, O), O.isMatchIgnored && (S = !1);
        }
        if (S) {
          for (; u.endsParent && u.parent; )
            u = u.parent;
          return u;
        }
      }
      if (u.endsWithParent)
        return L(u.parent, p, E);
    }
    function oe(u) {
      return g.matcher.regexIndex === 0 ? (w += u[0], 1) : (me = !0, 0);
    }
    function fe(u) {
      const p = u[0], E = f.substring(u.index), S = L(g, u, E);
      if (!S)
        return Pe;
      const O = g;
      g.endScope && g.endScope._wrap ? (A(), N.addKeyword(p, g.endScope._wrap)) : g.endScope && g.endScope._multi ? (A(), T(g.endScope, u)) : O.skip ? w += p : (O.returnEnd || O.excludeEnd || (w += p), A(), O.excludeEnd && (w = p));
      do
        g.scope && N.closeNode(), g.skip || g.subLanguage || (X += g.relevance), g = g.parent;
      while (g !== S.parent);
      return S.starts && _(S.starts, u), O.returnEnd ? 0 : p.length;
    }
    let Y = {};
    function ne(u, p) {
      const E = p && p[0];
      if (w += u, E == null)
        return A(), 0;
      if (Y.type === "begin" && p.type === "end" && Y.index === p.index && E === "") {
        if (w += f.slice(p.index, p.index + 1), !s) {
          const S = Error(`0 width match regex (${c})`);
          throw S.languageName = c, S.badRule = Y.rule, S;
        }
        return 1;
      }
      if (Y = p, p.type === "begin")
        return ((S) => {
          const O = S[0], x = S.rule, H = new Ie(x), ye = [x.__beforeBegin, x["on:begin"]];
          for (const ae of ye)
            if (ae && (ae(S, H), H.isMatchIgnored))
              return oe(O);
          return x.skip ? w += O : (x.excludeBegin && (w += O), A(), x.returnBegin || x.excludeBegin || (w = O)), _(x, S), x.returnBegin ? 0 : O.length;
        })(p);
      if (p.type === "illegal" && !y) {
        const S = Error('Illegal lexeme "' + E + '" for mode "' + (g.scope || "<unnamed>") + '"');
        throw S.mode = g, S;
      }
      if (p.type === "end") {
        const S = fe(p);
        if (S !== Pe)
          return S;
      }
      if (p.type === "illegal" && E === "")
        return 1;
      if (ie > 1e5 && ie > 3 * p.index)
        throw Error("potential infinite loop, way more iterations than matches");
      return w += E, E.length;
    }
    const V = P(c);
    if (!V)
      throw q(n.replace("{}", c)), Error('Unknown language: "' + c + '"');
    const K = Mt(V);
    let G = "", g = I || K;
    const $ = {}, N = new a.__emitter(a);
    (() => {
      const u = [];
      for (let p = g; p !== V; p = p.parent)
        p.scope && u.unshift(p.scope);
      u.forEach((p) => N.openNode(p));
    })();
    let w = "", X = 0, z = 0, ie = 0, me = !1;
    try {
      for (g.matcher.considerAll(); ; ) {
        ie++, me ? me = !1 : g.matcher.considerAll(), g.matcher.lastIndex = z;
        const u = g.matcher.exec(f);
        if (!u)
          break;
        const p = ne(f.substring(z, u.index), u);
        z = u.index + p;
      }
      return ne(f.substring(z)), N.closeAllNodes(), N.finalize(), G = N.toHTML(), {
        language: c,
        value: G,
        relevance: X,
        illegal: !1,
        _emitter: N,
        _top: g
      };
    } catch (u) {
      if (u.message && u.message.includes("Illegal"))
        return {
          language: c,
          value: ve(f),
          illegal: !0,
          relevance: 0,
          _illegalBy: {
            message: u.message,
            index: z,
            context: f.slice(z - 100, z + 100),
            mode: u.mode,
            resultSoFar: G
          },
          _emitter: N
        };
      if (s)
        return {
          language: c,
          value: ve(f),
          illegal: !1,
          relevance: 0,
          errorRaised: u,
          _emitter: N,
          _top: g
        };
      throw u;
    }
  }
  function M(c, f) {
    f = f || a.languages || Object.keys(t);
    const y = ((_) => {
      const L = { value: ve(_), illegal: !1, relevance: 0, _top: l, _emitter: new a.__emitter(a) };
      return L._emitter.addText(_), L;
    })(c), I = f.filter(P).filter(te).map((_) => m(_, c, !1));
    I.unshift(y);
    const F = I.sort((_, L) => {
      if (_.relevance !== L.relevance)
        return L.relevance - _.relevance;
      if (_.language && L.language) {
        if (P(_.language).supersetOf === L.language)
          return 1;
        if (P(L.language).supersetOf === _.language)
          return -1;
      }
      return 0;
    }), [k, A] = F, T = k;
    return T.secondBest = A, T;
  }
  function B(c) {
    let f = null;
    const y = ((k) => {
      let A = k.className + " ";
      A += k.parentNode ? k.parentNode.className : "";
      const T = a.languageDetectRe.exec(A);
      if (T) {
        const _ = P(T[1]);
        return _ || (Le(n.replace("{}", T[1])), Le("Falling back to no-highlight mode for this block.", k)), _ ? T[1] : "no-highlight";
      }
      return A.split(/\s+/).find((_) => r(_) || P(_));
    })(c);
    if (r(y))
      return;
    if (W("before:highlightElement", {
      el: c,
      language: y
    }), c.children.length > 0 && (a.ignoreUnescapedHTML || (console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."), console.warn("https://github.com/highlightjs/highlight.js/wiki/security"), console.warn("The element with unescaped HTML:"), console.warn(c)), a.throwUnescapedHTML))
      throw new Lt("One of your code blocks includes unescaped HTML.", c.innerHTML);
    f = c;
    const I = f.textContent, F = y ? v(I, { language: y, ignoreIllegals: !0 }) : M(I);
    c.innerHTML = F.value, ((k, A, T) => {
      const _ = A && i[A] || T;
      k.classList.add("hljs"), k.classList.add("language-" + _);
    })(c, y, F.language), c.result = {
      language: F.language,
      re: F.relevance,
      relevance: F.relevance
    }, F.secondBest && (c.secondBest = {
      language: F.secondBest.language,
      relevance: F.secondBest.relevance
    }), W("after:highlightElement", { el: c, result: F, text: I });
  }
  let U = !1;
  function Z() {
    document.readyState !== "loading" ? document.querySelectorAll(a.cssSelector).forEach(B) : U = !0;
  }
  function P(c) {
    return c = (c || "").toLowerCase(), t[c] || t[i[c]];
  }
  function D(c, { languageName: f }) {
    typeof c == "string" && (c = [c]), c.forEach((y) => {
      i[y.toLowerCase()] = f;
    });
  }
  function te(c) {
    const f = P(c);
    return f && !f.disableAutodetect;
  }
  function W(c, f) {
    const y = c;
    o.forEach((I) => {
      I[y] && I[y](f);
    });
  }
  typeof window < "u" && window.addEventListener && window.addEventListener("DOMContentLoaded", () => {
    U && Z();
  }, !1), Object.assign(e, {
    highlight: v,
    highlightAuto: M,
    highlightAll: Z,
    highlightElement: B,
    highlightBlock: (c) => (ee("10.7.0", "highlightBlock will be removed entirely in v12.0"), ee("10.7.0", "Please use highlightElement now."), B(c)),
    configure: (c) => {
      a = Ce(a, c);
    },
    initHighlighting: () => {
      Z(), ee("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
    },
    initHighlightingOnLoad: () => {
      Z(), ee("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
    },
    registerLanguage: (c, f) => {
      let y = null;
      try {
        y = f(e);
      } catch (I) {
        if (q("Language definition for '{}' could not be registered.".replace("{}", c)), !s)
          throw I;
        q(I), y = l;
      }
      y.name || (y.name = c), t[c] = y, y.rawDefinition = f.bind(null, e), y.aliases && D(y.aliases, {
        languageName: c
      });
    },
    unregisterLanguage: (c) => {
      delete t[c];
      for (const f of Object.keys(i))
        i[f] === c && delete i[f];
    },
    listLanguages: () => Object.keys(t),
    getLanguage: P,
    registerAliases: D,
    autoDetection: te,
    inherit: Ce,
    addPlugin: (c) => {
      ((f) => {
        f["before:highlightBlock"] && !f["before:highlightElement"] && (f["before:highlightElement"] = (y) => {
          f["before:highlightBlock"](Object.assign({ block: y.el }, y));
        }), f["after:highlightBlock"] && !f["after:highlightElement"] && (f["after:highlightElement"] = (y) => {
          f["after:highlightBlock"](Object.assign({ block: y.el }, y));
        });
      })(c), o.push(c);
    }
  }), e.debugMode = () => {
    s = !1;
  }, e.safeMode = () => {
    s = !0;
  }, e.versionString = "11.7.0", e.regex = {
    concat: J,
    lookahead: ze,
    either: _e,
    optional: ft,
    anyNumberOfTimes: pt
  };
  for (const c in le)
    typeof le[c] == "object" && Se.exports(le[c]);
  return Object.assign(e, le), e;
})({});
/*! `javascript` grammar compiled for Highlight.js 11.7.0 */
var Rt = (() => {
  const e = "[A-Za-z$_][0-9A-Za-z$_]*", t = ["as", "in", "of", "if", "for", "while", "finally", "var", "new", "function", "do", "return", "void", "else", "break", "catch", "instanceof", "with", "throw", "case", "default", "try", "switch", "continue", "typeof", "delete", "let", "yield", "const", "class", "debugger", "async", "await", "static", "import", "from", "export", "extends"], i = ["true", "false", "null", "undefined", "NaN", "Infinity"], o = ["Object", "Function", "Boolean", "Symbol", "Math", "Date", "Number", "BigInt", "String", "RegExp", "Array", "Float32Array", "Float64Array", "Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Int32Array", "Uint16Array", "Uint32Array", "BigInt64Array", "BigUint64Array", "Set", "Map", "WeakSet", "WeakMap", "ArrayBuffer", "SharedArrayBuffer", "Atomics", "DataView", "JSON", "Promise", "Generator", "GeneratorFunction", "AsyncFunction", "Reflect", "Proxy", "Intl", "WebAssembly"], s = ["Error", "EvalError", "InternalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError"], n = ["setInterval", "setTimeout", "clearInterval", "clearTimeout", "require", "exports", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "unescape"], l = ["arguments", "this", "super", "console", "window", "document", "localStorage", "module", "global"], a = [].concat(n, o, s);
  return (r) => {
    const v = r.regex, m = e, M = {
      begin: /<[A-Za-z0-9\\._:-]+/,
      end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
      isTrulyOpeningTag: (K, G) => {
        const g = K[0].length + K.index, $ = K.input[g];
        if ($ === "<" || $ === ",")
          return void G.ignoreMatch();
        let N;
        $ === ">" && (((X, { after: z }) => {
          const ie = "</" + X[0].slice(1);
          return X.input.indexOf(ie, z) !== -1;
        })(K, { after: g }) || G.ignoreMatch());
        const w = K.input.substring(g);
        ((N = w.match(/^\s*=/)) || (N = w.match(/^\s+extends\s+/)) && N.index === 0) && G.ignoreMatch();
      }
    }, B = {
      $pattern: e,
      keyword: t,
      literal: i,
      built_in: a,
      "variable.language": l
    }, U = "\\.([0-9](_?[0-9])*)", Z = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", P = {
      className: "number",
      variants: [{
        begin: `(\\b(${Z})((${U})|\\.)?|(${U}))[eE][+-]?([0-9](_?[0-9])*)\\b`
      }, {
        begin: `\\b(${Z})\\b((${U})\\b|\\.)?|(${U})\\b`
      }, {
        begin: "\\b(0|[1-9](_?[0-9])*)n\\b"
      }, {
        begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"
      }, {
        begin: "\\b0[bB][0-1](_?[0-1])*n?\\b"
      }, { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" }, {
        begin: "\\b0[0-7]+n?\\b"
      }],
      relevance: 0
    }, D = {
      className: "subst",
      begin: "\\$\\{",
      end: "\\}",
      keywords: B,
      contains: []
    }, te = { begin: "html`", end: "", starts: {
      end: "`",
      returnEnd: !1,
      contains: [r.BACKSLASH_ESCAPE, D],
      subLanguage: "xml"
    } }, W = {
      begin: "css`",
      end: "",
      starts: {
        end: "`",
        returnEnd: !1,
        contains: [r.BACKSLASH_ESCAPE, D],
        subLanguage: "css"
      }
    }, c = {
      className: "string",
      begin: "`",
      end: "`",
      contains: [r.BACKSLASH_ESCAPE, D]
    }, f = {
      className: "comment",
      variants: [r.COMMENT(/\/\*\*(?!\/)/, "\\*/", {
        relevance: 0,
        contains: [{
          begin: "(?=@[A-Za-z]+)",
          relevance: 0,
          contains: [{
            className: "doctag",
            begin: "@[A-Za-z]+"
          }, {
            className: "type",
            begin: "\\{",
            end: "\\}",
            excludeEnd: !0,
            excludeBegin: !0,
            relevance: 0
          }, {
            className: "variable",
            begin: m + "(?=\\s*(-)|$)",
            endsParent: !0,
            relevance: 0
          }, { begin: /(?=[^\n])\s/, relevance: 0 }]
        }]
      }), r.C_BLOCK_COMMENT_MODE, r.C_LINE_COMMENT_MODE]
    }, y = [r.APOS_STRING_MODE, r.QUOTE_STRING_MODE, te, W, c, { match: /\$\d+/ }, P];
    D.contains = y.concat({
      begin: /\{/,
      end: /\}/,
      keywords: B,
      contains: ["self"].concat(y)
    });
    const I = [].concat(f, D.contains), F = I.concat([{
      begin: /\(/,
      end: /\)/,
      keywords: B,
      contains: ["self"].concat(I)
    }]), k = {
      className: "params",
      begin: /\(/,
      end: /\)/,
      excludeBegin: !0,
      excludeEnd: !0,
      keywords: B,
      contains: F
    }, A = { variants: [{
      match: [/class/, /\s+/, m, /\s+/, /extends/, /\s+/, v.concat(m, "(", v.concat(/\./, m), ")*")],
      scope: { 1: "keyword", 3: "title.class", 5: "keyword", 7: "title.class.inherited" }
    }, {
      match: [/class/, /\s+/, m],
      scope: { 1: "keyword", 3: "title.class" }
    }] }, T = {
      relevance: 0,
      match: v.either(/\bJSON/, /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/, /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/, /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),
      className: "title.class",
      keywords: { _: [...o, ...s] }
    }, _ = {
      variants: [{
        match: [/function/, /\s+/, m, /(?=\s*\()/]
      }, { match: [/function/, /\s*(?=\()/] }],
      className: { 1: "keyword", 3: "title.function" },
      label: "func.def",
      contains: [k],
      illegal: /%/
    }, L = {
      match: v.concat(/\b/, (oe = [...n, "super", "import"], v.concat("(?!", oe.join("|"), ")")), m, v.lookahead(/\(/)),
      className: "title.function",
      relevance: 0
    };
    var oe;
    const fe = {
      begin: v.concat(/\./, v.lookahead(v.concat(m, /(?![0-9A-Za-z$_(])/))),
      end: m,
      excludeBegin: !0,
      keywords: "prototype",
      className: "property",
      relevance: 0
    }, Y = {
      match: [/get|set/, /\s+/, m, /(?=\()/],
      className: { 1: "keyword", 3: "title.function" },
      contains: [{ begin: /\(\)/ }, k]
    }, ne = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + r.UNDERSCORE_IDENT_RE + ")\\s*=>", V = {
      match: [/const|var|let/, /\s+/, m, /\s*/, /=\s*/, /(async\s*)?/, v.lookahead(ne)],
      keywords: "async",
      className: { 1: "keyword", 3: "title.function" },
      contains: [k]
    };
    return {
      name: "Javascript",
      aliases: ["js", "jsx", "mjs", "cjs"],
      keywords: B,
      exports: {
        PARAMS_CONTAINS: F,
        CLASS_REFERENCE: T
      },
      illegal: /#(?![$_A-z])/,
      contains: [r.SHEBANG({ label: "shebang", binary: "node", relevance: 5 }), {
        label: "use_strict",
        className: "meta",
        relevance: 10,
        begin: /^\s*['"]use (strict|asm)['"]/
      }, r.APOS_STRING_MODE, r.QUOTE_STRING_MODE, te, W, c, f, { match: /\$\d+/ }, P, T, {
        className: "attr",
        begin: m + v.lookahead(":"),
        relevance: 0
      }, V, {
        begin: "(" + r.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        relevance: 0,
        contains: [f, r.REGEXP_MODE, {
          className: "function",
          begin: ne,
          returnBegin: !0,
          end: "\\s*=>",
          contains: [{
            className: "params",
            variants: [{ begin: r.UNDERSCORE_IDENT_RE, relevance: 0 }, {
              className: null,
              begin: /\(\s*\)/,
              skip: !0
            }, {
              begin: /\(/,
              end: /\)/,
              excludeBegin: !0,
              excludeEnd: !0,
              keywords: B,
              contains: F
            }]
          }]
        }, { begin: /,/, relevance: 0 }, {
          match: /\s+/,
          relevance: 0
        }, { variants: [{ begin: "<>", end: "</>" }, {
          match: /<[A-Za-z0-9\\._:-]+\s*\/>/
        }, {
          begin: M.begin,
          "on:begin": M.isTrulyOpeningTag,
          end: M.end
        }], subLanguage: "xml", contains: [{
          begin: M.begin,
          end: M.end,
          skip: !0,
          contains: ["self"]
        }] }]
      }, _, {
        beginKeywords: "while if switch catch for"
      }, {
        begin: "\\b(?!function)" + r.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
        returnBegin: !0,
        label: "func.def",
        contains: [k, r.inherit(r.TITLE_MODE, {
          begin: m,
          className: "title.function"
        })]
      }, { match: /\.\.\./, relevance: 0 }, fe, {
        match: "\\$" + m,
        relevance: 0
      }, {
        match: [/\bconstructor(?=\s*\()/],
        className: { 1: "title.function" },
        contains: [k]
      }, L, {
        relevance: 0,
        match: /\b[A-Z][A-Z_0-9]+\b/,
        className: "variable.constant"
      }, A, Y, { match: /\$[(.]/ }]
    };
  };
})();
Oe.registerLanguage("javascript", Rt);
let be = {};
const Ct = {
  name: "NodeComplex",
  inheritAttrs: !1,
  emits: ["show", "open", "toggle", "focus", "openParent", "forget"],
  props: {
    // ref
    root: void 0,
    rootId: [String, Number],
    // options
    modelValue: void 0,
    name: [String, Number],
    openLevel: [Number, Array],
    openSpecific: Array,
    longText: Number,
    escapeQuotes: Boolean,
    deep: Boolean,
    watch: Boolean,
    preview: [Boolean, Number],
    previewInitial: Boolean,
    focus: [String, Number],
    arrow: String,
    delimiter: String,
    more: String,
    save: Boolean,
    saveFocus: Boolean,
    // helpers
    shared: Object,
    type: String,
    parentType: String,
    parentOpen: Boolean,
    pointer: { type: [String, Number], default: "" },
    level: { type: Number, default: 0 },
    size: Number,
    position: Number,
    // functions
    escapeQuotesFn: Function,
    isPrimitiveFn: Function,
    getTypeFn: Function,
    unwrapSpecificFn: Function,
    emitFn: Function
  },
  data() {
    return {
      id: this.getId(),
      hideTimes: 0,
      open: !1,
      expanded: !1,
      items: [],
      getMapSet: {},
      getSize: 0,
      useOpenLevel: this.openLevel,
      useOpenSpecific: this.openSpecific,
      originalOpenLevel: this.openLevel,
      askForget: !1,
      cleared: !1,
      hover: !1,
      unwatch: () => {
      }
    };
  },
  mounted() {
    this.showEmit();
  },
  created() {
    this.expanded = this.allowPreview, this.items = this.makeItems(), this.watch && (this.unwatch = this.watchModelValue(this.deep)), this.useOpenSpecific = this.openSpecific;
  },
  methods: {
    showEmit() {
      return this.emit("show", {
        pointer: this.pointer,
        focusElement: this.$refs.focusElement,
        type: "complex"
      }), !0;
    },
    getAllPointer(e) {
      let t = "*";
      if (e = String(e), e in be)
        t = be[e];
      else {
        const i = e.split(this.delimiter);
        i.pop(), i.length && (t = i.join(this.delimiter) + this.delimiter + "*"), be[e] = t;
      }
      return t;
    },
    forget() {
      this.emitFn(this, "forget", { askForget: this.askForget }), this.askForget = !1, this.cleared = !0, setTimeout(() => this.cleared = !1, 1e3);
    },
    openParent() {
      this.open || this.toggleOpen(null, !0);
    },
    getId() {
      return this.level === 0 ? `_${this.rootId}` : `_${this.rootId}${this.delimiter}${this.pointer}`;
    },
    watchModelValue(e) {
      return this.$watch(
        "modelValue",
        () => {
          this.items = this.makeItems();
        },
        { deep: e }
      );
    },
    getPointer(e) {
      return this.pointer ? this.pointer + this.delimiter + e : String(e);
    },
    getSpecialType(e) {
      return this.isMapSet ? this.getTypeFn(this.getMapSet[e]) : this.getTypeFn(this.modelValue[e]);
    },
    getModelValue(e) {
      return this.isMapSet ? this.getMapSet[e] : this.modelValue[e];
    },
    // prevent select on double click
    preventSelect(e) {
      e.detail > 1 && e.preventDefault();
    },
    /**
     * Get the name of key of an object or array
     * If it is an array, those keys are not named
     * @param key
     * @returns {string|*}
     */
    getName(e) {
      return this.isArray ? "" : e;
    },
    expand() {
      this.open || this.toggleOpen(null, !0), this.expanded = !0;
    },
    toggleOpen(e, t) {
      const i = t === void 0 ? !this.open : t;
      this.setOpen(i, { user: !0 }), this.expanded = this.allowPreview, this.open && this.$emit("openParent"), this.emit("toggle", {
        event: e,
        open: this.open,
        level: this.level,
        pointer: this.pointer
      });
    },
    emit(e, ...t) {
      this.emitFn(this, e, ...t);
    },
    makeItems() {
      switch (!0) {
        case this.isObject:
          let e = [], t = 0;
          switch (!0) {
            case this.isSet:
              this.getMapSet = Array.from(this.modelValue), e = [...Array(this.getMapSet.length).keys()], this.getSize = this.getMapSet.length;
              break;
            case this.isMap:
              this.modelValue.forEach((i, o) => {
                this.getMapSet[o] = i, e[t] = o, t++;
              }), this.getSize = t;
              break;
            default:
              for (let i in this.modelValue)
                e[t] = i, t++;
              this.getSize = t;
          }
          return e;
        case this.isArray:
          return this.getSize = this.modelValue.length, [...Array(this.modelValue.length).keys()];
        default:
          return this.modelValue;
      }
    },
    parentIsOpen() {
      return this.$parent.$options.name === "NodeComplex" && this.$parent.open || this.$parent.$options.name === "VueDd";
    },
    focusEmit() {
      this.emit("focus", {
        pointer: this.pointer,
        focusElement: this.$refs.focusElement
      });
    },
    setOpen(e, { user: t }) {
      this.open = e, this.emit("open", {
        open: this.open,
        level: this.level,
        pointer: this.pointer,
        user: t
      });
    }
  },
  computed: {
    parentIsArray() {
      return this.parentType === "array";
    },
    unwrapSpecific() {
      return this.unwrapSpecificFn(this.openSpecific);
    },
    allowPreview() {
      return !this.previewInitial && this.level === 0 ? !1 : this.preview;
    },
    isMap() {
      return this.isObject && this.modelValue instanceof Map;
    },
    isSet() {
      return this.isObject && this.modelValue instanceof Set;
    },
    isMapSet() {
      return this.isMap || this.isSet;
    },
    instanceOf() {
      const e = this.isObject && "constructor" in this.modelValue && "name" in this.modelValue.constructor ? this.modelValue.constructor.name : "";
      return e === "Object" ? "" : e;
    },
    nextLevel() {
      return this.level + 1;
    },
    charClass() {
      return this.isObject ? "vue-dd-obj-char" : "vue-dd-arr-char";
    },
    charOpen() {
      return this.isObject ? "{" : "[";
    },
    charClose() {
      return this.isObject ? "}" : "]";
    },
    functionInlinePreview() {
      const e = this.items.toString().length, t = 100;
      return e > t ? this.items.toString().substring(0, t) + "...}" : this.items.toString();
    },
    functionInline() {
      let e = this.modelValue.toString();
      switch (!0) {
        case e.startsWith("function "):
          e = e.substring(9).trim(), e.startsWith(this.name) && (e = e.substring(this.name.length));
          break;
        case e.startsWith("()"):
          e = "(){...}";
          break;
        case e.startsWith(this.name):
          e = e.substring(this.name.length);
          break;
      }
      const t = 25;
      return e.length > t && (e = e.substring(0, t) + "..."), e;
    },
    functionName() {
      let e = String(this.items);
      const t = e.indexOf(`
`);
      return t >= 0 && (e = e.substring(0, t)), Oe.highlight(e, { language: "javascript" }).value;
    },
    functionContent() {
      let e = String(this.items).trim().split(`
`);
      if (e.length) {
        const t = e.length - 1, i = e[t].indexOf("}");
        e = e.map((n) => n.substring(i)), e.shift();
        const o = e.join(`
`);
        return Oe.highlight(o, { language: "javascript" }).value;
      }
      return "";
    },
    shouldComma() {
      return this.size && this.position && this.position !== this.size;
    },
    longTextInline() {
      let e = this.modelValue.toString().substring(0, this.longText);
      return e = this.escapeQuotesFn(e), e = `"${e}..."`, e;
    },
    longTextContent() {
      let e = this.modelValue;
      return e = this.escapeQuotesFn(e), e = `"${e}"`, e;
    },
    isLongText() {
      return this.type === "longtext";
    },
    isRefReactive() {
      return this.isRef || this.isReactive;
    },
    isIterable() {
      return this.isArray || this.isObject;
    },
    isArray() {
      return this.type === "array";
    },
    isObject() {
      return this.type === "object";
    },
    isFunction() {
      return this.type === "function";
    },
    isPromise() {
      return lt(this.modelValue);
    },
    isReactive() {
      return Ue(this.modelValue);
    },
    isRef() {
      return je(this.modelValue);
    },
    isFocused() {
      return String(this.pointer) === String(this.focus);
    },
    showName() {
      return !this.parentIsArray && this.nameString || this.parentIsArray && this.parentOpen;
    },
    nameString() {
      return String(this.name);
    }
  },
  watch: {
    // opens levels
    openLevel: {
      handler(e) {
        if (typeof this.openLevel == "number" && this.level < this.openLevel && this.setOpen(!0, { user: !1 }), this.getTypeFn(this.openLevel) === "array")
          for (let t = 0; t < this.openLevel.length; t++)
            this.level === parseInt(this.openLevel[t]) && this.setOpen(!0, { user: !1 });
      },
      immediate: !0
    },
    // opens specific pointers
    unwrapSpecific: {
      handler(e) {
        if (this.openSpecific.length && typeof this.pointer < "u" && this.pointer !== null) {
          let t = this.getAllPointer(this.pointer);
          if (this.pointer in e || t in e) {
            if (this.pointer in this.shared.hiddenPointers)
              return;
            this.$nextTick(() => {
              this.parentIsOpen() && this.setOpen(!0, { user: !1 });
            });
          }
        }
      },
      immediate: !0
    },
    // fires events on open and closing
    open: {
      handler(e, t) {
        if (e)
          this.items = this.makeItems(), this.useOpenLevel = this.openLevel, this.useOpenSpecific = this.openSpecific;
        else {
          const i = () => {
            this.useOpenLevel = 0, this.useOpenSpecific = [];
          };
          this.hideTimes === 0 ? i() : setTimeout(() => i(), 1), this.hideTimes++;
        }
      },
      immediate: !0
    },
    // expand previews
    preview(e) {
      this.expanded = e, this.setOpen(!!(this.open && e), { user: !1 });
    }
  },
  components: {
    NodePrimitive: Be
  }
}, Pt = ["id"], jt = { class: "vue-dd-start" }, Bt = ["innerHTML"], Vt = {
  key: 0,
  class: "vue-dd-colon"
}, zt = ["innerHTML"], Ht = {
  key: 0,
  class: "vue-dd-comma"
}, Dt = ["innerHTML"], Qt = {
  key: 7,
  class: "vue-dd-instance"
}, Ut = { key: 0 }, Zt = { key: 1 }, Wt = { key: 11 }, Kt = {
  key: 12,
  class: "vue-dd-forget-cleared"
}, Gt = ["innerHTML"], Xt = {
  key: 2,
  class: "vue-dd-promise-content"
}, qt = ["innerHTML"], Jt = { key: 4 }, Yt = {
  key: 5,
  class: "vue-dd-f-content"
}, $t = { key: 0 }, en = ["innerHTML"], tn = {
  key: 0,
  class: "vue-dd-comma"
}, nn = { key: 1 }, sn = ["innerHTML"], rn = {
  key: 0,
  class: "vue-dd-comma"
}, on = {
  key: 6,
  class: "vue-dd-string"
}, an = { key: 0 }, ln = {
  key: 0,
  class: "vue-dd-comma"
}, cn = { key: 1 }, un = {
  key: 0,
  class: "vue-dd-comma"
}, dn = ["innerHTML"], hn = ["innerHTML"], gn = {
  key: 9,
  class: "vue-dd-comma"
};
function pn(e, t, i, o, s, n) {
  const l = de("node-primitive"), a = de("node-complex", !0);
  return d(), h("div", {
    id: s.id,
    class: R({ "vue-dd-body": !0, "vue-dd-box-inline": !s.open })
  }, [
    j("div", jt, [
      j("button", {
        onClick: t[0] || (t[0] = (...r) => n.toggleOpen && n.toggleOpen(...r)),
        class: R(["vue-dd-arrow", { "vue-dd-arrow-collapsed": !s.open }]),
        innerHTML: i.arrow
      }, null, 10, Bt),
      n.showName ? (d(), h("span", {
        key: 0,
        onClick: t[1] || (t[1] = (...r) => n.toggleOpen && n.toggleOpen(...r)),
        onMousedown: t[2] || (t[2] = (r) => n.preventSelect(r)),
        class: R(["vue-dd-name", {
          "vue-dd-f-name": n.isFunction,
          "vue-dd-key-of-array": n.parentIsArray
        }])
      }, [
        ue(C(i.name), 1),
        i.level !== 0 ? (d(), h("span", Vt, ":")) : b("", !0)
      ], 34)) : b("", !0),
      s.open && i.saveFocus ? (d(), h("span", {
        key: 1,
        ref: "focusElement",
        class: R(["vue-dd-focus vue-dd-icon-eye", {
          "vue-dd-focus-hover": s.hover,
          "vue-dd-focus-selected": n.isFocused
        }]),
        onClick: t[3] || (t[3] = (...r) => n.focusEmit && n.focusEmit(...r)),
        onMouseenter: t[4] || (t[4] = (r) => s.hover = !0),
        onMouseup: t[5] || (t[5] = (r) => s.hover = !1),
        onMouseleave: t[6] || (t[6] = (r) => s.hover = !1)
      }, null, 34)) : b("", !0),
      n.isIterable && n.isReactive ? (d(), h("span", {
        key: 2,
        onClick: t[7] || (t[7] = (...r) => n.toggleOpen && n.toggleOpen(...r)),
        onMousedown: t[8] || (t[8] = (r) => n.preventSelect(r)),
        class: "vue-dd-r",
        title: "Reactive"
      }, "R", 32)) : n.isIterable && n.isRef ? (d(), h("span", {
        key: 3,
        onClick: t[9] || (t[9] = (...r) => n.toggleOpen && n.toggleOpen(...r)),
        onMousedown: t[10] || (t[10] = (r) => n.preventSelect(r)),
        class: "vue-dd-ref",
        title: "Ref"
      }, "Ref", 32)) : n.isFunction ? (d(), h("span", {
        key: 4,
        onClick: t[11] || (t[11] = (...r) => n.toggleOpen && n.toggleOpen(...r)),
        onMousedown: t[12] || (t[12] = (r) => n.preventSelect(r)),
        class: "vue-dd-f",
        title: "Function"
      }, "f", 32)) : b("", !0),
      n.isFunction && s.open ? (d(), h("pre", {
        key: 5,
        onClick: t[13] || (t[13] = (...r) => n.toggleOpen && n.toggleOpen(...r)),
        class: "vue-dd-f-start"
      }, [
        j("span", { innerHTML: n.functionName }, null, 8, zt),
        n.shouldComma && !s.open ? (d(), h("span", Ht, ",")) : b("", !0)
      ])) : b("", !0),
      n.isIterable && s.open ? (d(), h("span", {
        key: 6,
        onClick: t[14] || (t[14] = (...r) => n.toggleOpen && n.toggleOpen(...r)),
        onMousedown: t[15] || (t[15] = (r) => n.preventSelect(r)),
        class: R(n.charClass),
        innerHTML: n.charOpen
      }, null, 42, Dt)) : b("", !0),
      n.isIterable && s.open && n.instanceOf ? (d(), h("span", Qt, C(n.instanceOf), 1)) : b("", !0),
      n.isIterable && s.open && s.getSize ? (d(), h("span", {
        key: 8,
        onClick: t[16] || (t[16] = (...r) => n.toggleOpen && n.toggleOpen(...r)),
        onMousedown: t[17] || (t[17] = (r) => n.preventSelect(r)),
        class: "vue-dd-size"
      }, C(s.getSize), 33)) : b("", !0),
      n.isIterable && n.isPromise && !s.open ? (d(), h("span", {
        key: 9,
        onClick: t[18] || (t[18] = (...r) => n.toggleOpen && n.toggleOpen(...r)),
        onMousedown: t[19] || (t[19] = (r) => n.preventSelect(r)),
        class: "vue-dd-instance vue-dd-promise-prototype"
      }, "Promise", 32)) : b("", !0),
      s.open && i.level === 0 && i.save && !s.cleared ? (d(), h("span", {
        key: 10,
        onClick: t[20] || (t[20] = (r) => s.askForget = !0),
        class: R(["vue-dd-forget vue-dd-forget-q", { "vue-dd-forget-q-ask": s.askForget }])
      }, [
        s.askForget ? (d(), h("span", Ut, "clear save?")) : (d(), h("span", Zt, "forget"))
      ], 2)) : b("", !0),
      s.askForget ? (d(), h("span", Wt, [
        j("span", {
          class: "vue-dd-forget vue-dd-forget-yes",
          onClick: t[21] || (t[21] = (...r) => n.forget && n.forget(...r))
        }, "yes"),
        j("span", {
          class: "vue-dd-forget vue-dd-forget-no",
          onClick: t[22] || (t[22] = (r) => s.askForget = !1)
        }, "no")
      ])) : b("", !0),
      s.cleared ? (d(), h("span", Kt, " cleared ")) : b("", !0)
    ]),
    j("div", {
      class: R({
        "vue-dd-box": s.open,
        "vue-dd-box-inline": !s.open,
        "vue-dd-box-complex": !0
      })
    }, [
      j("div", null, [
        n.isIterable && !s.open ? (d(), h("span", {
          key: 0,
          class: R(n.charClass),
          innerHTML: n.charOpen
        }, null, 10, Gt)) : b("", !0),
        n.isIterable && n.allowPreview && !s.open && s.getSize ? (d(), h("span", {
          key: 1,
          onClick: t[23] || (t[23] = (...r) => n.toggleOpen && n.toggleOpen(...r)),
          onMousedown: t[24] || (t[24] = (r) => n.preventSelect(r)),
          class: "vue-dd-size"
        }, C(s.getSize), 33)) : b("", !0),
        n.isIterable && n.isPromise ? (d(), h("span", Xt, "<pending>")) : b("", !0),
        n.isIterable && !s.open && !n.allowPreview ? (d(), h("button", {
          key: 3,
          onClick: t[25] || (t[25] = (...r) => n.expand && n.expand(...r)),
          class: "vue-dd-expand",
          innerHTML: i.more
        }, null, 8, qt)) : b("", !0),
        n.isIterable && (s.open || s.expanded) ? (d(), h("div", Jt, [
          (d(!0), h(Ze, null, We(s.open ? s.items.length : n.allowPreview < s.items.length ? n.allowPreview : s.items.length, (r) => (d(), h("div", { key: r }, [
            j("div", null, [
              i.isPrimitiveFn(n.getSpecialType(s.items[r - 1])) ? (d(), he(l, {
                key: 0,
                root: i.root,
                rootId: i.rootId,
                modelValue: n.getModelValue(s.items[r - 1]),
                name: s.items[r - 1],
                escapeQuotes: i.escapeQuotes,
                focus: i.focus,
                save: i.save,
                saveFocus: i.saveFocus,
                delimiter: i.delimiter,
                pointer: n.getPointer(s.items[r - 1]),
                parentOpen: s.open,
                type: n.getSpecialType(s.items[r - 1]),
                parentType: i.type,
                size: s.getSize,
                position: r,
                expanded: s.expanded,
                escapeQuotesFn: i.escapeQuotesFn,
                emitFn: i.emitFn,
                onOpenParent: n.openParent
              }, null, 8, ["root", "rootId", "modelValue", "name", "escapeQuotes", "focus", "save", "saveFocus", "delimiter", "pointer", "parentOpen", "type", "parentType", "size", "position", "expanded", "escapeQuotesFn", "emitFn", "onOpenParent"])) : (d(), he(a, {
                key: 1,
                root: i.root,
                rootId: i.rootId,
                modelValue: n.getModelValue(s.items[r - 1]),
                name: s.items[r - 1],
                deep: n.isRef ? !1 : i.deep,
                watch: i.watch,
                preview: s.open ? i.preview : !1,
                openLevel: s.useOpenLevel,
                openSpecific: s.useOpenSpecific,
                longText: i.longText,
                escapeQuotes: i.escapeQuotes,
                focus: i.focus,
                save: i.save,
                saveFocus: i.saveFocus,
                delimiter: i.delimiter,
                more: i.more,
                arrow: i.arrow,
                pointer: n.getPointer(s.items[r - 1]),
                parentType: i.type,
                parentOpen: s.open,
                type: n.getSpecialType(s.items[r - 1]),
                shared: i.shared,
                level: i.level + 1,
                size: s.getSize,
                position: r,
                escapeQuotesFn: i.escapeQuotesFn,
                getTypeFn: i.getTypeFn,
                isPrimitiveFn: i.isPrimitiveFn,
                unwrapSpecificFn: i.unwrapSpecificFn,
                emitFn: i.emitFn,
                onOpenParent: n.openParent
              }, null, 8, ["root", "rootId", "modelValue", "name", "deep", "watch", "preview", "openLevel", "openSpecific", "longText", "escapeQuotes", "focus", "save", "saveFocus", "delimiter", "more", "arrow", "pointer", "parentType", "parentOpen", "type", "shared", "level", "size", "position", "escapeQuotesFn", "getTypeFn", "isPrimitiveFn", "unwrapSpecificFn", "emitFn", "onOpenParent"]))
            ])
          ]))), 128))
        ])) : b("", !0),
        n.isFunction ? (d(), h("div", Yt, [
          s.open && n.functionContent ? (d(), h("pre", $t, [
            j("span", { innerHTML: n.functionContent }, null, 8, en),
            n.shouldComma ? (d(), h("span", tn, ",")) : b("", !0)
          ])) : s.open && !n.functionContent ? (d(), h("span", nn)) : (d(), h("span", {
            key: 2,
            onClick: t[26] || (t[26] = (...r) => n.toggleOpen && n.toggleOpen(...r)),
            class: "vue-dd-f-inline"
          }, [
            j("span", {
              innerHTML: n.allowPreview ? n.functionInlinePreview : n.functionInline
            }, null, 8, sn),
            n.shouldComma ? (d(), h("span", rn, ",")) : b("", !0)
          ]))
        ])) : b("", !0),
        n.isLongText ? (d(), h("div", on, [
          s.open ? (d(), h("span", an, [
            ue(C(n.longTextContent), 1),
            n.shouldComma ? (d(), h("span", ln, ",")) : b("", !0)
          ])) : (d(), h("span", cn, [
            ue(C(n.longTextInline), 1),
            n.shouldComma ? (d(), h("span", un, ",")) : b("", !0)
          ]))
        ])) : b("", !0),
        n.isIterable && !s.open && n.allowPreview !== !1 && i.preview < s.items.length ? (d(), h("button", {
          key: 7,
          onClick: t[27] || (t[27] = (...r) => n.expand && n.expand(...r)),
          class: "vue-dd-expand",
          innerHTML: i.more
        }, null, 8, dn)) : b("", !0),
        n.isIterable ? (d(), h("span", {
          key: 8,
          class: R(n.charClass),
          innerHTML: n.charClose
        }, null, 10, hn)) : b("", !0),
        n.isIterable && n.shouldComma ? (d(), h("span", gn, ",")) : b("", !0)
      ])
    ], 2)
  ], 10, Pt);
}
const fn = /* @__PURE__ */ ge(Ct, [["render", pn]]);
let we = {};
const mn = Ke({
  name: "VueDd",
  inheritAttrs: !1,
  emits: ["open", "toggle", "focus", "show"],
  props: {
    // main options
    /**
     * modelValue
     */
    modelValue: { type: void 0, required: !0 },
    id: { type: [String, Number], default: "" },
    name: { type: String, default: "" },
    openLevel: { type: [Number, String, Array], default: 0 },
    openSpecific: { type: Array, default: () => [] },
    focus: { type: [String, Number], default: null },
    focusSticky: { type: Boolean, default: !1 },
    focusOffsetX: { type: Number, default: -35 },
    focusOffsetY: { type: Number, default: -15 },
    focusDelay: { type: Number, default: 30 },
    preview: { type: [Number, Boolean], default: 5 },
    previewInitial: { type: Boolean, default: !0 },
    escapeQuotes: { type: Boolean, default: !1 },
    longText: { type: Number, default: 50 },
    delimiter: { type: String, default: "." },
    more: { type: String, default: "..." },
    // styling options
    arrow: { type: String, default: "&#x25BC;" },
    inline: { type: Boolean, default: !0 },
    dark: { type: Boolean, default: !0 },
    fontFamily: { type: String, default: '"JetBrains Mono", "Courier", serif' },
    fontSize: { type: String, default: ".7rem" },
    lineHeight: { type: String, default: "1rem" },
    paddingLeft: { type: String, default: ".7rem" },
    maxHeight: { type: String, default: "500px" },
    maxWidth: { type: String, default: "100%" },
    // save
    save: { type: Boolean, default: !1 },
    saveFocus: { type: Boolean, default: !0 },
    storage: { type: String, default: "session" },
    // session | local
    // watch options
    watch: { type: Boolean, default: !0 },
    deep: { type: Boolean, default: !0 }
  },
  data() {
    return {
      rootId: ut(this.id, this.name, window),
      openClass: !1,
      css: this.class,
      useOpenSpecific: this.openSpecific,
      // if openLevel is string, convert to number int
      useOpenLevel: typeof this.openLevel == "string" ? parseInt(this.openLevel) : this.openLevel,
      memory: null,
      shared: {
        hiddenPointers: {}
        // must be defined as empty
      },
      setFocusAlready: !1,
      useFocus: null
    };
  },
  created() {
    (this.save || this.saveFocus) && this.initMemory(), this.useFocus = this.getFocus(), this.useOpenSpecific = this.getOpenSpecific();
  },
  mounted() {
  },
  computed: {
    cssVars() {
      return {
        "--vue-dd-fontFamily": this.fontFamily,
        "--vue-dd-fontSize": this.fontSize,
        "--vue-dd-lineHeight": this.lineHeight,
        "--vue-dd-paddingLeft": this.paddingLeft,
        "--vue-dd-maxHeight": this.maxHeight,
        "--vue-dd-maxWidth": this.maxWidth
      };
    },
    unwrapSpecific() {
      return this.unwrapSpecificFn(this.useOpenSpecific);
    },
    type() {
      return this.getTypeFn(this.modelValue);
    },
    primitive() {
      return this.isPrimitiveFn(this.type);
    },
    isSet() {
      return this.type === "object" && this.modelValue instanceof Set;
    },
    isRef() {
      return je(this.modelValue);
    }
  },
  methods: {
    forget() {
      this.save && typeof this.memory == "object" && (this.memory.open = {}, this.shared.hiddenPointers = {}, this.useOpenSpecific = this.baseOpenSpecific(), this.store().set(this.memory));
    },
    setFocus() {
      if (this.saveFocus && this.useFocus !== null) {
        let e = !0;
        this.setFocusAlready && (e = !1), this.focusSticky && (e = !0), e && setTimeout(() => {
          const t = this.getElement(this.useFocus);
          t && (this.$refs.root.scrollLeft = t.offsetLeft + this.focusOffsetX, this.$refs.root.scrollTop = t.offsetTop + this.focusOffsetY, t.classList.add("vue-dd-highlight"), this.setFocusAlready = !0);
        }, this.focusDelay);
      }
    },
    getElement(e) {
      e = e === "" ? "" : `${this.delimiter}${e}`;
      const t = `_${this.rootId}${e}`;
      return document.getElementById(t);
    },
    getFocus() {
      let e = this.focus;
      return this.saveFocus && "focus" in this.memory && this.memory.focus !== null && (e = String(this.memory.focus)), e;
    },
    initMemory() {
      this.memory = this.store().get(), Ne(this.memory) || (this.memory = {}), (!("open" in this.memory) || !Ne(this.memory.open)) && (this.memory.open = {}), "focus" in this.memory || (this.memory.focus = null);
    },
    getOpenSpecific() {
      if (this.save) {
        this.memory.open = { ...this.memory.open, ...this.unwrapSpecific }, this.store().set(this.memory);
        let e = [];
        for (let t in this.memory.open)
          e.push(String(t));
        return e;
      } else
        return this.baseOpenSpecific();
    },
    baseOpenSpecific() {
      return [...this.openSpecific, ...this.useFocus === null ? [] : [String(this.useFocus)]];
    },
    focusEmit(e) {
      let { pointer: t, focusElement: i } = e;
      if (this.saveFocus) {
        const o = this.useFocus;
        if (String(t) === String(o) && String(t) !== String(this.focus))
          delete this.memory.open[t], t = null, i.classList.remove("vue-dd-focus-selected");
        else {
          delete this.memory.open[o];
          const s = this.getElement(o);
          if (s) {
            const n = s.querySelector(".vue-dd-focus");
            n && n.classList.remove("vue-dd-focus-selected");
          }
          i.classList.add("vue-dd-focus-selected");
        }
        this.memory.focus = t === null ? this.focus : t, this.store().set(this.memory), this.useFocus = this.memory.focus, this.emitFn(this, "focus", { focus: this.memory.focus, focusElement: i });
      }
    },
    showEmit(e) {
      let { type: t, pointer: i, focusElement: o } = e;
      this.emitFn(this, "show", e), this.saveFocus && this.useFocus === i && this.setFocus();
    },
    open(e) {
      const { open: t, pointer: i, level: o, user: s } = e;
      o === 0 && (this.openClass = t), this.$emit("open", e);
    },
    toggle(e) {
      const { event: t, open: i, pointer: o, level: s } = e;
      if (this.save) {
        if (i)
          delete this.shared.hiddenPointers[o], this.useOpenSpecific.push(o), this.memory.open[o] = !0;
        else {
          this.shared.hiddenPointers[o] = !0;
          const n = this.useOpenSpecific.indexOf(o);
          n >= 0 && delete this.useOpenSpecific[n], delete this.memory.open[o];
        }
        this.store().set(this.memory);
      }
      this.$emit("toggle", e);
    },
    store() {
      const e = "vue-dd." + this.rootId;
      return {
        get: () => {
          try {
            return JSON.parse(window[`${this.storage}Storage`].getItem(e));
          } catch {
          }
        },
        set: (t) => window[`${this.storage}Storage`].setItem(e, JSON.stringify(t))
      };
    },
    getTypeFn(e) {
      let t = typeof e;
      return t === "object" ? e === null ? "null" : Array.isArray(e) ? "array" : "object" : (t === "string" && e.length > this.longText && (t = "longtext"), t);
    },
    isPrimitiveFn(e) {
      return !(e === "array" || e === "object" || e === "function" || e === "longtext");
    },
    escapeQuotesFn(e) {
      return this.escapeQuotes ? e.replaceAll('"', '\\"') : e;
    },
    unwrapSpecificFn(e) {
      let t = {};
      if (e.length) {
        const i = e;
        if (i in we)
          return we[i];
        e.forEach((o) => {
          const s = String(o).split(this.delimiter);
          let n = "", l = 0;
          for (let a in s)
            n += (l > 0 ? this.delimiter : "") + s[a], t[n] = !0, l++;
          l > 0 && (t[""] = !0);
        }), this.useFocus !== null && (t[this.useFocus] = !0), we[i] = t;
      }
      return t;
    },
    // recursive emit
    // more info: https://stackoverflow.com/a/55650245/1502706
    emitFn(e, t, ...i) {
      for (; e && !(e.$options.name !== "VueDd" && e.$options.name !== "NodeComplex" && e.$options.name !== "NodePrimitive"); )
        e.$emit(t, ...i), e = e.$parent;
    }
  },
  watch: {
    modelValue: {
      handler(e, t) {
        this.focusSticky && e !== t && this.setFocus();
      }
    }
  },
  components: {
    NodeComplex: fn,
    NodePrimitive: Be
  }
});
const yn = ["id"];
function vn(e, t, i, o, s, n) {
  const l = de("node-primitive"), a = de("node-complex");
  return d(), h("div", {
    ref: "root",
    id: e.rootId,
    class: R(["vue-dd", {
      "vue-dd-inline": e.inline,
      "vue-dd-open": e.openClass,
      "vue-dd-dark": e.dark
    }, e.$attrs.class]),
    style: Ge([e.cssVars, e.$attrs.style])
  }, [
    e.primitive ? (d(), he(l, {
      key: 0,
      root: e.$refs.root,
      rootId: e.rootId,
      modelValue: e.modelValue,
      name: e.name,
      focus: e.useFocus,
      escapeQuotes: e.escapeQuotes,
      save: e.save,
      saveFocus: e.saveFocus,
      delimiter: e.delimiter,
      pointer: "",
      type: e.type,
      parentOpen: !1,
      parentType: "",
      escapeQuotesFn: e.escapeQuotesFn,
      emitFn: e.emitFn,
      onFocus: e.focusEmit,
      onShow: e.showEmit
    }, null, 8, ["root", "rootId", "modelValue", "name", "focus", "escapeQuotes", "save", "saveFocus", "delimiter", "type", "escapeQuotesFn", "emitFn", "onFocus", "onShow"])) : (d(), he(a, {
      key: 1,
      root: e.$refs.root,
      rootId: e.rootId,
      modelValue: e.modelValue,
      name: e.name,
      openLevel: e.useOpenLevel,
      openSpecific: e.useOpenSpecific,
      focus: e.useFocus,
      escapeQuotes: e.escapeQuotes,
      longText: e.longText,
      preview: e.preview,
      previewInitial: e.previewInitial,
      deep: e.isRef ? !0 : e.deep,
      watch: e.watch,
      save: e.save,
      saveFocus: e.saveFocus,
      arrow: e.arrow,
      delimiter: e.delimiter,
      more: e.more,
      pointer: "",
      type: e.type,
      parentType: "",
      parentOpen: !1,
      shared: e.shared,
      getTypeFn: e.getTypeFn,
      isPrimitiveFn: e.isPrimitiveFn,
      escapeQuotesFn: e.escapeQuotesFn,
      unwrapSpecificFn: e.unwrapSpecificFn,
      emitFn: e.emitFn,
      onShow: e.showEmit,
      onToggle: e.toggle,
      onOpen: e.open,
      onFocus: e.focusEmit,
      onForget: e.forget
    }, null, 8, ["root", "rootId", "modelValue", "name", "openLevel", "openSpecific", "focus", "escapeQuotes", "longText", "preview", "previewInitial", "deep", "watch", "save", "saveFocus", "arrow", "delimiter", "more", "type", "shared", "getTypeFn", "isPrimitiveFn", "escapeQuotesFn", "unwrapSpecificFn", "emitFn", "onShow", "onToggle", "onOpen", "onFocus", "onForget"]))
  ], 14, yn);
}
const bn = /* @__PURE__ */ ge(mn, [["render", vn]]), wn = {};
function Sn(e, t) {
  return d(), h("div", null, "Hello world");
}
const En = /* @__PURE__ */ ge(wn, [["render", Sn]]);
function On(e) {
  e.component("VueDd", bn), e.component("XRay", En);
}
export {
  bn as VueDd,
  En as XRay,
  On as install
};
