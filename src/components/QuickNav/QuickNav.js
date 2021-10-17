import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './QuickNav.scss';

export default class QuickNav extends Component {
  constructor() {
    super();
    this.itemList = React.createRef();
    this.state = {
      defaultPosition: 722,
      initPosition: 600,
      init: false,
      visibility: false,
      currentScroll: 722,
      minimumViewportWidth: 1280,
      listScroll: 0,
      recentlyViewedItems: [],
    };
  }

  componentDidMount() {
    this.getRecentlyViewedItems();
    this.detectViewportWidth();
    window.addEventListener('resize', this.detectViewportWidth);
    window.addEventListener('scroll', this.detectCurrentScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.detectViewportWidth);
    window.removeEventListener('scroll', this.detectCurrentScroll);
  }

  getRecentlyViewedItems = () => {
    const items = JSON.parse(localStorage.getItem('recentlyViewed'));
    this.setState({
      recentlyViewedItems: items,
    });
  };

  itemListScrolling = e => {
    const { listScroll, recentlyViewedItems } = this.state;
    if (e.target.className === 'up') {
      this.setState({
        listScroll: listScroll <= 0 ? 0 : listScroll - 1,
      });
    } else {
      this.setState({
        listScroll:
          listScroll < recentlyViewedItems.length - 2
            ? listScroll + 1
            : listScroll,
      });
    }
  };

  detectViewportWidth = () => {
    const { innerHeight, innerWidth } = window;
    this.setState({
      visibility: innerWidth >= this.state.minimumViewportWidth,
      viewportHeight: innerHeight,
    });
  };

  detectCurrentScroll = () => {
    const { defaultPosition, initPosition } = this.state;
    const { pageYOffset, innerHeight } = window;
    this.setState({
      currentScroll:
        pageYOffset >= initPosition
          ? pageYOffset - 190 + innerHeight / 2
          : defaultPosition,
    });
  };

  render() {
    const { visibility, currentScroll, listScroll, recentlyViewedItems } =
      this.state;
    return (
      <aside
        className={`QuickNav ${visibility ? '' : 'hidden'}`}
        style={{ top: `${currentScroll}px` }}
      >
        <div className='wrapper'>
          <div className='deliveryNoticeBanner'>
            <Link to='/'>
              <img
                src='https://res.kurly.com/pc/service/main/1904/bnr_quick_20190403.png'
                alt='배송안내'
              />
            </Link>
          </div>
          <ul className='subMenus'>
            <li>
              <Link to='/'>등급별 혜택</Link>
            </li>
            <li>
              <Link to='/' onClick={() => localStorage.clear()}>
                레시피
              </Link>
            </li>
            <li>
              <Link to='/'>베스트 후기</Link>
            </li>
          </ul>
          {!recentlyViewedItems ? null : (
            <div className='recentlyViewedItems'>
              <button className='up' onClick={this.itemListScrolling}>
                위로
              </button>
              <div className='itemListContainer'>
                <h3 className='itemListHeader'>최근 본 상품</h3>
                <div className='itemList'>
                  <ul
                    style={{ top: `-${listScroll * 82}px` }}
                    ref={this.itemList}
                  >
                    {recentlyViewedItems.map(ele => {
                      const { id, product_image } = ele;
                      return (
                        <li className='item' key={id}>
                          <Link to={`/detail/${id}`}>
                            <img src={product_image} alt={id} />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <button className='down' onClick={this.itemListScrolling}>
                아래로
              </button>
            </div>
          )}
        </div>
      </aside>
    );
  }
}
