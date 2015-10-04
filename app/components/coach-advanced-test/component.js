import Ember from 'ember';
import ajax from 'ic-ajax';
import ENV from '../../config/environment';

export default Ember.Component.extend({
  phrase: null,
  correctCount: 0,
  test: null,
  stop: false,
  answerStatus: null,
  stopSpeechRecognition: false,
  spokenPhrase: null,
  error: false,

  didInsertElement() {
      let email = this.session.get('email');
      let token = this.session.get('token');
      let data = {
        email: email,
        token: token
      };
      ajax({
        url: `${ENV.apiURL}/advanced_test`,
        type: 'GET',
        accept: 'application/json',
        contentType: 'application/json',
        dataType: 'json',
        data: data
      }).then((res) => {
        this.set('test', res.test);
        this.set('phrase', this.test[0].toLowerCase());
      });
    },

  actions: {
    verifyWord(spokenPhrase) {
      this.set('spokenPhrase', spokenPhrase);
      this.set('error', false);
      if (!this.stop) {
        if (spokenPhrase === this.phrase) {
          if (this.correctCount === this.test.length -1) {
            this.set('correctCount', this.correctCount + 1);
            this.set('stopSpeechRecognition', true);
            alert('Awesome Job!');
          }else {
            this.set('answerStatus', 'CORRECT');
            this.set('correctCount', this.correctCount + 1);
            this.set('phrase', this.test[this.correctCount].toLowerCase());
          }
        } else {
          this.set('answerStatus', spokenPhrase + ' IS INCORRECT');
        }
      }
    },
    sendResults() {
      this.set('stop', true);
      let email = this.session.get('email');
      let token = this.session.get('token');
      let phraseRead = this.get('correctCount');
      let data = {
        email: email,
        token: token,
        phrase_read: phraseRead
      };
      ajax({
        url: `${ENV.apiURL}/results`,
        type: 'POST',
        accept: 'application/json',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(data)
      }).then((res) => {
        this.set('test', res.test);
        this.set('word', this.test[0]);
      });
    },
    errorOcurred() {
      this.set('error', true);
    }
  }
});
