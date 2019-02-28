import React from 'react'
import { Row, Col, Card } from 'antd'
import D3SimpleLineChartII from '../components/charts/D3SimpleLineChartII'

class SimpleLineChartII extends React.Component {
  render() {
    const data = [
      { time: '00:00', pm25: 75 },
      { time: '01:00', pm25: 66 },
      { time: '02:00', pm25: 43 },
      { time: '03:00', pm25: 32 },
      { time: '04:00', pm25: 20 },
      { time: '05:00', pm25: 18 },
      { time: '06:00', pm25: 16 },
      { time: '07:00', pm25: 33 },
      { time: '08:00', pm25: 53 },
      { time: '09:00', pm25: 66 },
      { time: '10:00', pm25: 55 },
      { time: '11:00', pm25: 67 },
      { time: '12:00', pm25: 99 },
      { time: '13:00', pm25: 138 },
      { time: '14:00', pm25: 110 },
      { time: '15:00', pm25: 99 },
      { time: '16:00', pm25: 119 },
      { time: '17:00', pm25: 125 },
      { time: '18:00', pm25: 173 },
      { time: '19:00', pm25: 168 },
      { time: '20:00', pm25: 162 },
      { time: '21:00', pm25: 143 },
      { time: '22:00', pm25: 132 },
      { time: '23:00', pm25: 87 }
    ]
    return (
      <div className="gutter-example simple-line-chartII-demo">
        <Row gutter={10}>
          <Col className="gutter-row" md={24}>
            <div className="gutter-box">
              <Card title="D3 简单线状图II" bordered={false}>
                <D3SimpleLineChartII data={data} />
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default SimpleLineChartII
