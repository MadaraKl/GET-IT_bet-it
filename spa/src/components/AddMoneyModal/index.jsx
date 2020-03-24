import React, { useState } from 'react';
import { Modal, message } from 'antd';
import Input from 'components/Input';
import APIClient from 'utils/apiClient';
import FormatValidator from 'utils/validator';

const AddMoneyModal = ({setWalletAmount, setIsAddMoneyModalOpen, visible}) => {

    const [addMoneyAmount, setAddMoneyAmount] = useState("");
    const [inputError, setInputError] = useState(null);

    const addAmount = async () => {
        try {
            let response = await APIClient.request(
                '/api/wallet/add-amount',
                { amount: parseFloat(addMoneyAmount) },
                'POST'
            );

            setWalletAmount(response);
            setIsAddMoneyModalOpen(false);
            setAddMoneyAmount("");
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
            title="Add money"
            visible={visible}
            onOk={() => addAmount()}
            onCancel={() => {
                setIsAddMoneyModalOpen(false);
                setAddMoneyAmount("");
                setInputError(null);
            }}
            okText="Add money"
        >
            <Input
                error={inputError}
                placeholder="0.00"
                value={addMoneyAmount}
                onChange={(el) => {
                    const amount = el.target.value;
                    

                    if (FormatValidator.isMoney(amount)) {
                        setAddMoneyAmount(amount);
                        setInputError(null);
                      } else {
                        setInputError("Field must contain valid money amount");
                      }
                }}
            />

        </Modal>
    )

}



export default AddMoneyModal;