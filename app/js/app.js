(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _page = require('page.js');

var _page2 = _interopRequireDefault(_page);

var _Elements = require('./Services/Elements');

var _GameLogic = require('./Services/GameLogic');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadView = function loadView(view) {
	var viewId = view.path ? view.path.substring(1, view.path.length) : view;

	var views = document.querySelectorAll('.view');
	[].forEach.call(views, function (view) {
		view.style.display = 'none';
	});
	document.getElementById(viewId).style.display = 'block';
	return false;
};

(0, _page2.default)('/', function () {
	loadView('splash');
	setTimeout(function () {
		return (0, _page2.default)('/menu');
	}, 2000);
});
(0, _page2.default)('/menu', loadView);
(0, _page2.default)('/rules', loadView);
(0, _page2.default)('/about', loadView);
(0, _page2.default)('/game', function () {
	_Elements.Elem.gameoverDialog.style.display = 'none';
	_Elements.Elem.gameoverOverlay.style.display = 'none';
	_GameLogic.GameLogic.resetGame();
	loadView('game');
});

(0, _page2.default)();

},{"./Services/Elements":3,"./Services/GameLogic":4,"page.js":7}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Animation = undefined;

var _Elements = require('./Elements');

var Animation = exports.Animation = {
	btnColor: {
		rock: 'yellow',
		paper: 'blue',
		scissors: 'green'
	},
	tieAnimation: function tieAnimation() {
		_Elements.Elem.msgEl.innerHTML = "Tie! :/";
		_Elements.Elem.msgEl.style.display = "block";
		_Elements.Elem.msgEl.classList.add('shake');
		setTimeout(function () {
			_Elements.Elem.msgEl.style.display = "none";
			_Elements.Elem.msgEl.classList.remove('shake');
			_Elements.Elem.hiddenOverlay.style.display = 'none';
		}, 1000);
	},
	winAnimation: function winAnimation() {
		_Elements.Elem.msgEl.innerHTML = "You Won! :D";
		_Elements.Elem.msgEl.style.display = "block";
		_Elements.Elem.msgEl.classList.add('flash');
		setTimeout(function () {
			_Elements.Elem.msgEl.style.display = "none";
			_Elements.Elem.msgEl.classList.remove('flash');
			_Elements.Elem.hiddenOverlay.style.display = 'none';
		}, 1000);
		_Elements.Elem.playerScoreEl.innerHTML = ++_Elements.Elem.playerScoreEl.innerHTML;
	},
	loseAnimation: function loseAnimation() {
		_Elements.Elem.msgEl.innerHTML = "You Lose! :(";
		_Elements.Elem.msgEl.style.display = "block";
		_Elements.Elem.msgEl.classList.add('swing');
		setTimeout(function () {
			_Elements.Elem.msgEl.style.display = "none";
			_Elements.Elem.msgEl.classList.remove('swing');
			_Elements.Elem.hiddenOverlay.style.display = 'none';
		}, 1000);
		_Elements.Elem.computerScoreEl.innerHTML = ++_Elements.Elem.computerScoreEl.innerHTML;
	},
	playerMoveAnimation: function playerMoveAnimation(move) {
		var _this = this;

		_Elements.Elem.playerChoiceEl.firstChild.classList.add('icon-' + move);
		_Elements.Elem.playerChoiceEl.classList.add(this.btnColor[move]);
		_Elements.Elem.playerChoiceEl.classList.add('bounceInLeft');
		_Elements.Elem.playerChoiceEl.style.display = 'inline-block';
		_Elements.Elem.hiddenOverlay.style.display = 'block';
		setTimeout(function () {
			_Elements.Elem.playerChoiceEl.style.display = 'none';
			_Elements.Elem.playerChoiceEl.classList.remove('bounceInLeft');
			_Elements.Elem.playerChoiceEl.classList.remove(_this.btnColor[move]);
			_Elements.Elem.playerChoiceEl.firstChild.classList.remove('icon-' + move);
		}, 1500);
	},
	computerMoveAnimation: function computerMoveAnimation(move) {
		var _this2 = this;

		_Elements.Elem.computerChoiceEl.firstChild.classList.add('icon-' + move);
		_Elements.Elem.computerChoiceEl.classList.add(this.btnColor[move]);
		_Elements.Elem.computerChoiceEl.classList.add('bounceInRight');
		_Elements.Elem.computerChoiceEl.style.display = 'inline-block';
		setTimeout(function () {
			_Elements.Elem.computerChoiceEl.style.display = 'none';
			_Elements.Elem.computerChoiceEl.classList.remove('bounceInRight');
			_Elements.Elem.computerChoiceEl.classList.remove(_this2.btnColor[move]);
			_Elements.Elem.computerChoiceEl.firstChild.classList.remove('icon-' + move);
		}, 1500);
	},
	gameoverAnimation: function gameoverAnimation(msg) {
		_Elements.Elem.gameoverMsg.innerHTML = msg;
		_Elements.Elem.gameoverOverlay.classList.add('fadeIn');
		_Elements.Elem.gameoverOverlay.style.display = 'table-cell';
		_Elements.Elem.gameoverDialog.classList.add('zoomIn');
		_Elements.Elem.gameoverDialog.style.display = 'block';
	},

	playAgainAnimation: function playAgainAnimation() {
		_Elements.Elem.gameoverMsg.innerHTML = "";
		_Elements.Elem.gameoverDialog.classList.add('zoomOut');
		_Elements.Elem.gameoverOverlay.classList.add('fadeOut');
		setTimeout(function () {
			_Elements.Elem.gameoverDialog.classList.remove('zoomOut');
			_Elements.Elem.gameoverOverlay.classList.remove('fadeOut');
			_Elements.Elem.gameoverDialog.style.display = 'none';
			_Elements.Elem.gameoverOverlay.style.display = 'none';
		}, 500);
	}
};

},{"./Elements":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var Elem = exports.Elem = {
	playerScoreEl: document.getElementsByClassName('player-score')[0],
	computerScoreEl: document.getElementsByClassName('computer-score')[0],
	msgEl: document.getElementsByClassName('win-msg')[0],
	playerChoiceEl: document.getElementsByClassName('player-choice')[0],
	computerChoiceEl: document.getElementsByClassName('computer-choice')[0],
	gameoverOverlay: document.getElementsByClassName('gameover-overlay')[0],
	gameoverDialog: document.getElementsByClassName('gameover-dialog')[0],
	gameoverMsg: document.getElementsByClassName('gameover-msg')[0],
	hiddenOverlay: document.getElementsByClassName('hidden-overlay')[0]
};

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.GameLogic = undefined;

var _Elements = require('./Elements');

var GameLogic = exports.GameLogic = {
	playerScore: 0,
	computerScore: 0,
	gameOverAt: 10,
	getComputerChoice: function getComputerChoice() {
		var computerChoice = Math.random();

		return computerChoice < 0.34 ? 'rock' : computerChoice < 0.65 ? 'paper' : 'scissors';
	},

	isTie: function isTie(player, computer) {
		return player === computer ? 1 : 0;
	},

	playerWon: function playerWon(player, computer) {
		if (player === 'rock') {
			return computer === 'scissors' ? 1 : 0;
		} else if (player === 'scissors') {
			return computer === 'paper' ? 1 : 0;
		} else if (player === 'paper') {
			return computer === 'rock' ? 1 : 0;
		}
	},

	isGameOver: function isGameOver() {
		return this.playerScore === this.gameOverAt || this.computerScore === this.gameOverAt;
	},

	playerWonGame: function playerWonGame() {
		return this.playerScore === this.gameOverAt;
	},

	resetGame: function resetGame() {
		this.playerScore = 0;
		this.computerScore = 0;
		_Elements.Elem.playerScoreEl.innerHTML = 0;
		_Elements.Elem.computerScoreEl.innerHTML = 0;
	}

};

},{"./Elements":3}],5:[function(require,module,exports){
'use strict';

var _GameLogic = require('./Services/GameLogic');

var _Animation = require('./Services/Animation');

var _Routes = require('./Routes');

var actionButtons = document.querySelectorAll('.player .gamebuttons li');

[].forEach.call(actionButtons, function (actionButton) {
	actionButton.addEventListener('click', function (e) {
		var player = e.target.dataset.player;
		var computer = _GameLogic.GameLogic.getComputerChoice();

		_Animation.Animation.playerMoveAnimation(player);
		_Animation.Animation.computerMoveAnimation(computer);

		setTimeout(function () {
			if (_GameLogic.GameLogic.isTie(player, computer)) {
				_Animation.Animation.tieAnimation();
			} else if (_GameLogic.GameLogic.playerWon(player, computer)) {
				_GameLogic.GameLogic.playerScore++;
				_Animation.Animation.winAnimation();
			} else {
				_GameLogic.GameLogic.computerScore++;
				_Animation.Animation.loseAnimation();
			}
			if (_GameLogic.GameLogic.isGameOver()) {
				if (_GameLogic.GameLogic.playerWonGame()) {
					_Animation.Animation.gameoverAnimation("Yeee! You have beaten the evil computer! :D");
				} else {
					_Animation.Animation.gameoverAnimation("Nooo! You have been beaten by the evil computer! :(");
				}
			}
		}, 500);
	});
});

var playAgainButton = document.getElementsByClassName('play-again')[0];
playAgainButton.addEventListener('click', function (e) {
	_GameLogic.GameLogic.resetGame();
	_Animation.Animation.playAgainAnimation();
});

},{"./Routes":1,"./Services/Animation":2,"./Services/GameLogic":4}],6:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],7:[function(require,module,exports){
(function (process){
  /* globals require, module */

  'use strict';

  /**
   * Module dependencies.
   */

  var pathtoRegexp = require('path-to-regexp');

  /**
   * Module exports.
   */

  module.exports = page;

  /**
   * Detect click event
   */
  var clickEvent = ('undefined' !== typeof document) && document.ontouchstart ? 'touchstart' : 'click';

  /**
   * To work properly with the URL
   * history.location generated polyfill in https://github.com/devote/HTML5-History-API
   */

  var location = ('undefined' !== typeof window) && (window.history.location || window.location);

  /**
   * Perform initial dispatch.
   */

  var dispatch = true;


  /**
   * Decode URL components (query string, pathname, hash).
   * Accommodates both regular percent encoding and x-www-form-urlencoded format.
   */
  var decodeURLComponents = true;

  /**
   * Base path.
   */

  var base = '';

  /**
   * Running flag.
   */

  var running;

  /**
   * HashBang option
   */

  var hashbang = false;

  /**
   * Previous context, for capturing
   * page exit events.
   */

  var prevContext;

  /**
   * Register `path` with callback `fn()`,
   * or route `path`, or redirection,
   * or `page.start()`.
   *
   *   page(fn);
   *   page('*', fn);
   *   page('/user/:id', load, user);
   *   page('/user/' + user.id, { some: 'thing' });
   *   page('/user/' + user.id);
   *   page('/from', '/to')
   *   page();
   *
   * @param {String|Function} path
   * @param {Function} fn...
   * @api public
   */

  function page(path, fn) {
    // <callback>
    if ('function' === typeof path) {
      return page('*', path);
    }

    // route <path> to <callback ...>
    if ('function' === typeof fn) {
      var route = new Route(path);
      for (var i = 1; i < arguments.length; ++i) {
        page.callbacks.push(route.middleware(arguments[i]));
      }
      // show <path> with [state]
    } else if ('string' === typeof path) {
      page['string' === typeof fn ? 'redirect' : 'show'](path, fn);
      // start [options]
    } else {
      page.start(path);
    }
  }

  /**
   * Callback functions.
   */

  page.callbacks = [];
  page.exits = [];

  /**
   * Current path being processed
   * @type {String}
   */
  page.current = '';

  /**
   * Number of pages navigated to.
   * @type {number}
   *
   *     page.len == 0;
   *     page('/login');
   *     page.len == 1;
   */

  page.len = 0;

  /**
   * Get or set basepath to `path`.
   *
   * @param {String} path
   * @api public
   */

  page.base = function(path) {
    if (0 === arguments.length) return base;
    base = path;
  };

  /**
   * Bind with the given `options`.
   *
   * Options:
   *
   *    - `click` bind to click events [true]
   *    - `popstate` bind to popstate [true]
   *    - `dispatch` perform initial dispatch [true]
   *
   * @param {Object} options
   * @api public
   */

  page.start = function(options) {
    options = options || {};
    if (running) return;
    running = true;
    if (false === options.dispatch) dispatch = false;
    if (false === options.decodeURLComponents) decodeURLComponents = false;
    if (false !== options.popstate) window.addEventListener('popstate', onpopstate, false);
    if (false !== options.click) {
      document.addEventListener(clickEvent, onclick, false);
    }
    if (true === options.hashbang) hashbang = true;
    if (!dispatch) return;
    var url = (hashbang && ~location.hash.indexOf('#!')) ? location.hash.substr(2) + location.search : location.pathname + location.search + location.hash;
    page.replace(url, null, true, dispatch);
  };

  /**
   * Unbind click and popstate event handlers.
   *
   * @api public
   */

  page.stop = function() {
    if (!running) return;
    page.current = '';
    page.len = 0;
    running = false;
    document.removeEventListener(clickEvent, onclick, false);
    window.removeEventListener('popstate', onpopstate, false);
  };

  /**
   * Show `path` with optional `state` object.
   *
   * @param {String} path
   * @param {Object} state
   * @param {Boolean} dispatch
   * @return {Context}
   * @api public
   */

  page.show = function(path, state, dispatch, push) {
    var ctx = new Context(path, state);
    page.current = ctx.path;
    if (false !== dispatch) page.dispatch(ctx);
    if (false !== ctx.handled && false !== push) ctx.pushState();
    return ctx;
  };

  /**
   * Goes back in the history
   * Back should always let the current route push state and then go back.
   *
   * @param {String} path - fallback path to go back if no more history exists, if undefined defaults to page.base
   * @param {Object} [state]
   * @api public
   */

  page.back = function(path, state) {
    if (page.len > 0) {
      // this may need more testing to see if all browsers
      // wait for the next tick to go back in history
      history.back();
      page.len--;
    } else if (path) {
      setTimeout(function() {
        page.show(path, state);
      });
    }else{
      setTimeout(function() {
        page.show(base, state);
      });
    }
  };


  /**
   * Register route to redirect from one path to other
   * or just redirect to another route
   *
   * @param {String} from - if param 'to' is undefined redirects to 'from'
   * @param {String} [to]
   * @api public
   */
  page.redirect = function(from, to) {
    // Define route from a path to another
    if ('string' === typeof from && 'string' === typeof to) {
      page(from, function(e) {
        setTimeout(function() {
          page.replace(to);
        }, 0);
      });
    }

    // Wait for the push state and replace it with another
    if ('string' === typeof from && 'undefined' === typeof to) {
      setTimeout(function() {
        page.replace(from);
      }, 0);
    }
  };

  /**
   * Replace `path` with optional `state` object.
   *
   * @param {String} path
   * @param {Object} state
   * @return {Context}
   * @api public
   */


  page.replace = function(path, state, init, dispatch) {
    var ctx = new Context(path, state);
    page.current = ctx.path;
    ctx.init = init;
    ctx.save(); // save before dispatching, which may redirect
    if (false !== dispatch) page.dispatch(ctx);
    return ctx;
  };

  /**
   * Dispatch the given `ctx`.
   *
   * @param {Object} ctx
   * @api private
   */

  page.dispatch = function(ctx) {
    var prev = prevContext,
      i = 0,
      j = 0;

    prevContext = ctx;

    function nextExit() {
      var fn = page.exits[j++];
      if (!fn) return nextEnter();
      fn(prev, nextExit);
    }

    function nextEnter() {
      var fn = page.callbacks[i++];

      if (ctx.path !== page.current) {
        ctx.handled = false;
        return;
      }
      if (!fn) return unhandled(ctx);
      fn(ctx, nextEnter);
    }

    if (prev) {
      nextExit();
    } else {
      nextEnter();
    }
  };

  /**
   * Unhandled `ctx`. When it's not the initial
   * popstate then redirect. If you wish to handle
   * 404s on your own use `page('*', callback)`.
   *
   * @param {Context} ctx
   * @api private
   */

  function unhandled(ctx) {
    if (ctx.handled) return;
    var current;

    if (hashbang) {
      current = base + location.hash.replace('#!', '');
    } else {
      current = location.pathname + location.search;
    }

    if (current === ctx.canonicalPath) return;
    page.stop();
    ctx.handled = false;
    location.href = ctx.canonicalPath;
  }

  /**
   * Register an exit route on `path` with
   * callback `fn()`, which will be called
   * on the previous context when a new
   * page is visited.
   */
  page.exit = function(path, fn) {
    if (typeof path === 'function') {
      return page.exit('*', path);
    }

    var route = new Route(path);
    for (var i = 1; i < arguments.length; ++i) {
      page.exits.push(route.middleware(arguments[i]));
    }
  };

  /**
   * Remove URL encoding from the given `str`.
   * Accommodates whitespace in both x-www-form-urlencoded
   * and regular percent-encoded form.
   *
   * @param {str} URL component to decode
   */
  function decodeURLEncodedURIComponent(val) {
    if (typeof val !== 'string') { return val; }
    return decodeURLComponents ? decodeURIComponent(val.replace(/\+/g, ' ')) : val;
  }

  /**
   * Initialize a new "request" `Context`
   * with the given `path` and optional initial `state`.
   *
   * @param {String} path
   * @param {Object} state
   * @api public
   */

  function Context(path, state) {
    if ('/' === path[0] && 0 !== path.indexOf(base)) path = base + (hashbang ? '#!' : '') + path;
    var i = path.indexOf('?');

    this.canonicalPath = path;
    this.path = path.replace(base, '') || '/';
    if (hashbang) this.path = this.path.replace('#!', '') || '/';

    this.title = document.title;
    this.state = state || {};
    this.state.path = path;
    this.querystring = ~i ? decodeURLEncodedURIComponent(path.slice(i + 1)) : '';
    this.pathname = decodeURLEncodedURIComponent(~i ? path.slice(0, i) : path);
    this.params = {};

    // fragment
    this.hash = '';
    if (!hashbang) {
      if (!~this.path.indexOf('#')) return;
      var parts = this.path.split('#');
      this.path = parts[0];
      this.hash = decodeURLEncodedURIComponent(parts[1]) || '';
      this.querystring = this.querystring.split('#')[0];
    }
  }

  /**
   * Expose `Context`.
   */

  page.Context = Context;

  /**
   * Push state.
   *
   * @api private
   */

  Context.prototype.pushState = function() {
    page.len++;
    history.pushState(this.state, this.title, hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
  };

  /**
   * Save the context state.
   *
   * @api public
   */

  Context.prototype.save = function() {
    history.replaceState(this.state, this.title, hashbang && this.path !== '/' ? '#!' + this.path : this.canonicalPath);
  };

  /**
   * Initialize `Route` with the given HTTP `path`,
   * and an array of `callbacks` and `options`.
   *
   * Options:
   *
   *   - `sensitive`    enable case-sensitive routes
   *   - `strict`       enable strict matching for trailing slashes
   *
   * @param {String} path
   * @param {Object} options.
   * @api private
   */

  function Route(path, options) {
    options = options || {};
    this.path = path;
    this.method = 'GET';
    this.regexp = pathtoRegexp(this.path,
      this.keys = [],
      options.sensitive,
      options.strict);
  }

  /**
   * Expose `Route`.
   */

  page.Route = Route;

  /**
   * Return route middleware with
   * the given callback `fn()`.
   *
   * @param {Function} fn
   * @return {Function}
   * @api public
   */

  Route.prototype.middleware = function(fn) {
    var self = this;
    return function(ctx, next) {
      if (self.match(ctx.path, ctx.params)) return fn(ctx, next);
      next();
    };
  };

  /**
   * Check if this route matches `path`, if so
   * populate `params`.
   *
   * @param {String} path
   * @param {Object} params
   * @return {Boolean}
   * @api private
   */

  Route.prototype.match = function(path, params) {
    var keys = this.keys,
      qsIndex = path.indexOf('?'),
      pathname = ~qsIndex ? path.slice(0, qsIndex) : path,
      m = this.regexp.exec(decodeURIComponent(pathname));

    if (!m) return false;

    for (var i = 1, len = m.length; i < len; ++i) {
      var key = keys[i - 1];
      if (key) {
        var val = decodeURLEncodedURIComponent(m[i]);
        if (val !== undefined || !(hasOwnProperty.call(params, key.name))) {
          params[key.name] = val;
        }        
      }

    }

    return true;
  };


  /**
   * Handle "populate" events.
   */

  var onpopstate = (function () {
    var loaded = false;
    if ('undefined' === typeof window) {
      return;
    }
    if (document.readyState === 'complete') {
      loaded = true;
    } else {
      window.addEventListener('load', function() {
        setTimeout(function() {
          loaded = true;
        }, 0);
      });
    }
    return function onpopstate(e) {
      if (!loaded) return;
      if (e.state) {
        var path = e.state.path;
        page.replace(path, e.state);
      } else {
        page.show(location.pathname + location.hash, undefined, undefined, false);
      }
    };
  })();
  /**
   * Handle "click" events.
   */

  function onclick(e) {

    if (1 !== which(e)) return;

    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    if (e.defaultPrevented) return;



    // ensure link
    var el = e.target;
    while (el && 'A' !== el.nodeName) el = el.parentNode;
    if (!el || 'A' !== el.nodeName) return;



    // Ignore if tag has
    // 1. "download" attribute
    // 2. rel="external" attribute
    if (el.hasAttribute('download') || el.getAttribute('rel') === 'external') return;

    // ensure non-hash for the same path
    var link = el.getAttribute('href');
    if (!hashbang && el.pathname === location.pathname && (el.hash || '#' === link)) return;



    // Check for mailto: in the href
    if (link && link.indexOf('mailto:') > -1) return;

    // check target
    if (el.target) return;

    // x-origin
    if (!sameOrigin(el.href)) return;



    // rebuild path
    var path = el.pathname + el.search + (el.hash || '');

    // strip leading "/[drive letter]:" on NW.js on Windows
    if (typeof process !== 'undefined' && path.match(/^\/[a-zA-Z]:\//)) {
      path = path.replace(/^\/[a-zA-Z]:\//, '/');
    }

    // same page
    var orig = path;

    if (path.indexOf(base) === 0) {
      path = path.substr(base.length);
    }

    if (hashbang) path = path.replace('#!', '');

    if (base && orig === path) return;

    e.preventDefault();
    page.show(orig);
  }

  /**
   * Event button.
   */

  function which(e) {
    e = e || window.event;
    return null === e.which ? e.button : e.which;
  }

  /**
   * Check if `href` is the same origin.
   */

  function sameOrigin(href) {
    var origin = location.protocol + '//' + location.hostname;
    if (location.port) origin += ':' + location.port;
    return (href && (0 === href.indexOf(origin)));
  }

  page.sameOrigin = sameOrigin;

}).call(this,require('_process'))
},{"_process":6,"path-to-regexp":8}],8:[function(require,module,exports){
/**
 * Expose `pathtoRegexp`.
 */

module.exports = pathtoRegexp;

/**
 * Match matching groups in a regular expression.
 */
var MATCHING_GROUP_REGEXP = /\((?!\?)/g;

/**
 * Normalize the given path string,
 * returning a regular expression.
 *
 * An empty array should be passed,
 * which will contain the placeholder
 * key names. For example "/user/:id" will
 * then contain ["id"].
 *
 * @param  {String|RegExp|Array} path
 * @param  {Array} keys
 * @param  {Object} options
 * @return {RegExp}
 * @api private
 */

function pathtoRegexp(path, keys, options) {
  options = options || {};
  keys = keys || [];
  var strict = options.strict;
  var end = options.end !== false;
  var flags = options.sensitive ? '' : 'i';
  var extraOffset = 0;
  var keysOffset = keys.length;
  var i = 0;
  var name = 0;
  var m;

  if (path instanceof RegExp) {
    while (m = MATCHING_GROUP_REGEXP.exec(path.source)) {
      keys.push({
        name: name++,
        optional: false,
        offset: m.index
      });
    }

    return path;
  }

  if (Array.isArray(path)) {
    // Map array parts into regexps and return their source. We also pass
    // the same keys and options instance into every generation to get
    // consistent matching groups before we join the sources together.
    path = path.map(function (value) {
      return pathtoRegexp(value, keys, options).source;
    });

    return new RegExp('(?:' + path.join('|') + ')', flags);
  }

  path = ('^' + path + (strict ? '' : path[path.length - 1] === '/' ? '?' : '/?'))
    .replace(/\/\(/g, '/(?:')
    .replace(/([\/\.])/g, '\\$1')
    .replace(/(\\\/)?(\\\.)?:(\w+)(\(.*?\))?(\*)?(\?)?/g, function (match, slash, format, key, capture, star, optional, offset) {
      slash = slash || '';
      format = format || '';
      capture = capture || '([^\\/' + format + ']+?)';
      optional = optional || '';

      keys.push({
        name: key,
        optional: !!optional,
        offset: offset + extraOffset
      });

      var result = ''
        + (optional ? '' : slash)
        + '(?:'
        + format + (optional ? slash : '') + capture
        + (star ? '((?:[\\/' + format + '].+?)?)' : '')
        + ')'
        + optional;

      extraOffset += result.length - match.length;

      return result;
    })
    .replace(/\*/g, function (star, index) {
      var len = keys.length

      while (len-- > keysOffset && keys[len].offset > index) {
        keys[len].offset += 3; // Replacement length minus asterisk length.
      }

      return '(.*)';
    });

  // This is a workaround for handling unnamed matching groups.
  while (m = MATCHING_GROUP_REGEXP.exec(path)) {
    var escapeCount = 0;
    var index = m.index;

    while (path.charAt(--index) === '\\') {
      escapeCount++;
    }

    // It's possible to escape the bracket.
    if (escapeCount % 2 === 1) {
      continue;
    }

    if (keysOffset + i === keys.length || keys[keysOffset + i].offset > m.index) {
      keys.splice(keysOffset + i, 0, {
        name: name++, // Unnamed matching groups must be consistently linear.
        optional: false,
        offset: m.index
      });
    }

    i++;
  }

  // If the path is non-ending, match until the end or a slash.
  path += (end ? '$' : (path[path.length - 1] === '/' ? '' : '(?=\\/|$)'));

  return new RegExp(path, flags);
};

},{}]},{},[5]);
