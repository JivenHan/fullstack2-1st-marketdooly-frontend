const account = {
  type: 'text',
  name: 'account',
  maxLength: '15',
  placeholder: '아이디를 입력해주세요',
  text: '아이디',
  required: true,
  dupCheck: true,
};

const password = {
  type: 'password',
  name: 'password',
  maxLength: '15',
  placeholder: '비밀번호를 입력해주세요',
  text: '비밀번호',
  required: true,
};

const passwordConfirm = {
  type: 'password',
  name: 'passwordConfirm',
  maxLength: '15',
  placeholder: '비밀번호를 한번 더 입력해주세요',
  text: '비밀번호 확인',
  required: true,
};

const name = {
  type: 'text',
  name: 'name',
  maxLength: '20',
  placeholder: '이름을 입력해주세요',
  text: '이름',
  required: true,
};

const email = {
  type: 'text',
  name: 'email',
  placeholder: '이메일 주소를 입력해주세요',
  text: '이메일',
  required: true,
  dupCheck: true,
};

const cellPhone = {
  type: 'text',
  name: 'cellPhone',
  maxLength: '12',
  placeholder: '숫자만 입력해주세요',
  text: '휴대폰',
  required: true,
  auth: true,
};

const address = {
  type: 'text',
  name: 'address',
  placeholder: '주소를 입력해주세요',
  text: '주소',
  required: true,
};

const yyyy = {
  type: 'text',
  name: 'yyyy',
  maxLength: '4',
  placeholder: 'YYYY',
  required: false,
};

const mm = {
  type: 'text',
  name: 'mm',
  maxLength: '2',
  placeholder: 'MM',
  required: false,
};

const dd = {
  type: 'text',
  name: 'dd',
  maxLength: '2',
  placeholder: 'DD',
  required: false,
};

export default {
  account,
  password,
  passwordConfirm,
  name,
  email,
  cellPhone,
  address,
  yyyy,
  mm,
  dd,
};
