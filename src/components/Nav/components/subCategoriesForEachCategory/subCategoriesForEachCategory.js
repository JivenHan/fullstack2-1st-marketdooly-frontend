import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './subCategoriesForEachCategory.scss';

export default class subCategoriesForEachCategory extends Component {
  constructor() {
    super();
    this.state = {
      isFirstSubCategoryVisible: false,
      isSecondSubCategoryVisible: false,
      isThirdSubCategoryVisible: false,
      isNineteenthSubCategoryVisible: false,
    };
  }

  render() {
    const { i, name, eachCategoryData } = this.props;
    return (
      <li key={i} className='parentCategoryNameWrapper'>
        <Link to={name} className='parentCategoryNameLink'>
          {eachCategoryData.categoryName}
        </Link>
        <ul className='subCategoriesContainer'>
          {/* {eachCategoryData.list &&
            eachCategoryData.list.map(
              (eachSubCategoryData, i) => {
                // console.log('>>>>>>>eachSubCategoryData@@');
                // console.log(eachSubCategoryData);
                const name =
                  '/list/' +
                  eachCategoryData.id +
                  '/' +
                  eachSubCategoryData.id;
                return (
                  <li
                    key={i}
                    className='subCategoryNameLinkWrapper'
                  >
                    <Link
                      to={name}
                      className='subCategoryNameLink'
                    >
                      {eachSubCategoryData.subCategoryName}
                    </Link>
                  </li>
                );
              }
            )} */}
        </ul>
      </li>
    );
  }
}
