import React from 'react';
import { APP_ASSETS } from '../data/bloodBanksData';

interface HeaderProps {
  activeTab: string;
  onOpenSos: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onOpenSos,
  onOpenProfile,
}) => {
  const getSubtext = () => {
    switch (activeTab) {
      case 'emergency':
        return 'Emergency SOS';
      case 'live-track':
        return 'Green Corridor';
      case 'donor-hub':
        return 'Volunteer Hub';
      case 'blood-banks':
      default:
        return 'Blood Banks';
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#faf8ff]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe border-b border-red-950/5">
      <div className="max-w-xl mx-auto h-16 px-4 flex items-center justify-between gap-2">
        {/* Brand Lockup */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <img
            alt="Uyir Thuli Koodaram Logo"
            className="h-8 w-8 object-contain shrink-0 drop-shadow-sm"
            src={APP_ASSETS.logo}
            loading="eager"
          />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1 truncate">
              <span className="font-bold text-[18px] text-[#91000a] tracking-tight truncate leading-tight">
                Uyir Thuli Koodaram
              </span>
            </div>
            <div className="flex items-center gap-1.5 truncate">
              <span className="font-mono text-[10px] text-[#8f706c] uppercase tracking-wider font-semibold truncate">
                Coimbatore Network
              </span>
              <span className="text-[#8f706c]/40 text-[11px]">•</span>
              <span className="text-[12px] text-[#5b403d] font-semibold truncate">
                {getSubtext()}
              </span>
            </div>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Emergency SOS Call button */}
          <button
            aria-label="Emergency SOS Call"
            onClick={onOpenSos}
            type="button"
            className="relative flex items-center justify-center w-11 h-11 rounded-full bg-[#91000a] text-white shadow-[0_4px_12px_rgba(145,0,10,0.3)] active:scale-95 transition-transform hover:bg-[#a6000c] focus:outline-none"
          >
            <span className="material-symbols-outlined text-[20px]">emergency</span>
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#d8363a] border-2 border-white"></span>
            </span>
          </button>

          {/* Profile / Organizer Avatar */}
          <button
            aria-label="Donor Community Profile"
            onClick={onOpenProfile}
            type="button"
            className="relative flex items-center justify-center pl-1 focus:outline-none group active:scale-95 transition-transform"
          >
            <img
              alt="Coimbatore Donors Volunteer Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#91000a]/25 group-hover:ring-[#91000a]"
              src={APP_ASSETS.organizerPhoto}
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-600 border-2 border-white rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
