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
    };
  }

  render() {
    return (
      <main>
        <MainBanner />
        <Section
          dataLink={'data/MDsPick/category1MDList.json'}
          title='이 상품 어때요?'
          sectionName='이 상품 어때요?'
        />
        <SpecialPrice
          dataLink='data/specialPrice.json'
          title='특가/혜택 >'
          sectionName='specialOffer'
        />
        <Section
          dataLink={'data/MDsPick/category1MDList.json'}
          title='이 상품 어때요?'
          sectionName='이 상품 어때요?'
        />
        <Banner
          url='/'
          imgUrl='https://img-cf.kurly.com/shop/data/main/5/pc_img_1633488525.jpg'
          bannerName='간편식 20% 할인'
        />
        <Section
          categories={true}
          dataLink={'data/MDsPick/category1MDList.json'}
          title='MD의 추천'
          sectionName='MD의 추천'
        />
        <Banner
          url='/'
          imgUrl='https://img-cf.kurly.com/shop/data/main/5/pc_img_1632901578.jpg'
          bannerName='무제한 적립금 이벤트'
        />
        <Section
          dataLink={'data/MDsPick/category1MDList.json'}
          title='지금 가장 핫한 상품 >'
          sectionName='지금 가장 핫한 상품 >'
        />
        <Section
          dataLink={'data/MDsPick/category1MDList.json'}
          title='똑똑한 요리 비법, 주방가전 특가 >'
          sectionName='specialOffer'
        />
        <Section
          dataLink={'data/MDsPick/category1MDList.json'}
          title='마감세일 >'
          sectionName='마감세일 >'
        />
        <Section
          dataLink={'data/MDsPick/category1MDList.json'}
          title='365일 최저가 도전 >'
          titDesc='최저가 도전, 365일 언제나 알뜰하게'
          sectionName='specialOffer'
        />
        <Section
          dataLink={'data/MDsPick/category1MDList.json'}
          title='대용량 상품 >'
          titDesc='팬트리 가득 든든하게, 부담 없는 대용량 묶음 상품'
          sectionName='대용량 상품 >'
        />
      </main>
    );
  }
}
