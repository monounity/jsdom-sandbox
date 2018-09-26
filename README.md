# jsdom-sandbox

> jsdom :heart: the global namespace

## Features

* DOM objects such as `document` and `window` available globally
* No globals leaking between unit tests
* Always a fresh instance of the DOM

## Installation

The easiest way is to install `jsdom-sandbox` as a `devDependency`,
by running

```bash
npm install jsdom jsdom-sandbox --save-dev
```

## How it works

This package is a thin wrapper around [jsdom](https://github.com/tmpvar/jsdom), taking care of exposing all global DOM properties during the test and cleaning up resources after the completed test.

The `sandbox` function takes three parameters and the first two are used to create a new `jsdom` instance each time the function is called:

- `html`, a `string` containing html.
- `options`, an `object` with options for customizing `jsdom`.
- `callback`, the wrapper function. This function has an optional parameter which is the actual `jsdom` instance.

```js
var dom = require('jsdom-sandbox');

dom.sandbox('<div>foo</div>', { url: 'https://example.com/' }, function (jsdom) {

    // do something with the jsdom instance
    jsdom.reconfigure({ userAgent: "Mozilla/5.0" });

    // use global properties
    document.dispatchEvent(new Event("mouseover"));

    // the rest of the unit test
    // ...
});
```

For a complete list of options and features, please refer to the [jsdom](https://github.com/tmpvar/jsdom) official documentation.

## Examples

[Runnable examples](https://github.com/monounity/jsdom-sandbox/tree/master/examples)

### ES5 + [tape](https://github.com/substack/tape)

```js
var dom = require('jsdom-sandbox');
var test = require('tape');

test('foo', function (t) {
    dom.sandbox('<div id="foo">bar</div>', {}, function () {
        t.equal(document.getElementById('foo').innerHTML, 'bar');
        t.end();
    });
});

```

### ES6 + [tape](https://github.com/substack/tape)

```js
import dom from 'jsdom-sandbox';
import test from 'tape';

test('foo', (t) => {
    dom.sandbox('<div id="foo">bar</div>', {}, () => {
        t.equal(document.getElementById('foo').innerHTML, 'bar');
        t.end();
    });
});
```

### Typescript + [tape](https://github.com/substack/tape)

```js
import * as dom from "jsdom-sandbox";
import * as test from "tape";

test("foo", (t) => {
    dom.sandbox("<div id='foo'>bar</div>", {}, () => {
        t.equal(document.getElementById("foo").innerHTML, "bar");
        t.end();
    });
});
```

Please note that `jsdom-sandbox` ships with Typescript typings.

## Licensing

This software is licensed with the MIT license.

© 2017-2018 Monounity, Erik Barke
