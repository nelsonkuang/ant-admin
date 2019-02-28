import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Card, Table } from 'antd'
import { getQueryString } from '../utils/tools'

const PERPAGE = 15
const USERNAME = 'nelsonkuang'

class AsycTables extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFetching: true,
      dataSource: null,
      columns: null,
      paginationProps: null
    }
  }

  componentDidMount() {
    this.fetchData(this.props.match.url)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.url !== this.props.match.url) {
      this.setState({
        isFetching: true
      })
      this.fetchData(nextProps.match.url)
    }
  }

  fetchData(matchUrl) {
    // 异步获取数据
    ;(async () => {
      try {
        const page = parseInt(matchUrl.split('/')[2], 10)
        const res = await fetch(
          `https://api.github.com/users/${USERNAME}/starred?per_page=${PERPAGE}&page=${page}`
        )
        const link = await res.headers.get('link')
        const json = await res.json()
        const dataSource = await json.map(item => {
          return {
            key: item.id,
            repo: {
              displayName: item.name,
              link: item.html_url
            },
            owner: {
              displayName: item.owner.login,
              link: item.owner.html_url
            },
            createdAt: new Date(item.created_at).toLocaleString(),
            stargazersCount: item.stargazers_count,
            forksCount: item.forks_count
          }
        })
        const columns = [
          {
            title: '项目名称',
            dataIndex: 'repo',
            key: 'repo',
            render: repo => (
              <a
                href={repo.link}
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                {repo.displayName}
              </a>
            )
          },
          {
            title: '创建者',
            dataIndex: 'owner',
            key: 'owner',
            render: owner => (
              <a
                href={owner.link}
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                {owner.displayName}
              </a>
            )
          },
          {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt'
          },
          {
            title: '关注人数',
            dataIndex: 'stargazersCount',
            key: 'stargazersCount'
          },
          {
            title: 'Fork人数',
            dataIndex: 'forksCount',
            key: 'forksCount'
          }
        ]
        this.setState({
          dataSource,
          paginationProps: this.getPaginationProps(await link, page),
          columns,
          isFetching: false
        })
      } catch (err) {
        console.log(err)
      }
    })()
  }

  getPaginationProps = (link, currentPage) => {
    // 按github规则通过http响应的头部head.link信息获取分页参数
    let total = 0
    let str = link.split(',').find(s => s.indexOf('rel="last"') > -1)
    if (str) {
      total = getQueryString(str.split(';')[0].slice(1, -1), 'page')
    } else {
      str = link.split(',').find(s => s.indexOf('rel="prev"') > -1)
      if (str) {
        total = getQueryString(str.split(';')[0].slice(1, -1), 'page') * 1 + 1
      }
    }

    return {
      total: total * PERPAGE,
      current: currentPage * 1,
      defaultPageSize: PERPAGE,
      pageSize: PERPAGE, // github默认每页30条
      itemRender: (current, type, originalElement) => {
        // 修改上一页、下一页中文
        if (type === 'prev') {
          return <a>上一页</a>
        } else if (type === 'next') {
          return <a>下一页</a>
        }
        return originalElement
      },
      onChange: (page, pageSize) => {
        // 分页跳转
        const { match, history } = this.props
        history.push(match.path.replace(':pageid', page))
      }
    }
  }
  render() {
    const { isFetching, dataSource, columns, paginationProps } = this.state
    return (
      <div className="gutter-example asyc-table-demo">
        <Row gutter={10}>
          <Col className="gutter-row" md={24}>
            <div className="gutter-box">
              <Card
                title={
                  <span>
                    异步基础表格 - Github用户(ID:{' '}
                    <a
                      href="https://github.com/nelsonkuang"
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                    >
                      Nelsonkuang
                    </a>
                    ) 关注的项目列表
                  </span>
                }
                bordered={false}
              >
                <Table
                  loading={isFetching}
                  dataSource={dataSource}
                  columns={columns}
                  pagination={paginationProps}
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

AsycTables.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
}

export default AsycTables
