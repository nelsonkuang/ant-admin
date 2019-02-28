import React from 'react'
import { Row, Col, Card } from 'antd'
import D3SimpleTagCloudChart from '../components/charts/D3SimpleTagCloudChart'

class SimpleTagCloudChart extends React.Component {
  render() {
    const data = [
      { name: '腾讯', value: 10, href: 'http://www.qq.com/' },
      { name: '阿里巴巴', value: 10, href: 'https://www.taobao.com/' },
      { name: '百度', value: 9, href: 'https://www.baidu.com/' },
      { name: '京东', value: 8, href: 'https://www.jd.com/' },
      { name: '今日头条', value: 7, href: 'https://www.toutiao.com/' },
      { name: '网易', value: 8, href: 'http://www.163.com/' },
      { name: '新浪', value: 6, href: 'http://www.sina.com.cn/' },
      { name: '搜狐', value: 6, href: 'http://www.sohu.com/' },
      { name: '美团点评', value: 5, href: 'http://www.meituan.com/' },
      { name: '携程', value: 5, href: 'http://www.ctrip.com/' },
      { name: '360', value: 7, href: 'https://www.360.cn/' },
      { name: '小米', value: 6, href: 'https://www.mi.com/' },
      { name: '饿了么', value: 6, href: 'https://www.ele.me/' },
      { name: '迅雷', value: 6, href: 'http://xunlei.com/' },
      { name: '滴滴', value: 7, href: 'http://www.xiaojukeji.com' },
      { name: '摩拜', value: 5, href: 'https://mobike.com/cn/' },
      { name: 'ofo', value: 6, href: 'http://www.ofo.so/' }
    ]
    return (
      <div className="gutter-example simple-tag-cloud-chart-demo">
        <Row gutter={10}>
          <Col className="gutter-row" md={24}>
            <div className="gutter-box">
              <Card title="D3 简单标签云图" bordered={false}>
                <D3SimpleTagCloudChart data={data} />
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default SimpleTagCloudChart
