import React, { Component } from 'react';
import MainBanner from './components/MainBanner/MainBanner';
import Section from './components/Section';
import { categories } from './categoriyData';
import { Link } from 'react-router-dom';
import './Main.scss';

export default class Main extends Component {
  render() {
    return (
      <main>
        <MainBanner />
        <Section
          dataLink={'data/MDsPick/category1MDList.json'}
          title='이 상품 어때요?'
          sectionName='이 상품 어때요?'
        />
        <Section
          dataLink={'data/MDsPick/category1MDList.json'}
          title='특가/혜택 >'
          sectionName='특가/혜택 >'
        />
        <Section
          dataLink={'data/MDsPick/category1MDList.json'}
          title='놓치면 후회할 가격 >'
          sectionName='놓치면 후회할 가격 >'
        />
        <div className='barBanner'>
          <Link to='/'>메인 배너 1</Link>
        </div>
        <Section
          categories={categories}
          dataLink={'data/MDsPick/category1MDList.json'}
          title='MD의 추천'
          sectionName='MD의 추천'
        />
        <Section
          dataLink={'data/MDsPick/category1MDList.json'}
          title='지금 가장 핫한 상품 >'
          sectionName='지금 가장 핫한 상품 >'
        />
        <Section
          dataLink={'data/MDsPick/category1MDList.json'}
          title='똑똑한 요리 비법, 주방가전 특가 >'
          sectionName='똑똑한 요리 비법, 주방가전 특가 >'
        />
        <Section
          dataLink={'data/MDsPick/category1MDList.json'}
          title='마감세일 >'
          sectionName='마감세일 >'
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
