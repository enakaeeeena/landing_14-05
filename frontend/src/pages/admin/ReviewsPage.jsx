import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { FiCheck, FiX, FiPlus } from 'react-icons/fi';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedReviews, setSelectedReviews] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newReview, setNewReview] = useState({
    author: '',
    text: '',
    rating: 5,
    date: new Date().toISOString().split('T')[0]
  });
  const { get, post } = useApi();

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      // Получаем все отзывы из Skills Passport
      const response = await get('/api/Reviews/GetReviews');
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Ошибка загрузки отзывов:', error);
    }
  };

  const toggleReviewSelection = (reviewId) => {
    setSelectedReviews(prev => 
      prev.includes(reviewId)
        ? prev.filter(id => id !== reviewId)
        : [...prev, reviewId]
    );
  };

  const saveSelectedReviews = async () => {
    try {
      // Обновляем выбранные отзывы
      const updatePromises = selectedReviews.map(reviewId => {
        const review = reviews.find(r => r.id === reviewId);
        return post('/api/ProgramPages/EditBlock', {
          id: reviewId,
          type: 'reviews',
          title: review.author,
          content: JSON.stringify({
            author: review.author,
            text: review.text,
            rating: review.rating,
            date: review.date
          }),
          visible: true,
          date: review.date,
          isExample: "false"
        });
      });

      await Promise.all(updatePromises);
      alert('Выбранные отзывы успешно сохранены');
    } catch (error) {
      console.error('Ошибка сохранения отзывов:', error);
    }
  };

  const handleAddReview = async () => {
    try {
      const response = await post('/api/Reviews/CreateReview', {
        author: newReview.author,
        text: newReview.text,
        rating: newReview.rating,
        date: newReview.date
      });

      if (response.ok) {
        const createdReview = await response.json();
        setReviews([...reviews, createdReview]);
        setShowAddModal(false);
        setNewReview({
          author: '',
          text: '',
          rating: 5,
          date: new Date().toISOString().split('T')[0]
        });
        alert('Отзыв успешно добавлен');
      }
    } catch (error) {
      console.error('Ошибка создания отзыва:', error);
      alert('Ошибка при создании отзыва');
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Отзывы</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
          >
            <FiPlus /> Добавить отзыв
          </button>
          <button
            onClick={saveSelectedReviews}
            className="px-6 py-2 bg-[#0C3281] text-white rounded hover:bg-[#0a2a6d]"
          >
            Сохранить выбранные отзывы
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map(review => (
          <div
            key={review.id}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">{review.author}</h3>
                <p className="text-gray-500 text-sm">{review.date}</p>
              </div>
              <button
                onClick={() => toggleReviewSelection(review.id)}
                className={`p-2 rounded-full ${
                  selectedReviews.includes(review.id)
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {selectedReviews.includes(review.id) ? (
                  <FiCheck size={20} />
                ) : (
                  <FiX size={20} />
                )}
              </button>
            </div>
            <p className="text-gray-700 mb-4">{review.text}</p>
            {review.rating && (
              <div className="flex items-center">
                <span className="text-yellow-500 mr-2">★</span>
                <span className="text-gray-600">{review.rating}/5</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Добавить новый отзыв</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Автор</label>
                <input
                  type="text"
                  value={newReview.author}
                  onChange={(e) => setNewReview({...newReview, author: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Текст отзыва</label>
                <textarea
                  value={newReview.text}
                  onChange={(e) => setNewReview({...newReview, text: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows="4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Оценка</label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({...newReview, rating: Number(e.target.value)})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {[1, 2, 3, 4, 5].map(rating => (
                    <option key={rating} value={rating}>{rating} звезд</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Дата</label>
                <input
                  type="date"
                  value={newReview.date}
                  onChange={(e) => setNewReview({...newReview, date: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Отмена
              </button>
              <button
                onClick={handleAddReview}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsPage; 