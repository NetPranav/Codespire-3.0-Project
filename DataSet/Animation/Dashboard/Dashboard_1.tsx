import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

interface DashboardProps {
  isPreview?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ isPreview = false }) => {
  const containerRef = useRef(null);
  const sidebarRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isPreview) return;

    const ctx = gsap.context(() => {
      // 1. Sidebar Slide In
      gsap.fromTo(sidebarRef.current, 
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );

      // 2. Header Slide Down
      gsap.fromTo(".dash-header", 
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: "power3.out" }
      );

      // 3. Stats Cards Pop In (Staggered)
      gsap.fromTo(".stat-card", 
        { y: 30, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1, 
          stagger: 0.1, 
          duration: 0.6, 
          delay: 0.4, 
          ease: "back.out(1.7)" 
        }
      );

      // 4. Main Charts Fade Up
      gsap.fromTo(".chart-panel", 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.6, ease: "power3.out" }
      );

    }, containerRef);

    return () => ctx.revert();
  }, [isPreview]);

  // --- REUSABLE SUB-COMPONENTS ---

  const Sidebar = () => (
    <div ref={sidebarRef} className={`h-full bg-gray-900 text-white flex flex-col ${isPreview ? 'w-64' : 'w-20 lg:w-64'} transition-all duration-300`}>
      <div className="h-16 flex items-center px-6 border-b border-gray-800">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-lg">L</div>
        <span className={`ml-3 font-bold text-xl ${!isPreview && 'hidden lg:block'}`}>LazyDash</span>
      </div>
      <div className="flex-1 py-6 space-y-2 px-3">
        {['Overview', 'Analytics', 'Customers', 'Products', 'Settings'].map((item, idx) => (
          <div key={item} className={`flex items-center px-3 py-3 rounded-lg cursor-pointer ${idx === 0 ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
             <div className="w-5 h-5 bg-current opacity-50 rounded-sm"></div>
             <span className={`ml-3 font-medium ${!isPreview && 'hidden lg:block'}`}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const StatCard = ({ title, value, change, color }: any) => (
    <div className="stat-card bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
        </div>
        <div className={`p-2 rounded-lg ${color} bg-opacity-10`}>
          <div className={`w-6 h-6 ${color.replace('bg-', 'text-')}`}>
             {/* Simple Icon Placeholder */}
             <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"/></svg>
          </div>
        </div>
      </div>
      <div className="flex items-center text-sm">
        <span className="text-green-500 font-semibold flex items-center">
          ↑ {change}
        </span>
        <span className="text-gray-400 ml-2">vs last month</span>
      </div>
    </div>
  );

  const ChartArea = () => (
    <div className="chart-panel bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-96">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-900">Revenue Overview</h3>
        <button className="px-3 py-1 text-sm text-gray-500 border rounded-lg hover:bg-gray-50">This Year</button>
      </div>
      {/* Fake Chart Visualization */}
      <div className="w-full h-64 flex items-end justify-between gap-2 px-2">
         {[40, 65, 45, 80, 55, 70, 40, 60, 75, 50, 85, 60].map((h, i) => (
           <div key={i} className="w-full bg-blue-50 rounded-t-sm relative group">
              <div 
                className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-t-sm transition-all duration-1000"
                style={{ height: `${h}%`, opacity: 0.8 }}
              ></div>
           </div>
         ))}
      </div>
    </div>
  );

  /* --- PREVIEW MODE --- */
  if (isPreview) {
    return (
      <div className="absolute top-0 left-0 w-[200%] h-[200%] origin-top-left scale-50 pointer-events-none bg-gray-50 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-full bg-gray-50/50">
          {/* Header */}
          <div className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between">
            <div className="w-64 h-10 bg-gray-100 rounded-lg"></div>
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 p-8 overflow-hidden">
             {/* Stats Grid */}
             <div className="grid grid-cols-4 gap-6 mb-8">
               <StatCard title="Total Revenue" value="$54,230" change="12%" color="bg-blue-500" />
               <StatCard title="Active Users" value="2,430" change="8%" color="bg-purple-500" />
               <StatCard title="New Orders" value="145" change="24%" color="bg-orange-500" />
               <StatCard title="Bounce Rate" value="42%" change="2%" color="bg-red-500" />
             </div>

             {/* Chart Panel */}
             <div className="grid grid-cols-3 gap-6 h-full">
                <div className="col-span-2">
                   <ChartArea />
                </div>
                <div className="col-span-1 bg-white rounded-2xl border border-gray-100 p-6">
                   <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
                   <div className="space-y-4">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-gray-100"></div>
                           <div className="flex-1 h-2 bg-gray-100 rounded"></div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    );
  }

  /* --- REAL MODE --- */
  return (
    <div ref={containerRef} className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="dash-header h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10">
           <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
           <div className="flex items-center gap-4">
             <button className="p-2 text-gray-400 hover:text-gray-600">
               <span className="sr-only">Notifications</span>
               🔔
             </button>
             <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full"></div>
           </div>
        </header>

        {/* Scrollable Main Area */}
        <main ref={contentRef} className="flex-1 overflow-y-auto p-6 lg:p-8">
           <div className="max-w-7xl mx-auto space-y-8">
              {/* Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <StatCard title="Total Revenue" value="$54,230" change="12%" color="bg-blue-500" />
                 <StatCard title="Active Users" value="2,430" change="8%" color="bg-purple-500" />
                 <StatCard title="New Orders" value="145" change="24%" color="bg-orange-500" />
                 <StatCard title="Bounce Rate" value="42%" change="2%" color="bg-red-500" />
              </div>

              {/* Chart & Sidebar Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <div className="lg:col-span-2">
                    <ChartArea />
                 </div>
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                       {[1,2,3,4].map((i) => (
                         <div key={i} className="flex gap-4">
                            <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                            <div>
                               <p className="text-sm text-gray-800 font-medium">New order #429{i}</p>
                               <p className="text-xs text-gray-500">2 minutes ago</p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;