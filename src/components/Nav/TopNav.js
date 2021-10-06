import React, { Component } from 'react';
import './TopNav.scss';

export default class TopNav extends Component {
  render() {
    return (
      // 로그인 전, 광고배너 삭제 전
      <div className='TopNav'>
        <div className='topAdBannerBg'>
          <div className='topAdBannerContent'>
            <p>
              지금 가입하고 인기상품 <span>100원</span>에 받아가세요!
              <img className='nextIcon' alt='nextIcon' src='/nextIcon.png' />
            </p>
            <img className='closeIcon' alt='closeIcon' src='/closeIcon.png' />
          </div>
        </div>
        <div className='cmgnbContainer'>
          <div className='cmgnbDeliveryWrapper'>
            <img
              className='cmgnbDeliveryImg'
              alt='샛별 택배 배송안내'
              src='/cmgnbDelivery.png'
            />
          </div>
          <div className='cmgnbLogoWrapper'>
            <img className='cmgnbLogo' alt='kurlylogo' src='/logo.svg' />
          </div>
          <ul className='cmgnbUserContainer'>
            <li className='cmgnbUserItem'>
              <a
                href='https://www.kurly.com/shop/member/join.php'
                target='_self'
              >
                회원가입
              </a>
            </li>
            <li className='cmgnbUserItem'>
              <a
                href='https://www.kurly.com/shop/member/login.php'
                target='_self'
              >
                로그인
              </a>
            </li>
            <li className='cmgnbUserItem'>
              <a
                href='https://www.kurly.com/shop/board/list.php?id=notice'
                target='_self'
              >
                고객센터
              </a>
            </li>
          </ul>
        </div>
        <ul className='lnbUserCsWrapperVisible'>
          <li className='lnbUserCsItem'>공지사항</li>
          <li className='lnbUserCsItem'>자주하는 질문</li>
          <li className='lnbUserCsItem'>1:1 문의</li>
          <li className='lnbUserCsItem'>대량주문 문의</li>
          <li className='lnbUserCsItem'>상품 제안</li>
          <li className='lnbUserCsItem'>에코포장 피드백</li>
        </ul>
      </div>

      // 로그인 전, 광고배너 삭제 후
    );
  }
}
