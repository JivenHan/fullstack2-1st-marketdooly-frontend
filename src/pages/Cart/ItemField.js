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
    };
  }

  render() {
    return (
      <div className='ItemField'>
        <ul className='storeType refrigerateds'>
          <li className='listHeader'>
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
            <button className='toggleListSpread' />
          </li>
          <Item />
          <Item />
          <Item />
        </ul>
        <ul className='storeType frozens'></ul>
        <ul className='storeType roomtemps'></ul>
      </div>
    );
  }
}
