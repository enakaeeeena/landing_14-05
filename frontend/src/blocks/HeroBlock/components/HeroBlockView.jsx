export const HeroBlockView = ({ content }) => {
  const tickerText = content.tickerText || 
    '#информационныетехнологиивдизайне #итвдргпу #ргпу #герцен';
  const repeatedText = `${tickerText} `.repeat(10);

  return (
    <div className="w-full relative">
      {content.image && (
        <img 
          src={content.image} 
          alt="Hero" 
          className="w-full h-auto object-cover"
          style={{ maxHeight: '800px' }}
        />
      )}
      
      <div className="w-screen ml-[calc(-50vw+50%)] border-t-4 border-b-4 border-black py-6 overflow-hidden bg-white">
        <div className="animate-marquee whitespace-nowrap w-[200vw]">
          <span className="text-24px font-bold" style={{ 
            fontFamily: "'YFF Rare', sans-serif",
            fontVariationSettings: '"wght" 700' 
          }}>
            {repeatedText}
          </span>
        </div>
      </div>
    </div>
  );
};