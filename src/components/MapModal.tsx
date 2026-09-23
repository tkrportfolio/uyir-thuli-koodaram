import React, { useState } from 'react';
import { APP_ASSETS, INITIAL_BLOOD_BANKS } from '../data/bloodBanksData';
import { BloodBank } from '../types/bloodBank';

interface MapModalProps {
  onClose: () => void;
  onSelectHospital: (hospital: BloodBank) => void;
}

export const MapModal: React.FC<MapModalProps> = ({ onClose, onSelectHospital }) => {
  const [selectedPin, setSelectedPin] = useState<BloodBank | null>(INITIAL_BLOOD_BANKS[0]);
  const [gpsFocused, setGpsFocused] = useState(false);

  const handleFocusGPS = () => {
    setGpsFocused(true);
    setTimeout(() => {
      setGpsFocused(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-slate-950/70 backdrop-blur-sm p-4 pt-16 animate-fade-in">
      <div className="bg-[#ffffff] w-full max-w-xl mx-auto rounded-2xl p-4 flex flex-col gap-3 shadow-2xl max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#91000a] text-[20px]">
                location_on
              </span>
              <h3 className="font-bold text-[18px] text-[#131b2e]">Coimbatore Blood Grid</h3>
            </div>
            <span className="text-[12px] text-[#8f706c]">
              Real-time GPS proximity & green corridor arterial status
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-95 transition-all"
            aria-label="Close Map"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Static Map Container with Interactive Pins */}
        <div
          className="w-full h-72 bg-cover bg-center rounded-xl relative shadow-inner overflow-hidden flex flex-col justify-between p-3 border border-slate-200"
          style={{ backgroundImage: `url('${APP_ASSETS.mapBackground}')` }}
        >
          {/* Top Status Bar in Map */}
          <div className="flex items-center justify-between z-10">
            <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-md border border-red-100/50">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="font-mono text-[11px] text-[#131b2e] font-bold">
                6 Verified Centers Live
              </span>
            </div>

            <div className="bg-[#91000a] text-white text-[10px] font-mono px-2.5 py-1 rounded-full shadow font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">traffic</span>
              Corridor Open: Avinashi Flyover
            </div>
          </div>

          {/* Interactive Pins Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {/* KMCH Pin */}
            <button
              type="button"
              onClick={() => setSelectedPin(INITIAL_BLOOD_BANKS[0])}
              className={`pointer-events-auto absolute top-[28%] right-[22%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group focus:outline-none transition-transform ${
                selectedPin?.id === 'kmch' ? 'scale-125 z-20' : 'hover:scale-110 z-10'
              }`}
            >
              <div className="bg-[#91000a] text-white p-1.5 rounded-full shadow-lg border-2 border-white ring-2 ring-red-400">
                <span className="material-symbols-outlined text-[16px] block">local_hospital</span>
              </div>
              <span className="bg-white/90 text-[#91000a] text-[9px] font-bold px-1.5 py-0.5 rounded shadow mt-0.5 whitespace-nowrap">
                KMCH (2.4km)
              </span>
            </button>

            {/* PSG Hospitals Pin */}
            <button
              type="button"
              onClick={() => setSelectedPin(INITIAL_BLOOD_BANKS[1])}
              className={`pointer-events-auto absolute top-[44%] right-[38%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group focus:outline-none transition-transform ${
                selectedPin?.id === 'psg' ? 'scale-125 z-20' : 'hover:scale-110 z-10'
              }`}
            >
              <div className="bg-[#d8363a] text-white p-1.5 rounded-full shadow-lg border-2 border-white">
                <span className="material-symbols-outlined text-[16px] block">volunteer_activism</span>
              </div>
              <span className="bg-white/90 text-slate-900 text-[9px] font-bold px-1.5 py-0.5 rounded shadow mt-0.5 whitespace-nowrap">
                PSG (4.1km)
              </span>
            </button>

            {/* Ganga Hospital Pin */}
            <button
              type="button"
              onClick={() => setSelectedPin(INITIAL_BLOOD_BANKS[2])}
              className={`pointer-events-auto absolute top-[36%] left-[30%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group focus:outline-none transition-transform ${
                selectedPin?.id === 'ganga' ? 'scale-125 z-20' : 'hover:scale-110 z-10'
              }`}
            >
              <div className="bg-[#006b48] text-white p-1.5 rounded-full shadow-lg border-2 border-white">
                <span className="material-symbols-outlined text-[16px] block">healing</span>
              </div>
              <span className="bg-white/90 text-slate-900 text-[9px] font-bold px-1.5 py-0.5 rounded shadow mt-0.5 whitespace-nowrap">
                Ganga (5.8km)
              </span>
            </button>

            {/* Rotary Metro Pin */}
            <button
              type="button"
              onClick={() => setSelectedPin(INITIAL_BLOOD_BANKS[3])}
              className={`pointer-events-auto absolute bottom-[26%] left-[38%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group focus:outline-none transition-transform ${
                selectedPin?.id === 'rotary-metro' ? 'scale-125 z-20' : 'hover:scale-110 z-10'
              }`}
            >
              <div className="bg-[#91000a] text-white p-1.5 rounded-full shadow-lg border-2 border-white">
                <span className="material-symbols-outlined text-[16px] block">diversity_3</span>
              </div>
              <span className="bg-white/90 text-slate-900 text-[9px] font-bold px-1.5 py-0.5 rounded shadow mt-0.5 whitespace-nowrap">
                Rotary RS Puram (3.2km)
              </span>
            </button>

            {/* CMCH Government Pin */}
            <button
              type="button"
              onClick={() => setSelectedPin(INITIAL_BLOOD_BANKS[4])}
              className={`pointer-events-auto absolute bottom-[24%] right-[44%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group focus:outline-none transition-transform ${
                selectedPin?.id === 'cmch-gov' ? 'scale-125 z-20' : 'hover:scale-110 z-10'
              }`}
            >
              <div className="bg-emerald-700 text-white p-1.5 rounded-full shadow-lg border-2 border-white">
                <span className="material-symbols-outlined text-[16px] block">account_balance</span>
              </div>
              <span className="bg-white/90 text-slate-900 text-[9px] font-bold px-1.5 py-0.5 rounded shadow mt-0.5 whitespace-nowrap">
                CMCH Govt (1.8km)
              </span>
            </button>

            {/* User Live Location Pulse */}
            <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-blue-400 opacity-75"></span>
              <div className="relative w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-lg"></div>
            </div>
          </div>

          {/* Bottom GPS Location Banner */}
          <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center justify-between shadow-md z-10">
            <span className="text-[11px] font-medium text-slate-800">
              📍 Current GPS: Gandhipuram / 100ft Road
            </span>
            <span className="font-mono text-[10px] text-emerald-700 font-bold">Accuracy: ±5m</span>
          </div>
        </div>

        {/* Selected Center Preview Card */}
        {selectedPin && (
          <div className="p-3 bg-red-50/50 rounded-xl border border-red-100 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-sm text-[#131b2e] truncate">{selectedPin.name}</h4>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white text-[#91000a] font-semibold border border-red-200">
                  {selectedPin.badge.text}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 truncate mt-0.5">{selectedPin.address}</p>
              <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-700">
                <span className="font-bold text-[#91000a]">{selectedPin.distance}</span>
                <span>•</span>
                <span className="text-slate-500">{selectedPin.eta}</span>
                <span>•</span>
                <span className="text-emerald-700 font-semibold">{selectedPin.stocks.length} Groups Stocked</span>
              </div>
            </div>

            <button
              onClick={() => {
                onSelectHospital(selectedPin);
                onClose();
              }}
              className="shrink-0 px-3 py-2 bg-[#91000a] text-white rounded-lg font-bold text-xs shadow-sm hover:bg-[#a6000c] active:scale-95 transition-transform flex items-center gap-1"
            >
              <span>View Stock</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        )}

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[12px] text-slate-600 font-medium">
            Auto-rerouting enabled for traffic on Lakshmi Mills junction
          </span>
          <button
            onClick={handleFocusGPS}
            className="px-4 py-2 rounded-lg bg-[#91000a] text-white font-mono text-[12px] font-bold active:scale-95 transition-transform flex items-center gap-1.5 shadow"
            id="applyRouteBtn"
          >
            <span className="material-symbols-outlined text-[16px]">my_location</span>
            <span>{gpsFocused ? 'GPS Centered!' : 'Focus GPS'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
