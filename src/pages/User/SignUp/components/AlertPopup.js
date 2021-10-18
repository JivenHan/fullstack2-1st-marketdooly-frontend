import { Component } from 'react';
import './AlertPopup.scss';

export default class AlertPopup extends Component {
  render() {
    return (
      <div className='AlertPopup'>
        <div className='messageWrapper'>
          <header>알림메시지</header>
          <section className='message'>{this.props.alertMessage}</section>
        </div>
        <div className='buttonWrapper'>
          <button
            type='button'
            className='btnConfirm'
            onClick={this.props.clickConfirmBtn}
          >
            확인
          </button>
        </div>
      </div>
    );
  }
}
