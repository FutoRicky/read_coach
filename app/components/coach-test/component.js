import Ember from 'ember';
import ajax from 'ic-ajax';
import ENV from '../../config/environment';

export default Ember.Component.extend({
  word: null,
  correctCount: 0,
  test: null,
  stop: false,
  answerStatus: null,

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
    },

  actions: {
    verifyWord(spokenWord) {
      if (!this.stop) {
        if (spokenWord === this.word) {
          if (this.correctCount === this.test.length -1) {
            this.set('correctCount', this.correctCount + 1);
            alert('Awesome Job!');
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
        url: `${ENV.apiURL}/test`,
        type: 'push',
        accept: 'application/json',
        contentType: 'application/json',
        dataType: 'json',
        data: data
      }).then((res) => {
        this.set('test', res.test);
        this.set('word', this.test[0]);
      });
    }
  }
});
