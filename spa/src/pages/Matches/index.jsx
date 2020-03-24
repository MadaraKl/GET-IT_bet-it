import React, { useState, useEffect } from 'react';
import { Tabs, Table } from 'antd';
import APIClient from 'utils/apiClient';
import moment from 'moment';
import Button from 'components/Button';
import BetModal from 'components/BetModal';
import NumberFormatter from 'utils/numberFormatter';
import './styles.scss';

const { TabPane } = Tabs;
const myBetsKey = "my-bets";
const matchesKey = "matches";

const Matches = ({ walletAmount, getWalletAmount }) => {
  const [matches, setMatches] = useState([]);
  const [isBetModalVisible, setIsBetModalVisible] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState({});


  const getMatches = async () => {
    let response = await APIClient.request(
      '/api/match/get-upcoming-matches',
      {},
      'GET'
    );

    setMatches(response);
  }

  useEffect(() => {

    getMatches();
  }, []);

  const tabChanged = (key) => {

  }

  const columns = [
    {
      title: 'Date',
      dataIndex: 'time',
      key: 'date',
      render: (value) => moment(value).format("DD.MM.YYYY")
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      render: (value) => moment(value).format("HH:mm")
    },
    {
      title: 'Teams',
      dataIndex: 'team_1',
      key: 'teams',
      render: (value, record) => record.team_1 + ' - ' + record.team_2
    },
    {
      title: '1',
      dataIndex: 'team_1_win_coef',
      key: 'team_1_win_coef'
    },
    {
      title: 'x',
      dataIndex: 'draw_coef',
      key: 'draw_coef'
    },
    {
      title: '2',
      dataIndex: 'team_2_win_coef',
      key: 'team_2_win_coef'
    },
    {
    
      render: (value, match) => {

      const walletEmpty = walletAmount < 0.01;

        if (match.amount) {
          return (
            <div className="bet-amount">
              {NumberFormatter.formatMoney(match.amount)} &euro;
              </div>
          )
        }
        return (
          <Button
            onClick={() => {
              if (!walletEmpty) {
              setSelectedMatch(match);
              setIsBetModalVisible(true);
              }
            }}
            disabled={walletAmount < 0.01}
          >
            Bet now
          </Button>
        )
      }
    }
  ];

  return (
    <>
      <Tabs defaultActiveKey="matches" onChange={(key) => tabChanged(key)}>
        <TabPane tab="Matches" key={matchesKey}>
          <Table className="matches-table" rowKey="id" dataSource={matches} columns={columns} pagination={false} />
        </TabPane>
        <TabPane tab="My bets" key={myBetsKey}>
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
      <BetModal
        visible={isBetModalVisible}
        setIsModalVisible={setIsBetModalVisible}
        match={selectedMatch}
        maxBetAmount={walletAmount}
        getWalletAmount={getWalletAmount}
        getMatches={getMatches}
      />
    </>
  )
}

export default Matches;
