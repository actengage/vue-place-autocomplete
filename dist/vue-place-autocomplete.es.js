function camelCase(string) {
    string = string.toLowerCase().replace(/(?:(^.)|([-_\s]+.))/g, function(match) {
        return match.charAt(match.length - 1).toUpperCase();
    });

    return string.charAt(0).toLowerCase() + string.substring(1);
}

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
    return isNumber(value) || (!!value && !!value.toString().match(/^-?[\d.,]+$/));
}

function key(value) {
    return isNumeric(value) ? parseFloat(value) : value;
}

function each(subject, fn) {
    for (const i in subject) {
        fn(subject[i], key(i));
    }
}

function matches(properties) {
    return subject => {
        for (const i in properties) {
            if (isObject(properties[i])) {
                return subject[i] ? matches(properties[i])(subject[i]) : false;
            }
            else if (!subject || subject[i] !== properties[i]) {
                return false;
            }
        }

        return true;
    };
}

function isString(value) {
    return typeof value === 'string';
}

function get(object, path) {
    return (isString(path) ? path.split('.') : (!isArray(path) ? [path] : path)).reduce((a, b) => a[b], object);
}

function property(path) {
    return object => {
        return get(object, path);
    };
}

function isFunction(value) {
    return value instanceof Function;
}

function matchesProperty(path, value) {
    return subject => {
        return get(subject, path) === value;
    };
}

function predicate(value) {
    if (isObject(value)) {
        value = matches(value);
    }
    else if (isArray(value)) {
        value = matchesProperty(value[0], value[1]);
    }
    else if (!isFunction(value)) {
        value = property(value);
    }

    return value;
}

function isBoolean(value) {
    return value === true || value === false;
}

function isUndefined(value) {
    return typeof value === 'undefined';
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

function negate(fn) {
    return (...args) => isFunction(fn) ? !fn(...args) : !fn;
}

function pickBy(object, match) {
    const subject = {};

    each(object, (value, key) => {
        if (predicate(match)(value)) {
            subject[key] = value;
        }
    });

    return subject;
}

function omitBy(object, fn) {
    return pickBy(object, negate(fn));
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
    if (document.querySelector('head')) {
        document.querySelector('head').appendChild(script);
    }
    else {
        document.querySelector('body').appendChild(script);
    }

    return script;
}

function script(url) {
    if (LOADED_SCRIPTS[url] instanceof Promise) {
        return LOADED_SCRIPTS[url];
    }
    else if (LOADED_SCRIPTS[url] || document.querySelector(`script[src="${url}"]`)) {
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

var PlaceAutocompleteListItem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{staticClass:"autocomplete-list-item",on:{"focus":_vm.onFocus,"onBlur":_vm.onBlur}},[_c('a',{attrs:{"href":"#"},on:{"click":function($event){$event.preventDefault();return _vm.onClick($event)},"focus":_vm.onFocus,"blur":_vm.onBlur}},[_c('span',{staticClass:"autocomplete-list-item-icon"}),_vm._v(" "),_c('span',{staticClass:"autocomplete-list-item-label"},[_vm._t("default")],2)])])},staticRenderFns: [],

    name: 'place-autocomplete-list-item',

    props: {

        item: Object

    },

    methods: {

        onBlur(event) {
            this.$emit('blur', event, this);
        },

        onClick(event) {
            this.$emit('click', event, this);
        },

        onFocus(event) {
            this.$emit('focus', event, this);
        }

    }

};

var PlaceAutocompleteList = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"autocomplete-list-wrapper"},[_c('ul',{staticClass:"autocomplete-list"},_vm._l((_vm.items),function(item,i){return _c('place-autocomplete-list-item',{key:item.id,attrs:{"item":item},on:{"click":_vm.onClick,"focus":_vm.onFocus,"blur":_vm.onBlur}},[_vm._v(" "+_vm._s(item[_vm.display])+" ")])}))])},staticRenderFns: [],

    name: 'place-autocomplete-list',

    components: {
        PlaceAutocompleteListItem
    },

    props: {

        'items': {
            type: Array,
            default: () => {
                return [];
            }
        },

        'display': {
            type: String,
            default: 'description'
        }

    },

    methods: {

        onBlur(event, item) {
            this.$emit('item:blur', event, item);
        },

        onFocus(event, item) {
            this.$emit('item:focus', event, item);
        },

        onClick(event, item) {
            this.$emit('item:click', event, item);
        }

    }

};

function prefix(subject, prefix, delimeter = '-') {
    const prefixer = (value, key$$1) => {
        const string = (key$$1 || value)
            .replace(new RegExp(`^${prefix}${delimeter}?`), '');

        return [prefix, string].filter(value => !!value).join(delimeter);
    };

    if (isBoolean(subject)) {
        return subject;
    }

    if (isObject(subject)) {
        return mapKeys(subject, prefixer);
    }

    return prefixer(subject);
}

var FormControl = {

    props: {

        /**
         * The autocomplete attribute value.
         *
         * @property String
         */
        autocomplete: String,

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
                const events = binding.value || vnode.context.bindEvents;

                each(events, name => {
                    el.addEventListener(name, event => {
                        vnode.context.$emit(name, event);
                    });
                });
            }
        }
    },

    methods: {

        blur() {
            if (this.getInputField()) {
                this.getInputField().blur();
            }
        },

        focus() {
            if (this.getInputField()) {
                this.getInputField().focus();
            }
        },

        getInputField() {
            return this.$el.querySelector('.form-control, input, select, textarea');
        },

        getFieldErrors() {
            let errors = this.error || this.errors;

            if (isObject(this.errors)) {
                errors = this.errors[this.name || this.id];
            }

            return !errors || isArray(errors) || isObject(errors) ? errors : [errors];
        }

    },

    computed: {

        callbacks() {
            return this.bindEvents.map(event => {
                return {
                    name: event,
                    callback: this[camelCase(['on', event].join(' '))]
                };
            }).filter(event => !isUndefined(event.callback));
        },

        invalidFeedback() {
            if (this.error) {
                return this.error;
            }

            const errors = this.getFieldErrors();

            return isArray(errors) ? errors.join('<br>') : errors;
        },

        validFeedback() {
            return isArray(this.feedback) ? this.feedback.join('<br>') : this.feedback;
        },

        controlClass() {
            return this.defaultControlClass + (this.plaintext ? '-plaintext' : '');
        },

        controlSizeClass() {
            return prefix(this.size, this.controlClass);
        },

        controlClasses() {
            return [
                this.controlClass,
                this.controlSizeClass,
                (this.spacing || ''),
                (this.invalidFeedback ? 'is-invalid' : '')
            ].join(' ');
        },

        hasDefaultSlot() {
            return !!this.$slots.default;
        }

    }

};

var FormGroup = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group"},[_vm._t("default")],2)},staticRenderFns: [],

    name: 'form-group'

};

const VueInstaller = {
    use,
    script,
    plugin,
    plugins,
    filter,
    filters,
    component,
    components,
    directive,
    directives,
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
    each(plugins, (def, name) => {
        plugin(Vue, name, def);
    });
}

function filter(Vue, name, def) {
    if (!VueInstaller.$filters[name]) {
        Vue.use(VueInstaller.$filters[name] = def);
    }
}

function filters(Vue, filters) {
    each(filters, (def, name) => {
        filter(Vue, name, def);
    });
}

function component(Vue, name, def) {
    if (!VueInstaller.$components[name]) {
        Vue.component(name, VueInstaller.$components[name] = def);
    }
}

function components(Vue, components) {
    each(components, (def, name) => {
        component(Vue, name, def);
    });
}

function directive(Vue, name, def) {
    if (!VueInstaller.$directives[name]) {
        if (isFunction(def)) {
            Vue.use(VueInstaller.$directives[name] = def);
        }
        else {
            Vue.directive(name, def);
        }
    }
}

function directives(Vue, directives) {
    each(directives, (def, name) => {
        directive(Vue, name, def);
    });
}

VueInstaller.use({

    install(Vue, options) {
        VueInstaller.components({
            FormGroup
        });
    }

});

const COLORS = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
    'white',
    'muted'
];

const props = {};

each(['border', 'text', 'bg', 'bg-gradient'], namespace => {
    each(COLORS, color => {
        props[camelCase(prefix(color, namespace))] = Boolean;
    });
});

function classes(instance, namespace) {
    return COLORS.map(color => {
        return instance[camelCase(color = prefix(color, namespace))] ? color : null;
    })
        .filter(value => !!value);
}

var Colorable = {

    props: props,

    methods: {

        textColor() {
            return classes(this, 'text');
        },

        bgColor() {
            return classes(this, 'bg');
        },

        borderColor() {
            return classes(this, 'border');
        },

        bgGradientColor() {
            return classes(this, 'bg-gradient');
        }

    },

    computed: {

        textColorClasses() {
            return this.textColor().join(' ').trim() || null;
        },

        borderColorClasses() {
            return this.borderColor().join(' ').trim() || null;
        },

        bgColorClasses() {
            return this.bgColor().join(' ').trim() || null;
        },

        bgGradientColorClasses() {
            return this.bgGradientColor().join(' ').trim() || null;
        },

        colorableClasses() {
            const classes = {};

            classes[this.textColorClasses] = !!this.textColorClasses;
            classes[this.borderColorClasses] = !!this.borderColorClasses;
            classes[this.bgColorClasses] = !!this.bgColorClasses;
            classes[this.bgGradientColorClasses] = !!this.bgGradientColorClasses;

            return omitBy(classes, (key$$1, value) => {
                return !key$$1 || !value;
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
        screenreaderClasses() {
            return {
                'sr-only': this.srOnly,
                'sr-only-focusable': this.srOnlyFocusable
            };
        }
    }

};

var HelpText = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('small',{staticClass:"form-text",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],

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

VueInstaller.use({

    install(Vue, options) {
        VueInstaller.components({
            HelpText
        });
    }

});

var FormLabel = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],

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

VueInstaller.use({

    install(Vue, options) {
        VueInstaller.components({
            FormLabel
        });
    }

});

var FormFeedback = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:{'invalid-feedback': _vm.invalid, 'valid-feedback': _vm.valid && !_vm.invalid}},[_vm._t("default",[_vm._v(_vm._s(_vm.label))])],2)},staticRenderFns: [],

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

VueInstaller.use({

    install(Vue, options) {
        VueInstaller.components({
            FormFeedback
        });
    }

});

var MergeClasses = {

    methods: {

        mergeClasses() {
            let classes = {};

            each([].slice.call(arguments), arg => {
                if (isObject(arg)) {
                    extend(classes, arg);
                }
                else if (isArray(arg)) {
                    classes = classes.concat(arg);
                }
                else if (arg) {
                    classes[arg] = true;
                }
            });

            return classes;
        }

    }

};

function unit(height) {
    return isFinite(height) ? height + 'px' : height;
}

var BaseType = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"activity-indicator",class:_vm.classes},_vm._l((_vm.nodes),function(i){return _c('div')}))},staticRenderFns: [],

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

var ActivityIndicator = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.center)?_c('div',{staticClass:"center-wrapper",class:{'position-relative': _vm.relative, 'position-fixed': _vm.fixed},style:(_vm.style)},[_c('div',{staticClass:"center-content d-flex flex-column align-items-center"},[_c(_vm.component,{tag:"component",attrs:{"size":_vm.size,"prefix":_vm.prefix}}),_vm._v(" "),(_vm.label)?_c('div',{staticClass:"activity-indicator-label",domProps:{"innerHTML":_vm._s(_vm.label)}}):_vm._e()],1)]):_c('div',{staticClass:"d-flex flex-column justify-content-center align-items-center",style:(_vm.style)},[_c(_vm.component,{tag:"component",attrs:{"size":_vm.size,"prefix":_vm.prefix}}),_vm._v(" "),(_vm.label)?_c('div',{staticClass:"activity-indicator-label",domProps:{"innerHTML":_vm._s(_vm.label)}}):_vm._e()],1)},staticRenderFns: [],

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

VueInstaller.use({

    install(Vue, options) {
        VueInstaller.components({
            ActivityIndicator
        });
    }

});

var InputField = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form-group',{staticClass:"input-field",class:{'has-activity': _vm.activity}},[_vm._t("label",[(_vm.label || _vm.hasDefaultSlot)?_c('form-label',{ref:"label",attrs:{"for":_vm.id},domProps:{"innerHTML":_vm._s(_vm.label)}}):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"position-relative"},[_vm._t("control",[_c('input',{directives:[{name:"bind-events",rawName:"v-bind-events",value:(_vm.bindEvents),expression:"bindEvents"}],ref:"control",class:_vm.mergeClasses(_vm.controlClasses, _vm.colorableClasses),attrs:{"id":_vm.id,"type":_vm.type,"name":_vm.name,"pattern":_vm.pattern,"readonly":_vm.readonly,"required":_vm.required,"maxlength":_vm.maxlength,"placeholder":_vm.placeholder,"disabled":_vm.disabled || _vm.readonly,"aria-label":_vm.label,"aria-describedby":_vm.id,"autocomplete":_vm.autocomplete},domProps:{"value":_vm.value},on:{"input":function($event){_vm.$emit('input', $event.target.value);}}})]),_vm._v(" "),_vm._t("activity",[_c('transition',{attrs:{"name":"slide-fade"}},[(_vm.activity)?_c('activity-indicator',{key:"test",ref:"activity",attrs:{"type":"dots","size":_vm.size}}):_vm._e()],1)]),_vm._v(" "),_vm._t("feedback",[(_vm.validFeedback)?_c('form-feedback',{ref:"feedback",attrs:{"valid":""},domProps:{"innerHTML":_vm._s(_vm.validFeedback)}}):(_vm.invalidFeedback)?_c('form-feedback',{ref:"feedback",attrs:{"invalid":""},domProps:{"innerHTML":_vm._s(_vm.invalidFeedback)}}):_vm._e()])],2),_vm._v(" "),_vm._t("help",[(_vm.helpText)?_c('help-text',{ref:"help",domProps:{"innerHTML":_vm._s(_vm.helpText)}}):_vm._e()])],2)},staticRenderFns: [],

    name: 'input-field',

    mixins: [
        Colorable,
        FormControl,
        MergeClasses
    ],

    components: {
        HelpText,
        FormGroup,
        FormLabel,
        FormFeedback,
        ActivityIndicator
    },

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

VueInstaller.use({

    install(Vue, options) {
        VueInstaller.components({
            InputField
        });
    }

});

const KEYCODE = {
    ESC: 27,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    ENTER: 13,
    SPACE: 32,
    TAB: 9
};

const API_REQUEST_OPTIONS = [
    'bounds',
    'location',
    'component-restrictions',
    'offset',
    'radius',
    'types'
];

var PlaceAutocompleteField = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"autocomplete-field",on:{"keydown":_vm.onKeydown,"keyup":_vm.onKeyup}},[_c('input-field',{attrs:{"name":_vm.name,"id":_vm.id,"type":_vm.type,"placeholder":_vm.placeholder,"required":_vm.required,"disabled":_vm.disabled || _vm.readonly,"readonly":_vm.readonly,"pattern":_vm.pattern,"aria-label":_vm.label,"aria-describedby":_vm.id,"label":_vm.label,"errors":_vm.errors,"value":_vm.value,"autocomplete":"no"},on:{"input":function($event){_vm.$emit('input', _vm.query);},"focus":_vm.onFocus,"blur":_vm.onBlur},model:{value:(_vm.query),callback:function ($$v) {_vm.query=$$v;},expression:"query"}},[(_vm.activity)?_c('activity-indicator',{attrs:{"size":"xs","type":"spinner"}}):_vm._e()],1),_vm._v(" "),(_vm.predictions && _vm.showPredictions)?_c('place-autocomplete-list',{attrs:{"items":_vm.predictions},on:{"item:click":_vm.onItemClick,"item:blur":_vm.onItemBlur}}):_vm._e()],1)},staticRenderFns: [],

    name: 'place-autocomplete-field',

    mixins: [
        FormControl
    ],

    components: {
        FormGroup,
        InputField,
        ActivityIndicator,
        PlaceAutocompleteList
    },

    props: {

        'api-key': {
            type: String,
            required: true
        },

        'base-uri': {
            type: String,
            default: 'https://maps.googleapis.com/maps/api/js'
        },

        'libraries': {
            type: Array,
            default() {
                return ['geometry', 'places'];
            }
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

        getInputElement() {
            return this.$el.querySelector('input');
        },

        getRequestOptions() {
            const options = {
                input: this.getInputElement().value
            };

            for (let i in API_REQUEST_OPTIONS) {
                if (this[i] !== undefined || this[i] !== null) {
                    options[i] = this[i];
                }
            }

            return options;
        },

        select(place) {
            geocode({ placeId: place.place_id }).then(response => {
                this.hide();
                this.$emit('input', this.query = response[0].formatted_address);
                this.$emit('select', place, response[0]);
            });
        },

        search() {
            return new Promise((resolve, reject) => {
                if (!this.getInputElement().value) {
                    this.predictions = false;
                    this.showPredictions = false;
                    // reject(new Error('Input empty'));
                }
                else {
                    this.activity = true;

                    this.$service.getPlacePredictions(this.getRequestOptions(), (response, status) => {
                        this.activity = false;

                        switch (status) {
                        case window.google.maps.places.PlacesServiceStatus.OK:
                            resolve(response);
                            break;
                        default:
                            reject(new Error(`Error with status: ${status}`));
                        }
                    });
                }
            });
        },

        hide() {
            this.showPredictions = false;
        },

        show() {
            this.showPredictions = true;
        },

        up() {
            const focused = this.$el.querySelector('a:focus');

            if (focused && focused.parentElement.previousElementSibling) {
                focused.parentElement.previousElementSibling.querySelector('a').focus();
            }
            else {
                const links = this.$el.querySelectorAll('a');
                links[links.length - 1].focus();
            }
        },

        down() {
            const focused = this.$el.querySelector('a:focus');

            if (focused && focused.parentElement.nextElementSibling) {
                focused.parentElement.nextElementSibling.querySelector('a').focus();
            }
            else {
                this.$el.querySelector('a').focus();
            }
        },

        onKeydown(event) {
            const element = this.$el.querySelector('[tabindex]');

            if (element && event.keyCode === KEYCODE.TAB) {
                event.preventDefault() && element.focus();
            }
        },

        onKeyup(event) {
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

            this.search().then(response => {
                this.predictions = response;
                this.showPredictions = true;
            }, error => {
                if (error) {
                    this.predictions = false;
                }
            });
        },

        onFocus(event) {
            if (this.query) {
                if (!this.predictions.length) {
                    this.onKeyup(event);
                }

                this.show();
            }
        },

        onBlur(event) {
            if (!this.$el.contains(event.relatedTarget)) {
                this.hide();
            }
        },

        onItemBlur(event) {
            this.onBlur(event);
        },

        onItemClick(event, child) {
            this.select(child.item);
            this.predictions = false;
        }

    },

    mounted() {
        script(`${this.baseUri}?key=${this.apiKey}&libraries=${this.libraries.join(',')}`).then(() => {
            this.$geocoder = new window.google.maps.Geocoder();
            this.$service = new window.google.maps.places.AutocompleteService();
            this.loaded = true;
            this.$emit('loaded');
        });
    },

    data() {
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
