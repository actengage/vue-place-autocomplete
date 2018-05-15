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
    const types = ALIASES[type] || (isArray(type) ? type : [type]);

    const values = filter(map(geocoder.address_components, component => {
        if(intersection(component.types, types).length) {
            return component[modifiers.short ? 'short_name' : 'long_name'];
        }
    }));

    return values.length ? values.join(' ') : null;
}

function update(binding, vnode, values) {
    const props = binding.expression.split('.');
    const prop = props.pop();
    const model = props.reduce((carry, i) => carry[i], vnode.context);
    model[prop] = isArray(values) ? values.join(' ') : values;
}

export default {

    bind(el, binding, vnode) {
        vnode.componentInstance.$on('select', (place, geocoder) => {
            return update(binding, vnode, extract(binding.arg, binding.modifiers, geocoder));
        });
    }

};
