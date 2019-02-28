import React from 'react'
import { Row, Col, Card, Input, message } from 'antd'
import D3ExponentialSpiralLine from '../components/math/D3ExponentialSpiralLine'

class ExponentialSpiralLine extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      exponentialSpiralLine: {
        a: 2
      }
    }

    this.onExponentialSpiralLineAChange = this.onExponentialSpiralLineAChange.bind(
      this
    )
  }

  onExponentialSpiralLineAChange = e => {
    const { exponentialSpiralLine } = this.state
    const value = 1 * e.target.value
    if (value <= 0 || value === 1) {
      message.error('a > 0 且 a ≠ 1')
    } else {
      this.setState({
        exponentialSpiralLine: Object.assign({}, exponentialSpiralLine, {
          a: 1 * value
        })
      })
    }
  }

  render() {
    const { exponentialSpiralLine } = this.state
    return (
      <div className="gutter-example logarithmic-spiral-demo">
        <Row gutter={10}>
          <Col className="gutter-row" md={24}>
            <div className="gutter-box">
              <Card
                title={
                  <span>
                    指数函数图像-极坐标 y=a^x(a>0且a≠1) (x∈R) 设: a =
                    <Input
                      placeholder="请输入a的值"
                      style={{ width: '15%' }}
                      type="number"
                      onChange={this.onExponentialSpiralLineAChange}
                      value={exponentialSpiralLine.a}
                    />
                  </span>
                }
                bordered={false}
              >
                <D3ExponentialSpiralLine a={exponentialSpiralLine.a} />
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ExponentialSpiralLine
