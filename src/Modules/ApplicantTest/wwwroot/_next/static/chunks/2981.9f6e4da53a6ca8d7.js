"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [2981],
    {
        2981: function (e, t, i) {
            i.r(t),
                i.d(t, {
                    default: function () {
                        return w;
                    },
                });
            var r = i(85893),
                a = i(1864),
                n = i(67294);
            let l = i(10508).ZP.div(["#vimjs-canvas{image-rendering:pixelated;}#vimjs-container{height:100%;width:100%;}#vimjs-file{display:none;}#vimjs-font-test{position:absolute;visibility:hidden;}"]);
            var s = i(96189),
                o = i(45279),
                u = i(44696),
                c = i(20063),
                m = i(58437),
                f = i(97836),
                d = i(6484),
                p = i(48764).Buffer,
                w = ({ id: e }) => {
                    let {
                        closeWithTransition: t,
                        processes: { [e]: i },
                    } = (0, m.z)(),
                        { readFile: w, updateFolder: v, writeFile: h } = (0, c.o)(),
                        b = (0, s.Z)(),
                        { prependFileToTitle: $ } = (0, u.Z)(e),
                        { libs: y = [], url: M = "" } = i || {},
                        [V, j] = (0, n.useState)([]),
                        g = (0, n.useRef)(!1),
                        x = (0, n.useCallback)(async () => {
                            let i = M || f.$Z,
                                [, ...r] = i.split("/"),
                                n = "";
                            1 === r.length && (n = "/root"), (window.VimWrapperModule = {}), await (0, d.mb)(y, !1, !!window.VimWrapperModule);
                            let l = M ? await w(i) : p.from("");
                            window.VimWrapperModule?.init?.({
                                VIMJS_ALLOW_EXIT: !0,
                                arguments: [`${n}${i}`],
                                containerWindow: document.querySelector("#vimjs-container")?.closest("section"),
                                memoryInitializerPrefixURL: "/Program Files/Vim.js/",
                                postRun: [
                                    () => {
                                        (g.current = !1), b(window.VimWrapperModule?.VimModule?.FS, "Vim");
                                    },
                                ],
                                preRun: [
                                    () => {
                                        let e = "";
                                        [n, ...r].forEach((t, i, { [i + 1]: a }) => {
                                            a && i + 1 !== r.length
                                                ? (window.VimWrapperModule?.VimModule?.FS_createPath?.(e, a, !0, !0), (e += `/${a}`))
                                                : e
                                                    ? window.VimWrapperModule?.VimModule?.FS_createDataFile?.(e, t, l, !0, !0)
                                                    : (e = t);
                                        });
                                    },
                                ],
                                print: console.info,
                                printErr: console.info,
                                quitCallback: () => t(e),
                                writeCallback: (e) => j((t) => [...t, { buffer: p.from(e), url: i }]),
                            }),
                                $((0, a.basename)(i));
                        }, [t, e, y, b, $, w, M]);
                    return (
                        (0, n.useEffect)(() => {
                            V.length > 0 &&
                                ([...V].forEach(({ buffer: e, url: t }) => {
                                    h(t, e, !0), v((0, a.dirname)(t), (0, a.basename)(t));
                                }),
                                    j([]));
                        }, [v, V, h]),
                        (0, n.useEffect)(
                            () => (
                                g.current || ((g.current = !0), x()),
                                () => {
                                    !g && window.VimWrapperModule?.VimModule?.asmLibraryArg?._vimjs_prepare_exit() && window.VimWrapperModule?.VimModule?.exit?.();
                                }
                            ),
                            [x]
                        ),
                        (0, r.jsxs)(l, {
                            children: [(0, r.jsx)("div", { id: "vimjs-container", ...(0, o.Z)({ id: e }), children: (0, r.jsx)("canvas", { id: "vimjs-canvas", onContextMenuCapture: d.nK }) }), (0, r.jsx)("div", { id: "vimjs-font-test" })],
                        })
                    );
                };
        },
        96189: function (e, t, i) {
            var r = i(67294),
                a = i(20063);
            t.Z = () => {
                let { mountEmscriptenFs: e, unMapFs: t, updateFolder: i } = (0, a.o)(),
                    n = (0, r.useRef)();
                return (
                    (0, r.useEffect)(
                        () => () => {
                            if (n.current) {
                                let e = n.current;
                                (n.current = ""),
                                    t(e, !0)
                                        .then(() => i("/", void 0, e))
                                        .catch(() => { });
                            }
                        },
                        [t, i]
                    ),
                    (0, r.useCallback)(
                        async (t, r) => {
                            if (!t) return;
                            let a = "";
                            try {
                                a = await e(t, r);
                            } catch { }
                            a && (i("/", a), (n.current = a));
                        },
                        [e, i]
                    )
                );
            };
        },
        45279: function (e, t, i) {
            var r = i(1864),
                a = i(67294),
                n = i(59746),
                l = i(23736),
                s = i(89670),
                o = i(20063),
                u = i(58437),
                c = i(76488),
                m = i(97836),
                f = i(6484);
            t.Z = ({ callback: e, directory: t = m.Ll, id: i, onDragLeave: d, onDragOver: p, updatePositions: w }) => {
                let { url: v } = (0, u.z)(),
                    { iconPositions: h, sortOrders: b, setIconPositions: $ } = (0, c.k)(),
                    { exists: y, mkdirRecursive: M, updateFolder: V, writeFile: j } = (0, o.o)(),
                    g = (0, a.useCallback)(
                        async (e, t, a) => {
                            if (i) {
                                if (t) {
                                    let n = (0, r.join)(m.Ll, e);
                                    if ((await M(m.Ll), await j(n, t, !0))) return a === s.v.UPDATE_URL && v(i, n), await V(m.Ll, e), (0, r.basename)(n);
                                } else a === s.v.UPDATE_URL && v(i, e);
                            }
                            return "";
                        },
                        [i, M, V, v, j]
                    ),
                    { openTransferDialog: x } = (0, n.Z)();
                return {
                    onDragLeave: d,
                    onDragOver: (e) => {
                        p?.(e), (0, f.nK)(e);
                    },
                    onDrop: (a) => {
                        if (!m.my.has((0, f.RT)(t))) {
                            if (w && a.target instanceof HTMLElement) {
                                let { files: e, text: i } = (0, l.p4)(a);
                                if (0 === e.length && "" === i) return;
                                let n = { x: a.clientX, y: a.clientY },
                                    s = [];
                                if (i) {
                                    try {
                                        s = JSON.parse(i);
                                    } catch { }
                                    if (!Array.isArray(s)) return;
                                    let [e] = s;
                                    if (!e || (e.startsWith(t) && (0, r.basename)(e) === (0, r.relative)(t, e))) return;
                                    s = s.map((e) => (0, r.basename)(e));
                                } else e instanceof FileList ? (s = [...e].map((e) => e.name)) : (s = [...e].map((e) => e.getAsFile()?.name || "").filter(Boolean));
                                (s = s.map((e) => {
                                    if (!h[`${t}/${e}`]) return e;
                                    let i = 0,
                                        a = "";
                                    do (i += 1), (a = `${t}/${(0, r.basename)(e, (0, r.extname)(e))} (${i})${(0, r.extname)(e)}`);
                                    while (h[a]);
                                    return (0, r.basename)(a);
                                })),
                                    (0, f.vi)(t, a.target, h, b, n, s, $, y);
                            }
                            (0, l.WG)(a, e || g, t, x, !!i);
                        }
                    },
                };
            };
        },
        44696: function (e, t, i) {
            var r = i(67294),
                a = i(58437),
                n = i(37176),
                l = i(97836);
            t.Z = (e) => {
                let { title: t } = (0, a.z)(),
                    [i] = e.split(l.CC),
                    { title: s } = n.Z[i] || {};
                return {
                    appendFileToTitle: (0, r.useCallback)(
                        (i, r) => {
                            let a = i ? ` - ${i}${r ? ` ${l.xy}` : ""}` : "";
                            t(e, `${s}${a}`);
                        },
                        [e, s, t]
                    ),
                    prependFileToTitle: (0, r.useCallback)(
                        (i, r, a) => {
                            let n = i ? `${r ? `${l.xy} ` : ""}${i}${a ? " " : " - "}` : "";
                            t(e, `${n}${s}`);
                        },
                        [e, s, t]
                    ),
                };
            };
        },
    },
]);




// "use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2981],{2981:function(e,t,i){i.r(t),i.d(t,{default:function(){return w}});var r=i(85893),a=i(1864),n=i(67294);let l=i(10508).ZP.div(["#vimjs-canvas{image-rendering:pixelated;}#vimjs-container{height:100%;width:100%;}#vimjs-file{display:none;}#vimjs-font-test{position:absolute;visibility:hidden;}"]);var s=i(96189),o=i(45279),u=i(44696),c=i(20063),m=i(58437),f=i(97836),d=i(6484),p=i(48764).Buffer,w=({id:e})=>{let{closeWithTransition:t,processes:{[e]:i}}=(0,m.z)(),{readFile:w,updateFolder:v,writeFile:h}=(0,c.o)(),b=(0,s.Z)(),{prependFileToTitle:$}=(0,u.Z)(e),{libs:y=[],url:M=""}=i||{},[V,j]=(0,n.useState)([]),g=(0,n.useRef)(!1),x=(0,n.useCallback)(async()=>{let i=M||f.$Z,[,...r]=i.split("/"),n="";1===r.length&&(n="/root"),window.VimWrapperModule={},await (0,d.mb)(y,!1,!!window.VimWrapperModule);let l=M?await w(i):p.from("");window.VimWrapperModule?.init?.({VIMJS_ALLOW_EXIT:!0,arguments:[`${n}${i}`],containerWindow:document.querySelector("#vimjs-container")?.closest("section"),memoryInitializerPrefixURL:"/Program Files/Vim.js/",postRun:[()=>{g.current=!1,b(window.VimWrapperModule?.VimModule?.FS,"Vim")}],preRun:[()=>{let e="";[n,...r].forEach((t,i,{[i+1]:a})=>{a&&i+1!==r.length?(window.VimWrapperModule?.VimModule?.FS_createPath?.(e,a,!0,!0),e+=`/${a}`):e?window.VimWrapperModule?.VimModule?.FS_createDataFile?.(e,t,l,!0,!0):e=t})}],print:console.info,printErr:console.info,quitCallback:()=>t(e),writeCallback:e=>j(t=>[...t,{buffer:p.from(e),url:i}])}),$((0,a.basename)(i))},[t,e,y,b,$,w,M]);return(0,n.useEffect)(()=>{V.length>0&&([...V].forEach(({buffer:e,url:t})=>{h(t,e,!0),v((0,a.dirname)(t),(0,a.basename)(t))}),j([]))},[v,V,h]),(0,n.useEffect)(()=>(g.current||(g.current=!0,x()),()=>{!g&&window.VimWrapperModule?.VimModule?.asmLibraryArg?._vimjs_prepare_exit()&&window.VimWrapperModule?.VimModule?.exit?.()}),[x]),(0,r.jsxs)(l,{children:[(0,r.jsx)("div",{id:"vimjs-container",...(0,o.Z)({id:e}),children:(0,r.jsx)("canvas",{id:"vimjs-canvas",onContextMenuCapture:d.nK})}),(0,r.jsx)("div",{id:"vimjs-font-test"})]})}},96189:function(e,t,i){var r=i(67294),a=i(20063);t.Z=()=>{let{mountEmscriptenFs:e,unMapFs:t,updateFolder:i}=(0,a.o)(),n=(0,r.useRef)();return(0,r.useEffect)(()=>()=>{if(n.current){let e=n.current;n.current="",t(e,!0).then(()=>i("/",void 0,e)).catch(()=>{})}},[t,i]),(0,r.useCallback)(async(t,r)=>{if(!t)return;let a="";try{a=await e(t,r)}catch{}a&&(i("/",a),n.current=a)},[e,i])}},45279:function(e,t,i){var r=i(1864),a=i(67294),n=i(59746),l=i(23736),s=i(89670),o=i(20063),u=i(58437),c=i(76488),m=i(97836),f=i(6484);t.Z=({callback:e,directory:t=m.Ll,id:i,onDragLeave:d,onDragOver:p,updatePositions:w})=>{let{url:v}=(0,u.z)(),{iconPositions:h,sortOrders:b,setIconPositions:$}=(0,c.k)(),{exists:y,mkdirRecursive:M,updateFolder:V,writeFile:j}=(0,o.o)(),g=(0,a.useCallback)(async(e,t,a)=>{if(i){if(t){let n=(0,r.join)(m.Ll,e);if(await M(m.Ll),await j(n,t,!0))return a===s.v.UPDATE_URL&&v(i,n),await V(m.Ll,e),(0,r.basename)(n)}else a===s.v.UPDATE_URL&&v(i,e)}return""},[i,M,V,v,j]),{openTransferDialog:x}=(0,n.Z)();return{onDragLeave:d,onDragOver:e=>{p?.(e),(0,f.nK)(e)},onDrop:a=>{if(!m.my.has((0,f.RT)(t))){if(w&&a.target instanceof HTMLElement){let{files:e,text:i}=(0,l.p4)(a);if(0===e.length&&""===i)return;let n={x:a.clientX,y:a.clientY},s=[];if(i){try{s=JSON.parse(i)}catch{}if(!Array.isArray(s))return;let[e]=s;if(!e||e.startsWith(t)&&(0,r.basename)(e)===(0,r.relative)(t,e))return;s=s.map(e=>(0,r.basename)(e))}else e instanceof FileList?s=[...e].map(e=>e.name):s=[...e].map(e=>e.getAsFile()?.name||"").filter(Boolean);s=s.map(e=>{if(!h[`${t}/${e}`])return e;let i=0,a="";do i+=1,a=`${t}/${(0,r.basename)(e,(0,r.extname)(e))} (${i})${(0,r.extname)(e)}`;while(h[a]);return(0,r.basename)(a)}),(0,f.vi)(t,a.target,h,b,n,s,$,y)}(0,l.WG)(a,e||g,t,x,!!i)}}}}},44696:function(e,t,i){var r=i(67294),a=i(58437),n=i(37176),l=i(97836);t.Z=e=>{let{title:t}=(0,a.z)(),[i]=e.split(l.CC),{title:s}=n.Z[i]||{};return{appendFileToTitle:(0,r.useCallback)((i,r)=>{let a=i?` - ${i}${r?` ${l.xy}`:""}`:"";t(e,`${s}${a}`)},[e,s,t]),prependFileToTitle:(0,r.useCallback)((i,r,a)=>{let n=i?`${r?`${l.xy} `:""}${i}${a?" ":" - "}`:"";t(e,`${n}${s}`)},[e,s,t])}}}}]);