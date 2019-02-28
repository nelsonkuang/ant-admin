import React from 'react'
import { Row, Col, Card, Timeline, Icon } from 'antd'
import EchartsViews from '../components/charts/EchartsViews'
import EchartsProjects from '../components/charts/EchartsProjects'

class Dashboard extends React.Component {
  render() {
    const b1 = 'http://dummyimage.com/100/FF8604/fff'
    return (
      <div className="gutter-example button-demo">
        <Row gutter={10}>
          <Col className="gutter-row" md={4}>
            <div className="gutter-box">
              <Card bordered={false}>
                <div className="clearfix y-center">
                  <div className="pull-left mr-m">
                    <Icon type="heart" className="text-2x text-danger" />
                  </div>
                  <div className="clearfix">
                    <div className="text-muted">收藏</div>
                    <h2>301</h2>
                  </div>
                </div>
              </Card>
            </div>
            <div className="gutter-box">
              <Card bordered={false}>
                <div className="clearfix y-center">
                  <div className="pull-left mr-m">
                    <Icon type="cloud" className="text-2x" />
                  </div>
                  <div className="clearfix">
                    <div className="text-muted">云数据</div>
                    <h2>30122</h2>
                  </div>
                </div>
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" md={4}>
            <div className="gutter-box">
              <Card bordered={false}>
                <div className="clearfix y-center">
                  <div className="pull-left mr-m">
                    <Icon type="camera" className="text-2x text-info" />
                  </div>
                  <div className="clearfix">
                    <div className="text-muted">照片</div>
                    <h2>802</h2>
                  </div>
                </div>
              </Card>
            </div>
            <div className="gutter-box">
              <Card bordered={false}>
                <div className="clearfix y-center">
                  <div className="pull-left mr-m">
                    <Icon type="mail" className="text-2x text-success" />
                  </div>
                  <div className="clearfix">
                    <div className="text-muted">邮件</div>
                    <h2>102</h2>
                  </div>
                </div>
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" md={16}>
            <div className="gutter-box">
              <Card bordered={false} className={'no-padding'}>
                {<EchartsProjects />}
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" md={8}>
            <div className="gutter-box">
              <Card bordered={false}>
                <div className="pb-m">
                  <h3>任务</h3>
                  <small>10个已经完成，2个待完成，1个正在进行中</small>
                </div>
                <a className="card-tool">
                  <Icon type="sync" />
                </a>
                <Timeline>
                  <Timeline.Item color="green">新版本迭代会</Timeline.Item>
                  <Timeline.Item color="green">完成网站设计初版</Timeline.Item>
                  <Timeline.Item color="red">
                    <p>联调接口</p>
                    <p>功能验收</p>
                  </Timeline.Item>

                  <Timeline.Item color="#108ee9">
                    <p>登录功能设计</p>
                    <p>权限验证</p>
                    <p>页面排版</p>
                  </Timeline.Item>
                </Timeline>
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" md={8}>
            <div className="gutter-box">
              <Card bordered={false}>
                <div className="pb-m">
                  <h3>消息栏</h3>
                </div>
                <a className="card-tool">
                  <Icon type="sync" />
                </a>
                <ul className="list-group no-border">
                  <li className="list-group-item">
                    <a href="" className="pull-left w-40 mr-m">
                      <img
                        src={b1}
                        className="img-responsive img-circle"
                        alt="test"
                      />
                    </a>
                    <div className="clearfix">
                      <a href="" className="block">
                        东风
                      </a>
                      <span className="text-muted">快给我放炮吧！</span>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <a href="" className="pull-left w-40 mr-m">
                      <img
                        src={b1}
                        className="img-responsive img-circle"
                        alt="test"
                      />
                    </a>
                    <div className="clearfix">
                      <a href="" className="block">
                        南风
                      </a>
                      <span className="text-muted">３缺１，还不来？~~</span>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <a href="" className="pull-left w-40 mr-m">
                      <img
                        src={b1}
                        className="img-responsive img-circle"
                        alt="test"
                      />
                    </a>
                    <div className="clearfix">
                      <a href="" className="block">
                        西风
                      </a>
                      <span className="text-muted">喝西北风去了，老出冲！</span>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <a href="" className="pull-left w-40 mr-m">
                      <img
                        src={b1}
                        className="img-responsive img-circle"
                        alt="test"
                      />
                    </a>
                    <div className="clearfix">
                      <a href="" className="block">
                        北风
                      </a>
                      <span className="text-muted">
                        老大，快点吧，我等到花儿也谢了 ...
                      </span>
                    </div>
                  </li>
                </ul>
              </Card>
            </div>
          </Col>
          <Col className="gutter-row" md={8}>
            <div className="gutter-box">
              <Card bordered={false}>
                <div className="pb-m">
                  <h3>访问量统计 by Echarts</h3>
                  <small>最近7天用户访问量</small>
                </div>
                <a className="card-tool">
                  <Icon type="sync" />
                </a>
                {<EchartsViews />}
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Dashboard
