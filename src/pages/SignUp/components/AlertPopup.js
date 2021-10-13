import { Component } from 'react';
import './AlertPopup.scss';

export default class AlertPopup extends Component {
  render() {
    return (
      <div className='AlertPopup'>
        <main>
          <header>알림메시지</header>
          <section className='message'>{this.props.alertMessage}</section>
        </main>
        <footer>
          <button
            type='button'
            className='btnConfirm'
            onClick={this.props.clickConfirmBtn}
          >
            확인
          </button>
        </footer>
      </div>
    );
  }
}
