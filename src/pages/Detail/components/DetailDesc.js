import React, { Component } from 'react';
import './DetailDesc.scss';

export default class DetailDesc extends Component {
  render() {
    return (
      <div className='detailDescContainer' ref={this.props.descRef}>
        <img
          className='detailDescImg'
          alt='디테일 메인 이미지'
          src='https://img-cf.kurly.com/shop/data/goodsview/20201228/gv20000146996_1.jpg'
        />
        <div className='detailDescMain'>
          <span className='detailDescTitle'>{this.props.detailDescTitle}</span>
          <span className='detailDescName'>{this.props.detailDescName}</span>
          <span className='detailDescArticle'>
            {this.props.detailDescArticle}
          </span>
        </div>
        <div className='doolysCheckPoint'>
          <span className='checkPointTitle'>Dooly's Check Point</span>
          <img
            className='checkPointImg'
            alt='ingredients 이미지'
            src='https://img-cf.kurly.com/shop/data/goodsview/20201228/gv20000146997_1.jpg'
          />
        </div>
        <div className='chechCertification'>
          <img
            className='certificationImg'
            alt='무농약 인증'
            src='https://img-cf.kurly.com/shop/data/goodsview/20201228/gv00000147006_1.jpg'
          />
        </div>
        <div className='doolysTip'>
          <span className='doolysTipTitle'>Dooly's Tip</span>
          <span className='tipTitle'>{this.props.tipOneTitle}</span>
          <span className='tipDesc'>{this.props.tipOneDesc}</span>
          <img className='tipImg' alt='tipOneImg' src={this.props.tipOneImg} />
          <span className='tipTitle'>{this.props.tipTwoTitle}</span>
          <span className='tipDesc'>{this.props.tipTwoDesc}</span>
          <img className='tipImg' alt='tipTwoImg' src={this.props.tipTwoImg} />
          <span className='tipTitle'>{this.props.tipThreeTitle}</span>
          <span className='tipDesc'>{this.props.tipThreeDesc}</span>
          <span className='tipTitle'>{this.props.tipFourTitle}</span>
          <span className='tipDesc'>{this.props.tipFourDesc}</span>
          <span className='tipTitle'>{this.props.tipFiveTitle}</span>
          <span className='tipDesc'>{this.props.tipFiveDesc}</span>
        </div>
      </div>
    );
  }
}
