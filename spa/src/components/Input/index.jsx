import React from 'react';
import { Input as AntDInput } from 'antd';
import './styles.scss';

const Input = (props) => {
    return (
        <div className={`input-group ${props.error ? "invalid" : ""}`}>
            <AntDInput {...props} className={"default-input-field " + props.className} />
            {
                props.error ?
                    <span className="error-message">{props.error}</span>
                    :
                    null
            }
        </div>
    )
}

export default Input;