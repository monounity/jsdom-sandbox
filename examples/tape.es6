import dom from 'jsdom-sandbox';
import test from 'tape';

test('foo', (t) => {
    dom.sandbox('<div id="foo">bar</div>', {}, () => {
        t.equal(document.getElementById('foo').innerHTML, 'bar');
        t.end();
    });
});
