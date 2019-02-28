import React from 'react'
import { Row, Col, Card } from 'antd'
import D3GroupedBarChart from '../components/charts/D3GroupedBarChart'

class GroupedBarChart extends React.Component {
  render() {
    const data = [
      { date: '2011', q1: 155, q2: 200, q3: 214, q4: 234 },
      { date: '2012', q1: 165, q2: 210, q3: 244, q4: 254 },
      { date: '2013', q1: 175, q2: 230, q3: 274, q4: 274 },
      { date: '2014', q1: 185, q2: 250, q3: 304, q4: 294 },
      { date: '2015', q1: 195, q2: 270, q3: 334, q4: 314 },
      { date: '2016', q1: 205, q2: 290, q3: 364, q4: null }
    ]
    return (
      <div className="gutter-example grouped-bar-chart-demo">
        <Row gutter={10}>
          <Col className="gutter-row" md={24}>
            <div className="gutter-box">
              <Card title="D3 组合柱状图" bordered={false}>
                <D3GroupedBarChart data={data} />
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default GroupedBarChart
