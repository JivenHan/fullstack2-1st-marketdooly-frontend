import React, { Component } from 'react';
import './Cart.scss';

export default class Cart extends Component {
  render() {
    return (
      <div className='cartContainer'>
        <span className='cartTitle'>장바구니</span>
        <div className='cartListContainer'>
          <div className='cartSelectBtns'>
            <button className='selectAllBtn' />
            <span className='selectAllTitle'>
              전체선택{'('}
              <span className='countSelected'>1{'/'}</span>
              <span className='countAllSelected'>3{')'}</span>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
