import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CartIconSvg from './components/CartIconSvg';
import LocationIconSvg from './components/LocationIconSvg';
// import TopAdBanner from './components/TopAdBanner';
// import Header from './components/Header';
import './TopNav.scss';

export default class TopNav extends Component {
  constructor() {
    super();
    this.state = {
      categoryData: [],
      isTopAdBannerClosed: false,
      isHeaderToggleIconHovered: false,
      isCategoriesVisible: false,
    };
  }

  componentDidMount() {
    try {
      fetch('data/categoryData.json')
        .then(res => res.json())
        .then(categoryData =>
          this.setState({
            categoryData,
          })
        );
    } catch (err) {
      console.error(err);
    }
  }

  renderingCategories = () => {
    return (
      <div
        className={`dropDownLNB ${
          !this.state.isCategoriesVisible ? 'hidden' : ''
        }`}
      >
        <ul className='parentCategories'>
          {this.state.categoryData.map(category => {
            return (
              <li style={{ backgroundImage: `url(${category.iconUrl})` }}>
                <Link to='/'>
                  <h3 className='categoryName'>{category.parentCategories}</h3>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  closeTopAdBanner = () => {
    this.setState({ isTopAdBannerClosed: true });
  };

  showHiddenlnbUserCs = () => {
    this.setState({ isHeaderToggleIconHovered: true });
  };

  hideHiddenlnbUserCs = () => {
    this.setState({ isHeaderToggleIconHovered: false });
  };

  toggleLNBVisibility = event => {
    const value = event.type === 'mouseover';
    this.setState({
      isCategoriesVisible: value,
    });
  };

  render() {
    return (
      <div className='TopNav'>
        {!this.state.isPopupClosed && (
          <div className='topAdBannerBg'>
            <div className='topAdBannerContent'>
              <p>
                지금 가입하고 인기상품 <span>100원</span>에 받아가세요!
                <img className='nextIcon' alt='nextIcon' src='/nextIcon.png' />
              </p>
              <img
                onClick={this.closeTopAdBanner}
                className='closeIcon'
                alt='closeIcon'
                src='/closeIcon.png'
              />
            </div>
          </div>
        )}
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
            <li
              className='headerUserItem3Wrapper'
              onMouseOver={this.showHiddenlnbUserCs}
              onMouseOut={this.hideHiddenlnbUserCs}
            >
              <Link className='headerUserItem2' to='../../pages/Login/Login'>
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
        {this.state.isHeaderToggleIconHovered && (
          <div className='lnbUserCsContainer'>
            <ul
              className={`lnbUserCsWrapperVisible ${
                !this.state.isHeaderToggleIconHovered ? 'hidden' : ''
              }`}
            >
              <li className='lnbUserCsItem'>공지사항</li>
              <li className='lnbUserCsItem'>자주하는 질문</li>
              <li className='lnbUserCsItem'>1:1 문의</li>
              <li className='lnbUserCsItem'>대량주문 문의</li>
              <li className='lnbUserCsItem'>상품 제안</li>
              <li className='lnbUserCsItem'>에코포장 피드백</li>
            </ul>
          </div>
        )}

        <div className='cmgnbContainer'>
          <div
            className='categoriesMenuContainer'
            onMouseOver={this.toggleLNBVisibility}
            onMouseLeave={this.toggleLNBVisibility}
          >
            <img
              className='menuHamburgerIcon'
              alt='menuHamburgerIcon'
              src='/menuHamburgerIcon.png'
            />
            <p>전체 카테고리</p>
            {this.renderingCategories()}
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
              <LocationIconSvg strokeColor={'#333'} />
            </button>
            <Link className='gnbGoToCart' to='../../pages/Login/Login'>
              <CartIconSvg strokeColor={'#333'} />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
