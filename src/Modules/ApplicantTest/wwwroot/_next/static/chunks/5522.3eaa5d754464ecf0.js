"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [5522],
    {
        65522: function (e, t, a) {
            a.r(t),
                a.d(t, {
                    libs: function () {
                        return s;
                    },
                });
            var n = a(6484);
            let s = ["/System/ShaderToy/CoastalLandscape/piLibs.js", "/System/ShaderToy/CoastalLandscape/effect.js", "/System/ShaderToy/CoastalLandscape/init.js"],
                i = async (e) => {
                    if (!e) return;
                    await (0, n.mb)(s);
                    let t = document.createElement("canvas");
                    (t.height = window.innerHeight), (t.width = window.innerWidth), window.effectInit(t), e.append(t);
                };
            t.default = i;
        },
    },
]);


// "use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5522],{65522:function(e,t,a){a.r(t),a.d(t,{libs:function(){return s}});var n=a(6484);let s=["/System/ShaderToy/CoastalLandscape/piLibs.js","/System/ShaderToy/CoastalLandscape/effect.js","/System/ShaderToy/CoastalLandscape/init.js"],i=async e=>{if(!e)return;await (0,n.mb)(s);let t=document.createElement("canvas");t.height=window.innerHeight,t.width=window.innerWidth,window.effectInit(t),e.append(t)};t.default=i}}]);