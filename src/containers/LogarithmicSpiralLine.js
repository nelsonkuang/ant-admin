import React from 'react'
import { Row, Col, Card, Input, message } from 'antd'
import D3LogarithmicSpiralLine from '../components/math/D3LogarithmicSpiralLine'

class LogarithmicSpiralLine extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      logarithmicSpiralLine: {
        a: Math.E
      }
    }

    this.onLogarithmicSpiralLineAChange = this.onLogarithmicSpiralLineAChange.bind(
      this
    )
  }

  onLogarithmicSpiralLineAChange = e => {
    const { logarithmicSpiralLine } = this.state
    const value = 1 * e.target.value
    if (value <= 0 || value === 1) {
      message.error('a > 0 且 a ≠ 1')
    } else {
      this.setState({
        logarithmicSpiralLine: Object.assign({}, logarithmicSpiralLine, {
          a: 1 * value
        })
      })
    }
  }

  render() {
    const { logarithmicSpiralLine } = this.state
    return (
      <div className="gutter-example logarithmic-spiral-demo">
        <Row gutter={10}>
          <Col className="gutter-row" md={24}>
            <div className="gutter-box">
              <Card
                title={
                  <span>
                    {' '}
                    对数函数图像 - 极坐标， Y = logaX（ a > 0， 且a≠ 1） 设: a ={' '}
                    <Input
                      placeholder="请输入a的值"
                      style={{
                        width: '20%'
                      }}
                      type="number"
                      onChange={this.onLogarithmicSpiralLineAChange}
                      value={logarithmicSpiralLine.a}
                    />{' '}
                  </span>
                }
                bordered={false}
              >
                {' '}
                <D3LogarithmicSpiralLine a={logarithmicSpiralLine.a} />{' '}
              </Card>{' '}
            </div>{' '}
          </Col>{' '}
        </Row>{' '}
      </div>
    )
  }
}

export default LogarithmicSpiralLine
