import React from 'react'
import { Row, Col, Card, Input } from 'antd'
import D3ArchimedeanSpiralLine from '../components/math/D3ArchimedeanSpiralLine'

class ArchimedeanSpiralLine extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      archimedeanSpiralLine: {
        a: 0,
        b: 1
      }
    }

    this.onArchimedeanSpiralLineAChange = this.onArchimedeanSpiralLineAChange.bind(
      this
    )
    this.onArchimedeanSpiralLineBChange = this.onArchimedeanSpiralLineBChange.bind(
      this
    )
  }

  onArchimedeanSpiralLineAChange = e => {
    const { archimedeanSpiralLine } = this.state
    const value = 1 * e.target.value
    this.setState({
      archimedeanSpiralLine: Object.assign({}, archimedeanSpiralLine, {
        a: value
      })
    })
  }

  onArchimedeanSpiralLineBChange = e => {
    const { archimedeanSpiralLine } = this.state
    const value = 1 * e.target.value
    this.setState({
      archimedeanSpiralLine: Object.assign({}, archimedeanSpiralLine, {
        b: value
      })
    })
  }

  render() {
    const { archimedeanSpiralLine } = this.state
    return (
      <div className="gutter-example logarithmic-spiral-demo">
        <Row gutter={10}>
          <Col className="gutter-row" md={24}>
            <div className="gutter-box">
              <Card
                title={
                  <span>
                    阿基米德螺线，r = a + bθ 设: a =
                    <Input
                      placeholder="请输入a的值"
                      style={{ width: '15%' }}
                      type="number"
                      onChange={this.onArchimedeanSpiralLineAChange}
                      value={archimedeanSpiralLine.a}
                    />{' '}
                    b =
                    <Input
                      placeholder="请输入b的值"
                      style={{ width: '15%' }}
                      type="number"
                      onChange={this.onArchimedeanSpiralLineBChange}
                      value={archimedeanSpiralLine.b}
                    />
                  </span>
                }
                bordered={false}
              >
                <D3ArchimedeanSpiralLine
                  a={archimedeanSpiralLine.a}
                  b={archimedeanSpiralLine.b}
                />
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ArchimedeanSpiralLine
