/**
 * MultiDatePicker Component
 * Allows selecting multiple dates based on maxDates limit
 *
 * @param {string} name - Field name
 * @param {string} placeholder - Placeholder text
 * @param {array} selectedDates - Array of selected date strings (YYYY-MM-DD)
 * @param {function} onChange - Callback when dates change
 * @param {number} maxDates - Maximum number of dates that can be selected
 * @param {number} minDaysAdvance - Minimum days in advance for booking
 */

import { useState, useRef, useEffect } from "react";
import { FiChevronLeft, FiChevronRight, FiCalendar } from "react-icons/fi";

export default function MultiDatePicker({
  name,
  placeholder = "Select treatment dates",
  selectedDates = [],
  onChange,
  maxDates = 1,
  minDaysAdvance = 5,
  theme = "red", // 'red' for dialysis, 'amber' for custom activities
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const containerRef = useRef(null);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get minimum selectable date (minDaysAdvance days from today)
  const getMinDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + minDaysAdvance);
    return date;
  };

  // Format date to YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Format date for display (DD/MM/YYYY)
  const formatDateDisplay = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  // Check if date is selectable
  const isDateSelectable = (date) => {
    const minDate = getMinDate();
    minDate.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date >= minDate;
  };

  // Check if date is selected
  const isDateSelected = (date) => {
    return selectedDates.includes(formatDate(date));
  };

  // Handle date click
  const handleDateClick = (date) => {
    if (!isDateSelectable(date)) return;

    const dateStr = formatDate(date);
    let newDates;

    if (isDateSelected(date)) {
      // Remove date
      newDates = selectedDates.filter((d) => d !== dateStr);
    } else {
      // Add date (if under limit)
      if (selectedDates.length >= maxDates) {
        // Replace oldest date if at limit
        newDates = [...selectedDates.slice(1), dateStr];
      } else {
        newDates = [...selectedDates, dateStr];
      }
    }

    // Sort dates
    newDates.sort();
    onChange(newDates);
  };

  // Get days in month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    return { daysInMonth, startingDay, year, month };
  };

  // Navigate months
  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  };

  // Get month name
  const getMonthName = (date) => {
    return date.toLocaleString("default", { month: "long" });
  };

  // Render calendar
  const renderCalendar = () => {
    const { daysInMonth, startingDay, year, month } =
      getDaysInMonth(currentMonth);
    const days = [];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Day headers
    const headers = dayNames.map((day) => (
      <div key={day} className="multi-date-picker__day-header">
        {day}
      </div>
    ));

    // Empty cells before first day
    for (let i = 0; i < startingDay; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="multi-date-picker__day multi-date-picker__day--empty"
        ></div>,
      );
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelectable = isDateSelectable(date);
      const isSelected = isDateSelected(date);
      const isToday = formatDate(date) === formatDate(new Date());

      const classNames = [
        "multi-date-picker__day",
        !isSelectable && "multi-date-picker__day--disabled",
        isSelected && "multi-date-picker__day--selected",
        isToday && "multi-date-picker__day--today",
      ]
        .filter(Boolean)
        .join(" ");

      days.push(
        <div
          key={day}
          className={classNames}
          onClick={() => isSelectable && handleDateClick(date)}
        >
          {day}
        </div>,
      );
    }

    return (
      <div className="multi-date-picker__calendar">
        <div className="multi-date-picker__header">
          <button
            type="button"
            onClick={prevMonth}
            className="multi-date-picker__nav"
          >
            <FiChevronLeft size={16} />
          </button>
          <div className="multi-date-picker__month-year">
            <span>{getMonthName(currentMonth)}</span>
            <span>{currentMonth.getFullYear()}</span>
          </div>
          <button
            type="button"
            onClick={nextMonth}
            className="multi-date-picker__nav"
          >
            <FiChevronRight size={16} />
          </button>
        </div>
        <div className="multi-date-picker__days-header">{headers}</div>
        <div className="multi-date-picker__days">{days}</div>
      </div>
    );
  };

  // Display value
  const displayValue =
    selectedDates.length > 0
      ? selectedDates.map(formatDateDisplay).join(", ")
      : "";

  return (
    <div
      className={`multi-date-picker multi-date-picker--${theme}`}
      ref={containerRef}
    >
      <div
        className={`multi-date-picker__input ${isOpen ? "multi-date-picker__input--active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          value={displayValue}
          readOnly
        />
        <FiCalendar className="multi-date-picker__icon" size={20} />
      </div>
      {isOpen && renderCalendar()}
    </div>
  );
}
