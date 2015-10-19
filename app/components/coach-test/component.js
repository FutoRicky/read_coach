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
  spokenWord: null,
  error: false,
  countdownReady: false,
  beginTest: false,


  didInsertElement() {
      let email = this.get('session.email');
      let token = this.get('session.token');
      let data = {
        email: email,
        token: token
      };
      // Call to get words
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
    },

  actions: {
    verifyWord(spokenWord) {
      this.set('spokenWord', spokenWord);
      this.set('error', false);
      if (!this.stop) {
        if (spokenWord === this.word) {
          if (this.correctCount === this.test.length -1) {
            this.set('correctCount', this.correctCount + 1);
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
        this.set('beginTest', false);
        Ember.Logger.debug('data sent');
        this.set('test', res.test);
        Ember.Logger.debug(res);
        // this.set('word', this.test[0]);
      });
    },
    errorOcurred() {
      this.set('error', true);
    },
    beginTest() {
      this.set('beginTest', true);
      this.set('countdownReady', true);
    }
  }
});
