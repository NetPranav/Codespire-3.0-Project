// "use client";
// import React, { useState, useMemo, useRef, useEffect } from "react";
// import { Navbar_1, Navbar_2 } from "@/DataSet/Animation/Navbar/Navbars";
// import Footer from "@/DataSet/Animation/Footer/Footer_1";
// import { Hero_1 } from "@/DataSet/Animation/HeroSection/Heros";
// import Dashboard from "@/DataSet/Animation/Dashboard/Dashboard_1";
// import { CardGrid_1 } from "@/DataSet/Animation/CardGrid/Cards";
// import { ContactForm_1 } from "@/DataSet/Animation/ContactForm/ContactForms";
// import { Pricing_1 } from "@/DataSet/Animation/PricingTable/PricingTables";
// import { Forum_1 } from "@/DataSet/Animation/CommunityForum/CommunityForums";
// import { SocialFeed_1 } from "@/DataSet/Animation/SocialFeed/SocialFeeds";
// import { Weather_1 } from "@/DataSet/Animation/Weather/Weathers";
// import { MusicPlayer_1 } from "@/DataSet/Animation/Music/Musics";
// import { RecipeCard_1 } from "@/DataSet/Animation/Recipe/Recipe";
// import { CalendarWidget_1 } from "@/DataSet/Animation/Calendar/Calendar";

// // TypeScript interfaces
// interface ComponentContent {
//   title: string;
//   description: string;
//   size: string;
//   category: string;
//   likes: number;
//   downloads: number;
//   image: string;
//   component?: React.ReactNode; // <--- Add this optional property
// }

// interface ComponentData {
//   id: string;
//   name: string;
//   path: string;
//   type: "prebuilt" | "public";
//   content: ComponentContent;
// }

// interface MockData {
//   components: ComponentData[];
// }

// // Mock data with Pinterest-style images and metrics
// const mockData: MockData = {
//   components: [
//     // Inside mockData in template/page.tsx
//     {
//       id: "comp1",
//       name: "Modern Navbar",
//       path: "DataSet/Animation/Navbar/Navbar_1.tsx",
//       type: "prebuilt",
//       content: {
//         title: "Modern Navbar",
//         description: "Responsive navbar with dropdown menus",
//         size: "small",
//         category: "Navigation",
//         likes: 245,
//         downloads: 1890,
//         image:
//           "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop&auto=format",
//         component: (
//           // Simplified wrapper: Just ensures it takes full space
//           <div className="w-full h-full relative">
//             <Navbar_1 isPreview={true} />
//           </div>
//         ),
//       },
//     },
//     {
//       id: "comp2",
//       name: "Hero Section",
//       path: "/components/hero.jsx",
//       type: "prebuilt",
//       content: {
//         title: "Hero Banner",
//         description: "Full-width hero section with CTA",
//         size: "tall",
//         category: "Hero",
//         likes: 189,
//         downloads: 1245,
//         image:
//           "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=400&h=500&fit=crop&auto=format",
//         component: (
//           <div className="w-full h-full inset-0 absolute">
//             <Hero_1 isPreview={true} />
//           </div>
//         ),
//       },
//     },
//     {
//       id: "comp3",
//       name: "Card Grid",
//       path: "/components/card-grid.jsx",
//       type: "prebuilt",
//       content: {
//         title: "Product Cards",
//         description: "Responsive card grid layout",
//         size: "medium",
//         category: "Layout",
//         likes: 312,
//         downloads: 2100,
//         image:
//           "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w-400&h=350&fit=crop&auto=format",
//         component: (
//           <div className="w-full h-full inset-0 absolute">
//             <CardGrid_1 isPreview={true} />
//           </div>
//         ),
//       },
//     },
//     {
//       id: "comp4",
//       name: "Footer Component",
//       path: "/components/footer.jsx",
//       type: "prebuilt",
//       content: {
//         title: "Site Footer",
//         description: "Multi-column footer with links",
//         size: "medium",
//         category: "Navigation",
//         likes: 156,
//         downloads: 980,
//         image:
//           "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop&auto=format",
//         component: (
//           <div className="w-full h-full inset-0 absolute">
//             <Footer isPreview={true} />
//           </div>
//         ),
//       },
//     },
//     {
//       id: "comp5",
//       name: "Modern Navbar",
//       path: "/components/testimonials.jsx",
//       type: "prebuilt",
//       content: {
//         title: "Modern Navbar",
//         description: "Responsive navbar with dropdown menus",
//         size: "small",
//         category: "Navigation",
//         likes: 278,
//         downloads: 1670,
//         image:
//           "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=450&fit=crop&auto=format",
//         component: (
//           <div className="w-full h-full inset-0 absolute">
//             <Navbar_2 isPreview={true} />
//           </div>
//         ),
//       },
//     },
//     {
//       id: "comp6",
//       name: "Contact Form",
//       path: "/components/contact-form.jsx",
//       type: "prebuilt",
//       content: {
//         title: "Get in Touch",
//         description: "Validated contact form with submission",
//         size: "small",
//         category: "Forms",
//         likes: 198,
//         downloads: 1320,
//         image:
//           "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=280&fit=crop&auto=format",
//         component: (
//           <div className="w-full h-full inset-0 absolute">
//             <ContactForm_1 isPreview={true} />
//           </div>
//         ),
//       },
//     },
//     {
//       id: "comp7",
//       name: "Pricing Table",
//       path: "/components/pricing.jsx",
//       type: "prebuilt",
//       content: {
//         title: "Plans & Pricing",
//         description: "Interactive pricing comparison table",
//         size: "tall",
//         category: "Pricing",
//         likes: 324,
//         downloads: 1980,
//         image:
//           "https://images.unsplash.com/photo-1557821552-17105176677c?w=400&h-480&fit=crop&auto=format",
//         component: (
//           <div className="w-full h-full inset-0 absolute">
//             <Pricing_1 isPreview={true} />
//           </div>
//         ),
//       },
//     },
//     {
//       id: "comp8",
//       name: "Dashboard",
//       path: "/components/stats.jsx",
//       type: "prebuilt",
//       content: {
//         title: "Analytics Cards",
//         description: "Dashboard widgets for metrics",
//         size: "small", // or "medium"
//         category: "Dashboard",
//         likes: 421,
//         downloads: 2450,
//         image:
//           "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w-400&h=260&fit=crop&auto=format",

//         // ADD DASHBOARD COMPONENT HERE
//         component: (
//           <div className="absolute inset-0 w-full h-full">
//             <Dashboard isPreview={true} />
//           </div>
//         ),
//       },
//     },
//     {
//       id: "pub1",
//       name: "Community Forum",
//       path: "/community/forum-card.jsx",
//       type: "public",
//       content: {
//         title: "Discussion Card",
//         description: "Forum thread card with voting",
//         size: "medium",
//         category: "Community",
//         likes: 567,
//         downloads: 3120,
//         image:
//           "https://images.unsplash.com/photo-1561070791-2526d30994b5?w-400&h=320&fit=crop&auto=format",
//         component: (
//           <div className="absolute inset-0 w-full h-full">
//             <Forum_1 isPreview={true} />
//           </div>
//         ),
//       },
//     },
//     {
//       id: "pub2",
//       name: "Social Feed",
//       path: "/community/social-feed.jsx",
//       type: "public",
//       content: {
//         title: "Post Component",
//         description: "Social media styled feed item",
//         size: "tall",
//         category: "Social",
//         likes: 489,
//         downloads: 2780,
//         image:
//           "https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?w-400&h=460&fit=crop&auto=format",
//         component: (
//           <div className="absolute inset-0 w-full h-full">
//             <SocialFeed_1 isPreview={true} />
//           </div>
//         ),
//       },
//     },
//     {
//       id: "pub3",
//       name: "Weather Widget",
//       path: "/community/weather.jsx",
//       type: "public",
//       content: {
//         title: "Weather Forecast",
//         description: "Local weather display component",
//         size: "small",
//         category: "Widget",
//         likes: 345,
//         downloads: 1890,
//         image:
//           "https://images.unsplash.com/photo-1592210454359-9043f067919b?w-400&h=240&fit=crop&auto=format",
//         component: (
//           <div className="absolute inset-0 w-full h-full">
//             <Weather_1 isPreview={true} />
//           </div>
//         ),
//       },
//     },
//     {
//       id: "pub4",
//       name: "Music Player",
//       path: "/community/music-player.jsx",
//       type: "public",
//       content: {
//         title: "Audio Player",
//         description: "Custom styled audio player",
//         size: "medium",
//         category: "Media",
//         likes: 512,
//         downloads: 2980,
//         image:
//           "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w-400&h=340&fit=crop&auto=format",
//         component: (
//           <div className="absolute inset-0 w-full h-full">
//             <MusicPlayer_1 isPreview={true} />
//           </div>
//         ),
//       },
//     },
//     {
//       id: "pub5",
//       name: "Recipe Card",
//       path: "/community/recipe-card.jsx",
//       type: "public",
//       content: {
//         title: "Recipe Display",
//         description: "Beautiful recipe card with ingredients",
//         size: "tall",
//         category: "Food",
//         likes: 432,
//         downloads: 2560,
//         image:
//           "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=520&fit=crop&auto=format",
//         component: (
//           <div className="absolute inset-0 w-full h-full">
//             <RecipeCard_1 isPreview={true} />
//           </div>
//         ),
//       },
//     },
//     {
//       id: "pub6",
//       name: "Calendar Widget",
//       path: "/community/calendar.jsx",
//       type: "public",
//       content: {
//         title: "Event Calendar",
//         description: "Interactive calendar component",
//         size: "medium",
//         category: "Productivity",
//         likes: 298,
//         downloads: 1670,
//         image:
//           "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w-400&h=380&fit=crop&auto=format",
//         component: (
//           <div className="absolute inset-0 w-full h-full">
//             <CalendarWidget_1 isPreview={true} />
//           </div>
//         ),
//       },
//     },
//   ],
// };

// // Define props interface for ComponentCard
// interface ComponentCardProps {
//   component: ComponentData;
// }

// // Component Card with Live Preview Support
// // const ComponentCard: React.FC<ComponentCardProps> = ({ component }) => {
// //   return (
// //     <div className="break-inside-avoid mb-6 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white group cursor-pointer border border-gray-100">
// //       {/* Media Container */}
// //       <div
// //         className="relative overflow-hidden bg-gray-50"
// //         style={{ minHeight: "200px" }}
// //       >
// //         {/* LOGIC: Render Component if available, else render Image */}
// //         {component.content.component ? (
// //           // Live Component Container
// //           <div className="w-full h-full min-h-[220px] relative overflow-hidden bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
// //             {/* We don't need extra scaling wrappers here anymore
// //          because the Navbar handles its own 200% width internal logic.
// //       */}
// //             {component.content.component}
// //           </div>
// //         ) : (
// //           // Fallback Image
// //           <img
// //             src={component.content.image}
// //             alt={component.content.title}
// //             className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
// //             loading="lazy"
// //           />
// //         )}

// //         {/* Type Badge - Stays on top of both Image and Component */}
// //         <div
// //           className={`absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-semibold z-20 ${
// //             component.type === "prebuilt"
// //               ? "bg-teal-500 text-white"
// //               : "bg-blue-500 text-white"
// //           }`}
// //         >
// //           {component.type}
// //         </div>
// //       </div>

// //       {/* Card Content (unchanged) */}
// //       <div className="p-4">
// //         <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">
// //           {component.name}
// //         </h3>

// //         <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">
// //           {component.content.category}
// //         </p>

// //         <div className="flex items-center justify-between border-t border-gray-100 pt-3">
// //           <div className="flex items-center space-x-1">
// //             <svg
// //               className="w-4 h-4 text-red-500"
// //               fill="currentColor"
// //               viewBox="0 0 20 20"
// //             >
// //               <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
// //             </svg>
// //             <span className="font-bold text-gray-900">
// //               {component.content.likes.toLocaleString()}
// //             </span>
// //           </div>

// //           <div className="flex items-center space-x-1">
// //             <svg
// //               className="w-4 h-4 text-blue-500"
// //               fill="none"
// //               stroke="currentColor"
// //               viewBox="0 0 24 24"
// //             >
// //               <path
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 strokeWidth={2}
// //                 d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
// //               />
// //             </svg>
// //             <span className="font-bold text-gray-900">
// //               {component.content.downloads.toLocaleString()}
// //             </span>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };
// // Component Card with Live Preview Support
// const ComponentCard: React.FC<ComponentCardProps> = ({ component }) => {
//   return (
//     <div className="break-inside-avoid mb-6 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white group cursor-pointer border border-gray-100">
//       {/* Media Container */}
//       <div
//         className="relative overflow-hidden bg-gray-50"
//         style={{ minHeight: "200px" }}
//       >
//         {/* LOGIC: Render Component if available, else render Image */}
//         {component.content.component ? (
//           // Live Component Container
//           <div className="w-full h-full min-h-[220px] relative overflow-hidden bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
//             {/* We don't need extra scaling wrappers here anymore 
//          because the Navbar handles its own 200% width internal logic.
//       */}
//             {component.content.component}
//           </div>
//         ) : (
//           // Fallback Image
//           <img
//             src={component.content.image}
//             alt={component.content.title}
//             className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
//             loading="lazy"
//           />
//         )}

//         {/* Type Badge - Stays on top of both Image and Component */}
//         <div
//           className={`absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-semibold z-20 ${
//             component.type === "prebuilt"
//               ? "bg-teal-500 text-white"
//               : "bg-blue-500 text-white"
//           }`}
//         >
//           {component.type}
//         </div>
//       </div>

//       {/* Card Content (unchanged) */}
//       <div className="p-4">
//         <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">
//           {component.name}
//         </h3>

//         <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider">
//           {component.content.category}
//         </p>

//         <div className="flex items-center justify-between border-t border-gray-100 pt-3">
//           <div className="flex items-center space-x-1">
//             <svg
//               className="w-4 h-4 text-red-500"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
//             </svg>
//             <span className="font-bold text-gray-900">
//               {component.content.likes.toLocaleString()}
//             </span>
//           </div>

//           <div className="flex items-center space-x-1">
//             <svg
//               className="w-4 h-4 text-blue-500"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
//               />
//             </svg>
//             <span className="font-bold text-gray-900">
//               {component.content.downloads.toLocaleString()}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Floating Search Button Component
// const FloatingSearch = ({
//   isOpen,
//   onToggle,
//   searchQuery,
//   onSearchChange,
//   onClearSearch,
// }: {
//   isOpen: boolean;
//   onToggle: () => void;
//   searchQuery: string;
//   onSearchChange: (value: string) => void;
//   onClearSearch: () => void;
// }) => {
//   const inputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     if (isOpen && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [isOpen]);

//   return (
//     <>
//       {/* Floating Search Button */}
//       <button
//         onClick={onToggle}
//         className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
//       >
//         {isOpen ? (
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         ) : (
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//             />
//           </svg>
//         )}
//       </button>

//       {/* Search Overlay */}
//       {isOpen && (
//         <div className="fixed inset-0 z-40">
//           {/* Backdrop */}
//           <div
//             className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//             onClick={onToggle}
//           />

//           {/* Search Panel */}
//           <div className="absolute bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl p-6 animate-slideUp">
//             <h3 className="text-lg font-bold text-gray-800 mb-4">
//               Search Components
//             </h3>
//             <div className="relative">
//               <input
//                 ref={inputRef}
//                 type="text"
//                 placeholder="Search by name or category..."
//                 value={searchQuery}
//                 onChange={(e) => onSearchChange(e.target.value)}
//                 className="w-full px-4 py-3 pl-10 pr-10 text-gray-800 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//               <div className="absolute left-3 top-3.5 text-gray-400">
//                 <svg
//                   className="w-5 h-5"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                   />
//                 </svg>
//               </div>
//               {searchQuery && (
//                 <button
//                   onClick={onClearSearch}
//                   className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
//                 >
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 </button>
//               )}
//             </div>

//             {/* Quick Categories */}
//             <div className="mt-4">
//               <p className="text-sm text-gray-600 mb-2">Quick categories:</p>
//               <div className="flex flex-wrap gap-2">
//                 {[
//                   "Navigation",
//                   "Hero",
//                   "Forms",
//                   "Dashboard",
//                   "Social",
//                   "Media",
//                 ].map((cat) => (
//                   <button
//                     key={cat}
//                     onClick={() => onSearchChange(cat)}
//                     className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
//                   >
//                     {cat}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// function Template() {
//   const [activeTab, setActiveTab] = useState<"prebuilt" | "public">("prebuilt");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showSearch, setShowSearch] = useState(false);

//   // Filter components with useMemo
//   const filteredComponents = useMemo(() => {
//     return mockData.components.filter((comp) => {
//       const matchesTab = comp.type === activeTab;
//       const matchesSearch =
//         searchQuery === "" ||
//         comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         comp.content.category.toLowerCase().includes(searchQuery.toLowerCase());

//       return matchesTab && matchesSearch;
//     });
//   }, [activeTab, searchQuery]);

//   // Handle search
//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//   };

//   // Clear search
//   const clearSearch = () => {
//     setSearchQuery("");
//   };
//   // Get column distribution for Pinterest-style masonry layout
//   const getColumns = () => {
//     const columns = [[], [], [], []] as ComponentData[][];
//     filteredComponents.forEach((component, index) => {
//       columns[index % 4].push(component);
//     });
//     return columns;
//   };

//   const columns = getColumns();

//   return (
//     <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100">
//       {/* Navbar - Keep the original style */}
//       <div id="navbar-wrapper" className="w-full flex justify-center pt-4">
//         <div
//           id="navbar-container"
//           className="w-[250px] bg-white shadow-sm rounded-lg"
//         >
//           <div id="navbar-inner" className="w-full">
//             <div id="nav-tabs" className="flex justify-between">
//               <button
//                 onClick={() => setActiveTab("prebuilt")}
//                 className={`flex-1 py-3 text-sm font-medium transition-colors rounded-l-lg ${
//                   activeTab === "prebuilt"
//                     ? "bg-white text-gray-900 border border-gray-200"
//                     : "text-gray-500 hover:text-gray-700 bg-gray-50"
//                 }`}
//               >
//                 Prebuilt
//               </button>
//               <button
//                 onClick={() => setActiveTab("public")}
//                 className={`flex-1 py-3 text-sm font-medium transition-colors rounded-r-lg ${
//                   activeTab === "public"
//                     ? "bg-white text-gray-900 border border-gray-200"
//                     : "text-gray-500 hover:text-gray-700 bg-gray-50"
//                 }`}
//               >
//                 Public
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Body with Pinterest-style masonry layout */}
//       <div className="px-4 sm:px-6 lg:px-8 py-8">
//         {/* Active tab indicator */}
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-800 capitalize mb-2">
//             {activeTab} Components
//           </h2>
//           <p className="text-gray-600">
//             {filteredComponents.length} components available
//           </p>
//         </div>

//         {/* Cards Grid - Pinterest Masonry Layout */}
//         {filteredComponents.length > 0 ? (
//           <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
//             {filteredComponents.map((component) => (
//               <ComponentCard key={component.id} component={component} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-16">
//             <div className="mx-auto w-24 h-24 text-gray-300 mb-4">
//               <svg
//                 className="w-full h-full"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={1.5}
//                   d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//             </div>
//             <h3 className="text-xl font-semibold text-gray-700 mb-2">
//               No components found
//             </h3>
//             <p className="text-gray-500 max-w-md mx-auto">
//               {searchQuery
//                 ? `No components match "${searchQuery}". Try a different search term.`
//                 : `There are no ${activeTab} components available at the moment.`}
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Floating Search Button */}
//       <FloatingSearch
//         isOpen={showSearch}
//         onToggle={() => setShowSearch(!showSearch)}
//         searchQuery={searchQuery}
//         onSearchChange={handleSearch}
//         onClearSearch={clearSearch}
//       />

//       {/* Custom CSS for Pinterest layout and animations */}
//       <style jsx global>{`
//         @keyframes slideUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-slideUp {
//           animation: slideUp 0.3s ease-out;
//         }

//         /* Ensure proper masonry layout */
//         .break-inside-avoid {
//           break-inside: avoid;
//         }

//         /* Smooth image loading */
//         img {
//           transition: transform 0.3s ease;
//         }

//         /* Custom scrollbar */
//         ::-webkit-scrollbar {
//           width: 8px;
//         }

//         ::-webkit-scrollbar-track {
//           background: #f1f1f1;
//         }

//         ::-webkit-scrollbar-thumb {
//           background: #888;
//           border-radius: 4px;
//         }

//         ::-webkit-scrollbar-thumb:hover {
//           background: #555;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default Template;































// This is Perfect Desighn 
// "use client";
// import React, { useState, useMemo, useRef, useEffect } from "react";
// import { 
//   Download, Heart, X, Search, ChevronRight, Grid, Layout, Layers 
// } from "lucide-react";

// // --- Import your actual components here ---
// // (Keeping your original imports)
// import { Navbar_1, Navbar_2 } from "@/DataSet/Animation/Navbar/Navbars";
// import Footer from "@/DataSet/Animation/Footer/Footer_1";
// import { Hero_1 } from "@/DataSet/Animation/HeroSection/Heros";
// import Dashboard from "@/DataSet/Animation/Dashboard/Dashboard_1";
// import { CardGrid_1 } from "@/DataSet/Animation/CardGrid/Cards";
// import { ContactForm_1 } from "@/DataSet/Animation/ContactForm/ContactForms";
// import { Pricing_1 } from "@/DataSet/Animation/PricingTable/PricingTables";
// import { Forum_1 } from "@/DataSet/Animation/CommunityForum/CommunityForums";
// import { SocialFeed_1 } from "@/DataSet/Animation/SocialFeed/SocialFeeds";
// import { Weather_1 } from "@/DataSet/Animation/Weather/Weathers";
// import { MusicPlayer_1 } from "@/DataSet/Animation/Music/Musics";
// import { RecipeCard_1 } from "@/DataSet/Animation/Recipe/Recipe";
// import { CalendarWidget_1 } from "@/DataSet/Animation/Calendar/Calendar";

// // --- Types ---
// interface ComponentContent {
//   title: string;
//   description: string;
//   // 'small' = Navbar style (short height), 'medium' = Box, 'tall' = Vertical
//   size: "small" | "medium" | "tall"; 
//   category: string;
//   likes: number;
//   downloads: number;
//   image: string;
//   component?: React.ReactNode;
// }

// interface ComponentData {
//   id: string;
//   name: string;
//   path: string; // This path is sent to API for download
//   type: "prebuilt" | "public";
//   content: ComponentContent;
// }

// // --- Mock Data ---
// const mockData: { components: ComponentData[] } = {
//   components: [
//     {
//       id: "comp1",
//       name: "Modern Navbar",
//       path: "DataSet/Animation/Navbar/Navbars.tsx", // Ensure this path exists on disk
//       type: "prebuilt",
//       content: {
//         title: "Modern Navbar",
//         description: "Responsive navbar with dropdown menus",
//         size: "small",
//         category: "Navigation",
//         likes: 245,
//         downloads: 1890,
//         image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=400",
//         component: <Navbar_1 isPreview={true} />,
//       },
//     },
//     {
//       id: "comp2",
//       name: "Hero Section",
//       path: "DataSet/Animation/HeroSection/Heros.tsx",
//       type: "prebuilt",
//       content: {
//         title: "Hero Banner",
//         description: "Full-width hero section with CTA",
//         size: "medium",
//         category: "Hero",
//         likes: 189,
//         downloads: 1245,
//         image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?auto=format&fit=crop&w=400",
//         component: <Hero_1 isPreview={true} />,
//       },
//     },
//     {
//       id: "comp3",
//       name: "Card Grid",
//       path: "DataSet/Animation/CardGrid/Cards.tsx",
//       type: "prebuilt",
//       content: {
//         title: "Product Cards",
//         description: "Responsive card grid layout",
//         size: "tall",
//         category: "Layout",
//         likes: 312,
//         downloads: 2100,
//         image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400",
//         component: <CardGrid_1 isPreview={true} />,
//       },
//     },
//     {
//       id: "comp4",
//       name: "Footer",
//       path: "DataSet/Animation/Footer/Footer_1.tsx",
//       type: "prebuilt",
//       content: {
//         title: "Site Footer",
//         description: "Multi-column footer with links",
//         size: "small",
//         category: "Navigation",
//         likes: 156,
//         downloads: 980,
//         image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=400",
//         component: <Footer isPreview={true} />,
//       },
//     },
//     {
//       id: "pub1",
//       name: "Community Forum",
//       path: "DataSet/Animation/CommunityForum/CommunityForums.tsx",
//       type: "public",
//       content: {
//         title: "Discussion Card",
//         description: "Forum thread card with voting",
//         size: "medium",
//         category: "Community",
//         likes: 567,
//         downloads: 3120,
//         image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400",
//         component: <Forum_1 isPreview={true} />,
//       },
//     },
//     {
//       id: "pub2",
//       name: "Music Player",
//       path: "DataSet/Animation/Music/Musics.tsx",
//       type: "public",
//       content: {
//         title: "Audio Player",
//         description: "Custom styled audio player",
//         size: "small",
//         category: "Media",
//         likes: 512,
//         downloads: 2980,
//         image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400",
//         component: <MusicPlayer_1 isPreview={true} />,
//       },
//     },
//     {
//         id: "pub3",
//         name: "Calendar",
//         path: "DataSet/Animation/Calendar/Calendar.tsx",
//         type: "public",
//         content: {
//           title: "Calendar Widget",
//           description: "Interactive Calendar",
//           size: "medium",
//           category: "Utility",
//           likes: 512,
//           downloads: 2980,
//           image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400",
//           component: <CalendarWidget_1 isPreview={true} />,
//         },
//       },
//   ],
// };

// // --- Helper Functions ---

// const handleDownload = async (path: string, fileName: string) => {
//   try {
//     // Call our updated API with the path query param
//     const response = await fetch(`/api/download-comp?path=${encodeURIComponent(path)}`);
    
//     if (!response.ok) {
//         alert("File not found on server or path incorrect.");
//         return;
//     }

//     const blob = await response.blob();
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = fileName; // Force the filename
//     document.body.appendChild(a);
//     a.click();
//     window.URL.revokeObjectURL(url);
//     document.body.removeChild(a);
//   } catch (err) {
//     console.error("Download failed", err);
//     alert("Failed to download component.");
//   }
// };


// // --- Sub-Components ---

// // 1. Modal Component (For Public Tab)
// const ComponentModal = ({ 
//   component, 
//   onClose 
// }: { 
//   component: ComponentData; 
//   onClose: () => void 
// }) => {
//   if (!component) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       {/* Backdrop */}
//       <div 
//         className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
//         onClick={onClose}
//       />
      
//       {/* Modal Content */}
//       <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
//         <button 
//           onClick={onClose}
//           className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full text-gray-500 hover:text-red-500 transition-colors"
//         >
//           <X size={20} />
//         </button>

//         <div className="flex flex-col lg:flex-row h-[80vh] lg:h-[600px]">
//           {/* Left: Preview */}
//           <div className="w-full lg:w-2/3 bg-gray-50 flex items-center justify-center p-8 border-r border-gray-100 overflow-hidden relative">
//              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />
//              <div className="relative w-full h-full flex items-center justify-center scale-90">
//                 {/* Render the full interactive component here */}
//                 {component.content.component}
//              </div>
//           </div>

//           {/* Right: Details */}
//           <div className="w-full lg:w-1/3 p-8 flex flex-col bg-white">
//             <div className="mb-auto">
//               <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-4">
//                 {component.content.category}
//               </span>
//               <h2 className="text-3xl font-bold text-gray-900 mb-2">{component.name}</h2>
//               <p className="text-gray-500 leading-relaxed mb-6">
//                 {component.content.description}
//               </p>
              
//               <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
//                 <div className="flex items-center gap-2">
//                   <Heart className="text-red-500 fill-red-500" size={18} />
//                   <span className="font-semibold text-gray-900">{component.content.likes}</span> Likes
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Download className="text-blue-500" size={18} />
//                   <span className="font-semibold text-gray-900">{component.content.downloads}</span> Downloads
//                 </div>
//               </div>
//             </div>

//             <button 
//               onClick={() => handleDownload(component.path, `${component.name.replace(/\s+/g, '_')}.tsx`)}
//               className="w-full py-4 bg-gray-900 hover:bg-black text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95"
//             >
//               <Download size={20} />
//               Download Code
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // 2. Component Card
// const ComponentCard = ({ 
//   component, 
//   onClick 
// }: { 
//   component: ComponentData; 
//   onClick: () => void;
// }) => {
//   // Height Logic: 
//   // - Small (Navbars): Short fixed height (e.g., 180px) but wide component render.
//   // - Medium: Square-ish.
//   // - Tall: Tall vertical.
  
//   const heightClass = {
//     small: "h-[180px]",
//     medium: "h-[300px]",
//     tall: "h-[450px]"
//   }[component.content.size];

//   return (
//     <div 
//       onClick={onClick}
//       className="break-inside-avoid mb-6 group cursor-pointer relative"
//     >
//       <div className={`relative w-full ${heightClass} bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
        
//         {/* Component Preview Area */}
//         {/* We use a scaling hack to ensure large components (like Navbars) look "Full Sized" inside the small preview window */}
//         <div className="absolute inset-0 bg-gray-50 overflow-hidden flex items-center justify-center">
//             {component.content.component ? (
//                  <div className="w-[200%] h-[200%] origin-center transform scale-[0.5] flex items-center justify-center pointer-events-none">
//                     {/* The pointer-events-none prevents interaction on the card preview, so clicking opens modal/download */}
//                     {component.content.component}
//                  </div>
//             ) : (
//                 <img src={component.content.image} className="w-full h-full object-cover" />
//             )}
//         </div>

//         {/* Hover Overlay */}
//         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

//         {/* Info Badge (Appears on Hover) */}
//         <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm border-t border-gray-100 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
//           <div className="flex justify-between items-center">
//             <div>
//               <h3 className="font-bold text-gray-900 text-sm">{component.name}</h3>
//               <p className="text-xs text-gray-500">{component.content.category}</p>
//             </div>
//             {component.type === 'prebuilt' ? (
//                 <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center">
//                     <Download size={14} />
//                 </div>
//             ) : (
//                 <div className="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-900 flex items-center justify-center">
//                     <ChevronRight size={14} />
//                 </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


// // --- Main Page ---
// function Template() {
//   const [activeTab, setActiveTab] = useState<"prebuilt" | "public">("prebuilt");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedComponent, setSelectedComponent] = useState<ComponentData | null>(null);

//   // Filter Data
//   const filteredComponents = useMemo(() => {
//     return mockData.components.filter((comp) => {
//       const matchesTab = comp.type === activeTab;
//       const matchesSearch =
//         searchQuery === "" ||
//         comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         comp.content.category.toLowerCase().includes(searchQuery.toLowerCase());
//       return matchesTab && matchesSearch;
//     });
//   }, [activeTab, searchQuery]);

//   // Handle Card Interaction
//   const handleCardClick = (component: ComponentData) => {
//     if (component.type === "prebuilt") {
//       // Direct Download for Prebuilt
//       handleDownload(component.path, `${component.name.replace(/\s+/g, '_')}.tsx`);
//     } else {
//       // Open Modal for Public
//       setSelectedComponent(component);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-gray-100">
      
//       {/* 1. Header & Navigation */}
//       <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex items-center justify-between h-20">
//                 {/* Logo Area */}
//                 <div className="flex items-center gap-2">
//                     <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">
//                         <Grid size={18} />
//                     </div>
//                     <span className="text-xl font-bold tracking-tight">LazyLibrary</span>
//                 </div>

//                 {/* Tab Switcher */}
//                 <div className="hidden md:flex bg-gray-100 p-1 rounded-xl">
//                     <button
//                         onClick={() => setActiveTab("prebuilt")}
//                         className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
//                             activeTab === "prebuilt" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
//                         }`}
//                     >
//                         Prebuilt Collection
//                     </button>
//                     <button
//                         onClick={() => setActiveTab("public")}
//                         className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
//                             activeTab === "public" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
//                         }`}
//                     >
//                         Public Creations
//                     </button>
//                 </div>

//                 {/* Search Bar */}
//                 <div className="relative hidden sm:block w-64">
//                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
//                     <input 
//                         type="text" 
//                         placeholder="Search components..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300 transition-all"
//                     />
//                 </div>
//             </div>
//         </div>
//       </div>

//       {/* 2. Main Content */}
//       <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
//         {/* Stats / Intro */}
//         <div className="mb-10 flex items-end justify-between">
//             <div>
//                 <h1 className="text-3xl font-extrabold text-gray-900 mb-2 capitalize">{activeTab} Components</h1>
//                 <p className="text-gray-500">
//                     {filteredComponents.length} high-quality React components ready to drop in.
//                 </p>
//             </div>
//             <div className="hidden sm:flex gap-4 text-sm text-gray-500">
//                 <span className="flex items-center gap-1"><Layers size={14} /> Masonry Layout</span>
//                 <span className="flex items-center gap-1"><Layout size={14} /> Responsive</span>
//             </div>
//         </div>

//         {/* Grid Area */}
//         {filteredComponents.length > 0 ? (
//             <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 pb-20">
//                 {filteredComponents.map((component) => (
//                     <ComponentCard 
//                         key={component.id} 
//                         component={component} 
//                         onClick={() => handleCardClick(component)}
//                     />
//                 ))}
//             </div>
//         ) : (
//             <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
//                 <Search className="text-gray-300 mb-4" size={48} />
//                 <p className="text-gray-500 font-medium">No components found matching "{searchQuery}"</p>
//                 <button onClick={() => setSearchQuery("")} className="mt-4 text-blue-600 hover:underline text-sm">Clear search</button>
//             </div>
//         )}
//       </main>

//       {/* 3. Modal for Public Components */}
//       {selectedComponent && (
//         <ComponentModal 
//             component={selectedComponent} 
//             onClose={() => setSelectedComponent(null)} 
//         />
//       )}

//       {/* Mobile Sticky Tab (if needed) */}
//       <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md shadow-xl border border-gray-200 p-1 rounded-full flex gap-1 z-30">
//         <button 
//             onClick={() => setActiveTab("prebuilt")}
//             className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${activeTab === 'prebuilt' ? 'bg-black text-white' : 'text-gray-500'}`}
//         >
//             Prebuilt
//         </button>
//         <button 
//             onClick={() => setActiveTab("public")}
//             className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${activeTab === 'public' ? 'bg-black text-white' : 'text-gray-500'}`}
//         >
//             Public
//         </button>
//       </div>

//     </div>
//   );
// }

// export default Template;









































"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { 
  Download, Heart, X, Search, ChevronRight, Grid, Layout, Layers,
  Filter, Star, Calendar, Music, Navigation, Code,
  ExternalLink, Copy, Check, Zap, TrendingUp, Clock, Eye, Menu,
  Maximize2, Minimize2, Sparkles, BookOpen, Users, Github, Package, Film
} from "lucide-react";

// --- Import your actual components here ---
import { Navbar_1 } from "@/DataSet/Animation/Navbar/Navbars";
import { Hero_1 } from "@/DataSet/Animation/HeroSection/Heros";
import { CardGrid_1 } from "@/DataSet/Animation/CardGrid/Cards";
import Footer from "@/DataSet/Animation/Footer/Footer_1";
import { Forum_1 } from "@/DataSet/Animation/CommunityForum/CommunityForums";
import { MusicPlayer_1 } from "@/DataSet/Animation/Music/Musics";
import { CalendarWidget_1 } from "@/DataSet/Animation/Calendar/Calendar";

// --- Types ---
interface ComponentContent {
  title: string;
  description: string;
  size: "small" | "medium" | "tall";
  category: string;
  likes: number;
  downloads: number;
  image: string;
  tags: string[];
  framework: "react" | "next" | "vue" | "svelte";
  lastUpdated: string;
  complexity: "simple" | "intermediate" | "advanced";
  component?: React.ReactNode;
}

interface ComponentData {
  id: string;
  name: string;
  path: string;
  type: "prebuilt" | "community";
  featured?: boolean;
  trending?: boolean;
  new?: boolean;
  content: ComponentContent;
}

// --- Category Icons Mapping ---
const categoryIcons: Record<string, React.ReactNode> = {
  "Navigation": <Navigation size={16} />,
  "Hero": <Zap size={16} />,
  "Layout": <Layout size={16} />,
  "Community": <Users size={16} />,
  "Media": <Film size={16} />,
  "Utility": <Package size={16} />,
  "Dashboard": <TrendingUp size={16} />,
  "Form": <Code size={16} />,
};

// --- Mock Data with Enhanced Details ---
const mockData: { components: ComponentData[] } = {
  components: [
    {
      id: "comp1",
      name: "Modern Navbar",
      path: "DataSet/Animation/Navbar/Navbars.tsx",
      type: "prebuilt",
      featured: true,
      trending: true,
      content: {
        title: "Modern Navbar",
        description: "Responsive navbar with dropdown menus and dark mode toggle",
        size: "small",
        category: "Navigation",
        likes: 245,
        downloads: 1890,
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=400",
        tags: ["responsive", "dark-mode", "mobile-friendly"],
        framework: "react",
        lastUpdated: "2024-01-15",
        complexity: "simple",
        component: <Navbar_1 isPreview={true} />,
      },
    },
    {
      id: "comp2",
      name: "Hero Section",
      path: "DataSet/Animation/HeroSection/Heros.tsx",
      type: "prebuilt",
      featured: true,
      content: {
        title: "Hero Banner",
        description: "Full-width hero section with animated CTA and gradient background",
        size: "medium",
        category: "Hero",
        likes: 189,
        downloads: 1245,
        image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?auto=format&fit=crop&w=400",
        tags: ["animated", "gradient", "full-width"],
        framework: "next",
        lastUpdated: "2024-01-10",
        complexity: "intermediate",
        component: <Hero_1 isPreview={true} />,
      },
    },
    {
      id: "comp3",
      name: "Card Grid",
      path: "DataSet/Animation/CardGrid/Cards.tsx",
      type: "prebuilt",
      trending: true,
      content: {
        title: "Product Cards",
        description: "Responsive card grid with hover effects and skeleton loading",
        size: "tall",
        category: "Layout",
        likes: 312,
        downloads: 2100,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400",
        tags: ["grid", "hover-effects", "skeleton"],
        framework: "react",
        lastUpdated: "2024-01-12",
        complexity: "intermediate",
        component: <CardGrid_1 isPreview={true} />,
      },
    },
    {
      id: "comp4",
      name: "Site Footer",
      path: "DataSet/Animation/Footer/Footer_1.tsx",
      type: "prebuilt",
      new: true,
      content: {
        title: "Site Footer",
        description: "Multi-column footer with social links and newsletter signup",
        size: "small",
        category: "Navigation",
        likes: 156,
        downloads: 980,
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=400",
        tags: ["social", "newsletter", "responsive"],
        framework: "react",
        lastUpdated: "2024-01-18",
        complexity: "simple",
        component: <Footer isPreview={true} />,
      },
    },
    {
      id: "pub1",
      name: "Community Forum",
      path: "DataSet/Animation/CommunityForum/CommunityForums.tsx",
      type: "community",
      featured: true,
      content: {
        title: "Discussion Card",
        description: "Forum thread card with voting, comments, and user avatars",
        size: "medium",
        category: "Community",
        likes: 567,
        downloads: 3120,
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400",
        tags: ["forum", "voting", "interactive"],
        framework: "next",
        lastUpdated: "2024-01-14",
        complexity: "advanced",
        component: <Forum_1 isPreview={true} />,
      },
    },
    {
      id: "pub2",
      name: "Music Player",
      path: "DataSet/Animation/Music/Musics.tsx",
      type: "community",
      trending: true,
      content: {
        title: "Audio Player",
        description: "Custom styled audio player with playlist and visualizer",
        size: "small",
        category: "Media",
        likes: 512,
        downloads: 2980,
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=400",
        tags: ["audio", "playlist", "visualizer"],
        framework: "react",
        lastUpdated: "2024-01-16",
        complexity: "advanced",
        component: <MusicPlayer_1 isPreview={true} />,
      },
    },
    {
      id: "pub3",
      name: "Calendar Widget",
      path: "DataSet/Animation/Calendar/Calendar.tsx",
      type: "community",
      new: true,
      content: {
        title: "Calendar Widget",
        description: "Interactive calendar with event management and drag & drop",
        size: "medium",
        category: "Utility",
        likes: 289,
        downloads: 1560,
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=400",
        tags: ["calendar", "events", "interactive"],
        framework: "react",
        lastUpdated: "2024-01-20",
        complexity: "intermediate",
        component: <CalendarWidget_1 isPreview={true} />,
      },
    },
  ],
};

// --- Helper Functions ---
const handleDownload = async (path: string, fileName: string) => {
  try {
    const response = await fetch(`/api/download-comp?path=${encodeURIComponent(path)}`);
    
    if (!response.ok) {
      alert("File not found on server or path incorrect.");
      return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (err) {
    console.error("Download failed", err);
    alert("Failed to download component.");
  }
};

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Copy failed", err);
    return false;
  }
};

// --- Floating Action Button ---
const FloatingActions = ({
  showFilters,
  setShowFilters,
  searchQuery,
  setSearchQuery,
}: {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Floating Search */}
      <div className={`transition-all duration-300 ${showSearch ? 'w-80 opacity-100' : 'w-0 opacity-0 overflow-hidden'}`}>
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-2">
          <div className="flex items-center gap-2">
            <Search className="text-gray-400 ml-2" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search components..."
              className="flex-1 bg-transparent border-none focus:outline-none text-sm py-2"
              autoFocus
            />
            <button
              onClick={() => setShowSearch(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`p-4 rounded-full shadow-2xl transition-all ${
            showFilters
              ? 'bg-black text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Filter size={20} />
        </button>
        
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="p-4 bg-white text-gray-700 rounded-full shadow-2xl hover:bg-gray-50 transition-all"
        >
          <Search size={20} />
        </button>
      </div>
    </div>
  );
};

// --- Component Card (Clean Version) ---
const ComponentCard = ({ 
  component, 
  onClick 
}: { 
  component: ComponentData; 
  onClick: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const heightClass = {
    small: "min-h-[220px]",
    medium: "min-h-[320px]",
    tall: "min-h-[420px]"
  }[component.content.size];

  return (
    <div 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="break-inside-avoid mb-6 cursor-pointer relative group"
    >
      {/* Main Card */}
      <div className={`relative w-full ${heightClass} bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}>
        
        {/* Pure Component Preview (No Text) */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:20px_20px]" />
          </div>
          
          {/* Component Display */}
          <div className="absolute inset-0 p-2 flex items-center justify-center">
            {component.content.component && (
              <div className="w-full h-full flex items-center justify-center">
                {component.content.component}
              </div>
            )}
          </div>
        </div>

        {/* Overlay with ONLY on hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          {/* Content only visible on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-300">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium opacity-90 flex items-center gap-1">
                    {categoryIcons[component.content.category]}
                    {component.content.category}
                  </span>
                </div>
                <h3 className="font-bold text-xl mb-2">{component.name}</h3>
                <p className="text-sm opacity-90 line-clamp-2">{component.content.description}</p>
              </div>
              
              {/* Badge */}
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                component.type === 'prebuilt' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-purple-500 text-white'
              }`}>
                {component.type === 'prebuilt' ? 'Premium' : 'Community'}
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Heart className="fill-current" size={14} />
                <span>{component.content.likes}</span>
              </div>
              <div className="flex items-center gap-2">
                <Download size={14} />
                <span>{component.content.downloads}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={14} />
                <span className="capitalize">{component.content.complexity}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions (Always visible but subtle) */}
        <div className="absolute top-4 right-4 flex gap-2">
          {component.featured && (
            <span className="p-1.5 bg-yellow-500 text-white rounded-lg">
              <Star size={12} />
            </span>
          )}
          {component.trending && (
            <span className="p-1.5 bg-orange-500 text-white rounded-lg">
              <TrendingUp size={12} />
            </span>
          )}
          {component.new && (
            <span className="p-1.5 bg-green-500 text-white rounded-lg">
              New
            </span>
          )}
        </div>

        {/* View Preview Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowPreview(true);
          }}
          className="absolute top-4 left-4 p-2 bg-black/20 backdrop-blur-sm rounded-lg text-white hover:bg-black/30 transition-colors"
        >
          <Eye size={16} />
        </button>
      </div>

      {/* Quick Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowPreview(false)}
          />
          <div className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden">
            <div className="p-6 bg-gray-900 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">{component.name}</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 hover:bg-white/10 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-8 bg-gray-50 max-h-[60vh] overflow-auto">
              {component.content.component}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Filter Panel ---
const FilterPanel = ({
  filters,
  setFilters,
  categories,
}: {
  filters: any;
  setFilters: (filters: any) => void;
  categories: string[];
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter size={18} />
          <h3 className="font-bold text-lg">Filters</h3>
        </div>
        {(filters.category || filters.complexity || filters.framework || filters.featured || filters.trending || filters.new) && (
          <button
            onClick={() => setFilters({
              category: null,
              complexity: null,
              framework: null,
              featured: false,
              trending: false,
              new: false
            })}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear All
          </button>
        )}
      </div>
      
      <div className="space-y-6">
        {/* Categories */}
        <div>
          <h4 className="font-semibold text-sm text-gray-700 mb-3">Categories</h4>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilters({
                  ...filters,
                  category: filters.category === category ? null : category
                })}
                className={`p-3 rounded-xl text-sm font-medium flex items-center gap-2 transition-all ${
                  filters.category === category 
                    ? 'bg-black text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {categoryIcons[category]}
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Complexity */}
        <div>
          <h4 className="font-semibold text-sm text-gray-700 mb-3">Complexity</h4>
          <div className="flex gap-2">
            {["simple", "intermediate", "advanced"].map((level) => (
              <button
                key={level}
                onClick={() => setFilters({
                  ...filters,
                  complexity: filters.complexity === level ? null : level
                })}
                className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize ${
                  filters.complexity === level 
                    ? level === "simple" ? "bg-green-100 text-green-700 border border-green-200" :
                      level === "intermediate" ? "bg-yellow-100 text-yellow-700 border border-yellow-200" :
                      "bg-red-100 text-red-700 border border-red-200"
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
        
        {/* Status */}
        <div>
          <h4 className="font-semibold text-sm text-gray-700 mb-3">Status</h4>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setFilters({ ...filters, featured: !filters.featured })}
              className={`p-3 rounded-lg text-sm font-medium flex flex-col items-center gap-1 ${
                filters.featured 
                  ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Star size={14} />
              Featured
            </button>
            <button
              onClick={() => setFilters({ ...filters, trending: !filters.trending })}
              className={`p-3 rounded-lg text-sm font-medium flex flex-col items-center gap-1 ${
                filters.trending 
                  ? 'bg-orange-100 text-orange-700 border border-orange-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <TrendingUp size={14} />
              Trending
            </button>
            <button
              onClick={() => setFilters({ ...filters, new: !filters.new })}
              className={`p-3 rounded-lg text-sm font-medium flex flex-col items-center gap-1 ${
                filters.new 
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Sparkles size={14} />
              New
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Detail Popup (Tooltip-like) ---
const ComponentDetailPopup = ({
  component,
  position,
  onClose,
}: {
  component: ComponentData;
  position: { x: number; y: number };
  onClose: () => void;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(component.path);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 w-96 overflow-hidden animate-in fade-in zoom-in-95"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-white/20 rounded-md text-xs">
                {component.content.category}
              </span>
              <span className="text-xs opacity-75">{component.content.framework}</span>
            </div>
            <h3 className="text-xl font-bold">{component.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg"
          >
            <X size={18} />
          </button>
        </div>
        <p className="text-sm opacity-90">{component.content.description}</p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Tags */}
        <div>
          <h4 className="font-semibold text-sm text-gray-700 mb-2">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {component.content.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{component.content.likes}</div>
            <div className="text-xs text-gray-500">Likes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{component.content.downloads}</div>
            <div className="text-xs text-gray-500">Downloads</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 capitalize">
              {component.content.complexity}
            </div>
            <div className="text-xs text-gray-500">Level</div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button 
            onClick={() => handleDownload(component.path, `${component.name.replace(/\s+/g, '_')}.tsx`)}
            className="w-full py-3 bg-black hover:bg-gray-800 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <Download size={16} />
            Download Component
          </button>
          
          <button 
            onClick={handleCopy}
            className="w-full py-2.5 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-xl font-medium flex items-center justify-center gap-2"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy Import Path'}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Page ---
function Template() {
  const [activeTab, setActiveTab] = useState<"prebuilt" | "community">("prebuilt");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<ComponentData | null>(null);
  const [detailPopup, setDetailPopup] = useState<{
    component: ComponentData;
    position: { x: number; y: number };
  } | null>(null);

  // Filters
  const [filters, setFilters] = useState({
    category: null as string | null,
    complexity: null as string | null,
    framework: null as string | null,
    featured: false,
    trending: false,
    new: false,
  });

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = mockData.components.map(c => c.content.category);
    return Array.from(new Set(cats));
  }, []);

  // Filter Data
  const filteredComponents = useMemo(() => {
    return mockData.components.filter((comp) => {
      if (comp.type !== activeTab) return false;
      
      if (searchQuery && !(
        comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.content.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.content.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )) return false;
      
      if (filters.category && comp.content.category !== filters.category) return false;
      if (filters.complexity && comp.content.complexity !== filters.complexity) return false;
      if (filters.framework && comp.content.framework !== filters.framework) return false;
      if (filters.featured && !comp.featured) return false;
      if (filters.trending && !comp.trending) return false;
      if (filters.new && !comp.new) return false;
      
      return true;
    });
  }, [activeTab, searchQuery, filters]);

  // Handle card right-click for detail popup
  const handleCardContextMenu = (e: React.MouseEvent, component: ComponentData) => {
    e.preventDefault();
    setDetailPopup({
      component,
      position: { x: e.clientX, y: e.clientY }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Top Bar - Centered Tabs Only */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-30">
        <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-full shadow-2xl px-1 py-1">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab("prebuilt")}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${
                activeTab === 'prebuilt' 
                  ? 'bg-black text-white shadow-lg' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Prebuilt
            </button>
            <button
              onClick={() => setActiveTab("community")}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all ${
                activeTab === 'community' 
                  ? 'bg-black text-white shadow-lg' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Community
            </button>
          </div>
        </div>
      </div>

      {/* Logo in Top Left */}
      <div className="fixed top-6 left-6 z-30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-black to-gray-800 rounded-xl flex items-center justify-center text-white shadow-2xl">
            <Package size={24} />
          </div>
          <div>
            <div className="text-2xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
              LazyLibrary
            </div>
            <div className="text-xs text-gray-500">
              React Components Collection
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Stats Header */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              {activeTab === 'prebuilt' ? 'Premium Components' : 'Community Creations'}
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {activeTab === 'prebuilt' 
                ? 'Professionally crafted React components ready for production'
                : 'Creative components shared by the community'}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="text-3xl font-bold text-gray-900 mb-2">{filteredComponents.length}</div>
              <div className="text-gray-600">Components Available</div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {mockData.components.reduce((sum, comp) => sum + comp.content.downloads, 0)}
              </div>
              <div className="text-gray-600">Total Downloads</div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {categories.length}
              </div>
              <div className="text-gray-600">Categories</div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-[2000px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            {showFilters && (
              <div className="lg:w-80">
                <FilterPanel 
                  filters={filters}
                  setFilters={setFilters}
                  categories={categories}
                />
              </div>
            )}
            
            {/* Components Grid */}
            <div className="flex-1">
              {/* Components Grid */}
              {filteredComponents.length > 0 ? (
                <div className="columns-1 sm:columns-2 lg:columns-3 2xl:columns-4 gap-8">
                  {filteredComponents.map((component) => (
                    <div
                      key={component.id}
                      onContextMenu={(e) => handleCardContextMenu(e, component)}
                    >
                      <ComponentCard 
                        component={component} 
                        onClick={() => setSelectedComponent(component)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-96">
                  <Package className="text-gray-300 mb-4" size={64} />
                  <p className="text-gray-500 font-medium text-lg mb-2">No components found</p>
                  <p className="text-gray-400 text-center max-w-md mb-6">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Actions */}
      <FloatingActions
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Detail Popup */}
      {detailPopup && (
        <ComponentDetailPopup
          component={detailPopup.component}
          position={detailPopup.position}
          onClose={() => setDetailPopup(null)}
        />
      )}

      {/* Full Modal */}
      {selectedComponent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedComponent(null)}
          />
          <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex flex-col lg:flex-row h-[90vh]">
              {/* Preview */}
              <div className="lg:w-2/3 bg-gray-900 p-8 flex items-center justify-center">
                <div className="w-full h-full rounded-xl overflow-hidden">
                  {selectedComponent.content.component}
                </div>
              </div>
              
              {/* Details */}
              <div className="lg:w-1/3 p-8 overflow-auto">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 bg-gray-900 text-white rounded-full text-sm">
                        {selectedComponent.content.category}
                      </span>
                      <span className="text-sm text-gray-500">{selectedComponent.content.framework}</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedComponent.name}</h2>
                    <p className="text-gray-600 leading-relaxed">{selectedComponent.content.description}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <button 
                      onClick={() => handleDownload(selectedComponent.path, `${selectedComponent.name.replace(/\s+/g, '_')}.tsx`)}
                      className="w-full py-4 bg-black hover:bg-gray-800 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3"
                    >
                      <Download size={20} />
                      Download Component
                    </button>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => copyToClipboard(selectedComponent.path)}
                        className="py-3 border border-gray-300 hover:border-gray-400 rounded-xl font-medium"
                      >
                        Copy Path
                      </button>
                      <button 
                        onClick={() => window.open(`/api/preview/${selectedComponent.id}`, '_blank')}
                        className="py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium"
                      >
                        Full Preview
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Right-click hint */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-30">
        <div className="bg-black/80 text-white text-sm px-4 py-2 rounded-full backdrop-blur-sm">
          Right-click any component for quick actions
        </div>
      </div>
    </div>
  );
}

export default Template;