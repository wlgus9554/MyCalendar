import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import CalendarView from './CalendarView';
import '../App.css';
import CalendarWrite from './CalendarWrite';
import interactionPlugin from '@fullcalendar/interaction'; // ✅ 중요
import axios from 'axios';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [showWrite, setShowWrite] = useState(false);

  // 일정 불러오기
  useEffect(() => {
    fetch("http://localhost:8080/api/calendar/calendarList.do", {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.ok ? res.json() : Promise.reject("일정 불러오기 실패"))
      .then(data => {
        const mapped = data.map(vo => ({
          id: vo.id,
          title: vo.title,
          start: vo.start_date,
          end: vo.end_date,
          color: vo.color
        }));
        setEvents(mapped);
      })
      .catch(err => alert(err));
  }, []);

  // 일정 클릭 시 상세 보기
  const handleEventClick = (info) => {
    const id = info.event.id;
    fetch(`http://localhost:8080/api/calendar/calendarView.do?id=${id}`, {
      credentials: 'include'
    })
      .then(res => res.ok ? res.json() : Promise.reject("상세 조회 실패"))
      .then(vo => {
        setSelectedEvent(vo);
        setShowModal(true);
      })
      .catch(err => alert(err));
  };

  // 캘린더 날짜 클릭 시 일정 등록 모달창 출력
  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr); // 클릭한 날짜 저장
    setShowWrite(true); // 모달 출력
  };

  const handleAddEvent = async (newEvent) => {
    try {
      const response = await axios.post('http://localhost:8080/api/calendar/calendarWrite.do', newEvent,{
        withCredentials: true // ✅ 이게 꼭 필요함
      }); // 예시 URL
      
      const savedEvent = response.data; // 저장된 일정 객체 (id 포함)
      // ✅ FullCalendar가 이해할 수 있는 구조로 변환
      const calendarEvent = {
        id: savedEvent.id,
        title: savedEvent.title,
        start: savedEvent.start_date,
        end: savedEvent.end_date,
        allDay: savedEvent.all_day === 'Y', // 문자열 'Y' → boolean true
        color: savedEvent.color
      };
  
      setEvents([...events, calendarEvent]); // DB가 반환한 id 포함한 객체를 사용
      setShowWrite(false); // 모달 닫기
    } catch (error) {
      console.error("일정 등록 실패", error);
    }
  };
  

  return (
    <>
      <div className="calendar-wrapper">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventClick={handleEventClick}
          dateClick={handleDateClick}
        />
        
      </div>

      {/* 일정 상세보기 컴포넌트 */}
      {showModal && selectedEvent && (
        <CalendarView event={selectedEvent} onClose={() => setShowModal(false)} />
      )}

      {/* 일정 등록 모달 출력 - start, end 기본값, onClose - 모달 닫기 함수, onSave - 입력된 데이터 저장 함수 */}
      {showWrite && (
        <CalendarWrite
          date={selectedDate}
          onClose={() => setShowWrite(false)}
          onSave={handleAddEvent}
        />
      )}
    </>
  );
};

export default Calendar;
