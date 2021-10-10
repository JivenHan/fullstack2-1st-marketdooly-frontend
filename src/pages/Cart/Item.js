import { Component } from 'react';
import { Link } from 'react-router-dom';
import './Item.scss';

export default class Item extends Component {
  render() {
    const { name, price, quantity, thumbUrl } = this.props;
    return (
      <li className='Item'>
        <input className='checkControl' type='checkbox' />
        <span className='checkSign checked'></span>
        <picture className='itemThumb'>
          <Link to='/'>
            <img src={thumbUrl} alt={name} />
          </Link>
        </picture>
        <div className='itemName'>
          <h3 className='cartItemName'>{name}</h3>
        </div>
        <div className='quantityStepper'>
          <button className='decrease limit'>-</button>
          <strong className='quantity'>{quantity}</strong>
          <button className='increase'>+</button>
        </div>
        <div className='itemPrice'>
          {new Intl.NumberFormat('en-IN', {
            maximumSignificantDigits: 3,
          }).format(price * quantity)}
          원
        </div>
        <button className='deleteItem'>X</button>
      </li>
    );
  }
}
