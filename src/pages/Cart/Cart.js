import { Component } from 'react';
import ItemField from './ItemField';
import CartResult from './CartResult';
import './Cart.scss';

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cartData: [],
      refreg: [],
      frozen: [],
      roomTemp: [],
      subTotal: 0,
    };
  }

  componentDidMount() {
    try {
      fetch('/data/cart.json')
        .then(res => res.json())
        .then(cartData =>
          this.setState(
            {
              cartData,
              refreg: cartData.filter(item => item.storageTemp === 1),
              frozen: cartData.filter(item => item.storageTemp === 2),
              roomTemp: cartData.filter(item => item.storageTemp === 3),
              subTotal: cartData.reduce((acc, cur) => acc + cur.price, 0),
            },
            () => {
              console.log(this.state);
            }
          )
        );
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <section className='Cart'>
        <div className='titleContainer'>
          <div className='titleWrapper'>
            <h2 className='title'>장바구니</h2>
          </div>
        </div>
        <div className='cartContainer' ref={ref => (this.cartResult = ref)}>
          <div className='cartWrapper'>
            <form>
              <div className='cartList'>
                <div className='innerSelect'>
                  <div className='check'>
                    <input className='checkControl' type='checkbox' />
                    <span className='checkSign checked'></span>
                    <span className='checkControl checkAll'>
                      전체선택 (0/{this.state.cartData.length})
                    </span>
                    <button className='checkControl deleteChecked'>
                      선택삭제
                    </button>
                  </div>
                </div>
                {this.state.refreg.length && (
                  <ItemField type={0} data={this.state.refreg} />
                )}
                {this.state.frozen.length && (
                  <ItemField type={1} data={this.state.frozen} />
                )}
                {this.state.roomTemp.length && (
                  <ItemField type={2} data={this.state.roomTemp} />
                )}
                <div className='innerSelect'>
                  <label className='check'>
                    <input className='checkControl' type='checkbox' />
                    <span className='checkSign checked'></span>
                    <span className='checkControl checkAll'>
                      전체선택 (0/{this.state.cartData.length})
                    </span>
                    <button className='checkControl deleteChecked'>
                      선택삭제
                    </button>
                  </label>
                </div>
              </div>
              <CartResult subTotal={this.state.subTotal} />
            </form>
          </div>
        </div>
      </section>
    );
  }
}
