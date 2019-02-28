;(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    /* eslint-disable global-require */
    // CommonJS
    var d3 = require('d3')
    module.exports = factory(d3)
    /* eslint-enable global-require */
  } else {
    // Browser global.
    // eslint-disable-next-line no-param-reassign
    root.d3.quarticScaleRadial = factory(root.d3)
  }
})(this, function(d3) {
  function quartic(x) {
    return x * x * x * x
  }

  function radial() {
    var linear = d3.scaleLinear()

    function scale(x) {
      return Math.pow(linear(x), 1 / 4)
    }

    scale.domain = function(_) {
      return arguments.length ? (linear.domain(_), scale) : linear.domain()
    }

    scale.nice = function(count) {
      return linear.nice(count), scale
    }

    scale.range = function(_) {
      return arguments.length
        ? (linear.range(_.map(quartic)), scale)
        : linear.range().map(scale)
    }

    scale.ticks = linear.ticks
    scale.tickFormat = linear.tickFormat

    return scale
  }

  return radial
})
