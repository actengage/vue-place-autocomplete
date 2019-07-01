import PlaceAutofill from './Directives/PlaceAutofill';
import PlaceAutocompleteField from './PlaceAutocompleteField';
import PlaceAutocompleteList from './PlaceAutocompleteList';
import PlaceAutocompleteListItem from './PlaceAutocompleteListItem';

export {
    PlaceAutofill,
    PlaceAutocompleteField,
    PlaceAutocompleteList,
    PlaceAutocompleteListItem
};

export default function(Vue) {
    Vue.directive('place-autofill', PlaceAutofill);
    Vue.component('place-autocomplete-field', PlaceAutocompleteField);
    Vue.component('place-autocomplete-list', PlaceAutocompleteList);
    Vue.component('place-autocomplete-list-item', PlaceAutocompleteListItem);
}