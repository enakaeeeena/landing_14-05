import { fetchGallery } from '../../api/fakeApi';
import GalleryGrid from './components/GalleryGrid';

const GalleryBlock = () => {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    fetchGallery().then(setGallery);
  }, []);

  return (
    <div className = "container"><h1 className="text-3xl font-bold">Галерея работ</h1><GalleryGrid items={gallery} /></div>
   
  );
};
export default GalleryBlock;