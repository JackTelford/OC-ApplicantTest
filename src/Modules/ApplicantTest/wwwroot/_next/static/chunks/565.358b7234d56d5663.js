"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [565],
    {
        80565: function (e, t, r) {
            r.r(t),
                r.d(t, {
                    default: function () {
                        return N;
                    },
                });
            var i = r(85893),
                n = r(1864),
                a = r(67294),
                o = r(7502),
                l = (e, t, r) => {
                    let { contextMenu: i } = (0, o.H)();
                    return {
                        backMenu: (0, a.useMemo)(
                            () =>
                                i?.(() =>
                                    e
                                        .filter((e, r) => r < t)
                                        .map((e, i) => ({ action: () => r(i - t), label: e }))
                                        .reverse()
                                ),
                            [i, e, r, t]
                        ),
                        forwardMenu: (0, a.useMemo)(() => i?.(() => e.filter((e, r) => r > t).map((e, t) => ({ action: () => r(t + 1), label: e }))), [i, e, r, t]),
                    };
                },
                s = () => {
                    let { contextMenu: e } = (0, o.H)();
                    return (0, a.useMemo)(() => e?.((e) => [{ action: () => e?.target?.dispatchEvent(new MouseEvent("click", { bubbles: !0, ctrlKey: !0 })), label: "Open in new window" }]), [e]);
                },
                c = r(43950),
                d = r(6484),
                u = r(97836);
            let p = "./Program Files/Browser/directory/icons",
                h = {
                    "FutureSplash File": "portal",
                    "HTML Document": "layout",
                    "Media Playlist File": "movie",
                    "Picture File": "image2",
                    "Shockwave Flash File": "portal",
                    audio: "sound2",
                    compressed: "compressed",
                    emulator: "portal",
                    executable: "binary",
                    font: "a",
                    image: "diskimg",
                    jsdos: "compressed",
                    marked: "layout",
                    pdf: "layout",
                    python: "p",
                    tinymce: "layout",
                    wapm: "binary",
                },
                g = {
                    ...Object.fromEntries(Object.entries(c.Z).map(([e, { icon: t = "", type: r = "" }]) => [e, h[t || r] || "generic"])),
                    ".7z": "compressed",
                    ".gz": "compressed",
                    ".ini": "text",
                    ".js": "text",
                    ".json": "text",
                    ".pk3": "compressed",
                    ".rar": "compressed",
                    ".sh": "script",
                    ".tar": "tar",
                    ".tgz": "compressed",
                    ".txt": "text",
                    ".url": "link",
                    ".wsz": "compressed",
                },
                b = { back: "PARENTDIR", folder: "DIR", image2: "IMG", movie: "VID", text: "TXT" },
                m = (e) => {
                    if (void 0 === e) return " - ";
                    let t = ["", "K", "M", "G", "T"],
                        r = Math.floor((e ? Math.log(e) : 0) / Math.log(1024)),
                        i = e / 1024 ** (r = Math.min(r, t.length - 1)),
                        n = Number((i = i >= 100 ? Math.round(i) : Math.round(10 * i) / 10)).toString();
                    return n.length > 3 && (n = Number(Math.round(i)).toString()), n + (0 !== i && i < 10 && i % 1 == 0 ? ".0" : "") + t[r];
                },
                f = (e) => e?.toISOString().replace("T", " ").split(".")[0].slice(0, -3) || "",
                x = (e, t, { C: r, O: i }, a) => `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <title>Index of ${e}</title>
      <style>
        a:visited { color: #00e; }
        img { display: block; }
      </style>
    </head>
    <body>
      <h1>Index of ${e}</h1>
      <table>
        <tr>
          <th valign="top"><img decoding="async" src="${p}/blank.gif" alt="[ICO]" /></th>
          <th><a href="${t}?C=N;O=${r && ("N" !== r || "A" !== i) ? "A" : "D"}">Name</a></th><th><a href="${t}?C=M;O=${"M" === r && "A" === i ? "D" : "A"}">Last modified</a></th>
          <th><a href="${t}?C=S;O=${"S" === r && "A" === i ? "D" : "A"}">Size</a></th><th><a href="${t}?C=D;O=${"D" === r && "A" === i ? "D" : "A"}">Description</a></th>
        </tr>
        <tr>
          <th colspan="5"><hr /></th>
        </tr>
        ${a
                        .map(({ alt: e, description: r, href: i, icon: a, modified: o, size: l }) => {
                            let s = a || g[(0, d.RT)(i)] || "generic",
                                c = "back" === s,
                                h = c || "folder" === s ? "folder" : "file",
                                x = c ? "Parent Directory" : "/" === i ? u.SP : (0, n.basename)(i);
                            return `
              <tr>
                <td valign="top">
                  <a href="${t}${i}" type=${h}>
                    <img decoding="async" src="${p}/${s}.gif" alt="[${b[s] || e || "   "}]">
                  </a>
                </td>
                <td>
                  <a href="${t}${i}" type=${h}>${x}${"folder" === s ? "/" : ""}</a>
                </td>
                <td align="right">${f(o)}</td>
                <td align="right">${m(l)}</td>
                <td>${r || "&nbsp;"}</td>
              </tr>`;
                        })
                        .join("")}
          <tr><th colspan="5"><hr /></th></tr>
      </table>
    </body>
  </html>
`,
                w = (0, a.memo)(({ direction: e }) => {
                    let t = (0, a.useMemo)(() => ("right" === e ? { transform: "scaleX(-1)" } : void 0), [e]);
                    return (0, i.jsx)("svg", { style: t, viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: (0, i.jsx)("path", { d: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" }) });
                }),
                v = (0, a.memo)(() =>
                    (0, i.jsx)("svg", {
                        viewBox: "0 0 24 24",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: (0, i.jsx)("path", {
                            d: "M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z",
                        }),
                    })
                ),
                k = (0, a.memo)(() =>
                    (0, i.jsx)("svg", {
                        viewBox: "0 0 24 24",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: (0, i.jsx)("path", { d: "M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" }),
                    })
                ),
                $ = r(10508).ZP.div(
                    [
                        "iframe{background-color:",
                        ";border:0;height:calc(100% - 42px - 37px);width:100%;}nav{background-color:rgb(87,87,87);display:flex;padding:4px 0;place-content:center;place-items:center;div{display:flex;justify-content:space-around;min-width:102px;padding-left:4px;width:142px;}button{border-radius:50%;display:flex;height:28px;place-content:center;place-items:center;transition:background 0.2s ease-in-out;width:28px;svg{fill:rgb(240,240,240);height:20px;width:20px;}&:active{background-color:rgb(110,110,110);}&:disabled{background-color:inherit;svg{fill:rgb(152,152,152);}}}&:not(:first-child){border-bottom:1px solid rgb(118,115,118);height:37px;justify-content:left;padding:0 8px;}input{background-color:rgb(64,62,65);border-radius:18px;color:rgb(255,255,255);font-family:",
                        ';font-size:13px;height:34px;letter-spacing:0.2px;margin:0 6px;padding:0 13px 2px;width:100%;&:focus{outline:2px solid rgb(168,199,250);}&::selection{background-color:rgb(0,74,119);}}}#tabs-nav{background-color:rgb(87,87,87);border-bottom:1px solid rgb(118,115,118);display:flex;padding:4px;button{background-color:rgb(120,120,120);border:1px solid rgb(100,100,100);border-radius:4px 4px 0 0;color:white;margin-right:2px;padding:6px 12px;transition:background 0.2s ease-in-out;&:hover{background-color:rgb(140,140,140);}&:active{background-color:rgb(160,160,160);}&[data-active="true"]{background-color:white;border-bottom:none;color:black;padding-bottom:7px;}}.tab-container{align-items:center;display:flex;justify-content:space-between;}.close-tab{background-color:transparent;border:none;color:red;cursor:pointer;margin-left:8px;padding:0 6px;width:fit-content;&:hover{color:darkred;}}#add-tab{background-color:rgb(87,87,87);border:1px solid rgb(100,100,100);border-radius:4px;color:white;font-size:16px;margin-left:4px;padding:6px 12px;transition:background 0.2s ease-in-out;width:fit-content;&:hover{background-color:rgb(140,140,140);}&:active{background-color:rgb(160,160,160);}}}.bookmark-button{align-items:center;cursor:pointer;display:flex;width:50px;}.bookmark-container{align-items:center;display:flex;padding:5px;&:hover{background-color:rgb(140,140,140);}}.bookmark-name{font-size:16px;margin-left:8px;white-space:nowrap;}',
                    ],
                    ({ $hasSrcDoc: e }) => (e ? "#fff" : "initial"),
                    ({ theme: e }) => e.formats.systemFont
                );
            var y = r(61929),
                j = r(44696),
                S = r(20063),
                C = r(58437),
                M = r(37176),
                T = r(32221),
                E = r(67278),
                D = r(46581),
                L = r(6155),
                P = r(76488),
                N = ({ id: e }) => {
                    let {
                        icon: t,
                        linkElement: r,
                        url: c,
                        processes: { [e]: p },
                        open: h,
                    } = (0, C.z)(),
                        { setForegroundId: g } = (0, P.k)(),
                        { prependFileToTitle: b } = (0, j.Z)(e),
                        { initialTitle: m = "", url: f = "" } = p || {},
                        N = f || y.s6,
                        { canGoBack: R, canGoForward: z, history: A, moveHistory: I, position: F } = (0, T.Z)(N, e),
                        { exists: Z, fs: O, stat: H, readFile: K, readdir: B } = (0, S.o)(),
                        G = (0, a.useRef)(null),
                        W = (0, a.useRef)(null),
                        [U, Y] = (0, a.useState)(!1),
                        [X, _] = (0, a.useState)(""),
                        J = (e) => {
                            I(e), G.current && (G.current.value = A[F + e]);
                        },
                        V = (0, a.useRef)(""),
                        q = (e, t) => {
                            let r = !1;
                            try {
                                r = t.location?.pathname === "srcdoc";
                            } catch { }
                            r ? (_(""), W.current?.setAttribute("src", e)) : t.location?.replace(e);
                        },
                        [Q, ee] = (0, a.useState)(0),
                        et = (0, a.useCallback)(
                            (t) => {
                                G.current && (G.current.value = t), c(e, t), ec(Q, t);
                            },
                            [c, e, Q]
                        ),
                        { backMenu: er, forwardMenu: ei } = l(A, F, I),
                        en = s(),
                        ea = (0, a.useCallback)(
                            async (r) => {
                                let { contentWindow: i } = W.current || {};
                                if (i?.location) {
                                    let a = [".htm", ".html"].includes((0, d.RT)(r)) && (await Z(r));
                                    if ((Y(!0), a && _((await K(r)).toString()), t(e, M.Z.Browser.icon), r.toLowerCase().startsWith(y.FY.url))) q(`${window.location.origin}${y.FY.path}`, i), b(`${y.FY.url}/`);
                                    else if (r.toLowerCase().startsWith(y.J1.url)) q(`${window.location.origin}${y.J1.path}`, i), b(`${y.J1.url}/`);
                                    else if (r.toLowerCase().startsWith(y.Pk.url)) q(`${window.location.origin}${y.Pk.path}`, i), b(`${y.Pk.url}/`);
                                    else if (!a) {
                                        let a = await (0, d.Qv)(r);
                                        if (y.KM.has(a.host) || y.KM.has(r)) {
                                            let e = decodeURI(a.pathname).replace(/\/$/, "") || "/",
                                                t = Object.fromEntries(new URLSearchParams(a.search.replace(";", "&")).entries()),
                                                { O: r, C: o } = t,
                                                l = !r || "A" === r,
                                                s = y.Hi,
                                                c = "404 Not Found";
                                            if ((await Z(e)) && (await H(e)).isDirectory()) {
                                                let r = (
                                                    await Promise.all(
                                                        (await B(e)).map(async (t) => {
                                                            let r, i;
                                                            let a = (0, n.join)(e, t);
                                                            if ((0, d.RT)(t) === u.zm)
                                                                try {
                                                                    ({ comment: r, url: i } = (0, L.OE)(await K(a)));
                                                                } catch { }
                                                            let o = await H(i && (await Z(i)) ? i : a),
                                                                l = o.isDirectory();
                                                            return { description: r, href: l && i ? i : a, icon: l ? "folder" : void 0, modified: o.mtime, size: l || i ? void 0 : o.size };
                                                        })
                                                    )
                                                )
                                                    .sort((e, t) => Number("folder" === t.icon) - Number("folder" === e.icon))
                                                    .sort((e, t) => {
                                                        if (("folder" === e.icon) == ("folder" === t.icon)) {
                                                            let r = (0, n.basename)(e.href),
                                                                i = (0, n.basename)(t.href);
                                                            return l ? (r < i ? -1 : 1) : r > i ? -1 : 1;
                                                        }
                                                        return 0;
                                                    })
                                                    .sort((e, t) => {
                                                        if (!o || "N" === o) return 0;
                                                        let r = (r) => {
                                                            let i = r(e),
                                                                n = r(t);
                                                            return i === n ? 0 : l ? (i < n ? -1 : 1) : i > n ? -1 : 1;
                                                        };
                                                        return "S" === o ? r(({ size: e }) => e ?? 0) : "M" === o ? r(({ modified: e }) => e?.getTime() ?? 0) : "D" === o ? r(({ description: e }) => e ?? "") : 0;
                                                    })
                                                    .sort((e, t) => Number("folder" === t.icon) - Number("folder" === e.icon));
                                                W.current?.addEventListener(
                                                    "load",
                                                    () => {
                                                        try {
                                                            i.document.body.querySelectorAll("a").forEach((t) => {
                                                                t.addEventListener("click", (t) => {
                                                                    t.preventDefault();
                                                                    let r = t.currentTarget,
                                                                        i = "folder" === r.getAttribute("type"),
                                                                        { origin: n, pathname: a, search: o } = new URL(r.href);
                                                                    o ? et(`${n}${encodeURI(e)}${o}`) : i ? et(r.href) : O && r.href && L.Z7(O, decodeURI(a), d.RT(a), ({ pid: e, url: t }) => h(e || "OpenWith", { url: t }));
                                                                });
                                                            });
                                                        } catch { }
                                                    },
                                                    u.K7
                                                ),
                                                    (s = x(e, a.origin, t, "/" === e ? r : [{ href: (0, n.resolve)(e, ".."), icon: "back" }, ...r])),
                                                    (c = `Index of ${e}`);
                                            }
                                            _(s), b(c);
                                        } else {
                                            let n = a.href;
                                            if ((q(n, i), n.startsWith(d.z8))) b(`${r} - Google Search`);
                                            else {
                                                let { name: e = m } = y.hG?.find(({ url: e }) => e === r) || {};
                                                b(e);
                                            }
                                            if (r.startsWith("ipfs://")) t(e, "./System/Icons/Favicons/32x32/ipfs.webp");
                                            else {
                                                let r = new Image(),
                                                    i = `${new URL(n).origin}${u.Yg}`;
                                                r.addEventListener(
                                                    "error",
                                                    () => {
                                                        let { icon: r } = y.hG?.find(({ url: e }) => e === n) || {};
                                                        r && t(e, r);
                                                    },
                                                    u.K7
                                                ),
                                                    r.addEventListener("load", () => t(e, i), u.K7),
                                                    (r.src = i);
                                            }
                                        }
                                    }
                                }
                            },
                            [Z, O, et, e, m, h, b, K, B, t, H]
                        );
                    (0, a.useEffect)(() => {
                        p && A[F] !== V.current && ((V.current = A[F]), ea(A[F]));
                    }, [A, F, p, ea]),
                        (0, a.useEffect)(() => {
                            W.current && r(e, "peekElement", W.current);
                        }, [e, r]);
                    let [eo, el] = (0, a.useState)([{ id: 0, url: N }]),
                        es = (e) => {
                            let t = eo.find((t) => t.id === e);
                            t && (ee(e), ea(t.url));
                        },
                        ec = (e, t) => {
                            el(eo.map((r) => (r.id === e ? { ...r, url: t } : r)));
                        };
                    (0, a.useEffect)(() => {
                        p && A[F] !== V.current && ((V.current = A[F]), ea(A[F]).then((e) => e), ec(Q, A[F]));
                    }, [A, F, p, ea, Q]);
                    let ed = (e) => {
                        let t = eo.filter((t) => t.id !== e);
                        el(t), Q === e && t.length > 0 ? (ee((t.length, t[0].id)), ea(t[0].url)) : 0 === t.length && (ee(0), ea(y.s6));
                    },
                        { setMenu: eu } = (0, o.H)(),
                        [ep, eh] = (0, a.useState)(null),
                        eg = (e) => {
                            if (e instanceof HTMLInputElement || e instanceof HTMLTextAreaElement) {
                                let t = e.selectionStart ?? 0,
                                    r = e.selectionEnd ?? 0,
                                    i = e.value.substring(t, r);
                                i &&
                                    navigator.clipboard
                                        .writeText(i)
                                        .then(() => {
                                            eu({ items: [], x: 0, y: 0 });
                                        })
                                        .catch((e) => { });
                            }
                        },
                        eb = (e) => {
                            (ep instanceof HTMLInputElement || ep instanceof HTMLTextAreaElement) &&
                                navigator.clipboard
                                    .readText()
                                    .then((e) => {
                                        if (document.body.contains(ep)) {
                                            let t = ep.selectionStart ?? 0,
                                                r = ep.selectionEnd ?? 0,
                                                i = ep.value,
                                                n = i.slice(0, t) + e + i.slice(r);
                                            (ep.value = n), ep.setSelectionRange(t + e.length, t + e.length), "urlInput" === ep.id && ea(n);
                                            let a = new Event("input", { bubbles: !0 });
                                            ep.dispatchEvent(a), eu({ items: [], x: 0, y: 0 });
                                        }
                                    })
                                    .catch((e) => { });
                        };
                    return (0, i.jsxs)($, {
                        $hasSrcDoc: !!X,
                        children: [
                            (0, i.jsxs)("div", {
                                id: "tabs-nav",
                                children: [
                                    eo.map((e) =>
                                        (0, i.jsx)(
                                            "div",
                                            {
                                                className: "tab",
                                                children: (0, i.jsxs)("div", {
                                                    className: "tab-container",
                                                    children: [
                                                        (0, i.jsx)(E.Z, { id: `tab-${e.id}`, onClick: () => es(e.id), ...(0, d.PS)(`Switch to tab ${e.url}`), children: e.url }, e.id),
                                                        (0, i.jsx)(E.Z, { id: `close-tab-${e.id}`, className: "close-tab", onClick: () => ed(e.id), ...(0, d.PS)(`Close tab ${e.url}`), children: "X" }),
                                                    ],
                                                }),
                                            },
                                            e.id
                                        )
                                    ),
                                    (0, i.jsx)(E.Z, {
                                        id: "add-tab",
                                        onClick: () => {
                                            let e = new Date().getTime();
                                            el([...eo, { id: e, url: y.s6 }]), ee(e);
                                        },
                                        ...(0, d.PS)("Add new tab"),
                                        children: "+",
                                    }),
                                ],
                            }),
                            (0, i.jsxs)("nav", {
                                children: [
                                    (0, i.jsxs)("div", {
                                        children: [
                                            (0, i.jsx)(E.Z, { disabled: !R, onClick: () => J(-1), ...(0, d.PS)("Click to go back"), ...er, children: (0, i.jsx)(w, { direction: "left" }) }),
                                            (0, i.jsx)(E.Z, { disabled: !z, onClick: () => J(1), ...(0, d.PS)("Click to go forward"), ...ei, children: (0, i.jsx)(w, { direction: "right" }) }),
                                            (0, i.jsx)(E.Z, { disabled: U, onClick: () => ea(A[F]), ...(0, d.PS)("Reload this page"), children: U ? (0, i.jsx)(k, {}) : (0, i.jsx)(v, {}) }),
                                        ],
                                    }),
                                    (0, i.jsx)("input", {
                                        ref: G,
                                        defaultValue: N,
                                        enterKeyHint: "go",
                                        onFocusCapture: () => G.current?.select(),
                                        onKeyDown: ({ key: t }) => {
                                            G.current && "Enter" === t && (c(e, G.current.value), V.current === G.current.value && ea(G.current.value), window.getSelection()?.removeAllRanges(), G.current.blur());
                                        },
                                        onContextMenu: (e) => {
                                            e.preventDefault();
                                            let { clientX: t, clientY: r } = e,
                                                i = e.target;
                                            eu({
                                                items: [
                                                    { label: "Copy", action: () => eg(i) },
                                                    { label: "Paste", action: () => eb(i) },
                                                ],
                                                x: t,
                                                y: r,
                                            });
                                        },
                                        type: "text",
                                        id: "urlInput",
                                    }),
                                ],
                            }),
                            (0, i.jsx)("nav", {
                                children: y.hG.map(({ name: e, icon: t, url: r }) =>
                                    (0, i.jsx)(
                                        "div",
                                        {
                                            className: "bookmark-container",
                                            children: (0, i.jsxs)(E.Z, {
                                                className: "bookmark-button",
                                                onClick: ({ ctrlKey: t }) => {
                                                    window.parent && window.parent.postMessage({ event: "bookmarkClicked", details: { name: e, url: r } }, "*"), t ? h("Browser", { url: r }) : et(r);
                                                },
                                                ...(0, d.PS)(`${e}
${r.replace(/^http:\/\//, "").replace(/\/$/, "")}`),
                                                ...en,
                                                children: [(0, i.jsx)(D.Z, { alt: e, imgSize: 32, src: t }), (0, i.jsx)("span", { className: "bookmark-name", children: e })],
                                            }),
                                        },
                                        e
                                    )
                                ),
                            }),
                            (0, i.jsx)("iframe", {
                                ref: W,
                                onLoad: () => {
                                    try {
                                        W.current?.contentWindow?.addEventListener("focus", () => g(e));
                                    } catch { }
                                    U && Y(!1);
                                },
                                srcDoc: X || void 0,
                                title: e,
                                ...u.v0,
                            }),
                        ],
                    });
                };
        },
        44696: function (e, t, r) {
            var i = r(67294),
                n = r(58437),
                a = r(37176),
                o = r(97836);
            t.Z = (e) => {
                let { title: t } = (0, n.z)(),
                    [r] = e.split(o.CC),
                    { title: l } = a.Z[r] || {};
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
                            let a = r ? `${i ? `${o.xy} ` : ""}${r}${n ? " " : " - "}` : "";
                            t(e, `${a}${l}`);
                        },
                        [e, l, t]
                    ),
                };
            };
        },
        32221: function (e, t, r) {
            var i = r(67294),
                n = r(58437);
            t.Z = (e, t) => {
                let { url: r } = (0, n.z)(),
                    [a, o] = (0, i.useState)(e),
                    [l, s] = (0, i.useState)(() => [e]),
                    [c, d] = (0, i.useState)(0),
                    u = (0, i.useCallback)(
                        (e) => {
                            let i = c + e;
                            d(i), o(l[i]), r(t, l[i]);
                        },
                        [r, l, t, c]
                    );
                return (
                    (0, i.useEffect)(() => {
                        e !== a && (d(c + 1), o(e), s([...l.slice(0, c + 1), e]));
                    }, [a, l, c, e]),
                    { canGoBack: c > 0, canGoForward: c < l.length - 1, currentUrl: a, history: l, moveHistory: u, position: c }
                );
            };
        },
    },
]);
// path \ApplicantTest\wwwroot\_next\static\chunks\565.358b7234d56d5663.js