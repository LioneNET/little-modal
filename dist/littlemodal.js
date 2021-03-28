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
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ src)
});

;// CONCATENATED MODULE: ./src/Little-Modal.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//import resize from './Resize.js'
function getTemplate(o) {
  var $modal = document.createElement('div');
  $modal.classList.add('little-modal');
  $modal.insertAdjacentHTML('afterbegin', "\n\t\t\t<div class=\"little-modal-title\">".concat(o.title, " <button>&#120;</button></div>\n\t\t\t<div class=\"little-modal-body\">\n\t\t\t\t<div class=\"inner-place\">\n\t\t\t\t\t<div class=\"wrap\">\n\t\t\t\t\t\t").concat(o.inner, "\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"little-modal-button-place\" ").concat(o.OK || o.CANSEL ? "style='display: block;'" : '', ">\n\t\t\t\t").concat(o.OK ? "<button data-type=\"OK\">".concat(o.OK, "</button>") : '', "\n\t\t\t\t").concat(o.CANSEL ? "<button data-type=\"CANSEL\">".concat(o.CANSEL, "</button>") : '', "\n\t\t\t</div>\n\t\t"));
  return $modal;
}

var LittleModal = /*#__PURE__*/function () {
  function LittleModal() {
    var _o$inner, _o$title, _o$OK, _o$CANSEL, _o$wWidth, _o$wHeight, _o$target;

    var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, LittleModal);

    this.options = {};
    this.options.inner = (_o$inner = o.inner) !== null && _o$inner !== void 0 ? _o$inner : '';
    this.options.title = (_o$title = o.title) !== null && _o$title !== void 0 ? _o$title : 'Little modal';
    this.options.OK = (_o$OK = o.OK) !== null && _o$OK !== void 0 ? _o$OK : false;
    this.options.CANSEL = (_o$CANSEL = o.CANSEL) !== null && _o$CANSEL !== void 0 ? _o$CANSEL : false;
    this.options.wWidth = (_o$wWidth = o.wWidth) !== null && _o$wWidth !== void 0 ? _o$wWidth : 300;
    this.options.wHeight = (_o$wHeight = o.wHeight) !== null && _o$wHeight !== void 0 ? _o$wHeight : 150;
    this.$element = null;
    this.target = (_o$target = o.target) !== null && _o$target !== void 0 ? _o$target : "body";
    this.scope = document.querySelector(o.scope) || false;
    this.tochX = 0;
    this.tochY = 0;
    this.valueX = 0; //Math.round(Math.random()*1000)

    this.valueY = 0; //Math.round(Math.random()*1000)

    this.borderXMin = 0;
    this.borderXMax = 0;
    this.borderYMin = 0;
    this.borderYMax = 0;
    this.$body = document.querySelector('body');

    if (this.scope) {
      this.scope.style.position = 'relative';
    }
  }

  _createClass(LittleModal, [{
    key: "init",
    value: function init() {
      var _this$$element,
          _this = this;

      //если элемент есть, не инициализируем
      if (this.$element !== null) {
        return;
      }

      var $element = (_this$$element = this.$element) !== null && _this$$element !== void 0 ? _this$$element : getTemplate(this.options);
      var maxWidth = this.options.wWidth;
      var maxHeight = this.options.wHeight;
      this.$element = $element;
      this.$elTitle = $element.querySelector('.little-modal-title');
      this.$elClose = this.$elTitle.querySelector('button');
      this.$elBody = $element.querySelector('.little-modal-body');
      this.$elInner = $element.querySelector('.little-modal .inner-place');
      this.$elBtnPlace = $element.querySelector('.little-modal-button-place');
      this.$element.style.width = maxWidth === "auto" ? "auto" : maxWidth + 'px';
      this.$element.style.height = maxHeight === "auto" ? "auto" : maxHeight + 'px';
      document.querySelector(this.target) ? document.querySelector(this.target).appendChild(this.$element) : document.body.insertAdjacentElement('afterbegin', this.$element);
      var padding = 3;
      var hElement = this.$element.getBoundingClientRect().height;
      var hTitle = this.$elTitle.getBoundingClientRect().height;
      var hInner = this.$elInner.getBoundingClientRect().height;
      var hBtnPlace = this.$elBtnPlace.getBoundingClientRect().height;
      var height = hElement - hTitle - hBtnPlace - padding * 2;
      this.$elInner.style.padding = padding + 'px';

      if (height > 30) {
        this.$elInner.style.height = height + 'px';
      } else {
        this.$element.style.height = "auto";
        this.maxHeight = this.$element.getBoundingClientRect().height;
        console.log('height to small');
      }

      ['mouseDownHandler', 'mouseUpHandler', 'onButton', 'mouseMoveHandler', 'onResize', 'onClose'].forEach(function (element) {
        return _this[element] = _this[element].bind(_this);
      });
      window.addEventListener('resize', this.onResize);
      this.$elClose.addEventListener('click', this.onClose);
      this.$elBtnPlace.addEventListener('click', this.onButton);
      this.$elTitle.addEventListener('mousedown', this.mouseDownHandler);
      this.calculate();
    } //пересчет переменых

  }, {
    key: "calculate",
    value: function calculate() {
      this.tochX = 0;
      this.tochY = 0;
      this.elementWidth = this.$element.offsetWidth;
      this.elementHeight = this.$element.offsetHeight;
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
      this.borderXMax = this.windowWidth;
      this.borderYMax = this.windowHeight; //если есть внешние рамки то берем их

      if (this.scope) {
        var scope = this.scope.getBoundingClientRect();
        this.borderXMin = scope.left;
        this.borderXMax = scope.right;
        this.borderYMin = scope.top;
        this.borderYMax = scope.bottom;
        this.windowWidth = scope.width;
        this.windowHeight = scope.height;
      }

      this.limitWidth = this.windowWidth - this.elementWidth;
      this.limitHeight = this.windowHeight - this.elementHeight;
      this.setPosition(this.valueX, this.valueY);
    } //для обертки открыть

  }, {
    key: "open",
    value: function open(params) {
      console.log(params);

      for (var key in params) {
        if (this.options[key] !== 'undefined') {
          this.options[key] = params[key];
        }
      }

      this.init();
    } //для обертки закрыть

  }, {
    key: "close",
    value: function close() {
      if (this.$element !== null) this.destroy();
    } //двигаем окно

  }, {
    key: "setPosition",
    value: function setPosition(x, y) {
      var minX = this.tochX;
      var maxX = this.windowWidth - this.elementWidth + this.tochX;
      var minY = this.tochY;
      var maxY = this.windowHeight - this.elementHeight + this.tochY;
      this.valueX = x - this.tochX;
      this.valueY = y - this.tochY;
      this.valueX = this.valueX > 0 ? this.valueX : 0;
      this.valueX = this.valueX > this.limitWidth ? this.limitWidth : this.valueX;
      this.valueY = this.valueY > 0 ? this.valueY : 0;
      this.valueY = this.valueY > this.limitHeight ? this.limitHeight : this.valueY;
      this.valueX = x > minX ? this.valueX : 0;
      this.valueX = x > maxX ? this.limitWidth : this.valueX;
      this.valueY = y > minY ? this.valueY : 0;
      this.valueY = y > maxY ? this.limitHeight : this.valueY;
      this.$element.style.left = this.valueX + 'px';
      this.$element.style.top = this.valueY + 'px';
    }
  }, {
    key: "onClose",
    value: function onClose(e) {
      this.close();
    }
  }, {
    key: "onButton",
    value: function onButton(e) {
      switch (e.target.getAttribute('data-type')) {
        case 'OK':
          this.options.onOk && this.options.onOk.call(this.options, e);
          break;

        case 'CANSEL':
          this.options.onCansel && this.options.onCansel.call(this.options, e);
          break;
      }
    }
  }, {
    key: "onResize",
    value: function onResize(e) {
      this.calculate();
    }
  }, {
    key: "mouseDownHandler",
    value: function mouseDownHandler(e) {
      this.tochX = e.clientX - this.$element.getBoundingClientRect().left;
      this.tochY = e.clientY - this.$element.getBoundingClientRect().top;

      if (this.scope) {
        var scope = this.scope.getBoundingClientRect();
        this.tochX = e.clientX - this.$element.getBoundingClientRect().left + scope.left;
        this.tochY = e.clientY - this.$element.getBoundingClientRect().top + scope.top;
      }

      document.addEventListener('mouseup', this.mouseUpHandler);
      document.addEventListener('mousemove', this.mouseMoveHandler);
    }
  }, {
    key: "mouseUpHandler",
    value: function mouseUpHandler(e) {
      document.removeEventListener('mousemove', this.mouseMoveHandler);
      document.removeEventListener('mouseup', this.mouseUpHandler);
    }
  }, {
    key: "mouseMoveHandler",
    value: function mouseMoveHandler(e) {
      if (e.clientX > this.borderXMin && e.clientX < this.borderXMax && e.clientY > this.borderYMin && e.clientY < this.borderYMax) {
        this.setPosition(e.clientX, e.clientY);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.$elClose.removeEventListener('onclick', this.onClose);
      window.removeEventListener('resize', this.onResize);
      this.$elTitle.removeEventListener('mousedown', this.mouseDownHandler);
      this.$elBtnPlace.removeEventListener('click', this.onButton);
      this.$element.parentNode.removeChild(this.$element);
      this.$element = null;
    }
  }]);

  return LittleModal;
}();


;// CONCATENATED MODULE: ./src/index.js


/* harmony default export */ const src = ({
  //обертка для класса
  init: function init() {
    var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var instance = null;
    return {
      open: function open() {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        instance = instance === null ? new LittleModal(o) : instance;
        instance.open(params);
      },
      close: function close() {
        if (instance !== null) instance.close();else console.log('is it already closed');
      }
    };
  }
});
__webpack_exports__ = __webpack_exports__.default;
/******/ 	return __webpack_exports__;
/******/ })()
;
});