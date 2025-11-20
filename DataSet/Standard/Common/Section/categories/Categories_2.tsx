import React from 'react';

interface CardItem {
  title: string;
  description: string;
  another_text: string;
  img: string;
}

interface CategoriesProps {
  backgroundColor?: string;
  textColor?: string;
  card_1?: CardItem[];
  card_2?: CardItem[];
  card_3?: CardItem[];
}

const Categories: React.FC<CategoriesProps> = ({
  backgroundColor = '#121212', // dark background
  textColor = 'white',
  card_1 = [],
  card_2 = [],
  card_3 = [],
}) => {
  const allCards = [...card_1, ...card_2, ...card_3];

  return (
    <div
      className="min-h-screen w-full px-8 py-12"
      style={{ backgroundColor, color: textColor }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {allCards.map((card, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-105 duration-300">
            <img src={card.img} alt={card.title} className="w-full h-60 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-black mb-2">{card.title}</h2>
              <p className="text-gray-800">{card.description}</p>
            </div>
            <div className="px-6 py-4 bg-gray-100">
              <p className="text-sm text-gray-600">{card.another_text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
