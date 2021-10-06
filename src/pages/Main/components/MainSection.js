import React, { Component } from 'react';
import Carousel from '../../../components/Carousel/Carousel';
import './MainSection.scss';

export default class MainSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsData: props.productsData,
      selectedCategory: 1,
    };
  }

  displayCategories = () => {
    return (
      <div className='category'>
        <ul className='categoryList'>
          {this.props.categories.map(ele => {
            const { id, categoryName } = ele;
            return (
              <li key={id}>
                <span
                  onClick={() => {
                    this.setState({
                      selectedCategory: id,
                    });
                  }}
                  className={`categoryTxt ${
                    this.state.selectedCategory === id && 'selected'
                  }`}
                >
                  {categoryName}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  render() {
    return (
      <section className={this.props.sectionName}>
        <div className='titGoods'>
          <h3 className='tit'>{this.props.title}</h3>
        </div>
        {this.props?.categories && this.displayCategories()}
        <Carousel productsData={this.state.productsData} />
      </section>
    );
  }
}
