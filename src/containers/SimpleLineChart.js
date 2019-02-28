import React from 'react'
import { Row, Col, Card } from 'antd'
import D3SimpleLineChart from '../components/charts/D3SimpleLineChart'

class SimpleLineChart extends React.Component {
  render() {
    const data = [
      { date: '2009', apple: 130, banana: 40 },
      { date: '2010', apple: 137, banana: 58 },
      { date: '2011', apple: 166, banana: 97 },
      { date: '2012', apple: 154, banana: 117 },
      { date: '2013', apple: 179, banana: 98 },
      { date: '2014', apple: 187, banana: 120 },
      { date: '2015', apple: 189, banana: 84 },
      { date: '2016', apple: 210, banana: 53 }
    ]
    return (
      <div className="gutter-example simple-line-chart-demo">
        <Row gutter={10}>
          <Col className="gutter-row" md={24}>
            <div className="gutter-box">
              <Card title="D3 简单线状图" bordered={false}>
                <D3SimpleLineChart data={data} />
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default SimpleLineChart
