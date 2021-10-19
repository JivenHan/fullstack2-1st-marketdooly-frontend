import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CartIconSvg from './components/CartIconSvg';
import LocationIconSvg from './components/LocationIconSvg';
import './TopNav.scss';

export default class TopNav extends Component {
  constructor() {
    super();
    this.state = {
      categoryIconData: [],
      categoryData: [],
      // categoriesArray: [],
      // entireSubCategoriesArray: [],
      isTopAdBannerClosed: false,
      isLnbUserCsVisible: false,
      isCategoriesVisible: false,
      isSubCategoriesVisible: false,
      cartItemNumber: 0,
      isUserLoggedIn: false,
    };
  }

  componentDidMount() {
    //세션에서 카트 아이템 번호 빼오기
    fetch('http://localhost:8000/users/session', {
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error('not loggedIn');
        return res.json();
      })
      .then(data =>
        this.setState({
          cartItemNumber: data.result.length,
          isUserLoggedIn: true,
        })
      )
      .catch(console.error);

    fetch('data/categoryData.json')
      .then(res => res.json())
      .then(res => {
        this.setState({
          categoryIconData: res,
        });
      })
      .catch(err => console.log(err));

    fetch('http://localhost:8000/main/allcategory')
      .then(res => res.json())
      .then(res => {
        console.log('>>>>>>>>>>>>>>>>>>>category에서 무얼 받니');
        console.log(res);
        this.setState({
          categoryData: res,
        });
      });
  }

  logout = () => {
    const deleteCookie = name => {
      document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
    };
    deleteCookie('jwt');
    window.location.reload();
    this.props.history.push('/');
  };

  closeTopAdBanner = () => {
    this.setState({ isTopAdBannerClosed: true });
  };

  showHiddenlnbUserCs = () => {
    this.setState({ isLnbUserCsVisible: true });
  };

  hideHiddenlnbUserCs = () => {
    this.setState({ isLnbUserCsVisible: false });
  };

  showCategories = () => {
    this.setState({
      isCategoriesVisible: true,
    });
  };

  hideCategories = () => {
    this.setState({
      isCategoriesVisible: false,
    });
  };

  showSubCategories = () => {
    this.setState({
      isSubCategoriesVisible: true,
    });
  };

  hideSubCategories = () => {
    this.setState({
      isSubCategoriesVisible: false,
    });
  };

  moveToCategory = link => {
    window.location.replace(`/category/${link}`);
  };

  render() {
    return (
      <div className='TopNav'>
        {!this.state.isTopAdBannerClosed && (
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
            <Link to='/'>
              <img
                className='headerLogo'
                alt='kurlylogo'
                src='https://i.imgur.com/WJ4Df0D.png'
              />
            </Link>
          </div>
          <ul className='headerUserContainer'>
            <li className='headerUserItem1Wrapper'>
              <Link className='headerUserItem1' to='/signup'>
                회원가입
              </Link>
            </li>
            <li className='headerUserItem2Wrapper'>
              {this.state.isUserLoggedIn ? (
                <div
                  className='headerUserItem2'
                  onClick={this.logout}
                  style={{ cursor: 'pointer' }}
                >
                  로그아웃
                </div>
              ) : (
                <Link className='headerUserItem2' to='/login'>
                  로그인
                </Link>
              )}
            </li>
            <li
              className='headerUserItem3Wrapper'
              onMouseOver={this.showHiddenlnbUserCs}
              onMouseOut={this.hideHiddenlnbUserCs}
            >
              <span className='headerUserItem3' onClick={this.logout}>
                고객센터
              </span>
              <img
                className='toggleIcon'
                alt='toggleIcon'
                src='/toggleIcon.png'
              />
            </li>
          </ul>
        </div>
        {this.state.isLnbUserCsVisible && (
          <div className='lnbUserCsContainer'>
            <ul
              className={`lnbUserCsWrapperVisible ${
                !this.state.isLnbUserCsVisible ? 'hidden' : ''
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
            onMouseOver={this.showCategories}
            onMouseOut={this.hideCategories}
          >
            <img
              className='menuHamburgerIcon'
              alt='menuHamburgerIcon'
              src='/menuHamburgerIcon.png'
            />
            <p>전체 카테고리</p>
            {/* 골칫거리 카테고리 드랍다운 시작 */}
            {/* 부모 wrapper의 nth-child마다, 호버하면 섭메뉴나오게 */}
            {/* 부모 wrapper의 nth-child마다, 호버하면 state의 hoveredCategoryId에 값 올라가게 */}
            {/* this.state.hoveredCategoryId == 1 일때만 */}
            <div
              className={`dropDownCategories ${
                !this.state.isCategoriesVisible ? 'hidden' : ''
              }`}
            >
              <ul className='parentCategoriesContainer'>
                {/* <div
                className='parentCategoriesWrapper'
                // onMouseOver={this.showSubCategories}
                // onMouseOut={this.hideSubCategories}
              > */}
                {this.state.categoryIconData !== [] &&
                  this.state.categoryIconData.map((categoryIconData, i) => {
                    return (
                      <li
                        key={i}
                        className='parentCategoryBg'
                        style={{
                          backgroundImage: `url(${categoryIconData.iconUrl})`,
                        }}
                      ></li>
                    );
                  })}
                {this.state.categoryData !== [] &&
                  this.state.categoryData.map((eachCategoryData, i) => {
                    console.log('>>>>eachCategoryData');
                    console.log(eachCategoryData);
                    const name = '/list/' + eachCategoryData.id;
                    return (
                      <li key={i} className='parentCategoryNameWrapper'>
                        <Link to={name} className='parentCategoryNameLink'>
                          {eachCategoryData.categoryName}
                        </Link>
                        <ul className='subCategoriesContainer'>
                          {eachCategoryData.list &&
                            eachCategoryData.list.map(
                              (eachSubCategoryData, i) => {
                                // console.log('>>>>>>>eachSubCategoryData@@');
                                // console.log(eachSubCategoryData);
                                const name =
                                  '/list/' +
                                  eachCategoryData.id +
                                  '/' +
                                  eachSubCategoryData.id;
                                return (
                                  <li
                                    key={i}
                                    className='subCategoryNameLinkWrapper'
                                  >
                                    <Link
                                      to={name}
                                      className='subCategoryNameLink'
                                    >
                                      {eachSubCategoryData.subCategoryName}
                                    </Link>
                                  </li>
                                );
                              }
                            )}
                        </ul>
                      </li>
                    );
                  })}
                {/* </div> */}
              </ul>
            </div>
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
            <Link className='gnbGoToCart' to='/cart'>
              <CartIconSvg strokeColor={'#333'} />
              {this.state.cartItemNumber ? (
                <span className='cartItemNumber'>
                  {this.state.cartItemNumber}
                </span>
              ) : null}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
