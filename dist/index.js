/*! require("source-map-support").install(); */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("bluebird"), require("fs"), require("child_process"), require("crypto"), require("os"), require("path"), require("regenerator-runtime"));
	else if(typeof define === 'function' && define.amd)
		define(["bluebird", "fs", "child_process", "crypto", "os", "path", "regenerator-runtime"], factory);
	else if(typeof exports === 'object')
		exports["electron-sudo"] = factory(require("bluebird"), require("fs"), require("child_process"), require("crypto"), require("os"), require("path"), require("regenerator-runtime"));
	else
		root["electron-sudo"] = factory(root["bluebird"], root["fs"], root["child_process"], root["crypto"], root["os"], root["path"], root["regenerator-runtime"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_63__, __WEBPACK_EXTERNAL_MODULE_64__, __WEBPACK_EXTERNAL_MODULE_127__, __WEBPACK_EXTERNAL_MODULE_128__, __WEBPACK_EXTERNAL_MODULE_129__, __WEBPACK_EXTERNAL_MODULE_130__, __WEBPACK_EXTERNAL_MODULE_131__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./dist";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(65);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	var core = module.exports = { version: '2.6.12' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 2 */
/***/ (function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	var store = __webpack_require__(33)('wks');
	var uid = __webpack_require__(23);
	var Symbol = __webpack_require__(2).Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(2);
	var core = __webpack_require__(1);
	var ctx = __webpack_require__(11);
	var hide = __webpack_require__(10);
	var has = __webpack_require__(9);
	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && has(exports, key)) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	module.exports = $export;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(8);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(12)(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(5);
	var IE8_DOM_DEFINE = __webpack_require__(47);
	var toPrimitive = __webpack_require__(36);
	var dP = Object.defineProperty;

	exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

	module.exports = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(7);
	var createDesc = __webpack_require__(17);
	module.exports = __webpack_require__(6) ? function (object, key, value) {
	  return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(19);
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(48);
	var defined = __webpack_require__(26);
	module.exports = function (it) {
	  return IObject(defined(it));
	};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

	var toString = {}.toString;

	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

	module.exports = {};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

	module.exports = true;


/***/ }),
/* 17 */
/***/ (function(module, exports) {

	module.exports = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(26);
	module.exports = function (it) {
	  return Object(defined(it));
	};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys = __webpack_require__(56);
	var enumBugKeys = __webpack_require__(28);

	module.exports = Object.keys || function keys(O) {
	  return $keys(O, enumBugKeys);
	};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

	exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	var def = __webpack_require__(7).f;
	var has = __webpack_require__(9);
	var TAG = __webpack_require__(3)('toStringTag');

	module.exports = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

	var id = 0;
	var px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var $at = __webpack_require__(110)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(51)(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(75);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(74);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ }),
/* 26 */
/***/ (function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(8);
	var document = __webpack_require__(2).document;
	// typeof document.createElement is 'object' in old IE
	var is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// 25.4.1.5 NewPromiseCapability(C)
	var aFunction = __webpack_require__(19);

	function PromiseCapability(C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject = aFunction(reject);
	}

	module.exports.f = function (C) {
	  return new PromiseCapability(C);
	};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject = __webpack_require__(5);
	var dPs = __webpack_require__(104);
	var enumBugKeys = __webpack_require__(28);
	var IE_PROTO = __webpack_require__(32)('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(27)('iframe');
	  var i = enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(46).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(33)('keys');
	var uid = __webpack_require__(23);
	module.exports = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	var core = __webpack_require__(1);
	var global = __webpack_require__(2);
	var SHARED = '__core-js_shared__';
	var store = global[SHARED] || (global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: core.version,
	  mode: __webpack_require__(16) ? 'pure' : 'global',
	  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
	});


/***/ }),
/* 34 */
/***/ (function(module, exports) {

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	module.exports = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(34);
	var min = Math.min;
	module.exports = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(8);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(2);
	var core = __webpack_require__(1);
	var LIBRARY = __webpack_require__(16);
	var wksExt = __webpack_require__(38);
	var defineProperty = __webpack_require__(7).f;
	module.exports = function (name) {
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
	};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(3);


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	var classof = __webpack_require__(45);
	var ITERATOR = __webpack_require__(3)('iterator');
	var Iterators = __webpack_require__(15);
	module.exports = __webpack_require__(1).getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(115);
	var global = __webpack_require__(2);
	var hide = __webpack_require__(10);
	var Iterators = __webpack_require__(15);
	var TO_STRING_TAG = __webpack_require__(3)('toStringTag');

	var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
	  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
	  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
	  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
	  'TextTrackList,TouchList').split(',');

	for (var i = 0; i < DOMIterables.length; i++) {
	  var NAME = DOMIterables[i];
	  var Collection = global[NAME];
	  var proto = Collection && Collection.prototype;
	  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(83), __esModule: true };

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(88), __esModule: true };

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _from = __webpack_require__(68);

	var _from2 = _interopRequireDefault(_from);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }

	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
	};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(131);


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(14);
	var TAG = __webpack_require__(3)('toStringTag');
	// ES3 wrong here
	var ARG = cof(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	module.exports = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	var document = __webpack_require__(2).document;
	module.exports = document && document.documentElement;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(6) && !__webpack_require__(12)(function () {
	  return Object.defineProperty(__webpack_require__(27)('div'), 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(14);
	// eslint-disable-next-line no-prototype-builtins
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators = __webpack_require__(15);
	var ITERATOR = __webpack_require__(3)('iterator');
	var ArrayProto = Array.prototype;

	module.exports = function (it) {
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(5);
	module.exports = function (iterator, fn, value, entries) {
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) anObject(ret.call(iterator));
	    throw e;
	  }
	};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY = __webpack_require__(16);
	var $export = __webpack_require__(4);
	var redefine = __webpack_require__(59);
	var hide = __webpack_require__(10);
	var Iterators = __webpack_require__(15);
	var $iterCreate = __webpack_require__(99);
	var setToStringTag = __webpack_require__(22);
	var getPrototypeOf = __webpack_require__(55);
	var ITERATOR = __webpack_require__(3)('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	var ITERATOR = __webpack_require__(3)('iterator');
	var SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function () { SAFE_CLOSING = true; };
	  // eslint-disable-next-line no-throw-literal
	  Array.from(riter, function () { throw 2; });
	} catch (e) { /* empty */ }

	module.exports = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7];
	    var iter = arr[ITERATOR]();
	    iter.next = function () { return { done: safe = true }; };
	    arr[ITERATOR] = function () { return iter; };
	    exec(arr);
	  } catch (e) { /* empty */ }
	  return safe;
	};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	var pIE = __webpack_require__(21);
	var createDesc = __webpack_require__(17);
	var toIObject = __webpack_require__(13);
	var toPrimitive = __webpack_require__(36);
	var has = __webpack_require__(9);
	var IE8_DOM_DEFINE = __webpack_require__(47);
	var gOPD = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if (IE8_DOM_DEFINE) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
	};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys = __webpack_require__(56);
	var hiddenKeys = __webpack_require__(28).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return $keys(O, hiddenKeys);
	};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has = __webpack_require__(9);
	var toObject = __webpack_require__(18);
	var IE_PROTO = __webpack_require__(32)('IE_PROTO');
	var ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	var has = __webpack_require__(9);
	var toIObject = __webpack_require__(13);
	var arrayIndexOf = __webpack_require__(93)(false);
	var IE_PROTO = __webpack_require__(32)('IE_PROTO');

	module.exports = function (object, names) {
	  var O = toIObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};


/***/ }),
/* 57 */
/***/ (function(module, exports) {

	module.exports = function (exec) {
	  try {
	    return { e: false, v: exec() };
	  } catch (e) {
	    return { e: true, v: e };
	  }
	};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(5);
	var isObject = __webpack_require__(8);
	var newPromiseCapability = __webpack_require__(29);

	module.exports = function (C, x) {
	  anObject(C);
	  if (isObject(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(10);


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject = __webpack_require__(5);
	var aFunction = __webpack_require__(19);
	var SPECIES = __webpack_require__(3)('species');
	module.exports = function (O, D) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	var ctx = __webpack_require__(11);
	var invoke = __webpack_require__(97);
	var html = __webpack_require__(46);
	var cel = __webpack_require__(27);
	var global = __webpack_require__(2);
	var process = global.process;
	var setTask = global.setImmediate;
	var clearTask = global.clearImmediate;
	var MessageChannel = global.MessageChannel;
	var Dispatch = global.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;
	var run = function () {
	  var id = +this;
	  // eslint-disable-next-line no-prototype-builtins
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function (event) {
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!setTask || !clearTask) {
	  setTask = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (__webpack_require__(14)(process) == 'process') {
	    defer = function (id) {
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if (MessageChannel) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
	    defer = function (id) {
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in cel('script')) {
	    defer = function (id) {
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set: setTask,
	  clear: clearTask
	};


/***/ }),
/* 62 */
/***/ (function(module, exports) {

	

/***/ }),
/* 63 */
/***/ (function(module, exports) {

	module.exports = require("bluebird");

/***/ }),
/* 64 */
/***/ (function(module, exports) {

	module.exports = require("fs");

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _sudoer=__webpack_require__(66);exports.default=function(){var _process=process,platform=_process.platform;switch(platform){case'darwin':return _sudoer.SudoerDarwin;case'win32':return _sudoer.SudoerWin32;case'linux':return _sudoer.SudoerLinux;default:throw new Error('Unsupported platform: '+platform);}}();

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.SudoerWin32=exports.SudoerLinux=exports.SudoerDarwin=undefined;var _assign=__webpack_require__(41);var _assign2=_interopRequireDefault(_assign);var _getIterator2=__webpack_require__(69);var _getIterator3=_interopRequireDefault(_getIterator2);var _toConsumableArray2=__webpack_require__(43);var _toConsumableArray3=_interopRequireDefault(_toConsumableArray2);var _regenerator=__webpack_require__(44);var _regenerator2=_interopRequireDefault(_regenerator);var _promise=__webpack_require__(42);var _promise2=_interopRequireDefault(_promise);var _bluebird=__webpack_require__(63);var _getPrototypeOf=__webpack_require__(72);var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _possibleConstructorReturn2=__webpack_require__(80);var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=__webpack_require__(79);var _inherits3=_interopRequireDefault(_inherits2);var _typeof2=__webpack_require__(25);var _typeof3=_interopRequireDefault(_typeof2);var _classCallCheck2=__webpack_require__(76);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(77);var _createClass3=_interopRequireDefault(_createClass2);var _os=__webpack_require__(129);var _fs=__webpack_require__(64);var _path=__webpack_require__(130);var _crypto=__webpack_require__(128);var _utils=__webpack_require__(67);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var _process=process,platform=_process.platform,env=_process.env;var Sudoer=function(){function Sudoer(options){(0,_classCallCheck3.default)(this,Sudoer);this.platform=platform;this.options=options;this.cp=null;this.tmpdir=(0,_os.tmpdir)();}(0,_createClass3.default)(Sudoer,[{key:'hash',value:function hash(buffer){var hash=(0,_crypto.createHash)('sha256');hash.update('electron-sudo');hash.update(this.options.name||'');hash.update(buffer||new Buffer(0));return hash.digest('hex').slice(-32);}},{key:'joinEnv',value:function joinEnv(options){var env=options.env,spreaded=[];if(env&&(typeof env==='undefined'?'undefined':(0,_typeof3.default)(env))=='object'){for(var key in env){spreaded.push(key.concat('=',env[key]));}}return spreaded;}},{key:'escapeDoubleQuotes',value:function escapeDoubleQuotes(string){return string.replace(/"/g,'\\"');}},{key:'encloseDoubleQuotes',value:function encloseDoubleQuotes(string){return string.replace(/(.+)/g,'"$1"');}},{key:'kill',value:function kill(pid){if(!pid){return;}else{return;}}}]);return Sudoer;}();var SudoerUnix=function(_Sudoer){(0,_inherits3.default)(SudoerUnix,_Sudoer);function SudoerUnix(){var options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};(0,_classCallCheck3.default)(this,SudoerUnix);var _this=(0,_possibleConstructorReturn3.default)(this,(SudoerUnix.__proto__||(0,_getPrototypeOf2.default)(SudoerUnix)).call(this,options));if(!_this.options.name){_this.options.name='Electron';}return _this;}(0,_createClass3.default)(SudoerUnix,[{key:'copy',value:function(){var _ref=(0,_bluebird.coroutine)(/*#__PURE__*/_regenerator2.default.mark(function _callee2(source,target){var _this2=this;return _regenerator2.default.wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:return _context2.abrupt('return',new _promise2.default(function(){var _ref2=(0,_bluebird.coroutine)(/*#__PURE__*/_regenerator2.default.mark(function _callee(resolve,reject){var result;return _regenerator2.default.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:source=_this2.escapeDoubleQuotes((0,_path.normalize)(source));target=_this2.escapeDoubleQuotes((0,_path.normalize)(target));_context.prev=2;_context.next=5;return(0,_utils.exec)('/bin/cp -R -p "'+source+'" "'+target+'"');case 5:result=_context.sent;resolve(result);_context.next=12;break;case 9:_context.prev=9;_context.t0=_context['catch'](2);reject(_context.t0);case 12:case'end':return _context.stop();}}},_callee,_this2,[[2,9]]);}));return function(_x4,_x5){return _ref2.apply(this,arguments);};}()));case 1:case'end':return _context2.stop();}}},_callee2,this);}));function copy(_x2,_x3){return _ref.apply(this,arguments);}return copy;}()},{key:'remove',value:function(){var _ref3=(0,_bluebird.coroutine)(/*#__PURE__*/_regenerator2.default.mark(function _callee4(target){var _this3=this;var self;return _regenerator2.default.wrap(function _callee4$(_context4){while(1){switch(_context4.prev=_context4.next){case 0:self=this;return _context4.abrupt('return',new _promise2.default(function(){var _ref4=(0,_bluebird.coroutine)(/*#__PURE__*/_regenerator2.default.mark(function _callee3(resolve,reject){var result;return _regenerator2.default.wrap(function _callee3$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:if(target.startsWith(self.tmpdir)){_context3.next=2;break;}throw new Error('Try to remove suspicious target: '+target+'.');case 2:target=_this3.escapeDoubleQuotes((0,_path.normalize)(target));_context3.prev=3;_context3.next=6;return(0,_utils.exec)('rm -rf "'+target+'"');case 6:result=_context3.sent;resolve(result);_context3.next=13;break;case 10:_context3.prev=10;_context3.t0=_context3['catch'](3);reject(_context3.t0);case 13:case'end':return _context3.stop();}}},_callee3,_this3,[[3,10]]);}));return function(_x7,_x8){return _ref4.apply(this,arguments);};}()));case 2:case'end':return _context4.stop();}}},_callee4,this);}));function remove(_x6){return _ref3.apply(this,arguments);}return remove;}()},{key:'reset',value:function(){var _ref5=(0,_bluebird.coroutine)(/*#__PURE__*/_regenerator2.default.mark(function _callee5(){return _regenerator2.default.wrap(function _callee5$(_context5){while(1){switch(_context5.prev=_context5.next){case 0:_context5.next=2;return(0,_utils.exec)('/usr/bin/sudo -k');case 2:case'end':return _context5.stop();}}},_callee5,this);}));function reset(){return _ref5.apply(this,arguments);}return reset;}()}]);return SudoerUnix;}(Sudoer);var SudoerDarwin=function(_SudoerUnix){(0,_inherits3.default)(SudoerDarwin,_SudoerUnix);function SudoerDarwin(){var options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};(0,_classCallCheck3.default)(this,SudoerDarwin);var _this4=(0,_possibleConstructorReturn3.default)(this,(SudoerDarwin.__proto__||(0,_getPrototypeOf2.default)(SudoerDarwin)).call(this,options));if(options.icns&&typeof options.icns!=='string'){throw new Error('options.icns must be a string if provided.');}else if(options.icns&&options.icns.trim().length===0){throw new Error('options.icns must be a non-empty string if provided.');}_this4.up=false;return _this4;}(0,_createClass3.default)(SudoerDarwin,[{key:'isValidName',value:function isValidName(name){return /^[a-z0-9 ]+$/i.test(name)&&name.trim().length>0&&name.length<70;}},{key:'joinEnv',value:function joinEnv(options){var env=options.env,spreaded=[];if(env&&(typeof env==='undefined'?'undefined':(0,_typeof3.default)(env))=='object'){for(var key in env){spreaded.push(key.concat('=',env[key]));}}return spreaded;}},{key:'exec',value:function(){var _ref6=(0,_bluebird.coroutine)(/*#__PURE__*/_regenerator2.default.mark(function _callee7(command){var _this5=this;var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};return _regenerator2.default.wrap(function _callee7$(_context7){while(1){switch(_context7.prev=_context7.next){case 0:return _context7.abrupt('return',new _promise2.default(function(){var _ref7=(0,_bluebird.coroutine)(/*#__PURE__*/_regenerator2.default.mark(function _callee6(resolve,reject){var self,env,sudoCommand,result;return _regenerator2.default.wrap(function _callee6$(_context6){while(1){switch(_context6.prev=_context6.next){case 0:self=_this5,env=self.joinEnv(options),sudoCommand=['/usr/bin/sudo -n',env.join(' '),'-s',command].join(' '),result=void 0;_context6.next=3;return self.reset();case 3:_context6.prev=3;_context6.next=6;return(0,_utils.exec)(sudoCommand,options);case 6:result=_context6.sent;resolve(result);_context6.next=24;break;case 10:_context6.prev=10;_context6.t0=_context6['catch'](3);_context6.prev=12;_context6.next=15;return self.prompt();case 15:_context6.next=17;return(0,_utils.exec)(sudoCommand,options);case 17:result=_context6.sent;resolve(result);_context6.next=24;break;case 21:_context6.prev=21;_context6.t1=_context6['catch'](12);reject(_context6.t1);case 24:case'end':return _context6.stop();}}},_callee6,_this5,[[3,10],[12,21]]);}));return function(_x12,_x13){return _ref7.apply(this,arguments);};}()));case 1:case'end':return _context7.stop();}}},_callee7,this);}));function exec(_x10){return _ref6.apply(this,arguments);}return exec;}()},{key:'spawn',value:function(){var _ref8=(0,_bluebird.coroutine)(/*#__PURE__*/_regenerator2.default.mark(function _callee10(command,args){var _this6=this;var options=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{};return _regenerator2.default.wrap(function _callee10$(_context10){while(1){switch(_context10.prev=_context10.next){case 0:return _context10.abrupt('return',new _promise2.default(function(){var _ref9=(0,_bluebird.coroutine)(/*#__PURE__*/_regenerator2.default.mark(function _callee9(resolve,reject){var self,bin,cp;return _regenerator2.default.wrap(function _callee9$(_context9){while(1){switch(_context9.prev=_context9.next){case 0:self=_this6,bin='/usr/bin/sudo',cp=void 0;_context9.next=3;return self.reset();case 3:_context9.next=5;return self.prompt();case 5:cp=(0,_utils.spawn)(bin,['-n','-s','-E',[command].concat((0,_toConsumableArray3.default)(args)).join(' ')],options);cp.on('error',function(){var _ref10=(0,_bluebird.coroutine)(/*#__PURE__*/_regenerator2.default.mark(function _callee8(err){return _regenerator2.default.wrap(function _callee8$(_context8){while(1){switch(_context8.prev=_context8.next){case 0:reject(err);case 1:case'end':return _context8.stop();}}},_callee8,_this6);}));return function(_x19){return _ref10.apply(this,arguments);};}());self.cp=cp;resolve(cp);case 9:case'end':return _context9.stop();}}},_callee9,_this6);}));return function(_x17,_x18){return _ref9.apply(this,arguments);};}()));case 1:case'end':return _context10.stop();}}},_callee10,this);}));function spawn(_x14,_x15){return _ref8.apply(this,arguments);}return spawn;}()},{key:'prompt',value:function(){var _ref11=(0,_bluebird.coroutine)(/*#__PURE__*/_regenerator2.default.mark(function _callee12(){var _this7=this;var self;return _regenerator2.default.wrap(function _callee12$(_context12){while(1){switch(_context12.prev=_context12.next){case 0:self=this;return _context12.abrupt('return',new _promise2.default(function(){var _ref12=(0,_bluebird.coroutine)(/*#__PURE__*/_regenerator2.default.mark(function _callee11(resolve,reject){var icon,hash,source,target;return _regenerator2.default.wrap(function _callee11$(_context11){while(1){switch(_context11.prev=_context11.next){case 0:if(self.tmpdir){_context11.next=2;break;}return _context11.abrupt('return',reject(new Error('Requires os.tmpdir() to be defined.')));case 2:if(env.USER){_context11.next=4;break;}return _context11.abrupt('return',reject(new Error('Requires env[\'USER\'] to be defined.')));case 4:// Keep prompt in single instance
	self.up=true;// Read ICNS-icon and hash it
	_context11.next=7;return self.readIcns();case 7:icon=_context11.sent;hash=self.hash(icon);// Copy applet to temporary directory
	source=(0,_path.join)((0,_path.dirname)(__filename)+'/bin','applet.app'),target=(0,_path.join)(self.tmpdir,hash,self.options.name+'.app');_context11.prev=10;_context11.next=13;return(0,_utils.mkdir)((0,_path.dirname)(target));case 13:_context11.next=19;break;case 15:_context11.prev=15;_context11.t0=_context11['catch'](10);if(!(_context11.t0.code!=='EEXIST')){_context11.next=19;break;}return _context11.abrupt('return',reject(_context11.t0));case 19:_context11.prev=19;_context11.next=22;return self.copy(source,target);case 22:_context11.next=24;return self.icon(target);case 24:_context11.next=26;return self.propertyList(target);case 26:_context11.next=28;return self.open(target);case 28:_context11.next=30;return self.remove(target);case 30:_context11.next=35;break;case 32:_context11.prev=32;_context11.t1=_context11['catch'](19);return _context11.abrupt('return',reject(_context11.t1));case 35:return _context11.abrupt('return',resolve(hash));case 36:case'end':return _context11.stop();}}},_callee11,_this7,[[10,15],[19,32]]);}));return function(_x20,_x21){return _ref12.apply(this,arguments);};}()));case 2:case'end':return _context12.stop();}}},_callee12,this);}));function prompt(){return _ref11.apply(this,arguments);}return prompt;}()},{key:'icon',value:function(){var _ref13=(0,_bluebird.coroutine)(/*#__PURE__*/_regenerator2.default.mark(function _callee14(target){var _this8=this;var self;return _regenerator2.default.wrap(function _callee14$(_context14){while(1){switch(_context14.prev=_context14.next){case 0:self=this;return _context14.abrupt('return',new _promise2.default(function(){var _ref14=(0,_bluebird.coroutine)(/*#__PURE__*/_regenerator2.default.mark(function _callee13(resolve,reject){var result;return _regenerator2.default.wrap(function _callee13$(_context13){while(1){switch(_context13.prev=_context13.next){case 0:if(_this8.options.icns){_context13.next=2;break;}return _context13.abrupt('return',resolve());case 2:_context13.next=4;return self.copy(_this8.options.icns,(0,_path.join)(target,'Contents','Resources','applet.icns'));case 4:result=_context13.sent;return _context13.abrupt('return',resolve(result));case 6:case'end':return _context13.stop();}}},_callee13,_this8);}));return function(_x23,_x24){return _ref14.apply(this,arguments);};}()));case 2:case'end':return _context14.stop();}}},_callee14,this);}));function icon(_x22){return _ref13.apply(this,arguments);}return icon;}()},{key:'open',value:function(){var _ref15=(0,_bluebird.coroutine)(/*#__PURE__*/_regenerator2.default.mark(function _callee16(target){var _this9=this;var self;return _regenerator2.default.wrap(function _callee16$(_context16){while(1){switch(_context16.prev=_context16.next){case 0:self=this;return _context16.abrupt('return',new _promise2.default(function(){var _ref16=(0,_bluebird.coroutine)(/*#__PURE__*/_regenerator2.default.mark(function _callee15(resolve,reject){var result;return _regenerator2.default.wrap(function _callee15$(_context15){while(1){switch(_context15.prev=_context15.next){case 0:target=self.escapeDoubleQuotes((0,_path.normalize)(target));_context15.prev=1;_context15.next=4;return(0,_utils.exec)('open -n -W "'+target+'"');case 4:result=_context15.sent;return _context15.abrupt('return',resolve(result));case 8:_context15.prev=8;_context15.t0=_context15['catch'](1);return _context15.abrupt('return',reject(_context15.t0));case 11:case'end':return _context15.stop();}}},_callee15,_this9,[[1,8]]);}));return function(_x26,_x27){return _ref16.apply(this,arguments);};}()));case 2:case'end':return _context16.stop();}}},_callee16,this);}));function open(_x25){return _ref15.apply(this,arguments);}return open;}()},{key:'readIcns',value:function(){var _ref17=(0,_bluebird.coroutine)(/*#__PURE__*/_regenerator2.default.mark(function _callee18(icnsPath){var _this10=this;return _regenerator2.default.wrap(function _callee18$(_context18){while(1){switch(_context18.prev=_context18.next){case 0:return _context18.abrupt('return',new _promise2.default(function(){var _ref18=(0,_bluebird.coroutine)(/*#__PURE__*/_regenerator2.default.mark(function _callee17(resolve,reject){var data;return _regenerator2.default.wrap(function _callee17$(_context17){while(1){switch(_context17.prev=_context17.next){case 0:if(!(!icnsPath||platform!=='darwin')){_context17.next=2;break;}return _context17.abrupt('return',resolve(new Buffer(0)));case 2:_context17.prev=2;_context17.next=5;return(0,_utils.readFile)(icnsPath);case 5:data=_context17.sent;return _context17.abrupt('return',resolve(data));case 9:_context17.prev=9;_context17.t0=_context17['catch'](2);return _context17.abrupt('return',reject(_context17.t0));case 12:case'end':return _context17.stop();}}},_callee17,_this10,[[2,9]]);}));return function(_x29,_x30){return _ref18.apply(this,arguments);};}()));case 1:case'end':return _context18.stop();}}},_callee18,this);}));function readIcns(_x28){return _ref17.apply(this,arguments);}return readIcns;}()},{key:'propertyList',value:function(){var _ref19=(0,_bluebird.coroutine)(/*#__PURE__*/_regenerator2.default.mark(function _callee20(target){var _this11=this;var self;return _regenerator2.default.wrap(function _callee20$(_context20){while(1){switch(_context20.prev=_context20.next){case 0:self=this;return _context20.abrupt('return',new _promise2.default(function(){var _ref20=(0,_bluebird.coroutine)(/*#__PURE__*/_regenerator2.default.mark(function _callee19(resolve,reject){var path,key,value,result;return _regenerator2.default.wrap(function _callee19$(_context19){while(1){switch(_context19.prev=_context19.next){case 0:path=self.escapeDoubleQuotes((0,_path.join)(target,'Contents','Info.plist')),key=self.escapeDoubleQuotes('CFBundleName'),value=self.options.name+' Password Prompt';if(!/'/.test(value)){_context19.next=3;break;}return _context19.abrupt('return',reject(new Error('Value should not contain single quotes.')));case 3:_context19.next=5;return(0,_utils.exec)('defaults write "'+path+'" "'+key+'" \''+value+'\'');case 5:result=_context19.sent;return _context19.abrupt('return',resolve(result));case 7:case'end':return _context19.stop();}}},_callee19,_this11);}));return function(_x32,_x33){return _ref20.apply(this,arguments);};}()));case 2:case'end':return _context20.stop();}}},_callee20,this);}));function propertyList(_x31){return _ref19.apply(this,arguments);}return propertyList;}()}]);return SudoerDarwin;}(SudoerUnix);var SudoerLinux=function(_SudoerUnix2){(0,_inherits3.default)(SudoerLinux,_SudoerUnix2);function SudoerLinux(){var options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};(0,_classCallCheck3.default)(this,SudoerLinux);var _this12=(0,_possibleConstructorReturn3.default)(this,(SudoerLinux.__proto__||(0,_getPrototypeOf2.default)(SudoerLinux)).call(this,options));_this12.binary=null;// We prefer gksudo over pkexec since it gives a nicer prompt:
	_this12.paths=['/usr/bin/gksudo','/usr/bin/pkexec','./bin/gksudo'];return _this12;}(0,_createClass3.default)(SudoerLinux,[{key:'getBinary',value:function(){var _ref21=(0,_bluebird.coroutine)(/*#__PURE__*/_regenerator2.default.mark(function _callee21(){var _iteratorNormalCompletion,_didIteratorError,_iteratorError,_iterator,_step,path;return _regenerator2.default.wrap(function _callee21$(_context21){while(1){switch(_context21.prev=_context21.next){case 0:_iteratorNormalCompletion=true;_didIteratorError=false;_iteratorError=undefined;_context21.prev=3;_iterator=(0,_getIterator3.default)(this.paths);case 5:if(_iteratorNormalCompletion=(_step=_iterator.next()).done){_context21.next=14;break;}path=_step.value;_context21.next=9;return(0,_utils.access)(path);case 9:if(!_context21.sent){_context21.next=11;break;}return _context21.abrupt('return',path);case 11:_iteratorNormalCompletion=true;_context21.next=5;break;case 14:_context21.next=20;break;case 16:_context21.prev=16;_context21.t0=_context21['catch'](3);_didIteratorError=true;_iteratorError=_context21.t0;case 20:_context21.prev=20;_context21.prev=21;if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return();}case 23:_context21.prev=23;if(!_didIteratorError){_context21.next=26;break;}throw _iteratorError;case 26:return _context21.finish(23);case 27:return _context21.finish(20);case 28:return _context21.abrupt('return',null);case 29:case'end':return _context21.stop();}}},_callee21,this,[[3,16,20,28],[21,,23,27]]);}));function getBinary(){return _ref21.apply(this,arguments);}return getBinary;}()},{key:'exec',value:function(){var _ref22=(0,_bluebird.coroutine)(/*#__PURE__*/_regenerator2.default.mark(function _callee23(command){var _this13=this;var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};return _regenerator2.default.wrap(function _callee23$(_context23){while(1){switch(_context23.prev=_context23.next){case 0:return _context23.abrupt('return',new _promise2.default(function(){var _ref23=(0,_bluebird.coroutine)(/*#__PURE__*/_regenerator2.default.mark(function _callee22(resolve,reject){var self,result,flags;return _regenerator2.default.wrap(function _callee22$(_context22){while(1){switch(_context22.prev=_context22.next){case 0:self=_this13,result=void 0;/* Detect utility for sudo mode */if(self.binary){_context22.next=5;break;}_context22.next=4;return self.getBinary();case 4:self.binary=_context22.sent;case 5:if(options.env instanceof Object&&!options.env.DISPLAY){// Force DISPLAY variable with default value which is required for UI dialog
	options.env=(0,_assign2.default)(options.env,{DISPLAY:':0'});}flags=void 0;if(/gksudo/i.test(self.binary)){flags='--preserve-env --sudo-mode '+('--description="'+self.escapeDoubleQuotes(self.options.name)+'"');}else if(/pkexec/i.test(self.binary)){flags='--disable-internal-agent';}command=_this13.binary+' '+flags+' '+command;_context22.prev=9;_context22.next=12;return(0,_utils.exec)(command,options);case 12:result=_context22.sent;return _context22.abrupt('return',resolve(result));case 16:_context22.prev=16;_context22.t0=_context22['catch'](9);return _context22.abrupt('return',reject(_context22.t0));case 19:case'end':return _context22.stop();}}},_callee22,_this13,[[9,16]]);}));return function(_x37,_x38){return _ref23.apply(this,arguments);};}()));case 1:case'end':return _context23.stop();}}},_callee23,this);}));function exec(_x35){return _ref22.apply(this,arguments);}return exec;}()},{key:'spawn',value:function(){var _ref24=(0,_bluebird.coroutine)(/*#__PURE__*/_regenerator2.default.mark(function _callee25(command,args){var _this14=this;var options=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{};var self;return _regenerator2.default.wrap(function _callee25$(_context25){while(1){switch(_context25.prev=_context25.next){case 0:self=this;return _context25.abrupt('return',new _promise2.default(function(){var _ref25=(0,_bluebird.coroutine)(/*#__PURE__*/_regenerator2.default.mark(function _callee24(resolve,reject){var sudoArgs,cp;return _regenerator2.default.wrap(function _callee24$(_context24){while(1){switch(_context24.prev=_context24.next){case 0:if(self.binary){_context24.next=4;break;}_context24.next=3;return self.getBinary();case 3:self.binary=_context24.sent;case 4:if(options.env instanceof Object&&!options.env.DISPLAY){// Force DISPLAY variable with default value which is required for UI dialog
	options.env=(0,_assign2.default)(options.env,{DISPLAY:':0'});}// In order to guarantee succees execution we'll use execFile
	// due to fallback binary bundled in package
	sudoArgs=[];if(/gksudo/i.test(self.binary)){sudoArgs.push('--preserve-env');sudoArgs.push('--sudo-mode');sudoArgs.push('--description="'+self.escapeDoubleQuotes(self.options.name)+'"');sudoArgs.push('--sudo-mode');}else if(/pkexec/i.test(self.binary)){sudoArgs.push('--disable-internal-agent');}sudoArgs.push(command);sudoArgs.push(args);_context24.prev=9;cp=(0,_utils.spawn)(self.binary,sudoArgs,options);return _context24.abrupt('return',resolve(cp));case 14:_context24.prev=14;_context24.t0=_context24['catch'](9);return _context24.abrupt('return',reject(_context24.t0));case 17:case'end':return _context24.stop();}}},_callee24,_this14,[[9,14]]);}));return function(_x42,_x43){return _ref25.apply(this,arguments);};}()));case 2:case'end':return _context25.stop();}}},_callee25,this);}));function spawn(_x39,_x40){return _ref24.apply(this,arguments);}return spawn;}()}]);return SudoerLinux;}(SudoerUnix);var SudoerWin32=function(_Sudoer2){(0,_inherits3.default)(SudoerWin32,_Sudoer2);function SudoerWin32(){var options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};(0,_classCallCheck3.default)(this,SudoerWin32);var _this15=(0,_possibleConstructorReturn3.default)(this,(SudoerWin32.__proto__||(0,_getPrototypeOf2.default)(SudoerWin32)).call(this,options));_this15.bundled=(0,_path.join)(__dirname,'bin','elevate.exe');_this15.binary=null;return _this15;}(0,_createClass3.default)(SudoerWin32,[{key:'writeBatch',value:function(){var _ref26=(0,_bluebird.coroutine)(/*#__PURE__*/_regenerator2.default.mark(function _callee26(command,args,options){var tmpDir,tmpBatchFile,tmpOutputFile,env,batch;return _regenerator2.default.wrap(function _callee26$(_context26){while(1){switch(_context26.prev=_context26.next){case 0:_context26.next=2;return(0,_utils.exec)('echo %temp%');case 2:tmpDir=_context26.sent.stdout.toString().replace(/\r\n$/,'');tmpBatchFile=tmpDir+'\\batch-'+Math.random()+'.bat';tmpOutputFile=tmpDir+'\\output-'+Math.random();env=this.joinEnv(options);batch='setlocal enabledelayedexpansion\r\n';if(env.length){batch+='set '+env.join('\r\nset ')+'\r\n';}if(args&&args.length){batch+=command+' '+args.join(' ');}else{batch+=command;}_context26.next=11;return(0,_utils.writeFile)(tmpBatchFile,batch+' > '+tmpOutputFile+' 2>&1');case 11:_context26.next=13;return(0,_utils.writeFile)(tmpOutputFile,'');case 13:return _context26.abrupt('return',{batch:tmpBatchFile,output:tmpOutputFile});case 14:case'end':return _context26.stop();}}},_callee26,this);}));function writeBatch(_x45,_x46,_x47){return _ref26.apply(this,arguments);}return writeBatch;}()},{key:'watchOutput',value:function(){var _ref27=(0,_bluebird.coroutine)(/*#__PURE__*/_regenerator2.default.mark(function _callee27(cp){var self,output,watcher;return _regenerator2.default.wrap(function _callee27$(_context27){while(1){switch(_context27.prev=_context27.next){case 0:self=this;_context27.next=3;return(0,_utils.readFile)(cp.files.output);case 3:output=_context27.sent;// If we have process then emit watched and stored data to stdout
	cp.stdout.emit('data',output);watcher=(0,_fs.watchFile)(cp.files.output,{persistent:true,interval:1},function(){var stream=(0,_fs.createReadStream)(cp.files.output,{start:watcher.last}),size=0;stream.on('data',function(data){size+=data.length;if(cp){cp.stdout.emit('data',data);}});stream.on('close',function(){cp.last+=size;});});cp.last=output.length;cp.on('exit',function(){self.clean(cp);});return _context27.abrupt('return',cp);case 9:case'end':return _context27.stop();}}},_callee27,this);}));function watchOutput(_x48){return _ref27.apply(this,arguments);}return watchOutput;}()},{key:'prepare',value:function(){var _ref28=(0,_bluebird.coroutine)(/*#__PURE__*/_regenerator2.default.mark(function _callee29(){var _this16=this;var self;return _regenerator2.default.wrap(function _callee29$(_context29){while(1){switch(_context29.prev=_context29.next){case 0:self=this;return _context29.abrupt('return',new _promise2.default(function(){var _ref29=(0,_bluebird.coroutine)(/*#__PURE__*/_regenerator2.default.mark(function _callee28(resolve,reject){var target;return _regenerator2.default.wrap(function _callee28$(_context28){while(1){switch(_context28.prev=_context28.next){case 0:if(!self.binary){_context28.next=2;break;}return _context28.abrupt('return',resolve(self.binary));case 2:// Copy applet to temporary directory
	target=(0,_path.join)(_this16.tmpdir,'elevate.exe');_context28.next=5;return(0,_utils.stat)(target);case 5:if(_context28.sent){_context28.next=11;break;}(0,_fs.copyFileSync)(_this16.bundled,target);self.binary=target;resolve(self.binary);_context28.next=13;break;case 11:self.binary=target;resolve(self.binary);case 13:case'end':return _context28.stop();}}},_callee28,_this16);}));return function(_x49,_x50){return _ref29.apply(this,arguments);};}()));case 2:case'end':return _context29.stop();}}},_callee29,this);}));function prepare(){return _ref28.apply(this,arguments);}return prepare;}()},{key:'exec',value:function(){var _ref30=(0,_bluebird.coroutine)(/*#__PURE__*/_regenerator2.default.mark(function _callee31(command){var _this17=this;var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var self,files,output;return _regenerator2.default.wrap(function _callee31$(_context31){while(1){switch(_context31.prev=_context31.next){case 0:self=this,files=void 0,output=void 0;return _context31.abrupt('return',new _promise2.default(function(){var _ref31=(0,_bluebird.coroutine)(/*#__PURE__*/_regenerator2.default.mark(function _callee30(resolve,reject){return _regenerator2.default.wrap(function _callee30$(_context30){while(1){switch(_context30.prev=_context30.next){case 0:_context30.prev=0;_context30.next=3;return _this17.prepare();case 3:_context30.next=5;return self.writeBatch(command,[],options);case 5:files=_context30.sent;command=self.encloseDoubleQuotes(self.binary)+' -wait '+files.batch;// No need to wait exec output because output is redirected to temporary file
	_context30.next=9;return(0,_utils.exec)(command,options);case 9:_context30.next=11;return(0,_utils.readFile)(files.output);case 11:output=_context30.sent;return _context30.abrupt('return',resolve(output));case 15:_context30.prev=15;_context30.t0=_context30['catch'](0);return _context30.abrupt('return',reject(_context30.t0));case 18:case'end':return _context30.stop();}}},_callee30,_this17,[[0,15]]);}));return function(_x53,_x54){return _ref31.apply(this,arguments);};}()));case 2:case'end':return _context31.stop();}}},_callee31,this);}));function exec(_x51){return _ref30.apply(this,arguments);}return exec;}()},{key:'spawn',value:function(){var _ref32=(0,_bluebird.coroutine)(/*#__PURE__*/_regenerator2.default.mark(function _callee32(command,args){var options=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{};var files,sudoArgs,cp,binary;return _regenerator2.default.wrap(function _callee32$(_context32){while(1){switch(_context32.prev=_context32.next){case 0:_context32.next=2;return this.writeBatch(command,args,options);case 2:files=_context32.sent;sudoArgs=[];cp=void 0;sudoArgs.push('-wait');sudoArgs.push(files.batch);_context32.next=9;return this.prepare();case 9:binary=this.binary.replace(/\\/g,'\\\\');cp=(0,_utils.spawn)(binary,sudoArgs,options,{wait:false});cp.files=files;_context32.next=14;return this.watchOutput(cp);case 14:return _context32.abrupt('return',cp);case 15:case'end':return _context32.stop();}}},_callee32,this);}));function spawn(_x55,_x56){return _ref32.apply(this,arguments);}return spawn;}()},{key:'clean',value:function clean(cp){(0,_fs.unwatchFile)(cp.files.output);(0,_fs.unlinkSync)(cp.files.batch);(0,_fs.unlinkSync)(cp.files.output);}}]);return SudoerWin32;}(Sudoer);exports.SudoerDarwin=SudoerDarwin;exports.SudoerLinux=SudoerLinux;exports.SudoerWin32=SudoerWin32;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});exports.access=exports.open=exports.stat=exports.mkdir=exports.exec=exports.spawn=exports.writeFile=exports.readFile=undefined;var _extends2=__webpack_require__(78);var _extends3=_interopRequireDefault(_extends2);var _regenerator=__webpack_require__(44);var _regenerator2=_interopRequireDefault(_regenerator);var _bluebird=__webpack_require__(63);var _toConsumableArray2=__webpack_require__(43);var _toConsumableArray3=_interopRequireDefault(_toConsumableArray2);var _promise=__webpack_require__(42);var _promise2=_interopRequireDefault(_promise);var access=function(){var _ref=(0,_bluebird.coroutine)(/*#__PURE__*/_regenerator2.default.mark(function _callee(target,mode){var _access;return _regenerator2.default.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:_access=promisify(_fs2.default.access);_context.prev=1;_context.next=4;return _access(target,mode);case 4:return _context.abrupt('return',true);case 7:_context.prev=7;_context.t0=_context['catch'](1);return _context.abrupt('return',false);case 10:case'end':return _context.stop();}}},_callee,this,[[1,7]]);}));return function access(_x,_x2){return _ref.apply(this,arguments);};}();var exec=function(){var _ref2=(0,_bluebird.coroutine)(/*#__PURE__*/_regenerator2.default.mark(function _callee2(cmd){var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};return _regenerator2.default.wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:return _context2.abrupt('return',new _promise2.default(function(resolve,reject){_child_process2.default.exec(cmd,options,function(err,stdout,stderr){if(err){return reject(err);}return resolve({stdout:stdout,stderr:stderr});});}));case 1:case'end':return _context2.stop();}}},_callee2,this);}));return function exec(_x3){return _ref2.apply(this,arguments);};}();var stat=function(){var _ref3=(0,_bluebird.coroutine)(/*#__PURE__*/_regenerator2.default.mark(function _callee3(target){var _stat,fileStat;return _regenerator2.default.wrap(function _callee3$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:_stat=promisify(_fs2.default.stat);_context3.prev=1;_context3.next=4;return _stat(target);case 4:fileStat=_context3.sent;return _context3.abrupt('return',fileStat);case 8:_context3.prev=8;_context3.t0=_context3['catch'](1);return _context3.abrupt('return',null);case 11:case'end':return _context3.stop();}}},_callee3,this,[[1,8]]);}));return function stat(_x6){return _ref3.apply(this,arguments);};}();var _fs=__webpack_require__(64);var _fs2=_interopRequireDefault(_fs);var _child_process=__webpack_require__(127);var _child_process2=_interopRequireDefault(_child_process);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function promisify(fn){return function(){var _arguments=arguments;return new _promise2.default(function(resolve,reject){fn.apply(undefined,Array.prototype.slice.call(_arguments).concat([function(){if(arguments[0]instanceof Error){reject(arguments[0]);}else{resolve.apply(undefined,(0,_toConsumableArray3.default)(Array.prototype.slice.call(arguments,1)));}}]));});};}function spawn(cmd,args){var options=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{};var cp=_child_process2.default.spawn(cmd,args,(0,_extends3.default)({},options,{shell:true}));cp.output={stdout:new Buffer(0),stderr:new Buffer(0)};cp.stdout.on('data',function(data){cp.output.stdout=concat(data,cp.output.stdout);});cp.stderr.on('data',function(data){cp.output.stderr=concat(data,cp.output.stderr);});return cp;}function concat(source,target){if(!(source instanceof Buffer)){source=new Buffer(source,'utf8');}if(!target instanceof Buffer){target=new Buffer(0);}return Buffer.concat([target,source]);}var open=promisify(_fs2.default.open),mkdir=promisify(_fs2.default.mkdir),readFile=promisify(_fs2.default.readFile),writeFile=promisify(_fs2.default.writeFile);exports.readFile=readFile;exports.writeFile=writeFile;exports.spawn=spawn;exports.exec=exec;exports.mkdir=mkdir;exports.stat=stat;exports.open=open;exports.access=access;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(81), __esModule: true };

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(82), __esModule: true };

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(84), __esModule: true };

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(85), __esModule: true };

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(86), __esModule: true };

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(87), __esModule: true };

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(89), __esModule: true };

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(90), __esModule: true };

/***/ }),
/* 76 */
/***/ (function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(71);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _assign = __webpack_require__(41);

	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _assign2.default || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(73);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(70);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(25);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(25);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(24);
	__webpack_require__(114);
	module.exports = __webpack_require__(1).Array.from;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(40);
	__webpack_require__(24);
	module.exports = __webpack_require__(113);


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(116);
	module.exports = __webpack_require__(1).Object.assign;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(117);
	var $Object = __webpack_require__(1).Object;
	module.exports = function create(P, D) {
	  return $Object.create(P, D);
	};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(118);
	var $Object = __webpack_require__(1).Object;
	module.exports = function defineProperty(it, key, desc) {
	  return $Object.defineProperty(it, key, desc);
	};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(119);
	module.exports = __webpack_require__(1).Object.getPrototypeOf;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(120);
	module.exports = __webpack_require__(1).Object.setPrototypeOf;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(62);
	__webpack_require__(24);
	__webpack_require__(40);
	__webpack_require__(121);
	__webpack_require__(123);
	__webpack_require__(124);
	module.exports = __webpack_require__(1).Promise;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(122);
	__webpack_require__(62);
	__webpack_require__(125);
	__webpack_require__(126);
	module.exports = __webpack_require__(1).Symbol;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(24);
	__webpack_require__(40);
	module.exports = __webpack_require__(38).f('iterator');


/***/ }),
/* 91 */
/***/ (function(module, exports) {

	module.exports = function () { /* empty */ };


/***/ }),
/* 92 */
/***/ (function(module, exports) {

	module.exports = function (it, Constructor, name, forbiddenField) {
	  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(13);
	var toLength = __webpack_require__(35);
	var toAbsoluteIndex = __webpack_require__(111);
	module.exports = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(7);
	var createDesc = __webpack_require__(17);

	module.exports = function (object, index, value) {
	  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(20);
	var gOPS = __webpack_require__(31);
	var pIE = __webpack_require__(21);
	module.exports = function (it) {
	  var result = getKeys(it);
	  var getSymbols = gOPS.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = pIE.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  } return result;
	};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

	var ctx = __webpack_require__(11);
	var call = __webpack_require__(50);
	var isArrayIter = __webpack_require__(49);
	var anObject = __webpack_require__(5);
	var toLength = __webpack_require__(35);
	var getIterFn = __webpack_require__(39);
	var BREAK = {};
	var RETURN = {};
	var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
	  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
	  var f = ctx(fn, that, entries ? 2 : 1);
	  var index = 0;
	  var length, step, iterator, result;
	  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if (result === BREAK || result === RETURN) return result;
	  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
	    result = call(iterator, f, step.value, entries);
	    if (result === BREAK || result === RETURN) return result;
	  }
	};
	exports.BREAK = BREAK;
	exports.RETURN = RETURN;


/***/ }),
/* 97 */
/***/ (function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function (fn, args, that) {
	  var un = that === undefined;
	  switch (args.length) {
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return fn.apply(that, args);
	};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(14);
	module.exports = Array.isArray || function isArray(arg) {
	  return cof(arg) == 'Array';
	};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var create = __webpack_require__(30);
	var descriptor = __webpack_require__(17);
	var setToStringTag = __webpack_require__(22);
	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(10)(IteratorPrototype, __webpack_require__(3)('iterator'), function () { return this; });

	module.exports = function (Constructor, NAME, next) {
	  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
	  setToStringTag(Constructor, NAME + ' Iterator');
	};


/***/ }),
/* 100 */
/***/ (function(module, exports) {

	module.exports = function (done, value) {
	  return { value: value, done: !!done };
	};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

	var META = __webpack_require__(23)('meta');
	var isObject = __webpack_require__(8);
	var has = __webpack_require__(9);
	var setDesc = __webpack_require__(7).f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !__webpack_require__(12)(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META, { value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  } });
	};
	var fastKey = function (it, create) {
	  // return primitive with prefix
	  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function (it, create) {
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(2);
	var macrotask = __webpack_require__(61).set;
	var Observer = global.MutationObserver || global.WebKitMutationObserver;
	var process = global.process;
	var Promise = global.Promise;
	var isNode = __webpack_require__(14)(process) == 'process';

	module.exports = function () {
	  var head, last, notify;

	  var flush = function () {
	    var parent, fn;
	    if (isNode && (parent = process.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (e) {
	        if (head) notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // Node.js
	  if (isNode) {
	    notify = function () {
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
	  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
	    var toggle = true;
	    var node = document.createTextNode('');
	    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise && Promise.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    var promise = Promise.resolve(undefined);
	    notify = function () {
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }

	  return function (fn) {
	    var task = { fn: fn, next: undefined };
	    if (last) last.next = task;
	    if (!head) {
	      head = task;
	      notify();
	    } last = task;
	  };
	};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var DESCRIPTORS = __webpack_require__(6);
	var getKeys = __webpack_require__(20);
	var gOPS = __webpack_require__(31);
	var pIE = __webpack_require__(21);
	var toObject = __webpack_require__(18);
	var IObject = __webpack_require__(48);
	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(12)(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = gOPS.f;
	  var isEnum = pIE.f;
	  while (aLen > index) {
	    var S = IObject(arguments[index++]);
	    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
	    }
	  } return T;
	} : $assign;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(7);
	var anObject = __webpack_require__(5);
	var getKeys = __webpack_require__(20);

	module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = getKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(13);
	var gOPN = __webpack_require__(54).f;
	var toString = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it) {
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(4);
	var core = __webpack_require__(1);
	var fails = __webpack_require__(12);
	module.exports = function (KEY, exec) {
	  var fn = (core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
	};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

	var hide = __webpack_require__(10);
	module.exports = function (target, src, safe) {
	  for (var key in src) {
	    if (safe && target[key]) target[key] = src[key];
	    else hide(target, key, src[key]);
	  } return target;
	};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(8);
	var anObject = __webpack_require__(5);
	var check = function (O, proto) {
	  anObject(O);
	  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function (test, buggy, set) {
	      try {
	        set = __webpack_require__(11)(Function.call, __webpack_require__(53).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch (e) { buggy = true; }
	      return function setPrototypeOf(O, proto) {
	        check(O, proto);
	        if (buggy) O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var global = __webpack_require__(2);
	var core = __webpack_require__(1);
	var dP = __webpack_require__(7);
	var DESCRIPTORS = __webpack_require__(6);
	var SPECIES = __webpack_require__(3)('species');

	module.exports = function (KEY) {
	  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
	  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
	    configurable: true,
	    get: function () { return this; }
	  });
	};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(34);
	var defined = __webpack_require__(26);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(defined(that));
	    var i = toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(34);
	var max = Math.max;
	var min = Math.min;
	module.exports = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(2);
	var navigator = global.navigator;

	module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(5);
	var get = __webpack_require__(39);
	module.exports = __webpack_require__(1).getIterator = function (it) {
	  var iterFn = get(it);
	  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var ctx = __webpack_require__(11);
	var $export = __webpack_require__(4);
	var toObject = __webpack_require__(18);
	var call = __webpack_require__(50);
	var isArrayIter = __webpack_require__(49);
	var toLength = __webpack_require__(35);
	var createProperty = __webpack_require__(94);
	var getIterFn = __webpack_require__(39);

	$export($export.S + $export.F * !__webpack_require__(52)(function (iter) { Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
	    var O = toObject(arrayLike);
	    var C = typeof this == 'function' ? this : Array;
	    var aLen = arguments.length;
	    var mapfn = aLen > 1 ? arguments[1] : undefined;
	    var mapping = mapfn !== undefined;
	    var index = 0;
	    var iterFn = getIterFn(O);
	    var length, result, step, iterator;
	    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
	      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for (result = new C(length); length > index; index++) {
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(91);
	var step = __webpack_require__(100);
	var Iterators = __webpack_require__(15);
	var toIObject = __webpack_require__(13);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(51)(Array, 'Array', function (iterated, kind) {
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return step(1);
	  }
	  if (kind == 'keys') return step(0, index);
	  if (kind == 'values') return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(4);

	$export($export.S + $export.F, 'Object', { assign: __webpack_require__(103) });


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(4);
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', { create: __webpack_require__(30) });


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(4);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperty: __webpack_require__(7).f });


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject = __webpack_require__(18);
	var $getPrototypeOf = __webpack_require__(55);

	__webpack_require__(106)('getPrototypeOf', function () {
	  return function getPrototypeOf(it) {
	    return $getPrototypeOf(toObject(it));
	  };
	});


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(4);
	$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(108).set });


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY = __webpack_require__(16);
	var global = __webpack_require__(2);
	var ctx = __webpack_require__(11);
	var classof = __webpack_require__(45);
	var $export = __webpack_require__(4);
	var isObject = __webpack_require__(8);
	var aFunction = __webpack_require__(19);
	var anInstance = __webpack_require__(92);
	var forOf = __webpack_require__(96);
	var speciesConstructor = __webpack_require__(60);
	var task = __webpack_require__(61).set;
	var microtask = __webpack_require__(102)();
	var newPromiseCapabilityModule = __webpack_require__(29);
	var perform = __webpack_require__(57);
	var userAgent = __webpack_require__(112);
	var promiseResolve = __webpack_require__(58);
	var PROMISE = 'Promise';
	var TypeError = global.TypeError;
	var process = global.process;
	var versions = process && process.versions;
	var v8 = versions && versions.v8 || '';
	var $Promise = global[PROMISE];
	var isNode = classof(process) == 'process';
	var empty = function () { /* empty */ };
	var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
	var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

	var USE_NATIVE = !!function () {
	  try {
	    // correct subclassing with @@species support
	    var promise = $Promise.resolve(1);
	    var FakePromise = (promise.constructor = {})[__webpack_require__(3)('species')] = function (exec) {
	      exec(empty, empty);
	    };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function')
	      && promise.then(empty) instanceof FakePromise
	      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	      // we can't detect it synchronously, so just check versions
	      && v8.indexOf('6.6') !== 0
	      && userAgent.indexOf('Chrome/66') === -1;
	  } catch (e) { /* empty */ }
	}();

	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var notify = function (promise, isReject) {
	  if (promise._n) return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function () {
	    var value = promise._v;
	    var ok = promise._s == 1;
	    var i = 0;
	    var run = function (reaction) {
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then, exited;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (promise._h == 2) onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value); // may throw
	            if (domain) {
	              domain.exit();
	              exited = true;
	            }
	          }
	          if (result === reaction.promise) {
	            reject(TypeError('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (e) {
	        if (domain && !exited) domain.exit();
	        reject(e);
	      }
	    };
	    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if (isReject && !promise._h) onUnhandled(promise);
	  });
	};
	var onUnhandled = function (promise) {
	  task.call(global, function () {
	    var value = promise._v;
	    var unhandled = isUnhandled(promise);
	    var result, handler, console;
	    if (unhandled) {
	      result = perform(function () {
	        if (isNode) {
	          process.emit('unhandledRejection', value, promise);
	        } else if (handler = global.onunhandledrejection) {
	          handler({ promise: promise, reason: value });
	        } else if ((console = global.console) && console.error) {
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if (unhandled && result.e) throw result.v;
	  });
	};
	var isUnhandled = function (promise) {
	  return promise._h !== 1 && (promise._a || promise._c).length === 0;
	};
	var onHandleUnhandled = function (promise) {
	  task.call(global, function () {
	    var handler;
	    if (isNode) {
	      process.emit('rejectionHandled', promise);
	    } else if (handler = global.onrejectionhandled) {
	      handler({ promise: promise, reason: promise._v });
	    }
	  });
	};
	var $reject = function (value) {
	  var promise = this;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if (!promise._a) promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function (value) {
	  var promise = this;
	  var then;
	  if (promise._d) return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if (promise === value) throw TypeError("Promise can't be resolved itself");
	    if (then = isThenable(value)) {
	      microtask(function () {
	        var wrapper = { _w: promise, _d: false }; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch (e) {
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch (e) {
	    $reject.call({ _w: promise, _d: false }, e); // wrap
	  }
	};

	// constructor polyfill
	if (!USE_NATIVE) {
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor) {
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch (err) {
	      $reject.call(this, err);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars
	  Internal = function Promise(executor) {
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(107)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected) {
	      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if (this._a) this._a.push(reaction);
	      if (this._s) notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject = ctx($reject, promise, 1);
	  };
	  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
	    return C === $Promise || C === Wrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
	__webpack_require__(22)($Promise, PROMISE);
	__webpack_require__(109)(PROMISE);
	Wrapper = __webpack_require__(1)[PROMISE];

	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r) {
	    var capability = newPromiseCapability(this);
	    var $$reject = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x) {
	    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(52)(function (iter) {
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var values = [];
	      var index = 0;
	      var remaining = 1;
	      forOf(iterable, false, function (promise) {
	        var $index = index++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      forOf(iterable, false, function (promise) {
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.e) reject(result.v);
	    return capability.promise;
	  }
	});


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global = __webpack_require__(2);
	var has = __webpack_require__(9);
	var DESCRIPTORS = __webpack_require__(6);
	var $export = __webpack_require__(4);
	var redefine = __webpack_require__(59);
	var META = __webpack_require__(101).KEY;
	var $fails = __webpack_require__(12);
	var shared = __webpack_require__(33);
	var setToStringTag = __webpack_require__(22);
	var uid = __webpack_require__(23);
	var wks = __webpack_require__(3);
	var wksExt = __webpack_require__(38);
	var wksDefine = __webpack_require__(37);
	var enumKeys = __webpack_require__(95);
	var isArray = __webpack_require__(98);
	var anObject = __webpack_require__(5);
	var isObject = __webpack_require__(8);
	var toObject = __webpack_require__(18);
	var toIObject = __webpack_require__(13);
	var toPrimitive = __webpack_require__(36);
	var createDesc = __webpack_require__(17);
	var _create = __webpack_require__(30);
	var gOPNExt = __webpack_require__(105);
	var $GOPD = __webpack_require__(53);
	var $GOPS = __webpack_require__(31);
	var $DP = __webpack_require__(7);
	var $keys = __webpack_require__(20);
	var gOPD = $GOPD.f;
	var dP = $DP.f;
	var gOPN = gOPNExt.f;
	var $Symbol = global.Symbol;
	var $JSON = global.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE = 'prototype';
	var HIDDEN = wks('_hidden');
	var TO_PRIMITIVE = wks('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = shared('symbol-registry');
	var AllSymbols = shared('symbols');
	var OPSymbols = shared('op-symbols');
	var ObjectProto = Object[PROTOTYPE];
	var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
	var QObject = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function () {
	  return _create(dP({}, 'a', {
	    get: function () { return dP(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD(ObjectProto, key);
	  if (protoDesc) delete ObjectProto[key];
	  dP(it, key, D);
	  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function (tag) {
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if (has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _create(D, { enumerable: createDesc(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = toIObject(it);
	  key = toPrimitive(key, true);
	  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
	  var D = gOPD(it, key);
	  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN(toIObject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto;
	  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto) $set.call(OPSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f = $defineProperty;
	  __webpack_require__(54).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(21).f = $propertyIsEnumerable;
	  $GOPS.f = $getOwnPropertySymbols;

	  if (DESCRIPTORS && !__webpack_require__(16)) {
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function (name) {
	    return wrap(wks(name));
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

	for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
	    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
	  },
	  useSetter: function () { setter = true; },
	  useSimple: function () { setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

	$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return $GOPS.f(toObject(it));
	  }
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    $replacer = replacer = args[1];
	    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    if (!isArray(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(10)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-promise-finally
	'use strict';
	var $export = __webpack_require__(4);
	var core = __webpack_require__(1);
	var global = __webpack_require__(2);
	var speciesConstructor = __webpack_require__(60);
	var promiseResolve = __webpack_require__(58);

	$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
	  var C = speciesConstructor(this, core.Promise || global.Promise);
	  var isFunction = typeof onFinally == 'function';
	  return this.then(
	    isFunction ? function (x) {
	      return promiseResolve(C, onFinally()).then(function () { return x; });
	    } : onFinally,
	    isFunction ? function (e) {
	      return promiseResolve(C, onFinally()).then(function () { throw e; });
	    } : onFinally
	  );
	} });


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/proposal-promise-try
	var $export = __webpack_require__(4);
	var newPromiseCapability = __webpack_require__(29);
	var perform = __webpack_require__(57);

	$export($export.S, 'Promise', { 'try': function (callbackfn) {
	  var promiseCapability = newPromiseCapability.f(this);
	  var result = perform(callbackfn);
	  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
	  return promiseCapability.promise;
	} });


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(37)('asyncIterator');


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(37)('observable');


/***/ }),
/* 127 */
/***/ (function(module, exports) {

	module.exports = require("child_process");

/***/ }),
/* 128 */
/***/ (function(module, exports) {

	module.exports = require("crypto");

/***/ }),
/* 129 */
/***/ (function(module, exports) {

	module.exports = require("os");

/***/ }),
/* 130 */
/***/ (function(module, exports) {

	module.exports = require("path");

/***/ }),
/* 131 */
/***/ (function(module, exports) {

	module.exports = require("regenerator-runtime");

/***/ })
/******/ ])
});
;