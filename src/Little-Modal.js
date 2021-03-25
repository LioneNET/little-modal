import resize from './Resize.js'

function getTemplate(o){
	let $modal = document.createElement('div')
	$modal.classList.add('little-modal-place')
	$modal.insertAdjacentHTML('afterbegin',`
			<div class="title">Little modal</div>
			<div class="body">
				<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime a explicabo consectetur vitae ex eaque animi blanditiis quidem magnam corrupti incidunt sit amet, dolore nemo numquam quis! Nobis, dolor, laudantium.</div>
			</div>
			<div class="button-place">
				<button data-type="OK">Ok</button>
				<button data-type="CANSEL">Cansel</button>
			</div>
		`);
	return $modal;
}


export default class LittleModal {
	constructor(element='body', o={}){
		let $element = getTemplate(this.options)
		this.scope = o.scope || false
		this.tochX = 0
		this.tochY = 0
		this.valueX = 0
		this.valueY = 0
		this.borderXMin = 0
		this.borderXMax = 0
		this.borderYMin = 0
		this.borderYMax = 0
		this.maxWidth = o.wWidth || 500
		this.maxHeight = o.wHeight || 300
		this.options = o
		this.$body = document.querySelector('body')
		this.$element = $element
		this.$title = $element.querySelector('.title')
		this.$elBody = $element.querySelector('.body')
		this.$bntPlace = $element.querySelector('.button-place')
		this.$element.style.maxWidth = `${this.maxWidth}px`
		this.$element.style.maxHeight = `${this.maxHeight}px`;
		document.querySelector(element) ? 
		document.querySelector(element).appendChild($element) : 
		document.body.insertAdjacentElement('afterbegin', $element);
		
		this.init();
	}

	init() {
		let left = 0
		let top = 0

		this.elementWidth = this.$element.offsetWidth
		this.elementHeight = this.$element.offsetHeight
		this.windowWidth = window.innerWidth
		this.windowHeight = window.innerHeight
		this.borderXMax = this.windowWidth
		this.borderYMax = this.windowHeight;

		//если есть внешние рамки то берем их
		if(this.scope) {
			let $scope = document.querySelector(this.scope).getBoundingClientRect()
			left = $scope.left
			top = $scope.top
			this.borderXMin = left
			this.borderXMax = $scope.right
			this.borderYMin = top
			this.borderYMax = $scope.bottom
			this.windowWidth = $scope.right
			this.windowHeight = $scope.bottom
			
			this.valueX = this.borderXMin
			this.valueY = this.borderYMin;
		}

		this.limitWidth = this.windowWidth - this.elementWidth;
		this.limitHeight = this.windowHeight - this.elementHeight;

		['mouseDownHandler', 'mouseUpHandler', 'mouseMoveHandler', 'onResize'].forEach( element => this[element] = this[element].bind(this))
		resize.add(this.onResize)
		this.$title.addEventListener('mousedown', this.mouseDownHandler);
		this.setPosition(left, top)
	}

	onResize(e) {
		console.log(this.valueX)
	}

	mouseDownHandler(e) {

		this.tochX = e.clientX - this.$element.getBoundingClientRect().left
		this.tochY = e.clientY - this.$element.getBoundingClientRect().top

		document.addEventListener('mouseup', this.mouseUpHandler)
		document.addEventListener('mousemove', this.mouseMoveHandler);
	}

	mouseUpHandler(e) {
		document.removeEventListener('mousemove', this.mouseMoveHandler)
		document.removeEventListener('mouseup', this.mouseUpHandler);
	}

	mouseMoveHandler(e) {
		if(e.clientX > this.borderXMin && e.clientX < this.borderXMax && e.clientY > this.borderYMin && e.clientY < this.borderYMax) {
			this.setPosition(e.clientX, e.clientY);
		}
	}

	setPosition(x, y) {
		let minX = this.tochX
		let maxX = this.windowWidth - this.elementWidth + this.tochX
		let minY = this.tochY
		let maxY = this.windowHeight - this.elementHeight + this.tochY

	  this.valueX = x - this.tochX
	  this.valueY = y - this.tochY
			
		this.valueX = this.valueX > this.borderXMin ? this.valueX : this.borderXMin
  	this.valueX = this.valueX > this.limitWidth ? this.limitWidth : this.valueX

  	this.valueY = this.valueY > this.borderYMin ? this.valueY : this.borderYMin
  	this.valueY = this.valueY > this.limitHeight ? this.limitHeight : this.valueY

  	this.valueX = x > minX ? this.valueX : this.borderXMin
  	this.valueX = x > maxX ? this.limitWidth : this.valueX

  	this.valueY = y > minY ? this.valueY : this.borderYMin
  	this.valueY = y > maxY ? this.limitHeight : this.valueY

    this.$element.style.left = this.valueX + 'px'
  	this.$element.style.top = this.valueY + 'px'
	}

}