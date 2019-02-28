import React from 'react'
import { Row, Col, Card } from 'antd'
import D3SimpleDendrogramChart from '../components/charts/D3SimpleDendrogramChart'

class SimpleDendrogramChart extends React.Component {
  render() {
    const data = {
      name: '某工程设计集团网站主页',
      children: [
        {
          name: '客户市场',
          children: [
            {
              name: '能源化工',
              children: [
                { name: '生物燃料' },
                { name: '碳捕获' },
                { name: '化工与石油化工' },
                { name: '气体处理和气体处理' },
                { name: '气化，气体/液体/化学品和IGCC' },
                { name: '重油升级和油砂' },
                { name: '碳氢运输 - 管道' },
                { name: '液化天然气（LNG）' },
                { name: '海上油气生产' },
                { name: '陆上油气生产' },
                { name: '石油炼制' },
                { name: '多晶硅' },
                { name: '硫回收' },
                { name: '通用工具和设备' }
              ]
            },
            {
              name: '电力',
              children: [
                { name: '环保合规' },
                { name: '气体燃料/ IGCC' },
                { name: '核' },
                { name: '再生能源' },
                { name: '小型模块化反应堆核技术' },
                { name: '固体燃料' }
              ]
            },
            {
              name: '基建',
              children: [
                { name: '航空' },
                { name: '桥梁' },
                { name: '商业和制度' },
                { name: '重民事' },
                { name: '离岸风电场' },
                { name: '港口和船舶码头' },
                { name: '公私合作伙伴关系' },
                { name: '铁路和公交' },
                { name: '电信' },
                { name: '收费公路和公路' }
              ]
            },
            {
              name: '矿业',
              children: [
                { name: '矿业' },
                { name: '采矿工艺专长' },
                { name: '金属与肥料' },
                { name: '金属工艺专长 ' },
                { name: '工艺专长肥料' }
              ]
            },
            {
              name: '生命科学及高级制造',
              children: [
                { name: '生命科学' },
                { name: '先进制造业' },
                { name: '水' }
              ]
            },
            {
              name: '政府',
              children: [
                { name: '应急操作' },
                { name: '环境与核能' },
                { name: '服务和基地运营' }
              ]
            }
          ]
        },
        {
          name: '服务',
          children: [
            {
              name: '工程设计',
              children: [
                { name: '高级过程建模' },
                { name: '施工驱动执行' },
                { name: '设计能力' },
                { name: '设计评估' },
                { name: '工程能力' },
                { name: '前端工程与设计（FEED）能力' },
                { name: '项目管理' },
                { name: '价值工程' }
              ]
            },
            {
              name: '采购',
              children: [
                { name: '合同人员' },
                { name: '采购服务' },
                { name: '供应商和承包商注册' }
              ]
            },
            {
              name: '生产',
              children: [{ name: '制造' }, { name: '分包商制造' }]
            },
            {
              name: '施工',
              children: [
                { name: '调试' },
                { name: '施工执行' },
                { name: '施工服务' },
                { name: '设备，工具和车队服务' },
                { name: '健康，安全环保（HSE）服务' },
                { name: '模块化施工' }
              ]
            },
            {
              name: '多元化服务',
              children: [
                { name: '资产管理解决方案' },
                { name: '电气与仪表' },
                { name: '织物维护' },
                { name: '检验和诚信' },
                { name: '机械与管道' },
                { name: '电力服务与产品' },
                { name: '设备，工具和车队服务' }
              ]
            }
          ]
        },
        {
          name: '项目案例',
          children: [{ name: '项目地图' }, { name: '项目视频' }]
        },
        {
          name: '关于我们',
          children: [
            {
              name: '公司信息',
              children: [
                { name: '专长' },
                { name: '历史' },
                { name: '创新' },
                { name: '简介' },
                { name: '资质' },
                { name: '技术水平' }
              ]
            },
            {
              name: '领导班子',
              children: [
                { name: '首席执行官' },
                { name: '董事会' },
                { name: '公司高管' },
                { name: '经营主管' },
                { name: '公司主管' }
              ]
            },
            {
              name: '投资者关系'
            },
            {
              name: '新闻中心',
              children: [
                { name: '事实表' },
                { name: '词汇表' },
                { name: '新闻稿' },
                { name: '新闻室联系人' }
              ]
            },
            {
              name: '视频',
              children: [
                { name: '社区' },
                { name: '历史' },
                { name: '人' },
                { name: '项目' }
              ]
            },
            {
              name: '行业经验',
              children: [
                { name: '先进制造业' },
                { name: '化工与石油化工' },
                { name: '生命科学' },
                { name: '矿业' },
                { name: '模块化施工' },
                { name: '核' },
                { name: '海上' },
                { name: '石油炼制' },
                { name: '管道' }
              ]
            },
            {
              name: '地址'
            }
          ]
        },
        {
          name: '可持续发展',
          children: [
            {
              name: '社区',
              children: [
                { name: '社区发展' },
                { name: '教育' },
                { name: '员工志愿服务' },
                { name: '环境管理' },
                { name: '给予' },
                { name: '全球社区项目基金' },
                { name: '社区影响报告' },
                { name: '社会服务' }
              ]
            },
            {
              name: '道德与规范',
              children: [
                { name: '反腐倡议' },
                { name: '合规与道德热线' },
                { name: '合规与道德行动' },
                { name: '程序结构' },
                { name: '供应商期望' },
                { name: '代码' },
                { name: '工人福利' },
                { name: '伦理领导力' }
              ]
            },
            {
              name: '员工和工作场所',
              children: [
                { name: '支持多样性与包容性' },
                { name: '优化多样性与包容性' },
                { name: '纳入多元化与包容性' }
              ]
            },
            {
              name: '公司治理',
              children: [
                { name: '董事会成员' },
                { name: '董事会组成' },
                { name: '董事会独立性' },
                { name: '公司治理文件' },
                { name: '政治活动' }
              ]
            },
            {
              name: '安全与健康',
              children: [
                { name: '环境' },
                { name: '优秀的安全与健康' },
                { name: '安全与健康的表现' },
                { name: '安全与健康管理系统' }
              ]
            },
            { name: '报告' }
          ]
        },
        {
          name: '招聘',
          children: [
            { name: '专业人才' },
            { name: '施工监理' },
            { name: '普工' },
            { name: '军队工程计划' },
            { name: '环境安全与健康' },
            { name: '制度声明' },
            { name: '应届毕业生' }
          ]
        }
      ]
    }
    return (
      <div className="gutter-example simple-dendrogram-chart-demo">
        <Row gutter={10}>
          <Col className="gutter-row" md={24}>
            <div className="gutter-box">
              <Card title="D3 简单树状图" bordered={false}>
                <D3SimpleDendrogramChart data={data} />
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default SimpleDendrogramChart
