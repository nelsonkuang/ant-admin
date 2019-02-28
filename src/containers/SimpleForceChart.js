import React from 'react'
import { Row, Col, Card } from 'antd'
import D3SimpleForceChart from '../components/charts/D3SimpleForceChart'

class SimpleForceChart extends React.Component {
  render() {
    const data = {
      nodes: [
        { name: 'A人物' },
        { name: 'B人物' },
        { name: 'C人物' },
        { name: 'D人物' },
        { name: 'E人物' },
        { name: 'F人物' },
        { name: 'G人物' },
        { name: 'H人物' },
        { name: 'I人物' },
        { name: 'J人物' },
        { name: 'K人物' },
        { name: 'L人物' },
        { name: 'M人物' }
      ],
      edges: [
        // value越小关系越近
        { source: 0, target: 1, relation: '朋友', value: 3 },
        { source: 0, target: 2, relation: '朋友', value: 3 },
        { source: 0, target: 3, relation: '朋友', value: 6 },
        { source: 1, target: 2, relation: '朋友', value: 6 },
        { source: 1, target: 3, relation: '朋友', value: 7 },
        { source: 2, target: 3, relation: '朋友', value: 7 },
        { source: 0, target: 4, relation: '朋友', value: 3 },
        { source: 0, target: 5, relation: '朋友', value: 3 },
        { source: 4, target: 5, relation: '夫妻', value: 1 },
        { source: 0, target: 6, relation: '兄弟', value: 2 },
        { source: 4, target: 6, relation: '同学', value: 3 },
        { source: 5, target: 6, relation: '同学', value: 3 },
        { source: 4, target: 7, relation: '同学', value: 4 },
        { source: 5, target: 7, relation: '同学', value: 3 },
        { source: 6, target: 7, relation: '同学', value: 3 },
        { source: 4, target: 8, relation: '师生', value: 4 },
        { source: 5, target: 8, relation: '师生', value: 5 },
        { source: 6, target: 8, relation: '师生', value: 3 },
        { source: 7, target: 8, relation: '师生', value: 5 },
        { source: 8, target: 9, relation: '师生', value: 4 },
        { source: 3, target: 9, relation: '师生', value: 5 },
        { source: 2, target: 10, relation: '母子', value: 1 },
        { source: 10, target: 11, relation: '雇佣', value: 6 },
        { source: 10, target: 12, relation: '雇佣', value: 6 },
        { source: 11, target: 12, relation: '同事', value: 7 }
      ]
    }
    return (
      <div className="gutter-example simple-force-chart-demo">
        <Row gutter={10}>
          <Col className="gutter-row" md={24}>
            <div className="gutter-box">
              <Card title="D3 简单力导向图" bordered={false}>
                <D3SimpleForceChart data={data} />
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default SimpleForceChart
