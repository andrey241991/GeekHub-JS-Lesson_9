import React from 'react';
import './style.scss';

const ValidationInput = ({ inpuType, errorMessage, logo, validationExp, setValid, password, submitForm }) => {

    const errorRef = React.createRef();
    const re = new RegExp(validationExp);

    const checkField = e => {
        let inputText = e.target.value;
        let isValid = re.test(e.target.value);
        isValid ? errorRef.current.style.display = "none" : errorRef.current.style.display = "block";
        setValid(isValid, logo, inputText);
        if(password && inputText !== password){
            errorRef.current.style.display = "block";
        }
    }

    return (
        <section className='validation-input' >
            <div>
                <input type={inpuType} placeholder={logo} onChange={checkField} onFocus={checkField} />
                <span>{logo}</span>
            </div>
            <h3 className='error__field hide' ref={errorRef}>{errorMessage}</h3>
        </section>

    );
}

export default ValidationInput;