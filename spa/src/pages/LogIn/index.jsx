import React, {useState} from 'react';
import { Form, Row, Col, message } from 'antd';
import {withRouter, } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Button from 'components/Button';
import Input from 'components/Input';
import APIClient from 'utils/apiClient';
import jwt from 'utils/jwt';
import './styles.scss';




const LogIn = ({history}) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      let response = await APIClient.request(
        '/api/auth/login', 
        {username: values.username, password: values.password},
         'POST'
         );
  
       jwt.saveToken(response.token, response.expiresIn);
       setLoading(false);
       history.replace('/');
       
  } catch (err) {
    message.error('Username or password incorect!');
    setLoading(false);
    
  }
  };

  return (
    <Row align="middle" justify="center" className="h-100">
      <Col xs={22} sm={16} md={12} lg={8}>
        <div className="login-card">
          <img src="betit-logo-dark.svg" alt="BetIt Logo" className="betit-logo" height={25} />
          <h3>Please Log-In to continue</h3>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button loading={loading} block type="primary" htmlType="submit" className="login-form-button">
                Log in
        </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default withRouter(LogIn);