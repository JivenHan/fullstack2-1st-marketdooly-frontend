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

        <div className='cmgnbContainer'>
          <div className='categoriesMenuContainer'>
            <img
              className='menuHamburgerIcon'
              alt='menuHamburgerIcon'
              src='/menuHamburgerIcon.png'
            />
            <p>전체 카테고리</p>
          </div>
          <ul className='listMenuContainer'>
            <li>신상품</li>
            <li>베스트</li>
            <li>알뜰쇼핑</li>
            <li>특가/혜택</li>
          </ul>
          <div className='otherMenuContainer'>
            <input
              className='gnbSearchInput'
              type='text'
              label='검색어'
              placeholder='검색어를 입력해주세요.'
            />
            <button className='gnbSetLocationButton' type='button'>
              <img alt='배송지 설정하기' src='locationIcon.png' />
            </button>
            <Link className='gnbGoToCart' to='../../pages/Login/Login'>
              <img alt='장바구니' src='cartIcon.png' />
            </Link>
          </div>
        </div>
      </div>

      // 로그인 전, 광고배너 삭제 후
    );
  }
}
