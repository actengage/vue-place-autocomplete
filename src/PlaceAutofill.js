import { map } from 'lodash';
import { filter } from 'lodash';
import { isArray } from 'lodash';
import { isNull } from 'lodash';
import { intersection } from 'lodash';

const ALIASES = {
    'street': ['street_number', 'route', 'intersection'],
    'city': ['locality'],
    'state': ['administrative_area_level_1'],
    'zip': ['postal_code'],
    'zipcode': ['postal_code'],
    'county': ['administrative_area_level_2']
};

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

    const values = filter(map(geocoder.address_components, component => {
        if(intersection(component.types, aliases).length) {
            return component[modifiers.short ? 'short_name' : 'long_name'];
        }
    }));

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

    return model[prop] = value;
}

export default {

    bind(el, binding, vnode) {
        vnode.componentInstance.$on('select', (place, geocoder) => {
            vnode.context.$nextTick(() => {
                update(binding, vnode, extract(binding.arg, binding.modifiers, geocoder));
            });
        });
    }

};
