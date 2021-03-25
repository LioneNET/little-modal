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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ LittleModal)\n/* harmony export */ });\nfunction ev_pos(ev, toElement) {\n  toElement = toElement || toElement.currentTarget;\n\n  var isNum = function (val) {\n    return typeof val === 'number' && !isNaN(val);\n  };\n\n  var toElementBoundingRect = toElement.getBoundingClientRect(),\n      orgEv = ev.originalEvent || ev,\n      hasTouches = ev.touches && ev.touches.length,\n      pageX = 0,\n      pageY = 0;\n\n  if (hasTouches) {\n    if (isNum(ev.touches[0].pageX) && isNum(ev.touches[0].pageY)) {\n      pageX = ev.touches[0].pageX;\n      pageY = ev.touches[0].pageY;\n    } else if (isNum(ev.touches[0].clientX) && isNum(ev.touches[0].clientY)) {\n      pageX = orgEv.touches[0].clientX;\n      pageY = orgEv.touches[0].clientY;\n    }\n  } else {\n    if (isNum(ev.pageX) && isNum(ev.pageY)) {\n      pageX = ev.pageX;\n      pageY = ev.pageY;\n    } else if (ev.currentPoint && isNum(ev.currentPoint.x) && isNum(ev.currentPoint.y)) {\n      pageX = ev.currentPoint.x;\n      pageY = ev.currentPoint.y;\n    }\n  }\n\n  return {\n    x: pageX - toElementBoundingRect.left,\n    y: pageY - toElementBoundingRect.top\n  };\n}\n\nfunction getTemplate(o) {\n  let $modal = document.createElement('div');\n  $modal.classList.add('little-modal-place');\n  $modal.insertAdjacentHTML('afterbegin', `\n\t\t\t<div class=\"title\">Little modal</div>\n\t\t\t<div class=\"body\">\n\t\t\t\t<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime a explicabo consectetur vitae ex eaque animi blanditiis quidem magnam corrupti incidunt sit amet, dolore nemo numquam quis! Nobis, dolor, laudantium.</div>\n\t\t\t\t<div>Saepe, nobis neque perspiciatis eligendi, consectetur soluta explicabo officiis sit distinctio, autem sed repudiandae, commodi voluptatum nesciunt sapiente! Ad aperiam reprehenderit beatae quae delectus amet officia sit, tempora impedit voluptates.</div>\n\t\t\t</div>\n\t\t\t<div class=\"button-place\">\n\t\t\t\t<button data-type=\"OK\">Ok</button>\n\t\t\t\t<button data-type=\"CANSEL\">Cansel</button>\n\t\t\t</div>\n\t\t`);\n  return $modal;\n}\n\nclass LittleModal {\n  constructor(element = 'body', o = {}) {\n    let $element = getTemplate(this.options);\n    this.scope = o.scope || false;\n    this.tochX = 0;\n    this.tochY = 0;\n    this.valueX = 0;\n    this.valueY = 0;\n    this.borderXMin = 0;\n    this.borderXMax = 0;\n    this.borderYMin = 0;\n    this.borderYMax = 0;\n    this.maxWidth = o.maxWidth || 500;\n    this.maxHeight = o.maxHeight || 300;\n    this.options = o;\n    this.$body = document.querySelector('body');\n    this.$element = $element;\n    this.$title = $element.querySelector('.title');\n    this.$elBody = $element.querySelector('.body');\n    this.$bntPlace = $element.querySelector('.button-place');\n    this.$element.style.maxWidth = `${this.maxWidth}px`;\n    this.$element.style.maxHeight = `${this.maxHeight}px`;\n    document.querySelector(element) ? document.querySelector(element).appendChild($element) : document.body.insertAdjacentElement('afterbegin', $element);\n    this.init();\n  }\n\n  init() {\n    this.elementWidth = this.$element.offsetWidth;\n    this.elementHeight = this.$element.offsetHeight;\n    this.windowWidth = window.innerWidth;\n    this.windowHeight = window.innerHeight; //если есть внешние рамки то берем их\n\n    if (this.scope) {\n      let $scope = document.querySelector(this.scope).getBoundingClientRect();\n      this.windowWidth = $scope.width;\n      this.windowHeight = $scope.height;\n    }\n\n    this.limitWidth = this.windowWidth - this.elementWidth;\n    this.limitHeight = this.windowHeight - this.elementHeight;\n    ['mouseDownHandler', 'mouseUpHandler', 'mouseMoveHandler'].forEach(element => this[element] = this[element].bind(this));\n    this.$title.addEventListener('mousedown', this.mouseDownHandler);\n  }\n\n  mouseDownHandler(e) {\n    this.tochX = e.clientX - this.$element.getBoundingClientRect().left;\n    this.tochY = e.clientY - this.$element.getBoundingClientRect().top;\n    console.log(this.tochX, this.tochY);\n    document.addEventListener('mouseup', this.mouseUpHandler);\n    document.addEventListener('mousemove', this.mouseMoveHandler);\n  }\n\n  mouseUpHandler(e) {\n    document.removeEventListener('mousemove', this.mouseMoveHandler);\n    document.removeEventListener('mouseup', this.mouseUpHandler);\n  }\n\n  mouseMoveHandler(e) {\n    if (e.clientX > 0 && e.clientX < this.windowWidth && e.clientY > 0 && e.clientY < this.windowHeight) {\n      this.setPosition(e);\n    }\n  }\n\n  setPosition(e) {\n    let minX = this.tochX;\n    let maxX = this.windowWidth - this.elementWidth + this.tochX;\n    let minY = this.tochY;\n    let maxY = this.windowHeight - this.elementHeight + this.tochY;\n    this.valueX = e.clientX - this.tochX;\n    this.valueY = e.clientY - this.tochY;\n    this.valueX = this.valueX > 0 ? this.valueX : 0;\n    this.valueX = this.valueX > this.limitWidth ? this.limitWidth : this.valueX;\n    this.valueY = this.valueY > 0 ? this.valueY : 0;\n    this.valueY = this.valueY > this.limitHeight ? this.limitHeight : this.valueY;\n    this.valueX = e.clientX > minX ? this.valueX : 0;\n    this.valueX = e.clientX > maxX ? this.limitWidth : this.valueX;\n    this.valueY = e.clientY > minY ? this.valueY : 0;\n    this.valueY = e.clientY > maxY ? this.limitHeight : this.valueY;\n    this.$element.style.left = this.valueX + 'px';\n    this.$element.style.top = this.valueY + 'px';\n  }\n\n}\n\n//# sourceURL=webpack://little-modal/./src/Little-Modal.js?");

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