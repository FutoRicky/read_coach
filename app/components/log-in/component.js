import Ember from 'ember';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

export default Ember.Component.extend(LoginControllerMixin, {
  authenticator: 'simple-auth-authenticator:jwt',

  errorMessage: null,

  actions: {
    authenticate() {
      let credentials = this.getProperties('identification', 'password');
      this.get('session').authenticate('simple-auth-authenticator:jwt', credentials)
        .then(() => {
          this.transitionToRoute('main-page');
          this.expirationCall();
          }, (error) => {
          this.set('errorMessage', error.error);
        });
    }
  }

});
