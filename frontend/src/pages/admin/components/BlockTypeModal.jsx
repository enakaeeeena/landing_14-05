import React, { useState } from 'react';
import { BLOCK_TYPES, BLOCK_OPTIONS } from '../../../constants/blockTypes';

const baseTemplates = {
    [BLOCK_TYPES.HERO]: {
        heading: 'Добро пожаловать в нашу программу',
        subheading: 'Учитесь и развивайтесь вместе с нами',
        buttonText: 'Начать',
        buttonLink: '#',
        backgroundImage: '/path/to/image.jpg'
    },
    [BLOCK_TYPES.ABOUT]: {
        heading: 'О нашей программе',
        description: 'Узнайте больше о том, что мы предлагаем',
        image: '/path/to/about-image.jpg'
    },
    // ... другие шаблоны по необходимости
};

const BlockTypeModal = ({ onClose, onCreate }) => {
    const [type, setType] = useState(BLOCK_OPTIONS[0].value);
    const [title, setTitle] = useState('');

    const handleAdd = () => {
        const template = baseTemplates[type] || {};
        onCreate({
            type,
            title: title || BLOCK_OPTIONS.find(opt => opt.value === type)?.label || 'Новый блок',
            content: JSON.stringify(template),
            visible: true,
            date: new Date().toISOString().split('T')[0],
            isExample: 'false',
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50">
            <div className="bg-white border-2 border-black p-6 rounded-md min-w-[350px]">
                <div className="mb-4">
                    <label className="block font-bold mb-1">Выберите тип блока</label>
                    <select
                        className="w-full border-b-2 border-black py-1 mb-2 bg-transparent"
                        value={type}
                        onChange={e => setType(e.target.value)}
                    >
                        {BLOCK_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block font-bold mb-1">Назовите блок</label>
                    <input
                        className="w-full border-b-2 border-black py-1 mb-2 bg-transparent"
                        type="text"
                        placeholder="Блок блока......"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="flex gap-4 justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="border-2 border-black px-4 py-1 bg-white hover:bg-gray-100"
                    >
                        Отмена
                    </button>
                    <button
                        onClick={handleAdd}
                        className="px-4 py-1 bg-[#0C3281] text-white hover:bg-[#0a2a6d] border-2 border-[#0C3281]"
                    >
                        Добавить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlockTypeModal;