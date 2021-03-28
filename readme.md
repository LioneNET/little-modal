# LittleModal

## Usage

```html

<div class="modal"></div>

```

```js

// single, options via js 
new LittleModal.create(document.getElementById('slider1'), {min:0, max: 1, value: 0.5, step: 0.1})

// or single, options via html attributes 
rangesliderJs.create(document.getElementById('slider2'))

// or initialize multiple
rangesliderJs.create(document.querySelectorAll('input[type="range"]'))
```

### Options

```js
{
    min: 0,
    max: 100,
    value: 50,
    step: 1,
    // callbacks
    onInit: (value, percent, position) => {},
    onSlideStart: (value, percent, position) => {},
    onSlide: (value, percent, position) => {},
    onSlideEnd: (value, percent, position) => {}
}
```

### Events



## Contribute or Report Issue

Pull requests should target the **develop** branch.

For bugs and feature requests, [please create an issue][10].

[10]: https://github.com/stbaer/rangeslider-js/issues

## Licence

MIT, see [LICENSE.md](http://github.com/stbaer/rangeslider-js/blob/master/LICENSE.md) for details.
