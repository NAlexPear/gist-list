'use strict';

//helpers and handlers

function errorHandler(collection, response, options) {
  console.log('There was an error: ' + response.responseText);
  $('#output').html('<h3>That user doesn\'t appear to exist</h3>');
};

//backbone logic for interacting with GitHub API

var UserView = Backbone.View.extend({
  //view logic for showing user information (profile pic, name, etc)
});

var GistView = Backbone.View.extend({
  //view logic for individual gists
});

var ListView = Backbone.View.extend({
  //view logic for entire list of public gists
  el: '#output',
  initialize: function initialize() {
    this.render();
  },
  render: function render() {
    var _this = this;

    var that = this;
    this.collection.fetch({ error: errorHandler }).then(function () {
      if (_this.collection.length === 0) _this.$el.html('<h3>Sorry, no gists found for that user</h3>');else {
        (function () {
          var i = 1;
          _this.$el.empty();
          _this.collection.forEach(function (item) {
            var link = item.attributes.html_url;
            _this.$el.append('<a href="' + link + '">gist ' + i + '</a><br/>');
            i++;
          });
        })();
      }
    });
  }
});

var GistModel = Backbone.Model.extend({
  //model based on single public gist Object from GitHub API
  defaults: {
    html_url: null,
    created_at: null,
    updated_at: null,
    description: null,
    files: {
      filename: null,
      language: null,
      raw_url: null
    }
  }
});

var GistCollection = Backbone.Collection.extend({
  //collection of all gists pulled from GitHub API
  model: GistModel,
  initialize: function initialize(models, options) {
    this.url = 'https://api.github.com/users/' + options.user + '/gists';
  }
});

// userCollection and userGistList built on form submission (see jQuery event handlers)
//# sourceMappingURL=app.js.map
