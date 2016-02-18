'use strict'
  //jQuery and other events
  $('form').on('submit', function () {
    event.preventDefault();
    const query = $('input[type=search]').val();

    //call Backbone methods
    const userCollection = new GistCollection([], { user: query });
    const userGistList = new ListView({ collection: userCollection });
  });

//helpers and handlers
function errorHandler (collection, response, options) {
  console.log(`There was an error: ${response.responseText}`);
  $('#output').html(`<h3>That user doesn't appear to exist</h3>`);
};

//backbone logic for interacting with GitHub API
let UserView = Backbone.View.extend({
  //view logic for showing user information (profile pic, name, etc)
});

let GistView = Backbone.View.extend({
  //view logic for individual gists
  tagName: 'div',
  className: 'gist',
  render (model, target, count) {
    const link = model.attributes.html_url;
    target.append(`<a href="${link}">gist ${count}</a><br/>`);
  }
});

let ListView = Backbone.View.extend({
  //view logic for entire list of public gists
  el:'#output',
  initialize () {
    this.render()
  },
  render () {
    this.collection.fetch({ error: errorHandler }).then( () => {
      if(this.collection.length === 0) this.$el.html(`<h3>Sorry, no gists found for that user</h3>`);
      else {
        let i = 1;
        this.$el.empty();
        this.collection.forEach( item => {
          const gist = new GistView ();
          const target = this.$el;
          gist.render(item, target, i);
          i++;
        });
      }

    });
  }
});

let GistModel = Backbone.Model.extend({
  //model based on single public gist Object from GitHub API
});

let GistCollection = Backbone.Collection.extend({
  //collection of all gists pulled from GitHub API
  model: GistModel,
  initialize (models, options) {
    this.url = `https://api.github.com/users/${options.user}/gists`;
  }
});

// userCollection and userGistList built on form submission (see jQuery event handlers)
