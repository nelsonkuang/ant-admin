import React from 'react'
import { Row, Col, Card } from 'antd'
import D3SimpleChinaMapChart from '../components/charts/D3SimpleChinaMapChart'

class SimpleChinaMapChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFetching: true,
      data: null
    }
  }
  componentDidMount() {
    ;(async () => {
      try {
        const res = await fetch('http://cdn.a4z.cn/json/china.geojson')
        const data = await res.json()
        this.setState({ data, isFetching: false })
      } catch (err) {
        console.log(err)
      }
    })()
  }
  render() {
    return (
      <div className="gutter-example simple-china-map-chart-demo">
        <Row gutter={10}>
          <Col className="gutter-row" md={24}>
            <div className="gutter-box">
              <Card title="D3 简单中国地图" bordered={false}>
                {this.state.isFetching ? (
                  <strong
                    style={{
                      textAlign: 'center',
                      fontSize: '24px',
                      display: 'block'
                    }}
                  >
                    加载中...
                  </strong>
                ) : (
                  <D3SimpleChinaMapChart data={this.state.data} />
                )}
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default SimpleChinaMapChart
