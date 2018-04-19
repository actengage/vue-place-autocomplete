# Google Place Autocomplete

README coming soon.

### Commands

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
