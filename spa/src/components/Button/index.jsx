import React from 'react';
import {Button as AntDButton} from 'antd';
import './styles.scss';

const Button = (props) => {
    return (
        <AntDButton {...props} className={"primary-button " + props.className}/>
    )
}

export default Button;