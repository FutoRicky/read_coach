import Ember from 'ember';


export default Ember.Component.extend({
  classNames: ['flipClock'],

  timer: null,
  didInsertElement() {
    let countdownTimer = this.$('#countDownTimer').FlipClock(60, {
      clockFace: 'MinuteCounter',
      countdown: true,
      counter: 0
    });
    countdownTimer.face.stop = function() {
      Ember.Logger.debug('time ended');
    };
    this.set('timer', countdownTimer);
  }
});
