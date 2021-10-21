import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './subCategoriesForEachCategory.scss';

export default class subCategoriesForEachCategory extends Component {
  render() {
    const { hoverCategoryData } = this.props;
    const { list, i } = hoverCategoryData;
    return (
      <div>
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
      </div>
    );
  }
}
