import React from 'react';
import { Row, Col, Card, Input } from 'antd';
import D3LinearLine from '../components/math/D3LinearLine';

class SimpleMathChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            linearLine:{
              k: 1,
              b: 0
            }
        };
        this.onLinearLineKChange = this.onLinearLineKChange.bind(this);
        this.onLinearLineBChange = this.onLinearLineBChange.bind(this);
    }

    onLinearLineKChange = e => {
      const { linearLine } = this.state;
      this.setState({
          linearLine: Object.assign({}, linearLine, {k: 1 * e.target.value})
      });
    }

    onLinearLineBChange = e => {
      const { linearLine } = this.state;
      this.setState({
          linearLine: Object.assign({}, linearLine, {b: 1 * e.target.value})
      });
    }

    render() {
        const {linearLine} = this.state;
        return (
            <div className="gutter-example simple-math-chart-demo">
                <Row gutter={10}>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card title={
                              <span>一元一次函数 y = kx+b 自定义：k = 
                                <Input placeholder="请输入k的值" style={{width:'20%'}} type='number' onChange={this.onLinearLineKChange} /> b = 
                                <Input placeholder="请输入b的值"  style={{width:'20%'}} type='number' onChange={this.onLinearLineBChange} />
                              </span>} bordered={false}>
                                <D3LinearLine k={linearLine.k} b={linearLine.b} />
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card title="一元二次函数" bordered={false}>
                                
                            </Card>
                        </div>
                    </Col>
                </Row>             
            </div>
        )
    }
}

export default SimpleMathChart;