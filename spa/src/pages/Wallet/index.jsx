import React, {useEffect, useState} from 'react';
import { Table, Tag, message } from 'antd';
import APIClient from 'utils/apiClient';
import NumberFormatter from 'utils/numberFormatter';
import moment from 'moment';

const Wallet = () => {
  const [walletActions, setWalletActions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getWalletActions = async () => {
      try {
        let response = await APIClient.request(
          '/api/wallet/get-wallet-actions',
          {},
          'GET'
        );
  
        setWalletActions(response);
      } catch (err) {
        message.error("Data fetch failed!");
      } finally {
        setIsLoading(false);
      }

    }

    getWalletActions();
  }, []);

  const columns = [
    {
      title: 'Time',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (value) => {
      return moment(value).format("DD.MM.YYYY HH:mm");
      }
    },
    {
      title: 'Changes',
      dataIndex: 'change',
      key: 'change',
      render: (value) => {
        const change = NumberFormatter.formatMoney(value);

        if (change > 0) {
          return <Tag color="green">{change}</Tag>;
        } else if (parseFloat(change) === 0) {
          return <Tag color="blue">0</Tag>;
        } else {
          return <Tag color="red">{change}</Tag>;
        }
      }
    },
    {
      title: 'Remaining',
      dataIndex: 'remaining',
      key: 'remaining',
      render: (value) => {
        return NumberFormatter.formatMoney(value);
      }
    }
  ];

  return (
    <Table rowKey={"id"} dataSource={walletActions} columns={columns} loading={isLoading} />
  )
}

export default Wallet;