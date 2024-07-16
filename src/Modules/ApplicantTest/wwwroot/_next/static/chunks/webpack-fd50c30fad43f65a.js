!(function () {
    "use strict";
    var e,
        c,
        t,
        a,
        f,
        r,
        n,
        d,
        o,
        b = {},
        i = {};
    function u(e) {
        var c = i[e];
        if (void 0 !== c) return c.exports;
        var t = (i[e] = { id: e, loaded: !1, exports: {} }),
            a = !0;
        try {
            b[e].call(t.exports, t, t.exports, u), (a = !1);
        } finally {
            a && delete i[e];
        }
        return (t.loaded = !0), t.exports;
    }
    (u.m = b),
        (e = []),
        (u.O = function (c, t, a, f) {
            if (t) {
                f = f || 0;
                for (var r = e.length; r > 0 && e[r - 1][2] > f; r--) e[r] = e[r - 1];
                e[r] = [t, a, f];
                return;
            }
            for (var n = 1 / 0, r = 0; r < e.length; r++) {
                for (var t = e[r][0], a = e[r][1], f = e[r][2], d = !0, o = 0; o < t.length; o++)
                    n >= f &&
                        Object.keys(u.O).every(function (e) {
                            return u.O[e](t[o]);
                        })
                        ? t.splice(o--, 1)
                        : ((d = !1), f < n && (n = f));
                if (d) {
                    e.splice(r--, 1);
                    var b = a();
                    void 0 !== b && (c = b);
                }
            }
            return c;
        }),
        (u.n = function (e) {
            var c =
                e && e.__esModule
                    ? function () {
                        return e.default;
                    }
                    : function () {
                        return e;
                    };
            return u.d(c, { a: c }), c;
        }),
        (t = Object.getPrototypeOf
            ? function (e) {
                return Object.getPrototypeOf(e);
            }
            : function (e) {
                return e.__proto__;
            }),
        (u.t = function (e, a) {
            if ((1 & a && (e = this(e)), 8 & a || ("object" == typeof e && e && ((4 & a && e.__esModule) || (16 & a && "function" == typeof e.then))))) return e;
            var f = Object.create(null);
            u.r(f);
            var r = {};
            c = c || [null, t({}), t([]), t(t)];
            for (var n = 2 & a && e; "object" == typeof n && !~c.indexOf(n); n = t(n))
                Object.getOwnPropertyNames(n).forEach(function (c) {
                    r[c] = function () {
                        return e[c];
                    };
                });
            return (
                (r.default = function () {
                    return e;
                }),
                u.d(f, r),
                f
            );
        }),
        (u.d = function (e, c) {
            for (var t in c) u.o(c, t) && !u.o(e, t) && Object.defineProperty(e, t, { enumerable: !0, get: c[t] });
        }),
        (u.f = {}),
        (u.e = function (e, c) {
            return Promise.all(
                Object.keys(u.f).reduce(function (t, a) {
                    return u.f[a](e, t, c), t;
                }, [])
            );
        }),
        (u.u = function (e) {
            return 4162 === e
                ? "static/chunks/4162-aff352c28ba125c3.js"
                : 4110 === e
                    ? "static/chunks/4110-2921971c4e837e3f.js"
                    : "static/chunks/" +
                    ({
                        1337: "libheif",
                        3191: "Wallpaper (Hexells)",
                        3257: "c858d960",
                        4512: "d1c6887d",
                        5183: "Wallpaper (Coastal Landscape)",
                        6688: "Stable Diffusion",
                        8375: "8ebce0ea",
                        8705: "5af47772",
                        9629: "Wallpaper (Stable Diffusion)",
                        9986: "cccb6a7f",
                    }[e] || e) +
                    "." +
                    {
                        226: "3cf19bd447a4a42e",
                        246: "ee2d0bcfbf79b24a",
                        396: "530cce85e89e3a00",
                        565: "358b7234d56d5663",
                        642: "4c00039d00355166",
                        746: "bb753b599b9572f5",
                        1049: "94adb7b03fe8ca96",
                        1253: "8acc62985003bab0",
                        1285: "183eb8ab354dcc59",
                        1337: "13e2005128ef021d",
                        1355: "307f60b9b1db1636",
                        1544: "133540d62ce80d31",
                        1622: "a7d6eb40bb4b76a2",
                        1746: "3496221204efbb6d",
                        1786: "abbd76b64614af77",
                        1855: "c0c95547ff6eb12d",
                        1872: "10d372787a669431",
                        2149: "976fd9e7d1ee2045",
                        2163: "8e4c0015372e8cf9",
                        2177: "e8256bdd95685ad2",
                        2280: "b647e4c902557bd9",
                        2347: "0680d6de634bb6dc",
                        2350: "9e9a4372bb556a18",
                        2410: "fb8cf52bf2ad2208",
                        2463: "ae49f1139f9b1d85",
                        2552: "1518b617b8c96dec",
                        2647: "c87a5ca99f068d3b",
                        2663: "84bc612cf0795ebc",
                        2717: "c46e11f965636d25",
                        2719: "277a750edb736435",
                        2856: "50d31e48653ca6eb",
                        2918: "bb9f1e879031cae8",
                        2981: "9f6e4da53a6ca8d7",
                        2993: "933d84a1659196a6",
                        3131: "b4d574239e3f2842",
                        3191: "89f1a71c7b7ddcbf",
                        3257: "e4edae3ec9942564",
                        3301: "78d33a88d00cad8c",
                        3333: "9bf2639e8fbaacf5",
                        3348: "c19e9aec4a021cdb",
                        3350: "1dc8389db9070ead",
                        3366: "da3904f6bcd5b388",
                        3425: "e444df06958ff447",
                        3454: "18df760421a0c221",
                        3468: "7faff4bc2fd2215b",
                        3545: "43ce7300fb661fca",
                        3588: "852b7c1924a0b76a",
                        3638: "fb353c71fdd6a496",
                        3681: "84161e38d5cf2d31",
                        3751: "8325a6d4cc9a3b16",
                        3778: "de1aed5509f9d13f",
                        4268: "a29ee889d7b3c1c1",
                        4512: "69b23b28ba280775",
                        4534: "eecb7a2b615e7ec3",
                        4609: "9bc89cf680f0bce4",
                        4726: "d95c637c9e7df47e",
                        4935: "d7c88759ad3bab45",
                        5058: "24a87cb15e5cf437",
                        5183: "5c8bc26031f7b808",
                        5341: "a796fe4bb5604b88",
                        5522: "3eaa5d754464ecf0",
                        5642: "1e50529cc97c8ef0",
                        5653: "0b3170678854eefd",
                        5692: "789028a9bc220785",
                        5704: "7a3ec3e89856f23a",
                        5769: "db8ac9fe6d4f5199",
                        5883: "087b6a1918ecb250",
                        6027: "8f120dfd8fef277d",
                        6102: "d14c63a0f19aabec",
                        6173: "27e211d12bf46b5f",
                        6499: "48e81f50e1a9c7bf",
                        6514: "9aead890e00694e0",
                        6526: "ee385f3a62838073",
                        6562: "f24f3ae218ed35f2",
                        6688: "308a3d825ac1af8f",
                        6715: "95e589d400364432",
                        7006: "7e3ff7ce7074d449",
                        7210: "8a410b998587cd7f",
                        7237: "24f7551ceb6c9b7c",
                        7545: "6fd9a16cd60cbad2",
                        7614: "9e0794e132426da8",
                        7631: "ab0e867c40a88544",
                        7856: "8f1e650d4b72fc45",
                        7881: "7ed839dace99fd3d",
                        7905: "f973b628c54c4d59",
                        7933: "57369a78d6358e49",
                        8019: "2ad4d0e2d49c4a56",
                        8020: "8d54368e9a7884cf",
                        8036: "6c2768afbd7ff189",
                        8086: "0d2598d1a1f3f1f6",
                        8090: "2ca02e936e27bfb7",
                        8370: "9b3e944ab11a8b47",
                        8375: "1366672ce3a3469a",
                        8511: "8ca3de26aad91b0c",
                        8530: "70ea70771e9dbfd1",
                        8558: "f5ce6eb4bd98cbed",
                        8562: "2418d256a783bc44",
                        8607: "c63ac8ad8b7b3ea6",
                        8673: "d2af244f5c85a286",
                        8705: "4c5a3e31f68eb44a",
                        8709: "e412b4c68a1b4584",
                        8757: "69a81c9e92cbe0a1",
                        8778: "22f4c0560b4a3ca8",
                        8864: "5ab9b818adc85dce",
                        9237: "4c478c8724de2fb5",
                        9278: "ef9c18798a6cbbcd",
                        9319: "675d4b6d78fb8ccf",
                        9320: "c481bd20942a0fe6",
                        9484: "4bf36949e7007105",
                        9519: "34bf1fb6a6c86644",
                        9580: "8edcfc618fdd6a2d",
                        9629: "c2a92429bc746667",
                        9641: "22222d2860dc5d61",
                        9762: "2a775218fadae715",
                        9793: "b6ce0bcc282debb2",
                        9872: "d15f132e39bee718",
                        9986: "01d204d411e6db75",
                    }[e] +
                    ".js";
        }),
        (u.miniCssF = function (e) { }),
        (u.g = (function () {
            if ("object" == typeof globalThis) return globalThis;
            try {
                return this || Function("return this")();
            } catch (e) {
                if ("object" == typeof window) return window;
            }
        })()),
        (u.o = function (e, c) {
            return Object.prototype.hasOwnProperty.call(e, c);
        }),
        (a = {}),
        (f = "_N_E:"),
        (u.l = function (e, c, t, r, n) {
            if (a[e]) {
                a[e].push(c);
                return;
            }
            if (void 0 !== t)
                for (var d, o, b = document.getElementsByTagName("script"), i = 0; i < b.length; i++) {
                    var l = b[i];
                    if (l.getAttribute("src") == e || l.getAttribute("data-webpack") == f + t) {
                        d = l;
                        break;
                    }
                }
            d ||
                ((o = !0),
                    ((d = document.createElement("script")).charset = "utf-8"),
                    (d.timeout = 120),
                    u.nc && d.setAttribute("nonce", u.nc),
                    d.setAttribute("data-webpack", f + t),
                    n && d.setAttribute("fetchpriority", n),
                    (d.src = u.tu(e))),
                (a[e] = [c]);
            var s = function (c, t) {
                (d.onerror = d.onload = null), clearTimeout(p);
                var f = a[e];
                if (
                    (delete a[e],
                        d.parentNode && d.parentNode.removeChild(d),
                        f &&
                        f.forEach(function (e) {
                            return e(t);
                        }),
                        c)
                )
                    return c(t);
            },
                p = setTimeout(s.bind(null, void 0, { type: "timeout", target: d }), 12e4);
            (d.onerror = s.bind(null, d.onerror)), (d.onload = s.bind(null, d.onload)), o && document.head.appendChild(d);
        }),
        (u.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
        }),
        (u.nmd = function (e) {
            return (e.paths = []), e.children || (e.children = []), e;
        }),
        (u.U = function (e) {
            var c = new URL(e, "x:/"),
                t = {};
            for (var a in c) t[a] = c[a];
            for (var a in ((t.href = e),
                (t.pathname = e.replace(/[?#].*/, "")),
                (t.origin = t.protocol = ""),
                (t.toString = t.toJSON = function () {
                    return e;
                }),
                t))
                Object.defineProperty(this, a, { enumerable: !0, configurable: !0, value: t[a] });
        }),
        (u.U.prototype = URL.prototype),
        (u.tt = function () {
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
        (u.tu = function (e) {
            return u.tt().createScriptURL(e);
        }),
        (u.p = "./"),
        (u.b = document.baseURI || self.location.href),
        (n = { 2272: 0 }),
        (u.f.j = function (e, c, t) {
            var a = u.o(n, e) ? n[e] : void 0;
            if (0 !== a) {
                if (a) c.push(a[2]);
                else if (2272 != e) {
                    var f = new Promise(function (c, t) {
                        a = n[e] = [c, t];
                    });
                    c.push((a[2] = f));
                    var r = u.p + u.u(e),
                        d = Error();
                    u.l(
                        r,
                        function (c) {
                            if (u.o(n, e) && (0 !== (a = n[e]) && (n[e] = void 0), a)) {
                                var t = c && ("load" === c.type ? "missing" : c.type),
                                    f = c && c.target && c.target.src;
                                (d.message = "Loading chunk " + e + " failed.\n(" + t + ": " + f + ")"), (d.name = "ChunkLoadError"), (d.type = t), (d.request = f), a[1](d);
                            }
                        },
                        "chunk-" + e,
                        e,
                        t
                    );
                } else n[e] = 0;
            }
        }),
        (u.O.j = function (e) {
            return 0 === n[e];
        }),
        (d = function (e, c) {
            var t,
                a,
                f = c[0],
                r = c[1],
                d = c[2],
                o = 0;
            if (
                f.some(function (e) {
                    return 0 !== n[e];
                })
            ) {
                for (t in r) u.o(r, t) && (u.m[t] = r[t]);
                if (d) var b = d(u);
            }
            for (e && e(c); o < f.length; o++) (a = f[o]), u.o(n, a) && n[a] && n[a][0](), (n[a] = 0);
            return u.O(b);
        }),
        (o = self.webpackChunk_N_E = self.webpackChunk_N_E || []).forEach(d.bind(null, 0)),
        (o.push = d.bind(null, o.push.bind(o))),
        (u.nc = void 0);
})();



// !function(){"use strict";var e,c,t,a,f,r,n,d,o,b={},i={};function u(e){var c=i[e];if(void 0!==c)return c.exports;var t=i[e]={id:e,loaded:!1,exports:{}},a=!0;try{b[e].call(t.exports,t,t.exports,u),a=!1}finally{a&&delete i[e]}return t.loaded=!0,t.exports}u.m=b,e=[],u.O=function(c,t,a,f){if(t){f=f||0;for(var r=e.length;r>0&&e[r-1][2]>f;r--)e[r]=e[r-1];e[r]=[t,a,f];return}for(var n=1/0,r=0;r<e.length;r++){for(var t=e[r][0],a=e[r][1],f=e[r][2],d=!0,o=0;o<t.length;o++)n>=f&&Object.keys(u.O).every(function(e){return u.O[e](t[o])})?t.splice(o--,1):(d=!1,f<n&&(n=f));if(d){e.splice(r--,1);var b=a();void 0!==b&&(c=b)}}return c},u.n=function(e){var c=e&&e.__esModule?function(){return e.default}:function(){return e};return u.d(c,{a:c}),c},t=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__},u.t=function(e,a){if(1&a&&(e=this(e)),8&a||"object"==typeof e&&e&&(4&a&&e.__esModule||16&a&&"function"==typeof e.then))return e;var f=Object.create(null);u.r(f);var r={};c=c||[null,t({}),t([]),t(t)];for(var n=2&a&&e;"object"==typeof n&&!~c.indexOf(n);n=t(n))Object.getOwnPropertyNames(n).forEach(function(c){r[c]=function(){return e[c]}});return r.default=function(){return e},u.d(f,r),f},u.d=function(e,c){for(var t in c)u.o(c,t)&&!u.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:c[t]})},u.f={},u.e=function(e,c){return Promise.all(Object.keys(u.f).reduce(function(t,a){return u.f[a](e,t,c),t},[]))},u.u=function(e){return 4162===e?"static/chunks/4162-aff352c28ba125c3.js":4110===e?"static/chunks/4110-2921971c4e837e3f.js":"static/chunks/"+(({1337:"libheif",3191:"Wallpaper (Hexells)",3257:"c858d960",4512:"d1c6887d",5183:"Wallpaper (Coastal Landscape)",6688:"Stable Diffusion",8375:"8ebce0ea",8705:"5af47772",9629:"Wallpaper (Stable Diffusion)",9986:"cccb6a7f"})[e]||e)+"."+({226:"3cf19bd447a4a42e",246:"ee2d0bcfbf79b24a",396:"530cce85e89e3a00",565:"358b7234d56d5663",642:"4c00039d00355166",746:"bb753b599b9572f5",1049:"94adb7b03fe8ca96",1253:"8acc62985003bab0",1285:"183eb8ab354dcc59",1337:"13e2005128ef021d",1355:"307f60b9b1db1636",1544:"133540d62ce80d31",1622:"a7d6eb40bb4b76a2",1746:"3496221204efbb6d",1786:"abbd76b64614af77",1855:"c0c95547ff6eb12d",1872:"10d372787a669431",2149:"976fd9e7d1ee2045",2163:"8e4c0015372e8cf9",2177:"e8256bdd95685ad2",2280:"b647e4c902557bd9",2347:"0680d6de634bb6dc",2350:"9e9a4372bb556a18",2410:"fb8cf52bf2ad2208",2463:"ae49f1139f9b1d85",2552:"1518b617b8c96dec",2647:"c87a5ca99f068d3b",2663:"84bc612cf0795ebc",2717:"c46e11f965636d25",2719:"277a750edb736435",2856:"50d31e48653ca6eb",2918:"bb9f1e879031cae8",2981:"9f6e4da53a6ca8d7",2993:"933d84a1659196a6",3131:"b4d574239e3f2842",3191:"89f1a71c7b7ddcbf",3257:"e4edae3ec9942564",3301:"78d33a88d00cad8c",3333:"9bf2639e8fbaacf5",3348:"c19e9aec4a021cdb",3350:"1dc8389db9070ead",3366:"da3904f6bcd5b388",3425:"e444df06958ff447",3454:"18df760421a0c221",3468:"7faff4bc2fd2215b",3545:"43ce7300fb661fca",3588:"852b7c1924a0b76a",3638:"fb353c71fdd6a496",3681:"84161e38d5cf2d31",3751:"8325a6d4cc9a3b16",3778:"de1aed5509f9d13f",4268:"a29ee889d7b3c1c1",4512:"69b23b28ba280775",4534:"eecb7a2b615e7ec3",4609:"9bc89cf680f0bce4",4726:"d95c637c9e7df47e",4935:"d7c88759ad3bab45",5058:"24a87cb15e5cf437",5183:"5c8bc26031f7b808",5341:"a796fe4bb5604b88",5522:"3eaa5d754464ecf0",5642:"1e50529cc97c8ef0",5653:"0b3170678854eefd",5692:"789028a9bc220785",5704:"7a3ec3e89856f23a",5769:"db8ac9fe6d4f5199",5883:"087b6a1918ecb250",6027:"8f120dfd8fef277d",6102:"d14c63a0f19aabec",6173:"27e211d12bf46b5f",6499:"48e81f50e1a9c7bf",6514:"9aead890e00694e0",6526:"ee385f3a62838073",6562:"f24f3ae218ed35f2",6688:"308a3d825ac1af8f",6715:"95e589d400364432",7006:"7e3ff7ce7074d449",7210:"8a410b998587cd7f",7237:"24f7551ceb6c9b7c",7545:"6fd9a16cd60cbad2",7614:"9e0794e132426da8",7631:"ab0e867c40a88544",7856:"8f1e650d4b72fc45",7881:"7ed839dace99fd3d",7905:"f973b628c54c4d59",7933:"57369a78d6358e49",8019:"2ad4d0e2d49c4a56",8020:"8d54368e9a7884cf",8036:"6c2768afbd7ff189",8086:"0d2598d1a1f3f1f6",8090:"2ca02e936e27bfb7",8370:"9b3e944ab11a8b47",8375:"1366672ce3a3469a",8511:"8ca3de26aad91b0c",8530:"70ea70771e9dbfd1",8558:"f5ce6eb4bd98cbed",8562:"2418d256a783bc44",8607:"c63ac8ad8b7b3ea6",8673:"d2af244f5c85a286",8705:"4c5a3e31f68eb44a",8709:"e412b4c68a1b4584",8757:"69a81c9e92cbe0a1",8778:"22f4c0560b4a3ca8",8864:"5ab9b818adc85dce",9237:"4c478c8724de2fb5",9278:"ef9c18798a6cbbcd",9319:"675d4b6d78fb8ccf",9320:"c481bd20942a0fe6",9484:"4bf36949e7007105",9519:"34bf1fb6a6c86644",9580:"8edcfc618fdd6a2d",9629:"c2a92429bc746667",9641:"22222d2860dc5d61",9762:"2a775218fadae715",9793:"b6ce0bcc282debb2",9872:"d15f132e39bee718",9986:"01d204d411e6db75"})[e]+".js"},u.miniCssF=function(e){},u.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||Function("return this")()}catch(e){if("object"==typeof window)return window}}(),u.o=function(e,c){return Object.prototype.hasOwnProperty.call(e,c)},a={},f="_N_E:",u.l=function(e,c,t,r,n){if(a[e]){a[e].push(c);return}if(void 0!==t)for(var d,o,b=document.getElementsByTagName("script"),i=0;i<b.length;i++){var l=b[i];if(l.getAttribute("src")==e||l.getAttribute("data-webpack")==f+t){d=l;break}}d||(o=!0,(d=document.createElement("script")).charset="utf-8",d.timeout=120,u.nc&&d.setAttribute("nonce",u.nc),d.setAttribute("data-webpack",f+t),n&&d.setAttribute("fetchpriority",n),d.src=u.tu(e)),a[e]=[c];var s=function(c,t){d.onerror=d.onload=null,clearTimeout(p);var f=a[e];if(delete a[e],d.parentNode&&d.parentNode.removeChild(d),f&&f.forEach(function(e){return e(t)}),c)return c(t)},p=setTimeout(s.bind(null,void 0,{type:"timeout",target:d}),12e4);d.onerror=s.bind(null,d.onerror),d.onload=s.bind(null,d.onload),o&&document.head.appendChild(d)},u.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e},u.U=function(e){var c=new URL(e,"x:/"),t={};for(var a in c)t[a]=c[a];for(var a in t.href=e,t.pathname=e.replace(/[?#].*/,""),t.origin=t.protocol="",t.toString=t.toJSON=function(){return e},t)Object.defineProperty(this,a,{enumerable:!0,configurable:!0,value:t[a]})},u.U.prototype=URL.prototype,u.tt=function(){return void 0===r&&(r={createScriptURL:function(e){return e}},"undefined"!=typeof trustedTypes&&trustedTypes.createPolicy&&(r=trustedTypes.createPolicy("nextjs#bundler",r))),r},u.tu=function(e){return u.tt().createScriptURL(e)},u.p="./",u.b=document.baseURI||self.location.href,n={2272:0},u.f.j=function(e,c,t){var a=u.o(n,e)?n[e]:void 0;if(0!==a){if(a)c.push(a[2]);else if(2272!=e){var f=new Promise(function(c,t){a=n[e]=[c,t]});c.push(a[2]=f);var r=u.p+u.u(e),d=Error();u.l(r,function(c){if(u.o(n,e)&&(0!==(a=n[e])&&(n[e]=void 0),a)){var t=c&&("load"===c.type?"missing":c.type),f=c&&c.target&&c.target.src;d.message="Loading chunk "+e+" failed.\n("+t+": "+f+")",d.name="ChunkLoadError",d.type=t,d.request=f,a[1](d)}},"chunk-"+e,e,t)}else n[e]=0}},u.O.j=function(e){return 0===n[e]},d=function(e,c){var t,a,f=c[0],r=c[1],d=c[2],o=0;if(f.some(function(e){return 0!==n[e]})){for(t in r)u.o(r,t)&&(u.m[t]=r[t]);if(d)var b=d(u)}for(e&&e(c);o<f.length;o++)a=f[o],u.o(n,a)&&n[a]&&n[a][0](),n[a]=0;return u.O(b)},(o=self.webpackChunk_N_E=self.webpackChunk_N_E||[]).forEach(d.bind(null,0)),o.push=d.bind(null,o.push.bind(o)),u.nc=void 0}();