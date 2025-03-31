import dayjs from 'dayjs';

const CalendarView = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{event.title}</h2>
        <p>{event.content}</p>
        <p>
          {dayjs(event.start_date).format('YYYY년 MM월 DD일 HH:mm')} ~{' '}
          {dayjs(event.end_date).format('MM월 DD일 HH:mm')}
        </p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default CalendarView;
