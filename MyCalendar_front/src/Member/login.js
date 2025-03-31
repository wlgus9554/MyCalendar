import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/member/login',
        {
          email,
          password,
        },
        {
          withCredentials: true, // ✅ 세션 쿠키 포함!
        }
      );
  
      const loginUser = response.data;
      console.log("loginUser:", loginUser);
  
      // 저장 (로컬 또는 세션)
      localStorage.setItem("loginEmail", loginUser.email);
      localStorage.setItem("loginGrade", loginUser.grade);
      sessionStorage.setItem("loginUser", JSON.stringify(response.data));
  
      alert(`${response.data.nickName}님 로그인 성공!`);
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };
  

  return (
    <div>
      <h2>로그인</h2>
      <label>이메일</label><br />
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
      <label>비밀번호</label><br />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
      <button onClick={handleLogin}>로그인</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
