(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['d3', 'jquery', 'MG'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('d3'), require('jquery'), require('MG'));
  } else {
    root.Mg_color_scale = factory(root.d3, root.jQuery, root.MG);
  }
}(this, function(d3, $, MG) {
/**
  dynamic color scale extension
*/


// adapted from http://www.quirksmode.org/dom/getstyles.html
function getStyle(elem, styleProp) {
  var value;

	if (elem.currentStyle) {
	  value = elem.currentStyle[styleProp];
	} else if (window.getComputedStyle) {
		value = document.defaultView.getComputedStyle(elem,null).getPropertyValue(styleProp);
  }
	return value;
}


var colorStart, colorEnd;

function colorScale(target, numIntervals, reloadColors) {
  if (!colorStart || !colorEnd || reloadColors) {
    var container = document.querySelector(target),
      tmpElem;

    if (!container) {
      console.warn('Could not find target to apply color scale:', target);
      return;
    }

    tmpElem = container.appendChild(document.createElement('span'))

    tmpElem.style.display = 'none';
    document.body.appendChild(tmpElem);

    tmpElem.className = 'chart-color-start';
    colorStart = getStyle(tmpElem, 'background-color');

    tmpElem.className = 'chart-color-end';
    colorEnd = getStyle(tmpElem, 'background-color');
  }

  return d3.scale.linear()
    .domain([0, numIntervals-1])
    .range([colorStart, colorEnd]);
}

function generateColors(chart) {
  var args = chart.args,
    numIntervals = args.data.length,
    scale = colorScale(args.target, numIntervals, true);

  for (var i = 0 ; i < numIntervals; i++) {
    var colorString = scale(i),
      rgb = d3.rgb(colorString),
      rgba = 'rgba('+rgb.r+','+rgb.g+','+rgb.b+','+'0.4)',
      lineId = i + 1;

    jss.set(args.target + ' .mg-main-line.mg-line'+lineId+'-color', {
      'stroke': colorString
    });


    jss.set(args.target + ' .mg-area'+lineId+'-color', {
      'fill': rgba
    });
  }
}

MG.add_hook('line.after_init', generateColors);

return ;
}));
