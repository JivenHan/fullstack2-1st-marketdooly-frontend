import React, { Component } from 'react';

class Review extends Component {
  render() {
    const {
      id,
      reviewTitle,
      userGrade,
      userName,
      dateTime,
      likeCount,
      viewCount,
      productCategory,
      productName,
      reviewText,
      isOpenReviewBox,
    } = this.props;

    return (
      <div className='Review'>
        <table className='style'>
          <tbody>
            <tr onClick={() => this.props.clickReviewHandler(id)}>
              <td className='num'>{id}</td>
              <td className='reviewTitle'>{reviewTitle}</td>
              <td className='userClass'>{userGrade}</td>
              <td className='writer'>{userName}</td>
              <td className='tdDateTime'>{dateTime}</td>
              <td className='selectNumber'>{likeCount}</td>
              <td className='viewNumber'>{viewCount}</td>
            </tr>
          </tbody>
        </table>
        <div className={isOpenReviewBox ? 'displayContent' : 'contentHide'}>
          <div>
            <h2 className='reviewTitle'>
              [{productCategory}]{productName}
            </h2>
          </div>
          <div className='reviewImage'>
            <img src='/' alt='err' />
          </div>
          <div className='reviewComment'>{reviewText}</div>
          <div className='helpfulButnAlign'>
            <button className='helpfulButnStyle'>도움이 돼요</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Review;
