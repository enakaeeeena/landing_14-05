import React from 'react';

const Filters = ({
  year,
  direction,
  tag,
  sortOrder,
  onYearChange,
  onDirectionChange,
  onTagChange,
  onSortOrderChange
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="flex flex-col text-sm text-gray-500">
        <label htmlFor="year">год проекта</label>
        <select
          id="year"
          value={year}
          onChange={(e) => onYearChange(e.target.value)}
          className="border border-blue-900 rounded px-2 py-1"
        >
          <option value="">все</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
      </div>

      <div className="flex flex-col text-sm text-gray-500">
        <label htmlFor="direction">направление</label>
        <select
          id="direction"
          value={direction}
          onChange={(e) => onDirectionChange(e.target.value)}
          className="border border-blue-900 rounded px-2 py-1"
        >
          <option value="">все</option>
          <option value="2d">2d</option>
          <option value="3d">3d</option>
          <option value="web">web</option>
        </select>
      </div>

      <div className="flex flex-col text-sm text-gray-500">
        <label htmlFor="tag">тэги</label>
        <select
          id="tag"
          value={tag}
          onChange={(e) => onTagChange(e.target.value)}
          className="border border-blue-900 rounded px-2 py-1"
        >
          <option value="">все</option>
          <option value="арт">арт</option>
          <option value="дизайн">дизайн</option>
          <option value="интерфейс">интерфейс</option>
        </select>
      </div>

      <div className="flex flex-col text-sm text-gray-500">
        <label htmlFor="sort">сортировка</label>
        <select
          id="sort"
          value={sortOrder}
          onChange={(e) => onSortOrderChange(e.target.value)}
          className="border border-blue-900 rounded px-2 py-1"
        >
          <option value="earliest">самые ранние</option>
          <option value="latest">самые поздние</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
