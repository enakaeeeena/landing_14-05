const GalleryGrid = ({ items }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {items.map(item => (
      <div 
        key={item.id} 
        className="border-2 border-black rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
      >
        <img
          src={item.image}
          alt={item.description}
          className="w-full h-48 object-cover"
        />
        <p className="p-3 text-sm bg-white">{item.description}</p>
      </div>
    ))}
  </div>
);