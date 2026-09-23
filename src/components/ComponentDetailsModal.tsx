import React from 'react';
import { BloodBank } from '../types/bloodBank';

interface ComponentDetailsModalProps {
  hospital: BloodBank | null;
  onClose: () => void;
  onReserve: (hospital: BloodBank) => void;
}

export const ComponentDetailsModal: React.FC<ComponentDetailsModalProps> = ({
  hospital,
  onClose,
  onReserve,
}) => {
  if (!hospital) return null;

  const componentDetails = [
    {
      name: 'Whole Blood (WB)',
      temp: '2°C to 6°C',
      shelfLife: '35 to 42 Days (CPDA-1)',
      usage: 'Severe acute hemorrhage, trauma resuscitation, massive transfusions.',
      status: 'Available',
    },
    {
      name: 'Packed Red Blood Cells (PRBC)',
      temp: '2°C to 6°C',
      shelfLife: '42 Days in SAGM solution',
      usage: 'Severe anemia, intra-operative blood loss without volume replacement.',
      status: 'Ready in Stock',
    },
    {
      name: 'Apheresis Single Donor Platelets (SDP)',
      temp: '20°C to 24°C with continuous gentle agitation',
      shelfLife: '5 Days',
      usage: 'Dengue shock syndrome, thrombocytopenia, oncology chemotherapy support.',
      status: 'Apheresis Ready',
    },
    {
      name: 'Fresh Frozen Plasma (FFP)',
      temp: '-18°C or colder',
      shelfLife: '1 Year',
      usage: 'Coagulopathy, multiple factor deficiencies, massive trauma transfusion protocol.',
      status: 'Frozen Reserve Ready',
    },
    {
      name: 'Cryoprecipitate Antihemophilic Factor',
      temp: '-18°C or colder',
      shelfLife: '1 Year',
      usage: 'Hypofibrinogenemia, hemophilia A, Von Willebrand disease, DIC.',
      status: 'Ready upon thawing (15 min)',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-[#ffffff] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]">
        {/* Header */}
        <div className="bg-[#005035] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px]">inventory_2</span>
            <div>
              <h3 className="font-bold text-[17px] leading-tight">Component Stock & Quality</h3>
              <p className="text-emerald-100 text-[12px] truncate">{hospital.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-3">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono uppercase text-emerald-800 font-bold block">
                Cold Chain Compliance
              </span>
              <span className="text-xs text-emerald-950 font-medium">
                Standard Blood Bank Guidelines (NABH & Drug Controller General of India)
              </span>
            </div>
            <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[11px] font-bold px-2 py-1 rounded-md">
              <span className="material-symbols-outlined text-[14px]">verified</span> 100% Tested
            </span>
          </div>

          <div className="space-y-2.5">
            {componentDetails.map((item, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl hover:bg-slate-100/70 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-sm text-[#131b2e]">{item.name}</h4>
                  <span className="font-mono text-[10px] text-emerald-700 font-bold bg-emerald-100/70 px-2 py-0.5 rounded">
                    {item.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2 text-[11px] text-slate-600">
                  <div>
                    <span className="text-slate-400 block font-mono uppercase text-[9px]">
                      Storage Temp
                    </span>
                    <span className="font-medium text-slate-800">{item.temp}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-mono uppercase text-[9px]">
                      Shelf Life
                    </span>
                    <span className="font-medium text-slate-800">{item.shelfLife}</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5 border-t border-slate-200/60 pt-1.5">
                  <strong className="text-slate-700">Clinical Indicator:</strong> {item.usage}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-3 rounded-lg border border-slate-300 text-slate-700 font-semibold text-xs"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onReserve(hospital);
            }}
            className="flex-1 py-2.5 px-3 rounded-lg bg-[#91000a] text-white font-bold text-xs shadow hover:bg-[#a6000c] flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">emergency</span>
            <span>Reserve Units</span>
          </button>
        </div>
      </div>
    </div>
  );
};
