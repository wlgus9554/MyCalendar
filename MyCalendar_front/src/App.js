// App.js 또는 App.jsx에 들어갈 코드입니다!
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Login from './Member/login';
import Join from './Member/join';
import MemberList from './Member/memberList';
import MemberView from './Member/memberView';
import MemberUpdate from './Member/memberUpdate';
import MyCalendar from './Calendar/calendarList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/list" element={<MemberList/>} />
        <Route path="/view" element={<MemberView />} /> {/* ✅ 이 줄 추가 */}
        <Route path="/memberUpdate" element={<MemberUpdate />} />
        <Route path='/calendar' element={<MyCalendar/>} />

        {/* 필요한 페이지를 계속 추가 가능 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
