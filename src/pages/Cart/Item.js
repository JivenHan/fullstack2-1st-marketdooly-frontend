import { Component } from 'react';
import { Link } from 'react-router-dom';
import './Item.scss';

export default class Item extends Component {
  render() {
    return (
      <li className='Item'>
        <input className='checkControl' type='checkbox' />
        <span className='checkSign checked'></span>
        <picture className='itemThumb'>
          <Link to='/'>
            <img
              src='https://img-cf.kurly.com/shop/data/goods/1610086510346i0.jpg'
              alt=''
            />
          </Link>
        </picture>
        <div className='itemName'>
          <h3 className='cartItemName'>친환경 오이고추 100g</h3>
        </div>
        <div className='quantityStepper'>
          <button className='decrease limit'>-</button>
          <strong className='quantity'>1</strong>
          <button className='increase'>+</button>
        </div>
        <div className='itemPrice'>1,790원</div>
        <button className='deleteItem'>X</button>
      </li>
    );
  }
}
