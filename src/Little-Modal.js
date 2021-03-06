import LittleSlider from './Little-Slider.js'

function getTemplate(o){
	let $modal = document.createElement('div')
	$modal.className = 'little-modal'
	$modal.insertAdjacentHTML('afterbegin',`
			<div class="little-slider"></div>
			<div class="dLeft" data-type="left"></div>
			<div class="dBottom" data-type="bottom"></div>
			<div class="dRight" data-type="right"></div>
			<div class="dCornerLeft" data-type="cornerLeft"></div>
			<div class="dCornerRight" data-type="cornerRight"></div>
			<div class="little-modal-title" data-type="title">${o.title} <button>&#120;</button></div>
			<div class="little-modal-body">
				<div class="wrap">
					<div class="inner-place">
						${o.inner}
					</div>
				</div>
			</div>
			<div class="little-modal-button-place" ${o.OK || o.CANSEL ? "style='display: block;'" : ''}>
				${o.OK ? `<button data-type="OK">${o.OK}</button>` : ''}
				${o.CANSEL ? `<button data-type="CANSEL">${o.CANSEL}</button>` : ''}
			</div>
		`);
	return $modal;
}


export default class LittleModal {
	constructor(o={}){

		this.options = o
		this.options.inner = o.inner ?? ''
		this.options.title = o.title ?? 'Little modal'
		this.options.OK = o.OK ?? false
		this.options.CANSEL = o.CANSEL ?? false
		this.options.wWidth = o.wWidth ?? 300
		this.options.wHeight = o.wHeight ?? 150

		this.$element = null
		this.target = o.target ?? "body"
		this.scope = document.querySelector(o.scope) || false
		this.tochX = 0
		this.tochY = 0
		this.valueX = 0 //Math.round(Math.random()*1000)
		this.valueY = 0 //Math.round(Math.random()*1000)
		this.borderXMin = 0
		this.borderXMax = 0
		this.borderYMin = 0
		this.borderYMax = 0
		this.innerMinWidth = 250
		this.innerMinHeight = 150
		this.$body = document.querySelector('body')

		if(this.scope){
			this.scope.style.position = 'relative';
		}

	}

	init() {
		//если элемент есть, не инициализируем
		if(this.$element !== null){
			return;
		}

		let $element = this.$element ?? getTemplate(this.options)
		let maxWidth = this.options.wWidth
		let maxHeight = this.options.wHeight

		this.$element = $element
		this.$elTitle = $element.querySelector('.little-modal-title')
		this.$elClose = this.$elTitle.querySelector('button')
		this.$elBody = $element.querySelector('.little-modal-body')
		this.$elDragLeft = $element.querySelector('.dLeft')
		this.$elDragBottom = $element.querySelector('.dBottom')
		this.$elDragRight = $element.querySelector('.dRight')
		this.$elDragCornerLeft = $element.querySelector('.dCornerLeft')
		this.$elDragCornerRight = $element.querySelector('.dCornerRight')
		this.$elInner = $element.querySelector('.little-modal .inner-place')
		this.$elBtnPlace = $element.querySelector('.little-modal-button-place')
		this.$element.style.width = maxWidth === "auto" ? "auto" : maxWidth+'px'
		this.$element.style.height = maxHeight === "auto" ? "auto" : maxHeight+'px'

		document.querySelector(this.target) ? 
		document.querySelector(this.target).appendChild(this.$element) : 
		document.body.insertAdjacentElement('afterbegin', this.$element);
		


		['sliderOnChange', 'sliderScrolling',
		'mouseMoveDragCornerLeftHandler', 'mouseMoveDragCornerRightHandler',
		'mouseMoveDragLeftHandler', 'mouseMoveDragBottomHandler', 'mouseMoveDragRightHandler',
		'mouseDownHandler', 'mouseUpHandler', 'onButton',
		'mouseMoveHandler', 'onResize', 'onClose'].forEach( element => this[element] = this[element].bind(this));

		window.addEventListener('resize', this.onResize)
		this.$elClose.addEventListener('click', this.onClose)
		this.$elBtnPlace.addEventListener('click', this.onButton)
		this.$elTitle.addEventListener('mousedown', this.mouseDownHandler);
		this.$elDragLeft.addEventListener('mousedown', this.mouseDownHandler);
		this.$elDragBottom.addEventListener('mousedown', this.mouseDownHandler);
		this.$elDragRight.addEventListener('mousedown', this.mouseDownHandler);
		this.$elDragCornerLeft.addEventListener('mousedown', this.mouseDownHandler);
		this.$elDragCornerRight.addEventListener('mousedown', this.mouseDownHandler);
		this.slider = new LittleSlider(this.$element, ".little-slider",{
			min: 0, max: 100, 
			onChange: (value)=>this.sliderOnChange(value),
			onShow: ()=>this.sliderOnShow(),
			onHide: ()=>this.sliderOnHide()
		});
		this.calculate()
	}

	//slider functions
	sliderOnChange(value){
		let outer = this.$elBody.offsetHeight
		let inner = this.$elInner.offsetHeight
		let pos = inner - outer
		this.$elBody.scrollTop = Math.round((pos/this.slider.max) * value);
		this.options.onSliderChange && this.options.onSliderChange.call(this.options, value);
	}
	sliderOnShow() {
		let classes = this.$elInner.className.split(" ")
		this.$elInner.className = classes.filter(name=>name!=="sliderShow").join(" ")+" sliderShow"
		this.$elBody.addEventListener("wheel", this.sliderScrolling)
		this.options.onSliderShow && this.options.onSliderShow.call(this.options)

	}
	sliderOnHide() {
		let classes = this.$elInner.className.split(" ")
		this.$elInner.className = classes.filter(name=>name!=="sliderShow").join(" ")
		this.$elBody.removeEventListener("wheel", this.sliderScrolling)
		this.options.onSliderHide && this.options.onSliderHide.call(this.options)
	}
	sliderScrolling(e) {
		let pos = this.slider.getPositionFromValue(this.slider.currentValue);
		this.slider.setPosition(pos - (e.deltaY * -0.1))
		this.options.onSliderScroll && this.options.onSliderScroll.call(this.options, pos)
	}
	//end slider functions

	//пересчет переменых
	calculate() {
		this.tochX = 0
		this.tochY = 0
		this.elementWidth = this.$element.offsetWidth
		this.elementHeight = this.$element.offsetHeight
		this.windowWidth = window.innerWidth
		this.windowHeight = window.innerHeight
		this.borderXMax = this.windowWidth
		this.borderYMax = this.windowHeight;

		//если есть внешние рамки то берем их
		if(this.scope) {
			let scope = this.scope.getBoundingClientRect()
			this.borderXMin = scope.left
			this.borderXMax = scope.right
			this.borderYMin = scope.top
			this.borderYMax = scope.bottom
			this.windowWidth = scope.width
			this.windowHeight = scope.height
		}

		this.limitWidth = this.windowWidth - this.elementWidth
		this.limitHeight = this.windowHeight - this.elementHeight
		this.setPosition(this.valueX, this.valueY)
		this.slider.calculate(this.$elBody.offsetHeight, this.$elInner.offsetHeight)
		console.log('calculating')
	}

	//для обертки открыть
	open(params) {
		console.log(params)
		for(let key in params){
			if(this.options[key] !== 'undefined'){
				this.options[key] = params[key]
			}
		}
		this.init()
	}

	//для обертки закрыть
	close() {
		if(this.$element !== null)
			this.destroy()
	}

	//двигаем окно
	setPosition(x, y) {
		let minX = this.tochX
		let maxX = this.windowWidth - this.elementWidth + this.tochX
		let minY = this.tochY
		let maxY = this.windowHeight - this.elementHeight + this.tochY

	  this.valueX = x - this.tochX
	  this.valueY = y - this.tochY

		this.valueX = this.valueX > 0 ? this.valueX : 0
  	this.valueX = this.valueX > this.limitWidth ? this.limitWidth : this.valueX

  	this.valueY = this.valueY > 0 ? this.valueY : 0
  	this.valueY = this.valueY > this.limitHeight ? this.limitHeight : this.valueY

  	this.valueX = x > minX ? this.valueX : 0
  	this.valueX = x > maxX ? this.limitWidth : this.valueX

  	this.valueY = y > minY ? this.valueY : 0
  	this.valueY = y > maxY ? this.limitHeight : this.valueY

    this.$element.style.left = this.valueX + 'px'
  	this.$element.style.top = this.valueY + 'px'
	}

	moveDragLeft(pX, pY) {
		//console.log('left')
		if(this.limits(pX, pY)) {
			let x = this.dragX - pX
			this.dragX = pX
			this.elementWidth = pX > this.maximumPosXForLeft ? this.innerMinWidth :  this.elementWidth + x
			this.valueX = pX > this.maximumPosXForLeft ? this.dragMaximumLeftPositionX : this.valueX - x
			
			if(this.valueX > -1 ) {
				this.$element.style.width = this.elementWidth + 'px'
				this.$element.style.left = this.valueX + 'px'
			}

		}
	}

	moveDragBottom(pX, pY) {
		//console.log('bottom')
		if(this.limits(pX, pY)) {
			let y = this.dragY-pY;
			this.dragY = pY;
			this.elementHeight = pY > this.maximumPosYForBottom ? this.elementHeight-y : this.innerMinHeight;

			if(this.elementHeight + this.valueY <= this.windowHeight) {
				this.$element.style.height = this.elementHeight + 'px'
			}
		}
	}

	moveDragRight(pX, pY) {
		//console.log('right')
		if(this.limits(pX, pY)) {
			let x = this.dragX - pX;
			this.dragX = pX;
			this.elementWidth = pX > this.maximumPosXForRight ? this.elementWidth - x : this.innerMinWidth

			if(this.elementWidth + this.valueX <= this.windowWidth) {
			 this.$element.style.width = this.elementWidth + 'px'
			}
		}
	}
	
	onClose(e) {
		this.close()
	}

	onButton(e) {
		switch(e.target.getAttribute('data-type')) {
			case 'OK':
				this.options.onOk && this.options.onOk.call(this.options, e)
				break;
			case 'CANSEL':
				this.options.onCansel && this.options.onCansel.call(this.options, e)
				break;
		}
	}

	onResize(e) {
		this.calculate();
	}

	mouseDownHandler(e) {
		let withLimit = this.elementWidth - this.innerMinWidth
		let heightLimit = this.elementHeight - this.innerMinHeight
		this.dragX = e.clientX
		this.dragY = e.clientY
		//максимальная позиция мыши по x при которой изменяется ширина окна
		this.maximumPosXForLeft = e.clientX + withLimit
		this.maximumPosXForRight = e.clientX - withLimit
		this.maximumPosYForBottom = e.clientY - heightLimit
		this.dragMaximumLeftPositionX = this.$element.getBoundingClientRect().left - this.borderXMin + withLimit

		switch(e.target.getAttribute('data-type')) {
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
				this.tochX = e.clientX - this.$element.getBoundingClientRect().left
				this.tochY = e.clientY - this.$element.getBoundingClientRect().top

				if(this.scope){
					let scope = this.scope.getBoundingClientRect()
					this.tochX += scope.left
					this.tochY += scope.top
				}
				document.addEventListener('mousemove', this.mouseMoveHandler);
				break;
		}
		document.addEventListener('mouseup', this.mouseUpHandler)
	}

	mouseMoveDragCornerLeftHandler(e) {
		this.moveDragLeft(e.clientX, e.clientY)
		this.moveDragBottom(e.clientX, e.clientY)
		this.slider.calculate(this.$elBody.offsetHeight, this.$elInner.offsetHeight)
	}

	mouseMoveDragCornerRightHandler(e) {
		this.moveDragRight(e.clientX, e.clientY)
		this.moveDragBottom(e.clientX, e.clientY)
		this.slider.calculate(this.$elBody.offsetHeight, this.$elInner.offsetHeight)
	}

	mouseMoveDragLeftHandler(e) {
		this.moveDragLeft(e.clientX, e.clientY)
		this.slider.calculate(this.$elBody.offsetHeight, this.$elInner.offsetHeight)
	}

	mouseMoveDragBottomHandler(e) {
		this.moveDragBottom(e.clientX, e.clientY)
		this.slider.calculate(this.$elBody.offsetHeight, this.$elInner.offsetHeight)
	}

	mouseMoveDragRightHandler(e) {
		this.moveDragRight(e.clientX, e.clientY)
		this.slider.calculate(this.$elBody.offsetHeight, this.$elInner.offsetHeight)
	}

	mouseUpHandler(e) {
		console.log('remove listeners')
		document.removeEventListener('mousemove', this.mouseMoveHandler)	
		document.removeEventListener('mousemove', this.downDragMouse)
		document.removeEventListener('mousemove', this.mouseMoveDragLeftHandler)
		document.removeEventListener('mousemove', this.mouseMoveDragBottomHandler)
		document.removeEventListener('mousemove', this.mouseMoveDragRightHandler)
		document.removeEventListener('mousemove', this.mouseMoveDragCornerLeftHandler)
		document.removeEventListener('mousemove', this.mouseMoveDragCornerRightHandler)
		document.removeEventListener('mouseup', this.mouseUpHandler)
		document.removeEventListener('mousedown', this.mouseDownHandler)
		this.slider.calculate(this.$elBody.offsetHeight, this.$elInner.offsetHeight)
		this.calculate()
	}

	mouseMoveHandler(e) {
		if(this.limits(e.clientX, e.clientY)) {
			this.setPosition(e.clientX, e.clientY)
		}
	}

	limits(x, y) {
		if(x > this.borderXMin && x < this.borderXMax && y > this.borderYMin && y < this.borderYMax) {
			return true
		}
		return false
	}

	destroy() {
		this.$elClose.removeEventListener('onclick', this.onClose)
		window.removeEventListener('resize', this.onResize)
		this.$elTitle.removeEventListener('mousedown', this.mouseDownHandler)
		this.$elBtnPlace.removeEventListener('click', this.onButton)
		this.$element.parentNode.removeChild(this.$element)
		this.$element = null
	}

}