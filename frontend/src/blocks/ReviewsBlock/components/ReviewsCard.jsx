// src/blocks/ReviewsBlock/components/ReviewsCard.jsx
const ReviewsCard = ({ review, isActive }) => (
    <div className={`relative bg-[#5E7CBB] p-6 flex gap-6 transition-all duration-300 ${
      isActive ? 'w-2/3 scale-110 z-10' : 'w-1/3 opacity-75 scale-90'
    }`}>
      <div className="w-1/3 border-4 border-white">
        <img 
          src={review.photo} 
          alt={review.name} 
          className="w-full h-64 object-cover"
        />
      </div>
      
      <div className="w-2/3 text-white">
        <div className="border-b-4 border-white pb-4 mb-4">
          <h3 className="text-2xl font-bold">{review.name}</h3>
          <p className="text-lg">{review.position}</p>
        </div>
        <p className="text-lg h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-white">
          {review.text}
        </p>
      </div>
    </div>
  );
  
  export default ReviewsCard;