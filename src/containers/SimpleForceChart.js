import React from 'react';
import { Row, Col, Card } from 'antd';
import D3SimpleForceChart from '../components/charts/D3SimpleForceChart';

class SimpleForceChart extends React.Component {
    render() {
        const data = {
            nodes: [
                {name: 'A人物'},
                {name: 'B人物'},
                {name: 'C人物'},
                {name: 'D人物'},
                {name: 'E人物'},
                {name: 'F人物'},
                {name: 'G人物'},
                {name: 'H人物'},
                {name: 'I人物'},
                {name: 'J人物'},
                {name: 'K人物'},
                {name: 'L人物'},
                {name: 'M人物'},
            ],
            edges: [
                { "source": 0 , "target": 1 , "relation":"朋友" },
                { "source": 0 , "target": 2 , "relation":"朋友" },
                { "source": 0 , "target": 3 , "relation":"朋友" },
                { "source": 1 , "target": 2 , "relation":"朋友" },
                { "source": 1 , "target": 3 , "relation":"朋友" },
                { "source": 2 , "target": 3 , "relation":"朋友" },
                { "source": 0 , "target": 4 , "relation":"朋友" },
                { "source": 0 , "target": 5 , "relation":"朋友" },
                { "source": 4 , "target": 5 , "relation":"夫妻" },
                { "source": 0 , "target": 6 , "relation":"兄弟" },
                { "source": 4 , "target": 6 , "relation":"同学" },
                { "source": 5 , "target": 6 , "relation":"同学" },
                { "source": 4 , "target": 7 , "relation":"同学" },
                { "source": 5 , "target": 7 , "relation":"同学" },
                { "source": 6 , "target": 7 , "relation":"同学" },
                { "source": 4 , "target": 8 , "relation":"师生" },
                { "source": 5 , "target": 8 , "relation":"师生" },
                { "source": 6 , "target": 8 , "relation":"师生" },
                { "source": 7 , "target": 8 , "relation":"师生" },
                { "source": 8 , "target": 9 , "relation":"师生" },
                { "source": 3 , "target": 9 , "relation":"师生" },
                { "source": 2 , "target": 10 , "relation":"母子" },
                { "source": 10 , "target": 11 , "relation":"雇佣" },
                { "source": 10 , "target": 12 , "relation":"雇佣" },
                { "source": 11 , "target": 12 , "relation":"同事" }             
            ],
        };  
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

export default SimpleForceChart;