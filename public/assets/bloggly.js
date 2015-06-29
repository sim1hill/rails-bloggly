/* jshint ignore:start */

/* jshint ignore:end */

define('bloggly/adapters/application', ['exports', 'ember-data'], function (exports, DS) {

	'use strict';

	exports['default'] = DS['default'].RESTAdapter.extend({});

});
define('bloggly/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'bloggly/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('bloggly/controllers/application', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    appName: 'This could be anything'
    // gifURL: responseFromGiphy

  });

  // var responseFromGiphy = function getGIPHY(){
  //       debugger;
  //      $.getJSON('http://ip.jsontest.com/')
  //   }

});
define('bloggly/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('bloggly/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('bloggly/controllers/posts', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    // init: function(){

    //   $.get("http://localhost:3000/gifs")
    //   .done(function(response){
    //     response["posts"].forEach(function(post){
    //       $('.list-group a').append('<h4 class="list-group-item-heading">' + post['title'] + '</h4>');
    //       $('.list-group a').append('<p class="list-group-item-text">' + post['content'] + '</p>');

    //     })
    // },

    actions: {
      getGif: function getGif() {
        if ($('.form-control').val() === '') {
          alert('Nice try...type something first!');
        } else {
          var gifsearchwords = $('#blog-content p').text();
          var searchslug = '';
          //   if (gifsearchwords.includes("#")){

          //     gifsearchwords.split("#").pop();
          //     $.getJSON("http://localhost:3000/gifs?q=" + searchslug + "&format=json", function(result){
          //     var embedGif = result['urls'][Math.floor(Math.random()*result['urls'].length)];
          //     $('#new-gif').append('<img src=' + embedGif + '>&nbsp');
          // })
          // }
          if (gifsearchwords.split(' ').length > 0) {

            searchslug = gifsearchwords.split(' ').pop();
            if (searchslug === ',' || searchslug === '.' || searchslug === '!' || searchslug === '?') {
              searchslug = gifsearchwords.split(' ').slice(-1, -1);
            }
          } else {
            searchslug = gifsearchwords;
          }
          $.getJSON('http://localhost:3000/gifs?q=' + searchslug + '&format=json', function (result) {
            var embedGif = result['urls'][Math.floor(Math.random() * result['urls'].length)];
            $('#new-gif').append('<img src=' + embedGif + '>&nbsp');
          });
        }
      }, //end of getGIF action
      deleteButton: function deleteButton() {
        $('#new-gif').empty();
      },

      savePost: function savePost() {
        var title = $('#blog-content h4').text();
        var copy = $('#blog-content p').text();
        // var gif = $('#new-gif img').attr();
        $.post('http://localhost:3000/gifs', { post: { title: title, content: copy } }).done(function (response) {
          response['posts'].forEach(function (post) {
            $('.list-group').append('<a href="#" class="list-group-item"><h4 class="list-group-item-heading">' + post['title'] + '</h4>');
            $('.list-group a').append('<p class="list-group-item-text">' + post['content'] + '</p></a>');
          });
        });
      },

      title: function title() {},

      deleteOneGif: function deleteOneGif() {}
    }
  });

});
define('bloggly/initializers/app-version', ['exports', 'bloggly/config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;
  var registered = false;

  exports['default'] = {
    name: 'App Version',
    initialize: function initialize(container, application) {
      if (!registered) {
        var appName = classify(application.toString());
        Ember['default'].libraries.register(appName, config['default'].APP.version);
        registered = true;
      }
    }
  };

});
define('bloggly/initializers/export-application-global', ['exports', 'ember', 'bloggly/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    var classifiedName = Ember['default'].String.classify(config['default'].modulePrefix);

    if (config['default'].exportApplicationGlobal && !window[classifiedName]) {
      window[classifiedName] = application;
    }
  }

  ;

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('bloggly/models/post', ['exports', 'ember-data'], function (exports, DS) {

    'use strict';

    debugger;
    var hasMany = DS['default'].hasMany;

    exports['default'] = DS['default'].Model.extend({
        title: DS['default'].attr('string'),
        content: DS['default'].attr('string'),
        gifURL: DS['default'].attr('string')
    });
    // App.Post = Ember.Object.extend();
    // App.Post.reopenClass({
    //   all: function() {
    //     return $.getJSON("http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC").then(function(response){

    //     });
    //   }

    // });

});
define('bloggly/router', ['exports', 'ember', 'bloggly/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.resource('posts');
  });

  exports['default'] = Router;

});
define('bloggly/routes/application', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    redirect: function redirect() {
      this.transitionTo('posts');
    }
  });

});
define('bloggly/routes/post', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model(params) {}
  });

  // return Ember.$.getJSON('http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC'),
  // return this.store.find('post', params.post_id);

});
define('bloggly/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("center");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h3");
        var el3 = dom.createTextNode("Make your blog posts more fun with Bloggly!");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("How to use Bloggly: Just start typing! When you reach a word you'd like a GIF for, hit enter. Watch your GIFs appear below.");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,2,2,contextualElement);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('bloggly/templates/posts', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("center");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        var el3 = dom.createTextNode(" \n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3,"class","btn btn-danger");
        var el4 = dom.createTextNode("Delete GIFs");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3,"class","btn btn-primary");
        var el4 = dom.createTextNode("Save Post");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"id","blog-content");
        var el3 = dom.createElement("h4");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"id","new-gif");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","list-group");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"href","#");
        dom.setAttribute(el2,"class","list-group-item");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h4");
        dom.setAttribute(el3,"class","list-group-item-heading");
        var el4 = dom.createTextNode("Your First Post!");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        dom.setAttribute(el3,"class","list-group-item-text");
        var el4 = dom.createTextNode("This is just a snippet of content about all kinds of cool things!");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" \n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, inline = hooks.inline, element = hooks.element, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [1]);
        var element2 = dom.childAt(element1, [9]);
        var element3 = dom.childAt(element1, [11]);
        var element4 = dom.childAt(element0, [4]);
        var morph0 = dom.createMorphAt(element1,1,1);
        var morph1 = dom.createMorphAt(element1,5,5);
        var morph2 = dom.createMorphAt(dom.childAt(element4, [0]),0,0);
        var morph3 = dom.createMorphAt(dom.childAt(element4, [1]),0,0);
        inline(env, morph0, context, "input", [], {"value": get(env, context, "title"), "size": "30", "rows": "6", "id": "inputLarge", "action": "title"});
        inline(env, morph1, context, "input", [], {"value": get(env, context, "name"), "rows": "6", "class": "form-control input-lg", "action": "getGif"});
        element(env, element2, context, "action", ["deleteButton"], {});
        element(env, element3, context, "action", ["savePost"], {});
        content(env, morph2, context, "title");
        content(env, morph3, context, "name");
        return fragment;
      }
    };
  }()));

});
define('bloggly/tests/adapters/application.jshint', function () {

  'use strict';

  module('JSHint - adapters');
  test('adapters/application.js should pass jshint', function() { 
    ok(true, 'adapters/application.js should pass jshint.'); 
  });

});
define('bloggly/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(true, 'app.js should pass jshint.'); 
  });

});
define('bloggly/tests/controllers/application.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/application.js should pass jshint', function() { 
    ok(true, 'controllers/application.js should pass jshint.'); 
  });

});
define('bloggly/tests/controllers/posts.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/posts.js should pass jshint', function() { 
    ok(false, 'controllers/posts.js should pass jshint.\ncontrollers/posts.js: line 39, col 38, Missing semicolon.\ncontrollers/posts.js: line 44, col 9, Missing semicolon.\ncontrollers/posts.js: line 61, col 9, Missing semicolon.\ncontrollers/posts.js: line 63, col 7, Missing semicolon.\ncontrollers/posts.js: line 19, col 11, \'$\' is not defined.\ncontrollers/posts.js: line 22, col 30, \'$\' is not defined.\ncontrollers/posts.js: line 41, col 9, \'$\' is not defined.\ncontrollers/posts.js: line 43, col 9, \'$\' is not defined.\ncontrollers/posts.js: line 48, col 5, \'$\' is not defined.\ncontrollers/posts.js: line 52, col 17, \'$\' is not defined.\ncontrollers/posts.js: line 53, col 16, \'$\' is not defined.\ncontrollers/posts.js: line 55, col 5, \'$\' is not defined.\ncontrollers/posts.js: line 58, col 9, \'$\' is not defined.\ncontrollers/posts.js: line 59, col 9, \'$\' is not defined.\n\n14 errors'); 
  });

});
define('bloggly/tests/helpers/resolver', ['exports', 'ember/resolver', 'bloggly/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('bloggly/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/resolver.js should pass jshint', function() { 
    ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('bloggly/tests/helpers/start-app', ['exports', 'ember', 'bloggly/app', 'bloggly/router', 'bloggly/config/environment'], function (exports, Ember, Application, Router, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('bloggly/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/start-app.js should pass jshint', function() { 
    ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('bloggly/tests/models/post.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/post.js should pass jshint', function() { 
    ok(false, 'models/post.js should pass jshint.\nmodels/post.js: line 3, col 1, Forgotten \'debugger\' statement?\nmodels/post.js: line 4, col 5, \'hasMany\' is defined but never used.\n\n2 errors'); 
  });

});
define('bloggly/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(true, 'router.js should pass jshint.'); 
  });

});
define('bloggly/tests/routes/application.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/application.js should pass jshint', function() { 
    ok(true, 'routes/application.js should pass jshint.'); 
  });

});
define('bloggly/tests/routes/post.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/post.js should pass jshint', function() { 
    ok(false, 'routes/post.js should pass jshint.\nroutes/post.js: line 4, col 19, \'params\' is defined but never used.\n\n1 error'); 
  });

});
define('bloggly/tests/test-helper', ['bloggly/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('bloggly/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('test-helper.js should pass jshint', function() { 
    ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('bloggly/tests/unit/adapters/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('adapter:application', 'Unit | Adapter | application', {});

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });

  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']

});
define('bloggly/tests/unit/adapters/application-test.jshint', function () {

  'use strict';

  module('JSHint - unit/adapters');
  test('unit/adapters/application-test.js should pass jshint', function() { 
    ok(true, 'unit/adapters/application-test.js should pass jshint.'); 
  });

});
define('bloggly/tests/unit/controllers/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:application', {});

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('bloggly/tests/unit/controllers/application-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/application-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/application-test.js should pass jshint.'); 
  });

});
define('bloggly/tests/unit/models/post-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('post', 'Unit | Model | post', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('bloggly/tests/unit/models/post-test.jshint', function () {

  'use strict';

  module('JSHint - unit/models');
  test('unit/models/post-test.js should pass jshint', function() { 
    ok(true, 'unit/models/post-test.js should pass jshint.'); 
  });

});
define('bloggly/tests/unit/routes/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:application', 'Unit | Route | application', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('bloggly/tests/unit/routes/application-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/application-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/application-test.js should pass jshint.'); 
  });

});
define('bloggly/tests/unit/routes/post-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:post', 'Unit | Route | post', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('bloggly/tests/unit/routes/post-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/post-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/post-test.js should pass jshint.'); 
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('bloggly/config/environment', ['ember'], function(Ember) {
  var prefix = 'bloggly';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("bloggly/tests/test-helper");
} else {
  require("bloggly/app")["default"].create({"name":"bloggly","version":"0.0.0.fc04406f"});
}

/* jshint ignore:end */
//# sourceMappingURL=bloggly.map