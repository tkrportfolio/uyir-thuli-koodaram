import React from 'react';
import { APP_ASSETS } from '../data/bloodBanksData';

interface DonorProfileModalProps {
  onClose: () => void;
  onOpenRegister: () => void;
}

export const DonorProfileModal: React.FC<DonorProfileModalProps> = ({
  onClose,
  onOpenRegister,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-[#ffffff] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Photo Backdrop */}
        <div className="relative h-44 bg-gradient-to-r from-[#91000a] to-[#d8363a] flex items-end p-4">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
          <div className="absolute -bottom-10 left-4">
            <img
              src={APP_ASSETS.organizerPhoto}
              alt="Coimbatore Donors Volunteer"
              className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg ring-2 ring-[#91000a]/30"
            />
          </div>
          <div className="ml-24 text-white pb-1">
            <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-semibold">
              Coimbatore Donors Lead
            </span>
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-12 p-5 overflow-y-auto space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-lg text-[#131b2e] leading-tight">
                Vigneshwaran K.
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Community Coordinator • Coimbatore Donors Network
              </p>
            </div>
            <div className="flex flex-col items-end">
              <span className="bg-red-50 text-[#91000a] font-mono text-xs font-bold px-2.5 py-1 rounded-full border border-red-200">
                O- Universal
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold mt-0.5 flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Active Volunteer
              </span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2 bg-[#faf8ff] p-3 rounded-xl border border-slate-100 text-center">
            <div>
              <span className="text-lg font-bold text-[#91000a]">18</span>
              <span className="text-[10px] text-slate-500 block font-mono uppercase">Donations</span>
            </div>
            <div>
              <span className="text-lg font-bold text-emerald-700">54</span>
              <span className="text-[10px] text-slate-500 block font-mono uppercase">Lives Impacted</span>
            </div>
            <div>
              <span className="text-lg font-bold text-slate-800">4.9 ★</span>
              <span className="text-[10px] text-slate-500 block font-mono uppercase">Reliability</span>
            </div>
          </div>

          {/* About */}
          <div className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/60">
            <p>
              "Coimbatore Donors connects volunteer life-savers across Avinashi Road, RS Puram, and Gandhipuram with government and private hospital blood banks in Coimbatore district. Ready to mobilize on 15 minutes notice for trauma emergencies."
            </p>
          </div>

          {/* Badges */}
          <div>
            <span className="font-mono text-[10px] uppercase text-slate-500 font-bold tracking-wider block mb-2">
              Volunteer Honours
            </span>
            <div className="flex flex-wrap gap-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-semibold">
                🏆 Diamond Donor
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-[11px] font-semibold">
                ⚡ Rapid Trauma Courier
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-red-900 border border-red-200 text-[11px] font-semibold">
                🩸 Rare O- Responder
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex gap-2">
            <a
              href="tel:04222551410"
              className="flex-1 py-2.5 px-3 rounded-lg border border-slate-300 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-50 active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px] text-[#91000a]">call</span>
              <span>Contact Desk</span>
            </a>
            <button
              onClick={() => {
                onClose();
                onOpenRegister();
              }}
              className="flex-1 py-2.5 px-3 rounded-lg bg-[#91000a] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow hover:bg-[#a6000c] active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">volunteer_activism</span>
              <span>Join Volunteer Registry</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
