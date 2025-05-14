import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserCard = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="border-b py-4 px-2 flex gap-4 items-start">
      <img src={user.photo} alt="user" className="w-16 h-16 rounded-full object-cover" />
      <div className="flex-grow">
        <h2 className="font-bold">{user.lastName} {user.firstName}</h2>
        <p className="text-sm text-gray-600">{user.skill}</p>
        <div className="flex gap-2 mt-2">
          {user.projects?.map((proj, idx) => (
            <img key={idx} src={proj.images?.[0]} className="w-16 h-16 object-cover border" />
          ))}
        </div>
      </div>
      <button
        onClick={() => navigate(`/skills/profile/${user.id}`)}
        className="border px-3 py-1 rounded text-blue-800 border-blue-800"
      >
        профиль
      </button>
    </div>
  );
};

export default UserCard;
