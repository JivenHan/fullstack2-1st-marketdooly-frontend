import React, { Component } from 'react';
import Review from './Review';

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
      <div class='boardAlign'>
        <div class='board'>
          <form className='tableTitle'>
            <div class='titleAlign'>
              <ul class='titleList'>
                <h2 class='title'>PRODUCT REVIEW</h2>
                <li class='listStyle'>
                  상품에 대한 문의를 남기는 공간입니다. 해당 게시판의 성격과
                  다른 글은 사전동의 없이 담당 게시판으로 이동될 수 있습니다.
                </li>
                <li class='listStyle'>
                  배송관련, 주문(취소/교환/환불)관련 문의 및 요청사항은 마이컬리
                  내&nbsp;
                  <a href='/' class='inquir'>
                    1:1 문의
                  </a>
                  에 남겨주세요.
                </li>
              </ul>
              <select class='selectBox'>
                <option value='1'>최근등록순</option>
                <option value='2'>좋아요많은순</option>
                <option value='3'>조회많은순</option>
              </select>
            </div>
            <div className='table'>
              <div class='titleStyle'>
                <table class='style'>
                  <th class='num'>번호</th>
                  <th class='reviewTitle'>제목</th>
                  <th class='userClass'></th>
                  <th class='writer'>작성자</th>
                  <th class='writeDate'>작성일</th>
                  <th class='selectNumber'>도움</th>
                  <th class='viewNumber'>조회</th>
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
            </div>
          </form>
          <div className='button'>
            <div class='align'>
              <button class='style' onClick={this.isValidInputReviewPopup}>
                후기작성
              </button>
            </div>
          </div>
          <div className='commentPage'>
            <div class='align pageButn'>
              <span class='firstPageButn align'>〈〈</span>
              <span class='style align'>〈</span>
              <span class='style align'>1</span>

              <span class='style align'>2</span>
              <span class='style align'>〉</span>
              <span class='style align'>〉〉</span>
            </div>
          </div>
          <form className='inputCommentModal'>
            <div class={reviewCommentModal ? '' : 'contentHide'}>
              <div class='align'>
                <div class='popUp'>
                  <div class='title'>상품 후기작성</div>
                  <div class='productNav'>
                    <span class='productImg' img='/'>
                      (상품 사진)
                    </span>
                    (카테고리, 상품명)
                  </div>
                  <div class='commentTitle'>
                    <span>제목</span>
                    <textarea
                      class='commentTitleInput'
                      type='text'
                      placeholder='작성하실 후기의 제목을 입력해주세요'
                    />
                  </div>
                  <div class='commentContent'>
                    <span>내용</span>
                    <textarea
                      class='commentContentInput'
                      type='text'
                      placeholder='제품의 상세후기를 작성 해주세요'
                    />
                  </div>
                  <div class='modalButnAlign'>
                    <button class='modalButn'>작성완료</button>
                    <button class='modalButn'>닫기</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default reviewBoard;
