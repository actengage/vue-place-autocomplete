<template>
    <li class="autocomplete-list-item" @focus="onFocus" @onBlur="onBlur">
        <a href="#" @click.prevent="onClick" @focus="onFocus" @blur="onBlur" tabindex="0">
            <span class="autocomplete-list-item-icon"></span>
            <span class="autocomplete-list-item-label"><slot/></span>
        </a>
    </li>
</template>

<script>
export default {

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
</script>

<style lang="scss">
.autocomplete-list-item {
    margin: 0;
    padding: 0;
    font-size: .8rem;
    list-style: none;

    &:not(:last-child) {
        border-bottom: 1px solid rgba(0, 0, 0, .15);
    }

    & > a {
        text-decoration: none;
        padding: 5px;
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        &:hover {
            text-decoration: none;
            background: rgba(0, 0, 0, .05);
        }
    }
}

.autocomplete-list-item-icon {
    width: 15px;
    height: 20px;
    display: inline-block;
    vertical-align: top;
    background-size: 34px;
    background-position: -1px -161px;
    background-image: url(https://maps.gstatic.com/mapfiles/api-3/images/autocomplete-icons_hdpi.png);
}
</style>
