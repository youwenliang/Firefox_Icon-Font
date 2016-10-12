(function(define){'use strict';define(function(require,exports,module){

/**
 * Exports
 */

var base = window.FIREFOX_ICONS_BASE_URL
  || window.COMPONENTS_BASE_URL
  || 'node_modules/';

// Load it!
if (!document.documentElement) addEventListener('load', load);
else load();

function load() {
  if (isLoaded()) return;
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = base + 'firefox-icons/firefox-icons.css';
  document.head.appendChild(link);
  exports.loaded = true;
}

function isLoaded() {
  return exports.loaded
    || document.querySelector('link[href*=firefox-icons]')
    || document.documentElement.classList.contains('firefox-icons-loaded');
}

});})(typeof define=='function'&&define.amd?define:(function(n,w){'use strict';return typeof module=='object'?function(c){c(require,exports,module);}:function(c){var m={exports:{}};c(function(n){return w[n];},m.exports,m);w[n]=m.exports;};})('firefox-icons',this));/*jshint ignore:line*/
