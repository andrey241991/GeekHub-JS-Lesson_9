import React, { Component } from 'react';
import './style.scss';

class Avatar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showErrorMessage: false,
            avatarImage: 'https://www.mendevolleylozere.fr/wp-content/uploads/2019/05/avatar.png'
        };
    }

    checkImage = (e) => {
        const { logo, setValid } = this.props;
        let fileName = e.target.value;
        let fileFormat = fileName.slice(fileName.length - 3, fileName.lenght);
        let isValid = fileFormat !== 'png' || fileFormat !== 'jpg';

        if(isValid){
            setValid(isValid, logo, fileName);
        }
    }

    render() {
        const { showErrorMessage, avatarImage } = this.state;
        return (
            <section className='avatar'>
                <img src={avatarImage} alt='avatar' />
                <input onChange={this.checkImage} type='file' />
                <span className={showErrorMessage ? 'error__field show' : 'error__field hide'}  >'File should be jpg or png format'</span>
            </section>
        );
    }
}

export default Avatar;