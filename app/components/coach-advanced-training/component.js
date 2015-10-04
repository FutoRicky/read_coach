import Ember from 'ember';
import ajax from 'ic-ajax';
import ENV from '../../config/environment';

export default Ember.Component.extend({
  phrase: null,
  correctCount: 0,
  training: null,
  image: null,

  didInsertElement() {
      let email = this.session.get('email');
      let token = this.session.get('token');
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
        this.set('phrase', this.training[0].phrase);
      });
    },

  actions: {
    verifyWord(spokenWord) {
      Ember.Logger.debug(spokenWord);
      if (spokenWord.toLowerCase() === this.phrase.toLowerCase()) {
        Ember.Logger.debug('correct');
        if (this.correctCount === this.training.length-1) {
          this.set('correctCount', this.correctCount + 1);
          alert('awesome job!');
        } else {
          this.set('correctCount', this.correctCount + 1);
          this.set('phrase', this.training[this.correctCount].phrase);
        }
      } else {
        Ember.Logger.debug('incorrect');
      }
    }
  }
});
