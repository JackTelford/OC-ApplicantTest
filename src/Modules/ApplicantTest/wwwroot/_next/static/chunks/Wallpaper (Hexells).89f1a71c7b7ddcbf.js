!(function () {
    var e,
        t,
        n,
        r,
        o,
        i,
        u,
        c,
        f = {
            76631: function (e, t, n) {
                "use strict";
                n(6484);
                let r = "/System/Hexells",
                    o = [`${r}/twgl.min.js`, `${r}/UPNG.min.js`, `${r}/ca.js`, `${r}/demo.js`];
                globalThis.addEventListener(
                    "message",
                    ({ data: e }) => {
                        if ("undefined" != typeof WebGLRenderingContext) {
                            if ("init" === e) globalThis.importScripts(...o);
                            else if (e instanceof DOMRect) globalThis.demoCanvasRect = e;
                            else {
                                let { canvas: t, devicePixelRatio: n } = e;
                                globalThis.devicePixelRatio = n;
                                try {
                                    globalThis.Hexells = new globalThis.Demo(t, r);
                                } catch (e) {
                                    globalThis.postMessage({ message: e?.message, type: "[error]" });
                                }
                            }
                        }
                    },
                    { passive: !0 }
                );
            },
        },
        s = {};
    function a(e) {
        var t = s[e];
        if (void 0 !== t) return t.exports;
        var n = (s[e] = { exports: {} }),
            r = !0;
        try {
            f[e](n, n.exports, a), (r = !1);
        } finally {
            r && delete s[e];
        }
        return n.exports;
    }
    (a.m = f),
        (a.x = function () {
            var e = a.O(void 0, [9774, 8764, 6484], function () {
                return a(76631);
            });
            return a.O(e);
        }),
        (e = []),
        (a.O = function (t, n, r, o) {
            if (n) {
                o = o || 0;
                for (var i = e.length; i > 0 && e[i - 1][2] > o; i--) e[i] = e[i - 1];
                e[i] = [n, r, o];
                return;
            }
            for (var u = 1 / 0, i = 0; i < e.length; i++) {
                for (var n = e[i][0], r = e[i][1], o = e[i][2], c = !0, f = 0; f < n.length; f++)
                    u >= o &&
                        Object.keys(a.O).every(function (e) {
                            return a.O[e](n[f]);
                        })
                        ? n.splice(f--, 1)
                        : ((c = !1), o < u && (u = o));
                if (c) {
                    e.splice(i--, 1);
                    var s = r();
                    void 0 !== s && (t = s);
                }
            }
            return t;
        }),
        (a.n = function (e) {
            var t =
                e && e.__esModule
                    ? function () {
                        return e.default;
                    }
                    : function () {
                        return e;
                    };
            return a.d(t, { a: t }), t;
        }),
        (n = Object.getPrototypeOf
            ? function (e) {
                return Object.getPrototypeOf(e);
            }
            : function (e) {
                return e.__proto__;
            }),
        (a.t = function (e, r) {
            if ((1 & r && (e = this(e)), 8 & r || ("object" == typeof e && e && ((4 & r && e.__esModule) || (16 & r && "function" == typeof e.then))))) return e;
            var o = Object.create(null);
            a.r(o);
            var i = {};
            t = t || [null, n({}), n([]), n(n)];
            for (var u = 2 & r && e; "object" == typeof u && !~t.indexOf(u); u = n(u))
                Object.getOwnPropertyNames(u).forEach(function (t) {
                    i[t] = function () {
                        return e[t];
                    };
                });
            return (
                (i.default = function () {
                    return e;
                }),
                a.d(o, i),
                o
            );
        }),
        (a.d = function (e, t) {
            for (var n in t) a.o(t, n) && !a.o(e, n) && Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        }),
        (a.f = {}),
        (a.e = function (e, t) {
            return Promise.all(
                Object.keys(a.f).reduce(function (n, r) {
                    return a.f[r](e, n, t), n;
                }, [])
            );
        }),
        (a.u = function (e) {
            return 9774 === e
                ? "static/chunks/framework-0e8d27528ba61906.js"
                : "static/chunks/" +
                e +
                "." +
                { 1746: "3496221204efbb6d", 2856: "50d31e48653ca6eb", 3301: "78d33a88d00cad8c", 3545: "43ce7300fb661fca", 6484: "8f7f4d178c849bcc", 8090: "2ca02e936e27bfb7", 8764: "8a312e40ee9b2797", 9762: "2a775218fadae715" }[e] +
                ".js";
        }),
        (a.miniCssF = function (e) { }),
        (a.g = (function () {
            if ("object" == typeof globalThis) return globalThis;
            try {
                return this || Function("return this")();
            } catch (e) {
                if ("object" == typeof window) return window;
            }
        })()),
        (a.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }),
        (a.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
        }),
        (a.tt = function () {
            return (
                void 0 === r &&
                ((r = {
                    createScriptURL: function (e) {
                        return e;
                    },
                }),
                    "undefined" != typeof trustedTypes && trustedTypes.createPolicy && (r = trustedTypes.createPolicy("nextjs#bundler", r))),
                r
            );
        }),
        (a.tu = function (e) {
            return a.tt().createScriptURL(e);
        }),
        (a.p = "./"),
        (o = { 3191: 1 }),
        (a.f.i = function (e, t) {
            o[e] || importScripts(a.tu(a.p + a.u(e)));
        }),
        (u = (i = self.webpackChunk_N_E = self.webpackChunk_N_E || []).push.bind(i)),
        (i.push = function (e) {
            var t = e[0],
                n = e[1],
                r = e[2];
            for (var i in n) a.o(n, i) && (a.m[i] = n[i]);
            for (r && r(a); t.length;) o[t.pop()] = 1;
            u(e);
        }),
        (c = a.x),
        (a.x = function () {
            return Promise.all([9774, 8764, 6484].map(a.e, a)).then(c);
        }),
        (_N_E = a.x());
})();



// !function(){var e,t,n,r,o,i,u,c,f={76631:function(e,t,n){"use strict";n(6484);let r="/System/Hexells",o=[`${r}/twgl.min.js`,`${r}/UPNG.min.js`,`${r}/ca.js`,`${r}/demo.js`];globalThis.addEventListener("message",({data:e})=>{if("undefined"!=typeof WebGLRenderingContext){if("init"===e)globalThis.importScripts(...o);else if(e instanceof DOMRect)globalThis.demoCanvasRect=e;else{let{canvas:t,devicePixelRatio:n}=e;globalThis.devicePixelRatio=n;try{globalThis.Hexells=new globalThis.Demo(t,r)}catch(e){globalThis.postMessage({message:e?.message,type:"[error]"})}}}},{passive:!0})}},s={};function a(e){var t=s[e];if(void 0!==t)return t.exports;var n=s[e]={exports:{}},r=!0;try{f[e](n,n.exports,a),r=!1}finally{r&&delete s[e]}return n.exports}a.m=f,a.x=function(){var e=a.O(void 0,[9774,8764,6484],function(){return a(76631)});return a.O(e)},e=[],a.O=function(t,n,r,o){if(n){o=o||0;for(var i=e.length;i>0&&e[i-1][2]>o;i--)e[i]=e[i-1];e[i]=[n,r,o];return}for(var u=1/0,i=0;i<e.length;i++){for(var n=e[i][0],r=e[i][1],o=e[i][2],c=!0,f=0;f<n.length;f++)u>=o&&Object.keys(a.O).every(function(e){return a.O[e](n[f])})?n.splice(f--,1):(c=!1,o<u&&(u=o));if(c){e.splice(i--,1);var s=r();void 0!==s&&(t=s)}}return t},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,{a:t}),t},n=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__},a.t=function(e,r){if(1&r&&(e=this(e)),8&r||"object"==typeof e&&e&&(4&r&&e.__esModule||16&r&&"function"==typeof e.then))return e;var o=Object.create(null);a.r(o);var i={};t=t||[null,n({}),n([]),n(n)];for(var u=2&r&&e;"object"==typeof u&&!~t.indexOf(u);u=n(u))Object.getOwnPropertyNames(u).forEach(function(t){i[t]=function(){return e[t]}});return i.default=function(){return e},a.d(o,i),o},a.d=function(e,t){for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},a.f={},a.e=function(e,t){return Promise.all(Object.keys(a.f).reduce(function(n,r){return a.f[r](e,n,t),n},[]))},a.u=function(e){return 9774===e?"static/chunks/framework-0e8d27528ba61906.js":"static/chunks/"+e+"."+({1746:"3496221204efbb6d",2856:"50d31e48653ca6eb",3301:"78d33a88d00cad8c",3545:"43ce7300fb661fca",6484:"8f7f4d178c849bcc",8090:"2ca02e936e27bfb7",8764:"8a312e40ee9b2797",9762:"2a775218fadae715"})[e]+".js"},a.miniCssF=function(e){},a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||Function("return this")()}catch(e){if("object"==typeof window)return window}}(),a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.tt=function(){return void 0===r&&(r={createScriptURL:function(e){return e}},"undefined"!=typeof trustedTypes&&trustedTypes.createPolicy&&(r=trustedTypes.createPolicy("nextjs#bundler",r))),r},a.tu=function(e){return a.tt().createScriptURL(e)},a.p="./",o={3191:1},a.f.i=function(e,t){o[e]||importScripts(a.tu(a.p+a.u(e)))},u=(i=self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push.bind(i),i.push=function(e){var t=e[0],n=e[1],r=e[2];for(var i in n)a.o(n,i)&&(a.m[i]=n[i]);for(r&&r(a);t.length;)o[t.pop()]=1;u(e)},c=a.x,a.x=function(){return Promise.all([9774,8764,6484].map(a.e,a)).then(c)},_N_E=a.x()}();