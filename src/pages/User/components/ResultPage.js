import { Component } from 'react';
import './ResultPage.scss';

export default class ResultPage extends Component {
  render() {
    const { mainText, btnText, onClick } = this.props;
    return (
      <div className='ResultPage'>
        <img src='/image/findaccount.png' alt='' />
        {mainText.split('<br>').map(el => {
          return <p>{el}</p>;
        })}
        <button type='button' onClick={onClick}>
          {btnText}
        </button>
      </div>
    );
  }
}
