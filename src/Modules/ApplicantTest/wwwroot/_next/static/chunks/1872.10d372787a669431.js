!(function () {
    "use strict";
    let e;
    let s = {
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
        t = { gyroControls: !1, mouseControls: !1, mouseEase: !1, touchControls: !1 },
        i = ["/System/Vanta.js/three.min.js", "/System/Vanta.js/vanta.waves.min.js"];
    globalThis.addEventListener(
        "message",
        ({ data: o }) => {
            if ("undefined" != typeof WebGLRenderingContext) {
                if ("init" === o) globalThis.importScripts(...i);
                else if (o instanceof DOMRect) {
                    let { width: s, height: t } = o;
                    e?.renderer.setSize(s, t), e?.resize();
                } else {
                    let { canvas: i, config: r, devicePixelRatio: a } = o,
                        { VANTA: { current: n = e, WAVES: l } = {} } = globalThis;
                    if (!i || !l) return;
                    n && n.destroy();
                    try {
                        e = l({ ...(r || s), ...t, canvas: i, devicePixelRatio: a });
                    } catch (e) {
                        globalThis.postMessage({ message: e?.message, type: "[error]" });
                    }
                }
            }
        },
        { passive: !0 }
    );
})(),
    (_N_E = {});





// !function(){"use strict";let e;let s={camera:{far:400,fov:30,near:.1},color:"hsl(225, 40%, 20%)",colorCycleSpeed:10,forceAnimate:!0,hh:50,hue:225,lightness:20,material:{options:{fog:!1,wireframe:!1}},saturation:40,shininess:35,waveHeight:20,waveSpeed:.25,ww:50},t={gyroControls:!1,mouseControls:!1,mouseEase:!1,touchControls:!1},i=["/System/Vanta.js/three.min.js","/System/Vanta.js/vanta.waves.min.js"];globalThis.addEventListener("message",({data:o})=>{if("undefined"!=typeof WebGLRenderingContext){if("init"===o)globalThis.importScripts(...i);else if(o instanceof DOMRect){let{width:s,height:t}=o;e?.renderer.setSize(s,t),e?.resize()}else{let{canvas:i,config:r,devicePixelRatio:a}=o,{VANTA:{current:n=e,WAVES:l}={}}=globalThis;if(!i||!l)return;n&&n.destroy();try{e=l({...r||s,...t,canvas:i,devicePixelRatio:a})}catch(e){globalThis.postMessage({message:e?.message,type:"[error]"})}}}},{passive:!0})}(),_N_E={};