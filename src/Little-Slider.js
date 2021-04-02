function createSlider(o) {
	let $element = document.createElement('div')
	$element.className = 'little-scale';
	$element.insertAdjacentHTML('afterbegin',`
			<div class="little-slider-line"></div>
			<div class="little-pointer"></div>
	`)
	return $element;
}

export default class LittleSlider {
	constructor(el, options = {}){
		this.y1 = 0
		this.y2 = 0
		this.target = el
		this.options = options
		this.max = options.max || 100
		this.min = options.min || 0
		this.value = typeof options.value === 'number' ? options.value : this.min
		this.step = options.step || 1
		this.currentValue = 0
		this.$element = createSlider()
		this.$sliderLine = this.$element.querySelector('.little-slider-line')
		this.$pointer = this.$element.querySelector('.little-pointer')
		

		this.init()
	}

	init(){
		document.querySelector(this.target).appendChild(this.$element)
		
		this.options.onInit && this.options.onInit.call();
		['mouseDownHandler', 'mouseUpHandler', 'mouseMoveHandler'].forEach( element => this[element] = this[element].bind(this))
		this.$element.addEventListener("mousedown", this.mouseDownHandler)
		this.setPosition(this.getPositionFromValue(this.value))
		this.calculate();
	}

	calculate(outer=0, inner=0) {

		if(inner > outer) {
			this.$element.style.display = "block"
			this.options.onShow && this.options.onShow.call();
		} else {
			this.$element.style.display = "none"
			this.options.onHide && this.options.onHide.call();
		}
		let percent = Math.round((outer/inner) * 100);

		this.$pointer.style.height =  (percent < 30 ? 30 : percent)+"%"
		this.pointerHeight = this.$pointer.offsetHeight
		this.pointToMiddle = this.pointerHeight/2
		this.scaleHeight = this.$element.offsetHeight - this.pointerHeight;
		this.setPosition(this.currentPos)

		console.log(outer, inner)
	}

	//при нажатии кнопки мыши
	mouseDownHandler(e){
		e.preventDefault()
		//console.log('mouseDown')
		this.options.onMouseDown && this.options.onMouseDown.call(this.options, e);
		this.y2 = this.eventPos(e, this.$element)
		this.setPosition(this.y2 - this.pointToMiddle)

		document.addEventListener('mouseup', this.mouseUpHandler)
		document.addEventListener('mousemove', this.mouseMoveHandler)
	}

	//при отпускании кнопки мыши
	mouseUpHandler(e){
		//console.log('mouseup')
		this.options.onMouseUp && this.options.onMouseUp.call(this.options, e);
		document.removeEventListener("mousemove", this.mouseMoveHandler)
		document.removeEventListener('mouseup', this.mouseUpHandler)
	}

	//при движении мыши
	mouseMoveHandler(e){
		e.preventDefault();
		this.options.onSlide && this.options.onSlide.call(this.options, e);
		const y1 = this.eventPos(e, this.$element)
    this.setPosition(y1 - this.pointToMiddle)
	}

	//установить позицию и отобразить результат
	setPosition (pos) {
		this.currentPos = pos;
		pos = pos < 0 ? 0 : pos >= this.scaleHeight ? this.scaleHeight : pos;
		let value = this.getValueFromPosition(pos)
		value = value > this.max ? this.max : value < this.min ? this.min : value
		const y = this.getPositionFromValue(value);
		//выполнится, когда величина изменится
		if(value > this.currentValue || value < this.currentValue){
			this.currentValue = value
			this.options.onChange && this.options.onChange.call(this.options, this.currentValue);

			//конец слайдера
			if(value === this.max){
				this.options.onSlideEnd && this.options.onSlideEnd.call(this.options, this.currentValue);
			}
			
		}
		this.$sliderLine.style.height = y + "px";
		this.$pointer.style.top = y + "px";
	}

	//получить позицию по величине
	getPositionFromValue (val) {
    const percent = (val - this.min) / (this.max - this.min)
    return percent * this.scaleHeight
  }

  //получить величину по позиции
	getValueFromPosition(pos) {
    const percent = pos / this.scaleHeight
    const value = this.step * Math.round(percent * (this.max - this.min) / this.step) + this.min
    return Number(value.toFixed(this.fixTofractional(this.step)))
  }

  //возвращает количество чисел, после запятой
  fixTofractional(fractional){
		return fractional.toString().replace(".",'').length-1;
	}

	//возвращает позицию x от длинны  элемента
	eventPos(ev, toElement) {
    return ev.pageY - toElement.getBoundingClientRect().top
	}
}

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