"use client";
import React, { useState, useMemo, useRef, useEffect } from 'react';

// TypeScript interfaces
interface ComponentContent {
  title: string;
  description: string;
  size: string;
  category: string;
  likes: number;
  downloads: number;
  image: string;
}

interface ComponentData {
  id: string;
  name: string;
  path: string;
  type: 'prebuilt' | 'public';
  content: ComponentContent;
}

interface MockData {
  components: ComponentData[];
}

// Mock data with Pinterest-style images and metrics
const mockData: MockData = {
  "components": [
    {
      "id": "comp1",
      "name": "Modern Navbar",
      "path": "/components/navbar.jsx",
      "type": "prebuilt",
      "content": {
        "title": "Modern Navbar",
        "description": "Responsive navbar with dropdown menus",
        "size": "small",
        "category": "Navigation",
        "likes": 245,
        "downloads": 1890,
        "image": "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop&auto=format"
      }
    },
    {
      "id": "comp2",
      "name": "Hero Section",
      "path": "/components/hero.jsx",
      "type": "prebuilt",
      "content": {
        "title": "Hero Banner",
        "description": "Full-width hero section with CTA",
        "size": "tall",
        "category": "Hero",
        "likes": 189,
        "downloads": 1245,
        "image": "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=400&h=500&fit=crop&auto=format"
      }
    },
    {
      "id": "comp3",
      "name": "Card Grid",
      "path": "/components/card-grid.jsx",
      "type": "prebuilt",
      "content": {
        "title": "Product Cards",
        "description": "Responsive card grid layout",
        "size": "medium",
        "category": "Layout",
        "likes": 312,
        "downloads": 2100,
        "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w-400&h=350&fit=crop&auto=format"
      }
    },
    {
      "id": "comp4",
      "name": "Footer Component",
      "path": "/components/footer.jsx",
      "type": "prebuilt",
      "content": {
        "title": "Site Footer",
        "description": "Multi-column footer with links",
        "size": "medium",
        "category": "Navigation",
        "likes": 156,
        "downloads": 980,
        "image": "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop&auto=format"
      }
    },
    {
      "id": "comp5",
      "name": "Testimonials",
      "path": "/components/testimonials.jsx",
      "type": "prebuilt",
      "content": {
        "title": "Customer Reviews",
        "description": "Testimonial carousel component",
        "size": "tall",
        "category": "Testimonials",
        "likes": 278,
        "downloads": 1670,
        "image": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=450&fit=crop&auto=format"
      }
    },
    {
      "id": "comp6",
      "name": "Contact Form",
      "path": "/components/contact-form.jsx",
      "type": "prebuilt",
      "content": {
        "title": "Get in Touch",
        "description": "Validated contact form with submission",
        "size": "small",
        "category": "Forms",
        "likes": 198,
        "downloads": 1320,
        "image": "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=280&fit=crop&auto=format"
      }
    },
    {
      "id": "comp7",
      "name": "Pricing Table",
      "path": "/components/pricing.jsx",
      "type": "prebuilt",
      "content": {
        "title": "Plans & Pricing",
        "description": "Interactive pricing comparison table",
        "size": "tall",
        "category": "Pricing",
        "likes": 324,
        "downloads": 1980,
        "image": "https://images.unsplash.com/photo-1557821552-17105176677c?w=400&h-480&fit=crop&auto=format"
      }
    },
    {
      "id": "comp8",
      "name": "Dashboard",
      "path": "/components/stats.jsx",
      "type": "prebuilt",
      "content": {
        "title": "Analytics Cards",
        "description": "Dashboard widgets for metrics",
        "size": "small",
        "category": "Dashboard",
        "likes": 421,
        "downloads": 2450,
        "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w-400&h=260&fit=crop&auto=format"
      }
    },
    {
      "id": "pub1",
      "name": "Community Forum",
      "path": "/community/forum-card.jsx",
      "type": "public",
      "content": {
        "title": "Discussion Card",
        "description": "Forum thread card with voting",
        "size": "medium",
        "category": "Community",
        "likes": 567,
        "downloads": 3120,
        "image": "https://images.unsplash.com/photo-1561070791-2526d30994b5?w-400&h=320&fit=crop&auto=format"
      }
    },
    {
      "id": "pub2",
      "name": "Social Feed",
      "path": "/community/social-feed.jsx",
      "type": "public",
      "content": {
        "title": "Post Component",
        "description": "Social media styled feed item",
        "size": "tall",
        "category": "Social",
        "likes": 489,
        "downloads": 2780,
        "image": "https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?w-400&h=460&fit=crop&auto=format"
      }
    },
    {
      "id": "pub3",
      "name": "Weather Widget",
      "path": "/community/weather.jsx",
      "type": "public",
      "content": {
        "title": "Weather Forecast",
        "description": "Local weather display component",
        "size": "small",
        "category": "Widget",
        "likes": 345,
        "downloads": 1890,
        "image": "https://images.unsplash.com/photo-1592210454359-9043f067919b?w-400&h=240&fit=crop&auto=format"
      }
    },
    {
      "id": "pub4",
      "name": "Music Player",
      "path": "/community/music-player.jsx",
      "type": "public",
      "content": {
        "title": "Audio Player",
        "description": "Custom styled audio player",
        "size": "medium",
        "category": "Media",
        "likes": 512,
        "downloads": 2980,
        "image": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w-400&h=340&fit=crop&auto=format"
      }
    },
    {
      "id": "pub5",
      "name": "Recipe Card",
      "path": "/community/recipe-card.jsx",
      "type": "public",
      "content": {
        "title": "Recipe Display",
        "description": "Beautiful recipe card with ingredients",
        "size": "tall",
        "category": "Food",
        "likes": 432,
        "downloads": 2560,
        "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=520&fit=crop&auto=format"
      }
    },
    {
      "id": "pub6",
      "name": "Calendar Widget",
      "path": "/community/calendar.jsx",
      "type": "public",
      "content": {
        "title": "Event Calendar",
        "description": "Interactive calendar component",
        "size": "medium",
        "category": "Productivity",
        "likes": 298,
        "downloads": 1670,
        "image": "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w-400&h=380&fit=crop&auto=format"
      }
    }
  ]
};

// Define props interface for ComponentCard
interface ComponentCardProps {
  component: ComponentData;
}

// Component Card with Pinterest-style layout
const ComponentCard: React.FC<ComponentCardProps> = ({ component }) => {
  return (
    <div className="break-inside-avoid mb-6 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white group cursor-pointer">
      {/* Image Container - Height varies based on image */}
      <div className="relative overflow-hidden">
        <img 
          src={component.content.image} 
          alt={component.content.title}
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Type Badge */}
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-semibold ${component.type === 'prebuilt' ? 'bg-teal-500 text-white' : 'bg-blue-500 text-white'}`}>
          {component.type}
        </div>
      </div>
      
      {/* Card Content */}
      <div className="p-4">
        {/* Component Name */}
        <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">
          {component.name}
        </h3>
        
        {/* Small Category */}
        <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">
          {component.content.category}
        </p>
        
        {/* Likes and Downloads */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
            <span className="font-bold text-gray-900">{component.content.likes.toLocaleString()}</span>
            <span className="text-xs text-gray-500">likes</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="font-bold text-gray-900">{component.content.downloads.toLocaleString()}</span>
            <span className="text-xs text-gray-500">downloads</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Floating Search Button Component
const FloatingSearch = ({ 
  isOpen, 
  onToggle, 
  searchQuery, 
  onSearchChange, 
  onClearSearch 
}: { 
  isOpen: boolean;
  onToggle: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <>
      {/* Floating Search Button */}
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        )}
      </button>

      {/* Search Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onToggle}
          />
          
          {/* Search Panel */}
          <div className="absolute bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl p-6 animate-slideUp">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Search Components</h3>
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search by name or category..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full px-4 py-3 pl-10 pr-10 text-gray-800 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute left-3 top-3.5 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {searchQuery && (
                <button
                  onClick={onClearSearch}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            {/* Quick Categories */}
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Quick categories:</p>
              <div className="flex flex-wrap gap-2">
                {['Navigation', 'Hero', 'Forms', 'Dashboard', 'Social', 'Media'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => onSearchChange(cat)}
                    className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

function Template() {
  const [activeTab, setActiveTab] = useState<'prebuilt' | 'public'>('prebuilt');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  
  // Filter components with useMemo
  const filteredComponents = useMemo(() => {
    return mockData.components.filter(comp => {
      const matchesTab = comp.type === activeTab;
      const matchesSearch = searchQuery === '' || 
        comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.content.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
  };
  // Get column distribution for Pinterest-style masonry layout
  const getColumns = () => {
    const columns = [[], [], [], []] as ComponentData[][];
    filteredComponents.forEach((component, index) => {
      columns[index % 4].push(component);
    });
    return columns;
  };

  const columns = getColumns();

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100">
      {/* Navbar - Keep the original style */}
      <div id="navbar-wrapper" className="w-full flex justify-center pt-4">
        <div id="navbar-container" className="w-[250px] bg-white shadow-sm rounded-lg">
          <div id="navbar-inner" className="w-full">
            <div id="nav-tabs" className="flex justify-between">
              <button
                onClick={() => setActiveTab('prebuilt')}
                className={`flex-1 py-3 text-sm font-medium transition-colors rounded-l-lg ${
                  activeTab === 'prebuilt'
                    ? 'bg-white text-gray-900 border border-gray-200'
                    : 'text-gray-500 hover:text-gray-700 bg-gray-50'
                }`}
              >
                Prebuilt
              </button>
              <button
                onClick={() => setActiveTab('public')}
                className={`flex-1 py-3 text-sm font-medium transition-colors rounded-r-lg ${
                  activeTab === 'public'
                    ? 'bg-white text-gray-900 border border-gray-200'
                    : 'text-gray-500 hover:text-gray-700 bg-gray-50'
                }`}
              >
                Public
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Body with Pinterest-style masonry layout */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Active tab indicator */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 capitalize mb-2">
            {activeTab} Components
          </h2>
          <p className="text-gray-600">
            {filteredComponents.length} components available
          </p>
        </div>
        
        {/* Cards Grid - Pinterest Masonry Layout */}
        {filteredComponents.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {filteredComponents.map((component) => (
              <ComponentCard 
                key={component.id} 
                component={component}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 text-gray-300 mb-4">
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No components found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {searchQuery 
                ? `No components match "${searchQuery}". Try a different search term.`
                : `There are no ${activeTab} components available at the moment.`}
            </p>
          </div>
        )}
      </div>

      {/* Floating Search Button */}
      <FloatingSearch
        isOpen={showSearch}
        onToggle={() => setShowSearch(!showSearch)}
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        onClearSearch={clearSearch}
      />

      {/* Custom CSS for Pinterest layout and animations */}
      <style jsx global>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        
        /* Ensure proper masonry layout */
        .break-inside-avoid {
          break-inside: avoid;
        }
        
        /* Smooth image loading */
        img {
          transition: transform 0.3s ease;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
}

export default Template;