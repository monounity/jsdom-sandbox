var jsdom = require('jsdom');

var properties = [
    'Attr',
    'Blob',
    'CSSImportRule',
    'CSSMediaRule',
    'CSSRule',
    'CSSStyleDeclaration',
    'CSSStyleRule',
    'CSSStyleSheet',
    'CharacterData',
    'Comment',
    'CustomEvent',
    'DOMException',
    'DOMImplementation',
    'DOMTokenList',
    'Document',
    'DocumentFragment',
    'DocumentType',
    'Element',
    'ErrorEvent',
    'Event',
    'EventTarget',
    'File',
    'FileList',
    'FormData',
    'HTMLAnchorElement',
    'HTMLAppletElement',
    'HTMLAreaElement',
    'HTMLAudioElement',
    'HTMLBRElement',
    'HTMLBaseElement',
    'HTMLBodyElement',
    'HTMLButtonElement',
    'HTMLCanvasElement',
    'HTMLCollection',
    'HTMLDListElement',
    'HTMLDataElement',
    'HTMLDataListElement',
    'HTMLDialogElement',
    'HTMLDirectoryElement',
    'HTMLDivElement',
    'HTMLDocument',
    'HTMLElement',
    'HTMLEmbedElement',
    'HTMLFieldSetElement',
    'HTMLFontElement',
    'HTMLFormElement',
    'HTMLFrameElement',
    'HTMLFrameSetElement',
    'HTMLHRElement',
    'HTMLHeadElement',
    'HTMLHeadingElement',
    'HTMLHtmlElement',
    'HTMLIFrameElement',
    'HTMLImageElement',
    'HTMLInputElement',
    'HTMLLIElement',
    'HTMLLabelElement',
    'HTMLLegendElement',
    'HTMLLinkElement',
    'HTMLMapElement',
    'HTMLMediaElement',
    'HTMLMenuElement',
    'HTMLMetaElement',
    'HTMLMeterElement',
    'HTMLModElement',
    'HTMLOListElement',
    'HTMLObjectElement',
    'HTMLOptGroupElement',
    'HTMLOptionElement',
    'HTMLOutputElement',
    'HTMLParagraphElement',
    'HTMLParamElement',
    'HTMLPreElement',
    'HTMLProgressElement',
    'HTMLQuoteElement',
    'HTMLScriptElement',
    'HTMLSelectElement',
    'HTMLSourceElement',
    'HTMLSpanElement',
    'HTMLStyleElement',
    'HTMLTableCaptionElement',
    'HTMLTableCellElement',
    'HTMLTableColElement',
    'HTMLTableDataCellElement',
    'HTMLTableElement',
    'HTMLTableHeaderCellElement',
    'HTMLTableRowElement',
    'HTMLTableSectionElement',
    'HTMLTemplateElement',
    'HTMLTextAreaElement',
    'HTMLTimeElement',
    'HTMLTitleElement',
    'HTMLTrackElement',
    'HTMLUListElement',
    'HTMLUnknownElement',
    'HTMLVideoElement',
    'HashChangeEvent',
    'History',
    'Image',
    'KeyboardEvent',
    'Location',
    'MediaList',
    'MessageEvent',
    'MouseEvent',
    'NamedNodeMap',
    'Node',
    'NodeFilter',
    'NodeIterator',
    'NodeList',
    'PopStateEvent',
    'ProcessingInstruction',
    'ProgressEvent',
    'StyleSheet',
    'StyleSheetList',
    'Text',
    'TouchEvent',
    'UIEvent',
    'URL',
    'XMLHttpRequest',
    'XMLHttpRequestEventTarget',
    'XMLHttpRequestUpload',
    'XPathEvaluator',
    'XPathException',
    'XPathExpression',
    'XPathResult',

    'addEventListener',
    'alert',
    'atob',
    'blur',
    'btoa',
    'close',
    'confirm',
    'createPopup',
    'dispatchEvent',
    'document',
    'focus',
    'frames',
    'getComputedStyle',
    'history',
    'innerHeight',
    'innerWidth',
    'length',
    'localStorage',
    'location',
    'moveBy',
    'moveTo',
    'name',
    'navigator',
    'open',
    'outerHeight',
    'outerWidth',
    'pageXOffset',
    'pageYOffset',
    'parent',
    'postMessage',
    'print',
    'prompt',
    'removeEventListener',
    'resizeBy',
    'resizeTo',
    'screen',
    'screenLeft',
    'screenTop',
    'screenX',
    'screenY',
    'scroll',
    'scrollBy',
    'scrollLeft',
    'scrollTo',
    'scrollTop',
    'scrollX',
    'scrollY',
    'self',
    'sessionStorage',
    'stop',
    'top',
    'window'
];

exports.sandbox = function(html, options, callback) {
    var dom = new jsdom.JSDOM(html, options);

    if(!dom.window.localStorage && !dom.window.sessionStorage) {
        dom.window.localStorage = dom.window.sessionStorage = {
            getItem: function (key) {
                return this[key];
            },
            setItem: function (key, value) {
                this[key] = value;
            }
        };
    }

    global.window = dom.window;

    properties.forEach(function(property) {
        global[property] = dom.window[property];
    });

    callback(dom);

    dom.window.close();

    properties.forEach(function(property) {
        delete global[property];
    });
};
