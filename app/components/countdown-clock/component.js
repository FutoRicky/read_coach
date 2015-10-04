import Ember from 'ember';

export default Ember.Component.extend({
  clockInit(){
    var clck = this;
    setInterval(function() {
      clck.tick.apply(clck);
    },1000);
  },
  tick: function(){
      var s = this.get('_seconds');
      this.set('_seconds',s-1);
  },
  _seconds: 59,
  _minutes: 1,
  _hours: 0,
  seconds: Ember.computed('_seconds', function(){
      var s = this.get('_seconds');
      if(s === -1) {
          this._seconds = 59;
      }
      return this.get('_seconds');
  }),
  minutes: Ember.computed('_minutes', function(){
      var m =  this.get('_minutes');
      var s =  this.get('_seconds');
      if( s === 0) {
          this._minutes = m - 1;
      }
      if( this._minutes === -1) {
          this._minutes = 59;
      }
      return this._minutes;
  }),
  hours: Ember.computed('_minutes', function(){
      var m =  this.get('_minutes');
      var h =  this.get('_hours');
      if( m === 0) {
          this._hours = h - 1;
      }
      return this._hours;
  }),

  didInsertElement() {
    this.clockInit();
  }
});
