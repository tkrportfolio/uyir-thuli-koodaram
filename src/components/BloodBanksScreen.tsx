import React, { useState, useMemo } from 'react';
import { BloodBank } from '../types/bloodBank';

interface BloodBanksScreenProps {
  bloodBanks: BloodBank[];
  onReserve: (hospital: BloodBank) => void;
  onCheckComponent: (hospital: BloodBank) => void;
  onOpenMap: () => void;
  onSelectHospitalForRoute: (hospital: BloodBank) => void;
  onSosClick: () => void;
  onCallSuccessToast: (msg: string) => void;
}

export const BloodBanksScreen: React.FC<BloodBanksScreenProps> = ({
  bloodBanks,
  onReserve,
  onCheckComponent,
  onOpenMap,
  onSelectHospitalForRoute,
  onSosClick,
  onCallSuccessToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'avinashi' | 'rspuram' | 'trichy' | 'gandhipuram' | 'verified'>('all');

  const filterChips = [
    { id: 'all', label: 'All Areas', count: 28 },
    { id: 'avinashi', label: 'Avinashi Road' },
    { id: 'rspuram', label: 'RS Puram' },
    { id: 'trichy', label: 'Trichy Road' },
    { id: 'gandhipuram', label: 'Gandhipuram' },
    { id: 'verified', label: 'Verified 24x7', isVerified: true },
  ];

  const filteredHospitals = useMemo(() => {
    return bloodBanks.filter((hospital) => {
      // Area or verified filter
      let matchesFilter = true;
      if (activeFilter === 'verified') {
        matchesFilter = hospital.verified24x7;
      } else if (activeFilter !== 'all') {
        matchesFilter = hospital.areaTag === activeFilter;
      }

      // Search query
      if (!matchesFilter) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const nameMatch = hospital.name.toLowerCase().includes(q);
      const addrMatch = hospital.address.toLowerCase().includes(q);
      const areaMatch = hospital.areaName.toLowerCase().includes(q);
      const bloodGroupMatch = hospital.stocks.some((s) => s.group.toLowerCase().includes(q));
      const compMatch = hospital.components.some((c) => c.toLowerCase().includes(q));

      return nameMatch || addrMatch || areaMatch || bloodGroupMatch || compMatch;
    });
  }, [bloodBanks, activeFilter, searchQuery]);

  const handleCall = (phone: string, name: string) => {
    onCallSuccessToast(`Dialing ${name} (${phone})`);
    window.location.href = `tel:${phone.replace(/[^0-9]/g, '')}`;
  };

  return (
    <div className="flex flex-col w-full px-4 pb-28 gap-4 pt-2 max-w-xl mx-auto">
      {/* Search & Area Filter Bar */}
      <section className="flex flex-col gap-2 pt-1">
        <div className="relative flex items-center w-full shadow-sm rounded-xl bg-white border border-slate-200/80">
          <span className="material-symbols-outlined text-[#8f706c] absolute left-3.5 select-none text-[22px]">
            search
          </span>
          <input
            id="searchInput"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Coimbatore Hospitals, Blood Bank, Rotary Camps..."
            className="w-full bg-transparent text-[14px] text-[#131b2e] placeholder:text-[#8f706c]/70 pl-11 pr-10 py-3.5 rounded-xl focus:outline-none focus:bg-slate-50 transition-colors"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 p-1 rounded-lg text-slate-400 hover:text-slate-600"
              aria-label="Clear Search"
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setActiveFilter(activeFilter === 'verified' ? 'all' : 'verified')}
              aria-label="Filter Options"
              className="absolute right-2.5 p-1 rounded-lg text-[#8f706c] hover:text-[#131b2e] active:bg-slate-100 transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">tune</span>
            </button>
          )}
        </div>

        {/* Filter Chips Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4">
          {filterChips.map((chip) => {
            const isActive = activeFilter === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => setActiveFilter(chip.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-[12px] shrink-0 transition-transform active:scale-95 whitespace-nowrap ${
                  isActive
                    ? 'bg-[#91000a] text-white font-bold shadow-sm'
                    : 'bg-[#e2e7ff]/60 text-[#5b403d] hover:bg-[#e2e7ff] font-medium'
                }`}
              >
                {chip.isVerified && (
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                )}
                <span>{chip.label}</span>
                {chip.count !== undefined && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isActive ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {chip.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Live Status & Supply Pulse Overview (3 cols) */}
      <section className="grid grid-cols-3 gap-2 bg-[#f2f3ff] rounded-xl p-3 shadow-sm border border-slate-200/50">
        <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-white text-center shadow-xs">
          <span className="text-[20px] font-extrabold text-[#005035] leading-tight font-mono">
            384
          </span>
          <span className="font-mono text-[10px] text-[#5b403d] mt-0.5 uppercase tracking-tight">
            Units Ready
          </span>
          <div className="flex items-center gap-1 mt-1 text-[#005035]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#005035]"></span>
            <span className="text-[10px] font-bold uppercase tracking-wider">Stable</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-white text-center shadow-xs">
          <span className="text-[20px] font-extrabold text-[#91000a] leading-tight font-mono">
            14
          </span>
          <span className="font-mono text-[10px] text-[#5b403d] mt-0.5 uppercase tracking-tight">
            Critical Depletions
          </span>
          <div className="flex items-center gap-1 mt-1 text-[#91000a]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#91000a] animate-ping"></span>
            <span className="text-[10px] font-black uppercase tracking-wider">O- & AB-</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-white text-center shadow-xs">
          <span className="text-[20px] font-extrabold text-[#131b2e] leading-tight font-mono">
            18 min
          </span>
          <span className="font-mono text-[10px] text-[#5b403d] mt-0.5 uppercase tracking-tight">
            Avg Green Corridor
          </span>
          <div className="flex items-center gap-1 mt-1 text-[#8f706c]">
            <span className="material-symbols-outlined text-[13px]">speed</span>
            <span className="text-[10px] font-bold">City-wide</span>
          </div>
        </div>
      </section>

      {/* Hospital & Blood Bank Stock Cards */}
      <div className="flex flex-col gap-4" id="hospitalList">
        {filteredHospitals.map((hospital) => {
          return (
            <article
              key={hospital.id}
              className="flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden relative border border-slate-200/70"
            >
              {/* Left Color Accent Bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{ backgroundColor: hospital.borderAccentColor || '#91000a' }}
              ></div>

              <div className="p-4 flex flex-col gap-3">
                {/* Header Info */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h2 className="font-bold text-[18px] text-[#131b2e] truncate">
                        {hospital.name}
                      </h2>
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#dae2fd] text-[#91000a] font-mono text-[10px] font-bold tracking-tight">
                        <span className="material-symbols-outlined text-[13px]">
                          {hospital.badge.iconName}
                        </span>
                        {hospital.badge.text}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#5b403d] mt-0.5 truncate font-medium">
                      {hospital.address}
                    </p>
                  </div>

                  <div className="flex flex-col items-end shrink-0 text-right">
                    <div className="flex items-center gap-1 font-mono text-[12px] text-[#91000a] font-bold">
                      <span className="material-symbols-outlined text-[16px]">near_me</span>
                      <span>{hospital.distance}</span>
                    </div>
                    <span className="font-mono text-[10px] text-[#8f706c] font-medium">
                      {hospital.eta}
                    </span>
                  </div>
                </div>

                {/* Live Blood Stock Matrix / Snapshot */}
                <div className="flex flex-col gap-1.5 bg-[#f2f3ff] p-2.5 rounded-lg border border-slate-200/50">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#8f706c] uppercase tracking-wider font-bold">
                      {hospital.specialty || 'Real-Time Blood Matrix'}
                    </span>
                    <span className="font-mono text-[10px] text-[#005035] flex items-center gap-1 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#005035]"></span>
                      {hospital.updatedTimeText}
                    </span>
                  </div>

                  {/* Stock Grid */}
                  <div
                    className={`grid gap-1.5 pt-1 ${
                      hospital.stocks.length >= 6 ? 'grid-cols-6' : 'grid-cols-4'
                    }`}
                  >
                    {hospital.stocks.map((item, idx) => {
                      const isCritical = item.status === 'critical';
                      const isOutOfStock = item.status === 'out_of_stock';
                      const isLow = item.status === 'low';
                      const isAmple = item.status === 'ample';
                      const isReserved = item.status === 'reserved';

                      if (isCritical) {
                        return (
                          <div
                            key={idx}
                            className="flex flex-col items-center py-1.5 rounded bg-[#91000a] text-white relative shadow-sm"
                          >
                            <span className="absolute -top-1 -right-1 flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-200"></span>
                            </span>
                            <span className="font-mono text-[10px] text-white font-bold">
                              {item.group}
                            </span>
                            <span className="font-mono text-[13px] text-white font-black mt-0.5">
                              {item.units}
                            </span>
                            <span className="text-[9px] text-red-200 uppercase font-black tracking-tight">
                              CRIT
                            </span>
                          </div>
                        );
                      }

                      if (isOutOfStock) {
                        return (
                          <div
                            key={idx}
                            className="flex flex-col items-center py-1.5 rounded bg-[#b71c1c] text-white"
                          >
                            <span className="font-mono text-[10px] text-red-200 font-bold">
                              {item.group}
                            </span>
                            <span className="font-mono text-[13px] text-white font-black mt-0.5">
                              0
                            </span>
                            <span className="text-[8px] text-red-100 font-black uppercase tracking-tighter">
                              OUT OF STOCK
                            </span>
                          </div>
                        );
                      }

                      if (isLow) {
                        return (
                          <div
                            key={idx}
                            className="flex flex-col items-center py-1.5 rounded bg-[#ffdad6] text-[#93000a]"
                          >
                            <span className="font-mono text-[10px] font-bold">{item.group}</span>
                            <span className="font-mono text-[13px] font-black mt-0.5">
                              {item.units}
                            </span>
                            <span className="text-[9px] text-[#ba1a1a] font-bold tracking-tight">
                              {item.label}
                            </span>
                          </div>
                        );
                      }

                      return (
                        <div
                          key={idx}
                          className="flex flex-col items-center py-1.5 rounded bg-white shadow-xs border border-slate-100"
                        >
                          <span className="font-mono text-[10px] text-[#5b403d] font-bold">
                            {item.group}
                          </span>
                          <span
                            className={`font-mono text-[13px] font-bold mt-0.5 ${
                              isAmple ? 'text-[#005035]' : isReserved ? 'text-[#91000a]' : 'text-[#131b2e]'
                            }`}
                          >
                            {item.units}
                          </span>
                          <span
                            className={`text-[9px] font-bold tracking-tight ${
                              isAmple ? 'text-[#005035]' : 'text-[#8f706c]'
                            }`}
                          >
                            {item.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Subsidized Info or Urgent Need Note */}
                {hospital.alertNotice && (
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-[#ffdad6]/80 text-[#93000a] border border-red-200">
                    <span className="material-symbols-outlined text-[18px] text-[#ba1a1a] shrink-0">
                      notification_important
                    </span>
                    <p className="text-[12px] font-medium leading-snug">{hospital.alertNotice}</p>
                  </div>
                )}

                {hospital.subsidizedInfo && (
                  <div className="flex flex-col gap-1 bg-[#f2f3ff] p-2.5 rounded-lg border border-slate-200/50">
                    <div className="flex items-center justify-between text-[#131b2e]">
                      <span className="font-mono text-[10px] text-[#8f706c] uppercase tracking-wider font-bold">
                        NGO Subsidized Facility
                      </span>
                      <span className="font-mono text-[10px] text-[#005035] font-bold">
                        Free Donor Testing
                      </span>
                    </div>
                    <p className="text-[11px] text-[#5b403d] leading-relaxed">
                      {hospital.subsidizedInfo}
                    </p>
                  </div>
                )}

                {/* Specialized Components Row (if available) */}
                {hospital.components && hospital.components.length > 0 && !hospital.subsidizedInfo && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-mono text-[10px] text-[#8f706c] mr-1 uppercase">
                      Available:
                    </span>
                    {hospital.components.map((comp, cIdx) => {
                      const isApheresis = comp.includes('Platelet') || comp.includes('Apheresis');
                      return (
                        <span
                          key={cIdx}
                          className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                            isApheresis
                              ? 'bg-[#6ffbbe]/40 text-[#005035] font-bold flex items-center gap-1 border border-emerald-200'
                              : 'bg-[#e2e7ff] text-[#131b2e]'
                          }`}
                        >
                          {isApheresis && (
                            <span className="material-symbols-outlined text-[12px]">
                              check_circle
                            </span>
                          )}
                          {comp}
                        </span>
                      );
                    })}
                  </div>
                )}

                {/* Action Buttons Row */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {/* Action 1: Reserve or Check Component */}
                  {hospital.id === 'ganga' ? (
                    <button
                      onClick={() => onCheckComponent(hospital)}
                      type="button"
                      className="col-span-1 flex items-center justify-center gap-1 py-2.5 px-2 rounded-lg bg-[#e2e7ff] text-[#131b2e] font-semibold text-[13px] active:scale-95 transition-transform"
                    >
                      <span className="material-symbols-outlined text-[18px]">inventory</span>
                      <span>Components</span>
                    </button>
                  ) : hospital.id === 'rotary-metro' ? (
                    <button
                      onClick={() => onCheckComponent(hospital)}
                      type="button"
                      className="col-span-1 flex items-center justify-center gap-1 py-2.5 px-2 rounded-lg bg-[#e2e7ff] text-[#131b2e] font-semibold text-[13px] active:scale-95 transition-transform"
                    >
                      <span className="material-symbols-outlined text-[18px]">support_agent</span>
                      <span className="truncate">Volunteer Desk</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onReserve(hospital)}
                      type="button"
                      className="col-span-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg bg-[#91000a] text-white font-bold text-[13px] shadow-sm active:scale-95 transition-transform hover:bg-[#a6000c]"
                    >
                      <span className="material-symbols-outlined text-[18px]">emergency</span>
                      <span>Reserve</span>
                    </button>
                  )}

                  {/* Action 2: Direct Call */}
                  <button
                    onClick={() => handleCall(hospital.phone, hospital.name)}
                    type="button"
                    className="col-span-1 flex items-center justify-center gap-1 py-2.5 px-2 rounded-lg bg-[#e2e7ff] text-[#131b2e] font-semibold text-[13px] active:scale-95 transition-transform text-center truncate hover:bg-[#dae2fd]"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#91000a]">call</span>
                    <span className="truncate font-mono">{hospital.phone.split('-')[1] || hospital.phone}</span>
                  </button>

                  {/* Action 3: Navigate / View Route */}
                  <button
                    onClick={() => onSelectHospitalForRoute(hospital)}
                    type="button"
                    className="col-span-1 flex items-center justify-center gap-1 py-2.5 px-2 rounded-lg bg-[#f2f3ff] text-[#131b2e] font-semibold text-[13px] active:scale-95 transition-transform hover:bg-slate-200 border border-slate-200/60"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#8f706c]">
                      navigation
                    </span>
                    <span>Navigate</span>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Empty Search State */}
      {filteredHospitals.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl shadow-sm my-4 border border-slate-200/80">
          <div className="w-16 h-16 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#8f706c] mb-3">
            <span className="material-symbols-outlined text-[32px]">bloodtype</span>
          </div>
          <h3 className="font-bold text-[18px] text-[#131b2e]">No Blood Bank Found</h3>
          <p className="text-[13px] text-[#5b403d] mt-1 max-w-xs">
            No institutions matched your query "{searchQuery}". Dial the 24/7 central Coimbatore district blood registry coordinator.
          </p>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
              className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold text-xs"
            >
              Reset Filters
            </button>
            <button
              onClick={onSosClick}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#91000a] text-white text-xs font-bold shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">emergency</span>
              <span>Emergency 108 Dispatch</span>
            </button>
          </div>
        </div>
      )}

      {/* Interactive Map View Floating Toggle Button */}
      <div className="fixed bottom-20 left-0 right-0 flex justify-center pointer-events-none z-40">
        <button
          onClick={onOpenMap}
          type="button"
          className="pointer-events-auto flex items-center gap-2 px-5 py-3 rounded-full bg-[#283044] text-white shadow-[0_8px_20px_rgba(0,0,0,0.25)] active:scale-95 transition-all hover:bg-[#1f2638] focus:outline-none"
        >
          <span className="material-symbols-outlined text-[20px] text-[#ffb4ab]">map</span>
          <span className="font-bold text-[14px] tracking-wide">Map View 🗺️</span>
        </button>
      </div>
    </div>
  );
};
