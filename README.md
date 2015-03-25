# mg-color-scale

A color-scale addon for metrics-graphics. Extrapolates colors for multiple lines
based a defined range consisting of start and end colors.

Applies to lines and areas in the line chart.

**Note:** the addon system is still under heavy development. This project will currently only work with [my pending PR](https://github.com/mozilla/metrics-graphics/pull/351) for metrics-graphics.

### Usage

Install using bower (not yet published):

- `bower install dandehavilland/mg-color-scale --save`

Include `dist/mg_color_scale.js` in your build, or include it in your HTML:

- `<script src="bower_components/mg-color-scale/dist/mg_color_scale.js"></script>`

Import the default styles from `dist/mg_color_scale.css`, or create your own:

- `<link rel="stylesheet" href="bower_components/mg-color-scale/dist/mg_color_scale.css" type="text/css" />`

Enable the addon by setting `args.use_color_scale` to `true`.

Set custom start and end colors:

```
.chart-color-start {
  background-color: darkgreen; }

.chart-color-end {
  background-color: #640000; }
```

### Testing

- `gulp test` to run the Test'em server in continuous mode.
- `npm test` or `gulp test-ci` for a single run, CI mode.


### Requirements

- [Node.JS](http://nodejs.org/)
- [bower](http://bower.io) or [io.js](https://iojs.org/)
- [metrics-graphics](http://metricsgraphicsjs.org/)

### Contributing

Found a bug or have an idea for a new feature? File an issue or, better still, submit a PR :

1. Code your fix / feature.
2. Test it.
3. Submit a PR.
