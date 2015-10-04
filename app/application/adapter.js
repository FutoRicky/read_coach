import Ember from 'ember';
import DS from 'ember-data';
import ENV from '../../config/environment';

const { computed } = Ember;

export default DS.ActiveModelAdapter.extend({
  token: computed(function() {
    return this.container.lookup('simple-auth-session:main').get('secure.token');
  }),
  host: ENV.apiURL,
  namespace: 'read-coach',
  headers: computed(function() {
    if (!Ember.isEmpty(this.get('token'))) {
      return {
        Authorization: this.get('token')
      };
    } else {
      return {};
    }
  })
});
