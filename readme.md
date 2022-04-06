# LittleModal

Простое модальное окно, с возможностью перетаскивания и изменения размера.

[Посмотреть](https://lionenet.github.io/little-modal/dist/)

## Совместимость

* `ie 9+`
* `Chrome`	
* `Edge`	
* `Firefox`
*	`Opera`	
* `Safar`

## Как использовать

```html
<html>
	<head>
		<link rel="stylesheet" href="dist/style.css">
		<title></title>
	</head>
	<body>
		<div class="box">
			<div class="modal"></div>
		</div>

		<script type="text/javascript" src="dist/littlemodal.js"></script>
	</body>
</html>
```

```js
// Стандартные опции
let modal1 = littlemodal.init()

let modal2 = littlemodal.init({
	target: '.modal',
	scope: '.box',
	inner: 'hello',
	wWidth: 350,
	wHeight: 170
})
modal1.open()

var modal3 = littlemodal.init();
modal3.open({
	wWidth: 350,
	title: 'modal',
	inner: '<h1>Hello world</h1>',
	OK: 'OK',
	CANSEL: 'Закрыть',

	onOk: function(e){
		console.log(this)
		modal1.close()
	},
	onCansel: function(e){
		console.log(this)
		modal2.close()
	},
	onSliderShow: function(e){
		console.log('onSliderShow')
	},
	onSliderHide: function(e){
		console.log('onSliderHide')
	},
	onSliderChange: function(e){
		console.log('onSliderChange')
	},
	onSliderScroll: function(value){
		console.log('onSliderScroll', value)
	}
})
```

### Опции

```js
let options = {
	//элемент, в котором будет всроено окно
	target: 'String | cssClass'
	//заголовок
	title: 'String',
	//вшенший элемент, в рамках которого будут ограничения на перемещения окна
	scope: 'String | cssClass'
	//текст в теле окна
	inner: 'String',
	//название кнопки ок
	OK: 'String',
	//название кнопки отмены
	CANSEL: 'String',
}
```

### Методы 

Инициализация
- ``init()``

Открыть окно
- ``open()``

Закрыть окно
- ``close()``

### События

Происходит, кода нажата кнопка OK
- ``onOk``

Происходит когда нажата кнопка CANSEL
- ``onCansel``

Происходит когда появляется слайдер прокрутки
- ``onSliderShow``

Происходит когда исчезает слайдер прокрутки
- ``onSliderHide``

Происходит при изменении значения скролла
- ``onSliderChange``

Происходит при скролле
- ``onSliderScroll``