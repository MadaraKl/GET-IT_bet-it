import React, { useState } from 'react';
import { Modal, message } from 'antd';
import Input from 'components/Input';
import APIClient from 'utils/apiClient';

const WithdrawMoneyModal = ({setWalletAmount, setIsWithdrawMoneyModalOpen, visible}) => {

    const [withdrawMoneyAmount, setWithdrawMoneyAmount] = useState("");
    const [inputError, setInputError] = useState(null);
    
    

      const withdrawAmount = async () => {
        try {
            let response = await APIClient.request(
                '/api/wallet/withdraw-amount',
                { amount: parseFloat(withdrawMoneyAmount) },
                'POST'
            );

            setWalletAmount(response);
            setIsWithdrawMoneyModalOpen(false);
            setWithdrawMoneyAmount("");
            message.success("Transaction succesful");

        } catch (err) {
            const errorResponse = err.response;

            if (errorResponse.status === 422) {
                const amountErrors = errorResponse.data.errors.amount;
                setInputError(amountErrors.join(", "));
            } else {
                message.error("Transaction failed!");
            }
        }
    }

    return (

        <Modal
            title="Withdraw money"
            visible={visible}
            onOk={() => withdrawAmount()}
            onCancel={() => {
                setIsWithdrawMoneyModalOpen(false);
                setWithdrawMoneyAmount("");
                setInputError(null);
            }}
            okText="Withdraw money"
        >
            <Input
                error={inputError}
                placeholder="0.00"
                value={withdrawMoneyAmount}
                onChange={(el) => {
                    const amount = el.target.value;
                    const decimalPattern = /^(\d{1,8}(\.|,)\d{0,2}|\d{1,8})$/;

                    if (decimalPattern.test(amount) || amount === "") {
                        setWithdrawMoneyAmount(el.target.value)
                    }
                }}
            />

        </Modal>
    )

}



export default WithdrawMoneyModal;