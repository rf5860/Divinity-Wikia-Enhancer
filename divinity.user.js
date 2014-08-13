// ==UserScript==
// @name        Divinity Wikia Enhancer
// @description Enhances Divinity Wikia by adding hoverable links
// @match     	http://divinity.wikia.com/*
// @version     1.0
// @require	http://code.jquery.com/jquery-latest.min.js
// @copyright   rf5860
// @grant       GM_xmlhttpRequest
// ==/UserScript==

var TIMEOUT = 10000;
var TABLE_ELEMENT_SELECTOR = '.article-table>tbody>tr>td>a[title]';
var BASE_URL = "http://divinity.wikia.com";
var BOX_SELECTOR = ".infobox";

var mouseX;
var mouseY;

$(document).mousemove( function(e) {
   mouseX = e.pageX; 
   mouseY = e.pageY;
});

function addHoverBox(page, elem) {
    $.get(page, function(data) {
        var box = $(BOX_SELECTOR, data);
        var pos = elem.position();
        x = pos.left + box.width() / 3;
        y = pos.top + box.height();
        box.css({'top':y,'left':x, 'position':'absolute'})
        elem.append(box);
    });
}

function hasHoverBox(elem) {
    return elem.find(BOX_SELECTOR).length > 0;
}

function repositionHoverBox(elem) {
    $(BOX_SELECTOR).css({'top':mouseY,'left':mouseX, 'position':'absolute'});
}

function addHoverBoxIfMissing(elem) {
    if (!hasHoverBox(elem)) {
        var url = BASE_URL + elem.attr('href');
        addHoverBox(url, elem);
    }
}

function handlerOut() {
    $(BOX_SELECTOR, this).remove();
}

function handlerIn() {
    var hoveredElement = $(this);
    
    addHoverBoxIfMissing(hoveredElement);
    repositionHoverBox(hoveredElement);
}
    
    
$(TABLE_ELEMENT_SELECTOR).hover(handlerIn, handlerOut);
    
