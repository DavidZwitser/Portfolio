// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.instagram.com/p/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setTimeout( function() {

        let videoURL = document.getElementsByClassName('tWeCl')[0].src;
        let thumbnailURL = document.getElementsByClassName('_8jZFn')[0].src.split(' ')[0];

        let descriptionSection = document.getElementsByClassName('C4VMK')[0].children[1].innerHTML;

        let description = descriptionSection.split('<br>')[0];
        let rawTags = descriptionSection.split('#'); //.split('</');

        let tags = [];

        for (let i = 1; i < rawTags.length; i++)
        {
            tags.push(rawTags[i].split('</')[0]);
        }

        let jsoned = '';

        jsoned += '"footage": ["' + videoURL + '"],\n"description": "' + description + '",\n"tags": [';

        for(let i = 0; i < tags.length; i++)
        {
            if (i == 0) { jsoned += '"'; }
            else { jsoned += ', "'; }
            jsoned += tags[i];
            jsoned += '"';
        }

        jsoned += ']';

        let copyElement = document.createElement('input');
        copyElement.value = jsoned;
        document.body.appendChild(copyElement);

        copyElement.select();
        document.execCommand("copy");

    }, 500);
})();