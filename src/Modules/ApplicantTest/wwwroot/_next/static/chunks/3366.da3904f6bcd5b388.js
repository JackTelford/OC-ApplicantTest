"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [3366, 3333],
    {
        83366: function (e, t, a) {
            a.r(t),
                a.d(t, {
                    default: function () {
                        return w;
                    },
                });
            var n = a(85893),
                i = a(1864),
                r = a(67294);
            let l = a(10508).ZP.div(["iframe{opacity:", ";transition:opacity 0.25s ease-in;}.loading{&::before{color:#fff;font-weight:500;mix-blend-mode:normal;text-shadow:1px 2px 3px rgba(0,0,0,50%);}}"], ({ $loaded: e }) =>
                e ? "100%" : "0%"
            );
            var s = a(33333),
                o = a(45279),
                f = a(44696),
                d = a(20063),
                c = a(58437),
                u = a(76488),
                p = a(97836),
                m = a(48764).Buffer,
                w = ({ id: e }) => {
                    let { closeWithTransition: t, processes: { [e]: { libs: [a = ""] = [], url: w = "" } = {} } = {} } = (0, c.z)(),
                        { createPath: h, exists: y, readFile: g, updateFolder: b, writeFile: $ } = (0, d.o)(),
                        { foregroundId: k, setForegroundId: x, setWallpaper: v } = (0, u.k)(),
                        L = (0, r.useRef)(null),
                        [E, _] = (0, r.useState)(!1),
                        [T, j] = (0, r.useState)(),
                        { prependFileToTitle: C } = (0, f.Z)(e),
                        F = (0, r.useCallback)(
                            (e) => (t) => {
                                let a = (0, i.join)(p.dA, "wallpaper.png");
                                t.toBlob(async (t) => {
                                    await $(a, m.from(await t?.arrayBuffer()), !0), v(a, e);
                                });
                            },
                            [v, $]
                        ),
                        { onDragOver: H, onDrop: Z } = (0, o.Z)({ id: e });
                    return (
                        (0, r.useEffect)(() => {
                            C("Untitled");
                        }, [C]),
                        (0, r.useEffect)(() => {
                            k !== e && L.current?.contentWindow?.addEventListener("click", () => x(e), p.K7);
                        }, [k, e, x]),
                        (0, r.useEffect)(() => {
                            let { contentWindow: a } = L.current || {};
                            if (E && a && !T) {
                                let n = a.systemHooks.showOpenFileDialog,
                                    r = a.file_new;
                                j(a),
                                    (a.file_new = () => {
                                        C("Untitled"), r();
                                    }),
                                    (a.systemHooks.setWallpaperTiled = F("tile")),
                                    (a.systemHooks.setWallpaperCentered = F("center")),
                                    (a.systemHooks.showOpenFileDialog = async (e) => {
                                        let { file: t } = await n(e);
                                        return C(t.name), { file: t };
                                    }),
                                    (a.close = () => t(e)),
                                    (a.storage_quota_exceeded = () => { }),
                                    (a.systemHooks.showSaveFileDialog = async ({ defaultFileName: e, getBlob: t }) => b(p.Ll, await h(`${e}.png`, p.Ll, m.from(await (await t("image/png")).arrayBuffer())))),
                                    (a.systemHooks.writeBlobToHandle = async (e, t) => {
                                        (await y(e)) && (await $(e, m.from(await t.arrayBuffer()), !0), await b((0, i.dirname)(e), (0, i.basename)(e)));
                                    }),
                                    a.addEventListener("dragover", H),
                                    a.addEventListener("drop", Z);
                            }
                        }, [t, h, y, e, T, E, H, Z, C, F, b, $]),
                        (0, r.useEffect)(() => {
                            T &&
                                w &&
                                g(w).then((e) => {
                                    let t = T.onunhandledrejection;
                                    (T.onunhandledrejection = (e) => {
                                        t?.(e), e?.reason?.message === "either options.data or options.file or options.filePath must be passed" && C("Untitled");
                                    }),
                                        T.open_from_file(new File([e], w), w),
                                        C((0, i.basename)(w));
                                });
                        }, [T, C, g, w]),
                        (0, n.jsxs)(l, {
                            $loaded: E,
                            children: [!E && (0, n.jsx)(s.default, { className: "loading" }), (0, n.jsx)("iframe", { ref: L, height: "100%", id: `jspaint-${e}`, onLoad: () => _(!0), src: a, title: e, width: "100%", ...p.v0 })],
                        })
                    );
                };
        },
        33333: function (e, t, a) {
            a.r(t);
            let n = a(10508).ZP.div(['cursor:wait;height:100%;width:100%;&::before{color:#fff;content:"Working on it...";display:flex;font-size:12px;justify-content:center;mix-blend-mode:difference;padding-top:18px;}']);
            t.default = n;
        },
        45279: function (e, t, a) {
            var n = a(1864),
                i = a(67294),
                r = a(59746),
                l = a(23736),
                s = a(89670),
                o = a(20063),
                f = a(58437),
                d = a(76488),
                c = a(97836),
                u = a(6484);
            t.Z = ({ callback: e, directory: t = c.Ll, id: a, onDragLeave: p, onDragOver: m, updatePositions: w }) => {
                let { url: h } = (0, f.z)(),
                    { iconPositions: y, sortOrders: g, setIconPositions: b } = (0, d.k)(),
                    { exists: $, mkdirRecursive: k, updateFolder: x, writeFile: v } = (0, o.o)(),
                    L = (0, i.useCallback)(
                        async (e, t, i) => {
                            if (a) {
                                if (t) {
                                    let r = (0, n.join)(c.Ll, e);
                                    if ((await k(c.Ll), await v(r, t, !0))) return i === s.v.UPDATE_URL && h(a, r), await x(c.Ll, e), (0, n.basename)(r);
                                } else i === s.v.UPDATE_URL && h(a, e);
                            }
                            return "";
                        },
                        [a, k, x, h, v]
                    ),
                    { openTransferDialog: E } = (0, r.Z)();
                return {
                    onDragLeave: p,
                    onDragOver: (e) => {
                        m?.(e), (0, u.nK)(e);
                    },
                    onDrop: (i) => {
                        if (!c.my.has((0, u.RT)(t))) {
                            if (w && i.target instanceof HTMLElement) {
                                let { files: e, text: a } = (0, l.p4)(i);
                                if (0 === e.length && "" === a) return;
                                let r = { x: i.clientX, y: i.clientY },
                                    s = [];
                                if (a) {
                                    try {
                                        s = JSON.parse(a);
                                    } catch { }
                                    if (!Array.isArray(s)) return;
                                    let [e] = s;
                                    if (!e || (e.startsWith(t) && (0, n.basename)(e) === (0, n.relative)(t, e))) return;
                                    s = s.map((e) => (0, n.basename)(e));
                                } else e instanceof FileList ? (s = [...e].map((e) => e.name)) : (s = [...e].map((e) => e.getAsFile()?.name || "").filter(Boolean));
                                (s = s.map((e) => {
                                    if (!y[`${t}/${e}`]) return e;
                                    let a = 0,
                                        i = "";
                                    do (a += 1), (i = `${t}/${(0, n.basename)(e, (0, n.extname)(e))} (${a})${(0, n.extname)(e)}`);
                                    while (y[i]);
                                    return (0, n.basename)(i);
                                })),
                                    (0, u.vi)(t, i.target, y, g, r, s, b, $);
                            }
                            (0, l.WG)(i, e || L, t, E, !!a);
                        }
                    },
                };
            };
        },
        44696: function (e, t, a) {
            var n = a(67294),
                i = a(58437),
                r = a(37176),
                l = a(97836);
            t.Z = (e) => {
                let { title: t } = (0, i.z)(),
                    [a] = e.split(l.CC),
                    { title: s } = r.Z[a] || {};
                return {
                    appendFileToTitle: (0, n.useCallback)(
                        (a, n) => {
                            let i = a ? ` - ${a}${n ? ` ${l.xy}` : ""}` : "";
                            t(e, `${s}${i}`);
                        },
                        [e, s, t]
                    ),
                    prependFileToTitle: (0, n.useCallback)(
                        (a, n, i) => {
                            let r = a ? `${n ? `${l.xy} ` : ""}${a}${i ? " " : " - "}` : "";
                            t(e, `${r}${s}`);
                        },
                        [e, s, t]
                    ),
                };
            };
        },
    },
]);



// "use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3366,3333],{83366:function(e,t,a){a.r(t),a.d(t,{default:function(){return w}});var n=a(85893),i=a(1864),r=a(67294);let l=a(10508).ZP.div(["iframe{opacity:",";transition:opacity 0.25s ease-in;}.loading{&::before{color:#fff;font-weight:500;mix-blend-mode:normal;text-shadow:1px 2px 3px rgba(0,0,0,50%);}}"],({$loaded:e})=>e?"100%":"0%");var s=a(33333),o=a(45279),f=a(44696),d=a(20063),c=a(58437),u=a(76488),p=a(97836),m=a(48764).Buffer,w=({id:e})=>{let{closeWithTransition:t,processes:{[e]:{libs:[a=""]=[],url:w=""}={}}={}}=(0,c.z)(),{createPath:h,exists:y,readFile:g,updateFolder:b,writeFile:$}=(0,d.o)(),{foregroundId:k,setForegroundId:x,setWallpaper:v}=(0,u.k)(),L=(0,r.useRef)(null),[E,_]=(0,r.useState)(!1),[T,j]=(0,r.useState)(),{prependFileToTitle:C}=(0,f.Z)(e),F=(0,r.useCallback)(e=>t=>{let a=(0,i.join)(p.dA,"wallpaper.png");t.toBlob(async t=>{await $(a,m.from(await t?.arrayBuffer()),!0),v(a,e)})},[v,$]),{onDragOver:H,onDrop:Z}=(0,o.Z)({id:e});return(0,r.useEffect)(()=>{C("Untitled")},[C]),(0,r.useEffect)(()=>{k!==e&&L.current?.contentWindow?.addEventListener("click",()=>x(e),p.K7)},[k,e,x]),(0,r.useEffect)(()=>{let{contentWindow:a}=L.current||{};if(E&&a&&!T){let n=a.systemHooks.showOpenFileDialog,r=a.file_new;j(a),a.file_new=()=>{C("Untitled"),r()},a.systemHooks.setWallpaperTiled=F("tile"),a.systemHooks.setWallpaperCentered=F("center"),a.systemHooks.showOpenFileDialog=async e=>{let{file:t}=await n(e);return C(t.name),{file:t}},a.close=()=>t(e),a.storage_quota_exceeded=()=>{},a.systemHooks.showSaveFileDialog=async({defaultFileName:e,getBlob:t})=>b(p.Ll,await h(`${e}.png`,p.Ll,m.from(await (await t("image/png")).arrayBuffer()))),a.systemHooks.writeBlobToHandle=async(e,t)=>{await y(e)&&(await $(e,m.from(await t.arrayBuffer()),!0),await b((0,i.dirname)(e),(0,i.basename)(e)))},a.addEventListener("dragover",H),a.addEventListener("drop",Z)}},[t,h,y,e,T,E,H,Z,C,F,b,$]),(0,r.useEffect)(()=>{T&&w&&g(w).then(e=>{let t=T.onunhandledrejection;T.onunhandledrejection=e=>{t?.(e),e?.reason?.message==="either options.data or options.file or options.filePath must be passed"&&C("Untitled")},T.open_from_file(new File([e],w),w),C((0,i.basename)(w))})},[T,C,g,w]),(0,n.jsxs)(l,{$loaded:E,children:[!E&&(0,n.jsx)(s.default,{className:"loading"}),(0,n.jsx)("iframe",{ref:L,height:"100%",id:`jspaint-${e}`,onLoad:()=>_(!0),src:a,title:e,width:"100%",...p.v0})]})}},33333:function(e,t,a){a.r(t);let n=a(10508).ZP.div(['cursor:wait;height:100%;width:100%;&::before{color:#fff;content:"Working on it...";display:flex;font-size:12px;justify-content:center;mix-blend-mode:difference;padding-top:18px;}']);t.default=n},45279:function(e,t,a){var n=a(1864),i=a(67294),r=a(59746),l=a(23736),s=a(89670),o=a(20063),f=a(58437),d=a(76488),c=a(97836),u=a(6484);t.Z=({callback:e,directory:t=c.Ll,id:a,onDragLeave:p,onDragOver:m,updatePositions:w})=>{let{url:h}=(0,f.z)(),{iconPositions:y,sortOrders:g,setIconPositions:b}=(0,d.k)(),{exists:$,mkdirRecursive:k,updateFolder:x,writeFile:v}=(0,o.o)(),L=(0,i.useCallback)(async(e,t,i)=>{if(a){if(t){let r=(0,n.join)(c.Ll,e);if(await k(c.Ll),await v(r,t,!0))return i===s.v.UPDATE_URL&&h(a,r),await x(c.Ll,e),(0,n.basename)(r)}else i===s.v.UPDATE_URL&&h(a,e)}return""},[a,k,x,h,v]),{openTransferDialog:E}=(0,r.Z)();return{onDragLeave:p,onDragOver:e=>{m?.(e),(0,u.nK)(e)},onDrop:i=>{if(!c.my.has((0,u.RT)(t))){if(w&&i.target instanceof HTMLElement){let{files:e,text:a}=(0,l.p4)(i);if(0===e.length&&""===a)return;let r={x:i.clientX,y:i.clientY},s=[];if(a){try{s=JSON.parse(a)}catch{}if(!Array.isArray(s))return;let[e]=s;if(!e||e.startsWith(t)&&(0,n.basename)(e)===(0,n.relative)(t,e))return;s=s.map(e=>(0,n.basename)(e))}else e instanceof FileList?s=[...e].map(e=>e.name):s=[...e].map(e=>e.getAsFile()?.name||"").filter(Boolean);s=s.map(e=>{if(!y[`${t}/${e}`])return e;let a=0,i="";do a+=1,i=`${t}/${(0,n.basename)(e,(0,n.extname)(e))} (${a})${(0,n.extname)(e)}`;while(y[i]);return(0,n.basename)(i)}),(0,u.vi)(t,i.target,y,g,r,s,b,$)}(0,l.WG)(i,e||L,t,E,!!a)}}}}},44696:function(e,t,a){var n=a(67294),i=a(58437),r=a(37176),l=a(97836);t.Z=e=>{let{title:t}=(0,i.z)(),[a]=e.split(l.CC),{title:s}=r.Z[a]||{};return{appendFileToTitle:(0,n.useCallback)((a,n)=>{let i=a?` - ${a}${n?` ${l.xy}`:""}`:"";t(e,`${s}${i}`)},[e,s,t]),prependFileToTitle:(0,n.useCallback)((a,n,i)=>{let r=a?`${n?`${l.xy} `:""}${a}${i?" ":" - "}`:"";t(e,`${r}${s}`)},[e,s,t])}}}}]);