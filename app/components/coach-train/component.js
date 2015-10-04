import Ember from 'ember';
import ajax from 'ic-ajax';
import ENV from '../../config/environment';

export default Ember.Component.extend({
  word: null,
  correctCount: 0,
  training: null,
  image: null,
  stopSpeechRecognition: false,

  didInsertElement() {
      let email = this.session.get('email');
      let token = this.session.get('token');
      let data = {
        email: email,
        token: token
      };
      ajax({
        url: `${ENV.apiURL}/training`,
        type: 'GET',
        accept: 'application/json',
        contentType: 'application/json',
        dataType: 'json',
        data: data
      }).then((res) => {
        this.set('training', res.training);
        this.set('word', this.training[0].word);
        this.set('image', this.training[0].image);
      });
    },

  actions: {
    verifyWord(spokenWord) {
      Ember.Logger.debug(spokenWord);
      if (spokenWord.toLowerCase() === this.word) {
        Ember.Logger.debug('correct');
        if (this.correctCount === this.training.length-1) {
          this.set('correctCount', this.correctCount + 1);
          this.set('stopSpeechRecognition', true);
          alert('awesome job!');
        } else {
          this.set('correctCount', this.correctCount + 1);
          this.set('word', this.training[this.correctCount].word);
          this.set('image', this.training[this.correctCount].image);
        }
      } else {
        Ember.Logger.debug('incorrect');
      }
    }
  }
});
