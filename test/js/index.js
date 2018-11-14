$(document).scroll(function () {
    var y = $(this).scrollTop();
    if (y > 50) {
        $('.navbar').fadeIn();
    } else {
        $('.navbar').fadeOut();
    }
});

//new Parallax(document.getElementById('scene'));

// Cache selectors
var lastId,
    topMenu = $("#nav-scroll"),
    topMenuHeight = topMenu.outerHeight()+15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){
  var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
  $('html, body').stop().animate({ 
      scrollTop: offsetTop
  }, 300);
  e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight;
   
   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
   if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
         .parent().removeClass("active")
         .end().filter("[href='#"+id+"']").parent().addClass("active");
   }                   
});

!function(a,b,c,d){"use strict";var e=a(b),f=a(c),g="paver",h={failureMessage:"Scroll left/right to pan through panorama.",failureMessageInsert:"after",gracefulFailure:!0,meta:!1,responsive:!0,startPosition:.5,minimumOverflow:200,grain:3,cursorThrottle:1e3/60,gyroscopeThrottle:1e3/60,resizeThrottle:500,mouseSmoothingFunction:"linear",tilt:!0,tiltSensitivity:.1,tiltScrollerPersistence:500,tiltSmoothingFunction:"gaussian",tiltThresholdPortrait:12,tiltThresholdLandscape:24},i={};"undefined"!=typeof console&&"undefined"!==console.warn||(console={},console.warn=function(){});var j=function(b,c){this.element=b,this.settings=a.extend({},h,c,a(this.element).data()),parseInt(this.settings.grain<=0)&&(this.settings.grain=1),this.settings.startPosition=Math.max(Math.min(this.settings.startPosition,1),0),this.settings.tiltThresholdPortrait=Math.max(Math.min(this.settings.tiltThresholdPortrait,180),0),this.settings.tiltThresholdLandscape=Math.max(Math.min(this.settings.tiltThresholdLandscape,180),0),this._name=g,this.mousemove={},i.features.hasGyroscope===!0?this.init():i.features.isTouch?this.fallback():this.init()};a.extend(j.prototype,{init:function(){f.trigger("enabled.paver"),k.defineElements(this);var c=this;if(!c.instanceData||!c.instanceData.initialized){c.instanceData={},c.instanceData.initialized=!0,c.instanceData.originalNode=c.$t.html(),k.domReplacement(this),k.getContainerDimensions(this),k.getCenter(this);var d=new Image,g=function(){return c.$t.trigger("imageLoadDone.paver"),c.instanceData.naturalWidth=c.$p[0].naturalWidth,c.instanceData.naturalHeight=c.$p[0].naturalHeight,c.instanceData.panoAspectRatio=c.instanceData.naturalWidth/c.instanceData.naturalHeight,c.instanceData.containerAspectRatio=c.instanceData.outerWidth/c.instanceData.outerHeight,!k.checkURL(c.$p.attr("src"))&&(k.replacePanorama(c),k.compute(c),k.checkOverflow(c)?(c.instanceData.panCounter=0,c.pan({xPos:c.settings.startPosition,yPos:c.settings.startPosition}),k.paverOn(c)):k.paverOff(c),e.on("resize",a.throttle(c.settings.resizeThrottle,function(){c.recompute()})),c.$t.on("recompute.paver",function(){c.recompute()}),c.$t.on("destroy.paver",function(){c.destroy()}),void c.$t.on("pan.paver",function(a,b){c.pan(b)}))},h=!1,i=setInterval(function(){d.naturalWidth&&d.naturalHeight&&(g(),h=!0,b.clearInterval(i))},100);d.onload=function(){h||g(),b.clearInterval(i)},d.src=c.$p.attr("src")}},fallback:function(){if(f.trigger("disabled.paver"),this.settings.gracefulFailure){var b=a(this.element),c=a("<div />",{"class":"paver__fallbackMessage"});switch(b.addClass("paver--fallback"),this.settings.failureMessageInsert.toLowerCase()){case"after":b.after(c.html(this.settings.failureMessage));break;case"before":b.before(c.html(this.settings.failureMessage));break;case"prepend":b.prepend(c.html(this.settings.failureMessage));break;case"append":b.append(c.html(this.settings.failureMessage));break;default:b.after(c.html(this.settings.failureMessage))}b.trigger("fallbackend.paver")}},unbindEvents:function(){a(this.element).off("mousemove.paver devicetilt.paver").removeClass("paver--on").addClass("paver--off")},destroy:function(){var b=a(this.element).data("plugin_paver");b&&(this.unbindEvents(),a(this.element).trigger("destroyed.paver").removeClass("paver--initialized paver--ready").empty().html(b.instanceData.originalNode),a(this.element).data("plugin_paver",null))},recompute:function(){var b=a(this.element),c=b.data("plugin_paver");b.off("mousemove.paver devicetilt.paver"),k.getContainerDimensions(this),c.instanceData.containerAspectRatio=c.instanceData.outerWidth/c.instanceData.outerHeight,b.trigger("recomputeStart.paver"),k.compute(this),k.checkOverflow(this)?(c.pan({xPos:Math.min(c.instanceData.lastPanX,1),yPos:Math.min(c.instanceData.lastPanY,1)}),k.paverOn(this)):k.paverOff(this)},pan:function(b){var c=a(this.element),f=c.find("div.paver__scroller"),g=f.find("span"),h=parseInt(this.settings.grain),i=c.data("plugin_paver");b?(b.xPos===d&&(b.xPos=i.settings.startPosition),b.yPos===d&&(b.yPos=i.settings.startPosition)):b={xPos:i.settings.startPosition,yPos:i.settings.startPosition},b.xPos>1?b.xPos=1:b.xPos<0&&(b.xPos=0),b.yPos>1?b.yPos=1:b.yPos<0&&(b.yPos=0);var j=b.xPos.toFixed(h),l=b.yPos.toFixed(h);i.instanceData.panCounter&&0!==i.instanceData.panCounter?c.trigger("panStart.paver"):c.trigger("initialPanStart.paver"),c.find("div.paver__pano").css("transform","translate("+-j*(i.instanceData.computedWidth-i.instanceData.outerWidth)+"px, "+-l*(i.instanceData.computedHeight-i.instanceData.outerHeight)+"px)").end().find("div.paver__scroller span").css("transform","translateX("+j*(f.width()-g.width())+"px)").end(),e.one(k.whichTransitionEnd(),function(){i.instanceData.panCounter&&0!==i.instanceData.panCounter?c.trigger("panEnd.paver"):c.trigger("initialPanEnd.paver")}),i.instanceData.panCounter+=1,i.instanceData.lastPanX=j,i.instanceData.lastPanY=l}});var k={whichTransitionEnd:function(){var a,b=c.createElement("div"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",transition:"transitionend"};for(a in e)if(b.style[a]!==d)return e[a]},normalcdf:function(a,b,c){var d=(c-a)/Math.sqrt(2*b*b),e=1/(1+.3275911*Math.abs(d)),f=.254829592,g=-.284496736,h=1.421413741,i=-1.453152027,j=1.061405429,k=1-((((j*e+i)*e+h)*e+g)*e+f)*e*Math.exp(-d*d),l=1;return d<0&&(l=-1),.5*(1+l*k)},smoothingFunction:{linear:function(a,b){return a>=b?1:a<=-b?0:.5*(a/b+1)},tangent:function(a,b){return a>=b?1:a<=-b?0:.5*(.5*Math.tan(a/b*(.351*Math.PI))+1)},cosine:function(a,b){return a>=b?1:a<=-b?0:.5*(Math.sin(a/b*(Math.PI/2))+1)},gaussian:function(a,b){return a>=b?1:a<=-b?0:k.normalcdf(0,.375,a/b)}},defineElements:function(b){b.t=b.element,b.$t=a(b.element),b.$p=b.$t.find("img").first(),b.instanceData=b.$t.data("instance-data")},domReplacement:function(b){b.$t.addClass("paver--initialized").append(a("<div />",{"class":"paver__meta"})),!b.settings.meta||b.$p.attr("title")===d&&b.$p.attr("alt")===d||!b.$p.attr("title").length&&!b.$p.attr("alt").length||b.$t.addClass("paver--metaActive").find(".paver__meta").html('<span class="paver__title">'+b.$p.attr("title")+'</span><span class="paver__desc">'+b.$p.attr("alt")+"</span>"),b.$t.trigger("init.paver")},getContainerDimensions:function(a){a.instanceData.outerWidth=a.$t.width(),a.instanceData.outerHeight=a.$t.height(),a.instanceData.offsetX=a.$t.offset().left,a.instanceData.offsetY=a.$t.offset().top},getCenter:function(a){a.instanceData.centerX=.5*a.instanceData.outerWidth,a.instanceData.centerY=.5*a.instanceData.outerHeight},replacePanorama:function(b){var c=a("<div />",{"class":"paver__pano"}).css("background-image","url("+k.formatURL(b.$p.attr("src"))+")"),d=a("<div />",{"class":"paver__scroller"}).append(a("<span />"));b.$t.addClass("paver--ready").append(c).append(d),b.$p.remove(),b.$t.trigger("ready.paver"),b.instanceData.ready=!0},checkOverflow:function(a){return a.instanceData.containerAspectRatio<=a.instanceData.panoAspectRatio&&a.instanceData.outerWidth<=a.instanceData.computedWidth-a.settings.minimumOverflow},paverOn:function(a){a.$t.removeClass("paver--off").addClass("paver--on").find("div.paver__pano").css("left",0),k.bindEvents(a)},paverOff:function(a){a.unbindEvents(a),a.settings.responsive===!0&&a.instanceData.naturalWidth>a.instanceData.outerWidth&&a.$t.css("min-height",a.instanceData.outerWidth/a.instanceData.panoAspectRatio).find("div.paver__pano").css({width:a.instanceData.outerWidth,height:"100%",left:"50%",transform:"translateX(-50%)"})},compute:function(a){a.instanceData.computedWidth=a.instanceData.outerHeight*a.instanceData.panoAspectRatio,a.instanceData.computedHeight=a.instanceData.computedWidth/a.instanceData.panoAspectRatio,k.getCenter(a),a.$t.find("div.paver__pano").css({width:a.instanceData.computedWidth,height:a.instanceData.outerHeight}),a.$t.trigger("computeEnd.paver")},bindEvents:function(a){i.features.isTouch?i.features.hasGyroscope&&a.settings.tilt&&k.bindOrientationEvents(a):k.bindMouseEvents(a),a.$t.trigger("eventsBound.paver")},bindMouseEvents:function(b){b.$t.on("mousemove.paver",a.throttle(b.settings.cursorThrottle,function(a){b.mousemove.dX=a.pageX-b.instanceData.offsetX-b.instanceData.centerX,b.mousemove.dY=a.pageY-b.instanceData.offsetY-b.instanceData.centerY;if("string"==typeof b.settings.mouseSmoothingFunction)k.defaultSmooth(b,b.settings.mouseSmoothingFunction,b.mousemove.dX,b.instanceData.centerX,b.mousemove.dY,b.instanceData.centerY);else if("function"==typeof b.settings.mouseSmoothingFunction){var c=b.settings.mouseSmoothingFunction.call(b,b.mousemove.dX,b.instanceData.centerX,b.mousemove.dY,b.instanceData.centerY);c!==d?b.pan({xPos:c.x,yPos:c.y}):k.defaultSmooth(b,h.settings.mouseSmoothingFunction,b.mousemove.dX,b.instanceData.centerX,b.mousemove.dY,b.instanceData.centerY)}}))},bindOrientationEvents:function(c){c.instanceData.prevTilt={};var e=null;c.$t.on("devicetilt.paver",a.throttle(c.settings.gyroscopeThrottle,function(f,g){if(0===c.settings.tiltScrollerPersistence)c.$t.addClass("paver--tilting");else if(!a.isEmptyObject(c.instanceData.prevTilt)&&(Math.abs(c.instanceData.prevTilt.b-g.b)>c.settings.tiltSensitivity||Math.abs(c.instanceData.prevTilt.g-g.g)>c.settings.tiltSensitivity)||a.isEmptyObject(c.instanceData.prevTilt)){c.$t.addClass("paver--tilting"),null!==e&&clearTimeout(e),e=b.setTimeout(function(){c.$t.removeClass("paver--tilting")},c.settings.tiltScrollerPersistence);var h,j={};switch(i.screenOrientationAngle){case 0:j={beta:g.b,gamma:g.g},h=c.settings.tiltThresholdPortrait;break;case 180:case-180:j={beta:-g.b,gamma:-g.g},h=c.settings.tiltThresholdPortrait;break;case 90:case-270:j={beta:-g.g,gamma:g.b},h=c.settings.tiltThresholdLandscape;break;case 270:case-90:j={beta:g.g,gamma:-g.b},h=c.settings.tiltThresholdLandscape;break;default:j={beta:g.b,gamma:g.g},h=c.settings.tiltThresholdPortrait}if("string"==typeof c.settings.tiltSmoothingFunction)k.defaultSmooth(c,c.settings.tiltSmoothingFunction,j.gamma,h,j.beta,h);else if("function"==typeof c.settings.tiltSmoothingFunction){var l=c.settings.mouseSmoothingFunction.call(c,j.gamma,h,j.beta,h);l!==d?c.pan({xPos:l.x,yPos:l.y}):k.defaultSmooth(c,c.settings.tiltSmoothingFunction,j.gamma,h,j.beta,h)}c.instanceData.prevTilt={a:g.a,b:g.b,g:g.g}}}))},defaultSmooth:function(a,b,c,d,e,f){var g=k.smoothingFunction[b];a.pan({xPos:g(c,d),yPos:g(e,f)})},checkURL:function(a){var b=0;return/[\s+]/g.test(a)?(console.warn("Paver: Paver has detected characters in your URL string ("+a+") that need to be properly encoded/escaped. Whitespace(s) have to be escaped manually. See RFC3986 documentation."),b=1):/[\"\'\(\)]/g.test(a)&&(console.warn("Paver: Plugin will proceed, but it has detected characters in your URL string ("+a+") that need to be properly encoded/escaped. These will be escaped for you. See RFC3986 documentation."),b=0),b},formatURL:function(a){return a.replace(/"/g,"%22").replace(/'/g,"%27").replace(/\(/g,"%28").replace(/\)/g,"%29")}};a.fn.paver=function(e){var k=this,l=arguments;i={features:{isTouch:!1,hasGyroscope:!1,hasScreenOrientationAPI:!(!b.screen||!b.screen.orientation||b.screen.orientation.angle===d||null===b.screen.orientation.angle)},screenOrientationAngle:null,startTilt:{}};var m={isTouch:function(){try{c.createEvent("TouchEvent"),i.features.isTouch=!0}catch(a){i.features.isTouch=!1}},hasGyroscope:function(){var c=new a.Deferred,d=!1,e=function(a){return null!==a.alpha&&null!==a.beta&&null!==a.gamma?c.resolve({orientation:{alpha:a.alpha,beta:a.beta,gamma:a.gamma},status:{deviceOrientationEventSupport:!0,deviceOrientationData:!0}}):c.reject({status:{deviceOrientationEventSupport:!0,deviceOrientationData:!1}}),b.removeEventListener("deviceorientation",e,!1),d=!0,c.promise()};return b.DeviceOrientationEvent?(b.addEventListener("deviceorientation",e,!1),navigator.userAgent.toLowerCase().indexOf("firefox")>-1&&b.setTimeout(function(){return c.reject({status:{deviceOrientationEventSupport:!0,deviceOrientationData:!1}}),c.promise()},250)):c.reject({status:{deviceOrientationEventSupport:!1,deviceOrientationData:!1}}),c.promise()},hasOrientation:function(){i.screenOrientationAngle=i.features.hasScreenOrientationAPI?b.screen.orientation.angle:b.orientation||0}};m.isTouch(),m.hasOrientation(),b.addEventListener("orientationchange",function(){m.hasOrientation(),m.hasGyroscope()},!1);var n=function(){var c=a(this),f=function(a){var b={a:a.alpha-i.startTilt.alpha,b:a.beta-i.startTilt.beta,g:a.gamma-i.startTilt.gamma};c.trigger("devicetilt.paver",[b])};if(i.features.hasGyroscope&&b.addEventListener("deviceorientation",f,!1),e===d||"object"==typeof e)return c.each(function(){a.data(this,"plugin_"+g)||a.data(this,"plugin_"+g,new j(this,e))});if("string"==typeof e&&"_"!==e[0]&&"init"!==e){var h;return c.each(function(){var b=a.data(this,"plugin_"+g);b instanceof j&&"function"==typeof b[e]&&(h=b[e].apply(b,Array.prototype.slice.call(l,1)))}),typeof h!=typeof d?h:c}},o={yes:function(a){i.features.hasGyroscope=!0,i.startTilt.alpha=a.orientation.alpha,i.startTilt.beta=a.orientation.beta,i.startTilt.gamma=a.orientation.gamma,f.trigger("hasGyroscopeData.paver",[a]),n.call(k)},no:function(){console.warn("Gyroscopic data unavailable. Falling back to cursor-based panning."),i.features.hasGyroscope=!1;var a={status:{deviceOrientationEventSupport:!1,deviceOrientationData:!1}};f.trigger("hasNoGyroscopeData.paver",[a]),n.call(k)}},p=a.extend({},h,e,a(this.element).data());return a.when(m.hasGyroscope()).then(function(a){typeof a!=typeof d&&p.tilt===!0?o.yes(a):o.no()},function(a){o.no()}),k}}(jQuery,window,document);

jQuery(function () {
   $('.panorama').paver({
// Here I use the recommended argument names for x and y axis changes
mouseSmoothingFunction: function(deltaX, thresholdX, deltaY, thresholdY) {
	// Declare x and y
	var x, y;
	// Reverse linear transformation
	if(deltaX >= thresholdX) x = 1;
	if(deltaX <= thresholdX) x = 0;
	x = 0.5 * (-deltaX/thresholdX + 1);

	if(deltaY >= thresholdY) y = 1;
	if(deltaY <= thresholdY) y = 0;
	y = 0.5 * (-deltaY/thresholdY + 1);

	return {x: x,y: y};
},
// Here I use LR and FB to denote tilting along the x and y axis
tiltSmoothingFunction: function(deltaLR, thresholdLR, deltaFB, thresholdFB) {
	// Left-right and forward-backward
	var lr, fb;
	if(deltaLR >= thresholdLR) lr = 1;
	if(deltaLR <= thresholdLR) lr = 0;
	lr = 0.5 * (-deltaLR/thresholdLR + 1);

	if(deltaFB >= thresholdFB) fb = 1;
	if(deltaFB <= thresholdFB) fb = 0;
	fb = 0.5 * (-deltaFB/thresholdFB + 1);

	return {lr: lr, y: fb};
}
});
});