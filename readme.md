# LittleModal

Простое модальное окно, с возможностью перетаскивания и изменения размера.

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

### Лицензия

Copyright (c) <year> <LioneNET>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.