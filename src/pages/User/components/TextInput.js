import { Component } from 'react';
import USER_INFO from './UserInfo';
import './TextInput.scss';

export default class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { input, onChange } = this.props;
    const userInfoObj = USER_INFO[input];

    // // props로 <input> 태그의 attribute를 전달받은 경우 덮어씀
    // const userInfoKeyList = Object.keys(userInfoObj);
    // const propsKeyList = Object.keys(this.props);
    // propsKeyList.forEach(propsKey => {
    //   if (userInfoKeyList.includes(propsKey)) {
    //     userInfoObj[propsKey] = this.props[propsKey];
    //   }
    // });

    const { type, name, maxLength, placeholder } = userInfoObj;
    return (
      <input
        className='TextInput'
        type={type ? type : null}
        name={name ? name : null}
        maxLength={maxLength ? maxLength : null}
        placeholder={placeholder ? placeholder : null}
        onChange={onChange ? onChange : null}
      />
    );
  }
}
