import React, { Component } from 'react';
import './Desc.scss';

export default class Desc extends Component {
  render() {
    return (
      <div className='detailDescContainer' ref={this.props.descRef}>
        <img
          className='detailDescImg'
          alt='디테일 메인 이미지'
          src={this.props.detailDescImg}
        />
        <div className='detailDescMain'>
          <span className='detailDescTitle'>{this.props.detailDescTitle}</span>
          <span className='detailDescName'>{this.props.detailDescName}</span>
          <span className='detailDescArticle'>
            {this.props.detailDescArticle}
          </span>
        </div>
      </div>
    );
  }
}
