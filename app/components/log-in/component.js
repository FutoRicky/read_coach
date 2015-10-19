import Ember from 'ember';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';
// import ajax from 'ic-ajax';
// import ENV from '../../config/environment';

export default Ember.Component.extend(LoginControllerMixin, {
  // authenticator: 'simple-auth-authenticator:jwt',
  // identification: null,
  // password: null,

  errorMessage: null,

  actions: {
    authenticate() {
      let credentials = this.getProperties('identification', 'password');
      this.get('session').authenticate('simple-auth-authenticator:token', credentials)
        .then(() => {
          }, (error) => {
          this.set('errorMessage', error.error);
        });
    }
  }

});
