import { Component } from 'react';
import './UserInfoInput.scss';

export default class UserInfoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  account = {
    type: 'text',
    name: 'account',
    maxLength: '15',
    placeholder: '아이디를 입력해주세요',
  };

  password = {
    type: 'password',
    name: 'password',
    maxLength: '15',
    placeholder: '비밀번호를 입력해주세요',
  };

  passwordConfirm = {
    type: 'password',
    name: 'passwordConfirm',
    maxLength: '15',
    placeholder: '비밀번호를 한번 더 입력해주세요',
  };

  name = {
    type: 'text',
    name: 'name',
    maxLength: '20',
    placeholder: '이름을 입력해주세요',
  };

  email = {
    type: 'text',
    name: 'email',
    placeholder: '이메일 주소를 입력해주세요',
  };

  render() {
    const { input, onChange } = this.props;

    // props로 <input> 태그의 attribute를 전달받은 경우 덮어씀
    const preDefinedObj = this[input];
    const propsKeyList = Object.keys(this.props);
    const preDefinedkeyList = Object.keys(preDefinedObj);
    propsKeyList.forEach(propsKey => {
      if (preDefinedkeyList.includes(propsKey)) {
        preDefinedObj[propsKey] = this.props[propsKey];
      }
    });

    const { type, name, maxLength, placeholder } = preDefinedObj;
    return (
      <input
        className='UserInfoInput'
        type={type ? type : null}
        name={name ? name : null}
        maxLength={maxLength ? maxLength : null}
        placeholder={placeholder ? placeholder : null}
        onChange={onChange ? onChange : null}
      />
    );
  }
}
