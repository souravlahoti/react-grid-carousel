'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var styled = require('styled-components');
var debounce = require('lodash.debounce');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);
var debounce__default = /*#__PURE__*/_interopDefaultLegacy(debounce);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

var useRefProp = function (input) {
    var ref = react.useRef(input);
    ref.current = input;
    return ref;
};

var HANDLER_NAME_SPACE = '__react-grid-carousel-resize-handler';
var handleResize = debounce__default["default"](function (e) {
    var _a;
    Object.values((_a = window[HANDLER_NAME_SPACE]) !== null && _a !== void 0 ? _a : {}).forEach(function (handler) {
        if (typeof handler === 'function') {
            handler(e);
        }
    });
}, 16);
var setupListener = function () {
    window.addEventListener('resize', handleResize);
};
var removeListener = function () {
    window.removeEventListener('resize', handleResize);
};
var addResizeHandler = function (key, handler) {
    if (!window[HANDLER_NAME_SPACE]) {
        window[HANDLER_NAME_SPACE] = {};
        setupListener();
    }
    window[HANDLER_NAME_SPACE][key] = handler;
};
var removeResizeHandler = function (key) {
    var _a, _b;
    (_a = window[HANDLER_NAME_SPACE]) === null || _a === void 0 ? true : delete _a[key];
    if (!Object.keys((_b = window[HANDLER_NAME_SPACE]) !== null && _b !== void 0 ? _b : {})) {
        delete window[HANDLER_NAME_SPACE];
        removeListener();
    }
};

var Button = styled__default["default"].span(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["\n  position: absolute;\n  top: calc(50% - 14px);\n  height: 28px;\n  width: 28px;\n  background: #fff;\n  border-radius: 50%;\n  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;\n  z-index: 10;\n  cursor: pointer;\n  font-size: 10px;\n  opacity: 0.6;\n  transition: opacity 0.25s;\n  left: ", ";\n  right: ", ";\n\n  &:hover {\n    opacity: 1;\n  }\n\n  &::before {\n    content: '';\n    height: 8px;\n    width: 8px;\n    background: transparent;\n    border-top: 2px solid #777;\n    border-right: 2px solid #777;\n    display: inline-block;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: ", ";\n  }\n"], ["\n  position: absolute;\n  top: calc(50% - 14px);\n  height: 28px;\n  width: 28px;\n  background: #fff;\n  border-radius: 50%;\n  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;\n  z-index: 10;\n  cursor: pointer;\n  font-size: 10px;\n  opacity: 0.6;\n  transition: opacity 0.25s;\n  left: ", ";\n  right: ", ";\n\n  &:hover {\n    opacity: 1;\n  }\n\n  &::before {\n    content: '';\n    height: 8px;\n    width: 8px;\n    background: transparent;\n    border-top: 2px solid #777;\n    border-right: 2px solid #777;\n    display: inline-block;\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: ", ";\n  }\n"])), function (_a) {
    var type = _a.type;
    return (type === 'prev' ? '-14px' : 'initial');
}, function (_a) {
    var type = _a.type;
    return (type === 'next' ? '-14px' : 'initial');
}, function (_a) {
    var type = _a.type;
    return type === 'prev' ? 'translate(-25%, -50%) rotate(-135deg)' : 'translate(-75%, -50%) rotate(45deg)';
});
var ArrowButton = function (_a) {
    var type = _a.type, CustomBtn = _a.CustomBtn, props = __rest(_a, ["type", "CustomBtn"]);
    return (jsxRuntime.jsx("div", __assign({}, props, { children: CustomBtn ? typeof CustomBtn === 'function' ? jsxRuntime.jsx(CustomBtn, {}) : CustomBtn : jsxRuntime.jsx(Button, { type: type }) })));
};
var templateObject_1$1;

var Container = styled__default["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n"], ["\n  position: relative;\n"])));
var RailWrapper = styled__default["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  overflow: hidden;\n  // overflow-x: auto;\n  // margin: 0;\n  // scroll-snap-type: ", ";\n  // scrollbar-width: none;\n  //\n  // &::-webkit-scrollbar {\n  //   display: none;\n  // }\n"], ["\n  overflow: hidden;\n  // overflow-x: auto;\n  // margin: 0;\n  // scroll-snap-type: ", ";\n  // scrollbar-width: none;\n  //\n  // &::-webkit-scrollbar {\n  //   display: none;\n  // }\n"])), function (_a) {
    var scrollSnap = _a.scrollSnap;
    return (scrollSnap ? 'x mandatory' : '');
});
var Rail = styled__default["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: grid;\n  grid-column-gap: ", ";\n  position: relative;\n  transition: transform 0.5s cubic-bezier(0.2, 1, 0.3, 1) 0s;\n  grid-template-columns: ", ";\n  transform: ", ";\n"], ["\n  display: grid;\n  grid-column-gap: ", ";\n  position: relative;\n  transition: transform 0.5s cubic-bezier(0.2, 1, 0.3, 1) 0s;\n  grid-template-columns: ", ";\n  transform: ", ";\n"])), function (_a) {
    var gap = _a.gap;
    return "".concat(gap, "px");
}, function (_a) {
    var page = _a.page;
    return "repeat(".concat(page, ", 100%)");
}, function (_a) {
    var currentPage = _a.currentPage, gap = _a.gap;
    return "translateX(calc(".concat(-100 * currentPage, "% - ").concat(gap * currentPage, "px))");
});
var ItemSet = styled__default["default"].div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: grid;\n  grid-template-columns: ", ";\n  grid-template-rows: ", ";\n  grid-gap: ", ";\n"], ["\n  display: grid;\n  grid-template-columns: ", ";\n  grid-template-rows: ", ";\n  grid-gap: ", ";\n"])), function (_a) {
    var cols = _a.cols;
    return "repeat(".concat(cols, ", 1fr)");
}, function (_a) {
    var rows = _a.rows;
    return "repeat(".concat(rows, ", 1fr)");
}, function (_a) {
    var gap = _a.gap;
    return "".concat(gap, "px");
});
var Item = styled__default["default"].div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  scroll-snap-align: ", ";\n"], ["\n  scroll-snap-align: ", ";\n"])), function (_a) {
    var scrollSnap = _a.scrollSnap;
    return (scrollSnap ? 'center' : '');
});
var CAROUSEL_ITEM = 'CAROUSEL_ITEM';
function Carousel(_a) {
    var _b = _a.cols, colsProp = _b === void 0 ? 1 : _b, _c = _a.rows, rowsProp = _c === void 0 ? 1 : _c, _d = _a.gap, gapProp = _d === void 0 ? 10 : _d, _e = _a.loop, loopProp = _e === void 0 ? false : _e, _f = _a.scrollSnap, scrollSnap = _f === void 0 ? true : _f, _g = _a.hideArrow, hideArrow = _g === void 0 ? false : _g, arrowLeft = _a.arrowLeft, arrowRight = _a.arrowRight, containerClassName = _a.containerClassName, containerStyle = _a.containerStyle, children = _a.children, _h = _a.startPage, startPage = _h === void 0 ? 0 : _h, onPageChanged = _a.onPageChanged;
    var _j = react.useState(startPage), currentPage = _j[0], setCurrentPage = _j[1];
    var _k = react.useState(colsProp), cols = _k[0], setCols = _k[1];
    var _l = react.useState(rowsProp), rows = _l[0], setRows = _l[1];
    var _m = react.useState(0), gap = _m[0], setGap = _m[1];
    var _o = react.useState(loopProp), loop = _o[0], setLoop = _o[1];
    var _p = react.useState(0), railWrapperWidth = _p[0], setRailWrapperWidth = _p[1];
    var _q = react.useState(false), hasSetResizeHandler = _q[0], setHasSetResizeHandler = _q[1];
    var railWrapperRef = react.useRef(null);
    var randomKey = react.useMemo(function () { return "".concat(Math.random(), "-").concat(Math.random()); }, []);
    var onPageChangedRef = useRefProp(onPageChanged);
    react.useEffect(function () {
        var _a;
        (_a = onPageChangedRef.current) === null || _a === void 0 ? void 0 : _a.call(onPageChangedRef, currentPage);
    }, [currentPage]);
    var handleRailWrapperResize = react.useCallback(function () {
        railWrapperRef.current && setRailWrapperWidth(railWrapperRef.current.offsetWidth);
    }, [railWrapperRef]);
    var setResizeHandler = react.useCallback(function () {
        addResizeHandler("gapCalculator-".concat(randomKey), handleRailWrapperResize);
        setHasSetResizeHandler(true);
    }, [randomKey, handleRailWrapperResize]);
    var rmResizeHandler = react.useCallback(function () {
        removeResizeHandler("gapCalculator-".concat(randomKey));
        setHasSetResizeHandler(false);
    }, [randomKey]);
    var parseGap = react.useCallback(function (gap) {
        var _a;
        var parsed = gap;
        var shouldSetResizeHandler = false;
        if (typeof gap !== 'number') {
            switch ((_a = /\D*$/.exec(gap)) === null || _a === void 0 ? void 0 : _a[0]) {
                case 'px': {
                    parsed = +gap.replace('px', '');
                    break;
                }
                case '%': {
                    var wrapperWidth = railWrapperWidth || (railWrapperRef.current ? railWrapperRef.current.offsetWidth : 0);
                    parsed = (wrapperWidth * gap.replace('%', '')) / 100;
                    shouldSetResizeHandler = true;
                    break;
                }
                default: {
                    parsed = 0;
                    console.error("Doesn't support the provided measurement unit: ".concat(gap));
                }
            }
        }
        shouldSetResizeHandler && !hasSetResizeHandler && setResizeHandler();
        !shouldSetResizeHandler && hasSetResizeHandler && rmResizeHandler();
        return parsed;
    }, [railWrapperWidth, railWrapperRef, hasSetResizeHandler, setResizeHandler, rmResizeHandler]);
    react.useEffect(function () {
        setCols(colsProp);
        setRows(rowsProp);
        setGap(parseGap(gapProp));
        setLoop(loopProp);
        setCurrentPage(0);
    }, [colsProp, rowsProp, gapProp, loopProp, parseGap]);
    var itemList = react.useMemo(function () { return react.Children.toArray(children).filter(function (child) { var _a; return ((_a = child === null || child === void 0 ? void 0 : child.type) === null || _a === void 0 ? void 0 : _a.displayName) === CAROUSEL_ITEM; }); }, [children]);
    var itemAmountPerSet = cols * rows;
    var itemSetList = react.useMemo(function () {
        return itemList.reduce(function (result, item, i) {
            var itemComponent = (jsxRuntime.jsx(Item, __assign({ scrollSnap: scrollSnap }, { children: item }), i));
            if (i % itemAmountPerSet === 0) {
                result.push([itemComponent]);
            }
            else {
                result[result.length - 1].push(itemComponent);
            }
            return result;
        }, []);
    }, [itemList, itemAmountPerSet, scrollSnap]);
    var page = Math.ceil(itemList.length / itemAmountPerSet);
    var handlePrev = react.useCallback(function () {
        setCurrentPage(function (p) {
            var prevPage = p - 1;
            if (loop && prevPage < 0) {
                return page - 1;
            }
            return prevPage;
        });
    }, [loop, page]);
    var handleNext = react.useCallback(function () {
        railWrapperRef.current;
        setCurrentPage(function (p) {
            var nextPage = p + 1;
            if (nextPage >= page) {
                return loop ? 0 : p;
            }
            return nextPage;
        });
    }, [loop, page, gap, railWrapperRef, scrollSnap]);
    react.useCallback(function (page) {
        setCurrentPage(page);
    }, []);
    return (jsxRuntime.jsxs(Container, __assign({ className: containerClassName, style: containerStyle }, { children: [jsxRuntime.jsx(ArrowButton, { type: "prev", hidden: hideArrow || (!loop && currentPage <= 0), CustomBtn: arrowLeft, onClick: handlePrev }), jsxRuntime.jsx(RailWrapper, __assign({ scrollSnap: scrollSnap, ref: railWrapperRef }, { children: jsxRuntime.jsx(Rail, __assign({ cols: cols, rows: rows, page: page, gap: gap, currentPage: currentPage }, { children: itemSetList.map(function (set, i) { return (jsxRuntime.jsx(ItemSet, __assign({ cols: cols, rows: rows, gap: gap }, { children: set }), i)); }) })) })), jsxRuntime.jsx(ArrowButton, { type: "next", hidden: hideArrow || (!loop && currentPage === page - 1), CustomBtn: arrowRight, onClick: handleNext })] })));
}
var CarouselItem = function (_a) {
    var children = _a.children;
    return jsxRuntime.jsx(jsxRuntime.Fragment, { children: children });
};
Carousel.Item = CarouselItem;
Carousel.Item.displayName = CAROUSEL_ITEM;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;

module.exports = Carousel;
