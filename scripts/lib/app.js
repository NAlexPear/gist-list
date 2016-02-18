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
  const user = new UserView ();
  console.log(`There was an error: ${response.responseText}`);
  $('#output').html(`<h3>That user doesn't appear to exist</h3>`);
};

//backbone logic for interacting with GitHub API
let UserView = Backbone.View.extend({
  //view logic for showing user information (profile pic, name, etc)
  defaults: {
    login: '??',
    avatar_url: 'https://avatars1.githubusercontent.com/u/5244508?v=3&s=96'
  },
  el:'#user',
  initialize (options) {
    if (options) this.render(options.avatar_url, options.login);
    else this.render(this.defaults.avatar_url, this.defaults.login);
  },
  render (avatar, login) {
    const parent = this.$el;
    parent.children('img').attr('src', avatar).removeClass('hidden');
    parent.children('div').html(`<h3>${login}</h3>`).removeClass('hidden');
  }
});

let GistView = Backbone.View.extend({
  //view logic for individual gists
  tagName: 'div',
  className: 'gist',
  render (model, target, count) {
    const link = model.attributes.html_url;
    target.append(`<${this.tagName} class="${this.className}"><a href="${link}">gist ${count}</a></div>`);
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

      if(this.collection.length === 0) {
        this.$el.html(`<h3>Sorry, no gists found for that user</h3>`);
        const user = new UserView ();
      } else {
        //render user
        const first = this.collection.at(0);
        const owner = first.attributes.owner;
        const user = new UserView ({ login: owner.login, avatar_url: owner.avatar_url });

        //render gists
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
