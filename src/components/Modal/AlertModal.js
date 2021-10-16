import { Component } from 'react';
import './AlertModal.scss';

export default class AlertModal extends Component {
  render() {
    const { visibility, closeModal, headerTxt, message, confirmMsg } =
      this.props;
    return (
      <div className={`AlertModal ${visibility ? '' : 'hidden'}`}>
        <div className='overlay' onClick={closeModal}></div>
        <div className='window'>
          <div className='main'>
            <div className='header'>
              <h2>{headerTxt}</h2>
              <button className='closeBtn' onClick={closeModal}></button>
            </div>
            <div className='message'>{message}</div>
          </div>
          <div className='footer'>
            <button className='confirmBtn' onClick={closeModal}>
              {confirmMsg}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
