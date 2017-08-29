(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var _page=require("page.js"),_page2=_interopRequireDefault(_page),_Elements=require("./Services/Elements"),_GameLogic=require("./Services/GameLogic"),baseURL="/rock-paper-scissors",loadView=function(e){var a=e.path?e.path.substring(1,e.path.length):e,t=document.querySelectorAll(".view");return[].forEach.call(t,function(e){e.style.display="none"}),document.getElementById(a).style.display="block",!1};(0,_page2.default)(baseURL,function(){loadView("splash"),setTimeout(function(){return(0,_page2.default)(baseURL+"/menu")},2e3)}),(0,_page2.default)(baseURL+"/menu",function(){loadView("menu")}),(0,_page2.default)(baseURL+"/rules",function(){loadView("rules")}),(0,_page2.default)(baseURL+"/about",function(){loadView("about")}),(0,_page2.default)(baseURL+"/game",function(){_Elements.Elem.gameoverOverlay.style.display="none",_GameLogic.GameLogic.resetGame(),loadView("game")}),(0,_page2.default)({hashbang:!0}),(0,_page2.default)(""+baseURL);

},{"./Services/Elements":3,"./Services/GameLogic":4,"page.js":7}],2:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Animation=void 0;var _Elements=require("./Elements"),Animation=exports.Animation={btnColor:{rock:"yellow",paper:"blue",scissors:"green"},tieAnimation:function(){_Elements.Elem.msgEl.innerHTML="Tie! :/",_Elements.Elem.msgEl.style.display="block",_Elements.Elem.msgEl.classList.add("shake"),setTimeout(function(){_Elements.Elem.msgEl.style.display="none",_Elements.Elem.msgEl.classList.remove("shake"),_Elements.Elem.hiddenOverlay.style.display="none"},1e3)},winAnimation:function(){_Elements.Elem.msgEl.innerHTML="You Won! :D",_Elements.Elem.msgEl.style.display="block",_Elements.Elem.msgEl.classList.add("flash"),setTimeout(function(){_Elements.Elem.msgEl.style.display="none",_Elements.Elem.msgEl.classList.remove("flash"),_Elements.Elem.hiddenOverlay.style.display="none"},1e3),_Elements.Elem.playerScoreEl.innerHTML=++_Elements.Elem.playerScoreEl.innerHTML},loseAnimation:function(){_Elements.Elem.msgEl.innerHTML="You Lose! :(",_Elements.Elem.msgEl.style.display="block",_Elements.Elem.msgEl.classList.add("swing"),setTimeout(function(){_Elements.Elem.msgEl.style.display="none",_Elements.Elem.msgEl.classList.remove("swing"),_Elements.Elem.hiddenOverlay.style.display="none"},1e3),_Elements.Elem.computerScoreEl.innerHTML=++_Elements.Elem.computerScoreEl.innerHTML},playerMoveAnimation:function(e){var l=this;_Elements.Elem.playerChoiceEl.firstChild.classList.add("icon-"+e),_Elements.Elem.playerChoiceEl.classList.add(this.btnColor[e]),_Elements.Elem.playerChoiceEl.classList.add("bounceInLeft"),_Elements.Elem.playerChoiceEl.style.display="inline-block",_Elements.Elem.hiddenOverlay.style.display="block",setTimeout(function(){_Elements.Elem.playerChoiceEl.style.display="none",_Elements.Elem.playerChoiceEl.classList.remove("bounceInLeft"),_Elements.Elem.playerChoiceEl.classList.remove(l.btnColor[e]),_Elements.Elem.playerChoiceEl.firstChild.classList.remove("icon-"+e)},1500)},computerMoveAnimation:function(e){var l=this;_Elements.Elem.computerChoiceEl.firstChild.classList.add("icon-"+e),_Elements.Elem.computerChoiceEl.classList.add(this.btnColor[e]),_Elements.Elem.computerChoiceEl.classList.add("reflect"),_Elements.Elem.computerChoiceEl.classList.add("bounceInRight"),_Elements.Elem.computerChoiceEl.style.display="inline-block",setTimeout(function(){_Elements.Elem.computerChoiceEl.style.display="none",_Elements.Elem.computerChoiceEl.classList.remove("bounceInRight"),_Elements.Elem.computerChoiceEl.classList.remove(l.btnColor[e]),_Elements.Elem.computerChoiceEl.firstChild.classList.remove("icon-"+e)},1500)},gameoverAnimation:function(e){_Elements.Elem.gameoverMsg.innerHTML=e,_Elements.Elem.gameoverOverlay.classList.add("fadeIn"),_Elements.Elem.gameoverOverlay.style.display="flex",_Elements.Elem.gameoverDialog.classList.add("zoomIn")},playAgainAnimation:function(){_Elements.Elem.gameoverMsg.innerHTML="",_Elements.Elem.gameoverDialog.classList.add("zoomOut"),_Elements.Elem.gameoverOverlay.classList.add("fadeOut"),setTimeout(function(){_Elements.Elem.gameoverDialog.classList.remove("zoomOut"),_Elements.Elem.gameoverOverlay.classList.remove("fadeOut"),_Elements.Elem.gameoverOverlay.style.display="none"},500)}};

},{"./Elements":3}],3:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var Elem=exports.Elem={playerScoreEl:document.getElementsByClassName("player-score")[0],computerScoreEl:document.getElementsByClassName("computer-score")[0],msgEl:document.getElementsByClassName("win-msg")[0],playerChoiceEl:document.getElementsByClassName("player-choice")[0],computerChoiceEl:document.getElementsByClassName("computer-choice")[0],gameoverOverlay:document.getElementsByClassName("gameover-overlay")[0],gameoverDialog:document.getElementsByClassName("gameover-dialog")[0],gameoverMsg:document.getElementsByClassName("gameover-msg")[0],hiddenOverlay:document.getElementsByClassName("hidden-overlay")[0]};

},{}],4:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.GameLogic=void 0;var _Elements=require("./Elements"),GameLogic=exports.GameLogic={playerScore:0,computerScore:0,gameOverAt:10,getComputerChoice:function(){var e=Math.random();return e<.34?"rock":e<.65?"paper":"scissors"},isTie:function(e,r){return e===r?1:0},playerWon:function(e,r){return"rock"===e?"scissors"===r?1:0:"scissors"===e?"paper"===r?1:0:"paper"===e?"rock"===r?1:0:void 0},isGameOver:function(){return this.playerScore===this.gameOverAt||this.computerScore===this.gameOverAt},playerWonGame:function(){return this.playerScore===this.gameOverAt},resetGame:function(){this.playerScore=0,this.computerScore=0,_Elements.Elem.playerScoreEl.innerHTML=0,_Elements.Elem.computerScoreEl.innerHTML=0}};

},{"./Elements":3}],5:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var _GameLogic=require("./Services/GameLogic"),_Animation=require("./Services/Animation"),_Routes=require("./Routes"),_fastclick=require("fastclick"),_fastclick2=_interopRequireDefault(_fastclick);(0,_fastclick2.default)(document.body);var actionButtons=document.querySelectorAll(".sub-flexbox.left .gab");[].forEach.call(actionButtons,function(e){e.addEventListener("click",function(e){var i=e.target.dataset.player,a=_GameLogic.GameLogic.getComputerChoice();_Animation.Animation.playerMoveAnimation(i),_Animation.Animation.computerMoveAnimation(a),setTimeout(function(){_GameLogic.GameLogic.isTie(i,a)?_Animation.Animation.tieAnimation():_GameLogic.GameLogic.playerWon(i,a)?(_GameLogic.GameLogic.playerScore++,_Animation.Animation.winAnimation()):(_GameLogic.GameLogic.computerScore++,_Animation.Animation.loseAnimation()),_GameLogic.GameLogic.isGameOver()&&(_GameLogic.GameLogic.playerWonGame()?_Animation.Animation.gameoverAnimation("Yeee! You have beaten the evil computer! :D"):_Animation.Animation.gameoverAnimation("Nooo! You have been beaten by the evil computer! :("))},500)})});var playAgainButton=document.getElementsByClassName("play-again")[0];playAgainButton.addEventListener("click",function(e){_GameLogic.GameLogic.resetGame(),_Animation.Animation.playAgainAnimation(),e.preventDefault()});

},{"./Routes":1,"./Services/Animation":2,"./Services/GameLogic":4,"fastclick":6}],6:[function(require,module,exports){
!function(){"use strict";function t(e,o){var i;if(o=o||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=o.touchBoundary||10,this.layer=e,this.tapDelay=o.tapDelay||200,this.tapTimeout=o.tapTimeout||700,!t.notNeeded(e)){for(var r=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],a=this,c=0,s=r.length;c<s;c++)a[r[c]]=function(t,e){return function(){return t.apply(e,arguments)}}(a[r[c]],a);n&&(e.addEventListener("mouseover",this.onMouse,!0),e.addEventListener("mousedown",this.onMouse,!0),e.addEventListener("mouseup",this.onMouse,!0)),e.addEventListener("click",this.onClick,!0),e.addEventListener("touchstart",this.onTouchStart,!1),e.addEventListener("touchmove",this.onTouchMove,!1),e.addEventListener("touchend",this.onTouchEnd,!1),e.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(e.removeEventListener=function(t,n,o){var i=Node.prototype.removeEventListener;"click"===t?i.call(e,t,n.hijacked||n,o):i.call(e,t,n,o)},e.addEventListener=function(t,n,o){var i=Node.prototype.addEventListener;"click"===t?i.call(e,t,n.hijacked||(n.hijacked=function(t){t.propagationStopped||n(t)}),o):i.call(e,t,n,o)}),"function"==typeof e.onclick&&(i=e.onclick,e.addEventListener("click",function(t){i(t)},!1),e.onclick=null)}}var e=navigator.userAgent.indexOf("Windows Phone")>=0,n=navigator.userAgent.indexOf("Android")>0&&!e,o=/iP(ad|hone|od)/.test(navigator.userAgent)&&!e,i=o&&/OS 4_\d(_\d)?/.test(navigator.userAgent),r=o&&/OS [6-7]_\d/.test(navigator.userAgent),a=navigator.userAgent.indexOf("BB10")>0;t.prototype.needsClick=function(t){switch(t.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(t.disabled)return!0;break;case"input":if(o&&"file"===t.type||t.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(t.className)},t.prototype.needsFocus=function(t){switch(t.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!n;case"input":switch(t.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!t.disabled&&!t.readOnly;default:return/\bneedsfocus\b/.test(t.className)}},t.prototype.sendClick=function(t,e){var n,o;document.activeElement&&document.activeElement!==t&&document.activeElement.blur(),o=e.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(t),!0,!0,window,1,o.screenX,o.screenY,o.clientX,o.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,t.dispatchEvent(n)},t.prototype.determineEventType=function(t){return n&&"select"===t.tagName.toLowerCase()?"mousedown":"click"},t.prototype.focus=function(t){var e;o&&t.setSelectionRange&&0!==t.type.indexOf("date")&&"time"!==t.type&&"month"!==t.type?(e=t.value.length,t.setSelectionRange(e,e)):t.focus()},t.prototype.updateScrollParent=function(t){var e,n;if(!(e=t.fastClickScrollParent)||!e.contains(t)){n=t;do{if(n.scrollHeight>n.offsetHeight){e=n,t.fastClickScrollParent=n;break}n=n.parentElement}while(n)}e&&(e.fastClickLastScrollTop=e.scrollTop)},t.prototype.getTargetElementFromEventTarget=function(t){return t.nodeType===Node.TEXT_NODE?t.parentNode:t},t.prototype.onTouchStart=function(t){var e,n,r;if(t.targetTouches.length>1)return!0;if(e=this.getTargetElementFromEventTarget(t.target),n=t.targetTouches[0],o){if(r=window.getSelection(),r.rangeCount&&!r.isCollapsed)return!0;if(!i){if(n.identifier&&n.identifier===this.lastTouchIdentifier)return t.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(e)}}return this.trackingClick=!0,this.trackingClickStart=t.timeStamp,this.targetElement=e,this.touchStartX=n.pageX,this.touchStartY=n.pageY,t.timeStamp-this.lastClickTime<this.tapDelay&&t.preventDefault(),!0},t.prototype.touchHasMoved=function(t){var e=t.changedTouches[0],n=this.touchBoundary;return Math.abs(e.pageX-this.touchStartX)>n||Math.abs(e.pageY-this.touchStartY)>n},t.prototype.onTouchMove=function(t){return!this.trackingClick||((this.targetElement!==this.getTargetElementFromEventTarget(t.target)||this.touchHasMoved(t))&&(this.trackingClick=!1,this.targetElement=null),!0)},t.prototype.findControl=function(t){return void 0!==t.control?t.control:t.htmlFor?document.getElementById(t.htmlFor):t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},t.prototype.onTouchEnd=function(t){var e,a,c,s,u,l=this.targetElement;if(!this.trackingClick)return!0;if(t.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(t.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;if(this.cancelNextClick=!1,this.lastClickTime=t.timeStamp,a=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,r&&(u=t.changedTouches[0],l=document.elementFromPoint(u.pageX-window.pageXOffset,u.pageY-window.pageYOffset)||l,l.fastClickScrollParent=this.targetElement.fastClickScrollParent),"label"===(c=l.tagName.toLowerCase())){if(e=this.findControl(l)){if(this.focus(l),n)return!1;l=e}}else if(this.needsFocus(l))return t.timeStamp-a>100||o&&window.top!==window&&"input"===c?(this.targetElement=null,!1):(this.focus(l),this.sendClick(l,t),o&&"select"===c||(this.targetElement=null,t.preventDefault()),!1);return!(!o||i||!(s=l.fastClickScrollParent)||s.fastClickLastScrollTop===s.scrollTop)||(this.needsClick(l)||(t.preventDefault(),this.sendClick(l,t)),!1)},t.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},t.prototype.onMouse=function(t){return!this.targetElement||(!!t.forwardedTouchEvent||(!t.cancelable||(!(!this.needsClick(this.targetElement)||this.cancelNextClick)||(t.stopImmediatePropagation?t.stopImmediatePropagation():t.propagationStopped=!0,t.stopPropagation(),t.preventDefault(),!1))))},t.prototype.onClick=function(t){var e;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===t.target.type&&0===t.detail||(e=this.onMouse(t),e||(this.targetElement=null),e)},t.prototype.destroy=function(){var t=this.layer;n&&(t.removeEventListener("mouseover",this.onMouse,!0),t.removeEventListener("mousedown",this.onMouse,!0),t.removeEventListener("mouseup",this.onMouse,!0)),t.removeEventListener("click",this.onClick,!0),t.removeEventListener("touchstart",this.onTouchStart,!1),t.removeEventListener("touchmove",this.onTouchMove,!1),t.removeEventListener("touchend",this.onTouchEnd,!1),t.removeEventListener("touchcancel",this.onTouchCancel,!1)},t.notNeeded=function(t){var e,o,i;if(void 0===window.ontouchstart)return!0;if(o=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!n)return!0;if(e=document.querySelector("meta[name=viewport]")){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(o>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(a&&(i=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),i[1]>=10&&i[2]>=3&&(e=document.querySelector("meta[name=viewport]")))){if(-1!==e.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===t.style.msTouchAction||"manipulation"===t.style.touchAction||(!!(+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]>=27&&(e=document.querySelector("meta[name=viewport]"))&&(-1!==e.content.indexOf("user-scalable=no")||document.documentElement.scrollWidth<=window.outerWidth))||("none"===t.style.touchAction||"manipulation"===t.style.touchAction))},t.attach=function(e,n){return new t(e,n)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return t}):"undefined"!=typeof module&&module.exports?(module.exports=t.attach,module.exports.FastClick=t):window.FastClick=t}();
},{}],7:[function(require,module,exports){
(function (process){
"use strict";function page(e,t){if("function"==typeof e)return page("*",e);if("function"==typeof t)for(var n=new Route(e),a=1;a<arguments.length;++a)page.callbacks.push(n.middleware(arguments[a]));else"string"==typeof e?page["string"==typeof t?"redirect":"show"](e,t):page.start(e)}function unhandled(e){if(!e.handled){var t;t=hashbang?base+location.hash.replace("#!",""):location.pathname+location.search,t!==e.canonicalPath&&(page.stop(),e.handled=!1,location.href=e.canonicalPath)}}function decodeURLEncodedURIComponent(e){return"string"!=typeof e?e:decodeURLComponents?decodeURIComponent(e.replace(/\+/g," ")):e}function Context(e,t){"/"===e[0]&&0!==e.indexOf(base)&&(e=base+(hashbang?"#!":"")+e);var n=e.indexOf("?");if(this.canonicalPath=e,this.path=e.replace(base,"")||"/",hashbang&&(this.path=this.path.replace("#!","")||"/"),this.title=document.title,this.state=t||{},this.state.path=e,this.querystring=~n?decodeURLEncodedURIComponent(e.slice(n+1)):"",this.pathname=decodeURLEncodedURIComponent(~n?e.slice(0,n):e),this.params={},this.hash="",!hashbang){if(!~this.path.indexOf("#"))return;var a=this.path.split("#");this.path=a[0],this.hash=decodeURLEncodedURIComponent(a[1])||"",this.querystring=this.querystring.split("#")[0]}}function Route(e,t){t=t||{},this.path=e,this.method="GET",this.regexp=pathtoRegexp(this.path,this.keys=[],t.sensitive,t.strict)}function onclick(e){if(1===which(e)&&!(e.metaKey||e.ctrlKey||e.shiftKey||e.defaultPrevented)){for(var t=e.target;t&&"A"!==t.nodeName;)t=t.parentNode;if(t&&"A"===t.nodeName&&!t.hasAttribute("download")&&"external"!==t.getAttribute("rel")){var n=t.getAttribute("href");if((hashbang||t.pathname!==location.pathname||!t.hash&&"#"!==n)&&!(n&&n.indexOf("mailto:")>-1)&&!t.target&&sameOrigin(t.href)){var a=t.pathname+t.search+(t.hash||"");"undefined"!=typeof process&&a.match(/^\/[a-zA-Z]:\//)&&(a=a.replace(/^\/[a-zA-Z]:\//,"/"));var o=a;0===a.indexOf(base)&&(a=a.substr(base.length)),hashbang&&(a=a.replace("#!","")),base&&o===a||(e.preventDefault(),page.show(o))}}}}function which(e){return e=e||window.event,null===e.which?e.button:e.which}function sameOrigin(e){var t=location.protocol+"//"+location.hostname;return location.port&&(t+=":"+location.port),e&&0===e.indexOf(t)}var pathtoRegexp=require("path-to-regexp");module.exports=page;var clickEvent="undefined"!=typeof document&&document.ontouchstart?"touchstart":"click",location="undefined"!=typeof window&&(window.history.location||window.location),dispatch=!0,decodeURLComponents=!0,base="",running,hashbang=!1,prevContext;page.callbacks=[],page.exits=[],page.current="",page.len=0,page.base=function(e){if(0===arguments.length)return base;base=e},page.start=function(e){if(e=e||{},!running&&(running=!0,!1===e.dispatch&&(dispatch=!1),!1===e.decodeURLComponents&&(decodeURLComponents=!1),!1!==e.popstate&&window.addEventListener("popstate",onpopstate,!1),!1!==e.click&&document.addEventListener(clickEvent,onclick,!1),!0===e.hashbang&&(hashbang=!0),dispatch)){var t=hashbang&&~location.hash.indexOf("#!")?location.hash.substr(2)+location.search:location.pathname+location.search+location.hash;page.replace(t,null,!0,dispatch)}},page.stop=function(){running&&(page.current="",page.len=0,running=!1,document.removeEventListener(clickEvent,onclick,!1),window.removeEventListener("popstate",onpopstate,!1))},page.show=function(e,t,n,a){var o=new Context(e,t);return page.current=o.path,!1!==n&&page.dispatch(o),!1!==o.handled&&!1!==a&&o.pushState(),o},page.back=function(e,t){page.len>0?(history.back(),page.len--):e?setTimeout(function(){page.show(e,t)}):setTimeout(function(){page.show(base,t)})},page.redirect=function(e,t){"string"==typeof e&&"string"==typeof t&&page(e,function(e){setTimeout(function(){page.replace(t)},0)}),"string"==typeof e&&void 0===t&&setTimeout(function(){page.replace(e)},0)},page.replace=function(e,t,n,a){var o=new Context(e,t);return page.current=o.path,o.init=n,o.save(),!1!==a&&page.dispatch(o),o},page.dispatch=function(e){function t(){var e=page.exits[i++];if(!e)return n();e(a,t)}function n(){var t=page.callbacks[o++];return e.path!==page.current?void(e.handled=!1):t?void t(e,n):unhandled(e)}var a=prevContext,o=0,i=0;prevContext=e,a?t():n()},page.exit=function(e,t){if("function"==typeof e)return page.exit("*",e);for(var n=new Route(e),a=1;a<arguments.length;++a)page.exits.push(n.middleware(arguments[a]))},page.Context=Context,Context.prototype.pushState=function(){page.len++,history.pushState(this.state,this.title,hashbang&&"/"!==this.path?"#!"+this.path:this.canonicalPath)},Context.prototype.save=function(){history.replaceState(this.state,this.title,hashbang&&"/"!==this.path?"#!"+this.path:this.canonicalPath)},page.Route=Route,Route.prototype.middleware=function(e){var t=this;return function(n,a){if(t.match(n.path,n.params))return e(n,a);a()}},Route.prototype.match=function(e,t){var n=this.keys,a=e.indexOf("?"),o=~a?e.slice(0,a):e,i=this.regexp.exec(decodeURIComponent(o));if(!i)return!1;for(var s=1,r=i.length;s<r;++s){var h=n[s-1];if(h){var p=decodeURLEncodedURIComponent(i[s]);void 0===p&&hasOwnProperty.call(t,h.name)||(t[h.name]=p)}}return!0};var onpopstate=function(){var e=!1;if("undefined"!=typeof window)return"complete"===document.readyState?e=!0:window.addEventListener("load",function(){setTimeout(function(){e=!0},0)}),function(t){if(e)if(t.state){var n=t.state.path;page.replace(n,t.state)}else page.show(location.pathname+location.hash,void 0,void 0,!1)}}();page.sameOrigin=sameOrigin;
}).call(this,require('_process'))
},{"_process":9,"path-to-regexp":8}],8:[function(require,module,exports){
function pathtoRegexp(e,n,t){t=t||{},n=n||[];var r,o=t.strict,a=!1!==t.end,f=t.sensitive?"":"i",i=0,p=n.length,g=0,s=0;if(e instanceof RegExp){for(;r=MATCHING_GROUP_REGEXP.exec(e.source);)n.push({name:s++,optional:!1,offset:r.index});return e}if(Array.isArray(e))return e=e.map(function(e){return pathtoRegexp(e,n,t).source}),new RegExp("(?:"+e.join("|")+")",f);for(e=("^"+e+(o?"":"/"===e[e.length-1]?"?":"/?")).replace(/\/\(/g,"/(?:").replace(/([\/\.])/g,"\\$1").replace(/(\\\/)?(\\\.)?:(\w+)(\(.*?\))?(\*)?(\?)?/g,function(e,t,r,o,a,f,p,g){t=t||"",r=r||"",a=a||"([^\\/"+r+"]+?)",p=p||"",n.push({name:o,optional:!!p,offset:g+i});var s=(p?"":t)+"(?:"+r+(p?t:"")+a+(f?"((?:[\\/"+r+"].+?)?)":"")+")"+p;return i+=s.length-e.length,s}).replace(/\*/g,function(e,t){for(var r=n.length;r-- >p&&n[r].offset>t;)n[r].offset+=3;return"(.*)"});r=MATCHING_GROUP_REGEXP.exec(e);){for(var c=0,l=r.index;"\\"===e.charAt(--l);)c++;c%2!=1&&((p+g===n.length||n[p+g].offset>r.index)&&n.splice(p+g,0,{name:s++,optional:!1,offset:r.index}),g++)}return e+=a?"$":"/"===e[e.length-1]?"":"(?=\\/|$)",new RegExp(e,f)}module.exports=pathtoRegexp;var MATCHING_GROUP_REGEXP=/\((?!\?)/g;
},{}],9:[function(require,module,exports){
function defaultSetTimout(){throw new Error("setTimeout has not been defined")}function defaultClearTimeout(){throw new Error("clearTimeout has not been defined")}function runTimeout(e){if(cachedSetTimeout===setTimeout)return setTimeout(e,0);if((cachedSetTimeout===defaultSetTimout||!cachedSetTimeout)&&setTimeout)return cachedSetTimeout=setTimeout,setTimeout(e,0);try{return cachedSetTimeout(e,0)}catch(t){try{return cachedSetTimeout.call(null,e,0)}catch(t){return cachedSetTimeout.call(this,e,0)}}}function runClearTimeout(e){if(cachedClearTimeout===clearTimeout)return clearTimeout(e);if((cachedClearTimeout===defaultClearTimeout||!cachedClearTimeout)&&clearTimeout)return cachedClearTimeout=clearTimeout,clearTimeout(e);try{return cachedClearTimeout(e)}catch(t){try{return cachedClearTimeout.call(null,e)}catch(t){return cachedClearTimeout.call(this,e)}}}function cleanUpNextTick(){draining&&currentQueue&&(draining=!1,currentQueue.length?queue=currentQueue.concat(queue):queueIndex=-1,queue.length&&drainQueue())}function drainQueue(){if(!draining){var e=runTimeout(cleanUpNextTick);draining=!0;for(var t=queue.length;t;){for(currentQueue=queue,queue=[];++queueIndex<t;)currentQueue&&currentQueue[queueIndex].run();queueIndex=-1,t=queue.length}currentQueue=null,draining=!1,runClearTimeout(e)}}function Item(e,t){this.fun=e,this.array=t}function noop(){}var process=module.exports={},cachedSetTimeout,cachedClearTimeout;!function(){try{cachedSetTimeout="function"==typeof setTimeout?setTimeout:defaultSetTimout}catch(e){cachedSetTimeout=defaultSetTimout}try{cachedClearTimeout="function"==typeof clearTimeout?clearTimeout:defaultClearTimeout}catch(e){cachedClearTimeout=defaultClearTimeout}}();var queue=[],draining=!1,currentQueue,queueIndex=-1;process.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];queue.push(new Item(e,t)),1!==queue.length||draining||runTimeout(drainQueue)},Item.prototype.run=function(){this.fun.apply(null,this.array)},process.title="browser",process.browser=!0,process.env={},process.argv=[],process.version="",process.versions={},process.on=noop,process.addListener=noop,process.once=noop,process.off=noop,process.removeListener=noop,process.removeAllListeners=noop,process.emit=noop,process.prependListener=noop,process.prependOnceListener=noop,process.listeners=function(e){return[]},process.binding=function(e){throw new Error("process.binding is not supported")},process.cwd=function(){return"/"},process.chdir=function(e){throw new Error("process.chdir is not supported")},process.umask=function(){return 0};
},{}]},{},[5]);
