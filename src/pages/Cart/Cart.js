import { Component } from 'react';
import ItemField from './ItemField';
import CartResult from './CartResult';
import './Cart.scss';

export default class Cart extends Component {
  render() {
    return (
      <section className='Cart'>
        <div className='titleContainer'>
          <div className='titleWrapper'>
            <h2 className='title'>장바구니</h2>
          </div>
        </div>
        <div className='cartContainer'>
          <div className='cartWrapper'>
            <form>
              <div className='cartList'>
                <div className='innerSelect'>
                  <div className='check'>
                    <input className='checkControl' type='checkbox' />
                    <span className='checkSign checked'></span>
                    <span className='checkControl checkAll'>
                      전체선택 (0/0)
                    </span>
                    <button className='checkControl deleteChecked'>
                      선택삭제
                    </button>
                  </div>
                </div>
                <ItemField type={0} />
                <ItemField type={1} />
                <ItemField type={2} />
                <div className='innerSelect'>
                  <label className='check'>
                    <input className='checkControl' type='checkbox' />
                    <span className='checkSign checked'></span>
                    <span className='checkControl checkAll'>
                      전체선택 (0/0)
                    </span>
                    <button className='checkControl deleteChecked'>
                      선택삭제
                    </button>
                  </label>
                </div>
              </div>
              <CartResult />
            </form>
          </div>
        </div>
      </section>
    );
  }
}
