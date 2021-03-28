# LittleModal

Простое модальное окно, с возможностью перетаскивания

## Как использовать

```html

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
	<link rel="stylesheet" href="dist/style.css">
</head>
<body>
	<div class="box">
		<div class="modal"></div>
	</div>

	
</body>
	<script type="text/javascript" src="dist/littlemodal.js"></script>
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
    modal2.open({
    	title: 'modal',
    	inner: `<h1>Hello world</h1>`,
    	OK: 'ok',
    	CANSEL: 'cansel',

    	onOk: function(e){
    		console.log(this)
    	},

    	onCansel: function(e){
    		console.log(this)
    		modal2.close()
    	}
    })
```

### Опции

```js
let options = {
		//заголовок
    title: 'String',
    //
    inner: 'String',
    //
    OK: 'String',
    //
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


