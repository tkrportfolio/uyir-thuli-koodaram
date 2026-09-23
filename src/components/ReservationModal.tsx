import React, { useState } from 'react';
import { BloodBank, BloodGroup } from '../types/bloodBank';

interface ReservationModalProps {
  hospital: BloodBank | null;
  onClose: () => void;
  onSuccess: (code: string, hospitalName: string, bloodGroup: string, units: number) => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  hospital,
  onClose,
  onSuccess,
}) => {
  const [patientName, setPatientName] = useState('');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('O+');
  const [component, setComponent] = useState('Whole Blood');
  const [units, setUnits] = useState(1);
  const [contactNumber, setContactNumber] = useState('');
  const [patientHospital, setPatientHospital] = useState('KMCH / PSG / Local Clinic');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservationVoucher, setReservationVoucher] = useState<{
    code: string;
    expiresAt: string;
  } | null>(null);

  if (!hospital) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !contactNumber.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const randomId = 'UTK-' + Math.floor(1000 + Math.random() * 9000);
      const expireTime = new Date(Date.now() + 2 * 60 * 60 * 1000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      setReservationVoucher({ code: randomId, expiresAt: expireTime });
      setIsSubmitting(false);
      onSuccess(randomId, hospital.name, bloodGroup, units);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-[#ffffff] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#91000a] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px]">emergency</span>
            <div>
              <h3 className="font-bold text-[17px] leading-tight">Emergency Blood Reserve</h3>
              <p className="text-red-100 text-[12px] truncate">{hospital.name}</p>
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
        <div className="p-5 overflow-y-auto space-y-4">
          {reservationVoucher ? (
            <div className="space-y-4 text-center py-2">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-[32px]">check_circle</span>
              </div>
              <div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#8f706c]">
                  Confirmed Digital Token
                </span>
                <h4 className="text-[28px] font-black tracking-wider text-[#91000a] font-mono mt-1">
                  {reservationVoucher.code}
                </h4>
                <p className="text-sm text-slate-600 mt-1">
                  Hold active for <strong>2 Hours</strong> until {reservationVoucher.expiresAt}.
                </p>
              </div>

              {/* Barcode Mock Visual */}
              <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-3 flex flex-col items-center">
                <div className="flex gap-1 h-10 items-center justify-center px-4 w-full">
                  {[4, 2, 6, 2, 4, 8, 3, 2, 5, 2, 4, 2, 6, 3, 2, 4, 6, 2, 4, 3, 5, 2, 4, 2].map(
                    (w, i) => (
                      <span
                        key={i}
                        className="bg-black h-full"
                        style={{ width: `${w}px` }}
                      ></span>
                    )
                  )}
                </div>
                <span className="font-mono text-[10px] text-slate-500 mt-1">
                  {hospital.name} • {units} Units {bloodGroup} ({component})
                </span>
              </div>

              <div className="bg-[#faf8ff] p-3 rounded-xl border border-red-100 text-left text-xs space-y-1.5 text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Patient:</span>
                  <span className="font-semibold text-slate-900">{patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Blood Bank Desk:</span>
                  <span className="font-semibold text-slate-900">{hospital.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Address:</span>
                  <span className="font-semibold text-slate-900 text-right truncate max-w-[200px]">
                    {hospital.address}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <a
                  href={`tel:${hospital.phone.replace(/[^0-9]/g, '')}`}
                  className="flex-1 py-2.5 px-3 rounded-lg bg-[#91000a] text-white font-bold text-sm flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                >
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  Call Blood Bank
                </a>
                <button
                  onClick={onClose}
                  className="py-2.5 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="p-3 bg-red-50/70 border border-red-100 rounded-xl flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#91000a] text-[20px] shrink-0 mt-0.5">
                  info
                </span>
                <p className="text-[12px] text-red-900 leading-snug">
                  Transfusion reservation locks requested units for 120 minutes while family or ambulance courier travels to {hospital.name}.
                </p>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-600 font-semibold mb-1">
                  Patient Full Name *
                </label>
                <input
                  required
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="e.g. S. Karthikeyan"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#91000a] text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-600 font-semibold mb-1">
                    Blood Group *
                  </label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#91000a] text-sm font-semibold text-[#91000a] bg-white"
                  >
                    {(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] as BloodGroup[]).map((grp) => (
                      <option key={grp} value={grp}>
                        {grp}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-600 font-semibold mb-1">
                    Units Needed
                  </label>
                  <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setUnits(Math.max(1, units - 1))}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-bold text-sm">{units}</span>
                    <button
                      type="button"
                      onClick={() => setUnits(Math.min(6, units + 1))}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-600 font-semibold mb-1">
                  Required Component
                </label>
                <select
                  value={component}
                  onChange={(e) => setComponent(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#91000a] text-sm bg-white"
                >
                  <option value="Whole Blood">Whole Blood (WB)</option>
                  <option value="PRBC">Packed Red Blood Cells (PRBC)</option>
                  <option value="Apheresis Platelets">Apheresis Single Donor Platelets (SDP)</option>
                  <option value="FFP">Fresh Frozen Plasma (FFP)</option>
                  <option value="Cryoprecipitate">Cryoprecipitate</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-600 font-semibold mb-1">
                  Recipient Hospital / Clinic in Coimbatore
                </label>
                <input
                  type="text"
                  value={patientHospital}
                  onChange={(e) => setPatientHospital(e.target.value)}
                  placeholder="e.g. Ganga Hospital ICU or Coimbatore Medical College"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#91000a] text-sm"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-600 font-semibold mb-1">
                  Attender Mobile Number *
                </label>
                <input
                  required
                  type="tel"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  placeholder="e.g. 98420 12345"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-[#91000a] text-sm"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 px-3 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 px-3 rounded-lg bg-[#91000a] hover:bg-[#a6000c] text-white font-bold text-sm flex items-center justify-center gap-1.5 shadow-md active:scale-95 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Reserving...</span>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[18px]">verified</span>
                      <span>Lock Reservation</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
