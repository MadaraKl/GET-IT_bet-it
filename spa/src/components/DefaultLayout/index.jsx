import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Router from 'components/Router';
import { Layout, Row, Col, Spin, Menu, Dropdown } from 'antd';
import { WalletOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import AddMoneyModal from 'components/AddMoneyModal';
import WithdrawMoneyModal from 'components/WithdrawMoneyModal';
import APIClient from 'utils/apiClient';
import numberFormatter from 'utils/numberFormatter';
import './styles.scss';

const { Header, Content, Footer } = Layout;
const xsWidth = 22;
const mdWidth = 18;
const lgWidth = 16;

const DefaultLayout = () => {
  const [walletAmount, setWalletAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddMoneyModalOpen, setIsAddMoneyModalOpen] = useState(false);
  const [isWithdrawMoneyModalOpen, setIsWithdrawMoneyModalOpen] = useState(false);
  

  useEffect(() => {
    getWalletAmount();
  }, []);

  const getWalletAmount = async () => {
    let response = await APIClient.request(
      '/api/wallet/get-amount',
      {},
      'GET'
    );

    setWalletAmount(response);
    setIsLoading(false);
  }



  const menu = (
    <Menu>
      <Menu.Item key="0">
        <div onClick={() => {
          setIsAddMoneyModalOpen(true)
        }}>Add money</div>
      </Menu.Item>
      <Menu.Item key="1">
      <div onClick={() => { 
        setIsWithdrawMoneyModalOpen(true)
      }}> Withdraw money</div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="min-h-100">
      <Header className="app-header">
        <Row justify="center" >
          <Col xs={xsWidth} md={mdWidth} lg={lgWidth}>
            <NavLink to="/">
            <img src="betit-logo-light.svg" alt="betit logo" height={40} className="brand-logo" />
            </NavLink>
            <div className="app-header-content">
              <div className="wallet-amount">
                <WalletOutlined />
                <p>My wallet</p>
                <Spin spinning={isLoading} className="amount-spinner">
                  <Dropdown overlay={menu} trigger={['click']}>
                    <p className="amount-with-currency">{numberFormatter.formatMoney(walletAmount)}&euro;</p>
                  </Dropdown>
                </Spin>
              </div>
              <NavLink to="/wallet">
              <UserOutlined />
              </NavLink>
              <LogoutOutlined />
            </div>
          </Col>
        </Row>
      </Header>
      <Content className="app-content">
        <Row justify="center" className="h-100" >
          <Col xs={xsWidth} md={mdWidth} lg={lgWidth}>
            <div className="app-container">
              <Router walletAmount={walletAmount} getWalletAmount={getWalletAmount}/>
            </div>
          </Col>
        </Row>
      </Content>
      <Footer className="app-footer">
        <Row justify="center">
          <Col xs={xsWidth} md={mdWidth} lg={lgWidth}>
            @Copyright 2020, GetIT school
          </Col>
        </Row>
      </Footer>
     
      <AddMoneyModal
        visible={isAddMoneyModalOpen}
        setIsAddMoneyModalOpen={setIsAddMoneyModalOpen}
        setWalletAmount={setWalletAmount}
      />

      <WithdrawMoneyModal
        visible={isWithdrawMoneyModalOpen}
        setIsWithdrawMoneyModalOpen={setIsWithdrawMoneyModalOpen}
        setWalletAmount={setWalletAmount}
      />

    </Layout>
  )
}

export default DefaultLayout;