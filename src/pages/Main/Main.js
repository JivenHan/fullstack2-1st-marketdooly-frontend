import React, { Component } from 'react';
import MainBanner from './components/MainBanner/MainBanner';
import MainSection from './components/MainSection';
import { categories } from './categoriyData';
import { productsData } from '../../components/Carousel/carouselData';
import { Link } from 'react-router-dom';
import './Main.scss';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      categories,
      selectedCategory: 0,
    };
  }

  render() {
    return (
      <main>
        <MainBanner />
        <MainSection
          productsData={productsData}
          title='이 상품 어때요?'
          sectionName='이 상품 어때요?'
        />
        <MainSection
          productsData={productsData}
          title='특가/혜택 >'
          sectionName='특가/혜택 >'
        />
        <MainSection
          productsData={productsData}
          title='놓치면 후회할 가격 >'
          sectionName='놓치면 후회할 가격 >'
        />
        <div className='barBanner'>
          <Link to='/'>메인 배너 1</Link>
        </div>
        <MainSection
          categories={this.state.categories}
          productsData={productsData}
          title='MD의 추천'
          sectionName='MD의 추천'
        />
        <MainSection
          productsData={productsData}
          title='지금 가장 핫한 상품 >'
          sectionName='지금 가장 핫한 상품 >'
        />
        <MainSection
          productsData={productsData}
          title='똑똑한 요리 비법, 주방가전 특가 >'
          sectionName='똑똑한 요리 비법, 주방가전 특가 >'
        />
        <MainSection
          productsData={productsData}
          title='마감세일 >'
          sectionName='마감세일 >'
        />
        <MainSection
          productsData={productsData}
          title='대용량 상품 >'
          sectionName='대용량 상품 >'
        />
      </main>
    );
  }
}
