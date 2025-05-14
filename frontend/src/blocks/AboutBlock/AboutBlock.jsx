<div className="grid md:grid-cols-2 gap-8">
  <div className="space-y-6">
    {['direction', 'department', 'goal'].map((field) => (
      <div key={field} className="border-2 border-dashed border-gray-300 p-4 rounded">
        <h3 className="text-30px font-bold mb-2">{fieldLabels[field]}</h3>
        
        {field === 'goal' ? (
          <textarea
            className="w-full bg-transparent outline-none min-h-[100px] font-normal"
            style={{ fontVariationSettings: '"wght" 400' }}
            value={content[field] || ''}
            onChange={(e) => setContent({...content, [field]: e.target.value})}
          />
        ) : (
          <input
            type="text"
            className="w-full bg-transparent outline-none font-normal"
            style={{ fontVariationSettings: '"wght" 400' }}
            value={content[field] || ''}
            onChange={(e) => setContent({...content, [field]: e.target.value})}
          />
        )}
      </div>
    ))}
  </div>

  <div className="border-2 border-dashed border-gray-300 p-4 rounded">
    <label className="block mb-2">Изображение:</label>
    <label className="inline-flex items-center gap-2 cursor-pointer bg-gray-100 px-4 py-2">
      <FiUpload /> Загрузить изображение
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </label>
    {content.image && (
      <img src={content.image} alt="Preview" className="mt-4 max-h-60 w-full object-contain" />
    )}
  </div>
</div>