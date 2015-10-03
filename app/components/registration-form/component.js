import Ember from 'ember';
import ValidatableInput from 'ember-cli-html5-validation/mixins/validatable-input';
import ENV from '../../config/environment';
import ajax from 'ic-ajax';

ValidatableInput.reopen({
  renderErrorMessage: Ember.observer('errorMessage', function(){
    var element = this.$(),
      parent = element.parent(),
      errorMessage = this.get('errorMessage');

    if (null === errorMessage) {
      parent.removeClass('has-error');
      element.next('.input-error').remove();
    } else {
      parent.addClass('has-error');
      element.next('.input-error').remove();
    }
  })
});

export default Ember.Component.extend({
  name: null,
  email: null,
  password: '',
  passwordConfirmation: '',
  age: null,
  language: '',
  passwordsMatch: true,
  passwordLength: false,
  emailTaken: false,

  checkPasswordLength: Ember.observer('password', function() {
    if (this.password.length < 8) {
      this.set('passwordLength', false);
    } else {
      this.set('passwordLength', true);
    }
  }),

  actions: {
    submit() {
      let name = this.get('name');
      let email = this.get('email');
      let password = this.get('password');
      let age = this.get('age');
      let language = this.get('language');
      let data;

      if (!age) {
        data = {
          user: {
            name: name,
            email: email,
            password: password,
            password_confirmation: password,
            language: language
          }
        };
      } else {
        data = {
          user: {
            name: name,
            email: email,
            age: age,
            password: password,
            password_confirmation: password,
            language: 'es'
          }
        };
      }


      if (this.passwordsMatch) {
        ajax({
          url: `${ENV.apiURL}/users/sign_up`,
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(data)
        }).then(() => {
          this.setProperties({
            name: null,
            email: null,
            password: '',
            passwordConfirmation: '',
            age: null,
            language: 'es',
            passwordsMatch: true,
            passwordLength: false,
            emailTaken: false
          });
        }, (res) => {
          if( res.jqXHR.responseText === '{"errors":{"email":["has already been taken"]}}' ){
            this.notify.alert('Email has already been taken', {
              closeAfter: null
            });
          }
        });
      }
    },
    checkPasswords(){
      if( this.passwordConfirmation.length !== 0) {
        if ( this.password === this.passwordConfirmation ){
          this.set('passwordsMatch', true);
        } else {
          this.set('passwordsMatch', false);
        }
      }
    }
  }
});
