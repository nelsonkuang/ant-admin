import React from 'react'
import { Row, Col, Card } from 'antd'
import D3SimpleChordChart from '../components/charts/D3SimpleChordChart'

class SimpleChordChart extends React.Component {
  render() {
    const data = {
      names: ['北京', '上海', '广州', '深圳'],
      matrix: [
        [11975, 5871, 8916, 2868],
        [1951, 10048, 2060, 6171],
        [8010, 16145, 8090, 8045],
        [1013, 990, 940, 6907]
      ]
    }
    return (
      <div className="gutter-example simple-chord-chart-demo">
        <Row gutter={10}>
          <Col className="gutter-row" md={24}>
            <div className="gutter-box">
              <Card title="D3 简单弦图" bordered={false}>
                <D3SimpleChordChart data={data} />
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default SimpleChordChart
