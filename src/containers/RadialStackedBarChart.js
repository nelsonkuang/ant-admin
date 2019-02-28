import React from 'react'
import { Row, Col, Card } from 'antd'
import D3RadialStackedBarChart from '../components/charts/D3RadialStackedBarChart'

class RadialStackedBarChart extends React.Component {
  render() {
    const data = [
      { city: 'A城市', q1: 3546, q2: 3132, q3: 2299, q4: 1337 },
      { city: 'B城市', q1: 199, q2: 275, q3: 275, q4: 299 },
      { city: 'C城市', q1: 175, q2: 235, q3: 238, q4: 268 },
      { city: 'D城市', q1: 154, q2: 200, q3: 214, q4: 234 },
      { city: 'E城市', q1: 123, q2: 127, q3: 168, q4: 139 },
      { city: 'F城市', q1: 137, q2: 153, q3: 177, q4: 172 },
      { city: 'G城市', q1: 148, q2: 186, q3: 198, q4: 207 },
      { city: 'H城市', q1: 155, q2: 200, q3: 214, q4: 234 },
      { city: 'I城市', q1: 165, q2: 210, q3: 244, q4: 254 },
      { city: 'J城市', q1: 175, q2: 230, q3: 274, q4: 274 },
      { city: 'K城市', q1: 185, q2: 250, q3: 304, q4: 294 },
      { city: 'L城市', q1: 195, q2: 270, q3: 334, q4: 314 },
      { city: 'M城市', q1: 205, q2: 290, q3: 364, q4: 330 },
      { city: 'N城市', q1: 546, q2: 988, q3: 1024, q4: 1254 },
      { city: 'O城市', q1: 3514, q2: 2541, q3: 1987, q4: 1752 },
      { city: 'P城市', q1: 3654, q2: 3787, q3: 3654, q4: 2415 },
      { city: 'Q城市', q1: 368, q2: 385, q3: 244, q4: 545 },
      { city: 'R城市', q1: 232, q2: 555, q3: 274, q4: 274 },
      { city: 'S城市', q1: 358, q2: 344, q3: 304, q4: 787 },
      { city: 'T城市', q1: 855, q2: 865, q3: 334, q4: 875 },
      { city: 'U城市', q1: 453, q2: 422, q3: 364, q4: 330 },
      { city: 'V城市', q1: 568, q2: 478, q3: 875, q4: 254 },
      { city: 'W城市', q1: 554, q2: 234, q3: 695, q4: 948 },
      { city: 'X城市', q1: 938, q2: 875, q3: 304, q4: 585 },
      { city: 'Y城市', q1: 247, q2: 757, q3: 578, q4: 857 },
      { city: 'Z城市', q1: 368, q2: 695, q3: 757, q4: 875 }
    ]
    data.sort(function(a, b) {
      return b.q1 + b.q2 + b.q3 + b.q4 - a.q1 - a.q2 - a.q3 - a.q4
    })
    return (
      <div className="gutter-example grouped-bar-chart-demo">
        <Row gutter={10}>
          <Col className="gutter-row" md={24}>
            <div className="gutter-box">
              <Card title="D3 径向堆栈柱状图" bordered={false}>
                <D3RadialStackedBarChart data={data} />
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default RadialStackedBarChart
