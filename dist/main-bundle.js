/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "react-redux/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 62);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
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
    var timeout = runTimeout(cleanUpNextTick);
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
    runClearTimeout(timeout);
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
        runTimeout(drainQueue);
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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyFunction = __webpack_require__(4);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  (function () {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  })();
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactElement
 */



var _assign = __webpack_require__(5);

var ReactCurrentOwner = __webpack_require__(6);

var warning = __webpack_require__(1);
var canDefineProperty = __webpack_require__(8);

// The Symbol used to tag the ReactElement type. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown, specialPropRefWarningShown;

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allow us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  if (process.env.NODE_ENV !== 'production') {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    if (canDefineProperty) {
      Object.defineProperty(element._store, 'validated', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: false
      });
      // self and source are DEV only properties.
      Object.defineProperty(element, '_self', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: self
      });
      // Two elements created in two different places should be considered
      // equal for testing purposes and therefore we hide it from enumeration.
      Object.defineProperty(element, '_source', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: source
      });
    } else {
      element._store.validated = false;
      element._self = self;
      element._source = source;
    }
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createelement
 */
ReactElement.createElement = function (type, config, children) {
  var propName;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(
      /* eslint-disable no-proto */
      config.__proto__ == null || config.__proto__ === Object.prototype,
      /* eslint-enable no-proto */
      'React.createElement(...): Expected props argument to be a plain object. ' + 'Properties defined in its prototype chain will be ignored.') : void 0;
      ref = !config.hasOwnProperty('ref') || Object.getOwnPropertyDescriptor(config, 'ref').get ? null : config.ref;
      key = !config.hasOwnProperty('key') || Object.getOwnPropertyDescriptor(config, 'key').get ? null : '' + config.key;
    } else {
      ref = config.ref === undefined ? null : config.ref;
      key = config.key === undefined ? null : '' + config.key;
    }
    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  if (process.env.NODE_ENV !== 'production') {
    // Create dummy `key` and `ref` property to `props` to warn users
    // against its use
    if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
      if (!props.hasOwnProperty('key')) {
        Object.defineProperty(props, 'key', {
          get: function () {
            if (!specialPropKeyWarningShown) {
              specialPropKeyWarningShown = true;
              process.env.NODE_ENV !== 'production' ? warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', typeof type === 'function' && 'displayName' in type ? type.displayName : 'Element') : void 0;
            }
            return undefined;
          },
          configurable: true
        });
      }
      if (!props.hasOwnProperty('ref')) {
        Object.defineProperty(props, 'ref', {
          get: function () {
            if (!specialPropRefWarningShown) {
              specialPropRefWarningShown = true;
              process.env.NODE_ENV !== 'production' ? warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', typeof type === 'function' && 'displayName' in type ? type.displayName : 'Element') : void 0;
            }
            return undefined;
          },
          configurable: true
        });
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
};

/**
 * Return a function that produces ReactElements of a given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createfactory
 */
ReactElement.createFactory = function (type) {
  var factory = ReactElement.createElement.bind(null, type);
  // Expose the type on the factory and the prototype so that it can be
  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
  // This should not be named `constructor` since this may not be the function
  // that created the element, and it may not even be a constructor.
  // Legacy hook TODO: Warn if this is accessed
  factory.type = type;
  return factory;
};

ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
};

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.cloneelement
 */
ReactElement.cloneElement = function (element, config, children) {
  var propName;

  // Original props are copied
  var props = _assign({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(
      /* eslint-disable no-proto */
      config.__proto__ == null || config.__proto__ === Object.prototype,
      /* eslint-enable no-proto */
      'React.cloneElement(...): Expected props argument to be a plain object. ' + 'Properties defined in its prototype chain will be ignored.') : void 0;
    }
    if (config.ref !== undefined) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (config.key !== undefined) {
      key = '' + config.key;
    }
    // Remaining properties override existing props
    var defaultProps;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (config.hasOwnProperty(propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
};

/**
 * Verifies the object is a ReactElement.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
ReactElement.isValidElement = function (object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
};

module.exports = ReactElement;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactCurrentOwner
 */



/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */

var ReactCurrentOwner = {

  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null

};

module.exports = ReactCurrentOwner;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactPropTypeLocationNames
 */



var ReactPropTypeLocationNames = {};

if (process.env.NODE_ENV !== 'production') {
  ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context'
  };
}

module.exports = ReactPropTypeLocationNames;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule canDefineProperty
 */



var canDefineProperty = false;
if (process.env.NODE_ENV !== 'production') {
  try {
    Object.defineProperty({}, 'x', { get: function () {} });
    canDefineProperty = true;
  } catch (x) {
    // IE will fail on defineProperty
  }
}

module.exports = canDefineProperty;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule getIteratorFn
 */



/* global Symbol */

var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

/**
 * Returns the iterator method function contained on the iterable object.
 *
 * Be sure to invoke the function with the iterable as context:
 *
 *     var iteratorFn = getIteratorFn(myIterable);
 *     if (iteratorFn) {
 *       var iterator = iteratorFn.call(myIterable);
 *       ...
 *     }
 *
 * @param {?object} maybeIterable
 * @return {?function}
 */
function getIteratorFn(maybeIterable) {
  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
  if (typeof iteratorFn === 'function') {
    return iteratorFn;
  }
}

module.exports = getIteratorFn;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */
var ExecutionEnvironment = {

  canUseDOM: canUseDOM,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

  canUseViewport: canUseDOM && !!window.screen,

  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

module.exports = ExecutionEnvironment;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks static-only
 */



var invariant = __webpack_require__(2);

/**
 * Constructs an enumeration with keys equal to their value.
 *
 * For example:
 *
 *   var COLORS = keyMirror({blue: null, red: null});
 *   var myColor = COLORS.blue;
 *   var isColorValid = !!COLORS[myColor];
 *
 * The last line could not be performed if the values of the generated enum were
 * not equal to their keys.
 *
 *   Input:  {key1: val1, key2: val2}
 *   Output: {key1: key1, key2: key2}
 *
 * @param {object} obj
 * @return {object}
 */
var keyMirror = function keyMirror(obj) {
  var ret = {};
  var key;
  !(obj instanceof Object && !Array.isArray(obj)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'keyMirror(...): Argument must be an object.') : invariant(false) : void 0;
  for (key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    ret[key] = key;
  }
  return ret;
};

module.exports = keyMirror;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactComponent
 */



var ReactNoopUpdateQueue = __webpack_require__(15);
var ReactInstrumentation = __webpack_require__(33);

var canDefineProperty = __webpack_require__(8);
var emptyObject = __webpack_require__(11);
var invariant = __webpack_require__(2);
var warning = __webpack_require__(1);

/**
 * Base class helpers for the updating state of a component.
 */
function ReactComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

ReactComponent.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
ReactComponent.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'setState(...): takes an object of state variables to update or a ' + 'function which returns an object of state variables.') : invariant(false) : void 0;
  if (process.env.NODE_ENV !== 'production') {
    ReactInstrumentation.debugTool.onSetState();
    process.env.NODE_ENV !== 'production' ? warning(partialState != null, 'setState(...): You passed an undefined or null state object; ' + 'instead, use forceUpdate().') : void 0;
  }
  this.updater.enqueueSetState(this, partialState);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'setState');
  }
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
ReactComponent.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'forceUpdate');
  }
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
if (process.env.NODE_ENV !== 'production') {
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };
  var defineDeprecationWarning = function (methodName, info) {
    if (canDefineProperty) {
      Object.defineProperty(ReactComponent.prototype, methodName, {
        get: function () {
          process.env.NODE_ENV !== 'production' ? warning(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]) : void 0;
          return undefined;
        }
      });
    }
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

module.exports = ReactComponent;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactElementValidator
 */

/**
 * ReactElementValidator provides a wrapper around a element factory
 * which validates the props passed to the element. This is intended to be
 * used only in DEV and could be replaced by a static type checker for languages
 * that support it.
 */



var ReactElement = __webpack_require__(3);
var ReactPropTypeLocations = __webpack_require__(16);
var ReactPropTypeLocationNames = __webpack_require__(7);
var ReactCurrentOwner = __webpack_require__(6);

var canDefineProperty = __webpack_require__(8);
var getIteratorFn = __webpack_require__(9);
var invariant = __webpack_require__(2);
var warning = __webpack_require__(1);

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = ReactCurrentOwner.current.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
var ownerHasKeyUseWarning = {};

var loggedTypeFailures = {};

/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;

  var addenda = getAddendaForKeyUse('uniqueKey', element, parentType);
  if (addenda === null) {
    // we already showed the warning
    return;
  }
  process.env.NODE_ENV !== 'production' ? warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s%s', addenda.parentOrOwner || '', addenda.childOwner || '', addenda.url || '') : void 0;
}

/**
 * Shared warning and monitoring code for the key warnings.
 *
 * @internal
 * @param {string} messageType A key used for de-duping warnings.
 * @param {ReactElement} element Component that requires a key.
 * @param {*} parentType element's parent's type.
 * @returns {?object} A set of addenda to use in the warning message, or null
 * if the warning has already been shown before (and shouldn't be shown again).
 */
function getAddendaForKeyUse(messageType, element, parentType) {
  var addendum = getDeclarationErrorAddendum();
  if (!addendum) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
    if (parentName) {
      addendum = ' Check the top-level render call using <' + parentName + '>.';
    }
  }

  var memoizer = ownerHasKeyUseWarning[messageType] || (ownerHasKeyUseWarning[messageType] = {});
  if (memoizer[addendum]) {
    return null;
  }
  memoizer[addendum] = true;

  var addenda = {
    parentOrOwner: addendum,
    url: ' See https://fb.me/react-warning-keys for more information.',
    childOwner: null
  };

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    addenda.childOwner = ' It was passed a child from ' + element._owner.getName() + '.';
  }

  return addenda;
}

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (ReactElement.isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (ReactElement.isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);
    // Entry iterators provide implicit keys.
    if (iteratorFn) {
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;
        while (!(step = iterator.next()).done) {
          if (ReactElement.isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}

/**
 * Assert that the props are valid
 *
 * @param {string} componentName Name of the component for error messages.
 * @param {object} propTypes Map of prop name to a ReactPropType
 * @param {object} props
 * @param {string} location e.g. "prop", "context", "child context"
 * @private
 */
function checkPropTypes(componentName, propTypes, props, location) {
  for (var propName in propTypes) {
    if (propTypes.hasOwnProperty(propName)) {
      var error;
      // Prop type validation may throw. In case they do, we don't want to
      // fail the render phase where it didn't fail before. So we log it.
      // After these have been cleaned up, we'll let them throw.
      try {
        // This is intentionally an invariant that gets caught. It's the same
        // behavior as without this statement except with a better message.
        !(typeof propTypes[propName] === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], propName) : invariant(false) : void 0;
        error = propTypes[propName](props, propName, componentName, location);
      } catch (ex) {
        error = ex;
      }
      process.env.NODE_ENV !== 'production' ? warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', ReactPropTypeLocationNames[location], propName, typeof error) : void 0;
      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
        // Only monitor this failure once because there tends to be a lot of the
        // same error.
        loggedTypeFailures[error.message] = true;

        var addendum = getDeclarationErrorAddendum();
        process.env.NODE_ENV !== 'production' ? warning(false, 'Failed propType: %s%s', error.message, addendum) : void 0;
      }
    }
  }
}

/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
function validatePropTypes(element) {
  var componentClass = element.type;
  if (typeof componentClass !== 'function') {
    return;
  }
  var name = componentClass.displayName || componentClass.name;
  if (componentClass.propTypes) {
    checkPropTypes(name, componentClass.propTypes, element.props, ReactPropTypeLocations.prop);
  }
  if (typeof componentClass.getDefaultProps === 'function') {
    process.env.NODE_ENV !== 'production' ? warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
  }
}

var ReactElementValidator = {

  createElement: function (type, props, children) {
    var validType = typeof type === 'string' || typeof type === 'function';
    // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.
    process.env.NODE_ENV !== 'production' ? warning(validType, 'React.createElement: type should not be null, undefined, boolean, or ' + 'number. It should be a string (for DOM elements) or a ReactClass ' + '(for composite components).%s', getDeclarationErrorAddendum()) : void 0;

    var element = ReactElement.createElement.apply(this, arguments);

    // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.
    if (element == null) {
      return element;
    }

    // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)
    if (validType) {
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], type);
      }
    }

    validatePropTypes(element);

    return element;
  },

  createFactory: function (type) {
    var validatedFactory = ReactElementValidator.createElement.bind(null, type);
    // Legacy hook TODO: Warn if this is accessed
    validatedFactory.type = type;

    if (process.env.NODE_ENV !== 'production') {
      if (canDefineProperty) {
        Object.defineProperty(validatedFactory, 'type', {
          enumerable: false,
          get: function () {
            process.env.NODE_ENV !== 'production' ? warning(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.') : void 0;
            Object.defineProperty(this, 'type', {
              value: type
            });
            return type;
          }
        });
      }
    }

    return validatedFactory;
  },

  cloneElement: function (element, props, children) {
    var newElement = ReactElement.cloneElement.apply(this, arguments);
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], newElement.type);
    }
    validatePropTypes(newElement);
    return newElement;
  }

};

module.exports = ReactElementValidator;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactNoopUpdateQueue
 */



var warning = __webpack_require__(1);

function warnTDZ(publicInstance, callerName) {
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== 'production' ? warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, publicInstance.constructor && publicInstance.constructor.displayName || '') : void 0;
  }
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {

  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Enqueue a callback that will be executed after all the pending updates
   * have processed.
   *
   * @param {ReactClass} publicInstance The instance to use as `this` context.
   * @param {?function} callback Called after state is updated.
   * @internal
   */
  enqueueCallback: function (publicInstance, callback) {},

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance) {
    warnTDZ(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState) {
    warnTDZ(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState) {
    warnTDZ(publicInstance, 'setState');
  }
};

module.exports = ReactNoopUpdateQueue;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactPropTypeLocations
 */



var keyMirror = __webpack_require__(12);

var ReactPropTypeLocations = keyMirror({
  prop: null,
  context: null,
  childContext: null
});

module.exports = ReactPropTypeLocations;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.defaultMemoize = defaultMemoize;
exports.createSelectorCreator = createSelectorCreator;
exports.createSelector = createSelector;
exports.createStructuredSelector = createStructuredSelector;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function defaultEqualityCheck(a, b) {
  return a === b;
}

function defaultMemoize(func) {
  var equalityCheck = arguments.length <= 1 || arguments[1] === undefined ? defaultEqualityCheck : arguments[1];

  var lastArgs = null;
  var lastResult = null;
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (lastArgs !== null && args.every(function (value, index) {
      return equalityCheck(value, lastArgs[index]);
    })) {
      return lastResult;
    }
    lastArgs = args;
    lastResult = func.apply(undefined, args);
    return lastResult;
  };
}

function getDependencies(funcs) {
  var dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;

  if (!dependencies.every(function (dep) {
    return typeof dep === 'function';
  })) {
    var dependencyTypes = dependencies.map(function (dep) {
      return typeof dep;
    }).join(', ');
    throw new Error('Selector creators expect all input-selectors to be functions, ' + ('instead received the following types: [' + dependencyTypes + ']'));
  }

  return dependencies;
}

function createSelectorCreator(memoize) {
  for (var _len2 = arguments.length, memoizeOptions = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    memoizeOptions[_key2 - 1] = arguments[_key2];
  }

  return function () {
    for (var _len3 = arguments.length, funcs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      funcs[_key3] = arguments[_key3];
    }

    var recomputations = 0;
    var resultFunc = funcs.pop();
    var dependencies = getDependencies(funcs);

    var memoizedResultFunc = memoize.apply(undefined, [function () {
      recomputations++;
      return resultFunc.apply(undefined, arguments);
    }].concat(memoizeOptions));

    var selector = function selector(state, props) {
      for (var _len4 = arguments.length, args = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
        args[_key4 - 2] = arguments[_key4];
      }

      var params = dependencies.map(function (dependency) {
        return dependency.apply(undefined, [state, props].concat(args));
      });
      return memoizedResultFunc.apply(undefined, _toConsumableArray(params));
    };

    selector.recomputations = function () {
      return recomputations;
    };
    return selector;
  };
}

function createSelector() {
  return createSelectorCreator(defaultMemoize).apply(undefined, arguments);
}

function createStructuredSelector(selectors) {
  var selectorCreator = arguments.length <= 1 || arguments[1] === undefined ? createSelector : arguments[1];

  if (typeof selectors !== 'object') {
    throw new Error('createStructuredSelector expects first argument to be an object ' + ('where each property is a selector, instead received a ' + typeof selectors));
  }
  var objectKeys = Object.keys(selectors);
  return selectorCreator(objectKeys.map(function (key) {
    return selectors[key];
  }), function () {
    for (var _len5 = arguments.length, values = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      values[_key5] = arguments[_key5];
    }

    return values.reduce(function (composition, value, index) {
      composition[objectKeys[index]] = value;
      return composition;
    }, {});
  });
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(27);


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_reselect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actionNames__ = __webpack_require__(45);
/* harmony export (immutable) */ __webpack_exports__["a"] = subjectsReducer;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return subjectsSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return filterSubjects; });




var initialSubjectsState = {
    editingSubjectId: null,
    deletingSubjectId: null,
    editingSubject: null,
    editModalOpen: false,
    saving: false,
    deleting: false,
    subjectSearch: '',
    initialQueryFired: false
};

var emptySubject = { _id: '', name: '', path: null, backgroundColor: '', textColor: '' };
var newSubjectEditing = { subjectSearch: '', deletingSubjectId: null };
var doneEditingSubject = { saving: false, editingSubjectId: null, editingSubject: null };

function subjectsReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialSubjectsState;
    var action = arguments[1];

    switch (action.type) {
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["a" /* EDIT_SUBJECTS */]:
            return Object.assign({}, state, { editModalOpen: true });
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["b" /* SET_SUBJECT_SEARCH_VALUE */]:
            return Object.assign({}, state, { subjectSearch: action.value });
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["c" /* NEW_SUBJECT */]:
            return Object.assign({}, state, babelHelpers.extends({}, newSubjectEditing, { editingSubjectId: '', editingSubject: babelHelpers.extends({}, emptySubject) }));
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["d" /* EDIT_SUBJECT */]:
            return Object.assign({}, state, babelHelpers.extends({}, newSubjectEditing, { editingSubjectId: action._id, editingSubject: action.editingSubject }));
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["e" /* SET_NEW_SUBJECT_VALUE */]:
            return Object.assign({}, state, { editingSubject: babelHelpers.extends({}, state.editingSubject, babelHelpers.defineProperty({}, action.field, action.value)) });
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["f" /* UPDATE_SUBJECT */]:
            return Object.assign({}, state, { saving: true });
        case SAVE_SUBJECT_RESULTS:
            return Object.assign({}, state, babelHelpers.extends({}, doneEditingSubject));
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["g" /* BEGIN_SUBJECT_DELETE */]:
            return Object.assign({}, state, { deletingSubjectId: action._id });
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["h" /* CANCEL_SUBJECT_DELETE */]:
            return Object.assign({}, state, { deletingSubjectId: null });
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["i" /* SUBJECT_DELETING */]:
            return Object.assign({}, state, { deleting: true });
        case SUBJECT_DELETED:
            var newState = babelHelpers.extends({}, state, { deleting: false, deletingSubjectId: null });
            if (newState.editingSubjectId && action.subjectsDeleted.find(function (_id) {
                return _id == newState.editingSubjectId;
            })) {
                newState.editingSubjectId = newState.editingSubject = null;
            }
            return newState;
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["j" /* CANCEL_SUBJECT_EDIT */]:
            return Object.assign({}, state, babelHelpers.extends({}, doneEditingSubject));
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["k" /* STOP_EDITING_SUBJECTS */]:
            return Object.assign({}, state, { editModalOpen: false });
    }
    return state;
}

var stackedSubjectsSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])([function (state) {
    return state.app.subjectHash;
}], function (subjectHash) {
    var mainSubjectsCollection = stackAndGetTopLevelSubjects(subjectHash),
        subjectsUnwound = unwindSubjects(mainSubjectsCollection);

    return {
        subjects: mainSubjectsCollection,
        allSubjectsSorted: allSubjectsSorted(subjectHash),
        subjectsUnwound: subjectsUnwound
    };
});

var searchSubjectsSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])([stackedSubjectsSelector, function (state) {
    return state.booksModule.subjects.subjectSearch;
}], function (stackedSubjects, subjectSearch) {
    return babelHelpers.extends({}, stackedSubjects, { subjectsSearched: filterSubjects(stackedSubjects.subjectsUnwound, subjectSearch) });
});

var eligibleSubjectsSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])([function (state) {
    return state.app.subjectHash;
}, function (state) {
    return state.booksModule.subjects.editingSubjectId;
}], function (subjectHash, editSubjectId) {
    return {
        eligibleParents: getEligibleParents(subjectHash, editSubjectId)
    };
});

var deletingSubjectInfoSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])([function (state) {
    return state.app.subjectHash;
}, function (state) {
    return state.booksModule.subjects.deletingSubjectId;
}], function (subjectHash, deletingSubjectId) {
    if (!deletingSubjectId) return null;

    var childSubjectRegex = new RegExp('.*,' + deletingSubjectId + ',.*'),
        affectedChildren = Object.keys(subjectHash).filter(function (k) {
        return childSubjectRegex.test(subjectHash[k].path);
    }).length,
        subjectName = subjectHash[deletingSubjectId].name;

    return { deleteInfo: { affectedChildren: affectedChildren, subjectName: subjectName, _id: deletingSubjectId } };
});

var subjectsSelector = function subjectsSelector(state) {
    return Object.assign({}, state.booksModule.subjects, babelHelpers.extends({
        colors: state.app.colors
    }, searchSubjectsSelector(state), eligibleSubjectsSelector(state), deletingSubjectInfoSelector(state)));
};

function allSubjectsSorted(subjectsHash) {
    var subjects = Object.keys(subjectsHash).map(function (_id) {
        return subjectsHash[_id];
    });
    return subjects.sort(subjectSortCompare);
}

var filterSubjects = function filterSubjects(subjects, search) {
    if (!search) {
        search = function search() {
            return true;
        };
    } else {
        var regex = new RegExp(search, 'i');
        search = function search(txt) {
            return regex.test(txt);
        };
    }
    return subjects.filter(function (s) {
        return search(s.name);
    });
};

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actionNames__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reselect__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_reselect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_reselect__);
/* harmony export (immutable) */ __webpack_exports__["a"] = tagsReducer;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return filterTags; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return tagsSelector; });




var emptyTag = { _id: '', name: '', backgroundColor: '', textColor: '' };
var newTagEditing = { tagSearch: '', deletingTagId: null };
var doneEditingTag = { saving: false, editingTagId: null, editingTag: null };

var initialTagsState = {
    tagHash: {},
    loaded: false,
    tagSearch: '',
    initialQueryFired: false,
    editTagOpen: false,
    editingTag: null,
    editingTagId: null,
    deleting: false,
    deletingTagId: null
};

function tagsReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialTagsState;
    var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    switch (action.type) {
        case __WEBPACK_IMPORTED_MODULE_0__actionNames__["a" /* LOAD_TAGS */]:
            return babelHelpers.extends({}, state, { initialQueryFired: true });
        case __WEBPACK_IMPORTED_MODULE_0__actionNames__["b" /* LOAD_TAGS_RESULTS */]:
            return babelHelpers.extends({}, state, { tagHash: tagsToHash(action.tags), loaded: true });
        case __WEBPACK_IMPORTED_MODULE_0__actionNames__["c" /* SET_TAG_SEARCH_VALUE */]:
            return babelHelpers.extends({}, state, { tagSearch: action.value });
        case __WEBPACK_IMPORTED_MODULE_0__actionNames__["d" /* EDIT_TAGS */]:
            return babelHelpers.extends({}, state, { editTagOpen: true });
        case __WEBPACK_IMPORTED_MODULE_0__actionNames__["e" /* SET_NEW_TAG_VALUE */]:
            return babelHelpers.extends({}, state, { editingTag: babelHelpers.extends({}, state.editingTag, babelHelpers.defineProperty({}, action.field, action.value)) });
        case __WEBPACK_IMPORTED_MODULE_0__actionNames__["f" /* STOP_EDITING_TAGS */]:
            return babelHelpers.extends({}, state, { editTagOpen: false });
        case __WEBPACK_IMPORTED_MODULE_0__actionNames__["g" /* NEW_TAG */]:
            return babelHelpers.extends({}, state, newTagEditing, { editingTag: babelHelpers.extends({}, emptyTag) });
        case __WEBPACK_IMPORTED_MODULE_0__actionNames__["h" /* EDIT_TAG */]:
            return babelHelpers.extends({}, state, newTagEditing, { editingTag: state.tagHash[action._id], editingTagId: action._id });
        case __WEBPACK_IMPORTED_MODULE_0__actionNames__["i" /* CANCEL_TAG_EDIT */]:
            return babelHelpers.extends({}, state, doneEditingTag);
        case __WEBPACK_IMPORTED_MODULE_0__actionNames__["j" /* UPDATE_TAG_RESULTS */]:
            return babelHelpers.extends({}, state, doneEditingTag, { tagHash: babelHelpers.extends({}, state.tagHash, tagsToHash([action.tag])) });
        case __WEBPACK_IMPORTED_MODULE_0__actionNames__["k" /* BEGIN_TAG_DELETE */]:
            return babelHelpers.extends({}, state, { deletingTagId: action._id });
        case __WEBPACK_IMPORTED_MODULE_0__actionNames__["l" /* CANCEL_TAG_DELETE */]:
            return babelHelpers.extends({}, state, { deletingTagId: null });
        case __WEBPACK_IMPORTED_MODULE_0__actionNames__["m" /* TAG_DELETING */]:
            return babelHelpers.extends({}, state, { deleting: true });
        case __WEBPACK_IMPORTED_MODULE_0__actionNames__["n" /* TAG_DELETED */]:
            var tagHash = babelHelpers.extends({}, state.tagHash);
            delete tagHash[action._id];
            var newState = babelHelpers.extends({}, state, { deleting: false, deletingTagId: null, tagHash: tagHash });

            if (newState.editingTagId && !newState.tagHash[newState.editingTagId]) {
                newState.editingTagId = newState.editingTag = null;
            }

            return newState;
    }
    return state;
}

var tagsToHash = function tagsToHash(tags) {
    return tags.reduce(function (hash, tag) {
        return hash[tag._id] = tag, hash;
    }, {});
};

var filterTags = function filterTags(tags, search) {
    if (!search) {
        search = function search() {
            return true;
        };
    } else {
        var regex = new RegExp(search, 'i');
        search = function search(txt) {
            return regex.test(txt);
        };
    }
    return tags.filter(function (s) {
        return search(s.name);
    });
};

var tagsSorted = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_reselect__["createSelector"])([function (state) {
    return state.tagHash;
}], function (tagHash) {
    var allTagsSorted = allTagssSorted(tagHash);
    return { allTagsSorted: allTagsSorted };
});

function allTagssSorted(tagHash) {
    var tags = Object.keys(tagHash).map(function (_id) {
        return tagHash[_id];
    });
    return tags.sort(function (_ref, _ref2) {
        var name1 = _ref.name;
        var name2 = _ref2.name;

        var name1After = name1.toLowerCase() > name2.toLowerCase(),
            bothEqual = name1.toLowerCase() === name2.toLowerCase();
        return bothEqual ? 0 : name1After ? 1 : -1;
    });
}

var tagsSearched = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_reselect__["createSelector"])([tagsSorted, function (state) {
    return state.tagSearch;
}], function (tags, tagSearch) {
    var tagsSearched = filterTags(tags.allTagsSorted, tagSearch);
    return babelHelpers.extends({}, tags, { tagsSearched: tagsSearched });
});

var deletingTagInfoSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_reselect__["createSelector"])([function (state) {
    return state.tagHash;
}, function (state) {
    return state.deletingTagId;
}], function (tagHash, deletingTagId) {
    if (!deletingTagId) return null;

    var tagName = tagHash[deletingTagId].name;

    return { deleteInfo: { tagName: tagName, _id: deletingTagId } };
});

var tagsSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_reselect__["createSelector"])([function (state) {
    return state.booksModule.tags;
}, function (state) {
    return state.app.colors;
}], function (tags, colors) {
    return Object.assign({}, tags, tagsSearched(tags), deletingTagInfoSelector(tags), { colors: colors });
});

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/**
 * Allows extraction of a minified key. Let's the build system minify keys
 * without losing the ability to dynamically use key strings as values
 * themselves. Pass in an object with a single key/val pair and it will return
 * you the string key of that single record. Suppose you want to grab the
 * value for a key 'className' inside of an object. Key/val minification may
 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
 * reuse those resolutions.
 */
var keyOf = function keyOf(oneKeyObj) {
  var key;
  for (key in oneKeyObj) {
    if (!oneKeyObj.hasOwnProperty(key)) {
      continue;
    }
    return key;
  }
  return null;
};

module.exports = keyOf;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Executes the provided `callback` once for each enumerable own property in the
 * object and constructs a new object from the results. The `callback` is
 * invoked with three arguments:
 *
 *  - the property value
 *  - the property name
 *  - the object being traversed
 *
 * Properties that are added after the call to `mapObject` will not be visited
 * by `callback`. If the values of existing properties are changed, the value
 * passed to `callback` will be the value at the time `mapObject` visits them.
 * Properties that are deleted before being visited are not visited.
 *
 * @grep function objectMap()
 * @grep function objMap()
 *
 * @param {?object} object
 * @param {function} callback
 * @param {*} context
 * @return {?object}
 */
function mapObject(object, callback, context) {
  if (!object) {
    return null;
  }
  var result = {};
  for (var name in object) {
    if (hasOwnProperty.call(object, name)) {
      result[name] = callback.call(context, object[name], name, object);
    }
  }
  return result;
}

module.exports = mapObject;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */



var ExecutionEnvironment = __webpack_require__(10);

var performance;

if (ExecutionEnvironment.canUseDOM) {
  performance = window.performance || window.msPerformance || window.webkitPerformance;
}

module.exports = performance || {};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 */

var performance = __webpack_require__(23);

var performanceNow;

/**
 * Detect if we can use `window.performance.now()` and gracefully fallback to
 * `Date.now()` if it doesn't exist. We need to support Firefox < 15 for now
 * because of Facebook's testing infrastructure.
 */
if (performance.now) {
  performanceNow = function performanceNow() {
    return performance.now();
  };
} else {
  performanceNow = function performanceNow() {
    return Date.now();
  };
}

module.exports = performanceNow;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule KeyEscapeUtils
 */



/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {*} key to be escaped.
 * @return {string} the escaped key.
 */

function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * Unescape and unwrap key for human-readable display
 *
 * @param {string} key to unescape.
 * @return {string} the unescaped key.
 */
function unescape(key) {
  var unescapeRegex = /(=0|=2)/g;
  var unescaperLookup = {
    '=0': '=',
    '=2': ':'
  };
  var keySubstring = key[0] === '.' && key[1] === '$' ? key.substring(2) : key.substring(1);

  return ('' + keySubstring).replace(unescapeRegex, function (match) {
    return unescaperLookup[match];
  });
}

var KeyEscapeUtils = {
  escape: escape,
  unescape: unescape
};

module.exports = KeyEscapeUtils;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule PooledClass
 */



var invariant = __webpack_require__(2);

/**
 * Static poolers. Several custom versions for each potential number of
 * arguments. A completely generic pooler is easy to implement, but would
 * require accessing the `arguments` object. In each of these, `this` refers to
 * the Class itself, not an instance. If any others are needed, simply add them
 * here, or in their own files.
 */
var oneArgumentPooler = function (copyFieldsFrom) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    return new Klass(copyFieldsFrom);
  }
};

var twoArgumentPooler = function (a1, a2) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2);
    return instance;
  } else {
    return new Klass(a1, a2);
  }
};

var threeArgumentPooler = function (a1, a2, a3) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3);
    return instance;
  } else {
    return new Klass(a1, a2, a3);
  }
};

var fourArgumentPooler = function (a1, a2, a3, a4) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4);
  }
};

var fiveArgumentPooler = function (a1, a2, a3, a4, a5) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4, a5);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4, a5);
  }
};

var standardReleaser = function (instance) {
  var Klass = this;
  !(instance instanceof Klass) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Trying to release an instance into a pool of a different type.') : invariant(false) : void 0;
  instance.destructor();
  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance);
  }
};

var DEFAULT_POOL_SIZE = 10;
var DEFAULT_POOLER = oneArgumentPooler;

/**
 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
 * itself (statically) not adding any prototypical fields. Any CopyConstructor
 * you give this may have a `poolSize` property, and will look for a
 * prototypical `destructor` on instances (optional).
 *
 * @param {Function} CopyConstructor Constructor that can be used to reset.
 * @param {Function} pooler Customizable pooler.
 */
var addPoolingTo = function (CopyConstructor, pooler) {
  var NewKlass = CopyConstructor;
  NewKlass.instancePool = [];
  NewKlass.getPooled = pooler || DEFAULT_POOLER;
  if (!NewKlass.poolSize) {
    NewKlass.poolSize = DEFAULT_POOL_SIZE;
  }
  NewKlass.release = standardReleaser;
  return NewKlass;
};

var PooledClass = {
  addPoolingTo: addPoolingTo,
  oneArgumentPooler: oneArgumentPooler,
  twoArgumentPooler: twoArgumentPooler,
  threeArgumentPooler: threeArgumentPooler,
  fourArgumentPooler: fourArgumentPooler,
  fiveArgumentPooler: fiveArgumentPooler
};

module.exports = PooledClass;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule React
 */



var _assign = __webpack_require__(5);

var ReactChildren = __webpack_require__(28);
var ReactComponent = __webpack_require__(13);
var ReactClass = __webpack_require__(29);
var ReactDOMFactories = __webpack_require__(31);
var ReactElement = __webpack_require__(3);
var ReactElementValidator = __webpack_require__(14);
var ReactPropTypes = __webpack_require__(36);
var ReactVersion = __webpack_require__(37);

var onlyChild = __webpack_require__(38);
var warning = __webpack_require__(1);

var createElement = ReactElement.createElement;
var createFactory = ReactElement.createFactory;
var cloneElement = ReactElement.cloneElement;

if (process.env.NODE_ENV !== 'production') {
  createElement = ReactElementValidator.createElement;
  createFactory = ReactElementValidator.createFactory;
  cloneElement = ReactElementValidator.cloneElement;
}

var __spread = _assign;

if (process.env.NODE_ENV !== 'production') {
  var warned = false;
  __spread = function () {
    process.env.NODE_ENV !== 'production' ? warning(warned, 'React.__spread is deprecated and should not be used. Use ' + 'Object.assign directly or another helper function with similar ' + 'semantics. You may be seeing this warning due to your compiler. ' + 'See https://fb.me/react-spread-deprecation for more details.') : void 0;
    warned = true;
    return _assign.apply(null, arguments);
  };
}

var React = {

  // Modern

  Children: {
    map: ReactChildren.map,
    forEach: ReactChildren.forEach,
    count: ReactChildren.count,
    toArray: ReactChildren.toArray,
    only: onlyChild
  },

  Component: ReactComponent,

  createElement: createElement,
  cloneElement: cloneElement,
  isValidElement: ReactElement.isValidElement,

  // Classic

  PropTypes: ReactPropTypes,
  createClass: ReactClass.createClass,
  createFactory: createFactory,
  createMixin: function (mixin) {
    // Currently a noop. Will be used to validate and trace mixins.
    return mixin;
  },

  // This looks DOM specific but these are actually isomorphic helpers
  // since they are just generating DOM strings.
  DOM: ReactDOMFactories,

  version: ReactVersion,

  // Deprecated hook for JSX spread, don't use this for anything.
  __spread: __spread
};

module.exports = React;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactChildren
 */



var PooledClass = __webpack_require__(26);
var ReactElement = __webpack_require__(3);

var emptyFunction = __webpack_require__(4);
var traverseAllChildren = __webpack_require__(39);

var twoArgumentPooler = PooledClass.twoArgumentPooler;
var fourArgumentPooler = PooledClass.fourArgumentPooler;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * traversal. Allows avoiding binding callbacks.
 *
 * @constructor ForEachBookKeeping
 * @param {!function} forEachFunction Function to perform traversal with.
 * @param {?*} forEachContext Context to perform context with.
 */
function ForEachBookKeeping(forEachFunction, forEachContext) {
  this.func = forEachFunction;
  this.context = forEachContext;
  this.count = 0;
}
ForEachBookKeeping.prototype.destructor = function () {
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func;
  var context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.foreach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  ForEachBookKeeping.release(traverseContext);
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * mapping. Allows avoiding binding callbacks.
 *
 * @constructor MapBookKeeping
 * @param {!*} mapResult Object containing the ordered map of results.
 * @param {!function} mapFunction Function to perform mapping with.
 * @param {?*} mapContext Context to perform mapping with.
 */
function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
  this.result = mapResult;
  this.keyPrefix = keyPrefix;
  this.func = mapFunction;
  this.context = mapContext;
  this.count = 0;
}
MapBookKeeping.prototype.destructor = function () {
  this.result = null;
  this.keyPrefix = null;
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(MapBookKeeping, fourArgumentPooler);

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result;
  var keyPrefix = bookKeeping.keyPrefix;
  var func = bookKeeping.func;
  var context = bookKeeping.context;


  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (ReactElement.isValidElement(mappedChild)) {
      mappedChild = ReactElement.cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  MapBookKeeping.release(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.map
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

function forEachSingleChildDummy(traverseContext, child, name) {
  return null;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.count
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children, context) {
  return traverseAllChildren(children, forEachSingleChildDummy, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.toarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
  return result;
}

var ReactChildren = {
  forEach: forEachChildren,
  map: mapChildren,
  mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
  count: countChildren,
  toArray: toArray
};

module.exports = ReactChildren;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactClass
 */



var _assign = __webpack_require__(5);

var ReactComponent = __webpack_require__(13);
var ReactElement = __webpack_require__(3);
var ReactPropTypeLocations = __webpack_require__(16);
var ReactPropTypeLocationNames = __webpack_require__(7);
var ReactNoopUpdateQueue = __webpack_require__(15);

var emptyObject = __webpack_require__(11);
var invariant = __webpack_require__(2);
var keyMirror = __webpack_require__(12);
var keyOf = __webpack_require__(21);
var warning = __webpack_require__(1);

var MIXINS_KEY = keyOf({ mixins: null });

/**
 * Policies that describe methods in `ReactClassInterface`.
 */
var SpecPolicy = keyMirror({
  /**
   * These methods may be defined only once by the class specification or mixin.
   */
  DEFINE_ONCE: null,
  /**
   * These methods may be defined by both the class specification and mixins.
   * Subsequent definitions will be chained. These methods must return void.
   */
  DEFINE_MANY: null,
  /**
   * These methods are overriding the base class.
   */
  OVERRIDE_BASE: null,
  /**
   * These methods are similar to DEFINE_MANY, except we assume they return
   * objects. We try to merge the keys of the return values of all the mixed in
   * functions. If there is a key conflict we throw.
   */
  DEFINE_MANY_MERGED: null
});

var injectedMixins = [];

/**
 * Composite components are higher-level components that compose other composite
 * or native components.
 *
 * To create a new type of `ReactClass`, pass a specification of
 * your new class to `React.createClass`. The only requirement of your class
 * specification is that you implement a `render` method.
 *
 *   var MyComponent = React.createClass({
 *     render: function() {
 *       return <div>Hello World</div>;
 *     }
 *   });
 *
 * The class specification supports a specific protocol of methods that have
 * special meaning (e.g. `render`). See `ReactClassInterface` for
 * more the comprehensive protocol. Any other properties and methods in the
 * class specification will be available on the prototype.
 *
 * @interface ReactClassInterface
 * @internal
 */
var ReactClassInterface = {

  /**
   * An array of Mixin objects to include when defining your component.
   *
   * @type {array}
   * @optional
   */
  mixins: SpecPolicy.DEFINE_MANY,

  /**
   * An object containing properties and methods that should be defined on
   * the component's constructor instead of its prototype (static methods).
   *
   * @type {object}
   * @optional
   */
  statics: SpecPolicy.DEFINE_MANY,

  /**
   * Definition of prop types for this component.
   *
   * @type {object}
   * @optional
   */
  propTypes: SpecPolicy.DEFINE_MANY,

  /**
   * Definition of context types for this component.
   *
   * @type {object}
   * @optional
   */
  contextTypes: SpecPolicy.DEFINE_MANY,

  /**
   * Definition of context types this component sets for its children.
   *
   * @type {object}
   * @optional
   */
  childContextTypes: SpecPolicy.DEFINE_MANY,

  // ==== Definition methods ====

  /**
   * Invoked when the component is mounted. Values in the mapping will be set on
   * `this.props` if that prop is not specified (i.e. using an `in` check).
   *
   * This method is invoked before `getInitialState` and therefore cannot rely
   * on `this.state` or use `this.setState`.
   *
   * @return {object}
   * @optional
   */
  getDefaultProps: SpecPolicy.DEFINE_MANY_MERGED,

  /**
   * Invoked once before the component is mounted. The return value will be used
   * as the initial value of `this.state`.
   *
   *   getInitialState: function() {
   *     return {
   *       isOn: false,
   *       fooBaz: new BazFoo()
   *     }
   *   }
   *
   * @return {object}
   * @optional
   */
  getInitialState: SpecPolicy.DEFINE_MANY_MERGED,

  /**
   * @return {object}
   * @optional
   */
  getChildContext: SpecPolicy.DEFINE_MANY_MERGED,

  /**
   * Uses props from `this.props` and state from `this.state` to render the
   * structure of the component.
   *
   * No guarantees are made about when or how often this method is invoked, so
   * it must not have side effects.
   *
   *   render: function() {
   *     var name = this.props.name;
   *     return <div>Hello, {name}!</div>;
   *   }
   *
   * @return {ReactComponent}
   * @nosideeffects
   * @required
   */
  render: SpecPolicy.DEFINE_ONCE,

  // ==== Delegate methods ====

  /**
   * Invoked when the component is initially created and about to be mounted.
   * This may have side effects, but any external subscriptions or data created
   * by this method must be cleaned up in `componentWillUnmount`.
   *
   * @optional
   */
  componentWillMount: SpecPolicy.DEFINE_MANY,

  /**
   * Invoked when the component has been mounted and has a DOM representation.
   * However, there is no guarantee that the DOM node is in the document.
   *
   * Use this as an opportunity to operate on the DOM when the component has
   * been mounted (initialized and rendered) for the first time.
   *
   * @param {DOMElement} rootNode DOM element representing the component.
   * @optional
   */
  componentDidMount: SpecPolicy.DEFINE_MANY,

  /**
   * Invoked before the component receives new props.
   *
   * Use this as an opportunity to react to a prop transition by updating the
   * state using `this.setState`. Current props are accessed via `this.props`.
   *
   *   componentWillReceiveProps: function(nextProps, nextContext) {
   *     this.setState({
   *       likesIncreasing: nextProps.likeCount > this.props.likeCount
   *     });
   *   }
   *
   * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
   * transition may cause a state change, but the opposite is not true. If you
   * need it, you are probably looking for `componentWillUpdate`.
   *
   * @param {object} nextProps
   * @optional
   */
  componentWillReceiveProps: SpecPolicy.DEFINE_MANY,

  /**
   * Invoked while deciding if the component should be updated as a result of
   * receiving new props, state and/or context.
   *
   * Use this as an opportunity to `return false` when you're certain that the
   * transition to the new props/state/context will not require a component
   * update.
   *
   *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
   *     return !equal(nextProps, this.props) ||
   *       !equal(nextState, this.state) ||
   *       !equal(nextContext, this.context);
   *   }
   *
   * @param {object} nextProps
   * @param {?object} nextState
   * @param {?object} nextContext
   * @return {boolean} True if the component should update.
   * @optional
   */
  shouldComponentUpdate: SpecPolicy.DEFINE_ONCE,

  /**
   * Invoked when the component is about to update due to a transition from
   * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
   * and `nextContext`.
   *
   * Use this as an opportunity to perform preparation before an update occurs.
   *
   * NOTE: You **cannot** use `this.setState()` in this method.
   *
   * @param {object} nextProps
   * @param {?object} nextState
   * @param {?object} nextContext
   * @param {ReactReconcileTransaction} transaction
   * @optional
   */
  componentWillUpdate: SpecPolicy.DEFINE_MANY,

  /**
   * Invoked when the component's DOM representation has been updated.
   *
   * Use this as an opportunity to operate on the DOM when the component has
   * been updated.
   *
   * @param {object} prevProps
   * @param {?object} prevState
   * @param {?object} prevContext
   * @param {DOMElement} rootNode DOM element representing the component.
   * @optional
   */
  componentDidUpdate: SpecPolicy.DEFINE_MANY,

  /**
   * Invoked when the component is about to be removed from its parent and have
   * its DOM representation destroyed.
   *
   * Use this as an opportunity to deallocate any external resources.
   *
   * NOTE: There is no `componentDidUnmount` since your component will have been
   * destroyed by that point.
   *
   * @optional
   */
  componentWillUnmount: SpecPolicy.DEFINE_MANY,

  // ==== Advanced methods ====

  /**
   * Updates the component's currently mounted DOM representation.
   *
   * By default, this implements React's rendering and reconciliation algorithm.
   * Sophisticated clients may wish to override this.
   *
   * @param {ReactReconcileTransaction} transaction
   * @internal
   * @overridable
   */
  updateComponent: SpecPolicy.OVERRIDE_BASE

};

/**
 * Mapping from class specification keys to special processing functions.
 *
 * Although these are declared like instance properties in the specification
 * when defining classes using `React.createClass`, they are actually static
 * and are accessible on the constructor instead of the prototype. Despite
 * being static, they must be defined outside of the "statics" key under
 * which all other static methods are defined.
 */
var RESERVED_SPEC_KEYS = {
  displayName: function (Constructor, displayName) {
    Constructor.displayName = displayName;
  },
  mixins: function (Constructor, mixins) {
    if (mixins) {
      for (var i = 0; i < mixins.length; i++) {
        mixSpecIntoComponent(Constructor, mixins[i]);
      }
    }
  },
  childContextTypes: function (Constructor, childContextTypes) {
    if (process.env.NODE_ENV !== 'production') {
      validateTypeDef(Constructor, childContextTypes, ReactPropTypeLocations.childContext);
    }
    Constructor.childContextTypes = _assign({}, Constructor.childContextTypes, childContextTypes);
  },
  contextTypes: function (Constructor, contextTypes) {
    if (process.env.NODE_ENV !== 'production') {
      validateTypeDef(Constructor, contextTypes, ReactPropTypeLocations.context);
    }
    Constructor.contextTypes = _assign({}, Constructor.contextTypes, contextTypes);
  },
  /**
   * Special case getDefaultProps which should move into statics but requires
   * automatic merging.
   */
  getDefaultProps: function (Constructor, getDefaultProps) {
    if (Constructor.getDefaultProps) {
      Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
    } else {
      Constructor.getDefaultProps = getDefaultProps;
    }
  },
  propTypes: function (Constructor, propTypes) {
    if (process.env.NODE_ENV !== 'production') {
      validateTypeDef(Constructor, propTypes, ReactPropTypeLocations.prop);
    }
    Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
  },
  statics: function (Constructor, statics) {
    mixStaticSpecIntoComponent(Constructor, statics);
  },
  autobind: function () {} };

// noop
function validateTypeDef(Constructor, typeDef, location) {
  for (var propName in typeDef) {
    if (typeDef.hasOwnProperty(propName)) {
      // use a warning instead of an invariant so components
      // don't show up in prod but only in __DEV__
      process.env.NODE_ENV !== 'production' ? warning(typeof typeDef[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', Constructor.displayName || 'ReactClass', ReactPropTypeLocationNames[location], propName) : void 0;
    }
  }
}

function validateMethodOverride(isAlreadyDefined, name) {
  var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;

  // Disallow overriding of base class methods unless explicitly allowed.
  if (ReactClassMixin.hasOwnProperty(name)) {
    !(specPolicy === SpecPolicy.OVERRIDE_BASE) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to override ' + '`%s` from your class specification. Ensure that your method names ' + 'do not overlap with React methods.', name) : invariant(false) : void 0;
  }

  // Disallow defining methods more than once unless explicitly allowed.
  if (isAlreadyDefined) {
    !(specPolicy === SpecPolicy.DEFINE_MANY || specPolicy === SpecPolicy.DEFINE_MANY_MERGED) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to define ' + '`%s` on your component more than once. This conflict may be due ' + 'to a mixin.', name) : invariant(false) : void 0;
  }
}

/**
 * Mixin helper which handles policy validation and reserved
 * specification keys when building React classes.
 */
function mixSpecIntoComponent(Constructor, spec) {
  if (!spec) {
    return;
  }

  !(typeof spec !== 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to ' + 'use a component class or function as a mixin. Instead, just use a ' + 'regular object.') : invariant(false) : void 0;
  !!ReactElement.isValidElement(spec) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to ' + 'use a component as a mixin. Instead, just use a regular object.') : invariant(false) : void 0;

  var proto = Constructor.prototype;
  var autoBindPairs = proto.__reactAutoBindPairs;

  // By handling mixins before any other properties, we ensure the same
  // chaining order is applied to methods with DEFINE_MANY policy, whether
  // mixins are listed before or after these methods in the spec.
  if (spec.hasOwnProperty(MIXINS_KEY)) {
    RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
  }

  for (var name in spec) {
    if (!spec.hasOwnProperty(name)) {
      continue;
    }

    if (name === MIXINS_KEY) {
      // We have already handled mixins in a special case above.
      continue;
    }

    var property = spec[name];
    var isAlreadyDefined = proto.hasOwnProperty(name);
    validateMethodOverride(isAlreadyDefined, name);

    if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
      RESERVED_SPEC_KEYS[name](Constructor, property);
    } else {
      // Setup methods on prototype:
      // The following member methods should not be automatically bound:
      // 1. Expected ReactClass methods (in the "interface").
      // 2. Overridden methods (that were mixed in).
      var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
      var isFunction = typeof property === 'function';
      var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

      if (shouldAutoBind) {
        autoBindPairs.push(name, property);
        proto[name] = property;
      } else {
        if (isAlreadyDefined) {
          var specPolicy = ReactClassInterface[name];

          // These cases should already be caught by validateMethodOverride.
          !(isReactClassMethod && (specPolicy === SpecPolicy.DEFINE_MANY_MERGED || specPolicy === SpecPolicy.DEFINE_MANY)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: Unexpected spec policy %s for key %s ' + 'when mixing in component specs.', specPolicy, name) : invariant(false) : void 0;

          // For methods which are defined more than once, call the existing
          // methods before calling the new property, merging if appropriate.
          if (specPolicy === SpecPolicy.DEFINE_MANY_MERGED) {
            proto[name] = createMergedResultFunction(proto[name], property);
          } else if (specPolicy === SpecPolicy.DEFINE_MANY) {
            proto[name] = createChainedFunction(proto[name], property);
          }
        } else {
          proto[name] = property;
          if (process.env.NODE_ENV !== 'production') {
            // Add verbose displayName to the function, which helps when looking
            // at profiling tools.
            if (typeof property === 'function' && spec.displayName) {
              proto[name].displayName = spec.displayName + '_' + name;
            }
          }
        }
      }
    }
  }
}

function mixStaticSpecIntoComponent(Constructor, statics) {
  if (!statics) {
    return;
  }
  for (var name in statics) {
    var property = statics[name];
    if (!statics.hasOwnProperty(name)) {
      continue;
    }

    var isReserved = name in RESERVED_SPEC_KEYS;
    !!isReserved ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You are attempting to define a reserved ' + 'property, `%s`, that shouldn\'t be on the "statics" key. Define it ' + 'as an instance property instead; it will still be accessible on the ' + 'constructor.', name) : invariant(false) : void 0;

    var isInherited = name in Constructor;
    !!isInherited ? process.env.NODE_ENV !== 'production' ? invariant(false, 'ReactClass: You are attempting to define ' + '`%s` on your component more than once. This conflict may be ' + 'due to a mixin.', name) : invariant(false) : void 0;
    Constructor[name] = property;
  }
}

/**
 * Merge two objects, but throw if both contain the same key.
 *
 * @param {object} one The first object, which is mutated.
 * @param {object} two The second object
 * @return {object} one after it has been mutated to contain everything in two.
 */
function mergeIntoWithNoDuplicateKeys(one, two) {
  !(one && two && typeof one === 'object' && typeof two === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.') : invariant(false) : void 0;

  for (var key in two) {
    if (two.hasOwnProperty(key)) {
      !(one[key] === undefined) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): ' + 'Tried to merge two objects with the same key: `%s`. This conflict ' + 'may be due to a mixin; in particular, this may be caused by two ' + 'getInitialState() or getDefaultProps() methods returning objects ' + 'with clashing keys.', key) : invariant(false) : void 0;
      one[key] = two[key];
    }
  }
  return one;
}

/**
 * Creates a function that invokes two functions and merges their return values.
 *
 * @param {function} one Function to invoke first.
 * @param {function} two Function to invoke second.
 * @return {function} Function that invokes the two argument functions.
 * @private
 */
function createMergedResultFunction(one, two) {
  return function mergedResult() {
    var a = one.apply(this, arguments);
    var b = two.apply(this, arguments);
    if (a == null) {
      return b;
    } else if (b == null) {
      return a;
    }
    var c = {};
    mergeIntoWithNoDuplicateKeys(c, a);
    mergeIntoWithNoDuplicateKeys(c, b);
    return c;
  };
}

/**
 * Creates a function that invokes two functions and ignores their return vales.
 *
 * @param {function} one Function to invoke first.
 * @param {function} two Function to invoke second.
 * @return {function} Function that invokes the two argument functions.
 * @private
 */
function createChainedFunction(one, two) {
  return function chainedFunction() {
    one.apply(this, arguments);
    two.apply(this, arguments);
  };
}

/**
 * Binds a method to the component.
 *
 * @param {object} component Component whose method is going to be bound.
 * @param {function} method Method to be bound.
 * @return {function} The bound method.
 */
function bindAutoBindMethod(component, method) {
  var boundMethod = method.bind(component);
  if (process.env.NODE_ENV !== 'production') {
    boundMethod.__reactBoundContext = component;
    boundMethod.__reactBoundMethod = method;
    boundMethod.__reactBoundArguments = null;
    var componentName = component.constructor.displayName;
    var _bind = boundMethod.bind;
    boundMethod.bind = function (newThis) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      // User is trying to bind() an autobound method; we effectively will
      // ignore the value of "this" that the user is trying to use, so
      // let's warn.
      if (newThis !== component && newThis !== null) {
        process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): React component methods may only be bound to the ' + 'component instance. See %s', componentName) : void 0;
      } else if (!args.length) {
        process.env.NODE_ENV !== 'production' ? warning(false, 'bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See %s', componentName) : void 0;
        return boundMethod;
      }
      var reboundMethod = _bind.apply(boundMethod, arguments);
      reboundMethod.__reactBoundContext = component;
      reboundMethod.__reactBoundMethod = method;
      reboundMethod.__reactBoundArguments = args;
      return reboundMethod;
    };
  }
  return boundMethod;
}

/**
 * Binds all auto-bound methods in a component.
 *
 * @param {object} component Component whose method is going to be bound.
 */
function bindAutoBindMethods(component) {
  var pairs = component.__reactAutoBindPairs;
  for (var i = 0; i < pairs.length; i += 2) {
    var autoBindKey = pairs[i];
    var method = pairs[i + 1];
    component[autoBindKey] = bindAutoBindMethod(component, method);
  }
}

/**
 * Add more to the ReactClass base class. These are all legacy features and
 * therefore not already part of the modern ReactComponent.
 */
var ReactClassMixin = {

  /**
   * TODO: This will be deprecated because state should always keep a consistent
   * type signature and the only use case for this, is to avoid that.
   */
  replaceState: function (newState, callback) {
    this.updater.enqueueReplaceState(this, newState);
    if (callback) {
      this.updater.enqueueCallback(this, callback, 'replaceState');
    }
  },

  /**
   * Checks whether or not this composite component is mounted.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function () {
    return this.updater.isMounted(this);
  }
};

var ReactClassComponent = function () {};
_assign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);

/**
 * Module for creating composite components.
 *
 * @class ReactClass
 */
var ReactClass = {

  /**
   * Creates a composite component class given a class specification.
   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
   *
   * @param {object} spec Class specification (which must define `render`).
   * @return {function} Component constructor function.
   * @public
   */
  createClass: function (spec) {
    var Constructor = function (props, context, updater) {
      // This constructor gets overridden by mocks. The argument is used
      // by mocks to assert on what gets mounted.

      if (process.env.NODE_ENV !== 'production') {
        process.env.NODE_ENV !== 'production' ? warning(this instanceof Constructor, 'Something is calling a React component directly. Use a factory or ' + 'JSX instead. See: https://fb.me/react-legacyfactory') : void 0;
      }

      // Wire up auto-binding
      if (this.__reactAutoBindPairs.length) {
        bindAutoBindMethods(this);
      }

      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;

      this.state = null;

      // ReactClasses doesn't have constructors. Instead, they use the
      // getInitialState and componentWillMount methods for initialization.

      var initialState = this.getInitialState ? this.getInitialState() : null;
      if (process.env.NODE_ENV !== 'production') {
        // We allow auto-mocks to proceed as if they're returning null.
        if (initialState === undefined && this.getInitialState._isMockFunction) {
          // This is probably bad practice. Consider warning here and
          // deprecating this convenience.
          initialState = null;
        }
      }
      !(typeof initialState === 'object' && !Array.isArray(initialState)) ? process.env.NODE_ENV !== 'production' ? invariant(false, '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent') : invariant(false) : void 0;

      this.state = initialState;
    };
    Constructor.prototype = new ReactClassComponent();
    Constructor.prototype.constructor = Constructor;
    Constructor.prototype.__reactAutoBindPairs = [];

    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

    mixSpecIntoComponent(Constructor, spec);

    // Initialize the defaultProps property after all mixins have been merged.
    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps();
    }

    if (process.env.NODE_ENV !== 'production') {
      // This is a tag to indicate that the use of these method names is ok,
      // since it's used with createClass. If it's not, then it's likely a
      // mistake so we'll warn you to use the static property, property
      // initializer or constructor respectively.
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps.isReactClassApproved = {};
      }
      if (Constructor.prototype.getInitialState) {
        Constructor.prototype.getInitialState.isReactClassApproved = {};
      }
    }

    !Constructor.prototype.render ? process.env.NODE_ENV !== 'production' ? invariant(false, 'createClass(...): Class specification must implement a `render` method.') : invariant(false) : void 0;

    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', spec.displayName || 'A component') : void 0;
      process.env.NODE_ENV !== 'production' ? warning(!Constructor.prototype.componentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', spec.displayName || 'A component') : void 0;
    }

    // Reduce time spent doing lookups by setting these on the prototype.
    for (var methodName in ReactClassInterface) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }

    return Constructor;
  },

  injection: {
    injectMixin: function (mixin) {
      injectedMixins.push(mixin);
    }
  }

};

module.exports = ReactClass;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactComponentTreeDevtool
 */



var invariant = __webpack_require__(2);

var tree = {};
var rootIDs = [];

function updateTree(id, update) {
  if (!tree[id]) {
    tree[id] = {
      parentID: null,
      ownerID: null,
      text: null,
      childIDs: [],
      displayName: 'Unknown',
      isMounted: false,
      updateCount: 0
    };
  }
  update(tree[id]);
}

function purgeDeep(id) {
  var item = tree[id];
  if (item) {
    var childIDs = item.childIDs;

    delete tree[id];
    childIDs.forEach(purgeDeep);
  }
}

var ReactComponentTreeDevtool = {
  onSetDisplayName: function (id, displayName) {
    updateTree(id, function (item) {
      return item.displayName = displayName;
    });
  },
  onSetChildren: function (id, nextChildIDs) {
    updateTree(id, function (item) {
      var prevChildIDs = item.childIDs;
      item.childIDs = nextChildIDs;

      nextChildIDs.forEach(function (nextChildID) {
        var nextChild = tree[nextChildID];
        !nextChild ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected devtool events to fire for the child ' + 'before its parent includes it in onSetChildren().') : invariant(false) : void 0;
        !(nextChild.displayName != null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onSetDisplayName() to fire for the child ' + 'before its parent includes it in onSetChildren().') : invariant(false) : void 0;
        !(nextChild.childIDs != null || nextChild.text != null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onSetChildren() or onSetText() to fire for the child ' + 'before its parent includes it in onSetChildren().') : invariant(false) : void 0;
        !nextChild.isMounted ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected onMountComponent() to fire for the child ' + 'before its parent includes it in onSetChildren().') : invariant(false) : void 0;

        if (prevChildIDs.indexOf(nextChildID) === -1) {
          nextChild.parentID = id;
        }
      });
    });
  },
  onSetOwner: function (id, ownerID) {
    updateTree(id, function (item) {
      return item.ownerID = ownerID;
    });
  },
  onSetText: function (id, text) {
    updateTree(id, function (item) {
      return item.text = text;
    });
  },
  onMountComponent: function (id) {
    updateTree(id, function (item) {
      return item.isMounted = true;
    });
  },
  onMountRootComponent: function (id) {
    rootIDs.push(id);
  },
  onUpdateComponent: function (id) {
    updateTree(id, function (item) {
      return item.updateCount++;
    });
  },
  onUnmountComponent: function (id) {
    updateTree(id, function (item) {
      return item.isMounted = false;
    });
    rootIDs = rootIDs.filter(function (rootID) {
      return rootID !== id;
    });
  },
  purgeUnmountedComponents: function () {
    if (ReactComponentTreeDevtool._preventPurging) {
      // Should only be used for testing.
      return;
    }

    Object.keys(tree).filter(function (id) {
      return !tree[id].isMounted;
    }).forEach(purgeDeep);
  },
  isMounted: function (id) {
    var item = tree[id];
    return item ? item.isMounted : false;
  },
  getChildIDs: function (id) {
    var item = tree[id];
    return item ? item.childIDs : [];
  },
  getDisplayName: function (id) {
    var item = tree[id];
    return item ? item.displayName : 'Unknown';
  },
  getOwnerID: function (id) {
    var item = tree[id];
    return item ? item.ownerID : null;
  },
  getParentID: function (id) {
    var item = tree[id];
    return item ? item.parentID : null;
  },
  getText: function (id) {
    var item = tree[id];
    return item ? item.text : null;
  },
  getUpdateCount: function (id) {
    var item = tree[id];
    return item ? item.updateCount : 0;
  },
  getRootIDs: function () {
    return rootIDs;
  },
  getRegisteredIDs: function () {
    return Object.keys(tree);
  }
};

module.exports = ReactComponentTreeDevtool;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDOMFactories
 */



var ReactElement = __webpack_require__(3);
var ReactElementValidator = __webpack_require__(14);

var mapObject = __webpack_require__(22);

/**
 * Create a factory that creates HTML tag elements.
 *
 * @param {string} tag Tag name (e.g. `div`).
 * @private
 */
function createDOMFactory(tag) {
  if (process.env.NODE_ENV !== 'production') {
    return ReactElementValidator.createFactory(tag);
  }
  return ReactElement.createFactory(tag);
}

/**
 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
 * This is also accessible via `React.DOM`.
 *
 * @public
 */
var ReactDOMFactories = mapObject({
  a: 'a',
  abbr: 'abbr',
  address: 'address',
  area: 'area',
  article: 'article',
  aside: 'aside',
  audio: 'audio',
  b: 'b',
  base: 'base',
  bdi: 'bdi',
  bdo: 'bdo',
  big: 'big',
  blockquote: 'blockquote',
  body: 'body',
  br: 'br',
  button: 'button',
  canvas: 'canvas',
  caption: 'caption',
  cite: 'cite',
  code: 'code',
  col: 'col',
  colgroup: 'colgroup',
  data: 'data',
  datalist: 'datalist',
  dd: 'dd',
  del: 'del',
  details: 'details',
  dfn: 'dfn',
  dialog: 'dialog',
  div: 'div',
  dl: 'dl',
  dt: 'dt',
  em: 'em',
  embed: 'embed',
  fieldset: 'fieldset',
  figcaption: 'figcaption',
  figure: 'figure',
  footer: 'footer',
  form: 'form',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  head: 'head',
  header: 'header',
  hgroup: 'hgroup',
  hr: 'hr',
  html: 'html',
  i: 'i',
  iframe: 'iframe',
  img: 'img',
  input: 'input',
  ins: 'ins',
  kbd: 'kbd',
  keygen: 'keygen',
  label: 'label',
  legend: 'legend',
  li: 'li',
  link: 'link',
  main: 'main',
  map: 'map',
  mark: 'mark',
  menu: 'menu',
  menuitem: 'menuitem',
  meta: 'meta',
  meter: 'meter',
  nav: 'nav',
  noscript: 'noscript',
  object: 'object',
  ol: 'ol',
  optgroup: 'optgroup',
  option: 'option',
  output: 'output',
  p: 'p',
  param: 'param',
  picture: 'picture',
  pre: 'pre',
  progress: 'progress',
  q: 'q',
  rp: 'rp',
  rt: 'rt',
  ruby: 'ruby',
  s: 's',
  samp: 'samp',
  script: 'script',
  section: 'section',
  select: 'select',
  small: 'small',
  source: 'source',
  span: 'span',
  strong: 'strong',
  style: 'style',
  sub: 'sub',
  summary: 'summary',
  sup: 'sup',
  table: 'table',
  tbody: 'tbody',
  td: 'td',
  textarea: 'textarea',
  tfoot: 'tfoot',
  th: 'th',
  thead: 'thead',
  time: 'time',
  title: 'title',
  tr: 'tr',
  track: 'track',
  u: 'u',
  ul: 'ul',
  'var': 'var',
  video: 'video',
  wbr: 'wbr',

  // SVG
  circle: 'circle',
  clipPath: 'clipPath',
  defs: 'defs',
  ellipse: 'ellipse',
  g: 'g',
  image: 'image',
  line: 'line',
  linearGradient: 'linearGradient',
  mask: 'mask',
  path: 'path',
  pattern: 'pattern',
  polygon: 'polygon',
  polyline: 'polyline',
  radialGradient: 'radialGradient',
  rect: 'rect',
  stop: 'stop',
  svg: 'svg',
  text: 'text',
  tspan: 'tspan'

}, createDOMFactory);

module.exports = ReactDOMFactories;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactDebugTool
 */



var ExecutionEnvironment = __webpack_require__(10);

var performanceNow = __webpack_require__(24);
var warning = __webpack_require__(1);

var eventHandlers = [];
var handlerDoesThrowForEvent = {};

function emitEvent(handlerFunctionName, arg1, arg2, arg3, arg4, arg5) {
  if (process.env.NODE_ENV !== 'production') {
    eventHandlers.forEach(function (handler) {
      try {
        if (handler[handlerFunctionName]) {
          handler[handlerFunctionName](arg1, arg2, arg3, arg4, arg5);
        }
      } catch (e) {
        process.env.NODE_ENV !== 'production' ? warning(!handlerDoesThrowForEvent[handlerFunctionName], 'exception thrown by devtool while handling %s: %s', handlerFunctionName, e.message) : void 0;
        handlerDoesThrowForEvent[handlerFunctionName] = true;
      }
    });
  }
}

var isProfiling = false;
var flushHistory = [];
var currentFlushNesting = 0;
var currentFlushMeasurements = null;
var currentFlushStartTime = null;
var currentTimerDebugID = null;
var currentTimerStartTime = null;
var currentTimerType = null;

function clearHistory() {
  ReactComponentTreeDevtool.purgeUnmountedComponents();
  ReactNativeOperationHistoryDevtool.clearHistory();
}

function getTreeSnapshot(registeredIDs) {
  return registeredIDs.reduce(function (tree, id) {
    var ownerID = ReactComponentTreeDevtool.getOwnerID(id);
    var parentID = ReactComponentTreeDevtool.getParentID(id);
    tree[id] = {
      displayName: ReactComponentTreeDevtool.getDisplayName(id),
      text: ReactComponentTreeDevtool.getText(id),
      updateCount: ReactComponentTreeDevtool.getUpdateCount(id),
      childIDs: ReactComponentTreeDevtool.getChildIDs(id),
      // Text nodes don't have owners but this is close enough.
      ownerID: ownerID || ReactComponentTreeDevtool.getOwnerID(parentID),
      parentID: parentID
    };
    return tree;
  }, {});
}

function resetMeasurements() {
  if (process.env.NODE_ENV !== 'production') {
    var previousStartTime = currentFlushStartTime;
    var previousMeasurements = currentFlushMeasurements || [];
    var previousOperations = ReactNativeOperationHistoryDevtool.getHistory();

    if (!isProfiling || currentFlushNesting === 0) {
      currentFlushStartTime = null;
      currentFlushMeasurements = null;
      clearHistory();
      return;
    }

    if (previousMeasurements.length || previousOperations.length) {
      var registeredIDs = ReactComponentTreeDevtool.getRegisteredIDs();
      flushHistory.push({
        duration: performanceNow() - previousStartTime,
        measurements: previousMeasurements || [],
        operations: previousOperations || [],
        treeSnapshot: getTreeSnapshot(registeredIDs)
      });
    }

    clearHistory();
    currentFlushStartTime = performanceNow();
    currentFlushMeasurements = [];
  }
}

function checkDebugID(debugID) {
  process.env.NODE_ENV !== 'production' ? warning(debugID, 'ReactDebugTool: debugID may not be empty.') : void 0;
}

var ReactDebugTool = {
  addDevtool: function (devtool) {
    eventHandlers.push(devtool);
  },
  removeDevtool: function (devtool) {
    for (var i = 0; i < eventHandlers.length; i++) {
      if (eventHandlers[i] === devtool) {
        eventHandlers.splice(i, 1);
        i--;
      }
    }
  },
  beginProfiling: function () {
    if (process.env.NODE_ENV !== 'production') {
      if (isProfiling) {
        return;
      }

      isProfiling = true;
      flushHistory.length = 0;
      resetMeasurements();
    }
  },
  endProfiling: function () {
    if (process.env.NODE_ENV !== 'production') {
      if (!isProfiling) {
        return;
      }

      isProfiling = false;
      resetMeasurements();
    }
  },
  getFlushHistory: function () {
    if (process.env.NODE_ENV !== 'production') {
      return flushHistory;
    }
  },
  onBeginFlush: function () {
    if (process.env.NODE_ENV !== 'production') {
      currentFlushNesting++;
      resetMeasurements();
    }
    emitEvent('onBeginFlush');
  },
  onEndFlush: function () {
    if (process.env.NODE_ENV !== 'production') {
      resetMeasurements();
      currentFlushNesting--;
    }
    emitEvent('onEndFlush');
  },
  onBeginLifeCycleTimer: function (debugID, timerType) {
    checkDebugID(debugID);
    emitEvent('onBeginLifeCycleTimer', debugID, timerType);
    if (process.env.NODE_ENV !== 'production') {
      if (isProfiling && currentFlushNesting > 0) {
        process.env.NODE_ENV !== 'production' ? warning(!currentTimerType, 'There is an internal error in the React performance measurement code. ' + 'Did not expect %s timer to start while %s timer is still in ' + 'progress for %s instance.', timerType, currentTimerType || 'no', debugID === currentTimerDebugID ? 'the same' : 'another') : void 0;
        currentTimerStartTime = performanceNow();
        currentTimerDebugID = debugID;
        currentTimerType = timerType;
      }
    }
  },
  onEndLifeCycleTimer: function (debugID, timerType) {
    checkDebugID(debugID);
    if (process.env.NODE_ENV !== 'production') {
      if (isProfiling && currentFlushNesting > 0) {
        process.env.NODE_ENV !== 'production' ? warning(currentTimerType === timerType, 'There is an internal error in the React performance measurement code. ' + 'We did not expect %s timer to stop while %s timer is still in ' + 'progress for %s instance. Please report this as a bug in React.', timerType, currentTimerType || 'no', debugID === currentTimerDebugID ? 'the same' : 'another') : void 0;
        currentFlushMeasurements.push({
          timerType: timerType,
          instanceID: debugID,
          duration: performanceNow() - currentTimerStartTime
        });
        currentTimerStartTime = null;
        currentTimerDebugID = null;
        currentTimerType = null;
      }
    }
    emitEvent('onEndLifeCycleTimer', debugID, timerType);
  },
  onBeginReconcilerTimer: function (debugID, timerType) {
    checkDebugID(debugID);
    emitEvent('onBeginReconcilerTimer', debugID, timerType);
  },
  onEndReconcilerTimer: function (debugID, timerType) {
    checkDebugID(debugID);
    emitEvent('onEndReconcilerTimer', debugID, timerType);
  },
  onBeginProcessingChildContext: function () {
    emitEvent('onBeginProcessingChildContext');
  },
  onEndProcessingChildContext: function () {
    emitEvent('onEndProcessingChildContext');
  },
  onNativeOperation: function (debugID, type, payload) {
    checkDebugID(debugID);
    emitEvent('onNativeOperation', debugID, type, payload);
  },
  onSetState: function () {
    emitEvent('onSetState');
  },
  onSetDisplayName: function (debugID, displayName) {
    checkDebugID(debugID);
    emitEvent('onSetDisplayName', debugID, displayName);
  },
  onSetChildren: function (debugID, childDebugIDs) {
    checkDebugID(debugID);
    emitEvent('onSetChildren', debugID, childDebugIDs);
  },
  onSetOwner: function (debugID, ownerDebugID) {
    checkDebugID(debugID);
    emitEvent('onSetOwner', debugID, ownerDebugID);
  },
  onSetText: function (debugID, text) {
    checkDebugID(debugID);
    emitEvent('onSetText', debugID, text);
  },
  onMountRootComponent: function (debugID) {
    checkDebugID(debugID);
    emitEvent('onMountRootComponent', debugID);
  },
  onMountComponent: function (debugID) {
    checkDebugID(debugID);
    emitEvent('onMountComponent', debugID);
  },
  onUpdateComponent: function (debugID) {
    checkDebugID(debugID);
    emitEvent('onUpdateComponent', debugID);
  },
  onUnmountComponent: function (debugID) {
    checkDebugID(debugID);
    emitEvent('onUnmountComponent', debugID);
  }
};

if (process.env.NODE_ENV !== 'production') {
  var ReactInvalidSetStateWarningDevTool = __webpack_require__(34);
  var ReactNativeOperationHistoryDevtool = __webpack_require__(35);
  var ReactComponentTreeDevtool = __webpack_require__(30);
  ReactDebugTool.addDevtool(ReactInvalidSetStateWarningDevTool);
  ReactDebugTool.addDevtool(ReactComponentTreeDevtool);
  ReactDebugTool.addDevtool(ReactNativeOperationHistoryDevtool);
  var url = ExecutionEnvironment.canUseDOM && window.location.href || '';
  if (/[?&]react_perf\b/.test(url)) {
    ReactDebugTool.beginProfiling();
  }
}

module.exports = ReactDebugTool;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactInstrumentation
 */



var ReactDebugTool = __webpack_require__(32);

module.exports = { debugTool: ReactDebugTool };

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactInvalidSetStateWarningDevTool
 */



var warning = __webpack_require__(1);

if (process.env.NODE_ENV !== 'production') {
  var processingChildContext = false;

  var warnInvalidSetState = function () {
    process.env.NODE_ENV !== 'production' ? warning(!processingChildContext, 'setState(...): Cannot call setState() inside getChildContext()') : void 0;
  };
}

var ReactInvalidSetStateWarningDevTool = {
  onBeginProcessingChildContext: function () {
    processingChildContext = true;
  },
  onEndProcessingChildContext: function () {
    processingChildContext = false;
  },
  onSetState: function () {
    warnInvalidSetState();
  }
};

module.exports = ReactInvalidSetStateWarningDevTool;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactNativeOperationHistoryDevtool
 */



var history = [];

var ReactNativeOperationHistoryDevtool = {
  onNativeOperation: function (debugID, type, payload) {
    history.push({
      instanceID: debugID,
      type: type,
      payload: payload
    });
  },
  clearHistory: function () {
    if (ReactNativeOperationHistoryDevtool._preventClearing) {
      // Should only be used for tests.
      return;
    }

    history = [];
  },
  getHistory: function () {
    return history;
  }
};

module.exports = ReactNativeOperationHistoryDevtool;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactPropTypes
 */



var ReactElement = __webpack_require__(3);
var ReactPropTypeLocationNames = __webpack_require__(7);

var emptyFunction = __webpack_require__(4);
var getIteratorFn = __webpack_require__(9);

/**
 * Collection of methods that allow declaration and validation of props that are
 * supplied to React components. Example usage:
 *
 *   var Props = require('ReactPropTypes');
 *   var MyArticle = React.createClass({
 *     propTypes: {
 *       // An optional string prop named "description".
 *       description: Props.string,
 *
 *       // A required enum prop named "category".
 *       category: Props.oneOf(['News','Photos']).isRequired,
 *
 *       // A prop named "dialog" that requires an instance of Dialog.
 *       dialog: Props.instanceOf(Dialog).isRequired
 *     },
 *     render: function() { ... }
 *   });
 *
 * A more formal specification of how these methods are used:
 *
 *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
 *   decl := ReactPropTypes.{type}(.isRequired)?
 *
 * Each and every declaration produces a function with the same signature. This
 * allows the creation of custom validation functions. For example:
 *
 *  var MyLink = React.createClass({
 *    propTypes: {
 *      // An optional string or URI prop named "href".
 *      href: function(props, propName, componentName) {
 *        var propValue = props[propName];
 *        if (propValue != null && typeof propValue !== 'string' &&
 *            !(propValue instanceof URI)) {
 *          return new Error(
 *            'Expected a string or an URI for ' + propName + ' in ' +
 *            componentName
 *          );
 *        }
 *      }
 *    },
 *    render: function() {...}
 *  });
 *
 * @internal
 */

var ANONYMOUS = '<<anonymous>>';

var ReactPropTypes = {
  array: createPrimitiveTypeChecker('array'),
  bool: createPrimitiveTypeChecker('boolean'),
  func: createPrimitiveTypeChecker('function'),
  number: createPrimitiveTypeChecker('number'),
  object: createPrimitiveTypeChecker('object'),
  string: createPrimitiveTypeChecker('string'),

  any: createAnyTypeChecker(),
  arrayOf: createArrayOfTypeChecker,
  element: createElementTypeChecker(),
  instanceOf: createInstanceTypeChecker,
  node: createNodeChecker(),
  objectOf: createObjectOfTypeChecker,
  oneOf: createEnumTypeChecker,
  oneOfType: createUnionTypeChecker,
  shape: createShapeTypeChecker
};

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
/*eslint-disable no-self-compare*/
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return x !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}
/*eslint-enable no-self-compare*/

function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, componentName, location, propFullName) {
    componentName = componentName || ANONYMOUS;
    propFullName = propFullName || propName;
    if (props[propName] == null) {
      var locationName = ReactPropTypeLocationNames[location];
      if (isRequired) {
        return new Error('Required ' + locationName + ' `' + propFullName + '` was not specified in ' + ('`' + componentName + '`.'));
      }
      return null;
    } else {
      return validate(props, propName, componentName, location, propFullName);
    }
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}

function createPrimitiveTypeChecker(expectedType) {
  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    var propType = getPropType(propValue);
    if (propType !== expectedType) {
      var locationName = ReactPropTypeLocationNames[location];
      // `propValue` being instance of, say, date/regexp, pass the 'object'
      // check, but we can offer a more precise error message here rather than
      // 'of type `object`'.
      var preciseType = getPreciseType(propValue);

      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createAnyTypeChecker() {
  return createChainableTypeChecker(emptyFunction.thatReturns(null));
}

function createArrayOfTypeChecker(typeChecker) {
  function validate(props, propName, componentName, location, propFullName) {
    if (typeof typeChecker !== 'function') {
      return new Error('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
    }
    var propValue = props[propName];
    if (!Array.isArray(propValue)) {
      var locationName = ReactPropTypeLocationNames[location];
      var propType = getPropType(propValue);
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
    }
    for (var i = 0; i < propValue.length; i++) {
      var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']');
      if (error instanceof Error) {
        return error;
      }
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createElementTypeChecker() {
  function validate(props, propName, componentName, location, propFullName) {
    if (!ReactElement.isValidElement(props[propName])) {
      var locationName = ReactPropTypeLocationNames[location];
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a single ReactElement.'));
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createInstanceTypeChecker(expectedClass) {
  function validate(props, propName, componentName, location, propFullName) {
    if (!(props[propName] instanceof expectedClass)) {
      var locationName = ReactPropTypeLocationNames[location];
      var expectedClassName = expectedClass.name || ANONYMOUS;
      var actualClassName = getClassName(props[propName]);
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createEnumTypeChecker(expectedValues) {
  if (!Array.isArray(expectedValues)) {
    return createChainableTypeChecker(function () {
      return new Error('Invalid argument supplied to oneOf, expected an instance of array.');
    });
  }

  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    for (var i = 0; i < expectedValues.length; i++) {
      if (is(propValue, expectedValues[i])) {
        return null;
      }
    }

    var locationName = ReactPropTypeLocationNames[location];
    var valuesString = JSON.stringify(expectedValues);
    return new Error('Invalid ' + locationName + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
  }
  return createChainableTypeChecker(validate);
}

function createObjectOfTypeChecker(typeChecker) {
  function validate(props, propName, componentName, location, propFullName) {
    if (typeof typeChecker !== 'function') {
      return new Error('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
    }
    var propValue = props[propName];
    var propType = getPropType(propValue);
    if (propType !== 'object') {
      var locationName = ReactPropTypeLocationNames[location];
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
    }
    for (var key in propValue) {
      if (propValue.hasOwnProperty(key)) {
        var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key);
        if (error instanceof Error) {
          return error;
        }
      }
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createUnionTypeChecker(arrayOfTypeCheckers) {
  if (!Array.isArray(arrayOfTypeCheckers)) {
    return createChainableTypeChecker(function () {
      return new Error('Invalid argument supplied to oneOfType, expected an instance of array.');
    });
  }

  function validate(props, propName, componentName, location, propFullName) {
    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (checker(props, propName, componentName, location, propFullName) == null) {
        return null;
      }
    }

    var locationName = ReactPropTypeLocationNames[location];
    return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
  }
  return createChainableTypeChecker(validate);
}

function createNodeChecker() {
  function validate(props, propName, componentName, location, propFullName) {
    if (!isNode(props[propName])) {
      var locationName = ReactPropTypeLocationNames[location];
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createShapeTypeChecker(shapeTypes) {
  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    var propType = getPropType(propValue);
    if (propType !== 'object') {
      var locationName = ReactPropTypeLocationNames[location];
      return new Error('Invalid ' + locationName + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
    }
    for (var key in shapeTypes) {
      var checker = shapeTypes[key];
      if (!checker) {
        continue;
      }
      var error = checker(propValue, key, componentName, location, propFullName + '.' + key);
      if (error) {
        return error;
      }
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function isNode(propValue) {
  switch (typeof propValue) {
    case 'number':
    case 'string':
    case 'undefined':
      return true;
    case 'boolean':
      return !propValue;
    case 'object':
      if (Array.isArray(propValue)) {
        return propValue.every(isNode);
      }
      if (propValue === null || ReactElement.isValidElement(propValue)) {
        return true;
      }

      var iteratorFn = getIteratorFn(propValue);
      if (iteratorFn) {
        var iterator = iteratorFn.call(propValue);
        var step;
        if (iteratorFn !== propValue.entries) {
          while (!(step = iterator.next()).done) {
            if (!isNode(step.value)) {
              return false;
            }
          }
        } else {
          // Iterator will provide entry [k,v] tuples rather than values.
          while (!(step = iterator.next()).done) {
            var entry = step.value;
            if (entry) {
              if (!isNode(entry[1])) {
                return false;
              }
            }
          }
        }
      } else {
        return false;
      }

      return true;
    default:
      return false;
  }
}

// Equivalent of `typeof` but with special handling for array and regexp.
function getPropType(propValue) {
  var propType = typeof propValue;
  if (Array.isArray(propValue)) {
    return 'array';
  }
  if (propValue instanceof RegExp) {
    // Old webkits (at least until Android 4.0) return 'function' rather than
    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
    // passes PropTypes.object.
    return 'object';
  }
  return propType;
}

// This handles more types than `getPropType`. Only used for error messages.
// See `createPrimitiveTypeChecker`.
function getPreciseType(propValue) {
  var propType = getPropType(propValue);
  if (propType === 'object') {
    if (propValue instanceof Date) {
      return 'date';
    } else if (propValue instanceof RegExp) {
      return 'regexp';
    }
  }
  return propType;
}

// Returns class name of the object, if any.
function getClassName(propValue) {
  if (!propValue.constructor || !propValue.constructor.name) {
    return ANONYMOUS;
  }
  return propValue.constructor.name;
}

module.exports = ReactPropTypes;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactVersion
 */



module.exports = '15.1.0';

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule onlyChild
 */


var ReactElement = __webpack_require__(3);

var invariant = __webpack_require__(2);

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.only
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
function onlyChild(children) {
  !ReactElement.isValidElement(children) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'onlyChild must be passed a children with exactly one child.') : invariant(false) : void 0;
  return children;
}

module.exports = onlyChild;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule traverseAllChildren
 */



var ReactCurrentOwner = __webpack_require__(6);
var ReactElement = __webpack_require__(3);

var getIteratorFn = __webpack_require__(9);
var invariant = __webpack_require__(2);
var KeyEscapeUtils = __webpack_require__(25);
var warning = __webpack_require__(1);

var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var didWarnAboutMaps = false;

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (component && typeof component === 'object' && component.key != null) {
    // Explicit key
    return KeyEscapeUtils.escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  if (children === null || type === 'string' || type === 'number' || ReactElement.isValidElement(children)) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);
    if (iteratorFn) {
      var iterator = iteratorFn.call(children);
      var step;
      if (iteratorFn !== children.entries) {
        var ii = 0;
        while (!(step = iterator.next()).done) {
          child = step.value;
          nextName = nextNamePrefix + getComponentKey(child, ii++);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else {
        if (process.env.NODE_ENV !== 'production') {
          process.env.NODE_ENV !== 'production' ? warning(didWarnAboutMaps, 'Using Maps as children is not yet fully supported. It is an ' + 'experimental feature that might be removed. Convert it to a ' + 'sequence / iterable of keyed ReactElements instead.') : void 0;
          didWarnAboutMaps = true;
        }
        // Iterator will provide entry [k,v] tuples rather than values.
        while (!(step = iterator.next()).done) {
          var entry = step.value;
          if (entry) {
            child = entry[1];
            nextName = nextNamePrefix + KeyEscapeUtils.escape(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        }
      }
    } else if (type === 'object') {
      var addendum = '';
      if (process.env.NODE_ENV !== 'production') {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead or wrap the object using createFragment(object) from the ' + 'React add-ons.';
        if (children._isReactElement) {
          addendum = ' It looks like you\'re using an element created by a different ' + 'version of React. Make sure to use only one copy of React.';
        }
        if (ReactCurrentOwner.current) {
          var name = ReactCurrentOwner.current.getName();
          if (name) {
            addendum += ' Check the render method of `' + name + '`.';
          }
        }
      }
      var childrenString = String(children);
       true ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : invariant(false) : void 0;
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

module.exports = traverseAllChildren;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ENABLE_SUBJECT_MODIFICATION_FOR_SINGLE_BOOK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return ENABLE_SUBJECT_MODIFICATION_FOR_TOGGLED_BOOKS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SETTING_BOOKS_SUBJECTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SET_BOOKS_SUBJECTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return CANCEL_BOOKS_SUBJECT_MODIFICATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return FINISHED_SUBJECT_MODIFICATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return ADDING_SUBJECT_SET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return ADDING_SUBJECT_SEARCH_CHANGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return REMOVING_SUBJECT_SET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return REMOVING_SUBJECT_SEARCH_CHANGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return RESET_SUBJECTS; });
var ENABLE_SUBJECT_MODIFICATION_FOR_SINGLE_BOOK = 'ENABLE_SUBJECT_MODIFICATION_FOR_SINGLE_BOOK';
var ENABLE_SUBJECT_MODIFICATION_FOR_TOGGLED_BOOKS = 'ENABLE_SUBJECT_MODIFICATION_FOR_TOGGLED_BOOKS';
var SETTING_BOOKS_SUBJECTS = 'SETTING_BOOKS_SUBJECTS';
var SET_BOOKS_SUBJECTS = 'SET_BOOKS_SUBJECTS';
var CANCEL_BOOKS_SUBJECT_MODIFICATION = 'CANCEL_BOOKS_SUBJECT_MODIFICATION';
var FINISHED_SUBJECT_MODIFICATION = 'FINISHED_SUBJECT_MODIFICATION';
var ADDING_SUBJECT_SET = 'ADDING_SUBJECT_SET';
var ADDING_SUBJECT_SEARCH_CHANGE = 'ADDING_SUBJECT_SEARCH_CHANGE';
var REMOVING_SUBJECT_SET = 'REMOVING_SUBJECT_SET';
var REMOVING_SUBJECT_SEARCH_CHANGE = 'REMOVING_SUBJECT_SEARCH_CHANGE';
var RESET_SUBJECTS = 'RESET_SUBJECTS';

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ENABLE_TAG_MODIFICATION_FOR_SINGLE_BOOK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return ENABLE_TAG_MODIFICATION_FOR_TOGGLED_BOOKS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SETTING_BOOKS_TAGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SET_BOOKS_TAGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return CANCEL_BOOKS_TAG_MODIFICATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return FINISHED_TAG_MODIFICATION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return ADDING_TAG_SET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return ADDING_TAG_SEARCH_CHANGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return REMOVING_TAG_SET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return REMOVING_TAG_SEARCH_CHANGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return RESET_TAGS; });
var ENABLE_TAG_MODIFICATION_FOR_SINGLE_BOOK = 'ENABLE_TAG_MODIFICATION_FOR_SINGLE_BOOK';
var ENABLE_TAG_MODIFICATION_FOR_TOGGLED_BOOKS = 'ENABLE_TAG_MODIFICATION_FOR_TOGGLED_BOOKS';
var SETTING_BOOKS_TAGS = 'SETTING_BOOKS_TAGS';
var SET_BOOKS_TAGS = 'SET_BOOKS_TAGS';
var CANCEL_BOOKS_TAG_MODIFICATION = 'CANCEL_BOOKS_TAG_MODIFICATION';
var FINISHED_TAG_MODIFICATION = 'FINISHED_TAG_MODIFICATION';
var ADDING_TAG_SET = 'ADDING_TAG_SET';
var ADDING_TAG_SEARCH_CHANGE = 'ADDING_TAG_SEARCH_CHANGE';
var REMOVING_TAG_SET = 'REMOVING_TAG_SET';
var REMOVING_TAG_SEARCH_CHANGE = 'REMOVING_TAG_SEARCH_CHANGE';
var RESET_TAGS = 'RESET_TAGS';

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return LOAD_BOOKS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LOAD_BOOKS_RESULTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return TOGGLE_SELECT_BOOK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return SELECT_ALL_BOOKS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return BOOK_READ_CHANGING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return BOOK_READ_CHANGED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return TOGGLE_CHECK_ALL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return SET_PENDING_DELETE_BOOK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return CANCEL_PENDING_DELETE_BOOK; });
/* unused harmony export DELETE_BOOK */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return BOOK_DELETING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return BOOK_DELETED; });
var LOAD_BOOKS = 'LOAD_BOOKS';
var LOAD_BOOKS_RESULTS = 'LOAD_BOOKS_RESULTS';
var TOGGLE_SELECT_BOOK = 'TOGGLE_SELECT_BOOK';
var SELECT_ALL_BOOKS = 'SELECT_ALL_BOOKS';
var BOOK_READ_CHANGING = 'BOOK_READ_CHANGING';
var BOOK_READ_CHANGED = 'BOOK_READ_CHANGED';
var TOGGLE_CHECK_ALL = 'TOGGLE_CHECK_ALL';

var SET_PENDING_DELETE_BOOK = 'SET_PENDING_DELETE_BOOK';
var CANCEL_PENDING_DELETE_BOOK = 'CANCEL_PENDING_DELETE_BOOK';
var DELETE_BOOK = 'DELETE_BOOK';
var BOOK_DELETING = 'BOOK_DELETING';
var BOOK_DELETED = 'BOOK_DELETED';

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_reselect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actionNames__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__subjects_actionNames__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__booksSubjectModification_actionNames__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__booksTagModification_actionNames__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__editBook_actionNames__ = __webpack_require__(44);
/* harmony export (immutable) */ __webpack_exports__["a"] = booksReducer;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return booksSelector; });








var initialBooksState = {
    booksHash: {},
    loading: false,
    selectedBooks: {},
    reloadOnActivate: false,
    initialQueryFired: false
};

function booksReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialBooksState;
    var action = arguments[1];

    switch (action.type) {
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["b" /* LOAD_BOOKS */]:
            return Object.assign({}, state, { loading: true, initialQueryFired: true, reloadOnActivate: false });
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["a" /* LOAD_BOOKS_RESULTS */]:
            return Object.assign({}, state, { loading: false, selectedBooks: {}, booksHash: createBooksHash(action.books) });
        case __WEBPACK_IMPORTED_MODULE_5__editBook_actionNames__["a" /* EDITING_BOOK_SAVED */]:
            var newBookVersion = Object.assign({}, state.booksHash[action.book._id], action.book); //only update fields sent
            return Object.assign({}, state, { booksHash: babelHelpers.extends({}, state.booksHash, babelHelpers.defineProperty({}, action.book._id, newBookVersion)) });
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["c" /* TOGGLE_SELECT_BOOK */]:
            return Object.assign({}, state, { selectedBooks: babelHelpers.extends({}, state.selectedBooks, babelHelpers.defineProperty({}, action._id, !state.selectedBooks[action._id])) });
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["d" /* SELECT_ALL_BOOKS */]:
            var newBookList = state.list.map(function (b) {
                return Object.assign({}, b, { selected: true });
            });
            return Object.assign({}, state, { list: newBookList, selectedCount: newBookList.length });
        case __WEBPACK_IMPORTED_MODULE_3__booksSubjectModification_actionNames__["a" /* SET_BOOKS_SUBJECTS */]:
            var newBookHash = babelHelpers.extends({}, state.booksHash);

            action.books.forEach(function (_id) {
                var book = babelHelpers.extends({}, newBookHash[_id]),
                    booksSubjectsHash = {};

                book.subjects.forEach(function (_id) {
                    return booksSubjectsHash[_id] = true;
                });

                action.add.forEach(function (sAdd) {
                    return booksSubjectsHash[sAdd] = true;
                });
                action.remove.forEach(function (sAdd) {
                    return booksSubjectsHash[sAdd] = false;
                });

                book.subjects = Object.keys(booksSubjectsHash).filter(function (_id) {
                    return booksSubjectsHash[_id];
                });
                newBookHash[_id] = book;
            });

            return Object.assign({}, state, { booksHash: newBookHash });
        case __WEBPACK_IMPORTED_MODULE_4__booksTagModification_actionNames__["a" /* SET_BOOKS_TAGS */]:
            var newBookHash = babelHelpers.extends({}, state.booksHash);

            action.books.forEach(function (_id) {
                var book = babelHelpers.extends({}, newBookHash[_id]),
                    booksTagsHash = {};

                book.tags.forEach(function (_id) {
                    return booksTagsHash[_id] = true;
                });

                action.add.forEach(function (sAdd) {
                    return booksTagsHash[sAdd] = true;
                });
                action.remove.forEach(function (sAdd) {
                    return booksTagsHash[sAdd] = false;
                });

                book.tags = Object.keys(booksTagsHash).filter(function (_id) {
                    return booksTagsHash[_id];
                });
                newBookHash[_id] = book;
            });

            return Object.assign({}, state, { booksHash: newBookHash });
        case BOOK_SAVED:
        case MANUAL_BOOK_SAVED:
            return Object.assign({}, state, { reloadOnActivate: true });
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["e" /* BOOK_READ_CHANGING */]:
            {
                var changingBooks = action._ids.reduce(function (hash, _id) {
                    return hash[_id] = babelHelpers.extends({}, state.booksHash[_id], { readChanging: true }), hash;
                }, {});
                return Object.assign({}, state, { booksHash: babelHelpers.extends({}, state.booksHash, changingBooks) });
            }case __WEBPACK_IMPORTED_MODULE_1__actionNames__["f" /* BOOK_READ_CHANGED */]:
            {
                var _changingBooks = action._ids.reduce(function (hash, _id) {
                    return hash[_id] = babelHelpers.extends({}, state.booksHash[_id], { readChanging: false, isRead: action.value }), hash;
                }, {});
                return Object.assign({}, state, { booksHash: babelHelpers.extends({}, state.booksHash, _changingBooks) });
            }
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["g" /* TOGGLE_CHECK_ALL */]:
            var selectedCount = Object.keys(state.selectedBooks).length,
                allBooksCount = Object.keys(state.booksHash).length,
                newSelectedHash = {};

            if (!selectedCount || selectedCount && allBooksCount != selectedCount) {
                newSelectedHash = Object.keys(state.booksHash).reduce(function (hash, _id) {
                    return hash[_id] = true, hash;
                }, {});
            }
            return Object.assign({}, state, { selectedBooks: newSelectedHash });
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["h" /* SET_PENDING_DELETE_BOOK */]:
            return babelHelpers.extends({}, state, { booksHash: babelHelpers.extends({}, state.booksHash, babelHelpers.defineProperty({}, action._id, babelHelpers.extends({}, state.booksHash[action._id], { pendingDelete: true }))) });
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["i" /* CANCEL_PENDING_DELETE_BOOK */]:
            return babelHelpers.extends({}, state, { booksHash: babelHelpers.extends({}, state.booksHash, babelHelpers.defineProperty({}, action._id, babelHelpers.extends({}, state.booksHash[action._id], { pendingDelete: false }))) });
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["j" /* BOOK_DELETING */]:
            return babelHelpers.extends({}, state, { booksHash: babelHelpers.extends({}, state.booksHash, babelHelpers.defineProperty({}, action._id, babelHelpers.extends({}, state.booksHash[action._id], { deleting: true }))) });
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["k" /* BOOK_DELETED */]:
            var newBooksHash = babelHelpers.extends({}, state.booksHash);
            delete newBooksHash[action._id];
            return babelHelpers.extends({}, state, { booksHash: newBooksHash });
    }
    return state;
}

function createBooksHash(booksArr) {
    var result = {};
    booksArr.forEach(function (book) {
        if (!book.subjects) {
            book.subjects = [];
        }
        if (!book.tags) {
            book.tags = [];
        }
        result[book._id] = book;
    });
    return result;
}

var booksWithSubjectsSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])([function (state) {
    return state.booksModule.books.booksHash;
}, function (state) {
    return state.app.subjectHash;
}, function (state) {
    return state.booksModule.tags.tagHash;
}], function (booksHash, subjectsHash, tagHash) {
    var books = Object.keys(booksHash).map(function (_id) {
        return booksHash[_id];
    });
    books.forEach(function (b) {
        b.subjectObjects = (b.subjects || []).map(function (s) {
            return subjectsHash[s];
        }).filter(function (s) {
            return s;
        });
        b.tagObjects = (b.tags || []).map(function (s) {
            return tagHash[s];
        }).filter(function (s) {
            return s;
        });
        b.authors = b.authors || [];

        var d = new Date(+b.dateAdded);
        b.dateAddedDisplay = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();
    });
    return { list: books };
});

var bookSelectionSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])([function (state) {
    return state.booksModule.books.booksHash;
}, function (state) {
    return state.booksModule.books.selectedBooks;
}], function (booksHash, selectedBooks) {
    var selectedIds = Object.keys(selectedBooks).filter(function (_id) {
        return selectedBooks[_id];
    }).length;
    return {
        allAreChecked: Object.keys(booksHash).length == selectedIds,
        selectedBooksCount: selectedIds
    };
});

var booksSelector = function booksSelector(state) {
    return Object.assign({}, state.booksModule.books, babelHelpers.extends({}, booksWithSubjectsSelector(state), bookSelectionSelector(state)));
};

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return EDIT_BOOK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return STOP_EDITING_BOOK; });
/* unused harmony export SAVE_EDITING_BOOK */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return EDITING_BOOK_SAVING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EDITING_BOOK_SAVED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return EDIT_BOOK_RESET; });
var EDIT_BOOK = 'EDIT_BOOK';
var STOP_EDITING_BOOK = 'CANCEL_EDIT_BOOK';
var SAVE_EDITING_BOOK = 'SAVE_EDITING_BOOK';
var EDITING_BOOK_SAVING = 'EDITING_BOOK_SAVING';
var EDITING_BOOK_SAVED = 'EDITING_BOOK_SAVED';
var EDIT_BOOK_RESET = 'EDIT_BOOK_RESET';

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return EDIT_SUBJECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return NEW_SUBJECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EDIT_SUBJECTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return SET_NEW_SUBJECT_VALUE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return STOP_EDITING_SUBJECTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return CANCEL_SUBJECT_EDIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return UPDATE_SUBJECT; });
/* unused harmony export UPDATE_SUBJECT_RESULTS */
/* unused harmony export CANCEL_PENDING_FILTERED_SUBJECTS */
/* unused harmony export CLEAR_SUBJECT_MODIFICATION_SUBJECTS */
/* unused harmony export CANCEL_SUBJECT_MODIFICATION */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return BEGIN_SUBJECT_DELETE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return CANCEL_SUBJECT_DELETE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return SUBJECT_DELETING; });
/* unused harmony export SUBJECT_DELETED */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SET_SUBJECT_SEARCH_VALUE; });
var EDIT_SUBJECT = 'EDIT_SUBJECT';
var NEW_SUBJECT = 'NEW_SUBJECT';
var EDIT_SUBJECTS = 'EDIT_SUBJECTS';
var SET_NEW_SUBJECT_VALUE = 'SET_NEW_SUBJECT_VALUE';
var STOP_EDITING_SUBJECTS = 'STOP_EDITING_SUBJECTS';
var CANCEL_SUBJECT_EDIT = 'CANCEL_SUBJECT_EDIT';
var UPDATE_SUBJECT = 'UPDATE_SUBJECT';
var UPDATE_SUBJECT_RESULTS = 'UPDATE_SUBJECT_RESULTS';
var CANCEL_PENDING_FILTERED_SUBJECTS = 'CANCEL_PENDING_FILTERED_SUBJECTS';
var CLEAR_SUBJECT_MODIFICATION_SUBJECTS = 'CLEAR_SUBJECT_MODIFICATION_SUBJECTS';
var CANCEL_SUBJECT_MODIFICATION = 'CANCEL_SUBJECT_MODIFICATION';
var BEGIN_SUBJECT_DELETE = 'BEGIN_SUBJECT_DELETE';
var CANCEL_SUBJECT_DELETE = 'CANCEL_SUBJECT_DELETE';
var SUBJECT_DELETING = 'SUBJECT_DELETING';
var SUBJECT_DELETED = 'SUBJECT_DELETED';
var SET_SUBJECT_SEARCH_VALUE = 'SET_SUBJECT_SEARCH_VALUE';

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = createStore;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsIsPlainObject = __webpack_require__(48);

var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = {
  INIT: '@@redux/INIT'
};

exports.ActionTypes = ActionTypes;
/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [initialState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */

function createStore(reducer, initialState) {
  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = initialState;
  var listeners = [];
  var isDispatching = false;

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    listeners.push(listener);
    var isSubscribed = true;

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;
      var index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!_utilsIsPlainObject2['default'](action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    listeners.slice().forEach(function (listener) {
      return listener();
    });
    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  };
}

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Composes single-argument functions from right to left.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing functions from right to
 * left. For example, compose(f, g, h) is identical to arg => f(g(h(arg))).
 */


exports.__esModule = true;
exports["default"] = compose;

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  return function (arg) {
    return funcs.reduceRight(function (composed, f) {
      return f(composed);
    }, arg);
  };
}

module.exports = exports["default"];

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = isPlainObject;
var fnToString = function fnToString(fn) {
  return Function.prototype.toString.call(fn);
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */

function isPlainObject(obj) {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  var proto = typeof obj.constructor === 'function' ? Object.getPrototypeOf(obj) : Object.prototype;

  if (proto === null) {
    return true;
  }

  var constructor = proto.constructor;

  return typeof constructor === 'function' && constructor instanceof constructor && fnToString(constructor) === fnToString(Object);
}

module.exports = exports['default'];

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Applies a function to every key-value pair inside an object.
 *
 * @param {Object} obj The source object.
 * @param {Function} fn The mapper function that receives the value and the key.
 * @returns {Object} A new object that contains the mapped values for the keys.
 */


exports.__esModule = true;
exports["default"] = mapValues;

function mapValues(obj, fn) {
  return Object.keys(obj).reduce(function (result, key) {
    result[key] = fn(obj[key], key);
    return result;
  }, {});
}

module.exports = exports["default"];

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__books_reducer__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__subjects_reducer__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tags_reducer__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__bookSearch_reducer__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__booksSubjectModification_reducer__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__booksTagModification_reducer__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__editBook_reducer__ = __webpack_require__(55);
/* unused harmony export reducer */
/* unused harmony export selector */









var reducer = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_redux__["combineReducers"])({
    books: __WEBPACK_IMPORTED_MODULE_1__books_reducer__["a" /* booksReducer */],
    subjects: __WEBPACK_IMPORTED_MODULE_2__subjects_reducer__["a" /* subjectsReducer */],
    bookSearch: __WEBPACK_IMPORTED_MODULE_4__bookSearch_reducer__["a" /* bookSearchReducer */],
    booksSubjectsModifier: __WEBPACK_IMPORTED_MODULE_5__booksSubjectModification_reducer__["a" /* bookSubjectManagerReducer */],
    booksTagsModifier: __WEBPACK_IMPORTED_MODULE_6__booksTagModification_reducer__["a" /* bookTagManagerReducer */],
    bookEdit: __WEBPACK_IMPORTED_MODULE_7__editBook_reducer__["a" /* default */],
    tags: __WEBPACK_IMPORTED_MODULE_3__tags_reducer__["a" /* tagsReducer */]
});

var selector = function selector(state) {
    var booksSelected = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__books_reducer__["b" /* booksSelector */])(state),
        tagsSelected = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__tags_reducer__["b" /* tagsSelector */])(state),
        bookEdit = state.booksModule.bookEdit,
        bookSearch = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__bookSearch_reducer__["b" /* bookSearchSelector */])(state),
        app = state.app;

    return {
        subjectsLoaded: app.subjectsLoaded,
        tagsLoaded: tagsSelected.loaded,
        books: booksSelected.list,
        isGridView: bookSearch.isGridView,
        isBasicList: bookSearch.isBasicList,
        hasMoreBooks: bookSearch.hasMore,
        currentPage: bookSearch.page,
        viewingPublic: app.isPublic,
        allAreChecked: booksSelected.allAreChecked,
        selectedBooks: booksSelected.selectedBooks,
        booksLoading: booksSelected.loading,
        currentSort: bookSearch.sort,
        sortDirection: bookSearch.sortDirection,
        isEditingBook: bookEdit.isEditing,
        editingBook: bookEdit.editingBook,
        editingBookSaving: bookEdit.editingBookSaving,
        editingBookSaved: bookEdit.editingBookSaved
    };
};

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return BEGIN_FILTER_CHANGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return SET_PENDING_SUBJECT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return SET_PENDING_TAG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return SET_PENDING; });
/* unused harmony export APPLY_PENDING_SEARCH */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return END_FILTER_CHANGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SET_FILTERS; });
/* unused harmony export SET_VIEWING_USERID */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SET_SEARCH_SUBJECTS_VALUE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SET_SEARCH_TAGS_VALUE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return SET_GRID_VIEW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return SET_BASIC_LIST_VIEW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return GRID_VIEW; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return BASIC_LIST_VIEW; });
var BEGIN_FILTER_CHANGE = 'BEGIN_FILTER_CHANGE';
var SET_PENDING_SUBJECT = 'SET_PENDING_SUBJECT';
var SET_PENDING_TAG = 'SET_PENDING_TAG';
var SET_PENDING = 'SET_PENDING';
var APPLY_PENDING_SEARCH = 'APPLY_PENDING_SEARCH';
var END_FILTER_CHANGE = 'END_FILTER_CHANGE';
var SET_FILTERS = 'SET_FILTERS';
var SET_VIEWING_USERID = 'SET_VIEWING_USERID';
var SET_SEARCH_SUBJECTS_VALUE = 'SET_SEARCH_SUBJECTS_VALUE';
var SET_SEARCH_TAGS_VALUE = 'SET_SEARCH_TAGS_VALUE';

var SET_GRID_VIEW = 'booksSearch.SET_GRID_VIEW';
var SET_BASIC_LIST_VIEW = 'booksSearch.SET_BasicList_VIEW';

var GRID_VIEW = 'books table view';
var BASIC_LIST_VIEW = 'books mobile view';

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actionNames__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__books_actionNames__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__subjects_reducer__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__books_reducer__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tags_reducer__ = __webpack_require__(20);
/* harmony export (immutable) */ __webpack_exports__["a"] = bookSearchReducer;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return bookSearchSelector; });








var searchFields = {
    search: '',
    subjects: {},
    tags: {},
    searchChildSubjects: false,
    author: '',
    publisher: '',
    pages: '',
    pagesOperator: '>',
    page: 1,
    pageSize: 50,
    isRead: ''
};

var initialState = babelHelpers.extends({
    sort: '_id',
    sortDirection: '-1',
    editingFilters: false,
    hasMore: false
}, searchFields, {
    pending: babelHelpers.extends({}, searchFields),
    searchSubjectsValue: '',
    searchTagsValue: '',
    view: ''
});

function bookSearchReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case __WEBPACK_IMPORTED_MODULE_0__actionNames__["a" /* SET_SEARCH_SUBJECTS_VALUE */]:
            return babelHelpers.extends({}, state, { searchSubjectsValue: action.value });
        case __WEBPACK_IMPORTED_MODULE_0__actionNames__["b" /* SET_SEARCH_TAGS_VALUE */]:
            return babelHelpers.extends({}, state, { searchTagsValue: action.value });
        case __WEBPACK_IMPORTED_MODULE_0__actionNames__["c" /* SET_FILTERS */]:
            return babelHelpers.extends({}, state, searchFields, action.packet, { pending: babelHelpers.extends({}, state.pending, searchFields, action.packet) });
        case __WEBPACK_IMPORTED_MODULE_0__actionNames__["d" /* SET_PENDING */]:
            return babelHelpers.extends({}, state, { pending: babelHelpers.extends({}, state.pending, babelHelpers.defineProperty({}, action.field, action.value)) });
        case __WEBPACK_IMPORTED_MODULE_0__actionNames__["e" /* BEGIN_FILTER_CHANGE */]:
            var result = Object.assign({}, state, { editingFilters: true, searchSubjectsValue: '', searchTagsValue: '' });
            Object.keys(searchFields).forEach(function (k) {
                return state.pending[k] = state[k];
            });
            return result;
        case __WEBPACK_IMPORTED_MODULE_0__actionNames__["f" /* SET_PENDING_SUBJECT */]:
            return Object.assign({}, state, { pending: babelHelpers.extends({}, state.pending, { subjects: babelHelpers.extends({}, state.pending.subjects, babelHelpers.defineProperty({}, action._id, action.value)) }) });
        case __WEBPACK_IMPORTED_MODULE_0__actionNames__["g" /* SET_PENDING_TAG */]:
            return Object.assign({}, state, { pending: babelHelpers.extends({}, state.pending, { tags: babelHelpers.extends({}, state.pending.tags, babelHelpers.defineProperty({}, action._id, action.value)) }) });
        case __WEBPACK_IMPORTED_MODULE_0__actionNames__["h" /* END_FILTER_CHANGE */]:
            return Object.assign({}, state, { editingFilters: false });
        case __WEBPACK_IMPORTED_MODULE_1__books_actionNames__["a" /* LOAD_BOOKS_RESULTS */]:
            return Object.assign({}, state, { hasMore: action.hasMore });
        case __WEBPACK_IMPORTED_MODULE_0__actionNames__["i" /* SET_BASIC_LIST_VIEW */]:
            return babelHelpers.extends({}, state, { view: __WEBPACK_IMPORTED_MODULE_0__actionNames__["j" /* BASIC_LIST_VIEW */] });
        case __WEBPACK_IMPORTED_MODULE_0__actionNames__["k" /* SET_GRID_VIEW */]:
            return babelHelpers.extends({}, state, { view: __WEBPACK_IMPORTED_MODULE_0__actionNames__["l" /* GRID_VIEW */] });
    }
    return state;
}

function projectSelectedItems(ids, hash) {
    return Object.keys(ids).filter(function (k) {
        return ids[k];
    }).map(function (_id) {
        return hash[_id];
    }).filter(function (s) {
        return s;
    });
}

var bookSearchSelector = function bookSearchSelector(state) {
    var booksModule = state.booksModule,
        bookSearch = state.booksModule.bookSearch,
        view = bookSearch.view,
        app = state.app;

    var subjectsState = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__subjects_reducer__["b" /* subjectsSelector */])(state);
    var booksState = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__books_reducer__["b" /* booksSelector */])(state);
    var tagsState = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__tags_reducer__["b" /* tagsSelector */])(state);
    var bindableSortValue = !bookSearch.sort ? '_id|desc' : bookSearch.sort + '|' + (bookSearch.sortDirection == 1 ? 'asc' : 'desc');

    var isGridView = view == __WEBPACK_IMPORTED_MODULE_0__actionNames__["l" /* GRID_VIEW */] || !view && app.showingDesktop,
        isBasicList = view == __WEBPACK_IMPORTED_MODULE_0__actionNames__["j" /* BASIC_LIST_VIEW */] || !view && app.showingMobile;

    return Object.assign({}, booksModule.bookSearch, babelHelpers.extends({
        selectedSubjects: projectSelectedItems(bookSearch.subjects, app.subjectHash),
        selectedTags: projectSelectedItems(bookSearch.tags, booksModule.tags.tagHash),
        pendingSelectedSubjects: projectSelectedItems(booksModule.bookSearch.pending.subjects, app.subjectHash),
        pendingSelectedTags: projectSelectedItems(booksModule.bookSearch.pending.tags, booksModule.tags.tagHash),
        subjects: subjectsState.subjects,
        allSubjectsSorted: subjectsState.allSubjectsSorted,
        selectedBooksCount: booksState.selectedBooksCount,
        viewingPublic: app.isPublic,
        eligibleFilterSubjects: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__subjects_reducer__["c" /* filterSubjects */])(subjectsState.subjectsUnwound, bookSearch.searchSubjectsValue),
        eligibleFilterTags: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__subjects_reducer__["c" /* filterSubjects */])(tagsState.allTagsSorted, bookSearch.searchTagsValue),
        bindableSortValue: bindableSortValue,
        isGridView: isGridView,
        isBasicList: isBasicList
    }, app, {
        booksLoading: booksState.loading
    }));
};

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_reselect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actionNames__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__subjects_reducer__ = __webpack_require__(19);
/* harmony export (immutable) */ __webpack_exports__["a"] = bookSubjectManagerReducer;
/* unused harmony export booksSubjectsModifierSelector */






var bookSubjectManagerInitialState = {
    singleBookModify: null,
    selectedBooksModify: false,
    addingSubjects: {},
    removingSubjects: {},
    settingBooksSubjects: false,
    addingSubjectSearch: '',
    removingSubjectSearch: ''
};

function bookSubjectManagerReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : bookSubjectManagerInitialState;
    var action = arguments[1];

    switch (action.type) {
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["b" /* SETTING_BOOKS_SUBJECTS */]:
            return Object.assign({}, state, { settingBooksSubjects: true });
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["a" /* SET_BOOKS_SUBJECTS */]:
            return Object.assign({}, state, { settingBooksSubjects: false });
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["c" /* ENABLE_SUBJECT_MODIFICATION_FOR_SINGLE_BOOK */]:
            return Object.assign({}, state, { singleBookModify: action._id });
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["d" /* ENABLE_SUBJECT_MODIFICATION_FOR_TOGGLED_BOOKS */]:
            return Object.assign({}, state, { selectedBooksModify: true });
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["e" /* CANCEL_BOOKS_SUBJECT_MODIFICATION */]:
            return Object.assign({}, state, { singleBookModify: null, selectedBooksModify: false });
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["f" /* FINISHED_SUBJECT_MODIFICATION */]:
            return Object.assign({}, state, { addingSubjects: {}, removingSubjects: {}, singleBookModify: null, selectedBooksModify: false });
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["g" /* ADDING_SUBJECT_SEARCH_CHANGE */]:
            return Object.assign({}, state, { addingSubjectSearch: action.value });
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["h" /* ADDING_SUBJECT_SET */]:
            return Object.assign({}, state, { addingSubjectSearch: '', addingSubjects: babelHelpers.extends({}, state.addingSubjects, babelHelpers.defineProperty({}, action._id, action.value)) });
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["i" /* REMOVING_SUBJECT_SEARCH_CHANGE */]:
            return Object.assign({}, state, { removingSubjectSearch: action.value });
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["j" /* REMOVING_SUBJECT_SET */]:
            return Object.assign({}, state, { removingSubjectSearch: '', removingSubjects: babelHelpers.extends({}, state.removingSubjects, babelHelpers.defineProperty({}, action._id, action.value)) });
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["k" /* RESET_SUBJECTS */]:
            return Object.assign({}, state, { addingSubjects: {}, removingSubjects: {} });
    }
    return state;
}

var modifyingBooksSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])([function (_ref) {
    var booksModule = _ref.booksModule;
    return booksModule.booksSubjectsModifier.singleBookModify;
}, function (_ref2) {
    var booksModule = _ref2.booksModule;
    return booksModule.booksSubjectsModifier.selectedBooksModify;
}, function (_ref3) {
    var booksModule = _ref3.booksModule;
    return booksModule.books;
}], function (singleBookModify, selectedBooksModify, books) {
    var modifyingBookIds = singleBookModify ? [singleBookModify] : selectedBooksModify ? Object.keys(books.selectedBooks).filter(function (k) {
        return books.selectedBooks[k];
    }) : [];
    return modifyingBookIds.filter(function (_id) {
        return _id;
    }).map(function (_id) {
        return books.booksHash[_id];
    });
});

var addingSubjectsSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])([function (state) {
    return state.booksModule.booksSubjectsModifier.addingSubjects;
}, function (state) {
    return state.booksModule.booksSubjectsModifier.addingSubjectSearch;
}, function (state) {
    return state.app.subjectHash;
}, __WEBPACK_IMPORTED_MODULE_2__subjects_reducer__["b" /* subjectsSelector */]], function (adding, addingSubjectSearch, subjects, subjectsSelected) {
    return {
        addingSubjects: Object.keys(adding).filter(function (_id) {
            return adding[_id];
        }).map(function (_id) {
            return subjects[_id];
        }),
        eligibleToAdd: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__subjects_reducer__["c" /* filterSubjects */])(subjectsSelected.subjectsUnwound, addingSubjectSearch)
    };
});

var removingSubjectsSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])([function (state) {
    return state.booksModule.booksSubjectsModifier.removingSubjects;
}, function (state) {
    return state.booksModule.booksSubjectsModifier.removingSubjectSearch;
}, function (state) {
    return state.app.subjectHash;
}, __WEBPACK_IMPORTED_MODULE_2__subjects_reducer__["b" /* subjectsSelector */]], function (removing, removingSubjectSearch, subjects, subjectsSelected) {
    return {
        removingSubjects: Object.keys(removing).filter(function (_id) {
            return removing[_id];
        }).map(function (_id) {
            return subjects[_id];
        }),
        eligibleToRemove: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__subjects_reducer__["c" /* filterSubjects */])(subjectsSelected.subjectsUnwound, removingSubjectSearch)
    };
});

var booksSubjectsModifierSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])([function (_ref4) {
    var booksModule = _ref4.booksModule;
    return booksModule.booksSubjectsModifier;
}, modifyingBooksSelector, addingSubjectsSelector, removingSubjectsSelector, __WEBPACK_IMPORTED_MODULE_2__subjects_reducer__["b" /* subjectsSelector */]], function (booksSubjectsModifier, modifyingBooks, _ref5, _ref6, subjectsState) {
    var addingSubjects = _ref5.addingSubjects,
        eligibleToAdd = _ref5.eligibleToAdd;
    var removingSubjects = _ref6.removingSubjects,
        eligibleToRemove = _ref6.eligibleToRemove;
    return {
        addingSubjectIds: booksSubjectsModifier.addingSubjects,
        removingSubjectIds: booksSubjectsModifier.removingSubjects,
        settingBooksSubjects: booksSubjectsModifier.settingBooksSubjects,
        modifyingBooks: modifyingBooks,
        addingSubjects: addingSubjects,
        eligibleToAdd: eligibleToAdd,
        removingSubjects: removingSubjects,
        eligibleToRemove: eligibleToRemove,
        subjects: subjectsState.subjects,
        allSubjectsSorted: subjectsState.allSubjectsSorted,
        addingSubjectSearch: booksSubjectsModifier.addingSubjectSearch,
        removingSubjectSearch: booksSubjectsModifier.removingSubjectSearch
    };
});

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_reselect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_reselect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actionNames__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tags_reducer__ = __webpack_require__(20);
/* harmony export (immutable) */ __webpack_exports__["a"] = bookTagManagerReducer;
/* unused harmony export booksTagsModifierSelector */






var bookTagManagerInitialState = {
    singleBookModify: null,
    selectedBooksModify: false,
    addingTags: {},
    removingTags: {},
    settingBooksTags: false,
    addingTagSearch: '',
    removingTagSearch: ''
};

function bookTagManagerReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : bookTagManagerInitialState;
    var action = arguments[1];

    switch (action.type) {
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["b" /* SETTING_BOOKS_TAGS */]:
            return Object.assign({}, state, { settingBooksTags: true });
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["a" /* SET_BOOKS_TAGS */]:
            return Object.assign({}, state, { settingBooksTags: false });
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["c" /* ENABLE_TAG_MODIFICATION_FOR_SINGLE_BOOK */]:
            return Object.assign({}, state, { singleBookModify: action._id });
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["d" /* ENABLE_TAG_MODIFICATION_FOR_TOGGLED_BOOKS */]:
            return Object.assign({}, state, { selectedBooksModify: true });
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["e" /* CANCEL_BOOKS_TAG_MODIFICATION */]:
            return Object.assign({}, state, { singleBookModify: null, selectedBooksModify: false });
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["f" /* FINISHED_TAG_MODIFICATION */]:
            return Object.assign({}, state, { addingTags: {}, removingTags: {}, singleBookModify: null, selectedBooksModify: false });
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["g" /* ADDING_TAG_SEARCH_CHANGE */]:
            return Object.assign({}, state, { addingTagSearch: action.value });
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["h" /* ADDING_TAG_SET */]:
            return Object.assign({}, state, { addingTagSearch: '', addingTags: babelHelpers.extends({}, state.addingTags, babelHelpers.defineProperty({}, action._id, action.value)) });
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["i" /* REMOVING_TAG_SEARCH_CHANGE */]:
            return Object.assign({}, state, { removingTagSearch: action.value });
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["j" /* REMOVING_TAG_SET */]:
            return Object.assign({}, state, { removingTagSearch: '', removingTags: babelHelpers.extends({}, state.removingTags, babelHelpers.defineProperty({}, action._id, action.value)) });
        case __WEBPACK_IMPORTED_MODULE_1__actionNames__["k" /* RESET_TAGS */]:
            return Object.assign({}, state, { addingTags: {}, removingTags: {} });
    }
    return state;
}

var modifyingBooksSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])([function (_ref) {
    var booksModule = _ref.booksModule;
    return booksModule.booksTagsModifier.singleBookModify;
}, function (_ref2) {
    var booksModule = _ref2.booksModule;
    return booksModule.booksTagsModifier.selectedBooksModify;
}, function (_ref3) {
    var booksModule = _ref3.booksModule;
    return booksModule.books;
}], function (singleBookModify, selectedBooksModify, books) {
    var modifyingBookIds = singleBookModify ? [singleBookModify] : selectedBooksModify ? Object.keys(books.selectedBooks).filter(function (k) {
        return books.selectedBooks[k];
    }) : [];
    return modifyingBookIds.filter(function (_id) {
        return _id;
    }).map(function (_id) {
        return books.booksHash[_id];
    });
});

var addingTagsSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])([function (_ref4) {
    var booksModule = _ref4.booksModule;
    return booksModule.booksTagsModifier.addingTags;
}, function (_ref5) {
    var booksModule = _ref5.booksModule;
    return booksModule.booksTagsModifier.addingTagSearch;
}, function (_ref6) {
    var booksModule = _ref6.booksModule;
    return booksModule.tags.tagHash;
}, __WEBPACK_IMPORTED_MODULE_2__tags_reducer__["b" /* tagsSelector */]], function (adding, addingTagSearch, tags, tagsSelected) {
    return {
        addingTags: Object.keys(adding).filter(function (_id) {
            return adding[_id];
        }).map(function (_id) {
            return tags[_id];
        }),
        eligibleToAdd: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__tags_reducer__["c" /* filterTags */])(tagsSelected.allTagsSorted, addingTagSearch)
    };
});

var removingTagsSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])([function (_ref7) {
    var booksModule = _ref7.booksModule;
    return booksModule.booksTagsModifier.removingTags;
}, function (_ref8) {
    var booksModule = _ref8.booksModule;
    return booksModule.booksTagsModifier.removingTagSearch;
}, function (_ref9) {
    var booksModule = _ref9.booksModule;
    return booksModule.tags.tagHash;
}, __WEBPACK_IMPORTED_MODULE_2__tags_reducer__["b" /* tagsSelector */]], function (removing, removingTagSearch, tags, tagsSelected) {
    return {
        removingTags: Object.keys(removing).filter(function (_id) {
            return removing[_id];
        }).map(function (_id) {
            return tags[_id];
        }),
        eligibleToRemove: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__tags_reducer__["c" /* filterTags */])(tagsSelected.allTagsSorted, removingTagSearch)
    };
});

var booksTagsModifierSelector = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_reselect__["createSelector"])([function (_ref10) {
    var booksModule = _ref10.booksModule;
    return booksModule.booksTagsModifier;
}, modifyingBooksSelector, addingTagsSelector, removingTagsSelector, __WEBPACK_IMPORTED_MODULE_2__tags_reducer__["b" /* tagsSelector */]], function (booksTagsModifier, modifyingBooks, _ref11, _ref12, tagsState) {
    var addingTags = _ref11.addingTags,
        eligibleToAdd = _ref11.eligibleToAdd;
    var removingTags = _ref12.removingTags,
        eligibleToRemove = _ref12.eligibleToRemove;
    return {
        addingTagIds: booksTagsModifier.addingTags,
        removingTagIds: booksTagsModifier.removingTags,
        settingBooksTags: booksTagsModifier.settingBooksTags,
        modifyingBooks: modifyingBooks,
        addingTags: addingTags,
        eligibleToAdd: eligibleToAdd,
        removingTags: removingTags,
        eligibleToRemove: eligibleToRemove,
        tags: tagsState.tags,
        allTagsSorted: tagsState.allTagsSorted,
        addingTagSearch: booksTagsModifier.addingTagSearch,
        removingTagSearch: booksTagsModifier.removingTagSearch
    };
});

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actionNames__ = __webpack_require__(44);
/* harmony export (immutable) */ __webpack_exports__["a"] = reducer;


var initialState = {
    isEditing: false,
    editingBook: {},
    editingBookSaving: false,
    editingBookSaved: false
};

function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case __WEBPACK_IMPORTED_MODULE_0__actionNames__["b" /* EDIT_BOOK */]:
            return babelHelpers.extends({}, state, { editingBook: action.book, isEditing: true });
        case __WEBPACK_IMPORTED_MODULE_0__actionNames__["c" /* STOP_EDITING_BOOK */]:
            return babelHelpers.extends({}, state, { editingBookSaved: false, editingBookSaving: false, isEditing: false }); //leave the book object so the modal fade is a bit nicer
        case __WEBPACK_IMPORTED_MODULE_0__actionNames__["d" /* EDITING_BOOK_SAVING */]:
            return babelHelpers.extends({}, state, { editingBookSaving: true });
        case __WEBPACK_IMPORTED_MODULE_0__actionNames__["a" /* EDITING_BOOK_SAVED */]:
            return babelHelpers.extends({}, state, { editingBookSaving: false, editingBookSaved: true, isEditing: false }); //close the modal immediately
        case __WEBPACK_IMPORTED_MODULE_0__actionNames__["e" /* EDIT_BOOK_RESET */]:
            return babelHelpers.extends({}, initialState);
    }
    return state;
}

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export LOAD_COLORS */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LOAD_TAGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return LOAD_TAGS_RESULTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return EDIT_TAG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return NEW_TAG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return EDIT_TAGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return SET_NEW_TAG_VALUE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return STOP_EDITING_TAGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return CANCEL_TAG_EDIT; });
/* unused harmony export UPDATE_TAG */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return UPDATE_TAG_RESULTS; });
/* unused harmony export CLEAR_TAG_MODIFICATION_TAGS */
/* unused harmony export CANCEL_TAG_MODIFICATION */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return BEGIN_TAG_DELETE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return CANCEL_TAG_DELETE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return TAG_DELETING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return TAG_DELETED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SET_TAG_SEARCH_VALUE; });
var LOAD_COLORS = 'LOAD_COLORS_TAGS';
var LOAD_TAGS = 'LOAD_TAGS';
var LOAD_TAGS_RESULTS = 'LOAD_TAGS_RESULTS';

var EDIT_TAG = 'EDIT_TAG';
var NEW_TAG = 'NEW_TAG';
var EDIT_TAGS = 'EDIT_TAGS';
var SET_NEW_TAG_VALUE = 'SET_NEW_TAG_VALUE';
var STOP_EDITING_TAGS = 'STOP_EDITING_TAGS';
var CANCEL_TAG_EDIT = 'CANCEL_TAG_EDIT';
var UPDATE_TAG = 'UPDATE_TAG';
var UPDATE_TAG_RESULTS = 'UPDATE_TAG_RESULTS';
var CLEAR_TAG_MODIFICATION_TAGS = 'CLEAR_TAG_MODIFICATION_TAGS';
var CANCEL_TAG_MODIFICATION = 'CANCEL_TAG_MODIFICATION';
var BEGIN_TAG_DELETE = 'BEGIN_TAG_DELETE';
var CANCEL_TAG_DELETE = 'CANCEL_TAG_DELETE';
var TAG_DELETING = 'TAG_DELETING';
var TAG_DELETED = 'TAG_DELETED';
var SET_TAG_SEARCH_VALUE = 'SET_TAG_SEARCH_VALUE';

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _createStore = __webpack_require__(46);

var _createStore2 = _interopRequireDefault(_createStore);

var _utilsCombineReducers = __webpack_require__(60);

var _utilsCombineReducers2 = _interopRequireDefault(_utilsCombineReducers);

var _utilsBindActionCreators = __webpack_require__(59);

var _utilsBindActionCreators2 = _interopRequireDefault(_utilsBindActionCreators);

var _utilsApplyMiddleware = __webpack_require__(58);

var _utilsApplyMiddleware2 = _interopRequireDefault(_utilsApplyMiddleware);

var _utilsCompose = __webpack_require__(47);

var _utilsCompose2 = _interopRequireDefault(_utilsCompose);

exports.createStore = _createStore2['default'];
exports.combineReducers = _utilsCombineReducers2['default'];
exports.bindActionCreators = _utilsBindActionCreators2['default'];
exports.applyMiddleware = _utilsApplyMiddleware2['default'];
exports.compose = _utilsCompose2['default'];

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = applyMiddleware;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _compose = __webpack_require__(47);

var _compose2 = _interopRequireDefault(_compose);

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */

function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (next) {
    return function (reducer, initialState) {
      var store = next(reducer, initialState);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = _compose2['default'].apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

module.exports = exports['default'];

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports['default'] = bindActionCreators;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsMapValues = __webpack_require__(49);

var _utilsMapValues2 = _interopRequireDefault(_utilsMapValues);

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */

function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null || actionCreators === undefined) {
    // eslint-disable-line no-eq-null
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  return _utilsMapValues2['default'](actionCreators, function (actionCreator) {
    return bindActionCreator(actionCreator, dispatch);
  });
}

module.exports = exports['default'];

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

exports.__esModule = true;
exports['default'] = combineReducers;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _createStore = __webpack_require__(46);

var _utilsIsPlainObject = __webpack_require__(48);

var _utilsIsPlainObject2 = _interopRequireDefault(_utilsIsPlainObject);

var _utilsMapValues = __webpack_require__(49);

var _utilsMapValues2 = _interopRequireDefault(_utilsMapValues);

var _utilsPick = __webpack_require__(61);

var _utilsPick2 = _interopRequireDefault(_utilsPick);

/* eslint-disable no-console */

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Reducer "' + key + '" returned undefined handling ' + actionName + '. ' + 'To ignore an action, you must explicitly return the previous state.';
}

function getUnexpectedStateKeyWarningMessage(inputState, outputState, action) {
  var reducerKeys = Object.keys(outputState);
  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'initialState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!_utilsIsPlainObject2['default'](inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + ({}).toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return reducerKeys.indexOf(key) < 0;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerSanity(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */

function combineReducers(reducers) {
  var finalReducers = _utilsPick2['default'](reducers, function (val) {
    return typeof val === 'function';
  });
  var sanityError;

  try {
    assertReducerSanity(finalReducers);
  } catch (e) {
    sanityError = e;
  }

  var defaultState = _utilsMapValues2['default'](finalReducers, function () {
    return undefined;
  });

  return function combination(state, action) {
    if (state === undefined) state = defaultState;

    if (sanityError) {
      throw sanityError;
    }

    var hasChanged = false;
    var finalState = _utilsMapValues2['default'](finalReducers, function (reducer, key) {
      var previousStateForKey = state[key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(key, action);
        throw new Error(errorMessage);
      }
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
      return nextStateForKey;
    });

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateKeyWarningMessage(state, finalState, action);
      if (warningMessage) {
        console.error(warningMessage);
      }
    }

    return hasChanged ? finalState : state;
  };
}

module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Picks key-value pairs from an object where values satisfy a predicate.
 *
 * @param {Object} obj The object to pick from.
 * @param {Function} fn The predicate the values must satisfy to be copied.
 * @returns {Object} The object with the values that satisfied the predicate.
 */


exports.__esModule = true;
exports["default"] = pick;

function pick(obj, fn) {
  return Object.keys(obj).reduce(function (result, key) {
    if (fn(obj[key])) {
      result[key] = obj[key];
    }
    return result;
  }, {});
}

module.exports = exports["default"];

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__code_reducer__ = __webpack_require__(50);




/***/ })
/******/ ]);