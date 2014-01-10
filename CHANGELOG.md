This changelog lists the most prominent, developer-visible changes in each release.

## Version 0.15:

#### New features:

 * modules can now be made executable. use `if (require.main === module) { ... }` to run
   additional code when your module is being run (rather than just imported).

 * new @ (alternate namespace) syntax

 * the two-part ternary syntax: `x ? y` is now shorthand for `x ? y : undefined`.

 * the test runner now produces string diffs between expected and actual values

 * string::split now allows regular expression separators, and works consistently cross-browser
   even if String.prototype.split() is buggy.

 * The require method can accept an array of modules now which it will load in parallel. The
   return value is an object with a union of the exported properties from each module.

 * new modules:

   * sjs:regexp
   * sjs:bundle - executable module for bundling multiple sjs modules into a single .js file
   * sjs:compile/doc - executable module for generating documentation indexes
   * sjs:service - service registry class, useful for dependency injection

 * new functions:

   * sequence::intersperse
   * string::unindent
   * string::padLeft
   * string::padRight
   * sys::argv()
   * require.hubs.addDefault(hub)
   * require.hubs.defined(prefix)
   * event::when
   * event.HostEmitter::when

#### Changes:

 * the `sjs:events` module has been renamed to `sjs:event`.

 * process.ARGV retains the same number of arguments as it does for native nodejs programs
   (we used to start script arguments from argv[1], but they now start from argv[2] just like in nodejs.
   Note that the new `sys::argv` function is now the recommended way of accessing script arguments.

 * the "github:" `require()` hub has changed. You should now include a leading
   slash at the beginning of the path, i.e. "github:/onilabs/stratifiedjs/master"
   instead of just "github:onilabs/stratifiedjs/master". This ensures that
   relative module paths are resolved correctly for modules loaded from github.

 * logging methods now print to `stderr` by default

 * url.parse() no longer has a `queryKey` property. It has been
   replaced with the `params()` method, which URL-decodes all keys
   and values.

 * The optional `filter` and `transform` arguments to event.HostEmitter (and event.when) have been
   replaced with a settings object, which may have values for any of `filter`, `transform` and (now)
   `handle`. In typical use, `transform` is unnecessary.

 * event::Queue and event::Stream have now been moved to methods on the individual emitter - e.g
   instead of `Queue(emitter)`, use `emitter.queue()`.

 * array::contains has been moved to sequence::hasElem (it now operates on any Stream type, and
   has been renamed to avoid confusion with string::contains)

