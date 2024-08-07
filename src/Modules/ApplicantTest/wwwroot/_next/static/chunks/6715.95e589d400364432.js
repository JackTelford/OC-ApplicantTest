"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [6715],
    {
        93714: function (e, t, r) {
            var i = r(85893),
                n = r(37725),
                s = r(58437);
            t.Z = ({ id: e, onClick: t }) => {
                let { closeWithTransition: r } = (0, s.z)(),
                    o = () => r(e);
                return (0, i.jsxs)("nav", { className: "buttons", children: [(0, i.jsx)(n.Z, { onClick: t || o, children: "OK" }), (0, i.jsx)(n.Z, { onClick: o, children: "Cancel" })] });
            };
        },
        46715: function (e, t, r) {
            r.r(t),
                r.d(t, {
                    default: function () {
                        return N;
                    },
                });
            var i = r(85893),
                n = r(1864),
                s = r(67294),
                o = r(5152),
                l = r.n(o),
                a = r(87180),
                c = r(93714),
                d = r(20063),
                p = (e) => {
                    let { stat: t } = (0, d.o)(),
                        [r, i] = (0, s.useState)();
                    return (
                        (0, s.useEffect)(() => {
                            !r && e && t(e).then(i);
                        }, [t, r, e]),
                        r
                    );
                },
                x = r(43950),
                h = r(6155),
                u = r(23736),
                f = r(58437),
                g = r(37176),
                b = r(76488),
                j = r(46581),
                m = r(97836),
                w = r(6484);
            let y = (e) => e?.toLocaleString(m.ZW, { dateStyle: "long", timeStyle: "medium" }).replace(" at ", ", ") || "";
            var v = (0, s.memo)(({ icon: e, id: t, isShortcut: r, pid: o, url: l }) => {
                let { closeWithTransition: a, icon: v } = (0, f.z)(),
                    { setIconPositions: k } = (0, b.k)(),
                    S = (0, s.useMemo)(() => (0, w.RT)(l || ""), [l]),
                    { type: Z } = x.Z[S] || {},
                    C = Z || `${S.toUpperCase().replace(".", "")} File`,
                    $ = (0, s.useRef)(null),
                    { fs: z, readdir: E, rename: N, stat: L, updateFolder: D } = (0, d.o)(),
                    F = p(l),
                    [R, M] = (0, s.useState)(0),
                    [T, A] = (0, s.useState)(0),
                    [K, P] = (0, s.useState)(0),
                    _ = (0, s.useMemo)(() => F?.isDirectory(), [F]),
                    G = K || (_ ? 0 : F?.size),
                    W = (0, s.useRef)(!1),
                    X = (0, s.useRef)(),
                    [H, O] = (0, s.useState)(m.XN),
                    U = (0, s.useCallback)(async () => {
                        if ($.current && l && $.current.value !== (0, n.basename)(l)) {
                            let e = (0, u.gL)($.current.value).trim();
                            if ((e?.endsWith(".") && (e = e.slice(0, -1)), e)) {
                                let t = (0, n.dirname)(l),
                                    i = `${(0, n.join)(t, e)}${r ? (0, n.extname)(l) : ""}`;
                                (await N(l, i)) && D(t, i, l),
                                    (0, n.dirname)(l) === m.Ll &&
                                    k((e) => {
                                        let { [l]: t, ...r } = e;
                                        return t && (r[i] = t), r;
                                    });
                            }
                        }
                        a(t);
                    }, [a, t, r, N, k, D, l]);
                return (
                    (0, s.useEffect)(() => {
                        _ && z && (H === m.XN && (0, h.nR)(z, l).then((e) => e && O(e)), v(t, H || m.XN));
                    }, [H, z, t, _, v, l]),
                    (0, s.useEffect)(() => {
                        if (!W.current && !r && _) {
                            (W.current = !0), (X.current = new AbortController());
                            let e = async (t) => {
                                if (X.current?.signal.aborted) return;
                                let r = await E(t),
                                    i = 0,
                                    s = 0,
                                    o = 0;
                                for (let l of r) {
                                    let r = await L((0, n.join)(t, l));
                                    r.isDirectory() ? ((s += 1), await e((0, n.join)(t, l))) : ((i += 1), (o += r.size));
                                }
                                P((e) => e + o), M((e) => e + i), A((e) => e + s);
                            };
                            e(l);
                        }
                    }, [_, r, E, L, l]),
                    (0, s.useEffect)(() => () => X.current?.abort(), []),
                    (0, i.jsxs)(i.Fragment, {
                        children: [
                            (0, i.jsx)("table", {
                                className: "general",
                                children: (0, i.jsxs)("tbody", {
                                    children: [
                                        (0, i.jsxs)("tr", {
                                            className: "header",
                                            children: [
                                                (0, i.jsxs)("th", { scope: "row", children: [(0, i.jsx)(j.Z, { imgSize: 32, src: _ ? H : e }), r && (0, i.jsx)(j.Z, { imgSize: 48, src: m.MB })] }),
                                                (0, i.jsx)("td", {
                                                    children: (0, i.jsx)("input", {
                                                        ref: $,
                                                        defaultValue: (0, n.basename)(l, r ? (0, n.extname)(l) : void 0),
                                                        enterKeyHint: "done",
                                                        maxLength: m.Zv,
                                                        onKeyDown: (e) => {
                                                            "Enter" === e.key && ((0, w.nK)(e), U());
                                                        },
                                                        type: "text",
                                                        ...m.AA,
                                                    }),
                                                }),
                                            ],
                                        }),
                                        (0, i.jsx)("tr", { children: (0, i.jsx)("td", { className: "spacer", colSpan: 2 }) }),
                                        (0, i.jsxs)("tr", {
                                            children: [(0, i.jsx)("th", { scope: "row", children: _ ? "Type:" : "Type of file:" }), (0, i.jsx)("td", { children: _ ? "File folder" : r || C ? `${r ? "Shortcut" : C} (${S})` : "File" })],
                                        }),
                                        !_ &&
                                        (0, i.jsxs)("tr", {
                                            children: [
                                                (0, i.jsx)("th", { scope: "row", children: o ? "Opens with:" : "Description:" }),
                                                (0, i.jsxs)("td", { children: [o && g.Z[o]?.icon && (0, i.jsx)(j.Z, { imgSize: 16, src: g.Z[o].icon }), o ? g.Z[o]?.title || o : (0, n.basename)(l || "")] }),
                                            ],
                                        }),
                                        !_ && (0, i.jsx)("tr", { children: (0, i.jsx)("td", { className: "spacer", colSpan: 2 }) }),
                                        (0, i.jsxs)("tr", { children: [(0, i.jsx)("th", { scope: "row", children: "Location:" }), (0, i.jsx)("td", { children: (0, n.dirname)(l) })] }),
                                        (0, i.jsxs)("tr", {
                                            children: [(0, i.jsx)("th", { scope: "row", children: "Size" }), (0, i.jsx)("td", { children: G ? `${(0, w.UR)(G)} (${G.toLocaleString()} byte${1 === G ? "" : "s"})` : "0 bytes" })],
                                        }),
                                        _ && (0, i.jsxs)("tr", { children: [(0, i.jsx)("th", { scope: "row", children: "Contains" }), (0, i.jsx)("td", { children: `${R.toLocaleString()} Files, ${T.toLocaleString()} Folders` })] }),
                                        (0, i.jsx)("tr", { children: (0, i.jsx)("td", { className: "spacer", colSpan: 2 }) }),
                                        (0, i.jsxs)("tr", { children: [(0, i.jsx)("th", { scope: "row", children: "Created:" }), (0, i.jsx)("td", { children: y(F?.ctime) })] }),
                                        !F?.isDirectory() && (0, i.jsxs)("tr", { children: [(0, i.jsx)("th", { scope: "row", children: "Modified:" }), (0, i.jsx)("td", { children: F && y(new Date((0, h.GA)(l, F))) })] }),
                                        (0, i.jsxs)("tr", { children: [(0, i.jsx)("th", { scope: "row", children: "Accessed:" }), (0, i.jsx)("td", { children: y(F?.atime) })] }),
                                    ],
                                }),
                            }),
                            (0, i.jsx)(c.Z, { id: t, onClick: U }),
                        ],
                    })
                );
            });
            let k = r(10508).ZP.div([
                "padding:0 8px 0 6px;table.general{background-color:#fff;border:1px solid rgb(217,217,217);height:calc(100% - 36px - 28px);padding-top:14px;position:relative;top:-1px;width:100%;tbody{display:flex;flex-direction:column;font-size:11.5px;gap:11px;tr{display:flex;padding:0 12px;place-content:center;place-items:center;&.header{margin-bottom:-4px;margin-top:-2px;padding:0 10px 0 12px;}}th{font-weight:400;text-align:left;width:74px;picture:nth-child(2){position:absolute;top:-2px;}}td{cursor:text;display:flex;user-select:text;width:calc(100% - 70px);&.spacer{border-bottom:1px solid rgb(160,160,160);display:block;width:100%;}input{border:1px solid rgb(122,122,122);font-size:11px;height:23px;padding:3px;width:100%;}img{margin-right:7px;}}}}nav{&.tabs{display:flex;height:28px;padding-top:7px;position:relative;z-index:1;button{background-color:#fff;border:1px solid rgb(217,217,217);border-bottom-width:0;display:flex;font-size:11.5px;height:21px;line-height:16px;padding:1px 6px;place-content:center;width:auto;z-index:2;&.inactive{background-color:rgb(240,240,240);border-bottom:1px solid rgb(217,217,217);height:19px;left:-1px;position:relative;top:2px;z-index:1;&:first-child{left:2px;}&:hover{background-color:rgb(216,234,249);}}}}&.buttons{display:flex;gap:8px;height:35px;margin-right:-1px;place-content:flex-end;place-items:center;button{height:21px;line-height:19px;}}}",
            ]);
            var S = r(37725),
                Z = r(33975),
                C = r(44696);
            let $ = l()(() => r.e(9484, "high").then(r.bind(r, 39484)), { loadableGenerated: { webpack: () => [39484] } }),
                z = new Set(["PDF", "Photos", "Ruffle", "VideoPlayer", "Webamp"]),
                E = new Set([".jpg", "jpeg", ".tif", ".tiff"]);
            var N = ({ id: e }) => {
                let { icon: t, processes: { [e]: r } = {} } = (0, f.z)(),
                    { shortcutPath: o, url: l } = r || {},
                    c = o || l || "",
                    d = p(c),
                    [{ getIcon: x, icon: h, pid: u }] = (0, Z.Z)(c, d?.isDirectory()),
                    { prependFileToTitle: g } = (0, C.Z)(e),
                    b = (0, s.useRef)(),
                    j = (0, s.useRef)(null),
                    y = (0, a.Z)(e),
                    [N, L] = (0, s.useState)("general"),
                    D = !!r?.shortcutPath,
                    [F, R] = (0, s.useState)({}),
                    M = "general" === N,
                    T = "details" === N,
                    A = (0, s.useMemo)(() => (0, n.extname)(c), [c]);
                return (
                    (0, s.useEffect)(() => {
                        t(e, h), "function" == typeof x && ".exe" === A.toLowerCase() && ((b.current = new AbortController()), x(b.current.signal)), c && g((0, n.basename)(c, o ? A : void 0), !1, !0);
                    }, [A, c, x, h, e, g, t, o]),
                    (0, s.useEffect)(
                        () => () => {
                            try {
                                b?.current?.abort?.();
                            } catch { }
                        },
                        []
                    ),
                    (0, s.useEffect)(() => j.current?.focus(m.eS), []),
                    (0, i.jsxs)(k, {
                        ref: j,
                        onContextMenu: (e) => {
                            e.target instanceof HTMLInputElement || (0, w.nK)(e);
                        },
                        ...y,
                        children: [
                            (0, i.jsxs)("nav", {
                                className: "tabs",
                                children: [
                                    (0, i.jsx)(S.Z, { className: M ? void 0 : "inactive", onClick: M ? void 0 : () => L("general"), children: "General" }),
                                    z.has(u) && !D && (0, i.jsx)(S.Z, { className: T ? void 0 : "inactive", onClick: T ? void 0 : () => L("details"), children: "Details" }),
                                ],
                            }),
                            M && (0, i.jsx)(v, { icon: h, id: e, isShortcut: D, pid: u, url: c }),
                            T && (0, i.jsx)($, { hasExif: E.has(A.toLowerCase()), id: e, metaData: F, setMetaData: R, url: l }),
                        ],
                    })
                );
            };
        },
        37725: function (e, t, r) {
            let i = r(10508).ZP.button(
                [
                    "background-color:rgb(225,225,225);border:1px solid rgb(173,173,173);color:#000;display:grid;font-family:",
                    ";font-size:12px;height:23px;line-height:",
                    "px;transition:background-color 0.25s ease;width:73px;&:focus,&.focus{border:2px solid rgb(0,120,215);line-height:",
                    "px;}&:hover{background-color:rgb(229,241,251);border:1px solid rgb(0,120,215);line-height:",
                    "px;}&:active{background-color:rgb(204,228,247);border:1px solid rgb(0,84,153);line-height:",
                    "px;transition:none;}&:disabled{background-color:rgb(204,204,204);border:1px solid rgb(191,191,191);color:#808080;line-height:",
                    "px;}",
                ],
                ({ theme: e }) => e.formats.systemFont,
                21,
                19,
                21,
                21,
                21
            );
            t.Z = i;
        },
        87180: function (e, t, r) {
            var i = r(67294),
                n = r(58437),
                s = r(97836);
            t.Z = (e) => {
                let { closeWithTransition: t } = (0, n.z)();
                return { onKeyDownCapture: (0, i.useCallback)(({ key: r }) => "Escape" === r && t(e), [t, e]), ...s.LL };
            };
        },
        33975: function (e, t, r) {
            var i = r(67294),
                n = r(6155),
                s = r(20063),
                o = r(18575),
                l = r(97836),
                a = r(6484);
            let c = { icon: "", pid: "", url: "" };
            t.Z = (e, t = !1, r = !1, d = !0) => {
                let [p, x] = (0, i.useState)(c),
                    h = (0, i.useRef)(!1),
                    u = (e) => {
                        x(e), (h.current = !1);
                    },
                    { fs: f, rootFs: g } = (0, s.o)();
                return (
                    (0, i.useEffect)(() => {
                        if (f && g && !h.current && d && p === c) {
                            h.current = !0;
                            let i = (0, a.RT)(e);
                            i && (!t || l.my.has(i) || (0, o.isMountedFolder)(g.mntMap[e])) ? (0, n.Z7)(f, e, i, u) : (0, n.g7)(f, g, e, t, r, u);
                        }
                    }, [f, r, p, t, d, e, g]),
                    [p, x]
                );
            };
        },
        44696: function (e, t, r) {
            var i = r(67294),
                n = r(58437),
                s = r(37176),
                o = r(97836);
            t.Z = (e) => {
                let { title: t } = (0, n.z)(),
                    [r] = e.split(o.CC),
                    { title: l } = s.Z[r] || {};
                return {
                    appendFileToTitle: (0, i.useCallback)(
                        (r, i) => {
                            let n = r ? ` - ${r}${i ? ` ${o.xy}` : ""}` : "";
                            t(e, `${l}${n}`);
                        },
                        [e, l, t]
                    ),
                    prependFileToTitle: (0, i.useCallback)(
                        (r, i, n) => {
                            let s = r ? `${i ? `${o.xy} ` : ""}${r}${n ? " " : " - "}` : "";
                            t(e, `${s}${l}`);
                        },
                        [e, l, t]
                    ),
                };
            };
        },
    },
]);



// "use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6715],{93714:function(e,t,r){var i=r(85893),n=r(37725),s=r(58437);t.Z=({id:e,onClick:t})=>{let{closeWithTransition:r}=(0,s.z)(),o=()=>r(e);return(0,i.jsxs)("nav",{className:"buttons",children:[(0,i.jsx)(n.Z,{onClick:t||o,children:"OK"}),(0,i.jsx)(n.Z,{onClick:o,children:"Cancel"})]})}},46715:function(e,t,r){r.r(t),r.d(t,{default:function(){return N}});var i=r(85893),n=r(1864),s=r(67294),o=r(5152),l=r.n(o),a=r(87180),c=r(93714),d=r(20063),p=e=>{let{stat:t}=(0,d.o)(),[r,i]=(0,s.useState)();return(0,s.useEffect)(()=>{!r&&e&&t(e).then(i)},[t,r,e]),r},x=r(43950),h=r(6155),u=r(23736),f=r(58437),g=r(37176),b=r(76488),j=r(46581),m=r(97836),w=r(6484);let y=e=>e?.toLocaleString(m.ZW,{dateStyle:"long",timeStyle:"medium"}).replace(" at ",", ")||"";var v=(0,s.memo)(({icon:e,id:t,isShortcut:r,pid:o,url:l})=>{let{closeWithTransition:a,icon:v}=(0,f.z)(),{setIconPositions:k}=(0,b.k)(),S=(0,s.useMemo)(()=>(0,w.RT)(l||""),[l]),{type:Z}=x.Z[S]||{},C=Z||`${S.toUpperCase().replace(".","")} File`,$=(0,s.useRef)(null),{fs:z,readdir:E,rename:N,stat:L,updateFolder:D}=(0,d.o)(),F=p(l),[R,M]=(0,s.useState)(0),[T,A]=(0,s.useState)(0),[K,P]=(0,s.useState)(0),_=(0,s.useMemo)(()=>F?.isDirectory(),[F]),G=K||(_?0:F?.size),W=(0,s.useRef)(!1),X=(0,s.useRef)(),[H,O]=(0,s.useState)(m.XN),U=(0,s.useCallback)(async()=>{if($.current&&l&&$.current.value!==(0,n.basename)(l)){let e=(0,u.gL)($.current.value).trim();if(e?.endsWith(".")&&(e=e.slice(0,-1)),e){let t=(0,n.dirname)(l),i=`${(0,n.join)(t,e)}${r?(0,n.extname)(l):""}`;await N(l,i)&&D(t,i,l),(0,n.dirname)(l)===m.Ll&&k(e=>{let{[l]:t,...r}=e;return t&&(r[i]=t),r})}}a(t)},[a,t,r,N,k,D,l]);return(0,s.useEffect)(()=>{_&&z&&(H===m.XN&&(0,h.nR)(z,l).then(e=>e&&O(e)),v(t,H||m.XN))},[H,z,t,_,v,l]),(0,s.useEffect)(()=>{if(!W.current&&!r&&_){W.current=!0,X.current=new AbortController;let e=async t=>{if(X.current?.signal.aborted)return;let r=await E(t),i=0,s=0,o=0;for(let l of r){let r=await L((0,n.join)(t,l));r.isDirectory()?(s+=1,await e((0,n.join)(t,l))):(i+=1,o+=r.size)}P(e=>e+o),M(e=>e+i),A(e=>e+s)};e(l)}},[_,r,E,L,l]),(0,s.useEffect)(()=>()=>X.current?.abort(),[]),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("table",{className:"general",children:(0,i.jsxs)("tbody",{children:[(0,i.jsxs)("tr",{className:"header",children:[(0,i.jsxs)("th",{scope:"row",children:[(0,i.jsx)(j.Z,{imgSize:32,src:_?H:e}),r&&(0,i.jsx)(j.Z,{imgSize:48,src:m.MB})]}),(0,i.jsx)("td",{children:(0,i.jsx)("input",{ref:$,defaultValue:(0,n.basename)(l,r?(0,n.extname)(l):void 0),enterKeyHint:"done",maxLength:m.Zv,onKeyDown:e=>{"Enter"===e.key&&((0,w.nK)(e),U())},type:"text",...m.AA})})]}),(0,i.jsx)("tr",{children:(0,i.jsx)("td",{className:"spacer",colSpan:2})}),(0,i.jsxs)("tr",{children:[(0,i.jsx)("th",{scope:"row",children:_?"Type:":"Type of file:"}),(0,i.jsx)("td",{children:_?"File folder":r||C?`${r?"Shortcut":C} (${S})`:"File"})]}),!_&&(0,i.jsxs)("tr",{children:[(0,i.jsx)("th",{scope:"row",children:o?"Opens with:":"Description:"}),(0,i.jsxs)("td",{children:[o&&g.Z[o]?.icon&&(0,i.jsx)(j.Z,{imgSize:16,src:g.Z[o].icon}),o?g.Z[o]?.title||o:(0,n.basename)(l||"")]})]}),!_&&(0,i.jsx)("tr",{children:(0,i.jsx)("td",{className:"spacer",colSpan:2})}),(0,i.jsxs)("tr",{children:[(0,i.jsx)("th",{scope:"row",children:"Location:"}),(0,i.jsx)("td",{children:(0,n.dirname)(l)})]}),(0,i.jsxs)("tr",{children:[(0,i.jsx)("th",{scope:"row",children:"Size"}),(0,i.jsx)("td",{children:G?`${(0,w.UR)(G)} (${G.toLocaleString()} byte${1===G?"":"s"})`:"0 bytes"})]}),_&&(0,i.jsxs)("tr",{children:[(0,i.jsx)("th",{scope:"row",children:"Contains"}),(0,i.jsx)("td",{children:`${R.toLocaleString()} Files, ${T.toLocaleString()} Folders`})]}),(0,i.jsx)("tr",{children:(0,i.jsx)("td",{className:"spacer",colSpan:2})}),(0,i.jsxs)("tr",{children:[(0,i.jsx)("th",{scope:"row",children:"Created:"}),(0,i.jsx)("td",{children:y(F?.ctime)})]}),!F?.isDirectory()&&(0,i.jsxs)("tr",{children:[(0,i.jsx)("th",{scope:"row",children:"Modified:"}),(0,i.jsx)("td",{children:F&&y(new Date((0,h.GA)(l,F)))})]}),(0,i.jsxs)("tr",{children:[(0,i.jsx)("th",{scope:"row",children:"Accessed:"}),(0,i.jsx)("td",{children:y(F?.atime)})]})]})}),(0,i.jsx)(c.Z,{id:t,onClick:U})]})});let k=r(10508).ZP.div(["padding:0 8px 0 6px;table.general{background-color:#fff;border:1px solid rgb(217,217,217);height:calc(100% - 36px - 28px);padding-top:14px;position:relative;top:-1px;width:100%;tbody{display:flex;flex-direction:column;font-size:11.5px;gap:11px;tr{display:flex;padding:0 12px;place-content:center;place-items:center;&.header{margin-bottom:-4px;margin-top:-2px;padding:0 10px 0 12px;}}th{font-weight:400;text-align:left;width:74px;picture:nth-child(2){position:absolute;top:-2px;}}td{cursor:text;display:flex;user-select:text;width:calc(100% - 70px);&.spacer{border-bottom:1px solid rgb(160,160,160);display:block;width:100%;}input{border:1px solid rgb(122,122,122);font-size:11px;height:23px;padding:3px;width:100%;}img{margin-right:7px;}}}}nav{&.tabs{display:flex;height:28px;padding-top:7px;position:relative;z-index:1;button{background-color:#fff;border:1px solid rgb(217,217,217);border-bottom-width:0;display:flex;font-size:11.5px;height:21px;line-height:16px;padding:1px 6px;place-content:center;width:auto;z-index:2;&.inactive{background-color:rgb(240,240,240);border-bottom:1px solid rgb(217,217,217);height:19px;left:-1px;position:relative;top:2px;z-index:1;&:first-child{left:2px;}&:hover{background-color:rgb(216,234,249);}}}}&.buttons{display:flex;gap:8px;height:35px;margin-right:-1px;place-content:flex-end;place-items:center;button{height:21px;line-height:19px;}}}"]);var S=r(37725),Z=r(33975),C=r(44696);let $=l()(()=>r.e(9484,"high").then(r.bind(r,39484)),{loadableGenerated:{webpack:()=>[39484]}}),z=new Set(["PDF","Photos","Ruffle","VideoPlayer","Webamp"]),E=new Set([".jpg","jpeg",".tif",".tiff"]);var N=({id:e})=>{let{icon:t,processes:{[e]:r}={}}=(0,f.z)(),{shortcutPath:o,url:l}=r||{},c=o||l||"",d=p(c),[{getIcon:x,icon:h,pid:u}]=(0,Z.Z)(c,d?.isDirectory()),{prependFileToTitle:g}=(0,C.Z)(e),b=(0,s.useRef)(),j=(0,s.useRef)(null),y=(0,a.Z)(e),[N,L]=(0,s.useState)("general"),D=!!r?.shortcutPath,[F,R]=(0,s.useState)({}),M="general"===N,T="details"===N,A=(0,s.useMemo)(()=>(0,n.extname)(c),[c]);return(0,s.useEffect)(()=>{t(e,h),"function"==typeof x&&".exe"===A.toLowerCase()&&(b.current=new AbortController,x(b.current.signal)),c&&g((0,n.basename)(c,o?A:void 0),!1,!0)},[A,c,x,h,e,g,t,o]),(0,s.useEffect)(()=>()=>{try{b?.current?.abort?.()}catch{}},[]),(0,s.useEffect)(()=>j.current?.focus(m.eS),[]),(0,i.jsxs)(k,{ref:j,onContextMenu:e=>{e.target instanceof HTMLInputElement||(0,w.nK)(e)},...y,children:[(0,i.jsxs)("nav",{className:"tabs",children:[(0,i.jsx)(S.Z,{className:M?void 0:"inactive",onClick:M?void 0:()=>L("general"),children:"General"}),z.has(u)&&!D&&(0,i.jsx)(S.Z,{className:T?void 0:"inactive",onClick:T?void 0:()=>L("details"),children:"Details"})]}),M&&(0,i.jsx)(v,{icon:h,id:e,isShortcut:D,pid:u,url:c}),T&&(0,i.jsx)($,{hasExif:E.has(A.toLowerCase()),id:e,metaData:F,setMetaData:R,url:l})]})}},37725:function(e,t,r){let i=r(10508).ZP.button(["background-color:rgb(225,225,225);border:1px solid rgb(173,173,173);color:#000;display:grid;font-family:",";font-size:12px;height:23px;line-height:","px;transition:background-color 0.25s ease;width:73px;&:focus,&.focus{border:2px solid rgb(0,120,215);line-height:","px;}&:hover{background-color:rgb(229,241,251);border:1px solid rgb(0,120,215);line-height:","px;}&:active{background-color:rgb(204,228,247);border:1px solid rgb(0,84,153);line-height:","px;transition:none;}&:disabled{background-color:rgb(204,204,204);border:1px solid rgb(191,191,191);color:#808080;line-height:","px;}"],({theme:e})=>e.formats.systemFont,21,19,21,21,21);t.Z=i},87180:function(e,t,r){var i=r(67294),n=r(58437),s=r(97836);t.Z=e=>{let{closeWithTransition:t}=(0,n.z)();return{onKeyDownCapture:(0,i.useCallback)(({key:r})=>"Escape"===r&&t(e),[t,e]),...s.LL}}},33975:function(e,t,r){var i=r(67294),n=r(6155),s=r(20063),o=r(18575),l=r(97836),a=r(6484);let c={icon:"",pid:"",url:""};t.Z=(e,t=!1,r=!1,d=!0)=>{let[p,x]=(0,i.useState)(c),h=(0,i.useRef)(!1),u=e=>{x(e),h.current=!1},{fs:f,rootFs:g}=(0,s.o)();return(0,i.useEffect)(()=>{if(f&&g&&!h.current&&d&&p===c){h.current=!0;let i=(0,a.RT)(e);i&&(!t||l.my.has(i)||(0,o.isMountedFolder)(g.mntMap[e]))?(0,n.Z7)(f,e,i,u):(0,n.g7)(f,g,e,t,r,u)}},[f,r,p,t,d,e,g]),[p,x]}},44696:function(e,t,r){var i=r(67294),n=r(58437),s=r(37176),o=r(97836);t.Z=e=>{let{title:t}=(0,n.z)(),[r]=e.split(o.CC),{title:l}=s.Z[r]||{};return{appendFileToTitle:(0,i.useCallback)((r,i)=>{let n=r?` - ${r}${i?` ${o.xy}`:""}`:"";t(e,`${l}${n}`)},[e,l,t]),prependFileToTitle:(0,i.useCallback)((r,i,n)=>{let s=r?`${i?`${o.xy} `:""}${r}${n?" ":" - "}`:"";t(e,`${s}${l}`)},[e,l,t])}}}}]);