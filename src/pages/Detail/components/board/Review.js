import React, { Component } from 'react';
import { API_ENDPOINT } from '../../../../api';

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      text: props.text,
      newTitle: '',
      newText: '',
    };
  }

  inputHandler = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  clickUpdateBtn = () => {
    const { id, productId, userId, clickReviewHandler } = this.props;
    const { newTitle, newText } = this.state;
    const url = `${API_ENDPOINT}/products/${productId}/reviews`;
    fetch(url, {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reviewId: id,
        userId,
        title: newTitle,
        text: newText,
      }),
    })
      .then(res => {
        if (res.status === 200) {
          alert('후기 수정이 완료되었습니다');
          clickReviewHandler(id);
          this.setState({
            title: newTitle,
            text: newText,
          });
        } else if (res.status === 401) {
          alert('본인 후기만 수정할 수 있습니다 !');
        } else {
          alert('후기 수정 과정에서 오류가 발생하였습니다');
        }
      })
      .catch(console.log);
  };

  clickDeleteBtn = () => {
    const { id, productId, userId } = this.props;
    const url = `${API_ENDPOINT}/products/${productId}/reviews`;
    fetch(url, {
      method: 'DELETE',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reviewId: id,
        userId,
      }),
    })
      .then(res => {
        if (res.status === 200) {
          alert('후기 삭제가 완료되었습니다');
        } else if (res.status === 401) {
          alert('본인 후기만 삭제할 수 있습니다 !');
        } else {
          alert('후기 삭제 과정에서 오류가 발생하였습니다');
        }
      })
      .catch(console.log);
  };

  render() {
    const { inputHandler, clickUpdateBtn, clickDeleteBtn } = this;
    const { title, text } = this.state;
    const {
      id,
      // title,
      // text,
      userGrade,
      userName,
      createdAt,
      likeCount,
      viewCount,
      // categoryName,
      // categorySubName,
      // productName,
      isOpenReviewBox,
      clickReviewHandler,
    } = this.props;

    return (
      <div className='Review'>
        <table className='style'>
          <tbody>
            <tr onClick={() => clickReviewHandler(id)}>
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
            <input type='text' name='newTitle' onChange={inputHandler} />
            <input type='text' name='newText' onChange={inputHandler} />
            <div className='helpfulButnAlign'>
              <button type='button' onClick={clickUpdateBtn}>
                수정
              </button>
              <button type='button' onClick={clickDeleteBtn}>
                삭제
              </button>
              <button type='button' className='helpfulButnStyle'>
                도움이 돼요
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Review;
