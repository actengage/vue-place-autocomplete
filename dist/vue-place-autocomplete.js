(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.VuePlaceAutocomplete = {})));
}(this, (function (exports) { 'use strict';

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
    return value === other || (value !== value && other !== other);
  }

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
      if (eq(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }

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
        index = assocIndexOf(data, key);

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
        index = assocIndexOf(data, key);

    return index < 0 ? undefined : data[index][1];
  }

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
    return assocIndexOf(this.__data__, key) > -1;
  }

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
        index = assocIndexOf(data, key);

    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }

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
  }

  // Add methods to `ListCache`.
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype['delete'] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;

  /**
   * Removes all key-value entries from the stack.
   *
   * @private
   * @name clear
   * @memberOf Stack
   */
  function stackClear() {
    this.__data__ = new ListCache;
    this.size = 0;
  }

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

  var global$1 = typeof global !== "undefined" ? global :
              typeof self !== "undefined" ? self :
              typeof window !== "undefined" ? window : {}

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof global$1 == 'object' && global$1 && global$1.Object === Object && global$1;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = freeGlobal || freeSelf || Function('return this')();

  /** Built-in value references. */
  var Symbol$1 = root.Symbol;

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
  var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

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

  /** `Object#toString` result references. */
  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';

  /** Built-in value references. */
  var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

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
    return (symToStringTag$1 && symToStringTag$1 in Object(value))
      ? getRawTag(value)
      : objectToString(value);
  }

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
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

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
  function isFunction(value) {
    if (!isObject(value)) {
      return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }

  /** Used to detect overreaching core-js shims. */
  var coreJsData = root['__core-js_shared__'];

  /** Used to detect methods masquerading as native. */
  var maskSrcKey = (function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
    return uid ? ('Symbol(src)_1.' + uid) : '';
  }());

  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */
  function isMasked(func) {
    return !!maskSrcKey && (maskSrcKey in func);
  }

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
        return (func + '');
      } catch (e) {}
    }
    return '';
  }

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
  var reIsNative = RegExp('^' +
    funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&')
    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
  );

  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */
  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }

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

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : undefined;
  }

  /* Built-in method references that are verified to be native. */
  var Map$1 = getNative(root, 'Map');

  /* Built-in method references that are verified to be native. */
  var nativeCreate = getNative(Object, 'create');

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */
  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
    this.size = 0;
  }

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

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED = '__lodash_hash_undefined__';

  /** Used for built-in method references. */
  var objectProto$3 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

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
    if (nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? undefined : result;
    }
    return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
  }

  /** Used for built-in method references. */
  var objectProto$4 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

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
    return nativeCreate ? (data[key] !== undefined) : hasOwnProperty$3.call(data, key);
  }

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
    data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
    return this;
  }

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
  }

  // Add methods to `Hash`.
  Hash.prototype.clear = hashClear;
  Hash.prototype['delete'] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;

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
      'hash': new Hash,
      'map': new (Map$1 || ListCache),
      'string': new Hash
    };
  }

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */
  function isKeyable(value) {
    var type = typeof value;
    return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
      ? (value !== '__proto__')
      : (value === null);
  }

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
    return isKeyable(key)
      ? data[typeof key == 'string' ? 'string' : 'hash']
      : data.map;
  }

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
    var result = getMapData(this, key)['delete'](key);
    this.size -= result ? 1 : 0;
    return result;
  }

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
    return getMapData(this, key).get(key);
  }

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
    return getMapData(this, key).has(key);
  }

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
    var data = getMapData(this, key),
        size = data.size;

    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }

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
  }

  // Add methods to `MapCache`.
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype['delete'] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;

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
    if (data instanceof ListCache) {
      var pairs = data.__data__;
      if (!Map$1 || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new MapCache(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }

  /**
   * Creates a stack cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Stack(entries) {
    var data = this.__data__ = new ListCache(entries);
    this.size = data.size;
  }

  // Add methods to `Stack`.
  Stack.prototype.clear = stackClear;
  Stack.prototype['delete'] = stackDelete;
  Stack.prototype.get = stackGet;
  Stack.prototype.has = stackHas;
  Stack.prototype.set = stackSet;

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

    this.__data__ = new MapCache;
    while (++index < length) {
      this.add(values[index]);
    }
  }

  // Add methods to `SetCache`.
  SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
  SetCache.prototype.has = setCacheHas;

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
    }
    // Assume cyclic values are equal.
    var stacked = stack.get(array);
    if (stacked && stack.get(other)) {
      return stacked == other;
    }
    var index = -1,
        result = true,
        seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

    stack.set(array, other);
    stack.set(other, array);

    // Ignore non-index properties.
    while (++index < arrLength) {
      var arrValue = array[index],
          othValue = other[index];

      if (customizer) {
        var compared = isPartial
          ? customizer(othValue, arrValue, index, other, array, stack)
          : customizer(arrValue, othValue, index, array, other, stack);
      }
      if (compared !== undefined) {
        if (compared) {
          continue;
        }
        result = false;
        break;
      }
      // Recursively compare arrays (susceptible to call stack limits).
      if (seen) {
        if (!arraySome(other, function(othValue, othIndex) {
              if (!cacheHas(seen, othIndex) &&
                  (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                return seen.push(othIndex);
              }
            })) {
          result = false;
          break;
        }
      } else if (!(
            arrValue === othValue ||
              equalFunc(arrValue, othValue, bitmask, customizer, stack)
          )) {
        result = false;
        break;
      }
    }
    stack['delete'](array);
    stack['delete'](other);
    return result;
  }

  /** Built-in value references. */
  var Uint8Array = root.Uint8Array;

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

    map.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }

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

    set.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$1 = 1,
      COMPARE_UNORDERED_FLAG$1 = 2;

  /** `Object#toString` result references. */
  var boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      symbolTag = '[object Symbol]';

  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]';

  /** Used to convert symbols to primitives and strings. */
  var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
      symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

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
      case dataViewTag:
        if ((object.byteLength != other.byteLength) ||
            (object.byteOffset != other.byteOffset)) {
          return false;
        }
        object = object.buffer;
        other = other.buffer;

      case arrayBufferTag:
        if ((object.byteLength != other.byteLength) ||
            !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
          return false;
        }
        return true;

      case boolTag:
      case dateTag:
      case numberTag:
        // Coerce booleans to `1` or `0` and dates to milliseconds.
        // Invalid dates are coerced to `NaN`.
        return eq(+object, +other);

      case errorTag:
        return object.name == other.name && object.message == other.message;

      case regexpTag:
      case stringTag:
        // Coerce regexes to strings and treat strings, primitives and objects,
        // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
        // for more details.
        return object == (other + '');

      case mapTag:
        var convert = mapToArray;

      case setTag:
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1;
        convert || (convert = setToArray);

        if (object.size != other.size && !isPartial) {
          return false;
        }
        // Assume cyclic values are equal.
        var stacked = stack.get(object);
        if (stacked) {
          return stacked == other;
        }
        bitmask |= COMPARE_UNORDERED_FLAG$1;

        // Recursively compare objects (susceptible to call stack limits).
        stack.set(object, other);
        var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
        stack['delete'](object);
        return result;

      case symbolTag:
        if (symbolValueOf) {
          return symbolValueOf.call(object) == symbolValueOf.call(other);
        }
    }
    return false;
  }

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
    return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
  }

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

  /** Used for built-in method references. */
  var objectProto$5 = Object.prototype;

  /** Built-in value references. */
  var propertyIsEnumerable = objectProto$5.propertyIsEnumerable;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeGetSymbols = Object.getOwnPropertySymbols;

  /**
   * Creates an array of the own enumerable symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of symbols.
   */
  var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
    if (object == null) {
      return [];
    }
    object = Object(object);
    return arrayFilter(nativeGetSymbols(object), function(symbol) {
      return propertyIsEnumerable.call(object, symbol);
    });
  };

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
    return value != null && typeof value == 'object';
  }

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
    return isObjectLike(value) && baseGetTag(value) == argsTag;
  }

  /** Used for built-in method references. */
  var objectProto$6 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$4 = objectProto$6.hasOwnProperty;

  /** Built-in value references. */
  var propertyIsEnumerable$1 = objectProto$6.propertyIsEnumerable;

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
  var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
    return isObjectLike(value) && hasOwnProperty$4.call(value, 'callee') &&
      !propertyIsEnumerable$1.call(value, 'callee');
  };

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

  /** Detect free variable `exports`. */
  var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Built-in value references. */
  var Buffer = moduleExports ? root.Buffer : undefined;

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
  var isBuffer = nativeIsBuffer || stubFalse;

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER = 9007199254740991;

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
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER : length;

    return !!length &&
      (type == 'number' ||
        (type != 'symbol' && reIsUint.test(value))) &&
          (value > -1 && value % 1 == 0 && value < length);
  }

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER$1 = 9007199254740991;

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
    return typeof value == 'number' &&
      value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
  }

  /** `Object#toString` result references. */
  var argsTag$1 = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag$1 = '[object Boolean]',
      dateTag$1 = '[object Date]',
      errorTag$1 = '[object Error]',
      funcTag$1 = '[object Function]',
      mapTag$1 = '[object Map]',
      numberTag$1 = '[object Number]',
      objectTag = '[object Object]',
      regexpTag$1 = '[object RegExp]',
      setTag$1 = '[object Set]',
      stringTag$1 = '[object String]',
      weakMapTag = '[object WeakMap]';

  var arrayBufferTag$1 = '[object ArrayBuffer]',
      dataViewTag$1 = '[object DataView]',
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
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
  typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
  typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] =
  typedArrayTags[dataViewTag$1] = typedArrayTags[dateTag$1] =
  typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] =
  typedArrayTags[mapTag$1] = typedArrayTags[numberTag$1] =
  typedArrayTags[objectTag] = typedArrayTags[regexpTag$1] =
  typedArrayTags[setTag$1] = typedArrayTags[stringTag$1] =
  typedArrayTags[weakMapTag] = false;

  /**
   * The base implementation of `_.isTypedArray` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   */
  function baseIsTypedArray(value) {
    return isObjectLike(value) &&
      isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
  }

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }

  /** Detect free variable `exports`. */
  var freeExports$1 = typeof exports == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule$1 = freeExports$1 && typeof module == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports$1 && freeGlobal.process;

  /** Used to access faster Node.js helpers. */
  var nodeUtil = (function() {
    try {
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }());

  /* Node.js helper references. */
  var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

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
  var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

  /** Used for built-in method references. */
  var objectProto$7 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$5 = objectProto$7.hasOwnProperty;

  /**
   * Creates an array of the enumerable property names of the array-like `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @param {boolean} inherited Specify returning inherited property names.
   * @returns {Array} Returns the array of property names.
   */
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray(value),
        isArg = !isArr && isArguments(value),
        isBuff = !isArr && !isArg && isBuffer(value),
        isType = !isArr && !isArg && !isBuff && isTypedArray(value),
        skipIndexes = isArr || isArg || isBuff || isType,
        result = skipIndexes ? baseTimes(value.length, String) : [],
        length = result.length;

    for (var key in value) {
      if ((inherited || hasOwnProperty$5.call(value, key)) &&
          !(skipIndexes && (
             // Safari 9 has enumerable `arguments.length` in strict mode.
             key == 'length' ||
             // Node.js 0.10 has enumerable non-index properties on buffers.
             (isBuff && (key == 'offset' || key == 'parent')) ||
             // PhantomJS 2 has enumerable non-index properties on typed arrays.
             (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
             // Skip index properties.
             isIndex(key, length)
          ))) {
        result.push(key);
      }
    }
    return result;
  }

  /** Used for built-in method references. */
  var objectProto$8 = Object.prototype;

  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */
  function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$8;

    return value === proto;
  }

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeKeys = overArg(Object.keys, Object);

  /** Used for built-in method references. */
  var objectProto$9 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$6 = objectProto$9.hasOwnProperty;

  /**
   * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeys(object) {
    if (!isPrototype(object)) {
      return nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty$6.call(object, key) && key != 'constructor') {
        result.push(key);
      }
    }
    return result;
  }

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
    return value != null && isLength(value.length) && !isFunction(value);
  }

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
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
  }

  /**
   * Creates an array of own enumerable property names and symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function getAllKeys(object) {
    return baseGetAllKeys(object, keys, getSymbols);
  }

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$2 = 1;

  /** Used for built-in method references. */
  var objectProto$10 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$7 = objectProto$10.hasOwnProperty;

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
        objProps = getAllKeys(object),
        objLength = objProps.length,
        othProps = getAllKeys(other),
        othLength = othProps.length;

    if (objLength != othLength && !isPartial) {
      return false;
    }
    var index = objLength;
    while (index--) {
      var key = objProps[index];
      if (!(isPartial ? key in other : hasOwnProperty$7.call(other, key))) {
        return false;
      }
    }
    // Assume cyclic values are equal.
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
        var compared = isPartial
          ? customizer(othValue, objValue, key, other, object, stack)
          : customizer(objValue, othValue, key, object, other, stack);
      }
      // Recursively compare objects (susceptible to call stack limits).
      if (!(compared === undefined
            ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
            : compared
          )) {
        result = false;
        break;
      }
      skipCtor || (skipCtor = key == 'constructor');
    }
    if (result && !skipCtor) {
      var objCtor = object.constructor,
          othCtor = other.constructor;

      // Non `Object` object instances with different constructors are not equal.
      if (objCtor != othCtor &&
          ('constructor' in object && 'constructor' in other) &&
          !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
            typeof othCtor == 'function' && othCtor instanceof othCtor)) {
        result = false;
      }
    }
    stack['delete'](object);
    stack['delete'](other);
    return result;
  }

  /* Built-in method references that are verified to be native. */
  var DataView = getNative(root, 'DataView');

  /* Built-in method references that are verified to be native. */
  var Promise$1 = getNative(root, 'Promise');

  /* Built-in method references that are verified to be native. */
  var Set = getNative(root, 'Set');

  /* Built-in method references that are verified to be native. */
  var WeakMap = getNative(root, 'WeakMap');

  /** `Object#toString` result references. */
  var mapTag$2 = '[object Map]',
      objectTag$1 = '[object Object]',
      promiseTag = '[object Promise]',
      setTag$2 = '[object Set]',
      weakMapTag$1 = '[object WeakMap]';

  var dataViewTag$2 = '[object DataView]';

  /** Used to detect maps, sets, and weakmaps. */
  var dataViewCtorString = toSource(DataView),
      mapCtorString = toSource(Map$1),
      promiseCtorString = toSource(Promise$1),
      setCtorString = toSource(Set),
      weakMapCtorString = toSource(WeakMap);

  /**
   * Gets the `toStringTag` of `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  var getTag = baseGetTag;

  // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
  if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag$2) ||
      (Map$1 && getTag(new Map$1) != mapTag$2) ||
      (Promise$1 && getTag(Promise$1.resolve()) != promiseTag) ||
      (Set && getTag(new Set) != setTag$2) ||
      (WeakMap && getTag(new WeakMap) != weakMapTag$1)) {
    getTag = function(value) {
      var result = baseGetTag(value),
          Ctor = result == objectTag$1 ? value.constructor : undefined,
          ctorString = Ctor ? toSource(Ctor) : '';

      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString: return dataViewTag$2;
          case mapCtorString: return mapTag$2;
          case promiseCtorString: return promiseTag;
          case setCtorString: return setTag$2;
          case weakMapCtorString: return weakMapTag$1;
        }
      }
      return result;
    };
  }

  var getTag$1 = getTag;

  /** Used to compose bitmasks for value comparisons. */
  var COMPARE_PARTIAL_FLAG$3 = 1;

  /** `Object#toString` result references. */
  var argsTag$2 = '[object Arguments]',
      arrayTag$1 = '[object Array]',
      objectTag$2 = '[object Object]';

  /** Used for built-in method references. */
  var objectProto$11 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$8 = objectProto$11.hasOwnProperty;

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
    var objIsArr = isArray(object),
        othIsArr = isArray(other),
        objTag = objIsArr ? arrayTag$1 : getTag$1(object),
        othTag = othIsArr ? arrayTag$1 : getTag$1(other);

    objTag = objTag == argsTag$2 ? objectTag$2 : objTag;
    othTag = othTag == argsTag$2 ? objectTag$2 : othTag;

    var objIsObj = objTag == objectTag$2,
        othIsObj = othTag == objectTag$2,
        isSameTag = objTag == othTag;

    if (isSameTag && isBuffer(object)) {
      if (!isBuffer(other)) {
        return false;
      }
      objIsArr = true;
      objIsObj = false;
    }
    if (isSameTag && !objIsObj) {
      stack || (stack = new Stack);
      return (objIsArr || isTypedArray(object))
        ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
        : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
    }
    if (!(bitmask & COMPARE_PARTIAL_FLAG$3)) {
      var objIsWrapped = objIsObj && hasOwnProperty$8.call(object, '__wrapped__'),
          othIsWrapped = othIsObj && hasOwnProperty$8.call(other, '__wrapped__');

      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object,
            othUnwrapped = othIsWrapped ? other.value() : other;

        stack || (stack = new Stack);
        return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
      }
    }
    if (!isSameTag) {
      return false;
    }
    stack || (stack = new Stack);
    return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
  }

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
    if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
      return value !== value && other !== other;
    }
    return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
  }

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
      if ((noCustomizer && data[2])
            ? data[1] !== object[data[0]]
            : !(data[0] in object)
          ) {
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
        var stack = new Stack;
        if (customizer) {
          var result = customizer(objValue, srcValue, key, object, source, stack);
        }
        if (!(result === undefined
              ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$4 | COMPARE_UNORDERED_FLAG$2, customizer, stack)
              : result
            )) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` if suitable for strict
   *  equality comparisons, else `false`.
   */
  function isStrictComparable(value) {
    return value === value && !isObject(value);
  }

  /**
   * Gets the property names, values, and compare flags of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the match data of `object`.
   */
  function getMatchData(object) {
    var result = keys(object),
        length = result.length;

    while (length--) {
      var key = result[length],
          value = object[key];

      result[length] = [key, value, isStrictComparable(value)];
    }
    return result;
  }

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
    return function(object) {
      if (object == null) {
        return false;
      }
      return object[key] === srcValue &&
        (srcValue !== undefined || (key in Object(object)));
    };
  }

  /**
   * The base implementation of `_.matches` which doesn't clone `source`.
   *
   * @private
   * @param {Object} source The object of property values to match.
   * @returns {Function} Returns the new spec function.
   */
  function baseMatches(source) {
    var matchData = getMatchData(source);
    if (matchData.length == 1 && matchData[0][2]) {
      return matchesStrictComparable(matchData[0][0], matchData[0][1]);
    }
    return function(object) {
      return object === source || baseIsMatch(object, source, matchData);
    };
  }

  /** `Object#toString` result references. */
  var symbolTag$1 = '[object Symbol]';

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
    return typeof value == 'symbol' ||
      (isObjectLike(value) && baseGetTag(value) == symbolTag$1);
  }

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
    if (isArray(value)) {
      return false;
    }
    var type = typeof value;
    if (type == 'number' || type == 'symbol' || type == 'boolean' ||
        value == null || isSymbol(value)) {
      return true;
    }
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
      (object != null && value in Object(object));
  }

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
    if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    var memoized = function() {
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
    memoized.cache = new (memoize.Cache || MapCache);
    return memoized;
  }

  // Expose `MapCache`.
  memoize.Cache = MapCache;

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
    var result = memoize(func, function(key) {
      if (cache.size === MAX_MEMOIZE_SIZE) {
        cache.clear();
      }
      return key;
    });

    var cache = result.cache;
    return result;
  }

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
  var stringToPath = memoizeCapped(function(string) {
    var result = [];
    if (string.charCodeAt(0) === 46 /* . */) {
      result.push('');
    }
    string.replace(rePropName, function(match, number, quote, subString) {
      result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
    });
    return result;
  });

  /** Used as references for various `Number` constants. */
  var INFINITY = 1 / 0;

  /** Used to convert symbols to primitives and strings. */
  var symbolProto$1 = Symbol$1 ? Symbol$1.prototype : undefined,
      symbolToString = symbolProto$1 ? symbolProto$1.toString : undefined;

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
    if (isArray(value)) {
      // Recursively convert values (susceptible to call stack limits).
      return arrayMap(value, baseToString) + '';
    }
    if (isSymbol(value)) {
      return symbolToString ? symbolToString.call(value) : '';
    }
    var result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
  }

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
    return value == null ? '' : baseToString(value);
  }

  /**
   * Casts `value` to a path array if it's not one.
   *
   * @private
   * @param {*} value The value to inspect.
   * @param {Object} [object] The object to query keys on.
   * @returns {Array} Returns the cast property path array.
   */
  function castPath(value, object) {
    if (isArray(value)) {
      return value;
    }
    return isKey(value, object) ? [value] : stringToPath(toString(value));
  }

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
    if (typeof value == 'string' || isSymbol(value)) {
      return value;
    }
    var result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
  }

  /**
   * The base implementation of `_.get` without support for default values.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @returns {*} Returns the resolved value.
   */
  function baseGet(object, path) {
    path = castPath(path, object);

    var index = 0,
        length = path.length;

    while (object != null && index < length) {
      object = object[toKey(path[index++])];
    }
    return (index && index == length) ? object : undefined;
  }

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
    var result = object == null ? undefined : baseGet(object, path);
    return result === undefined ? defaultValue : result;
  }

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
    path = castPath(path, object);

    var index = -1,
        length = path.length,
        result = false;

    while (++index < length) {
      var key = toKey(path[index]);
      if (!(result = object != null && hasFunc(object, key))) {
        break;
      }
      object = object[key];
    }
    if (result || ++index != length) {
      return result;
    }
    length = object == null ? 0 : object.length;
    return !!length && isLength(length) && isIndex(key, length) &&
      (isArray(object) || isArguments(object));
  }

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
    return object != null && hasPath(object, path, baseHasIn);
  }

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
    if (isKey(path) && isStrictComparable(srcValue)) {
      return matchesStrictComparable(toKey(path), srcValue);
    }
    return function(object) {
      var objValue = get(object, path);
      return (objValue === undefined && objValue === srcValue)
        ? hasIn(object, path)
        : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$5 | COMPARE_UNORDERED_FLAG$3);
    };
  }

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

  /**
   * The base implementation of `_.property` without support for deep paths.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @returns {Function} Returns the new accessor function.
   */
  function baseProperty(key) {
    return function(object) {
      return object == null ? undefined : object[key];
    };
  }

  /**
   * A specialized version of `baseProperty` which supports deep paths.
   *
   * @private
   * @param {Array|string} path The path of the property to get.
   * @returns {Function} Returns the new accessor function.
   */
  function basePropertyDeep(path) {
    return function(object) {
      return baseGet(object, path);
    };
  }

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
    return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
  }

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
      return identity;
    }
    if (typeof value == 'object') {
      return isArray(value)
        ? baseMatchesProperty(value[0], value[1])
        : baseMatches(value);
    }
    return property(value);
  }

  /**
   * Creates a base function for methods like `_.forIn` and `_.forOwn`.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseFor(fromRight) {
    return function(object, iteratee, keysFunc) {
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
  var baseFor = createBaseFor();

  /**
   * The base implementation of `_.forOwn` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Object} Returns `object`.
   */
  function baseForOwn(object, iteratee) {
    return object && baseFor(object, iteratee, keys);
  }

  /**
   * Creates a `baseEach` or `baseEachRight` function.
   *
   * @private
   * @param {Function} eachFunc The function to iterate over a collection.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseEach(eachFunc, fromRight) {
    return function(collection, iteratee) {
      if (collection == null) {
        return collection;
      }
      if (!isArrayLike(collection)) {
        return eachFunc(collection, iteratee);
      }
      var length = collection.length,
          index = fromRight ? length : -1,
          iterable = Object(collection);

      while ((fromRight ? index-- : ++index < length)) {
        if (iteratee(iterable[index], index, iterable) === false) {
          break;
        }
      }
      return collection;
    };
  }

  /**
   * The base implementation of `_.forEach` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array|Object} Returns `collection`.
   */
  var baseEach = createBaseEach(baseForOwn);

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
        result = isArrayLike(collection) ? Array(collection.length) : [];

    baseEach(collection, function(value, key, collection) {
      result[++index] = iteratee(value, key, collection);
    });
    return result;
  }

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
    var func = isArray(collection) ? arrayMap : baseMap;
    return func(collection, baseIteratee(iteratee, 3));
  }

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
    baseEach(collection, function(value, index, collection) {
      if (predicate(value, index, collection)) {
        result.push(value);
      }
    });
    return result;
  }

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
  function filter(collection, predicate) {
    var func = isArray(collection) ? arrayFilter : baseFilter;
    return func(collection, baseIteratee(predicate, 3));
  }

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

    while ((fromRight ? index-- : ++index < length)) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }
    return -1;
  }

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
    return value === value
      ? strictIndexOf(array, value, fromIndex)
      : baseFindIndex(array, baseIsNaN, fromIndex);
  }

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
    return !!length && baseIndexOf(array, value, 0) > -1;
  }

  /**
   * This function is like `arrayIncludes` except that it accepts a comparator.
   *
   * @private
   * @param {Array} [array] The array to inspect.
   * @param {*} target The value to search for.
   * @param {Function} comparator The comparator invoked per element.
   * @returns {boolean} Returns `true` if `target` is found, else `false`.
   */
  function arrayIncludesWith(array, value, comparator) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (comparator(value, array[index])) {
        return true;
      }
    }
    return false;
  }

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMin = Math.min;

  /**
   * The base implementation of methods like `_.intersection`, without support
   * for iteratee shorthands, that accepts an array of arrays to inspect.
   *
   * @private
   * @param {Array} arrays The arrays to inspect.
   * @param {Function} [iteratee] The iteratee invoked per element.
   * @param {Function} [comparator] The comparator invoked per element.
   * @returns {Array} Returns the new array of shared values.
   */
  function baseIntersection(arrays, iteratee, comparator) {
    var includes = comparator ? arrayIncludesWith : arrayIncludes,
        length = arrays[0].length,
        othLength = arrays.length,
        othIndex = othLength,
        caches = Array(othLength),
        maxLength = Infinity,
        result = [];

    while (othIndex--) {
      var array = arrays[othIndex];
      if (othIndex && iteratee) {
        array = arrayMap(array, baseUnary(iteratee));
      }
      maxLength = nativeMin(array.length, maxLength);
      caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120))
        ? new SetCache(othIndex && array)
        : undefined;
    }
    array = arrays[0];

    var index = -1,
        seen = caches[0];

    outer:
    while (++index < length && result.length < maxLength) {
      var value = array[index],
          computed = iteratee ? iteratee(value) : value;

      value = (comparator || value !== 0) ? value : 0;
      if (!(seen
            ? cacheHas(seen, computed)
            : includes(result, computed, comparator)
          )) {
        othIndex = othLength;
        while (--othIndex) {
          var cache = caches[othIndex];
          if (!(cache
                ? cacheHas(cache, computed)
                : includes(arrays[othIndex], computed, comparator))
              ) {
            continue outer;
          }
        }
        if (seen) {
          seen.push(computed);
        }
        result.push(value);
      }
    }
    return result;
  }

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
      case 0: return func.call(thisArg);
      case 1: return func.call(thisArg, args[0]);
      case 2: return func.call(thisArg, args[0], args[1]);
      case 3: return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }

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
    start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
    return function() {
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
      return apply(func, this, otherArgs);
    };
  }

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
    return function() {
      return value;
    };
  }

  var defineProperty = (function() {
    try {
      var func = getNative(Object, 'defineProperty');
      func({}, '', {});
      return func;
    } catch (e) {}
  }());

  /**
   * The base implementation of `setToString` without support for hot loop shorting.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  var baseSetToString = !defineProperty ? identity : function(func, string) {
    return defineProperty(func, 'toString', {
      'configurable': true,
      'enumerable': false,
      'value': constant(string),
      'writable': true
    });
  };

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

    return function() {
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

  /**
   * Sets the `toString` method of `func` to return `string`.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  var setToString = shortOut(baseSetToString);

  /**
   * The base implementation of `_.rest` which doesn't validate or coerce arguments.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @returns {Function} Returns the new function.
   */
  function baseRest(func, start) {
    return setToString(overRest(func, start, identity), func + '');
  }

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
    return isObjectLike(value) && isArrayLike(value);
  }

  /**
   * Casts `value` to an empty array if it's not an array like object.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {Array|Object} Returns the cast array-like object.
   */
  function castArrayLikeObject(value) {
    return isArrayLikeObject(value) ? value : [];
  }

  /**
   * Creates an array of unique values that are included in all given arrays
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons. The order and references of result values are
   * determined by the first array.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Array
   * @param {...Array} [arrays] The arrays to inspect.
   * @returns {Array} Returns the new array of intersecting values.
   * @example
   *
   * _.intersection([2, 1], [2, 3]);
   * // => [2]
   */
  var intersection = baseRest(function(arrays) {
    var mapped = arrayMap(arrays, castArrayLikeObject);
    return (mapped.length && mapped[0] === arrays[0])
      ? baseIntersection(mapped)
      : [];
  });

  var ALIASES = {
    'street': ['street_number', 'route', 'intersection'],
    'city': ['locality'],
    'state': ['administrative_area_level_1'],
    'zip': ['postal_code'],
    'zipcode': ['postal_code'],
    'county': ['administrative_area_level_2']
  };

  function extract(type, geocoder) {
    var types = ALIASES[type] || (isArray(type) ? type : [type]);
    var values = filter(map(geocoder.address_components, function (component) {
      if (intersection(component.types, types).length) {
        return component.long_name;
      }
    }));
    return values.length ? values.join(' ') : null;
  }

  var PlaceAutofill = {
    bind: function bind(el, binding, vnode) {
      vnode.componentInstance.$on('select', function (place, geocoder) {
        var values = filter(map(binding.modifiers, function (value, modifier) {
          return extract(modifier, geocoder);
        }));
        vnode.context[binding.expression] = values.length ? values.join(' ') : null;
      });
    }
  };

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

  /**
   * Casts `value` to `identity` if it's not a function.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {Function} Returns cast function.
   */
  function castFunction(value) {
    return typeof value == 'function' ? value : identity;
  }

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
    var func = isArray(collection) ? arrayEach : baseEach;
    return func(collection, castFunction(iteratee));
  }

  /** Error message constants. */
  var FUNC_ERROR_TEXT$1 = 'Expected a function';

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
      throw new TypeError(FUNC_ERROR_TEXT$1);
    }
    return function() {
      var args = arguments;
      switch (args.length) {
        case 0: return !predicate.call(this);
        case 1: return !predicate.call(this, args[0]);
        case 2: return !predicate.call(this, args[0], args[1]);
        case 3: return !predicate.call(this, args[0], args[1], args[2]);
      }
      return !predicate.apply(this, args);
    };
  }

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
    if (key == '__proto__' && defineProperty) {
      defineProperty(object, key, {
        'configurable': true,
        'enumerable': true,
        'value': value,
        'writable': true
      });
    } else {
      object[key] = value;
    }
  }

  /** Used for built-in method references. */
  var objectProto$12 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$9 = objectProto$12.hasOwnProperty;

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
    if (!(hasOwnProperty$9.call(object, key) && eq(objValue, value)) ||
        (value === undefined && !(key in object))) {
      baseAssignValue(object, key, value);
    }
  }

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
    if (!isObject(object)) {
      return object;
    }
    path = castPath(path, object);

    var index = -1,
        length = path.length,
        lastIndex = length - 1,
        nested = object;

    while (nested != null && ++index < length) {
      var key = toKey(path[index]),
          newValue = value;

      if (index != lastIndex) {
        var objValue = nested[key];
        newValue = customizer ? customizer(objValue, key, nested) : undefined;
        if (newValue === undefined) {
          newValue = isObject(objValue)
            ? objValue
            : (isIndex(path[index + 1]) ? [] : {});
        }
      }
      assignValue(nested, key, newValue);
      nested = nested[key];
    }
    return object;
  }

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
          value = baseGet(object, path);

      if (predicate(value, path)) {
        baseSet(result, castPath(path, object), value);
      }
    }
    return result;
  }

  /** Built-in value references. */
  var getPrototype = overArg(Object.getPrototypeOf, Object);

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

  /**
   * Creates an array of the own and inherited enumerable symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of symbols.
   */
  var getSymbolsIn = !nativeGetSymbols$1 ? stubArray : function(object) {
    var result = [];
    while (object) {
      arrayPush(result, getSymbols(object));
      object = getPrototype(object);
    }
    return result;
  };

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

  /** Used for built-in method references. */
  var objectProto$13 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$10 = objectProto$13.hasOwnProperty;

  /**
   * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeysIn(object) {
    if (!isObject(object)) {
      return nativeKeysIn(object);
    }
    var isProto = isPrototype(object),
        result = [];

    for (var key in object) {
      if (!(key == 'constructor' && (isProto || !hasOwnProperty$10.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }

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
  function keysIn(object) {
    return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
  }

  /**
   * Creates an array of own and inherited enumerable property names and
   * symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function getAllKeysIn(object) {
    return baseGetAllKeys(object, keysIn, getSymbolsIn);
  }

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
    var props = arrayMap(getAllKeysIn(object), function(prop) {
      return [prop];
    });
    predicate = baseIteratee(predicate);
    return basePickBy(object, props, function(value, path) {
      return predicate(value, path[0]);
    });
  }

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
    return pickBy(object, negate(baseIteratee(predicate)));
  }

  /** `Object#toString` result references. */
  var mapTag$3 = '[object Map]',
      setTag$3 = '[object Set]';

  /** Used for built-in method references. */
  var objectProto$14 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$11 = objectProto$14.hasOwnProperty;

  /**
   * Checks if `value` is an empty object, collection, map, or set.
   *
   * Objects are considered empty if they have no own enumerable string keyed
   * properties.
   *
   * Array-like values such as `arguments` objects, arrays, buffers, strings, or
   * jQuery-like collections are considered empty if they have a `length` of `0`.
   * Similarly, maps and sets are considered empty if they have a `size` of `0`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is empty, else `false`.
   * @example
   *
   * _.isEmpty(null);
   * // => true
   *
   * _.isEmpty(true);
   * // => true
   *
   * _.isEmpty(1);
   * // => true
   *
   * _.isEmpty([1, 2, 3]);
   * // => false
   *
   * _.isEmpty({ 'a': 1 });
   * // => false
   */
  function isEmpty(value) {
    if (value == null) {
      return true;
    }
    if (isArrayLike(value) &&
        (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
          isBuffer(value) || isTypedArray(value) || isArguments(value))) {
      return !value.length;
    }
    var tag = getTag$1(value);
    if (tag == mapTag$3 || tag == setTag$3) {
      return !value.size;
    }
    if (isPrototype(value)) {
      return !baseKeys(value).length;
    }
    for (var key in value) {
      if (hasOwnProperty$11.call(value, key)) {
        return false;
      }
    }
    return true;
  }

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

  var PlaceAutocompleteList = {
    render: function render() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "autocomplete-list-wrapper"
      }, [_c('ul', {
        staticClass: "autocomplete-list"
      }, _vm._l(_vm.items, function (item, i) {
        return _c('place-autocomplete-list-item', {
          key: item.id,
          attrs: {
            "item": item
          },
          on: {
            "click": _vm.onClick,
            "focus": _vm.onFocus,
            "blur": _vm.onBlur
          }
        }, [_vm._v(" " + _vm._s(item[_vm.display]) + " ")]);
      }))]);
    },
    staticRenderFns: [],
    name: 'place-autocomplete-list',
    props: {
      'items': {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      'display': {
        type: String,
        default: 'description'
      }
    },
    methods: {
      onBlur: function onBlur(event, item) {
        this.$emit('item:blur', event, item);
      },
      onFocus: function onFocus(event, item) {
        this.$emit('item:focus', event, item);
      },
      onClick: function onClick(event, item) {
        this.$emit('item:click', event, item);
      }
    }
  };

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

  /**
   * A specialized version of `_.forEach` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEach$1(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }

    return array;
  }

  /**
   * Creates a base function for methods like `_.forIn` and `_.forOwn`.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseFor$1(fromRight) {
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

  var baseFor$1 = createBaseFor$1();

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes$1(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }

    return result;
  }

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

  /** Detect free variable `global` from Node.js. */
  var freeGlobal$1 = (typeof global$1 === "undefined" ? "undefined" : _typeof(global$1)) == 'object' && global$1 && global$1.Object === Object && global$1;

  /** Detect free variable `self`. */

  var freeSelf$1 = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self && self.Object === Object && self;
  /** Used as a reference to the global object. */

  var root$1 = freeGlobal$1 || freeSelf$1 || Function('return this')();

  /** Built-in value references. */

  var _Symbol = root$1.Symbol;

  /** Used for built-in method references. */

  var objectProto$15 = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$12 = objectProto$15.hasOwnProperty;
  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */

  var nativeObjectToString$2 = objectProto$15.toString;
  /** Built-in value references. */

  var symToStringTag$2 = _Symbol ? _Symbol.toStringTag : undefined;
  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */

  function getRawTag$1(value) {
    var isOwn = hasOwnProperty$12.call(value, symToStringTag$2),
        tag = value[symToStringTag$2];

    try {
      value[symToStringTag$2] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString$2.call(value);

    if (unmasked) {
      if (isOwn) {
        value[symToStringTag$2] = tag;
      } else {
        delete value[symToStringTag$2];
      }
    }

    return result;
  }

  /** Used for built-in method references. */
  var objectProto$16 = Object.prototype;
  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */

  var nativeObjectToString$3 = objectProto$16.toString;
  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */

  function objectToString$1(value) {
    return nativeObjectToString$3.call(value);
  }

  /** `Object#toString` result references. */

  var nullTag$1 = '[object Null]',
      undefinedTag$1 = '[object Undefined]';
  /** Built-in value references. */

  var symToStringTag$3 = _Symbol ? _Symbol.toStringTag : undefined;
  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */

  function baseGetTag$1(value) {
    if (value == null) {
      return value === undefined ? undefinedTag$1 : nullTag$1;
    }

    return symToStringTag$3 && symToStringTag$3 in Object(value) ? getRawTag$1(value) : objectToString$1(value);
  }

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
  function isObjectLike$1(value) {
    return value != null && _typeof(value) == 'object';
  }

  /** `Object#toString` result references. */

  var argsTag$3 = '[object Arguments]';
  /**
   * The base implementation of `_.isArguments`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   */

  function baseIsArguments$1(value) {
    return isObjectLike$1(value) && baseGetTag$1(value) == argsTag$3;
  }

  /** Used for built-in method references. */

  var objectProto$17 = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$13 = objectProto$17.hasOwnProperty;
  /** Built-in value references. */

  var propertyIsEnumerable$2 = objectProto$17.propertyIsEnumerable;
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

  var isArguments$1 = baseIsArguments$1(function () {
    return arguments;
  }()) ? baseIsArguments$1 : function (value) {
    return isObjectLike$1(value) && hasOwnProperty$13.call(value, 'callee') && !propertyIsEnumerable$2.call(value, 'callee');
  };

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
  var isArray$1 = Array.isArray;

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
  function stubFalse$1() {
    return false;
  }

  /** Detect free variable `exports`. */

  var freeExports$2 = (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;
  /** Detect free variable `module`. */

  var freeModule$2 = freeExports$2 && (typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module && !module.nodeType && module;
  /** Detect the popular CommonJS extension `module.exports`. */

  var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;
  /** Built-in value references. */

  var Buffer$1 = moduleExports$2 ? root$1.Buffer : undefined;
  /* Built-in method references for those with the same name as other `lodash` methods. */

  var nativeIsBuffer$1 = Buffer$1 ? Buffer$1.isBuffer : undefined;
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

  var isBuffer$1 = nativeIsBuffer$1 || stubFalse$1;

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER$2 = 9007199254740991;
  /** Used to detect unsigned integer values. */

  var reIsUint$1 = /^(?:0|[1-9]\d*)$/;
  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */

  function isIndex$1(value, length) {
    var type = _typeof(value);

    length = length == null ? MAX_SAFE_INTEGER$2 : length;
    return !!length && (type == 'number' || type != 'symbol' && reIsUint$1.test(value)) && value > -1 && value % 1 == 0 && value < length;
  }

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER$3 = 9007199254740991;
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

  function isLength$1(value) {
    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$3;
  }

  /** `Object#toString` result references. */

  var argsTag$4 = '[object Arguments]',
      arrayTag$2 = '[object Array]',
      boolTag$2 = '[object Boolean]',
      dateTag$2 = '[object Date]',
      errorTag$2 = '[object Error]',
      funcTag$2 = '[object Function]',
      mapTag$4 = '[object Map]',
      numberTag$2 = '[object Number]',
      objectTag$3 = '[object Object]',
      regexpTag$2 = '[object RegExp]',
      setTag$4 = '[object Set]',
      stringTag$2 = '[object String]',
      weakMapTag$2 = '[object WeakMap]';
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
  /** Used to identify `toStringTag` values of typed arrays. */

  var typedArrayTags$1 = {};
  typedArrayTags$1[float32Tag$1] = typedArrayTags$1[float64Tag$1] = typedArrayTags$1[int8Tag$1] = typedArrayTags$1[int16Tag$1] = typedArrayTags$1[int32Tag$1] = typedArrayTags$1[uint8Tag$1] = typedArrayTags$1[uint8ClampedTag$1] = typedArrayTags$1[uint16Tag$1] = typedArrayTags$1[uint32Tag$1] = true;
  typedArrayTags$1[argsTag$4] = typedArrayTags$1[arrayTag$2] = typedArrayTags$1[arrayBufferTag$2] = typedArrayTags$1[boolTag$2] = typedArrayTags$1[dataViewTag$3] = typedArrayTags$1[dateTag$2] = typedArrayTags$1[errorTag$2] = typedArrayTags$1[funcTag$2] = typedArrayTags$1[mapTag$4] = typedArrayTags$1[numberTag$2] = typedArrayTags$1[objectTag$3] = typedArrayTags$1[regexpTag$2] = typedArrayTags$1[setTag$4] = typedArrayTags$1[stringTag$2] = typedArrayTags$1[weakMapTag$2] = false;
  /**
   * The base implementation of `_.isTypedArray` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   */

  function baseIsTypedArray$1(value) {
    return isObjectLike$1(value) && isLength$1(value.length) && !!typedArrayTags$1[baseGetTag$1(value)];
  }

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary$1(func) {
    return function (value) {
      return func(value);
    };
  }

  /** Detect free variable `exports`. */

  var freeExports$3 = (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;
  /** Detect free variable `module`. */

  var freeModule$3 = freeExports$3 && (typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module && !module.nodeType && module;
  /** Detect the popular CommonJS extension `module.exports`. */

  var moduleExports$3 = freeModule$3 && freeModule$3.exports === freeExports$3;
  /** Detect free variable `process` from Node.js. */

  var freeProcess$1 = moduleExports$3 && freeGlobal$1.process;
  /** Used to access faster Node.js helpers. */

  var nodeUtil$1 = function () {
    try {
      return freeProcess$1 && freeProcess$1.binding && freeProcess$1.binding('util');
    } catch (e) {}
  }();

  /* Node.js helper references. */

  var nodeIsTypedArray$1 = nodeUtil$1 && nodeUtil$1.isTypedArray;
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

  var isTypedArray$1 = nodeIsTypedArray$1 ? baseUnary$1(nodeIsTypedArray$1) : baseIsTypedArray$1;

  /** Used for built-in method references. */

  var objectProto$18 = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$14 = objectProto$18.hasOwnProperty;
  /**
   * Creates an array of the enumerable property names of the array-like `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @param {boolean} inherited Specify returning inherited property names.
   * @returns {Array} Returns the array of property names.
   */

  function arrayLikeKeys$1(value, inherited) {
    var isArr = isArray$1(value),
        isArg = !isArr && isArguments$1(value),
        isBuff = !isArr && !isArg && isBuffer$1(value),
        isType = !isArr && !isArg && !isBuff && isTypedArray$1(value),
        skipIndexes = isArr || isArg || isBuff || isType,
        result = skipIndexes ? baseTimes$1(value.length, String) : [],
        length = result.length;

    for (var key in value) {
      if ((inherited || hasOwnProperty$14.call(value, key)) && !(skipIndexes && ( // Safari 9 has enumerable `arguments.length` in strict mode.
      key == 'length' || // Node.js 0.10 has enumerable non-index properties on buffers.
      isBuff && (key == 'offset' || key == 'parent') || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') || // Skip index properties.
      isIndex$1(key, length)))) {
        result.push(key);
      }
    }

    return result;
  }

  /** Used for built-in method references. */
  var objectProto$19 = Object.prototype;
  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */

  function isPrototype$1(value) {
    var Ctor = value && value.constructor,
        proto = typeof Ctor == 'function' && Ctor.prototype || objectProto$19;
    return value === proto;
  }

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg$1(func, transform) {
    return function (arg) {
      return func(transform(arg));
    };
  }

  /* Built-in method references for those with the same name as other `lodash` methods. */

  var nativeKeys$1 = overArg$1(Object.keys, Object);

  /** Used for built-in method references. */

  var objectProto$20 = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$15 = objectProto$20.hasOwnProperty;
  /**
   * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */

  function baseKeys$1(object) {
    if (!isPrototype$1(object)) {
      return nativeKeys$1(object);
    }

    var result = [];

    for (var key in Object(object)) {
      if (hasOwnProperty$15.call(object, key) && key != 'constructor') {
        result.push(key);
      }
    }

    return result;
  }

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
  function isObject$1(value) {
    var type = _typeof(value);

    return value != null && (type == 'object' || type == 'function');
  }

  /** `Object#toString` result references. */

  var asyncTag$1 = '[object AsyncFunction]',
      funcTag$3 = '[object Function]',
      genTag$1 = '[object GeneratorFunction]',
      proxyTag$1 = '[object Proxy]';
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
    if (!isObject$1(value)) {
      return false;
    } // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.


    var tag = baseGetTag$1(value);
    return tag == funcTag$3 || tag == genTag$1 || tag == asyncTag$1 || tag == proxyTag$1;
  }

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

  function isArrayLike$1(value) {
    return value != null && isLength$1(value.length) && !isFunction$1(value);
  }

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

  function keys$1(object) {
    return isArrayLike$1(object) ? arrayLikeKeys$1(object) : baseKeys$1(object);
  }

  /**
   * The base implementation of `_.forOwn` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Object} Returns `object`.
   */

  function baseForOwn$1(object, iteratee) {
    return object && baseFor$1(object, iteratee, keys$1);
  }

  /**
   * Creates a `baseEach` or `baseEachRight` function.
   *
   * @private
   * @param {Function} eachFunc The function to iterate over a collection.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */

  function createBaseEach$1(eachFunc, fromRight) {
    return function (collection, iteratee) {
      if (collection == null) {
        return collection;
      }

      if (!isArrayLike$1(collection)) {
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

  /**
   * The base implementation of `_.forEach` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array|Object} Returns `collection`.
   */

  var baseEach$1 = createBaseEach$1(baseForOwn$1);

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
  function identity$1(value) {
    return value;
  }

  /**
   * Casts `value` to `identity` if it's not a function.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {Function} Returns cast function.
   */

  function castFunction$1(value) {
    return typeof value == 'function' ? value : identity$1;
  }

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

  function forEach$1(collection, iteratee) {
    var func = isArray$1(collection) ? arrayEach$1 : baseEach$1;
    return func(collection, castFunction$1(iteratee));
  }

  var VueInstaller = {
    use: use,
    script: script,
    plugin: plugin,
    plugins: plugins,
    filter: filter$1,
    filters: filters,
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
  function plugins(Vue, plugins) {
    forEach$1(plugins, function (def, name) {
      plugin(Vue, name, def);
    });
  }
  function filter$1(Vue, name, def) {
    if (!VueInstaller.$filters[name]) {
      Vue.use(VueInstaller.$filters[name] = def);
    }
  }
  function filters(Vue, filters) {
    forEach$1(filters, function (def, name) {
      filter$1(Vue, name, def);
    });
  }
  function component(Vue, name, def) {
    if (!VueInstaller.$components[name]) {
      Vue.component(name, VueInstaller.$components[name] = def);
    }
  }
  function components(Vue, components) {
    forEach$1(components, function (def, name) {
      component(Vue, name, def);
    });
  }
  function directive(Vue, name, def) {
    if (!VueInstaller.$directives[name]) {
      if (isFunction$1(def)) {
        Vue.use(VueInstaller.$directives[name] = def);
      } else {
        Vue.directive(name, def);
      }
    }
  }
  function directives(Vue, directives) {
    forEach$1(directives, function (def, name) {
      directive(Vue, name, def);
    });
  }

  var plugin$1 = VueInstaller.use({
    install: function install(Vue, options) {
      VueInstaller.components({
        FormGroup: FormGroup
      });
    }
  });

  /** Used to detect overreaching core-js shims. */

  var coreJsData$1 = root$1['__core-js_shared__'];

  /** Used to detect methods masquerading as native. */

  var maskSrcKey$1 = function () {
    var uid = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || '');
    return uid ? 'Symbol(src)_1.' + uid : '';
  }();
  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */


  function isMasked$1(func) {
    return !!maskSrcKey$1 && maskSrcKey$1 in func;
  }

  /** Used for built-in method references. */
  var funcProto$2 = Function.prototype;
  /** Used to resolve the decompiled source of functions. */

  var funcToString$2 = funcProto$2.toString;
  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to convert.
   * @returns {string} Returns the source code.
   */

  function toSource$1(func) {
    if (func != null) {
      try {
        return funcToString$2.call(func);
      } catch (e) {}

      try {
        return func + '';
      } catch (e) {}
    }

    return '';
  }

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */

  var reRegExpChar$1 = /[\\^$.*+?()[\]{}|]/g;
  /** Used to detect host constructors (Safari). */

  var reIsHostCtor$1 = /^\[object .+?Constructor\]$/;
  /** Used for built-in method references. */

  var funcProto$3 = Function.prototype,
      objectProto$21 = Object.prototype;
  /** Used to resolve the decompiled source of functions. */

  var funcToString$3 = funcProto$3.toString;
  /** Used to check objects for own properties. */

  var hasOwnProperty$16 = objectProto$21.hasOwnProperty;
  /** Used to detect if a method is native. */

  var reIsNative$1 = RegExp('^' + funcToString$3.call(hasOwnProperty$16).replace(reRegExpChar$1, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */

  function baseIsNative$1(value) {
    if (!isObject$1(value) || isMasked$1(value)) {
      return false;
    }

    var pattern = isFunction$1(value) ? reIsNative$1 : reIsHostCtor$1;
    return pattern.test(toSource$1(value));
  }

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue$1(object, key) {
    return object == null ? undefined : object[key];
  }

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */

  function getNative$1(object, key) {
    var value = getValue$1(object, key);
    return baseIsNative$1(value) ? value : undefined;
  }

  var defineProperty$1 = function () {
    try {
      var func = getNative$1(Object, 'defineProperty');
      func({}, '', {});
      return func;
    } catch (e) {}
  }();

  /**
   * The base implementation of `assignValue` and `assignMergeValue` without
   * value checks.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */

  function baseAssignValue$1(object, key, value) {
    if (key == '__proto__' && defineProperty$1) {
      defineProperty$1(object, key, {
        'configurable': true,
        'enumerable': true,
        'value': value,
        'writable': true
      });
    } else {
      object[key] = value;
    }
  }

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
  function eq$1(value, other) {
    return value === other || value !== value && other !== other;
  }

  /** Used for built-in method references. */

  var objectProto$22 = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$17 = objectProto$22.hasOwnProperty;
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

  function assignValue$1(object, key, value) {
    var objValue = object[key];

    if (!(hasOwnProperty$17.call(object, key) && eq$1(objValue, value)) || value === undefined && !(key in object)) {
      baseAssignValue$1(object, key, value);
    }
  }

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
        baseAssignValue$1(object, key, newValue);
      } else {
        assignValue$1(object, key, newValue);
      }
    }

    return object;
  }

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
  function apply$1(func, thisArg, args) {
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

  /* Built-in method references for those with the same name as other `lodash` methods. */

  var nativeMax$1 = Math.max;
  /**
   * A specialized version of `baseRest` which transforms the rest array.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @param {Function} transform The rest array transform.
   * @returns {Function} Returns the new function.
   */

  function overRest$1(func, start, transform) {
    start = nativeMax$1(start === undefined ? func.length - 1 : start, 0);
    return function () {
      var args = arguments,
          index = -1,
          length = nativeMax$1(args.length - start, 0),
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
      return apply$1(func, this, otherArgs);
    };
  }

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
  function constant$1(value) {
    return function () {
      return value;
    };
  }

  /**
   * The base implementation of `setToString` without support for hot loop shorting.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */

  var baseSetToString$1 = !defineProperty$1 ? identity$1 : function (func, string) {
    return defineProperty$1(func, 'toString', {
      'configurable': true,
      'enumerable': false,
      'value': constant$1(string),
      'writable': true
    });
  };

  /** Used to detect hot functions by number of calls within a span of milliseconds. */
  var HOT_COUNT$1 = 800,
      HOT_SPAN$1 = 16;
  /* Built-in method references for those with the same name as other `lodash` methods. */

  var nativeNow$1 = Date.now;
  /**
   * Creates a function that'll short out and invoke `identity` instead
   * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
   * milliseconds.
   *
   * @private
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new shortable function.
   */

  function shortOut$1(func) {
    var count = 0,
        lastCalled = 0;
    return function () {
      var stamp = nativeNow$1(),
          remaining = HOT_SPAN$1 - (stamp - lastCalled);
      lastCalled = stamp;

      if (remaining > 0) {
        if (++count >= HOT_COUNT$1) {
          return arguments[0];
        }
      } else {
        count = 0;
      }

      return func.apply(undefined, arguments);
    };
  }

  /**
   * Sets the `toString` method of `func` to return `string`.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */

  var setToString$1 = shortOut$1(baseSetToString$1);

  /**
   * The base implementation of `_.rest` which doesn't validate or coerce arguments.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @returns {Function} Returns the new function.
   */

  function baseRest$1(func, start) {
    return setToString$1(overRest$1(func, start, identity$1), func + '');
  }

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
    if (!isObject$1(object)) {
      return false;
    }

    var type = _typeof(index);

    if (type == 'number' ? isArrayLike$1(object) && isIndex$1(index, object.length) : type == 'string' && index in object) {
      return eq$1(object[index], value);
    }

    return false;
  }

  /**
   * Creates a function like `_.assign`.
   *
   * @private
   * @param {Function} assigner The function to assign values.
   * @returns {Function} Returns the new assigner function.
   */

  function createAssigner(assigner) {
    return baseRest$1(function (object, sources) {
      var index = -1,
          length = sources.length,
          customizer = length > 1 ? sources[length - 1] : undefined,
          guard = length > 2 ? sources[2] : undefined;
      customizer = assigner.length > 3 && typeof customizer == 'function' ? (length--, customizer) : undefined;

      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
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

  /**
   * This function is like
   * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * except that it includes inherited enumerable properties.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function nativeKeysIn$1(object) {
    var result = [];

    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }

    return result;
  }

  /** Used for built-in method references. */

  var objectProto$23 = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$18 = objectProto$23.hasOwnProperty;
  /**
   * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */

  function baseKeysIn$1(object) {
    if (!isObject$1(object)) {
      return nativeKeysIn$1(object);
    }

    var isProto = isPrototype$1(object),
        result = [];

    for (var key in object) {
      if (!(key == 'constructor' && (isProto || !hasOwnProperty$18.call(object, key)))) {
        result.push(key);
      }
    }

    return result;
  }

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
    return isArrayLike$1(object) ? arrayLikeKeys$1(object, true) : baseKeysIn$1(object);
  }

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

  var assignIn = createAssigner(function (object, source) {
    copyObject(source, keysIn$1(source), object);
  });

  /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function arrayMap$1(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }

    return result;
  }

  /**
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */
  function listCacheClear$1() {
    this.__data__ = [];
    this.size = 0;
  }

  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */

  function assocIndexOf$1(array, key) {
    var length = array.length;

    while (length--) {
      if (eq$1(array[length][0], key)) {
        return length;
      }
    }

    return -1;
  }

  /** Used for built-in method references. */

  var arrayProto$1 = Array.prototype;
  /** Built-in value references. */

  var splice$1 = arrayProto$1.splice;
  /**
   * Removes `key` and its value from the list cache.
   *
   * @private
   * @name delete
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */

  function listCacheDelete$1(key) {
    var data = this.__data__,
        index = assocIndexOf$1(data, key);

    if (index < 0) {
      return false;
    }

    var lastIndex = data.length - 1;

    if (index == lastIndex) {
      data.pop();
    } else {
      splice$1.call(data, index, 1);
    }

    --this.size;
    return true;
  }

  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */

  function listCacheGet$1(key) {
    var data = this.__data__,
        index = assocIndexOf$1(data, key);
    return index < 0 ? undefined : data[index][1];
  }

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */

  function listCacheHas$1(key) {
    return assocIndexOf$1(this.__data__, key) > -1;
  }

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

  function listCacheSet$1(key, value) {
    var data = this.__data__,
        index = assocIndexOf$1(data, key);

    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }

    return this;
  }

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */

  function ListCache$1(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;
    this.clear();

    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  } // Add methods to `ListCache`.


  ListCache$1.prototype.clear = listCacheClear$1;
  ListCache$1.prototype['delete'] = listCacheDelete$1;
  ListCache$1.prototype.get = listCacheGet$1;
  ListCache$1.prototype.has = listCacheHas$1;
  ListCache$1.prototype.set = listCacheSet$1;

  /**
   * Removes all key-value entries from the stack.
   *
   * @private
   * @name clear
   * @memberOf Stack
   */

  function stackClear$1() {
    this.__data__ = new ListCache$1();
    this.size = 0;
  }

  /**
   * Removes `key` and its value from the stack.
   *
   * @private
   * @name delete
   * @memberOf Stack
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function stackDelete$1(key) {
    var data = this.__data__,
        result = data['delete'](key);
    this.size = data.size;
    return result;
  }

  /**
   * Gets the stack value for `key`.
   *
   * @private
   * @name get
   * @memberOf Stack
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function stackGet$1(key) {
    return this.__data__.get(key);
  }

  /**
   * Checks if a stack value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Stack
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function stackHas$1(key) {
    return this.__data__.has(key);
  }

  /* Built-in method references that are verified to be native. */

  var Map$2 = getNative$1(root$1, 'Map');

  /* Built-in method references that are verified to be native. */

  var nativeCreate$1 = getNative$1(Object, 'create');

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */

  function hashClear$1() {
    this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {};
    this.size = 0;
  }

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
  function hashDelete$1(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }

  /** Used to stand-in for `undefined` hash values. */

  var HASH_UNDEFINED$3 = '__lodash_hash_undefined__';
  /** Used for built-in method references. */

  var objectProto$24 = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$19 = objectProto$24.hasOwnProperty;
  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */

  function hashGet$1(key) {
    var data = this.__data__;

    if (nativeCreate$1) {
      var result = data[key];
      return result === HASH_UNDEFINED$3 ? undefined : result;
    }

    return hasOwnProperty$19.call(data, key) ? data[key] : undefined;
  }

  /** Used for built-in method references. */

  var objectProto$25 = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$20 = objectProto$25.hasOwnProperty;
  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */

  function hashHas$1(key) {
    var data = this.__data__;
    return nativeCreate$1 ? data[key] !== undefined : hasOwnProperty$20.call(data, key);
  }

  /** Used to stand-in for `undefined` hash values. */

  var HASH_UNDEFINED$4 = '__lodash_hash_undefined__';
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

  function hashSet$1(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = nativeCreate$1 && value === undefined ? HASH_UNDEFINED$4 : value;
    return this;
  }

  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */

  function Hash$1(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;
    this.clear();

    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  } // Add methods to `Hash`.


  Hash$1.prototype.clear = hashClear$1;
  Hash$1.prototype['delete'] = hashDelete$1;
  Hash$1.prototype.get = hashGet$1;
  Hash$1.prototype.has = hashHas$1;
  Hash$1.prototype.set = hashSet$1;

  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */

  function mapCacheClear$1() {
    this.size = 0;
    this.__data__ = {
      'hash': new Hash$1(),
      'map': new (Map$2 || ListCache$1)(),
      'string': new Hash$1()
    };
  }

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */
  function isKeyable$1(value) {
    var type = _typeof(value);

    return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
  }

  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */

  function getMapData$1(map, key) {
    var data = map.__data__;
    return isKeyable$1(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
  }

  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */

  function mapCacheDelete$1(key) {
    var result = getMapData$1(this, key)['delete'](key);
    this.size -= result ? 1 : 0;
    return result;
  }

  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */

  function mapCacheGet$1(key) {
    return getMapData$1(this, key).get(key);
  }

  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */

  function mapCacheHas$1(key) {
    return getMapData$1(this, key).has(key);
  }

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

  function mapCacheSet$1(key, value) {
    var data = getMapData$1(this, key),
        size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */

  function MapCache$1(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;
    this.clear();

    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  } // Add methods to `MapCache`.


  MapCache$1.prototype.clear = mapCacheClear$1;
  MapCache$1.prototype['delete'] = mapCacheDelete$1;
  MapCache$1.prototype.get = mapCacheGet$1;
  MapCache$1.prototype.has = mapCacheHas$1;
  MapCache$1.prototype.set = mapCacheSet$1;

  /** Used as the size to enable large array optimizations. */

  var LARGE_ARRAY_SIZE$1 = 200;
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

  function stackSet$1(key, value) {
    var data = this.__data__;

    if (data instanceof ListCache$1) {
      var pairs = data.__data__;

      if (!Map$2 || pairs.length < LARGE_ARRAY_SIZE$1 - 1) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }

      data = this.__data__ = new MapCache$1(pairs);
    }

    data.set(key, value);
    this.size = data.size;
    return this;
  }

  /**
   * Creates a stack cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */

  function Stack$1(entries) {
    var data = this.__data__ = new ListCache$1(entries);
    this.size = data.size;
  } // Add methods to `Stack`.


  Stack$1.prototype.clear = stackClear$1;
  Stack$1.prototype['delete'] = stackDelete$1;
  Stack$1.prototype.get = stackGet$1;
  Stack$1.prototype.has = stackHas$1;
  Stack$1.prototype.set = stackSet$1;

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED$5 = '__lodash_hash_undefined__';
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

  function setCacheAdd$1(value) {
    this.__data__.set(value, HASH_UNDEFINED$5);

    return this;
  }

  /**
   * Checks if `value` is in the array cache.
   *
   * @private
   * @name has
   * @memberOf SetCache
   * @param {*} value The value to search for.
   * @returns {number} Returns `true` if `value` is found, else `false`.
   */
  function setCacheHas$1(value) {
    return this.__data__.has(value);
  }

  /**
   *
   * Creates an array cache object to store unique values.
   *
   * @private
   * @constructor
   * @param {Array} [values] The values to cache.
   */

  function SetCache$1(values) {
    var index = -1,
        length = values == null ? 0 : values.length;
    this.__data__ = new MapCache$1();

    while (++index < length) {
      this.add(values[index]);
    }
  } // Add methods to `SetCache`.


  SetCache$1.prototype.add = SetCache$1.prototype.push = setCacheAdd$1;
  SetCache$1.prototype.has = setCacheHas$1;

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
  function arraySome$1(array, predicate) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Checks if a `cache` value for `key` exists.
   *
   * @private
   * @param {Object} cache The cache to query.
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function cacheHas$1(cache, key) {
    return cache.has(key);
  }

  /** Used to compose bitmasks for value comparisons. */

  var COMPARE_PARTIAL_FLAG$6 = 1,
      COMPARE_UNORDERED_FLAG$4 = 2;
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

  function equalArrays$1(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG$6,
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
        seen = bitmask & COMPARE_UNORDERED_FLAG$4 ? new SetCache$1() : undefined;
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
        if (!arraySome$1(other, function (othValue, othIndex) {
          if (!cacheHas$1(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
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

  /** Built-in value references. */

  var Uint8Array$1 = root$1.Uint8Array;

  /**
   * Converts `map` to its key-value pairs.
   *
   * @private
   * @param {Object} map The map to convert.
   * @returns {Array} Returns the key-value pairs.
   */
  function mapToArray$1(map) {
    var index = -1,
        result = Array(map.size);
    map.forEach(function (value, key) {
      result[++index] = [key, value];
    });
    return result;
  }

  /**
   * Converts `set` to an array of its values.
   *
   * @private
   * @param {Object} set The set to convert.
   * @returns {Array} Returns the values.
   */
  function setToArray$1(set) {
    var index = -1,
        result = Array(set.size);
    set.forEach(function (value) {
      result[++index] = value;
    });
    return result;
  }

  /** Used to compose bitmasks for value comparisons. */

  var COMPARE_PARTIAL_FLAG$7 = 1,
      COMPARE_UNORDERED_FLAG$5 = 2;
  /** `Object#toString` result references. */

  var boolTag$3 = '[object Boolean]',
      dateTag$3 = '[object Date]',
      errorTag$3 = '[object Error]',
      mapTag$5 = '[object Map]',
      numberTag$3 = '[object Number]',
      regexpTag$3 = '[object RegExp]',
      setTag$5 = '[object Set]',
      stringTag$3 = '[object String]',
      symbolTag$2 = '[object Symbol]';
  var arrayBufferTag$3 = '[object ArrayBuffer]',
      dataViewTag$4 = '[object DataView]';
  /** Used to convert symbols to primitives and strings. */

  var symbolProto$2 = _Symbol ? _Symbol.prototype : undefined,
      symbolValueOf$1 = symbolProto$2 ? symbolProto$2.valueOf : undefined;
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

  function equalByTag$1(object, other, tag, bitmask, customizer, equalFunc, stack) {
    switch (tag) {
      case dataViewTag$4:
        if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
          return false;
        }

        object = object.buffer;
        other = other.buffer;

      case arrayBufferTag$3:
        if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array$1(object), new Uint8Array$1(other))) {
          return false;
        }

        return true;

      case boolTag$3:
      case dateTag$3:
      case numberTag$3:
        // Coerce booleans to `1` or `0` and dates to milliseconds.
        // Invalid dates are coerced to `NaN`.
        return eq$1(+object, +other);

      case errorTag$3:
        return object.name == other.name && object.message == other.message;

      case regexpTag$3:
      case stringTag$3:
        // Coerce regexes to strings and treat strings, primitives and objects,
        // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
        // for more details.
        return object == other + '';

      case mapTag$5:
        var convert = mapToArray$1;

      case setTag$5:
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG$7;
        convert || (convert = setToArray$1);

        if (object.size != other.size && !isPartial) {
          return false;
        } // Assume cyclic values are equal.


        var stacked = stack.get(object);

        if (stacked) {
          return stacked == other;
        }

        bitmask |= COMPARE_UNORDERED_FLAG$5; // Recursively compare objects (susceptible to call stack limits).

        stack.set(object, other);
        var result = equalArrays$1(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
        stack['delete'](object);
        return result;

      case symbolTag$2:
        if (symbolValueOf$1) {
          return symbolValueOf$1.call(object) == symbolValueOf$1.call(other);
        }

    }

    return false;
  }

  /**
   * Appends the elements of `values` to `array`.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {Array} values The values to append.
   * @returns {Array} Returns `array`.
   */
  function arrayPush$1(array, values) {
    var index = -1,
        length = values.length,
        offset = array.length;

    while (++index < length) {
      array[offset + index] = values[index];
    }

    return array;
  }

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

  function baseGetAllKeys$1(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray$1(object) ? result : arrayPush$1(result, symbolsFunc(object));
  }

  /**
   * A specialized version of `_.filter` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */
  function arrayFilter$1(array, predicate) {
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
  function stubArray$1() {
    return [];
  }

  /** Used for built-in method references. */

  var objectProto$26 = Object.prototype;
  /** Built-in value references. */

  var propertyIsEnumerable$3 = objectProto$26.propertyIsEnumerable;
  /* Built-in method references for those with the same name as other `lodash` methods. */

  var nativeGetSymbols$2 = Object.getOwnPropertySymbols;
  /**
   * Creates an array of the own enumerable symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of symbols.
   */

  var getSymbols$1 = !nativeGetSymbols$2 ? stubArray$1 : function (object) {
    if (object == null) {
      return [];
    }

    object = Object(object);
    return arrayFilter$1(nativeGetSymbols$2(object), function (symbol) {
      return propertyIsEnumerable$3.call(object, symbol);
    });
  };

  /**
   * Creates an array of own enumerable property names and symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names and symbols.
   */

  function getAllKeys$1(object) {
    return baseGetAllKeys$1(object, keys$1, getSymbols$1);
  }

  /** Used to compose bitmasks for value comparisons. */

  var COMPARE_PARTIAL_FLAG$8 = 1;
  /** Used for built-in method references. */

  var objectProto$27 = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$21 = objectProto$27.hasOwnProperty;
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

  function equalObjects$1(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG$8,
        objProps = getAllKeys$1(object),
        objLength = objProps.length,
        othProps = getAllKeys$1(other),
        othLength = othProps.length;

    if (objLength != othLength && !isPartial) {
      return false;
    }

    var index = objLength;

    while (index--) {
      var key = objProps[index];

      if (!(isPartial ? key in other : hasOwnProperty$21.call(other, key))) {
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

  /* Built-in method references that are verified to be native. */

  var DataView$1 = getNative$1(root$1, 'DataView');

  /* Built-in method references that are verified to be native. */

  var Promise$2 = getNative$1(root$1, 'Promise');

  /* Built-in method references that are verified to be native. */

  var Set$1 = getNative$1(root$1, 'Set');

  /* Built-in method references that are verified to be native. */

  var WeakMap$1 = getNative$1(root$1, 'WeakMap');

  /** `Object#toString` result references. */

  var mapTag$6 = '[object Map]',
      objectTag$4 = '[object Object]',
      promiseTag$1 = '[object Promise]',
      setTag$6 = '[object Set]',
      weakMapTag$3 = '[object WeakMap]';
  var dataViewTag$5 = '[object DataView]';
  /** Used to detect maps, sets, and weakmaps. */

  var dataViewCtorString$1 = toSource$1(DataView$1),
      mapCtorString$1 = toSource$1(Map$2),
      promiseCtorString$1 = toSource$1(Promise$2),
      setCtorString$1 = toSource$1(Set$1),
      weakMapCtorString$1 = toSource$1(WeakMap$1);
  /**
   * Gets the `toStringTag` of `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */

  var getTag$2 = baseGetTag$1; // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.

  if (DataView$1 && getTag$2(new DataView$1(new ArrayBuffer(1))) != dataViewTag$5 || Map$2 && getTag$2(new Map$2()) != mapTag$6 || Promise$2 && getTag$2(Promise$2.resolve()) != promiseTag$1 || Set$1 && getTag$2(new Set$1()) != setTag$6 || WeakMap$1 && getTag$2(new WeakMap$1()) != weakMapTag$3) {
    getTag$2 = function getTag(value) {
      var result = baseGetTag$1(value),
          Ctor = result == objectTag$4 ? value.constructor : undefined,
          ctorString = Ctor ? toSource$1(Ctor) : '';

      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString$1:
            return dataViewTag$5;

          case mapCtorString$1:
            return mapTag$6;

          case promiseCtorString$1:
            return promiseTag$1;

          case setCtorString$1:
            return setTag$6;

          case weakMapCtorString$1:
            return weakMapTag$3;
        }
      }

      return result;
    };
  }

  var getTag$3 = getTag$2;

  /** Used to compose bitmasks for value comparisons. */

  var COMPARE_PARTIAL_FLAG$9 = 1;
  /** `Object#toString` result references. */

  var argsTag$5 = '[object Arguments]',
      arrayTag$3 = '[object Array]',
      objectTag$5 = '[object Object]';
  /** Used for built-in method references. */

  var objectProto$28 = Object.prototype;
  /** Used to check objects for own properties. */

  var hasOwnProperty$22 = objectProto$28.hasOwnProperty;
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

  function baseIsEqualDeep$1(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray$1(object),
        othIsArr = isArray$1(other),
        objTag = objIsArr ? arrayTag$3 : getTag$3(object),
        othTag = othIsArr ? arrayTag$3 : getTag$3(other);
    objTag = objTag == argsTag$5 ? objectTag$5 : objTag;
    othTag = othTag == argsTag$5 ? objectTag$5 : othTag;
    var objIsObj = objTag == objectTag$5,
        othIsObj = othTag == objectTag$5,
        isSameTag = objTag == othTag;

    if (isSameTag && isBuffer$1(object)) {
      if (!isBuffer$1(other)) {
        return false;
      }

      objIsArr = true;
      objIsObj = false;
    }

    if (isSameTag && !objIsObj) {
      stack || (stack = new Stack$1());
      return objIsArr || isTypedArray$1(object) ? equalArrays$1(object, other, bitmask, customizer, equalFunc, stack) : equalByTag$1(object, other, objTag, bitmask, customizer, equalFunc, stack);
    }

    if (!(bitmask & COMPARE_PARTIAL_FLAG$9)) {
      var objIsWrapped = objIsObj && hasOwnProperty$22.call(object, '__wrapped__'),
          othIsWrapped = othIsObj && hasOwnProperty$22.call(other, '__wrapped__');

      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object,
            othUnwrapped = othIsWrapped ? other.value() : other;
        stack || (stack = new Stack$1());
        return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
      }
    }

    if (!isSameTag) {
      return false;
    }

    stack || (stack = new Stack$1());
    return equalObjects$1(object, other, bitmask, customizer, equalFunc, stack);
  }

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

  function baseIsEqual$1(value, other, bitmask, customizer, stack) {
    if (value === other) {
      return true;
    }

    if (value == null || other == null || !isObjectLike$1(value) && !isObjectLike$1(other)) {
      return value !== value && other !== other;
    }

    return baseIsEqualDeep$1(value, other, bitmask, customizer, baseIsEqual$1, stack);
  }

  /** Used to compose bitmasks for value comparisons. */

  var COMPARE_PARTIAL_FLAG$10 = 1,
      COMPARE_UNORDERED_FLAG$6 = 2;
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

  function baseIsMatch$1(object, source, matchData, customizer) {
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
        var stack = new Stack$1();

        if (customizer) {
          var result = customizer(objValue, srcValue, key, object, source, stack);
        }

        if (!(result === undefined ? baseIsEqual$1(srcValue, objValue, COMPARE_PARTIAL_FLAG$10 | COMPARE_UNORDERED_FLAG$6, customizer, stack) : result)) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` if suitable for strict
   *  equality comparisons, else `false`.
   */

  function isStrictComparable$1(value) {
    return value === value && !isObject$1(value);
  }

  /**
   * Gets the property names, values, and compare flags of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the match data of `object`.
   */

  function getMatchData$1(object) {
    var result = keys$1(object),
        length = result.length;

    while (length--) {
      var key = result[length],
          value = object[key];
      result[length] = [key, value, isStrictComparable$1(value)];
    }

    return result;
  }

  /**
   * A specialized version of `matchesProperty` for source values suitable
   * for strict equality comparisons, i.e. `===`.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @param {*} srcValue The value to match.
   * @returns {Function} Returns the new spec function.
   */
  function matchesStrictComparable$1(key, srcValue) {
    return function (object) {
      if (object == null) {
        return false;
      }

      return object[key] === srcValue && (srcValue !== undefined || key in Object(object));
    };
  }

  /**
   * The base implementation of `_.matches` which doesn't clone `source`.
   *
   * @private
   * @param {Object} source The object of property values to match.
   * @returns {Function} Returns the new spec function.
   */

  function baseMatches$1(source) {
    var matchData = getMatchData$1(source);

    if (matchData.length == 1 && matchData[0][2]) {
      return matchesStrictComparable$1(matchData[0][0], matchData[0][1]);
    }

    return function (object) {
      return object === source || baseIsMatch$1(object, source, matchData);
    };
  }

  /** `Object#toString` result references. */

  var symbolTag$3 = '[object Symbol]';
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

  function isSymbol$1(value) {
    return _typeof(value) == 'symbol' || isObjectLike$1(value) && baseGetTag$1(value) == symbolTag$3;
  }

  /** Used to match property names within property paths. */

  var reIsDeepProp$1 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      reIsPlainProp$1 = /^\w*$/;
  /**
   * Checks if `value` is a property name and not a property path.
   *
   * @private
   * @param {*} value The value to check.
   * @param {Object} [object] The object to query keys on.
   * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
   */

  function isKey$1(value, object) {
    if (isArray$1(value)) {
      return false;
    }

    var type = _typeof(value);

    if (type == 'number' || type == 'symbol' || type == 'boolean' || value == null || isSymbol$1(value)) {
      return true;
    }

    return reIsPlainProp$1.test(value) || !reIsDeepProp$1.test(value) || object != null && value in Object(object);
  }

  /** Error message constants. */

  var FUNC_ERROR_TEXT$2 = 'Expected a function';
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

  function memoize$1(func, resolver) {
    if (typeof func != 'function' || resolver != null && typeof resolver != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT$2);
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

    memoized.cache = new (memoize$1.Cache || MapCache$1)();
    return memoized;
  } // Expose `MapCache`.


  memoize$1.Cache = MapCache$1;

  /** Used as the maximum memoize cache size. */

  var MAX_MEMOIZE_SIZE$1 = 500;
  /**
   * A specialized version of `_.memoize` which clears the memoized function's
   * cache when it exceeds `MAX_MEMOIZE_SIZE`.
   *
   * @private
   * @param {Function} func The function to have its output memoized.
   * @returns {Function} Returns the new memoized function.
   */

  function memoizeCapped$1(func) {
    var result = memoize$1(func, function (key) {
      if (cache.size === MAX_MEMOIZE_SIZE$1) {
        cache.clear();
      }

      return key;
    });
    var cache = result.cache;
    return result;
  }

  /** Used to match property names within property paths. */

  var rePropName$1 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
  /** Used to match backslashes in property paths. */

  var reEscapeChar$1 = /\\(\\)?/g;
  /**
   * Converts `string` to a property path array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the property path array.
   */

  var stringToPath$1 = memoizeCapped$1(function (string) {
    var result = [];

    if (string.charCodeAt(0) === 46
    /* . */
    ) {
        result.push('');
      }

    string.replace(rePropName$1, function (match, number, quote, subString) {
      result.push(quote ? subString.replace(reEscapeChar$1, '$1') : number || match);
    });
    return result;
  });

  /** Used as references for various `Number` constants. */

  var INFINITY$2 = 1 / 0;
  /** Used to convert symbols to primitives and strings. */

  var symbolProto$3 = _Symbol ? _Symbol.prototype : undefined,
      symbolToString$1 = symbolProto$3 ? symbolProto$3.toString : undefined;
  /**
   * The base implementation of `_.toString` which doesn't convert nullish
   * values to empty strings.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */

  function baseToString$1(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == 'string') {
      return value;
    }

    if (isArray$1(value)) {
      // Recursively convert values (susceptible to call stack limits).
      return arrayMap$1(value, baseToString$1) + '';
    }

    if (isSymbol$1(value)) {
      return symbolToString$1 ? symbolToString$1.call(value) : '';
    }

    var result = value + '';
    return result == '0' && 1 / value == -INFINITY$2 ? '-0' : result;
  }

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

  function toString$1(value) {
    return value == null ? '' : baseToString$1(value);
  }

  /**
   * Casts `value` to a path array if it's not one.
   *
   * @private
   * @param {*} value The value to inspect.
   * @param {Object} [object] The object to query keys on.
   * @returns {Array} Returns the cast property path array.
   */

  function castPath$1(value, object) {
    if (isArray$1(value)) {
      return value;
    }

    return isKey$1(value, object) ? [value] : stringToPath$1(toString$1(value));
  }

  /** Used as references for various `Number` constants. */

  var INFINITY$3 = 1 / 0;
  /**
   * Converts `value` to a string key if it's not a string or symbol.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {string|symbol} Returns the key.
   */

  function toKey$1(value) {
    if (typeof value == 'string' || isSymbol$1(value)) {
      return value;
    }

    var result = value + '';
    return result == '0' && 1 / value == -INFINITY$3 ? '-0' : result;
  }

  /**
   * The base implementation of `_.get` without support for default values.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @returns {*} Returns the resolved value.
   */

  function baseGet$1(object, path) {
    path = castPath$1(path, object);
    var index = 0,
        length = path.length;

    while (object != null && index < length) {
      object = object[toKey$1(path[index++])];
    }

    return index && index == length ? object : undefined;
  }

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

  function get$1(object, path, defaultValue) {
    var result = object == null ? undefined : baseGet$1(object, path);
    return result === undefined ? defaultValue : result;
  }

  /**
   * The base implementation of `_.hasIn` without support for deep paths.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {Array|string} key The key to check.
   * @returns {boolean} Returns `true` if `key` exists, else `false`.
   */
  function baseHasIn$1(object, key) {
    return object != null && key in Object(object);
  }

  /**
   * Checks if `path` exists on `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @param {Function} hasFunc The function to check properties.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   */

  function hasPath$1(object, path, hasFunc) {
    path = castPath$1(path, object);
    var index = -1,
        length = path.length,
        result = false;

    while (++index < length) {
      var key = toKey$1(path[index]);

      if (!(result = object != null && hasFunc(object, key))) {
        break;
      }

      object = object[key];
    }

    if (result || ++index != length) {
      return result;
    }

    length = object == null ? 0 : object.length;
    return !!length && isLength$1(length) && isIndex$1(key, length) && (isArray$1(object) || isArguments$1(object));
  }

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

  function hasIn$1(object, path) {
    return object != null && hasPath$1(object, path, baseHasIn$1);
  }

  /** Used to compose bitmasks for value comparisons. */

  var COMPARE_PARTIAL_FLAG$11 = 1,
      COMPARE_UNORDERED_FLAG$7 = 2;
  /**
   * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
   *
   * @private
   * @param {string} path The path of the property to get.
   * @param {*} srcValue The value to match.
   * @returns {Function} Returns the new spec function.
   */

  function baseMatchesProperty$1(path, srcValue) {
    if (isKey$1(path) && isStrictComparable$1(srcValue)) {
      return matchesStrictComparable$1(toKey$1(path), srcValue);
    }

    return function (object) {
      var objValue = get$1(object, path);
      return objValue === undefined && objValue === srcValue ? hasIn$1(object, path) : baseIsEqual$1(srcValue, objValue, COMPARE_PARTIAL_FLAG$11 | COMPARE_UNORDERED_FLAG$7);
    };
  }

  /**
   * The base implementation of `_.property` without support for deep paths.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @returns {Function} Returns the new accessor function.
   */
  function baseProperty$1(key) {
    return function (object) {
      return object == null ? undefined : object[key];
    };
  }

  /**
   * A specialized version of `baseProperty` which supports deep paths.
   *
   * @private
   * @param {Array|string} path The path of the property to get.
   * @returns {Function} Returns the new accessor function.
   */

  function basePropertyDeep$1(path) {
    return function (object) {
      return baseGet$1(object, path);
    };
  }

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

  function property$1(path) {
    return isKey$1(path) ? baseProperty$1(toKey$1(path)) : basePropertyDeep$1(path);
  }

  /**
   * The base implementation of `_.iteratee`.
   *
   * @private
   * @param {*} [value=_.identity] The value to convert to an iteratee.
   * @returns {Function} Returns the iteratee.
   */

  function baseIteratee$1(value) {
    // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
    // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
    if (typeof value == 'function') {
      return value;
    }

    if (value == null) {
      return identity$1;
    }

    if (_typeof(value) == 'object') {
      return isArray$1(value) ? baseMatchesProperty$1(value[0], value[1]) : baseMatches$1(value);
    }

    return property$1(value);
  }

  /**
   * The base implementation of `_.map` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */

  function baseMap$1(collection, iteratee) {
    var index = -1,
        result = isArrayLike$1(collection) ? Array(collection.length) : [];
    baseEach$1(collection, function (value, key, collection) {
      result[++index] = iteratee(value, key, collection);
    });
    return result;
  }

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

  function map$1(collection, iteratee) {
    var func = isArray$1(collection) ? arrayMap$1 : baseMap$1;
    return func(collection, baseIteratee$1(iteratee, 3));
  }

  /**
   * The base implementation of `_.filter` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */

  function baseFilter$1(collection, predicate) {
    var result = [];
    baseEach$1(collection, function (value, index, collection) {
      if (predicate(value, index, collection)) {
        result.push(value);
      }
    });
    return result;
  }

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

  function filter$2(collection, predicate) {
    var func = isArray$1(collection) ? arrayFilter$1 : baseFilter$1;
    return func(collection, baseIteratee$1(predicate, 3));
  }

  /** Error message constants. */
  var FUNC_ERROR_TEXT$3 = 'Expected a function';
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

  function negate$1(predicate) {
    if (typeof predicate != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT$3);
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

  function baseSet$1(object, path, value, customizer) {
    if (!isObject$1(object)) {
      return object;
    }

    path = castPath$1(path, object);
    var index = -1,
        length = path.length,
        lastIndex = length - 1,
        nested = object;

    while (nested != null && ++index < length) {
      var key = toKey$1(path[index]),
          newValue = value;

      if (index != lastIndex) {
        var objValue = nested[key];
        newValue = customizer ? customizer(objValue, key, nested) : undefined;

        if (newValue === undefined) {
          newValue = isObject$1(objValue) ? objValue : isIndex$1(path[index + 1]) ? [] : {};
        }
      }

      assignValue$1(nested, key, newValue);
      nested = nested[key];
    }

    return object;
  }

  /**
   * The base implementation of  `_.pickBy` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The source object.
   * @param {string[]} paths The property paths to pick.
   * @param {Function} predicate The function invoked per property.
   * @returns {Object} Returns the new object.
   */

  function basePickBy$1(object, paths, predicate) {
    var index = -1,
        length = paths.length,
        result = {};

    while (++index < length) {
      var path = paths[index],
          value = baseGet$1(object, path);

      if (predicate(value, path)) {
        baseSet$1(result, castPath$1(path, object), value);
      }
    }

    return result;
  }

  /** Built-in value references. */

  var getPrototype$1 = overArg$1(Object.getPrototypeOf, Object);

  /* Built-in method references for those with the same name as other `lodash` methods. */

  var nativeGetSymbols$3 = Object.getOwnPropertySymbols;
  /**
   * Creates an array of the own and inherited enumerable symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of symbols.
   */

  var getSymbolsIn$1 = !nativeGetSymbols$3 ? stubArray$1 : function (object) {
    var result = [];

    while (object) {
      arrayPush$1(result, getSymbols$1(object));
      object = getPrototype$1(object);
    }

    return result;
  };

  /**
   * Creates an array of own and inherited enumerable property names and
   * symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names and symbols.
   */

  function getAllKeysIn$1(object) {
    return baseGetAllKeys$1(object, keysIn$1, getSymbolsIn$1);
  }

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

  function pickBy$1(object, predicate) {
    if (object == null) {
      return {};
    }

    var props = arrayMap$1(getAllKeysIn$1(object), function (prop) {
      return [prop];
    });
    predicate = baseIteratee$1(predicate);
    return basePickBy$1(object, props, function (value, path) {
      return predicate(value, path[0]);
    });
  }

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

  function omitBy$1(object, predicate) {
    return pickBy$1(object, negate$1(baseIteratee$1(predicate)));
  }

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
    return !start && end >= length ? array : baseSlice(array, start, end);
  }

  /** Used to compose unicode character classes. */
  var rsAstralRange = "\\ud800-\\udfff",
      rsComboMarksRange = "\\u0300-\\u036f",
      reComboHalfMarksRange = "\\ufe20-\\ufe2f",
      rsComboSymbolsRange = "\\u20d0-\\u20ff",
      rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
      rsVarRange = "\\ufe0e\\ufe0f";
  /** Used to compose unicode capture groups. */

  var rsZWJ = "\\u200d";
  /** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */

  var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + ']');
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

  /** Used to compose unicode character classes. */
  var rsAstralRange$1 = "\\ud800-\\udfff",
      rsComboMarksRange$1 = "\\u0300-\\u036f",
      reComboHalfMarksRange$1 = "\\ufe20-\\ufe2f",
      rsComboSymbolsRange$1 = "\\u20d0-\\u20ff",
      rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1,
      rsVarRange$1 = "\\ufe0e\\ufe0f";
  /** Used to compose unicode capture groups. */

  var rsAstral = '[' + rsAstralRange$1 + ']',
      rsCombo = '[' + rsComboRange$1 + ']',
      rsFitz = "\\ud83c[\\udffb-\\udfff]",
      rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
      rsNonAstral = '[^' + rsAstralRange$1 + ']',
      rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}",
      rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]",
      rsZWJ$1 = "\\u200d";
  /** Used to compose unicode regexes. */

  var reOptMod = rsModifier + '?',
      rsOptVar = '[' + rsVarRange$1 + ']?',
      rsOptJoin = '(?:' + rsZWJ$1 + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
      rsSeq = rsOptVar + reOptMod + rsOptJoin,
      rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';
  /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */

  var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');
  /**
   * Converts a Unicode `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */

  function unicodeToArray(string) {
    return string.match(reUnicode) || [];
  }

  /**
   * Converts `string` to an array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the converted array.
   */

  function stringToArray(string) {
    return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
  }

  /**
   * Creates a function like `_.lowerFirst`.
   *
   * @private
   * @param {string} methodName The name of the `String` case method to use.
   * @returns {Function} Returns the new case function.
   */

  function createCaseFirst(methodName) {
    return function (string) {
      string = toString$1(string);
      var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined;
      var chr = strSymbols ? strSymbols[0] : string.charAt(0);
      var trailing = strSymbols ? castSlice(strSymbols, 1).join('') : string.slice(1);
      return chr[methodName]() + trailing;
    };
  }

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

  var upperFirst = createCaseFirst('toUpperCase');

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
    return upperFirst(toString$1(string).toLowerCase());
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

  var deburrLetter = basePropertyOf(deburredLetters);

  /** Used to match Latin Unicode letters (excluding mathematical operators). */

  var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
  /** Used to compose unicode character classes. */

  var rsComboMarksRange$2 = "\\u0300-\\u036f",
      reComboHalfMarksRange$2 = "\\ufe20-\\ufe2f",
      rsComboSymbolsRange$2 = "\\u20d0-\\u20ff",
      rsComboRange$2 = rsComboMarksRange$2 + reComboHalfMarksRange$2 + rsComboSymbolsRange$2;
  /** Used to compose unicode capture groups. */

  var rsCombo$1 = '[' + rsComboRange$2 + ']';
  /**
   * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
   * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
   */

  var reComboMark = RegExp(rsCombo$1, 'g');
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
    string = toString$1(string);
    return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
  }

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

  /** Used to compose unicode character classes. */
  var rsAstralRange$2 = "\\ud800-\\udfff",
      rsComboMarksRange$3 = "\\u0300-\\u036f",
      reComboHalfMarksRange$3 = "\\ufe20-\\ufe2f",
      rsComboSymbolsRange$3 = "\\u20d0-\\u20ff",
      rsComboRange$3 = rsComboMarksRange$3 + reComboHalfMarksRange$3 + rsComboSymbolsRange$3,
      rsDingbatRange = "\\u2700-\\u27bf",
      rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
      rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
      rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
      rsPunctuationRange = "\\u2000-\\u206f",
      rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
      rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
      rsVarRange$2 = "\\ufe0e\\ufe0f",
      rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
  /** Used to compose unicode capture groups. */

  var rsApos = "['\u2019]",
      rsBreak = '[' + rsBreakRange + ']',
      rsCombo$2 = '[' + rsComboRange$3 + ']',
      rsDigits = '\\d+',
      rsDingbat = '[' + rsDingbatRange + ']',
      rsLower = '[' + rsLowerRange + ']',
      rsMisc = '[^' + rsAstralRange$2 + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
      rsFitz$1 = "\\ud83c[\\udffb-\\udfff]",
      rsModifier$1 = '(?:' + rsCombo$2 + '|' + rsFitz$1 + ')',
      rsNonAstral$1 = '[^' + rsAstralRange$2 + ']',
      rsRegional$1 = "(?:\\ud83c[\\udde6-\\uddff]){2}",
      rsSurrPair$1 = "[\\ud800-\\udbff][\\udc00-\\udfff]",
      rsUpper = '[' + rsUpperRange + ']',
      rsZWJ$2 = "\\u200d";
  /** Used to compose unicode regexes. */

  var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
      rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
      rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
      rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
      reOptMod$1 = rsModifier$1 + '?',
      rsOptVar$1 = '[' + rsVarRange$2 + ']?',
      rsOptJoin$1 = '(?:' + rsZWJ$2 + '(?:' + [rsNonAstral$1, rsRegional$1, rsSurrPair$1].join('|') + ')' + rsOptVar$1 + reOptMod$1 + ')*',
      rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
      rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
      rsSeq$1 = rsOptVar$1 + reOptMod$1 + rsOptJoin$1,
      rsEmoji = '(?:' + [rsDingbat, rsRegional$1, rsSurrPair$1].join('|') + ')' + rsSeq$1;
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
    string = toString$1(string);
    pattern = guard ? undefined : pattern;

    if (pattern === undefined) {
      return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
    }

    return string.match(pattern) || [];
  }

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
      return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
    };
  }

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

  var camelCase = createCompounder(function (result, word, index) {
    word = word.toLowerCase();
    return result + (index ? capitalize(word) : word);
  });

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
    iteratee = baseIteratee$1(iteratee, 3);
    baseForOwn$1(object, function (value, key, object) {
      baseAssignValue$1(result, iteratee(value, key, object), value);
    });
    return result;
  }

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

  function prefix(subject, prefix) {
    var delimeter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '-';

    var prefixer = function prefixer(value, key) {
      var string = key || value;
      return [prefix, string.replace(new RegExp("^".concat(prefix).concat(delimeter, "?")), '')].join(delimeter);
    };

    if (isNull(subject) || isUndefined(subject)) {
      return subject;
    }

    if (isObject$1(subject)) {
      return mapKeys(subject, prefixer);
    }

    return prefixer(subject);
  }

  var COLORS = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'white', 'muted'];
  var props = {};
  forEach$1(['border', 'text', 'bg', 'bg-gradient'], function (namespace) {
    forEach$1(COLORS, function (color) {
      props[camelCase(prefix(color, namespace))] = Boolean;
    });
  });

  function classes(instance, namespace) {
    return filter$2(map$1(COLORS, function (color) {
      return instance[camelCase(color = prefix(color, namespace))] ? color : null;
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
        return omitBy$1(classes, function (key, value) {
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
        return assignIn({}, this.screenreaderClasses, this.colorableClasses);
      }
    }
  };

  var plugin$2 = VueInstaller.use({
    install: function install(Vue, options) {
      VueInstaller.components({
        HelpText: HelpText
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
        return assignIn({}, this.screenreaderClasses, this.colorableClasses);
      }
    }
  };

  var plugin$3 = VueInstaller.use({
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

  var plugin$4 = VueInstaller.use({
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
          forEach$1(events, function (name) {
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

        if (isObject$1(this.errors)) {
          errors = this.errors[this.name || this.id];
        }

        return !errors || isArray$1(errors) || isObject$1(errors) ? errors : [errors];
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
            callback: _this[camelCase(['on', event].join(' '))]
          };
        }).filter(function (event) {
          return !isUndefined(event.callback);
        });
      },
      invalidFeedback: function invalidFeedback() {
        if (this.error) {
          return this.error;
        }

        var errors = this.getFieldErrors();
        return isArray$1(errors) ? errors.join('<br>') : errors;
      },
      validFeedback: function validFeedback() {
        return isArray$1(this.feedback) ? this.feedback.join('<br>') : this.feedback;
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

  var plugin$5 = VueInstaller.use({
    install: function install(Vue, options) {
      VueInstaller.components({
        InputField: InputField
      });
    }
  });

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

  var kebabCase = createCompounder(function (result, word, index) {
    return result + (index ? '-' : '') + word.toLowerCase();
  });

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
    props: assignIn({}, BaseType.props, {
      nodes: {
        type: Number,
        default: 12
      }
    })
  };

  /* Built-in method references for those with the same name as other `lodash` methods. */

  var nativeIsFinite = root$1.isFinite;

  function unit (height) {
    return isFinite(height) ? height + 'px' : height;
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
        return kebabCase(this.prefix + this.type.replace(this.prefix, ''));
      }
    }
  };

  var plugin$6 = VueInstaller.use({
    install: function install(Vue, options) {
      VueInstaller.components({
        ActivityIndicator: ActivityIndicator
      });
    }
  });

  var KEYCODE = {
    ESC: 27,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    ENTER: 13,
    SPACE: 32,
    TAB: 9
  };
  var API_REQUEST_OPTIONS = ['bounds', 'location', 'component-restrictions', 'offset', 'radius', 'types'];
  var PlaceAutocompleteField = {
    render: function render() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        staticClass: "autocomplete-field",
        class: {
          'was-validated': _vm.error || _vm.errors[_vm.name]
        },
        on: {
          "keydown": _vm.onKeydown,
          "keyup": _vm.onKeyup
        }
      }, [_c('input-field', {
        attrs: {
          "name": _vm.name,
          "id": _vm.id,
          "type": _vm.type,
          "placeholder": _vm.placeholder,
          "required": _vm.required,
          "disabled": _vm.disabled || _vm.readonly,
          "readonly": _vm.readonly,
          "pattern": _vm.pattern,
          "aria-label": _vm.label,
          "aria-describedby": _vm.id,
          "label": _vm.label,
          "errors": _vm.errors
        },
        on: {
          "input": _vm.updated,
          "focus": _vm.onFocus,
          "blur": _vm.onBlur
        },
        model: {
          value: _vm.query,
          callback: function callback($$v) {
            _vm.query = $$v;
          },
          expression: "query"
        }
      }, [_vm.activity ? _c('activity-indicator', {
        attrs: {
          "size": "xs",
          "type": "spinner"
        }
      }) : _vm._e()], 1), _vm._v(" "), _vm.predictions && _vm.showPredictions ? _c('place-autocomplete-list', {
        attrs: {
          "items": _vm.predictions
        },
        on: {
          "item:click": _vm.onItemClick,
          "item:blur": _vm.onItemBlur
        }
      }) : _vm._e()], 1);
    },
    staticRenderFns: [],
    name: 'place-autocomplete-field',
    extends: InputField,
    components: {
      FormGroup: FormGroup,
      InputField: InputField,
      ActivityIndicator: ActivityIndicator,
      PlaceAutocompleteList: PlaceAutocompleteList
    },
    props: {
      // Google Maps options
      'api-key': {
        required: true,
        type: String
      },
      'bounds': {
        type: [Boolean, Object, String],
        default: false
      },
      'location': {
        type: [Boolean, Object, String],
        default: false
      },
      'component-restrictions': {
        type: [Boolean, Object, String],
        default: false
      },
      'offset': {
        type: Boolean,
        default: false
      },
      'radius': {
        type: Boolean,
        default: false
      },
      'types': {
        type: [Boolean, Array],
        default: false
      }
    },
    methods: {
      getInputElement: function getInputElement() {
        return this.$el.querySelector('input');
      },
      getRequestOptions: function getRequestOptions() {
        var _this = this;

        var options = {
          input: this.getInputElement().value
        };
        forEach(API_REQUEST_OPTIONS, function (key) {
          options[key] = _this[key];
        });
        return omitBy(options, isEmpty);
      },
      geocode: function geocode(request) {
        var _this2 = this;

        this.activity = true;
        this.$emit('geocode', request);
        return new Promise(function (resolve, reject) {
          _this2.$geocoder.geocode(request, function (response, status) {
            _this2.activity = false;

            switch (status) {
              case google.maps.places.PlacesServiceStatus.OK:
                resolve(response);
                break;

              default:
                reject(status);
            }
          });
        });
      },
      select: function select(place) {
        var _this3 = this;

        this.geocode({
          placeId: place.place_id
        }).then(function (response) {
          _this3.hide();

          _this3.updated(_this3.query = response[0].formatted_address);

          _this3.$emit('select', place, response[0]);
        });
      },
      search: function search() {
        var _this4 = this;

        return new Promise(function (resolve, reject) {
          if (!_this4.getInputElement().value) {
            _this4.predictions = false;
            _this4.showPredictions = false;
            reject();
          } else {
            _this4.activity = true;

            _this4.$service.getPlacePredictions(_this4.getRequestOptions(), function (response, status) {
              _this4.activity = false;

              switch (status) {
                case google.maps.places.PlacesServiceStatus.OK:
                  resolve(response);
                  break;

                default:
                  reject(status);
              }
            });
          }
        });
      },
      hide: function hide() {
        this.showPredictions = false;
      },
      show: function show() {
        this.showPredictions = true;
      },
      up: function up() {
        var focused = this.$el.querySelector('a:focus');

        if (focused && focused.parentElement.previousElementSibling) {
          focused.parentElement.previousElementSibling.querySelector('a').focus();
        } else {
          var links = this.$el.querySelectorAll('a');
          links[links.length - 1].focus();
        }
      },
      down: function down() {
        var focused = this.$el.querySelector('a:focus');

        if (focused && focused.parentElement.nextElementSibling) {
          focused.parentElement.nextElementSibling.querySelector('a').focus();
        } else {
          this.$el.querySelector('a').focus();
        }
      },
      onKeydown: function onKeydown(event) {
        var element = this.$el.querySelector('[tabindex]');

        if (element && event.keyCode === KEYCODE.TAB) {
          event.preventDefault() && element.focus();
        }
      },
      onKeyup: function onKeyup(event) {
        var _this5 = this;

        switch (event.keyCode) {
          case KEYCODE.ENTER:
          case KEYCODE.SPACE:
            if (this.$el.querySelector('.is-focused')) {
              this.$el.querySelector('.is-focused a').dispatchEvent(new Event('mousedown'));
            }

            return;

          case KEYCODE.ESC:
            this.hide();
            this.getInputElement().blur();
            return;

          case KEYCODE.UP:
            this.up();
            event.preventDefault();
            return;

          case KEYCODE.DOWN:
            this.down();
            event.preventDefault();
            return;
        }

        this.search().then(function (response) {
          _this5.predictions = response;
          _this5.showPredictions = true;
        }, function (error) {
          _this5.predictions = false;
        });
      },
      onFocus: function onFocus(event) {
        if (this.query) {
          this.show();
        }
      },
      onBlur: function onBlur(event) {
        if (!this.$el.contains(event.relatedTarget)) {
          this.hide();
        }
      },
      onItemBlur: function onItemBlur(event) {
        this.onBlur(event);
      },
      onItemClick: function onItemClick(event, child) {
        this.select(child.item);
        this.predictions = false;
      }
    },
    mounted: function mounted() {
      var _this6 = this;

      script('https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&libraries=places').then(function () {
        _this6.$geocoder = new google.maps.Geocoder();
        _this6.$service = new google.maps.places.AutocompleteService();
      }); //this.$on('place:changed', this.placeChanged);
      //this.$on('prediction:blur', this.predictionBlur);
      //this.$on('prediction:focus', this.predictionFocus);
      //this.$on('prediction:select', this.predictionSelect);
    },
    data: function data() {
      return {
        query: null,
        focus: null,
        activity: false,
        predictions: false,
        showPredictions: false
      };
    }
    /*
    {
        // An array of types specifies an explicit type or a type collection, as listed in the supported types below. If nothing is specified, all types are returned. In general only a single type is allowed. The exception is that you can safely mix the geocode and establishment types, but note that this will have the same effect as specifying no types. The supported types are: geocode instructs the Places service to return only geocoding results, rather than business results. address instructs the Places service to return only geocoding results with a precise address. establishment instructs the Places service to return only business results. the (regions) type collection instructs the Places service to return any result matching the following types: locality sublocality postal_code country administrative_area1 administrative_area2 the (cities) type collection instructs the Places service to return results that match either locality or administrative_area3.
        // Possible values: geocode, address, establishment, cities, locality, sublocality, postal_code, country, administrative_area1, administrative_area2
        type: undefined,
         // is a google.maps.LatLngBounds|google.maps.LatLngBoundsLiteral object specifying the area in which to search for places. The results are biased towards, but not restricted to, places contained within these bounds.
        bounds: undefined,
         // is a boolean specifying whether the API must return only those places that are strictly within the region defined by the given bounds. The API does not return results outside this region even if they match the user input.
        strictBounds: true|false,
         // can be used to restrict results to specific groups. Currently, you can use componentRestrictions to filter by up to 5 countries. Countries must be passed as as a two-character, ISO 3166-1 Alpha-2 compatible country code. Multiple countries must be passed as a list of country codes. z
        componentRestrictions: undefined,
         // can be used to instruct the Autocomplete widget to retrieve only Place IDs. On calling getPlace() on the Autocomplete object, the PlaceResult made available will only have the place id, types and name properties set. You can use the returned place ID with calls to the Places, Geocoding, Directions or Distance Matrix services.
        placeIdOnly: undefined,
         // is a google.maps.LatLng for prediction biasing. Predictions will be biased towards the given location and radius. Alternatively, bounds can be used.
        location: undefined,
         // is a number to determine the character position in the input term at which the service uses text for predictions (the position of the cursor in the input field).
        offset: undefined,
         // is a number to the radius of the area used for prediction biasing. The radius is specified in meters, and must always be accompanied by a location property. Alternatively, bounds can be used.
        radius: undefined
    }
    */

  };

  var PlaceAutocompleteListItem = {
    render: function render() {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('li', {
        staticClass: "autocomplete-list-item",
        on: {
          "focus": _vm.onFocus,
          "onBlur": _vm.onBlur
        }
      }, [_c('a', {
        attrs: {
          "href": "#"
        },
        on: {
          "click": function click($event) {
            $event.preventDefault();
            return _vm.onClick($event);
          },
          "focus": _vm.onFocus,
          "blur": _vm.onBlur
        }
      }, [_c('span', {
        staticClass: "autocomplete-list-item-icon"
      }), _vm._v(" "), _c('span', {
        staticClass: "autocomplete-list-item-label"
      }, [_vm._t("default")], 2)])]);
    },
    staticRenderFns: [],
    name: 'place-autocomplete-list-item',
    props: {
      item: Object
    },
    methods: {
      onBlur: function onBlur(event) {
        this.$emit('blur', event, this);
      },
      onClick: function onClick(event) {
        this.$emit('click', event, this);
      },
      onFocus: function onFocus(event) {
        this.$emit('focus', event, this);
      }
    }
  };

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
    if (value !== undefined && !eq$1(object[key], value) || value === undefined && !(key in object)) {
      baseAssignValue$1(object, key, value);
    }
  }

  /** Detect free variable `exports`. */

  var freeExports$4 = (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == 'object' && exports && !exports.nodeType && exports;
  /** Detect free variable `module`. */

  var freeModule$4 = freeExports$4 && (typeof module === "undefined" ? "undefined" : _typeof(module)) == 'object' && module && !module.nodeType && module;
  /** Detect the popular CommonJS extension `module.exports`. */

  var moduleExports$4 = freeModule$4 && freeModule$4.exports === freeExports$4;
  /** Built-in value references. */

  var Buffer$2 = moduleExports$4 ? root$1.Buffer : undefined,
      allocUnsafe = Buffer$2 ? Buffer$2.allocUnsafe : undefined;
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

  /**
   * Creates a clone of `arrayBuffer`.
   *
   * @private
   * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
   * @returns {ArrayBuffer} Returns the cloned array buffer.
   */

  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array$1(result).set(new Uint8Array$1(arrayBuffer));
    return result;
  }

  /**
   * Creates a clone of `typedArray`.
   *
   * @private
   * @param {Object} typedArray The typed array to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned typed array.
   */

  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }

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
      if (!isObject$1(proto)) {
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

  /**
   * Initializes an object clone.
   *
   * @private
   * @param {Object} object The object to clone.
   * @returns {Object} Returns the initialized clone.
   */

  function initCloneObject(object) {
    return typeof object.constructor == 'function' && !isPrototype$1(object) ? baseCreate(getPrototype$1(object)) : {};
  }

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

  function isArrayLikeObject$1(value) {
    return isObjectLike$1(value) && isArrayLike$1(value);
  }

  /** `Object#toString` result references. */

  var objectTag$6 = '[object Object]';
  /** Used for built-in method references. */

  var funcProto$4 = Function.prototype,
      objectProto$29 = Object.prototype;
  /** Used to resolve the decompiled source of functions. */

  var funcToString$4 = funcProto$4.toString;
  /** Used to check objects for own properties. */

  var hasOwnProperty$23 = objectProto$29.hasOwnProperty;
  /** Used to infer the `Object` constructor. */

  var objectCtorString = funcToString$4.call(Object);
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
    if (!isObjectLike$1(value) || baseGetTag$1(value) != objectTag$6) {
      return false;
    }

    var proto = getPrototype$1(value);

    if (proto === null) {
      return true;
    }

    var Ctor = hasOwnProperty$23.call(proto, 'constructor') && proto.constructor;
    return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString$4.call(Ctor) == objectCtorString;
  }

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
    return copyObject(value, keysIn$1(value));
  }

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
    var objValue = safeGet(object, key),
        srcValue = safeGet(source, key),
        stacked = stack.get(srcValue);

    if (stacked) {
      assignMergeValue(object, key, stacked);
      return;
    }

    var newValue = customizer ? customizer(objValue, srcValue, key + '', object, source, stack) : undefined;
    var isCommon = newValue === undefined;

    if (isCommon) {
      var isArr = isArray$1(srcValue),
          isBuff = !isArr && isBuffer$1(srcValue),
          isTyped = !isArr && !isBuff && isTypedArray$1(srcValue);
      newValue = srcValue;

      if (isArr || isBuff || isTyped) {
        if (isArray$1(objValue)) {
          newValue = objValue;
        } else if (isArrayLikeObject$1(objValue)) {
          newValue = copyArray(objValue);
        } else if (isBuff) {
          isCommon = false;
          newValue = cloneBuffer(srcValue, true);
        } else if (isTyped) {
          isCommon = false;
          newValue = cloneTypedArray(srcValue, true);
        } else {
          newValue = [];
        }
      } else if (isPlainObject(srcValue) || isArguments$1(srcValue)) {
        newValue = objValue;

        if (isArguments$1(objValue)) {
          newValue = toPlainObject(objValue);
        } else if (!isObject$1(objValue) || srcIndex && isFunction$1(objValue)) {
          newValue = initCloneObject(srcValue);
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

    assignMergeValue(object, key, newValue);
  }

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

    baseFor$1(source, function (srcValue, key) {
      if (isObject$1(srcValue)) {
        stack || (stack = new Stack$1());
        baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
      } else {
        var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + '', object, source, stack) : undefined;

        if (newValue === undefined) {
          newValue = srcValue;
        }

        assignMergeValue(object, key, newValue);
      }
    }, keysIn$1);
  }

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

  var merge = createAssigner(function (object, source, srcIndex) {
    baseMerge(object, source, srcIndex);
  });

  function MergeClasses (Vue, options) {
    Vue.prototype.$mergeClasses = function () {
      var classes = {};
      forEach$1([].slice.call(arguments), function (arg) {
        if (isObject$1(arg)) {
          assignIn(classes, arg);
        } else if (isArray$1(arg)) {
          merge(classes, arg);
        } else if (arg) {
          classes[arg] = true;
        }
      });
      return classes;
    };
  }

  function install(vue, options) {
    Vue.use(MergeClasses);
    Vue.directive('place-autofill', PlaceAutofill);
    Vue.component('place-autocomplete-field', PlaceAutocompleteField);
    Vue.component('place-autocomplete-list', PlaceAutocompleteList);
    Vue.component('place-autocomplete-list-item', PlaceAutocompleteListItem);
  }

  if (window && window.Vue) {
    window.Vue.use(install);
  }

  exports.PlaceAutocompleteField = PlaceAutocompleteField;
  exports.PlaceAutocompleteList = PlaceAutocompleteList;
  exports.PlaceAutocompleteListItem = PlaceAutocompleteListItem;
  exports.default = install;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnVlLXBsYWNlLWF1dG9jb21wbGV0ZS5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYXJyYXlNYXAuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19saXN0Q2FjaGVDbGVhci5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvZXEuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hc3NvY0luZGV4T2YuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19saXN0Q2FjaGVEZWxldGUuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19saXN0Q2FjaGVHZXQuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19saXN0Q2FjaGVIYXMuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19saXN0Q2FjaGVTZXQuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19MaXN0Q2FjaGUuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zdGFja0NsZWFyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fc3RhY2tEZWxldGUuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zdGFja0dldC5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3N0YWNrSGFzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JvbGx1cC1wbHVnaW4tbm9kZS1nbG9iYWxzL3NyYy9nbG9iYWwuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19mcmVlR2xvYmFsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fcm9vdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX1N5bWJvbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldFJhd1RhZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX29iamVjdFRvU3RyaW5nLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUdldFRhZy5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNPYmplY3QuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzRnVuY3Rpb24uanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jb3JlSnNEYXRhLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faXNNYXNrZWQuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL190b1NvdXJjZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VJc05hdGl2ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldFZhbHVlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0TmF0aXZlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fTWFwLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fbmF0aXZlQ3JlYXRlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faGFzaENsZWFyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faGFzaERlbGV0ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2hhc2hHZXQuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19oYXNoSGFzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faGFzaFNldC5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX0hhc2guanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19tYXBDYWNoZUNsZWFyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faXNLZXlhYmxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0TWFwRGF0YS5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX21hcENhY2hlRGVsZXRlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fbWFwQ2FjaGVHZXQuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19tYXBDYWNoZUhhcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX21hcENhY2hlU2V0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fTWFwQ2FjaGUuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zdGFja1NldC5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX1N0YWNrLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fc2V0Q2FjaGVBZGQuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zZXRDYWNoZUhhcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX1NldENhY2hlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYXJyYXlTb21lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fY2FjaGVIYXMuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19lcXVhbEFycmF5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX1VpbnQ4QXJyYXkuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19tYXBUb0FycmF5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fc2V0VG9BcnJheS5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2VxdWFsQnlUYWcuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hcnJheVB1c2guanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzQXJyYXkuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlR2V0QWxsS2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2FycmF5RmlsdGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9zdHViQXJyYXkuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRTeW1ib2xzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVRpbWVzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc09iamVjdExpa2UuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlSXNBcmd1bWVudHMuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzQXJndW1lbnRzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9zdHViRmFsc2UuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzQnVmZmVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faXNJbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNMZW5ndGguanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlSXNUeXBlZEFycmF5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVVuYXJ5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fbm9kZVV0aWwuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzVHlwZWRBcnJheS5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2FycmF5TGlrZUtleXMuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19pc1Byb3RvdHlwZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX292ZXJBcmcuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19uYXRpdmVLZXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUtleXMuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzQXJyYXlMaWtlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9rZXlzLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0QWxsS2V5cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2VxdWFsT2JqZWN0cy5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX0RhdGFWaWV3LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fUHJvbWlzZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX1NldC5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX1dlYWtNYXAuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRUYWcuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlSXNFcXVhbERlZXAuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlSXNFcXVhbC5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VJc01hdGNoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faXNTdHJpY3RDb21wYXJhYmxlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0TWF0Y2hEYXRhLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fbWF0Y2hlc1N0cmljdENvbXBhcmFibGUuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlTWF0Y2hlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNTeW1ib2wuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19pc0tleS5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvbWVtb2l6ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX21lbW9pemVDYXBwZWQuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zdHJpbmdUb1BhdGguanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlVG9TdHJpbmcuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL3RvU3RyaW5nLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fY2FzdFBhdGguanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL190b0tleS5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VHZXQuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2dldC5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VIYXNJbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2hhc1BhdGguanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2hhc0luLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZU1hdGNoZXNQcm9wZXJ0eS5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaWRlbnRpdHkuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlUHJvcGVydHkuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlUHJvcGVydHlEZWVwLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9wcm9wZXJ0eS5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VJdGVyYXRlZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2NyZWF0ZUJhc2VGb3IuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlRm9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUZvck93bi5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2NyZWF0ZUJhc2VFYWNoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUVhY2guanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlTWFwLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9tYXAuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlRmlsdGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9maWx0ZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlRmluZEluZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUlzTmFOLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fc3RyaWN0SW5kZXhPZi5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VJbmRleE9mLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYXJyYXlJbmNsdWRlcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2FycmF5SW5jbHVkZXNXaXRoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUludGVyc2VjdGlvbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2FwcGx5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fb3ZlclJlc3QuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2NvbnN0YW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZGVmaW5lUHJvcGVydHkuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlU2V0VG9TdHJpbmcuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zaG9ydE91dC5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3NldFRvU3RyaW5nLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVJlc3QuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzQXJyYXlMaWtlT2JqZWN0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fY2FzdEFycmF5TGlrZU9iamVjdC5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaW50ZXJzZWN0aW9uLmpzIiwiLi4vc3JjL1BsYWNlQXV0b2ZpbGwuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hcnJheUVhY2guanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jYXN0RnVuY3Rpb24uanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2ZvckVhY2guanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL25lZ2F0ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VBc3NpZ25WYWx1ZS5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Fzc2lnblZhbHVlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVNldC5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VQaWNrQnkuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRQcm90b3R5cGUuanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRTeW1ib2xzSW4uanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19uYXRpdmVLZXlzSW4uanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlS2V5c0luLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9rZXlzSW4uanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRBbGxLZXlzSW4uanMiLCIuLi9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL3BpY2tCeS5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvb21pdEJ5LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc0VtcHR5LmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9zcmMvSGVscGVycy9TY3JpcHQvU2NyaXB0LmpzIiwiLi4vc3JjL1BsYWNlQXV0b2NvbXBsZXRlTGlzdC52dWUiLCIuLi8uLi92dWUtaW50ZXJmYWNlL3NyYy9Db21wb25lbnRzL0Zvcm1Hcm91cC9Gb3JtR3JvdXAudnVlIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hcnJheUVhY2guanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2NyZWF0ZUJhc2VGb3IuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VGb3IuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VUaW1lcy5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZnJlZUdsb2JhbC5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fcm9vdC5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fU3ltYm9sLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRSYXdUYWcuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX29iamVjdFRvU3RyaW5nLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlR2V0VGFnLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzT2JqZWN0TGlrZS5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUlzQXJndW1lbnRzLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzQXJndW1lbnRzLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzQXJyYXkuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvc3R1YkZhbHNlLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzQnVmZmVyLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19pc0luZGV4LmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzTGVuZ3RoLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlSXNUeXBlZEFycmF5LmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlVW5hcnkuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX25vZGVVdGlsLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzVHlwZWRBcnJheS5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYXJyYXlMaWtlS2V5cy5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faXNQcm90b3R5cGUuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX292ZXJBcmcuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX25hdGl2ZUtleXMuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VLZXlzLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzT2JqZWN0LmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzRnVuY3Rpb24uanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvaXNBcnJheUxpa2UuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMva2V5cy5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUZvck93bi5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fY3JlYXRlQmFzZUVhY2guanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VFYWNoLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lkZW50aXR5LmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jYXN0RnVuY3Rpb24uanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvZm9yRWFjaC5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvc3JjL0hlbHBlcnMvVnVlSW5zdGFsbGVyL1Z1ZUluc3RhbGxlci5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvc3JjL0NvbXBvbmVudHMvRm9ybUdyb3VwL2luZGV4LmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jb3JlSnNEYXRhLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19pc01hc2tlZC5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fdG9Tb3VyY2UuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VJc05hdGl2ZS5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0VmFsdWUuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldE5hdGl2ZS5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZGVmaW5lUHJvcGVydHkuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VBc3NpZ25WYWx1ZS5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9lcS5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYXNzaWduVmFsdWUuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2NvcHlPYmplY3QuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2FwcGx5LmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19vdmVyUmVzdC5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9jb25zdGFudC5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVNldFRvU3RyaW5nLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zaG9ydE91dC5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fc2V0VG9TdHJpbmcuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VSZXN0LmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19pc0l0ZXJhdGVlQ2FsbC5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fY3JlYXRlQXNzaWduZXIuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX25hdGl2ZUtleXNJbi5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUtleXNJbi5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9rZXlzSW4uanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvYXNzaWduSW4uanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2FycmF5TWFwLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19saXN0Q2FjaGVDbGVhci5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYXNzb2NJbmRleE9mLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19saXN0Q2FjaGVEZWxldGUuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2xpc3RDYWNoZUdldC5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fbGlzdENhY2hlSGFzLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19saXN0Q2FjaGVTZXQuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX0xpc3RDYWNoZS5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fc3RhY2tDbGVhci5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fc3RhY2tEZWxldGUuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3N0YWNrR2V0LmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zdGFja0hhcy5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fTWFwLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19uYXRpdmVDcmVhdGUuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2hhc2hDbGVhci5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faGFzaERlbGV0ZS5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faGFzaEdldC5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faGFzaEhhcy5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faGFzaFNldC5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fSGFzaC5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fbWFwQ2FjaGVDbGVhci5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faXNLZXlhYmxlLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRNYXBEYXRhLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19tYXBDYWNoZURlbGV0ZS5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fbWFwQ2FjaGVHZXQuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX21hcENhY2hlSGFzLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19tYXBDYWNoZVNldC5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fTWFwQ2FjaGUuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3N0YWNrU2V0LmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19TdGFjay5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fc2V0Q2FjaGVBZGQuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3NldENhY2hlSGFzLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19TZXRDYWNoZS5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYXJyYXlTb21lLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jYWNoZUhhcy5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZXF1YWxBcnJheXMuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX1VpbnQ4QXJyYXkuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX21hcFRvQXJyYXkuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3NldFRvQXJyYXkuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2VxdWFsQnlUYWcuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2FycmF5UHVzaC5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUdldEFsbEtleXMuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2FycmF5RmlsdGVyLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL3N0dWJBcnJheS5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0U3ltYm9scy5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0QWxsS2V5cy5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZXF1YWxPYmplY3RzLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19EYXRhVmlldy5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fUHJvbWlzZS5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fU2V0LmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19XZWFrTWFwLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRUYWcuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VJc0VxdWFsRGVlcC5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUlzRXF1YWwuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VJc01hdGNoLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19pc1N0cmljdENvbXBhcmFibGUuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldE1hdGNoRGF0YS5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fbWF0Y2hlc1N0cmljdENvbXBhcmFibGUuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VNYXRjaGVzLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzU3ltYm9sLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19pc0tleS5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9tZW1vaXplLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19tZW1vaXplQ2FwcGVkLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19zdHJpbmdUb1BhdGguanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VUb1N0cmluZy5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy90b1N0cmluZy5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fY2FzdFBhdGguanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3RvS2V5LmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlR2V0LmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2dldC5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUhhc0luLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19oYXNQYXRoLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2hhc0luLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlTWF0Y2hlc1Byb3BlcnR5LmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlUHJvcGVydHkuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VQcm9wZXJ0eURlZXAuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvcHJvcGVydHkuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VJdGVyYXRlZS5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZU1hcC5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9tYXAuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VGaWx0ZXIuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvZmlsdGVyLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL25lZ2F0ZS5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVNldC5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZVBpY2tCeS5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fZ2V0UHJvdG90eXBlLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19nZXRTeW1ib2xzSW4uanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2dldEFsbEtleXNJbi5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9waWNrQnkuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvb21pdEJ5LmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19iYXNlU2xpY2UuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Nhc3RTbGljZS5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faGFzVW5pY29kZS5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYXNjaWlUb0FycmF5LmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL191bmljb2RlVG9BcnJheS5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fc3RyaW5nVG9BcnJheS5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fY3JlYXRlQ2FzZUZpcnN0LmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL3VwcGVyRmlyc3QuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvY2FwaXRhbGl6ZS5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYXJyYXlSZWR1Y2UuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Jhc2VQcm9wZXJ0eU9mLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19kZWJ1cnJMZXR0ZXIuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvZGVidXJyLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19hc2NpaVdvcmRzLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19oYXNVbmljb2RlV29yZC5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fdW5pY29kZVdvcmRzLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL3dvcmRzLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jcmVhdGVDb21wb3VuZGVyLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2NhbWVsQ2FzZS5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc051bGwuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvbWFwS2V5cy5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9pc1VuZGVmaW5lZC5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvc3JjL0hlbHBlcnMvUHJlZml4L1ByZWZpeC5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvc3JjL01peGlucy9Db2xvcmFibGUvQ29sb3JhYmxlLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9zcmMvTWl4aW5zL1NjcmVlbnJlYWRlcnMvU2NyZWVucmVhZGVycy5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvc3JjL0NvbXBvbmVudHMvSGVscFRleHQvSGVscFRleHQudnVlIiwiLi4vLi4vdnVlLWludGVyZmFjZS9zcmMvQ29tcG9uZW50cy9IZWxwVGV4dC9pbmRleC5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvc3JjL0NvbXBvbmVudHMvRm9ybUxhYmVsL0Zvcm1MYWJlbC52dWUiLCIuLi8uLi92dWUtaW50ZXJmYWNlL3NyYy9Db21wb25lbnRzL0Zvcm1MYWJlbC9pbmRleC5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvc3JjL0NvbXBvbmVudHMvRm9ybUZlZWRiYWNrL0Zvcm1GZWVkYmFjay52dWUiLCIuLi8uLi92dWUtaW50ZXJmYWNlL3NyYy9Db21wb25lbnRzL0Zvcm1GZWVkYmFjay9pbmRleC5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvc3JjL01peGlucy9Gb3JtQ29udHJvbC9Gb3JtQ29udHJvbC5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvc3JjL0NvbXBvbmVudHMvSW5wdXRGaWVsZC9JbnB1dEZpZWxkLnZ1ZSIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvc3JjL0NvbXBvbmVudHMvSW5wdXRGaWVsZC9pbmRleC5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9rZWJhYkNhc2UuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL3NyYy9Db21wb25lbnRzL0FjdGl2aXR5SW5kaWNhdG9yL1R5cGVzL0Jhc2VUeXBlLnZ1ZSIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvc3JjL0NvbXBvbmVudHMvQWN0aXZpdHlJbmRpY2F0b3IvVHlwZXMvRG90cy52dWUiLCIuLi8uLi92dWUtaW50ZXJmYWNlL3NyYy9Db21wb25lbnRzL0FjdGl2aXR5SW5kaWNhdG9yL1R5cGVzL1NwaW5uZXIudnVlIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzRmluaXRlLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9zcmMvSGVscGVycy9Vbml0L1VuaXQuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL3NyYy9Db21wb25lbnRzL0FjdGl2aXR5SW5kaWNhdG9yL0FjdGl2aXR5SW5kaWNhdG9yLnZ1ZSIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvc3JjL0NvbXBvbmVudHMvQWN0aXZpdHlJbmRpY2F0b3IvaW5kZXguanMiLCIuLi9zcmMvUGxhY2VBdXRvY29tcGxldGVGaWVsZC52dWUiLCIuLi9zcmMvUGxhY2VBdXRvY29tcGxldGVMaXN0SXRlbS52dWUiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Fzc2lnbk1lcmdlVmFsdWUuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2Nsb25lQnVmZmVyLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jbG9uZUFycmF5QnVmZmVyLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL19jbG9uZVR5cGVkQXJyYXkuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX2NvcHlBcnJheS5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZUNyZWF0ZS5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9faW5pdENsb25lT2JqZWN0LmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzQXJyYXlMaWtlT2JqZWN0LmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL2lzUGxhaW5PYmplY3QuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvX3NhZmVHZXQuanMiLCIuLi8uLi92dWUtaW50ZXJmYWNlL25vZGVfbW9kdWxlcy9sb2Rhc2gtZXMvdG9QbGFpbk9iamVjdC5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZU1lcmdlRGVlcC5qcyIsIi4uLy4uL3Z1ZS1pbnRlcmZhY2Uvbm9kZV9tb2R1bGVzL2xvZGFzaC1lcy9fYmFzZU1lcmdlLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9ub2RlX21vZHVsZXMvbG9kYXNoLWVzL21lcmdlLmpzIiwiLi4vLi4vdnVlLWludGVyZmFjZS9zcmMvUGx1Z2lucy9NZXJnZUNsYXNzZXMvTWVyZ2VDbGFzc2VzLmpzIiwiLi4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8ubWFwYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWVcbiAqIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBtYXBwZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGFycmF5TWFwKGFycmF5LCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID09IG51bGwgPyAwIDogYXJyYXkubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRlZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXJyYXlNYXA7XG4iLCIvKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gW107XG4gIHRoaXMuc2l6ZSA9IDA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGxpc3RDYWNoZUNsZWFyO1xuIiwiLyoqXG4gKiBQZXJmb3JtcyBhXG4gKiBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogY29tcGFyaXNvbiBiZXR3ZWVuIHR3byB2YWx1ZXMgdG8gZGV0ZXJtaW5lIGlmIHRoZXkgYXJlIGVxdWl2YWxlbnQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdhJzogMSB9O1xuICpcbiAqIF8uZXEob2JqZWN0LCBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoJ2EnLCAnYScpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEoJ2EnLCBPYmplY3QoJ2EnKSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoTmFOLCBOYU4pO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBlcSh2YWx1ZSwgb3RoZXIpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBvdGhlciB8fCAodmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGVxO1xuIiwiaW1wb3J0IGVxIGZyb20gJy4vZXEuanMnO1xuXG4vKipcbiAqIEdldHMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBga2V5YCBpcyBmb3VuZCBpbiBgYXJyYXlgIG9mIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IGtleSBUaGUga2V5IHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBhc3NvY0luZGV4T2YoYXJyYXksIGtleSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICBpZiAoZXEoYXJyYXlbbGVuZ3RoXVswXSwga2V5KSkge1xuICAgICAgcmV0dXJuIGxlbmd0aDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhc3NvY0luZGV4T2Y7XG4iLCJpbXBvcnQgYXNzb2NJbmRleE9mIGZyb20gJy4vX2Fzc29jSW5kZXhPZi5qcyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzcGxpY2UgPSBhcnJheVByb3RvLnNwbGljZTtcblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlRGVsZXRlKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGxhc3RJbmRleCA9IGRhdGEubGVuZ3RoIC0gMTtcbiAgaWYgKGluZGV4ID09IGxhc3RJbmRleCkge1xuICAgIGRhdGEucG9wKCk7XG4gIH0gZWxzZSB7XG4gICAgc3BsaWNlLmNhbGwoZGF0YSwgaW5kZXgsIDEpO1xuICB9XG4gIC0tdGhpcy5zaXplO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbGlzdENhY2hlRGVsZXRlO1xuIiwiaW1wb3J0IGFzc29jSW5kZXhPZiBmcm9tICcuL19hc3NvY0luZGV4T2YuanMnO1xuXG4vKipcbiAqIEdldHMgdGhlIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgcmV0dXJuIGluZGV4IDwgMCA/IHVuZGVmaW5lZCA6IGRhdGFbaW5kZXhdWzFdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBsaXN0Q2FjaGVHZXQ7XG4iLCJpbXBvcnQgYXNzb2NJbmRleE9mIGZyb20gJy4vX2Fzc29jSW5kZXhPZi5qcyc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBhc3NvY0luZGV4T2YodGhpcy5fX2RhdGFfXywga2V5KSA+IC0xO1xufVxuXG5leHBvcnQgZGVmYXVsdCBsaXN0Q2FjaGVIYXM7XG4iLCJpbXBvcnQgYXNzb2NJbmRleE9mIGZyb20gJy4vX2Fzc29jSW5kZXhPZi5qcyc7XG5cbi8qKlxuICogU2V0cyB0aGUgbGlzdCBjYWNoZSBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbGlzdCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgKyt0aGlzLnNpemU7XG4gICAgZGF0YS5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0YVtpbmRleF1bMV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cblxuZXhwb3J0IGRlZmF1bHQgbGlzdENhY2hlU2V0O1xuIiwiaW1wb3J0IGxpc3RDYWNoZUNsZWFyIGZyb20gJy4vX2xpc3RDYWNoZUNsZWFyLmpzJztcbmltcG9ydCBsaXN0Q2FjaGVEZWxldGUgZnJvbSAnLi9fbGlzdENhY2hlRGVsZXRlLmpzJztcbmltcG9ydCBsaXN0Q2FjaGVHZXQgZnJvbSAnLi9fbGlzdENhY2hlR2V0LmpzJztcbmltcG9ydCBsaXN0Q2FjaGVIYXMgZnJvbSAnLi9fbGlzdENhY2hlSGFzLmpzJztcbmltcG9ydCBsaXN0Q2FjaGVTZXQgZnJvbSAnLi9fbGlzdENhY2hlU2V0LmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGxpc3QgY2FjaGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBMaXN0Q2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPT0gbnVsbCA/IDAgOiBlbnRyaWVzLmxlbmd0aDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTGlzdENhY2hlYC5cbkxpc3RDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBsaXN0Q2FjaGVDbGVhcjtcbkxpc3RDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbGlzdENhY2hlRGVsZXRlO1xuTGlzdENhY2hlLnByb3RvdHlwZS5nZXQgPSBsaXN0Q2FjaGVHZXQ7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmhhcyA9IGxpc3RDYWNoZUhhcztcbkxpc3RDYWNoZS5wcm90b3R5cGUuc2V0ID0gbGlzdENhY2hlU2V0O1xuXG5leHBvcnQgZGVmYXVsdCBMaXN0Q2FjaGU7XG4iLCJpbXBvcnQgTGlzdENhY2hlIGZyb20gJy4vX0xpc3RDYWNoZS5qcyc7XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgc3RhY2suXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqL1xuZnVuY3Rpb24gc3RhY2tDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5ldyBMaXN0Q2FjaGU7XG4gIHRoaXMuc2l6ZSA9IDA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0YWNrQ2xlYXI7XG4iLCIvKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBzdGFjay5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzdGFja0RlbGV0ZShrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgcmVzdWx0ID0gZGF0YVsnZGVsZXRlJ10oa2V5KTtcblxuICB0aGlzLnNpemUgPSBkYXRhLnNpemU7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0YWNrRGVsZXRlO1xuIiwiLyoqXG4gKiBHZXRzIHRoZSBzdGFjayB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gc3RhY2tHZXQoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fLmdldChrZXkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdGFja0dldDtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGEgc3RhY2sgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzdGFja0hhcyhrZXkpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uaGFzKGtleSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0YWNrSGFzO1xuIiwiZXhwb3J0IGRlZmF1bHQgdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6XG4gICAgICAgICAgICB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOlxuICAgICAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9XG4iLCIvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG5leHBvcnQgZGVmYXVsdCBmcmVlR2xvYmFsO1xuIiwiaW1wb3J0IGZyZWVHbG9iYWwgZnJvbSAnLi9fZnJlZUdsb2JhbC5qcyc7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuZXhwb3J0IGRlZmF1bHQgcm9vdDtcbiIsImltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcblxuZXhwb3J0IGRlZmF1bHQgU3ltYm9sO1xuIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuL19TeW1ib2wuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlR2V0VGFnYCB3aGljaCBpZ25vcmVzIGBTeW1ib2wudG9TdHJpbmdUYWdgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSByYXcgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UmF3VGFnKHZhbHVlKSB7XG4gIHZhciBpc093biA9IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHN5bVRvU3RyaW5nVGFnKSxcbiAgICAgIHRhZyA9IHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcblxuICB0cnkge1xuICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdW5tYXNrZWQgPSB0cnVlO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgaWYgKHVubWFza2VkKSB7XG4gICAgaWYgKGlzT3duKSB7XG4gICAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB0YWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldFJhd1RhZztcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgdXNpbmcgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBvYmplY3RUb1N0cmluZztcbiIsImltcG9ydCBTeW1ib2wgZnJvbSAnLi9fU3ltYm9sLmpzJztcbmltcG9ydCBnZXRSYXdUYWcgZnJvbSAnLi9fZ2V0UmF3VGFnLmpzJztcbmltcG9ydCBvYmplY3RUb1N0cmluZyBmcm9tICcuL19vYmplY3RUb1N0cmluZy5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nLFxuICAgIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgcmV0dXJuIChzeW1Ub1N0cmluZ1RhZyAmJiBzeW1Ub1N0cmluZ1RhZyBpbiBPYmplY3QodmFsdWUpKVxuICAgID8gZ2V0UmF3VGFnKHZhbHVlKVxuICAgIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlR2V0VGFnO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzT2JqZWN0O1xuIiwiaW1wb3J0IGJhc2VHZXRUYWcgZnJvbSAnLi9fYmFzZUdldFRhZy5qcyc7XG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnLi9pc09iamVjdC5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhc3luY1RhZyA9ICdbb2JqZWN0IEFzeW5jRnVuY3Rpb25dJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nLFxuICAgIHByb3h5VGFnID0gJ1tvYmplY3QgUHJveHldJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA5IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5cyBhbmQgb3RoZXIgY29uc3RydWN0b3JzLlxuICB2YXIgdGFnID0gYmFzZUdldFRhZyh2YWx1ZSk7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnIHx8IHRhZyA9PSBhc3luY1RhZyB8fCB0YWcgPT0gcHJveHlUYWc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzRnVuY3Rpb247XG4iLCJpbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG92ZXJyZWFjaGluZyBjb3JlLWpzIHNoaW1zLiAqL1xudmFyIGNvcmVKc0RhdGEgPSByb290WydfX2NvcmUtanNfc2hhcmVkX18nXTtcblxuZXhwb3J0IGRlZmF1bHQgY29yZUpzRGF0YTtcbiIsImltcG9ydCBjb3JlSnNEYXRhIGZyb20gJy4vX2NvcmVKc0RhdGEuanMnO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWV0aG9kcyBtYXNxdWVyYWRpbmcgYXMgbmF0aXZlLiAqL1xudmFyIG1hc2tTcmNLZXkgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciB1aWQgPSAvW14uXSskLy5leGVjKGNvcmVKc0RhdGEgJiYgY29yZUpzRGF0YS5rZXlzICYmIGNvcmVKc0RhdGEua2V5cy5JRV9QUk9UTyB8fCAnJyk7XG4gIHJldHVybiB1aWQgPyAoJ1N5bWJvbChzcmMpXzEuJyArIHVpZCkgOiAnJztcbn0oKSk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBmdW5jYCBoYXMgaXRzIHNvdXJjZSBtYXNrZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBmdW5jYCBpcyBtYXNrZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNNYXNrZWQoZnVuYykge1xuICByZXR1cm4gISFtYXNrU3JjS2V5ICYmIChtYXNrU3JjS2V5IGluIGZ1bmMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc01hc2tlZDtcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ29udmVydHMgYGZ1bmNgIHRvIGl0cyBzb3VyY2UgY29kZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHNvdXJjZSBjb2RlLlxuICovXG5mdW5jdGlvbiB0b1NvdXJjZShmdW5jKSB7XG4gIGlmIChmdW5jICE9IG51bGwpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGZ1bmNUb1N0cmluZy5jYWxsKGZ1bmMpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoZnVuYyArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiAnJztcbn1cblxuZXhwb3J0IGRlZmF1bHQgdG9Tb3VyY2U7XG4iLCJpbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuL2lzRnVuY3Rpb24uanMnO1xuaW1wb3J0IGlzTWFza2VkIGZyb20gJy4vX2lzTWFza2VkLmpzJztcbmltcG9ydCBpc09iamVjdCBmcm9tICcuL2lzT2JqZWN0LmpzJztcbmltcG9ydCB0b1NvdXJjZSBmcm9tICcuL190b1NvdXJjZS5qcyc7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYFxuICogW3N5bnRheCBjaGFyYWN0ZXJzXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1wYXR0ZXJucykuXG4gKi9cbnZhciByZVJlZ0V4cENoYXIgPSAvW1xcXFxeJC4qKz8oKVtcXF17fXxdL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpKS4gKi9cbnZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGZ1bmNUb1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KS5yZXBsYWNlKHJlUmVnRXhwQ2hhciwgJ1xcXFwkJicpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc05hdGl2ZWAgd2l0aG91dCBiYWQgc2hpbSBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkgfHwgaXNNYXNrZWQodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwYXR0ZXJuID0gaXNGdW5jdGlvbih2YWx1ZSkgPyByZUlzTmF0aXZlIDogcmVJc0hvc3RDdG9yO1xuICByZXR1cm4gcGF0dGVybi50ZXN0KHRvU291cmNlKHZhbHVlKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VJc05hdGl2ZTtcbiIsIi8qKlxuICogR2V0cyB0aGUgdmFsdWUgYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGdldFZhbHVlKG9iamVjdCwga2V5KSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRWYWx1ZTtcbiIsImltcG9ydCBiYXNlSXNOYXRpdmUgZnJvbSAnLi9fYmFzZUlzTmF0aXZlLmpzJztcbmltcG9ydCBnZXRWYWx1ZSBmcm9tICcuL19nZXRWYWx1ZS5qcyc7XG5cbi8qKlxuICogR2V0cyB0aGUgbmF0aXZlIGZ1bmN0aW9uIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIG1ldGhvZCB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZnVuY3Rpb24gaWYgaXQncyBuYXRpdmUsIGVsc2UgYHVuZGVmaW5lZGAuXG4gKi9cbmZ1bmN0aW9uIGdldE5hdGl2ZShvYmplY3QsIGtleSkge1xuICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShvYmplY3QsIGtleSk7XG4gIHJldHVybiBiYXNlSXNOYXRpdmUodmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldE5hdGl2ZTtcbiIsImltcG9ydCBnZXROYXRpdmUgZnJvbSAnLi9fZ2V0TmF0aXZlLmpzJztcbmltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgTWFwID0gZ2V0TmF0aXZlKHJvb3QsICdNYXAnKTtcblxuZXhwb3J0IGRlZmF1bHQgTWFwO1xuIiwiaW1wb3J0IGdldE5hdGl2ZSBmcm9tICcuL19nZXROYXRpdmUuanMnO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgbmF0aXZlQ3JlYXRlID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2NyZWF0ZScpO1xuXG5leHBvcnQgZGVmYXVsdCBuYXRpdmVDcmVhdGU7XG4iLCJpbXBvcnQgbmF0aXZlQ3JlYXRlIGZyb20gJy4vX25hdGl2ZUNyZWF0ZS5qcyc7XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKi9cbmZ1bmN0aW9uIGhhc2hDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5hdGl2ZUNyZWF0ZSA/IG5hdGl2ZUNyZWF0ZShudWxsKSA6IHt9O1xuICB0aGlzLnNpemUgPSAwO1xufVxuXG5leHBvcnQgZGVmYXVsdCBoYXNoQ2xlYXI7XG4iLCIvKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge09iamVjdH0gaGFzaCBUaGUgaGFzaCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaERlbGV0ZShrZXkpIHtcbiAgdmFyIHJlc3VsdCA9IHRoaXMuaGFzKGtleSkgJiYgZGVsZXRlIHRoaXMuX19kYXRhX19ba2V5XTtcbiAgdGhpcy5zaXplIC09IHJlc3VsdCA/IDEgOiAwO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBoYXNoRGVsZXRlO1xuIiwiaW1wb3J0IG5hdGl2ZUNyZWF0ZSBmcm9tICcuL19uYXRpdmVDcmVhdGUuanMnO1xuXG4vKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogR2V0cyB0aGUgaGFzaCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBoYXNoR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChuYXRpdmVDcmVhdGUpIHtcbiAgICB2YXIgcmVzdWx0ID0gZGF0YVtrZXldO1xuICAgIHJldHVybiByZXN1bHQgPT09IEhBU0hfVU5ERUZJTkVEID8gdW5kZWZpbmVkIDogcmVzdWx0O1xuICB9XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSkgPyBkYXRhW2tleV0gOiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGhhc2hHZXQ7XG4iLCJpbXBvcnQgbmF0aXZlQ3JlYXRlIGZyb20gJy4vX25hdGl2ZUNyZWF0ZS5qcyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgaGFzaCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaEhhcyhrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICByZXR1cm4gbmF0aXZlQ3JlYXRlID8gKGRhdGFba2V5XSAhPT0gdW5kZWZpbmVkKSA6IGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaGFzaEhhcztcbiIsImltcG9ydCBuYXRpdmVDcmVhdGUgZnJvbSAnLi9fbmF0aXZlQ3JlYXRlLmpzJztcblxuLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKipcbiAqIFNldHMgdGhlIGhhc2ggYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBoYXNoIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBoYXNoU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICB0aGlzLnNpemUgKz0gdGhpcy5oYXMoa2V5KSA/IDAgOiAxO1xuICBkYXRhW2tleV0gPSAobmF0aXZlQ3JlYXRlICYmIHZhbHVlID09PSB1bmRlZmluZWQpID8gSEFTSF9VTkRFRklORUQgOiB2YWx1ZTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGhhc2hTZXQ7XG4iLCJpbXBvcnQgaGFzaENsZWFyIGZyb20gJy4vX2hhc2hDbGVhci5qcyc7XG5pbXBvcnQgaGFzaERlbGV0ZSBmcm9tICcuL19oYXNoRGVsZXRlLmpzJztcbmltcG9ydCBoYXNoR2V0IGZyb20gJy4vX2hhc2hHZXQuanMnO1xuaW1wb3J0IGhhc2hIYXMgZnJvbSAnLi9faGFzaEhhcy5qcyc7XG5pbXBvcnQgaGFzaFNldCBmcm9tICcuL19oYXNoU2V0LmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgaGFzaCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIEhhc2goZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPT0gbnVsbCA/IDAgOiBlbnRyaWVzLmxlbmd0aDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgSGFzaGAuXG5IYXNoLnByb3RvdHlwZS5jbGVhciA9IGhhc2hDbGVhcjtcbkhhc2gucHJvdG90eXBlWydkZWxldGUnXSA9IGhhc2hEZWxldGU7XG5IYXNoLnByb3RvdHlwZS5nZXQgPSBoYXNoR2V0O1xuSGFzaC5wcm90b3R5cGUuaGFzID0gaGFzaEhhcztcbkhhc2gucHJvdG90eXBlLnNldCA9IGhhc2hTZXQ7XG5cbmV4cG9ydCBkZWZhdWx0IEhhc2g7XG4iLCJpbXBvcnQgSGFzaCBmcm9tICcuL19IYXNoLmpzJztcbmltcG9ydCBMaXN0Q2FjaGUgZnJvbSAnLi9fTGlzdENhY2hlLmpzJztcbmltcG9ydCBNYXAgZnJvbSAnLi9fTWFwLmpzJztcblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVDbGVhcigpIHtcbiAgdGhpcy5zaXplID0gMDtcbiAgdGhpcy5fX2RhdGFfXyA9IHtcbiAgICAnaGFzaCc6IG5ldyBIYXNoLFxuICAgICdtYXAnOiBuZXcgKE1hcCB8fCBMaXN0Q2FjaGUpLFxuICAgICdzdHJpbmcnOiBuZXcgSGFzaFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXBDYWNoZUNsZWFyO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSBmb3IgdXNlIGFzIHVuaXF1ZSBvYmplY3Qga2V5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5YWJsZSh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICh0eXBlID09ICdzdHJpbmcnIHx8IHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnc3ltYm9sJyB8fCB0eXBlID09ICdib29sZWFuJylcbiAgICA/ICh2YWx1ZSAhPT0gJ19fcHJvdG9fXycpXG4gICAgOiAodmFsdWUgPT09IG51bGwpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc0tleWFibGU7XG4iLCJpbXBvcnQgaXNLZXlhYmxlIGZyb20gJy4vX2lzS2V5YWJsZS5qcyc7XG5cbi8qKlxuICogR2V0cyB0aGUgZGF0YSBmb3IgYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIHJlZmVyZW5jZSBrZXkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbWFwIGRhdGEuXG4gKi9cbmZ1bmN0aW9uIGdldE1hcERhdGEobWFwLCBrZXkpIHtcbiAgdmFyIGRhdGEgPSBtYXAuX19kYXRhX187XG4gIHJldHVybiBpc0tleWFibGUoa2V5KVxuICAgID8gZGF0YVt0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8gJ3N0cmluZycgOiAnaGFzaCddXG4gICAgOiBkYXRhLm1hcDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0TWFwRGF0YTtcbiIsImltcG9ydCBnZXRNYXBEYXRhIGZyb20gJy4vX2dldE1hcERhdGEuanMnO1xuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVEZWxldGUoa2V5KSB7XG4gIHZhciByZXN1bHQgPSBnZXRNYXBEYXRhKHRoaXMsIGtleSlbJ2RlbGV0ZSddKGtleSk7XG4gIHRoaXMuc2l6ZSAtPSByZXN1bHQgPyAxIDogMDtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWFwQ2FjaGVEZWxldGU7XG4iLCJpbXBvcnQgZ2V0TWFwRGF0YSBmcm9tICcuL19nZXRNYXBEYXRhLmpzJztcblxuLyoqXG4gKiBHZXRzIHRoZSBtYXAgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlR2V0KGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmdldChrZXkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXBDYWNoZUdldDtcbiIsImltcG9ydCBnZXRNYXBEYXRhIGZyb20gJy4vX2dldE1hcERhdGEuanMnO1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIG1hcCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmhhcyhrZXkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXBDYWNoZUhhcztcbiIsImltcG9ydCBnZXRNYXBEYXRhIGZyb20gJy4vX2dldE1hcERhdGEuanMnO1xuXG4vKipcbiAqIFNldHMgdGhlIG1hcCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBtYXAgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSBnZXRNYXBEYXRhKHRoaXMsIGtleSksXG4gICAgICBzaXplID0gZGF0YS5zaXplO1xuXG4gIGRhdGEuc2V0KGtleSwgdmFsdWUpO1xuICB0aGlzLnNpemUgKz0gZGF0YS5zaXplID09IHNpemUgPyAwIDogMTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1hcENhY2hlU2V0O1xuIiwiaW1wb3J0IG1hcENhY2hlQ2xlYXIgZnJvbSAnLi9fbWFwQ2FjaGVDbGVhci5qcyc7XG5pbXBvcnQgbWFwQ2FjaGVEZWxldGUgZnJvbSAnLi9fbWFwQ2FjaGVEZWxldGUuanMnO1xuaW1wb3J0IG1hcENhY2hlR2V0IGZyb20gJy4vX21hcENhY2hlR2V0LmpzJztcbmltcG9ydCBtYXBDYWNoZUhhcyBmcm9tICcuL19tYXBDYWNoZUhhcy5qcyc7XG5pbXBvcnQgbWFwQ2FjaGVTZXQgZnJvbSAnLi9fbWFwQ2FjaGVTZXQuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXAgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTWFwQ2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPT0gbnVsbCA/IDAgOiBlbnRyaWVzLmxlbmd0aDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTWFwQ2FjaGVgLlxuTWFwQ2FjaGUucHJvdG90eXBlLmNsZWFyID0gbWFwQ2FjaGVDbGVhcjtcbk1hcENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBtYXBDYWNoZURlbGV0ZTtcbk1hcENhY2hlLnByb3RvdHlwZS5nZXQgPSBtYXBDYWNoZUdldDtcbk1hcENhY2hlLnByb3RvdHlwZS5oYXMgPSBtYXBDYWNoZUhhcztcbk1hcENhY2hlLnByb3RvdHlwZS5zZXQgPSBtYXBDYWNoZVNldDtcblxuZXhwb3J0IGRlZmF1bHQgTWFwQ2FjaGU7XG4iLCJpbXBvcnQgTGlzdENhY2hlIGZyb20gJy4vX0xpc3RDYWNoZS5qcyc7XG5pbXBvcnQgTWFwIGZyb20gJy4vX01hcC5qcyc7XG5pbXBvcnQgTWFwQ2FjaGUgZnJvbSAnLi9fTWFwQ2FjaGUuanMnO1xuXG4vKiogVXNlZCBhcyB0aGUgc2l6ZSB0byBlbmFibGUgbGFyZ2UgYXJyYXkgb3B0aW1pemF0aW9ucy4gKi9cbnZhciBMQVJHRV9BUlJBWV9TSVpFID0gMjAwO1xuXG4vKipcbiAqIFNldHMgdGhlIHN0YWNrIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIHN0YWNrIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBzdGFja1NldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgaWYgKGRhdGEgaW5zdGFuY2VvZiBMaXN0Q2FjaGUpIHtcbiAgICB2YXIgcGFpcnMgPSBkYXRhLl9fZGF0YV9fO1xuICAgIGlmICghTWFwIHx8IChwYWlycy5sZW5ndGggPCBMQVJHRV9BUlJBWV9TSVpFIC0gMSkpIHtcbiAgICAgIHBhaXJzLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgICAgIHRoaXMuc2l6ZSA9ICsrZGF0YS5zaXplO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGRhdGEgPSB0aGlzLl9fZGF0YV9fID0gbmV3IE1hcENhY2hlKHBhaXJzKTtcbiAgfVxuICBkYXRhLnNldChrZXksIHZhbHVlKTtcbiAgdGhpcy5zaXplID0gZGF0YS5zaXplO1xuICByZXR1cm4gdGhpcztcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RhY2tTZXQ7XG4iLCJpbXBvcnQgTGlzdENhY2hlIGZyb20gJy4vX0xpc3RDYWNoZS5qcyc7XG5pbXBvcnQgc3RhY2tDbGVhciBmcm9tICcuL19zdGFja0NsZWFyLmpzJztcbmltcG9ydCBzdGFja0RlbGV0ZSBmcm9tICcuL19zdGFja0RlbGV0ZS5qcyc7XG5pbXBvcnQgc3RhY2tHZXQgZnJvbSAnLi9fc3RhY2tHZXQuanMnO1xuaW1wb3J0IHN0YWNrSGFzIGZyb20gJy4vX3N0YWNrSGFzLmpzJztcbmltcG9ydCBzdGFja1NldCBmcm9tICcuL19zdGFja1NldC5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHN0YWNrIGNhY2hlIG9iamVjdCB0byBzdG9yZSBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIFN0YWNrKGVudHJpZXMpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fID0gbmV3IExpc3RDYWNoZShlbnRyaWVzKTtcbiAgdGhpcy5zaXplID0gZGF0YS5zaXplO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgU3RhY2tgLlxuU3RhY2sucHJvdG90eXBlLmNsZWFyID0gc3RhY2tDbGVhcjtcblN0YWNrLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBzdGFja0RlbGV0ZTtcblN0YWNrLnByb3RvdHlwZS5nZXQgPSBzdGFja0dldDtcblN0YWNrLnByb3RvdHlwZS5oYXMgPSBzdGFja0hhcztcblN0YWNrLnByb3RvdHlwZS5zZXQgPSBzdGFja1NldDtcblxuZXhwb3J0IGRlZmF1bHQgU3RhY2s7XG4iLCIvKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKlxuICogQWRkcyBgdmFsdWVgIHRvIHRoZSBhcnJheSBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgYWRkXG4gKiBAbWVtYmVyT2YgU2V0Q2FjaGVcbiAqIEBhbGlhcyBwdXNoXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjYWNoZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBzZXRDYWNoZUFkZCh2YWx1ZSkge1xuICB0aGlzLl9fZGF0YV9fLnNldCh2YWx1ZSwgSEFTSF9VTkRFRklORUQpO1xuICByZXR1cm4gdGhpcztcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2V0Q2FjaGVBZGQ7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGluIHRoZSBhcnJheSBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgU2V0Q2FjaGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGZvdW5kLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHNldENhY2hlSGFzKHZhbHVlKSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fLmhhcyh2YWx1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNldENhY2hlSGFzO1xuIiwiaW1wb3J0IE1hcENhY2hlIGZyb20gJy4vX01hcENhY2hlLmpzJztcbmltcG9ydCBzZXRDYWNoZUFkZCBmcm9tICcuL19zZXRDYWNoZUFkZC5qcyc7XG5pbXBvcnQgc2V0Q2FjaGVIYXMgZnJvbSAnLi9fc2V0Q2FjaGVIYXMuanMnO1xuXG4vKipcbiAqXG4gKiBDcmVhdGVzIGFuIGFycmF5IGNhY2hlIG9iamVjdCB0byBzdG9yZSB1bmlxdWUgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFt2YWx1ZXNdIFRoZSB2YWx1ZXMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIFNldENhY2hlKHZhbHVlcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHZhbHVlcyA9PSBudWxsID8gMCA6IHZhbHVlcy5sZW5ndGg7XG5cbiAgdGhpcy5fX2RhdGFfXyA9IG5ldyBNYXBDYWNoZTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB0aGlzLmFkZCh2YWx1ZXNbaW5kZXhdKTtcbiAgfVxufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgU2V0Q2FjaGVgLlxuU2V0Q2FjaGUucHJvdG90eXBlLmFkZCA9IFNldENhY2hlLnByb3RvdHlwZS5wdXNoID0gc2V0Q2FjaGVBZGQ7XG5TZXRDYWNoZS5wcm90b3R5cGUuaGFzID0gc2V0Q2FjaGVIYXM7XG5cbmV4cG9ydCBkZWZhdWx0IFNldENhY2hlO1xuIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uc29tZWAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlXG4gKiBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbnkgZWxlbWVudCBwYXNzZXMgdGhlIHByZWRpY2F0ZSBjaGVjayxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5U29tZShhcnJheSwgcHJlZGljYXRlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPT0gbnVsbCA/IDAgOiBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAocHJlZGljYXRlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXJyYXlTb21lO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYSBgY2FjaGVgIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBjYWNoZSBUaGUgY2FjaGUgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gY2FjaGVIYXMoY2FjaGUsIGtleSkge1xuICByZXR1cm4gY2FjaGUuaGFzKGtleSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNhY2hlSGFzO1xuIiwiaW1wb3J0IFNldENhY2hlIGZyb20gJy4vX1NldENhY2hlLmpzJztcbmltcG9ydCBhcnJheVNvbWUgZnJvbSAnLi9fYXJyYXlTb21lLmpzJztcbmltcG9ydCBjYWNoZUhhcyBmcm9tICcuL19jYWNoZUhhcy5qcyc7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIHZhbHVlIGNvbXBhcmlzb25zLiAqL1xudmFyIENPTVBBUkVfUEFSVElBTF9GTEFHID0gMSxcbiAgICBDT01QQVJFX1VOT1JERVJFRF9GTEFHID0gMjtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIGFycmF5cyB3aXRoIHN1cHBvcnQgZm9yXG4gKiBwYXJ0aWFsIGRlZXAgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtBcnJheX0gb3RoZXIgVGhlIG90aGVyIGFycmF5IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGFjayBUcmFja3MgdHJhdmVyc2VkIGBhcnJheWAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYXJyYXlzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsQXJyYXlzKGFycmF5LCBvdGhlciwgYml0bWFzaywgY3VzdG9taXplciwgZXF1YWxGdW5jLCBzdGFjaykge1xuICB2YXIgaXNQYXJ0aWFsID0gYml0bWFzayAmIENPTVBBUkVfUEFSVElBTF9GTEFHLFxuICAgICAgYXJyTGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgb3RoTGVuZ3RoID0gb3RoZXIubGVuZ3RoO1xuXG4gIGlmIChhcnJMZW5ndGggIT0gb3RoTGVuZ3RoICYmICEoaXNQYXJ0aWFsICYmIG90aExlbmd0aCA+IGFyckxlbmd0aCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gQXNzdW1lIGN5Y2xpYyB2YWx1ZXMgYXJlIGVxdWFsLlxuICB2YXIgc3RhY2tlZCA9IHN0YWNrLmdldChhcnJheSk7XG4gIGlmIChzdGFja2VkICYmIHN0YWNrLmdldChvdGhlcikpIHtcbiAgICByZXR1cm4gc3RhY2tlZCA9PSBvdGhlcjtcbiAgfVxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IHRydWUsXG4gICAgICBzZWVuID0gKGJpdG1hc2sgJiBDT01QQVJFX1VOT1JERVJFRF9GTEFHKSA/IG5ldyBTZXRDYWNoZSA6IHVuZGVmaW5lZDtcblxuICBzdGFjay5zZXQoYXJyYXksIG90aGVyKTtcbiAgc3RhY2suc2V0KG90aGVyLCBhcnJheSk7XG5cbiAgLy8gSWdub3JlIG5vbi1pbmRleCBwcm9wZXJ0aWVzLlxuICB3aGlsZSAoKytpbmRleCA8IGFyckxlbmd0aCkge1xuICAgIHZhciBhcnJWYWx1ZSA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgb3RoVmFsdWUgPSBvdGhlcltpbmRleF07XG5cbiAgICBpZiAoY3VzdG9taXplcikge1xuICAgICAgdmFyIGNvbXBhcmVkID0gaXNQYXJ0aWFsXG4gICAgICAgID8gY3VzdG9taXplcihvdGhWYWx1ZSwgYXJyVmFsdWUsIGluZGV4LCBvdGhlciwgYXJyYXksIHN0YWNrKVxuICAgICAgICA6IGN1c3RvbWl6ZXIoYXJyVmFsdWUsIG90aFZhbHVlLCBpbmRleCwgYXJyYXksIG90aGVyLCBzdGFjayk7XG4gICAgfVxuICAgIGlmIChjb21wYXJlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoY29tcGFyZWQpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIGlmIChzZWVuKSB7XG4gICAgICBpZiAoIWFycmF5U29tZShvdGhlciwgZnVuY3Rpb24ob3RoVmFsdWUsIG90aEluZGV4KSB7XG4gICAgICAgICAgICBpZiAoIWNhY2hlSGFzKHNlZW4sIG90aEluZGV4KSAmJlxuICAgICAgICAgICAgICAgIChhcnJWYWx1ZSA9PT0gb3RoVmFsdWUgfHwgZXF1YWxGdW5jKGFyclZhbHVlLCBvdGhWYWx1ZSwgYml0bWFzaywgY3VzdG9taXplciwgc3RhY2spKSkge1xuICAgICAgICAgICAgICByZXR1cm4gc2Vlbi5wdXNoKG90aEluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSkge1xuICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghKFxuICAgICAgICAgIGFyclZhbHVlID09PSBvdGhWYWx1ZSB8fFxuICAgICAgICAgICAgZXF1YWxGdW5jKGFyclZhbHVlLCBvdGhWYWx1ZSwgYml0bWFzaywgY3VzdG9taXplciwgc3RhY2spXG4gICAgICAgICkpIHtcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHN0YWNrWydkZWxldGUnXShhcnJheSk7XG4gIHN0YWNrWydkZWxldGUnXShvdGhlcik7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGVxdWFsQXJyYXlzO1xuIiwiaW1wb3J0IHJvb3QgZnJvbSAnLi9fcm9vdC5qcyc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFVpbnQ4QXJyYXkgPSByb290LlVpbnQ4QXJyYXk7XG5cbmV4cG9ydCBkZWZhdWx0IFVpbnQ4QXJyYXk7XG4iLCIvKipcbiAqIENvbnZlcnRzIGBtYXBgIHRvIGl0cyBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBrZXktdmFsdWUgcGFpcnMuXG4gKi9cbmZ1bmN0aW9uIG1hcFRvQXJyYXkobWFwKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobWFwLnNpemUpO1xuXG4gIG1hcC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSBba2V5LCB2YWx1ZV07XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXBUb0FycmF5O1xuIiwiLyoqXG4gKiBDb252ZXJ0cyBgc2V0YCB0byBhbiBhcnJheSBvZiBpdHMgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc2V0IFRoZSBzZXQgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgdmFsdWVzLlxuICovXG5mdW5jdGlvbiBzZXRUb0FycmF5KHNldCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KHNldC5zaXplKTtcblxuICBzZXQuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IHZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2V0VG9BcnJheTtcbiIsImltcG9ydCBTeW1ib2wgZnJvbSAnLi9fU3ltYm9sLmpzJztcbmltcG9ydCBVaW50OEFycmF5IGZyb20gJy4vX1VpbnQ4QXJyYXkuanMnO1xuaW1wb3J0IGVxIGZyb20gJy4vZXEuanMnO1xuaW1wb3J0IGVxdWFsQXJyYXlzIGZyb20gJy4vX2VxdWFsQXJyYXlzLmpzJztcbmltcG9ydCBtYXBUb0FycmF5IGZyb20gJy4vX21hcFRvQXJyYXkuanMnO1xuaW1wb3J0IHNldFRvQXJyYXkgZnJvbSAnLi9fc2V0VG9BcnJheS5qcyc7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIHZhbHVlIGNvbXBhcmlzb25zLiAqL1xudmFyIENPTVBBUkVfUEFSVElBTF9GTEFHID0gMSxcbiAgICBDT01QQVJFX1VOT1JERVJFRF9GTEFHID0gMjtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXScsXG4gICAgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nO1xuXG4vKiogVXNlZCB0byBjb252ZXJ0IHN5bWJvbHMgdG8gcHJpbWl0aXZlcyBhbmQgc3RyaW5ncy4gKi9cbnZhciBzeW1ib2xQcm90byA9IFN5bWJvbCA/IFN5bWJvbC5wcm90b3R5cGUgOiB1bmRlZmluZWQsXG4gICAgc3ltYm9sVmFsdWVPZiA9IHN5bWJvbFByb3RvID8gc3ltYm9sUHJvdG8udmFsdWVPZiA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIGNvbXBhcmluZyBvYmplY3RzIG9mXG4gKiB0aGUgc2FtZSBgdG9TdHJpbmdUYWdgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIG9ubHkgc3VwcG9ydHMgY29tcGFyaW5nIHZhbHVlcyB3aXRoIHRhZ3Mgb2ZcbiAqIGBCb29sZWFuYCwgYERhdGVgLCBgRXJyb3JgLCBgTnVtYmVyYCwgYFJlZ0V4cGAsIG9yIGBTdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnIFRoZSBgdG9TdHJpbmdUYWdgIG9mIHRoZSBvYmplY3RzIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGFjayBUcmFja3MgdHJhdmVyc2VkIGBvYmplY3RgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxCeVRhZyhvYmplY3QsIG90aGVyLCB0YWcsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spIHtcbiAgc3dpdGNoICh0YWcpIHtcbiAgICBjYXNlIGRhdGFWaWV3VGFnOlxuICAgICAgaWYgKChvYmplY3QuYnl0ZUxlbmd0aCAhPSBvdGhlci5ieXRlTGVuZ3RoKSB8fFxuICAgICAgICAgIChvYmplY3QuYnl0ZU9mZnNldCAhPSBvdGhlci5ieXRlT2Zmc2V0KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBvYmplY3QgPSBvYmplY3QuYnVmZmVyO1xuICAgICAgb3RoZXIgPSBvdGhlci5idWZmZXI7XG5cbiAgICBjYXNlIGFycmF5QnVmZmVyVGFnOlxuICAgICAgaWYgKChvYmplY3QuYnl0ZUxlbmd0aCAhPSBvdGhlci5ieXRlTGVuZ3RoKSB8fFxuICAgICAgICAgICFlcXVhbEZ1bmMobmV3IFVpbnQ4QXJyYXkob2JqZWN0KSwgbmV3IFVpbnQ4QXJyYXkob3RoZXIpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIGNhc2UgYm9vbFRhZzpcbiAgICBjYXNlIGRhdGVUYWc6XG4gICAgY2FzZSBudW1iZXJUYWc6XG4gICAgICAvLyBDb2VyY2UgYm9vbGVhbnMgdG8gYDFgIG9yIGAwYCBhbmQgZGF0ZXMgdG8gbWlsbGlzZWNvbmRzLlxuICAgICAgLy8gSW52YWxpZCBkYXRlcyBhcmUgY29lcmNlZCB0byBgTmFOYC5cbiAgICAgIHJldHVybiBlcSgrb2JqZWN0LCArb3RoZXIpO1xuXG4gICAgY2FzZSBlcnJvclRhZzpcbiAgICAgIHJldHVybiBvYmplY3QubmFtZSA9PSBvdGhlci5uYW1lICYmIG9iamVjdC5tZXNzYWdlID09IG90aGVyLm1lc3NhZ2U7XG5cbiAgICBjYXNlIHJlZ2V4cFRhZzpcbiAgICBjYXNlIHN0cmluZ1RhZzpcbiAgICAgIC8vIENvZXJjZSByZWdleGVzIHRvIHN0cmluZ3MgYW5kIHRyZWF0IHN0cmluZ3MsIHByaW1pdGl2ZXMgYW5kIG9iamVjdHMsXG4gICAgICAvLyBhcyBlcXVhbC4gU2VlIGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1yZWdleHAucHJvdG90eXBlLnRvc3RyaW5nXG4gICAgICAvLyBmb3IgbW9yZSBkZXRhaWxzLlxuICAgICAgcmV0dXJuIG9iamVjdCA9PSAob3RoZXIgKyAnJyk7XG5cbiAgICBjYXNlIG1hcFRhZzpcbiAgICAgIHZhciBjb252ZXJ0ID0gbWFwVG9BcnJheTtcblxuICAgIGNhc2Ugc2V0VGFnOlxuICAgICAgdmFyIGlzUGFydGlhbCA9IGJpdG1hc2sgJiBDT01QQVJFX1BBUlRJQUxfRkxBRztcbiAgICAgIGNvbnZlcnQgfHwgKGNvbnZlcnQgPSBzZXRUb0FycmF5KTtcblxuICAgICAgaWYgKG9iamVjdC5zaXplICE9IG90aGVyLnNpemUgJiYgIWlzUGFydGlhbCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyBBc3N1bWUgY3ljbGljIHZhbHVlcyBhcmUgZXF1YWwuXG4gICAgICB2YXIgc3RhY2tlZCA9IHN0YWNrLmdldChvYmplY3QpO1xuICAgICAgaWYgKHN0YWNrZWQpIHtcbiAgICAgICAgcmV0dXJuIHN0YWNrZWQgPT0gb3RoZXI7XG4gICAgICB9XG4gICAgICBiaXRtYXNrIHw9IENPTVBBUkVfVU5PUkRFUkVEX0ZMQUc7XG5cbiAgICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgb2JqZWN0cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgICAgc3RhY2suc2V0KG9iamVjdCwgb3RoZXIpO1xuICAgICAgdmFyIHJlc3VsdCA9IGVxdWFsQXJyYXlzKGNvbnZlcnQob2JqZWN0KSwgY29udmVydChvdGhlciksIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spO1xuICAgICAgc3RhY2tbJ2RlbGV0ZSddKG9iamVjdCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuXG4gICAgY2FzZSBzeW1ib2xUYWc6XG4gICAgICBpZiAoc3ltYm9sVmFsdWVPZikge1xuICAgICAgICByZXR1cm4gc3ltYm9sVmFsdWVPZi5jYWxsKG9iamVjdCkgPT0gc3ltYm9sVmFsdWVPZi5jYWxsKG90aGVyKTtcbiAgICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGVxdWFsQnlUYWc7XG4iLCIvKipcbiAqIEFwcGVuZHMgdGhlIGVsZW1lbnRzIG9mIGB2YWx1ZXNgIHRvIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXMgVGhlIHZhbHVlcyB0byBhcHBlbmQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlQdXNoKGFycmF5LCB2YWx1ZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSB2YWx1ZXMubGVuZ3RoLFxuICAgICAgb2Zmc2V0ID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYXJyYXlbb2Zmc2V0ICsgaW5kZXhdID0gdmFsdWVzW2luZGV4XTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFycmF5UHVzaDtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheSgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG5leHBvcnQgZGVmYXVsdCBpc0FycmF5O1xuIiwiaW1wb3J0IGFycmF5UHVzaCBmcm9tICcuL19hcnJheVB1c2guanMnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5LmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0QWxsS2V5c2AgYW5kIGBnZXRBbGxLZXlzSW5gIHdoaWNoIHVzZXNcbiAqIGBrZXlzRnVuY2AgYW5kIGBzeW1ib2xzRnVuY2AgdG8gZ2V0IHRoZSBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIGFuZFxuICogc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtGdW5jdGlvbn0ga2V5c0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUga2V5cyBvZiBgb2JqZWN0YC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHN5bWJvbHNGdW5jIFRoZSBmdW5jdGlvbiB0byBnZXQgdGhlIHN5bWJvbHMgb2YgYG9iamVjdGAuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzIGFuZCBzeW1ib2xzLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0QWxsS2V5cyhvYmplY3QsIGtleXNGdW5jLCBzeW1ib2xzRnVuYykge1xuICB2YXIgcmVzdWx0ID0ga2V5c0Z1bmMob2JqZWN0KTtcbiAgcmV0dXJuIGlzQXJyYXkob2JqZWN0KSA/IHJlc3VsdCA6IGFycmF5UHVzaChyZXN1bHQsIHN5bWJvbHNGdW5jKG9iamVjdCkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlR2V0QWxsS2V5cztcbiIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmZpbHRlcmAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGZpbHRlcmVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBhcnJheUZpbHRlcihhcnJheSwgcHJlZGljYXRlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPT0gbnVsbCA/IDAgOiBhcnJheS5sZW5ndGgsXG4gICAgICByZXNJbmRleCA9IDAsXG4gICAgICByZXN1bHQgPSBbXTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XTtcbiAgICBpZiAocHJlZGljYXRlKHZhbHVlLCBpbmRleCwgYXJyYXkpKSB7XG4gICAgICByZXN1bHRbcmVzSW5kZXgrK10gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXJyYXlGaWx0ZXI7XG4iLCIvKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgYSBuZXcgZW1wdHkgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjEzLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBlbXB0eSBhcnJheS5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIGFycmF5cyA9IF8udGltZXMoMiwgXy5zdHViQXJyYXkpO1xuICpcbiAqIGNvbnNvbGUubG9nKGFycmF5cyk7XG4gKiAvLyA9PiBbW10sIFtdXVxuICpcbiAqIGNvbnNvbGUubG9nKGFycmF5c1swXSA9PT0gYXJyYXlzWzFdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIHN0dWJBcnJheSgpIHtcbiAgcmV0dXJuIFtdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHViQXJyYXk7XG4iLCJpbXBvcnQgYXJyYXlGaWx0ZXIgZnJvbSAnLi9fYXJyYXlGaWx0ZXIuanMnO1xuaW1wb3J0IHN0dWJBcnJheSBmcm9tICcuL3N0dWJBcnJheS5qcyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVHZXRTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBzeW1ib2xzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHN5bWJvbHMuXG4gKi9cbnZhciBnZXRTeW1ib2xzID0gIW5hdGl2ZUdldFN5bWJvbHMgPyBzdHViQXJyYXkgOiBmdW5jdGlvbihvYmplY3QpIHtcbiAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICByZXR1cm4gYXJyYXlGaWx0ZXIobmF0aXZlR2V0U3ltYm9scyhvYmplY3QpLCBmdW5jdGlvbihzeW1ib2wpIHtcbiAgICByZXR1cm4gcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChvYmplY3QsIHN5bWJvbCk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2V0U3ltYm9scztcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udGltZXNgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kc1xuICogb3IgbWF4IGFycmF5IGxlbmd0aCBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gaW52b2tlIGBpdGVyYXRlZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiByZXN1bHRzLlxuICovXG5mdW5jdGlvbiBiYXNlVGltZXMobiwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShuKTtcblxuICB3aGlsZSAoKytpbmRleCA8IG4pIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoaW5kZXgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VUaW1lcztcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc09iamVjdExpa2U7XG4iLCJpbXBvcnQgYmFzZUdldFRhZyBmcm9tICcuL19iYXNlR2V0VGFnLmpzJztcbmltcG9ydCBpc09iamVjdExpa2UgZnJvbSAnLi9pc09iamVjdExpa2UuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzQXJndW1lbnRzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0FyZ3VtZW50cyh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBiYXNlR2V0VGFnKHZhbHVlKSA9PSBhcmdzVGFnO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlSXNBcmd1bWVudHM7XG4iLCJpbXBvcnQgYmFzZUlzQXJndW1lbnRzIGZyb20gJy4vX2Jhc2VJc0FyZ3VtZW50cy5qcyc7XG5pbXBvcnQgaXNPYmplY3RMaWtlIGZyb20gJy4vaXNPYmplY3RMaWtlLmpzJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGBhcmd1bWVudHNgIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJndW1lbnRzID0gYmFzZUlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID8gYmFzZUlzQXJndW1lbnRzIDogZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpICYmXG4gICAgIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodmFsdWUsICdjYWxsZWUnKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGlzQXJndW1lbnRzO1xuIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIGBmYWxzZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjEzLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRpbWVzKDIsIF8uc3R1YkZhbHNlKTtcbiAqIC8vID0+IFtmYWxzZSwgZmFsc2VdXG4gKi9cbmZ1bmN0aW9uIHN0dWJGYWxzZSgpIHtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHViRmFsc2U7XG4iLCJpbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcbmltcG9ydCBzdHViRmFsc2UgZnJvbSAnLi9zdHViRmFsc2UuanMnO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgLiAqL1xudmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuICovXG52YXIgZnJlZU1vZHVsZSA9IGZyZWVFeHBvcnRzICYmIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuXG4vKiogRGV0ZWN0IHRoZSBwb3B1bGFyIENvbW1vbkpTIGV4dGVuc2lvbiBgbW9kdWxlLmV4cG9ydHNgLiAqL1xudmFyIG1vZHVsZUV4cG9ydHMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUuZXhwb3J0cyA9PT0gZnJlZUV4cG9ydHM7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIEJ1ZmZlciA9IG1vZHVsZUV4cG9ydHMgPyByb290LkJ1ZmZlciA6IHVuZGVmaW5lZDtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUlzQnVmZmVyID0gQnVmZmVyID8gQnVmZmVyLmlzQnVmZmVyIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgYnVmZmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4zLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgYnVmZmVyLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNCdWZmZXIobmV3IEJ1ZmZlcigyKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0J1ZmZlcihuZXcgVWludDhBcnJheSgyKSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNCdWZmZXIgPSBuYXRpdmVJc0J1ZmZlciB8fCBzdHViRmFsc2U7XG5cbmV4cG9ydCBkZWZhdWx0IGlzQnVmZmVyO1xuIiwiLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eKD86MHxbMS05XVxcZCopJC87XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG5cbiAgcmV0dXJuICEhbGVuZ3RoICYmXG4gICAgKHR5cGUgPT0gJ251bWJlcicgfHxcbiAgICAgICh0eXBlICE9ICdzeW1ib2wnICYmIHJlSXNVaW50LnRlc3QodmFsdWUpKSkgJiZcbiAgICAgICAgKHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc0luZGV4O1xuIiwiLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgbG9vc2VseSBiYXNlZCBvblxuICogW2BUb0xlbmd0aGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTGVuZ3RoKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNMZW5ndGgoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoSW5maW5pdHkpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmXG4gICAgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc0xlbmd0aDtcbiIsImltcG9ydCBiYXNlR2V0VGFnIGZyb20gJy4vX2Jhc2VHZXRUYWcuanMnO1xuaW1wb3J0IGlzTGVuZ3RoIGZyb20gJy4vaXNMZW5ndGguanMnO1xuaW1wb3J0IGlzT2JqZWN0TGlrZSBmcm9tICcuL2lzT2JqZWN0TGlrZS5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXScsXG4gICAgd2Vha01hcFRhZyA9ICdbb2JqZWN0IFdlYWtNYXBdJztcblxudmFyIGFycmF5QnVmZmVyVGFnID0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJyxcbiAgICBkYXRhVmlld1RhZyA9ICdbb2JqZWN0IERhdGFWaWV3XScsXG4gICAgZmxvYXQzMlRhZyA9ICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgIGZsb2F0NjRUYWcgPSAnW29iamVjdCBGbG9hdDY0QXJyYXldJyxcbiAgICBpbnQ4VGFnID0gJ1tvYmplY3QgSW50OEFycmF5XScsXG4gICAgaW50MTZUYWcgPSAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgaW50MzJUYWcgPSAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgdWludDhUYWcgPSAnW29iamVjdCBVaW50OEFycmF5XScsXG4gICAgdWludDhDbGFtcGVkVGFnID0gJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICB1aW50MTZUYWcgPSAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgIHVpbnQzMlRhZyA9ICdbb2JqZWN0IFVpbnQzMkFycmF5XSc7XG5cbi8qKiBVc2VkIHRvIGlkZW50aWZ5IGB0b1N0cmluZ1RhZ2AgdmFsdWVzIG9mIHR5cGVkIGFycmF5cy4gKi9cbnZhciB0eXBlZEFycmF5VGFncyA9IHt9O1xudHlwZWRBcnJheVRhZ3NbZmxvYXQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1tmbG9hdDY0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQ4VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2ludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50OFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDhDbGFtcGVkVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDMyVGFnXSA9IHRydWU7XG50eXBlZEFycmF5VGFnc1thcmdzVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2FycmF5VGFnXSA9XG50eXBlZEFycmF5VGFnc1thcnJheUJ1ZmZlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tib29sVGFnXSA9XG50eXBlZEFycmF5VGFnc1tkYXRhVmlld1RhZ10gPSB0eXBlZEFycmF5VGFnc1tkYXRlVGFnXSA9XG50eXBlZEFycmF5VGFnc1tlcnJvclRhZ10gPSB0eXBlZEFycmF5VGFnc1tmdW5jVGFnXSA9XG50eXBlZEFycmF5VGFnc1ttYXBUYWddID0gdHlwZWRBcnJheVRhZ3NbbnVtYmVyVGFnXSA9XG50eXBlZEFycmF5VGFnc1tvYmplY3RUYWddID0gdHlwZWRBcnJheVRhZ3NbcmVnZXhwVGFnXSA9XG50eXBlZEFycmF5VGFnc1tzZXRUYWddID0gdHlwZWRBcnJheVRhZ3Nbc3RyaW5nVGFnXSA9XG50eXBlZEFycmF5VGFnc1t3ZWFrTWFwVGFnXSA9IGZhbHNlO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzVHlwZWRBcnJheWAgd2l0aG91dCBOb2RlLmpzIG9wdGltaXphdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB0eXBlZCBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNUeXBlZEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmXG4gICAgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhIXR5cGVkQXJyYXlUYWdzW2Jhc2VHZXRUYWcodmFsdWUpXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUlzVHlwZWRBcnJheTtcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udW5hcnlgIHdpdGhvdXQgc3VwcG9ydCBmb3Igc3RvcmluZyBtZXRhZGF0YS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2FwIGFyZ3VtZW50cyBmb3IuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjYXBwZWQgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VVbmFyeShmdW5jKSB7XG4gIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBmdW5jKHZhbHVlKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZVVuYXJ5O1xuIiwiaW1wb3J0IGZyZWVHbG9iYWwgZnJvbSAnLi9fZnJlZUdsb2JhbC5qcyc7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZXhwb3J0c2AuICovXG52YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC4gKi9cbnZhciBmcmVlTW9kdWxlID0gZnJlZUV4cG9ydHMgJiYgdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgIW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cbi8qKiBEZXRlY3QgdGhlIHBvcHVsYXIgQ29tbW9uSlMgZXh0ZW5zaW9uIGBtb2R1bGUuZXhwb3J0c2AuICovXG52YXIgbW9kdWxlRXhwb3J0cyA9IGZyZWVNb2R1bGUgJiYgZnJlZU1vZHVsZS5leHBvcnRzID09PSBmcmVlRXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBwcm9jZXNzYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZVByb2Nlc3MgPSBtb2R1bGVFeHBvcnRzICYmIGZyZWVHbG9iYWwucHJvY2VzcztcblxuLyoqIFVzZWQgdG8gYWNjZXNzIGZhc3RlciBOb2RlLmpzIGhlbHBlcnMuICovXG52YXIgbm9kZVV0aWwgPSAoZnVuY3Rpb24oKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGZyZWVQcm9jZXNzICYmIGZyZWVQcm9jZXNzLmJpbmRpbmcgJiYgZnJlZVByb2Nlc3MuYmluZGluZygndXRpbCcpO1xuICB9IGNhdGNoIChlKSB7fVxufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgbm9kZVV0aWw7XG4iLCJpbXBvcnQgYmFzZUlzVHlwZWRBcnJheSBmcm9tICcuL19iYXNlSXNUeXBlZEFycmF5LmpzJztcbmltcG9ydCBiYXNlVW5hcnkgZnJvbSAnLi9fYmFzZVVuYXJ5LmpzJztcbmltcG9ydCBub2RlVXRpbCBmcm9tICcuL19ub2RlVXRpbC5qcyc7XG5cbi8qIE5vZGUuanMgaGVscGVyIHJlZmVyZW5jZXMuICovXG52YXIgbm9kZUlzVHlwZWRBcnJheSA9IG5vZGVVdGlsICYmIG5vZGVVdGlsLmlzVHlwZWRBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgdHlwZWQgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB0eXBlZCBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShuZXcgVWludDhBcnJheSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkoW10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzVHlwZWRBcnJheSA9IG5vZGVJc1R5cGVkQXJyYXkgPyBiYXNlVW5hcnkobm9kZUlzVHlwZWRBcnJheSkgOiBiYXNlSXNUeXBlZEFycmF5O1xuXG5leHBvcnQgZGVmYXVsdCBpc1R5cGVkQXJyYXk7XG4iLCJpbXBvcnQgYmFzZVRpbWVzIGZyb20gJy4vX2Jhc2VUaW1lcy5qcyc7XG5pbXBvcnQgaXNBcmd1bWVudHMgZnJvbSAnLi9pc0FyZ3VtZW50cy5qcyc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuL2lzQXJyYXkuanMnO1xuaW1wb3J0IGlzQnVmZmVyIGZyb20gJy4vaXNCdWZmZXIuanMnO1xuaW1wb3J0IGlzSW5kZXggZnJvbSAnLi9faXNJbmRleC5qcyc7XG5pbXBvcnQgaXNUeXBlZEFycmF5IGZyb20gJy4vaXNUeXBlZEFycmF5LmpzJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIHRoZSBhcnJheS1saWtlIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtib29sZWFufSBpbmhlcml0ZWQgU3BlY2lmeSByZXR1cm5pbmcgaW5oZXJpdGVkIHByb3BlcnR5IG5hbWVzLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYXJyYXlMaWtlS2V5cyh2YWx1ZSwgaW5oZXJpdGVkKSB7XG4gIHZhciBpc0FyciA9IGlzQXJyYXkodmFsdWUpLFxuICAgICAgaXNBcmcgPSAhaXNBcnIgJiYgaXNBcmd1bWVudHModmFsdWUpLFxuICAgICAgaXNCdWZmID0gIWlzQXJyICYmICFpc0FyZyAmJiBpc0J1ZmZlcih2YWx1ZSksXG4gICAgICBpc1R5cGUgPSAhaXNBcnIgJiYgIWlzQXJnICYmICFpc0J1ZmYgJiYgaXNUeXBlZEFycmF5KHZhbHVlKSxcbiAgICAgIHNraXBJbmRleGVzID0gaXNBcnIgfHwgaXNBcmcgfHwgaXNCdWZmIHx8IGlzVHlwZSxcbiAgICAgIHJlc3VsdCA9IHNraXBJbmRleGVzID8gYmFzZVRpbWVzKHZhbHVlLmxlbmd0aCwgU3RyaW5nKSA6IFtdLFxuICAgICAgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aDtcblxuICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICBpZiAoKGluaGVyaXRlZCB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrZXkpKSAmJlxuICAgICAgICAhKHNraXBJbmRleGVzICYmIChcbiAgICAgICAgICAgLy8gU2FmYXJpIDkgaGFzIGVudW1lcmFibGUgYGFyZ3VtZW50cy5sZW5ndGhgIGluIHN0cmljdCBtb2RlLlxuICAgICAgICAgICBrZXkgPT0gJ2xlbmd0aCcgfHxcbiAgICAgICAgICAgLy8gTm9kZS5qcyAwLjEwIGhhcyBlbnVtZXJhYmxlIG5vbi1pbmRleCBwcm9wZXJ0aWVzIG9uIGJ1ZmZlcnMuXG4gICAgICAgICAgIChpc0J1ZmYgJiYgKGtleSA9PSAnb2Zmc2V0JyB8fCBrZXkgPT0gJ3BhcmVudCcpKSB8fFxuICAgICAgICAgICAvLyBQaGFudG9tSlMgMiBoYXMgZW51bWVyYWJsZSBub24taW5kZXggcHJvcGVydGllcyBvbiB0eXBlZCBhcnJheXMuXG4gICAgICAgICAgIChpc1R5cGUgJiYgKGtleSA9PSAnYnVmZmVyJyB8fCBrZXkgPT0gJ2J5dGVMZW5ndGgnIHx8IGtleSA9PSAnYnl0ZU9mZnNldCcpKSB8fFxuICAgICAgICAgICAvLyBTa2lwIGluZGV4IHByb3BlcnRpZXMuXG4gICAgICAgICAgIGlzSW5kZXgoa2V5LCBsZW5ndGgpXG4gICAgICAgICkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBhcnJheUxpa2VLZXlzO1xuIiwiLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYSBwcm90b3R5cGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvdG90eXBlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzUHJvdG90eXBlKHZhbHVlKSB7XG4gIHZhciBDdG9yID0gdmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IsXG4gICAgICBwcm90byA9ICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlKSB8fCBvYmplY3RQcm90bztcblxuICByZXR1cm4gdmFsdWUgPT09IHByb3RvO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc1Byb3RvdHlwZTtcbiIsIi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBvdmVyQXJnO1xuIiwiaW1wb3J0IG92ZXJBcmcgZnJvbSAnLi9fb3ZlckFyZy5qcyc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVLZXlzID0gb3ZlckFyZyhPYmplY3Qua2V5cywgT2JqZWN0KTtcblxuZXhwb3J0IGRlZmF1bHQgbmF0aXZlS2V5cztcbiIsImltcG9ydCBpc1Byb3RvdHlwZSBmcm9tICcuL19pc1Byb3RvdHlwZS5qcyc7XG5pbXBvcnQgbmF0aXZlS2V5cyBmcm9tICcuL19uYXRpdmVLZXlzLmpzJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5rZXlzYCB3aGljaCBkb2Vzbid0IHRyZWF0IHNwYXJzZSBhcnJheXMgYXMgZGVuc2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VLZXlzKG9iamVjdCkge1xuICBpZiAoIWlzUHJvdG90eXBlKG9iamVjdCkpIHtcbiAgICByZXR1cm4gbmF0aXZlS2V5cyhvYmplY3QpO1xuICB9XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIE9iamVjdChvYmplY3QpKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpICYmIGtleSAhPSAnY29uc3RydWN0b3InKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlS2V5cztcbiIsImltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4vaXNGdW5jdGlvbi5qcyc7XG5pbXBvcnQgaXNMZW5ndGggZnJvbSAnLi9pc0xlbmd0aC5qcyc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS4gQSB2YWx1ZSBpcyBjb25zaWRlcmVkIGFycmF5LWxpa2UgaWYgaXQnc1xuICogbm90IGEgZnVuY3Rpb24gYW5kIGhhcyBhIGB2YWx1ZS5sZW5ndGhgIHRoYXQncyBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiBvclxuICogZXF1YWwgdG8gYDBgIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gYE51bWJlci5NQVhfU0FGRV9JTlRFR0VSYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoJ2FiYycpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgIWlzRnVuY3Rpb24odmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc0FycmF5TGlrZTtcbiIsImltcG9ydCBhcnJheUxpa2VLZXlzIGZyb20gJy4vX2FycmF5TGlrZUtleXMuanMnO1xuaW1wb3J0IGJhc2VLZXlzIGZyb20gJy4vX2Jhc2VLZXlzLmpzJztcbmltcG9ydCBpc0FycmF5TGlrZSBmcm9tICcuL2lzQXJyYXlMaWtlLmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5rZXlzKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXMobmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKlxuICogXy5rZXlzKCdoaScpO1xuICogLy8gPT4gWycwJywgJzEnXVxuICovXG5mdW5jdGlvbiBrZXlzKG9iamVjdCkge1xuICByZXR1cm4gaXNBcnJheUxpa2Uob2JqZWN0KSA/IGFycmF5TGlrZUtleXMob2JqZWN0KSA6IGJhc2VLZXlzKG9iamVjdCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGtleXM7XG4iLCJpbXBvcnQgYmFzZUdldEFsbEtleXMgZnJvbSAnLi9fYmFzZUdldEFsbEtleXMuanMnO1xuaW1wb3J0IGdldFN5bWJvbHMgZnJvbSAnLi9fZ2V0U3ltYm9scy5qcyc7XG5pbXBvcnQga2V5cyBmcm9tICcuL2tleXMuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2Ygb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgYW5kIHN5bWJvbHMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMgYW5kIHN5bWJvbHMuXG4gKi9cbmZ1bmN0aW9uIGdldEFsbEtleXMob2JqZWN0KSB7XG4gIHJldHVybiBiYXNlR2V0QWxsS2V5cyhvYmplY3QsIGtleXMsIGdldFN5bWJvbHMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRBbGxLZXlzO1xuIiwiaW1wb3J0IGdldEFsbEtleXMgZnJvbSAnLi9fZ2V0QWxsS2V5cy5qcyc7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIHZhbHVlIGNvbXBhcmlzb25zLiAqL1xudmFyIENPTVBBUkVfUEFSVElBTF9GTEFHID0gMTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIG9iamVjdHMgd2l0aCBzdXBwb3J0IGZvclxuICogcGFydGlhbCBkZWVwIGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGFjayBUcmFja3MgdHJhdmVyc2VkIGBvYmplY3RgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxPYmplY3RzKG9iamVjdCwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spIHtcbiAgdmFyIGlzUGFydGlhbCA9IGJpdG1hc2sgJiBDT01QQVJFX1BBUlRJQUxfRkxBRyxcbiAgICAgIG9ialByb3BzID0gZ2V0QWxsS2V5cyhvYmplY3QpLFxuICAgICAgb2JqTGVuZ3RoID0gb2JqUHJvcHMubGVuZ3RoLFxuICAgICAgb3RoUHJvcHMgPSBnZXRBbGxLZXlzKG90aGVyKSxcbiAgICAgIG90aExlbmd0aCA9IG90aFByb3BzLmxlbmd0aDtcblxuICBpZiAob2JqTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhaXNQYXJ0aWFsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBpbmRleCA9IG9iakxlbmd0aDtcbiAgd2hpbGUgKGluZGV4LS0pIHtcbiAgICB2YXIga2V5ID0gb2JqUHJvcHNbaW5kZXhdO1xuICAgIGlmICghKGlzUGFydGlhbCA/IGtleSBpbiBvdGhlciA6IGhhc093blByb3BlcnR5LmNhbGwob3RoZXIsIGtleSkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQob2JqZWN0KTtcbiAgaWYgKHN0YWNrZWQgJiYgc3RhY2suZ2V0KG90aGVyKSkge1xuICAgIHJldHVybiBzdGFja2VkID09IG90aGVyO1xuICB9XG4gIHZhciByZXN1bHQgPSB0cnVlO1xuICBzdGFjay5zZXQob2JqZWN0LCBvdGhlcik7XG4gIHN0YWNrLnNldChvdGhlciwgb2JqZWN0KTtcblxuICB2YXIgc2tpcEN0b3IgPSBpc1BhcnRpYWw7XG4gIHdoaWxlICgrK2luZGV4IDwgb2JqTGVuZ3RoKSB7XG4gICAga2V5ID0gb2JqUHJvcHNbaW5kZXhdO1xuICAgIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2tleV07XG5cbiAgICBpZiAoY3VzdG9taXplcikge1xuICAgICAgdmFyIGNvbXBhcmVkID0gaXNQYXJ0aWFsXG4gICAgICAgID8gY3VzdG9taXplcihvdGhWYWx1ZSwgb2JqVmFsdWUsIGtleSwgb3RoZXIsIG9iamVjdCwgc3RhY2spXG4gICAgICAgIDogY3VzdG9taXplcihvYmpWYWx1ZSwgb3RoVmFsdWUsIGtleSwgb2JqZWN0LCBvdGhlciwgc3RhY2spO1xuICAgIH1cbiAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBpZiAoIShjb21wYXJlZCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyAob2JqVmFsdWUgPT09IG90aFZhbHVlIHx8IGVxdWFsRnVuYyhvYmpWYWx1ZSwgb3RoVmFsdWUsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIHN0YWNrKSlcbiAgICAgICAgICA6IGNvbXBhcmVkXG4gICAgICAgICkpIHtcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHNraXBDdG9yIHx8IChza2lwQ3RvciA9IGtleSA9PSAnY29uc3RydWN0b3InKTtcbiAgfVxuICBpZiAocmVzdWx0ICYmICFza2lwQ3Rvcikge1xuICAgIHZhciBvYmpDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yLFxuICAgICAgICBvdGhDdG9yID0gb3RoZXIuY29uc3RydWN0b3I7XG5cbiAgICAvLyBOb24gYE9iamVjdGAgb2JqZWN0IGluc3RhbmNlcyB3aXRoIGRpZmZlcmVudCBjb25zdHJ1Y3RvcnMgYXJlIG5vdCBlcXVhbC5cbiAgICBpZiAob2JqQ3RvciAhPSBvdGhDdG9yICYmXG4gICAgICAgICgnY29uc3RydWN0b3InIGluIG9iamVjdCAmJiAnY29uc3RydWN0b3InIGluIG90aGVyKSAmJlxuICAgICAgICAhKHR5cGVvZiBvYmpDdG9yID09ICdmdW5jdGlvbicgJiYgb2JqQ3RvciBpbnN0YW5jZW9mIG9iakN0b3IgJiZcbiAgICAgICAgICB0eXBlb2Ygb3RoQ3RvciA9PSAnZnVuY3Rpb24nICYmIG90aEN0b3IgaW5zdGFuY2VvZiBvdGhDdG9yKSkge1xuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIHN0YWNrWydkZWxldGUnXShvYmplY3QpO1xuICBzdGFja1snZGVsZXRlJ10ob3RoZXIpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBlcXVhbE9iamVjdHM7XG4iLCJpbXBvcnQgZ2V0TmF0aXZlIGZyb20gJy4vX2dldE5hdGl2ZS5qcyc7XG5pbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIERhdGFWaWV3ID0gZ2V0TmF0aXZlKHJvb3QsICdEYXRhVmlldycpO1xuXG5leHBvcnQgZGVmYXVsdCBEYXRhVmlldztcbiIsImltcG9ydCBnZXROYXRpdmUgZnJvbSAnLi9fZ2V0TmF0aXZlLmpzJztcbmltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgUHJvbWlzZSA9IGdldE5hdGl2ZShyb290LCAnUHJvbWlzZScpO1xuXG5leHBvcnQgZGVmYXVsdCBQcm9taXNlO1xuIiwiaW1wb3J0IGdldE5hdGl2ZSBmcm9tICcuL19nZXROYXRpdmUuanMnO1xuaW1wb3J0IHJvb3QgZnJvbSAnLi9fcm9vdC5qcyc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBTZXQgPSBnZXROYXRpdmUocm9vdCwgJ1NldCcpO1xuXG5leHBvcnQgZGVmYXVsdCBTZXQ7XG4iLCJpbXBvcnQgZ2V0TmF0aXZlIGZyb20gJy4vX2dldE5hdGl2ZS5qcyc7XG5pbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIFdlYWtNYXAgPSBnZXROYXRpdmUocm9vdCwgJ1dlYWtNYXAnKTtcblxuZXhwb3J0IGRlZmF1bHQgV2Vha01hcDtcbiIsImltcG9ydCBEYXRhVmlldyBmcm9tICcuL19EYXRhVmlldy5qcyc7XG5pbXBvcnQgTWFwIGZyb20gJy4vX01hcC5qcyc7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICcuL19Qcm9taXNlLmpzJztcbmltcG9ydCBTZXQgZnJvbSAnLi9fU2V0LmpzJztcbmltcG9ydCBXZWFrTWFwIGZyb20gJy4vX1dlYWtNYXAuanMnO1xuaW1wb3J0IGJhc2VHZXRUYWcgZnJvbSAnLi9fYmFzZUdldFRhZy5qcyc7XG5pbXBvcnQgdG9Tb3VyY2UgZnJvbSAnLi9fdG9Tb3VyY2UuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcHJvbWlzZVRhZyA9ICdbb2JqZWN0IFByb21pc2VdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWFwcywgc2V0cywgYW5kIHdlYWttYXBzLiAqL1xudmFyIGRhdGFWaWV3Q3RvclN0cmluZyA9IHRvU291cmNlKERhdGFWaWV3KSxcbiAgICBtYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoTWFwKSxcbiAgICBwcm9taXNlQ3RvclN0cmluZyA9IHRvU291cmNlKFByb21pc2UpLFxuICAgIHNldEN0b3JTdHJpbmcgPSB0b1NvdXJjZShTZXQpLFxuICAgIHdlYWtNYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoV2Vha01hcCk7XG5cbi8qKlxuICogR2V0cyB0aGUgYHRvU3RyaW5nVGFnYCBvZiBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbnZhciBnZXRUYWcgPSBiYXNlR2V0VGFnO1xuXG4vLyBGYWxsYmFjayBmb3IgZGF0YSB2aWV3cywgbWFwcywgc2V0cywgYW5kIHdlYWsgbWFwcyBpbiBJRSAxMSBhbmQgcHJvbWlzZXMgaW4gTm9kZS5qcyA8IDYuXG5pZiAoKERhdGFWaWV3ICYmIGdldFRhZyhuZXcgRGF0YVZpZXcobmV3IEFycmF5QnVmZmVyKDEpKSkgIT0gZGF0YVZpZXdUYWcpIHx8XG4gICAgKE1hcCAmJiBnZXRUYWcobmV3IE1hcCkgIT0gbWFwVGFnKSB8fFxuICAgIChQcm9taXNlICYmIGdldFRhZyhQcm9taXNlLnJlc29sdmUoKSkgIT0gcHJvbWlzZVRhZykgfHxcbiAgICAoU2V0ICYmIGdldFRhZyhuZXcgU2V0KSAhPSBzZXRUYWcpIHx8XG4gICAgKFdlYWtNYXAgJiYgZ2V0VGFnKG5ldyBXZWFrTWFwKSAhPSB3ZWFrTWFwVGFnKSkge1xuICBnZXRUYWcgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciByZXN1bHQgPSBiYXNlR2V0VGFnKHZhbHVlKSxcbiAgICAgICAgQ3RvciA9IHJlc3VsdCA9PSBvYmplY3RUYWcgPyB2YWx1ZS5jb25zdHJ1Y3RvciA6IHVuZGVmaW5lZCxcbiAgICAgICAgY3RvclN0cmluZyA9IEN0b3IgPyB0b1NvdXJjZShDdG9yKSA6ICcnO1xuXG4gICAgaWYgKGN0b3JTdHJpbmcpIHtcbiAgICAgIHN3aXRjaCAoY3RvclN0cmluZykge1xuICAgICAgICBjYXNlIGRhdGFWaWV3Q3RvclN0cmluZzogcmV0dXJuIGRhdGFWaWV3VGFnO1xuICAgICAgICBjYXNlIG1hcEN0b3JTdHJpbmc6IHJldHVybiBtYXBUYWc7XG4gICAgICAgIGNhc2UgcHJvbWlzZUN0b3JTdHJpbmc6IHJldHVybiBwcm9taXNlVGFnO1xuICAgICAgICBjYXNlIHNldEN0b3JTdHJpbmc6IHJldHVybiBzZXRUYWc7XG4gICAgICAgIGNhc2Ugd2Vha01hcEN0b3JTdHJpbmc6IHJldHVybiB3ZWFrTWFwVGFnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRUYWc7XG4iLCJpbXBvcnQgU3RhY2sgZnJvbSAnLi9fU3RhY2suanMnO1xuaW1wb3J0IGVxdWFsQXJyYXlzIGZyb20gJy4vX2VxdWFsQXJyYXlzLmpzJztcbmltcG9ydCBlcXVhbEJ5VGFnIGZyb20gJy4vX2VxdWFsQnlUYWcuanMnO1xuaW1wb3J0IGVxdWFsT2JqZWN0cyBmcm9tICcuL19lcXVhbE9iamVjdHMuanMnO1xuaW1wb3J0IGdldFRhZyBmcm9tICcuL19nZXRUYWcuanMnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5LmpzJztcbmltcG9ydCBpc0J1ZmZlciBmcm9tICcuL2lzQnVmZmVyLmpzJztcbmltcG9ydCBpc1R5cGVkQXJyYXkgZnJvbSAnLi9pc1R5cGVkQXJyYXkuanMnO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciB2YWx1ZSBjb21wYXJpc29ucy4gKi9cbnZhciBDT01QQVJFX1BBUlRJQUxfRkxBRyA9IDE7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxgIGZvciBhcnJheXMgYW5kIG9iamVjdHMgd2hpY2ggcGVyZm9ybXNcbiAqIGRlZXAgY29tcGFyaXNvbnMgYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cyBlbmFibGluZyBvYmplY3RzIHdpdGggY2lyY3VsYXJcbiAqIHJlZmVyZW5jZXMgdG8gYmUgY29tcGFyZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYCBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBgb2JqZWN0YCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0VxdWFsRGVlcChvYmplY3QsIG90aGVyLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKSB7XG4gIHZhciBvYmpJc0FyciA9IGlzQXJyYXkob2JqZWN0KSxcbiAgICAgIG90aElzQXJyID0gaXNBcnJheShvdGhlciksXG4gICAgICBvYmpUYWcgPSBvYmpJc0FyciA/IGFycmF5VGFnIDogZ2V0VGFnKG9iamVjdCksXG4gICAgICBvdGhUYWcgPSBvdGhJc0FyciA/IGFycmF5VGFnIDogZ2V0VGFnKG90aGVyKTtcblxuICBvYmpUYWcgPSBvYmpUYWcgPT0gYXJnc1RhZyA/IG9iamVjdFRhZyA6IG9ialRhZztcbiAgb3RoVGFnID0gb3RoVGFnID09IGFyZ3NUYWcgPyBvYmplY3RUYWcgOiBvdGhUYWc7XG5cbiAgdmFyIG9iaklzT2JqID0gb2JqVGFnID09IG9iamVjdFRhZyxcbiAgICAgIG90aElzT2JqID0gb3RoVGFnID09IG9iamVjdFRhZyxcbiAgICAgIGlzU2FtZVRhZyA9IG9ialRhZyA9PSBvdGhUYWc7XG5cbiAgaWYgKGlzU2FtZVRhZyAmJiBpc0J1ZmZlcihvYmplY3QpKSB7XG4gICAgaWYgKCFpc0J1ZmZlcihvdGhlcikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgb2JqSXNBcnIgPSB0cnVlO1xuICAgIG9iaklzT2JqID0gZmFsc2U7XG4gIH1cbiAgaWYgKGlzU2FtZVRhZyAmJiAhb2JqSXNPYmopIHtcbiAgICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICAgIHJldHVybiAob2JqSXNBcnIgfHwgaXNUeXBlZEFycmF5KG9iamVjdCkpXG4gICAgICA/IGVxdWFsQXJyYXlzKG9iamVjdCwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spXG4gICAgICA6IGVxdWFsQnlUYWcob2JqZWN0LCBvdGhlciwgb2JqVGFnLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKTtcbiAgfVxuICBpZiAoIShiaXRtYXNrICYgQ09NUEFSRV9QQVJUSUFMX0ZMQUcpKSB7XG4gICAgdmFyIG9iaklzV3JhcHBlZCA9IG9iaklzT2JqICYmIGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCAnX193cmFwcGVkX18nKSxcbiAgICAgICAgb3RoSXNXcmFwcGVkID0gb3RoSXNPYmogJiYgaGFzT3duUHJvcGVydHkuY2FsbChvdGhlciwgJ19fd3JhcHBlZF9fJyk7XG5cbiAgICBpZiAob2JqSXNXcmFwcGVkIHx8IG90aElzV3JhcHBlZCkge1xuICAgICAgdmFyIG9ialVud3JhcHBlZCA9IG9iaklzV3JhcHBlZCA/IG9iamVjdC52YWx1ZSgpIDogb2JqZWN0LFxuICAgICAgICAgIG90aFVud3JhcHBlZCA9IG90aElzV3JhcHBlZCA/IG90aGVyLnZhbHVlKCkgOiBvdGhlcjtcblxuICAgICAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgICAgIHJldHVybiBlcXVhbEZ1bmMob2JqVW53cmFwcGVkLCBvdGhVbndyYXBwZWQsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIHN0YWNrKTtcbiAgICB9XG4gIH1cbiAgaWYgKCFpc1NhbWVUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgcmV0dXJuIGVxdWFsT2JqZWN0cyhvYmplY3QsIG90aGVyLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUlzRXF1YWxEZWVwO1xuIiwiaW1wb3J0IGJhc2VJc0VxdWFsRGVlcCBmcm9tICcuL19iYXNlSXNFcXVhbERlZXAuanMnO1xuaW1wb3J0IGlzT2JqZWN0TGlrZSBmcm9tICcuL2lzT2JqZWN0TGlrZS5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNFcXVhbGAgd2hpY2ggc3VwcG9ydHMgcGFydGlhbCBjb21wYXJpc29uc1xuICogYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGJpdG1hc2sgVGhlIGJpdG1hc2sgZmxhZ3MuXG4gKiAgMSAtIFVub3JkZXJlZCBjb21wYXJpc29uXG4gKiAgMiAtIFBhcnRpYWwgY29tcGFyaXNvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIGB2YWx1ZWAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0VxdWFsKHZhbHVlLCBvdGhlciwgYml0bWFzaywgY3VzdG9taXplciwgc3RhY2spIHtcbiAgaWYgKHZhbHVlID09PSBvdGhlcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICh2YWx1ZSA9PSBudWxsIHx8IG90aGVyID09IG51bGwgfHwgKCFpc09iamVjdExpa2UodmFsdWUpICYmICFpc09iamVjdExpa2Uob3RoZXIpKSkge1xuICAgIHJldHVybiB2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyO1xuICB9XG4gIHJldHVybiBiYXNlSXNFcXVhbERlZXAodmFsdWUsIG90aGVyLCBiaXRtYXNrLCBjdXN0b21pemVyLCBiYXNlSXNFcXVhbCwgc3RhY2spO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlSXNFcXVhbDtcbiIsImltcG9ydCBTdGFjayBmcm9tICcuL19TdGFjay5qcyc7XG5pbXBvcnQgYmFzZUlzRXF1YWwgZnJvbSAnLi9fYmFzZUlzRXF1YWwuanMnO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciB2YWx1ZSBjb21wYXJpc29ucy4gKi9cbnZhciBDT01QQVJFX1BBUlRJQUxfRkxBRyA9IDEsXG4gICAgQ09NUEFSRV9VTk9SREVSRURfRkxBRyA9IDI7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNNYXRjaGAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCBvZiBwcm9wZXJ0eSB2YWx1ZXMgdG8gbWF0Y2guXG4gKiBAcGFyYW0ge0FycmF5fSBtYXRjaERhdGEgVGhlIHByb3BlcnR5IG5hbWVzLCB2YWx1ZXMsIGFuZCBjb21wYXJlIGZsYWdzIHRvIG1hdGNoLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYG9iamVjdGAgaXMgYSBtYXRjaCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNNYXRjaChvYmplY3QsIHNvdXJjZSwgbWF0Y2hEYXRhLCBjdXN0b21pemVyKSB7XG4gIHZhciBpbmRleCA9IG1hdGNoRGF0YS5sZW5ndGgsXG4gICAgICBsZW5ndGggPSBpbmRleCxcbiAgICAgIG5vQ3VzdG9taXplciA9ICFjdXN0b21pemVyO1xuXG4gIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgIHJldHVybiAhbGVuZ3RoO1xuICB9XG4gIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICB3aGlsZSAoaW5kZXgtLSkge1xuICAgIHZhciBkYXRhID0gbWF0Y2hEYXRhW2luZGV4XTtcbiAgICBpZiAoKG5vQ3VzdG9taXplciAmJiBkYXRhWzJdKVxuICAgICAgICAgID8gZGF0YVsxXSAhPT0gb2JqZWN0W2RhdGFbMF1dXG4gICAgICAgICAgOiAhKGRhdGFbMF0gaW4gb2JqZWN0KVxuICAgICAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBkYXRhID0gbWF0Y2hEYXRhW2luZGV4XTtcbiAgICB2YXIga2V5ID0gZGF0YVswXSxcbiAgICAgICAgb2JqVmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgICAgc3JjVmFsdWUgPSBkYXRhWzFdO1xuXG4gICAgaWYgKG5vQ3VzdG9taXplciAmJiBkYXRhWzJdKSB7XG4gICAgICBpZiAob2JqVmFsdWUgPT09IHVuZGVmaW5lZCAmJiAhKGtleSBpbiBvYmplY3QpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHN0YWNrID0gbmV3IFN0YWNrO1xuICAgICAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGN1c3RvbWl6ZXIob2JqVmFsdWUsIHNyY1ZhbHVlLCBrZXksIG9iamVjdCwgc291cmNlLCBzdGFjayk7XG4gICAgICB9XG4gICAgICBpZiAoIShyZXN1bHQgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBiYXNlSXNFcXVhbChzcmNWYWx1ZSwgb2JqVmFsdWUsIENPTVBBUkVfUEFSVElBTF9GTEFHIHwgQ09NUEFSRV9VTk9SREVSRURfRkxBRywgY3VzdG9taXplciwgc3RhY2spXG4gICAgICAgICAgICA6IHJlc3VsdFxuICAgICAgICAgICkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUlzTWF0Y2g7XG4iLCJpbXBvcnQgaXNPYmplY3QgZnJvbSAnLi9pc09iamVjdC5qcyc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUgZm9yIHN0cmljdCBlcXVhbGl0eSBjb21wYXJpc29ucywgaS5lLiBgPT09YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpZiBzdWl0YWJsZSBmb3Igc3RyaWN0XG4gKiAgZXF1YWxpdHkgY29tcGFyaXNvbnMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNTdHJpY3RDb21wYXJhYmxlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gdmFsdWUgJiYgIWlzT2JqZWN0KHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNTdHJpY3RDb21wYXJhYmxlO1xuIiwiaW1wb3J0IGlzU3RyaWN0Q29tcGFyYWJsZSBmcm9tICcuL19pc1N0cmljdENvbXBhcmFibGUuanMnO1xuaW1wb3J0IGtleXMgZnJvbSAnLi9rZXlzLmpzJztcblxuLyoqXG4gKiBHZXRzIHRoZSBwcm9wZXJ0eSBuYW1lcywgdmFsdWVzLCBhbmQgY29tcGFyZSBmbGFncyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBtYXRjaCBkYXRhIG9mIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBnZXRNYXRjaERhdGEob2JqZWN0KSB7XG4gIHZhciByZXN1bHQgPSBrZXlzKG9iamVjdCksXG4gICAgICBsZW5ndGggPSByZXN1bHQubGVuZ3RoO1xuXG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIHZhciBrZXkgPSByZXN1bHRbbGVuZ3RoXSxcbiAgICAgICAgdmFsdWUgPSBvYmplY3Rba2V5XTtcblxuICAgIHJlc3VsdFtsZW5ndGhdID0gW2tleSwgdmFsdWUsIGlzU3RyaWN0Q29tcGFyYWJsZSh2YWx1ZSldO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldE1hdGNoRGF0YTtcbiIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBtYXRjaGVzUHJvcGVydHlgIGZvciBzb3VyY2UgdmFsdWVzIHN1aXRhYmxlXG4gKiBmb3Igc3RyaWN0IGVxdWFsaXR5IGNvbXBhcmlzb25zLCBpLmUuIGA9PT1gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEBwYXJhbSB7Kn0gc3JjVmFsdWUgVGhlIHZhbHVlIHRvIG1hdGNoLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgc3BlYyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gbWF0Y2hlc1N0cmljdENvbXBhcmFibGUoa2V5LCBzcmNWYWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Rba2V5XSA9PT0gc3JjVmFsdWUgJiZcbiAgICAgIChzcmNWYWx1ZSAhPT0gdW5kZWZpbmVkIHx8IChrZXkgaW4gT2JqZWN0KG9iamVjdCkpKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWF0Y2hlc1N0cmljdENvbXBhcmFibGU7XG4iLCJpbXBvcnQgYmFzZUlzTWF0Y2ggZnJvbSAnLi9fYmFzZUlzTWF0Y2guanMnO1xuaW1wb3J0IGdldE1hdGNoRGF0YSBmcm9tICcuL19nZXRNYXRjaERhdGEuanMnO1xuaW1wb3J0IG1hdGNoZXNTdHJpY3RDb21wYXJhYmxlIGZyb20gJy4vX21hdGNoZXNTdHJpY3RDb21wYXJhYmxlLmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tYXRjaGVzYCB3aGljaCBkb2Vzbid0IGNsb25lIGBzb3VyY2VgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3Qgb2YgcHJvcGVydHkgdmFsdWVzIHRvIG1hdGNoLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgc3BlYyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZU1hdGNoZXMoc291cmNlKSB7XG4gIHZhciBtYXRjaERhdGEgPSBnZXRNYXRjaERhdGEoc291cmNlKTtcbiAgaWYgKG1hdGNoRGF0YS5sZW5ndGggPT0gMSAmJiBtYXRjaERhdGFbMF1bMl0pIHtcbiAgICByZXR1cm4gbWF0Y2hlc1N0cmljdENvbXBhcmFibGUobWF0Y2hEYXRhWzBdWzBdLCBtYXRjaERhdGFbMF1bMV0pO1xuICB9XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0ID09PSBzb3VyY2UgfHwgYmFzZUlzTWF0Y2gob2JqZWN0LCBzb3VyY2UsIG1hdGNoRGF0YSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VNYXRjaGVzO1xuIiwiaW1wb3J0IGJhc2VHZXRUYWcgZnJvbSAnLi9fYmFzZUdldFRhZy5qcyc7XG5pbXBvcnQgaXNPYmplY3RMaWtlIGZyb20gJy4vaXNPYmplY3RMaWtlLmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBiYXNlR2V0VGFnKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc1N5bWJvbDtcbiIsImltcG9ydCBpc0FycmF5IGZyb20gJy4vaXNBcnJheS5qcyc7XG5pbXBvcnQgaXNTeW1ib2wgZnJvbSAnLi9pc1N5bWJvbC5qcyc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIHByb3BlcnR5IG5hbWVzIHdpdGhpbiBwcm9wZXJ0eSBwYXRocy4gKi9cbnZhciByZUlzRGVlcFByb3AgPSAvXFwufFxcWyg/OlteW1xcXV0qfChbXCInXSkoPzooPyFcXDEpW15cXFxcXXxcXFxcLikqP1xcMSlcXF0vLFxuICAgIHJlSXNQbGFpblByb3AgPSAvXlxcdyokLztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHByb3BlcnR5IG5hbWUgYW5kIG5vdCBhIHByb3BlcnR5IHBhdGguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkga2V5cyBvbi5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvcGVydHkgbmFtZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0tleSh2YWx1ZSwgb2JqZWN0KSB7XG4gIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgaWYgKHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnc3ltYm9sJyB8fCB0eXBlID09ICdib29sZWFuJyB8fFxuICAgICAgdmFsdWUgPT0gbnVsbCB8fCBpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gcmVJc1BsYWluUHJvcC50ZXN0KHZhbHVlKSB8fCAhcmVJc0RlZXBQcm9wLnRlc3QodmFsdWUpIHx8XG4gICAgKG9iamVjdCAhPSBudWxsICYmIHZhbHVlIGluIE9iamVjdChvYmplY3QpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNLZXk7XG4iLCJpbXBvcnQgTWFwQ2FjaGUgZnJvbSAnLi9fTWFwQ2FjaGUuanMnO1xuXG4vKiogRXJyb3IgbWVzc2FnZSBjb25zdGFudHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IG1lbW9pemVzIHRoZSByZXN1bHQgb2YgYGZ1bmNgLiBJZiBgcmVzb2x2ZXJgIGlzXG4gKiBwcm92aWRlZCwgaXQgZGV0ZXJtaW5lcyB0aGUgY2FjaGUga2V5IGZvciBzdG9yaW5nIHRoZSByZXN1bHQgYmFzZWQgb24gdGhlXG4gKiBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlIG1lbW9pemVkIGZ1bmN0aW9uLiBCeSBkZWZhdWx0LCB0aGUgZmlyc3QgYXJndW1lbnRcbiAqIHByb3ZpZGVkIHRvIHRoZSBtZW1vaXplZCBmdW5jdGlvbiBpcyB1c2VkIGFzIHRoZSBtYXAgY2FjaGUga2V5LiBUaGUgYGZ1bmNgXG4gKiBpcyBpbnZva2VkIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIHRoZSBtZW1vaXplZCBmdW5jdGlvbi5cbiAqXG4gKiAqKk5vdGU6KiogVGhlIGNhY2hlIGlzIGV4cG9zZWQgYXMgdGhlIGBjYWNoZWAgcHJvcGVydHkgb24gdGhlIG1lbW9pemVkXG4gKiBmdW5jdGlvbi4gSXRzIGNyZWF0aW9uIG1heSBiZSBjdXN0b21pemVkIGJ5IHJlcGxhY2luZyB0aGUgYF8ubWVtb2l6ZS5DYWNoZWBcbiAqIGNvbnN0cnVjdG9yIHdpdGggb25lIHdob3NlIGluc3RhbmNlcyBpbXBsZW1lbnQgdGhlXG4gKiBbYE1hcGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXByb3BlcnRpZXMtb2YtdGhlLW1hcC1wcm90b3R5cGUtb2JqZWN0KVxuICogbWV0aG9kIGludGVyZmFjZSBvZiBgY2xlYXJgLCBgZGVsZXRlYCwgYGdldGAsIGBoYXNgLCBhbmQgYHNldGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBoYXZlIGl0cyBvdXRwdXQgbWVtb2l6ZWQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcmVzb2x2ZXJdIFRoZSBmdW5jdGlvbiB0byByZXNvbHZlIHRoZSBjYWNoZSBrZXkuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBtZW1vaXplZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxLCAnYic6IDIgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2MnOiAzLCAnZCc6IDQgfTtcbiAqXG4gKiB2YXIgdmFsdWVzID0gXy5tZW1vaXplKF8udmFsdWVzKTtcbiAqIHZhbHVlcyhvYmplY3QpO1xuICogLy8gPT4gWzEsIDJdXG4gKlxuICogdmFsdWVzKG90aGVyKTtcbiAqIC8vID0+IFszLCA0XVxuICpcbiAqIG9iamVjdC5hID0gMjtcbiAqIHZhbHVlcyhvYmplY3QpO1xuICogLy8gPT4gWzEsIDJdXG4gKlxuICogLy8gTW9kaWZ5IHRoZSByZXN1bHQgY2FjaGUuXG4gKiB2YWx1ZXMuY2FjaGUuc2V0KG9iamVjdCwgWydhJywgJ2InXSk7XG4gKiB2YWx1ZXMob2JqZWN0KTtcbiAqIC8vID0+IFsnYScsICdiJ11cbiAqXG4gKiAvLyBSZXBsYWNlIGBfLm1lbW9pemUuQ2FjaGVgLlxuICogXy5tZW1vaXplLkNhY2hlID0gV2Vha01hcDtcbiAqL1xuZnVuY3Rpb24gbWVtb2l6ZShmdW5jLCByZXNvbHZlcikge1xuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJyB8fCAocmVzb2x2ZXIgIT0gbnVsbCAmJiB0eXBlb2YgcmVzb2x2ZXIgIT0gJ2Z1bmN0aW9uJykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgdmFyIG1lbW9pemVkID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgIGtleSA9IHJlc29sdmVyID8gcmVzb2x2ZXIuYXBwbHkodGhpcywgYXJncykgOiBhcmdzWzBdLFxuICAgICAgICBjYWNoZSA9IG1lbW9pemVkLmNhY2hlO1xuXG4gICAgaWYgKGNhY2hlLmhhcyhrZXkpKSB7XG4gICAgICByZXR1cm4gY2FjaGUuZ2V0KGtleSk7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIG1lbW9pemVkLmNhY2hlID0gY2FjaGUuc2V0KGtleSwgcmVzdWx0KSB8fCBjYWNoZTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICBtZW1vaXplZC5jYWNoZSA9IG5ldyAobWVtb2l6ZS5DYWNoZSB8fCBNYXBDYWNoZSk7XG4gIHJldHVybiBtZW1vaXplZDtcbn1cblxuLy8gRXhwb3NlIGBNYXBDYWNoZWAuXG5tZW1vaXplLkNhY2hlID0gTWFwQ2FjaGU7XG5cbmV4cG9ydCBkZWZhdWx0IG1lbW9pemU7XG4iLCJpbXBvcnQgbWVtb2l6ZSBmcm9tICcuL21lbW9pemUuanMnO1xuXG4vKiogVXNlZCBhcyB0aGUgbWF4aW11bSBtZW1vaXplIGNhY2hlIHNpemUuICovXG52YXIgTUFYX01FTU9JWkVfU0laRSA9IDUwMDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8ubWVtb2l6ZWAgd2hpY2ggY2xlYXJzIHRoZSBtZW1vaXplZCBmdW5jdGlvbidzXG4gKiBjYWNoZSB3aGVuIGl0IGV4Y2VlZHMgYE1BWF9NRU1PSVpFX1NJWkVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBoYXZlIGl0cyBvdXRwdXQgbWVtb2l6ZWQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBtZW1vaXplZCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gbWVtb2l6ZUNhcHBlZChmdW5jKSB7XG4gIHZhciByZXN1bHQgPSBtZW1vaXplKGZ1bmMsIGZ1bmN0aW9uKGtleSkge1xuICAgIGlmIChjYWNoZS5zaXplID09PSBNQVhfTUVNT0laRV9TSVpFKSB7XG4gICAgICBjYWNoZS5jbGVhcigpO1xuICAgIH1cbiAgICByZXR1cm4ga2V5O1xuICB9KTtcblxuICB2YXIgY2FjaGUgPSByZXN1bHQuY2FjaGU7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1lbW9pemVDYXBwZWQ7XG4iLCJpbXBvcnQgbWVtb2l6ZUNhcHBlZCBmcm9tICcuL19tZW1vaXplQ2FwcGVkLmpzJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggcHJvcGVydHkgbmFtZXMgd2l0aGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHJlUHJvcE5hbWUgPSAvW14uW1xcXV0rfFxcWyg/OigtP1xcZCsoPzpcXC5cXGQrKT8pfChbXCInXSkoKD86KD8hXFwyKVteXFxcXF18XFxcXC4pKj8pXFwyKVxcXXwoPz0oPzpcXC58XFxbXFxdKSg/OlxcLnxcXFtcXF18JCkpL2c7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGJhY2tzbGFzaGVzIGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHJlRXNjYXBlQ2hhciA9IC9cXFxcKFxcXFwpPy9nO1xuXG4vKipcbiAqIENvbnZlcnRzIGBzdHJpbmdgIHRvIGEgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHByb3BlcnR5IHBhdGggYXJyYXkuXG4gKi9cbnZhciBzdHJpbmdUb1BhdGggPSBtZW1vaXplQ2FwcGVkKGZ1bmN0aW9uKHN0cmluZykge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGlmIChzdHJpbmcuY2hhckNvZGVBdCgwKSA9PT0gNDYgLyogLiAqLykge1xuICAgIHJlc3VsdC5wdXNoKCcnKTtcbiAgfVxuICBzdHJpbmcucmVwbGFjZShyZVByb3BOYW1lLCBmdW5jdGlvbihtYXRjaCwgbnVtYmVyLCBxdW90ZSwgc3ViU3RyaW5nKSB7XG4gICAgcmVzdWx0LnB1c2gocXVvdGUgPyBzdWJTdHJpbmcucmVwbGFjZShyZUVzY2FwZUNoYXIsICckMScpIDogKG51bWJlciB8fCBtYXRjaCkpO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdUb1BhdGg7XG4iLCJpbXBvcnQgU3ltYm9sIGZyb20gJy4vX1N5bWJvbC5qcyc7XG5pbXBvcnQgYXJyYXlNYXAgZnJvbSAnLi9fYXJyYXlNYXAuanMnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5LmpzJztcbmltcG9ydCBpc1N5bWJvbCBmcm9tICcuL2lzU3ltYm9sLmpzJztcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgSU5GSU5JVFkgPSAxIC8gMDtcblxuLyoqIFVzZWQgdG8gY29udmVydCBzeW1ib2xzIHRvIHByaW1pdGl2ZXMgYW5kIHN0cmluZ3MuICovXG52YXIgc3ltYm9sUHJvdG8gPSBTeW1ib2wgPyBTeW1ib2wucHJvdG90eXBlIDogdW5kZWZpbmVkLFxuICAgIHN5bWJvbFRvU3RyaW5nID0gc3ltYm9sUHJvdG8gPyBzeW1ib2xQcm90by50b1N0cmluZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50b1N0cmluZ2Agd2hpY2ggZG9lc24ndCBjb252ZXJ0IG51bGxpc2hcbiAqIHZhbHVlcyB0byBlbXB0eSBzdHJpbmdzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBiYXNlVG9TdHJpbmcodmFsdWUpIHtcbiAgLy8gRXhpdCBlYXJseSBmb3Igc3RyaW5ncyB0byBhdm9pZCBhIHBlcmZvcm1hbmNlIGhpdCBpbiBzb21lIGVudmlyb25tZW50cy5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAvLyBSZWN1cnNpdmVseSBjb252ZXJ0IHZhbHVlcyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIHJldHVybiBhcnJheU1hcCh2YWx1ZSwgYmFzZVRvU3RyaW5nKSArICcnO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gc3ltYm9sVG9TdHJpbmcgPyBzeW1ib2xUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICB9XG4gIHZhciByZXN1bHQgPSAodmFsdWUgKyAnJyk7XG4gIHJldHVybiAocmVzdWx0ID09ICcwJyAmJiAoMSAvIHZhbHVlKSA9PSAtSU5GSU5JVFkpID8gJy0wJyA6IHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZVRvU3RyaW5nO1xuIiwiaW1wb3J0IGJhc2VUb1N0cmluZyBmcm9tICcuL19iYXNlVG9TdHJpbmcuanMnO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcuIEFuIGVtcHR5IHN0cmluZyBpcyByZXR1cm5lZCBmb3IgYG51bGxgXG4gKiBhbmQgYHVuZGVmaW5lZGAgdmFsdWVzLiBUaGUgc2lnbiBvZiBgLTBgIGlzIHByZXNlcnZlZC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9TdHJpbmcobnVsbCk7XG4gKiAvLyA9PiAnJ1xuICpcbiAqIF8udG9TdHJpbmcoLTApO1xuICogLy8gPT4gJy0wJ1xuICpcbiAqIF8udG9TdHJpbmcoWzEsIDIsIDNdKTtcbiAqIC8vID0+ICcxLDIsMydcbiAqL1xuZnVuY3Rpb24gdG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IGJhc2VUb1N0cmluZyh2YWx1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRvU3RyaW5nO1xuIiwiaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5LmpzJztcbmltcG9ydCBpc0tleSBmcm9tICcuL19pc0tleS5qcyc7XG5pbXBvcnQgc3RyaW5nVG9QYXRoIGZyb20gJy4vX3N0cmluZ1RvUGF0aC5qcyc7XG5pbXBvcnQgdG9TdHJpbmcgZnJvbSAnLi90b1N0cmluZy5qcyc7XG5cbi8qKlxuICogQ2FzdHMgYHZhbHVlYCB0byBhIHBhdGggYXJyYXkgaWYgaXQncyBub3Qgb25lLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkga2V5cyBvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgY2FzdCBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICovXG5mdW5jdGlvbiBjYXN0UGF0aCh2YWx1ZSwgb2JqZWN0KSB7XG4gIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICByZXR1cm4gaXNLZXkodmFsdWUsIG9iamVjdCkgPyBbdmFsdWVdIDogc3RyaW5nVG9QYXRoKHRvU3RyaW5nKHZhbHVlKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNhc3RQYXRoO1xuIiwiaW1wb3J0IGlzU3ltYm9sIGZyb20gJy4vaXNTeW1ib2wuanMnO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBJTkZJTklUWSA9IDEgLyAwO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcga2V5IGlmIGl0J3Mgbm90IGEgc3RyaW5nIG9yIHN5bWJvbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtzdHJpbmd8c3ltYm9sfSBSZXR1cm5zIHRoZSBrZXkuXG4gKi9cbmZ1bmN0aW9uIHRvS2V5KHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycgfHwgaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHZhciByZXN1bHQgPSAodmFsdWUgKyAnJyk7XG4gIHJldHVybiAocmVzdWx0ID09ICcwJyAmJiAoMSAvIHZhbHVlKSA9PSAtSU5GSU5JVFkpID8gJy0wJyA6IHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdG9LZXk7XG4iLCJpbXBvcnQgY2FzdFBhdGggZnJvbSAnLi9fY2FzdFBhdGguanMnO1xuaW1wb3J0IHRvS2V5IGZyb20gJy4vX3RvS2V5LmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5nZXRgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVmYXVsdCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzb2x2ZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXQob2JqZWN0LCBwYXRoKSB7XG4gIHBhdGggPSBjYXN0UGF0aChwYXRoLCBvYmplY3QpO1xuXG4gIHZhciBpbmRleCA9IDAsXG4gICAgICBsZW5ndGggPSBwYXRoLmxlbmd0aDtcblxuICB3aGlsZSAob2JqZWN0ICE9IG51bGwgJiYgaW5kZXggPCBsZW5ndGgpIHtcbiAgICBvYmplY3QgPSBvYmplY3RbdG9LZXkocGF0aFtpbmRleCsrXSldO1xuICB9XG4gIHJldHVybiAoaW5kZXggJiYgaW5kZXggPT0gbGVuZ3RoKSA/IG9iamVjdCA6IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUdldDtcbiIsImltcG9ydCBiYXNlR2V0IGZyb20gJy4vX2Jhc2VHZXQuanMnO1xuXG4vKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBwYXRoYCBvZiBgb2JqZWN0YC4gSWYgdGhlIHJlc29sdmVkIHZhbHVlIGlzXG4gKiBgdW5kZWZpbmVkYCwgdGhlIGBkZWZhdWx0VmFsdWVgIGlzIHJldHVybmVkIGluIGl0cyBwbGFjZS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuNy4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHBhcmFtIHsqfSBbZGVmYXVsdFZhbHVlXSBUaGUgdmFsdWUgcmV0dXJuZWQgZm9yIGB1bmRlZmluZWRgIHJlc29sdmVkIHZhbHVlcy5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXNvbHZlZCB2YWx1ZS5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiBbeyAnYic6IHsgJ2MnOiAzIH0gfV0gfTtcbiAqXG4gKiBfLmdldChvYmplY3QsICdhWzBdLmIuYycpO1xuICogLy8gPT4gM1xuICpcbiAqIF8uZ2V0KG9iamVjdCwgWydhJywgJzAnLCAnYicsICdjJ10pO1xuICogLy8gPT4gM1xuICpcbiAqIF8uZ2V0KG9iamVjdCwgJ2EuYi5jJywgJ2RlZmF1bHQnKTtcbiAqIC8vID0+ICdkZWZhdWx0J1xuICovXG5mdW5jdGlvbiBnZXQob2JqZWN0LCBwYXRoLCBkZWZhdWx0VmFsdWUpIHtcbiAgdmFyIHJlc3VsdCA9IG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogYmFzZUdldChvYmplY3QsIHBhdGgpO1xuICByZXR1cm4gcmVzdWx0ID09PSB1bmRlZmluZWQgPyBkZWZhdWx0VmFsdWUgOiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldDtcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaGFzSW5gIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30ga2V5IFRoZSBrZXkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VIYXNJbihvYmplY3QsIGtleSkge1xuICByZXR1cm4gb2JqZWN0ICE9IG51bGwgJiYga2V5IGluIE9iamVjdChvYmplY3QpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlSGFzSW47XG4iLCJpbXBvcnQgY2FzdFBhdGggZnJvbSAnLi9fY2FzdFBhdGguanMnO1xuaW1wb3J0IGlzQXJndW1lbnRzIGZyb20gJy4vaXNBcmd1bWVudHMuanMnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5LmpzJztcbmltcG9ydCBpc0luZGV4IGZyb20gJy4vX2lzSW5kZXguanMnO1xuaW1wb3J0IGlzTGVuZ3RoIGZyb20gJy4vaXNMZW5ndGguanMnO1xuaW1wb3J0IHRvS2V5IGZyb20gJy4vX3RvS2V5LmpzJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHBhdGhgIGV4aXN0cyBvbiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggdG8gY2hlY2suXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYXNGdW5jIFRoZSBmdW5jdGlvbiB0byBjaGVjayBwcm9wZXJ0aWVzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBwYXRoYCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzUGF0aChvYmplY3QsIHBhdGgsIGhhc0Z1bmMpIHtcbiAgcGF0aCA9IGNhc3RQYXRoKHBhdGgsIG9iamVjdCk7XG5cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwYXRoLmxlbmd0aCxcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHRvS2V5KHBhdGhbaW5kZXhdKTtcbiAgICBpZiAoIShyZXN1bHQgPSBvYmplY3QgIT0gbnVsbCAmJiBoYXNGdW5jKG9iamVjdCwga2V5KSkpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBvYmplY3QgPSBvYmplY3Rba2V5XTtcbiAgfVxuICBpZiAocmVzdWx0IHx8ICsraW5kZXggIT0gbGVuZ3RoKSB7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBsZW5ndGggPSBvYmplY3QgPT0gbnVsbCA/IDAgOiBvYmplY3QubGVuZ3RoO1xuICByZXR1cm4gISFsZW5ndGggJiYgaXNMZW5ndGgobGVuZ3RoKSAmJiBpc0luZGV4KGtleSwgbGVuZ3RoKSAmJlxuICAgIChpc0FycmF5KG9iamVjdCkgfHwgaXNBcmd1bWVudHMob2JqZWN0KSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGhhc1BhdGg7XG4iLCJpbXBvcnQgYmFzZUhhc0luIGZyb20gJy4vX2Jhc2VIYXNJbi5qcyc7XG5pbXBvcnQgaGFzUGF0aCBmcm9tICcuL19oYXNQYXRoLmpzJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHBhdGhgIGlzIGEgZGlyZWN0IG9yIGluaGVyaXRlZCBwcm9wZXJ0eSBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgcGF0aGAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSBfLmNyZWF0ZSh7ICdhJzogXy5jcmVhdGUoeyAnYic6IDIgfSkgfSk7XG4gKlxuICogXy5oYXNJbihvYmplY3QsICdhJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5oYXNJbihvYmplY3QsICdhLmInKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmhhc0luKG9iamVjdCwgWydhJywgJ2InXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5oYXNJbihvYmplY3QsICdiJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBoYXNJbihvYmplY3QsIHBhdGgpIHtcbiAgcmV0dXJuIG9iamVjdCAhPSBudWxsICYmIGhhc1BhdGgob2JqZWN0LCBwYXRoLCBiYXNlSGFzSW4pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBoYXNJbjtcbiIsImltcG9ydCBiYXNlSXNFcXVhbCBmcm9tICcuL19iYXNlSXNFcXVhbC5qcyc7XG5pbXBvcnQgZ2V0IGZyb20gJy4vZ2V0LmpzJztcbmltcG9ydCBoYXNJbiBmcm9tICcuL2hhc0luLmpzJztcbmltcG9ydCBpc0tleSBmcm9tICcuL19pc0tleS5qcyc7XG5pbXBvcnQgaXNTdHJpY3RDb21wYXJhYmxlIGZyb20gJy4vX2lzU3RyaWN0Q29tcGFyYWJsZS5qcyc7XG5pbXBvcnQgbWF0Y2hlc1N0cmljdENvbXBhcmFibGUgZnJvbSAnLi9fbWF0Y2hlc1N0cmljdENvbXBhcmFibGUuanMnO1xuaW1wb3J0IHRvS2V5IGZyb20gJy4vX3RvS2V5LmpzJztcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgdmFsdWUgY29tcGFyaXNvbnMuICovXG52YXIgQ09NUEFSRV9QQVJUSUFMX0ZMQUcgPSAxLFxuICAgIENPTVBBUkVfVU5PUkRFUkVEX0ZMQUcgPSAyO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm1hdGNoZXNQcm9wZXJ0eWAgd2hpY2ggZG9lc24ndCBjbG9uZSBgc3JjVmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHBhcmFtIHsqfSBzcmNWYWx1ZSBUaGUgdmFsdWUgdG8gbWF0Y2guXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBzcGVjIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlTWF0Y2hlc1Byb3BlcnR5KHBhdGgsIHNyY1ZhbHVlKSB7XG4gIGlmIChpc0tleShwYXRoKSAmJiBpc1N0cmljdENvbXBhcmFibGUoc3JjVmFsdWUpKSB7XG4gICAgcmV0dXJuIG1hdGNoZXNTdHJpY3RDb21wYXJhYmxlKHRvS2V5KHBhdGgpLCBzcmNWYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBvYmpWYWx1ZSA9IGdldChvYmplY3QsIHBhdGgpO1xuICAgIHJldHVybiAob2JqVmFsdWUgPT09IHVuZGVmaW5lZCAmJiBvYmpWYWx1ZSA9PT0gc3JjVmFsdWUpXG4gICAgICA/IGhhc0luKG9iamVjdCwgcGF0aClcbiAgICAgIDogYmFzZUlzRXF1YWwoc3JjVmFsdWUsIG9ialZhbHVlLCBDT01QQVJFX1BBUlRJQUxfRkxBRyB8IENPTVBBUkVfVU5PUkRFUkVEX0ZMQUcpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlTWF0Y2hlc1Byb3BlcnR5O1xuIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBmaXJzdCBhcmd1bWVudCBpdCByZWNlaXZlcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHBhcmFtIHsqfSB2YWx1ZSBBbnkgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyBgdmFsdWVgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqXG4gKiBjb25zb2xlLmxvZyhfLmlkZW50aXR5KG9iamVjdCkgPT09IG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaWRlbnRpdHk7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnByb3BlcnR5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYWNjZXNzb3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eShrZXkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlUHJvcGVydHk7XG4iLCJpbXBvcnQgYmFzZUdldCBmcm9tICcuL19iYXNlR2V0LmpzJztcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VQcm9wZXJ0eWAgd2hpY2ggc3VwcG9ydHMgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFjY2Vzc29yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUHJvcGVydHlEZWVwKHBhdGgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBiYXNlR2V0KG9iamVjdCwgcGF0aCk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VQcm9wZXJ0eURlZXA7XG4iLCJpbXBvcnQgYmFzZVByb3BlcnR5IGZyb20gJy4vX2Jhc2VQcm9wZXJ0eS5qcyc7XG5pbXBvcnQgYmFzZVByb3BlcnR5RGVlcCBmcm9tICcuL19iYXNlUHJvcGVydHlEZWVwLmpzJztcbmltcG9ydCBpc0tleSBmcm9tICcuL19pc0tleS5qcyc7XG5pbXBvcnQgdG9LZXkgZnJvbSAnLi9fdG9LZXkuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIGF0IGBwYXRoYCBvZiBhIGdpdmVuIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuNC4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFjY2Vzc29yIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0cyA9IFtcbiAqICAgeyAnYSc6IHsgJ2InOiAyIH0gfSxcbiAqICAgeyAnYSc6IHsgJ2InOiAxIH0gfVxuICogXTtcbiAqXG4gKiBfLm1hcChvYmplY3RzLCBfLnByb3BlcnR5KCdhLmInKSk7XG4gKiAvLyA9PiBbMiwgMV1cbiAqXG4gKiBfLm1hcChfLnNvcnRCeShvYmplY3RzLCBfLnByb3BlcnR5KFsnYScsICdiJ10pKSwgJ2EuYicpO1xuICogLy8gPT4gWzEsIDJdXG4gKi9cbmZ1bmN0aW9uIHByb3BlcnR5KHBhdGgpIHtcbiAgcmV0dXJuIGlzS2V5KHBhdGgpID8gYmFzZVByb3BlcnR5KHRvS2V5KHBhdGgpKSA6IGJhc2VQcm9wZXJ0eURlZXAocGF0aCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHByb3BlcnR5O1xuIiwiaW1wb3J0IGJhc2VNYXRjaGVzIGZyb20gJy4vX2Jhc2VNYXRjaGVzLmpzJztcbmltcG9ydCBiYXNlTWF0Y2hlc1Byb3BlcnR5IGZyb20gJy4vX2Jhc2VNYXRjaGVzUHJvcGVydHkuanMnO1xuaW1wb3J0IGlkZW50aXR5IGZyb20gJy4vaWRlbnRpdHkuanMnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5LmpzJztcbmltcG9ydCBwcm9wZXJ0eSBmcm9tICcuL3Byb3BlcnR5LmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pdGVyYXRlZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gW3ZhbHVlPV8uaWRlbnRpdHldIFRoZSB2YWx1ZSB0byBjb252ZXJ0IHRvIGFuIGl0ZXJhdGVlLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBpdGVyYXRlZS5cbiAqL1xuZnVuY3Rpb24gYmFzZUl0ZXJhdGVlKHZhbHVlKSB7XG4gIC8vIERvbid0IHN0b3JlIHRoZSBgdHlwZW9mYCByZXN1bHQgaW4gYSB2YXJpYWJsZSB0byBhdm9pZCBhIEpJVCBidWcgaW4gU2FmYXJpIDkuXG4gIC8vIFNlZSBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTU2MDM0IGZvciBtb3JlIGRldGFpbHMuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiBpZGVudGl0eTtcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlID09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGlzQXJyYXkodmFsdWUpXG4gICAgICA/IGJhc2VNYXRjaGVzUHJvcGVydHkodmFsdWVbMF0sIHZhbHVlWzFdKVxuICAgICAgOiBiYXNlTWF0Y2hlcyh2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHByb3BlcnR5KHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUl0ZXJhdGVlO1xuIiwiLyoqXG4gKiBDcmVhdGVzIGEgYmFzZSBmdW5jdGlvbiBmb3IgbWV0aG9kcyBsaWtlIGBfLmZvckluYCBhbmQgYF8uZm9yT3duYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBiYXNlIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVCYXNlRm9yKGZyb21SaWdodCkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0LCBpdGVyYXRlZSwga2V5c0Z1bmMpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgaXRlcmFibGUgPSBPYmplY3Qob2JqZWN0KSxcbiAgICAgICAgcHJvcHMgPSBrZXlzRnVuYyhvYmplY3QpLFxuICAgICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgIHZhciBrZXkgPSBwcm9wc1tmcm9tUmlnaHQgPyBsZW5ndGggOiArK2luZGV4XTtcbiAgICAgIGlmIChpdGVyYXRlZShpdGVyYWJsZVtrZXldLCBrZXksIGl0ZXJhYmxlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUJhc2VGb3I7XG4iLCJpbXBvcnQgY3JlYXRlQmFzZUZvciBmcm9tICcuL19jcmVhdGVCYXNlRm9yLmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgYmFzZUZvck93bmAgd2hpY2ggaXRlcmF0ZXMgb3ZlciBgb2JqZWN0YFxuICogcHJvcGVydGllcyByZXR1cm5lZCBieSBga2V5c0Z1bmNgIGFuZCBpbnZva2VzIGBpdGVyYXRlZWAgZm9yIGVhY2ggcHJvcGVydHkuXG4gKiBJdGVyYXRlZSBmdW5jdGlvbnMgbWF5IGV4aXQgaXRlcmF0aW9uIGVhcmx5IGJ5IGV4cGxpY2l0bHkgcmV0dXJuaW5nIGBmYWxzZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0ga2V5c0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUga2V5cyBvZiBgb2JqZWN0YC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbnZhciBiYXNlRm9yID0gY3JlYXRlQmFzZUZvcigpO1xuXG5leHBvcnQgZGVmYXVsdCBiYXNlRm9yO1xuIiwiaW1wb3J0IGJhc2VGb3IgZnJvbSAnLi9fYmFzZUZvci5qcyc7XG5pbXBvcnQga2V5cyBmcm9tICcuL2tleXMuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZvck93bmAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGb3JPd24ob2JqZWN0LCBpdGVyYXRlZSkge1xuICByZXR1cm4gb2JqZWN0ICYmIGJhc2VGb3Iob2JqZWN0LCBpdGVyYXRlZSwga2V5cyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VGb3JPd247XG4iLCJpbXBvcnQgaXNBcnJheUxpa2UgZnJvbSAnLi9pc0FycmF5TGlrZS5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGBiYXNlRWFjaGAgb3IgYGJhc2VFYWNoUmlnaHRgIGZ1bmN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlYWNoRnVuYyBUaGUgZnVuY3Rpb24gdG8gaXRlcmF0ZSBvdmVyIGEgY29sbGVjdGlvbi5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYmFzZSBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQmFzZUVhY2goZWFjaEZ1bmMsIGZyb21SaWdodCkge1xuICByZXR1cm4gZnVuY3Rpb24oY29sbGVjdGlvbiwgaXRlcmF0ZWUpIHtcbiAgICBpZiAoY29sbGVjdGlvbiA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gY29sbGVjdGlvbjtcbiAgICB9XG4gICAgaWYgKCFpc0FycmF5TGlrZShjb2xsZWN0aW9uKSkge1xuICAgICAgcmV0dXJuIGVhY2hGdW5jKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKTtcbiAgICB9XG4gICAgdmFyIGxlbmd0aCA9IGNvbGxlY3Rpb24ubGVuZ3RoLFxuICAgICAgICBpbmRleCA9IGZyb21SaWdodCA/IGxlbmd0aCA6IC0xLFxuICAgICAgICBpdGVyYWJsZSA9IE9iamVjdChjb2xsZWN0aW9uKTtcblxuICAgIHdoaWxlICgoZnJvbVJpZ2h0ID8gaW5kZXgtLSA6ICsraW5kZXggPCBsZW5ndGgpKSB7XG4gICAgICBpZiAoaXRlcmF0ZWUoaXRlcmFibGVbaW5kZXhdLCBpbmRleCwgaXRlcmFibGUpID09PSBmYWxzZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUJhc2VFYWNoO1xuIiwiaW1wb3J0IGJhc2VGb3JPd24gZnJvbSAnLi9fYmFzZUZvck93bi5qcyc7XG5pbXBvcnQgY3JlYXRlQmFzZUVhY2ggZnJvbSAnLi9fY3JlYXRlQmFzZUVhY2guanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZvckVhY2hgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheXxPYmplY3R9IFJldHVybnMgYGNvbGxlY3Rpb25gLlxuICovXG52YXIgYmFzZUVhY2ggPSBjcmVhdGVCYXNlRWFjaChiYXNlRm9yT3duKTtcblxuZXhwb3J0IGRlZmF1bHQgYmFzZUVhY2g7XG4iLCJpbXBvcnQgYmFzZUVhY2ggZnJvbSAnLi9fYmFzZUVhY2guanMnO1xuaW1wb3J0IGlzQXJyYXlMaWtlIGZyb20gJy4vaXNBcnJheUxpa2UuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm1hcGAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgbWFwcGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBiYXNlTWFwKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gaXNBcnJheUxpa2UoY29sbGVjdGlvbikgPyBBcnJheShjb2xsZWN0aW9uLmxlbmd0aCkgOiBbXTtcblxuICBiYXNlRWFjaChjb2xsZWN0aW9uLCBmdW5jdGlvbih2YWx1ZSwga2V5LCBjb2xsZWN0aW9uKSB7XG4gICAgcmVzdWx0WysraW5kZXhdID0gaXRlcmF0ZWUodmFsdWUsIGtleSwgY29sbGVjdGlvbik7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlTWFwO1xuIiwiaW1wb3J0IGFycmF5TWFwIGZyb20gJy4vX2FycmF5TWFwLmpzJztcbmltcG9ydCBiYXNlSXRlcmF0ZWUgZnJvbSAnLi9fYmFzZUl0ZXJhdGVlLmpzJztcbmltcG9ydCBiYXNlTWFwIGZyb20gJy4vX2Jhc2VNYXAuanMnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5LmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHZhbHVlcyBieSBydW5uaW5nIGVhY2ggZWxlbWVudCBpbiBgY29sbGVjdGlvbmAgdGhydVxuICogYGl0ZXJhdGVlYC4gVGhlIGl0ZXJhdGVlIGlzIGludm9rZWQgd2l0aCB0aHJlZSBhcmd1bWVudHM6XG4gKiAodmFsdWUsIGluZGV4fGtleSwgY29sbGVjdGlvbikuXG4gKlxuICogTWFueSBsb2Rhc2ggbWV0aG9kcyBhcmUgZ3VhcmRlZCB0byB3b3JrIGFzIGl0ZXJhdGVlcyBmb3IgbWV0aG9kcyBsaWtlXG4gKiBgXy5ldmVyeWAsIGBfLmZpbHRlcmAsIGBfLm1hcGAsIGBfLm1hcFZhbHVlc2AsIGBfLnJlamVjdGAsIGFuZCBgXy5zb21lYC5cbiAqXG4gKiBUaGUgZ3VhcmRlZCBtZXRob2RzIGFyZTpcbiAqIGBhcnlgLCBgY2h1bmtgLCBgY3VycnlgLCBgY3VycnlSaWdodGAsIGBkcm9wYCwgYGRyb3BSaWdodGAsIGBldmVyeWAsXG4gKiBgZmlsbGAsIGBpbnZlcnRgLCBgcGFyc2VJbnRgLCBgcmFuZG9tYCwgYHJhbmdlYCwgYHJhbmdlUmlnaHRgLCBgcmVwZWF0YCxcbiAqIGBzYW1wbGVTaXplYCwgYHNsaWNlYCwgYHNvbWVgLCBgc29ydEJ5YCwgYHNwbGl0YCwgYHRha2VgLCBgdGFrZVJpZ2h0YCxcbiAqIGB0ZW1wbGF0ZWAsIGB0cmltYCwgYHRyaW1FbmRgLCBgdHJpbVN0YXJ0YCwgYW5kIGB3b3Jkc2BcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2l0ZXJhdGVlPV8uaWRlbnRpdHldIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBtYXBwZWQgYXJyYXkuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIHNxdWFyZShuKSB7XG4gKiAgIHJldHVybiBuICogbjtcbiAqIH1cbiAqXG4gKiBfLm1hcChbNCwgOF0sIHNxdWFyZSk7XG4gKiAvLyA9PiBbMTYsIDY0XVxuICpcbiAqIF8ubWFwKHsgJ2EnOiA0LCAnYic6IDggfSwgc3F1YXJlKTtcbiAqIC8vID0+IFsxNiwgNjRdIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKlxuICogdmFyIHVzZXJzID0gW1xuICogICB7ICd1c2VyJzogJ2Jhcm5leScgfSxcbiAqICAgeyAndXNlcic6ICdmcmVkJyB9XG4gKiBdO1xuICpcbiAqIC8vIFRoZSBgXy5wcm9wZXJ0eWAgaXRlcmF0ZWUgc2hvcnRoYW5kLlxuICogXy5tYXAodXNlcnMsICd1c2VyJyk7XG4gKiAvLyA9PiBbJ2Jhcm5leScsICdmcmVkJ11cbiAqL1xuZnVuY3Rpb24gbWFwKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKSB7XG4gIHZhciBmdW5jID0gaXNBcnJheShjb2xsZWN0aW9uKSA/IGFycmF5TWFwIDogYmFzZU1hcDtcbiAgcmV0dXJuIGZ1bmMoY29sbGVjdGlvbiwgYmFzZUl0ZXJhdGVlKGl0ZXJhdGVlLCAzKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1hcDtcbiIsImltcG9ydCBiYXNlRWFjaCBmcm9tICcuL19iYXNlRWFjaC5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZmlsdGVyYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZmlsdGVyZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGaWx0ZXIoY29sbGVjdGlvbiwgcHJlZGljYXRlKSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgYmFzZUVhY2goY29sbGVjdGlvbiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSB7XG4gICAgaWYgKHByZWRpY2F0ZSh2YWx1ZSwgaW5kZXgsIGNvbGxlY3Rpb24pKSB7XG4gICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUZpbHRlcjtcbiIsImltcG9ydCBhcnJheUZpbHRlciBmcm9tICcuL19hcnJheUZpbHRlci5qcyc7XG5pbXBvcnQgYmFzZUZpbHRlciBmcm9tICcuL19iYXNlRmlsdGVyLmpzJztcbmltcG9ydCBiYXNlSXRlcmF0ZWUgZnJvbSAnLi9fYmFzZUl0ZXJhdGVlLmpzJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy4vaXNBcnJheS5qcyc7XG5cbi8qKlxuICogSXRlcmF0ZXMgb3ZlciBlbGVtZW50cyBvZiBgY29sbGVjdGlvbmAsIHJldHVybmluZyBhbiBhcnJheSBvZiBhbGwgZWxlbWVudHNcbiAqIGBwcmVkaWNhdGVgIHJldHVybnMgdHJ1dGh5IGZvci4gVGhlIHByZWRpY2F0ZSBpcyBpbnZva2VkIHdpdGggdGhyZWVcbiAqIGFyZ3VtZW50czogKHZhbHVlLCBpbmRleHxrZXksIGNvbGxlY3Rpb24pLlxuICpcbiAqICoqTm90ZToqKiBVbmxpa2UgYF8ucmVtb3ZlYCwgdGhpcyBtZXRob2QgcmV0dXJucyBhIG5ldyBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3ByZWRpY2F0ZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZmlsdGVyZWQgYXJyYXkuXG4gKiBAc2VlIF8ucmVqZWN0XG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciB1c2VycyA9IFtcbiAqICAgeyAndXNlcic6ICdiYXJuZXknLCAnYWdlJzogMzYsICdhY3RpdmUnOiB0cnVlIH0sXG4gKiAgIHsgJ3VzZXInOiAnZnJlZCcsICAgJ2FnZSc6IDQwLCAnYWN0aXZlJzogZmFsc2UgfVxuICogXTtcbiAqXG4gKiBfLmZpbHRlcih1c2VycywgZnVuY3Rpb24obykgeyByZXR1cm4gIW8uYWN0aXZlOyB9KTtcbiAqIC8vID0+IG9iamVjdHMgZm9yIFsnZnJlZCddXG4gKlxuICogLy8gVGhlIGBfLm1hdGNoZXNgIGl0ZXJhdGVlIHNob3J0aGFuZC5cbiAqIF8uZmlsdGVyKHVzZXJzLCB7ICdhZ2UnOiAzNiwgJ2FjdGl2ZSc6IHRydWUgfSk7XG4gKiAvLyA9PiBvYmplY3RzIGZvciBbJ2Jhcm5leSddXG4gKlxuICogLy8gVGhlIGBfLm1hdGNoZXNQcm9wZXJ0eWAgaXRlcmF0ZWUgc2hvcnRoYW5kLlxuICogXy5maWx0ZXIodXNlcnMsIFsnYWN0aXZlJywgZmFsc2VdKTtcbiAqIC8vID0+IG9iamVjdHMgZm9yIFsnZnJlZCddXG4gKlxuICogLy8gVGhlIGBfLnByb3BlcnR5YCBpdGVyYXRlZSBzaG9ydGhhbmQuXG4gKiBfLmZpbHRlcih1c2VycywgJ2FjdGl2ZScpO1xuICogLy8gPT4gb2JqZWN0cyBmb3IgWydiYXJuZXknXVxuICovXG5mdW5jdGlvbiBmaWx0ZXIoY29sbGVjdGlvbiwgcHJlZGljYXRlKSB7XG4gIHZhciBmdW5jID0gaXNBcnJheShjb2xsZWN0aW9uKSA/IGFycmF5RmlsdGVyIDogYmFzZUZpbHRlcjtcbiAgcmV0dXJuIGZ1bmMoY29sbGVjdGlvbiwgYmFzZUl0ZXJhdGVlKHByZWRpY2F0ZSwgMykpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmaWx0ZXI7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZpbmRJbmRleGAgYW5kIGBfLmZpbmRMYXN0SW5kZXhgIHdpdGhvdXRcbiAqIHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUZpbmRJbmRleChhcnJheSwgcHJlZGljYXRlLCBmcm9tSW5kZXgsIGZyb21SaWdodCkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgaW5kZXggPSBmcm9tSW5kZXggKyAoZnJvbVJpZ2h0ID8gMSA6IC0xKTtcblxuICB3aGlsZSAoKGZyb21SaWdodCA/IGluZGV4LS0gOiArK2luZGV4IDwgbGVuZ3RoKSkge1xuICAgIGlmIChwcmVkaWNhdGUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpKSB7XG4gICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUZpbmRJbmRleDtcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNOYU5gIHdpdGhvdXQgc3VwcG9ydCBmb3IgbnVtYmVyIG9iamVjdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYE5hTmAsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTmFOKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VJc05hTjtcbiIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmluZGV4T2ZgIHdoaWNoIHBlcmZvcm1zIHN0cmljdCBlcXVhbGl0eVxuICogY29tcGFyaXNvbnMgb2YgdmFsdWVzLCBpLmUuIGA9PT1gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIHN0cmljdEluZGV4T2YoYXJyYXksIHZhbHVlLCBmcm9tSW5kZXgpIHtcbiAgdmFyIGluZGV4ID0gZnJvbUluZGV4IC0gMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChhcnJheVtpbmRleF0gPT09IHZhbHVlKSB7XG4gICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RyaWN0SW5kZXhPZjtcbiIsImltcG9ydCBiYXNlRmluZEluZGV4IGZyb20gJy4vX2Jhc2VGaW5kSW5kZXguanMnO1xuaW1wb3J0IGJhc2VJc05hTiBmcm9tICcuL19iYXNlSXNOYU4uanMnO1xuaW1wb3J0IHN0cmljdEluZGV4T2YgZnJvbSAnLi9fc3RyaWN0SW5kZXhPZi5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaW5kZXhPZmAgd2l0aG91dCBgZnJvbUluZGV4YCBib3VuZHMgY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNlYXJjaCBmb3IuXG4gKiBAcGFyYW0ge251bWJlcn0gZnJvbUluZGV4IFRoZSBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJbmRleE9mKGFycmF5LCB2YWx1ZSwgZnJvbUluZGV4KSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gdmFsdWVcbiAgICA/IHN0cmljdEluZGV4T2YoYXJyYXksIHZhbHVlLCBmcm9tSW5kZXgpXG4gICAgOiBiYXNlRmluZEluZGV4KGFycmF5LCBiYXNlSXNOYU4sIGZyb21JbmRleCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VJbmRleE9mO1xuIiwiaW1wb3J0IGJhc2VJbmRleE9mIGZyb20gJy4vX2Jhc2VJbmRleE9mLmpzJztcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uaW5jbHVkZXNgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvclxuICogc3BlY2lmeWluZyBhbiBpbmRleCB0byBzZWFyY2ggZnJvbS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0gdGFyZ2V0IFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB0YXJnZXRgIGlzIGZvdW5kLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5SW5jbHVkZXMoYXJyYXksIHZhbHVlKSB7XG4gIHZhciBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmIGJhc2VJbmRleE9mKGFycmF5LCB2YWx1ZSwgMCkgPiAtMTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXJyYXlJbmNsdWRlcztcbiIsIi8qKlxuICogVGhpcyBmdW5jdGlvbiBpcyBsaWtlIGBhcnJheUluY2x1ZGVzYCBleGNlcHQgdGhhdCBpdCBhY2NlcHRzIGEgY29tcGFyYXRvci5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0gdGFyZ2V0IFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY29tcGFyYXRvciBUaGUgY29tcGFyYXRvciBpbnZva2VkIHBlciBlbGVtZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB0YXJnZXRgIGlzIGZvdW5kLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5SW5jbHVkZXNXaXRoKGFycmF5LCB2YWx1ZSwgY29tcGFyYXRvcikge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID09IG51bGwgPyAwIDogYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGNvbXBhcmF0b3IodmFsdWUsIGFycmF5W2luZGV4XSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFycmF5SW5jbHVkZXNXaXRoO1xuIiwiaW1wb3J0IFNldENhY2hlIGZyb20gJy4vX1NldENhY2hlLmpzJztcbmltcG9ydCBhcnJheUluY2x1ZGVzIGZyb20gJy4vX2FycmF5SW5jbHVkZXMuanMnO1xuaW1wb3J0IGFycmF5SW5jbHVkZXNXaXRoIGZyb20gJy4vX2FycmF5SW5jbHVkZXNXaXRoLmpzJztcbmltcG9ydCBhcnJheU1hcCBmcm9tICcuL19hcnJheU1hcC5qcyc7XG5pbXBvcnQgYmFzZVVuYXJ5IGZyb20gJy4vX2Jhc2VVbmFyeS5qcyc7XG5pbXBvcnQgY2FjaGVIYXMgZnJvbSAnLi9fY2FjaGVIYXMuanMnO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTWluID0gTWF0aC5taW47XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgbWV0aG9kcyBsaWtlIGBfLmludGVyc2VjdGlvbmAsIHdpdGhvdXQgc3VwcG9ydFxuICogZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMsIHRoYXQgYWNjZXB0cyBhbiBhcnJheSBvZiBhcnJheXMgdG8gaW5zcGVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXlzIFRoZSBhcnJheXMgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZV0gVGhlIGl0ZXJhdGVlIGludm9rZWQgcGVyIGVsZW1lbnQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY29tcGFyYXRvcl0gVGhlIGNvbXBhcmF0b3IgaW52b2tlZCBwZXIgZWxlbWVudC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGFycmF5IG9mIHNoYXJlZCB2YWx1ZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJbnRlcnNlY3Rpb24oYXJyYXlzLCBpdGVyYXRlZSwgY29tcGFyYXRvcikge1xuICB2YXIgaW5jbHVkZXMgPSBjb21wYXJhdG9yID8gYXJyYXlJbmNsdWRlc1dpdGggOiBhcnJheUluY2x1ZGVzLFxuICAgICAgbGVuZ3RoID0gYXJyYXlzWzBdLmxlbmd0aCxcbiAgICAgIG90aExlbmd0aCA9IGFycmF5cy5sZW5ndGgsXG4gICAgICBvdGhJbmRleCA9IG90aExlbmd0aCxcbiAgICAgIGNhY2hlcyA9IEFycmF5KG90aExlbmd0aCksXG4gICAgICBtYXhMZW5ndGggPSBJbmZpbml0eSxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIHdoaWxlIChvdGhJbmRleC0tKSB7XG4gICAgdmFyIGFycmF5ID0gYXJyYXlzW290aEluZGV4XTtcbiAgICBpZiAob3RoSW5kZXggJiYgaXRlcmF0ZWUpIHtcbiAgICAgIGFycmF5ID0gYXJyYXlNYXAoYXJyYXksIGJhc2VVbmFyeShpdGVyYXRlZSkpO1xuICAgIH1cbiAgICBtYXhMZW5ndGggPSBuYXRpdmVNaW4oYXJyYXkubGVuZ3RoLCBtYXhMZW5ndGgpO1xuICAgIGNhY2hlc1tvdGhJbmRleF0gPSAhY29tcGFyYXRvciAmJiAoaXRlcmF0ZWUgfHwgKGxlbmd0aCA+PSAxMjAgJiYgYXJyYXkubGVuZ3RoID49IDEyMCkpXG4gICAgICA/IG5ldyBTZXRDYWNoZShvdGhJbmRleCAmJiBhcnJheSlcbiAgICAgIDogdW5kZWZpbmVkO1xuICB9XG4gIGFycmF5ID0gYXJyYXlzWzBdO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgc2VlbiA9IGNhY2hlc1swXTtcblxuICBvdXRlcjpcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGggJiYgcmVzdWx0Lmxlbmd0aCA8IG1heExlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgY29tcHV0ZWQgPSBpdGVyYXRlZSA/IGl0ZXJhdGVlKHZhbHVlKSA6IHZhbHVlO1xuXG4gICAgdmFsdWUgPSAoY29tcGFyYXRvciB8fCB2YWx1ZSAhPT0gMCkgPyB2YWx1ZSA6IDA7XG4gICAgaWYgKCEoc2VlblxuICAgICAgICAgID8gY2FjaGVIYXMoc2VlbiwgY29tcHV0ZWQpXG4gICAgICAgICAgOiBpbmNsdWRlcyhyZXN1bHQsIGNvbXB1dGVkLCBjb21wYXJhdG9yKVxuICAgICAgICApKSB7XG4gICAgICBvdGhJbmRleCA9IG90aExlbmd0aDtcbiAgICAgIHdoaWxlICgtLW90aEluZGV4KSB7XG4gICAgICAgIHZhciBjYWNoZSA9IGNhY2hlc1tvdGhJbmRleF07XG4gICAgICAgIGlmICghKGNhY2hlXG4gICAgICAgICAgICAgID8gY2FjaGVIYXMoY2FjaGUsIGNvbXB1dGVkKVxuICAgICAgICAgICAgICA6IGluY2x1ZGVzKGFycmF5c1tvdGhJbmRleF0sIGNvbXB1dGVkLCBjb21wYXJhdG9yKSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgIGNvbnRpbnVlIG91dGVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc2Vlbikge1xuICAgICAgICBzZWVuLnB1c2goY29tcHV0ZWQpO1xuICAgICAgfVxuICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlSW50ZXJzZWN0aW9uO1xuIiwiLyoqXG4gKiBBIGZhc3RlciBhbHRlcm5hdGl2ZSB0byBgRnVuY3Rpb24jYXBwbHlgLCB0aGlzIGZ1bmN0aW9uIGludm9rZXMgYGZ1bmNgXG4gKiB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiBgdGhpc0FyZ2AgYW5kIHRoZSBhcmd1bWVudHMgb2YgYGFyZ3NgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBpbnZva2UuXG4gKiBAcGFyYW0geyp9IHRoaXNBcmcgVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyZ3MgVGhlIGFyZ3VtZW50cyB0byBpbnZva2UgYGZ1bmNgIHdpdGguXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzdWx0IG9mIGBmdW5jYC5cbiAqL1xuZnVuY3Rpb24gYXBwbHkoZnVuYywgdGhpc0FyZywgYXJncykge1xuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcpO1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICB9XG4gIHJldHVybiBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhcHBseTtcbiIsImltcG9ydCBhcHBseSBmcm9tICcuL19hcHBseS5qcyc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VSZXN0YCB3aGljaCB0cmFuc2Zvcm1zIHRoZSByZXN0IGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD1mdW5jLmxlbmd0aC0xXSBUaGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHJlc3QgcGFyYW1ldGVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSByZXN0IGFycmF5IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyUmVzdChmdW5jLCBzdGFydCwgdHJhbnNmb3JtKSB7XG4gIHN0YXJ0ID0gbmF0aXZlTWF4KHN0YXJ0ID09PSB1bmRlZmluZWQgPyAoZnVuYy5sZW5ndGggLSAxKSA6IHN0YXJ0LCAwKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBuYXRpdmVNYXgoYXJncy5sZW5ndGggLSBzdGFydCwgMCksXG4gICAgICAgIGFycmF5ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICBhcnJheVtpbmRleF0gPSBhcmdzW3N0YXJ0ICsgaW5kZXhdO1xuICAgIH1cbiAgICBpbmRleCA9IC0xO1xuICAgIHZhciBvdGhlckFyZ3MgPSBBcnJheShzdGFydCArIDEpO1xuICAgIHdoaWxlICgrK2luZGV4IDwgc3RhcnQpIHtcbiAgICAgIG90aGVyQXJnc1tpbmRleF0gPSBhcmdzW2luZGV4XTtcbiAgICB9XG4gICAgb3RoZXJBcmdzW3N0YXJ0XSA9IHRyYW5zZm9ybShhcnJheSk7XG4gICAgcmV0dXJuIGFwcGx5KGZ1bmMsIHRoaXMsIG90aGVyQXJncyk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IG92ZXJSZXN0O1xuIiwiLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGB2YWx1ZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjQuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHJldHVybiBmcm9tIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjb25zdGFudCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdHMgPSBfLnRpbWVzKDIsIF8uY29uc3RhbnQoeyAnYSc6IDEgfSkpO1xuICpcbiAqIGNvbnNvbGUubG9nKG9iamVjdHMpO1xuICogLy8gPT4gW3sgJ2EnOiAxIH0sIHsgJ2EnOiAxIH1dXG4gKlxuICogY29uc29sZS5sb2cob2JqZWN0c1swXSA9PT0gb2JqZWN0c1sxXSk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGNvbnN0YW50KHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnN0YW50O1xuIiwiaW1wb3J0IGdldE5hdGl2ZSBmcm9tICcuL19nZXROYXRpdmUuanMnO1xuXG52YXIgZGVmaW5lUHJvcGVydHkgPSAoZnVuY3Rpb24oKSB7XG4gIHRyeSB7XG4gICAgdmFyIGZ1bmMgPSBnZXROYXRpdmUoT2JqZWN0LCAnZGVmaW5lUHJvcGVydHknKTtcbiAgICBmdW5jKHt9LCAnJywge30pO1xuICAgIHJldHVybiBmdW5jO1xuICB9IGNhdGNoIChlKSB7fVxufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lUHJvcGVydHk7XG4iLCJpbXBvcnQgY29uc3RhbnQgZnJvbSAnLi9jb25zdGFudC5qcyc7XG5pbXBvcnQgZGVmaW5lUHJvcGVydHkgZnJvbSAnLi9fZGVmaW5lUHJvcGVydHkuanMnO1xuaW1wb3J0IGlkZW50aXR5IGZyb20gJy4vaWRlbnRpdHkuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBzZXRUb1N0cmluZ2Agd2l0aG91dCBzdXBwb3J0IGZvciBob3QgbG9vcCBzaG9ydGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3RyaW5nIFRoZSBgdG9TdHJpbmdgIHJlc3VsdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyBgZnVuY2AuXG4gKi9cbnZhciBiYXNlU2V0VG9TdHJpbmcgPSAhZGVmaW5lUHJvcGVydHkgPyBpZGVudGl0eSA6IGZ1bmN0aW9uKGZ1bmMsIHN0cmluZykge1xuICByZXR1cm4gZGVmaW5lUHJvcGVydHkoZnVuYywgJ3RvU3RyaW5nJywge1xuICAgICdjb25maWd1cmFibGUnOiB0cnVlLFxuICAgICdlbnVtZXJhYmxlJzogZmFsc2UsXG4gICAgJ3ZhbHVlJzogY29uc3RhbnQoc3RyaW5nKSxcbiAgICAnd3JpdGFibGUnOiB0cnVlXG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgYmFzZVNldFRvU3RyaW5nO1xuIiwiLyoqIFVzZWQgdG8gZGV0ZWN0IGhvdCBmdW5jdGlvbnMgYnkgbnVtYmVyIG9mIGNhbGxzIHdpdGhpbiBhIHNwYW4gb2YgbWlsbGlzZWNvbmRzLiAqL1xudmFyIEhPVF9DT1VOVCA9IDgwMCxcbiAgICBIT1RfU1BBTiA9IDE2O1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTm93ID0gRGF0ZS5ub3c7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQnbGwgc2hvcnQgb3V0IGFuZCBpbnZva2UgYGlkZW50aXR5YCBpbnN0ZWFkXG4gKiBvZiBgZnVuY2Agd2hlbiBpdCdzIGNhbGxlZCBgSE9UX0NPVU5UYCBvciBtb3JlIHRpbWVzIGluIGBIT1RfU1BBTmBcbiAqIG1pbGxpc2Vjb25kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcmVzdHJpY3QuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBzaG9ydGFibGUgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIHNob3J0T3V0KGZ1bmMpIHtcbiAgdmFyIGNvdW50ID0gMCxcbiAgICAgIGxhc3RDYWxsZWQgPSAwO1xuXG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RhbXAgPSBuYXRpdmVOb3coKSxcbiAgICAgICAgcmVtYWluaW5nID0gSE9UX1NQQU4gLSAoc3RhbXAgLSBsYXN0Q2FsbGVkKTtcblxuICAgIGxhc3RDYWxsZWQgPSBzdGFtcDtcbiAgICBpZiAocmVtYWluaW5nID4gMCkge1xuICAgICAgaWYgKCsrY291bnQgPj0gSE9UX0NPVU5UKSB7XG4gICAgICAgIHJldHVybiBhcmd1bWVudHNbMF07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvdW50ID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmMuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBzaG9ydE91dDtcbiIsImltcG9ydCBiYXNlU2V0VG9TdHJpbmcgZnJvbSAnLi9fYmFzZVNldFRvU3RyaW5nLmpzJztcbmltcG9ydCBzaG9ydE91dCBmcm9tICcuL19zaG9ydE91dC5qcyc7XG5cbi8qKlxuICogU2V0cyB0aGUgYHRvU3RyaW5nYCBtZXRob2Qgb2YgYGZ1bmNgIHRvIHJldHVybiBgc3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3RyaW5nIFRoZSBgdG9TdHJpbmdgIHJlc3VsdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyBgZnVuY2AuXG4gKi9cbnZhciBzZXRUb1N0cmluZyA9IHNob3J0T3V0KGJhc2VTZXRUb1N0cmluZyk7XG5cbmV4cG9ydCBkZWZhdWx0IHNldFRvU3RyaW5nO1xuIiwiaW1wb3J0IGlkZW50aXR5IGZyb20gJy4vaWRlbnRpdHkuanMnO1xuaW1wb3J0IG92ZXJSZXN0IGZyb20gJy4vX292ZXJSZXN0LmpzJztcbmltcG9ydCBzZXRUb1N0cmluZyBmcm9tICcuL19zZXRUb1N0cmluZy5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucmVzdGAgd2hpY2ggZG9lc24ndCB2YWxpZGF0ZSBvciBjb2VyY2UgYXJndW1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD1mdW5jLmxlbmd0aC0xXSBUaGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHJlc3QgcGFyYW1ldGVyLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VSZXN0KGZ1bmMsIHN0YXJ0KSB7XG4gIHJldHVybiBzZXRUb1N0cmluZyhvdmVyUmVzdChmdW5jLCBzdGFydCwgaWRlbnRpdHkpLCBmdW5jICsgJycpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlUmVzdDtcbiIsImltcG9ydCBpc0FycmF5TGlrZSBmcm9tICcuL2lzQXJyYXlMaWtlLmpzJztcbmltcG9ydCBpc09iamVjdExpa2UgZnJvbSAnLi9pc09iamVjdExpa2UuanMnO1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uaXNBcnJheUxpa2VgIGV4Y2VwdCB0aGF0IGl0IGFsc28gY2hlY2tzIGlmIGB2YWx1ZWBcbiAqIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheS1saWtlIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0FycmF5TGlrZSh2YWx1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzQXJyYXlMaWtlT2JqZWN0O1xuIiwiaW1wb3J0IGlzQXJyYXlMaWtlT2JqZWN0IGZyb20gJy4vaXNBcnJheUxpa2VPYmplY3QuanMnO1xuXG4vKipcbiAqIENhc3RzIGB2YWx1ZWAgdG8gYW4gZW1wdHkgYXJyYXkgaWYgaXQncyBub3QgYW4gYXJyYXkgbGlrZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7QXJyYXl8T2JqZWN0fSBSZXR1cm5zIHRoZSBjYXN0IGFycmF5LWxpa2Ugb2JqZWN0LlxuICovXG5mdW5jdGlvbiBjYXN0QXJyYXlMaWtlT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkgPyB2YWx1ZSA6IFtdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjYXN0QXJyYXlMaWtlT2JqZWN0O1xuIiwiaW1wb3J0IGFycmF5TWFwIGZyb20gJy4vX2FycmF5TWFwLmpzJztcbmltcG9ydCBiYXNlSW50ZXJzZWN0aW9uIGZyb20gJy4vX2Jhc2VJbnRlcnNlY3Rpb24uanMnO1xuaW1wb3J0IGJhc2VSZXN0IGZyb20gJy4vX2Jhc2VSZXN0LmpzJztcbmltcG9ydCBjYXN0QXJyYXlMaWtlT2JqZWN0IGZyb20gJy4vX2Nhc3RBcnJheUxpa2VPYmplY3QuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdW5pcXVlIHZhbHVlcyB0aGF0IGFyZSBpbmNsdWRlZCBpbiBhbGwgZ2l2ZW4gYXJyYXlzXG4gKiB1c2luZyBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogZm9yIGVxdWFsaXR5IGNvbXBhcmlzb25zLiBUaGUgb3JkZXIgYW5kIHJlZmVyZW5jZXMgb2YgcmVzdWx0IHZhbHVlcyBhcmVcbiAqIGRldGVybWluZWQgYnkgdGhlIGZpcnN0IGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBBcnJheVxuICogQHBhcmFtIHsuLi5BcnJheX0gW2FycmF5c10gVGhlIGFycmF5cyB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgYXJyYXkgb2YgaW50ZXJzZWN0aW5nIHZhbHVlcy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pbnRlcnNlY3Rpb24oWzIsIDFdLCBbMiwgM10pO1xuICogLy8gPT4gWzJdXG4gKi9cbnZhciBpbnRlcnNlY3Rpb24gPSBiYXNlUmVzdChmdW5jdGlvbihhcnJheXMpIHtcbiAgdmFyIG1hcHBlZCA9IGFycmF5TWFwKGFycmF5cywgY2FzdEFycmF5TGlrZU9iamVjdCk7XG4gIHJldHVybiAobWFwcGVkLmxlbmd0aCAmJiBtYXBwZWRbMF0gPT09IGFycmF5c1swXSlcbiAgICA/IGJhc2VJbnRlcnNlY3Rpb24obWFwcGVkKVxuICAgIDogW107XG59KTtcblxuZXhwb3J0IGRlZmF1bHQgaW50ZXJzZWN0aW9uO1xuIiwiaW1wb3J0IG1hcCBmcm9tICdsb2Rhc2gtZXMvbWFwJztcbi8vaW1wb3J0IGVhY2ggZnJvbSAnbG9kYXNoLWVzL2VhY2gnO1xuaW1wb3J0IGZpbHRlciBmcm9tICdsb2Rhc2gtZXMvZmlsdGVyJztcbmltcG9ydCBpc0FycmF5IGZyb20gJ2xvZGFzaC1lcy9pc0FycmF5JztcbmltcG9ydCBpbnRlcnNlY3Rpb24gZnJvbSAnbG9kYXNoLWVzL2ludGVyc2VjdGlvbic7XG5cbmNvbnN0IEFMSUFTRVMgPSB7XG4gICAgJ3N0cmVldCc6IFsnc3RyZWV0X251bWJlcicsICdyb3V0ZScsICdpbnRlcnNlY3Rpb24nXSxcbiAgICAnY2l0eSc6IFsnbG9jYWxpdHknXSxcbiAgICAnc3RhdGUnOiBbJ2FkbWluaXN0cmF0aXZlX2FyZWFfbGV2ZWxfMSddLFxuICAgICd6aXAnOiBbJ3Bvc3RhbF9jb2RlJ10sXG4gICAgJ3ppcGNvZGUnOiBbJ3Bvc3RhbF9jb2RlJ10sXG4gICAgJ2NvdW50eSc6IFsnYWRtaW5pc3RyYXRpdmVfYXJlYV9sZXZlbF8yJ11cbn07XG5cbmZ1bmN0aW9uIGV4dHJhY3QodHlwZSwgZ2VvY29kZXIpIHtcbiAgICBjb25zdCB0eXBlcyA9IEFMSUFTRVNbdHlwZV0gfHwgKGlzQXJyYXkodHlwZSkgPyB0eXBlIDogW3R5cGVdKTtcblxuICAgIGNvbnN0IHZhbHVlcyA9IGZpbHRlcihtYXAoZ2VvY29kZXIuYWRkcmVzc19jb21wb25lbnRzLCBjb21wb25lbnQgPT4ge1xuICAgICAgICBpZihpbnRlcnNlY3Rpb24oY29tcG9uZW50LnR5cGVzLCB0eXBlcykubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gY29tcG9uZW50LmxvbmdfbmFtZTtcbiAgICAgICAgfVxuICAgIH0pKTtcblxuICAgIHJldHVybiB2YWx1ZXMubGVuZ3RoID8gdmFsdWVzLmpvaW4oJyAnKSA6IG51bGw7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIGJpbmQoZWwsIGJpbmRpbmcsIHZub2RlKSB7XG4gICAgICAgIHZub2RlLmNvbXBvbmVudEluc3RhbmNlLiRvbignc2VsZWN0JywgKHBsYWNlLCBnZW9jb2RlcikgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gZmlsdGVyKG1hcChiaW5kaW5nLm1vZGlmaWVycywgKHZhbHVlLCBtb2RpZmllcikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBleHRyYWN0KG1vZGlmaWVyLCBnZW9jb2Rlcik7XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgIHZub2RlLmNvbnRleHRbYmluZGluZy5leHByZXNzaW9uXSA9IHZhbHVlcy5sZW5ndGggPyB2YWx1ZXMuam9pbignICcpIDogbnVsbDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbn07XG4iLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5mb3JFYWNoYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3JcbiAqIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlFYWNoKGFycmF5LCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID09IG51bGwgPyAwIDogYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGl0ZXJhdGVlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSA9PT0gZmFsc2UpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFycmF5RWFjaDtcbiIsImltcG9ydCBpZGVudGl0eSBmcm9tICcuL2lkZW50aXR5LmpzJztcblxuLyoqXG4gKiBDYXN0cyBgdmFsdWVgIHRvIGBpZGVudGl0eWAgaWYgaXQncyBub3QgYSBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyBjYXN0IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjYXN0RnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnZnVuY3Rpb24nID8gdmFsdWUgOiBpZGVudGl0eTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2FzdEZ1bmN0aW9uO1xuIiwiaW1wb3J0IGFycmF5RWFjaCBmcm9tICcuL19hcnJheUVhY2guanMnO1xuaW1wb3J0IGJhc2VFYWNoIGZyb20gJy4vX2Jhc2VFYWNoLmpzJztcbmltcG9ydCBjYXN0RnVuY3Rpb24gZnJvbSAnLi9fY2FzdEZ1bmN0aW9uLmpzJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy4vaXNBcnJheS5qcyc7XG5cbi8qKlxuICogSXRlcmF0ZXMgb3ZlciBlbGVtZW50cyBvZiBgY29sbGVjdGlvbmAgYW5kIGludm9rZXMgYGl0ZXJhdGVlYCBmb3IgZWFjaCBlbGVtZW50LlxuICogVGhlIGl0ZXJhdGVlIGlzIGludm9rZWQgd2l0aCB0aHJlZSBhcmd1bWVudHM6ICh2YWx1ZSwgaW5kZXh8a2V5LCBjb2xsZWN0aW9uKS5cbiAqIEl0ZXJhdGVlIGZ1bmN0aW9ucyBtYXkgZXhpdCBpdGVyYXRpb24gZWFybHkgYnkgZXhwbGljaXRseSByZXR1cm5pbmcgYGZhbHNlYC5cbiAqXG4gKiAqKk5vdGU6KiogQXMgd2l0aCBvdGhlciBcIkNvbGxlY3Rpb25zXCIgbWV0aG9kcywgb2JqZWN0cyB3aXRoIGEgXCJsZW5ndGhcIlxuICogcHJvcGVydHkgYXJlIGl0ZXJhdGVkIGxpa2UgYXJyYXlzLiBUbyBhdm9pZCB0aGlzIGJlaGF2aW9yIHVzZSBgXy5mb3JJbmBcbiAqIG9yIGBfLmZvck93bmAgZm9yIG9iamVjdCBpdGVyYXRpb24uXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGFsaWFzIGVhY2hcbiAqIEBjYXRlZ29yeSBDb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWU9Xy5pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheXxPYmplY3R9IFJldHVybnMgYGNvbGxlY3Rpb25gLlxuICogQHNlZSBfLmZvckVhY2hSaWdodFxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmZvckVhY2goWzEsIDJdLCBmdW5jdGlvbih2YWx1ZSkge1xuICogICBjb25zb2xlLmxvZyh2YWx1ZSk7XG4gKiB9KTtcbiAqIC8vID0+IExvZ3MgYDFgIHRoZW4gYDJgLlxuICpcbiAqIF8uZm9yRWFjaCh7ICdhJzogMSwgJ2InOiAyIH0sIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAqICAgY29uc29sZS5sb2coa2V5KTtcbiAqIH0pO1xuICogLy8gPT4gTG9ncyAnYScgdGhlbiAnYicgKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZCkuXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2goY29sbGVjdGlvbiwgaXRlcmF0ZWUpIHtcbiAgdmFyIGZ1bmMgPSBpc0FycmF5KGNvbGxlY3Rpb24pID8gYXJyYXlFYWNoIDogYmFzZUVhY2g7XG4gIHJldHVybiBmdW5jKGNvbGxlY3Rpb24sIGNhc3RGdW5jdGlvbihpdGVyYXRlZSkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmb3JFYWNoO1xuIiwiLyoqIEVycm9yIG1lc3NhZ2UgY29uc3RhbnRzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBuZWdhdGVzIHRoZSByZXN1bHQgb2YgdGhlIHByZWRpY2F0ZSBgZnVuY2AuIFRoZVxuICogYGZ1bmNgIHByZWRpY2F0ZSBpcyBpbnZva2VkIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIGFuZCBhcmd1bWVudHMgb2YgdGhlXG4gKiBjcmVhdGVkIGZ1bmN0aW9uLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBwcmVkaWNhdGUgdG8gbmVnYXRlLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgbmVnYXRlZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gaXNFdmVuKG4pIHtcbiAqICAgcmV0dXJuIG4gJSAyID09IDA7XG4gKiB9XG4gKlxuICogXy5maWx0ZXIoWzEsIDIsIDMsIDQsIDUsIDZdLCBfLm5lZ2F0ZShpc0V2ZW4pKTtcbiAqIC8vID0+IFsxLCAzLCA1XVxuICovXG5mdW5jdGlvbiBuZWdhdGUocHJlZGljYXRlKSB7XG4gIGlmICh0eXBlb2YgcHJlZGljYXRlICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMDogcmV0dXJuICFwcmVkaWNhdGUuY2FsbCh0aGlzKTtcbiAgICAgIGNhc2UgMTogcmV0dXJuICFwcmVkaWNhdGUuY2FsbCh0aGlzLCBhcmdzWzBdKTtcbiAgICAgIGNhc2UgMjogcmV0dXJuICFwcmVkaWNhdGUuY2FsbCh0aGlzLCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICAgIGNhc2UgMzogcmV0dXJuICFwcmVkaWNhdGUuY2FsbCh0aGlzLCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICB9XG4gICAgcmV0dXJuICFwcmVkaWNhdGUuYXBwbHkodGhpcywgYXJncyk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5lZ2F0ZTtcbiIsImltcG9ydCBkZWZpbmVQcm9wZXJ0eSBmcm9tICcuL19kZWZpbmVQcm9wZXJ0eS5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGFzc2lnblZhbHVlYCBhbmQgYGFzc2lnbk1lcmdlVmFsdWVgIHdpdGhvdXRcbiAqIHZhbHVlIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gYXNzaWduLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gYXNzaWduLlxuICovXG5mdW5jdGlvbiBiYXNlQXNzaWduVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgPT0gJ19fcHJvdG9fXycgJiYgZGVmaW5lUHJvcGVydHkpIHtcbiAgICBkZWZpbmVQcm9wZXJ0eShvYmplY3QsIGtleSwge1xuICAgICAgJ2NvbmZpZ3VyYWJsZSc6IHRydWUsXG4gICAgICAnZW51bWVyYWJsZSc6IHRydWUsXG4gICAgICAndmFsdWUnOiB2YWx1ZSxcbiAgICAgICd3cml0YWJsZSc6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VBc3NpZ25WYWx1ZTtcbiIsImltcG9ydCBiYXNlQXNzaWduVmFsdWUgZnJvbSAnLi9fYmFzZUFzc2lnblZhbHVlLmpzJztcbmltcG9ydCBlcSBmcm9tICcuL2VxLmpzJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBBc3NpZ25zIGB2YWx1ZWAgdG8gYGtleWAgb2YgYG9iamVjdGAgaWYgdGhlIGV4aXN0aW5nIHZhbHVlIGlzIG5vdCBlcXVpdmFsZW50XG4gKiB1c2luZyBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogZm9yIGVxdWFsaXR5IGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBhc3NpZ24uXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBhc3NpZ24uXG4gKi9cbmZ1bmN0aW9uIGFzc2lnblZhbHVlKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICB2YXIgb2JqVmFsdWUgPSBvYmplY3Rba2V5XTtcbiAgaWYgKCEoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgJiYgZXEob2JqVmFsdWUsIHZhbHVlKSkgfHxcbiAgICAgICh2YWx1ZSA9PT0gdW5kZWZpbmVkICYmICEoa2V5IGluIG9iamVjdCkpKSB7XG4gICAgYmFzZUFzc2lnblZhbHVlKG9iamVjdCwga2V5LCB2YWx1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYXNzaWduVmFsdWU7XG4iLCJpbXBvcnQgYXNzaWduVmFsdWUgZnJvbSAnLi9fYXNzaWduVmFsdWUuanMnO1xuaW1wb3J0IGNhc3RQYXRoIGZyb20gJy4vX2Nhc3RQYXRoLmpzJztcbmltcG9ydCBpc0luZGV4IGZyb20gJy4vX2lzSW5kZXguanMnO1xuaW1wb3J0IGlzT2JqZWN0IGZyb20gJy4vaXNPYmplY3QuanMnO1xuaW1wb3J0IHRvS2V5IGZyb20gJy4vX3RvS2V5LmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5zZXRgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIHBhdGggY3JlYXRpb24uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlU2V0KG9iamVjdCwgcGF0aCwgdmFsdWUsIGN1c3RvbWl6ZXIpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfVxuICBwYXRoID0gY2FzdFBhdGgocGF0aCwgb2JqZWN0KTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHBhdGgubGVuZ3RoLFxuICAgICAgbGFzdEluZGV4ID0gbGVuZ3RoIC0gMSxcbiAgICAgIG5lc3RlZCA9IG9iamVjdDtcblxuICB3aGlsZSAobmVzdGVkICE9IG51bGwgJiYgKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSB0b0tleShwYXRoW2luZGV4XSksXG4gICAgICAgIG5ld1ZhbHVlID0gdmFsdWU7XG5cbiAgICBpZiAoaW5kZXggIT0gbGFzdEluZGV4KSB7XG4gICAgICB2YXIgb2JqVmFsdWUgPSBuZXN0ZWRba2V5XTtcbiAgICAgIG5ld1ZhbHVlID0gY3VzdG9taXplciA/IGN1c3RvbWl6ZXIob2JqVmFsdWUsIGtleSwgbmVzdGVkKSA6IHVuZGVmaW5lZDtcbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gaXNPYmplY3Qob2JqVmFsdWUpXG4gICAgICAgICAgPyBvYmpWYWx1ZVxuICAgICAgICAgIDogKGlzSW5kZXgocGF0aFtpbmRleCArIDFdKSA/IFtdIDoge30pO1xuICAgICAgfVxuICAgIH1cbiAgICBhc3NpZ25WYWx1ZShuZXN0ZWQsIGtleSwgbmV3VmFsdWUpO1xuICAgIG5lc3RlZCA9IG5lc3RlZFtrZXldO1xuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VTZXQ7XG4iLCJpbXBvcnQgYmFzZUdldCBmcm9tICcuL19iYXNlR2V0LmpzJztcbmltcG9ydCBiYXNlU2V0IGZyb20gJy4vX2Jhc2VTZXQuanMnO1xuaW1wb3J0IGNhc3RQYXRoIGZyb20gJy4vX2Nhc3RQYXRoLmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiAgYF8ucGlja0J5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBwYXRocyBUaGUgcHJvcGVydHkgcGF0aHMgdG8gcGljay5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgcHJvcGVydHkuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBiYXNlUGlja0J5KG9iamVjdCwgcGF0aHMsIHByZWRpY2F0ZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHBhdGhzLmxlbmd0aCxcbiAgICAgIHJlc3VsdCA9IHt9O1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIHBhdGggPSBwYXRoc1tpbmRleF0sXG4gICAgICAgIHZhbHVlID0gYmFzZUdldChvYmplY3QsIHBhdGgpO1xuXG4gICAgaWYgKHByZWRpY2F0ZSh2YWx1ZSwgcGF0aCkpIHtcbiAgICAgIGJhc2VTZXQocmVzdWx0LCBjYXN0UGF0aChwYXRoLCBvYmplY3QpLCB2YWx1ZSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VQaWNrQnk7XG4iLCJpbXBvcnQgb3ZlckFyZyBmcm9tICcuL19vdmVyQXJnLmpzJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgZ2V0UHJvdG90eXBlID0gb3ZlckFyZyhPYmplY3QuZ2V0UHJvdG90eXBlT2YsIE9iamVjdCk7XG5cbmV4cG9ydCBkZWZhdWx0IGdldFByb3RvdHlwZTtcbiIsImltcG9ydCBhcnJheVB1c2ggZnJvbSAnLi9fYXJyYXlQdXNoLmpzJztcbmltcG9ydCBnZXRQcm90b3R5cGUgZnJvbSAnLi9fZ2V0UHJvdG90eXBlLmpzJztcbmltcG9ydCBnZXRTeW1ib2xzIGZyb20gJy4vX2dldFN5bWJvbHMuanMnO1xuaW1wb3J0IHN0dWJBcnJheSBmcm9tICcuL3N0dWJBcnJheS5qcyc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVHZXRTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gYW5kIGluaGVyaXRlZCBlbnVtZXJhYmxlIHN5bWJvbHMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2Ygc3ltYm9scy5cbiAqL1xudmFyIGdldFN5bWJvbHNJbiA9ICFuYXRpdmVHZXRTeW1ib2xzID8gc3R1YkFycmF5IDogZnVuY3Rpb24ob2JqZWN0KSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgd2hpbGUgKG9iamVjdCkge1xuICAgIGFycmF5UHVzaChyZXN1bHQsIGdldFN5bWJvbHMob2JqZWN0KSk7XG4gICAgb2JqZWN0ID0gZ2V0UHJvdG90eXBlKG9iamVjdCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdldFN5bWJvbHNJbjtcbiIsIi8qKlxuICogVGhpcyBmdW5jdGlvbiBpcyBsaWtlXG4gKiBbYE9iamVjdC5rZXlzYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBleGNlcHQgdGhhdCBpdCBpbmNsdWRlcyBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBuYXRpdmVLZXlzSW4ob2JqZWN0KSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgaWYgKG9iamVjdCAhPSBudWxsKSB7XG4gICAgZm9yICh2YXIga2V5IGluIE9iamVjdChvYmplY3QpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBuYXRpdmVLZXlzSW47XG4iLCJpbXBvcnQgaXNPYmplY3QgZnJvbSAnLi9pc09iamVjdC5qcyc7XG5pbXBvcnQgaXNQcm90b3R5cGUgZnJvbSAnLi9faXNQcm90b3R5cGUuanMnO1xuaW1wb3J0IG5hdGl2ZUtleXNJbiBmcm9tICcuL19uYXRpdmVLZXlzSW4uanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNJbmAgd2hpY2ggZG9lc24ndCB0cmVhdCBzcGFyc2UgYXJyYXlzIGFzIGRlbnNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBiYXNlS2V5c0luKG9iamVjdCkge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gbmF0aXZlS2V5c0luKG9iamVjdCk7XG4gIH1cbiAgdmFyIGlzUHJvdG8gPSBpc1Byb3RvdHlwZShvYmplY3QpLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgIGlmICghKGtleSA9PSAnY29uc3RydWN0b3InICYmIChpc1Byb3RvIHx8ICFoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlS2V5c0luO1xuIiwiaW1wb3J0IGFycmF5TGlrZUtleXMgZnJvbSAnLi9fYXJyYXlMaWtlS2V5cy5qcyc7XG5pbXBvcnQgYmFzZUtleXNJbiBmcm9tICcuL19iYXNlS2V5c0luLmpzJztcbmltcG9ydCBpc0FycmF5TGlrZSBmcm9tICcuL2lzQXJyYXlMaWtlLmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gYW5kIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5c0luKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InLCAnYyddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKi9cbmZ1bmN0aW9uIGtleXNJbihvYmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXlMaWtlKG9iamVjdCkgPyBhcnJheUxpa2VLZXlzKG9iamVjdCwgdHJ1ZSkgOiBiYXNlS2V5c0luKG9iamVjdCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGtleXNJbjtcbiIsImltcG9ydCBiYXNlR2V0QWxsS2V5cyBmcm9tICcuL19iYXNlR2V0QWxsS2V5cy5qcyc7XG5pbXBvcnQgZ2V0U3ltYm9sc0luIGZyb20gJy4vX2dldFN5bWJvbHNJbi5qcyc7XG5pbXBvcnQga2V5c0luIGZyb20gJy4va2V5c0luLmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgYW5kXG4gKiBzeW1ib2xzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzIGFuZCBzeW1ib2xzLlxuICovXG5mdW5jdGlvbiBnZXRBbGxLZXlzSW4ob2JqZWN0KSB7XG4gIHJldHVybiBiYXNlR2V0QWxsS2V5cyhvYmplY3QsIGtleXNJbiwgZ2V0U3ltYm9sc0luKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0QWxsS2V5c0luO1xuIiwiaW1wb3J0IGFycmF5TWFwIGZyb20gJy4vX2FycmF5TWFwLmpzJztcbmltcG9ydCBiYXNlSXRlcmF0ZWUgZnJvbSAnLi9fYmFzZUl0ZXJhdGVlLmpzJztcbmltcG9ydCBiYXNlUGlja0J5IGZyb20gJy4vX2Jhc2VQaWNrQnkuanMnO1xuaW1wb3J0IGdldEFsbEtleXNJbiBmcm9tICcuL19nZXRBbGxLZXlzSW4uanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gb2JqZWN0IGNvbXBvc2VkIG9mIHRoZSBgb2JqZWN0YCBwcm9wZXJ0aWVzIGBwcmVkaWNhdGVgIHJldHVybnNcbiAqIHRydXRoeSBmb3IuIFRoZSBwcmVkaWNhdGUgaXMgaW52b2tlZCB3aXRoIHR3byBhcmd1bWVudHM6ICh2YWx1ZSwga2V5KS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3ByZWRpY2F0ZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgcHJvcGVydHkuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEsICdiJzogJzInLCAnYyc6IDMgfTtcbiAqXG4gKiBfLnBpY2tCeShvYmplY3QsIF8uaXNOdW1iZXIpO1xuICogLy8gPT4geyAnYSc6IDEsICdjJzogMyB9XG4gKi9cbmZ1bmN0aW9uIHBpY2tCeShvYmplY3QsIHByZWRpY2F0ZSkge1xuICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICByZXR1cm4ge307XG4gIH1cbiAgdmFyIHByb3BzID0gYXJyYXlNYXAoZ2V0QWxsS2V5c0luKG9iamVjdCksIGZ1bmN0aW9uKHByb3ApIHtcbiAgICByZXR1cm4gW3Byb3BdO1xuICB9KTtcbiAgcHJlZGljYXRlID0gYmFzZUl0ZXJhdGVlKHByZWRpY2F0ZSk7XG4gIHJldHVybiBiYXNlUGlja0J5KG9iamVjdCwgcHJvcHMsIGZ1bmN0aW9uKHZhbHVlLCBwYXRoKSB7XG4gICAgcmV0dXJuIHByZWRpY2F0ZSh2YWx1ZSwgcGF0aFswXSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBwaWNrQnk7XG4iLCJpbXBvcnQgYmFzZUl0ZXJhdGVlIGZyb20gJy4vX2Jhc2VJdGVyYXRlZS5qcyc7XG5pbXBvcnQgbmVnYXRlIGZyb20gJy4vbmVnYXRlLmpzJztcbmltcG9ydCBwaWNrQnkgZnJvbSAnLi9waWNrQnkuanMnO1xuXG4vKipcbiAqIFRoZSBvcHBvc2l0ZSBvZiBgXy5waWNrQnlgOyB0aGlzIG1ldGhvZCBjcmVhdGVzIGFuIG9iamVjdCBjb21wb3NlZCBvZlxuICogdGhlIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgc3RyaW5nIGtleWVkIHByb3BlcnRpZXMgb2YgYG9iamVjdGAgdGhhdFxuICogYHByZWRpY2F0ZWAgZG9lc24ndCByZXR1cm4gdHJ1dGh5IGZvci4gVGhlIHByZWRpY2F0ZSBpcyBpbnZva2VkIHdpdGggdHdvXG4gKiBhcmd1bWVudHM6ICh2YWx1ZSwga2V5KS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3ByZWRpY2F0ZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgcHJvcGVydHkuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEsICdiJzogJzInLCAnYyc6IDMgfTtcbiAqXG4gKiBfLm9taXRCeShvYmplY3QsIF8uaXNOdW1iZXIpO1xuICogLy8gPT4geyAnYic6ICcyJyB9XG4gKi9cbmZ1bmN0aW9uIG9taXRCeShvYmplY3QsIHByZWRpY2F0ZSkge1xuICByZXR1cm4gcGlja0J5KG9iamVjdCwgbmVnYXRlKGJhc2VJdGVyYXRlZShwcmVkaWNhdGUpKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG9taXRCeTtcbiIsImltcG9ydCBiYXNlS2V5cyBmcm9tICcuL19iYXNlS2V5cy5qcyc7XG5pbXBvcnQgZ2V0VGFnIGZyb20gJy4vX2dldFRhZy5qcyc7XG5pbXBvcnQgaXNBcmd1bWVudHMgZnJvbSAnLi9pc0FyZ3VtZW50cy5qcyc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuL2lzQXJyYXkuanMnO1xuaW1wb3J0IGlzQXJyYXlMaWtlIGZyb20gJy4vaXNBcnJheUxpa2UuanMnO1xuaW1wb3J0IGlzQnVmZmVyIGZyb20gJy4vaXNCdWZmZXIuanMnO1xuaW1wb3J0IGlzUHJvdG90eXBlIGZyb20gJy4vX2lzUHJvdG90eXBlLmpzJztcbmltcG9ydCBpc1R5cGVkQXJyYXkgZnJvbSAnLi9pc1R5cGVkQXJyYXkuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XSc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYW4gZW1wdHkgb2JqZWN0LCBjb2xsZWN0aW9uLCBtYXAsIG9yIHNldC5cbiAqXG4gKiBPYmplY3RzIGFyZSBjb25zaWRlcmVkIGVtcHR5IGlmIHRoZXkgaGF2ZSBubyBvd24gZW51bWVyYWJsZSBzdHJpbmcga2V5ZWRcbiAqIHByb3BlcnRpZXMuXG4gKlxuICogQXJyYXktbGlrZSB2YWx1ZXMgc3VjaCBhcyBgYXJndW1lbnRzYCBvYmplY3RzLCBhcnJheXMsIGJ1ZmZlcnMsIHN0cmluZ3MsIG9yXG4gKiBqUXVlcnktbGlrZSBjb2xsZWN0aW9ucyBhcmUgY29uc2lkZXJlZCBlbXB0eSBpZiB0aGV5IGhhdmUgYSBgbGVuZ3RoYCBvZiBgMGAuXG4gKiBTaW1pbGFybHksIG1hcHMgYW5kIHNldHMgYXJlIGNvbnNpZGVyZWQgZW1wdHkgaWYgdGhleSBoYXZlIGEgYHNpemVgIG9mIGAwYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBlbXB0eSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRW1wdHkobnVsbCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0VtcHR5KHRydWUpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNFbXB0eSgxKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRW1wdHkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0VtcHR5KHsgJ2EnOiAxIH0pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChpc0FycmF5TGlrZSh2YWx1ZSkgJiZcbiAgICAgIChpc0FycmF5KHZhbHVlKSB8fCB0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlLnNwbGljZSA9PSAnZnVuY3Rpb24nIHx8XG4gICAgICAgIGlzQnVmZmVyKHZhbHVlKSB8fCBpc1R5cGVkQXJyYXkodmFsdWUpIHx8IGlzQXJndW1lbnRzKHZhbHVlKSkpIHtcbiAgICByZXR1cm4gIXZhbHVlLmxlbmd0aDtcbiAgfVxuICB2YXIgdGFnID0gZ2V0VGFnKHZhbHVlKTtcbiAgaWYgKHRhZyA9PSBtYXBUYWcgfHwgdGFnID09IHNldFRhZykge1xuICAgIHJldHVybiAhdmFsdWUuc2l6ZTtcbiAgfVxuICBpZiAoaXNQcm90b3R5cGUodmFsdWUpKSB7XG4gICAgcmV0dXJuICFiYXNlS2V5cyh2YWx1ZSkubGVuZ3RoO1xuICB9XG4gIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrZXkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc0VtcHR5O1xuIiwiY29uc3QgbG9hZGVkID0ge307XG5cbmZ1bmN0aW9uIGVsZW1lbnQodXJsKSB7XG4gICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgc2NyaXB0LnNldEF0dHJpYnV0ZSgnc3JjJywgdXJsKTtcbiAgICBzY3JpcHQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ3RleHQvamF2YXNjcmlwdCcpO1xuICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ2NoYXJzZXQnLCAndXRmLTgnKTtcbiAgICByZXR1cm4gc2NyaXB0O1xufVxuXG5mdW5jdGlvbiBhcHBlbmQoc2NyaXB0KSB7XG4gICAgaWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZCcpKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWQnKS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNjcmlwdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2NyaXB0KHVybCkge1xuICAgIGlmKGxvYWRlZFt1cmxdIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgICByZXR1cm4gbG9hZGVkW3VybF07XG4gICAgfVxuXG4gICAgcmV0dXJuIGxvYWRlZFt1cmxdID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYoIWxvYWRlZFt1cmxdKSB7XG4gICAgICAgICAgICAgICAgYXBwZW5kKGVsZW1lbnQodXJsKSkuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShsb2FkZWRbdXJsXSA9IGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc29sdmUobG9hZGVkW3VybF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoKGUpIHtcbiAgICAgICAgICAgIHJlamVjdChlKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuIiwiPHRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJhdXRvY29tcGxldGUtbGlzdC13cmFwcGVyXCI+XG4gICAgICAgIDx1bCBjbGFzcz1cImF1dG9jb21wbGV0ZS1saXN0XCI+XG4gICAgICAgICAgICA8cGxhY2UtYXV0b2NvbXBsZXRlLWxpc3QtaXRlbSB2LWZvcj1cIihpdGVtLCBpKSBpbiBpdGVtc1wiIDprZXk9XCJpdGVtLmlkXCIgOml0ZW09XCJpdGVtXCIgQGNsaWNrPVwib25DbGlja1wiIEBmb2N1cz1cIm9uRm9jdXNcIiBAYmx1cj1cIm9uQmx1clwiPlxuICAgICAgICAgICAgICAgIHt7IGl0ZW1bZGlzcGxheV0gfX1cbiAgICAgICAgICAgIDwvcGxhY2UtYXV0b2NvbXBsZXRlLWxpc3QtaXRlbT5cbiAgICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAncGxhY2UtYXV0b2NvbXBsZXRlLWxpc3QnLFxuXG4gICAgcHJvcHM6IHtcblxuICAgICAgICAnaXRlbXMnOiB7XG4gICAgICAgICAgICB0eXBlOiBBcnJheSxcbiAgICAgICAgICAgIGRlZmF1bHQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgJ2Rpc3BsYXknOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICBkZWZhdWx0OiAnZGVzY3JpcHRpb24nXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgb25CbHVyKGV2ZW50LCBpdGVtKSB7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdpdGVtOmJsdXInLCBldmVudCwgaXRlbSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgb25Gb2N1cyhldmVudCwgaXRlbSkge1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgnaXRlbTpmb2N1cycsIGV2ZW50LCBpdGVtKTtcbiAgICAgICAgfSxcblxuICAgICAgICBvbkNsaWNrKGV2ZW50LCBpdGVtKSB7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdpdGVtOmNsaWNrJywgZXZlbnQsIGl0ZW0pO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn1cbjwvc2NyaXB0PlxuIiwiPHRlbXBsYXRlPlxuXG4gICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj48c2xvdC8+PC9kaXY+XG5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgbmFtZTogJ2Zvcm0tZ3JvdXAnXG4gICAgXG59XG5cbjwvc2NyaXB0PlxuIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uZm9yRWFjaGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5RWFjaChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChpdGVyYXRlZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkgPT09IGZhbHNlKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5leHBvcnQgZGVmYXVsdCBhcnJheUVhY2g7XG4iLCIvKipcbiAqIENyZWF0ZXMgYSBiYXNlIGZ1bmN0aW9uIGZvciBtZXRob2RzIGxpa2UgYF8uZm9ySW5gIGFuZCBgXy5mb3JPd25gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGJhc2UgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJhc2VGb3IoZnJvbVJpZ2h0KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzRnVuYykge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBpdGVyYWJsZSA9IE9iamVjdChvYmplY3QpLFxuICAgICAgICBwcm9wcyA9IGtleXNGdW5jKG9iamVjdCksXG4gICAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgdmFyIGtleSA9IHByb3BzW2Zyb21SaWdodCA/IGxlbmd0aCA6ICsraW5kZXhdO1xuICAgICAgaWYgKGl0ZXJhdGVlKGl0ZXJhYmxlW2tleV0sIGtleSwgaXRlcmFibGUpID09PSBmYWxzZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQmFzZUZvcjtcbiIsImltcG9ydCBjcmVhdGVCYXNlRm9yIGZyb20gJy4vX2NyZWF0ZUJhc2VGb3IuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBiYXNlRm9yT3duYCB3aGljaCBpdGVyYXRlcyBvdmVyIGBvYmplY3RgXG4gKiBwcm9wZXJ0aWVzIHJldHVybmVkIGJ5IGBrZXlzRnVuY2AgYW5kIGludm9rZXMgYGl0ZXJhdGVlYCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqIEl0ZXJhdGVlIGZ1bmN0aW9ucyBtYXkgZXhpdCBpdGVyYXRpb24gZWFybHkgYnkgZXhwbGljaXRseSByZXR1cm5pbmcgYGZhbHNlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBrZXlzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBrZXlzIG9mIGBvYmplY3RgLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xudmFyIGJhc2VGb3IgPSBjcmVhdGVCYXNlRm9yKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VGb3I7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRpbWVzYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHNcbiAqIG9yIG1heCBhcnJheSBsZW5ndGggY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIGludm9rZSBgaXRlcmF0ZWVgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRpbWVzKG4sIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobik7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBuKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGluZGV4KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlVGltZXM7XG4iLCIvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG5leHBvcnQgZGVmYXVsdCBmcmVlR2xvYmFsO1xuIiwiaW1wb3J0IGZyZWVHbG9iYWwgZnJvbSAnLi9fZnJlZUdsb2JhbC5qcyc7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuZXhwb3J0IGRlZmF1bHQgcm9vdDtcbiIsImltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcblxuZXhwb3J0IGRlZmF1bHQgU3ltYm9sO1xuIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuL19TeW1ib2wuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgbmF0aXZlT2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgc3ltVG9TdHJpbmdUYWcgPSBTeW1ib2wgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlR2V0VGFnYCB3aGljaCBpZ25vcmVzIGBTeW1ib2wudG9TdHJpbmdUYWdgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSByYXcgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0UmF3VGFnKHZhbHVlKSB7XG4gIHZhciBpc093biA9IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHN5bVRvU3RyaW5nVGFnKSxcbiAgICAgIHRhZyA9IHZhbHVlW3N5bVRvU3RyaW5nVGFnXTtcblxuICB0cnkge1xuICAgIHZhbHVlW3N5bVRvU3RyaW5nVGFnXSA9IHVuZGVmaW5lZDtcbiAgICB2YXIgdW5tYXNrZWQgPSB0cnVlO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIHZhciByZXN1bHQgPSBuYXRpdmVPYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgaWYgKHVubWFza2VkKSB7XG4gICAgaWYgKGlzT3duKSB7XG4gICAgICB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ10gPSB0YWc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSB2YWx1ZVtzeW1Ub1N0cmluZ1RhZ107XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldFJhd1RhZztcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBuYXRpdmVPYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgdXNpbmcgYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIG5hdGl2ZU9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBvYmplY3RUb1N0cmluZztcbiIsImltcG9ydCBTeW1ib2wgZnJvbSAnLi9fU3ltYm9sLmpzJztcbmltcG9ydCBnZXRSYXdUYWcgZnJvbSAnLi9fZ2V0UmF3VGFnLmpzJztcbmltcG9ydCBvYmplY3RUb1N0cmluZyBmcm9tICcuL19vYmplY3RUb1N0cmluZy5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBudWxsVGFnID0gJ1tvYmplY3QgTnVsbF0nLFxuICAgIHVuZGVmaW5lZFRhZyA9ICdbb2JqZWN0IFVuZGVmaW5lZF0nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1Ub1N0cmluZ1RhZyA9IFN5bWJvbCA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYCB3aXRob3V0IGZhbGxiYWNrcyBmb3IgYnVnZ3kgZW52aXJvbm1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZFRhZyA6IG51bGxUYWc7XG4gIH1cbiAgcmV0dXJuIChzeW1Ub1N0cmluZ1RhZyAmJiBzeW1Ub1N0cmluZ1RhZyBpbiBPYmplY3QodmFsdWUpKVxuICAgID8gZ2V0UmF3VGFnKHZhbHVlKVxuICAgIDogb2JqZWN0VG9TdHJpbmcodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlR2V0VGFnO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzT2JqZWN0TGlrZTtcbiIsImltcG9ydCBiYXNlR2V0VGFnIGZyb20gJy4vX2Jhc2VHZXRUYWcuanMnO1xuaW1wb3J0IGlzT2JqZWN0TGlrZSBmcm9tICcuL2lzT2JqZWN0TGlrZS5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXSc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNBcmd1bWVudHNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGBhcmd1bWVudHNgIG9iamVjdCxcbiAqL1xuZnVuY3Rpb24gYmFzZUlzQXJndW1lbnRzKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGJhc2VHZXRUYWcodmFsdWUpID09IGFyZ3NUYWc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VJc0FyZ3VtZW50cztcbiIsImltcG9ydCBiYXNlSXNBcmd1bWVudHMgZnJvbSAnLi9fYmFzZUlzQXJndW1lbnRzLmpzJztcbmltcG9ydCBpc09iamVjdExpa2UgZnJvbSAnLi9pc09iamVjdExpa2UuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcmd1bWVudHMgPSBiYXNlSXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPyBiYXNlSXNBcmd1bWVudHMgOiBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiZcbiAgICAhcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgaXNBcmd1bWVudHM7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxuZXhwb3J0IGRlZmF1bHQgaXNBcnJheTtcbiIsIi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyBgZmFsc2VgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4xMy4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50aW1lcygyLCBfLnN0dWJGYWxzZSk7XG4gKiAvLyA9PiBbZmFsc2UsIGZhbHNlXVxuICovXG5mdW5jdGlvbiBzdHViRmFsc2UoKSB7XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3R1YkZhbHNlO1xuIiwiaW1wb3J0IHJvb3QgZnJvbSAnLi9fcm9vdC5qcyc7XG5pbXBvcnQgc3R1YkZhbHNlIGZyb20gJy4vc3R1YkZhbHNlLmpzJztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBleHBvcnRzYC4gKi9cbnZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLiAqL1xudmFyIGZyZWVNb2R1bGUgPSBmcmVlRXhwb3J0cyAmJiB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblxuLyoqIERldGVjdCB0aGUgcG9wdWxhciBDb21tb25KUyBleHRlbnNpb24gYG1vZHVsZS5leHBvcnRzYC4gKi9cbnZhciBtb2R1bGVFeHBvcnRzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLmV4cG9ydHMgPT09IGZyZWVFeHBvcnRzO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBCdWZmZXIgPSBtb2R1bGVFeHBvcnRzID8gcm9vdC5CdWZmZXIgOiB1bmRlZmluZWQ7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVJc0J1ZmZlciA9IEJ1ZmZlciA/IEJ1ZmZlci5pc0J1ZmZlciA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGJ1ZmZlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMy4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGJ1ZmZlciwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQnVmZmVyKG5ldyBCdWZmZXIoMikpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNCdWZmZXIobmV3IFVpbnQ4QXJyYXkoMikpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQnVmZmVyID0gbmF0aXZlSXNCdWZmZXIgfHwgc3R1YkZhbHNlO1xuXG5leHBvcnQgZGVmYXVsdCBpc0J1ZmZlcjtcbiIsIi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgdW5zaWduZWQgaW50ZWdlciB2YWx1ZXMuICovXG52YXIgcmVJc1VpbnQgPSAvXig/OjB8WzEtOV1cXGQqKSQvO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuXG4gIHJldHVybiAhIWxlbmd0aCAmJlxuICAgICh0eXBlID09ICdudW1iZXInIHx8XG4gICAgICAodHlwZSAhPSAnc3ltYm9sJyAmJiByZUlzVWludC50ZXN0KHZhbHVlKSkpICYmXG4gICAgICAgICh2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNJbmRleDtcbiIsIi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgVG9MZW5ndGhgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0xlbmd0aCgzKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTGVuZ3RoKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKEluZmluaXR5KTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aCgnMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJlxuICAgIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNMZW5ndGg7XG4iLCJpbXBvcnQgYmFzZUdldFRhZyBmcm9tICcuL19iYXNlR2V0VGFnLmpzJztcbmltcG9ydCBpc0xlbmd0aCBmcm9tICcuL2lzTGVuZ3RoLmpzJztcbmltcG9ydCBpc09iamVjdExpa2UgZnJvbSAnLi9pc09iamVjdExpa2UuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgZXJyb3JUYWcgPSAnW29iamVjdCBFcnJvcl0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nLFxuICAgIHdlYWtNYXBUYWcgPSAnW29iamVjdCBXZWFrTWFwXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBvZiB0eXBlZCBhcnJheXMuICovXG52YXIgdHlwZWRBcnJheVRhZ3MgPSB7fTtcbnR5cGVkQXJyYXlUYWdzW2Zsb2F0MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbZmxvYXQ2NFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50OFRhZ10gPSB0eXBlZEFycmF5VGFnc1tpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDhUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xudHlwZWRBcnJheVRhZ3NbYXJnc1RhZ10gPSB0eXBlZEFycmF5VGFnc1thcnJheVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbYXJyYXlCdWZmZXJUYWddID0gdHlwZWRBcnJheVRhZ3NbYm9vbFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZGF0YVZpZXdUYWddID0gdHlwZWRBcnJheVRhZ3NbZGF0ZVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZXJyb3JUYWddID0gdHlwZWRBcnJheVRhZ3NbZnVuY1RhZ10gPVxudHlwZWRBcnJheVRhZ3NbbWFwVGFnXSA9IHR5cGVkQXJyYXlUYWdzW251bWJlclRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbb2JqZWN0VGFnXSA9IHR5cGVkQXJyYXlUYWdzW3JlZ2V4cFRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbc2V0VGFnXSA9IHR5cGVkQXJyYXlUYWdzW3N0cmluZ1RhZ10gPVxudHlwZWRBcnJheVRhZ3Nbd2Vha01hcFRhZ10gPSBmYWxzZTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc1R5cGVkQXJyYXlgIHdpdGhvdXQgTm9kZS5qcyBvcHRpbWl6YXRpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdHlwZWQgYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzVHlwZWRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJlxuICAgIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgISF0eXBlZEFycmF5VGFnc1tiYXNlR2V0VGFnKHZhbHVlKV07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VJc1R5cGVkQXJyYXk7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnVuYXJ5YCB3aXRob3V0IHN1cHBvcnQgZm9yIHN0b3JpbmcgbWV0YWRhdGEuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNhcCBhcmd1bWVudHMgZm9yLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY2FwcGVkIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlVW5hcnkoZnVuYykge1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gZnVuYyh2YWx1ZSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VVbmFyeTtcbiIsImltcG9ydCBmcmVlR2xvYmFsIGZyb20gJy4vX2ZyZWVHbG9iYWwuanMnO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgLiAqL1xudmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuICovXG52YXIgZnJlZU1vZHVsZSA9IGZyZWVFeHBvcnRzICYmIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuXG4vKiogRGV0ZWN0IHRoZSBwb3B1bGFyIENvbW1vbkpTIGV4dGVuc2lvbiBgbW9kdWxlLmV4cG9ydHNgLiAqL1xudmFyIG1vZHVsZUV4cG9ydHMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUuZXhwb3J0cyA9PT0gZnJlZUV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgcHJvY2Vzc2AgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVQcm9jZXNzID0gbW9kdWxlRXhwb3J0cyAmJiBmcmVlR2xvYmFsLnByb2Nlc3M7XG5cbi8qKiBVc2VkIHRvIGFjY2VzcyBmYXN0ZXIgTm9kZS5qcyBoZWxwZXJzLiAqL1xudmFyIG5vZGVVdGlsID0gKGZ1bmN0aW9uKCkge1xuICB0cnkge1xuICAgIHJldHVybiBmcmVlUHJvY2VzcyAmJiBmcmVlUHJvY2Vzcy5iaW5kaW5nICYmIGZyZWVQcm9jZXNzLmJpbmRpbmcoJ3V0aWwnKTtcbiAgfSBjYXRjaCAoZSkge31cbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IG5vZGVVdGlsO1xuIiwiaW1wb3J0IGJhc2VJc1R5cGVkQXJyYXkgZnJvbSAnLi9fYmFzZUlzVHlwZWRBcnJheS5qcyc7XG5pbXBvcnQgYmFzZVVuYXJ5IGZyb20gJy4vX2Jhc2VVbmFyeS5qcyc7XG5pbXBvcnQgbm9kZVV0aWwgZnJvbSAnLi9fbm9kZVV0aWwuanMnO1xuXG4vKiBOb2RlLmpzIGhlbHBlciByZWZlcmVuY2VzLiAqL1xudmFyIG5vZGVJc1R5cGVkQXJyYXkgPSBub2RlVXRpbCAmJiBub2RlVXRpbC5pc1R5cGVkQXJyYXk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIHR5cGVkIGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdHlwZWQgYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkobmV3IFVpbnQ4QXJyYXkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KFtdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc1R5cGVkQXJyYXkgPSBub2RlSXNUeXBlZEFycmF5ID8gYmFzZVVuYXJ5KG5vZGVJc1R5cGVkQXJyYXkpIDogYmFzZUlzVHlwZWRBcnJheTtcblxuZXhwb3J0IGRlZmF1bHQgaXNUeXBlZEFycmF5O1xuIiwiaW1wb3J0IGJhc2VUaW1lcyBmcm9tICcuL19iYXNlVGltZXMuanMnO1xuaW1wb3J0IGlzQXJndW1lbnRzIGZyb20gJy4vaXNBcmd1bWVudHMuanMnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5LmpzJztcbmltcG9ydCBpc0J1ZmZlciBmcm9tICcuL2lzQnVmZmVyLmpzJztcbmltcG9ydCBpc0luZGV4IGZyb20gJy4vX2lzSW5kZXguanMnO1xuaW1wb3J0IGlzVHlwZWRBcnJheSBmcm9tICcuL2lzVHlwZWRBcnJheS5qcyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiB0aGUgYXJyYXktbGlrZSBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5oZXJpdGVkIFNwZWNpZnkgcmV0dXJuaW5nIGluaGVyaXRlZCBwcm9wZXJ0eSBuYW1lcy5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGFycmF5TGlrZUtleXModmFsdWUsIGluaGVyaXRlZCkge1xuICB2YXIgaXNBcnIgPSBpc0FycmF5KHZhbHVlKSxcbiAgICAgIGlzQXJnID0gIWlzQXJyICYmIGlzQXJndW1lbnRzKHZhbHVlKSxcbiAgICAgIGlzQnVmZiA9ICFpc0FyciAmJiAhaXNBcmcgJiYgaXNCdWZmZXIodmFsdWUpLFxuICAgICAgaXNUeXBlID0gIWlzQXJyICYmICFpc0FyZyAmJiAhaXNCdWZmICYmIGlzVHlwZWRBcnJheSh2YWx1ZSksXG4gICAgICBza2lwSW5kZXhlcyA9IGlzQXJyIHx8IGlzQXJnIHx8IGlzQnVmZiB8fCBpc1R5cGUsXG4gICAgICByZXN1bHQgPSBza2lwSW5kZXhlcyA/IGJhc2VUaW1lcyh2YWx1ZS5sZW5ndGgsIFN0cmluZykgOiBbXSxcbiAgICAgIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGg7XG5cbiAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgaWYgKChpbmhlcml0ZWQgfHwgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwga2V5KSkgJiZcbiAgICAgICAgIShza2lwSW5kZXhlcyAmJiAoXG4gICAgICAgICAgIC8vIFNhZmFyaSA5IGhhcyBlbnVtZXJhYmxlIGBhcmd1bWVudHMubGVuZ3RoYCBpbiBzdHJpY3QgbW9kZS5cbiAgICAgICAgICAga2V5ID09ICdsZW5ndGgnIHx8XG4gICAgICAgICAgIC8vIE5vZGUuanMgMC4xMCBoYXMgZW51bWVyYWJsZSBub24taW5kZXggcHJvcGVydGllcyBvbiBidWZmZXJzLlxuICAgICAgICAgICAoaXNCdWZmICYmIChrZXkgPT0gJ29mZnNldCcgfHwga2V5ID09ICdwYXJlbnQnKSkgfHxcbiAgICAgICAgICAgLy8gUGhhbnRvbUpTIDIgaGFzIGVudW1lcmFibGUgbm9uLWluZGV4IHByb3BlcnRpZXMgb24gdHlwZWQgYXJyYXlzLlxuICAgICAgICAgICAoaXNUeXBlICYmIChrZXkgPT0gJ2J1ZmZlcicgfHwga2V5ID09ICdieXRlTGVuZ3RoJyB8fCBrZXkgPT0gJ2J5dGVPZmZzZXQnKSkgfHxcbiAgICAgICAgICAgLy8gU2tpcCBpbmRleCBwcm9wZXJ0aWVzLlxuICAgICAgICAgICBpc0luZGV4KGtleSwgbGVuZ3RoKVxuICAgICAgICApKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXJyYXlMaWtlS2V5cztcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGEgcHJvdG90eXBlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHByb3RvdHlwZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc1Byb3RvdHlwZSh2YWx1ZSkge1xuICB2YXIgQ3RvciA9IHZhbHVlICYmIHZhbHVlLmNvbnN0cnVjdG9yLFxuICAgICAgcHJvdG8gPSAodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSkgfHwgb2JqZWN0UHJvdG87XG5cbiAgcmV0dXJuIHZhbHVlID09PSBwcm90bztcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNQcm90b3R5cGU7XG4iLCIvKipcbiAqIENyZWF0ZXMgYSB1bmFyeSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggaXRzIGFyZ3VtZW50IHRyYW5zZm9ybWVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSBhcmd1bWVudCB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gb3ZlckFyZyhmdW5jLCB0cmFuc2Zvcm0pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBmdW5jKHRyYW5zZm9ybShhcmcpKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgb3ZlckFyZztcbiIsImltcG9ydCBvdmVyQXJnIGZyb20gJy4vX292ZXJBcmcuanMnO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlS2V5cyA9IG92ZXJBcmcoT2JqZWN0LmtleXMsIE9iamVjdCk7XG5cbmV4cG9ydCBkZWZhdWx0IG5hdGl2ZUtleXM7XG4iLCJpbXBvcnQgaXNQcm90b3R5cGUgZnJvbSAnLi9faXNQcm90b3R5cGUuanMnO1xuaW1wb3J0IG5hdGl2ZUtleXMgZnJvbSAnLi9fbmF0aXZlS2V5cy5qcyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ua2V5c2Agd2hpY2ggZG9lc24ndCB0cmVhdCBzcGFyc2UgYXJyYXlzIGFzIGRlbnNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBiYXNlS2V5cyhvYmplY3QpIHtcbiAgaWYgKCFpc1Byb3RvdHlwZShvYmplY3QpKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUtleXMob2JqZWN0KTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvciAodmFyIGtleSBpbiBPYmplY3Qob2JqZWN0KSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBrZXkgIT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUtleXM7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNPYmplY3Q7XG4iLCJpbXBvcnQgYmFzZUdldFRhZyBmcm9tICcuL19iYXNlR2V0VGFnLmpzJztcbmltcG9ydCBpc09iamVjdCBmcm9tICcuL2lzT2JqZWN0LmpzJztcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFzeW5jVGFnID0gJ1tvYmplY3QgQXN5bmNGdW5jdGlvbl0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXScsXG4gICAgcHJveHlUYWcgPSAnW29iamVjdCBQcm94eV0nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDkgd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXlzIGFuZCBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gIHZhciB0YWcgPSBiYXNlR2V0VGFnKHZhbHVlKTtcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWcgfHwgdGFnID09IGFzeW5jVGFnIHx8IHRhZyA9PSBwcm94eVRhZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNGdW5jdGlvbjtcbiIsImltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4vaXNGdW5jdGlvbi5qcyc7XG5pbXBvcnQgaXNMZW5ndGggZnJvbSAnLi9pc0xlbmd0aC5qcyc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS4gQSB2YWx1ZSBpcyBjb25zaWRlcmVkIGFycmF5LWxpa2UgaWYgaXQnc1xuICogbm90IGEgZnVuY3Rpb24gYW5kIGhhcyBhIGB2YWx1ZS5sZW5ndGhgIHRoYXQncyBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiBvclxuICogZXF1YWwgdG8gYDBgIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gYE51bWJlci5NQVhfU0FGRV9JTlRFR0VSYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoJ2FiYycpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgIWlzRnVuY3Rpb24odmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc0FycmF5TGlrZTtcbiIsImltcG9ydCBhcnJheUxpa2VLZXlzIGZyb20gJy4vX2FycmF5TGlrZUtleXMuanMnO1xuaW1wb3J0IGJhc2VLZXlzIGZyb20gJy4vX2Jhc2VLZXlzLmpzJztcbmltcG9ydCBpc0FycmF5TGlrZSBmcm9tICcuL2lzQXJyYXlMaWtlLmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5rZXlzKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXMobmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKlxuICogXy5rZXlzKCdoaScpO1xuICogLy8gPT4gWycwJywgJzEnXVxuICovXG5mdW5jdGlvbiBrZXlzKG9iamVjdCkge1xuICByZXR1cm4gaXNBcnJheUxpa2Uob2JqZWN0KSA/IGFycmF5TGlrZUtleXMob2JqZWN0KSA6IGJhc2VLZXlzKG9iamVjdCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGtleXM7XG4iLCJpbXBvcnQgYmFzZUZvciBmcm9tICcuL19iYXNlRm9yLmpzJztcbmltcG9ydCBrZXlzIGZyb20gJy4va2V5cy5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZm9yT3duYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZUZvck93bihvYmplY3QsIGl0ZXJhdGVlKSB7XG4gIHJldHVybiBvYmplY3QgJiYgYmFzZUZvcihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUZvck93bjtcbiIsImltcG9ydCBpc0FycmF5TGlrZSBmcm9tICcuL2lzQXJyYXlMaWtlLmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgYGJhc2VFYWNoYCBvciBgYmFzZUVhY2hSaWdodGAgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVhY2hGdW5jIFRoZSBmdW5jdGlvbiB0byBpdGVyYXRlIG92ZXIgYSBjb2xsZWN0aW9uLlxuICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBiYXNlIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVCYXNlRWFjaChlYWNoRnVuYywgZnJvbVJpZ2h0KSB7XG4gIHJldHVybiBmdW5jdGlvbihjb2xsZWN0aW9uLCBpdGVyYXRlZSkge1xuICAgIGlmIChjb2xsZWN0aW9uID09IG51bGwpIHtcbiAgICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICAgIH1cbiAgICBpZiAoIWlzQXJyYXlMaWtlKGNvbGxlY3Rpb24pKSB7XG4gICAgICByZXR1cm4gZWFjaEZ1bmMoY29sbGVjdGlvbiwgaXRlcmF0ZWUpO1xuICAgIH1cbiAgICB2YXIgbGVuZ3RoID0gY29sbGVjdGlvbi5sZW5ndGgsXG4gICAgICAgIGluZGV4ID0gZnJvbVJpZ2h0ID8gbGVuZ3RoIDogLTEsXG4gICAgICAgIGl0ZXJhYmxlID0gT2JqZWN0KGNvbGxlY3Rpb24pO1xuXG4gICAgd2hpbGUgKChmcm9tUmlnaHQgPyBpbmRleC0tIDogKytpbmRleCA8IGxlbmd0aCkpIHtcbiAgICAgIGlmIChpdGVyYXRlZShpdGVyYWJsZVtpbmRleF0sIGluZGV4LCBpdGVyYWJsZSkgPT09IGZhbHNlKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY29sbGVjdGlvbjtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQmFzZUVhY2g7XG4iLCJpbXBvcnQgYmFzZUZvck93biBmcm9tICcuL19iYXNlRm9yT3duLmpzJztcbmltcG9ydCBjcmVhdGVCYXNlRWFjaCBmcm9tICcuL19jcmVhdGVCYXNlRWFjaC5qcyc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uZm9yRWFjaGAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fE9iamVjdH0gUmV0dXJucyBgY29sbGVjdGlvbmAuXG4gKi9cbnZhciBiYXNlRWFjaCA9IGNyZWF0ZUJhc2VFYWNoKGJhc2VGb3JPd24pO1xuXG5leHBvcnQgZGVmYXVsdCBiYXNlRWFjaDtcbiIsIi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgaXQgcmVjZWl2ZXMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQW55IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKlxuICogY29uc29sZS5sb2coXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpZGVudGl0eSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlkZW50aXR5O1xuIiwiaW1wb3J0IGlkZW50aXR5IGZyb20gJy4vaWRlbnRpdHkuanMnO1xuXG4vKipcbiAqIENhc3RzIGB2YWx1ZWAgdG8gYGlkZW50aXR5YCBpZiBpdCdzIG5vdCBhIGZ1bmN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBpbnNwZWN0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIGNhc3QgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNhc3RGdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdmdW5jdGlvbicgPyB2YWx1ZSA6IGlkZW50aXR5O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjYXN0RnVuY3Rpb247XG4iLCJpbXBvcnQgYXJyYXlFYWNoIGZyb20gJy4vX2FycmF5RWFjaC5qcyc7XG5pbXBvcnQgYmFzZUVhY2ggZnJvbSAnLi9fYmFzZUVhY2guanMnO1xuaW1wb3J0IGNhc3RGdW5jdGlvbiBmcm9tICcuL19jYXN0RnVuY3Rpb24uanMnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5LmpzJztcblxuLyoqXG4gKiBJdGVyYXRlcyBvdmVyIGVsZW1lbnRzIG9mIGBjb2xsZWN0aW9uYCBhbmQgaW52b2tlcyBgaXRlcmF0ZWVgIGZvciBlYWNoIGVsZW1lbnQuXG4gKiBUaGUgaXRlcmF0ZWUgaXMgaW52b2tlZCB3aXRoIHRocmVlIGFyZ3VtZW50czogKHZhbHVlLCBpbmRleHxrZXksIGNvbGxlY3Rpb24pLlxuICogSXRlcmF0ZWUgZnVuY3Rpb25zIG1heSBleGl0IGl0ZXJhdGlvbiBlYXJseSBieSBleHBsaWNpdGx5IHJldHVybmluZyBgZmFsc2VgLlxuICpcbiAqICoqTm90ZToqKiBBcyB3aXRoIG90aGVyIFwiQ29sbGVjdGlvbnNcIiBtZXRob2RzLCBvYmplY3RzIHdpdGggYSBcImxlbmd0aFwiXG4gKiBwcm9wZXJ0eSBhcmUgaXRlcmF0ZWQgbGlrZSBhcnJheXMuIFRvIGF2b2lkIHRoaXMgYmVoYXZpb3IgdXNlIGBfLmZvckluYFxuICogb3IgYF8uZm9yT3duYCBmb3Igb2JqZWN0IGl0ZXJhdGlvbi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAYWxpYXMgZWFjaFxuICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fE9iamVjdH0gUmV0dXJucyBgY29sbGVjdGlvbmAuXG4gKiBAc2VlIF8uZm9yRWFjaFJpZ2h0XG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZm9yRWFjaChbMSwgMl0sIGZ1bmN0aW9uKHZhbHVlKSB7XG4gKiAgIGNvbnNvbGUubG9nKHZhbHVlKTtcbiAqIH0pO1xuICogLy8gPT4gTG9ncyBgMWAgdGhlbiBgMmAuXG4gKlxuICogXy5mb3JFYWNoKHsgJ2EnOiAxLCAnYic6IDIgfSwgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICogICBjb25zb2xlLmxvZyhrZXkpO1xuICogfSk7XG4gKiAvLyA9PiBMb2dzICdhJyB0aGVuICdiJyAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKS5cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChjb2xsZWN0aW9uLCBpdGVyYXRlZSkge1xuICB2YXIgZnVuYyA9IGlzQXJyYXkoY29sbGVjdGlvbikgPyBhcnJheUVhY2ggOiBiYXNlRWFjaDtcbiAgcmV0dXJuIGZ1bmMoY29sbGVjdGlvbiwgY2FzdEZ1bmN0aW9uKGl0ZXJhdGVlKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZvckVhY2g7XG4iLCJpbXBvcnQgZWFjaCBmcm9tICdsb2Rhc2gtZXMvZWFjaCc7XG5pbXBvcnQgaXNGdW5jdGlvbiBmcm9tICdsb2Rhc2gtZXMvaXNGdW5jdGlvbic7XG5pbXBvcnQgc2NyaXB0IGZyb20gJy4uL1NjcmlwdCc7XG5cbmNvbnN0IFZ1ZUluc3RhbGxlciA9IHtcbiAgICB1c2UsXG4gICAgc2NyaXB0LFxuICAgIHBsdWdpbixcbiAgICBwbHVnaW5zLFxuICAgIGZpbHRlcixcbiAgICBmaWx0ZXJzLFxuICAgIGNvbXBvbmVudCxcbiAgICBjb21wb25lbnRzLFxuICAgIGRpcmVjdGl2ZSxcbiAgICBkaXJlY3RpdmVzLFxuICAgICRwbHVnaW5zOiB7fSxcbiAgICAkZmlsdGVyczoge30sXG4gICAgJGRpcmVjdGl2ZXM6IHt9LFxuICAgICRjb21wb25lbnRzOiB7fSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2UocGx1Z2luKSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5WdWUpIHtcbiAgICAgICAgd2luZG93LlZ1ZS51c2UocGx1Z2luKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGx1Z2luO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGx1Z2luKFZ1ZSwgbmFtZSwgZGVmKSB7XG4gICAgaWYoIVZ1ZUluc3RhbGxlci4kcGx1Z2luc1tuYW1lXSkge1xuICAgICAgICBWdWUudXNlKFZ1ZUluc3RhbGxlci4kcGx1Z2luc1tuYW1lXSA9IGRlZik7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGx1Z2lucyhWdWUsIHBsdWdpbnMpIHtcbiAgICBlYWNoKHBsdWdpbnMsIChkZWYsIG5hbWUpID0+IHtcbiAgICAgICAgcGx1Z2luKFZ1ZSwgbmFtZSwgZGVmKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlcihWdWUsIG5hbWUsIGRlZikge1xuICAgIGlmKCFWdWVJbnN0YWxsZXIuJGZpbHRlcnNbbmFtZV0pIHtcbiAgICAgICAgVnVlLnVzZShWdWVJbnN0YWxsZXIuJGZpbHRlcnNbbmFtZV0gPSBkZWYpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlcnMoVnVlLCBmaWx0ZXJzKSB7XG4gICAgZWFjaChmaWx0ZXJzLCAoZGVmLCBuYW1lKSA9PiB7XG4gICAgICAgIGZpbHRlcihWdWUsIG5hbWUsIGRlZik7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wb25lbnQoVnVlLCBuYW1lLCBkZWYpIHtcbiAgICBpZighVnVlSW5zdGFsbGVyLiRjb21wb25lbnRzW25hbWVdKSB7XG4gICAgICAgIFZ1ZS5jb21wb25lbnQobmFtZSwgVnVlSW5zdGFsbGVyLiRjb21wb25lbnRzW25hbWVdID0gZGVmKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wb25lbnRzKFZ1ZSwgY29tcG9uZW50cykge1xuICAgIGVhY2goY29tcG9uZW50cywgKGRlZiwgbmFtZSkgPT4ge1xuICAgICAgICBjb21wb25lbnQoVnVlLCBuYW1lLCBkZWYpO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlyZWN0aXZlKFZ1ZSwgbmFtZSwgZGVmKSB7XG4gICAgaWYoIVZ1ZUluc3RhbGxlci4kZGlyZWN0aXZlc1tuYW1lXSkge1xuICAgICAgICBpZihpc0Z1bmN0aW9uKGRlZikpIHtcbiAgICAgICAgICAgIFZ1ZS51c2UoVnVlSW5zdGFsbGVyLiRkaXJlY3RpdmVzW25hbWVdID0gZGVmKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIFZ1ZS5kaXJlY3RpdmUobmFtZSwgZGVmKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpcmVjdGl2ZXMoVnVlLCBkaXJlY3RpdmVzKSB7XG4gICAgZWFjaChkaXJlY3RpdmVzLCAoZGVmLCBuYW1lKSA9PiB7XG4gICAgICAgIGRpcmVjdGl2ZShWdWUsIG5hbWUsIGRlZik7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFZ1ZUluc3RhbGxlcjtcbiIsImltcG9ydCBGb3JtR3JvdXAgZnJvbSAnLi9Gb3JtR3JvdXAnO1xuaW1wb3J0IFZ1ZUluc3RhbGxlciBmcm9tICcuLi8uLi9IZWxwZXJzL1Z1ZUluc3RhbGxlci9WdWVJbnN0YWxsZXInO1xuXG5jb25zdCBwbHVnaW4gPSBWdWVJbnN0YWxsZXIudXNlKHtcblxuICAgIGluc3RhbGwoVnVlLCBvcHRpb25zKSB7XG4gICAgICAgIFZ1ZUluc3RhbGxlci5jb21wb25lbnRzKHtcbiAgICAgICAgICAgIEZvcm1Hcm91cFxuICAgICAgICB9KTtcbiAgICB9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBGb3JtR3JvdXA7XG4iLCJpbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG92ZXJyZWFjaGluZyBjb3JlLWpzIHNoaW1zLiAqL1xudmFyIGNvcmVKc0RhdGEgPSByb290WydfX2NvcmUtanNfc2hhcmVkX18nXTtcblxuZXhwb3J0IGRlZmF1bHQgY29yZUpzRGF0YTtcbiIsImltcG9ydCBjb3JlSnNEYXRhIGZyb20gJy4vX2NvcmVKc0RhdGEuanMnO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWV0aG9kcyBtYXNxdWVyYWRpbmcgYXMgbmF0aXZlLiAqL1xudmFyIG1hc2tTcmNLZXkgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciB1aWQgPSAvW14uXSskLy5leGVjKGNvcmVKc0RhdGEgJiYgY29yZUpzRGF0YS5rZXlzICYmIGNvcmVKc0RhdGEua2V5cy5JRV9QUk9UTyB8fCAnJyk7XG4gIHJldHVybiB1aWQgPyAoJ1N5bWJvbChzcmMpXzEuJyArIHVpZCkgOiAnJztcbn0oKSk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBmdW5jYCBoYXMgaXRzIHNvdXJjZSBtYXNrZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBmdW5jYCBpcyBtYXNrZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNNYXNrZWQoZnVuYykge1xuICByZXR1cm4gISFtYXNrU3JjS2V5ICYmIChtYXNrU3JjS2V5IGluIGZ1bmMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc01hc2tlZDtcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ29udmVydHMgYGZ1bmNgIHRvIGl0cyBzb3VyY2UgY29kZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHNvdXJjZSBjb2RlLlxuICovXG5mdW5jdGlvbiB0b1NvdXJjZShmdW5jKSB7XG4gIGlmIChmdW5jICE9IG51bGwpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGZ1bmNUb1N0cmluZy5jYWxsKGZ1bmMpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoZnVuYyArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiAnJztcbn1cblxuZXhwb3J0IGRlZmF1bHQgdG9Tb3VyY2U7XG4iLCJpbXBvcnQgaXNGdW5jdGlvbiBmcm9tICcuL2lzRnVuY3Rpb24uanMnO1xuaW1wb3J0IGlzTWFza2VkIGZyb20gJy4vX2lzTWFza2VkLmpzJztcbmltcG9ydCBpc09iamVjdCBmcm9tICcuL2lzT2JqZWN0LmpzJztcbmltcG9ydCB0b1NvdXJjZSBmcm9tICcuL190b1NvdXJjZS5qcyc7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYFxuICogW3N5bnRheCBjaGFyYWN0ZXJzXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1wYXR0ZXJucykuXG4gKi9cbnZhciByZVJlZ0V4cENoYXIgPSAvW1xcXFxeJC4qKz8oKVtcXF17fXxdL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpKS4gKi9cbnZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGZ1bmNUb1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KS5yZXBsYWNlKHJlUmVnRXhwQ2hhciwgJ1xcXFwkJicpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc05hdGl2ZWAgd2l0aG91dCBiYWQgc2hpbSBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkgfHwgaXNNYXNrZWQodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwYXR0ZXJuID0gaXNGdW5jdGlvbih2YWx1ZSkgPyByZUlzTmF0aXZlIDogcmVJc0hvc3RDdG9yO1xuICByZXR1cm4gcGF0dGVybi50ZXN0KHRvU291cmNlKHZhbHVlKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VJc05hdGl2ZTtcbiIsIi8qKlxuICogR2V0cyB0aGUgdmFsdWUgYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGdldFZhbHVlKG9iamVjdCwga2V5KSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRWYWx1ZTtcbiIsImltcG9ydCBiYXNlSXNOYXRpdmUgZnJvbSAnLi9fYmFzZUlzTmF0aXZlLmpzJztcbmltcG9ydCBnZXRWYWx1ZSBmcm9tICcuL19nZXRWYWx1ZS5qcyc7XG5cbi8qKlxuICogR2V0cyB0aGUgbmF0aXZlIGZ1bmN0aW9uIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIG1ldGhvZCB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZnVuY3Rpb24gaWYgaXQncyBuYXRpdmUsIGVsc2UgYHVuZGVmaW5lZGAuXG4gKi9cbmZ1bmN0aW9uIGdldE5hdGl2ZShvYmplY3QsIGtleSkge1xuICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShvYmplY3QsIGtleSk7XG4gIHJldHVybiBiYXNlSXNOYXRpdmUodmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldE5hdGl2ZTtcbiIsImltcG9ydCBnZXROYXRpdmUgZnJvbSAnLi9fZ2V0TmF0aXZlLmpzJztcblxudmFyIGRlZmluZVByb3BlcnR5ID0gKGZ1bmN0aW9uKCkge1xuICB0cnkge1xuICAgIHZhciBmdW5jID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2RlZmluZVByb3BlcnR5Jyk7XG4gICAgZnVuYyh7fSwgJycsIHt9KTtcbiAgICByZXR1cm4gZnVuYztcbiAgfSBjYXRjaCAoZSkge31cbn0oKSk7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZVByb3BlcnR5O1xuIiwiaW1wb3J0IGRlZmluZVByb3BlcnR5IGZyb20gJy4vX2RlZmluZVByb3BlcnR5LmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgYXNzaWduVmFsdWVgIGFuZCBgYXNzaWduTWVyZ2VWYWx1ZWAgd2l0aG91dFxuICogdmFsdWUgY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBhc3NpZ24uXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBhc3NpZ24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VBc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSA9PSAnX19wcm90b19fJyAmJiBkZWZpbmVQcm9wZXJ0eSkge1xuICAgIGRlZmluZVByb3BlcnR5KG9iamVjdCwga2V5LCB7XG4gICAgICAnY29uZmlndXJhYmxlJzogdHJ1ZSxcbiAgICAgICdlbnVtZXJhYmxlJzogdHJ1ZSxcbiAgICAgICd2YWx1ZSc6IHZhbHVlLFxuICAgICAgJ3dyaXRhYmxlJzogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUFzc2lnblZhbHVlO1xuIiwiLyoqXG4gKiBQZXJmb3JtcyBhXG4gKiBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogY29tcGFyaXNvbiBiZXR3ZWVuIHR3byB2YWx1ZXMgdG8gZGV0ZXJtaW5lIGlmIHRoZXkgYXJlIGVxdWl2YWxlbnQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdhJzogMSB9O1xuICpcbiAqIF8uZXEob2JqZWN0LCBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoJ2EnLCAnYScpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEoJ2EnLCBPYmplY3QoJ2EnKSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoTmFOLCBOYU4pO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBlcSh2YWx1ZSwgb3RoZXIpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBvdGhlciB8fCAodmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGVxO1xuIiwiaW1wb3J0IGJhc2VBc3NpZ25WYWx1ZSBmcm9tICcuL19iYXNlQXNzaWduVmFsdWUuanMnO1xuaW1wb3J0IGVxIGZyb20gJy4vZXEuanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEFzc2lnbnMgYHZhbHVlYCB0byBga2V5YCBvZiBgb2JqZWN0YCBpZiB0aGUgZXhpc3RpbmcgdmFsdWUgaXMgbm90IGVxdWl2YWxlbnRcbiAqIHVzaW5nIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBmb3IgZXF1YWxpdHkgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGFzc2lnbi5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnbi5cbiAqL1xuZnVuY3Rpb24gYXNzaWduVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldO1xuICBpZiAoIShoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBlcShvYmpWYWx1ZSwgdmFsdWUpKSB8fFxuICAgICAgKHZhbHVlID09PSB1bmRlZmluZWQgJiYgIShrZXkgaW4gb2JqZWN0KSkpIHtcbiAgICBiYXNlQXNzaWduVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBhc3NpZ25WYWx1ZTtcbiIsImltcG9ydCBhc3NpZ25WYWx1ZSBmcm9tICcuL19hc3NpZ25WYWx1ZS5qcyc7XG5pbXBvcnQgYmFzZUFzc2lnblZhbHVlIGZyb20gJy4vX2Jhc2VBc3NpZ25WYWx1ZS5qcyc7XG5cbi8qKlxuICogQ29waWVzIHByb3BlcnRpZXMgb2YgYHNvdXJjZWAgdG8gYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbS5cbiAqIEBwYXJhbSB7QXJyYXl9IHByb3BzIFRoZSBwcm9wZXJ0eSBpZGVudGlmaWVycyB0byBjb3B5LlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3Q9e31dIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIHRvLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29waWVkIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGNvcHlPYmplY3Qoc291cmNlLCBwcm9wcywgb2JqZWN0LCBjdXN0b21pemVyKSB7XG4gIHZhciBpc05ldyA9ICFvYmplY3Q7XG4gIG9iamVjdCB8fCAob2JqZWN0ID0ge30pO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcblxuICAgIHZhciBuZXdWYWx1ZSA9IGN1c3RvbWl6ZXJcbiAgICAgID8gY3VzdG9taXplcihvYmplY3Rba2V5XSwgc291cmNlW2tleV0sIGtleSwgb2JqZWN0LCBzb3VyY2UpXG4gICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBuZXdWYWx1ZSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgICBpZiAoaXNOZXcpIHtcbiAgICAgIGJhc2VBc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gb2JqZWN0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb3B5T2JqZWN0O1xuIiwiLyoqXG4gKiBBIGZhc3RlciBhbHRlcm5hdGl2ZSB0byBgRnVuY3Rpb24jYXBwbHlgLCB0aGlzIGZ1bmN0aW9uIGludm9rZXMgYGZ1bmNgXG4gKiB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiBgdGhpc0FyZ2AgYW5kIHRoZSBhcmd1bWVudHMgb2YgYGFyZ3NgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBpbnZva2UuXG4gKiBAcGFyYW0geyp9IHRoaXNBcmcgVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyZ3MgVGhlIGFyZ3VtZW50cyB0byBpbnZva2UgYGZ1bmNgIHdpdGguXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzdWx0IG9mIGBmdW5jYC5cbiAqL1xuZnVuY3Rpb24gYXBwbHkoZnVuYywgdGhpc0FyZywgYXJncykge1xuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcpO1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICB9XG4gIHJldHVybiBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhcHBseTtcbiIsImltcG9ydCBhcHBseSBmcm9tICcuL19hcHBseS5qcyc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VSZXN0YCB3aGljaCB0cmFuc2Zvcm1zIHRoZSByZXN0IGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD1mdW5jLmxlbmd0aC0xXSBUaGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHJlc3QgcGFyYW1ldGVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSByZXN0IGFycmF5IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyUmVzdChmdW5jLCBzdGFydCwgdHJhbnNmb3JtKSB7XG4gIHN0YXJ0ID0gbmF0aXZlTWF4KHN0YXJ0ID09PSB1bmRlZmluZWQgPyAoZnVuYy5sZW5ndGggLSAxKSA6IHN0YXJ0LCAwKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBuYXRpdmVNYXgoYXJncy5sZW5ndGggLSBzdGFydCwgMCksXG4gICAgICAgIGFycmF5ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICBhcnJheVtpbmRleF0gPSBhcmdzW3N0YXJ0ICsgaW5kZXhdO1xuICAgIH1cbiAgICBpbmRleCA9IC0xO1xuICAgIHZhciBvdGhlckFyZ3MgPSBBcnJheShzdGFydCArIDEpO1xuICAgIHdoaWxlICgrK2luZGV4IDwgc3RhcnQpIHtcbiAgICAgIG90aGVyQXJnc1tpbmRleF0gPSBhcmdzW2luZGV4XTtcbiAgICB9XG4gICAgb3RoZXJBcmdzW3N0YXJ0XSA9IHRyYW5zZm9ybShhcnJheSk7XG4gICAgcmV0dXJuIGFwcGx5KGZ1bmMsIHRoaXMsIG90aGVyQXJncyk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IG92ZXJSZXN0O1xuIiwiLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGB2YWx1ZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjQuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHJldHVybiBmcm9tIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjb25zdGFudCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdHMgPSBfLnRpbWVzKDIsIF8uY29uc3RhbnQoeyAnYSc6IDEgfSkpO1xuICpcbiAqIGNvbnNvbGUubG9nKG9iamVjdHMpO1xuICogLy8gPT4gW3sgJ2EnOiAxIH0sIHsgJ2EnOiAxIH1dXG4gKlxuICogY29uc29sZS5sb2cob2JqZWN0c1swXSA9PT0gb2JqZWN0c1sxXSk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGNvbnN0YW50KHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnN0YW50O1xuIiwiaW1wb3J0IGNvbnN0YW50IGZyb20gJy4vY29uc3RhbnQuanMnO1xuaW1wb3J0IGRlZmluZVByb3BlcnR5IGZyb20gJy4vX2RlZmluZVByb3BlcnR5LmpzJztcbmltcG9ydCBpZGVudGl0eSBmcm9tICcuL2lkZW50aXR5LmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgc2V0VG9TdHJpbmdgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaG90IGxvb3Agc2hvcnRpbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHN0cmluZyBUaGUgYHRvU3RyaW5nYCByZXN1bHQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgYGZ1bmNgLlxuICovXG52YXIgYmFzZVNldFRvU3RyaW5nID0gIWRlZmluZVByb3BlcnR5ID8gaWRlbnRpdHkgOiBmdW5jdGlvbihmdW5jLCBzdHJpbmcpIHtcbiAgcmV0dXJuIGRlZmluZVByb3BlcnR5KGZ1bmMsICd0b1N0cmluZycsIHtcbiAgICAnY29uZmlndXJhYmxlJzogdHJ1ZSxcbiAgICAnZW51bWVyYWJsZSc6IGZhbHNlLFxuICAgICd2YWx1ZSc6IGNvbnN0YW50KHN0cmluZyksXG4gICAgJ3dyaXRhYmxlJzogdHJ1ZVxuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VTZXRUb1N0cmluZztcbiIsIi8qKiBVc2VkIHRvIGRldGVjdCBob3QgZnVuY3Rpb25zIGJ5IG51bWJlciBvZiBjYWxscyB3aXRoaW4gYSBzcGFuIG9mIG1pbGxpc2Vjb25kcy4gKi9cbnZhciBIT1RfQ09VTlQgPSA4MDAsXG4gICAgSE9UX1NQQU4gPSAxNjtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU5vdyA9IERhdGUubm93O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0J2xsIHNob3J0IG91dCBhbmQgaW52b2tlIGBpZGVudGl0eWAgaW5zdGVhZFxuICogb2YgYGZ1bmNgIHdoZW4gaXQncyBjYWxsZWQgYEhPVF9DT1VOVGAgb3IgbW9yZSB0aW1lcyBpbiBgSE9UX1NQQU5gXG4gKiBtaWxsaXNlY29uZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHJlc3RyaWN0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgc2hvcnRhYmxlIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBzaG9ydE91dChmdW5jKSB7XG4gIHZhciBjb3VudCA9IDAsXG4gICAgICBsYXN0Q2FsbGVkID0gMDtcblxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0YW1wID0gbmF0aXZlTm93KCksXG4gICAgICAgIHJlbWFpbmluZyA9IEhPVF9TUEFOIC0gKHN0YW1wIC0gbGFzdENhbGxlZCk7XG5cbiAgICBsYXN0Q2FsbGVkID0gc3RhbXA7XG4gICAgaWYgKHJlbWFpbmluZyA+IDApIHtcbiAgICAgIGlmICgrK2NvdW50ID49IEhPVF9DT1VOVCkge1xuICAgICAgICByZXR1cm4gYXJndW1lbnRzWzBdO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb3VudCA9IDA7XG4gICAgfVxuICAgIHJldHVybiBmdW5jLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2hvcnRPdXQ7XG4iLCJpbXBvcnQgYmFzZVNldFRvU3RyaW5nIGZyb20gJy4vX2Jhc2VTZXRUb1N0cmluZy5qcyc7XG5pbXBvcnQgc2hvcnRPdXQgZnJvbSAnLi9fc2hvcnRPdXQuanMnO1xuXG4vKipcbiAqIFNldHMgdGhlIGB0b1N0cmluZ2AgbWV0aG9kIG9mIGBmdW5jYCB0byByZXR1cm4gYHN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHN0cmluZyBUaGUgYHRvU3RyaW5nYCByZXN1bHQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgYGZ1bmNgLlxuICovXG52YXIgc2V0VG9TdHJpbmcgPSBzaG9ydE91dChiYXNlU2V0VG9TdHJpbmcpO1xuXG5leHBvcnQgZGVmYXVsdCBzZXRUb1N0cmluZztcbiIsImltcG9ydCBpZGVudGl0eSBmcm9tICcuL2lkZW50aXR5LmpzJztcbmltcG9ydCBvdmVyUmVzdCBmcm9tICcuL19vdmVyUmVzdC5qcyc7XG5pbXBvcnQgc2V0VG9TdHJpbmcgZnJvbSAnLi9fc2V0VG9TdHJpbmcuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnJlc3RgIHdoaWNoIGRvZXNuJ3QgdmFsaWRhdGUgb3IgY29lcmNlIGFyZ3VtZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gYXBwbHkgYSByZXN0IHBhcmFtZXRlciB0by5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhcnQ9ZnVuYy5sZW5ndGgtMV0gVGhlIHN0YXJ0IHBvc2l0aW9uIG9mIHRoZSByZXN0IHBhcmFtZXRlci5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUmVzdChmdW5jLCBzdGFydCkge1xuICByZXR1cm4gc2V0VG9TdHJpbmcob3ZlclJlc3QoZnVuYywgc3RhcnQsIGlkZW50aXR5KSwgZnVuYyArICcnKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZVJlc3Q7XG4iLCJpbXBvcnQgZXEgZnJvbSAnLi9lcS5qcyc7XG5pbXBvcnQgaXNBcnJheUxpa2UgZnJvbSAnLi9pc0FycmF5TGlrZS5qcyc7XG5pbXBvcnQgaXNJbmRleCBmcm9tICcuL19pc0luZGV4LmpzJztcbmltcG9ydCBpc09iamVjdCBmcm9tICcuL2lzT2JqZWN0LmpzJztcblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIGdpdmVuIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgdmFsdWUgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IGluZGV4IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgaW5kZXggb3Iga2V5IGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBvYmplY3QgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBvYmplY3QgYXJndW1lbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJdGVyYXRlZUNhbGwodmFsdWUsIGluZGV4LCBvYmplY3QpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0eXBlID0gdHlwZW9mIGluZGV4O1xuICBpZiAodHlwZSA9PSAnbnVtYmVyJ1xuICAgICAgICA/IChpc0FycmF5TGlrZShvYmplY3QpICYmIGlzSW5kZXgoaW5kZXgsIG9iamVjdC5sZW5ndGgpKVxuICAgICAgICA6ICh0eXBlID09ICdzdHJpbmcnICYmIGluZGV4IGluIG9iamVjdClcbiAgICAgICkge1xuICAgIHJldHVybiBlcShvYmplY3RbaW5kZXhdLCB2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc0l0ZXJhdGVlQ2FsbDtcbiIsImltcG9ydCBiYXNlUmVzdCBmcm9tICcuL19iYXNlUmVzdC5qcyc7XG5pbXBvcnQgaXNJdGVyYXRlZUNhbGwgZnJvbSAnLi9faXNJdGVyYXRlZUNhbGwuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiBsaWtlIGBfLmFzc2lnbmAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGFzc2lnbmVyIFRoZSBmdW5jdGlvbiB0byBhc3NpZ24gdmFsdWVzLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYXNzaWduZXIgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUFzc2lnbmVyKGFzc2lnbmVyKSB7XG4gIHJldHVybiBiYXNlUmVzdChmdW5jdGlvbihvYmplY3QsIHNvdXJjZXMpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gc291cmNlcy5sZW5ndGgsXG4gICAgICAgIGN1c3RvbWl6ZXIgPSBsZW5ndGggPiAxID8gc291cmNlc1tsZW5ndGggLSAxXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgZ3VhcmQgPSBsZW5ndGggPiAyID8gc291cmNlc1syXSA6IHVuZGVmaW5lZDtcblxuICAgIGN1c3RvbWl6ZXIgPSAoYXNzaWduZXIubGVuZ3RoID4gMyAmJiB0eXBlb2YgY3VzdG9taXplciA9PSAnZnVuY3Rpb24nKVxuICAgICAgPyAobGVuZ3RoLS0sIGN1c3RvbWl6ZXIpXG4gICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChndWFyZCAmJiBpc0l0ZXJhdGVlQ2FsbChzb3VyY2VzWzBdLCBzb3VyY2VzWzFdLCBndWFyZCkpIHtcbiAgICAgIGN1c3RvbWl6ZXIgPSBsZW5ndGggPCAzID8gdW5kZWZpbmVkIDogY3VzdG9taXplcjtcbiAgICAgIGxlbmd0aCA9IDE7XG4gICAgfVxuICAgIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICB2YXIgc291cmNlID0gc291cmNlc1tpbmRleF07XG4gICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgIGFzc2lnbmVyKG9iamVjdCwgc291cmNlLCBpbmRleCwgY3VzdG9taXplcik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVBc3NpZ25lcjtcbiIsIi8qKlxuICogVGhpcyBmdW5jdGlvbiBpcyBsaWtlXG4gKiBbYE9iamVjdC5rZXlzYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBleGNlcHQgdGhhdCBpdCBpbmNsdWRlcyBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBuYXRpdmVLZXlzSW4ob2JqZWN0KSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgaWYgKG9iamVjdCAhPSBudWxsKSB7XG4gICAgZm9yICh2YXIga2V5IGluIE9iamVjdChvYmplY3QpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBuYXRpdmVLZXlzSW47XG4iLCJpbXBvcnQgaXNPYmplY3QgZnJvbSAnLi9pc09iamVjdC5qcyc7XG5pbXBvcnQgaXNQcm90b3R5cGUgZnJvbSAnLi9faXNQcm90b3R5cGUuanMnO1xuaW1wb3J0IG5hdGl2ZUtleXNJbiBmcm9tICcuL19uYXRpdmVLZXlzSW4uanMnO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNJbmAgd2hpY2ggZG9lc24ndCB0cmVhdCBzcGFyc2UgYXJyYXlzIGFzIGRlbnNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBiYXNlS2V5c0luKG9iamVjdCkge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gbmF0aXZlS2V5c0luKG9iamVjdCk7XG4gIH1cbiAgdmFyIGlzUHJvdG8gPSBpc1Byb3RvdHlwZShvYmplY3QpLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgIGlmICghKGtleSA9PSAnY29uc3RydWN0b3InICYmIChpc1Byb3RvIHx8ICFoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlS2V5c0luO1xuIiwiaW1wb3J0IGFycmF5TGlrZUtleXMgZnJvbSAnLi9fYXJyYXlMaWtlS2V5cy5qcyc7XG5pbXBvcnQgYmFzZUtleXNJbiBmcm9tICcuL19iYXNlS2V5c0luLmpzJztcbmltcG9ydCBpc0FycmF5TGlrZSBmcm9tICcuL2lzQXJyYXlMaWtlLmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gYW5kIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5c0luKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InLCAnYyddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKi9cbmZ1bmN0aW9uIGtleXNJbihvYmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXlMaWtlKG9iamVjdCkgPyBhcnJheUxpa2VLZXlzKG9iamVjdCwgdHJ1ZSkgOiBiYXNlS2V5c0luKG9iamVjdCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGtleXNJbjtcbiIsImltcG9ydCBjb3B5T2JqZWN0IGZyb20gJy4vX2NvcHlPYmplY3QuanMnO1xuaW1wb3J0IGNyZWF0ZUFzc2lnbmVyIGZyb20gJy4vX2NyZWF0ZUFzc2lnbmVyLmpzJztcbmltcG9ydCBrZXlzSW4gZnJvbSAnLi9rZXlzSW4uanMnO1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uYXNzaWduYCBleGNlcHQgdGhhdCBpdCBpdGVyYXRlcyBvdmVyIG93biBhbmRcbiAqIGluaGVyaXRlZCBzb3VyY2UgcHJvcGVydGllcy5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgbXV0YXRlcyBgb2JqZWN0YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAYWxpYXMgZXh0ZW5kXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gW3NvdXJjZXNdIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAc2VlIF8uYXNzaWduXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqIH1cbiAqXG4gKiBmdW5jdGlvbiBCYXIoKSB7XG4gKiAgIHRoaXMuYyA9IDM7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5iID0gMjtcbiAqIEJhci5wcm90b3R5cGUuZCA9IDQ7XG4gKlxuICogXy5hc3NpZ25Jbih7ICdhJzogMCB9LCBuZXcgRm9vLCBuZXcgQmFyKTtcbiAqIC8vID0+IHsgJ2EnOiAxLCAnYic6IDIsICdjJzogMywgJ2QnOiA0IH1cbiAqL1xudmFyIGFzc2lnbkluID0gY3JlYXRlQXNzaWduZXIoZnVuY3Rpb24ob2JqZWN0LCBzb3VyY2UpIHtcbiAgY29weU9iamVjdChzb3VyY2UsIGtleXNJbihzb3VyY2UpLCBvYmplY3QpO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGFzc2lnbkluO1xuIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8ubWFwYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWVcbiAqIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBtYXBwZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGFycmF5TWFwKGFycmF5LCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID09IG51bGwgPyAwIDogYXJyYXkubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRlZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXJyYXlNYXA7XG4iLCIvKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gW107XG4gIHRoaXMuc2l6ZSA9IDA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGxpc3RDYWNoZUNsZWFyO1xuIiwiaW1wb3J0IGVxIGZyb20gJy4vZXEuanMnO1xuXG4vKipcbiAqIEdldHMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBga2V5YCBpcyBmb3VuZCBpbiBgYXJyYXlgIG9mIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IGtleSBUaGUga2V5IHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBhc3NvY0luZGV4T2YoYXJyYXksIGtleSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICBpZiAoZXEoYXJyYXlbbGVuZ3RoXVswXSwga2V5KSkge1xuICAgICAgcmV0dXJuIGxlbmd0aDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhc3NvY0luZGV4T2Y7XG4iLCJpbXBvcnQgYXNzb2NJbmRleE9mIGZyb20gJy4vX2Fzc29jSW5kZXhPZi5qcyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzcGxpY2UgPSBhcnJheVByb3RvLnNwbGljZTtcblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlRGVsZXRlKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGxhc3RJbmRleCA9IGRhdGEubGVuZ3RoIC0gMTtcbiAgaWYgKGluZGV4ID09IGxhc3RJbmRleCkge1xuICAgIGRhdGEucG9wKCk7XG4gIH0gZWxzZSB7XG4gICAgc3BsaWNlLmNhbGwoZGF0YSwgaW5kZXgsIDEpO1xuICB9XG4gIC0tdGhpcy5zaXplO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbGlzdENhY2hlRGVsZXRlO1xuIiwiaW1wb3J0IGFzc29jSW5kZXhPZiBmcm9tICcuL19hc3NvY0luZGV4T2YuanMnO1xuXG4vKipcbiAqIEdldHMgdGhlIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgcmV0dXJuIGluZGV4IDwgMCA/IHVuZGVmaW5lZCA6IGRhdGFbaW5kZXhdWzFdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBsaXN0Q2FjaGVHZXQ7XG4iLCJpbXBvcnQgYXNzb2NJbmRleE9mIGZyb20gJy4vX2Fzc29jSW5kZXhPZi5qcyc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBhc3NvY0luZGV4T2YodGhpcy5fX2RhdGFfXywga2V5KSA+IC0xO1xufVxuXG5leHBvcnQgZGVmYXVsdCBsaXN0Q2FjaGVIYXM7XG4iLCJpbXBvcnQgYXNzb2NJbmRleE9mIGZyb20gJy4vX2Fzc29jSW5kZXhPZi5qcyc7XG5cbi8qKlxuICogU2V0cyB0aGUgbGlzdCBjYWNoZSBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbGlzdCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgKyt0aGlzLnNpemU7XG4gICAgZGF0YS5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0YVtpbmRleF1bMV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cblxuZXhwb3J0IGRlZmF1bHQgbGlzdENhY2hlU2V0O1xuIiwiaW1wb3J0IGxpc3RDYWNoZUNsZWFyIGZyb20gJy4vX2xpc3RDYWNoZUNsZWFyLmpzJztcbmltcG9ydCBsaXN0Q2FjaGVEZWxldGUgZnJvbSAnLi9fbGlzdENhY2hlRGVsZXRlLmpzJztcbmltcG9ydCBsaXN0Q2FjaGVHZXQgZnJvbSAnLi9fbGlzdENhY2hlR2V0LmpzJztcbmltcG9ydCBsaXN0Q2FjaGVIYXMgZnJvbSAnLi9fbGlzdENhY2hlSGFzLmpzJztcbmltcG9ydCBsaXN0Q2FjaGVTZXQgZnJvbSAnLi9fbGlzdENhY2hlU2V0LmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGxpc3QgY2FjaGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBMaXN0Q2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPT0gbnVsbCA/IDAgOiBlbnRyaWVzLmxlbmd0aDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTGlzdENhY2hlYC5cbkxpc3RDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBsaXN0Q2FjaGVDbGVhcjtcbkxpc3RDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbGlzdENhY2hlRGVsZXRlO1xuTGlzdENhY2hlLnByb3RvdHlwZS5nZXQgPSBsaXN0Q2FjaGVHZXQ7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmhhcyA9IGxpc3RDYWNoZUhhcztcbkxpc3RDYWNoZS5wcm90b3R5cGUuc2V0ID0gbGlzdENhY2hlU2V0O1xuXG5leHBvcnQgZGVmYXVsdCBMaXN0Q2FjaGU7XG4iLCJpbXBvcnQgTGlzdENhY2hlIGZyb20gJy4vX0xpc3RDYWNoZS5qcyc7XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgc3RhY2suXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqL1xuZnVuY3Rpb24gc3RhY2tDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5ldyBMaXN0Q2FjaGU7XG4gIHRoaXMuc2l6ZSA9IDA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0YWNrQ2xlYXI7XG4iLCIvKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBzdGFjay5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzdGFja0RlbGV0ZShrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgcmVzdWx0ID0gZGF0YVsnZGVsZXRlJ10oa2V5KTtcblxuICB0aGlzLnNpemUgPSBkYXRhLnNpemU7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0YWNrRGVsZXRlO1xuIiwiLyoqXG4gKiBHZXRzIHRoZSBzdGFjayB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gc3RhY2tHZXQoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fLmdldChrZXkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdGFja0dldDtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGEgc3RhY2sgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzdGFja0hhcyhrZXkpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uaGFzKGtleSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0YWNrSGFzO1xuIiwiaW1wb3J0IGdldE5hdGl2ZSBmcm9tICcuL19nZXROYXRpdmUuanMnO1xuaW1wb3J0IHJvb3QgZnJvbSAnLi9fcm9vdC5qcyc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBNYXAgPSBnZXROYXRpdmUocm9vdCwgJ01hcCcpO1xuXG5leHBvcnQgZGVmYXVsdCBNYXA7XG4iLCJpbXBvcnQgZ2V0TmF0aXZlIGZyb20gJy4vX2dldE5hdGl2ZS5qcyc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBuYXRpdmVDcmVhdGUgPSBnZXROYXRpdmUoT2JqZWN0LCAnY3JlYXRlJyk7XG5cbmV4cG9ydCBkZWZhdWx0IG5hdGl2ZUNyZWF0ZTtcbiIsImltcG9ydCBuYXRpdmVDcmVhdGUgZnJvbSAnLi9fbmF0aXZlQ3JlYXRlLmpzJztcblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIEhhc2hcbiAqL1xuZnVuY3Rpb24gaGFzaENsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmF0aXZlQ3JlYXRlID8gbmF0aXZlQ3JlYXRlKG51bGwpIDoge307XG4gIHRoaXMuc2l6ZSA9IDA7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGhhc2hDbGVhcjtcbiIsIi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7T2JqZWN0fSBoYXNoIFRoZSBoYXNoIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoRGVsZXRlKGtleSkge1xuICB2YXIgcmVzdWx0ID0gdGhpcy5oYXMoa2V5KSAmJiBkZWxldGUgdGhpcy5fX2RhdGFfX1trZXldO1xuICB0aGlzLnNpemUgLT0gcmVzdWx0ID8gMSA6IDA7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGhhc2hEZWxldGU7XG4iLCJpbXBvcnQgbmF0aXZlQ3JlYXRlIGZyb20gJy4vX25hdGl2ZUNyZWF0ZS5qcyc7XG5cbi8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbnZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBHZXRzIHRoZSBoYXNoIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGhhc2hHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgaWYgKG5hdGl2ZUNyZWF0ZSkge1xuICAgIHZhciByZXN1bHQgPSBkYXRhW2tleV07XG4gICAgcmV0dXJuIHJlc3VsdCA9PT0gSEFTSF9VTkRFRklORUQgPyB1bmRlZmluZWQgOiByZXN1bHQ7XG4gIH1cbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KSA/IGRhdGFba2V5XSA6IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaGFzaEdldDtcbiIsImltcG9ydCBuYXRpdmVDcmVhdGUgZnJvbSAnLi9fbmF0aXZlQ3JlYXRlLmpzJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBoYXNoIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoSGFzKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIHJldHVybiBuYXRpdmVDcmVhdGUgPyAoZGF0YVtrZXldICE9PSB1bmRlZmluZWQpIDogaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBoYXNoSGFzO1xuIiwiaW1wb3J0IG5hdGl2ZUNyZWF0ZSBmcm9tICcuL19uYXRpdmVDcmVhdGUuanMnO1xuXG4vKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKlxuICogU2V0cyB0aGUgaGFzaCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGhhc2ggaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGhhc2hTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIHRoaXMuc2l6ZSArPSB0aGlzLmhhcyhrZXkpID8gMCA6IDE7XG4gIGRhdGFba2V5XSA9IChuYXRpdmVDcmVhdGUgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCkgPyBIQVNIX1VOREVGSU5FRCA6IHZhbHVlO1xuICByZXR1cm4gdGhpcztcbn1cblxuZXhwb3J0IGRlZmF1bHQgaGFzaFNldDtcbiIsImltcG9ydCBoYXNoQ2xlYXIgZnJvbSAnLi9faGFzaENsZWFyLmpzJztcbmltcG9ydCBoYXNoRGVsZXRlIGZyb20gJy4vX2hhc2hEZWxldGUuanMnO1xuaW1wb3J0IGhhc2hHZXQgZnJvbSAnLi9faGFzaEdldC5qcyc7XG5pbXBvcnQgaGFzaEhhcyBmcm9tICcuL19oYXNoSGFzLmpzJztcbmltcG9ydCBoYXNoU2V0IGZyb20gJy4vX2hhc2hTZXQuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBoYXNoIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gSGFzaChlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA9PSBudWxsID8gMCA6IGVudHJpZXMubGVuZ3RoO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBIYXNoYC5cbkhhc2gucHJvdG90eXBlLmNsZWFyID0gaGFzaENsZWFyO1xuSGFzaC5wcm90b3R5cGVbJ2RlbGV0ZSddID0gaGFzaERlbGV0ZTtcbkhhc2gucHJvdG90eXBlLmdldCA9IGhhc2hHZXQ7XG5IYXNoLnByb3RvdHlwZS5oYXMgPSBoYXNoSGFzO1xuSGFzaC5wcm90b3R5cGUuc2V0ID0gaGFzaFNldDtcblxuZXhwb3J0IGRlZmF1bHQgSGFzaDtcbiIsImltcG9ydCBIYXNoIGZyb20gJy4vX0hhc2guanMnO1xuaW1wb3J0IExpc3RDYWNoZSBmcm9tICcuL19MaXN0Q2FjaGUuanMnO1xuaW1wb3J0IE1hcCBmcm9tICcuL19NYXAuanMnO1xuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUNsZWFyKCkge1xuICB0aGlzLnNpemUgPSAwO1xuICB0aGlzLl9fZGF0YV9fID0ge1xuICAgICdoYXNoJzogbmV3IEhhc2gsXG4gICAgJ21hcCc6IG5ldyAoTWFwIHx8IExpc3RDYWNoZSksXG4gICAgJ3N0cmluZyc6IG5ldyBIYXNoXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1hcENhY2hlQ2xlYXI7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlIGZvciB1c2UgYXMgdW5pcXVlIG9iamVjdCBrZXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXlhYmxlKHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gKHR5cGUgPT0gJ3N0cmluZycgfHwgdHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nKVxuICAgID8gKHZhbHVlICE9PSAnX19wcm90b19fJylcbiAgICA6ICh2YWx1ZSA9PT0gbnVsbCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzS2V5YWJsZTtcbiIsImltcG9ydCBpc0tleWFibGUgZnJvbSAnLi9faXNLZXlhYmxlLmpzJztcblxuLyoqXG4gKiBHZXRzIHRoZSBkYXRhIGZvciBgbWFwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUgcmVmZXJlbmNlIGtleS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBtYXAgZGF0YS5cbiAqL1xuZnVuY3Rpb24gZ2V0TWFwRGF0YShtYXAsIGtleSkge1xuICB2YXIgZGF0YSA9IG1hcC5fX2RhdGFfXztcbiAgcmV0dXJuIGlzS2V5YWJsZShrZXkpXG4gICAgPyBkYXRhW3R5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyAnc3RyaW5nJyA6ICdoYXNoJ11cbiAgICA6IGRhdGEubWFwO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRNYXBEYXRhO1xuIiwiaW1wb3J0IGdldE1hcERhdGEgZnJvbSAnLi9fZ2V0TWFwRGF0YS5qcyc7XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZURlbGV0ZShrZXkpIHtcbiAgdmFyIHJlc3VsdCA9IGdldE1hcERhdGEodGhpcywga2V5KVsnZGVsZXRlJ10oa2V5KTtcbiAgdGhpcy5zaXplIC09IHJlc3VsdCA/IDEgOiAwO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXBDYWNoZURlbGV0ZTtcbiIsImltcG9ydCBnZXRNYXBEYXRhIGZyb20gJy4vX2dldE1hcERhdGEuanMnO1xuXG4vKipcbiAqIEdldHMgdGhlIG1hcCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVHZXQoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuZ2V0KGtleSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1hcENhY2hlR2V0O1xuIiwiaW1wb3J0IGdldE1hcERhdGEgZnJvbSAnLi9fZ2V0TWFwRGF0YS5qcyc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbWFwIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuaGFzKGtleSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1hcENhY2hlSGFzO1xuIiwiaW1wb3J0IGdldE1hcERhdGEgZnJvbSAnLi9fZ2V0TWFwRGF0YS5qcyc7XG5cbi8qKlxuICogU2V0cyB0aGUgbWFwIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG1hcCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IGdldE1hcERhdGEodGhpcywga2V5KSxcbiAgICAgIHNpemUgPSBkYXRhLnNpemU7XG5cbiAgZGF0YS5zZXQoa2V5LCB2YWx1ZSk7XG4gIHRoaXMuc2l6ZSArPSBkYXRhLnNpemUgPT0gc2l6ZSA/IDAgOiAxO1xuICByZXR1cm4gdGhpcztcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWFwQ2FjaGVTZXQ7XG4iLCJpbXBvcnQgbWFwQ2FjaGVDbGVhciBmcm9tICcuL19tYXBDYWNoZUNsZWFyLmpzJztcbmltcG9ydCBtYXBDYWNoZURlbGV0ZSBmcm9tICcuL19tYXBDYWNoZURlbGV0ZS5qcyc7XG5pbXBvcnQgbWFwQ2FjaGVHZXQgZnJvbSAnLi9fbWFwQ2FjaGVHZXQuanMnO1xuaW1wb3J0IG1hcENhY2hlSGFzIGZyb20gJy4vX21hcENhY2hlSGFzLmpzJztcbmltcG9ydCBtYXBDYWNoZVNldCBmcm9tICcuL19tYXBDYWNoZVNldC5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hcCBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBNYXBDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA9PSBudWxsID8gMCA6IGVudHJpZXMubGVuZ3RoO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBNYXBDYWNoZWAuXG5NYXBDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBtYXBDYWNoZUNsZWFyO1xuTWFwQ2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IG1hcENhY2hlRGVsZXRlO1xuTWFwQ2FjaGUucHJvdG90eXBlLmdldCA9IG1hcENhY2hlR2V0O1xuTWFwQ2FjaGUucHJvdG90eXBlLmhhcyA9IG1hcENhY2hlSGFzO1xuTWFwQ2FjaGUucHJvdG90eXBlLnNldCA9IG1hcENhY2hlU2V0O1xuXG5leHBvcnQgZGVmYXVsdCBNYXBDYWNoZTtcbiIsImltcG9ydCBMaXN0Q2FjaGUgZnJvbSAnLi9fTGlzdENhY2hlLmpzJztcbmltcG9ydCBNYXAgZnJvbSAnLi9fTWFwLmpzJztcbmltcG9ydCBNYXBDYWNoZSBmcm9tICcuL19NYXBDYWNoZS5qcyc7XG5cbi8qKiBVc2VkIGFzIHRoZSBzaXplIHRvIGVuYWJsZSBsYXJnZSBhcnJheSBvcHRpbWl6YXRpb25zLiAqL1xudmFyIExBUkdFX0FSUkFZX1NJWkUgPSAyMDA7XG5cbi8qKlxuICogU2V0cyB0aGUgc3RhY2sgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgc3RhY2sgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAoZGF0YSBpbnN0YW5jZW9mIExpc3RDYWNoZSkge1xuICAgIHZhciBwYWlycyA9IGRhdGEuX19kYXRhX187XG4gICAgaWYgKCFNYXAgfHwgKHBhaXJzLmxlbmd0aCA8IExBUkdFX0FSUkFZX1NJWkUgLSAxKSkge1xuICAgICAgcGFpcnMucHVzaChba2V5LCB2YWx1ZV0pO1xuICAgICAgdGhpcy5zaXplID0gKytkYXRhLnNpemU7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgZGF0YSA9IHRoaXMuX19kYXRhX18gPSBuZXcgTWFwQ2FjaGUocGFpcnMpO1xuICB9XG4gIGRhdGEuc2V0KGtleSwgdmFsdWUpO1xuICB0aGlzLnNpemUgPSBkYXRhLnNpemU7XG4gIHJldHVybiB0aGlzO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdGFja1NldDtcbiIsImltcG9ydCBMaXN0Q2FjaGUgZnJvbSAnLi9fTGlzdENhY2hlLmpzJztcbmltcG9ydCBzdGFja0NsZWFyIGZyb20gJy4vX3N0YWNrQ2xlYXIuanMnO1xuaW1wb3J0IHN0YWNrRGVsZXRlIGZyb20gJy4vX3N0YWNrRGVsZXRlLmpzJztcbmltcG9ydCBzdGFja0dldCBmcm9tICcuL19zdGFja0dldC5qcyc7XG5pbXBvcnQgc3RhY2tIYXMgZnJvbSAnLi9fc3RhY2tIYXMuanMnO1xuaW1wb3J0IHN0YWNrU2V0IGZyb20gJy4vX3N0YWNrU2V0LmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgc3RhY2sgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gU3RhY2soZW50cmllcykge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18gPSBuZXcgTGlzdENhY2hlKGVudHJpZXMpO1xuICB0aGlzLnNpemUgPSBkYXRhLnNpemU7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBTdGFja2AuXG5TdGFjay5wcm90b3R5cGUuY2xlYXIgPSBzdGFja0NsZWFyO1xuU3RhY2sucHJvdG90eXBlWydkZWxldGUnXSA9IHN0YWNrRGVsZXRlO1xuU3RhY2sucHJvdG90eXBlLmdldCA9IHN0YWNrR2V0O1xuU3RhY2sucHJvdG90eXBlLmhhcyA9IHN0YWNrSGFzO1xuU3RhY2sucHJvdG90eXBlLnNldCA9IHN0YWNrU2V0O1xuXG5leHBvcnQgZGVmYXVsdCBTdGFjaztcbiIsIi8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbnZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuLyoqXG4gKiBBZGRzIGB2YWx1ZWAgdG8gdGhlIGFycmF5IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBhZGRcbiAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICogQGFsaWFzIHB1c2hcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNhY2hlLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIHNldENhY2hlQWRkKHZhbHVlKSB7XG4gIHRoaXMuX19kYXRhX18uc2V0KHZhbHVlLCBIQVNIX1VOREVGSU5FRCk7XG4gIHJldHVybiB0aGlzO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzZXRDYWNoZUFkZDtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgaW4gdGhlIGFycmF5IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc2V0Q2FjaGVIYXModmFsdWUpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uaGFzKHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2V0Q2FjaGVIYXM7XG4iLCJpbXBvcnQgTWFwQ2FjaGUgZnJvbSAnLi9fTWFwQ2FjaGUuanMnO1xuaW1wb3J0IHNldENhY2hlQWRkIGZyb20gJy4vX3NldENhY2hlQWRkLmpzJztcbmltcG9ydCBzZXRDYWNoZUhhcyBmcm9tICcuL19zZXRDYWNoZUhhcy5qcyc7XG5cbi8qKlxuICpcbiAqIENyZWF0ZXMgYW4gYXJyYXkgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIHVuaXF1ZSB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW3ZhbHVlc10gVGhlIHZhbHVlcyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gU2V0Q2FjaGUodmFsdWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gdmFsdWVzID09IG51bGwgPyAwIDogdmFsdWVzLmxlbmd0aDtcblxuICB0aGlzLl9fZGF0YV9fID0gbmV3IE1hcENhY2hlO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHRoaXMuYWRkKHZhbHVlc1tpbmRleF0pO1xuICB9XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBTZXRDYWNoZWAuXG5TZXRDYWNoZS5wcm90b3R5cGUuYWRkID0gU2V0Q2FjaGUucHJvdG90eXBlLnB1c2ggPSBzZXRDYWNoZUFkZDtcblNldENhY2hlLnByb3RvdHlwZS5oYXMgPSBzZXRDYWNoZUhhcztcblxuZXhwb3J0IGRlZmF1bHQgU2V0Q2FjaGU7XG4iLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5zb21lYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWVcbiAqIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFueSBlbGVtZW50IHBhc3NlcyB0aGUgcHJlZGljYXRlIGNoZWNrLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlTb21lKGFycmF5LCBwcmVkaWNhdGUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA9PSBudWxsID8gMCA6IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChwcmVkaWNhdGUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhcnJheVNvbWU7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBhIGBjYWNoZWAgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGNhY2hlIFRoZSBjYWNoZSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBjYWNoZUhhcyhjYWNoZSwga2V5KSB7XG4gIHJldHVybiBjYWNoZS5oYXMoa2V5KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2FjaGVIYXM7XG4iLCJpbXBvcnQgU2V0Q2FjaGUgZnJvbSAnLi9fU2V0Q2FjaGUuanMnO1xuaW1wb3J0IGFycmF5U29tZSBmcm9tICcuL19hcnJheVNvbWUuanMnO1xuaW1wb3J0IGNhY2hlSGFzIGZyb20gJy4vX2NhY2hlSGFzLmpzJztcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgdmFsdWUgY29tcGFyaXNvbnMuICovXG52YXIgQ09NUEFSRV9QQVJUSUFMX0ZMQUcgPSAxLFxuICAgIENPTVBBUkVfVU5PUkRFUkVEX0ZMQUcgPSAyO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3IgYXJyYXlzIHdpdGggc3VwcG9ydCBmb3JcbiAqIHBhcnRpYWwgZGVlcCBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0FycmF5fSBvdGhlciBUaGUgb3RoZXIgYXJyYXkgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYCBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IHN0YWNrIFRyYWNrcyB0cmF2ZXJzZWQgYGFycmF5YCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcnJheXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxBcnJheXMoYXJyYXksIG90aGVyLCBiaXRtYXNrLCBjdXN0b21pemVyLCBlcXVhbEZ1bmMsIHN0YWNrKSB7XG4gIHZhciBpc1BhcnRpYWwgPSBiaXRtYXNrICYgQ09NUEFSRV9QQVJUSUFMX0ZMQUcsXG4gICAgICBhcnJMZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBvdGhMZW5ndGggPSBvdGhlci5sZW5ndGg7XG5cbiAgaWYgKGFyckxlbmd0aCAhPSBvdGhMZW5ndGggJiYgIShpc1BhcnRpYWwgJiYgb3RoTGVuZ3RoID4gYXJyTGVuZ3RoKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBBc3N1bWUgY3ljbGljIHZhbHVlcyBhcmUgZXF1YWwuXG4gIHZhciBzdGFja2VkID0gc3RhY2suZ2V0KGFycmF5KTtcbiAgaWYgKHN0YWNrZWQgJiYgc3RhY2suZ2V0KG90aGVyKSkge1xuICAgIHJldHVybiBzdGFja2VkID09IG90aGVyO1xuICB9XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gdHJ1ZSxcbiAgICAgIHNlZW4gPSAoYml0bWFzayAmIENPTVBBUkVfVU5PUkRFUkVEX0ZMQUcpID8gbmV3IFNldENhY2hlIDogdW5kZWZpbmVkO1xuXG4gIHN0YWNrLnNldChhcnJheSwgb3RoZXIpO1xuICBzdGFjay5zZXQob3RoZXIsIGFycmF5KTtcblxuICAvLyBJZ25vcmUgbm9uLWluZGV4IHByb3BlcnRpZXMuXG4gIHdoaWxlICgrK2luZGV4IDwgYXJyTGVuZ3RoKSB7XG4gICAgdmFyIGFyclZhbHVlID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2luZGV4XTtcblxuICAgIGlmIChjdXN0b21pemVyKSB7XG4gICAgICB2YXIgY29tcGFyZWQgPSBpc1BhcnRpYWxcbiAgICAgICAgPyBjdXN0b21pemVyKG90aFZhbHVlLCBhcnJWYWx1ZSwgaW5kZXgsIG90aGVyLCBhcnJheSwgc3RhY2spXG4gICAgICAgIDogY3VzdG9taXplcihhcnJWYWx1ZSwgb3RoVmFsdWUsIGluZGV4LCBhcnJheSwgb3RoZXIsIHN0YWNrKTtcbiAgICB9XG4gICAgaWYgKGNvbXBhcmVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChjb21wYXJlZCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgaWYgKHNlZW4pIHtcbiAgICAgIGlmICghYXJyYXlTb21lKG90aGVyLCBmdW5jdGlvbihvdGhWYWx1ZSwgb3RoSW5kZXgpIHtcbiAgICAgICAgICAgIGlmICghY2FjaGVIYXMoc2Vlbiwgb3RoSW5kZXgpICYmXG4gICAgICAgICAgICAgICAgKGFyclZhbHVlID09PSBvdGhWYWx1ZSB8fCBlcXVhbEZ1bmMoYXJyVmFsdWUsIG90aFZhbHVlLCBiaXRtYXNrLCBjdXN0b21pemVyLCBzdGFjaykpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBzZWVuLnB1c2gob3RoSW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKSB7XG4gICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCEoXG4gICAgICAgICAgYXJyVmFsdWUgPT09IG90aFZhbHVlIHx8XG4gICAgICAgICAgICBlcXVhbEZ1bmMoYXJyVmFsdWUsIG90aFZhbHVlLCBiaXRtYXNrLCBjdXN0b21pemVyLCBzdGFjaylcbiAgICAgICAgKSkge1xuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgc3RhY2tbJ2RlbGV0ZSddKGFycmF5KTtcbiAgc3RhY2tbJ2RlbGV0ZSddKG90aGVyKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZXF1YWxBcnJheXM7XG4iLCJpbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgVWludDhBcnJheSA9IHJvb3QuVWludDhBcnJheTtcblxuZXhwb3J0IGRlZmF1bHQgVWludDhBcnJheTtcbiIsIi8qKlxuICogQ29udmVydHMgYG1hcGAgdG8gaXRzIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGtleS12YWx1ZSBwYWlycy5cbiAqL1xuZnVuY3Rpb24gbWFwVG9BcnJheShtYXApIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShtYXAuc2l6ZSk7XG5cbiAgbWFwLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IFtrZXksIHZhbHVlXTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IG1hcFRvQXJyYXk7XG4iLCIvKipcbiAqIENvbnZlcnRzIGBzZXRgIHRvIGFuIGFycmF5IG9mIGl0cyB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXQgVGhlIHNldCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSB2YWx1ZXMuXG4gKi9cbmZ1bmN0aW9uIHNldFRvQXJyYXkoc2V0KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkoc2V0LnNpemUpO1xuXG4gIHNldC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmVzdWx0WysraW5kZXhdID0gdmFsdWU7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBzZXRUb0FycmF5O1xuIiwiaW1wb3J0IFN5bWJvbCBmcm9tICcuL19TeW1ib2wuanMnO1xuaW1wb3J0IFVpbnQ4QXJyYXkgZnJvbSAnLi9fVWludDhBcnJheS5qcyc7XG5pbXBvcnQgZXEgZnJvbSAnLi9lcS5qcyc7XG5pbXBvcnQgZXF1YWxBcnJheXMgZnJvbSAnLi9fZXF1YWxBcnJheXMuanMnO1xuaW1wb3J0IG1hcFRvQXJyYXkgZnJvbSAnLi9fbWFwVG9BcnJheS5qcyc7XG5pbXBvcnQgc2V0VG9BcnJheSBmcm9tICcuL19zZXRUb0FycmF5LmpzJztcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgdmFsdWUgY29tcGFyaXNvbnMuICovXG52YXIgQ09NUEFSRV9QQVJUSUFMX0ZMQUcgPSAxLFxuICAgIENPTVBBUkVfVU5PUkRFUkVEX0ZMQUcgPSAyO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxudmFyIGFycmF5QnVmZmVyVGFnID0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJyxcbiAgICBkYXRhVmlld1RhZyA9ICdbb2JqZWN0IERhdGFWaWV3XSc7XG5cbi8qKiBVc2VkIHRvIGNvbnZlcnQgc3ltYm9scyB0byBwcmltaXRpdmVzIGFuZCBzdHJpbmdzLiAqL1xudmFyIHN5bWJvbFByb3RvID0gU3ltYm9sID8gU3ltYm9sLnByb3RvdHlwZSA6IHVuZGVmaW5lZCxcbiAgICBzeW1ib2xWYWx1ZU9mID0gc3ltYm9sUHJvdG8gPyBzeW1ib2xQcm90by52YWx1ZU9mIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3IgY29tcGFyaW5nIG9iamVjdHMgb2ZcbiAqIHRoZSBzYW1lIGB0b1N0cmluZ1RhZ2AuXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gb25seSBzdXBwb3J0cyBjb21wYXJpbmcgdmFsdWVzIHdpdGggdGFncyBvZlxuICogYEJvb2xlYW5gLCBgRGF0ZWAsIGBFcnJvcmAsIGBOdW1iZXJgLCBgUmVnRXhwYCwgb3IgYFN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgVGhlIGB0b1N0cmluZ1RhZ2Agb2YgdGhlIG9iamVjdHMgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYCBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IHN0YWNrIFRyYWNrcyB0cmF2ZXJzZWQgYG9iamVjdGAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbEJ5VGFnKG9iamVjdCwgb3RoZXIsIHRhZywgYml0bWFzaywgY3VzdG9taXplciwgZXF1YWxGdW5jLCBzdGFjaykge1xuICBzd2l0Y2ggKHRhZykge1xuICAgIGNhc2UgZGF0YVZpZXdUYWc6XG4gICAgICBpZiAoKG9iamVjdC5ieXRlTGVuZ3RoICE9IG90aGVyLmJ5dGVMZW5ndGgpIHx8XG4gICAgICAgICAgKG9iamVjdC5ieXRlT2Zmc2V0ICE9IG90aGVyLmJ5dGVPZmZzZXQpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIG9iamVjdCA9IG9iamVjdC5idWZmZXI7XG4gICAgICBvdGhlciA9IG90aGVyLmJ1ZmZlcjtcblxuICAgIGNhc2UgYXJyYXlCdWZmZXJUYWc6XG4gICAgICBpZiAoKG9iamVjdC5ieXRlTGVuZ3RoICE9IG90aGVyLmJ5dGVMZW5ndGgpIHx8XG4gICAgICAgICAgIWVxdWFsRnVuYyhuZXcgVWludDhBcnJheShvYmplY3QpLCBuZXcgVWludDhBcnJheShvdGhlcikpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgY2FzZSBib29sVGFnOlxuICAgIGNhc2UgZGF0ZVRhZzpcbiAgICBjYXNlIG51bWJlclRhZzpcbiAgICAgIC8vIENvZXJjZSBib29sZWFucyB0byBgMWAgb3IgYDBgIGFuZCBkYXRlcyB0byBtaWxsaXNlY29uZHMuXG4gICAgICAvLyBJbnZhbGlkIGRhdGVzIGFyZSBjb2VyY2VkIHRvIGBOYU5gLlxuICAgICAgcmV0dXJuIGVxKCtvYmplY3QsICtvdGhlcik7XG5cbiAgICBjYXNlIGVycm9yVGFnOlxuICAgICAgcmV0dXJuIG9iamVjdC5uYW1lID09IG90aGVyLm5hbWUgJiYgb2JqZWN0Lm1lc3NhZ2UgPT0gb3RoZXIubWVzc2FnZTtcblxuICAgIGNhc2UgcmVnZXhwVGFnOlxuICAgIGNhc2Ugc3RyaW5nVGFnOlxuICAgICAgLy8gQ29lcmNlIHJlZ2V4ZXMgdG8gc3RyaW5ncyBhbmQgdHJlYXQgc3RyaW5ncywgcHJpbWl0aXZlcyBhbmQgb2JqZWN0cyxcbiAgICAgIC8vIGFzIGVxdWFsLiBTZWUgaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXJlZ2V4cC5wcm90b3R5cGUudG9zdHJpbmdcbiAgICAgIC8vIGZvciBtb3JlIGRldGFpbHMuXG4gICAgICByZXR1cm4gb2JqZWN0ID09IChvdGhlciArICcnKTtcblxuICAgIGNhc2UgbWFwVGFnOlxuICAgICAgdmFyIGNvbnZlcnQgPSBtYXBUb0FycmF5O1xuXG4gICAgY2FzZSBzZXRUYWc6XG4gICAgICB2YXIgaXNQYXJ0aWFsID0gYml0bWFzayAmIENPTVBBUkVfUEFSVElBTF9GTEFHO1xuICAgICAgY29udmVydCB8fCAoY29udmVydCA9IHNldFRvQXJyYXkpO1xuXG4gICAgICBpZiAob2JqZWN0LnNpemUgIT0gb3RoZXIuc2l6ZSAmJiAhaXNQYXJ0aWFsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgICAgIHZhciBzdGFja2VkID0gc3RhY2suZ2V0KG9iamVjdCk7XG4gICAgICBpZiAoc3RhY2tlZCkge1xuICAgICAgICByZXR1cm4gc3RhY2tlZCA9PSBvdGhlcjtcbiAgICAgIH1cbiAgICAgIGJpdG1hc2sgfD0gQ09NUEFSRV9VTk9SREVSRURfRkxBRztcblxuICAgICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBvYmplY3RzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgICBzdGFjay5zZXQob2JqZWN0LCBvdGhlcik7XG4gICAgICB2YXIgcmVzdWx0ID0gZXF1YWxBcnJheXMoY29udmVydChvYmplY3QpLCBjb252ZXJ0KG90aGVyKSwgYml0bWFzaywgY3VzdG9taXplciwgZXF1YWxGdW5jLCBzdGFjayk7XG4gICAgICBzdGFja1snZGVsZXRlJ10ob2JqZWN0KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICBjYXNlIHN5bWJvbFRhZzpcbiAgICAgIGlmIChzeW1ib2xWYWx1ZU9mKSB7XG4gICAgICAgIHJldHVybiBzeW1ib2xWYWx1ZU9mLmNhbGwob2JqZWN0KSA9PSBzeW1ib2xWYWx1ZU9mLmNhbGwob3RoZXIpO1xuICAgICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZXF1YWxCeVRhZztcbiIsIi8qKlxuICogQXBwZW5kcyB0aGUgZWxlbWVudHMgb2YgYHZhbHVlc2AgdG8gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBUaGUgdmFsdWVzIHRvIGFwcGVuZC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBhcnJheVB1c2goYXJyYXksIHZhbHVlcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHZhbHVlcy5sZW5ndGgsXG4gICAgICBvZmZzZXQgPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhcnJheVtvZmZzZXQgKyBpbmRleF0gPSB2YWx1ZXNbaW5kZXhdO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXJyYXlQdXNoO1xuIiwiaW1wb3J0IGFycmF5UHVzaCBmcm9tICcuL19hcnJheVB1c2guanMnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5LmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0QWxsS2V5c2AgYW5kIGBnZXRBbGxLZXlzSW5gIHdoaWNoIHVzZXNcbiAqIGBrZXlzRnVuY2AgYW5kIGBzeW1ib2xzRnVuY2AgdG8gZ2V0IHRoZSBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIGFuZFxuICogc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtGdW5jdGlvbn0ga2V5c0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUga2V5cyBvZiBgb2JqZWN0YC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHN5bWJvbHNGdW5jIFRoZSBmdW5jdGlvbiB0byBnZXQgdGhlIHN5bWJvbHMgb2YgYG9iamVjdGAuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzIGFuZCBzeW1ib2xzLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0QWxsS2V5cyhvYmplY3QsIGtleXNGdW5jLCBzeW1ib2xzRnVuYykge1xuICB2YXIgcmVzdWx0ID0ga2V5c0Z1bmMob2JqZWN0KTtcbiAgcmV0dXJuIGlzQXJyYXkob2JqZWN0KSA/IHJlc3VsdCA6IGFycmF5UHVzaChyZXN1bHQsIHN5bWJvbHNGdW5jKG9iamVjdCkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlR2V0QWxsS2V5cztcbiIsIi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmZpbHRlcmAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGZpbHRlcmVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBhcnJheUZpbHRlcihhcnJheSwgcHJlZGljYXRlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPT0gbnVsbCA/IDAgOiBhcnJheS5sZW5ndGgsXG4gICAgICByZXNJbmRleCA9IDAsXG4gICAgICByZXN1bHQgPSBbXTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XTtcbiAgICBpZiAocHJlZGljYXRlKHZhbHVlLCBpbmRleCwgYXJyYXkpKSB7XG4gICAgICByZXN1bHRbcmVzSW5kZXgrK10gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXJyYXlGaWx0ZXI7XG4iLCIvKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgYSBuZXcgZW1wdHkgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjEzLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBlbXB0eSBhcnJheS5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIGFycmF5cyA9IF8udGltZXMoMiwgXy5zdHViQXJyYXkpO1xuICpcbiAqIGNvbnNvbGUubG9nKGFycmF5cyk7XG4gKiAvLyA9PiBbW10sIFtdXVxuICpcbiAqIGNvbnNvbGUubG9nKGFycmF5c1swXSA9PT0gYXJyYXlzWzFdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIHN0dWJBcnJheSgpIHtcbiAgcmV0dXJuIFtdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHViQXJyYXk7XG4iLCJpbXBvcnQgYXJyYXlGaWx0ZXIgZnJvbSAnLi9fYXJyYXlGaWx0ZXIuanMnO1xuaW1wb3J0IHN0dWJBcnJheSBmcm9tICcuL3N0dWJBcnJheS5qcyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVHZXRTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBzeW1ib2xzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHN5bWJvbHMuXG4gKi9cbnZhciBnZXRTeW1ib2xzID0gIW5hdGl2ZUdldFN5bWJvbHMgPyBzdHViQXJyYXkgOiBmdW5jdGlvbihvYmplY3QpIHtcbiAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICByZXR1cm4gYXJyYXlGaWx0ZXIobmF0aXZlR2V0U3ltYm9scyhvYmplY3QpLCBmdW5jdGlvbihzeW1ib2wpIHtcbiAgICByZXR1cm4gcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChvYmplY3QsIHN5bWJvbCk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2V0U3ltYm9scztcbiIsImltcG9ydCBiYXNlR2V0QWxsS2V5cyBmcm9tICcuL19iYXNlR2V0QWxsS2V5cy5qcyc7XG5pbXBvcnQgZ2V0U3ltYm9scyBmcm9tICcuL19nZXRTeW1ib2xzLmpzJztcbmltcG9ydCBrZXlzIGZyb20gJy4va2V5cy5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBhbmQgc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcyBhbmQgc3ltYm9scy5cbiAqL1xuZnVuY3Rpb24gZ2V0QWxsS2V5cyhvYmplY3QpIHtcbiAgcmV0dXJuIGJhc2VHZXRBbGxLZXlzKG9iamVjdCwga2V5cywgZ2V0U3ltYm9scyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldEFsbEtleXM7XG4iLCJpbXBvcnQgZ2V0QWxsS2V5cyBmcm9tICcuL19nZXRBbGxLZXlzLmpzJztcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgdmFsdWUgY29tcGFyaXNvbnMuICovXG52YXIgQ09NUEFSRV9QQVJUSUFMX0ZMQUcgPSAxO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3Igb2JqZWN0cyB3aXRoIHN1cHBvcnQgZm9yXG4gKiBwYXJ0aWFsIGRlZXAgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYCBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IHN0YWNrIFRyYWNrcyB0cmF2ZXJzZWQgYG9iamVjdGAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbE9iamVjdHMob2JqZWN0LCBvdGhlciwgYml0bWFzaywgY3VzdG9taXplciwgZXF1YWxGdW5jLCBzdGFjaykge1xuICB2YXIgaXNQYXJ0aWFsID0gYml0bWFzayAmIENPTVBBUkVfUEFSVElBTF9GTEFHLFxuICAgICAgb2JqUHJvcHMgPSBnZXRBbGxLZXlzKG9iamVjdCksXG4gICAgICBvYmpMZW5ndGggPSBvYmpQcm9wcy5sZW5ndGgsXG4gICAgICBvdGhQcm9wcyA9IGdldEFsbEtleXMob3RoZXIpLFxuICAgICAgb3RoTGVuZ3RoID0gb3RoUHJvcHMubGVuZ3RoO1xuXG4gIGlmIChvYmpMZW5ndGggIT0gb3RoTGVuZ3RoICYmICFpc1BhcnRpYWwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGluZGV4ID0gb2JqTGVuZ3RoO1xuICB3aGlsZSAoaW5kZXgtLSkge1xuICAgIHZhciBrZXkgPSBvYmpQcm9wc1tpbmRleF07XG4gICAgaWYgKCEoaXNQYXJ0aWFsID8ga2V5IGluIG90aGVyIDogaGFzT3duUHJvcGVydHkuY2FsbChvdGhlciwga2V5KSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgLy8gQXNzdW1lIGN5Y2xpYyB2YWx1ZXMgYXJlIGVxdWFsLlxuICB2YXIgc3RhY2tlZCA9IHN0YWNrLmdldChvYmplY3QpO1xuICBpZiAoc3RhY2tlZCAmJiBzdGFjay5nZXQob3RoZXIpKSB7XG4gICAgcmV0dXJuIHN0YWNrZWQgPT0gb3RoZXI7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IHRydWU7XG4gIHN0YWNrLnNldChvYmplY3QsIG90aGVyKTtcbiAgc3RhY2suc2V0KG90aGVyLCBvYmplY3QpO1xuXG4gIHZhciBza2lwQ3RvciA9IGlzUGFydGlhbDtcbiAgd2hpbGUgKCsraW5kZXggPCBvYmpMZW5ndGgpIHtcbiAgICBrZXkgPSBvYmpQcm9wc1tpbmRleF07XG4gICAgdmFyIG9ialZhbHVlID0gb2JqZWN0W2tleV0sXG4gICAgICAgIG90aFZhbHVlID0gb3RoZXJba2V5XTtcblxuICAgIGlmIChjdXN0b21pemVyKSB7XG4gICAgICB2YXIgY29tcGFyZWQgPSBpc1BhcnRpYWxcbiAgICAgICAgPyBjdXN0b21pemVyKG90aFZhbHVlLCBvYmpWYWx1ZSwga2V5LCBvdGhlciwgb2JqZWN0LCBzdGFjaylcbiAgICAgICAgOiBjdXN0b21pemVyKG9ialZhbHVlLCBvdGhWYWx1ZSwga2V5LCBvYmplY3QsIG90aGVyLCBzdGFjayk7XG4gICAgfVxuICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgb2JqZWN0cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIGlmICghKGNvbXBhcmVkID09PSB1bmRlZmluZWRcbiAgICAgICAgICA/IChvYmpWYWx1ZSA9PT0gb3RoVmFsdWUgfHwgZXF1YWxGdW5jKG9ialZhbHVlLCBvdGhWYWx1ZSwgYml0bWFzaywgY3VzdG9taXplciwgc3RhY2spKVxuICAgICAgICAgIDogY29tcGFyZWRcbiAgICAgICAgKSkge1xuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgc2tpcEN0b3IgfHwgKHNraXBDdG9yID0ga2V5ID09ICdjb25zdHJ1Y3RvcicpO1xuICB9XG4gIGlmIChyZXN1bHQgJiYgIXNraXBDdG9yKSB7XG4gICAgdmFyIG9iakN0b3IgPSBvYmplY3QuY29uc3RydWN0b3IsXG4gICAgICAgIG90aEN0b3IgPSBvdGhlci5jb25zdHJ1Y3RvcjtcblxuICAgIC8vIE5vbiBgT2JqZWN0YCBvYmplY3QgaW5zdGFuY2VzIHdpdGggZGlmZmVyZW50IGNvbnN0cnVjdG9ycyBhcmUgbm90IGVxdWFsLlxuICAgIGlmIChvYmpDdG9yICE9IG90aEN0b3IgJiZcbiAgICAgICAgKCdjb25zdHJ1Y3RvcicgaW4gb2JqZWN0ICYmICdjb25zdHJ1Y3RvcicgaW4gb3RoZXIpICYmXG4gICAgICAgICEodHlwZW9mIG9iakN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBvYmpDdG9yIGluc3RhbmNlb2Ygb2JqQ3RvciAmJlxuICAgICAgICAgIHR5cGVvZiBvdGhDdG9yID09ICdmdW5jdGlvbicgJiYgb3RoQ3RvciBpbnN0YW5jZW9mIG90aEN0b3IpKSB7XG4gICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgc3RhY2tbJ2RlbGV0ZSddKG9iamVjdCk7XG4gIHN0YWNrWydkZWxldGUnXShvdGhlcik7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGVxdWFsT2JqZWN0cztcbiIsImltcG9ydCBnZXROYXRpdmUgZnJvbSAnLi9fZ2V0TmF0aXZlLmpzJztcbmltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgRGF0YVZpZXcgPSBnZXROYXRpdmUocm9vdCwgJ0RhdGFWaWV3Jyk7XG5cbmV4cG9ydCBkZWZhdWx0IERhdGFWaWV3O1xuIiwiaW1wb3J0IGdldE5hdGl2ZSBmcm9tICcuL19nZXROYXRpdmUuanMnO1xuaW1wb3J0IHJvb3QgZnJvbSAnLi9fcm9vdC5qcyc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBQcm9taXNlID0gZ2V0TmF0aXZlKHJvb3QsICdQcm9taXNlJyk7XG5cbmV4cG9ydCBkZWZhdWx0IFByb21pc2U7XG4iLCJpbXBvcnQgZ2V0TmF0aXZlIGZyb20gJy4vX2dldE5hdGl2ZS5qcyc7XG5pbXBvcnQgcm9vdCBmcm9tICcuL19yb290LmpzJztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIFNldCA9IGdldE5hdGl2ZShyb290LCAnU2V0Jyk7XG5cbmV4cG9ydCBkZWZhdWx0IFNldDtcbiIsImltcG9ydCBnZXROYXRpdmUgZnJvbSAnLi9fZ2V0TmF0aXZlLmpzJztcbmltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgV2Vha01hcCA9IGdldE5hdGl2ZShyb290LCAnV2Vha01hcCcpO1xuXG5leHBvcnQgZGVmYXVsdCBXZWFrTWFwO1xuIiwiaW1wb3J0IERhdGFWaWV3IGZyb20gJy4vX0RhdGFWaWV3LmpzJztcbmltcG9ydCBNYXAgZnJvbSAnLi9fTWFwLmpzJztcbmltcG9ydCBQcm9taXNlIGZyb20gJy4vX1Byb21pc2UuanMnO1xuaW1wb3J0IFNldCBmcm9tICcuL19TZXQuanMnO1xuaW1wb3J0IFdlYWtNYXAgZnJvbSAnLi9fV2Vha01hcC5qcyc7XG5pbXBvcnQgYmFzZUdldFRhZyBmcm9tICcuL19iYXNlR2V0VGFnLmpzJztcbmltcG9ydCB0b1NvdXJjZSBmcm9tICcuL190b1NvdXJjZS5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICBwcm9taXNlVGFnID0gJ1tvYmplY3QgUHJvbWlzZV0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHdlYWtNYXBUYWcgPSAnW29iamVjdCBXZWFrTWFwXSc7XG5cbnZhciBkYXRhVmlld1RhZyA9ICdbb2JqZWN0IERhdGFWaWV3XSc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBtYXBzLCBzZXRzLCBhbmQgd2Vha21hcHMuICovXG52YXIgZGF0YVZpZXdDdG9yU3RyaW5nID0gdG9Tb3VyY2UoRGF0YVZpZXcpLFxuICAgIG1hcEN0b3JTdHJpbmcgPSB0b1NvdXJjZShNYXApLFxuICAgIHByb21pc2VDdG9yU3RyaW5nID0gdG9Tb3VyY2UoUHJvbWlzZSksXG4gICAgc2V0Q3RvclN0cmluZyA9IHRvU291cmNlKFNldCksXG4gICAgd2Vha01hcEN0b3JTdHJpbmcgPSB0b1NvdXJjZShXZWFrTWFwKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBgdG9TdHJpbmdUYWdgIG9mIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xudmFyIGdldFRhZyA9IGJhc2VHZXRUYWc7XG5cbi8vIEZhbGxiYWNrIGZvciBkYXRhIHZpZXdzLCBtYXBzLCBzZXRzLCBhbmQgd2VhayBtYXBzIGluIElFIDExIGFuZCBwcm9taXNlcyBpbiBOb2RlLmpzIDwgNi5cbmlmICgoRGF0YVZpZXcgJiYgZ2V0VGFnKG5ldyBEYXRhVmlldyhuZXcgQXJyYXlCdWZmZXIoMSkpKSAhPSBkYXRhVmlld1RhZykgfHxcbiAgICAoTWFwICYmIGdldFRhZyhuZXcgTWFwKSAhPSBtYXBUYWcpIHx8XG4gICAgKFByb21pc2UgJiYgZ2V0VGFnKFByb21pc2UucmVzb2x2ZSgpKSAhPSBwcm9taXNlVGFnKSB8fFxuICAgIChTZXQgJiYgZ2V0VGFnKG5ldyBTZXQpICE9IHNldFRhZykgfHxcbiAgICAoV2Vha01hcCAmJiBnZXRUYWcobmV3IFdlYWtNYXApICE9IHdlYWtNYXBUYWcpKSB7XG4gIGdldFRhZyA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgdmFyIHJlc3VsdCA9IGJhc2VHZXRUYWcodmFsdWUpLFxuICAgICAgICBDdG9yID0gcmVzdWx0ID09IG9iamVjdFRhZyA/IHZhbHVlLmNvbnN0cnVjdG9yIDogdW5kZWZpbmVkLFxuICAgICAgICBjdG9yU3RyaW5nID0gQ3RvciA/IHRvU291cmNlKEN0b3IpIDogJyc7XG5cbiAgICBpZiAoY3RvclN0cmluZykge1xuICAgICAgc3dpdGNoIChjdG9yU3RyaW5nKSB7XG4gICAgICAgIGNhc2UgZGF0YVZpZXdDdG9yU3RyaW5nOiByZXR1cm4gZGF0YVZpZXdUYWc7XG4gICAgICAgIGNhc2UgbWFwQ3RvclN0cmluZzogcmV0dXJuIG1hcFRhZztcbiAgICAgICAgY2FzZSBwcm9taXNlQ3RvclN0cmluZzogcmV0dXJuIHByb21pc2VUYWc7XG4gICAgICAgIGNhc2Ugc2V0Q3RvclN0cmluZzogcmV0dXJuIHNldFRhZztcbiAgICAgICAgY2FzZSB3ZWFrTWFwQ3RvclN0cmluZzogcmV0dXJuIHdlYWtNYXBUYWc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGdldFRhZztcbiIsImltcG9ydCBTdGFjayBmcm9tICcuL19TdGFjay5qcyc7XG5pbXBvcnQgZXF1YWxBcnJheXMgZnJvbSAnLi9fZXF1YWxBcnJheXMuanMnO1xuaW1wb3J0IGVxdWFsQnlUYWcgZnJvbSAnLi9fZXF1YWxCeVRhZy5qcyc7XG5pbXBvcnQgZXF1YWxPYmplY3RzIGZyb20gJy4vX2VxdWFsT2JqZWN0cy5qcyc7XG5pbXBvcnQgZ2V0VGFnIGZyb20gJy4vX2dldFRhZy5qcyc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuL2lzQXJyYXkuanMnO1xuaW1wb3J0IGlzQnVmZmVyIGZyb20gJy4vaXNCdWZmZXIuanMnO1xuaW1wb3J0IGlzVHlwZWRBcnJheSBmcm9tICcuL2lzVHlwZWRBcnJheS5qcyc7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIHZhbHVlIGNvbXBhcmlzb25zLiAqL1xudmFyIENPTVBBUkVfUEFSVElBTF9GTEFHID0gMTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbGAgZm9yIGFycmF5cyBhbmQgb2JqZWN0cyB3aGljaCBwZXJmb3Jtc1xuICogZGVlcCBjb21wYXJpc29ucyBhbmQgdHJhY2tzIHRyYXZlcnNlZCBvYmplY3RzIGVuYWJsaW5nIG9iamVjdHMgd2l0aCBjaXJjdWxhclxuICogcmVmZXJlbmNlcyB0byBiZSBjb21wYXJlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtudW1iZXJ9IGJpdG1hc2sgVGhlIGJpdG1hc2sgZmxhZ3MuIFNlZSBgYmFzZUlzRXF1YWxgIGZvciBtb3JlIGRldGFpbHMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjdXN0b21pemVyIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIGBvYmplY3RgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzRXF1YWxEZWVwKG9iamVjdCwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spIHtcbiAgdmFyIG9iaklzQXJyID0gaXNBcnJheShvYmplY3QpLFxuICAgICAgb3RoSXNBcnIgPSBpc0FycmF5KG90aGVyKSxcbiAgICAgIG9ialRhZyA9IG9iaklzQXJyID8gYXJyYXlUYWcgOiBnZXRUYWcob2JqZWN0KSxcbiAgICAgIG90aFRhZyA9IG90aElzQXJyID8gYXJyYXlUYWcgOiBnZXRUYWcob3RoZXIpO1xuXG4gIG9ialRhZyA9IG9ialRhZyA9PSBhcmdzVGFnID8gb2JqZWN0VGFnIDogb2JqVGFnO1xuICBvdGhUYWcgPSBvdGhUYWcgPT0gYXJnc1RhZyA/IG9iamVjdFRhZyA6IG90aFRhZztcblxuICB2YXIgb2JqSXNPYmogPSBvYmpUYWcgPT0gb2JqZWN0VGFnLFxuICAgICAgb3RoSXNPYmogPSBvdGhUYWcgPT0gb2JqZWN0VGFnLFxuICAgICAgaXNTYW1lVGFnID0gb2JqVGFnID09IG90aFRhZztcblxuICBpZiAoaXNTYW1lVGFnICYmIGlzQnVmZmVyKG9iamVjdCkpIHtcbiAgICBpZiAoIWlzQnVmZmVyKG90aGVyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBvYmpJc0FyciA9IHRydWU7XG4gICAgb2JqSXNPYmogPSBmYWxzZTtcbiAgfVxuICBpZiAoaXNTYW1lVGFnICYmICFvYmpJc09iaikge1xuICAgIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gICAgcmV0dXJuIChvYmpJc0FyciB8fCBpc1R5cGVkQXJyYXkob2JqZWN0KSlcbiAgICAgID8gZXF1YWxBcnJheXMob2JqZWN0LCBvdGhlciwgYml0bWFzaywgY3VzdG9taXplciwgZXF1YWxGdW5jLCBzdGFjaylcbiAgICAgIDogZXF1YWxCeVRhZyhvYmplY3QsIG90aGVyLCBvYmpUYWcsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spO1xuICB9XG4gIGlmICghKGJpdG1hc2sgJiBDT01QQVJFX1BBUlRJQUxfRkxBRykpIHtcbiAgICB2YXIgb2JqSXNXcmFwcGVkID0gb2JqSXNPYmogJiYgaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsICdfX3dyYXBwZWRfXycpLFxuICAgICAgICBvdGhJc1dyYXBwZWQgPSBvdGhJc09iaiAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG90aGVyLCAnX193cmFwcGVkX18nKTtcblxuICAgIGlmIChvYmpJc1dyYXBwZWQgfHwgb3RoSXNXcmFwcGVkKSB7XG4gICAgICB2YXIgb2JqVW53cmFwcGVkID0gb2JqSXNXcmFwcGVkID8gb2JqZWN0LnZhbHVlKCkgOiBvYmplY3QsXG4gICAgICAgICAgb3RoVW53cmFwcGVkID0gb3RoSXNXcmFwcGVkID8gb3RoZXIudmFsdWUoKSA6IG90aGVyO1xuXG4gICAgICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICAgICAgcmV0dXJuIGVxdWFsRnVuYyhvYmpVbndyYXBwZWQsIG90aFVud3JhcHBlZCwgYml0bWFzaywgY3VzdG9taXplciwgc3RhY2spO1xuICAgIH1cbiAgfVxuICBpZiAoIWlzU2FtZVRhZykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICByZXR1cm4gZXF1YWxPYmplY3RzKG9iamVjdCwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGVxdWFsRnVuYywgc3RhY2spO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlSXNFcXVhbERlZXA7XG4iLCJpbXBvcnQgYmFzZUlzRXF1YWxEZWVwIGZyb20gJy4vX2Jhc2VJc0VxdWFsRGVlcC5qcyc7XG5pbXBvcnQgaXNPYmplY3RMaWtlIGZyb20gJy4vaXNPYmplY3RMaWtlLmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc0VxdWFsYCB3aGljaCBzdXBwb3J0cyBwYXJ0aWFsIGNvbXBhcmlzb25zXG4gKiBhbmQgdHJhY2tzIHRyYXZlcnNlZCBvYmplY3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gYml0bWFzayBUaGUgYml0bWFzayBmbGFncy5cbiAqICAxIC0gVW5vcmRlcmVkIGNvbXBhcmlzb25cbiAqICAyIC0gUGFydGlhbCBjb21wYXJpc29uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgYHZhbHVlYCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzRXF1YWwodmFsdWUsIG90aGVyLCBiaXRtYXNrLCBjdXN0b21pemVyLCBzdGFjaykge1xuICBpZiAodmFsdWUgPT09IG90aGVyKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKHZhbHVlID09IG51bGwgfHwgb3RoZXIgPT0gbnVsbCB8fCAoIWlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgIWlzT2JqZWN0TGlrZShvdGhlcikpKSB7XG4gICAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXI7XG4gIH1cbiAgcmV0dXJuIGJhc2VJc0VxdWFsRGVlcCh2YWx1ZSwgb3RoZXIsIGJpdG1hc2ssIGN1c3RvbWl6ZXIsIGJhc2VJc0VxdWFsLCBzdGFjayk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VJc0VxdWFsO1xuIiwiaW1wb3J0IFN0YWNrIGZyb20gJy4vX1N0YWNrLmpzJztcbmltcG9ydCBiYXNlSXNFcXVhbCBmcm9tICcuL19iYXNlSXNFcXVhbC5qcyc7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgYml0bWFza3MgZm9yIHZhbHVlIGNvbXBhcmlzb25zLiAqL1xudmFyIENPTVBBUkVfUEFSVElBTF9GTEFHID0gMSxcbiAgICBDT01QQVJFX1VOT1JERVJFRF9GTEFHID0gMjtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc01hdGNoYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IG9mIHByb3BlcnR5IHZhbHVlcyB0byBtYXRjaC5cbiAqIEBwYXJhbSB7QXJyYXl9IG1hdGNoRGF0YSBUaGUgcHJvcGVydHkgbmFtZXMsIHZhbHVlcywgYW5kIGNvbXBhcmUgZmxhZ3MgdG8gbWF0Y2guXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgb2JqZWN0YCBpcyBhIG1hdGNoLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc01hdGNoKG9iamVjdCwgc291cmNlLCBtYXRjaERhdGEsIGN1c3RvbWl6ZXIpIHtcbiAgdmFyIGluZGV4ID0gbWF0Y2hEYXRhLmxlbmd0aCxcbiAgICAgIGxlbmd0aCA9IGluZGV4LFxuICAgICAgbm9DdXN0b21pemVyID0gIWN1c3RvbWl6ZXI7XG5cbiAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgcmV0dXJuICFsZW5ndGg7XG4gIH1cbiAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gIHdoaWxlIChpbmRleC0tKSB7XG4gICAgdmFyIGRhdGEgPSBtYXRjaERhdGFbaW5kZXhdO1xuICAgIGlmICgobm9DdXN0b21pemVyICYmIGRhdGFbMl0pXG4gICAgICAgICAgPyBkYXRhWzFdICE9PSBvYmplY3RbZGF0YVswXV1cbiAgICAgICAgICA6ICEoZGF0YVswXSBpbiBvYmplY3QpXG4gICAgICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGRhdGEgPSBtYXRjaERhdGFbaW5kZXhdO1xuICAgIHZhciBrZXkgPSBkYXRhWzBdLFxuICAgICAgICBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICBzcmNWYWx1ZSA9IGRhdGFbMV07XG5cbiAgICBpZiAobm9DdXN0b21pemVyICYmIGRhdGFbMl0pIHtcbiAgICAgIGlmIChvYmpWYWx1ZSA9PT0gdW5kZWZpbmVkICYmICEoa2V5IGluIG9iamVjdCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgc3RhY2sgPSBuZXcgU3RhY2s7XG4gICAgICBpZiAoY3VzdG9taXplcikge1xuICAgICAgICB2YXIgcmVzdWx0ID0gY3VzdG9taXplcihvYmpWYWx1ZSwgc3JjVmFsdWUsIGtleSwgb2JqZWN0LCBzb3VyY2UsIHN0YWNrKTtcbiAgICAgIH1cbiAgICAgIGlmICghKHJlc3VsdCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IGJhc2VJc0VxdWFsKHNyY1ZhbHVlLCBvYmpWYWx1ZSwgQ09NUEFSRV9QQVJUSUFMX0ZMQUcgfCBDT01QQVJFX1VOT1JERVJFRF9GTEFHLCBjdXN0b21pemVyLCBzdGFjaylcbiAgICAgICAgICAgIDogcmVzdWx0XG4gICAgICAgICAgKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlSXNNYXRjaDtcbiIsImltcG9ydCBpc09iamVjdCBmcm9tICcuL2lzT2JqZWN0LmpzJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSBmb3Igc3RyaWN0IGVxdWFsaXR5IGNvbXBhcmlzb25zLCBpLmUuIGA9PT1gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlmIHN1aXRhYmxlIGZvciBzdHJpY3RcbiAqICBlcXVhbGl0eSBjb21wYXJpc29ucywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc1N0cmljdENvbXBhcmFibGUodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09PSB2YWx1ZSAmJiAhaXNPYmplY3QodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc1N0cmljdENvbXBhcmFibGU7XG4iLCJpbXBvcnQgaXNTdHJpY3RDb21wYXJhYmxlIGZyb20gJy4vX2lzU3RyaWN0Q29tcGFyYWJsZS5qcyc7XG5pbXBvcnQga2V5cyBmcm9tICcuL2tleXMuanMnO1xuXG4vKipcbiAqIEdldHMgdGhlIHByb3BlcnR5IG5hbWVzLCB2YWx1ZXMsIGFuZCBjb21wYXJlIGZsYWdzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG1hdGNoIGRhdGEgb2YgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGdldE1hdGNoRGF0YShvYmplY3QpIHtcbiAgdmFyIHJlc3VsdCA9IGtleXMob2JqZWN0KSxcbiAgICAgIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGg7XG5cbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgdmFyIGtleSA9IHJlc3VsdFtsZW5ndGhdLFxuICAgICAgICB2YWx1ZSA9IG9iamVjdFtrZXldO1xuXG4gICAgcmVzdWx0W2xlbmd0aF0gPSBba2V5LCB2YWx1ZSwgaXNTdHJpY3RDb21wYXJhYmxlKHZhbHVlKV07XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0TWF0Y2hEYXRhO1xuIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYG1hdGNoZXNQcm9wZXJ0eWAgZm9yIHNvdXJjZSB2YWx1ZXMgc3VpdGFibGVcbiAqIGZvciBzdHJpY3QgZXF1YWxpdHkgY29tcGFyaXNvbnMsIGkuZS4gYD09PWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHBhcmFtIHsqfSBzcmNWYWx1ZSBUaGUgdmFsdWUgdG8gbWF0Y2guXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBzcGVjIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBtYXRjaGVzU3RyaWN0Q29tcGFyYWJsZShrZXksIHNyY1ZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdFtrZXldID09PSBzcmNWYWx1ZSAmJlxuICAgICAgKHNyY1ZhbHVlICE9PSB1bmRlZmluZWQgfHwgKGtleSBpbiBPYmplY3Qob2JqZWN0KSkpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXRjaGVzU3RyaWN0Q29tcGFyYWJsZTtcbiIsImltcG9ydCBiYXNlSXNNYXRjaCBmcm9tICcuL19iYXNlSXNNYXRjaC5qcyc7XG5pbXBvcnQgZ2V0TWF0Y2hEYXRhIGZyb20gJy4vX2dldE1hdGNoRGF0YS5qcyc7XG5pbXBvcnQgbWF0Y2hlc1N0cmljdENvbXBhcmFibGUgZnJvbSAnLi9fbWF0Y2hlc1N0cmljdENvbXBhcmFibGUuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm1hdGNoZXNgIHdoaWNoIGRvZXNuJ3QgY2xvbmUgYHNvdXJjZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCBvZiBwcm9wZXJ0eSB2YWx1ZXMgdG8gbWF0Y2guXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBzcGVjIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlTWF0Y2hlcyhzb3VyY2UpIHtcbiAgdmFyIG1hdGNoRGF0YSA9IGdldE1hdGNoRGF0YShzb3VyY2UpO1xuICBpZiAobWF0Y2hEYXRhLmxlbmd0aCA9PSAxICYmIG1hdGNoRGF0YVswXVsyXSkge1xuICAgIHJldHVybiBtYXRjaGVzU3RyaWN0Q29tcGFyYWJsZShtYXRjaERhdGFbMF1bMF0sIG1hdGNoRGF0YVswXVsxXSk7XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgPT09IHNvdXJjZSB8fCBiYXNlSXNNYXRjaChvYmplY3QsIHNvdXJjZSwgbWF0Y2hEYXRhKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZU1hdGNoZXM7XG4iLCJpbXBvcnQgYmFzZUdldFRhZyBmcm9tICcuL19iYXNlR2V0VGFnLmpzJztcbmltcG9ydCBpc09iamVjdExpa2UgZnJvbSAnLi9pc09iamVjdExpa2UuanMnO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIGJhc2VHZXRUYWcodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzU3ltYm9sO1xuIiwiaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5LmpzJztcbmltcG9ydCBpc1N5bWJvbCBmcm9tICcuL2lzU3ltYm9sLmpzJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggcHJvcGVydHkgbmFtZXMgd2l0aGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHJlSXNEZWVwUHJvcCA9IC9cXC58XFxbKD86W15bXFxdXSp8KFtcIiddKSg/Oig/IVxcMSlbXlxcXFxdfFxcXFwuKSo/XFwxKVxcXS8sXG4gICAgcmVJc1BsYWluUHJvcCA9IC9eXFx3KiQvO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcHJvcGVydHkgbmFtZSBhbmQgbm90IGEgcHJvcGVydHkgcGF0aC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeSBrZXlzIG9uLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm9wZXJ0eSBuYW1lLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5KHZhbHVlLCBvYmplY3QpIHtcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICBpZiAodHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nIHx8XG4gICAgICB2YWx1ZSA9PSBudWxsIHx8IGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiByZUlzUGxhaW5Qcm9wLnRlc3QodmFsdWUpIHx8ICFyZUlzRGVlcFByb3AudGVzdCh2YWx1ZSkgfHxcbiAgICAob2JqZWN0ICE9IG51bGwgJiYgdmFsdWUgaW4gT2JqZWN0KG9iamVjdCkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc0tleTtcbiIsImltcG9ydCBNYXBDYWNoZSBmcm9tICcuL19NYXBDYWNoZS5qcyc7XG5cbi8qKiBFcnJvciBtZXNzYWdlIGNvbnN0YW50cy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgbWVtb2l6ZXMgdGhlIHJlc3VsdCBvZiBgZnVuY2AuIElmIGByZXNvbHZlcmAgaXNcbiAqIHByb3ZpZGVkLCBpdCBkZXRlcm1pbmVzIHRoZSBjYWNoZSBrZXkgZm9yIHN0b3JpbmcgdGhlIHJlc3VsdCBiYXNlZCBvbiB0aGVcbiAqIGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGUgbWVtb2l6ZWQgZnVuY3Rpb24uIEJ5IGRlZmF1bHQsIHRoZSBmaXJzdCBhcmd1bWVudFxuICogcHJvdmlkZWQgdG8gdGhlIG1lbW9pemVkIGZ1bmN0aW9uIGlzIHVzZWQgYXMgdGhlIG1hcCBjYWNoZSBrZXkuIFRoZSBgZnVuY2BcbiAqIGlzIGludm9rZWQgd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgdGhlIG1lbW9pemVkIGZ1bmN0aW9uLlxuICpcbiAqICoqTm90ZToqKiBUaGUgY2FjaGUgaXMgZXhwb3NlZCBhcyB0aGUgYGNhY2hlYCBwcm9wZXJ0eSBvbiB0aGUgbWVtb2l6ZWRcbiAqIGZ1bmN0aW9uLiBJdHMgY3JlYXRpb24gbWF5IGJlIGN1c3RvbWl6ZWQgYnkgcmVwbGFjaW5nIHRoZSBgXy5tZW1vaXplLkNhY2hlYFxuICogY29uc3RydWN0b3Igd2l0aCBvbmUgd2hvc2UgaW5zdGFuY2VzIGltcGxlbWVudCB0aGVcbiAqIFtgTWFwYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcHJvcGVydGllcy1vZi10aGUtbWFwLXByb3RvdHlwZS1vYmplY3QpXG4gKiBtZXRob2QgaW50ZXJmYWNlIG9mIGBjbGVhcmAsIGBkZWxldGVgLCBgZ2V0YCwgYGhhc2AsIGFuZCBgc2V0YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGhhdmUgaXRzIG91dHB1dCBtZW1vaXplZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtyZXNvbHZlcl0gVGhlIGZ1bmN0aW9uIHRvIHJlc29sdmUgdGhlIGNhY2hlIGtleS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IG1lbW9pemVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEsICdiJzogMiB9O1xuICogdmFyIG90aGVyID0geyAnYyc6IDMsICdkJzogNCB9O1xuICpcbiAqIHZhciB2YWx1ZXMgPSBfLm1lbW9pemUoXy52YWx1ZXMpO1xuICogdmFsdWVzKG9iamVjdCk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiB2YWx1ZXMob3RoZXIpO1xuICogLy8gPT4gWzMsIDRdXG4gKlxuICogb2JqZWN0LmEgPSAyO1xuICogdmFsdWVzKG9iamVjdCk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqXG4gKiAvLyBNb2RpZnkgdGhlIHJlc3VsdCBjYWNoZS5cbiAqIHZhbHVlcy5jYWNoZS5zZXQob2JqZWN0LCBbJ2EnLCAnYiddKTtcbiAqIHZhbHVlcyhvYmplY3QpO1xuICogLy8gPT4gWydhJywgJ2InXVxuICpcbiAqIC8vIFJlcGxhY2UgYF8ubWVtb2l6ZS5DYWNoZWAuXG4gKiBfLm1lbW9pemUuQ2FjaGUgPSBXZWFrTWFwO1xuICovXG5mdW5jdGlvbiBtZW1vaXplKGZ1bmMsIHJlc29sdmVyKSB7XG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nIHx8IChyZXNvbHZlciAhPSBudWxsICYmIHR5cGVvZiByZXNvbHZlciAhPSAnZnVuY3Rpb24nKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICB2YXIgbWVtb2l6ZWQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAga2V5ID0gcmVzb2x2ZXIgPyByZXNvbHZlci5hcHBseSh0aGlzLCBhcmdzKSA6IGFyZ3NbMF0sXG4gICAgICAgIGNhY2hlID0gbWVtb2l6ZWQuY2FjaGU7XG5cbiAgICBpZiAoY2FjaGUuaGFzKGtleSkpIHtcbiAgICAgIHJldHVybiBjYWNoZS5nZXQoa2V5KTtcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG4gICAgbWVtb2l6ZWQuY2FjaGUgPSBjYWNoZS5zZXQoa2V5LCByZXN1bHQpIHx8IGNhY2hlO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIG1lbW9pemVkLmNhY2hlID0gbmV3IChtZW1vaXplLkNhY2hlIHx8IE1hcENhY2hlKTtcbiAgcmV0dXJuIG1lbW9pemVkO1xufVxuXG4vLyBFeHBvc2UgYE1hcENhY2hlYC5cbm1lbW9pemUuQ2FjaGUgPSBNYXBDYWNoZTtcblxuZXhwb3J0IGRlZmF1bHQgbWVtb2l6ZTtcbiIsImltcG9ydCBtZW1vaXplIGZyb20gJy4vbWVtb2l6ZS5qcyc7XG5cbi8qKiBVc2VkIGFzIHRoZSBtYXhpbXVtIG1lbW9pemUgY2FjaGUgc2l6ZS4gKi9cbnZhciBNQVhfTUVNT0laRV9TSVpFID0gNTAwO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5tZW1vaXplYCB3aGljaCBjbGVhcnMgdGhlIG1lbW9pemVkIGZ1bmN0aW9uJ3NcbiAqIGNhY2hlIHdoZW4gaXQgZXhjZWVkcyBgTUFYX01FTU9JWkVfU0laRWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGhhdmUgaXRzIG91dHB1dCBtZW1vaXplZC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IG1lbW9pemVkIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBtZW1vaXplQ2FwcGVkKGZ1bmMpIHtcbiAgdmFyIHJlc3VsdCA9IG1lbW9pemUoZnVuYywgZnVuY3Rpb24oa2V5KSB7XG4gICAgaWYgKGNhY2hlLnNpemUgPT09IE1BWF9NRU1PSVpFX1NJWkUpIHtcbiAgICAgIGNhY2hlLmNsZWFyKCk7XG4gICAgfVxuICAgIHJldHVybiBrZXk7XG4gIH0pO1xuXG4gIHZhciBjYWNoZSA9IHJlc3VsdC5jYWNoZTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbWVtb2l6ZUNhcHBlZDtcbiIsImltcG9ydCBtZW1vaXplQ2FwcGVkIGZyb20gJy4vX21lbW9pemVDYXBwZWQuanMnO1xuXG4vKiogVXNlZCB0byBtYXRjaCBwcm9wZXJ0eSBuYW1lcyB3aXRoaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgcmVQcm9wTmFtZSA9IC9bXi5bXFxdXSt8XFxbKD86KC0/XFxkKyg/OlxcLlxcZCspPyl8KFtcIiddKSgoPzooPyFcXDIpW15cXFxcXXxcXFxcLikqPylcXDIpXFxdfCg/PSg/OlxcLnxcXFtcXF0pKD86XFwufFxcW1xcXXwkKSkvZztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggYmFja3NsYXNoZXMgaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgcmVFc2NhcGVDaGFyID0gL1xcXFwoXFxcXCk/L2c7XG5cbi8qKlxuICogQ29udmVydHMgYHN0cmluZ2AgdG8gYSBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqL1xudmFyIHN0cmluZ1RvUGF0aCA9IG1lbW9pemVDYXBwZWQoZnVuY3Rpb24oc3RyaW5nKSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgaWYgKHN0cmluZy5jaGFyQ29kZUF0KDApID09PSA0NiAvKiAuICovKSB7XG4gICAgcmVzdWx0LnB1c2goJycpO1xuICB9XG4gIHN0cmluZy5yZXBsYWNlKHJlUHJvcE5hbWUsIGZ1bmN0aW9uKG1hdGNoLCBudW1iZXIsIHF1b3RlLCBzdWJTdHJpbmcpIHtcbiAgICByZXN1bHQucHVzaChxdW90ZSA/IHN1YlN0cmluZy5yZXBsYWNlKHJlRXNjYXBlQ2hhciwgJyQxJykgOiAobnVtYmVyIHx8IG1hdGNoKSk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmluZ1RvUGF0aDtcbiIsImltcG9ydCBTeW1ib2wgZnJvbSAnLi9fU3ltYm9sLmpzJztcbmltcG9ydCBhcnJheU1hcCBmcm9tICcuL19hcnJheU1hcC5qcyc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuL2lzQXJyYXkuanMnO1xuaW1wb3J0IGlzU3ltYm9sIGZyb20gJy4vaXNTeW1ib2wuanMnO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBJTkZJTklUWSA9IDEgLyAwO1xuXG4vKiogVXNlZCB0byBjb252ZXJ0IHN5bWJvbHMgdG8gcHJpbWl0aXZlcyBhbmQgc3RyaW5ncy4gKi9cbnZhciBzeW1ib2xQcm90byA9IFN5bWJvbCA/IFN5bWJvbC5wcm90b3R5cGUgOiB1bmRlZmluZWQsXG4gICAgc3ltYm9sVG9TdHJpbmcgPSBzeW1ib2xQcm90byA/IHN5bWJvbFByb3RvLnRvU3RyaW5nIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRvU3RyaW5nYCB3aGljaCBkb2Vzbid0IGNvbnZlcnQgbnVsbGlzaFxuICogdmFsdWVzIHRvIGVtcHR5IHN0cmluZ3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICAvLyBFeGl0IGVhcmx5IGZvciBzdHJpbmdzIHRvIGF2b2lkIGEgcGVyZm9ybWFuY2UgaGl0IGluIHNvbWUgZW52aXJvbm1lbnRzLlxuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbnZlcnQgdmFsdWVzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgcmV0dXJuIGFycmF5TWFwKHZhbHVlLCBiYXNlVG9TdHJpbmcpICsgJyc7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBzeW1ib2xUb1N0cmluZyA/IHN5bWJvbFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIH1cbiAgdmFyIHJlc3VsdCA9ICh2YWx1ZSArICcnKTtcbiAgcmV0dXJuIChyZXN1bHQgPT0gJzAnICYmICgxIC8gdmFsdWUpID09IC1JTkZJTklUWSkgPyAnLTAnIDogcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlVG9TdHJpbmc7XG4iLCJpbXBvcnQgYmFzZVRvU3RyaW5nIGZyb20gJy4vX2Jhc2VUb1N0cmluZy5qcyc7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZy4gQW4gZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkIGZvciBgbnVsbGBcbiAqIGFuZCBgdW5kZWZpbmVkYCB2YWx1ZXMuIFRoZSBzaWduIG9mIGAtMGAgaXMgcHJlc2VydmVkLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b1N0cmluZyhudWxsKTtcbiAqIC8vID0+ICcnXG4gKlxuICogXy50b1N0cmluZygtMCk7XG4gKiAvLyA9PiAnLTAnXG4gKlxuICogXy50b1N0cmluZyhbMSwgMiwgM10pO1xuICogLy8gPT4gJzEsMiwzJ1xuICovXG5mdW5jdGlvbiB0b1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/ICcnIDogYmFzZVRvU3RyaW5nKHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdG9TdHJpbmc7XG4iLCJpbXBvcnQgaXNBcnJheSBmcm9tICcuL2lzQXJyYXkuanMnO1xuaW1wb3J0IGlzS2V5IGZyb20gJy4vX2lzS2V5LmpzJztcbmltcG9ydCBzdHJpbmdUb1BhdGggZnJvbSAnLi9fc3RyaW5nVG9QYXRoLmpzJztcbmltcG9ydCB0b1N0cmluZyBmcm9tICcuL3RvU3RyaW5nLmpzJztcblxuLyoqXG4gKiBDYXN0cyBgdmFsdWVgIHRvIGEgcGF0aCBhcnJheSBpZiBpdCdzIG5vdCBvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeSBrZXlzIG9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBjYXN0IHByb3BlcnR5IHBhdGggYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGNhc3RQYXRoKHZhbHVlLCBvYmplY3QpIHtcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHJldHVybiBpc0tleSh2YWx1ZSwgb2JqZWN0KSA/IFt2YWx1ZV0gOiBzdHJpbmdUb1BhdGgodG9TdHJpbmcodmFsdWUpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2FzdFBhdGg7XG4iLCJpbXBvcnQgaXNTeW1ib2wgZnJvbSAnLi9pc1N5bWJvbC5qcyc7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDA7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZyBrZXkgaWYgaXQncyBub3QgYSBzdHJpbmcgb3Igc3ltYm9sLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBpbnNwZWN0LlxuICogQHJldHVybnMge3N0cmluZ3xzeW1ib2x9IFJldHVybnMgdGhlIGtleS5cbiAqL1xuZnVuY3Rpb24gdG9LZXkodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyB8fCBpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgdmFyIHJlc3VsdCA9ICh2YWx1ZSArICcnKTtcbiAgcmV0dXJuIChyZXN1bHQgPT0gJzAnICYmICgxIC8gdmFsdWUpID09IC1JTkZJTklUWSkgPyAnLTAnIDogcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCB0b0tleTtcbiIsImltcG9ydCBjYXN0UGF0aCBmcm9tICcuL19jYXN0UGF0aC5qcyc7XG5pbXBvcnQgdG9LZXkgZnJvbSAnLi9fdG9LZXkuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmdldGAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWZhdWx0IHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXNvbHZlZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldChvYmplY3QsIHBhdGgpIHtcbiAgcGF0aCA9IGNhc3RQYXRoKHBhdGgsIG9iamVjdCk7XG5cbiAgdmFyIGluZGV4ID0gMCxcbiAgICAgIGxlbmd0aCA9IHBhdGgubGVuZ3RoO1xuXG4gIHdoaWxlIChvYmplY3QgIT0gbnVsbCAmJiBpbmRleCA8IGxlbmd0aCkge1xuICAgIG9iamVjdCA9IG9iamVjdFt0b0tleShwYXRoW2luZGV4KytdKV07XG4gIH1cbiAgcmV0dXJuIChpbmRleCAmJiBpbmRleCA9PSBsZW5ndGgpID8gb2JqZWN0IDogdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlR2V0O1xuIiwiaW1wb3J0IGJhc2VHZXQgZnJvbSAnLi9fYmFzZUdldC5qcyc7XG5cbi8qKlxuICogR2V0cyB0aGUgdmFsdWUgYXQgYHBhdGhgIG9mIGBvYmplY3RgLiBJZiB0aGUgcmVzb2x2ZWQgdmFsdWUgaXNcbiAqIGB1bmRlZmluZWRgLCB0aGUgYGRlZmF1bHRWYWx1ZWAgaXMgcmV0dXJuZWQgaW4gaXRzIHBsYWNlLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy43LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcGFyYW0geyp9IFtkZWZhdWx0VmFsdWVdIFRoZSB2YWx1ZSByZXR1cm5lZCBmb3IgYHVuZGVmaW5lZGAgcmVzb2x2ZWQgdmFsdWVzLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc29sdmVkIHZhbHVlLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IFt7ICdiJzogeyAnYyc6IDMgfSB9XSB9O1xuICpcbiAqIF8uZ2V0KG9iamVjdCwgJ2FbMF0uYi5jJyk7XG4gKiAvLyA9PiAzXG4gKlxuICogXy5nZXQob2JqZWN0LCBbJ2EnLCAnMCcsICdiJywgJ2MnXSk7XG4gKiAvLyA9PiAzXG4gKlxuICogXy5nZXQob2JqZWN0LCAnYS5iLmMnLCAnZGVmYXVsdCcpO1xuICogLy8gPT4gJ2RlZmF1bHQnXG4gKi9cbmZ1bmN0aW9uIGdldChvYmplY3QsIHBhdGgsIGRlZmF1bHRWYWx1ZSkge1xuICB2YXIgcmVzdWx0ID0gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBiYXNlR2V0KG9iamVjdCwgcGF0aCk7XG4gIHJldHVybiByZXN1bHQgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRWYWx1ZSA6IHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZ2V0O1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5oYXNJbmAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBrZXkgVGhlIGtleSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUhhc0luKG9iamVjdCwga2V5KSB7XG4gIHJldHVybiBvYmplY3QgIT0gbnVsbCAmJiBrZXkgaW4gT2JqZWN0KG9iamVjdCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VIYXNJbjtcbiIsImltcG9ydCBjYXN0UGF0aCBmcm9tICcuL19jYXN0UGF0aC5qcyc7XG5pbXBvcnQgaXNBcmd1bWVudHMgZnJvbSAnLi9pc0FyZ3VtZW50cy5qcyc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuL2lzQXJyYXkuanMnO1xuaW1wb3J0IGlzSW5kZXggZnJvbSAnLi9faXNJbmRleC5qcyc7XG5pbXBvcnQgaXNMZW5ndGggZnJvbSAnLi9pc0xlbmd0aC5qcyc7XG5pbXBvcnQgdG9LZXkgZnJvbSAnLi9fdG9LZXkuanMnO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgcGF0aGAgZXhpc3RzIG9uIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCB0byBjaGVjay5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGhhc0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrIHByb3BlcnRpZXMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHBhdGhgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNQYXRoKG9iamVjdCwgcGF0aCwgaGFzRnVuYykge1xuICBwYXRoID0gY2FzdFBhdGgocGF0aCwgb2JqZWN0KTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHBhdGgubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0gZmFsc2U7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gdG9LZXkocGF0aFtpbmRleF0pO1xuICAgIGlmICghKHJlc3VsdCA9IG9iamVjdCAhPSBudWxsICYmIGhhc0Z1bmMob2JqZWN0LCBrZXkpKSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIG9iamVjdCA9IG9iamVjdFtrZXldO1xuICB9XG4gIGlmIChyZXN1bHQgfHwgKytpbmRleCAhPSBsZW5ndGgpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGxlbmd0aCA9IG9iamVjdCA9PSBudWxsID8gMCA6IG9iamVjdC5sZW5ndGg7XG4gIHJldHVybiAhIWxlbmd0aCAmJiBpc0xlbmd0aChsZW5ndGgpICYmIGlzSW5kZXgoa2V5LCBsZW5ndGgpICYmXG4gICAgKGlzQXJyYXkob2JqZWN0KSB8fCBpc0FyZ3VtZW50cyhvYmplY3QpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaGFzUGF0aDtcbiIsImltcG9ydCBiYXNlSGFzSW4gZnJvbSAnLi9fYmFzZUhhc0luLmpzJztcbmltcG9ydCBoYXNQYXRoIGZyb20gJy4vX2hhc1BhdGguanMnO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgcGF0aGAgaXMgYSBkaXJlY3Qgb3IgaW5oZXJpdGVkIHByb3BlcnR5IG9mIGBvYmplY3RgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBwYXRoYCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IF8uY3JlYXRlKHsgJ2EnOiBfLmNyZWF0ZSh7ICdiJzogMiB9KSB9KTtcbiAqXG4gKiBfLmhhc0luKG9iamVjdCwgJ2EnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmhhc0luKG9iamVjdCwgJ2EuYicpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaGFzSW4ob2JqZWN0LCBbJ2EnLCAnYiddKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmhhc0luKG9iamVjdCwgJ2InKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGhhc0luKG9iamVjdCwgcGF0aCkge1xuICByZXR1cm4gb2JqZWN0ICE9IG51bGwgJiYgaGFzUGF0aChvYmplY3QsIHBhdGgsIGJhc2VIYXNJbik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGhhc0luO1xuIiwiaW1wb3J0IGJhc2VJc0VxdWFsIGZyb20gJy4vX2Jhc2VJc0VxdWFsLmpzJztcbmltcG9ydCBnZXQgZnJvbSAnLi9nZXQuanMnO1xuaW1wb3J0IGhhc0luIGZyb20gJy4vaGFzSW4uanMnO1xuaW1wb3J0IGlzS2V5IGZyb20gJy4vX2lzS2V5LmpzJztcbmltcG9ydCBpc1N0cmljdENvbXBhcmFibGUgZnJvbSAnLi9faXNTdHJpY3RDb21wYXJhYmxlLmpzJztcbmltcG9ydCBtYXRjaGVzU3RyaWN0Q29tcGFyYWJsZSBmcm9tICcuL19tYXRjaGVzU3RyaWN0Q29tcGFyYWJsZS5qcyc7XG5pbXBvcnQgdG9LZXkgZnJvbSAnLi9fdG9LZXkuanMnO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciB2YWx1ZSBjb21wYXJpc29ucy4gKi9cbnZhciBDT01QQVJFX1BBUlRJQUxfRkxBRyA9IDEsXG4gICAgQ09NUEFSRV9VTk9SREVSRURfRkxBRyA9IDI7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWF0Y2hlc1Byb3BlcnR5YCB3aGljaCBkb2Vzbid0IGNsb25lIGBzcmNWYWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcGFyYW0geyp9IHNyY1ZhbHVlIFRoZSB2YWx1ZSB0byBtYXRjaC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHNwZWMgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VNYXRjaGVzUHJvcGVydHkocGF0aCwgc3JjVmFsdWUpIHtcbiAgaWYgKGlzS2V5KHBhdGgpICYmIGlzU3RyaWN0Q29tcGFyYWJsZShzcmNWYWx1ZSkpIHtcbiAgICByZXR1cm4gbWF0Y2hlc1N0cmljdENvbXBhcmFibGUodG9LZXkocGF0aCksIHNyY1ZhbHVlKTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIG9ialZhbHVlID0gZ2V0KG9iamVjdCwgcGF0aCk7XG4gICAgcmV0dXJuIChvYmpWYWx1ZSA9PT0gdW5kZWZpbmVkICYmIG9ialZhbHVlID09PSBzcmNWYWx1ZSlcbiAgICAgID8gaGFzSW4ob2JqZWN0LCBwYXRoKVxuICAgICAgOiBiYXNlSXNFcXVhbChzcmNWYWx1ZSwgb2JqVmFsdWUsIENPTVBBUkVfUEFSVElBTF9GTEFHIHwgQ09NUEFSRV9VTk9SREVSRURfRkxBRyk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VNYXRjaGVzUHJvcGVydHk7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnByb3BlcnR5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYWNjZXNzb3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eShrZXkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlUHJvcGVydHk7XG4iLCJpbXBvcnQgYmFzZUdldCBmcm9tICcuL19iYXNlR2V0LmpzJztcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VQcm9wZXJ0eWAgd2hpY2ggc3VwcG9ydHMgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFjY2Vzc29yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUHJvcGVydHlEZWVwKHBhdGgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBiYXNlR2V0KG9iamVjdCwgcGF0aCk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VQcm9wZXJ0eURlZXA7XG4iLCJpbXBvcnQgYmFzZVByb3BlcnR5IGZyb20gJy4vX2Jhc2VQcm9wZXJ0eS5qcyc7XG5pbXBvcnQgYmFzZVByb3BlcnR5RGVlcCBmcm9tICcuL19iYXNlUHJvcGVydHlEZWVwLmpzJztcbmltcG9ydCBpc0tleSBmcm9tICcuL19pc0tleS5qcyc7XG5pbXBvcnQgdG9LZXkgZnJvbSAnLi9fdG9LZXkuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIHZhbHVlIGF0IGBwYXRoYCBvZiBhIGdpdmVuIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuNC4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFjY2Vzc29yIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0cyA9IFtcbiAqICAgeyAnYSc6IHsgJ2InOiAyIH0gfSxcbiAqICAgeyAnYSc6IHsgJ2InOiAxIH0gfVxuICogXTtcbiAqXG4gKiBfLm1hcChvYmplY3RzLCBfLnByb3BlcnR5KCdhLmInKSk7XG4gKiAvLyA9PiBbMiwgMV1cbiAqXG4gKiBfLm1hcChfLnNvcnRCeShvYmplY3RzLCBfLnByb3BlcnR5KFsnYScsICdiJ10pKSwgJ2EuYicpO1xuICogLy8gPT4gWzEsIDJdXG4gKi9cbmZ1bmN0aW9uIHByb3BlcnR5KHBhdGgpIHtcbiAgcmV0dXJuIGlzS2V5KHBhdGgpID8gYmFzZVByb3BlcnR5KHRvS2V5KHBhdGgpKSA6IGJhc2VQcm9wZXJ0eURlZXAocGF0aCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHByb3BlcnR5O1xuIiwiaW1wb3J0IGJhc2VNYXRjaGVzIGZyb20gJy4vX2Jhc2VNYXRjaGVzLmpzJztcbmltcG9ydCBiYXNlTWF0Y2hlc1Byb3BlcnR5IGZyb20gJy4vX2Jhc2VNYXRjaGVzUHJvcGVydHkuanMnO1xuaW1wb3J0IGlkZW50aXR5IGZyb20gJy4vaWRlbnRpdHkuanMnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5LmpzJztcbmltcG9ydCBwcm9wZXJ0eSBmcm9tICcuL3Byb3BlcnR5LmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pdGVyYXRlZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gW3ZhbHVlPV8uaWRlbnRpdHldIFRoZSB2YWx1ZSB0byBjb252ZXJ0IHRvIGFuIGl0ZXJhdGVlLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBpdGVyYXRlZS5cbiAqL1xuZnVuY3Rpb24gYmFzZUl0ZXJhdGVlKHZhbHVlKSB7XG4gIC8vIERvbid0IHN0b3JlIHRoZSBgdHlwZW9mYCByZXN1bHQgaW4gYSB2YXJpYWJsZSB0byBhdm9pZCBhIEpJVCBidWcgaW4gU2FmYXJpIDkuXG4gIC8vIFNlZSBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTU2MDM0IGZvciBtb3JlIGRldGFpbHMuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiBpZGVudGl0eTtcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlID09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGlzQXJyYXkodmFsdWUpXG4gICAgICA/IGJhc2VNYXRjaGVzUHJvcGVydHkodmFsdWVbMF0sIHZhbHVlWzFdKVxuICAgICAgOiBiYXNlTWF0Y2hlcyh2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHByb3BlcnR5KHZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZUl0ZXJhdGVlO1xuIiwiaW1wb3J0IGJhc2VFYWNoIGZyb20gJy4vX2Jhc2VFYWNoLmpzJztcbmltcG9ydCBpc0FycmF5TGlrZSBmcm9tICcuL2lzQXJyYXlMaWtlLmpzJztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tYXBgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IG1hcHBlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYmFzZU1hcChjb2xsZWN0aW9uLCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IGlzQXJyYXlMaWtlKGNvbGxlY3Rpb24pID8gQXJyYXkoY29sbGVjdGlvbi5sZW5ndGgpIDogW107XG5cbiAgYmFzZUVhY2goY29sbGVjdGlvbiwgZnVuY3Rpb24odmFsdWUsIGtleSwgY29sbGVjdGlvbikge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IGl0ZXJhdGVlKHZhbHVlLCBrZXksIGNvbGxlY3Rpb24pO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZU1hcDtcbiIsImltcG9ydCBhcnJheU1hcCBmcm9tICcuL19hcnJheU1hcC5qcyc7XG5pbXBvcnQgYmFzZUl0ZXJhdGVlIGZyb20gJy4vX2Jhc2VJdGVyYXRlZS5qcyc7XG5pbXBvcnQgYmFzZU1hcCBmcm9tICcuL19iYXNlTWFwLmpzJztcbmltcG9ydCBpc0FycmF5IGZyb20gJy4vaXNBcnJheS5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB2YWx1ZXMgYnkgcnVubmluZyBlYWNoIGVsZW1lbnQgaW4gYGNvbGxlY3Rpb25gIHRocnVcbiAqIGBpdGVyYXRlZWAuIFRoZSBpdGVyYXRlZSBpcyBpbnZva2VkIHdpdGggdGhyZWUgYXJndW1lbnRzOlxuICogKHZhbHVlLCBpbmRleHxrZXksIGNvbGxlY3Rpb24pLlxuICpcbiAqIE1hbnkgbG9kYXNoIG1ldGhvZHMgYXJlIGd1YXJkZWQgdG8gd29yayBhcyBpdGVyYXRlZXMgZm9yIG1ldGhvZHMgbGlrZVxuICogYF8uZXZlcnlgLCBgXy5maWx0ZXJgLCBgXy5tYXBgLCBgXy5tYXBWYWx1ZXNgLCBgXy5yZWplY3RgLCBhbmQgYF8uc29tZWAuXG4gKlxuICogVGhlIGd1YXJkZWQgbWV0aG9kcyBhcmU6XG4gKiBgYXJ5YCwgYGNodW5rYCwgYGN1cnJ5YCwgYGN1cnJ5UmlnaHRgLCBgZHJvcGAsIGBkcm9wUmlnaHRgLCBgZXZlcnlgLFxuICogYGZpbGxgLCBgaW52ZXJ0YCwgYHBhcnNlSW50YCwgYHJhbmRvbWAsIGByYW5nZWAsIGByYW5nZVJpZ2h0YCwgYHJlcGVhdGAsXG4gKiBgc2FtcGxlU2l6ZWAsIGBzbGljZWAsIGBzb21lYCwgYHNvcnRCeWAsIGBzcGxpdGAsIGB0YWtlYCwgYHRha2VSaWdodGAsXG4gKiBgdGVtcGxhdGVgLCBgdHJpbWAsIGB0cmltRW5kYCwgYHRyaW1TdGFydGAsIGFuZCBgd29yZHNgXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtpdGVyYXRlZT1fLmlkZW50aXR5XSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgbWFwcGVkIGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBzcXVhcmUobikge1xuICogICByZXR1cm4gbiAqIG47XG4gKiB9XG4gKlxuICogXy5tYXAoWzQsIDhdLCBzcXVhcmUpO1xuICogLy8gPT4gWzE2LCA2NF1cbiAqXG4gKiBfLm1hcCh7ICdhJzogNCwgJ2InOiA4IH0sIHNxdWFyZSk7XG4gKiAvLyA9PiBbMTYsIDY0XSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIHZhciB1c2VycyA9IFtcbiAqICAgeyAndXNlcic6ICdiYXJuZXknIH0sXG4gKiAgIHsgJ3VzZXInOiAnZnJlZCcgfVxuICogXTtcbiAqXG4gKiAvLyBUaGUgYF8ucHJvcGVydHlgIGl0ZXJhdGVlIHNob3J0aGFuZC5cbiAqIF8ubWFwKHVzZXJzLCAndXNlcicpO1xuICogLy8gPT4gWydiYXJuZXknLCAnZnJlZCddXG4gKi9cbmZ1bmN0aW9uIG1hcChjb2xsZWN0aW9uLCBpdGVyYXRlZSkge1xuICB2YXIgZnVuYyA9IGlzQXJyYXkoY29sbGVjdGlvbikgPyBhcnJheU1hcCA6IGJhc2VNYXA7XG4gIHJldHVybiBmdW5jKGNvbGxlY3Rpb24sIGJhc2VJdGVyYXRlZShpdGVyYXRlZSwgMykpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXA7XG4iLCJpbXBvcnQgYmFzZUVhY2ggZnJvbSAnLi9fYmFzZUVhY2guanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZpbHRlcmAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fE9iamVjdH0gY29sbGVjdGlvbiBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGZpbHRlcmVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBiYXNlRmlsdGVyKGNvbGxlY3Rpb24sIHByZWRpY2F0ZSkge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGJhc2VFYWNoKGNvbGxlY3Rpb24sIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgY29sbGVjdGlvbikge1xuICAgIGlmIChwcmVkaWNhdGUodmFsdWUsIGluZGV4LCBjb2xsZWN0aW9uKSkge1xuICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGJhc2VGaWx0ZXI7XG4iLCJpbXBvcnQgYXJyYXlGaWx0ZXIgZnJvbSAnLi9fYXJyYXlGaWx0ZXIuanMnO1xuaW1wb3J0IGJhc2VGaWx0ZXIgZnJvbSAnLi9fYmFzZUZpbHRlci5qcyc7XG5pbXBvcnQgYmFzZUl0ZXJhdGVlIGZyb20gJy4vX2Jhc2VJdGVyYXRlZS5qcyc7XG5pbXBvcnQgaXNBcnJheSBmcm9tICcuL2lzQXJyYXkuanMnO1xuXG4vKipcbiAqIEl0ZXJhdGVzIG92ZXIgZWxlbWVudHMgb2YgYGNvbGxlY3Rpb25gLCByZXR1cm5pbmcgYW4gYXJyYXkgb2YgYWxsIGVsZW1lbnRzXG4gKiBgcHJlZGljYXRlYCByZXR1cm5zIHRydXRoeSBmb3IuIFRoZSBwcmVkaWNhdGUgaXMgaW52b2tlZCB3aXRoIHRocmVlXG4gKiBhcmd1bWVudHM6ICh2YWx1ZSwgaW5kZXh8a2V5LCBjb2xsZWN0aW9uKS5cbiAqXG4gKiAqKk5vdGU6KiogVW5saWtlIGBfLnJlbW92ZWAsIHRoaXMgbWV0aG9kIHJldHVybnMgYSBuZXcgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtwcmVkaWNhdGU9Xy5pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGZpbHRlcmVkIGFycmF5LlxuICogQHNlZSBfLnJlamVjdFxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgdXNlcnMgPSBbXG4gKiAgIHsgJ3VzZXInOiAnYmFybmV5JywgJ2FnZSc6IDM2LCAnYWN0aXZlJzogdHJ1ZSB9LFxuICogICB7ICd1c2VyJzogJ2ZyZWQnLCAgICdhZ2UnOiA0MCwgJ2FjdGl2ZSc6IGZhbHNlIH1cbiAqIF07XG4gKlxuICogXy5maWx0ZXIodXNlcnMsIGZ1bmN0aW9uKG8pIHsgcmV0dXJuICFvLmFjdGl2ZTsgfSk7XG4gKiAvLyA9PiBvYmplY3RzIGZvciBbJ2ZyZWQnXVxuICpcbiAqIC8vIFRoZSBgXy5tYXRjaGVzYCBpdGVyYXRlZSBzaG9ydGhhbmQuXG4gKiBfLmZpbHRlcih1c2VycywgeyAnYWdlJzogMzYsICdhY3RpdmUnOiB0cnVlIH0pO1xuICogLy8gPT4gb2JqZWN0cyBmb3IgWydiYXJuZXknXVxuICpcbiAqIC8vIFRoZSBgXy5tYXRjaGVzUHJvcGVydHlgIGl0ZXJhdGVlIHNob3J0aGFuZC5cbiAqIF8uZmlsdGVyKHVzZXJzLCBbJ2FjdGl2ZScsIGZhbHNlXSk7XG4gKiAvLyA9PiBvYmplY3RzIGZvciBbJ2ZyZWQnXVxuICpcbiAqIC8vIFRoZSBgXy5wcm9wZXJ0eWAgaXRlcmF0ZWUgc2hvcnRoYW5kLlxuICogXy5maWx0ZXIodXNlcnMsICdhY3RpdmUnKTtcbiAqIC8vID0+IG9iamVjdHMgZm9yIFsnYmFybmV5J11cbiAqL1xuZnVuY3Rpb24gZmlsdGVyKGNvbGxlY3Rpb24sIHByZWRpY2F0ZSkge1xuICB2YXIgZnVuYyA9IGlzQXJyYXkoY29sbGVjdGlvbikgPyBhcnJheUZpbHRlciA6IGJhc2VGaWx0ZXI7XG4gIHJldHVybiBmdW5jKGNvbGxlY3Rpb24sIGJhc2VJdGVyYXRlZShwcmVkaWNhdGUsIDMpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZmlsdGVyO1xuIiwiLyoqIEVycm9yIG1lc3NhZ2UgY29uc3RhbnRzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBuZWdhdGVzIHRoZSByZXN1bHQgb2YgdGhlIHByZWRpY2F0ZSBgZnVuY2AuIFRoZVxuICogYGZ1bmNgIHByZWRpY2F0ZSBpcyBpbnZva2VkIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIGFuZCBhcmd1bWVudHMgb2YgdGhlXG4gKiBjcmVhdGVkIGZ1bmN0aW9uLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBwcmVkaWNhdGUgdG8gbmVnYXRlLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgbmVnYXRlZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gaXNFdmVuKG4pIHtcbiAqICAgcmV0dXJuIG4gJSAyID09IDA7XG4gKiB9XG4gKlxuICogXy5maWx0ZXIoWzEsIDIsIDMsIDQsIDUsIDZdLCBfLm5lZ2F0ZShpc0V2ZW4pKTtcbiAqIC8vID0+IFsxLCAzLCA1XVxuICovXG5mdW5jdGlvbiBuZWdhdGUocHJlZGljYXRlKSB7XG4gIGlmICh0eXBlb2YgcHJlZGljYXRlICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMDogcmV0dXJuICFwcmVkaWNhdGUuY2FsbCh0aGlzKTtcbiAgICAgIGNhc2UgMTogcmV0dXJuICFwcmVkaWNhdGUuY2FsbCh0aGlzLCBhcmdzWzBdKTtcbiAgICAgIGNhc2UgMjogcmV0dXJuICFwcmVkaWNhdGUuY2FsbCh0aGlzLCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICAgIGNhc2UgMzogcmV0dXJuICFwcmVkaWNhdGUuY2FsbCh0aGlzLCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICB9XG4gICAgcmV0dXJuICFwcmVkaWNhdGUuYXBwbHkodGhpcywgYXJncyk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5lZ2F0ZTtcbiIsImltcG9ydCBhc3NpZ25WYWx1ZSBmcm9tICcuL19hc3NpZ25WYWx1ZS5qcyc7XG5pbXBvcnQgY2FzdFBhdGggZnJvbSAnLi9fY2FzdFBhdGguanMnO1xuaW1wb3J0IGlzSW5kZXggZnJvbSAnLi9faXNJbmRleC5qcyc7XG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnLi9pc09iamVjdC5qcyc7XG5pbXBvcnQgdG9LZXkgZnJvbSAnLi9fdG9LZXkuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnNldGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgcGF0aCBjcmVhdGlvbi5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VTZXQob2JqZWN0LCBwYXRoLCB2YWx1ZSwgY3VzdG9taXplcikge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG4gIHBhdGggPSBjYXN0UGF0aChwYXRoLCBvYmplY3QpO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcGF0aC5sZW5ndGgsXG4gICAgICBsYXN0SW5kZXggPSBsZW5ndGggLSAxLFxuICAgICAgbmVzdGVkID0gb2JqZWN0O1xuXG4gIHdoaWxlIChuZXN0ZWQgIT0gbnVsbCAmJiArK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHRvS2V5KHBhdGhbaW5kZXhdKSxcbiAgICAgICAgbmV3VmFsdWUgPSB2YWx1ZTtcblxuICAgIGlmIChpbmRleCAhPSBsYXN0SW5kZXgpIHtcbiAgICAgIHZhciBvYmpWYWx1ZSA9IG5lc3RlZFtrZXldO1xuICAgICAgbmV3VmFsdWUgPSBjdXN0b21pemVyID8gY3VzdG9taXplcihvYmpWYWx1ZSwga2V5LCBuZXN0ZWQpIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKG5ld1ZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBpc09iamVjdChvYmpWYWx1ZSlcbiAgICAgICAgICA/IG9ialZhbHVlXG4gICAgICAgICAgOiAoaXNJbmRleChwYXRoW2luZGV4ICsgMV0pID8gW10gOiB7fSk7XG4gICAgICB9XG4gICAgfVxuICAgIGFzc2lnblZhbHVlKG5lc3RlZCwga2V5LCBuZXdWYWx1ZSk7XG4gICAgbmVzdGVkID0gbmVzdGVkW2tleV07XG4gIH1cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZVNldDtcbiIsImltcG9ydCBiYXNlR2V0IGZyb20gJy4vX2Jhc2VHZXQuanMnO1xuaW1wb3J0IGJhc2VTZXQgZnJvbSAnLi9fYmFzZVNldC5qcyc7XG5pbXBvcnQgY2FzdFBhdGggZnJvbSAnLi9fY2FzdFBhdGguanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mICBgXy5waWNrQnlgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nW119IHBhdGhzIFRoZSBwcm9wZXJ0eSBwYXRocyB0byBwaWNrLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZGljYXRlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBwcm9wZXJ0eS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGJhc2VQaWNrQnkob2JqZWN0LCBwYXRocywgcHJlZGljYXRlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcGF0aHMubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0ge307XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgcGF0aCA9IHBhdGhzW2luZGV4XSxcbiAgICAgICAgdmFsdWUgPSBiYXNlR2V0KG9iamVjdCwgcGF0aCk7XG5cbiAgICBpZiAocHJlZGljYXRlKHZhbHVlLCBwYXRoKSkge1xuICAgICAgYmFzZVNldChyZXN1bHQsIGNhc3RQYXRoKHBhdGgsIG9iamVjdCksIHZhbHVlKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZVBpY2tCeTtcbiIsImltcG9ydCBvdmVyQXJnIGZyb20gJy4vX292ZXJBcmcuanMnO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBnZXRQcm90b3R5cGUgPSBvdmVyQXJnKE9iamVjdC5nZXRQcm90b3R5cGVPZiwgT2JqZWN0KTtcblxuZXhwb3J0IGRlZmF1bHQgZ2V0UHJvdG90eXBlO1xuIiwiaW1wb3J0IGFycmF5UHVzaCBmcm9tICcuL19hcnJheVB1c2guanMnO1xuaW1wb3J0IGdldFByb3RvdHlwZSBmcm9tICcuL19nZXRQcm90b3R5cGUuanMnO1xuaW1wb3J0IGdldFN5bWJvbHMgZnJvbSAnLi9fZ2V0U3ltYm9scy5qcyc7XG5pbXBvcnQgc3R1YkFycmF5IGZyb20gJy4vc3R1YkFycmF5LmpzJztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUdldFN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBzeW1ib2xzLlxuICovXG52YXIgZ2V0U3ltYm9sc0luID0gIW5hdGl2ZUdldFN5bWJvbHMgPyBzdHViQXJyYXkgOiBmdW5jdGlvbihvYmplY3QpIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB3aGlsZSAob2JqZWN0KSB7XG4gICAgYXJyYXlQdXNoKHJlc3VsdCwgZ2V0U3ltYm9scyhvYmplY3QpKTtcbiAgICBvYmplY3QgPSBnZXRQcm90b3R5cGUob2JqZWN0KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2V0U3ltYm9sc0luO1xuIiwiaW1wb3J0IGJhc2VHZXRBbGxLZXlzIGZyb20gJy4vX2Jhc2VHZXRBbGxLZXlzLmpzJztcbmltcG9ydCBnZXRTeW1ib2xzSW4gZnJvbSAnLi9fZ2V0U3ltYm9sc0luLmpzJztcbmltcG9ydCBrZXlzSW4gZnJvbSAnLi9rZXlzSW4uanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2Ygb3duIGFuZCBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBhbmRcbiAqIHN5bWJvbHMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMgYW5kIHN5bWJvbHMuXG4gKi9cbmZ1bmN0aW9uIGdldEFsbEtleXNJbihvYmplY3QpIHtcbiAgcmV0dXJuIGJhc2VHZXRBbGxLZXlzKG9iamVjdCwga2V5c0luLCBnZXRTeW1ib2xzSW4pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRBbGxLZXlzSW47XG4iLCJpbXBvcnQgYXJyYXlNYXAgZnJvbSAnLi9fYXJyYXlNYXAuanMnO1xuaW1wb3J0IGJhc2VJdGVyYXRlZSBmcm9tICcuL19iYXNlSXRlcmF0ZWUuanMnO1xuaW1wb3J0IGJhc2VQaWNrQnkgZnJvbSAnLi9fYmFzZVBpY2tCeS5qcyc7XG5pbXBvcnQgZ2V0QWxsS2V5c0luIGZyb20gJy4vX2dldEFsbEtleXNJbi5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBvYmplY3QgY29tcG9zZWQgb2YgdGhlIGBvYmplY3RgIHByb3BlcnRpZXMgYHByZWRpY2F0ZWAgcmV0dXJuc1xuICogdHJ1dGh5IGZvci4gVGhlIHByZWRpY2F0ZSBpcyBpbnZva2VkIHdpdGggdHdvIGFyZ3VtZW50czogKHZhbHVlLCBrZXkpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcHJlZGljYXRlPV8uaWRlbnRpdHldIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBwcm9wZXJ0eS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBvYmplY3QuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSwgJ2InOiAnMicsICdjJzogMyB9O1xuICpcbiAqIF8ucGlja0J5KG9iamVjdCwgXy5pc051bWJlcik7XG4gKiAvLyA9PiB7ICdhJzogMSwgJ2MnOiAzIH1cbiAqL1xuZnVuY3Rpb24gcGlja0J5KG9iamVjdCwgcHJlZGljYXRlKSB7XG4gIGlmIChvYmplY3QgPT0gbnVsbCkge1xuICAgIHJldHVybiB7fTtcbiAgfVxuICB2YXIgcHJvcHMgPSBhcnJheU1hcChnZXRBbGxLZXlzSW4ob2JqZWN0KSwgZnVuY3Rpb24ocHJvcCkge1xuICAgIHJldHVybiBbcHJvcF07XG4gIH0pO1xuICBwcmVkaWNhdGUgPSBiYXNlSXRlcmF0ZWUocHJlZGljYXRlKTtcbiAgcmV0dXJuIGJhc2VQaWNrQnkob2JqZWN0LCBwcm9wcywgZnVuY3Rpb24odmFsdWUsIHBhdGgpIHtcbiAgICByZXR1cm4gcHJlZGljYXRlKHZhbHVlLCBwYXRoWzBdKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBpY2tCeTtcbiIsImltcG9ydCBiYXNlSXRlcmF0ZWUgZnJvbSAnLi9fYmFzZUl0ZXJhdGVlLmpzJztcbmltcG9ydCBuZWdhdGUgZnJvbSAnLi9uZWdhdGUuanMnO1xuaW1wb3J0IHBpY2tCeSBmcm9tICcuL3BpY2tCeS5qcyc7XG5cbi8qKlxuICogVGhlIG9wcG9zaXRlIG9mIGBfLnBpY2tCeWA7IHRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gb2JqZWN0IGNvbXBvc2VkIG9mXG4gKiB0aGUgb3duIGFuZCBpbmhlcml0ZWQgZW51bWVyYWJsZSBzdHJpbmcga2V5ZWQgcHJvcGVydGllcyBvZiBgb2JqZWN0YCB0aGF0XG4gKiBgcHJlZGljYXRlYCBkb2Vzbid0IHJldHVybiB0cnV0aHkgZm9yLiBUaGUgcHJlZGljYXRlIGlzIGludm9rZWQgd2l0aCB0d29cbiAqIGFyZ3VtZW50czogKHZhbHVlLCBrZXkpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbcHJlZGljYXRlPV8uaWRlbnRpdHldIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBwcm9wZXJ0eS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBvYmplY3QuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSwgJ2InOiAnMicsICdjJzogMyB9O1xuICpcbiAqIF8ub21pdEJ5KG9iamVjdCwgXy5pc051bWJlcik7XG4gKiAvLyA9PiB7ICdiJzogJzInIH1cbiAqL1xuZnVuY3Rpb24gb21pdEJ5KG9iamVjdCwgcHJlZGljYXRlKSB7XG4gIHJldHVybiBwaWNrQnkob2JqZWN0LCBuZWdhdGUoYmFzZUl0ZXJhdGVlKHByZWRpY2F0ZSkpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgb21pdEJ5O1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5zbGljZWAgd2l0aG91dCBhbiBpdGVyYXRlZSBjYWxsIGd1YXJkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gc2xpY2UuXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PTBdIFRoZSBzdGFydCBwb3NpdGlvbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbZW5kPWFycmF5Lmxlbmd0aF0gVGhlIGVuZCBwb3NpdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgc2xpY2Ugb2YgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYmFzZVNsaWNlKGFycmF5LCBzdGFydCwgZW5kKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIGlmIChzdGFydCA8IDApIHtcbiAgICBzdGFydCA9IC1zdGFydCA+IGxlbmd0aCA/IDAgOiAobGVuZ3RoICsgc3RhcnQpO1xuICB9XG4gIGVuZCA9IGVuZCA+IGxlbmd0aCA/IGxlbmd0aCA6IGVuZDtcbiAgaWYgKGVuZCA8IDApIHtcbiAgICBlbmQgKz0gbGVuZ3RoO1xuICB9XG4gIGxlbmd0aCA9IHN0YXJ0ID4gZW5kID8gMCA6ICgoZW5kIC0gc3RhcnQpID4+PiAwKTtcbiAgc3RhcnQgPj4+PSAwO1xuXG4gIHZhciByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSBhcnJheVtpbmRleCArIHN0YXJ0XTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlU2xpY2U7XG4iLCJpbXBvcnQgYmFzZVNsaWNlIGZyb20gJy4vX2Jhc2VTbGljZS5qcyc7XG5cbi8qKlxuICogQ2FzdHMgYGFycmF5YCB0byBhIHNsaWNlIGlmIGl0J3MgbmVlZGVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCBUaGUgc3RhcnQgcG9zaXRpb24uXG4gKiBAcGFyYW0ge251bWJlcn0gW2VuZD1hcnJheS5sZW5ndGhdIFRoZSBlbmQgcG9zaXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNhc3Qgc2xpY2UuXG4gKi9cbmZ1bmN0aW9uIGNhc3RTbGljZShhcnJheSwgc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbmd0aCA6IGVuZDtcbiAgcmV0dXJuICghc3RhcnQgJiYgZW5kID49IGxlbmd0aCkgPyBhcnJheSA6IGJhc2VTbGljZShhcnJheSwgc3RhcnQsIGVuZCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNhc3RTbGljZTtcbiIsIi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSBjaGFyYWN0ZXIgY2xhc3Nlcy4gKi9cbnZhciByc0FzdHJhbFJhbmdlID0gJ1xcXFx1ZDgwMC1cXFxcdWRmZmYnLFxuICAgIHJzQ29tYm9NYXJrc1JhbmdlID0gJ1xcXFx1MDMwMC1cXFxcdTAzNmYnLFxuICAgIHJlQ29tYm9IYWxmTWFya3NSYW5nZSA9ICdcXFxcdWZlMjAtXFxcXHVmZTJmJyxcbiAgICByc0NvbWJvU3ltYm9sc1JhbmdlID0gJ1xcXFx1MjBkMC1cXFxcdTIwZmYnLFxuICAgIHJzQ29tYm9SYW5nZSA9IHJzQ29tYm9NYXJrc1JhbmdlICsgcmVDb21ib0hhbGZNYXJrc1JhbmdlICsgcnNDb21ib1N5bWJvbHNSYW5nZSxcbiAgICByc1ZhclJhbmdlID0gJ1xcXFx1ZmUwZVxcXFx1ZmUwZic7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSBjYXB0dXJlIGdyb3Vwcy4gKi9cbnZhciByc1pXSiA9ICdcXFxcdTIwMGQnO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgc3RyaW5ncyB3aXRoIFt6ZXJvLXdpZHRoIGpvaW5lcnMgb3IgY29kZSBwb2ludHMgZnJvbSB0aGUgYXN0cmFsIHBsYW5lc10oaHR0cDovL2Vldi5lZS9ibG9nLzIwMTUvMDkvMTIvZGFyay1jb3JuZXJzLW9mLXVuaWNvZGUvKS4gKi9cbnZhciByZUhhc1VuaWNvZGUgPSBSZWdFeHAoJ1snICsgcnNaV0ogKyByc0FzdHJhbFJhbmdlICArIHJzQ29tYm9SYW5nZSArIHJzVmFyUmFuZ2UgKyAnXScpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgc3RyaW5nYCBjb250YWlucyBVbmljb2RlIHN5bWJvbHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBpbnNwZWN0LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGEgc3ltYm9sIGlzIGZvdW5kLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc1VuaWNvZGUoc3RyaW5nKSB7XG4gIHJldHVybiByZUhhc1VuaWNvZGUudGVzdChzdHJpbmcpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBoYXNVbmljb2RlO1xuIiwiLyoqXG4gKiBDb252ZXJ0cyBhbiBBU0NJSSBgc3RyaW5nYCB0byBhbiBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXNjaWlUb0FycmF5KHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnNwbGl0KCcnKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYXNjaWlUb0FycmF5O1xuIiwiLyoqIFVzZWQgdG8gY29tcG9zZSB1bmljb2RlIGNoYXJhY3RlciBjbGFzc2VzLiAqL1xudmFyIHJzQXN0cmFsUmFuZ2UgPSAnXFxcXHVkODAwLVxcXFx1ZGZmZicsXG4gICAgcnNDb21ib01hcmtzUmFuZ2UgPSAnXFxcXHUwMzAwLVxcXFx1MDM2ZicsXG4gICAgcmVDb21ib0hhbGZNYXJrc1JhbmdlID0gJ1xcXFx1ZmUyMC1cXFxcdWZlMmYnLFxuICAgIHJzQ29tYm9TeW1ib2xzUmFuZ2UgPSAnXFxcXHUyMGQwLVxcXFx1MjBmZicsXG4gICAgcnNDb21ib1JhbmdlID0gcnNDb21ib01hcmtzUmFuZ2UgKyByZUNvbWJvSGFsZk1hcmtzUmFuZ2UgKyByc0NvbWJvU3ltYm9sc1JhbmdlLFxuICAgIHJzVmFyUmFuZ2UgPSAnXFxcXHVmZTBlXFxcXHVmZTBmJztcblxuLyoqIFVzZWQgdG8gY29tcG9zZSB1bmljb2RlIGNhcHR1cmUgZ3JvdXBzLiAqL1xudmFyIHJzQXN0cmFsID0gJ1snICsgcnNBc3RyYWxSYW5nZSArICddJyxcbiAgICByc0NvbWJvID0gJ1snICsgcnNDb21ib1JhbmdlICsgJ10nLFxuICAgIHJzRml0eiA9ICdcXFxcdWQ4M2NbXFxcXHVkZmZiLVxcXFx1ZGZmZl0nLFxuICAgIHJzTW9kaWZpZXIgPSAnKD86JyArIHJzQ29tYm8gKyAnfCcgKyByc0ZpdHogKyAnKScsXG4gICAgcnNOb25Bc3RyYWwgPSAnW14nICsgcnNBc3RyYWxSYW5nZSArICddJyxcbiAgICByc1JlZ2lvbmFsID0gJyg/OlxcXFx1ZDgzY1tcXFxcdWRkZTYtXFxcXHVkZGZmXSl7Mn0nLFxuICAgIHJzU3VyclBhaXIgPSAnW1xcXFx1ZDgwMC1cXFxcdWRiZmZdW1xcXFx1ZGMwMC1cXFxcdWRmZmZdJyxcbiAgICByc1pXSiA9ICdcXFxcdTIwMGQnO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIHVuaWNvZGUgcmVnZXhlcy4gKi9cbnZhciByZU9wdE1vZCA9IHJzTW9kaWZpZXIgKyAnPycsXG4gICAgcnNPcHRWYXIgPSAnWycgKyByc1ZhclJhbmdlICsgJ10/JyxcbiAgICByc09wdEpvaW4gPSAnKD86JyArIHJzWldKICsgJyg/OicgKyBbcnNOb25Bc3RyYWwsIHJzUmVnaW9uYWwsIHJzU3VyclBhaXJdLmpvaW4oJ3wnKSArICcpJyArIHJzT3B0VmFyICsgcmVPcHRNb2QgKyAnKSonLFxuICAgIHJzU2VxID0gcnNPcHRWYXIgKyByZU9wdE1vZCArIHJzT3B0Sm9pbixcbiAgICByc1N5bWJvbCA9ICcoPzonICsgW3JzTm9uQXN0cmFsICsgcnNDb21ibyArICc/JywgcnNDb21ibywgcnNSZWdpb25hbCwgcnNTdXJyUGFpciwgcnNBc3RyYWxdLmpvaW4oJ3wnKSArICcpJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggW3N0cmluZyBzeW1ib2xzXShodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC11bmljb2RlKS4gKi9cbnZhciByZVVuaWNvZGUgPSBSZWdFeHAocnNGaXR6ICsgJyg/PScgKyByc0ZpdHogKyAnKXwnICsgcnNTeW1ib2wgKyByc1NlcSwgJ2cnKTtcblxuLyoqXG4gKiBDb252ZXJ0cyBhIFVuaWNvZGUgYHN0cmluZ2AgdG8gYW4gYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIHVuaWNvZGVUb0FycmF5KHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLm1hdGNoKHJlVW5pY29kZSkgfHwgW107XG59XG5cbmV4cG9ydCBkZWZhdWx0IHVuaWNvZGVUb0FycmF5O1xuIiwiaW1wb3J0IGFzY2lpVG9BcnJheSBmcm9tICcuL19hc2NpaVRvQXJyYXkuanMnO1xuaW1wb3J0IGhhc1VuaWNvZGUgZnJvbSAnLi9faGFzVW5pY29kZS5qcyc7XG5pbXBvcnQgdW5pY29kZVRvQXJyYXkgZnJvbSAnLi9fdW5pY29kZVRvQXJyYXkuanMnO1xuXG4vKipcbiAqIENvbnZlcnRzIGBzdHJpbmdgIHRvIGFuIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgY29udmVydGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBzdHJpbmdUb0FycmF5KHN0cmluZykge1xuICByZXR1cm4gaGFzVW5pY29kZShzdHJpbmcpXG4gICAgPyB1bmljb2RlVG9BcnJheShzdHJpbmcpXG4gICAgOiBhc2NpaVRvQXJyYXkoc3RyaW5nKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgc3RyaW5nVG9BcnJheTtcbiIsImltcG9ydCBjYXN0U2xpY2UgZnJvbSAnLi9fY2FzdFNsaWNlLmpzJztcbmltcG9ydCBoYXNVbmljb2RlIGZyb20gJy4vX2hhc1VuaWNvZGUuanMnO1xuaW1wb3J0IHN0cmluZ1RvQXJyYXkgZnJvbSAnLi9fc3RyaW5nVG9BcnJheS5qcyc7XG5pbXBvcnQgdG9TdHJpbmcgZnJvbSAnLi90b1N0cmluZy5qcyc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIGxpa2UgYF8ubG93ZXJGaXJzdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2ROYW1lIFRoZSBuYW1lIG9mIHRoZSBgU3RyaW5nYCBjYXNlIG1ldGhvZCB0byB1c2UuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjYXNlIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVDYXNlRmlyc3QobWV0aG9kTmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgc3RyaW5nID0gdG9TdHJpbmcoc3RyaW5nKTtcblxuICAgIHZhciBzdHJTeW1ib2xzID0gaGFzVW5pY29kZShzdHJpbmcpXG4gICAgICA/IHN0cmluZ1RvQXJyYXkoc3RyaW5nKVxuICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICB2YXIgY2hyID0gc3RyU3ltYm9sc1xuICAgICAgPyBzdHJTeW1ib2xzWzBdXG4gICAgICA6IHN0cmluZy5jaGFyQXQoMCk7XG5cbiAgICB2YXIgdHJhaWxpbmcgPSBzdHJTeW1ib2xzXG4gICAgICA/IGNhc3RTbGljZShzdHJTeW1ib2xzLCAxKS5qb2luKCcnKVxuICAgICAgOiBzdHJpbmcuc2xpY2UoMSk7XG5cbiAgICByZXR1cm4gY2hyW21ldGhvZE5hbWVdKCkgKyB0cmFpbGluZztcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ2FzZUZpcnN0O1xuIiwiaW1wb3J0IGNyZWF0ZUNhc2VGaXJzdCBmcm9tICcuL19jcmVhdGVDYXNlRmlyc3QuanMnO1xuXG4vKipcbiAqIENvbnZlcnRzIHRoZSBmaXJzdCBjaGFyYWN0ZXIgb2YgYHN0cmluZ2AgdG8gdXBwZXIgY2FzZS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy51cHBlckZpcnN0KCdmcmVkJyk7XG4gKiAvLyA9PiAnRnJlZCdcbiAqXG4gKiBfLnVwcGVyRmlyc3QoJ0ZSRUQnKTtcbiAqIC8vID0+ICdGUkVEJ1xuICovXG52YXIgdXBwZXJGaXJzdCA9IGNyZWF0ZUNhc2VGaXJzdCgndG9VcHBlckNhc2UnKTtcblxuZXhwb3J0IGRlZmF1bHQgdXBwZXJGaXJzdDtcbiIsImltcG9ydCB0b1N0cmluZyBmcm9tICcuL3RvU3RyaW5nLmpzJztcbmltcG9ydCB1cHBlckZpcnN0IGZyb20gJy4vdXBwZXJGaXJzdC5qcyc7XG5cbi8qKlxuICogQ29udmVydHMgdGhlIGZpcnN0IGNoYXJhY3RlciBvZiBgc3RyaW5nYCB0byB1cHBlciBjYXNlIGFuZCB0aGUgcmVtYWluaW5nXG4gKiB0byBsb3dlciBjYXNlLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGNhcGl0YWxpemUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjYXBpdGFsaXplZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uY2FwaXRhbGl6ZSgnRlJFRCcpO1xuICogLy8gPT4gJ0ZyZWQnXG4gKi9cbmZ1bmN0aW9uIGNhcGl0YWxpemUoc3RyaW5nKSB7XG4gIHJldHVybiB1cHBlckZpcnN0KHRvU3RyaW5nKHN0cmluZykudG9Mb3dlckNhc2UoKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNhcGl0YWxpemU7XG4iLCIvKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5yZWR1Y2VgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvclxuICogaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW2FjY3VtdWxhdG9yXSBUaGUgaW5pdGlhbCB2YWx1ZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2luaXRBY2N1bV0gU3BlY2lmeSB1c2luZyB0aGUgZmlyc3QgZWxlbWVudCBvZiBgYXJyYXlgIGFzXG4gKiAgdGhlIGluaXRpYWwgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgYWNjdW11bGF0ZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGFycmF5UmVkdWNlKGFycmF5LCBpdGVyYXRlZSwgYWNjdW11bGF0b3IsIGluaXRBY2N1bSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID09IG51bGwgPyAwIDogYXJyYXkubGVuZ3RoO1xuXG4gIGlmIChpbml0QWNjdW0gJiYgbGVuZ3RoKSB7XG4gICAgYWNjdW11bGF0b3IgPSBhcnJheVsrK2luZGV4XTtcbiAgfVxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFjY3VtdWxhdG9yID0gaXRlcmF0ZWUoYWNjdW11bGF0b3IsIGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KTtcbiAgfVxuICByZXR1cm4gYWNjdW11bGF0b3I7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFycmF5UmVkdWNlO1xuIiwiLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5wcm9wZXJ0eU9mYCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFjY2Vzc29yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUHJvcGVydHlPZihvYmplY3QpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBiYXNlUHJvcGVydHlPZjtcbiIsImltcG9ydCBiYXNlUHJvcGVydHlPZiBmcm9tICcuL19iYXNlUHJvcGVydHlPZi5qcyc7XG5cbi8qKiBVc2VkIHRvIG1hcCBMYXRpbiBVbmljb2RlIGxldHRlcnMgdG8gYmFzaWMgTGF0aW4gbGV0dGVycy4gKi9cbnZhciBkZWJ1cnJlZExldHRlcnMgPSB7XG4gIC8vIExhdGluLTEgU3VwcGxlbWVudCBibG9jay5cbiAgJ1xceGMwJzogJ0EnLCAgJ1xceGMxJzogJ0EnLCAnXFx4YzInOiAnQScsICdcXHhjMyc6ICdBJywgJ1xceGM0JzogJ0EnLCAnXFx4YzUnOiAnQScsXG4gICdcXHhlMCc6ICdhJywgICdcXHhlMSc6ICdhJywgJ1xceGUyJzogJ2EnLCAnXFx4ZTMnOiAnYScsICdcXHhlNCc6ICdhJywgJ1xceGU1JzogJ2EnLFxuICAnXFx4YzcnOiAnQycsICAnXFx4ZTcnOiAnYycsXG4gICdcXHhkMCc6ICdEJywgICdcXHhmMCc6ICdkJyxcbiAgJ1xceGM4JzogJ0UnLCAgJ1xceGM5JzogJ0UnLCAnXFx4Y2EnOiAnRScsICdcXHhjYic6ICdFJyxcbiAgJ1xceGU4JzogJ2UnLCAgJ1xceGU5JzogJ2UnLCAnXFx4ZWEnOiAnZScsICdcXHhlYic6ICdlJyxcbiAgJ1xceGNjJzogJ0knLCAgJ1xceGNkJzogJ0knLCAnXFx4Y2UnOiAnSScsICdcXHhjZic6ICdJJyxcbiAgJ1xceGVjJzogJ2knLCAgJ1xceGVkJzogJ2knLCAnXFx4ZWUnOiAnaScsICdcXHhlZic6ICdpJyxcbiAgJ1xceGQxJzogJ04nLCAgJ1xceGYxJzogJ24nLFxuICAnXFx4ZDInOiAnTycsICAnXFx4ZDMnOiAnTycsICdcXHhkNCc6ICdPJywgJ1xceGQ1JzogJ08nLCAnXFx4ZDYnOiAnTycsICdcXHhkOCc6ICdPJyxcbiAgJ1xceGYyJzogJ28nLCAgJ1xceGYzJzogJ28nLCAnXFx4ZjQnOiAnbycsICdcXHhmNSc6ICdvJywgJ1xceGY2JzogJ28nLCAnXFx4ZjgnOiAnbycsXG4gICdcXHhkOSc6ICdVJywgICdcXHhkYSc6ICdVJywgJ1xceGRiJzogJ1UnLCAnXFx4ZGMnOiAnVScsXG4gICdcXHhmOSc6ICd1JywgICdcXHhmYSc6ICd1JywgJ1xceGZiJzogJ3UnLCAnXFx4ZmMnOiAndScsXG4gICdcXHhkZCc6ICdZJywgICdcXHhmZCc6ICd5JywgJ1xceGZmJzogJ3knLFxuICAnXFx4YzYnOiAnQWUnLCAnXFx4ZTYnOiAnYWUnLFxuICAnXFx4ZGUnOiAnVGgnLCAnXFx4ZmUnOiAndGgnLFxuICAnXFx4ZGYnOiAnc3MnLFxuICAvLyBMYXRpbiBFeHRlbmRlZC1BIGJsb2NrLlxuICAnXFx1MDEwMCc6ICdBJywgICdcXHUwMTAyJzogJ0EnLCAnXFx1MDEwNCc6ICdBJyxcbiAgJ1xcdTAxMDEnOiAnYScsICAnXFx1MDEwMyc6ICdhJywgJ1xcdTAxMDUnOiAnYScsXG4gICdcXHUwMTA2JzogJ0MnLCAgJ1xcdTAxMDgnOiAnQycsICdcXHUwMTBhJzogJ0MnLCAnXFx1MDEwYyc6ICdDJyxcbiAgJ1xcdTAxMDcnOiAnYycsICAnXFx1MDEwOSc6ICdjJywgJ1xcdTAxMGInOiAnYycsICdcXHUwMTBkJzogJ2MnLFxuICAnXFx1MDEwZSc6ICdEJywgICdcXHUwMTEwJzogJ0QnLCAnXFx1MDEwZic6ICdkJywgJ1xcdTAxMTEnOiAnZCcsXG4gICdcXHUwMTEyJzogJ0UnLCAgJ1xcdTAxMTQnOiAnRScsICdcXHUwMTE2JzogJ0UnLCAnXFx1MDExOCc6ICdFJywgJ1xcdTAxMWEnOiAnRScsXG4gICdcXHUwMTEzJzogJ2UnLCAgJ1xcdTAxMTUnOiAnZScsICdcXHUwMTE3JzogJ2UnLCAnXFx1MDExOSc6ICdlJywgJ1xcdTAxMWInOiAnZScsXG4gICdcXHUwMTFjJzogJ0cnLCAgJ1xcdTAxMWUnOiAnRycsICdcXHUwMTIwJzogJ0cnLCAnXFx1MDEyMic6ICdHJyxcbiAgJ1xcdTAxMWQnOiAnZycsICAnXFx1MDExZic6ICdnJywgJ1xcdTAxMjEnOiAnZycsICdcXHUwMTIzJzogJ2cnLFxuICAnXFx1MDEyNCc6ICdIJywgICdcXHUwMTI2JzogJ0gnLCAnXFx1MDEyNSc6ICdoJywgJ1xcdTAxMjcnOiAnaCcsXG4gICdcXHUwMTI4JzogJ0knLCAgJ1xcdTAxMmEnOiAnSScsICdcXHUwMTJjJzogJ0knLCAnXFx1MDEyZSc6ICdJJywgJ1xcdTAxMzAnOiAnSScsXG4gICdcXHUwMTI5JzogJ2knLCAgJ1xcdTAxMmInOiAnaScsICdcXHUwMTJkJzogJ2knLCAnXFx1MDEyZic6ICdpJywgJ1xcdTAxMzEnOiAnaScsXG4gICdcXHUwMTM0JzogJ0onLCAgJ1xcdTAxMzUnOiAnaicsXG4gICdcXHUwMTM2JzogJ0snLCAgJ1xcdTAxMzcnOiAnaycsICdcXHUwMTM4JzogJ2snLFxuICAnXFx1MDEzOSc6ICdMJywgICdcXHUwMTNiJzogJ0wnLCAnXFx1MDEzZCc6ICdMJywgJ1xcdTAxM2YnOiAnTCcsICdcXHUwMTQxJzogJ0wnLFxuICAnXFx1MDEzYSc6ICdsJywgICdcXHUwMTNjJzogJ2wnLCAnXFx1MDEzZSc6ICdsJywgJ1xcdTAxNDAnOiAnbCcsICdcXHUwMTQyJzogJ2wnLFxuICAnXFx1MDE0Myc6ICdOJywgICdcXHUwMTQ1JzogJ04nLCAnXFx1MDE0Nyc6ICdOJywgJ1xcdTAxNGEnOiAnTicsXG4gICdcXHUwMTQ0JzogJ24nLCAgJ1xcdTAxNDYnOiAnbicsICdcXHUwMTQ4JzogJ24nLCAnXFx1MDE0Yic6ICduJyxcbiAgJ1xcdTAxNGMnOiAnTycsICAnXFx1MDE0ZSc6ICdPJywgJ1xcdTAxNTAnOiAnTycsXG4gICdcXHUwMTRkJzogJ28nLCAgJ1xcdTAxNGYnOiAnbycsICdcXHUwMTUxJzogJ28nLFxuICAnXFx1MDE1NCc6ICdSJywgICdcXHUwMTU2JzogJ1InLCAnXFx1MDE1OCc6ICdSJyxcbiAgJ1xcdTAxNTUnOiAncicsICAnXFx1MDE1Nyc6ICdyJywgJ1xcdTAxNTknOiAncicsXG4gICdcXHUwMTVhJzogJ1MnLCAgJ1xcdTAxNWMnOiAnUycsICdcXHUwMTVlJzogJ1MnLCAnXFx1MDE2MCc6ICdTJyxcbiAgJ1xcdTAxNWInOiAncycsICAnXFx1MDE1ZCc6ICdzJywgJ1xcdTAxNWYnOiAncycsICdcXHUwMTYxJzogJ3MnLFxuICAnXFx1MDE2Mic6ICdUJywgICdcXHUwMTY0JzogJ1QnLCAnXFx1MDE2Nic6ICdUJyxcbiAgJ1xcdTAxNjMnOiAndCcsICAnXFx1MDE2NSc6ICd0JywgJ1xcdTAxNjcnOiAndCcsXG4gICdcXHUwMTY4JzogJ1UnLCAgJ1xcdTAxNmEnOiAnVScsICdcXHUwMTZjJzogJ1UnLCAnXFx1MDE2ZSc6ICdVJywgJ1xcdTAxNzAnOiAnVScsICdcXHUwMTcyJzogJ1UnLFxuICAnXFx1MDE2OSc6ICd1JywgICdcXHUwMTZiJzogJ3UnLCAnXFx1MDE2ZCc6ICd1JywgJ1xcdTAxNmYnOiAndScsICdcXHUwMTcxJzogJ3UnLCAnXFx1MDE3Myc6ICd1JyxcbiAgJ1xcdTAxNzQnOiAnVycsICAnXFx1MDE3NSc6ICd3JyxcbiAgJ1xcdTAxNzYnOiAnWScsICAnXFx1MDE3Nyc6ICd5JywgJ1xcdTAxNzgnOiAnWScsXG4gICdcXHUwMTc5JzogJ1onLCAgJ1xcdTAxN2InOiAnWicsICdcXHUwMTdkJzogJ1onLFxuICAnXFx1MDE3YSc6ICd6JywgICdcXHUwMTdjJzogJ3onLCAnXFx1MDE3ZSc6ICd6JyxcbiAgJ1xcdTAxMzInOiAnSUonLCAnXFx1MDEzMyc6ICdpaicsXG4gICdcXHUwMTUyJzogJ09lJywgJ1xcdTAxNTMnOiAnb2UnLFxuICAnXFx1MDE0OSc6IFwiJ25cIiwgJ1xcdTAxN2YnOiAncydcbn07XG5cbi8qKlxuICogVXNlZCBieSBgXy5kZWJ1cnJgIHRvIGNvbnZlcnQgTGF0aW4tMSBTdXBwbGVtZW50IGFuZCBMYXRpbiBFeHRlbmRlZC1BXG4gKiBsZXR0ZXJzIHRvIGJhc2ljIExhdGluIGxldHRlcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBsZXR0ZXIgVGhlIG1hdGNoZWQgbGV0dGVyIHRvIGRlYnVyci5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGRlYnVycmVkIGxldHRlci5cbiAqL1xudmFyIGRlYnVyckxldHRlciA9IGJhc2VQcm9wZXJ0eU9mKGRlYnVycmVkTGV0dGVycyk7XG5cbmV4cG9ydCBkZWZhdWx0IGRlYnVyckxldHRlcjtcbiIsImltcG9ydCBkZWJ1cnJMZXR0ZXIgZnJvbSAnLi9fZGVidXJyTGV0dGVyLmpzJztcbmltcG9ydCB0b1N0cmluZyBmcm9tICcuL3RvU3RyaW5nLmpzJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggTGF0aW4gVW5pY29kZSBsZXR0ZXJzIChleGNsdWRpbmcgbWF0aGVtYXRpY2FsIG9wZXJhdG9ycykuICovXG52YXIgcmVMYXRpbiA9IC9bXFx4YzAtXFx4ZDZcXHhkOC1cXHhmNlxceGY4LVxceGZmXFx1MDEwMC1cXHUwMTdmXS9nO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIHVuaWNvZGUgY2hhcmFjdGVyIGNsYXNzZXMuICovXG52YXIgcnNDb21ib01hcmtzUmFuZ2UgPSAnXFxcXHUwMzAwLVxcXFx1MDM2ZicsXG4gICAgcmVDb21ib0hhbGZNYXJrc1JhbmdlID0gJ1xcXFx1ZmUyMC1cXFxcdWZlMmYnLFxuICAgIHJzQ29tYm9TeW1ib2xzUmFuZ2UgPSAnXFxcXHUyMGQwLVxcXFx1MjBmZicsXG4gICAgcnNDb21ib1JhbmdlID0gcnNDb21ib01hcmtzUmFuZ2UgKyByZUNvbWJvSGFsZk1hcmtzUmFuZ2UgKyByc0NvbWJvU3ltYm9sc1JhbmdlO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIHVuaWNvZGUgY2FwdHVyZSBncm91cHMuICovXG52YXIgcnNDb21ibyA9ICdbJyArIHJzQ29tYm9SYW5nZSArICddJztcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIFtjb21iaW5pbmcgZGlhY3JpdGljYWwgbWFya3NdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0NvbWJpbmluZ19EaWFjcml0aWNhbF9NYXJrcykgYW5kXG4gKiBbY29tYmluaW5nIGRpYWNyaXRpY2FsIG1hcmtzIGZvciBzeW1ib2xzXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9Db21iaW5pbmdfRGlhY3JpdGljYWxfTWFya3NfZm9yX1N5bWJvbHMpLlxuICovXG52YXIgcmVDb21ib01hcmsgPSBSZWdFeHAocnNDb21ibywgJ2cnKTtcblxuLyoqXG4gKiBEZWJ1cnJzIGBzdHJpbmdgIGJ5IGNvbnZlcnRpbmdcbiAqIFtMYXRpbi0xIFN1cHBsZW1lbnRdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xhdGluLTFfU3VwcGxlbWVudF8oVW5pY29kZV9ibG9jaykjQ2hhcmFjdGVyX3RhYmxlKVxuICogYW5kIFtMYXRpbiBFeHRlbmRlZC1BXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MYXRpbl9FeHRlbmRlZC1BKVxuICogbGV0dGVycyB0byBiYXNpYyBMYXRpbiBsZXR0ZXJzIGFuZCByZW1vdmluZ1xuICogW2NvbWJpbmluZyBkaWFjcml0aWNhbCBtYXJrc10oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQ29tYmluaW5nX0RpYWNyaXRpY2FsX01hcmtzKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBkZWJ1cnIuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBkZWJ1cnJlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZGVidXJyKCdkw6lqw6AgdnUnKTtcbiAqIC8vID0+ICdkZWphIHZ1J1xuICovXG5mdW5jdGlvbiBkZWJ1cnIoc3RyaW5nKSB7XG4gIHN0cmluZyA9IHRvU3RyaW5nKHN0cmluZyk7XG4gIHJldHVybiBzdHJpbmcgJiYgc3RyaW5nLnJlcGxhY2UocmVMYXRpbiwgZGVidXJyTGV0dGVyKS5yZXBsYWNlKHJlQ29tYm9NYXJrLCAnJyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRlYnVycjtcbiIsIi8qKiBVc2VkIHRvIG1hdGNoIHdvcmRzIGNvbXBvc2VkIG9mIGFscGhhbnVtZXJpYyBjaGFyYWN0ZXJzLiAqL1xudmFyIHJlQXNjaWlXb3JkID0gL1teXFx4MDAtXFx4MmZcXHgzYS1cXHg0MFxceDViLVxceDYwXFx4N2ItXFx4N2ZdKy9nO1xuXG4vKipcbiAqIFNwbGl0cyBhbiBBU0NJSSBgc3RyaW5nYCBpbnRvIGFuIGFycmF5IG9mIGl0cyB3b3Jkcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IFRoZSBzdHJpbmcgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgd29yZHMgb2YgYHN0cmluZ2AuXG4gKi9cbmZ1bmN0aW9uIGFzY2lpV29yZHMoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcubWF0Y2gocmVBc2NpaVdvcmQpIHx8IFtdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBhc2NpaVdvcmRzO1xuIiwiLyoqIFVzZWQgdG8gZGV0ZWN0IHN0cmluZ3MgdGhhdCBuZWVkIGEgbW9yZSByb2J1c3QgcmVnZXhwIHRvIG1hdGNoIHdvcmRzLiAqL1xudmFyIHJlSGFzVW5pY29kZVdvcmQgPSAvW2Etel1bQS1aXXxbQS1aXXsyLH1bYS16XXxbMC05XVthLXpBLVpdfFthLXpBLVpdWzAtOV18W15hLXpBLVowLTkgXS87XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBzdHJpbmdgIGNvbnRhaW5zIGEgd29yZCBjb21wb3NlZCBvZiBVbmljb2RlIHN5bWJvbHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBpbnNwZWN0LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGEgd29yZCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNVbmljb2RlV29yZChzdHJpbmcpIHtcbiAgcmV0dXJuIHJlSGFzVW5pY29kZVdvcmQudGVzdChzdHJpbmcpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBoYXNVbmljb2RlV29yZDtcbiIsIi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSBjaGFyYWN0ZXIgY2xhc3Nlcy4gKi9cbnZhciByc0FzdHJhbFJhbmdlID0gJ1xcXFx1ZDgwMC1cXFxcdWRmZmYnLFxuICAgIHJzQ29tYm9NYXJrc1JhbmdlID0gJ1xcXFx1MDMwMC1cXFxcdTAzNmYnLFxuICAgIHJlQ29tYm9IYWxmTWFya3NSYW5nZSA9ICdcXFxcdWZlMjAtXFxcXHVmZTJmJyxcbiAgICByc0NvbWJvU3ltYm9sc1JhbmdlID0gJ1xcXFx1MjBkMC1cXFxcdTIwZmYnLFxuICAgIHJzQ29tYm9SYW5nZSA9IHJzQ29tYm9NYXJrc1JhbmdlICsgcmVDb21ib0hhbGZNYXJrc1JhbmdlICsgcnNDb21ib1N5bWJvbHNSYW5nZSxcbiAgICByc0RpbmdiYXRSYW5nZSA9ICdcXFxcdTI3MDAtXFxcXHUyN2JmJyxcbiAgICByc0xvd2VyUmFuZ2UgPSAnYS16XFxcXHhkZi1cXFxceGY2XFxcXHhmOC1cXFxceGZmJyxcbiAgICByc01hdGhPcFJhbmdlID0gJ1xcXFx4YWNcXFxceGIxXFxcXHhkN1xcXFx4ZjcnLFxuICAgIHJzTm9uQ2hhclJhbmdlID0gJ1xcXFx4MDAtXFxcXHgyZlxcXFx4M2EtXFxcXHg0MFxcXFx4NWItXFxcXHg2MFxcXFx4N2ItXFxcXHhiZicsXG4gICAgcnNQdW5jdHVhdGlvblJhbmdlID0gJ1xcXFx1MjAwMC1cXFxcdTIwNmYnLFxuICAgIHJzU3BhY2VSYW5nZSA9ICcgXFxcXHRcXFxceDBiXFxcXGZcXFxceGEwXFxcXHVmZWZmXFxcXG5cXFxcclxcXFx1MjAyOFxcXFx1MjAyOVxcXFx1MTY4MFxcXFx1MTgwZVxcXFx1MjAwMFxcXFx1MjAwMVxcXFx1MjAwMlxcXFx1MjAwM1xcXFx1MjAwNFxcXFx1MjAwNVxcXFx1MjAwNlxcXFx1MjAwN1xcXFx1MjAwOFxcXFx1MjAwOVxcXFx1MjAwYVxcXFx1MjAyZlxcXFx1MjA1ZlxcXFx1MzAwMCcsXG4gICAgcnNVcHBlclJhbmdlID0gJ0EtWlxcXFx4YzAtXFxcXHhkNlxcXFx4ZDgtXFxcXHhkZScsXG4gICAgcnNWYXJSYW5nZSA9ICdcXFxcdWZlMGVcXFxcdWZlMGYnLFxuICAgIHJzQnJlYWtSYW5nZSA9IHJzTWF0aE9wUmFuZ2UgKyByc05vbkNoYXJSYW5nZSArIHJzUHVuY3R1YXRpb25SYW5nZSArIHJzU3BhY2VSYW5nZTtcblxuLyoqIFVzZWQgdG8gY29tcG9zZSB1bmljb2RlIGNhcHR1cmUgZ3JvdXBzLiAqL1xudmFyIHJzQXBvcyA9IFwiWydcXHUyMDE5XVwiLFxuICAgIHJzQnJlYWsgPSAnWycgKyByc0JyZWFrUmFuZ2UgKyAnXScsXG4gICAgcnNDb21ibyA9ICdbJyArIHJzQ29tYm9SYW5nZSArICddJyxcbiAgICByc0RpZ2l0cyA9ICdcXFxcZCsnLFxuICAgIHJzRGluZ2JhdCA9ICdbJyArIHJzRGluZ2JhdFJhbmdlICsgJ10nLFxuICAgIHJzTG93ZXIgPSAnWycgKyByc0xvd2VyUmFuZ2UgKyAnXScsXG4gICAgcnNNaXNjID0gJ1teJyArIHJzQXN0cmFsUmFuZ2UgKyByc0JyZWFrUmFuZ2UgKyByc0RpZ2l0cyArIHJzRGluZ2JhdFJhbmdlICsgcnNMb3dlclJhbmdlICsgcnNVcHBlclJhbmdlICsgJ10nLFxuICAgIHJzRml0eiA9ICdcXFxcdWQ4M2NbXFxcXHVkZmZiLVxcXFx1ZGZmZl0nLFxuICAgIHJzTW9kaWZpZXIgPSAnKD86JyArIHJzQ29tYm8gKyAnfCcgKyByc0ZpdHogKyAnKScsXG4gICAgcnNOb25Bc3RyYWwgPSAnW14nICsgcnNBc3RyYWxSYW5nZSArICddJyxcbiAgICByc1JlZ2lvbmFsID0gJyg/OlxcXFx1ZDgzY1tcXFxcdWRkZTYtXFxcXHVkZGZmXSl7Mn0nLFxuICAgIHJzU3VyclBhaXIgPSAnW1xcXFx1ZDgwMC1cXFxcdWRiZmZdW1xcXFx1ZGMwMC1cXFxcdWRmZmZdJyxcbiAgICByc1VwcGVyID0gJ1snICsgcnNVcHBlclJhbmdlICsgJ10nLFxuICAgIHJzWldKID0gJ1xcXFx1MjAwZCc7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSByZWdleGVzLiAqL1xudmFyIHJzTWlzY0xvd2VyID0gJyg/OicgKyByc0xvd2VyICsgJ3wnICsgcnNNaXNjICsgJyknLFxuICAgIHJzTWlzY1VwcGVyID0gJyg/OicgKyByc1VwcGVyICsgJ3wnICsgcnNNaXNjICsgJyknLFxuICAgIHJzT3B0Q29udHJMb3dlciA9ICcoPzonICsgcnNBcG9zICsgJyg/OmR8bGx8bXxyZXxzfHR8dmUpKT8nLFxuICAgIHJzT3B0Q29udHJVcHBlciA9ICcoPzonICsgcnNBcG9zICsgJyg/OkR8TEx8TXxSRXxTfFR8VkUpKT8nLFxuICAgIHJlT3B0TW9kID0gcnNNb2RpZmllciArICc/JyxcbiAgICByc09wdFZhciA9ICdbJyArIHJzVmFyUmFuZ2UgKyAnXT8nLFxuICAgIHJzT3B0Sm9pbiA9ICcoPzonICsgcnNaV0ogKyAnKD86JyArIFtyc05vbkFzdHJhbCwgcnNSZWdpb25hbCwgcnNTdXJyUGFpcl0uam9pbignfCcpICsgJyknICsgcnNPcHRWYXIgKyByZU9wdE1vZCArICcpKicsXG4gICAgcnNPcmRMb3dlciA9ICdcXFxcZCooPzoxc3R8Mm5kfDNyZHwoPyFbMTIzXSlcXFxcZHRoKSg/PVxcXFxifFtBLVpfXSknLFxuICAgIHJzT3JkVXBwZXIgPSAnXFxcXGQqKD86MVNUfDJORHwzUkR8KD8hWzEyM10pXFxcXGRUSCkoPz1cXFxcYnxbYS16X10pJyxcbiAgICByc1NlcSA9IHJzT3B0VmFyICsgcmVPcHRNb2QgKyByc09wdEpvaW4sXG4gICAgcnNFbW9qaSA9ICcoPzonICsgW3JzRGluZ2JhdCwgcnNSZWdpb25hbCwgcnNTdXJyUGFpcl0uam9pbignfCcpICsgJyknICsgcnNTZXE7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGNvbXBsZXggb3IgY29tcG91bmQgd29yZHMuICovXG52YXIgcmVVbmljb2RlV29yZCA9IFJlZ0V4cChbXG4gIHJzVXBwZXIgKyAnPycgKyByc0xvd2VyICsgJysnICsgcnNPcHRDb250ckxvd2VyICsgJyg/PScgKyBbcnNCcmVhaywgcnNVcHBlciwgJyQnXS5qb2luKCd8JykgKyAnKScsXG4gIHJzTWlzY1VwcGVyICsgJysnICsgcnNPcHRDb250clVwcGVyICsgJyg/PScgKyBbcnNCcmVhaywgcnNVcHBlciArIHJzTWlzY0xvd2VyLCAnJCddLmpvaW4oJ3wnKSArICcpJyxcbiAgcnNVcHBlciArICc/JyArIHJzTWlzY0xvd2VyICsgJysnICsgcnNPcHRDb250ckxvd2VyLFxuICByc1VwcGVyICsgJysnICsgcnNPcHRDb250clVwcGVyLFxuICByc09yZFVwcGVyLFxuICByc09yZExvd2VyLFxuICByc0RpZ2l0cyxcbiAgcnNFbW9qaVxuXS5qb2luKCd8JyksICdnJyk7XG5cbi8qKlxuICogU3BsaXRzIGEgVW5pY29kZSBgc3RyaW5nYCBpbnRvIGFuIGFycmF5IG9mIGl0cyB3b3Jkcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IFRoZSBzdHJpbmcgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgd29yZHMgb2YgYHN0cmluZ2AuXG4gKi9cbmZ1bmN0aW9uIHVuaWNvZGVXb3JkcyhzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5tYXRjaChyZVVuaWNvZGVXb3JkKSB8fCBbXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdW5pY29kZVdvcmRzO1xuIiwiaW1wb3J0IGFzY2lpV29yZHMgZnJvbSAnLi9fYXNjaWlXb3Jkcy5qcyc7XG5pbXBvcnQgaGFzVW5pY29kZVdvcmQgZnJvbSAnLi9faGFzVW5pY29kZVdvcmQuanMnO1xuaW1wb3J0IHRvU3RyaW5nIGZyb20gJy4vdG9TdHJpbmcuanMnO1xuaW1wb3J0IHVuaWNvZGVXb3JkcyBmcm9tICcuL191bmljb2RlV29yZHMuanMnO1xuXG4vKipcbiAqIFNwbGl0cyBgc3RyaW5nYCBpbnRvIGFuIGFycmF5IG9mIGl0cyB3b3Jkcy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtSZWdFeHB8c3RyaW5nfSBbcGF0dGVybl0gVGhlIHBhdHRlcm4gdG8gbWF0Y2ggd29yZHMuXG4gKiBAcGFyYW0tIHtPYmplY3R9IFtndWFyZF0gRW5hYmxlcyB1c2UgYXMgYW4gaXRlcmF0ZWUgZm9yIG1ldGhvZHMgbGlrZSBgXy5tYXBgLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSB3b3JkcyBvZiBgc3RyaW5nYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy53b3JkcygnZnJlZCwgYmFybmV5LCAmIHBlYmJsZXMnKTtcbiAqIC8vID0+IFsnZnJlZCcsICdiYXJuZXknLCAncGViYmxlcyddXG4gKlxuICogXy53b3JkcygnZnJlZCwgYmFybmV5LCAmIHBlYmJsZXMnLCAvW14sIF0rL2cpO1xuICogLy8gPT4gWydmcmVkJywgJ2Jhcm5leScsICcmJywgJ3BlYmJsZXMnXVxuICovXG5mdW5jdGlvbiB3b3JkcyhzdHJpbmcsIHBhdHRlcm4sIGd1YXJkKSB7XG4gIHN0cmluZyA9IHRvU3RyaW5nKHN0cmluZyk7XG4gIHBhdHRlcm4gPSBndWFyZCA/IHVuZGVmaW5lZCA6IHBhdHRlcm47XG5cbiAgaWYgKHBhdHRlcm4gPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBoYXNVbmljb2RlV29yZChzdHJpbmcpID8gdW5pY29kZVdvcmRzKHN0cmluZykgOiBhc2NpaVdvcmRzKHN0cmluZyk7XG4gIH1cbiAgcmV0dXJuIHN0cmluZy5tYXRjaChwYXR0ZXJuKSB8fCBbXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgd29yZHM7XG4iLCJpbXBvcnQgYXJyYXlSZWR1Y2UgZnJvbSAnLi9fYXJyYXlSZWR1Y2UuanMnO1xuaW1wb3J0IGRlYnVyciBmcm9tICcuL2RlYnVyci5qcyc7XG5pbXBvcnQgd29yZHMgZnJvbSAnLi93b3Jkcy5qcyc7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSBjYXB0dXJlIGdyb3Vwcy4gKi9cbnZhciByc0Fwb3MgPSBcIlsnXFx1MjAxOV1cIjtcblxuLyoqIFVzZWQgdG8gbWF0Y2ggYXBvc3Ryb3BoZXMuICovXG52YXIgcmVBcG9zID0gUmVnRXhwKHJzQXBvcywgJ2cnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gbGlrZSBgXy5jYW1lbENhc2VgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdG8gY29tYmluZSBlYWNoIHdvcmQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjb21wb3VuZGVyIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVDb21wb3VuZGVyKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICByZXR1cm4gYXJyYXlSZWR1Y2Uod29yZHMoZGVidXJyKHN0cmluZykucmVwbGFjZShyZUFwb3MsICcnKSksIGNhbGxiYWNrLCAnJyk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvdW5kZXI7XG4iLCJpbXBvcnQgY2FwaXRhbGl6ZSBmcm9tICcuL2NhcGl0YWxpemUuanMnO1xuaW1wb3J0IGNyZWF0ZUNvbXBvdW5kZXIgZnJvbSAnLi9fY3JlYXRlQ29tcG91bmRlci5qcyc7XG5cbi8qKlxuICogQ29udmVydHMgYHN0cmluZ2AgdG8gW2NhbWVsIGNhc2VdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0NhbWVsQ2FzZSkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNhbWVsIGNhc2VkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5jYW1lbENhc2UoJ0ZvbyBCYXInKTtcbiAqIC8vID0+ICdmb29CYXInXG4gKlxuICogXy5jYW1lbENhc2UoJy0tZm9vLWJhci0tJyk7XG4gKiAvLyA9PiAnZm9vQmFyJ1xuICpcbiAqIF8uY2FtZWxDYXNlKCdfX0ZPT19CQVJfXycpO1xuICogLy8gPT4gJ2Zvb0JhcidcbiAqL1xudmFyIGNhbWVsQ2FzZSA9IGNyZWF0ZUNvbXBvdW5kZXIoZnVuY3Rpb24ocmVzdWx0LCB3b3JkLCBpbmRleCkge1xuICB3b3JkID0gd29yZC50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gcmVzdWx0ICsgKGluZGV4ID8gY2FwaXRhbGl6ZSh3b3JkKSA6IHdvcmQpO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGNhbWVsQ2FzZTtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYG51bGxgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGBudWxsYCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTnVsbChudWxsKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTnVsbCh2b2lkIDApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOdWxsKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gbnVsbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNOdWxsO1xuIiwiaW1wb3J0IGJhc2VBc3NpZ25WYWx1ZSBmcm9tICcuL19iYXNlQXNzaWduVmFsdWUuanMnO1xuaW1wb3J0IGJhc2VGb3JPd24gZnJvbSAnLi9fYmFzZUZvck93bi5qcyc7XG5pbXBvcnQgYmFzZUl0ZXJhdGVlIGZyb20gJy4vX2Jhc2VJdGVyYXRlZS5qcyc7XG5cbi8qKlxuICogVGhlIG9wcG9zaXRlIG9mIGBfLm1hcFZhbHVlc2A7IHRoaXMgbWV0aG9kIGNyZWF0ZXMgYW4gb2JqZWN0IHdpdGggdGhlXG4gKiBzYW1lIHZhbHVlcyBhcyBgb2JqZWN0YCBhbmQga2V5cyBnZW5lcmF0ZWQgYnkgcnVubmluZyBlYWNoIG93biBlbnVtZXJhYmxlXG4gKiBzdHJpbmcga2V5ZWQgcHJvcGVydHkgb2YgYG9iamVjdGAgdGhydSBgaXRlcmF0ZWVgLiBUaGUgaXRlcmF0ZWUgaXMgaW52b2tlZFxuICogd2l0aCB0aHJlZSBhcmd1bWVudHM6ICh2YWx1ZSwga2V5LCBvYmplY3QpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy44LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaXRlcmF0ZWU9Xy5pZGVudGl0eV0gVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBtYXBwZWQgb2JqZWN0LlxuICogQHNlZSBfLm1hcFZhbHVlc1xuICogQGV4YW1wbGVcbiAqXG4gKiBfLm1hcEtleXMoeyAnYSc6IDEsICdiJzogMiB9LCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gKiAgIHJldHVybiBrZXkgKyB2YWx1ZTtcbiAqIH0pO1xuICogLy8gPT4geyAnYTEnOiAxLCAnYjInOiAyIH1cbiAqL1xuZnVuY3Rpb24gbWFwS2V5cyhvYmplY3QsIGl0ZXJhdGVlKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgaXRlcmF0ZWUgPSBiYXNlSXRlcmF0ZWUoaXRlcmF0ZWUsIDMpO1xuXG4gIGJhc2VGb3JPd24ob2JqZWN0LCBmdW5jdGlvbih2YWx1ZSwga2V5LCBvYmplY3QpIHtcbiAgICBiYXNlQXNzaWduVmFsdWUocmVzdWx0LCBpdGVyYXRlZSh2YWx1ZSwga2V5LCBvYmplY3QpLCB2YWx1ZSk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXBLZXlzO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBgdW5kZWZpbmVkYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBgdW5kZWZpbmVkYCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzVW5kZWZpbmVkKHZvaWQgMCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1VuZGVmaW5lZChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc1VuZGVmaW5lZDtcbiIsImltcG9ydCBpc051bGwgZnJvbSAnbG9kYXNoLWVzL2lzTnVsbCc7XG5pbXBvcnQgbWFwS2V5cyBmcm9tICdsb2Rhc2gtZXMvbWFwS2V5cyc7XG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnbG9kYXNoLWVzL2lzT2JqZWN0JztcbmltcG9ydCBpc1VuZGVmaW5lZCBmcm9tICdsb2Rhc2gtZXMvaXNVbmRlZmluZWQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwcmVmaXgoc3ViamVjdCwgcHJlZml4LCBkZWxpbWV0ZXIgPSAnLScpIHtcbiAgICBjb25zdCBwcmVmaXhlciA9ICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgIGNvbnN0IHN0cmluZyA9IGtleSB8fCB2YWx1ZTtcblxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgcHJlZml4LFxuICAgICAgICAgICAgc3RyaW5nLnJlcGxhY2UobmV3IFJlZ0V4cChgXiR7cHJlZml4fSR7ZGVsaW1ldGVyfT9gKSwgJycpXG4gICAgICAgIF0uam9pbihkZWxpbWV0ZXIpO1xuICAgIH1cblxuICAgIGlmKGlzTnVsbChzdWJqZWN0KSB8fCBpc1VuZGVmaW5lZChzdWJqZWN0KSl7XG4gICAgICAgIHJldHVybiBzdWJqZWN0O1xuICAgIH1cblxuICAgIGlmKGlzT2JqZWN0KHN1YmplY3QpKSB7XG4gICAgICAgIHJldHVybiBtYXBLZXlzKHN1YmplY3QsIHByZWZpeGVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJlZml4ZXIoc3ViamVjdCk7XG59XG4iLCJpbXBvcnQgbWFwIGZyb20gJ2xvZGFzaC1lcy9tYXAnO1xuaW1wb3J0IGVhY2ggZnJvbSAnbG9kYXNoLWVzL2VhY2gnO1xuaW1wb3J0IGZpbHRlciBmcm9tICdsb2Rhc2gtZXMvZmlsdGVyJztcbmltcG9ydCBvbWl0QnkgZnJvbSAnbG9kYXNoLWVzL29taXRCeSc7XG5pbXBvcnQgY2FtZWxDYXNlIGZyb20gJ2xvZGFzaC1lcy9jYW1lbENhc2UnO1xuaW1wb3J0IHByZWZpeCBmcm9tICcuLi8uLi9IZWxwZXJzL1ByZWZpeC9QcmVmaXgnO1xuXG5jb25zdCBDT0xPUlMgPSBbXG4gICAgJ3ByaW1hcnknLFxuICAgICdzZWNvbmRhcnknLFxuICAgICdzdWNjZXNzJyxcbiAgICAnZGFuZ2VyJyxcbiAgICAnd2FybmluZycsXG4gICAgJ2luZm8nLFxuICAgICdsaWdodCcsXG4gICAgJ2RhcmsnLFxuICAgICd3aGl0ZScsXG4gICAgJ211dGVkJ1xuXTtcblxuY29uc3QgcHJvcHMgPSB7fTtcblxuZWFjaChbJ2JvcmRlcicsICd0ZXh0JywgJ2JnJywgJ2JnLWdyYWRpZW50J10sIG5hbWVzcGFjZSA9PiB7XG4gICAgZWFjaChDT0xPUlMsIGNvbG9yID0+IHtcbiAgICAgICAgcHJvcHNbY2FtZWxDYXNlKHByZWZpeChjb2xvciwgbmFtZXNwYWNlKSldID0gQm9vbGVhbjtcbiAgICB9KTtcbn0pO1xuXG5mdW5jdGlvbiBjbGFzc2VzKGluc3RhbmNlLCBuYW1lc3BhY2UpIHtcbiAgICByZXR1cm4gZmlsdGVyKG1hcChDT0xPUlMsIGNvbG9yID0+IHtcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlW2NhbWVsQ2FzZShjb2xvciA9IHByZWZpeChjb2xvciwgbmFtZXNwYWNlKSldID8gY29sb3IgOiBudWxsO1xuICAgIH0pKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgcHJvcHM6IHByb3BzLFxuXG4gICAgbWV0aG9kczoge1xuXG4gICAgICAgIHRleHRDb2xvcigpIHtcbiAgICAgICAgICAgIHJldHVybiBjbGFzc2VzKHRoaXMsICd0ZXh0Jyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgYmdDb2xvcigpIHtcbiAgICAgICAgICAgIHJldHVybiBjbGFzc2VzKHRoaXMsICdiZycpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGJvcmRlckNvbG9yKCkge1xuICAgICAgICAgICAgcmV0dXJuIGNsYXNzZXModGhpcywgJ2JvcmRlcicpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGJnR3JhZGllbnRDb2xvcigpIHtcbiAgICAgICAgICAgIHJldHVybiBjbGFzc2VzKHRoaXMsICdiZy1ncmFkaWVudCcpO1xuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgY29tcHV0ZWQ6IHtcblxuICAgICAgICB0ZXh0Q29sb3JDbGFzc2VzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudGV4dENvbG9yKCkuam9pbignICcpLnRyaW0oKSB8fCBudWxsO1xuICAgICAgICB9LFxuXG4gICAgICAgIGJvcmRlckNvbG9yQ2xhc3NlcygpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJvcmRlckNvbG9yKCkuam9pbignICcpLnRyaW0oKSB8fCBudWxsO1xuICAgICAgICB9LFxuXG4gICAgICAgIGJnQ29sb3JDbGFzc2VzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYmdDb2xvcigpLmpvaW4oJyAnKS50cmltKCkgfHwgbnVsbDtcbiAgICAgICAgfSxcblxuICAgICAgICBiZ0dyYWRpZW50Q29sb3JDbGFzc2VzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYmdHcmFkaWVudENvbG9yKCkuam9pbignICcpLnRyaW0oKSB8fCBudWxsO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNvbG9yYWJsZUNsYXNzZXMoKSB7XG4gICAgICAgICAgICBjb25zdCBjbGFzc2VzID0ge307XG5cbiAgICAgICAgICAgIGNsYXNzZXNbdGhpcy50ZXh0Q29sb3JDbGFzc2VzXSA9ICEhdGhpcy50ZXh0Q29sb3JDbGFzc2VzO1xuICAgICAgICAgICAgY2xhc3Nlc1t0aGlzLmJvcmRlckNvbG9yQ2xhc3Nlc10gPSAhIXRoaXMuYm9yZGVyQ29sb3JDbGFzc2VzO1xuICAgICAgICAgICAgY2xhc3Nlc1t0aGlzLmJnQ29sb3JDbGFzc2VzXSA9ICEhdGhpcy5iZ0NvbG9yQ2xhc3NlcztcbiAgICAgICAgICAgIGNsYXNzZXNbdGhpcy5iZ0dyYWRpZW50Q29sb3JDbGFzc2VzXSA9ICEhdGhpcy5iZ0dyYWRpZW50Q29sb3JDbGFzc2VzO1xuXG4gICAgICAgICAgICByZXR1cm4gb21pdEJ5KGNsYXNzZXMsIChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFrZXkgfHwgIXZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuIiwiZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgcHJvcHM6IHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2hvdWxkIHNob3cgb25seSBmb3Igc2NyZWVucmVhZGVyc1xuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgQm9vbGVhblxuICAgICAgICAgKi9cbiAgICAgICAgc3JPbmx5OiBCb29sZWFuLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaG91bGQgYmUgZm9jdXNhYmxlIGZvciBzY3JlZW5yZWFkZXJzXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBCb29sZWFuXG4gICAgICAgICAqL1xuICAgICAgICBzck9ubHlGb2N1c2FibGU6IEJvb2xlYW5cblxuICAgIH0sXG5cbiAgICBjb21wdXRlZDoge1xuICAgICAgICBzY3JlZW5yZWFkZXJDbGFzc2VzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAnc3Itb25seSc6IHRoaXMuc3JPbmx5LFxuICAgICAgICAgICAgICAgICdzci1vbmx5LWZvY3VzYWJsZSc6IHRoaXMuc3JPbmx5Rm9jdXNhYmxlLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiPHRlbXBsYXRlPlxuXG4gICAgPHNtYWxsIGNsYXNzPVwiZm9ybS10ZXh0XCIgOmNsYXNzPVwiY2xhc3Nlc1wiPjxzbG90IC8+PC9zbWFsbD5cblxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cblxuaW1wb3J0IGV4dGVuZCBmcm9tICdsb2Rhc2gtZXMvZXh0ZW5kJztcbmltcG9ydCBDb2xvcmFibGUgZnJvbSAnLi4vLi4vTWl4aW5zL0NvbG9yYWJsZS9Db2xvcmFibGUnO1xuaW1wb3J0IFNjcmVlbnJlYWRlcnMgZnJvbSAnLi4vLi4vTWl4aW5zL1NjcmVlbnJlYWRlcnMvU2NyZWVucmVhZGVycyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIG5hbWU6ICdoZWxwLXRleHQnLFxuXG4gICAgbWl4aW5zOiBbXG4gICAgICAgIENvbG9yYWJsZSxcbiAgICAgICAgU2NyZWVucmVhZGVyc1xuICAgIF0sXG5cbiAgICBjb21wdXRlZDoge1xuICAgICAgICBjbGFzc2VzKCkge1xuICAgICAgICAgICAgcmV0dXJuIGV4dGVuZCh7fSwgdGhpcy5zY3JlZW5yZWFkZXJDbGFzc2VzLCB0aGlzLmNvbG9yYWJsZUNsYXNzZXMpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cbjwvc2NyaXB0PlxuIiwiaW1wb3J0IEhlbHBUZXh0IGZyb20gJy4vSGVscFRleHQnO1xuaW1wb3J0IFZ1ZUluc3RhbGxlciBmcm9tICcuLi8uLi9IZWxwZXJzL1Z1ZUluc3RhbGxlci9WdWVJbnN0YWxsZXInO1xuXG5jb25zdCBwbHVnaW4gPSBWdWVJbnN0YWxsZXIudXNlKHtcblxuICAgIGluc3RhbGwoVnVlLCBvcHRpb25zKSB7XG4gICAgICAgIFZ1ZUluc3RhbGxlci5jb21wb25lbnRzKHtcbiAgICAgICAgICAgIEhlbHBUZXh0XG4gICAgICAgIH0pO1xuICAgIH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEhlbHBUZXh0O1xuIiwiPHRlbXBsYXRlPlxuXG4gICAgPGxhYmVsIDpjbGFzcz1cImNsYXNzZXNcIj48c2xvdC8+PC9sYWJlbD5cblxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cblxuaW1wb3J0IGV4dGVuZCBmcm9tICdsb2Rhc2gtZXMvZXh0ZW5kJztcbmltcG9ydCBDb2xvcmFibGUgZnJvbSAnLi4vLi4vTWl4aW5zL0NvbG9yYWJsZS9Db2xvcmFibGUnO1xuaW1wb3J0IFNjcmVlbnJlYWRlcnMgZnJvbSAnLi4vLi4vTWl4aW5zL1NjcmVlbnJlYWRlcnMvU2NyZWVucmVhZGVycyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIG5hbWU6ICdmb3JtLWxhYmVsJyxcblxuICAgIG1peGluczogW1xuICAgICAgICBDb2xvcmFibGUsXG4gICAgICAgIFNjcmVlbnJlYWRlcnNcbiAgICBdLFxuXG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgY2xhc3NlcygpIHtcbiAgICAgICAgICAgIHJldHVybiBleHRlbmQoe30sIHRoaXMuc2NyZWVucmVhZGVyQ2xhc3NlcywgdGhpcy5jb2xvcmFibGVDbGFzc2VzKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG48L3NjcmlwdD5cbiIsImltcG9ydCBGb3JtTGFiZWwgZnJvbSAnLi9Gb3JtTGFiZWwnO1xuaW1wb3J0IFZ1ZUluc3RhbGxlciBmcm9tICcuLi8uLi9IZWxwZXJzL1Z1ZUluc3RhbGxlci9WdWVJbnN0YWxsZXInO1xuXG5jb25zdCBwbHVnaW4gPSBWdWVJbnN0YWxsZXIudXNlKHtcblxuICAgIGluc3RhbGwoVnVlLCBvcHRpb25zKSB7XG4gICAgICAgIFZ1ZUluc3RhbGxlci5jb21wb25lbnRzKHtcbiAgICAgICAgICAgIEZvcm1MYWJlbFxuICAgICAgICB9KTtcbiAgICB9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBGb3JtTGFiZWw7XG4iLCI8dGVtcGxhdGU+XG5cbiAgICA8ZGl2IDpjbGFzcz1cInsnaW52YWxpZC1mZWVkYmFjayc6IGludmFsaWQsICd2YWxpZC1mZWVkYmFjayc6IHZhbGlkICYmICFpbnZhbGlkfVwiPlxuICAgICAgICA8c2xvdD57e2xhYmVsfX08L3Nsb3Q+XG4gICAgPC9kaXY+XG5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5cbmltcG9ydCBDb2xvcmFibGUgZnJvbSAnLi4vLi4vTWl4aW5zL0NvbG9yYWJsZS9Db2xvcmFibGUnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnZm9ybS1mZWVkYmFjaycsXG5cbiAgICBtaXhpbnM6IFtcbiAgICAgICAgQ29sb3JhYmxlXG4gICAgXSxcblxuICAgIHByb3BzOiB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSB2YWx1ZSBvZiBsYWJlbCBlbGVtZW50LiBJZiBubyB2YWx1ZSwgbm8gbGFiZWwgd2lsbCBhcHBlYXIuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIGxhYmVsOiBTdHJpbmcsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNob3VsZCB0aGUgZmVlZGJhY2sgbWFya2VkIGFzIGludmFsaWRcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgaW52YWxpZDogQm9vbGVhbixcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2hvdWxkIHRoZSBmZWVkYmFjayBtYXJrZWQgYXMgaW52YWxpZFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICB2YWxpZDogQm9vbGVhblxuXG4gICAgfVxuXG59XG5cbjwvc2NyaXB0PlxuIiwiaW1wb3J0IEZvcm1GZWVkYmFjayBmcm9tICcuL0Zvcm1GZWVkYmFjayc7XG5pbXBvcnQgVnVlSW5zdGFsbGVyIGZyb20gJy4uLy4uL0hlbHBlcnMvVnVlSW5zdGFsbGVyL1Z1ZUluc3RhbGxlcic7XG5cbmNvbnN0IHBsdWdpbiA9IFZ1ZUluc3RhbGxlci51c2Uoe1xuXG4gICAgaW5zdGFsbChWdWUsIG9wdGlvbnMpIHtcbiAgICAgICAgVnVlSW5zdGFsbGVyLmNvbXBvbmVudHMoe1xuICAgICAgICAgICAgRm9ybUZlZWRiYWNrXG4gICAgICAgIH0pO1xuICAgIH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEZvcm1GZWVkYmFjaztcbiIsImltcG9ydCBlYWNoIGZyb20gJ2xvZGFzaC1lcy9lYWNoJztcbmltcG9ydCBpc0FycmF5IGZyb20gJ2xvZGFzaC1lcy9pc0FycmF5JztcbmltcG9ydCBpc09iamVjdCBmcm9tICdsb2Rhc2gtZXMvaXNPYmplY3QnO1xuaW1wb3J0IGNhbWVsQ2FzZSBmcm9tICdsb2Rhc2gtZXMvY2FtZWxDYXNlJztcbmltcG9ydCBpc1VuZGVmaW5lZCBmcm9tICdsb2Rhc2gtZXMvaXNVbmRlZmluZWQnO1xuaW1wb3J0IHByZWZpeCBmcm9tICcuLi8uLi9IZWxwZXJzL1ByZWZpeC9QcmVmaXgnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBwcm9wczoge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZmllbGQgaWQgYXR0cmlidXRlIHZhbHVlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICBpZDogW051bWJlciwgU3RyaW5nXSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHZhbHVlIG9mIGxhYmVsIGVsZW1lbnQuIElmIG5vIHZhbHVlLCBubyBsYWJlbCB3aWxsIGFwcGVhci5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgbGFiZWw6IFtOdW1iZXIsIFN0cmluZ10sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBmaWVsZCBuYW1lIGF0dHJpYnV0ZSB2YWx1ZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgbmFtZTogU3RyaW5nLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgZmllbGQgaWQgYXR0cmlidXRlIHZhbHVlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgZGVmYXVsdDogbnVsbFxuICAgICAgICB9LFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgcGxhY2Vob2xkZXIgYXR0cmlidXRlIHZhbHVlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICBwbGFjZWhvbGRlcjogU3RyaW5nLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJcyB0aGUgZmllbGQgcmVxdWlyZWQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIHJlcXVpcmVkOiBCb29sZWFuLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGQgZm9ybS1ncm91cCB3cmFwcGVyIHRvIGlucHV0XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIGdyb3VwOiB7XG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgICAgICAgdmFsdWU6IHRydWVcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHJlZ2V4IHBhdHRlcm4gZm9yIHZhbGlkYXRpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIHBhdHRlcm46IFN0cmluZyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQW4gaW5saW5lIGZpZWxkIHZhbGlkYXRpb24gZXJyb3IuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmd8Qm9vbGVhblxuICAgICAgICAgKi9cbiAgICAgICAgZXJyb3I6IFN0cmluZyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogQW4gaW5saW5lIGZpZWxkIHZhbGlkYXRpb24gZXJyb3JzIHBhc3NlZCBhcyBvYmplY3Qgd2l0aCBrZXkvdmFsdWVcbiAgICAgICAgICogcGFpcnMuIElmIGVycm9ycyBwYXNzZWQgYXMgYW4gb2JqZWN0LCB0aGUgZm9ybSBuYW1lIHdpbGwgYmUgdXNlZCBmb3JcbiAgICAgICAgICogdGhlIGtleS5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IE9iamVjdHxCb29sZWFuXG4gICAgICAgICAqL1xuICAgICAgICBlcnJvcnM6IHtcbiAgICAgICAgICAgIHR5cGU6IE9iamVjdCxcbiAgICAgICAgICAgIGRlZmF1bHQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHt9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNvbWUgZmVlZGJhY2sgdG8gYWRkIHRvIHRoZSBmaWVsZCBvbmNlIHRoZSBmaWVsZCBpcyBzdWNjZXNzZnVsbHlcbiAgICAgICAgICogdmFsaWQuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIGZlZWRiYWNrOiBbU3RyaW5nLCBBcnJheV0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFuIGFycmF5IG9mIGV2ZW50IG5hbWVzIHRoYXQgY29ycmVsYXRlIHdpdGggY2FsbGJhY2sgZnVuY3Rpb25zXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBGdW5jdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgYmluZEV2ZW50czoge1xuICAgICAgICAgICAgdHlwZTogQXJyYXksXG4gICAgICAgICAgICBkZWZhdWx0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbJ2ZvY3VzJywgJ2JsdXInLCAnY2hhbmdlJywgJ2NsaWNrJywgJ2tleXVwJywgJ2tleWRvd24nLCAncHJvZ3Jlc3MnXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGRlZmF1bHQgY2xhc3MgbmFtZSBhc3NpZ25lZCB0byB0aGUgY29udHJvbCBlbGVtZW50XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIGRlZmF1bHRDb250cm9sQ2xhc3M6IHtcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgICAgIGRlZmF1bHQ6ICdmb3JtLWNvbnRyb2wnXG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEhpZGUgdGhlIGxhYmVsIGZvciBicm93c2VycywgYnV0IGxlYXZlIGl0IGZvciBzY3JlZW4gcmVhZGVycy5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgaGlkZUxhYmVsOiBCb29sZWFuLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGRpdGlvbmFsIG1hcmdpbi9wYWRkaW5nIGNsYXNzZXMgZm9yIGZpbmUgY29udHJvbCBvZiBzcGFjaW5nXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcm9wZXJ0eSBTdHJpbmdcbiAgICAgICAgICovXG4gICAgICAgIHNwYWNpbmc6IFN0cmluZyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHNpemUgb2YgdGhlIGZvcm0gY29udHJvbFxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICBzaXplOiB7XG4gICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICBkZWZhdWx0OiAnbWQnLFxuICAgICAgICAgICAgdmFsaWRhdGU6IHZhbHVlID0+IFsnc20nLCAnbWQnLCAnbGcnXS5pbmRleE9mKHZhbHVlKSAhPT0gLTFcbiAgICAgICAgfSxcblxuICAgICAgICAvKipcbiAgICAgICAgICogRGlzcGxheSB0aGUgZm9ybSBmaWVsZCBpbmxpbmVcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgaW5saW5lOiBCb29sZWFuLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiB0aGUgZm9ybSBjb250cm9sIGlzIHJlYWRvbmx5LCBkaXNwbGF5IG9ubHkgYXMgdGV4dD9cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgcGxhaW50ZXh0OiBCb29sZWFuLFxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJcyB0aGUgZm9ybSBjb250cm9sIHJlYWRvbmx5P1xuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJvcGVydHkgU3RyaW5nXG4gICAgICAgICAqL1xuICAgICAgICByZWFkb25seTogQm9vbGVhbixcblxuICAgICAgICAvKipcbiAgICAgICAgICogSXMgdGhlIGZvcm0gY29udHJvbCBkaXNhYmxlZD9cbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgZGlzYWJsZWQ6IEJvb2xlYW4sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNvbWUgaW5zdHJ1Y3Rpb25zIHRvIGFwcGVhciB1bmRlciB0aGUgZmllbGQgbGFiZWxcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgaGVscFRleHQ6IFN0cmluZyxcblxuICAgIH0sXG5cbiAgICBkaXJlY3RpdmVzOiB7XG4gICAgICAgIGJpbmRFdmVudHM6IHtcbiAgICAgICAgICAgIGJpbmQoZWwsIGJpbmRpbmcsIHZub2RlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZXZlbnRzID0gYmluZGluZy52YWx1ZSB8fCB2bm9kZS5jb250ZXh0LmJpbmRFdmVudHM7XG5cbiAgICAgICAgICAgICAgICBlYWNoKGV2ZW50cywgbmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdm5vZGUuY29udGV4dC4kZW1pdChuYW1lLCBldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIG1ldGhvZHM6IHtcblxuICAgICAgICBnZXRJbnB1dEZpZWxkKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLWNvbnRyb2wsIGlucHV0LCBzZWxlY3QsIHRleHRhcmVhJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0RmllbGRFcnJvcnMoKSB7XG4gICAgICAgICAgICBsZXQgZXJyb3JzID0gdGhpcy5lcnJvciB8fCB0aGlzLmVycm9ycztcblxuICAgICAgICAgICAgaWYoaXNPYmplY3QodGhpcy5lcnJvcnMpKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JzID0gdGhpcy5lcnJvcnNbdGhpcy5uYW1lIHx8IHRoaXMuaWRdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gIWVycm9ycyB8fCBpc0FycmF5KGVycm9ycykgfHwgaXNPYmplY3QoZXJyb3JzKSA/IGVycm9ycyA6IFtlcnJvcnNdO1xuICAgICAgICB9LFxuXG4gICAgICAgIHVwZGF0ZWQodmFsdWUsIGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KGV2ZW50IHx8ICdpbnB1dCcsIHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIGNvbXB1dGVkOiB7XG5cbiAgICAgICAgY2FsbGJhY2tzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYmluZEV2ZW50cy5tYXAoZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazogdGhpc1tjYW1lbENhc2UoWydvbicsIGV2ZW50XS5qb2luKCcgJykpXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmZpbHRlcihldmVudCA9PiAhaXNVbmRlZmluZWQoZXZlbnQuY2FsbGJhY2spKTtcbiAgICAgICAgfSxcblxuICAgICAgICBpbnZhbGlkRmVlZGJhY2soKSB7XG4gICAgICAgICAgICBpZih0aGlzLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3I7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGVycm9ycyA9IHRoaXMuZ2V0RmllbGRFcnJvcnMoKTtcblxuICAgICAgICAgICAgcmV0dXJuIGlzQXJyYXkoZXJyb3JzKSA/IGVycm9ycy5qb2luKCc8YnI+JykgOiBlcnJvcnM7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdmFsaWRGZWVkYmFjaygpIHtcbiAgICAgICAgICAgIHJldHVybiBpc0FycmF5KHRoaXMuZmVlZGJhY2spID8gdGhpcy5mZWVkYmFjay5qb2luKCc8YnI+JykgOiB0aGlzLmZlZWRiYWNrO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNvbnRyb2xDbGFzcygpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlZmF1bHRDb250cm9sQ2xhc3MgKyAodGhpcy5wbGFpbnRleHQgPyAnLXBsYWludGV4dCcgOiAnJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY29udHJvbFNpemVDbGFzcygpIHtcbiAgICAgICAgICAgIHJldHVybiBwcmVmaXgodGhpcy5zaXplLCB0aGlzLmNvbnRyb2xDbGFzcyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY29udHJvbENsYXNzZXMoKSB7XG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbENsYXNzLFxuICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbFNpemVDbGFzcyxcbiAgICAgICAgICAgICAgICAodGhpcy5zcGFjaW5nIHx8ICcnKSxcbiAgICAgICAgICAgICAgICAodGhpcy5pbnZhbGlkRmVlZGJhY2sgPyAnaXMtaW52YWxpZCcgOiAnJylcbiAgICAgICAgICAgIF0uam9pbignICcpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGhhc0RlZmF1bHRTbG90ICgpIHtcbiAgICAgICAgICAgIHJldHVybiAhIXRoaXMuJHNsb3RzLmRlZmF1bHRcbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG4iLCI8dGVtcGxhdGU+XG5cbiAgICA8Zm9ybS1ncm91cD5cblxuICAgICAgICA8c2xvdCBuYW1lPVwibGFiZWxcIj5cbiAgICAgICAgICAgIDxmb3JtLWxhYmVsIHYtaWY9XCJsYWJlbCB8fCBoYXNEZWZhdWx0U2xvdFwiIDpmb3I9XCJpZFwiIHYtaHRtbD1cImxhYmVsXCIvPlxuICAgICAgICA8L3Nsb3Q+XG5cbiAgICAgICAgPHNsb3QgbmFtZT1cImNvbnRyb2xcIj5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIDppZD1cImlkXCJcbiAgICAgICAgICAgICAgICA6dHlwZT1cInR5cGVcIlxuICAgICAgICAgICAgICAgIDp2YWx1ZT1cInZhbHVlXCJcbiAgICAgICAgICAgICAgICA6cGxhY2Vob2xkZXI9XCJwbGFjZWhvbGRlclwiXG4gICAgICAgICAgICAgICAgOnJlcXVpcmVkPVwicmVxdWlyZWRcIlxuICAgICAgICAgICAgICAgIDpkaXNhYmxlZD1cImRpc2FibGVkIHx8IHJlYWRvbmx5XCJcbiAgICAgICAgICAgICAgICA6cmVhZG9ubHk9XCJyZWFkb25seVwiXG4gICAgICAgICAgICAgICAgOnBhdHRlcm49XCJwYXR0ZXJuXCJcbiAgICAgICAgICAgICAgICA6Y2xhc3M9XCIkbWVyZ2VDbGFzc2VzKGNvbnRyb2xDbGFzc2VzLCBjb2xvcmFibGVDbGFzc2VzKVwiXG4gICAgICAgICAgICAgICAgOmFyaWEtbGFiZWw9XCJsYWJlbFwiXG4gICAgICAgICAgICAgICAgOmFyaWEtZGVzY3JpYmVkYnk9XCJpZFwiXG4gICAgICAgICAgICAgICAgdi1iaW5kLWV2ZW50cz1cImJpbmRFdmVudHNcIlxuICAgICAgICAgICAgICAgIHYtb246aW5wdXQ9XCJ1cGRhdGVkKCRldmVudC50YXJnZXQudmFsdWUpXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgIDwvc2xvdD5cblxuICAgICAgICA8c2xvdC8+XG5cbiAgICAgICAgPHNsb3QgbmFtZT1cImhlbHBcIj5cbiAgICAgICAgICAgIDxoZWxwLXRleHQgdi1pZj1cImhlbHBUZXh0XCIgdi1odG1sPVwiaGVscFRleHRcIiAvPlxuICAgICAgICA8L3Nsb3Q+XG5cbiAgICAgICAgPHNsb3QgbmFtZT1cImZlZWRiYWNrXCI+XG4gICAgICAgICAgICA8Zm9ybS1mZWVkYmFjayB2LWlmPVwidmFsaWRGZWVkYmFja1wiIHYtaHRtbD1cInZhbGlkRmVlZGJhY2tcIiB2YWxpZCAvPlxuICAgICAgICAgICAgPGZvcm0tZmVlZGJhY2sgdi1pZj1cImludmFsaWRGZWVkYmFja1wiIHYtaHRtbD1cImludmFsaWRGZWVkYmFja1wiIGludmFsaWQgLz5cbiAgICAgICAgPC9zbG90PlxuXG4gICAgPC9mb3JtLWdyb3VwPlxuXG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuXG5pbXBvcnQgSGVscFRleHQgZnJvbSAnLi4vSGVscFRleHQnO1xuaW1wb3J0IEZvcm1Hcm91cCBmcm9tICcuLi9Gb3JtR3JvdXAnO1xuaW1wb3J0IEZvcm1MYWJlbCBmcm9tICcuLi9Gb3JtTGFiZWwnO1xuaW1wb3J0IEZvcm1GZWVkYmFjayBmcm9tICcuLi9Gb3JtRmVlZGJhY2snO1xuaW1wb3J0IENvbG9yYWJsZSBmcm9tICcuLi8uLi9NaXhpbnMvQ29sb3JhYmxlJztcbmltcG9ydCBGb3JtQ29udHJvbCBmcm9tICcuLi8uLi9NaXhpbnMvRm9ybUNvbnRyb2wnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAnaW5wdXQtZmllbGQnLFxuXG4gICAgbWl4aW5zOiBbXG4gICAgICAgIENvbG9yYWJsZSxcbiAgICAgICAgRm9ybUNvbnRyb2xcbiAgICBdLFxuXG4gICAgY29tcG9uZW50czoge1xuICAgICAgICBIZWxwVGV4dCxcbiAgICAgICAgRm9ybUdyb3VwLFxuICAgICAgICBGb3JtTGFiZWwsXG4gICAgICAgIEZvcm1GZWVkYmFja1xuICAgIH0sXG5cbiAgICBwcm9wczoge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgdHlwZSBhdHRyaWJ1dGVcbiAgICAgICAgICpcbiAgICAgICAgICogQHByb3BlcnR5IFN0cmluZ1xuICAgICAgICAgKi9cbiAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgZGVmYXVsdDogJ3RleHQnXG4gICAgICAgIH1cblxuICAgIH1cblxufVxuXG48L3NjcmlwdD5cbiIsImltcG9ydCBJbnB1dEZpZWxkIGZyb20gJy4vSW5wdXRGaWVsZCc7XG5pbXBvcnQgVnVlSW5zdGFsbGVyIGZyb20gJy4uLy4uL0hlbHBlcnMvVnVlSW5zdGFsbGVyL1Z1ZUluc3RhbGxlcic7XG5cbmNvbnN0IHBsdWdpbiA9IFZ1ZUluc3RhbGxlci51c2Uoe1xuXG4gICAgaW5zdGFsbChWdWUsIG9wdGlvbnMpIHtcbiAgICAgICAgVnVlSW5zdGFsbGVyLmNvbXBvbmVudHMoe1xuICAgICAgICAgICAgSW5wdXRGaWVsZFxuICAgICAgICB9KTtcbiAgICB9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBJbnB1dEZpZWxkO1xuIiwiaW1wb3J0IGNyZWF0ZUNvbXBvdW5kZXIgZnJvbSAnLi9fY3JlYXRlQ29tcG91bmRlci5qcyc7XG5cbi8qKlxuICogQ29udmVydHMgYHN0cmluZ2AgdG9cbiAqIFtrZWJhYiBjYXNlXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MZXR0ZXJfY2FzZSNTcGVjaWFsX2Nhc2Vfc3R5bGVzKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUga2ViYWIgY2FzZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmtlYmFiQ2FzZSgnRm9vIEJhcicpO1xuICogLy8gPT4gJ2Zvby1iYXInXG4gKlxuICogXy5rZWJhYkNhc2UoJ2Zvb0JhcicpO1xuICogLy8gPT4gJ2Zvby1iYXInXG4gKlxuICogXy5rZWJhYkNhc2UoJ19fRk9PX0JBUl9fJyk7XG4gKiAvLyA9PiAnZm9vLWJhcidcbiAqL1xudmFyIGtlYmFiQ2FzZSA9IGNyZWF0ZUNvbXBvdW5kZXIoZnVuY3Rpb24ocmVzdWx0LCB3b3JkLCBpbmRleCkge1xuICByZXR1cm4gcmVzdWx0ICsgKGluZGV4ID8gJy0nIDogJycpICsgd29yZC50b0xvd2VyQ2FzZSgpO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IGtlYmFiQ2FzZTtcbiIsIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2IGNsYXNzPVwiYWN0aXZpdHktaW5kaWNhdG9yXCIgOmNsYXNzPVwiY2xhc3Nlc1wiPlxuICAgICAgICA8ZGl2IHYtZm9yPVwiaSBpbiBub2Rlc1wiPjwvZGl2PlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIHByb3BzOiB7XG4gICAgICAgIG5vZGVzOiB7XG4gICAgICAgICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICAgICAgICBkZWZhdWx0OiAzXG4gICAgICAgIH0sXG4gICAgICAgIHNpemU6IHtcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgICAgIGRlZmF1bHQ6ICcnXG4gICAgICAgIH0sXG4gICAgICAgIHByZWZpeDoge1xuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgZGVmYXVsdDogJ2FjdGl2aXR5LWluZGljYXRvci0nXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgY2xhc3NlczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zdCBjbGFzc2VzID0ge307XG5cbiAgICAgICAgICAgIGNsYXNzZXNbdGhpcy4kb3B0aW9ucy5uYW1lXSA9ICEhdGhpcy4kb3B0aW9ucy5uYW1lO1xuICAgICAgICAgICAgY2xhc3Nlc1t0aGlzLnByZWZpeCArIHRoaXMuc2l6ZS5yZXBsYWNlKHRoaXMucHJlZml4LCAnJyldID0gISF0aGlzLnNpemU7XG5cbiAgICAgICAgICAgIHJldHVybiBjbGFzc2VzO1xuICAgICAgICB9XG4gICAgfVxuXG59XG48L3NjcmlwdD5cbiIsIjxzY3JpcHQ+XG5pbXBvcnQgQmFzZVR5cGUgZnJvbSAnLi9CYXNlVHlwZSc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIG5hbWU6ICdhY3Rpdml0eS1pbmRpY2F0b3ItZG90cycsXG5cbiAgICBleHRlbmRzOiBCYXNlVHlwZVxufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxuQGltcG9ydCAnLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwL3Njc3MvYm9vdHN0cmFwLXJlYm9vdC5zY3NzJztcblxuJGFjdGl2aXR5LWluZGljYXRvci1kb3Qtc2l6ZTogLjZyZW07XG5cbi5hY3Rpdml0eS1pbmRpY2F0b3ItZG90cyB7XG5cbiAgICAmID4gZGl2IHtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZ3JheS05MDA7XG4gICAgICAgIHdpZHRoOiAkYWN0aXZpdHktaW5kaWNhdG9yLWRvdC1zaXplO1xuICAgICAgICBoZWlnaHQ6ICRhY3Rpdml0eS1pbmRpY2F0b3ItZG90LXNpemU7XG4gICAgICAgIGFuaW1hdGlvbjogYWN0aXZpdHktaW5kaWNhdG9yLWRvdHMgMS40cyBpbmZpbml0ZSBlYXNlLWluLW91dCBib3RoO1xuICAgIH1cblxuICAgICYgPiBkaXY6bm90KDpsYXN0LWNoaWxkKSB7XG4gICAgICAgIG1hcmdpbi1yaWdodDogJGFjdGl2aXR5LWluZGljYXRvci1kb3Qtc2l6ZSAqIC4zMztcbiAgICB9XG5cbiAgICAmLmFjdGl2aXR5LWluZGljYXRvci14cyA+IGRpdiB7XG4gICAgICAgIHdpZHRoOiAkYWN0aXZpdHktaW5kaWNhdG9yLWRvdC1zaXplICogLjU7XG4gICAgICAgIGhlaWdodDogJGFjdGl2aXR5LWluZGljYXRvci1kb3Qtc2l6ZSAqIC41O1xuICAgIH1cblxuICAgICYuYWN0aXZpdHktaW5kaWNhdG9yLXNtID4gZGl2IHtcbiAgICAgICAgd2lkdGg6ICRhY3Rpdml0eS1pbmRpY2F0b3ItZG90LXNpemUgKiAuNzU7XG4gICAgICAgIGhlaWdodDogJGFjdGl2aXR5LWluZGljYXRvci1kb3Qtc2l6ZSAqIC43NTtcbiAgICB9XG5cbiAgICAmLmFjdGl2aXR5LWluZGljYXRvci1tZCA+IGRpdiB7XG4gICAgICAgIHdpZHRoOiAkYWN0aXZpdHktaW5kaWNhdG9yLWRvdC1zaXplICogMTtcbiAgICAgICAgaGVpZ2h0OiAkYWN0aXZpdHktaW5kaWNhdG9yLWRvdC1zaXplICogMTtcbiAgICB9XG5cbiAgICAmLmFjdGl2aXR5LWluZGljYXRvci1sZyA+IGRpdiB7XG4gICAgICAgIHdpZHRoOiAkYWN0aXZpdHktaW5kaWNhdG9yLWRvdC1zaXplICogMS41O1xuICAgICAgICBoZWlnaHQ6ICRhY3Rpdml0eS1pbmRpY2F0b3ItZG90LXNpemUgKiAxLjU7XG4gICAgfVxuXG4gICAgJi5hY3Rpdml0eS1pbmRpY2F0b3IteGwgPiBkaXYge1xuICAgICAgICB3aWR0aDogJGFjdGl2aXR5LWluZGljYXRvci1kb3Qtc2l6ZSAqIDI7XG4gICAgICAgIGhlaWdodDogJGFjdGl2aXR5LWluZGljYXRvci1kb3Qtc2l6ZSAqIDI7XG4gICAgfVxuXG4gICAgQGZvciAkaSBmcm9tIDAgdGhyb3VnaCAxMiB7XG4gICAgICAgICYgPiBkaXY6bnRoLWNoaWxkKCN7JGkgKyAxfSkge1xuICAgICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAkaSAqIC4xNnM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBAa2V5ZnJhbWVzIGFjdGl2aXR5LWluZGljYXRvci1kb3RzIHtcbiAgICAgICAgMCUsIDgwJSwgMTAwJSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDApO1xuICAgICAgICB9IDQwJSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi5idG4tYWN0aXZpdHktaW5kaWNhdG9yLWRvdHMge1xuICAgICY6bm90KC5idG4td2FybmluZykgLmFjdGl2aXR5LWluZGljYXRvci1kb3RzID4gZGl2IHtcbiAgICAgICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgfVxufVxuXG48L3N0eWxlPlxuIiwiPHNjcmlwdD5cbmltcG9ydCBCYXNlVHlwZSBmcm9tICcuL0Jhc2VUeXBlJztcbmltcG9ydCBleHRlbmQgZnJvbSAnbG9kYXNoLWVzL2V4dGVuZCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcblxuICAgIG5hbWU6ICdhY3Rpdml0eS1pbmRpY2F0b3Itc3Bpbm5lcicsXG5cbiAgICBleHRlbmRzOiBCYXNlVHlwZSxcblxuICAgIHByb3BzOiBleHRlbmQoe30sIEJhc2VUeXBlLnByb3BzLCB7XG4gICAgICAgIG5vZGVzOiB7XG4gICAgICAgICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICAgICAgICBkZWZhdWx0OiAxMlxuICAgICAgICB9XG4gICAgfSlcbn1cbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIj5cbkBpbXBvcnQgJy4vbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC9zY3NzL2Jvb3RzdHJhcC1yZWJvb3Quc2Nzcyc7XG5cbiRhY3Rpdml0eS1pbmRpY2F0b3Itc3Bpbm5lci1zaXplOiAkZm9udC1zaXplLWJhc2UgKiAyLjI1O1xuJGFjdGl2aXR5LWluZGljYXRvci1zcGlubmVyLXdpZHRoOiAxMCU7XG4kYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXItaGVpZ2h0OiAzMCU7XG4kYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXItZGVsYXk6IDFzO1xuXG5AbWl4aW4gc3Bpbm5lci1yb3RhdGUtc2VsZWN0b3JzKCRzdGFydDoxLCAkZW5kOjE2LCAkZGVsYXk6MS4ycykge1xuICAgIEBmb3IgJGkgZnJvbSAkc3RhcnQgdGhyb3VnaCAkZW5kIHtcbiAgICAgICAgJiA+IGRpdjpmaXJzdC1jaGlsZDpudGgtbGFzdC1jaGlsZCgjeyRpfSksXG4gICAgICAgICYgPiBkaXY6Zmlyc3QtY2hpbGQ6bnRoLWxhc3QtY2hpbGQoI3skaX0pIH4gZGl2IHtcbiAgICAgICAgICAgIEBpbmNsdWRlIHNwaW5uZXItcm90YXRlLXRyYW5zZm9ybSgkaSwgJGRlbGF5KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQG1peGluIHNwaW5uZXItcm90YXRlLXRyYW5zZm9ybSgkdG90YWwsICRkZWxheToxLjJzKSB7XG4gICAgQGZvciAkaSBmcm9tIDEgdGhyb3VnaCAkdG90YWwge1xuICAgICAgICAmOm50aC1jaGlsZCgjeyRpfSkge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoI3szNjAgLyAkdG90YWwgKiAkaX1kZWcpO1xuXG4gICAgICAgICAgICAmOmJlZm9yZSB7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAtI3skZGVsYXkgLSAoJGRlbGF5IC8gJHRvdGFsICogKCRpIC0gMSkpfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuLmFjdGl2aXR5LWluZGljYXRvci1zcGlubmVyIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgd2lkdGg6ICRhY3Rpdml0eS1pbmRpY2F0b3Itc3Bpbm5lci1zaXplO1xuICAgIGhlaWdodDogJGFjdGl2aXR5LWluZGljYXRvci1zcGlubmVyLXNpemU7XG5cbiAgICAmID4gZGl2ICB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgbGVmdDogMDtcbiAgICAgICAgdG9wOiAwO1xuXG4gICAgICAgICY6YmVmb3JlIHtcbiAgICAgICAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRncmF5LTkwMDtcbiAgICAgICAgICAgIHdpZHRoOiAkYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXItd2lkdGg7XG4gICAgICAgICAgICBoZWlnaHQ6ICRhY3Rpdml0eS1pbmRpY2F0b3Itc3Bpbm5lci1oZWlnaHQ7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgICAgICAgICBhbmltYXRpb246IGFjdGl2aXR5LWluZGljYXRvci1zcGlubmVyICRhY3Rpdml0eS1pbmRpY2F0b3Itc3Bpbm5lci1kZWxheSBpbmZpbml0ZSBlYXNlLWluLW91dCBib3RoO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJi5hY3Rpdml0eS1pbmRpY2F0b3IteHMge1xuICAgICAgICB3aWR0aDogJGFjdGl2aXR5LWluZGljYXRvci1zcGlubmVyLXNpemUgKiAuNTtcbiAgICAgICAgaGVpZ2h0OiAkYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXItc2l6ZSAqIC41O1xuICAgIH1cbiAgICAmLmFjdGl2aXR5LWluZGljYXRvci1zbSB7XG4gICAgICAgIHdpZHRoOiAkYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXItc2l6ZSAqIC43NTtcbiAgICAgICAgaGVpZ2h0OiAkYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXItc2l6ZSAqIC43NTtcbiAgICB9XG4gICAgJi5hY3Rpdml0eS1pbmRpY2F0b3ItbWQge1xuICAgICAgICB3aWR0aDogJGFjdGl2aXR5LWluZGljYXRvci1zcGlubmVyLXNpemUgKiAxO1xuICAgICAgICBoZWlnaHQ6ICRhY3Rpdml0eS1pbmRpY2F0b3Itc3Bpbm5lci1zaXplICogMTtcbiAgICB9XG4gICAgJi5hY3Rpdml0eS1pbmRpY2F0b3ItbGcge1xuICAgICAgICB3aWR0aDogJGFjdGl2aXR5LWluZGljYXRvci1zcGlubmVyLXNpemUgKiAxLjU7XG4gICAgICAgIGhlaWdodDogJGFjdGl2aXR5LWluZGljYXRvci1zcGlubmVyLXNpemUgKiAxLjU7XG4gICAgfVxuICAgICYuYWN0aXZpdHktaW5kaWNhdG9yLXhsIHtcbiAgICAgICAgd2lkdGg6ICRhY3Rpdml0eS1pbmRpY2F0b3Itc3Bpbm5lci1zaXplICogMjtcbiAgICAgICAgaGVpZ2h0OiAkYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXItc2l6ZSAqIDI7XG4gICAgfVxuXG4gICAgQGluY2x1ZGUgc3Bpbm5lci1yb3RhdGUtc2VsZWN0b3JzKDEsIDEyLCAkYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXItZGVsYXkpO1xuXG4gICAgQGtleWZyYW1lcyBhY3Rpdml0eS1pbmRpY2F0b3Itc3Bpbm5lciB7XG4gICAgICAgIDAlLCAzOSUsIDEwMCUgeyBvcGFjaXR5OiAwOyB9XG4gICAgICAgIDQwJSB7IG9wYWNpdHk6IDE7IH1cbiAgICB9XG59XG5cbi5idG4tYWN0aXZpdHktaW5kaWNhdG9yLXNwaW5uZXIge1xuICAgICY6bm90KC5idG4td2FybmluZykgLmFjdGl2aXR5LWluZGljYXRvci1zcGlubmVyID4gZGl2OmJlZm9yZSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIH1cbn1cblxuPC9zdHlsZT5cbiIsImltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlSXNGaW5pdGUgPSByb290LmlzRmluaXRlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgZmluaXRlIHByaW1pdGl2ZSBudW1iZXIuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGJhc2VkIG9uXG4gKiBbYE51bWJlci5pc0Zpbml0ZWBdKGh0dHBzOi8vbWRuLmlvL051bWJlci9pc0Zpbml0ZSkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmaW5pdGUgbnVtYmVyLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGaW5pdGUoMyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Zpbml0ZShOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRmluaXRlKEluZmluaXR5KTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0Zpbml0ZSgnMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGaW5pdGUodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJiBuYXRpdmVJc0Zpbml0ZSh2YWx1ZSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGlzRmluaXRlO1xuIiwiaW1wb3J0IGlzTnVtZXJpYyBmcm9tICdsb2Rhc2gtZXMvaXNGaW5pdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihoZWlnaHQpIHtcbiAgICByZXR1cm4gaXNGaW5pdGUoaGVpZ2h0KSA/IGhlaWdodCArICdweCcgOiBoZWlnaHQ7XG59XG4iLCI8dGVtcGxhdGU+XG4gICAgPGRpdiB2LWlmPVwiY2VudGVyXCIgY2xhc3M9XCJjZW50ZXItd3JhcHBlclwiIDpjbGFzcz1cInsncG9zaXRpb24tcmVsYXRpdmUnOiByZWxhdGl2ZSwgJ3Bvc2l0aW9uLWZpeGVkJzogZml4ZWR9XCIgOnN0eWxlPVwie21pbkhlaWdodDogY29tcHV0ZWRNaW5IZWlnaHR9XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjZW50ZXItY29udGVudFwiPlxuICAgICAgICAgICAgPGNvbXBvbmVudCA6aXM9XCJjb21wb25lbnRcIiA6c2l6ZT1cInNpemVcIiA6cHJlZml4PVwicHJlZml4XCI+PC9jb21wb25lbnQ+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxjb21wb25lbnQgdi1lbHNlIDppcz1cImNvbXBvbmVudFwiIDpzdHlsZT1cInttaW5IZWlnaHQ6IGNvbXB1dGVkTWluSGVpZ2h0fVwiIDpzaXplPVwic2l6ZVwiIDpwcmVmaXg9XCJwcmVmaXhcIj48L2NvbXBvbmVudD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG5pbXBvcnQga2ViYWJDYXNlIGZyb20gJ2xvZGFzaC1lcy9rZWJhYkNhc2UnO1xuaW1wb3J0IEJhc2VUeXBlIGZyb20gJy4vVHlwZXMvQmFzZVR5cGUnO1xuaW1wb3J0IEFjdGl2aXR5SW5kaWNhdG9yRG90cyBmcm9tICcuL1R5cGVzL0RvdHMnO1xuaW1wb3J0IEFjdGl2aXR5SW5kaWNhdG9yU3Bpbm5lciBmcm9tICcuL1R5cGVzL1NwaW5uZXInO1xuaW1wb3J0IHVuaXQgZnJvbSAnLi4vLi4vSGVscGVycy9Vbml0JztcblxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgbmFtZTogJ2FjdGl2aXR5LWluZGljYXRvcicsXG5cbiAgICBleHRlbmRzOiBCYXNlVHlwZSxcblxuICAgIHByb3BzOiB7XG5cbiAgICAgICAgY2VudGVyOiBCb29sZWFuLFxuXG4gICAgICAgIGZpeGVkOiBCb29sZWFuLFxuXG4gICAgICAgIHJlbGF0aXZlOiBCb29sZWFuLFxuXG4gICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgICAgIGRlZmF1bHQ6ICdkb3RzJ1xuICAgICAgICB9LFxuXG4gICAgICAgIG1pbkhlaWdodDogW1N0cmluZywgTnVtYmVyXVxuXG4gICAgfSxcblxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgICAgQWN0aXZpdHlJbmRpY2F0b3JEb3RzLFxuICAgICAgICBBY3Rpdml0eUluZGljYXRvclNwaW5uZXJcbiAgICB9LFxuXG4gICAgY29tcHV0ZWQ6IHtcblxuICAgICAgICBjb21wdXRlZE1pbkhlaWdodCgpIHtcbiAgICAgICAgICAgIHJldHVybiB1bml0KHRoaXMubWluSGVpZ2h0KTtcbiAgICAgICAgfSxcblxuICAgICAgICBjb21wb25lbnQoKSB7XG4gICAgICAgICAgICByZXR1cm4ga2ViYWJDYXNlKHRoaXMucHJlZml4ICsgdGhpcy50eXBlLnJlcGxhY2UodGhpcy5wcmVmaXgsICcnKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIj5cbkBpbXBvcnQgJy4vbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC9zY3NzL2Jvb3RzdHJhcC1yZWJvb3Quc2Nzcyc7XG5cbi8vIENvbnRlbnQgUG9zaXRpb25pbmcgSGVscGVyc1xuLmNlbnRlci13cmFwcGVyIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xufVxuLmNlbnRlci1jb250ZW50IHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiA1MCU7XG4gICAgbGVmdDogNTAlO1xuICAgIG1hcmdpbi1yaWdodDogLTUwJTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKVxufVxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IEFjdGl2aXR5SW5kaWNhdG9yIGZyb20gJy4vQWN0aXZpdHlJbmRpY2F0b3InO1xuaW1wb3J0IFZ1ZUluc3RhbGxlciBmcm9tICcuLi8uLi9IZWxwZXJzL1Z1ZUluc3RhbGxlci9WdWVJbnN0YWxsZXInO1xuXG5jb25zdCBwbHVnaW4gPSBWdWVJbnN0YWxsZXIudXNlKHtcblxuICAgIGluc3RhbGwoVnVlLCBvcHRpb25zKSB7XG4gICAgICAgIFZ1ZUluc3RhbGxlci5jb21wb25lbnRzKHtcbiAgICAgICAgICAgIEFjdGl2aXR5SW5kaWNhdG9yXG4gICAgICAgIH0pO1xuICAgIH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEFjdGl2aXR5SW5kaWNhdG9yO1xuIiwiPHRlbXBsYXRlPlxuICAgIDxkaXYgY2xhc3M9XCJhdXRvY29tcGxldGUtZmllbGRcIiA6Y2xhc3M9XCJ7J3dhcy12YWxpZGF0ZWQnOiBlcnJvciB8fCBlcnJvcnNbbmFtZV19XCIgQGtleWRvd249XCJvbktleWRvd25cIiBAa2V5dXA9XCJvbktleXVwXCI+XG4gICAgICAgIDxpbnB1dC1maWVsZFxuICAgICAgICAgICAgdi1tb2RlbD1cInF1ZXJ5XCJcbiAgICAgICAgICAgIDpuYW1lPVwibmFtZVwiXG4gICAgICAgICAgICA6aWQ9XCJpZFwiXG4gICAgICAgICAgICA6dHlwZT1cInR5cGVcIlxuICAgICAgICAgICAgOnBsYWNlaG9sZGVyPVwicGxhY2Vob2xkZXJcIlxuICAgICAgICAgICAgOnJlcXVpcmVkPVwicmVxdWlyZWRcIlxuICAgICAgICAgICAgOmRpc2FibGVkPVwiZGlzYWJsZWQgfHwgcmVhZG9ubHlcIlxuICAgICAgICAgICAgOnJlYWRvbmx5PVwicmVhZG9ubHlcIlxuICAgICAgICAgICAgOnBhdHRlcm49XCJwYXR0ZXJuXCJcbiAgICAgICAgICAgIDphcmlhLWxhYmVsPVwibGFiZWxcIlxuICAgICAgICAgICAgOmFyaWEtZGVzY3JpYmVkYnk9XCJpZFwiXG4gICAgICAgICAgICA6bGFiZWw9XCJsYWJlbFwiXG4gICAgICAgICAgICA6ZXJyb3JzPVwiZXJyb3JzXCJcbiAgICAgICAgICAgIEBpbnB1dD1cInVwZGF0ZWRcIlxuICAgICAgICAgICAgQGZvY3VzPVwib25Gb2N1c1wiXG4gICAgICAgICAgICBAYmx1cj1cIm9uQmx1clwiPlxuICAgICAgICAgICAgPGFjdGl2aXR5LWluZGljYXRvciB2LWlmPVwiYWN0aXZpdHlcIiBzaXplPVwieHNcIiB0eXBlPVwic3Bpbm5lclwiLz5cbiAgICAgICAgPC9pbnB1dC1maWVsZD5cblxuICAgICAgICA8cGxhY2UtYXV0b2NvbXBsZXRlLWxpc3Qgdi1pZj1cInByZWRpY3Rpb25zICYmIHNob3dQcmVkaWN0aW9uc1wiIDppdGVtcz1cInByZWRpY3Rpb25zXCIgQGl0ZW06Y2xpY2s9XCJvbkl0ZW1DbGlja1wiIEBpdGVtOmJsdXI9XCJvbkl0ZW1CbHVyXCIvPlxuICAgIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbmltcG9ydCBlYWNoIGZyb20gJ2xvZGFzaC1lcy9lYWNoJztcbmltcG9ydCBvbWl0QnkgZnJvbSAnbG9kYXNoLWVzL29taXRCeSc7XG5pbXBvcnQgaXNFbXB0eSBmcm9tICdsb2Rhc2gtZXMvaXNFbXB0eSc7XG5pbXBvcnQgc2NyaXB0IGZyb20gJ3Z1ZS1pbnRlcmZhY2Uvc3JjL0hlbHBlcnMvU2NyaXB0JztcbmltcG9ydCBQbGFjZUF1dG9jb21wbGV0ZUxpc3QgZnJvbSAnLi9QbGFjZUF1dG9jb21wbGV0ZUxpc3QnO1xuaW1wb3J0IEZvcm1Hcm91cCBmcm9tICd2dWUtaW50ZXJmYWNlL3NyYy9Db21wb25lbnRzL0Zvcm1Hcm91cCc7XG5pbXBvcnQgSW5wdXRGaWVsZCBmcm9tICd2dWUtaW50ZXJmYWNlL3NyYy9Db21wb25lbnRzL0lucHV0RmllbGQnO1xuaW1wb3J0IEFjdGl2aXR5SW5kaWNhdG9yIGZyb20gJ3Z1ZS1pbnRlcmZhY2Uvc3JjL0NvbXBvbmVudHMvQWN0aXZpdHlJbmRpY2F0b3InO1xuXG5jb25zdCBLRVlDT0RFID0ge1xuICAgIEVTQzogMjcsXG4gICAgTEVGVDogMzcsXG4gICAgVVA6IDM4LFxuICAgIFJJR0hUOiAzOSxcbiAgICBET1dOOiA0MCxcbiAgICBFTlRFUjogMTMsXG4gICAgU1BBQ0U6IDMyLFxuICAgIFRBQjogOVxufTtcblxuY29uc3QgQVBJX1JFUVVFU1RfT1BUSU9OUyA9IFtcbiAgICAnYm91bmRzJyxcbiAgICAnbG9jYXRpb24nLFxuICAgICdjb21wb25lbnQtcmVzdHJpY3Rpb25zJyxcbiAgICAnb2Zmc2V0JyxcbiAgICAncmFkaXVzJyxcbiAgICAndHlwZXMnXG5dO1xuXG5leHBvcnQgZGVmYXVsdCB7XG5cbiAgICBuYW1lOiAncGxhY2UtYXV0b2NvbXBsZXRlLWZpZWxkJyxcblxuICAgIGV4dGVuZHM6IElucHV0RmllbGQsXG5cbiAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIEZvcm1Hcm91cCxcbiAgICAgICAgSW5wdXRGaWVsZCxcbiAgICAgICAgQWN0aXZpdHlJbmRpY2F0b3IsXG4gICAgICAgIFBsYWNlQXV0b2NvbXBsZXRlTGlzdFxuICAgIH0sXG5cbiAgICBwcm9wczoge1xuXG4gICAgICAgIC8vIEdvb2dsZSBNYXBzIG9wdGlvbnNcbiAgICAgICAgJ2FwaS1rZXknOiB7XG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZ1xuICAgICAgICB9LFxuXG4gICAgICAgICdib3VuZHMnOiB7XG4gICAgICAgICAgICB0eXBlOiBbQm9vbGVhbiwgT2JqZWN0LCBTdHJpbmddLFxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICAnbG9jYXRpb24nOiB7XG4gICAgICAgICAgICB0eXBlOiBbQm9vbGVhbiwgT2JqZWN0LCBTdHJpbmddLFxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICAnY29tcG9uZW50LXJlc3RyaWN0aW9ucyc6IHtcbiAgICAgICAgICAgIHR5cGU6IFtCb29sZWFuLCBPYmplY3QsIFN0cmluZ10sXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZVxuICAgICAgICB9LFxuXG4gICAgICAgICdvZmZzZXQnOiB7XG4gICAgICAgICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICAgICAgfSxcblxuICAgICAgICAncmFkaXVzJzoge1xuICAgICAgICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgICAgIH0sXG5cbiAgICAgICAgJ3R5cGVzJzoge1xuICAgICAgICAgICAgdHlwZTogW0Jvb2xlYW4sIEFycmF5XSxcbiAgICAgICAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgZ2V0SW5wdXRFbGVtZW50KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0UmVxdWVzdE9wdGlvbnMoKSB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIGlucHV0OiB0aGlzLmdldElucHV0RWxlbWVudCgpLnZhbHVlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBlYWNoKEFQSV9SRVFVRVNUX09QVElPTlMsIGtleSA9PiB7XG4gICAgICAgICAgICAgICAgb3B0aW9uc1trZXldID0gdGhpc1trZXldO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBvbWl0Qnkob3B0aW9ucywgaXNFbXB0eSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2VvY29kZShyZXF1ZXN0KSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2aXR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2dlb2NvZGUnLCByZXF1ZXN0KTtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLiRnZW9jb2Rlci5nZW9jb2RlKHJlcXVlc3QsIChyZXNwb25zZSwgc3RhdHVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZpdHkgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2goc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZXNTZXJ2aWNlU3RhdHVzLk9LOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3Qoc3RhdHVzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2VsZWN0KHBsYWNlKSB7XG4gICAgICAgICAgICB0aGlzLmdlb2NvZGUoe3BsYWNlSWQ6IHBsYWNlLnBsYWNlX2lkfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVkKHRoaXMucXVlcnkgPSByZXNwb25zZVswXS5mb3JtYXR0ZWRfYWRkcmVzcyk7XG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnc2VsZWN0JywgcGxhY2UsIHJlc3BvbnNlWzBdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNlYXJjaCgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoIXRoaXMuZ2V0SW5wdXRFbGVtZW50KCkudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmVkaWN0aW9ucyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dQcmVkaWN0aW9ucyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZpdHkgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHNlcnZpY2UuZ2V0UGxhY2VQcmVkaWN0aW9ucyh0aGlzLmdldFJlcXVlc3RPcHRpb25zKCksIChyZXNwb25zZSwgc3RhdHVzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2aXR5ID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaChzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIGdvb2dsZS5tYXBzLnBsYWNlcy5QbGFjZXNTZXJ2aWNlU3RhdHVzLk9LOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHN0YXR1cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIGhpZGUoKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dQcmVkaWN0aW9ucyA9IGZhbHNlO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNob3coKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dQcmVkaWN0aW9ucyA9IHRydWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdXAoKSB7XG4gICAgICAgICAgICBjb25zdCBmb2N1c2VkID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignYTpmb2N1cycpO1xuXG4gICAgICAgICAgICBpZihmb2N1c2VkICYmIGZvY3VzZWQucGFyZW50RWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSB7XG4gICAgICAgICAgICAgICAgZm9jdXNlZC5wYXJlbnRFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcucXVlcnlTZWxlY3RvcignYScpLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5rcyA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKTtcbiAgICAgICAgICAgICAgICBsaW5rc1tsaW5rcy5sZW5ndGggLSAxXS5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGRvd24oKSB7XG4gICAgICAgICAgICBjb25zdCBmb2N1c2VkID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignYTpmb2N1cycpO1xuXG4gICAgICAgICAgICBpZihmb2N1c2VkICYmIGZvY3VzZWQucGFyZW50RWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmcpIHtcbiAgICAgICAgICAgICAgICBmb2N1c2VkLnBhcmVudEVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nLnF1ZXJ5U2VsZWN0b3IoJ2EnKS5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZWwucXVlcnlTZWxlY3RvcignYScpLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgb25LZXlkb3duKGV2ZW50KSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignW3RhYmluZGV4XScpO1xuXG4gICAgICAgICAgICBpZihlbGVtZW50ICYmIGV2ZW50LmtleUNvZGUgPT09IEtFWUNPREUuVEFCKSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKSAmJiBlbGVtZW50LmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgb25LZXl1cChldmVudCkge1xuICAgICAgICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBLRVlDT0RFLkVOVEVSOlxuICAgICAgICAgICAgICAgIGNhc2UgS0VZQ09ERS5TUEFDRTpcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmlzLWZvY3VzZWQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLmlzLWZvY3VzZWQgYScpLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdtb3VzZWRvd24nKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGNhc2UgS0VZQ09ERS5FU0M6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldElucHV0RWxlbWVudCgpLmJsdXIoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGNhc2UgS0VZQ09ERS5VUDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cCgpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgY2FzZSBLRVlDT0RFLkRPV046XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG93bigpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2VhcmNoKCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVkaWN0aW9ucyA9IHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1ByZWRpY3Rpb25zID0gdHJ1ZTtcbiAgICAgICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnByZWRpY3Rpb25zID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICBvbkZvY3VzKGV2ZW50KSB7XG4gICAgICAgICAgICBpZih0aGlzLnF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgb25CbHVyKGV2ZW50KSB7XG4gICAgICAgICAgICBpZighdGhpcy4kZWwuY29udGFpbnMoZXZlbnQucmVsYXRlZFRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBvbkl0ZW1CbHVyKGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLm9uQmx1cihldmVudCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgb25JdGVtQ2xpY2soZXZlbnQsIGNoaWxkKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdChjaGlsZC5pdGVtKTtcbiAgICAgICAgICAgIHRoaXMucHJlZGljdGlvbnMgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIG1vdW50ZWQoKSB7XG4gICAgICAgIHNjcmlwdCgnaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2pzP2tleT0nK3RoaXMuYXBpS2V5KycmbGlicmFyaWVzPXBsYWNlcycpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kZ2VvY29kZXIgPSBuZXcgZ29vZ2xlLm1hcHMuR2VvY29kZXIoKTtcbiAgICAgICAgICAgIHRoaXMuJHNlcnZpY2UgPSBuZXcgZ29vZ2xlLm1hcHMucGxhY2VzLkF1dG9jb21wbGV0ZVNlcnZpY2UoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy90aGlzLiRvbigncGxhY2U6Y2hhbmdlZCcsIHRoaXMucGxhY2VDaGFuZ2VkKTtcbiAgICAgICAgLy90aGlzLiRvbigncHJlZGljdGlvbjpibHVyJywgdGhpcy5wcmVkaWN0aW9uQmx1cik7XG4gICAgICAgIC8vdGhpcy4kb24oJ3ByZWRpY3Rpb246Zm9jdXMnLCB0aGlzLnByZWRpY3Rpb25Gb2N1cyk7XG4gICAgICAgIC8vdGhpcy4kb24oJ3ByZWRpY3Rpb246c2VsZWN0JywgdGhpcy5wcmVkaWN0aW9uU2VsZWN0KTtcbiAgICB9LFxuXG4gICAgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHF1ZXJ5OiBudWxsLFxuICAgICAgICAgICAgZm9jdXM6IG51bGwsXG4gICAgICAgICAgICBhY3Rpdml0eTogZmFsc2UsXG4gICAgICAgICAgICBwcmVkaWN0aW9uczogZmFsc2UsXG4gICAgICAgICAgICBzaG93UHJlZGljdGlvbnM6IGZhbHNlXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLypcbiAgICB7XG4gICAgICAgIC8vIEFuIGFycmF5IG9mIHR5cGVzIHNwZWNpZmllcyBhbiBleHBsaWNpdCB0eXBlIG9yIGEgdHlwZSBjb2xsZWN0aW9uLCBhcyBsaXN0ZWQgaW4gdGhlIHN1cHBvcnRlZCB0eXBlcyBiZWxvdy4gSWYgbm90aGluZyBpcyBzcGVjaWZpZWQsIGFsbCB0eXBlcyBhcmUgcmV0dXJuZWQuIEluIGdlbmVyYWwgb25seSBhIHNpbmdsZSB0eXBlIGlzIGFsbG93ZWQuIFRoZSBleGNlcHRpb24gaXMgdGhhdCB5b3UgY2FuIHNhZmVseSBtaXggdGhlIGdlb2NvZGUgYW5kIGVzdGFibGlzaG1lbnQgdHlwZXMsIGJ1dCBub3RlIHRoYXQgdGhpcyB3aWxsIGhhdmUgdGhlIHNhbWUgZWZmZWN0IGFzIHNwZWNpZnlpbmcgbm8gdHlwZXMuIFRoZSBzdXBwb3J0ZWQgdHlwZXMgYXJlOiBnZW9jb2RlIGluc3RydWN0cyB0aGUgUGxhY2VzIHNlcnZpY2UgdG8gcmV0dXJuIG9ubHkgZ2VvY29kaW5nIHJlc3VsdHMsIHJhdGhlciB0aGFuIGJ1c2luZXNzIHJlc3VsdHMuIGFkZHJlc3MgaW5zdHJ1Y3RzIHRoZSBQbGFjZXMgc2VydmljZSB0byByZXR1cm4gb25seSBnZW9jb2RpbmcgcmVzdWx0cyB3aXRoIGEgcHJlY2lzZSBhZGRyZXNzLiBlc3RhYmxpc2htZW50IGluc3RydWN0cyB0aGUgUGxhY2VzIHNlcnZpY2UgdG8gcmV0dXJuIG9ubHkgYnVzaW5lc3MgcmVzdWx0cy4gdGhlIChyZWdpb25zKSB0eXBlIGNvbGxlY3Rpb24gaW5zdHJ1Y3RzIHRoZSBQbGFjZXMgc2VydmljZSB0byByZXR1cm4gYW55IHJlc3VsdCBtYXRjaGluZyB0aGUgZm9sbG93aW5nIHR5cGVzOiBsb2NhbGl0eSBzdWJsb2NhbGl0eSBwb3N0YWxfY29kZSBjb3VudHJ5IGFkbWluaXN0cmF0aXZlX2FyZWExIGFkbWluaXN0cmF0aXZlX2FyZWEyIHRoZSAoY2l0aWVzKSB0eXBlIGNvbGxlY3Rpb24gaW5zdHJ1Y3RzIHRoZSBQbGFjZXMgc2VydmljZSB0byByZXR1cm4gcmVzdWx0cyB0aGF0IG1hdGNoIGVpdGhlciBsb2NhbGl0eSBvciBhZG1pbmlzdHJhdGl2ZV9hcmVhMy5cbiAgICAgICAgLy8gUG9zc2libGUgdmFsdWVzOiBnZW9jb2RlLCBhZGRyZXNzLCBlc3RhYmxpc2htZW50LCBjaXRpZXMsIGxvY2FsaXR5LCBzdWJsb2NhbGl0eSwgcG9zdGFsX2NvZGUsIGNvdW50cnksIGFkbWluaXN0cmF0aXZlX2FyZWExLCBhZG1pbmlzdHJhdGl2ZV9hcmVhMlxuICAgICAgICB0eXBlOiB1bmRlZmluZWQsXG5cbiAgICAgICAgLy8gaXMgYSBnb29nbGUubWFwcy5MYXRMbmdCb3VuZHN8Z29vZ2xlLm1hcHMuTGF0TG5nQm91bmRzTGl0ZXJhbCBvYmplY3Qgc3BlY2lmeWluZyB0aGUgYXJlYSBpbiB3aGljaCB0byBzZWFyY2ggZm9yIHBsYWNlcy4gVGhlIHJlc3VsdHMgYXJlIGJpYXNlZCB0b3dhcmRzLCBidXQgbm90IHJlc3RyaWN0ZWQgdG8sIHBsYWNlcyBjb250YWluZWQgd2l0aGluIHRoZXNlIGJvdW5kcy5cbiAgICAgICAgYm91bmRzOiB1bmRlZmluZWQsXG5cbiAgICAgICAgLy8gaXMgYSBib29sZWFuIHNwZWNpZnlpbmcgd2hldGhlciB0aGUgQVBJIG11c3QgcmV0dXJuIG9ubHkgdGhvc2UgcGxhY2VzIHRoYXQgYXJlIHN0cmljdGx5IHdpdGhpbiB0aGUgcmVnaW9uIGRlZmluZWQgYnkgdGhlIGdpdmVuIGJvdW5kcy4gVGhlIEFQSSBkb2VzIG5vdCByZXR1cm4gcmVzdWx0cyBvdXRzaWRlIHRoaXMgcmVnaW9uIGV2ZW4gaWYgdGhleSBtYXRjaCB0aGUgdXNlciBpbnB1dC5cbiAgICAgICAgc3RyaWN0Qm91bmRzOiB0cnVlfGZhbHNlLFxuXG4gICAgICAgIC8vIGNhbiBiZSB1c2VkIHRvIHJlc3RyaWN0IHJlc3VsdHMgdG8gc3BlY2lmaWMgZ3JvdXBzLiBDdXJyZW50bHksIHlvdSBjYW4gdXNlIGNvbXBvbmVudFJlc3RyaWN0aW9ucyB0byBmaWx0ZXIgYnkgdXAgdG8gNSBjb3VudHJpZXMuIENvdW50cmllcyBtdXN0IGJlIHBhc3NlZCBhcyBhcyBhIHR3by1jaGFyYWN0ZXIsIElTTyAzMTY2LTEgQWxwaGEtMiBjb21wYXRpYmxlIGNvdW50cnkgY29kZS4gTXVsdGlwbGUgY291bnRyaWVzIG11c3QgYmUgcGFzc2VkIGFzIGEgbGlzdCBvZiBjb3VudHJ5IGNvZGVzLiB6XG4gICAgICAgIGNvbXBvbmVudFJlc3RyaWN0aW9uczogdW5kZWZpbmVkLFxuXG4gICAgICAgIC8vIGNhbiBiZSB1c2VkIHRvIGluc3RydWN0IHRoZSBBdXRvY29tcGxldGUgd2lkZ2V0IHRvIHJldHJpZXZlIG9ubHkgUGxhY2UgSURzLiBPbiBjYWxsaW5nIGdldFBsYWNlKCkgb24gdGhlIEF1dG9jb21wbGV0ZSBvYmplY3QsIHRoZSBQbGFjZVJlc3VsdCBtYWRlIGF2YWlsYWJsZSB3aWxsIG9ubHkgaGF2ZSB0aGUgcGxhY2UgaWQsIHR5cGVzIGFuZCBuYW1lIHByb3BlcnRpZXMgc2V0LiBZb3UgY2FuIHVzZSB0aGUgcmV0dXJuZWQgcGxhY2UgSUQgd2l0aCBjYWxscyB0byB0aGUgUGxhY2VzLCBHZW9jb2RpbmcsIERpcmVjdGlvbnMgb3IgRGlzdGFuY2UgTWF0cml4IHNlcnZpY2VzLlxuICAgICAgICBwbGFjZUlkT25seTogdW5kZWZpbmVkLFxuXG4gICAgICAgIC8vIGlzIGEgZ29vZ2xlLm1hcHMuTGF0TG5nIGZvciBwcmVkaWN0aW9uIGJpYXNpbmcuIFByZWRpY3Rpb25zIHdpbGwgYmUgYmlhc2VkIHRvd2FyZHMgdGhlIGdpdmVuIGxvY2F0aW9uIGFuZCByYWRpdXMuIEFsdGVybmF0aXZlbHksIGJvdW5kcyBjYW4gYmUgdXNlZC5cbiAgICAgICAgbG9jYXRpb246IHVuZGVmaW5lZCxcblxuICAgICAgICAvLyBpcyBhIG51bWJlciB0byBkZXRlcm1pbmUgdGhlIGNoYXJhY3RlciBwb3NpdGlvbiBpbiB0aGUgaW5wdXQgdGVybSBhdCB3aGljaCB0aGUgc2VydmljZSB1c2VzIHRleHQgZm9yIHByZWRpY3Rpb25zICh0aGUgcG9zaXRpb24gb2YgdGhlIGN1cnNvciBpbiB0aGUgaW5wdXQgZmllbGQpLlxuICAgICAgICBvZmZzZXQ6IHVuZGVmaW5lZCxcblxuICAgICAgICAvLyBpcyBhIG51bWJlciB0byB0aGUgcmFkaXVzIG9mIHRoZSBhcmVhIHVzZWQgZm9yIHByZWRpY3Rpb24gYmlhc2luZy4gVGhlIHJhZGl1cyBpcyBzcGVjaWZpZWQgaW4gbWV0ZXJzLCBhbmQgbXVzdCBhbHdheXMgYmUgYWNjb21wYW5pZWQgYnkgYSBsb2NhdGlvbiBwcm9wZXJ0eS4gQWx0ZXJuYXRpdmVseSwgYm91bmRzIGNhbiBiZSB1c2VkLlxuICAgICAgICByYWRpdXM6IHVuZGVmaW5lZFxuICAgIH1cbiAgICAqL1xufVxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBsYW5nPVwic2Nzc1wiPlxuLmF1dG9jb21wbGV0ZS1maWVsZCB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICAgLmFjdGl2aXR5LWluZGljYXRvciB7XG4gICAgICAgIHJpZ2h0OiAuNXJlbTtcbiAgICAgICAgYm90dG9tOiAuNXJlbTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIH1cbn1cblxuLmF1dG9jb21wbGV0ZS1saXN0LXdyYXBwZXIge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB6LWluZGV4OiAxMDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICB0b3A6IDEwMCU7XG4gICAgYmFja2dyb3VuZDogd2hpdGU7XG59XG5cbi5hdXRvY29tcGxldGUtbGlzdCB7XG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgYm94LXNoYWRvdzogMCAwIDEwcHggcmdiYSgwLCAwLCAwLCAuMjUpO1xufVxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgICA8bGkgY2xhc3M9XCJhdXRvY29tcGxldGUtbGlzdC1pdGVtXCIgQGZvY3VzPVwib25Gb2N1c1wiIEBvbkJsdXI9XCJvbkJsdXJcIj5cbiAgICAgICAgPGEgaHJlZj1cIiNcIiBAY2xpY2sucHJldmVudD1cIm9uQ2xpY2tcIiBAZm9jdXM9XCJvbkZvY3VzXCIgQGJsdXI9XCJvbkJsdXJcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXV0b2NvbXBsZXRlLWxpc3QtaXRlbS1pY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhdXRvY29tcGxldGUtbGlzdC1pdGVtLWxhYmVsXCI+PHNsb3QvPjwvc3Bhbj5cbiAgICAgICAgPC9hPlxuICAgIDwvbGk+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuZXhwb3J0IGRlZmF1bHQge1xuXG4gICAgbmFtZTogJ3BsYWNlLWF1dG9jb21wbGV0ZS1saXN0LWl0ZW0nLFxuXG4gICAgcHJvcHM6IHtcblxuICAgICAgICBpdGVtOiBPYmplY3RcblxuICAgIH0sXG5cbiAgICBtZXRob2RzOiB7XG5cbiAgICAgICAgb25CbHVyKGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdibHVyJywgZXZlbnQsIHRoaXMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIG9uQ2xpY2soZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2NsaWNrJywgZXZlbnQsIHRoaXMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIG9uRm9jdXMoZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2ZvY3VzJywgZXZlbnQsIHRoaXMpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn1cbjwvc2NyaXB0PlxuXG48c3R5bGUgbGFuZz1cInNjc3NcIj5cbi5hdXRvY29tcGxldGUtbGlzdC1pdGVtIHtcbiAgICBtYXJnaW46IDA7XG4gICAgcGFkZGluZzogMDtcbiAgICBmb250LXNpemU6IC44cmVtO1xuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XG5cbiAgICAmOm5vdCg6bGFzdC1jaGlsZCkge1xuICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAuMTUpO1xuICAgIH1cblxuICAgICYgPiBhIHtcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgICAgICBwYWRkaW5nOiA1cHg7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcblxuICAgICAgICAmOmhvdmVyIHtcbiAgICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgLjA1KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLmF1dG9jb21wbGV0ZS1saXN0LWl0ZW0taWNvbiB7XG4gICAgd2lkdGg6IDE1cHg7XG4gICAgaGVpZ2h0OiAyMHB4O1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICAgIGJhY2tncm91bmQtc2l6ZTogMzRweDtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAtMXB4IC0xNjFweDtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoaHR0cHM6Ly9tYXBzLmdzdGF0aWMuY29tL21hcGZpbGVzL2FwaS0zL2ltYWdlcy9hdXRvY29tcGxldGUtaWNvbnNfaGRwaS5wbmcpO1xufVxuPC9zdHlsZT5cbiIsImltcG9ydCBiYXNlQXNzaWduVmFsdWUgZnJvbSAnLi9fYmFzZUFzc2lnblZhbHVlLmpzJztcbmltcG9ydCBlcSBmcm9tICcuL2VxLmpzJztcblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2UgYGFzc2lnblZhbHVlYCBleGNlcHQgdGhhdCBpdCBkb2Vzbid0IGFzc2lnblxuICogYHVuZGVmaW5lZGAgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBhc3NpZ24uXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBhc3NpZ24uXG4gKi9cbmZ1bmN0aW9uIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIGlmICgodmFsdWUgIT09IHVuZGVmaW5lZCAmJiAhZXEob2JqZWN0W2tleV0sIHZhbHVlKSkgfHxcbiAgICAgICh2YWx1ZSA9PT0gdW5kZWZpbmVkICYmICEoa2V5IGluIG9iamVjdCkpKSB7XG4gICAgYmFzZUFzc2lnblZhbHVlKG9iamVjdCwga2V5LCB2YWx1ZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYXNzaWduTWVyZ2VWYWx1ZTtcbiIsImltcG9ydCByb290IGZyb20gJy4vX3Jvb3QuanMnO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgLiAqL1xudmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuICovXG52YXIgZnJlZU1vZHVsZSA9IGZyZWVFeHBvcnRzICYmIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuXG4vKiogRGV0ZWN0IHRoZSBwb3B1bGFyIENvbW1vbkpTIGV4dGVuc2lvbiBgbW9kdWxlLmV4cG9ydHNgLiAqL1xudmFyIG1vZHVsZUV4cG9ydHMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUuZXhwb3J0cyA9PT0gZnJlZUV4cG9ydHM7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIEJ1ZmZlciA9IG1vZHVsZUV4cG9ydHMgPyByb290LkJ1ZmZlciA6IHVuZGVmaW5lZCxcbiAgICBhbGxvY1Vuc2FmZSA9IEJ1ZmZlciA/IEJ1ZmZlci5hbGxvY1Vuc2FmZSA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgIGBidWZmZXJgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0J1ZmZlcn0gYnVmZmVyIFRoZSBidWZmZXIgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge0J1ZmZlcn0gUmV0dXJucyB0aGUgY2xvbmVkIGJ1ZmZlci5cbiAqL1xuZnVuY3Rpb24gY2xvbmVCdWZmZXIoYnVmZmVyLCBpc0RlZXApIHtcbiAgaWYgKGlzRGVlcCkge1xuICAgIHJldHVybiBidWZmZXIuc2xpY2UoKTtcbiAgfVxuICB2YXIgbGVuZ3RoID0gYnVmZmVyLmxlbmd0aCxcbiAgICAgIHJlc3VsdCA9IGFsbG9jVW5zYWZlID8gYWxsb2NVbnNhZmUobGVuZ3RoKSA6IG5ldyBidWZmZXIuY29uc3RydWN0b3IobGVuZ3RoKTtcblxuICBidWZmZXIuY29weShyZXN1bHQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbG9uZUJ1ZmZlcjtcbiIsImltcG9ydCBVaW50OEFycmF5IGZyb20gJy4vX1VpbnQ4QXJyYXkuanMnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgYXJyYXlCdWZmZXJgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5QnVmZmVyfSBhcnJheUJ1ZmZlciBUaGUgYXJyYXkgYnVmZmVyIHRvIGNsb25lLlxuICogQHJldHVybnMge0FycmF5QnVmZmVyfSBSZXR1cm5zIHRoZSBjbG9uZWQgYXJyYXkgYnVmZmVyLlxuICovXG5mdW5jdGlvbiBjbG9uZUFycmF5QnVmZmVyKGFycmF5QnVmZmVyKSB7XG4gIHZhciByZXN1bHQgPSBuZXcgYXJyYXlCdWZmZXIuY29uc3RydWN0b3IoYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCk7XG4gIG5ldyBVaW50OEFycmF5KHJlc3VsdCkuc2V0KG5ldyBVaW50OEFycmF5KGFycmF5QnVmZmVyKSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsb25lQXJyYXlCdWZmZXI7XG4iLCJpbXBvcnQgY2xvbmVBcnJheUJ1ZmZlciBmcm9tICcuL19jbG9uZUFycmF5QnVmZmVyLmpzJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYHR5cGVkQXJyYXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gdHlwZWRBcnJheSBUaGUgdHlwZWQgYXJyYXkgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2xvbmVkIHR5cGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBjbG9uZVR5cGVkQXJyYXkodHlwZWRBcnJheSwgaXNEZWVwKSB7XG4gIHZhciBidWZmZXIgPSBpc0RlZXAgPyBjbG9uZUFycmF5QnVmZmVyKHR5cGVkQXJyYXkuYnVmZmVyKSA6IHR5cGVkQXJyYXkuYnVmZmVyO1xuICByZXR1cm4gbmV3IHR5cGVkQXJyYXkuY29uc3RydWN0b3IoYnVmZmVyLCB0eXBlZEFycmF5LmJ5dGVPZmZzZXQsIHR5cGVkQXJyYXkubGVuZ3RoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xvbmVUeXBlZEFycmF5O1xuIiwiLyoqXG4gKiBDb3BpZXMgdGhlIHZhbHVlcyBvZiBgc291cmNlYCB0byBgYXJyYXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBzb3VyY2UgVGhlIGFycmF5IHRvIGNvcHkgdmFsdWVzIGZyb20uXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXk9W11dIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyB0by5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBjb3B5QXJyYXkoc291cmNlLCBhcnJheSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHNvdXJjZS5sZW5ndGg7XG5cbiAgYXJyYXkgfHwgKGFycmF5ID0gQXJyYXkobGVuZ3RoKSk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYXJyYXlbaW5kZXhdID0gc291cmNlW2luZGV4XTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvcHlBcnJheTtcbiIsImltcG9ydCBpc09iamVjdCBmcm9tICcuL2lzT2JqZWN0LmpzJztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0Q3JlYXRlID0gT2JqZWN0LmNyZWF0ZTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5jcmVhdGVgIHdpdGhvdXQgc3VwcG9ydCBmb3IgYXNzaWduaW5nXG4gKiBwcm9wZXJ0aWVzIHRvIHRoZSBjcmVhdGVkIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHByb3RvIFRoZSBvYmplY3QgdG8gaW5oZXJpdCBmcm9tLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IG9iamVjdC5cbiAqL1xudmFyIGJhc2VDcmVhdGUgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIG9iamVjdCgpIHt9XG4gIHJldHVybiBmdW5jdGlvbihwcm90bykge1xuICAgIGlmICghaXNPYmplY3QocHJvdG8pKSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuICAgIGlmIChvYmplY3RDcmVhdGUpIHtcbiAgICAgIHJldHVybiBvYmplY3RDcmVhdGUocHJvdG8pO1xuICAgIH1cbiAgICBvYmplY3QucHJvdG90eXBlID0gcHJvdG87XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBvYmplY3Q7XG4gICAgb2JqZWN0LnByb3RvdHlwZSA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufSgpKTtcblxuZXhwb3J0IGRlZmF1bHQgYmFzZUNyZWF0ZTtcbiIsImltcG9ydCBiYXNlQ3JlYXRlIGZyb20gJy4vX2Jhc2VDcmVhdGUuanMnO1xuaW1wb3J0IGdldFByb3RvdHlwZSBmcm9tICcuL19nZXRQcm90b3R5cGUuanMnO1xuaW1wb3J0IGlzUHJvdG90eXBlIGZyb20gJy4vX2lzUHJvdG90eXBlLmpzJztcblxuLyoqXG4gKiBJbml0aWFsaXplcyBhbiBvYmplY3QgY2xvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGluaXRpYWxpemVkIGNsb25lLlxuICovXG5mdW5jdGlvbiBpbml0Q2xvbmVPYmplY3Qob2JqZWN0KSB7XG4gIHJldHVybiAodHlwZW9mIG9iamVjdC5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmICFpc1Byb3RvdHlwZShvYmplY3QpKVxuICAgID8gYmFzZUNyZWF0ZShnZXRQcm90b3R5cGUob2JqZWN0KSlcbiAgICA6IHt9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0Q2xvbmVPYmplY3Q7XG4iLCJpbXBvcnQgaXNBcnJheUxpa2UgZnJvbSAnLi9pc0FycmF5TGlrZS5qcyc7XG5pbXBvcnQgaXNPYmplY3RMaWtlIGZyb20gJy4vaXNPYmplY3RMaWtlLmpzJztcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmlzQXJyYXlMaWtlYCBleGNlcHQgdGhhdCBpdCBhbHNvIGNoZWNrcyBpZiBgdmFsdWVgXG4gKiBpcyBhbiBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXktbGlrZSBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNBcnJheUxpa2UodmFsdWUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpc0FycmF5TGlrZU9iamVjdDtcbiIsImltcG9ydCBiYXNlR2V0VGFnIGZyb20gJy4vX2Jhc2VHZXRUYWcuanMnO1xuaW1wb3J0IGdldFByb3RvdHlwZSBmcm9tICcuL19nZXRQcm90b3R5cGUuanMnO1xuaW1wb3J0IGlzT2JqZWN0TGlrZSBmcm9tICcuL2lzT2JqZWN0TGlrZS5qcyc7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZSxcbiAgICBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBVc2VkIHRvIGluZmVyIHRoZSBgT2JqZWN0YCBjb25zdHJ1Y3Rvci4gKi9cbnZhciBvYmplY3RDdG9yU3RyaW5nID0gZnVuY1RvU3RyaW5nLmNhbGwoT2JqZWN0KTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgdGhhdCBpcywgYW4gb2JqZWN0IGNyZWF0ZWQgYnkgdGhlXG4gKiBgT2JqZWN0YCBjb25zdHJ1Y3RvciBvciBvbmUgd2l0aCBhIGBbW1Byb3RvdHlwZV1dYCBvZiBgbnVsbGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjguMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogfVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChuZXcgRm9vKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdCh7ICd4JzogMCwgJ3knOiAwIH0pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChPYmplY3QuY3JlYXRlKG51bGwpKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0TGlrZSh2YWx1ZSkgfHwgYmFzZUdldFRhZyh2YWx1ZSkgIT0gb2JqZWN0VGFnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwcm90byA9IGdldFByb3RvdHlwZSh2YWx1ZSk7XG4gIGlmIChwcm90byA9PT0gbnVsbCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHZhciBDdG9yID0gaGFzT3duUHJvcGVydHkuY2FsbChwcm90bywgJ2NvbnN0cnVjdG9yJykgJiYgcHJvdG8uY29uc3RydWN0b3I7XG4gIHJldHVybiB0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IgaW5zdGFuY2VvZiBDdG9yICYmXG4gICAgZnVuY1RvU3RyaW5nLmNhbGwoQ3RvcikgPT0gb2JqZWN0Q3RvclN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgaXNQbGFpbk9iamVjdDtcbiIsIi8qKlxuICogR2V0cyB0aGUgdmFsdWUgYXQgYGtleWAsIHVubGVzcyBga2V5YCBpcyBcIl9fcHJvdG9fX1wiLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gc2FmZUdldChvYmplY3QsIGtleSkge1xuICByZXR1cm4ga2V5ID09ICdfX3Byb3RvX18nXG4gICAgPyB1bmRlZmluZWRcbiAgICA6IG9iamVjdFtrZXldO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzYWZlR2V0O1xuIiwiaW1wb3J0IGNvcHlPYmplY3QgZnJvbSAnLi9fY29weU9iamVjdC5qcyc7XG5pbXBvcnQga2V5c0luIGZyb20gJy4va2V5c0luLmpzJztcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgcGxhaW4gb2JqZWN0IGZsYXR0ZW5pbmcgaW5oZXJpdGVkIGVudW1lcmFibGUgc3RyaW5nXG4gKiBrZXllZCBwcm9wZXJ0aWVzIG9mIGB2YWx1ZWAgdG8gb3duIHByb3BlcnRpZXMgb2YgdGhlIHBsYWluIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBwbGFpbiBvYmplY3QuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8uYXNzaWduKHsgJ2EnOiAxIH0sIG5ldyBGb28pO1xuICogLy8gPT4geyAnYSc6IDEsICdiJzogMiB9XG4gKlxuICogXy5hc3NpZ24oeyAnYSc6IDEgfSwgXy50b1BsYWluT2JqZWN0KG5ldyBGb28pKTtcbiAqIC8vID0+IHsgJ2EnOiAxLCAnYic6IDIsICdjJzogMyB9XG4gKi9cbmZ1bmN0aW9uIHRvUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGNvcHlPYmplY3QodmFsdWUsIGtleXNJbih2YWx1ZSkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB0b1BsYWluT2JqZWN0O1xuIiwiaW1wb3J0IGFzc2lnbk1lcmdlVmFsdWUgZnJvbSAnLi9fYXNzaWduTWVyZ2VWYWx1ZS5qcyc7XG5pbXBvcnQgY2xvbmVCdWZmZXIgZnJvbSAnLi9fY2xvbmVCdWZmZXIuanMnO1xuaW1wb3J0IGNsb25lVHlwZWRBcnJheSBmcm9tICcuL19jbG9uZVR5cGVkQXJyYXkuanMnO1xuaW1wb3J0IGNvcHlBcnJheSBmcm9tICcuL19jb3B5QXJyYXkuanMnO1xuaW1wb3J0IGluaXRDbG9uZU9iamVjdCBmcm9tICcuL19pbml0Q2xvbmVPYmplY3QuanMnO1xuaW1wb3J0IGlzQXJndW1lbnRzIGZyb20gJy4vaXNBcmd1bWVudHMuanMnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnLi9pc0FycmF5LmpzJztcbmltcG9ydCBpc0FycmF5TGlrZU9iamVjdCBmcm9tICcuL2lzQXJyYXlMaWtlT2JqZWN0LmpzJztcbmltcG9ydCBpc0J1ZmZlciBmcm9tICcuL2lzQnVmZmVyLmpzJztcbmltcG9ydCBpc0Z1bmN0aW9uIGZyb20gJy4vaXNGdW5jdGlvbi5qcyc7XG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnLi9pc09iamVjdC5qcyc7XG5pbXBvcnQgaXNQbGFpbk9iamVjdCBmcm9tICcuL2lzUGxhaW5PYmplY3QuanMnO1xuaW1wb3J0IGlzVHlwZWRBcnJheSBmcm9tICcuL2lzVHlwZWRBcnJheS5qcyc7XG5pbXBvcnQgc2FmZUdldCBmcm9tICcuL19zYWZlR2V0LmpzJztcbmltcG9ydCB0b1BsYWluT2JqZWN0IGZyb20gJy4vdG9QbGFpbk9iamVjdC5qcyc7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlTWVyZ2VgIGZvciBhcnJheXMgYW5kIG9iamVjdHMgd2hpY2ggcGVyZm9ybXNcbiAqIGRlZXAgbWVyZ2VzIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMgZW5hYmxpbmcgb2JqZWN0cyB3aXRoIGNpcmN1bGFyXG4gKiByZWZlcmVuY2VzIHRvIGJlIG1lcmdlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gbWVyZ2UuXG4gKiBAcGFyYW0ge251bWJlcn0gc3JjSW5kZXggVGhlIGluZGV4IG9mIGBzb3VyY2VgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWVyZ2VGdW5jIFRoZSBmdW5jdGlvbiB0byBtZXJnZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBhc3NpZ25lZCB2YWx1ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIHNvdXJjZSB2YWx1ZXMgYW5kIHRoZWlyIG1lcmdlZFxuICogIGNvdW50ZXJwYXJ0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZU1lcmdlRGVlcChvYmplY3QsIHNvdXJjZSwga2V5LCBzcmNJbmRleCwgbWVyZ2VGdW5jLCBjdXN0b21pemVyLCBzdGFjaykge1xuICB2YXIgb2JqVmFsdWUgPSBzYWZlR2V0KG9iamVjdCwga2V5KSxcbiAgICAgIHNyY1ZhbHVlID0gc2FmZUdldChzb3VyY2UsIGtleSksXG4gICAgICBzdGFja2VkID0gc3RhY2suZ2V0KHNyY1ZhbHVlKTtcblxuICBpZiAoc3RhY2tlZCkge1xuICAgIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIHN0YWNrZWQpO1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbmV3VmFsdWUgPSBjdXN0b21pemVyXG4gICAgPyBjdXN0b21pemVyKG9ialZhbHVlLCBzcmNWYWx1ZSwgKGtleSArICcnKSwgb2JqZWN0LCBzb3VyY2UsIHN0YWNrKVxuICAgIDogdW5kZWZpbmVkO1xuXG4gIHZhciBpc0NvbW1vbiA9IG5ld1ZhbHVlID09PSB1bmRlZmluZWQ7XG5cbiAgaWYgKGlzQ29tbW9uKSB7XG4gICAgdmFyIGlzQXJyID0gaXNBcnJheShzcmNWYWx1ZSksXG4gICAgICAgIGlzQnVmZiA9ICFpc0FyciAmJiBpc0J1ZmZlcihzcmNWYWx1ZSksXG4gICAgICAgIGlzVHlwZWQgPSAhaXNBcnIgJiYgIWlzQnVmZiAmJiBpc1R5cGVkQXJyYXkoc3JjVmFsdWUpO1xuXG4gICAgbmV3VmFsdWUgPSBzcmNWYWx1ZTtcbiAgICBpZiAoaXNBcnIgfHwgaXNCdWZmIHx8IGlzVHlwZWQpIHtcbiAgICAgIGlmIChpc0FycmF5KG9ialZhbHVlKSkge1xuICAgICAgICBuZXdWYWx1ZSA9IG9ialZhbHVlO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXNBcnJheUxpa2VPYmplY3Qob2JqVmFsdWUpKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gY29weUFycmF5KG9ialZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlzQnVmZikge1xuICAgICAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgICAgICBuZXdWYWx1ZSA9IGNsb25lQnVmZmVyKHNyY1ZhbHVlLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlzVHlwZWQpIHtcbiAgICAgICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICAgICAgbmV3VmFsdWUgPSBjbG9uZVR5cGVkQXJyYXkoc3JjVmFsdWUsIHRydWUpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIG5ld1ZhbHVlID0gW107XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzUGxhaW5PYmplY3Qoc3JjVmFsdWUpIHx8IGlzQXJndW1lbnRzKHNyY1ZhbHVlKSkge1xuICAgICAgbmV3VmFsdWUgPSBvYmpWYWx1ZTtcbiAgICAgIGlmIChpc0FyZ3VtZW50cyhvYmpWYWx1ZSkpIHtcbiAgICAgICAgbmV3VmFsdWUgPSB0b1BsYWluT2JqZWN0KG9ialZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKCFpc09iamVjdChvYmpWYWx1ZSkgfHwgKHNyY0luZGV4ICYmIGlzRnVuY3Rpb24ob2JqVmFsdWUpKSkge1xuICAgICAgICBuZXdWYWx1ZSA9IGluaXRDbG9uZU9iamVjdChzcmNWYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgaWYgKGlzQ29tbW9uKSB7XG4gICAgLy8gUmVjdXJzaXZlbHkgbWVyZ2Ugb2JqZWN0cyBhbmQgYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgc3RhY2suc2V0KHNyY1ZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgbWVyZ2VGdW5jKG5ld1ZhbHVlLCBzcmNWYWx1ZSwgc3JjSW5kZXgsIGN1c3RvbWl6ZXIsIHN0YWNrKTtcbiAgICBzdGFja1snZGVsZXRlJ10oc3JjVmFsdWUpO1xuICB9XG4gIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIG5ld1ZhbHVlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZU1lcmdlRGVlcDtcbiIsImltcG9ydCBTdGFjayBmcm9tICcuL19TdGFjay5qcyc7XG5pbXBvcnQgYXNzaWduTWVyZ2VWYWx1ZSBmcm9tICcuL19hc3NpZ25NZXJnZVZhbHVlLmpzJztcbmltcG9ydCBiYXNlRm9yIGZyb20gJy4vX2Jhc2VGb3IuanMnO1xuaW1wb3J0IGJhc2VNZXJnZURlZXAgZnJvbSAnLi9fYmFzZU1lcmdlRGVlcC5qcyc7XG5pbXBvcnQgaXNPYmplY3QgZnJvbSAnLi9pc09iamVjdC5qcyc7XG5pbXBvcnQga2V5c0luIGZyb20gJy4va2V5c0luLmpzJztcbmltcG9ydCBzYWZlR2V0IGZyb20gJy4vX3NhZmVHZXQuanMnO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm1lcmdlYCB3aXRob3V0IHN1cHBvcnQgZm9yIG11bHRpcGxlIHNvdXJjZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge251bWJlcn0gc3JjSW5kZXggVGhlIGluZGV4IG9mIGBzb3VyY2VgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgbWVyZ2VkIHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgc291cmNlIHZhbHVlcyBhbmQgdGhlaXIgbWVyZ2VkXG4gKiAgY291bnRlcnBhcnRzLlxuICovXG5mdW5jdGlvbiBiYXNlTWVyZ2Uob2JqZWN0LCBzb3VyY2UsIHNyY0luZGV4LCBjdXN0b21pemVyLCBzdGFjaykge1xuICBpZiAob2JqZWN0ID09PSBzb3VyY2UpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgYmFzZUZvcihzb3VyY2UsIGZ1bmN0aW9uKHNyY1ZhbHVlLCBrZXkpIHtcbiAgICBpZiAoaXNPYmplY3Qoc3JjVmFsdWUpKSB7XG4gICAgICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICAgICAgYmFzZU1lcmdlRGVlcChvYmplY3QsIHNvdXJjZSwga2V5LCBzcmNJbmRleCwgYmFzZU1lcmdlLCBjdXN0b21pemVyLCBzdGFjayk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIG5ld1ZhbHVlID0gY3VzdG9taXplclxuICAgICAgICA/IGN1c3RvbWl6ZXIoc2FmZUdldChvYmplY3QsIGtleSksIHNyY1ZhbHVlLCAoa2V5ICsgJycpLCBvYmplY3QsIHNvdXJjZSwgc3RhY2spXG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgICBpZiAobmV3VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBuZXdWYWx1ZSA9IHNyY1ZhbHVlO1xuICAgICAgfVxuICAgICAgYXNzaWduTWVyZ2VWYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUpO1xuICAgIH1cbiAgfSwga2V5c0luKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgYmFzZU1lcmdlO1xuIiwiaW1wb3J0IGJhc2VNZXJnZSBmcm9tICcuL19iYXNlTWVyZ2UuanMnO1xuaW1wb3J0IGNyZWF0ZUFzc2lnbmVyIGZyb20gJy4vX2NyZWF0ZUFzc2lnbmVyLmpzJztcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmFzc2lnbmAgZXhjZXB0IHRoYXQgaXQgcmVjdXJzaXZlbHkgbWVyZ2VzIG93biBhbmRcbiAqIGluaGVyaXRlZCBlbnVtZXJhYmxlIHN0cmluZyBrZXllZCBwcm9wZXJ0aWVzIG9mIHNvdXJjZSBvYmplY3RzIGludG8gdGhlXG4gKiBkZXN0aW5hdGlvbiBvYmplY3QuIFNvdXJjZSBwcm9wZXJ0aWVzIHRoYXQgcmVzb2x2ZSB0byBgdW5kZWZpbmVkYCBhcmVcbiAqIHNraXBwZWQgaWYgYSBkZXN0aW5hdGlvbiB2YWx1ZSBleGlzdHMuIEFycmF5IGFuZCBwbGFpbiBvYmplY3QgcHJvcGVydGllc1xuICogYXJlIG1lcmdlZCByZWN1cnNpdmVseS4gT3RoZXIgb2JqZWN0cyBhbmQgdmFsdWUgdHlwZXMgYXJlIG92ZXJyaWRkZW4gYnlcbiAqIGFzc2lnbm1lbnQuIFNvdXJjZSBvYmplY3RzIGFyZSBhcHBsaWVkIGZyb20gbGVmdCB0byByaWdodC4gU3Vic2VxdWVudFxuICogc291cmNlcyBvdmVyd3JpdGUgcHJvcGVydHkgYXNzaWdubWVudHMgb2YgcHJldmlvdXMgc291cmNlcy5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgbXV0YXRlcyBgb2JqZWN0YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuNS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gW3NvdXJjZXNdIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7XG4gKiAgICdhJzogW3sgJ2InOiAyIH0sIHsgJ2QnOiA0IH1dXG4gKiB9O1xuICpcbiAqIHZhciBvdGhlciA9IHtcbiAqICAgJ2EnOiBbeyAnYyc6IDMgfSwgeyAnZSc6IDUgfV1cbiAqIH07XG4gKlxuICogXy5tZXJnZShvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IHsgJ2EnOiBbeyAnYic6IDIsICdjJzogMyB9LCB7ICdkJzogNCwgJ2UnOiA1IH1dIH1cbiAqL1xudmFyIG1lcmdlID0gY3JlYXRlQXNzaWduZXIoZnVuY3Rpb24ob2JqZWN0LCBzb3VyY2UsIHNyY0luZGV4KSB7XG4gIGJhc2VNZXJnZShvYmplY3QsIHNvdXJjZSwgc3JjSW5kZXgpO1xufSk7XG5cbmV4cG9ydCBkZWZhdWx0IG1lcmdlO1xuIiwiaW1wb3J0IGVhY2ggZnJvbSAnbG9kYXNoLWVzL2VhY2gnO1xuaW1wb3J0IG1lcmdlIGZyb20gJ2xvZGFzaC1lcy9tZXJnZSc7XG5pbXBvcnQgZXh0ZW5kIGZyb20gJ2xvZGFzaC1lcy9leHRlbmQnO1xuaW1wb3J0IGlzQXJyYXkgZnJvbSAnbG9kYXNoLWVzL2lzQXJyYXknO1xuaW1wb3J0IGlzT2JqZWN0IGZyb20gJ2xvZGFzaC1lcy9pc09iamVjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKFZ1ZSwgb3B0aW9ucykge1xuXG4gICAgVnVlLnByb3RvdHlwZS4kbWVyZ2VDbGFzc2VzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGNsYXNzZXMgPSB7fTtcblxuICAgICAgICBlYWNoKFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKSwgYXJnID0+IHtcbiAgICAgICAgICAgIGlmKGlzT2JqZWN0KGFyZykpIHtcbiAgICAgICAgICAgICAgICBleHRlbmQoY2xhc3NlcywgYXJnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoaXNBcnJheShhcmcpKSB7XG4gICAgICAgICAgICAgICAgbWVyZ2UoY2xhc3NlcywgYXJnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJnKSB7XG4gICAgICAgICAgICAgICAgY2xhc3Nlc1thcmddID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGNsYXNzZXM7XG4gICAgfTtcblxufVxuIiwiaW1wb3J0IFBsYWNlQXV0b2ZpbGwgZnJvbSAnLi9QbGFjZUF1dG9maWxsJztcbmltcG9ydCBQbGFjZUF1dG9jb21wbGV0ZUZpZWxkIGZyb20gJy4vUGxhY2VBdXRvY29tcGxldGVGaWVsZCc7XG5pbXBvcnQgUGxhY2VBdXRvY29tcGxldGVMaXN0IGZyb20gJy4vUGxhY2VBdXRvY29tcGxldGVMaXN0JztcbmltcG9ydCBQbGFjZUF1dG9jb21wbGV0ZUxpc3RJdGVtIGZyb20gJy4vUGxhY2VBdXRvY29tcGxldGVMaXN0SXRlbSc7XG5pbXBvcnQgbWVyZ2VDbGFzc2VzIGZyb20gJ3Z1ZS1pbnRlcmZhY2Uvc3JjL1BsdWdpbnMvTWVyZ2VDbGFzc2VzJztcblxuZXhwb3J0IHtcbiAgICBQbGFjZUF1dG9jb21wbGV0ZUZpZWxkLFxuICAgIFBsYWNlQXV0b2NvbXBsZXRlTGlzdCxcbiAgICBQbGFjZUF1dG9jb21wbGV0ZUxpc3RJdGVtXG59XG5cbmZ1bmN0aW9uIGluc3RhbGwodnVlLCBvcHRpb25zKSB7XG4gICAgVnVlLnVzZShtZXJnZUNsYXNzZXMpO1xuICAgIFZ1ZS5kaXJlY3RpdmUoJ3BsYWNlLWF1dG9maWxsJywgUGxhY2VBdXRvZmlsbCk7XG4gICAgVnVlLmNvbXBvbmVudCgncGxhY2UtYXV0b2NvbXBsZXRlLWZpZWxkJywgUGxhY2VBdXRvY29tcGxldGVGaWVsZCk7XG4gICAgVnVlLmNvbXBvbmVudCgncGxhY2UtYXV0b2NvbXBsZXRlLWxpc3QnLCBQbGFjZUF1dG9jb21wbGV0ZUxpc3QpO1xuICAgIFZ1ZS5jb21wb25lbnQoJ3BsYWNlLWF1dG9jb21wbGV0ZS1saXN0LWl0ZW0nLCBQbGFjZUF1dG9jb21wbGV0ZUxpc3RJdGVtKTtcbn1cblxuaWYod2luZG93ICYmIHdpbmRvdy5WdWUpIHtcbiAgICB3aW5kb3cuVnVlLnVzZShpbnN0YWxsKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5zdGFsbDtcbiJdLCJuYW1lcyI6WyJnbG9iYWwiLCJTeW1ib2wiLCJvYmplY3RQcm90byIsIm5hdGl2ZU9iamVjdFRvU3RyaW5nIiwic3ltVG9TdHJpbmdUYWciLCJmdW5jUHJvdG8iLCJmdW5jVG9TdHJpbmciLCJoYXNPd25Qcm9wZXJ0eSIsIk1hcCIsIkhBU0hfVU5ERUZJTkVEIiwiQ09NUEFSRV9QQVJUSUFMX0ZMQUciLCJDT01QQVJFX1VOT1JERVJFRF9GTEFHIiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJNQVhfU0FGRV9JTlRFR0VSIiwiYXJnc1RhZyIsImJvb2xUYWciLCJkYXRlVGFnIiwiZXJyb3JUYWciLCJmdW5jVGFnIiwibWFwVGFnIiwibnVtYmVyVGFnIiwicmVnZXhwVGFnIiwic2V0VGFnIiwic3RyaW5nVGFnIiwiYXJyYXlCdWZmZXJUYWciLCJkYXRhVmlld1RhZyIsImZyZWVFeHBvcnRzIiwiZnJlZU1vZHVsZSIsIm1vZHVsZUV4cG9ydHMiLCJQcm9taXNlIiwib2JqZWN0VGFnIiwid2Vha01hcFRhZyIsImFycmF5VGFnIiwiZ2V0VGFnIiwic3ltYm9sVGFnIiwic3ltYm9sUHJvdG8iLCJJTkZJTklUWSIsIkFMSUFTRVMiLCJleHRyYWN0IiwidHlwZSIsImdlb2NvZGVyIiwidHlwZXMiLCJpc0FycmF5IiwidmFsdWVzIiwiZmlsdGVyIiwibWFwIiwiYWRkcmVzc19jb21wb25lbnRzIiwiaW50ZXJzZWN0aW9uIiwiY29tcG9uZW50IiwibGVuZ3RoIiwibG9uZ19uYW1lIiwiam9pbiIsImJpbmQiLCJlbCIsImJpbmRpbmciLCJ2bm9kZSIsImNvbXBvbmVudEluc3RhbmNlIiwiJG9uIiwicGxhY2UiLCJtb2RpZmllcnMiLCJ2YWx1ZSIsIm1vZGlmaWVyIiwiY29udGV4dCIsImV4cHJlc3Npb24iLCJGVU5DX0VSUk9SX1RFWFQiLCJuYXRpdmVHZXRTeW1ib2xzIiwibG9hZGVkIiwiZWxlbWVudCIsInVybCIsInNjcmlwdCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImFwcGVuZCIsInF1ZXJ5U2VsZWN0b3IiLCJhcHBlbmRDaGlsZCIsInJlc29sdmUiLCJyZWplY3QiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJlIiwicmVuZGVyIiwibmFtZSIsInByb3BzIiwiQXJyYXkiLCJkZWZhdWx0IiwiU3RyaW5nIiwibWV0aG9kcyIsIm9uQmx1ciIsIml0ZW0iLCIkZW1pdCIsIm9uRm9jdXMiLCJvbkNsaWNrIiwiYXJyYXlFYWNoIiwiYXJyYXkiLCJpdGVyYXRlZSIsImluZGV4IiwiY3JlYXRlQmFzZUZvciIsImZyb21SaWdodCIsIm9iamVjdCIsImtleXNGdW5jIiwiaXRlcmFibGUiLCJPYmplY3QiLCJrZXkiLCJiYXNlRm9yIiwiYmFzZVRpbWVzIiwibiIsInJlc3VsdCIsImZyZWVHbG9iYWwiLCJmcmVlU2VsZiIsInNlbGYiLCJyb290IiwiRnVuY3Rpb24iLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsInRvU3RyaW5nVGFnIiwidW5kZWZpbmVkIiwiZ2V0UmF3VGFnIiwiaXNPd24iLCJjYWxsIiwidGFnIiwidW5tYXNrZWQiLCJvYmplY3RUb1N0cmluZyIsIm51bGxUYWciLCJ1bmRlZmluZWRUYWciLCJiYXNlR2V0VGFnIiwiaXNPYmplY3RMaWtlIiwiYmFzZUlzQXJndW1lbnRzIiwiaXNBcmd1bWVudHMiLCJhcmd1bWVudHMiLCJzdHViRmFsc2UiLCJleHBvcnRzIiwibm9kZVR5cGUiLCJtb2R1bGUiLCJCdWZmZXIiLCJuYXRpdmVJc0J1ZmZlciIsImlzQnVmZmVyIiwicmVJc1VpbnQiLCJpc0luZGV4IiwidGVzdCIsImlzTGVuZ3RoIiwiZmxvYXQzMlRhZyIsImZsb2F0NjRUYWciLCJpbnQ4VGFnIiwiaW50MTZUYWciLCJpbnQzMlRhZyIsInVpbnQ4VGFnIiwidWludDhDbGFtcGVkVGFnIiwidWludDE2VGFnIiwidWludDMyVGFnIiwidHlwZWRBcnJheVRhZ3MiLCJiYXNlSXNUeXBlZEFycmF5IiwiYmFzZVVuYXJ5IiwiZnVuYyIsImZyZWVQcm9jZXNzIiwicHJvY2VzcyIsIm5vZGVVdGlsIiwibm9kZUlzVHlwZWRBcnJheSIsImlzVHlwZWRBcnJheSIsImFycmF5TGlrZUtleXMiLCJpbmhlcml0ZWQiLCJpc0FyciIsImlzQXJnIiwiaXNCdWZmIiwiaXNUeXBlIiwic2tpcEluZGV4ZXMiLCJwdXNoIiwiaXNQcm90b3R5cGUiLCJDdG9yIiwiY29uc3RydWN0b3IiLCJwcm90byIsIm92ZXJBcmciLCJ0cmFuc2Zvcm0iLCJhcmciLCJuYXRpdmVLZXlzIiwia2V5cyIsImJhc2VLZXlzIiwiaXNPYmplY3QiLCJhc3luY1RhZyIsImdlblRhZyIsInByb3h5VGFnIiwiaXNGdW5jdGlvbiIsImlzQXJyYXlMaWtlIiwiYmFzZUZvck93biIsImNyZWF0ZUJhc2VFYWNoIiwiZWFjaEZ1bmMiLCJjb2xsZWN0aW9uIiwiYmFzZUVhY2giLCJpZGVudGl0eSIsImNhc3RGdW5jdGlvbiIsImZvckVhY2giLCJWdWVJbnN0YWxsZXIiLCJ1c2UiLCJwbHVnaW4iLCJwbHVnaW5zIiwiZmlsdGVycyIsImNvbXBvbmVudHMiLCJkaXJlY3RpdmUiLCJkaXJlY3RpdmVzIiwiJHBsdWdpbnMiLCIkZmlsdGVycyIsIiRkaXJlY3RpdmVzIiwiJGNvbXBvbmVudHMiLCJ3aW5kb3ciLCJWdWUiLCJkZWYiLCJlYWNoIiwiaW5zdGFsbCIsIm9wdGlvbnMiLCJGb3JtR3JvdXAiLCJjb3JlSnNEYXRhIiwibWFza1NyY0tleSIsInVpZCIsImV4ZWMiLCJJRV9QUk9UTyIsImlzTWFza2VkIiwidG9Tb3VyY2UiLCJyZVJlZ0V4cENoYXIiLCJyZUlzSG9zdEN0b3IiLCJyZUlzTmF0aXZlIiwiUmVnRXhwIiwicmVwbGFjZSIsImJhc2VJc05hdGl2ZSIsInBhdHRlcm4iLCJnZXRWYWx1ZSIsImdldE5hdGl2ZSIsImRlZmluZVByb3BlcnR5IiwiYmFzZUFzc2lnblZhbHVlIiwiZXEiLCJvdGhlciIsImFzc2lnblZhbHVlIiwib2JqVmFsdWUiLCJjb3B5T2JqZWN0Iiwic291cmNlIiwiY3VzdG9taXplciIsImlzTmV3IiwibmV3VmFsdWUiLCJhcHBseSIsInRoaXNBcmciLCJhcmdzIiwibmF0aXZlTWF4IiwiTWF0aCIsIm1heCIsIm92ZXJSZXN0Iiwic3RhcnQiLCJvdGhlckFyZ3MiLCJjb25zdGFudCIsImJhc2VTZXRUb1N0cmluZyIsInN0cmluZyIsIkhPVF9DT1VOVCIsIkhPVF9TUEFOIiwibmF0aXZlTm93IiwiRGF0ZSIsIm5vdyIsInNob3J0T3V0IiwiY291bnQiLCJsYXN0Q2FsbGVkIiwic3RhbXAiLCJyZW1haW5pbmciLCJzZXRUb1N0cmluZyIsImJhc2VSZXN0IiwiaXNJdGVyYXRlZUNhbGwiLCJjcmVhdGVBc3NpZ25lciIsImFzc2lnbmVyIiwic291cmNlcyIsImd1YXJkIiwibmF0aXZlS2V5c0luIiwiYmFzZUtleXNJbiIsImlzUHJvdG8iLCJrZXlzSW4iLCJhc3NpZ25JbiIsImFycmF5TWFwIiwibGlzdENhY2hlQ2xlYXIiLCJfX2RhdGFfXyIsInNpemUiLCJhc3NvY0luZGV4T2YiLCJhcnJheVByb3RvIiwic3BsaWNlIiwibGlzdENhY2hlRGVsZXRlIiwiZGF0YSIsImxhc3RJbmRleCIsInBvcCIsImxpc3RDYWNoZUdldCIsImxpc3RDYWNoZUhhcyIsImxpc3RDYWNoZVNldCIsIkxpc3RDYWNoZSIsImVudHJpZXMiLCJjbGVhciIsImVudHJ5Iiwic2V0IiwiZ2V0IiwiaGFzIiwic3RhY2tDbGVhciIsInN0YWNrRGVsZXRlIiwic3RhY2tHZXQiLCJzdGFja0hhcyIsIm5hdGl2ZUNyZWF0ZSIsImhhc2hDbGVhciIsImhhc2hEZWxldGUiLCJoYXNoR2V0IiwiaGFzaEhhcyIsImhhc2hTZXQiLCJIYXNoIiwibWFwQ2FjaGVDbGVhciIsImlzS2V5YWJsZSIsImdldE1hcERhdGEiLCJtYXBDYWNoZURlbGV0ZSIsIm1hcENhY2hlR2V0IiwibWFwQ2FjaGVIYXMiLCJtYXBDYWNoZVNldCIsIk1hcENhY2hlIiwiTEFSR0VfQVJSQVlfU0laRSIsInN0YWNrU2V0IiwicGFpcnMiLCJTdGFjayIsInNldENhY2hlQWRkIiwic2V0Q2FjaGVIYXMiLCJTZXRDYWNoZSIsImFkZCIsImFycmF5U29tZSIsInByZWRpY2F0ZSIsImNhY2hlSGFzIiwiY2FjaGUiLCJlcXVhbEFycmF5cyIsImJpdG1hc2siLCJlcXVhbEZ1bmMiLCJzdGFjayIsImlzUGFydGlhbCIsImFyckxlbmd0aCIsIm90aExlbmd0aCIsInN0YWNrZWQiLCJzZWVuIiwiYXJyVmFsdWUiLCJvdGhWYWx1ZSIsImNvbXBhcmVkIiwib3RoSW5kZXgiLCJVaW50OEFycmF5IiwibWFwVG9BcnJheSIsInNldFRvQXJyYXkiLCJzeW1ib2xWYWx1ZU9mIiwidmFsdWVPZiIsImVxdWFsQnlUYWciLCJieXRlTGVuZ3RoIiwiYnl0ZU9mZnNldCIsImJ1ZmZlciIsIm1lc3NhZ2UiLCJjb252ZXJ0IiwiYXJyYXlQdXNoIiwib2Zmc2V0IiwiYmFzZUdldEFsbEtleXMiLCJzeW1ib2xzRnVuYyIsImFycmF5RmlsdGVyIiwicmVzSW5kZXgiLCJzdHViQXJyYXkiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJnZXRTeW1ib2xzIiwic3ltYm9sIiwiZ2V0QWxsS2V5cyIsImVxdWFsT2JqZWN0cyIsIm9ialByb3BzIiwib2JqTGVuZ3RoIiwib3RoUHJvcHMiLCJza2lwQ3RvciIsIm9iakN0b3IiLCJvdGhDdG9yIiwiRGF0YVZpZXciLCJTZXQiLCJXZWFrTWFwIiwicHJvbWlzZVRhZyIsImRhdGFWaWV3Q3RvclN0cmluZyIsIm1hcEN0b3JTdHJpbmciLCJwcm9taXNlQ3RvclN0cmluZyIsInNldEN0b3JTdHJpbmciLCJ3ZWFrTWFwQ3RvclN0cmluZyIsIkFycmF5QnVmZmVyIiwiY3RvclN0cmluZyIsImJhc2VJc0VxdWFsRGVlcCIsIm9iaklzQXJyIiwib3RoSXNBcnIiLCJvYmpUYWciLCJvdGhUYWciLCJvYmpJc09iaiIsIm90aElzT2JqIiwiaXNTYW1lVGFnIiwib2JqSXNXcmFwcGVkIiwib3RoSXNXcmFwcGVkIiwib2JqVW53cmFwcGVkIiwib3RoVW53cmFwcGVkIiwiYmFzZUlzRXF1YWwiLCJiYXNlSXNNYXRjaCIsIm1hdGNoRGF0YSIsIm5vQ3VzdG9taXplciIsInNyY1ZhbHVlIiwiaXNTdHJpY3RDb21wYXJhYmxlIiwiZ2V0TWF0Y2hEYXRhIiwibWF0Y2hlc1N0cmljdENvbXBhcmFibGUiLCJiYXNlTWF0Y2hlcyIsImlzU3ltYm9sIiwicmVJc0RlZXBQcm9wIiwicmVJc1BsYWluUHJvcCIsImlzS2V5IiwibWVtb2l6ZSIsInJlc29sdmVyIiwiVHlwZUVycm9yIiwibWVtb2l6ZWQiLCJDYWNoZSIsIk1BWF9NRU1PSVpFX1NJWkUiLCJtZW1vaXplQ2FwcGVkIiwicmVQcm9wTmFtZSIsInJlRXNjYXBlQ2hhciIsInN0cmluZ1RvUGF0aCIsImNoYXJDb2RlQXQiLCJtYXRjaCIsIm51bWJlciIsInF1b3RlIiwic3ViU3RyaW5nIiwic3ltYm9sVG9TdHJpbmciLCJiYXNlVG9TdHJpbmciLCJjYXN0UGF0aCIsInRvS2V5IiwiYmFzZUdldCIsInBhdGgiLCJkZWZhdWx0VmFsdWUiLCJiYXNlSGFzSW4iLCJoYXNQYXRoIiwiaGFzRnVuYyIsImhhc0luIiwiYmFzZU1hdGNoZXNQcm9wZXJ0eSIsImJhc2VQcm9wZXJ0eSIsImJhc2VQcm9wZXJ0eURlZXAiLCJwcm9wZXJ0eSIsImJhc2VJdGVyYXRlZSIsImJhc2VNYXAiLCJiYXNlRmlsdGVyIiwibmVnYXRlIiwiYmFzZVNldCIsIm5lc3RlZCIsImJhc2VQaWNrQnkiLCJwYXRocyIsImdldFByb3RvdHlwZSIsImdldFByb3RvdHlwZU9mIiwiZ2V0U3ltYm9sc0luIiwiZ2V0QWxsS2V5c0luIiwicGlja0J5IiwicHJvcCIsIm9taXRCeSIsImJhc2VTbGljZSIsImVuZCIsImNhc3RTbGljZSIsInJzQXN0cmFsUmFuZ2UiLCJyc0NvbWJvTWFya3NSYW5nZSIsInJlQ29tYm9IYWxmTWFya3NSYW5nZSIsInJzQ29tYm9TeW1ib2xzUmFuZ2UiLCJyc0NvbWJvUmFuZ2UiLCJyc1ZhclJhbmdlIiwicnNaV0oiLCJyZUhhc1VuaWNvZGUiLCJoYXNVbmljb2RlIiwiYXNjaWlUb0FycmF5Iiwic3BsaXQiLCJyc0FzdHJhbCIsInJzQ29tYm8iLCJyc0ZpdHoiLCJyc01vZGlmaWVyIiwicnNOb25Bc3RyYWwiLCJyc1JlZ2lvbmFsIiwicnNTdXJyUGFpciIsInJlT3B0TW9kIiwicnNPcHRWYXIiLCJyc09wdEpvaW4iLCJyc1NlcSIsInJzU3ltYm9sIiwicmVVbmljb2RlIiwidW5pY29kZVRvQXJyYXkiLCJzdHJpbmdUb0FycmF5IiwiY3JlYXRlQ2FzZUZpcnN0IiwibWV0aG9kTmFtZSIsInN0clN5bWJvbHMiLCJjaHIiLCJjaGFyQXQiLCJ0cmFpbGluZyIsInNsaWNlIiwidXBwZXJGaXJzdCIsImNhcGl0YWxpemUiLCJ0b0xvd2VyQ2FzZSIsImFycmF5UmVkdWNlIiwiYWNjdW11bGF0b3IiLCJpbml0QWNjdW0iLCJiYXNlUHJvcGVydHlPZiIsImRlYnVycmVkTGV0dGVycyIsImRlYnVyckxldHRlciIsInJlTGF0aW4iLCJyZUNvbWJvTWFyayIsImRlYnVyciIsInJlQXNjaWlXb3JkIiwiYXNjaWlXb3JkcyIsInJlSGFzVW5pY29kZVdvcmQiLCJoYXNVbmljb2RlV29yZCIsInJzRGluZ2JhdFJhbmdlIiwicnNMb3dlclJhbmdlIiwicnNNYXRoT3BSYW5nZSIsInJzTm9uQ2hhclJhbmdlIiwicnNQdW5jdHVhdGlvblJhbmdlIiwicnNTcGFjZVJhbmdlIiwicnNVcHBlclJhbmdlIiwicnNCcmVha1JhbmdlIiwicnNBcG9zIiwicnNCcmVhayIsInJzRGlnaXRzIiwicnNEaW5nYmF0IiwicnNMb3dlciIsInJzTWlzYyIsInJzVXBwZXIiLCJyc01pc2NMb3dlciIsInJzTWlzY1VwcGVyIiwicnNPcHRDb250ckxvd2VyIiwicnNPcHRDb250clVwcGVyIiwicnNPcmRMb3dlciIsInJzT3JkVXBwZXIiLCJyc0Vtb2ppIiwicmVVbmljb2RlV29yZCIsInVuaWNvZGVXb3JkcyIsIndvcmRzIiwicmVBcG9zIiwiY3JlYXRlQ29tcG91bmRlciIsImNhbGxiYWNrIiwiY2FtZWxDYXNlIiwid29yZCIsImlzTnVsbCIsIm1hcEtleXMiLCJpc1VuZGVmaW5lZCIsInByZWZpeCIsInN1YmplY3QiLCJkZWxpbWV0ZXIiLCJwcmVmaXhlciIsIkNPTE9SUyIsImNvbG9yIiwibmFtZXNwYWNlIiwiQm9vbGVhbiIsImNsYXNzZXMiLCJpbnN0YW5jZSIsInRleHRDb2xvciIsImJnQ29sb3IiLCJib3JkZXJDb2xvciIsImJnR3JhZGllbnRDb2xvciIsImNvbXB1dGVkIiwidGV4dENvbG9yQ2xhc3NlcyIsInRyaW0iLCJib3JkZXJDb2xvckNsYXNzZXMiLCJiZ0NvbG9yQ2xhc3NlcyIsImJnR3JhZGllbnRDb2xvckNsYXNzZXMiLCJjb2xvcmFibGVDbGFzc2VzIiwic3JPbmx5Iiwic3JPbmx5Rm9jdXNhYmxlIiwic2NyZWVucmVhZGVyQ2xhc3NlcyIsIm1peGlucyIsIkNvbG9yYWJsZSIsIlNjcmVlbnJlYWRlcnMiLCJleHRlbmQiLCJIZWxwVGV4dCIsIkZvcm1MYWJlbCIsImxhYmVsIiwiaW52YWxpZCIsInZhbGlkIiwiRm9ybUZlZWRiYWNrIiwiaWQiLCJOdW1iZXIiLCJwbGFjZWhvbGRlciIsInJlcXVpcmVkIiwiZ3JvdXAiLCJlcnJvciIsImVycm9ycyIsImZlZWRiYWNrIiwiYmluZEV2ZW50cyIsImRlZmF1bHRDb250cm9sQ2xhc3MiLCJoaWRlTGFiZWwiLCJzcGFjaW5nIiwidmFsaWRhdGUiLCJpbmRleE9mIiwiaW5saW5lIiwicGxhaW50ZXh0IiwicmVhZG9ubHkiLCJkaXNhYmxlZCIsImhlbHBUZXh0IiwiZXZlbnRzIiwiZ2V0SW5wdXRGaWVsZCIsIiRlbCIsImdldEZpZWxkRXJyb3JzIiwidXBkYXRlZCIsImNhbGxiYWNrcyIsImludmFsaWRGZWVkYmFjayIsInZhbGlkRmVlZGJhY2siLCJjb250cm9sQ2xhc3MiLCJjb250cm9sU2l6ZUNsYXNzIiwiY29udHJvbENsYXNzZXMiLCJoYXNEZWZhdWx0U2xvdCIsIiRzbG90cyIsIkZvcm1Db250cm9sIiwiSW5wdXRGaWVsZCIsImtlYmFiQ2FzZSIsIm5vZGVzIiwiJG9wdGlvbnMiLCJleHRlbmRzIiwiQmFzZVR5cGUiLCJuYXRpdmVJc0Zpbml0ZSIsImlzRmluaXRlIiwiaGVpZ2h0IiwiY2VudGVyIiwiZml4ZWQiLCJyZWxhdGl2ZSIsIm1pbkhlaWdodCIsIkFjdGl2aXR5SW5kaWNhdG9yRG90cyIsIkFjdGl2aXR5SW5kaWNhdG9yU3Bpbm5lciIsImNvbXB1dGVkTWluSGVpZ2h0IiwidW5pdCIsIkFjdGl2aXR5SW5kaWNhdG9yIiwiS0VZQ09ERSIsIkVTQyIsIkxFRlQiLCJVUCIsIlJJR0hUIiwiRE9XTiIsIkVOVEVSIiwiU1BBQ0UiLCJUQUIiLCJBUElfUkVRVUVTVF9PUFRJT05TIiwiUGxhY2VBdXRvY29tcGxldGVMaXN0IiwiZ2V0SW5wdXRFbGVtZW50IiwiZ2V0UmVxdWVzdE9wdGlvbnMiLCJpbnB1dCIsImlzRW1wdHkiLCJnZW9jb2RlIiwicmVxdWVzdCIsImFjdGl2aXR5IiwiJGdlb2NvZGVyIiwicmVzcG9uc2UiLCJzdGF0dXMiLCJnb29nbGUiLCJtYXBzIiwicGxhY2VzIiwiUGxhY2VzU2VydmljZVN0YXR1cyIsIk9LIiwic2VsZWN0IiwicGxhY2VJZCIsInBsYWNlX2lkIiwidGhlbiIsImhpZGUiLCJxdWVyeSIsImZvcm1hdHRlZF9hZGRyZXNzIiwic2VhcmNoIiwicHJlZGljdGlvbnMiLCJzaG93UHJlZGljdGlvbnMiLCIkc2VydmljZSIsImdldFBsYWNlUHJlZGljdGlvbnMiLCJzaG93IiwidXAiLCJmb2N1c2VkIiwicGFyZW50RWxlbWVudCIsInByZXZpb3VzRWxlbWVudFNpYmxpbmciLCJmb2N1cyIsImxpbmtzIiwicXVlcnlTZWxlY3RvckFsbCIsImRvd24iLCJuZXh0RWxlbWVudFNpYmxpbmciLCJvbktleWRvd24iLCJrZXlDb2RlIiwicHJldmVudERlZmF1bHQiLCJvbktleXVwIiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50IiwiYmx1ciIsImNvbnRhaW5zIiwicmVsYXRlZFRhcmdldCIsIm9uSXRlbUJsdXIiLCJvbkl0ZW1DbGljayIsImNoaWxkIiwibW91bnRlZCIsImFwaUtleSIsIkdlb2NvZGVyIiwiQXV0b2NvbXBsZXRlU2VydmljZSIsImFzc2lnbk1lcmdlVmFsdWUiLCJhbGxvY1Vuc2FmZSIsImNsb25lQnVmZmVyIiwiaXNEZWVwIiwiY29weSIsImNsb25lQXJyYXlCdWZmZXIiLCJhcnJheUJ1ZmZlciIsImNsb25lVHlwZWRBcnJheSIsInR5cGVkQXJyYXkiLCJjb3B5QXJyYXkiLCJvYmplY3RDcmVhdGUiLCJjcmVhdGUiLCJiYXNlQ3JlYXRlIiwiaW5pdENsb25lT2JqZWN0IiwiaXNBcnJheUxpa2VPYmplY3QiLCJvYmplY3RDdG9yU3RyaW5nIiwiaXNQbGFpbk9iamVjdCIsInNhZmVHZXQiLCJ0b1BsYWluT2JqZWN0IiwiYmFzZU1lcmdlRGVlcCIsInNyY0luZGV4IiwibWVyZ2VGdW5jIiwiaXNDb21tb24iLCJpc1R5cGVkIiwiYmFzZU1lcmdlIiwibWVyZ2UiLCIkbWVyZ2VDbGFzc2VzIiwidnVlIiwibWVyZ2VDbGFzc2VzIiwiUGxhY2VBdXRvZmlsbCIsIlBsYWNlQXV0b2NvbXBsZXRlRmllbGQiLCJQbGFjZUF1dG9jb21wbGV0ZUxpc3RJdGVtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7RUFBQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFO0VBQ25DLEVBQUUsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0VBQ2hCLE1BQU0sTUFBTSxHQUFHLEtBQUssSUFBSSxJQUFJLEdBQUcs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Q0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7O0VBRXRDLEVBQUUsT0FBTyxLQUFLLEdBQUcsQ0FBQyxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEQsQ0FBQzs7RUNkRDtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQSxTQUFTLFlBQVksQ0FBQyxHQUFHLEVBQUU7RUFDM0IsRUFBRSxPQUFPLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQy9DLENBQUM7O0VDWEQ7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQSxTQUFTLFlBQVksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFO0VBQ2xDLEVBQUUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVE7RUFDMUIsTUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQzs7RUFFdEMsRUFBRSxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7RUFDakIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7RUFDaEIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7RUFDNUIsR0FBRyxNQUFNO0VBQ1QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO0VBQzNCLEdBQUc7RUFDSCxFQUFFLE9BQU8sSUFBSSxDQUFDO0VBQ2QsQ0FBQzs7RUNqQkQ7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQSxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUU7RUFDNUIsRUFBRSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7RUFDaEIsTUFBTSxNQUFNLEdBQUcsT0FBTyxJQUFJLElBQUksR0FBRyxDQUFDLEdBQUcsT0FBTyxD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
