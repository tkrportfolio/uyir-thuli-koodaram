import React, { useState } from 'react';
import { BloodGroup } from '../types/bloodBank';

interface SosEmergencyModalProps {
  onClose: () => void;
  onBroadcastSos: (bloodGroup: BloodGroup, hospital: string, units: number) => void;
}

export const SosEmergencyModal: React.FC<SosEmergencyModalProps> = ({
  onClose,
  onBroadcastSos,
}) => {
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('O-');
  const [hospital, setHospital] = useState('Ganga Hospital Trauma Center');
  const [units, setUnits] = useState(2);
  const [patientName, setPatientName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastDone, setBroadcastDone] = useState(false);

  const handleTriggerBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBroadcasting(true);

    setTimeout(() => {
      setIsBroadcasting(false);
      setBroadcastDone(true);
      onBroadcastSos(bloodGroup, hospital, units);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-red-950/80 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-[#ffffff] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border-2 border-red-500">
        {/* Urgent Header with Siren Bar */}
        <div className="bg-[#91000a] text-white p-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-red-600/30 animate-pulse pointer-events-none"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px] text-white animate-bounce">
                  emergency
                </span>
              </div>
              <div>
                <h3 className="font-extrabold text-[18px] tracking-tight leading-tight">
                  Trauma SOS Transfusion
                </h3>
                <p className="text-red-100 text-[11px] font-mono">
                  Coimbatore District 24x7 Emergency Grid
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-4">
          {/* Quick 108 Call Banner */}
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[28px] text-[#91000a]">
                phone_in_talk
              </span>
              <div>
                <span className="font-bold text-sm text-[#91000a] block">
                  Dial 108 Emergency
                </span>
                <span className="text-[11px] text-slate-600">
                  Government Ambulance & Green Corridor Desk
                </span>
              </div>
            </div>
            <a
              href="tel:108"
              className="px-3 py-2 bg-[#91000a] text-white text-xs font-bold rounded-lg shadow active:scale-95 flex items-center gap-1 shrink-0"
            >
              <span className="material-symbols-outlined text-[15px]">call</span>
              <span>108</span>
            </a>
          </div>

          {broadcastDone ? (
            <div className="text-center py-4 space-y-3">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-[36px]">cell_tower</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#131b2e]">SOS Alert Broadcast Active!</h4>
                <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto">
                  Alert sent to <strong>1,240 Coimbatore Donors</strong> in Avinashi Rd, RS Puram, and Gandhipuram.
                </p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-left text-xs space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-800 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                  <span>4 Volunteer Donors responding now</span>
                </div>
                <p className="text-slate-600">
                  Blood Group: <strong className="text-red-700">{bloodGroup}</strong> • {units} Units at{' '}
                  <strong className="text-slate-900">{hospital}</strong>
                </p>
                <p className="text-slate-500 text-[10px]">
                  Police green corridor dispatch coordination initiated.
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 bg-[#91000a] text-white rounded-lg font-bold text-sm shadow hover:bg-[#a6000c]"
              >
                Close & View Response
              </button>
            </div>
          ) : (
            <form onSubmit={handleTriggerBroadcast} className="space-y-3">
              <div className="border-b border-slate-100 pb-1">
                <span className="font-mono text-[11px] font-bold text-[#91000a] uppercase tracking-wider">
                  Instant Volunteer Broadcast
                </span>
                <p className="text-[12px] text-slate-600">
                  Broadcasts urgent requirement to verified volunteer donors in Coimbatore.
                </p>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-600 font-semibold mb-1">
                  Required Blood Group *
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['O-', 'AB-', 'A-', 'B-', 'O+', 'A+', 'B+', 'AB+'] as BloodGroup[]).map((grp) => (
                    <button
                      key={grp}
                      type="button"
                      onClick={() => setBloodGroup(grp)}
                      className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                        bloodGroup === grp
                          ? 'bg-[#91000a] text-white border-[#91000a] shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {grp}
                      {grp === 'O-' || grp === 'AB-' ? ' 🚨' : ''}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-mono text-[11px] uppercase text-slate-600 font-semibold mb-1">
                    Units Needed
                  </label>
                  <select
                    value={units}
                    onChange={(e) => setUnits(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Unit' : 'Units'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase text-slate-600 font-semibold mb-1">
                    Patient Name
                  </label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Patient name"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-600 font-semibold mb-1">
                  Target Hospital *
                </label>
                <select
                  value={hospital}
                  onChange={(e) => setHospital(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white font-medium"
                >
                  <option value="Ganga Hospital Trauma Center">Ganga Hospital Trauma Center (Mettupalayam Rd)</option>
                  <option value="KMCH Blood Centre">KMCH Blood Centre (Avinashi Rd)</option>
                  <option value="PSG Hospitals">PSG Hospitals (Peelamedu)</option>
                  <option value="Coimbatore Medical College Hospital (CMCH)">CMCH Govt Hospital (Trichy Rd)</option>
                  <option value="Sri Ramakrishna Hospital">Sri Ramakrishna Hospital (Gandhipuram)</option>
                  <option value="Royal Care Hospital">Royal Care Super Speciality (Neelambur)</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase text-slate-600 font-semibold mb-1">
                  Attender / Doctor Phone *
                </label>
                <input
                  required
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="e.g. 98422 55555"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isBroadcasting}
                  className="flex-1 py-2.5 rounded-lg bg-[#91000a] text-white font-bold text-xs shadow-lg hover:bg-[#a6000c] flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-60"
                >
                  {isBroadcasting ? (
                    <span>Broadcasting...</span>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[16px]">sensors</span>
                      <span>Broadcast SOS</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Quick Helplines */}
          <div className="pt-2 border-t border-slate-100">
            <span className="font-mono text-[10px] uppercase text-slate-500 block mb-1.5">
              Direct Transfusion Desks
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <a
                href="tel:04222300151"
                className="p-2 bg-slate-50 rounded-lg flex items-center justify-between hover:bg-slate-100"
              >
                <span className="font-medium text-slate-800">CMCH Govt Blood</span>
                <span className="text-[#91000a] font-bold">Call</span>
              </a>
              <a
                href="tel:04224323800"
                className="p-2 bg-slate-50 rounded-lg flex items-center justify-between hover:bg-slate-100"
              >
                <span className="font-medium text-slate-800">KMCH 24/7 Desk</span>
                <span className="text-[#91000a] font-bold">Call</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
