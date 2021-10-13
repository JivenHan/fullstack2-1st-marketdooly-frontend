import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../../../components/Carousel/Carousel';
import './Section.scss';

export default class Section extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      categoryData: [],
      selectedCategory: 1,
    };
  }

  componentDidMount = () => {
    if (this.props.categories) {
      this.getCategories();
      this.reRenderingMDPick(this.state.selectedCategory);
    } else {
      this.getDisplayData();
    }
  };

  getDisplayData = () => {
    fetch(`http://localhost:3000/${this.props.dataLink}`)
      .then(res => res.json())
      .then(data =>
        this.setState({
          data,
        })
      );
  };

  getCategories = () => {
    fetch(`http://localhost:3000/data/categoryCarouselData.json`)
      .then(res => res.json())
      .then(categoryData =>
        this.setState({
          categoryData,
        })
      );
  };

  reRenderingMDPick = () => {
    fetch(
      `http://localhost:3000/data/MDsPick/category${this.state.selectedCategory}MDList.json`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          data,
        });
      });
  };

  selectedCategoryUI = id => {
    if (id === this.state.selectedCategory) return;
    this.setState(
      {
        selectedCategory: id,
      },
      this.reRenderingMDPick
    );
  };

  displayCategories = () => {
    return (
      <div className='category'>
        <ul className='categoryList'>
          {this.state.categoryData?.map(ele => {
            const { id, categoryName } = ele;
            return (
              <li key={id}>
                <span
                  onClick={this.selectedCategoryUI.bind(this, id)}
                  className={`categoryTxt ${
                    this.state.selectedCategory === id ? 'selected' : ''
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
      <section className={`Section ${this.props.sectionName}`}>
        <div className='titGoods'>
          <h3 className='tit'>
            <span className='titTitle'>{this.props.title}</span>
            {this.props.titDesc && (
              <span className='titDesc'>{this.props.titDesc}</span>
            )}
          </h3>
        </div>
        {this.props.categories && this.displayCategories()}
        <Carousel data={this.state.data} />
        {this.props.categories && (
          <div className='viewAllCategory'>
            <button>
              <Link to='/'>
                <span>
                  {`${
                    this.state.categoryData[this.state.selectedCategory]
                      ?.categoryName
                  } 전체보기 >`}
                </span>
              </Link>
            </button>
          </div>
        )}
      </section>
    );
  }
}
