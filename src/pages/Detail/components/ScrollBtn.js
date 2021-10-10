import React, { Component } from 'react';
import './ScrollBtn.scss';

export default class ScrollBtn extends Component {
  render() {
    const { btnId, btnName, isClicked, handleBtnClick } = this.props;

    return (
      <button
        id={btnId}
        className={'scrollBtn ' + (isClicked ? 'clicked' : '')}
        type='button'
        onClick={() => handleBtnClick(btnId)}
      >
        {btnName}
      </button>
    );
  }
}
