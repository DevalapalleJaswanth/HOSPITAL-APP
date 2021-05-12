/**
 * @author Praveen Reddy
 * @email pr250210@ncr.com
 * @create date 2021-05-11 19:40:41
 * @modify date 2021-05-11 19:40:41
 * @desc [description]
 */
import React from 'react';

function TextInput({ value = '', type = 'text', onChange, label, name }) {
    return (
        <div className="row no-border">
            <label className="input-label">{label}</label>
            <input
                className="input-box"
                type={type}
                value={value}
                name={name}
                onChange={onChange}
            />
        </div>
    );
}

export default TextInput;
