import moment from 'moment';
import axios from 'axios';

var global$1 = typeof global !== "undefined" ? global :
            typeof self !== "undefined" ? self :
            typeof window !== "undefined" ? window : {}

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function DateFilter(value, format) {
  if (value) {
    return moment(String(value)).format(format);
  }

  return '';
}

function MomentFilter(value, format) {
  return value ? moment(String(value)) : null;
}

function index(Vue, options) {
  Vue.filter('date', DateFilter);
  Vue.filter('moment', MomentFilter);
}

var filters =
/*#__PURE__*/
Object.freeze({
  DateFilter: index,
  MomentFilter: index
});
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */

function isObject(value) {
  var type = _typeof(value);

  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject;
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */

var isArray = Array.isArray;
var isArray_1 = isArray;
var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global$1 !== 'undefined' ? global$1 : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
  return module = {
    exports: {}
  }, fn(module, module.exports), module.exports;
}
/** Detect free variable `global` from Node.js. */


var freeGlobal = _typeof(commonjsGlobal) == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var _freeGlobal = freeGlobal;
/** Detect free variable `self`. */

var freeSelf = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */

var root = _freeGlobal || freeSelf || Function('return this')();
var _root = root;
/** Built-in value references. */

var Symbol$1 = _root.Symbol;
var _Symbol = Symbol$1;
/** Used for built-in method references. */

var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString = objectProto.toString;
/** Built-in value references. */

var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;
/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */

function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);

  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }

  return result;
}

var _getRawTag = getRawTag;
/** Used for built-in method references. */

var objectProto$1 = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString$1 = objectProto$1.toString;
/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */

function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

var _objectToString = objectToString;
/** `Object#toString` result references. */

var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';
/** Built-in value references. */

var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;
/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */

function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }

  return symToStringTag$1 && symToStringTag$1 in Object(value) ? _getRawTag(value) : _objectToString(value);
}

var _baseGetTag = baseGetTag;
/** `Object#toString` result references. */

var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */

function isFunction$1(value) {
  if (!isObject_1(value)) {
    return false;
  } // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.


  var tag = _baseGetTag(value);

  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

var isFunction_1 = isFunction$1;
/** Used to detect overreaching core-js shims. */

var coreJsData = _root['__core-js_shared__'];
var _coreJsData = coreJsData;
/** Used to detect methods masquerading as native. */

var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();
/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */


function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}

var _isMasked = isMasked;
/** Used for built-in method references. */

var funcProto = Function.prototype;
/** Used to resolve the decompiled source of functions. */

var funcToString = funcProto.toString;
/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */

function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}

    try {
      return func + '';
    } catch (e) {}
  }

  return '';
}

var _toSource = toSource;
/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */

var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
/** Used to detect host constructors (Safari). */

var reIsHostCtor = /^\[object .+?Constructor\]$/;
/** Used for built-in method references. */

var funcProto$1 = Function.prototype,
    objectProto$2 = Object.prototype;
/** Used to resolve the decompiled source of functions. */

var funcToString$1 = funcProto$1.toString;
/** Used to check objects for own properties. */

var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
/** Used to detect if a method is native. */

var reIsNative = RegExp('^' + funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */

function baseIsNative(value) {
  if (!isObject_1(value) || _isMasked(value)) {
    return false;
  }

  var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(_toSource(value));
}

var _baseIsNative = baseIsNative;
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */

function getValue(object, key) {
  return object == null ? undefined : object[key];
}

var _getValue = getValue;
/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */

function getNative(object, key) {
  var value = _getValue(object, key);

  return _baseIsNative(value) ? value : undefined;
}

var _getNative = getNative;

var defineProperty = function () {
  try {
    var func = _getNative(Object, 'defineProperty');

    func({}, '', {});
    return func;
  } catch (e) {}
}();

var _defineProperty$1 = defineProperty;
/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */

function baseAssignValue(object, key, value) {
  if (key == '__proto__' && _defineProperty$1) {
    _defineProperty$1(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

var _baseAssignValue = baseAssignValue;
/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */

function eq(value, other) {
  return value === other || value !== value && other !== other;
}

var eq_1 = eq;
/** Used for built-in method references. */

var objectProto$3 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */

function assignValue(object, key, value) {
  var objValue = object[key];

  if (!(hasOwnProperty$2.call(object, key) && eq_1(objValue, value)) || value === undefined && !(key in object)) {
    _baseAssignValue(object, key, value);
  }
}

var _assignValue = assignValue;
/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */

function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }

    if (isNew) {
      _baseAssignValue(object, key, newValue);
    } else {
      _assignValue(object, key, newValue);
    }
  }

  return object;
}

var _copyObject = copyObject;
/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */

function identity(value) {
  return value;
}

var identity_1 = identity;
/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */

function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);

    case 1:
      return func.call(thisArg, args[0]);

    case 2:
      return func.call(thisArg, args[0], args[1]);

    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }

  return func.apply(thisArg, args);
}

var _apply = apply;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeMax = Math.max;
/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */

function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? func.length - 1 : start, 0);
  return function () {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }

    index = -1;
    var otherArgs = Array(start + 1);

    while (++index < start) {
      otherArgs[index] = args[index];
    }

    otherArgs[start] = transform(array);
    return _apply(func, this, otherArgs);
  };
}

var _overRest = overRest;
/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */

function constant(value) {
  return function () {
    return value;
  };
}

var constant_1 = constant;
/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */

var baseSetToString = !_defineProperty$1 ? identity_1 : function (func, string) {
  return _defineProperty$1(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant_1(string),
    'writable': true
  });
};
var _baseSetToString = baseSetToString;
/** Used to detect hot functions by number of calls within a span of milliseconds. */

var HOT_COUNT = 800,
    HOT_SPAN = 16;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeNow = Date.now;
/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */

function shortOut(func) {
  var count = 0,
      lastCalled = 0;
  return function () {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;

    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }

    return func.apply(undefined, arguments);
  };
}

var _shortOut = shortOut;
/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */

var setToString = _shortOut(_baseSetToString);

var _setToString = setToString;
/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */

function baseRest(func, start) {
  return _setToString(_overRest(func, start, identity_1), func + '');
}

var _baseRest = baseRest;
/** Used as references for various `Number` constants. */

var MAX_SAFE_INTEGER = 9007199254740991;
/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */

function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

var isLength_1 = isLength;
/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */

function isArrayLike(value) {
  return value != null && isLength_1(value.length) && !isFunction_1(value);
}

var isArrayLike_1 = isArrayLike;
/** Used as references for various `Number` constants. */

var MAX_SAFE_INTEGER$1 = 9007199254740991;
/** Used to detect unsigned integer values. */

var reIsUint = /^(?:0|[1-9]\d*)$/;
/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */

function isIndex(value, length) {
  var type = _typeof(value);

  length = length == null ? MAX_SAFE_INTEGER$1 : length;
  return !!length && (type == 'number' || type != 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}

var _isIndex = isIndex;
/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */

function isIterateeCall(value, index, object) {
  if (!isObject_1(object)) {
    return false;
  }

  var type = _typeof(index);

  if (type == 'number' ? isArrayLike_1(object) && _isIndex(index, object.length) : type == 'string' && index in object) {
    return eq_1(object[index], value);
  }

  return false;
}

var _isIterateeCall = isIterateeCall;
/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */

function createAssigner(assigner) {
  return _baseRest(function (object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;
    customizer = assigner.length > 3 && typeof customizer == 'function' ? (length--, customizer) : undefined;

    if (guard && _isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }

    object = Object(object);

    while (++index < length) {
      var source = sources[index];

      if (source) {
        assigner(object, source, index, customizer);
      }
    }

    return object;
  });
}

var _createAssigner = createAssigner;
/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */

function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }

  return result;
}

var _baseTimes = baseTimes;
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */

function isObjectLike(value) {
  return value != null && _typeof(value) == 'object';
}

var isObjectLike_1 = isObjectLike;
/** `Object#toString` result references. */

var argsTag = '[object Arguments]';
/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */

function baseIsArguments(value) {
  return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
}

var _baseIsArguments = baseIsArguments;
/** Used for built-in method references. */

var objectProto$4 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
/** Built-in value references. */

var propertyIsEnumerable = objectProto$4.propertyIsEnumerable;
/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */

var isArguments = _baseIsArguments(function () {
  return arguments;
}()) ? _baseIsArguments : function (value) {
  return isObjectLike_1(value) && hasOwnProperty$3.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
};
var isArguments_1 = isArguments;
/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */

function stubFalse() {
  return false;
}

var stubFalse_1 = stubFalse;
var isBuffer_1 = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;
  /** Detect free variable `module`. */

  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
  /** Detect the popular CommonJS extension `module.exports`. */

  var moduleExports = freeModule && freeModule.exports === freeExports;
  /** Built-in value references. */

  var Buffer = moduleExports ? _root.Buffer : undefined;
  /* Built-in method references for those with the same name as other `lodash` methods. */

  var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;
  /**
   * Checks if `value` is a buffer.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
   * @example
   *
   * _.isBuffer(new Buffer(2));
   * // => true
   *
   * _.isBuffer(new Uint8Array(2));
   * // => false
   */

  var isBuffer = nativeIsBuffer || stubFalse_1;
  module.exports = isBuffer;
});
/** `Object#toString` result references. */

var argsTag$1 = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag$1 = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';
var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';
/** Used to identify `toStringTag` values of typed arrays. */

var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */

function baseIsTypedArray(value) {
  return isObjectLike_1(value) && isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
}

var _baseIsTypedArray = baseIsTypedArray;
/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */

function baseUnary(func) {
  return function (value) {
    return func(value);
  };
}

var _baseUnary = baseUnary;

var _nodeUtil = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;
  /** Detect free variable `module`. */

  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
  /** Detect the popular CommonJS extension `module.exports`. */

  var moduleExports = freeModule && freeModule.exports === freeExports;
  /** Detect free variable `process` from Node.js. */

  var freeProcess = moduleExports && _freeGlobal.process;
  /** Used to access faster Node.js helpers. */

  var nodeUtil = function () {
    try {
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }();

  module.exports = nodeUtil;
});
/* Node.js helper references. */


var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;
/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */

var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;
var isTypedArray_1 = isTypedArray;
/** Used for built-in method references. */

var objectProto$5 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */

function arrayLikeKeys(value, inherited) {
  var isArr = isArray_1(value),
      isArg = !isArr && isArguments_1(value),
      isBuff = !isArr && !isArg && isBuffer_1(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? _baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$4.call(value, key)) && !(skipIndexes && ( // Safari 9 has enumerable `arguments.length` in strict mode.
    key == 'length' || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == 'offset' || key == 'parent') || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') || // Skip index properties.
    _isIndex(key, length)))) {
      result.push(key);
    }
  }

  return result;
}

var _arrayLikeKeys = arrayLikeKeys;
/** Used for built-in method references. */

var objectProto$6 = Object.prototype;
/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */

function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto$6;
  return value === proto;
}

var _isPrototype = isPrototype;
/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */

function nativeKeysIn(object) {
  var result = [];

  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }

  return result;
}

var _nativeKeysIn = nativeKeysIn;
/** Used for built-in method references. */

var objectProto$7 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$5 = objectProto$7.hasOwnProperty;
/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */

function baseKeysIn(object) {
  if (!isObject_1(object)) {
    return _nativeKeysIn(object);
  }

  var isProto = _isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty$5.call(object, key)))) {
      result.push(key);
    }
  }

  return result;
}

var _baseKeysIn = baseKeysIn;
/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */

function keysIn$1(object) {
  return isArrayLike_1(object) ? _arrayLikeKeys(object, true) : _baseKeysIn(object);
}

var keysIn_1 = keysIn$1;
/**
 * This method is like `_.assign` except that it iterates over own and
 * inherited source properties.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @alias extend
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.assign
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * function Bar() {
 *   this.c = 3;
 * }
 *
 * Foo.prototype.b = 2;
 * Bar.prototype.d = 4;
 *
 * _.assignIn({ 'a': 0 }, new Foo, new Bar);
 * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
 */

var assignIn = _createAssigner(function (object, source) {
  _copyObject(source, keysIn_1(source), object);
});

var assignIn_1 = assignIn;
var extend = assignIn_1;
/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */

function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

var _listCacheClear = listCacheClear;
/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */

function assocIndexOf(array, key) {
  var length = array.length;

  while (length--) {
    if (eq_1(array[length][0], key)) {
      return length;
    }
  }

  return -1;
}

var _assocIndexOf = assocIndexOf;
/** Used for built-in method references. */

var arrayProto = Array.prototype;
/** Built-in value references. */

var splice = arrayProto.splice;
/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

function listCacheDelete(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }

  var lastIndex = data.length - 1;

  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }

  --this.size;
  return true;
}

var _listCacheDelete = listCacheDelete;
/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */

function listCacheGet(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

var _listCacheGet = listCacheGet;
/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

function listCacheHas(key) {
  return _assocIndexOf(this.__data__, key) > -1;
}

var _listCacheHas = listCacheHas;
/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */

function listCacheSet(key, value) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }

  return this;
}

var _listCacheSet = listCacheSet;
/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
} // Add methods to `ListCache`.


ListCache.prototype.clear = _listCacheClear;
ListCache.prototype['delete'] = _listCacheDelete;
ListCache.prototype.get = _listCacheGet;
ListCache.prototype.has = _listCacheHas;
ListCache.prototype.set = _listCacheSet;
var _ListCache = ListCache;
/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */

function stackClear() {
  this.__data__ = new _ListCache();
  this.size = 0;
}

var _stackClear = stackClear;
/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);
  this.size = data.size;
  return result;
}

var _stackDelete = stackDelete;
/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */

function stackGet(key) {
  return this.__data__.get(key);
}

var _stackGet = stackGet;
/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

function stackHas(key) {
  return this.__data__.has(key);
}

var _stackHas = stackHas;
/* Built-in method references that are verified to be native. */

var Map$1 = _getNative(_root, 'Map');

var _Map = Map$1;
/* Built-in method references that are verified to be native. */

var nativeCreate = _getNative(Object, 'create');

var _nativeCreate = nativeCreate;
/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */

function hashClear() {
  this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
  this.size = 0;
}

var _hashClear = hashClear;
/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

var _hashDelete = hashDelete;
/** Used to stand-in for `undefined` hash values. */

var HASH_UNDEFINED = '__lodash_hash_undefined__';
/** Used for built-in method references. */

var objectProto$8 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$6 = objectProto$8.hasOwnProperty;
/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */

function hashGet(key) {
  var data = this.__data__;

  if (_nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }

  return hasOwnProperty$6.call(data, key) ? data[key] : undefined;
}

var _hashGet = hashGet;
/** Used for built-in method references. */

var objectProto$9 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$7 = objectProto$9.hasOwnProperty;
/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

function hashHas(key) {
  var data = this.__data__;
  return _nativeCreate ? data[key] !== undefined : hasOwnProperty$7.call(data, key);
}

var _hashHas = hashHas;
/** Used to stand-in for `undefined` hash values. */

var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';
/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */

function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = _nativeCreate && value === undefined ? HASH_UNDEFINED$1 : value;
  return this;
}

var _hashSet = hashSet;
/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
} // Add methods to `Hash`.


Hash.prototype.clear = _hashClear;
Hash.prototype['delete'] = _hashDelete;
Hash.prototype.get = _hashGet;
Hash.prototype.has = _hashHas;
Hash.prototype.set = _hashSet;
var _Hash = Hash;
/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */

function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new _Hash(),
    'map': new (_Map || _ListCache)(),
    'string': new _Hash()
  };
}

var _mapCacheClear = mapCacheClear;
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */

function isKeyable(value) {
  var type = _typeof(value);

  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}

var _isKeyable = isKeyable;
/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */

function getMapData(map, key) {
  var data = map.__data__;
  return _isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}

var _getMapData = getMapData;
/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

function mapCacheDelete(key) {
  var result = _getMapData(this, key)['delete'](key);

  this.size -= result ? 1 : 0;
  return result;
}

var _mapCacheDelete = mapCacheDelete;
/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */

function mapCacheGet(key) {
  return _getMapData(this, key).get(key);
}

var _mapCacheGet = mapCacheGet;
/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

function mapCacheHas(key) {
  return _getMapData(this, key).has(key);
}

var _mapCacheHas = mapCacheHas;
/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */

function mapCacheSet(key, value) {
  var data = _getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

var _mapCacheSet = mapCacheSet;
/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
} // Add methods to `MapCache`.


MapCache.prototype.clear = _mapCacheClear;
MapCache.prototype['delete'] = _mapCacheDelete;
MapCache.prototype.get = _mapCacheGet;
MapCache.prototype.has = _mapCacheHas;
MapCache.prototype.set = _mapCacheSet;
var _MapCache = MapCache;
/** Used as the size to enable large array optimizations. */

var LARGE_ARRAY_SIZE = 200;
/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */

function stackSet(key, value) {
  var data = this.__data__;

  if (data instanceof _ListCache) {
    var pairs = data.__data__;

    if (!_Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }

    data = this.__data__ = new _MapCache(pairs);
  }

  data.set(key, value);
  this.size = data.size;
  return this;
}

var _stackSet = stackSet;
/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */

function Stack(entries) {
  var data = this.__data__ = new _ListCache(entries);
  this.size = data.size;
} // Add methods to `Stack`.


Stack.prototype.clear = _stackClear;
Stack.prototype['delete'] = _stackDelete;
Stack.prototype.get = _stackGet;
Stack.prototype.has = _stackHas;
Stack.prototype.set = _stackSet;
var _Stack = Stack;
/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */

function assignMergeValue(object, key, value) {
  if (value !== undefined && !eq_1(object[key], value) || value === undefined && !(key in object)) {
    _baseAssignValue(object, key, value);
  }
}

var _assignMergeValue = assignMergeValue;
/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */

function createBaseFor(fromRight) {
  return function (object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];

      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }

    return object;
  };
}

var _createBaseFor = createBaseFor;
/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */

var baseFor = _createBaseFor();

var _baseFor = baseFor;

var _cloneBuffer = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;
  /** Detect free variable `module`. */

  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;
  /** Detect the popular CommonJS extension `module.exports`. */

  var moduleExports = freeModule && freeModule.exports === freeExports;
  /** Built-in value references. */

  var Buffer = moduleExports ? _root.Buffer : undefined,
      allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;
  /**
   * Creates a clone of  `buffer`.
   *
   * @private
   * @param {Buffer} buffer The buffer to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Buffer} Returns the cloned buffer.
   */

  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }

    var length = buffer.length,
        result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
    buffer.copy(result);
    return result;
  }

  module.exports = cloneBuffer;
});
/** Built-in value references. */


var Uint8Array = _root.Uint8Array;
var _Uint8Array = Uint8Array;
/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */

function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new _Uint8Array(result).set(new _Uint8Array(arrayBuffer));
  return result;
}

var _cloneArrayBuffer = cloneArrayBuffer;
/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */

function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? _cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

var _cloneTypedArray = cloneTypedArray;
/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */

function copyArray(source, array) {
  var index = -1,
      length = source.length;
  array || (array = Array(length));

  while (++index < length) {
    array[index] = source[index];
  }

  return array;
}

var _copyArray = copyArray;
/** Built-in value references. */

var objectCreate = Object.create;
/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */

var baseCreate = function () {
  function object() {}

  return function (proto) {
    if (!isObject_1(proto)) {
      return {};
    }

    if (objectCreate) {
      return objectCreate(proto);
    }

    object.prototype = proto;
    var result = new object();
    object.prototype = undefined;
    return result;
  };
}();

var _baseCreate = baseCreate;
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */

function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

var _overArg = overArg;
/** Built-in value references. */

var getPrototype = _overArg(Object.getPrototypeOf, Object);

var _getPrototype = getPrototype;
/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */

function initCloneObject(object) {
  return typeof object.constructor == 'function' && !_isPrototype(object) ? _baseCreate(_getPrototype(object)) : {};
}

var _initCloneObject = initCloneObject;
/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */

function isArrayLikeObject(value) {
  return isObjectLike_1(value) && isArrayLike_1(value);
}

var isArrayLikeObject_1 = isArrayLikeObject;
/** `Object#toString` result references. */

var objectTag$1 = '[object Object]';
/** Used for built-in method references. */

var funcProto$2 = Function.prototype,
    objectProto$10 = Object.prototype;
/** Used to resolve the decompiled source of functions. */

var funcToString$2 = funcProto$2.toString;
/** Used to check objects for own properties. */

var hasOwnProperty$8 = objectProto$10.hasOwnProperty;
/** Used to infer the `Object` constructor. */

var objectCtorString = funcToString$2.call(Object);
/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */

function isPlainObject(value) {
  if (!isObjectLike_1(value) || _baseGetTag(value) != objectTag$1) {
    return false;
  }

  var proto = _getPrototype(value);

  if (proto === null) {
    return true;
  }

  var Ctor = hasOwnProperty$8.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString$2.call(Ctor) == objectCtorString;
}

var isPlainObject_1 = isPlainObject;
/**
 * Gets the value at `key`, unless `key` is "__proto__".
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */

function safeGet(object, key) {
  return key == '__proto__' ? undefined : object[key];
}

var _safeGet = safeGet;
/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */

function toPlainObject(value) {
  return _copyObject(value, keysIn_1(value));
}

var toPlainObject_1 = toPlainObject;
/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */

function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = _safeGet(object, key),
      srcValue = _safeGet(source, key),
      stacked = stack.get(srcValue);

  if (stacked) {
    _assignMergeValue(object, key, stacked);

    return;
  }

  var newValue = customizer ? customizer(objValue, srcValue, key + '', object, source, stack) : undefined;
  var isCommon = newValue === undefined;

  if (isCommon) {
    var isArr = isArray_1(srcValue),
        isBuff = !isArr && isBuffer_1(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray_1(srcValue);
    newValue = srcValue;

    if (isArr || isBuff || isTyped) {
      if (isArray_1(objValue)) {
        newValue = objValue;
      } else if (isArrayLikeObject_1(objValue)) {
        newValue = _copyArray(objValue);
      } else if (isBuff) {
        isCommon = false;
        newValue = _cloneBuffer(srcValue, true);
      } else if (isTyped) {
        isCommon = false;
        newValue = _cloneTypedArray(srcValue, true);
      } else {
        newValue = [];
      }
    } else if (isPlainObject_1(srcValue) || isArguments_1(srcValue)) {
      newValue = objValue;

      if (isArguments_1(objValue)) {
        newValue = toPlainObject_1(objValue);
      } else if (!isObject_1(objValue) || srcIndex && isFunction_1(objValue)) {
        newValue = _initCloneObject(srcValue);
      }
    } else {
      isCommon = false;
    }
  }

  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }

  _assignMergeValue(object, key, newValue);
}

var _baseMergeDeep = baseMergeDeep;
/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */

function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }

  _baseFor(source, function (srcValue, key) {
    if (isObject_1(srcValue)) {
      stack || (stack = new _Stack());

      _baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    } else {
      var newValue = customizer ? customizer(_safeGet(object, key), srcValue, key + '', object, source, stack) : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }

      _assignMergeValue(object, key, newValue);
    }
  }, keysIn_1);
}

var _baseMerge = baseMerge;
/**
 * This method is like `_.assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 *
 * var other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 *
 * _.merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */

var merge = _createAssigner(function (object, source, srcIndex) {
  _baseMerge(object, source, srcIndex);
});

var merge_1 = merge;
/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */

function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }

  return array;
}

var _arrayEach = arrayEach;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeKeys = _overArg(Object.keys, Object);

var _nativeKeys = nativeKeys;
/** Used for built-in method references. */

var objectProto$11 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$9 = objectProto$11.hasOwnProperty;
/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */

function baseKeys(object) {
  if (!_isPrototype(object)) {
    return _nativeKeys(object);
  }

  var result = [];

  for (var key in Object(object)) {
    if (hasOwnProperty$9.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }

  return result;
}

var _baseKeys = baseKeys;
/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */

function keys(object) {
  return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
}

var keys_1 = keys;
/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */

function baseForOwn(object, iteratee) {
  return object && _baseFor(object, iteratee, keys_1);
}

var _baseForOwn = baseForOwn;
/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */

function createBaseEach(eachFunc, fromRight) {
  return function (collection, iteratee) {
    if (collection == null) {
      return collection;
    }

    if (!isArrayLike_1(collection)) {
      return eachFunc(collection, iteratee);
    }

    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while (fromRight ? index-- : ++index < length) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }

    return collection;
  };
}

var _createBaseEach = createBaseEach;
/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */

var baseEach = _createBaseEach(_baseForOwn);

var _baseEach = baseEach;
/**
 * Casts `value` to `identity` if it's not a function.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Function} Returns cast function.
 */

function castFunction(value) {
  return typeof value == 'function' ? value : identity_1;
}

var _castFunction = castFunction;
/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length"
 * property are iterated like arrays. To avoid this behavior use `_.forIn`
 * or `_.forOwn` for object iteration.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @alias each
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @see _.forEachRight
 * @example
 *
 * _.forEach([1, 2], function(value) {
 *   console.log(value);
 * });
 * // => Logs `1` then `2`.
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */

function forEach(collection, iteratee) {
  var func = isArray_1(collection) ? _arrayEach : _baseEach;
  return func(collection, _castFunction(iteratee));
}

var forEach_1 = forEach;
var each = forEach_1;

function MergeClasses(Vue, options) {
  Vue.prototype.$mergeClasses = function () {
    var classes = {};
    each([].slice.call(arguments), function (arg) {
      if (isObject_1(arg)) {
        extend(classes, arg);
      } else if (isArray_1(arg)) {
        merge_1(classes, arg);
      } else if (arg) {
        classes[arg] = true;
      }
    });
    return classes;
  };
}
/**
 * Used by `_.defaultsDeep` to customize its `_.merge` use to merge source
 * objects into destination objects that are passed thru.
 *
 * @private
 * @param {*} objValue The destination value.
 * @param {*} srcValue The source value.
 * @param {string} key The key of the property to merge.
 * @param {Object} object The parent object of `objValue`.
 * @param {Object} source The parent object of `srcValue`.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 * @returns {*} Returns the value to assign.
 */


function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
  if (isObject_1(objValue) && isObject_1(srcValue)) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, objValue);

    _baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack);

    stack['delete'](srcValue);
  }

  return objValue;
}

var _customDefaultsMerge = customDefaultsMerge;
/**
 * This method is like `_.merge` except that it accepts `customizer` which
 * is invoked to produce the merged values of the destination and source
 * properties. If `customizer` returns `undefined`, merging is handled by the
 * method instead. The `customizer` is invoked with six arguments:
 * (objValue, srcValue, key, object, source, stack).
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} sources The source objects.
 * @param {Function} customizer The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @example
 *
 * function customizer(objValue, srcValue) {
 *   if (_.isArray(objValue)) {
 *     return objValue.concat(srcValue);
 *   }
 * }
 *
 * var object = { 'a': [1], 'b': [2] };
 * var other = { 'a': [3], 'b': [4] };
 *
 * _.mergeWith(object, other, customizer);
 * // => { 'a': [1, 3], 'b': [2, 4] }
 */

var mergeWith = _createAssigner(function (object, source, srcIndex, customizer) {
  _baseMerge(object, source, srcIndex, customizer);
});

var mergeWith_1 = mergeWith;
/**
 * This method is like `_.defaults` except that it recursively assigns
 * default properties.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 3.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.defaults
 * @example
 *
 * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
 * // => { 'a': { 'b': 2, 'c': 3 } }
 */

var defaultsDeep = _baseRest(function (args) {
  args.push(undefined, _customDefaultsMerge);
  return _apply(mergeWith_1, undefined, args);
});

var defaultsDeep_1 = defaultsDeep;
/** `Object#toString` result references. */

var stringTag$1 = '[object String]';
/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */

function isString(value) {
  return typeof value == 'string' || !isArray_1(value) && isObjectLike_1(value) && _baseGetTag(value) == stringTag$1;
}

var isString_1 = isString;
var ModalBody = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "modal-body"
    }, [_vm._t("default")], 2);
  },
  staticRenderFns: [],
  name: 'modal-body'
};
var ModalContent = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "modal-content"
    }, [_vm._t("default")], 2);
  },
  staticRenderFns: [],
  name: 'modal-content'
};
var ModalDialog = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "modal-dialog",
      attrs: {
        "role": "document"
      }
    }, [_vm._t("default")], 2);
  },
  staticRenderFns: [],
  name: 'modal-dialog'
};
var ModalHeader = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "modal-header"
    }, [_c('modal-title', [_vm._t("default")], 2), _vm._v(" "), _vm.closeable ? _c('button', {
      staticClass: "close",
      attrs: {
        "type": "button",
        "aria-label": "ariaLabel"
      },
      on: {
        "click": function click($event) {
          _vm.$emit('close');
        }
      }
    }, [_c('span', {
      attrs: {
        "aria-hidden": "true"
      }
    }, [_vm._v("×")])]) : _vm._e()], 1);
  },
  staticRenderFns: [],
  name: 'modal-header',
  props: {
    ariaLabel: {
      type: String,
      default: 'Close'
    },
    closeable: {
      type: Boolean,
      default: true
    }
  }
};
var ModalFooter = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "modal-footer"
    }, [_vm._t("default")], 2);
  },
  staticRenderFns: [],
  name: 'modal-footer'
};

function duration(el) {
  var duration = getComputedStyle(el).transitionDuration;
  var numeric = parseFloat(duration, 10) || 0;
  var unit = duration.match(/m?s/);

  switch (unit[0]) {
    case 's':
      return numeric * 1000;

    case 'ms':
      return numeric;
  }
}

function transition(el) {
  return new Promise(function (resolve, reject) {
    try {
      var delay = duration(el);
      setTimeout(function () {
        return resolve(delay);
      }, delay);
    } catch (e) {
      reject(e);
    }
  });
}

var Modal = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', [_vm.isShowing ? _c('modal-backdrop', {
      attrs: {
        "fade": _vm.fade,
        "show": _vm.show
      },
      on: {
        "click": function click($event) {
          if ($event.target !== $event.currentTarget) {
            return null;
          }

          return _vm.onEsc($event);
        }
      }
    }) : _vm._e(), _vm._v(" "), _c('div', {
      staticClass: "modal",
      class: _vm.classes,
      style: _vm.styles,
      attrs: {
        "tabindex": "-1",
        "role": "dialog"
      },
      on: {
        "keydown": function keydown($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "esc", 27, $event.key, "Escape")) {
            return null;
          }

          return _vm.onEsc($event);
        }
      }
    }, [_c('modal-dialog', {
      class: {
        'modal-dialog-centered': _vm.center
      }
    }, [_c('modal-content', [_vm.header ? _vm._t("header", [_c('modal-header', {
      on: {
        "close": _vm.cancel
      }
    }, [_vm._v(_vm._s(_vm.title))])]) : _vm._e(), _vm._v(" "), _c(!_vm.flush ? 'modal-body' : 'div', {
      tag: "component",
      staticClass: "child-component"
    }, [_vm._t("default")], 2), _vm._v(" "), _vm.footer ? _vm._t("footer", [_vm.type === 'confirm' || _vm.type === 'prompt' ? [_c('modal-footer', [_c('btn', {
      attrs: {
        "type": "button",
        "variant": "secondary"
      },
      on: {
        "click": _vm.cancel
      }
    }, [_vm._v(_vm._s(_vm.cancelLabel))]), _vm._v(" "), _c('activity-button', {
      attrs: {
        "activity": _vm.activity,
        "variant": "primary"
      },
      on: {
        "click": _vm.confirm
      }
    }, [_vm._v(_vm._s(_vm.okLabel))])], 1)] : [_c('modal-footer', [_c('activity-button', {
      attrs: {
        "activity": _vm.activity,
        "variant": "primary"
      },
      on: {
        "click": _vm.confirm
      }
    }, [_vm._v(_vm._s(_vm.okLabel))])], 1)]]) : _vm._e()], 2)], 1)], 1)], 1);
  },
  staticRenderFns: [],
  name: 'modal',
  components: {
    ModalBody: ModalBody,
    ModalContent: ModalContent,
    ModalDialog: ModalDialog,
    ModalHeader: ModalHeader,
    ModalFooter: ModalFooter
  },
  watch: {
    show: function show(value) {
      var _this = this;

      this.isDisplaying = value;
      value && this.$nextTick(function () {
        _this.focus();
      });
    },
    isShowing: function isShowing(value) {
      if (value) {
        document.querySelector('body').classList.add('modal-open');
      } else {
        document.querySelector('body').classList.remove('modal-open');
      }

      this.$emit('update:show', value);
    }
  },
  props: {
    /**
     * Show the modal activity indicator.
     *
     * @property Boolean
     */
    activity: Boolean,

    /**
     * Is the modal centered in the screen.
     *
     * @property Boolean
     */
    center: Boolean,

    /**
     * Is the modal content fluid
     *
     * @property Boolean
     */
    fluid: Boolean,

    /**
     * Is the modal content flush with the modal edges? If true, no modal-body
     * will be used to wrap the content.
     *
     * @property Boolean
     */
    flush: Boolean,

    /**
     * Show the modal header
     *
     * @property Boolean
     */
    header: {
      type: Boolean,
      default: true
    },

    /**
     * The modal title.
     *
     * @property String
     */
    title: String,

    /**
     * Show the modal with a backdrop.
     *
     * @property Boolean
     */
    backdrop: {
      type: Boolean,
      default: true
    },

    /**
     * Hide the modal footer
     *
     * @property Boolean
     */
    footer: {
      type: Boolean,
      default: true
    },

    /**
     * Is the modal content fixed position
     *
     * @property Boolean
     */
    closeable: {
      type: Boolean,
      default: true
    },

    /**
     * Show the modal with a fade effect.
     *
     * @property Boolean
     */
    fade: {
      type: Boolean,
      default: true
    },

    /**
     * Is the modal showing.
     *
     * @property Boolean
     */
    show: {
      type: Boolean,
      default: true
    },

    /**
     * The ok label text.
     *
     * @property String
     */
    okLabel: {
      type: String,
      default: 'Ok'
    },

    /**
     * The cancel label text.
     *
     * @property String
     */
    cancelLabel: {
      type: String,
      default: 'Cancel'
    },

    /**
     * Is the modal type.
     *
     * @property Boolean
     */
    type: {
      type: [Boolean, String],
      default: false,
      validate: function validate(value) {
        return ['none', 'alert', 'confirm', 'prompt'].indexOf(value) !== -1;
      }
    }
  },
  methods: {
    /**
     * Confirm the modal
     *
     * @return void
     */
    confirm: function confirm(event) {
      this.$emit('confirm', event, this);
    },

    /**
     * Focus on the first field in the modal (if exists).
     *
     * @return void
     */
    focus: function focus() {
      var el = this.$el.querySelector('.form-control, input, select, textarea');

      if (el) {
        el.focus();
      } else {
        this.$el.querySelector('.modal').focus();
      }
    },

    /**
     * Show the modal
     *
     * @return void
     */
    open: function open(contents, options) {
      this.$mount(document.body.appendChild(document.createElement('div')));

      if (contents.$mount) {
        contents.$parent = this;
        contents.$mount(this.$el.querySelector('.child-component').appendChild(document.createElement('div')));
      }

      this.focus();
      this.$emit('open');
    },

    /**
     * Cancel the modal
     *
     * @return void
     */
    cancel: function cancel(event) {
      this.$emit('cancel', event, this);
      this.close(event);
    },

    /**
     * Close the modal
     *
     * @return void
     */
    close: function close(event) {
      var _this2 = this;

      return this.hide().then(function (delay) {
        _this2.isShowing = false;
        _this2.isDisplaying = false;

        _this2.$emit('close', event, _this2);
      });
    },

    /**
     * Hide the modal
     *
     * @return void
     */
    hide: function hide() {
      return (this.isShowing = false) || transition(this.$el.querySelector('.modal'));
    },

    /**
     * A callback for the escape function.
     *
     * @return void
     */
    onEsc: function onEsc(event) {
      this.type === 'confirm' || this.type === 'prompt' ? this.cancel(event) : this.close(event);
    }
  },
  computed: {
    classes: function classes() {
      return {
        'fade': this.fade,
        'show': this.isShowing
      };
    },
    styles: function styles() {
      return {
        display: this.isDisplaying ? 'block' : 'none'
      };
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    this.show && this.focus();
    this.$nextTick(function () {
      var form = _this3.$el.querySelector('form');

      if (form) {
        form.addEventListener('submit', function (event) {
          event.preventDefault();

          _this3.confirm(event);
        });
      }

      if (_this3.show) {
        _this3.$nextTick(function () {
          _this3.isShowing = true;
        });
      }
    });
  },
  data: function data() {
    return {
      isShowing: false,
      isDisplaying: this.show
    };
  },
  beforeRouteLeave: function beforeRouteLeave(to, from, next) {
    modal.close();
  }
};

function ensure(options, values) {
  if (!options) {
    options = {};
  }

  return {
    propsData: defaultsDeep_1(options.propsData || options, values || {})
  };
}

function modal$1(Vue, options) {
  function promise(modal) {
    var promise = new Promise(function (resolve, reject) {
      var preventDefault = false;

      function finish(modal) {
        if (!preventDefault) {
          modal.close();
        }
      }

      modal.preventDefault = function () {
        return preventDefault = true;
      };

      modal.$on('confirm', function (event) {
        promise.then(finish);
        resolve(modal);
      });
      modal.$on('cancel', function (event) {
        reject(modal);
      });
    });
    return promise;
  }

  Vue.prototype.$modal = function (title, content, options, modalOptions, ModalComponent) {
    var _this = this;

    if (isString_1(content)) {
      content = Vue.extend({
        template: "<div>".concat(content, "</div>")
      });
    }

    var component = function component(vue, options) {
      if (!(vue instanceof Vue) && isObject_1(vue)) {
        vue = Vue.extend(vue);
        vue.options.route = _this.$route;
        vue.options.router = _this.$router;
      }

      return isFunction_1(vue) ? new vue(options) : vue;
    };

    var modal = component(ModalComponent || Modal, ensure(modalOptions));
    modal.$content = component(content, ensure(options));
    modal.open(modal.$content);
    modal.$on('cancel', function (event) {
      modal.$content.$emit('modal:cancel');
    });
    modal.$on('close', function (event) {
      modal.$content.$emit('modal:close');
    });
    modal.$on('confirm', function (event) {
      modal.$content.$emit('modal:confirm');
    });
    modal.$content.$on('modal:close', function (event) {
      modal.close();
    });
    return modal;
  };

  Vue.prototype.$alert = function (title, content, options, modalOptions, ModalComponent) {
    return promise(this.$modal(title, content, options, ensure({
      type: 'alert',
      title: title
    }, modalOptions), ModalComponent));
  };

  Vue.prototype.$confirm = function (title, content, options, modalOptions, ModalComponent) {
    return promise(this.$modal(title, content, options, ensure({
      type: 'confirm',
      title: title
    }, modalOptions), ModalComponent));
  };

  Vue.prototype.$prompt = function (title, content, options, modalOptions, ModalComponent) {
    return promise(this.$modal(title, content, options, ensure({
      type: 'prompt',
      title: title
    }, modalOptions), ModalComponent));
  };
}

var Overlay = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "overlay",
      class: {
        'show': _vm.isVisible
      },
      style: {
        background: _vm.background
      },
      on: {
        "keyup": function keyup($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "esc", 27, $event.key, "Escape")) {
            return null;
          }

          return function (event) {
            return _vm.closeable && _vm.hide();
          }($event);
        }
      }
    }, [_vm.closeable ? _c('button', {
      staticClass: "btn btn-link overlay-close",
      attrs: {
        "type": "button"
      },
      on: {
        "click": _vm.onClickClose
      }
    }, [_c('i', {
      staticClass: "fa fa-times-circle"
    })]) : _vm._e(), _vm._v(" "), _c('div', {
      staticClass: "overlay-content container",
      class: {
        'fixed': _vm.fixedContent
      },
      style: {
        minHeight: _vm.minHeight
      }
    }, [_vm._t("default")], 2)]);
  },
  staticRenderFns: [],
  name: 'overlay',
  props: {
    /**
     * The overlay background color.
     *
     * @property String
     */
    background: {
      type: String,
      default: 'rgba(255, 255, 255, .925)'
    },

    /**
     * Is the overlay showing.
     *
     * @property Boolean
     */
    visible: Boolean,

    /**
     * Is the overlay content fixed position
     *
     * @property Boolean
     */
    fixedContent: Boolean,

    /**
     * Is the overlay content fixed position
     *
     * @property Boolean
     */
    closeable: {
      type: Boolean,
      default: true
    },

    /**
     * Is the overlay content minimum height.
     *
     * @property Boolean
     */
    minHeight: [String, Number]
  },
  watch: {
    visible: function visible(value) {
      (this.isVisible = value) && this.focus();
    }
  },
  methods: {
    focus: function focus() {
      var el = this.$el.querySelector('.form-control, input, select, textarea');

      if (el) {
        el.focus();
      }
    },

    /**
     * Show the overlay
     *
     * @return void
     */
    show: function show(contents, options) {
      this.$mount(document.body.appendChild(document.createElement('div')));

      if (contents.$mount) {
        contents.$parent = this;
        contents.$mount(this.$el.querySelector('.overlay-content').appendChild(document.createElement('div')));
      }

      this.focus();
      this.$emit('show');
      this.$emit('update:visible', this.isVisible = true);
    },

    /**
     * Hide the overlay
     *
     * @return void
     */
    hide: function hide() {
      this.$emit('hide');
      this.$emit('update:visible', this.isVisible = false);
    },

    /**
     * The callback for the `click` event on the close button.
     *
     * @return void
     */
    onClickClose: function onClickClose() {
      this.$emit('click:close');
      this.hide();
    }
  },
  mounted: function mounted() {
    this.visible && this.focus();
  },
  data: function data() {
    return {
      isVisible: this.visible
    };
  }
};

function overlay(Vue, options) {
  Vue.prototype.$overlay = function (ContentComponent, options, overlayOptions, CustomOverlayComponent) {
    var _this = this;

    var component = function component(vue, options) {
      if (!(vue instanceof Vue) && isObject_1(vue)) {
        vue = Vue.extend(vue);
        vue.options.route = _this.$route;
        vue.options.router = _this.$router;
      }

      return isFunction_1(vue) ? new vue(options) : vue;
    };

    var overlay = component(CustomOverlayComponent || Overlay, overlayOptions);
    overlay.$content = component(ContentComponent, options);
    overlay.show(overlay.$content);
    return overlay;
  };
}

var plugins =
/*#__PURE__*/
Object.freeze({
  mergeClasses: MergeClasses,
  modal: modal$1,
  overlay: overlay
});

function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties$1(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass$1(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$1(Constructor, staticProps);
  return Constructor;
}

function _defineProperty$1$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits$1(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _assertThisInitialized$1(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn$1(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized$1(self);
}
/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */


function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array == null ? 0 : array.length;

  if (initAccum && length) {
    accumulator = array[++index];
  }

  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }

  return accumulator;
}

var _arrayReduce = arrayReduce;
/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */

function basePropertyOf(object) {
  return function (key) {
    return object == null ? undefined : object[key];
  };
}

var _basePropertyOf = basePropertyOf;
/** Used to map Latin Unicode letters to basic Latin letters. */

var deburredLetters = {
  // Latin-1 Supplement block.
  '\xc0': 'A',
  '\xc1': 'A',
  '\xc2': 'A',
  '\xc3': 'A',
  '\xc4': 'A',
  '\xc5': 'A',
  '\xe0': 'a',
  '\xe1': 'a',
  '\xe2': 'a',
  '\xe3': 'a',
  '\xe4': 'a',
  '\xe5': 'a',
  '\xc7': 'C',
  '\xe7': 'c',
  '\xd0': 'D',
  '\xf0': 'd',
  '\xc8': 'E',
  '\xc9': 'E',
  '\xca': 'E',
  '\xcb': 'E',
  '\xe8': 'e',
  '\xe9': 'e',
  '\xea': 'e',
  '\xeb': 'e',
  '\xcc': 'I',
  '\xcd': 'I',
  '\xce': 'I',
  '\xcf': 'I',
  '\xec': 'i',
  '\xed': 'i',
  '\xee': 'i',
  '\xef': 'i',
  '\xd1': 'N',
  '\xf1': 'n',
  '\xd2': 'O',
  '\xd3': 'O',
  '\xd4': 'O',
  '\xd5': 'O',
  '\xd6': 'O',
  '\xd8': 'O',
  '\xf2': 'o',
  '\xf3': 'o',
  '\xf4': 'o',
  '\xf5': 'o',
  '\xf6': 'o',
  '\xf8': 'o',
  '\xd9': 'U',
  '\xda': 'U',
  '\xdb': 'U',
  '\xdc': 'U',
  '\xf9': 'u',
  '\xfa': 'u',
  '\xfb': 'u',
  '\xfc': 'u',
  '\xdd': 'Y',
  '\xfd': 'y',
  '\xff': 'y',
  '\xc6': 'Ae',
  '\xe6': 'ae',
  '\xde': 'Th',
  '\xfe': 'th',
  '\xdf': 'ss',
  // Latin Extended-A block.
  "\u0100": 'A',
  "\u0102": 'A',
  "\u0104": 'A',
  "\u0101": 'a',
  "\u0103": 'a',
  "\u0105": 'a',
  "\u0106": 'C',
  "\u0108": 'C',
  "\u010A": 'C',
  "\u010C": 'C',
  "\u0107": 'c',
  "\u0109": 'c',
  "\u010B": 'c',
  "\u010D": 'c',
  "\u010E": 'D',
  "\u0110": 'D',
  "\u010F": 'd',
  "\u0111": 'd',
  "\u0112": 'E',
  "\u0114": 'E',
  "\u0116": 'E',
  "\u0118": 'E',
  "\u011A": 'E',
  "\u0113": 'e',
  "\u0115": 'e',
  "\u0117": 'e',
  "\u0119": 'e',
  "\u011B": 'e',
  "\u011C": 'G',
  "\u011E": 'G',
  "\u0120": 'G',
  "\u0122": 'G',
  "\u011D": 'g',
  "\u011F": 'g',
  "\u0121": 'g',
  "\u0123": 'g',
  "\u0124": 'H',
  "\u0126": 'H',
  "\u0125": 'h',
  "\u0127": 'h',
  "\u0128": 'I',
  "\u012A": 'I',
  "\u012C": 'I',
  "\u012E": 'I',
  "\u0130": 'I',
  "\u0129": 'i',
  "\u012B": 'i',
  "\u012D": 'i',
  "\u012F": 'i',
  "\u0131": 'i',
  "\u0134": 'J',
  "\u0135": 'j',
  "\u0136": 'K',
  "\u0137": 'k',
  "\u0138": 'k',
  "\u0139": 'L',
  "\u013B": 'L',
  "\u013D": 'L',
  "\u013F": 'L',
  "\u0141": 'L',
  "\u013A": 'l',
  "\u013C": 'l',
  "\u013E": 'l',
  "\u0140": 'l',
  "\u0142": 'l',
  "\u0143": 'N',
  "\u0145": 'N',
  "\u0147": 'N',
  "\u014A": 'N',
  "\u0144": 'n',
  "\u0146": 'n',
  "\u0148": 'n',
  "\u014B": 'n',
  "\u014C": 'O',
  "\u014E": 'O',
  "\u0150": 'O',
  "\u014D": 'o',
  "\u014F": 'o',
  "\u0151": 'o',
  "\u0154": 'R',
  "\u0156": 'R',
  "\u0158": 'R',
  "\u0155": 'r',
  "\u0157": 'r',
  "\u0159": 'r',
  "\u015A": 'S',
  "\u015C": 'S',
  "\u015E": 'S',
  "\u0160": 'S',
  "\u015B": 's',
  "\u015D": 's',
  "\u015F": 's',
  "\u0161": 's',
  "\u0162": 'T',
  "\u0164": 'T',
  "\u0166": 'T',
  "\u0163": 't',
  "\u0165": 't',
  "\u0167": 't',
  "\u0168": 'U',
  "\u016A": 'U',
  "\u016C": 'U',
  "\u016E": 'U',
  "\u0170": 'U',
  "\u0172": 'U',
  "\u0169": 'u',
  "\u016B": 'u',
  "\u016D": 'u',
  "\u016F": 'u',
  "\u0171": 'u',
  "\u0173": 'u',
  "\u0174": 'W',
  "\u0175": 'w',
  "\u0176": 'Y',
  "\u0177": 'y',
  "\u0178": 'Y',
  "\u0179": 'Z',
  "\u017B": 'Z',
  "\u017D": 'Z',
  "\u017A": 'z',
  "\u017C": 'z',
  "\u017E": 'z',
  "\u0132": 'IJ',
  "\u0133": 'ij',
  "\u0152": 'Oe',
  "\u0153": 'oe',
  "\u0149": "'n",
  "\u017F": 's'
};
/**
 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
 * letters to basic Latin letters.
 *
 * @private
 * @param {string} letter The matched letter to deburr.
 * @returns {string} Returns the deburred letter.
 */

var deburrLetter = _basePropertyOf(deburredLetters);

var _deburrLetter = deburrLetter;
/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */

function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }

  return result;
}

var _arrayMap = arrayMap;
/** `Object#toString` result references. */

var symbolTag = '[object Symbol]';
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */

function isSymbol(value) {
  return _typeof(value) == 'symbol' || isObjectLike_1(value) && _baseGetTag(value) == symbolTag;
}

var isSymbol_1 = isSymbol;
/** Used as references for various `Number` constants. */

var INFINITY = 1 / 0;
/** Used to convert symbols to primitives and strings. */

var symbolProto = _Symbol ? _Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;
/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */

function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }

  if (isArray_1(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return _arrayMap(value, baseToString) + '';
  }

  if (isSymbol_1(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }

  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

var _baseToString = baseToString;
/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */

function toString(value) {
  return value == null ? '' : _baseToString(value);
}

var toString_1 = toString;
/** Used to match Latin Unicode letters (excluding mathematical operators). */

var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
/** Used to compose unicode character classes. */

var rsComboMarksRange = "\\u0300-\\u036f",
    reComboHalfMarksRange = "\\ufe20-\\ufe2f",
    rsComboSymbolsRange = "\\u20d0-\\u20ff",
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
/** Used to compose unicode capture groups. */

var rsCombo = '[' + rsComboRange + ']';
/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */

var reComboMark = RegExp(rsCombo, 'g');
/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to deburr.
 * @returns {string} Returns the deburred string.
 * @example
 *
 * _.deburr('déjà vu');
 * // => 'deja vu'
 */

function deburr(string) {
  string = toString_1(string);
  return string && string.replace(reLatin, _deburrLetter).replace(reComboMark, '');
}

var deburr_1 = deburr;
/** Used to match words composed of alphanumeric characters. */

var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
/**
 * Splits an ASCII `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */

function asciiWords(string) {
  return string.match(reAsciiWord) || [];
}

var _asciiWords = asciiWords;
/** Used to detect strings that need a more robust regexp to match words. */

var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
/**
 * Checks if `string` contains a word composed of Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a word is found, else `false`.
 */

function hasUnicodeWord(string) {
  return reHasUnicodeWord.test(string);
}

var _hasUnicodeWord = hasUnicodeWord;
/** Used to compose unicode character classes. */

var rsAstralRange = "\\ud800-\\udfff",
    rsComboMarksRange$1 = "\\u0300-\\u036f",
    reComboHalfMarksRange$1 = "\\ufe20-\\ufe2f",
    rsComboSymbolsRange$1 = "\\u20d0-\\u20ff",
    rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1,
    rsDingbatRange = "\\u2700-\\u27bf",
    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
    rsPunctuationRange = "\\u2000-\\u206f",
    rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
    rsVarRange = "\\ufe0e\\ufe0f",
    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
/** Used to compose unicode capture groups. */

var rsApos = "['\u2019]",
    rsBreak = '[' + rsBreakRange + ']',
    rsCombo$1 = '[' + rsComboRange$1 + ']',
    rsDigits = '\\d+',
    rsDingbat = '[' + rsDingbatRange + ']',
    rsLower = '[' + rsLowerRange + ']',
    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
    rsFitz = "\\ud83c[\\udffb-\\udfff]",
    rsModifier = '(?:' + rsCombo$1 + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}",
    rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]",
    rsUpper = '[' + rsUpperRange + ']',
    rsZWJ = "\\u200d";
/** Used to compose unicode regexes. */

var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
    rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
    rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
    rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
    reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
    rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq;
/** Used to match complex or compound words. */

var reUnicodeWord = RegExp([rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')', rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')', rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower, rsUpper + '+' + rsOptContrUpper, rsOrdUpper, rsOrdLower, rsDigits, rsEmoji].join('|'), 'g');
/**
 * Splits a Unicode `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */

function unicodeWords(string) {
  return string.match(reUnicodeWord) || [];
}

var _unicodeWords = unicodeWords;
/**
 * Splits `string` into an array of its words.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * _.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * _.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */

function words(string, pattern, guard) {
  string = toString_1(string);
  pattern = guard ? undefined : pattern;

  if (pattern === undefined) {
    return _hasUnicodeWord(string) ? _unicodeWords(string) : _asciiWords(string);
  }

  return string.match(pattern) || [];
}

var words_1 = words;
/** Used to compose unicode capture groups. */

var rsApos$1 = "['\u2019]";
/** Used to match apostrophes. */

var reApos = RegExp(rsApos$1, 'g');
/**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */

function createCompounder(callback) {
  return function (string) {
    return _arrayReduce(words_1(deburr_1(string).replace(reApos, '')), callback, '');
  };
}

var _createCompounder = createCompounder;
/**
 * Converts `string` to
 * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the kebab cased string.
 * @example
 *
 * _.kebabCase('Foo Bar');
 * // => 'foo-bar'
 *
 * _.kebabCase('fooBar');
 * // => 'foo-bar'
 *
 * _.kebabCase('__FOO_BAR__');
 * // => 'foo-bar'
 */

var kebabCase = _createCompounder(function (result, word, index) {
  return result + (index ? '-' : '') + word.toLowerCase();
});

var kebabCase_1 = kebabCase;
var BaseType = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "activity-indicator",
      class: _vm.classes
    }, _vm._l(_vm.nodes, function (i) {
      return _c('div');
    }));
  },
  staticRenderFns: [],
  props: {
    nodes: {
      type: Number,
      default: 3
    },
    size: {
      type: String,
      default: ''
    },
    prefix: {
      type: String,
      default: 'activity-indicator-'
    }
  },
  computed: {
    classes: function classes() {
      var classes = {};
      classes[this.$options.name] = !!this.$options.name;
      classes[this.prefix + this.size.replace(this.prefix, '')] = !!this.size;
      return classes;
    }
  }
};
var ActivityIndicatorDots = {
  name: 'activity-indicator-dots',
  extends: BaseType
};
var ActivityIndicatorSpinner = {
  name: 'activity-indicator-spinner',
  extends: BaseType,
  props: extend({}, BaseType.props, {
    nodes: {
      type: Number,
      default: 12
    }
  })
};
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeIsFinite = _root.isFinite;
/**
 * Checks if `value` is a finite primitive number.
 *
 * **Note:** This method is based on
 * [`Number.isFinite`](https://mdn.io/Number/isFinite).
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
 * @example
 *
 * _.isFinite(3);
 * // => true
 *
 * _.isFinite(Number.MIN_VALUE);
 * // => true
 *
 * _.isFinite(Infinity);
 * // => false
 *
 * _.isFinite('3');
 * // => false
 */

function isFinite$1(value) {
  return typeof value == 'number' && nativeIsFinite(value);
}

var _isFinite = isFinite$1;

function unit(height) {
  return _isFinite(height) ? height + 'px' : height;
}

var ActivityIndicator = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _vm.center ? _c('div', {
      staticClass: "center-wrapper",
      class: {
        'position-relative': _vm.relative,
        'position-fixed': _vm.fixed
      },
      style: {
        minHeight: _vm.computedMinHeight
      }
    }, [_c('div', {
      staticClass: "center-content"
    }, [_c(_vm.component, {
      tag: "component",
      attrs: {
        "size": _vm.size,
        "prefix": _vm.prefix
      }
    })], 1)]) : _c(_vm.component, {
      tag: "component",
      style: {
        minHeight: _vm.computedMinHeight
      },
      attrs: {
        "size": _vm.size,
        "prefix": _vm.prefix
      }
    });
  },
  staticRenderFns: [],
  name: 'activity-indicator',
  extends: BaseType,
  props: {
    center: Boolean,
    fixed: Boolean,
    relative: Boolean,
    type: {
      type: String,
      default: 'dots'
    },
    minHeight: [String, Number]
  },
  components: {
    ActivityIndicatorDots: ActivityIndicatorDots,
    ActivityIndicatorSpinner: ActivityIndicatorSpinner
  },
  computed: {
    computedMinHeight: function computedMinHeight() {
      return unit(this.minHeight);
    },
    component: function component() {
      return kebabCase_1(this.prefix + this.type.replace(this.prefix, ''));
    }
  }
};
var loaded = {};

function element(url) {
  var script = document.createElement('script');
  script.setAttribute('src', url);
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('charset', 'utf-8');
  return script;
}

function append(script) {
  if (document.querySelector('head')) {
    document.querySelector('head').appendChild(script);
  } else {
    document.querySelector('body').appendChild(script);
  }

  return script;
}

function script(url) {
  if (loaded[url] instanceof Promise) {
    return loaded[url];
  }

  return loaded[url] = new Promise(function (resolve, reject) {
    try {
      if (!loaded[url]) {
        append(element(url)).addEventListener('load', function (event) {
          resolve(loaded[url] = event);
        });
      } else {
        resolve(loaded[url]);
      }
    } catch (e) {
      reject(e);
    }
  });
}

var VueInstaller = {
  use: use,
  script: script,
  plugin: plugin,
  plugins: plugins$1,
  filter: filter,
  filters: filters$1,
  component: component,
  components: components,
  directive: directive,
  directives: directives,
  $plugins: {},
  $filters: {},
  $directives: {},
  $components: {}
};

function use(plugin) {
  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
  }

  return plugin;
}

function plugin(Vue, name, def) {
  if (!VueInstaller.$plugins[name]) {
    Vue.use(VueInstaller.$plugins[name] = def);
  }
}

function plugins$1(Vue, plugins) {
  each(plugins, function (def, name) {
    plugin(Vue, name, def);
  });
}

function filter(Vue, name, def) {
  if (!VueInstaller.$filters[name]) {
    Vue.use(VueInstaller.$filters[name] = def);
  }
}

function filters$1(Vue, filters) {
  each(filters, function (def, name) {
    filter(Vue, name, def);
  });
}

function component(Vue, name, def) {
  if (!VueInstaller.$components[name]) {
    Vue.component(name, VueInstaller.$components[name] = def);
  }
}

function components(Vue, components) {
  each(components, function (def, name) {
    component(Vue, name, def);
  });
}

function directive(Vue, name, def) {
  if (!VueInstaller.$directives[name]) {
    if (isFunction_1(def)) {
      Vue.use(VueInstaller.$directives[name] = def);
    } else {
      Vue.directive(name, def);
    }
  }
}

function directives(Vue, directives) {
  each(directives, function (def, name) {
    directive(Vue, name, def);
  });
}

var plugin$1 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      ActivityIndicator: ActivityIndicator
    });
  }
});

var _props;

var convertAnimationDelayToInt = function convertAnimationDelayToInt(delay) {
  var num = parseFloat(delay, 10);
  var matches = delay.match(/m?s/);
  var unit = matches ? matches[0] : false;
  var milliseconds;

  switch (unit) {
    case "s":
      // seconds
      milliseconds = num * 1000;
      break;

    case "ms":
    default:
      milliseconds = num;
      break;
  }

  return milliseconds || 0;
};

var animated = function animated(el, callback) {
  var defaultView = (el.ownerDocument || document).defaultView;
  setTimeout(function () {
    callback.apply();
  }, convertAnimationDelayToInt(defaultView.getComputedStyle(el).animationDuration));
};

var ActivityButton = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('button', {
      staticClass: "btn",
      class: _vm.classes,
      attrs: {
        "type": _vm.type
      },
      on: {
        "click": _vm.onClick
      }
    }, [_vm._t("default", [_vm.icon ? _c('i', {
      class: _vm.icon
    }) : _vm._e(), _vm._v(" " + _vm._s(_vm.label))]), _vm._v(" "), _c('activity-indicator', {
      attrs: {
        "type": _vm.indicator
      }
    })], 2);
  },
  staticRenderFns: [],
  name: 'activity-button',
  components: {
    ActivityIndicator: ActivityIndicator
  },
  props: (_props = {
    /**
     * Should show the activity indicator inside the button.
     *
     * @property Boolean
     */
    activity: Boolean,

    /**
     * Should show the button as active.
     *
     * @property Boolean
     */
    disabled: Boolean
  }, _defineProperty$1$1(_props, "disabled", Boolean), _defineProperty$1$1(_props, "block", Boolean), _defineProperty$1$1(_props, "label", String), _defineProperty$1$1(_props, "icon", String), _defineProperty$1$1(_props, "type", String), _defineProperty$1$1(_props, "size", {
    type: String,
    default: 'md'
  }), _defineProperty$1$1(_props, "variant", {
    type: String,
    default: 'primary'
  }), _defineProperty$1$1(_props, "indicator", {
    type: String,
    default: 'spinner'
  }), _defineProperty$1$1(_props, "orientation", {
    type: String,
    default: 'right'
  }), _props),
  methods: {
    /**
     * Disable the button.
     *
     * @return void
     */
    disable: function disable() {
      this.$el.disabled = true;
    },

    /**
     * Enable the button.
     *
     * @return void
     */
    enable: function enable() {
      this.$el.disabled = false;
    },

    /**
     * Show the activity indicator inside the button.
     *
     * @return void
     */
    showActivity: function showActivity() {
      var _this = this;

      this.disable();
      animated(this.$el, function () {
        _this.$el.classList.add('btn-activity');

        _this.$emit('activity:show');
      });
    },

    /**
     * Hide the activity indicator inside the button.
     *
     * @return void
     */
    hideActivity: function hideActivity() {
      var _this2 = this;

      this.$el.classList.add('btn-hide-activity');
      animated(this.$el, function () {
        _this2.enable();

        _this2.$el.classList.remove('btn-activity', 'btn-hide-activity');

        _this2.$emit('activity:hide');
      });
    },

    /**
     * Disable the button.
     *
     * @return void
     */
    onClick: function onClick(event) {
      this.$emit('click', event, this);
    }
  },
  computed: {
    /**
     * An object of classes to append to the button.
     *
     * @return void
     */
    classes: function classes() {
      var classes = {
        'disabled': this.disabled,
        'active': this.active,
        'btn-block': this.block,
        'btn-activity': this.activity
      };
      classes['btn-' + this.size.replace('btn-', '')] = !!this.size;
      classes['btn-' + this.variant.replace('btn-', '')] = !!this.variant;
      classes['btn-activity-' + this.orientation.replace('btn-activity-', '')] = !!this.orientation;
      classes['btn-activity-indicator-' + this.indicator.replace('btn-activity-indicator-', '')] = !!this.indicator;
      return classes;
    }
  },
  watch: {
    activity: function activity(value) {
      if (value) {
        this.showActivity();
      } else {
        this.hideActivity();
      }
    }
  }
};
var plugin$2 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      ActivityButton: ActivityButton
    });
  }
});
/**
 * Checks if `value` is `undefined`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
 * @example
 *
 * _.isUndefined(void 0);
 * // => true
 *
 * _.isUndefined(null);
 * // => false
 */

function isUndefined(value) {
  return value === undefined;
}

var isUndefined_1 = isUndefined;
/** Used to stand-in for `undefined` hash values. */

var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';
/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */

function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED$2);

  return this;
}

var _setCacheAdd = setCacheAdd;
/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */

function setCacheHas(value) {
  return this.__data__.has(value);
}

var _setCacheHas = setCacheHas;
/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */

function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;
  this.__data__ = new _MapCache();

  while (++index < length) {
    this.add(values[index]);
  }
} // Add methods to `SetCache`.


SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd;
SetCache.prototype.has = _setCacheHas;
var _SetCache = SetCache;
/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */

function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }

  return false;
}

var _arraySome = arraySome;
/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

function cacheHas(cache, key) {
  return cache.has(key);
}

var _cacheHas = cacheHas;
/** Used to compose bitmasks for value comparisons. */

var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;
/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */

function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  } // Assume cyclic values are equal.


  var stacked = stack.get(array);

  if (stacked && stack.get(other)) {
    return stacked == other;
  }

  var index = -1,
      result = true,
      seen = bitmask & COMPARE_UNORDERED_FLAG ? new _SetCache() : undefined;
  stack.set(array, other);
  stack.set(other, array); // Ignore non-index properties.

  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }

    if (compared !== undefined) {
      if (compared) {
        continue;
      }

      result = false;
      break;
    } // Recursively compare arrays (susceptible to call stack limits).


    if (seen) {
      if (!_arraySome(other, function (othValue, othIndex) {
        if (!_cacheHas(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }

  stack['delete'](array);
  stack['delete'](other);
  return result;
}

var _equalArrays = equalArrays;
/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */

function mapToArray(map) {
  var index = -1,
      result = Array(map.size);
  map.forEach(function (value, key) {
    result[++index] = [key, value];
  });
  return result;
}

var _mapToArray = mapToArray;
/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */

function setToArray(set) {
  var index = -1,
      result = Array(set.size);
  set.forEach(function (value) {
    result[++index] = value;
  });
  return result;
}

var _setToArray = setToArray;
/** Used to compose bitmasks for value comparisons. */

var COMPARE_PARTIAL_FLAG$1 = 1,
    COMPARE_UNORDERED_FLAG$1 = 2;
/** `Object#toString` result references. */

var boolTag$1 = '[object Boolean]',
    dateTag$1 = '[object Date]',
    errorTag$1 = '[object Error]',
    mapTag$1 = '[object Map]',
    numberTag$1 = '[object Number]',
    regexpTag$1 = '[object RegExp]',
    setTag$1 = '[object Set]',
    stringTag$2 = '[object String]',
    symbolTag$1 = '[object Symbol]';
var arrayBufferTag$1 = '[object ArrayBuffer]',
    dataViewTag$1 = '[object DataView]';
/** Used to convert symbols to primitives and strings. */

var symbolProto$1 = _Symbol ? _Symbol.prototype : undefined,
    symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : undefined;
/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */

function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag$1:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }

      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag$1:
      if (object.byteLength != other.byteLength || !equalFunc(new _Uint8Array(object), new _Uint8Array(other))) {
        return false;
      }

      return true;

    case boolTag$1:
    case dateTag$1:
    case numberTag$1:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq_1(+object, +other);

    case errorTag$1:
      return object.name == other.name && object.message == other.message;

    case regexpTag$1:
    case stringTag$2:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == other + '';

    case mapTag$1:
      var convert = _mapToArray;

    case setTag$1:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1;
      convert || (convert = _setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      } // Assume cyclic values are equal.


      var stacked = stack.get(object);

      if (stacked) {
        return stacked == other;
      }

      bitmask |= COMPARE_UNORDERED_FLAG$1; // Recursively compare objects (susceptible to call stack limits).

      stack.set(object, other);

      var result = _equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);

      stack['delete'](object);
      return result;

    case symbolTag$1:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }

  }

  return false;
}

var _equalByTag = equalByTag;
/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */

function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }

  return array;
}

var _arrayPush = arrayPush;
/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */

function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
}

var _baseGetAllKeys = baseGetAllKeys;
/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */

function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];

    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }

  return result;
}

var _arrayFilter = arrayFilter;
/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */

function stubArray() {
  return [];
}

var stubArray_1 = stubArray;
/** Used for built-in method references. */

var objectProto$12 = Object.prototype;
/** Built-in value references. */

var propertyIsEnumerable$1 = objectProto$12.propertyIsEnumerable;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeGetSymbols = Object.getOwnPropertySymbols;
/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */

var getSymbols = !nativeGetSymbols ? stubArray_1 : function (object) {
  if (object == null) {
    return [];
  }

  object = Object(object);
  return _arrayFilter(nativeGetSymbols(object), function (symbol) {
    return propertyIsEnumerable$1.call(object, symbol);
  });
};
var _getSymbols = getSymbols;
/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */

function getAllKeys(object) {
  return _baseGetAllKeys(object, keys_1, _getSymbols);
}

var _getAllKeys = getAllKeys;
/** Used to compose bitmasks for value comparisons. */

var COMPARE_PARTIAL_FLAG$2 = 1;
/** Used for built-in method references. */

var objectProto$13 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$10 = objectProto$13.hasOwnProperty;
/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */

function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2,
      objProps = _getAllKeys(object),
      objLength = objProps.length,
      othProps = _getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }

  var index = objLength;

  while (index--) {
    var key = objProps[index];

    if (!(isPartial ? key in other : hasOwnProperty$10.call(other, key))) {
      return false;
    }
  } // Assume cyclic values are equal.


  var stacked = stack.get(object);

  if (stacked && stack.get(other)) {
    return stacked == other;
  }

  var result = true;
  stack.set(object, other);
  stack.set(other, object);
  var skipCtor = isPartial;

  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    } // Recursively compare objects (susceptible to call stack limits).


    if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }

    skipCtor || (skipCtor = key == 'constructor');
  }

  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor; // Non `Object` object instances with different constructors are not equal.

    if (objCtor != othCtor && 'constructor' in object && 'constructor' in other && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }

  stack['delete'](object);
  stack['delete'](other);
  return result;
}

var _equalObjects = equalObjects;
/* Built-in method references that are verified to be native. */

var DataView = _getNative(_root, 'DataView');

var _DataView = DataView;
/* Built-in method references that are verified to be native. */

var Promise$1 = _getNative(_root, 'Promise');

var _Promise = Promise$1;
/* Built-in method references that are verified to be native. */

var Set = _getNative(_root, 'Set');

var _Set = Set;
/* Built-in method references that are verified to be native. */

var WeakMap = _getNative(_root, 'WeakMap');

var _WeakMap = WeakMap;
/** `Object#toString` result references. */

var mapTag$2 = '[object Map]',
    objectTag$2 = '[object Object]',
    promiseTag = '[object Promise]',
    setTag$2 = '[object Set]',
    weakMapTag$1 = '[object WeakMap]';
var dataViewTag$2 = '[object DataView]';
/** Used to detect maps, sets, and weakmaps. */

var dataViewCtorString = _toSource(_DataView),
    mapCtorString = _toSource(_Map),
    promiseCtorString = _toSource(_Promise),
    setCtorString = _toSource(_Set),
    weakMapCtorString = _toSource(_WeakMap);
/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */


var getTag = _baseGetTag; // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.

if (_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag$2 || _Map && getTag(new _Map()) != mapTag$2 || _Promise && getTag(_Promise.resolve()) != promiseTag || _Set && getTag(new _Set()) != setTag$2 || _WeakMap && getTag(new _WeakMap()) != weakMapTag$1) {
  getTag = function getTag(value) {
    var result = _baseGetTag(value),
        Ctor = result == objectTag$2 ? value.constructor : undefined,
        ctorString = Ctor ? _toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag$2;

        case mapCtorString:
          return mapTag$2;

        case promiseCtorString:
          return promiseTag;

        case setCtorString:
          return setTag$2;

        case weakMapCtorString:
          return weakMapTag$1;
      }
    }

    return result;
  };
}

var _getTag = getTag;
/** Used to compose bitmasks for value comparisons. */

var COMPARE_PARTIAL_FLAG$3 = 1;
/** `Object#toString` result references. */

var argsTag$2 = '[object Arguments]',
    arrayTag$1 = '[object Array]',
    objectTag$3 = '[object Object]';
/** Used for built-in method references. */

var objectProto$14 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$11 = objectProto$14.hasOwnProperty;
/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */

function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray_1(object),
      othIsArr = isArray_1(other),
      objTag = objIsArr ? arrayTag$1 : _getTag(object),
      othTag = othIsArr ? arrayTag$1 : _getTag(other);
  objTag = objTag == argsTag$2 ? objectTag$3 : objTag;
  othTag = othTag == argsTag$2 ? objectTag$3 : othTag;
  var objIsObj = objTag == objectTag$3,
      othIsObj = othTag == objectTag$3,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer_1(object)) {
    if (!isBuffer_1(other)) {
      return false;
    }

    objIsArr = true;
    objIsObj = false;
  }

  if (isSameTag && !objIsObj) {
    stack || (stack = new _Stack());
    return objIsArr || isTypedArray_1(object) ? _equalArrays(object, other, bitmask, customizer, equalFunc, stack) : _equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }

  if (!(bitmask & COMPARE_PARTIAL_FLAG$3)) {
    var objIsWrapped = objIsObj && hasOwnProperty$11.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty$11.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new _Stack());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }

  if (!isSameTag) {
    return false;
  }

  stack || (stack = new _Stack());
  return _equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

var _baseIsEqualDeep = baseIsEqualDeep;
/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */

function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }

  if (value == null || other == null || !isObjectLike_1(value) && !isObjectLike_1(other)) {
    return value !== value && other !== other;
  }

  return _baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

var _baseIsEqual = baseIsEqual;
/** Used to compose bitmasks for value comparisons. */

var COMPARE_PARTIAL_FLAG$4 = 1,
    COMPARE_UNORDERED_FLAG$2 = 2;
/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */

function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }

  object = Object(object);

  while (index--) {
    var data = matchData[index];

    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
      return false;
    }
  }

  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new _Stack();

      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }

      if (!(result === undefined ? _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$4 | COMPARE_UNORDERED_FLAG$2, customizer, stack) : result)) {
        return false;
      }
    }
  }

  return true;
}

var _baseIsMatch = baseIsMatch;
/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */

function isStrictComparable(value) {
  return value === value && !isObject_1(value);
}

var _isStrictComparable = isStrictComparable;
/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */

function getMatchData(object) {
  var result = keys_1(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];
    result[length] = [key, value, _isStrictComparable(value)];
  }

  return result;
}

var _getMatchData = getMatchData;
/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */

function matchesStrictComparable(key, srcValue) {
  return function (object) {
    if (object == null) {
      return false;
    }

    return object[key] === srcValue && (srcValue !== undefined || key in Object(object));
  };
}

var _matchesStrictComparable = matchesStrictComparable;
/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */

function baseMatches(source) {
  var matchData = _getMatchData(source);

  if (matchData.length == 1 && matchData[0][2]) {
    return _matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }

  return function (object) {
    return object === source || _baseIsMatch(object, source, matchData);
  };
}

var _baseMatches = baseMatches;
/** Used to match property names within property paths. */

var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;
/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */

function isKey(value, object) {
  if (isArray_1(value)) {
    return false;
  }

  var type = _typeof(value);

  if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol_1(value)) {
    return true;
  }

  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}

var _isKey = isKey;
/** Error message constants. */

var FUNC_ERROR_TEXT = 'Expected a function';
/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */

function memoize(func, resolver) {
  if (typeof func != 'function' || resolver != null && typeof resolver != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }

  var memoized = function memoized() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }

    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };

  memoized.cache = new (memoize.Cache || _MapCache)();
  return memoized;
} // Expose `MapCache`.


memoize.Cache = _MapCache;
var memoize_1 = memoize;
/** Used as the maximum memoize cache size. */

var MAX_MEMOIZE_SIZE = 500;
/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */

function memoizeCapped(func) {
  var result = memoize_1(func, function (key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }

    return key;
  });
  var cache = result.cache;
  return result;
}

var _memoizeCapped = memoizeCapped;
/** Used to match property names within property paths. */

var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
/** Used to match backslashes in property paths. */

var reEscapeChar = /\\(\\)?/g;
/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */

var stringToPath = _memoizeCapped(function (string) {
  var result = [];

  if (string.charCodeAt(0) === 46
  /* . */
  ) {
      result.push('');
    }

  string.replace(rePropName, function (match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : number || match);
  });
  return result;
});

var _stringToPath = stringToPath;
/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */

function castPath(value, object) {
  if (isArray_1(value)) {
    return value;
  }

  return _isKey(value, object) ? [value] : _stringToPath(toString_1(value));
}

var _castPath = castPath;
/** Used as references for various `Number` constants. */

var INFINITY$1 = 1 / 0;
/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */

function toKey(value) {
  if (typeof value == 'string' || isSymbol_1(value)) {
    return value;
  }

  var result = value + '';
  return result == '0' && 1 / value == -INFINITY$1 ? '-0' : result;
}

var _toKey = toKey;
/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */

function baseGet(object, path) {
  path = _castPath(path, object);
  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[_toKey(path[index++])];
  }

  return index && index == length ? object : undefined;
}

var _baseGet = baseGet;
/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */

function get(object, path, defaultValue) {
  var result = object == null ? undefined : _baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

var get_1 = get;
/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */

function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

var _baseHasIn = baseHasIn;
/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */

function hasPath(object, path, hasFunc) {
  path = _castPath(path, object);
  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = _toKey(path[index]);

    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }

    object = object[key];
  }

  if (result || ++index != length) {
    return result;
  }

  length = object == null ? 0 : object.length;
  return !!length && isLength_1(length) && _isIndex(key, length) && (isArray_1(object) || isArguments_1(object));
}

var _hasPath = hasPath;
/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */

function hasIn(object, path) {
  return object != null && _hasPath(object, path, _baseHasIn);
}

var hasIn_1 = hasIn;
/** Used to compose bitmasks for value comparisons. */

var COMPARE_PARTIAL_FLAG$5 = 1,
    COMPARE_UNORDERED_FLAG$3 = 2;
/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */

function baseMatchesProperty(path, srcValue) {
  if (_isKey(path) && _isStrictComparable(srcValue)) {
    return _matchesStrictComparable(_toKey(path), srcValue);
  }

  return function (object) {
    var objValue = get_1(object, path);
    return objValue === undefined && objValue === srcValue ? hasIn_1(object, path) : _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$5 | COMPARE_UNORDERED_FLAG$3);
  };
}

var _baseMatchesProperty = baseMatchesProperty;
/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */

function baseProperty(key) {
  return function (object) {
    return object == null ? undefined : object[key];
  };
}

var _baseProperty = baseProperty;
/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */

function basePropertyDeep(path) {
  return function (object) {
    return _baseGet(object, path);
  };
}

var _basePropertyDeep = basePropertyDeep;
/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */

function property(path) {
  return _isKey(path) ? _baseProperty(_toKey(path)) : _basePropertyDeep(path);
}

var property_1 = property;
/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */

function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }

  if (value == null) {
    return identity_1;
  }

  if (_typeof(value) == 'object') {
    return isArray_1(value) ? _baseMatchesProperty(value[0], value[1]) : _baseMatches(value);
  }

  return property_1(value);
}

var _baseIteratee = baseIteratee;
/**
 * The opposite of `_.mapValues`; this method creates an object with the
 * same values as `object` and keys generated by running each own enumerable
 * string keyed property of `object` thru `iteratee`. The iteratee is invoked
 * with three arguments: (value, key, object).
 *
 * @static
 * @memberOf _
 * @since 3.8.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Object} Returns the new mapped object.
 * @see _.mapValues
 * @example
 *
 * _.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
 *   return key + value;
 * });
 * // => { 'a1': 1, 'b2': 2 }
 */

function mapKeys(object, iteratee) {
  var result = {};
  iteratee = _baseIteratee(iteratee, 3);

  _baseForOwn(object, function (value, key, object) {
    _baseAssignValue(result, iteratee(value, key, object), value);
  });

  return result;
}

var mapKeys_1 = mapKeys;
/**
 * Checks if `value` is `null`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
 * @example
 *
 * _.isNull(null);
 * // => true
 *
 * _.isNull(void 0);
 * // => false
 */

function isNull(value) {
  return value === null;
}

var isNull_1 = isNull;

function prefix(subject, prefix) {
  var delimeter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '-';

  var prefixer = function prefixer(value, key) {
    var string = key || value;
    return [prefix, string.replace(new RegExp("^".concat(prefix).concat(delimeter, "?")), '')].join(delimeter);
  };

  if (isNull_1(subject) || isUndefined_1(subject)) {
    return subject;
  }

  if (isObject_1(subject)) {
    return mapKeys_1(subject, prefixer);
  }

  return prefixer(subject);
}

var Variant = {
  props: {
    /**
     * The variant attribute
     *
     * @property String
     */
    variant: {
      type: String,
      default: 'primary'
    }
  },
  computed: {
    variantClassPrefix: function variantClassPrefix() {
      return this.$options.name;
    },
    variantClass: function variantClass() {
      return prefix(this.variant, this.variantClassPrefix);
    }
  }
};
var Alert = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "alert",
      class: _vm.$mergeClasses(_vm.variantClass, {
        show: _vm.isVisible,
        fade: _vm.fade
      }),
      attrs: {
        "role": "alert"
      }
    }, [_vm._t("default"), _vm._v(" "), _vm.dismissible ? _c('alert-close', {
      on: {
        "click": function click($event) {
          _vm.dismiss();
        }
      }
    }) : _vm._e(), _vm._v(" "), typeof _vm.show === 'number' ? _c('progress-bar', {
      staticClass: "my-3",
      attrs: {
        "variant": _vm.variant,
        "height": 5,
        "value": _vm.dismissCount,
        "max": _vm.show
      }
    }) : _vm._e()], 2);
  },
  staticRenderFns: [],
  name: 'alert',
  mixins: [Variant],
  props: {
    /**
     * Is the alert dismissible
     *
     * @property Boolean
     */
    dismissible: Boolean,

    /**
     * Should the alert fade when hidden
     *
     * @property Boolean
     */
    fade: {
      type: Boolean,
      default: true
    },

    /**
     * Should the alert be visible by default. If passed a number, alert
     * will be shown for the number of seconds that are passed.
     *
     * @property Boolean
     */
    show: {
      type: [Number, Boolean],
      default: true
    }
  },
  methods: {
    dismiss: function dismiss() {
      var _this = this;

      transition(this.$el).then(function (delay) {
        _this.$emit('dismissed');
      });
      this.$emit('update:visible', this.isVisible = false);
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    if (typeof this.show === 'number') {
      var el = this.$el.querySelector('.progress-bar');
      this.$emit('dismiss-countdown', this.dismissCount = this.show);
      var interval = setInterval(function () {
        _this2.$emit('dismiss-countdown', _this2.dismissCount -= 1);

        if (!_this2.dismissCount) {
          clearInterval(interval);
          transition(el).then(function (delay) {
            return _this2.dismiss();
          });
        }
      }, 1000);
    }
  },
  data: function data() {
    return {
      dismissCount: this.show,
      isVisible: this.show
    };
  }
};
var AlertLink = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('a', {
      staticClass: "alert-link"
    }, [_vm._t("default")], 2);
  },
  staticRenderFns: [],
  name: 'alert-link'
};
var AlertClose = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('button', {
      staticClass: "close",
      attrs: {
        "type": "button",
        "data-dismiss": "alert",
        "aria-label": "Close"
      },
      on: {
        "click": _vm.onClick
      }
    }, [_c('span', {
      attrs: {
        "aria-hidden": "true"
      }
    }, [_vm._v("×")])]);
  },
  staticRenderFns: [],
  name: 'alert-close',
  methods: {
    onClick: function onClick(event) {
      this.$emit('click', event);
    }
  }
};
var AlertHeading = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('h4', {
      staticClass: "alert-heading"
    }, [_vm._t("default")], 2);
  },
  staticRenderFns: [],
  name: 'alert-heading'
};
var plugin$3 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Alert: Alert,
      AlertLink: AlertLink,
      AlertClose: AlertClose,
      AlertHeading: AlertHeading
    });
  }
});
var Badge = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _vm.href ? _c('a', {
      staticClass: "badge",
      class: _vm.$mergeClasses(_vm.classes, _vm.variantClass),
      attrs: {
        "href": _vm.href
      }
    }, [_vm._t("default", [_vm._v(_vm._s(_vm.label))]), _vm._v(" "), _c('span', {
      staticClass: "sr-only",
      domProps: {
        "innerHTML": _vm._s(_vm.accessibility)
      }
    })], 2) : _c('span', {
      staticClass: "badge",
      class: _vm.$mergeClasses(_vm.classes, _vm.variantClass)
    }, [_vm._t("default", [_vm._v(_vm._s(_vm.label))]), _vm._v(" "), _c('span', {
      staticClass: "sr-only",
      domProps: {
        "innerHTML": _vm._s(_vm.accessibility)
      }
    })], 2);
  },
  staticRenderFns: [],
  name: 'badge',
  mixins: [Variant],
  props: {
    /**
     * The screen reader accessibility label.
     *
     * @property String
     */
    accessibility: String,

    /**
     * If an href attribute is passed, the badge becomes an anchor.
     *
     * @property String
     */
    href: String,

    /**
     * The badge appear as pill shaped.
     *
     * @property String
     */
    pill: Boolean,

    /**
     * The badge label.
     *
     * @property String
     */
    label: [Number, String],

    /**
     * The badge appear as secondary in size to the parent element.
     *
     * @property String
     */
    secondary: Boolean
  },
  computed: {
    classes: function classes() {
      return prefix({
        'pill': this.pill,
        'secondary': this.secondary
      }, this.$options.name);
    }
  }
};
var plugin$4 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Badge: Badge
    });
  }
});
/**
 * The base implementation of `_.reduce` and `_.reduceRight`, without support
 * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} accumulator The initial value.
 * @param {boolean} initAccum Specify using the first or last element of
 *  `collection` as the initial value.
 * @param {Function} eachFunc The function to iterate over `collection`.
 * @returns {*} Returns the accumulated value.
 */

function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
  eachFunc(collection, function (value, index, collection) {
    accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection);
  });
  return accumulator;
}

var _baseReduce = baseReduce;
/**
 * Reduces `collection` to a value which is the accumulated result of running
 * each element in `collection` thru `iteratee`, where each successive
 * invocation is supplied the return value of the previous. If `accumulator`
 * is not given, the first element of `collection` is used as the initial
 * value. The iteratee is invoked with four arguments:
 * (accumulator, value, index|key, collection).
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `_.reduce`, `_.reduceRight`, and `_.transform`.
 *
 * The guarded methods are:
 * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
 * and `sortBy`
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @returns {*} Returns the accumulated value.
 * @see _.reduceRight
 * @example
 *
 * _.reduce([1, 2], function(sum, n) {
 *   return sum + n;
 * }, 0);
 * // => 3
 *
 * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
 *   (result[value] || (result[value] = [])).push(key);
 *   return result;
 * }, {});
 * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
 */

function reduce(collection, iteratee, accumulator) {
  var func = isArray_1(collection) ? _arrayReduce : _baseReduce,
      initAccum = arguments.length < 3;
  return func(collection, _baseIteratee(iteratee, 4), accumulator, initAccum, _baseEach);
}

var reduce_1 = reduce;
/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */

function baseSet(object, path, value, customizer) {
  if (!isObject_1(object)) {
    return object;
  }

  path = _castPath(path, object);
  var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;

  while (nested != null && ++index < length) {
    var key = _toKey(path[index]),
        newValue = value;

    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;

      if (newValue === undefined) {
        newValue = isObject_1(objValue) ? objValue : _isIndex(path[index + 1]) ? [] : {};
      }
    }

    _assignValue(nested, key, newValue);

    nested = nested[key];
  }

  return object;
}

var _baseSet = baseSet;
/**
 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */

function basePickBy(object, paths, predicate) {
  var index = -1,
      length = paths.length,
      result = {};

  while (++index < length) {
    var path = paths[index],
        value = _baseGet(object, path);

    if (predicate(value, path)) {
      _baseSet(result, _castPath(path, object), value);
    }
  }

  return result;
}

var _basePickBy = basePickBy;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeGetSymbols$1 = Object.getOwnPropertySymbols;
/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */

var getSymbolsIn = !nativeGetSymbols$1 ? stubArray_1 : function (object) {
  var result = [];

  while (object) {
    _arrayPush(result, _getSymbols(object));

    object = _getPrototype(object);
  }

  return result;
};
var _getSymbolsIn = getSymbolsIn;
/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */

function getAllKeysIn(object) {
  return _baseGetAllKeys(object, keysIn_1, _getSymbolsIn);
}

var _getAllKeysIn = getAllKeysIn;
/**
 * Creates an object composed of the `object` properties `predicate` returns
 * truthy for. The predicate is invoked with two arguments: (value, key).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The source object.
 * @param {Function} [predicate=_.identity] The function invoked per property.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.pickBy(object, _.isNumber);
 * // => { 'a': 1, 'c': 3 }
 */

function pickBy(object, predicate) {
  if (object == null) {
    return {};
  }

  var props = _arrayMap(_getAllKeysIn(object), function (prop) {
    return [prop];
  });

  predicate = _baseIteratee(predicate);
  return _basePickBy(object, props, function (value, path) {
    return predicate(value, path[0]);
  });
}

var pickBy_1 = pickBy;
/**
 * The base implementation of `_.filter` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */

function baseFilter(collection, predicate) {
  var result = [];

  _baseEach(collection, function (value, index, collection) {
    if (predicate(value, index, collection)) {
      result.push(value);
    }
  });

  return result;
}

var _baseFilter = baseFilter;
/**
 * Iterates over elements of `collection`, returning an array of all elements
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * **Note:** Unlike `_.remove`, this method returns a new array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 * @see _.reject
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': true },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * _.filter(users, function(o) { return !o.active; });
 * // => objects for ['fred']
 *
 * // The `_.matches` iteratee shorthand.
 * _.filter(users, { 'age': 36, 'active': true });
 * // => objects for ['barney']
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.filter(users, ['active', false]);
 * // => objects for ['fred']
 *
 * // The `_.property` iteratee shorthand.
 * _.filter(users, 'active');
 * // => objects for ['barney']
 */

function filter$1(collection, predicate) {
  var func = isArray_1(collection) ? _arrayFilter : _baseFilter;
  return func(collection, _baseIteratee(predicate, 3));
}

var filter_1 = filter$1;
/**
 * Gets the size of an ASCII `string`.
 *
 * @private
 * @param {string} string The string inspect.
 * @returns {number} Returns the string size.
 */

var asciiSize = _baseProperty('length');

var _asciiSize = asciiSize;
/** Used to compose unicode character classes. */

var rsAstralRange$1 = "\\ud800-\\udfff",
    rsComboMarksRange$2 = "\\u0300-\\u036f",
    reComboHalfMarksRange$2 = "\\ufe20-\\ufe2f",
    rsComboSymbolsRange$2 = "\\u20d0-\\u20ff",
    rsComboRange$2 = rsComboMarksRange$2 + reComboHalfMarksRange$2 + rsComboSymbolsRange$2,
    rsVarRange$1 = "\\ufe0e\\ufe0f";
/** Used to compose unicode capture groups. */

var rsZWJ$1 = "\\u200d";
/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */

var reHasUnicode = RegExp('[' + rsZWJ$1 + rsAstralRange$1 + rsComboRange$2 + rsVarRange$1 + ']');
/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */

function hasUnicode(string) {
  return reHasUnicode.test(string);
}

var _hasUnicode = hasUnicode;
/** Used to compose unicode character classes. */

var rsAstralRange$2 = "\\ud800-\\udfff",
    rsComboMarksRange$3 = "\\u0300-\\u036f",
    reComboHalfMarksRange$3 = "\\ufe20-\\ufe2f",
    rsComboSymbolsRange$3 = "\\u20d0-\\u20ff",
    rsComboRange$3 = rsComboMarksRange$3 + reComboHalfMarksRange$3 + rsComboSymbolsRange$3,
    rsVarRange$2 = "\\ufe0e\\ufe0f";
/** Used to compose unicode capture groups. */

var rsAstral = '[' + rsAstralRange$2 + ']',
    rsCombo$2 = '[' + rsComboRange$3 + ']',
    rsFitz$1 = "\\ud83c[\\udffb-\\udfff]",
    rsModifier$1 = '(?:' + rsCombo$2 + '|' + rsFitz$1 + ')',
    rsNonAstral$1 = '[^' + rsAstralRange$2 + ']',
    rsRegional$1 = "(?:\\ud83c[\\udde6-\\uddff]){2}",
    rsSurrPair$1 = "[\\ud800-\\udbff][\\udc00-\\udfff]",
    rsZWJ$2 = "\\u200d";
/** Used to compose unicode regexes. */

var reOptMod$1 = rsModifier$1 + '?',
    rsOptVar$1 = '[' + rsVarRange$2 + ']?',
    rsOptJoin$1 = '(?:' + rsZWJ$2 + '(?:' + [rsNonAstral$1, rsRegional$1, rsSurrPair$1].join('|') + ')' + rsOptVar$1 + reOptMod$1 + ')*',
    rsSeq$1 = rsOptVar$1 + reOptMod$1 + rsOptJoin$1,
    rsSymbol = '(?:' + [rsNonAstral$1 + rsCombo$2 + '?', rsCombo$2, rsRegional$1, rsSurrPair$1, rsAstral].join('|') + ')';
/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */

var reUnicode = RegExp(rsFitz$1 + '(?=' + rsFitz$1 + ')|' + rsSymbol + rsSeq$1, 'g');
/**
 * Gets the size of a Unicode `string`.
 *
 * @private
 * @param {string} string The string inspect.
 * @returns {number} Returns the string size.
 */

function unicodeSize(string) {
  var result = reUnicode.lastIndex = 0;

  while (reUnicode.test(string)) {
    ++result;
  }

  return result;
}

var _unicodeSize = unicodeSize;
/**
 * Gets the number of symbols in `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the string size.
 */

function stringSize(string) {
  return _hasUnicode(string) ? _unicodeSize(string) : _asciiSize(string);
}

var _stringSize = stringSize;
/** `Object#toString` result references. */

var mapTag$3 = '[object Map]',
    setTag$3 = '[object Set]';
/**
 * Gets the size of `collection` by returning its length for array-like
 * values or the number of own enumerable string keyed properties for objects.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object|string} collection The collection to inspect.
 * @returns {number} Returns the collection size.
 * @example
 *
 * _.size([1, 2, 3]);
 * // => 3
 *
 * _.size({ 'a': 1, 'b': 2 });
 * // => 2
 *
 * _.size('pebbles');
 * // => 7
 */

function size(collection) {
  if (collection == null) {
    return 0;
  }

  if (isArrayLike_1(collection)) {
    return isString_1(collection) ? _stringSize(collection) : collection.length;
  }

  var tag = _getTag(collection);

  if (tag == mapTag$3 || tag == setTag$3) {
    return collection.size;
  }

  return _baseKeys(collection).length;
}

var size_1 = size;
/**
 * The base implementation of `_.map` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */

function baseMap(collection, iteratee) {
  var index = -1,
      result = isArrayLike_1(collection) ? Array(collection.length) : [];

  _baseEach(collection, function (value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });

  return result;
}

var _baseMap = baseMap;
/**
 * Creates an array of values by running each element in `collection` thru
 * `iteratee`. The iteratee is invoked with three arguments:
 * (value, index|key, collection).
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
 *
 * The guarded methods are:
 * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
 * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
 * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
 * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * _.map([4, 8], square);
 * // => [16, 64]
 *
 * _.map({ 'a': 4, 'b': 8 }, square);
 * // => [16, 64] (iteration order is not guaranteed)
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * // The `_.property` iteratee shorthand.
 * _.map(users, 'user');
 * // => ['barney', 'fred']
 */

function map(collection, iteratee) {
  var func = isArray_1(collection) ? _arrayMap : _baseMap;
  return func(collection, _baseIteratee(iteratee, 3));
}

var map_1 = map;
/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */

function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }

  end = end > length ? length : end;

  if (end < 0) {
    end += length;
  }

  length = start > end ? 0 : end - start >>> 0;
  start >>>= 0;
  var result = Array(length);

  while (++index < length) {
    result[index] = array[index + start];
  }

  return result;
}

var _baseSlice = baseSlice;
/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */

function castSlice(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return !start && end >= length ? array : _baseSlice(array, start, end);
}

var _castSlice = castSlice;
/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */

function asciiToArray(string) {
  return string.split('');
}

var _asciiToArray = asciiToArray;
/** Used to compose unicode character classes. */

var rsAstralRange$3 = "\\ud800-\\udfff",
    rsComboMarksRange$4 = "\\u0300-\\u036f",
    reComboHalfMarksRange$4 = "\\ufe20-\\ufe2f",
    rsComboSymbolsRange$4 = "\\u20d0-\\u20ff",
    rsComboRange$4 = rsComboMarksRange$4 + reComboHalfMarksRange$4 + rsComboSymbolsRange$4,
    rsVarRange$3 = "\\ufe0e\\ufe0f";
/** Used to compose unicode capture groups. */

var rsAstral$1 = '[' + rsAstralRange$3 + ']',
    rsCombo$3 = '[' + rsComboRange$4 + ']',
    rsFitz$2 = "\\ud83c[\\udffb-\\udfff]",
    rsModifier$2 = '(?:' + rsCombo$3 + '|' + rsFitz$2 + ')',
    rsNonAstral$2 = '[^' + rsAstralRange$3 + ']',
    rsRegional$2 = "(?:\\ud83c[\\udde6-\\uddff]){2}",
    rsSurrPair$2 = "[\\ud800-\\udbff][\\udc00-\\udfff]",
    rsZWJ$3 = "\\u200d";
/** Used to compose unicode regexes. */

var reOptMod$2 = rsModifier$2 + '?',
    rsOptVar$2 = '[' + rsVarRange$3 + ']?',
    rsOptJoin$2 = '(?:' + rsZWJ$3 + '(?:' + [rsNonAstral$2, rsRegional$2, rsSurrPair$2].join('|') + ')' + rsOptVar$2 + reOptMod$2 + ')*',
    rsSeq$2 = rsOptVar$2 + reOptMod$2 + rsOptJoin$2,
    rsSymbol$1 = '(?:' + [rsNonAstral$2 + rsCombo$3 + '?', rsCombo$3, rsRegional$2, rsSurrPair$2, rsAstral$1].join('|') + ')';
/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */

var reUnicode$1 = RegExp(rsFitz$2 + '(?=' + rsFitz$2 + ')|' + rsSymbol$1 + rsSeq$2, 'g');
/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */

function unicodeToArray(string) {
  return string.match(reUnicode$1) || [];
}

var _unicodeToArray = unicodeToArray;
/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */

function stringToArray(string) {
  return _hasUnicode(string) ? _unicodeToArray(string) : _asciiToArray(string);
}

var _stringToArray = stringToArray;
/**
 * Creates a function like `_.lowerFirst`.
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new case function.
 */

function createCaseFirst(methodName) {
  return function (string) {
    string = toString_1(string);
    var strSymbols = _hasUnicode(string) ? _stringToArray(string) : undefined;
    var chr = strSymbols ? strSymbols[0] : string.charAt(0);
    var trailing = strSymbols ? _castSlice(strSymbols, 1).join('') : string.slice(1);
    return chr[methodName]() + trailing;
  };
}

var _createCaseFirst = createCaseFirst;
/**
 * Converts the first character of `string` to upper case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.upperFirst('fred');
 * // => 'Fred'
 *
 * _.upperFirst('FRED');
 * // => 'FRED'
 */

var upperFirst = _createCaseFirst('toUpperCase');

var upperFirst_1 = upperFirst;
/**
 * Converts the first character of `string` to upper case and the remaining
 * to lower case.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to capitalize.
 * @returns {string} Returns the capitalized string.
 * @example
 *
 * _.capitalize('FRED');
 * // => 'Fred'
 */

function capitalize(string) {
  return upperFirst_1(toString_1(string).toLowerCase());
}

var capitalize_1 = capitalize;
/**
 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the camel cased string.
 * @example
 *
 * _.camelCase('Foo Bar');
 * // => 'fooBar'
 *
 * _.camelCase('--foo-bar--');
 * // => 'fooBar'
 *
 * _.camelCase('__FOO_BAR__');
 * // => 'fooBar'
 */

var camelCase = _createCompounder(function (result, word, index) {
  word = word.toLowerCase();
  return result + (index ? capitalize_1(word) : word);
});

var camelCase_1 = camelCase;
/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */

function baseAssign(object, source) {
  return object && _copyObject(source, keys_1(source), object);
}

var _baseAssign = baseAssign;
/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */

function baseAssignIn(object, source) {
  return object && _copyObject(source, keysIn_1(source), object);
}

var _baseAssignIn = baseAssignIn;
/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */

function copySymbols(source, object) {
  return _copyObject(source, _getSymbols(source), object);
}

var _copySymbols = copySymbols;
/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */

function copySymbolsIn(source, object) {
  return _copyObject(source, _getSymbolsIn(source), object);
}

var _copySymbolsIn = copySymbolsIn;
/** Used for built-in method references. */

var objectProto$15 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$12 = objectProto$15.hasOwnProperty;
/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */

function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length); // Add properties assigned by `RegExp#exec`.

  if (length && typeof array[0] == 'string' && hasOwnProperty$12.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }

  return result;
}

var _initCloneArray = initCloneArray;
/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */

function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? _cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

var _cloneDataView = cloneDataView;
/** Used to match `RegExp` flags from their coerced string values. */

var reFlags = /\w*$/;
/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */

function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

var _cloneRegExp = cloneRegExp;
/** Used to convert symbols to primitives and strings. */

var symbolProto$2 = _Symbol ? _Symbol.prototype : undefined,
    symbolValueOf$1 = symbolProto$2 ? symbolProto$2.valueOf : undefined;
/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */

function cloneSymbol(symbol) {
  return symbolValueOf$1 ? Object(symbolValueOf$1.call(symbol)) : {};
}

var _cloneSymbol = cloneSymbol;
/** `Object#toString` result references. */

var boolTag$2 = '[object Boolean]',
    dateTag$2 = '[object Date]',
    mapTag$4 = '[object Map]',
    numberTag$2 = '[object Number]',
    regexpTag$2 = '[object RegExp]',
    setTag$4 = '[object Set]',
    stringTag$3 = '[object String]',
    symbolTag$2 = '[object Symbol]';
var arrayBufferTag$2 = '[object ArrayBuffer]',
    dataViewTag$3 = '[object DataView]',
    float32Tag$1 = '[object Float32Array]',
    float64Tag$1 = '[object Float64Array]',
    int8Tag$1 = '[object Int8Array]',
    int16Tag$1 = '[object Int16Array]',
    int32Tag$1 = '[object Int32Array]',
    uint8Tag$1 = '[object Uint8Array]',
    uint8ClampedTag$1 = '[object Uint8ClampedArray]',
    uint16Tag$1 = '[object Uint16Array]',
    uint32Tag$1 = '[object Uint32Array]';
/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */

function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;

  switch (tag) {
    case arrayBufferTag$2:
      return _cloneArrayBuffer(object);

    case boolTag$2:
    case dateTag$2:
      return new Ctor(+object);

    case dataViewTag$3:
      return _cloneDataView(object, isDeep);

    case float32Tag$1:
    case float64Tag$1:
    case int8Tag$1:
    case int16Tag$1:
    case int32Tag$1:
    case uint8Tag$1:
    case uint8ClampedTag$1:
    case uint16Tag$1:
    case uint32Tag$1:
      return _cloneTypedArray(object, isDeep);

    case mapTag$4:
      return new Ctor();

    case numberTag$2:
    case stringTag$3:
      return new Ctor(object);

    case regexpTag$2:
      return _cloneRegExp(object);

    case setTag$4:
      return new Ctor();

    case symbolTag$2:
      return _cloneSymbol(object);
  }
}

var _initCloneByTag = initCloneByTag;
/** `Object#toString` result references. */

var mapTag$5 = '[object Map]';
/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */

function baseIsMap(value) {
  return isObjectLike_1(value) && _getTag(value) == mapTag$5;
}

var _baseIsMap = baseIsMap;
/* Node.js helper references. */

var nodeIsMap = _nodeUtil && _nodeUtil.isMap;
/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */

var isMap = nodeIsMap ? _baseUnary(nodeIsMap) : _baseIsMap;
var isMap_1 = isMap;
/** `Object#toString` result references. */

var setTag$5 = '[object Set]';
/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */

function baseIsSet(value) {
  return isObjectLike_1(value) && _getTag(value) == setTag$5;
}

var _baseIsSet = baseIsSet;
/* Node.js helper references. */

var nodeIsSet = _nodeUtil && _nodeUtil.isSet;
/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */

var isSet = nodeIsSet ? _baseUnary(nodeIsSet) : _baseIsSet;
var isSet_1 = isSet;
/** Used to compose bitmasks for cloning. */

var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;
/** `Object#toString` result references. */

var argsTag$3 = '[object Arguments]',
    arrayTag$2 = '[object Array]',
    boolTag$3 = '[object Boolean]',
    dateTag$3 = '[object Date]',
    errorTag$2 = '[object Error]',
    funcTag$2 = '[object Function]',
    genTag$1 = '[object GeneratorFunction]',
    mapTag$6 = '[object Map]',
    numberTag$3 = '[object Number]',
    objectTag$4 = '[object Object]',
    regexpTag$3 = '[object RegExp]',
    setTag$6 = '[object Set]',
    stringTag$4 = '[object String]',
    symbolTag$3 = '[object Symbol]',
    weakMapTag$2 = '[object WeakMap]';
var arrayBufferTag$3 = '[object ArrayBuffer]',
    dataViewTag$4 = '[object DataView]',
    float32Tag$2 = '[object Float32Array]',
    float64Tag$2 = '[object Float64Array]',
    int8Tag$2 = '[object Int8Array]',
    int16Tag$2 = '[object Int16Array]',
    int32Tag$2 = '[object Int32Array]',
    uint8Tag$2 = '[object Uint8Array]',
    uint8ClampedTag$2 = '[object Uint8ClampedArray]',
    uint16Tag$2 = '[object Uint16Array]',
    uint32Tag$2 = '[object Uint32Array]';
/** Used to identify `toStringTag` values supported by `_.clone`. */

var cloneableTags = {};
cloneableTags[argsTag$3] = cloneableTags[arrayTag$2] = cloneableTags[arrayBufferTag$3] = cloneableTags[dataViewTag$4] = cloneableTags[boolTag$3] = cloneableTags[dateTag$3] = cloneableTags[float32Tag$2] = cloneableTags[float64Tag$2] = cloneableTags[int8Tag$2] = cloneableTags[int16Tag$2] = cloneableTags[int32Tag$2] = cloneableTags[mapTag$6] = cloneableTags[numberTag$3] = cloneableTags[objectTag$4] = cloneableTags[regexpTag$3] = cloneableTags[setTag$6] = cloneableTags[stringTag$4] = cloneableTags[symbolTag$3] = cloneableTags[uint8Tag$2] = cloneableTags[uint8ClampedTag$2] = cloneableTags[uint16Tag$2] = cloneableTags[uint32Tag$2] = true;
cloneableTags[errorTag$2] = cloneableTags[funcTag$2] = cloneableTags[weakMapTag$2] = false;
/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */

function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }

  if (result !== undefined) {
    return result;
  }

  if (!isObject_1(value)) {
    return value;
  }

  var isArr = isArray_1(value);

  if (isArr) {
    result = _initCloneArray(value);

    if (!isDeep) {
      return _copyArray(value, result);
    }
  } else {
    var tag = _getTag(value),
        isFunc = tag == funcTag$2 || tag == genTag$1;

    if (isBuffer_1(value)) {
      return _cloneBuffer(value, isDeep);
    }

    if (tag == objectTag$4 || tag == argsTag$3 || isFunc && !object) {
      result = isFlat || isFunc ? {} : _initCloneObject(value);

      if (!isDeep) {
        return isFlat ? _copySymbolsIn(value, _baseAssignIn(result, value)) : _copySymbols(value, _baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }

      result = _initCloneByTag(value, tag, isDeep);
    }
  } // Check for circular references and return its corresponding clone.


  stack || (stack = new _Stack());
  var stacked = stack.get(value);

  if (stacked) {
    return stacked;
  }

  stack.set(value, result);

  if (isSet_1(value)) {
    value.forEach(function (subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
    return result;
  }

  if (isMap_1(value)) {
    value.forEach(function (subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
    return result;
  }

  var keysFunc = isFull ? isFlat ? _getAllKeysIn : _getAllKeys : isFlat ? keysIn : keys_1;
  var props = isArr ? undefined : keysFunc(value);

  _arrayEach(props || value, function (subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    } // Recursively populate clone (susceptible to call stack limits).


    _assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });

  return result;
}

var _baseClone = baseClone;
/** Used to compose bitmasks for cloning. */

var CLONE_DEEP_FLAG$1 = 1,
    CLONE_SYMBOLS_FLAG$1 = 4;
/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */

function cloneDeep(value) {
  return _baseClone(value, CLONE_DEEP_FLAG$1 | CLONE_SYMBOLS_FLAG$1);
}

var cloneDeep_1 = cloneDeep;
/**
 * Gets the first element of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @alias first
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the first element of `array`.
 * @example
 *
 * _.head([1, 2, 3]);
 * // => 1
 *
 * _.head([]);
 * // => undefined
 */

function head(array) {
  return array && array.length ? array[0] : undefined;
}

var head_1 = head;
var first = head_1;
/** Used to store function metadata. */

var metaMap = _WeakMap && new _WeakMap();
var _metaMap = metaMap;
/**
 * The base implementation of `setData` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to associate metadata with.
 * @param {*} data The metadata.
 * @returns {Function} Returns `func`.
 */

var baseSetData = !_metaMap ? identity_1 : function (func, data) {
  _metaMap.set(func, data);

  return func;
};
var _baseSetData = baseSetData;
/**
 * Creates a function that produces an instance of `Ctor` regardless of
 * whether it was invoked as part of a `new` expression or by `call` or `apply`.
 *
 * @private
 * @param {Function} Ctor The constructor to wrap.
 * @returns {Function} Returns the new wrapped function.
 */

function createCtor(Ctor) {
  return function () {
    // Use a `switch` statement to work with class constructors. See
    // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
    // for more details.
    var args = arguments;

    switch (args.length) {
      case 0:
        return new Ctor();

      case 1:
        return new Ctor(args[0]);

      case 2:
        return new Ctor(args[0], args[1]);

      case 3:
        return new Ctor(args[0], args[1], args[2]);

      case 4:
        return new Ctor(args[0], args[1], args[2], args[3]);

      case 5:
        return new Ctor(args[0], args[1], args[2], args[3], args[4]);

      case 6:
        return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);

      case 7:
        return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
    }

    var thisBinding = _baseCreate(Ctor.prototype),
        result = Ctor.apply(thisBinding, args); // Mimic the constructor's `return` behavior.
    // See https://es5.github.io/#x13.2.2 for more details.


    return isObject_1(result) ? result : thisBinding;
  };
}

var _createCtor = createCtor;
/** Used to compose bitmasks for function metadata. */

var WRAP_BIND_FLAG = 1;
/**
 * Creates a function that wraps `func` to invoke it with the optional `this`
 * binding of `thisArg`.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @returns {Function} Returns the new wrapped function.
 */

function createBind(func, bitmask, thisArg) {
  var isBind = bitmask & WRAP_BIND_FLAG,
      Ctor = _createCtor(func);

  function wrapper() {
    var fn = this && this !== _root && this instanceof wrapper ? Ctor : func;
    return fn.apply(isBind ? thisArg : this, arguments);
  }

  return wrapper;
}

var _createBind = createBind;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeMax$1 = Math.max;
/**
 * Creates an array that is the composition of partially applied arguments,
 * placeholders, and provided arguments into a single array of arguments.
 *
 * @private
 * @param {Array} args The provided arguments.
 * @param {Array} partials The arguments to prepend to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @params {boolean} [isCurried] Specify composing for a curried function.
 * @returns {Array} Returns the new array of composed arguments.
 */

function composeArgs(args, partials, holders, isCurried) {
  var argsIndex = -1,
      argsLength = args.length,
      holdersLength = holders.length,
      leftIndex = -1,
      leftLength = partials.length,
      rangeLength = nativeMax$1(argsLength - holdersLength, 0),
      result = Array(leftLength + rangeLength),
      isUncurried = !isCurried;

  while (++leftIndex < leftLength) {
    result[leftIndex] = partials[leftIndex];
  }

  while (++argsIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[holders[argsIndex]] = args[argsIndex];
    }
  }

  while (rangeLength--) {
    result[leftIndex++] = args[argsIndex++];
  }

  return result;
}

var _composeArgs = composeArgs;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeMax$2 = Math.max;
/**
 * This function is like `composeArgs` except that the arguments composition
 * is tailored for `_.partialRight`.
 *
 * @private
 * @param {Array} args The provided arguments.
 * @param {Array} partials The arguments to append to those provided.
 * @param {Array} holders The `partials` placeholder indexes.
 * @params {boolean} [isCurried] Specify composing for a curried function.
 * @returns {Array} Returns the new array of composed arguments.
 */

function composeArgsRight(args, partials, holders, isCurried) {
  var argsIndex = -1,
      argsLength = args.length,
      holdersIndex = -1,
      holdersLength = holders.length,
      rightIndex = -1,
      rightLength = partials.length,
      rangeLength = nativeMax$2(argsLength - holdersLength, 0),
      result = Array(rangeLength + rightLength),
      isUncurried = !isCurried;

  while (++argsIndex < rangeLength) {
    result[argsIndex] = args[argsIndex];
  }

  var offset = argsIndex;

  while (++rightIndex < rightLength) {
    result[offset + rightIndex] = partials[rightIndex];
  }

  while (++holdersIndex < holdersLength) {
    if (isUncurried || argsIndex < argsLength) {
      result[offset + holders[holdersIndex]] = args[argsIndex++];
    }
  }

  return result;
}

var _composeArgsRight = composeArgsRight;
/**
 * Gets the number of `placeholder` occurrences in `array`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} placeholder The placeholder to search for.
 * @returns {number} Returns the placeholder count.
 */

function countHolders(array, placeholder) {
  var length = array.length,
      result = 0;

  while (length--) {
    if (array[length] === placeholder) {
      ++result;
    }
  }

  return result;
}

var _countHolders = countHolders;
/**
 * The function whose prototype chain sequence wrappers inherit from.
 *
 * @private
 */

function baseLodash() {// No operation performed.
}

var _baseLodash = baseLodash;
/** Used as references for the maximum length and index of an array. */

var MAX_ARRAY_LENGTH = 4294967295;
/**
 * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
 *
 * @private
 * @constructor
 * @param {*} value The value to wrap.
 */

function LazyWrapper(value) {
  this.__wrapped__ = value;
  this.__actions__ = [];
  this.__dir__ = 1;
  this.__filtered__ = false;
  this.__iteratees__ = [];
  this.__takeCount__ = MAX_ARRAY_LENGTH;
  this.__views__ = [];
} // Ensure `LazyWrapper` is an instance of `baseLodash`.


LazyWrapper.prototype = _baseCreate(_baseLodash.prototype);
LazyWrapper.prototype.constructor = LazyWrapper;
var _LazyWrapper = LazyWrapper;
/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */

function noop() {// No operation performed.
}

var noop_1 = noop;
/**
 * Gets metadata for `func`.
 *
 * @private
 * @param {Function} func The function to query.
 * @returns {*} Returns the metadata for `func`.
 */

var getData = !_metaMap ? noop_1 : function (func) {
  return _metaMap.get(func);
};
var _getData = getData;
/** Used to lookup unminified function names. */

var realNames = {};
var _realNames = realNames;
/** Used for built-in method references. */

var objectProto$16 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$13 = objectProto$16.hasOwnProperty;
/**
 * Gets the name of `func`.
 *
 * @private
 * @param {Function} func The function to query.
 * @returns {string} Returns the function name.
 */

function getFuncName(func) {
  var result = func.name + '',
      array = _realNames[result],
      length = hasOwnProperty$13.call(_realNames, result) ? array.length : 0;

  while (length--) {
    var data = array[length],
        otherFunc = data.func;

    if (otherFunc == null || otherFunc == func) {
      return data.name;
    }
  }

  return result;
}

var _getFuncName = getFuncName;
/**
 * The base constructor for creating `lodash` wrapper objects.
 *
 * @private
 * @param {*} value The value to wrap.
 * @param {boolean} [chainAll] Enable explicit method chain sequences.
 */

function LodashWrapper(value, chainAll) {
  this.__wrapped__ = value;
  this.__actions__ = [];
  this.__chain__ = !!chainAll;
  this.__index__ = 0;
  this.__values__ = undefined;
}

LodashWrapper.prototype = _baseCreate(_baseLodash.prototype);
LodashWrapper.prototype.constructor = LodashWrapper;
var _LodashWrapper = LodashWrapper;
/**
 * Creates a clone of `wrapper`.
 *
 * @private
 * @param {Object} wrapper The wrapper to clone.
 * @returns {Object} Returns the cloned wrapper.
 */

function wrapperClone(wrapper) {
  if (wrapper instanceof _LazyWrapper) {
    return wrapper.clone();
  }

  var result = new _LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
  result.__actions__ = _copyArray(wrapper.__actions__);
  result.__index__ = wrapper.__index__;
  result.__values__ = wrapper.__values__;
  return result;
}

var _wrapperClone = wrapperClone;
/** Used for built-in method references. */

var objectProto$17 = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty$14 = objectProto$17.hasOwnProperty;
/**
 * Creates a `lodash` object which wraps `value` to enable implicit method
 * chain sequences. Methods that operate on and return arrays, collections,
 * and functions can be chained together. Methods that retrieve a single value
 * or may return a primitive value will automatically end the chain sequence
 * and return the unwrapped value. Otherwise, the value must be unwrapped
 * with `_#value`.
 *
 * Explicit chain sequences, which must be unwrapped with `_#value`, may be
 * enabled using `_.chain`.
 *
 * The execution of chained methods is lazy, that is, it's deferred until
 * `_#value` is implicitly or explicitly called.
 *
 * Lazy evaluation allows several methods to support shortcut fusion.
 * Shortcut fusion is an optimization to merge iteratee calls; this avoids
 * the creation of intermediate arrays and can greatly reduce the number of
 * iteratee executions. Sections of a chain sequence qualify for shortcut
 * fusion if the section is applied to an array and iteratees accept only
 * one argument. The heuristic for whether a section qualifies for shortcut
 * fusion is subject to change.
 *
 * Chaining is supported in custom builds as long as the `_#value` method is
 * directly or indirectly included in the build.
 *
 * In addition to lodash methods, wrappers have `Array` and `String` methods.
 *
 * The wrapper `Array` methods are:
 * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
 *
 * The wrapper `String` methods are:
 * `replace` and `split`
 *
 * The wrapper methods that support shortcut fusion are:
 * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
 * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
 * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
 *
 * The chainable wrapper methods are:
 * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
 * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
 * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
 * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
 * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
 * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
 * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
 * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
 * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
 * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
 * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
 * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
 * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
 * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
 * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
 * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
 * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
 * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
 * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
 * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
 * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
 * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
 * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
 * `zipObject`, `zipObjectDeep`, and `zipWith`
 *
 * The wrapper methods that are **not** chainable by default are:
 * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
 * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
 * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
 * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
 * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
 * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
 * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
 * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
 * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
 * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
 * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
 * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
 * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
 * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
 * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
 * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
 * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
 * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
 * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
 * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
 * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
 * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
 * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
 * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
 * `upperFirst`, `value`, and `words`
 *
 * @name _
 * @constructor
 * @category Seq
 * @param {*} value The value to wrap in a `lodash` instance.
 * @returns {Object} Returns the new `lodash` wrapper instance.
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * var wrapped = _([1, 2, 3]);
 *
 * // Returns an unwrapped value.
 * wrapped.reduce(_.add);
 * // => 6
 *
 * // Returns a wrapped value.
 * var squares = wrapped.map(square);
 *
 * _.isArray(squares);
 * // => false
 *
 * _.isArray(squares.value());
 * // => true
 */

function lodash(value) {
  if (isObjectLike_1(value) && !isArray_1(value) && !(value instanceof _LazyWrapper)) {
    if (value instanceof _LodashWrapper) {
      return value;
    }

    if (hasOwnProperty$14.call(value, '__wrapped__')) {
      return _wrapperClone(value);
    }
  }

  return new _LodashWrapper(value);
} // Ensure wrappers are instances of `baseLodash`.


lodash.prototype = _baseLodash.prototype;
lodash.prototype.constructor = lodash;
var wrapperLodash = lodash;
/**
 * Checks if `func` has a lazy counterpart.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
 *  else `false`.
 */

function isLaziable(func) {
  var funcName = _getFuncName(func),
      other = wrapperLodash[funcName];

  if (typeof other != 'function' || !(funcName in _LazyWrapper.prototype)) {
    return false;
  }

  if (func === other) {
    return true;
  }

  var data = _getData(other);

  return !!data && func === data[0];
}

var _isLaziable = isLaziable;
/**
 * Sets metadata for `func`.
 *
 * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
 * period of time, it will trip its breaker and transition to an identity
 * function to avoid garbage collection pauses in V8. See
 * [V8 issue 2070](https://bugs.chromium.org/p/v8/issues/detail?id=2070)
 * for more details.
 *
 * @private
 * @param {Function} func The function to associate metadata with.
 * @param {*} data The metadata.
 * @returns {Function} Returns `func`.
 */

var setData = _shortOut(_baseSetData);

var _setData = setData;
/** Used to match wrap detail comments. */

var reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
    reSplitDetails = /,? & /;
/**
 * Extracts wrapper details from the `source` body comment.
 *
 * @private
 * @param {string} source The source to inspect.
 * @returns {Array} Returns the wrapper details.
 */

function getWrapDetails(source) {
  var match = source.match(reWrapDetails);
  return match ? match[1].split(reSplitDetails) : [];
}

var _getWrapDetails = getWrapDetails;
/** Used to match wrap detail comments. */

var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;
/**
 * Inserts wrapper `details` in a comment at the top of the `source` body.
 *
 * @private
 * @param {string} source The source to modify.
 * @returns {Array} details The details to insert.
 * @returns {string} Returns the modified source.
 */

function insertWrapDetails(source, details) {
  var length = details.length;

  if (!length) {
    return source;
  }

  var lastIndex = length - 1;
  details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
  details = details.join(length > 2 ? ', ' : ' ');
  return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
}

var _insertWrapDetails = insertWrapDetails;
/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */

function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while (fromRight ? index-- : ++index < length) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }

  return -1;
}

var _baseFindIndex = baseFindIndex;
/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */

function baseIsNaN(value) {
  return value !== value;
}

var _baseIsNaN = baseIsNaN;
/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */

function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }

  return -1;
}

var _strictIndexOf = strictIndexOf;
/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */

function baseIndexOf(array, value, fromIndex) {
  return value === value ? _strictIndexOf(array, value, fromIndex) : _baseFindIndex(array, _baseIsNaN, fromIndex);
}

var _baseIndexOf = baseIndexOf;
/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */

function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && _baseIndexOf(array, value, 0) > -1;
}

var _arrayIncludes = arrayIncludes;
/** Used to compose bitmasks for function metadata. */

var WRAP_BIND_FLAG$1 = 1,
    WRAP_BIND_KEY_FLAG = 2,
    WRAP_CURRY_FLAG = 8,
    WRAP_CURRY_RIGHT_FLAG = 16,
    WRAP_PARTIAL_FLAG = 32,
    WRAP_PARTIAL_RIGHT_FLAG = 64,
    WRAP_ARY_FLAG = 128,
    WRAP_REARG_FLAG = 256,
    WRAP_FLIP_FLAG = 512;
/** Used to associate wrap methods with their bit flags. */

var wrapFlags = [['ary', WRAP_ARY_FLAG], ['bind', WRAP_BIND_FLAG$1], ['bindKey', WRAP_BIND_KEY_FLAG], ['curry', WRAP_CURRY_FLAG], ['curryRight', WRAP_CURRY_RIGHT_FLAG], ['flip', WRAP_FLIP_FLAG], ['partial', WRAP_PARTIAL_FLAG], ['partialRight', WRAP_PARTIAL_RIGHT_FLAG], ['rearg', WRAP_REARG_FLAG]];
/**
 * Updates wrapper `details` based on `bitmask` flags.
 *
 * @private
 * @returns {Array} details The details to modify.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @returns {Array} Returns `details`.
 */

function updateWrapDetails(details, bitmask) {
  _arrayEach(wrapFlags, function (pair) {
    var value = '_.' + pair[0];

    if (bitmask & pair[1] && !_arrayIncludes(details, value)) {
      details.push(value);
    }
  });

  return details.sort();
}

var _updateWrapDetails = updateWrapDetails;
/**
 * Sets the `toString` method of `wrapper` to mimic the source of `reference`
 * with wrapper details in a comment at the top of the source body.
 *
 * @private
 * @param {Function} wrapper The function to modify.
 * @param {Function} reference The reference function.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @returns {Function} Returns `wrapper`.
 */

function setWrapToString(wrapper, reference, bitmask) {
  var source = reference + '';
  return _setToString(wrapper, _insertWrapDetails(source, _updateWrapDetails(_getWrapDetails(source), bitmask)));
}

var _setWrapToString = setWrapToString;
/** Used to compose bitmasks for function metadata. */

var WRAP_BIND_FLAG$2 = 1,
    WRAP_BIND_KEY_FLAG$1 = 2,
    WRAP_CURRY_BOUND_FLAG = 4,
    WRAP_CURRY_FLAG$1 = 8,
    WRAP_PARTIAL_FLAG$1 = 32,
    WRAP_PARTIAL_RIGHT_FLAG$1 = 64;
/**
 * Creates a function that wraps `func` to continue currying.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {Function} wrapFunc The function to create the `func` wrapper.
 * @param {*} placeholder The placeholder value.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to
 *  the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */

function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
  var isCurry = bitmask & WRAP_CURRY_FLAG$1,
      newHolders = isCurry ? holders : undefined,
      newHoldersRight = isCurry ? undefined : holders,
      newPartials = isCurry ? partials : undefined,
      newPartialsRight = isCurry ? undefined : partials;
  bitmask |= isCurry ? WRAP_PARTIAL_FLAG$1 : WRAP_PARTIAL_RIGHT_FLAG$1;
  bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG$1 : WRAP_PARTIAL_FLAG$1);

  if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
    bitmask &= ~(WRAP_BIND_FLAG$2 | WRAP_BIND_KEY_FLAG$1);
  }

  var newData = [func, bitmask, thisArg, newPartials, newHolders, newPartialsRight, newHoldersRight, argPos, ary, arity];
  var result = wrapFunc.apply(undefined, newData);

  if (_isLaziable(func)) {
    _setData(result, newData);
  }

  result.placeholder = placeholder;
  return _setWrapToString(result, func, bitmask);
}

var _createRecurry = createRecurry;
/**
 * Gets the argument placeholder value for `func`.
 *
 * @private
 * @param {Function} func The function to inspect.
 * @returns {*} Returns the placeholder value.
 */

function getHolder(func) {
  var object = func;
  return object.placeholder;
}

var _getHolder = getHolder;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeMin = Math.min;
/**
 * Reorder `array` according to the specified indexes where the element at
 * the first index is assigned as the first element, the element at
 * the second index is assigned as the second element, and so on.
 *
 * @private
 * @param {Array} array The array to reorder.
 * @param {Array} indexes The arranged array indexes.
 * @returns {Array} Returns `array`.
 */

function reorder(array, indexes) {
  var arrLength = array.length,
      length = nativeMin(indexes.length, arrLength),
      oldArray = _copyArray(array);

  while (length--) {
    var index = indexes[length];
    array[length] = _isIndex(index, arrLength) ? oldArray[index] : undefined;
  }

  return array;
}

var _reorder = reorder;
/** Used as the internal argument placeholder. */

var PLACEHOLDER = '__lodash_placeholder__';
/**
 * Replaces all `placeholder` elements in `array` with an internal placeholder
 * and returns an array of their indexes.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {*} placeholder The placeholder to replace.
 * @returns {Array} Returns the new array of placeholder indexes.
 */

function replaceHolders(array, placeholder) {
  var index = -1,
      length = array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];

    if (value === placeholder || value === PLACEHOLDER) {
      array[index] = PLACEHOLDER;
      result[resIndex++] = index;
    }
  }

  return result;
}

var _replaceHolders = replaceHolders;
/** Used to compose bitmasks for function metadata. */

var WRAP_BIND_FLAG$3 = 1,
    WRAP_BIND_KEY_FLAG$2 = 2,
    WRAP_CURRY_FLAG$2 = 8,
    WRAP_CURRY_RIGHT_FLAG$1 = 16,
    WRAP_ARY_FLAG$1 = 128,
    WRAP_FLIP_FLAG$1 = 512;
/**
 * Creates a function that wraps `func` to invoke it with optional `this`
 * binding of `thisArg`, partial application, and currying.
 *
 * @private
 * @param {Function|string} func The function or method name to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to prepend to those provided to
 *  the new function.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [partialsRight] The arguments to append to those provided
 *  to the new function.
 * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */

function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
  var isAry = bitmask & WRAP_ARY_FLAG$1,
      isBind = bitmask & WRAP_BIND_FLAG$3,
      isBindKey = bitmask & WRAP_BIND_KEY_FLAG$2,
      isCurried = bitmask & (WRAP_CURRY_FLAG$2 | WRAP_CURRY_RIGHT_FLAG$1),
      isFlip = bitmask & WRAP_FLIP_FLAG$1,
      Ctor = isBindKey ? undefined : _createCtor(func);

  function wrapper() {
    var length = arguments.length,
        args = Array(length),
        index = length;

    while (index--) {
      args[index] = arguments[index];
    }

    if (isCurried) {
      var placeholder = _getHolder(wrapper),
          holdersCount = _countHolders(args, placeholder);
    }

    if (partials) {
      args = _composeArgs(args, partials, holders, isCurried);
    }

    if (partialsRight) {
      args = _composeArgsRight(args, partialsRight, holdersRight, isCurried);
    }

    length -= holdersCount;

    if (isCurried && length < arity) {
      var newHolders = _replaceHolders(args, placeholder);

      return _createRecurry(func, bitmask, createHybrid, wrapper.placeholder, thisArg, args, newHolders, argPos, ary, arity - length);
    }

    var thisBinding = isBind ? thisArg : this,
        fn = isBindKey ? thisBinding[func] : func;
    length = args.length;

    if (argPos) {
      args = _reorder(args, argPos);
    } else if (isFlip && length > 1) {
      args.reverse();
    }

    if (isAry && ary < length) {
      args.length = ary;
    }

    if (this && this !== _root && this instanceof wrapper) {
      fn = Ctor || _createCtor(fn);
    }

    return fn.apply(thisBinding, args);
  }

  return wrapper;
}

var _createHybrid = createHybrid;
/**
 * Creates a function that wraps `func` to enable currying.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {number} arity The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */

function createCurry(func, bitmask, arity) {
  var Ctor = _createCtor(func);

  function wrapper() {
    var length = arguments.length,
        args = Array(length),
        index = length,
        placeholder = _getHolder(wrapper);

    while (index--) {
      args[index] = arguments[index];
    }

    var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : _replaceHolders(args, placeholder);
    length -= holders.length;

    if (length < arity) {
      return _createRecurry(func, bitmask, _createHybrid, wrapper.placeholder, undefined, args, holders, undefined, undefined, arity - length);
    }

    var fn = this && this !== _root && this instanceof wrapper ? Ctor : func;
    return _apply(fn, this, args);
  }

  return wrapper;
}

var _createCurry = createCurry;
/** Used to compose bitmasks for function metadata. */

var WRAP_BIND_FLAG$4 = 1;
/**
 * Creates a function that wraps `func` to invoke it with the `this` binding
 * of `thisArg` and `partials` prepended to the arguments it receives.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} partials The arguments to prepend to those provided to
 *  the new function.
 * @returns {Function} Returns the new wrapped function.
 */

function createPartial(func, bitmask, thisArg, partials) {
  var isBind = bitmask & WRAP_BIND_FLAG$4,
      Ctor = _createCtor(func);

  function wrapper() {
    var argsIndex = -1,
        argsLength = arguments.length,
        leftIndex = -1,
        leftLength = partials.length,
        args = Array(leftLength + argsLength),
        fn = this && this !== _root && this instanceof wrapper ? Ctor : func;

    while (++leftIndex < leftLength) {
      args[leftIndex] = partials[leftIndex];
    }

    while (argsLength--) {
      args[leftIndex++] = arguments[++argsIndex];
    }

    return _apply(fn, isBind ? thisArg : this, args);
  }

  return wrapper;
}

var _createPartial = createPartial;
/** Used as the internal argument placeholder. */

var PLACEHOLDER$1 = '__lodash_placeholder__';
/** Used to compose bitmasks for function metadata. */

var WRAP_BIND_FLAG$5 = 1,
    WRAP_BIND_KEY_FLAG$3 = 2,
    WRAP_CURRY_BOUND_FLAG$1 = 4,
    WRAP_CURRY_FLAG$3 = 8,
    WRAP_ARY_FLAG$2 = 128,
    WRAP_REARG_FLAG$1 = 256;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeMin$1 = Math.min;
/**
 * Merges the function metadata of `source` into `data`.
 *
 * Merging metadata reduces the number of wrappers used to invoke a function.
 * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
 * may be applied regardless of execution order. Methods like `_.ary` and
 * `_.rearg` modify function arguments, making the order in which they are
 * executed important, preventing the merging of metadata. However, we make
 * an exception for a safe combined case where curried functions have `_.ary`
 * and or `_.rearg` applied.
 *
 * @private
 * @param {Array} data The destination metadata.
 * @param {Array} source The source metadata.
 * @returns {Array} Returns `data`.
 */

function mergeData(data, source) {
  var bitmask = data[1],
      srcBitmask = source[1],
      newBitmask = bitmask | srcBitmask,
      isCommon = newBitmask < (WRAP_BIND_FLAG$5 | WRAP_BIND_KEY_FLAG$3 | WRAP_ARY_FLAG$2);
  var isCombo = srcBitmask == WRAP_ARY_FLAG$2 && bitmask == WRAP_CURRY_FLAG$3 || srcBitmask == WRAP_ARY_FLAG$2 && bitmask == WRAP_REARG_FLAG$1 && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG$2 | WRAP_REARG_FLAG$1) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG$3; // Exit early if metadata can't be merged.

  if (!(isCommon || isCombo)) {
    return data;
  } // Use source `thisArg` if available.


  if (srcBitmask & WRAP_BIND_FLAG$5) {
    data[2] = source[2]; // Set when currying a bound function.

    newBitmask |= bitmask & WRAP_BIND_FLAG$5 ? 0 : WRAP_CURRY_BOUND_FLAG$1;
  } // Compose partial arguments.


  var value = source[3];

  if (value) {
    var partials = data[3];
    data[3] = partials ? _composeArgs(partials, value, source[4]) : value;
    data[4] = partials ? _replaceHolders(data[3], PLACEHOLDER$1) : source[4];
  } // Compose partial right arguments.


  value = source[5];

  if (value) {
    partials = data[5];
    data[5] = partials ? _composeArgsRight(partials, value, source[6]) : value;
    data[6] = partials ? _replaceHolders(data[5], PLACEHOLDER$1) : source[6];
  } // Use source `argPos` if available.


  value = source[7];

  if (value) {
    data[7] = value;
  } // Use source `ary` if it's smaller.


  if (srcBitmask & WRAP_ARY_FLAG$2) {
    data[8] = data[8] == null ? source[8] : nativeMin$1(data[8], source[8]);
  } // Use source `arity` if one is not provided.


  if (data[9] == null) {
    data[9] = source[9];
  } // Use source `func` and merge bitmasks.


  data[0] = source[0];
  data[1] = newBitmask;
  return data;
}

var _mergeData = mergeData;
/** Used as references for various `Number` constants. */

var NAN = 0 / 0;
/** Used to match leading and trailing whitespace. */

var reTrim = /^\s+|\s+$/g;
/** Used to detect bad signed hexadecimal string values. */

var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
/** Used to detect binary string values. */

var reIsBinary = /^0b[01]+$/i;
/** Used to detect octal string values. */

var reIsOctal = /^0o[0-7]+$/i;
/** Built-in method references without a dependency on `root`. */

var freeParseInt = parseInt;
/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */

function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }

  if (isSymbol_1(value)) {
    return NAN;
  }

  if (isObject_1(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject_1(other) ? other + '' : other;
  }

  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }

  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}

var toNumber_1 = toNumber;
/** Used as references for various `Number` constants. */

var INFINITY$2 = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;
/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */

function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }

  value = toNumber_1(value);

  if (value === INFINITY$2 || value === -INFINITY$2) {
    var sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }

  return value === value ? value : 0;
}

var toFinite_1 = toFinite;
/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */

function toInteger(value) {
  var result = toFinite_1(value),
      remainder = result % 1;
  return result === result ? remainder ? result - remainder : result : 0;
}

var toInteger_1 = toInteger;
/** Error message constants. */

var FUNC_ERROR_TEXT$1 = 'Expected a function';
/** Used to compose bitmasks for function metadata. */

var WRAP_BIND_FLAG$6 = 1,
    WRAP_BIND_KEY_FLAG$4 = 2,
    WRAP_CURRY_FLAG$4 = 8,
    WRAP_CURRY_RIGHT_FLAG$2 = 16,
    WRAP_PARTIAL_FLAG$2 = 32,
    WRAP_PARTIAL_RIGHT_FLAG$2 = 64;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeMax$3 = Math.max;
/**
 * Creates a function that either curries or invokes `func` with optional
 * `this` binding and partially applied arguments.
 *
 * @private
 * @param {Function|string} func The function or method name to wrap.
 * @param {number} bitmask The bitmask flags.
 *    1 - `_.bind`
 *    2 - `_.bindKey`
 *    4 - `_.curry` or `_.curryRight` of a bound function
 *    8 - `_.curry`
 *   16 - `_.curryRight`
 *   32 - `_.partial`
 *   64 - `_.partialRight`
 *  128 - `_.rearg`
 *  256 - `_.ary`
 *  512 - `_.flip`
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {Array} [partials] The arguments to be partially applied.
 * @param {Array} [holders] The `partials` placeholder indexes.
 * @param {Array} [argPos] The argument positions of the new function.
 * @param {number} [ary] The arity cap of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new wrapped function.
 */

function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
  var isBindKey = bitmask & WRAP_BIND_KEY_FLAG$4;

  if (!isBindKey && typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }

  var length = partials ? partials.length : 0;

  if (!length) {
    bitmask &= ~(WRAP_PARTIAL_FLAG$2 | WRAP_PARTIAL_RIGHT_FLAG$2);
    partials = holders = undefined;
  }

  ary = ary === undefined ? ary : nativeMax$3(toInteger_1(ary), 0);
  arity = arity === undefined ? arity : toInteger_1(arity);
  length -= holders ? holders.length : 0;

  if (bitmask & WRAP_PARTIAL_RIGHT_FLAG$2) {
    var partialsRight = partials,
        holdersRight = holders;
    partials = holders = undefined;
  }

  var data = isBindKey ? undefined : _getData(func);
  var newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];

  if (data) {
    _mergeData(newData, data);
  }

  func = newData[0];
  bitmask = newData[1];
  thisArg = newData[2];
  partials = newData[3];
  holders = newData[4];
  arity = newData[9] = newData[9] === undefined ? isBindKey ? 0 : func.length : nativeMax$3(newData[9] - length, 0);

  if (!arity && bitmask & (WRAP_CURRY_FLAG$4 | WRAP_CURRY_RIGHT_FLAG$2)) {
    bitmask &= ~(WRAP_CURRY_FLAG$4 | WRAP_CURRY_RIGHT_FLAG$2);
  }

  if (!bitmask || bitmask == WRAP_BIND_FLAG$6) {
    var result = _createBind(func, bitmask, thisArg);
  } else if (bitmask == WRAP_CURRY_FLAG$4 || bitmask == WRAP_CURRY_RIGHT_FLAG$2) {
    result = _createCurry(func, bitmask, arity);
  } else if ((bitmask == WRAP_PARTIAL_FLAG$2 || bitmask == (WRAP_BIND_FLAG$6 | WRAP_PARTIAL_FLAG$2)) && !holders.length) {
    result = _createPartial(func, bitmask, thisArg, partials);
  } else {
    result = _createHybrid.apply(undefined, newData);
  }

  var setter = data ? _baseSetData : _setData;
  return _setWrapToString(setter(result, newData), func, bitmask);
}

var _createWrap = createWrap;
/** Used to compose bitmasks for function metadata. */

var WRAP_BIND_FLAG$7 = 1,
    WRAP_PARTIAL_FLAG$3 = 32;
/**
 * Creates a function that invokes `func` with the `this` binding of `thisArg`
 * and `partials` prepended to the arguments it receives.
 *
 * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
 * may be used as a placeholder for partially applied arguments.
 *
 * **Note:** Unlike native `Function#bind`, this method doesn't set the "length"
 * property of bound functions.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {...*} [partials] The arguments to be partially applied.
 * @returns {Function} Returns the new bound function.
 * @example
 *
 * function greet(greeting, punctuation) {
 *   return greeting + ' ' + this.user + punctuation;
 * }
 *
 * var object = { 'user': 'fred' };
 *
 * var bound = _.bind(greet, object, 'hi');
 * bound('!');
 * // => 'hi fred!'
 *
 * // Bound with placeholders.
 * var bound = _.bind(greet, object, _, '!');
 * bound('hi');
 * // => 'hi fred!'
 */

var bind = _baseRest(function (func, thisArg, partials) {
  var bitmask = WRAP_BIND_FLAG$7;

  if (partials.length) {
    var holders = _replaceHolders(partials, _getHolder(bind));

    bitmask |= WRAP_PARTIAL_FLAG$3;
  }

  return _createWrap(func, bitmask, thisArg, partials, holders);
}); // Assign default placeholders.


bind.placeholder = {};
var bind_1 = bind;
var RequestOptions = {
  // `responseType` indicates the type of data that the server will respond with
  // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json',
  // default
  // `transformRequest` allows changes to the request data before it is sent to the server
  // This is only applicable for request methods 'PUT', 'POST', and 'PATCH'
  // The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
  // FormData or Stream
  // You may modify the headers object.
  transformRequest: [],
  // `transformResponse` allows changes to the response data to be made before
  // it is passed to then/catch
  transformResponse: []
  /*
  // `url` is the server URL that will be used for the request
    // `method` is the request method to be used when making the request
  method: 'get', // default
   // `baseURL` will be prepended to `url` unless `url` is absolute.
  // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
  // to methods of that instance.
  baseURL: 'https://some-domain.com/api/',
   // `headers` are custom headers to be sent
  headers: {'X-Requested-With': 'XMLHttpRequest'},
   // `params` are the URL parameters to be sent with the request
  // Must be a plain object or a URLSearchParams object
  params: {
      ID: 12345
  },
   // `paramsSerializer` is an optional function in charge of serializing `params`
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
      return Qs.stringify(params, {arrayFormat: 'brackets'})
  },
   // `data` is the data to be sent as the request body
  // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
  // When no `transformRequest` is set, must be of one of the following types:
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - Browser only: FormData, File, Blob
  // - Node only: Stream, Buffer
  data: {
      firstName: 'Fred'
  },
   // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout: 1000,
   // `withCredentials` indicates whether or not cross-site Access-Control requests
  // should be made using credentials
  withCredentials: false, // default
   // `adapter` allows custom handling of requests which makes testing easier.
  // Return a promise and supply a valid response (see lib/adapters/README.md).
  adapter: function (config) {
      //
  },
   // `auth` indicates that HTTP Basic auth should be used, and supplies credentials.
  // This will set an `Authorization` header, overwriting any existing
  // `Authorization` custom headers you have set using `headers`.
  auth: {
      username: 'janedoe',
      password: 's00pers3cret'
  },
   // `responseEncoding` indicates encoding to use for decoding responses
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  responseEncoding: 'utf8', // default
   // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
  xsrfCookieName: 'XSRF-TOKEN', // default
   // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default
   // `onUploadProgress` allows handling of progress events for uploads
  onUploadProgress: function (progressEvent) {
      // Do whatever you want with the native progress event
  },
   // `onDownloadProgress` allows handling of progress events for downloads
  onDownloadProgress: function (progressEvent) {
      // Do whatever you want with the native progress event
  },
   // `maxContentLength` defines the max size of the http response content in bytes allowed
  maxContentLength: 2000,
   // `validateStatus` defines whether to resolve or reject the promise for a given
  // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
  // or `undefined`), the promise will be resolved; otherwise, the promise will be
  // rejected.
  validateStatus: function (status) {
      return status >= 200 && status < 300; // default
  },
   // `maxRedirects` defines the maximum number of redirects to follow in node.js.
  // If set to 0, no redirects will be followed.
  maxRedirects: 5, // default
   // `socketPath` defines a UNIX Socket to be used in node.js.
  // e.g. '/var/run/docker.sock' to send requests to the docker daemon.
  // Only either `socketPath` or `proxy` can be specified.
  // If both are specified, `socketPath` is used.
  socketPath: null, // default
   // `httpAgent` and `httpsAgent` define a custom agent to be used when performing http
  // and https requests, respectively, in node.js. This allows options to be added like
  // `keepAlive` that are not enabled by default.
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),
   // 'proxy' defines the hostname and port of the proxy server
  // Use `false` to disable proxies, ignoring environment variables.
  // `auth` indicates that HTTP Basic auth should be used to connect to the proxy, and
  // supplies credentials.
  // This will set an `Proxy-Authorization` header, overwriting any existing
  // `Proxy-Authorization` custom headers you have set using `headers`.
  proxy: {
      host: '127.0.0.1',
      port: 9000,
      auth: {
          username: 'mikeymike',
          password: 'rapunz3l'
      }
  },
   // `cancelToken` specifies a cancel token that can be used to cancel the request
  // (see Cancellation section below for details)
  cancelToken: new CancelToken(function (cancel) {
   })
  */

};

function transformRequest(transformer, context) {
  if (!isFunction_1(transformer)) {
    throw new Error('The transformer must be a defined as a function with two arguments: [data, headers].');
  }

  (context || RequestOptions.transformRequest).push(transformer);
}

function transformResponse(transformer, context) {
  if (!isFunction_1(transformer)) {
    throw new Error('The transformer must be a defined as a function with one arguments: [data].');
  }

  (context || RequestOptions.transformResponse).push(transformer);
}

var PROXY_OPTION_PROPERTIES = ['headers', 'params', 'data'];
var PROXY_OPTION_METHODS = {
  get: function get(prop, context) {
    return function () {
      return context[prop];
    };
  },
  set: function set(prop, context) {
    return function (value) {
      context[prop] = value;
    };
  },
  add: function add(prop, context) {
    return function (key, value) {
      context[prop][key] = value;
    };
  },
  remove: function remove(prop, context) {
    return function (key) {
      delete context[prop][key];
    };
  },
  merge: function merge(prop, context) {
    return function (key, values) {
      extend(context[prop], key);
    };
  }
};

var method = function method(action, prop) {
  return camelCase_1([action, prop].join(' '));
};

var chainable = function chainable(prop) {
  var _this = this;

  return function (key, value) {
    if (key instanceof FormData) {
      _this[method('set', prop)](key);
    } else if (isObject_1(key)) {
      _this[method('merge', prop)](key);
    } else {
      _this[method('add', prop)](key, value);
    }

    return _this;
  };
};

function merge$1() {
  var args = [].slice.call(arguments);
  var items = args.splice(1);
  var subject = first(args);

  for (var i in items) {
    subject = mergeWith_1(subject, items[i], function (subject, value) {
      if (isArray_1(subject)) {
        return subject.concat(value);
      } else if (isObject_1(subject)) {
        return extend(subject, value);
      }

      return value;
    });
  }

  return subject;
}

var Request =
/*#__PURE__*/
function () {
  function Request(url) {
    var _this2 = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck$1(this, Request);

    this.$options = merge$1({
      url: url,
      data: {},
      headers: {},
      params: {}
    }, cloneDeep_1(RequestOptions), options);
    each(PROXY_OPTION_METHODS, function (callback, key) {
      _this2[method(key, 'option')] = bind_1(callback)('$options', _this2);
    });
    each(PROXY_OPTION_PROPERTIES, function (prop) {
      each(PROXY_OPTION_METHODS, function (callback, key) {
        _this2[method(key, prop)] = bind_1(callback)(prop, _this2.$options);
      });
      _this2[prop] = bind_1(chainable, _this2)(prop);
    });
    this.reset();
  }

  _createClass$1(Request, [{
    key: "reset",
    value: function reset() {
      this.$error = null;
      this.$status = null;
      this.$statusText = null;
      this.$response = null;
      this.$requestSentAt = null;
      this.$responseReceivedAt = null;
    }
  }, {
    key: "hasSent",
    value: function hasSent() {
      return !!this.$requestSentAt;
    }
  }, {
    key: "hasResponse",
    value: function hasResponse() {
      return !!this.$responseReceivedAt;
    }
  }, {
    key: "passed",
    value: function passed() {
      return this.hasResponse() && !this.$error;
    }
  }, {
    key: "failed",
    value: function failed() {
      return this.hasResponse() && !!this.$error;
    }
  }, {
    key: "get",
    value: function get() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.params(params).headers(headers).send('get');
    }
  }, {
    key: "post",
    value: function post() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.data(data).headers(headers).send('post');
    }
  }, {
    key: "put",
    value: function put() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.data(data).headers(headers).send('put');
    }
  }, {
    key: "delete",
    value: function _delete() {
      var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.headers(headers).send('delete');
    }
  }, {
    key: "send",
    value: function send(method) {
      var _this3 = this;

      this.reset();
      this.$requestSentAt = moment();
      this.addOption('method', method);
      return new Promise(function (resolve, reject) {
        axios(_this3.$options).then(function (response) {
          _this3.$response = response;
          _this3.$responseReceivedAt = moment();
          _this3.$status = response.status;
          _this3.$statusText = response.statusText;
          resolve(response.data);
        }, function (error) {
          _this3.$error = error;
          _this3.$response = error.response;
          _this3.$responseReceivedAt = moment();
          _this3.$status = error.response ? error.response.status : null;
          _this3.$statusText = error.response ? error.response.statusText : null;
          reject(error.response || error);
        });
      });
    }
  }, {
    key: "transformRequest",
    value: function transformRequest$$1(transformer) {
      if (!this.$options.transformRequest) {
        this.$options.transformRequest = [];
      }

      transformRequest(transformer, this.$options.transformRequest);
    }
  }, {
    key: "transformResponse",
    value: function transformResponse$$1(transformer) {
      if (this.$options.transformResponse) {
        this.$options.transformResponse = [];
      }

      transformResponse(transformer, this.$options.transformResponse);
    }
  }], [{
    key: "interceptRequest",
    value: function interceptRequest(success, error) {
      this.interceptors().request.use(success, error);
    }
  }, {
    key: "interceptResponse",
    value: function interceptResponse(success, error) {
      this.interceptors().response.use(success, error);
    }
  }, {
    key: "interceptors",
    value: function interceptors() {
      return axios.interceptors;
    }
  }, {
    key: "option",
    value: function option(key, value) {
      if (isObject_1(key)) {
        merge$1(RequestOptions, key);
      } else {
        var option = {};
        option[key] = value;
        merge$1(RequestOptions, option);
      }
    }
  }, {
    key: "make",
    value: function make(url) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new this(url, params);
    }
  }]);

  return Request;
}();

var Model =
/*#__PURE__*/
function () {
  /**
   * Construct the model instance
   *
   * @param data object
   * @return void
   */
  function Model() {
    var _this = this;

    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck$1(this, Model);

    this.$key = this.key();
    this.initialize(data);
    this.$files = this.files();
    this.$properties = this.properties();
    each(params, function (value, key) {
      _this[key] = value;
    });
    this.$initialized = true;
  }
  /**
   * Initialize the model with the given data without considering the data
   * as "changed".
   *
   * @param data object
   * @return this
   */


  _createClass$1(Model, [{
    key: "initialize",
    value: function initialize(data) {
      this.$exists = false;
      this.$changed = {};
      this.$attributes = {};
      this.fill(data);
      this.$initialized = true;
      return this;
    }
    /**
     * Define the corresponding API endpoint slug
     *
     * @return string
     */

  }, {
    key: "endpoint",
    value: function endpoint() {} //

    /**
     * Define the corresponding uri schema.
     *
     * @return string
     */

  }, {
    key: "uri",
    value: function uri() {
      return filter_1([this.endpoint() || '', this.exists() ? this.id() : null].concat([].slice.call(arguments))).join('/').replace(/^\//, '');
    }
    /**
     * Return the primary key value for the model
     *
     * @return {Number}
     */

  }, {
    key: "id",
    value: function id() {
      return this.get(this.key());
    }
    /**
     * Define a primary key. This is used to determine if the model exists and
     * which endpoint to use.
     *
     * @return string
     */

  }, {
    key: "key",
    value: function key() {
      return 'id';
    }
    /**
     * Return an array of properties that are sent to the API. If no properties
     * are defined, then all the attributes will be included in the request.
     *
     * @return array
     */

  }, {
    key: "properties",
    value: function properties() {
      return [];
    }
    /**
     * Return an array of file properties that are sent to the API. If no fies
     * are defined, then request will always be sent with JSON vs. multipart.
     *
     * @return array
     */

  }, {
    key: "files",
    value: function files() {
      return [];
    }
    /**
     * Set the attributes in the model with the data given.
     *
     * @param data object
     * @return this
     */

  }, {
    key: "fill",
    value: function fill(data) {
      this.setAttributes(data);
      return this;
    }
    /**
     * Get one or more attributes from the model.
     *
     * @param data string|array
     * @return array|mixed
     */

  }, {
    key: "get",
    value: function get(key) {
      if (isArray_1(key) || isObject_1(key)) {
        return this.getAttributes().filter(function (value) {
          return data.indexOf(value) !== -1;
        });
      } else {
        return this.getAttribute(key);
      }
    }
    /**
     * Alias for setAttributes() except this method returns `this`. This method
     * also accepts an array of values or key/value pair.
     *
     * @return this
     */

  }, {
    key: "set",
    value: function set(key) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

      if (isArray_1(key) || isObject_1(key)) {
        this.setAttributes(key);
      } else {
        this.setAttribute(key, value);
      }

      return this;
    }
    /**
     * Get all the defined attributes.
     *
     * @return array
     */

  }, {
    key: "getAttributes",
    value: function getAttributes() {
      return this.$attributes;
    }
    /**
     * Get the changed attributes
     *
     * @return array
     */

  }, {
    key: "getChangedAttributes",
    value: function getChangedAttributes() {
      return keys_1(this.$changed);
    }
    /**
     * Get the changed attributes
     *
     * @return array
     */

  }, {
    key: "getOriginalValue",
    value: function getOriginalValue(key) {
      return this.$changed[key] || this.$attributes[key];
    }
    /**
     * Get the unchanged attributes
     *
     * @return array
     */

  }, {
    key: "getUnchangedAttributes",
    value: function getUnchangedAttributes() {
      var _this2 = this;

      return filter_1(keys_1(this.$attributes), function (key) {
        return !(key in _this2.$changed);
      });
    }
    /**
     * Get an attribute with a given key. If no key is defined
     *
     * @param key string
     * @param default undefined|mixed
     * @return array
     */

  }, {
    key: "getAttribute",
    value: function getAttribute(key) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      return this.$attributes[key] || value;
    }
    /**
     * Set an array or object of data as attributes.
     *
     * @param attributes array|object
     * @return void
     */

  }, {
    key: "setAttributes",
    value: function setAttributes(data) {
      var _this3 = this;

      if (isArray_1(data) || isObject_1(data)) {
        each(data, function (value, key) {
          _this3.setAttribute(key, value);
        });
      }
    }
    /**
     * Set an attribute with a given key/value pair. This will track the changes
     * in the model within the `this.$changed` property. If the primary key
     * is set, it will also change the `this.$exists` property.
     *
     * @param key string
     * @param value mixed
     * @return void
     */

  }, {
    key: "setAttribute",
    value: function setAttribute(key, value) {
      if (this.getAttribute(key) !== value) {
        this.handleAttributeChange(key, value);

        if (isUndefined_1(value)) {
          delete this.$attributes[key];
        } else {
          this.$attributes[key] = value;
        }
      }
    }
    /**
     * Revert the model to its original state.
     *
     * @return bool
     */

  }, {
    key: "revert",
    value: function revert() {
      var _this4 = this;

      each(this.$changed, function (value, key) {
        if (!isUndefined_1(value)) {
          _this4.$attributes[key] = value;
        } else {
          delete _this4.$attributes[key];
        }
      });
      this.$changed = {};
    }
    /**
     * Returns if the model has a primary key set.
     *
     * @return bool
     */

  }, {
    key: "exists",
    value: function exists() {
      return !!this.$exists;
    }
    /**
     * Returns the model been changed or not.
     *
     * @return bool
     */

  }, {
    key: "hasChanged",
    value: function hasChanged(key) {
      return !key ? size_1(this.$changed) > 0 : !isUndefined_1(this.$changed[key]);
    }
    /**
     * Does the model have any File objects. If so, need to send as multipart.
     *
     * @return bool
     */

  }, {
    key: "hasFiles",
    value: function hasFiles() {
      function count(files) {
        var total = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        return reduce_1(files, function (carry, value) {
          if (isArray_1(value)) {
            return carry + count(value, total);
          } else if (value instanceof File || value instanceof FileList) {
            return carry + 1;
          } else {
            return carry;
          }
        }, total);
      }

      return count(this.toJSON()) !== 0;
    }
    /**
     * Handle settings the $changed attributes when an attribute value is set.
     *
     * @param key string
     * @param value mixed
     * @return void
     */

  }, {
    key: "handleAttributeChange",
    value: function handleAttributeChange(key, value) {
      if (this.$initialized) {
        if (this.$changed[key] === value) {
          delete this.$changed[key];
        } else if (!(key in this.$changed)) {
          this.$changed[key] = this.getAttribute(key);
        }
      }

      this.handlePrimaryKeyChange(key, value);
    }
    /**
     * Set an array or object of data as attributes.
     *
     * @param key string
     * @param value mixed
     * @return void
     */

  }, {
    key: "handlePrimaryKeyChange",
    value: function handlePrimaryKeyChange(key, value) {
      if (this.$key === key) {
        this.$exists = !isUndefined_1(value) && !isNull_1(value);
      }
    }
    /**
     * Save the model to the database
     *
     * @param data object
     * @return bool
     */

  }, {
    key: "save",
    value: function save() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return !this.exists() ? this.create(data, config) : this.update(data, config);
    }
    /**
     * Create a new model
     *
     * @param data object
     * @return bool
     */

  }, {
    key: "create",
    value: function create() {
      var _this5 = this;

      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.fill(data);
      return new Promise(function (resolve, reject) {
        var request = _this5.constructor.request(_this5.uri(), extend({}, config));

        var data = !_this5.hasFiles() ? _this5.toJson() : _this5.toFormData();
        request.post(data).then(function (response) {
          resolve(_this5.fill(response));
        }, reject);
      });
    }
    /**
     * Update an existing model
     *
     * @param data object
     * @return bool
     */

  }, {
    key: "update",
    value: function update() {
      var _this6 = this;

      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.fill(data);
      return new Promise(function (resolve, reject) {
        var request = _this6.constructor.request(_this6.uri(), config);

        var data = !_this6.hasFiles() ? _this6.toJson() : _this6.toFormData();
        request[_this6.hasFiles() ? 'post' : 'put'](data).then(function (response) {
          resolve(_this6.fill(response));
        }, reject);
      });
    }
    /**
     * Delete an existing model
     *
     * @param data object
     * @return bool
     */

  }, {
    key: "delete",
    value: function _delete() {
      var _this7 = this;

      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new Promise(function (resolve, reject) {
        if (!_this7.exists()) {
          reject(new Error('The model must have a primary key before it can be delete.'));
        }

        var request = _this7.constructor.request(_this7.uri(), config);

        request.delete().then(function (response) {
          resolve(response); //resolve(this.fill(response));
        }, reject);
      });
    }
    /**
     * Convert the Model instance to a FormData instance
     *
     * @return object
     */

  }, {
    key: "toFormData",
    value: function toFormData() {
      var form = new FormData();
      each(this.toJSON(), function (value, key) {
        if (isArray_1(value)) {
          each(value, function (item) {
            if (!(item instanceof File) && (isObject_1(item) || isArray_1(item))) {
              item = JSON.stringify(item);
            }

            form.append(key.replace(/(.+)(\[.+\]?)$/, '$1') + '[]', item);
          });
        } else if (!(value instanceof File) && isObject_1(value)) {
          form.append(key, JSON.stringify(value));
        } else if (!isNull_1(value)) {
          form.append(key, value);
        }
      });
      return form;
    }
    /**
     * Convert the instance to JSON payload
     *
     * @return object
     */

  }, {
    key: "toJSON",
    value: function toJSON() {
      var _this8 = this;

      return pickBy_1(this.$attributes, function (value, key) {
        return !_this8.$properties.length || key === _this8.key() || _this8.$properties.indexOf(key) !== -1;
      });
    }
    /**
     * Alias for toJSON
     *
     * @return object
     */

  }, {
    key: "toJson",
    value: function toJson() {
      return this.toJSON();
    }
    /**
     * Search for a collection of models
     *
     * @param data object
     * @return bool
     */

  }], [{
    key: "search",
    value: function search(uri) {
      var _this9 = this;

      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var model = new this();

      if (!uri) {
        uri = model.uri();
      }

      return new Promise(function (resolve, reject) {
        var request = _this9.request(uri, config);

        request.get(params).then(function (response) {
          resolve(map_1(response.data, function (data) {
            return new _this9(data);
          }));
        }, function (errors) {
          reject(errors);
        });
      });
    }
    /**
     * Find an existing model by id
     *
     * @param data object
     * @return bool
     */

  }, {
    key: "find",
    value: function find(id) {
      var _this10 = this;

      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new Promise(function (resolve, reject) {
        var model = new _this10();

        _this10.request(model.uri(id), config).get().then(function (response) {
          resolve(model.initialize(response));
        }, function (error) {
          reject(error);
        });
      });
    }
    /**
     * Create a request from the model data
     *
     * @param data object
     * @return bool
     */

  }, {
    key: "request",
    value: function request(url) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new Request(url, config);
    }
  }]);

  return Model;
}();

var BaseForm = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('form', {
      class: {
        'form-inline': _vm.inline
      },
      attrs: {
        "novalidate": _vm.novalidate
      },
      on: {
        "submit": function submit($event) {
          $event.preventDefault();
          return _vm.onSubmit($event);
        }
      }
    }, [_vm._t("default")], 2);
  },
  staticRenderFns: [],
  props: {
    /**
     * The Model method used to send the request.
     *
     * @property Boolean
     */
    method: {
      type: String,
      default: 'save',
      validate: function validate(value) {
        return this.model && isFunction_1(this.model[value]);
      }
    },

    /**
     * An object of form data
     *
     * @property Object
     */
    data: {
      type: Object,
      default: function _default() {
        return {};
      }
    },

    /**
     * Display the form fields inline
     *
     * @property Object
     */
    model: {
      type: Object,
      validate: function validate(value) {
        return value instanceof Model;
      }
    },

    /**
     * Display the form fields inline
     *
     * @property Boolean
     */
    inline: Boolean,

    /**
     * A callback function for the `submit` event
     *
     * @property Boolean
     */
    novalidate: {
      type: Boolean,
      default: true
    },

    /**
     * A URI or URL used to redirect user after form submits successfully.
     *
     * @property Function|String
     */
    redirect: [Object, String, Function],

    /**
     * A callback function for the `submit` event
     *
     * @property Function
     */
    onSubmit: {
      type: Function,
      default: function _default(event) {
        this.model && this.submit(event);
      }
    },

    /**
     * A callback function for the `submit:success` event
     *
     * @property Function
     */
    onSubmitSuccess: {
      type: Function,
      default: function _default(event, data) {
        this.$emit('submit:success', event, data);
        this.$emit('submit:complete', event, true, data);

        if (this.redirect && isFunction_1(this.redirect)) {
          this.redirect(this);
        } else if (this.redirect) {
          this.$router.push(this.redirect);
        }
      }
    },

    /**
     * A callback function for the `submit:success` event
     *
     * @property Function
     */
    onSubmitFailed: {
      type: Function,
      default: function _default(event, errors) {
        this.$emit('submit:failed', event, errors);
        this.$emit('submit:complete', event, false, errors);
      }
    }
  },
  methods: {
    submit: function submit(event) {
      var _this = this;

      this.$emit('submit', event);
      return this.model[this.method](this.data, {
        onUploadProgress: function onUploadProgress(event) {
          _this.$emit('submit:progress', event);
        }
      }).then(function (data) {
        _this.onSubmitSuccess(event, data);
      }, function (errors) {
        _this.onSubmitFailed(event, errors);
      });
    }
  },
  data: function data() {
    return {
      errors: {}
    };
  }
};
var plugin$5 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      BaseForm: BaseForm
    });
  }
});
var Breadcrumb = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('nav', {
      attrs: {
        "aria-label": "breadcrumb"
      }
    }, [_c('ol', {
      staticClass: "breadcrumb"
    }, [_vm._l(_vm.items, function (item, i) {
      return _vm.items.length ? _c('breadcrumb-item', _vm._b({
        key: i,
        attrs: {
          "current": i === item.length - 1
        }
      }, 'breadcrumb-item', item, false)) : _vm._e();
    }), _vm._v(" "), _vm._t("default")], 2)]);
  },
  staticRenderFns: [],
  name: 'breadcrumb',
  props: {
    /**
     * An array of breadcrumbs
     *
     * @prop {Array}
     */
    items: Array
  }
};
var BreadcrumbItem = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('li', {
      staticClass: "breadcrumb-item",
      class: {
        'active': _vm.active
      },
      attrs: {
        "aria-current": _vm.active ? 'page' : false
      }
    }, [!_vm.active && _vm.href ? _c('a', {
      attrs: {
        "href": _vm.href
      }
    }, [_vm._t("default", [_vm._v(_vm._s(_vm.label))])], 2) : [_vm._t("default", [_vm._v(_vm._s(_vm.label))])]], 2);
  },
  staticRenderFns: [],
  name: 'breadcrumb-item',
  props: {
    /**
     * Is the item active?
     *
     * @prop {Boolean}
     */
    active: Boolean,

    /**
     * An href attribute
     *
     * @prop {String}
     */
    href: String,

    /**
     * An breadcrumb label
     *
     * @prop {String}
     */
    label: String
  }
};
var plugin$6 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Breadcrumb: Breadcrumb,
      BreadcrumbItem: BreadcrumbItem
    });
  }
});
var Sizeable = {
  props: {
    /**
     * The size of the form control
     *
     * @property String
     */
    size: {
      type: String,
      default: 'md',
      validate: function validate(value) {
        return ['sm', 'md', 'lg'].indexOf(value) !== -1;
      }
    }
  },
  computed: {
    sizeableClassPrefix: function sizeableClassPrefix() {
      return this.$options.name;
    },
    sizeableClass: function sizeableClass() {
      return prefix(this.size, this.sizeableClassPrefix);
    }
  }
};
var Btn = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _vm.label ? _c('label', {
      staticClass: "btn",
      class: _vm.classes,
      attrs: {
        "disabled": _vm.disabled
      },
      on: {
        "click": _vm.onClick
      }
    }, [_vm._t("default")], 2) : _vm.href ? _c('a', {
      staticClass: "btn",
      class: _vm.classes,
      attrs: {
        "href": _vm.href,
        "disabled": _vm.disabled
      },
      on: {
        "click": _vm.onClick
      }
    }, [_vm._t("default")], 2) : _c('button', {
      staticClass: "btn",
      class: _vm.classes,
      attrs: {
        "type": _vm.type,
        "disabled": _vm.disabled
      },
      on: {
        "click": _vm.onClick
      }
    }, [_vm._t("default")], 2);
  },
  staticRenderFns: [],
  name: 'btn',
  mixins: [Variant, Sizeable],
  props: {
    /**
     * Should use <label> as the element for the button. Used for inputs
     * wrappers (toggles).
     *
     * @property Boolean
     */
    label: Boolean,

    /**
     * If an href is passed, button is an anchor element
     *
     * @property Boolean
     */
    href: String,

    /**
     * The type attribute for the button. Not applied if an anchor
     *
     * @property String
     */
    type: {
      type: String,
      default: 'submit'
    },

    /**
     * Display button with active state
     *
     * @property String
     */
    active: Boolean,

    /**
     * Display button with blocked state
     *
     * @property String
     */
    block: Boolean,

    /**
     * Display button with disabled state
     *
     * @property String
     */
    disabled: Boolean,

    /**
     * Display as an outline button
     *
     * @property String
     */
    outline: Boolean
  },
  methods: {
    onClick: function onClick(event) {
      this.$emit('click', event, this);
    }
  },
  computed: {
    variantClassPrefix: function variantClassPrefix() {
      return this.$options.name + (this.outline ? '-outline' : '');
    },
    classes: function classes() {
      return this.$mergeClasses(this.variantClass, this.sizeableClass, this.block ? 'btn-block' : '', this.active ? 'active' : '');
    }
  }
};
var plugin$7 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Btn: Btn
    });
  }
});
/** Error message constants. */

var FUNC_ERROR_TEXT$2 = 'Expected a function';
/**
 * Creates a function that negates the result of the predicate `func`. The
 * `func` predicate is invoked with the `this` binding and arguments of the
 * created function.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Function
 * @param {Function} predicate The predicate to negate.
 * @returns {Function} Returns the new negated function.
 * @example
 *
 * function isEven(n) {
 *   return n % 2 == 0;
 * }
 *
 * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
 * // => [1, 3, 5]
 */

function negate(predicate) {
  if (typeof predicate != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT$2);
  }

  return function () {
    var args = arguments;

    switch (args.length) {
      case 0:
        return !predicate.call(this);

      case 1:
        return !predicate.call(this, args[0]);

      case 2:
        return !predicate.call(this, args[0], args[1]);

      case 3:
        return !predicate.call(this, args[0], args[1], args[2]);
    }

    return !predicate.apply(this, args);
  };
}

var negate_1 = negate;
/**
 * The opposite of `_.pickBy`; this method creates an object composed of
 * the own and inherited enumerable string keyed properties of `object` that
 * `predicate` doesn't return truthy for. The predicate is invoked with two
 * arguments: (value, key).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The source object.
 * @param {Function} [predicate=_.identity] The function invoked per property.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.omitBy(object, _.isNumber);
 * // => { 'b': '2' }
 */

function omitBy(object, predicate) {
  return pickBy_1(object, negate_1(_baseIteratee(predicate)));
}

var omitBy_1 = omitBy;
var COLORS = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'white', 'muted'];
var props = {};
each(['border', 'text', 'bg', 'bg-gradient'], function (namespace) {
  each(COLORS, function (color) {
    props[camelCase_1(prefix(color, namespace))] = Boolean;
  });
});

function classes(instance, namespace) {
  return filter_1(map_1(COLORS, function (color) {
    return instance[camelCase_1(color = prefix(color, namespace))] ? color : null;
  }));
}

var Colorable = {
  props: props,
  methods: {
    textColor: function textColor() {
      return classes(this, 'text');
    },
    bgColor: function bgColor() {
      return classes(this, 'bg');
    },
    borderColor: function borderColor() {
      return classes(this, 'border');
    },
    bgGradientColor: function bgGradientColor() {
      return classes(this, 'bg-gradient');
    }
  },
  computed: {
    textColorClasses: function textColorClasses() {
      return this.textColor().join(' ').trim() || null;
    },
    borderColorClasses: function borderColorClasses() {
      return this.borderColor().join(' ').trim() || null;
    },
    bgColorClasses: function bgColorClasses() {
      return this.bgColor().join(' ').trim() || null;
    },
    bgGradientColorClasses: function bgGradientColorClasses() {
      return this.bgGradientColor().join(' ').trim() || null;
    },
    colorableClasses: function colorableClasses() {
      var classes = {};
      classes[this.textColorClasses] = !!this.textColorClasses;
      classes[this.borderColorClasses] = !!this.borderColorClasses;
      classes[this.bgColorClasses] = !!this.bgColorClasses;
      classes[this.bgGradientColorClasses] = !!this.bgGradientColorClasses;
      return omitBy_1(classes, function (key, value) {
        return !key || !value;
      });
    }
  }
};
var Screenreaders = {
  props: {
    /**
     * Should show only for screenreaders
     *
     * @property Boolean
     */
    srOnly: Boolean,

    /**
     * Should be focusable for screenreaders
     *
     * @property Boolean
     */
    srOnlyFocusable: Boolean
  },
  computed: {
    screenreaderClasses: function screenreaderClasses() {
      return {
        'sr-only': this.srOnly,
        'sr-only-focusable': this.srOnlyFocusable
      };
    }
  }
};
var HelpText = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('small', {
      staticClass: "form-text",
      class: _vm.classes
    }, [_vm._t("default")], 2);
  },
  staticRenderFns: [],
  name: 'help-text',
  mixins: [Colorable, Screenreaders],
  computed: {
    classes: function classes() {
      return extend({}, this.screenreaderClasses, this.colorableClasses);
    }
  }
};
var plugin$8 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      HelpText: HelpText
    });
  }
});
var FormGroup = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "form-group"
    }, [_vm._t("default")], 2);
  },
  staticRenderFns: [],
  name: 'form-group'
};
var plugin$9 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      FormGroup: FormGroup
    });
  }
});
var FormLabel = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('label', {
      class: _vm.classes
    }, [_vm._t("default")], 2);
  },
  staticRenderFns: [],
  name: 'form-label',
  mixins: [Colorable, Screenreaders],
  computed: {
    classes: function classes() {
      return extend({}, this.screenreaderClasses, this.colorableClasses);
    }
  }
};
var plugin$10 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      FormLabel: FormLabel
    });
  }
});
var FormFeedback = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      class: {
        'invalid-feedback': _vm.invalid,
        'valid-feedback': _vm.valid && !_vm.invalid
      }
    }, [_vm._t("default", [_vm._v(_vm._s(_vm.label))])], 2);
  },
  staticRenderFns: [],
  name: 'form-feedback',
  mixins: [Colorable],
  props: {
    /**
     * The value of label element. If no value, no label will appear.
     *
     * @property String
     */
    label: String,

    /**
     * Should the feedback marked as invalid
     *
     * @property String
     */
    invalid: Boolean,

    /**
     * Should the feedback marked as invalid
     *
     * @property String
     */
    valid: Boolean
  }
};
var plugin$11 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      FormFeedback: FormFeedback
    });
  }
});
var FormControl = {
  props: {
    /**
     * The field id attribute value.
     *
     * @property String
     */
    id: [Number, String],

    /**
     * The value of label element. If no value, no label will appear.
     *
     * @property String
     */
    label: [Number, String],

    /**
     * The field name attribute value.
     *
     * @property String
     */
    name: String,

    /**
     * The field id attribute value.
     *
     * @property String
     */
    value: {
      default: null
    },

    /**
     * The placeholder attribute value.
     *
     * @property String
     */
    placeholder: String,

    /**
     * Is the field required.
     *
     * @property String
     */
    required: Boolean,

    /**
     * Add form-group wrapper to input
     *
     * @property String
     */
    group: {
      type: Boolean,
      value: true
    },

    /**
     * The regex pattern for validation.
     *
     * @property String
     */
    pattern: String,

    /**
     * An inline field validation error.
     *
     * @property String|Boolean
     */
    error: String,

    /**
     * An inline field validation errors passed as object with key/value
     * pairs. If errors passed as an object, the form name will be used for
     * the key.
     *
     * @property Object|Boolean
     */
    errors: {
      type: Object,
      default: function _default() {
        return {};
      }
    },

    /**
     * Some feedback to add to the field once the field is successfully
     * valid.
     *
     * @property String
     */
    feedback: [String, Array],

    /**
     * An array of event names that correlate with callback functions
     *
     * @property Function
     */
    bindEvents: {
      type: Array,
      default: function _default() {
        return ['focus', 'blur', 'change', 'click', 'keyup', 'keydown', 'progress'];
      }
    },

    /**
     * The default class name assigned to the control element
     *
     * @property String
     */
    defaultControlClass: {
      type: String,
      default: 'form-control'
    },

    /**
     * Hide the label for browsers, but leave it for screen readers.
     *
     * @property String
     */
    hideLabel: Boolean,

    /**
     * Additional margin/padding classes for fine control of spacing
     *
     * @property String
     */
    spacing: String,

    /**
     * The size of the form control
     *
     * @property String
     */
    size: {
      type: String,
      default: 'md',
      validate: function validate(value) {
        return ['sm', 'md', 'lg'].indexOf(value) !== -1;
      }
    },

    /**
     * Display the form field inline
     *
     * @property String
     */
    inline: Boolean,

    /**
     * If the form control is readonly, display only as text?
     *
     * @property String
     */
    plaintext: Boolean,

    /**
     * Is the form control readonly?
     *
     * @property String
     */
    readonly: Boolean,

    /**
     * Is the form control disabled?
     *
     * @property String
     */
    disabled: Boolean,

    /**
     * Some instructions to appear under the field label
     *
     * @property String
     */
    helpText: String
  },
  directives: {
    bindEvents: {
      bind: function bind(el, binding, vnode) {
        var events = binding.value || vnode.context.bindEvents;
        each(events, function (name) {
          el.addEventListener(name, function (event) {
            vnode.context.$emit(name, event);
          });
        });
      }
    }
  },
  methods: {
    getInputField: function getInputField() {
      return this.$el.querySelector('.form-control, input, select, textarea');
    },
    getFieldErrors: function getFieldErrors() {
      var errors = this.error || this.errors;

      if (isObject_1(this.errors)) {
        errors = this.errors[this.name || this.id];
      }

      return !errors || isArray_1(errors) || isObject_1(errors) ? errors : [errors];
    },
    updated: function updated(value, event) {
      this.$emit(event || 'input', value);
    }
  },
  computed: {
    callbacks: function callbacks() {
      var _this = this;

      return this.bindEvents.map(function (event) {
        return {
          name: event,
          callback: _this[camelCase_1(['on', event].join(' '))]
        };
      }).filter(function (event) {
        return !isUndefined_1(event.callback);
      });
    },
    invalidFeedback: function invalidFeedback() {
      if (this.error) {
        return this.error;
      }

      var errors = this.getFieldErrors();
      return isArray_1(errors) ? errors.join('<br>') : errors;
    },
    validFeedback: function validFeedback() {
      return isArray_1(this.feedback) ? this.feedback.join('<br>') : this.feedback;
    },
    controlClass: function controlClass() {
      return this.defaultControlClass + (this.plaintext ? '-plaintext' : '');
    },
    controlSizeClass: function controlSizeClass() {
      return prefix(this.size, this.controlClass);
    },
    controlClasses: function controlClasses() {
      return [this.controlClass, this.controlSizeClass, this.spacing || '', this.invalidFeedback ? 'is-invalid' : ''].join(' ');
    },
    hasDefaultSlot: function hasDefaultSlot() {
      return !!this.$slots.default;
    }
  }
};
var InputField = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('form-group', [_vm._t("label", [_vm.label || _vm.hasDefaultSlot ? _c('form-label', {
      attrs: {
        "for": _vm.id
      },
      domProps: {
        "innerHTML": _vm._s(_vm.label)
      }
    }) : _vm._e()]), _vm._v(" "), _vm._t("control", [_c('input', {
      directives: [{
        name: "bind-events",
        rawName: "v-bind-events",
        value: _vm.bindEvents,
        expression: "bindEvents"
      }],
      class: _vm.$mergeClasses(_vm.controlClasses, _vm.colorableClasses),
      attrs: {
        "id": _vm.id,
        "type": _vm.type,
        "placeholder": _vm.placeholder,
        "required": _vm.required,
        "disabled": _vm.disabled || _vm.readonly,
        "readonly": _vm.readonly,
        "pattern": _vm.pattern,
        "aria-label": _vm.label,
        "aria-describedby": _vm.id
      },
      domProps: {
        "value": _vm.value
      },
      on: {
        "input": function input($event) {
          _vm.updated($event.target.value);
        }
      }
    })]), _vm._v(" "), _vm._t("default"), _vm._v(" "), _vm._t("help", [_vm.helpText ? _c('help-text', {
      domProps: {
        "innerHTML": _vm._s(_vm.helpText)
      }
    }) : _vm._e()]), _vm._v(" "), _vm._t("feedback", [_vm.validFeedback ? _c('form-feedback', {
      attrs: {
        "valid": ""
      },
      domProps: {
        "innerHTML": _vm._s(_vm.validFeedback)
      }
    }) : _vm._e(), _vm._v(" "), _vm.invalidFeedback ? _c('form-feedback', {
      attrs: {
        "invalid": ""
      },
      domProps: {
        "innerHTML": _vm._s(_vm.invalidFeedback)
      }
    }) : _vm._e()])], 2);
  },
  staticRenderFns: [],
  name: 'input-field',
  mixins: [Colorable, FormControl],
  components: {
    HelpText: HelpText,
    FormGroup: FormGroup,
    FormLabel: FormLabel,
    FormFeedback: FormFeedback
  },
  props: {
    /**
     * The type attribute
     *
     * @property String
     */
    type: {
      type: String,
      default: 'text'
    }
  }
};
var FileField = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('form-group', [_vm._t("label", [_vm.label || _vm.hasDefaultSlot ? _c('form-label', {
      attrs: {
        "for": _vm.id
      }
    }, [_vm._t("default", [_vm._v(_vm._s(_vm.label))])], 2) : _vm._e()]), _vm._v(" "), _c('div', {
      staticClass: "custom-file"
    }, [_vm._t("placeholder", [_c('form-label', {
      class: _vm.$mergeClasses(_vm.colorableClasses, 'custom-file-label'),
      attrs: {
        "for": _vm.id
      },
      domProps: {
        "innerHTML": _vm._s(_vm.placeholder || 'Choose file')
      }
    })]), _vm._v(" "), _c('input', {
      directives: [{
        name: "bind-events",
        rawName: "v-bind-events"
      }],
      class: _vm.controlClasses,
      attrs: {
        "type": "file",
        "id": _vm.id,
        "width": _vm.width,
        "height": _vm.height,
        "required": _vm.required,
        "multiple": _vm.multiple,
        "readonly": _vm.readonly
      },
      on: {
        "change": function change($event) {
          _vm.updated($event.target.files, 'change');
        }
      }
    }), _vm._v(" "), _vm._t("help", [_vm.helpText ? _c('help-text', {
      domProps: {
        "innerHTML": _vm._s(_vm.helpText)
      }
    }) : _vm._e()]), _vm._v(" "), _vm._t("feedback", [_vm.validFeedback ? _c('form-feedback', {
      attrs: {
        "valid": ""
      },
      domProps: {
        "innerHTML": _vm._s(_vm.validFeedback)
      }
    }) : _vm._e(), _vm._v(" "), _vm.invalidFeedback ? _c('form-feedback', {
      attrs: {
        "invalid": ""
      },
      domProps: {
        "innerHTML": _vm._s(_vm.invalidFeedback)
      }
    }) : _vm._e()])], 2)], 2);
  },
  staticRenderFns: [],
  name: 'file-field',
  extends: InputField,
  model: {
    event: 'change'
  },
  props: {
    /**
     * An array of event names that correlate with callback functions
     *
     * @property Function
     */
    bindEvents: {
      type: Array,
      default: function _default() {
        return ['focus', 'blur', 'input', 'click', 'keyup', 'keydown', 'progress'];
      }
    },

    /**
     * The class name assigned to the control element
     *
     * @property String
     */
    defaultControlClass: {
      type: String,
      default: 'custom-file-input'
    },

    /**
     * An array of valid extensions
     *
     * @property String
     */
    extensions: Array,

    /**
     * The type attribute
     *
     * @property String
     */
    multiple: Boolean,

    /**
     * The height attribute for the control element
     *
     * @property String
     */
    height: [Number, String],

    /**
     * The width attribute for the control element
     *
     * @property String
     */
    width: [Number, String]
  }
};
var BtnFile = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('btn', {
      staticClass: "btn-file",
      attrs: {
        "type": _vm.type,
        "variant": _vm.variant,
        "block": _vm.block,
        "size": _vm.size,
        "disabled": _vm.disabled,
        "active": _vm.active
      }
    }, [_vm._t("default"), _vm._v(" "), _c('input', {
      directives: [{
        name: "bind-events",
        rawName: "v-bind-events"
      }],
      class: _vm.controlClasses,
      attrs: {
        "type": "file",
        "id": _vm.id,
        "width": _vm.width,
        "height": _vm.height,
        "required": _vm.required,
        "multiple": _vm.multiple,
        "readonly": _vm.readonly
      },
      on: {
        "change": function change($event) {
          _vm.updated($event.target.files, 'change');
        }
      }
    })], 2);
  },
  staticRenderFns: [],
  name: 'btn-file',
  mixins: [Btn, FileField],
  model: {
    event: 'change'
  },
  props: {
    /**
     * The type attribute for the button. Not applied if an anchor
     *
     * @property String
     */
    type: {
      type: String,
      default: 'button'
    }
  }
};
var plugin$12 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      BtnFile: BtnFile
    });
  }
});
var BtnGroup = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      class: _vm.classes,
      attrs: {
        "role": "group"
      }
    }, [_vm._l(_vm.buttons, function (button, i) {
      return _vm.buttons ? _c('btn', _vm._b({
        key: i
      }, 'btn', button, false)) : _vm._e();
    }), _vm._v(" "), _vm._t("default")], 2);
  },
  staticRenderFns: [],
  name: 'btn-group',
  mixins: [Colorable, Sizeable],
  props: {
    /**
     * An array of buttons
     *
     * @prop {Array}
     */
    buttons: Array,

    /**
     * Display the buttons vertically
     *
     * @prop {Boolean}
     */
    vertical: Boolean
  },
  computed: {
    classes: function classes() {
      return this.$mergeClasses(this.sizeableClass, this.colorableClasses, {
        'btn-group': !this.vertical,
        'btn-group-vertical': this.vertical
      });
    }
  }
};
var BtnToolbar = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "btn-toolbar",
      attrs: {
        "role": "toolbar"
      }
    }, [_vm._t("default")], 2);
  },
  staticRenderFns: [],
  name: 'btn-toolbar'
};
var plugin$13 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      BtnGroup: BtnGroup,
      BtnToolbar: BtnToolbar
    });
  }
});

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

var Proxy = {
  methods: {
    proxy: function proxy(callback, event) {
      if (isFunction_1(callback)) {
        callback.apply(this, [].slice.call(arguments).splice(1));
        event.preventDefault();
      }
    }
  }
};
var DropdownMenuItem = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c(_vm.component, {
      tag: "component",
      staticClass: "dropdown-item",
      class: {
        'active': _vm.active
      },
      attrs: {
        "href": _vm.href || (_vm.component === 'a' ? '#' : false),
        "type": _vm.component === 'button' ? 'button' : false
      },
      on: {
        "click": function click($event) {
          _vm.onClick($event);
        }
      }
    }, [_vm.icon ? _c('i', {
      class: _vm.icon
    }) : _vm._e(), _vm._v(" "), _vm._t("default", [_vm._v(_vm._s(_vm.label))])], 2);
  },
  staticRenderFns: [],
  mixins: [Proxy],
  props: {
    /**
     * Is the menu item active.
     *
     * @property Object
     */
    active: Boolean,

    /**
     * Is the menu item a button
     *
     * @property Object
     */
    button: Boolean,

    /**
     * The `element` attribute.
     *
     * @property Object
     */
    element: String,

    /**
     * The `href` attribute.
     *
     * @property Object
     */
    href: String,

    /**
     * The icon of the dropdown menu item.
     *
     * @property Object
     */
    icon: String,

    /**
     * The label of the dropdown menu item.
     *
     * @property Object
     */
    label: String
  },
  computed: {
    component: function component() {
      return this.element || (this.button ? 'button' : 'a');
    }
  },
  methods: {
    /**
     * A callback function for the `click` event.
     *
     * @property Object
     */
    onClick: function onClick(event) {
      this.$emit('click', event);
    }
  }
};
var DropdownMenuHeader = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('h5', {
      staticClass: "dropdown-header"
    }, [_vm._t("default", [_vm._v(_vm._s(_vm.header))])], 2);
  },
  staticRenderFns: [],
  name: 'dropdown-menu-header',
  props: {
    /**
     * The value of the header
     *
     * @property Object
     */
    header: String
  }
};
var DropdownMenuDivider = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "dropdown-divider"
    });
  },
  staticRenderFns: [],
  name: 'dropdown-menu-divider'
};
var DropdownMenu = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "dropdown-menu",
      class: {
        'dropdown-menu-right': _vm.align === 'right',
        'show': _vm.show
      },
      attrs: {
        "aria-labelledby": _vm.id,
        "tabindex": "-1"
      },
      on: {
        "click": _vm.onClick
      }
    }, [_vm._l(_vm.items, function (item) {
      return [_c(_vm.prefix(item.type || 'item', 'dropdown-menu'), _vm._b({
        tag: "component"
      }, 'component', item, false))];
    }), _vm._v(" "), _vm._t("default")], 2);
  },
  staticRenderFns: [],
  components: {
    DropdownMenuItem: DropdownMenuItem,
    DropdownMenuHeader: DropdownMenuHeader,
    DropdownMenuDivider: DropdownMenuDivider
  },
  props: {
    /**
     * The `id` attribute on the toggle button and aria label. If no `id` is
     * defined, then a UUID will be generated instead.
     *
     * @property Object
     */
    id: {
      type: String,
      default: uuid
    },

    /**
     * Display the dropdown menu aligned left or right
     *
     * @property String
     */
    align: {
      type: String,
      default: 'left',
      validate: function validate(value) {
        return ['left', 'right'].indexOf(value.toLowerCase()) !== -1;
      }
    },

    /**
     * The default visibility of the dropdown menu.
     *
     * @property Object
     */
    show: Boolean,

    /**
     * An array of dropdown items. If an key/value pair isn't defined, the
     * default value will be used. If no items are defined, then the slot
     * named "items" can be used to define the options with HTML.
     *
     * [{
     *      type: 'item', // String [item|header|divider]
     *      href: '#', // String
     *      label: 'Some label', // String
     *      onClick: (event) => {} // Function
     * }]
     *
     * @property Array
     */
    items: Array
  },
  methods: {
    prefix: prefix,

    /**
     * A callback function for the `click` event.
     *
     * @param Object event
     * @param Object item
     * @return void
     */
    onClick: function onClick(event) {
      this.$emit('click', event, this);
    },

    /**
     * A callback function for the `click` event.
     *
     * @param Object event
     * @param Object item
     * @return void
     */
    onItemClick: function onItemClick(event, item) {
      this.$emit('item:click', event, item);
    }
  },
  mounted: function mounted() {
    var _this = this;

    each(this.$children, function (child) {
      child.$on('click', function (event) {
        _this.onItemClick(event, child);
      });
    });
  }
};
var plugin$14 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      DropdownMenu: DropdownMenu,
      DropdownMenuDivider: DropdownMenuDivider,
      DropdownMenuHeader: DropdownMenuHeader,
      DropdownMenuItem: DropdownMenuItem
    });
  }
});
var global$1$1 = typeof global$1 !== "undefined" ? global$1 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.14.3
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
var timeoutDuration = 0;

for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
  if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
    timeoutDuration = 1;
    break;
  }
}

function microtaskDebounce(fn) {
  var called = false;
  return function () {
    if (called) {
      return;
    }

    called = true;
    window.Promise.resolve().then(function () {
      called = false;
      fn();
    });
  };
}

function taskDebounce(fn) {
  var scheduled = false;
  return function () {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

var supportsMicroTasks = isBrowser && window.Promise;
/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/

var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;
/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */

function isFunction$2(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}
/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */


function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  } // NOTE: 1 DOM access here


  var css = getComputedStyle(element, null);
  return property ? css[property] : css;
}
/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */


function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }

  return element.parentNode || element.host;
}
/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */


function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element) {
    return document.body;
  }

  switch (element.nodeName) {
    case 'HTML':
    case 'BODY':
      return element.ownerDocument.body;

    case '#document':
      return element.body;
  } // Firefox want us to check `-x` and `-y` variations as well


  var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}

var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);
/**
 * Determines if the browser is Internet Explorer
 * @method
 * @memberof Popper.Utils
 * @param {Number} version to check
 * @returns {Boolean} isIE
 */

function isIE(version) {
  if (version === 11) {
    return isIE11;
  }

  if (version === 10) {
    return isIE10;
  }

  return isIE11 || isIE10;
}
/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */


function getOffsetParent(element) {
  if (!element) {
    return document.documentElement;
  }

  var noOffsetParent = isIE(10) ? document.body : null; // NOTE: 1 DOM access here

  var offsetParent = element.offsetParent; // Skip hidden elements which don't have an offsetParent

  while (offsetParent === noOffsetParent && element.nextElementSibling) {
    offsetParent = (element = element.nextElementSibling).offsetParent;
  }

  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return element ? element.ownerDocument.documentElement : document.documentElement;
  } // .offsetParent will return the closest TD or TABLE in case
  // no offsetParent is present, I hate this job...


  if (['TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}

function isOffsetContainer(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY') {
    return false;
  }

  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}
/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */


function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}
/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */


function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  } // Here we make sure to give as "start" the element that comes first in the DOM


  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1; // Get common ancestor container

  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer; // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  } // one of the nodes is inside shadowDOM, find which one


  var element1root = getRoot(element1);

  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}
/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */


function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';
  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    var html = element.ownerDocument.documentElement;
    var scrollingElement = element.ownerDocument.scrollingElement || html;
    return scrollingElement[upperSide];
  }

  return element[upperSide];
}
/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */


function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}
/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */


function getBordersSize(styles, axis) {
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';
  return parseFloat(styles['border' + sideA + 'Width'], 10) + parseFloat(styles['border' + sideB + 'Width'], 10);
}

function getSize(axis, body, html, computedStyle) {
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? html['offset' + axis] + computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')] + computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')] : 0);
}

function getWindowSizes() {
  var body = document.body;
  var html = document.documentElement;
  var computedStyle = isIE(10) && getComputedStyle(html);
  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}

var classCallCheck = function classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineProperty$1 = function defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends$1 = Object.assign || function (target) {
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
/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */


function getClientRect(offsets) {
  return _extends$1({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}
/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */


function getBoundingClientRect(element) {
  var rect = {}; // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11

  try {
    if (isIE(10)) {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } else {
      rect = element.getBoundingClientRect();
    }
  } catch (e) {}

  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  }; // subtract scrollbar size from sizes

  var sizes = element.nodeName === 'HTML' ? getWindowSizes() : {};
  var width = sizes.width || element.clientWidth || result.right - result.left;
  var height = sizes.height || element.clientHeight || result.bottom - result.top;
  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height; // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons

  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');
    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }

  return getClientRect(result);
}

function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var isIE10 = isIE(10);
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);
  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
  var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10); // In cases where the parent is fixed, we must ignore negative scroll in offset calc

  if (fixedPosition && parent.nodeName === 'HTML') {
    parentRect.top = Math.max(parentRect.top, 0);
    parentRect.left = Math.max(parentRect.left, 0);
  }

  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0; // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.

  if (!isIE10 && isHTML) {
    var marginTop = parseFloat(styles.marginTop, 10);
    var marginLeft = parseFloat(styles.marginLeft, 10);
    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft; // Attach marginTop and marginLeft because in some circumstances we may need them

    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}

function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var html = element.ownerDocument.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);
  var scrollTop = !excludeScroll ? getScroll(html) : 0;
  var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;
  var offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  };
  return getClientRect(offset);
}
/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */


function isFixed(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }

  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }

  return isFixed(getParentNode(element));
}
/**
 * Finds the first parent of an element that has a transformed property defined
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} first transformed parent or documentElement
 */


function getFixedPositionOffsetParent(element) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element || !element.parentElement || isIE()) {
    return document.documentElement;
  }

  var el = element.parentElement;

  while (el && getStyleComputedProperty(el, 'transform') === 'none') {
    el = el.parentElement;
  }

  return el || document.documentElement;
}
/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @param {Boolean} fixedPosition - Is in fixed position mode
 * @returns {Object} Coordinates of the boundaries
 */


function getBoundaries(popper, reference, padding, boundariesElement) {
  var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false; // NOTE: 1 DOM access here

  var boundaries = {
    top: 0,
    left: 0
  };
  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference); // Handle viewport case

  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;

    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(reference));

      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = popper.ownerDocument.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = popper.ownerDocument.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition); // In case of HTML, we need a different computation

    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  } // Add paddings


  boundaries.left += padding;
  boundaries.top += padding;
  boundaries.right -= padding;
  boundaries.bottom -= padding;
  return boundaries;
}

function getArea(_ref) {
  var width = _ref.width,
      height = _ref.height;
  return width * height;
}
/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);
  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };
  var sortedAreas = Object.keys(rects).map(function (key) {
    return _extends$1({
      key: key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function (a, b) {
    return b.area - a.area;
  });
  var filteredAreas = sortedAreas.filter(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });
  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;
  var variation = placement.split('-')[1];
  return computedPlacement + (variation ? '-' + variation : '');
}
/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @param {Element} fixedPosition - is in fixed position mode
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */


function getReferenceOffsets(state, popper, reference) {
  var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
}
/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */


function getOuterSizes(element) {
  var styles = getComputedStyle(element);
  var x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
  var y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}
/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */


function getOppositePlacement(placement) {
  var hash = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom'
  };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}
/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */


function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0]; // Get popper node sizes

  var popperRect = getOuterSizes(popper); // Add position, width and height to our offsets object

  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  }; // depending by the popper placement we have to compute its offsets slightly differently

  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  var mainSide = isHoriz ? 'top' : 'left';
  var secondarySide = isHoriz ? 'left' : 'top';
  var measurement = isHoriz ? 'height' : 'width';
  var secondaryMeasurement = !isHoriz ? 'height' : 'width';
  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;

  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}
/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */


function find(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  } // use `filter` to obtain the same behavior of `find`


  return arr.filter(check)[0];
}
/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */


function findIndex(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(function (cur) {
      return cur[prop] === value;
    });
  } // use `find` + `indexOf` if `findIndex` isn't supported


  var match = find(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}
/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */


function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));
  modifiersToRun.forEach(function (modifier) {
    if (modifier['function']) {
      // eslint-disable-line dot-notation
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }

    var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation

    if (modifier.enabled && isFunction$2(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);
      data = fn(data, modifier);
    }
  });
  return data;
}
/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */


function update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  }; // compute reference element offsets

  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed); // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value

  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding); // store the computed placement inside `originalPlacement`

  data.originalPlacement = data.placement;
  data.positionFixed = this.options.positionFixed; // compute the popper offsets

  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);
  data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute'; // run the modifiers

  data = runModifiers(this.modifiers, data); // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback

  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}
/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */


function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref) {
    var name = _ref.name,
        enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}
/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */


function getSupportedPropertyName(property) {
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var i = 0; i < prefixes.length; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? '' + prefix + upperProp : property;

    if (typeof document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }

  return null;
}
/**
 * Destroy the popper
 * @method
 * @memberof Popper
 */


function destroy() {
  this.state.isDestroyed = true; // touch DOM only if `applyStyle` modifier is enabled

  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
    this.popper.removeAttribute('x-placement');
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style.left = '';
    this.popper.style.right = '';
    this.popper.style.bottom = '';
    this.popper.style.willChange = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  }

  this.disableEventListeners(); // remove the popper if user explicity asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it

  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }

  return this;
}
/**
 * Get the window associated with the element
 * @argument {Element} element
 * @returns {Window}
 */


function getWindow(element) {
  var ownerDocument = element.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView : window;
}

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
  target.addEventListener(event, callback, {
    passive: true
  });

  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }

  scrollParents.push(target);
}
/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */


function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  getWindow(reference).addEventListener('resize', state.updateBound, {
    passive: true
  }); // Scroll event listener on scroll parents

  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;
  return state;
}
/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */


function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}
/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */


function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  getWindow(reference).removeEventListener('resize', state.updateBound); // Remove scroll event listener on scroll parents

  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  }); // Reset state

  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}
/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger onUpdate callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */


function disableEventListeners() {
  if (this.state.eventsEnabled) {
    cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}
/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */


function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}
/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */


function setStyles(element, styles) {
  Object.keys(styles).forEach(function (prop) {
    var unit = ''; // add unit if the value is numeric and is one of the following

    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }

    element.style[prop] = styles[prop] + unit;
  });
}
/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */


function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (prop) {
    var value = attributes[prop];

    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */


function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles); // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element

  setAttributes(data.instance.popper, data.attributes); // if arrowElement is defined and arrowStyles has some properties

  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}
/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper
 * @param {Object} options - Popper.js options
 */


function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed); // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value

  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);
  popper.setAttribute('x-placement', placement); // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations

  setStyles(popper, {
    position: options.positionFixed ? 'fixed' : 'absolute'
  });
  return options;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function computeStyle(data, options) {
  var x = options.x,
      y = options.y;
  var popper = data.offsets.popper; // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;

  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }

  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;
  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent); // Styles

  var styles = {
    position: popper.position
  }; // Avoid blurry text by using full pixel integers.
  // For pixel-perfect positioning, top/bottom prefers rounded
  // values, while left/right prefers floored values.

  var offsets = {
    left: Math.floor(popper.left),
    top: Math.round(popper.top),
    bottom: Math.round(popper.bottom),
    right: Math.floor(popper.right)
  };
  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right'; // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed

  var prefixedProperty = getSupportedPropertyName('transform'); // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.

  var left = void 0,
      top = void 0;

  if (sideA === 'bottom') {
    top = -offsetParentRect.height + offsets.bottom;
  } else {
    top = offsets.top;
  }

  if (sideB === 'right') {
    left = -offsetParentRect.width + offsets.right;
  } else {
    left = offsets.left;
  }

  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  } // Attributes


  var attributes = {
    'x-placement': data.placement
  }; // Update `data` attributes, styles and arrowStyles

  data.attributes = _extends$1({}, attributes, data.attributes);
  data.styles = _extends$1({}, styles, data.styles);
  data.arrowStyles = _extends$1({}, data.offsets.arrow, data.arrowStyles);
  return data;
}
/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */


function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = find(modifiers, function (_ref) {
    var name = _ref.name;
    return name === requestingName;
  });
  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    var _requesting = '`' + requestingName + '`';

    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
  }

  return isRequired;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function arrow(data, options) {
  var _data$offsets$arrow; // arrow depends on keepTogether in order to work


  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }

  var arrowElement = options.element; // if arrowElement is a string, suppose it's a CSS selector

  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement); // if arrowElement is not found, don't run the modifier

    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    }
  }

  var placement = data.placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var isVertical = ['left', 'right'].indexOf(placement) !== -1;
  var len = isVertical ? 'height' : 'width';
  var sideCapitalized = isVertical ? 'Top' : 'Left';
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? 'left' : 'top';
  var opSide = isVertical ? 'bottom' : 'right';
  var arrowElementSize = getOuterSizes(arrowElement)[len]; //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjuction
  //
  // top/left side

  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  } // bottom/right side


  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }

  data.offsets.popper = getClientRect(data.offsets.popper); // compute center of the popper

  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2; // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available

  var css = getStyleComputedProperty(data.instance.popper);
  var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
  var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);
  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide; // prevent arrowElement from being placed not contiguously to its popper

  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);
  data.arrowElement = arrowElement;
  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty$1(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty$1(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);
  return data;
}
/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */


function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }

  return variation;
}
/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-right` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */


var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start']; // Get rid of `auto` `auto-start` and `auto-end`

var validPlacements = placements.slice(3);
/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */

function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}

var BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */

function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }

  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);
  var placement = data.placement.split('-')[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split('-')[1] || '';
  var flipOrder = [];

  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;

    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;

    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;

    default:
      flipOrder = options.behavior;
  }

  flipOrder.forEach(function (step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);
    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference; // using floor because the reference offsets may contain decimals we are not going to consider here

    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);
    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);
    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom; // flip the variation if required

    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    var flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : ''); // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future

      data.offsets.popper = _extends$1({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));
      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function keepTogether(data) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var placement = data.placement.split('-')[0];
  var floor = Math.floor;
  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  var side = isVertical ? 'right' : 'bottom';
  var opSide = isVertical ? 'left' : 'top';
  var measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }

  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }

  return data;
}
/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */


function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2]; // If it's not a number it's an operator, I guess

  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    var element = void 0;

    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;

      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }

    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    var size = void 0;

    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }

    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}
/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */


function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0]; // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one

  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1; // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)

  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  }); // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space

  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  } // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.


  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments]; // Convert the values with units to absolute pixels to allow our computations

  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, []) // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  }); // Loop trough the offsets arrays and execute the operations

  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */


function offset(data, _ref) {
  var offset = _ref.offset;
  var placement = data.placement,
      _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var basePlacement = placement.split('-')[0];
  var offsets = void 0;

  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }

  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }

  data.popper = popper;
  return data;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper); // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken

  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  } // NOTE: DOM access here
  // resets the popper's position so that the document size can be calculated excluding
  // the size of the popper element itself


  var transformProp = getSupportedPropertyName('transform');
  var popperStyles = data.instance.popper.style; // assignment to help minification

  var top = popperStyles.top,
      left = popperStyles.left,
      transform = popperStyles[transformProp];
  popperStyles.top = '';
  popperStyles.left = '';
  popperStyles[transformProp] = '';
  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed); // NOTE: DOM access here
  // restores the original style properties after the offsets have been computed

  popperStyles.top = top;
  popperStyles.left = left;
  popperStyles[transformProp] = transform;
  options.boundaries = boundaries;
  var order = options.priority;
  var popper = data.offsets.popper;
  var check = {
    primary: function primary(placement) {
      var value = popper[placement];

      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }

      return defineProperty$1({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];

      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }

      return defineProperty$1({}, mainSide, value);
    }
  };
  order.forEach(function (placement) {
    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends$1({}, popper, check[side](placement));
  });
  data.offsets.popper = popper;
  return data;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var shiftvariation = placement.split('-')[1]; // if shift shiftvariation is specified, run the modifier

  if (shiftvariation) {
    var _data$offsets = data.offsets,
        reference = _data$offsets.reference,
        popper = _data$offsets.popper;
    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';
    var shiftOffsets = {
      start: defineProperty$1({}, side, reference[side]),
      end: defineProperty$1({}, side, reference[side] + reference[measurement] - popper[measurement])
    };
    data.offsets.popper = _extends$1({}, popper, shiftOffsets[shiftvariation]);
  }

  return data;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'preventOverflow';
  }).boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }

  return data;
}
/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */


function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;
  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;
  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;
  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);
  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);
  return data;
}
/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */


var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unitless, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the height.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > More on this [reading this issue](https://github.com/FezVrasta/popper.js/issues/373)
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: offset,

    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * An scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: preventOverflow,

    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],

    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper this makes sure the popper has always a little padding
     * between the edges of its container
     */
    padding: 5,

    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier, can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near eachothers
   * without leaving any gap between the two. Expecially useful when the arrow is
   * enabled and you want to assure it to point to its reference element.
   * It cares only about the first axis, you can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjuction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: arrow,

    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: flip,

    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations).
     */
    behavior: 'flip',

    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,

    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position,
     * the popper will never be placed outside of the defined boundaries
     * (except if keepTogether is enabled)
     */
    boundariesElement: 'viewport'
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,

    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,

    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: hide
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: computeStyle,

    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3d transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties.
     */
    gpuAcceleration: true,

    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',

    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define you own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,

    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,

    /** @prop {ModifierFn} */
    fn: applyStyle,

    /** @prop {Function} */
    onLoad: applyStyleOnLoad,

    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3d transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties.
     */
    gpuAcceleration: undefined
  }
};
/**
 * The `dataObject` is an object containing all the informations used by Popper.js
 * this object get passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper.
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper, it expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow, it expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements.
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overriden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass as 3rd argument an object with the same
 * structure of this object, example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */

var Defaults = {
  /**
   * Popper's placement
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Set this to true if you want popper to position it self in 'fixed' mode
   * @prop {Boolean} positionFixed=false
   */
  positionFixed: false,

  /**
   * Whether events (resize, scroll) are initially enabled
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},

  /**
   * Callback called when the popper is updated, this callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js
   * @prop {modifiers}
   */
  modifiers: modifiers
};
/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */
// Utils
// Methods

var Popper = function () {
  /**
   * Create a new Popper.js instance
   * @class Popper
   * @param {HTMLElement|referenceObject} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as popper.
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    }; // make update() debounced, so that it only runs at most once-per-tick


    this.update = debounce(this.update.bind(this)); // with {} we create a new object with the options inside it

    this.options = _extends$1({}, Popper.Defaults, options); // init state

    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    }; // get reference and popper elements (allow jQuery wrappers)

    this.reference = reference && reference.jquery ? reference[0] : reference;
    this.popper = popper && popper.jquery ? popper[0] : popper; // Deep merge modifiers options

    this.options.modifiers = {};
    Object.keys(_extends$1({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends$1({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    }); // Refactoring modifiers' list (Object => Array)

    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends$1({
        name: name
      }, _this.options.modifiers[name]);
    }) // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    }); // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!

    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction$2(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    }); // fire the first update to position the popper in the right place

    this.update();
    var eventsEnabled = this.options.eventsEnabled;

    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  } // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


  createClass(Popper, [{
    key: 'update',
    value: function update$$1() {
      return update.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
    }
    /**
     * Schedule an update, it will run on the next UI update available
     * @method scheduleUpdate
     * @memberof Popper
     */

    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */

  }]);
  return Popper;
}();
/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */


Popper.Utils = (typeof window !== 'undefined' ? window : global$1$1).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;
var TAB_KEYCODE = 9;
var LEFT_ARROW_KEYCODE = 37;
var RIGHT_ARROW_KEYCODE = 39;
var UP_ARROW_KEYCODE = 38;
var DOWN_ARROW_KEYCODE = 40;
var ignoreBlurEvent = false;
var BtnDropdown = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _vm.split ? _c('btn-group', {
      on: {
        "click": _vm.onClick
      }
    }, [!_vm.dropleft ? [_vm.href ? _c('a', {
      class: _vm.actionClasses,
      attrs: {
        "href": _vm.href
      }
    }, [_vm._t("label", [_vm.icon ? _c('i', {
      class: _vm.icon
    }) : _vm._e(), _vm._v(" " + _vm._s(_vm.label))])], 2) : _c('button', {
      class: _vm.actionClasses,
      attrs: {
        "type": _vm.type
      }
    }, [_vm._t("label-wrapper", [_vm.icon ? _c('i', {
      class: _vm.icon
    }) : _vm._e(), _vm._v(" "), _vm._t("label", [_vm._v(_vm._s(_vm.label))])])], 2)] : _vm._e(), _vm._v(" "), _c('btn-group', {
      class: {
        'dropup': _vm.dropup,
        'dropright': _vm.dropright,
        'dropleft': _vm.dropleft
      }
    }, [_c('button', {
      class: _vm.toggleClasses,
      attrs: {
        "type": "button",
        "aria-haspopup": "true",
        "aria-expanded": _vm.isDropdownShowing,
        "id": _vm.id
      },
      on: {
        "click": function click($event) {
          $event.preventDefault();
          !_vm.isDropdownShowing ? _vm.show() : _vm.hide();
        },
        "blur": _vm.onBlur
      }
    }), _vm._v(" "), _c('dropdown-menu', {
      attrs: {
        "id": _vm.id,
        "items": _vm.items,
        "align": _vm.align,
        "show": _vm.isDropdownShowing
      },
      on: {
        "update:show": function updateShow($event) {
          _vm.isDropdownShowing = $event;
        },
        "click": _vm.onMenuClick,
        "item:click": _vm.onItemClick
      }
    }, [_vm._t("default")], 2)], 1), _vm._v(" "), _vm.dropleft ? [_vm.href ? _c('a', {
      class: _vm.actionClasses,
      attrs: {
        "href": _vm.href
      }
    }, [_vm._t("label", [_vm.icon ? _c('i', {
      class: _vm.icon
    }) : _vm._e(), _vm._v(" " + _vm._s(_vm.label))])], 2) : _c('button', {
      class: _vm.actionClasses,
      attrs: {
        "type": _vm.type
      }
    }, [_vm._t("label-wrapper", [_vm.icon ? _c('i', {
      class: _vm.icon
    }) : _vm._e(), _vm._v(" "), _vm._t("label", [_vm._v(_vm._s(_vm.label))])])], 2)] : _vm._e()], 2) : _c('btn-group', {
      class: {
        'dropup': _vm.dropup,
        'dropright': _vm.dropright,
        'dropleft': _vm.dropleft
      },
      on: {
        "click": _vm.onClick
      }
    }, [_c('button', {
      class: _vm.toggleClasses,
      attrs: {
        "aria-haspopup": "true",
        "aria-expanded": _vm.isDropdownShowing,
        "type": _vm.type,
        "id": _vm.id
      },
      on: {
        "click": function click($event) {
          $event.preventDefault();
          !_vm.isDropdownShowing ? _vm.show() : _vm.hide();
        },
        "blur": _vm.onBlur
      }
    }, [_vm._t("label", [_vm.icon ? _c('i', {
      class: _vm.icon
    }) : _vm._e(), _vm._v(" " + _vm._s(_vm.label))])], 2), _vm._v(" "), _c('dropdown-menu', {
      attrs: {
        "id": _vm.id,
        "items": _vm.items,
        "align": _vm.align,
        "show": _vm.isDropdownShowing
      },
      on: {
        "update:show": function updateShow($event) {
          _vm.isDropdownShowing = $event;
        },
        "click": _vm.onMenuClick,
        "item:click": _vm.onItemClick
      }
    }, [_vm._t("default")], 2)], 1);
  },
  staticRenderFns: [],
  name: 'btn-dropdown',
  extends: Btn,
  components: {
    DropdownMenu: DropdownMenu
  },
  props: {
    /**
     * An array of dropdown items. If an key/value pair isn't defined, the
     * default value will be used. If no items are defined, then the slot
     * named "items" can be used to define the options with HTML.
     *
     * [{
     *      type: 'item', // String [item|header|divider]
     *      href: '#', // String
     *      label: 'Some label', // String
     *      onClick: (event) => {} // Function
     * }]
     *
     * @property Array
     */
    items: Array,

    /**
     * The button icon that appears before the label.
     *
     * @property String
     */
    autoclose: Boolean,

    /**
     * The button icon that appears before the label.
     *
     * @property String
     */
    icon: String,

    /**
     * The toggle button's label. If not defined as an attribute,
     * you can override with the component's slot (inner html).
     *
     * @property String
     */
    label: String,

    /**
     * The `id` attribute on the toggle button and aria label. If no `id` is
     * defined, then a UUID will be generated instead.
     *
     * @property String
     */
    id: {
      type: String,
      default: uuid
    },

    /**
     * The button type attribute.
     *
     * @property String
     */
    type: {
      type: String,
      default: 'button'
    },

    /**
     * Display the dropdown menu aligned left or right
     *
     * @property String
     */
    align: {
      type: String,
      default: 'left',
      validate: function validate(value) {
        return ['left', 'right'].indexOf(value.toLowerCase()) !== -1;
      }
    },

    /**
     * Display the dropdown button with a split toggle button.
     *
     * @property Boolean
     */
    split: {
      type: Boolean,
      default: false
    },

    /**
     * Display as a dropup instead of a dropdown.
     *
     * @property Boolean
     */
    dropup: {
      type: Boolean,
      default: false
    },

    /**
     * Display as a dropright instead of a dropdown.
     *
     * @property Boolean
     */
    dropright: {
      type: Boolean,
      default: false
    },

    /**
     * Display as a dropleft instead of a dropdown.
     *
     * @property Boolean
     */
    dropleft: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    /**
     * Focus on the the dropdown toggle button
     *
     * @return void
     */
    focus: function focus() {
      this.$el.querySelector('.dropdown-toggle').focus();
    },

    /**
     * Focus on the the dropdown toggle button
     *
     * @return void
     */
    queryFocusable: function queryFocusable() {
      return this.$el.querySelector('.dropdown-menu').querySelectorAll('label, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    },

    /**
     * Method to check if the given element is focusable.
     *
     * @return void
     */
    isFocusable: function isFocusable(element) {
      var nodes = this.queryFocusable();

      for (var i in nodes) {
        if (element === nodes[i]) {
          return true;
        }
      }

      return false;
    },

    /**
     * Toggle the dropdown menu
     *
     * @return void
     */
    toggle: function toggle() {
      !this.isDropdownShowing ? this.show() : this.hide();
    },

    /**
     * Show the dropdown menu
     *
     * @return void
     */
    show: function show() {
      var _this = this;

      this.isDropdownShowing = true;
      this.$nextTick(function () {
        var side = 'bottom';

        if (_this.dropup) {
          side = 'top';
        } else if (_this.dropleft) {
          side = 'left';
        } else if (_this.dropright) {
          side = 'right';
        }

        var menu = _this.$el.querySelector('.dropdown-menu');

        var toggle = _this.$el.querySelector('.dropdown-toggle');

        var position = [side, _this.align === 'left' ? 'start' : 'end'];
        new Popper(toggle, menu, {
          placement: position.join('-')
        });

        if (_this.queryFocusable().item(0)) {
          _this.$el.querySelector('input, select, textarea').focus();
        }

        _this.$emit('show');
      });
    },

    /**
     * Hide the dropdown menu
     *
     * @return void
     */
    hide: function hide() {
      this.$emit('toggle', this.isDropdownShowing = false);
      this.$emit('hide');
    },

    /**
     * A callback function for the `click` event for the action button
     *
     * @return void
     */
    onClick: function onClick(event) {
      console.log('click');
      this.hide();
      this.$emit('click', event);
    },

    /**
     * A callback function for the `blur` event for the action button
     *
     * @return void
     */
    onBlur: function onBlur(event) {
      if (!this.$el.contains(event.relatedTarget)) {
        this.hide();
      }
    },

    /**
     * A callback function for the `item:click` event for the action button
     *
     * @return void
     */
    onMenuClick: function onMenuClick(event, item) {
      if (event.target === this.$el.querySelector('.dropdown-menu')) {
        this.focus();
      }
    },

    /**
     * A callback function for the `item:click` event for the action button
     *
     * @return void
     */
    onItemClick: function onItemClick(event, item) {
      if (!this.isFocusable(event.target)) {
        this.hide();
      }

      this.$emit('item:click', event, item);
    }
  },
  computed: {
    variantClassPrefix: function variantClassPrefix() {
      return 'btn' + (this.outline ? '-outline' : '');
    },
    sizeableClassPrefix: function sizeableClassPrefix() {
      return 'btn';
    },
    actionClasses: function actionClasses() {
      return ['btn', prefix(this.size, 'btn'), prefix(this.variant, 'btn')].join(' ');
    },
    toggleClasses: function toggleClasses() {
      return ['btn', 'dropdown-toggle', this.variantClass, this.sizeableClass, this.active ? 'active' : '', this.block ? 'btn-block' : '', this.split ? 'dropdown-toggle-split' : ''].join(' ');
    }
  },
  data: function data() {
    return {
      isDropdownShowing: false
    };
  },
  mounted: function mounted() {
    var _this2 = this;

    each(this.$el.querySelectorAll('[type=submit], input, select, textarea, [tabindex]:not([tabindex="-1"]'), function (el) {
      var keydown = function keydown(event) {
        var ignore = [LEFT_ARROW_KEYCODE, RIGHT_ARROW_KEYCODE, UP_ARROW_KEYCODE, DOWN_ARROW_KEYCODE, TAB_KEYCODE];

        if (ignore.indexOf(event.keyCode) !== -1) {
          ignoreBlurEvent = true;
        }
      };

      var blur = function blur(event) {
        if (!ignoreBlurEvent) {
          _this2.focus();
        }

        ignoreBlurEvent = false;
      };

      var focus = function focus(event) {
        ignoreBlurEvent = false;
      };

      var mousedown = function mousedown(event) {
        ignoreBlurEvent = true;
      };

      el.addEventListener('blur', blur);
      el.addEventListener('focus', focus);
      el.addEventListener('keydown', keydown);
      el.addEventListener('mousedown', mousedown);
    });
  }
};
var plugin$15 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      BtnDropdown: BtnDropdown
    });
  }
});
var HasSlots = {
  methods: {
    getSlot: function getSlot(slot) {
      return this.$slots[slot];
    },
    hasSlot: function hasSlot(slot) {
      return !!this.$slots[slot];
    },
    hasSlots: function hasSlots(slots) {
      for (var i in slots) {
        if (!this.hasSlot(slots[i])) {
          return false;
        }
      }
    }
  },
  computed: {
    hasDefaultSlot: function hasDefaultSlot() {
      return this.hasSlot('default');
    }
  }
};
var Card = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      class: _vm.$mergeClasses(_vm.className, _vm.colorableClasses)
    }, [_vm._t("default")], 2);
  },
  staticRenderFns: [],
  name: 'card',
  mixins: [HasSlots, Colorable],
  computed: {
    className: function className() {
      return this.$options.name;
    }
  }
};
var CardBody = {
  name: 'card-body',
  extends: Card
};
var CardHeader = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c(_vm.element, {
      tag: "component",
      class: _vm.$mergeClasses(_vm.className, _vm.colorableClasses)
    }, [_vm._t("default")], 2);
  },
  staticRenderFns: [],
  name: 'card-header',
  extends: Card,
  props: {
    /**
     * The alt attribute
     *
     * @property String
     */
    element: {
      type: String,
      default: 'div'
    }
  }
};
var CardFooter = {
  name: 'card-footer',
  extends: CardHeader
};
var CardImg = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return !_vm.hasDefaultSlot ? _c('img', {
      class: _vm.className,
      attrs: {
        "src": _vm.src,
        "alt": _vm.alt
      }
    }) : _c('div', {
      class: _vm.className
    }, [_vm._t("default")], 2);
  },
  staticRenderFns: [],
  name: 'card-img',
  extends: Card,
  props: {
    /**
     * The alt attribute
     *
     * @property String
     */
    alt: String,

    /**
     * The src attribute
     *
     * @property String
     */
    src: String
  }
};
var CardImgTop = {
  name: 'card-img-top',
  extends: CardImg
};
var CardImgBottom = {
  name: 'card-img-bottom',
  extends: CardImg
};
var CardImgOverlay = {
  name: 'card-img-overlay',
  extends: Card
};
var CardLink = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('a', {
      class: _vm.$mergeClasses(_vm.className, _vm.colorableClasses),
      attrs: {
        "href": _vm.href
      },
      on: {
        "click": _vm.onClick
      }
    }, [_vm._t("default")], 2);
  },
  staticRenderFns: [],
  name: 'card-title',
  extends: Card,
  props: {
    /**
     * The alt attribute
     *
     * @property String
     */
    alt: String,

    /**
     * The src attribute
     *
     * @property String
     */
    href: String
  },
  methods: {
    onClick: function onClick(event) {
      this.$emit('click', event, this);
    }
  }
};
var CardSubtitle = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('h6', {
      class: _vm.$mergeClasses(_vm.className, _vm.colorableClasses)
    }, [_vm._t("default")], 2);
  },
  staticRenderFns: [],
  name: 'card-subtitle',
  extends: Card
};
var CardTitle = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('h5', {
      class: _vm.$mergeClasses(_vm.className, _vm.colorableClasses)
    }, [_vm._t("default")], 2);
  },
  staticRenderFns: [],
  name: 'card-title',
  mixins: [Card]
};
var plugin$16 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Card: Card,
      CardBody: CardBody,
      CardFooter: CardFooter,
      CardHeader: CardHeader,
      CardImg: CardImg,
      CardImgTop: CardImgTop,
      CardImgBottom: CardImgBottom,
      CardImgOverlay: CardImgOverlay,
      CardLink: CardLink,
      CardSubtitle: CardSubtitle,
      CardTitle: CardTitle
    });
  }
});
var RadioField = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      class: _vm.$mergeClasses(_vm.controlClass, _vm.customControlClass, _vm.sizeableClass, _vm.inline ? _vm.inlineClass : '')
    }, [_vm.custom && _vm.id ? [_c('input', {
      directives: [{
        name: "bind-events",
        rawName: "v-bind-events"
      }],
      class: _vm.$mergeClasses(_vm.inputClass, _vm.invalidFeedback ? 'is-invalid' : ''),
      attrs: {
        "type": "radio",
        "name": _vm.name,
        "id": _vm.id,
        "required": _vm.required,
        "disabled": _vm.disabled || _vm.readonly,
        "readonly": _vm.readonly,
        "pattern": _vm.pattern
      },
      domProps: {
        "value": _vm.value,
        "checked": _vm.checkedValue === _vm.value || _vm.checked
      },
      on: {
        "change": function change($event) {
          _vm.updated($event.target.value, 'change');
        }
      }
    }), _vm._v(" "), _c('label', {
      class: _vm.$mergeClasses(_vm.labelClass, _vm.colorableClasses),
      attrs: {
        "for": _vm.id
      }
    }, [_vm._t("default", [_vm._v(_vm._s(_vm.label))]), _vm._v(" "), _vm._t("feedback", [_vm.validFeedback ? _c('form-feedback', {
      attrs: {
        "valid": ""
      },
      domProps: {
        "innerHTML": _vm._s(_vm.validFeedback)
      }
    }) : _vm._e(), _vm._v(" "), _vm.invalidFeedback ? _c('form-feedback', {
      attrs: {
        "invalid": ""
      },
      domProps: {
        "innerHTML": _vm._s(_vm.invalidFeedback)
      }
    }) : _vm._e()])], 2)] : [_c('label', {
      class: _vm.$mergeClasses(_vm.labelClass, _vm.colorableClasses),
      attrs: {
        "for": _vm.id
      }
    }, [_c('input', {
      directives: [{
        name: "bind-events",
        rawName: "v-bind-events"
      }],
      class: _vm.$mergeClasses(_vm.inputClass, _vm.invalidFeedback ? 'is-invalid' : ''),
      attrs: {
        "type": "radio",
        "name": _vm.name,
        "id": _vm.id,
        "required": _vm.required,
        "disabled": _vm.disabled || _vm.readonly,
        "readonly": _vm.readonly,
        "pattern": _vm.pattern
      },
      domProps: {
        "value": _vm.value,
        "checked": _vm.checkedValue === _vm.value || _vm.checked
      },
      on: {
        "change": function change($event) {
          _vm.updated($event.target.value, 'change');
        }
      }
    }), _vm._v(" "), _vm._t("default", [_vm._v(_vm._s(_vm.label))]), _vm._v(" "), _vm._t("feedback", [_vm.validFeedback ? _c('form-feedback', {
      attrs: {
        "valid": ""
      },
      domProps: {
        "innerHTML": _vm._s(_vm.validFeedback)
      }
    }) : _vm._e(), _vm._v(" "), _vm.invalidFeedback ? _c('form-feedback', {
      attrs: {
        "invalid": ""
      },
      domProps: {
        "innerHTML": _vm._s(_vm.invalidFeedback)
      }
    }) : _vm._e()])], 2)], _vm._v(" "), _vm._t("help", [_vm.helpText ? _c('help-text', {
      domProps: {
        "innerHTML": _vm._s(_vm.helpText)
      }
    }) : _vm._e()])], 2);
  },
  staticRenderFns: [],
  name: 'radio-field',
  mixins: [Colorable, FormControl],
  model: {
    event: 'change',
    prop: 'checkedValue'
  },
  props: {
    /**
     * An array of event names that correlate with callback functions
     *
     * @property Function
     */
    bindEvents: {
      type: Array,
      default: function _default() {
        return ['focus', 'blur', 'input', 'click', 'keyup', 'keydown', 'progress'];
      }
    },

    /**
     * Is this a custom element
     *
     * @property String
     */
    custom: Boolean,

    /**
     * Display the form field and label inline
     *
     * @property Function
     */
    inline: Boolean,

    /**
     * The checked values
     *
     * @property String
     */
    checked: Boolean,

    /**
     * The checked value
     *
     * @property String
     */
    checkedValue: [Boolean, Number, String, Object],

    /**
     * The class name assigned to the control element
     *
     * @property String
     */
    defaultControlClass: {
      type: String,
      default: 'form-check'
    }
  },
  computed: {
    labelClass: function labelClass() {
      return prefix('label', this.controlClass);
    },
    inputClass: function inputClass() {
      return prefix('input', this.controlClass);
    },
    inlineClass: function inlineClass() {
      return prefix('inline', this.controlClass);
    },
    controlClass: function controlClass() {
      return this.custom ? 'custom-control' : this.defaultControlClass;
    },
    customControlClass: function customControlClass() {
      return this.custom ? prefix(this.$options.name.replace('-field', ''), 'custom') : '';
    },
    sizeableClass: function sizeableClass() {
      return prefix(this.size, 'form-control');
    }
  }
};
var CheckboxField = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      class: _vm.$mergeClasses(_vm.controlClass, _vm.customControlClass, _vm.sizeableClass, _vm.inline ? _vm.inlineClass : '')
    }, [_vm.custom && _vm.id ? [_c('input', {
      directives: [{
        name: "bind-events",
        rawName: "v-bind-events"
      }],
      class: _vm.$mergeClasses(_vm.inputClass, _vm.invalidFeedback ? 'is-invalid' : ''),
      attrs: {
        "type": "checkbox",
        "name": _vm.name,
        "id": _vm.id,
        "required": _vm.required,
        "disabled": _vm.disabled || _vm.readonly,
        "readonly": _vm.readonly,
        "pattern": _vm.pattern
      },
      domProps: {
        "value": _vm.value,
        "checked": _vm.checkedValues.indexOf(_vm.value) !== -1 || _vm.checked
      },
      on: {
        "change": function change($event) {
          _vm.updated($event.target.value, 'change');
        }
      }
    }), _vm._v(" "), _c('label', {
      class: _vm.$mergeClasses(_vm.labelClass, _vm.colorableClasses),
      attrs: {
        "for": _vm.id
      }
    }, [_vm._t("default", [_vm._v(_vm._s(_vm.label))]), _vm._v(" "), _vm._t("feedback", [_vm.validFeedback ? _c('form-feedback', {
      attrs: {
        "valid": ""
      },
      domProps: {
        "innerHTML": _vm._s(_vm.validFeedback)
      }
    }) : _vm._e(), _vm._v(" "), _vm.invalidFeedback ? _c('form-feedback', {
      attrs: {
        "invalid": ""
      },
      domProps: {
        "innerHTML": _vm._s(_vm.invalidFeedback)
      }
    }) : _vm._e()])], 2)] : [_c('label', {
      class: _vm.$mergeClasses(_vm.labelClass, _vm.colorableClasses),
      attrs: {
        "for": _vm.id
      }
    }, [_c('input', {
      directives: [{
        name: "bind-events",
        rawName: "v-bind-events"
      }],
      class: _vm.$mergeClasses(_vm.inputClass, _vm.invalidFeedback ? 'is-invalid' : ''),
      attrs: {
        "type": "checkbox",
        "name": _vm.name,
        "id": _vm.id,
        "required": _vm.required,
        "disabled": _vm.disabled || _vm.readonly,
        "readonly": _vm.readonly,
        "pattern": _vm.pattern
      },
      domProps: {
        "value": _vm.value,
        "checked": _vm.checkedValues.indexOf(_vm.value) !== -1 || _vm.checked
      },
      on: {
        "change": function change($event) {
          _vm.updated($event.target.value, 'change');
        }
      }
    }), _vm._v(" "), _vm._t("default", [_vm._v(_vm._s(_vm.label))]), _vm._v(" "), _vm._t("feedback", [_vm.validFeedback ? _c('form-feedback', {
      attrs: {
        "valid": ""
      },
      domProps: {
        "innerHTML": _vm._s(_vm.validFeedback)
      }
    }) : _vm._e(), _vm._v(" "), _vm.invalidFeedback ? _c('form-feedback', {
      attrs: {
        "invalid": ""
      },
      domProps: {
        "innerHTML": _vm._s(_vm.invalidFeedback)
      }
    }) : _vm._e()])], 2)], _vm._v(" "), _vm._t("help", [_vm.helpText ? _c('help-text', {
      domProps: {
        "innerHTML": _vm._s(_vm.helpText)
      }
    }) : _vm._e()])], 2);
  },
  staticRenderFns: [],
  name: 'checkbox-field',
  extends: RadioField,
  model: {
    event: 'change',
    prop: 'checkedValues'
  },
  props: {
    /**
     * The checked values
     *
     * @property String
     */
    checkedValues: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  methods: {
    updated: function updated(value) {
      var checked = this.checkedValues.slice(0);
      var index = this.checkedValues.indexOf(value);

      if (index === -1) {
        checked.push(value);
      } else {
        checked.splice(index, 1);
      }

      this.$emit('change', checked);
    }
  }
};
var plugin$17 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      CheckboxField: CheckboxField
    });
  }
});
var Container = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "container"
    }, [_vm._t("default")], 2);
  },
  staticRenderFns: [],
  name: 'container'
};
var plugin$18 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Container: Container
    });
  }
});
var Dropzone = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "dropzone",
      class: {
        'is-dragging': _vm.isDragging
      },
      on: {
        "drop": function drop($event) {
          $event.preventDefault();
          return _vm.onDrop($event);
        },
        "dragover": function dragover($event) {
          $event.preventDefault();
          return _vm.onDragover($event);
        },
        "dragenter": function dragenter($event) {
          $event.preventDefault();
          return _vm.onDragenter($event);
        },
        "dragleave": function dragleave($event) {
          $event.preventDefault();
          return _vm.onDragleave($event);
        }
      }
    }, [_vm._t("placeholder", [_c('div', {
      staticClass: "dropzone-placeholder text-center"
    }, [_c('card', [_c('card-body', [_c('div', {
      staticClass: "card-body d-flex align-items-between justify-content-center flex-column"
    }, [_c('h1', {
      staticClass: "mt-4"
    }, [_vm._v("Drag & Drop")]), _vm._v(" "), _c('p', [_vm._v("Drag and drop your files here to upload them!")]), _vm._v(" "), _c('div', {
      staticClass: "mt-3 mb-4"
    }, [_c('i', {
      staticClass: "fa fa-image"
    })])])])], 1)], 1)]), _vm._v(" "), _vm._t("default")], 2);
  },
  staticRenderFns: [],
  _scopeId: 'data-v-744e8f62',
  name: 'dropzone',
  methods: {
    onDrop: function onDrop(event) {
      this.isDragging = false;
      this.$emit('drop', event, this);
    },
    onDragover: function onDragover(event) {
      this.isDragging = true;
      this.$emit('dragover', event, this);
    },
    onDragenter: function onDragenter(event) {
      this.isDragging = true;
      this.$emit('dragenter', event, this);
      this.onDragover(event);
    },
    onDragleave: function onDragleave(event) {
      this.isDragging = false;
      this.$emit('dragleave', event, this);
    }
  },
  data: function data() {
    return {
      files: null,
      isDragging: false
    };
  }
};
var plugin$19 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Dropzone: Dropzone
    });
  }
});
var plugin$20 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      FileField: FileField
    });
  }
});

function readFile(file, progress) {
  return new Promise(function (resolve, reject) {
    var reader = new FileReader();

    reader.onload = function (e) {
      return resolve(e);
    };

    reader.onerror = function (e) {
      return reject(e);
    };

    reader.onabort = function (e) {
      return reject(e);
    };

    reader.onprogress = function (e) {
      return progress(e, reader);
    };

    reader.readAsDataURL(file);
  });
}

var ProgressBar = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "progress",
      style: {
        'height': _vm.formattedHeight
      }
    }, [_c('div', {
      staticClass: "progress-bar",
      class: _vm.$mergeClasses(_vm.progressClasses, _vm.variantClass),
      style: {
        'width': _vm.offsetValue + '%'
      },
      attrs: {
        "role": "progressbar",
        "aria-valuenow": _vm.offsetValue,
        "aria-valuemin": _vm.min,
        "aria-valuemax": _vm.max
      }
    }, [_vm.label ? _c('span', [_vm._v(_vm._s(_vm.offsetValue) + "%")]) : _vm._e()])]);
  },
  staticRenderFns: [],
  name: 'progress-bar',
  mixins: [Variant],
  props: {
    /**
     * The progress bar percentage value
     *
     * @property String
     */
    value: {
      type: Number,
      required: true
    },

    /**
     * The height of the progress bar
     *
     * @property String
     */
    height: [Number, String],

    /**
     * Show the progress bar value as a label inside the bar
     *
     * @property String
     */
    label: Boolean,

    /**
     * Should the progress bar appear with stripes
     *
     * @property String
     */
    striped: Boolean,

    /**
     * Should the progress bar appear with animated stripes
     *
     * @property String
     */
    animated: Boolean,

    /**
     * The minimum value
     *
     * @property String
     */
    min: {
      type: Number,
      default: 0
    },

    /**
     * The max value
     *
     * @property String
     */
    max: {
      type: Number,
      default: 100
    }
  },
  computed: {
    variantClassPrefix: function variantClassPrefix() {
      return 'bg';
    },
    offsetValue: function offsetValue() {
      return this.value / this.max * 100;
    },
    formattedHeight: function formattedHeight() {
      return this.height ? unit(this.height) : null;
    },
    progressClasses: function progressClasses() {
      return {
        'progress-bar-striped': this.striped,
        'progress-bar-animated': this.animated
      };
    }
  }
};
var FilePreview = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "file-preview",
      class: {
        'is-image': _vm.isImage
      }
    }, [_c('div', {
      staticClass: "file-preview-inner"
    }, [!_vm.hideClose && (!_vm.isImage || _vm.image) ? _c('a', {
      staticClass: "file-preview-close",
      attrs: {
        "href": "#"
      },
      on: {
        "click": function click($event) {
          $event.preventDefault();

          _vm.$emit('close', _vm.file);
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-times-circle"
    })]) : _vm._e(), _vm._v(" "), _vm.isImage ? _c('div', {
      staticClass: "file-preview-image"
    }, [_vm.image ? _c('img', {
      staticClass: "file-preview-thumbnail",
      attrs: {
        "src": _vm.image
      }
    }) : _c('progress-bar', {
      directives: [{
        name: "ready",
        rawName: "v-ready",
        value: _vm.readFile,
        expression: "readFile"
      }],
      attrs: {
        "value": _vm.loaded,
        "height": 10
      }
    })], 1) : _c('div', {
      staticClass: "file-preview-icon"
    }, [_c('i', {
      staticClass: "fa fa-file-o"
    })]), _vm._v(" "), _c('div', {
      staticClass: "file-preview-filename",
      domProps: {
        "innerHTML": _vm._s(_vm.name)
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "file-preview-filesize"
    }, [_vm._v("(" + _vm._s(_vm.size) + ")")]), _vm._v(" "), _c('div')])]);
  },
  staticRenderFns: [],
  name: 'file-preview',
  components: {
    ProgressBar: ProgressBar
  },
  directives: {
    ready: {
      inserted: function inserted(el, binding) {
        setTimeout(function () {
          if (isFunction_1(binding.value)) {
            binding.value();
          }
        }, 50);
      }
    }
  },
  props: {
    /**
     * Hide the close button for the preview
     *
     * @property Object
     */
    hideClose: Boolean,

    /**
     * The uploaded File object
     *
     * @property Object
     */
    file: {
      type: [Object, File],
      required: true
    },

    /**
     * An array of mime types that should be used to determine if the
     * file is an image.
     *
     * @property Array
     */
    imageMimes: {
      type: Array,
      default: function _default() {
        return ['image/gif', 'image/png', 'image/jpeg', 'image/bmp', 'image/webp'];
      }
    }
  },
  computed: {
    /**
     * Get the file name
     *
     * @property String
     */
    name: function name() {
      return this.file instanceof File ? this.file.name : this.file.orig_filename;
    },

    /**
     * Get the file extension
     *
     * @property String
     */
    extension: function extension() {
      return this.file instanceof File ? this.file.name.split('.').pop().toLowerCase() : this.file.extension;
    },

    /**
     * Get the file formatted size
     *
     * @property String
     */
    size: function size() {
      return this.bytesToSize(this.file instanceof File ? this.file.size : this.file.bytes);
    },

    /**
     * Get the file type
     *
     * @property String
     */
    type: function type() {
      return this.file instanceof File ? this.file.type : this.file.mime;
    },

    /**
     * If the file an image?
     *
     * @property String
     */
    isImage: function isImage() {
      return this.imageMimes.indexOf(this.type) !== -1;
    },

    /**
     * Get the last time the file was modified (as timestamp)
     *
     * @property String
     */
    lastModified: function lastModified() {
      return this.file instanceof File ? this.file.lastModified : null;
    },

    /**
     * Get the last time the file was modified (as Date)
     *
     * @property String
     */
    lastModifiedDate: function lastModifiedDate() {
      return this.file instanceof File ? this.file.lastModifiedDate : null;
    }
  },
  methods: {
    readFile: function readFile$$1() {
      var _this = this;

      if (this.file instanceof File) {
        var start = moment();
        readFile(this.file, function (e) {
          if (e.lengthComputable) {
            _this.loaded = parseInt(e.loaded / e.total * 100, 10);
          }
        }).then(function (event) {
          setTimeout(function () {
            _this.image = event.target.result;

            _this.$emit('loaded', event, _this);
          }, 600 - moment().diff(start));
        }, function (error) {
          _this.$emit('error', error);
        });
      }
    },
    bytesToSize: function bytesToSize(bytes) {
      var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      if (bytes == 0) return '0 Byte';
      var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }
  },
  data: function data() {
    return {
      loaded: 0,
      image: this.file.url
    };
  }
};
var plugin$21 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      FilePreview: FilePreview
    });
  }
});
var FormControl$1 = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', [_c(!_vm.select ? 'input' : 'select', {
      directives: [{
        name: "bind-events",
        rawName: "v-bind-events",
        value: _vm.bindEvents,
        expression: "bindEvents"
      }],
      tag: "component",
      class: _vm.$mergeClasses(_vm.controlClasses, _vm.colorableClasses),
      attrs: {
        "id": _vm.id,
        "type": !_vm.select ? _vm.type : false,
        "value": _vm.value,
        "pattern": _vm.pattern,
        "required": _vm.required,
        "readonly": _vm.readonly,
        "placeholder": _vm.placeholder,
        "disabled": _vm.disabled || _vm.readonly,
        "aria-label": _vm.label,
        "aria-describedby": _vm.id
      },
      on: {
        "input": _vm.updated
      }
    })], 1);
  },
  staticRenderFns: [],
  name: 'form-control',
  mixins: [Colorable, FormControl],
  props: {
    /**
     * Is the element a select?
     *
     * @property String
     */
    select: Boolean,

    /**
     * The type attribute
     *
     * @property String
     */
    type: {
      type: String,
      default: 'text'
    }
  }
};
var plugin$22 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      FormControl: FormControl$1
    });
  }
});
var plugin$23 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      InputField: InputField
    });
  }
});
var InputGroup = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "input-group",
      class: _vm.$mergeClasses(_vm.colorableClasses, _vm.sizeableClass)
    }, [_vm._t("prepend", [_vm.prepend instanceof Array ? [_c('input-group-prepend', _vm._l(_vm.prepend, function (value) {
      return _c('input-group-text', {
        attrs: {
          "text": value
        }
      });
    }))] : _vm.prepend ? [_c('input-group-prepend', {
      attrs: {
        "text": ""
      }
    }, [_vm._v(_vm._s(_vm.prepend))])] : _vm._e()]), _vm._v(" "), _vm._t("default"), _vm._v(" "), _vm._t("append", [_vm.append instanceof Array ? [_c('input-group-append', _vm._l(_vm.append, function (value) {
      return _c('input-group-text', {
        attrs: {
          "text": value
        }
      });
    }))] : _vm.append ? [_c('input-group-append', {
      attrs: {
        "text": ""
      }
    }, [_vm._v(_vm._s(_vm.append))])] : _vm._e()])], 2);
  },
  staticRenderFns: [],
  name: 'input-group',
  mixins: [HasSlots, Sizeable, Colorable],
  props: {
    append: [Array, Number, String],
    prepend: [Array, Number, String]
  }
};
var InputGroupAppend = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "input-group-append"
    }, [_vm.text ? _c('input-group-text', [_vm._t("default")], 2) : _vm._t("default")], 2);
  },
  staticRenderFns: [],
  name: 'input-group-append',
  props: {
    /**
     * The type attribute
     *
     * @property String
     */
    text: Boolean
  }
};
var InputGroupPrepend = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "input-group-prepend"
    }, [_vm.text ? _c('input-group-text', [_vm._t("default")], 2) : _vm._t("default")], 2);
  },
  staticRenderFns: [],
  name: 'input-group-prepend',
  props: {
    /**
     * The type attribute
     *
     * @property String
     */
    text: Boolean
  }
};
var InputGroupText = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('span', {
      staticClass: "input-group-text",
      attrs: {
        "id": _vm.id
      }
    }, [_vm._t("default", [_vm._v(_vm._s(_vm.text))])], 2);
  },
  staticRenderFns: [],
  name: 'input-group-text',
  props: {
    /**
     * The id attribute
     *
     * @property String
     */
    id: String,

    /**
     * The type attribute
     *
     * @property String
     */
    text: [Array, Number, String]
  }
};
var plugin$24 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      InputGroup: InputGroup,
      InputGroupAppend: InputGroupAppend,
      InputGroupPrepend: InputGroupPrepend,
      InputGroupText: InputGroupText
    });
  }
});
var LightSwitchField = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('form-group', [_vm._t("label", [_vm.label ? _c('form-label', {
      attrs: {
        "for": _vm.id
      },
      domProps: {
        "innerHTML": _vm._s(_vm.label)
      }
    }) : _vm._e()]), _vm._v(" "), _c('div', {
      class: _vm.controlClasses,
      attrs: {
        "tabindex": "0"
      },
      on: {
        "click": function click($event) {
          _vm.toggle();
        },
        "keyup": [function ($event) {
          if (!('button' in $event) && $event.keyCode !== 32) {
            return null;
          }

          _vm.toggle();
        }, function ($event) {
          if (!('button' in $event) && $event.keyCode !== 37) {
            return null;
          }

          _vm.toggle(_vm.offValue);
        }, function ($event) {
          if (!('button' in $event) && $event.keyCode !== 39) {
            return null;
          }

          _vm.toggle(_vm.onValue);
        }]
      }
    }, [_c('div', {
      staticClass: "light-switch-handle"
    }), _vm._v(" "), _c('div', {
      staticClass: "light-switch-container"
    }, [_c('div', {
      staticClass: "light-switch-label on-value"
    }), _vm._v(" "), _c('div', {
      staticClass: "light-switch-label off-value"
    })])]), _vm._v(" "), _c('form-control', {
      staticClass: "d-none",
      attrs: {
        "name": _vm.name,
        "value": _vm.value,
        "id": _vm.id
      }
    }), _vm._v(" "), _vm._t("feedback", [_vm.validFeedback ? _c('form-feedback', {
      attrs: {
        "valid": ""
      },
      domProps: {
        "innerHTML": _vm._s(_vm.validFeedback)
      }
    }) : _vm._e(), _vm._v(" "), _vm.invalidFeedback ? _c('form-feedback', {
      attrs: {
        "invalid": ""
      },
      domProps: {
        "innerHTML": _vm._s(_vm.invalidFeedback)
      }
    }) : _vm._e()]), _vm._v(" "), _vm._t("help", [_vm.helpText ? _c('help-text', {
      domProps: {
        "innerHTML": _vm._s(_vm.helpText)
      }
    }) : _vm._e()])], 2);
  },
  staticRenderFns: [],
  name: 'light-switch-field',
  mixins: [FormControl],
  props: {
    /**
     * The class name assigned to the control element
     *
     * @property String
     */
    defaultControlClass: {
      type: String,
      default: 'form-control light-switch'
    },

    /**
     * The class name assigned to the control element
     *
     * @property String
     */
    activeClass: {
      type: String,
      default: 'on'
    },

    /**
     * The class name assigned to the control element
     *
     * @property String
     */
    onValue: {
      default: 1
    },

    /**
     * The class name assigned to the control element
     *
     * @property String
     */
    offValue: {
      default: 0
    }
  },
  computed: {
    isActive: function isActive() {
      return this.value === this.onValue;
    },
    controlClasses: function controlClasses() {
      return [this.controlClass, this.controlSizeClass, this.spacing || '', this.invalidFeedback ? 'is-invalid' : '', this.dragging ? 'is-dragging' : '', this.isActive ? 'is-active' : ''].join(' ');
    }
  },
  methods: {
    getTransitionInMilliseconds: function getTransitionInMilliseconds() {
      var duration = getComputedStyle(this.$el.querySelector('.light-switch-handle')).transitionDuration;
      var numeric = parseFloat(duration, 10);
      var unit = duration.match(/m?s/);

      switch (unit[0]) {
        case 's':
          return numeric * 1000;

        case 'ms':
          return numeric;
      }

      throw new Error("\"".concat(unit[0], "\" is not a valid unit of measure. Unit must be \"s\" (seconds) or \"ms\" (milliseconds)."));
    },
    toggle: function toggle(value) {
      this.$emit('input', !isUndefined_1(value) ? value : this.isActive ? this.offValue : this.onValue);
    }
  },
  watch: {
    value: function value() {
      var _this = this;

      this.dragging = true;
      setTimeout(function () {
        _this.dragging = false;
      }, this.getTransitionInMilliseconds());
    }
  },
  data: function data() {
    return {
      dragging: false
    };
  }
};
var plugin$25 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      LightSwitchField: LightSwitchField
    });
  }
});
var ListGroupItem = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _vm.href ? _c('a', {
      staticClass: "list-group-item",
      class: _vm.classes,
      attrs: {
        "href": _vm.href
      },
      on: {
        "click": _vm.onClick
      }
    }, [_vm._t("default", [_vm._v(_vm._s(_vm.label))]), _vm._v(" "), _vm.badge ? _c('badge', _vm._b({}, 'badge', _vm.badgeOptions, false)) : _vm._e()], 2) : _vm.action ? _c('button', {
      staticClass: "list-group-item",
      class: _vm.classes,
      attrs: {
        "type": "button"
      },
      on: {
        "click": function click($event) {
          $event.preventDefault();
          return _vm.onClick($event);
        }
      }
    }, [_vm._t("default", [_vm._v(_vm._s(_vm.label))]), _vm._v(" "), _vm.badge ? _c('badge', _vm._b({}, 'badge', _vm.badgeOptions, false)) : _vm._e()], 2) : _c('div', {
      staticClass: "list-group-item",
      class: _vm.classes,
      on: {
        "click": _vm.onClick
      }
    }, [_vm._t("default", [_vm._v(_vm._s(_vm.label))]), _vm._v(" "), _vm.badge ? _c('badge', _vm._b({}, 'badge', _vm.badgeOptions, false)) : _vm._e()], 2);
  },
  staticRenderFns: [],
  components: {
    Badge: Badge
  },
  props: {
    /**
     * The badge label (if number or string) or object of options to pass to
     * the component.
     *
     * @property String|Object
     */
    badge: [Number, String, Object],

    /**
     * The list group item href attribute.
     *
     * @property String
     */
    href: String,

    /**
     * The list group item variant.
     *
     * @property String
     */
    variant: String,

    /**
     * Optionally pass the item as a object to use programmatically later.
     *
     * @property String
     */
    item: Object,

    /**
     * The list group item an action, or clickable item.
     *
     * @property Boolean
     */
    action: {
      type: Boolean,
      default: false
    },

    /**
     * The list group item active.
     *
     * @property Boolean
     */
    active: {
      type: Boolean,
      default: false
    },

    /**
     * The list group item disabled.
     *
     * @property Boolean
     */
    disabled: {
      type: Boolean,
      default: false
    },

    /**
     * The list item label.
     *
     * @property Object
     */
    label: {
      type: [Number, String],
      value: null
    }
  },
  computed: {
    classes: function classes() {
      var classes = prefix({
        'action': this.action
      }, 'list-group-item');
      classes['active'] = this.isActive;
      classes['disabled'] = this.isDisabled;

      if (this.variant) {
        classes[prefix(this.variant, 'list-group-item')] = true;
      }

      return classes;
    },
    badgeOptions: function badgeOptions() {
      return isObject_1(this.badge) ? this.badge : {
        label: this.badge
      };
    }
  },
  methods: {
    /**
     * Toggle the list item's active class.
     *
     * @return void
     */
    toggle: function toggle() {
      this.isActive = !this.isActive;
    },

    /**
     * Activate the list item.
     *
     * @return void
     */
    activate: function activate() {
      this.isActive = true;
    },

    /**
     * Deactivate the list item.
     *
     * @return void
     */
    deactivate: function deactivate() {
      this.isActive = false;
    },

    /**
     * Activate the list item.
     *
     * @return void
     */
    disable: function disable() {
      this.isDisabled = false;
    },

    /**
     * Deactivate the list item.
     *
     * @return void
     */
    enable: function enable() {
      this.isDisabled = false;
    },

    /**
     * The callback function for the `click` event.
     *
     * @return void
     */
    onClick: function onClick(event) {
      this.$emit('click', event, this);
    }
  },
  watch: {
    isActive: function isActive(value, prevValue) {
      this.$emit('update:active', this.isActive);
      this.$emit('toggle', this.isActive, this);
      this.$emit(value ? 'activate' : 'deactivate', this);
    }
  },
  data: function data() {
    return {
      isActive: this.active,
      isDisabled: this.disabled
    };
  }
};
var ListGroup = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "list-group",
      class: _vm.classes
    }, [_vm._t("default", _vm._l(_vm.items, function (item, key) {
      return _c('list-group-item', _vm._b({
        key: key
      }, 'list-group-item', item, false));
    }))], 2);
  },
  staticRenderFns: [],
  components: {
    ListGroupItem: ListGroupItem
  },
  props: {
    /**
     * An array of list item objects.
     *
     * [{label: 'Some Label', badge: 1}]
     *
     * @property Object
     */
    items: Array,

    /**
     * Can the list items be activated.
     *
     * @property Boolean
     */
    activateable: {
      type: Boolean,
      default: false
    },

    /**
     * The list group appear flush (without some borders).
     *
     * @property Boolean
     */
    flush: {
      type: Boolean,
      default: false
    },

    /**
     * Can activate multiple list items
     *
     * @property Boolean
     */
    multiple: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes: function classes() {
      return prefix({
        'flush': this.flush
      }, 'list-group');
    }
  },
  methods: {
    bindEventsToChildren: function bindEventsToChildren() {
      var _this = this;

      each(this.$children, function (child) {
        child.$off('click', _this.onClickItem);
        child.$on('click', _this.onClickItem);
        child.$off('activate', _this.onActivate);
        child.$on('activate', _this.onActivate);
        child.$off('deactivate', _this.onDeactivate);
        child.$on('deactivate', _this.onDeactivate);
      });
    },
    onClickItem: function onClickItem(event, child) {
      if (this.activateable) {
        child.toggle();
      }

      this.$emit('item:click', event, child);
    },
    onActivate: function onActivate(item) {
      if (!this.multiple && this.activeItem !== item) {
        if (this.activeItem) {
          this.activeItem.deactivate();
        }

        this.activeItem = item;
      }

      this.$emit('item:activate', event, item);
    },
    onDeactivate: function onDeactivate(item) {
      if (!this.multiple && this.activeItem === item) {
        this.activeItem = null;
      }

      this.$emit('item:deactivate', event, item);
    }
  },
  data: function data() {
    return {
      activeItem: null
    };
  },
  mounted: function mounted() {
    this.bindEventsToChildren();
  },
  updated: function updated() {
    this.bindEventsToChildren();
  }
};
var plugin$26 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      ListGroup: ListGroup
    });
  }
});
var ModalBackdrop = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "modal-backdrop",
      class: {
        'fade': _vm.fade,
        'show': _vm.show
      }
    }, [_vm._t("default")], 2);
  },
  staticRenderFns: [],
  name: 'modal-backdrop',
  props: {
    /**
     * Show the modal with a fade effect.
     *
     * @property Boolean
     */
    fade: {
      type: Boolean,
      default: true
    },

    /**
     * Is the modal showing.
     *
     * @property Boolean
     */
    show: {
      type: Boolean,
      default: true
    }
  }
};
var plugin$27 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Modal: Modal
    });
  }
});
var ModalTitle = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('h5', {
      staticClass: "modal-title"
    }, [_vm._t("default")], 2);
  },
  staticRenderFns: [],
  name: 'modal-title'
};
var Navigation = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('nav', {
      staticClass: "nav",
      class: _vm.classes,
      attrs: {
        "role": _vm.role
      }
    }, [_vm._l(_vm.items, function (item, i) {
      return _vm.items ? _c('navigation-item', _vm._b({
        key: i
      }, 'navigation-item', item, false)) : _vm._e();
    }), _vm._v(" "), _vm._t("default")], 2);
  },
  staticRenderFns: [],
  name: 'navigation',
  mixins: [Colorable],
  props: {
    /**
     * Helper to add the justify-content-X class.
     *
     * @prop {Array}
     */
    align: String,

    /**
     * An array of buttons
     *
     * @prop {Array}
     */
    buttons: Array,

    /**
     * The navigation inside a card
     *
     * @prop {Boolean}
     */
    card: Boolean,

    /**
     * Justify nav items to fill the width equally (using flex).
     *
     * @prop {Array}
     */
    fill: Boolean,

    /**
     * Add `nav-justified` class to the component.
     *
     * @prop {Array}
     */
    justified: Boolean,

    /**
     * Display items as pill shapes
     *
     * @prop {Array}
     */
    pills: Boolean,

    /**
     * Display items as tab shapes
     *
     * @prop {Array}
     */
    tabs: Boolean,

    /**
     * Display the buttons vertically
     *
     * @prop {Boolean}
     */
    vertical: Boolean,

    /**
     * The role attribute
     *
     * @prop {String}
     */
    role: String
  },
  computed: {
    classes: function classes() {
      var _this = this;

      this.$nextTick(function () {
        if (!_this.isCard) {
          _this.isCard = _this.$parent.$el.classList.contains('card-header');
        }
      });
      return this.$mergeClasses(prefix(this.align, 'justify-content'), this.colorableClasses, {
        'card-header-tabs': this.isCard && this.tabs,
        'card-header-pills': this.isCard && this.pills,
        'nav-justified': this.justified,
        'nav-fill': this.fill,
        'nav-pills': this.pills,
        'nav-tabs': this.tabs,
        'flex-column': this.vertical
      });
    }
  },
  data: function data() {
    return {
      isCard: this.card
    };
  }
};
var NavigationLink = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('a', {
      class: _vm.classes,
      attrs: {
        "href": _vm.href
      }
    }, [_vm._t("default")], 2);
  },
  staticRenderFns: [],
  name: 'navigation-link',
  props: {
    /**
     * Is the navigation item active
     *
     * @prop {Boolean}
     */
    active: Boolean,

    /**
     * Is the navigation item disabled
     *
     * @prop {Boolean}
     */
    disabled: Boolean,

    /**
     * The href attribute
     *
     * @prop {String}
     */
    href: String,

    /**
     * Add the nav-item class to the link
     *
     * @prop {Boolean}
     */
    item: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes: function classes() {
      var _this = this;

      this.$nextTick(function () {
        if (!_this.isItem) {
          _this.isItem = !_this.$parent.$el.classList.contains('nav-item');
        }
      });
      return {
        'nav-link': this.href,
        'nav-item': this.isItem,
        'active': this.active,
        'disabled': this.disabled
      };
    }
  },
  data: function data() {
    return {
      isItem: this.item
    };
  }
};
var NavigationItem = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c(_vm.component, {
      tag: "component",
      class: _vm.classes
    }, [_vm._t("default")], 2);
  },
  staticRenderFns: [],
  name: 'navigation-item',
  extends: NavigationLink,
  props: {
    /**
     * The HTML element
     *
     * @prop {String}
     */
    element: String,

    /**
     * Is the component a list element
     *
     * @prop {Boolean}
     */
    list: Boolean,

    /**
     * Add the nav-item class to the link
     *
     * @prop {Boolean}
     */
    item: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    component: function component() {
      if (this.element) {
        return this.element;
      } else if (this.href) {
        return 'a';
      } else if (this.list) {
        return 'li';
      }

      return 'div';
    }
  }
};
var NavigationDropdown = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('navigation-item', {
      staticClass: "dropdown"
    }, [_vm._t("toggle-button", [_c('navigation-link', {
      staticClass: "dropdown-toggle",
      attrs: {
        "href": "#",
        "data-toggle": "dropdown",
        "role": "button",
        "aria-haspopup": "true",
        "aria-expanded": _vm.isDropdownShowing
      },
      on: {
        "blur": _vm.onBlur
      },
      nativeOn: {
        "click": function click($event) {
          $event.preventDefault();

          _vm.toggle();
        }
      }
    }, [_vm._v(" " + _vm._s(_vm.label) + " ")])]), _vm._v(" "), _vm._t("dropdown-menu", [_c('dropdown-menu', {
      attrs: {
        "id": _vm.id,
        "items": _vm.items,
        "align": _vm.align,
        "show": _vm.isDropdownShowing
      },
      on: {
        "update:show": function updateShow($event) {
          _vm.isDropdownShowing = $event;
        },
        "item:click": _vm.onItemClick
      }
    }, [_vm._t("default")], 2)])], 2);
  },
  staticRenderFns: [],
  name: 'navigation-dropdown',
  extends: BtnDropdown
};
var plugin$28 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Navigation: Navigation,
      NavigationItem: NavigationItem,
      NavigationLink: NavigationLink,
      NavigationDropdown: NavigationDropdown
    });
  }
});
var plugin$29 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Overlay: Overlay
    });
  }
});
var Pagination = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('nav', {
      attrs: {
        "aria-label": "Page navigation example"
      }
    }, [_c('ul', {
      staticClass: "pagination",
      class: _vm.classes
    }, [_c('li', {
      staticClass: "page-item",
      class: {
        'disabled': _vm.currentPage === 1
      }
    }, [_c('a', {
      staticClass: "page-link",
      attrs: {
        "href": "#",
        "aria-label": "Previous"
      },
      on: {
        "click": function click($event) {
          $event.preventDefault();

          _vm.prev($event);
        }
      }
    }, [_c('span', {
      attrs: {
        "aria-hidden": "true"
      }
    }, [_vm._v("«")])])]), _vm._v(" "), _vm._l(_vm.pages, function (item) {
      return _c('li', {
        staticClass: "page-item",
        class: {
          'active': item.page === _vm.currentPage,
          'disabled': !!item.divider
        },
        attrs: {
          "data-page": item.page
        }
      }, [_vm._t("default", [item.divider ? _c('a', {
        staticClass: "page-link"
      }, [_vm._v("…")]) : _c('a', {
        staticClass: "page-link",
        class: item.class,
        attrs: {
          "href": "#",
          "data-label": item.label
        },
        on: {
          "click": function click($event) {
            $event.preventDefault();

            _vm.paginate(item.page, $event);
          }
        }
      }, [item.label ? _c('span', {
        attrs: {
          "aria-hidden": "true"
        },
        domProps: {
          "innerHTML": _vm._s(item.label)
        }
      }) : _vm._e(), _vm._v(" "), item.page ? _c('span', {
        attrs: {
          "aria-hidden": "true"
        },
        domProps: {
          "innerHTML": _vm._s(item.page)
        }
      }) : _vm._e()])], {
        item: item
      })], 2);
    }), _vm._v(" "), _c('li', {
      staticClass: "page-item",
      class: {
        'disabled': _vm.currentPage >= _vm.totalPages
      }
    }, [_c('a', {
      staticClass: "page-link",
      attrs: {
        "href": "#",
        "aria-label": "Next"
      },
      on: {
        "click": function click($event) {
          $event.preventDefault();

          _vm.next($event);
        }
      }
    }, [_c('span', {
      attrs: {
        "aria-hidden": "true"
      }
    }, [_vm._v("»")])])])], 2)]);
  },
  staticRenderFns: [],
  name: 'pagination',
  props: {
    /**
     * The alignment of the pagination component.
     *
     * @prop String
     */
    align: {
      type: String,
      validate: function validate(value) {
        return ['start', 'end', 'center'].indexOf(value) !== -1;
      }
    },

    /**
     * The page on which the paginator should start.
     *
     * @prop String
     */
    page: {
      type: Number,
      default: 1
    },

    /**
     * The total number of pages in the paginator.
     *
     * @prop String
     */
    totalPages: {
      type: Number,
      default: 1
    },

    /**
     * The number of pages to show when the total number of pages is
     * greater than the number of pages that should be shown.
     *
     * @prop String
     */
    showPages: {
      type: Number,
      default: 6
    },
    onPaginate: Function
  },
  methods: {
    next: function next(event) {
      this.paginate(this.currentPage >= this.totalPages ? this.currentPage : this.currentPage + 1, event);
    },
    prev: function prev(event) {
      this.paginate(this.currentPage <= 1 ? this.currentPage : this.currentPage - 1, event);
    },
    paginate: function paginate(page, event) {
      if (event.currentTarget.parentNode.classList.contains('disabled')) {
        return;
      }

      this.setActivePage(page);

      if (this.onPaginate) {
        this.onPaginate(page, event);
      }

      this.$emit('paginate', page, event);
    },
    setActivePage: function setActivePage(page) {
      if (this.currentPage !== page) {
        this.currentPage = page;
      }
    },
    generate: function generate() {
      var pages = [];
      var showPages = this.showPages % 2 ? this.showPages + 1 : this.showPages;
      var startPage = this.currentPage >= showPages ? this.currentPage - showPages / 2 : 1;
      var startOffset = showPages + startPage;
      var endPage = this.totalPages < startOffset ? this.totalPages : startOffset;
      var diff = startPage - endPage + showPages;
      startPage -= startPage - diff > 0 ? diff : 0;

      if (startPage > 1) {
        pages.push({
          page: 1
        });
      }

      if (startPage > 2) {
        pages.push({
          divider: true
        });
      }

      for (var i = startPage; i < endPage; i++) {
        pages.push({
          page: i
        });
      }

      if (endPage <= this.totalPages) {
        if (this.totalPages - 1 > endPage) {
          pages.push({
            divider: true
          });
        }

        pages.push({
          page: this.totalPages
        });
      }

      return pages;
    }
  },
  computed: {
    pages: function pages() {
      return this.generate();
    },
    classes: function classes() {
      var classes = {};
      classes['justify-content-' + this.align] = true;
      return classes;
    }
  },
  data: function data() {
    return {
      currentPage: this.page
    };
  }
};
var plugin$30 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      Pagination: Pagination
    });
  }
});
var plugin$31 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      ProgressBar: ProgressBar
    });
  }
});
var plugin$32 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      RadioField: RadioField
    });
  }
}); //import BaseField from './BaseField';

var CUSTOM_SELECT_PREFIX = 'custom-select-';
var SelectField = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('form-group', [_vm._t("label", [_vm.label ? _c('form-label', {
      attrs: {
        "for": _vm.id
      },
      domProps: {
        "innerHTML": _vm._s(_vm.label)
      }
    }) : _vm._e()]), _vm._v(" "), _vm._t("control", [_c('select', {
      class: _vm.$mergeClasses(_vm.controlClasses, _vm.colorableClasses),
      attrs: {
        "id": _vm.id,
        "required": _vm.required,
        "disabled": _vm.disabled || _vm.readonly,
        "readonly": _vm.readonly,
        "pattern": _vm.pattern
      },
      domProps: {
        "value": _vm.value
      },
      on: {
        "input": function input($event) {
          _vm.updated($event.target.value);
        }
      }
    }, [_vm._t("default")], 2)]), _vm._v(" "), _vm._t("help", [_vm.helpText ? _c('help-text', {
      domProps: {
        "innerHTML": _vm._s(_vm.helpText)
      }
    }) : _vm._e()]), _vm._v(" "), _vm._t("feedback", [_vm.validFeedback ? _c('form-feedback', {
      attrs: {
        "valid": ""
      },
      domProps: {
        "innerHTML": _vm._s(_vm.validFeedback)
      }
    }) : _vm._e(), _vm._v(" "), _vm.invalidFeedback ? _c('form-feedback', {
      attrs: {
        "invalid": ""
      },
      domProps: {
        "innerHTML": _vm._s(_vm.invalidFeedback)
      }
    }) : _vm._e()])], 2);
  },
  staticRenderFns: [],
  name: 'select-field',
  extends: FormControl,
  mixins: [FormControl, Colorable],
  props: {
    /**
     * Add `custom-select` to the form control if true.
     *
     * @property String
     */
    custom: Boolean
  },
  computed: {
    controlClass: function controlClass() {
      var controlClass = this.custom ? 'custom-select' : this.defaultControlClass;
      return this.plaintext ? "".concat(controlClass, "-plaintext") : controlClass;
    },
    customSelectClasses: function customSelectClasses() {
      return [CUSTOM_SELECT_PREFIX.replace(/\-$/, '') + (this.plaintext ? '-plaintext' : ''), this.customSelectSizeClass, this.spacing || ''].join(' ');
    }
  }
};
var plugin$33 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      SelectField: SelectField
    });
  }
});

var Transformer =
/*#__PURE__*/
function () {
  /**
   * Initialize the transformer instance using an HTTP response object.
   *
   * @param data object
   * @return void
   */
  function Transformer(response) {
    _classCallCheck$1(this, Transformer);

    if (!isObject_1(this.$originalResponse = response)) {
      throw new Error('The transformer must be instantiated with a response object.');
    }

    if (!isArray_1(this.$required = this.required()) || !this.$required.length) {
      throw new Error('A transformer must have at least one required property.');
    }

    this.$transformedResponse = this.transform(response);
    this.validate();
    this.initialize();
  }
  /**
   * A method to override to perform logic to finished initializing.
   *
   * @return void
   */


  _createClass$1(Transformer, [{
    key: "initialize",
    value: function initialize() {} //

    /**
     * Define an array of required properties with at least one value.
     *
     * @return void
     */

  }, {
    key: "required",
    value: function required() {} //

    /**
     * Tranform the response object
     *
     * @property String
     */

  }, {
    key: "transform",
    value: function transform(response) {
      return response;
    }
    /**
     * Get the tranformed response
     *
     * @property String
     */

  }, {
    key: "response",
    value: function response() {
      return this.$transformedResponse;
    }
    /**
     * Validate the tranformed response.
     *
     * @return void
     */

  }, {
    key: "validate",
    value: function validate() {
      var _this = this;

      if (!isObject_1(this.$transformedResponse)) {
        throw new Error('The transformed response must be an object.');
      }

      each(this.$required, function (key) {
        if (!(key in _this.$transformedResponse)) {
          throw new Error("\"".concat(key, "\" is a required property and does not exist in the tranformed response."));
        }
      });
    }
  }]);

  return Transformer;
}();

var TableViewTransformer =
/*#__PURE__*/
function (_Transformer) {
  _inherits$1(TableViewTransformer, _Transformer);

  function TableViewTransformer() {
    _classCallCheck$1(this, TableViewTransformer);

    return _possibleConstructorReturn$1(this, (TableViewTransformer.__proto__ || Object.getPrototypeOf(TableViewTransformer)).apply(this, arguments));
  }

  _createClass$1(TableViewTransformer, [{
    key: "required",
    value: function required() {
      return [// The end of the count of the paginated list.
      'to', // The start of the count of the paginated list.
      'from', // The total number of items (not just included in the pagination)
      'total', // The number of items per page
      'per_page', // The last page number (or total pages)
      'last_page', // The current page number
      'current_page', // The actual response data to appear in the table
      'data'];
    }
  }, {
    key: "data",
    value: function data() {
      return this.$transformedResponse.data;
    }
  }, {
    key: "initialize",
    value: function initialize() {
      if (!isArray_1(this.data())) {
        throw new Error('The data property must be an array.');
      }
    }
  }]);

  return TableViewTransformer;
}(Transformer);

var TableView = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "table-view"
    }, [_c('div', {
      staticClass: "d-flex justify-content-between align-items-center"
    }, [_vm._t("header", [_c('div', {
      staticClass: "table-view-header"
    }, [_vm._t("heading", [_vm.heading ? _c('h3', {
      domProps: {
        "innerHTML": _vm._s(_vm.heading)
      }
    }) : _vm._e()]), _vm._v(" "), _vm._t("description", [_vm.description ? _c('p', {
      domProps: {
        "innerHTML": _vm._s(_vm.description)
      }
    }) : _vm._e()])], 2)]), _vm._v(" "), _vm._t("buttons", [_vm.buttons.length ? _c('div', {
      staticClass: "buttons-wrapper my-3"
    }, [_c('span', _vm._l(_vm.buttons, function (button, key) {
      return _c('a', {
        class: button.className || 'btn btn-primary',
        attrs: {
          "href": button.href || '#'
        },
        on: {
          "click": function click($event) {
            _vm.proxy(button.onClick, $event);
          }
        }
      }, [button.icon ? _c('i', {
        class: button.icon
      }) : _vm._e(), _vm._v(" "), _c('span', {
        domProps: {
          "innerHTML": _vm._s(button.label)
        }
      })]);
    }))]) : _vm._e()])], 2), _vm._v(" "), _c('table', {
      staticClass: "table",
      class: {
        'table-hover': _vm.hover && !_vm.loading && _vm.data.length
      }
    }, [_vm._t("thead", [_c('thead', [_c('tr', _vm._l(_vm.tableColumns, function (column) {
      return _c('th', {
        attrs: {
          "scope": "col",
          "width": column.width
        }
      }, [column.id ? _c('div', [_c('a', {
        staticClass: "sort",
        attrs: {
          "href": "#",
          "data-id": column.id
        },
        domProps: {
          "innerHTML": _vm._s(column.name || column.id)
        },
        on: {
          "click": function click($event) {
            $event.preventDefault();

            _vm.orderBy(column.id);
          }
        }
      }), _vm._v(" "), _vm.request.params.order === column.id && _vm.request.params.sort === 'asc' ? _c('i', {
        staticClass: "sort-icon fa fa-sort-asc"
      }) : _vm._e(), _vm._v(" "), _vm.request.params.order === column.id && _vm.request.params.sort === 'desc' ? _c('i', {
        staticClass: "sort-icon fa fa-sort-desc"
      }) : _vm._e()]) : _c('div', {
        domProps: {
          "innerHTML": _vm._s(column.name)
        }
      })]);
    }))])]), _vm._v(" "), _vm._t("tbody", [_c('tbody', [_vm.loading ? _c('tr', [_c('td', {
      staticClass: "position-relative",
      style: {
        'height': _vm.height(_vm.minHeight)
      },
      attrs: {
        "colspan": _vm.tableColumns.length
      }
    }, [_c('activity-indicator', {
      attrs: {
        "center": true
      }
    })], 1)]) : !_vm.data.length ? _c('tr', [_c('td', {
      staticClass: "position-relative",
      attrs: {
        "colspan": _vm.tableColumns.length
      }
    }, [_c('alert', {
      staticClass: "my-3",
      attrs: {
        "variant": "warning"
      }
    }, [_c('i', {
      staticClass: "fa fa-warning"
    }), _vm._v(" There are no results found. ")])], 1)]) : _vm._t("default", _vm._l(_vm.data, function (row, i) {
      return _c('tr', _vm._l(_vm.tableColumns, function (column) {
        return _c('td', {
          domProps: {
            "innerHTML": _vm._s(row[column.id] || row[column.name])
          }
        });
      }));
    }), {
      data: _vm.data,
      columns: _vm.tableColumns
    })], 2)]), _vm._v(" "), _vm._t("tfoot", [_c('tfoot', [_c('td', {
      staticClass: "table-view-footer",
      attrs: {
        "colspan": _vm.tableColumns.length
      }
    }, [_vm._t("pagination", [_vm.paginate && _vm.response ? _c('pagination', {
      attrs: {
        "align": "center",
        "page": _vm.response.current_page,
        "total-pages": _vm.response.last_page,
        "on-paginate": _vm.onPaginate
      }
    }) : _vm._e()])], 2)])])], 2)]);
  },
  staticRenderFns: [],
  name: 'table-view',
  mixins: [Proxy],
  components: {
    Pagination: Pagination,
    ActivityIndicator: ActivityIndicator
  },
  props: {
    // (string) A relative or absolute endpoint URL used to fetch data
    url: {
      type: String,
      required: true
    },
    // (integer) The starting page of the table
    page: {
      type: Number,
      default: 1
    },
    // (integer) The total number of results per page
    limit: {
      type: Number,
      default: 20
    },
    // (string) The column used to order the data
    order: String,
    // (string) The sort direction (asc|desc)
    sort: {
      type: String,
      validate: function validate(value) {
        return ['asc', 'desc'].indexOf(value) !== -1;
      }
    },
    // (integer) The minimum height of the row when loading data
    minHeight: {
      type: Number,
      default: 400
    },
    // (array) An array of button objects
    // [{href: 'test-123', label: 'Test 123'}]
    buttons: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    // (array) An array of table column
    // [{id: 'database_id', name: 'Database id', width: '20%'}]
    columns: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    // (string) The table heading
    heading: String,
    // (string) Add table-hover to the table element
    hover: {
      type: Boolean,
      default: true
    },
    // (string) The table description
    description: String,
    // (bool) Should show the pagination for this table
    paginate: {
      type: Boolean,
      default: true
    },
    // (object) The HTTP response transformer instance
    transformer: {
      type: Object,
      validate: function validate(value) {
        return value instanceof TableViewTransformer;
      }
    }
  },
  computed: {
    tableColumns: function tableColumns() {
      var columns = this.columns;

      if (!columns || !columns.length) {
        columns = keys_1(this.data[0]);
      }

      return columns.map(function (column) {
        return isObject_1(column) ? column : {
          name: column
        };
      });
    }
  },
  methods: {
    orderBy: function orderBy(order) {
      var defaultSort = 'desc';
      var currentSort = this.getRequestParam('sort');
      var currentOrder = this.getRequestParam('order');
      this.addRequestParam('order', order);
      this.addRequestParam('sort', currentOrder !== order || !currentSort ? defaultSort : currentSort === defaultSort ? 'asc' : null);
      this.fetch();
    },
    getRequestHeader: function getRequestHeader(key, value) {
      return this.request.headers[key] || value;
    },
    addRequestHeader: function addRequestHeader(key, value) {
      if (!this.request.headers) {
        this.request.headers = {};
      }

      this.request.headers[key] = value;
    },
    getRequestParam: function getRequestParam(key, value) {
      return this.request.params[key] || value;
    },
    addRequestParam: function addRequestParam(key, value) {
      if (!this.request.params) {
        this.request.params = {};
      }

      this.request.params[key] = value;
    },
    fetch: function fetch() {
      var _this = this;

      var request = new Request(this.url, this.request);
      this.loading = true;
      return request.get().then(function (response) {
        var transformer = _this.transformer || new TableViewTransformer(response);
        _this.response = transformer.response();
        _this.data = transformer.data();
        _this.loading = false;
      }, function (errors) {
        _this.loading = false;
      });
    },
    height: function height(min) {
      var elements = [// this.$el.querySelector('thead'),
      this.$el.querySelector('tbody')];
      var height = 0;
      each(elements, function (el) {
        height += el.getBoundingClientRect().height;
      });
      return unit(Math.max(min, height));
    },
    onPaginate: function onPaginate(page, event) {
      if (!this.request.params) {
        this.request.params = {};
      }

      this.request.params.page = page;
      this.fetch();
    }
  },
  data: function data() {
    return {
      // (array) The dataset for the table
      data: this.$attrs.data || [],
      // (bool) Is the table currently loading data
      loading: false,
      // (null|object) The response object
      response: null,
      // (object) The HTTP request object
      request: extend({
        headers: {},
        params: {
          page: this.page,
          limit: this.limit,
          order: this.order,
          sort: this.sort
        }
      }, this.$attrs.request)
    };
  },
  mounted: function mounted() {
    this.fetch();
  },

  /*
  data() {
      return extend({
          buttons: [],
           columns: [],
           header: false,
           description: false,
           // (bool) Should show the pagination for this table
          paginate: true,
           // (bool) Is the table currently loading data
          loading: false,
           // (object) An object with key/value pairs for components used in the template
          components: {
              // (string) The name of the component used for the table header
              header: 'table-view-header',
               // (string) The name of the component used for the table row
              row: 'table-view-row',
               // (string) The name of the component used for the table row
              footer: 'table-view-footer'
          },
           // (int) The starting page
          // page: 1,
           // (string) The order of the date being returned
          // order: null,
           // (string) Either asc or desc sorting order
          // sort: null,
           // (int) The numbers of rows per page
          // limit: 20,
           // (bool) Fetch the data when table is shown
          // fetchOnRender: true,
           // (array) An array of headers appended to the request
          // requestHeaders: [],
           // (array) The default options used to generate the query string
          // defaultRequestDataOptions: [
          //    'page',
          //    'limit',
          //    'order',
          //    'sort'
          // ],
           // (object) An option to pass an object with request data
          // requestData: {},
           // (array) Additional options used to generate the query string
          // requestDataOptions: [],
           // (object) The body view options object
          // bodyViewOptions: false,
           // (object) The pagination view class
          // footerView: 'pagination',
           // (object) The pagination view options object
          // footerViewOptions: false,
           // (string) The table footer class name
          // footerClassName: 'table-header',
           // (string) The table header
          // header: false,
           // (string) The table header tag name
          // headerTagName: 'h3',
           // (string) The table header class name
          // headerClassName: 'table-header',
           // (object) The header view class
          // headerView: false,
           // (object) The header view options object
          // headerViewOptions: false,
           // (string) The table description
          // description: false,
           // (string) The table description tag
          // descriptionTag: 'p',
           // (string) The table description tag
          // descriptionClassName: 'description row col-sm-6',
           // (string) The table class name
          // tableClassName: 'table',
           // (string) The loading class name
          // loadingClassName: 'loading',
           // (string) The name of the property in the model storing the columns
          // childViewColumnsProperty: 'columns',
           // (object) The activity indicator options
          // indicatorOptions: {
          //     indicator: 'small'
          // },
           // (string) The message to display if there are no table rows
          // emptyMessage: 'No rows found',
           // (string) The name of the class appended to the buttons
          // buttonClassName: 'btn btn-default',
      }, this.$attrs);
  },
  */
  beforeDestroy: function beforeDestroy() {
    this.$off();
  }
};
var plugin$34 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      TableView: TableView
    });
  }
});
var TextareaField = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('form-group', [_vm._t("label", [_vm.label || _vm.hasDefaultSlot ? _c('form-label', {
      attrs: {
        "for": _vm.id
      }
    }, [_vm._t("default", [_vm._v(_vm._s(_vm.label))])], 2) : _vm._e()]), _vm._v(" "), _vm._t("control", [_c('textarea', {
      directives: [{
        name: "bind-events",
        rawName: "v-bind-events",
        value: _vm.bindEvents,
        expression: "bindEvents"
      }],
      class: _vm.$mergeClasses(_vm.controlClasses, _vm.colorableClasses),
      attrs: {
        "id": _vm.id,
        "rows": _vm.rows,
        "errors": _vm.errors,
        "placeholder": _vm.placeholder,
        "required": _vm.required,
        "disabled": _vm.disabled || _vm.readonly,
        "readonly": _vm.readonly,
        "pattern": _vm.pattern
      },
      domProps: {
        "value": _vm.value
      },
      on: {
        "input": function input($event) {
          _vm.updated($event.target.value);
        }
      }
    })]), _vm._v(" "), _vm._t("help", [_vm.helpText ? _c('help-text', {
      domProps: {
        "innerHTML": _vm._s(_vm.helpText)
      }
    }) : _vm._e()]), _vm._v(" "), _vm._t("feedback", [_vm.validFeedback ? _c('form-feedback', {
      attrs: {
        "valid": ""
      },
      domProps: {
        "innerHTML": _vm._s(_vm.validFeedback)
      }
    }) : _vm._e(), _vm._v(" "), _vm.invalidFeedback ? _c('form-feedback', {
      attrs: {
        "invalid": ""
      },
      domProps: {
        "innerHTML": _vm._s(_vm.invalidFeedback)
      }
    }) : _vm._e()])], 2);
  },
  staticRenderFns: [],
  name: 'textarea-field',
  mixins: [Colorable, FormControl],
  props: {
    /**
     * The type attribute
     *
     * @property String
     */
    type: {
      type: String,
      default: 'text'
    },

    /**
     * The rows attribute
     *
     * @property String
     */
    rows: [Number, String]
  }
};
var plugin$35 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      TextareaField: TextareaField
    });
  }
});
var ThumbnailList = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "thumbnail-list",
      class: _vm.classes
    }, [_vm._l(_vm.images, function (image) {
      return !!_vm.images ? _c('thumbnail-list-item', {
        attrs: {
          "src": image,
          "width": _vm.width
        }
      }) : _vm._e();
    }), _vm._v(" "), _vm._t("default")], 2);
  },
  staticRenderFns: [],
  props: {
    fill: Boolean,
    flex: Boolean,
    noFlex: Boolean,
    grid: Boolean,
    wrap: Boolean,
    images: Array,
    width: {
      type: [String, Number],
      default: 75
    }
  },
  computed: {
    classes: function classes() {
      return {
        'thumbnail-list-fill': this.fill,
        'thumbnail-list-flex': this.flex,
        'thumbnail-list-noflex': this.noFlex,
        'thumbnail-list-grid': this.grid,
        'thumbnail-list-wrap': this.wrap
      };
    }
  }
};
var ThumbnailListItem = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "thumbnail-list-item",
      style: {
        height: _vm.unit(_vm.height),
        width: _vm.unit(_vm.width),
        minHeight: _vm.unit(_vm.minHeight),
        maxHeight: _vm.unit(_vm.maxHeight),
        minWidth: _vm.unit(_vm.minWidth),
        maxWidth: _vm.unit(_vm.maxWidth)
      }
    }, [_vm.src ? _c('img', {
      class: {
        'img-fluid': _vm.fluid
      },
      attrs: {
        "src": _vm.src,
        "alt": _vm.alt
      }
    }) : _vm._e(), _vm._v(" "), _vm._t("default")], 2);
  },
  staticRenderFns: [],
  props: {
    alt: String,
    src: String,
    width: [String, Number],
    height: [String, Number],
    minHeight: [String, Number],
    maxHeight: [String, Number],
    minWidth: [String, Number],
    maxWidth: [String, Number],
    fluid: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    unit: unit
  }
};
var plugin$36 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      ThumbnailList: ThumbnailList
    });
  }
});
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeMax$4 = Math.max;
/**
 * This method is like `_.find` except that it returns the index of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @static
 * @memberOf _
 * @since 1.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * _.findIndex(users, function(o) { return o.user == 'barney'; });
 * // => 0
 *
 * // The `_.matches` iteratee shorthand.
 * _.findIndex(users, { 'user': 'fred', 'active': false });
 * // => 1
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findIndex(users, ['active', false]);
 * // => 0
 *
 * // The `_.property` iteratee shorthand.
 * _.findIndex(users, 'active');
 * // => 2
 */

function findIndex$1(array, predicate, fromIndex) {
  var length = array == null ? 0 : array.length;

  if (!length) {
    return -1;
  }

  var index = fromIndex == null ? 0 : toInteger_1(fromIndex);

  if (index < 0) {
    index = nativeMax$4(length + index, 0);
  }

  return _baseFindIndex(array, _baseIteratee(predicate, 3), index);
}

var findIndex_1 = findIndex$1;
/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */

function last(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}

var last_1 = last;
/**
 * Gets the parent value at `path` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} path The path to get the parent value of.
 * @returns {*} Returns the parent value.
 */

function parent(object, path) {
  return path.length < 2 ? object : _baseGet(object, _baseSlice(path, 0, -1));
}

var _parent = parent;
/**
 * The base implementation of `_.unset`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The property path to unset.
 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
 */

function baseUnset(object, path) {
  path = _castPath(path, object);
  object = _parent(object, path);
  return object == null || delete object[_toKey(last_1(path))];
}

var _baseUnset = baseUnset;
/** Used for built-in method references. */

var arrayProto$1 = Array.prototype;
/** Built-in value references. */

var splice$1 = arrayProto$1.splice;
/**
 * The base implementation of `_.pullAt` without support for individual
 * indexes or capturing the removed elements.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {number[]} indexes The indexes of elements to remove.
 * @returns {Array} Returns `array`.
 */

function basePullAt(array, indexes) {
  var length = array ? indexes.length : 0,
      lastIndex = length - 1;

  while (length--) {
    var index = indexes[length];

    if (length == lastIndex || index !== previous) {
      var previous = index;

      if (_isIndex(index)) {
        splice$1.call(array, index, 1);
      } else {
        _baseUnset(array, index);
      }
    }
  }

  return array;
}

var _basePullAt = basePullAt;
/**
 * Removes all elements from `array` that `predicate` returns truthy for
 * and returns an array of the removed elements. The predicate is invoked
 * with three arguments: (value, index, array).
 *
 * **Note:** Unlike `_.filter`, this method mutates `array`. Use `_.pull`
 * to pull elements from an array by value.
 *
 * @static
 * @memberOf _
 * @since 2.0.0
 * @category Array
 * @param {Array} array The array to modify.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new array of removed elements.
 * @example
 *
 * var array = [1, 2, 3, 4];
 * var evens = _.remove(array, function(n) {
 *   return n % 2 == 0;
 * });
 *
 * console.log(array);
 * // => [1, 3]
 *
 * console.log(evens);
 * // => [2, 4]
 */

function remove(array, predicate) {
  var result = [];

  if (!(array && array.length)) {
    return result;
  }

  var index = -1,
      indexes = [],
      length = array.length;
  predicate = _baseIteratee(predicate, 3);

  while (++index < length) {
    var value = array[index];

    if (predicate(value, index, array)) {
      result.push(value);
      indexes.push(index);
    }
  }

  _basePullAt(array, indexes);

  return result;
}

var remove_1 = remove;
var UploadField = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('form-group', {
      staticClass: "upload-field",
      class: {
        'enable-dropzone': _vm.dropzone,
        'enable-multiple': _vm.multiple
      }
    }, [_c('dropzone', {
      on: {
        "drop": _vm.onDrop
      }
    }, [_vm.multiple && (!_vm.maxUploads || _vm.maxUploads > _vm.value.length) || !_vm.multiple && !_vm.value ? _c('file-field', {
      attrs: {
        "name": _vm.name,
        "label": _vm.label,
        "placeholder": _vm.placeholder,
        "help-text": _vm.helpText,
        "multiple": _vm.multiple,
        "errors": _vm.errors
      },
      on: {
        "change": _vm.onChange
      }
    }) : _vm._e(), _vm._v(" "), _vm.multiple && _vm.value && _vm.value.length ? _c('thumbnail-list', {
      staticClass: "mt-4",
      attrs: {
        "wrap": ""
      }
    }, _vm._l(_vm.value, function (file, key) {
      return _c('thumbnail-list-item', {
        key: file.id || key,
        attrs: {
          "width": _vm.width,
          "min-width": _vm.minWidth,
          "max-width": _vm.maxWidth,
          "height": _vm.height,
          "min-height": _vm.minHeight,
          "max-height": _vm.maxHeight
        }
      }, [_c('file-preview', {
        attrs: {
          "file": file
        },
        on: {
          "close": function close($event) {
            _vm.removeFile(file);
          }
        }
      }), _vm._v(" "), _vm._t("default", null, {
        file: file
      }), _vm._v(" "), _c('thumbnail-list-item')], 2);
    })) : !_vm.multiple && _vm.value ? _c('thumbnail-list', {
      staticClass: "mt-4",
      attrs: {
        "wrap": ""
      }
    }, [_c('thumbnail-list-item', {
      attrs: {
        "width": _vm.width,
        "min-width": _vm.minWidth,
        "max-width": _vm.maxWidth,
        "height": _vm.height,
        "min-height": _vm.minHeight,
        "max-height": _vm.maxHeight
      }
    }, [_c('file-preview', {
      attrs: {
        "file": _vm.value
      },
      on: {
        "close": function close($event) {
          _vm.removeFile(_vm.value);
        }
      }
    }), _vm._v(" "), _vm._t("default", null, {
      file: _vm.value
    }), _vm._v(" "), _c('thumbnail-list-item')], 2)], 1) : _vm._e(), _vm._v(" "), _vm.showDropElement ? _c('div', {
      staticClass: "upload-field-dropzone",
      style: {
        'min-height': _vm.dropzoneMinHeight
      },
      on: {
        "drop": function drop($event) {
          $event.preventDefault();
          return _vm.onDrop($event);
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-cloud-upload"
    }), _vm._v(" "), _c('div', [_vm._v("Drag and drop files to upload")])]) : _vm._e()], 1)], 1);
  },
  staticRenderFns: [],
  name: 'upload-field',
  mixins: [FormControl],
  components: {
    Dropzone: Dropzone,
    FileField: FileField,
    FilePreview: FilePreview,
    ThumbnailList: ThumbnailList,
    ThumbnailListItem: ThumbnailListItem
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    /**
     * Can user upload multiple files
     *
     * @property String
     */
    multiple: Boolean,

    /**
     * The maximum number of files that a user can upload
     *
     * @property String
     */
    maxUploads: Number,

    /**
     * The height attribute for the control element
     *
     * @property String
     */
    height: [Number, String],

    /**
     * The minimum height attribute for the control element
     *
     * @property String
     */
    minHeight: [Number, String],

    /**
     * The maximum height attribute for the control element
     *
     * @property String
     */
    maxHeight: [Number, String],

    /**
     * The width attribute for the control element
     *
     * @property String
     */
    width: [Number, String],

    /**
     * The minimum width attribute for the control element
     *
     * @property String
     */
    minWidth: [Number, String],

    /**
     * The maximum width attribute for the control element
     *
     * @property String
     */
    maxWidth: [Number, String],

    /**
     * Can user drag/drop files into browser to upload them.
     *
     * @property String
     */
    dropzoneMinHeight: [Number, String],

    /**
     * Is the user dragging a file over the dropzone
     *
     * @property String
     */
    dragging: {
      type: [String, Boolean],
      default: function _default() {
        return undefined;
      }
    },

    /**
     * Can user drag/drop files into browser to upload them.
     *
     * @property String
     */
    dropzone: {
      type: Boolean,
      default: true
    },

    /**
     * The data attribute
     *
     * @property File|FileList|Array
     */
    value: {
      type: [Object, File, FileList, Array],
      default: function _default() {
        return !this.multiple ? null : [];
      }
    }
  },
  methods: _defineProperty$1$1({
    removeFile: function removeFile(data) {
      if (this.multiple) {
        var files = isArray_1(this.value) ? this.value.slice(0) : [];

        if (data instanceof File) {
          remove_1(files, {
            name: data.name,
            size: data.size,
            lastModified: data.lastModified
          });
        } else {
          remove_1(files, data);
        }

        this.$emit('change', files);
      } else {
        this.$emit('change', null);
      }
    },
    addFile: function addFile(file, subject) {
      var data = {
        name: file.name,
        lastModified: file.lastModified,
        lastModifiedDate: file.lastModifiedDate,
        size: file.size,
        type: file.type
      };

      if (this.multiple) {
        var files = subject || (isArray_1(this.value) ? this.value.slice(0) : []);

        if (!this.maxUploads || this.maxUploads > files.length) {
          if (findIndex_1(files, data) === -1) {
            files.push(file);
          }

          this.$emit('change', files);
        }
      } else {
        this.$emit('change', file);
      }
    },
    addFiles: function addFiles(files) {
      var _this = this;

      var subject = isArray_1(this.value) ? this.value.slice(0) : [];
      each(files, function (file) {
        _this.addFile(file, subject);
      });
      event.target.value = null;
    },
    onDrop: function onDrop(event) {
      this.onChange(event.dataTransfer.files);
    },
    onChange: function onChange(files) {
      if (files instanceof FileList) {
        this.addFiles(files);
      } else {
        this.addFile(files);
      }
    },

    /**
     * The `dragover` event callback.
     *
     * @property String
     */
    onDragOver: function onDragOver(event) {
      this.isDraggingInside = true;
      this.$emit('update:dragging', true);
      this.$emit('drag:over', event);
    },

    /**
     * The `dragover` event callback.
     *
     * @property String
     */
    onDragEnter: function onDragEnter(event) {
      this.isDraggingInside = true;
      this.$emit('update:dragging', true);
      this.$emit('drag:enter', event);
    },

    /**
     * The `dragleave` event callback.
     *
     * @property String
     */
    onDragLeave: function onDragLeave(event) {
      this.isDraggingInside = false;
      this.$emit('update:dragging', false);
      this.$emit('drag:leave', event);
    }
  }, "onDrop", function onDrop(event) {
    this.isDraggingInside = false;
    this.addFiles(event.dataTransfer.files);
    this.$emit('update:dragging', false);
    this.$emit('drop', event);
  }),
  computed: {
    showDropElement: function showDropElement() {
      return !isUndefined_1(this.dragging) ? this.dragging : this.isDraggingInside;
    }
  },
  data: function data() {
    return {
      isDraggingInside: false
    };
  }
};
var plugin$37 = VueInstaller.use({
  install: function install(Vue, options) {
    VueInstaller.components({
      UploadField: UploadField
    });
  }
});
var components$1 =
/*#__PURE__*/
Object.freeze({
  ActivityButton: ActivityButton,
  ActivityIndicator: ActivityIndicator,
  Alert: Alert,
  AlertClose: AlertClose,
  AlertHeading: AlertHeading,
  AlertLink: AlertLink,
  Badge: Badge,
  BaseForm: BaseForm,
  Breadcrumb: Breadcrumb,
  BreadcrumbItem: BreadcrumbItem,
  Btn: Btn,
  BtnFile: BtnFile,
  BtnGroup: BtnGroup,
  BtnToolbar: BtnToolbar,
  BtnDropdown: BtnDropdown,
  Card: Card,
  CardBody: CardBody,
  CardFooter: CardFooter,
  CardHeader: CardHeader,
  CardImg: CardImg,
  CardImgTop: CardImgTop,
  CardImgBottom: CardImgBottom,
  CardImgOverlay: CardImgOverlay,
  CardLink: CardLink,
  CardSubtitle: CardSubtitle,
  CardTitle: CardTitle,
  CheckboxField: CheckboxField,
  Container: Container,
  DropdownMenu: DropdownMenu,
  DropdownMenuItem: DropdownMenuItem,
  DropdownMenuHeader: DropdownMenuHeader,
  DropdownMenuDivider: DropdownMenuDivider,
  Dropzone: Dropzone,
  FileField: FileField,
  FilePreview: FilePreview,
  FormControl: FormControl$1,
  FormFeedback: FormFeedback,
  FormGroup: FormGroup,
  FormLabel: FormLabel,
  HelpText: HelpText,
  InputField: InputField,
  InputGroup: InputGroup,
  InputGroupAppend: InputGroupAppend,
  InputGroupPrepend: InputGroupPrepend,
  InputGroupText: InputGroupText,
  LightSwitchField: LightSwitchField,
  ListGroup: ListGroup,
  ListGroupItem: ListGroupItem,
  Modal: Modal,
  ModalBackdrop: ModalBackdrop,
  ModalBody: ModalBody,
  ModalContent: ModalContent,
  ModalDialog: ModalDialog,
  ModalFooter: ModalFooter,
  ModalHeader: ModalHeader,
  ModalTitle: ModalTitle,
  Navigation: Navigation,
  NavigationItem: NavigationItem,
  NavigationLink: NavigationLink,
  NavigationDropdown: NavigationDropdown,
  Overlay: Overlay,
  Pagination: Pagination,
  ProgressBar: ProgressBar,
  RadioField: RadioField,
  SelectField: SelectField,
  TableView: TableView,
  TextareaField: TextareaField,
  ThumbnailList: ThumbnailList,
  ThumbnailListItem: ThumbnailListItem,
  UploadField: UploadField
});
var STYLE_ATTRIBUTES = ['font', 'fontFamily', 'fontKerning', 'fontSize', 'fontStretch', 'fontStyle', 'fontVariant', 'fontVariantLigatures', 'fontVariantCaps', 'fontVariantNumeric', 'fontVariantEastAsian', 'fontWeight', 'lineHeight', 'letterSpacing', 'padding', 'margin', 'textAlign', 'textAlignLast', 'textDecoration', 'textDecorationLine', 'textDecorationStyle', 'textDecorationColor', 'textDecorationSkipInk', 'textDecorationPosition', 'textIndent', 'textRendering', 'textShadow', 'textSizeAdjust', 'textOverflow', 'textTransform', 'width', 'wordBreak', 'wordSpacing', 'wordWrap'];

function int(str) {
  if (typeof str === "number") {
    return str;
  } else if (!str || !str.replace) {
    return 0;
  }

  return parseInt(str.replace(/[^\d.]+/g, ''));
}

function input(div, event) {
  div.innerHTML = event.target.value.replace(/(?:\r\n|\r|\n)/g, '<br />');
}

function height(el) {
  return int(el.getBoundingClientRect().height);
}

function style(el, attr) {
  return window.getComputedStyle(el)[attr];
}

function resize(target, div, minHeight, maxHeight) {
  var dynamicHeight = Math.max(height(div) + int(style(div, 'lineHeight')), minHeight);
  target.style.height = (!maxHeight || dynamicHeight < maxHeight ? dynamicHeight : maxHeight) + 'px';
}

function mimic(el) {
  var div = document.createElement('div');
  var styles = window.getComputedStyle(el);

  for (var i in STYLE_ATTRIBUTES) {
    var key = STYLE_ATTRIBUTES[i];
    div.style[key] = styles[key];
  }

  div.style.zIndex = -1;
  div.style.visibility = 'hidden';
  return div;
}

function init(el, maxHeight) {
  var div = mimic(el);
  var minHeight = height(el);
  el.addEventListener('input', function (event) {
    input(div, event);
    resize(el, div, minHeight, maxHeight);
  });
  document.body.appendChild(div);
  el.dispatchEvent(new Event('input'));
}

var Autogrow = {
  inserted: function inserted(el, binding, vnode) {
    if (el.tagName.toLowerCase() !== 'textarea') {
      el = el.querySelector('textarea');
    }

    if (!el) {
      throw new Error('A textarea is required for the v-autogrow directive.');
    }

    init(el, binding.value);
  }
};

function index$1(Vue, options) {
  Vue.directive('autogrow', Autogrow);
}

var directives$1 =
/*#__PURE__*/
Object.freeze({
  Autogrow: index$1
});

var main = VueInstaller.use({
  install: function install(Vue) {
    {
      var domain = (location.host || 'localhost').split(':')[0];
      var port = {
        "watch": "/Users/justinkimbrell/Github/vue-interface/src/",
        "port": 35730
      } && {
        "watch": "/Users/justinkimbrell/Github/vue-interface/src/",
        "port": 35730
      }.port;
      VueInstaller.script("http://".concat(domain, ":").concat(port, "/livereload.js?snipver=1"));
    }
    VueInstaller.plugins(Vue, plugins);
    VueInstaller.filters(Vue, filters);
    VueInstaller.directives(Vue, directives$1);
    VueInstaller.components(Vue, components$1);
  }
});

console.log(MergeClasses);
/*
import PlaceAutofill from './PlaceAutofill';
import PlaceAutocompleteField from './PlaceAutocompleteField';
import PlaceAutocompleteList from './PlaceAutocompleteList';
import PlaceAutocompleteListItem from './PlaceAutocompleteListItem';

import mergeClasses from 'vue-interface/src/Plugins/MergeClasses';

export {
    PlaceAutocompleteField,
    PlaceAutocompleteList,
    PlaceAutocompleteListItem
}

function install(vue, options) {
    Vue.use(mergeClasses);
    Vue.directive('place-autofill', PlaceAutofill);
    Vue.component('place-autocomplete-field', PlaceAutocompleteField);
    Vue.component('place-autocomplete-list', PlaceAutocompleteList);
    Vue.component('place-autocomplete-list-item', PlaceAutocompleteListItem);
}

if(window && window.Vue) {
    window.Vue.use(install);
}

export default install;
*/
//# sourceMappingURL=vue-place-autocomplete.es.js.map
