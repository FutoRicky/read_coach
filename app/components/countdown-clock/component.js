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
  // runClock: null,
  // clockInit(){
  //   if (this.runClock) {
  //     let clck = this;
  //     setInterval(function() {
  //       clck.tick.apply(clck);
  //     }, 1000);
  //   }
  // },
  // tick: function(){
  //   if (this.runClock) {
  //     let s = this.get('_seconds');
  //     this.set('_seconds',s-1);
  //   }
  // },
  // _seconds: 0,
  // _minutes: 1,
  // _hours: 0,
  // seconds: Ember.computed('_seconds', function(){
  //   if (this.runClock) {
  //     let s = this.get('_seconds');
  //     if(s === -1) {
  //         this.set('_seconds', 59);
  //     }
  //     return this.get('_seconds');
  //   }
  // }),
  // minutes: Ember.computed('_seconds', function(){
  //     let m =  this.get('_minutes');
  //     let s =  this.get('_seconds');
  //     if( s === -1) {
  //         this.set('_minutes', m - 1);
  //     }
  //     if( this._minutes === -1) {
  //         this.set('_minutes', 59);
  //     }
  //     return this._minutes;
  // }),
  // hours: Ember.computed('_minutes', function(){
  //     let m =  this.get('_minutes');
  //     let h =  this.get('_hours');
  //     if( m === 0) {
  //         this._hours = h - 1;
  //     }
  //     return this._hours;
  // }),
  //
  // clockStop: Ember.observer('_hours', '_minutes', '_seconds', function() {
  //   if (this._hours === 0 && this._minutes === 0 && this._seconds === 0) {
  //     this.set('runClock', false);
  //     this.sendAction('sendResults');
  //   }
  // }),
  //
  // didInsertElement: Ember.observer('countdownReady', function(){
  //   this.set('runClock', true);
  //   this.clockInit();
  // })
});
