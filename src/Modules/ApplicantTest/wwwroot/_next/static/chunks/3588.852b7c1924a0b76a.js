"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [3588],
    {
        73588: function (r, e, n) {
            n.d(e, {
                extractExeIcon: function () {
                    return o;
                },
            });
            var t = n(48764).Buffer;
            let i = (r) => Uint8Array.from([0, 0, ...new Uint8Array(Uint16Array.from([1]).buffer), ...new Uint8Array(Uint16Array.from([r]).buffer)]),
                a = ({ bitCount: r, colors: e, dataSize: n, height: t, planes: i, width: a }, f) =>
                    Uint8Array.from([
                        a,
                        t === 2 * a ? a : t,
                        e,
                        0,
                        ...new Uint8Array(Uint16Array.from([i]).buffer),
                        ...new Uint8Array(Uint16Array.from([r]).buffer),
                        ...new Uint8Array(Uint32Array.from([n]).buffer),
                        ...new Uint8Array(Uint32Array.from([f]).buffer),
                    ]),
                f = !1,
                o = async (r) => {
                    let e, c;
                    if (f)
                        return new Promise((e) => {
                            requestAnimationFrame(() => o(r).then(e));
                        });
                    f = !0;
                    let u = await n.e(9319, "high").then(n.bind(n, 49319));
                    try {
                        ({ entries: c } = u.NtExecutableResource.from(u.NtExecutable.from(r, { ignoreCert: !0 }), !0)), ([e] = u.Resource.IconGroupEntry.fromEntries(c));
                    } catch (e) {
                        if (e.message.includes("Binary with symbols is not supported now")) {
                            let { unarchive: e } = await n.e(5341, "high").then(n.bind(n, 5341));
                            try {
                                let { "/.rsrc/ICON/1.ico": n } = (await e("data.exe", r)) || {},
                                    i = t.from(n);
                                return (f = !1), i;
                            } catch { }
                        }
                        return;
                    }
                    if (!e?.icons) {
                        f = !1;
                        return;
                    }
                    let s = 6 + 16 * e.icons.length,
                        y = e.icons.map(({ iconID: r }) => c.find(({ id: e, type: n }) => 3 === n && e === r)),
                        m = e.icons.reduce((r, e, n) => ((s += n ? y[n - 1]?.bin.byteLength ?? 0 : 0), t.concat([r, a(e, s)])), i(e.icons.length)),
                        b = t.from(y.reduce((r, e) => t.concat([r, t.from(e.bin)]), m));
                    return (f = !1), b;
                };
        },
    },
]);



// "use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3588],{73588:function(r,e,n){n.d(e,{extractExeIcon:function(){return o}});var t=n(48764).Buffer;let i=r=>Uint8Array.from([0,0,...new Uint8Array(Uint16Array.from([1]).buffer),...new Uint8Array(Uint16Array.from([r]).buffer)]),a=({bitCount:r,colors:e,dataSize:n,height:t,planes:i,width:a},f)=>Uint8Array.from([a,t===2*a?a:t,e,0,...new Uint8Array(Uint16Array.from([i]).buffer),...new Uint8Array(Uint16Array.from([r]).buffer),...new Uint8Array(Uint32Array.from([n]).buffer),...new Uint8Array(Uint32Array.from([f]).buffer)]),f=!1,o=async r=>{let e,c;if(f)return new Promise(e=>{requestAnimationFrame(()=>o(r).then(e))});f=!0;let u=await n.e(9319,"high").then(n.bind(n,49319));try{({entries:c}=u.NtExecutableResource.from(u.NtExecutable.from(r,{ignoreCert:!0}),!0)),[e]=u.Resource.IconGroupEntry.fromEntries(c)}catch(e){if(e.message.includes("Binary with symbols is not supported now")){let{unarchive:e}=await n.e(5341,"high").then(n.bind(n,5341));try{let{"/.rsrc/ICON/1.ico":n}=await e("data.exe",r)||{},i=t.from(n);return f=!1,i}catch{}}return}if(!e?.icons){f=!1;return}let s=6+16*e.icons.length,y=e.icons.map(({iconID:r})=>c.find(({id:e,type:n})=>3===n&&e===r)),m=e.icons.reduce((r,e,n)=>(s+=n?y[n-1]?.bin.byteLength??0:0,t.concat([r,a(e,s)])),i(e.icons.length)),b=t.from(y.reduce((r,e)=>t.concat([r,t.from(e.bin)]),m));return f=!1,b}}}]);