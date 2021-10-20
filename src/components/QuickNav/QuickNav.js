import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './QuickNav.scss';

export default class QuickNav extends Component {
  constructor() {
    super();
    this.itemList = React.createRef();
    this.state = {
      containerHeight: 0,
      defaultPosition: 722,
      initPosition: 600,
      init: false,
      visibility: false,
      currentScroll: 722,
      minimumViewportWidth: 1280,
      listScroll: 0,
      recentlyViewedItems: [],
      currentRecentScroll: 0,
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
      containerHeight:
        this.state.recentlyViewedItems.length &&
        Number.parseInt(getComputedStyle(this.itemList.current).height),
    });
  };

  calcSlidingRange = () => {
    const { recentlyViewedItems, listScroll } = this.state;
    if (listScroll === recentlyViewedItems.length - 2) {
      return 82 * listScroll - 50;
    } else {
      return 82 * listScroll;
    }
  };

  itemListScrolling = e => {
    const { listScroll, recentlyViewedItems } = this.state;
    const option = {
      up: listScroll <= 0 ? 0 : listScroll - 1,
      down:
        listScroll < recentlyViewedItems.length - 2
          ? listScroll + 1
          : listScroll,
    };
    this.setState(
      {
        listScroll: option[e.target.className],
      },
      this.calcSlidingRange
    );
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
    const { visibility, currentScroll, recentlyViewedItems } = this.state;
    return (
      <aside
        className={`QuickNav ${visibility ? '' : 'hidden'}`}
        style={{ top: `${currentScroll}px` }}
      >
        <div className='wrapper'>
          <div className='deliveryNoticeBanner'>
            <Link to='/'>
              <img src='https://i.imgur.com/uL64vNC.jpg' alt='배송안내' />
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
                    id='items'
                    style={{ top: `-${this.calcSlidingRange()}px` }}
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
