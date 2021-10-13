import React, { Component } from 'react';
import './Label.scss';

export default class Label extends Component {
  render() {
    return (
      <div className='labelContainer' ref={this.props.labelRef}>
        <img
          className='labelImg'
          alt='상세 정보 이미지'
          src={this.props.labelImg}
        />
      </div>
    );
  }
}
