"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [6514],
    {
        26514: function (e, t, a) {
            a.r(t),
                a.d(t, {
                    default: function () {
                        return i;
                    },
                });
            var r = a(6484);
            let s = {
                animationSpeed: 1,
                backgroundColor: { space: "rgb", values: [0, 0, 0] },
                baseBrightness: -0.5,
                baseContrast: 0.8,
                bloomSize: 0.4,
                bloomStrength: 0.7,
                brightnessDecay: 1,
                brightnessOverride: 0,
                brightnessThreshold: 0,
                cursorColor: { space: "rgb", values: [1, 3, 1.5] },
                cycleFrameSkip: 4,
                cycleSpeed: 0.02,
                density: 1,
                ditherMagnitude: 0.05,
                effect: "palette",
                fallSpeed: 0.09,
                font: "matrixcode",
                forwardSpeed: 0.25,
                glintBrightness: -1.5,
                glintColor: { space: "rgb", values: [1, 1, 1] },
                glintContrast: 2.5,
                glyphEdgeCrop: 0,
                glyphHeightToWidth: 1,
                glyphMSDFURL: "./System/Matrix/assets/matrixcode_msdf.png",
                glyphSequenceLength: 57,
                glyphTextureGridSize: [8, 8],
                glyphVerticalSpacing: 1,
                hasBaseTexture: !1,
                hasGlintTexture: !1,
                hasThunder: !1,
                highPassThreshold: 0,
                isPolar: !1,
                isolateCursor: !0,
                isolateGlint: !1,
                isometric: !1,
                loops: !1,
                numColumns: Math.max(Math.floor((0, r.E9)() / 15), 50),
                palette: [
                    { at: 0, color: { space: "hsl", values: [0.4, 0.8, 0] } },
                    { at: 0.5, color: { space: "hsl", values: [0.4, 0.8, 0.5] } },
                    { at: 1, color: { space: "hsl", values: [0.4, 0.8, 1] } },
                ],
                raindropLength: 1.5,
                renderer: "regl",
                resolution: 1,
                rippleScale: 30,
                rippleSpeed: 0.2,
                rippleThickness: 0.2,
                skipIntro: !0,
                slant: 0,
                useCamera: !1,
                useHalfFloat: !1,
                useHoloplay: !1,
                volumetric: !1,
            },
                l = ["/System/Matrix/js/regl/main.js"];
            var i = async (e, t = {}) => {
                if (!e) return;
                let a = document.createElement("canvas");
                (a.height = window.innerHeight), (a.width = window.innerWidth), e.append(a), await (0, r.mb)(l, void 0, void 0, !0), await window.Matrix?.(a, { ...s, ...t });
            };
        },
    },
]);



// "use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6514],{26514:function(e,t,a){a.r(t),a.d(t,{default:function(){return i}});var r=a(6484);let s={animationSpeed:1,backgroundColor:{space:"rgb",values:[0,0,0]},baseBrightness:-.5,baseContrast:.8,bloomSize:.4,bloomStrength:.7,brightnessDecay:1,brightnessOverride:0,brightnessThreshold:0,cursorColor:{space:"rgb",values:[1,3,1.5]},cycleFrameSkip:4,cycleSpeed:.02,density:1,ditherMagnitude:.05,effect:"palette",fallSpeed:.09,font:"matrixcode",forwardSpeed:.25,glintBrightness:-1.5,glintColor:{space:"rgb",values:[1,1,1]},glintContrast:2.5,glyphEdgeCrop:0,glyphHeightToWidth:1,glyphMSDFURL:"/System/Matrix/assets/matrixcode_msdf.png",glyphSequenceLength:57,glyphTextureGridSize:[8,8],glyphVerticalSpacing:1,hasBaseTexture:!1,hasGlintTexture:!1,hasThunder:!1,highPassThreshold:0,isPolar:!1,isolateCursor:!0,isolateGlint:!1,isometric:!1,loops:!1,numColumns:Math.max(Math.floor((0,r.E9)()/15),50),palette:[{at:0,color:{space:"hsl",values:[.4,.8,0]}},{at:.5,color:{space:"hsl",values:[.4,.8,.5]}},{at:1,color:{space:"hsl",values:[.4,.8,1]}}],raindropLength:1.5,renderer:"regl",resolution:1,rippleScale:30,rippleSpeed:.2,rippleThickness:.2,skipIntro:!0,slant:0,useCamera:!1,useHalfFloat:!1,useHoloplay:!1,volumetric:!1},l=["/System/Matrix/js/regl/main.js"];var i=async(e,t={})=>{if(!e)return;let a=document.createElement("canvas");a.height=window.innerHeight,a.width=window.innerWidth,e.append(a),await (0,r.mb)(l,void 0,void 0,!0),await window.Matrix?.(a,{...s,...t})}}}]);