import { map } from 'lodash';
import { filter } from 'lodash';
import { isArray } from 'lodash';
import { intersection } from 'lodash';

const ALIASES = {
    'street': ['street_number', 'route', 'intersection'],
    'city': ['locality'],
    'state': ['administrative_area_level_1'],
    'zip': ['postal_code'],
    'zipcode': ['postal_code'],
    'county': ['administrative_area_level_2']
};

function extract(type, geocoder) {
    const types = ALIASES[type] || (isArray(type) ? type : [type]);

    const values = filter(map(geocoder.address_components, component => {
        if(intersection(component.types, types).length) {
            return component.long_name;
        }
    }));

    return values.length ? values.join(' ') : null;
}

function update(binding, vnode, values) {
    const props = binding.expression.split('.');
    const prop = props.pop();
    const model = props.reduce((carry, i) => carry[i], vnode.context);

    model[prop] = values.length ? values.join(' ') : null;
}

export default {

    bind(el, binding, vnode) {
        vnode.componentInstance.$on('select', (place, geocoder) => {
            update(binding, vnode, filter(map(binding.modifiers, (value, modifier) => {
                return extract(modifier, geocoder);
            })));
        });
    }


};
