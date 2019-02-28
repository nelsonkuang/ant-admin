import React from 'react'
import { Row, Col, Card } from 'antd'
import D3SimpleVoronoiChart from '../components/charts/D3SimpleVoronoiChart'

class SimpleVoronoiChart extends React.Component {
  render() {
    return (
      <div className="gutter-example simple-voronoi-chart-demo">
        <Row gutter={10}>
          <Col className="gutter-row" md={24}>
            <div className="gutter-box">
              <Card
                title="D3 泰森多边形 / 冯洛诺伊图(Voronoi diagram)"
                bordered={false}
              >
                <D3SimpleVoronoiChart />
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default SimpleVoronoiChart
