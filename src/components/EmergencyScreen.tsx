import React, { useState } from 'react';
import { BloodGroup, EmergencyRequest } from '../types/bloodBank';

interface EmergencyScreenProps {
  onCallSuccessToast: (msg: string) => void;
  onRequestCreated: (req: EmergencyRequest) => void;
}

export const EmergencyScreen: React.FC<EmergencyScreenProps> = ({
  onCallSuccessToast,
  onRequestCreated,
}) => {
  const [patientName, setPatientName] = useState('');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('O-');
  const [hospital, setHospital] = useState('Ganga Hospital Trauma Bank (Saibaba Colony)');
  const [units, setUnits] = useState(2);
  const [contactNumber, setContactNumber] = useState('');
  const [urgency, setUrgency] = useState<'Immediate (Trauma)' | 'Within 2 Hours' | 'Within 6 Hours'>('Immediate (Trauma)');
  const [submitted, setSubmitted] = useState(false);

  const [activeSosList, setActiveSosList] = useState<EmergencyRequest[]>([
    {
      id: 'SOS-CBE-812',
      patientName: 'R. Vignesh (42M) - Acute Trauma ICU',
      hospital: 'Ganga Hospital Mettupalayam Rd',
      bloodGroup: 'O-',
      units: 2,
      component: 'Universal Whole Blood',
      urgency: 'Immediate (Trauma)',
      contactPhone: '0422-2485000',
      timestamp: '14 mins ago',
      status: 'dispatched',
      matchedDonorsCount: 4,
    },
    {
      id: 'SOS-CBE-809',
      patientName: 'Lakshmi P. (28F) - Emergency C-Section',
      hospital: 'Coimbatore Medical College (CMCH)',
      bloodGroup: 'AB-',
      units: 1,
      component: 'Packed Red Cells (PRBC)',
      urgency: 'Within 2 Hours',
      contactPhone: '0422-2300151',
      timestamp: '26 mins ago',
      status: 'matched',
      matchedDonorsCount: 2,
    },
    {
      id: 'SOS-CBE-804',
      patientName: 'M. Sridhar (61M) - Cardiac Surgery',
      hospital: 'KMCH Blood Centre (Avinashi Rd)',
      bloodGroup: 'B-',
      units: 3,
      component: 'Single Donor Platelets (SDP)',
      urgency: 'Within 6 Hours',
      contactPhone: '0422-4323800',
      timestamp: '52 mins ago',
      status: 'fulfilled',
      matchedDonorsCount: 5,
    },
  ]);

  const handleSubmitRequisition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !contactNumber.trim()) return;

    const newReq: EmergencyRequest = {
      id: 'SOS-CBE-' + Math.floor(100 + Math.random() * 900),
      patientName: `${patientName.trim()} - Emergency Transfusion`,
      hospital,
      bloodGroup,
      units,
      component: 'Whole Blood / PRBC',
      urgency,
      contactPhone: contactNumber,
      timestamp: 'Just now',
      status: 'active',
      matchedDonorsCount: Math.floor(3 + Math.random() * 4),
    };

    setActiveSosList([newReq, ...activeSosList]);
    onRequestCreated(newReq);
    setSubmitted(true);
    onCallSuccessToast(`Trauma SOS broadcasted to ${newReq.matchedDonorsCount} nearby donors!`);

    setTimeout(() => {
      setSubmitted(false);
      setPatientName('');
      setContactNumber('');
    }, 4000);
  };

  return (
    <div className="flex flex-col w-full px-4 pb-28 gap-4 pt-2 max-w-xl mx-auto">
      {/* Critical Banner */}
      <div className="bg-gradient-to-r from-[#91000a] to-[#d8363a] text-white p-4 rounded-2xl shadow-md relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full font-mono text-[10px] uppercase font-bold tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 animate-ping"></span>
              24/7 Transfusion Emergency
            </span>
            <h2 className="text-xl font-black tracking-tight mt-1">
              Coimbatore Trauma SOS Desk
            </h2>
            <p className="text-xs text-red-100 max-w-sm leading-relaxed">
              Direct connection with 108 Emergency Ambulance, Green Corridor police dispatch, and verified volunteer donor networks across Coimbatore.
            </p>
          </div>
        </div>

        {/* Quick Dial 108 Action Button */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <a
            href="tel:108"
            className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-white text-[#91000a] font-extrabold text-sm shadow-md active:scale-95 transition-transform hover:bg-red-50"
          >
            <span className="material-symbols-outlined text-[20px]">emergency</span>
            <span>Dial 108 Hotline</span>
          </a>
          <a
            href="tel:04222300151"
            className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-red-950/40 text-white font-bold text-xs border border-white/20 active:scale-95 transition-transform hover:bg-red-950/60 text-center truncate"
          >
            <span className="material-symbols-outlined text-[18px]">phone</span>
            <span className="truncate">CMCH Govt 24x7</span>
          </a>
        </div>
      </div>

      {/* Emergency Requisition Form */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#91000a] text-[20px]">
              add_alert
            </span>
            <h3 className="font-bold text-base text-[#131b2e]">Raise Emergency Blood Requisition</h3>
          </div>
          <span className="font-mono text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-200">
            Instant Broadcast
          </span>
        </div>

        {submitted ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2 animate-fade-in">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[24px]">done</span>
            </div>
            <h4 className="font-bold text-emerald-900 text-sm">Emergency Requisition Dispatched!</h4>
            <p className="text-xs text-emerald-800">
              Coimbatore volunteer donors with matching blood type have been alerted via SMS/App. The transfusion desk at {hospital} has been flagged.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmitRequisition} className="space-y-3">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">
                Patient Name & Room / Ward *
              </label>
              <input
                required
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="e.g. S. Murugesan (ICU Ward 3)"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#91000a]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">
                  Required Group *
                </label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none font-bold text-[#91000a] bg-white"
                >
                  {(['O-', 'AB-', 'A-', 'B-', 'O+', 'A+', 'B+', 'AB+'] as BloodGroup[]).map((grp) => (
                    <option key={grp} value={grp}>
                      {grp} {grp === 'O-' || grp === 'AB-' ? '(Critical)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">
                  Units Needed
                </label>
                <select
                  value={units}
                  onChange={(e) => setUnits(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none bg-white"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Unit' : 'Units'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">
                  Urgency Level
                </label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value as any)}
                  className="w-full px-2 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none bg-white font-semibold text-red-900"
                >
                  <option value="Immediate (Trauma)">Immediate (Trauma)</option>
                  <option value="Within 2 Hours">Within 2 Hours</option>
                  <option value="Within 6 Hours">Within 6 Hours</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">
                  Attender Mobile *
                </label>
                <input
                  required
                  type="tel"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  placeholder="e.g. 98420 11223"
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#91000a]"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">
                Hospital Destination in Coimbatore
              </label>
              <select
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none bg-white font-medium"
              >
                <option value="Ganga Hospital Trauma Bank (Saibaba Colony)">Ganga Hospital Trauma Bank (Mettupalayam Rd)</option>
                <option value="KMCH Blood Centre (Avinashi Rd)">KMCH Blood Centre (Avinashi Rd)</option>
                <option value="PSG Hospitals Blood Bank (Peelamedu)">PSG Hospitals Blood Bank (Peelamedu)</option>
                <option value="Coimbatore Medical College (CMCH)">CMCH Government Hospital (Trichy Rd)</option>
                <option value="Sri Ramakrishna Hospital (Gandhipuram)">Sri Ramakrishna Hospital (Gandhipuram)</option>
                <option value="Rotary Metro Blood Bank (RS Puram)">Rotary Metro Blood Bank (RS Puram)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#91000a] hover:bg-[#a6000c] text-white font-bold text-sm rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">sensors</span>
              <span>Broadcast SOS to 1,240 Coimbatore Donors</span>
            </button>
          </form>
        )}
      </div>

      {/* Active High-Priority Emergency Feed */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-1">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#8f706c] font-bold">
            Live City-Wide SOS Queue ({activeSosList.length})
          </span>
          <span className="text-[11px] font-mono text-emerald-700 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            Real-time Dispatch
          </span>
        </div>

        {activeSosList.map((sos) => {
          const isTrauma = sos.urgency === 'Immediate (Trauma)';
          return (
            <div
              key={sos.id}
              className="bg-white rounded-xl p-3.5 shadow-xs border border-slate-200/80 flex flex-col gap-2 relative overflow-hidden"
            >
              <div
                className={`absolute top-0 left-0 bottom-0 w-1 ${
                  isTrauma ? 'bg-[#91000a]' : 'bg-[#d8363a]'
                }`}
              ></div>

              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                      {sos.id}
                    </span>
                    <span
                      className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isTrauma
                          ? 'bg-red-100 text-[#91000a] animate-pulse'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {sos.urgency}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-[#131b2e] mt-1">{sos.patientName}</h4>
                  <p className="text-[12px] text-slate-500 font-medium">{sos.hospital}</p>
                </div>

                <div className="flex flex-col items-end">
                  <span className="font-mono text-base font-black text-[#91000a]">
                    {sos.bloodGroup}
                  </span>
                  <span className="font-mono text-[10px] text-slate-500">
                    {sos.units} {sos.units === 1 ? 'Unit' : 'Units'}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-1 text-emerald-700 font-medium">
                  <span className="material-symbols-outlined text-[15px]">diversity_1</span>
                  <span>{sos.matchedDonorsCount} Donors Responded</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400">{sos.timestamp}</span>
                  <a
                    href={`tel:${sos.contactPhone.replace(/[^0-9]/g, '')}`}
                    className="p-1 px-2.5 rounded-md bg-red-50 text-[#91000a] font-bold text-[11px] hover:bg-red-100 transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[13px]">call</span>
                    <span>Contact</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
