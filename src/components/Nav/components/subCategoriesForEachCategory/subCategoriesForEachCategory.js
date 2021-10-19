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
    const { hoverCategoryData } = this.props;
    const { list, i } = hoverCategoryData;
    return (
      <li key={i} className='parentCategoryNameWrapper'>
        <ul className='subCategoriesContainer'>
          {list &&
            list.map((eachSubCategoryData, idx) => {
              const name = '/list/' + i + '/' + idx;
              return (
                <li key={idx} className='subCategoryNameLinkWrapper'>
                  <Link to={name} className='subCategoryNameLink'>
                    {eachSubCategoryData.subCategoryName}
                  </Link>
                </li>
              );
            })}
        </ul>
      </li>
    );
  }
}
