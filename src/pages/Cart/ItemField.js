import { Component } from 'react';
import Item from './Item';
import './ItemField.scss';

export default class ItemField extends Component {
  constructor() {
    super();
    this.state = {
      fieldType: [
        {
          name: '냉장 상품',
          iconUrl: 'https://res.kurly.com/pc/service/cart/2007/ico_cold.svg',
        },
        {
          name: '냉동 상품',
          iconUrl: 'https://res.kurly.com/pc/service/cart/2007/ico_frozen.svg',
        },
        {
          name: '상온 상품',
          iconUrl:
            'https://res.kurly.com/pc/service/cart/2009/ico_room_v2.svg?v=1',
        },
      ],
      isFieldOpened: true,
    };
  }

  toggleListVisibility = event => {
    event.preventDefault();
    this.setState({
      isFieldOpened: !this.state.isFieldOpened,
    });
  };

  render() {
    return (
      <div className='ItemField'>
        <div className='listHeader'>
          <h3 className='storeTypeTitle'>
            <span
              className='fieldIcon'
              style={{
                backgroundImage: `url(${
                  this.state.fieldType[this.props.type].iconUrl
                })`,
              }}
            ></span>
            {this.state.fieldType[this.props.type].name}
          </h3>
          <button
            className='toggleListSpread'
            onClick={this.toggleListVisibility}
          />
        </div>
        <ul className={`storeType ${this.state.isFieldOpened ? '' : 'hidden'}`}>
          {this.props.data.map(data => {
            const { id, name, price, quantity, thumbUrl } = data;
            const [boolean] = [...this.props.checkedItems].filter(
              ele => ele.id === id
            );
            return (
              <Item
                key={id}
                productId={id}
                name={name}
                price={price}
                quantity={quantity}
                thumbUrl={thumbUrl}
                checkingItems={this.props.checkingItems}
                checkedItems={boolean}
                deleteOneItem={this.props.deleteOneItem}
                decreaseQuantity={this.props.decreaseQuantity}
                increaseQuantity={this.props.increaseQuantity}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}
