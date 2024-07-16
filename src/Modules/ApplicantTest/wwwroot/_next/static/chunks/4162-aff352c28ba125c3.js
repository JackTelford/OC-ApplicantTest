"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [4162],
    {
        73839: function (e, t, n) {
            n.d(t, {
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
                    return l;
                },
                Yt: function () {
                    return x;
                },
                bu: function () {
                    return s;
                },
                dD: function () {
                    return u;
                },
                fK: function () {
                    return o;
                },
                fU: function () {
                    return g;
                },
                o8: function () {
                    return f;
                },
                qk: function () {
                    return d;
                },
                rT: function () {
                    return i;
                },
            });
            var r = n(10508);
            let o = r.ZP.div(["background-color:#fff;border:1px solid #ccc;box-shadow:0 0 10px rgba(0,0,0,10%);display:flex;flex-direction:column;margin:auto;padding:0;position:absolute;width:600px;z-index:1000;"]),
                i = r.ZP.div(["flex:1;overflow:hidden;padding:10px;position:relative;"]),
                a = r.ZP.input(["border:1px solid #ccc;border-radius:0;margin:0;padding:10px;width:100%;"]),
                s = r.ZP.textarea(["border:1px solid #ccc;border-radius:0;font-size:16px;height:200px;margin:0;padding:10px;resize:vertical;white-space:pre-wrap;width:100%;"]),
                l = r.ZP.button(["background-color:#007bff;border:none;border-radius:0;color:#fff;cursor:pointer;padding:10px 15px;&:hover{background-color:#0056b3;}"]),
                u = r.ZP.button(["background-color:red;border:none;border-radius:20%;color:white;cursor:pointer;padding:5px 10px;position:absolute;right:10px;top:10px;&:hover{background-color:darkred;}"]),
                c = r.ZP.div(["background-color:#a2a2a2;border-bottom:1px solid #000;cursor:move;display:flex;justify-content:space-between;padding:10px;"]),
                d = r.ZP.div(["align-items:center;cursor:pointer;display:flex;span{font-size:18px;font-weight:bold;margin-left:10px;}"]),
                p = r.ZP.div(
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
                f = r.ZP.div([
                    "align-items:center;background-color:#d0c9c9;border-bottom:1px solid #000;display:flex;justify-content:space-between;margin-bottom:15px;padding:10px;.toolbar-button{background-color:#007bff;border:none;border-radius:0;color:white;cursor:pointer;margin-left:5px;padding:5px 10px;&:hover{background-color:#0056b3;}}",
                ]),
                g = r.ZP.div(["margin-top:15px;ul{list-style-type:none;padding:0;}li{background-color:#f1f1f1;border-radius:4px;margin-bottom:5px;padding:5px;}"]),
                x = r.ZP.img(["border-radius:30%;height:50px;width:50px;"]);
        },
        54162: function (e, t, n) {
            n.r(t),
                n.d(t, {
                    default: function () {
                        return l;
                    },
                });
            var r = n(85893),
                o = n(67294),
                i = n(7502),
                a = n(73839);
            let s = { "RDI-Applicant": "System/Icons/avatars/rdi.png" };
            var l = () => {
                let [e, t] = (0, o.useState)(""),
                    [n, l] = (0, o.useState)(""),
                    [u, c] = (0, o.useState)(""),
                    [d, p] = (0, o.useState)(""),
                    [f, g] = (0, o.useState)([]),
                    [x, b] = (0, o.useState)(!0),
                    [h, m] = (0, o.useState)(!1),
                    v = (0, o.useRef)(null),
                    [y, j] = (0, o.useState)({ x: 0, y: 0 }),
                    [S, w] = (0, o.useState)({ x: 0, y: 0 }),
                    [k, C] = (0, o.useState)(!1),
                    { setMenu: D } = (0, i.H)(),
                    [T, E] = (0, o.useState)(!1),
                    [P, A] = (0, o.useState)(""),
                    [M, $] = (0, o.useState)(""),
                    [Z, F] = (0, o.useState)(null),
                    L = { email: (0, o.useRef)(null), cc: (0, o.useRef)(null), subject: (0, o.useRef)(null), body: (0, o.useRef)(null) },
                    R = (0, o.useCallback)(
                        (r) => {
                            if ((r.preventDefault(), !_(e))) {
                                Y("Please enter a valid email address.");
                                return;
                            }
                            Y(""),
                                window.parent && window.parent.postMessage({ event: "emailSent", details: { to: e, cc: n, subject: u, body: d, attachments: f } }, "*"),
                                t(""),
                                l(""),
                                c(""),
                                p(""),
                                g([]),
                                E(!0),
                                setTimeout(() => {
                                    E(!1);
                                }, 2e3);
                        },
                        [e, n, u, d, f]
                    );
                (0, o.useEffect)(() => {
                    if (x && v.current) {
                        let e = v.current,
                            t = (window.innerWidth - e.offsetWidth) / 2,
                            n = (window.innerHeight - e.offsetHeight) / 2;
                        j({ x: t, y: n }), (e.style.left = `${t}px`), (e.style.top = `${n}px`), C(!0);
                    }
                }, [x]);
                let H = (e) => {
                    j({ x: e.clientX - S.x, y: e.clientY - S.y });
                },
                    z = () => {
                        document.removeEventListener("mousemove", H), document.removeEventListener("mouseup", z);
                    };
                (0, o.useEffect)(() => {
                    let e = v.current;
                    e && ((e.style.left = `${y.x}px`), (e.style.top = `${y.y}px`));
                }, [y]);
                let q = (0, o.useRef)(null),
                    [I, B] = (0, o.useState)(!0),
                    [N, Y] = (0, o.useState)(""),
                    _ = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e),
                    U = (e) => {
                        e.preventDefault();
                        let { clientX: t, clientY: n } = e,
                            r = e.target;
                        D({
                            items: [
                                { label: "Copy", action: () => W(r) },
                                { label: "Paste", action: () => X(r) },
                            ],
                            x: t,
                            y: n,
                        });
                    },
                    W = (e) => {
                        if (e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement) {
                            let t = e.selectionStart ?? 0,
                                n = e.selectionEnd ?? 0,
                                r = e.value.substring(t, n);
                            r &&
                                navigator.clipboard
                                    .writeText(r)
                                    .then(() => {
                                        D({ items: [], x: 0, y: 0 });
                                    })
                                    .catch((e) => { });
                        }
                    },
                    X = (e) => {
                        (Z instanceof HTMLInputElement || Z instanceof HTMLTextAreaElement) &&
                            navigator.clipboard
                                .readText()
                                .then((e) => {
                                    if (document.body.contains(Z)) {
                                        let n = Z.selectionStart ?? 0,
                                            r = Z.selectionEnd ?? 0,
                                            o = Z.value,
                                            i = o.slice(0, n) + e + o.slice(r);
                                        switch (((Z.value = i), Z.setSelectionRange(n + e.length, n + e.length), Z.id)) {
                                            case "To":
                                                t(i);
                                                break;
                                            case "Cc":
                                                l(i);
                                                break;
                                            case "Subject":
                                                c(i);
                                                break;
                                            case "Body":
                                                p(i);
                                        }
                                        let a = new Event("input", { bubbles: !0 });
                                        Z.dispatchEvent(a), D({ items: [], x: 0, y: 0 });
                                    }
                                })
                                .catch((e) => { });
                    };
                return (0, r.jsxs)("div", {
                    children: [
                        (0, r.jsx)(a.qk, {
                            onDoubleClick: () => {
                                b(!0);
                            },
                        }),
                        x &&
                        (0, r.jsxs)(a.fK, {
                            ref: v,
                            style: { visibility: k ? "visible" : "hidden", left: `${y.x}px`, top: `${y.y}px` },
                            onContextMenu: U,
                            children: [
                                (0, r.jsxs)(a.A3, {
                                    onMouseDown: (e) => {
                                        if (e.target !== e.currentTarget) return;
                                        let t = v.current;
                                        if (t) {
                                            let n = t.getBoundingClientRect();
                                            w({ x: e.clientX - n.left, y: e.clientY - n.top }), document.addEventListener("mousemove", H), document.addEventListener("mouseup", z);
                                        }
                                    },
                                    children: [
                                        (0, r.jsx)("h2", { children: "Email" }),
                                        (0, r.jsx)(a.dD, {
                                            onClick: () => {
                                                b(!1), C(!1), t(""), l(""), c(""), p(""), g([]);
                                            },
                                            children: "X",
                                        }),
                                    ],
                                }),
                                (0, r.jsxs)(a.o8, {
                                    className: "toolbar",
                                    children: [
                                        (0, r.jsx)(a.Yt, { src: s["RDI-Applicant"], alt: "User Avatar" }),
                                        (0, r.jsx)("button", {
                                            type: "button",
                                            className: "toolbar-button",
                                            onClick: () => {
                                                q.current && q.current.click();
                                            },
                                            children: "Attach files",
                                        }),
                                        (0, r.jsx)("input", {
                                            type: "file",
                                            ref: q,
                                            style: { display: "none" },
                                            onChange: (e) => {
                                                let t = Array.from(e.target.files || []).map((e) => e.name);
                                                g((e) => [...new Set([...e, ...t])]);
                                            },
                                            multiple: !0,
                                        }),
                                    ],
                                }),
                                (0, r.jsxs)(a.rT, {
                                    onDragOver: (e) => {
                                        e.preventDefault(), m(!0);
                                    },
                                    onDrop: (e) => {
                                        e.preventDefault(), m(!1);
                                        let t = [];
                                        if (e.dataTransfer.items)
                                            for (let n = 0; n < e.dataTransfer.items.length; n++) {
                                                let r = e.dataTransfer.items[n];
                                                if ("file" === r.kind) {
                                                    let e = r.getAsFile();
                                                    e && t.push(e.name);
                                                } else
                                                    "string" === r.kind &&
                                                        r.getAsString((e) => {
                                                            e.startsWith("[") && (t.push(e), g((e) => [...new Set([...e, ...t])]));
                                                        });
                                            }
                                        else {
                                            let n = Array.from(e.dataTransfer.files).map((e) => e.name);
                                            t.push(...n);
                                        }
                                        t.length > 0 && g((e) => [...new Set([...e, ...t])]);
                                    },
                                    onDragLeave: () => {
                                        m(!1);
                                    },
                                    children: [
                                        (0, r.jsx)(a.LF, { $isDragging: h }),
                                        T && (0, r.jsx)("h3", { style: { color: "green" }, children: "Email Sent" }),
                                        (0, r.jsxs)("form", {
                                            onSubmit: R,
                                            children: [
                                                (0, r.jsx)(a.Fy, {
                                                    id: "To",
                                                    type: "text",
                                                    placeholder: "To",
                                                    value: e,
                                                    onChange: (e) => {
                                                        let n = e.target.value;
                                                        t(n), _(n) ? (Y(""), B(!0)) : B(!1);
                                                    },
                                                    required: !0,
                                                    ref: L.email,
                                                    onFocus: (e) => {
                                                        F(e.target);
                                                    },
                                                    onContextMenu: U,
                                                }),
                                                N && (0, r.jsx)("p", { style: { color: "red" }, children: N }),
                                                (0, r.jsx)(a.Fy, {
                                                    id: "Cc",
                                                    type: "text",
                                                    placeholder: "Cc",
                                                    value: n,
                                                    onChange: (e) => {
                                                        l(e.target.value);
                                                    },
                                                    ref: L.cc,
                                                    onFocus: (e) => {
                                                        F(e.target);
                                                    },
                                                    onContextMenu: U,
                                                }),
                                                (0, r.jsx)(a.Fy, {
                                                    id: "Subject",
                                                    type: "text",
                                                    placeholder: "Subject",
                                                    value: u,
                                                    onChange: (e) => {
                                                        c(e.target.value);
                                                    },
                                                    required: !0,
                                                    ref: L.subject,
                                                    onFocus: (e) => {
                                                        F(e.target);
                                                    },
                                                    onContextMenu: U,
                                                }),
                                                (0, r.jsx)(a.bu, {
                                                    id: "Body",
                                                    placeholder: "Body",
                                                    value: d,
                                                    onChange: (e) => {
                                                        p(e.target.value);
                                                    },
                                                    required: !0,
                                                    ref: L.body,
                                                    onFocus: (e) => {
                                                        F(e.target);
                                                    },
                                                    onContextMenu: U,
                                                }),
                                                (0, r.jsxs)(a.fU, { children: [(0, r.jsx)("strong", { children: "Attachments:" }), (0, r.jsx)("ul", { children: f.map((e, t) => (0, r.jsx)("li", { children: e }, t)) })] }),
                                                (0, r.jsx)(a.Mm, { type: "submit", children: "Send" }),
                                            ],
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                });
            };
        },
    },
]);




// "use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4162],{73839:function(e,t,n){n.d(t,{A3:function(){return c},Fy:function(){return a},LF:function(){return p},Mm:function(){return l},Yt:function(){return x},bu:function(){return s},dD:function(){return u},fK:function(){return o},fU:function(){return g},o8:function(){return f},qk:function(){return d},rT:function(){return i}});var r=n(10508);let o=r.ZP.div(["background-color:#fff;border:1px solid #ccc;box-shadow:0 0 10px rgba(0,0,0,10%);display:flex;flex-direction:column;margin:auto;padding:0;position:absolute;width:600px;z-index:1000;"]),i=r.ZP.div(["flex:1;overflow:hidden;padding:10px;position:relative;"]),a=r.ZP.input(["border:1px solid #ccc;border-radius:0;margin:0;padding:10px;width:100%;"]),s=r.ZP.textarea(["border:1px solid #ccc;border-radius:0;font-size:16px;height:200px;margin:0;padding:10px;resize:vertical;white-space:pre-wrap;width:100%;"]),l=r.ZP.button(["background-color:#007bff;border:none;border-radius:0;color:#fff;cursor:pointer;padding:10px 15px;&:hover{background-color:#0056b3;}"]),u=r.ZP.button(["background-color:red;border:none;border-radius:20%;color:white;cursor:pointer;padding:5px 10px;position:absolute;right:10px;top:10px;&:hover{background-color:darkred;}"]),c=r.ZP.div(["background-color:#a2a2a2;border-bottom:1px solid #000;cursor:move;display:flex;justify-content:space-between;padding:10px;"]),d=r.ZP.div(["align-items:center;cursor:pointer;display:flex;span{font-size:18px;font-weight:bold;margin-left:10px;}"]),p=r.ZP.div(["align-items:center;background-color:",";border:",";color:#007bff;display:",";inset:0;justify-content:center;padding:",";position:absolute;transition:background-color 0.3s,border 0.3s;z-index:1001;&::after{content:",";font-size:1.5em;}"],e=>e.$isDragging?"#f0f8ff":"transparent",e=>e.$isDragging?"2px dashed #007bff":"none",e=>e.$isDragging?"flex":"none",e=>e.$isDragging?"10px":"0",e=>e.$isDragging?"'Drop here'":"''"),f=r.ZP.div(["align-items:center;background-color:#d0c9c9;border-bottom:1px solid #000;display:flex;justify-content:space-between;margin-bottom:15px;padding:10px;.toolbar-button{background-color:#007bff;border:none;border-radius:0;color:white;cursor:pointer;margin-left:5px;padding:5px 10px;&:hover{background-color:#0056b3;}}"]),g=r.ZP.div(["margin-top:15px;ul{list-style-type:none;padding:0;}li{background-color:#f1f1f1;border-radius:4px;margin-bottom:5px;padding:5px;}"]),x=r.ZP.img(["border-radius:30%;height:50px;width:50px;"])},54162:function(e,t,n){n.r(t),n.d(t,{default:function(){return l}});var r=n(85893),o=n(67294),i=n(7502),a=n(73839);let s={"RDI-Applicant":"System/Icons/avatars/rdi.png"};var l=()=>{let[e,t]=(0,o.useState)(""),[n,l]=(0,o.useState)(""),[u,c]=(0,o.useState)(""),[d,p]=(0,o.useState)(""),[f,g]=(0,o.useState)([]),[x,b]=(0,o.useState)(!0),[h,m]=(0,o.useState)(!1),v=(0,o.useRef)(null),[y,j]=(0,o.useState)({x:0,y:0}),[S,w]=(0,o.useState)({x:0,y:0}),[k,C]=(0,o.useState)(!1),{setMenu:D}=(0,i.H)(),[T,E]=(0,o.useState)(!1),[P,A]=(0,o.useState)(""),[M,$]=(0,o.useState)(""),[Z,F]=(0,o.useState)(null),L={email:(0,o.useRef)(null),cc:(0,o.useRef)(null),subject:(0,o.useRef)(null),body:(0,o.useRef)(null)},R=(0,o.useCallback)(r=>{if(r.preventDefault(),!_(e)){Y("Please enter a valid email address.");return}Y(""),window.parent&&window.parent.postMessage({event:"emailSent",details:{to:e,cc:n,subject:u,body:d,attachments:f}},"*"),t(""),l(""),c(""),p(""),g([]),E(!0),setTimeout(()=>{E(!1)},2e3)},[e,n,u,d,f]);(0,o.useEffect)(()=>{if(x&&v.current){let e=v.current,t=(window.innerWidth-e.offsetWidth)/2,n=(window.innerHeight-e.offsetHeight)/2;j({x:t,y:n}),e.style.left=`${t}px`,e.style.top=`${n}px`,C(!0)}},[x]);let H=e=>{j({x:e.clientX-S.x,y:e.clientY-S.y})},z=()=>{document.removeEventListener("mousemove",H),document.removeEventListener("mouseup",z)};(0,o.useEffect)(()=>{let e=v.current;e&&(e.style.left=`${y.x}px`,e.style.top=`${y.y}px`)},[y]);let q=(0,o.useRef)(null),[I,B]=(0,o.useState)(!0),[N,Y]=(0,o.useState)(""),_=e=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e),U=e=>{e.preventDefault();let{clientX:t,clientY:n}=e,r=e.target;D({items:[{label:"Copy",action:()=>W(r)},{label:"Paste",action:()=>X(r)}],x:t,y:n})},W=e=>{if(e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement){let t=e.selectionStart??0,n=e.selectionEnd??0,r=e.value.substring(t,n);r&&navigator.clipboard.writeText(r).then(()=>{D({items:[],x:0,y:0})}).catch(e=>{})}},X=e=>{(Z instanceof HTMLInputElement||Z instanceof HTMLTextAreaElement)&&navigator.clipboard.readText().then(e=>{if(document.body.contains(Z)){let n=Z.selectionStart??0,r=Z.selectionEnd??0,o=Z.value,i=o.slice(0,n)+e+o.slice(r);switch(Z.value=i,Z.setSelectionRange(n+e.length,n+e.length),Z.id){case"To":t(i);break;case"Cc":l(i);break;case"Subject":c(i);break;case"Body":p(i)}let a=new Event("input",{bubbles:!0});Z.dispatchEvent(a),D({items:[],x:0,y:0})}}).catch(e=>{})};return(0,r.jsxs)("div",{children:[(0,r.jsx)(a.qk,{onDoubleClick:()=>{b(!0)}}),x&&(0,r.jsxs)(a.fK,{ref:v,style:{visibility:k?"visible":"hidden",left:`${y.x}px`,top:`${y.y}px`},onContextMenu:U,children:[(0,r.jsxs)(a.A3,{onMouseDown:e=>{if(e.target!==e.currentTarget)return;let t=v.current;if(t){let n=t.getBoundingClientRect();w({x:e.clientX-n.left,y:e.clientY-n.top}),document.addEventListener("mousemove",H),document.addEventListener("mouseup",z)}},children:[(0,r.jsx)("h2",{children:"Email"}),(0,r.jsx)(a.dD,{onClick:()=>{b(!1),C(!1),t(""),l(""),c(""),p(""),g([])},children:"X"})]}),(0,r.jsxs)(a.o8,{className:"toolbar",children:[(0,r.jsx)(a.Yt,{src:s["RDI-Applicant"],alt:"User Avatar"}),(0,r.jsx)("button",{type:"button",className:"toolbar-button",onClick:()=>{q.current&&q.current.click()},children:"Attach files"}),(0,r.jsx)("input",{type:"file",ref:q,style:{display:"none"},onChange:e=>{let t=Array.from(e.target.files||[]).map(e=>e.name);g(e=>[...new Set([...e,...t])])},multiple:!0})]}),(0,r.jsxs)(a.rT,{onDragOver:e=>{e.preventDefault(),m(!0)},onDrop:e=>{e.preventDefault(),m(!1);let t=[];if(e.dataTransfer.items)for(let n=0;n<e.dataTransfer.items.length;n++){let r=e.dataTransfer.items[n];if("file"===r.kind){let e=r.getAsFile();e&&t.push(e.name)}else"string"===r.kind&&r.getAsString(e=>{e.startsWith("[")&&(t.push(e),g(e=>[...new Set([...e,...t])]))})}else{let n=Array.from(e.dataTransfer.files).map(e=>e.name);t.push(...n)}t.length>0&&g(e=>[...new Set([...e,...t])])},onDragLeave:()=>{m(!1)},children:[(0,r.jsx)(a.LF,{$isDragging:h}),T&&(0,r.jsx)("h3",{style:{color:"green"},children:"Email Sent"}),(0,r.jsxs)("form",{onSubmit:R,children:[(0,r.jsx)(a.Fy,{id:"To",type:"text",placeholder:"To",value:e,onChange:e=>{let n=e.target.value;t(n),_(n)?(Y(""),B(!0)):B(!1)},required:!0,ref:L.email,onFocus:e=>{F(e.target)},onContextMenu:U}),N&&(0,r.jsx)("p",{style:{color:"red"},children:N}),(0,r.jsx)(a.Fy,{id:"Cc",type:"text",placeholder:"Cc",value:n,onChange:e=>{l(e.target.value)},ref:L.cc,onFocus:e=>{F(e.target)},onContextMenu:U}),(0,r.jsx)(a.Fy,{id:"Subject",type:"text",placeholder:"Subject",value:u,onChange:e=>{c(e.target.value)},required:!0,ref:L.subject,onFocus:e=>{F(e.target)},onContextMenu:U}),(0,r.jsx)(a.bu,{id:"Body",placeholder:"Body",value:d,onChange:e=>{p(e.target.value)},required:!0,ref:L.body,onFocus:e=>{F(e.target)},onContextMenu:U}),(0,r.jsxs)(a.fU,{children:[(0,r.jsx)("strong",{children:"Attachments:"}),(0,r.jsx)("ul",{children:f.map((e,t)=>(0,r.jsx)("li",{children:e},t))})]}),(0,r.jsx)(a.Mm,{type:"submit",children:"Send"})]})]})]})]})}}}]);