<template>
    <div><span class="message" v-html="message"></span></div>
</template>

<script>
export default {

    name: "sample-component",

    props: {
        message: {
            type: String,
            required: true
        }
    }

}
</script>
