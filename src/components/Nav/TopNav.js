import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        <div className='headerContainer'>
          <div className='headerDeliveryWrapper'>
            <img
              className='headerDeliveryImg'
              alt='샛별 택배 배송안내'
              src='/headerDelivery.png'
            />
          </div>
          <div className='headerLogoWrapper'>
            <img className='headerLogo' alt='kurlylogo' src='/logo.svg' />
          </div>
          <ul className='headerUserContainer'>
            <li className='headerUserItem1Wrapper'>
              <Link className='headerUserItem1' to='../../pages/SignUp/SignUp'>
                회원가입
              </Link>
            </li>
            <li className='headerUserItem2Wrapper'>
              <Link className='headerUserItem2' to='../../pages/Login/Login'>
                로그인
              </Link>
            </li>
            <li className='headerUserItem3Wrapper'>
              <Link className='headerUserItem3' to='../../pages/Login/Login'>
                고객센터
              </Link>
              <img
                className='toggleIcon'
                alt='toggleIcon'
                src='/toggleIcon.png'
              />
            </li>
          </ul>
        </div>
        <div className='lnbUserCsContainer'>
          <ul className='lnbUserCsWrapperVisible'>
            <li className='lnbUserCsItem'>공지사항</li>
            <li className='lnbUserCsItem'>자주하는 질문</li>
            <li className='lnbUserCsItem'>1:1 문의</li>
            <li className='lnbUserCsItem'>대량주문 문의</li>
            <li className='lnbUserCsItem'>상품 제안</li>
            <li className='lnbUserCsItem'>에코포장 피드백</li>
          </ul>
        </div>
      </div>

      // 로그인 전, 광고배너 삭제 후
    );
  }
}
