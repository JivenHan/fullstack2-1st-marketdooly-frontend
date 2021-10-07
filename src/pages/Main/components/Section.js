import React, { Component } from 'react';
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

  componentDidMount = async () => {
    if (this.props.categories) {
      await this.getCategories();
      this.reRenderingMDPick(this.state.selectedCategory);
    }
    this.getDisplayData();
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
    fetch(`http://localhost:3000/data/categoryData.json`)
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
          {this.props.categories.map(ele => {
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
      <section className={this.props.sectionName}>
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
      </section>
    );
  }
}
