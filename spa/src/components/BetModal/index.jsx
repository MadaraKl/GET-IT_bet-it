import React, {useState} from 'react';
import {Modal, Slider, Input, Radio, Button as AntDButton, message} from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import Button from 'components/Button';
import moment from 'moment';
import FormatValidator from 'utils/validator';
import APIClient from 'utils/apiClient';
import './styles.scss';

const DEFAULT_BET_AMOUNT = 1000;

const BetModal = ({visible, setIsModalVisible, getWalletAmount, getMatches, match = {}, maxBetAmount = DEFAULT_BET_AMOUNT}) => {
  const [betAmount, setBetAmount] = useState(DEFAULT_BET_AMOUNT);
  const [result, setResult] = useState("team_1_win");

  const {
    time,
    team_1,
    team_2,
    team_1_win_coef,
    team_2_win_coef,
    draw_coef
  } = match;

  const makeBet = async () => {
    try {
      await APIClient.request(
        '/api/bet/make-bet',
        {
          matchId: match.id,
          result: result,
          amount: parseFloat(betAmount)
        },
        'POST'
      );



      setIsModalVisible(false);
      getWalletAmount();
      getMatches();
      message.success("Bet made successful!");
    } catch (err) {
      const errorResponse = err.response;

      if (errorResponse.status === 422) {
        message.error(errorResponse.data.message);
      } else {
        message.error("Transaction failed!");
      }
    }
  }

  return (
    <Modal
      className="bet-modal"
      visible={visible}
      onCancel={() => setIsModalVisible(false)}
      closable={false}
      footer={null}
      centered={true}
      getWalletAmount={getWalletAmount}
    >
      <div className="bet-modal-header">
        <p className="match-date">{moment(time).format("DD.MM.YYYY")}</p>
        <p className="match-teams">{`${team_1} - ${team_2}`}</p>
      </div>
      <div className="bet-modal-content">
        <p className="label">Match odds</p>
        <div>
          <Radio.Group defaultValue="team_1_win" onChange={(e) => setResult(e.target.value)}>
            <Radio.Button value="team_1_win">
              <CheckOutlined /> Win
            </Radio.Button>
            <Radio.Button value="draw">
              <CheckOutlined /> Draw
            </Radio.Button>
            <Radio.Button value="team_2_win">
              <CheckOutlined /> Win
            </Radio.Button>
          </Radio.Group>
          <div className="coefficients">
            <span>{team_1_win_coef}</span>
            <span>{draw_coef}</span>
            <span>{team_2_win_coef}</span>
          </div>
        </div>
        <p className="label">Your bet</p>
        <Input value={betAmount} onChange={(e) => {
          const amount = e.target.value;

          if (FormatValidator.isMoney(amount)) {
            setBetAmount(amount)
          }
        }} />
        <Slider
          defaultValue={DEFAULT_BET_AMOUNT} 
          max={maxBetAmount}
          min={0.01}
          step={0.01}
          tooltipVisible={false}
          onChange={(value) => setBetAmount(value)}
        />
      </div>
      <div className="bet-modal-footer">
        <Button onClick={() => makeBet()}>Make a {betAmount} € bet</Button>
        <AntDButton onClick={() => setIsModalVisible(false)}>Cancel</AntDButton>
      </div>
    </Modal>
  )
}

export default BetModal;
