
import { useState } from 'react';
import { FiUpload, FiTrash2, FiPlus, FiEdit, FiSave } from 'react-icons/fi';

export const ReviewsEditor = ({ content = {}, setContent }) => {
  const [newReview, setNewReview] = useState({
    id: null,
    name: '',
    position: '',
    photo: null,
    text: ''
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewReview({...newReview, photo: event.target.result});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddReview = () => {
    if (!newReview.name || !newReview.text) return;

    const updatedReviews = newReview.id
      ? content.reviews.map(r => r.id === newReview.id ? newReview : r)
      : [...(content.reviews || []), { ...newReview, id: Date.now() }];

    setContent({ ...content, reviews: updatedReviews });
    setNewReview({
      id: null,
      name: '',
      position: '',
      photo: null,
      text: ''
    });
  };

  const handleEdit = (review) => {
    setNewReview(review);
  };

  const handleDelete = (id) => {
    const updatedReviews = content.reviews.filter(r => r.id !== id);
    setContent({ ...content, reviews: updatedReviews });
  };

  return (
    <div className="space-y-12">
      <div className="relative">
        <h2 className="text-3xl font-bold text-left pr-8">
          <span className="relative z-10 bg-white pl-8">
            Редактор отзывов
          </span>
        </h2>
      </div>

      <div className="border-3 border-black p-8">
        <h3 className="text-4xl font-bold mb-6">
          {newReview.id ? 'Редактирование' : 'Добавление отзыва'}
        </h3>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Имя студента"
              className="w-full p-3 border-3 border-black text-xl"
              value={newReview.name}
              onChange={(e) => setNewReview({...newReview, name: e.target.value})}
            />

            <input
              type="text"
              placeholder="Направление/курс"
              className="w-full p-3 border-3 border-black text-xl"
              value={newReview.position}
              onChange={(e) => setNewReview({...newReview, position: e.target.value})}
            />

            <textarea
              placeholder="Текст отзыва"
              className="w-full p-3 border-3 border-black text-xl h-48"
              value={newReview.text}
              onChange={(e) => setNewReview({...newReview, text: e.target.value})}
            />
          </div>

          <div className="border-3 border-dashed border-black p-6">
            <label className="block text-xl mb-4">Фото студента:</label>
            <label className="inline-flex items-center gap-3 cursor-pointer bg-gray-100 px-6 py-3 text-lg">
              <FiUpload /> Загрузить фото
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            {newReview.photo && (
              <div className="mt-6 relative">
                <img 
                  src={newReview.photo} 
                  alt="Preview" 
                  className="w-64 h-64 object-cover border-4 border-white"
                />
                <button
                  onClick={() => setNewReview({...newReview, photo: null})}
                  className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleAddReview}
          className={`mt-6 px-8 py-3 text-xl font-bold ${
            newReview.id 
              ? 'bg-green-500 text-white hover:bg-green-600' 
              : 'bg-black text-white hover:bg-gray-800'
          }`}
          disabled={!newReview.name || !newReview.text}
        >
          {newReview.id ? <FiSave className="inline mr-2" /> : <FiPlus className="inline mr-2" />}
          {newReview.id ? 'Сохранить изменения' : 'Добавить отзыв'}
        </button>
      </div>

      <div className="border-3 border-black p-8">
        <h3 className="text-4xl font-bold mb-6">Список отзывов</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.reviews?.map(review => (
            <div key={review.id} className="border-3 border-black p-4 relative">
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => handleEdit(review)}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                >
                  <FiEdit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(review.id)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>

              {review.photo && (
                <img 
                  src={review.photo} 
                  alt={review.name} 
                  className="w-full h-64 object-cover border-4 border-white mb-4"
                />
              )}
              <h4 className="text-2xl font-bold mb-2">{review.name}</h4>
              <p className="text-xl text-gray-600 mb-3">{review.position}</p>
              <p className="text-lg line-clamp-4">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};