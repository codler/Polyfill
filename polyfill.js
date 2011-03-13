/**
 * @author Han Lin Yap < http://zencodez.net/ >
 * @copyright 2011 zencodez.net
 * @license http://creativecommons.org/licenses/by-sa/3.0/
 * @package Polyfill
 * @version 1.0 - 2011-03-13
 *
 * This script requires Modernizr and Yepnope
 */
if (window.Modernizr && window.yepnope) {

	// CSS3 Finalize
	// RGBA, Opacity and some Gradient
	yepnope({
		test: jQuery.cssFinalize,
		nope: 'preload!http://static.zencodez.net/js/jquery.css3finalize-latest.min.js',
		callback: function(url, result, key) {
			if (jQuery) {
				yepnope(url);
			}
		}
	});
	
	// Hashchange
	yepnope({
		test: Modernizr.hashchange,
		nope: 'preload!jquery.ba-hashchange.min.js',
		callback: function(url, result, key) {
			if (jQuery) {
				yepnope(url);
			}
		}
	});
	
	// Canvas
	yepnope({
		test: Modernizr.canvas,
		nope: 'http://explorercanvas.googlecode.com/svn/tags/m3/excanvas.compiled.js'
		//nope: 'http://static.zencodez.net/js.php?f=excanvas'
	});
	
	// http://blogs.sitepoint.com/2011/03/08/regressive-enhancement-with-modernizr-and-yepnope/
	// HTML5 forms
	yepnope({
		test: Modernizr.inputtypes.email 
			&& Modernizr.inputtypes.url 
			&& Modernizr.input.required 
			&& Modernizr.input.placeholder 
			&& Modernizr.input.max 
			&& Modernizr.input.min
			&& Modernizr.input.step
			&& Modernizr.input.pattern,
		nope: 'h5f.min.js',
		callback: function(url, result, key) {
			H5F.setup(document.getElementsByTagName("form"));
		}
	});
	
	// HTML5 forms - range
	yepnope({
		test: Modernizr.inputtypes.range,
		nope: [
		  'css!fd-slider.css'
		 ,'css!ie8!fd-slider-ie8.css'
		 ,'css!ie7!fd-slider-ie7.css'
		 ,'fd-slider.js'
		],
		callback: function(id, testResult) {
			// If the slider file has loaded then fire the onDomReady event
			if("fdSlider" in window && typeof (fdSlider.onDomReady) != "undefined") {
				fdSlider.onDomReady();
			};
		}
	});
	
	// Video and Audio
	yepnope({
		test: Modernizr.video && Modernizr.audio,
		nope: ['video-js.css', 'video.js'],
		complete: function(url, result, key) {
			VideoJS.setupAllWhenReady();
		}
	});
	
	// SMIL
	yepnope({
		test: Modernizr.smil,
		nope: 'http://leunen.d.free.fr/fakesmile/smil.user.js'
	});
	
	// Websocket
	/* yepnope({
		test: Modernizr.websockets,
		nope: 'http://EasyWebsocket.org/easyWebSocket.min.js',
		callback: function(url, result, key) {
			WebSocket = EasyWebSocket;
		}
	}); */

	// Modernizr.svg
	// Modernizr.inlinesvg
	// Modernizr.svgclippaths
	
	// Modernizr.localstorage
	// Modernizr.sessionstorage
}