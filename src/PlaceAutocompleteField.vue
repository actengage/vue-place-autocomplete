<template>
    <div class="autocomplete-field" @keydown="onKeydown" @keyup="onKeyup">
        <input-field
            v-model="query"
            v-bind-events
            v-bind="$attrs"
            :label="label"
            :errors="errors"
            :value="value"
            :custom="custom"
            autocomplete="no"
            @blur="onBlur"
            @focus="onFocus"
            @input="$emit('input', query)">
            <activity-indicator v-if="showActivityIndicator" size="xs" type="spinner"/>
        </input-field>
        <place-autocomplete-list v-if="predictions && showPredictions" :items="predictions" @item:click="onItemClick" @item:blur="onItemBlur"/>
    </div>
</template>

<script>
import geocode from './Helpers/Geocode';
import script from 'vue-interface/src/Helpers/Script';
import PlaceAutocompleteList from './PlaceAutocompleteList';
import FormControl from 'vue-interface/src/Mixins/FormControl';
import FormGroup from 'vue-interface/src/Components/FormGroup';
import InputField from 'vue-interface/src/Components/InputField';
import ActivityIndicator from 'vue-interface/src/Components/ActivityIndicator';

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

export default {

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

    watch: {
        value(value) {
            this.query = value;
        }
    },

    props: {

        apiKey: String,

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
            default() {
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
                //this.hide();
                this.$emit('input', this.query = response[0].formatted_address);
                this.$emit('autocomplete-select', place, response[0]);
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
                    this.showActivityIndicator = true;

                    this.$service.getPlacePredictions(this.getRequestOptions(), (response, status) => {
                        this.showActivityIndicator = false;

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
        if(this.apiKey) {
            script(`${this.baseUri}?key=${this.apiKey}&libraries=${this.libraries.join(',')}`).then(() => {
                this.$geocoder = new window.google.maps.Geocoder();
                this.$service = new window.google.maps.places.AutocompleteService();
                this.loaded = true;
                this.$emit('loaded');
            });
        }
    },

    data() {
        return {
            loaded: false,
            predictions: false,
            query: this.value,
            showPredictions: false,
            showActivityIndicator: this.activity
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
</script>

<style lang="scss">
.autocomplete-field {
    position: relative;

    .activity-indicator {
        right: .5rem;
        bottom: .5rem;
        position: absolute;
    }
}

.autocomplete-list-wrapper {
    position: absolute;
    z-index: 10;
    width: 100%;
    top: 100%;
    background: white;
}

.autocomplete-list {
    margin: 0;
    padding: 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, .25);
}
</style>
