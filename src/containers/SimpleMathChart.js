import React from 'react';
import { Row, Col, Card, Input } from 'antd';
import D3LinearLine from '../components/math/D3LinearLine';
import D3QuadraticLine from '../components/math/D3QuadraticLine';

class SimpleMathChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            linearLine:{
              k: 1,
              b: 0,
            },
            quadraticLine: {
              a: 1,
              b: 0,
              c: 0,
            }
        };
        this.onLinearLineKChange = this.onLinearLineKChange.bind(this);
        this.onLinearLineBChange = this.onLinearLineBChange.bind(this);
        this.onQuadraticLineAChange = this.onQuadraticLineAChange.bind(this);
        this.onQuadraticLineBChange = this.onQuadraticLineBChange.bind(this);
        this.onQuadraticLineCChange = this.onQuadraticLineCChange.bind(this);
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

    onQuadraticLineAChange = e => {
      const { quadraticLine } = this.state;
      this.setState({
          quadraticLine: Object.assign({}, quadraticLine, {a: 1 * e.target.value})
      });
    }  

    onQuadraticLineBChange = e => {
      const { quadraticLine } = this.state;
      this.setState({
          quadraticLine: Object.assign({}, quadraticLine, {b: 1 * e.target.value})
      });
    }    

    onQuadraticLineCChange = e => {
      const { quadraticLine } = this.state;
      this.setState({
          quadraticLine: Object.assign({}, quadraticLine, {c: 1 * e.target.value})
      });
    }              

    render() {
        const {linearLine, quadraticLine} = this.state;
        return (
            <div className="gutter-example simple-math-chart-demo">
                <Row gutter={10}>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card title={
                              <span>一次函数(Linear) y = kx+b 设: k = 
                                <Input placeholder="请输入k的值" style={{width:'15%'}} type='number' onChange={this.onLinearLineKChange} /> b = 
                                <Input placeholder="请输入b的值"  style={{width:'15%'}} type='number' onChange={this.onLinearLineBChange} />
                              </span>} bordered={false}>
                                <D3LinearLine k={linearLine.k} b={linearLine.b} />
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card title={
                              <span>二次函数(quadratic) y=ax²+bx+c 设: a = 
                                <Input placeholder="请输入a的值" style={{width:'15%'}} type='number' onChange={this.onQuadraticLineAChange} /> b = 
                                <Input placeholder="请输入b的值"  style={{width:'15%'}} type='number' onChange={this.onQuadraticLineBChange} /> c = 
                                <Input placeholder="请输入c的值"  style={{width:'15%'}} type='number' onChange={this.onQuadraticLineCChange} />
                              </span>} bordered={false}>
                                <D3QuadraticLine a={quadraticLine.a} b={quadraticLine.b} c={quadraticLine.c} />
                            </Card>
                        </div>
                    </Col>
                </Row>             
            </div>
        )
    }
}

export default SimpleMathChart;