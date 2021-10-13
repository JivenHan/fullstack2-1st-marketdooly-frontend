import { Component } from 'react';
import { Link } from 'react-router-dom';
import './Item.scss';

export default class Item extends Component {
  render() {
    const { productId, name, price, quantity, thumbUrl } = this.props;
    return (
      <li className='Item'>
        <input className='checkControl' type='checkbox' />
        <span
          className={`checkSign ${this.props.checkedItems ? 'checked' : ''}`}
          onClick={this.props.checkingItems.bind(this, productId)}
        ></span>
        <picture className='itemThumb'>
          <Link to='/'>
            <img src={thumbUrl} alt={name} />
          </Link>
        </picture>
        <div className='itemName'>
          <h3 className='cartItemName'>{name}</h3>
        </div>
        <div className='quantityStepper'>
          <button
            className='decrease'
            data-id={productId}
            onClick={this.props.decreaseQuantity}
          >
            -
          </button>
          <strong className='quantity'>{quantity}</strong>
          <button
            className='increase'
            data-id={productId}
            onClick={this.props.increaseQuantity}
          >
            +
          </button>
        </div>
        <div className='itemPrice'>
          {new Intl.NumberFormat('ko-KR').format(price * quantity)}원
        </div>
        <div
          className='deleteItem'
          onClick={this.props.deleteOneItem.bind(this, productId)}
        >
          X
        </div>
      </li>
    );
  }
}
