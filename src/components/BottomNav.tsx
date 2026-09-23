import React from 'react';

export type TabId = 'emergency' | 'blood-banks' | 'live-track' | 'donor-hub';

interface BottomNavProps {
  activeTab: TabId;
  onChangeTab: (tab: TabId) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab }) => {
  const tabs: { id: TabId; label: string; icon: string; pulse?: boolean }[] = [
    { id: 'emergency', label: 'Emergency', icon: 'emergency_home' },
    { id: 'blood-banks', label: 'Blood Banks', icon: 'local_hospital' },
    { id: 'live-track', label: 'Live Track', icon: 'near_me', pulse: true },
    { id: 'donor-hub', label: 'Donor Hub', icon: 'person_celebrate' },
  ];

  return (
    <nav
      className="fixed bottom-0 w-full z-50 pb-safe bg-[#faf8ff]/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(19,27,46,0.06)] border-t border-slate-200/70"
      data-active-classes="text-[#91000a] font-semibold"
    >
      <div className="max-w-xl mx-auto flex items-center justify-around h-16 px-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChangeTab(tab.id)}
              type="button"
              className={`flex flex-col items-center justify-center min-w-[68px] h-14 transition-all duration-200 focus:outline-none select-none relative ${
                isActive
                  ? 'text-[#91000a] font-bold scale-105'
                  : 'text-[#5b403d] hover:text-[#131b2e] font-medium'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span
                  className={`material-symbols-outlined text-[24px] ${
                    isActive ? 'font-variation-fill' : ''
                  }`}
                  style={{
                    fontVariationSettings: isActive ? "'FILL' 1, 'wght' 600" : "'FILL' 0, 'wght' 400",
                  }}
                >
                  {tab.icon}
                </span>
                {tab.pulse && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#91000a] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#91000a]"></span>
                  </span>
                )}
              </div>
              <span className="font-mono text-[10px] mt-0.5 tracking-tight uppercase">
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#91000a] mt-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
