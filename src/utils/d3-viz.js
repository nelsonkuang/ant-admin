// Copyright 2017 Naushad Pasha Puliyambalath
// https://github.com/NPashaP/Viz

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
    root.viz = factory(root.d3)
  }
})(this, function(d3) {
  var viz = { version: '1.1.8' }
  var τ = 2 * Math.PI,
    π = Math.PI,
    π2 = Math.PI / 2

  viz.bP = function() {
    // eslint-disable-next-line
    var key_scale,
      value_scale,
      keyPrimary,
      keySecondary,
      value,
      width,
      height,
      orient,
      barSize,
      min,
      pad,
      data,
      fill,
      g,
      edgeOpacity,
      duration,
      sortPrimary,
      sortSecondary,
      edgeMode
    function bP(_) {
      g = _
      _.each(function() {
        var g = d3.select(this)
        var bars = bP.bars()

        var s = g
          .selectAll('.subBars')
          .data(bars.subBars)
          .enter()
          .append('g')
          .attr('transform', function(d) {
            return 'translate(' + d.x + ',' + d.y + ')'
          })
          .attr('class', 'subBars')
          .append('rect')
          .attr('x', fx)
          .attr('y', fy)
          .attr('width', fw)
          .attr('height', fh)

        if (typeof fill !== 'undefined')
          s.style('fill', function(d) {
            return fill(d)
          })

        var e = g
          .selectAll('.edges')
          .data(bars.edges)
          .enter()
          .append('path')
          .attr('class', 'edges')
          .attr('d', function(d) {
            return d.path
          })
          .style('fill-opacity', bP.edgeOpacity())

        if (typeof fill !== 'undefined')
          e.style('fill', function(d) {
            return fill(d)
          })

        g.selectAll('.mainBars')
          .data(bars.mainBars)
          .enter()
          .append('g')
          .attr('transform', function(d) {
            return 'translate(' + d.x + ',' + d.y + ')'
          })
          .attr('class', 'mainBars')
          .append('rect')
          .attr('x', fx)
          .attr('y', fy)
          .attr('width', fw)
          .attr('height', fh)
          .style('fill-opacity', 0)
          .on('mouseover', bP.mouseover)
          .on('mouseout', bP.mouseout)
      })
    }
    bP.data = function(_) {
      if (!arguments.length) return data
      data = _
      return bP
    }
    bP.fill = function(_) {
      if (!arguments.length) return fill
      fill = _
      return bP
    }
    bP.keyPrimary = function(_) {
      if (!arguments.length)
        return typeof keyPrimary !== 'undefined'
          ? keyPrimary
          : function(d) {
              return d[0]
            }
      keyPrimary = _
      return bP
    }
    bP.sortPrimary = function(_) {
      if (!arguments.length)
        return typeof sortPrimary !== 'undefined' ? sortPrimary : d3.ascending
      sortPrimary = _
      return bP
    }
    bP.keySecondary = function(_) {
      if (!arguments.length)
        return typeof keySecondary !== 'undefined'
          ? keySecondary
          : function(d) {
              return d[1]
            }
      keySecondary = _
      return bP
    }
    bP.sortSecondary = function(_) {
      if (!arguments.length)
        return typeof sortSecondary !== 'undefined'
          ? sortSecondary
          : d3.ascending
      sortSecondary = _
      return bP
    }
    bP.value = function(_) {
      if (!arguments.length)
        return typeof value !== 'undefined'
          ? value
          : function(d) {
              return d[2]
            }
      value = _
      return bP
    }
    bP.width = function(_) {
      if (!arguments.length) return typeof width !== 'undefined' ? width : 400
      width = _
      return bP
    }
    bP.height = function(_) {
      if (!arguments.length) return typeof height !== 'undefined' ? height : 600
      height = _
      return bP
    }
    bP.barSize = function(_) {
      if (!arguments.length)
        return typeof barSize !== 'undefined' ? barSize : 35
      barSize = _
      return bP
    }
    bP.min = function(_) {
      if (!arguments.length) return typeof min !== 'undefined' ? min : 0
      min = _
      return bP
    }
    bP.orient = function(_) {
      if (!arguments.length)
        return typeof orient !== 'undefined' ? orient : 'vertical'
      orient = _
      return bP
    }
    bP.pad = function(_) {
      if (!arguments.length) return typeof pad !== 'undefined' ? pad : 0
      pad = _
      return bP
    }
    bP.duration = function(_) {
      if (!arguments.length)
        return typeof duration !== 'undefined' ? duration : 500
      duration = _
      return bP
    }
    bP.edgeOpacity = function(_) {
      if (!arguments.length)
        return typeof edgeOpacity !== 'undefined' ? edgeOpacity : 0.4
      edgeOpacity = _
      return bP
    }
    bP.edgeMode = function(_) {
      if (!arguments.length)
        return typeof edgeMode !== 'undefined' ? edgeMode : 'curved'
      edgeMode = _
      return bP
    }
    bP.bars = function(mb) {
      var mainBars = { primary: [], secondary: [] }
      var subBars = { primary: [], secondary: [] }
      var key = { primary: bP.keyPrimary(), secondary: bP.keySecondary() }
      var _or = bP.orient()

      calculateMainBars('primary')
      calculateMainBars('secondary')
      calculateSubBars('primary')
      calculateSubBars('secondary')
      floorMainBars() // ensure that main bars is atleast of size mi.n

      return {
        mainBars: mainBars.primary.concat(mainBars.secondary),
        subBars: subBars.primary.concat(subBars.secondary),
        edges: calculateEdges()
      }

      function isSelKey(d, part) {
        return (
          typeof mb === 'undefined' ||
          mb.part === part ||
          key[mb.part](d) === mb.key
        )
      }
      function floorMainBars() {
        var m = bP.min() / 2

        mainBars.primary.forEach(function(d) {
          if (d.height < m) d.height = m
        })
        mainBars.secondary.forEach(function(d) {
          if (d.height < m) d.height = m
        })
      }
      function calculateMainBars(part) {
        function v(d) {
          return isSelKey(d, part) ? bP.value()(d) : 0
        }

        var ps = d3
          .nest()
          // eslint-disable-next-line
          .key(part == 'primary' ? bP.keyPrimary() : bP.keySecondary()) // eslint-disable-next-line
          .sortKeys(part == 'primary' ? bP.sortPrimary() : bP.sortSecondary())
          .rollup(function(d) {
            return d3.sum(d, v)
          })
          .entries(bP.data())
        // eslint-disable-next-line
        var bars = bpmap(
          ps,
          bP.pad(),
          bP.min(),
          0,
          _or == 'vertical' ? bP.height() : bP.width()
        )
        var bsize = bP.barSize()
        ps.forEach(function(d, i) {
          mainBars[part].push({
            // eslint-disable-next-line
            x:
              _or == 'horizontal'
                ? (bars[i].s + bars[i].e) / 2
                : part == 'primary'
                ? bsize / 2
                : bP.width() - bsize / 2, // eslint-disable-next-line
            y:
              _or == 'vertical'
                ? (bars[i].s + bars[i].e) / 2
                : part == 'primary'
                ? bsize / 2
                : bP.height() - bsize / 2, // eslint-disable-next-line
            height: _or == 'vertical' ? (bars[i].e - bars[i].s) / 2 : bsize / 2, // eslint-disable-next-line
            width:
              _or == 'horizontal' ? (bars[i].e - bars[i].s) / 2 : bsize / 2, // eslint-disable-next-line
            part: part,
            key: d.key,
            value: d.value,
            percent: bars[i].p
          })
        })
      }
      function calculateSubBars(part) {
        function v(d) {
          return isSelKey(d, part) ? bP.value()(d) : 0
        }
        // eslint-disable-next-line
        var sort =
          part == 'primary'
            ? function(a, b) {
                return bP.sortPrimary()(a.key, b.key)
              }
            : function(a, b) {
                return bP.sortSecondary()(a.key, b.key)
              }

        var map = d3.map(mainBars[part], function(d) {
          return d.key
        })

        var ps = d3
          .nest() // eslint-disable-next-line
          .key(part == 'primary' ? bP.keyPrimary() : bP.keySecondary()) // eslint-disable-next-line
          .sortKeys(part == 'primary' ? bP.sortPrimary() : bP.sortSecondary()) // eslint-disable-next-line
          .key(part == 'secondary' ? bP.keyPrimary() : bP.keySecondary()) // eslint-disable-next-line
          .sortKeys(part == 'secondary' ? bP.sortPrimary() : bP.sortSecondary()) // eslint-disable-next-line
          .rollup(function(d) {
            return d3.sum(d, v)
          })
          .entries(bP.data())

        ps.forEach(function(d) {
          var g = map.get(d.key)
          var bars = bpmap(
            d.values,
            0,
            0, // eslint-disable-next-line
            _or == 'vertical' ? g.y - g.height : g.x - g.width, // eslint-disable-next-line
            _or == 'vertical' ? g.y + g.height : g.x + g.width
          )

          var bsize = bP.barSize()
          d.values.forEach(function(t, i) {
            subBars[part].push({
              // eslint-disable-next-line
              x:
                _or == 'vertical'
                  ? part == 'primary'
                    ? bsize / 2
                    : bP.width() - bsize / 2
                  : (bars[i].s + bars[i].e) / 2, // eslint-disable-next-line
              y:
                _or == 'horizontal'
                  ? part == 'primary'
                    ? bsize / 2
                    : bP.height() - bsize / 2
                  : (bars[i].s + bars[i].e) / 2, // eslint-disable-next-line
              height: (_or == 'vertical' ? bars[i].e - bars[i].s : bsize) / 2, // eslint-disable-next-line
              width: (_or == 'horizontal' ? bars[i].e - bars[i].s : bsize) / 2, // eslint-disable-next-line
              part: part, // eslint-disable-next-line
              primary: part == 'primary' ? d.key : t.key, // eslint-disable-next-line
              secondary: part == 'primary' ? t.key : d.key, // eslint-disable-next-line
              value: t.value,
              percent: bars[i].p * g.percent, // eslint-disable-next-line
              index:
                part == 'primary' ? d.key + '|' + t.key : t.key + '|' + d.key //index
            })
          })
        })
      }
      function calculateEdges() {
        var map = d3.map(subBars.secondary, function(d) {
          return d.index
        })
        var eMode = bP.edgeMode()

        return subBars.primary.map(function(d) {
          var g = map.get(d.index)
          return {
            path:
              _or === 'vertical'
                ? edgeVert(
                    d.x + d.width,
                    d.y + d.height,
                    g.x - g.width,
                    g.y + g.height,
                    g.x - g.width,
                    g.y - g.height,
                    d.x + d.width,
                    d.y - d.height
                  )
                : edgeHoriz(
                    d.x - d.width,
                    d.y + d.height,
                    g.x - g.width,
                    g.y - g.height,
                    g.x + g.width,
                    g.y - g.height,
                    d.x + d.width,
                    d.y + d.height
                  ),
            primary: d.primary,
            secondary: d.secondary,
            value: d.value,
            percent: d.percent
          }
        })
        function edgeVert(x1, y1, x2, y2, x3, y3, x4, y4) {
          // eslint-disable-next-line
          if (eMode == 'straight')
            return [
              'M',
              x1,
              ',',
              y1,
              'L',
              x2,
              ',',
              y2,
              'L',
              x3,
              ',',
              y3,
              'L',
              x4,
              ',',
              y4,
              'z'
            ].join('')
          var mx1 = (x1 + x2) / 2,
            mx3 = (x3 + x4) / 2
          return [
            'M',
            x1,
            ',',
            y1,
            'C',
            mx1,
            ',',
            y1,
            ' ',
            mx1,
            ',',
            y2,
            ',',
            x2,
            ',',
            y2,
            'L',
            x3,
            ',',
            y3,
            'C',
            mx3,
            ',',
            y3,
            ' ',
            mx3,
            ',',
            y4,
            ',',
            x4,
            ',',
            y4,
            'z'
          ].join('')
        }
        function edgeHoriz(x1, y1, x2, y2, x3, y3, x4, y4) {
          // eslint-disable-next-line
          if (eMode == 'straight')
            return [
              'M',
              x1,
              ',',
              y1,
              'L',
              x2,
              ',',
              y2,
              'L',
              x3,
              ',',
              y3,
              'L',
              x4,
              ',',
              y4,
              'z'
            ].join('')
          var my1 = (y1 + y2) / 2,
            my3 = (y3 + y4) / 2
          return [
            'M',
            x1,
            ',',
            y1,
            'C',
            x1,
            ',',
            my1,
            ' ',
            x2,
            ',',
            my1,
            ',',
            x2,
            ',',
            y2,
            'L',
            x3,
            ',',
            y3,
            'C',
            x3,
            ',',
            my3,
            ' ',
            x4,
            ',',
            my3,
            ',',
            x4,
            ',',
            y4,
            'z'
          ].join('')
        }
      }
      function bpmap(
        a /*array*/,
        p /*pad*/,
        m /*min*/,
        s /*start*/,
        e /*end*/
      ) {
        var r = m / (e - s - 2 * a.length * p) // cut-off for ratios
        var ln = 0,
          lp = 0,
          t = d3.sum(a, function(d) {
            return d.value
          }) // left over count and percent.
        a.forEach(function(d) {
          if (d.value < r * t) {
            ln += 1
            lp += d.value
          }
        })
        var o = t < 1e-5 ? 0 : (e - s - 2 * a.length * p - ln * m) / (t - lp) // scaling factor for percent.
        var b = s,
          ret = []
        a.forEach(function(d) {
          var v = d.value * o
          ret.push({
            s: b + p + (v < m ? 0.5 * (m - v) : 0),
            e: b + p + (v < m ? 0.5 * (m + v) : v),
            p: t < 1e-5 ? 0 : d.value / t
          })
          b += 2 * p + (v < m ? m : v)
        })

        return ret
      }
    }
    bP.update = function(_data) {
      data = _data
      var b1 = bP.bars()
      var dur = bP.duration()

      g.selectAll('.subBars')
        .data(b1.subBars)
        .transition()
        .duration(dur)
        .attr('transform', function(d) {
          return 'translate(' + d.x + ',' + d.y + ')'
        })
        .select('rect')
        .attr('x', fx)
        .attr('y', fy)
        .attr('width', fw)
        .attr('height', fh)

      g.selectAll('.edges')
        .data(b1.edges)
        .transition()
        .duration(dur)
        .attr('d', function(d) {
          return d.path
        })
        .style('fill-opacity', bP.edgeOpacity())

      g.selectAll('.mainBars')
        .data(b1.mainBars)
        .transition()
        .duration(dur)
        .attr('transform', function(d) {
          return 'translate(' + d.x + ',' + d.y + ')'
        })
        .select('rect')
        .attr('x', fx)
        .attr('y', fy)
        .attr('width', fw)
        .attr('height', fh)
        .style('fill-opacity', 0)
    }
    bP.mouseover = function(d) {
      var newbars = bP.bars(d)
      g.selectAll('.mainBars')
        .filter(function(r) {
          return r.part === d.part && r.key === d.key
        })
        .select('rect')
        .style('stroke-opacity', 1)

      g.selectAll('.subBars')
        .data(newbars.subBars)
        .transition()
        .duration(bP.duration())
        .attr('transform', function(d) {
          return 'translate(' + d.x + ',' + d.y + ')'
        })
        .select('rect')
        .attr('x', fx)
        .attr('y', fy)
        .attr('width', fw)
        .attr('height', fh)

      var e = g.selectAll('.edges').data(newbars.edges)

      e.filter(function(t) {
        return t[d.part] === d.key
      })
        .transition()
        .duration(bP.duration())
        .style('fill-opacity', bP.edgeOpacity())
        .attr('d', function(d) {
          return d.path
        })

      e.filter(function(t) {
        return t[d.part] !== d.key
      })
        .transition()
        .duration(bP.duration())
        .style('fill-opacity', 0)
        .attr('d', function(d) {
          return d.path
        })

      g.selectAll('.mainBars')
        .data(newbars.mainBars)
        .transition()
        .duration(bP.duration())
        .attr('transform', function(d) {
          return 'translate(' + d.x + ',' + d.y + ')'
        })
        .select('rect')
        .attr('x', fx)
        .attr('y', fy)
        .attr('width', fw)
        .attr('height', fh)
    }
    bP.mouseout = function(d) {
      var newbars = bP.bars()

      g.selectAll('.mainBars')
        .filter(function(r) {
          return r.part === d.part && r.key === d.key
        })
        .select('rect')
        .style('stroke-opacity', 0)

      g.selectAll('.subBars')
        .data(newbars.subBars)
        .transition()
        .duration(bP.duration())
        .attr('transform', function(d) {
          return 'translate(' + d.x + ',' + d.y + ')'
        })
        .select('rect')
        .attr('x', fx)
        .attr('y', fy)
        .attr('width', fw)
        .attr('height', fh)

      g.selectAll('.edges')
        .data(newbars.edges)
        .transition()
        .duration(bP.duration())
        .style('fill-opacity', bP.edgeOpacity())
        .attr('d', function(d) {
          return d.path
        })

      g.selectAll('.mainBars')
        .data(newbars.mainBars)
        .transition()
        .duration(bP.duration())
        .attr('transform', function(d) {
          return 'translate(' + d.x + ',' + d.y + ')'
        })
        .select('rect')
        .attr('x', fx)
        .attr('y', fy)
        .attr('width', fw)
        .attr('height', fh)
    }
    function fx(d) {
      return -d.width
    }
    function fy(d) {
      return -d.height
    }
    function fw(d) {
      return 2 * d.width
    }
    function fh(d) {
      return 2 * d.height
    }

    return bP
  }
  viz.gg = function() {
    // eslint-disable-next-line
    var innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      needleColor,
      innerFaceColor,
      faceColor,
      domain,
      value,
      angleOffset,
      duration,
      ease,
      g,
      dpg,
      ticks,
      majorTicks,
      minorTickStart,
      minorTickEnd,
      majorTickStart,
      majorTickEnd,
      labelLocation
    var def = {
      innerRadius: 20,
      outerRadius: 150,
      angleOffset: 0.7,
      startAngle: -1.5 * π,
      endAngle: 0.5 * π,
      minorTickStart: 0.9,
      minorTickEnd: 0.95,
      majorTickStart: 0.82,
      majorTickEnd: 0.95,
      needleColor: '#de2c2c',
      innerFaceColor: '#999999',
      faceColor: '#666666',
      domain: [0, 100],
      duration: 500,
      ease: 'cubicInOut',
      ticks: d3.range(0, 101, 2),
      majorTicks: function(d) {
        return d % 10 === 0
      },
      labelLocation: 0.7
    }
    function gg(_) {
      g = _
      _.each(function() {
        var g = d3.select(this)
        var a = gg.scale()
        var mS = gg.minorTickStart(),
          mE = gg.minorTickEnd(),
          MS = gg.majorTickStart(),
          ME = gg.majorTickEnd()
        var ticks = gg.ticks(),
          mT = gg.majorTicks(),
          lL = gg.labelLocation()
        var or = gg.outerRadius()

        g.append('circle')
          .attr('r', or)
          .style('fill', 'url(#vizgg3' + dpg + ')')
          .attr('class', 'face')

        g.append('circle')
          .attr('r', gg.innerRadius())
          .style('fill', 'url(#vizgg2' + dpg + ')')
          .style('filter', 'url(#vizgg5' + dpg + ')')
          .attr('class', 'innerFace')

        var tickg = g.append('g')
        tickg
          .selectAll('line')
          .data(ticks)
          .enter()
          .append('line')
          .attr('class', function(d) {
            return mT(d) ? 'majorTicks' : 'minorTicks'
          })
          .attr('x1', function(d) {
            return or * (mT(d) ? MS : mS) * Math.cos(a(d))
          })
          .attr('y1', function(d) {
            return or * (mT(d) ? MS : mS) * Math.sin(a(d))
          })
          .attr('x2', function(d) {
            return or * (mT(d) ? ME : mE) * Math.cos(a(d))
          })
          .attr('y2', function(d) {
            return or * (mT(d) ? ME : mE) * Math.sin(a(d))
          })

        g.selectAll('text')
          .data(ticks.filter(mT))
          .enter()
          .append('text')
          .attr('class', 'label')
          .attr('x', function(d) {
            return or * lL * Math.cos(a(d))
          })
          .attr('y', function(d) {
            return or * lL * Math.sin(a(d))
          })
          .attr('dy', 3)
          .text(function(d) {
            return d
          })

        var r = gg.outerRadius() / def.outerRadius

        var rot = (gg.scale()(gg.value()) * 180) / π + 90

        g.append('g')
          .attr('transform', 'translate(1,1)')
          .selectAll('.needleshadow')
          .data([0])
          .enter()
          .append('g')
          .attr('transform', 'rotate(' + rot + ')')
          .attr('class', 'needleshadow')
          .append('path')
          .attr(
            'd',
            ['m 0', -130 * r, 5 * r, 175 * r, -10 * r, '0,z'].join(',')
          )
          .style('filter', 'url(#vizgg6' + dpg + ')')

        g.selectAll('.needle')
          .data([0])
          .enter()
          .append('g')
          .attr('transform', 'rotate(' + rot + ')')
          .attr('class', 'needle')
          .append('polygon')
          .attr(
            'points',
            [
              -0.5 * r,
              -130 * r,
              0.5 * r,
              -130 * r,
              5 * r,
              45 * r,
              -5 * r,
              45 * r
            ].join(',')
          )
          .style('fill', 'url(#vizgg4' + dpg + ')')
      })
    }
    gg.scale = function() {
      return d3.scale
        .linear()
        .domain(gg.domain())
        .range([
          def.startAngle + gg.angleOffset(),
          def.endAngle - gg.angleOffset()
        ])
    }
    gg.innerRadius = function(_) {
      if (!arguments.length)
        return typeof innerRadius !== 'undefined'
          ? innerRadius
          : def.innerRadius
      innerRadius = _
      return gg
    }
    gg.outerRadius = function(_) {
      if (!arguments.length)
        return typeof outerRadius !== 'undefined'
          ? outerRadius
          : def.outerRadius
      outerRadius = _
      return gg
    }
    gg.angleOffset = function(_) {
      if (!arguments.length)
        return typeof angleOffset !== 'undefined'
          ? angleOffset
          : def.angleOffset
      angleOffset = _
      return gg
    }
    gg.labelLocation = function(_) {
      if (!arguments.length)
        return typeof labelLocation !== 'undefined'
          ? labelLocation
          : def.labelLocation
      labelLocation = _
      return gg
    }
    gg.ticks = function(_) {
      if (!arguments.length)
        return typeof ticks !== 'undefined' ? ticks : def.ticks
      ticks = _
      return gg
    }
    gg.majorTicks = function(_) {
      if (!arguments.length)
        return typeof majorTicks !== 'undefined' ? majorTicks : def.majorTicks
      majorTicks = _
      return gg
    }
    gg.minorTickStart = function(_) {
      if (!arguments.length)
        return typeof minorTickStart !== 'undefined'
          ? minorTickStart
          : def.minorTickStart
      minorTickStart = _
      return gg
    }
    gg.minorTickEnd = function(_) {
      if (!arguments.length)
        return typeof minorTickEnd !== 'undefined'
          ? minorTickEnd
          : def.minorTickEnd
      minorTickEnd = _
      return gg
    }
    gg.majorTickStart = function(_) {
      if (!arguments.length)
        return typeof majorTickStart !== 'undefined'
          ? majorTickStart
          : def.majorTickStart
      majorTickStart = _
      return gg
    }
    gg.majorTickEnd = function(_) {
      if (!arguments.length)
        return typeof majorTickEnd !== 'undefined'
          ? majorTickEnd
          : def.majorTickEnd
      majorTickEnd = _
      return gg
    }
    gg.needleColor = function(_) {
      if (!arguments.length)
        return typeof needleColor !== 'undefined'
          ? needleColor
          : def.needleColor
      needleColor = _
      return gg
    }
    gg.innerFaceColor = function(_) {
      if (!arguments.length)
        return typeof innerFaceColor !== 'undefined'
          ? innerFaceColor
          : def.innerFaceColor
      innerFaceColor = _
      return gg
    }
    gg.faceColor = function(_) {
      if (!arguments.length)
        return typeof faceColor !== 'undefined' ? faceColor : def.faceColor
      faceColor = _
      return gg
    }
    gg.domain = function(_) {
      if (!arguments.length)
        return typeof domain !== 'undefined' ? domain : def.domain
      domain = _
      return gg
    }
    gg.duration = function(_) {
      if (!arguments.length)
        return typeof duration !== 'undefined' ? duration : def.duration
      duration = _
      return gg
    }
    gg.ease = function(_) {
      if (!arguments.length)
        return typeof ease !== 'undefined' ? ease : def.ease
      ease = _
      return gg
    }
    gg.value = function(_) {
      if (!arguments.length)
        return typeof value !== 'undefined'
          ? value
          : 0.5 * (def.domain[0] + def.domain[1])
      value = _
      return gg
    }
    gg.defs = function(svg, dg) {
      var defs = svg.append('defs')
      dpg = dg
      var nc = gg.needleColor()
      var fc = gg.innerFaceColor()
      var fbc = gg.faceColor()

      var lg1 = viz
        .defs(defs)
        .lG()
        .id('vizgg1' + dg)
        .sel()
      viz
        .defs(lg1)
        .stop()
        .offset('0')
        .stopColor(nc)
      viz
        .defs(lg1)
        .stop()
        .offset('1')
        .stopColor(d3.rgb(nc).darker(1))

      var rg1 = viz
        .defs(defs)
        .rG()
        .id('vizgg2' + dg)
        .fx('35%')
        .fy('65%')
        .r('65%')
        .spreadMethod('pad')
        .sel()
      viz
        .defs(rg1)
        .stop()
        .offset('0')
        .stopColor(fc)
      viz
        .defs(rg1)
        .stop()
        .offset('1')
        .stopColor(d3.rgb(fc).darker(2))

      var rg2 = viz
        .defs(defs)
        .rG()
        .id('vizgg3' + dg)
        .fx('35%')
        .fy('65%')
        .r('65%')
        .spreadMethod('pad')
        .sel()
      viz
        .defs(rg2)
        .stop()
        .offset('0')
        .stopColor(fbc)
      viz
        .defs(rg2)
        .stop()
        .offset('1')
        .stopColor(d3.rgb(fbc).darker(2))

      viz
        .defs(defs)
        .lG()
        .id('vizgg4' + dg)
        .gradientUnits('userSpaceOnUse')
        .y1('80')
        .x1('-10')
        .y2('80')
        .x2('10')
        .xlink('#vizgg1' + dg)

      var fl1 = viz
        .defs(defs)
        .filter()
        .id('vizgg5' + dg)
        .sel()
      viz
        .defs(fl1)
        .feFlood()
        .result('flood')
        .floodColor('rgb(0,0,0)')
        .floodOpacity('0.6')
      viz
        .defs(fl1)
        .feComposite()
        .result('composite1')
        .operator('in')
        .in2('SourceGraphic')
        .in('flood')
      viz
        .defs(fl1)
        .feGaussianBlur()
        .result('blur')
        .stdDeviation('2')
        .in('composite1')
      viz
        .defs(fl1)
        .feOffset()
        .result('offset')
        .dy('2')
        .dx('2')
      viz
        .defs(fl1)
        .feComposite()
        .result('composite2')
        .operator('over')
        .in2('offset')
        .in('SourceGraphic')

      var fl2 = viz
        .defs(defs)
        .filter()
        .x('-0.3')
        .y('-0.3')
        .height('1.8')
        .width('1.8')
        .id('vizgg6' + dg)
        .sel()
      viz
        .defs(fl2)
        .feGaussianBlur()
        .stdDeviation('2')
    }

    gg.setNeedle = function(a) {
      var newAngle = (gg.scale()(a) * 180) / π + 90,
        oldAngle = (gg.scale()(gg.value()) * 180) / π + 90,
        d3ease = gg.ease()
      g.selectAll('.needle')
        .data([a])
        .transition()
        .duration(gg.duration())
        .attrTween('transform', function(d) {
          return iS(oldAngle, newAngle)
        })
        .ease(d3ease)

      g.selectAll('.needleshadow')
        .data([a])
        .transition()
        .duration(gg.duration())
        .attrTween('transform', function(d) {
          return iS(oldAngle, newAngle)
        })
        .ease(d3ease)
        .each('end', function() {
          this.angle = a
        })

      gg.value(a)

      function iS(o, n) {
        return d3.interpolateString('rotate(' + o + ')', 'rotate(' + n + ')')
      }
    }

    return gg
  }
  viz.ch = function() {
    var source = function(d) {
        return d[0]
      },
      target = function(d) {
        return d[1]
      },
      value = function(d) {
        return d[2]
      },
      label = function(d) {
        return d.source + ' (' + d.value + ')'
      },
      sort = d3.ascending,
      padding = 0.03,
      startAngle = 0,
      innerRadius = 180,
      outerRadius = 200,
      chordOpacity = 0.7,
      labelPadding = 0.02,
      min = 0,
      duration = 500,
      reComputeLayout = true,
      g,
      data,
      fill,
      keys,
      subgrp,
      chordExist,
      groups,
      chords,
      newgroups,
      newchords

    function ch(_) {
      g = _

      if (!chords) relayout()
      function arc(d) {
        return viz_arc([innerRadius, outerRadius, d.startAngle, d.endAngle])
      }
      function chord(d) {
        return viz_chord(
          innerRadius,
          d.startAngle,
          d.endAngle,
          innerRadius,
          d.endStartAngle,
          d.endEndAngle
        )
      }

      _.each(function() {
        var g = d3.select(this)

        var grps = g
          .selectAll('.groups')
          .data(groups)
          .enter()
          .append('g')
          .attr('class', 'groups')
          .on('mouseover', ch.mouseover)
          .on('mouseout', ch.mouseout)

        var labels = grps.append('text').attr('class', 'label')
        var r = (1 + ch.labelPadding()) * ch.outerRadius()
        var lbl = ch.label()
        // eslint-disable-next-line
        labels
          .filter(function(d) {
            return d.type == 'g'
          })
          .attr('x', function(d) {
            return r * Math.cos(angle(d))
          })
          .attr('y', function(d) {
            return r * Math.sin(angle(d))
          })
          .text(lbl)
          .style('text-anchor', function(d) {
            var a = angle(d)
            return a < π2 || a > τ - π2 ? 'start' : 'end'
          })
          .each(function(d) {
            this._current = d
          })

        grps
          .append('path')
          .style('fill', function(d) {
            return fill(d.source)
          })
          .style('stroke', function(d) {
            return fill(d.source)
          })
          .attr('d', arc)
          .each(function(d) {
            this._current = d
          }) // eslint-disable-next-line
          .filter(function(d) {
            return d.type == 'g'
          })

        g.append('g')
          .attr('class', 'chords')
          .selectAll('.chord')
          .data(chords)
          .enter()
          .append('g')
          .attr('class', 'chord')
          .append('path')
          .each(function(d) {
            this._current = d
          })
          .attr('d', chord)
          .style('fill', function(d) {
            return fill(d.target)
          })
          .style('opacity', ch.chordOpacity())
          .style('stroke', function(d) {
            return fill(d.target)
          })
          .style('display', function(d) {
            return d.display ? 'inline' : 'none'
          })
      })
    }
    ch.data = function(_) {
      if (!arguments.length) return data
      data = _
      reComputeLayout = true
      return ch
    }
    ch.fill = function(_) {
      if (!arguments.length) return fill
      fill = _
      return ch
    }
    ch.duration = function(_) {
      if (!arguments.length) return duration
      duration = _
      return ch
    }
    ch.chordOpacity = function(_) {
      if (!arguments.length) return chordOpacity
      chordOpacity = _
      return ch
    }
    ch.innerRadius = function(_) {
      if (!arguments.length) return innerRadius
      innerRadius = _
      reComputeLayout = true
      return ch
    }
    ch.outerRadius = function(_) {
      if (!arguments.length) return outerRadius
      outerRadius = _
      reComputeLayout = true
      return ch
    }
    ch.source = function(_) {
      if (!arguments.length) return source
      source = _
      reComputeLayout = true
      return ch
    }
    ch.target = function(_) {
      if (!arguments.length) return target
      target = _
      reComputeLayout = true
      return ch
    }
    ch.value = function(_) {
      if (!arguments.length) return value
      value = _
      reComputeLayout = true
      return ch
    }
    ch.padding = function(_) {
      if (!arguments.length) return padding
      padding = _
      reComputeLayout = true
      return ch
    }
    ch.labelPadding = function(_) {
      if (!arguments.length) return labelPadding
      labelPadding = _
      return ch
    }
    ch.sort = function(_) {
      if (!arguments.length) return sort
      sort = _
      reComputeLayout = true
      return ch
    }
    ch.startAngle = function(_) {
      if (!arguments.length) return startAngle
      startAngle = _
      reComputeLayout = true
      return ch
    }
    ch.chords = function() {
      if (reComputeLayout) relayout()
      return chords
    }
    ch.groups = function() {
      if (reComputeLayout) relayout()
      return groups
    }
    ch.label = function(_) {
      if (!arguments.length) return label
      label = _
      return ch
    }
    ch.mouseover = function(d) {
      relayouts(d.source)
      transition(1)
    }
    ch.mouseout = function(d) {
      transition(0)
    }

    function transition(f) {
      function arc(d, t) {
        return viz_arc([innerRadius, outerRadius, d.startAngle, d.endAngle])
      }
      function chord(d) {
        return viz_chord(
          innerRadius,
          d.startAngle,
          d.endAngle,
          innerRadius,
          d.endStartAngle,
          d.endEndAngle
        )
      }
      function chordTween(a) {
        var i = d3.interpolate(this._current, a)
        this._current = i(0)
        return function(t) {
          return chord(i(t))
        }
      }
      function arcTween(a) {
        var i = d3.interpolate(this._current, a)
        this._current = i(0)
        return function(t) {
          return arc(i(t), t)
        }
      }
      function labelTweenx(a) {
        var i = d3.interpolate(this._current, a)
        this._current = i(0)
        return function(t) {
          return r * Math.cos(angle(i(t)))
        }
      }
      function labelTweeny(a) {
        var i = d3.interpolate(this._current, a)
        this._current = i(0)
        return function(t) {
          return r * Math.sin(angle(i(t)))
        }
      }

      var gp = g.selectAll('.groups').data(f ? newgroups : ch.groups())
      var r = (1 + ch.labelPadding()) * ch.outerRadius()
      var lbl = ch.label()

      gp.select('path')
        .transition()
        .duration(duration)
        .attrTween('d', arcTween)
      // eslint-disable-next-line
      gp.select('.label')
        .filter(function(d) {
          return d.type == 'g'
        })
        .transition()
        .duration(duration)
        .attrTween('x', labelTweenx)
        .attrTween('y', labelTweeny)
        .text(lbl)
        .style('text-anchor', function(d) {
          var a = angle(d)
          return a < π2 || a > τ - π2 ? 'start' : 'end'
        })

      var opacity = ch.chordOpacity()

      g.select('.chords')
        .selectAll('.chord')
        .data(f ? newchords : ch.chords())
        .select('path')
        .transition()
        .duration(duration)
        .attrTween('d', chordTween)
        .style('opacity', function(d) {
          return d.display ? opacity : 0
        })
    }
    function angle(d) {
      return viz_reduceAngle((d.startAngle + d.endAngle) / 2)
    } // eslint-disable-next-line
    function isBottom(d) {
      return angle(d) < 1.5 * π && angle(d) >= 0.5 * π ? 1 : 0
    }
    function relayout() {
      keys = []
      data.forEach(function(d) {
        // eslint-disable-next-line
        if (keys.indexOf(source(d)) == -1) keys.push(source(d)) // eslint-disable-next-line
        if (keys.indexOf(target(d)) == -1) keys.push(target(d))
      })
      keys = keys.sort(sort)

      subgrp = {}
      chordExist = {}
      keys.forEach(function(k) {
        subgrp[k] = {}
        chordExist[k] = {}
        keys.forEach(function(l) {
          subgrp[k][l] = 0
          chordExist[k][l] = false
        })
      })

      data.forEach(function(d) {
        var s = source(d),
          t = target(d)
        subgrp[s][t] += value(d)
        chordExist[s][t] = true
      })

      groups = []

      keys.forEach(function(k, i) {
        //if(chordExist[k][k])
        groups.push({
          source: k,
          type: 'gs',
          value: 0,
          skipPad: true,
          index: i
        })
        groups.push({
          source: k,
          type: 'g',
          value: d3.sum(keys, function(d) {
            return subgrp[k][d]
          }),
          skipPad: false,
          index: i
        })
      })
      viz_circularPartition(groups, padding, min, undefined, startAngle)
      chords = [] // eslint-disable-next-line
      groups
        .filter(function(g) {
          return g.type == 'g'
        })
        .forEach(function(g, gi) {
          var gia = viz_shiftarray(keys.length, gi)

          var grpbarsgia = viz_getbars(
            gia.map(function(d) {
              return subgrp[g.source][keys[d]]
            }),
            0,
            0,
            g.startAngle,
            g.endAngle
          )

          gia.forEach(function(si, i) {
            var t1 = grpbarsgia[i]
            //if(chordExist[g.source][keys[si]])
            chords.push({
              startAngle: t1.c - t1.v / 2,
              endAngle: t1.c + t1.v / 2,
              value: t1.value,
              source: g.source,
              target: keys[si],
              type: 'c',
              display: chordExist[g.source][keys[si]],
              index: gi,
              subindex: si,
              indexsubindex: gi + '-' + si
            })
          })
        })
      var m = d3.map(chords, function(d) {
        return d.indexsubindex
      })
      chords.forEach(function(d) {
        // eslint-disable-next-line
        if (d.subindex == d.index) {
          d.endStartAngle = d.startAngle
          d.endEndAngle = d.startAngle
          return
        }
        var z = m.get(d.subindex + '-' + d.index)
        d.endStartAngle = z.startAngle
        d.endEndAngle = z.startAngle
      })
      reComputeLayout = false
    }
    function relayouts(fixedSource) {
      // eslint-disable-next-line
      var fg = groups.filter(function(g) {
        return g.source == fixedSource && g.type == 'g'
      })[0]
      newgroups = []

      keys.forEach(function(k, i) {
        newgroups.push({
          source: k,
          startAngle: fg.startAngle,
          endAngle: fg.endAngle,
          padAngle: fg.padAngle,
          percent: fg.percent,
          type: 'gs', // eslint-disable-next-line
          value: k == fixedSource ? subgrp[k][k] : 0, // eslint-disable-next-line
          skipPad: k == fixedSource && chordExist[k][k] ? false : true,
          index: i
        }) // eslint-disable-next-line
        if (k == fixedSource)
          newgroups.push({
            source: k,
            startAngle: fg.startAngle,
            endAngle: fg.endAngle,
            padAngle: fg.padAngle,
            percent: fg.percent,
            type: 'g',
            value: fg.value,
            skipPad: false,
            index: i
          })
        else
          newgroups.push({
            source: k,
            type: 'g',
            value: subgrp[fixedSource][k],
            skipPad: false,
            index: i
          })
      })

      viz_circularPartition(newgroups, padding, min, fixedSource, startAngle)

      function mid(z) {
        return z.endAngle + z.startAngle
      }
      var sm = mid(fg)
      groups.forEach(function(g, i) {
        var g1 = newgroups[i]
        var f = mid(g) < sm
        g1.startAngle -= f ? τ : 0
        g1.endAngle -= f ? τ : 0
      })

      newchords = [] // eslint-disable-next-line
      newgroups
        .filter(function(g) {
          return g.type == 'g'
        })
        .forEach(function(g, gi) {
          var gia = viz_shiftarray(keys.length, gi)

          var a0 = gia.map(function(d) {
            var k = keys[d] // eslint-disable-next-line
            return g.source == fixedSource
              ? subgrp[g.source][k]
              : k == fixedSource
              ? subgrp[k][g.source]
              : 0
          })

          var grpbarsgia = viz_getbars(a0, 0, 0, g.startAngle, g.endAngle)

          gia.forEach(function(si, i) {
            var t1 = grpbarsgia[i]
            newchords.push({
              startAngle: t1.c - t1.v / 2,
              endAngle: t1.c + t1.v / 2,
              value: t1.value,
              source: g.source,
              target: keys[si],
              type: 'c',
              display: g.source === fixedSource,
              index: gi,
              subindex: si,
              indexsubindex: gi + '-' + si
            })
          })
        })
      var m = d3.map(
        newchords.map(function(d) {
          return {
            startAngle: d.startAngle,
            endAngle: d.endAngle,
            indexsubindex: d.indexsubindex
          }
        }),
        function(d) {
          return d.indexsubindex
        }
      ) // eslint-disable-next-line
      var gmap = d3.map(
        newgroups.filter(function(d) {
          return d.type == 'gs'
        }),
        function(d) {
          return d.source
        }
      )

      newchords.forEach(function(d) {
        // eslint-disable-next-line
        if (d.subindex == d.index) {
          var g0 = gmap.get(d.source)
          d.endStartAngle = g0.startAngle
          d.endEndAngle = g0.endAngle
          return
        }
        var z = m.get(d.subindex + '-' + d.index)
        d.endStartAngle = z.startAngle
        d.endEndAngle = z.endAngle
        if (d.source !== fixedSource) {
          d.startAngle = d.endAngle
          d.endEndAngle = d.endStartAngle
        }
      })
    }
    function viz_circularPartition(data, pad, min, fixedSource, startAngle) {
      var fixed = fixedSource !== undefined,
        ind = 0

      if (fixed) {
        var found = false
        for (; ind < data.length; ind++) {
          // eslint-disable-next-line
          if (data[ind].source == fixedSource && data[ind].type == 'g') {
            found = true
            break
          }
        }
        if (!found)
          console.log(
            "The fixed source '" + fixedSource + "' is not a valid key"
          )
      }
      var dorder = d3.range(data.length)
      if (fixed) dorder = dorder.slice(ind).concat(dorder.slice(0, ind))
      // eslint-disable-next-line
      var a0 = data
        .filter(function(d) {
          return (
            (!fixed || d.source !== fixedSource || d.type != 'g') && !d.skipPad
          )
        })
        .map(function(d) {
          return d.value
        })

      var ta =
        2 * Math.PI -
        (fixed ? data[ind].endAngle - data[ind].startAngle + 2 * pad : 0)

      var x = fixed ? data[ind].endAngle + pad : startAngle,
        total = d3.sum(a0)
      var r = viz_getratio(
        a0,
        pad,
        min,
        ta <= 0 ? 0 : ta,
        total,
        fixed ? true : false
      )

      dorder.slice(fixed ? 1 : 0).forEach(function(i) {
        var v = r * data[i].value
        var w = (v < min ? min - v : 0) / 2

        data[i].startAngle = x
        data[i].endAngle = x + v
        data[i].padAngle = w
        data[i].percent = data[i].value / (total || 1)

        x += v + w + (data[i].skipPad ? 0 : pad)
      })
    }

    return ch
  }
  viz.defs = function(_) {
    var defs = {},
      sel = _
    defs.sel = function() {
      return sel
    }
    defs.lG = function() {
      sel = sel.append('linearGradient')
      return defs
    }
    defs.rG = function() {
      sel = sel.append('radialGradient')
      return defs
    }
    defs.stop = function() {
      sel = sel.append('stop')
      return defs
    }
    defs.filter = function() {
      sel = sel.append('filter')
      return defs
    }
    defs.feFlood = function() {
      sel = sel.append('feFlood')
      return defs
    }
    defs.feComposite = function() {
      sel = sel.append('feComposite')
      return defs
    }
    defs.feOffset = function() {
      sel = sel.append('feOffset')
      return defs
    }
    defs.feGaussianBlur = function() {
      sel = sel.append('feGaussianBlur')
      return defs
    }
    defs.result = function(_) {
      sel = sel.attr('result', _)
      return defs
    }
    defs.floodColor = function(_) {
      sel = sel.attr('flood-color', _)
      return defs
    }
    defs.floodOpacity = function(_) {
      sel = sel.attr('flood-opacity', _)
      return defs
    }
    defs.stdDeviation = function(_) {
      sel = sel.attr('stdDeviation', _)
      return defs
    }
    defs.operator = function(_) {
      sel = sel.attr('operator', _)
      return defs
    }
    defs.height = function(_) {
      sel = sel.attr('height', _)
      return defs
    }
    defs.width = function(_) {
      sel = sel.attr('width', _)
      return defs
    }
    defs.in = function(_) {
      sel = sel.attr('in', _)
      return defs
    }
    defs.in2 = function(_) {
      sel = sel.attr('in2', _)
      return defs
    }
    defs.id = function(_) {
      sel = sel.attr('id', _)
      return defs
    }
    defs.fx = function(_) {
      sel = sel.attr('fx', _)
      return defs
    }
    defs.fy = function(_) {
      sel = sel.attr('fy', _)
      return defs
    }
    defs.dx = function(_) {
      sel = sel.attr('dx', _)
      return defs
    }
    defs.dy = function(_) {
      sel = sel.attr('dy', _)
      return defs
    }
    defs.x1 = function(_) {
      sel = sel.attr('x1', _)
      return defs
    }
    defs.y1 = function(_) {
      sel = sel.attr('y1', _)
      return defs
    }
    defs.x2 = function(_) {
      sel = sel.attr('x2', _)
      return defs
    }
    defs.y2 = function(_) {
      sel = sel.attr('y2', _)
      return defs
    }
    defs.x = function(_) {
      sel = sel.attr('x', _)
      return defs
    }
    defs.y = function(_) {
      sel = sel.attr('y', _)
      return defs
    }
    defs.r = function(_) {
      sel = sel.attr('r', _)
      return defs
    }
    defs.spreadMethod = function(_) {
      sel = sel.attr('spreadMethod', _)
      return defs
    }
    defs.gradientUnits = function(_) {
      sel = sel.attr('gradientUnits', _)
      return defs
    }
    defs.xlink = function(_) {
      sel = sel.attr('xlink:href', _)
      return defs
    }
    defs.offset = function(_) {
      sel = sel.attr('offset', _)
      return defs
    }
    defs.stopColor = function(_) {
      sel = sel.attr('stop-color', _)
      return defs
    }
    defs.path = function() {
      sel = sel.append('path')
      return defs
    }
    defs.d = function(_) {
      sel = sel.attr('d', _)
      return defs
    }
    return defs
  }
  viz.bar = function() {
    function bar(_) {
      this.g = _
      _.each(function() {
        var g = d3.select(this)

        var bars = bar.bars()
        var dock = bar.dock() // eslint-disable-next-line
        var top_ = dock == 't',
          bot = dock == 'b',
          left = dock == 'l',
          rght = dock == 'r' // eslint-disable-next-line
        var topbot = dock == 't' || dock == 'b'

        var primaryBars = g
          .selectAll('.primarybars')
          .data(bars)
          .enter()
          .append('g')
          .attr('class', 'primaryBars')
          .attr('transform', function(d) {
            return 'translate(' + d.x + ',' + d.y + ')'
          })

        var secondaryBars = primaryBars
          .selectAll('.secondaryBars')
          .data(function(d) {
            return d.values
          })
          .enter()
          .append('g')
          .attr('class', 'secondaryBars')
          .attr('transform', function(d) {
            return 'translate(' + d.x + ',' + d.y + ')'
          })

        var fill = bar.fill()

        var s = secondaryBars
          .append('rect')
          .attr('width', viz_width)
          .attr('height', viz_height)

        var l = bar.paddingLabel()

        if (fill !== undefined) s.style('fill', fill)
        primaryBars
          .append('text')
          .attr('class', 'primaryvalue')
          .attr('x', function(d) {
            return d.wf * d.width
          })
          .attr('y', function(d) {
            return d.hf * d.height
          })
          .attr('dx', function(d) {
            return 2 * l * (d.wf - 0.5)
          })
          .attr('dy', function(d) {
            return topbot ? (d.hf ? 3 * l : -l) : l
          })
          .style('text-anchor', function(d) {
            return topbot ? 'middle' : d.wf ? 'start' : 'end'
          })
          .text(bar.valuePrimary())

        primaryBars
          .append('text')
          .attr('class', 'primarykey')
          .attr('x', function(d) {
            return (1 - d.wf) * d.width
          })
          .attr('y', function(d) {
            return (1 - d.hf) * d.height
          })
          .attr('dx', function(d) {
            return !topbot ? (d.wf ? -l : l) : 0
          })
          .attr('dy', function(d) {
            return topbot ? (d.hf ? -l : 3 * l) : l
          })
          .style('text-anchor', function(d) {
            return topbot ? 'middle' : d.wf ? 'end' : 'start'
          })
          .text(viz_key)

        secondaryBars
          .append('text')
          .attr('class', 'secondaryvalue')
          .attr('x', viz_width2)
          .attr('y', viz_height2)
          .attr('dy', l)
          .text(bar.valueSecondary())
          .style('text-anchor', 'middle')
      })
    }
    bar.data = viz_assign(bar)
    bar.width = viz_assign_default(bar, 400)
    bar.height = viz_assign_default(bar, 400)
    bar.dock = viz_assign_default(bar, 'b')
    bar.fill = viz_assign_default(bar, undefined)
    bar.paddingInner = viz_assign_default(bar, 0.1)
    bar.paddingOuter = viz_assign_default(bar, 0.1)
    bar.paddingLabel = viz_assign_default(bar, 6)
    bar.value = viz_assign_default(bar, viz_d1)
    bar.keyPrimary = viz_assign_default(bar, viz_d0)
    bar.keySecondary = viz_assign_default(bar, undefined)
    bar.sortPrimary = viz_assign_default(bar, d3.ascending)
    bar.sortSecondary = viz_assign_default(bar, d3.ascending)
    bar.valuePrimary = viz_assign_default(bar, viz_value)
    bar.valueSecondary = viz_assign_default(bar, viz_value)
    bar.valueDomain = viz_assign_default(bar, undefined)
    bar.primaryKeys = function() {
      return d3
        .set(this.data, bar.keyPrimary())
        .values()
        .sort(bar.sortPrimary())
    }
    bar.keyScale = function() {
      var dock = bar.dock()
      var range = {
        l: bar.height(),
        r: bar.height(),
        t: bar.width(),
        b: bar.width()
      }

      return d3
        .scaleBand()
        .domain(bar.primaryKeys())
        .range([0, range[dock]])
        .paddingInner(bar.paddingInner())
        .paddingOuter(bar.paddingOuter())
    }
    function nest() {
      var noSecondary = bar.keySecondary() === undefined
      var ps = d3
        .nest()
        .key(bar.keyPrimary())
        .sortKeys(bar.sortPrimary())

      if (!noSecondary)
        ps = ps.key(bar.keySecondary()).sortKeys(bar.sortSecondary())

      var v = bar.value()
      ps = ps
        .rollup(function(d) {
          return d3.sum(d, v)
        })
        .entries(bar.data())
      if (noSecondary)
        ps.forEach(function(d) {
          d.values = [{ value: d.value }]
          delete d.value
        })
      return ps
    }
    bar.valueScale = function() {
      var dock = bar.dock() // eslint-disable-next-line
      var bot = dock == 'b',
        left = dock == 'l',
        rght = dock == 'r'
      var h = bar.height(),
        w = bar.width()
      var range = left ? [0, w] : rght ? [w, 0] : bot ? [h, 0] : [0, h]

      var domain = bar.valueDomain() // eslint-disable-next-line
      if (domain == undefined) {
        var ps = nest()
        var min = d3.min(ps, function(d) {
          return d3.sum(d.values, viz_value)
        })
        var max = d3.max(ps, function(d) {
          return d3.sum(d.values, viz_value)
        })
        domain = [Math.min(0, min), max]
      }

      return d3
        .scaleLinear()
        .domain(domain)
        .range(range)
    }
    bar.bars = function() {
      // eslint-disable-next-line
      var data = bar.data()
      var h = bar.height(),
        w = bar.width()
      var dock = bar.dock() // eslint-disable-next-line
      var top_ = dock == 't',
        bot = dock == 'b',
        left = dock == 'l',
        rght = dock == 'r' // eslint-disable-next-line
      var topbot = dock == 't' || dock == 'b'
      var ps = nest()
      var keyScale = bar.keyScale()

      var domain = bar.valueDomain()
      var range = left ? [0, w] : rght ? [w, 0] : bot ? [h, 0] : [0, h] // eslint-disable-next-line
      if (domain == undefined) {
        var min = d3.min(ps, function(d) {
          return d3.sum(d.values, viz_value)
        })
        var max = d3.max(ps, function(d) {
          return d3.sum(d.values, viz_value)
        })
        domain = [Math.min(0, min), max]
      }

      var valueScale = d3
        .scaleLinear()
        .domain(domain)
        .range(range)
      var bw = keyScale.bandwidth()
      var d0 = valueScale(0)
      ps.forEach(function(d) {
        d.value = d3.sum(d.values, viz_value)
        var d1 = valueScale(d.value),
          absd = Math.abs(d1 - d0),
          mind = Math.min(d0, d1)

        d.width = topbot ? bw : absd
        d.height = !topbot ? bw : absd
        d.x = topbot ? keyScale(d.key) : mind
        d.y = !topbot ? keyScale(d.key) : mind
        d.wf = topbot ? 0.5 : left ? (d.value < 0 ? 0 : 1) : d.value < 0 ? 1 : 0
        d.hf = !topbot ? 0.5 : bot ? (d.value < 0 ? 1 : 0) : d.value < 0 ? 0 : 1

        var z = bot ? 0 : rght ? 0 : 0
        d.values.forEach(function(v) {
          v.primaryKey = d.key
          v.secondaryKey = v.key
          delete v.key
          var v0 = valueScale(z),
            v1 = valueScale((z += v.value)),
            absv = Math.abs(v1 - v0),
            minv = Math.min(v0, v1)

          v.width = !topbot ? absv : bw
          v.height = topbot ? absv : bw
          v.x = !topbot ? minv - d.x : 0
          v.y = topbot ? minv - d.y : 0
        })
      })
      return ps
    }
    return bar
  }
  viz.lg = function() {
    function lg(_) {
      this.g = _
      _.each(function() {
        var g = d3.select(this)

        var rows = lg.rows(),
          data = lg.data() // eslint-disable-next-line
        rows = rows == undefined ? data.length : Math.min(rows, data.length)
        var cols = Math.ceil(data.length / rows)

        var rowScale = d3
          .scaleBand()
          .domain(d3.range(rows))
          .range([0, lg.height()])
          .paddingInner(lg.paddingInner())
        var colScale = d3
          .scaleBand()
          .domain(d3.range(cols))
          .range([0, lg.width()])
        // eslint-disable-next-line
        var size = lg.size(),
          cellHeight = rowScale.bandwidth(),
          cellWidth = colScale.bandwidth(),
          paddingLabel = lg.paddingLabel()

        var loc = d3.range(data.length).map(function(k) {
          var x = k % cols,
            y = (k - x) / cols
          return {
            x: colScale(x),
            y: rowScale(y),
            width: size,
            height: cellHeight,
            key: data[k]
          }
        })

        var legendg = g
          .selectAll('.legendg')
          .data(loc, function(d) {
            return d.key
          })
          .enter()
          .append('g')
          .attr('class', 'legendg')
          .attr('transform', function(d) {
            return 'translate(' + d.x + ',' + d.y + ')'
          })

        legendg
          .append('text')
          .attr('x', function(d) {
            return size + paddingLabel
          })
          .attr('y', function(d) {
            return d.height / 2
          })
          .attr('dy', 6)
          .text(function(d) {
            return d.key
          })

        legendg.each(lg.draw())
        var fill = lg.fill()
        if (fill !== undefined) {
          legendg.selectAll('.legend-icon').style('fill', fill)
        }
      })
    }

    lg.data = viz_assign(lg)
    lg.rows = viz_assign_default(lg, undefined)
    lg.width = viz_assign_default(lg, 100)
    lg.height = viz_assign_default(lg, 200)
    lg.paddingInner = viz_assign_default(lg, 0.1)
    lg.paddingLabel = viz_assign_default(lg, 6)
    lg.size = viz_assign_default(lg, 12)
    lg.fill = viz_assign_default(lg, undefined)
    lg.rect = function(d) {
      d3.select(this)
        .append('rect')
        .attr('class', 'legend-icon')
        .attr('height', viz_height)
        .attr('width', viz_width)
    }
    lg.circle = function(d) {
      d3.select(this)
        .append('circle')
        .attr('class', 'legend-icon')
        .attr('r', Math.min(d.height, d.width))
        .attr('cx', viz_width2)
        .attr('cy', viz_height2)
    }
    lg.draw = viz_assign_default(lg, lg.rect)
    return lg
  } // eslint-disable-next-line
  function viz_d(d) {
    return d
  }
  function viz_d0(d) {
    return d[0]
  }
  function viz_d1(d) {
    return d[1]
  } // eslint-disable-next-line
  function viz_x(d) {
    return d.x
  } // eslint-disable-next-line
  function viz_y(d) {
    return d.y
  }
  function viz_height(d) {
    return d.height
  }
  function viz_width(d) {
    return d.width
  }
  function viz_height2(d) {
    return d.height / 2
  }
  function viz_width2(d) {
    return d.width / 2
  }
  function viz_key(d) {
    return d.key
  }
  function viz_value(d) {
    return d.value
  }

  function viz_assign(o) {
    var x
    return function(_) {
      if (!arguments.length) return x
      x = _
      return o
    }
  }
  function viz_assign_default(o, d) {
    var x
    return function(_) {
      if (!arguments.length) return typeof x !== 'undefined' ? x : d
      x = _
      return o
    }
  }

  function viz_reduceAngle(a) {
    while (a > τ) a -= τ
    while (a < 0) a += τ
    return a
  } // eslint-disable-next-line
  function viz_polar(r, a) {
    return { x: r * Math.cos(a), y: r * Math.sin(a) }
  }
  function viz_getratio(a0, p, m, h, tt, f) {
    if (tt <= 0 || h <= 0) return 0
    var a = a0.concat().sort(d3.ascending)
    var h0 = h - a.length * p + (f ? p : 0)
    var ret = [],
      r = 0,
      t = 0

    d3.range(a.length).forEach(function(d) {
      t = (h0 - m * d) / (tt -= a[d - 1] || 0)
      r += a[d] * t <= m ? 1 : 0
      ret.push(t)
    })
    return ret[r]
  }
  function viz_getbars(a, p, m, h0, h1) {
    var x = h0,
      total = d3.sum(a)
    var r = viz_getratio(a, p, m, h1 - h0, total, false)
    var s = a.map(function(d) {
      var v = r * d
      var w = (v < m ? m : v) / 2
      x += 2 * w + p
      return { c: x - w, v: v, w: w, value: d, percent: d / (total || 1) }
    })
    return s
  }
  function viz_arc(x) {
    function polar(r, t) {
      return [r * Math.cos(t), r * Math.sin(t)]
    }
    var ss = polar(x[0], x[2]),
      se = polar(x[0], x[3]),
      es = polar(x[1], x[2]),
      ee = polar(x[1], x[3])
    return [
      'M',
      ss,
      'A',
      x[0],
      x[0],
      '0',
      x[3] - x[2] > π ? 1 : 0,
      '1',
      se,
      'L',
      ee,
      'A',
      x[1],
      x[1],
      '0',
      x[3] - x[2] > π ? 1 : 0,
      '0',
      es,
      'z'
    ].join(' ')
  }
  function viz_chord(rs, ss, se, re, es, ee) {
    var pss = p(rs, ss),
      pse = p(rs, se),
      pes = p(re, es),
      pee = p(re, ee)

    return (
      'M' +
      pss +
      arc(rs, pse, se - ss) + // eslint-disable-next-line
      (ss == es && se == ee
        ? curve(pss, ss, se, re)
        : curve(pes, se, es, re) +
          arc(re, pee, ee - es) +
          curve(pss, ss, ee, rs)) +
      'Z'
    )

    function arc(r, p, a) {
      return 'A' + r + ',' + r + ' 0 ' + +(a > π) + ',1 ' + p
    }
    function p(r, a) {
      return [r * Math.cos(a), r * Math.sin(a)]
    } // eslint-disable-next-line
    function eq(a, b) {
      return a.a0 == b.a0 && a.a1 == b.a1
    }
    function curve(p1, a0, a1, r) {
      a1 = a1 + (a1 < a0 ? τ : 0)
      var a = a1 - a0
      var t = 1 - (a > π ? τ - a : a) / π
      t = Math.pow(t, 5)
      var a2 = (a1 + a0) / 2 - (a1 - a0 > π ? π : 0)
      return 'Q' + t * r * Math.cos(a2) + ',' + t * r * Math.sin(a2) + ' ' + p1
    }
  }

  function viz_shiftarray(n, i) {
    var ret = []
    for (var s = i; s > i - n; s--) {
      ret.push(s < 0 ? s + n : s)
    }
    return ret
  }
  return viz
})
