import React, { Component } from 'react';
import MainBanner from './components/MainBanner/MainBanner';
import Section from './components/Section';
import SpecialPrice from './components/SpecialPrice';
import Banner from './Banner';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';
import QuickNav from '../../components/QuickNav/QuickNav';
import './Main.scss';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      banners: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:8000/main/banner/bar')
      .then(res => {
        if (!res.ok) throw new Error('배너 데이터가 존재하지 않습니다.');
        return res.json();
      })
      .then(banners =>
        this.setState({
          banners: banners.map(ele => ele.image),
        })
      )
      .catch(err =>
        this.setState({
          banners: [],
          errors: err,
        })
      );
  }

  goToDetailPage = id => {
    this.props.history.push(`/detail/${id}`);
  };

  render() {
    return (
      <main>
        <MainBanner />
        <div className='mainContainer' ref={this.mainArea}>
          <Section
            goToDetailPage={this.goToDetailPage}
            endPoint={'main/event/most_popular'}
            quickNavInitHeight={this.quickNavInitHeight}
          />
          <SpecialPrice
            endPoint='main/event/special_price'
            sectionName='specialOffer'
          />
          <Section
            goToDetailPage={this.goToDetailPage}
            endPoint={'main/event/lowest_price'}
          />
          <Banner
            url='/'
            imgUrl={this.state.banners[0]}
            bannerName='수퍼 플렉스 위크'
          />
          <Section
            goToDetailPage={this.goToDetailPage}
            categories={true}
            endPoint={'main/event/last_call'}
          />
          <Banner
            url='/'
            imgUrl={this.state.banners[1]}
            bannerName='무제한 적립금 이벤트'
          />
          <Section
            goToDetailPage={this.goToDetailPage}
            endPoint={'main/event/kitchen'}
          />
          <Section
            goToDetailPage={this.goToDetailPage}
            endPoint={'main/event/most_popular'}
            sectionName='specialOffer'
          />
          <Section
            goToDetailPage={this.goToDetailPage}
            endPoint={'main/event/large_capacity'}
          />
          <Banner
            url='/'
            imgUrl={this.state.banners[2]}
            bannerName='샛별택배 배송안내'
          />
        </div>
        <ScrollToTop />
        <QuickNav />
      </main>
    );
  }
}
