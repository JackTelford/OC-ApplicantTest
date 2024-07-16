"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [3350],
    {
        73839: function (e, t, r) {
            r.d(t, {
                A3: function () {
                    return c;
                },
                Fy: function () {
                    return a;
                },
                LF: function () {
                    return p;
                },
                Mm: function () {
                    return d;
                },
                Yt: function () {
                    return g;
                },
                bu: function () {
                    return s;
                },
                dD: function () {
                    return l;
                },
                fK: function () {
                    return o;
                },
                fU: function () {
                    return f;
                },
                o8: function () {
                    return x;
                },
                qk: function () {
                    return u;
                },
                rT: function () {
                    return i;
                },
            });
            var n = r(10508);
            let o = n.ZP.div(["background-color:#fff;border:1px solid #ccc;box-shadow:0 0 10px rgba(0,0,0,10%);display:flex;flex-direction:column;margin:auto;padding:0;position:absolute;width:600px;z-index:1000;"]),
                i = n.ZP.div(["flex:1;overflow:hidden;padding:10px;position:relative;"]),
                a = n.ZP.input(["border:1px solid #ccc;border-radius:0;margin:0;padding:10px;width:100%;"]),
                s = n.ZP.textarea(["border:1px solid #ccc;border-radius:0;font-size:16px;height:200px;margin:0;padding:10px;resize:vertical;white-space:pre-wrap;width:100%;"]),
                d = n.ZP.button(["background-color:#007bff;border:none;border-radius:0;color:#fff;cursor:pointer;padding:10px 15px;&:hover{background-color:#0056b3;}"]),
                l = n.ZP.button(["background-color:red;border:none;border-radius:20%;color:white;cursor:pointer;padding:5px 10px;position:absolute;right:10px;top:10px;&:hover{background-color:darkred;}"]),
                c = n.ZP.div(["background-color:#a2a2a2;border-bottom:1px solid #000;cursor:move;display:flex;justify-content:space-between;padding:10px;"]),
                u = n.ZP.div(["align-items:center;cursor:pointer;display:flex;span{font-size:18px;font-weight:bold;margin-left:10px;}"]),
                p = n.ZP.div(
                    [
                        "align-items:center;background-color:",
                        ";border:",
                        ";color:#007bff;display:",
                        ";inset:0;justify-content:center;padding:",
                        ";position:absolute;transition:background-color 0.3s,border 0.3s;z-index:1001;&::after{content:",
                        ";font-size:1.5em;}",
                    ],
                    (e) => (e.$isDragging ? "#f0f8ff" : "transparent"),
                    (e) => (e.$isDragging ? "2px dashed #007bff" : "none"),
                    (e) => (e.$isDragging ? "flex" : "none"),
                    (e) => (e.$isDragging ? "10px" : "0"),
                    (e) => (e.$isDragging ? "'Drop here'" : "''")
                ),
                x = n.ZP.div([
                    "align-items:center;background-color:#d0c9c9;border-bottom:1px solid #000;display:flex;justify-content:space-between;margin-bottom:15px;padding:10px;.toolbar-button{background-color:#007bff;border:none;border-radius:0;color:white;cursor:pointer;margin-left:5px;padding:5px 10px;&:hover{background-color:#0056b3;}}",
                ]),
                f = n.ZP.div(["margin-top:15px;ul{list-style-type:none;padding:0;}li{background-color:#f1f1f1;border-radius:4px;margin-bottom:5px;padding:5px;}"]),
                g = n.ZP.img(["border-radius:30%;height:50px;width:50px;"]);
        },
        93343: function (e, t, r) {
            r.d(t, {
                aF: function () {
                    return l;
                },
                dr: function () {
                    return d;
                },
                nb: function () {
                    return i;
                },
                r: function () {
                    return a;
                },
            });
            var n = r(85893),
                o = r(67294);
            let i = ["RDI-Applicant", "Asako Satoshi", "Lily Wang", "Madison Byers", "Dominic Gonzalez", "Simone Khan"],
                a = {
                    "RDI-Applicant": "System/Icons/avatars/rdi.png",
                    "Asako Satoshi": "System/Icons/avatars/Asako Satoshi.png",
                    "Lily Wang": "System/Icons/avatars/Lily Wang.png",
                    "Madison Byers": "System/Icons/avatars/Madison Byers.png",
                    "Dominic Gonzalez": "System/Icons/avatars/Dominic Gonzalez.png",
                    "Simone Khan": "System/Icons/avatars/Simone Khan.png",
                },
                s = (0, o.createContext)(void 0),
                d = ({ children: e }) => {
                    let [t, r] = (0, o.useState)(i[0]);
                    return (0, n.jsx)(s.Provider, { value: { currentUser: t, setCurrentUser: r }, children: e });
                },
                l = () => {
                    let e = (0, o.useContext)(s);
                    if (!e) throw Error("useUser must be used within a UserProvider");
                    return e;
                };
        },
        73350: function (e, t, r) {
            r.r(t),
                r.d(t, {
                    default: function () {
                        return y;
                    },
                });
            var n = r(85893),
                o = r(67294),
                i = r(7502),
                a = r(10508);
            let s = a.ZP.div(["background-color:#f9f9f9;border-radius:8px;box-shadow:0 0 10px rgba(0,0,0,10%);display:flex;flex-direction:column;height:600px;padding:20px;position:absolute;width:400px;z-index:1000;"]),
                d = a.ZP.div(["align-items:center;background-color:#a2a2a2;border-bottom:1px solid #000;cursor:move;display:flex;justify-content:space-between;padding:10px;h2{margin:0;}"]),
                l = a.ZP.button(["background-color:#007bff;border:none;border-radius:4px;color:white;cursor:pointer;padding:5px 10px;&:hover{background-color:#0056b3;}"]),
                c = a.ZP.div(["display:flex;height:40px;justify-content:flex-end;padding:5px;"]),
                u = a.ZP.div(["border:1px solid #ccc;border-radius:4px;flex:1;margin-bottom:15px;overflow-y:auto;padding:10px;"]),
                p = a.ZP.div(["background-color:#007bff;border-radius:4px;color:white;margin-bottom:10px;padding:10px;&:nth-child(even){background-color:#f1f1f1;color:black;}"]),
                x = a.ZP.div([
                    "display:flex;select,input{border:1px solid #ccc;border-radius:4px;flex:1;margin-right:10px;padding:10px;}button{background-color:#007bff;border:none;border-radius:4px;color:white;cursor:pointer;padding:10px 15px;&:hover{background-color:#0056b3;}}",
                ]),
                f = a.ZP.button(["background-color:red;border:none;border-radius:4px;color:white;cursor:pointer;padding:5px 10px;position:absolute;right:5px;top:5px;&:hover{background-color:darkred;}"]),
                g = a.ZP.div(["align-items:center;cursor:pointer;display:flex;span{font-size:18px;font-weight:bold;margin-left:10px;}"]),
                b = a.ZP.div(["display:flex;flex-direction:column;"]),
                m = a.ZP.div([
                    "align-items:center;cursor:pointer;display:flex;padding:10px;&:hover{background-color:#b7b5b5;}img{border-radius:50%;height:40px;margin-right:10px;width:40px;}.notification-container{align-items:center;display:flex;margin-top:5px;}.user-details{display:flex;flex-direction:column;}.user-name{align-items:center;display:flex;}.notification-dot{align-items:center;background-color:red;border-radius:50%;color:white;display:flex;font-size:12px;height:20px;justify-content:center;margin-left:5px;width:20px;}small{color:#888;display:flex;flex-direction:column;margin-top:5px;}",
                ]);
            var h = r(93343),
                v = r(73839),
                y = () => {
                    let [e, t] = (0, o.useState)(""),
                        [r, a] = (0, o.useState)([]),
                        [y, k] = (0, o.useState)(null),
                        [w, j] = (0, o.useState)(!0),
                        [S, P] = (0, o.useState)(!1),
                        Z = (0, o.useRef)(null),
                        { currentUser: D } = (0, h.aF)(),
                        [z, $] = (0, o.useState)({ x: 0, y: 0 }),
                        [C, I] = (0, o.useState)({ x: 0, y: 0 }),
                        [L, A] = (0, o.useState)(!0),
                        [E, R] = (0, o.useState)({}),
                        { setMenu: T } = (0, i.H)(),
                        M = (0, o.useRef)(null),
                        [W, N] = (0, o.useState)(""),
                        B = (e) => {
                            $({ x: e.clientX - C.x, y: e.clientY - C.y });
                        },
                        F = () => {
                            document.removeEventListener("mousemove", B), document.removeEventListener("mouseup", F);
                        },
                        G = (e) =>
                            r
                                .slice()
                                .reverse()
                                .find((t) => t.user === e);
                    (0, o.useEffect)(() => {
                        let e = Z.current;
                        e && ((e.style.left = `${z.x}px`), (e.style.top = `${z.y}px`));
                    }, [z]),
                        (0, o.useEffect)(() => {
                            if (w && Z.current) {
                                let e = Z.current,
                                    t = (window.innerWidth - e.offsetWidth) / 2,
                                    r = (window.innerHeight - e.offsetHeight) / 2;
                                $({ x: t, y: r }), (e.style.left = `${t}px`), (e.style.top = `${r}px`), P(!0);
                            }
                        }, [w]),
                        (0, o.useEffect)(() => {
                            if (w) {
                                let e = setTimeout(() => {
                                    a((e) => [...e, { user: "Asako Satoshi", text: "Please send me the SalesReport URL" }]), R((e) => ({ ...e, "Asako Satoshi": !0 }));
                                }, 1e3),
                                    t = setTimeout(() => {
                                        a((e) => [...e, { user: "Dominic Gonzalez", text: "Please send me the RDI sales summary" }]), R((e) => ({ ...e, "Dominic Gonzalez": !0 }));
                                    }, 3e3),
                                    r = setTimeout(() => {
                                        a((e) => [...e, { user: "Lily Wang", text: "Please send me the year of the first modern Olympics" }]), R((e) => ({ ...e, "Lily Wang": !0 }));
                                    }, 5e3);
                                return () => {
                                    clearTimeout(e), clearTimeout(t), clearTimeout(r);
                                };
                            }
                        }, [w]);
                    let U = () => {
                        if (M.current) {
                            let e = M.current.selectionStart || 0,
                                t = M.current.selectionEnd || 0,
                                r = M.current.value.substring(e, t);
                            r &&
                                navigator.clipboard
                                    .writeText(r)
                                    .then(() => {
                                        T({ items: [], x: 0, y: 0 });
                                    })
                                    .catch((e) => { });
                        }
                    },
                        Y = () => {
                            M.current &&
                                navigator.clipboard
                                    .readText()
                                    .then((e) => {
                                        t(e), N(e), T({ items: [], x: 0, y: 0 });
                                    })
                                    .catch((e) => { });
                        };
                    return (0, n.jsxs)("div", {
                        children: [
                            (0, n.jsx)(g, {
                                onDoubleClick: () => {
                                    j((e) => !e);
                                },
                            }),
                            w &&
                            (0, n.jsxs)(s, {
                                ref: Z,
                                style: { visibility: S ? "visible" : "hidden", left: `${z.x}px`, top: `${z.y}px` },
                                children: [
                                    (0, n.jsxs)(d, {
                                        onMouseDown: (e) => {
                                            if (e.target !== e.currentTarget) return;
                                            let t = Z.current;
                                            if (t) {
                                                let r = t.getBoundingClientRect();
                                                I({ x: e.clientX - r.left, y: e.clientY - r.top }), document.addEventListener("mousemove", B), document.addEventListener("mouseup", F);
                                            }
                                        },
                                        children: [
                                            (0, n.jsx)(v.Yt, { src: h.r["RDI-Applicant"], alt: "User Avatar" }),
                                            (0, n.jsx)("h4", { children: "Logged in as RDI-Applicant" }),
                                            (0, n.jsx)("h4", { children: y ? `Chatting with ${y}` : "RDIChat" }),
                                            (0, n.jsx)(f, {
                                                onClick: () => {
                                                    j(!1), P(!1);
                                                },
                                                children: "X",
                                            }),
                                        ],
                                    }),
                                    y &&
                                    (0, n.jsx)(c, {
                                        children: (0, n.jsx)(l, {
                                            onClick: () => {
                                                y && R((e) => ({ ...e, [y]: !1 })), A(!1), k(null);
                                            },
                                            children: "Back",
                                        }),
                                    }),
                                    y
                                        ? (0, n.jsxs)(n.Fragment, {
                                            children: [
                                                (0, n.jsx)(u, { children: r.filter((e) => e.user === y).map((e, t) => (0, n.jsx)(p, { children: e.text }, t)) }),
                                                (0, n.jsx)("form", {
                                                    onSubmit: (r) => {
                                                        r.preventDefault(),
                                                            y &&
                                                            (window.parent && window.parent.postMessage({ event: "messageSent", details: { selectedUser: y, message: e } }, "*"),
                                                                a((t) => [...t, { user: y, text: `${D} to ${y}: ${e}` }]),
                                                                t(""),
                                                                N(""),
                                                                R((e) => ({ ...e, [y]: !0 })));
                                                    },
                                                    children: (0, n.jsxs)(x, {
                                                        onContextMenu: (e) => {
                                                            e.preventDefault(),
                                                                T({
                                                                    items: [
                                                                        { label: "Copy", action: U },
                                                                        { label: "Paste", action: Y },
                                                                    ],
                                                                    x: e.clientX,
                                                                    y: e.clientY,
                                                                });
                                                        },
                                                        children: [
                                                            (0, n.jsx)("input", {
                                                                ref: M,
                                                                type: "text",
                                                                value: W,
                                                                onChange: (e) => {
                                                                    let r = e.target.value;
                                                                    t(r), N(r);
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
                                        : (0, n.jsx)(b, {
                                            children: h.nb
                                                .filter((e) => e !== D)
                                                .map((e) =>
                                                    (0, n.jsxs)(
                                                        m,
                                                        {
                                                            onClick: () => {
                                                                k(e), R((t) => ({ ...t, [e]: !1 }));
                                                            },
                                                            children: [
                                                                (0, n.jsx)("img", { src: h.r[e], alt: `${e}'s avatar` }),
                                                                (0, n.jsxs)("div", {
                                                                    className: "user-details",
                                                                    children: [
                                                                        (0, n.jsxs)("span", { className: "user-name", children: [e, E[e] && (0, n.jsx)("div", { className: "notification-dot", children: "!" })] }),
                                                                        (0, n.jsx)("small", { children: G(e)?.text.substring(0, 90) || "No messages yet" }),
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
    },
]);



// "use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3350],{73839:function(e,t,r){r.d(t,{A3:function(){return c},Fy:function(){return a},LF:function(){return p},Mm:function(){return d},Yt:function(){return g},bu:function(){return s},dD:function(){return l},fK:function(){return o},fU:function(){return f},o8:function(){return x},qk:function(){return u},rT:function(){return i}});var n=r(10508);let o=n.ZP.div(["background-color:#fff;border:1px solid #ccc;box-shadow:0 0 10px rgba(0,0,0,10%);display:flex;flex-direction:column;margin:auto;padding:0;position:absolute;width:600px;z-index:1000;"]),i=n.ZP.div(["flex:1;overflow:hidden;padding:10px;position:relative;"]),a=n.ZP.input(["border:1px solid #ccc;border-radius:0;margin:0;padding:10px;width:100%;"]),s=n.ZP.textarea(["border:1px solid #ccc;border-radius:0;font-size:16px;height:200px;margin:0;padding:10px;resize:vertical;white-space:pre-wrap;width:100%;"]),d=n.ZP.button(["background-color:#007bff;border:none;border-radius:0;color:#fff;cursor:pointer;padding:10px 15px;&:hover{background-color:#0056b3;}"]),l=n.ZP.button(["background-color:red;border:none;border-radius:20%;color:white;cursor:pointer;padding:5px 10px;position:absolute;right:10px;top:10px;&:hover{background-color:darkred;}"]),c=n.ZP.div(["background-color:#a2a2a2;border-bottom:1px solid #000;cursor:move;display:flex;justify-content:space-between;padding:10px;"]),u=n.ZP.div(["align-items:center;cursor:pointer;display:flex;span{font-size:18px;font-weight:bold;margin-left:10px;}"]),p=n.ZP.div(["align-items:center;background-color:",";border:",";color:#007bff;display:",";inset:0;justify-content:center;padding:",";position:absolute;transition:background-color 0.3s,border 0.3s;z-index:1001;&::after{content:",";font-size:1.5em;}"],e=>e.$isDragging?"#f0f8ff":"transparent",e=>e.$isDragging?"2px dashed #007bff":"none",e=>e.$isDragging?"flex":"none",e=>e.$isDragging?"10px":"0",e=>e.$isDragging?"'Drop here'":"''"),x=n.ZP.div(["align-items:center;background-color:#d0c9c9;border-bottom:1px solid #000;display:flex;justify-content:space-between;margin-bottom:15px;padding:10px;.toolbar-button{background-color:#007bff;border:none;border-radius:0;color:white;cursor:pointer;margin-left:5px;padding:5px 10px;&:hover{background-color:#0056b3;}}"]),f=n.ZP.div(["margin-top:15px;ul{list-style-type:none;padding:0;}li{background-color:#f1f1f1;border-radius:4px;margin-bottom:5px;padding:5px;}"]),g=n.ZP.img(["border-radius:30%;height:50px;width:50px;"])},93343:function(e,t,r){r.d(t,{aF:function(){return l},dr:function(){return d},nb:function(){return i},r:function(){return a}});var n=r(85893),o=r(67294);let i=["RDI-Applicant","Asako Satoshi","Lily Wang","Madison Byers","Dominic Gonzalez","Simone Khan"],a={"RDI-Applicant":"System/Icons/avatars/rdi.png","Asako Satoshi":"System/Icons/avatars/Asako Satoshi.png","Lily Wang":"System/Icons/avatars/Lily Wang.png","Madison Byers":"System/Icons/avatars/Madison Byers.png","Dominic Gonzalez":"System/Icons/avatars/Dominic Gonzalez.png","Simone Khan":"System/Icons/avatars/Simone Khan.png"},s=(0,o.createContext)(void 0),d=({children:e})=>{let[t,r]=(0,o.useState)(i[0]);return(0,n.jsx)(s.Provider,{value:{currentUser:t,setCurrentUser:r},children:e})},l=()=>{let e=(0,o.useContext)(s);if(!e)throw Error("useUser must be used within a UserProvider");return e}},73350:function(e,t,r){r.r(t),r.d(t,{default:function(){return y}});var n=r(85893),o=r(67294),i=r(7502),a=r(10508);let s=a.ZP.div(["background-color:#f9f9f9;border-radius:8px;box-shadow:0 0 10px rgba(0,0,0,10%);display:flex;flex-direction:column;height:600px;padding:20px;position:absolute;width:400px;z-index:1000;"]),d=a.ZP.div(["align-items:center;background-color:#a2a2a2;border-bottom:1px solid #000;cursor:move;display:flex;justify-content:space-between;padding:10px;h2{margin:0;}"]),l=a.ZP.button(["background-color:#007bff;border:none;border-radius:4px;color:white;cursor:pointer;padding:5px 10px;&:hover{background-color:#0056b3;}"]),c=a.ZP.div(["display:flex;height:40px;justify-content:flex-end;padding:5px;"]),u=a.ZP.div(["border:1px solid #ccc;border-radius:4px;flex:1;margin-bottom:15px;overflow-y:auto;padding:10px;"]),p=a.ZP.div(["background-color:#007bff;border-radius:4px;color:white;margin-bottom:10px;padding:10px;&:nth-child(even){background-color:#f1f1f1;color:black;}"]),x=a.ZP.div(["display:flex;select,input{border:1px solid #ccc;border-radius:4px;flex:1;margin-right:10px;padding:10px;}button{background-color:#007bff;border:none;border-radius:4px;color:white;cursor:pointer;padding:10px 15px;&:hover{background-color:#0056b3;}}"]),f=a.ZP.button(["background-color:red;border:none;border-radius:4px;color:white;cursor:pointer;padding:5px 10px;position:absolute;right:5px;top:5px;&:hover{background-color:darkred;}"]),g=a.ZP.div(["align-items:center;cursor:pointer;display:flex;span{font-size:18px;font-weight:bold;margin-left:10px;}"]),b=a.ZP.div(["display:flex;flex-direction:column;"]),m=a.ZP.div(["align-items:center;cursor:pointer;display:flex;padding:10px;&:hover{background-color:#b7b5b5;}img{border-radius:50%;height:40px;margin-right:10px;width:40px;}.notification-container{align-items:center;display:flex;margin-top:5px;}.user-details{display:flex;flex-direction:column;}.user-name{align-items:center;display:flex;}.notification-dot{align-items:center;background-color:red;border-radius:50%;color:white;display:flex;font-size:12px;height:20px;justify-content:center;margin-left:5px;width:20px;}small{color:#888;display:flex;flex-direction:column;margin-top:5px;}"]);var h=r(93343),v=r(73839),y=()=>{let[e,t]=(0,o.useState)(""),[r,a]=(0,o.useState)([]),[y,k]=(0,o.useState)(null),[w,j]=(0,o.useState)(!0),[S,P]=(0,o.useState)(!1),Z=(0,o.useRef)(null),{currentUser:D}=(0,h.aF)(),[z,$]=(0,o.useState)({x:0,y:0}),[C,I]=(0,o.useState)({x:0,y:0}),[L,A]=(0,o.useState)(!0),[E,R]=(0,o.useState)({}),{setMenu:T}=(0,i.H)(),M=(0,o.useRef)(null),[W,N]=(0,o.useState)(""),B=e=>{$({x:e.clientX-C.x,y:e.clientY-C.y})},F=()=>{document.removeEventListener("mousemove",B),document.removeEventListener("mouseup",F)},G=e=>r.slice().reverse().find(t=>t.user===e);(0,o.useEffect)(()=>{let e=Z.current;e&&(e.style.left=`${z.x}px`,e.style.top=`${z.y}px`)},[z]),(0,o.useEffect)(()=>{if(w&&Z.current){let e=Z.current,t=(window.innerWidth-e.offsetWidth)/2,r=(window.innerHeight-e.offsetHeight)/2;$({x:t,y:r}),e.style.left=`${t}px`,e.style.top=`${r}px`,P(!0)}},[w]),(0,o.useEffect)(()=>{if(w){let e=setTimeout(()=>{a(e=>[...e,{user:"Asako Satoshi",text:"Please send me the SalesReport URL"}]),R(e=>({...e,"Asako Satoshi":!0}))},1e3),t=setTimeout(()=>{a(e=>[...e,{user:"Dominic Gonzalez",text:"Please send me the RDI sales summary"}]),R(e=>({...e,"Dominic Gonzalez":!0}))},3e3),r=setTimeout(()=>{a(e=>[...e,{user:"Lily Wang",text:"Please send me the year of the first modern Olympics"}]),R(e=>({...e,"Lily Wang":!0}))},5e3);return()=>{clearTimeout(e),clearTimeout(t),clearTimeout(r)}}},[w]);let U=()=>{if(M.current){let e=M.current.selectionStart||0,t=M.current.selectionEnd||0,r=M.current.value.substring(e,t);r&&navigator.clipboard.writeText(r).then(()=>{T({items:[],x:0,y:0})}).catch(e=>{})}},Y=()=>{M.current&&navigator.clipboard.readText().then(e=>{t(e),N(e),T({items:[],x:0,y:0})}).catch(e=>{})};return(0,n.jsxs)("div",{children:[(0,n.jsx)(g,{onDoubleClick:()=>{j(e=>!e)}}),w&&(0,n.jsxs)(s,{ref:Z,style:{visibility:S?"visible":"hidden",left:`${z.x}px`,top:`${z.y}px`},children:[(0,n.jsxs)(d,{onMouseDown:e=>{if(e.target!==e.currentTarget)return;let t=Z.current;if(t){let r=t.getBoundingClientRect();I({x:e.clientX-r.left,y:e.clientY-r.top}),document.addEventListener("mousemove",B),document.addEventListener("mouseup",F)}},children:[(0,n.jsx)(v.Yt,{src:h.r["RDI-Applicant"],alt:"User Avatar"}),(0,n.jsx)("h4",{children:"Logged in as RDI-Applicant"}),(0,n.jsx)("h4",{children:y?`Chatting with ${y}`:"RDIChat"}),(0,n.jsx)(f,{onClick:()=>{j(!1),P(!1)},children:"X"})]}),y&&(0,n.jsx)(c,{children:(0,n.jsx)(l,{onClick:()=>{y&&R(e=>({...e,[y]:!1})),A(!1),k(null)},children:"Back"})}),y?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(u,{children:r.filter(e=>e.user===y).map((e,t)=>(0,n.jsx)(p,{children:e.text},t))}),(0,n.jsx)("form",{onSubmit:r=>{r.preventDefault(),y&&(window.parent&&window.parent.postMessage({event:"messageSent",details:{selectedUser:y,message:e}},"*"),a(t=>[...t,{user:y,text:`${D} to ${y}: ${e}`}]),t(""),N(""),R(e=>({...e,[y]:!0})))},children:(0,n.jsxs)(x,{onContextMenu:e=>{e.preventDefault(),T({items:[{label:"Copy",action:U},{label:"Paste",action:Y}],x:e.clientX,y:e.clientY})},children:[(0,n.jsx)("input",{ref:M,type:"text",value:W,onChange:e=>{let r=e.target.value;t(r),N(r)},placeholder:"Type your message...",required:!0}),(0,n.jsx)("button",{type:"submit",children:"Send"})]})})]}):(0,n.jsx)(b,{children:h.nb.filter(e=>e!==D).map(e=>(0,n.jsxs)(m,{onClick:()=>{k(e),R(t=>({...t,[e]:!1}))},children:[(0,n.jsx)("img",{src:h.r[e],alt:`${e}'s avatar`}),(0,n.jsxs)("div",{className:"user-details",children:[(0,n.jsxs)("span",{className:"user-name",children:[e,E[e]&&(0,n.jsx)("div",{className:"notification-dot",children:"!"})]}),(0,n.jsx)("small",{children:G(e)?.text.substring(0,90)||"No messages yet"})]})]},e))})]})]})}}}]);