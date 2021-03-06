'use strict';

define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
  function initialize() {
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
      var user = new UserView();
      console.log('There was an error: ' + response.responseText);
      $('#output').html('<h3>That user doesn\'t appear to exist</h3>');
    };

    //backbone logic for interacting with GitHub API
    var UserView = Backbone.View.extend({
      //view logic for showing user information (profile pic, name, etc)
      defaults: {
        login: '??',
        html_url: '#',
        avatar_url: 'https://avatars1.githubusercontent.com/u/5244508?v=3&s=96'
      },
      el: '#user',
      initialize: function initialize(options) {
        if (options) this.render(options.avatar_url, options.html_url, options.login);else this.render(this.defaults.avatar_url, this.defaults.html_url, this.defaults.login);
      },
      render: function render(avatar, link, login) {
        var parent = this.$el;
        parent.children('img').attr('src', avatar).removeClass('hidden');
        parent.children('div').html('<a href="' + link + '"><h3>' + login + '</h3></a>').removeClass('hidden');
      }
    });

    var GistView = Backbone.View.extend({
      //view logic for individual gists
      tagName: 'div',
      className: 'gist',
      render: function render(model, target, count) {
        var link = model.attributes.html_url;
        var files = Object.keys(model.attributes.files);
        var desc = model.attributes.description && model.attributes.description.length > 0 ? model.attributes.description : '';

        var fileHtml = '';
        var i = 0;
        files.forEach(function (file) {
          if (i < files.length - 1) {
            fileHtml += files[i] + ', ';
          } else if (i < files.length) {
            fileHtml += '' + files[i];
          }
          i++;
        });

        var finalHtml = '';
        if (desc.length > 0) {
          finalHtml += '<' + this.tagName + ' class="' + this.className + '">\n            <a href="' + link + '">' + fileHtml + '</a>\n            <p>' + desc + '</p>\n          </div>';
        } else {
          finalHtml += '<' + this.tagName + ' class="' + this.className + '">\n            <a href="' + link + '">' + fileHtml + '</a>\n          </div>';
        }

        target.append(finalHtml);
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

          if (_this.collection.length === 0) {
            _this.$el.html('<h3>Sorry, no gists found for that user</h3>');
            var user = new UserView();
          } else {
            (function () {
              //render user
              var first = _this.collection.at(0);
              var owner = first.attributes.owner;
              var user = new UserView({ login: owner.login, avatar_url: owner.avatar_url, html_url: owner.html_url });

              //render gists
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
  }

  return {
    initialize: initialize
  };
});
//# sourceMappingURL=app.js.map
