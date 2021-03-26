/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Little-Modal.js":
/*!*****************************!*\
  !*** ./src/Little-Modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ LittleModal)\n/* harmony export */ });\n/* harmony import */ var _Resize_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Resize.js */ \"./src/Resize.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nfunction getTemplate(o) {\n  var $modal = document.createElement('div');\n  $modal.classList.add('little-modal-place');\n  $modal.insertAdjacentHTML('afterbegin', \"\\n\\t\\t\\t<div class=\\\"title\\\">Little modal</div>\\n\\t\\t\\t<div class=\\\"body\\\">\\n\\t\\t\\t\\t<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime a explicabo consectetur vitae ex eaque animi blanditiis quidem magnam corrupti incidunt sit amet, dolore nemo numquam quis! Nobis, dolor, laudantium.</div>\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class=\\\"button-place\\\">\\n\\t\\t\\t\\t<button data-type=\\\"OK\\\">Ok</button>\\n\\t\\t\\t\\t<button data-type=\\\"CANSEL\\\">Cansel</button>\\n\\t\\t\\t</div>\\n\\t\\t\");\n  return $modal;\n}\n\nvar LittleModal = /*#__PURE__*/function () {\n  function LittleModal() {\n    var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';\n    var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n    _classCallCheck(this, LittleModal);\n\n    var $element = getTemplate(this.options);\n    this.scope = document.querySelector(o.scope) || false;\n    this.tochX = 0;\n    this.tochY = 0;\n    this.valueX = 0;\n    this.valueY = 0;\n    this.borderXMin = 0;\n    this.borderXMax = 0;\n    this.borderYMin = 0;\n    this.borderYMax = 0;\n    this.maxWidth = o.wWidth || 500;\n    this.maxHeight = o.wHeight || 300;\n    this.options = o;\n    this.$body = document.querySelector('body');\n    this.$element = $element;\n    this.$title = $element.querySelector('.title');\n    this.$elBody = $element.querySelector('.body');\n    this.$bntPlace = $element.querySelector('.button-place');\n    this.$element.style.width = \"\".concat(this.maxWidth, \"px\");\n    this.$element.style.height = \"\".concat(this.maxHeight, \"px\");\n    document.querySelector(element) ? document.querySelector(element).appendChild($element) : document.body.insertAdjacentElement('afterbegin', $element);\n\n    if (this.scope) {\n      this.scope.style.position = 'relative';\n    }\n\n    this.init();\n  }\n\n  _createClass(LittleModal, [{\n    key: \"init\",\n    value: function init() {\n      var _this = this;\n\n      this.calculate();\n      ['mouseDownHandler', 'mouseUpHandler', 'mouseMoveHandler', 'onResize'].forEach(function (element) {\n        return _this[element] = _this[element].bind(_this);\n      });\n      _Resize_js__WEBPACK_IMPORTED_MODULE_0__.default.add(this.onResize);\n      this.$title.addEventListener('mousedown', this.mouseDownHandler);\n    }\n  }, {\n    key: \"calculate\",\n    value: function calculate() {\n      this.tochX = 0;\n      this.tochY = 0;\n      this.elementWidth = this.$element.offsetWidth;\n      this.elementHeight = this.$element.offsetHeight;\n      this.windowWidth = window.innerWidth;\n      this.windowHeight = window.innerHeight;\n      this.borderXMax = this.windowWidth;\n      this.borderYMax = this.windowHeight; //если есть внешние рамки то берем их\n\n      if (this.scope) {\n        var scope = this.scope.getBoundingClientRect();\n        this.borderXMin = scope.left;\n        this.borderXMax = scope.right;\n        this.borderYMin = scope.top;\n        this.borderYMax = scope.bottom;\n        this.windowWidth = scope.width;\n        this.windowHeight = scope.height;\n      }\n\n      this.limitWidth = this.windowWidth - this.elementWidth;\n      this.limitHeight = this.windowHeight - this.elementHeight;\n      console.log(this.valueX, this.valueY);\n      this.setPosition(this.valueX, this.valueY);\n    }\n  }, {\n    key: \"onResize\",\n    value: function onResize(e) {\n      this.calculate();\n    }\n  }, {\n    key: \"mouseDownHandler\",\n    value: function mouseDownHandler(e) {\n      this.tochX = e.clientX - this.$element.getBoundingClientRect().left;\n      this.tochY = e.clientY - this.$element.getBoundingClientRect().top;\n\n      if (this.scope) {\n        var scope = this.scope.getBoundingClientRect();\n        this.tochX = e.clientX - this.$element.getBoundingClientRect().left + scope.left;\n        this.tochY = e.clientY - this.$element.getBoundingClientRect().top + scope.top;\n      }\n\n      document.addEventListener('mouseup', this.mouseUpHandler);\n      document.addEventListener('mousemove', this.mouseMoveHandler);\n    }\n  }, {\n    key: \"mouseUpHandler\",\n    value: function mouseUpHandler(e) {\n      document.removeEventListener('mousemove', this.mouseMoveHandler);\n      document.removeEventListener('mouseup', this.mouseUpHandler);\n    }\n  }, {\n    key: \"mouseMoveHandler\",\n    value: function mouseMoveHandler(e) {\n      if (e.clientX > this.borderXMin && e.clientX < this.borderXMax && e.clientY > this.borderYMin && e.clientY < this.borderYMax) {\n        this.setPosition(e.clientX, e.clientY);\n      }\n    }\n  }, {\n    key: \"setPosition\",\n    value: function setPosition(x, y) {\n      var minX = this.tochX;\n      var maxX = this.windowWidth - this.elementWidth + this.tochX;\n      var minY = this.tochY;\n      var maxY = this.windowHeight - this.elementHeight + this.tochY;\n      this.valueX = x - this.tochX;\n      this.valueY = y - this.tochY;\n      this.valueX = this.valueX > 0 ? this.valueX : 0;\n      this.valueX = this.valueX > this.limitWidth ? this.limitWidth : this.valueX;\n      this.valueY = this.valueY > 0 ? this.valueY : 0;\n      this.valueY = this.valueY > this.limitHeight ? this.limitHeight : this.valueY;\n      this.valueX = x > minX ? this.valueX : 0;\n      this.valueX = x > maxX ? this.limitWidth : this.valueX;\n      this.valueY = y > minY ? this.valueY : 0;\n      this.valueY = y > maxY ? this.limitHeight : this.valueY;\n      this.$element.style.left = this.valueX + 'px';\n      this.$element.style.top = this.valueY + 'px';\n    }\n  }]);\n\n  return LittleModal;\n}();\n\n\n\n//# sourceURL=webpack://little-modal/./src/Little-Modal.js?");

/***/ }),

/***/ "./src/Resize.js":
/*!***********************!*\
  !*** ./src/Resize.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/**\r\nhttps://developer.mozilla.org/ru/docs/Web/API/Window/resize_event\r\n*/\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((function () {\n  var callbacks = [],\n      running = false; // fired on resize event\n\n  function resize() {\n    if (!running) {\n      running = true;\n\n      if (window.requestAnimationFrame) {\n        window.requestAnimationFrame(runCallbacks);\n      } else {\n        setTimeout(runCallbacks, 66);\n      }\n    }\n  } // run the actual callbacks\n\n\n  function runCallbacks() {\n    callbacks.forEach(function (callback) {\n      callback();\n    });\n    running = false;\n  } // adds callback to loop\n\n\n  function addCallback(callback) {\n    if (callback) {\n      callbacks.push(callback);\n    }\n  }\n\n  return {\n    // public method to add additional callback\n    add: function add(callback) {\n      if (!callbacks.length) {\n        window.addEventListener('resize', resize);\n      }\n\n      addCallback(callback);\n    }\n  };\n})());\n\n//# sourceURL=webpack://little-modal/./src/Resize.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"LittleModal\": () => (/* reexport safe */ _Little_Modal_js__WEBPACK_IMPORTED_MODULE_0__.default)\n/* harmony export */ });\n/* harmony import */ var _Little_Modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Little-Modal.js */ \"./src/Little-Modal.js\");\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ \"./src/style.scss\");\n\n\n\n\n//# sourceURL=webpack://little-modal/./src/index.js?");

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://little-modal/./src/style.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});