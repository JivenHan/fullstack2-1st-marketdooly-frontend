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
      <div>
        <table class='style'>
          <tr onClick={() => this.props.clickReviewHandler(id)}>
            <td class='num'>{id}</td>
            <td class='reviewTitle'>{reviewTitle}</td>
            <td class='userClass'>{userGrade}</td>
            <td class='writer'>{userName}</td>
            <td class='tdDateTime'>{dateTime}</td>
            <td class='selectNumber'>{likeCount}</td>
            <td class='viewNumber'>{viewCount}</td>
          </tr>
        </table>
        <div className='commentBox'>
          <div className={isOpenReviewBox ? 'displayContent' : 'contentHide'}>
            <div>
              <h2 class='title'>
                [{productCategory}]{productName}
              </h2>
            </div>
            <div class='image'>
              <img src='/' alt='err' />
            </div>
            <div class='comment'>{reviewText}</div>
            <div class='helpfulButnAlign'>
              <button class='helpfulButnStyle'>도움이 돼요</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Review;
