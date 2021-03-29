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
	else if(typeof exports === 'object')
		exports["littlemodal"] = factory();
	else
		root["littlemodal"] = factory();
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Little-Modal.js":
/*!*****************************!*\
  !*** ./src/Little-Modal.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ LittleModal; }\n/* harmony export */ });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n//import resize from './Resize.js'\nfunction getTemplate(o) {\n  var $modal = document.createElement('div');\n  $modal.classList.add('little-modal');\n  $modal.insertAdjacentHTML('afterbegin', \"\\n\\t\\t\\t<div class=\\\"little-modal-title\\\" data-type=\\\"title\\\">\".concat(o.title, \" <button>&#120;</button></div>\\n\\t\\t\\t<div class=\\\"little-modal-body\\\">\\n\\t\\t\\t\\t<div class=\\\"dLeft\\\" data-type=\\\"left\\\"></div>\\n\\t\\t\\t\\t<div class=\\\"dBottom\\\" data-type=\\\"bottom\\\"></div>\\n\\t\\t\\t\\t<div class=\\\"dRight\\\" data-type=\\\"right\\\"></div>\\n\\t\\t\\t\\t<div class=\\\"inner-place\\\">\\n\\t\\t\\t\\t\\t<div class=\\\"wrap\\\">\\n\\t\\t\\t\\t\\t\\t\").concat(o.inner, \"\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class=\\\"little-modal-button-place\\\" \").concat(o.OK || o.CANSEL ? \"style='display: block;'\" : '', \">\\n\\t\\t\\t\\t\").concat(o.OK ? \"<button data-type=\\\"OK\\\">\".concat(o.OK, \"</button>\") : '', \"\\n\\t\\t\\t\\t\").concat(o.CANSEL ? \"<button data-type=\\\"CANSEL\\\">\".concat(o.CANSEL, \"</button>\") : '', \"\\n\\t\\t\\t</div>\\n\\t\\t\"));\n  return $modal;\n}\n\nvar LittleModal = /*#__PURE__*/function () {\n  function LittleModal() {\n    var _o$inner, _o$title, _o$OK, _o$CANSEL, _o$wWidth, _o$wHeight, _o$target;\n\n    var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n\n    _classCallCheck(this, LittleModal);\n\n    this.options = {};\n    this.options.inner = (_o$inner = o.inner) !== null && _o$inner !== void 0 ? _o$inner : '';\n    this.options.title = (_o$title = o.title) !== null && _o$title !== void 0 ? _o$title : 'Little modal';\n    this.options.OK = (_o$OK = o.OK) !== null && _o$OK !== void 0 ? _o$OK : false;\n    this.options.CANSEL = (_o$CANSEL = o.CANSEL) !== null && _o$CANSEL !== void 0 ? _o$CANSEL : false;\n    this.options.wWidth = (_o$wWidth = o.wWidth) !== null && _o$wWidth !== void 0 ? _o$wWidth : 300;\n    this.options.wHeight = (_o$wHeight = o.wHeight) !== null && _o$wHeight !== void 0 ? _o$wHeight : 150;\n    this.$element = null;\n    this.target = (_o$target = o.target) !== null && _o$target !== void 0 ? _o$target : \"body\";\n    this.scope = document.querySelector(o.scope) || false;\n    this.tochX = 0;\n    this.tochY = 0;\n    this.valueX = 0; //Math.round(Math.random()*1000)\n\n    this.valueY = 0; //Math.round(Math.random()*1000)\n\n    this.borderXMin = 0;\n    this.borderXMax = 0;\n    this.borderYMin = 0;\n    this.borderYMax = 0;\n    this.$body = document.querySelector('body');\n\n    if (this.scope) {\n      this.scope.style.position = 'relative';\n    }\n  }\n\n  _createClass(LittleModal, [{\n    key: \"init\",\n    value: function init() {\n      var _this$$element,\n          _this = this;\n\n      //если элемент есть, не инициализируем\n      if (this.$element !== null) {\n        return;\n      }\n\n      var $element = (_this$$element = this.$element) !== null && _this$$element !== void 0 ? _this$$element : getTemplate(this.options);\n      var maxWidth = this.options.wWidth;\n      var maxHeight = this.options.wHeight;\n      this.$element = $element;\n      this.$elTitle = $element.querySelector('.little-modal-title');\n      this.$elClose = this.$elTitle.querySelector('button');\n      this.$elBody = $element.querySelector('.little-modal-body');\n      this.$elDragLeft = $element.querySelector('.dLeft');\n      this.$elDragBottom = $element.querySelector('.dBottom');\n      this.$elDragRight = $element.querySelector('.dRight');\n      this.$elInner = $element.querySelector('.little-modal .inner-place');\n      this.$elBtnPlace = $element.querySelector('.little-modal-button-place');\n      this.$element.style.width = maxWidth === \"auto\" ? \"auto\" : maxWidth + 'px';\n      this.$element.style.height = maxHeight === \"auto\" ? \"auto\" : maxHeight + 'px';\n      document.querySelector(this.target) ? document.querySelector(this.target).appendChild(this.$element) : document.body.insertAdjacentElement('afterbegin', this.$element);\n      var padding = 3;\n      var hElement = this.$element.getBoundingClientRect().height;\n      var hTitle = this.$elTitle.getBoundingClientRect().height;\n      var hInner = this.$elInner.getBoundingClientRect().height;\n      var hBtnPlace = this.$elBtnPlace.getBoundingClientRect().height;\n      var height = hElement - hTitle - hBtnPlace - padding * 2;\n      this.$elInner.style.padding = padding + 'px';\n\n      if (height > 30) {\n        this.$elInner.style.height = height + 'px';\n      } else {\n        this.$element.style.height = \"auto\";\n        this.maxHeight = this.$element.getBoundingClientRect().height;\n        console.log('height to small');\n      }\n\n      ['downDragLeftHandler', 'downDragBottomHandler', 'downDragRightHandler', 'mouseMoveDragLeftHandler', 'mouseMoveDragBottomHandler', 'mouseMoveDragRightHandler', 'mouseDownHandler', 'mouseUpHandler', 'onButton', 'mouseMoveHandler', 'onResize', 'onClose'].forEach(function (element) {\n        return _this[element] = _this[element].bind(_this);\n      });\n      window.addEventListener('resize', this.onResize);\n      this.$elClose.addEventListener('click', this.onClose);\n      this.$elBtnPlace.addEventListener('click', this.onButton);\n      this.$elTitle.addEventListener('mousedown', this.mouseDownHandler);\n      this.$elDragLeft.addEventListener('mousedown', this.downDragLeftHandler);\n      this.$elDragBottom.addEventListener('mousedown', this.downDragBottomHandler);\n      this.$elDragRight.addEventListener('mousedown', this.downDragRightHandler);\n      this.calculate();\n    } //пересчет переменых\n\n  }, {\n    key: \"calculate\",\n    value: function calculate() {\n      this.tochX = 0;\n      this.tochY = 0;\n      this.elementWidth = this.$element.offsetWidth;\n      this.elementHeight = this.$element.offsetHeight;\n      this.windowWidth = window.innerWidth;\n      this.windowHeight = window.innerHeight;\n      this.borderXMax = this.windowWidth;\n      this.borderYMax = this.windowHeight; //если есть внешние рамки то берем их\n\n      if (this.scope) {\n        var scope = this.scope.getBoundingClientRect();\n        this.borderXMin = scope.left;\n        this.borderXMax = scope.right;\n        this.borderYMin = scope.top;\n        this.borderYMax = scope.bottom;\n        this.windowWidth = scope.width;\n        this.windowHeight = scope.height;\n      }\n\n      this.limitWidth = this.windowWidth - this.elementWidth;\n      this.limitHeight = this.windowHeight - this.elementHeight;\n      this.setPosition(this.valueX, this.valueY);\n    } //для обертки открыть\n\n  }, {\n    key: \"open\",\n    value: function open(params) {\n      console.log(params);\n\n      for (var key in params) {\n        if (this.options[key] !== 'undefined') {\n          this.options[key] = params[key];\n        }\n      }\n\n      this.init();\n    } //для обертки закрыть\n\n  }, {\n    key: \"close\",\n    value: function close() {\n      if (this.$element !== null) this.destroy();\n    } //двигаем окно\n\n  }, {\n    key: \"setPosition\",\n    value: function setPosition(x, y) {\n      var minX = this.tochX;\n      var maxX = this.windowWidth - this.elementWidth + this.tochX;\n      var minY = this.tochY;\n      var maxY = this.windowHeight - this.elementHeight + this.tochY;\n      this.valueX = x - this.tochX;\n      this.valueY = y - this.tochY;\n      this.valueX = this.valueX > 0 ? this.valueX : 0;\n      this.valueX = this.valueX > this.limitWidth ? this.limitWidth : this.valueX;\n      this.valueY = this.valueY > 0 ? this.valueY : 0;\n      this.valueY = this.valueY > this.limitHeight ? this.limitHeight : this.valueY;\n      this.valueX = x > minX ? this.valueX : 0;\n      this.valueX = x > maxX ? this.limitWidth : this.valueX;\n      this.valueY = y > minY ? this.valueY : 0;\n      this.valueY = y > maxY ? this.limitHeight : this.valueY;\n      this.$element.style.left = this.valueX + 'px';\n      this.$element.style.top = this.valueY + 'px';\n    }\n  }, {\n    key: \"onClose\",\n    value: function onClose(e) {\n      this.close();\n    }\n  }, {\n    key: \"onButton\",\n    value: function onButton(e) {\n      switch (e.target.getAttribute('data-type')) {\n        case 'OK':\n          this.options.onOk && this.options.onOk.call(this.options, e);\n          break;\n\n        case 'CANSEL':\n          this.options.onCansel && this.options.onCansel.call(this.options, e);\n          break;\n      }\n    }\n  }, {\n    key: \"onResize\",\n    value: function onResize(e) {\n      this.calculate();\n    }\n  }, {\n    key: \"downDragLeftHandler\",\n    value: function downDragLeftHandler(e) {\n      console.log('downDragLeftHandler');\n      this.dragX = e.clientX;\n      this.mouseUpHandler(e);\n      document.addEventListener('mousemove', this.mouseMoveDragLeftHandler);\n      document.addEventListener('mouseup', this.mouseUpHandler);\n    }\n  }, {\n    key: \"downDragBottomHandler\",\n    value: function downDragBottomHandler(e) {\n      console.log('downDragBottomHandler');\n      this.dragY = e.clientY;\n      this.mouseUpHandler(e);\n      document.addEventListener('mousemove', this.mouseMoveDragBottomHandler);\n      document.addEventListener('mouseup', this.mouseUpHandler);\n    }\n  }, {\n    key: \"downDragRightHandler\",\n    value: function downDragRightHandler(e) {\n      console.log('downDragRightHandler');\n      this.dragX = e.clientX;\n      this.mouseUpHandler(e);\n      document.addEventListener('mousemove', this.mouseMoveDragRightHandler);\n      document.addEventListener('mouseup', this.mouseUpHandler);\n    }\n  }, {\n    key: \"mouseMoveDragLeftHandler\",\n    value: function mouseMoveDragLeftHandler(e) {\n      console.log('left');\n\n      if (this.limits(e.clientX, e.clientY)) {\n        var x = this.dragX - e.clientX;\n        this.dragX = e.clientX;\n        this.valueX = this.valueX - x;\n        this.elementWidth = this.elementWidth + x;\n        this.$element.style.width = this.elementWidth + 'px';\n        this.$element.style.left = this.valueX + 'px';\n      }\n    }\n  }, {\n    key: \"mouseMoveDragBottomHandler\",\n    value: function mouseMoveDragBottomHandler(e) {\n      console.log('bottom');\n\n      if (this.limits(e.clientX, e.clientY)) {\n        var y = this.dragY - e.clientY;\n        this.dragY = e.clientY;\n        this.elementHeight = this.elementHeight - y;\n        this.$element.style.height = this.elementHeight + 'px';\n      }\n    }\n  }, {\n    key: \"mouseMoveDragRightHandler\",\n    value: function mouseMoveDragRightHandler(e) {\n      console.log('right');\n\n      if (this.limits(e.clientX, e.clientY)) {\n        var x = this.dragX - e.clientX;\n        this.dragX = e.clientX;\n        this.elementWidth = this.elementWidth - x;\n        this.$element.style.width = this.elementWidth + 'px';\n      }\n    }\n  }, {\n    key: \"mouseDownHandler\",\n    value: function mouseDownHandler(e) {\n      this.tochX = e.clientX - this.$element.getBoundingClientRect().left;\n      this.tochY = e.clientY - this.$element.getBoundingClientRect().top;\n\n      if (this.scope) {\n        var scope = this.scope.getBoundingClientRect();\n        this.tochX = e.clientX - this.$element.getBoundingClientRect().left + scope.left;\n        this.tochY = e.clientY - this.$element.getBoundingClientRect().top + scope.top;\n      }\n\n      document.addEventListener('mouseup', this.mouseUpHandler);\n      document.addEventListener('mousemove', this.mouseMoveHandler);\n    }\n  }, {\n    key: \"mouseUpHandler\",\n    value: function mouseUpHandler(e) {\n      document.removeEventListener('mousemove', this.mouseMoveHandler);\n      document.removeEventListener('mouseup', this.mouseUpHandler);\n      document.removeEventListener('mousemove', this.mouseMoveDragLeftHandler);\n      document.removeEventListener('mousemove', this.mouseMoveDragBottomHandler);\n      document.removeEventListener('mousemove', this.mouseMoveDragRightHandler);\n      this.calculate();\n    }\n  }, {\n    key: \"mouseMoveHandler\",\n    value: function mouseMoveHandler(e) {\n      if (this.limits(e.clientX, e.clientY)) {\n        this.setPosition(e.clientX, e.clientY);\n      }\n    }\n  }, {\n    key: \"limits\",\n    value: function limits(x, y) {\n      if (x > this.borderXMin && x < this.borderXMax && y > this.borderYMin && y < this.borderYMax) {\n        return true;\n      }\n\n      return false;\n    }\n  }, {\n    key: \"destroy\",\n    value: function destroy() {\n      this.$elClose.removeEventListener('onclick', this.onClose);\n      window.removeEventListener('resize', this.onResize);\n      this.$elTitle.removeEventListener('mousedown', this.mouseDownHandler);\n      this.$elBtnPlace.removeEventListener('click', this.onButton);\n      this.$element.parentNode.removeChild(this.$element);\n      this.$element = null;\n    }\n  }]);\n\n  return LittleModal;\n}();\n\n\n\n//# sourceURL=webpack://littlemodal/./src/Little-Modal.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Little_Modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Little-Modal.js */ \"./src/Little-Modal.js\");\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ \"./src/style.scss\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  //обертка для класса\n  init: function init() {\n    var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n    var instance = null;\n    return {\n      open: function open() {\n        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n        instance = instance === null ? new _Little_Modal_js__WEBPACK_IMPORTED_MODULE_0__.default(o) : instance;\n        instance.open(params);\n      },\n      close: function close() {\n        if (instance !== null) instance.close();else console.log('is it already closed');\n      }\n    };\n  }\n});\n\n//# sourceURL=webpack://littlemodal/./src/index.js?");

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://littlemodal/./src/style.scss?");

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
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	__webpack_exports__ = __webpack_exports__.default;
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});