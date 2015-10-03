import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('register');
  this.route('main-page', function() {
    this.route('read-test');
    this.route('read-train');
  });
  this.route('profile');
});

export default Router;
