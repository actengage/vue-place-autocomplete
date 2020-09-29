import { isArray } from 'vue-interface/src/Helpers/Functions';

const ALIASES = {
    'street': ['street_number', 'route', 'intersection'],
    'city': ['locality'],
    'state': ['administrative_area_level_1'],
    'zip': ['postal_code'],
    'zipcode': ['postal_code'],
    'county': ['administrative_area_level_2']
};

function intersection(a, b) {
    return a
        .filter(value => b.indexOf(value) !== -1)
        .filter((e, i, c) => {
            return c.indexOf(e) === i;
        });
}

function extract(type, modifiers, geocoder) {
    if(geocoder[type]) {
        return geocoder[type];
    }
    else if(type === 'latitude') {
        return geocoder.geometry.location.lat();
    }
    else if(type === 'longitude') {
        return geocoder.geometry.location.lng();
    }

    const aliases = ALIASES[type] || (isArray(type) ? type : [type]);

    const values = geocoder.address_components
        .map(component => {
            if(intersection(component.types, aliases).length) {
                return component[modifiers.short ? 'short_name' : 'long_name'];
            }
        })
        .filter(value => !!value);

    return values.length ? values.join(' ') : null;
}

function update(binding, vnode, value) {
    const props = binding.expression.split('.');
    const prop = props.pop();
    const model = props.reduce((carry, i) => carry[i], vnode.context);

    value = isArray(value) ? value.join(' ') : value;

    if(binding.modifiers.query) {
        vnode.componentInstance.query = value;
    }

    model[prop] = value;

    return value;
}

export default {

    bind(el, binding, vnode) {
        vnode.componentInstance.$on('autocomplete-select', (place, geocoder) => {
            vnode.context.$nextTick(() => {
                update(binding, vnode, extract(binding.arg, binding.modifiers, geocoder));
            });
        });
    }

};
