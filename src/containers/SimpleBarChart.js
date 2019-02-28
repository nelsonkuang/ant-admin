import React from 'react'
import { Row, Col, Card } from 'antd'
import D3SimpleBarChart from '../components/charts/D3SimpleBarChart'

class SimpleBarChart extends React.Component {
  render() {
    const data = [
      { letter: '一', frequency: 0.08167 },
      { letter: '二', frequency: 0.13492 },
      { letter: '三', frequency: 0.02782 },
      { letter: '四', frequency: 0.04253 },
      { letter: '五', frequency: 0.12702 },
      { letter: '六', frequency: 0.02288 },
      { letter: '日', frequency: 0.22288 }
    ]
    return (
      <div className="gutter-example simple-bar-chart-demo">
        <Row gutter={10}>
          <Col className="gutter-row" md={24}>
            <div className="gutter-box">
              <Card title="D3 简单柱状图" bordered={false}>
                <D3SimpleBarChart data={data} />
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default SimpleBarChart
