var dom = require('jsdom-sandbox');
var test = require('tape');

test('foo', function (t) {
    dom.sandbox('<div id="foo">bar</div>', {}, function () {
        t.equal(document.getElementById('foo').innerHTML, 'bar');
        t.end();
    });
});
