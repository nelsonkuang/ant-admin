import React from 'react'
import { Row, Col, Card, Table, Icon } from 'antd'

class Tables extends React.Component {
  render() {
    const dataSource1 = [
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号'
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号'
      }
    ]

    const columns1 = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age'
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address'
      }
    ]

    const columns2 = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age'
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a>
              <Icon type="edit" />
            </a>
            <span className="ant-divider" />
            <a>
              <Icon type="delete" />
            </a>
            <span className="ant-divider" />
            <a className="ant-dropdown-link">
              <Icon type="ellipsis" />
            </a>
          </span>
        )
      }
    ]
    const dataSource2 = [
      {
        key: '1',
        name: '张三',
        age: 32,
        address: '广州江湾桥附近'
      },
      {
        key: '2',
        name: '李四',
        age: 42,
        address: '广州海印桥附近'
      },
      {
        key: '3',
        name: '王五',
        age: 32,
        address: '广州人民桥附近'
      }
    ]

    const columns3 = [
      {
        title: '姓名',
        dataIndex: 'name',
        filters: [
          {
            text: 'Joe',
            value: 'Joe'
          },
          {
            text: 'Jim',
            value: 'Jim'
          },
          {
            text: 'Submenu',
            value: 'Submenu',
            children: [
              {
                text: 'Green',
                value: 'Green'
              },
              {
                text: 'Black',
                value: 'Black'
              }
            ]
          }
        ],
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => a.name.length - b.name.length
      },
      {
        title: '年龄',
        dataIndex: 'age',
        sorter: (a, b) => a.age - b.age
      },
      {
        title: '住址',
        dataIndex: 'address',
        filters: [
          {
            text: 'London',
            value: 'London'
          },
          {
            text: 'New York',
            value: 'New York'
          }
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.address.indexOf(value) === 0,
        sorter: (a, b) => a.address.length - b.address.length
      }
    ]

    const dataSource3 = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park'
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park'
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park'
      },
      {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park'
      }
    ]

    return (
      <div className="gutter-example table-demo">
        <Row gutter={10}>
          <Col className="gutter-row" md={24}>
            <div className="gutter-box">
              <Card title="基础表格" bordered={false}>
                <Table
                  dataSource={dataSource1}
                  columns={columns1}
                  size="middle"
                />
              </Card>
            </div>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col className="gutter-row" md={24}>
            <div className="gutter-box">
              <Card title="基础表格 - 编辑" bordered={false}>
                <Table
                  dataSource={dataSource2}
                  columns={columns2}
                  size="middle"
                />
              </Card>
            </div>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col className="gutter-row" md={24}>
            <div className="gutter-box">
              <Card title="基础表格 - 筛选" bordered={false}>
                <Table
                  dataSource={dataSource3}
                  columns={columns3}
                  size="middle"
                />
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Tables
