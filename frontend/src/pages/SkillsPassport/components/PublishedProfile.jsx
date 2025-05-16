import React from 'react';

const PublishedProfile = ({ profile }) => {
  if (!profile) return null;

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg mt-8">
      <div className="flex items-center gap-4 mb-4">
        {profile.photo && (
          <img 
            src={profile.photo} 
            alt="Аватар"
            className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200"
          />
        )}
        <div>
          <h2 className="text-xl font-semibold">
            {profile.lastName} {profile.firstName} {profile.middleName}
          </h2>
          <p className="text-gray-600">{profile.skill}</p>
        </div>
      </div>
      {/* Здесь можно добавить отображение проектов, если нужно */}
    </div>
  );
};

export default PublishedProfile;