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
      API: 'http://52.79.253.85:8001',
    };
  }

  /*
  DB 덤프 파일을 AWS DB에서 복원하면 내 DB가 올라감
  .env API주소 환경변수화 하는 이유는 유지보수를 위해서 + 
  development -> production
  JEST
  */

  componentDidMount = () => {
    if (this.props.categories) {
      this.getCategories();
      this.reRenderingMDPick(this.state.selectedCategory);
    } else {
      this.getDisplayData();
    }
  };

  getDisplayData = () => {
    fetch(`${this.state.API}/${this.props.endPoint}`)
      .then(res => res.json())
      .then(data =>
        this.setState({
          data,
        })
      );
  };

  getCategories = () => {
    fetch(`${this.state.API}/main/category`)
      .then(res => res.json())
      .then(categoryData =>
        this.setState({
          categoryData: categoryData.filter(
            ele => ele.categoryName !== '컬리의 추천'
          ),
        })
      );
  };

  reRenderingMDPick = () => {
    fetch(`${this.state.API}/main/event/mdspick/${this.state.selectedCategory}`)
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
    const { sectionStyle } = this.props;
    return (
      <section className={`Section` + ` ${sectionStyle ? sectionStyle : ''}`}>
        <div className='titGoods'>
          <h3 className='tit'>
            <span className='titTitle'>
              {this.state.data.length ? this.state.data[0].header : null}
            </span>
            {this.state.data.length ? (
              <span className='titDesc'>{this.state.data[0].description}</span>
            ) : null}
          </h3>
        </div>
        {this.props.categories && this.displayCategories()}
        <Carousel
          data={this.state.data}
          goToDetailPage={this.props.goToDetailPage}
        />
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
