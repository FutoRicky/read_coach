import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('coach-advanced-test', 'Unit | Component | coach advanced test', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true,
  needs: [
    'component:countdown-clock',
    'template:components/countdown-clock',
    'component:speech-recognition',
    'template:components/speech-recognition']
});

test('it renders', function(assert) {
  assert.expect(2);
  // Creates the component instance
  let component = this.subject();
  assert.equal(component._state, 'preRender');
  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});
