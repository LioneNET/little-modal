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
		this.x1 = 0
		this.x2 = 0
		this.y1 = 0
		this.y2 = 0
		
		this.dX = 0
		this.dY = 0

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
		this.currentWidth = this.$element.offsetWidth;
		this.currentHeight = this.$element.offsetHeight;
		this.ElPosition = this.$element.getBoundingClientRect();
		this.valueX = 0;
		this.valueY = 0;

		this.init();
	}

	init() {
		['mouseDownHandler', 'mouseUpHandler', 'mouseMoveHandler'].forEach( element => this[element] = this[element].bind(this))
		this.$title.addEventListener('mousedown', this.mouseDownHandler);
	}

	mouseDownHandler(e) {
		this.x2 = e.clientX
		this.y2 = e.clientY
		this.dX = 0
		this.dY = 0

		document.addEventListener('mouseup', this.mouseUpHandler)
		document.addEventListener('mousemove', this.mouseMoveHandler);
	}

	mouseUpHandler(e) {
		document.removeEventListener('mousemove', this.mouseMoveHandler)
		document.removeEventListener('mouseup', this.mouseUpHandler);
	}

	mouseMoveHandler(e) {
		let element = this.$element;
		let left = this.$element.getBoundingClientRect().left
		let top = this.$element.getBoundingClientRect().top
		//console.log(e.clientX, e.clientY)
		//console.log(this.ev_pos(e, this.$body))
		this.setPosition(e);
	}

	setPosition(e) {
		this.x1 = this.x2 - e.clientX;
    this.y1 = this.y2 - e.clientY;
    this.x2 = e.clientX;
    this.y2 = e.clientY;

    let elPos = this.$element.getBoundingClientRect();
	  let w = window.innerWidth;
		let h = window.innerHeight;

    this.valueX -= this.x1
  	this.valueY -= this.y1

  	//valueX = valueX > windowWidth ? windowWidth : valueX > 0 ? valueX : 0
  	//valueY = valueY > windowHeight ? windowHeight : valueY > 0 ? valueY : 0

  	this.valueX = this.valueX > w - this.currentWidth ? w - this.currentWidth : this.valueX > 0 ? this.valueX : 0
  	this.valueY = this.valueY > h - this.currentHeight ? h - this.currentHeight : this.valueY > 0 ? this.valueY : 0

  	/*

	  this.valueX =  this.valueX < 0 ? 0 : this.valueX
	  this.valueY = this.valueY < 0 ? 0 : this.valueY


	  this.valueX = w - this.$element.offsetWidth > this.valueX ? this.valueX : w - this.$element.offsetWidth
	  this.valueY = h - this.$element.offsetHeight > this.valueY ? this.valueY : h - this.$element.offsetHeight*/


    //console.log(w, h, this.valueY)
    //console.log(this.valueX, this.valueY)
    /*
    let element = this.$element;
    let elPos = this.$element.getBoundingClientRect();
    let x = 0;
    let y = 0;

    if(elPos.left >0 && elPos.top > 0) {
    	x = (element.offsetLeft - this.x1)
    	y = (element.offsetTop - this.y1)
    }*/
    this.$element.style.left = this.valueX + 'px'
  	this.$element.style.top = this.valueY + 'px'

    
    
    
	}

}