import Ember from 'ember';
import ajax from 'ic-ajax';
import ENV from '../../config/environment';

export default Ember.Component.extend({
  word: null,
  correctCount: 0,
  training: null,
  image: null,
  loading: false,
  spokenWord: null,
  error: false,

  didInsertElement() {
    this.set('loading', true);
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
      this.set('loading', false);
    });
  },

  actions: {
    verifyWord(spokenWord) {
      this.set('spokenWord', spokenWord);
      this.set('error', false);
      if (spokenWord.toLowerCase() === this.word) {
        if (this.correctCount === this.training.length-1) {
          this.set('correctCount', this.correctCount + 1);
          alert('awesome job!');
        } else {
          this.set('correctCount', this.correctCount + 1);
          this.set('word', this.training[this.correctCount].word);
          this.set('image', this.training[this.correctCount].image);
        }
      }
    },
    errorOcurred() {
      this.set('error', true);
    }
  }
});
