import React, { useState } from 'react';
import { APP_ASSETS, UPCOMING_CAMPS } from '../data/bloodBanksData';
import { BloodGroup } from '../types/bloodBank';

interface DonorHubScreenProps {
  onCallSuccessToast: (msg: string) => void;
  onOpenProfile: () => void;
}

export const DonorHubScreen: React.FC<DonorHubScreenProps> = ({
  onCallSuccessToast,
  onOpenProfile,
}) => {
  const [registered, setRegistered] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('O+');
  const [area, setArea] = useState('Avinashi Road');
  const [whatsapp, setWhatsapp] = useState('');
  const [readyForEmergency, setReadyForEmergency] = useState(true);

  // Eligibility quiz state
  const [eligibilityStep, setEligibilityStep] = useState<'prompt' | 'checking' | 'eligible' | 'not-eligible'>('prompt');
  const [ageOk, setAgeOk] = useState(true);
  const [weightOk, setWeightOk] = useState(true);
  const [timeOk, setTimeOk] = useState(true);

  // Rapid volunteer pledge button
  const [pledged, setPledged] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim() || !whatsapp.trim()) return;

    setRegistered(true);
    onCallSuccessToast(`Welcome to Coimbatore Donors, ${donorName}! Your volunteer pass is ready.`);
  };

  const handlePledgeImmediate = () => {
    setPledged(true);
    onCallSuccessToast('Thank you! Coimbatore hospital trauma banks have been notified of your availability.');
  };

  const handleRunEligibility = () => {
    if (ageOk && weightOk && timeOk) {
      setEligibilityStep('eligible');
    } else {
      setEligibilityStep('not-eligible');
    }
  };

  return (
    <div className="flex flex-col w-full px-4 pb-28 gap-4 pt-2 max-w-xl mx-auto">
      {/* Community Hero Card with Hotlinked Organizer Photo (Image 1) */}
      <div className="bg-gradient-to-br from-[#91000a] via-[#b71c1c] to-[#410002] text-white rounded-2xl shadow-md p-4 overflow-hidden relative">
        <div className="flex items-center gap-3 relative z-10">
          <div className="relative shrink-0">
            <img
              src={APP_ASSETS.organizerPhoto}
              alt="Coimbatore Donors Volunteer"
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-red-300"
            />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-[10px]">
              ✓
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <span className="font-mono text-[10px] uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full font-bold">
              Volunteer Community
            </span>
            <h2 className="text-lg font-black tracking-tight leading-tight mt-1">
              Coimbatore Donors Network
            </h2>
            <p className="text-[12px] text-red-100 mt-0.5 truncate">
              1,240+ citizen life-savers across Kovai
            </p>
          </div>

          <button
            onClick={onOpenProfile}
            className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-all text-xs font-semibold shrink-0"
          >
            Coordinator
          </button>
        </div>

        {/* Rapid Response Shortage Banner */}
        <div className="mt-4 p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 flex items-center justify-between gap-2">
          <div className="space-y-0.5 min-w-0">
            <div className="flex items-center gap-1.5 text-yellow-300 font-mono text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping"></span>
              <span>URGENT SHORTAGE: O- & AB-</span>
            </div>
            <p className="text-[11px] text-red-100 truncate">
              Critical depletion at KMCH & PSG Hospitals today.
            </p>
          </div>

          <button
            onClick={handlePledgeImmediate}
            disabled={pledged}
            className="px-3 py-2 rounded-lg bg-white text-[#91000a] font-extrabold text-xs shadow-md active:scale-95 transition-all shrink-0 hover:bg-red-50 disabled:opacity-80"
          >
            {pledged ? 'Pledged! ✓' : 'I Can Donate Now'}
          </button>
        </div>
      </div>

      {/* Volunteer Registration / Digital Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#91000a] text-[20px]">
              badge
            </span>
            <h3 className="font-bold text-base text-[#131b2e]">
              {registered ? 'Your Coimbatore Volunteer Pass' : 'Become a Coimbatore Life-Saver'}
            </h3>
          </div>
          <span className="font-mono text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-200">
            Verified Network
          </span>
        </div>

        {registered ? (
          <div className="space-y-3">
            {/* Digital Donor Pass */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-dashed border-red-300 rounded-2xl p-4 relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase text-[#91000a] font-bold">
                    Official Coimbatore Life-Saver Pass
                  </span>
                  <h4 className="text-xl font-black text-[#131b2e] mt-1">{donorName}</h4>
                  <p className="text-xs text-slate-600">{area}, Coimbatore</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#91000a] text-white flex flex-col items-center justify-center font-mono font-black shadow-md">
                  <span className="text-sm leading-none">{bloodGroup}</span>
                  <span className="text-[8px] uppercase">Donor</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-red-200/70 text-[11px]">
                <div>
                  <span className="text-slate-500 block font-mono">Volunteer ID:</span>
                  <span className="font-mono font-bold text-slate-800">CBE-VOL-9821</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-mono">Status:</span>
                  <span className="font-bold text-emerald-700">Available for Dispatch</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setRegistered(false)}
                className="flex-1 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700"
              >
                Edit Information
              </button>
              <button
                onClick={() => onCallSuccessToast('Digital ID card copied to device clipboard!')}
                className="flex-1 py-2 rounded-lg bg-[#91000a] text-white text-xs font-bold shadow-sm"
              >
                Save Pass
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-3">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">
                Your Full Name *
              </label>
              <input
                required
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="e.g. S. Anand Kumar"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#91000a]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">
                  Blood Group *
                </label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none font-bold text-[#91000a] bg-white"
                >
                  {(['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'] as BloodGroup[]).map((grp) => (
                    <option key={grp} value={grp}>
                      {grp}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">
                  Primary Area *
                </label>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none bg-white"
                >
                  <option value="Avinashi Road">Avinashi Road</option>
                  <option value="RS Puram">RS Puram</option>
                  <option value="Gandhipuram">Gandhipuram</option>
                  <option value="Trichy Road">Trichy Road</option>
                  <option value="Peelamedu">Peelamedu</option>
                  <option value="Saibaba Colony">Saibaba Colony</option>
                  <option value="Saravanampatti">Saravanampatti</option>
                  <option value="Singanallur">Singanallur</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">
                WhatsApp / Mobile Number *
              </label>
              <input
                required
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="e.g. 98421 99887"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#91000a]"
              />
            </div>

            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={readyForEmergency}
                onChange={(e) => setReadyForEmergency(e.target.checked)}
                className="rounded text-[#91000a] focus:ring-[#91000a]"
              />
              <span>Available for emergency green corridor notifications</span>
            </label>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#91000a] text-white font-bold text-sm rounded-xl shadow hover:bg-[#a6000c] active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
              <span>Join Coimbatore Donors</span>
            </button>
          </form>
        )}
      </div>

      {/* Donation Eligibility Self-Assessment */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#005035] text-[20px]">
              health_and_safety
            </span>
            <h3 className="font-bold text-sm text-[#131b2e]">Can I Donate Blood Today?</h3>
          </div>
          <span className="font-mono text-[10px] text-slate-500">60-sec Check</span>
        </div>

        {eligibilityStep === 'prompt' && (
          <div className="space-y-2.5 text-xs text-slate-700">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={ageOk}
                onChange={(e) => setAgeOk(e.target.checked)}
                className="rounded text-[#005035]"
              />
              <span>I am between 18 and 65 years old</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={weightOk}
                onChange={(e) => setWeightOk(e.target.checked)}
                className="rounded text-[#005035]"
              />
              <span>My body weight is above 45 kg (Hb &gt; 12.5 g/dL)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={timeOk}
                onChange={(e) => setTimeOk(e.target.checked)}
                className="rounded text-[#005035]"
              />
              <span>It has been at least 90 days since my last blood donation</span>
            </label>

            <button
              onClick={handleRunEligibility}
              className="w-full py-2 bg-[#005035] text-white rounded-lg font-bold text-xs shadow-xs hover:bg-[#006b48]"
            >
              Check My Eligibility
            </button>
          </div>
        )}

        {eligibilityStep === 'eligible' && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1.5 animate-fade-in">
            <div className="flex items-center gap-1.5 text-emerald-900 font-bold text-xs">
              <span className="material-symbols-outlined text-[18px] text-emerald-700">
                check_circle
              </span>
              <span>You are Eligible to Donate!</span>
            </div>
            <p className="text-[11px] text-emerald-800">
              Visit any Coimbatore blood center or sign up for an upcoming camp below. One donation can save up to 3 lives.
            </p>
            <button
              onClick={() => setEligibilityStep('prompt')}
              className="text-[10px] text-emerald-700 font-mono underline block mt-1"
            >
              Re-check criteria
            </button>
          </div>
        )}

        {eligibilityStep === 'not-eligible' && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1.5 animate-fade-in">
            <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
              <span className="material-symbols-outlined text-[18px] text-amber-700">info</span>
              <span>Deferral Advisory</span>
            </div>
            <p className="text-[11px] text-amber-800">
              You do not meet one of the primary medical safety standards today (age, weight, or 90-day rest interval). You can still assist as a volunteer logistics courier!
            </p>
            <button
              onClick={() => setEligibilityStep('prompt')}
              className="text-[10px] text-amber-800 font-mono underline block mt-1"
            >
              Try again
            </button>
          </div>
        )}
      </div>

      {/* Upcoming Coimbatore Blood Donation Camps */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#8f706c] font-bold">
            Upcoming Donation Camps in Coimbatore
          </span>
        </div>

        {UPCOMING_CAMPS.map((camp) => (
          <div
            key={camp.id}
            className="bg-white rounded-xl p-3.5 shadow-xs border border-slate-200/80 space-y-2"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="font-mono text-[10px] text-[#91000a] font-bold uppercase bg-red-50 px-2 py-0.5 rounded">
                  {camp.date}
                </span>
                <h4 className="font-bold text-sm text-[#131b2e] mt-1">{camp.title}</h4>
                <p className="text-[11px] text-slate-600 mt-0.5">{camp.location}</p>
              </div>

              <div className="text-right shrink-0">
                <span className="font-mono text-xs font-bold text-[#005035]">
                  {camp.registeredCount} / {camp.targetUnits}
                </span>
                <span className="font-mono text-[9px] text-slate-500 block">Registered</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
              <span className="text-[11px] text-slate-500 font-mono">{camp.time}</span>
              <button
                onClick={() => onCallSuccessToast(`RSVP confirmed for ${camp.title}!`)}
                className="px-3 py-1.5 bg-[#f2f3ff] hover:bg-[#e2e7ff] text-[#131b2e] font-semibold text-[11px] rounded-lg border border-slate-200"
              >
                Register for Camp
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
