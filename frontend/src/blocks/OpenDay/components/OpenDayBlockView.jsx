import React from 'react';

export const OpenDayBlockView = ({ content }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">{content.title}</h2>
          <p className="text-lg">{content.description}</p>
        </div>
        {content.image && (
          <div>
            <img 
              src={content.image} 
              alt="Open Day" 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}; 