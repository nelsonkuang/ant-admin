import React from 'react'
import { Row, Col, Card } from 'antd'
import D3SimplePackChart from '../components/charts/D3SimplePackChart'

class SimplePackChart extends React.Component {
  render() {
    const data = {
      name: '中国一线城市',
      children: [
        {
          name: '北京',
          children: [
            {
              name: '东城区',
              value: 42
            },
            {
              name: '西城区',
              value: 51
            },
            {
              name: '朝阳区',
              value: 471
            },
            {
              name: '丰台区',
              value: 304
            },
            {
              name: '石景山区',
              value: 86
            },
            {
              name: '海淀区',
              value: 431
            },
            {
              name: '顺义区',
              value: 1021
            },
            {
              name: '通州区',
              value: 906
            },
            {
              name: '大兴区',
              value: 1036
            },
            {
              name: '房山区',
              value: 2019
            },
            {
              name: '门头沟区',
              value: 1451
            },
            {
              name: '昌平区',
              value: 1344
            },
            {
              name: '平谷区',
              value: 950
            },
            {
              name: '密云区',
              value: 2229
            },
            {
              name: '怀柔区',
              value: 2123
            },
            {
              name: '延庆区',
              value: 1994
            }
          ]
        },
        {
          name: '上海',
          children: [
            {
              name: '黄浦区',
              value: 20
            },
            {
              name: '徐汇区',
              value: 55
            },
            {
              name: '长宁区',
              value: 38
            },
            {
              name: '静安区',
              value: 37
            },
            {
              name: '普陀区',
              value: 56
            },
            {
              name: '虹口区',
              value: 23
            },
            {
              name: '杨浦区',
              value: 61
            },
            {
              name: '浦东新区',
              value: 1210
            },
            {
              name: '闵行区',
              value: 372
            },
            {
              name: '宝山区',
              value: 294
            },
            {
              name: '嘉定区',
              value: 464
            },
            {
              name: '金山区',
              value: 611
            },
            {
              name: '松江区',
              value: 605
            },
            {
              name: '青浦区',
              value: 676
            },
            {
              name: '奉贤区',
              value: 687
            },
            {
              name: '崇明区',
              value: 1411
            }
          ]
        },
        {
          name: '广州',
          children: [
            {
              name: '越秀区',
              value: 34
            },
            {
              name: '荔湾区',
              value: 59
            },
            {
              name: '海珠区',
              value: 90
            },
            {
              name: '天河区',
              value: 96
            },
            {
              name: '白云区',
              value: 796
            },
            {
              name: '黄埔区',
              value: 484
            },
            {
              name: '番禺区',
              value: 786
            },
            {
              name: '花都区',
              value: 970
            },
            {
              name: '南沙区',
              value: 527
            },
            {
              name: '增城区',
              value: 1616
            },
            {
              name: '从化区',
              value: 1974
            }
          ]
        },
        {
          name: '深圳',
          children: [
            {
              name: '福田区',
              value: 79
            },
            {
              name: '罗湖区',
              value: 79
            },
            {
              name: '南山区',
              value: 185
            },
            {
              name: '盐田区',
              value: 75
            },
            {
              name: '宝安区',
              value: 398
            },
            {
              name: '龙岗区',
              value: 388
            },
            {
              name: '龙华区',
              value: 176
            },
            {
              name: '坪山区',
              value: 167
            },
            {
              name: '光明新区',
              value: 155
            },
            {
              name: '大鹏新区',
              value: 295
            }
          ]
        }
      ]
    }
    return (
      <div className="gutter-example simple-pack-chart-demo">
        <Row gutter={10}>
          <Col className="gutter-row" md={24}>
            <div className="gutter-box">
              <Card title="中国一线城市面积概况" bordered={false}>
                <D3SimplePackChart data={data} />
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default SimplePackChart
