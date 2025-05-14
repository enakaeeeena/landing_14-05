const HeroBlock = ({ content }) => {
  const tickerText = content.tickerText || 
    '#информационныетехнологиивдизайне #итвдргпу #ргпу #герцен';
  

  const repeatedText = `${tickerText} `.repeat(10);

  return (
    <div className="w-full relative">
      {content.image && (
        <img 
          src={content.image} 
          className="w-full h-[600px] object-cover"
          alt="Hero banner"
        />
      )}
      
   
      <div className="w-screen ml-[calc(-50vw+50%)] border-t-4 border-b-4 border-black py-3 overflow-hidden bg-white">
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
export default HeroBlock