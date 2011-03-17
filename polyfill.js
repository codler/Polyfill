/**
 * @author Han Lin Yap < http://zencodez.net/ >
 * @copyright 2011 zencodez.net
 * @license http://creativecommons.org/licenses/by-sa/3.0/
 * @package Polyfill
 * @version 1.2 - 2011-03-16
 *
 * This script requires Modernizr and Yepnope
 */
(function (window, document, $, undefined) {
	if (!window.Modernizr && window.yepnope) return;
	
	// yepnope.ie-prefix.js - 2010-10-22
	(function(g){var d=({}).hasOwnProperty,e;if(typeof d!=="undefined"&&typeof d.call!=="undefined"){e=function(h,i){return d.call(h,i)}}else{e=function(h,i){return((i in h)&&typeof h.constructor.prototype[i]==="undefined")}}var f=(function(){var j,h=3,k=document.createElement("div"),i=k.getElementsByTagName("i");while(k.innerHTML="<!--[if gt IE "+(++h)+"]><i></i><![endif]-->",i[0]){}return h>4?h:j}()),a={ie:!!f,ie5:(f===5),ie6:(f===6),ie7:(f===7),ie8:(f===8),ie9:(f===9),iegt5:(f>5),iegt6:(f>6),iegt7:(f>7),iegt8:(f>8),ielt7:(f<7),ielt8:(f<8),ielt9:(f<9)},c=function(j){var i=j.prefixes,l,h;for(h=0;h<i.length;h++){l=i[h];if(e(a,l)){if(a[l]){return true}}}return false},b;for(b in a){if(e(a,b)){g.addPrefix(b,function(h){if(!c(h)){h.bypass=true}return h})}}})(this.yepnope);

	// Modernizr classlist
	Modernizr.addTest('classlist', function () {
		return "classList" in document.createElement("a");
	});
	
	// https://github.com/Modernizr/Modernizr/pull/174
	// Modernizr mathml
	/* Modernizr.addTest('mathml', function () {
		var mml_container = document.createElementNS("http://www.w3.org/1998/Math/MathML", "math");
		var mml_el = mml_container.isDefaultNamespace(document.namespaceURI);
		return !!document.createElementNS && !!mml_container && !!mml_el;
	}); */
	
	// http://www.mathjax.org/docs/1.1/dynamic.html
	// Modernizr mathml - Checks if mathml is needed
	Modernizr.addTest('mathml', function () {
		return (document.getElementsByTagName("math").length > 0) ||
      (document.getElementsByTagNameNS == null ? false :
      (document.getElementsByTagNameNS("http://www.w3.org/1998/Math/MathML","math").length > 0));
	});
	
	var polyfill = {};
	
	// CSS3 Finalize
	// RGBA, Opacity and some Gradient
	if ($) {
		polyfill['css3finalize'] = {
			test: $.cssFinalize,
			nope: 'http://static.zencodez.net/js/jquery.css3finalize-latest.min.js'
		};
	}
	
	// ClassList
	polyfill['classlist'] = {
		test: Modernizr.classlist,
		nope: 'http://static.zencodez.net/polyfill/classList.min.js'
	};
	
	// MathML
	polyfill['mathml'] = {
		test: Modernizr.mathml,
		nope: 'http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML&delayStartupUntil=onload',
		callback: function () { 
			/* 
			// TODO Hide loading message
			MathJax.Hub.Config({
				showProcessingMessages : false
			}); */
			MathJax.Hub.Startup.onload(); 
		}
	};
	
	// CSS Selectors
	polyfill['cssselectors'] = {
		load: 'ielt9!http://static.zencodez.net/polyfill/selectivizr.js'
	};
	
	// Canvas
	polyfill['canvas'] = {
		test: Modernizr.canvas,
		nope: 'http://explorercanvas.googlecode.com/svn/tags/m3/excanvas.compiled.js'
	};

	// Hashchange
	if ($) {
		polyfill['hashchange'] = {
			test: Modernizr.hashchange,
			nope: 'http://static.zencodez.net/polyfill/jquery.ba-hashchange.min.js'
		};
	}
	
	// http://blogs.sitepoint.com/2011/03/08/regressive-enhancement-with-modernizr-and-yepnope/
	// HTML5 forms
	polyfill['form'] = {
		test: Modernizr.inputtypes.email 
			&& Modernizr.inputtypes.url 
			&& Modernizr.input.required 
			&& Modernizr.input.placeholder 
			&& Modernizr.input.max 
			&& Modernizr.input.min
			&& Modernizr.input.step
			&& Modernizr.input.pattern,
		nope: 'http://static.zencodez.net/polyfill/h5f.min.js',
		callback: function(url, result, key) {
			H5F.setup(document.getElementsByTagName("form"));
		}
	};
	
	// HTML5 forms - range
	polyfill['input-range'] = {
		test: Modernizr.inputtypes.range,
		nope: [
		  'css!http://static.zencodez.net/polyfill/fd-slider.css'
		 ,'css!ie8!http://static.zencodez.net/polyfill/fd-slider-ie8.css'
		 ,'css!ie7!http://static.zencodez.net/polyfill/fd-slider-ie7.css'
		 ,'http://static.zencodez.net/polyfill/fd-slider.js'
		],
		callback: function(id, testResult) {
			// If the slider file has loaded then fire the onDomReady event
			if("fdSlider" in window && typeof (fdSlider.onDomReady) != "undefined") {
				fdSlider.onDomReady();
			};
		}
	};
	
	// Video and Audio
	polyfill['video'] = {
		test: Modernizr.video && Modernizr.audio,
		nope: ['css!http://static.zencodez.net/polyfill/video-js.css', 'http://static.zencodez.net/polyfill/video.js'],
		complete: function(url, result, key) {
			VideoJS.setupAllWhenReady();
		}
	};
	
	// SMIL
	/* polyfill['smil'] = {
		test: Modernizr.smil,
		nope: 'http://leunen.d.free.fr/fakesmile/smil.user.js'
	}; */
	
	// Websocket
	/* polyfill['websocket'] = {
		test: Modernizr.websockets,
		nope: 'http://EasyWebsocket.org/easyWebSocket.min.js',
		callback: function(url, result, key) {
			WebSocket = EasyWebSocket;
		}
	}; */
	
	for(var pf in polyfill) {
		yepnope(polyfill[pf]);
	}
	
	window.polyfill = {
		
	}
	
	// svgweb ?
	// Modernizr.svg
	// Modernizr.inlinesvg
	// Modernizr.svgclippaths
	
	// webshims ?
})(this, this.document, jQuery);