function 	ev_pos(ev, toElement) {
  toElement = toElement || toElement.currentTarget;
	var isNum = function (val) {
	    return typeof val === 'number' && !isNaN(val);
	};
  var toElementBoundingRect = toElement.getBoundingClientRect(),
      orgEv = ev.originalEvent || ev,
      hasTouches = ev.touches && ev.touches.length,
      pageX = 0,
      pageY = 0;

  if (hasTouches) {
      if (isNum(ev.touches[0].pageX) && isNum(ev.touches[0].pageY)) {
          pageX = ev.touches[0].pageX;
          pageY = ev.touches[0].pageY;
      } else if (isNum(ev.touches[0].clientX) && isNum(ev.touches[0].clientY)) {
          pageX = orgEv.touches[0].clientX;
          pageY = orgEv.touches[0].clientY;
      }
  } else {
      if (isNum(ev.pageX) && isNum(ev.pageY)) {
          pageX = ev.pageX;
          pageY = ev.pageY;
      } else if (ev.currentPoint && isNum(ev.currentPoint.x) && isNum(ev.currentPoint.y)) {
          pageX = ev.currentPoint.x;
          pageY = ev.currentPoint.y;
      }
  }

  return {
      x: pageX - toElementBoundingRect.left,
      y: pageY - toElementBoundingRect.top
  };
}


function getTemplate(o){
	let $modal = document.createElement('div')
	$modal.classList.add('little-modal-place')
	$modal.insertAdjacentHTML('afterbegin',`
			<div class="title">Little modal</div>
			<div class="body">
				<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime a explicabo consectetur vitae ex eaque animi blanditiis quidem magnam corrupti incidunt sit amet, dolore nemo numquam quis! Nobis, dolor, laudantium.</div>
				<div>Saepe, nobis neque perspiciatis eligendi, consectetur soluta explicabo officiis sit distinctio, autem sed repudiandae, commodi voluptatum nesciunt sapiente! Ad aperiam reprehenderit beatae quae delectus amet officia sit, tempora impedit voluptates.</div>
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
		this.maxWidth = o.maxWidth || 500
		this.maxHeight = o.maxHeight || 300
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
		this.elementWidth = this.$element.offsetWidth;
		this.elementHeight = this.$element.offsetHeight;
		this.windowWidth = window.innerWidth;
		this.windowHeight = window.innerHeight;

		//если есть внешние рамки то берем их
		if(this.scope) {
			let $scope = document.querySelector(this.scope).getBoundingClientRect()
			this.windowWidth = $scope.width
			this.windowHeight = $scope.height
			
		}

		this.limitWidth = this.windowWidth - this.elementWidth;
		this.limitHeight = this.windowHeight - this.elementHeight;

		['mouseDownHandler', 'mouseUpHandler', 'mouseMoveHandler'].forEach( element => this[element] = this[element].bind(this))
		this.$title.addEventListener('mousedown', this.mouseDownHandler);
	}

	mouseDownHandler(e) {

		this.tochX = e.clientX - this.$element.getBoundingClientRect().left
		this.tochY = e.clientY - this.$element.getBoundingClientRect().top
		console.log(this.tochX, this.tochY)

		document.addEventListener('mouseup', this.mouseUpHandler)
		document.addEventListener('mousemove', this.mouseMoveHandler);
	}

	mouseUpHandler(e) {
		document.removeEventListener('mousemove', this.mouseMoveHandler)
		document.removeEventListener('mouseup', this.mouseUpHandler);
	}

	mouseMoveHandler(e) {
		if(e.clientX > 0 && e.clientX < this.windowWidth && e.clientY > 0 && e.clientY < this.windowHeight) {
			this.setPosition(e);
		}
	}

	setPosition(e) {
		let minX = this.tochX
		let maxX = this.windowWidth - this.elementWidth + this.tochX
		let minY = this.tochY
		let maxY = this.windowHeight - this.elementHeight + this.tochY

	  this.valueX = e.clientX - this.tochX
	  this.valueY = e.clientY - this.tochY
			
		this.valueX = this.valueX > 0 ? this.valueX : 0
  	this.valueX = this.valueX > this.limitWidth ? this.limitWidth : this.valueX

  	this.valueY = this.valueY > 0 ? this.valueY : 0
  	this.valueY = this.valueY > this.limitHeight ? this.limitHeight : this.valueY

  	this.valueX = e.clientX > minX ? this.valueX : 0
  	this.valueX = e.clientX > maxX ? this.limitWidth : this.valueX

  	this.valueY = e.clientY > minY ? this.valueY : 0
  	this.valueY = e.clientY > maxY ? this.limitHeight : this.valueY

    this.$element.style.left = this.valueX + 'px'
  	this.$element.style.top = this.valueY + 'px'
	}

}