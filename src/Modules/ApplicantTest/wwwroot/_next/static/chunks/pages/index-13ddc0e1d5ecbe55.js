(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [5405],
  {
    48312: function (e, t, r) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/",
        function () {
          return r(79708);
        },
      ]);
    },
    93343: function (e, t, r) {
      "use strict";
      r.d(t, {
        aF: function () {
          return c;
        },
        dr: function () {
          return l;
        },
        nb: function () {
          return o;
        },
        r: function () {
          return s;
        },
      });
      var n = r(85893),
        i = r(67294);
      let o = ["RDI-Applicant", "Asako Satoshi", "Lily Wang", "Madison Byers", "Dominic Gonzalez", "Simone Khan"],
        s = {
          "RDI-Applicant": "System/Icons/avatars/rdi.png",
          "Asako Satoshi": "System/Icons/avatars/Asako Satoshi.png",
          "Lily Wang": "System/Icons/avatars/Lily Wang.png",
          "Madison Byers": "System/Icons/avatars/Madison Byers.png",
          "Dominic Gonzalez": "System/Icons/avatars/Dominic Gonzalez.png",
          "Simone Khan": "System/Icons/avatars/Simone Khan.png",
        },
        a = (0, i.createContext)(void 0),
        l = ({ children: e }) => {
          let [t, r] = (0, i.useState)(o[0]);
          return (0, n.jsx)(a.Provider, { value: { currentUser: t, setCurrentUser: r }, children: e });
        },
        c = () => {
          let e = (0, i.useContext)(a);
          if (!e) throw Error("useUser must be used within a UserProvider");
          return e;
        };
    },
    73350: function (e, t, r) {
      "use strict";
      r.r(t),
        r.d(t, {
          default: function () {
            return w;
          },
        });
      var n = r(85893),
        i = r(67294),
        o = r(7502),
        s = r(10508);
      let a = s.ZP.div(["background-color:#f9f9f9;border-radius:8px;box-shadow:0 0 10px rgba(0,0,0,10%);display:flex;flex-direction:column;height:600px;padding:20px;position:absolute;width:400px;z-index:1000;"]),
        l = s.ZP.div(["align-items:center;background-color:#a2a2a2;border-bottom:1px solid #000;cursor:move;display:flex;justify-content:space-between;padding:10px;h2{margin:0;}"]),
        c = s.ZP.button(["background-color:#007bff;border:none;border-radius:4px;color:white;cursor:pointer;padding:5px 10px;&:hover{background-color:#0056b3;}"]),
        d = s.ZP.div(["display:flex;height:40px;justify-content:flex-end;padding:5px;"]),
        u = s.ZP.div(["border:1px solid #ccc;border-radius:4px;flex:1;margin-bottom:15px;overflow-y:auto;padding:10px;"]),
        p = s.ZP.div(["background-color:#007bff;border-radius:4px;color:white;margin-bottom:10px;padding:10px;&:nth-child(even){background-color:#f1f1f1;color:black;}"]),
        h = s.ZP.div([
          "display:flex;select,input{border:1px solid #ccc;border-radius:4px;flex:1;margin-right:10px;padding:10px;}button{background-color:#007bff;border:none;border-radius:4px;color:white;cursor:pointer;padding:10px 15px;&:hover{background-color:#0056b3;}}",
        ]),
        m = s.ZP.button(["background-color:red;border:none;border-radius:4px;color:white;cursor:pointer;padding:5px 10px;position:absolute;right:5px;top:5px;&:hover{background-color:darkred;}"]),
        f = s.ZP.div(["align-items:center;cursor:pointer;display:flex;span{font-size:18px;font-weight:bold;margin-left:10px;}"]),
        x = s.ZP.div(["display:flex;flex-direction:column;"]),
        g = s.ZP.div([
          "align-items:center;cursor:pointer;display:flex;padding:10px;&:hover{background-color:#b7b5b5;}img{border-radius:50%;height:40px;margin-right:10px;width:40px;}.notification-container{align-items:center;display:flex;margin-top:5px;}.user-details{display:flex;flex-direction:column;}.user-name{align-items:center;display:flex;}.notification-dot{align-items:center;background-color:red;border-radius:50%;color:white;display:flex;font-size:12px;height:20px;justify-content:center;margin-left:5px;width:20px;}small{color:#888;display:flex;flex-direction:column;margin-top:5px;}",
        ]);
      var v = r(93343),
        b = r(73839),
        w = () => {
          let [e, t] = (0, i.useState)(""),
            [r, s] = (0, i.useState)([]),
            [w, y] = (0, i.useState)(null),
            [k, S] = (0, i.useState)(!0),
            [E, j] = (0, i.useState)(!1),
            T = (0, i.useRef)(null),
            { currentUser: C } = (0, v.aF)(),
            [R, P] = (0, i.useState)({ x: 0, y: 0 }),
            [I, D] = (0, i.useState)({ x: 0, y: 0 }),
            [L, M] = (0, i.useState)(!0),
            [z, $] = (0, i.useState)({}),
            { setMenu: F } = (0, o.H)(),
            A = (0, i.useRef)(null),
            [W, q] = (0, i.useState)(""),
            O = (e) => {
              P({ x: e.clientX - I.x, y: e.clientY - I.y });
            },
            Z = () => {
              document.removeEventListener("mousemove", O), document.removeEventListener("mouseup", Z);
            },
            H = (e) =>
              r
                .slice()
                .reverse()
                .find((t) => t.user === e);
          (0, i.useEffect)(() => {
            let e = T.current;
            e && ((e.style.left = `${R.x}px`), (e.style.top = `${R.y}px`));
          }, [R]),
            (0, i.useEffect)(() => {
              if (k && T.current) {
                let e = T.current,
                  t = (window.innerWidth - e.offsetWidth) / 2,
                  r = (window.innerHeight - e.offsetHeight) / 2;
                P({ x: t, y: r }), (e.style.left = `${t}px`), (e.style.top = `${r}px`), j(!0);
              }
            }, [k]),
            (0, i.useEffect)(() => {
              if (k) {
                let e = setTimeout(() => {
                  s((e) => [...e, { user: "Asako Satoshi", text: "Please send me the SalesReport URL" }]), $((e) => ({ ...e, "Asako Satoshi": !0 }));
                }, 1e3),
                  t = setTimeout(() => {
                    s((e) => [...e, { user: "Dominic Gonzalez", text: "Please send me the RDI sales summary" }]), $((e) => ({ ...e, "Dominic Gonzalez": !0 }));
                  }, 3e3),
                  r = setTimeout(() => {
                    s((e) => [...e, { user: "Lily Wang", text: "Please send me the year of the first modern Olympics" }]), $((e) => ({ ...e, "Lily Wang": !0 }));
                  }, 5e3);
                return () => {
                  clearTimeout(e), clearTimeout(t), clearTimeout(r);
                };
              }
            }, [k]);
          let B = () => {
            if (A.current) {
              let e = A.current.selectionStart || 0,
                t = A.current.selectionEnd || 0,
                r = A.current.value.substring(e, t);
              r &&
                navigator.clipboard
                  .writeText(r)
                  .then(() => {
                    F({ items: [], x: 0, y: 0 });
                  })
                  .catch((e) => { });
            }
          },
            N = () => {
              A.current &&
                navigator.clipboard
                  .readText()
                  .then((e) => {
                    t(e), q(e), F({ items: [], x: 0, y: 0 });
                  })
                  .catch((e) => { });
            };
          return (0, n.jsxs)("div", {
            children: [
              (0, n.jsx)(f, {
                onDoubleClick: () => {
                  S((e) => !e);
                },
              }),
              k &&
              (0, n.jsxs)(a, {
                ref: T,
                style: { visibility: E ? "visible" : "hidden", left: `${R.x}px`, top: `${R.y}px` },
                children: [
                  (0, n.jsxs)(l, {
                    onMouseDown: (e) => {
                      if (e.target !== e.currentTarget) return;
                      let t = T.current;
                      if (t) {
                        let r = t.getBoundingClientRect();
                        D({ x: e.clientX - r.left, y: e.clientY - r.top }), document.addEventListener("mousemove", O), document.addEventListener("mouseup", Z);
                      }
                    },
                    children: [
                      (0, n.jsx)(b.Yt, { src: v.r["RDI-Applicant"], alt: "User Avatar" }),
                      (0, n.jsx)("h4", { children: "Logged in as RDI-Applicant" }),
                      (0, n.jsx)("h4", { children: w ? `Chatting with ${w}` : "RDIChat" }),
                      (0, n.jsx)(m, {
                        onClick: () => {
                          S(!1), j(!1);
                        },
                        children: "X",
                      }),
                    ],
                  }),
                  w &&
                  (0, n.jsx)(d, {
                    children: (0, n.jsx)(c, {
                      onClick: () => {
                        w && $((e) => ({ ...e, [w]: !1 })), M(!1), y(null);
                      },
                      children: "Back",
                    }),
                  }),
                  w
                    ? (0, n.jsxs)(n.Fragment, {
                      children: [
                        (0, n.jsx)(u, { children: r.filter((e) => e.user === w).map((e, t) => (0, n.jsx)(p, { children: e.text }, t)) }),
                        (0, n.jsx)("form", {
                          onSubmit: (r) => {
                            r.preventDefault(),
                              w &&
                              (window.parent && window.parent.postMessage({ event: "messageSent", details: { selectedUser: w, message: e } }, "*"),
                                s((t) => [...t, { user: w, text: `${C} to ${w}: ${e}` }]),
                                t(""),
                                q(""),
                                $((e) => ({ ...e, [w]: !0 })));
                          },
                          children: (0, n.jsxs)(h, {
                            onContextMenu: (e) => {
                              e.preventDefault(),
                                F({
                                  items: [
                                    { label: "Copy", action: B },
                                    { label: "Paste", action: N },
                                  ],
                                  x: e.clientX,
                                  y: e.clientY,
                                });
                            },
                            children: [
                              (0, n.jsx)("input", {
                                ref: A,
                                type: "text",
                                value: W,
                                onChange: (e) => {
                                  let r = e.target.value;
                                  t(r), q(r);
                                },
                                placeholder: "Type your message...",
                                required: !0,
                              }),
                              (0, n.jsx)("button", { type: "submit", children: "Send" }),
                            ],
                          }),
                        }),
                      ],
                    })
                    : (0, n.jsx)(x, {
                      children: v.nb
                        .filter((e) => e !== C)
                        .map((e) =>
                          (0, n.jsxs)(
                            g,
                            {
                              onClick: () => {
                                y(e), $((t) => ({ ...t, [e]: !1 }));
                              },
                              children: [
                                (0, n.jsx)("img", { src: v.r[e], alt: `${e}'s avatar` }),
                                (0, n.jsxs)("div", {
                                  className: "user-details",
                                  children: [
                                    (0, n.jsxs)("span", { className: "user-name", children: [e, z[e] && (0, n.jsx)("div", { className: "notification-dot", children: "!" })] }),
                                    (0, n.jsx)("small", { children: H(e)?.text.substring(0, 90) || "No messages yet" }),
                                  ],
                                }),
                              ],
                            },
                            e
                          )
                        ),
                    }),
                ],
              }),
            ],
          });
        };
    },
    86401: function (e, t, r) {
      "use strict";
      r.d(t, {
        Wd: function () {
          return i;
        },
        vc: function () {
          return n;
        },
        xJ: function () {
          return o;
        },
      });
      let n = {
        camera: { far: 400, fov: 30, near: 0.1 },
        color: "hsl(225, 40%, 20%)",
        colorCycleSpeed: 10,
        forceAnimate: !0,
        hh: 50,
        hue: 225,
        lightness: 20,
        material: { options: { fog: !1, wireframe: !1 } },
        saturation: 40,
        shininess: 35,
        waveHeight: 20,
        waveSpeed: 0.25,
        ww: 50,
      },
        i = { gyroControls: !1, mouseControls: !1, mouseEase: !1, touchControls: !1 },
        o = ["./System/Vanta.js/three.min.js", "./System/Vanta.js/vanta.waves.min.js"];
    },
    28853: function (e, t, r) {
      "use strict";
      r.d(t, {
        Ox: function () {
          return c;
        },
        UV: function () {
          return s;
        },
        UY: function () {
          return a;
        },
        WQ: function () {
          return l;
        },
        ol: function () {
          return o;
        },
      });
      var n = r(85893),
        i = r(67294);
      let o = (0, i.memo)(() =>
        (0, n.jsx)("svg", {
          style: { border: "1px solid transparent", borderRight: 0, borderTop: 0, height: "17px", marginLeft: "-1px" },
          viewBox: "3 -1 30 30",
          xmlns: "http://www.w3.org/2000/svg",
          children: (0, n.jsx)("path", {
            d:
              "M21 0q1.516 0 2.922.391T26.547 1.5t2.227 1.727 1.727 2.227 1.109 2.625.391 2.922-.391 2.922-1.109 2.625-1.727 2.227-2.227 1.727-2.625 1.109-2.922.391q-1.953 0-3.742-.656t-3.289-1.891L1.703 31.705q-.297.297-.703.297t-.703-.297T0 31.002t.297-.703l12.25-12.266q-1.234-1.5-1.891-3.289T10 11.002q0-1.516.391-2.922T11.5 5.455t1.727-2.227 2.227-1.727T18.079.392t2.922-.391zm0 20q1.859 0 3.5-.711t2.859-1.93 1.93-2.859T30 11t-.711-3.5-1.93-2.859-2.859-1.93T21 2t-3.5.711-2.859 1.93-1.93 2.859T12 11t.711 3.5 1.93 2.859 2.859 1.93T21 20z",
            stroke: "#FFF",
            strokeWidth: "1",
          }),
        })
      ),
        s = (0, i.memo)(() => (0, n.jsx)("svg", { viewBox: "0 0 1024 1024", xmlns: "http://www.w3.org/2000/svg", children: (0, n.jsx)("path", { d: "m257.5 977.5 465-465.5-465-465.5 45-45 511 510.5-511 510.5z" }) })),
        a = (0, i.memo)(() =>
          (0, n.jsx)("svg", {
            viewBox: "0 0 1024 1024",
            xmlns: "http://www.w3.org/2000/svg",
            children: (0, n.jsx)("path", { d: "M768 128h192v192h-64v-82.5l-228 228-45.5-45.5 228-228H768v-64zm0 384 64-64v384H0V256h640l-64 64H64v448h704V512z" }),
          })
        ),
        l = (0, i.memo)(() =>
          (0, n.jsx)("svg", {
            viewBox: "0 0 1024 1024",
            xmlns: "http://www.w3.org/2000/svg",
            children: (0, n.jsx)("path", {
              d:
                "M768 0q13 0 24.75 5t20.5 13.75T827 39.25 832 64v464q0 15.5 4.75 27t11.75 21.75 15.5 20.5T879.5 620t11.75 29 4.75 39v144q0 13-5 24.75t-13.75 20.5-20.5 13.75-24.75 5H384v64q0 19.5-10.75 35.5T344.5 1019q-11.5 5-24.5 5-26.5 0-45.5-19L128 858.5V0h640zM320 784q0-22.5 4.75-38.75t11.75-29T352 693.5t15.5-20.25 11.75-22T384 624V301.5l-192-192V832l128 128V784zm512-96q0-15.5-4.75-27t-11.75-21.75-15.5-20.5T784.5 596t-11.75-29-4.75-39V64H237.5l192 192q9 9 13.75 20.75T448 301.5V624q0 22.5-4.75 38.75t-11.75 29T416 714.5t-15.5 20.25-11.75 22T384 784v48h448V688z",
            }),
          })
        ),
        c = (0, i.memo)(() =>
          (0, n.jsx)("svg", {
            viewBox: "0 0 1024 1024",
            xmlns: "http://www.w3.org/2000/svg",
            children: (0, n.jsx)("path", {
              d:
                "M939.5 276.5q41 41 62.75 93.25T1024 480q0 17.5-1 42t-4.25 53-9.5 58.75T993 693q-15 43-35 70.25t-41.5 42.5T873 826.5t-41 5.5q-16.5 0-30.25-5.75t-26-14.75-23-20.75T731.5 767t-20.75-23-21.25-19.75T666.25 710t-26.75-6h-255q-14.5.5-26.75 6t-23.25 14.25T313.25 744t-20.75 23-21.25 23.75-23 20.75-26 14.75T192 832q-19 0-41-5.5t-43.5-20.75-41.5-42.5T31 693q-10-29-16.25-59.25T5.25 575 1 522t-1-42q0-58 21.75-110.25T84.5 276.5q40.5-41 93-62.75T288 192h448q58 0 110.25 21.75t93.25 62.75zm-7 395.5q9.5-26.5 15-55t8.25-54.75 3.5-47.75.75-34.5q0-46.5-17.75-87.25t-48-71-71-48T736 256H288q-46.5 0-87.25 17.75t-71 48-48 71T64 480q0 13 .75 34.5t3.5 47.75T76.5 617t15 55q12.5 36 27.5 55.5t29.25 28.5 26 10.5T192 768q11 0 24.25-13.25T244 725q12-14 25.75-28.75t30.5-27T337.5 649t45.5-9h258q25 1 45.5 9t37.25 20.25 30.5 27T780 725q14.5 16.5 27.75 29.75T832 768q6 0 17.75-1.5t26-10.5T905 727.5t27.5-55.5zM256 448h64v64h-64v64h-64v-64h-64v-64h64v-64h64v64zm576 64q13.5 0 25 5t20.25 13.75T891 551t5 25-5 25-13.75 20.25T857 635t-25 5-25-5-20.25-13.75T773 601t-5-25 5-25 13.75-20.25T807 517t25-5zM704 384q13.5 0 25 5t20.25 13.75T763 423t5 25-5 25-13.75 20.25T729 507t-25 5-25-5-20.25-13.75T645 473t-5-25 5-25 13.75-20.25T679 389t25-5z",
            }),
          })
        );
    },
    80155: function (e, t, r) {
      "use strict";
      r.d(t, {
        Hr: function () {
          return o;
        },
        Oh: function () {
          return s;
        },
        rF: function () {
          return i;
        },
      });
      var n = r(97836);
      let i = "Start",
        o = "Type here to search",
        s = ({ relatedTarget: e }, t, r, i, o, s = !1) => {
          if (!(e && t?.contains(e))) {
            let a = t?.nextSibling,
              l = e === a,
              c = e?.parentElement === a,
              d = e?.title === o;
            e && ((s && l) || (!l && (!c || !d))) ? r(!1) : (i || t)?.focus(n.eS);
          }
        };
    },
    72446: function (e, t, r) {
      "use strict";
      var n = r(67294);
      t.Z = (e, t, r) => {
        let i = (0, n.useRef)();
        return (
          (0, n.useEffect)(
            () => (
              e && !i.current && ((i.current = e(r)), t && i.current.addEventListener("message", t, { passive: !0 }), i.current.postMessage("init")),
              () => {
                i.current?.terminate(), (i.current = void 0);
              }
            ),
            [t, r, e]
          ),
          i
        );
      };
    },
    79708: function (e, t, r) {
      "use strict";
      r.r(t),
        r.d(t, {
          default: function () {
            return eR;
          },
        });
      var n = r(85893),
        i = r(67294),
        o = r(51526),
        s = r(5152),
        a = r.n(s),
        l = r(58437);
      let c = a()(() => r.e(8864, "high").then(r.bind(r, 78864)), { loadableGenerated: { webpack: () => [78864] } });
      var d = (0, i.memo)(() => {
        let { processes: e = {} } = (0, l.z)();
        return (0, n.jsx)(o.M, {
          initial: !1,
          presenceAffectsLayout: !1,
          children: Object.entries(e).map(([e, { closing: t, Component: r, hasWindow: i }]) => e && r && !t && (0, n.jsx)(c, { Component: r, hasWindow: i, id: e }, e)),
        });
      }),
        u = r(10508);
      let p = u.ZP.main([
        "background-color:transparent;contain:strict;height:100%;inset:0;overscroll-behavior:none;position:fixed;width:100vw;#loading-status{background-color:#fff;border-radius:10px;display:none;font-weight:600;left:50%;padding:15px;position:absolute;top:50%;transform:translate(-50%,-50%);user-select:none;}> canvas{background-color:inherit;height:100%;left:0;object-fit:cover;position:absolute;top:0;width:100%;z-index:-1;}",
      ]);
      var h = r(1864),
        m = r(10393),
        f = r(86401),
        x = r(20063),
        g = r(76488),
        v = r(72446),
        b = r(97836),
        w = r(6484);
      let y = Object.keys(m.YH),
        k = [];
      var S = (e) => {
        let { exists: t, lstat: n, readFile: o, readdir: s, updateFolder: a, writeFile: l } = (0, x.o)(),
          { sessionLoaded: c, setWallpaper: d, wallpaperImage: p, wallpaperFit: S } = (0, g.k)(),
          { colors: E } = (0, u.Fg)(),
          [j] = p.split(" "),
          T = "VANTA WIREFRAME" === p,
          C = (0, v.Z)(m.YH[j], void 0, T ? "Wireframe" : ""),
          R = (0, i.useRef)(),
          P = (0, i.useRef)(!1),
          I = (0, i.useCallback)(
            async (r) => {
              let n;
              if (!e.current) return;
              let { matches: i } = window.matchMedia("(prefers-reduced-motion: reduce)"),
                s = !window.top || window === window.top;
              if (!s)
                try {
                  s = window.location.origin !== window.top?.location.origin;
                } catch {
                  s = !0;
                }
              if ("VANTA" === j) (n = { ...f.vc, waveSpeed: f.vc.waveSpeed * (i ? 0.1 : 1) }), (f.vc.material.options.wireframe = T || !s);
              else if (p.startsWith("MATRIX")) n = { animationSpeed: i ? 0.1 : 1, volumetric: p.endsWith("3D"), ...(s ? {} : { fallSpeed: -0.09, forwardSpeed: -0.25 }) };
              else if ("STABLE_DIFFUSION" === j) {
                let e = `${b.sC}/${b.dd}`;
                (await t(e)) && (n = { prompts: JSON.parse((await o(e))?.toString() || "[]") });
              }
              if (
                (document.documentElement.style.setProperty("background", document.documentElement.style.background.replace(/".*"/, "")),
                  r || (e.current.querySelector(m.$3)?.remove(), window.WallpaperDestroy?.()),
                  !P.current && void 0 !== window.OffscreenCanvas && C.current)
              ) {
                let t = { config: n, devicePixelRatio: 1 };
                if (r) C.current.postMessage(t);
                else {
                  let r = (0, w.nS)(e.current);
                  if (
                    (C.current.postMessage({ canvas: r, ...t }, [r]),
                      C.current.addEventListener("message", ({ data: e }) => {
                        "[error]" === e.type && (e.message.includes("getContext") ? ((P.current = !0), I()) : d("SLIDESHOW"));
                      }),
                      "STABLE_DIFFUSION" === j)
                  ) {
                    let t = document.createElement("div");
                    (t.id = "loading-status"),
                      e.current?.append(t),
                      (window.WallpaperDestroy = () => {
                        t.remove(), (window.WallpaperDestroy = void 0);
                      }),
                      C.current.addEventListener("message", ({ data: e }) => {
                        "[error]" === e.type ? d("VANTA") : e.type ? (t.textContent = e.message || "") : e.message || (R.current = window.setTimeout(() => I(!0), 10 * b.qe)),
                          (t.style.display = e.message ? "block" : "none");
                      });
                  }
                }
              } else
                m.dI[j]
                  ? m.dI[j]()
                    .then(({ default: t }) => t?.(e.current, n))
                    .catch(() => d("VANTA"))
                  : d("VANTA");
            },
            [e, t, o, d, T, p, j, C]
          ),
          D = (0, i.useCallback)(
            async (e) =>
              (await s(e)).reduce(async (t, r) => {
                let i = (0, h.join)(e, r);
                return [...(await t), ...((await n(i)).isDirectory() ? await D(i) : [b.lM.has((0, w.RT)(i)) && !b.vb.has((0, w.RT)(i)) ? i : ""])].filter(Boolean);
              }, Promise.resolve([])),
            [s, n]
          ),
          L = (0, i.useCallback)(async () => {
            let [, n] = /"(.*?)"/.exec(document.documentElement.style.background) || [];
            n?.startsWith("blob:") && (0, w.EK)(n), e.current?.querySelector(m.$3)?.remove(), e.current?.querySelector(m.vF)?.remove(), window.WallpaperDestroy?.();
            let i = "",
              s = "",
              c = S,
              u = "SLIDESHOW" === j;
            if (u) {
              let e = `${b.sC}/${b.rH}`;
              (await t(e)) || (await l(e, JSON.stringify((await t(b.sC)) ? await D(b.sC) : "[]")), a(b.sC, b.rH)),
                0 === k.length && k.push(...[...new Set(JSON.parse((await o(e))?.toString() || "[]"))].sort(() => Math.random() - 0.5));
              do {
                i = k.shift() || "";
                let [e] = k;
                if (e) {
                  let t = document.createElement("link");
                  (t.id = "preloadWallpaper"), (t.href = e), (t.rel = "preload"), (t.as = "image"), document.querySelector("#preloadWallpaper")?.remove(), document.head.append(t);
                }
                i.startsWith("/") && (i = `${window.location.origin}${i}`);
              } while (n === i && k.length > 1);
              c = "fill";
            } else if ("APOD" === j) {
              let [, e] = p.split(" "),
                [t, , r, , n] = new Intl.DateTimeFormat(b.ZW, { timeZone: "US/Eastern" }).formatToParts(Date.now()).map(({ value: e }) => e);
              if (e === `${n}-${t}-${r}`) return;
              let { date: o = "", hdurl: a = "", url: l = "" } = await (0, w.AC)("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY");
              if (a || l) {
                if (((i = ((0, w.E9)() > 1024 ? a : l) || l), (c = "fit"), (0, w.yk)(i))) {
                  let e = `https://i.ytimg.com/vi/${(0, w.Ld)(i)}`;
                  (i = `${e}/maxresdefault.jpg`), (s = `${e}/hqdefault.jpg`);
                } else a && l && a !== l && (s = i === l ? a : l);
                let e = `APOD ${i} ${o}`;
                e !== p && (d(e, c), setTimeout(I, b.xR));
              }
            } else if (await t(p)) {
              let { decodeImageToBuffer: e } = await r.e(4609, "high").then(r.bind(r, 14609)),
                t = await o(p),
                n = await e((0, w.RT)(p), t);
              i = (0, w.YS)(n || t);
            }
            if (i) {
              if (b.qy.has((0, w.RT)(p))) {
                let t = document.createElement("video");
                (t.src = i),
                  (t.autoplay = !0),
                  (t.controls = !1),
                  (t.disablePictureInPicture = !0),
                  (t.disableRemotePlayback = !0),
                  (t.loop = !0),
                  (t.muted = !0),
                  (t.playsInline = !0),
                  (t.style.position = "absolute"),
                  (t.style.inset = "0"),
                  (t.style.width = "100%"),
                  (t.style.height = "100%"),
                  (t.style.objectFit = "cover"),
                  (t.style.objectPosition = "center center"),
                  (t.style.zIndex = "-1"),
                  e.current?.append(t);
              } else {
                let e = (e) => {
                  let t = "tile" === c ? "repeat" : "no-repeat",
                    r = m.QC[c],
                    n = window === window.top;
                  document.documentElement.style.setProperty("background", `url(${CSS.escape(e)}) ${r} ${t} fixed border-box border-box ${n ? E.background : E.text}`),
                    n || document.documentElement.style.setProperty("background-blend-mode", "difference");
                };
                s
                  ? fetch(i, { ...b.P8, mode: "no-cors" })
                    .then(({ ok: e }) => {
                      if (!e) throw Error("Failed to load url");
                    })
                    .catch(() => e(s))
                  : (e(i), u && (R.current = window.setTimeout(L, b.KG)));
              }
            } else I();
          }, [E, e, t, D, I, o, d, a, S, p, j, l]);
        (0, i.useEffect)(() => {
          c && !window.DEBUG_DISABLE_WALLPAPER && (R.current && window.clearTimeout(R.current), j && !y.includes(j) ? L().catch(I) : I());
        }, [L, I, c, j]),
          (0, i.useEffect)(() => {
            let t = () => {
              if (!e.current || !m.dI[j]) return;
              let t = e.current.getBoundingClientRect();
              C.current?.postMessage(t);
              let r = e.current.querySelector(m.$3);
              r instanceof HTMLCanvasElement && ((r.style.width = `${t.width}px`), (r.style.height = `${t.height}px`));
            };
            return window.addEventListener("resize", t, { passive: !0 }), () => window.removeEventListener("resize", t);
          }, [e, j, C]);
      },
        E = r(54110),
        j = r(54162),
        T = r(73350),
        C = r(7502);
      let R = u.ZP.div(["background-color:#fff;border:1px solid #ccc;box-shadow:0 0 10px rgba(0,0,0,10%);display:flex;flex-direction:column;margin:auto;padding:0;position:absolute;width:600px;z-index:1000;"]),
        P = u.ZP.div(["align-items:center;background-color:#a2a2a2;border-bottom:1px solid #000;cursor:move;display:flex;justify-content:space-between;padding:10px;h2{margin:0;}"]),
        I = u.ZP.button(["background-color:red;border:none;color:white;cursor:pointer;padding:5px 10px;&:hover{background-color:darkred;}"]),
        D = u.ZP.div(["flex:1;overflow:hidden;padding:10px;position:relative;"]);
      u.ZP.div(["border:1px solid #ccc;padding:10px;"]);
      let L = u.ZP.div(['background-image:url("./System/Icons/48x48/documents.png");background-size:cover;cursor:pointer;display:inline-block;height:32px;width:32px;']);
      u.ZP.div(['background-image:url("./System/Icons/48x48/folder.png");background-size:cover;cursor:pointer;display:inline-block;height:80px;margin-right:5px;width:80px;']);
      let M = u.ZP.div(['background-image:url("./System/Icons/48x48/FolderWindows.png");background-size:cover;cursor:pointer;display:inline-block;height:80px;margin-right:5px;width:80px;']),
        z = u.ZP.div(['background-image:url("./System/Icons/48x48/desktop.png");background-size:cover;cursor:pointer;display:inline-block;height:80px;margin-right:5px;width:80px;']),
        $ = u.ZP.div(['background-image:url("./System/Icons/48x48/pictures.png");background-size:cover;cursor:pointer;display:inline-block;height:80px;margin-right:5px;width:80px;']),
        F = u.ZP.div(['background-image:url("./System/Icons/48x48/downloads.png");background-size:cover;cursor:pointer;display:inline-block;height:80px;margin-right:5px;width:80px;']),
        A = u.ZP.div(["background-color:#fff;border:1px solid #ccc;box-shadow:0 0 10px rgba(0,0,0,10%);display:flex;flex-direction:column;margin-top:10px;padding:10px;width:100%;"]),
        W = u.ZP.div(["align-items:center;cursor:pointer;display:flex;"]),
        q = u.ZP.button(["background-color:#007bff;border:none;border-radius:5px;color:white;cursor:pointer;margin-bottom:10px;padding:10px 20px;&:hover{background-color:#0056b3;}"]);
      var O = ({ id: e }) => {
        let [t, r] = (0, i.useState)(!0),
          [o, s] = (0, i.useState)("main"),
          [a, l] = (0, i.useState)(!1),
          [c, d] = (0, i.useState)({ x: 0, y: 0 }),
          [u, p] = (0, i.useState)({ x: 0, y: 0 }),
          h = (0, i.useRef)(null),
          m = (0, i.useRef)(null),
          { setMenu: f } = (0, C.H)(),
          x = (e) => {
            d({ x: e.clientX - u.x, y: e.clientY - u.y });
          },
          g = () => {
            document.removeEventListener("mousemove", x), document.removeEventListener("mouseup", g);
          },
          v = (e) => {
            s(e);
          };
        (0, i.useEffect)(() => {
          let e = h.current;
          e && ((e.style.left = `${c.x}px`), (e.style.top = `${c.y}px`));
        }, [c]),
          (0, i.useEffect)(() => {
            if (t && h.current) {
              let e = h.current,
                t = (window.innerWidth - e.offsetWidth) / 2,
                r = (window.innerHeight - e.offsetHeight) / 2;
              d({ x: t, y: r }), (e.style.left = `${t}px`), (e.style.top = `${r}px`), l(!0);
            }
          }, [t]),
          (0, i.useEffect)(() => {
            let e = m.current;
            e && ((e.style.height = "auto"), (e.style.height = `${e.scrollHeight}px`));
          }, [o]);
        let b = (e) => {
          e.preventDefault(),
            f({
              items: [
                { label: "Copy", action: w },
                { label: "Paste", action: y },
              ],
              x: e.clientX,
              y: e.clientY,
            });
        },
          w = () => {
            if (m.current) {
              let e = m.current.selectionStart,
                t = m.current.selectionEnd,
                r = m.current.value.substring(e, t);
              r &&
                navigator.clipboard
                  .writeText(r)
                  .then(() => {
                    f({ items: [], x: 0, y: 0 });
                  })
                  .catch((e) => { });
            }
          },
          y = () => {
            m.current &&
              navigator.clipboard.readText().then((e) => {
                m.current && (m.current.value = e), f({ items: [], x: 0, y: 0 });
              });
          };
        return (0, n.jsxs)("div", {
          onContextMenu: b,
          children: [
            (0, n.jsxs)("div", {
              children: [
                (0, n.jsx)(L, {
                  onDoubleClick: () => {
                    r((e) => !e);
                  },
                }),
                (0, n.jsx)("span", { children: "My Documents" }),
              ],
            }),
            t &&
            (0, n.jsxs)(R, {
              ref: h,
              style: { visibility: a ? "visible" : "hidden", left: `${c.x}px`, top: `${c.y}px` },
              children: [
                (0, n.jsxs)(P, {
                  onMouseDown: (e) => {
                    if (e.target !== e.currentTarget) return;
                    let t = h.current;
                    if (t) {
                      let r = t.getBoundingClientRect();
                      p({ x: e.clientX - r.left, y: e.clientY - r.top }), document.addEventListener("mousemove", x), document.addEventListener("mouseup", g);
                    }
                  },
                  children: [
                    (0, n.jsx)("h2", { children: "main" === o ? "My Documents" : o }),
                    (0, n.jsx)(I, {
                      onClick: () => {
                        r(!1), l(!1);
                      },
                      children: "X",
                    }),
                  ],
                }),
                (0, n.jsxs)(D, {
                  children: [
                    "main" === o &&
                    (0, n.jsxs)(n.Fragment, {
                      children: [
                        (0, n.jsxs)(W, { onDoubleClick: () => v("Letter.doc"), children: [(0, n.jsx)(M, {}), (0, n.jsx)("span", { children: "Letter.doc" })] }),
                        (0, n.jsxs)(W, { onDoubleClick: () => v("Desktop"), children: [(0, n.jsx)(z, {}), (0, n.jsx)("span", { children: "Desktop" })] }),
                        (0, n.jsxs)(W, { onDoubleClick: () => v("Pictures"), children: [(0, n.jsx)($, {}), (0, n.jsx)("span", { children: "Pictures" })] }),
                        (0, n.jsxs)(W, { onDoubleClick: () => v("Downloads"), children: [(0, n.jsx)(F, {}), (0, n.jsx)("span", { children: "Downloads" })] }),
                      ],
                    }),
                    "main" !== o &&
                    (0, n.jsxs)(n.Fragment, {
                      children: [
                        (0, n.jsx)(q, {
                          onClick: () => {
                            s("main");
                          },
                          children: "Back",
                        }),
                        (0, n.jsx)(A, {
                          children: (0, n.jsx)("textarea", {
                            ref: m,
                            readOnly: !0,
                            value:
                              "Letter.doc" === o
                                ? `From: jtelford@rdiCorp.com
To: Andy@rdiCorp.com
Cc: Mike@rdiCorp.com
Subject: Update on Software Development Progress

Hi Andy,

I hope this email finds you well.

I wanted to provide you with a quick update on the current progress of our software development project. Over the past few weeks, our team has been working diligently to meet our milestones, and I am pleased to report that we are on track to meet our upcoming deadlines.

Here are some key updates:
1. **Feature Development**: The development team has successfully implemented the core functionalities of the application. We are currently in the testing phase to ensure everything operates smoothly.
2. **Bug Fixes**: Our QA team has identified and resolved several critical bugs. The system's stability has significantly improved, and we are working on fine-tuning the performance.
3. **User Interface**: The UI/UX team has completed the initial design and is now working on enhancing the user experience based on the feedback received during our last review meeting.

Moving forward, we have a few action items to focus on:
- **Final Testing**: Continue rigorous testing to identify any remaining issues and ensure the application is ready for deployment.
- **Documentation**: Finalize the user documentation and training materials for our internal teams and end-users.
- **Deployment Plan**: Prepare for the deployment phase, including setting up the necessary infrastructure and ensuring all dependencies are in place.

If you have any questions or need further details on any specific aspects, please feel free to reach out.

Best regards,
RDI Corporation
jtelford@rdiCorp.com
                  `
                                : "Desktop" === o
                                  ? "This is my second folder"
                                  : "Pictures" === o
                                    ? "This is my third folder"
                                    : "This is my fourth folder",
                            onContextMenu: b,
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        });
      },
        Z = r(93343),
        H = ({ children: e, id: t }) => {
          let r = (0, i.useRef)(null),
            [o, s] = (0, i.useState)({ email: !1, RDIChat: !1, TextFolder: !1 });
          S(r);
          let [a, l] = (0, i.useState)(null),
            c = (0, i.useRef)(0),
            d = (0, i.useRef)(null),
            u = (e) => {
              switch ((l(e), e)) {
                case "Email.url":
                  s((e) => ({ ...e, email: !e.email }));
                  break;
                case "RDIChat.url":
                  s((e) => ({ ...e, RDIChat: !e.RDIChat }));
                  break;
                case "TextFolder.url":
                  s((e) => ({ ...e, TextFolder: !e.TextFolder }));
              }
            },
            h = (e) => {
              l(e);
            },
            m = (e) => {
              switch ((l(e), e)) {
                case "Email.url":
                  s((e) => ({ ...e, email: !e.email }));
                  break;
                case "RDIChat.url":
                  s((e) => ({ ...e, RDIChat: !e.RDIChat }));
                  break;
                case "TextFolder.url":
                  s((e) => ({ ...e, TextFolder: !e.TextFolder }));
              }
            };
          return (0, n.jsxs)(p, {
            ref: r,
            children: [
              (0, n.jsx)(E.Z, {
                url: b.Ll,
                view: "icon",
                allowMovingDraggableEntries: !0,
                hideLoading: !0,
                hideScrolling: !0,
                isDesktop: !0,
                loadIconsImmediately: !0,
                customIcons: [
                  {
                    "data-file": "Email.url",
                    style: { gridColumnStart: 1, gridRowStart: 3, backgroundColor: "Email.url" === a ? "" : "transparent" },
                    iconProps: {
                      "aria-label": "Email",
                      title: "Opens Email Application",
                      alt: "Outlook",
                      src: "./System/Icons/16x16/outlookemail.png",
                      srcSet: "./System/Icons/32x32/outlookemail.png 1x, ./System/Icons/48x48/outlookemail.png 2x, ./System/Icons/96x96/outlookemail.png 3x, ./System/Icons/144x144/outlookemail.png 4x",
                    },
                  },
                  {
                    "data-file": "RDIChat.url",
                    style: { gridColumnStart: 1, gridRowStart: 4, backgroundColor: "RDIChat.url" === a ? "" : "transparent" },
                    iconProps: {
                      "aria-label": "RDIChat",
                      title: "Opens RDIChat Application",
                      alt: "RDIChat",
                      src: "./System/Icons/16x16/chat.png",
                      srcSet: "./System/Icons/32x32/chat.png 1x, ./System/Icons/48x48/chat.png 2x, ./System/Icons/96x96/chat.png 3x, ./System/Icons/144x144/chat.png 4x",
                    },
                  },
                  {
                    "data-file": "TextFolder.url",
                    style: { gridColumnStart: 1, gridRowStart: 5, backgroundColor: "TextFolder.url" === a ? "" : "transparent" },
                    iconProps: {
                      "aria-label": "My Documents",
                      title: "Opens TextFolder Application",
                      alt: "My Documents",
                      src: "./System/Icons/48x48/folder.png",
                      srcSet: "./System/Icons/32x32/folder.png 1x, ./System/Icons/16x16/folder.png 2x, ./System/Icons/96x96/folder.png 3x, ./System/Icons/144x144/folder.png 4x",
                    },
                  },
                ],
                onFileOpen: (e) => {
                  let t = Date.now();
                  t - c.current < 300
                    ? (d.current && clearTimeout(d.current), m(e))
                    : (h(e),
                      l(e),
                      (d.current = setTimeout(() => {
                        u(e), (d.current = null);
                      }, 300))),
                    (c.current = t);
                },
                onFileDoubleClick: m,
                onFileSingleClick: h,
              }),
              o.email && (0, n.jsx)(j.default, { id: t }, `email-${o.email}`),
              o.RDIChat && (0, n.jsx)(Z.dr, { children: (0, n.jsx)(T.default, { id: t }, `RDIChat-${o.RDIChat}`) }),
              o.TextFolder && (0, n.jsx)(O, { id: t }, `TextFolder-${o.TextFolder}`),
              e,
            ],
          });
        },
        B = r(6155);
      let N = u.ZP.div(
        [
          "color:",
          ";display:flex;font-size:",
          ";height:100%;max-width:",
          ";min-width:",
          "px;padding:",
          ";place-content:center;place-items:center;position:absolute;right:0;white-space:nowrap;&:hover{background-color:",
          ";}&:active{background-color:",
          ";}",
        ],
        ({ theme: e }) => e.colors.text,
        ({ theme: e }) => e.sizes.clock.fontSize,
        ({ theme: e, $width: t }) => `calc(${t}px + ${2 * e.sizes.clock.padding}px)`,
        ({ $width: e }) => e,
        ({ theme: e }) => `0 ${e.sizes.clock.padding}px`,
        ({ theme: e }) => e.colors.taskbar.hover,
        ({ theme: e }) => e.colors.taskbar.foreground
      );
      var U = (e) => {
        let { contextMenu: t } = (0, C.H)(),
          { clockSource: r, setClockSource: n } = (0, g.k)();
        return (0, i.useMemo)(
          () =>
            t?.(() => {
              e(!1);
              let t = "local" === r;
              return [
                { action: () => n("local"), label: "Local time", toggle: t },
                { action: () => n("ntp"), label: "Server time", toggle: !t },
              ];
            }),
          [r, t, n, e]
        );
      };
      let V = { local: "Local", ntp: "Server" },
        _ = 7,
        K = () => {
          _ = 7;
        },
        X = async ({ target: e }) => {
          if ((7 === _ && e instanceof HTMLElement && (e.removeEventListener("mouseleave", K), e.addEventListener("mouseleave", K, b.K7)), 0 == (_ -= 1))) {
            let { default: e } = await r.e(2163, "high").then(r.bind(r, 82163));
            e(), (_ = 7);
          }
        };
      var Y = (0, i.memo)(({ setClockWidth: e, toggleCalendar: t, width: o }) => {
        let [s, a] = (0, i.useState)(Object.create(null)),
          { date: l, time: c } = s,
          { clockSource: d } = (0, g.k)(),
          p = (0, i.useCallback)(() => new Worker(r.tu(new URL(r.p + r.u(2552), r.b)), { name: `Clock (${V[d]})` }), [d]),
          h = (0, i.useRef)(),
          m = (0, i.useMemo)(() => "OffscreenCanvas" in window, []),
          f = (0, i.useCallback)(
            ({ data: e, target: t }) => {
              "source" === e ? t.postMessage(d) : a((t) => (h.current && t.date === e.date ? t : e));
            },
            [d]
          ),
          x = U(t),
          y = (0, v.Z)(p, f),
          k = (0, i.useRef)({ height: b.bK, width: o }),
          {
            formats: { systemFont: S },
            sizes: {
              clock: { fontSize: E },
            },
          } = (0, u.Fg)(),
          j = (0, i.useCallback)(() => Math.min(Math.max(b.Ml, Math.ceil((0, B.X1)("44:44:44 AM", E, S))), 1.5 * b.Ml), [E, S]),
          T = (0, i.useCallback)(
            (t) => {
              !h.current &&
                y.current &&
                t instanceof HTMLDivElement &&
                ([...t.children].forEach((e) => e.remove()),
                  (k.current.width = j()),
                  e(k.current.width),
                  (h.current = (0, w.nS)(t, window.devicePixelRatio, k.current)),
                  y.current.postMessage({ canvas: h.current, devicePixelRatio: window.devicePixelRatio }, [h.current]));
            },
            [y, s]
          ),
          C = (0, i.useCallback)(
            (e) => {
              X(e), t();
            },
            [t]
          );
        return ((0, i.useEffect)(() => {
          h.current = void 0;
        }, [d]),
          (0, i.useEffect)(() => {
            if (m) {
              let e = () =>
                window.matchMedia(`(resolution: ${window.devicePixelRatio}x)`).addEventListener(
                  "change",
                  () => {
                    y.current?.postMessage({ clockSize: k.current, devicePixelRatio: window.devicePixelRatio }), e();
                  },
                  b.K7
                );
              e();
            } else e(j());
          }, [y, j, e, m]),
          c)
          ? (0, n.jsx)(N, { ref: m ? T : void 0, $width: o, "aria-label": "Clock", onClick: C, role: "timer", title: l, suppressHydrationWarning: !0, ...x, ...b.LL, children: m ? void 0 : c })
          : null;
      }),
        G = r(28853),
        J = r(67278);
      let Q = (0, u.ZP)(J.Z)(
        [
          "background-color:",
          ";display:flex;fill:",
          ";height:100%;left:",
          ";place-content:center;place-items:center;position:absolute;&&{width:",
          "px;}svg{height:",
          ";}&:hover{background-color:",
          ";svg{fill:",
          ";}}&:active{background-color:hsla(0,0%,20%,70%);svg{fill:",
          ";}}",
        ],
        ({ $active: e, $highlight: t, theme: r }) => e && (t ? r.colors.taskbar.foreground : "hsla(0, 0%, 25%, 50%)"),
        ({ theme: e }) => e.colors.taskbar.button.color,
        ({ $left: e }) => (e ? `${e}px` : 0),
        ({ theme: e }) => e.sizes.taskbar.button.width,
        ({ theme: e }) => e.sizes.taskbar.button.iconSize,
        ({ $active: e, theme: t }) => (e ? t.colors.taskbar.foreground : t.colors.taskbar.hover),
        ({ $highlight: e, theme: t }) => (e ? t.colors.highlight : void 0),
        ({ $highlight: e }) => (e ? "hsla(207, 100%, 60%, 80%)" : void 0)
      );
      var ee = r(80155),
        et = r(8955),
        er = r(86178),
        en = (e = !1) => {
          let { contextMenu: t } = (0, C.H)(),
            { minimize: r, open: n } = (0, l.z)(),
            { stackOrder: o } = (0, g.k)(),
            s = (0, er.R)(),
            { fullscreenElement: a, toggleFullscreen: c } = (0, et.S)();
          return (0, i.useMemo)(
            () =>
              t?.(() => {
                let t = Object.entries(s.current),
                  i = t.length > 0 && !t.some(([, { minimized: e }]) => !e),
                  l = [{ action: () => w.xr(s.current, o, r), label: e ? "Desktop" : i ? "Show open windows" : "Show the desktop" }];
                return (
                  e
                    ? l.unshift({ action: () => n("Terminal"), label: "Terminal" }, b.Os, { action: () => n("FileExplorer"), label: "File Explorer" }, { action: () => n("Run"), label: "Run" }, b.Os)
                    : l.unshift({ action: () => c(), label: a === document.documentElement ? "Exit full screen" : "Enter full screen" }, b.Os),
                  l
                );
              }),
            [t, a, r, e, n, s, o, c]
          );
        },
        ei = ({ searchVisible: e, toggleSearch: t }) => {
          let {
            sizes: { taskbar: r },
          } = (0, u.Fg)();
          return (0, n.jsx)(Q, { $active: e, $left: r.button.width, onClick: () => t(), ...b.Yj, ...(0, w.PS)(ee.Hr), ...en(), children: (0, n.jsx)(G.ol, {}) });
        };
      let eo = (0, i.memo)(() => (0, n.jsx)("img", { src: "./System/Icons/Favicons/16x16/WindowsG.png", alt: "Start Button Icon", style: { width: "100%", height: "100%" } }));
      var es = ({ startMenuVisible: e, toggleStartMenu: t }) => {
        let [o, s] = (0, i.useState)(!1),
          a = (0, i.useRef)(!1),
          l = (0, i.useCallback)(async () => {
            if (a.current) return;
            a.current = !0;
            let e = Object.prototype.hasOwnProperty.call(HTMLLinkElement.prototype, "imageSrcset"),
              t = [...document.querySelectorAll("link[rel=preload]")],
              n = (await r.e(8530, "high").then(r.t.bind(r, 18530, 19))).default;
            n?.forEach((r) => {
              let n = document.createElement("link");
              if (((n.as = "image"), (n.fetchPriority = "high"), (n.rel = "preload"), (n.type = "image/webp"), w.qs(r))) {
                if (e) n.imageSrcset = w.km(r, 48, ".webp");
                else {
                  let [e] = w.RU(r, 48, w.bN(), ".webp").split(" ");
                  n.href = e;
                }
              } else n.href = r;
              t.some((e) => (n.imageSrcset && e?.imageSrcset?.endsWith(n.imageSrcset)) || (n.href && e?.href?.endsWith(n.href))) || document.head.append(n);
            }),
              s(!0);
          }, []),
          c = (0, i.useCallback)(
            async ({ ctrlKey: e, shiftKey: n }) => {
              if ((o || l(), t(), e && n)) {
                let { default: e } = await r.e(2163, "high").then(r.bind(r, 82163));
                e();
              }
            },
            [l, o, t]
          );
        return (0, n.jsx)(Q, { $active: e, onClick: c, onMouseOver: o ? void 0 : l, $highlight: !0, ...b.Yj, ...(0, w.PS)(ee.rF), ...en(!0), children: (0, n.jsx)(eo, {}) });
      };
      let ea = u.ZP.nav(
        ["backdrop-filter:", ";background-color:", ";bottom:0;contain:size layout;height:", "px;left:0;position:absolute;right:0;width:100vw;z-index:100000;"],
        ({ theme: e }) => `blur(${e.sizes.taskbar.blur})`,
        ({ theme: e }) => e.colors.taskbar.background,
        b.bK
      ),
        el = u.ZP.ol(
          ["column-gap:1px;display:flex;height:100%;left:", "px;margin:0 3px;overflow:hidden;position:absolute;right:", ";"],
          ({ theme: e }) => 2 * e.sizes.taskbar.button.width,
          ({ $clockWidth: e, theme: t }) => `calc(${e}px + ${2 * t.sizes.clock.padding}px)`
        ),
        ec = a()(() => r.e(2719, "high").then(r.bind(r, 22719)), { loadableGenerated: { webpack: () => [22719] } });
      var ed = (0, i.memo)(({ clockWidth: e }) => {
        let { processes: t = {} } = (0, l.z)();
        return (0, n.jsx)(el, {
          $clockWidth: e,
          children: (0, n.jsx)(o.M, {
            initial: !1,
            presenceAffectsLayout: !1,
            children: Object.entries(t)
              .filter(([, { closing: e, hideTaskbarEntry: t }]) => !e && !t)
              .map(([e, { icon: t, title: r }]) => (0, n.jsx)(ec, { icon: t, id: e, title: r }, e)),
          }),
        });
      });
      let eu = a()(() => r.e(9641, "high").then(r.bind(r, 19641)), { loadableGenerated: { webpack: () => [19641] } }),
        ep = a()(() => r.e(3638, "high").then(r.bind(r, 53638)), { loadableGenerated: { webpack: () => [53638] } }),
        eh = a()(() => r.e(2410, "high").then(r.bind(r, 32410)), { loadableGenerated: { webpack: () => [32410] } });
      var em = (0, i.memo)(() => {
        let [e, t] = (0, i.useState)(!1),
          [r, s] = (0, i.useState)(!1),
          [a, l] = (0, i.useState)(!1),
          [c, d] = (0, i.useState)(b.Ml),
          u = (0, i.useCallback)((e) => t((t) => e ?? !t), []),
          p = (0, i.useCallback)((e) => s((t) => e ?? !t), []),
          h = (0, i.useCallback)((e) => l((t) => e ?? !t), []);
        return (0, n.jsxs)(n.Fragment, {
          children: [
            (0, n.jsxs)(o.M, { initial: !1, presenceAffectsLayout: !1, children: [e && (0, n.jsx)(eh, { toggleStartMenu: u }, "startMenu"), r && (0, n.jsx)(ep, { toggleSearch: p }, "search")] }),
            (0, n.jsxs)(ea, {
              ...en(),
              ...b.LL,
              children: [
                (0, n.jsx)(es, { startMenuVisible: e, toggleStartMenu: u }),
                (0, n.jsx)(ei, { searchVisible: r, toggleSearch: p }),
                (0, n.jsx)(ed, { clockWidth: c }),
                (0, n.jsx)(Y, { setClockWidth: d, toggleCalendar: h, width: c }),
              ],
            }),
            (0, n.jsx)(o.M, { initial: !1, presenceAffectsLayout: !1, children: a && (0, n.jsx)(eu, { toggleCalendar: h }) }),
          ],
        });
      }),
        ef = () => {
          (0, i.useEffect)(() => {
            let e = (e) => {
              e.error?.stack?.includes("eval at <anonymous>") && (0, w.nK)(e);
            };
            return window.addEventListener("error", e), () => window.removeEventListener("error", e);
          }, []);
        };
      let ex = (e) => document.querySelector(`main > nav > div[title='${e}']`),
        eg = !1,
        ev = !1,
        eb = !1,
        ew = (e) => (
          (0, w.nK)(e),
          !!eb ||
          ((eb = !0),
            setTimeout(() => {
              eb = !1;
            }, b._2),
            !1)
        ),
        ey = new Set(["ARROWDOWN", "ARROWUP", "D", "E", "R", "S", "X"]),
        ek = (e) => {
          let { altKey: t, ctrlKey: r, shiftKey: n, metaKey: i } = e;
          window.globalKeyStates = { altKey: t, ctrlKey: r, metaKey: i, shiftKey: n };
        };
      var eS = () => {
        let { closeWithTransition: e, maximize: t, minimize: r, open: n } = (0, l.z)(),
          o = (0, er.R)(),
          { foregroundId: s, stackOrder: a } = (0, g.k)(),
          { fullscreenElement: c, toggleFullscreen: d } = (0, et.S)(),
          u = (0, i.useRef)({}),
          p = (0, i.useRef)({
            E: () => n("FileExplorer"),
            ESCAPE: () => ex(ee.rF)?.click(),
            F10: () => n("Terminal"),
            F12: () => n("DevTools"),
            F5: () => window.location.reload(),
            R: () => n("Run"),
            S: () => ex(ee.Hr)?.click(),
            X: () => ex(ee.rF)?.dispatchEvent(new MouseEvent("contextmenu", { clientX: 1, clientY: w.sI() - 1 })),
          });
        (0, i.useEffect)(() => {
          let e = (e) => {
            ek(e);
            let { altKey: t, ctrlKey: r, key: n, shiftKey: i, target: o } = e,
              s = n?.toUpperCase();
            !(!s || (o instanceof HTMLInputElement && "text" === o.type) || o instanceof HTMLTextAreaElement || o.isContentEditable) &&
              (i
                ? (r || !ey.has(s)) && p.current?.[s] && !ew(e) && p.current[s]()
                : "F11" === s
                  ? ((0, w.nK)(e), d().then((e) => e))
                  : document.activeElement === document.body && s.startsWith("ARROW")
                    ? document.body.querySelector("main ol li button")?.dispatchEvent(new MouseEvent("mousedown", { bubbles: !0 }))
                    : r && t && u.current?.[s]
                      ? u.current?.[s]?.()
                      : c === document.documentElement &&
                      ("META" === s
                        ? (eg = !0)
                        : t && u.current?.[s]
                          ? ((0, w.nK)(e), u.current?.[s]?.())
                          : "ESCAPE" === s
                            ? document.pointerLockElement
                              ? document.exitPointerLock()
                              : d().then((e) => e)
                            : eg && ey.has(s) && p.current?.[s] && !ew(e) && ((ev = !0), p.current[s]())));
          },
            t = (e) => {
              ek(e), eg && c === document.documentElement && e.key?.toUpperCase() === "META" && ((eg = !1), ev ? (ev = !1) : ex(ee.rF)?.click());
            };
          return (
            document.addEventListener("keydown", e, { capture: !0 }),
            document.addEventListener("keyup", t, { capture: !0, passive: !0 }),
            () => {
              document.removeEventListener("keydown", e, { capture: !0 }), document.removeEventListener("keyup", t, { capture: !0 });
            }
          );
        }, [c, d]),
          (0, i.useEffect)(() => {
            u.current = { ...u.current, F4: () => e(s) };
          }, [e, s]),
          (0, i.useEffect)(() => {
            p.current = {
              ...p.current,
              ARROWDOWN: () => {
                let { hideMinimizeButton: e = !1, maximized: n, minimized: i } = o.current[s];
                n ? t(s) : i || e || r(s);
              },
              ARROWUP: () => {
                let { allowResizing: e = !0, hideMaximizeButton: n = !1, maximized: i, minimized: a } = o.current[s];
                a ? r(s) : i || !e || n || t(s);
              },
              D: () => (0, w.xr)(o.current, a, r),
            };
          }, [s, t, r, o, a]);
      },
        eE = () => {
          let { setForegroundId: e } = (0, g.k)(),
            t = (0, er.R)();
          (0, i.useEffect)(() => {
            let r = () => {
              if (document.activeElement instanceof HTMLIFrameElement) {
                let [r] = Object.entries(t.current).find(([, { componentWindow: e }]) => e?.contains(document.activeElement)) || [];
                r &&
                  (e(r),
                    window.addEventListener(
                      "click",
                      ({ target: r }) => {
                        let [n = ""] = Object.entries(t.current).find(([, { componentWindow: e }]) => r instanceof HTMLElement && e?.contains(r)) || [];
                        e(n);
                      },
                      b.K7
                    ));
              }
            };
            return window.addEventListener("blur", r, { passive: !0 }), () => window.removeEventListener("blur", r);
          }, [t, e]);
        },
        ej = r(37176);
      let eT = (e) => e.startsWith("http://") || e.startsWith("https://") || e.startsWith("chrome://");
      var eC = () => {
        let { exists: e, fs: t } = (0, x.o)(),
          { open: r } = (0, l.z)(),
          n = (0, i.useRef)(!1);
        (0, i.useEffect)(() => {
          if (n.current || !t || !e || !r) return;
          n.current = !0;
          let i = (0, w.kp)("app"),
            o = (0, w.kp)("url"),
            s = async (t) => {
              if (!t) return;
              let n = !1;
              try {
                n = ("Browser" === t && eT(o)) || (await e(o));
              } catch { }
              ("FileExplorer" !== t || !o || n) && r(t, n ? { url: o } : void 0);
            };
          if (i) s(Object.fromEntries(Object.keys(ej.Z).map((e) => [e.toLowerCase(), e]))[i.toLowerCase()]);
          else if (o) {
            let e = (0, w.RT)(o);
            s(eT(o) ? "Browser" : e ? (0, B.Wd)(e) : "FileExplorer");
          }
        }, [e, t, r]);
      },
        eR = (0, i.memo)(() => (eE(), eC(), eS(), ef(), (0, n.jsxs)(H, { id: "desktop-1", children: [(0, n.jsx)(em, {}), (0, n.jsx)(d, {})] })));
    },
    51526: function (e, t, r) {
      "use strict";
      r.d(t, {
        M: function () {
          return v;
        },
      });
      var n = r(85893),
        i = r(67294),
        o = r(58868);
      function s() {
        let e = (0, i.useRef)(!1);
        return (
          (0, o.L)(
            () => (
              (e.current = !0),
              () => {
                e.current = !1;
              }
            ),
            []
          ),
          e
        );
      }
      var a = r(26166),
        l = r(240),
        c = r(96681),
        d = r(16014);
      class u extends i.Component {
        getSnapshotBeforeUpdate(e) {
          let t = this.props.childRef.current;
          if (t && e.isPresent && !this.props.isPresent) {
            let e = this.props.sizeRef.current;
            (e.height = t.offsetHeight || 0), (e.width = t.offsetWidth || 0), (e.top = t.offsetTop), (e.left = t.offsetLeft);
          }
          return null;
        }
        componentDidUpdate() { }
        render() {
          return this.props.children;
        }
      }
      function p({ children: e, isPresent: t }) {
        let r = (0, i.useId)(),
          o = (0, i.useRef)(null),
          s = (0, i.useRef)({ width: 0, height: 0, top: 0, left: 0 }),
          { nonce: a } = (0, i.useContext)(d._);
        return (
          (0, i.useInsertionEffect)(() => {
            let { width: e, height: n, top: i, left: l } = s.current;
            if (t || !o.current || !e || !n) return;
            o.current.dataset.motionPopId = r;
            let c = document.createElement("style");
            return (
              a && (c.nonce = a),
              document.head.appendChild(c),
              c.sheet &&
              c.sheet.insertRule(`
        [data-motion-pop-id="${r}"] {
          position: absolute !important;
          width: ${e}px !important;
          height: ${n}px !important;
          top: ${i}px !important;
          left: ${l}px !important;
        }
      `),
              () => {
                document.head.removeChild(c);
              }
            );
          }, [t]),
          (0, n.jsx)(u, { isPresent: t, childRef: o, sizeRef: s, children: i.cloneElement(e, { ref: o }) })
        );
      }
      let h = ({ children: e, initial: t, isPresent: r, onExitComplete: o, custom: s, presenceAffectsLayout: a, mode: d }) => {
        let u = (0, c.h)(m),
          h = (0, i.useId)(),
          f = (0, i.useMemo)(
            () => ({
              id: h,
              initial: t,
              isPresent: r,
              custom: s,
              onExitComplete: (e) => {
                for (let t of (u.set(e, !0), u.values())) if (!t) return;
                o && o();
              },
              register: (e) => (u.set(e, !1), () => u.delete(e)),
            }),
            a ? [Math.random()] : [r]
          );
        return (
          (0, i.useMemo)(() => {
            u.forEach((e, t) => u.set(t, !1));
          }, [r]),
          i.useEffect(() => {
            r || u.size || !o || o();
          }, [r]),
          "popLayout" === d && (e = (0, n.jsx)(p, { isPresent: r, children: e })),
          (0, n.jsx)(l.O.Provider, { value: f, children: e })
        );
      };
      function m() {
        return new Map();
      }
      var f = r(25364),
        x = r(45487);
      let g = (e) => e.key || "",
        v = ({ children: e, custom: t, initial: r = !0, onExitComplete: l, exitBeforeEnter: c, presenceAffectsLayout: d = !0, mode: u = "sync" }) => {
          var p;
          (0, x.k)(!c, "Replace exitBeforeEnter with mode='wait'");
          let m =
            (0, i.useContext)(f.p).forceRender ||
            (function () {
              let e = s(),
                [t, r] = (0, i.useState)(0),
                n = (0, i.useCallback)(() => {
                  e.current && r(t + 1);
                }, [t]);
              return [(0, i.useCallback)(() => a.Wi.postRender(n), [n]), t];
            })()[0],
            v = s(),
            b = (function (e) {
              let t = [];
              return (
                i.Children.forEach(e, (e) => {
                  (0, i.isValidElement)(e) && t.push(e);
                }),
                t
              );
            })(e),
            w = b,
            y = (0, i.useRef)(new Map()).current,
            k = (0, i.useRef)(w),
            S = (0, i.useRef)(new Map()).current,
            E = (0, i.useRef)(!0);
          if (
            ((0, o.L)(() => {
              (E.current = !1),
                (function (e, t) {
                  e.forEach((e) => {
                    let r = g(e);
                    t.set(r, e);
                  });
                })(b, S),
                (k.current = w);
            }),
              (p = () => {
                (E.current = !0), S.clear(), y.clear();
              }),
              (0, i.useEffect)(() => () => p(), []),
              E.current)
          )
            return (0, n.jsx)(n.Fragment, { children: w.map((e) => (0, n.jsx)(h, { isPresent: !0, initial: !!r && void 0, presenceAffectsLayout: d, mode: u, children: e }, g(e))) });
          w = [...w];
          let j = k.current.map(g),
            T = b.map(g),
            C = j.length;
          for (let e = 0; e < C; e++) {
            let t = j[e];
            -1 !== T.indexOf(t) || y.has(t) || y.set(t, void 0);
          }
          return (
            "wait" === u && y.size && (w = []),
            y.forEach((e, r) => {
              if (-1 !== T.indexOf(r)) return;
              let i = S.get(r);
              if (!i) return;
              let o = j.indexOf(r),
                s = e;
              s ||
                ((s = (0, n.jsx)(
                  h,
                  {
                    isPresent: !1,
                    onExitComplete: () => {
                      y.delete(r);
                      let e = Array.from(S.keys()).filter((e) => !T.includes(e));
                      if (
                        (e.forEach((e) => S.delete(e)),
                          (k.current = b.filter((t) => {
                            let n = g(t);
                            return n === r || e.includes(n);
                          })),
                          !y.size)
                      ) {
                        if (!1 === v.current) return;
                        m(), l && l();
                      }
                    },
                    custom: t,
                    presenceAffectsLayout: d,
                    mode: u,
                    children: i,
                  },
                  g(i)
                )),
                  y.set(r, s)),
                w.splice(o, 0, s);
            }),
            (w = w.map((e) => {
              let t = e.key;
              return y.has(t) ? e : (0, n.jsx)(h, { isPresent: !0, presenceAffectsLayout: d, mode: u, children: e }, g(e));
            })),
            (0, n.jsx)(n.Fragment, { children: y.size ? w : w.map((e) => (0, i.cloneElement)(e)) })
          );
        };
    },
    45487: function (e, t, r) {
      "use strict";
      r.d(t, {
        K: function () {
          return i;
        },
        k: function () {
          return o;
        },
      });
      var n = r(81662);
      let i = n.Z,
        o = n.Z;
    },
  },
  function (e) {
    e.O(0, [4110, 4162, 2888, 9774, 179], function () {
      return e((e.s = 48312));
    }),
      (_N_E = e.O());
  },
]);







// (self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5405],{48312:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r(79708)}])},93343:function(e,t,r){"use strict";r.d(t,{aF:function(){return c},dr:function(){return l},nb:function(){return o},r:function(){return s}});var n=r(85893),i=r(67294);let o=["RDI-Applicant","Asako Satoshi","Lily Wang","Madison Byers","Dominic Gonzalez","Simone Khan"],s={"RDI-Applicant":"System/Icons/avatars/rdi.png","Asako Satoshi":"System/Icons/avatars/Asako Satoshi.png","Lily Wang":"System/Icons/avatars/Lily Wang.png","Madison Byers":"System/Icons/avatars/Madison Byers.png","Dominic Gonzalez":"System/Icons/avatars/Dominic Gonzalez.png","Simone Khan":"System/Icons/avatars/Simone Khan.png"},a=(0,i.createContext)(void 0),l=({children:e})=>{let[t,r]=(0,i.useState)(o[0]);return(0,n.jsx)(a.Provider,{value:{currentUser:t,setCurrentUser:r},children:e})},c=()=>{let e=(0,i.useContext)(a);if(!e)throw Error("useUser must be used within a UserProvider");return e}},73350:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return w}});var n=r(85893),i=r(67294),o=r(7502),s=r(10508);let a=s.ZP.div(["background-color:#f9f9f9;border-radius:8px;box-shadow:0 0 10px rgba(0,0,0,10%);display:flex;flex-direction:column;height:600px;padding:20px;position:absolute;width:400px;z-index:1000;"]),l=s.ZP.div(["align-items:center;background-color:#a2a2a2;border-bottom:1px solid #000;cursor:move;display:flex;justify-content:space-between;padding:10px;h2{margin:0;}"]),c=s.ZP.button(["background-color:#007bff;border:none;border-radius:4px;color:white;cursor:pointer;padding:5px 10px;&:hover{background-color:#0056b3;}"]),d=s.ZP.div(["display:flex;height:40px;justify-content:flex-end;padding:5px;"]),u=s.ZP.div(["border:1px solid #ccc;border-radius:4px;flex:1;margin-bottom:15px;overflow-y:auto;padding:10px;"]),p=s.ZP.div(["background-color:#007bff;border-radius:4px;color:white;margin-bottom:10px;padding:10px;&:nth-child(even){background-color:#f1f1f1;color:black;}"]),h=s.ZP.div(["display:flex;select,input{border:1px solid #ccc;border-radius:4px;flex:1;margin-right:10px;padding:10px;}button{background-color:#007bff;border:none;border-radius:4px;color:white;cursor:pointer;padding:10px 15px;&:hover{background-color:#0056b3;}}"]),m=s.ZP.button(["background-color:red;border:none;border-radius:4px;color:white;cursor:pointer;padding:5px 10px;position:absolute;right:5px;top:5px;&:hover{background-color:darkred;}"]),f=s.ZP.div(["align-items:center;cursor:pointer;display:flex;span{font-size:18px;font-weight:bold;margin-left:10px;}"]),x=s.ZP.div(["display:flex;flex-direction:column;"]),g=s.ZP.div(["align-items:center;cursor:pointer;display:flex;padding:10px;&:hover{background-color:#b7b5b5;}img{border-radius:50%;height:40px;margin-right:10px;width:40px;}.notification-container{align-items:center;display:flex;margin-top:5px;}.user-details{display:flex;flex-direction:column;}.user-name{align-items:center;display:flex;}.notification-dot{align-items:center;background-color:red;border-radius:50%;color:white;display:flex;font-size:12px;height:20px;justify-content:center;margin-left:5px;width:20px;}small{color:#888;display:flex;flex-direction:column;margin-top:5px;}"]);var v=r(93343),b=r(73839),w=()=>{let[e,t]=(0,i.useState)(""),[r,s]=(0,i.useState)([]),[w,y]=(0,i.useState)(null),[k,S]=(0,i.useState)(!0),[E,j]=(0,i.useState)(!1),T=(0,i.useRef)(null),{currentUser:C}=(0,v.aF)(),[R,P]=(0,i.useState)({x:0,y:0}),[I,D]=(0,i.useState)({x:0,y:0}),[L,M]=(0,i.useState)(!0),[z,$]=(0,i.useState)({}),{setMenu:F}=(0,o.H)(),A=(0,i.useRef)(null),[W,q]=(0,i.useState)(""),O=e=>{P({x:e.clientX-I.x,y:e.clientY-I.y})},Z=()=>{document.removeEventListener("mousemove",O),document.removeEventListener("mouseup",Z)},H=e=>r.slice().reverse().find(t=>t.user===e);(0,i.useEffect)(()=>{let e=T.current;e&&(e.style.left=`${R.x}px`,e.style.top=`${R.y}px`)},[R]),(0,i.useEffect)(()=>{if(k&&T.current){let e=T.current,t=(window.innerWidth-e.offsetWidth)/2,r=(window.innerHeight-e.offsetHeight)/2;P({x:t,y:r}),e.style.left=`${t}px`,e.style.top=`${r}px`,j(!0)}},[k]),(0,i.useEffect)(()=>{if(k){let e=setTimeout(()=>{s(e=>[...e,{user:"Asako Satoshi",text:"Please send me the SalesReport URL"}]),$(e=>({...e,"Asako Satoshi":!0}))},1e3),t=setTimeout(()=>{s(e=>[...e,{user:"Dominic Gonzalez",text:"Please send me the RDI sales summary"}]),$(e=>({...e,"Dominic Gonzalez":!0}))},3e3),r=setTimeout(()=>{s(e=>[...e,{user:"Lily Wang",text:"Please send me the year of the first modern Olympics"}]),$(e=>({...e,"Lily Wang":!0}))},5e3);return()=>{clearTimeout(e),clearTimeout(t),clearTimeout(r)}}},[k]);let B=()=>{if(A.current){let e=A.current.selectionStart||0,t=A.current.selectionEnd||0,r=A.current.value.substring(e,t);r&&navigator.clipboard.writeText(r).then(()=>{F({items:[],x:0,y:0})}).catch(e=>{})}},N=()=>{A.current&&navigator.clipboard.readText().then(e=>{t(e),q(e),F({items:[],x:0,y:0})}).catch(e=>{})};return(0,n.jsxs)("div",{children:[(0,n.jsx)(f,{onDoubleClick:()=>{S(e=>!e)}}),k&&(0,n.jsxs)(a,{ref:T,style:{visibility:E?"visible":"hidden",left:`${R.x}px`,top:`${R.y}px`},children:[(0,n.jsxs)(l,{onMouseDown:e=>{if(e.target!==e.currentTarget)return;let t=T.current;if(t){let r=t.getBoundingClientRect();D({x:e.clientX-r.left,y:e.clientY-r.top}),document.addEventListener("mousemove",O),document.addEventListener("mouseup",Z)}},children:[(0,n.jsx)(b.Yt,{src:v.r["RDI-Applicant"],alt:"User Avatar"}),(0,n.jsx)("h4",{children:"Logged in as RDI-Applicant"}),(0,n.jsx)("h4",{children:w?`Chatting with ${w}`:"RDIChat"}),(0,n.jsx)(m,{onClick:()=>{S(!1),j(!1)},children:"X"})]}),w&&(0,n.jsx)(d,{children:(0,n.jsx)(c,{onClick:()=>{w&&$(e=>({...e,[w]:!1})),M(!1),y(null)},children:"Back"})}),w?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(u,{children:r.filter(e=>e.user===w).map((e,t)=>(0,n.jsx)(p,{children:e.text},t))}),(0,n.jsx)("form",{onSubmit:r=>{r.preventDefault(),w&&(window.parent&&window.parent.postMessage({event:"messageSent",details:{selectedUser:w,message:e}},"*"),s(t=>[...t,{user:w,text:`${C} to ${w}: ${e}`}]),t(""),q(""),$(e=>({...e,[w]:!0})))},children:(0,n.jsxs)(h,{onContextMenu:e=>{e.preventDefault(),F({items:[{label:"Copy",action:B},{label:"Paste",action:N}],x:e.clientX,y:e.clientY})},children:[(0,n.jsx)("input",{ref:A,type:"text",value:W,onChange:e=>{let r=e.target.value;t(r),q(r)},placeholder:"Type your message...",required:!0}),(0,n.jsx)("button",{type:"submit",children:"Send"})]})})]}):(0,n.jsx)(x,{children:v.nb.filter(e=>e!==C).map(e=>(0,n.jsxs)(g,{onClick:()=>{y(e),$(t=>({...t,[e]:!1}))},children:[(0,n.jsx)("img",{src:v.r[e],alt:`${e}'s avatar`}),(0,n.jsxs)("div",{className:"user-details",children:[(0,n.jsxs)("span",{className:"user-name",children:[e,z[e]&&(0,n.jsx)("div",{className:"notification-dot",children:"!"})]}),(0,n.jsx)("small",{children:H(e)?.text.substring(0,90)||"No messages yet"})]})]},e))})]})]})}},86401:function(e,t,r){"use strict";r.d(t,{Wd:function(){return i},vc:function(){return n},xJ:function(){return o}});let n={camera:{far:400,fov:30,near:.1},color:"hsl(225, 40%, 20%)",colorCycleSpeed:10,forceAnimate:!0,hh:50,hue:225,lightness:20,material:{options:{fog:!1,wireframe:!1}},saturation:40,shininess:35,waveHeight:20,waveSpeed:.25,ww:50},i={gyroControls:!1,mouseControls:!1,mouseEase:!1,touchControls:!1},o=["/System/Vanta.js/three.min.js","/System/Vanta.js/vanta.waves.min.js"]},28853:function(e,t,r){"use strict";r.d(t,{Ox:function(){return c},UV:function(){return s},UY:function(){return a},WQ:function(){return l},ol:function(){return o}});var n=r(85893),i=r(67294);let o=(0,i.memo)(()=>(0,n.jsx)("svg",{style:{border:"1px solid transparent",borderRight:0,borderTop:0,height:"17px",marginLeft:"-1px"},viewBox:"3 -1 30 30",xmlns:"http://www.w3.org/2000/svg",children:(0,n.jsx)("path",{d:"M21 0q1.516 0 2.922.391T26.547 1.5t2.227 1.727 1.727 2.227 1.109 2.625.391 2.922-.391 2.922-1.109 2.625-1.727 2.227-2.227 1.727-2.625 1.109-2.922.391q-1.953 0-3.742-.656t-3.289-1.891L1.703 31.705q-.297.297-.703.297t-.703-.297T0 31.002t.297-.703l12.25-12.266q-1.234-1.5-1.891-3.289T10 11.002q0-1.516.391-2.922T11.5 5.455t1.727-2.227 2.227-1.727T18.079.392t2.922-.391zm0 20q1.859 0 3.5-.711t2.859-1.93 1.93-2.859T30 11t-.711-3.5-1.93-2.859-2.859-1.93T21 2t-3.5.711-2.859 1.93-1.93 2.859T12 11t.711 3.5 1.93 2.859 2.859 1.93T21 20z",stroke:"#FFF",strokeWidth:"1"})})),s=(0,i.memo)(()=>(0,n.jsx)("svg",{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg",children:(0,n.jsx)("path",{d:"m257.5 977.5 465-465.5-465-465.5 45-45 511 510.5-511 510.5z"})})),a=(0,i.memo)(()=>(0,n.jsx)("svg",{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg",children:(0,n.jsx)("path",{d:"M768 128h192v192h-64v-82.5l-228 228-45.5-45.5 228-228H768v-64zm0 384 64-64v384H0V256h640l-64 64H64v448h704V512z"})})),l=(0,i.memo)(()=>(0,n.jsx)("svg",{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg",children:(0,n.jsx)("path",{d:"M768 0q13 0 24.75 5t20.5 13.75T827 39.25 832 64v464q0 15.5 4.75 27t11.75 21.75 15.5 20.5T879.5 620t11.75 29 4.75 39v144q0 13-5 24.75t-13.75 20.5-20.5 13.75-24.75 5H384v64q0 19.5-10.75 35.5T344.5 1019q-11.5 5-24.5 5-26.5 0-45.5-19L128 858.5V0h640zM320 784q0-22.5 4.75-38.75t11.75-29T352 693.5t15.5-20.25 11.75-22T384 624V301.5l-192-192V832l128 128V784zm512-96q0-15.5-4.75-27t-11.75-21.75-15.5-20.5T784.5 596t-11.75-29-4.75-39V64H237.5l192 192q9 9 13.75 20.75T448 301.5V624q0 22.5-4.75 38.75t-11.75 29T416 714.5t-15.5 20.25-11.75 22T384 784v48h448V688z"})})),c=(0,i.memo)(()=>(0,n.jsx)("svg",{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg",children:(0,n.jsx)("path",{d:"M939.5 276.5q41 41 62.75 93.25T1024 480q0 17.5-1 42t-4.25 53-9.5 58.75T993 693q-15 43-35 70.25t-41.5 42.5T873 826.5t-41 5.5q-16.5 0-30.25-5.75t-26-14.75-23-20.75T731.5 767t-20.75-23-21.25-19.75T666.25 710t-26.75-6h-255q-14.5.5-26.75 6t-23.25 14.25T313.25 744t-20.75 23-21.25 23.75-23 20.75-26 14.75T192 832q-19 0-41-5.5t-43.5-20.75-41.5-42.5T31 693q-10-29-16.25-59.25T5.25 575 1 522t-1-42q0-58 21.75-110.25T84.5 276.5q40.5-41 93-62.75T288 192h448q58 0 110.25 21.75t93.25 62.75zm-7 395.5q9.5-26.5 15-55t8.25-54.75 3.5-47.75.75-34.5q0-46.5-17.75-87.25t-48-71-71-48T736 256H288q-46.5 0-87.25 17.75t-71 48-48 71T64 480q0 13 .75 34.5t3.5 47.75T76.5 617t15 55q12.5 36 27.5 55.5t29.25 28.5 26 10.5T192 768q11 0 24.25-13.25T244 725q12-14 25.75-28.75t30.5-27T337.5 649t45.5-9h258q25 1 45.5 9t37.25 20.25 30.5 27T780 725q14.5 16.5 27.75 29.75T832 768q6 0 17.75-1.5t26-10.5T905 727.5t27.5-55.5zM256 448h64v64h-64v64h-64v-64h-64v-64h64v-64h64v64zm576 64q13.5 0 25 5t20.25 13.75T891 551t5 25-5 25-13.75 20.25T857 635t-25 5-25-5-20.25-13.75T773 601t-5-25 5-25 13.75-20.25T807 517t25-5zM704 384q13.5 0 25 5t20.25 13.75T763 423t5 25-5 25-13.75 20.25T729 507t-25 5-25-5-20.25-13.75T645 473t-5-25 5-25 13.75-20.25T679 389t25-5z"})}))},80155:function(e,t,r){"use strict";r.d(t,{Hr:function(){return o},Oh:function(){return s},rF:function(){return i}});var n=r(97836);let i="Start",o="Type here to search",s=({relatedTarget:e},t,r,i,o,s=!1)=>{if(!(e&&t?.contains(e))){let a=t?.nextSibling,l=e===a,c=e?.parentElement===a,d=e?.title===o;e&&(s&&l||!l&&(!c||!d))?r(!1):(i||t)?.focus(n.eS)}}},72446:function(e,t,r){"use strict";var n=r(67294);t.Z=(e,t,r)=>{let i=(0,n.useRef)();return(0,n.useEffect)(()=>(e&&!i.current&&(i.current=e(r),t&&i.current.addEventListener("message",t,{passive:!0}),i.current.postMessage("init")),()=>{i.current?.terminate(),i.current=void 0}),[t,r,e]),i}},79708:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return eR}});var n=r(85893),i=r(67294),o=r(51526),s=r(5152),a=r.n(s),l=r(58437);let c=a()(()=>r.e(8864,"high").then(r.bind(r,78864)),{loadableGenerated:{webpack:()=>[78864]}});var d=(0,i.memo)(()=>{let{processes:e={}}=(0,l.z)();return(0,n.jsx)(o.M,{initial:!1,presenceAffectsLayout:!1,children:Object.entries(e).map(([e,{closing:t,Component:r,hasWindow:i}])=>e&&r&&!t&&(0,n.jsx)(c,{Component:r,hasWindow:i,id:e},e))})}),u=r(10508);let p=u.ZP.main(["background-color:transparent;contain:strict;height:100%;inset:0;overscroll-behavior:none;position:fixed;width:100vw;#loading-status{background-color:#fff;border-radius:10px;display:none;font-weight:600;left:50%;padding:15px;position:absolute;top:50%;transform:translate(-50%,-50%);user-select:none;}> canvas{background-color:inherit;height:100%;left:0;object-fit:cover;position:absolute;top:0;width:100%;z-index:-1;}"]);var h=r(1864),m=r(10393),f=r(86401),x=r(20063),g=r(76488),v=r(72446),b=r(97836),w=r(6484);let y=Object.keys(m.YH),k=[];var S=e=>{let{exists:t,lstat:n,readFile:o,readdir:s,updateFolder:a,writeFile:l}=(0,x.o)(),{sessionLoaded:c,setWallpaper:d,wallpaperImage:p,wallpaperFit:S}=(0,g.k)(),{colors:E}=(0,u.Fg)(),[j]=p.split(" "),T="VANTA WIREFRAME"===p,C=(0,v.Z)(m.YH[j],void 0,T?"Wireframe":""),R=(0,i.useRef)(),P=(0,i.useRef)(!1),I=(0,i.useCallback)(async r=>{let n;if(!e.current)return;let{matches:i}=window.matchMedia("(prefers-reduced-motion: reduce)"),s=!window.top||window===window.top;if(!s)try{s=window.location.origin!==window.top?.location.origin}catch{s=!0}if("VANTA"===j)n={...f.vc,waveSpeed:f.vc.waveSpeed*(i?.1:1)},f.vc.material.options.wireframe=T||!s;else if(p.startsWith("MATRIX"))n={animationSpeed:i?.1:1,volumetric:p.endsWith("3D"),...s?{}:{fallSpeed:-.09,forwardSpeed:-.25}};else if("STABLE_DIFFUSION"===j){let e=`${b.sC}/${b.dd}`;await t(e)&&(n={prompts:JSON.parse((await o(e))?.toString()||"[]")})}if(document.documentElement.style.setProperty("background",document.documentElement.style.background.replace(/".*"/,"")),r||(e.current.querySelector(m.$3)?.remove(),window.WallpaperDestroy?.()),!P.current&&void 0!==window.OffscreenCanvas&&C.current){let t={config:n,devicePixelRatio:1};if(r)C.current.postMessage(t);else{let r=(0,w.nS)(e.current);if(C.current.postMessage({canvas:r,...t},[r]),C.current.addEventListener("message",({data:e})=>{"[error]"===e.type&&(e.message.includes("getContext")?(P.current=!0,I()):d("SLIDESHOW"))}),"STABLE_DIFFUSION"===j){let t=document.createElement("div");t.id="loading-status",e.current?.append(t),window.WallpaperDestroy=()=>{t.remove(),window.WallpaperDestroy=void 0},C.current.addEventListener("message",({data:e})=>{"[error]"===e.type?d("VANTA"):e.type?t.textContent=e.message||"":e.message||(R.current=window.setTimeout(()=>I(!0),10*b.qe)),t.style.display=e.message?"block":"none"})}}}else m.dI[j]?m.dI[j]().then(({default:t})=>t?.(e.current,n)).catch(()=>d("VANTA")):d("VANTA")},[e,t,o,d,T,p,j,C]),D=(0,i.useCallback)(async e=>(await s(e)).reduce(async(t,r)=>{let i=(0,h.join)(e,r);return[...await t,...(await n(i)).isDirectory()?await D(i):[b.lM.has((0,w.RT)(i))&&!b.vb.has((0,w.RT)(i))?i:""]].filter(Boolean)},Promise.resolve([])),[s,n]),L=(0,i.useCallback)(async()=>{let[,n]=/"(.*?)"/.exec(document.documentElement.style.background)||[];n?.startsWith("blob:")&&(0,w.EK)(n),e.current?.querySelector(m.$3)?.remove(),e.current?.querySelector(m.vF)?.remove(),window.WallpaperDestroy?.();let i="",s="",c=S,u="SLIDESHOW"===j;if(u){let e=`${b.sC}/${b.rH}`;await t(e)||(await l(e,JSON.stringify(await t(b.sC)?await D(b.sC):"[]")),a(b.sC,b.rH)),0===k.length&&k.push(...[...new Set(JSON.parse((await o(e))?.toString()||"[]"))].sort(()=>Math.random()-.5));do{i=k.shift()||"";let[e]=k;if(e){let t=document.createElement("link");t.id="preloadWallpaper",t.href=e,t.rel="preload",t.as="image",document.querySelector("#preloadWallpaper")?.remove(),document.head.append(t)}i.startsWith("/")&&(i=`${window.location.origin}${i}`)}while(n===i&&k.length>1);c="fill"}else if("APOD"===j){let[,e]=p.split(" "),[t,,r,,n]=new Intl.DateTimeFormat(b.ZW,{timeZone:"US/Eastern"}).formatToParts(Date.now()).map(({value:e})=>e);if(e===`${n}-${t}-${r}`)return;let{date:o="",hdurl:a="",url:l=""}=await (0,w.AC)("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY");if(a||l){if(i=((0,w.E9)()>1024?a:l)||l,c="fit",(0,w.yk)(i)){let e=`https://i.ytimg.com/vi/${(0,w.Ld)(i)}`;i=`${e}/maxresdefault.jpg`,s=`${e}/hqdefault.jpg`}else a&&l&&a!==l&&(s=i===l?a:l);let e=`APOD ${i} ${o}`;e!==p&&(d(e,c),setTimeout(I,b.xR))}}else if(await t(p)){let{decodeImageToBuffer:e}=await r.e(4609,"high").then(r.bind(r,14609)),t=await o(p),n=await e((0,w.RT)(p),t);i=(0,w.YS)(n||t)}if(i){if(b.qy.has((0,w.RT)(p))){let t=document.createElement("video");t.src=i,t.autoplay=!0,t.controls=!1,t.disablePictureInPicture=!0,t.disableRemotePlayback=!0,t.loop=!0,t.muted=!0,t.playsInline=!0,t.style.position="absolute",t.style.inset="0",t.style.width="100%",t.style.height="100%",t.style.objectFit="cover",t.style.objectPosition="center center",t.style.zIndex="-1",e.current?.append(t)}else{let e=e=>{let t="tile"===c?"repeat":"no-repeat",r=m.QC[c],n=window===window.top;document.documentElement.style.setProperty("background",`url(${CSS.escape(e)}) ${r} ${t} fixed border-box border-box ${n?E.background:E.text}`),n||document.documentElement.style.setProperty("background-blend-mode","difference")};s?fetch(i,{...b.P8,mode:"no-cors"}).then(({ok:e})=>{if(!e)throw Error("Failed to load url")}).catch(()=>e(s)):(e(i),u&&(R.current=window.setTimeout(L,b.KG)))}}else I()},[E,e,t,D,I,o,d,a,S,p,j,l]);(0,i.useEffect)(()=>{c&&!window.DEBUG_DISABLE_WALLPAPER&&(R.current&&window.clearTimeout(R.current),j&&!y.includes(j)?L().catch(I):I())},[L,I,c,j]),(0,i.useEffect)(()=>{let t=()=>{if(!e.current||!m.dI[j])return;let t=e.current.getBoundingClientRect();C.current?.postMessage(t);let r=e.current.querySelector(m.$3);r instanceof HTMLCanvasElement&&(r.style.width=`${t.width}px`,r.style.height=`${t.height}px`)};return window.addEventListener("resize",t,{passive:!0}),()=>window.removeEventListener("resize",t)},[e,j,C])},E=r(54110),j=r(54162),T=r(73350),C=r(7502);let R=u.ZP.div(["background-color:#fff;border:1px solid #ccc;box-shadow:0 0 10px rgba(0,0,0,10%);display:flex;flex-direction:column;margin:auto;padding:0;position:absolute;width:600px;z-index:1000;"]),P=u.ZP.div(["align-items:center;background-color:#a2a2a2;border-bottom:1px solid #000;cursor:move;display:flex;justify-content:space-between;padding:10px;h2{margin:0;}"]),I=u.ZP.button(["background-color:red;border:none;color:white;cursor:pointer;padding:5px 10px;&:hover{background-color:darkred;}"]),D=u.ZP.div(["flex:1;overflow:hidden;padding:10px;position:relative;"]);u.ZP.div(["border:1px solid #ccc;padding:10px;"]);let L=u.ZP.div(['background-image:url("/System/Icons/48x48/documents.png");background-size:cover;cursor:pointer;display:inline-block;height:32px;width:32px;']);u.ZP.div(['background-image:url("/System/Icons/48x48/folder.png");background-size:cover;cursor:pointer;display:inline-block;height:80px;margin-right:5px;width:80px;']);let M=u.ZP.div(['background-image:url("/System/Icons/48x48/FolderWindows.png");background-size:cover;cursor:pointer;display:inline-block;height:80px;margin-right:5px;width:80px;']),z=u.ZP.div(['background-image:url("/System/Icons/48x48/desktop.png");background-size:cover;cursor:pointer;display:inline-block;height:80px;margin-right:5px;width:80px;']),$=u.ZP.div(['background-image:url("/System/Icons/48x48/pictures.png");background-size:cover;cursor:pointer;display:inline-block;height:80px;margin-right:5px;width:80px;']),F=u.ZP.div(['background-image:url("/System/Icons/48x48/downloads.png");background-size:cover;cursor:pointer;display:inline-block;height:80px;margin-right:5px;width:80px;']),A=u.ZP.div(["background-color:#fff;border:1px solid #ccc;box-shadow:0 0 10px rgba(0,0,0,10%);display:flex;flex-direction:column;margin-top:10px;padding:10px;width:100%;"]),W=u.ZP.div(["align-items:center;cursor:pointer;display:flex;"]),q=u.ZP.button(["background-color:#007bff;border:none;border-radius:5px;color:white;cursor:pointer;margin-bottom:10px;padding:10px 20px;&:hover{background-color:#0056b3;}"]);var O=({id:e})=>{let[t,r]=(0,i.useState)(!0),[o,s]=(0,i.useState)("main"),[a,l]=(0,i.useState)(!1),[c,d]=(0,i.useState)({x:0,y:0}),[u,p]=(0,i.useState)({x:0,y:0}),h=(0,i.useRef)(null),m=(0,i.useRef)(null),{setMenu:f}=(0,C.H)(),x=e=>{d({x:e.clientX-u.x,y:e.clientY-u.y})},g=()=>{document.removeEventListener("mousemove",x),document.removeEventListener("mouseup",g)},v=e=>{s(e)};(0,i.useEffect)(()=>{let e=h.current;e&&(e.style.left=`${c.x}px`,e.style.top=`${c.y}px`)},[c]),(0,i.useEffect)(()=>{if(t&&h.current){let e=h.current,t=(window.innerWidth-e.offsetWidth)/2,r=(window.innerHeight-e.offsetHeight)/2;d({x:t,y:r}),e.style.left=`${t}px`,e.style.top=`${r}px`,l(!0)}},[t]),(0,i.useEffect)(()=>{let e=m.current;e&&(e.style.height="auto",e.style.height=`${e.scrollHeight}px`)},[o]);let b=e=>{e.preventDefault(),f({items:[{label:"Copy",action:w},{label:"Paste",action:y}],x:e.clientX,y:e.clientY})},w=()=>{if(m.current){let e=m.current.selectionStart,t=m.current.selectionEnd,r=m.current.value.substring(e,t);r&&navigator.clipboard.writeText(r).then(()=>{f({items:[],x:0,y:0})}).catch(e=>{})}},y=()=>{m.current&&navigator.clipboard.readText().then(e=>{m.current&&(m.current.value=e),f({items:[],x:0,y:0})})};return(0,n.jsxs)("div",{onContextMenu:b,children:[(0,n.jsxs)("div",{children:[(0,n.jsx)(L,{onDoubleClick:()=>{r(e=>!e)}}),(0,n.jsx)("span",{children:"My Documents"})]}),t&&(0,n.jsxs)(R,{ref:h,style:{visibility:a?"visible":"hidden",left:`${c.x}px`,top:`${c.y}px`},children:[(0,n.jsxs)(P,{onMouseDown:e=>{if(e.target!==e.currentTarget)return;let t=h.current;if(t){let r=t.getBoundingClientRect();p({x:e.clientX-r.left,y:e.clientY-r.top}),document.addEventListener("mousemove",x),document.addEventListener("mouseup",g)}},children:[(0,n.jsx)("h2",{children:"main"===o?"My Documents":o}),(0,n.jsx)(I,{onClick:()=>{r(!1),l(!1)},children:"X"})]}),(0,n.jsxs)(D,{children:["main"===o&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(W,{onDoubleClick:()=>v("Letter.doc"),children:[(0,n.jsx)(M,{}),(0,n.jsx)("span",{children:"Letter.doc"})]}),(0,n.jsxs)(W,{onDoubleClick:()=>v("Desktop"),children:[(0,n.jsx)(z,{}),(0,n.jsx)("span",{children:"Desktop"})]}),(0,n.jsxs)(W,{onDoubleClick:()=>v("Pictures"),children:[(0,n.jsx)($,{}),(0,n.jsx)("span",{children:"Pictures"})]}),(0,n.jsxs)(W,{onDoubleClick:()=>v("Downloads"),children:[(0,n.jsx)(F,{}),(0,n.jsx)("span",{children:"Downloads"})]})]}),"main"!==o&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(q,{onClick:()=>{s("main")},children:"Back"}),(0,n.jsx)(A,{children:(0,n.jsx)("textarea",{ref:m,readOnly:!0,value:"Letter.doc"===o?`From: jtelford@rdiCorp.com
// To: Andy@rdiCorp.com
// Cc: Mike@rdiCorp.com
// Subject: Update on Software Development Progress

// Hi Andy,

// I hope this email finds you well.

// I wanted to provide you with a quick update on the current progress of our software development project. Over the past few weeks, our team has been working diligently to meet our milestones, and I am pleased to report that we are on track to meet our upcoming deadlines.

// Here are some key updates:
// 1. **Feature Development**: The development team has successfully implemented the core functionalities of the application. We are currently in the testing phase to ensure everything operates smoothly.
// 2. **Bug Fixes**: Our QA team has identified and resolved several critical bugs. The system's stability has significantly improved, and we are working on fine-tuning the performance.
// 3. **User Interface**: The UI/UX team has completed the initial design and is now working on enhancing the user experience based on the feedback received during our last review meeting.

// Moving forward, we have a few action items to focus on:
// - **Final Testing**: Continue rigorous testing to identify any remaining issues and ensure the application is ready for deployment.
// - **Documentation**: Finalize the user documentation and training materials for our internal teams and end-users.
// - **Deployment Plan**: Prepare for the deployment phase, including setting up the necessary infrastructure and ensuring all dependencies are in place.

// If you have any questions or need further details on any specific aspects, please feel free to reach out.

// Best regards,
// RDI Corporation
// jtelford@rdiCorp.com
//                     `:"Desktop"===o?"This is my second folder":"Pictures"===o?"This is my third folder":"This is my fourth folder",onContextMenu:b})})]})]})]})]})},Z=r(93343),H=({children:e,id:t})=>{let r=(0,i.useRef)(null),[o,s]=(0,i.useState)({email:!1,RDIChat:!1,TextFolder:!1});S(r);let[a,l]=(0,i.useState)(null),c=(0,i.useRef)(0),d=(0,i.useRef)(null),u=e=>{switch(l(e),e){case"Email.url":s(e=>({...e,email:!e.email}));break;case"RDIChat.url":s(e=>({...e,RDIChat:!e.RDIChat}));break;case"TextFolder.url":s(e=>({...e,TextFolder:!e.TextFolder}))}},h=e=>{l(e)},m=e=>{switch(l(e),e){case"Email.url":s(e=>({...e,email:!e.email}));break;case"RDIChat.url":s(e=>({...e,RDIChat:!e.RDIChat}));break;case"TextFolder.url":s(e=>({...e,TextFolder:!e.TextFolder}))}};return(0,n.jsxs)(p,{ref:r,children:[(0,n.jsx)(E.Z,{url:b.Ll,view:"icon",allowMovingDraggableEntries:!0,hideLoading:!0,hideScrolling:!0,isDesktop:!0,loadIconsImmediately:!0,customIcons:[{"data-file":"Email.url",style:{gridColumnStart:1,gridRowStart:3,backgroundColor:"Email.url"===a?"":"transparent"},iconProps:{"aria-label":"Email",title:"Opens Email Application",alt:"Outlook",src:"/System/Icons/16x16/outlookemail.png",srcSet:"/System/Icons/32x32/outlookemail.png 1x, /System/Icons/48x48/outlookemail.png 2x, /System/Icons/96x96/outlookemail.png 3x, /System/Icons/144x144/outlookemail.png 4x"}},{"data-file":"RDIChat.url",style:{gridColumnStart:1,gridRowStart:4,backgroundColor:"RDIChat.url"===a?"":"transparent"},iconProps:{"aria-label":"RDIChat",title:"Opens RDIChat Application",alt:"RDIChat",src:"/System/Icons/16x16/chat.png",srcSet:"/System/Icons/32x32/chat.png 1x, /System/Icons/48x48/chat.png 2x, /System/Icons/96x96/chat.png 3x, /System/Icons/144x144/chat.png 4x"}},{"data-file":"TextFolder.url",style:{gridColumnStart:1,gridRowStart:5,backgroundColor:"TextFolder.url"===a?"":"transparent"},iconProps:{"aria-label":"My Documents",title:"Opens TextFolder Application",alt:"My Documents",src:"/System/Icons/48x48/folder.png",srcSet:"/System/Icons/32x32/folder.png 1x, /System/Icons/16x16/folder.png 2x, /System/Icons/96x96/folder.png 3x, /System/Icons/144x144/folder.png 4x"}}],onFileOpen:e=>{let t=Date.now();t-c.current<300?(d.current&&clearTimeout(d.current),m(e)):(h(e),l(e),d.current=setTimeout(()=>{u(e),d.current=null},300)),c.current=t},onFileDoubleClick:m,onFileSingleClick:h}),o.email&&(0,n.jsx)(j.default,{id:t},`email-${o.email}`),o.RDIChat&&(0,n.jsx)(Z.dr,{children:(0,n.jsx)(T.default,{id:t},`RDIChat-${o.RDIChat}`)}),o.TextFolder&&(0,n.jsx)(O,{id:t},`TextFolder-${o.TextFolder}`),e]})},B=r(6155);let N=u.ZP.div(["color:",";display:flex;font-size:",";height:100%;max-width:",";min-width:","px;padding:",";place-content:center;place-items:center;position:absolute;right:0;white-space:nowrap;&:hover{background-color:",";}&:active{background-color:",";}"],({theme:e})=>e.colors.text,({theme:e})=>e.sizes.clock.fontSize,({theme:e,$width:t})=>`calc(${t}px + ${2*e.sizes.clock.padding}px)`,({$width:e})=>e,({theme:e})=>`0 ${e.sizes.clock.padding}px`,({theme:e})=>e.colors.taskbar.hover,({theme:e})=>e.colors.taskbar.foreground);var U=e=>{let{contextMenu:t}=(0,C.H)(),{clockSource:r,setClockSource:n}=(0,g.k)();return(0,i.useMemo)(()=>t?.(()=>{e(!1);let t="local"===r;return[{action:()=>n("local"),label:"Local time",toggle:t},{action:()=>n("ntp"),label:"Server time",toggle:!t}]}),[r,t,n,e])};let V={local:"Local",ntp:"Server"},_=7,K=()=>{_=7},X=async({target:e})=>{if(7===_&&e instanceof HTMLElement&&(e.removeEventListener("mouseleave",K),e.addEventListener("mouseleave",K,b.K7)),0==(_-=1)){let{default:e}=await r.e(2163,"high").then(r.bind(r,82163));e(),_=7}};var Y=(0,i.memo)(({setClockWidth:e,toggleCalendar:t,width:o})=>{let[s,a]=(0,i.useState)(Object.create(null)),{date:l,time:c}=s,{clockSource:d}=(0,g.k)(),p=(0,i.useCallback)(()=>new Worker(r.tu(new URL(r.p+r.u(2552),r.b)),{name:`Clock (${V[d]})`}),[d]),h=(0,i.useRef)(),m=(0,i.useMemo)(()=>"OffscreenCanvas"in window,[]),f=(0,i.useCallback)(({data:e,target:t})=>{"source"===e?t.postMessage(d):a(t=>h.current&&t.date===e.date?t:e)},[d]),x=U(t),y=(0,v.Z)(p,f),k=(0,i.useRef)({height:b.bK,width:o}),{formats:{systemFont:S},sizes:{clock:{fontSize:E}}}=(0,u.Fg)(),j=(0,i.useCallback)(()=>Math.min(Math.max(b.Ml,Math.ceil((0,B.X1)("44:44:44 AM",E,S))),1.5*b.Ml),[E,S]),T=(0,i.useCallback)(t=>{!h.current&&y.current&&t instanceof HTMLDivElement&&([...t.children].forEach(e=>e.remove()),k.current.width=j(),e(k.current.width),h.current=(0,w.nS)(t,window.devicePixelRatio,k.current),y.current.postMessage({canvas:h.current,devicePixelRatio:window.devicePixelRatio},[h.current]))},[y,s]),C=(0,i.useCallback)(e=>{X(e),t()},[t]);return((0,i.useEffect)(()=>{h.current=void 0},[d]),(0,i.useEffect)(()=>{if(m){let e=()=>window.matchMedia(`(resolution: ${window.devicePixelRatio}x)`).addEventListener("change",()=>{y.current?.postMessage({clockSize:k.current,devicePixelRatio:window.devicePixelRatio}),e()},b.K7);e()}else e(j())},[y,j,e,m]),c)?(0,n.jsx)(N,{ref:m?T:void 0,$width:o,"aria-label":"Clock",onClick:C,role:"timer",title:l,suppressHydrationWarning:!0,...x,...b.LL,children:m?void 0:c}):null}),G=r(28853),J=r(67278);let Q=(0,u.ZP)(J.Z)(["background-color:",";display:flex;fill:",";height:100%;left:",";place-content:center;place-items:center;position:absolute;&&{width:","px;}svg{height:",";}&:hover{background-color:",";svg{fill:",";}}&:active{background-color:hsla(0,0%,20%,70%);svg{fill:",";}}"],({$active:e,$highlight:t,theme:r})=>e&&(t?r.colors.taskbar.foreground:"hsla(0, 0%, 25%, 50%)"),({theme:e})=>e.colors.taskbar.button.color,({$left:e})=>e?`${e}px`:0,({theme:e})=>e.sizes.taskbar.button.width,({theme:e})=>e.sizes.taskbar.button.iconSize,({$active:e,theme:t})=>e?t.colors.taskbar.foreground:t.colors.taskbar.hover,({$highlight:e,theme:t})=>e?t.colors.highlight:void 0,({$highlight:e})=>e?"hsla(207, 100%, 60%, 80%)":void 0);var ee=r(80155),et=r(8955),er=r(86178),en=(e=!1)=>{let{contextMenu:t}=(0,C.H)(),{minimize:r,open:n}=(0,l.z)(),{stackOrder:o}=(0,g.k)(),s=(0,er.R)(),{fullscreenElement:a,toggleFullscreen:c}=(0,et.S)();return(0,i.useMemo)(()=>t?.(()=>{let t=Object.entries(s.current),i=t.length>0&&!t.some(([,{minimized:e}])=>!e),l=[{action:()=>w.xr(s.current,o,r),label:e?"Desktop":i?"Show open windows":"Show the desktop"}];return e?l.unshift({action:()=>n("Terminal"),label:"Terminal"},b.Os,{action:()=>n("FileExplorer"),label:"File Explorer"},{action:()=>n("Run"),label:"Run"},b.Os):l.unshift({action:()=>c(),label:a===document.documentElement?"Exit full screen":"Enter full screen"},b.Os),l}),[t,a,r,e,n,s,o,c])},ei=({searchVisible:e,toggleSearch:t})=>{let{sizes:{taskbar:r}}=(0,u.Fg)();return(0,n.jsx)(Q,{$active:e,$left:r.button.width,onClick:()=>t(),...b.Yj,...(0,w.PS)(ee.Hr),...en(),children:(0,n.jsx)(G.ol,{})})};let eo=(0,i.memo)(()=>(0,n.jsx)("img",{src:"/System/Icons/Favicons/16x16/WindowsG.png",alt:"Start Button Icon",style:{width:"100%",height:"100%"}}));var es=({startMenuVisible:e,toggleStartMenu:t})=>{let[o,s]=(0,i.useState)(!1),a=(0,i.useRef)(!1),l=(0,i.useCallback)(async()=>{if(a.current)return;a.current=!0;let e=Object.prototype.hasOwnProperty.call(HTMLLinkElement.prototype,"imageSrcset"),t=[...document.querySelectorAll("link[rel=preload]")],n=(await r.e(8530,"high").then(r.t.bind(r,18530,19))).default;n?.forEach(r=>{let n=document.createElement("link");if(n.as="image",n.fetchPriority="high",n.rel="preload",n.type="image/webp",w.qs(r)){if(e)n.imageSrcset=w.km(r,48,".webp");else{let[e]=w.RU(r,48,w.bN(),".webp").split(" ");n.href=e}}else n.href=r;t.some(e=>n.imageSrcset&&e?.imageSrcset?.endsWith(n.imageSrcset)||n.href&&e?.href?.endsWith(n.href))||document.head.append(n)}),s(!0)},[]),c=(0,i.useCallback)(async({ctrlKey:e,shiftKey:n})=>{if(o||l(),t(),e&&n){let{default:e}=await r.e(2163,"high").then(r.bind(r,82163));e()}},[l,o,t]);return(0,n.jsx)(Q,{$active:e,onClick:c,onMouseOver:o?void 0:l,$highlight:!0,...b.Yj,...(0,w.PS)(ee.rF),...en(!0),children:(0,n.jsx)(eo,{})})};let ea=u.ZP.nav(["backdrop-filter:",";background-color:",";bottom:0;contain:size layout;height:","px;left:0;position:absolute;right:0;width:100vw;z-index:100000;"],({theme:e})=>`blur(${e.sizes.taskbar.blur})`,({theme:e})=>e.colors.taskbar.background,b.bK),el=u.ZP.ol(["column-gap:1px;display:flex;height:100%;left:","px;margin:0 3px;overflow:hidden;position:absolute;right:",";"],({theme:e})=>2*e.sizes.taskbar.button.width,({$clockWidth:e,theme:t})=>`calc(${e}px + ${2*t.sizes.clock.padding}px)`),ec=a()(()=>r.e(2719,"high").then(r.bind(r,22719)),{loadableGenerated:{webpack:()=>[22719]}});var ed=(0,i.memo)(({clockWidth:e})=>{let{processes:t={}}=(0,l.z)();return(0,n.jsx)(el,{$clockWidth:e,children:(0,n.jsx)(o.M,{initial:!1,presenceAffectsLayout:!1,children:Object.entries(t).filter(([,{closing:e,hideTaskbarEntry:t}])=>!e&&!t).map(([e,{icon:t,title:r}])=>(0,n.jsx)(ec,{icon:t,id:e,title:r},e))})})});let eu=a()(()=>r.e(9641,"high").then(r.bind(r,19641)),{loadableGenerated:{webpack:()=>[19641]}}),ep=a()(()=>r.e(3638,"high").then(r.bind(r,53638)),{loadableGenerated:{webpack:()=>[53638]}}),eh=a()(()=>r.e(2410,"high").then(r.bind(r,32410)),{loadableGenerated:{webpack:()=>[32410]}});var em=(0,i.memo)(()=>{let[e,t]=(0,i.useState)(!1),[r,s]=(0,i.useState)(!1),[a,l]=(0,i.useState)(!1),[c,d]=(0,i.useState)(b.Ml),u=(0,i.useCallback)(e=>t(t=>e??!t),[]),p=(0,i.useCallback)(e=>s(t=>e??!t),[]),h=(0,i.useCallback)(e=>l(t=>e??!t),[]);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(o.M,{initial:!1,presenceAffectsLayout:!1,children:[e&&(0,n.jsx)(eh,{toggleStartMenu:u},"startMenu"),r&&(0,n.jsx)(ep,{toggleSearch:p},"search")]}),(0,n.jsxs)(ea,{...en(),...b.LL,children:[(0,n.jsx)(es,{startMenuVisible:e,toggleStartMenu:u}),(0,n.jsx)(ei,{searchVisible:r,toggleSearch:p}),(0,n.jsx)(ed,{clockWidth:c}),(0,n.jsx)(Y,{setClockWidth:d,toggleCalendar:h,width:c})]}),(0,n.jsx)(o.M,{initial:!1,presenceAffectsLayout:!1,children:a&&(0,n.jsx)(eu,{toggleCalendar:h})})]})}),ef=()=>{(0,i.useEffect)(()=>{let e=e=>{e.error?.stack?.includes("eval at <anonymous>")&&(0,w.nK)(e)};return window.addEventListener("error",e),()=>window.removeEventListener("error",e)},[])};let ex=e=>document.querySelector(`main > nav > div[title='${e}']`),eg=!1,ev=!1,eb=!1,ew=e=>((0,w.nK)(e),!!eb||(eb=!0,setTimeout(()=>{eb=!1},b._2),!1)),ey=new Set(["ARROWDOWN","ARROWUP","D","E","R","S","X"]),ek=e=>{let{altKey:t,ctrlKey:r,shiftKey:n,metaKey:i}=e;window.globalKeyStates={altKey:t,ctrlKey:r,metaKey:i,shiftKey:n}};var eS=()=>{let{closeWithTransition:e,maximize:t,minimize:r,open:n}=(0,l.z)(),o=(0,er.R)(),{foregroundId:s,stackOrder:a}=(0,g.k)(),{fullscreenElement:c,toggleFullscreen:d}=(0,et.S)(),u=(0,i.useRef)({}),p=(0,i.useRef)({E:()=>n("FileExplorer"),ESCAPE:()=>ex(ee.rF)?.click(),F10:()=>n("Terminal"),F12:()=>n("DevTools"),F5:()=>window.location.reload(),R:()=>n("Run"),S:()=>ex(ee.Hr)?.click(),X:()=>ex(ee.rF)?.dispatchEvent(new MouseEvent("contextmenu",{clientX:1,clientY:w.sI()-1}))});(0,i.useEffect)(()=>{let e=e=>{ek(e);let{altKey:t,ctrlKey:r,key:n,shiftKey:i,target:o}=e,s=n?.toUpperCase();!(!s||o instanceof HTMLInputElement&&"text"===o.type||o instanceof HTMLTextAreaElement||o.isContentEditable)&&(i?(r||!ey.has(s))&&p.current?.[s]&&!ew(e)&&p.current[s]():"F11"===s?((0,w.nK)(e),d().then(e=>e)):document.activeElement===document.body&&s.startsWith("ARROW")?document.body.querySelector("main ol li button")?.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0})):r&&t&&u.current?.[s]?u.current?.[s]?.():c===document.documentElement&&("META"===s?eg=!0:t&&u.current?.[s]?((0,w.nK)(e),u.current?.[s]?.()):"ESCAPE"===s?document.pointerLockElement?document.exitPointerLock():d().then(e=>e):eg&&ey.has(s)&&p.current?.[s]&&!ew(e)&&(ev=!0,p.current[s]())))},t=e=>{ek(e),eg&&c===document.documentElement&&e.key?.toUpperCase()==="META"&&(eg=!1,ev?ev=!1:ex(ee.rF)?.click())};return document.addEventListener("keydown",e,{capture:!0}),document.addEventListener("keyup",t,{capture:!0,passive:!0}),()=>{document.removeEventListener("keydown",e,{capture:!0}),document.removeEventListener("keyup",t,{capture:!0})}},[c,d]),(0,i.useEffect)(()=>{u.current={...u.current,F4:()=>e(s)}},[e,s]),(0,i.useEffect)(()=>{p.current={...p.current,ARROWDOWN:()=>{let{hideMinimizeButton:e=!1,maximized:n,minimized:i}=o.current[s];n?t(s):i||e||r(s)},ARROWUP:()=>{let{allowResizing:e=!0,hideMaximizeButton:n=!1,maximized:i,minimized:a}=o.current[s];a?r(s):i||!e||n||t(s)},D:()=>(0,w.xr)(o.current,a,r)}},[s,t,r,o,a])},eE=()=>{let{setForegroundId:e}=(0,g.k)(),t=(0,er.R)();(0,i.useEffect)(()=>{let r=()=>{if(document.activeElement instanceof HTMLIFrameElement){let[r]=Object.entries(t.current).find(([,{componentWindow:e}])=>e?.contains(document.activeElement))||[];r&&(e(r),window.addEventListener("click",({target:r})=>{let[n=""]=Object.entries(t.current).find(([,{componentWindow:e}])=>r instanceof HTMLElement&&e?.contains(r))||[];e(n)},b.K7))}};return window.addEventListener("blur",r,{passive:!0}),()=>window.removeEventListener("blur",r)},[t,e])},ej=r(37176);let eT=e=>e.startsWith("http://")||e.startsWith("https://")||e.startsWith("chrome://");var eC=()=>{let{exists:e,fs:t}=(0,x.o)(),{open:r}=(0,l.z)(),n=(0,i.useRef)(!1);(0,i.useEffect)(()=>{if(n.current||!t||!e||!r)return;n.current=!0;let i=(0,w.kp)("app"),o=(0,w.kp)("url"),s=async t=>{if(!t)return;let n=!1;try{n="Browser"===t&&eT(o)||await e(o)}catch{}("FileExplorer"!==t||!o||n)&&r(t,n?{url:o}:void 0)};if(i)s(Object.fromEntries(Object.keys(ej.Z).map(e=>[e.toLowerCase(),e]))[i.toLowerCase()]);else if(o){let e=(0,w.RT)(o);s(eT(o)?"Browser":e?(0,B.Wd)(e):"FileExplorer")}},[e,t,r])},eR=(0,i.memo)(()=>(eE(),eC(),eS(),ef(),(0,n.jsxs)(H,{id:"desktop-1",children:[(0,n.jsx)(em,{}),(0,n.jsx)(d,{})]})))},51526:function(e,t,r){"use strict";r.d(t,{M:function(){return v}});var n=r(85893),i=r(67294),o=r(58868);function s(){let e=(0,i.useRef)(!1);return(0,o.L)(()=>(e.current=!0,()=>{e.current=!1}),[]),e}var a=r(26166),l=r(240),c=r(96681),d=r(16014);class u extends i.Component{getSnapshotBeforeUpdate(e){let t=this.props.childRef.current;if(t&&e.isPresent&&!this.props.isPresent){let e=this.props.sizeRef.current;e.height=t.offsetHeight||0,e.width=t.offsetWidth||0,e.top=t.offsetTop,e.left=t.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function p({children:e,isPresent:t}){let r=(0,i.useId)(),o=(0,i.useRef)(null),s=(0,i.useRef)({width:0,height:0,top:0,left:0}),{nonce:a}=(0,i.useContext)(d._);return(0,i.useInsertionEffect)(()=>{let{width:e,height:n,top:i,left:l}=s.current;if(t||!o.current||!e||!n)return;o.current.dataset.motionPopId=r;let c=document.createElement("style");return a&&(c.nonce=a),document.head.appendChild(c),c.sheet&&c.sheet.insertRule(`
//           [data-motion-pop-id="${r}"] {
//             position: absolute !important;
//             width: ${e}px !important;
//             height: ${n}px !important;
//             top: ${i}px !important;
//             left: ${l}px !important;
//           }
//         `),()=>{document.head.removeChild(c)}},[t]),(0,n.jsx)(u,{isPresent:t,childRef:o,sizeRef:s,children:i.cloneElement(e,{ref:o})})}let h=({children:e,initial:t,isPresent:r,onExitComplete:o,custom:s,presenceAffectsLayout:a,mode:d})=>{let u=(0,c.h)(m),h=(0,i.useId)(),f=(0,i.useMemo)(()=>({id:h,initial:t,isPresent:r,custom:s,onExitComplete:e=>{for(let t of(u.set(e,!0),u.values()))if(!t)return;o&&o()},register:e=>(u.set(e,!1),()=>u.delete(e))}),a?[Math.random()]:[r]);return(0,i.useMemo)(()=>{u.forEach((e,t)=>u.set(t,!1))},[r]),i.useEffect(()=>{r||u.size||!o||o()},[r]),"popLayout"===d&&(e=(0,n.jsx)(p,{isPresent:r,children:e})),(0,n.jsx)(l.O.Provider,{value:f,children:e})};function m(){return new Map}var f=r(25364),x=r(45487);let g=e=>e.key||"",v=({children:e,custom:t,initial:r=!0,onExitComplete:l,exitBeforeEnter:c,presenceAffectsLayout:d=!0,mode:u="sync"})=>{var p;(0,x.k)(!c,"Replace exitBeforeEnter with mode='wait'");let m=(0,i.useContext)(f.p).forceRender||function(){let e=s(),[t,r]=(0,i.useState)(0),n=(0,i.useCallback)(()=>{e.current&&r(t+1)},[t]);return[(0,i.useCallback)(()=>a.Wi.postRender(n),[n]),t]}()[0],v=s(),b=function(e){let t=[];return i.Children.forEach(e,e=>{(0,i.isValidElement)(e)&&t.push(e)}),t}(e),w=b,y=(0,i.useRef)(new Map).current,k=(0,i.useRef)(w),S=(0,i.useRef)(new Map).current,E=(0,i.useRef)(!0);if((0,o.L)(()=>{E.current=!1,function(e,t){e.forEach(e=>{let r=g(e);t.set(r,e)})}(b,S),k.current=w}),p=()=>{E.current=!0,S.clear(),y.clear()},(0,i.useEffect)(()=>()=>p(),[]),E.current)return(0,n.jsx)(n.Fragment,{children:w.map(e=>(0,n.jsx)(h,{isPresent:!0,initial:!!r&&void 0,presenceAffectsLayout:d,mode:u,children:e},g(e)))});w=[...w];let j=k.current.map(g),T=b.map(g),C=j.length;for(let e=0;e<C;e++){let t=j[e];-1!==T.indexOf(t)||y.has(t)||y.set(t,void 0)}return"wait"===u&&y.size&&(w=[]),y.forEach((e,r)=>{if(-1!==T.indexOf(r))return;let i=S.get(r);if(!i)return;let o=j.indexOf(r),s=e;s||(s=(0,n.jsx)(h,{isPresent:!1,onExitComplete:()=>{y.delete(r);let e=Array.from(S.keys()).filter(e=>!T.includes(e));if(e.forEach(e=>S.delete(e)),k.current=b.filter(t=>{let n=g(t);return n===r||e.includes(n)}),!y.size){if(!1===v.current)return;m(),l&&l()}},custom:t,presenceAffectsLayout:d,mode:u,children:i},g(i)),y.set(r,s)),w.splice(o,0,s)}),w=w.map(e=>{let t=e.key;return y.has(t)?e:(0,n.jsx)(h,{isPresent:!0,presenceAffectsLayout:d,mode:u,children:e},g(e))}),(0,n.jsx)(n.Fragment,{children:y.size?w:w.map(e=>(0,i.cloneElement)(e))})}},45487:function(e,t,r){"use strict";r.d(t,{K:function(){return i},k:function(){return o}});var n=r(81662);let i=n.Z,o=n.Z}},function(e){e.O(0,[4110,4162,2888,9774,179],function(){return e(e.s=48312)}),_N_E=e.O()}]);