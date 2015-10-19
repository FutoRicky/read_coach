import Ember from 'ember';
import ajax from 'ic-ajax';
import ENV from '../../config/environment';

export default Ember.Component.extend({
  phrase: null,
  correctCount: 0,
  training: null,
  stopSpeechRecognition: false,
  spokenPhrase: null,
  error: false,

  didInsertElement() {
      let email = this.get('session.email');
      let token = this.get('session.token');
      let data = {
        email: email,
        token: token
      };
      ajax({
        url: `${ENV.apiURL}/advanced_training`,
        type: 'GET',
        accept: 'application/json',
        contentType: 'application/json',
        dataType: 'json',
        data: data
      }).then((res) => {
        this.set('training', res.training);
        this.set('phrase', this.training[0]);
      });
    },

  actions: {
    verifyWord(spokenPhrase) {
      this.set('spokenPhrase', spokenPhrase);
      this.set('error', false);
      if (spokenPhrase.toLowerCase() === this.phrase.toLowerCase()) {
        if (this.correctCount === this.training.length-1) {
          this.set('correctCount', this.correctCount + 1);
          this.set('stopSpeechRecognition', true);
          alert('awesome job!');
        } else {
          this.set('correctCount', this.correctCount + 1);
          this.set('phrase', this.training[this.correctCount]);
        }
      }
    },
    errorOcurred() {
      this.set('error', true);
    }
  }
});
