import React, { Component } from 'react';
import MainBanner from './components/MainBanner/MainBanner';
import Section from './components/Section';
import SpecialPrice from './components/SpecialPrice';
import Banner from './Banner';
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

  render() {
    return (
      <main>
        <MainBanner />
        <Section endPoint={'main/event/most_popular'} />
        <SpecialPrice
          endPoint='main/event/special_price'
          sectionName='specialOffer'
        />
        <Section endPoint={'main/event/lowest_price'} />
        <Banner
          url='/'
          imgUrl={this.state.banners[0]}
          bannerName='수퍼 플렉스 위크'
        />
        <Section categories={true} endPoint={'main/event/last_call'} />
        <Banner
          url='/'
          imgUrl={this.state.banners[1]}
          bannerName='무제한 적립금 이벤트'
        />
        <Section endPoint={'main/event/kitchen'} />
        <Section
          endPoint={'main/event/most_popular'}
          sectionName='specialOffer'
        />
        <Section endPoint={'main/event/large_capacity'} />
        <Banner
          url='/'
          imgUrl={this.state.banners[2]}
          bannerName='샛별택배 배송안내'
        />
      </main>
    );
  }
}
