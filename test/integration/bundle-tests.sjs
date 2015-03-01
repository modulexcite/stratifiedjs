@ = require('sjs:test/std');
var {requiresConductance} = require('./helper');

@context {||

@test("loading an already-loaded module via bundle dependency") {||
  var canonicalId = require.resolve('./fixtures/bundle_a').path;
  require('./fixtures/bundle_a').ping() .. @assert.eq('pong');
  var initialModule = require.modules[canonicalId];
  initialModule .. @assert.ok();

  // now load a bundle containing both `b` and `a`:
  require('sjs:xbrowser/dom').script(@url.normalize('./fixtures/bundle_b.sjs?format=bundle', module.id));
  var keys = window.__oni_rt_bundle.m .. @ownKeys .. @toArray();
  keys .. @any(k -> k .. @contains('bundle_a')) .. @assert.ok(keys);

  require('./fixtures/bundle_b');

  // bundle should be unused, as bundle_a is already loaded
  keys .. @any(k -> k .. @contains('bundle_a')) .. @assert.ok(keys);

  // and module should not have been replaced
  require.modules[canonicalId] .. @assert.is(initialModule);
} .. requiresConductance();

}.browserOnly();