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
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ src; }
});

;// CONCATENATED MODULE: ./src/Little-Slider.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function createSlider(o) {
  var $element = document.createElement('div');
  $element.className = 'little-scale';
  $element.insertAdjacentHTML('afterbegin', "\n\t\t\t<div class=\"little-slider-line\"></div>\n\t\t\t<div class=\"little-pointer\"></div>\n\t");
  return $element;
}

var LittleSlider = /*#__PURE__*/function () {
  function LittleSlider($element, el) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, LittleSlider);

    this.y1 = 0;
    this.y2 = 0;
    this.targetElement = $element;
    this.target = el;
    this.options = options;
    this.max = options.max || 100;
    this.min = options.min || 0;
    this.value = typeof options.value === 'number' ? options.value : this.min;
    this.step = options.step || 1;
    this.currentValue = 0;
    this.isShow = false;
    this.$element = createSlider();
    this.$sliderLine = this.$element.querySelector('.little-slider-line');
    this.$pointer = this.$element.querySelector('.little-pointer');
    this.init();
  }

  _createClass(LittleSlider, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.targetElement.querySelector(this.target).appendChild(this.$element);
      this.options.onInit && this.options.onInit.call();
      ['mouseDownHandler', 'mouseUpHandler', 'mouseMoveHandler'].forEach(function (element) {
        return _this[element] = _this[element].bind(_this);
      });
      this.$element.addEventListener("mousedown", this.mouseDownHandler);
      this.setPosition(this.getPositionFromValue(this.value));
      this.calculate();
    }
  }, {
    key: "calculate",
    value: function calculate() {
      var outer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var inner = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if (inner > outer && !this.isShow) {
        this.isShow = true;
        this.$element.style.display = "block";
        this.options.onShow && this.options.onShow.call();
        console.log('slider show');
      } else if (outer > inner && this.isShow) {
        this.isShow = false;
        this.$element.style.display = "none";
        this.options.onHide && this.options.onHide.call();
        console.log('slider hide');
      }

      var percent = Math.round(outer / inner * 100);
      this.$pointer.style.height = (percent < 30 ? 30 : percent) + "%";
      this.pointerHeight = this.$pointer.offsetHeight;
      this.pointToMiddle = this.pointerHeight / 2;
      this.scaleHeight = this.$element.offsetHeight - this.pointerHeight;
      this.setPosition(this.currentPos); //console.log(outer, inner)
    } //при нажатии кнопки мыши

  }, {
    key: "mouseDownHandler",
    value: function mouseDownHandler(e) {
      e.preventDefault(); //console.log('mouseDown')

      this.options.onMouseDown && this.options.onMouseDown.call(this.options, e);
      this.y2 = this.eventPos(e, this.$element);
      this.setPosition(this.y2 - this.pointToMiddle);
      document.addEventListener('mouseup', this.mouseUpHandler);
      document.addEventListener('mousemove', this.mouseMoveHandler);
    } //при отпускании кнопки мыши

  }, {
    key: "mouseUpHandler",
    value: function mouseUpHandler(e) {
      //console.log('mouseup')
      this.options.onMouseUp && this.options.onMouseUp.call(this.options, e);
      document.removeEventListener("mousemove", this.mouseMoveHandler);
      document.removeEventListener('mouseup', this.mouseUpHandler);
    } //при движении мыши

  }, {
    key: "mouseMoveHandler",
    value: function mouseMoveHandler(e) {
      e.preventDefault();
      this.options.onSlide && this.options.onSlide.call(this.options, e);
      var y1 = this.eventPos(e, this.$element);
      this.setPosition(y1 - this.pointToMiddle);
    } //установить позицию и отобразить результат

  }, {
    key: "setPosition",
    value: function setPosition(pos) {
      this.currentPos = pos;
      pos = pos < 0 ? 0 : pos >= this.scaleHeight ? this.scaleHeight : pos;
      var value = this.getValueFromPosition(pos);
      value = value > this.max ? this.max : value < this.min ? this.min : value;
      var y = this.getPositionFromValue(value); //выполнится, когда величина изменится

      if (value > this.currentValue || value < this.currentValue) {
        this.currentValue = value;
        this.options.onChange && this.options.onChange.call(this.options, this.currentValue); //конец слайдера

        if (value === this.max) {
          this.options.onSlideEnd && this.options.onSlideEnd.call(this.options, this.currentValue);
        }
      }

      this.$sliderLine.style.height = y + "px";
      this.$pointer.style.top = y + "px";
    } //получить позицию по величине

  }, {
    key: "getPositionFromValue",
    value: function getPositionFromValue(val) {
      var percent = (val - this.min) / (this.max - this.min);
      return percent * this.scaleHeight;
    } //получить величину по позиции

  }, {
    key: "getValueFromPosition",
    value: function getValueFromPosition(pos) {
      var percent = pos / this.scaleHeight;
      var value = this.step * Math.round(percent * (this.max - this.min) / this.step) + this.min;
      return Number(value.toFixed(this.fixTofractional(this.step)));
    } //возвращает количество чисел, после запятой

  }, {
    key: "fixTofractional",
    value: function fixTofractional(fractional) {
      return fractional.toString().replace(".", '').length - 1;
    } //возвращает позицию x от длинны  элемента

  }, {
    key: "eventPos",
    value: function eventPos(ev, toElement) {
      return ev.pageY - toElement.getBoundingClientRect().top;
    }
  }]);

  return LittleSlider;
}();
/**
 * @callback LittleSlider~onInit
 */

/**
* @callback LittleSlider~onChange
* @param {number} currentValue
*/

/**
* @callback LittleSlider~onSlideEnd
* @param {number} currentValue
*/

/**
 * @callback LittleSlider~onSlide
 * @param {object} e
 */

/**
 * @callback LittleSlider~onMouseUp
 * @param {object} e
 */

/**
 * @callback RangeSlider~onMouseDown
 * @param {object} e
 */



;// CONCATENATED MODULE: ./src/Little-Modal.js
function Little_Modal_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Little_Modal_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Little_Modal_createClass(Constructor, protoProps, staticProps) { if (protoProps) Little_Modal_defineProperties(Constructor.prototype, protoProps); if (staticProps) Little_Modal_defineProperties(Constructor, staticProps); return Constructor; }



function getTemplate(o) {
  var $modal = document.createElement('div');
  $modal.className = 'little-modal';
  $modal.insertAdjacentHTML('afterbegin', "\n\t\t\t<div class=\"little-slider\"></div>\n\t\t\t<div class=\"dLeft\" data-type=\"left\"></div>\n\t\t\t<div class=\"dBottom\" data-type=\"bottom\"></div>\n\t\t\t<div class=\"dRight\" data-type=\"right\"></div>\n\t\t\t<div class=\"dCornerLeft\" data-type=\"cornerLeft\"></div>\n\t\t\t<div class=\"dCornerRight\" data-type=\"cornerRight\"></div>\n\t\t\t<div class=\"little-modal-title\" data-type=\"title\">".concat(o.title, " <button>&#120;</button></div>\n\t\t\t<div class=\"little-modal-body\">\n\t\t\t\t<div class=\"wrap\">\n\t\t\t\t\t<div class=\"inner-place\">\n\t\t\t\t\t\t").concat(o.inner, "\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"little-modal-button-place\" ").concat(o.OK || o.CANSEL ? "style='display: block;'" : '', ">\n\t\t\t\t").concat(o.OK ? "<button data-type=\"OK\">".concat(o.OK, "</button>") : '', "\n\t\t\t\t").concat(o.CANSEL ? "<button data-type=\"CANSEL\">".concat(o.CANSEL, "</button>") : '', "\n\t\t\t</div>\n\t\t"));
  return $modal;
}

var LittleModal = /*#__PURE__*/function () {
  function LittleModal() {
    var _o$inner, _o$title, _o$OK, _o$CANSEL, _o$wWidth, _o$wHeight, _o$target;

    var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    Little_Modal_classCallCheck(this, LittleModal);

    this.options = o;
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
    this.innerMinWidth = 250;
    this.innerMinHeight = 150;
    this.$body = document.querySelector('body');

    if (this.scope) {
      this.scope.style.position = 'relative';
    }
  }

  Little_Modal_createClass(LittleModal, [{
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
      this.$elDragLeft = $element.querySelector('.dLeft');
      this.$elDragBottom = $element.querySelector('.dBottom');
      this.$elDragRight = $element.querySelector('.dRight');
      this.$elDragCornerLeft = $element.querySelector('.dCornerLeft');
      this.$elDragCornerRight = $element.querySelector('.dCornerRight');
      this.$elInner = $element.querySelector('.little-modal .inner-place');
      this.$elBtnPlace = $element.querySelector('.little-modal-button-place');
      this.$element.style.width = maxWidth === "auto" ? "auto" : maxWidth + 'px';
      this.$element.style.height = maxHeight === "auto" ? "auto" : maxHeight + 'px';
      document.querySelector(this.target) ? document.querySelector(this.target).appendChild(this.$element) : document.body.insertAdjacentElement('afterbegin', this.$element);
      ['sliderOnChange', 'sliderScrolling', 'mouseMoveDragCornerLeftHandler', 'mouseMoveDragCornerRightHandler', 'mouseMoveDragLeftHandler', 'mouseMoveDragBottomHandler', 'mouseMoveDragRightHandler', 'mouseDownHandler', 'mouseUpHandler', 'onButton', 'mouseMoveHandler', 'onResize', 'onClose'].forEach(function (element) {
        return _this[element] = _this[element].bind(_this);
      });
      window.addEventListener('resize', this.onResize);
      this.$elClose.addEventListener('click', this.onClose);
      this.$elBtnPlace.addEventListener('click', this.onButton);
      this.$elTitle.addEventListener('mousedown', this.mouseDownHandler);
      this.$elDragLeft.addEventListener('mousedown', this.mouseDownHandler);
      this.$elDragBottom.addEventListener('mousedown', this.mouseDownHandler);
      this.$elDragRight.addEventListener('mousedown', this.mouseDownHandler);
      this.$elDragCornerLeft.addEventListener('mousedown', this.mouseDownHandler);
      this.$elDragCornerRight.addEventListener('mousedown', this.mouseDownHandler);
      this.slider = new LittleSlider(this.$element, ".little-slider", {
        min: 0,
        max: 100,
        onChange: function onChange(value) {
          return _this.sliderOnChange(value);
        },
        onShow: function onShow() {
          return _this.sliderOnShow();
        },
        onHide: function onHide() {
          return _this.sliderOnHide();
        }
      });
      this.calculate();
    } //slider functions

  }, {
    key: "sliderOnChange",
    value: function sliderOnChange(value) {
      var outer = this.$elBody.offsetHeight;
      var inner = this.$elInner.offsetHeight;
      var pos = inner - outer;
      this.$elBody.scrollTop = Math.round(pos / this.slider.max * value);
      this.options.onSliderChange && this.options.onSliderChange.call(this.options, value);
    }
  }, {
    key: "sliderOnShow",
    value: function sliderOnShow() {
      var classes = this.$elInner.className.split(" ");
      this.$elInner.className = classes.filter(function (name) {
        return name !== "sliderShow";
      }).join(" ") + " sliderShow";
      this.$elBody.addEventListener("wheel", this.sliderScrolling);
      this.options.onSliderShow && this.options.onSliderShow.call(this.options);
    }
  }, {
    key: "sliderOnHide",
    value: function sliderOnHide() {
      var classes = this.$elInner.className.split(" ");
      this.$elInner.className = classes.filter(function (name) {
        return name !== "sliderShow";
      }).join(" ");
      this.$elBody.removeEventListener("wheel", this.sliderScrolling);
      this.options.onSliderHide && this.options.onSliderHide.call(this.options);
    }
  }, {
    key: "sliderScrolling",
    value: function sliderScrolling(e) {
      var pos = this.slider.getPositionFromValue(this.slider.currentValue);
      this.slider.setPosition(pos - e.deltaY * -0.1);
      this.options.onSliderScroll && this.options.onSliderScroll.call(this.options, pos);
    } //end slider functions
    //пересчет переменых

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
      this.slider.calculate(this.$elBody.offsetHeight, this.$elInner.offsetHeight);
      console.log('calculating');
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
    key: "moveDragLeft",
    value: function moveDragLeft(pX, pY) {
      //console.log('left')
      if (this.limits(pX, pY)) {
        var x = this.dragX - pX;
        this.dragX = pX;
        this.elementWidth = pX > this.maximumPosXForLeft ? this.innerMinWidth : this.elementWidth + x;
        this.valueX = pX > this.maximumPosXForLeft ? this.dragMaximumLeftPositionX : this.valueX - x;

        if (this.valueX > -1) {
          this.$element.style.width = this.elementWidth + 'px';
          this.$element.style.left = this.valueX + 'px';
        }
      }
    }
  }, {
    key: "moveDragBottom",
    value: function moveDragBottom(pX, pY) {
      //console.log('bottom')
      if (this.limits(pX, pY)) {
        var y = this.dragY - pY;
        this.dragY = pY;
        this.elementHeight = pY > this.maximumPosYForBottom ? this.elementHeight - y : this.innerMinHeight;

        if (this.elementHeight + this.valueY <= this.windowHeight) {
          this.$element.style.height = this.elementHeight + 'px';
        }
      }
    }
  }, {
    key: "moveDragRight",
    value: function moveDragRight(pX, pY) {
      //console.log('right')
      if (this.limits(pX, pY)) {
        var x = this.dragX - pX;
        this.dragX = pX;
        this.elementWidth = pX > this.maximumPosXForRight ? this.elementWidth - x : this.innerMinWidth;

        if (this.elementWidth + this.valueX <= this.windowWidth) {
          this.$element.style.width = this.elementWidth + 'px';
        }
      }
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
      var withLimit = this.elementWidth - this.innerMinWidth;
      var heightLimit = this.elementHeight - this.innerMinHeight;
      this.dragX = e.clientX;
      this.dragY = e.clientY; //максимальная позиция мыши по x при которой изменяется ширина окна

      this.maximumPosXForLeft = e.clientX + withLimit;
      this.maximumPosXForRight = e.clientX - withLimit;
      this.maximumPosYForBottom = e.clientY - heightLimit;
      this.dragMaximumLeftPositionX = this.$element.getBoundingClientRect().left - this.borderXMin + withLimit;

      switch (e.target.getAttribute('data-type')) {
        case 'left':
          document.addEventListener('mousemove', this.mouseMoveDragLeftHandler);
          break;

        case 'bottom':
          document.addEventListener('mousemove', this.mouseMoveDragBottomHandler);
          break;

        case 'right':
          document.addEventListener('mousemove', this.mouseMoveDragRightHandler);
          break;

        case 'cornerLeft':
          document.addEventListener('mousemove', this.mouseMoveDragCornerLeftHandler);
          break;

        case 'cornerRight':
          document.addEventListener('mousemove', this.mouseMoveDragCornerRightHandler);
          break;

        case 'title':
          this.tochX = e.clientX - this.$element.getBoundingClientRect().left;
          this.tochY = e.clientY - this.$element.getBoundingClientRect().top;

          if (this.scope) {
            var scope = this.scope.getBoundingClientRect();
            this.tochX += scope.left;
            this.tochY += scope.top;
          }

          document.addEventListener('mousemove', this.mouseMoveHandler);
          break;
      }

      document.addEventListener('mouseup', this.mouseUpHandler);
    }
  }, {
    key: "mouseMoveDragCornerLeftHandler",
    value: function mouseMoveDragCornerLeftHandler(e) {
      this.moveDragLeft(e.clientX, e.clientY);
      this.moveDragBottom(e.clientX, e.clientY);
      this.slider.calculate(this.$elBody.offsetHeight, this.$elInner.offsetHeight);
    }
  }, {
    key: "mouseMoveDragCornerRightHandler",
    value: function mouseMoveDragCornerRightHandler(e) {
      this.moveDragRight(e.clientX, e.clientY);
      this.moveDragBottom(e.clientX, e.clientY);
      this.slider.calculate(this.$elBody.offsetHeight, this.$elInner.offsetHeight);
    }
  }, {
    key: "mouseMoveDragLeftHandler",
    value: function mouseMoveDragLeftHandler(e) {
      this.moveDragLeft(e.clientX, e.clientY);
      this.slider.calculate(this.$elBody.offsetHeight, this.$elInner.offsetHeight);
    }
  }, {
    key: "mouseMoveDragBottomHandler",
    value: function mouseMoveDragBottomHandler(e) {
      this.moveDragBottom(e.clientX, e.clientY);
      this.slider.calculate(this.$elBody.offsetHeight, this.$elInner.offsetHeight);
    }
  }, {
    key: "mouseMoveDragRightHandler",
    value: function mouseMoveDragRightHandler(e) {
      this.moveDragRight(e.clientX, e.clientY);
      this.slider.calculate(this.$elBody.offsetHeight, this.$elInner.offsetHeight);
    }
  }, {
    key: "mouseUpHandler",
    value: function mouseUpHandler(e) {
      console.log('remove listeners');
      document.removeEventListener('mousemove', this.mouseMoveHandler);
      document.removeEventListener('mousemove', this.downDragMouse);
      document.removeEventListener('mousemove', this.mouseMoveDragLeftHandler);
      document.removeEventListener('mousemove', this.mouseMoveDragBottomHandler);
      document.removeEventListener('mousemove', this.mouseMoveDragRightHandler);
      document.removeEventListener('mousemove', this.mouseMoveDragCornerLeftHandler);
      document.removeEventListener('mousemove', this.mouseMoveDragCornerRightHandler);
      document.removeEventListener('mouseup', this.mouseUpHandler);
      document.removeEventListener('mousedown', this.mouseDownHandler);
      this.slider.calculate(this.$elBody.offsetHeight, this.$elInner.offsetHeight);
      this.calculate();
    }
  }, {
    key: "mouseMoveHandler",
    value: function mouseMoveHandler(e) {
      if (this.limits(e.clientX, e.clientY)) {
        this.setPosition(e.clientX, e.clientY);
      }
    }
  }, {
    key: "limits",
    value: function limits(x, y) {
      if (x > this.borderXMin && x < this.borderXMax && y > this.borderYMin && y < this.borderYMax) {
        return true;
      }

      return false;
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


/* harmony default export */ var src = ({
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