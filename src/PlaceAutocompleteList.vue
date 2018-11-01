<template>
    <div class="autocomplete-list-wrapper">
        <ul class="autocomplete-list">
            <place-autocomplete-list-item v-for="(item, i) in items" :key="item.id" :item="item" @click="onClick" @focus="onFocus" @blur="onBlur">
                {{ item[display] }}
            </place-autocomplete-list-item>
        </ul>
    </div>
</template>

<script>
import PlaceAutocompleteListItem from './PlaceAutocompleteListItem';

export default {

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
</script>
