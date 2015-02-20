var styleElem,
  container;

module('colorScale', {
  setup: function() {
    styleElem = $('<style>').appendTo('head');
    container = $('<div>').attr('id', 'targetId').appendTo('body');
  },
  teardown: function() {
    styleElem.remove();
    container.remove();
  }
});

test('retrieves chart colors form CSS', function() {
  styleElem.text(
    '.chart-color-start { background-color: #f00; }'+
    '.chart-color-end { background-color: #00f; }');

  var result = colorScale('#targetId', 2, true);
  equal(result(0), '#ff0000');
  equal(result(1), '#0000ff');
});

test('generates the correct number of colors', function() {
  styleElem.text(
    '.chart-color-start { background-color: #000000; }'+
    '.chart-color-end { background-color: #ffffff; }');

  var result = colorScale('#targetId', 3, true);
  equal(result(-1), '#000000', 'out of range (low) returns min');
  equal(result(0), '#000000');
  equal(result(1), '#808080');
  equal(result(2), '#ffffff');
  equal(result(3), '#ffffff', 'out of range (high) returns max');
});
