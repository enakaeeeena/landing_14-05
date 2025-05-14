import { useState, useEffect, useRef } from 'react';
import { HeroBlockView } from '../../blocks/HeroBlock/components/HeroBlockView';
import { HeroEditor } from '../../blocks/HeroBlock/components/HeroEditor';
import { AboutBlockView } from '../../blocks/AboutBlock/Components/AboutBlockView';
import { AboutEditor } from '../../blocks/AboutBlock/Components/AboutEditor';
import { ProfessorsEditor } from '../../blocks/Professors/components/ProfessorsBlockEditor';
import { ProfessorsBlockView } from '../../blocks/Professors/components/ProfessorsBlockView';
import CurriculumBlockView from '../../blocks/CurriculumBlock/components/CurriculumBlockView';
import CurriculumBlockEditor from '../../blocks/CurriculumBlock/components/CurriculumBlockEditor';
import { ReviewsEditor } from '../../blocks/ReviewsBlock/components/ReviewsBlockEditor';
import { ReviewsBlockView } from '../../blocks/ReviewsBlock/components/ReviewsBlockView';
import { CareerBlockView } from '../../blocks/CareerBlock/components/CareerBlockView';
import { CareerEditor } from '../../blocks/CareerBlock/components/CareerEditor';
import GalleryBlockView from '../../blocks/GalleryBlock/components/GalleryBlockView';
import { GalleryEditor } from '../../blocks/GalleryBlock/components/GalleryEditor';
import { AdmissionEditor } from '../../blocks/Admission/components/AdmissionEditor';
import AdmissionBlockView from '../../blocks/Admission/components/AdmissionBlockView';

function safeParse(str) {
  try {
    console.log('Parsing content:', str);
    const result = str && str !== '{}' ? JSON.parse(str) : {};
    console.log('Parsed result:', result);
    return result;
  } catch (error) {
    console.error('Parse error:', error);
    return {};
  }
}

const EditableBlock = ({ block, onSave, onDelete, onToggleVisibility, onMoveUp, onMoveDown, isAdminView = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(
    typeof block.content === 'string' ? safeParse(block.content) : block.content
  );
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [error, setError] = useState(null);
  const settingsRef = useRef(null);

  // Дефолтные шаблоны для content
  const defaultTemplates = {
    hero: {
      title: '',
      subtitle: '',
      image: '',
      tickerText: ''
    },
    about: {
      direction: '',
      department: '',
      goal: '',
      images: []
    },
    professors: {
      professors: []
    },
    curriculum: {
      images: []
    },
    reviews: {
      reviews: []
    },
    career: {
      title: '',
      description: '',
      items: []
    },
    gallery: {
      images: []
    },
    admission: {
      title: '',
      description: '',
      requirements: []
    }
  };

  // Привести тип к нижнему регистру
  const type = (block.type || '').toLowerCase();

  // Проверка блока и его типа
  useEffect(() => {
    if (!block) {
      setError('Блок не загружен');
      return;
    }
    
    if (!block.type) {
      setError('Тип блока не определен');
      return;
    }
    
    setError(null);
  }, [block]);

  // Инициализация контента при монтировании или изменении блока
  useEffect(() => {
    if (!content || (typeof content === 'object' && Object.keys(content).length === 0)) {
      const initialContent = typeof block.content === 'string' 
        ? safeParse(block.content) 
        : block.content;
      
      if (!initialContent || Object.keys(initialContent).length === 0) {
        setContent(defaultTemplates[type] || {});
      } else {
        setContent(initialContent);
      }
    }
  }, [block.id]); // Зависимость только от ID блока

  // Закрытие меню при клике вне его
  useEffect(() => {
    if (!settingsOpen) return;
    const handleClick = (e) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [settingsOpen]);

  // При открытии редактора, если content пустой, подставить дефолт
  useEffect(() => {
    if (isEditing && (!content || (typeof content === 'object' && Object.keys(content).length === 0))) {
      setContent(defaultTemplates[type] || {});
    }
  }, [isEditing, type]);

  const handleSave = async () => {
    console.log('Saving block:', block);
    console.log('Current content:', content);
    
    // Подготавливаем данные для отправки
    const updatedBlock = {
      ...block,
      type: block.type.toLowerCase(), // Приводим тип к нижнему регистру
      content: content, // Отправляем content как объект
      title: block.title,
      visible: block.visible,
      date: block.date || new Date().toISOString().split('T')[0],
      isExample: block.isExample || false
    };
    
    console.log('Updated block for server:', updatedBlock);
    
    try {
      await onSave(updatedBlock);
      setIsEditing(false);
      setError(null);
    } catch (error) {
      console.error('Save error:', error);
      setError('Ошибка при сохранении блока: ' + (error.message || 'Неизвестная ошибка'));
      // Не закрываем редактор при ошибке
    }
  };

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 border-2 border-red-500">
        Ошибка: {error}
      </div>
    );
  }

  if (!isAdminView && !block.visible) return null;

  return (
    <div className="w-full">
      {isAdminView && isCollapsed ? (
        <button
          onClick={() => setIsCollapsed(false)}
          className="w-full text-left px-6 py-4 border-2 border-black bg-white hover:bg-gray-50 font-bold"
        >
          Развернуть блок: {block.title}
        </button>
      ) : (
        <>
          {isAdminView && (
            <div className="w-full border-2 border-black">
              <div className="flex justify-between items-center px-6 py-4">
                <h2 className="text-xl font-bold">{block.title}</h2>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={onMoveUp}
                      className="p-2 border-2 border-black hover:bg-gray-50 font-bold"
                      aria-label="Переместить блок вверх"
                    >
                      ↑
                    </button>
                    <button
                      onClick={onMoveDown}
                      className="p-2 border-2 border-black hover:bg-gray-50 font-bold"
                      aria-label="Переместить блок вниз"
                    >
                      ↓
                    </button>
                  </div>
                  <div className="relative" ref={settingsRef}>
                    <button
                      className="p-2 border-2 border-black hover:bg-gray-50 font-bold"
                      onClick={() => setSettingsOpen((open) => !open)}
                      aria-label="Настройки блока"
                    >
                      ⚙
                    </button>
                    {settingsOpen && (
                      <div className="absolute right-0 top-full mt-1 flex flex-col border-2 border-black bg-white z-10 min-w-[180px]">
                        <button 
                          onClick={() => { setIsEditing(!isEditing); setSettingsOpen(false); }}
                          className="px-4 py-2 hover:bg-gray-100 border-b-2 border-black text-left font-bold whitespace-nowrap"
                        >
                          {isEditing ? 'Отмена' : 'Редактировать'}
                        </button>
                        {isEditing && (
                          <button
                            onClick={() => { handleSave(); setSettingsOpen(false); }}
                            className="px-4 py-2 hover:bg-green-100 text-green-600 border-b-2 border-black text-left font-bold whitespace-nowrap"
                          >
                            Сохранить
                          </button>
                        )}
                        <button
                          onClick={() => { onToggleVisibility(block.id); setSettingsOpen(false); }}
                          className="px-4 py-2 hover:bg-gray-100 border-b-2 border-black text-left font-bold whitespace-nowrap"
                        >
                          {block.visible ? 'Скрыть с лендинга' : 'Показать на лендинге'}
                        </button>
                        <button
                          onClick={() => { onDelete(); setSettingsOpen(false); }}
                          className="px-4 py-2 hover:bg-red-100 text-red-600 text-left font-bold whitespace-nowrap"
                        >
                          Удалить
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {isEditing ? (
            <div className="p-6 bg-gray-50 border-x-2 border-black">
              {type === 'hero' && (
                <HeroEditor
                  title={content.title}
                  setTitle={val => setContent({...content, title: val})}
                  subtitle={content.subtitle}
                  setSubtitle={val => setContent({...content, subtitle: val})}
                  image={content.image}
                  setImage={val => setContent({...content, image: val})}
                  tickerText={content.tickerText}
                  setTickerText={val => setContent({...content, tickerText: val})}
                />
              )}
              {type === 'about' && (
                <AboutEditor
                  content={content}
                  setContent={setContent}
                />
              )}
              {type === 'professors' && (
                <ProfessorsEditor
                  content={content}
                  setContent={setContent}
                />
              )}
              {type === 'curriculum' && (
                <CurriculumBlockEditor
                  content={content}
                  setContent={setContent}
                />
              )}
              {type === 'reviews' && (
                <ReviewsEditor
                  content={content}
                  setContent={setContent}
                />
              )}
              {type === 'career' && (
                <CareerEditor
                  content={content}
                  setContent={setContent}
                />
              )}
              {type === 'gallery' && (
                <GalleryEditor
                  content={content}
                  setContent={setContent}
                />
              )}
              {type === 'admission' && (
                <AdmissionEditor
                  content={content}
                  setContent={setContent}
                />
              )}
              {!['hero', 'about', 'professors', 'curriculum', 'reviews', 'career', 'gallery', 'admission'].includes(type) && (
                <div className="text-red-500 p-4 bg-red-50 border-2 border-red-200">
                  Неизвестный тип блока: {type}
                </div>
              )}
            </div>
          ) : (
            <div className="p-6">
              {type === 'hero' && <HeroBlockView content={content} />}
              {type === 'about' && <AboutBlockView content={content} />}
              {type === 'professors' && <ProfessorsBlockView content={content} />}
              {type === 'curriculum' && <CurriculumBlockView content={content} />}
              {type === 'reviews' && <ReviewsBlockView content={content} />}
              {type === 'career' && <CareerBlockView content={content} />}
              {type === 'gallery' && <GalleryBlockView content={content} />}
              {type === 'admission' && <AdmissionBlockView content={content} />}
            </div>
          )}

          {isAdminView && (
            <button
              onClick={() => setIsCollapsed(true)}
              className="w-full text-left px-6 py-4 border-2 border-t-0 border-black bg-white hover:bg-gray-50 font-bold"
            >
              Свернуть блок
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default EditableBlock;