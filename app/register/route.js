import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    goToMainPage() {
      this.transitionTo('main-page');
    }
  }
});
