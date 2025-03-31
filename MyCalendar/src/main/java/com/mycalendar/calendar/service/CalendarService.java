package com.mycalendar.calendar.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.mycalendar.calendar.vo.CalendarVO;

public interface CalendarService {
	
	// 캘린더 화면(리스트)
    public List<CalendarVO> CalendarList(String email);
    
    // 캘린더 일정 상세보기
    public CalendarVO CalendarView(@Param("id")int id);
    
    // 일정 등록(생성)
    public Integer CalendarWrite(CalendarVO vo);

    // 일정 수정
    public Integer CalendarUpdate(CalendarVO vo);
    
    // 일정 삭제
    public Integer CalendarDelete(CalendarVO vo);

}
