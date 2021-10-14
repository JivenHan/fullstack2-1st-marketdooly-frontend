import { Component } from 'react';
import './CartResult.scss';

export default class CartResult extends Component {
  render() {
    return (
      <div className='CartResult' style={{ top: `${this.props.top}px` }}>
        <div className='destinationContainer'>
          <div className='destinationTitle'>
            <h3>배송지</h3>
          </div>
          {this.props.userAddress ? (
            <div className='address'>
              <p className='userAddress'>
                {this.props.userAddress ? this.props.userAddress : ''}
              </p>
              <span className='deliveryType'>택배배송</span>
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
              <span className='priceInt'>
                {new Intl.NumberFormat('ko-KR').format(
                  this.props.totalDiscount
                )}
              </span>
              원
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
            <span className='rewardBadge'>적립</span>
            {this.props.userAddress
              ? `구매시 ${new Intl.NumberFormat('ko-KR').format(
                  this.props.totalEarnPoints
                )}원 적립`
              : `로그인 후 회원등급에 따라 적립`}
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
          {this.props.userAddress ? (
            <li>쿠폰/적립금은 주문서에서 사용 가능합니다</li>
          ) : null}
          <li>
            '입금확인'상태일 때는 주문 내역 상세에서 직접 주문취소가 가능합니다.
          </li>
          <li>'입금확인' 이후 상태에는 고객센터로 문의해주세요.</li>
        </ul>
      </div>
    );
  }
}
