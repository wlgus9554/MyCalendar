import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Join  = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [nickName, setNickName] = useState("");
    const [birth, setBirth] = useState("");
    const [gender, setGender] = useState("");
    const [tel, setTel] = useState("");
    const [city, setCity] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);   // 로딩 상태
    const [error, setError] = useState(null);       // 에러 처리
    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("name", name);
        formData.append("nickName", nickName);
        formData.append("birth", birth);
        formData.append("gender", gender);
        formData.append("tel", tel);
        formData.append("city", city);
        if (image) {
          formData.append("imageFile", image);
        } else {
          // 빈 파일로 대체 (또는 백엔드에서 required = false 처리)
          formData.append("imageFile", new Blob(), "empty.png");
        }        
        for (let [key, value] of formData.entries()) {
            console.log(key, value); // 👀 여기서 imageFile 키가 있고, 값이 File 객체인지 확인!
          }          
      
        try {
          const response = await axios.post("http://localhost:8080/api/member/join.do", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          });
      
          alert("회원가입이 완료되었습니다!");
      
          // ✅ 성공 시 페이지 이동
          window.location.href = "/api/member/memberList.do"; // 또는 React Router로 이동
      
        } catch (err) {
          console.error(err);
          setError("회원가입 중 오류가 발생했습니다.");
        }
      };
      
const handleChange = (e) => {
    setCity(e.target.value);
};

return (
    <div>
      <h2>회원가입</h2>
      <label>아이디:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /><br/>
    <label>비밀번호:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
    <label>이름:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} /><br/>
    <label>닉네임:</label>
        <input type='text' value={nickName} onChange={(e) => setNickName(e.target.value)} /><br/>
    <label>생년월일:</label>
        <input type='date' value={birth} onChange={(e) => setBirth(e.target.value)}/><br/>
    <label>성별:</label>
        <input type='radio' name='gender' value='남자' checked={gender === '남자'}
         onChange={(e) => setGender(e.target.value)}/>남자
        <input type='radio' name='gender' value='여자' checked={gender === '여자'}
         onChange={(e) => setGender(e.target.value)}/>여자<br/>
    <label>전화번호:</label>
        <input type='text' value={tel} onChange={(e) => setTel(e.target.value)} /><br/>
    <label>지역:</label>
    <select value={city} onChange={handleChange}>
        <option value="">-- 지역을 선택하세요 --</option>
        <option value="서울">서울</option>
        <option value="경기도">경기도</option>
        <option value="강원도">강원도</option>
        <option value="충청북도">충청북도</option>
        <option value="충청남도">충청남도</option>
        <option value="경상북도">경상북도</option>
        <option value="경상남도">경상남도</option>
        <option value="전라북도">전라북도</option>
        <option value="전라남도">전라남도</option>
        <option value="부산">부산</option>
        <option value="제주도">제주도</option>
        {/* 원하는 지역 더 추가 가능 */}
      </select><br/>
    <label>사진:</label>
    <input
        type="file"
        name="imageFile"  // 👈 반드시 name 속성도 imageFile 이어야 함!
        onChange={(e) => setImage(e.target.files[0])}
    />
      <button onClick={handleSubmit}>가입하기</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
    
  );
};

export default Join;