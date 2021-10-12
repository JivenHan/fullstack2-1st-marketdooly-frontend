import { Component } from 'react';
import './CartResult.scss';

export default class CartResult extends Component {
  constructor() {
    super();
    this.state = {
      userAddress: [],
    };
  }

  componentDidMount() {
    this.requestUserAddress();
  }

  requestUserAddress = () => {
    try {
      fetch('/data/userAddress.json')
        .then(res => res.json())
        .then(data => {
          const userData = data;
          this.setState({
            userAddress: userData,
          });
        });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div className='CartResult'>
        <div className='destinationContainer'>
          <div className='destinationTitle'>
            <h3>배송지</h3>
          </div>
          {this.state.userAddress.length ? (
            <div className='address'>
              <p className='userAddress'>
                {this.state.userAddress[0]?.address}
              </p>
              <span className='deliveryType'>
                {this.state.userAddress[0]?.deliveryType}
              </span>
              <button
                onClick={e => e.preventDefault()}
                className='searchAddress'
              >
                배송지 변경
              </button>
            </div>
          ) : (
            <div className='address noAddress'>
              <p>
                <i>배송지를 입력</i>하고
                <br />
                배송유형을 확인해 보세요!
              </p>
              <button
                onClick={e => e.preventDefault()}
                className='searchAddress'
              >
                배송지 변경
              </button>
            </div>
          )}
        </div>
        <div className='amountContainer'>
          <dl className='priceAmount'>
            <dt>상품금액</dt>
            <dd>
              <span className='priceInt'>
                {new Intl.NumberFormat('ko-KR').format(this.props.subTotal)}
              </span>
              원
            </dd>
          </dl>
          <dl className='discountAmount'>
            <dt>상품할인금액</dt>
            <dd>
              <span className='priceInt'>0</span>원
            </dd>
          </dl>
          <dl className='deliveryFee'>
            <dt>배송비</dt>
            <dd>
              <span className='priceInt'>0</span>원
            </dd>
          </dl>
          <dl className='finalAmount'>
            <dt>결제예정금액</dt>
            <dd>
              <span className='priceInt'>
                {new Intl.NumberFormat('ko-KR').format(this.props.subTotal)}
              </span>
              원
            </dd>
          </dl>
          <div className='rewardNotice'>
            <span className='rewardBadge'>적립</span>로그인 후 회원등급에 따라
            적립
          </div>
        </div>
        <div className='submitContainer'>
          <button
            className={`submit ${this.props.data ? 'active' : ''}`}
            onClick={this.props.requestOrderItems}
          >
            {this.props.data ? '주문하기' : '상품을 담아주세요'}
          </button>
        </div>
        <ul className='paymentNotice'>
          <li>
            '입금확인'상태일 때는 주문 내역 상세에서 직접 주문취소가 가능합니다.
          </li>
          <li>'입금확인' 이후 상태에는 고객센터로 문의해주세요.</li>
        </ul>
      </div>
    );
  }
}
