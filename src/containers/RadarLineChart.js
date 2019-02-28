import React from 'react'
import { Row, Col, Card } from 'antd'
import D3RadarLineChart from '../components/charts/D3RadarLineChart'

class RadarLineChart extends React.Component {
  render() {
    const data = [
      {
        className: '甲班',
        chinese: 88,
        math: 92,
        physics: 90,
        chemistry: 88,
        english: 95
      },
      {
        className: '乙班',
        chinese: 67,
        math: 78,
        physics: 80,
        chemistry: 72,
        english: 74
      },
      {
        className: '丙班',
        chinese: 77,
        math: 83,
        physics: 68,
        chemistry: 69,
        english: 65
      },
      {
        className: '丁班',
        chinese: 72,
        math: 67,
        physics: 62,
        chemistry: 67,
        english: 68
      }
    ]
    return (
      <div className="gutter-example radar-chart-demo">
        <Row gutter={10}>
          <Col className="gutter-row" md={24}>
            <div className="gutter-box">
              <Card title="D3 雷达图" bordered={false}>
                <D3RadarLineChart data={data} />
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default RadarLineChart
