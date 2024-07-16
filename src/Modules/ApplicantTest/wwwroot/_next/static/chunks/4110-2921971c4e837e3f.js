"use strict";
(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [4110],
    {
        10393: function (e, t, n) {
            n.d(t, {
                $3: function () {
                    return l;
                },
                QC: function () {
                    return r;
                },
                YH: function () {
                    return i;
                },
                dI: function () {
                    return a;
                },
                ov: function () {
                    return o;
                },
                vF: function () {
                    return s;
                },
            });
            let r = { center: "center center", fill: "center center / cover", fit: "center center / contain", stretch: "center center / 100% 100%", tile: "50% 50%" },
                a = {
                    COASTAL_LANDSCAPE: () => n.e(5522, "high").then(n.bind(n, 65522)),
                    HEXELLS: () => n.e(3681, "high").then(n.bind(n, 83681)),
                    MATRIX: () => n.e(6514, "high").then(n.bind(n, 26514)),
                    STABLE_DIFFUSION: () => n.e(4268, "high").then(n.bind(n, 4268)),
                    VANTA: () => n.e(8020, "high").then(n.bind(n, 98020)),
                },
                i = {
                    COASTAL_LANDSCAPE: () => new Worker(n.tu(new URL(n.p + n.u(5183), n.b)), { name: "Wallpaper (Coastal Landscape)" }),
                    HEXELLS: () => new Worker(n.tu(new URL(n.p + n.u(3191), n.b)), { name: "Wallpaper (Hexells)" }),
                    STABLE_DIFFUSION: () => new Worker(n.tu(new URL(n.p + n.u(9629), n.b)), { name: "Wallpaper (Stable Diffusion)" }),
                    VANTA: (e) => new Worker(n.tu(new URL(n.p + n.u(1872), n.b)), { name: `Wallpaper (Vanta Waves)${e ? ` [${e}]` : ""}` }),
                },
                o = [
                    { id: "APOD", startsWith: !0 },
                    { id: "COASTAL_LANDSCAPE", name: "Coastal Landscape" },
                    { id: "HEXELLS", name: "Hexells" },
                    { id: "MATRIX 2D", name: "Matrix (2D)" },
                    { id: "MATRIX 3D", name: "Matrix (3D)" },
                    { id: "SLIDESHOW", name: "Picture Slideshow" },
                    { id: "STABLE_DIFFUSION", name: "Stable Diffusion (Beta)", requiresWebGPU: !0 },
                    { id: "VANTA", name: "Vanta Waves", startsWith: !0 },
                ],
                l = ":scope > canvas",
                s = ":scope > video";
        },
        99545: function (e, t, n) {
            var r = n(85893),
                a = n(67294),
                i = n(10511),
                o = n(46581),
                l = n(97836);
            let s = (0, a.memo)(({ baseIcon: e, icon: t, imgSize: n, isDesktop: s, isFirstImage: c, name: u, totalSubIcons: d, view: m }) => {
                let f = (0, a.useMemo)(() => i.k[[l.MB, l.EV].includes(t) || t.startsWith("blob:") || t.startsWith(l.Xo) || t.startsWith(l.Rm) ? m : "sub"], [t, m]),
                    b = (0, a.useMemo)(() => {
                        if (t === l.EV) return { zIndex: 3 };
                        if (e === l._l) {
                            let e = d - 1 > 1,
                                t = 16 === n,
                                r = c && e ? (t ? "matrix(0.4, 0.14, 0, 0.8, -0.5, 2)" : "matrix(0.4, 0.14, 0, 0.7, -4, 2)") : t ? "matrix(0.5, 0.05, 0, 0.8, 3.5, 2)" : "matrix(0.5, 0.05, 0, 0.7, 2, 1)";
                            return { objectFit: "cover", transform: `${r} translateZ(0px)`, zIndex: c ? 2 : 1 };
                        }
                    }, [e, t, n, c, d]);
                return (0, r.jsx)(o.Z, { $eager: s || t === l.MB, alt: u, src: t, style: b, ...f });
            });
            t.Z = (0, a.memo)(({ icon: e, imgSize: t, isDesktop: n, name: i, showShortcutIcon: o, subIcons: c, view: u }) => {
                let d = (0, a.useMemo)(() => (o ? c?.filter((e) => e !== l.MB) : c), [o, c]),
                    m = (0, a.useMemo)(() => d?.filter((t) => t !== e) || [], [e, d]);
                return (0, r.jsx)(r.Fragment, { children: m.map((a, o) => (0, r.jsx)(s, { baseIcon: e, icon: a, imgSize: t, isDesktop: n, isFirstImage: 0 === o, name: i, totalSubIcons: m.length, view: u }, a)) });
            });
        },
        33975: function (e, t, n) {
            var r = n(67294),
                a = n(6155),
                i = n(20063),
                o = n(18575),
                l = n(97836),
                s = n(6484);
            let c = { icon: "", pid: "", url: "" };
            t.Z = (e, t = !1, n = !1, u = !0) => {
                let [d, m] = (0, r.useState)(c),
                    f = (0, r.useRef)(!1),
                    b = (e) => {
                        m(e), (f.current = !1);
                    },
                    { fs: g, rootFs: p } = (0, i.o)();
                return (
                    (0, r.useEffect)(() => {
                        if (g && p && !f.current && u && d === c) {
                            f.current = !0;
                            let r = (0, s.RT)(e);
                            r && (!t || l.my.has(r) || (0, o.isMountedFolder)(p.mntMap[e])) ? (0, a.Z7)(g, e, r, b) : (0, a.g7)(g, p, e, t, n, b);
                        }
                    }, [g, n, d, t, u, e, p]),
                    [d, m]
                );
            };
        },
        54110: function (e, t, n) {
            let r, a;
            n.d(t, {
                Z: function () {
                    return eS;
                },
            });
            var i = n(85893),
                o = n(67294),
                l = n(5152),
                s = n.n(l),
                c = n(1864),
                u = n(10508),
                d = n(8897);
            let m = u.ZP.figure(["pointer-events:", ";figcaption{pointer-events:none;}"], ({ $renaming: e }) => (e ? "all" : void 0));
            var f = n(99545),
                b = n(43950),
                g = n(6155),
                p = n(20063),
                h = n(58437),
                v = n(37176),
                w = n(76488),
                y = n(86178),
                x = n(97836),
                A = n(6484),
                k = (e, t) => {
                    let { setForegroundId: r, updateRecentFiles: a } = (0, w.k)(),
                        { createPath: i, updateFolder: l } = (0, p.o)(),
                        { minimize: s, open: u, url: d } = (0, h.z)(),
                        m = (0, y.R)();
                    return (0, o.useCallback)(
                        async (o, f) => {
                            let { preferProcessIcon: b, singleton: g, icon: p } = v.Z[o] || {},
                                h = g ? Object.keys(m.current).find((e) => e === o || e.startsWith(`${o}${x.CC}`)) : "",
                                w = e;
                            if (e.startsWith("ipfs://")) {
                                let { getIpfsFileName: t, getIpfsResource: r } = await n.e(1746, "high").then(n.bind(n, 31746)),
                                    a = await r(e);
                                (w = (0, c.join)(x.Ll, await i(await t(e, a), x.Ll, a))), await l(x.Ll, (0, c.basename)(w));
                            }
                            h ? (d(h, w), m.current[h].minimized && s(h), r(h)) : (u(o || "OpenWith", { url: w }, g || f === x._l || b ? p : f), w && o && a(w, o, (0, A.yk)(w) ? (0, c.basename)(t, (0, c.extname)(t)) : void 0));
                        },
                        [i, s, u, t, m, r, d, l, a, e]
                    );
                };
            let E = new Set([
                ".001",
                ".7z",
                ".ace",
                ".apk",
                ".appx",
                ".arj",
                ".bz2",
                ".bzip2",
                ".cab",
                ".chm",
                ".chw",
                ".cpio",
                ".deb",
                ".dll",
                ".dmg",
                ".doc",
                ".docx",
                ".epub",
                ".esd",
                ".exe",
                ".flv",
                ".gz",
                ".gzip",
                ".hfs",
                ".hxs",
                ".img",
                ".ipa",
                ".jar",
                ".lha",
                ".lit",
                ".lzh",
                ".lzma",
                ".mbr",
                ".msi",
                ".ntfs",
                ".ods",
                ".odt",
                ".ova",
                ".pages",
                ".pkg",
                ".ppt",
                ".qcow",
                ".qcow2",
                ".r00",
                ".rar",
                ".rpm",
                ".squashfs",
                ".swf",
                ".swm",
                ".sys",
                ".tar",
                ".taz",
                ".tgz",
                ".txz",
                ".udf",
                ".vdi",
                ".vhd",
                ".vhdx",
                ".vmdk",
                ".wim",
                ".xar",
                ".xip",
                ".xls",
                ".xlsx",
                ".xpi",
                ".xz",
                ".z",
                ".zipx",
            ]);
            var S = n(18575),
                L = n(7502);
            let M = new Set([".aac", ".aiff", ".ape", ".flac", ".m4a", ".mp3", ".oga", ".ogg", ".wav", ".wma"]),
                C = [".aac", ".mp3", ".ogg", ".wav"],
                O = new Set([".avi", ".flv", ".m4v", ".mkv", ".mov", ".mp4", ".mpeg", ".mpg", ".ogv", ".webm", ".wmv"]),
                T = [".avi", ".gif", ".mkv", ".mp4", ".ogg", ".ogv", ".webm"],
                D = new Set([".bmp", ".gif", ".ico", ".jpeg", ".jpg", ".png", ".psd", ".tiff", ".xcf"]),
                $ = [".bmp", ".gif", ".jpg", ".png", ".psd", ".svg", ".tiff"];
            var R = n(6460),
                j = n(48764).Buffer;
            let { alias: F } = x.PACKAGE_DATA;
            var z = (e, t, r, a, { archiveFiles: i, deleteLocalPath: l, downloadFiles: s, extractFiles: u, newShortcut: d }, { blurEntry: m, focusEntry: f }, z, P, W, B) => {
                let { minimize: Z, open: I, url: H } = (0, h.z)(),
                    N = (0, y.R)(),
                    { setCursor: U, setForegroundId: K, setWallpaper: V, updateRecentFiles: G } = (0, w.k)(),
                    X = (0, c.basename)(r),
                    Q = z.includes(X),
                    _ = k(e, r),
                    { copyEntries: q, createPath: Y, lstat: J, mapFs: ee, moveEntries: et, readFile: en, rootFs: er, unMapFs: ea, updateFolder: ei } = (0, p.o)(),
                    { contextMenu: eo } = (0, L.H)(),
                    { onContextMenuCapture: el, ...es } = (0, o.useMemo)(
                        () =>
                            eo?.(() => {
                                let o = A.RT(e),
                                    { process: m = [] } = o in b.Z ? b.Z[o] : {},
                                    f = m.filter((e) => e !== t).filter((e) => e !== t),
                                    p = 1 === z.length,
                                    h = () => (p || !Q ? [r] : [...new Set([r, ...z.map((e) => c.join(c.dirname(r), e))])]),
                                    w = [],
                                    y = A.RT(r),
                                    k = y === x.zm,
                                    L = er?.mountList.some((e) => e === r && S.isMountedFolder(er?.mntMap[e]));
                                if (!B && !L) {
                                    let m = g.Wd(o);
                                    if (
                                        (w.push({ action: () => et(h()), label: "Cut" }, { action: () => q(h()), label: "Copy" }, x.Os),
                                            (m || k || (!y && !o)) &&
                                            w.push({
                                                action: () =>
                                                    h().forEach(async (e) => {
                                                        let t = m && !(await J(e)).isDirectory() ? m : "FileExplorer";
                                                        d(e, t);
                                                    }),
                                                label: "Create shortcut",
                                            }),
                                            w.push({ action: () => h().forEach((e) => l(e)), label: "Delete" }, { action: () => a(X), label: "Rename" }, x.Os, {
                                                action: () => {
                                                    let t = Object.keys(N.current).find((t) => t === `Properties${x.CC}${e}`);
                                                    t ? (N.current[t].minimized && Z(t), K(t)) : I("Properties", { shortcutPath: k ? r : void 0, url: k ? r : e });
                                                },
                                                label: "Properties",
                                            }),
                                            r)
                                    ) {
                                        if (r === c.join(x.Ll, x.Bb)) {
                                            if ("function" == typeof FileSystemHandle) {
                                                let e = (e, t) => {
                                                    ee(e, t)
                                                        .then((e) => {
                                                            ei("/", e).then((e) => e), I("FileExplorer", { url: c.join("/", e) });
                                                        })
                                                        .catch(() => { });
                                                },
                                                    t = "showDirectoryPicker" in window,
                                                    n = "function" == typeof navigator.storage?.getDirectory && !A.G6();
                                                w.unshift(
                                                    ...(t ? [{ action: () => e("/"), label: "Map directory" }] : []),
                                                    ...(n
                                                        ? [
                                                            {
                                                                action: async () => {
                                                                    try {
                                                                        e("/OPFS", await navigator.storage.getDirectory());
                                                                    } catch { }
                                                                },
                                                                label: "Map OPFS",
                                                            },
                                                        ]
                                                        : []),
                                                    ...(t || n ? [x.Os] : [])
                                                );
                                            }
                                        } else {
                                            w.unshift(x.Os);
                                            let a = M.has(y),
                                                o = D.has(y),
                                                l = O.has(y);
                                            if (a || o || l) {
                                                let e = a || l;
                                                w.unshift(x.Os, {
                                                    label: "Convert to",
                                                    menu: (e ? (a ? C : T) : $)
                                                        .filter((e) => e !== y)
                                                        .map((t) => {
                                                            let a = t.replace(".", "");
                                                            return {
                                                                action: async () => {
                                                                    let t = await Promise.all(h().map(async (e) => [e, await en(e)])),
                                                                        i = e ? (await n.e(7881, "high").then(n.bind(n, 67881))).transcode : (await n.e(8673, "high").then(n.bind(n, 68673))).convert,
                                                                        o = await i(t, a);
                                                                    await Promise.all(
                                                                        o.map(async ([e, t]) => {
                                                                            let n = c.basename(e),
                                                                                a = c.dirname(r);
                                                                            await ei(a, await Y(n, a, t));
                                                                        })
                                                                    );
                                                                },
                                                                label: a.toUpperCase(),
                                                            };
                                                        }),
                                                });
                                            }
                                            x.Tj.includes(y) &&
                                                w.unshift(x.Os, {
                                                    label: "Convert to",
                                                    menu: x.Tj.filter((e) => e !== y).map((e) => {
                                                        let t = e.replace(".", "");
                                                        return {
                                                            action: () => {
                                                                h().forEach(async (e) => {
                                                                    let a = `${c.dirname(e)}/${c.basename(e, c.extname(e))}.${t}`,
                                                                        { convertSheet: i } = await n.e(3751, "high").then(n.bind(n, 73751)),
                                                                        o = await i(await en(e), t),
                                                                        l = c.dirname(r);
                                                                    await ei(l, await Y(c.basename(a), l, j.from(o)));
                                                                });
                                                            },
                                                            label: t.toUpperCase(),
                                                        };
                                                    }),
                                                }),
                                                ".m3u" !== y &&
                                                x.uH.has(y) &&
                                                w.unshift(x.Os, {
                                                    action: () => {
                                                        h().forEach(async (e) => {
                                                            let t = `${c.dirname(e)}/${c.basename(e, c.extname(e))}.m3u`,
                                                                { createM3uPlaylist: a, tracksFromPlaylist: i } = await n.e(8019, "high").then(n.bind(n, 8019)),
                                                                o = a(await i((await en(e)).toString(), A.RT(e))),
                                                                l = c.dirname(r);
                                                            await ei(l, await Y(c.basename(t), l, j.from(o)));
                                                        });
                                                    },
                                                    label: "Convert to M3U",
                                                });
                                            let d = "FileExplorer" === t;
                                            if (p && !d && !A.yk(e)) {
                                                let t = c.basename(e),
                                                    n = { text: `${t} - ${F}`, title: t, url: `${window.location.origin}?url=${e}` };
                                                try {
                                                    !er?.mountList.some((e) => "/" !== e && r.startsWith(`${e}/`)) && g.CK(P) && navigator.canShare?.(n) && w.unshift({ SvgIcon: R.mB, action: () => navigator.share(n), label: "Share" });
                                                } catch { }
                                            }
                                            w.unshift({ action: () => i(h()), label: "Add to archive..." }, ...(E.has(y) || x.my.has(y) ? [{ action: () => u(r), label: "Extract Here" }, x.Os] : []), {
                                                action: () => s(h()),
                                                label: "Download",
                                            }),
                                                k ||
                                                d ||
                                                x.yV.forEach((e) => {
                                                    e === m || f.includes(e) || f.push(e);
                                                });
                                        }
                                    }
                                    w.unshift(x.Os);
                                }
                                L && w.push(x.Os, { action: () => ea(r, er?.mntMap[r].getName() !== "FileSystemAccess"), label: "Disconnect" }),
                                    x.ru.has(o) &&
                                    w.unshift({
                                        action: () => {
                                            I("Paint", { url: e }), e && G(e, "Paint");
                                        },
                                        label: "Edit",
                                    });
                                let eo = x.qy.has(y);
                                if (
                                    (x._r.has(y) && w.unshift({ action: () => U(r), label: "Set as mouse pointer" }),
                                        (eo || (x.lM.has(y) && !x._r.has(y) && ".svg" !== y)) &&
                                        w.unshift({
                                            label: "Set as background",
                                            ...(eo
                                                ? { action: () => V(r) }
                                                : {
                                                    menu: [
                                                        { action: () => V(r, "fill"), label: "Fill" },
                                                        { action: () => V(r, "fit"), label: "Fit" },
                                                        { action: () => V(r, "stretch"), label: "Stretch" },
                                                        { action: () => V(r, "tile"), label: "Tile" },
                                                        { action: () => V(r, "center"), label: "Center" },
                                                    ],
                                                }),
                                        }),
                                        f.length > 0 &&
                                        w.unshift({
                                            label: "Open with",
                                            menu: [
                                                ...f.map((e) => {
                                                    let { icon: t, title: n } = v.Z[e] || {};
                                                    return {
                                                        action: () => {
                                                            _(e, t).then((e) => e);
                                                        },
                                                        icon: t,
                                                        label: n,
                                                    };
                                                }),
                                                x.Os,
                                                { action: () => I("OpenWith", { url: e }), label: "Choose another app" },
                                            ],
                                            primary: !t,
                                        }),
                                        t)
                                ) {
                                    let { icon: n } = v.Z[t] || {};
                                    if (k && e && "/" !== e && !e.startsWith("http:") && !e.startsWith("https:") && !e.startsWith("nostr:")) {
                                        let t = "" === o || ".zip" === o;
                                        w.unshift({ action: () => I("FileExplorer", { url: c.dirname(e) }, ""), label: `Open ${t ? "folder" : "file"} location` });
                                    }
                                    W &&
                                        "FileExplorer" === t &&
                                        !x.my.has(o) &&
                                        w.unshift({
                                            action: () => {
                                                _(t, n).then((e) => e);
                                            },
                                            label: "Open in new window",
                                        }),
                                        w.unshift({
                                            action: () => {
                                                "FileExplorer" === t && W && !x.my.has(o) ? H(W, e) : _(t, n);
                                            },
                                            icon: n,
                                            label: "Open",
                                            primary: !0,
                                        });
                                }
                                return w[0] === x.Os ? w.slice(1) : w;
                            }),
                        [i, X, H, eo, q, Y, l, s, u, W, z, Q, J, ee, Z, et, d, I, _, r, t, N, en, B, er?.mntMap, er?.mountList, U, K, a, V, P, ea, ei, G, e]
                    );
                return {
                    onContextMenuCapture: (e) => {
                        Q || (m(), f(X)), el(e);
                    },
                    ...es,
                };
            },
                P = n(33975);
            let W = (e, t, n, r) => {
                let { x: a = 0, y: i = 0, width: o = 0, height: l = 0 } = n,
                    s = new DOMRect(a, i, Number(o), Number(l));
                return !(e.left - t.left >= s.right || e.top - t.top >= s.bottom || e.right - t.left <= s.left || e.bottom - t.top + r <= s.top);
            };
            var B = n(45279),
                Z = n(10511),
                I = n(24645),
                H = n(67278),
                N = n(46581),
                U = n(76833),
                K = n(78848),
                V = n(46508),
                G = n(48764).Buffer;
            let X = s()(
                () =>
                    n
                        .e(5653, "high")
                        .then(n.bind(n, 45653))
                        .then((e) => e.Down),
                { loadableGenerated: { webpack: () => [45653] } }
            ),
                Q = s()(() => n.e(1253, "high").then(n.bind(n, 11253)), { loadableGenerated: { webpack: () => [11253] } }),
                _ = (e, t, n, r, a = !1) => {
                    let i = e.replace(/-/g, x.Zf),
                        { lines: o } = (0, g.oc)(i, t, n, r);
                    if (o.length > 2) {
                        let t = a || e.includes(" ") ? o.slice(0, 2).join("") : o[0];
                        return `${t.slice(0, -3).trim()}...`;
                    }
                    return i;
                },
                q = [],
                Y = [];
            var J = ({
                fileActions: e,
                fileManagerId: t,
                fileManagerRef: n,
                focusedEntries: r,
                focusFunctions: a,
                hideShortcutIcon: l,
                isDesktop: s,
                isHeading: v,
                isLoadingFileManager: w,
                loadIconImmediately: y,
                name: E,
                path: S,
                readOnly: L,
                renaming: M,
                selectionRect: C,
                setRenaming: O,
                stats: T,
                hasNewFolderIcon: D,
                view: $,
                handleFileOpen: R,
            }) => {
                let { blurEntry: j, focusEntry: F } = a,
                    { url: J } = (0, h.z)(),
                    ee = (0, o.useRef)(null),
                    et = (0, K.O)(ee, n, s),
                    [{ comment: en, getIcon: er, icon: ea, pid: ei, subIcons: eo, url: el }, es] = (0, P.Z)(S, T.isDirectory(), D, s || et),
                    ec = k(el, S),
                    { createPath: eu, exists: ed, fs: em, mkdirRecursive: ef, pasteList: eb, stat: eg, updateFolder: ep, writeFile: eh } = (0, p.o)(),
                    [ev, ew] = (0, o.useState)(!1),
                    { formats: ey, sizes: ex } = (0, u.Fg)(),
                    eA = "list" === $,
                    ek = (0, c.basename)(S),
                    eE = (0, A.RT)(el),
                    eL = (0, o.useMemo)(() => (0, A.yk)(el), [el]),
                    eM = (0, o.useMemo)(() => x.lM.has(eE) || x.qy.has(eE) || eL, [eL, eE]),
                    eC = 1 === r.length && r[0] === ek,
                    eO = (0, o.useMemo)(() => (0, A.RT)(S), [S]),
                    eT = (0, o.useMemo)(() => eO === x.zm, [eO]),
                    eD = eT ? el : S,
                    e$ = (0, B.Z)({
                        callback: async (e, t) => {
                            if (!r.includes(ek)) {
                                let n = await eu(e, eD, t);
                                if (n) return await ep(eD, n), n;
                            }
                            return "";
                        },
                        directory: eD,
                    }),
                    eR = "FileExplorer" === ei,
                    ej = (0, o.useMemo)(() => _(E, ex.fileEntry.fontSize, ey.systemFont, ex.fileEntry[eA ? "maxListTextDisplayWidth" : "maxIconTextDisplayWidth"], !s), [ey.systemFont, s, eA, E, ex.fileEntry]),
                    eF = (0, o.useRef)(null),
                    ez = (0, o.useRef)(!1),
                    eP = (0, o.useRef)(!1),
                    eW = (0, o.useRef)(),
                    eB = (0, o.useCallback)(async () => {
                        if (T.isDirectory()) return "";
                        if (eT) {
                            if (en) return en;
                            if (el) {
                                if (el.startsWith("http:") || el.startsWith("https:")) return decodeURIComponent(el);
                                let e = (0, c.dirname)(el);
                                return `Location: ${(0, c.basename)(el, (0, c.extname)(el))}${e && "." !== e ? ` (${(0, c.dirname)(el)})` : ""}`;
                            }
                            return "";
                        }
                        let e = b.Z[eO]?.type || `${eO.toUpperCase().replace(".", "")} File`,
                            t = T.size === V.T ? await eg(S) : T,
                            { size: n } = t,
                            r = (0, g.GA)(S, t),
                            a = (0, A.UR)(n),
                            i = `Type: ${e}${"-1 bytes" === a
                                ? ""
                                : `
Size: ${a}`
                                }`,
                            o = new Date(r).toISOString().slice(0, 10),
                            l = new Intl.DateTimeFormat(x.ZW, ey.dateModified).format(r),
                            s = `${o} ${l}`;
                        return `${i}
Date modified: ${s}`;
                    }, [en, eO, ey.dateModified, eT, S, eg, T, el]),
                    [eZ, eI] = (0, o.useState)(),
                    eH = (0, o.useCallback)(() => {
                        eR && t && !window.globalKeyStates?.ctrlKey && !x.my.has(eE) ? (J(t, el), j()) : eR && eA ? ew((e) => !e) : ec(ei, eM ? void 0 : ea).then((e) => e), T.isDirectory() || R(S);
                    }, [j, J, t, ea, eM, eA, ec, eR, ei, el, eE, R, S, T]);
                return (
                    (0, o.useEffect)(() => {
                        w ||
                            !et ||
                            ez.current ||
                            (async () => {
                                if (ea.startsWith("blob:") || ea.startsWith("data:")) {
                                    if (ea.startsWith("data:image/jpeg;base64,")) return;
                                    ez.current = !0;
                                    let e = (0, c.join)(x.Xo, `${S}${x.Qy}`);
                                    if (".ico" !== eE && !el.startsWith(x.OT) && !el.startsWith(x.P7) && !(await ed(e)) && eF.current instanceof HTMLImageElement) {
                                        let t = async () => {
                                            if (eF.current instanceof HTMLImageElement) {
                                                let n = () => (Y.shift(), Y[0]?.()),
                                                    r = "";
                                                if (eF.current.currentSrc.startsWith("data:image/gif;base64,")) r = eF.current.currentSrc;
                                                else {
                                                    let e, n, a;
                                                    let { clientHeight: i, clientWidth: o } = eF.current,
                                                        { naturalHeight: l, naturalWidth: s } = eF.current,
                                                        c = s / l;
                                                    c !== o / i && (s > l ? (e = i / c) : (n = o * c));
                                                    let u = await (0, A.mZ)();
                                                    try {
                                                        a = await u?.toCanvas(eF.current, { height: e, skipAutoScale: !0, style: { objectPosition: e ? "top" : n ? "left" : void 0 }, width: n });
                                                    } catch { }
                                                    a && (0, A.H5)(a) ? (r = a.toDataURL("image/png")) : setTimeout(t, x.jx.WINDOW);
                                                }
                                                r &&
                                                    Y.push(async () => {
                                                        let t = (0, c.dirname)(e);
                                                        await ef(t);
                                                        let a = G.from(r.replace(/data:.*;base64,/, ""), "base64");
                                                        return await eh(e, a, !0), es((e) => ({ ...e, icon: (0, A.YS)(a) })), await ep(t, (0, c.basename)(e)), n();
                                                    }),
                                                    1 === Y.length && (await Y[0]());
                                            }
                                        };
                                        eF.current.complete ? await t() : eF.current.addEventListener("load", t, x.K7);
                                    }
                                } else if (!eT || "function" == typeof er || eL) {
                                    if (ez.current || !em) return;
                                    let e = await (0, g.kv)(em, (0, c.join)(x.Xo, `${S}${x.Qy}`));
                                    e
                                        ? ez.current || ((ez.current = !0), es((t) => ({ ...t, icon: e })))
                                        : !eP.current && ee.current && "function" == typeof er && ((eW.current = new AbortController()), await er(eW.current.signal), (eP.current = !eW.current.signal.aborted));
                                }
                            })().then((e) => e),
                            !et && eW.current && eW.current.abort();
                    }, [ed, em, er, ea, w, eT, et, eL, ef, S, es, ep, el, eE, eh]),
                    (0, o.useEffect)(
                        () => () => {
                            try {
                                eW.current?.abort();
                            } catch { }
                        },
                        []
                    ),
                    (0, o.useLayoutEffect)(() => {
                        if (ee.current && n.current) {
                            let e = r.includes(ek),
                                t = q.includes(ek),
                                a = e || t;
                            if ((e && t && q.splice(q.indexOf(ek), 1), C)) {
                                let e = W(ee.current.getBoundingClientRect(), n.current.getBoundingClientRect(), C, n.current.scrollTop);
                                e && !a ? (q.push(ek), F(ek), ee.current.focus(x.eS)) : !e && a && j(ek);
                            } else a && 1 === r.length && ee.current !== document.activeElement && !ee.current.contains(document.activeElement) && ee.current.focus(x.eS);
                        }
                    }, [j, n, ek, F, r, C]),
                    (0, i.jsxs)(i.Fragment, {
                        children: [
                            (0, i.jsx)(H.Z, {
                                ref: ee,
                                "aria-label": E,
                                onMouseOver: () => eB().then(eI),
                                title: eZ,
                                ...(eA && { ...x.Cz, as: d.m.button }),
                                ...(0, I.Z)(eH, eA),
                                ...(eR && e$),
                                ...z(el, ei, S, O, e, a, r, T, t, L),
                                children: (0, i.jsxs)(m, {
                                    ref: (0, o.useCallback)(
                                        (e) => {
                                            eA && (0, A.UP)() && (0, U.G)(e);
                                        },
                                        [eA]
                                    ),
                                    $renaming: M,
                                    children: [
                                        (0, i.jsx)(N.Z, { ref: eF, $eager: y, $moving: "move" === eb[S], alt: E, src: ea, ...Z.k[$] }),
                                        (0, i.jsx)(f.Z, { icon: ea, isDesktop: s, name: E, showShortcutIcon: !!(l || T.systemShortcut), subIcons: eo, view: $ }),
                                        M
                                            ? (0, i.jsx)(Q, {
                                                isDesktop: s,
                                                name: E,
                                                path: S,
                                                renameFile: (t, n) => {
                                                    e.renameFile(t, n), O("");
                                                },
                                                setRenaming: O,
                                            })
                                            : (0, i.jsx)("figcaption", { ...(v && { "aria-level": 1, role: "heading" }), children: eC && E.length !== ej.length ? E : ej }),
                                        eA && eR && (0, i.jsx)(X, { flip: ev }),
                                    ],
                                }),
                            }),
                            ev && (0, i.jsx)(eS, { url: el, view: "list", hideFolders: !0, hideLoading: !0, hideShortcutIcons: !0, loadIconsImmediately: !0, readOnly: !0, skipFsWatcher: !0, skipSorting: !0 }),
                        ],
                    })
                );
            };
            let ee = (0, u.vJ)(["body{pointer-events:none;}"]),
                et = u.ZP.span(
                    ["background-color:", ";border:", ";position:absolute;z-index:2;"],
                    ({ theme: e }) => e.colors.selectionHighlightBackground,
                    ({ theme: e }) => `1px solid ${e.colors.selectionHighlight}`
                );
            var en = (e) => (0, i.jsxs)(i.Fragment, { children: [(0, i.jsx)(ee, {}), (0, i.jsx)(et, { ...e })] });
            let er = x.i2 / 60;
            var ea = (e, t, { blurEntry: n }) => {
                let [r, a] = (0, o.useState)(() => Object.create(null)),
                    [i, l] = (0, o.useState)(() => Object.create(null)),
                    { x: s, y: c } = r,
                    { height: u, width: d } = i,
                    m = (0, o.useRef)(),
                    { menu: f, setMenu: b } = (0, L.H)(),
                    g = Object.keys(f).length > 0,
                    p = "number" == typeof s && "number" == typeof c,
                    h = () => {
                        l(Object.create(null)), a(Object.create(null));
                    },
                    v = !g && "number" == typeof d && "number" == typeof u && p,
                    w = v
                        ? {
                            height: `${Math.abs(Number(u))}px`,
                            transform: `translate(
            ${Number(s) + (0 > Number(d) ? Number(d) : 0)}px,
            ${Number(c) + (0 > Number(u) ? Number(u) : 0)}px)`,
                            width: `${Math.abs(Number(d))}px`,
                        }
                        : {};
                return {
                    isSelecting: v,
                    selectionEvents: {
                        onMouseDown: ({ clientX: r, clientY: i, target: o }) => {
                            if (o === e.current) {
                                let { scrollTop: o } = e.current,
                                    { x: s = 0, y: c = 0 } = e.current.getBoundingClientRect();
                                l(Object.create(null)), a({ x: r - s, y: i - c + o }), f && Object.keys(f).length > 0 && b(Object.create(null)), t.length > 0 && n();
                            }
                        },
                        ...(p
                            ? {
                                onMouseLeave: h,
                                onMouseMove: ({ clientX: t, clientY: n }) => {
                                    let { scrollTop: r = 0 } = e.current || {},
                                        { x: a = 0, y: i = 0 } = e.current?.getBoundingClientRect() || {};
                                    m.current ||
                                        (l({ height: n - i - (c || 0) + r, width: t - a - (s || 0) }),
                                            (m.current = window.setTimeout(() => {
                                                m.current = void 0;
                                            }, er)));
                                },
                                onMouseUp: h,
                            }
                            : {}),
                    },
                    selectionRect: v ? { ...r, ...i } : void 0,
                    selectionStyling: w,
                };
            },
                ei = (e, { focusEntry: t }, r, a, i) => {
                    let [l, s] = (0, o.useState)(-1),
                        { exists: u } = (0, p.o)(),
                        { iconPositions: d, sortOrders: m, setIconPositions: f, setSortOrder: b } = (0, w.k)(),
                        h = (0, o.useRef)(),
                        v = (0, o.useRef)(!1),
                        y = (0, o.useRef)({ x: 0, y: 0 }),
                        x = (0, o.useRef)(Object.create(null)),
                        k = ({ clientX: e, clientY: t }) => {
                            x.current = { ...x.current, x: e, y: t };
                        },
                        E = r.current?.parentElement?.tagName === "MAIN",
                        S = (t) => (n) => {
                            (0, A.nK)(n),
                                i && e.length > 0
                                    ? ((0, A.vi)(t, r.current, d, m, x.current, e, f, u), r.current?.removeEventListener("dragover", k))
                                    : -1 !== l &&
                                    b(t, (t) => {
                                        let n = t.filter((t) => !e.includes(t));
                                        return n.splice(l, 0, ...e), n;
                                    });
                        },
                        L = (t) => ({ target: n }) => {
                            if (!i && n instanceof HTMLLIElement) {
                                let { children: r = [] } = n.parentElement || {};
                                s(e.includes(t) ? -1 : [...r].indexOf(n));
                            }
                        },
                        M = (n, a, o) => (l) => {
                            if (o) {
                                (0, A.nK)(l);
                                return;
                            }
                            t(a);
                            let s = e.length <= 1;
                            if (
                                (l.nativeEvent.dataTransfer?.setData("application/json", JSON.stringify(s ? [c.join(n, a)] : e.map((e) => c.join(n, e)))),
                                    s && l.nativeEvent.dataTransfer?.setData("DownloadURL", `${g.bh(a) || "application/octet-stream"}:${a}:${window.location.href}${c.join(n, a)}`),
                                    !s && h.current)
                            ) {
                                if (!v.current) {
                                    v.current = !0;
                                    let e = y.current.x || y.current.y;
                                    y.current = { x: e ? l.nativeEvent.clientX - y.current.x : l.nativeEvent.offsetX, y: e ? l.nativeEvent.clientY - y.current.y : l.nativeEvent.offsetY + 5 };
                                }
                                l.nativeEvent.dataTransfer?.setDragImage(h.current, E ? y.current.x : l.nativeEvent.offsetX, E ? y.current.y : l.nativeEvent.offsetY);
                            }
                            Object.assign(l.dataTransfer, { effectAllowed: "move" }),
                                i && ((x.current = e.length > 1 ? { offsetX: l.nativeEvent.offsetX, offsetY: l.nativeEvent.offsetY } : Object.create(null)), r.current?.addEventListener("dragover", k, { passive: !0 }));
                        },
                        C = (0, o.useCallback)(async () => {
                            if (r.current) {
                                let e = [...r.current.querySelectorAll(".focus-within")];
                                if (e.length > 1) {
                                    h.current ? (h.current.src = "") : (h.current = new Image());
                                    let t = await (0, A.mZ)();
                                    if (!t) return;
                                    try {
                                        let { UNKNOWN_ICON: a } = await n.e(1786, "high").then(n.bind(n, 91786)),
                                            i = e.every(({ style: e }) => e?.gridRowStart && e?.gridColumnStart),
                                            o = await t?.toCanvas(r.current, { filter: (t) => !(t instanceof HTMLSourceElement) && e.some((e) => e.contains(t)), imagePlaceholder: a, skipAutoScale: !0 }),
                                            l = i ? (0, A.u2)(o) : o;
                                        (h.current.src = l.toDataURL()), (y.current = { x: o.width - l.width, y: o.height - l.height });
                                    } catch { }
                                }
                            }
                        }, [r]);
                    return (
                        (0, o.useEffect)(() => {
                            !a && e.length > 1 ? C().then((e) => e) : 0 === e.length && (v.current = !1);
                        }, [e, a, C]),
                        (e, t, n) => ({ draggable: !0, onDragEnd: S(e), onDragOver: L(t), onDragStart: M(e, t, n), style: E ? d[(0, c.join)(e, t)] : void 0 })
                    );
                },
                eo = n(59746),
                el = n(23736),
                es = n(9054),
                ec = (e, t, n, r, { blurEntry: a, focusEntry: i }, { newPath: l, pasteToFolder: s }, u, d, m, f) => {
                    let { copyEntries: b, deletePath: g, moveEntries: v } = (0, p.o)(),
                        { url: y } = (0, h.z)(),
                        { openTransferDialog: k } = (0, eo.Z)(),
                        { foregroundId: E } = (0, w.k)();
                    return (
                        (0, es.l$)({ logToConsole: !0 }),
                        (0, o.useEffect)(() => {
                            let e = (e) => {
                                e.clipboardData?.files?.length && ((!E && t === x.Ll) || E === m) && (e.stopImmediatePropagation?.(), (0, el.W)(e.clipboardData.files, t, l).then(k));
                            };
                            return document.addEventListener("paste", e), () => document.removeEventListener("paste", e);
                        }, [E, m, l, k, t]),
                        (0, o.useCallback)(
                            (o) => (l) => {
                                if ("list" === f) return;
                                let { ctrlKey: p, key: h, target: w, shiftKey: k } = l;
                                if (!k) {
                                    if (p)
                                        switch (h.toLowerCase()) {
                                            case "a":
                                                if (((0, A.nK)(l), w instanceof HTMLOListElement)) {
                                                    let [e] = w.querySelectorAll("button");
                                                    e?.focus(x.eS);
                                                }
                                                Object.keys(e).forEach((e) => i(e));
                                                break;
                                            case "c":
                                                (0, A.nK)(l), b(n.map((e) => (0, c.join)(t, e)));
                                                break;
                                            case "x":
                                                (0, A.nK)(l), v(n.map((e) => (0, c.join)(t, e)));
                                                break;
                                            case "v":
                                                l.stopPropagation(), s();
                                        }
                                    else
                                        switch (h) {
                                            case "F2":
                                                o && ((0, A.nK)(l), r(o));
                                                break;
                                            case "F5":
                                                m && ((0, A.nK)(l), u());
                                                break;
                                            case "Delete":
                                                n.length > 0 &&
                                                    ((0, A.nK)(l),
                                                        n.forEach(async (e) => {
                                                            let n = (0, c.join)(t, e);
                                                            (await g(n)) && u(void 0, n);
                                                        }),
                                                        a());
                                                break;
                                            case "Backspace":
                                                m && ((0, A.nK)(l), y(m, (0, c.dirname)(t)));
                                                break;
                                            case "Enter":
                                                w instanceof HTMLButtonElement && ((0, A.nK)(l), (0, A.TF)(w, 2));
                                                break;
                                            default:
                                                if (h.startsWith("Arrow")) {
                                                    if (((0, A.nK)(l), !(w instanceof HTMLElement))) return;
                                                    let e = w;
                                                    if (!(w instanceof HTMLButtonElement) && !(e = w.querySelector("button"))) return;
                                                    let { x: t, y: n, height: r, width: a } = e.getBoundingClientRect(),
                                                        i = "ArrowUp" === h || "ArrowDown" === h ? document.elementFromPoint(t, n + ("ArrowUp" === h ? -r : 2 * r)) : document.elementFromPoint(t + ("ArrowLeft" === h ? -a : 2 * a), n);
                                                    if (i instanceof HTMLOListElement) {
                                                        let t = e.closest("li");
                                                        if (t instanceof HTMLLIElement) {
                                                            let e = [...i.children],
                                                                n = e.indexOf(t);
                                                            ("ArrowUp" === h || "ArrowDown" === h) && (i = e["ArrowUp" === h ? (0 === n ? e.length - 1 : n - 1) : n === e.length - 1 ? 0 : n + 1].querySelector("button"));
                                                        }
                                                    }
                                                    let o = i?.closest("button"),
                                                        s = o;
                                                    (o instanceof HTMLButtonElement && d.current?.contains(o)) || (s = e), s?.dispatchEvent(new MouseEvent("mousedown", { bubbles: !0 }));
                                                } else if (/^[\da-z]$/i.test(h)) {
                                                    (0, A.nK)(l);
                                                    let t = Object.keys(e),
                                                        r = t.indexOf(n[n.length - 1]),
                                                        o = h.toLowerCase(),
                                                        s = h.toUpperCase(),
                                                        c = [...t.slice(r), ...t.slice(0, r)].find((e) => !n.includes(e) && (e.startsWith(o) || e.startsWith(s)));
                                                    c && (a(), i(c), d.current?.querySelector(`button[aria-label='${c}']`)?.scrollIntoView());
                                                }
                                        }
                                }
                            },
                            [a, y, b, g, d, e, i, n, m, v, s, r, u, t, f]
                        )
                    );
                },
                eu = (e) => {
                    let [t, n] = (0, o.useState)([]),
                        r = (0, o.useCallback)((e) => n(e ? (t) => t.filter((t) => t !== e) : []), []),
                        a = (0, o.useCallback)((e) => n((t) => (t.includes(e) ? t : [...t, e])), []),
                        i = (0, o.useRef)(!1),
                        l = (0, o.useCallback)(
                            (t) => {
                                let { relatedTarget: n, target: a } = t,
                                    o = e.current === n;
                                o && i.current ? ((0, A.nK)(t), a?.focus(x.eS)) : ((o || e.current?.contains(n)) && n instanceof HTMLElement) || r();
                            },
                            [r, e]
                        ),
                        s = (0, o.useCallback)(() => {
                            (i.current = !0),
                                window.requestAnimationFrame(() => {
                                    i.current = !1;
                                });
                        }, []),
                        c = (0, o.useRef)({ x: 0, y: 0 });
                    return {
                        blurEntry: r,
                        focusEntry: a,
                        focusableEntry: (e) => {
                            let n = t.includes(e),
                                i = 1 === t.length && t[0] === e;
                            return {
                                className: (0, A.Wy)({ "focus-within": n, "only-focused": i }),
                                onBlurCapture: l,
                                onFocusCapture: s,
                                onMouseDown: ({ ctrlKey: t, pageX: i, pageY: o }) => {
                                    (c.current = { x: i, y: o }), t ? (n ? r(e) : a(e)) : n || (r(), a(e));
                                },
                                onMouseUp: ({ ctrlKey: t, pageX: n, pageY: o, button: l }) => {
                                    let { x: s, y: u } = c.current;
                                    t || i || 0 !== l || s !== n || u !== o || (r(), a(e)), (c.current = { x: 0, y: 0 });
                                },
                            };
                        },
                        focusedEntries: t,
                    };
                },
                ed = n(89670),
                em = n(10393),
                ef = n(48611),
                eb = n(48764).Buffer;
            let eg = () => window.WebampGlobal?.store.dispatch({ enabled: !1, type: "SET_MILKDROP_DESKTOP" }),
                ep = (e, t) => ([n, r]) => [e, n === e ? !r : t],
                eh = "video/webm",
                ev = "video/mp4",
                ew = 2;
            var ey = (e, { addToFolder: t, newPath: i, pasteToFolder: l, sortByOrder: [[s, u], d] }, m, f) => {
                let { contextMenu: b } = (0, L.H)(),
                    { exists: v, mapFs: k, pasteList: E = {}, readFile: M, rootFs: C, writeFile: O, updateFolder: T } = (0, p.o)(),
                    { iconPositions: D, setForegroundId: $, setWallpaper: R, setIconPositions: j, sortOrders: F, updateRecentFiles: z, wallpaperImage: P } = (0, w.k)(),
                    W = (0, o.useCallback)(
                        (e) => {
                            if ("VANTA" === e) {
                                let e = 0 == (ew -= 1);
                                R(`VANTA${e ? " WIREFRAME" : ""}`), e && (ew = 2);
                            } else (ew = 2), R(e);
                        },
                        [R]
                    ),
                    { minimize: B, open: Z } = (0, h.z)(),
                    I = (0, o.useCallback)(
                        (t, n) => {
                            j((t) => Object.fromEntries(Object.entries(t).filter(([t]) => (0, c.dirname)(t) !== e))), d("" === t ? ([e]) => [e, n] : ep(t, n));
                        },
                        [j, d, e]
                    ),
                    H = (0, o.useMemo)(() => m && "function" == typeof navigator?.mediaDevices?.getDisplayMedia && (window?.MediaRecorder?.isTypeSupported(eh) || window?.MediaRecorder?.isTypeSupported(ev)), [m]),
                    N = (0, o.useCallback)(async () => {
                        if (a && r) {
                            let { active: e } = r;
                            try {
                                a.requestData(), r.getTracks().forEach((e) => e.stop());
                            } catch { }
                            if (((a = void 0), (r = void 0), e)) return;
                        }
                        let e = (0, A.vU)() || (0, A.G6)(),
                            t = { video: { frameRate: 30 }, ...(!e && { preferCurrentTab: !0, selfBrowserSurface: "include", surfaceSwitching: "include", systemAudio: "include" }) },
                            [i] = (r = await navigator.mediaDevices.getDisplayMedia(t)).getVideoTracks(),
                            { height: o, width: l } = i.getSettings(),
                            s = MediaRecorder.isTypeSupported(eh),
                            u = `Screen Capture ${(0, A.gE)()}.${s ? "webm" : "mp4"}`;
                        a = new MediaRecorder(r, { bitsPerSecond: o && l ? o * l * 30 : void 0, mimeType: s ? eh : ev });
                        let d = (0, c.join)(x.Ll, u),
                            m = Date.now(),
                            f = !1;
                        a.start(),
                            a.addEventListener("dataavailable", async (t) => {
                                let { data: r } = t;
                                if (r?.size) {
                                    let t = eb.from(await r.arrayBuffer());
                                    if ((await O(d, f ? eb.concat([await M(d), t]) : t, f), !s || e || (a && "inactive" !== a.state))) T(x.Ll, u);
                                    else {
                                        let { default: e } = await n.e(6027, "high").then(n.t.bind(n, 86027, 23));
                                        e((0, A.V4)(await M(d)), Date.now() - m, async (e) => {
                                            await O(d, eb.from(await e.arrayBuffer()), !0), T(x.Ll, u);
                                        });
                                    }
                                    f = !0;
                                }
                            });
                    }, [M, T, O]),
                    U = (0, ef.Z)(),
                    K = (0, y.R)(),
                    V = (0, o.useCallback)(
                        (e, t) => {
                            if (t && m) {
                                let { clientX: n, clientY: r } = "TouchEvent" in window && t.nativeEvent instanceof TouchEvent ? t.nativeEvent.touches[0] : t.nativeEvent;
                                (0, A.vi)(x.Ll, t.target, D, F, { x: n, y: r }, e, j, v);
                            }
                        },
                        [v, D, m, j, F]
                    ),
                    G = (0, o.useCallback)(async (e, t, n) => V([await i(e, t, "rename")], n), [i, V]);
                return (0, o.useMemo)(
                    () =>
                        b?.((n) => {
                            let { offsetX: a, offsetY: i, target: o } = n.nativeEvent;
                            if (!m && !f && a > o.clientWidth)
                                return [
                                    {
                                        action: () => {
                                            let e = 0;
                                            if (i > o.clientHeight - 17) e = o.scrollHeight;
                                            else if (i > 17) {
                                                let t = 2 * 17;
                                                e = Math.round((o.scrollHeight * (i - t)) / (o.clientHeight - t));
                                            }
                                            o.scrollTo({ behavior: "instant", top: e });
                                        },
                                        label: "Scroll Here",
                                    },
                                    x.Os,
                                    {
                                        action: () => {
                                            o.scrollTo({ behavior: "instant", top: 0 });
                                        },
                                        label: "Top",
                                    },
                                    {
                                        action: () => {
                                            o.scrollTo({ behavior: "instant", top: o.scrollHeight });
                                        },
                                        label: "Bottom",
                                    },
                                    x.Os,
                                    {
                                        action: () => {
                                            o.scrollBy({ behavior: "instant", top: -o.clientHeight });
                                        },
                                        label: "Page Up",
                                    },
                                    {
                                        action: () => {
                                            o.scrollBy({ behavior: "instant", top: o.clientHeight });
                                        },
                                        label: "Page Down",
                                    },
                                    x.Os,
                                    {
                                        action: () => {
                                            o.scrollBy({ behavior: "instant", top: -44 });
                                        },
                                        label: "Scroll Up",
                                    },
                                    {
                                        action: () => {
                                            o.scrollBy({ behavior: "instant", top: 44 });
                                        },
                                        label: "Scroll Down",
                                    },
                                ];
                            let d = [
                                { action: () => t().then((e) => V(e, n)), label: "Add file(s)" },
                                ...(A.df()
                                    ? [
                                        {
                                            action: () =>
                                                k(e)
                                                    .then((t) => {
                                                        V([t], n), T(e, t), Z("FileExplorer", { url: c.join(e, t) });
                                                    })
                                                    .catch(() => { }),
                                            label: "Map directory",
                                        },
                                    ]
                                    : []),
                            ],
                                b = document.querySelector("main .webamp-desktop canvas") instanceof HTMLCanvasElement,
                                p = S.getMountUrl(e, C?.mntMap || {}),
                                h = x.my.has(A.RT(e)) || (p && !S.isMountedFolder(C?.mntMap[p]));
                            return [
                                {
                                    label: "Sort by",
                                    menu: [
                                        { action: () => I("name", !0), label: "Name", toggle: "name" === s },
                                        { action: () => I("size", !1), label: "Size", toggle: "size" === s },
                                        { action: () => I("type", !0), label: "Item type", toggle: "type" === s },
                                        { action: () => I("date", !1), label: "Date modified", toggle: "date" === s },
                                        x.Os,
                                        { action: () => I("", !0), label: "Ascending", toggle: u },
                                        { action: () => I("", !1), label: "Descending", toggle: !u },
                                    ],
                                },
                                { action: () => T(e), label: "Refresh" },
                                ...(m
                                    ? [
                                        x.Os,
                                        {
                                            label: "Background",
                                            menu: em.ov
                                                .filter(({ requiresWebGPU: e }) => !e || U)
                                                .reduce(
                                                    (e, t) => [
                                                        ...e,
                                                        {
                                                            action: () => {
                                                                b && eg?.(), t.id && W(t.id);
                                                            },
                                                            label: t.name || t.id,
                                                            toggle: t.startsWith ? P.startsWith(t.id) : P === t.id,
                                                        },
                                                    ],
                                                    b ? [{ action: eg, checked: !0, label: "Music Visualization" }, x.Os] : []
                                                ),
                                        },
                                        ...(H ? [{ action: N, label: r?.active ? "Stop screen capture" : "Capture screen" }] : []),
                                    ]
                                    : []),
                                ...(h
                                    ? []
                                    : [
                                        x.Os,
                                        ...d,
                                        { action: () => Z("Terminal", { url: e }), label: "Open Terminal here" },
                                        x.Os,
                                        { action: () => l(n), disabled: 0 === Object.keys(E).length, label: "Paste" },
                                        x.Os,
                                        {
                                            label: "New",
                                            menu: [
                                                { action: () => G("New folder", void 0, n), icon: x.XN, label: "Folder" },
                                                x.Os,
                                                { action: () => G("New Rich Text Document.whtml", eb.from(""), n), icon: g.sK(".whtml"), label: "Rich Text Document" },
                                                { action: () => G("New Text Document.txt", eb.from(""), n), icon: g.sK(".txt"), label: "Text Document" },
                                            ],
                                        },
                                        ...(m
                                            ? []
                                            : [
                                                x.Os,
                                                {
                                                    action: () => {
                                                        let t = Object.keys(K.current).find((t) => t === `Properties${x.CC}${e}`);
                                                        t ? (K.current[t].minimized && B(t), $(t)) : Z("Properties", { url: e });
                                                    },
                                                    label: "Properties",
                                                },
                                            ]),
                                    ]),
                                ...(m
                                    ? [
                                        x.Os,
                                        {
                                            action: async () => {
                                                if (!(await v(x.AV))) {
                                                    let e = await fetch(document.location.href),
                                                        t = eb.from(await e.arrayBuffer());
                                                    await O(x.AV, t), T(c.dirname(x.AV), c.basename(x.AV));
                                                }
                                                Z("MonacoEditor", { url: x.AV }), x.AV && z(x.AV, "MonacoEditor");
                                            },
                                            label: "View page source",
                                        },
                                        { action: () => Z("DevTools", { url: "dom" }), label: "Inspect" },
                                    ]
                                    : []),
                            ];
                        }),
                    [t, H, N, b, v, U, u, m, f, k, B, G, Z, E, l, K, C?.mntMap, $, W, s, V, T, z, I, e, P, O]
                );
            };
            let ex = s()(() => n.e(7614, "high").then(n.bind(n, 57614)), { loadableGenerated: { webpack: () => [57614] } }),
                eA = s()(() => n.e(1355, "high").then(n.bind(n, 71355)), { loadableGenerated: { webpack: () => [71355] } }),
                ek = s()(() => n.e(3333, "high").then(n.bind(n, 33333)), { loadableGenerated: { webpack: () => [33333] } }),
                eE = (e) => { };
            var eS = (0, o.memo)(
                ({
                    allowMovingDraggableEntries: e,
                    hideFolders: t,
                    hideLoading: r,
                    hideScrolling: a,
                    hideShortcutIcons: l,
                    id: s,
                    isDesktop: u,
                    isStartMenu: d,
                    loadIconsImmediately: m,
                    readOnly: f,
                    showStatusBar: b,
                    skipFsWatcher: g,
                    skipSorting: h,
                    url: v,
                    view: w,
                    customIcons: y = [],
                    onFileOpen: k = eE,
                    onFileDoubleClick: E = eE,
                    onFileSingleClick: S = eE,
                }) => {
                    let [L, M] = (0, o.useState)(v),
                        [C, O] = (0, o.useState)(""),
                        [T, D] = (0, o.useState)(!1);
                    (0, o.useEffect)(() => {
                        v !== L && M(v);
                    }, [v, L]),
                        (0, es.MV)(L, { logToConsole: !0 }),
                        (0, es.l$)({ logToConsole: !0 });
                    let $ = (0, o.useRef)(null),
                        { focusedEntries: R, focusableEntry: j, ...F } = eu($),
                        { fileActions: z, files: P, folderActions: W, isLoading: I, updateFiles: H } = (0, ed.Z)(v, O, F, { hideFolders: t, hideLoading: r, skipFsWatcher: g, skipSorting: h }),
                        { lstat: N, mountFs: U, rootFs: K } = (0, p.o)(),
                        { StyledFileEntry: V, StyledFileManager: G } = Z.c[w],
                        { isSelecting: X, selectionRect: Q, selectionStyling: _, selectionEvents: q } = ea($, R, F),
                        Y = ei(R, F, $, X, e),
                        ee = (0, B.Z)({ callback: W.newPath, directory: v, updatePositions: e }),
                        et = ey(v, W, u, d),
                        er = (!r && I) || v !== L,
                        eo = ec(P, v, R, O, F, W, H, $, s, w),
                        [el, em] = (0, o.useState)("prompt"),
                        ef = (0, o.useRef)(!1),
                        eb = (0, o.useMemo)(() => ("" === C ? eo() : void 0), [eo, C]),
                        eg = (0, o.useMemo)(() => Object.keys(P), [P]),
                        ep = !u && !d && !er && "icon" === w && 0 === eg.length;
                    return (
                        (0, o.useEffect)(() => {
                            ef.current ||
                                "granted" === el ||
                                K?.mntMap[L]?.getName() !== "FileSystemAccess" ||
                                ((ef.current = !0),
                                    Promise.resolve()
                                        .then(n.bind(n, 18575))
                                        .then(({ requestPermission: e }) =>
                                            e(L)
                                                .then((e) => {
                                                    let t = "granted" === e;
                                                    (!e || t) && (em("granted"), t && H());
                                                })
                                                .catch((e) => {
                                                    e?.message === "Permission already granted" && em("granted");
                                                })
                                                .finally(() => {
                                                    ef.current = !1;
                                                })
                                        ));
                        }, [L, el, K?.mntMap, H]),
                        (0, o.useEffect)(() => {
                            !T &&
                                x.my.has((0, A.RT)(v)) &&
                                (async () => {
                                    (await N(v)).isDirectory() ||
                                        D(
                                            (e) => (
                                                e ||
                                                U(v)
                                                    .then(() => setTimeout(H, 100))
                                                    .catch(() => { }),
                                                !0
                                            )
                                        );
                                })().then(() => []);
                        }, [N, U, T, H, v]),
                        (0, o.useEffect)(() => {
                            v !== L && (W.resetFiles(), M(v), em("denied"));
                        }, [v, W]),
                        (0, o.useEffect)(() => {
                            er || u || d || $.current?.focus(x.eS);
                        }, [u, d, er]),
                        (0, i.jsxs)(i.Fragment, {
                            children: [
                                er
                                    ? (0, i.jsx)(ek, {})
                                    : (0, i.jsxs)(i.Fragment, {
                                        children: [
                                            ep && (0, i.jsx)(eA, {}),
                                            (0, i.jsxs)(G, {
                                                ref: $,
                                                $isEmptyFolder: ep,
                                                $scrollable: !a,
                                                onKeyDown: eb,
                                                ...(f ? { onContextMenu: A.nK } : { $selecting: X, ...ee, ...et, ...q }),
                                                ...x.LL,
                                                children: [
                                                    X && (0, i.jsx)(en, { style: _ }),
                                                    y.map((e, t) =>
                                                        (0, i.jsx)(
                                                            "li",
                                                            {
                                                                draggable: "true",
                                                                style: e.style,
                                                                "data-file": e["data-file"],
                                                                className: "sc-iGgVNO iPgsct",
                                                                onClick: () => {
                                                                    S(e["data-file"]);
                                                                },
                                                                onDoubleClick: () => {
                                                                    E(e["data-file"]);
                                                                },
                                                                children: (0, i.jsx)("button", {
                                                                    "aria-label": e.iconProps["aria-label"],
                                                                    type: "button",
                                                                    className: "sc-aYaIB hErKd",
                                                                    title: e.iconProps.title,
                                                                    children: (0, i.jsxs)("figure", {
                                                                        className: "sc-dcJtft lflafl",
                                                                        children: [
                                                                            (0, i.jsxs)("picture", {
                                                                                children: [
                                                                                    (0, i.jsx)("source", { media: "(min-resolution: 2.01x), (-webkit-min-device-pixel-ratio: 2.01)", srcSet: e.iconProps.srcSet, type: "image/webp" }),
                                                                                    (0, i.jsx)("img", {
                                                                                        alt: e.iconProps.alt,
                                                                                        decoding: "async",
                                                                                        draggable: "false",
                                                                                        height: "48",
                                                                                        loading: "eager",
                                                                                        width: "48",
                                                                                        className: "sc-gEvDqW jWxKGF",
                                                                                        src: e.iconProps.src,
                                                                                    }),
                                                                                ],
                                                                            }),
                                                                            (0, i.jsx)("figcaption", { "aria-level": 1, role: "heading", children: e.iconProps.alt }),
                                                                        ],
                                                                    }),
                                                                }),
                                                            },
                                                            t
                                                        )
                                                    ),
                                                    eg.map((e) =>
                                                        (0, i.jsx)(
                                                            V,
                                                            {
                                                                $desktop: u,
                                                                $selecting: X,
                                                                $visible: !I,
                                                                ...(!f && Y(v, e, C === e)),
                                                                ...("" === C && { onKeyDown: eo(e) }),
                                                                ...j(e),
                                                                "data-file": e,
                                                                onClick: () => {
                                                                    S?.(e);
                                                                },
                                                                onDoubleClick: () => {
                                                                    E?.(e);
                                                                },
                                                                children: (0, i.jsx)(J, {
                                                                    fileActions: z,
                                                                    fileManagerId: s,
                                                                    fileManagerRef: $,
                                                                    focusFunctions: F,
                                                                    focusedEntries: R,
                                                                    hasNewFolderIcon: d,
                                                                    hideShortcutIcon: l,
                                                                    isDesktop: u,
                                                                    isHeading: u && P[e].systemShortcut,
                                                                    isLoadingFileManager: I,
                                                                    loadIconImmediately: m,
                                                                    name: (0, c.basename)(e, x.zm),
                                                                    path: (0, c.join)(v, e),
                                                                    readOnly: f,
                                                                    renaming: C === e,
                                                                    selectionRect: Q,
                                                                    setRenaming: O,
                                                                    stats: P[e],
                                                                    view: w,
                                                                    handleFileOpen: k,
                                                                }),
                                                            },
                                                            e
                                                        )
                                                    ),
                                                ],
                                            }),
                                        ],
                                    }),
                                b && (0, i.jsx)(ex, { count: er ? 0 : eg.length, directory: v, fileDrop: ee, selected: R }),
                            ],
                        })
                    );
                }
            );
        },
        45279: function (e, t, n) {
            var r = n(1864),
                a = n(67294),
                i = n(59746),
                o = n(23736),
                l = n(89670),
                s = n(20063),
                c = n(58437),
                u = n(76488),
                d = n(97836),
                m = n(6484);
            t.Z = ({ callback: e, directory: t = d.Ll, id: n, onDragLeave: f, onDragOver: b, updatePositions: g }) => {
                let { url: p } = (0, c.z)(),
                    { iconPositions: h, sortOrders: v, setIconPositions: w } = (0, u.k)(),
                    { exists: y, mkdirRecursive: x, updateFolder: A, writeFile: k } = (0, s.o)(),
                    E = (0, a.useCallback)(
                        async (e, t, a) => {
                            if (n) {
                                if (t) {
                                    let i = (0, r.join)(d.Ll, e);
                                    if ((await x(d.Ll), await k(i, t, !0))) return a === l.v.UPDATE_URL && p(n, i), await A(d.Ll, e), (0, r.basename)(i);
                                } else a === l.v.UPDATE_URL && p(n, e);
                            }
                            return "";
                        },
                        [n, x, A, p, k]
                    ),
                    { openTransferDialog: S } = (0, i.Z)();
                return {
                    onDragLeave: f,
                    onDragOver: (e) => {
                        b?.(e), (0, m.nK)(e);
                    },
                    onDrop: (a) => {
                        if (!d.my.has((0, m.RT)(t))) {
                            if (g && a.target instanceof HTMLElement) {
                                let { files: e, text: n } = (0, o.p4)(a);
                                if (0 === e.length && "" === n) return;
                                let i = { x: a.clientX, y: a.clientY },
                                    l = [];
                                if (n) {
                                    try {
                                        l = JSON.parse(n);
                                    } catch { }
                                    if (!Array.isArray(l)) return;
                                    let [e] = l;
                                    if (!e || (e.startsWith(t) && (0, r.basename)(e) === (0, r.relative)(t, e))) return;
                                    l = l.map((e) => (0, r.basename)(e));
                                } else e instanceof FileList ? (l = [...e].map((e) => e.name)) : (l = [...e].map((e) => e.getAsFile()?.name || "").filter(Boolean));
                                (l = l.map((e) => {
                                    if (!h[`${t}/${e}`]) return e;
                                    let n = 0,
                                        a = "";
                                    do (n += 1), (a = `${t}/${(0, r.basename)(e, (0, r.extname)(e))} (${n})${(0, r.extname)(e)}`);
                                    while (h[a]);
                                    return (0, r.basename)(a);
                                })),
                                    (0, m.vi)(t, a.target, h, v, i, l, w, y);
                            }
                            (0, o.WG)(a, e || E, t, S, !!n);
                        }
                    },
                };
            };
        },
        16854: function (e, t, n) {
            let r = n(10508).ZP.li(
                [
                    "display:",
                    ";height:min-content;outline-offset:-2px;padding:2px;button{position:relative;figure{display:flex;flex-direction:column;margin-bottom:-2px;place-items:center;figcaption{color:",
                    ";font-size:",
                    ";line-height:1.2;margin:1px 0;padding:2px 0;text-shadow:",
                    ";word-break:break-word;}picture{height:",
                    ";width:",
                    ";&:not(:first-of-type){position:absolute;img{position:absolute;}}}}}&:hover{background-color:",
                    ";outline:",
                    ";}&.focus-within{background-color:",
                    ";outline:",
                    ";z-index:1;&.only-focused{margin-bottom:-1000px;}&:hover{background-color:",
                    ";outline:",
                    ";}}",
                ],
                ({ $visible: e }) => (e ? "flex" : "none"),
                ({ theme: e }) => e.colors.fileEntry.text,
                ({ theme: e }) => e.sizes.fileEntry.fontSize,
                ({ $desktop: e, theme: t }) => (e ? t.colors.fileEntry.textShadow : void 0),
                ({ theme: e }) => e.sizes.fileEntry.iconSize,
                ({ theme: e }) => e.sizes.fileEntry.iconSize,
                ({ theme: e }) => e.colors.fileEntry.background,
                ({ $desktop: e, theme: t }) => (e ? `1px solid ${t.colors.fileEntry.border}` : void 0),
                ({ theme: e }) => e.colors.fileEntry.backgroundFocused,
                ({ $desktop: e, theme: t }) => (e ? `1px solid ${t.colors.fileEntry.borderFocused}` : void 0),
                ({ theme: e, $selecting: t }) => (t ? e.colors.fileEntry.backgroundFocused : e.colors.fileEntry.backgroundFocusedHover),
                ({ $desktop: e, theme: t }) => (e ? `1px solid ${t.colors.fileEntry.borderFocusedHover}` : void 0)
            );
            t.Z = r;
        },
        52547: function (e, t, n) {
            var r = n(10508),
                a = n(18680),
                i = n(97836);
            let o = r.ZP.ol(
                [
                    "",
                    ";contain:strict;display:grid;gap:",
                    ";grid-auto-flow:row;grid-template-columns:",
                    ";grid-template-rows:",
                    ";height:100%;overflow:",
                    ";padding:",
                    ";place-content:flex-start;pointer-events:",
                    ";main > &{grid-auto-flow:column;height:calc(100% - ",
                    "px);overflow:visible;padding-bottom:21px;}",
                ],
                ({ $scrollable: e }) => (e ? (0, a.Z)() : void 0),
                ({ theme: e }) => `${e.sizes.fileManager.rowGap} ${e.sizes.fileManager.columnGap}`,
                ({ theme: e }) => `repeat(auto-fill, ${e.sizes.fileManager.gridEntryWidth})`,
                ({ theme: e }) => `repeat(auto-fill, ${e.sizes.fileManager.gridEntryHeight})`,
                ({ $isEmptyFolder: e, $scrollable: t }) => (!e && t ? void 0 : "hidden"),
                ({ theme: e }) => e.sizes.fileManager.padding,
                ({ $selecting: e }) => (e ? "auto" : void 0),
                i.bK
            );
            t.Z = o;
        },
        73071: function (e, t, n) {
            let r = n(10508).ZP.li([
                "display:flex;flex-direction:column;figure{display:flex;height:36px;padding-bottom:1px;padding-left:1px;place-items:center;figcaption{color:#fff;}picture{margin-left:3px;margin-right:8px;}svg{fill:rgb(210,210,210);height:8px;margin-left:auto;margin-right:8px;pointer-events:none;width:8px;}picture,svg{transition:margin 0.25s ease-out;}&:active{figcaption{letter-spacing:-0.15px;opacity:90%;}picture{margin-left:7px;}svg{margin-right:12px;}picture,svg{transition:none;}}@media (pointer:fine){&:hover{background-color:hsla(0,0%,35%,70%);}}@media (pointer:coarse){&:active{background-color:hsla(0,0%,35%,70%);border:1px solid hsla(0,0%,45%,70%);}}}",
            ]);
            t.Z = r;
        },
        8833: function (e, t, n) {
            let r = n(10508).ZP.ol(["margin-top:7px;width:100%;picture:not(:first-of-type){position:absolute;}"]);
            t.Z = r;
        },
        10511: function (e, t, n) {
            n.d(t, {
                c: function () {
                    return l;
                },
                k: function () {
                    return s;
                },
            });
            var r = n(16854),
                a = n(52547),
                i = n(73071),
                o = n(8833);
            let l = { icon: { StyledFileEntry: r.Z, StyledFileManager: a.Z }, list: { StyledFileEntry: i.Z, StyledFileManager: o.Z } },
                s = { icon: { imgSize: 48 }, list: { displaySize: 24, imgSize: 48 }, sub: { displaySize: 48, imgSize: 16 } };
        },
        9054: function (e, t, n) {
            n.d(t, {
                MV: function () {
                    return i;
                },
                Xi: function () {
                    return o;
                },
                l$: function () {
                    return l;
                },
            });
            var r = n(67294);
            let a = (e, t) => {
                t?.logToConsole;
            },
                i = (e, t) => {
                    let n = (0, r.useRef)(null),
                        i = (0, r.useRef)(new Set()),
                        o = (0, r.useRef)(!1);
                    (0, r.useEffect)(() => {
                        o.current ? e && (e !== n.current || "/" === e) && (i.current.has(e) || (a(`Folder opened ${e}`, t), i.current.add(e)), (n.current = e)) : (o.current = !0);
                    }, [e, t]);
                },
                o = (e) => {
                    let t = (0, r.useRef)();
                    t.current ||
                        (t.current = (e) => {
                            let { clientX: t, clientY: n, button: r, detail: a, target: i } = e;
                            i instanceof HTMLElement && i.tagName;
                        }),
                        (0, r.useEffect)(() => {
                            if (t.current) {
                                let e = t.current;
                                return document.addEventListener("click", e), () => document.removeEventListener("click", e);
                            }
                            return () => { };
                        }, []);
                },
                l = (e) => {
                    (0, r.useEffect)(() => {
                        let t = () => a("File cut", e),
                            n = () => a("File copied", e),
                            r = () => a("File pasted", e),
                            i = () => a("File deleted", e),
                            o = (e) => {
                                "Delete" === e.key ? i() : e.ctrlKey && "c" === e.key.toLowerCase() ? n() : e.ctrlKey && "x" === e.key.toLowerCase() ? t() : e.ctrlKey && "v" === e.key.toLowerCase() && r();
                            },
                            l = (e) => {
                                e.composedPath().forEach((e) => {
                                    if (e instanceof HTMLElement && e.classList.contains("context-menu-item")) {
                                        let a = e.textContent?.toLowerCase();
                                        a?.includes("cut") ? t() : a?.includes("copy") ? n() : a?.includes("paste") ? r() : a?.includes("delete") && i();
                                    }
                                });
                            },
                            s = (t) => {
                                t.preventDefault(), a("Right click", e);
                            },
                            c = (t) => {
                                a("File drag started", e);
                            },
                            u = (t) => {
                                a("File dragged over", e);
                            };
                        return (
                            document.addEventListener("cut", t),
                            document.addEventListener("copy", n),
                            document.addEventListener("paste", r),
                            document.addEventListener("keydown", o),
                            document.addEventListener("click", l),
                            document.addEventListener("contextmenu", s),
                            document.addEventListener("dragstart", c),
                            document.addEventListener("dragover", u),
                            () => {
                                document.removeEventListener("cut", t),
                                    document.removeEventListener("copy", n),
                                    document.removeEventListener("paste", r),
                                    document.removeEventListener("keydown", o),
                                    document.removeEventListener("click", l),
                                    document.removeEventListener("contextmenu", s),
                                    document.removeEventListener("dragstart", c),
                                    document.removeEventListener("dragover", u);
                            }
                        );
                    }, [e]);
                };
        },
        24645: function (e, t, n) {
            var r = n(67294),
                a = n(97836);
            t.Z = (e, t = !1) => {
                let n = (0, r.useRef)(),
                    i = (0, r.useRef)(0);
                return {
                    onClick: (0, r.useCallback)(
                        (r) => {
                            let o = () => {
                                r.stopPropagation(), e(r);
                            },
                                l = () => {
                                    n.current && (clearTimeout(n.current), (n.current = void 0));
                                },
                                s = () => {
                                    i.current >= 12 && l(), void 0 === n.current ? (r.target.removeEventListener("pointermove", s), (i.current = 0)) : (i.current += 1);
                                };
                            t ? o() : void 0 === n.current ? ((n.current = window.setTimeout(l, a.jx.DOUBLE_CLICK)), r.target.addEventListener("pointermove", s, { passive: !0 })) : (l(), o());
                        },
                        [e, t]
                    ),
                };
            };
        },
        78848: function (e, t, n) {
            n.d(t, {
                O: function () {
                    return i;
                },
            });
            var r = n(67294),
                a = n(97836);
            let i = (e, t, n = !1) => {
                let i = (0, r.useRef)(!1),
                    [o, l] = (0, r.useState)(n);
                return (
                    (0, r.useEffect)(() => {
                        n ||
                            !e.current ||
                            i.current ||
                            ((i.current = !0),
                                new IntersectionObserver((e) => e.forEach(({ isIntersecting: e }) => l(e)), {
                                    root: ("object" == typeof t && t.current) || ("string" == typeof t && e.current.closest(t)) || e.current.parentElement,
                                    ...a.e5,
                                }).observe(e.current));
                    }, [n, e, t]),
                    o
                );
            };
        },
        48611: function (e, t, n) {
            n.d(t, {
                Z: function () {
                    return i;
                },
            });
            var r = n(67294);
            let a = async () => {
                let e;
                if ("undefined" == typeof navigator || !("gpu" in navigator)) return !1;
                try {
                    e = await navigator.gpu.requestAdapter();
                } catch {
                    return !1;
                }
                return !!e && !(1073741824 > (e.limits.maxBufferSize ?? 0) || 1073741824 > (e.limits.maxStorageBufferBindingSize ?? 0) || 32768 > (e.limits.maxComputeWorkgroupStorageSize ?? 0));
            },
                i = () => {
                    let [e, t] = (0, r.useState)(),
                        n = (0, r.useCallback)(async () => t(await a()), []);
                    return (
                        (0, r.useEffect)(() => {
                            n();
                        }, [n]),
                        e
                    );
                };
        },
        18680: function (e, t, n) {
            n.d(t, {
                Z: function () {
                    return o;
                },
            });
            var r = n(10508),
                a = n(97836);
            let i = {
                dark: { active: "rgb(166, 166, 166)", blendMode: "color-burn", buttonHover: "rgb(55, 55, 55)", thumb: "rgb(77, 77, 77)", thumbHover: "rgb(122, 122, 122)", track: "rgb(23, 23, 23)" },
                light: { active: "rgb(96, 96, 96)", blendMode: "color-dodge", buttonHover: "rgb(218, 218, 218)", thumb: "rgb(205, 205, 205)", thumbHover: "rgb(166, 166, 166)", track: "rgb(240, 240, 240)" },
            };
            var o = (e = a.BQ, t = 0, n = 0, o = "dark") =>
                (0, r.iv)(
                    [
                        "overflow:auto;scrollbar-gutter:stable;@supports not selector(::-webkit-scrollbar){scrollbar-color:",
                        " ",
                        ";}&::-webkit-scrollbar{height:",
                        "px;width:",
                        "px;}&::-webkit-scrollbar-corner,&::-webkit-scrollbar-track{background-color:",
                        ";}&::-webkit-scrollbar-thumb{background-clip:padding-box;background-color:",
                        ";}&::-webkit-scrollbar-thumb:vertical{background-clip:padding-box;background-color:",
                        ";border-left:1px solid transparent;border-right:1px solid transparent;}&::-webkit-scrollbar-thumb:horizontal{border-bottom:1px solid transparent;border-top:1px solid transparent;}&::-webkit-scrollbar-thumb:hover{background-color:",
                        ";}&::-webkit-scrollbar-thumb:active{background-color:",
                        ";}&::-webkit-scrollbar-button:single-button{background-clip:padding-box;background-color:",
                        ";background-position:center 4px;background-repeat:no-repeat;background-size:10px;border:1px solid ",
                        ";display:block;height:",
                        ";&:hover{background-color:",
                        ";}&:active{background-color:",
                        ";}}&::-webkit-scrollbar-button:single-button:vertical:decrement,&::-webkit-scrollbar-button:single-button:vertical:increment{background-position-x:",
                        ";background-position-y:",
                        ";background-size:16px;border-bottom:0;border-top:0;image-rendering:pixelated;}&::-webkit-scrollbar-button:single-button:vertical:decrement{background-image:url(",
                        ");}&::-webkit-scrollbar-button:single-button:vertical:increment{background-image:url(",
                        ");}&::-webkit-scrollbar-button:single-button:horizontal:decrement,&::-webkit-scrollbar-button:single-button:horizontal:increment{background-position:center;background-size:16px;border-left:0;border-right:0;image-rendering:pixelated;}&::-webkit-scrollbar-button:single-button:horizontal:decrement{background-image:url(",
                        ");}&::-webkit-scrollbar-button:single-button:horizontal:increment{background-image:url(",
                        ");}&::-webkit-scrollbar-button:single-button:vertical:decrement:active,&::-webkit-scrollbar-button:single-button:vertical:increment:active,&::-webkit-scrollbar-button:single-button:horizontal:decrement:active,&::-webkit-scrollbar-button:single-button:horizontal:increment:active{background-blend-mode:",
                        ";}",
                    ],
                    i[o].thumb,
                    i[o].track,
                    e,
                    e,
                    i[o].track,
                    i[o].thumb,
                    i[o].thumb,
                    i[o].thumbHover,
                    i[o].active,
                    i[o].track,
                    i[o].track,
                    e ? `${e}px` : "initial",
                    i[o].buttonHover,
                    i[o].active,
                    0 === t ? "center" : `${t}px`,
                    0 === n ? "center" : `${n}px`,
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAKElEQVR42mOgMRgF6enp/ynSDMMUaEZgsjST5RJsikk2AKc4bcAoAADI7y5FsB5j/QAAAABJRU5ErkJggg==",
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAK0lEQVR42mOgARgF6enp/0kRZ8KvGMEnyQUwjMwn0xBMzWQZQlmA0h6MAgAuqCnfdOk/ZQAAAABJRU5ErkJggg==",
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAG0lEQVR42mPAD0ZBenr6fxge4ppHuiGEwSgAAGJiLkXUVlYDAAAAAElFTkSuQmCC",
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAG0lEQVR42mPADkZBenr6fxgeZoYMV82Ug1EAAPiTLkWjutmQAAAAAElFTkSuQmCC",
                    i[o].blendMode
                );
        },
        76833: function (e, t, n) {
            n.d(t, {
                G: function () {
                    return i;
                },
            });
            let r = { capture: !0, passive: !0 },
                a = { capture: !1, passive: !0 },
                i = (e, t = !1, n = 1, i = !1) => {
                    e &&
                        requestAnimationFrame(() => {
                            let o = () => {
                                t || (e.style.background = ""), (e.style.borderImage = "");
                            };
                            if (t) {
                                let t = ({ clientX: a, clientY: l }) => {
                                    if (e.isConnected) {
                                        let { x: t, y: r } = e.getBoundingClientRect(),
                                            o = i && document.elementFromPoint(a, l) === e;
                                        e.style.borderImage = `radial-gradient(75px at ${a - t}px ${l - r}px, rgba(${o ? "255, 255, 255, 80%" : "200, 200, 200, 60%"}), transparent) 1 / ${n}px / 0 stretch`;
                                    } else document.removeEventListener("mousemove", t, r), document.removeEventListener("mouseleave", o, r);
                                };
                                document.addEventListener("mousemove", t, r), document.addEventListener("mouseleave", o, r);
                            } else
                                e.addEventListener(
                                    "mousemove",
                                    ({ offsetX: t, offsetY: r }) => {
                                        (e.style.background = `radial-gradient(circle at ${t}px ${r}px, rgba(200, 200, 200, 30%), transparent)`),
                                            (e.style.borderImage = `radial-gradient(75px at ${t}px ${r}px, rgba(200, 200, 200, 60%), transparent) 1 / ${n}px / 0 stretch`);
                                    },
                                    a
                                ),
                                    e.addEventListener("mouseleave", o, a);
                        });
                };
        },
    },
]);





// "use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4110],{10393:function(e,t,n){n.d(t,{$3:function(){return l},QC:function(){return r},YH:function(){return i},dI:function(){return a},ov:function(){return o},vF:function(){return s}});let r={center:"center center",fill:"center center / cover",fit:"center center / contain",stretch:"center center / 100% 100%",tile:"50% 50%"},a={COASTAL_LANDSCAPE:()=>n.e(5522,"high").then(n.bind(n,65522)),HEXELLS:()=>n.e(3681,"high").then(n.bind(n,83681)),MATRIX:()=>n.e(6514,"high").then(n.bind(n,26514)),STABLE_DIFFUSION:()=>n.e(4268,"high").then(n.bind(n,4268)),VANTA:()=>n.e(8020,"high").then(n.bind(n,98020))},i={COASTAL_LANDSCAPE:()=>new Worker(n.tu(new URL(n.p+n.u(5183),n.b)),{name:"Wallpaper (Coastal Landscape)"}),HEXELLS:()=>new Worker(n.tu(new URL(n.p+n.u(3191),n.b)),{name:"Wallpaper (Hexells)"}),STABLE_DIFFUSION:()=>new Worker(n.tu(new URL(n.p+n.u(9629),n.b)),{name:"Wallpaper (Stable Diffusion)"}),VANTA:e=>new Worker(n.tu(new URL(n.p+n.u(1872),n.b)),{name:`Wallpaper (Vanta Waves)${e?` [${e}]`:""}`})},o=[{id:"APOD",startsWith:!0},{id:"COASTAL_LANDSCAPE",name:"Coastal Landscape"},{id:"HEXELLS",name:"Hexells"},{id:"MATRIX 2D",name:"Matrix (2D)"},{id:"MATRIX 3D",name:"Matrix (3D)"},{id:"SLIDESHOW",name:"Picture Slideshow"},{id:"STABLE_DIFFUSION",name:"Stable Diffusion (Beta)",requiresWebGPU:!0},{id:"VANTA",name:"Vanta Waves",startsWith:!0}],l=":scope > canvas",s=":scope > video"},99545:function(e,t,n){var r=n(85893),a=n(67294),i=n(10511),o=n(46581),l=n(97836);let s=(0,a.memo)(({baseIcon:e,icon:t,imgSize:n,isDesktop:s,isFirstImage:c,name:u,totalSubIcons:d,view:m})=>{let f=(0,a.useMemo)(()=>i.k[[l.MB,l.EV].includes(t)||t.startsWith("blob:")||t.startsWith(l.Xo)||t.startsWith(l.Rm)?m:"sub"],[t,m]),b=(0,a.useMemo)(()=>{if(t===l.EV)return{zIndex:3};if(e===l._l){let e=d-1>1,t=16===n,r=c&&e?t?"matrix(0.4, 0.14, 0, 0.8, -0.5, 2)":"matrix(0.4, 0.14, 0, 0.7, -4, 2)":t?"matrix(0.5, 0.05, 0, 0.8, 3.5, 2)":"matrix(0.5, 0.05, 0, 0.7, 2, 1)";return{objectFit:"cover",transform:`${r} translateZ(0px)`,zIndex:c?2:1}}},[e,t,n,c,d]);return(0,r.jsx)(o.Z,{$eager:s||t===l.MB,alt:u,src:t,style:b,...f})});t.Z=(0,a.memo)(({icon:e,imgSize:t,isDesktop:n,name:i,showShortcutIcon:o,subIcons:c,view:u})=>{let d=(0,a.useMemo)(()=>o?c?.filter(e=>e!==l.MB):c,[o,c]),m=(0,a.useMemo)(()=>d?.filter(t=>t!==e)||[],[e,d]);return(0,r.jsx)(r.Fragment,{children:m.map((a,o)=>(0,r.jsx)(s,{baseIcon:e,icon:a,imgSize:t,isDesktop:n,isFirstImage:0===o,name:i,totalSubIcons:m.length,view:u},a))})})},33975:function(e,t,n){var r=n(67294),a=n(6155),i=n(20063),o=n(18575),l=n(97836),s=n(6484);let c={icon:"",pid:"",url:""};t.Z=(e,t=!1,n=!1,u=!0)=>{let[d,m]=(0,r.useState)(c),f=(0,r.useRef)(!1),b=e=>{m(e),f.current=!1},{fs:g,rootFs:p}=(0,i.o)();return(0,r.useEffect)(()=>{if(g&&p&&!f.current&&u&&d===c){f.current=!0;let r=(0,s.RT)(e);r&&(!t||l.my.has(r)||(0,o.isMountedFolder)(p.mntMap[e]))?(0,a.Z7)(g,e,r,b):(0,a.g7)(g,p,e,t,n,b)}},[g,n,d,t,u,e,p]),[d,m]}},54110:function(e,t,n){let r,a;n.d(t,{Z:function(){return eS}});var i=n(85893),o=n(67294),l=n(5152),s=n.n(l),c=n(1864),u=n(10508),d=n(8897);let m=u.ZP.figure(["pointer-events:",";figcaption{pointer-events:none;}"],({$renaming:e})=>e?"all":void 0);var f=n(99545),b=n(43950),g=n(6155),p=n(20063),h=n(58437),v=n(37176),w=n(76488),y=n(86178),x=n(97836),A=n(6484),k=(e,t)=>{let{setForegroundId:r,updateRecentFiles:a}=(0,w.k)(),{createPath:i,updateFolder:l}=(0,p.o)(),{minimize:s,open:u,url:d}=(0,h.z)(),m=(0,y.R)();return(0,o.useCallback)(async(o,f)=>{let{preferProcessIcon:b,singleton:g,icon:p}=v.Z[o]||{},h=g?Object.keys(m.current).find(e=>e===o||e.startsWith(`${o}${x.CC}`)):"",w=e;if(e.startsWith("ipfs://")){let{getIpfsFileName:t,getIpfsResource:r}=await n.e(1746,"high").then(n.bind(n,31746)),a=await r(e);w=(0,c.join)(x.Ll,await i(await t(e,a),x.Ll,a)),await l(x.Ll,(0,c.basename)(w))}h?(d(h,w),m.current[h].minimized&&s(h),r(h)):(u(o||"OpenWith",{url:w},g||f===x._l||b?p:f),w&&o&&a(w,o,(0,A.yk)(w)?(0,c.basename)(t,(0,c.extname)(t)):void 0))},[i,s,u,t,m,r,d,l,a,e])};let E=new Set([".001",".7z",".ace",".apk",".appx",".arj",".bz2",".bzip2",".cab",".chm",".chw",".cpio",".deb",".dll",".dmg",".doc",".docx",".epub",".esd",".exe",".flv",".gz",".gzip",".hfs",".hxs",".img",".ipa",".jar",".lha",".lit",".lzh",".lzma",".mbr",".msi",".ntfs",".ods",".odt",".ova",".pages",".pkg",".ppt",".qcow",".qcow2",".r00",".rar",".rpm",".squashfs",".swf",".swm",".sys",".tar",".taz",".tgz",".txz",".udf",".vdi",".vhd",".vhdx",".vmdk",".wim",".xar",".xip",".xls",".xlsx",".xpi",".xz",".z",".zipx"]);var S=n(18575),L=n(7502);let M=new Set([".aac",".aiff",".ape",".flac",".m4a",".mp3",".oga",".ogg",".wav",".wma"]),C=[".aac",".mp3",".ogg",".wav"],O=new Set([".avi",".flv",".m4v",".mkv",".mov",".mp4",".mpeg",".mpg",".ogv",".webm",".wmv"]),T=[".avi",".gif",".mkv",".mp4",".ogg",".ogv",".webm"],D=new Set([".bmp",".gif",".ico",".jpeg",".jpg",".png",".psd",".tiff",".xcf"]),$=[".bmp",".gif",".jpg",".png",".psd",".svg",".tiff"];var R=n(6460),j=n(48764).Buffer;let{alias:F}=x.PACKAGE_DATA;var z=(e,t,r,a,{archiveFiles:i,deleteLocalPath:l,downloadFiles:s,extractFiles:u,newShortcut:d},{blurEntry:m,focusEntry:f},z,P,W,B)=>{let{minimize:Z,open:I,url:H}=(0,h.z)(),N=(0,y.R)(),{setCursor:U,setForegroundId:K,setWallpaper:V,updateRecentFiles:G}=(0,w.k)(),X=(0,c.basename)(r),Q=z.includes(X),_=k(e,r),{copyEntries:q,createPath:Y,lstat:J,mapFs:ee,moveEntries:et,readFile:en,rootFs:er,unMapFs:ea,updateFolder:ei}=(0,p.o)(),{contextMenu:eo}=(0,L.H)(),{onContextMenuCapture:el,...es}=(0,o.useMemo)(()=>eo?.(()=>{let o=A.RT(e),{process:m=[]}=o in b.Z?b.Z[o]:{},f=m.filter(e=>e!==t).filter(e=>e!==t),p=1===z.length,h=()=>p||!Q?[r]:[...new Set([r,...z.map(e=>c.join(c.dirname(r),e))])],w=[],y=A.RT(r),k=y===x.zm,L=er?.mountList.some(e=>e===r&&S.isMountedFolder(er?.mntMap[e]));if(!B&&!L){let m=g.Wd(o);if(w.push({action:()=>et(h()),label:"Cut"},{action:()=>q(h()),label:"Copy"},x.Os),(m||k||!y&&!o)&&w.push({action:()=>h().forEach(async e=>{let t=m&&!(await J(e)).isDirectory()?m:"FileExplorer";d(e,t)}),label:"Create shortcut"}),w.push({action:()=>h().forEach(e=>l(e)),label:"Delete"},{action:()=>a(X),label:"Rename"},x.Os,{action:()=>{let t=Object.keys(N.current).find(t=>t===`Properties${x.CC}${e}`);t?(N.current[t].minimized&&Z(t),K(t)):I("Properties",{shortcutPath:k?r:void 0,url:k?r:e})},label:"Properties"}),r){if(r===c.join(x.Ll,x.Bb)){if("function"==typeof FileSystemHandle){let e=(e,t)=>{ee(e,t).then(e=>{ei("/",e).then(e=>e),I("FileExplorer",{url:c.join("/",e)})}).catch(()=>{})},t="showDirectoryPicker"in window,n="function"==typeof navigator.storage?.getDirectory&&!A.G6();w.unshift(...t?[{action:()=>e("/"),label:"Map directory"}]:[],...n?[{action:async()=>{try{e("/OPFS",await navigator.storage.getDirectory())}catch{}},label:"Map OPFS"}]:[],...t||n?[x.Os]:[])}}else{w.unshift(x.Os);let a=M.has(y),o=D.has(y),l=O.has(y);if(a||o||l){let e=a||l;w.unshift(x.Os,{label:"Convert to",menu:(e?a?C:T:$).filter(e=>e!==y).map(t=>{let a=t.replace(".","");return{action:async()=>{let t=await Promise.all(h().map(async e=>[e,await en(e)])),i=e?(await n.e(7881,"high").then(n.bind(n,67881))).transcode:(await n.e(8673,"high").then(n.bind(n,68673))).convert,o=await i(t,a);await Promise.all(o.map(async([e,t])=>{let n=c.basename(e),a=c.dirname(r);await ei(a,await Y(n,a,t))}))},label:a.toUpperCase()}})})}x.Tj.includes(y)&&w.unshift(x.Os,{label:"Convert to",menu:x.Tj.filter(e=>e!==y).map(e=>{let t=e.replace(".","");return{action:()=>{h().forEach(async e=>{let a=`${c.dirname(e)}/${c.basename(e,c.extname(e))}.${t}`,{convertSheet:i}=await n.e(3751,"high").then(n.bind(n,73751)),o=await i(await en(e),t),l=c.dirname(r);await ei(l,await Y(c.basename(a),l,j.from(o)))})},label:t.toUpperCase()}})}),".m3u"!==y&&x.uH.has(y)&&w.unshift(x.Os,{action:()=>{h().forEach(async e=>{let t=`${c.dirname(e)}/${c.basename(e,c.extname(e))}.m3u`,{createM3uPlaylist:a,tracksFromPlaylist:i}=await n.e(8019,"high").then(n.bind(n,8019)),o=a(await i((await en(e)).toString(),A.RT(e))),l=c.dirname(r);await ei(l,await Y(c.basename(t),l,j.from(o)))})},label:"Convert to M3U"});let d="FileExplorer"===t;if(p&&!d&&!A.yk(e)){let t=c.basename(e),n={text:`${t} - ${F}`,title:t,url:`${window.location.origin}?url=${e}`};try{!er?.mountList.some(e=>"/"!==e&&r.startsWith(`${e}/`))&&g.CK(P)&&navigator.canShare?.(n)&&w.unshift({SvgIcon:R.mB,action:()=>navigator.share(n),label:"Share"})}catch{}}w.unshift({action:()=>i(h()),label:"Add to archive..."},...E.has(y)||x.my.has(y)?[{action:()=>u(r),label:"Extract Here"},x.Os]:[],{action:()=>s(h()),label:"Download"}),k||d||x.yV.forEach(e=>{e===m||f.includes(e)||f.push(e)})}}w.unshift(x.Os)}L&&w.push(x.Os,{action:()=>ea(r,er?.mntMap[r].getName()!=="FileSystemAccess"),label:"Disconnect"}),x.ru.has(o)&&w.unshift({action:()=>{I("Paint",{url:e}),e&&G(e,"Paint")},label:"Edit"});let eo=x.qy.has(y);if(x._r.has(y)&&w.unshift({action:()=>U(r),label:"Set as mouse pointer"}),(eo||x.lM.has(y)&&!x._r.has(y)&&".svg"!==y)&&w.unshift({label:"Set as background",...eo?{action:()=>V(r)}:{menu:[{action:()=>V(r,"fill"),label:"Fill"},{action:()=>V(r,"fit"),label:"Fit"},{action:()=>V(r,"stretch"),label:"Stretch"},{action:()=>V(r,"tile"),label:"Tile"},{action:()=>V(r,"center"),label:"Center"}]}}),f.length>0&&w.unshift({label:"Open with",menu:[...f.map(e=>{let{icon:t,title:n}=v.Z[e]||{};return{action:()=>{_(e,t).then(e=>e)},icon:t,label:n}}),x.Os,{action:()=>I("OpenWith",{url:e}),label:"Choose another app"}],primary:!t}),t){let{icon:n}=v.Z[t]||{};if(k&&e&&"/"!==e&&!e.startsWith("http:")&&!e.startsWith("https:")&&!e.startsWith("nostr:")){let t=""===o||".zip"===o;w.unshift({action:()=>I("FileExplorer",{url:c.dirname(e)},""),label:`Open ${t?"folder":"file"} location`})}W&&"FileExplorer"===t&&!x.my.has(o)&&w.unshift({action:()=>{_(t,n).then(e=>e)},label:"Open in new window"}),w.unshift({action:()=>{"FileExplorer"===t&&W&&!x.my.has(o)?H(W,e):_(t,n)},icon:n,label:"Open",primary:!0})}return w[0]===x.Os?w.slice(1):w}),[i,X,H,eo,q,Y,l,s,u,W,z,Q,J,ee,Z,et,d,I,_,r,t,N,en,B,er?.mntMap,er?.mountList,U,K,a,V,P,ea,ei,G,e]);return{onContextMenuCapture:e=>{Q||(m(),f(X)),el(e)},...es}},P=n(33975);let W=(e,t,n,r)=>{let{x:a=0,y:i=0,width:o=0,height:l=0}=n,s=new DOMRect(a,i,Number(o),Number(l));return!(e.left-t.left>=s.right||e.top-t.top>=s.bottom||e.right-t.left<=s.left||e.bottom-t.top+r<=s.top)};var B=n(45279),Z=n(10511),I=n(24645),H=n(67278),N=n(46581),U=n(76833),K=n(78848),V=n(46508),G=n(48764).Buffer;let X=s()(()=>n.e(5653,"high").then(n.bind(n,45653)).then(e=>e.Down),{loadableGenerated:{webpack:()=>[45653]}}),Q=s()(()=>n.e(1253,"high").then(n.bind(n,11253)),{loadableGenerated:{webpack:()=>[11253]}}),_=(e,t,n,r,a=!1)=>{let i=e.replace(/-/g,x.Zf),{lines:o}=(0,g.oc)(i,t,n,r);if(o.length>2){let t=a||e.includes(" ")?o.slice(0,2).join(""):o[0];return`${t.slice(0,-3).trim()}...`}return i},q=[],Y=[];var J=({fileActions:e,fileManagerId:t,fileManagerRef:n,focusedEntries:r,focusFunctions:a,hideShortcutIcon:l,isDesktop:s,isHeading:v,isLoadingFileManager:w,loadIconImmediately:y,name:E,path:S,readOnly:L,renaming:M,selectionRect:C,setRenaming:O,stats:T,hasNewFolderIcon:D,view:$,handleFileOpen:R})=>{let{blurEntry:j,focusEntry:F}=a,{url:J}=(0,h.z)(),ee=(0,o.useRef)(null),et=(0,K.O)(ee,n,s),[{comment:en,getIcon:er,icon:ea,pid:ei,subIcons:eo,url:el},es]=(0,P.Z)(S,T.isDirectory(),D,s||et),ec=k(el,S),{createPath:eu,exists:ed,fs:em,mkdirRecursive:ef,pasteList:eb,stat:eg,updateFolder:ep,writeFile:eh}=(0,p.o)(),[ev,ew]=(0,o.useState)(!1),{formats:ey,sizes:ex}=(0,u.Fg)(),eA="list"===$,ek=(0,c.basename)(S),eE=(0,A.RT)(el),eL=(0,o.useMemo)(()=>(0,A.yk)(el),[el]),eM=(0,o.useMemo)(()=>x.lM.has(eE)||x.qy.has(eE)||eL,[eL,eE]),eC=1===r.length&&r[0]===ek,eO=(0,o.useMemo)(()=>(0,A.RT)(S),[S]),eT=(0,o.useMemo)(()=>eO===x.zm,[eO]),eD=eT?el:S,e$=(0,B.Z)({callback:async(e,t)=>{if(!r.includes(ek)){let n=await eu(e,eD,t);if(n)return await ep(eD,n),n}return""},directory:eD}),eR="FileExplorer"===ei,ej=(0,o.useMemo)(()=>_(E,ex.fileEntry.fontSize,ey.systemFont,ex.fileEntry[eA?"maxListTextDisplayWidth":"maxIconTextDisplayWidth"],!s),[ey.systemFont,s,eA,E,ex.fileEntry]),eF=(0,o.useRef)(null),ez=(0,o.useRef)(!1),eP=(0,o.useRef)(!1),eW=(0,o.useRef)(),eB=(0,o.useCallback)(async()=>{if(T.isDirectory())return"";if(eT){if(en)return en;if(el){if(el.startsWith("http:")||el.startsWith("https:"))return decodeURIComponent(el);let e=(0,c.dirname)(el);return`Location: ${(0,c.basename)(el,(0,c.extname)(el))}${e&&"."!==e?` (${(0,c.dirname)(el)})`:""}`}return""}let e=b.Z[eO]?.type||`${eO.toUpperCase().replace(".","")} File`,t=T.size===V.T?await eg(S):T,{size:n}=t,r=(0,g.GA)(S,t),a=(0,A.UR)(n),i=`Type: ${e}${"-1 bytes"===a?"":`
// Size: ${a}`}`,o=new Date(r).toISOString().slice(0,10),l=new Intl.DateTimeFormat(x.ZW,ey.dateModified).format(r),s=`${o} ${l}`;return`${i}
// Date modified: ${s}`},[en,eO,ey.dateModified,eT,S,eg,T,el]),[eZ,eI]=(0,o.useState)(),eH=(0,o.useCallback)(()=>{eR&&t&&!window.globalKeyStates?.ctrlKey&&!x.my.has(eE)?(J(t,el),j()):eR&&eA?ew(e=>!e):ec(ei,eM?void 0:ea).then(e=>e),T.isDirectory()||R(S)},[j,J,t,ea,eM,eA,ec,eR,ei,el,eE,R,S,T]);return(0,o.useEffect)(()=>{w||!et||ez.current||(async()=>{if(ea.startsWith("blob:")||ea.startsWith("data:")){if(ea.startsWith("data:image/jpeg;base64,"))return;ez.current=!0;let e=(0,c.join)(x.Xo,`${S}${x.Qy}`);if(".ico"!==eE&&!el.startsWith(x.OT)&&!el.startsWith(x.P7)&&!await ed(e)&&eF.current instanceof HTMLImageElement){let t=async()=>{if(eF.current instanceof HTMLImageElement){let n=()=>(Y.shift(),Y[0]?.()),r="";if(eF.current.currentSrc.startsWith("data:image/gif;base64,"))r=eF.current.currentSrc;else{let e,n,a;let{clientHeight:i,clientWidth:o}=eF.current,{naturalHeight:l,naturalWidth:s}=eF.current,c=s/l;c!==o/i&&(s>l?e=i/c:n=o*c);let u=await (0,A.mZ)();try{a=await u?.toCanvas(eF.current,{height:e,skipAutoScale:!0,style:{objectPosition:e?"top":n?"left":void 0},width:n})}catch{}a&&(0,A.H5)(a)?r=a.toDataURL("image/png"):setTimeout(t,x.jx.WINDOW)}r&&Y.push(async()=>{let t=(0,c.dirname)(e);await ef(t);let a=G.from(r.replace(/data:.*;base64,/,""),"base64");return await eh(e,a,!0),es(e=>({...e,icon:(0,A.YS)(a)})),await ep(t,(0,c.basename)(e)),n()}),1===Y.length&&await Y[0]()}};eF.current.complete?await t():eF.current.addEventListener("load",t,x.K7)}}else if(!eT||"function"==typeof er||eL){if(ez.current||!em)return;let e=await (0,g.kv)(em,(0,c.join)(x.Xo,`${S}${x.Qy}`));e?ez.current||(ez.current=!0,es(t=>({...t,icon:e}))):!eP.current&&ee.current&&"function"==typeof er&&(eW.current=new AbortController,await er(eW.current.signal),eP.current=!eW.current.signal.aborted)}})().then(e=>e),!et&&eW.current&&eW.current.abort()},[ed,em,er,ea,w,eT,et,eL,ef,S,es,ep,el,eE,eh]),(0,o.useEffect)(()=>()=>{try{eW.current?.abort()}catch{}},[]),(0,o.useLayoutEffect)(()=>{if(ee.current&&n.current){let e=r.includes(ek),t=q.includes(ek),a=e||t;if(e&&t&&q.splice(q.indexOf(ek),1),C){let e=W(ee.current.getBoundingClientRect(),n.current.getBoundingClientRect(),C,n.current.scrollTop);e&&!a?(q.push(ek),F(ek),ee.current.focus(x.eS)):!e&&a&&j(ek)}else a&&1===r.length&&ee.current!==document.activeElement&&!ee.current.contains(document.activeElement)&&ee.current.focus(x.eS)}},[j,n,ek,F,r,C]),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(H.Z,{ref:ee,"aria-label":E,onMouseOver:()=>eB().then(eI),title:eZ,...eA&&{...x.Cz,as:d.m.button},...(0,I.Z)(eH,eA),...eR&&e$,...z(el,ei,S,O,e,a,r,T,t,L),children:(0,i.jsxs)(m,{ref:(0,o.useCallback)(e=>{eA&&(0,A.UP)()&&(0,U.G)(e)},[eA]),$renaming:M,children:[(0,i.jsx)(N.Z,{ref:eF,$eager:y,$moving:"move"===eb[S],alt:E,src:ea,...Z.k[$]}),(0,i.jsx)(f.Z,{icon:ea,isDesktop:s,name:E,showShortcutIcon:!!(l||T.systemShortcut),subIcons:eo,view:$}),M?(0,i.jsx)(Q,{isDesktop:s,name:E,path:S,renameFile:(t,n)=>{e.renameFile(t,n),O("")},setRenaming:O}):(0,i.jsx)("figcaption",{...v&&{"aria-level":1,role:"heading"},children:eC&&E.length!==ej.length?E:ej}),eA&&eR&&(0,i.jsx)(X,{flip:ev})]})}),ev&&(0,i.jsx)(eS,{url:el,view:"list",hideFolders:!0,hideLoading:!0,hideShortcutIcons:!0,loadIconsImmediately:!0,readOnly:!0,skipFsWatcher:!0,skipSorting:!0})]})};let ee=(0,u.vJ)(["body{pointer-events:none;}"]),et=u.ZP.span(["background-color:",";border:",";position:absolute;z-index:2;"],({theme:e})=>e.colors.selectionHighlightBackground,({theme:e})=>`1px solid ${e.colors.selectionHighlight}`);var en=e=>(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(ee,{}),(0,i.jsx)(et,{...e})]});let er=x.i2/60;var ea=(e,t,{blurEntry:n})=>{let[r,a]=(0,o.useState)(()=>Object.create(null)),[i,l]=(0,o.useState)(()=>Object.create(null)),{x:s,y:c}=r,{height:u,width:d}=i,m=(0,o.useRef)(),{menu:f,setMenu:b}=(0,L.H)(),g=Object.keys(f).length>0,p="number"==typeof s&&"number"==typeof c,h=()=>{l(Object.create(null)),a(Object.create(null))},v=!g&&"number"==typeof d&&"number"==typeof u&&p,w=v?{height:`${Math.abs(Number(u))}px`,transform:`translate(
//             ${Number(s)+(0>Number(d)?Number(d):0)}px,
//             ${Number(c)+(0>Number(u)?Number(u):0)}px)`,width:`${Math.abs(Number(d))}px`}:{};return{isSelecting:v,selectionEvents:{onMouseDown:({clientX:r,clientY:i,target:o})=>{if(o===e.current){let{scrollTop:o}=e.current,{x:s=0,y:c=0}=e.current.getBoundingClientRect();l(Object.create(null)),a({x:r-s,y:i-c+o}),f&&Object.keys(f).length>0&&b(Object.create(null)),t.length>0&&n()}},...p?{onMouseLeave:h,onMouseMove:({clientX:t,clientY:n})=>{let{scrollTop:r=0}=e.current||{},{x:a=0,y:i=0}=e.current?.getBoundingClientRect()||{};m.current||(l({height:n-i-(c||0)+r,width:t-a-(s||0)}),m.current=window.setTimeout(()=>{m.current=void 0},er))},onMouseUp:h}:{}},selectionRect:v?{...r,...i}:void 0,selectionStyling:w}},ei=(e,{focusEntry:t},r,a,i)=>{let[l,s]=(0,o.useState)(-1),{exists:u}=(0,p.o)(),{iconPositions:d,sortOrders:m,setIconPositions:f,setSortOrder:b}=(0,w.k)(),h=(0,o.useRef)(),v=(0,o.useRef)(!1),y=(0,o.useRef)({x:0,y:0}),x=(0,o.useRef)(Object.create(null)),k=({clientX:e,clientY:t})=>{x.current={...x.current,x:e,y:t}},E=r.current?.parentElement?.tagName==="MAIN",S=t=>n=>{(0,A.nK)(n),i&&e.length>0?((0,A.vi)(t,r.current,d,m,x.current,e,f,u),r.current?.removeEventListener("dragover",k)):-1!==l&&b(t,t=>{let n=t.filter(t=>!e.includes(t));return n.splice(l,0,...e),n})},L=t=>({target:n})=>{if(!i&&n instanceof HTMLLIElement){let{children:r=[]}=n.parentElement||{};s(e.includes(t)?-1:[...r].indexOf(n))}},M=(n,a,o)=>l=>{if(o){(0,A.nK)(l);return}t(a);let s=e.length<=1;if(l.nativeEvent.dataTransfer?.setData("application/json",JSON.stringify(s?[c.join(n,a)]:e.map(e=>c.join(n,e)))),s&&l.nativeEvent.dataTransfer?.setData("DownloadURL",`${g.bh(a)||"application/octet-stream"}:${a}:${window.location.href}${c.join(n,a)}`),!s&&h.current){if(!v.current){v.current=!0;let e=y.current.x||y.current.y;y.current={x:e?l.nativeEvent.clientX-y.current.x:l.nativeEvent.offsetX,y:e?l.nativeEvent.clientY-y.current.y:l.nativeEvent.offsetY+5}}l.nativeEvent.dataTransfer?.setDragImage(h.current,E?y.current.x:l.nativeEvent.offsetX,E?y.current.y:l.nativeEvent.offsetY)}Object.assign(l.dataTransfer,{effectAllowed:"move"}),i&&(x.current=e.length>1?{offsetX:l.nativeEvent.offsetX,offsetY:l.nativeEvent.offsetY}:Object.create(null),r.current?.addEventListener("dragover",k,{passive:!0}))},C=(0,o.useCallback)(async()=>{if(r.current){let e=[...r.current.querySelectorAll(".focus-within")];if(e.length>1){h.current?h.current.src="":h.current=new Image;let t=await (0,A.mZ)();if(!t)return;try{let{UNKNOWN_ICON:a}=await n.e(1786,"high").then(n.bind(n,91786)),i=e.every(({style:e})=>e?.gridRowStart&&e?.gridColumnStart),o=await t?.toCanvas(r.current,{filter:t=>!(t instanceof HTMLSourceElement)&&e.some(e=>e.contains(t)),imagePlaceholder:a,skipAutoScale:!0}),l=i?(0,A.u2)(o):o;h.current.src=l.toDataURL(),y.current={x:o.width-l.width,y:o.height-l.height}}catch{}}}},[r]);return(0,o.useEffect)(()=>{!a&&e.length>1?C().then(e=>e):0===e.length&&(v.current=!1)},[e,a,C]),(e,t,n)=>({draggable:!0,onDragEnd:S(e),onDragOver:L(t),onDragStart:M(e,t,n),style:E?d[(0,c.join)(e,t)]:void 0})},eo=n(59746),el=n(23736),es=n(9054),ec=(e,t,n,r,{blurEntry:a,focusEntry:i},{newPath:l,pasteToFolder:s},u,d,m,f)=>{let{copyEntries:b,deletePath:g,moveEntries:v}=(0,p.o)(),{url:y}=(0,h.z)(),{openTransferDialog:k}=(0,eo.Z)(),{foregroundId:E}=(0,w.k)();return(0,es.l$)({logToConsole:!0}),(0,o.useEffect)(()=>{let e=e=>{e.clipboardData?.files?.length&&(!E&&t===x.Ll||E===m)&&(e.stopImmediatePropagation?.(),(0,el.W)(e.clipboardData.files,t,l).then(k))};return document.addEventListener("paste",e),()=>document.removeEventListener("paste",e)},[E,m,l,k,t]),(0,o.useCallback)(o=>l=>{if("list"===f)return;let{ctrlKey:p,key:h,target:w,shiftKey:k}=l;if(!k){if(p)switch(h.toLowerCase()){case"a":if((0,A.nK)(l),w instanceof HTMLOListElement){let[e]=w.querySelectorAll("button");e?.focus(x.eS)}Object.keys(e).forEach(e=>i(e));break;case"c":(0,A.nK)(l),b(n.map(e=>(0,c.join)(t,e)));break;case"x":(0,A.nK)(l),v(n.map(e=>(0,c.join)(t,e)));break;case"v":l.stopPropagation(),s()}else switch(h){case"F2":o&&((0,A.nK)(l),r(o));break;case"F5":m&&((0,A.nK)(l),u());break;case"Delete":n.length>0&&((0,A.nK)(l),n.forEach(async e=>{let n=(0,c.join)(t,e);await g(n)&&u(void 0,n)}),a());break;case"Backspace":m&&((0,A.nK)(l),y(m,(0,c.dirname)(t)));break;case"Enter":w instanceof HTMLButtonElement&&((0,A.nK)(l),(0,A.TF)(w,2));break;default:if(h.startsWith("Arrow")){if((0,A.nK)(l),!(w instanceof HTMLElement))return;let e=w;if(!(w instanceof HTMLButtonElement)&&!(e=w.querySelector("button")))return;let{x:t,y:n,height:r,width:a}=e.getBoundingClientRect(),i="ArrowUp"===h||"ArrowDown"===h?document.elementFromPoint(t,n+("ArrowUp"===h?-r:2*r)):document.elementFromPoint(t+("ArrowLeft"===h?-a:2*a),n);if(i instanceof HTMLOListElement){let t=e.closest("li");if(t instanceof HTMLLIElement){let e=[...i.children],n=e.indexOf(t);("ArrowUp"===h||"ArrowDown"===h)&&(i=e["ArrowUp"===h?0===n?e.length-1:n-1:n===e.length-1?0:n+1].querySelector("button"))}}let o=i?.closest("button"),s=o;o instanceof HTMLButtonElement&&d.current?.contains(o)||(s=e),s?.dispatchEvent(new MouseEvent("mousedown",{bubbles:!0}))}else if(/^[\da-z]$/i.test(h)){(0,A.nK)(l);let t=Object.keys(e),r=t.indexOf(n[n.length-1]),o=h.toLowerCase(),s=h.toUpperCase(),c=[...t.slice(r),...t.slice(0,r)].find(e=>!n.includes(e)&&(e.startsWith(o)||e.startsWith(s)));c&&(a(),i(c),d.current?.querySelector(`button[aria-label='${c}']`)?.scrollIntoView())}}}},[a,y,b,g,d,e,i,n,m,v,s,r,u,t,f])},eu=e=>{let[t,n]=(0,o.useState)([]),r=(0,o.useCallback)(e=>n(e?t=>t.filter(t=>t!==e):[]),[]),a=(0,o.useCallback)(e=>n(t=>t.includes(e)?t:[...t,e]),[]),i=(0,o.useRef)(!1),l=(0,o.useCallback)(t=>{let{relatedTarget:n,target:a}=t,o=e.current===n;o&&i.current?((0,A.nK)(t),a?.focus(x.eS)):(o||e.current?.contains(n))&&n instanceof HTMLElement||r()},[r,e]),s=(0,o.useCallback)(()=>{i.current=!0,window.requestAnimationFrame(()=>{i.current=!1})},[]),c=(0,o.useRef)({x:0,y:0});return{blurEntry:r,focusEntry:a,focusableEntry:e=>{let n=t.includes(e),i=1===t.length&&t[0]===e;return{className:(0,A.Wy)({"focus-within":n,"only-focused":i}),onBlurCapture:l,onFocusCapture:s,onMouseDown:({ctrlKey:t,pageX:i,pageY:o})=>{c.current={x:i,y:o},t?n?r(e):a(e):n||(r(),a(e))},onMouseUp:({ctrlKey:t,pageX:n,pageY:o,button:l})=>{let{x:s,y:u}=c.current;t||i||0!==l||s!==n||u!==o||(r(),a(e)),c.current={x:0,y:0}}}},focusedEntries:t}},ed=n(89670),em=n(10393),ef=n(48611),eb=n(48764).Buffer;let eg=()=>window.WebampGlobal?.store.dispatch({enabled:!1,type:"SET_MILKDROP_DESKTOP"}),ep=(e,t)=>([n,r])=>[e,n===e?!r:t],eh="video/webm",ev="video/mp4",ew=2;var ey=(e,{addToFolder:t,newPath:i,pasteToFolder:l,sortByOrder:[[s,u],d]},m,f)=>{let{contextMenu:b}=(0,L.H)(),{exists:v,mapFs:k,pasteList:E={},readFile:M,rootFs:C,writeFile:O,updateFolder:T}=(0,p.o)(),{iconPositions:D,setForegroundId:$,setWallpaper:R,setIconPositions:j,sortOrders:F,updateRecentFiles:z,wallpaperImage:P}=(0,w.k)(),W=(0,o.useCallback)(e=>{if("VANTA"===e){let e=0==(ew-=1);R(`VANTA${e?" WIREFRAME":""}`),e&&(ew=2)}else ew=2,R(e)},[R]),{minimize:B,open:Z}=(0,h.z)(),I=(0,o.useCallback)((t,n)=>{j(t=>Object.fromEntries(Object.entries(t).filter(([t])=>(0,c.dirname)(t)!==e))),d(""===t?([e])=>[e,n]:ep(t,n))},[j,d,e]),H=(0,o.useMemo)(()=>m&&"function"==typeof navigator?.mediaDevices?.getDisplayMedia&&(window?.MediaRecorder?.isTypeSupported(eh)||window?.MediaRecorder?.isTypeSupported(ev)),[m]),N=(0,o.useCallback)(async()=>{if(a&&r){let{active:e}=r;try{a.requestData(),r.getTracks().forEach(e=>e.stop())}catch{}if(a=void 0,r=void 0,e)return}let e=(0,A.vU)()||(0,A.G6)(),t={video:{frameRate:30},...!e&&{preferCurrentTab:!0,selfBrowserSurface:"include",surfaceSwitching:"include",systemAudio:"include"}},[i]=(r=await navigator.mediaDevices.getDisplayMedia(t)).getVideoTracks(),{height:o,width:l}=i.getSettings(),s=MediaRecorder.isTypeSupported(eh),u=`Screen Capture ${(0,A.gE)()}.${s?"webm":"mp4"}`;a=new MediaRecorder(r,{bitsPerSecond:o&&l?o*l*30:void 0,mimeType:s?eh:ev});let d=(0,c.join)(x.Ll,u),m=Date.now(),f=!1;a.start(),a.addEventListener("dataavailable",async t=>{let{data:r}=t;if(r?.size){let t=eb.from(await r.arrayBuffer());if(await O(d,f?eb.concat([await M(d),t]):t,f),!s||e||a&&"inactive"!==a.state)T(x.Ll,u);else{let{default:e}=await n.e(6027,"high").then(n.t.bind(n,86027,23));e((0,A.V4)(await M(d)),Date.now()-m,async e=>{await O(d,eb.from(await e.arrayBuffer()),!0),T(x.Ll,u)})}f=!0}})},[M,T,O]),U=(0,ef.Z)(),K=(0,y.R)(),V=(0,o.useCallback)((e,t)=>{if(t&&m){let{clientX:n,clientY:r}="TouchEvent"in window&&t.nativeEvent instanceof TouchEvent?t.nativeEvent.touches[0]:t.nativeEvent;(0,A.vi)(x.Ll,t.target,D,F,{x:n,y:r},e,j,v)}},[v,D,m,j,F]),G=(0,o.useCallback)(async(e,t,n)=>V([await i(e,t,"rename")],n),[i,V]);return(0,o.useMemo)(()=>b?.(n=>{let{offsetX:a,offsetY:i,target:o}=n.nativeEvent;if(!m&&!f&&a>o.clientWidth)return[{action:()=>{let e=0;if(i>o.clientHeight-17)e=o.scrollHeight;else if(i>17){let t=2*17;e=Math.round(o.scrollHeight*(i-t)/(o.clientHeight-t))}o.scrollTo({behavior:"instant",top:e})},label:"Scroll Here"},x.Os,{action:()=>{o.scrollTo({behavior:"instant",top:0})},label:"Top"},{action:()=>{o.scrollTo({behavior:"instant",top:o.scrollHeight})},label:"Bottom"},x.Os,{action:()=>{o.scrollBy({behavior:"instant",top:-o.clientHeight})},label:"Page Up"},{action:()=>{o.scrollBy({behavior:"instant",top:o.clientHeight})},label:"Page Down"},x.Os,{action:()=>{o.scrollBy({behavior:"instant",top:-44})},label:"Scroll Up"},{action:()=>{o.scrollBy({behavior:"instant",top:44})},label:"Scroll Down"}];let d=[{action:()=>t().then(e=>V(e,n)),label:"Add file(s)"},...A.df()?[{action:()=>k(e).then(t=>{V([t],n),T(e,t),Z("FileExplorer",{url:c.join(e,t)})}).catch(()=>{}),label:"Map directory"}]:[]],b=document.querySelector("main .webamp-desktop canvas") instanceof HTMLCanvasElement,p=S.getMountUrl(e,C?.mntMap||{}),h=x.my.has(A.RT(e))||p&&!S.isMountedFolder(C?.mntMap[p]);return[{label:"Sort by",menu:[{action:()=>I("name",!0),label:"Name",toggle:"name"===s},{action:()=>I("size",!1),label:"Size",toggle:"size"===s},{action:()=>I("type",!0),label:"Item type",toggle:"type"===s},{action:()=>I("date",!1),label:"Date modified",toggle:"date"===s},x.Os,{action:()=>I("",!0),label:"Ascending",toggle:u},{action:()=>I("",!1),label:"Descending",toggle:!u}]},{action:()=>T(e),label:"Refresh"},...m?[x.Os,{label:"Background",menu:em.ov.filter(({requiresWebGPU:e})=>!e||U).reduce((e,t)=>[...e,{action:()=>{b&&eg?.(),t.id&&W(t.id)},label:t.name||t.id,toggle:t.startsWith?P.startsWith(t.id):P===t.id}],b?[{action:eg,checked:!0,label:"Music Visualization"},x.Os]:[])},...H?[{action:N,label:r?.active?"Stop screen capture":"Capture screen"}]:[]]:[],...h?[]:[x.Os,...d,{action:()=>Z("Terminal",{url:e}),label:"Open Terminal here"},x.Os,{action:()=>l(n),disabled:0===Object.keys(E).length,label:"Paste"},x.Os,{label:"New",menu:[{action:()=>G("New folder",void 0,n),icon:x.XN,label:"Folder"},x.Os,{action:()=>G("New Rich Text Document.whtml",eb.from(""),n),icon:g.sK(".whtml"),label:"Rich Text Document"},{action:()=>G("New Text Document.txt",eb.from(""),n),icon:g.sK(".txt"),label:"Text Document"}]},...m?[]:[x.Os,{action:()=>{let t=Object.keys(K.current).find(t=>t===`Properties${x.CC}${e}`);t?(K.current[t].minimized&&B(t),$(t)):Z("Properties",{url:e})},label:"Properties"}]],...m?[x.Os,{action:async()=>{if(!await v(x.AV)){let e=await fetch(document.location.href),t=eb.from(await e.arrayBuffer());await O(x.AV,t),T(c.dirname(x.AV),c.basename(x.AV))}Z("MonacoEditor",{url:x.AV}),x.AV&&z(x.AV,"MonacoEditor")},label:"View page source"},{action:()=>Z("DevTools",{url:"dom"}),label:"Inspect"}]:[]]}),[t,H,N,b,v,U,u,m,f,k,B,G,Z,E,l,K,C?.mntMap,$,W,s,V,T,z,I,e,P,O])};let ex=s()(()=>n.e(7614,"high").then(n.bind(n,57614)),{loadableGenerated:{webpack:()=>[57614]}}),eA=s()(()=>n.e(1355,"high").then(n.bind(n,71355)),{loadableGenerated:{webpack:()=>[71355]}}),ek=s()(()=>n.e(3333,"high").then(n.bind(n,33333)),{loadableGenerated:{webpack:()=>[33333]}}),eE=e=>{};var eS=(0,o.memo)(({allowMovingDraggableEntries:e,hideFolders:t,hideLoading:r,hideScrolling:a,hideShortcutIcons:l,id:s,isDesktop:u,isStartMenu:d,loadIconsImmediately:m,readOnly:f,showStatusBar:b,skipFsWatcher:g,skipSorting:h,url:v,view:w,customIcons:y=[],onFileOpen:k=eE,onFileDoubleClick:E=eE,onFileSingleClick:S=eE})=>{let[L,M]=(0,o.useState)(v),[C,O]=(0,o.useState)(""),[T,D]=(0,o.useState)(!1);(0,o.useEffect)(()=>{v!==L&&M(v)},[v,L]),(0,es.MV)(L,{logToConsole:!0}),(0,es.l$)({logToConsole:!0});let $=(0,o.useRef)(null),{focusedEntries:R,focusableEntry:j,...F}=eu($),{fileActions:z,files:P,folderActions:W,isLoading:I,updateFiles:H}=(0,ed.Z)(v,O,F,{hideFolders:t,hideLoading:r,skipFsWatcher:g,skipSorting:h}),{lstat:N,mountFs:U,rootFs:K}=(0,p.o)(),{StyledFileEntry:V,StyledFileManager:G}=Z.c[w],{isSelecting:X,selectionRect:Q,selectionStyling:_,selectionEvents:q}=ea($,R,F),Y=ei(R,F,$,X,e),ee=(0,B.Z)({callback:W.newPath,directory:v,updatePositions:e}),et=ey(v,W,u,d),er=!r&&I||v!==L,eo=ec(P,v,R,O,F,W,H,$,s,w),[el,em]=(0,o.useState)("prompt"),ef=(0,o.useRef)(!1),eb=(0,o.useMemo)(()=>""===C?eo():void 0,[eo,C]),eg=(0,o.useMemo)(()=>Object.keys(P),[P]),ep=!u&&!d&&!er&&"icon"===w&&0===eg.length;return(0,o.useEffect)(()=>{ef.current||"granted"===el||K?.mntMap[L]?.getName()!=="FileSystemAccess"||(ef.current=!0,Promise.resolve().then(n.bind(n,18575)).then(({requestPermission:e})=>e(L).then(e=>{let t="granted"===e;(!e||t)&&(em("granted"),t&&H())}).catch(e=>{e?.message==="Permission already granted"&&em("granted")}).finally(()=>{ef.current=!1})))},[L,el,K?.mntMap,H]),(0,o.useEffect)(()=>{!T&&x.my.has((0,A.RT)(v))&&(async()=>{(await N(v)).isDirectory()||D(e=>(e||U(v).then(()=>setTimeout(H,100)).catch(()=>{}),!0))})().then(()=>[])},[N,U,T,H,v]),(0,o.useEffect)(()=>{v!==L&&(W.resetFiles(),M(v),em("denied"))},[v,W]),(0,o.useEffect)(()=>{er||u||d||$.current?.focus(x.eS)},[u,d,er]),(0,i.jsxs)(i.Fragment,{children:[er?(0,i.jsx)(ek,{}):(0,i.jsxs)(i.Fragment,{children:[ep&&(0,i.jsx)(eA,{}),(0,i.jsxs)(G,{ref:$,$isEmptyFolder:ep,$scrollable:!a,onKeyDown:eb,...f?{onContextMenu:A.nK}:{$selecting:X,...ee,...et,...q},...x.LL,children:[X&&(0,i.jsx)(en,{style:_}),y.map((e,t)=>(0,i.jsx)("li",{draggable:"true",style:e.style,"data-file":e["data-file"],className:"sc-iGgVNO iPgsct",onClick:()=>{S(e["data-file"])},onDoubleClick:()=>{E(e["data-file"])},children:(0,i.jsx)("button",{"aria-label":e.iconProps["aria-label"],type:"button",className:"sc-aYaIB hErKd",title:e.iconProps.title,children:(0,i.jsxs)("figure",{className:"sc-dcJtft lflafl",children:[(0,i.jsxs)("picture",{children:[(0,i.jsx)("source",{media:"(min-resolution: 2.01x), (-webkit-min-device-pixel-ratio: 2.01)",srcSet:e.iconProps.srcSet,type:"image/webp"}),(0,i.jsx)("img",{alt:e.iconProps.alt,decoding:"async",draggable:"false",height:"48",loading:"eager",width:"48",className:"sc-gEvDqW jWxKGF",src:e.iconProps.src})]}),(0,i.jsx)("figcaption",{"aria-level":1,role:"heading",children:e.iconProps.alt})]})})},t)),eg.map(e=>(0,i.jsx)(V,{$desktop:u,$selecting:X,$visible:!I,...!f&&Y(v,e,C===e),...""===C&&{onKeyDown:eo(e)},...j(e),"data-file":e,onClick:()=>{S?.(e)},onDoubleClick:()=>{E?.(e)},children:(0,i.jsx)(J,{fileActions:z,fileManagerId:s,fileManagerRef:$,focusFunctions:F,focusedEntries:R,hasNewFolderIcon:d,hideShortcutIcon:l,isDesktop:u,isHeading:u&&P[e].systemShortcut,isLoadingFileManager:I,loadIconImmediately:m,name:(0,c.basename)(e,x.zm),path:(0,c.join)(v,e),readOnly:f,renaming:C===e,selectionRect:Q,setRenaming:O,stats:P[e],view:w,handleFileOpen:k})},e))]})]}),b&&(0,i.jsx)(ex,{count:er?0:eg.length,directory:v,fileDrop:ee,selected:R})]})})},45279:function(e,t,n){var r=n(1864),a=n(67294),i=n(59746),o=n(23736),l=n(89670),s=n(20063),c=n(58437),u=n(76488),d=n(97836),m=n(6484);t.Z=({callback:e,directory:t=d.Ll,id:n,onDragLeave:f,onDragOver:b,updatePositions:g})=>{let{url:p}=(0,c.z)(),{iconPositions:h,sortOrders:v,setIconPositions:w}=(0,u.k)(),{exists:y,mkdirRecursive:x,updateFolder:A,writeFile:k}=(0,s.o)(),E=(0,a.useCallback)(async(e,t,a)=>{if(n){if(t){let i=(0,r.join)(d.Ll,e);if(await x(d.Ll),await k(i,t,!0))return a===l.v.UPDATE_URL&&p(n,i),await A(d.Ll,e),(0,r.basename)(i)}else a===l.v.UPDATE_URL&&p(n,e)}return""},[n,x,A,p,k]),{openTransferDialog:S}=(0,i.Z)();return{onDragLeave:f,onDragOver:e=>{b?.(e),(0,m.nK)(e)},onDrop:a=>{if(!d.my.has((0,m.RT)(t))){if(g&&a.target instanceof HTMLElement){let{files:e,text:n}=(0,o.p4)(a);if(0===e.length&&""===n)return;let i={x:a.clientX,y:a.clientY},l=[];if(n){try{l=JSON.parse(n)}catch{}if(!Array.isArray(l))return;let[e]=l;if(!e||e.startsWith(t)&&(0,r.basename)(e)===(0,r.relative)(t,e))return;l=l.map(e=>(0,r.basename)(e))}else e instanceof FileList?l=[...e].map(e=>e.name):l=[...e].map(e=>e.getAsFile()?.name||"").filter(Boolean);l=l.map(e=>{if(!h[`${t}/${e}`])return e;let n=0,a="";do n+=1,a=`${t}/${(0,r.basename)(e,(0,r.extname)(e))} (${n})${(0,r.extname)(e)}`;while(h[a]);return(0,r.basename)(a)}),(0,m.vi)(t,a.target,h,v,i,l,w,y)}(0,o.WG)(a,e||E,t,S,!!n)}}}}},16854:function(e,t,n){let r=n(10508).ZP.li(["display:",";height:min-content;outline-offset:-2px;padding:2px;button{position:relative;figure{display:flex;flex-direction:column;margin-bottom:-2px;place-items:center;figcaption{color:",";font-size:",";line-height:1.2;margin:1px 0;padding:2px 0;text-shadow:",";word-break:break-word;}picture{height:",";width:",";&:not(:first-of-type){position:absolute;img{position:absolute;}}}}}&:hover{background-color:",";outline:",";}&.focus-within{background-color:",";outline:",";z-index:1;&.only-focused{margin-bottom:-1000px;}&:hover{background-color:",";outline:",";}}"],({$visible:e})=>e?"flex":"none",({theme:e})=>e.colors.fileEntry.text,({theme:e})=>e.sizes.fileEntry.fontSize,({$desktop:e,theme:t})=>e?t.colors.fileEntry.textShadow:void 0,({theme:e})=>e.sizes.fileEntry.iconSize,({theme:e})=>e.sizes.fileEntry.iconSize,({theme:e})=>e.colors.fileEntry.background,({$desktop:e,theme:t})=>e?`1px solid ${t.colors.fileEntry.border}`:void 0,({theme:e})=>e.colors.fileEntry.backgroundFocused,({$desktop:e,theme:t})=>e?`1px solid ${t.colors.fileEntry.borderFocused}`:void 0,({theme:e,$selecting:t})=>t?e.colors.fileEntry.backgroundFocused:e.colors.fileEntry.backgroundFocusedHover,({$desktop:e,theme:t})=>e?`1px solid ${t.colors.fileEntry.borderFocusedHover}`:void 0);t.Z=r},52547:function(e,t,n){var r=n(10508),a=n(18680),i=n(97836);let o=r.ZP.ol(["",";contain:strict;display:grid;gap:",";grid-auto-flow:row;grid-template-columns:",";grid-template-rows:",";height:100%;overflow:",";padding:",";place-content:flex-start;pointer-events:",";main > &{grid-auto-flow:column;height:calc(100% - ","px);overflow:visible;padding-bottom:21px;}"],({$scrollable:e})=>e?(0,a.Z)():void 0,({theme:e})=>`${e.sizes.fileManager.rowGap} ${e.sizes.fileManager.columnGap}`,({theme:e})=>`repeat(auto-fill, ${e.sizes.fileManager.gridEntryWidth})`,({theme:e})=>`repeat(auto-fill, ${e.sizes.fileManager.gridEntryHeight})`,({$isEmptyFolder:e,$scrollable:t})=>!e&&t?void 0:"hidden",({theme:e})=>e.sizes.fileManager.padding,({$selecting:e})=>e?"auto":void 0,i.bK);t.Z=o},73071:function(e,t,n){let r=n(10508).ZP.li(["display:flex;flex-direction:column;figure{display:flex;height:36px;padding-bottom:1px;padding-left:1px;place-items:center;figcaption{color:#fff;}picture{margin-left:3px;margin-right:8px;}svg{fill:rgb(210,210,210);height:8px;margin-left:auto;margin-right:8px;pointer-events:none;width:8px;}picture,svg{transition:margin 0.25s ease-out;}&:active{figcaption{letter-spacing:-0.15px;opacity:90%;}picture{margin-left:7px;}svg{margin-right:12px;}picture,svg{transition:none;}}@media (pointer:fine){&:hover{background-color:hsla(0,0%,35%,70%);}}@media (pointer:coarse){&:active{background-color:hsla(0,0%,35%,70%);border:1px solid hsla(0,0%,45%,70%);}}}"]);t.Z=r},8833:function(e,t,n){let r=n(10508).ZP.ol(["margin-top:7px;width:100%;picture:not(:first-of-type){position:absolute;}"]);t.Z=r},10511:function(e,t,n){n.d(t,{c:function(){return l},k:function(){return s}});var r=n(16854),a=n(52547),i=n(73071),o=n(8833);let l={icon:{StyledFileEntry:r.Z,StyledFileManager:a.Z},list:{StyledFileEntry:i.Z,StyledFileManager:o.Z}},s={icon:{imgSize:48},list:{displaySize:24,imgSize:48},sub:{displaySize:48,imgSize:16}}},9054:function(e,t,n){n.d(t,{MV:function(){return i},Xi:function(){return o},l$:function(){return l}});var r=n(67294);let a=(e,t)=>{t?.logToConsole},i=(e,t)=>{let n=(0,r.useRef)(null),i=(0,r.useRef)(new Set),o=(0,r.useRef)(!1);(0,r.useEffect)(()=>{o.current?e&&(e!==n.current||"/"===e)&&(i.current.has(e)||(a(`Folder opened ${e}`,t),i.current.add(e)),n.current=e):o.current=!0},[e,t])},o=e=>{let t=(0,r.useRef)();t.current||(t.current=e=>{let{clientX:t,clientY:n,button:r,detail:a,target:i}=e;i instanceof HTMLElement&&i.tagName}),(0,r.useEffect)(()=>{if(t.current){let e=t.current;return document.addEventListener("click",e),()=>document.removeEventListener("click",e)}return()=>{}},[])},l=e=>{(0,r.useEffect)(()=>{let t=()=>a("File cut",e),n=()=>a("File copied",e),r=()=>a("File pasted",e),i=()=>a("File deleted",e),o=e=>{"Delete"===e.key?i():e.ctrlKey&&"c"===e.key.toLowerCase()?n():e.ctrlKey&&"x"===e.key.toLowerCase()?t():e.ctrlKey&&"v"===e.key.toLowerCase()&&r()},l=e=>{e.composedPath().forEach(e=>{if(e instanceof HTMLElement&&e.classList.contains("context-menu-item")){let a=e.textContent?.toLowerCase();a?.includes("cut")?t():a?.includes("copy")?n():a?.includes("paste")?r():a?.includes("delete")&&i()}})},s=t=>{t.preventDefault(),a("Right click",e)},c=t=>{a("File drag started",e)},u=t=>{a("File dragged over",e)};return document.addEventListener("cut",t),document.addEventListener("copy",n),document.addEventListener("paste",r),document.addEventListener("keydown",o),document.addEventListener("click",l),document.addEventListener("contextmenu",s),document.addEventListener("dragstart",c),document.addEventListener("dragover",u),()=>{document.removeEventListener("cut",t),document.removeEventListener("copy",n),document.removeEventListener("paste",r),document.removeEventListener("keydown",o),document.removeEventListener("click",l),document.removeEventListener("contextmenu",s),document.removeEventListener("dragstart",c),document.removeEventListener("dragover",u)}},[e])}},24645:function(e,t,n){var r=n(67294),a=n(97836);t.Z=(e,t=!1)=>{let n=(0,r.useRef)(),i=(0,r.useRef)(0);return{onClick:(0,r.useCallback)(r=>{let o=()=>{r.stopPropagation(),e(r)},l=()=>{n.current&&(clearTimeout(n.current),n.current=void 0)},s=()=>{i.current>=12&&l(),void 0===n.current?(r.target.removeEventListener("pointermove",s),i.current=0):i.current+=1};t?o():void 0===n.current?(n.current=window.setTimeout(l,a.jx.DOUBLE_CLICK),r.target.addEventListener("pointermove",s,{passive:!0})):(l(),o())},[e,t])}}},78848:function(e,t,n){n.d(t,{O:function(){return i}});var r=n(67294),a=n(97836);let i=(e,t,n=!1)=>{let i=(0,r.useRef)(!1),[o,l]=(0,r.useState)(n);return(0,r.useEffect)(()=>{n||!e.current||i.current||(i.current=!0,new IntersectionObserver(e=>e.forEach(({isIntersecting:e})=>l(e)),{root:"object"==typeof t&&t.current||"string"==typeof t&&e.current.closest(t)||e.current.parentElement,...a.e5}).observe(e.current))},[n,e,t]),o}},48611:function(e,t,n){n.d(t,{Z:function(){return i}});var r=n(67294);let a=async()=>{let e;if("undefined"==typeof navigator||!("gpu"in navigator))return!1;try{e=await navigator.gpu.requestAdapter()}catch{return!1}return!!e&&!(1073741824>(e.limits.maxBufferSize??0)||1073741824>(e.limits.maxStorageBufferBindingSize??0)||32768>(e.limits.maxComputeWorkgroupStorageSize??0))},i=()=>{let[e,t]=(0,r.useState)(),n=(0,r.useCallback)(async()=>t(await a()),[]);return(0,r.useEffect)(()=>{n()},[n]),e}},18680:function(e,t,n){n.d(t,{Z:function(){return o}});var r=n(10508),a=n(97836);let i={dark:{active:"rgb(166, 166, 166)",blendMode:"color-burn",buttonHover:"rgb(55, 55, 55)",thumb:"rgb(77, 77, 77)",thumbHover:"rgb(122, 122, 122)",track:"rgb(23, 23, 23)"},light:{active:"rgb(96, 96, 96)",blendMode:"color-dodge",buttonHover:"rgb(218, 218, 218)",thumb:"rgb(205, 205, 205)",thumbHover:"rgb(166, 166, 166)",track:"rgb(240, 240, 240)"}};var o=(e=a.BQ,t=0,n=0,o="dark")=>(0,r.iv)(["overflow:auto;scrollbar-gutter:stable;@supports not selector(::-webkit-scrollbar){scrollbar-color:"," ",";}&::-webkit-scrollbar{height:","px;width:","px;}&::-webkit-scrollbar-corner,&::-webkit-scrollbar-track{background-color:",";}&::-webkit-scrollbar-thumb{background-clip:padding-box;background-color:",";}&::-webkit-scrollbar-thumb:vertical{background-clip:padding-box;background-color:",";border-left:1px solid transparent;border-right:1px solid transparent;}&::-webkit-scrollbar-thumb:horizontal{border-bottom:1px solid transparent;border-top:1px solid transparent;}&::-webkit-scrollbar-thumb:hover{background-color:",";}&::-webkit-scrollbar-thumb:active{background-color:",";}&::-webkit-scrollbar-button:single-button{background-clip:padding-box;background-color:",";background-position:center 4px;background-repeat:no-repeat;background-size:10px;border:1px solid ",";display:block;height:",";&:hover{background-color:",";}&:active{background-color:",";}}&::-webkit-scrollbar-button:single-button:vertical:decrement,&::-webkit-scrollbar-button:single-button:vertical:increment{background-position-x:",";background-position-y:",";background-size:16px;border-bottom:0;border-top:0;image-rendering:pixelated;}&::-webkit-scrollbar-button:single-button:vertical:decrement{background-image:url(",");}&::-webkit-scrollbar-button:single-button:vertical:increment{background-image:url(",");}&::-webkit-scrollbar-button:single-button:horizontal:decrement,&::-webkit-scrollbar-button:single-button:horizontal:increment{background-position:center;background-size:16px;border-left:0;border-right:0;image-rendering:pixelated;}&::-webkit-scrollbar-button:single-button:horizontal:decrement{background-image:url(",");}&::-webkit-scrollbar-button:single-button:horizontal:increment{background-image:url(",");}&::-webkit-scrollbar-button:single-button:vertical:decrement:active,&::-webkit-scrollbar-button:single-button:vertical:increment:active,&::-webkit-scrollbar-button:single-button:horizontal:decrement:active,&::-webkit-scrollbar-button:single-button:horizontal:increment:active{background-blend-mode:",";}"],i[o].thumb,i[o].track,e,e,i[o].track,i[o].thumb,i[o].thumb,i[o].thumbHover,i[o].active,i[o].track,i[o].track,e?`${e}px`:"initial",i[o].buttonHover,i[o].active,0===t?"center":`${t}px`,0===n?"center":`${n}px`,"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAKElEQVR42mOgMRgF6enp/ynSDMMUaEZgsjST5RJsikk2AKc4bcAoAADI7y5FsB5j/QAAAABJRU5ErkJggg==","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAK0lEQVR42mOgARgF6enp/0kRZ8KvGMEnyQUwjMwn0xBMzWQZQlmA0h6MAgAuqCnfdOk/ZQAAAABJRU5ErkJggg==","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAG0lEQVR42mPAD0ZBenr6fxge4ppHuiGEwSgAAGJiLkXUVlYDAAAAAElFTkSuQmCC","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAG0lEQVR42mPADkZBenr6fxgeZoYMV82Ug1EAAPiTLkWjutmQAAAAAElFTkSuQmCC",i[o].blendMode)},76833:function(e,t,n){n.d(t,{G:function(){return i}});let r={capture:!0,passive:!0},a={capture:!1,passive:!0},i=(e,t=!1,n=1,i=!1)=>{e&&requestAnimationFrame(()=>{let o=()=>{t||(e.style.background=""),e.style.borderImage=""};if(t){let t=({clientX:a,clientY:l})=>{if(e.isConnected){let{x:t,y:r}=e.getBoundingClientRect(),o=i&&document.elementFromPoint(a,l)===e;e.style.borderImage=`radial-gradient(75px at ${a-t}px ${l-r}px, rgba(${o?"255, 255, 255, 80%":"200, 200, 200, 60%"}), transparent) 1 / ${n}px / 0 stretch`}else document.removeEventListener("mousemove",t,r),document.removeEventListener("mouseleave",o,r)};document.addEventListener("mousemove",t,r),document.addEventListener("mouseleave",o,r)}else e.addEventListener("mousemove",({offsetX:t,offsetY:r})=>{e.style.background=`radial-gradient(circle at ${t}px ${r}px, rgba(200, 200, 200, 30%), transparent)`,e.style.borderImage=`radial-gradient(75px at ${t}px ${r}px, rgba(200, 200, 200, 60%), transparent) 1 / ${n}px / 0 stretch`},a),e.addEventListener("mouseleave",o,a)})}}}]);