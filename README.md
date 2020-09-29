# Google Place Autocomplete

This Vue component incorporates full support the Google Places and Geocoder API's a single input field.
The goal is provide the most native and seamlessly integrated solution possible.

## Features

- Built for Bootstrap 4
- Works just like a native input field
- Full support for keyboard accessibility and shortcuts
- Fully customizable markup and extensible JS
- Full support for Google Places and Geocoder API's
- Use multiple instances on the same page
- Easily auto-fill additional input fields with address component

## Installation

NPM

    npm install vue-place-autocomplete --save

    // ES6 Usage
    import Vue from 'vue';
    import VuePlaceAutocomplete from 'vue-place-autocomplete';

    Vue.use(VuePlaceAutocomplete);
CDN

    https://www.jsdelivr.com/package/npm/vue-place-autocomplete


## Default Usage

The default usage extends the InputField from [vue-interface](https://github.com/actengage/vue-interface/tree/master/src/Components/InputField), so all the properties are inherited.

    <div v-if="field1" class="alert alert-info">
        Current Value: {{field1}}
    </div>

    <place-autocomplete-field v-model="field1" placeholder="Enter an an address, zipcode, or location" label="Address" name="field1" api-key="AIzaSyAhSv9zWvisiTXRPRw6K8AE0DCmrRMpQcU"></place-autocomplete-field>

![Basic Usage](./screenshots/basic-usage.gif)

## Autofill fields

Sometimes you may need to autofill address components into other input fields...

    <place-autocomplete-field
        v-model="field2"
        label="Address"
        name="field2"
        api-key="AIzaSyAhSv9zWvisiTXRPRw6K8AE0DCmrRMpQcU"
        placeholder="Enter an an address, zipcode, or location"
        v-place-autofill.street="street"
        v-place-autofill.city="city"
        v-place-autofill.state="state"
        v-place-autofill.zipcode="zip"
        v-place-autofill.country="country">
    </place-autocomplete-field>

    <div class="card w-30">
        <div class="card-body">
            <p><b class="card-title">Enter an address above and watch the fields below get auto-filled...</b></p>

            <p>
                <label>Street</label><br>
                <input name="street" v-model="street" class="form-control"/>
            </p>
            <p>
                <label>Addr2</label><br>
                <input name="addr2" v-model="addr2" class="form-control"/>
            </p>
            <p>
                <label>City</label><br>
                <input name="city" v-model="city" class="form-control"/>
            </p>
            <p>
                <label>State</label><br>
                <input name="state" v-model="state" class="form-control"/>
            </p>
            <p>
                <label>Zip</label><br>
                <input name="zip" v-model="zip" class="form-control"/>
            </p>
            <p>
                <label>United States</label><br>
                <input name="country" v-model="country" class="form-control"/>
            </p>
        </div>
    </div>

![Autofill Usage](./screenshots/autofill.gif)

## Build Commands

`npm run dev`

Start the Rollup build process and watch the source files and
trigger livereload when a file changes.

`npm run commit`

Makes a GIT commit with the current version from package.json. (This command is
called automatically in the `npm run release` command.)

`npm run release-patch`

Compiles the latest source files, makes an incremental version bump (1.0.x) to
package.json, then makes a commit with new version, and finally publishes the
latest build to NPM.

`npm run release-minor`

Compiles the latest source files, makes a minor version bump (1.x.0) to
package.json, then makes a commit with new version, and finally publishes the
latest build to NPM.

`npm run release-major`

Compiles the latest source files, makes a major version bump
(x.1.0) to package.json, then makes a commit with new version, and finally
publishes the latest build to NPM.

`npm run release`

Compiles the latest source files for release, runs the
uglification process, makes the commit, and published the package. This command
is called automatically uses any of the other `npm run release-{type}` commands.

`npm run uglify`

Rund the uglify library over the compiled source to create a
`{package-name}.min.js` file that Gzip and minifies that library.
