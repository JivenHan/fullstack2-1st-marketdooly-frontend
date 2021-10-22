import { Component } from 'react';
import ItemField from './ItemField';
import CartResult from './CartResult';
import AlertModal from '../../components/Modal/AlertModal';
import { API_ENDPOINT } from '../../api';
import './Cart.scss';

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cartData: [],
      checkedItems: [],
      subTotal: 0,
      totalDiscount: 0,
      totalEarnPoints: 0,
      selectAll: true,
      userAddress: '',
      topCoords: 60,
      modalVisibility: false,
    };
    this.window = null;
  }

  autoScrolling = () => {
    const [coords] = this.cartContainer.getClientRects();
    if (coords.top <= -60 && coords.bottom >= 714) {
      this.setState({
        topCoords: Math.abs(coords.top),
      });
    } else if (coords.top > -60) {
      this.setState({
        topCoords: 60,
      });
    } else {
      this.setState({
        topCoords: coords.height - 714,
      });
    }
  };

  componentDidMount() {
    window.addEventListener('scroll', this.autoScrolling);
    fetch(`${API_ENDPOINT}/cart`, {
      credentials: 'include',
    })
      .then(async res => {
        if (!res.ok) {
          const message = await res.json();
          throw new Error(`Something Went Wrong: ${message}`);
        }
        return res.json();
      })
      .then(cartData => {
        const address =
          typeof cartData[0] === 'string' ? cartData.splice(0, 1) : null;
        this.setState({
          userAddress: address,
          cartData,
          subTotal: cartData.reduce(
            (acc, cur) => acc + cur.sales_price * cur.quantity,
            0
          ),
          checkedItems: cartData,
          totalDiscount: this.getTotalDiscount(cartData),
          totalEarnPoints: this.getTotalEarnPoints(cartData),
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          cartData: [],
        });
      });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.autoScrolling);
  }

  requestOrderItems = event => {
    event.preventDefault();
    const [cart_id] = [...this.state.checkedItems].map(ele => ele.id);
    fetch(`${API_ENDPOINT}/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cart_id,
      }),
    });
  };

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
        (acc, cur) => acc + cur.sales_price * cur.quantity,
        0
      ),
      totalDiscount: this.getTotalDiscount([...this.state.checkedItems]),
      totalEarnPoints: this.getTotalEarnPoints([...this.state.checkedItems]),
    });
  };

  getTotalDiscount = arr => {
    return [...arr]
      .map(ele => (ele.original_price - ele.sales_price) * ele.quantity)
      .reduce((acc, cur) => acc + cur, 0);
  };

  getTotalEarnPoints = arr => {
    return [...arr]
      .map(ele => ele.earn_points * ele.quantity)
      .reduce((acc, cur) => acc + cur, 0);
  };

  deleteSelectedItems = async () => {
    if (!this.state.checkedItems.length) {
      this.setState({ modalVisibility: true });
      return;
    }
    const deleteConsent = window.confirm('선택한 상품을 삭제하시겠습니까?');
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
    await this.requestDeleteItems(selected);
  };

  deleteOneItem = async itemId => {
    const deleteConsent = window.confirm('삭제하시겠습니까?');
    if (!deleteConsent) return;
    if ([...this.state.checkedItems].find(ele => ele.id === itemId)) {
      this.setState(
        {
          checkedItems: [...this.state.checkedItems].filter(
            ele => ele.id !== itemId
          ),
          cartData: [...this.state.cartData].filter(ele => ele.id !== itemId),
        },
        this.recalculateSubTotal
      );
    } else {
      this.setState(
        {
          cartData: [...this.state.cartData].filter(ele => ele.id !== itemId),
        },
        this.recalculateSubTotal
      );
    }
    await this.requestDeleteItem(itemId);
  };

  requestDeleteItem = cart_id => {
    fetch(`${API_ENDPOINT}/cart`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cart_id,
      }),
    }).catch(console.error);
  };

  requestDeleteItems = deleteList => {
    fetch(`${API_ENDPOINT}/cart/several`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        deleteList,
      }),
    }).catch(console.error);
  };

  manipulateQuantities = async (currentTarget, factor) => {
    this.setState(
      prevState => ({
        cartData: prevState.cartData.map(el =>
          el.id === currentTarget
            ? { ...el, quantity: el.quantity + factor }
            : el
        ),
        checkedItems: prevState.checkedItems.map(el =>
          el.id === currentTarget
            ? { ...el, quantity: el.quantity + factor }
            : el
        ),
      }),
      async () => {
        const [target] = [...this.state.cartData].filter(
          ele => ele.id === currentTarget
        );
        await this.requestChangingQuantity(currentTarget, target.quantity);
        this.recalculateSubTotal();
      }
    );
  };

  requestChangingQuantity = (id, finalQuantity) => {
    fetch(`${API_ENDPOINT}/cart`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cart_id: id,
        quantity: finalQuantity,
      }),
    }).catch(console.error);
  };

  increaseQuantity = event => {
    event.preventDefault();
    const currentTarget = event.target.dataset.id * 1;
    this.manipulateQuantities(currentTarget, 1);
  };

  decreaseQuantity = event => {
    event.preventDefault();
    const currentTarget = event.target.dataset.id * 1;
    const currentQuantity = event.target.parentNode.children[1].textContent * 1;
    if (currentQuantity <= 1) return;
    this.manipulateQuantities(currentTarget, -1);
  };

  closeModal = e => {
    e.preventDefault();
    this.setState({
      modalVisibility: false,
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
        <div className='cartContainer' ref={ref => (this.cartContainer = ref)}>
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
                {this.state.cartData.filter(
                  item => item.storage_temperature === 1
                ).length ? (
                  <ItemField
                    type={0}
                    data={this.state.cartData.filter(
                      item => item.storage_temperature === 1
                    )}
                    checkingItems={this.checkingItems}
                    checkedItems={this.state.checkedItems}
                    deleteOneItem={this.deleteOneItem}
                    decreaseQuantity={this.decreaseQuantity}
                    increaseQuantity={this.increaseQuantity}
                  />
                ) : null}
                {this.state.cartData.filter(
                  item => item.storage_temperature === 2
                ).length ? (
                  <ItemField
                    type={1}
                    data={this.state.cartData.filter(
                      item => item.storage_temperature === 2
                    )}
                    checkingItems={this.checkingItems}
                    checkedItems={this.state.checkedItems}
                    deleteOneItem={this.deleteOneItem}
                    decreaseQuantity={this.decreaseQuantity}
                    increaseQuantity={this.increaseQuantity}
                  />
                ) : null}
                {this.state.cartData.filter(
                  item => item.storage_temperature === 3
                ).length ? (
                  <ItemField
                    type={2}
                    data={this.state.cartData.filter(
                      item => item.storage_temperature === 3
                    )}
                    discounted={[...this.state.cartData].map(
                      ele => ele.original_price - ele.sales_price
                    )}
                    checkingItems={this.checkingItems}
                    checkedItems={this.state.checkedItems}
                    deleteOneItem={this.deleteOneItem}
                    decreaseQuantity={this.decreaseQuantity}
                    increaseQuantity={this.increaseQuantity}
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
              <CartResult
                ref={ref => (this.cartResult = ref)}
                subTotal={this.state.subTotal}
                data={this.state.checkedItems.length}
                totalDiscount={this.state.totalDiscount}
                totalEarnPoints={this.state.totalEarnPoints}
                requestOrderItems={this.requestOrderItems}
                userAddress={this.state.userAddress}
                top={this.state.topCoords}
              />
            </form>
          </div>
        </div>
        <AlertModal
          headerTxt='알림메세지'
          message='삭제할 상품을 선택해주세요.'
          confirmMsg='확인'
          visibility={this.state.modalVisibility}
          closeModal={this.closeModal}
        />
      </section>
    );
  }
}
