/*global webkitSpeechRecognition*/
import Ember from 'ember';

export default Ember.Component.extend({
  enable: false,
  speechRecognition: null,
  stopSpeechRecognition: false,

  language: 'en',

  startRecognition: function() {
    if(!this.stopSpeechRecognition) {
      let speechRecognition = new webkitSpeechRecognition();
      speechRecognition.lang = this.get('language');
      speechRecognition.onresult = Ember.run.bind(this, this.onRecognitionResult);
      speechRecognition.onerror = Ember.run.bind(this, this.onRecognitionError);
      // speechRecognition.onend = Ember.run.bind(this, this.onRecognitionEnd);

      speechRecognition.start();
    }
  },

  onRecognitionError:function() {
    Ember.Logger.debug('error');
  },

  onRecognitionResult: function(e) {
    let result= '';
    let resultNo = 0;
    let alternativeNo = 0;

    result = e.results[resultNo][alternativeNo].transcript;
    this.sendAction('verifyWord', result.toLowerCase());
    this.toggleProperty('enable');
  },

  onEnableChange: Ember.observer('enable', function() {
    this.startRecognition();
  }),

  actions: {
    toggleEnable() {
      this.toggleProperty('enable');
    }
  }
});
