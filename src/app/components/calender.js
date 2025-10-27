"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import AddEventModel from "./addEvent";
const MyCalendar = () => {
  const [users, setUsers] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  const [events, setEvents] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    generateCalendarDays(currentMonth);
  }, [currentMonth]);

  const changeMonth = (offset) => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + offset);
      return newDate;
    });
  };

  const openModalForDate = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleAddEvent = (title) => {
    if (!selectedDate || !title) return;
    const dateKey = selectedDate.toISOString().split("T")[0];
    setEvents((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), title],
    }));
  };

  const generateCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startDayOfWeek = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();
    const days = [];

    for (let i = 0; i < startDayOfWeek; i++) {
      const prevDate = new Date(year, month, i - startDayOfWeek + 1);
      days.push({ date: prevDate, currentMonth: false });
    }

    for (let i = 1; i <= totalDays; i++) {
      days.push({ date: new Date(year, month, i), currentMonth: true });
    }

    while (days.length % 7 !== 0) {
      const nextDate = new Date(
        year,
        month + 1,
        days.length - totalDays - startDayOfWeek + 1
      );
      days.push({ date: nextDate, currentMonth: false });
    }

    setCalendarDays(days);
  };

  const monthName = currentMonth.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const getTasksForDate = (date) => {
    const dateString = date.toISOString().split("T")[0];
    const tasks = [];
    users.forEach((user) => {
      user.tasks.forEach((task) => {
        const start = new Date(task.startDate).toISOString().split("T")[0];
        const end = new Date(task.endDate).toISOString().split("T")[0];
        if (dateString >= start && dateString <= end) {
          tasks.push({ title: task.title, color: task.color, user: user.name });
        }
      });
    });
    return tasks;
  };

  return (
    <div className="w-full bg-gray-50 text-gray-900">
      <div className="px-10 pb-10 max-w-[1600px] mx-auto">

        <AddEventModel
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddEvent={handleAddEvent}
        />

        <header className="flex justify-between items-center mb-6">
          <h2></h2>
          <div className="flex gap-3 items-center">
            <button
              onClick={() => changeMonth(-1)}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
            >
              ←
            </button>
            <span className="text-xl font-bold">{monthName}</span>
            <button
              onClick={() => changeMonth(1)}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
            >
              →
            </button>
          </div>
        </header>

        <div className="grid grid-cols-7 border border-gray-300 rounded-lg bg-white text-center text-sm sm:text-base md:text-lg">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="p-3 font-semibold border-b border-gray-200 bg-gray-100"
            >
              {day}
            </div>
          ))}

          {calendarDays.map(({ date, currentMonth }, index) => {
            const tasks = getTasksForDate(date);
            const dateKey = date.toISOString().split("T")[0];
            const dayEvents = events[dateKey] || [];
            const isToday = date.toDateString() === new Date().toDateString();

            return (
              <div
                key={index}
                className={`h-24 md:h-32 border border-gray-200 p-2 relative transition-all duration-200
                  ${currentMonth ? "bg-white" : "bg-gray-100 text-gray-400"}
                  hover:bg-blue-50 cursor-pointer
                `}
                onClick={() => openModalForDate(date)}
              >
                <div className="absolute top-1 right-2 text-sm font-semibold">
                  {isToday ? (
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white">
                      {date.getDate()}
                    </div>
                  ) : (
                    <span>{date.getDate()}</span>
                  )}
                </div>

                <div className="mt-6 space-y-1">
                  {tasks.map((task, idx) => (
                    <div
                      key={idx}
                      className="text-xs text-white rounded px-1 py-0.5 truncate"
                      style={{ backgroundColor: task.color }}
                    >
                      {task.title}
                    </div>
                  ))}

                  {dayEvents.map((event, idx) => (
                    <div
                      key={idx}
                      className="text-xs bg-green-500 text-white rounded px-1 py-0.5 truncate"
                    >
                      {event}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;
