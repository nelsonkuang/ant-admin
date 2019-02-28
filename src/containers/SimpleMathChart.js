import React from 'react'
import { Row, Col, Card, Input, message } from 'antd'
import D3LinearLine from '../components/math/D3LinearLine'
import D3QuadraticLine from '../components/math/D3QuadraticLine'
import D3ExponentialLine from '../components/math/D3ExponentialLine'
import D3LogarithmicLine from '../components/math/D3LogarithmicLine'
import D3SinusoidLine from '../components/math/D3SinusoidLine'

class SimpleMathChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      linearLine: {
        k: 1,
        b: 0
      },
      quadraticLine: {
        a: 1,
        b: 0,
        c: 0
      },
      exponentialLine: {
        a: Math.E
      },
      logarithmicLine: {
        a: Math.E
      },
      sinusoidLine: {
        a: 1,
        b: 1,
        c: 0,
        d: 0
      }
    }
    this.onLinearLineKChange = this.onLinearLineKChange.bind(this)
    this.onLinearLineBChange = this.onLinearLineBChange.bind(this)
    this.onQuadraticLineAChange = this.onQuadraticLineAChange.bind(this)
    this.onQuadraticLineBChange = this.onQuadraticLineBChange.bind(this)
    this.onQuadraticLineCChange = this.onQuadraticLineCChange.bind(this)
    this.onExponentialLineAChange = this.onExponentialLineAChange.bind(this)
    this.onLogarithmicLineAChange = this.onLogarithmicLineAChange.bind(this)
    this.onSinusoidLineAChange = this.onSinusoidLineAChange.bind(this)
    this.onSinusoidLineBChange = this.onSinusoidLineBChange.bind(this)
    this.onSinusoidLineCChange = this.onSinusoidLineCChange.bind(this)
    this.onSinusoidLineDChange = this.onSinusoidLineDChange.bind(this)
  }

  onLinearLineKChange = e => {
    const { linearLine } = this.state
    this.setState({
      linearLine: Object.assign({}, linearLine, { k: 1 * e.target.value })
    })
  }

  onLinearLineBChange = e => {
    const { linearLine } = this.state
    this.setState({
      linearLine: Object.assign({}, linearLine, { b: 1 * e.target.value })
    })
  }

  onQuadraticLineAChange = e => {
    const { quadraticLine } = this.state
    this.setState({
      quadraticLine: Object.assign({}, quadraticLine, { a: 1 * e.target.value })
    })
  }

  onQuadraticLineBChange = e => {
    const { quadraticLine } = this.state
    this.setState({
      quadraticLine: Object.assign({}, quadraticLine, { b: 1 * e.target.value })
    })
  }

  onQuadraticLineCChange = e => {
    const { quadraticLine } = this.state
    this.setState({
      quadraticLine: Object.assign({}, quadraticLine, { c: 1 * e.target.value })
    })
  }

  onExponentialLineAChange = e => {
    const { exponentialLine } = this.state
    const value = 1 * e.target.value
    if (value <= 0 || value === 1) {
      message.error('a > 0 且 a ≠ 1')
    } else {
      this.setState({
        exponentialLine: Object.assign({}, exponentialLine, { a: 1 * value })
      })
    }
  }

  onLogarithmicLineAChange = e => {
    const { logarithmicLine } = this.state
    const value = 1 * e.target.value
    if (value <= 0 || value === 1) {
      message.error('a > 0 且 a ≠ 1')
    } else {
      this.setState({
        logarithmicLine: Object.assign({}, logarithmicLine, { a: 1 * value })
      })
    }
  }

  onSinusoidLineAChange = e => {
    const { sinusoidLine } = this.state
    this.setState({
      sinusoidLine: Object.assign({}, sinusoidLine, { a: 1 * e.target.value })
    })
  }

  onSinusoidLineBChange = e => {
    const { sinusoidLine } = this.state
    this.setState({
      sinusoidLine: Object.assign({}, sinusoidLine, { b: 1 * e.target.value })
    })
  }

  onSinusoidLineCChange = e => {
    const { sinusoidLine } = this.state
    this.setState({
      sinusoidLine: Object.assign({}, sinusoidLine, { c: 1 * e.target.value })
    })
  }

  onSinusoidLineDChange = e => {
    const { sinusoidLine } = this.state
    this.setState({
      sinusoidLine: Object.assign({}, sinusoidLine, { d: 1 * e.target.value })
    })
  }

  render() {
    const {
      linearLine,
      quadraticLine,
      exponentialLine,
      logarithmicLine,
      sinusoidLine
    } = this.state
    return (
      <div className="gutter-example simple-math-chart-demo">
        <Row gutter={10}>
          <Col className="gutter-row" md={12}>
            <div className="gutter-box">
              <Card
                title={
                  <span>
                    一次函数(linear) y = kx+b 设: k =
                    <Input
                      placeholder="请输入k的值"
                      style={{ width: '15%' }}
                      type="number"
                      onChange={this.onLinearLineKChange}
                    />{' '}
                    b =
                    <Input
                      placeholder="请输入b的值"
                      style={{ width: '15%' }}
                      type="number"
                      onChange={this.onLinearLineBChange}
                    />
                  </span>
                }
                bordered={false}
              >
                <D3LinearLine k={linearLine.k} b={linearLine.b} />
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" md={12}>
            <div className="gutter-box">
              <Card
                title={
                  <span>
                    二次函数(quadratic) y=ax²+bx+c 设: a =
                    <Input
                      placeholder="请输入a的值"
                      style={{ width: '15%' }}
                      type="number"
                      onChange={this.onQuadraticLineAChange}
                    />{' '}
                    b =
                    <Input
                      placeholder="请输入b的值"
                      style={{ width: '15%' }}
                      type="number"
                      onChange={this.onQuadraticLineBChange}
                    />{' '}
                    c =
                    <Input
                      placeholder="请输入c的值"
                      style={{ width: '15%' }}
                      type="number"
                      onChange={this.onQuadraticLineCChange}
                    />
                  </span>
                }
                bordered={false}
              >
                <D3QuadraticLine
                  a={quadraticLine.a}
                  b={quadraticLine.b}
                  c={quadraticLine.c}
                />
              </Card>
            </div>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col className="gutter-row" md={12}>
            <div className="gutter-box">
              <Card
                title={
                  <span>
                    指数函数(exponential) y=a^x(a>0且a≠1) (x∈R) 设: a =
                    <Input
                      placeholder="请输入a的值"
                      style={{ width: '20%' }}
                      type="number"
                      onChange={this.onExponentialLineAChange}
                      value={exponentialLine.a}
                    />
                  </span>
                }
                bordered={false}
              >
                <D3ExponentialLine a={exponentialLine.a} />
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" md={12}>
            <div className="gutter-box">
              <Card
                title={
                  <span>
                    对数函数(logarithmic) Y=logaX(a>0且a≠1) 设: a =
                    <Input
                      placeholder="请输入a的值"
                      style={{ width: '20%' }}
                      type="number"
                      onChange={this.onLogarithmicLineAChange}
                      value={logarithmicLine.a}
                    />
                  </span>
                }
                bordered={false}
              >
                <D3LogarithmicLine a={logarithmicLine.a} />
              </Card>
            </div>
          </Col>
        </Row>

        <Row gutter={10}>
          <Col className="gutter-row" md={24}>
            <div className="gutter-box">
              <Card
                title={
                  <span>
                    正/余弦曲线（Sinusoid/Sine
                    wave）y=Asin(ωx+φ)+k（k、ω、φ∈R且ω≠0）设: A =
                    <Input
                      placeholder="请输入A"
                      style={{ width: '10%' }}
                      type="number"
                      onChange={this.onSinusoidLineAChange}
                    />{' '}
                    ω =
                    <Input
                      placeholder="请输入ω"
                      style={{ width: '10%' }}
                      type="number"
                      onChange={this.onSinusoidLineBChange}
                    />{' '}
                    φ =
                    <Input
                      placeholder="请输入φ"
                      style={{ width: '10%' }}
                      type="number"
                      onChange={this.onSinusoidLineCChange}
                    />{' '}
                    k =
                    <Input
                      placeholder="请输入k"
                      style={{ width: '10%' }}
                      type="number"
                      onChange={this.onSinusoidLineDChange}
                    />
                  </span>
                }
                bordered={false}
              >
                <D3SinusoidLine
                  a={sinusoidLine.a}
                  b={sinusoidLine.b}
                  c={sinusoidLine.c}
                  d={sinusoidLine.d}
                />
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default SimpleMathChart
