import { Component } from 'react';
import ItemField from './ItemField';
import CartResult from './CartResult';
import './Cart.scss';

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cartData: [],
      checkedItems: [],
      subTotal: 0,
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
            subTotal: cartData.reduce(
              (acc, cur) => acc + cur.price * cur.quantity,
              0
            ),
            checkedItems: cartData,
          })
        );
    } catch (err) {
      throw err;
    }
  }

  checkSelectedItems = () => {
    if (this.state.cartData.length === this.state.checkedItems.length) {
      this.setState({
        selectAll: true,
      });
    } else {
      this.setState({
        selectAll: false,
      });
    }
  };

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
        () => {
          this.recalculateSubTotal();
          this.checkSelectedItems();
        }
      );
    } else {
      this.setState(
        {
          checkedItems: [
            ...this.state.checkedItems,
            ...this.state.cartData.filter(ele => ele.id === id),
          ],
        },
        () => {
          this.recalculateSubTotal();
          this.checkSelectedItems();
        }
      );
    }
  };

  recalculateSubTotal = () => {
    if (!this.state.checkedItems.length) {
      this.setState({ selectAll: false });
    }
    this.setState({
      subTotal: [...this.state.checkedItems].reduce(
        (acc, cur) => acc + cur.price * cur.quantity,
        0
      ),
    });
  };

  deleteSelectedItems = () => {
    const deleteConsent = window.confirm('삭제하시겠습니까?');
    if (!deleteConsent) return;
    const selected = [...this.state.checkedItems].map(ele => ele.id);
    const origin = [...this.state.cartData];
    this.setState(
      {
        cartData: origin.filter(ele => !selected.includes(ele.id)),
        checkedItems: [],
      },
      this.recalculateSubTotal
    );
  };

  deleteOneItem = itemId => {
    const deleteConsent = window.confirm('삭제하시겠습니까?');
    if (!deleteConsent) return;
    const [item] = [...this.state.checkedItems].filter(
      ele => ele.id === itemId
    );
    this.setState(
      {
        checkedItems: [...this.state.checkedItems].filter(
          ele => ele.id !== item.id
        ),
        cartData: [...this.state.cartData].filter(ele => ele.id !== item.id),
      },
      this.recalculateSubTotal
    );
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
                    <div
                      className='checkControl deleteChecked'
                      onClick={this.deleteSelectedItems}
                    >
                      선택삭제
                    </div>
                  </div>
                </div>
                {this.state.cartData.filter(item => item.storageTemp === 1)
                  .length ? (
                  <ItemField
                    type={0}
                    data={this.state.cartData.filter(
                      item => item.storageTemp === 1
                    )}
                    checkingItems={this.checkingItems}
                    checkedItems={this.state.checkedItems}
                    deleteOneItem={this.deleteOneItem}
                  />
                ) : null}
                {this.state.cartData.filter(item => item.storageTemp === 2)
                  .length ? (
                  <ItemField
                    type={1}
                    data={this.state.cartData.filter(
                      item => item.storageTemp === 2
                    )}
                    checkingItems={this.checkingItems}
                    checkedItems={this.state.checkedItems}
                    deleteOneItem={this.deleteOneItem}
                  />
                ) : null}
                {this.state.cartData.filter(item => item.storageTemp === 3)
                  .length ? (
                  <ItemField
                    type={2}
                    data={this.state.cartData.filter(
                      item => item.storageTemp === 3
                    )}
                    checkingItems={this.checkingItems}
                    checkedItems={this.state.checkedItems}
                    deleteOneItem={this.deleteOneItem}
                  />
                ) : null}
                {!this.state.cartData.length ? (
                  <div className='emptyField'>
                    <p>장바구니에 담긴 상품이 없습니다</p>
                  </div>
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
                    <div
                      className='checkControl deleteChecked'
                      onClick={this.deleteSelectedItems}
                    >
                      선택삭제
                    </div>
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
