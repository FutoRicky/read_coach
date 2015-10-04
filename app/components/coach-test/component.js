import Ember from 'ember';
import ajax from 'ic-ajax';
import ENV from '../../config/environment';

export default Ember.Component.extend({
  word: null,
  correctCount: 0,
  test: null,
  stop: false,
  answerStatus: null,
  runClock: false,
  stopSpeechRecognition: false,
  spokenWord: null,
  error: false,
  countdownReady: false,


  didInsertElement() {
      let email = this.session.get('email');
      let token = this.session.get('token');
      let data = {
        email: email,
        token: token
      };
      ajax({
        url: `${ENV.apiURL}/test`,
        type: 'GET',
        accept: 'application/json',
        contentType: 'application/json',
        dataType: 'json',
        data: data
      }).then((res) => {
        this.set('test', res.test);
        this.set('word', this.test[0]);
      });
      this.set('countdownReady', true);
    },

  actions: {
    verifyWord(spokenWord) {
      this.set('spokenWord', spokenWord);
      this.set('error', false);
      if (!this.stop) {
        if (spokenWord === this.word) {
          if (this.correctCount === this.test.length -1) {
            this.set('correctCount', this.correctCount + 1);
            this.set('stopSpeechRecognition', true);
            alert('Time is Up! You got ' + this.get('correctCount') +  'correct!');
          }else {
            this.set('answerStatus', 'CORRECT');
            this.set('correctCount', this.correctCount + 1);
            this.set('word', this.test[this.correctCount]);
          }
        } else {
          this.set('answerStatus', spokenWord + ' IS INCORRECT');
        }
      }
    },
    sendResults() {
      this.set('stop', true);
      let email = this.session.get('email');
      let token = this.session.get('token');
      let wordsRead = this.get('correctCount');
      let data = {
        email: email,
        token: token,
        words_read: wordsRead
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
