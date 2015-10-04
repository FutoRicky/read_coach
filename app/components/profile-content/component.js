import Ember from 'ember';
import ajax from 'ic-ajax';
import ENV from '../../config/environment';


export default Ember.Component.extend({
  model: null,
  didInsertElement() {
    let email = this.session.get('email');
    let token = this.session.get('token');
    let data = {
      email: email,
      token: token
    };
    Ember.run(this, function() {

      ajax({
        url: `${ENV.apiURL}/profile`,
        type: 'GET',
        accept: 'application/json',
        contentType: 'application/json',
        dataType: 'json',
        data: data
      }).then((res) => {
        this.set('model', res);
      });
    });
  }
});
