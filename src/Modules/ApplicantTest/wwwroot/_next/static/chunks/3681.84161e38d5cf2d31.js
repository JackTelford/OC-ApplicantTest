"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [3681],
    {
        83681: function (e, n, t) {
            t.r(n),
                t.d(n, {
                    ROOT_PATH: function () {
                        return s;
                    },
                    libs: function () {
                        return w;
                    },
                });
            var i = t(6484);
            let s = "/System/Hexells",
                w = [`${s}/twgl.min.js`, `${s}/UPNG.min.js`, `${s}/ca.js`, `${s}/demo.js`],
                a = async (e) => {
                    if (!e) return;
                    await (0, i.mb)(w);
                    let n = document.createElement("canvas");
                    (n.height = window.innerHeight), (n.width = window.innerWidth), (window.Hexells = new window.Demo(n, s)), e.append(n);
                };
            n.default = a;
        },
    },
]);



// "use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3681],{83681:function(e,n,t){t.r(n),t.d(n,{ROOT_PATH:function(){return s},libs:function(){return w}});var i=t(6484);let s="/System/Hexells",w=[`${s}/twgl.min.js`,`${s}/UPNG.min.js`,`${s}/ca.js`,`${s}/demo.js`],a=async e=>{if(!e)return;await (0,i.mb)(w);let n=document.createElement("canvas");n.height=window.innerHeight,n.width=window.innerWidth,window.Hexells=new window.Demo(n,s),e.append(n)};n.default=a}}]);