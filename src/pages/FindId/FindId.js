import { Component } from 'react';
import './FindId.scss';

export default class FindId extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userEmail: '',
    };
  }

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { handleInput } = this;
    const { userName, userEmail } = this.state;

    const isValidName = userName.length > 0; // 상세 로직은 추후에 반영
    const isValidEmail = userEmail.length > 0; // 상세 로직은 추후에 반영
    const isValidInput = isValidName && isValidEmail;

    return (
      <div className='FindId'>
        <div className='findIdContainer'>
          <h3>아이디 찾기</h3>
          <form id='userInfoForm' action='./findId' method='POST'>
            <label>이름</label>
            <input
              type='text'
              name='userName'
              placeholder='고객님의 이름을 입력해주세요'
              onChange={handleInput}
              required
            />
            <label>이메일</label>
            <input
              type='text'
              name='userEmail'
              placeholder='가입 시 등록하신 이메일 주소를 입력해주세요'
              onChange={handleInput}
              required
            />
          </form>
          <button
            type='button'
            className={isValidInput ? 'btnLogin valid' : 'btnLogin invalid'}
            form='userInfoForm'
          >
            확인
          </button>
        </div>
      </div>
    );
  }
}
