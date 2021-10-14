import React, { Component } from 'react';

class Review extends Component {
  render() {
    const {
      id,
      title,
      userGrade,
      userName,
      createdAt,
      likeCount,
      viewCount,
      // categoryName,
      // categorySubName,
      // productName,
      text,
      isOpenReviewBox,
    } = this.props;

    return (
      <div className='Review'>
        <table className='style'>
          <tbody>
            <tr onClick={() => this.props.clickReviewHandler(id)}>
              <td className='num'>{id}</td>
              <td className='reviewTitle'>{title}</td>
              <td className='userClass'>{userGrade}</td>
              <td className='writer'>{userName}</td>
              <td className='tdDateTime'>{createdAt.substring(0, 10)}</td>
              <td className='selectNumber'>{likeCount}</td>
              <td className='viewNumber'>{viewCount}</td>
            </tr>
          </tbody>
        </table>
        {isOpenReviewBox && (
          <div className='displayContent'>
            <p className='reviewText'>{text}</p>
            <div className='helpfulButnAlign'>
              <button className='helpfulButnStyle'>도움이 돼요</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Review;
