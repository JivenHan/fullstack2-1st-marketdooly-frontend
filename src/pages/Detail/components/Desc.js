import React, { Component } from 'react';
import './Desc.scss';

export default class Desc extends Component {
  render() {
    return (
      <div className='descContainer' ref={this.props.descRef}>
        <img
          className='descImg'
          alt='상품 설명 이미지'
          src={this.props.descImg}
        />
      </div>
    );
  }
}
