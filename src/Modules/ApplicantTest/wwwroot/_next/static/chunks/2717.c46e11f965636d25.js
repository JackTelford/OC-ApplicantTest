(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
    [2717],
    {
        90266: function (t, e, n) {
            let { xmlLexer: r } = n(11050),
                { xmlParser: o } = n(73515);
            t.exports = {
                parse: function (t) {
                    let e = r.tokenize(t);
                    return (o.input = e.tokens), { cst: o.document(), tokenVector: e.tokens, lexErrors: e.errors, parseErrors: o.errors };
                },
                BaseXmlCstVisitor: o.getBaseCstVisitorConstructor(),
            };
        },
        11050: function (t, e, n) {
            let { createToken: r, Lexer: o } = n(12786),
                i = {};
            function u(t, e) {
                i[t] = "string" == typeof e ? e : e.source;
            }
            function a(t, ...e) {
                let n = "";
                for (let r = 0; r < t.length; r++)
                    if (((n += t[r]), r < e.length)) {
                        let t = e[r];
                        n += `(?:${t})`;
                    }
                return new RegExp(n);
            }
            let s = [],
                c = {};
            function l(t) {
                let e = r(t);
                return s.push(e), (c[t.name] = e), e;
            }
            u("NameStartChar", "(:|[a-zA-Z]|_|\\u2070-\\u218F|\\u2C00-\\u2FEF|\\u3001-\\uD7FF|\\uF900-\\uFDCF|\\uFDF0-\\uFFFD)"),
                u("NameChar", a`${i.NameStartChar}|-|\\.|\\d|\\u00B7||[\\u0300-\\u036F]|[\\u203F-\\u2040]`),
                u("Name", a`${i.NameStartChar}(${i.NameChar})*`);
            let p = l({ name: "Comment", pattern: /<!--(.|\r?\n)*?-->/, line_breaks: !0 }),
                f = l({ name: "CData", pattern: /<!\[CDATA\[(.|\r?\n)*?]]>/, line_breaks: !0 }),
                h = l({ name: "DocType", pattern: /<!DOCTYPE/, push_mode: "INSIDE" }),
                D = l({ name: "DTD", pattern: /<!.*?>/, group: o.SKIPPED }),
                d = l({ name: "EntityRef", pattern: a`&${i.Name};` }),
                E = l({ name: "CharRef", pattern: /&#\d+;|&#x[a-fA-F0-9]/ }),
                m = l({ name: "SEA_WS", pattern: /( |\t|\n|\r\n)+/ }),
                y = l({ name: "XMLDeclOpen", pattern: /<\?xml[ \t\r\n]/, push_mode: "INSIDE" }),
                F = l({ name: "SLASH_OPEN", pattern: /<\//, push_mode: "INSIDE" }),
                C = l({ name: "INVALID_SLASH_OPEN", pattern: /<\//, categories: [F] }),
                g = l({ name: "PROCESSING_INSTRUCTION", pattern: a`<\\?${i.Name}.*\\?>` }),
                v = l({ name: "OPEN", pattern: /</, push_mode: "INSIDE" }),
                T = l({ name: "INVALID_OPEN_INSIDE", pattern: /</, categories: [v] }),
                A = l({ name: "TEXT", pattern: /[^<&]+/ }),
                I = l({ name: "CLOSE", pattern: />/, pop_mode: !0 }),
                S = l({ name: "SPECIAL_CLOSE", pattern: /\?>/, pop_mode: !0 }),
                R = l({ name: "SLASH_CLOSE", pattern: /\/>/, pop_mode: !0 }),
                N = l({ name: "SLASH", pattern: /\// }),
                O = l({ name: "STRING", pattern: /"[^<"]*"|'[^<']*'/ }),
                x = l({ name: "EQUALS", pattern: /=/ }),
                L = l({ name: "Name", pattern: a`${i.Name}` }),
                k = l({ name: "S", pattern: /[ \t\r\n]/, group: o.SKIPPED }),
                _ = new o(
                    { defaultMode: "OUTSIDE", modes: { OUTSIDE: [p, f, h, D, d, E, m, y, F, g, v, A], INSIDE: [p, C, T, I, S, R, N, x, O, L, k] } },
                    { positionTracking: "full", ensureOptimizations: !1, lineTerminatorCharacters: ["\n"], lineTerminatorsPattern: /\n|\r\n/g }
                );
            t.exports = { xmlLexer: _, tokensDictionary: c };
        },
        73515: function (t, e, n) {
            let { CstParser: r, tokenMatcher: o } = n(12786),
                { tokensDictionary: i } = n(11050);
            class u extends r {
                constructor() {
                    super(i, { maxLookahead: 1, recoveryEnabled: !0, nodeLocationTracking: "full" }), (this.deletionRecoveryEnabled = !0);
                    let t = this;
                    t.RULE("document", () => {
                        t.OPTION(() => {
                            t.SUBRULE(t.prolog);
                        }),
                            t.MANY(() => {
                                t.SUBRULE(t.misc);
                            }),
                            t.OPTION2(() => {
                                t.SUBRULE(t.docTypeDecl);
                            }),
                            t.MANY2(() => {
                                t.SUBRULE2(t.misc);
                            }),
                            t.SUBRULE(t.element),
                            t.MANY3(() => {
                                t.SUBRULE3(t.misc);
                            });
                    }),
                        t.RULE("prolog", () => {
                            t.CONSUME(i.XMLDeclOpen),
                                t.MANY(() => {
                                    t.SUBRULE(t.attribute);
                                }),
                                t.CONSUME(i.SPECIAL_CLOSE);
                        }),
                        t.RULE("docTypeDecl", () => {
                            t.CONSUME(i.DocType),
                                t.CONSUME(i.Name),
                                t.OPTION(() => {
                                    t.SUBRULE(t.externalID);
                                }),
                                t.CONSUME(i.CLOSE);
                        }),
                        t.RULE("externalID", () => {
                            t.OR([
                                {
                                    GATE: () => "SYSTEM" === t.LA(1).image,
                                    ALT: () => {
                                        t.CONSUME2(i.Name, { LABEL: "System" }), t.CONSUME(i.STRING, { LABEL: "SystemLiteral" });
                                    },
                                },
                                {
                                    GATE: () => "PUBLIC" === t.LA(1).image,
                                    ALT: () => {
                                        t.CONSUME3(i.Name, { LABEL: "Public" }), t.CONSUME2(i.STRING, { LABEL: "PubIDLiteral" }), t.CONSUME3(i.STRING, { LABEL: "SystemLiteral" });
                                    },
                                },
                            ]);
                        }),
                        t.RULE("content", () => {
                            t.MANY(() => {
                                t.OR([
                                    { ALT: () => t.SUBRULE(t.element) },
                                    { ALT: () => t.SUBRULE(t.chardata) },
                                    { ALT: () => t.SUBRULE(t.reference) },
                                    { ALT: () => t.CONSUME(i.CData) },
                                    { ALT: () => t.CONSUME(i.PROCESSING_INSTRUCTION) },
                                    { ALT: () => t.CONSUME(i.Comment) },
                                ]);
                            });
                        }),
                        t.RULE("element", () => {
                            t.CONSUME(i.OPEN);
                            try {
                                (this.deletionRecoveryEnabled = !1), t.CONSUME(i.Name);
                            } finally {
                                this.deletionRecoveryEnabled = !0;
                            }
                            t.MANY(() => {
                                t.SUBRULE(t.attribute);
                            }),
                                t.OR([
                                    {
                                        ALT: () => {
                                            t.CONSUME(i.CLOSE, { LABEL: "START_CLOSE" }), t.SUBRULE(t.content), t.CONSUME(i.SLASH_OPEN), t.CONSUME2(i.Name, { LABEL: "END_NAME" }), t.CONSUME2(i.CLOSE, { LABEL: "END" });
                                        },
                                    },
                                    {
                                        ALT: () => {
                                            t.CONSUME(i.SLASH_CLOSE);
                                        },
                                    },
                                ]);
                        }),
                        t.RULE("reference", () => {
                            t.OR([{ ALT: () => t.CONSUME(i.EntityRef) }, { ALT: () => t.CONSUME(i.CharRef) }]);
                        }),
                        t.RULE("attribute", () => {
                            t.CONSUME(i.Name);
                            try {
                                (this.deletionRecoveryEnabled = !1), t.CONSUME(i.EQUALS), t.CONSUME(i.STRING);
                            } finally {
                                this.deletionRecoveryEnabled = !0;
                            }
                        }),
                        t.RULE("chardata", () => {
                            t.OR([{ ALT: () => t.CONSUME(i.TEXT) }, { ALT: () => t.CONSUME(i.SEA_WS) }]);
                        }),
                        t.RULE("misc", () => {
                            t.OR([{ ALT: () => t.CONSUME(i.Comment) }, { ALT: () => t.CONSUME(i.PROCESSING_INSTRUCTION) }, { ALT: () => t.CONSUME(i.SEA_WS) }]);
                        }),
                        this.performSelfAnalysis();
                }
                canRecoverWithSingleTokenDeletion(t) {
                    return !1 !== this.deletionRecoveryEnabled && super.canRecoverWithSingleTokenDeletion(t);
                }
                findReSyncTokenType() {
                    let t = this.flattenFollowSet(),
                        e = this.LA(1),
                        n = 2;
                    for (; ;) {
                        let r = t.find((t) => o(e, t));
                        if (void 0 !== r) return r;
                        (e = this.LA(n)), n++;
                    }
                }
            }
            let a = new u();
            t.exports = { xmlParser: a };
        },
        12786: function (t, e, n) {
            "use strict";
            n.r(e),
                n.d(e, {
                    Alternation: function () {
                        return tP;
                    },
                    Alternative: function () {
                        return tO;
                    },
                    CstParser: function () {
                        return nr;
                    },
                    EMPTY_ALT: function () {
                        return ne;
                    },
                    EOF: function () {
                        return tv;
                    },
                    EarlyExitException: function () {
                        return eL;
                    },
                    EmbeddedActionsParser: function () {
                        return no;
                    },
                    GAstVisitor: function () {
                        return tG;
                    },
                    Lexer: function () {
                        return ts;
                    },
                    LexerDefinitionErrorType: function () {
                        return y;
                    },
                    MismatchedTokenException: function () {
                        return eN;
                    },
                    NoViableAltException: function () {
                        return eO;
                    },
                    NonTerminal: function () {
                        return tR;
                    },
                    NotAllInputParsedException: function () {
                        return ex;
                    },
                    Option: function () {
                        return tx;
                    },
                    Parser: function () {
                        return nD;
                    },
                    ParserDefinitionErrorType: function () {
                        return g;
                    },
                    Repetition: function () {
                        return t_;
                    },
                    RepetitionMandatory: function () {
                        return tL;
                    },
                    RepetitionMandatoryWithSeparator: function () {
                        return tk;
                    },
                    RepetitionWithSeparator: function () {
                        return tb;
                    },
                    Rule: function () {
                        return tN;
                    },
                    Terminal: function () {
                        return tM;
                    },
                    VERSION: function () {
                        return v;
                    },
                    assignOccurrenceIndices: function () {
                        return eF;
                    },
                    clearCache: function () {
                        return nh;
                    },
                    createSyntaxDiagramsCode: function () {
                        return ni;
                    },
                    createToken: function () {
                        return tC;
                    },
                    createTokenInstance: function () {
                        return tT;
                    },
                    defaultGrammarResolverErrorProvider: function () {
                        return tJ;
                    },
                    defaultGrammarValidatorErrorProvider: function () {
                        return tZ;
                    },
                    defaultLexerErrorProvider: function () {
                        return tu;
                    },
                    defaultParserErrorProvider: function () {
                        return tq;
                    },
                    generateParserFactory: function () {
                        return np;
                    },
                    generateParserModule: function () {
                        return nf;
                    },
                    isRecognitionException: function () {
                        return eS;
                    },
                    resolveGrammar: function () {
                        return em;
                    },
                    serializeGrammar: function () {
                        return tB;
                    },
                    serializeProduction: function () {
                        return tw;
                    },
                    tokenLabel: function () {
                        return tc;
                    },
                    tokenMatcher: function () {
                        return tA;
                    },
                    tokenName: function () {
                        return tl;
                    },
                    validateGrammar: function () {
                        return ey;
                    },
                });
            var r,
                o,
                i,
                u,
                a,
                s,
                c,
                l,
                p,
                f,
                h,
                D,
                d,
                E,
                m,
                y,
                F,
                C,
                g,
                v = "7.1.1",
                T = n(75465),
                A = n(94556),
                I = {},
                S = new A.RegExpParser();
            function R(t) {
                var e = t.toString();
                if (I.hasOwnProperty(e)) return I[e];
                var n = S.pattern(e);
                return (I[e] = n), n;
            }
            var N =
                ((r = function (t, e) {
                    return (r =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                            function (t, e) {
                                t.__proto__ = e;
                            }) ||
                        function (t, e) {
                            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                        })(t, e);
                }),
                    function (t, e) {
                        function n() {
                            this.constructor = t;
                        }
                        r(t, e), (t.prototype = null === e ? Object.create(e) : ((n.prototype = e.prototype), new n()));
                    }),
                O = "Complement Sets are not supported for first char optimization",
                x = 'Unable to use "first char" lexer optimizations:\n';
            function L(t, e, n) {
                var r = Q(t);
                (e[r] = r),
                    !0 === n &&
                    (function (t, e) {
                        var n = String.fromCharCode(t),
                            r = n.toUpperCase();
                        if (r !== n) {
                            var o = Q(r.charCodeAt(0));
                            e[o] = o;
                        } else {
                            var i = n.toLowerCase();
                            if (i !== n) {
                                var o = Q(i.charCodeAt(0));
                                e[o] = o;
                            }
                        }
                    })(t, e);
            }
            function k(t, e) {
                return (0, T.sE)(t.value, function (t) {
                    return "number" == typeof t
                        ? (0, T.r3)(e, t)
                        : void 0 !==
                        (0, T.sE)(e, function (e) {
                            return t.from <= e && e <= t.to;
                        });
                });
            }
            var _ = (function (t) {
                function e(e) {
                    var n = t.call(this) || this;
                    return (n.targetCharCodes = e), (n.found = !1), n;
                }
                return (
                    N(e, t),
                    (e.prototype.visitChildren = function (e) {
                        if (!0 !== this.found) {
                            switch (e.type) {
                                case "Lookahead":
                                    this.visitLookahead(e);
                                    return;
                                case "NegativeLookahead":
                                    this.visitNegativeLookahead(e);
                                    return;
                            }
                            t.prototype.visitChildren.call(this, e);
                        }
                    }),
                    (e.prototype.visitCharacter = function (t) {
                        (0, T.r3)(this.targetCharCodes, t.value) && (this.found = !0);
                    }),
                    (e.prototype.visitSet = function (t) {
                        t.complement ? void 0 === k(t, this.targetCharCodes) && (this.found = !0) : void 0 !== k(t, this.targetCharCodes) && (this.found = !0);
                    }),
                    e
                );
            })(A.BaseRegExpVisitor);
            function b(t, e) {
                if (!(e instanceof RegExp))
                    return (
                        void 0 !==
                        (0, T.sE)(e, function (e) {
                            return (0, T.r3)(t, e.charCodeAt(0));
                        })
                    );
                var n = R(e),
                    r = new _(t);
                return r.visit(n), r.found;
            }
            var P =
                ((o = function (t, e) {
                    return (o =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                            function (t, e) {
                                t.__proto__ = e;
                            }) ||
                        function (t, e) {
                            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                        })(t, e);
                }),
                    function (t, e) {
                        function n() {
                            this.constructor = t;
                        }
                        o(t, e), (t.prototype = null === e ? Object.create(e) : ((n.prototype = e.prototype), new n()));
                    }),
                M = "PATTERN",
                B = "defaultMode",
                w = "modes",
                U = "boolean" == typeof RegExp("(?:)").sticky,
                j = /[^\\][\$]/,
                G = /[^\\[][\^]|^\^/;
            function W(t) {
                var e = t.ignoreCase ? "i" : "";
                return RegExp("^(?:" + t.source + ")", e);
            }
            function V(t) {
                var e = t.ignoreCase ? "iy" : "y";
                return RegExp("" + t.source, e);
            }
            function K(t) {
                var e = t.PATTERN;
                if ((0, T.Kj)(e)) return !1;
                if ((0, T.mf)(e) || (0, T.e$)(e, "exec")) return !0;
                if ((0, T.HD)(e)) return !1;
                throw Error("non exhaustive match");
            }
            function H(t) {
                return !!(0, T.HD)(t) && 1 === t.length && t.charCodeAt(0);
            }
            var $ = {
                test: function (t) {
                    for (var e = t.length, n = this.lastIndex; n < e; n++) {
                        var r = t.charCodeAt(n);
                        if (10 === r) return (this.lastIndex = n + 1), !0;
                        if (13 === r) return 10 === t.charCodeAt(n + 1) ? (this.lastIndex = n + 2) : (this.lastIndex = n + 1), !0;
                    }
                    return !1;
                },
                lastIndex: 0,
            };
            function Y(t, e) {
                if ((0, T.e$)(t, "LINE_BREAKS")) return !1;
                if ((0, T.Kj)(t.PATTERN)) {
                    try {
                        b(e, t.PATTERN);
                    } catch (t) {
                        return { issue: y.IDENTIFY_TERMINATOR, errMsg: t.message };
                    }
                    return !1;
                }
                if ((0, T.HD)(t.PATTERN)) return !1;
                if (K(t)) return { issue: y.CUSTOM_LINE_BREAK };
                throw Error("non exhaustive match");
            }
            function X(t) {
                return (0, T.UI)(t, function (t) {
                    return (0, T.HD)(t) && t.length > 0 ? t.charCodeAt(0) : t;
                });
            }
            function z(t, e, n) {
                void 0 === t[e] ? (t[e] = [n]) : t[e].push(n);
            }
            function Q(t) {
                return t < 256 ? t : q[t];
            }
            var q = [];
            function J(t, e) {
                var n = t.tokenTypeIdx;
                return n === e.tokenTypeIdx || (!0 === e.isParent && !0 === e.categoryMatchesMap[n]);
            }
            function Z(t, e) {
                return t.tokenTypeIdx === e.tokenTypeIdx;
            }
            var tt = 1,
                te = {};
            function tn(t) {
                var e = (function (t) {
                    for (var e = (0, T.Qw)(t), n = t, r = !0; r;) {
                        n = (0, T.oA)(
                            (0, T.xH)(
                                (0, T.UI)(n, function (t) {
                                    return t.CATEGORIES;
                                })
                            )
                        );
                        var o = (0, T.e5)(n, e);
                        (e = e.concat(o)), (0, T.xb)(o) ? (r = !1) : (n = o);
                    }
                    return e;
                })(t);
                (0, T.Ed)(e, function (t) {
                    tr(t) || ((te[tt] = t), (t.tokenTypeIdx = tt++)),
                        to(t) && !(0, T.kJ)(t.CATEGORIES) && (t.CATEGORIES = [t.CATEGORIES]),
                        to(t) || (t.CATEGORIES = []),
                        (0, T.e$)(t, "categoryMatches") || (t.categoryMatches = []),
                        (0, T.e$)(t, "categoryMatchesMap") || (t.categoryMatchesMap = {});
                }),
                    (0, T.Ed)(e, function (t) {
                        (function t(e, n) {
                            (0, T.Ed)(e, function (t) {
                                n.categoryMatchesMap[t.tokenTypeIdx] = !0;
                            }),
                                (0, T.Ed)(n.CATEGORIES, function (r) {
                                    var o = e.concat(n);
                                    (0, T.r3)(o, r) || t(o, r);
                                });
                        })([], t);
                    }),
                    (0, T.Ed)(e, function (t) {
                        (t.categoryMatches = []),
                            (0, T.Ed)(t.categoryMatchesMap, function (e, n) {
                                t.categoryMatches.push(te[n].tokenTypeIdx);
                            });
                    }),
                    (0, T.Ed)(e, function (t) {
                        t.isParent = t.categoryMatches.length > 0;
                    });
            }
            function tr(t) {
                return (0, T.e$)(t, "tokenTypeIdx");
            }
            function to(t) {
                return (0, T.e$)(t, "CATEGORIES");
            }
            function ti(t) {
                return (0, T.e$)(t, "tokenTypeIdx");
            }
            var tu = {
                buildUnableToPopLexerModeMessage: function (t) {
                    return "Unable to pop Lexer Mode after encountering Token ->" + t.image + "<- The Mode Stack is empty";
                },
                buildUnexpectedCharactersMessage: function (t, e, n, r, o) {
                    return "unexpected character: ->" + t.charAt(e) + "<- at offset: " + e + ", skipped " + n + " characters.";
                },
            };
            ((i = y || (y = {}))[(i.MISSING_PATTERN = 0)] = "MISSING_PATTERN"),
                (i[(i.INVALID_PATTERN = 1)] = "INVALID_PATTERN"),
                (i[(i.EOI_ANCHOR_FOUND = 2)] = "EOI_ANCHOR_FOUND"),
                (i[(i.UNSUPPORTED_FLAGS_FOUND = 3)] = "UNSUPPORTED_FLAGS_FOUND"),
                (i[(i.DUPLICATE_PATTERNS_FOUND = 4)] = "DUPLICATE_PATTERNS_FOUND"),
                (i[(i.INVALID_GROUP_TYPE_FOUND = 5)] = "INVALID_GROUP_TYPE_FOUND"),
                (i[(i.PUSH_MODE_DOES_NOT_EXIST = 6)] = "PUSH_MODE_DOES_NOT_EXIST"),
                (i[(i.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE = 7)] = "MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE"),
                (i[(i.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY = 8)] = "MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY"),
                (i[(i.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST = 9)] = "MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST"),
                (i[(i.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED = 10)] = "LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED"),
                (i[(i.SOI_ANCHOR_FOUND = 11)] = "SOI_ANCHOR_FOUND"),
                (i[(i.EMPTY_MATCH_PATTERN = 12)] = "EMPTY_MATCH_PATTERN"),
                (i[(i.NO_LINE_BREAKS_FLAGS = 13)] = "NO_LINE_BREAKS_FLAGS"),
                (i[(i.UNREACHABLE_PATTERN = 14)] = "UNREACHABLE_PATTERN"),
                (i[(i.IDENTIFY_TERMINATOR = 15)] = "IDENTIFY_TERMINATOR"),
                (i[(i.CUSTOM_LINE_BREAK = 16)] = "CUSTOM_LINE_BREAK");
            var ta = {
                deferDefinitionErrorsHandling: !1,
                positionTracking: "full",
                lineTerminatorsPattern: /\n|\r\n?/g,
                lineTerminatorCharacters: ["\n", "\r"],
                ensureOptimizations: !1,
                safeMode: !1,
                errorMessageProvider: tu,
                traceInitPerf: !1,
                skipValidations: !1,
            };
            Object.freeze(ta);
            var ts = (function () {
                function t(t, e) {
                    var n = this;
                    if (
                        (void 0 === e && (e = ta),
                            (this.lexerDefinition = t),
                            (this.lexerDefinitionErrors = []),
                            (this.lexerDefinitionWarning = []),
                            (this.patternIdxToConfig = {}),
                            (this.charCodeToPatternIdxToConfig = {}),
                            (this.modes = []),
                            (this.emptyGroups = {}),
                            (this.config = void 0),
                            (this.trackStartLines = !0),
                            (this.trackEndLines = !0),
                            (this.hasCustom = !1),
                            (this.canModeBeOptimized = {}),
                            "boolean" == typeof e)
                    )
                        throw Error("The second argument to the Lexer constructor is now an ILexerConfig Object.\na boolean 2nd argument is no longer supported");
                    this.config = (0, T.TS)(ta, e);
                    var r = this.config.traceInitPerf;
                    !0 === r ? ((this.traceInitMaxIdent = 1 / 0), (this.traceInitPerf = !0)) : "number" == typeof r && ((this.traceInitMaxIdent = r), (this.traceInitPerf = !0)),
                        (this.traceInitIndent = -1),
                        this.TRACE_INIT("Lexer Constructor", function () {
                            var r,
                                o = !0;
                            n.TRACE_INIT("Lexer Config handling", function () {
                                if (n.config.lineTerminatorsPattern === ta.lineTerminatorsPattern) n.config.lineTerminatorsPattern = $;
                                else if (n.config.lineTerminatorCharacters === ta.lineTerminatorCharacters)
                                    throw Error("Error: Missing <lineTerminatorCharacters> property on the Lexer config.\n	For details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS");
                                if (e.safeMode && e.ensureOptimizations) throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');
                                (n.trackStartLines = /full|onlyStart/i.test(n.config.positionTracking)),
                                    (n.trackEndLines = /full/i.test(n.config.positionTracking)),
                                    (0, T.kJ)(t) ? (((r = { modes: {} }).modes[B] = (0, T.Qw)(t)), (r[B] = B)) : ((o = !1), (r = (0, T.Cl)(t)));
                            }),
                                !1 === n.config.skipValidations &&
                                (n.TRACE_INIT("performRuntimeChecks", function () {
                                    var t, e;
                                    n.lexerDefinitionErrors = n.lexerDefinitionErrors.concat(
                                        ((t = r),
                                            n.trackStartLines,
                                            n.config.lineTerminatorCharacters,
                                            (e = []),
                                            (0, T.e$)(t, B) || e.push({ message: "A MultiMode Lexer cannot be initialized without a <" + B + "> property in its definition\n", type: y.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE }),
                                            (0, T.e$)(t, w) || e.push({ message: "A MultiMode Lexer cannot be initialized without a <" + w + "> property in its definition\n", type: y.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY }),
                                            (0, T.e$)(t, w) &&
                                            (0, T.e$)(t, B) &&
                                            !(0, T.e$)(t.modes, t.defaultMode) &&
                                            e.push({ message: "A MultiMode Lexer cannot be initialized with a " + B + ": <" + t.defaultMode + ">which does not exist\n", type: y.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST }),
                                            (0, T.e$)(t, w) &&
                                            (0, T.Ed)(t.modes, function (t, n) {
                                                (0, T.Ed)(t, function (t, r) {
                                                    (0, T.o8)(t) &&
                                                        e.push({ message: "A Lexer cannot be initialized using an undefined Token Type. Mode:<" + n + "> at index: <" + r + ">\n", type: y.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED });
                                                });
                                            }),
                                            e)
                                    );
                                }),
                                    n.TRACE_INIT("performWarningRuntimeChecks", function () {
                                        var t, e, o, i, u, a, s, c;
                                        n.lexerDefinitionWarning = n.lexerDefinitionWarning.concat(
                                            ((t = r),
                                                (e = n.trackStartLines),
                                                (o = n.config.lineTerminatorCharacters),
                                                (i = []),
                                                (u = !1),
                                                (a = (0, T.oA)(
                                                    (0, T.xH)(
                                                        (0, T.Q8)(t.modes, function (t) {
                                                            return t;
                                                        })
                                                    )
                                                )),
                                                (s = (0, T.d1)(a, function (t) {
                                                    return t[M] === ts.NA;
                                                })),
                                                (c = X(o)),
                                                e &&
                                                (0, T.Ed)(s, function (t) {
                                                    var e = Y(t, c);
                                                    if (!1 !== e) {
                                                        var n = {
                                                            message: (function (t, e) {
                                                                if (e.issue === y.IDENTIFY_TERMINATOR)
                                                                    return (
                                                                        "Warning: unable to identify line terminator usage in pattern.\n	The problem is in the <" +
                                                                        t.name +
                                                                        "> Token Type\n	 Root cause: " +
                                                                        e.errMsg +
                                                                        ".\n	For details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR"
                                                                    );
                                                                if (e.issue === y.CUSTOM_LINE_BREAK)
                                                                    return (
                                                                        "Warning: A Custom Token Pattern should specify the <line_breaks> option.\n	The problem is in the <" +
                                                                        t.name +
                                                                        "> Token Type\n	For details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK"
                                                                    );
                                                                throw Error("non exhaustive match");
                                                            })(t, e),
                                                            type: e.issue,
                                                            tokenType: t,
                                                        };
                                                        i.push(n);
                                                    } else (0, T.e$)(t, "LINE_BREAKS") ? !0 === t.LINE_BREAKS && (u = !0) : b(c, t.PATTERN) && (u = !0);
                                                }),
                                                e &&
                                                !u &&
                                                i.push({
                                                    message:
                                                        "Warning: No LINE_BREAKS Found.\n	This Lexer has been defined to track line and column information,\n	But none of the Token Types can be identified as matching a line terminator.\n	See https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#LINE_BREAKS \n	for details.",
                                                    type: y.NO_LINE_BREAKS_FLAGS,
                                                }),
                                                i)
                                        );
                                    })),
                                (r.modes = r.modes ? r.modes : {}),
                                (0, T.Ed)(r.modes, function (t, e) {
                                    r.modes[e] = (0, T.d1)(t, function (t) {
                                        return (0, T.o8)(t);
                                    });
                                });
                            var i = (0, T.XP)(r.modes);
                            if (
                                ((0, T.Ed)(r.modes, function (t, r) {
                                    n.TRACE_INIT("Mode: <" + r + "> processing", function () {
                                        if (
                                            (n.modes.push(r),
                                                !1 === n.config.skipValidations &&
                                                n.TRACE_INIT("validatePatterns", function () {
                                                    var e, r, o, u, a, s, c, l, p, f, h, D, d, E, m, F, C, g, v, I, S, N;
                                                    n.lexerDefinitionErrors = n.lexerDefinitionErrors.concat(
                                                        ((e = []),
                                                            (a = (0, T.hX)(t, function (t) {
                                                                return !(0, T.e$)(t, M);
                                                            })),
                                                            (r = {
                                                                errors: (0, T.UI)(a, function (t) {
                                                                    return { message: "Token Type: ->" + t.name + "<- missing static 'PATTERN' property", type: y.MISSING_PATTERN, tokenTypes: [t] };
                                                                }),
                                                                valid: (0, T.e5)(t, a),
                                                            }),
                                                            (e = e.concat(r.errors)),
                                                            (u = ((s = r.valid),
                                                                (c = (0, T.hX)(s, function (t) {
                                                                    var e = t[M];
                                                                    return !(0, T.Kj)(e) && !(0, T.mf)(e) && !(0, T.e$)(e, "exec") && !(0, T.HD)(e);
                                                                })),
                                                                (o = {
                                                                    errors: (0, T.UI)(c, function (t) {
                                                                        return {
                                                                            message:
                                                                                "Token Type: ->" +
                                                                                t.name +
                                                                                "<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",
                                                                            type: y.INVALID_PATTERN,
                                                                            tokenTypes: [t],
                                                                        };
                                                                    }),
                                                                    valid: (0, T.e5)(s, c),
                                                                })).valid),
                                                            (e = (e = (e = (e = (e = e.concat(o.errors)).concat(
                                                                ((l = []),
                                                                    (p = (0, T.hX)(u, function (t) {
                                                                        return (0, T.Kj)(t[M]);
                                                                    })),
                                                                    (l = (l = (l = (l = l.concat(
                                                                        ((f = (function (t) {
                                                                            function e() {
                                                                                var e = (null !== t && t.apply(this, arguments)) || this;
                                                                                return (e.found = !1), e;
                                                                            }
                                                                            return (
                                                                                P(e, t),
                                                                                (e.prototype.visitEndAnchor = function (t) {
                                                                                    this.found = !0;
                                                                                }),
                                                                                e
                                                                            );
                                                                        })(A.BaseRegExpVisitor)),
                                                                            (h = (0, T.hX)(p, function (t) {
                                                                                var e = t[M];
                                                                                try {
                                                                                    var n = R(e),
                                                                                        r = new f();
                                                                                    return r.visit(n), r.found;
                                                                                } catch (t) {
                                                                                    return j.test(e.source);
                                                                                }
                                                                            })),
                                                                            (0, T.UI)(h, function (t) {
                                                                                return {
                                                                                    message:
                                                                                        "Unexpected RegExp Anchor Error:\n	Token Type: ->" +
                                                                                        t.name +
                                                                                        "<- static 'PATTERN' cannot contain end of input anchor '$'\n	See sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.",
                                                                                    type: y.EOI_ANCHOR_FOUND,
                                                                                    tokenTypes: [t],
                                                                                };
                                                                            }))
                                                                    )).concat(
                                                                        ((D = (function (t) {
                                                                            function e() {
                                                                                var e = (null !== t && t.apply(this, arguments)) || this;
                                                                                return (e.found = !1), e;
                                                                            }
                                                                            return (
                                                                                P(e, t),
                                                                                (e.prototype.visitStartAnchor = function (t) {
                                                                                    this.found = !0;
                                                                                }),
                                                                                e
                                                                            );
                                                                        })(A.BaseRegExpVisitor)),
                                                                            (d = (0, T.hX)(p, function (t) {
                                                                                var e = t[M];
                                                                                try {
                                                                                    var n = R(e),
                                                                                        r = new D();
                                                                                    return r.visit(n), r.found;
                                                                                } catch (t) {
                                                                                    return G.test(e.source);
                                                                                }
                                                                            })),
                                                                            (0, T.UI)(d, function (t) {
                                                                                return {
                                                                                    message:
                                                                                        "Unexpected RegExp Anchor Error:\n	Token Type: ->" +
                                                                                        t.name +
                                                                                        "<- static 'PATTERN' cannot contain start of input anchor '^'\n	See https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.",
                                                                                    type: y.SOI_ANCHOR_FOUND,
                                                                                    tokenTypes: [t],
                                                                                };
                                                                            }))
                                                                    )).concat(
                                                                        ((E = (0, T.hX)(p, function (t) {
                                                                            var e = t[M];
                                                                            return e instanceof RegExp && (e.multiline || e.global);
                                                                        })),
                                                                            (0, T.UI)(E, function (t) {
                                                                                return { message: "Token Type: ->" + t.name + "<- static 'PATTERN' may NOT contain global('g') or multiline('m')", type: y.UNSUPPORTED_FLAGS_FOUND, tokenTypes: [t] };
                                                                            }))
                                                                    )).concat(
                                                                        ((m = []),
                                                                            (F = (0, T.UI)(p, function (t) {
                                                                                return (0, T.u4)(
                                                                                    p,
                                                                                    function (e, n) {
                                                                                        return t.PATTERN.source !== n.PATTERN.source || (0, T.r3)(m, n) || n.PATTERN === ts.NA || (m.push(n), e.push(n)), e;
                                                                                    },
                                                                                    []
                                                                                );
                                                                            })),
                                                                            (F = (0, T.oA)(F)),
                                                                            (C = (0, T.hX)(F, function (t) {
                                                                                return t.length > 1;
                                                                            })),
                                                                            (0, T.UI)(C, function (t) {
                                                                                var e = (0, T.UI)(t, function (t) {
                                                                                    return t.name;
                                                                                });
                                                                                return {
                                                                                    message: "The same RegExp pattern ->" + (0, T.Ps)(t).PATTERN + "<-has been used in all of the following Token Types: " + e.join(", ") + " <-",
                                                                                    type: y.DUPLICATE_PATTERNS_FOUND,
                                                                                    tokenTypes: t,
                                                                                };
                                                                            }))
                                                                    )).concat(
                                                                        ((g = (0, T.hX)(p, function (t) {
                                                                            return t[M].test("");
                                                                        })),
                                                                            (0, T.UI)(g, function (t) {
                                                                                return { message: "Token Type: ->" + t.name + "<- static 'PATTERN' must not match an empty string", type: y.EMPTY_MATCH_PATTERN, tokenTypes: [t] };
                                                                            }))
                                                                    ))
                                                            )).concat(
                                                                ((v = (0, T.hX)(u, function (t) {
                                                                    if (!(0, T.e$)(t, "GROUP")) return !1;
                                                                    var e = t.GROUP;
                                                                    return e !== ts.SKIPPED && e !== ts.NA && !(0, T.HD)(e);
                                                                })),
                                                                    (0, T.UI)(v, function (t) {
                                                                        return { message: "Token Type: ->" + t.name + "<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String", type: y.INVALID_GROUP_TYPE_FOUND, tokenTypes: [t] };
                                                                    }))
                                                            )).concat(
                                                                ((I = (0, T.hX)(u, function (t) {
                                                                    return void 0 !== t.PUSH_MODE && !(0, T.r3)(i, t.PUSH_MODE);
                                                                })),
                                                                    (0, T.UI)(I, function (t) {
                                                                        return {
                                                                            message: "Token Type: ->" + t.name + "<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->" + t.PUSH_MODE + "<-which does not exist",
                                                                            type: y.PUSH_MODE_DOES_NOT_EXIST,
                                                                            tokenTypes: [t],
                                                                        };
                                                                    }))
                                                            )).concat(
                                                                ((S = []),
                                                                    (N = (0, T.u4)(
                                                                        u,
                                                                        function (t, e, n) {
                                                                            var r = e.PATTERN;
                                                                            return (
                                                                                r === ts.NA ||
                                                                                ((0, T.HD)(r)
                                                                                    ? t.push({ str: r, idx: n, tokenType: e })
                                                                                    : (0, T.Kj)(r) &&
                                                                                    void 0 ===
                                                                                    (0, T.sE)([".", "\\", "[", "]", "|", "^", "$", "(", ")", "?", "*", "+", "{"], function (t) {
                                                                                        return -1 !== r.source.indexOf(t);
                                                                                    }) &&
                                                                                    t.push({ str: r.source, idx: n, tokenType: e })),
                                                                                t
                                                                            );
                                                                        },
                                                                        []
                                                                    )),
                                                                    (0, T.Ed)(u, function (t, e) {
                                                                        (0, T.Ed)(N, function (n) {
                                                                            var r = n.str,
                                                                                o = n.idx,
                                                                                i = n.tokenType;
                                                                            if (
                                                                                e < o &&
                                                                                (function (t, e) {
                                                                                    if ((0, T.Kj)(e)) {
                                                                                        var n = e.exec(t);
                                                                                        return null !== n && 0 === n.index;
                                                                                    }
                                                                                    if ((0, T.mf)(e)) return e(t, 0, [], {});
                                                                                    if ((0, T.e$)(e, "exec")) return e.exec(t, 0, [], {});
                                                                                    if ("string" == typeof e) return e === t;
                                                                                    throw Error("non exhaustive match");
                                                                                })(r, t.PATTERN)
                                                                            ) {
                                                                                var u =
                                                                                    "Token: ->" +
                                                                                    i.name +
                                                                                    "<- can never be matched.\nBecause it appears AFTER the Token Type ->" +
                                                                                    t.name +
                                                                                    "<-in the lexer's definition.\nSee https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#UNREACHABLE";
                                                                                S.push({ message: u, type: y.UNREACHABLE_PATTERN, tokenTypes: [t, i] });
                                                                            }
                                                                        });
                                                                    }),
                                                                    S)
                                                            )))
                                                    );
                                                }),
                                                (0, T.xb)(n.lexerDefinitionErrors))
                                        ) {
                                            var o;
                                            tn(t),
                                                n.TRACE_INIT("analyzeTokenTypes", function () {
                                                    var r, i, u, a, s, c, l, p, f, h, D, d, E, m, y, F, C;
                                                    (r = {
                                                        lineTerminatorCharacters: n.config.lineTerminatorCharacters,
                                                        positionTracking: e.positionTracking,
                                                        ensureOptimizations: e.ensureOptimizations,
                                                        safeMode: e.safeMode,
                                                        tracer: n.TRACE_INIT.bind(n),
                                                    }),
                                                        (m = (r = (0, T.ce)(r, {
                                                            useSticky: U,
                                                            debug: !1,
                                                            safeMode: !1,
                                                            positionTracking: "full",
                                                            lineTerminatorCharacters: ["\r", "\n"],
                                                            tracer: function (t, e) {
                                                                return e();
                                                            },
                                                        })).tracer)("initCharCodeToOptimizedIndexMap", function () {
                                                            (function () {
                                                                if ((0, T.xb)(q)) {
                                                                    q = Array(65536);
                                                                    for (var t = 0; t < 65536; t++) q[t] = t > 255 ? 255 + ~~(t / 255) : t;
                                                                }
                                                            })();
                                                        }),
                                                        m("Reject Lexer.NA", function () {
                                                            i = (0, T.d1)(t, function (t) {
                                                                return t[M] === ts.NA;
                                                            });
                                                        }),
                                                        (y = !1),
                                                        m("Transform Patterns", function () {
                                                            (y = !1),
                                                                (u = (0, T.UI)(i, function (t) {
                                                                    var e = t[M];
                                                                    if ((0, T.Kj)(e)) {
                                                                        var n = e.source;
                                                                        return 1 !== n.length || "^" === n || "$" === n || "." === n || e.ignoreCase
                                                                            ? 2 !== n.length || "\\" !== n[0] || (0, T.r3)(["d", "D", "s", "S", "t", "r", "n", "t", "0", "c", "b", "B", "f", "v", "w", "W"], n[1])
                                                                                ? r.useSticky
                                                                                    ? V(e)
                                                                                    : W(e)
                                                                                : n[1]
                                                                            : n;
                                                                    }
                                                                    if ((0, T.mf)(e)) return (y = !0), { exec: e };
                                                                    if ((0, T.e$)(e, "exec")) return (y = !0), e;
                                                                    if ("string" == typeof e) {
                                                                        if (1 === e.length) return e;
                                                                        var o = new RegExp(e.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&"));
                                                                        return r.useSticky ? V(o) : W(o);
                                                                    }
                                                                    throw Error("non exhaustive match");
                                                                }));
                                                        }),
                                                        m("misc mapping", function () {
                                                            (a = (0, T.UI)(i, function (t) {
                                                                return t.tokenTypeIdx;
                                                            })),
                                                                (s = (0, T.UI)(i, function (t) {
                                                                    var e = t.GROUP;
                                                                    if (e !== ts.SKIPPED) {
                                                                        if ((0, T.HD)(e)) return e;
                                                                        if ((0, T.o8)(e)) return !1;
                                                                        throw Error("non exhaustive match");
                                                                    }
                                                                })),
                                                                (c = (0, T.UI)(i, function (t) {
                                                                    var e = t.LONGER_ALT;
                                                                    if (e) return (0, T.cq)(i, e);
                                                                })),
                                                                (l = (0, T.UI)(i, function (t) {
                                                                    return t.PUSH_MODE;
                                                                })),
                                                                (p = (0, T.UI)(i, function (t) {
                                                                    return (0, T.e$)(t, "POP_MODE");
                                                                }));
                                                        }),
                                                        m("Line Terminator Handling", function () {
                                                            var t = X(r.lineTerminatorCharacters);
                                                            (f = (0, T.UI)(i, function (t) {
                                                                return !1;
                                                            })),
                                                                "onlyOffset" !== r.positionTracking &&
                                                                (f = (0, T.UI)(i, function (e) {
                                                                    return (0, T.e$)(e, "LINE_BREAKS") ? e.LINE_BREAKS : !1 === Y(e, t) ? b(t, e.PATTERN) : void 0;
                                                                }));
                                                        }),
                                                        m("Misc Mapping #2", function () {
                                                            (h = (0, T.UI)(i, K)),
                                                                (D = (0, T.UI)(u, H)),
                                                                (d = (0, T.u4)(
                                                                    i,
                                                                    function (t, e) {
                                                                        var n = e.GROUP;
                                                                        return (0, T.HD)(n) && n !== ts.SKIPPED && (t[n] = []), t;
                                                                    },
                                                                    {}
                                                                )),
                                                                (E = (0, T.UI)(u, function (t, e) {
                                                                    return { pattern: u[e], longerAlt: c[e], canLineTerminator: f[e], isCustom: h[e], short: D[e], group: s[e], push: l[e], pop: p[e], tokenTypeIdx: a[e], tokenType: i[e] };
                                                                }));
                                                        }),
                                                        (F = !0),
                                                        (C = []),
                                                        r.safeMode ||
                                                        m("First Char Optimization", function () {
                                                            C = (0, T.u4)(
                                                                i,
                                                                function (t, e, n) {
                                                                    if ("string" == typeof e.PATTERN) {
                                                                        var o;
                                                                        z(t, Q(e.PATTERN.charCodeAt(0)), E[n]);
                                                                    } else if ((0, T.kJ)(e.START_CHARS_HINT))
                                                                        (0, T.Ed)(e.START_CHARS_HINT, function (e) {
                                                                            var r = Q("string" == typeof e ? e.charCodeAt(0) : e);
                                                                            o !== r && ((o = r), z(t, r, E[n]));
                                                                        });
                                                                    else if ((0, T.Kj)(e.PATTERN)) {
                                                                        if (e.PATTERN.unicode)
                                                                            (F = !1),
                                                                                r.ensureOptimizations &&
                                                                                (0, T.WB)(
                                                                                    "" +
                                                                                    x +
                                                                                    "	Unable to analyze < " +
                                                                                    e.PATTERN.toString() +
                                                                                    " > pattern.\n	The regexp unicode flag is not currently supported by the regexp-to-ast library.\n	This will disable the lexer's first char optimizations.\n	For details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE"
                                                                                );
                                                                        else {
                                                                            var i = (function (t, e) {
                                                                                void 0 === e && (e = !1);
                                                                                try {
                                                                                    var n = R(t);
                                                                                    return (function t(e, n, r) {
                                                                                        switch (e.type) {
                                                                                            case "Disjunction":
                                                                                                for (var o = 0; o < e.value.length; o++) t(e.value[o], n, r);
                                                                                                break;
                                                                                            case "Alternative":
                                                                                                for (var i = e.value, o = 0; o < i.length; o++) {
                                                                                                    var u = i[o];
                                                                                                    switch (u.type) {
                                                                                                        case "EndAnchor":
                                                                                                        case "GroupBackReference":
                                                                                                        case "Lookahead":
                                                                                                        case "NegativeLookahead":
                                                                                                        case "StartAnchor":
                                                                                                        case "WordBoundary":
                                                                                                        case "NonWordBoundary":
                                                                                                            continue;
                                                                                                    }
                                                                                                    switch (u.type) {
                                                                                                        case "Character":
                                                                                                            L(u.value, n, r);
                                                                                                            break;
                                                                                                        case "Set":
                                                                                                            if (!0 === u.complement) throw Error(O);
                                                                                                            (0, T.Ed)(u.value, function (t) {
                                                                                                                if ("number" == typeof t) L(t, n, r);
                                                                                                                else if (!0 === r) for (var e = t.from; e <= t.to; e++) L(e, n, r);
                                                                                                                else {
                                                                                                                    for (var e = t.from; e <= t.to && e < 256; e++) L(e, n, r);
                                                                                                                    if (t.to >= 256) for (var o = t.from >= 256 ? t.from : 256, i = t.to, u = Q(o), a = Q(i), s = u; s <= a; s++) n[s] = s;
                                                                                                                }
                                                                                                            });
                                                                                                            break;
                                                                                                        case "Group":
                                                                                                            t(u.value, n, r);
                                                                                                            break;
                                                                                                        default:
                                                                                                            throw Error("Non Exhaustive Match");
                                                                                                    }
                                                                                                    var a = void 0 !== u.quantifier && 0 === u.quantifier.atLeast;
                                                                                                    if (
                                                                                                        ("Group" === u.type &&
                                                                                                            !1 ===
                                                                                                            (function t(e) {
                                                                                                                return (
                                                                                                                    (!!e.quantifier && 0 === e.quantifier.atLeast) ||
                                                                                                                    (!!e.value && ((0, T.kJ)(e.value) ? (0, T.yW)(e.value, t) : t(e.value)))
                                                                                                                );
                                                                                                            })(u)) ||
                                                                                                        ("Group" !== u.type && !1 === a)
                                                                                                    )
                                                                                                        break;
                                                                                                }
                                                                                                break;
                                                                                            default:
                                                                                                throw Error("non exhaustive match!");
                                                                                        }
                                                                                        return (0, T.VO)(n);
                                                                                    })(n.value, {}, n.flags.ignoreCase);
                                                                                } catch (n) {
                                                                                    if (n.message === O)
                                                                                        e &&
                                                                                            (0, T.rr)(
                                                                                                "" +
                                                                                                x +
                                                                                                "	Unable to optimize: < " +
                                                                                                t.toString() +
                                                                                                " >\n	Complement Sets cannot be automatically optimized.\n	This will disable the lexer's first char optimizations.\n	See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details."
                                                                                            );
                                                                                    else {
                                                                                        var r = "";
                                                                                        e &&
                                                                                            (r =
                                                                                                "\n	This will disable the lexer's first char optimizations.\n	See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details."),
                                                                                            (0, T.WB)(
                                                                                                x +
                                                                                                "\n	Failed parsing: < " +
                                                                                                t.toString() +
                                                                                                " >\n	Using the regexp-to-ast library version: " +
                                                                                                A.VERSION +
                                                                                                "\n	Please open an issue at: https://github.com/bd82/regexp-to-ast/issues" +
                                                                                                r
                                                                                            );
                                                                                    }
                                                                                }
                                                                                return [];
                                                                            })(e.PATTERN, r.ensureOptimizations);
                                                                            (0, T.xb)(i) && (F = !1),
                                                                                (0, T.Ed)(i, function (e) {
                                                                                    z(t, e, E[n]);
                                                                                });
                                                                        }
                                                                    } else
                                                                        r.ensureOptimizations &&
                                                                            (0, T.WB)(
                                                                                "" +
                                                                                x +
                                                                                "	TokenType: <" +
                                                                                e.name +
                                                                                "> is using a custom token pattern without providing <start_chars_hint> parameter.\n	This will disable the lexer's first char optimizations.\n	For details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE"
                                                                            ),
                                                                            (F = !1);
                                                                    return t;
                                                                },
                                                                []
                                                            );
                                                        }),
                                                        m("ArrayPacking", function () {
                                                            C = (0, T.X0)(C);
                                                        }),
                                                        (o = { emptyGroups: d, patternIdxToConfig: E, charCodeToPatternIdxToConfig: C, hasCustom: y, canBeOptimized: F });
                                                }),
                                                (n.patternIdxToConfig[r] = o.patternIdxToConfig),
                                                (n.charCodeToPatternIdxToConfig[r] = o.charCodeToPatternIdxToConfig),
                                                (n.emptyGroups = (0, T.TS)(n.emptyGroups, o.emptyGroups)),
                                                (n.hasCustom = o.hasCustom || n.hasCustom),
                                                (n.canModeBeOptimized[r] = o.canBeOptimized);
                                        }
                                    });
                                }),
                                    (n.defaultMode = r.defaultMode),
                                    !(0, T.xb)(n.lexerDefinitionErrors) && !n.config.deferDefinitionErrorsHandling)
                            )
                                throw Error(
                                    "Errors detected in definition of Lexer:\n" +
                                    (0, T.UI)(n.lexerDefinitionErrors, function (t) {
                                        return t.message;
                                    }).join("-----------------------\n")
                                );
                            (0, T.Ed)(n.lexerDefinitionWarning, function (t) {
                                (0, T.rr)(t.message);
                            }),
                                n.TRACE_INIT("Choosing sub-methods implementations", function () {
                                    if (
                                        (U ? ((n.chopInput = T.Wd), (n.match = n.matchWithTest)) : ((n.updateLastIndex = T.dG), (n.match = n.matchWithExec)),
                                            o && (n.handleModes = T.dG),
                                            !1 === n.trackStartLines && (n.computeNewColumn = T.Wd),
                                            !1 === n.trackEndLines && (n.updateTokenEndLineColumnLocation = T.dG),
                                            /full/i.test(n.config.positionTracking))
                                    )
                                        n.createTokenInstance = n.createFullToken;
                                    else if (/onlyStart/i.test(n.config.positionTracking)) n.createTokenInstance = n.createStartOnlyToken;
                                    else if (/onlyOffset/i.test(n.config.positionTracking)) n.createTokenInstance = n.createOffsetOnlyToken;
                                    else throw Error('Invalid <positionTracking> config option: "' + n.config.positionTracking + '"');
                                    n.hasCustom ? ((n.addToken = n.addTokenUsingPush), (n.handlePayload = n.handlePayloadWithCustom)) : ((n.addToken = n.addTokenUsingMemberAccess), (n.handlePayload = n.handlePayloadNoCustom));
                                }),
                                n.TRACE_INIT("Failed Optimization Warnings", function () {
                                    var t = (0, T.u4)(
                                        n.canModeBeOptimized,
                                        function (t, e, n) {
                                            return !1 === e && t.push(n), t;
                                        },
                                        []
                                    );
                                    if (e.ensureOptimizations && !(0, T.xb)(t))
                                        throw Error(
                                            "Lexer Modes: < " +
                                            t.join(", ") +
                                            ' > cannot be optimized.\n	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.\n	 Or inspect the console log for details on how to resolve these issues.'
                                        );
                                }),
                                n.TRACE_INIT("clearRegExpParserCache", function () {
                                    I = {};
                                }),
                                n.TRACE_INIT("toFastProperties", function () {
                                    (0, T.SV)(n);
                                });
                        });
                }
                return (
                    (t.prototype.tokenize = function (t, e) {
                        if ((void 0 === e && (e = this.defaultMode), !(0, T.xb)(this.lexerDefinitionErrors)))
                            throw Error(
                                "Unable to Tokenize because Errors detected in definition of Lexer:\n" +
                                (0, T.UI)(this.lexerDefinitionErrors, function (t) {
                                    return t.message;
                                }).join("-----------------------\n")
                            );
                        return this.tokenizeInternal(t, e);
                    }),
                    (t.prototype.tokenizeInternal = function (t, e) {
                        var n,
                            r,
                            o,
                            i,
                            u,
                            a,
                            s,
                            c,
                            l,
                            p,
                            f,
                            h,
                            D,
                            d,
                            E,
                            m,
                            y,
                            F,
                            C = this,
                            g = t,
                            v = g.length,
                            A = 0,
                            I = 0,
                            S = Array(this.hasCustom ? 0 : Math.floor(t.length / 10)),
                            R = [],
                            N = this.trackStartLines ? 1 : void 0,
                            O = this.trackStartLines ? 1 : void 0,
                            x =
                                ((n = this.emptyGroups),
                                    (r = {}),
                                    (o = (0, T.XP)(n)),
                                    (0, T.Ed)(o, function (t) {
                                        var e = n[t];
                                        if ((0, T.kJ)(e)) r[t] = [];
                                        else throw Error("non exhaustive match");
                                    }),
                                    r),
                            L = this.trackStartLines,
                            k = this.config.lineTerminatorsPattern,
                            _ = 0,
                            b = [],
                            P = [],
                            M = [],
                            B = [];
                        Object.freeze(B);
                        var w = void 0;
                        function U() {
                            return b;
                        }
                        function j(t) {
                            var e = P[Q(t)];
                            return void 0 === e ? B : e;
                        }
                        var G = function (t) {
                            if (1 === M.length && void 0 === t.tokenType.PUSH_MODE) {
                                var e = C.config.errorMessageProvider.buildUnableToPopLexerModeMessage(t);
                                R.push({ offset: t.startOffset, line: void 0 !== t.startLine ? t.startLine : void 0, column: void 0 !== t.startColumn ? t.startColumn : void 0, length: t.image.length, message: e });
                            } else {
                                M.pop();
                                var n = (0, T.Z$)(M);
                                (b = C.patternIdxToConfig[n]), (P = C.charCodeToPatternIdxToConfig[n]), (_ = b.length);
                                var r = C.canModeBeOptimized[n] && !1 === C.config.safeMode;
                                w = P && r ? j : U;
                            }
                        };
                        function W(t) {
                            M.push(t), (P = this.charCodeToPatternIdxToConfig[t]), (_ = (b = this.patternIdxToConfig[t]).length), (_ = b.length);
                            var e = this.canModeBeOptimized[t] && !1 === this.config.safeMode;
                            w = P && e ? j : U;
                        }
                        for (W.call(this, e); A < v;) {
                            c = null;
                            var V = g.charCodeAt(A),
                                K = w(V),
                                H = K.length;
                            for (i = 0; i < H; i++) {
                                var $ = (F = K[i]).pattern;
                                l = null;
                                var Y = F.short;
                                if (
                                    (!1 !== Y
                                        ? V === Y && (c = $)
                                        : !0 === F.isCustom
                                            ? null !== (y = $.exec(g, A, S, x))
                                                ? ((c = y[0]), void 0 !== y.payload && (l = y.payload))
                                                : (c = null)
                                            : (this.updateLastIndex($, A), (c = this.match($, t, A))),
                                        null !== c)
                                ) {
                                    if (void 0 !== (s = F.longerAlt)) {
                                        var X = b[s],
                                            z = X.pattern;
                                        (p = null),
                                            !0 === X.isCustom ? (null !== (y = z.exec(g, A, S, x)) ? ((a = y[0]), void 0 !== y.payload && (p = y.payload)) : (a = null)) : (this.updateLastIndex(z, A), (a = this.match(z, t, A))),
                                            a && a.length > c.length && ((c = a), (l = p), (F = X));
                                    }
                                    break;
                                }
                            }
                            if (null !== c) {
                                if (
                                    ((f = c.length),
                                        void 0 !== (h = F.group) && ((D = F.tokenTypeIdx), (d = this.createTokenInstance(c, A, D, F.tokenType, N, O, f)), this.handlePayload(d, l), !1 === h ? (I = this.addToken(S, I, d)) : x[h].push(d)),
                                        (t = this.chopInput(t, f)),
                                        (A += f),
                                        (O = this.computeNewColumn(O, f)),
                                        !0 === L && !0 === F.canLineTerminator)
                                ) {
                                    var q = 0,
                                        J = void 0,
                                        Z = void 0;
                                    k.lastIndex = 0;
                                    do !0 === (J = k.test(c)) && ((Z = k.lastIndex - 1), q++);
                                    while (!0 === J);
                                    0 !== q && ((N += q), (O = f - Z), this.updateTokenEndLineColumnLocation(d, h, Z, q, N, O, f));
                                }
                                this.handleModes(F, G, W, d);
                            } else {
                                for (var tt = A, te = N, tn = O, tr = !1; !tr && A < v;)
                                    for (g.charCodeAt(A), t = this.chopInput(t, 1), A++, u = 0; u < _; u++) {
                                        var to = b[u],
                                            $ = to.pattern,
                                            Y = to.short;
                                        if ((!1 !== Y ? g.charCodeAt(A) === Y && (tr = !0) : !0 === to.isCustom ? (tr = null !== $.exec(g, A, S, x)) : (this.updateLastIndex($, A), (tr = null !== $.exec(t))), !0 === tr)) break;
                                    }
                                (E = A - tt), (m = this.config.errorMessageProvider.buildUnexpectedCharactersMessage(g, tt, E, te, tn)), R.push({ offset: tt, line: te, column: tn, length: E, message: m });
                            }
                        }
                        return this.hasCustom || (S.length = I), { tokens: S, groups: x, errors: R };
                    }),
                    (t.prototype.handleModes = function (t, e, n, r) {
                        if (!0 === t.pop) {
                            var o = t.push;
                            e(r), void 0 !== o && n.call(this, o);
                        } else void 0 !== t.push && n.call(this, t.push);
                    }),
                    (t.prototype.chopInput = function (t, e) {
                        return t.substring(e);
                    }),
                    (t.prototype.updateLastIndex = function (t, e) {
                        t.lastIndex = e;
                    }),
                    (t.prototype.updateTokenEndLineColumnLocation = function (t, e, n, r, o, i, u) {
                        var a, s;
                        void 0 === e || ((s = (a = n === u - 1) ? -1 : 0), (1 === r && !0 === a) || ((t.endLine = o + s), (t.endColumn = i - 1 + -s)));
                    }),
                    (t.prototype.computeNewColumn = function (t, e) {
                        return t + e;
                    }),
                    (t.prototype.createTokenInstance = function () {
                        for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                        return null;
                    }),
                    (t.prototype.createOffsetOnlyToken = function (t, e, n, r) {
                        return { image: t, startOffset: e, tokenTypeIdx: n, tokenType: r };
                    }),
                    (t.prototype.createStartOnlyToken = function (t, e, n, r, o, i) {
                        return { image: t, startOffset: e, startLine: o, startColumn: i, tokenTypeIdx: n, tokenType: r };
                    }),
                    (t.prototype.createFullToken = function (t, e, n, r, o, i, u) {
                        return { image: t, startOffset: e, endOffset: e + u - 1, startLine: o, endLine: o, startColumn: i, endColumn: i + u - 1, tokenTypeIdx: n, tokenType: r };
                    }),
                    (t.prototype.addToken = function (t, e, n) {
                        return 666;
                    }),
                    (t.prototype.addTokenUsingPush = function (t, e, n) {
                        return t.push(n), e;
                    }),
                    (t.prototype.addTokenUsingMemberAccess = function (t, e, n) {
                        return (t[e] = n), ++e;
                    }),
                    (t.prototype.handlePayload = function (t, e) { }),
                    (t.prototype.handlePayloadNoCustom = function (t, e) { }),
                    (t.prototype.handlePayloadWithCustom = function (t, e) {
                        null !== e && (t.payload = e);
                    }),
                    (t.prototype.match = function (t, e, n) {
                        return null;
                    }),
                    (t.prototype.matchWithTest = function (t, e, n) {
                        return !0 === t.test(e) ? e.substring(n, t.lastIndex) : null;
                    }),
                    (t.prototype.matchWithExec = function (t, e) {
                        var n = t.exec(e);
                        return null !== n ? n[0] : n;
                    }),
                    (t.prototype.TRACE_INIT = function (t, e) {
                        if (!0 !== this.traceInitPerf) return e();
                        this.traceInitIndent++;
                        var n = Array(this.traceInitIndent + 1).join("	");
                        this.traceInitIndent < this.traceInitMaxIdent && console.log(n + "--> <" + t + ">");
                        var r = (0, T.HT)(e),
                            o = r.time,
                            i = r.value,
                            u = o > 10 ? console.warn : console.log;
                        return this.traceInitIndent < this.traceInitMaxIdent && u(n + "<-- <" + t + "> time: " + o + "ms"), this.traceInitIndent--, i;
                    }),
                    (t.SKIPPED = "This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace."),
                    (t.NA = /NOT_APPLICABLE/),
                    t
                );
            })();
            function tc(t) {
                return tp(t) ? t.LABEL : t.name;
            }
            function tl(t) {
                return t.name;
            }
            function tp(t) {
                return (0, T.HD)(t.LABEL) && "" !== t.LABEL;
            }
            var tf = "categories",
                th = "label",
                tD = "group",
                td = "push_mode",
                tE = "pop_mode",
                tm = "longer_alt",
                ty = "line_breaks",
                tF = "start_chars_hint";
            function tC(t) {
                return tg(t);
            }
            function tg(t) {
                var e = t.pattern,
                    n = {};
                if (((n.name = t.name), (0, T.o8)(e) || (n.PATTERN = e), (0, T.e$)(t, "parent"))) throw "The parent property is no longer supported.\nSee: https://github.com/SAP/chevrotain/issues/564#issuecomment-349062346 for details.";
                return (
                    (0, T.e$)(t, tf) && (n.CATEGORIES = t[tf]),
                    tn([n]),
                    (0, T.e$)(t, th) && (n.LABEL = t[th]),
                    (0, T.e$)(t, tD) && (n.GROUP = t[tD]),
                    (0, T.e$)(t, tE) && (n.POP_MODE = t[tE]),
                    (0, T.e$)(t, td) && (n.PUSH_MODE = t[td]),
                    (0, T.e$)(t, tm) && (n.LONGER_ALT = t[tm]),
                    (0, T.e$)(t, ty) && (n.LINE_BREAKS = t[ty]),
                    (0, T.e$)(t, tF) && (n.START_CHARS_HINT = t[tF]),
                    n
                );
            }
            var tv = tg({ name: "EOF", pattern: ts.NA });
            function tT(t, e, n, r, o, i, u, a) {
                return { image: e, startOffset: n, endOffset: r, startLine: o, endLine: i, startColumn: u, endColumn: a, tokenTypeIdx: t.tokenTypeIdx, tokenType: t };
            }
            function tA(t, e) {
                return J(t, e);
            }
            tn([tv]);
            var tI =
                ((u = function (t, e) {
                    return (u =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                            function (t, e) {
                                t.__proto__ = e;
                            }) ||
                        function (t, e) {
                            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                        })(t, e);
                }),
                    function (t, e) {
                        function n() {
                            this.constructor = t;
                        }
                        u(t, e), (t.prototype = null === e ? Object.create(e) : ((n.prototype = e.prototype), new n()));
                    }),
                tS = (function () {
                    function t(t) {
                        this._definition = t;
                    }
                    return (
                        Object.defineProperty(t.prototype, "definition", {
                            get: function () {
                                return this._definition;
                            },
                            set: function (t) {
                                this._definition = t;
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        (t.prototype.accept = function (t) {
                            t.visit(this),
                                (0, T.Ed)(this.definition, function (e) {
                                    e.accept(t);
                                });
                        }),
                        t
                    );
                })(),
                tR = (function (t) {
                    function e(e) {
                        var n = t.call(this, []) || this;
                        return (
                            (n.idx = 1),
                            (0, T.f0)(
                                n,
                                (0, T.ei)(e, function (t) {
                                    return void 0 !== t;
                                })
                            ),
                            n
                        );
                    }
                    return (
                        tI(e, t),
                        Object.defineProperty(e.prototype, "definition", {
                            get: function () {
                                return void 0 !== this.referencedRule ? this.referencedRule.definition : [];
                            },
                            set: function (t) { },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        (e.prototype.accept = function (t) {
                            t.visit(this);
                        }),
                        e
                    );
                })(tS),
                tN = (function (t) {
                    function e(e) {
                        var n = t.call(this, e.definition) || this;
                        return (
                            (n.orgText = ""),
                            (0, T.f0)(
                                n,
                                (0, T.ei)(e, function (t) {
                                    return void 0 !== t;
                                })
                            ),
                            n
                        );
                    }
                    return tI(e, t), e;
                })(tS),
                tO = (function (t) {
                    function e(e) {
                        var n = t.call(this, e.definition) || this;
                        return (
                            (n.ignoreAmbiguities = !1),
                            (0, T.f0)(
                                n,
                                (0, T.ei)(e, function (t) {
                                    return void 0 !== t;
                                })
                            ),
                            n
                        );
                    }
                    return tI(e, t), e;
                })(tS),
                tx = (function (t) {
                    function e(e) {
                        var n = t.call(this, e.definition) || this;
                        return (
                            (n.idx = 1),
                            (0, T.f0)(
                                n,
                                (0, T.ei)(e, function (t) {
                                    return void 0 !== t;
                                })
                            ),
                            n
                        );
                    }
                    return tI(e, t), e;
                })(tS),
                tL = (function (t) {
                    function e(e) {
                        var n = t.call(this, e.definition) || this;
                        return (
                            (n.idx = 1),
                            (0, T.f0)(
                                n,
                                (0, T.ei)(e, function (t) {
                                    return void 0 !== t;
                                })
                            ),
                            n
                        );
                    }
                    return tI(e, t), e;
                })(tS),
                tk = (function (t) {
                    function e(e) {
                        var n = t.call(this, e.definition) || this;
                        return (
                            (n.idx = 1),
                            (0, T.f0)(
                                n,
                                (0, T.ei)(e, function (t) {
                                    return void 0 !== t;
                                })
                            ),
                            n
                        );
                    }
                    return tI(e, t), e;
                })(tS),
                t_ = (function (t) {
                    function e(e) {
                        var n = t.call(this, e.definition) || this;
                        return (
                            (n.idx = 1),
                            (0, T.f0)(
                                n,
                                (0, T.ei)(e, function (t) {
                                    return void 0 !== t;
                                })
                            ),
                            n
                        );
                    }
                    return tI(e, t), e;
                })(tS),
                tb = (function (t) {
                    function e(e) {
                        var n = t.call(this, e.definition) || this;
                        return (
                            (n.idx = 1),
                            (0, T.f0)(
                                n,
                                (0, T.ei)(e, function (t) {
                                    return void 0 !== t;
                                })
                            ),
                            n
                        );
                    }
                    return tI(e, t), e;
                })(tS),
                tP = (function (t) {
                    function e(e) {
                        var n = t.call(this, e.definition) || this;
                        return (
                            (n.idx = 1),
                            (n.ignoreAmbiguities = !1),
                            (n.hasPredicates = !1),
                            (0, T.f0)(
                                n,
                                (0, T.ei)(e, function (t) {
                                    return void 0 !== t;
                                })
                            ),
                            n
                        );
                    }
                    return (
                        tI(e, t),
                        Object.defineProperty(e.prototype, "definition", {
                            get: function () {
                                return this._definition;
                            },
                            set: function (t) {
                                this._definition = t;
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        e
                    );
                })(tS),
                tM = (function () {
                    function t(t) {
                        (this.idx = 1),
                            (0, T.f0)(
                                this,
                                (0, T.ei)(t, function (t) {
                                    return void 0 !== t;
                                })
                            );
                    }
                    return (
                        (t.prototype.accept = function (t) {
                            t.visit(this);
                        }),
                        t
                    );
                })();
            function tB(t) {
                return (0, T.UI)(t, tw);
            }
            function tw(t) {
                function e(t) {
                    return (0, T.UI)(t, tw);
                }
                if (t instanceof tR) return { type: "NonTerminal", name: t.nonTerminalName, idx: t.idx };
                if (t instanceof tO) return { type: "Alternative", definition: e(t.definition) };
                if (t instanceof tx) return { type: "Option", idx: t.idx, definition: e(t.definition) };
                if (t instanceof tL) return { type: "RepetitionMandatory", idx: t.idx, definition: e(t.definition) };
                if (t instanceof tk) return { type: "RepetitionMandatoryWithSeparator", idx: t.idx, separator: tw(new tM({ terminalType: t.separator })), definition: e(t.definition) };
                if (t instanceof tb) return { type: "RepetitionWithSeparator", idx: t.idx, separator: tw(new tM({ terminalType: t.separator })), definition: e(t.definition) };
                if (t instanceof t_) return { type: "Repetition", idx: t.idx, definition: e(t.definition) };
                else if (t instanceof tP) return { type: "Alternation", idx: t.idx, definition: e(t.definition) };
                else if (t instanceof tM) {
                    var n = { type: "Terminal", name: t.terminalType.name, label: tc(t.terminalType), idx: t.idx },
                        r = t.terminalType.PATTERN;
                    return t.terminalType.PATTERN && (n.pattern = (0, T.Kj)(r) ? r.source : r), n;
                } else if (t instanceof tN) return { type: "Rule", name: t.name, orgText: t.orgText, definition: e(t.definition) };
                else throw Error("non exhaustive match");
            }
            var tU = (function () {
                function t() { }
                return (
                    (t.prototype.walk = function (t, e) {
                        var n = this;
                        void 0 === e && (e = []),
                            (0, T.Ed)(t.definition, function (r, o) {
                                var i = (0, T.Cw)(t.definition, o + 1);
                                if (r instanceof tR) n.walkProdRef(r, i, e);
                                else if (r instanceof tM) n.walkTerminal(r, i, e);
                                else if (r instanceof tO) n.walkFlat(r, i, e);
                                else if (r instanceof tx) n.walkOption(r, i, e);
                                else if (r instanceof tL) n.walkAtLeastOne(r, i, e);
                                else if (r instanceof tk) n.walkAtLeastOneSep(r, i, e);
                                else if (r instanceof tb) n.walkManySep(r, i, e);
                                else if (r instanceof t_) n.walkMany(r, i, e);
                                else if (r instanceof tP) n.walkOr(r, i, e);
                                else throw Error("non exhaustive match");
                            });
                    }),
                    (t.prototype.walkTerminal = function (t, e, n) { }),
                    (t.prototype.walkProdRef = function (t, e, n) { }),
                    (t.prototype.walkFlat = function (t, e, n) {
                        var r = e.concat(n);
                        this.walk(t, r);
                    }),
                    (t.prototype.walkOption = function (t, e, n) {
                        var r = e.concat(n);
                        this.walk(t, r);
                    }),
                    (t.prototype.walkAtLeastOne = function (t, e, n) {
                        var r = [new tx({ definition: t.definition })].concat(e, n);
                        this.walk(t, r);
                    }),
                    (t.prototype.walkAtLeastOneSep = function (t, e, n) {
                        var r = tj(t, e, n);
                        this.walk(t, r);
                    }),
                    (t.prototype.walkMany = function (t, e, n) {
                        var r = [new tx({ definition: t.definition })].concat(e, n);
                        this.walk(t, r);
                    }),
                    (t.prototype.walkManySep = function (t, e, n) {
                        var r = tj(t, e, n);
                        this.walk(t, r);
                    }),
                    (t.prototype.walkOr = function (t, e, n) {
                        var r = this,
                            o = e.concat(n);
                        (0, T.Ed)(t.definition, function (t) {
                            var e = new tO({ definition: [t] });
                            r.walk(e, o);
                        });
                    }),
                    t
                );
            })();
            function tj(t, e, n) {
                return [new tx({ definition: [new tM({ terminalType: t.separator })].concat(t.definition) })].concat(e, n);
            }
            var tG = (function () {
                function t() { }
                return (
                    (t.prototype.visit = function (t) {
                        switch (t.constructor) {
                            case tR:
                                return this.visitNonTerminal(t);
                            case tO:
                                return this.visitAlternative(t);
                            case tx:
                                return this.visitOption(t);
                            case tL:
                                return this.visitRepetitionMandatory(t);
                            case tk:
                                return this.visitRepetitionMandatoryWithSeparator(t);
                            case tb:
                                return this.visitRepetitionWithSeparator(t);
                            case t_:
                                return this.visitRepetition(t);
                            case tP:
                                return this.visitAlternation(t);
                            case tM:
                                return this.visitTerminal(t);
                            case tN:
                                return this.visitRule(t);
                            default:
                                throw Error("non exhaustive match");
                        }
                    }),
                    (t.prototype.visitNonTerminal = function (t) { }),
                    (t.prototype.visitAlternative = function (t) { }),
                    (t.prototype.visitOption = function (t) { }),
                    (t.prototype.visitRepetition = function (t) { }),
                    (t.prototype.visitRepetitionMandatory = function (t) { }),
                    (t.prototype.visitRepetitionMandatoryWithSeparator = function (t) { }),
                    (t.prototype.visitRepetitionWithSeparator = function (t) { }),
                    (t.prototype.visitAlternation = function (t) { }),
                    (t.prototype.visitTerminal = function (t) { }),
                    (t.prototype.visitRule = function (t) { }),
                    t
                );
            })(),
                tW =
                    ((a = function (t, e) {
                        return (a =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (t, e) {
                                    t.__proto__ = e;
                                }) ||
                            function (t, e) {
                                for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                            })(t, e);
                    }),
                        function (t, e) {
                            function n() {
                                this.constructor = t;
                            }
                            a(t, e), (t.prototype = null === e ? Object.create(e) : ((n.prototype = e.prototype), new n()));
                        });
            function tV(t, e) {
                return (
                    void 0 === e && (e = []),
                    t instanceof tx ||
                    t instanceof t_ ||
                    t instanceof tb ||
                    (t instanceof tP
                        ? (0, T.G)(t.definition, function (t) {
                            return tV(t, e);
                        })
                        : !(t instanceof tR && (0, T.r3)(e, t)) &&
                        t instanceof tS &&
                        (t instanceof tR && e.push(t),
                            (0, T.yW)(t.definition, function (t) {
                                return tV(t, e);
                            })))
                );
            }
            function tK(t) {
                if (t instanceof tR) return "SUBRULE";
                if (t instanceof tx) return "OPTION";
                if (t instanceof tP) return "OR";
                if (t instanceof tL) return "AT_LEAST_ONE";
                if (t instanceof tk) return "AT_LEAST_ONE_SEP";
                if (t instanceof tb) return "MANY_SEP";
                if (t instanceof t_) return "MANY";
                else if (t instanceof tM) return "CONSUME";
                else throw Error("non exhaustive match");
            }
            var tH = (function (t) {
                function e() {
                    var e = (null !== t && t.apply(this, arguments)) || this;
                    return (e.separator = "-"), (e.dslMethods = { option: [], alternation: [], repetition: [], repetitionWithSeparator: [], repetitionMandatory: [], repetitionMandatoryWithSeparator: [] }), e;
                }
                return (
                    tW(e, t),
                    (e.prototype.reset = function () {
                        this.dslMethods = { option: [], alternation: [], repetition: [], repetitionWithSeparator: [], repetitionMandatory: [], repetitionMandatoryWithSeparator: [] };
                    }),
                    (e.prototype.visitTerminal = function (t) {
                        var e = t.terminalType.name + this.separator + "Terminal";
                        (0, T.e$)(this.dslMethods, e) || (this.dslMethods[e] = []), this.dslMethods[e].push(t);
                    }),
                    (e.prototype.visitNonTerminal = function (t) {
                        var e = t.nonTerminalName + this.separator + "Terminal";
                        (0, T.e$)(this.dslMethods, e) || (this.dslMethods[e] = []), this.dslMethods[e].push(t);
                    }),
                    (e.prototype.visitOption = function (t) {
                        this.dslMethods.option.push(t);
                    }),
                    (e.prototype.visitRepetitionWithSeparator = function (t) {
                        this.dslMethods.repetitionWithSeparator.push(t);
                    }),
                    (e.prototype.visitRepetitionMandatory = function (t) {
                        this.dslMethods.repetitionMandatory.push(t);
                    }),
                    (e.prototype.visitRepetitionMandatoryWithSeparator = function (t) {
                        this.dslMethods.repetitionMandatoryWithSeparator.push(t);
                    }),
                    (e.prototype.visitRepetition = function (t) {
                        this.dslMethods.repetition.push(t);
                    }),
                    (e.prototype.visitAlternation = function (t) {
                        this.dslMethods.alternation.push(t);
                    }),
                    e
                );
            })(tG),
                t$ = new tH();
            function tY(t) {
                if (t instanceof tR) return tY(t.referencedRule);
                if (t instanceof tM) return [t.terminalType];
                if (t instanceof tO || t instanceof tx || t instanceof t_ || t instanceof tL || t instanceof tk || t instanceof tb || t instanceof tM || t instanceof tN)
                    return (function (t) {
                        for (var e, n = [], r = t.definition, o = 0, i = r.length > o, u = !0; i && u;) (u = tV((e = r[o]))), (n = n.concat(tY(e))), (o += 1), (i = r.length > o);
                        return (0, T.jj)(n);
                    })(t);
                if (t instanceof tP) {
                    var e;
                    return (
                        (e = (0, T.UI)(t.definition, function (t) {
                            return tY(t);
                        })),
                        (0, T.jj)((0, T.xH)(e))
                    );
                }
                throw Error("non exhaustive match");
            }
            var tX = "_~IN~_",
                tz =
                    ((s = function (t, e) {
                        return (s =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (t, e) {
                                    t.__proto__ = e;
                                }) ||
                            function (t, e) {
                                for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                            })(t, e);
                    }),
                        function (t, e) {
                            function n() {
                                this.constructor = t;
                            }
                            s(t, e), (t.prototype = null === e ? Object.create(e) : ((n.prototype = e.prototype), new n()));
                        }),
                tQ = (function (t) {
                    function e(e) {
                        var n = t.call(this) || this;
                        return (n.topProd = e), (n.follows = {}), n;
                    }
                    return (
                        tz(e, t),
                        (e.prototype.startWalking = function () {
                            return this.walk(this.topProd), this.follows;
                        }),
                        (e.prototype.walkTerminal = function (t, e, n) { }),
                        (e.prototype.walkProdRef = function (t, e, n) {
                            var r,
                                o,
                                i = ((r = t.referencedRule), (o = t.idx), r.name + o + tX + this.topProd.name),
                                u = tY(new tO({ definition: e.concat(n) }));
                            this.follows[i] = u;
                        }),
                        e
                    );
                })(tU),
                tq = {
                    buildMismatchTokenMessage: function (t) {
                        var e = t.expected,
                            n = t.actual;
                        return t.previous, t.ruleName, "Expecting " + (tp(e) ? "--> " + tc(e) + " <--" : "token of type --> " + e.name + " <--") + " but found --> '" + n.image + "' <--";
                    },
                    buildNotAllInputParsedMessage: function (t) {
                        var e = t.firstRedundant;
                        return t.ruleName, "Redundant input, expecting EOF but found: " + e.image;
                    },
                    buildNoViableAltMessage: function (t) {
                        var e = t.expectedPathsPerAlt,
                            n = t.actual,
                            r = (t.previous, t.customUserDescription);
                        t.ruleName;
                        var o = "Expecting: ",
                            i = "\nbut found: '" + (0, T.Ps)(n).image + "'";
                        if (r) return o + r + i;
                        var u = (0, T.u4)(
                            e,
                            function (t, e) {
                                return t.concat(e);
                            },
                            []
                        ),
                            a = (0, T.UI)(u, function (t) {
                                return (
                                    "[" +
                                    (0, T.UI)(t, function (t) {
                                        return tc(t);
                                    }).join(", ") +
                                    "]"
                                );
                            });
                        return (
                            o +
                            "one of these possible Token sequences:\n" +
                            (0, T.UI)(a, function (t, e) {
                                return "  " + (e + 1) + ". " + t;
                            }).join("\n") +
                            i
                        );
                    },
                    buildEarlyExitMessage: function (t) {
                        var e = t.expectedIterationPaths,
                            n = t.actual,
                            r = t.customUserDescription;
                        t.ruleName;
                        var o = "Expecting: ",
                            i = "\nbut found: '" + (0, T.Ps)(n).image + "'";
                        return r
                            ? o + r + i
                            : o +
                            "expecting at least one iteration which starts with one of these possible Token sequences::\n  <" +
                            (0, T.UI)(e, function (t) {
                                return (
                                    "[" +
                                    (0, T.UI)(t, function (t) {
                                        return tc(t);
                                    }).join(",") +
                                    "]"
                                );
                            }).join(" ,") +
                            ">" +
                            i;
                    },
                };
            Object.freeze(tq);
            var tJ = {
                buildRuleNotFoundError: function (t, e) {
                    return "Invalid grammar, reference to a rule which is not defined: ->" + e.nonTerminalName + "<-\ninside top level rule: ->" + t.name + "<-";
                },
            },
                tZ = {
                    buildDuplicateFoundError: function (t, e) {
                        var n = t.name,
                            r = (0, T.Ps)(e),
                            o = r.idx,
                            i = tK(r),
                            u = r instanceof tM ? r.terminalType.name : r instanceof tR ? r.nonTerminalName : "",
                            a =
                                "->" +
                                i +
                                (o > 0 ? o : "") +
                                "<- " +
                                (u ? "with argument: ->" + u + "<-" : "") +
                                "\n                  appears more than once (" +
                                e.length +
                                " times) in the top level rule: ->" +
                                n +
                                "<-.                  \n                  For further details see: https://sap.github.io/chevrotain/docs/FAQ.html#NUMERICAL_SUFFIXES \n                  ";
                        return (a = a.replace(/[ \t]+/g, " ")).replace(/\s\s+/g, "\n");
                    },
                    buildNamespaceConflictError: function (t) {
                        return (
                            "Namespace conflict found in grammar.\nThe grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <" +
                            t.name +
                            ">.\nTo resolve this make sure each Terminal and Non-Terminal names are unique\nThis is easy to accomplish by using the convention that Terminal names start with an uppercase letter\nand Non-Terminal names start with a lower case letter."
                        );
                    },
                    buildAlternationPrefixAmbiguityError: function (t) {
                        var e = (0, T.UI)(t.prefixPath, function (t) {
                            return tc(t);
                        }).join(", "),
                            n = 0 === t.alternation.idx ? "" : t.alternation.idx;
                        return (
                            "Ambiguous alternatives: <" +
                            t.ambiguityIndices.join(" ,") +
                            "> due to common lookahead prefix\n" +
                            ("in <OR" + n) +
                            "> inside <" +
                            t.topLevelRule.name +
                            "> Rule,\n<" +
                            e +
                            "> may appears as a prefix path in all these alternatives.\nSee: https://sap.github.io/chevrotain/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX\nFor Further details."
                        );
                    },
                    buildAlternationAmbiguityError: function (t) {
                        var e = (0, T.UI)(t.prefixPath, function (t) {
                            return tc(t);
                        }).join(", "),
                            n = 0 === t.alternation.idx ? "" : t.alternation.idx;
                        return (
                            "Ambiguous Alternatives Detected: <" +
                            t.ambiguityIndices.join(" ,") +
                            "> in <OR" +
                            n +
                            "> inside <" +
                            t.topLevelRule.name +
                            "> Rule,\n<" +
                            e +
                            "> may appears as a prefix path in all these alternatives.\nSee: https://sap.github.io/chevrotain/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES\nFor Further details."
                        );
                    },
                    buildEmptyRepetitionError: function (t) {
                        var e = tK(t.repetition);
                        return 0 !== t.repetition.idx && (e += t.repetition.idx), "The repetition <" + e + "> within Rule <" + t.topLevelRule.name + "> can never consume any tokens.\nThis could lead to an infinite loop.";
                    },
                    buildTokenNameError: function (t) {
                        return "deprecated";
                    },
                    buildEmptyAlternationError: function (t) {
                        return "Ambiguous empty alternative: <" + (t.emptyChoiceIdx + 1) + ">" + (" in <OR" + t.alternation.idx) + "> inside <" + t.topLevelRule.name + "> Rule.\nOnly the last alternative may be an empty alternative.";
                    },
                    buildTooManyAlternativesError: function (t) {
                        return "An Alternation cannot have more than 256 alternatives:\n" + ("<OR" + t.alternation.idx + "> inside <" + t.topLevelRule.name) + "> Rule.\n has " + (t.alternation.definition.length + 1) + " alternatives.";
                    },
                    buildLeftRecursionError: function (t) {
                        var e = t.topLevelRule.name,
                            n =
                                e +
                                " --> " +
                                T.UI(t.leftRecursionPath, function (t) {
                                    return t.name;
                                })
                                    .concat([e])
                                    .join(" --> ");
                        return (
                            "Left Recursion found in grammar.\nrule: <" +
                            e +
                            "> can be invoked from itself (directly or indirectly)\nwithout consuming any Tokens. The grammar path that causes this is: \n " +
                            n +
                            "\n To fix this refactor your grammar to remove the left recursion.\nsee: https://en.wikipedia.org/wiki/LL_parser#Left_Factoring."
                        );
                    },
                    buildInvalidRuleNameError: function (t) {
                        return "deprecated";
                    },
                    buildDuplicateRuleNameError: function (t) {
                        return "Duplicate definition, rule: ->" + (t.topLevelRule instanceof tN ? t.topLevelRule.name : t.topLevelRule) + "<- is already defined in the grammar: ->" + t.grammarName + "<-";
                    },
                },
                t0 =
                    ((c = function (t, e) {
                        return (c =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (t, e) {
                                    t.__proto__ = e;
                                }) ||
                            function (t, e) {
                                for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                            })(t, e);
                    }),
                        function (t, e) {
                            function n() {
                                this.constructor = t;
                            }
                            c(t, e), (t.prototype = null === e ? Object.create(e) : ((n.prototype = e.prototype), new n()));
                        }),
                t2 = (function (t) {
                    function e(e, n) {
                        var r = t.call(this) || this;
                        return (r.nameToTopRule = e), (r.errMsgProvider = n), (r.errors = []), r;
                    }
                    return (
                        t0(e, t),
                        (e.prototype.resolveRefs = function () {
                            var t = this;
                            (0, T.Ed)((0, T.VO)(this.nameToTopRule), function (e) {
                                (t.currTopLevel = e), e.accept(t);
                            });
                        }),
                        (e.prototype.visitNonTerminal = function (t) {
                            var e = this.nameToTopRule[t.nonTerminalName];
                            if (e) t.referencedRule = e;
                            else {
                                var n = this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel, t);
                                this.errors.push({ message: n, type: g.UNRESOLVED_SUBRULE_REF, ruleName: this.currTopLevel.name, unresolvedRefName: t.nonTerminalName });
                            }
                        }),
                        e
                    );
                })(tG),
                t1 =
                    ((l = function (t, e) {
                        return (l =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (t, e) {
                                    t.__proto__ = e;
                                }) ||
                            function (t, e) {
                                for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                            })(t, e);
                    }),
                        function (t, e) {
                            function n() {
                                this.constructor = t;
                            }
                            l(t, e), (t.prototype = null === e ? Object.create(e) : ((n.prototype = e.prototype), new n()));
                        }),
                t8 = (function (t) {
                    function e(e, n) {
                        var r = t.call(this, e, n) || this;
                        return (r.path = n), (r.nextTerminalName = ""), (r.nextTerminalOccurrence = 0), (r.nextTerminalName = r.path.lastTok.name), (r.nextTerminalOccurrence = r.path.lastTokOccurrence), r;
                    }
                    return (
                        t1(e, t),
                        (e.prototype.walkTerminal = function (t, e, n) {
                            if (this.isAtEndOfPath && t.terminalType.name === this.nextTerminalName && t.idx === this.nextTerminalOccurrence && !this.found) {
                                var r = new tO({ definition: e.concat(n) });
                                (this.possibleTokTypes = tY(r)), (this.found = !0);
                            }
                        }),
                        e
                    );
                })(
                    (function (t) {
                        function e(e, n) {
                            var r = t.call(this) || this;
                            return (r.topProd = e), (r.path = n), (r.possibleTokTypes = []), (r.nextProductionName = ""), (r.nextProductionOccurrence = 0), (r.found = !1), (r.isAtEndOfPath = !1), r;
                        }
                        return (
                            t1(e, t),
                            (e.prototype.startWalking = function () {
                                if (((this.found = !1), this.path.ruleStack[0] !== this.topProd.name)) throw Error("The path does not start with the walker's top Rule!");
                                return (
                                    (this.ruleStack = (0, T.Qw)(this.path.ruleStack).reverse()),
                                    (this.occurrenceStack = (0, T.Qw)(this.path.occurrenceStack).reverse()),
                                    this.ruleStack.pop(),
                                    this.occurrenceStack.pop(),
                                    this.updateExpectedNext(),
                                    this.walk(this.topProd),
                                    this.possibleTokTypes
                                );
                            }),
                            (e.prototype.walk = function (e, n) {
                                void 0 === n && (n = []), this.found || t.prototype.walk.call(this, e, n);
                            }),
                            (e.prototype.walkProdRef = function (t, e, n) {
                                if (t.referencedRule.name === this.nextProductionName && t.idx === this.nextProductionOccurrence) {
                                    var r = e.concat(n);
                                    this.updateExpectedNext(), this.walk(t.referencedRule, r);
                                }
                            }),
                            (e.prototype.updateExpectedNext = function () {
                                (0, T.xb)(this.ruleStack)
                                    ? ((this.nextProductionName = ""), (this.nextProductionOccurrence = 0), (this.isAtEndOfPath = !0))
                                    : ((this.nextProductionName = this.ruleStack.pop()), (this.nextProductionOccurrence = this.occurrenceStack.pop()));
                            }),
                            e
                        );
                    })(tU)
                ),
                t3 = (function (t) {
                    function e(e, n) {
                        var r = t.call(this) || this;
                        return (r.topRule = e), (r.occurrence = n), (r.result = { token: void 0, occurrence: void 0, isEndOfRule: void 0 }), r;
                    }
                    return (
                        t1(e, t),
                        (e.prototype.startWalking = function () {
                            return this.walk(this.topRule), this.result;
                        }),
                        e
                    );
                })(tU),
                t6 = (function (t) {
                    function e() {
                        return (null !== t && t.apply(this, arguments)) || this;
                    }
                    return (
                        t1(e, t),
                        (e.prototype.walkMany = function (e, n, r) {
                            if (e.idx === this.occurrence) {
                                var o = (0, T.Ps)(n.concat(r));
                                (this.result.isEndOfRule = void 0 === o), o instanceof tM && ((this.result.token = o.terminalType), (this.result.occurrence = o.idx));
                            } else t.prototype.walkMany.call(this, e, n, r);
                        }),
                        e
                    );
                })(t3),
                t7 = (function (t) {
                    function e() {
                        return (null !== t && t.apply(this, arguments)) || this;
                    }
                    return (
                        t1(e, t),
                        (e.prototype.walkManySep = function (e, n, r) {
                            if (e.idx === this.occurrence) {
                                var o = (0, T.Ps)(n.concat(r));
                                (this.result.isEndOfRule = void 0 === o), o instanceof tM && ((this.result.token = o.terminalType), (this.result.occurrence = o.idx));
                            } else t.prototype.walkManySep.call(this, e, n, r);
                        }),
                        e
                    );
                })(t3),
                t9 = (function (t) {
                    function e() {
                        return (null !== t && t.apply(this, arguments)) || this;
                    }
                    return (
                        t1(e, t),
                        (e.prototype.walkAtLeastOne = function (e, n, r) {
                            if (e.idx === this.occurrence) {
                                var o = (0, T.Ps)(n.concat(r));
                                (this.result.isEndOfRule = void 0 === o), o instanceof tM && ((this.result.token = o.terminalType), (this.result.occurrence = o.idx));
                            } else t.prototype.walkAtLeastOne.call(this, e, n, r);
                        }),
                        e
                    );
                })(t3),
                t4 = (function (t) {
                    function e() {
                        return (null !== t && t.apply(this, arguments)) || this;
                    }
                    return (
                        t1(e, t),
                        (e.prototype.walkAtLeastOneSep = function (e, n, r) {
                            if (e.idx === this.occurrence) {
                                var o = (0, T.Ps)(n.concat(r));
                                (this.result.isEndOfRule = void 0 === o), o instanceof tM && ((this.result.token = o.terminalType), (this.result.occurrence = o.idx));
                            } else t.prototype.walkAtLeastOneSep.call(this, e, n, r);
                        }),
                        e
                    );
                })(t3);
            function t5(t, e, n) {
                void 0 === n && (n = []), (n = (0, T.Qw)(n));
                var r = [],
                    o = 0;
                function i(i) {
                    var u = t5(i.concat((0, T.Cw)(t, o + 1)), e, n);
                    return r.concat(u);
                }
                for (; n.length < e && o < t.length;) {
                    var u = t[o];
                    if (u instanceof tO || u instanceof tR) return i(u.definition);
                    if (u instanceof tx) r = i(u.definition);
                    else if (u instanceof tL) {
                        var a = u.definition.concat([new t_({ definition: u.definition })]);
                        return i(a);
                    } else if (u instanceof tk) {
                        var a = [new tO({ definition: u.definition }), new t_({ definition: [new tM({ terminalType: u.separator })].concat(u.definition) })];
                        return i(a);
                    } else if (u instanceof tb) {
                        var a = u.definition.concat([new t_({ definition: [new tM({ terminalType: u.separator })].concat(u.definition) })]);
                        r = i(a);
                    } else if (u instanceof t_) {
                        var a = u.definition.concat([new t_({ definition: u.definition })]);
                        r = i(a);
                    } else if (u instanceof tP)
                        return (
                            (0, T.Ed)(u.definition, function (t) {
                                !1 === (0, T.xb)(t.definition) && (r = i(t.definition));
                            }),
                            r
                        );
                    else if (u instanceof tM) n.push(u.terminalType);
                    else throw Error("non exhaustive match");
                    o++;
                }
                return r.push({ partialPath: n, suffixDef: (0, T.Cw)(t, o) }), r;
            }
            function et(t, e, n, r) {
                var o = "EXIT_NONE_TERMINAL",
                    i = [o],
                    u = "EXIT_ALTERNATIVE",
                    a = !1,
                    s = e.length,
                    c = s - r - 1,
                    l = [],
                    p = [];
                for (p.push({ idx: -1, def: t, ruleStack: [], occurrenceStack: [] }); !(0, T.xb)(p);) {
                    var f = p.pop();
                    if (f === u) {
                        a && (0, T.Z$)(p).idx <= c && p.pop();
                        continue;
                    }
                    var h = f.def,
                        D = f.idx,
                        d = f.ruleStack,
                        E = f.occurrenceStack;
                    if (!(0, T.xb)(h)) {
                        var m = h[0];
                        if (m === o) {
                            var y = { idx: D, def: (0, T.Cw)(h), ruleStack: (0, T.j7)(d), occurrenceStack: (0, T.j7)(E) };
                            p.push(y);
                        } else if (m instanceof tM) {
                            if (D < s - 1) {
                                var F = D + 1;
                                if (n(e[F], m.terminalType)) {
                                    var y = { idx: F, def: (0, T.Cw)(h), ruleStack: d, occurrenceStack: E };
                                    p.push(y);
                                }
                            } else if (D === s - 1) l.push({ nextTokenType: m.terminalType, nextTokenOccurrence: m.idx, ruleStack: d, occurrenceStack: E }), (a = !0);
                            else throw Error("non exhaustive match");
                        } else if (m instanceof tR) {
                            var C = (0, T.Qw)(d);
                            C.push(m.nonTerminalName);
                            var g = (0, T.Qw)(E);
                            g.push(m.idx);
                            var y = { idx: D, def: m.definition.concat(i, (0, T.Cw)(h)), ruleStack: C, occurrenceStack: g };
                            p.push(y);
                        } else if (m instanceof tx) {
                            var v = { idx: D, def: (0, T.Cw)(h), ruleStack: d, occurrenceStack: E };
                            p.push(v), p.push(u);
                            var A = { idx: D, def: m.definition.concat((0, T.Cw)(h)), ruleStack: d, occurrenceStack: E };
                            p.push(A);
                        } else if (m instanceof tL) {
                            var I = new t_({ definition: m.definition, idx: m.idx }),
                                S = m.definition.concat([I], (0, T.Cw)(h)),
                                y = { idx: D, def: S, ruleStack: d, occurrenceStack: E };
                            p.push(y);
                        } else if (m instanceof tk) {
                            var R = new tM({ terminalType: m.separator }),
                                I = new t_({ definition: [R].concat(m.definition), idx: m.idx }),
                                S = m.definition.concat([I], (0, T.Cw)(h)),
                                y = { idx: D, def: S, ruleStack: d, occurrenceStack: E };
                            p.push(y);
                        } else if (m instanceof tb) {
                            var v = { idx: D, def: (0, T.Cw)(h), ruleStack: d, occurrenceStack: E };
                            p.push(v), p.push(u);
                            var R = new tM({ terminalType: m.separator }),
                                N = new t_({ definition: [R].concat(m.definition), idx: m.idx }),
                                S = m.definition.concat([N], (0, T.Cw)(h)),
                                A = { idx: D, def: S, ruleStack: d, occurrenceStack: E };
                            p.push(A);
                        } else if (m instanceof t_) {
                            var v = { idx: D, def: (0, T.Cw)(h), ruleStack: d, occurrenceStack: E };
                            p.push(v), p.push(u);
                            var N = new t_({ definition: m.definition, idx: m.idx }),
                                S = m.definition.concat([N], (0, T.Cw)(h)),
                                A = { idx: D, def: S, ruleStack: d, occurrenceStack: E };
                            p.push(A);
                        } else if (m instanceof tP)
                            for (var O = m.definition.length - 1; O >= 0; O--) {
                                var x = { idx: D, def: m.definition[O].definition.concat((0, T.Cw)(h)), ruleStack: d, occurrenceStack: E };
                                p.push(x), p.push(u);
                            }
                        else if (m instanceof tO) p.push({ idx: D, def: m.definition.concat((0, T.Cw)(h)), ruleStack: d, occurrenceStack: E });
                        else if (m instanceof tN)
                            p.push(
                                (function (t, e, n, r) {
                                    var o = (0, T.Qw)(n);
                                    o.push(t.name);
                                    var i = (0, T.Qw)(r);
                                    return i.push(1), { idx: e, def: t.definition, ruleStack: o, occurrenceStack: i };
                                })(m, D, d, E)
                            );
                        else throw Error("non exhaustive match");
                    }
                }
                return l;
            }
            var ee =
                ((p = function (t, e) {
                    return (p =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                            function (t, e) {
                                t.__proto__ = e;
                            }) ||
                        function (t, e) {
                            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                        })(t, e);
                }),
                    function (t, e) {
                        function n() {
                            this.constructor = t;
                        }
                        p(t, e), (t.prototype = null === e ? Object.create(e) : ((n.prototype = e.prototype), new n()));
                    });
            ((f = F || (F = {}))[(f.OPTION = 0)] = "OPTION"),
                (f[(f.REPETITION = 1)] = "REPETITION"),
                (f[(f.REPETITION_MANDATORY = 2)] = "REPETITION_MANDATORY"),
                (f[(f.REPETITION_MANDATORY_WITH_SEPARATOR = 3)] = "REPETITION_MANDATORY_WITH_SEPARATOR"),
                (f[(f.REPETITION_WITH_SEPARATOR = 4)] = "REPETITION_WITH_SEPARATOR"),
                (f[(f.ALTERNATION = 5)] = "ALTERNATION");
            var en = (function (t) {
                function e(e, n, r) {
                    var o = t.call(this) || this;
                    return (o.topProd = e), (o.targetOccurrence = n), (o.targetProdType = r), o;
                }
                return (
                    ee(e, t),
                    (e.prototype.startWalking = function () {
                        return this.walk(this.topProd), this.restDef;
                    }),
                    (e.prototype.checkIsTarget = function (t, e, n, r) {
                        return t.idx === this.targetOccurrence && this.targetProdType === e && ((this.restDef = n.concat(r)), !0);
                    }),
                    (e.prototype.walkOption = function (e, n, r) {
                        this.checkIsTarget(e, F.OPTION, n, r) || t.prototype.walkOption.call(this, e, n, r);
                    }),
                    (e.prototype.walkAtLeastOne = function (e, n, r) {
                        this.checkIsTarget(e, F.REPETITION_MANDATORY, n, r) || t.prototype.walkOption.call(this, e, n, r);
                    }),
                    (e.prototype.walkAtLeastOneSep = function (e, n, r) {
                        this.checkIsTarget(e, F.REPETITION_MANDATORY_WITH_SEPARATOR, n, r) || t.prototype.walkOption.call(this, e, n, r);
                    }),
                    (e.prototype.walkMany = function (e, n, r) {
                        this.checkIsTarget(e, F.REPETITION, n, r) || t.prototype.walkOption.call(this, e, n, r);
                    }),
                    (e.prototype.walkManySep = function (e, n, r) {
                        this.checkIsTarget(e, F.REPETITION_WITH_SEPARATOR, n, r) || t.prototype.walkOption.call(this, e, n, r);
                    }),
                    e
                );
            })(tU),
                er = (function (t) {
                    function e(e, n, r) {
                        var o = t.call(this) || this;
                        return (o.targetOccurrence = e), (o.targetProdType = n), (o.targetRef = r), (o.result = []), o;
                    }
                    return (
                        ee(e, t),
                        (e.prototype.checkIsTarget = function (t, e) {
                            t.idx === this.targetOccurrence && this.targetProdType === e && (void 0 === this.targetRef || t === this.targetRef) && (this.result = t.definition);
                        }),
                        (e.prototype.visitOption = function (t) {
                            this.checkIsTarget(t, F.OPTION);
                        }),
                        (e.prototype.visitRepetition = function (t) {
                            this.checkIsTarget(t, F.REPETITION);
                        }),
                        (e.prototype.visitRepetitionMandatory = function (t) {
                            this.checkIsTarget(t, F.REPETITION_MANDATORY);
                        }),
                        (e.prototype.visitRepetitionMandatoryWithSeparator = function (t) {
                            this.checkIsTarget(t, F.REPETITION_MANDATORY_WITH_SEPARATOR);
                        }),
                        (e.prototype.visitRepetitionWithSeparator = function (t) {
                            this.checkIsTarget(t, F.REPETITION_WITH_SEPARATOR);
                        }),
                        (e.prototype.visitAlternation = function (t) {
                            this.checkIsTarget(t, F.ALTERNATION);
                        }),
                        e
                    );
                })(tG);
            function eo(t) {
                for (var e = Array(t), n = 0; n < t; n++) e[n] = [];
                return e;
            }
            function ei(t) {
                for (var e = [""], n = 0; n < t.length; n++) {
                    for (var r = t[n], o = [], i = 0; i < e.length; i++) {
                        var u = e[i];
                        o.push(u + "_" + r.tokenTypeIdx);
                        for (var a = 0; a < r.categoryMatches.length; a++) {
                            var s = "_" + r.categoryMatches[a];
                            o.push(u + s);
                        }
                    }
                    e = o;
                }
                return e;
            }
            function eu(t, e) {
                for (
                    var n = (0, T.UI)(t, function (t) {
                        return t5([t], 1);
                    }),
                    r = eo(n.length),
                    o = (0, T.UI)(n, function (t) {
                        var e = {};
                        return (
                            (0, T.Ed)(t, function (t) {
                                var n = ei(t.partialPath);
                                (0, T.Ed)(n, function (t) {
                                    e[t] = !0;
                                });
                            }),
                            e
                        );
                    }),
                    i = n,
                    u = 1;
                    u <= e;
                    u++
                ) {
                    var a = i;
                    i = eo(a.length);
                    for (
                        var s = function (t) {
                            for (var n = a[t], s = 0; s < n.length; s++) {
                                var c = n[s].partialPath,
                                    l = n[s].suffixDef,
                                    p = ei(c);
                                if (
                                    (function (t, e, n) {
                                        for (var r = 0; r < t.length; r++)
                                            if (r !== n) {
                                                for (var o = t[r], i = 0; i < e.length; i++) if (!0 === o[e[i]]) return !1;
                                            }
                                        return !0;
                                    })(o, p, t) ||
                                    (0, T.xb)(l) ||
                                    c.length === e
                                ) {
                                    var f = r[t];
                                    if (!1 === ec(f, c)) {
                                        f.push(c);
                                        for (var h = 0; h < p.length; h++) {
                                            var D = p[h];
                                            o[t][D] = !0;
                                        }
                                    }
                                } else {
                                    var d = t5(l, u + 1, c);
                                    (i[t] = i[t].concat(d)),
                                        (0, T.Ed)(d, function (e) {
                                            var n = ei(e.partialPath);
                                            (0, T.Ed)(n, function (e) {
                                                o[t][e] = !0;
                                            });
                                        });
                                }
                            }
                        },
                        c = 0;
                        c < a.length;
                        c++
                    )
                        s(c);
                }
                return r;
            }
            function ea(t, e, n, r) {
                var o = new er(t, F.ALTERNATION, r);
                return e.accept(o), eu(o.result, n);
            }
            function es(t, e, n, r) {
                var o = new er(t, n);
                e.accept(o);
                var i = o.result,
                    u = new en(e, t, n).startWalking();
                return eu([new tO({ definition: i }), new tO({ definition: u })], r);
            }
            function ec(t, e) {
                t: for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    if (r.length === e.length) {
                        for (var o = 0; o < r.length; o++) {
                            var i = e[o],
                                u = r[o];
                            if (!1 == (i === u || void 0 !== u.categoryMatchesMap[i.tokenTypeIdx])) continue t;
                        }
                        return !0;
                    }
                }
                return !1;
            }
            function el(t) {
                return (0, T.yW)(t, function (t) {
                    return (0, T.yW)(t, function (t) {
                        return (0, T.yW)(t, function (t) {
                            return (0, T.xb)(t.categoryMatches);
                        });
                    });
                });
            }
            var ep =
                ((h = function (t, e) {
                    return (h =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                            function (t, e) {
                                t.__proto__ = e;
                            }) ||
                        function (t, e) {
                            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                        })(t, e);
                }),
                    function (t, e) {
                        function n() {
                            this.constructor = t;
                        }
                        h(t, e), (t.prototype = null === e ? Object.create(e) : ((n.prototype = e.prototype), new n()));
                    });
            function ef(t) {
                return tK(t) + "_#_" + t.idx + "_#_" + eh(t);
            }
            function eh(t) {
                return t instanceof tM ? t.terminalType.name : t instanceof tR ? t.nonTerminalName : "";
            }
            var eD = (function (t) {
                function e() {
                    var e = (null !== t && t.apply(this, arguments)) || this;
                    return (e.allProductions = []), e;
                }
                return (
                    ep(e, t),
                    (e.prototype.visitNonTerminal = function (t) {
                        this.allProductions.push(t);
                    }),
                    (e.prototype.visitOption = function (t) {
                        this.allProductions.push(t);
                    }),
                    (e.prototype.visitRepetitionWithSeparator = function (t) {
                        this.allProductions.push(t);
                    }),
                    (e.prototype.visitRepetitionMandatory = function (t) {
                        this.allProductions.push(t);
                    }),
                    (e.prototype.visitRepetitionMandatoryWithSeparator = function (t) {
                        this.allProductions.push(t);
                    }),
                    (e.prototype.visitRepetition = function (t) {
                        this.allProductions.push(t);
                    }),
                    (e.prototype.visitAlternation = function (t) {
                        this.allProductions.push(t);
                    }),
                    (e.prototype.visitTerminal = function (t) {
                        this.allProductions.push(t);
                    }),
                    e
                );
            })(tG),
                ed = (function (t) {
                    function e() {
                        var e = (null !== t && t.apply(this, arguments)) || this;
                        return (e.alternations = []), e;
                    }
                    return (
                        ep(e, t),
                        (e.prototype.visitAlternation = function (t) {
                            this.alternations.push(t);
                        }),
                        e
                    );
                })(tG),
                eE = (function (t) {
                    function e() {
                        var e = (null !== t && t.apply(this, arguments)) || this;
                        return (e.allProductions = []), e;
                    }
                    return (
                        ep(e, t),
                        (e.prototype.visitRepetitionWithSeparator = function (t) {
                            this.allProductions.push(t);
                        }),
                        (e.prototype.visitRepetitionMandatory = function (t) {
                            this.allProductions.push(t);
                        }),
                        (e.prototype.visitRepetitionMandatoryWithSeparator = function (t) {
                            this.allProductions.push(t);
                        }),
                        (e.prototype.visitRepetition = function (t) {
                            this.allProductions.push(t);
                        }),
                        e
                    );
                })(tG);
            function em(t) {
                t = (0, T.ce)(t, { errMsgProvider: tJ });
                var e,
                    n = {};
                return (
                    (0, T.Ed)(t.rules, function (t) {
                        n[t.name] = t;
                    }),
                    (e = new t2(n, t.errMsgProvider)).resolveRefs(),
                    e.errors
                );
            }
            function ey(t) {
                var e, n, r, o, i, u, a, s, c, l, p, f, h, D, d;
                return (
                    (e = (t = (0, T.ce)(t, { errMsgProvider: tZ })).rules),
                    (n = t.maxLookahead),
                    (r = t.tokenTypes),
                    (o = t.errMsgProvider),
                    (i = t.grammarName),
                    (u = T.UI(e, function (t) {
                        return (function (t, e) {
                            var n = new eD();
                            t.accept(n);
                            var r = n.allProductions,
                                o = T.vM(r, ef),
                                i = T.ei(o, function (t) {
                                    return t.length > 1;
                                });
                            return T.UI(T.VO(i), function (n) {
                                var r = T.Ps(n),
                                    o = e.buildDuplicateFoundError(t, n),
                                    i = tK(r),
                                    u = { message: o, type: g.DUPLICATE_PRODUCTIONS, ruleName: t.name, dslName: i, occurrence: r.idx },
                                    a = eh(r);
                                return a && (u.parameter = a), u;
                            });
                        })(t, o);
                    })),
                    (a = T.UI(e, function (t) {
                        return (function t(e, n, r, o) {
                            void 0 === o && (o = []);
                            var i = [],
                                u = (function t(e) {
                                    var n = [];
                                    if (T.xb(e)) return n;
                                    var r = T.Ps(e);
                                    if (r instanceof tR) n.push(r.referencedRule);
                                    else if (r instanceof tO || r instanceof tx || r instanceof tL || r instanceof tk || r instanceof tb || r instanceof t_) n = n.concat(t(r.definition));
                                    else if (r instanceof tP)
                                        n = T.xH(
                                            T.UI(r.definition, function (e) {
                                                return t(e.definition);
                                            })
                                        );
                                    else if (r instanceof tM);
                                    else throw Error("non exhaustive match");
                                    var o = tV(r),
                                        i = e.length > 1;
                                    if (!o || !i) return n;
                                    var u = T.Cw(e);
                                    return n.concat(t(u));
                                })(n.definition);
                            if (T.xb(u)) return [];
                            var a = e.name;
                            T.r3(u, e) && i.push({ message: r.buildLeftRecursionError({ topLevelRule: e, leftRecursionPath: o }), type: g.LEFT_RECURSION, ruleName: a });
                            var s = T.e5(u, o.concat([e])),
                                c = T.UI(s, function (n) {
                                    var i = T.Qw(o);
                                    return i.push(n), t(e, n, r, i);
                                });
                            return i.concat(T.xH(c));
                        })(t, t, o);
                    })),
                    (s = []),
                    (c = []),
                    (l = []),
                    (0, T.yW)(a, T.xb) &&
                    ((s = (0, T.UI)(e, function (t) {
                        return (function (t, e) {
                            var n = new ed();
                            t.accept(n);
                            var r = n.alternations;
                            return T.u4(
                                r,
                                function (n, r) {
                                    var o = T.j7(r.definition),
                                        i = T.UI(o, function (n, o) {
                                            var i = et([n], [], null, 1);
                                            return T.xb(i)
                                                ? { message: e.buildEmptyAlternationError({ topLevelRule: t, alternation: r, emptyChoiceIdx: o }), type: g.NONE_LAST_EMPTY_ALT, ruleName: t.name, occurrence: r.idx, alternative: o + 1 }
                                                : null;
                                        });
                                    return n.concat(T.oA(i));
                                },
                                []
                            );
                        })(t, o);
                    })),
                        (c = (0, T.UI)(e, function (t) {
                            return (function (t, e, n) {
                                var r = new ed();
                                t.accept(r);
                                var o = r.alternations;
                                return (
                                    (o = (0, T.d1)(o, function (t) {
                                        return !0 === t.ignoreAmbiguities;
                                    })),
                                    T.u4(
                                        o,
                                        function (r, o) {
                                            var i,
                                                u,
                                                a,
                                                s,
                                                c = ea(o.idx, t, o.maxLookahead || e, o),
                                                l =
                                                    ((i = []),
                                                        (u = (0, T.u4)(
                                                            c,
                                                            function (t, e, n) {
                                                                return (
                                                                    !0 === o.definition[n].ignoreAmbiguities ||
                                                                    (0, T.Ed)(e, function (e) {
                                                                        var r = [n];
                                                                        (0, T.Ed)(c, function (t, i) {
                                                                            n !== i && ec(t, e) && !0 !== o.definition[i].ignoreAmbiguities && r.push(i);
                                                                        }),
                                                                            r.length > 1 && !ec(i, e) && (i.push(e), t.push({ alts: r, path: e }));
                                                                    }),
                                                                    t
                                                                );
                                                            },
                                                            []
                                                        )),
                                                        T.UI(u, function (e) {
                                                            var r = (0, T.UI)(e.alts, function (t) {
                                                                return t + 1;
                                                            });
                                                            return {
                                                                message: n.buildAlternationAmbiguityError({ topLevelRule: t, alternation: o, ambiguityIndices: r, prefixPath: e.path }),
                                                                type: g.AMBIGUOUS_ALTS,
                                                                ruleName: t.name,
                                                                occurrence: o.idx,
                                                                alternatives: [e.alts],
                                                            };
                                                        })),
                                                p =
                                                    ((a = []),
                                                        (s = (0, T.u4)(
                                                            c,
                                                            function (t, e, n) {
                                                                var r = (0, T.UI)(e, function (t) {
                                                                    return { idx: n, path: t };
                                                                });
                                                                return t.concat(r);
                                                            },
                                                            []
                                                        )),
                                                        (0, T.Ed)(s, function (e) {
                                                            if (!0 !== o.definition[e.idx].ignoreAmbiguities) {
                                                                var r = e.idx,
                                                                    i = e.path,
                                                                    u = (0, T.Oq)(s, function (t) {
                                                                        var e;
                                                                        return (
                                                                            !0 !== o.definition[t.idx].ignoreAmbiguities &&
                                                                            t.idx < r &&
                                                                            (e = t.path).length < i.length &&
                                                                            (0, T.yW)(e, function (t, e) {
                                                                                var n = i[e];
                                                                                return t === n || n.categoryMatchesMap[t.tokenTypeIdx];
                                                                            })
                                                                        );
                                                                    }),
                                                                    c = (0, T.UI)(u, function (e) {
                                                                        var i = [e.idx + 1, r + 1],
                                                                            u = 0 === o.idx ? "" : o.idx;
                                                                        return {
                                                                            message: n.buildAlternationPrefixAmbiguityError({ topLevelRule: t, alternation: o, ambiguityIndices: i, prefixPath: e.path }),
                                                                            type: g.AMBIGUOUS_PREFIX_ALTS,
                                                                            ruleName: t.name,
                                                                            occurrence: u,
                                                                            alternatives: i,
                                                                        };
                                                                    });
                                                                a = a.concat(c);
                                                            }
                                                        }),
                                                        a);
                                            return r.concat(l, p);
                                        },
                                        []
                                    )
                                );
                            })(t, n, o);
                        })),
                        (h = []),
                        (0, T.Ed)(e, function (t) {
                            var e = new eE();
                            t.accept(e);
                            var r = e.allProductions;
                            (0, T.Ed)(r, function (e) {
                                var r = (function (t) {
                                    if (t instanceof tx) return F.OPTION;
                                    if (t instanceof t_) return F.REPETITION;
                                    if (t instanceof tL) return F.REPETITION_MANDATORY;
                                    if (t instanceof tk) return F.REPETITION_MANDATORY_WITH_SEPARATOR;
                                    if (t instanceof tb) return F.REPETITION_WITH_SEPARATOR;
                                    if (t instanceof tP) return F.ALTERNATION;
                                    throw Error("non exhaustive match");
                                })(e),
                                    i = e.maxLookahead || n,
                                    u = es(e.idx, t, r, i)[0];
                                if ((0, T.xb)((0, T.xH)(u))) {
                                    var a = o.buildEmptyRepetitionError({ topLevelRule: t, repetition: e });
                                    h.push({ message: a, type: g.NO_NON_EMPTY_LOOKAHEAD, ruleName: t.name });
                                }
                            });
                        }),
                        (l = h)),
                    (D = []),
                    (d = (0, T.UI)(r, function (t) {
                        return t.name;
                    })),
                    (0, T.Ed)(e, function (t) {
                        var e = t.name;
                        if ((0, T.r3)(d, e)) {
                            var n = o.buildNamespaceConflictError(t);
                            D.push({ message: n, type: g.CONFLICT_TOKENS_RULES_NAMESPACE, ruleName: e });
                        }
                    }),
                    (p = (0, T.UI)(e, function (t) {
                        return (function (t, e) {
                            var n = new ed();
                            t.accept(n);
                            var r = n.alternations;
                            return T.u4(
                                r,
                                function (n, r) {
                                    return r.definition.length > 255 && n.push({ message: e.buildTooManyAlternativesError({ topLevelRule: t, alternation: r }), type: g.TOO_MANY_ALTS, ruleName: t.name, occurrence: r.idx }), n;
                                },
                                []
                            );
                        })(t, o);
                    })),
                    (f = (0, T.UI)(e, function (t) {
                        return (function (t, e, n, r) {
                            var o = [];
                            if (
                                (0, T.u4)(
                                    e,
                                    function (e, n) {
                                        return n.name === t.name ? e + 1 : e;
                                    },
                                    0
                                ) > 1
                            ) {
                                var i = r.buildDuplicateRuleNameError({ topLevelRule: t, grammarName: n });
                                o.push({ message: i, type: g.DUPLICATE_RULE_NAME, ruleName: t.name });
                            }
                            return o;
                        })(t, e, i, o);
                    })),
                    T.xH(u.concat(l, a, s, c, D, p, f))
                );
            }
            function eF(t) {
                (0, T.Ed)(t.rules, function (t) {
                    var e = new tH();
                    t.accept(e),
                        (0, T.Ed)(e.dslMethods, function (t) {
                            (0, T.Ed)(t, function (t, e) {
                                t.idx = e + 1;
                            });
                        });
                });
            }
            var eC =
                ((D = function (t, e) {
                    return (D =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                            function (t, e) {
                                t.__proto__ = e;
                            }) ||
                        function (t, e) {
                            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                        })(t, e);
                }),
                    function (t, e) {
                        function n() {
                            this.constructor = t;
                        }
                        D(t, e), (t.prototype = null === e ? Object.create(e) : ((n.prototype = e.prototype), new n()));
                    }),
                eg = "MismatchedTokenException",
                ev = "NoViableAltException",
                eT = "EarlyExitException",
                eA = "NotAllInputParsedException",
                eI = [eg, ev, eT, eA];
            function eS(t) {
                return (0, T.r3)(eI, t.name);
            }
            Object.freeze(eI);
            var eR = (function (t) {
                function e(e, n) {
                    var r = this.constructor,
                        o = t.call(this, e) || this;
                    return (o.token = n), (o.resyncedTokens = []), Object.setPrototypeOf(o, r.prototype), Error.captureStackTrace && Error.captureStackTrace(o, o.constructor), o;
                }
                return eC(e, t), e;
            })(Error),
                eN = (function (t) {
                    function e(e, n, r) {
                        var o = t.call(this, e, n) || this;
                        return (o.previousToken = r), (o.name = eg), o;
                    }
                    return eC(e, t), e;
                })(eR),
                eO = (function (t) {
                    function e(e, n, r) {
                        var o = t.call(this, e, n) || this;
                        return (o.previousToken = r), (o.name = ev), o;
                    }
                    return eC(e, t), e;
                })(eR),
                ex = (function (t) {
                    function e(e, n) {
                        var r = t.call(this, e, n) || this;
                        return (r.name = eA), r;
                    }
                    return eC(e, t), e;
                })(eR),
                eL = (function (t) {
                    function e(e, n, r) {
                        var o = t.call(this, e, n) || this;
                        return (o.previousToken = r), (o.name = eT), o;
                    }
                    return eC(e, t), e;
                })(eR),
                ek = {},
                e_ = "InRuleRecoveryException";
            function eb(t) {
                (this.name = e_), (this.message = t);
            }
            eb.prototype = Error.prototype;
            var eP = (function () {
                function t() { }
                return (
                    (t.prototype.initRecoverable = function (t) {
                        (this.firstAfterRepMap = {}),
                            (this.resyncFollows = {}),
                            (this.recoveryEnabled = (0, T.e$)(t, "recoveryEnabled") ? t.recoveryEnabled : e5.recoveryEnabled),
                            this.recoveryEnabled && (this.attemptInRepetitionRecovery = eM);
                    }),
                    (t.prototype.getTokenToInsert = function (t) {
                        var e = tT(t, "", NaN, NaN, NaN, NaN, NaN, NaN);
                        return (e.isInsertedInRecovery = !0), e;
                    }),
                    (t.prototype.canTokenTypeBeInsertedInRecovery = function (t) {
                        return !0;
                    }),
                    (t.prototype.tryInRepetitionRecovery = function (t, e, n, r) {
                        for (
                            var o = this,
                            i = this.findReSyncTokenType(),
                            u = this.exportLexerState(),
                            a = [],
                            s = !1,
                            c = this.LA(1),
                            l = this.LA(1),
                            p = function () {
                                var t = o.LA(0),
                                    e = new eN(o.errorMessageProvider.buildMismatchTokenMessage({ expected: r, actual: c, previous: t, ruleName: o.getCurrRuleFullName() }), c, o.LA(0));
                                (e.resyncedTokens = (0, T.j7)(a)), o.SAVE_ERROR(e);
                            };
                            !s;

                        ) {
                            if (this.tokenMatcher(l, r)) {
                                p();
                                return;
                            }
                            if (n.call(this)) {
                                p(), t.apply(this, e);
                                return;
                            }
                            this.tokenMatcher(l, i) ? (s = !0) : ((l = this.SKIP_TOKEN()), this.addToResyncTokens(l, a));
                        }
                        this.importLexerState(u);
                    }),
                    (t.prototype.shouldInRepetitionRecoveryBeTried = function (t, e, n) {
                        return !(!1 === n || void 0 === t || void 0 === e || this.tokenMatcher(this.LA(1), t) || this.isBackTracking() || this.canPerformInRuleRecovery(t, this.getFollowsForInRuleRecovery(t, e)));
                    }),
                    (t.prototype.getFollowsForInRuleRecovery = function (t, e) {
                        var n = this.getCurrentGrammarPath(t, e);
                        return this.getNextPossibleTokenTypes(n);
                    }),
                    (t.prototype.tryInRuleRecovery = function (t, e) {
                        if (this.canRecoverWithSingleTokenInsertion(t, e)) return this.getTokenToInsert(t);
                        if (this.canRecoverWithSingleTokenDeletion(t)) {
                            var n = this.SKIP_TOKEN();
                            return this.consumeToken(), n;
                        }
                        throw new eb("sad sad panda");
                    }),
                    (t.prototype.canPerformInRuleRecovery = function (t, e) {
                        return this.canRecoverWithSingleTokenInsertion(t, e) || this.canRecoverWithSingleTokenDeletion(t);
                    }),
                    (t.prototype.canRecoverWithSingleTokenInsertion = function (t, e) {
                        var n = this;
                        if (!this.canTokenTypeBeInsertedInRecovery(t) || (0, T.xb)(e)) return !1;
                        var r = this.LA(1);
                        return (
                            void 0 !==
                            (0, T.sE)(e, function (t) {
                                return n.tokenMatcher(r, t);
                            })
                        );
                    }),
                    (t.prototype.canRecoverWithSingleTokenDeletion = function (t) {
                        return this.tokenMatcher(this.LA(2), t);
                    }),
                    (t.prototype.isInCurrentRuleReSyncSet = function (t) {
                        var e = this.getCurrFollowKey(),
                            n = this.getFollowSetFromFollowKey(e);
                        return (0, T.r3)(n, t);
                    }),
                    (t.prototype.findReSyncTokenType = function () {
                        for (var t = this.flattenFollowSet(), e = this.LA(1), n = 2; ;) {
                            var r = e.tokenType;
                            if ((0, T.r3)(t, r)) return r;
                            (e = this.LA(n)), n++;
                        }
                    }),
                    (t.prototype.getCurrFollowKey = function () {
                        if (1 === this.RULE_STACK.length) return ek;
                        var t = this.getLastExplicitRuleShortName(),
                            e = this.getLastExplicitRuleOccurrenceIndex(),
                            n = this.getPreviousExplicitRuleShortName();
                        return { ruleName: this.shortRuleNameToFullName(t), idxInCallingRule: e, inRule: this.shortRuleNameToFullName(n) };
                    }),
                    (t.prototype.buildFullFollowKeyStack = function () {
                        var t = this,
                            e = this.RULE_STACK,
                            n = this.RULE_OCCURRENCE_STACK;
                        return (0, T.UI)(e, function (r, o) {
                            return 0 === o ? ek : { ruleName: t.shortRuleNameToFullName(r), idxInCallingRule: n[o], inRule: t.shortRuleNameToFullName(e[o - 1]) };
                        });
                    }),
                    (t.prototype.flattenFollowSet = function () {
                        var t = this,
                            e = (0, T.UI)(this.buildFullFollowKeyStack(), function (e) {
                                return t.getFollowSetFromFollowKey(e);
                            });
                        return (0, T.xH)(e);
                    }),
                    (t.prototype.getFollowSetFromFollowKey = function (t) {
                        if (t === ek) return [tv];
                        var e = t.ruleName + t.idxInCallingRule + tX + t.inRule;
                        return this.resyncFollows[e];
                    }),
                    (t.prototype.addToResyncTokens = function (t, e) {
                        return this.tokenMatcher(t, tv) || e.push(t), e;
                    }),
                    (t.prototype.reSyncTo = function (t) {
                        for (var e = [], n = this.LA(1); !1 === this.tokenMatcher(n, t);) (n = this.SKIP_TOKEN()), this.addToResyncTokens(n, e);
                        return (0, T.j7)(e);
                    }),
                    (t.prototype.attemptInRepetitionRecovery = function (t, e, n, r, o, i, u) { }),
                    (t.prototype.getCurrentGrammarPath = function (t, e) {
                        return { ruleStack: this.getHumanReadableRuleStack(), occurrenceStack: (0, T.Qw)(this.RULE_OCCURRENCE_STACK), lastTok: t, lastTokOccurrence: e };
                    }),
                    (t.prototype.getHumanReadableRuleStack = function () {
                        var t = this;
                        return (0, T.UI)(this.RULE_STACK, function (e) {
                            return t.shortRuleNameToFullName(e);
                        });
                    }),
                    t
                );
            })();
            function eM(t, e, n, r, o, i, u) {
                var a = this.getKeyForAutomaticLookahead(r, o),
                    s = this.firstAfterRepMap[a];
                if (void 0 === s) {
                    var c = this.getCurrRuleFullName();
                    (s = new i(this.getGAstProductions()[c], o).startWalking()), (this.firstAfterRepMap[a] = s);
                }
                var l = s.token,
                    p = s.occurrence,
                    f = s.isEndOfRule;
                1 === this.RULE_STACK.length && f && void 0 === l && ((l = tv), (p = 1)), this.shouldInRepetitionRecoveryBeTried(l, p, u) && this.tryInRepetitionRecovery(t, e, n, l);
            }
            var eB = (function () {
                function t() { }
                return (
                    (t.prototype.initLooksAhead = function (t) {
                        (this.dynamicTokensEnabled = (0, T.e$)(t, "dynamicTokensEnabled") ? t.dynamicTokensEnabled : e5.dynamicTokensEnabled),
                            (this.maxLookahead = (0, T.e$)(t, "maxLookahead") ? t.maxLookahead : e5.maxLookahead),
                            (this.lookAheadFuncsCache = (0, T.dU)() ? new Map() : []),
                            (0, T.dU)()
                                ? ((this.getLaFuncFromCache = this.getLaFuncFromMap), (this.setLaFuncCache = this.setLaFuncCacheUsingMap))
                                : ((this.getLaFuncFromCache = this.getLaFuncFromObj), (this.setLaFuncCache = this.setLaFuncUsingObj));
                    }),
                    (t.prototype.preComputeLookaheadFunctions = function (t) {
                        var e = this;
                        (0, T.Ed)(t, function (t) {
                            e.TRACE_INIT(t.name + " Rule Lookahead", function () {
                                var n,
                                    r = (t$.reset(), t.accept(t$), (n = t$.dslMethods), t$.reset(), n),
                                    o = r.alternation,
                                    i = r.repetition,
                                    u = r.option,
                                    a = r.repetitionMandatory,
                                    s = r.repetitionMandatoryWithSeparator,
                                    c = r.repetitionWithSeparator;
                                (0, T.Ed)(o, function (n) {
                                    var r = 0 === n.idx ? "" : n.idx;
                                    e.TRACE_INIT("" + tK(n) + r, function () {
                                        var r,
                                            o,
                                            i,
                                            u,
                                            a,
                                            s,
                                            c,
                                            l,
                                            p =
                                                ((r = n.idx),
                                                    (o = n.maxLookahead || e.maxLookahead),
                                                    (i = n.hasPredicates),
                                                    (u = e.dynamicTokensEnabled),
                                                    (a = e.lookAheadBuilderForAlternatives),
                                                    (c = el((s = ea(r, t, o))) ? Z : J),
                                                    a(s, i, c, u)),
                                            f = ((l = e.fullRuleNameToShort[t.name]), 256 | n.idx | l);
                                        e.setLaFuncCache(f, p);
                                    });
                                }),
                                    (0, T.Ed)(i, function (n) {
                                        e.computeLookaheadFunc(t, n.idx, 768, F.REPETITION, n.maxLookahead, tK(n));
                                    }),
                                    (0, T.Ed)(u, function (n) {
                                        e.computeLookaheadFunc(t, n.idx, 512, F.OPTION, n.maxLookahead, tK(n));
                                    }),
                                    (0, T.Ed)(a, function (n) {
                                        e.computeLookaheadFunc(t, n.idx, 1024, F.REPETITION_MANDATORY, n.maxLookahead, tK(n));
                                    }),
                                    (0, T.Ed)(s, function (n) {
                                        e.computeLookaheadFunc(t, n.idx, 1536, F.REPETITION_MANDATORY_WITH_SEPARATOR, n.maxLookahead, tK(n));
                                    }),
                                    (0, T.Ed)(c, function (n) {
                                        e.computeLookaheadFunc(t, n.idx, 1280, F.REPETITION_WITH_SEPARATOR, n.maxLookahead, tK(n));
                                    });
                            });
                        });
                    }),
                    (t.prototype.computeLookaheadFunc = function (t, e, n, r, o, i) {
                        var u = this;
                        this.TRACE_INIT("" + i + (0 === e ? "" : e), function () {
                            var i,
                                a,
                                s,
                                c,
                                l,
                                p = ((i = o || u.maxLookahead), (a = u.dynamicTokensEnabled), (s = u.lookAheadBuilderForOptional), (l = el((c = es(e, t, r, i))) ? Z : J), s(c[0], l, a)),
                                f = e | n | u.fullRuleNameToShort[t.name];
                            u.setLaFuncCache(f, p);
                        });
                    }),
                    (t.prototype.lookAheadBuilderForOptional = function (t, e, n) {
                        return (function (t, e, n) {
                            var r = (0, T.yW)(t, function (t) {
                                return 1 === t.length;
                            }),
                                o = t.length;
                            if (!r || n)
                                return function () {
                                    e: for (var n = 0; n < o; n++) {
                                        for (var r = t[n], i = r.length, u = 0; u < i; u++) if (!1 === e(this.LA(u + 1), r[u])) continue e;
                                        return !0;
                                    }
                                    return !1;
                                };
                            var i = (0, T.xH)(t);
                            if (1 === i.length && (0, T.xb)(i[0].categoryMatches)) {
                                var u = i[0].tokenTypeIdx;
                                return function () {
                                    return this.LA(1).tokenTypeIdx === u;
                                };
                            }
                            var a = (0, T.u4)(
                                i,
                                function (t, e, n) {
                                    return (
                                        (t[e.tokenTypeIdx] = !0),
                                        (0, T.Ed)(e.categoryMatches, function (e) {
                                            t[e] = !0;
                                        }),
                                        t
                                    );
                                },
                                []
                            );
                            return function () {
                                return !0 === a[this.LA(1).tokenTypeIdx];
                            };
                        })(t, e, n);
                    }),
                    (t.prototype.lookAheadBuilderForAlternatives = function (t, e, n, r) {
                        return (function (t, e, n, r) {
                            var o = t.length,
                                i = (0, T.yW)(t, function (t) {
                                    return (0, T.yW)(t, function (t) {
                                        return 1 === t.length;
                                    });
                                });
                            if (e)
                                return function (e) {
                                    for (
                                        var r = (0, T.UI)(e, function (t) {
                                            return t.GATE;
                                        }),
                                        i = 0;
                                        i < o;
                                        i++
                                    ) {
                                        var u = t[i],
                                            a = u.length,
                                            s = r[i];
                                        if (void 0 === s || !1 !== s.call(this))
                                            e: for (var c = 0; c < a; c++) {
                                                for (var l = u[c], p = l.length, f = 0; f < p; f++) if (!1 === n(this.LA(f + 1), l[f])) continue e;
                                                return i;
                                            }
                                    }
                                };
                            if (!i || r)
                                return function () {
                                    for (var e = 0; e < o; e++) {
                                        var r = t[e],
                                            i = r.length;
                                        e: for (var u = 0; u < i; u++) {
                                            for (var a = r[u], s = a.length, c = 0; c < s; c++) if (!1 === n(this.LA(c + 1), a[c])) continue e;
                                            return e;
                                        }
                                    }
                                };
                            var u = (0, T.UI)(t, function (t) {
                                return (0, T.xH)(t);
                            }),
                                a = (0, T.u4)(
                                    u,
                                    function (t, e, n) {
                                        return (
                                            (0, T.Ed)(e, function (e) {
                                                (0, T.e$)(t, e.tokenTypeIdx) || (t[e.tokenTypeIdx] = n),
                                                    (0, T.Ed)(e.categoryMatches, function (e) {
                                                        (0, T.e$)(t, e) || (t[e] = n);
                                                    });
                                            }),
                                            t
                                        );
                                    },
                                    []
                                );
                            return function () {
                                return a[this.LA(1).tokenTypeIdx];
                            };
                        })(t, e, n, r);
                    }),
                    (t.prototype.getKeyForAutomaticLookahead = function (t, e) {
                        return e | t | this.getLastExplicitRuleShortName();
                    }),
                    (t.prototype.getLaFuncFromCache = function (t) { }),
                    (t.prototype.getLaFuncFromMap = function (t) {
                        return this.lookAheadFuncsCache.get(t);
                    }),
                    (t.prototype.getLaFuncFromObj = function (t) {
                        return this.lookAheadFuncsCache[t];
                    }),
                    (t.prototype.setLaFuncCache = function (t, e) { }),
                    (t.prototype.setLaFuncCacheUsingMap = function (t, e) {
                        this.lookAheadFuncsCache.set(t, e);
                    }),
                    (t.prototype.setLaFuncUsingObj = function (t, e) {
                        this.lookAheadFuncsCache[t] = e;
                    }),
                    t
                );
            })();
            function ew(t, e) {
                !0 === isNaN(t.startOffset) ? ((t.startOffset = e.startOffset), (t.endOffset = e.endOffset)) : t.endOffset < e.endOffset == !0 && (t.endOffset = e.endOffset);
            }
            function eU(t, e) {
                !0 === isNaN(t.startOffset)
                    ? ((t.startOffset = e.startOffset), (t.startColumn = e.startColumn), (t.startLine = e.startLine), (t.endOffset = e.endOffset), (t.endColumn = e.endColumn), (t.endLine = e.endLine))
                    : t.endOffset < e.endOffset == !0 && ((t.endOffset = e.endOffset), (t.endColumn = e.endColumn), (t.endLine = e.endLine));
            }
            var ej = "name";
            function eG(t) {
                return t.name || "anonymous";
            }
            function eW(t, e) {
                var n = Object.getOwnPropertyDescriptor(t, ej);
                return (!!(0, T.o8)(n) || !!n.configurable) && (Object.defineProperty(t, ej, { enumerable: !1, configurable: !0, writable: !1, value: e }), !0);
            }
            function eV(t, e) {
                for (var n = (0, T.XP)(t), r = n.length, o = 0; o < r; o++)
                    for (var i = t[n[o]], u = i.length, a = 0; a < u; a++) {
                        var s = i[a];
                        void 0 === s.tokenTypeIdx && this[s.name](s.children, e);
                    }
            }
            ((d = C || (C = {}))[(d.REDUNDANT_METHOD = 0)] = "REDUNDANT_METHOD"), (d[(d.MISSING_METHOD = 1)] = "MISSING_METHOD");
            var eK = ["constructor", "visit", "validateVisitor"],
                eH = (function () {
                    function t() { }
                    return (
                        (t.prototype.initTreeBuilder = function (t) {
                            if (((this.CST_STACK = []), (this.outputCst = t.outputCst), (this.nodeLocationTracking = (0, T.e$)(t, "nodeLocationTracking") ? t.nodeLocationTracking : e5.nodeLocationTracking), this.outputCst)) {
                                if (/full/i.test(this.nodeLocationTracking))
                                    this.recoveryEnabled
                                        ? ((this.setNodeLocationFromToken = eU), (this.setNodeLocationFromNode = eU), (this.cstPostRule = T.dG), (this.setInitialNodeLocation = this.setInitialNodeLocationFullRecovery))
                                        : ((this.setNodeLocationFromToken = T.dG), (this.setNodeLocationFromNode = T.dG), (this.cstPostRule = this.cstPostRuleFull), (this.setInitialNodeLocation = this.setInitialNodeLocationFullRegular));
                                else if (/onlyOffset/i.test(this.nodeLocationTracking))
                                    this.recoveryEnabled
                                        ? ((this.setNodeLocationFromToken = ew), (this.setNodeLocationFromNode = ew), (this.cstPostRule = T.dG), (this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRecovery))
                                        : ((this.setNodeLocationFromToken = T.dG),
                                            (this.setNodeLocationFromNode = T.dG),
                                            (this.cstPostRule = this.cstPostRuleOnlyOffset),
                                            (this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRegular));
                                else if (/none/i.test(this.nodeLocationTracking)) (this.setNodeLocationFromToken = T.dG), (this.setNodeLocationFromNode = T.dG), (this.cstPostRule = T.dG), (this.setInitialNodeLocation = T.dG);
                                else throw Error('Invalid <nodeLocationTracking> config option: "' + t.nodeLocationTracking + '"');
                            } else (this.cstInvocationStateUpdate = T.dG), (this.cstFinallyStateUpdate = T.dG), (this.cstPostTerminal = T.dG), (this.cstPostNonTerminal = T.dG), (this.cstPostRule = T.dG);
                        }),
                        (t.prototype.setInitialNodeLocationOnlyOffsetRecovery = function (t) {
                            t.location = { startOffset: NaN, endOffset: NaN };
                        }),
                        (t.prototype.setInitialNodeLocationOnlyOffsetRegular = function (t) {
                            t.location = { startOffset: this.LA(1).startOffset, endOffset: NaN };
                        }),
                        (t.prototype.setInitialNodeLocationFullRecovery = function (t) {
                            t.location = { startOffset: NaN, startLine: NaN, startColumn: NaN, endOffset: NaN, endLine: NaN, endColumn: NaN };
                        }),
                        (t.prototype.setInitialNodeLocationFullRegular = function (t) {
                            var e = this.LA(1);
                            t.location = { startOffset: e.startOffset, startLine: e.startLine, startColumn: e.startColumn, endOffset: NaN, endLine: NaN, endColumn: NaN };
                        }),
                        (t.prototype.cstInvocationStateUpdate = function (t, e) {
                            var n = { name: t, children: {} };
                            this.setInitialNodeLocation(n), this.CST_STACK.push(n);
                        }),
                        (t.prototype.cstFinallyStateUpdate = function () {
                            this.CST_STACK.pop();
                        }),
                        (t.prototype.cstPostRuleFull = function (t) {
                            var e = this.LA(0),
                                n = t.location;
                            n.startOffset <= e.startOffset == !0 ? ((n.endOffset = e.endOffset), (n.endLine = e.endLine), (n.endColumn = e.endColumn)) : ((n.startOffset = NaN), (n.startLine = NaN), (n.startColumn = NaN));
                        }),
                        (t.prototype.cstPostRuleOnlyOffset = function (t) {
                            var e = this.LA(0),
                                n = t.location;
                            n.startOffset <= e.startOffset == !0 ? (n.endOffset = e.endOffset) : (n.startOffset = NaN);
                        }),
                        (t.prototype.cstPostTerminal = function (t, e) {
                            var n = this.CST_STACK[this.CST_STACK.length - 1];
                            void 0 === n.children[t] ? (n.children[t] = [e]) : n.children[t].push(e), this.setNodeLocationFromToken(n.location, e);
                        }),
                        (t.prototype.cstPostNonTerminal = function (t, e) {
                            var n = this.CST_STACK[this.CST_STACK.length - 1];
                            void 0 === n.children[e] ? (n.children[e] = [t]) : n.children[e].push(t), this.setNodeLocationFromNode(n.location, t.location);
                        }),
                        (t.prototype.getBaseCstVisitorConstructor = function () {
                            if ((0, T.o8)(this.baseCstVisitorConstructor)) {
                                var t,
                                    e,
                                    n,
                                    r =
                                        ((t = this.className),
                                            (e = (0, T.XP)(this.gastProductionsCache)),
                                            eW((n = function () { }), t + "BaseSemantics"),
                                            (n.prototype = {
                                                visit: function (t, e) {
                                                    if (((0, T.kJ)(t) && (t = t[0]), !(0, T.o8)(t))) return this[t.name](t.children, e);
                                                },
                                                validateVisitor: function () {
                                                    var t,
                                                        n,
                                                        r,
                                                        o,
                                                        i =
                                                            ((t = this),
                                                                (n = (0, T.UI)(e, function (e) {
                                                                    if (!(0, T.mf)(t[e])) return { msg: "Missing visitor method: <" + e + "> on " + eG(t.constructor) + " CST Visitor.", type: C.MISSING_METHOD, methodName: e };
                                                                })),
                                                                (r = (0, T.oA)(n)),
                                                                (o = (function (t, e) {
                                                                    var n = [];
                                                                    for (var r in t)
                                                                        !(0, T.mf)(t[r]) ||
                                                                            (0, T.r3)(eK, r) ||
                                                                            (0, T.r3)(e, r) ||
                                                                            n.push({
                                                                                msg: "Redundant visitor method: <" + r + "> on " + eG(t.constructor) + " CST Visitor\nThere is no Grammar Rule corresponding to this method's name.\n",
                                                                                type: C.REDUNDANT_METHOD,
                                                                                methodName: r,
                                                                            });
                                                                    return n;
                                                                })(this, e)),
                                                                r.concat(o));
                                                    if (!(0, T.xb)(i)) {
                                                        var u = (0, T.UI)(i, function (t) {
                                                            return t.msg;
                                                        });
                                                        throw Error("Errors Detected in CST Visitor <" + eG(this.constructor) + ">:\n	" + u.join("\n\n").replace(/\n/g, "\n	"));
                                                    }
                                                },
                                            }),
                                            (n.prototype.constructor = n),
                                            (n._RULE_NAMES = e),
                                            n);
                                return (this.baseCstVisitorConstructor = r), r;
                            }
                            return this.baseCstVisitorConstructor;
                        }),
                        (t.prototype.getBaseCstVisitorConstructorWithDefaults = function () {
                            if ((0, T.o8)(this.baseCstVisitorWithDefaultsConstructor)) {
                                var t,
                                    e,
                                    n,
                                    r,
                                    o,
                                    i =
                                        ((t = this.className),
                                            (e = (0, T.XP)(this.gastProductionsCache)),
                                            (n = this.getBaseCstVisitorConstructor()),
                                            eW((r = function () { }), t + "BaseSemanticsWithDefaults"),
                                            (o = Object.create(n.prototype)),
                                            (0, T.Ed)(e, function (t) {
                                                o[t] = eV;
                                            }),
                                            (r.prototype = o),
                                            (r.prototype.constructor = r),
                                            r);
                                return (this.baseCstVisitorWithDefaultsConstructor = i), i;
                            }
                            return this.baseCstVisitorWithDefaultsConstructor;
                        }),
                        (t.prototype.getLastExplicitRuleShortName = function () {
                            var t = this.RULE_STACK;
                            return t[t.length - 1];
                        }),
                        (t.prototype.getPreviousExplicitRuleShortName = function () {
                            var t = this.RULE_STACK;
                            return t[t.length - 2];
                        }),
                        (t.prototype.getLastExplicitRuleOccurrenceIndex = function () {
                            var t = this.RULE_OCCURRENCE_STACK;
                            return t[t.length - 1];
                        }),
                        t
                    );
                })(),
                e$ = (function () {
                    function t() { }
                    return (
                        (t.prototype.initLexerAdapter = function () {
                            (this.tokVector = []), (this.tokVectorLength = 0), (this.currIdx = -1);
                        }),
                        Object.defineProperty(t.prototype, "input", {
                            get: function () {
                                return this.tokVector;
                            },
                            set: function (t) {
                                if (!0 !== this.selfAnalysisDone) throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");
                                this.reset(), (this.tokVector = t), (this.tokVectorLength = t.length);
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        (t.prototype.SKIP_TOKEN = function () {
                            return this.currIdx <= this.tokVector.length - 2 ? (this.consumeToken(), this.LA(1)) : e4;
                        }),
                        (t.prototype.LA = function (t) {
                            var e = this.currIdx + t;
                            return e < 0 || this.tokVectorLength <= e ? e4 : this.tokVector[e];
                        }),
                        (t.prototype.consumeToken = function () {
                            this.currIdx++;
                        }),
                        (t.prototype.exportLexerState = function () {
                            return this.currIdx;
                        }),
                        (t.prototype.importLexerState = function (t) {
                            this.currIdx = t;
                        }),
                        (t.prototype.resetLexerState = function () {
                            this.currIdx = -1;
                        }),
                        (t.prototype.moveToTerminatedState = function () {
                            this.currIdx = this.tokVector.length - 1;
                        }),
                        (t.prototype.getLexerPosition = function () {
                            return this.exportLexerState();
                        }),
                        t
                    );
                })(),
                eY = (function () {
                    function t() { }
                    return (
                        (t.prototype.ACTION = function (t) {
                            return t.call(this);
                        }),
                        (t.prototype.consume = function (t, e, n) {
                            return this.consumeInternal(e, t, n);
                        }),
                        (t.prototype.subrule = function (t, e, n) {
                            return this.subruleInternal(e, t, n);
                        }),
                        (t.prototype.option = function (t, e) {
                            return this.optionInternal(e, t);
                        }),
                        (t.prototype.or = function (t, e) {
                            return this.orInternal(e, t);
                        }),
                        (t.prototype.many = function (t, e) {
                            return this.manyInternal(t, e);
                        }),
                        (t.prototype.atLeastOne = function (t, e) {
                            return this.atLeastOneInternal(t, e);
                        }),
                        (t.prototype.CONSUME = function (t, e) {
                            return this.consumeInternal(t, 0, e);
                        }),
                        (t.prototype.CONSUME1 = function (t, e) {
                            return this.consumeInternal(t, 1, e);
                        }),
                        (t.prototype.CONSUME2 = function (t, e) {
                            return this.consumeInternal(t, 2, e);
                        }),
                        (t.prototype.CONSUME3 = function (t, e) {
                            return this.consumeInternal(t, 3, e);
                        }),
                        (t.prototype.CONSUME4 = function (t, e) {
                            return this.consumeInternal(t, 4, e);
                        }),
                        (t.prototype.CONSUME5 = function (t, e) {
                            return this.consumeInternal(t, 5, e);
                        }),
                        (t.prototype.CONSUME6 = function (t, e) {
                            return this.consumeInternal(t, 6, e);
                        }),
                        (t.prototype.CONSUME7 = function (t, e) {
                            return this.consumeInternal(t, 7, e);
                        }),
                        (t.prototype.CONSUME8 = function (t, e) {
                            return this.consumeInternal(t, 8, e);
                        }),
                        (t.prototype.CONSUME9 = function (t, e) {
                            return this.consumeInternal(t, 9, e);
                        }),
                        (t.prototype.SUBRULE = function (t, e) {
                            return this.subruleInternal(t, 0, e);
                        }),
                        (t.prototype.SUBRULE1 = function (t, e) {
                            return this.subruleInternal(t, 1, e);
                        }),
                        (t.prototype.SUBRULE2 = function (t, e) {
                            return this.subruleInternal(t, 2, e);
                        }),
                        (t.prototype.SUBRULE3 = function (t, e) {
                            return this.subruleInternal(t, 3, e);
                        }),
                        (t.prototype.SUBRULE4 = function (t, e) {
                            return this.subruleInternal(t, 4, e);
                        }),
                        (t.prototype.SUBRULE5 = function (t, e) {
                            return this.subruleInternal(t, 5, e);
                        }),
                        (t.prototype.SUBRULE6 = function (t, e) {
                            return this.subruleInternal(t, 6, e);
                        }),
                        (t.prototype.SUBRULE7 = function (t, e) {
                            return this.subruleInternal(t, 7, e);
                        }),
                        (t.prototype.SUBRULE8 = function (t, e) {
                            return this.subruleInternal(t, 8, e);
                        }),
                        (t.prototype.SUBRULE9 = function (t, e) {
                            return this.subruleInternal(t, 9, e);
                        }),
                        (t.prototype.OPTION = function (t) {
                            return this.optionInternal(t, 0);
                        }),
                        (t.prototype.OPTION1 = function (t) {
                            return this.optionInternal(t, 1);
                        }),
                        (t.prototype.OPTION2 = function (t) {
                            return this.optionInternal(t, 2);
                        }),
                        (t.prototype.OPTION3 = function (t) {
                            return this.optionInternal(t, 3);
                        }),
                        (t.prototype.OPTION4 = function (t) {
                            return this.optionInternal(t, 4);
                        }),
                        (t.prototype.OPTION5 = function (t) {
                            return this.optionInternal(t, 5);
                        }),
                        (t.prototype.OPTION6 = function (t) {
                            return this.optionInternal(t, 6);
                        }),
                        (t.prototype.OPTION7 = function (t) {
                            return this.optionInternal(t, 7);
                        }),
                        (t.prototype.OPTION8 = function (t) {
                            return this.optionInternal(t, 8);
                        }),
                        (t.prototype.OPTION9 = function (t) {
                            return this.optionInternal(t, 9);
                        }),
                        (t.prototype.OR = function (t) {
                            return this.orInternal(t, 0);
                        }),
                        (t.prototype.OR1 = function (t) {
                            return this.orInternal(t, 1);
                        }),
                        (t.prototype.OR2 = function (t) {
                            return this.orInternal(t, 2);
                        }),
                        (t.prototype.OR3 = function (t) {
                            return this.orInternal(t, 3);
                        }),
                        (t.prototype.OR4 = function (t) {
                            return this.orInternal(t, 4);
                        }),
                        (t.prototype.OR5 = function (t) {
                            return this.orInternal(t, 5);
                        }),
                        (t.prototype.OR6 = function (t) {
                            return this.orInternal(t, 6);
                        }),
                        (t.prototype.OR7 = function (t) {
                            return this.orInternal(t, 7);
                        }),
                        (t.prototype.OR8 = function (t) {
                            return this.orInternal(t, 8);
                        }),
                        (t.prototype.OR9 = function (t) {
                            return this.orInternal(t, 9);
                        }),
                        (t.prototype.MANY = function (t) {
                            this.manyInternal(0, t);
                        }),
                        (t.prototype.MANY1 = function (t) {
                            this.manyInternal(1, t);
                        }),
                        (t.prototype.MANY2 = function (t) {
                            this.manyInternal(2, t);
                        }),
                        (t.prototype.MANY3 = function (t) {
                            this.manyInternal(3, t);
                        }),
                        (t.prototype.MANY4 = function (t) {
                            this.manyInternal(4, t);
                        }),
                        (t.prototype.MANY5 = function (t) {
                            this.manyInternal(5, t);
                        }),
                        (t.prototype.MANY6 = function (t) {
                            this.manyInternal(6, t);
                        }),
                        (t.prototype.MANY7 = function (t) {
                            this.manyInternal(7, t);
                        }),
                        (t.prototype.MANY8 = function (t) {
                            this.manyInternal(8, t);
                        }),
                        (t.prototype.MANY9 = function (t) {
                            this.manyInternal(9, t);
                        }),
                        (t.prototype.MANY_SEP = function (t) {
                            this.manySepFirstInternal(0, t);
                        }),
                        (t.prototype.MANY_SEP1 = function (t) {
                            this.manySepFirstInternal(1, t);
                        }),
                        (t.prototype.MANY_SEP2 = function (t) {
                            this.manySepFirstInternal(2, t);
                        }),
                        (t.prototype.MANY_SEP3 = function (t) {
                            this.manySepFirstInternal(3, t);
                        }),
                        (t.prototype.MANY_SEP4 = function (t) {
                            this.manySepFirstInternal(4, t);
                        }),
                        (t.prototype.MANY_SEP5 = function (t) {
                            this.manySepFirstInternal(5, t);
                        }),
                        (t.prototype.MANY_SEP6 = function (t) {
                            this.manySepFirstInternal(6, t);
                        }),
                        (t.prototype.MANY_SEP7 = function (t) {
                            this.manySepFirstInternal(7, t);
                        }),
                        (t.prototype.MANY_SEP8 = function (t) {
                            this.manySepFirstInternal(8, t);
                        }),
                        (t.prototype.MANY_SEP9 = function (t) {
                            this.manySepFirstInternal(9, t);
                        }),
                        (t.prototype.AT_LEAST_ONE = function (t) {
                            this.atLeastOneInternal(0, t);
                        }),
                        (t.prototype.AT_LEAST_ONE1 = function (t) {
                            return this.atLeastOneInternal(1, t);
                        }),
                        (t.prototype.AT_LEAST_ONE2 = function (t) {
                            this.atLeastOneInternal(2, t);
                        }),
                        (t.prototype.AT_LEAST_ONE3 = function (t) {
                            this.atLeastOneInternal(3, t);
                        }),
                        (t.prototype.AT_LEAST_ONE4 = function (t) {
                            this.atLeastOneInternal(4, t);
                        }),
                        (t.prototype.AT_LEAST_ONE5 = function (t) {
                            this.atLeastOneInternal(5, t);
                        }),
                        (t.prototype.AT_LEAST_ONE6 = function (t) {
                            this.atLeastOneInternal(6, t);
                        }),
                        (t.prototype.AT_LEAST_ONE7 = function (t) {
                            this.atLeastOneInternal(7, t);
                        }),
                        (t.prototype.AT_LEAST_ONE8 = function (t) {
                            this.atLeastOneInternal(8, t);
                        }),
                        (t.prototype.AT_LEAST_ONE9 = function (t) {
                            this.atLeastOneInternal(9, t);
                        }),
                        (t.prototype.AT_LEAST_ONE_SEP = function (t) {
                            this.atLeastOneSepFirstInternal(0, t);
                        }),
                        (t.prototype.AT_LEAST_ONE_SEP1 = function (t) {
                            this.atLeastOneSepFirstInternal(1, t);
                        }),
                        (t.prototype.AT_LEAST_ONE_SEP2 = function (t) {
                            this.atLeastOneSepFirstInternal(2, t);
                        }),
                        (t.prototype.AT_LEAST_ONE_SEP3 = function (t) {
                            this.atLeastOneSepFirstInternal(3, t);
                        }),
                        (t.prototype.AT_LEAST_ONE_SEP4 = function (t) {
                            this.atLeastOneSepFirstInternal(4, t);
                        }),
                        (t.prototype.AT_LEAST_ONE_SEP5 = function (t) {
                            this.atLeastOneSepFirstInternal(5, t);
                        }),
                        (t.prototype.AT_LEAST_ONE_SEP6 = function (t) {
                            this.atLeastOneSepFirstInternal(6, t);
                        }),
                        (t.prototype.AT_LEAST_ONE_SEP7 = function (t) {
                            this.atLeastOneSepFirstInternal(7, t);
                        }),
                        (t.prototype.AT_LEAST_ONE_SEP8 = function (t) {
                            this.atLeastOneSepFirstInternal(8, t);
                        }),
                        (t.prototype.AT_LEAST_ONE_SEP9 = function (t) {
                            this.atLeastOneSepFirstInternal(9, t);
                        }),
                        (t.prototype.RULE = function (t, e, n) {
                            if ((void 0 === n && (n = nt), (0, T.r3)(this.definedRulesNames, t))) {
                                var r = { message: tZ.buildDuplicateRuleNameError({ topLevelRule: t, grammarName: this.className }), type: g.DUPLICATE_RULE_NAME, ruleName: t };
                                this.definitionErrors.push(r);
                            }
                            this.definedRulesNames.push(t);
                            var o = this.defineRule(t, e, n);
                            return (this[t] = o), o;
                        }),
                        (t.prototype.OVERRIDE_RULE = function (t, e, n) {
                            void 0 === n && (n = nt);
                            var r,
                                o,
                                i,
                                u,
                                a = [];
                            (a = a.concat(
                                ((r = this.definedRulesNames),
                                    (o = this.className),
                                    (u = []),
                                    T.r3(r, t) ||
                                    ((i = "Invalid rule override, rule: ->" + t + "<- cannot be overridden in the grammar: ->" + o + "<-as it is not defined in any of the super grammars "),
                                        u.push({ message: i, type: g.INVALID_RULE_OVERRIDE, ruleName: t })),
                                    u)
                            )),
                                this.definitionErrors.push.apply(this.definitionErrors, a);
                            var s = this.defineRule(t, e, n);
                            return (this[t] = s), s;
                        }),
                        (t.prototype.BACKTRACK = function (t, e) {
                            return function () {
                                this.isBackTrackingStack.push(1);
                                var n = this.saveRecogState();
                                try {
                                    return t.apply(this, e), !0;
                                } catch (t) {
                                    if (eS(t)) return !1;
                                    throw t;
                                } finally {
                                    this.reloadRecogState(n), this.isBackTrackingStack.pop();
                                }
                            };
                        }),
                        (t.prototype.getGAstProductions = function () {
                            return this.gastProductionsCache;
                        }),
                        (t.prototype.getSerializedGastProductions = function () {
                            return tB((0, T.VO)(this.gastProductionsCache));
                        }),
                        t
                    );
                })(),
                eX = (function () {
                    function t() { }
                    return (
                        (t.prototype.initRecognizerEngine = function (t, e) {
                            if (
                                ((this.className = eG(this.constructor)),
                                    (this.shortRuleNameToFull = {}),
                                    (this.fullRuleNameToShort = {}),
                                    (this.ruleShortNameIdx = 256),
                                    (this.tokenMatcher = Z),
                                    (this.definedRulesNames = []),
                                    (this.tokensMap = {}),
                                    (this.isBackTrackingStack = []),
                                    (this.RULE_STACK = []),
                                    (this.RULE_OCCURRENCE_STACK = []),
                                    (this.gastProductionsCache = {}),
                                    (0, T.e$)(e, "serializedGrammar"))
                            )
                                throw Error("The Parser's configuration can no longer contain a <serializedGrammar> property.\n	See: https://sap.github.io/chevrotain/docs/changes/BREAKING_CHANGES.html#_6-0-0\n	For Further details.");
                            if ((0, T.kJ)(t)) {
                                if ((0, T.xb)(t)) throw Error("A Token Vocabulary cannot be empty.\n	Note that the first argument for the parser constructor\n	is no longer a Token vector (since v4.0).");
                                if ("number" == typeof t[0].startOffset)
                                    throw Error("The Parser constructor no longer accepts a token vector as the first argument.\n	See: https://sap.github.io/chevrotain/docs/changes/BREAKING_CHANGES.html#_4-0-0\n	For Further details.");
                            }
                            if ((0, T.kJ)(t))
                                this.tokensMap = (0, T.u4)(
                                    t,
                                    function (t, e) {
                                        return (t[e.name] = e), t;
                                    },
                                    {}
                                );
                            else if ((0, T.e$)(t, "modes") && (0, T.yW)((0, T.xH)((0, T.VO)(t.modes)), ti)) {
                                var n = (0, T.xH)((0, T.VO)(t.modes)),
                                    r = (0, T.jj)(n);
                                this.tokensMap = (0, T.u4)(
                                    r,
                                    function (t, e) {
                                        return (t[e.name] = e), t;
                                    },
                                    {}
                                );
                            } else if ((0, T.Kn)(t)) this.tokensMap = (0, T.Cl)(t);
                            else throw Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");
                            this.tokensMap.EOF = tv;
                            var o = (0, T.yW)((0, T.VO)(t), function (t) {
                                return (0, T.xb)(t.categoryMatches);
                            });
                            (this.tokenMatcher = o ? Z : J), tn((0, T.VO)(this.tokensMap));
                        }),
                        (t.prototype.defineRule = function (t, e, n) {
                            if (this.selfAnalysisDone)
                                throw Error(
                                    "Grammar rule <" + t + "> may not be defined after the 'performSelfAnalysis' method has been called'\nMake sure that all grammar rule definitions are done before 'performSelfAnalysis' is called."
                                );
                            var r,
                                o = (0, T.e$)(n, "resyncEnabled") ? n.resyncEnabled : nt.resyncEnabled,
                                i = (0, T.e$)(n, "recoveryValueFunc") ? n.recoveryValueFunc : nt.recoveryValueFunc,
                                u = this.ruleShortNameIdx << 12;
                            function a(t) {
                                try {
                                    if (!0 !== this.outputCst) return e.apply(this, t);
                                    e.apply(this, t);
                                    var n = this.CST_STACK[this.CST_STACK.length - 1];
                                    return this.cstPostRule(n), n;
                                } catch (t) {
                                    return this.invokeRuleCatch(t, o, i);
                                } finally {
                                    this.ruleFinallyStateUpdate();
                                }
                            }
                            return (
                                this.ruleShortNameIdx++,
                                (this.shortRuleNameToFull[u] = t),
                                (this.fullRuleNameToShort[t] = u),
                                ((r = function (e, n) {
                                    return void 0 === e && (e = 0), this.ruleInvocationStateUpdate(u, t, e), a.call(this, n);
                                }).ruleName = t),
                                (r.originalGrammarAction = e),
                                r
                            );
                        }),
                        (t.prototype.invokeRuleCatch = function (t, e, n) {
                            var r = 1 === this.RULE_STACK.length,
                                o = e && !this.isBackTracking() && this.recoveryEnabled;
                            if (eS(t)) {
                                if (o) {
                                    var i = this.findReSyncTokenType();
                                    if (this.isInCurrentRuleReSyncSet(i)) {
                                        if (((t.resyncedTokens = this.reSyncTo(i)), !this.outputCst)) return n();
                                        var u = this.CST_STACK[this.CST_STACK.length - 1];
                                        return (u.recoveredNode = !0), u;
                                    }
                                    if (this.outputCst) {
                                        var u = this.CST_STACK[this.CST_STACK.length - 1];
                                        (u.recoveredNode = !0), (t.partialCstResult = u);
                                    }
                                    throw t;
                                }
                                if (r) return this.moveToTerminatedState(), n();
                            }
                            throw t;
                        }),
                        (t.prototype.optionInternal = function (t, e) {
                            var n = this.getKeyForAutomaticLookahead(512, e);
                            return this.optionInternalLogic(t, e, n);
                        }),
                        (t.prototype.optionInternalLogic = function (t, e, n) {
                            var r,
                                o,
                                i = this,
                                u = this.getLaFuncFromCache(n);
                            if (void 0 !== t.DEF) {
                                if (((r = t.DEF), void 0 !== (o = t.GATE))) {
                                    var a = u;
                                    u = function () {
                                        return o.call(i) && a.call(i);
                                    };
                                }
                            } else r = t;
                            if (!0 === u.call(this)) return r.call(this);
                        }),
                        (t.prototype.atLeastOneInternal = function (t, e) {
                            var n = this.getKeyForAutomaticLookahead(1024, t);
                            return this.atLeastOneInternalLogic(t, e, n);
                        }),
                        (t.prototype.atLeastOneInternalLogic = function (t, e, n) {
                            var r,
                                o,
                                i = this,
                                u = this.getLaFuncFromCache(n);
                            if (void 0 !== e.DEF) {
                                if (((r = e.DEF), void 0 !== (o = e.GATE))) {
                                    var a = u;
                                    u = function () {
                                        return o.call(i) && a.call(i);
                                    };
                                }
                            } else r = e;
                            if (!0 === u.call(this)) for (var s = this.doSingleRepetition(r); !0 === u.call(this) && !0 === s;) s = this.doSingleRepetition(r);
                            else throw this.raiseEarlyExitException(t, F.REPETITION_MANDATORY, e.ERR_MSG);
                            this.attemptInRepetitionRecovery(this.atLeastOneInternal, [t, e], u, 1024, t, t9);
                        }),
                        (t.prototype.atLeastOneSepFirstInternal = function (t, e) {
                            var n = this.getKeyForAutomaticLookahead(1536, t);
                            this.atLeastOneSepFirstInternalLogic(t, e, n);
                        }),
                        (t.prototype.atLeastOneSepFirstInternalLogic = function (t, e, n) {
                            var r = this,
                                o = e.DEF,
                                i = e.SEP;
                            if (!0 === this.getLaFuncFromCache(n).call(this)) {
                                o.call(this);
                                for (
                                    var u = function () {
                                        return r.tokenMatcher(r.LA(1), i);
                                    };
                                    !0 === this.tokenMatcher(this.LA(1), i);

                                )
                                    this.CONSUME(i), o.call(this);
                                this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [t, i, u, o, t4], u, 1536, t, t4);
                            } else throw this.raiseEarlyExitException(t, F.REPETITION_MANDATORY_WITH_SEPARATOR, e.ERR_MSG);
                        }),
                        (t.prototype.manyInternal = function (t, e) {
                            var n = this.getKeyForAutomaticLookahead(768, t);
                            return this.manyInternalLogic(t, e, n);
                        }),
                        (t.prototype.manyInternalLogic = function (t, e, n) {
                            var r,
                                o,
                                i = this,
                                u = this.getLaFuncFromCache(n);
                            if (void 0 !== e.DEF) {
                                if (((r = e.DEF), void 0 !== (o = e.GATE))) {
                                    var a = u;
                                    u = function () {
                                        return o.call(i) && a.call(i);
                                    };
                                }
                            } else r = e;
                            for (var s = !0; !0 === u.call(this) && !0 === s;) s = this.doSingleRepetition(r);
                            this.attemptInRepetitionRecovery(this.manyInternal, [t, e], u, 768, t, t6, s);
                        }),
                        (t.prototype.manySepFirstInternal = function (t, e) {
                            var n = this.getKeyForAutomaticLookahead(1280, t);
                            this.manySepFirstInternalLogic(t, e, n);
                        }),
                        (t.prototype.manySepFirstInternalLogic = function (t, e, n) {
                            var r = this,
                                o = e.DEF,
                                i = e.SEP;
                            if (!0 === this.getLaFuncFromCache(n).call(this)) {
                                o.call(this);
                                for (
                                    var u = function () {
                                        return r.tokenMatcher(r.LA(1), i);
                                    };
                                    !0 === this.tokenMatcher(this.LA(1), i);

                                )
                                    this.CONSUME(i), o.call(this);
                                this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [t, i, u, o, t7], u, 1280, t, t7);
                            }
                        }),
                        (t.prototype.repetitionSepSecondInternal = function (t, e, n, r, o) {
                            for (; n();) this.CONSUME(e), r.call(this);
                            this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [t, e, n, r, o], n, 1536, t, o);
                        }),
                        (t.prototype.doSingleRepetition = function (t) {
                            var e = this.getLexerPosition();
                            return t.call(this), this.getLexerPosition() > e;
                        }),
                        (t.prototype.orInternal = function (t, e) {
                            var n = this.getKeyForAutomaticLookahead(256, e),
                                r = (0, T.kJ)(t) ? t : t.DEF,
                                o = this.getLaFuncFromCache(n).call(this, r);
                            if (void 0 !== o) return r[o].ALT.call(this);
                            this.raiseNoAltException(e, t.ERR_MSG);
                        }),
                        (t.prototype.ruleFinallyStateUpdate = function () {
                            if ((this.RULE_STACK.pop(), this.RULE_OCCURRENCE_STACK.pop(), this.cstFinallyStateUpdate(), 0 === this.RULE_STACK.length && !1 === this.isAtEndOfInput())) {
                                var t = this.LA(1),
                                    e = this.errorMessageProvider.buildNotAllInputParsedMessage({ firstRedundant: t, ruleName: this.getCurrRuleFullName() });
                                this.SAVE_ERROR(new ex(e, t));
                            }
                        }),
                        (t.prototype.subruleInternal = function (t, e, n) {
                            var r;
                            try {
                                var o = void 0 !== n ? n.ARGS : void 0;
                                return (r = t.call(this, e, o)), this.cstPostNonTerminal(r, void 0 !== n && void 0 !== n.LABEL ? n.LABEL : t.ruleName), r;
                            } catch (e) {
                                this.subruleInternalError(e, n, t.ruleName);
                            }
                        }),
                        (t.prototype.subruleInternalError = function (t, e, n) {
                            throw (eS(t) && void 0 !== t.partialCstResult && (this.cstPostNonTerminal(t.partialCstResult, void 0 !== e && void 0 !== e.LABEL ? e.LABEL : n), delete t.partialCstResult), t);
                        }),
                        (t.prototype.consumeInternal = function (t, e, n) {
                            var r;
                            try {
                                var o = this.LA(1);
                                !0 === this.tokenMatcher(o, t) ? (this.consumeToken(), (r = o)) : this.consumeInternalError(t, o, n);
                            } catch (n) {
                                r = this.consumeInternalRecovery(t, e, n);
                            }
                            return this.cstPostTerminal(void 0 !== n && void 0 !== n.LABEL ? n.LABEL : t.name, r), r;
                        }),
                        (t.prototype.consumeInternalError = function (t, e, n) {
                            var r,
                                o = this.LA(0);
                            throw (
                                ((r = void 0 !== n && n.ERR_MSG ? n.ERR_MSG : this.errorMessageProvider.buildMismatchTokenMessage({ expected: t, actual: e, previous: o, ruleName: this.getCurrRuleFullName() })),
                                    this.SAVE_ERROR(new eN(r, e, o)))
                            );
                        }),
                        (t.prototype.consumeInternalRecovery = function (t, e, n) {
                            if (this.recoveryEnabled && "MismatchedTokenException" === n.name && !this.isBackTracking()) {
                                var r = this.getFollowsForInRuleRecovery(t, e);
                                try {
                                    return this.tryInRuleRecovery(t, r);
                                } catch (t) {
                                    if (t.name === e_) throw n;
                                    throw t;
                                }
                            } else throw n;
                        }),
                        (t.prototype.saveRecogState = function () {
                            var t = this.errors,
                                e = (0, T.Qw)(this.RULE_STACK);
                            return { errors: t, lexerState: this.exportLexerState(), RULE_STACK: e, CST_STACK: this.CST_STACK };
                        }),
                        (t.prototype.reloadRecogState = function (t) {
                            (this.errors = t.errors), this.importLexerState(t.lexerState), (this.RULE_STACK = t.RULE_STACK);
                        }),
                        (t.prototype.ruleInvocationStateUpdate = function (t, e, n) {
                            this.RULE_OCCURRENCE_STACK.push(n), this.RULE_STACK.push(t), this.cstInvocationStateUpdate(e, t);
                        }),
                        (t.prototype.isBackTracking = function () {
                            return 0 !== this.isBackTrackingStack.length;
                        }),
                        (t.prototype.getCurrRuleFullName = function () {
                            var t = this.getLastExplicitRuleShortName();
                            return this.shortRuleNameToFull[t];
                        }),
                        (t.prototype.shortRuleNameToFullName = function (t) {
                            return this.shortRuleNameToFull[t];
                        }),
                        (t.prototype.isAtEndOfInput = function () {
                            return this.tokenMatcher(this.LA(1), tv);
                        }),
                        (t.prototype.reset = function () {
                            this.resetLexerState(), (this.isBackTrackingStack = []), (this.errors = []), (this.RULE_STACK = []), (this.CST_STACK = []), (this.RULE_OCCURRENCE_STACK = []);
                        }),
                        t
                    );
                })(),
                ez = (function () {
                    function t() { }
                    return (
                        (t.prototype.initErrorHandler = function (t) {
                            (this._errors = []), (this.errorMessageProvider = (0, T.e$)(t, "errorMessageProvider") ? t.errorMessageProvider : e5.errorMessageProvider);
                        }),
                        (t.prototype.SAVE_ERROR = function (t) {
                            if (eS(t)) return (t.context = { ruleStack: this.getHumanReadableRuleStack(), ruleOccurrenceStack: (0, T.Qw)(this.RULE_OCCURRENCE_STACK) }), this._errors.push(t), t;
                            throw Error("Trying to save an Error which is not a RecognitionException");
                        }),
                        Object.defineProperty(t.prototype, "errors", {
                            get: function () {
                                return (0, T.Qw)(this._errors);
                            },
                            set: function (t) {
                                this._errors = t;
                            },
                            enumerable: !1,
                            configurable: !0,
                        }),
                        (t.prototype.raiseEarlyExitException = function (t, e, n) {
                            for (var r = this.getCurrRuleFullName(), o = es(t, this.getGAstProductions()[r], e, this.maxLookahead)[0], i = [], u = 1; u <= this.maxLookahead; u++) i.push(this.LA(u));
                            var a = this.errorMessageProvider.buildEarlyExitMessage({ expectedIterationPaths: o, actual: i, previous: this.LA(0), customUserDescription: n, ruleName: r });
                            throw this.SAVE_ERROR(new eL(a, this.LA(1), this.LA(0)));
                        }),
                        (t.prototype.raiseNoAltException = function (t, e) {
                            for (var n = this.getCurrRuleFullName(), r = ea(t, this.getGAstProductions()[n], this.maxLookahead), o = [], i = 1; i <= this.maxLookahead; i++) o.push(this.LA(i));
                            var u = this.LA(0),
                                a = this.errorMessageProvider.buildNoViableAltMessage({ expectedPathsPerAlt: r, actual: o, previous: u, customUserDescription: e, ruleName: this.getCurrRuleFullName() });
                            throw this.SAVE_ERROR(new eO(a, this.LA(1), u));
                        }),
                        t
                    );
                })(),
                eQ = (function () {
                    function t() { }
                    return (
                        (t.prototype.initContentAssist = function () { }),
                        (t.prototype.computeContentAssist = function (t, e) {
                            var n = this.gastProductionsCache[t];
                            if ((0, T.o8)(n)) throw Error("Rule ->" + t + "<- does not exist in this grammar.");
                            return et([n], e, this.tokenMatcher, this.maxLookahead);
                        }),
                        (t.prototype.getNextPossibleTokenTypes = function (t) {
                            var e = (0, T.Ps)(t.ruleStack);
                            return new t8(this.getGAstProductions()[e], t).startWalking();
                        }),
                        t
                    );
                })(),
                eq = { description: "This Object indicates the Parser is during Recording Phase" };
            Object.freeze(eq);
            var eJ = tg({ name: "RECORDING_PHASE_TOKEN", pattern: ts.NA });
            tn([eJ]);
            var eZ = tT(eJ, "This IToken indicates the Parser is in Recording Phase\n	See: https://sap.github.io/chevrotain/docs/guide/internals.html#grammar-recording for details", -1, -1, -1, -1, -1, -1);
            Object.freeze(eZ);
            var e0 = { name: "This CSTNode indicates the Parser is in Recording Phase\n	See: https://sap.github.io/chevrotain/docs/guide/internals.html#grammar-recording for details", children: {} },
                e2 = (function () {
                    function t() { }
                    return (
                        (t.prototype.initGastRecorder = function (t) {
                            (this.recordingProdStack = []), (this.RECORDING_PHASE = !1);
                        }),
                        (t.prototype.enableRecording = function () {
                            var t = this;
                            (this.RECORDING_PHASE = !0),
                                this.TRACE_INIT("Enable Recording", function () {
                                    for (
                                        var e = function (e) {
                                            var n = e > 0 ? e : "";
                                            (t["CONSUME" + n] = function (t, n) {
                                                return this.consumeInternalRecord(t, e, n);
                                            }),
                                                (t["SUBRULE" + n] = function (t, n) {
                                                    return this.subruleInternalRecord(t, e, n);
                                                }),
                                                (t["OPTION" + n] = function (t) {
                                                    return this.optionInternalRecord(t, e);
                                                }),
                                                (t["OR" + n] = function (t) {
                                                    return this.orInternalRecord(t, e);
                                                }),
                                                (t["MANY" + n] = function (t) {
                                                    this.manyInternalRecord(e, t);
                                                }),
                                                (t["MANY_SEP" + n] = function (t) {
                                                    this.manySepFirstInternalRecord(e, t);
                                                }),
                                                (t["AT_LEAST_ONE" + n] = function (t) {
                                                    this.atLeastOneInternalRecord(e, t);
                                                }),
                                                (t["AT_LEAST_ONE_SEP" + n] = function (t) {
                                                    this.atLeastOneSepFirstInternalRecord(e, t);
                                                });
                                        },
                                        n = 0;
                                        n < 10;
                                        n++
                                    )
                                        e(n);
                                    (t.consume = function (t, e, n) {
                                        return this.consumeInternalRecord(e, t, n);
                                    }),
                                        (t.subrule = function (t, e, n) {
                                            return this.subruleInternalRecord(e, t, n);
                                        }),
                                        (t.option = function (t, e) {
                                            return this.optionInternalRecord(e, t);
                                        }),
                                        (t.or = function (t, e) {
                                            return this.orInternalRecord(e, t);
                                        }),
                                        (t.many = function (t, e) {
                                            this.manyInternalRecord(t, e);
                                        }),
                                        (t.atLeastOne = function (t, e) {
                                            this.atLeastOneInternalRecord(t, e);
                                        }),
                                        (t.ACTION = t.ACTION_RECORD),
                                        (t.BACKTRACK = t.BACKTRACK_RECORD),
                                        (t.LA = t.LA_RECORD);
                                });
                        }),
                        (t.prototype.disableRecording = function () {
                            var t = this;
                            (this.RECORDING_PHASE = !1),
                                this.TRACE_INIT("Deleting Recording methods", function () {
                                    for (var e = 0; e < 10; e++) {
                                        var n = e > 0 ? e : "";
                                        delete t["CONSUME" + n],
                                            delete t["SUBRULE" + n],
                                            delete t["OPTION" + n],
                                            delete t["OR" + n],
                                            delete t["MANY" + n],
                                            delete t["MANY_SEP" + n],
                                            delete t["AT_LEAST_ONE" + n],
                                            delete t["AT_LEAST_ONE_SEP" + n];
                                    }
                                    delete t.consume, delete t.subrule, delete t.option, delete t.or, delete t.many, delete t.atLeastOne, delete t.ACTION, delete t.BACKTRACK, delete t.LA;
                                });
                        }),
                        (t.prototype.ACTION_RECORD = function (t) { }),
                        (t.prototype.BACKTRACK_RECORD = function (t, e) {
                            return function () {
                                return !0;
                            };
                        }),
                        (t.prototype.LA_RECORD = function (t) {
                            return e4;
                        }),
                        (t.prototype.topLevelRuleRecord = function (t, e) {
                            try {
                                var n = new tN({ definition: [], name: t });
                                return (n.name = t), this.recordingProdStack.push(n), e.call(this), this.recordingProdStack.pop(), n;
                            } catch (t) {
                                if (!0 !== t.KNOWN_RECORDER_ERROR)
                                    try {
                                        t.message = t.message + '\n	 This error was thrown during the "grammar recording phase" For more info see:\n	https://sap.github.io/chevrotain/docs/guide/internals.html#grammar-recording';
                                    } catch (t) { }
                                throw t;
                            }
                        }),
                        (t.prototype.optionInternalRecord = function (t, e) {
                            return e1.call(this, tx, t, e);
                        }),
                        (t.prototype.atLeastOneInternalRecord = function (t, e) {
                            e1.call(this, tL, e, t);
                        }),
                        (t.prototype.atLeastOneSepFirstInternalRecord = function (t, e) {
                            e1.call(this, tk, e, t, !0);
                        }),
                        (t.prototype.manyInternalRecord = function (t, e) {
                            e1.call(this, t_, e, t);
                        }),
                        (t.prototype.manySepFirstInternalRecord = function (t, e) {
                            e1.call(this, tb, e, t, !0);
                        }),
                        (t.prototype.orInternalRecord = function (t, e) {
                            return e8.call(this, t, e);
                        }),
                        (t.prototype.subruleInternalRecord = function (t, e, n) {
                            if ((e6(e), !t || !1 === (0, T.e$)(t, "ruleName"))) {
                                var r = Error("<SUBRULE" + e3(e) + "> argument is invalid expecting a Parser method reference but got: <" + JSON.stringify(t) + ">\n inside top level rule: <" + this.recordingProdStack[0].name + ">");
                                throw ((r.KNOWN_RECORDER_ERROR = !0), r);
                            }
                            var o = (0, T.fj)(this.recordingProdStack),
                                i = new tR({ idx: e, nonTerminalName: t.ruleName, referencedRule: void 0 });
                            return o.definition.push(i), this.outputCst ? e0 : eq;
                        }),
                        (t.prototype.consumeInternalRecord = function (t, e, n) {
                            if ((e6(e), !tr(t))) {
                                var r = Error("<CONSUME" + e3(e) + "> argument is invalid expecting a TokenType reference but got: <" + JSON.stringify(t) + ">\n inside top level rule: <" + this.recordingProdStack[0].name + ">");
                                throw ((r.KNOWN_RECORDER_ERROR = !0), r);
                            }
                            var o = (0, T.fj)(this.recordingProdStack),
                                i = new tM({ idx: e, terminalType: t });
                            return o.definition.push(i), eZ;
                        }),
                        t
                    );
                })();
            function e1(t, e, n, r) {
                void 0 === r && (r = !1), e6(n);
                var o = (0, T.fj)(this.recordingProdStack),
                    i = (0, T.mf)(e) ? e : e.DEF,
                    u = new t({ definition: [], idx: n });
                return r && (u.separator = e.SEP), (0, T.e$)(e, "MAX_LOOKAHEAD") && (u.maxLookahead = e.MAX_LOOKAHEAD), this.recordingProdStack.push(u), i.call(this), o.definition.push(u), this.recordingProdStack.pop(), eq;
            }
            function e8(t, e) {
                var n = this;
                e6(e);
                var r = (0, T.fj)(this.recordingProdStack),
                    o = !1 === (0, T.kJ)(t),
                    i = !1 === o ? t : t.DEF,
                    u = new tP({ definition: [], idx: e, ignoreAmbiguities: o && !0 === t.IGNORE_AMBIGUITIES });
                (0, T.e$)(t, "MAX_LOOKAHEAD") && (u.maxLookahead = t.MAX_LOOKAHEAD);
                var a = (0, T.G)(i, function (t) {
                    return (0, T.mf)(t.GATE);
                });
                return (
                    (u.hasPredicates = a),
                    r.definition.push(u),
                    (0, T.Ed)(i, function (t) {
                        var e = new tO({ definition: [] });
                        u.definition.push(e),
                            (0, T.e$)(t, "IGNORE_AMBIGUITIES") ? (e.ignoreAmbiguities = t.IGNORE_AMBIGUITIES) : (0, T.e$)(t, "GATE") && (e.ignoreAmbiguities = !0),
                            n.recordingProdStack.push(e),
                            t.ALT.call(n),
                            n.recordingProdStack.pop();
                    }),
                    eq
                );
            }
            function e3(t) {
                return 0 === t ? "" : "" + t;
            }
            function e6(t) {
                if (t < 0 || t > 255) {
                    var e = Error("Invalid DSL Method idx value: <" + t + ">\n	Idx value must be a none negative value smaller than 256");
                    throw ((e.KNOWN_RECORDER_ERROR = !0), e);
                }
            }
            var e7 = (function () {
                function t() { }
                return (
                    (t.prototype.initPerformanceTracer = function (t) {
                        if ((0, T.e$)(t, "traceInitPerf")) {
                            var e = t.traceInitPerf,
                                n = "number" == typeof e;
                            (this.traceInitMaxIdent = n ? e : 1 / 0), (this.traceInitPerf = n ? e > 0 : e);
                        } else (this.traceInitMaxIdent = 0), (this.traceInitPerf = e5.traceInitPerf);
                        this.traceInitIndent = -1;
                    }),
                    (t.prototype.TRACE_INIT = function (t, e) {
                        if (!0 !== this.traceInitPerf) return e();
                        this.traceInitIndent++;
                        var n = Array(this.traceInitIndent + 1).join("	");
                        this.traceInitIndent < this.traceInitMaxIdent && console.log(n + "--> <" + t + ">");
                        var r = (0, T.HT)(e),
                            o = r.time,
                            i = r.value,
                            u = o > 10 ? console.warn : console.log;
                        return this.traceInitIndent < this.traceInitMaxIdent && u(n + "<-- <" + t + "> time: " + o + "ms"), this.traceInitIndent--, i;
                    }),
                    t
                );
            })(),
                e9 =
                    ((E = function (t, e) {
                        return (E =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (t, e) {
                                    t.__proto__ = e;
                                }) ||
                            function (t, e) {
                                for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                            })(t, e);
                    }),
                        function (t, e) {
                            function n() {
                                this.constructor = t;
                            }
                            E(t, e), (t.prototype = null === e ? Object.create(e) : ((n.prototype = e.prototype), new n()));
                        }),
                e4 = tT(tv, "", NaN, NaN, NaN, NaN, NaN, NaN);
            Object.freeze(e4);
            var e5 = Object.freeze({ recoveryEnabled: !1, maxLookahead: 3, dynamicTokensEnabled: !1, outputCst: !0, errorMessageProvider: tq, nodeLocationTracking: "none", traceInitPerf: !1, skipValidations: !1 }),
                nt = Object.freeze({ recoveryValueFunc: function () { }, resyncEnabled: !0 });
            function ne(t) {
                return (
                    void 0 === t && (t = void 0),
                    function () {
                        return t;
                    }
                );
            }
            ((m = g || (g = {}))[(m.INVALID_RULE_NAME = 0)] = "INVALID_RULE_NAME"),
                (m[(m.DUPLICATE_RULE_NAME = 1)] = "DUPLICATE_RULE_NAME"),
                (m[(m.INVALID_RULE_OVERRIDE = 2)] = "INVALID_RULE_OVERRIDE"),
                (m[(m.DUPLICATE_PRODUCTIONS = 3)] = "DUPLICATE_PRODUCTIONS"),
                (m[(m.UNRESOLVED_SUBRULE_REF = 4)] = "UNRESOLVED_SUBRULE_REF"),
                (m[(m.LEFT_RECURSION = 5)] = "LEFT_RECURSION"),
                (m[(m.NONE_LAST_EMPTY_ALT = 6)] = "NONE_LAST_EMPTY_ALT"),
                (m[(m.AMBIGUOUS_ALTS = 7)] = "AMBIGUOUS_ALTS"),
                (m[(m.CONFLICT_TOKENS_RULES_NAMESPACE = 8)] = "CONFLICT_TOKENS_RULES_NAMESPACE"),
                (m[(m.INVALID_TOKEN_NAME = 9)] = "INVALID_TOKEN_NAME"),
                (m[(m.NO_NON_EMPTY_LOOKAHEAD = 10)] = "NO_NON_EMPTY_LOOKAHEAD"),
                (m[(m.AMBIGUOUS_PREFIX_ALTS = 11)] = "AMBIGUOUS_PREFIX_ALTS"),
                (m[(m.TOO_MANY_ALTS = 12)] = "TOO_MANY_ALTS");
            var nn = (function () {
                function t(t, e) {
                    if (
                        ((this.definitionErrors = []),
                            (this.selfAnalysisDone = !1),
                            this.initErrorHandler(e),
                            this.initLexerAdapter(),
                            this.initLooksAhead(e),
                            this.initRecognizerEngine(t, e),
                            this.initRecoverable(e),
                            this.initTreeBuilder(e),
                            this.initContentAssist(),
                            this.initGastRecorder(e),
                            this.initPerformanceTracer(e),
                            (0, T.e$)(e, "ignoredIssues"))
                    )
                        throw Error(
                            "The <ignoredIssues> IParserConfig property has been deprecated.\n	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.\n	See: https://sap.github.io/chevrotain/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES\n	For further details."
                        );
                    this.skipValidations = (0, T.e$)(e, "skipValidations") ? e.skipValidations : e5.skipValidations;
                }
                return (
                    (t.performSelfAnalysis = function (t) {
                        throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.");
                    }),
                    (t.prototype.performSelfAnalysis = function () {
                        var e = this;
                        this.TRACE_INIT("performSelfAnalysis", function () {
                            e.selfAnalysisDone = !0;
                            var n = e.className;
                            e.TRACE_INIT("toFastProps", function () {
                                (0, T.SV)(e);
                            }),
                                e.TRACE_INIT("Grammar Recording", function () {
                                    try {
                                        e.enableRecording(),
                                            (0, T.Ed)(e.definedRulesNames, function (t) {
                                                var n = e[t].originalGrammarAction,
                                                    r = void 0;
                                                e.TRACE_INIT(t + " Rule", function () {
                                                    r = e.topLevelRuleRecord(t, n);
                                                }),
                                                    (e.gastProductionsCache[t] = r);
                                            });
                                    } finally {
                                        e.disableRecording();
                                    }
                                });
                            var r = [];
                            if (
                                (e.TRACE_INIT("Grammar Resolving", function () {
                                    (r = em({ rules: (0, T.VO)(e.gastProductionsCache) })), e.definitionErrors.push.apply(e.definitionErrors, r);
                                }),
                                    e.TRACE_INIT("Grammar Validations", function () {
                                        if ((0, T.xb)(r) && !1 === e.skipValidations) {
                                            var t = ey({ rules: (0, T.VO)(e.gastProductionsCache), maxLookahead: e.maxLookahead, tokenTypes: (0, T.VO)(e.tokensMap), errMsgProvider: tZ, grammarName: n });
                                            e.definitionErrors.push.apply(e.definitionErrors, t);
                                        }
                                    }),
                                    (0, T.xb)(e.definitionErrors) &&
                                    (e.recoveryEnabled &&
                                        e.TRACE_INIT("computeAllProdsFollows", function () {
                                            var t,
                                                n,
                                                r =
                                                    ((t = (0, T.VO)(e.gastProductionsCache)),
                                                        (n = {}),
                                                        (0, T.Ed)(t, function (t) {
                                                            var e = new tQ(t).startWalking();
                                                            (0, T.f0)(n, e);
                                                        }),
                                                        n);
                                            e.resyncFollows = r;
                                        }),
                                        e.TRACE_INIT("ComputeLookaheadFunctions", function () {
                                            e.preComputeLookaheadFunctions((0, T.VO)(e.gastProductionsCache));
                                        })),
                                    !t.DEFER_DEFINITION_ERRORS_HANDLING && !(0, T.xb)(e.definitionErrors))
                            )
                                throw Error(
                                    "Parser Definition Errors detected:\n " +
                                    (0, T.UI)(e.definitionErrors, function (t) {
                                        return t.message;
                                    }).join("\n-------------------------------\n")
                                );
                        });
                    }),
                    (t.DEFER_DEFINITION_ERRORS_HANDLING = !1),
                    t
                );
            })();
            (0, T.ef)(nn, [eP, eB, eH, e$, eX, eY, ez, eQ, e2, e7]);
            var nr = (function (t) {
                function e(e, n) {
                    void 0 === n && (n = e5);
                    var r = (0, T.Cl)(n);
                    return (r.outputCst = !0), t.call(this, e, r) || this;
                }
                return e9(e, t), e;
            })(nn),
                no = (function (t) {
                    function e(e, n) {
                        void 0 === n && (n = e5);
                        var r = (0, T.Cl)(n);
                        return (r.outputCst = !1), t.call(this, e, r) || this;
                    }
                    return e9(e, t), e;
                })(nn);
            function ni(t, e) {
                var n = void 0 === e ? {} : e,
                    r = n.resourceBase,
                    o = void 0 === r ? "https://unpkg.com/chevrotain@" + v + "/diagrams/" : r,
                    i = n.css;
                return (
                    "\n<!-- This is a generated file -->\n<!DOCTYPE html>\n<meta charset=\"utf-8\">\n<style>\n  body {\n    background-color: hsl(30, 20%, 95%)\n  }\n</style>\n\n\n<link rel='stylesheet' href='" +
                    (void 0 === i ? "https://unpkg.com/chevrotain@" + v + "/diagrams/diagrams.css" : i) +
                    "'>\n" +
                    ("\n<script src='" + o + "vendor/railroad-diagrams.js'></script>\n<script src='" + o + "src/diagrams_builder.js'></script>\n<script src='" + o) +
                    "src/diagrams_behavior.js'></script>\n<script src='" +
                    o +
                    'src/main.js\'></script>\n\n<div id="diagrams" align="center"></div>    \n' +
                    ("\n<script>\n    window.serializedGrammar = " + JSON.stringify(t, null, "  ")) +
                    ';\n</script>\n\n<script>\n    var diagramsDiv = document.getElementById("diagrams");\n    main.drawDiagramsFromSerializedGrammar(serializedGrammar, diagramsDiv);\n</script>\n'
                );
            }
            function nu(t) {
                var e;
                return (
                    "\nfunction " +
                    t.name +
                    "(tokenVocabulary, config) {\n    // invoke super constructor\n    // No support for embedded actions currently, so we can 'hardcode'\n    // The use of CstParser.\n    chevrotain.CstParser.call(this, tokenVocabulary, config)\n\n    const $ = this\n\n    " +
                    ((e = t.rules),
                        (0, T.UI)(e, function (t) {
                            var e;
                            return nl(1, '$.RULE("' + t.name + '", function() {') + "\n" + nc(t.definition, 2) + (nl(2, "})") + "\n");
                        }).join("\n")) +
                    "\n\n    // very important to call this after all the rules have been defined.\n    // otherwise the parser may not work correctly as it will lack information\n    // derived during the self analysis phase.\n    this.performSelfAnalysis(this)\n}\n\n// inheritance as implemented in javascript in the previous decade... :(\n" +
                    t.name +
                    ".prototype = Object.create(chevrotain.CstParser.prototype)\n" +
                    t.name +
                    ".prototype.constructor = " +
                    t.name +
                    "    \n    "
                );
            }
            function na(t, e, n) {
                var r = nl(n, "$." + (t + e.idx) + "(");
                return e.separator ? (r += "{\n" + nl(n + 1, "SEP: this.tokensMap." + e.separator.name) + ",\nDEF: " + ns(e.definition, n + 2) + "\n" + nl(n, "}") + "\n") : (r += ns(e.definition, n + 1)), (r += nl(n, ")") + "\n");
            }
            function ns(t, e) {
                return "function() {\n" + nc(t, e) + (nl(e, "}") + "\n");
            }
            function nc(t, e) {
                var n = "";
                return (
                    (0, T.Ed)(t, function (t) {
                        n += (function (t, e) {
                            var n;
                            if (t instanceof tR) return nl(e, "$.SUBRULE" + t.idx + "($." + t.nonTerminalName + ")\n");
                            if (t instanceof tx) return na("OPTION", t, e);
                            if (t instanceof tL) return na("AT_LEAST_ONE", t, e);
                            if (t instanceof tk) return na("AT_LEAST_ONE_SEP", t, e);
                            if (t instanceof tb) return na("MANY_SEP", t, e);
                            if (t instanceof t_) return na("MANY", t, e);
                            if (t instanceof tP)
                                return (
                                    nl(e, "$.OR" + t.idx + "([") +
                                    "\n" +
                                    (0, T.UI)(t.definition, function (t) {
                                        var n, r;
                                        return nl((n = e + 1), "{") + "\n" + (nl(n + 1, "ALT: function() {") + "\n" + nc(t.definition, n + 1) + nl(n + 1, "}") + "\n") + nl(n, "}");
                                    }).join(",\n") +
                                    "\n" +
                                    nl(e, "])\n")
                                );
                            else if (t instanceof tM) return (n = t.terminalType.name), nl(e, "$.CONSUME" + t.idx + "(this.tokensMap." + n + ")\n");
                            else if (t instanceof tO) return nc(t.definition, e);
                            else throw Error("non exhaustive match");
                        })(t, e + 1);
                    }),
                    n
                );
            }
            function nl(t, e) {
                return Array(4 * t + 1).join(" ") + e;
            }
            function np(t) {
                var e,
                    r = Function("tokenVocabulary", "config", "chevrotain", "    \n" + nu((e = { name: t.name, rules: t.rules })) + "\nreturn new " + e.name + "(tokenVocabulary, config)    \n");
                return function (e) {
                    return r(t.tokenVocabulary, e, n(12786));
                };
            }
            function nf(t) {
                var e;
                return (
                    "\n(function (root, factory) {\n    if (typeof define === 'function' && define.amd) {\n        // AMD. Register as an anonymous module.\n        define(['chevrotain'], factory);\n    } else if (typeof module === 'object' && module.exports) {\n        // Node. Does not work with strict CommonJS, but\n        // only CommonJS-like environments that support module.exports,\n        // like Node.\n        module.exports = factory(require('chevrotain'));\n    } else {\n        // Browser globals (root is window)\n        root.returnExports = factory(root.b);\n    }\n}(typeof self !== 'undefined' ? self : this, function (chevrotain) {\n\n" +
                    nu((e = { name: t.name, rules: t.rules })) +
                    "\n    \nreturn {\n    " +
                    e.name +
                    ": " +
                    e.name +
                    " \n}\n}));\n"
                );
            }
            function nh() {
                console.warn("The clearCache function was 'soft' removed from the Chevrotain API.\n	 It performs no action other than printing this message.\n	 Please avoid using it as it will be completely removed in the future");
            }
            var nD = function () {
                throw Error("The Parser class has been deprecated, use CstParser or EmbeddedActionsParser instead.	\nSee: https://sap.github.io/chevrotain/docs/changes/BREAKING_CHANGES.html#_7-0-0");
            };
        },
        75465: function (t, e, n) {
            "use strict";
            function r(t) {
                return t && 0 === t.length;
            }
            function o(t) {
                return null == t ? [] : Object.keys(t);
            }
            function i(t) {
                for (var e = [], n = Object.keys(t), r = 0; r < n.length; r++) e.push(t[n[r]]);
                return e;
            }
            function u(t, e) {
                for (var n = [], r = o(t), i = 0; i < r.length; i++) {
                    var u = r[i];
                    n.push(e.call(null, t[u], u));
                }
                return n;
            }
            function a(t, e) {
                for (var n = [], r = 0; r < t.length; r++) n.push(e.call(null, t[r], r));
                return n;
            }
            function s(t) {
                return r(t) ? void 0 : t[0];
            }
            function c(t) {
                var e = t && t.length;
                return e ? t[e - 1] : void 0;
            }
            function l(t, e) {
                if (Array.isArray(t)) for (var n = 0; n < t.length; n++) e.call(null, t[n], n);
                else if (x(t))
                    for (var r = o(t), n = 0; n < r.length; n++) {
                        var i = r[n],
                            u = t[i];
                        e.call(null, u, i);
                    }
                else throw Error("non exhaustive match");
            }
            function p(t) {
                return "string" == typeof t;
            }
            function f(t) {
                return void 0 === t;
            }
            function h(t) {
                return t instanceof Function;
            }
            function D(t, e) {
                return void 0 === e && (e = 1), t.slice(e, t.length);
            }
            function d(t, e) {
                return void 0 === e && (e = 1), t.slice(0, t.length - e);
            }
            function E(t, e) {
                var n = [];
                if (Array.isArray(t))
                    for (var r = 0; r < t.length; r++) {
                        var o = t[r];
                        e.call(null, o) && n.push(o);
                    }
                return n;
            }
            function m(t, e) {
                return E(t, function (t) {
                    return !e(t);
                });
            }
            function y(t, e) {
                for (var n = Object.keys(t), r = {}, o = 0; o < n.length; o++) {
                    var i = n[o],
                        u = t[i];
                    e(u) && (r[i] = u);
                }
                return r;
            }
            function F(t, e) {
                return !!x(t) && t.hasOwnProperty(e);
            }
            function C(t, e) {
                return (
                    void 0 !==
                    T(t, function (t) {
                        return t === e;
                    })
                );
            }
            function g(t) {
                for (var e = [], n = 0; n < t.length; n++) e.push(t[n]);
                return e;
            }
            function v(t) {
                var e = {};
                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                return e;
            }
            function T(t, e) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    if (e.call(null, r)) return r;
                }
            }
            function A(t, e) {
                for (var n = [], r = 0; r < t.length; r++) {
                    var o = t[r];
                    e.call(null, o) && n.push(o);
                }
                return n;
            }
            function I(t, e, n) {
                for (var r = Array.isArray(t), u = r ? t : i(t), a = r ? [] : o(t), s = n, c = 0; c < u.length; c++) s = e.call(null, s, u[c], r ? c : a[c]);
                return s;
            }
            function S(t) {
                return m(t, function (t) {
                    return null == t;
                });
            }
            function R(t, e) {
                void 0 === e &&
                    (e = function (t) {
                        return t;
                    });
                var n = [];
                return I(
                    t,
                    function (t, r) {
                        var o = e(r);
                        return C(n, o) ? t : (n.push(o), t.concat(r));
                    },
                    []
                );
            }
            function N(t) {
                return Array.isArray(t);
            }
            function O(t) {
                return t instanceof RegExp;
            }
            function x(t) {
                return t instanceof Object;
            }
            function L(t, e) {
                for (var n = 0; n < t.length; n++) if (!e(t[n], n)) return !1;
                return !0;
            }
            function k(t, e) {
                return m(t, function (t) {
                    return C(e, t);
                });
            }
            function _(t, e) {
                for (var n = 0; n < t.length; n++) if (e(t[n])) return !0;
                return !1;
            }
            function b(t, e) {
                for (var n = 0; n < t.length; n++) if (t[n] === e) return n;
                return -1;
            }
            function P(t) {
                for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
                for (var r = 0; r < e.length; r++)
                    for (var i = e[r], u = o(i), a = 0; a < u.length; a++) {
                        var s = u[a];
                        t[s] = i[s];
                    }
                return t;
            }
            function M(t) {
                for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
                for (var r = 0; r < e.length; r++)
                    for (var i = e[r], u = o(i), a = 0; a < u.length; a++) {
                        var s = u[a];
                        F(t, s) || (t[s] = i[s]);
                    }
                return t;
            }
            function B() {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                return M.apply(null, [{}].concat(t));
            }
            function w(t, e) {
                var n = {};
                return (
                    l(t, function (t) {
                        var r = e(t),
                            o = n[r];
                        o ? o.push(t) : (n[r] = [t]);
                    }),
                    n
                );
            }
            function U(t, e) {
                for (var n = v(t), r = o(e), i = 0; i < r.length; i++) {
                    var u = r[i],
                        a = e[u];
                    n[u] = a;
                }
                return n;
            }
            function j() { }
            function G(t) {
                return t;
            }
            function W(t) {
                for (var e = [], n = 0; n < t.length; n++) {
                    var r = t[n];
                    e.push(void 0 !== r ? r : void 0);
                }
                return e;
            }
            function V(t) {
                console && console.error && console.error("Error: " + t);
            }
            function K(t) {
                console && console.warn && console.warn("Warning: " + t);
            }
            function H() {
                return "function" == typeof Map;
            }
            function $(t, e) {
                e.forEach(function (e) {
                    var n = e.prototype;
                    Object.getOwnPropertyNames(n).forEach(function (r) {
                        if ("constructor" !== r) {
                            var o = Object.getOwnPropertyDescriptor(n, r);
                            o && (o.get || o.set) ? Object.defineProperty(t.prototype, r, o) : (t.prototype[r] = e.prototype[r]);
                        }
                    });
                });
            }
            function Y(t) {
                function e() { }
                e.prototype = t;
                var n = new e();
                function r() {
                    return typeof n.bar;
                }
                return r(), r(), t;
            }
            function X(t) {
                return t[t.length - 1];
            }
            function z(t) {
                var e = new Date().getTime(),
                    n = t();
                return { time: new Date().getTime() - e, value: n };
            }
            n.d(e, {
                Cl: function () {
                    return v;
                },
                Cw: function () {
                    return D;
                },
                Ed: function () {
                    return l;
                },
                G: function () {
                    return _;
                },
                HD: function () {
                    return p;
                },
                HT: function () {
                    return z;
                },
                Kj: function () {
                    return O;
                },
                Kn: function () {
                    return x;
                },
                Oq: function () {
                    return A;
                },
                Ps: function () {
                    return s;
                },
                Q8: function () {
                    return u;
                },
                Qw: function () {
                    return g;
                },
                SV: function () {
                    return Y;
                },
                TS: function () {
                    return U;
                },
                UI: function () {
                    return a;
                },
                VO: function () {
                    return i;
                },
                WB: function () {
                    return V;
                },
                Wd: function () {
                    return G;
                },
                X0: function () {
                    return W;
                },
                XP: function () {
                    return o;
                },
                Z$: function () {
                    return c;
                },
                ce: function () {
                    return B;
                },
                cq: function () {
                    return b;
                },
                d1: function () {
                    return m;
                },
                dG: function () {
                    return j;
                },
                dU: function () {
                    return H;
                },
                e$: function () {
                    return F;
                },
                e5: function () {
                    return k;
                },
                ef: function () {
                    return $;
                },
                ei: function () {
                    return y;
                },
                f0: function () {
                    return P;
                },
                fj: function () {
                    return X;
                },
                hX: function () {
                    return E;
                },
                j7: function () {
                    return d;
                },
                jj: function () {
                    return R;
                },
                kJ: function () {
                    return N;
                },
                mf: function () {
                    return h;
                },
                o8: function () {
                    return f;
                },
                oA: function () {
                    return S;
                },
                r3: function () {
                    return C;
                },
                rr: function () {
                    return K;
                },
                sE: function () {
                    return T;
                },
                u4: function () {
                    return I;
                },
                vM: function () {
                    return w;
                },
                xH: function () {
                    return function t(e) {
                        for (var n = [], r = 0; r < e.length; r++) {
                            var o = e[r];
                            Array.isArray(o) ? (n = n.concat(t(o))) : n.push(o);
                        }
                        return n;
                    };
                },
                xb: function () {
                    return r;
                },
                yW: function () {
                    return L;
                },
            });
        },
        94556: function (t, e) {
            var n, r, o;
            "undefined" != typeof self && self,
                (r = []),
                void 0 !==
                (o =
                    "function" ==
                        typeof (n = function () {
                            function t() { }
                            (t.prototype.saveState = function () {
                                return { idx: this.idx, input: this.input, groupIdx: this.groupIdx };
                            }),
                                (t.prototype.restoreState = function (t) {
                                    (this.idx = t.idx), (this.input = t.input), (this.groupIdx = t.groupIdx);
                                }),
                                (t.prototype.pattern = function (t) {
                                    (this.idx = 0), (this.input = t), (this.groupIdx = 0), this.consumeChar("/");
                                    var e = this.disjunction();
                                    this.consumeChar("/");
                                    for (var n = { type: "Flags", loc: { begin: this.idx, end: t.length }, global: !1, ignoreCase: !1, multiLine: !1, unicode: !1, sticky: !1 }; this.isRegExpFlag();)
                                        switch (this.popChar()) {
                                            case "g":
                                                a(n, "global");
                                                break;
                                            case "i":
                                                a(n, "ignoreCase");
                                                break;
                                            case "m":
                                                a(n, "multiLine");
                                                break;
                                            case "u":
                                                a(n, "unicode");
                                                break;
                                            case "y":
                                                a(n, "sticky");
                                        }
                                    if (this.idx !== this.input.length) throw Error("Redundant input: " + this.input.substring(this.idx));
                                    return { type: "Pattern", flags: n, value: e, loc: this.loc(0) };
                                }),
                                (t.prototype.disjunction = function () {
                                    var t = [],
                                        e = this.idx;
                                    for (t.push(this.alternative()); "|" === this.peekChar();) this.consumeChar("|"), t.push(this.alternative());
                                    return { type: "Disjunction", value: t, loc: this.loc(e) };
                                }),
                                (t.prototype.alternative = function () {
                                    for (var t = [], e = this.idx; this.isTerm();) t.push(this.term());
                                    return { type: "Alternative", value: t, loc: this.loc(e) };
                                }),
                                (t.prototype.term = function () {
                                    return this.isAssertion() ? this.assertion() : this.atom();
                                }),
                                (t.prototype.assertion = function () {
                                    var t = this.idx;
                                    switch (this.popChar()) {
                                        case "^":
                                            return { type: "StartAnchor", loc: this.loc(t) };
                                        case "$":
                                            return { type: "EndAnchor", loc: this.loc(t) };
                                        case "\\":
                                            switch (this.popChar()) {
                                                case "b":
                                                    return { type: "WordBoundary", loc: this.loc(t) };
                                                case "B":
                                                    return { type: "NonWordBoundary", loc: this.loc(t) };
                                            }
                                            throw Error("Invalid Assertion Escape");
                                        case "(":
                                            switch ((this.consumeChar("?"), this.popChar())) {
                                                case "=":
                                                    e = "Lookahead";
                                                    break;
                                                case "!":
                                                    e = "NegativeLookahead";
                                            }
                                            s(e);
                                            var e,
                                                n = this.disjunction();
                                            return this.consumeChar(")"), { type: e, value: n, loc: this.loc(t) };
                                    }
                                    (function () {
                                        throw Error("Internal Error - Should never get here!");
                                    })();
                                }),
                                (t.prototype.quantifier = function (t) {
                                    var e = this.idx;
                                    switch (this.popChar()) {
                                        case "*":
                                            n = { atLeast: 0, atMost: 1 / 0 };
                                            break;
                                        case "+":
                                            n = { atLeast: 1, atMost: 1 / 0 };
                                            break;
                                        case "?":
                                            n = { atLeast: 0, atMost: 1 };
                                            break;
                                        case "{":
                                            var n,
                                                r = this.integerIncludingZero();
                                            switch (this.popChar()) {
                                                case "}":
                                                    n = { atLeast: r, atMost: r };
                                                    break;
                                                case ",":
                                                    (n = this.isDigit() ? { atLeast: r, atMost: this.integerIncludingZero() } : { atLeast: r, atMost: 1 / 0 }), this.consumeChar("}");
                                            }
                                            if (!0 === t && void 0 === n) return;
                                            s(n);
                                    }
                                    if (!0 !== t || void 0 !== n) return s(n), "?" === this.peekChar(0) ? (this.consumeChar("?"), (n.greedy = !1)) : (n.greedy = !0), (n.type = "Quantifier"), (n.loc = this.loc(e)), n;
                                }),
                                (t.prototype.atom = function () {
                                    var t,
                                        e = this.idx;
                                    switch (this.peekChar()) {
                                        case ".":
                                            t = this.dotAll();
                                            break;
                                        case "\\":
                                            t = this.atomEscape();
                                            break;
                                        case "[":
                                            t = this.characterClass();
                                            break;
                                        case "(":
                                            t = this.group();
                                    }
                                    return void 0 === t && this.isPatternCharacter() && (t = this.patternCharacter()), s(t), (t.loc = this.loc(e)), this.isQuantifier() && (t.quantifier = this.quantifier()), t;
                                }),
                                (t.prototype.dotAll = function () {
                                    return this.consumeChar("."), { type: "Set", complement: !0, value: [i("\n"), i("\r"), i("\u2028"), i("\u2029")] };
                                }),
                                (t.prototype.atomEscape = function () {
                                    switch ((this.consumeChar("\\"), this.peekChar())) {
                                        case "1":
                                        case "2":
                                        case "3":
                                        case "4":
                                        case "5":
                                        case "6":
                                        case "7":
                                        case "8":
                                        case "9":
                                            return this.decimalEscapeAtom();
                                        case "d":
                                        case "D":
                                        case "s":
                                        case "S":
                                        case "w":
                                        case "W":
                                            return this.characterClassEscape();
                                        case "f":
                                        case "n":
                                        case "r":
                                        case "t":
                                        case "v":
                                            return this.controlEscapeAtom();
                                        case "c":
                                            return this.controlLetterEscapeAtom();
                                        case "0":
                                            return this.nulCharacterAtom();
                                        case "x":
                                            return this.hexEscapeSequenceAtom();
                                        case "u":
                                            return this.regExpUnicodeEscapeSequenceAtom();
                                        default:
                                            return this.identityEscapeAtom();
                                    }
                                }),
                                (t.prototype.decimalEscapeAtom = function () {
                                    return { type: "GroupBackReference", value: this.positiveInteger() };
                                }),
                                (t.prototype.characterClassEscape = function () {
                                    var t,
                                        e = !1;
                                    switch (this.popChar()) {
                                        case "d":
                                            t = c;
                                            break;
                                        case "D":
                                            (t = c), (e = !0);
                                            break;
                                        case "s":
                                            t = p;
                                            break;
                                        case "S":
                                            (t = p), (e = !0);
                                            break;
                                        case "w":
                                            t = l;
                                            break;
                                        case "W":
                                            (t = l), (e = !0);
                                    }
                                    return s(t), { type: "Set", value: t, complement: e };
                                }),
                                (t.prototype.controlEscapeAtom = function () {
                                    var t;
                                    switch (this.popChar()) {
                                        case "f":
                                            t = i("\f");
                                            break;
                                        case "n":
                                            t = i("\n");
                                            break;
                                        case "r":
                                            t = i("\r");
                                            break;
                                        case "t":
                                            t = i("	");
                                            break;
                                        case "v":
                                            t = i("\v");
                                    }
                                    return s(t), { type: "Character", value: t };
                                }),
                                (t.prototype.controlLetterEscapeAtom = function () {
                                    this.consumeChar("c");
                                    var t = this.popChar();
                                    if (!1 === /[a-zA-Z]/.test(t)) throw Error("Invalid ");
                                    return { type: "Character", value: t.toUpperCase().charCodeAt(0) - 64 };
                                }),
                                (t.prototype.nulCharacterAtom = function () {
                                    return this.consumeChar("0"), { type: "Character", value: i("\0") };
                                }),
                                (t.prototype.hexEscapeSequenceAtom = function () {
                                    return this.consumeChar("x"), this.parseHexDigits(2);
                                }),
                                (t.prototype.regExpUnicodeEscapeSequenceAtom = function () {
                                    return this.consumeChar("u"), this.parseHexDigits(4);
                                }),
                                (t.prototype.identityEscapeAtom = function () {
                                    return { type: "Character", value: i(this.popChar()) };
                                }),
                                (t.prototype.classPatternCharacterAtom = function () {
                                    switch (this.peekChar()) {
                                        case "\n":
                                        case "\r":
                                        case "\u2028":
                                        case "\u2029":
                                        case "\\":
                                        case "]":
                                            throw Error("TBD");
                                        default:
                                            return { type: "Character", value: i(this.popChar()) };
                                    }
                                }),
                                (t.prototype.characterClass = function () {
                                    var t = [],
                                        e = !1;
                                    for (this.consumeChar("["), "^" === this.peekChar(0) && (this.consumeChar("^"), (e = !0)); this.isClassAtom();) {
                                        var n = this.classAtom();
                                        if ("Character" === n.type && this.isRangeDash()) {
                                            this.consumeChar("-");
                                            var r = this.classAtom();
                                            if ("Character" === r.type) {
                                                if (r.value < n.value) throw Error("Range out of order in character class");
                                                t.push({ from: n.value, to: r.value });
                                            } else u(n.value, t), t.push(i("-")), u(r.value, t);
                                        } else u(n.value, t);
                                    }
                                    return this.consumeChar("]"), { type: "Set", complement: e, value: t };
                                }),
                                (t.prototype.classAtom = function () {
                                    switch (this.peekChar()) {
                                        case "]":
                                        case "\n":
                                        case "\r":
                                        case "\u2028":
                                        case "\u2029":
                                            throw Error("TBD");
                                        case "\\":
                                            return this.classEscape();
                                        default:
                                            return this.classPatternCharacterAtom();
                                    }
                                }),
                                (t.prototype.classEscape = function () {
                                    switch ((this.consumeChar("\\"), this.peekChar())) {
                                        case "b":
                                            return this.consumeChar("b"), { type: "Character", value: i("\b") };
                                        case "d":
                                        case "D":
                                        case "s":
                                        case "S":
                                        case "w":
                                        case "W":
                                            return this.characterClassEscape();
                                        case "f":
                                        case "n":
                                        case "r":
                                        case "t":
                                        case "v":
                                            return this.controlEscapeAtom();
                                        case "c":
                                            return this.controlLetterEscapeAtom();
                                        case "0":
                                            return this.nulCharacterAtom();
                                        case "x":
                                            return this.hexEscapeSequenceAtom();
                                        case "u":
                                            return this.regExpUnicodeEscapeSequenceAtom();
                                        default:
                                            return this.identityEscapeAtom();
                                    }
                                }),
                                (t.prototype.group = function () {
                                    var t = !0;
                                    (this.consumeChar("("), "?" === this.peekChar(0)) ? (this.consumeChar("?"), this.consumeChar(":"), (t = !1)) : this.groupIdx++;
                                    var e = this.disjunction();
                                    this.consumeChar(")");
                                    var n = { type: "Group", capturing: t, value: e };
                                    return t && (n.idx = this.groupIdx), n;
                                }),
                                (t.prototype.positiveInteger = function () {
                                    var t = this.popChar();
                                    if (!1 === o.test(t)) throw Error("Expecting a positive integer");
                                    for (; r.test(this.peekChar(0));) t += this.popChar();
                                    return parseInt(t, 10);
                                }),
                                (t.prototype.integerIncludingZero = function () {
                                    var t = this.popChar();
                                    if (!1 === r.test(t)) throw Error("Expecting an integer");
                                    for (; r.test(this.peekChar(0));) t += this.popChar();
                                    return parseInt(t, 10);
                                }),
                                (t.prototype.patternCharacter = function () {
                                    var t = this.popChar();
                                    switch (t) {
                                        case "\n":
                                        case "\r":
                                        case "\u2028":
                                        case "\u2029":
                                        case "^":
                                        case "$":
                                        case "\\":
                                        case ".":
                                        case "*":
                                        case "+":
                                        case "?":
                                        case "(":
                                        case ")":
                                        case "[":
                                        case "|":
                                            throw Error("TBD");
                                        default:
                                            return { type: "Character", value: i(t) };
                                    }
                                }),
                                (t.prototype.isRegExpFlag = function () {
                                    switch (this.peekChar(0)) {
                                        case "g":
                                        case "i":
                                        case "m":
                                        case "u":
                                        case "y":
                                            return !0;
                                        default:
                                            return !1;
                                    }
                                }),
                                (t.prototype.isRangeDash = function () {
                                    return "-" === this.peekChar() && this.isClassAtom(1);
                                }),
                                (t.prototype.isDigit = function () {
                                    return r.test(this.peekChar(0));
                                }),
                                (t.prototype.isClassAtom = function (t) {
                                    switch ((void 0 === t && (t = 0), this.peekChar(t))) {
                                        case "]":
                                        case "\n":
                                        case "\r":
                                        case "\u2028":
                                        case "\u2029":
                                            return !1;
                                        default:
                                            return !0;
                                    }
                                }),
                                (t.prototype.isTerm = function () {
                                    return this.isAtom() || this.isAssertion();
                                }),
                                (t.prototype.isAtom = function () {
                                    if (this.isPatternCharacter()) return !0;
                                    switch (this.peekChar(0)) {
                                        case ".":
                                        case "\\":
                                        case "[":
                                        case "(":
                                            return !0;
                                        default:
                                            return !1;
                                    }
                                }),
                                (t.prototype.isAssertion = function () {
                                    switch (this.peekChar(0)) {
                                        case "^":
                                        case "$":
                                            return !0;
                                        case "\\":
                                            switch (this.peekChar(1)) {
                                                case "b":
                                                case "B":
                                                    return !0;
                                                default:
                                                    return !1;
                                            }
                                        case "(":
                                            return "?" === this.peekChar(1) && ("=" === this.peekChar(2) || "!" === this.peekChar(2));
                                        default:
                                            return !1;
                                    }
                                }),
                                (t.prototype.isQuantifier = function () {
                                    var t = this.saveState();
                                    try {
                                        return void 0 !== this.quantifier(!0);
                                    } catch (t) {
                                        return !1;
                                    } finally {
                                        this.restoreState(t);
                                    }
                                }),
                                (t.prototype.isPatternCharacter = function () {
                                    switch (this.peekChar()) {
                                        case "^":
                                        case "$":
                                        case "\\":
                                        case ".":
                                        case "*":
                                        case "+":
                                        case "?":
                                        case "(":
                                        case ")":
                                        case "[":
                                        case "|":
                                        case "/":
                                        case "\n":
                                        case "\r":
                                        case "\u2028":
                                        case "\u2029":
                                            return !1;
                                        default:
                                            return !0;
                                    }
                                }),
                                (t.prototype.parseHexDigits = function (t) {
                                    for (var e = "", r = 0; r < t; r++) {
                                        var o = this.popChar();
                                        if (!1 === n.test(o)) throw Error("Expecting a HexDecimal digits");
                                        e += o;
                                    }
                                    return { type: "Character", value: parseInt(e, 16) };
                                }),
                                (t.prototype.peekChar = function (t) {
                                    return void 0 === t && (t = 0), this.input[this.idx + t];
                                }),
                                (t.prototype.popChar = function () {
                                    var t = this.peekChar(0);
                                    return this.consumeChar(), t;
                                }),
                                (t.prototype.consumeChar = function (t) {
                                    if (void 0 !== t && this.input[this.idx] !== t) throw Error("Expected: '" + t + "' but found: '" + this.input[this.idx] + "' at offset: " + this.idx);
                                    if (this.idx >= this.input.length) throw Error("Unexpected end of input");
                                    this.idx++;
                                }),
                                (t.prototype.loc = function (t) {
                                    return { begin: t, end: this.idx };
                                });
                            var e,
                                n = /[0-9a-fA-F]/,
                                r = /[0-9]/,
                                o = /[1-9]/;
                            function i(t) {
                                return t.charCodeAt(0);
                            }
                            function u(t, e) {
                                void 0 !== t.length
                                    ? t.forEach(function (t) {
                                        e.push(t);
                                    })
                                    : e.push(t);
                            }
                            function a(t, e) {
                                if (!0 === t[e]) throw "duplicate flag " + e;
                                t[e] = !0;
                            }
                            function s(t) {
                                if (void 0 === t) throw Error("Internal Error - Should never get here!");
                            }
                            var c = [];
                            for (e = i("0"); e <= i("9"); e++) c.push(e);
                            var l = [i("_")].concat(c);
                            for (e = i("a"); e <= i("z"); e++) l.push(e);
                            for (e = i("A"); e <= i("Z"); e++) l.push(e);
                            var p = [
                                i(" "),
                                i("\f"),
                                i("\n"),
                                i("\r"),
                                i("	"),
                                i("\v"),
                                i("	"),
                                i("\xa0"),
                                i(" "),
                                i(" "),
                                i(" "),
                                i(" "),
                                i(" "),
                                i(" "),
                                i(" "),
                                i(" "),
                                i(" "),
                                i(" "),
                                i(" "),
                                i(" "),
                                i("\u2028"),
                                i("\u2029"),
                                i(" "),
                                i(" "),
                                i("　"),
                                i("\uFEFF"),
                            ];
                            function f() { }
                            return (
                                (f.prototype.visitChildren = function (t) {
                                    for (var e in t) {
                                        var n = t[e];
                                        t.hasOwnProperty(e) &&
                                            (void 0 !== n.type
                                                ? this.visit(n)
                                                : Array.isArray(n) &&
                                                n.forEach(function (t) {
                                                    this.visit(t);
                                                }, this));
                                    }
                                }),
                                (f.prototype.visit = function (t) {
                                    switch (t.type) {
                                        case "Pattern":
                                            this.visitPattern(t);
                                            break;
                                        case "Flags":
                                            this.visitFlags(t);
                                            break;
                                        case "Disjunction":
                                            this.visitDisjunction(t);
                                            break;
                                        case "Alternative":
                                            this.visitAlternative(t);
                                            break;
                                        case "StartAnchor":
                                            this.visitStartAnchor(t);
                                            break;
                                        case "EndAnchor":
                                            this.visitEndAnchor(t);
                                            break;
                                        case "WordBoundary":
                                            this.visitWordBoundary(t);
                                            break;
                                        case "NonWordBoundary":
                                            this.visitNonWordBoundary(t);
                                            break;
                                        case "Lookahead":
                                            this.visitLookahead(t);
                                            break;
                                        case "NegativeLookahead":
                                            this.visitNegativeLookahead(t);
                                            break;
                                        case "Character":
                                            this.visitCharacter(t);
                                            break;
                                        case "Set":
                                            this.visitSet(t);
                                            break;
                                        case "Group":
                                            this.visitGroup(t);
                                            break;
                                        case "GroupBackReference":
                                            this.visitGroupBackReference(t);
                                            break;
                                        case "Quantifier":
                                            this.visitQuantifier(t);
                                    }
                                    this.visitChildren(t);
                                }),
                                (f.prototype.visitPattern = function (t) { }),
                                (f.prototype.visitFlags = function (t) { }),
                                (f.prototype.visitDisjunction = function (t) { }),
                                (f.prototype.visitAlternative = function (t) { }),
                                (f.prototype.visitStartAnchor = function (t) { }),
                                (f.prototype.visitEndAnchor = function (t) { }),
                                (f.prototype.visitWordBoundary = function (t) { }),
                                (f.prototype.visitNonWordBoundary = function (t) { }),
                                (f.prototype.visitLookahead = function (t) { }),
                                (f.prototype.visitNegativeLookahead = function (t) { }),
                                (f.prototype.visitCharacter = function (t) { }),
                                (f.prototype.visitSet = function (t) { }),
                                (f.prototype.visitGroup = function (t) { }),
                                (f.prototype.visitGroupBackReference = function (t) { }),
                                (f.prototype.visitQuantifier = function (t) { }),
                                { RegExpParser: t, BaseRegExpVisitor: f, VERSION: "0.5.0" }
                            );
                        })
                        ? n.apply(e, r)
                        : n) && (t.exports = o);
        },
        22717: function (t, e, n) {
            "use strict";
            n.r(e),
                n.d(e, {
                    default: function () {
                        return tO;
                    },
                });
            var r = n(90266);
            function o(t, e) {
                return Object.assign(SyntaxError(t + " (" + e.loc.start.line + ":" + e.loc.start.column + ")"), e);
            }
            var i = Object.defineProperty;
            ((t, e) => {
                for (var n in e) i(t, n, { get: e[n], enumerable: !0 });
            })({}, { builders: () => tu, printer: () => ta, utils: () => ts });
            var u = "string",
                a = "array",
                s = "cursor",
                c = "indent",
                l = "align",
                p = "trim",
                f = "group",
                h = "fill",
                D = "if-break",
                d = "indent-if-break",
                E = "line-suffix",
                m = "line-suffix-boundary",
                y = "line",
                F = "label",
                C = "break-parent",
                g = new Set([s, c, l, p, f, h, D, d, E, m, y, F, C]),
                v = function (t) {
                    if ("string" == typeof t) return u;
                    if (Array.isArray(t)) return a;
                    if (!t) return;
                    let { type: e } = t;
                    if (g.has(e)) return e;
                },
                T = (t) => new Intl.ListFormat("en-US", { type: "disjunction" }).format(t),
                A = class extends Error {
                    name = "InvalidDocError";
                    constructor(t) {
                        super(
                            (function (t) {
                                let e = null === t ? "null" : typeof t;
                                if ("string" !== e && "object" !== e)
                                    return `Unexpected doc '${e}', 
Expected it to be 'string' or 'object'.`;
                                if (v(t)) throw Error("doc is valid.");
                                let n = Object.prototype.toString.call(t);
                                if ("[object Object]" !== n) return `Unexpected doc '${n}'.`;
                                let r = T([...g].map((t) => `'${t}'`));
                                return `Unexpected doc.type '${t.type}'.
Expected it to be ${r}.`;
                            })(t)
                        ),
                            (this.doc = t);
                    }
                },
                I = {},
                S = function (t, e, n, r) {
                    let o = [t];
                    for (; o.length > 0;) {
                        let t = o.pop();
                        if (t === I) {
                            n(o.pop());
                            continue;
                        }
                        n && o.push(t, I);
                        let i = v(t);
                        if (!i) throw new A(t);
                        if ((null == e ? void 0 : e(t)) !== !1)
                            switch (i) {
                                case a:
                                case h: {
                                    let e = i === a ? t : t.parts;
                                    for (let t = e.length, n = t - 1; n >= 0; --n) o.push(e[n]);
                                    break;
                                }
                                case D:
                                    o.push(t.flatContents, t.breakContents);
                                    break;
                                case f:
                                    if (r && t.expandedStates) for (let e = t.expandedStates.length, n = e - 1; n >= 0; --n) o.push(t.expandedStates[n]);
                                    else o.push(t.contents);
                                    break;
                                case l:
                                case c:
                                case d:
                                case F:
                                case E:
                                    o.push(t.contents);
                                    break;
                                case u:
                                case s:
                                case p:
                                case m:
                                case y:
                                case C:
                                    break;
                                default:
                                    throw new A(t);
                            }
                    }
                },
                R = () => { };
            function N(t) {
                return R(t), { type: c, contents: t };
            }
            function O(t, e) {
                return R(e), { type: l, contents: e, n: t };
            }
            function x(t, e = {}) {
                return R(t), R(e.expandedStates, !0), { type: f, id: e.id, contents: t, break: !!e.shouldBreak, expandedStates: e.expandedStates };
            }
            function L(t) {
                return R(t), { type: h, parts: t };
            }
            var k = { type: C },
                _ = { type: y, hard: !0 },
                b = { type: y, hard: !0, literal: !0 },
                P = [_, k],
                M = [b, k];
            function B(t, e) {
                R(t), R(e);
                let n = [];
                for (let r = 0; r < e.length; r++) 0 !== r && n.push(t), n.push(e[r]);
                return n;
            }
            var w = (t, e, n) => (t && null == e ? void 0 : Array.isArray(e) || "string" == typeof e ? e[n < 0 ? e.length + n : n] : e.at(n)),
                U = (t, e, n, r) => (t && null == e ? void 0 : e.replaceAll ? e.replaceAll(n, r) : n.global ? e.replace(n, r) : e.split(n).join(r)),
                j = () =>
                    /[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC2\uDECE-\uDEDB\uDEE0-\uDEE8]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g,
                G = (t) => {
                    var e;
                    return !(
                        12288 === t ||
                        (t >= 65281 && t <= 65376) ||
                        (t >= 65504 && t <= 65510) ||
                        ((e = t) >= 4352 && e <= 4447) ||
                        8986 === e ||
                        8987 === e ||
                        9001 === e ||
                        9002 === e ||
                        (e >= 9193 && e <= 9196) ||
                        9200 === e ||
                        9203 === e ||
                        9725 === e ||
                        9726 === e ||
                        9748 === e ||
                        9749 === e ||
                        (e >= 9800 && e <= 9811) ||
                        9855 === e ||
                        9875 === e ||
                        9889 === e ||
                        9898 === e ||
                        9899 === e ||
                        9917 === e ||
                        9918 === e ||
                        9924 === e ||
                        9925 === e ||
                        9934 === e ||
                        9940 === e ||
                        9962 === e ||
                        9970 === e ||
                        9971 === e ||
                        9973 === e ||
                        9978 === e ||
                        9981 === e ||
                        9989 === e ||
                        9994 === e ||
                        9995 === e ||
                        10024 === e ||
                        10060 === e ||
                        10062 === e ||
                        (e >= 10067 && e <= 10069) ||
                        10071 === e ||
                        (e >= 10133 && e <= 10135) ||
                        10160 === e ||
                        10175 === e ||
                        11035 === e ||
                        11036 === e ||
                        11088 === e ||
                        11093 === e ||
                        (e >= 11904 && e <= 11929) ||
                        (e >= 11931 && e <= 12019) ||
                        (e >= 12032 && e <= 12245) ||
                        (e >= 12272 && e <= 12287) ||
                        (e >= 12289 && e <= 12350) ||
                        (e >= 12353 && e <= 12438) ||
                        (e >= 12441 && e <= 12543) ||
                        (e >= 12549 && e <= 12591) ||
                        (e >= 12593 && e <= 12686) ||
                        (e >= 12688 && e <= 12771) ||
                        (e >= 12783 && e <= 12830) ||
                        (e >= 12832 && e <= 12871) ||
                        (e >= 12880 && e <= 19903) ||
                        (e >= 19968 && e <= 42124) ||
                        (e >= 42128 && e <= 42182) ||
                        (e >= 43360 && e <= 43388) ||
                        (e >= 44032 && e <= 55203) ||
                        (e >= 63744 && e <= 64255) ||
                        (e >= 65040 && e <= 65049) ||
                        (e >= 65072 && e <= 65106) ||
                        (e >= 65108 && e <= 65126) ||
                        (e >= 65128 && e <= 65131) ||
                        (e >= 94176 && e <= 94180) ||
                        94192 === e ||
                        94193 === e ||
                        (e >= 94208 && e <= 100343) ||
                        (e >= 100352 && e <= 101589) ||
                        (e >= 101632 && e <= 101640) ||
                        (e >= 110576 && e <= 110579) ||
                        (e >= 110581 && e <= 110587) ||
                        110589 === e ||
                        110590 === e ||
                        (e >= 110592 && e <= 110882) ||
                        110898 === e ||
                        (e >= 110928 && e <= 110930) ||
                        110933 === e ||
                        (e >= 110948 && e <= 110951) ||
                        (e >= 110960 && e <= 111355) ||
                        126980 === e ||
                        127183 === e ||
                        127374 === e ||
                        (e >= 127377 && e <= 127386) ||
                        (e >= 127488 && e <= 127490) ||
                        (e >= 127504 && e <= 127547) ||
                        (e >= 127552 && e <= 127560) ||
                        127568 === e ||
                        127569 === e ||
                        (e >= 127584 && e <= 127589) ||
                        (e >= 127744 && e <= 127776) ||
                        (e >= 127789 && e <= 127797) ||
                        (e >= 127799 && e <= 127868) ||
                        (e >= 127870 && e <= 127891) ||
                        (e >= 127904 && e <= 127946) ||
                        (e >= 127951 && e <= 127955) ||
                        (e >= 127968 && e <= 127984) ||
                        127988 === e ||
                        (e >= 127992 && e <= 128062) ||
                        128064 === e ||
                        (e >= 128066 && e <= 128252) ||
                        (e >= 128255 && e <= 128317) ||
                        (e >= 128331 && e <= 128334) ||
                        (e >= 128336 && e <= 128359) ||
                        128378 === e ||
                        128405 === e ||
                        128406 === e ||
                        128420 === e ||
                        (e >= 128507 && e <= 128591) ||
                        (e >= 128640 && e <= 128709) ||
                        128716 === e ||
                        (e >= 128720 && e <= 128722) ||
                        (e >= 128725 && e <= 128727) ||
                        (e >= 128732 && e <= 128735) ||
                        128747 === e ||
                        128748 === e ||
                        (e >= 128756 && e <= 128764) ||
                        (e >= 128992 && e <= 129003) ||
                        129008 === e ||
                        (e >= 129292 && e <= 129338) ||
                        (e >= 129340 && e <= 129349) ||
                        (e >= 129351 && e <= 129535) ||
                        (e >= 129648 && e <= 129660) ||
                        (e >= 129664 && e <= 129672) ||
                        (e >= 129680 && e <= 129725) ||
                        (e >= 129727 && e <= 129733) ||
                        (e >= 129742 && e <= 129755) ||
                        (e >= 129760 && e <= 129768) ||
                        (e >= 129776 && e <= 129784) ||
                        (e >= 131072 && e <= 196605) ||
                        (e >= 196608 && e <= 262141)
                    );
                },
                W = /[^\x20-\x7F]/,
                V = function (t) {
                    if (!t) return 0;
                    if (!W.test(t)) return t.length;
                    t = t.replace(j(), "  ");
                    let e = 0;
                    for (let n of t) {
                        let t = n.codePointAt(0);
                        t <= 31 || (t >= 127 && t <= 159) || (t >= 768 && t <= 879) || (e += G(t) ? 1 : 2);
                    }
                    return e;
                },
                K = (t) => {
                    if (Array.isArray(t)) return t;
                    if (t.type !== h) throw Error(`Expect doc to be 'array' or '${h}'.`);
                    return t.parts;
                };
            function H(t, e) {
                if ("string" == typeof t) return e(t);
                let n = new Map();
                return (function t(r) {
                    if (n.has(r)) return n.get(r);
                    let o = (function (n) {
                        switch (v(n)) {
                            case a:
                                return e(n.map(t));
                            case h:
                                return e({ ...n, parts: n.parts.map(t) });
                            case D:
                                return e({ ...n, breakContents: t(n.breakContents), flatContents: t(n.flatContents) });
                            case f: {
                                let { expandedStates: r, contents: o } = n;
                                return (o = r ? (r = r.map(t))[0] : t(o)), e({ ...n, contents: o, expandedStates: r });
                            }
                            case l:
                            case c:
                            case d:
                            case F:
                            case E:
                                return e({ ...n, contents: t(n.contents) });
                            case u:
                            case s:
                            case p:
                            case m:
                            case y:
                            case C:
                                return e(n);
                            default:
                                throw new A(n);
                        }
                    })(r);
                    return n.set(r, o), o;
                })(t);
            }
            function $(t, e, n) {
                let r = n,
                    o = !1;
                return (
                    S(t, function (t) {
                        if (o) return !1;
                        let n = e(t);
                        void 0 !== n && ((o = !0), (r = n));
                    }),
                    r
                );
            }
            function Y(t) {
                if ((t.type === f && t.break) || (t.type === y && t.hard) || t.type === C) return !0;
            }
            function X(t) {
                if (t.length > 0) {
                    let e = w(!1, t, -1);
                    e.expandedStates || e.break || (e.break = "propagated");
                }
                return null;
            }
            function z(t) {
                return t.type !== y || t.hard ? (t.type === D ? t.flatContents : t) : t.soft ? "" : " ";
            }
            function Q(t) {
                for (t = [...t]; t.length >= 2 && w(!1, t, -2).type === y && w(!1, t, -1).type === C;) t.length -= 2;
                if (t.length > 0) {
                    let e = q(w(!1, t, -1));
                    t[t.length - 1] = e;
                }
                return t;
            }
            function q(t) {
                switch (v(t)) {
                    case l:
                    case c:
                    case d:
                    case f:
                    case E:
                    case F: {
                        let e = q(t.contents);
                        return { ...t, contents: e };
                    }
                    case D:
                        return { ...t, breakContents: q(t.breakContents), flatContents: q(t.flatContents) };
                    case h:
                        return { ...t, parts: Q(t.parts) };
                    case a:
                        return Q(t);
                    case u:
                        return t.replace(/[\n\r]*$/, "");
                    case s:
                    case p:
                    case m:
                    case y:
                    case C:
                        break;
                    default:
                        throw new A(t);
                }
                return t;
            }
            function J(t) {
                if (t.type === y) return !0;
            }
            var Z = Symbol("MODE_BREAK"),
                tt = Symbol("MODE_FLAT"),
                te = Symbol("cursor");
            function tn() {
                return { value: "", length: 0, queue: [] };
            }
            function tr(t, e, n) {
                let r = "dedent" === e.type ? t.queue.slice(0, -1) : [...t.queue, e],
                    o = "",
                    i = 0,
                    u = 0,
                    a = 0;
                for (let t of r)
                    switch (t.type) {
                        case "indent":
                            l(), n.useTabs ? s(1) : c(n.tabWidth);
                            break;
                        case "stringAlign":
                            l(), (o += t.n), (i += t.n.length);
                            break;
                        case "numberAlign":
                            (u += 1), (a += t.n);
                            break;
                        default:
                            throw Error(`Unexpected type '${t.type}'`);
                    }
                return p(), { ...t, value: o, length: i, queue: r };
                function s(t) {
                    (o += "	".repeat(t)), (i += n.tabWidth * t);
                }
                function c(t) {
                    (o += " ".repeat(t)), (i += t);
                }
                function l() {
                    n.useTabs ? (u > 0 && s(u), (u = 0), (a = 0)) : p();
                }
                function p() {
                    a > 0 && c(a), (u = 0), (a = 0);
                }
            }
            function to(t) {
                let e = 0,
                    n = 0,
                    r = t.length;
                n: for (; r--;) {
                    let o = t[r];
                    if (o === te) {
                        n++;
                        continue;
                    }
                    for (let n = o.length - 1; n >= 0; n--) {
                        let i = o[n];
                        if (" " === i || "	" === i) e++;
                        else {
                            t[r] = o.slice(0, n + 1);
                            break n;
                        }
                    }
                }
                if (e > 0 || n > 0) for (t.length = r + 1; n-- > 0;) t.push(te);
                return e;
            }
            function ti(t, e, n, r, o, i) {
                if (n === Number.POSITIVE_INFINITY) return !0;
                let s = e.length,
                    C = [t],
                    g = [];
                for (; n >= 0;) {
                    if (0 === C.length) {
                        if (0 === s) return !0;
                        C.push(e[--s]);
                        continue;
                    }
                    let { mode: t, doc: T } = C.pop();
                    switch (v(T)) {
                        case u:
                            g.push(T), (n -= V(T));
                            break;
                        case a:
                        case h: {
                            let e = K(T);
                            for (let n = e.length - 1; n >= 0; n--) C.push({ mode: t, doc: e[n] });
                            break;
                        }
                        case c:
                        case l:
                        case d:
                        case F:
                            C.push({ mode: t, doc: T.contents });
                            break;
                        case p:
                            n += to(g);
                            break;
                        case f: {
                            if (i && T.break) return !1;
                            let e = T.break ? Z : t,
                                n = T.expandedStates && e === Z ? w(!1, T.expandedStates, -1) : T.contents;
                            C.push({ mode: e, doc: n });
                            break;
                        }
                        case D: {
                            let e = (T.groupId ? o[T.groupId] || tt : t) === Z ? T.breakContents : T.flatContents;
                            e && C.push({ mode: t, doc: e });
                            break;
                        }
                        case y:
                            if (t === Z || T.hard) return !0;
                            !T.soft && (g.push(" "), n--);
                            break;
                        case E:
                            r = !0;
                            break;
                        case m:
                            if (r) return !1;
                    }
                }
                return !1;
            }
            var tu = {
                join: B,
                line: { type: y },
                softline: { type: y, soft: !0 },
                hardline: P,
                literalline: M,
                group: x,
                conditionalGroup: function (t, e) {
                    return x(t[0], { ...e, expandedStates: t });
                },
                fill: L,
                lineSuffix: function (t) {
                    return R(t), { type: E, contents: t };
                },
                lineSuffixBoundary: { type: m },
                cursor: { type: s },
                breakParent: k,
                ifBreak: function (t, e = "", n = {}) {
                    return R(t), "" !== e && R(e), { type: D, breakContents: t, flatContents: e, groupId: n.groupId };
                },
                trim: { type: p },
                indent: N,
                indentIfBreak: function (t, e) {
                    return R(t), { type: d, contents: t, groupId: e.groupId, negate: e.negate };
                },
                align: O,
                addAlignmentToDoc: function (t, e, n) {
                    R(t);
                    let r = t;
                    if (e > 0) {
                        for (let t = 0; t < Math.floor(e / n); ++t) r = N(r);
                        (r = O(e % n, r)), (r = O(Number.NEGATIVE_INFINITY, r));
                    }
                    return r;
                },
                markAsRoot: function (t) {
                    return O({ type: "root" }, t);
                },
                dedentToRoot: function (t) {
                    return O(Number.NEGATIVE_INFINITY, t);
                },
                dedent: function (t) {
                    return O(-1, t);
                },
                hardlineWithoutBreakParent: _,
                literallineWithoutBreakParent: b,
                label: function (t, e) {
                    return R(e), t ? { type: F, label: t, contents: e } : e;
                },
                concat: (t) => t,
            },
                ta = {
                    printDocToString: function (t, e) {
                        let n = {},
                            r = e.printWidth,
                            o = (function (t) {
                                switch (t) {
                                    case "cr":
                                        return "\r";
                                    case "crlf":
                                        return "\r\n";
                                    default:
                                        return "\n";
                                }
                            })(e.endOfLine),
                            i = 0,
                            g = [{ ind: tn(), mode: Z, doc: t }],
                            T = [],
                            I = !1,
                            R = [],
                            O = 0;
                        for (
                            !(function (t) {
                                let e = new Set(),
                                    n = [];
                                S(
                                    t,
                                    function (t) {
                                        if ((t.type === C && X(n), t.type === f)) {
                                            if ((n.push(t), e.has(t))) return !1;
                                            e.add(t);
                                        }
                                    },
                                    function (t) {
                                        t.type === f && n.pop().break && X(n);
                                    },
                                    !0
                                );
                            })(t);
                            g.length > 0;

                        ) {
                            let { ind: t, mode: S, doc: k } = g.pop();
                            switch (v(k)) {
                                case u: {
                                    let t = "\n" !== o ? U(!1, k, "\n", o) : k;
                                    T.push(t), g.length > 0 && (i += V(t));
                                    break;
                                }
                                case a:
                                    for (let e = k.length - 1; e >= 0; e--) g.push({ ind: t, mode: S, doc: k[e] });
                                    break;
                                case s:
                                    if (O >= 2) throw Error("There are too many 'cursor' in doc.");
                                    T.push(te), O++;
                                    break;
                                case c:
                                    g.push({ ind: tr(t, { type: "indent" }, e), mode: S, doc: k.contents });
                                    break;
                                case l:
                                    var x;
                                    g.push({
                                        ind:
                                            (x = k.n) === Number.NEGATIVE_INFINITY
                                                ? t.root || tn()
                                                : x < 0
                                                    ? tr(t, { type: "dedent" }, e)
                                                    : x
                                                        ? "root" === x.type
                                                            ? { ...t, root: t }
                                                            : tr(t, { type: "string" == typeof x ? "stringAlign" : "numberAlign", n: x }, e)
                                                        : t,
                                        mode: S,
                                        doc: k.contents,
                                    });
                                    break;
                                case p:
                                    i -= to(T);
                                    break;
                                case f:
                                    switch (S) {
                                        case tt:
                                            if (!I) {
                                                g.push({ ind: t, mode: k.break ? Z : tt, doc: k.contents });
                                                break;
                                            }
                                        case Z: {
                                            I = !1;
                                            let e = { ind: t, mode: tt, doc: k.contents },
                                                o = r - i,
                                                u = R.length > 0;
                                            if (!k.break && ti(e, g, o, u, n)) g.push(e);
                                            else if (k.expandedStates) {
                                                let e = w(!1, k.expandedStates, -1);
                                                if (k.break) g.push({ ind: t, mode: Z, doc: e });
                                                else
                                                    for (let r = 1; r < k.expandedStates.length + 1; r++) {
                                                        if (r >= k.expandedStates.length) {
                                                            g.push({ ind: t, mode: Z, doc: e });
                                                            break;
                                                        }
                                                        {
                                                            let e = { ind: t, mode: tt, doc: k.expandedStates[r] };
                                                            if (ti(e, g, o, u, n)) {
                                                                g.push(e);
                                                                break;
                                                            }
                                                        }
                                                    }
                                            } else g.push({ ind: t, mode: Z, doc: k.contents });
                                        }
                                    }
                                    k.id && (n[k.id] = w(!1, g, -1).mode);
                                    break;
                                case h: {
                                    let e = r - i,
                                        { parts: o } = k;
                                    if (0 === o.length) break;
                                    let [u, a] = o,
                                        s = { ind: t, mode: tt, doc: u },
                                        c = { ind: t, mode: Z, doc: u },
                                        l = ti(s, [], e, R.length > 0, n, !0);
                                    if (1 === o.length) {
                                        l ? g.push(s) : g.push(c);
                                        break;
                                    }
                                    let p = { ind: t, mode: tt, doc: a },
                                        f = { ind: t, mode: Z, doc: a };
                                    if (2 === o.length) {
                                        l ? g.push(p, s) : g.push(f, c);
                                        break;
                                    }
                                    o.splice(0, 2);
                                    let h = { ind: t, mode: S, doc: L(o) };
                                    ti({ ind: t, mode: tt, doc: [u, a, o[0]] }, [], e, R.length > 0, n, !0) ? g.push(h, p, s) : l ? g.push(h, f, s) : g.push(h, f, c);
                                    break;
                                }
                                case D:
                                case d: {
                                    let e = k.groupId ? n[k.groupId] : S;
                                    if (e === Z) {
                                        let e = k.type === D ? k.breakContents : k.negate ? k.contents : N(k.contents);
                                        e && g.push({ ind: t, mode: S, doc: e });
                                    }
                                    if (e === tt) {
                                        let e = k.type === D ? k.flatContents : k.negate ? N(k.contents) : k.contents;
                                        e && g.push({ ind: t, mode: S, doc: e });
                                    }
                                    break;
                                }
                                case E:
                                    R.push({ ind: t, mode: S, doc: k.contents });
                                    break;
                                case m:
                                    R.length > 0 && g.push({ ind: t, mode: S, doc: _ });
                                    break;
                                case y:
                                    switch (S) {
                                        case tt:
                                            if (k.hard) I = !0;
                                            else {
                                                k.soft || (T.push(" "), (i += 1));
                                                break;
                                            }
                                        case Z:
                                            if (R.length > 0) {
                                                g.push({ ind: t, mode: S, doc: k }, ...R.reverse()), (R.length = 0);
                                                break;
                                            }
                                            k.literal ? (t.root ? (T.push(o, t.root.value), (i = t.root.length)) : (T.push(o), (i = 0))) : ((i -= to(T)), T.push(o + t.value), (i = t.length));
                                    }
                                    break;
                                case F:
                                    g.push({ ind: t, mode: S, doc: k.contents });
                                    break;
                                case C:
                                    break;
                                default:
                                    throw new A(k);
                            }
                            0 === g.length && R.length > 0 && (g.push(...R.reverse()), (R.length = 0));
                        }
                        let k = T.indexOf(te);
                        if (-1 !== k) {
                            let t = T.indexOf(te, k + 1),
                                e = T.slice(0, k).join(""),
                                n = T.slice(k + 1, t).join("");
                            return { formatted: e + n + T.slice(t + 1).join(""), cursorNodeStart: e.length, cursorNodeText: n };
                        }
                        return { formatted: T.join("") };
                    },
                },
                ts = {
                    willBreak: function (t) {
                        return $(t, Y, !1);
                    },
                    traverseDoc: S,
                    findInDoc: $,
                    mapDoc: H,
                    removeLines: function (t) {
                        return H(t, z);
                    },
                    stripTrailingHardline: function (t) {
                        return q(
                            H(t, (t) =>
                                (function (t) {
                                    switch (v(t)) {
                                        case h:
                                            if (t.parts.every((t) => "" === t)) return "";
                                            break;
                                        case f:
                                            if (!t.contents && !t.id && !t.break && !t.expandedStates) return "";
                                            if (t.contents.type === f && t.contents.id === t.id && t.contents.break === t.break && t.contents.expandedStates === t.expandedStates) return t.contents;
                                            break;
                                        case l:
                                        case c:
                                        case d:
                                        case E:
                                            if (!t.contents) return "";
                                            break;
                                        case D:
                                            if (!t.flatContents && !t.breakContents) return "";
                                            break;
                                        case a: {
                                            let e = [];
                                            for (let n of t) {
                                                if (!n) continue;
                                                let [t, ...r] = Array.isArray(n) ? n : [n];
                                                "string" == typeof t && "string" == typeof w(!1, e, -1) ? (e[e.length - 1] += t) : e.push(t), e.push(...r);
                                            }
                                            if (0 === e.length) return "";
                                            if (1 === e.length) return e[0];
                                            return e;
                                        }
                                        case u:
                                        case s:
                                        case p:
                                        case m:
                                        case y:
                                        case F:
                                        case C:
                                            break;
                                        default:
                                            throw new A(t);
                                    }
                                    return t;
                                })(t)
                            )
                        );
                    },
                    replaceEndOfLine: function (t, e = M) {
                        return H(t, (t) => ("string" == typeof t ? B(e, t.split("\n")) : t));
                    },
                    canBreak: function (t) {
                        return $(t, J, !1);
                    },
                };
            let { dedentToRoot: tc, group: tl, hardline: tp, indent: tf, join: th, line: tD, literalline: td, softline: tE } = tu,
                { fill: tm, group: ty, hardline: tF, indent: tC, join: tg, line: tv, literalline: tT, softline: tA } = tu,
                tI = "<!-- prettier-ignore-start -->",
                tS = "<!-- prettier-ignore-end -->";
            function tR(t) {
                if (0 === t.length) return !1;
                t.sort((t, e) => t.startOffset - e.startOffset);
                let e = !1;
                for (let n = 0; n < t.length; n += 1)
                    if (t[n].image === tI) e = !0;
                    else if (e && t[n].image === tS) return !0;
                return !1;
            }
            function tN(t) {
                let e = t.getValue();
                return { offset: e.startOffset, startLine: e.startLine, endLine: e.endLine, printed: e.image };
            }
            var tO = {
                languages: [
                    {
                        name: "Ant Build System",
                        tmScope: "text.xml.ant",
                        filenames: ["ant.xml", "build.xml"],
                        codemirrorMode: "xml",
                        codemirrorMimeType: "application/xml",
                        since: "0.1.0",
                        parsers: ["xml"],
                        linguistLanguageId: 15,
                        vscodeLanguageIds: ["xml"],
                    },
                    { name: "COLLADA", extensions: [".dae"], tmScope: "text.xml", codemirrorMode: "xml", codemirrorMimeType: "text/xml", since: "0.1.0", parsers: ["xml"], linguistLanguageId: 49, vscodeLanguageIds: ["xml"] },
                    { name: "Eagle", extensions: [".sch", ".brd"], tmScope: "text.xml", codemirrorMode: "xml", codemirrorMimeType: "text/xml", since: "0.1.0", parsers: ["xml"], linguistLanguageId: 97, vscodeLanguageIds: ["xml"] },
                    {
                        name: "Genshi",
                        extensions: [".kid"],
                        tmScope: "text.xml.genshi",
                        aliases: ["xml+genshi", "xml+kid"],
                        codemirrorMode: "xml",
                        codemirrorMimeType: "text/xml",
                        since: "0.1.0",
                        parsers: ["xml"],
                        linguistLanguageId: 126,
                        vscodeLanguageIds: ["xml"],
                    },
                    {
                        name: "JetBrains MPS",
                        aliases: ["mps"],
                        extensions: [".mps", ".mpl", ".msd"],
                        codemirrorMode: "xml",
                        codemirrorMimeType: "text/xml",
                        tmScope: "none",
                        since: "0.1.0",
                        parsers: ["xml"],
                        linguistLanguageId: 465165328,
                        vscodeLanguageIds: ["xml"],
                    },
                    {
                        name: "LabVIEW",
                        extensions: [".lvproj", ".lvclass", ".lvlib"],
                        tmScope: "text.xml",
                        codemirrorMode: "xml",
                        codemirrorMimeType: "text/xml",
                        since: "0.1.0",
                        parsers: ["xml"],
                        linguistLanguageId: 194,
                        vscodeLanguageIds: ["xml"],
                    },
                    {
                        name: "Maven POM",
                        group: "XML",
                        tmScope: "text.xml.pom",
                        filenames: ["pom.xml"],
                        codemirrorMode: "xml",
                        codemirrorMimeType: "text/xml",
                        since: "0.1.0",
                        parsers: ["xml"],
                        linguistLanguageId: 226,
                        vscodeLanguageIds: ["xml"],
                    },
                    { name: "SVG", extensions: [".svg"], tmScope: "text.xml.svg", codemirrorMode: "xml", codemirrorMimeType: "text/xml", since: "0.1.0", parsers: ["xml"], linguistLanguageId: 337, vscodeLanguageIds: ["xml"] },
                    { name: "Web Ontology Language", extensions: [".owl"], tmScope: "text.xml", since: "0.1.0", parsers: ["xml"], linguistLanguageId: 394, vscodeLanguageIds: ["xml"] },
                    {
                        name: "XML",
                        tmScope: "text.xml",
                        codemirrorMode: "xml",
                        codemirrorMimeType: "text/xml",
                        aliases: ["rss", "xsd", "wsdl"],
                        extensions: [
                            ".adml",
                            ".admx",
                            ".ant",
                            ".axaml",
                            ".axml",
                            ".builds",
                            ".ccproj",
                            ".ccxml",
                            ".clixml",
                            ".cproject",
                            ".cscfg",
                            ".csdef",
                            ".csl",
                            ".csproj",
                            ".ct",
                            ".depproj",
                            ".dita",
                            ".ditamap",
                            ".ditaval",
                            ".dll.config",
                            ".dotsettings",
                            ".filters",
                            ".fsproj",
                            ".fxml",
                            ".glade",
                            ".gml",
                            ".gmx",
                            ".grxml",
                            ".gst",
                            ".hzp",
                            ".iml",
                            ".inx",
                            ".ivy",
                            ".jelly",
                            ".jsproj",
                            ".kml",
                            ".launch",
                            ".mdpolicy",
                            ".mjml",
                            ".mm",
                            ".mod",
                            ".mxml",
                            ".natvis",
                            ".ncl",
                            ".ndproj",
                            ".nproj",
                            ".nuspec",
                            ".odd",
                            ".osm",
                            ".pkgproj",
                            ".pluginspec",
                            ".proj",
                            ".props",
                            ".ps1xml",
                            ".psc1",
                            ".pt",
                            ".qhelp",
                            ".rdf",
                            ".res",
                            ".resx",
                            ".rs",
                            ".rss",
                            ".runsettings",
                            ".sch",
                            ".scxml",
                            ".sfproj",
                            ".shproj",
                            ".srdf",
                            ".storyboard",
                            ".sublime-snippet",
                            ".sw",
                            ".targets",
                            ".tml",
                            ".ts",
                            ".tsx",
                            ".typ",
                            ".ui",
                            ".urdf",
                            ".ux",
                            ".vbproj",
                            ".vcxproj",
                            ".vsixmanifest",
                            ".vssettings",
                            ".vstemplate",
                            ".vxml",
                            ".wixproj",
                            ".workflow",
                            ".wsdl",
                            ".wsf",
                            ".wxi",
                            ".wxl",
                            ".wxs",
                            ".x3d",
                            ".xacro",
                            ".xaml",
                            ".xib",
                            ".xlf",
                            ".xliff",
                            ".xmi",
                            ".xml",
                            ".xml.dist",
                            ".xmp",
                            ".xproj",
                            ".xsd",
                            ".xspec",
                            ".xul",
                            ".zcml",
                        ],
                        filenames: [".classpath", ".cproject", ".project", "App.config", "NuGet.config", "Settings.StyleCop", "Web.Debug.config", "Web.Release.config", "Web.config", "packages.config"],
                        since: "0.1.0",
                        parsers: ["xml"],
                        linguistLanguageId: 399,
                        vscodeLanguageIds: ["xml"],
                    },
                    {
                        name: "XML Property List",
                        group: "XML",
                        extensions: [".plist", ".stTheme", ".tmCommand", ".tmLanguage", ".tmPreferences", ".tmSnippet", ".tmTheme"],
                        tmScope: "text.xml.plist",
                        codemirrorMode: "xml",
                        codemirrorMimeType: "text/xml",
                        since: "0.1.0",
                        parsers: ["xml"],
                        linguistLanguageId: 75622871,
                        vscodeLanguageIds: ["xml"],
                    },
                    {
                        name: "XPages",
                        extensions: [".xsp-config", ".xsp.metadata"],
                        tmScope: "text.xml",
                        codemirrorMode: "xml",
                        codemirrorMimeType: "text/xml",
                        since: "0.1.0",
                        parsers: ["xml"],
                        linguistLanguageId: 400,
                        vscodeLanguageIds: ["xml"],
                    },
                    { name: "XProc", extensions: [".xpl", ".xproc"], tmScope: "text.xml", codemirrorMode: "xml", codemirrorMimeType: "text/xml", since: "0.1.0", parsers: ["xml"], linguistLanguageId: 401, vscodeLanguageIds: ["xml"] },
                    {
                        name: "XSLT",
                        aliases: ["xsl"],
                        extensions: [".xslt", ".xsl"],
                        tmScope: "text.xml.xsl",
                        codemirrorMode: "xml",
                        codemirrorMimeType: "text/xml",
                        since: "0.1.0",
                        parsers: ["xml"],
                        linguistLanguageId: 404,
                        vscodeLanguageIds: ["xml"],
                    },
                ],
                parsers: {
                    xml: {
                        parse(t) {
                            let { lexErrors: e, parseErrors: n, cst: i } = (0, r.parse)(t);
                            if (e.length > 0) {
                                let t = e[0];
                                throw o(t.message, { loc: { start: { line: t.line, column: t.column }, end: { line: t.line, column: t.column + t.length } } });
                            }
                            if (n.length > 0) {
                                let t = n[0];
                                throw o(t.message, { loc: { start: { line: t.token.startLine, column: t.token.startColumn }, end: { line: t.token.endLine, column: t.token.endColumn } } });
                            }
                            return (function t(e) {
                                switch (e.name) {
                                    case "attribute": {
                                        let { Name: t, EQUALS: n, STRING: r } = e.children;
                                        return { name: "attribute", Name: t[0].image, EQUALS: n[0].image, STRING: r[0].image, location: e.location };
                                    }
                                    case "chardata": {
                                        let { SEA_WS: t, TEXT: n } = e.children;
                                        return { name: "chardata", SEA_WS: t ? t[0].image : null, TEXT: n ? n[0].image : null, location: e.location };
                                    }
                                    case "content": {
                                        let { CData: n, Comment: r, chardata: o, element: i, PROCESSING_INSTRUCTION: u, reference: a } = e.children;
                                        return { name: "content", CData: n || [], Comment: r || [], chardata: (o || []).map(t), element: (i || []).map(t), PROCESSING_INSTRUCTION: u || [], reference: (a || []).map(t), location: e.location };
                                    }
                                    case "docTypeDecl": {
                                        let { DocType: n, Name: r, externalID: o, CLOSE: i } = e.children;
                                        return { name: "docTypeDecl", DocType: n[0].image, Name: r[0].image, externalID: o ? t(o[0]) : null, CLOSE: i[0].image, location: e.location };
                                    }
                                    case "document": {
                                        let { docTypeDecl: n, element: r, misc: o, prolog: i } = e.children;
                                        return { name: "document", docTypeDecl: n ? t(n[0]) : null, element: r ? t(r[0]) : null, misc: (o || []).filter((t) => !t.children.SEA_WS).map(t), prolog: i ? t(i[0]) : null, location: e.location };
                                    }
                                    case "element": {
                                        let { OPEN: n, Name: r, attribute: o, START_CLOSE: i, content: u, SLASH_OPEN: a, END_NAME: s, END: c, SLASH_CLOSE: l } = e.children;
                                        return {
                                            name: "element",
                                            OPEN: n[0].image,
                                            Name: r[0].image,
                                            attribute: (o || []).map(t),
                                            START_CLOSE: i ? i[0].image : null,
                                            content: u ? t(u[0]) : null,
                                            SLASH_OPEN: a ? a[0].image : null,
                                            END_NAME: s ? s[0].image : null,
                                            END: c ? c[0].image : null,
                                            SLASH_CLOSE: l ? l[0].image : null,
                                            location: e.location,
                                        };
                                    }
                                    case "externalID": {
                                        let { Public: t, PubIDLiteral: n, System: r, SystemLiteral: o } = e.children;
                                        return { name: "externalID", Public: t ? t[0].image : null, PubIDLiteral: n ? n[0].image : null, System: r ? r[0].image : null, SystemLiteral: o ? o[0].image : null, location: e.location };
                                    }
                                    case "misc": {
                                        let { Comment: t, PROCESSING_INSTRUCTION: n, SEA_WS: r } = e.children;
                                        return { name: "misc", Comment: t ? t[0].image : null, PROCESSING_INSTRUCTION: n ? n[0].image : null, SEA_WS: r ? r[0].image : null, location: e.location };
                                    }
                                    case "prolog": {
                                        let { XMLDeclOpen: n, attribute: r, SPECIAL_CLOSE: o } = e.children;
                                        return { name: "prolog", XMLDeclOpen: n[0].image, attribute: (r || []).map(t), SPECIAL_CLOSE: o[0].image, location: e.location };
                                    }
                                    case "reference": {
                                        let { CharRef: t, EntityRef: n } = e.children;
                                        return { name: "reference", CharRef: t ? t[0].image : null, EntityRef: n ? n[0].image : null, location: e.location };
                                    }
                                    default:
                                        throw Error(`Unknown node type: ${e.name}`);
                                }
                            })(i);
                        },
                        astFormat: "xml",
                        locStart: (t) => t.location.startOffset,
                        locEnd: (t) => t.location.endOffset,
                    },
                },
                printers: {
                    xml: {
                        getVisitorKeys: (t, e) => Object.keys(t).filter((t) => "location" !== t && "tokenType" !== t),
                        embed: function (t, e) {
                            let n = t.getValue();
                            if ("element" !== n.name) return;
                            let r = (function (t, e) {
                                let { Name: n, attribute: r } = t,
                                    o = n.toLowerCase();
                                return "xml" === o
                                    ? null
                                    : (("style" === o || "script" === o) &&
                                        r.length > 0 &&
                                        (o = (function (t) {
                                            for (let e of t)
                                                if ("type" === e.Name) {
                                                    let t = e.STRING;
                                                    if (t.startsWith('"text/') && t.endsWith('"')) return t.slice(6, -1);
                                                }
                                            return null;
                                        })(r)),
                                        "javascript" === o && (o = "babel"),
                                        e.plugins.some((t) => "string" != typeof t && t.parsers && Object.prototype.hasOwnProperty.call(t.parsers, o)))
                                        ? o
                                        : null;
                            })(n, e);
                            if (!r || !n.content) return;
                            let o = n.content;
                            if (0 !== o.chardata.length && !(o.CData.length > 0) && !(o.Comment.length > 0) && !(o.element.length > 0) && !(o.PROCESSING_INSTRUCTION.length > 0) && !(o.reference.length > 0))
                                return async function (n, i) {
                                    let { openTag: u, closeTag: a } = (function (t, e, n) {
                                        let { OPEN: r, Name: o, attribute: i, START_CLOSE: u, SLASH_OPEN: a, END_NAME: s, END: c } = t.getValue(),
                                            l = [r, o];
                                        return i.length > 0 && l.push(tf([tD, th(tD, t.map(n, "attribute"))])), e.bracketSameLine || l.push(tE), { openTag: tl([...l, u]), closeTag: tl([a, s, c]) };
                                    })(t, e, i),
                                        s = await n(
                                            o.chardata
                                                .map((t) => {
                                                    let { SEA_WS: e, TEXT: n } = t;
                                                    return { offset: t.location.startOffset, printed: e || n };
                                                })
                                                .sort(({ offset: t }) => t)
                                                .map(({ printed: t }) => t)
                                                .join(""),
                                            { parser: r }
                                        );
                                    return tl([u, td, tc(ts.replaceEndOfLine(s)), tp, a]);
                                };
                        },
                        print(t, e, n) {
                            let r = t.getValue();
                            switch (r.name) {
                                case "attribute":
                                    return (function (t, e, n) {
                                        let r;
                                        let { Name: o, EQUALS: i, STRING: u } = t.getValue();
                                        if ("double" === e.xmlQuoteAttributes) {
                                            let t = u.slice(1, -1).replaceAll('"', "&quot;");
                                            r = `"${t}"`;
                                        } else if ("single" === e.xmlQuoteAttributes) {
                                            let t = u.slice(1, -1).replaceAll("'", "&apos;");
                                            r = `'${t}'`;
                                        } else r = u;
                                        return [o, i, r];
                                    })(t, e, 0);
                                case "chardata":
                                    return (function (t, e, n) {
                                        let { SEA_WS: r, TEXT: o } = t.getValue();
                                        return (r || o).split(/(\n)/g).map((t, e) => (e % 2 == 0 ? t : tT));
                                    })(t, 0, 0);
                                case "content":
                                    return (function (t, e, n) {
                                        let r = [
                                            ...t.map(tN, "CData"),
                                            ...t.map(tN, "Comment"),
                                            ...t.map((t) => ({ offset: t.getValue().location.startOffset, printed: n(t) }), "chardata"),
                                            ...t.map((t) => ({ offset: t.getValue().location.startOffset, printed: n(t) }), "element"),
                                            ...t.map(tN, "PROCESSING_INSTRUCTION"),
                                            ...t.map((t) => ({ offset: t.getValue().location.startOffset, printed: n(t) }), "reference"),
                                        ],
                                            { Comment: o } = t.getValue();
                                        if (tR(o)) {
                                            o.sort((t, e) => t.startOffset - e.startOffset);
                                            let t = [],
                                                n = null;
                                            o.forEach((e) => {
                                                e.image === tI ? (n = e) : n && e.image === tS && (t.push({ start: n.startOffset, end: e.endOffset }), (n = null));
                                            }),
                                                (r = r.filter((e) => t.every(({ start: t, end: n }) => e.offset < t || e.offset > n))),
                                                t.forEach(({ start: t, end: n }) => {
                                                    let o = e.originalText.slice(t, n + 1);
                                                    r.push({ offset: t, printed: ts.replaceEndOfLine(o) });
                                                });
                                        }
                                        return r.sort((t, e) => t.offset - e.offset), ty(r.map(({ printed: t }) => t));
                                    })(t, e, n);
                                case "docTypeDecl":
                                    return (function (t, e, n) {
                                        let { DocType: r, Name: o, externalID: i, CLOSE: u } = t.getValue(),
                                            a = [r, " ", o];
                                        return i && a.push(" ", t.call(n, "externalID")), ty([...a, u]);
                                    })(t, 0, n);
                                case "document":
                                    return (function (t, e, n) {
                                        let { docTypeDecl: r, element: o, misc: i, prolog: u } = t.getValue(),
                                            a = [];
                                        return (
                                            r && a.push({ offset: r.location.startOffset, printed: t.call(n, "docTypeDecl") }),
                                            u && a.push({ offset: u.location.startOffset, printed: t.call(n, "prolog") }),
                                            t.each((t) => {
                                                let e = t.getValue();
                                                a.push({ offset: e.location.startOffset, printed: n(t) });
                                            }, "misc"),
                                            o && a.push({ offset: o.location.startOffset, printed: t.call(n, "element") }),
                                            a.sort((t, e) => t.offset - e.offset),
                                            [
                                                tg(
                                                    tF,
                                                    a.map(({ printed: t }) => t)
                                                ),
                                                tF,
                                            ]
                                        );
                                    })(t, 0, n);
                                case "element":
                                    return (function (t, e, n) {
                                        let r;
                                        let { OPEN: o, Name: i, attribute: u, START_CLOSE: a, content: s, SLASH_OPEN: c, END_NAME: l, END: p, SLASH_CLOSE: f } = t.getValue(),
                                            h = [o, i];
                                        if (u.length > 0) {
                                            let r = t.map((t) => ({ node: t.getValue(), printed: n(t) }), "attribute");
                                            e.xmlSortAttributesByKey &&
                                                r.sort((t, e) => {
                                                    let n = t.node.Name,
                                                        r = e.node.Name;
                                                    if ("xmlns" === n) return -1;
                                                    if ("xmlns" === r) return 1;
                                                    if (n.includes(":") && r.includes(":")) {
                                                        let [t, e] = n.split(":"),
                                                            [o, i] = r.split(":");
                                                        return t === o ? e.localeCompare(i) : "xmlns" === t ? -1 : "xmlns" === o ? 1 : t.localeCompare(o);
                                                    }
                                                    return n.includes(":") ? -1 : r.includes(":") ? 1 : n.localeCompare(r);
                                                });
                                            let o = e.singleAttributePerLine ? tF : tv;
                                            h.push(
                                                tC([
                                                    tv,
                                                    tg(
                                                        o,
                                                        r.map(({ printed: t }) => t)
                                                    ),
                                                ])
                                            );
                                        }
                                        if (((r = e.bracketSameLine ? (e.xmlSelfClosingSpace ? " " : "") : e.xmlSelfClosingSpace ? tv : tA), f)) return ty([...h, r, f]);
                                        if (0 === s.chardata.length && 0 === s.CData.length && 0 === s.Comment.length && 0 === s.element.length && 0 === s.PROCESSING_INSTRUCTION.length && 0 === s.reference.length)
                                            return ty([...h, r, "/>"]);
                                        let D = ty([...h, e.bracketSameLine ? "" : tA, a]),
                                            d = ty([c, l, p]);
                                        if (!("strict" === e.xmlWhitespaceSensitivity || "xsl:text" === i || u.some((t) => t && "xml:space" === t.Name && "preserve" === t.STRING.slice(1, -1)) || s.CData.length > 0 || tR(s.Comment))) {
                                            let o = t.call(
                                                (t) =>
                                                    (function (t, e, n) {
                                                        let r = t.getValue(),
                                                            o = [];
                                                        return (
                                                            (o = o.concat(t.map(tN, "Comment"))),
                                                            r.chardata.length > 0 &&
                                                            (o =
                                                                r.chardata.some((t) => !!t.TEXT) && "preserve" === e.xmlWhitespaceSensitivity
                                                                    ? o.concat(
                                                                        (function (t, e) {
                                                                            let n;
                                                                            let r = [];
                                                                            return (
                                                                                t.each((t) => {
                                                                                    let o = t.getValue().location,
                                                                                        i = e(t);
                                                                                    if (n && o.startColumn && n.endColumn && o.startLine === n.endLine && o.startColumn === n.endColumn + 1) {
                                                                                        let t = r[r.length - 1];
                                                                                        (t.endLine = o.endLine), (t.printed = ty([t.printed, i]));
                                                                                    } else r.push({ offset: o.startOffset, startLine: o.startLine, endLine: o.endLine, printed: i, whitespace: !0 });
                                                                                    n = o;
                                                                                }, "chardata"),
                                                                                r
                                                                            );
                                                                        })(t, n)
                                                                    )
                                                                    : o.concat(
                                                                        (function (t) {
                                                                            let e = [];
                                                                            return (
                                                                                t.each((t) => {
                                                                                    let n = t.getValue();
                                                                                    if (!n.TEXT) return;
                                                                                    let r = ty(
                                                                                        n.TEXT.replaceAll(/^[\t\n\r\s]+|[\t\n\r\s]+$/g, "")
                                                                                            .split(/(\n)/g)
                                                                                            .map((t) => ("\n" === t ? tT : tm(t.split(/\b( +)\b/g).map((t, e) => (e % 2 == 0 ? t : tv)))))
                                                                                    ),
                                                                                        o = n.location;
                                                                                    e.push({ offset: o.startOffset, startLine: o.startLine, endLine: o.endLine, printed: r });
                                                                                }, "chardata"),
                                                                                e
                                                                            );
                                                                        })(t, n)
                                                                    )),
                                                            (o = (o = (o = o.concat(
                                                                t.map((t) => {
                                                                    let e = t.getValue().location;
                                                                    return { offset: e.startOffset, startLine: e.startLine, endLine: e.endLine, printed: n(t) };
                                                                }, "element")
                                                            )).concat(t.map(tN, "PROCESSING_INSTRUCTION"))).concat(
                                                                t.map((t) => {
                                                                    let e = t.getValue();
                                                                    return { type: "reference", offset: e.location.startOffset, startLine: e.location.startLine, endLine: e.location.endLine, printed: n(t) };
                                                                }, "reference")
                                                            ))
                                                        );
                                                    })(t, e, n),
                                                "content"
                                            );
                                            if ((o.sort((t, e) => t.offset - e.offset), "preserve" === e.xmlWhitespaceSensitivity && o.some(({ whitespace: t }) => t))) return ty([D, o.map(({ printed: t }) => t), d]);
                                            if (0 === o.length) return ty([...h, r, "/>"]);
                                            if (1 === o.length && 1 === s.chardata.filter((t) => t.TEXT).length) return ty([D, tC([tA, o[0].printed]), tA, d]);
                                            let i = tF;
                                            o.length === s.chardata.filter((t) => t.TEXT).length + s.reference.length && (i = " ");
                                            let u = [tF],
                                                a = o[0].startLine;
                                            return (
                                                o.forEach((t, e) => {
                                                    0 !== e && (t.startLine - a >= 2 ? u.push(tF, tF) : u.push(i)), u.push(t.printed), (a = t.endLine);
                                                }),
                                                ty([D, tC(u), tF, d])
                                            );
                                        }
                                        return ty([D, tC(t.call(n, "content")), d]);
                                    })(t, e, n);
                                case "externalID":
                                    return (function (t, e, n) {
                                        let { Public: r, PubIDLiteral: o, System: i, SystemLiteral: u } = t.getValue();
                                        return i ? ty([i, tC([tv, u])]) : ty([ty([r, tC([tv, o])]), tC([tv, u])]);
                                    })(t, 0, 0);
                                case "misc":
                                    return (function (t, e, n) {
                                        let { Comment: r, PROCESSING_INSTRUCTION: o, SEA_WS: i } = t.getValue();
                                        return r || o || i;
                                    })(t, 0, 0);
                                case "prolog":
                                    return (function (t, e, n) {
                                        let { XMLDeclOpen: r, attribute: o, SPECIAL_CLOSE: i } = t.getValue(),
                                            u = [r];
                                        return o && u.push(tC([tA, tg(tv, t.map(n, "attribute"))])), ty([...u, e.xmlSelfClosingSpace ? tv : tA, i]);
                                    })(t, e, n);
                                case "reference":
                                    return (function (t, e, n) {
                                        let { CharRef: r, EntityRef: o } = t.getValue();
                                        return r || o;
                                    })(t, 0, 0);
                                default:
                                    throw Error(`Unknown node type: ${r.name}`);
                            }
                        },
                    },
                },
                options: {
                    xmlSelfClosingSpace: { type: "boolean", category: "XML", default: !0, description: "Adds a space before self-closing tags.", since: "1.1.0" },
                    xmlWhitespaceSensitivity: {
                        type: "choice",
                        category: "XML",
                        default: "strict",
                        description: "How to handle whitespaces in XML.",
                        choices: [
                            { value: "strict", description: "Whitespaces are considered sensitive in all elements." },
                            { value: "preserve", description: "Whitespaces within text nodes in XML elements and attributes are considered sensitive." },
                            { value: "ignore", description: "Whitespaces are considered insensitive in all elements." },
                        ],
                        since: "0.6.0",
                    },
                    xmlSortAttributesByKey: { type: "boolean", category: "XML", default: !1, description: "Orders XML attributes by key alphabetically while prioritizing xmlns attributes." },
                    xmlQuoteAttributes: {
                        type: "choice",
                        category: "XML",
                        default: "preserve",
                        description: "How to handle whitespaces in XML.",
                        choices: [
                            { value: "preserve", description: "Quotes in attribute values will be preserved as written." },
                            { value: "single", description: "Quotes in attribute values will be converted to consistent single quotes and other quotes in the string will be escaped." },
                            { value: "double", description: "Quotes in attribute values will be converted to consistent double quotes and other quotes in the string will be escaped." },
                        ],
                    },
                },
                defaultOptions: { printWidth: 80, tabWidth: 2 },
            };
        },
    },
]);




// (self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2717],{90266:function(t,e,n){let{xmlLexer:r}=n(11050),{xmlParser:o}=n(73515);t.exports={parse:function(t){let e=r.tokenize(t);return o.input=e.tokens,{cst:o.document(),tokenVector:e.tokens,lexErrors:e.errors,parseErrors:o.errors}},BaseXmlCstVisitor:o.getBaseCstVisitorConstructor()}},11050:function(t,e,n){let{createToken:r,Lexer:o}=n(12786),i={};function u(t,e){i[t]="string"==typeof e?e:e.source}function a(t,...e){let n="";for(let r=0;r<t.length;r++)if(n+=t[r],r<e.length){let t=e[r];n+=`(?:${t})`}return new RegExp(n)}let s=[],c={};function l(t){let e=r(t);return s.push(e),c[t.name]=e,e}u("NameStartChar","(:|[a-zA-Z]|_|\\u2070-\\u218F|\\u2C00-\\u2FEF|\\u3001-\\uD7FF|\\uF900-\\uFDCF|\\uFDF0-\\uFFFD)"),u("NameChar",a`${i.NameStartChar}|-|\\.|\\d|\\u00B7||[\\u0300-\\u036F]|[\\u203F-\\u2040]`),u("Name",a`${i.NameStartChar}(${i.NameChar})*`);let p=l({name:"Comment",pattern:/<!--(.|\r?\n)*?-->/,line_breaks:!0}),f=l({name:"CData",pattern:/<!\[CDATA\[(.|\r?\n)*?]]>/,line_breaks:!0}),h=l({name:"DocType",pattern:/<!DOCTYPE/,push_mode:"INSIDE"}),D=l({name:"DTD",pattern:/<!.*?>/,group:o.SKIPPED}),d=l({name:"EntityRef",pattern:a`&${i.Name};`}),E=l({name:"CharRef",pattern:/&#\d+;|&#x[a-fA-F0-9]/}),m=l({name:"SEA_WS",pattern:/( |\t|\n|\r\n)+/}),y=l({name:"XMLDeclOpen",pattern:/<\?xml[ \t\r\n]/,push_mode:"INSIDE"}),F=l({name:"SLASH_OPEN",pattern:/<\//,push_mode:"INSIDE"}),C=l({name:"INVALID_SLASH_OPEN",pattern:/<\//,categories:[F]}),g=l({name:"PROCESSING_INSTRUCTION",pattern:a`<\\?${i.Name}.*\\?>`}),v=l({name:"OPEN",pattern:/</,push_mode:"INSIDE"}),T=l({name:"INVALID_OPEN_INSIDE",pattern:/</,categories:[v]}),A=l({name:"TEXT",pattern:/[^<&]+/}),I=l({name:"CLOSE",pattern:/>/,pop_mode:!0}),S=l({name:"SPECIAL_CLOSE",pattern:/\?>/,pop_mode:!0}),R=l({name:"SLASH_CLOSE",pattern:/\/>/,pop_mode:!0}),N=l({name:"SLASH",pattern:/\//}),O=l({name:"STRING",pattern:/"[^<"]*"|'[^<']*'/}),x=l({name:"EQUALS",pattern:/=/}),L=l({name:"Name",pattern:a`${i.Name}`}),k=l({name:"S",pattern:/[ \t\r\n]/,group:o.SKIPPED}),_=new o({defaultMode:"OUTSIDE",modes:{OUTSIDE:[p,f,h,D,d,E,m,y,F,g,v,A],INSIDE:[p,C,T,I,S,R,N,x,O,L,k]}},{positionTracking:"full",ensureOptimizations:!1,lineTerminatorCharacters:["\n"],lineTerminatorsPattern:/\n|\r\n/g});t.exports={xmlLexer:_,tokensDictionary:c}},73515:function(t,e,n){let{CstParser:r,tokenMatcher:o}=n(12786),{tokensDictionary:i}=n(11050);class u extends r{constructor(){super(i,{maxLookahead:1,recoveryEnabled:!0,nodeLocationTracking:"full"}),this.deletionRecoveryEnabled=!0;let t=this;t.RULE("document",()=>{t.OPTION(()=>{t.SUBRULE(t.prolog)}),t.MANY(()=>{t.SUBRULE(t.misc)}),t.OPTION2(()=>{t.SUBRULE(t.docTypeDecl)}),t.MANY2(()=>{t.SUBRULE2(t.misc)}),t.SUBRULE(t.element),t.MANY3(()=>{t.SUBRULE3(t.misc)})}),t.RULE("prolog",()=>{t.CONSUME(i.XMLDeclOpen),t.MANY(()=>{t.SUBRULE(t.attribute)}),t.CONSUME(i.SPECIAL_CLOSE)}),t.RULE("docTypeDecl",()=>{t.CONSUME(i.DocType),t.CONSUME(i.Name),t.OPTION(()=>{t.SUBRULE(t.externalID)}),t.CONSUME(i.CLOSE)}),t.RULE("externalID",()=>{t.OR([{GATE:()=>"SYSTEM"===t.LA(1).image,ALT:()=>{t.CONSUME2(i.Name,{LABEL:"System"}),t.CONSUME(i.STRING,{LABEL:"SystemLiteral"})}},{GATE:()=>"PUBLIC"===t.LA(1).image,ALT:()=>{t.CONSUME3(i.Name,{LABEL:"Public"}),t.CONSUME2(i.STRING,{LABEL:"PubIDLiteral"}),t.CONSUME3(i.STRING,{LABEL:"SystemLiteral"})}}])}),t.RULE("content",()=>{t.MANY(()=>{t.OR([{ALT:()=>t.SUBRULE(t.element)},{ALT:()=>t.SUBRULE(t.chardata)},{ALT:()=>t.SUBRULE(t.reference)},{ALT:()=>t.CONSUME(i.CData)},{ALT:()=>t.CONSUME(i.PROCESSING_INSTRUCTION)},{ALT:()=>t.CONSUME(i.Comment)}])})}),t.RULE("element",()=>{t.CONSUME(i.OPEN);try{this.deletionRecoveryEnabled=!1,t.CONSUME(i.Name)}finally{this.deletionRecoveryEnabled=!0}t.MANY(()=>{t.SUBRULE(t.attribute)}),t.OR([{ALT:()=>{t.CONSUME(i.CLOSE,{LABEL:"START_CLOSE"}),t.SUBRULE(t.content),t.CONSUME(i.SLASH_OPEN),t.CONSUME2(i.Name,{LABEL:"END_NAME"}),t.CONSUME2(i.CLOSE,{LABEL:"END"})}},{ALT:()=>{t.CONSUME(i.SLASH_CLOSE)}}])}),t.RULE("reference",()=>{t.OR([{ALT:()=>t.CONSUME(i.EntityRef)},{ALT:()=>t.CONSUME(i.CharRef)}])}),t.RULE("attribute",()=>{t.CONSUME(i.Name);try{this.deletionRecoveryEnabled=!1,t.CONSUME(i.EQUALS),t.CONSUME(i.STRING)}finally{this.deletionRecoveryEnabled=!0}}),t.RULE("chardata",()=>{t.OR([{ALT:()=>t.CONSUME(i.TEXT)},{ALT:()=>t.CONSUME(i.SEA_WS)}])}),t.RULE("misc",()=>{t.OR([{ALT:()=>t.CONSUME(i.Comment)},{ALT:()=>t.CONSUME(i.PROCESSING_INSTRUCTION)},{ALT:()=>t.CONSUME(i.SEA_WS)}])}),this.performSelfAnalysis()}canRecoverWithSingleTokenDeletion(t){return!1!==this.deletionRecoveryEnabled&&super.canRecoverWithSingleTokenDeletion(t)}findReSyncTokenType(){let t=this.flattenFollowSet(),e=this.LA(1),n=2;for(;;){let r=t.find(t=>o(e,t));if(void 0!==r)return r;e=this.LA(n),n++}}}let a=new u;t.exports={xmlParser:a}},12786:function(t,e,n){"use strict";n.r(e),n.d(e,{Alternation:function(){return tP},Alternative:function(){return tO},CstParser:function(){return nr},EMPTY_ALT:function(){return ne},EOF:function(){return tv},EarlyExitException:function(){return eL},EmbeddedActionsParser:function(){return no},GAstVisitor:function(){return tG},Lexer:function(){return ts},LexerDefinitionErrorType:function(){return y},MismatchedTokenException:function(){return eN},NoViableAltException:function(){return eO},NonTerminal:function(){return tR},NotAllInputParsedException:function(){return ex},Option:function(){return tx},Parser:function(){return nD},ParserDefinitionErrorType:function(){return g},Repetition:function(){return t_},RepetitionMandatory:function(){return tL},RepetitionMandatoryWithSeparator:function(){return tk},RepetitionWithSeparator:function(){return tb},Rule:function(){return tN},Terminal:function(){return tM},VERSION:function(){return v},assignOccurrenceIndices:function(){return eF},clearCache:function(){return nh},createSyntaxDiagramsCode:function(){return ni},createToken:function(){return tC},createTokenInstance:function(){return tT},defaultGrammarResolverErrorProvider:function(){return tJ},defaultGrammarValidatorErrorProvider:function(){return tZ},defaultLexerErrorProvider:function(){return tu},defaultParserErrorProvider:function(){return tq},generateParserFactory:function(){return np},generateParserModule:function(){return nf},isRecognitionException:function(){return eS},resolveGrammar:function(){return em},serializeGrammar:function(){return tB},serializeProduction:function(){return tw},tokenLabel:function(){return tc},tokenMatcher:function(){return tA},tokenName:function(){return tl},validateGrammar:function(){return ey}});var r,o,i,u,a,s,c,l,p,f,h,D,d,E,m,y,F,C,g,v="7.1.1",T=n(75465),A=n(94556),I={},S=new A.RegExpParser;function R(t){var e=t.toString();if(I.hasOwnProperty(e))return I[e];var n=S.pattern(e);return I[e]=n,n}var N=(r=function(t,e){return(r=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),O="Complement Sets are not supported for first char optimization",x='Unable to use "first char" lexer optimizations:\n';function L(t,e,n){var r=Q(t);e[r]=r,!0===n&&function(t,e){var n=String.fromCharCode(t),r=n.toUpperCase();if(r!==n){var o=Q(r.charCodeAt(0));e[o]=o}else{var i=n.toLowerCase();if(i!==n){var o=Q(i.charCodeAt(0));e[o]=o}}}(t,e)}function k(t,e){return(0,T.sE)(t.value,function(t){return"number"==typeof t?(0,T.r3)(e,t):void 0!==(0,T.sE)(e,function(e){return t.from<=e&&e<=t.to})})}var _=function(t){function e(e){var n=t.call(this)||this;return n.targetCharCodes=e,n.found=!1,n}return N(e,t),e.prototype.visitChildren=function(e){if(!0!==this.found){switch(e.type){case"Lookahead":this.visitLookahead(e);return;case"NegativeLookahead":this.visitNegativeLookahead(e);return}t.prototype.visitChildren.call(this,e)}},e.prototype.visitCharacter=function(t){(0,T.r3)(this.targetCharCodes,t.value)&&(this.found=!0)},e.prototype.visitSet=function(t){t.complement?void 0===k(t,this.targetCharCodes)&&(this.found=!0):void 0!==k(t,this.targetCharCodes)&&(this.found=!0)},e}(A.BaseRegExpVisitor);function b(t,e){if(!(e instanceof RegExp))return void 0!==(0,T.sE)(e,function(e){return(0,T.r3)(t,e.charCodeAt(0))});var n=R(e),r=new _(t);return r.visit(n),r.found}var P=(o=function(t,e){return(o=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),M="PATTERN",B="defaultMode",w="modes",U="boolean"==typeof RegExp("(?:)").sticky,j=/[^\\][\$]/,G=/[^\\[][\^]|^\^/;function W(t){var e=t.ignoreCase?"i":"";return RegExp("^(?:"+t.source+")",e)}function V(t){var e=t.ignoreCase?"iy":"y";return RegExp(""+t.source,e)}function K(t){var e=t.PATTERN;if((0,T.Kj)(e))return!1;if((0,T.mf)(e)||(0,T.e$)(e,"exec"))return!0;if((0,T.HD)(e))return!1;throw Error("non exhaustive match")}function H(t){return!!(0,T.HD)(t)&&1===t.length&&t.charCodeAt(0)}var $={test:function(t){for(var e=t.length,n=this.lastIndex;n<e;n++){var r=t.charCodeAt(n);if(10===r)return this.lastIndex=n+1,!0;if(13===r)return 10===t.charCodeAt(n+1)?this.lastIndex=n+2:this.lastIndex=n+1,!0}return!1},lastIndex:0};function Y(t,e){if((0,T.e$)(t,"LINE_BREAKS"))return!1;if((0,T.Kj)(t.PATTERN)){try{b(e,t.PATTERN)}catch(t){return{issue:y.IDENTIFY_TERMINATOR,errMsg:t.message}}return!1}if((0,T.HD)(t.PATTERN))return!1;if(K(t))return{issue:y.CUSTOM_LINE_BREAK};throw Error("non exhaustive match")}function X(t){return(0,T.UI)(t,function(t){return(0,T.HD)(t)&&t.length>0?t.charCodeAt(0):t})}function z(t,e,n){void 0===t[e]?t[e]=[n]:t[e].push(n)}function Q(t){return t<256?t:q[t]}var q=[];function J(t,e){var n=t.tokenTypeIdx;return n===e.tokenTypeIdx||!0===e.isParent&&!0===e.categoryMatchesMap[n]}function Z(t,e){return t.tokenTypeIdx===e.tokenTypeIdx}var tt=1,te={};function tn(t){var e=function(t){for(var e=(0,T.Qw)(t),n=t,r=!0;r;){n=(0,T.oA)((0,T.xH)((0,T.UI)(n,function(t){return t.CATEGORIES})));var o=(0,T.e5)(n,e);e=e.concat(o),(0,T.xb)(o)?r=!1:n=o}return e}(t);(0,T.Ed)(e,function(t){tr(t)||(te[tt]=t,t.tokenTypeIdx=tt++),to(t)&&!(0,T.kJ)(t.CATEGORIES)&&(t.CATEGORIES=[t.CATEGORIES]),to(t)||(t.CATEGORIES=[]),(0,T.e$)(t,"categoryMatches")||(t.categoryMatches=[]),(0,T.e$)(t,"categoryMatchesMap")||(t.categoryMatchesMap={})}),(0,T.Ed)(e,function(t){(function t(e,n){(0,T.Ed)(e,function(t){n.categoryMatchesMap[t.tokenTypeIdx]=!0}),(0,T.Ed)(n.CATEGORIES,function(r){var o=e.concat(n);(0,T.r3)(o,r)||t(o,r)})})([],t)}),(0,T.Ed)(e,function(t){t.categoryMatches=[],(0,T.Ed)(t.categoryMatchesMap,function(e,n){t.categoryMatches.push(te[n].tokenTypeIdx)})}),(0,T.Ed)(e,function(t){t.isParent=t.categoryMatches.length>0})}function tr(t){return(0,T.e$)(t,"tokenTypeIdx")}function to(t){return(0,T.e$)(t,"CATEGORIES")}function ti(t){return(0,T.e$)(t,"tokenTypeIdx")}var tu={buildUnableToPopLexerModeMessage:function(t){return"Unable to pop Lexer Mode after encountering Token ->"+t.image+"<- The Mode Stack is empty"},buildUnexpectedCharactersMessage:function(t,e,n,r,o){return"unexpected character: ->"+t.charAt(e)+"<- at offset: "+e+", skipped "+n+" characters."}};(i=y||(y={}))[i.MISSING_PATTERN=0]="MISSING_PATTERN",i[i.INVALID_PATTERN=1]="INVALID_PATTERN",i[i.EOI_ANCHOR_FOUND=2]="EOI_ANCHOR_FOUND",i[i.UNSUPPORTED_FLAGS_FOUND=3]="UNSUPPORTED_FLAGS_FOUND",i[i.DUPLICATE_PATTERNS_FOUND=4]="DUPLICATE_PATTERNS_FOUND",i[i.INVALID_GROUP_TYPE_FOUND=5]="INVALID_GROUP_TYPE_FOUND",i[i.PUSH_MODE_DOES_NOT_EXIST=6]="PUSH_MODE_DOES_NOT_EXIST",i[i.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE=7]="MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE",i[i.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY=8]="MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY",i[i.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST=9]="MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST",i[i.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED=10]="LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED",i[i.SOI_ANCHOR_FOUND=11]="SOI_ANCHOR_FOUND",i[i.EMPTY_MATCH_PATTERN=12]="EMPTY_MATCH_PATTERN",i[i.NO_LINE_BREAKS_FLAGS=13]="NO_LINE_BREAKS_FLAGS",i[i.UNREACHABLE_PATTERN=14]="UNREACHABLE_PATTERN",i[i.IDENTIFY_TERMINATOR=15]="IDENTIFY_TERMINATOR",i[i.CUSTOM_LINE_BREAK=16]="CUSTOM_LINE_BREAK";var ta={deferDefinitionErrorsHandling:!1,positionTracking:"full",lineTerminatorsPattern:/\n|\r\n?/g,lineTerminatorCharacters:["\n","\r"],ensureOptimizations:!1,safeMode:!1,errorMessageProvider:tu,traceInitPerf:!1,skipValidations:!1};Object.freeze(ta);var ts=function(){function t(t,e){var n=this;if(void 0===e&&(e=ta),this.lexerDefinition=t,this.lexerDefinitionErrors=[],this.lexerDefinitionWarning=[],this.patternIdxToConfig={},this.charCodeToPatternIdxToConfig={},this.modes=[],this.emptyGroups={},this.config=void 0,this.trackStartLines=!0,this.trackEndLines=!0,this.hasCustom=!1,this.canModeBeOptimized={},"boolean"==typeof e)throw Error("The second argument to the Lexer constructor is now an ILexerConfig Object.\na boolean 2nd argument is no longer supported");this.config=(0,T.TS)(ta,e);var r=this.config.traceInitPerf;!0===r?(this.traceInitMaxIdent=1/0,this.traceInitPerf=!0):"number"==typeof r&&(this.traceInitMaxIdent=r,this.traceInitPerf=!0),this.traceInitIndent=-1,this.TRACE_INIT("Lexer Constructor",function(){var r,o=!0;n.TRACE_INIT("Lexer Config handling",function(){if(n.config.lineTerminatorsPattern===ta.lineTerminatorsPattern)n.config.lineTerminatorsPattern=$;else if(n.config.lineTerminatorCharacters===ta.lineTerminatorCharacters)throw Error("Error: Missing <lineTerminatorCharacters> property on the Lexer config.\n	For details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS");if(e.safeMode&&e.ensureOptimizations)throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');n.trackStartLines=/full|onlyStart/i.test(n.config.positionTracking),n.trackEndLines=/full/i.test(n.config.positionTracking),(0,T.kJ)(t)?((r={modes:{}}).modes[B]=(0,T.Qw)(t),r[B]=B):(o=!1,r=(0,T.Cl)(t))}),!1===n.config.skipValidations&&(n.TRACE_INIT("performRuntimeChecks",function(){var t,e;n.lexerDefinitionErrors=n.lexerDefinitionErrors.concat((t=r,n.trackStartLines,n.config.lineTerminatorCharacters,e=[],(0,T.e$)(t,B)||e.push({message:"A MultiMode Lexer cannot be initialized without a <"+B+"> property in its definition\n",type:y.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE}),(0,T.e$)(t,w)||e.push({message:"A MultiMode Lexer cannot be initialized without a <"+w+"> property in its definition\n",type:y.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY}),(0,T.e$)(t,w)&&(0,T.e$)(t,B)&&!(0,T.e$)(t.modes,t.defaultMode)&&e.push({message:"A MultiMode Lexer cannot be initialized with a "+B+": <"+t.defaultMode+">which does not exist\n",type:y.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST}),(0,T.e$)(t,w)&&(0,T.Ed)(t.modes,function(t,n){(0,T.Ed)(t,function(t,r){(0,T.o8)(t)&&e.push({message:"A Lexer cannot be initialized using an undefined Token Type. Mode:<"+n+"> at index: <"+r+">\n",type:y.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED})})}),e))}),n.TRACE_INIT("performWarningRuntimeChecks",function(){var t,e,o,i,u,a,s,c;n.lexerDefinitionWarning=n.lexerDefinitionWarning.concat((t=r,e=n.trackStartLines,o=n.config.lineTerminatorCharacters,i=[],u=!1,a=(0,T.oA)((0,T.xH)((0,T.Q8)(t.modes,function(t){return t}))),s=(0,T.d1)(a,function(t){return t[M]===ts.NA}),c=X(o),e&&(0,T.Ed)(s,function(t){var e=Y(t,c);if(!1!==e){var n={message:function(t,e){if(e.issue===y.IDENTIFY_TERMINATOR)return"Warning: unable to identify line terminator usage in pattern.\n	The problem is in the <"+t.name+"> Token Type\n	 Root cause: "+e.errMsg+".\n	For details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR";if(e.issue===y.CUSTOM_LINE_BREAK)return"Warning: A Custom Token Pattern should specify the <line_breaks> option.\n	The problem is in the <"+t.name+"> Token Type\n	For details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK";throw Error("non exhaustive match")}(t,e),type:e.issue,tokenType:t};i.push(n)}else(0,T.e$)(t,"LINE_BREAKS")?!0===t.LINE_BREAKS&&(u=!0):b(c,t.PATTERN)&&(u=!0)}),e&&!u&&i.push({message:"Warning: No LINE_BREAKS Found.\n	This Lexer has been defined to track line and column information,\n	But none of the Token Types can be identified as matching a line terminator.\n	See https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#LINE_BREAKS \n	for details.",type:y.NO_LINE_BREAKS_FLAGS}),i))})),r.modes=r.modes?r.modes:{},(0,T.Ed)(r.modes,function(t,e){r.modes[e]=(0,T.d1)(t,function(t){return(0,T.o8)(t)})});var i=(0,T.XP)(r.modes);if((0,T.Ed)(r.modes,function(t,r){n.TRACE_INIT("Mode: <"+r+"> processing",function(){if(n.modes.push(r),!1===n.config.skipValidations&&n.TRACE_INIT("validatePatterns",function(){var e,r,o,u,a,s,c,l,p,f,h,D,d,E,m,F,C,g,v,I,S,N;n.lexerDefinitionErrors=n.lexerDefinitionErrors.concat((e=[],a=(0,T.hX)(t,function(t){return!(0,T.e$)(t,M)}),r={errors:(0,T.UI)(a,function(t){return{message:"Token Type: ->"+t.name+"<- missing static 'PATTERN' property",type:y.MISSING_PATTERN,tokenTypes:[t]}}),valid:(0,T.e5)(t,a)},e=e.concat(r.errors),u=(s=r.valid,c=(0,T.hX)(s,function(t){var e=t[M];return!(0,T.Kj)(e)&&!(0,T.mf)(e)&&!(0,T.e$)(e,"exec")&&!(0,T.HD)(e)}),o={errors:(0,T.UI)(c,function(t){return{message:"Token Type: ->"+t.name+"<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",type:y.INVALID_PATTERN,tokenTypes:[t]}}),valid:(0,T.e5)(s,c)}).valid,e=(e=(e=(e=(e=e.concat(o.errors)).concat((l=[],p=(0,T.hX)(u,function(t){return(0,T.Kj)(t[M])}),(l=(l=(l=(l=l.concat((f=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.found=!1,e}return P(e,t),e.prototype.visitEndAnchor=function(t){this.found=!0},e}(A.BaseRegExpVisitor),h=(0,T.hX)(p,function(t){var e=t[M];try{var n=R(e),r=new f;return r.visit(n),r.found}catch(t){return j.test(e.source)}}),(0,T.UI)(h,function(t){return{message:"Unexpected RegExp Anchor Error:\n	Token Type: ->"+t.name+"<- static 'PATTERN' cannot contain end of input anchor '$'\n	See sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.",type:y.EOI_ANCHOR_FOUND,tokenTypes:[t]}})))).concat((D=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.found=!1,e}return P(e,t),e.prototype.visitStartAnchor=function(t){this.found=!0},e}(A.BaseRegExpVisitor),d=(0,T.hX)(p,function(t){var e=t[M];try{var n=R(e),r=new D;return r.visit(n),r.found}catch(t){return G.test(e.source)}}),(0,T.UI)(d,function(t){return{message:"Unexpected RegExp Anchor Error:\n	Token Type: ->"+t.name+"<- static 'PATTERN' cannot contain start of input anchor '^'\n	See https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.",type:y.SOI_ANCHOR_FOUND,tokenTypes:[t]}})))).concat((E=(0,T.hX)(p,function(t){var e=t[M];return e instanceof RegExp&&(e.multiline||e.global)}),(0,T.UI)(E,function(t){return{message:"Token Type: ->"+t.name+"<- static 'PATTERN' may NOT contain global('g') or multiline('m')",type:y.UNSUPPORTED_FLAGS_FOUND,tokenTypes:[t]}})))).concat((m=[],F=(0,T.UI)(p,function(t){return(0,T.u4)(p,function(e,n){return t.PATTERN.source!==n.PATTERN.source||(0,T.r3)(m,n)||n.PATTERN===ts.NA||(m.push(n),e.push(n)),e},[])}),F=(0,T.oA)(F),C=(0,T.hX)(F,function(t){return t.length>1}),(0,T.UI)(C,function(t){var e=(0,T.UI)(t,function(t){return t.name});return{message:"The same RegExp pattern ->"+(0,T.Ps)(t).PATTERN+"<-has been used in all of the following Token Types: "+e.join(", ")+" <-",type:y.DUPLICATE_PATTERNS_FOUND,tokenTypes:t}})))).concat((g=(0,T.hX)(p,function(t){return t[M].test("")}),(0,T.UI)(g,function(t){return{message:"Token Type: ->"+t.name+"<- static 'PATTERN' must not match an empty string",type:y.EMPTY_MATCH_PATTERN,tokenTypes:[t]}})))))).concat((v=(0,T.hX)(u,function(t){if(!(0,T.e$)(t,"GROUP"))return!1;var e=t.GROUP;return e!==ts.SKIPPED&&e!==ts.NA&&!(0,T.HD)(e)}),(0,T.UI)(v,function(t){return{message:"Token Type: ->"+t.name+"<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",type:y.INVALID_GROUP_TYPE_FOUND,tokenTypes:[t]}})))).concat((I=(0,T.hX)(u,function(t){return void 0!==t.PUSH_MODE&&!(0,T.r3)(i,t.PUSH_MODE)}),(0,T.UI)(I,function(t){return{message:"Token Type: ->"+t.name+"<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->"+t.PUSH_MODE+"<-which does not exist",type:y.PUSH_MODE_DOES_NOT_EXIST,tokenTypes:[t]}})))).concat((S=[],N=(0,T.u4)(u,function(t,e,n){var r=e.PATTERN;return r===ts.NA||((0,T.HD)(r)?t.push({str:r,idx:n,tokenType:e}):(0,T.Kj)(r)&&void 0===(0,T.sE)([".","\\","[","]","|","^","$","(",")","?","*","+","{"],function(t){return -1!==r.source.indexOf(t)})&&t.push({str:r.source,idx:n,tokenType:e})),t},[]),(0,T.Ed)(u,function(t,e){(0,T.Ed)(N,function(n){var r=n.str,o=n.idx,i=n.tokenType;if(e<o&&function(t,e){if((0,T.Kj)(e)){var n=e.exec(t);return null!==n&&0===n.index}if((0,T.mf)(e))return e(t,0,[],{});if((0,T.e$)(e,"exec"))return e.exec(t,0,[],{});if("string"==typeof e)return e===t;throw Error("non exhaustive match")}(r,t.PATTERN)){var u="Token: ->"+i.name+"<- can never be matched.\nBecause it appears AFTER the Token Type ->"+t.name+"<-in the lexer's definition.\nSee https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#UNREACHABLE";S.push({message:u,type:y.UNREACHABLE_PATTERN,tokenTypes:[t,i]})}})}),S))))}),(0,T.xb)(n.lexerDefinitionErrors)){var o;tn(t),n.TRACE_INIT("analyzeTokenTypes",function(){var r,i,u,a,s,c,l,p,f,h,D,d,E,m,y,F,C;r={lineTerminatorCharacters:n.config.lineTerminatorCharacters,positionTracking:e.positionTracking,ensureOptimizations:e.ensureOptimizations,safeMode:e.safeMode,tracer:n.TRACE_INIT.bind(n)},(m=(r=(0,T.ce)(r,{useSticky:U,debug:!1,safeMode:!1,positionTracking:"full",lineTerminatorCharacters:["\r","\n"],tracer:function(t,e){return e()}})).tracer)("initCharCodeToOptimizedIndexMap",function(){(function(){if((0,T.xb)(q)){q=Array(65536);for(var t=0;t<65536;t++)q[t]=t>255?255+~~(t/255):t}})()}),m("Reject Lexer.NA",function(){i=(0,T.d1)(t,function(t){return t[M]===ts.NA})}),y=!1,m("Transform Patterns",function(){y=!1,u=(0,T.UI)(i,function(t){var e=t[M];if((0,T.Kj)(e)){var n=e.source;return 1!==n.length||"^"===n||"$"===n||"."===n||e.ignoreCase?2!==n.length||"\\"!==n[0]||(0,T.r3)(["d","D","s","S","t","r","n","t","0","c","b","B","f","v","w","W"],n[1])?r.useSticky?V(e):W(e):n[1]:n}if((0,T.mf)(e))return y=!0,{exec:e};if((0,T.e$)(e,"exec"))return y=!0,e;if("string"==typeof e){if(1===e.length)return e;var o=new RegExp(e.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"));return r.useSticky?V(o):W(o)}throw Error("non exhaustive match")})}),m("misc mapping",function(){a=(0,T.UI)(i,function(t){return t.tokenTypeIdx}),s=(0,T.UI)(i,function(t){var e=t.GROUP;if(e!==ts.SKIPPED){if((0,T.HD)(e))return e;if((0,T.o8)(e))return!1;throw Error("non exhaustive match")}}),c=(0,T.UI)(i,function(t){var e=t.LONGER_ALT;if(e)return(0,T.cq)(i,e)}),l=(0,T.UI)(i,function(t){return t.PUSH_MODE}),p=(0,T.UI)(i,function(t){return(0,T.e$)(t,"POP_MODE")})}),m("Line Terminator Handling",function(){var t=X(r.lineTerminatorCharacters);f=(0,T.UI)(i,function(t){return!1}),"onlyOffset"!==r.positionTracking&&(f=(0,T.UI)(i,function(e){return(0,T.e$)(e,"LINE_BREAKS")?e.LINE_BREAKS:!1===Y(e,t)?b(t,e.PATTERN):void 0}))}),m("Misc Mapping #2",function(){h=(0,T.UI)(i,K),D=(0,T.UI)(u,H),d=(0,T.u4)(i,function(t,e){var n=e.GROUP;return(0,T.HD)(n)&&n!==ts.SKIPPED&&(t[n]=[]),t},{}),E=(0,T.UI)(u,function(t,e){return{pattern:u[e],longerAlt:c[e],canLineTerminator:f[e],isCustom:h[e],short:D[e],group:s[e],push:l[e],pop:p[e],tokenTypeIdx:a[e],tokenType:i[e]}})}),F=!0,C=[],r.safeMode||m("First Char Optimization",function(){C=(0,T.u4)(i,function(t,e,n){if("string"==typeof e.PATTERN){var o;z(t,Q(e.PATTERN.charCodeAt(0)),E[n])}else if((0,T.kJ)(e.START_CHARS_HINT))(0,T.Ed)(e.START_CHARS_HINT,function(e){var r=Q("string"==typeof e?e.charCodeAt(0):e);o!==r&&(o=r,z(t,r,E[n]))});else if((0,T.Kj)(e.PATTERN)){if(e.PATTERN.unicode)F=!1,r.ensureOptimizations&&(0,T.WB)(""+x+"	Unable to analyze < "+e.PATTERN.toString()+" > pattern.\n	The regexp unicode flag is not currently supported by the regexp-to-ast library.\n	This will disable the lexer's first char optimizations.\n	For details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE");else{var i=function(t,e){void 0===e&&(e=!1);try{var n=R(t);return function t(e,n,r){switch(e.type){case"Disjunction":for(var o=0;o<e.value.length;o++)t(e.value[o],n,r);break;case"Alternative":for(var i=e.value,o=0;o<i.length;o++){var u=i[o];switch(u.type){case"EndAnchor":case"GroupBackReference":case"Lookahead":case"NegativeLookahead":case"StartAnchor":case"WordBoundary":case"NonWordBoundary":continue}switch(u.type){case"Character":L(u.value,n,r);break;case"Set":if(!0===u.complement)throw Error(O);(0,T.Ed)(u.value,function(t){if("number"==typeof t)L(t,n,r);else if(!0===r)for(var e=t.from;e<=t.to;e++)L(e,n,r);else{for(var e=t.from;e<=t.to&&e<256;e++)L(e,n,r);if(t.to>=256)for(var o=t.from>=256?t.from:256,i=t.to,u=Q(o),a=Q(i),s=u;s<=a;s++)n[s]=s}});break;case"Group":t(u.value,n,r);break;default:throw Error("Non Exhaustive Match")}var a=void 0!==u.quantifier&&0===u.quantifier.atLeast;if("Group"===u.type&&!1===function t(e){return!!e.quantifier&&0===e.quantifier.atLeast||!!e.value&&((0,T.kJ)(e.value)?(0,T.yW)(e.value,t):t(e.value))}(u)||"Group"!==u.type&&!1===a)break}break;default:throw Error("non exhaustive match!")}return(0,T.VO)(n)}(n.value,{},n.flags.ignoreCase)}catch(n){if(n.message===O)e&&(0,T.rr)(""+x+"	Unable to optimize: < "+t.toString()+" >\n	Complement Sets cannot be automatically optimized.\n	This will disable the lexer's first char optimizations.\n	See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.");else{var r="";e&&(r="\n	This will disable the lexer's first char optimizations.\n	See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details."),(0,T.WB)(x+"\n	Failed parsing: < "+t.toString()+" >\n	Using the regexp-to-ast library version: "+A.VERSION+"\n	Please open an issue at: https://github.com/bd82/regexp-to-ast/issues"+r)}}return[]}(e.PATTERN,r.ensureOptimizations);(0,T.xb)(i)&&(F=!1),(0,T.Ed)(i,function(e){z(t,e,E[n])})}}else r.ensureOptimizations&&(0,T.WB)(""+x+"	TokenType: <"+e.name+"> is using a custom token pattern without providing <start_chars_hint> parameter.\n	This will disable the lexer's first char optimizations.\n	For details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE"),F=!1;return t},[])}),m("ArrayPacking",function(){C=(0,T.X0)(C)}),o={emptyGroups:d,patternIdxToConfig:E,charCodeToPatternIdxToConfig:C,hasCustom:y,canBeOptimized:F}}),n.patternIdxToConfig[r]=o.patternIdxToConfig,n.charCodeToPatternIdxToConfig[r]=o.charCodeToPatternIdxToConfig,n.emptyGroups=(0,T.TS)(n.emptyGroups,o.emptyGroups),n.hasCustom=o.hasCustom||n.hasCustom,n.canModeBeOptimized[r]=o.canBeOptimized}})}),n.defaultMode=r.defaultMode,!(0,T.xb)(n.lexerDefinitionErrors)&&!n.config.deferDefinitionErrorsHandling)throw Error("Errors detected in definition of Lexer:\n"+(0,T.UI)(n.lexerDefinitionErrors,function(t){return t.message}).join("-----------------------\n"));(0,T.Ed)(n.lexerDefinitionWarning,function(t){(0,T.rr)(t.message)}),n.TRACE_INIT("Choosing sub-methods implementations",function(){if(U?(n.chopInput=T.Wd,n.match=n.matchWithTest):(n.updateLastIndex=T.dG,n.match=n.matchWithExec),o&&(n.handleModes=T.dG),!1===n.trackStartLines&&(n.computeNewColumn=T.Wd),!1===n.trackEndLines&&(n.updateTokenEndLineColumnLocation=T.dG),/full/i.test(n.config.positionTracking))n.createTokenInstance=n.createFullToken;else if(/onlyStart/i.test(n.config.positionTracking))n.createTokenInstance=n.createStartOnlyToken;else if(/onlyOffset/i.test(n.config.positionTracking))n.createTokenInstance=n.createOffsetOnlyToken;else throw Error('Invalid <positionTracking> config option: "'+n.config.positionTracking+'"');n.hasCustom?(n.addToken=n.addTokenUsingPush,n.handlePayload=n.handlePayloadWithCustom):(n.addToken=n.addTokenUsingMemberAccess,n.handlePayload=n.handlePayloadNoCustom)}),n.TRACE_INIT("Failed Optimization Warnings",function(){var t=(0,T.u4)(n.canModeBeOptimized,function(t,e,n){return!1===e&&t.push(n),t},[]);if(e.ensureOptimizations&&!(0,T.xb)(t))throw Error("Lexer Modes: < "+t.join(", ")+' > cannot be optimized.\n	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.\n	 Or inspect the console log for details on how to resolve these issues.')}),n.TRACE_INIT("clearRegExpParserCache",function(){I={}}),n.TRACE_INIT("toFastProperties",function(){(0,T.SV)(n)})})}return t.prototype.tokenize=function(t,e){if(void 0===e&&(e=this.defaultMode),!(0,T.xb)(this.lexerDefinitionErrors))throw Error("Unable to Tokenize because Errors detected in definition of Lexer:\n"+(0,T.UI)(this.lexerDefinitionErrors,function(t){return t.message}).join("-----------------------\n"));return this.tokenizeInternal(t,e)},t.prototype.tokenizeInternal=function(t,e){var n,r,o,i,u,a,s,c,l,p,f,h,D,d,E,m,y,F,C=this,g=t,v=g.length,A=0,I=0,S=Array(this.hasCustom?0:Math.floor(t.length/10)),R=[],N=this.trackStartLines?1:void 0,O=this.trackStartLines?1:void 0,x=(n=this.emptyGroups,r={},o=(0,T.XP)(n),(0,T.Ed)(o,function(t){var e=n[t];if((0,T.kJ)(e))r[t]=[];else throw Error("non exhaustive match")}),r),L=this.trackStartLines,k=this.config.lineTerminatorsPattern,_=0,b=[],P=[],M=[],B=[];Object.freeze(B);var w=void 0;function U(){return b}function j(t){var e=P[Q(t)];return void 0===e?B:e}var G=function(t){if(1===M.length&&void 0===t.tokenType.PUSH_MODE){var e=C.config.errorMessageProvider.buildUnableToPopLexerModeMessage(t);R.push({offset:t.startOffset,line:void 0!==t.startLine?t.startLine:void 0,column:void 0!==t.startColumn?t.startColumn:void 0,length:t.image.length,message:e})}else{M.pop();var n=(0,T.Z$)(M);b=C.patternIdxToConfig[n],P=C.charCodeToPatternIdxToConfig[n],_=b.length;var r=C.canModeBeOptimized[n]&&!1===C.config.safeMode;w=P&&r?j:U}};function W(t){M.push(t),P=this.charCodeToPatternIdxToConfig[t],_=(b=this.patternIdxToConfig[t]).length,_=b.length;var e=this.canModeBeOptimized[t]&&!1===this.config.safeMode;w=P&&e?j:U}for(W.call(this,e);A<v;){c=null;var V=g.charCodeAt(A),K=w(V),H=K.length;for(i=0;i<H;i++){var $=(F=K[i]).pattern;l=null;var Y=F.short;if(!1!==Y?V===Y&&(c=$):!0===F.isCustom?null!==(y=$.exec(g,A,S,x))?(c=y[0],void 0!==y.payload&&(l=y.payload)):c=null:(this.updateLastIndex($,A),c=this.match($,t,A)),null!==c){if(void 0!==(s=F.longerAlt)){var X=b[s],z=X.pattern;p=null,!0===X.isCustom?null!==(y=z.exec(g,A,S,x))?(a=y[0],void 0!==y.payload&&(p=y.payload)):a=null:(this.updateLastIndex(z,A),a=this.match(z,t,A)),a&&a.length>c.length&&(c=a,l=p,F=X)}break}}if(null!==c){if(f=c.length,void 0!==(h=F.group)&&(D=F.tokenTypeIdx,d=this.createTokenInstance(c,A,D,F.tokenType,N,O,f),this.handlePayload(d,l),!1===h?I=this.addToken(S,I,d):x[h].push(d)),t=this.chopInput(t,f),A+=f,O=this.computeNewColumn(O,f),!0===L&&!0===F.canLineTerminator){var q=0,J=void 0,Z=void 0;k.lastIndex=0;do!0===(J=k.test(c))&&(Z=k.lastIndex-1,q++);while(!0===J);0!==q&&(N+=q,O=f-Z,this.updateTokenEndLineColumnLocation(d,h,Z,q,N,O,f))}this.handleModes(F,G,W,d)}else{for(var tt=A,te=N,tn=O,tr=!1;!tr&&A<v;)for(g.charCodeAt(A),t=this.chopInput(t,1),A++,u=0;u<_;u++){var to=b[u],$=to.pattern,Y=to.short;if(!1!==Y?g.charCodeAt(A)===Y&&(tr=!0):!0===to.isCustom?tr=null!==$.exec(g,A,S,x):(this.updateLastIndex($,A),tr=null!==$.exec(t)),!0===tr)break}E=A-tt,m=this.config.errorMessageProvider.buildUnexpectedCharactersMessage(g,tt,E,te,tn),R.push({offset:tt,line:te,column:tn,length:E,message:m})}}return this.hasCustom||(S.length=I),{tokens:S,groups:x,errors:R}},t.prototype.handleModes=function(t,e,n,r){if(!0===t.pop){var o=t.push;e(r),void 0!==o&&n.call(this,o)}else void 0!==t.push&&n.call(this,t.push)},t.prototype.chopInput=function(t,e){return t.substring(e)},t.prototype.updateLastIndex=function(t,e){t.lastIndex=e},t.prototype.updateTokenEndLineColumnLocation=function(t,e,n,r,o,i,u){var a,s;void 0===e||(s=(a=n===u-1)?-1:0,1===r&&!0===a||(t.endLine=o+s,t.endColumn=i-1+-s))},t.prototype.computeNewColumn=function(t,e){return t+e},t.prototype.createTokenInstance=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return null},t.prototype.createOffsetOnlyToken=function(t,e,n,r){return{image:t,startOffset:e,tokenTypeIdx:n,tokenType:r}},t.prototype.createStartOnlyToken=function(t,e,n,r,o,i){return{image:t,startOffset:e,startLine:o,startColumn:i,tokenTypeIdx:n,tokenType:r}},t.prototype.createFullToken=function(t,e,n,r,o,i,u){return{image:t,startOffset:e,endOffset:e+u-1,startLine:o,endLine:o,startColumn:i,endColumn:i+u-1,tokenTypeIdx:n,tokenType:r}},t.prototype.addToken=function(t,e,n){return 666},t.prototype.addTokenUsingPush=function(t,e,n){return t.push(n),e},t.prototype.addTokenUsingMemberAccess=function(t,e,n){return t[e]=n,++e},t.prototype.handlePayload=function(t,e){},t.prototype.handlePayloadNoCustom=function(t,e){},t.prototype.handlePayloadWithCustom=function(t,e){null!==e&&(t.payload=e)},t.prototype.match=function(t,e,n){return null},t.prototype.matchWithTest=function(t,e,n){return!0===t.test(e)?e.substring(n,t.lastIndex):null},t.prototype.matchWithExec=function(t,e){var n=t.exec(e);return null!==n?n[0]:n},t.prototype.TRACE_INIT=function(t,e){if(!0!==this.traceInitPerf)return e();this.traceInitIndent++;var n=Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log(n+"--> <"+t+">");var r=(0,T.HT)(e),o=r.time,i=r.value,u=o>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&u(n+"<-- <"+t+"> time: "+o+"ms"),this.traceInitIndent--,i},t.SKIPPED="This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.",t.NA=/NOT_APPLICABLE/,t}();function tc(t){return tp(t)?t.LABEL:t.name}function tl(t){return t.name}function tp(t){return(0,T.HD)(t.LABEL)&&""!==t.LABEL}var tf="categories",th="label",tD="group",td="push_mode",tE="pop_mode",tm="longer_alt",ty="line_breaks",tF="start_chars_hint";function tC(t){return tg(t)}function tg(t){var e=t.pattern,n={};if(n.name=t.name,(0,T.o8)(e)||(n.PATTERN=e),(0,T.e$)(t,"parent"))throw"The parent property is no longer supported.\nSee: https://github.com/SAP/chevrotain/issues/564#issuecomment-349062346 for details.";return(0,T.e$)(t,tf)&&(n.CATEGORIES=t[tf]),tn([n]),(0,T.e$)(t,th)&&(n.LABEL=t[th]),(0,T.e$)(t,tD)&&(n.GROUP=t[tD]),(0,T.e$)(t,tE)&&(n.POP_MODE=t[tE]),(0,T.e$)(t,td)&&(n.PUSH_MODE=t[td]),(0,T.e$)(t,tm)&&(n.LONGER_ALT=t[tm]),(0,T.e$)(t,ty)&&(n.LINE_BREAKS=t[ty]),(0,T.e$)(t,tF)&&(n.START_CHARS_HINT=t[tF]),n}var tv=tg({name:"EOF",pattern:ts.NA});function tT(t,e,n,r,o,i,u,a){return{image:e,startOffset:n,endOffset:r,startLine:o,endLine:i,startColumn:u,endColumn:a,tokenTypeIdx:t.tokenTypeIdx,tokenType:t}}function tA(t,e){return J(t,e)}tn([tv]);var tI=(u=function(t,e){return(u=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}u(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),tS=function(){function t(t){this._definition=t}return Object.defineProperty(t.prototype,"definition",{get:function(){return this._definition},set:function(t){this._definition=t},enumerable:!1,configurable:!0}),t.prototype.accept=function(t){t.visit(this),(0,T.Ed)(this.definition,function(e){e.accept(t)})},t}(),tR=function(t){function e(e){var n=t.call(this,[])||this;return n.idx=1,(0,T.f0)(n,(0,T.ei)(e,function(t){return void 0!==t})),n}return tI(e,t),Object.defineProperty(e.prototype,"definition",{get:function(){return void 0!==this.referencedRule?this.referencedRule.definition:[]},set:function(t){},enumerable:!1,configurable:!0}),e.prototype.accept=function(t){t.visit(this)},e}(tS),tN=function(t){function e(e){var n=t.call(this,e.definition)||this;return n.orgText="",(0,T.f0)(n,(0,T.ei)(e,function(t){return void 0!==t})),n}return tI(e,t),e}(tS),tO=function(t){function e(e){var n=t.call(this,e.definition)||this;return n.ignoreAmbiguities=!1,(0,T.f0)(n,(0,T.ei)(e,function(t){return void 0!==t})),n}return tI(e,t),e}(tS),tx=function(t){function e(e){var n=t.call(this,e.definition)||this;return n.idx=1,(0,T.f0)(n,(0,T.ei)(e,function(t){return void 0!==t})),n}return tI(e,t),e}(tS),tL=function(t){function e(e){var n=t.call(this,e.definition)||this;return n.idx=1,(0,T.f0)(n,(0,T.ei)(e,function(t){return void 0!==t})),n}return tI(e,t),e}(tS),tk=function(t){function e(e){var n=t.call(this,e.definition)||this;return n.idx=1,(0,T.f0)(n,(0,T.ei)(e,function(t){return void 0!==t})),n}return tI(e,t),e}(tS),t_=function(t){function e(e){var n=t.call(this,e.definition)||this;return n.idx=1,(0,T.f0)(n,(0,T.ei)(e,function(t){return void 0!==t})),n}return tI(e,t),e}(tS),tb=function(t){function e(e){var n=t.call(this,e.definition)||this;return n.idx=1,(0,T.f0)(n,(0,T.ei)(e,function(t){return void 0!==t})),n}return tI(e,t),e}(tS),tP=function(t){function e(e){var n=t.call(this,e.definition)||this;return n.idx=1,n.ignoreAmbiguities=!1,n.hasPredicates=!1,(0,T.f0)(n,(0,T.ei)(e,function(t){return void 0!==t})),n}return tI(e,t),Object.defineProperty(e.prototype,"definition",{get:function(){return this._definition},set:function(t){this._definition=t},enumerable:!1,configurable:!0}),e}(tS),tM=function(){function t(t){this.idx=1,(0,T.f0)(this,(0,T.ei)(t,function(t){return void 0!==t}))}return t.prototype.accept=function(t){t.visit(this)},t}();function tB(t){return(0,T.UI)(t,tw)}function tw(t){function e(t){return(0,T.UI)(t,tw)}if(t instanceof tR)return{type:"NonTerminal",name:t.nonTerminalName,idx:t.idx};if(t instanceof tO)return{type:"Alternative",definition:e(t.definition)};if(t instanceof tx)return{type:"Option",idx:t.idx,definition:e(t.definition)};if(t instanceof tL)return{type:"RepetitionMandatory",idx:t.idx,definition:e(t.definition)};if(t instanceof tk)return{type:"RepetitionMandatoryWithSeparator",idx:t.idx,separator:tw(new tM({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof tb)return{type:"RepetitionWithSeparator",idx:t.idx,separator:tw(new tM({terminalType:t.separator})),definition:e(t.definition)};if(t instanceof t_)return{type:"Repetition",idx:t.idx,definition:e(t.definition)};else if(t instanceof tP)return{type:"Alternation",idx:t.idx,definition:e(t.definition)};else if(t instanceof tM){var n={type:"Terminal",name:t.terminalType.name,label:tc(t.terminalType),idx:t.idx},r=t.terminalType.PATTERN;return t.terminalType.PATTERN&&(n.pattern=(0,T.Kj)(r)?r.source:r),n}else if(t instanceof tN)return{type:"Rule",name:t.name,orgText:t.orgText,definition:e(t.definition)};else throw Error("non exhaustive match")}var tU=function(){function t(){}return t.prototype.walk=function(t,e){var n=this;void 0===e&&(e=[]),(0,T.Ed)(t.definition,function(r,o){var i=(0,T.Cw)(t.definition,o+1);if(r instanceof tR)n.walkProdRef(r,i,e);else if(r instanceof tM)n.walkTerminal(r,i,e);else if(r instanceof tO)n.walkFlat(r,i,e);else if(r instanceof tx)n.walkOption(r,i,e);else if(r instanceof tL)n.walkAtLeastOne(r,i,e);else if(r instanceof tk)n.walkAtLeastOneSep(r,i,e);else if(r instanceof tb)n.walkManySep(r,i,e);else if(r instanceof t_)n.walkMany(r,i,e);else if(r instanceof tP)n.walkOr(r,i,e);else throw Error("non exhaustive match")})},t.prototype.walkTerminal=function(t,e,n){},t.prototype.walkProdRef=function(t,e,n){},t.prototype.walkFlat=function(t,e,n){var r=e.concat(n);this.walk(t,r)},t.prototype.walkOption=function(t,e,n){var r=e.concat(n);this.walk(t,r)},t.prototype.walkAtLeastOne=function(t,e,n){var r=[new tx({definition:t.definition})].concat(e,n);this.walk(t,r)},t.prototype.walkAtLeastOneSep=function(t,e,n){var r=tj(t,e,n);this.walk(t,r)},t.prototype.walkMany=function(t,e,n){var r=[new tx({definition:t.definition})].concat(e,n);this.walk(t,r)},t.prototype.walkManySep=function(t,e,n){var r=tj(t,e,n);this.walk(t,r)},t.prototype.walkOr=function(t,e,n){var r=this,o=e.concat(n);(0,T.Ed)(t.definition,function(t){var e=new tO({definition:[t]});r.walk(e,o)})},t}();function tj(t,e,n){return[new tx({definition:[new tM({terminalType:t.separator})].concat(t.definition)})].concat(e,n)}var tG=function(){function t(){}return t.prototype.visit=function(t){switch(t.constructor){case tR:return this.visitNonTerminal(t);case tO:return this.visitAlternative(t);case tx:return this.visitOption(t);case tL:return this.visitRepetitionMandatory(t);case tk:return this.visitRepetitionMandatoryWithSeparator(t);case tb:return this.visitRepetitionWithSeparator(t);case t_:return this.visitRepetition(t);case tP:return this.visitAlternation(t);case tM:return this.visitTerminal(t);case tN:return this.visitRule(t);default:throw Error("non exhaustive match")}},t.prototype.visitNonTerminal=function(t){},t.prototype.visitAlternative=function(t){},t.prototype.visitOption=function(t){},t.prototype.visitRepetition=function(t){},t.prototype.visitRepetitionMandatory=function(t){},t.prototype.visitRepetitionMandatoryWithSeparator=function(t){},t.prototype.visitRepetitionWithSeparator=function(t){},t.prototype.visitAlternation=function(t){},t.prototype.visitTerminal=function(t){},t.prototype.visitRule=function(t){},t}(),tW=(a=function(t,e){return(a=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}a(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});function tV(t,e){return void 0===e&&(e=[]),t instanceof tx||t instanceof t_||t instanceof tb||(t instanceof tP?(0,T.G)(t.definition,function(t){return tV(t,e)}):!(t instanceof tR&&(0,T.r3)(e,t))&&t instanceof tS&&(t instanceof tR&&e.push(t),(0,T.yW)(t.definition,function(t){return tV(t,e)})))}function tK(t){if(t instanceof tR)return"SUBRULE";if(t instanceof tx)return"OPTION";if(t instanceof tP)return"OR";if(t instanceof tL)return"AT_LEAST_ONE";if(t instanceof tk)return"AT_LEAST_ONE_SEP";if(t instanceof tb)return"MANY_SEP";if(t instanceof t_)return"MANY";else if(t instanceof tM)return"CONSUME";else throw Error("non exhaustive match")}var tH=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.separator="-",e.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]},e}return tW(e,t),e.prototype.reset=function(){this.dslMethods={option:[],alternation:[],repetition:[],repetitionWithSeparator:[],repetitionMandatory:[],repetitionMandatoryWithSeparator:[]}},e.prototype.visitTerminal=function(t){var e=t.terminalType.name+this.separator+"Terminal";(0,T.e$)(this.dslMethods,e)||(this.dslMethods[e]=[]),this.dslMethods[e].push(t)},e.prototype.visitNonTerminal=function(t){var e=t.nonTerminalName+this.separator+"Terminal";(0,T.e$)(this.dslMethods,e)||(this.dslMethods[e]=[]),this.dslMethods[e].push(t)},e.prototype.visitOption=function(t){this.dslMethods.option.push(t)},e.prototype.visitRepetitionWithSeparator=function(t){this.dslMethods.repetitionWithSeparator.push(t)},e.prototype.visitRepetitionMandatory=function(t){this.dslMethods.repetitionMandatory.push(t)},e.prototype.visitRepetitionMandatoryWithSeparator=function(t){this.dslMethods.repetitionMandatoryWithSeparator.push(t)},e.prototype.visitRepetition=function(t){this.dslMethods.repetition.push(t)},e.prototype.visitAlternation=function(t){this.dslMethods.alternation.push(t)},e}(tG),t$=new tH;function tY(t){if(t instanceof tR)return tY(t.referencedRule);if(t instanceof tM)return[t.terminalType];if(t instanceof tO||t instanceof tx||t instanceof t_||t instanceof tL||t instanceof tk||t instanceof tb||t instanceof tM||t instanceof tN)return function(t){for(var e,n=[],r=t.definition,o=0,i=r.length>o,u=!0;i&&u;)u=tV(e=r[o]),n=n.concat(tY(e)),o+=1,i=r.length>o;return(0,T.jj)(n)}(t);if(t instanceof tP){var e;return e=(0,T.UI)(t.definition,function(t){return tY(t)}),(0,T.jj)((0,T.xH)(e))}throw Error("non exhaustive match")}var tX="_~IN~_",tz=(s=function(t,e){return(s=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}s(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),tQ=function(t){function e(e){var n=t.call(this)||this;return n.topProd=e,n.follows={},n}return tz(e,t),e.prototype.startWalking=function(){return this.walk(this.topProd),this.follows},e.prototype.walkTerminal=function(t,e,n){},e.prototype.walkProdRef=function(t,e,n){var r,o,i=(r=t.referencedRule,o=t.idx,r.name+o+tX+this.topProd.name),u=tY(new tO({definition:e.concat(n)}));this.follows[i]=u},e}(tU),tq={buildMismatchTokenMessage:function(t){var e=t.expected,n=t.actual;return t.previous,t.ruleName,"Expecting "+(tp(e)?"--> "+tc(e)+" <--":"token of type --> "+e.name+" <--")+" but found --> '"+n.image+"' <--"},buildNotAllInputParsedMessage:function(t){var e=t.firstRedundant;return t.ruleName,"Redundant input, expecting EOF but found: "+e.image},buildNoViableAltMessage:function(t){var e=t.expectedPathsPerAlt,n=t.actual,r=(t.previous,t.customUserDescription);t.ruleName;var o="Expecting: ",i="\nbut found: '"+(0,T.Ps)(n).image+"'";if(r)return o+r+i;var u=(0,T.u4)(e,function(t,e){return t.concat(e)},[]),a=(0,T.UI)(u,function(t){return"["+(0,T.UI)(t,function(t){return tc(t)}).join(", ")+"]"});return o+"one of these possible Token sequences:\n"+(0,T.UI)(a,function(t,e){return"  "+(e+1)+". "+t}).join("\n")+i},buildEarlyExitMessage:function(t){var e=t.expectedIterationPaths,n=t.actual,r=t.customUserDescription;t.ruleName;var o="Expecting: ",i="\nbut found: '"+(0,T.Ps)(n).image+"'";return r?o+r+i:o+"expecting at least one iteration which starts with one of these possible Token sequences::\n  <"+(0,T.UI)(e,function(t){return"["+(0,T.UI)(t,function(t){return tc(t)}).join(",")+"]"}).join(" ,")+">"+i}};Object.freeze(tq);var tJ={buildRuleNotFoundError:function(t,e){return"Invalid grammar, reference to a rule which is not defined: ->"+e.nonTerminalName+"<-\ninside top level rule: ->"+t.name+"<-"}},tZ={buildDuplicateFoundError:function(t,e){var n=t.name,r=(0,T.Ps)(e),o=r.idx,i=tK(r),u=r instanceof tM?r.terminalType.name:r instanceof tR?r.nonTerminalName:"",a="->"+i+(o>0?o:"")+"<- "+(u?"with argument: ->"+u+"<-":"")+"\n                  appears more than once ("+e.length+" times) in the top level rule: ->"+n+"<-.                  \n                  For further details see: https://sap.github.io/chevrotain/docs/FAQ.html#NUMERICAL_SUFFIXES \n                  ";return(a=a.replace(/[ \t]+/g," ")).replace(/\s\s+/g,"\n")},buildNamespaceConflictError:function(t){return"Namespace conflict found in grammar.\nThe grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <"+t.name+">.\nTo resolve this make sure each Terminal and Non-Terminal names are unique\nThis is easy to accomplish by using the convention that Terminal names start with an uppercase letter\nand Non-Terminal names start with a lower case letter."},buildAlternationPrefixAmbiguityError:function(t){var e=(0,T.UI)(t.prefixPath,function(t){return tc(t)}).join(", "),n=0===t.alternation.idx?"":t.alternation.idx;return"Ambiguous alternatives: <"+t.ambiguityIndices.join(" ,")+"> due to common lookahead prefix\n"+("in <OR"+n)+"> inside <"+t.topLevelRule.name+"> Rule,\n<"+e+"> may appears as a prefix path in all these alternatives.\nSee: https://sap.github.io/chevrotain/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX\nFor Further details."},buildAlternationAmbiguityError:function(t){var e=(0,T.UI)(t.prefixPath,function(t){return tc(t)}).join(", "),n=0===t.alternation.idx?"":t.alternation.idx;return"Ambiguous Alternatives Detected: <"+t.ambiguityIndices.join(" ,")+"> in <OR"+n+"> inside <"+t.topLevelRule.name+"> Rule,\n<"+e+"> may appears as a prefix path in all these alternatives.\nSee: https://sap.github.io/chevrotain/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES\nFor Further details."},buildEmptyRepetitionError:function(t){var e=tK(t.repetition);return 0!==t.repetition.idx&&(e+=t.repetition.idx),"The repetition <"+e+"> within Rule <"+t.topLevelRule.name+"> can never consume any tokens.\nThis could lead to an infinite loop."},buildTokenNameError:function(t){return"deprecated"},buildEmptyAlternationError:function(t){return"Ambiguous empty alternative: <"+(t.emptyChoiceIdx+1)+">"+(" in <OR"+t.alternation.idx)+"> inside <"+t.topLevelRule.name+"> Rule.\nOnly the last alternative may be an empty alternative."},buildTooManyAlternativesError:function(t){return"An Alternation cannot have more than 256 alternatives:\n"+("<OR"+t.alternation.idx+"> inside <"+t.topLevelRule.name)+"> Rule.\n has "+(t.alternation.definition.length+1)+" alternatives."},buildLeftRecursionError:function(t){var e=t.topLevelRule.name,n=e+" --> "+T.UI(t.leftRecursionPath,function(t){return t.name}).concat([e]).join(" --> ");return"Left Recursion found in grammar.\nrule: <"+e+"> can be invoked from itself (directly or indirectly)\nwithout consuming any Tokens. The grammar path that causes this is: \n "+n+"\n To fix this refactor your grammar to remove the left recursion.\nsee: https://en.wikipedia.org/wiki/LL_parser#Left_Factoring."},buildInvalidRuleNameError:function(t){return"deprecated"},buildDuplicateRuleNameError:function(t){return"Duplicate definition, rule: ->"+(t.topLevelRule instanceof tN?t.topLevelRule.name:t.topLevelRule)+"<- is already defined in the grammar: ->"+t.grammarName+"<-"}},t0=(c=function(t,e){return(c=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}c(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),t2=function(t){function e(e,n){var r=t.call(this)||this;return r.nameToTopRule=e,r.errMsgProvider=n,r.errors=[],r}return t0(e,t),e.prototype.resolveRefs=function(){var t=this;(0,T.Ed)((0,T.VO)(this.nameToTopRule),function(e){t.currTopLevel=e,e.accept(t)})},e.prototype.visitNonTerminal=function(t){var e=this.nameToTopRule[t.nonTerminalName];if(e)t.referencedRule=e;else{var n=this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel,t);this.errors.push({message:n,type:g.UNRESOLVED_SUBRULE_REF,ruleName:this.currTopLevel.name,unresolvedRefName:t.nonTerminalName})}},e}(tG),t1=(l=function(t,e){return(l=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}l(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),t8=function(t){function e(e,n){var r=t.call(this,e,n)||this;return r.path=n,r.nextTerminalName="",r.nextTerminalOccurrence=0,r.nextTerminalName=r.path.lastTok.name,r.nextTerminalOccurrence=r.path.lastTokOccurrence,r}return t1(e,t),e.prototype.walkTerminal=function(t,e,n){if(this.isAtEndOfPath&&t.terminalType.name===this.nextTerminalName&&t.idx===this.nextTerminalOccurrence&&!this.found){var r=new tO({definition:e.concat(n)});this.possibleTokTypes=tY(r),this.found=!0}},e}(function(t){function e(e,n){var r=t.call(this)||this;return r.topProd=e,r.path=n,r.possibleTokTypes=[],r.nextProductionName="",r.nextProductionOccurrence=0,r.found=!1,r.isAtEndOfPath=!1,r}return t1(e,t),e.prototype.startWalking=function(){if(this.found=!1,this.path.ruleStack[0]!==this.topProd.name)throw Error("The path does not start with the walker's top Rule!");return this.ruleStack=(0,T.Qw)(this.path.ruleStack).reverse(),this.occurrenceStack=(0,T.Qw)(this.path.occurrenceStack).reverse(),this.ruleStack.pop(),this.occurrenceStack.pop(),this.updateExpectedNext(),this.walk(this.topProd),this.possibleTokTypes},e.prototype.walk=function(e,n){void 0===n&&(n=[]),this.found||t.prototype.walk.call(this,e,n)},e.prototype.walkProdRef=function(t,e,n){if(t.referencedRule.name===this.nextProductionName&&t.idx===this.nextProductionOccurrence){var r=e.concat(n);this.updateExpectedNext(),this.walk(t.referencedRule,r)}},e.prototype.updateExpectedNext=function(){(0,T.xb)(this.ruleStack)?(this.nextProductionName="",this.nextProductionOccurrence=0,this.isAtEndOfPath=!0):(this.nextProductionName=this.ruleStack.pop(),this.nextProductionOccurrence=this.occurrenceStack.pop())},e}(tU)),t3=function(t){function e(e,n){var r=t.call(this)||this;return r.topRule=e,r.occurrence=n,r.result={token:void 0,occurrence:void 0,isEndOfRule:void 0},r}return t1(e,t),e.prototype.startWalking=function(){return this.walk(this.topRule),this.result},e}(tU),t6=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return t1(e,t),e.prototype.walkMany=function(e,n,r){if(e.idx===this.occurrence){var o=(0,T.Ps)(n.concat(r));this.result.isEndOfRule=void 0===o,o instanceof tM&&(this.result.token=o.terminalType,this.result.occurrence=o.idx)}else t.prototype.walkMany.call(this,e,n,r)},e}(t3),t7=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return t1(e,t),e.prototype.walkManySep=function(e,n,r){if(e.idx===this.occurrence){var o=(0,T.Ps)(n.concat(r));this.result.isEndOfRule=void 0===o,o instanceof tM&&(this.result.token=o.terminalType,this.result.occurrence=o.idx)}else t.prototype.walkManySep.call(this,e,n,r)},e}(t3),t9=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return t1(e,t),e.prototype.walkAtLeastOne=function(e,n,r){if(e.idx===this.occurrence){var o=(0,T.Ps)(n.concat(r));this.result.isEndOfRule=void 0===o,o instanceof tM&&(this.result.token=o.terminalType,this.result.occurrence=o.idx)}else t.prototype.walkAtLeastOne.call(this,e,n,r)},e}(t3),t4=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return t1(e,t),e.prototype.walkAtLeastOneSep=function(e,n,r){if(e.idx===this.occurrence){var o=(0,T.Ps)(n.concat(r));this.result.isEndOfRule=void 0===o,o instanceof tM&&(this.result.token=o.terminalType,this.result.occurrence=o.idx)}else t.prototype.walkAtLeastOneSep.call(this,e,n,r)},e}(t3);function t5(t,e,n){void 0===n&&(n=[]),n=(0,T.Qw)(n);var r=[],o=0;function i(i){var u=t5(i.concat((0,T.Cw)(t,o+1)),e,n);return r.concat(u)}for(;n.length<e&&o<t.length;){var u=t[o];if(u instanceof tO||u instanceof tR)return i(u.definition);if(u instanceof tx)r=i(u.definition);else if(u instanceof tL){var a=u.definition.concat([new t_({definition:u.definition})]);return i(a)}else if(u instanceof tk){var a=[new tO({definition:u.definition}),new t_({definition:[new tM({terminalType:u.separator})].concat(u.definition)})];return i(a)}else if(u instanceof tb){var a=u.definition.concat([new t_({definition:[new tM({terminalType:u.separator})].concat(u.definition)})]);r=i(a)}else if(u instanceof t_){var a=u.definition.concat([new t_({definition:u.definition})]);r=i(a)}else if(u instanceof tP)return(0,T.Ed)(u.definition,function(t){!1===(0,T.xb)(t.definition)&&(r=i(t.definition))}),r;else if(u instanceof tM)n.push(u.terminalType);else throw Error("non exhaustive match");o++}return r.push({partialPath:n,suffixDef:(0,T.Cw)(t,o)}),r}function et(t,e,n,r){var o="EXIT_NONE_TERMINAL",i=[o],u="EXIT_ALTERNATIVE",a=!1,s=e.length,c=s-r-1,l=[],p=[];for(p.push({idx:-1,def:t,ruleStack:[],occurrenceStack:[]});!(0,T.xb)(p);){var f=p.pop();if(f===u){a&&(0,T.Z$)(p).idx<=c&&p.pop();continue}var h=f.def,D=f.idx,d=f.ruleStack,E=f.occurrenceStack;if(!(0,T.xb)(h)){var m=h[0];if(m===o){var y={idx:D,def:(0,T.Cw)(h),ruleStack:(0,T.j7)(d),occurrenceStack:(0,T.j7)(E)};p.push(y)}else if(m instanceof tM){if(D<s-1){var F=D+1;if(n(e[F],m.terminalType)){var y={idx:F,def:(0,T.Cw)(h),ruleStack:d,occurrenceStack:E};p.push(y)}}else if(D===s-1)l.push({nextTokenType:m.terminalType,nextTokenOccurrence:m.idx,ruleStack:d,occurrenceStack:E}),a=!0;else throw Error("non exhaustive match")}else if(m instanceof tR){var C=(0,T.Qw)(d);C.push(m.nonTerminalName);var g=(0,T.Qw)(E);g.push(m.idx);var y={idx:D,def:m.definition.concat(i,(0,T.Cw)(h)),ruleStack:C,occurrenceStack:g};p.push(y)}else if(m instanceof tx){var v={idx:D,def:(0,T.Cw)(h),ruleStack:d,occurrenceStack:E};p.push(v),p.push(u);var A={idx:D,def:m.definition.concat((0,T.Cw)(h)),ruleStack:d,occurrenceStack:E};p.push(A)}else if(m instanceof tL){var I=new t_({definition:m.definition,idx:m.idx}),S=m.definition.concat([I],(0,T.Cw)(h)),y={idx:D,def:S,ruleStack:d,occurrenceStack:E};p.push(y)}else if(m instanceof tk){var R=new tM({terminalType:m.separator}),I=new t_({definition:[R].concat(m.definition),idx:m.idx}),S=m.definition.concat([I],(0,T.Cw)(h)),y={idx:D,def:S,ruleStack:d,occurrenceStack:E};p.push(y)}else if(m instanceof tb){var v={idx:D,def:(0,T.Cw)(h),ruleStack:d,occurrenceStack:E};p.push(v),p.push(u);var R=new tM({terminalType:m.separator}),N=new t_({definition:[R].concat(m.definition),idx:m.idx}),S=m.definition.concat([N],(0,T.Cw)(h)),A={idx:D,def:S,ruleStack:d,occurrenceStack:E};p.push(A)}else if(m instanceof t_){var v={idx:D,def:(0,T.Cw)(h),ruleStack:d,occurrenceStack:E};p.push(v),p.push(u);var N=new t_({definition:m.definition,idx:m.idx}),S=m.definition.concat([N],(0,T.Cw)(h)),A={idx:D,def:S,ruleStack:d,occurrenceStack:E};p.push(A)}else if(m instanceof tP)for(var O=m.definition.length-1;O>=0;O--){var x={idx:D,def:m.definition[O].definition.concat((0,T.Cw)(h)),ruleStack:d,occurrenceStack:E};p.push(x),p.push(u)}else if(m instanceof tO)p.push({idx:D,def:m.definition.concat((0,T.Cw)(h)),ruleStack:d,occurrenceStack:E});else if(m instanceof tN)p.push(function(t,e,n,r){var o=(0,T.Qw)(n);o.push(t.name);var i=(0,T.Qw)(r);return i.push(1),{idx:e,def:t.definition,ruleStack:o,occurrenceStack:i}}(m,D,d,E));else throw Error("non exhaustive match")}}return l}var ee=(p=function(t,e){return(p=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}p(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});(f=F||(F={}))[f.OPTION=0]="OPTION",f[f.REPETITION=1]="REPETITION",f[f.REPETITION_MANDATORY=2]="REPETITION_MANDATORY",f[f.REPETITION_MANDATORY_WITH_SEPARATOR=3]="REPETITION_MANDATORY_WITH_SEPARATOR",f[f.REPETITION_WITH_SEPARATOR=4]="REPETITION_WITH_SEPARATOR",f[f.ALTERNATION=5]="ALTERNATION";var en=function(t){function e(e,n,r){var o=t.call(this)||this;return o.topProd=e,o.targetOccurrence=n,o.targetProdType=r,o}return ee(e,t),e.prototype.startWalking=function(){return this.walk(this.topProd),this.restDef},e.prototype.checkIsTarget=function(t,e,n,r){return t.idx===this.targetOccurrence&&this.targetProdType===e&&(this.restDef=n.concat(r),!0)},e.prototype.walkOption=function(e,n,r){this.checkIsTarget(e,F.OPTION,n,r)||t.prototype.walkOption.call(this,e,n,r)},e.prototype.walkAtLeastOne=function(e,n,r){this.checkIsTarget(e,F.REPETITION_MANDATORY,n,r)||t.prototype.walkOption.call(this,e,n,r)},e.prototype.walkAtLeastOneSep=function(e,n,r){this.checkIsTarget(e,F.REPETITION_MANDATORY_WITH_SEPARATOR,n,r)||t.prototype.walkOption.call(this,e,n,r)},e.prototype.walkMany=function(e,n,r){this.checkIsTarget(e,F.REPETITION,n,r)||t.prototype.walkOption.call(this,e,n,r)},e.prototype.walkManySep=function(e,n,r){this.checkIsTarget(e,F.REPETITION_WITH_SEPARATOR,n,r)||t.prototype.walkOption.call(this,e,n,r)},e}(tU),er=function(t){function e(e,n,r){var o=t.call(this)||this;return o.targetOccurrence=e,o.targetProdType=n,o.targetRef=r,o.result=[],o}return ee(e,t),e.prototype.checkIsTarget=function(t,e){t.idx===this.targetOccurrence&&this.targetProdType===e&&(void 0===this.targetRef||t===this.targetRef)&&(this.result=t.definition)},e.prototype.visitOption=function(t){this.checkIsTarget(t,F.OPTION)},e.prototype.visitRepetition=function(t){this.checkIsTarget(t,F.REPETITION)},e.prototype.visitRepetitionMandatory=function(t){this.checkIsTarget(t,F.REPETITION_MANDATORY)},e.prototype.visitRepetitionMandatoryWithSeparator=function(t){this.checkIsTarget(t,F.REPETITION_MANDATORY_WITH_SEPARATOR)},e.prototype.visitRepetitionWithSeparator=function(t){this.checkIsTarget(t,F.REPETITION_WITH_SEPARATOR)},e.prototype.visitAlternation=function(t){this.checkIsTarget(t,F.ALTERNATION)},e}(tG);function eo(t){for(var e=Array(t),n=0;n<t;n++)e[n]=[];return e}function ei(t){for(var e=[""],n=0;n<t.length;n++){for(var r=t[n],o=[],i=0;i<e.length;i++){var u=e[i];o.push(u+"_"+r.tokenTypeIdx);for(var a=0;a<r.categoryMatches.length;a++){var s="_"+r.categoryMatches[a];o.push(u+s)}}e=o}return e}function eu(t,e){for(var n=(0,T.UI)(t,function(t){return t5([t],1)}),r=eo(n.length),o=(0,T.UI)(n,function(t){var e={};return(0,T.Ed)(t,function(t){var n=ei(t.partialPath);(0,T.Ed)(n,function(t){e[t]=!0})}),e}),i=n,u=1;u<=e;u++){var a=i;i=eo(a.length);for(var s=function(t){for(var n=a[t],s=0;s<n.length;s++){var c=n[s].partialPath,l=n[s].suffixDef,p=ei(c);if(function(t,e,n){for(var r=0;r<t.length;r++)if(r!==n){for(var o=t[r],i=0;i<e.length;i++)if(!0===o[e[i]])return!1}return!0}(o,p,t)||(0,T.xb)(l)||c.length===e){var f=r[t];if(!1===ec(f,c)){f.push(c);for(var h=0;h<p.length;h++){var D=p[h];o[t][D]=!0}}}else{var d=t5(l,u+1,c);i[t]=i[t].concat(d),(0,T.Ed)(d,function(e){var n=ei(e.partialPath);(0,T.Ed)(n,function(e){o[t][e]=!0})})}}},c=0;c<a.length;c++)s(c)}return r}function ea(t,e,n,r){var o=new er(t,F.ALTERNATION,r);return e.accept(o),eu(o.result,n)}function es(t,e,n,r){var o=new er(t,n);e.accept(o);var i=o.result,u=new en(e,t,n).startWalking();return eu([new tO({definition:i}),new tO({definition:u})],r)}function ec(t,e){t:for(var n=0;n<t.length;n++){var r=t[n];if(r.length===e.length){for(var o=0;o<r.length;o++){var i=e[o],u=r[o];if(!1==(i===u||void 0!==u.categoryMatchesMap[i.tokenTypeIdx]))continue t}return!0}}return!1}function el(t){return(0,T.yW)(t,function(t){return(0,T.yW)(t,function(t){return(0,T.yW)(t,function(t){return(0,T.xb)(t.categoryMatches)})})})}var ep=(h=function(t,e){return(h=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}h(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});function ef(t){return tK(t)+"_#_"+t.idx+"_#_"+eh(t)}function eh(t){return t instanceof tM?t.terminalType.name:t instanceof tR?t.nonTerminalName:""}var eD=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.allProductions=[],e}return ep(e,t),e.prototype.visitNonTerminal=function(t){this.allProductions.push(t)},e.prototype.visitOption=function(t){this.allProductions.push(t)},e.prototype.visitRepetitionWithSeparator=function(t){this.allProductions.push(t)},e.prototype.visitRepetitionMandatory=function(t){this.allProductions.push(t)},e.prototype.visitRepetitionMandatoryWithSeparator=function(t){this.allProductions.push(t)},e.prototype.visitRepetition=function(t){this.allProductions.push(t)},e.prototype.visitAlternation=function(t){this.allProductions.push(t)},e.prototype.visitTerminal=function(t){this.allProductions.push(t)},e}(tG),ed=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.alternations=[],e}return ep(e,t),e.prototype.visitAlternation=function(t){this.alternations.push(t)},e}(tG),eE=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.allProductions=[],e}return ep(e,t),e.prototype.visitRepetitionWithSeparator=function(t){this.allProductions.push(t)},e.prototype.visitRepetitionMandatory=function(t){this.allProductions.push(t)},e.prototype.visitRepetitionMandatoryWithSeparator=function(t){this.allProductions.push(t)},e.prototype.visitRepetition=function(t){this.allProductions.push(t)},e}(tG);function em(t){t=(0,T.ce)(t,{errMsgProvider:tJ});var e,n={};return(0,T.Ed)(t.rules,function(t){n[t.name]=t}),(e=new t2(n,t.errMsgProvider)).resolveRefs(),e.errors}function ey(t){var e,n,r,o,i,u,a,s,c,l,p,f,h,D,d;return e=(t=(0,T.ce)(t,{errMsgProvider:tZ})).rules,n=t.maxLookahead,r=t.tokenTypes,o=t.errMsgProvider,i=t.grammarName,u=T.UI(e,function(t){return function(t,e){var n=new eD;t.accept(n);var r=n.allProductions,o=T.vM(r,ef),i=T.ei(o,function(t){return t.length>1});return T.UI(T.VO(i),function(n){var r=T.Ps(n),o=e.buildDuplicateFoundError(t,n),i=tK(r),u={message:o,type:g.DUPLICATE_PRODUCTIONS,ruleName:t.name,dslName:i,occurrence:r.idx},a=eh(r);return a&&(u.parameter=a),u})}(t,o)}),a=T.UI(e,function(t){return function t(e,n,r,o){void 0===o&&(o=[]);var i=[],u=function t(e){var n=[];if(T.xb(e))return n;var r=T.Ps(e);if(r instanceof tR)n.push(r.referencedRule);else if(r instanceof tO||r instanceof tx||r instanceof tL||r instanceof tk||r instanceof tb||r instanceof t_)n=n.concat(t(r.definition));else if(r instanceof tP)n=T.xH(T.UI(r.definition,function(e){return t(e.definition)}));else if(r instanceof tM);else throw Error("non exhaustive match");var o=tV(r),i=e.length>1;if(!o||!i)return n;var u=T.Cw(e);return n.concat(t(u))}(n.definition);if(T.xb(u))return[];var a=e.name;T.r3(u,e)&&i.push({message:r.buildLeftRecursionError({topLevelRule:e,leftRecursionPath:o}),type:g.LEFT_RECURSION,ruleName:a});var s=T.e5(u,o.concat([e])),c=T.UI(s,function(n){var i=T.Qw(o);return i.push(n),t(e,n,r,i)});return i.concat(T.xH(c))}(t,t,o)}),s=[],c=[],l=[],(0,T.yW)(a,T.xb)&&(s=(0,T.UI)(e,function(t){return function(t,e){var n=new ed;t.accept(n);var r=n.alternations;return T.u4(r,function(n,r){var o=T.j7(r.definition),i=T.UI(o,function(n,o){var i=et([n],[],null,1);return T.xb(i)?{message:e.buildEmptyAlternationError({topLevelRule:t,alternation:r,emptyChoiceIdx:o}),type:g.NONE_LAST_EMPTY_ALT,ruleName:t.name,occurrence:r.idx,alternative:o+1}:null});return n.concat(T.oA(i))},[])}(t,o)}),c=(0,T.UI)(e,function(t){return function(t,e,n){var r=new ed;t.accept(r);var o=r.alternations;return o=(0,T.d1)(o,function(t){return!0===t.ignoreAmbiguities}),T.u4(o,function(r,o){var i,u,a,s,c=ea(o.idx,t,o.maxLookahead||e,o),l=(i=[],u=(0,T.u4)(c,function(t,e,n){return!0===o.definition[n].ignoreAmbiguities||(0,T.Ed)(e,function(e){var r=[n];(0,T.Ed)(c,function(t,i){n!==i&&ec(t,e)&&!0!==o.definition[i].ignoreAmbiguities&&r.push(i)}),r.length>1&&!ec(i,e)&&(i.push(e),t.push({alts:r,path:e}))}),t},[]),T.UI(u,function(e){var r=(0,T.UI)(e.alts,function(t){return t+1});return{message:n.buildAlternationAmbiguityError({topLevelRule:t,alternation:o,ambiguityIndices:r,prefixPath:e.path}),type:g.AMBIGUOUS_ALTS,ruleName:t.name,occurrence:o.idx,alternatives:[e.alts]}})),p=(a=[],s=(0,T.u4)(c,function(t,e,n){var r=(0,T.UI)(e,function(t){return{idx:n,path:t}});return t.concat(r)},[]),(0,T.Ed)(s,function(e){if(!0!==o.definition[e.idx].ignoreAmbiguities){var r=e.idx,i=e.path,u=(0,T.Oq)(s,function(t){var e;return!0!==o.definition[t.idx].ignoreAmbiguities&&t.idx<r&&(e=t.path).length<i.length&&(0,T.yW)(e,function(t,e){var n=i[e];return t===n||n.categoryMatchesMap[t.tokenTypeIdx]})}),c=(0,T.UI)(u,function(e){var i=[e.idx+1,r+1],u=0===o.idx?"":o.idx;return{message:n.buildAlternationPrefixAmbiguityError({topLevelRule:t,alternation:o,ambiguityIndices:i,prefixPath:e.path}),type:g.AMBIGUOUS_PREFIX_ALTS,ruleName:t.name,occurrence:u,alternatives:i}});a=a.concat(c)}}),a);return r.concat(l,p)},[])}(t,n,o)}),h=[],(0,T.Ed)(e,function(t){var e=new eE;t.accept(e);var r=e.allProductions;(0,T.Ed)(r,function(e){var r=function(t){if(t instanceof tx)return F.OPTION;if(t instanceof t_)return F.REPETITION;if(t instanceof tL)return F.REPETITION_MANDATORY;if(t instanceof tk)return F.REPETITION_MANDATORY_WITH_SEPARATOR;if(t instanceof tb)return F.REPETITION_WITH_SEPARATOR;if(t instanceof tP)return F.ALTERNATION;throw Error("non exhaustive match")}(e),i=e.maxLookahead||n,u=es(e.idx,t,r,i)[0];if((0,T.xb)((0,T.xH)(u))){var a=o.buildEmptyRepetitionError({topLevelRule:t,repetition:e});h.push({message:a,type:g.NO_NON_EMPTY_LOOKAHEAD,ruleName:t.name})}})}),l=h),D=[],d=(0,T.UI)(r,function(t){return t.name}),(0,T.Ed)(e,function(t){var e=t.name;if((0,T.r3)(d,e)){var n=o.buildNamespaceConflictError(t);D.push({message:n,type:g.CONFLICT_TOKENS_RULES_NAMESPACE,ruleName:e})}}),p=(0,T.UI)(e,function(t){return function(t,e){var n=new ed;t.accept(n);var r=n.alternations;return T.u4(r,function(n,r){return r.definition.length>255&&n.push({message:e.buildTooManyAlternativesError({topLevelRule:t,alternation:r}),type:g.TOO_MANY_ALTS,ruleName:t.name,occurrence:r.idx}),n},[])}(t,o)}),f=(0,T.UI)(e,function(t){return function(t,e,n,r){var o=[];if((0,T.u4)(e,function(e,n){return n.name===t.name?e+1:e},0)>1){var i=r.buildDuplicateRuleNameError({topLevelRule:t,grammarName:n});o.push({message:i,type:g.DUPLICATE_RULE_NAME,ruleName:t.name})}return o}(t,e,i,o)}),T.xH(u.concat(l,a,s,c,D,p,f))}function eF(t){(0,T.Ed)(t.rules,function(t){var e=new tH;t.accept(e),(0,T.Ed)(e.dslMethods,function(t){(0,T.Ed)(t,function(t,e){t.idx=e+1})})})}var eC=(D=function(t,e){return(D=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}D(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),eg="MismatchedTokenException",ev="NoViableAltException",eT="EarlyExitException",eA="NotAllInputParsedException",eI=[eg,ev,eT,eA];function eS(t){return(0,T.r3)(eI,t.name)}Object.freeze(eI);var eR=function(t){function e(e,n){var r=this.constructor,o=t.call(this,e)||this;return o.token=n,o.resyncedTokens=[],Object.setPrototypeOf(o,r.prototype),Error.captureStackTrace&&Error.captureStackTrace(o,o.constructor),o}return eC(e,t),e}(Error),eN=function(t){function e(e,n,r){var o=t.call(this,e,n)||this;return o.previousToken=r,o.name=eg,o}return eC(e,t),e}(eR),eO=function(t){function e(e,n,r){var o=t.call(this,e,n)||this;return o.previousToken=r,o.name=ev,o}return eC(e,t),e}(eR),ex=function(t){function e(e,n){var r=t.call(this,e,n)||this;return r.name=eA,r}return eC(e,t),e}(eR),eL=function(t){function e(e,n,r){var o=t.call(this,e,n)||this;return o.previousToken=r,o.name=eT,o}return eC(e,t),e}(eR),ek={},e_="InRuleRecoveryException";function eb(t){this.name=e_,this.message=t}eb.prototype=Error.prototype;var eP=function(){function t(){}return t.prototype.initRecoverable=function(t){this.firstAfterRepMap={},this.resyncFollows={},this.recoveryEnabled=(0,T.e$)(t,"recoveryEnabled")?t.recoveryEnabled:e5.recoveryEnabled,this.recoveryEnabled&&(this.attemptInRepetitionRecovery=eM)},t.prototype.getTokenToInsert=function(t){var e=tT(t,"",NaN,NaN,NaN,NaN,NaN,NaN);return e.isInsertedInRecovery=!0,e},t.prototype.canTokenTypeBeInsertedInRecovery=function(t){return!0},t.prototype.tryInRepetitionRecovery=function(t,e,n,r){for(var o=this,i=this.findReSyncTokenType(),u=this.exportLexerState(),a=[],s=!1,c=this.LA(1),l=this.LA(1),p=function(){var t=o.LA(0),e=new eN(o.errorMessageProvider.buildMismatchTokenMessage({expected:r,actual:c,previous:t,ruleName:o.getCurrRuleFullName()}),c,o.LA(0));e.resyncedTokens=(0,T.j7)(a),o.SAVE_ERROR(e)};!s;){if(this.tokenMatcher(l,r)){p();return}if(n.call(this)){p(),t.apply(this,e);return}this.tokenMatcher(l,i)?s=!0:(l=this.SKIP_TOKEN(),this.addToResyncTokens(l,a))}this.importLexerState(u)},t.prototype.shouldInRepetitionRecoveryBeTried=function(t,e,n){return!(!1===n||void 0===t||void 0===e||this.tokenMatcher(this.LA(1),t)||this.isBackTracking()||this.canPerformInRuleRecovery(t,this.getFollowsForInRuleRecovery(t,e)))},t.prototype.getFollowsForInRuleRecovery=function(t,e){var n=this.getCurrentGrammarPath(t,e);return this.getNextPossibleTokenTypes(n)},t.prototype.tryInRuleRecovery=function(t,e){if(this.canRecoverWithSingleTokenInsertion(t,e))return this.getTokenToInsert(t);if(this.canRecoverWithSingleTokenDeletion(t)){var n=this.SKIP_TOKEN();return this.consumeToken(),n}throw new eb("sad sad panda")},t.prototype.canPerformInRuleRecovery=function(t,e){return this.canRecoverWithSingleTokenInsertion(t,e)||this.canRecoverWithSingleTokenDeletion(t)},t.prototype.canRecoverWithSingleTokenInsertion=function(t,e){var n=this;if(!this.canTokenTypeBeInsertedInRecovery(t)||(0,T.xb)(e))return!1;var r=this.LA(1);return void 0!==(0,T.sE)(e,function(t){return n.tokenMatcher(r,t)})},t.prototype.canRecoverWithSingleTokenDeletion=function(t){return this.tokenMatcher(this.LA(2),t)},t.prototype.isInCurrentRuleReSyncSet=function(t){var e=this.getCurrFollowKey(),n=this.getFollowSetFromFollowKey(e);return(0,T.r3)(n,t)},t.prototype.findReSyncTokenType=function(){for(var t=this.flattenFollowSet(),e=this.LA(1),n=2;;){var r=e.tokenType;if((0,T.r3)(t,r))return r;e=this.LA(n),n++}},t.prototype.getCurrFollowKey=function(){if(1===this.RULE_STACK.length)return ek;var t=this.getLastExplicitRuleShortName(),e=this.getLastExplicitRuleOccurrenceIndex(),n=this.getPreviousExplicitRuleShortName();return{ruleName:this.shortRuleNameToFullName(t),idxInCallingRule:e,inRule:this.shortRuleNameToFullName(n)}},t.prototype.buildFullFollowKeyStack=function(){var t=this,e=this.RULE_STACK,n=this.RULE_OCCURRENCE_STACK;return(0,T.UI)(e,function(r,o){return 0===o?ek:{ruleName:t.shortRuleNameToFullName(r),idxInCallingRule:n[o],inRule:t.shortRuleNameToFullName(e[o-1])}})},t.prototype.flattenFollowSet=function(){var t=this,e=(0,T.UI)(this.buildFullFollowKeyStack(),function(e){return t.getFollowSetFromFollowKey(e)});return(0,T.xH)(e)},t.prototype.getFollowSetFromFollowKey=function(t){if(t===ek)return[tv];var e=t.ruleName+t.idxInCallingRule+tX+t.inRule;return this.resyncFollows[e]},t.prototype.addToResyncTokens=function(t,e){return this.tokenMatcher(t,tv)||e.push(t),e},t.prototype.reSyncTo=function(t){for(var e=[],n=this.LA(1);!1===this.tokenMatcher(n,t);)n=this.SKIP_TOKEN(),this.addToResyncTokens(n,e);return(0,T.j7)(e)},t.prototype.attemptInRepetitionRecovery=function(t,e,n,r,o,i,u){},t.prototype.getCurrentGrammarPath=function(t,e){return{ruleStack:this.getHumanReadableRuleStack(),occurrenceStack:(0,T.Qw)(this.RULE_OCCURRENCE_STACK),lastTok:t,lastTokOccurrence:e}},t.prototype.getHumanReadableRuleStack=function(){var t=this;return(0,T.UI)(this.RULE_STACK,function(e){return t.shortRuleNameToFullName(e)})},t}();function eM(t,e,n,r,o,i,u){var a=this.getKeyForAutomaticLookahead(r,o),s=this.firstAfterRepMap[a];if(void 0===s){var c=this.getCurrRuleFullName();s=new i(this.getGAstProductions()[c],o).startWalking(),this.firstAfterRepMap[a]=s}var l=s.token,p=s.occurrence,f=s.isEndOfRule;1===this.RULE_STACK.length&&f&&void 0===l&&(l=tv,p=1),this.shouldInRepetitionRecoveryBeTried(l,p,u)&&this.tryInRepetitionRecovery(t,e,n,l)}var eB=function(){function t(){}return t.prototype.initLooksAhead=function(t){this.dynamicTokensEnabled=(0,T.e$)(t,"dynamicTokensEnabled")?t.dynamicTokensEnabled:e5.dynamicTokensEnabled,this.maxLookahead=(0,T.e$)(t,"maxLookahead")?t.maxLookahead:e5.maxLookahead,this.lookAheadFuncsCache=(0,T.dU)()?new Map:[],(0,T.dU)()?(this.getLaFuncFromCache=this.getLaFuncFromMap,this.setLaFuncCache=this.setLaFuncCacheUsingMap):(this.getLaFuncFromCache=this.getLaFuncFromObj,this.setLaFuncCache=this.setLaFuncUsingObj)},t.prototype.preComputeLookaheadFunctions=function(t){var e=this;(0,T.Ed)(t,function(t){e.TRACE_INIT(t.name+" Rule Lookahead",function(){var n,r=(t$.reset(),t.accept(t$),n=t$.dslMethods,t$.reset(),n),o=r.alternation,i=r.repetition,u=r.option,a=r.repetitionMandatory,s=r.repetitionMandatoryWithSeparator,c=r.repetitionWithSeparator;(0,T.Ed)(o,function(n){var r=0===n.idx?"":n.idx;e.TRACE_INIT(""+tK(n)+r,function(){var r,o,i,u,a,s,c,l,p=(r=n.idx,o=n.maxLookahead||e.maxLookahead,i=n.hasPredicates,u=e.dynamicTokensEnabled,a=e.lookAheadBuilderForAlternatives,c=el(s=ea(r,t,o))?Z:J,a(s,i,c,u)),f=(l=e.fullRuleNameToShort[t.name],256|n.idx|l);e.setLaFuncCache(f,p)})}),(0,T.Ed)(i,function(n){e.computeLookaheadFunc(t,n.idx,768,F.REPETITION,n.maxLookahead,tK(n))}),(0,T.Ed)(u,function(n){e.computeLookaheadFunc(t,n.idx,512,F.OPTION,n.maxLookahead,tK(n))}),(0,T.Ed)(a,function(n){e.computeLookaheadFunc(t,n.idx,1024,F.REPETITION_MANDATORY,n.maxLookahead,tK(n))}),(0,T.Ed)(s,function(n){e.computeLookaheadFunc(t,n.idx,1536,F.REPETITION_MANDATORY_WITH_SEPARATOR,n.maxLookahead,tK(n))}),(0,T.Ed)(c,function(n){e.computeLookaheadFunc(t,n.idx,1280,F.REPETITION_WITH_SEPARATOR,n.maxLookahead,tK(n))})})})},t.prototype.computeLookaheadFunc=function(t,e,n,r,o,i){var u=this;this.TRACE_INIT(""+i+(0===e?"":e),function(){var i,a,s,c,l,p=(i=o||u.maxLookahead,a=u.dynamicTokensEnabled,s=u.lookAheadBuilderForOptional,l=el(c=es(e,t,r,i))?Z:J,s(c[0],l,a)),f=e|n|u.fullRuleNameToShort[t.name];u.setLaFuncCache(f,p)})},t.prototype.lookAheadBuilderForOptional=function(t,e,n){return function(t,e,n){var r=(0,T.yW)(t,function(t){return 1===t.length}),o=t.length;if(!r||n)return function(){e:for(var n=0;n<o;n++){for(var r=t[n],i=r.length,u=0;u<i;u++)if(!1===e(this.LA(u+1),r[u]))continue e;return!0}return!1};var i=(0,T.xH)(t);if(1===i.length&&(0,T.xb)(i[0].categoryMatches)){var u=i[0].tokenTypeIdx;return function(){return this.LA(1).tokenTypeIdx===u}}var a=(0,T.u4)(i,function(t,e,n){return t[e.tokenTypeIdx]=!0,(0,T.Ed)(e.categoryMatches,function(e){t[e]=!0}),t},[]);return function(){return!0===a[this.LA(1).tokenTypeIdx]}}(t,e,n)},t.prototype.lookAheadBuilderForAlternatives=function(t,e,n,r){return function(t,e,n,r){var o=t.length,i=(0,T.yW)(t,function(t){return(0,T.yW)(t,function(t){return 1===t.length})});if(e)return function(e){for(var r=(0,T.UI)(e,function(t){return t.GATE}),i=0;i<o;i++){var u=t[i],a=u.length,s=r[i];if(void 0===s||!1!==s.call(this))e:for(var c=0;c<a;c++){for(var l=u[c],p=l.length,f=0;f<p;f++)if(!1===n(this.LA(f+1),l[f]))continue e;return i}}};if(!i||r)return function(){for(var e=0;e<o;e++){var r=t[e],i=r.length;e:for(var u=0;u<i;u++){for(var a=r[u],s=a.length,c=0;c<s;c++)if(!1===n(this.LA(c+1),a[c]))continue e;return e}}};var u=(0,T.UI)(t,function(t){return(0,T.xH)(t)}),a=(0,T.u4)(u,function(t,e,n){return(0,T.Ed)(e,function(e){(0,T.e$)(t,e.tokenTypeIdx)||(t[e.tokenTypeIdx]=n),(0,T.Ed)(e.categoryMatches,function(e){(0,T.e$)(t,e)||(t[e]=n)})}),t},[]);return function(){return a[this.LA(1).tokenTypeIdx]}}(t,e,n,r)},t.prototype.getKeyForAutomaticLookahead=function(t,e){return e|t|this.getLastExplicitRuleShortName()},t.prototype.getLaFuncFromCache=function(t){},t.prototype.getLaFuncFromMap=function(t){return this.lookAheadFuncsCache.get(t)},t.prototype.getLaFuncFromObj=function(t){return this.lookAheadFuncsCache[t]},t.prototype.setLaFuncCache=function(t,e){},t.prototype.setLaFuncCacheUsingMap=function(t,e){this.lookAheadFuncsCache.set(t,e)},t.prototype.setLaFuncUsingObj=function(t,e){this.lookAheadFuncsCache[t]=e},t}();function ew(t,e){!0===isNaN(t.startOffset)?(t.startOffset=e.startOffset,t.endOffset=e.endOffset):t.endOffset<e.endOffset==!0&&(t.endOffset=e.endOffset)}function eU(t,e){!0===isNaN(t.startOffset)?(t.startOffset=e.startOffset,t.startColumn=e.startColumn,t.startLine=e.startLine,t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine):t.endOffset<e.endOffset==!0&&(t.endOffset=e.endOffset,t.endColumn=e.endColumn,t.endLine=e.endLine)}var ej="name";function eG(t){return t.name||"anonymous"}function eW(t,e){var n=Object.getOwnPropertyDescriptor(t,ej);return(!!(0,T.o8)(n)||!!n.configurable)&&(Object.defineProperty(t,ej,{enumerable:!1,configurable:!0,writable:!1,value:e}),!0)}function eV(t,e){for(var n=(0,T.XP)(t),r=n.length,o=0;o<r;o++)for(var i=t[n[o]],u=i.length,a=0;a<u;a++){var s=i[a];void 0===s.tokenTypeIdx&&this[s.name](s.children,e)}}(d=C||(C={}))[d.REDUNDANT_METHOD=0]="REDUNDANT_METHOD",d[d.MISSING_METHOD=1]="MISSING_METHOD";var eK=["constructor","visit","validateVisitor"],eH=function(){function t(){}return t.prototype.initTreeBuilder=function(t){if(this.CST_STACK=[],this.outputCst=t.outputCst,this.nodeLocationTracking=(0,T.e$)(t,"nodeLocationTracking")?t.nodeLocationTracking:e5.nodeLocationTracking,this.outputCst){if(/full/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=eU,this.setNodeLocationFromNode=eU,this.cstPostRule=T.dG,this.setInitialNodeLocation=this.setInitialNodeLocationFullRecovery):(this.setNodeLocationFromToken=T.dG,this.setNodeLocationFromNode=T.dG,this.cstPostRule=this.cstPostRuleFull,this.setInitialNodeLocation=this.setInitialNodeLocationFullRegular);else if(/onlyOffset/i.test(this.nodeLocationTracking))this.recoveryEnabled?(this.setNodeLocationFromToken=ew,this.setNodeLocationFromNode=ew,this.cstPostRule=T.dG,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRecovery):(this.setNodeLocationFromToken=T.dG,this.setNodeLocationFromNode=T.dG,this.cstPostRule=this.cstPostRuleOnlyOffset,this.setInitialNodeLocation=this.setInitialNodeLocationOnlyOffsetRegular);else if(/none/i.test(this.nodeLocationTracking))this.setNodeLocationFromToken=T.dG,this.setNodeLocationFromNode=T.dG,this.cstPostRule=T.dG,this.setInitialNodeLocation=T.dG;else throw Error('Invalid <nodeLocationTracking> config option: "'+t.nodeLocationTracking+'"')}else this.cstInvocationStateUpdate=T.dG,this.cstFinallyStateUpdate=T.dG,this.cstPostTerminal=T.dG,this.cstPostNonTerminal=T.dG,this.cstPostRule=T.dG},t.prototype.setInitialNodeLocationOnlyOffsetRecovery=function(t){t.location={startOffset:NaN,endOffset:NaN}},t.prototype.setInitialNodeLocationOnlyOffsetRegular=function(t){t.location={startOffset:this.LA(1).startOffset,endOffset:NaN}},t.prototype.setInitialNodeLocationFullRecovery=function(t){t.location={startOffset:NaN,startLine:NaN,startColumn:NaN,endOffset:NaN,endLine:NaN,endColumn:NaN}},t.prototype.setInitialNodeLocationFullRegular=function(t){var e=this.LA(1);t.location={startOffset:e.startOffset,startLine:e.startLine,startColumn:e.startColumn,endOffset:NaN,endLine:NaN,endColumn:NaN}},t.prototype.cstInvocationStateUpdate=function(t,e){var n={name:t,children:{}};this.setInitialNodeLocation(n),this.CST_STACK.push(n)},t.prototype.cstFinallyStateUpdate=function(){this.CST_STACK.pop()},t.prototype.cstPostRuleFull=function(t){var e=this.LA(0),n=t.location;n.startOffset<=e.startOffset==!0?(n.endOffset=e.endOffset,n.endLine=e.endLine,n.endColumn=e.endColumn):(n.startOffset=NaN,n.startLine=NaN,n.startColumn=NaN)},t.prototype.cstPostRuleOnlyOffset=function(t){var e=this.LA(0),n=t.location;n.startOffset<=e.startOffset==!0?n.endOffset=e.endOffset:n.startOffset=NaN},t.prototype.cstPostTerminal=function(t,e){var n=this.CST_STACK[this.CST_STACK.length-1];void 0===n.children[t]?n.children[t]=[e]:n.children[t].push(e),this.setNodeLocationFromToken(n.location,e)},t.prototype.cstPostNonTerminal=function(t,e){var n=this.CST_STACK[this.CST_STACK.length-1];void 0===n.children[e]?n.children[e]=[t]:n.children[e].push(t),this.setNodeLocationFromNode(n.location,t.location)},t.prototype.getBaseCstVisitorConstructor=function(){if((0,T.o8)(this.baseCstVisitorConstructor)){var t,e,n,r=(t=this.className,e=(0,T.XP)(this.gastProductionsCache),eW(n=function(){},t+"BaseSemantics"),n.prototype={visit:function(t,e){if((0,T.kJ)(t)&&(t=t[0]),!(0,T.o8)(t))return this[t.name](t.children,e)},validateVisitor:function(){var t,n,r,o,i=(t=this,n=(0,T.UI)(e,function(e){if(!(0,T.mf)(t[e]))return{msg:"Missing visitor method: <"+e+"> on "+eG(t.constructor)+" CST Visitor.",type:C.MISSING_METHOD,methodName:e}}),r=(0,T.oA)(n),o=function(t,e){var n=[];for(var r in t)!(0,T.mf)(t[r])||(0,T.r3)(eK,r)||(0,T.r3)(e,r)||n.push({msg:"Redundant visitor method: <"+r+"> on "+eG(t.constructor)+" CST Visitor\nThere is no Grammar Rule corresponding to this method's name.\n",type:C.REDUNDANT_METHOD,methodName:r});return n}(this,e),r.concat(o));if(!(0,T.xb)(i)){var u=(0,T.UI)(i,function(t){return t.msg});throw Error("Errors Detected in CST Visitor <"+eG(this.constructor)+">:\n	"+u.join("\n\n").replace(/\n/g,"\n	"))}}},n.prototype.constructor=n,n._RULE_NAMES=e,n);return this.baseCstVisitorConstructor=r,r}return this.baseCstVisitorConstructor},t.prototype.getBaseCstVisitorConstructorWithDefaults=function(){if((0,T.o8)(this.baseCstVisitorWithDefaultsConstructor)){var t,e,n,r,o,i=(t=this.className,e=(0,T.XP)(this.gastProductionsCache),n=this.getBaseCstVisitorConstructor(),eW(r=function(){},t+"BaseSemanticsWithDefaults"),o=Object.create(n.prototype),(0,T.Ed)(e,function(t){o[t]=eV}),r.prototype=o,r.prototype.constructor=r,r);return this.baseCstVisitorWithDefaultsConstructor=i,i}return this.baseCstVisitorWithDefaultsConstructor},t.prototype.getLastExplicitRuleShortName=function(){var t=this.RULE_STACK;return t[t.length-1]},t.prototype.getPreviousExplicitRuleShortName=function(){var t=this.RULE_STACK;return t[t.length-2]},t.prototype.getLastExplicitRuleOccurrenceIndex=function(){var t=this.RULE_OCCURRENCE_STACK;return t[t.length-1]},t}(),e$=function(){function t(){}return t.prototype.initLexerAdapter=function(){this.tokVector=[],this.tokVectorLength=0,this.currIdx=-1},Object.defineProperty(t.prototype,"input",{get:function(){return this.tokVector},set:function(t){if(!0!==this.selfAnalysisDone)throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");this.reset(),this.tokVector=t,this.tokVectorLength=t.length},enumerable:!1,configurable:!0}),t.prototype.SKIP_TOKEN=function(){return this.currIdx<=this.tokVector.length-2?(this.consumeToken(),this.LA(1)):e4},t.prototype.LA=function(t){var e=this.currIdx+t;return e<0||this.tokVectorLength<=e?e4:this.tokVector[e]},t.prototype.consumeToken=function(){this.currIdx++},t.prototype.exportLexerState=function(){return this.currIdx},t.prototype.importLexerState=function(t){this.currIdx=t},t.prototype.resetLexerState=function(){this.currIdx=-1},t.prototype.moveToTerminatedState=function(){this.currIdx=this.tokVector.length-1},t.prototype.getLexerPosition=function(){return this.exportLexerState()},t}(),eY=function(){function t(){}return t.prototype.ACTION=function(t){return t.call(this)},t.prototype.consume=function(t,e,n){return this.consumeInternal(e,t,n)},t.prototype.subrule=function(t,e,n){return this.subruleInternal(e,t,n)},t.prototype.option=function(t,e){return this.optionInternal(e,t)},t.prototype.or=function(t,e){return this.orInternal(e,t)},t.prototype.many=function(t,e){return this.manyInternal(t,e)},t.prototype.atLeastOne=function(t,e){return this.atLeastOneInternal(t,e)},t.prototype.CONSUME=function(t,e){return this.consumeInternal(t,0,e)},t.prototype.CONSUME1=function(t,e){return this.consumeInternal(t,1,e)},t.prototype.CONSUME2=function(t,e){return this.consumeInternal(t,2,e)},t.prototype.CONSUME3=function(t,e){return this.consumeInternal(t,3,e)},t.prototype.CONSUME4=function(t,e){return this.consumeInternal(t,4,e)},t.prototype.CONSUME5=function(t,e){return this.consumeInternal(t,5,e)},t.prototype.CONSUME6=function(t,e){return this.consumeInternal(t,6,e)},t.prototype.CONSUME7=function(t,e){return this.consumeInternal(t,7,e)},t.prototype.CONSUME8=function(t,e){return this.consumeInternal(t,8,e)},t.prototype.CONSUME9=function(t,e){return this.consumeInternal(t,9,e)},t.prototype.SUBRULE=function(t,e){return this.subruleInternal(t,0,e)},t.prototype.SUBRULE1=function(t,e){return this.subruleInternal(t,1,e)},t.prototype.SUBRULE2=function(t,e){return this.subruleInternal(t,2,e)},t.prototype.SUBRULE3=function(t,e){return this.subruleInternal(t,3,e)},t.prototype.SUBRULE4=function(t,e){return this.subruleInternal(t,4,e)},t.prototype.SUBRULE5=function(t,e){return this.subruleInternal(t,5,e)},t.prototype.SUBRULE6=function(t,e){return this.subruleInternal(t,6,e)},t.prototype.SUBRULE7=function(t,e){return this.subruleInternal(t,7,e)},t.prototype.SUBRULE8=function(t,e){return this.subruleInternal(t,8,e)},t.prototype.SUBRULE9=function(t,e){return this.subruleInternal(t,9,e)},t.prototype.OPTION=function(t){return this.optionInternal(t,0)},t.prototype.OPTION1=function(t){return this.optionInternal(t,1)},t.prototype.OPTION2=function(t){return this.optionInternal(t,2)},t.prototype.OPTION3=function(t){return this.optionInternal(t,3)},t.prototype.OPTION4=function(t){return this.optionInternal(t,4)},t.prototype.OPTION5=function(t){return this.optionInternal(t,5)},t.prototype.OPTION6=function(t){return this.optionInternal(t,6)},t.prototype.OPTION7=function(t){return this.optionInternal(t,7)},t.prototype.OPTION8=function(t){return this.optionInternal(t,8)},t.prototype.OPTION9=function(t){return this.optionInternal(t,9)},t.prototype.OR=function(t){return this.orInternal(t,0)},t.prototype.OR1=function(t){return this.orInternal(t,1)},t.prototype.OR2=function(t){return this.orInternal(t,2)},t.prototype.OR3=function(t){return this.orInternal(t,3)},t.prototype.OR4=function(t){return this.orInternal(t,4)},t.prototype.OR5=function(t){return this.orInternal(t,5)},t.prototype.OR6=function(t){return this.orInternal(t,6)},t.prototype.OR7=function(t){return this.orInternal(t,7)},t.prototype.OR8=function(t){return this.orInternal(t,8)},t.prototype.OR9=function(t){return this.orInternal(t,9)},t.prototype.MANY=function(t){this.manyInternal(0,t)},t.prototype.MANY1=function(t){this.manyInternal(1,t)},t.prototype.MANY2=function(t){this.manyInternal(2,t)},t.prototype.MANY3=function(t){this.manyInternal(3,t)},t.prototype.MANY4=function(t){this.manyInternal(4,t)},t.prototype.MANY5=function(t){this.manyInternal(5,t)},t.prototype.MANY6=function(t){this.manyInternal(6,t)},t.prototype.MANY7=function(t){this.manyInternal(7,t)},t.prototype.MANY8=function(t){this.manyInternal(8,t)},t.prototype.MANY9=function(t){this.manyInternal(9,t)},t.prototype.MANY_SEP=function(t){this.manySepFirstInternal(0,t)},t.prototype.MANY_SEP1=function(t){this.manySepFirstInternal(1,t)},t.prototype.MANY_SEP2=function(t){this.manySepFirstInternal(2,t)},t.prototype.MANY_SEP3=function(t){this.manySepFirstInternal(3,t)},t.prototype.MANY_SEP4=function(t){this.manySepFirstInternal(4,t)},t.prototype.MANY_SEP5=function(t){this.manySepFirstInternal(5,t)},t.prototype.MANY_SEP6=function(t){this.manySepFirstInternal(6,t)},t.prototype.MANY_SEP7=function(t){this.manySepFirstInternal(7,t)},t.prototype.MANY_SEP8=function(t){this.manySepFirstInternal(8,t)},t.prototype.MANY_SEP9=function(t){this.manySepFirstInternal(9,t)},t.prototype.AT_LEAST_ONE=function(t){this.atLeastOneInternal(0,t)},t.prototype.AT_LEAST_ONE1=function(t){return this.atLeastOneInternal(1,t)},t.prototype.AT_LEAST_ONE2=function(t){this.atLeastOneInternal(2,t)},t.prototype.AT_LEAST_ONE3=function(t){this.atLeastOneInternal(3,t)},t.prototype.AT_LEAST_ONE4=function(t){this.atLeastOneInternal(4,t)},t.prototype.AT_LEAST_ONE5=function(t){this.atLeastOneInternal(5,t)},t.prototype.AT_LEAST_ONE6=function(t){this.atLeastOneInternal(6,t)},t.prototype.AT_LEAST_ONE7=function(t){this.atLeastOneInternal(7,t)},t.prototype.AT_LEAST_ONE8=function(t){this.atLeastOneInternal(8,t)},t.prototype.AT_LEAST_ONE9=function(t){this.atLeastOneInternal(9,t)},t.prototype.AT_LEAST_ONE_SEP=function(t){this.atLeastOneSepFirstInternal(0,t)},t.prototype.AT_LEAST_ONE_SEP1=function(t){this.atLeastOneSepFirstInternal(1,t)},t.prototype.AT_LEAST_ONE_SEP2=function(t){this.atLeastOneSepFirstInternal(2,t)},t.prototype.AT_LEAST_ONE_SEP3=function(t){this.atLeastOneSepFirstInternal(3,t)},t.prototype.AT_LEAST_ONE_SEP4=function(t){this.atLeastOneSepFirstInternal(4,t)},t.prototype.AT_LEAST_ONE_SEP5=function(t){this.atLeastOneSepFirstInternal(5,t)},t.prototype.AT_LEAST_ONE_SEP6=function(t){this.atLeastOneSepFirstInternal(6,t)},t.prototype.AT_LEAST_ONE_SEP7=function(t){this.atLeastOneSepFirstInternal(7,t)},t.prototype.AT_LEAST_ONE_SEP8=function(t){this.atLeastOneSepFirstInternal(8,t)},t.prototype.AT_LEAST_ONE_SEP9=function(t){this.atLeastOneSepFirstInternal(9,t)},t.prototype.RULE=function(t,e,n){if(void 0===n&&(n=nt),(0,T.r3)(this.definedRulesNames,t)){var r={message:tZ.buildDuplicateRuleNameError({topLevelRule:t,grammarName:this.className}),type:g.DUPLICATE_RULE_NAME,ruleName:t};this.definitionErrors.push(r)}this.definedRulesNames.push(t);var o=this.defineRule(t,e,n);return this[t]=o,o},t.prototype.OVERRIDE_RULE=function(t,e,n){void 0===n&&(n=nt);var r,o,i,u,a=[];a=a.concat((r=this.definedRulesNames,o=this.className,u=[],T.r3(r,t)||(i="Invalid rule override, rule: ->"+t+"<- cannot be overridden in the grammar: ->"+o+"<-as it is not defined in any of the super grammars ",u.push({message:i,type:g.INVALID_RULE_OVERRIDE,ruleName:t})),u)),this.definitionErrors.push.apply(this.definitionErrors,a);var s=this.defineRule(t,e,n);return this[t]=s,s},t.prototype.BACKTRACK=function(t,e){return function(){this.isBackTrackingStack.push(1);var n=this.saveRecogState();try{return t.apply(this,e),!0}catch(t){if(eS(t))return!1;throw t}finally{this.reloadRecogState(n),this.isBackTrackingStack.pop()}}},t.prototype.getGAstProductions=function(){return this.gastProductionsCache},t.prototype.getSerializedGastProductions=function(){return tB((0,T.VO)(this.gastProductionsCache))},t}(),eX=function(){function t(){}return t.prototype.initRecognizerEngine=function(t,e){if(this.className=eG(this.constructor),this.shortRuleNameToFull={},this.fullRuleNameToShort={},this.ruleShortNameIdx=256,this.tokenMatcher=Z,this.definedRulesNames=[],this.tokensMap={},this.isBackTrackingStack=[],this.RULE_STACK=[],this.RULE_OCCURRENCE_STACK=[],this.gastProductionsCache={},(0,T.e$)(e,"serializedGrammar"))throw Error("The Parser's configuration can no longer contain a <serializedGrammar> property.\n	See: https://sap.github.io/chevrotain/docs/changes/BREAKING_CHANGES.html#_6-0-0\n	For Further details.");if((0,T.kJ)(t)){if((0,T.xb)(t))throw Error("A Token Vocabulary cannot be empty.\n	Note that the first argument for the parser constructor\n	is no longer a Token vector (since v4.0).");if("number"==typeof t[0].startOffset)throw Error("The Parser constructor no longer accepts a token vector as the first argument.\n	See: https://sap.github.io/chevrotain/docs/changes/BREAKING_CHANGES.html#_4-0-0\n	For Further details.")}if((0,T.kJ)(t))this.tokensMap=(0,T.u4)(t,function(t,e){return t[e.name]=e,t},{});else if((0,T.e$)(t,"modes")&&(0,T.yW)((0,T.xH)((0,T.VO)(t.modes)),ti)){var n=(0,T.xH)((0,T.VO)(t.modes)),r=(0,T.jj)(n);this.tokensMap=(0,T.u4)(r,function(t,e){return t[e.name]=e,t},{})}else if((0,T.Kn)(t))this.tokensMap=(0,T.Cl)(t);else throw Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");this.tokensMap.EOF=tv;var o=(0,T.yW)((0,T.VO)(t),function(t){return(0,T.xb)(t.categoryMatches)});this.tokenMatcher=o?Z:J,tn((0,T.VO)(this.tokensMap))},t.prototype.defineRule=function(t,e,n){if(this.selfAnalysisDone)throw Error("Grammar rule <"+t+"> may not be defined after the 'performSelfAnalysis' method has been called'\nMake sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.");var r,o=(0,T.e$)(n,"resyncEnabled")?n.resyncEnabled:nt.resyncEnabled,i=(0,T.e$)(n,"recoveryValueFunc")?n.recoveryValueFunc:nt.recoveryValueFunc,u=this.ruleShortNameIdx<<12;function a(t){try{if(!0!==this.outputCst)return e.apply(this,t);e.apply(this,t);var n=this.CST_STACK[this.CST_STACK.length-1];return this.cstPostRule(n),n}catch(t){return this.invokeRuleCatch(t,o,i)}finally{this.ruleFinallyStateUpdate()}}return this.ruleShortNameIdx++,this.shortRuleNameToFull[u]=t,this.fullRuleNameToShort[t]=u,(r=function(e,n){return void 0===e&&(e=0),this.ruleInvocationStateUpdate(u,t,e),a.call(this,n)}).ruleName=t,r.originalGrammarAction=e,r},t.prototype.invokeRuleCatch=function(t,e,n){var r=1===this.RULE_STACK.length,o=e&&!this.isBackTracking()&&this.recoveryEnabled;if(eS(t)){if(o){var i=this.findReSyncTokenType();if(this.isInCurrentRuleReSyncSet(i)){if(t.resyncedTokens=this.reSyncTo(i),!this.outputCst)return n();var u=this.CST_STACK[this.CST_STACK.length-1];return u.recoveredNode=!0,u}if(this.outputCst){var u=this.CST_STACK[this.CST_STACK.length-1];u.recoveredNode=!0,t.partialCstResult=u}throw t}if(r)return this.moveToTerminatedState(),n()}throw t},t.prototype.optionInternal=function(t,e){var n=this.getKeyForAutomaticLookahead(512,e);return this.optionInternalLogic(t,e,n)},t.prototype.optionInternalLogic=function(t,e,n){var r,o,i=this,u=this.getLaFuncFromCache(n);if(void 0!==t.DEF){if(r=t.DEF,void 0!==(o=t.GATE)){var a=u;u=function(){return o.call(i)&&a.call(i)}}}else r=t;if(!0===u.call(this))return r.call(this)},t.prototype.atLeastOneInternal=function(t,e){var n=this.getKeyForAutomaticLookahead(1024,t);return this.atLeastOneInternalLogic(t,e,n)},t.prototype.atLeastOneInternalLogic=function(t,e,n){var r,o,i=this,u=this.getLaFuncFromCache(n);if(void 0!==e.DEF){if(r=e.DEF,void 0!==(o=e.GATE)){var a=u;u=function(){return o.call(i)&&a.call(i)}}}else r=e;if(!0===u.call(this))for(var s=this.doSingleRepetition(r);!0===u.call(this)&&!0===s;)s=this.doSingleRepetition(r);else throw this.raiseEarlyExitException(t,F.REPETITION_MANDATORY,e.ERR_MSG);this.attemptInRepetitionRecovery(this.atLeastOneInternal,[t,e],u,1024,t,t9)},t.prototype.atLeastOneSepFirstInternal=function(t,e){var n=this.getKeyForAutomaticLookahead(1536,t);this.atLeastOneSepFirstInternalLogic(t,e,n)},t.prototype.atLeastOneSepFirstInternalLogic=function(t,e,n){var r=this,o=e.DEF,i=e.SEP;if(!0===this.getLaFuncFromCache(n).call(this)){o.call(this);for(var u=function(){return r.tokenMatcher(r.LA(1),i)};!0===this.tokenMatcher(this.LA(1),i);)this.CONSUME(i),o.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[t,i,u,o,t4],u,1536,t,t4)}else throw this.raiseEarlyExitException(t,F.REPETITION_MANDATORY_WITH_SEPARATOR,e.ERR_MSG)},t.prototype.manyInternal=function(t,e){var n=this.getKeyForAutomaticLookahead(768,t);return this.manyInternalLogic(t,e,n)},t.prototype.manyInternalLogic=function(t,e,n){var r,o,i=this,u=this.getLaFuncFromCache(n);if(void 0!==e.DEF){if(r=e.DEF,void 0!==(o=e.GATE)){var a=u;u=function(){return o.call(i)&&a.call(i)}}}else r=e;for(var s=!0;!0===u.call(this)&&!0===s;)s=this.doSingleRepetition(r);this.attemptInRepetitionRecovery(this.manyInternal,[t,e],u,768,t,t6,s)},t.prototype.manySepFirstInternal=function(t,e){var n=this.getKeyForAutomaticLookahead(1280,t);this.manySepFirstInternalLogic(t,e,n)},t.prototype.manySepFirstInternalLogic=function(t,e,n){var r=this,o=e.DEF,i=e.SEP;if(!0===this.getLaFuncFromCache(n).call(this)){o.call(this);for(var u=function(){return r.tokenMatcher(r.LA(1),i)};!0===this.tokenMatcher(this.LA(1),i);)this.CONSUME(i),o.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[t,i,u,o,t7],u,1280,t,t7)}},t.prototype.repetitionSepSecondInternal=function(t,e,n,r,o){for(;n();)this.CONSUME(e),r.call(this);this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal,[t,e,n,r,o],n,1536,t,o)},t.prototype.doSingleRepetition=function(t){var e=this.getLexerPosition();return t.call(this),this.getLexerPosition()>e},t.prototype.orInternal=function(t,e){var n=this.getKeyForAutomaticLookahead(256,e),r=(0,T.kJ)(t)?t:t.DEF,o=this.getLaFuncFromCache(n).call(this,r);if(void 0!==o)return r[o].ALT.call(this);this.raiseNoAltException(e,t.ERR_MSG)},t.prototype.ruleFinallyStateUpdate=function(){if(this.RULE_STACK.pop(),this.RULE_OCCURRENCE_STACK.pop(),this.cstFinallyStateUpdate(),0===this.RULE_STACK.length&&!1===this.isAtEndOfInput()){var t=this.LA(1),e=this.errorMessageProvider.buildNotAllInputParsedMessage({firstRedundant:t,ruleName:this.getCurrRuleFullName()});this.SAVE_ERROR(new ex(e,t))}},t.prototype.subruleInternal=function(t,e,n){var r;try{var o=void 0!==n?n.ARGS:void 0;return r=t.call(this,e,o),this.cstPostNonTerminal(r,void 0!==n&&void 0!==n.LABEL?n.LABEL:t.ruleName),r}catch(e){this.subruleInternalError(e,n,t.ruleName)}},t.prototype.subruleInternalError=function(t,e,n){throw eS(t)&&void 0!==t.partialCstResult&&(this.cstPostNonTerminal(t.partialCstResult,void 0!==e&&void 0!==e.LABEL?e.LABEL:n),delete t.partialCstResult),t},t.prototype.consumeInternal=function(t,e,n){var r;try{var o=this.LA(1);!0===this.tokenMatcher(o,t)?(this.consumeToken(),r=o):this.consumeInternalError(t,o,n)}catch(n){r=this.consumeInternalRecovery(t,e,n)}return this.cstPostTerminal(void 0!==n&&void 0!==n.LABEL?n.LABEL:t.name,r),r},t.prototype.consumeInternalError=function(t,e,n){var r,o=this.LA(0);throw r=void 0!==n&&n.ERR_MSG?n.ERR_MSG:this.errorMessageProvider.buildMismatchTokenMessage({expected:t,actual:e,previous:o,ruleName:this.getCurrRuleFullName()}),this.SAVE_ERROR(new eN(r,e,o))},t.prototype.consumeInternalRecovery=function(t,e,n){if(this.recoveryEnabled&&"MismatchedTokenException"===n.name&&!this.isBackTracking()){var r=this.getFollowsForInRuleRecovery(t,e);try{return this.tryInRuleRecovery(t,r)}catch(t){if(t.name===e_)throw n;throw t}}else throw n},t.prototype.saveRecogState=function(){var t=this.errors,e=(0,T.Qw)(this.RULE_STACK);return{errors:t,lexerState:this.exportLexerState(),RULE_STACK:e,CST_STACK:this.CST_STACK}},t.prototype.reloadRecogState=function(t){this.errors=t.errors,this.importLexerState(t.lexerState),this.RULE_STACK=t.RULE_STACK},t.prototype.ruleInvocationStateUpdate=function(t,e,n){this.RULE_OCCURRENCE_STACK.push(n),this.RULE_STACK.push(t),this.cstInvocationStateUpdate(e,t)},t.prototype.isBackTracking=function(){return 0!==this.isBackTrackingStack.length},t.prototype.getCurrRuleFullName=function(){var t=this.getLastExplicitRuleShortName();return this.shortRuleNameToFull[t]},t.prototype.shortRuleNameToFullName=function(t){return this.shortRuleNameToFull[t]},t.prototype.isAtEndOfInput=function(){return this.tokenMatcher(this.LA(1),tv)},t.prototype.reset=function(){this.resetLexerState(),this.isBackTrackingStack=[],this.errors=[],this.RULE_STACK=[],this.CST_STACK=[],this.RULE_OCCURRENCE_STACK=[]},t}(),ez=function(){function t(){}return t.prototype.initErrorHandler=function(t){this._errors=[],this.errorMessageProvider=(0,T.e$)(t,"errorMessageProvider")?t.errorMessageProvider:e5.errorMessageProvider},t.prototype.SAVE_ERROR=function(t){if(eS(t))return t.context={ruleStack:this.getHumanReadableRuleStack(),ruleOccurrenceStack:(0,T.Qw)(this.RULE_OCCURRENCE_STACK)},this._errors.push(t),t;throw Error("Trying to save an Error which is not a RecognitionException")},Object.defineProperty(t.prototype,"errors",{get:function(){return(0,T.Qw)(this._errors)},set:function(t){this._errors=t},enumerable:!1,configurable:!0}),t.prototype.raiseEarlyExitException=function(t,e,n){for(var r=this.getCurrRuleFullName(),o=es(t,this.getGAstProductions()[r],e,this.maxLookahead)[0],i=[],u=1;u<=this.maxLookahead;u++)i.push(this.LA(u));var a=this.errorMessageProvider.buildEarlyExitMessage({expectedIterationPaths:o,actual:i,previous:this.LA(0),customUserDescription:n,ruleName:r});throw this.SAVE_ERROR(new eL(a,this.LA(1),this.LA(0)))},t.prototype.raiseNoAltException=function(t,e){for(var n=this.getCurrRuleFullName(),r=ea(t,this.getGAstProductions()[n],this.maxLookahead),o=[],i=1;i<=this.maxLookahead;i++)o.push(this.LA(i));var u=this.LA(0),a=this.errorMessageProvider.buildNoViableAltMessage({expectedPathsPerAlt:r,actual:o,previous:u,customUserDescription:e,ruleName:this.getCurrRuleFullName()});throw this.SAVE_ERROR(new eO(a,this.LA(1),u))},t}(),eQ=function(){function t(){}return t.prototype.initContentAssist=function(){},t.prototype.computeContentAssist=function(t,e){var n=this.gastProductionsCache[t];if((0,T.o8)(n))throw Error("Rule ->"+t+"<- does not exist in this grammar.");return et([n],e,this.tokenMatcher,this.maxLookahead)},t.prototype.getNextPossibleTokenTypes=function(t){var e=(0,T.Ps)(t.ruleStack);return new t8(this.getGAstProductions()[e],t).startWalking()},t}(),eq={description:"This Object indicates the Parser is during Recording Phase"};Object.freeze(eq);var eJ=tg({name:"RECORDING_PHASE_TOKEN",pattern:ts.NA});tn([eJ]);var eZ=tT(eJ,"This IToken indicates the Parser is in Recording Phase\n	See: https://sap.github.io/chevrotain/docs/guide/internals.html#grammar-recording for details",-1,-1,-1,-1,-1,-1);Object.freeze(eZ);var e0={name:"This CSTNode indicates the Parser is in Recording Phase\n	See: https://sap.github.io/chevrotain/docs/guide/internals.html#grammar-recording for details",children:{}},e2=function(){function t(){}return t.prototype.initGastRecorder=function(t){this.recordingProdStack=[],this.RECORDING_PHASE=!1},t.prototype.enableRecording=function(){var t=this;this.RECORDING_PHASE=!0,this.TRACE_INIT("Enable Recording",function(){for(var e=function(e){var n=e>0?e:"";t["CONSUME"+n]=function(t,n){return this.consumeInternalRecord(t,e,n)},t["SUBRULE"+n]=function(t,n){return this.subruleInternalRecord(t,e,n)},t["OPTION"+n]=function(t){return this.optionInternalRecord(t,e)},t["OR"+n]=function(t){return this.orInternalRecord(t,e)},t["MANY"+n]=function(t){this.manyInternalRecord(e,t)},t["MANY_SEP"+n]=function(t){this.manySepFirstInternalRecord(e,t)},t["AT_LEAST_ONE"+n]=function(t){this.atLeastOneInternalRecord(e,t)},t["AT_LEAST_ONE_SEP"+n]=function(t){this.atLeastOneSepFirstInternalRecord(e,t)}},n=0;n<10;n++)e(n);t.consume=function(t,e,n){return this.consumeInternalRecord(e,t,n)},t.subrule=function(t,e,n){return this.subruleInternalRecord(e,t,n)},t.option=function(t,e){return this.optionInternalRecord(e,t)},t.or=function(t,e){return this.orInternalRecord(e,t)},t.many=function(t,e){this.manyInternalRecord(t,e)},t.atLeastOne=function(t,e){this.atLeastOneInternalRecord(t,e)},t.ACTION=t.ACTION_RECORD,t.BACKTRACK=t.BACKTRACK_RECORD,t.LA=t.LA_RECORD})},t.prototype.disableRecording=function(){var t=this;this.RECORDING_PHASE=!1,this.TRACE_INIT("Deleting Recording methods",function(){for(var e=0;e<10;e++){var n=e>0?e:"";delete t["CONSUME"+n],delete t["SUBRULE"+n],delete t["OPTION"+n],delete t["OR"+n],delete t["MANY"+n],delete t["MANY_SEP"+n],delete t["AT_LEAST_ONE"+n],delete t["AT_LEAST_ONE_SEP"+n]}delete t.consume,delete t.subrule,delete t.option,delete t.or,delete t.many,delete t.atLeastOne,delete t.ACTION,delete t.BACKTRACK,delete t.LA})},t.prototype.ACTION_RECORD=function(t){},t.prototype.BACKTRACK_RECORD=function(t,e){return function(){return!0}},t.prototype.LA_RECORD=function(t){return e4},t.prototype.topLevelRuleRecord=function(t,e){try{var n=new tN({definition:[],name:t});return n.name=t,this.recordingProdStack.push(n),e.call(this),this.recordingProdStack.pop(),n}catch(t){if(!0!==t.KNOWN_RECORDER_ERROR)try{t.message=t.message+'\n	 This error was thrown during the "grammar recording phase" For more info see:\n	https://sap.github.io/chevrotain/docs/guide/internals.html#grammar-recording'}catch(t){}throw t}},t.prototype.optionInternalRecord=function(t,e){return e1.call(this,tx,t,e)},t.prototype.atLeastOneInternalRecord=function(t,e){e1.call(this,tL,e,t)},t.prototype.atLeastOneSepFirstInternalRecord=function(t,e){e1.call(this,tk,e,t,!0)},t.prototype.manyInternalRecord=function(t,e){e1.call(this,t_,e,t)},t.prototype.manySepFirstInternalRecord=function(t,e){e1.call(this,tb,e,t,!0)},t.prototype.orInternalRecord=function(t,e){return e8.call(this,t,e)},t.prototype.subruleInternalRecord=function(t,e,n){if(e6(e),!t||!1===(0,T.e$)(t,"ruleName")){var r=Error("<SUBRULE"+e3(e)+"> argument is invalid expecting a Parser method reference but got: <"+JSON.stringify(t)+">\n inside top level rule: <"+this.recordingProdStack[0].name+">");throw r.KNOWN_RECORDER_ERROR=!0,r}var o=(0,T.fj)(this.recordingProdStack),i=new tR({idx:e,nonTerminalName:t.ruleName,referencedRule:void 0});return o.definition.push(i),this.outputCst?e0:eq},t.prototype.consumeInternalRecord=function(t,e,n){if(e6(e),!tr(t)){var r=Error("<CONSUME"+e3(e)+"> argument is invalid expecting a TokenType reference but got: <"+JSON.stringify(t)+">\n inside top level rule: <"+this.recordingProdStack[0].name+">");throw r.KNOWN_RECORDER_ERROR=!0,r}var o=(0,T.fj)(this.recordingProdStack),i=new tM({idx:e,terminalType:t});return o.definition.push(i),eZ},t}();function e1(t,e,n,r){void 0===r&&(r=!1),e6(n);var o=(0,T.fj)(this.recordingProdStack),i=(0,T.mf)(e)?e:e.DEF,u=new t({definition:[],idx:n});return r&&(u.separator=e.SEP),(0,T.e$)(e,"MAX_LOOKAHEAD")&&(u.maxLookahead=e.MAX_LOOKAHEAD),this.recordingProdStack.push(u),i.call(this),o.definition.push(u),this.recordingProdStack.pop(),eq}function e8(t,e){var n=this;e6(e);var r=(0,T.fj)(this.recordingProdStack),o=!1===(0,T.kJ)(t),i=!1===o?t:t.DEF,u=new tP({definition:[],idx:e,ignoreAmbiguities:o&&!0===t.IGNORE_AMBIGUITIES});(0,T.e$)(t,"MAX_LOOKAHEAD")&&(u.maxLookahead=t.MAX_LOOKAHEAD);var a=(0,T.G)(i,function(t){return(0,T.mf)(t.GATE)});return u.hasPredicates=a,r.definition.push(u),(0,T.Ed)(i,function(t){var e=new tO({definition:[]});u.definition.push(e),(0,T.e$)(t,"IGNORE_AMBIGUITIES")?e.ignoreAmbiguities=t.IGNORE_AMBIGUITIES:(0,T.e$)(t,"GATE")&&(e.ignoreAmbiguities=!0),n.recordingProdStack.push(e),t.ALT.call(n),n.recordingProdStack.pop()}),eq}function e3(t){return 0===t?"":""+t}function e6(t){if(t<0||t>255){var e=Error("Invalid DSL Method idx value: <"+t+">\n	Idx value must be a none negative value smaller than 256");throw e.KNOWN_RECORDER_ERROR=!0,e}}var e7=function(){function t(){}return t.prototype.initPerformanceTracer=function(t){if((0,T.e$)(t,"traceInitPerf")){var e=t.traceInitPerf,n="number"==typeof e;this.traceInitMaxIdent=n?e:1/0,this.traceInitPerf=n?e>0:e}else this.traceInitMaxIdent=0,this.traceInitPerf=e5.traceInitPerf;this.traceInitIndent=-1},t.prototype.TRACE_INIT=function(t,e){if(!0!==this.traceInitPerf)return e();this.traceInitIndent++;var n=Array(this.traceInitIndent+1).join("	");this.traceInitIndent<this.traceInitMaxIdent&&console.log(n+"--> <"+t+">");var r=(0,T.HT)(e),o=r.time,i=r.value,u=o>10?console.warn:console.log;return this.traceInitIndent<this.traceInitMaxIdent&&u(n+"<-- <"+t+"> time: "+o+"ms"),this.traceInitIndent--,i},t}(),e9=(E=function(t,e){return(E=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}E(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),e4=tT(tv,"",NaN,NaN,NaN,NaN,NaN,NaN);Object.freeze(e4);var e5=Object.freeze({recoveryEnabled:!1,maxLookahead:3,dynamicTokensEnabled:!1,outputCst:!0,errorMessageProvider:tq,nodeLocationTracking:"none",traceInitPerf:!1,skipValidations:!1}),nt=Object.freeze({recoveryValueFunc:function(){},resyncEnabled:!0});function ne(t){return void 0===t&&(t=void 0),function(){return t}}(m=g||(g={}))[m.INVALID_RULE_NAME=0]="INVALID_RULE_NAME",m[m.DUPLICATE_RULE_NAME=1]="DUPLICATE_RULE_NAME",m[m.INVALID_RULE_OVERRIDE=2]="INVALID_RULE_OVERRIDE",m[m.DUPLICATE_PRODUCTIONS=3]="DUPLICATE_PRODUCTIONS",m[m.UNRESOLVED_SUBRULE_REF=4]="UNRESOLVED_SUBRULE_REF",m[m.LEFT_RECURSION=5]="LEFT_RECURSION",m[m.NONE_LAST_EMPTY_ALT=6]="NONE_LAST_EMPTY_ALT",m[m.AMBIGUOUS_ALTS=7]="AMBIGUOUS_ALTS",m[m.CONFLICT_TOKENS_RULES_NAMESPACE=8]="CONFLICT_TOKENS_RULES_NAMESPACE",m[m.INVALID_TOKEN_NAME=9]="INVALID_TOKEN_NAME",m[m.NO_NON_EMPTY_LOOKAHEAD=10]="NO_NON_EMPTY_LOOKAHEAD",m[m.AMBIGUOUS_PREFIX_ALTS=11]="AMBIGUOUS_PREFIX_ALTS",m[m.TOO_MANY_ALTS=12]="TOO_MANY_ALTS";var nn=function(){function t(t,e){if(this.definitionErrors=[],this.selfAnalysisDone=!1,this.initErrorHandler(e),this.initLexerAdapter(),this.initLooksAhead(e),this.initRecognizerEngine(t,e),this.initRecoverable(e),this.initTreeBuilder(e),this.initContentAssist(),this.initGastRecorder(e),this.initPerformanceTracer(e),(0,T.e$)(e,"ignoredIssues"))throw Error("The <ignoredIssues> IParserConfig property has been deprecated.\n	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.\n	See: https://sap.github.io/chevrotain/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES\n	For further details.");this.skipValidations=(0,T.e$)(e,"skipValidations")?e.skipValidations:e5.skipValidations}return t.performSelfAnalysis=function(t){throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.")},t.prototype.performSelfAnalysis=function(){var e=this;this.TRACE_INIT("performSelfAnalysis",function(){e.selfAnalysisDone=!0;var n=e.className;e.TRACE_INIT("toFastProps",function(){(0,T.SV)(e)}),e.TRACE_INIT("Grammar Recording",function(){try{e.enableRecording(),(0,T.Ed)(e.definedRulesNames,function(t){var n=e[t].originalGrammarAction,r=void 0;e.TRACE_INIT(t+" Rule",function(){r=e.topLevelRuleRecord(t,n)}),e.gastProductionsCache[t]=r})}finally{e.disableRecording()}});var r=[];if(e.TRACE_INIT("Grammar Resolving",function(){r=em({rules:(0,T.VO)(e.gastProductionsCache)}),e.definitionErrors.push.apply(e.definitionErrors,r)}),e.TRACE_INIT("Grammar Validations",function(){if((0,T.xb)(r)&&!1===e.skipValidations){var t=ey({rules:(0,T.VO)(e.gastProductionsCache),maxLookahead:e.maxLookahead,tokenTypes:(0,T.VO)(e.tokensMap),errMsgProvider:tZ,grammarName:n});e.definitionErrors.push.apply(e.definitionErrors,t)}}),(0,T.xb)(e.definitionErrors)&&(e.recoveryEnabled&&e.TRACE_INIT("computeAllProdsFollows",function(){var t,n,r=(t=(0,T.VO)(e.gastProductionsCache),n={},(0,T.Ed)(t,function(t){var e=new tQ(t).startWalking();(0,T.f0)(n,e)}),n);e.resyncFollows=r}),e.TRACE_INIT("ComputeLookaheadFunctions",function(){e.preComputeLookaheadFunctions((0,T.VO)(e.gastProductionsCache))})),!t.DEFER_DEFINITION_ERRORS_HANDLING&&!(0,T.xb)(e.definitionErrors))throw Error("Parser Definition Errors detected:\n "+(0,T.UI)(e.definitionErrors,function(t){return t.message}).join("\n-------------------------------\n"))})},t.DEFER_DEFINITION_ERRORS_HANDLING=!1,t}();(0,T.ef)(nn,[eP,eB,eH,e$,eX,eY,ez,eQ,e2,e7]);var nr=function(t){function e(e,n){void 0===n&&(n=e5);var r=(0,T.Cl)(n);return r.outputCst=!0,t.call(this,e,r)||this}return e9(e,t),e}(nn),no=function(t){function e(e,n){void 0===n&&(n=e5);var r=(0,T.Cl)(n);return r.outputCst=!1,t.call(this,e,r)||this}return e9(e,t),e}(nn);function ni(t,e){var n=void 0===e?{}:e,r=n.resourceBase,o=void 0===r?"https://unpkg.com/chevrotain@"+v+"/diagrams/":r,i=n.css;return"\n<!-- This is a generated file -->\n<!DOCTYPE html>\n<meta charset=\"utf-8\">\n<style>\n  body {\n    background-color: hsl(30, 20%, 95%)\n  }\n</style>\n\n\n<link rel='stylesheet' href='"+(void 0===i?"https://unpkg.com/chevrotain@"+v+"/diagrams/diagrams.css":i)+"'>\n"+("\n<script src='"+o+"vendor/railroad-diagrams.js'></script>\n<script src='"+o+"src/diagrams_builder.js'></script>\n<script src='"+o)+"src/diagrams_behavior.js'></script>\n<script src='"+o+'src/main.js\'></script>\n\n<div id="diagrams" align="center"></div>    \n'+("\n<script>\n    window.serializedGrammar = "+JSON.stringify(t,null,"  "))+';\n</script>\n\n<script>\n    var diagramsDiv = document.getElementById("diagrams");\n    main.drawDiagramsFromSerializedGrammar(serializedGrammar, diagramsDiv);\n</script>\n'}function nu(t){var e;return"\nfunction "+t.name+"(tokenVocabulary, config) {\n    // invoke super constructor\n    // No support for embedded actions currently, so we can 'hardcode'\n    // The use of CstParser.\n    chevrotain.CstParser.call(this, tokenVocabulary, config)\n\n    const $ = this\n\n    "+(e=t.rules,(0,T.UI)(e,function(t){var e;return nl(1,'$.RULE("'+t.name+'", function() {')+"\n"+nc(t.definition,2)+(nl(2,"})")+"\n")}).join("\n"))+"\n\n    // very important to call this after all the rules have been defined.\n    // otherwise the parser may not work correctly as it will lack information\n    // derived during the self analysis phase.\n    this.performSelfAnalysis(this)\n}\n\n// inheritance as implemented in javascript in the previous decade... :(\n"+t.name+".prototype = Object.create(chevrotain.CstParser.prototype)\n"+t.name+".prototype.constructor = "+t.name+"    \n    "}function na(t,e,n){var r=nl(n,"$."+(t+e.idx)+"(");return e.separator?r+="{\n"+nl(n+1,"SEP: this.tokensMap."+e.separator.name)+",\nDEF: "+ns(e.definition,n+2)+"\n"+nl(n,"}")+"\n":r+=ns(e.definition,n+1),r+=nl(n,")")+"\n"}function ns(t,e){return"function() {\n"+nc(t,e)+(nl(e,"}")+"\n")}function nc(t,e){var n="";return(0,T.Ed)(t,function(t){n+=function(t,e){var n;if(t instanceof tR)return nl(e,"$.SUBRULE"+t.idx+"($."+t.nonTerminalName+")\n");if(t instanceof tx)return na("OPTION",t,e);if(t instanceof tL)return na("AT_LEAST_ONE",t,e);if(t instanceof tk)return na("AT_LEAST_ONE_SEP",t,e);if(t instanceof tb)return na("MANY_SEP",t,e);if(t instanceof t_)return na("MANY",t,e);if(t instanceof tP)return nl(e,"$.OR"+t.idx+"([")+"\n"+(0,T.UI)(t.definition,function(t){var n,r;return nl(n=e+1,"{")+"\n"+(nl(n+1,"ALT: function() {")+"\n"+nc(t.definition,n+1)+nl(n+1,"}")+"\n")+nl(n,"}")}).join(",\n")+"\n"+nl(e,"])\n");else if(t instanceof tM)return n=t.terminalType.name,nl(e,"$.CONSUME"+t.idx+"(this.tokensMap."+n+")\n");else if(t instanceof tO)return nc(t.definition,e);else throw Error("non exhaustive match")}(t,e+1)}),n}function nl(t,e){return Array(4*t+1).join(" ")+e}function np(t){var e,r=Function("tokenVocabulary","config","chevrotain","    \n"+nu(e={name:t.name,rules:t.rules})+"\nreturn new "+e.name+"(tokenVocabulary, config)    \n");return function(e){return r(t.tokenVocabulary,e,n(12786))}}function nf(t){var e;return"\n(function (root, factory) {\n    if (typeof define === 'function' && define.amd) {\n        // AMD. Register as an anonymous module.\n        define(['chevrotain'], factory);\n    } else if (typeof module === 'object' && module.exports) {\n        // Node. Does not work with strict CommonJS, but\n        // only CommonJS-like environments that support module.exports,\n        // like Node.\n        module.exports = factory(require('chevrotain'));\n    } else {\n        // Browser globals (root is window)\n        root.returnExports = factory(root.b);\n    }\n}(typeof self !== 'undefined' ? self : this, function (chevrotain) {\n\n"+nu(e={name:t.name,rules:t.rules})+"\n    \nreturn {\n    "+e.name+": "+e.name+" \n}\n}));\n"}function nh(){console.warn("The clearCache function was 'soft' removed from the Chevrotain API.\n	 It performs no action other than printing this message.\n	 Please avoid using it as it will be completely removed in the future")}var nD=function(){throw Error("The Parser class has been deprecated, use CstParser or EmbeddedActionsParser instead.	\nSee: https://sap.github.io/chevrotain/docs/changes/BREAKING_CHANGES.html#_7-0-0")}},75465:function(t,e,n){"use strict";function r(t){return t&&0===t.length}function o(t){return null==t?[]:Object.keys(t)}function i(t){for(var e=[],n=Object.keys(t),r=0;r<n.length;r++)e.push(t[n[r]]);return e}function u(t,e){for(var n=[],r=o(t),i=0;i<r.length;i++){var u=r[i];n.push(e.call(null,t[u],u))}return n}function a(t,e){for(var n=[],r=0;r<t.length;r++)n.push(e.call(null,t[r],r));return n}function s(t){return r(t)?void 0:t[0]}function c(t){var e=t&&t.length;return e?t[e-1]:void 0}function l(t,e){if(Array.isArray(t))for(var n=0;n<t.length;n++)e.call(null,t[n],n);else if(x(t))for(var r=o(t),n=0;n<r.length;n++){var i=r[n],u=t[i];e.call(null,u,i)}else throw Error("non exhaustive match")}function p(t){return"string"==typeof t}function f(t){return void 0===t}function h(t){return t instanceof Function}function D(t,e){return void 0===e&&(e=1),t.slice(e,t.length)}function d(t,e){return void 0===e&&(e=1),t.slice(0,t.length-e)}function E(t,e){var n=[];if(Array.isArray(t))for(var r=0;r<t.length;r++){var o=t[r];e.call(null,o)&&n.push(o)}return n}function m(t,e){return E(t,function(t){return!e(t)})}function y(t,e){for(var n=Object.keys(t),r={},o=0;o<n.length;o++){var i=n[o],u=t[i];e(u)&&(r[i]=u)}return r}function F(t,e){return!!x(t)&&t.hasOwnProperty(e)}function C(t,e){return void 0!==T(t,function(t){return t===e})}function g(t){for(var e=[],n=0;n<t.length;n++)e.push(t[n]);return e}function v(t){var e={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}function T(t,e){for(var n=0;n<t.length;n++){var r=t[n];if(e.call(null,r))return r}}function A(t,e){for(var n=[],r=0;r<t.length;r++){var o=t[r];e.call(null,o)&&n.push(o)}return n}function I(t,e,n){for(var r=Array.isArray(t),u=r?t:i(t),a=r?[]:o(t),s=n,c=0;c<u.length;c++)s=e.call(null,s,u[c],r?c:a[c]);return s}function S(t){return m(t,function(t){return null==t})}function R(t,e){void 0===e&&(e=function(t){return t});var n=[];return I(t,function(t,r){var o=e(r);return C(n,o)?t:(n.push(o),t.concat(r))},[])}function N(t){return Array.isArray(t)}function O(t){return t instanceof RegExp}function x(t){return t instanceof Object}function L(t,e){for(var n=0;n<t.length;n++)if(!e(t[n],n))return!1;return!0}function k(t,e){return m(t,function(t){return C(e,t)})}function _(t,e){for(var n=0;n<t.length;n++)if(e(t[n]))return!0;return!1}function b(t,e){for(var n=0;n<t.length;n++)if(t[n]===e)return n;return -1}function P(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];for(var r=0;r<e.length;r++)for(var i=e[r],u=o(i),a=0;a<u.length;a++){var s=u[a];t[s]=i[s]}return t}function M(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];for(var r=0;r<e.length;r++)for(var i=e[r],u=o(i),a=0;a<u.length;a++){var s=u[a];F(t,s)||(t[s]=i[s])}return t}function B(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return M.apply(null,[{}].concat(t))}function w(t,e){var n={};return l(t,function(t){var r=e(t),o=n[r];o?o.push(t):n[r]=[t]}),n}function U(t,e){for(var n=v(t),r=o(e),i=0;i<r.length;i++){var u=r[i],a=e[u];n[u]=a}return n}function j(){}function G(t){return t}function W(t){for(var e=[],n=0;n<t.length;n++){var r=t[n];e.push(void 0!==r?r:void 0)}return e}function V(t){console&&console.error&&console.error("Error: "+t)}function K(t){console&&console.warn&&console.warn("Warning: "+t)}function H(){return"function"==typeof Map}function $(t,e){e.forEach(function(e){var n=e.prototype;Object.getOwnPropertyNames(n).forEach(function(r){if("constructor"!==r){var o=Object.getOwnPropertyDescriptor(n,r);o&&(o.get||o.set)?Object.defineProperty(t.prototype,r,o):t.prototype[r]=e.prototype[r]}})})}function Y(t){function e(){}e.prototype=t;var n=new e;function r(){return typeof n.bar}return r(),r(),t}function X(t){return t[t.length-1]}function z(t){var e=new Date().getTime(),n=t();return{time:new Date().getTime()-e,value:n}}n.d(e,{Cl:function(){return v},Cw:function(){return D},Ed:function(){return l},G:function(){return _},HD:function(){return p},HT:function(){return z},Kj:function(){return O},Kn:function(){return x},Oq:function(){return A},Ps:function(){return s},Q8:function(){return u},Qw:function(){return g},SV:function(){return Y},TS:function(){return U},UI:function(){return a},VO:function(){return i},WB:function(){return V},Wd:function(){return G},X0:function(){return W},XP:function(){return o},Z$:function(){return c},ce:function(){return B},cq:function(){return b},d1:function(){return m},dG:function(){return j},dU:function(){return H},e$:function(){return F},e5:function(){return k},ef:function(){return $},ei:function(){return y},f0:function(){return P},fj:function(){return X},hX:function(){return E},j7:function(){return d},jj:function(){return R},kJ:function(){return N},mf:function(){return h},o8:function(){return f},oA:function(){return S},r3:function(){return C},rr:function(){return K},sE:function(){return T},u4:function(){return I},vM:function(){return w},xH:function(){return function t(e){for(var n=[],r=0;r<e.length;r++){var o=e[r];Array.isArray(o)?n=n.concat(t(o)):n.push(o)}return n}},xb:function(){return r},yW:function(){return L}})},94556:function(t,e){var n,r,o;"undefined"!=typeof self&&self,r=[],void 0!==(o="function"==typeof(n=function(){function t(){}t.prototype.saveState=function(){return{idx:this.idx,input:this.input,groupIdx:this.groupIdx}},t.prototype.restoreState=function(t){this.idx=t.idx,this.input=t.input,this.groupIdx=t.groupIdx},t.prototype.pattern=function(t){this.idx=0,this.input=t,this.groupIdx=0,this.consumeChar("/");var e=this.disjunction();this.consumeChar("/");for(var n={type:"Flags",loc:{begin:this.idx,end:t.length},global:!1,ignoreCase:!1,multiLine:!1,unicode:!1,sticky:!1};this.isRegExpFlag();)switch(this.popChar()){case"g":a(n,"global");break;case"i":a(n,"ignoreCase");break;case"m":a(n,"multiLine");break;case"u":a(n,"unicode");break;case"y":a(n,"sticky")}if(this.idx!==this.input.length)throw Error("Redundant input: "+this.input.substring(this.idx));return{type:"Pattern",flags:n,value:e,loc:this.loc(0)}},t.prototype.disjunction=function(){var t=[],e=this.idx;for(t.push(this.alternative());"|"===this.peekChar();)this.consumeChar("|"),t.push(this.alternative());return{type:"Disjunction",value:t,loc:this.loc(e)}},t.prototype.alternative=function(){for(var t=[],e=this.idx;this.isTerm();)t.push(this.term());return{type:"Alternative",value:t,loc:this.loc(e)}},t.prototype.term=function(){return this.isAssertion()?this.assertion():this.atom()},t.prototype.assertion=function(){var t=this.idx;switch(this.popChar()){case"^":return{type:"StartAnchor",loc:this.loc(t)};case"$":return{type:"EndAnchor",loc:this.loc(t)};case"\\":switch(this.popChar()){case"b":return{type:"WordBoundary",loc:this.loc(t)};case"B":return{type:"NonWordBoundary",loc:this.loc(t)}}throw Error("Invalid Assertion Escape");case"(":switch(this.consumeChar("?"),this.popChar()){case"=":e="Lookahead";break;case"!":e="NegativeLookahead"}s(e);var e,n=this.disjunction();return this.consumeChar(")"),{type:e,value:n,loc:this.loc(t)}}(function(){throw Error("Internal Error - Should never get here!")})()},t.prototype.quantifier=function(t){var e=this.idx;switch(this.popChar()){case"*":n={atLeast:0,atMost:1/0};break;case"+":n={atLeast:1,atMost:1/0};break;case"?":n={atLeast:0,atMost:1};break;case"{":var n,r=this.integerIncludingZero();switch(this.popChar()){case"}":n={atLeast:r,atMost:r};break;case",":n=this.isDigit()?{atLeast:r,atMost:this.integerIncludingZero()}:{atLeast:r,atMost:1/0},this.consumeChar("}")}if(!0===t&&void 0===n)return;s(n)}if(!0!==t||void 0!==n)return s(n),"?"===this.peekChar(0)?(this.consumeChar("?"),n.greedy=!1):n.greedy=!0,n.type="Quantifier",n.loc=this.loc(e),n},t.prototype.atom=function(){var t,e=this.idx;switch(this.peekChar()){case".":t=this.dotAll();break;case"\\":t=this.atomEscape();break;case"[":t=this.characterClass();break;case"(":t=this.group()}return void 0===t&&this.isPatternCharacter()&&(t=this.patternCharacter()),s(t),t.loc=this.loc(e),this.isQuantifier()&&(t.quantifier=this.quantifier()),t},t.prototype.dotAll=function(){return this.consumeChar("."),{type:"Set",complement:!0,value:[i("\n"),i("\r"),i("\u2028"),i("\u2029")]}},t.prototype.atomEscape=function(){switch(this.consumeChar("\\"),this.peekChar()){case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":case"9":return this.decimalEscapeAtom();case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}},t.prototype.decimalEscapeAtom=function(){return{type:"GroupBackReference",value:this.positiveInteger()}},t.prototype.characterClassEscape=function(){var t,e=!1;switch(this.popChar()){case"d":t=c;break;case"D":t=c,e=!0;break;case"s":t=p;break;case"S":t=p,e=!0;break;case"w":t=l;break;case"W":t=l,e=!0}return s(t),{type:"Set",value:t,complement:e}},t.prototype.controlEscapeAtom=function(){var t;switch(this.popChar()){case"f":t=i("\f");break;case"n":t=i("\n");break;case"r":t=i("\r");break;case"t":t=i("	");break;case"v":t=i("\v")}return s(t),{type:"Character",value:t}},t.prototype.controlLetterEscapeAtom=function(){this.consumeChar("c");var t=this.popChar();if(!1===/[a-zA-Z]/.test(t))throw Error("Invalid ");return{type:"Character",value:t.toUpperCase().charCodeAt(0)-64}},t.prototype.nulCharacterAtom=function(){return this.consumeChar("0"),{type:"Character",value:i("\0")}},t.prototype.hexEscapeSequenceAtom=function(){return this.consumeChar("x"),this.parseHexDigits(2)},t.prototype.regExpUnicodeEscapeSequenceAtom=function(){return this.consumeChar("u"),this.parseHexDigits(4)},t.prototype.identityEscapeAtom=function(){return{type:"Character",value:i(this.popChar())}},t.prototype.classPatternCharacterAtom=function(){switch(this.peekChar()){case"\n":case"\r":case"\u2028":case"\u2029":case"\\":case"]":throw Error("TBD");default:return{type:"Character",value:i(this.popChar())}}},t.prototype.characterClass=function(){var t=[],e=!1;for(this.consumeChar("["),"^"===this.peekChar(0)&&(this.consumeChar("^"),e=!0);this.isClassAtom();){var n=this.classAtom();if("Character"===n.type&&this.isRangeDash()){this.consumeChar("-");var r=this.classAtom();if("Character"===r.type){if(r.value<n.value)throw Error("Range out of order in character class");t.push({from:n.value,to:r.value})}else u(n.value,t),t.push(i("-")),u(r.value,t)}else u(n.value,t)}return this.consumeChar("]"),{type:"Set",complement:e,value:t}},t.prototype.classAtom=function(){switch(this.peekChar()){case"]":case"\n":case"\r":case"\u2028":case"\u2029":throw Error("TBD");case"\\":return this.classEscape();default:return this.classPatternCharacterAtom()}},t.prototype.classEscape=function(){switch(this.consumeChar("\\"),this.peekChar()){case"b":return this.consumeChar("b"),{type:"Character",value:i("\b")};case"d":case"D":case"s":case"S":case"w":case"W":return this.characterClassEscape();case"f":case"n":case"r":case"t":case"v":return this.controlEscapeAtom();case"c":return this.controlLetterEscapeAtom();case"0":return this.nulCharacterAtom();case"x":return this.hexEscapeSequenceAtom();case"u":return this.regExpUnicodeEscapeSequenceAtom();default:return this.identityEscapeAtom()}},t.prototype.group=function(){var t=!0;(this.consumeChar("("),"?"===this.peekChar(0))?(this.consumeChar("?"),this.consumeChar(":"),t=!1):this.groupIdx++;var e=this.disjunction();this.consumeChar(")");var n={type:"Group",capturing:t,value:e};return t&&(n.idx=this.groupIdx),n},t.prototype.positiveInteger=function(){var t=this.popChar();if(!1===o.test(t))throw Error("Expecting a positive integer");for(;r.test(this.peekChar(0));)t+=this.popChar();return parseInt(t,10)},t.prototype.integerIncludingZero=function(){var t=this.popChar();if(!1===r.test(t))throw Error("Expecting an integer");for(;r.test(this.peekChar(0));)t+=this.popChar();return parseInt(t,10)},t.prototype.patternCharacter=function(){var t=this.popChar();switch(t){case"\n":case"\r":case"\u2028":case"\u2029":case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":throw Error("TBD");default:return{type:"Character",value:i(t)}}},t.prototype.isRegExpFlag=function(){switch(this.peekChar(0)){case"g":case"i":case"m":case"u":case"y":return!0;default:return!1}},t.prototype.isRangeDash=function(){return"-"===this.peekChar()&&this.isClassAtom(1)},t.prototype.isDigit=function(){return r.test(this.peekChar(0))},t.prototype.isClassAtom=function(t){switch(void 0===t&&(t=0),this.peekChar(t)){case"]":case"\n":case"\r":case"\u2028":case"\u2029":return!1;default:return!0}},t.prototype.isTerm=function(){return this.isAtom()||this.isAssertion()},t.prototype.isAtom=function(){if(this.isPatternCharacter())return!0;switch(this.peekChar(0)){case".":case"\\":case"[":case"(":return!0;default:return!1}},t.prototype.isAssertion=function(){switch(this.peekChar(0)){case"^":case"$":return!0;case"\\":switch(this.peekChar(1)){case"b":case"B":return!0;default:return!1}case"(":return"?"===this.peekChar(1)&&("="===this.peekChar(2)||"!"===this.peekChar(2));default:return!1}},t.prototype.isQuantifier=function(){var t=this.saveState();try{return void 0!==this.quantifier(!0)}catch(t){return!1}finally{this.restoreState(t)}},t.prototype.isPatternCharacter=function(){switch(this.peekChar()){case"^":case"$":case"\\":case".":case"*":case"+":case"?":case"(":case")":case"[":case"|":case"/":case"\n":case"\r":case"\u2028":case"\u2029":return!1;default:return!0}},t.prototype.parseHexDigits=function(t){for(var e="",r=0;r<t;r++){var o=this.popChar();if(!1===n.test(o))throw Error("Expecting a HexDecimal digits");e+=o}return{type:"Character",value:parseInt(e,16)}},t.prototype.peekChar=function(t){return void 0===t&&(t=0),this.input[this.idx+t]},t.prototype.popChar=function(){var t=this.peekChar(0);return this.consumeChar(),t},t.prototype.consumeChar=function(t){if(void 0!==t&&this.input[this.idx]!==t)throw Error("Expected: '"+t+"' but found: '"+this.input[this.idx]+"' at offset: "+this.idx);if(this.idx>=this.input.length)throw Error("Unexpected end of input");this.idx++},t.prototype.loc=function(t){return{begin:t,end:this.idx}};var e,n=/[0-9a-fA-F]/,r=/[0-9]/,o=/[1-9]/;function i(t){return t.charCodeAt(0)}function u(t,e){void 0!==t.length?t.forEach(function(t){e.push(t)}):e.push(t)}function a(t,e){if(!0===t[e])throw"duplicate flag "+e;t[e]=!0}function s(t){if(void 0===t)throw Error("Internal Error - Should never get here!")}var c=[];for(e=i("0");e<=i("9");e++)c.push(e);var l=[i("_")].concat(c);for(e=i("a");e<=i("z");e++)l.push(e);for(e=i("A");e<=i("Z");e++)l.push(e);var p=[i(" "),i("\f"),i("\n"),i("\r"),i("	"),i("\v"),i("	"),i("\xa0"),i(" "),i(" "),i(" "),i(" "),i(" "),i(" "),i(" "),i(" "),i(" "),i(" "),i(" "),i(" "),i("\u2028"),i("\u2029"),i(" "),i(" "),i("　"),i("\uFEFF")];function f(){}return f.prototype.visitChildren=function(t){for(var e in t){var n=t[e];t.hasOwnProperty(e)&&(void 0!==n.type?this.visit(n):Array.isArray(n)&&n.forEach(function(t){this.visit(t)},this))}},f.prototype.visit=function(t){switch(t.type){case"Pattern":this.visitPattern(t);break;case"Flags":this.visitFlags(t);break;case"Disjunction":this.visitDisjunction(t);break;case"Alternative":this.visitAlternative(t);break;case"StartAnchor":this.visitStartAnchor(t);break;case"EndAnchor":this.visitEndAnchor(t);break;case"WordBoundary":this.visitWordBoundary(t);break;case"NonWordBoundary":this.visitNonWordBoundary(t);break;case"Lookahead":this.visitLookahead(t);break;case"NegativeLookahead":this.visitNegativeLookahead(t);break;case"Character":this.visitCharacter(t);break;case"Set":this.visitSet(t);break;case"Group":this.visitGroup(t);break;case"GroupBackReference":this.visitGroupBackReference(t);break;case"Quantifier":this.visitQuantifier(t)}this.visitChildren(t)},f.prototype.visitPattern=function(t){},f.prototype.visitFlags=function(t){},f.prototype.visitDisjunction=function(t){},f.prototype.visitAlternative=function(t){},f.prototype.visitStartAnchor=function(t){},f.prototype.visitEndAnchor=function(t){},f.prototype.visitWordBoundary=function(t){},f.prototype.visitNonWordBoundary=function(t){},f.prototype.visitLookahead=function(t){},f.prototype.visitNegativeLookahead=function(t){},f.prototype.visitCharacter=function(t){},f.prototype.visitSet=function(t){},f.prototype.visitGroup=function(t){},f.prototype.visitGroupBackReference=function(t){},f.prototype.visitQuantifier=function(t){},{RegExpParser:t,BaseRegExpVisitor:f,VERSION:"0.5.0"}})?n.apply(e,r):n)&&(t.exports=o)},22717:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return tO}});var r=n(90266);function o(t,e){return Object.assign(SyntaxError(t+" ("+e.loc.start.line+":"+e.loc.start.column+")"),e)}var i=Object.defineProperty;((t,e)=>{for(var n in e)i(t,n,{get:e[n],enumerable:!0})})({},{builders:()=>tu,printer:()=>ta,utils:()=>ts});var u="string",a="array",s="cursor",c="indent",l="align",p="trim",f="group",h="fill",D="if-break",d="indent-if-break",E="line-suffix",m="line-suffix-boundary",y="line",F="label",C="break-parent",g=new Set([s,c,l,p,f,h,D,d,E,m,y,F,C]),v=function(t){if("string"==typeof t)return u;if(Array.isArray(t))return a;if(!t)return;let{type:e}=t;if(g.has(e))return e},T=t=>new Intl.ListFormat("en-US",{type:"disjunction"}).format(t),A=class extends Error{name="InvalidDocError";constructor(t){super(function(t){let e=null===t?"null":typeof t;if("string"!==e&&"object"!==e)return`Unexpected doc '${e}', 
// Expected it to be 'string' or 'object'.`;if(v(t))throw Error("doc is valid.");let n=Object.prototype.toString.call(t);if("[object Object]"!==n)return`Unexpected doc '${n}'.`;let r=T([...g].map(t=>`'${t}'`));return`Unexpected doc.type '${t.type}'.
// Expected it to be ${r}.`}(t)),this.doc=t}},I={},S=function(t,e,n,r){let o=[t];for(;o.length>0;){let t=o.pop();if(t===I){n(o.pop());continue}n&&o.push(t,I);let i=v(t);if(!i)throw new A(t);if((null==e?void 0:e(t))!==!1)switch(i){case a:case h:{let e=i===a?t:t.parts;for(let t=e.length,n=t-1;n>=0;--n)o.push(e[n]);break}case D:o.push(t.flatContents,t.breakContents);break;case f:if(r&&t.expandedStates)for(let e=t.expandedStates.length,n=e-1;n>=0;--n)o.push(t.expandedStates[n]);else o.push(t.contents);break;case l:case c:case d:case F:case E:o.push(t.contents);break;case u:case s:case p:case m:case y:case C:break;default:throw new A(t)}}},R=()=>{};function N(t){return R(t),{type:c,contents:t}}function O(t,e){return R(e),{type:l,contents:e,n:t}}function x(t,e={}){return R(t),R(e.expandedStates,!0),{type:f,id:e.id,contents:t,break:!!e.shouldBreak,expandedStates:e.expandedStates}}function L(t){return R(t),{type:h,parts:t}}var k={type:C},_={type:y,hard:!0},b={type:y,hard:!0,literal:!0},P=[_,k],M=[b,k];function B(t,e){R(t),R(e);let n=[];for(let r=0;r<e.length;r++)0!==r&&n.push(t),n.push(e[r]);return n}var w=(t,e,n)=>t&&null==e?void 0:Array.isArray(e)||"string"==typeof e?e[n<0?e.length+n:n]:e.at(n),U=(t,e,n,r)=>t&&null==e?void 0:e.replaceAll?e.replaceAll(n,r):n.global?e.replace(n,r):e.split(n).join(r),j=()=>/[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC2\uDECE-\uDEDB\uDEE0-\uDEE8]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g,G=t=>{var e;return!(12288===t||t>=65281&&t<=65376||t>=65504&&t<=65510||(e=t)>=4352&&e<=4447||8986===e||8987===e||9001===e||9002===e||e>=9193&&e<=9196||9200===e||9203===e||9725===e||9726===e||9748===e||9749===e||e>=9800&&e<=9811||9855===e||9875===e||9889===e||9898===e||9899===e||9917===e||9918===e||9924===e||9925===e||9934===e||9940===e||9962===e||9970===e||9971===e||9973===e||9978===e||9981===e||9989===e||9994===e||9995===e||10024===e||10060===e||10062===e||e>=10067&&e<=10069||10071===e||e>=10133&&e<=10135||10160===e||10175===e||11035===e||11036===e||11088===e||11093===e||e>=11904&&e<=11929||e>=11931&&e<=12019||e>=12032&&e<=12245||e>=12272&&e<=12287||e>=12289&&e<=12350||e>=12353&&e<=12438||e>=12441&&e<=12543||e>=12549&&e<=12591||e>=12593&&e<=12686||e>=12688&&e<=12771||e>=12783&&e<=12830||e>=12832&&e<=12871||e>=12880&&e<=19903||e>=19968&&e<=42124||e>=42128&&e<=42182||e>=43360&&e<=43388||e>=44032&&e<=55203||e>=63744&&e<=64255||e>=65040&&e<=65049||e>=65072&&e<=65106||e>=65108&&e<=65126||e>=65128&&e<=65131||e>=94176&&e<=94180||94192===e||94193===e||e>=94208&&e<=100343||e>=100352&&e<=101589||e>=101632&&e<=101640||e>=110576&&e<=110579||e>=110581&&e<=110587||110589===e||110590===e||e>=110592&&e<=110882||110898===e||e>=110928&&e<=110930||110933===e||e>=110948&&e<=110951||e>=110960&&e<=111355||126980===e||127183===e||127374===e||e>=127377&&e<=127386||e>=127488&&e<=127490||e>=127504&&e<=127547||e>=127552&&e<=127560||127568===e||127569===e||e>=127584&&e<=127589||e>=127744&&e<=127776||e>=127789&&e<=127797||e>=127799&&e<=127868||e>=127870&&e<=127891||e>=127904&&e<=127946||e>=127951&&e<=127955||e>=127968&&e<=127984||127988===e||e>=127992&&e<=128062||128064===e||e>=128066&&e<=128252||e>=128255&&e<=128317||e>=128331&&e<=128334||e>=128336&&e<=128359||128378===e||128405===e||128406===e||128420===e||e>=128507&&e<=128591||e>=128640&&e<=128709||128716===e||e>=128720&&e<=128722||e>=128725&&e<=128727||e>=128732&&e<=128735||128747===e||128748===e||e>=128756&&e<=128764||e>=128992&&e<=129003||129008===e||e>=129292&&e<=129338||e>=129340&&e<=129349||e>=129351&&e<=129535||e>=129648&&e<=129660||e>=129664&&e<=129672||e>=129680&&e<=129725||e>=129727&&e<=129733||e>=129742&&e<=129755||e>=129760&&e<=129768||e>=129776&&e<=129784||e>=131072&&e<=196605||e>=196608&&e<=262141)},W=/[^\x20-\x7F]/,V=function(t){if(!t)return 0;if(!W.test(t))return t.length;t=t.replace(j(),"  ");let e=0;for(let n of t){let t=n.codePointAt(0);t<=31||t>=127&&t<=159||t>=768&&t<=879||(e+=G(t)?1:2)}return e},K=t=>{if(Array.isArray(t))return t;if(t.type!==h)throw Error(`Expect doc to be 'array' or '${h}'.`);return t.parts};function H(t,e){if("string"==typeof t)return e(t);let n=new Map;return function t(r){if(n.has(r))return n.get(r);let o=function(n){switch(v(n)){case a:return e(n.map(t));case h:return e({...n,parts:n.parts.map(t)});case D:return e({...n,breakContents:t(n.breakContents),flatContents:t(n.flatContents)});case f:{let{expandedStates:r,contents:o}=n;return o=r?(r=r.map(t))[0]:t(o),e({...n,contents:o,expandedStates:r})}case l:case c:case d:case F:case E:return e({...n,contents:t(n.contents)});case u:case s:case p:case m:case y:case C:return e(n);default:throw new A(n)}}(r);return n.set(r,o),o}(t)}function $(t,e,n){let r=n,o=!1;return S(t,function(t){if(o)return!1;let n=e(t);void 0!==n&&(o=!0,r=n)}),r}function Y(t){if(t.type===f&&t.break||t.type===y&&t.hard||t.type===C)return!0}function X(t){if(t.length>0){let e=w(!1,t,-1);e.expandedStates||e.break||(e.break="propagated")}return null}function z(t){return t.type!==y||t.hard?t.type===D?t.flatContents:t:t.soft?"":" "}function Q(t){for(t=[...t];t.length>=2&&w(!1,t,-2).type===y&&w(!1,t,-1).type===C;)t.length-=2;if(t.length>0){let e=q(w(!1,t,-1));t[t.length-1]=e}return t}function q(t){switch(v(t)){case l:case c:case d:case f:case E:case F:{let e=q(t.contents);return{...t,contents:e}}case D:return{...t,breakContents:q(t.breakContents),flatContents:q(t.flatContents)};case h:return{...t,parts:Q(t.parts)};case a:return Q(t);case u:return t.replace(/[\n\r]*$/,"");case s:case p:case m:case y:case C:break;default:throw new A(t)}return t}function J(t){if(t.type===y)return!0}var Z=Symbol("MODE_BREAK"),tt=Symbol("MODE_FLAT"),te=Symbol("cursor");function tn(){return{value:"",length:0,queue:[]}}function tr(t,e,n){let r="dedent"===e.type?t.queue.slice(0,-1):[...t.queue,e],o="",i=0,u=0,a=0;for(let t of r)switch(t.type){case"indent":l(),n.useTabs?s(1):c(n.tabWidth);break;case"stringAlign":l(),o+=t.n,i+=t.n.length;break;case"numberAlign":u+=1,a+=t.n;break;default:throw Error(`Unexpected type '${t.type}'`)}return p(),{...t,value:o,length:i,queue:r};function s(t){o+="	".repeat(t),i+=n.tabWidth*t}function c(t){o+=" ".repeat(t),i+=t}function l(){n.useTabs?(u>0&&s(u),u=0,a=0):p()}function p(){a>0&&c(a),u=0,a=0}}function to(t){let e=0,n=0,r=t.length;n:for(;r--;){let o=t[r];if(o===te){n++;continue}for(let n=o.length-1;n>=0;n--){let i=o[n];if(" "===i||"	"===i)e++;else{t[r]=o.slice(0,n+1);break n}}}if(e>0||n>0)for(t.length=r+1;n-- >0;)t.push(te);return e}function ti(t,e,n,r,o,i){if(n===Number.POSITIVE_INFINITY)return!0;let s=e.length,C=[t],g=[];for(;n>=0;){if(0===C.length){if(0===s)return!0;C.push(e[--s]);continue}let{mode:t,doc:T}=C.pop();switch(v(T)){case u:g.push(T),n-=V(T);break;case a:case h:{let e=K(T);for(let n=e.length-1;n>=0;n--)C.push({mode:t,doc:e[n]});break}case c:case l:case d:case F:C.push({mode:t,doc:T.contents});break;case p:n+=to(g);break;case f:{if(i&&T.break)return!1;let e=T.break?Z:t,n=T.expandedStates&&e===Z?w(!1,T.expandedStates,-1):T.contents;C.push({mode:e,doc:n});break}case D:{let e=(T.groupId?o[T.groupId]||tt:t)===Z?T.breakContents:T.flatContents;e&&C.push({mode:t,doc:e});break}case y:if(t===Z||T.hard)return!0;!T.soft&&(g.push(" "),n--);break;case E:r=!0;break;case m:if(r)return!1}}return!1}var tu={join:B,line:{type:y},softline:{type:y,soft:!0},hardline:P,literalline:M,group:x,conditionalGroup:function(t,e){return x(t[0],{...e,expandedStates:t})},fill:L,lineSuffix:function(t){return R(t),{type:E,contents:t}},lineSuffixBoundary:{type:m},cursor:{type:s},breakParent:k,ifBreak:function(t,e="",n={}){return R(t),""!==e&&R(e),{type:D,breakContents:t,flatContents:e,groupId:n.groupId}},trim:{type:p},indent:N,indentIfBreak:function(t,e){return R(t),{type:d,contents:t,groupId:e.groupId,negate:e.negate}},align:O,addAlignmentToDoc:function(t,e,n){R(t);let r=t;if(e>0){for(let t=0;t<Math.floor(e/n);++t)r=N(r);r=O(e%n,r),r=O(Number.NEGATIVE_INFINITY,r)}return r},markAsRoot:function(t){return O({type:"root"},t)},dedentToRoot:function(t){return O(Number.NEGATIVE_INFINITY,t)},dedent:function(t){return O(-1,t)},hardlineWithoutBreakParent:_,literallineWithoutBreakParent:b,label:function(t,e){return R(e),t?{type:F,label:t,contents:e}:e},concat:t=>t},ta={printDocToString:function(t,e){let n={},r=e.printWidth,o=function(t){switch(t){case"cr":return"\r";case"crlf":return"\r\n";default:return"\n"}}(e.endOfLine),i=0,g=[{ind:tn(),mode:Z,doc:t}],T=[],I=!1,R=[],O=0;for(!function(t){let e=new Set,n=[];S(t,function(t){if(t.type===C&&X(n),t.type===f){if(n.push(t),e.has(t))return!1;e.add(t)}},function(t){t.type===f&&n.pop().break&&X(n)},!0)}(t);g.length>0;){let{ind:t,mode:S,doc:k}=g.pop();switch(v(k)){case u:{let t="\n"!==o?U(!1,k,"\n",o):k;T.push(t),g.length>0&&(i+=V(t));break}case a:for(let e=k.length-1;e>=0;e--)g.push({ind:t,mode:S,doc:k[e]});break;case s:if(O>=2)throw Error("There are too many 'cursor' in doc.");T.push(te),O++;break;case c:g.push({ind:tr(t,{type:"indent"},e),mode:S,doc:k.contents});break;case l:var x;g.push({ind:(x=k.n)===Number.NEGATIVE_INFINITY?t.root||tn():x<0?tr(t,{type:"dedent"},e):x?"root"===x.type?{...t,root:t}:tr(t,{type:"string"==typeof x?"stringAlign":"numberAlign",n:x},e):t,mode:S,doc:k.contents});break;case p:i-=to(T);break;case f:switch(S){case tt:if(!I){g.push({ind:t,mode:k.break?Z:tt,doc:k.contents});break}case Z:{I=!1;let e={ind:t,mode:tt,doc:k.contents},o=r-i,u=R.length>0;if(!k.break&&ti(e,g,o,u,n))g.push(e);else if(k.expandedStates){let e=w(!1,k.expandedStates,-1);if(k.break)g.push({ind:t,mode:Z,doc:e});else for(let r=1;r<k.expandedStates.length+1;r++){if(r>=k.expandedStates.length){g.push({ind:t,mode:Z,doc:e});break}{let e={ind:t,mode:tt,doc:k.expandedStates[r]};if(ti(e,g,o,u,n)){g.push(e);break}}}}else g.push({ind:t,mode:Z,doc:k.contents})}}k.id&&(n[k.id]=w(!1,g,-1).mode);break;case h:{let e=r-i,{parts:o}=k;if(0===o.length)break;let[u,a]=o,s={ind:t,mode:tt,doc:u},c={ind:t,mode:Z,doc:u},l=ti(s,[],e,R.length>0,n,!0);if(1===o.length){l?g.push(s):g.push(c);break}let p={ind:t,mode:tt,doc:a},f={ind:t,mode:Z,doc:a};if(2===o.length){l?g.push(p,s):g.push(f,c);break}o.splice(0,2);let h={ind:t,mode:S,doc:L(o)};ti({ind:t,mode:tt,doc:[u,a,o[0]]},[],e,R.length>0,n,!0)?g.push(h,p,s):l?g.push(h,f,s):g.push(h,f,c);break}case D:case d:{let e=k.groupId?n[k.groupId]:S;if(e===Z){let e=k.type===D?k.breakContents:k.negate?k.contents:N(k.contents);e&&g.push({ind:t,mode:S,doc:e})}if(e===tt){let e=k.type===D?k.flatContents:k.negate?N(k.contents):k.contents;e&&g.push({ind:t,mode:S,doc:e})}break}case E:R.push({ind:t,mode:S,doc:k.contents});break;case m:R.length>0&&g.push({ind:t,mode:S,doc:_});break;case y:switch(S){case tt:if(k.hard)I=!0;else{k.soft||(T.push(" "),i+=1);break}case Z:if(R.length>0){g.push({ind:t,mode:S,doc:k},...R.reverse()),R.length=0;break}k.literal?t.root?(T.push(o,t.root.value),i=t.root.length):(T.push(o),i=0):(i-=to(T),T.push(o+t.value),i=t.length)}break;case F:g.push({ind:t,mode:S,doc:k.contents});break;case C:break;default:throw new A(k)}0===g.length&&R.length>0&&(g.push(...R.reverse()),R.length=0)}let k=T.indexOf(te);if(-1!==k){let t=T.indexOf(te,k+1),e=T.slice(0,k).join(""),n=T.slice(k+1,t).join("");return{formatted:e+n+T.slice(t+1).join(""),cursorNodeStart:e.length,cursorNodeText:n}}return{formatted:T.join("")}}},ts={willBreak:function(t){return $(t,Y,!1)},traverseDoc:S,findInDoc:$,mapDoc:H,removeLines:function(t){return H(t,z)},stripTrailingHardline:function(t){return q(H(t,t=>(function(t){switch(v(t)){case h:if(t.parts.every(t=>""===t))return"";break;case f:if(!t.contents&&!t.id&&!t.break&&!t.expandedStates)return"";if(t.contents.type===f&&t.contents.id===t.id&&t.contents.break===t.break&&t.contents.expandedStates===t.expandedStates)return t.contents;break;case l:case c:case d:case E:if(!t.contents)return"";break;case D:if(!t.flatContents&&!t.breakContents)return"";break;case a:{let e=[];for(let n of t){if(!n)continue;let[t,...r]=Array.isArray(n)?n:[n];"string"==typeof t&&"string"==typeof w(!1,e,-1)?e[e.length-1]+=t:e.push(t),e.push(...r)}if(0===e.length)return"";if(1===e.length)return e[0];return e}case u:case s:case p:case m:case y:case F:case C:break;default:throw new A(t)}return t})(t)))},replaceEndOfLine:function(t,e=M){return H(t,t=>"string"==typeof t?B(e,t.split("\n")):t)},canBreak:function(t){return $(t,J,!1)}};let{dedentToRoot:tc,group:tl,hardline:tp,indent:tf,join:th,line:tD,literalline:td,softline:tE}=tu,{fill:tm,group:ty,hardline:tF,indent:tC,join:tg,line:tv,literalline:tT,softline:tA}=tu,tI="<!-- prettier-ignore-start -->",tS="<!-- prettier-ignore-end -->";function tR(t){if(0===t.length)return!1;t.sort((t,e)=>t.startOffset-e.startOffset);let e=!1;for(let n=0;n<t.length;n+=1)if(t[n].image===tI)e=!0;else if(e&&t[n].image===tS)return!0;return!1}function tN(t){let e=t.getValue();return{offset:e.startOffset,startLine:e.startLine,endLine:e.endLine,printed:e.image}}var tO={languages:[{name:"Ant Build System",tmScope:"text.xml.ant",filenames:["ant.xml","build.xml"],codemirrorMode:"xml",codemirrorMimeType:"application/xml",since:"0.1.0",parsers:["xml"],linguistLanguageId:15,vscodeLanguageIds:["xml"]},{name:"COLLADA",extensions:[".dae"],tmScope:"text.xml",codemirrorMode:"xml",codemirrorMimeType:"text/xml",since:"0.1.0",parsers:["xml"],linguistLanguageId:49,vscodeLanguageIds:["xml"]},{name:"Eagle",extensions:[".sch",".brd"],tmScope:"text.xml",codemirrorMode:"xml",codemirrorMimeType:"text/xml",since:"0.1.0",parsers:["xml"],linguistLanguageId:97,vscodeLanguageIds:["xml"]},{name:"Genshi",extensions:[".kid"],tmScope:"text.xml.genshi",aliases:["xml+genshi","xml+kid"],codemirrorMode:"xml",codemirrorMimeType:"text/xml",since:"0.1.0",parsers:["xml"],linguistLanguageId:126,vscodeLanguageIds:["xml"]},{name:"JetBrains MPS",aliases:["mps"],extensions:[".mps",".mpl",".msd"],codemirrorMode:"xml",codemirrorMimeType:"text/xml",tmScope:"none",since:"0.1.0",parsers:["xml"],linguistLanguageId:465165328,vscodeLanguageIds:["xml"]},{name:"LabVIEW",extensions:[".lvproj",".lvclass",".lvlib"],tmScope:"text.xml",codemirrorMode:"xml",codemirrorMimeType:"text/xml",since:"0.1.0",parsers:["xml"],linguistLanguageId:194,vscodeLanguageIds:["xml"]},{name:"Maven POM",group:"XML",tmScope:"text.xml.pom",filenames:["pom.xml"],codemirrorMode:"xml",codemirrorMimeType:"text/xml",since:"0.1.0",parsers:["xml"],linguistLanguageId:226,vscodeLanguageIds:["xml"]},{name:"SVG",extensions:[".svg"],tmScope:"text.xml.svg",codemirrorMode:"xml",codemirrorMimeType:"text/xml",since:"0.1.0",parsers:["xml"],linguistLanguageId:337,vscodeLanguageIds:["xml"]},{name:"Web Ontology Language",extensions:[".owl"],tmScope:"text.xml",since:"0.1.0",parsers:["xml"],linguistLanguageId:394,vscodeLanguageIds:["xml"]},{name:"XML",tmScope:"text.xml",codemirrorMode:"xml",codemirrorMimeType:"text/xml",aliases:["rss","xsd","wsdl"],extensions:[".adml",".admx",".ant",".axaml",".axml",".builds",".ccproj",".ccxml",".clixml",".cproject",".cscfg",".csdef",".csl",".csproj",".ct",".depproj",".dita",".ditamap",".ditaval",".dll.config",".dotsettings",".filters",".fsproj",".fxml",".glade",".gml",".gmx",".grxml",".gst",".hzp",".iml",".inx",".ivy",".jelly",".jsproj",".kml",".launch",".mdpolicy",".mjml",".mm",".mod",".mxml",".natvis",".ncl",".ndproj",".nproj",".nuspec",".odd",".osm",".pkgproj",".pluginspec",".proj",".props",".ps1xml",".psc1",".pt",".qhelp",".rdf",".res",".resx",".rs",".rss",".runsettings",".sch",".scxml",".sfproj",".shproj",".srdf",".storyboard",".sublime-snippet",".sw",".targets",".tml",".ts",".tsx",".typ",".ui",".urdf",".ux",".vbproj",".vcxproj",".vsixmanifest",".vssettings",".vstemplate",".vxml",".wixproj",".workflow",".wsdl",".wsf",".wxi",".wxl",".wxs",".x3d",".xacro",".xaml",".xib",".xlf",".xliff",".xmi",".xml",".xml.dist",".xmp",".xproj",".xsd",".xspec",".xul",".zcml"],filenames:[".classpath",".cproject",".project","App.config","NuGet.config","Settings.StyleCop","Web.Debug.config","Web.Release.config","Web.config","packages.config"],since:"0.1.0",parsers:["xml"],linguistLanguageId:399,vscodeLanguageIds:["xml"]},{name:"XML Property List",group:"XML",extensions:[".plist",".stTheme",".tmCommand",".tmLanguage",".tmPreferences",".tmSnippet",".tmTheme"],tmScope:"text.xml.plist",codemirrorMode:"xml",codemirrorMimeType:"text/xml",since:"0.1.0",parsers:["xml"],linguistLanguageId:75622871,vscodeLanguageIds:["xml"]},{name:"XPages",extensions:[".xsp-config",".xsp.metadata"],tmScope:"text.xml",codemirrorMode:"xml",codemirrorMimeType:"text/xml",since:"0.1.0",parsers:["xml"],linguistLanguageId:400,vscodeLanguageIds:["xml"]},{name:"XProc",extensions:[".xpl",".xproc"],tmScope:"text.xml",codemirrorMode:"xml",codemirrorMimeType:"text/xml",since:"0.1.0",parsers:["xml"],linguistLanguageId:401,vscodeLanguageIds:["xml"]},{name:"XSLT",aliases:["xsl"],extensions:[".xslt",".xsl"],tmScope:"text.xml.xsl",codemirrorMode:"xml",codemirrorMimeType:"text/xml",since:"0.1.0",parsers:["xml"],linguistLanguageId:404,vscodeLanguageIds:["xml"]}],parsers:{xml:{parse(t){let{lexErrors:e,parseErrors:n,cst:i}=(0,r.parse)(t);if(e.length>0){let t=e[0];throw o(t.message,{loc:{start:{line:t.line,column:t.column},end:{line:t.line,column:t.column+t.length}}})}if(n.length>0){let t=n[0];throw o(t.message,{loc:{start:{line:t.token.startLine,column:t.token.startColumn},end:{line:t.token.endLine,column:t.token.endColumn}}})}return function t(e){switch(e.name){case"attribute":{let{Name:t,EQUALS:n,STRING:r}=e.children;return{name:"attribute",Name:t[0].image,EQUALS:n[0].image,STRING:r[0].image,location:e.location}}case"chardata":{let{SEA_WS:t,TEXT:n}=e.children;return{name:"chardata",SEA_WS:t?t[0].image:null,TEXT:n?n[0].image:null,location:e.location}}case"content":{let{CData:n,Comment:r,chardata:o,element:i,PROCESSING_INSTRUCTION:u,reference:a}=e.children;return{name:"content",CData:n||[],Comment:r||[],chardata:(o||[]).map(t),element:(i||[]).map(t),PROCESSING_INSTRUCTION:u||[],reference:(a||[]).map(t),location:e.location}}case"docTypeDecl":{let{DocType:n,Name:r,externalID:o,CLOSE:i}=e.children;return{name:"docTypeDecl",DocType:n[0].image,Name:r[0].image,externalID:o?t(o[0]):null,CLOSE:i[0].image,location:e.location}}case"document":{let{docTypeDecl:n,element:r,misc:o,prolog:i}=e.children;return{name:"document",docTypeDecl:n?t(n[0]):null,element:r?t(r[0]):null,misc:(o||[]).filter(t=>!t.children.SEA_WS).map(t),prolog:i?t(i[0]):null,location:e.location}}case"element":{let{OPEN:n,Name:r,attribute:o,START_CLOSE:i,content:u,SLASH_OPEN:a,END_NAME:s,END:c,SLASH_CLOSE:l}=e.children;return{name:"element",OPEN:n[0].image,Name:r[0].image,attribute:(o||[]).map(t),START_CLOSE:i?i[0].image:null,content:u?t(u[0]):null,SLASH_OPEN:a?a[0].image:null,END_NAME:s?s[0].image:null,END:c?c[0].image:null,SLASH_CLOSE:l?l[0].image:null,location:e.location}}case"externalID":{let{Public:t,PubIDLiteral:n,System:r,SystemLiteral:o}=e.children;return{name:"externalID",Public:t?t[0].image:null,PubIDLiteral:n?n[0].image:null,System:r?r[0].image:null,SystemLiteral:o?o[0].image:null,location:e.location}}case"misc":{let{Comment:t,PROCESSING_INSTRUCTION:n,SEA_WS:r}=e.children;return{name:"misc",Comment:t?t[0].image:null,PROCESSING_INSTRUCTION:n?n[0].image:null,SEA_WS:r?r[0].image:null,location:e.location}}case"prolog":{let{XMLDeclOpen:n,attribute:r,SPECIAL_CLOSE:o}=e.children;return{name:"prolog",XMLDeclOpen:n[0].image,attribute:(r||[]).map(t),SPECIAL_CLOSE:o[0].image,location:e.location}}case"reference":{let{CharRef:t,EntityRef:n}=e.children;return{name:"reference",CharRef:t?t[0].image:null,EntityRef:n?n[0].image:null,location:e.location}}default:throw Error(`Unknown node type: ${e.name}`)}}(i)},astFormat:"xml",locStart:t=>t.location.startOffset,locEnd:t=>t.location.endOffset}},printers:{xml:{getVisitorKeys:(t,e)=>Object.keys(t).filter(t=>"location"!==t&&"tokenType"!==t),embed:function(t,e){let n=t.getValue();if("element"!==n.name)return;let r=function(t,e){let{Name:n,attribute:r}=t,o=n.toLowerCase();return"xml"===o?null:(("style"===o||"script"===o)&&r.length>0&&(o=function(t){for(let e of t)if("type"===e.Name){let t=e.STRING;if(t.startsWith('"text/')&&t.endsWith('"'))return t.slice(6,-1)}return null}(r)),"javascript"===o&&(o="babel"),e.plugins.some(t=>"string"!=typeof t&&t.parsers&&Object.prototype.hasOwnProperty.call(t.parsers,o)))?o:null}(n,e);if(!r||!n.content)return;let o=n.content;if(0!==o.chardata.length&&!(o.CData.length>0)&&!(o.Comment.length>0)&&!(o.element.length>0)&&!(o.PROCESSING_INSTRUCTION.length>0)&&!(o.reference.length>0))return async function(n,i){let{openTag:u,closeTag:a}=function(t,e,n){let{OPEN:r,Name:o,attribute:i,START_CLOSE:u,SLASH_OPEN:a,END_NAME:s,END:c}=t.getValue(),l=[r,o];return i.length>0&&l.push(tf([tD,th(tD,t.map(n,"attribute"))])),e.bracketSameLine||l.push(tE),{openTag:tl([...l,u]),closeTag:tl([a,s,c])}}(t,e,i),s=await n(o.chardata.map(t=>{let{SEA_WS:e,TEXT:n}=t;return{offset:t.location.startOffset,printed:e||n}}).sort(({offset:t})=>t).map(({printed:t})=>t).join(""),{parser:r});return tl([u,td,tc(ts.replaceEndOfLine(s)),tp,a])}},print(t,e,n){let r=t.getValue();switch(r.name){case"attribute":return function(t,e,n){let r;let{Name:o,EQUALS:i,STRING:u}=t.getValue();if("double"===e.xmlQuoteAttributes){let t=u.slice(1,-1).replaceAll('"',"&quot;");r=`"${t}"`}else if("single"===e.xmlQuoteAttributes){let t=u.slice(1,-1).replaceAll("'","&apos;");r=`'${t}'`}else r=u;return[o,i,r]}(t,e,0);case"chardata":return function(t,e,n){let{SEA_WS:r,TEXT:o}=t.getValue();return(r||o).split(/(\n)/g).map((t,e)=>e%2==0?t:tT)}(t,0,0);case"content":return function(t,e,n){let r=[...t.map(tN,"CData"),...t.map(tN,"Comment"),...t.map(t=>({offset:t.getValue().location.startOffset,printed:n(t)}),"chardata"),...t.map(t=>({offset:t.getValue().location.startOffset,printed:n(t)}),"element"),...t.map(tN,"PROCESSING_INSTRUCTION"),...t.map(t=>({offset:t.getValue().location.startOffset,printed:n(t)}),"reference")],{Comment:o}=t.getValue();if(tR(o)){o.sort((t,e)=>t.startOffset-e.startOffset);let t=[],n=null;o.forEach(e=>{e.image===tI?n=e:n&&e.image===tS&&(t.push({start:n.startOffset,end:e.endOffset}),n=null)}),r=r.filter(e=>t.every(({start:t,end:n})=>e.offset<t||e.offset>n)),t.forEach(({start:t,end:n})=>{let o=e.originalText.slice(t,n+1);r.push({offset:t,printed:ts.replaceEndOfLine(o)})})}return r.sort((t,e)=>t.offset-e.offset),ty(r.map(({printed:t})=>t))}(t,e,n);case"docTypeDecl":return function(t,e,n){let{DocType:r,Name:o,externalID:i,CLOSE:u}=t.getValue(),a=[r," ",o];return i&&a.push(" ",t.call(n,"externalID")),ty([...a,u])}(t,0,n);case"document":return function(t,e,n){let{docTypeDecl:r,element:o,misc:i,prolog:u}=t.getValue(),a=[];return r&&a.push({offset:r.location.startOffset,printed:t.call(n,"docTypeDecl")}),u&&a.push({offset:u.location.startOffset,printed:t.call(n,"prolog")}),t.each(t=>{let e=t.getValue();a.push({offset:e.location.startOffset,printed:n(t)})},"misc"),o&&a.push({offset:o.location.startOffset,printed:t.call(n,"element")}),a.sort((t,e)=>t.offset-e.offset),[tg(tF,a.map(({printed:t})=>t)),tF]}(t,0,n);case"element":return function(t,e,n){let r;let{OPEN:o,Name:i,attribute:u,START_CLOSE:a,content:s,SLASH_OPEN:c,END_NAME:l,END:p,SLASH_CLOSE:f}=t.getValue(),h=[o,i];if(u.length>0){let r=t.map(t=>({node:t.getValue(),printed:n(t)}),"attribute");e.xmlSortAttributesByKey&&r.sort((t,e)=>{let n=t.node.Name,r=e.node.Name;if("xmlns"===n)return -1;if("xmlns"===r)return 1;if(n.includes(":")&&r.includes(":")){let[t,e]=n.split(":"),[o,i]=r.split(":");return t===o?e.localeCompare(i):"xmlns"===t?-1:"xmlns"===o?1:t.localeCompare(o)}return n.includes(":")?-1:r.includes(":")?1:n.localeCompare(r)});let o=e.singleAttributePerLine?tF:tv;h.push(tC([tv,tg(o,r.map(({printed:t})=>t))]))}if(r=e.bracketSameLine?e.xmlSelfClosingSpace?" ":"":e.xmlSelfClosingSpace?tv:tA,f)return ty([...h,r,f]);if(0===s.chardata.length&&0===s.CData.length&&0===s.Comment.length&&0===s.element.length&&0===s.PROCESSING_INSTRUCTION.length&&0===s.reference.length)return ty([...h,r,"/>"]);let D=ty([...h,e.bracketSameLine?"":tA,a]),d=ty([c,l,p]);if(!("strict"===e.xmlWhitespaceSensitivity||"xsl:text"===i||u.some(t=>t&&"xml:space"===t.Name&&"preserve"===t.STRING.slice(1,-1))||s.CData.length>0||tR(s.Comment))){let o=t.call(t=>(function(t,e,n){let r=t.getValue(),o=[];return o=o.concat(t.map(tN,"Comment")),r.chardata.length>0&&(o=r.chardata.some(t=>!!t.TEXT)&&"preserve"===e.xmlWhitespaceSensitivity?o.concat(function(t,e){let n;let r=[];return t.each(t=>{let o=t.getValue().location,i=e(t);if(n&&o.startColumn&&n.endColumn&&o.startLine===n.endLine&&o.startColumn===n.endColumn+1){let t=r[r.length-1];t.endLine=o.endLine,t.printed=ty([t.printed,i])}else r.push({offset:o.startOffset,startLine:o.startLine,endLine:o.endLine,printed:i,whitespace:!0});n=o},"chardata"),r}(t,n)):o.concat(function(t){let e=[];return t.each(t=>{let n=t.getValue();if(!n.TEXT)return;let r=ty(n.TEXT.replaceAll(/^[\t\n\r\s]+|[\t\n\r\s]+$/g,"").split(/(\n)/g).map(t=>"\n"===t?tT:tm(t.split(/\b( +)\b/g).map((t,e)=>e%2==0?t:tv)))),o=n.location;e.push({offset:o.startOffset,startLine:o.startLine,endLine:o.endLine,printed:r})},"chardata"),e}(t,n))),o=(o=(o=o.concat(t.map(t=>{let e=t.getValue().location;return{offset:e.startOffset,startLine:e.startLine,endLine:e.endLine,printed:n(t)}},"element"))).concat(t.map(tN,"PROCESSING_INSTRUCTION"))).concat(t.map(t=>{let e=t.getValue();return{type:"reference",offset:e.location.startOffset,startLine:e.location.startLine,endLine:e.location.endLine,printed:n(t)}},"reference"))})(t,e,n),"content");if(o.sort((t,e)=>t.offset-e.offset),"preserve"===e.xmlWhitespaceSensitivity&&o.some(({whitespace:t})=>t))return ty([D,o.map(({printed:t})=>t),d]);if(0===o.length)return ty([...h,r,"/>"]);if(1===o.length&&1===s.chardata.filter(t=>t.TEXT).length)return ty([D,tC([tA,o[0].printed]),tA,d]);let i=tF;o.length===s.chardata.filter(t=>t.TEXT).length+s.reference.length&&(i=" ");let u=[tF],a=o[0].startLine;return o.forEach((t,e)=>{0!==e&&(t.startLine-a>=2?u.push(tF,tF):u.push(i)),u.push(t.printed),a=t.endLine}),ty([D,tC(u),tF,d])}return ty([D,tC(t.call(n,"content")),d])}(t,e,n);case"externalID":return function(t,e,n){let{Public:r,PubIDLiteral:o,System:i,SystemLiteral:u}=t.getValue();return i?ty([i,tC([tv,u])]):ty([ty([r,tC([tv,o])]),tC([tv,u])])}(t,0,0);case"misc":return function(t,e,n){let{Comment:r,PROCESSING_INSTRUCTION:o,SEA_WS:i}=t.getValue();return r||o||i}(t,0,0);case"prolog":return function(t,e,n){let{XMLDeclOpen:r,attribute:o,SPECIAL_CLOSE:i}=t.getValue(),u=[r];return o&&u.push(tC([tA,tg(tv,t.map(n,"attribute"))])),ty([...u,e.xmlSelfClosingSpace?tv:tA,i])}(t,e,n);case"reference":return function(t,e,n){let{CharRef:r,EntityRef:o}=t.getValue();return r||o}(t,0,0);default:throw Error(`Unknown node type: ${r.name}`)}}}},options:{xmlSelfClosingSpace:{type:"boolean",category:"XML",default:!0,description:"Adds a space before self-closing tags.",since:"1.1.0"},xmlWhitespaceSensitivity:{type:"choice",category:"XML",default:"strict",description:"How to handle whitespaces in XML.",choices:[{value:"strict",description:"Whitespaces are considered sensitive in all elements."},{value:"preserve",description:"Whitespaces within text nodes in XML elements and attributes are considered sensitive."},{value:"ignore",description:"Whitespaces are considered insensitive in all elements."}],since:"0.6.0"},xmlSortAttributesByKey:{type:"boolean",category:"XML",default:!1,description:"Orders XML attributes by key alphabetically while prioritizing xmlns attributes."},xmlQuoteAttributes:{type:"choice",category:"XML",default:"preserve",description:"How to handle whitespaces in XML.",choices:[{value:"preserve",description:"Quotes in attribute values will be preserved as written."},{value:"single",description:"Quotes in attribute values will be converted to consistent single quotes and other quotes in the string will be escaped."},{value:"double",description:"Quotes in attribute values will be converted to consistent double quotes and other quotes in the string will be escaped."}]}},defaultOptions:{printWidth:80,tabWidth:2}}}}]);