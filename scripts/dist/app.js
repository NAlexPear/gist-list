'use strict';
//jQuery and other events

$('form').on('submit', function () {
  event.preventDefault();
  var query = $('input[type=search]').val();

  //call Backbone methods
  var userCollection = new GistCollection([], { user: query });
  var userGistList = new ListView({ collection: userCollection });
});

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
  tagName: 'div',
  className: 'gist',
  render: function render(model, target, count) {
    var link = model.attributes.html_url;
    target.append('<a href="' + link + '">gist ' + count + '</a><br/>');
  }
});

var ListView = Backbone.View.extend({
  //view logic for entire list of public gists
  el: '#output',
  initialize: function initialize() {
    this.render();
  },
  render: function render() {
    var _this = this;

    this.collection.fetch({ error: errorHandler }).then(function () {
      if (_this.collection.length === 0) _this.$el.html('<h3>Sorry, no gists found for that user</h3>');else {
        (function () {
          var i = 1;
          _this.$el.empty();
          _this.collection.forEach(function (item) {
            var gist = new GistView();
            var target = _this.$el;
            gist.render(item, target, i);
            i++;
          });
        })();
      }
    });
  }
});

var GistModel = Backbone.Model.extend({
  //model based on single public gist Object from GitHub API
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
