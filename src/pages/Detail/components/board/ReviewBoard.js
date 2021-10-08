import React, { Component } from 'react';
import Review from './Review';
import './ReviewBoard.scss';

class reviewBoard extends Component {
  constructor() {
    super();
    this.state = {
      reviewCommentModal: false,
      reviewData: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/reviewMock.json')
      .then(res => res.json())
      .then(data => {
        this.setState({
          reviewData: data.REVIEW_DATA,
        });
      });
  }

  isValidInputReviewPopup = () => {
    const { reviewCommentModal } = this.state;
    this.setState({
      reviewCommentModal: !reviewCommentModal,
    });
  };

  closeCommentModal = () => {
    this.setState({
      reviewCommentModal: false,
    });
  };

  clickReviewHandler = _id => {
    const newArr = this.state.reviewData.map(review => {
      if (review.id === _id) {
        review.isOpenReviewBox = !review.isOpenReviewBox;
        return review;
      } else {
        review.isOpenReviewBox = false;
        return review;
      }
    });

    this.setState({ reviewData: newArr });
  };

  render() {
    const { reviewCommentModal, reviewData } = this.state;
    return (
      <div className='Board'>
        <div className='boardAlign'>
          <div className='board'>
            <div className='titleAlign'>
              <ul className='titleList'>
                <h2 className='title'>PRODUCT REVIEW</h2>
                <li className='listStyle'>
                  상품에 대한 문의를 남기는 공간입니다. 해당 게시판의 성격과
                  다른 글은 사전동의 없이 담당 게시판으로 이동될 수 있습니다.
                </li>
                <li className='listStyle'>
                  배송관련, 주문(취소/교환/환불)관련 문의 및 요청사항은 마이컬리
                  내&nbsp;
                  <a href='/' className='_1_1inquir'>
                    1:1 문의
                  </a>
                  에 남겨주세요.
                </li>
              </ul>
              <select className='selectBox'>
                <option value='1'>최근등록순</option>
                <option value='2'>좋아요많은순</option>
                <option value='3'>조회많은순</option>
              </select>
            </div>
            <div className='titleStyle'>
              <table className='style'>
                <tbody>
                  <tr>
                    <th className='num'>번호</th>
                    <th className='reviewTitle'>제목</th>
                    <th className='userClass'></th>
                    <th className='writer'>작성자</th>
                    <th className='writeDate'>작성일</th>
                    <th className='selectNumber'>도움</th>
                    <th className='viewNumber'>조회</th>
                  </tr>
                </tbody>
              </table>
              {reviewData.map(data => {
                return (
                  <Review
                    {...data}
                    clickReviewHandler={this.clickReviewHandler}
                  />
                );
              })}
            </div>
            <div className='buttonAlign'>
              <button
                className='buttonStyle'
                onClick={this.isValidInputReviewPopup}
              >
                후기작성
              </button>
            </div>
            <div className='commentAlign commentPageButn'>
              <span className='firstPageButn commentAlign'>〈〈</span>
              <span className='commentStyle commentAlign'>〈</span>
              <span className='commentStyle commentAlign'>1</span>
              <span className='commentStyle commentAlign'>2</span>
              <span className='commentStyle commentAlign'>〉</span>
              <span className='commentStyle commentAlign'>〉〉</span>
            </div>
            <div className={reviewCommentModal ? '' : 'contentHide'}>
              <div className='modalAlign'>
                <div className='modalPopUp'>
                  <div className='modalTitle'>상품 후기작성</div>
                  <div className='modalProductNav'>
                    <span className='modalProductImg' img='/'>
                      (상품 사진)
                    </span>
                    (카테고리, 상품명)
                  </div>
                  <div className='commentTitle'>
                    <span>제목</span>
                    <textarea
                      className='commentTitleInput'
                      type='text'
                      placeholder='작성하실 후기의 제목을 입력해주세요'
                    />
                  </div>
                  <div className='commentContent'>
                    <span>내용</span>
                    <textarea
                      className='commentContentInput'
                      type='text'
                      placeholder='제품의 상세후기를 작성 해주세요'
                    />
                  </div>
                  <div className='modalButnAlign'>
                    <button className='modalButn'>작성완료</button>
                    <button
                      className='modalButn'
                      onClick={this.closeCommentModal}
                    >
                      닫기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default reviewBoard;
