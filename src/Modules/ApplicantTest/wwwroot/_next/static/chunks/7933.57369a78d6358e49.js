"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [7933],
    {
        57933: function (e, t, n) {
            n.r(t),
                n.d(t, {
                    default: function () {
                        return m;
                    },
                });
            var i = n(85893),
                r = n(67294),
                a = n(10508);
            let l = a.ZP.div(
                ["font-size:13px;overflow:hidden scroll;", " ol{&:not(:last-child){border-bottom:1px solid #000;}padding:2px 0;}figure{align-items:center;display:flex;padding-top:2px;figcaption{padding-right:15px;}}"],
                ({ $drop: e }) =>
                    e && (0, a.iv)(['&::before{content:"Drop OTF/TTF/WOFF file here";display:flex;font-size:16px;font-weight:600;height:100%;left:0;place-content:center;place-items:center;position:absolute;top:0;width:100%;}'])
            );
            var s = n(45279),
                o = n(20063),
                c = n(58437),
                u = n(37176),
                f = n(6484);
            let h = [12, 18, 24, 36, 48, 60, 72],
                p = 4 / 3,
                d = (e) => (e ? e.en || Object.values(e)[0] : ""),
                x = (0, r.memo)(({ font: e, fontSize: t, hideLabel: n, text: a }) => {
                    let l = (0, r.useRef)(null),
                        s = (0, i.jsx)("canvas", { ref: l });
                    return ((0, r.useEffect)(() => {
                        if (!e || !l.current) return;
                        let n = Math.ceil(t * p),
                            i = e.getPath(a || "The quick brown fox jumps over the lazy dog. 1234567890", 0, n, n),
                            { x2: r, y2: s } = i.getBoundingBox();
                        l.current.setAttribute("height", `${Math.ceil(s)}`), l.current.setAttribute("width", `${Math.ceil(r)}`), i.draw(l.current.getContext("2d"));
                    }, [e, t, a]),
                        n)
                        ? s
                        : (0, i.jsxs)("figure", { children: [(0, i.jsx)("figcaption", { children: t }), s] });
                });
            var m = (0, r.memo)(({ id: e }) => {
                let { processes: { [e]: { url: t = "" } = {} } = {}, title: a } = (0, c.z)(),
                    { readFile: p } = (0, o.o)(),
                    [m, g] = (0, r.useState)(),
                    [j, b] = (0, r.useState)(!0),
                    y = (0, r.useCallback)(
                        async (e) => {
                            b(!1);
                            let { default: t } = await Promise.all([n.e(3257, "high"), n.e(6102, "high")]).then(n.bind(n, 44422)),
                                { buffer: i } = await p(e);
                            try {
                                g(t.parse(i));
                            } catch {
                                b(!0);
                            }
                        },
                        [p]
                    ),
                    { name: v, types: w, version: T } = (0, r.useMemo)(() => {
                        let e = [];
                        return m?.supported && e.push("OpenType Layout"), m?.outlinesFormat === "truetype" && e.push("TrueType Outlines"), { name: d(m?.names.fullName), types: e.join(", "), version: d(m?.names.version) };
                    }, [m]);
                return (
                    (0, r.useEffect)(() => {
                        t && y(t);
                    }, [y, t]),
                    (0, r.useEffect)(() => a(e, v ? `${v} (${u.Z.OpenType.title})` : u.Z.OpenType.title), [e, v, a]),
                    (0, i.jsx)(l, {
                        $drop: j,
                        ...(0, s.Z)({ id: e }),
                        onContextMenuCapture: f.nK,
                        children:
                            m &&
                            (0, i.jsxs)(i.Fragment, {
                                children: [
                                    (0, i.jsxs)("ol", { children: [(0, i.jsxs)("li", { children: ["Font name: ", v] }), (0, i.jsxs)("li", { children: ["Version: ", T] }), (0, i.jsx)("li", { children: w })] }),
                                    (0, i.jsxs)("ol", {
                                        children: [
                                            (0, i.jsx)("li", { children: (0, i.jsx)(x, { font: m, fontSize: 15, text: "abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ", hideLabel: !0 }) }),
                                            (0, i.jsx)("li", { children: (0, i.jsx)(x, { font: m, fontSize: 15, text: "1234567890.:,; ' \" (!?) +-*/=", hideLabel: !0 }) }),
                                        ],
                                    }),
                                    (0, i.jsx)("ol", { children: h.map((e) => (0, i.jsx)("li", { children: (0, i.jsx)(x, { font: m, fontSize: e }) }, e)) }),
                                ],
                            }),
                    })
                );
            });
        },
        45279: function (e, t, n) {
            var i = n(1864),
                r = n(67294),
                a = n(59746),
                l = n(23736),
                s = n(89670),
                o = n(20063),
                c = n(58437),
                u = n(76488),
                f = n(97836),
                h = n(6484);
            t.Z = ({ callback: e, directory: t = f.Ll, id: n, onDragLeave: p, onDragOver: d, updatePositions: x }) => {
                let { url: m } = (0, c.z)(),
                    { iconPositions: g, sortOrders: j, setIconPositions: b } = (0, u.k)(),
                    { exists: y, mkdirRecursive: v, updateFolder: w, writeFile: T } = (0, o.o)(),
                    L = (0, r.useCallback)(
                        async (e, t, r) => {
                            if (n) {
                                if (t) {
                                    let a = (0, i.join)(f.Ll, e);
                                    if ((await v(f.Ll), await T(a, t, !0))) return r === s.v.UPDATE_URL && m(n, a), await w(f.Ll, e), (0, i.basename)(a);
                                } else r === s.v.UPDATE_URL && m(n, e);
                            }
                            return "";
                        },
                        [n, v, w, m, T]
                    ),
                    { openTransferDialog: $ } = (0, a.Z)();
                return {
                    onDragLeave: p,
                    onDragOver: (e) => {
                        d?.(e), (0, h.nK)(e);
                    },
                    onDrop: (r) => {
                        if (!f.my.has((0, h.RT)(t))) {
                            if (x && r.target instanceof HTMLElement) {
                                let { files: e, text: n } = (0, l.p4)(r);
                                if (0 === e.length && "" === n) return;
                                let a = { x: r.clientX, y: r.clientY },
                                    s = [];
                                if (n) {
                                    try {
                                        s = JSON.parse(n);
                                    } catch { }
                                    if (!Array.isArray(s)) return;
                                    let [e] = s;
                                    if (!e || (e.startsWith(t) && (0, i.basename)(e) === (0, i.relative)(t, e))) return;
                                    s = s.map((e) => (0, i.basename)(e));
                                } else e instanceof FileList ? (s = [...e].map((e) => e.name)) : (s = [...e].map((e) => e.getAsFile()?.name || "").filter(Boolean));
                                (s = s.map((e) => {
                                    if (!g[`${t}/${e}`]) return e;
                                    let n = 0,
                                        r = "";
                                    do (n += 1), (r = `${t}/${(0, i.basename)(e, (0, i.extname)(e))} (${n})${(0, i.extname)(e)}`);
                                    while (g[r]);
                                    return (0, i.basename)(r);
                                })),
                                    (0, h.vi)(t, r.target, g, j, a, s, b, y);
                            }
                            (0, l.WG)(r, e || L, t, $, !!n);
                        }
                    },
                };
            };
        },
    },
]);



// "use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7933],{57933:function(e,t,n){n.r(t),n.d(t,{default:function(){return m}});var i=n(85893),r=n(67294),a=n(10508);let l=a.ZP.div(["font-size:13px;overflow:hidden scroll;"," ol{&:not(:last-child){border-bottom:1px solid #000;}padding:2px 0;}figure{align-items:center;display:flex;padding-top:2px;figcaption{padding-right:15px;}}"],({$drop:e})=>e&&(0,a.iv)(['&::before{content:"Drop OTF/TTF/WOFF file here";display:flex;font-size:16px;font-weight:600;height:100%;left:0;place-content:center;place-items:center;position:absolute;top:0;width:100%;}']));var s=n(45279),o=n(20063),c=n(58437),u=n(37176),f=n(6484);let h=[12,18,24,36,48,60,72],p=4/3,d=e=>e?e.en||Object.values(e)[0]:"",x=(0,r.memo)(({font:e,fontSize:t,hideLabel:n,text:a})=>{let l=(0,r.useRef)(null),s=(0,i.jsx)("canvas",{ref:l});return((0,r.useEffect)(()=>{if(!e||!l.current)return;let n=Math.ceil(t*p),i=e.getPath(a||"The quick brown fox jumps over the lazy dog. 1234567890",0,n,n),{x2:r,y2:s}=i.getBoundingBox();l.current.setAttribute("height",`${Math.ceil(s)}`),l.current.setAttribute("width",`${Math.ceil(r)}`),i.draw(l.current.getContext("2d"))},[e,t,a]),n)?s:(0,i.jsxs)("figure",{children:[(0,i.jsx)("figcaption",{children:t}),s]})});var m=(0,r.memo)(({id:e})=>{let{processes:{[e]:{url:t=""}={}}={},title:a}=(0,c.z)(),{readFile:p}=(0,o.o)(),[m,g]=(0,r.useState)(),[j,b]=(0,r.useState)(!0),y=(0,r.useCallback)(async e=>{b(!1);let{default:t}=await Promise.all([n.e(3257,"high"),n.e(6102,"high")]).then(n.bind(n,44422)),{buffer:i}=await p(e);try{g(t.parse(i))}catch{b(!0)}},[p]),{name:v,types:w,version:T}=(0,r.useMemo)(()=>{let e=[];return m?.supported&&e.push("OpenType Layout"),m?.outlinesFormat==="truetype"&&e.push("TrueType Outlines"),{name:d(m?.names.fullName),types:e.join(", "),version:d(m?.names.version)}},[m]);return(0,r.useEffect)(()=>{t&&y(t)},[y,t]),(0,r.useEffect)(()=>a(e,v?`${v} (${u.Z.OpenType.title})`:u.Z.OpenType.title),[e,v,a]),(0,i.jsx)(l,{$drop:j,...(0,s.Z)({id:e}),onContextMenuCapture:f.nK,children:m&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("ol",{children:[(0,i.jsxs)("li",{children:["Font name: ",v]}),(0,i.jsxs)("li",{children:["Version: ",T]}),(0,i.jsx)("li",{children:w})]}),(0,i.jsxs)("ol",{children:[(0,i.jsx)("li",{children:(0,i.jsx)(x,{font:m,fontSize:15,text:"abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ",hideLabel:!0})}),(0,i.jsx)("li",{children:(0,i.jsx)(x,{font:m,fontSize:15,text:"1234567890.:,; ' \" (!?) +-*/=",hideLabel:!0})})]}),(0,i.jsx)("ol",{children:h.map(e=>(0,i.jsx)("li",{children:(0,i.jsx)(x,{font:m,fontSize:e})},e))})]})})})},45279:function(e,t,n){var i=n(1864),r=n(67294),a=n(59746),l=n(23736),s=n(89670),o=n(20063),c=n(58437),u=n(76488),f=n(97836),h=n(6484);t.Z=({callback:e,directory:t=f.Ll,id:n,onDragLeave:p,onDragOver:d,updatePositions:x})=>{let{url:m}=(0,c.z)(),{iconPositions:g,sortOrders:j,setIconPositions:b}=(0,u.k)(),{exists:y,mkdirRecursive:v,updateFolder:w,writeFile:T}=(0,o.o)(),L=(0,r.useCallback)(async(e,t,r)=>{if(n){if(t){let a=(0,i.join)(f.Ll,e);if(await v(f.Ll),await T(a,t,!0))return r===s.v.UPDATE_URL&&m(n,a),await w(f.Ll,e),(0,i.basename)(a)}else r===s.v.UPDATE_URL&&m(n,e)}return""},[n,v,w,m,T]),{openTransferDialog:$}=(0,a.Z)();return{onDragLeave:p,onDragOver:e=>{d?.(e),(0,h.nK)(e)},onDrop:r=>{if(!f.my.has((0,h.RT)(t))){if(x&&r.target instanceof HTMLElement){let{files:e,text:n}=(0,l.p4)(r);if(0===e.length&&""===n)return;let a={x:r.clientX,y:r.clientY},s=[];if(n){try{s=JSON.parse(n)}catch{}if(!Array.isArray(s))return;let[e]=s;if(!e||e.startsWith(t)&&(0,i.basename)(e)===(0,i.relative)(t,e))return;s=s.map(e=>(0,i.basename)(e))}else e instanceof FileList?s=[...e].map(e=>e.name):s=[...e].map(e=>e.getAsFile()?.name||"").filter(Boolean);s=s.map(e=>{if(!g[`${t}/${e}`])return e;let n=0,r="";do n+=1,r=`${t}/${(0,i.basename)(e,(0,i.extname)(e))} (${n})${(0,i.extname)(e)}`;while(g[r]);return(0,i.basename)(r)}),(0,h.vi)(t,r.target,g,j,a,s,b,y)}(0,l.WG)(r,e||L,t,$,!!n)}}}}}}]);