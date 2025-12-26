"use client";
import React, { useState } from 'react';

// TypeScript interfaces
interface ComponentContent {
  title: string;
  description: string;
  size: string;
}

interface ComponentData {
  id: string;
  name: string;
  path: string;
  type: string;
  content: ComponentContent;
}

interface MockData {
  components: ComponentData[];
}

const mockData: MockData = {
  "components": [
    {
      "id": "comp1",
      "name": "Navbar Component",
      "path": "/components/comp1.jsx",
      "type": "prebuilt",
      "content": {
        "title": "Card Title 1",
        "description": "This is the first component with some content",
        "size": "medium"
      }
    },
    {
      "id": "comp2",
      "name": "Hero Component",
      "path": "/components/comp2.jsx",
      "type": "prebuilt",
      "content": {
        "title": "Card Title 2",
        "description": "Second component with different content",
        "size": "large"
      }
    },
    {
      "id": "comp3",
      "name": "Hero Component",
      "path": "/components/comp2.jsx",
      "type": "prebuilt",
      "content": {
        "title": "Card Title 2",
        "description": "Second component with different content",
        "size": "large"
      }
    },
    {
      "id": "comp4",
      "name": "Hero Component",
      "path": "/components/comp2.jsx",
      "type": "prebuilt",
      "content": {
        "title": "Card Title 2",
        "description": "Second component with different content",
        "size": "large"
      }
    },
    {
      "id": "comp5",
      "name": "Hero Component",
      "path": "/components/comp2.jsx",
      "type": "prebuilt",
      "content": {
        "title": "Card Title 2",
        "description": "Second component with different content",
        "size": "large"
      }
    },
    {
      "id": "comp6",
      "name": "Hero Component",
      "path": "/components/comp2.jsx",
      "type": "prebuilt",
      "content": {
        "title": "Card Title 2",
        "description": "Second component with different content",
        "size": "large"
      }
    },
    {
      "id": "comp7",
      "name": "Hero Component",
      "path": "/components/comp2.jsx",
      "type": "prebuilt",
      "content": {
        "title": "Card Title 2",
        "description": "Second component with different content",
        "size": "large"
      }
    },
    {
      "id": "comp8",
      "name": "Hero Component",
      "path": "/components/comp2.jsx",
      "type": "prebuilt",
      "content": {
        "title": "Card Title 2",
        "description": "Second component with different content",
        "size": "large"
      }
    },
    {
      "id": "comp9",
      "name": "Hero Component",
      "path": "/components/comp2.jsx",
      "type": "prebuilt",
      "content": {
        "title": "Card Title 2",
        "description": "Second component with different content",
        "size": "large"
      }
    },
    {
      "id": "comp10",
      "name": "Hero Component",
      "path": "/components/comp2.jsx",
      "type": "prebuilt",
      "content": {
        "title": "Card Title 2",
        "description": "Second component with different content",
        "size": "large"
      }
    },
    {
      "id": "comp11",
      "name": "Hero Component",
      "path": "/components/comp2.jsx",
      "type": "prebuilt",
      "content": {
        "title": "Card Title 2",
        "description": "Second component with different content",
        "size": "large"
      }
    },
    {
      "id": "comp12",
      "name": "Hero Component",
      "path": "/components/comp2.jsx",
      "type": "prebuilt",
      "content": {
        "title": "Card Title 2",
        "description": "Second component with different content",
        "size": "large"
      }
    },
    {
      "id": "comp13",
      "name": "Hero Component",
      "path": "/components/comp2.jsx",
      "type": "prebuilt",
      "content": {
        "title": "Card Title 2",
        "description": "Second component with different content",
        "size": "large"
      }
    },
    {
      "id": "comp14",
      "name": "Hero Component",
      "path": "/components/comp2.jsx",
      "type": "prebuilt",
      "content": {
        "title": "Card Title 2",
        "description": "Second component with different content",
        "size": "large"
      }
    },
    {
      "id": "comp15",
      "name": "Hero Component",
      "path": "/components/comp2.jsx",
      "type": "prebuilt",
      "content": {
        "title": "Card Title 2",
        "description": "Second component with different content",
        "size": "large"
      }
    },
    {
      "id": "comp3",
      "name": "Component 3",
      "path": "/components/comp3.jsx",
      "type": "public",
      "content": {
        "title": "Public Component 1",
        "description": "This is a public component",
        "size": "small"
      }
    },
    {
      "id": "comp4",
      "name": "Component 4",
      "path": "/components/comp4.jsx",
      "type": "public",
      "content": {
        "title": "Public Component 2",
        "description": "Another public component with more content",
        "size": "medium"
      }
    }
  ]
};

// Define props interface for ComponentCard
interface ComponentCardProps {
  component: ComponentData;
  index: number;
}

// Component Card to display each JSON object
const ComponentCard: React.FC<ComponentCardProps> = ({ component, index }) => {
  return (
    <div 
      id={`card-container-${index}-${component.id}`}
      className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
      style={{
        width: '300px',
        height: '200px',
        position: 'relative'
      }}
    >
      <div 
        id={`card-inner-${index}-${component.id}`}
        className="w-full h-full p-4 overflow-auto"
      >
        <div id={`card-display-${index}-${component.id}`} className="mt-4 pt-3 border-t border-gray-100">
          <span id={`Card-display-${index}-${component.name}`} className="text-xs text-gray-400">
            {component.name}
          </span>
        </div>
      </div>
    </div>
  );
};

function Template() {
  const [activeTab, setActiveTab] = useState<'prebuilt' | 'public'>('prebuilt');
  
  // Filter components based on active tab
  const filteredComponents = mockData.components.filter(comp => comp.type === activeTab);

  return (
    <div id="template-root" className="w-screen h-screen bg-gray-50 overflow-hidden">
      {/* Navbar - Centered with fixed width */}
      <div id="navbar-wrapper" className="w-full flex justify-center">
        <div id="navbar-container" className="w-[250px] m-3 bg-white shadow-sm rounded-lg">
          <div id="navbar-inner" className="w-full">
            <div id="nav-tabs" className="flex justify-between">
              <button
                id="nav-tab-prebuilt"
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
                id="nav-tab-public"
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

      {/* Body with Cards */}
      <div id="body-container" className="w-full h-[calc(100vh-56px)] p-6 overflow-auto">
        <div id="content-wrapper" className="max-w-7xl mx-auto">
          {/* Active tab indicator */}
          <div id="active-tab-indicator" className="mb-6">
            <h2 id="tab-title" className="text-2xl font-bold text-gray-800 capitalize">
              {activeTab} Components
            </h2>
          </div>
          
          {/* Cards Grid */}
          <div 
            id="cards-grid-container"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filteredComponents.map((component, index) => (
              <ComponentCard 
                key={component.id} 
                component={component} 
                index={index}
              />
            ))}
            
            {filteredComponents.length === 0 && (
              <div id="no-components-message" className="col-span-full text-center py-12">
                <p id="no-components-text" className="text-gray-500 text-lg">
                  No {activeTab} components found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Template;