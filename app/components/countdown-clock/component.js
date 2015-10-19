import Ember from 'ember';


export default Ember.Component.extend({
  classNames: ['flipClock'],
  countdownReady: false,

  timer: null,
  didInsertElement() {
    let countdownTimer = this.$('#countDownTimer').FlipClock(60, {
      clockFace: 'MinuteCounter',
      countdown: true,
      counter: 0
    });
    Ember.run(this, function() {
      let _this = this;
      countdownTimer.face.stop = function() {
        _this.send('sendResults');
      };
    });
    this.set('timer', countdownTimer);
  },

  actions: {
    sendResults() {
      this.sendAction('sendResults');
    }
  }
});
