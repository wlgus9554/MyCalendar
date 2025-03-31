import React from 'react';
import { useNavigate } from 'react-router-dom';


const MainPage = () => {
  const user = JSON.parse(sessionStorage.getItem("loginUser"));
  const loginEmail = localStorage.getItem("loginEmail");
  const grade = localStorage.getItem("loginGrade");
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("loginUser");
    localStorage.removeItem("loginEmail");
    localStorage.removeItem("loginGrade");
    window.location.reload();
  };

  return (
    
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>📅 My Calendar</h1>
      {user ? (
        <div>
          <p><strong>{user.nickName}</strong>님, 환영합니다!</p>
          <button onClick={() => window.location.href = "/calendar"}>내 캘린더</button>
          <button onClick={handleLogout}>로그아웃</button>
          <br /><br />

          {/* ✅ 관리자용 버튼 */}
          {grade === "admin" && (
            <button onClick={() => navigate('/list')}>회원 목록 보기</button>
          )}

          {/* ✅ 일반 유저용 버튼 */}
          {grade === "user" && loginEmail && (
            <button onClick={() => navigate(`/view?email=${loginEmail}`)}>
              내 정보 보기
            </button>
          )}
        </div>
      ) : (
        <div>
          <p>내 일정을 기록하고 공유해보세요!</p>
          <button onClick={() => window.location.href = "/login"}>로그인</button>
          <button onClick={() => window.location.href = "/join"}>회원가입</button>
        </div>
      )}
    </div>
  );
};

export default MainPage;
