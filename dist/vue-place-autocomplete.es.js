/**
 * vue-place-autocomplete
 *
 * 0.2.1
 * 2018-11-12
 */

function extend(...args) {
    return Object.assign(...args);
}

function isNull(value) {
    return value === null;
}

function isArray(value) {
    return Array.isArray(value);
}

function isObject(value) {
    return (typeof value === 'object') && !isNull(value) && !isArray(value);
}

function isNumber(value) {
    return (typeof value === 'number') || (
        value ? value.toString() === '[object Number]' : false
    );
}

function isNumeric(value) {
    return isNumber(value) || (
        !!value && !isArray(value) && !!value.toString().match(/^-?[\d.,]+$/)
    );
}

function key(value) {
    return isNumeric(value) ? parseFloat(value) : value;
}

function each(subject, fn) {
    for(const i in subject) {
        fn(subject[i], key(i));
    }
}

function isBoolean(value) {
    return value === true || value === false;
}

function isUndefined(value) {
    return typeof value === 'undefined';
}

function isEmpty(value) {
    if(isArray(value)) {
        return value.length === 0;
    }
    else if(isObject(value)) {
        return Object.keys(value).length === 0;
    }

    return value === '' || isNull(value) || isUndefined(value);
}

function kebabCase(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/\s+/g, '-')
        .replace(/_/g, '-')
        .toLowerCase();
}

function mapKeys(object, fn) {
    const mapped = {};

    each(object, (value, key) => {
        mapped[fn(value, key)] = value;
    });

    return mapped;
}

var ALIASES = {
  'street': ['street_number', 'route', 'intersection'],
  'city': ['locality'],
  'state': ['administrative_area_level_1'],
  'zip': ['postal_code'],
  'zipcode': ['postal_code'],
  'county': ['administrative_area_level_2']
};

function intersection(a, b) {
  return a.filter(function (value) {
    return b.indexOf(value) !== -1;
  }).filter(function (e, i, c) {
    return c.indexOf(e) === i;
  });
}

function extract(type, modifiers, geocoder) {
  if (geocoder[type]) {
    return geocoder[type];
  } else if (type === 'latitude') {
    return geocoder.geometry.location.lat();
  } else if (type === 'longitude') {
    return geocoder.geometry.location.lng();
  }

  var aliases = ALIASES[type] || (isArray(type) ? type : [type]);
  var values = geocoder.address_components.map(function (component) {
    if (intersection(component.types, aliases).length) {
      return component[modifiers.short ? 'short_name' : 'long_name'];
    }
  }).filter(function (value) {
    return !!value;
  });
  return values.length ? values.join(' ') : null;
}

function update(binding, vnode, value) {
  var props = binding.expression.split('.');
  var prop = props.pop();
  var model = props.reduce(function (carry, i) {
    return carry[i];
  }, vnode.context);
  value = isArray(value) ? value.join(' ') : value;

  if (binding.modifiers.query) {
    vnode.componentInstance.query = value;
  }

  model[prop] = value;
  return value;
}

var PlaceAutofill = {
  bind: function bind(el, binding, vnode) {
    vnode.componentInstance.$on('select', function (place, geocoder) {
      vnode.context.$nextTick(function () {
        update(binding, vnode, extract(binding.arg, binding.modifiers, geocoder));
      });
    });
  }
};

function geocode(options) {
  var geocoder = new window.google.maps.Geocoder();
  return new Promise(function (resolve, reject) {
    if (!options.geometry) {
      geocoder.geocode(options, function (results, status) {
        if (status === window.google.maps.GeocoderStatus.OK) {
          resolve(results);
        } else {
          reject(status);
        }
      });
    } else {
      resolve([options]);
    }
  });
}

const LOADED_SCRIPTS = {};

function element(url) {
    const script = document.createElement('script');
    script.setAttribute('src', url);
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('charset', 'utf-8');
    return script;
}

function append(script) {
    if(document.querySelector('head')) {
        document.querySelector('head').appendChild(script);
    }
    else {
        document.querySelector('body').appendChild(script);
    }

    return script;
}

function script(url) {
    if(LOADED_SCRIPTS[url] instanceof Promise) {
        return LOADED_SCRIPTS[url];
    }
    else if(LOADED_SCRIPTS[url] || document.querySelector(`script[src="${url}"]`)) {
        return new Promise((resolve, reject) => {
            resolve(LOADED_SCRIPTS[url]);
        });
    }

    LOADED_SCRIPTS[url] = new Promise((resolve, reject) => {
        try {
            append(element(url)).addEventListener('load', event => {
                resolve(LOADED_SCRIPTS[url] = event);
            });
        }
        catch (e) {
            reject(e);
        }
    });

    return LOADED_SCRIPTS[url];
}

//
//
//
//
//
//
//
//
//
var script$1 = {
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

function normalizeComponent(compiledTemplate, injectStyle, defaultExport, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, isShadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof isShadowMode === 'function') {
        createInjectorSSR = createInjector;
        createInjector = isShadowMode;
        isShadowMode = false;
    }
    // Vue.extend constructor export interop
    const options = typeof defaultExport === 'function' ? defaultExport.options : defaultExport;
    // render functions
    if (compiledTemplate && compiledTemplate.render) {
        options.render = compiledTemplate.render;
        options.staticRenderFns = compiledTemplate.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (injectStyle) {
                injectStyle.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (injectStyle) {
        hook = isShadowMode
            ? function () {
                injectStyle.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
            }
            : function (context) {
                injectStyle.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return defaultExport;
}

/* script */
            const __vue_script__ = script$1;
/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "li",
    {
      staticClass: "autocomplete-list-item",
      on: { focus: _vm.onFocus, onBlur: _vm.onBlur }
    },
    [
      _c(
        "a",
        {
          attrs: { href: "#" },
          on: {
            click: function($event) {
              $event.preventDefault();
              return _vm.onClick($event)
            },
            focus: _vm.onFocus,
            blur: _vm.onBlur
          }
        },
        [
          _c("span", { staticClass: "autocomplete-list-item-icon" }),
          _vm._v(" "),
          _c(
            "span",
            { staticClass: "autocomplete-list-item-label" },
            [_vm._t("default")],
            2
          )
        ]
      )
    ]
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var PlaceAutocompleteListItem = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

//
var script$2 = {
  name: 'place-autocomplete-list',
  components: {
    PlaceAutocompleteListItem: PlaceAutocompleteListItem
  },
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

/* script */
            const __vue_script__$1 = script$2;
            
/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "autocomplete-list-wrapper" }, [
    _c(
      "ul",
      { staticClass: "autocomplete-list" },
      _vm._l(_vm.items, function(item, i) {
        return _c(
          "place-autocomplete-list-item",
          {
            key: item.id,
            attrs: { item: item },
            on: { click: _vm.onClick, focus: _vm.onFocus, blur: _vm.onBlur }
          },
          [_vm._v("\n            " + _vm._s(item[_vm.display]) + "\n        ")]
        )
      })
    )
  ])
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var PlaceAutocompleteList = normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    undefined
  );

function prefix(subject, prefix, delimeter = '-') {
    const prefixer = (value, key$$1) => {
        const string = (key$$1 || value)
            .replace(new RegExp(`^${prefix}${delimeter}?`), '');

        return [prefix, string].filter(value => !!value).join(delimeter);
    };

    if(isBoolean(subject)) {
        return subject;
    }

    if(isObject(subject)) {
        return mapKeys(subject, prefixer);
    }

    return prefixer(subject);
}

var Colorable = {

    computed: {

        colorableClasses() {
            const classes = {};

            for(let i in this.$attrs) {
                if(i.match(/^bg|text|border|bg-gradient-/)) {
                    classes[i] = true;
                }
            }

            return classes;
        }

    }

};

var MergeClasses = {

    methods: {

        mergeClasses() {
            let classes = {};

            each([].slice.call(arguments), arg => {
                if(isObject(arg)) {
                    extend(classes, arg);
                }
                else if(isArray(arg)) {
                    classes = classes.concat(arg);
                }
                else if(arg) {
                    classes[arg] = true;
                }
            });

            return classes;
        }

    }

};

const emptyClass = 'is-empty';
const focusClass = 'has-focus';
const changedClass = 'has-changed';
const customPrefix = 'custom';

function addClass(el, vnode, css) {
    // el.classList.add(css);
    vnode.context.$el.classList.add(css);
}

function removeClass(el, vnode, css) {
    // el.classList.remove(css);
    vnode.context.$el.classList.remove(css);
}

function addEmptyClass(el, vnode) {
    if(isEmpty(el.value) || (el.tagName === 'SELECT' && el.selectedIndex === -1)) {
        addClass(el, vnode, emptyClass);
    }
}

var FormControl = {

    inheritAttrs: false,

    mixins: [
        Colorable,
        MergeClasses
    ],

    props: {

        /**
         * Show type activity indicator.
         *
         * @property Boolean
         */
        activity: {
            type: Boolean,
            default: false
        },

        /**
         * Is the form control a custom styled component.
         *
         * @property Boolean
         */
        custom: {
            type: Boolean,
            default: false
        },

        /**
         * The value of label element. If no value, no label will appear.
         *
         * @property String
         */
        label: [Number, String],

        /**
         * The field id attribute value.
         *
         * @property String
         */
        value: {
            default: null
        },

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
            default() {
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
            default() {
                return ['focus', 'blur', 'change', 'click', 'keyup', 'keydown', 'progress', 'paste'];
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
         * The invalid property
         *
         * @property String
         */
        invalid: Boolean,

        /**
         * The valid property
         *
         * @property String
         */
        valid: Boolean,

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
            validate: value => ['sm', 'md', 'lg'].indexOf(value) !== -1
        },

        /**
         * Display the form field inline
         *
         * @property String
         */
        inline: Boolean,

        /**
         * Some instructions to appear under the field label
         *
         * @property String
         */
        helpText: [Number, String],

        /**
         * The maxlength attribute
         *
         * @property String
         */
        maxlength: [Number, String]

    },

    directives: {
        bindEvents: {
            bind(el, binding, vnode) {
                // Add/remove the has-focus class from the form control
                el.addEventListener('focus', event => {
                    addClass(el, vnode, focusClass);
                });

                el.addEventListener('blur', event => {
                    if(el.classList.contains(emptyClass)) {
                        removeClass(el, vnode, changedClass);
                    }

                    removeClass(el, vnode, focusClass);
                });

                el.addEventListener('input', e => {
                    addClass(el, vnode, changedClass);

                    if(!isEmpty(el.value) || (el.tagName === 'SELECT' && el.selectedIndex > -1)) {
                        removeClass(el, vnode, emptyClass);
                    }
                    else {
                        addClass(el, vnode, emptyClass);
                    }
                });

                // Bubble the native events up to the vue component.
                each(vnode.context.bindEvents, name => {
                    el.addEventListener(name, event => {
                        vnode.context.$emit(name, event);
                    });
                });
            },
            inserted(el, binding, vnode) {
                addEmptyClass(el, vnode);
            },
            update(el, binding, vnode) {
                addEmptyClass(el, vnode);
            }
        }
    },

    methods: {

        blur() {
            if(this.getInputField()) {
                this.getInputField().blur();
            }
        },

        focus() {
            if(this.getInputField()) {
                this.getInputField().focus();
            }
        },

        getInputField() {
            return this.$el.querySelector(
                '.form-control, input, select, textarea'
            );
        },

        getFieldErrors() {
            let errors = this.error || this.errors;

            if(isObject(this.errors)) {
                errors = this.errors[this.$attrs.name || this.$attrs.id];
            }

            return !errors || isArray(errors) || isObject(errors) ? errors : [errors];
        }

    },

    computed: {

        controlAttributes() {
            return Object.keys(this.$attrs)
                .concat([['class', this.controlClasses]])
                .reduce((carry, key$$1) => {
                    if(isArray(key$$1)) {
                        carry[key$$1[0]] = key$$1[1];
                    }
                    else {
                        carry[key$$1] = this[key$$1] || this.$attrs[key$$1];
                    }

                    return carry;
                }, {});
        },

        controlClass() {
            return this.custom ? this.customControlClass : (
                this.defaultControlClass + (this.plaintext ? '-plaintext' : '')
            );
        },

        controlSizeClass() {
            return prefix(this.size, this.controlClass);
        },

        customControlClass() {
            return 'custom-control';
        },

        formGroupClasses() {
            const name = prefix(this.$options.name, this.custom ? customPrefix : '');

            return this.mergeClasses(name, prefix(this.size, name), {
                'has-activity': this.activity,
                'is-valid': !!(this.valid || this.validFeedback),
                'is-invalid': !!(this.invalid || this.invalidFeedback)
            });
        },

        controlClasses() {
            return this.mergeClasses(
                this.controlClass,
                this.colorableClasses,
                this.controlSizeClass,
                (this.spacing || ''),
                ((this.valid || this.validFeedback) ? 'is-valid' : ''),
                ((this.invalid || this.invalidFeedback) ? 'is-invalid' : '')
            );
        },

        hasDefaultSlot() {
            return !!this.$slots.default;
        },

        invalidFeedback() {
            const errors = this.getFieldErrors();

            return this.error || (
                isArray(errors) ? errors.join('<br>') : errors
            );
        },

        validFeedback() {
            return isArray(this.feedback) ? this.feedback.join('<br>') : this.feedback;
        }

    }

};

//
//
//
//
//
//
//
//

var script$3 = {

    name: 'form-group'

};

/* script */
            const __vue_script__$2 = script$3;
/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "form-group" }, [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var FormGroup = normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    undefined,
    undefined
  );

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
        screenreaderClasses() {
            return {
                'sr-only': this.srOnly,
                'sr-only-focusable': this.srOnlyFocusable
            };
        }
    }

};

//

var script$4 = {

    name: 'help-text',

    mixins: [
        Colorable,
        Screenreaders
    ],

    computed: {
        classes() {
            return extend({}, this.screenreaderClasses, this.colorableClasses);
        }
    }

};

/* script */
            const __vue_script__$3 = script$4;
            
/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "small",
    { staticClass: "form-text", class: _vm.classes },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$3 = undefined;
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var HelpText = normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    undefined,
    undefined
  );

//

var script$5 = {

    name: 'form-label',

    mixins: [
        Colorable,
        Screenreaders
    ],

    computed: {
        classes() {
            return extend({}, this.screenreaderClasses, this.colorableClasses);
        }
    }

};

/* script */
            const __vue_script__$4 = script$5;
            
/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("label", { class: _vm.classes }, [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  const __vue_inject_styles__$4 = undefined;
  /* scoped */
  const __vue_scope_id__$4 = undefined;
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var FormLabel = normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    undefined,
    undefined
  );

//
// import { extend, omitBy, isNull, isUndefined } from '../../Helpers/Functions';

var script$6 = {

    name: 'form-control',

    mixins: [
        Colorable,
        FormControl
    ],

    props: {

        element: {
            type: String,
            required: true
        }

    }

};

/* script */
            const __vue_script__$5 = script$6;
            
/* template */
var __vue_render__$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    _vm.element,
    _vm._b(
      {
        tag: "component",
        attrs: {
          "aria-label": _vm.label || _vm.name || _vm.id,
          "aria-describedby": _vm.id || _vm.name
        },
        on: {
          input: function($event) {
            _vm.$emit("input", $event.target.value);
          }
        },
        model: {
          value: _vm.testValue,
          callback: function($$v) {
            _vm.testValue = $$v;
          },
          expression: "testValue"
        }
      },
      "component",
      _vm.$attrs,
      false
    ),
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  const __vue_inject_styles__$5 = undefined;
  /* scoped */
  const __vue_scope_id__$5 = undefined;
  /* module identifier */
  const __vue_module_identifier__$5 = undefined;
  /* functional template */
  const __vue_is_functional_template__$5 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var FormControl$1 = normalizeComponent(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    undefined,
    undefined
  );

//

var script$7 = {

    name: 'form-feedback',

    mixins: [
        Colorable
    ],

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

/* script */
            const __vue_script__$6 = script$7;
            
/* template */
var __vue_render__$6 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      class: {
        "invalid-feedback": _vm.invalid,
        "valid-feedback": _vm.valid && !_vm.invalid
      }
    },
    [_vm._t("default", [_vm._v(_vm._s(_vm.label))])],
    2
  )
};
var __vue_staticRenderFns__$6 = [];
__vue_render__$6._withStripped = true;

  /* style */
  const __vue_inject_styles__$6 = undefined;
  /* scoped */
  const __vue_scope_id__$6 = undefined;
  /* module identifier */
  const __vue_module_identifier__$6 = undefined;
  /* functional template */
  const __vue_is_functional_template__$6 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var FormFeedback = normalizeComponent(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    undefined,
    undefined
  );

function unit(height) {
    return isFinite(height) ? height + 'px' : height;
}

//
//
//
//
//
//

var script$8 = {

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
        classes: function() {
            const classes = {};

            classes[this.$options.name] = !!this.$options.name;
            classes[this.prefix + this.size.replace(this.prefix, '')] = !!this.size;

            return classes;
        }
    }

};

/* script */
            const __vue_script__$7 = script$8;
            
/* template */
var __vue_render__$7 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "activity-indicator", class: _vm.classes },
    _vm._l(_vm.nodes, function(i) {
      return _c("div")
    })
  )
};
var __vue_staticRenderFns__$7 = [];
__vue_render__$7._withStripped = true;

  /* style */
  const __vue_inject_styles__$7 = undefined;
  /* scoped */
  const __vue_scope_id__$7 = undefined;
  /* module identifier */
  const __vue_module_identifier__$7 = undefined;
  /* functional template */
  const __vue_is_functional_template__$7 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var BaseType = normalizeComponent(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    undefined,
    undefined
  );

var script$9 = {

    name: 'activity-indicator-dots',

    extends: BaseType
};

/* script */
            const __vue_script__$8 = script$9;
/* template */

  /* style */
  const __vue_inject_styles__$8 = undefined;
  /* scoped */
  const __vue_scope_id__$8 = undefined;
  /* module identifier */
  const __vue_module_identifier__$8 = undefined;
  /* functional template */
  const __vue_is_functional_template__$8 = undefined;
  /* style inject */
  
  /* style inject SSR */
  

  
  var ActivityIndicatorDots = normalizeComponent(
    {},
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    undefined,
    undefined
  );

var script$a = {

    name: 'activity-indicator-spinner',

    extends: BaseType,

    props: extend({}, BaseType.props, {
        nodes: {
            type: Number,
            default: 12
        }
    })
};

/* script */
            const __vue_script__$9 = script$a;
/* template */

  /* style */
  const __vue_inject_styles__$9 = undefined;
  /* scoped */
  const __vue_scope_id__$9 = undefined;
  /* module identifier */
  const __vue_module_identifier__$9 = undefined;
  /* functional template */
  const __vue_is_functional_template__$9 = undefined;
  /* style inject */
  
  /* style inject SSR */
  

  
  var ActivityIndicatorSpinner = normalizeComponent(
    {},
    __vue_inject_styles__$9,
    __vue_script__$9,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
    undefined,
    undefined
  );

//

var script$b = {

    name: 'activity-indicator',

    extends: BaseType,

    props: {

        center: Boolean,

        fixed: Boolean,

        label: String,

        relative: Boolean,

        type: {
            type: String,
            default: 'dots'
        },

        height: [String, Number],

        maxHeight: [String, Number],

        minHeight: [String, Number],

        width: [String, Number],

        maxWidth: [String, Number],

        minWidth: [String, Number]

    },

    components: {
        ActivityIndicatorDots,
        ActivityIndicatorSpinner
    },

    computed: {

        style() {
            return {
                width: unit(this.width),
                maxWidth: unit(this.maxWidth),
                minWidth: unit(this.minWidth),
                height: unit(this.height),
                maxHeight: unit(this.maxHeight),
                minHeight: unit(this.minHeight)
            };
        },

        component() {
            return kebabCase(this.prefix + this.type.replace(this.prefix, ''));
        }
    }

};

/* script */
            const __vue_script__$a = script$b;
            
/* template */
var __vue_render__$8 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.center
    ? _c(
        "div",
        {
          staticClass: "center-wrapper",
          class: {
            "position-relative": _vm.relative,
            "position-fixed": _vm.fixed
          },
          style: _vm.style
        },
        [
          _c(
            "div",
            {
              staticClass:
                "center-content d-flex flex-column align-items-center"
            },
            [
              _c(_vm.component, {
                tag: "component",
                attrs: { size: _vm.size, prefix: _vm.prefix }
              }),
              _vm._v(" "),
              _vm.label
                ? _c("div", {
                    staticClass: "activity-indicator-label",
                    domProps: { innerHTML: _vm._s(_vm.label) }
                  })
                : _vm._e()
            ],
            1
          )
        ]
      )
    : _c(
        "div",
        {
          staticClass:
            "d-flex flex-column justify-content-center align-items-center",
          style: _vm.style
        },
        [
          _c(_vm.component, {
            tag: "component",
            attrs: { size: _vm.size, prefix: _vm.prefix }
          }),
          _vm._v(" "),
          _vm.label
            ? _c("div", {
                staticClass: "activity-indicator-label",
                domProps: { innerHTML: _vm._s(_vm.label) }
              })
            : _vm._e()
        ],
        1
      )
};
var __vue_staticRenderFns__$8 = [];
__vue_render__$8._withStripped = true;

  /* style */
  const __vue_inject_styles__$a = undefined;
  /* scoped */
  const __vue_scope_id__$a = undefined;
  /* module identifier */
  const __vue_module_identifier__$a = undefined;
  /* functional template */
  const __vue_is_functional_template__$a = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var ActivityIndicator = normalizeComponent(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$a,
    __vue_script__$a,
    __vue_scope_id__$a,
    __vue_is_functional_template__$a,
    __vue_module_identifier__$a,
    undefined,
    undefined
  );

//

var script$c = {

    name: 'input-field',

    mixins: [
        Colorable,
        FormControl
    ],

    components: {
        HelpText,
        FormControl: FormControl$1,
        FormGroup,
        FormLabel,
        FormFeedback,
        ActivityIndicator
    }

};

/* script */
            const __vue_script__$b = script$c;
/* template */
var __vue_render__$9 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "form-group",
    { class: _vm.formGroupClasses },
    [
      _vm._t("label", [
        _vm.label || _vm.hasDefaultSlot
          ? _c("form-label", {
              ref: "label",
              attrs: { for: _vm.$attrs.id },
              domProps: { innerHTML: _vm._s(_vm.label) }
            })
          : _vm._e()
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "form-group-inner" },
        [
          _vm._t("control", [
            _c(
              "input",
              _vm._b(
                {
                  directives: [
                    { name: "bind-events", rawName: "v-bind-events" }
                  ],
                  domProps: { value: _vm.value },
                  on: {
                    input: function($event) {
                      _vm.$emit("input", $event.target.value);
                    }
                  }
                },
                "input",
                _vm.controlAttributes,
                false
              )
            )
          ]),
          _vm._v(" "),
          _vm._t("activity", [
            _c(
              "transition",
              { attrs: { name: "slide-fade" } },
              [
                _vm.activity
                  ? _c("activity-indicator", {
                      key: "test",
                      ref: "activity",
                      attrs: { type: "dots", size: _vm.size }
                    })
                  : _vm._e()
              ],
              1
            )
          ])
        ],
        2
      ),
      _vm._v(" "),
      _vm._t("feedback", [
        _vm.validFeedback
          ? _c("form-feedback", {
              ref: "feedback",
              attrs: { valid: "" },
              domProps: { innerHTML: _vm._s(_vm.validFeedback) }
            })
          : _vm.invalidFeedback
            ? _c("form-feedback", {
                ref: "feedback",
                attrs: { invalid: "" },
                domProps: { innerHTML: _vm._s(_vm.invalidFeedback) }
              })
            : _vm._e()
      ]),
      _vm._v(" "),
      _vm._t("help", [
        _vm.helpText
          ? _c("help-text", {
              ref: "help",
              domProps: { innerHTML: _vm._s(_vm.helpText) }
            })
          : _vm._e()
      ])
    ],
    2
  )
};
var __vue_staticRenderFns__$9 = [];
__vue_render__$9._withStripped = true;

  /* style */
  const __vue_inject_styles__$b = undefined;
  /* scoped */
  const __vue_scope_id__$b = undefined;
  /* module identifier */
  const __vue_module_identifier__$b = undefined;
  /* functional template */
  const __vue_is_functional_template__$b = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var InputField = normalizeComponent(
    { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
    __vue_inject_styles__$b,
    __vue_script__$b,
    __vue_scope_id__$b,
    __vue_is_functional_template__$b,
    __vue_module_identifier__$b,
    undefined,
    undefined
  );

//
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
var script$d = {
  name: 'place-autocomplete-field',
  mixins: [FormControl],
  components: {
    FormGroup: FormGroup,
    InputField: InputField,
    ActivityIndicator: ActivityIndicator,
    PlaceAutocompleteList: PlaceAutocompleteList
  },
  props: {
    apiKey: {
      type: String,
      required: true
    },
    baseUri: {
      type: String,
      default: 'https://maps.googleapis.com/maps/api/js'
    },
    componentRestrictions: {
      type: [Boolean, Object, String],
      default: false
    },
    custom: Boolean,
    libraries: {
      type: Array,
      default: function _default() {
        return ['geometry', 'places'];
      }
    },
    bounds: {
      type: [Boolean, Object, String],
      default: false
    },
    location: {
      type: [Boolean, Object, String],
      default: false
    },
    offset: {
      type: Boolean,
      default: false
    },
    radius: {
      type: Boolean,
      default: false
    },
    types: {
      type: [Boolean, Array],
      default: false
    }
  },
  methods: {
    getInputElement: function getInputElement() {
      return this.$el.querySelector('input');
    },
    getRequestOptions: function getRequestOptions() {
      var options = {
        input: this.getInputElement().value
      };

      for (var i in API_REQUEST_OPTIONS) {
        if (this[i] !== undefined || this[i] !== null) {
          options[i] = this[i];
        }
      }

      return options;
    },
    select: function select(place) {
      var _this = this;

      geocode({
        placeId: place.place_id
      }).then(function (response) {
        _this.hide();

        _this.$emit('input', _this.query = response[0].formatted_address);

        _this.$emit('select', place, response[0]);
      });
    },
    search: function search() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        if (!_this2.getInputElement().value) {
          _this2.predictions = false;
          _this2.showPredictions = false; // reject(new Error('Input empty'));
        } else {
          _this2.activity = true;

          _this2.$service.getPlacePredictions(_this2.getRequestOptions(), function (response, status) {
            _this2.activity = false;

            switch (status) {
              case window.google.maps.places.PlacesServiceStatus.OK:
                resolve(response);
                break;

              default:
                reject(new Error("Error with status: ".concat(status)));
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
      var _this3 = this;

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
        _this3.predictions = response;
        _this3.showPredictions = true;
      }, function (error) {
        if (error) {
          _this3.predictions = false;
        }
      });
    },
    onFocus: function onFocus(event) {
      if (this.query) {
        if (!this.predictions.length) {
          this.onKeyup(event);
        }

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
    var _this4 = this;

    script("".concat(this.baseUri, "?key=").concat(this.apiKey, "&libraries=").concat(this.libraries.join(','))).then(function () {
      _this4.$geocoder = new window.google.maps.Geocoder();
      _this4.$service = new window.google.maps.places.AutocompleteService();
      _this4.loaded = true;

      _this4.$emit('loaded');
    });
  },
  data: function data() {
    return {
      query: this.value,
      activity: false,
      loaded: false,
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

/* script */
            const __vue_script__$c = script$d;
/* template */
var __vue_render__$a = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      staticClass: "autocomplete-field",
      on: { keydown: _vm.onKeydown, keyup: _vm.onKeyup }
    },
    [
      _c(
        "input-field",
        {
          attrs: {
            name: _vm.name,
            id: _vm.id,
            type: _vm.type,
            placeholder: _vm.placeholder,
            required: _vm.required,
            disabled: _vm.disabled || _vm.readonly,
            readonly: _vm.readonly,
            pattern: _vm.pattern,
            "aria-label": _vm.label,
            "aria-describedby": _vm.id,
            label: _vm.label,
            errors: _vm.errors,
            value: _vm.value,
            custom: _vm.custom,
            autocomplete: "no"
          },
          on: {
            input: function($event) {
              _vm.$emit("input", _vm.query);
            },
            focus: _vm.onFocus,
            blur: _vm.onBlur
          },
          model: {
            value: _vm.query,
            callback: function($$v) {
              _vm.query = $$v;
            },
            expression: "query"
          }
        },
        [
          _vm.activity
            ? _c("activity-indicator", {
                attrs: { size: "xs", type: "spinner" }
              })
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _vm.predictions && _vm.showPredictions
        ? _c("place-autocomplete-list", {
            attrs: { items: _vm.predictions },
            on: { "item:click": _vm.onItemClick, "item:blur": _vm.onItemBlur }
          })
        : _vm._e()
    ],
    1
  )
};
var __vue_staticRenderFns__$a = [];
__vue_render__$a._withStripped = true;

  /* style */
  const __vue_inject_styles__$c = undefined;
  /* scoped */
  const __vue_scope_id__$c = undefined;
  /* module identifier */
  const __vue_module_identifier__$c = undefined;
  /* functional template */
  const __vue_is_functional_template__$c = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var PlaceAutocompleteField = normalizeComponent(
    { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
    __vue_inject_styles__$c,
    __vue_script__$c,
    __vue_scope_id__$c,
    __vue_is_functional_template__$c,
    __vue_module_identifier__$c,
    undefined,
    undefined
  );

function install(Vue, options) {
  Vue.directive('place-autofill', PlaceAutofill);
  Vue.component('place-autocomplete-field', PlaceAutocompleteField);
  Vue.component('place-autocomplete-list', PlaceAutocompleteList);
  Vue.component('place-autocomplete-list-item', PlaceAutocompleteListItem);
}

if (window && window.Vue) {
  window.Vue.use(install);
}

export default install;
export { PlaceAutofill, PlaceAutocompleteField, PlaceAutocompleteList, PlaceAutocompleteListItem };
//# sourceMappingURL=vue-place-autocomplete.es.js.map
