import React from 'react'
import { Row, Col } from 'antd'

class NotFound extends React.Component {
  render() {
    return (
      <div className="gutter-example simple-bar-chart-demo">
        <Row gutter={10}>
          <Col className="gutter-row" md={24}>
            <div className="gutter-box">
              <div
                style={{
                  textAlign: 'center',
                  fontSize: '24px',
                  padding: '50px 0'
                }}
              >
                404 Not Found
                <br />
                你所访问的页面不存在！
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default NotFound
