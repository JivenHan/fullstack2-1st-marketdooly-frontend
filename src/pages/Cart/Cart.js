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
      checkedItems: [],
      selectAll: true,
    };
  }

  componentDidMount() {
    try {
      fetch('/data/cart.json')
        .then(res => res.json())
        .then(cartData =>
          this.setState({
            cartData,
            refreg: cartData.filter(item => item.storageTemp === 1),
            frozen: cartData.filter(item => item.storageTemp === 2),
            roomTemp: cartData.filter(item => item.storageTemp === 3),
            subTotal: cartData.reduce((acc, cur) => acc + cur.price, 0),
            checkedItems: cartData,
          })
        );
    } catch (err) {
      throw err;
    }
  }

  checkingAllItems = () => {
    if (this.state.selectAll) {
      this.setState(
        {
          checkedItems: [],
          selectAll: false,
        },
        this.recalculateSubTotal
      );
    } else {
      this.setState(
        {
          checkedItems: this.state.cartData,
          selectAll: true,
        },
        this.recalculateSubTotal
      );
    }
  };

  checkingItems = id => {
    if (this.state.checkedItems.filter(ele => ele.id === id).length) {
      this.setState(
        {
          checkedItems: [...this.state.checkedItems].filter(
            ele => ele.id !== id
          ),
        },
        this.recalculateSubTotal
      );
    } else {
      this.setState(
        {
          checkedItems: [
            ...this.state.checkedItems,
            ...this.state.cartData.filter(ele => ele.id === id),
          ],
        },
        this.recalculateSubTotal
      );
    }
  };

  recalculateSubTotal = () => {
    if (!this.state.checkedItems.length) {
      this.setState({ selectAll: false });
    }
    this.setState({
      subTotal: [...this.state.checkedItems].reduce(
        (acc, cur) => acc + cur.price,
        0
      ),
    });
  };

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
                    <span
                      className={`checkSign ${
                        this.state.selectAll ? 'checked' : ''
                      }`}
                      onClick={this.checkingAllItems}
                    ></span>
                    <span className='checkControl checkAll'>
                      전체선택 ({this.state.checkedItems.length}/
                      {this.state.cartData.length})
                    </span>
                    <button className='checkControl deleteChecked'>
                      선택삭제
                    </button>
                  </div>
                </div>
                {this.state.refreg.length ? (
                  <ItemField
                    type={0}
                    data={this.state.refreg}
                    checkingItems={this.checkingItems}
                    checkedItems={this.state.checkedItems}
                  />
                ) : null}
                {this.state.frozen.length ? (
                  <ItemField
                    type={1}
                    data={this.state.frozen}
                    checkingItems={this.checkingItems}
                    checkedItems={this.state.checkedItems}
                  />
                ) : null}
                {this.state.roomTemp.length ? (
                  <ItemField
                    type={2}
                    data={this.state.roomTemp}
                    checkingItems={this.checkingItems}
                    checkedItems={this.state.checkedItems}
                  />
                ) : null}
                <div className='innerSelect'>
                  <div className='check'>
                    <input className='checkControl' type='checkbox' />
                    <span
                      className={`checkSign ${
                        this.state.selectAll ? 'checked' : ''
                      }`}
                      onClick={this.checkingAllItems}
                    ></span>
                    <span className='checkControl checkAll'>
                      전체선택 ({this.state.checkedItems.length}/
                      {this.state.cartData.length})
                    </span>
                    <button className='checkControl deleteChecked'>
                      선택삭제
                    </button>
                  </div>
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
