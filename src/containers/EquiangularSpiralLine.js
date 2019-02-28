import React from 'react'
import { Row, Col, Card, Input } from 'antd'
import D3EquiangularSpiralLine from '../components/math/D3EquiangularSpiralLine'

class EquiangularSpiralLine extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      equiangularSpiralLine: {
        a: 0.6,
        k: 0.2
      }
    }

    this.onEquiangularSpiralLineAChange = this.onEquiangularSpiralLineAChange.bind(
      this
    )
    this.onEquiangularSpiralLineKChange = this.onEquiangularSpiralLineKChange.bind(
      this
    )
  }

  onEquiangularSpiralLineAChange = e => {
    const { equiangularSpiralLine } = this.state
    const value = 1 * e.target.value
    this.setState({
      equiangularSpiralLine: Object.assign({}, equiangularSpiralLine, {
        a: 1 * value
      })
    })
  }

  onEquiangularSpiralLineKChange = e => {
    const { equiangularSpiralLine } = this.state
    const value = 1 * e.target.value
    this.setState({
      equiangularSpiralLine: Object.assign({}, equiangularSpiralLine, {
        k: 1 * value
      })
    })
  }

  render() {
    const { equiangularSpiralLine } = this.state
    return (
      <div className="gutter-example logarithmic-spiral-demo">
        <Row gutter={10}>
          <Col className="gutter-row" md={24}>
            <div className="gutter-box">
              <Card
                title={
                  <span>
                    等角螺线, r=a*e^(kθ), a,k是常数,r是极径,θ是极角 设: a =
                    <Input
                      placeholder="请输入a的值"
                      style={{ width: '15%' }}
                      type="number"
                      onChange={this.onEquiangularSpiralLineAChange}
                      value={equiangularSpiralLine.a}
                    />{' '}
                    k =
                    <Input
                      placeholder="请输入k的值"
                      style={{ width: '15%' }}
                      type="number"
                      onChange={this.onEquiangularSpiralLineKChange}
                      value={equiangularSpiralLine.k}
                    />
                  </span>
                }
                bordered={false}
              >
                <D3EquiangularSpiralLine
                  a={equiangularSpiralLine.a}
                  k={equiangularSpiralLine.k}
                />
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default EquiangularSpiralLine
