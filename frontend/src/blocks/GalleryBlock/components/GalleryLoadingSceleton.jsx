const GalleryLoadingSkeleton = () => (
    <div className="animate-pulse space-y-8">
      <div className="h-8 bg-gray-200 w-1/3 rounded"></div>
      
      <div className="relative h-96 bg-gray-200 rounded-xl">
        <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
          <div className="h-6 bg-gray-300 w-2/3 rounded"></div>
          <div className="h-4 bg-gray-300 w-1/2 rounded"></div>
          <div className="h-8 bg-gray-300 w-1/4 rounded"></div>
        </div>
      </div>
  
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
        ))}
      </div>
    </div>
  );
  
  export default GalleryLoadingSkeleton;