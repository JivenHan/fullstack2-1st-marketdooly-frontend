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
      categoriesArray: [],
      isTopAdBannerClosed: false,
      isLnbUserCsVisible: false,
      isCategoriesVisible: false,
    };
  }

  componentDidMount() {
    fetch('data/categoryIconData.json')
      .then(res => res.json())
      .then(res => {
        this.setState({
          categoryIconData: res,
        });
      })
      .catch(err => console.log(err));
    fetch('http://localhost:8000/main/category')
      .then(res => res.json())
      .then(res => {
        this.setState({
          categoryData: res,
          categoriesArray: [res[0].categoryName],
        });
      })
      .then(res => {
        let redundantCategoriesArray = [];
        this.state.categoryData.map(x => {
          redundantCategoriesArray.push(x.categoryName);
        });
        let categoriesArray = redundantCategoriesArray.filter((el, idx) => {
          return redundantCategoriesArray.indexOf(el) === idx;
        });
        this.setState({
          categoriesArray: categoriesArray,
        });
      });
  }

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

  render() {
    console.log('this.state.categoryData>>>>>>>>>>>>>>>>>>>>>>');
    console.log(this.state.categoryData);
    console.log('this.state.categoriesArray>>>>>>>>>>>>>>>>>>>>>>');
    console.log(this.state.categoriesArray);

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
            <img
              className='headerLogo'
              alt='kurlylogo'
              src='https://i.imgur.com/eY0hAoz.png'
            />
          </div>
          <ul className='headerUserContainer'>
            <li className='headerUserItem1Wrapper'>
              <Link className='headerUserItem1' to='/signup'>
                회원가입
              </Link>
            </li>
            <li className='headerUserItem2Wrapper'>
              <Link className='headerUserItem2' to='/login'>
                로그인
              </Link>
            </li>
            <li
              className='headerUserItem3Wrapper'
              onMouseOver={this.showHiddenlnbUserCs}
              onMouseOut={this.hideHiddenlnbUserCs}
            >
              <Link className='headerUserItem2' to='/login'>
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
            onMouseLeave={this.hideCategories}
          >
            <img
              className='menuHamburgerIcon'
              alt='menuHamburgerIcon'
              src='/menuHamburgerIcon.png'
            />
            <p>전체 카테고리</p>
            <div
              className={`dropDownCategories ${
                !this.state.isCategoriesVisible ? 'hidden' : ''
              }`}
            >
              <ul className='parentCategoriesContainer'>
                {this.state.categoryIconData !== [] &&
                  this.state.categoryIconData.map(categoryIconData => {
                    return (
                      <li
                        className='parentCategoryBg'
                        style={{
                          backgroundImage: `url(${categoryIconData.iconUrl})`,
                        }}
                      ></li>
                    );
                  })}
                {this.state.categoriesArray !== [] &&
                  this.state.categoriesArray.map(categoryDatum => {
                    return (
                      <div className='parentCategoryNameLinkWrapper'>
                        <Link className='parentCategoryNameLink' to='/'>
                          <h3 className='parentCategoryName'>
                            {categoryDatum}
                          </h3>
                        </Link>
                      </div>
                    );
                  })}
                {/* {this.state.categoryData.map(categoryDatum => {
                  return (
                    <div className='parentCategoryNameLinkWrapper'>
                      <Link className='parentCategoryNameLink' to='/'>
                        <h3 className='parentCategoryName'>
                          {categoryDatum.categoryName}
                        </h3>
                      </Link>
                    </div>
                  );
                })} */}
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
            <Link className='gnbGoToCart' to='../../pages/Login/Login'>
              <CartIconSvg strokeColor={'#333'} />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
