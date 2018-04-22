import map from 'lodash-es/map';
//import each from 'lodash-es/each';
import filter from 'lodash-es/filter';
import isArray from 'lodash-es/isArray';
import intersection from 'lodash-es/intersection';

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

export default {

    bind(el, binding, vnode) {
        vnode.componentInstance.$on('select', (place, geocoder) => {
            const values = filter(map(binding.modifiers, (value, modifier) => {
                return extract(modifier, geocoder);
            }));

            vnode.context[binding.expression] = values.length ? values.join(' ') : null;
        });
    }


};
