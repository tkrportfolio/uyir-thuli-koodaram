import { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav, TabId } from './components/BottomNav';
import { BloodBanksScreen } from './components/BloodBanksScreen';
import { EmergencyScreen } from './components/EmergencyScreen';
import { LiveTrackScreen } from './components/LiveTrackScreen';
import { DonorHubScreen } from './components/DonorHubScreen';
import { ReservationModal } from './components/ReservationModal';
import { ComponentDetailsModal } from './components/ComponentDetailsModal';
import { MapModal } from './components/MapModal';
import { SosEmergencyModal } from './components/SosEmergencyModal';
import { DonorProfileModal } from './components/DonorProfileModal';
import { INITIAL_BLOOD_BANKS } from './data/bloodBanksData';
import { BloodBank, BloodGroup, EmergencyRequest } from './types/bloodBank';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('blood-banks');
  const [bloodBanks] = useState<BloodBank[]>(INITIAL_BLOOD_BANKS);

  // Modals state
  const [reservationHospital, setReservationHospital] = useState<BloodBank | null>(null);
  const [componentDetailsHospital, setComponentDetailsHospital] = useState<BloodBank | null>(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isSosModalOpen, setIsSosModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Toast banner state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 4000);
  };

  const handleReserveSuccess = (code: string, hospitalName: string, bloodGroup: string, units: number) => {
    showToast(`Locked ${units} units of ${bloodGroup} at ${hospitalName}! Token: ${code}`);
  };

  const handleBroadcastSos = (bloodGroup: BloodGroup, hospital: string, units: number) => {
    showToast(`Trauma SOS for ${units} units ${bloodGroup} at ${hospital} broadcasted!`);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-sans selection:bg-red-200">
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-md animate-fade-in pointer-events-none">
          <div className="bg-[#131b2e] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 border border-slate-700 pointer-events-auto">
            <span className="material-symbols-outlined text-[#ffb4ab] text-[20px] shrink-0">
              check_circle
            </span>
            <p className="text-xs font-medium leading-snug flex-1">{toastMessage}</p>
            <button
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white p-1"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        </div>
      )}

      {/* Top Header */}
      <Header
        activeTab={activeTab}
        onOpenSos={() => setIsSosModalOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pt-16 min-h-screen flex flex-col">
        {activeTab === 'blood-banks' && (
          <BloodBanksScreen
            bloodBanks={bloodBanks}
            onReserve={(hospital) => setReservationHospital(hospital)}
            onCheckComponent={(hospital) => setComponentDetailsHospital(hospital)}
            onOpenMap={() => setIsMapModalOpen(true)}
            onSelectHospitalForRoute={(hospital) => {
              setIsMapModalOpen(true);
              showToast(`Navigating to ${hospital.name} (~${hospital.eta})`);
            }}
            onSosClick={() => setIsSosModalOpen(true)}
            onCallSuccessToast={showToast}
          />
        )}

        {activeTab === 'emergency' && (
          <EmergencyScreen
            onCallSuccessToast={showToast}
            onRequestCreated={(req: EmergencyRequest) => {
              showToast(`Emergency requisition created: ${req.id}`);
            }}
          />
        )}

        {activeTab === 'live-track' && (
          <LiveTrackScreen onCallSuccessToast={showToast} />
        )}

        {activeTab === 'donor-hub' && (
          <DonorHubScreen
            onCallSuccessToast={showToast}
            onOpenProfile={() => setIsProfileModalOpen(true)}
          />
        )}
      </main>

      {/* Fixed Bottom Navigation */}
      <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />

      {/* Modals */}
      {reservationHospital && (
        <ReservationModal
          hospital={reservationHospital}
          onClose={() => setReservationHospital(null)}
          onSuccess={handleReserveSuccess}
        />
      )}

      {componentDetailsHospital && (
        <ComponentDetailsModal
          hospital={componentDetailsHospital}
          onClose={() => setComponentDetailsHospital(null)}
          onReserve={(hospital) => {
            setComponentDetailsHospital(null);
            setReservationHospital(hospital);
          }}
        />
      )}

      {isMapModalOpen && (
        <MapModal
          onClose={() => setIsMapModalOpen(false)}
          onSelectHospital={(hospital) => {
            setReservationHospital(hospital);
          }}
        />
      )}

      {isSosModalOpen && (
        <SosEmergencyModal
          onClose={() => setIsSosModalOpen(false)}
          onBroadcastSos={handleBroadcastSos}
        />
      )}

      {isProfileModalOpen && (
        <DonorProfileModal
          onClose={() => setIsProfileModalOpen(false)}
          onOpenRegister={() => {
            setActiveTab('donor-hub');
          }}
        />
      )}
    </div>
  );
}
