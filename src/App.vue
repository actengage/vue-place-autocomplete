<template>
    <div id="app" class="container">
        <h1>Google Place Autocomplete</h1>

        <h3>Features</h3>

        <ul>
            <li>Built for Bootstrap 4</li>
            <li>Works just like a native input field</li>
            <li>Full support for keyboard accessibility and shortcuts</li>
            <li>Fully customizable markup and extensible JS</li>
            <li>Full support for Google Places and Geocoder API's</li>
            <li>Use multiple instances on the same page</li>
            <li>Easily auto-fill additional input fields with address component</li>
        </ul>

        <hr>

        <h3>Default Usage</h3>
        <p>The default usage extends the InputField from vue-interface, so all the properties are inherited.</p>

        <place-autocomplete-field v-model="field1" placeholder="Enter an an address, zipcode, or location" label="Address" name="field1" api-key="AIzaSyAhSv9zWvisiTXRPRw6K8AE0DCmrRMpQcU"></place-autocomplete-field>

        <hr>

        <h3>Autofill fields</h3>
        <p>Sometimes you may need to autofill address components into other input fields...</p>

        <place-autocomplete-field
            v-model="field2"
            label="Address"
            name="field2"
            api-key="AIzaSyAhSv9zWvisiTXRPRw6K8AE0DCmrRMpQcU"
            placeholder="Enter an an address, zipcode, or location"
            v-place-autofill:street="form.street"
            v-place-autofill:city="form.city"
            v-place-autofill:state.long="form.state"
            v-place-autofill:state.short="form.state_abbr"
            v-place-autofill:zipcode="form.zip"
            v-place-autofill:country="form.country"
            v-place-autofill:latitude="form.latitude"
            v-place-autofill:longitude="form.longitude"
            v-place-autofill:street.short.query="field2">
        </place-autocomplete-field>

        <div class="card w-30">
            <div class="card-body">
                <p><b class="card-title">Enter an address above and watch the fields below get auto-filled...</b></p>

                <p>
                    <label>Street</label><br>
                    <input name="street" v-model="form.street" class="form-control"/>
                </p>
                <p>
                    <label>Addr2</label><br>
                    <input name="addr2" v-model="form.addr2" class="form-control"/>
                </p>
                <p>
                    <label>City</label><br>
                    <input name="city" v-model="form.city" class="form-control"/>
                </p>
                <p>
                    <label>State</label><br>
                    <input name="state" v-model="form.state" class="form-control"/>
                </p>
                <p>
                    <label>State (Abbreviated)</label><br>
                    <input name="state" v-model="form.state_abbr" class="form-control"/>
                </p>
                <p>
                    <label>Zip</label><br>
                    <input name="zip" v-model="form.zip" class="form-control"/>
                </p>
                <p>
                    <label>United States</label><br>
                    <input name="country" v-model="form.country" class="form-control"/>
                </p>
                <p>
                    <label>Latitude</label><br>
                    <input name="latitude" v-model="form.latitude" class="form-control"/>
                </p>
                <p>
                    <label>Longitude</label><br>
                    <input name="longitude" v-model="form.longitude" class="form-control"/>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    data() {
        return {
            form: {},
            field1: null,
            field2: null
        };
    }

}
</script>

<style lang="scss">
@import 'bootstrap/scss/bootstrap.scss';
</style>