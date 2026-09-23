import React, { useState, useEffect } from 'react';
import { INITIAL_TRANSIT_ORDERS } from '../data/bloodBanksData';
import { TransitOrder } from '../types/bloodBank';

interface LiveTrackScreenProps {
  onCallSuccessToast: (msg: string) => void;
}

export const LiveTrackScreen: React.FC<LiveTrackScreenProps> = ({ onCallSuccessToast }) => {
  const [orders, setOrders] = useState<TransitOrder[]>(INITIAL_TRANSIT_ORDERS);
  const [selectedOrderId, setSelectedOrderId] = useState<string>(INITIAL_TRANSIT_ORDERS[0].id);

  const currentOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  // Micro progress tick simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setOrders((prev) =>
        prev.map((ord) => {
          if (ord.progressPercent >= 98) return ord;
          return {
            ...ord,
            progressPercent: Math.min(99, ord.progressPercent + 1),
            temperatureCelsius: Number((3.7 + Math.random() * 0.3).toFixed(1)),
          };
        })
      );
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col w-full px-4 pb-28 gap-4 pt-2 max-w-xl mx-auto">
      {/* Header Info */}
      <div className="bg-[#f2f3ff] rounded-2xl p-4 border border-slate-200/70 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#91000a] text-white flex items-center justify-center shadow">
              <span className="material-symbols-outlined text-[20px]">near_me</span>
            </div>
            <div>
              <h2 className="font-bold text-[17px] text-[#131b2e] leading-tight">
                Coimbatore Green Corridor Live
              </h2>
              <span className="font-mono text-[11px] text-[#005035] font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#005035] animate-ping"></span>
                Police Priority Clearance Active
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="font-mono text-[10px] text-slate-500 uppercase block">Active Trips</span>
            <span className="font-mono text-base font-bold text-[#91000a]">2 In Transit</span>
          </div>
        </div>

        {/* Tab switch between orders */}
        <div className="flex gap-2 mt-3 pt-2 border-t border-slate-200/60">
          {orders.map((ord) => {
            const isSel = ord.id === selectedOrderId;
            return (
              <button
                key={ord.id}
                onClick={() => setSelectedOrderId(ord.id)}
                className={`flex-1 py-2 px-2.5 rounded-lg text-left transition-all border ${
                  isSel
                    ? 'bg-white border-[#91000a] shadow-xs'
                    : 'bg-white/60 border-transparent hover:bg-white text-slate-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-slate-500">
                    {ord.trackingCode}
                  </span>
                  <span className="font-mono text-[11px] font-black text-[#91000a]">
                    {ord.bloodGroup}
                  </span>
                </div>
                <div className="font-bold text-[12px] text-slate-900 truncate mt-0.5">
                  {ord.destinationHospital.split(' ')[0]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Active Tracking Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-4 space-y-4">
        {/* Route Snapshot */}
        <div className="flex items-start justify-between">
          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-red-100 text-[#91000a] font-mono text-[10px] font-bold">
                {currentOrder.vehicleType}
              </span>
              <span className="text-[10px] font-mono text-slate-500">{currentOrder.trackingCode}</span>
            </div>
            <h3 className="font-extrabold text-[17px] text-[#131b2e] leading-snug">
              {currentOrder.destinationHospital}
            </h3>
            <p className="text-[12px] text-slate-500 font-medium">
              From: {currentOrder.sourceHospital}
            </p>
          </div>

          <div className="flex flex-col items-end shrink-0 pl-2">
            <span className="font-mono text-2xl font-black text-[#91000a] leading-tight">
              ~{currentOrder.etaMinutes} min
            </span>
            <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase">
              Estimated Arrival
            </span>
          </div>
        </div>

        {/* Cold Chain & Pack Telemetry Bar */}
        <div className="grid grid-cols-3 gap-2 bg-[#f2f3ff] p-3 rounded-xl border border-slate-200/60">
          <div className="text-center">
            <span className="font-mono text-[10px] text-slate-500 block uppercase">Blood Pack</span>
            <span className="font-mono text-base font-black text-[#91000a]">
              {currentOrder.bloodGroup} ({currentOrder.units} Units)
            </span>
          </div>
          <div className="text-center border-x border-slate-200">
            <span className="font-mono text-[10px] text-slate-500 block uppercase">Cold Box Temp</span>
            <span className="font-mono text-base font-black text-[#005035]">
              {currentOrder.temperatureCelsius}°C
            </span>
            <span className="text-[9px] text-[#005035] font-bold block">Optimal 2-6°C</span>
          </div>
          <div className="text-center">
            <span className="font-mono text-[10px] text-slate-500 block uppercase">Status</span>
            <span className="font-mono text-xs font-bold text-slate-800 block mt-0.5">
              {currentOrder.status}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-500 font-medium">Route Completion</span>
            <span className="text-[#91000a] font-bold">{currentOrder.progressPercent}%</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div
              className="h-full bg-gradient-to-r from-[#91000a] to-[#d8363a] rounded-full transition-all duration-700 relative"
              style={{ width: `${currentOrder.progressPercent}%` }}
            >
              <span className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow border border-red-500"></span>
            </div>
          </div>
          <div className="flex justify-between text-[11px] text-slate-500">
            <span>Avinashi Corridor</span>
            <span className="text-[#131b2e] font-semibold">
              Currently Passing: {currentOrder.currentCheckpoint}
            </span>
          </div>
        </div>

        {/* Courier / Volunteer Profile & Contact */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-full bg-[#91000a]/10 text-[#91000a] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">two_wheeler</span>
            </div>
            <div className="min-w-0">
              <span className="font-bold text-xs text-slate-900 block truncate">
                {currentOrder.courierName}
              </span>
              <span className="text-[11px] text-slate-500 block font-mono">
                {currentOrder.courierPhone}
              </span>
            </div>
          </div>

          <a
            href={`tel:${currentOrder.courierPhone.replace(/[^0-9]/g, '')}`}
            onClick={() => onCallSuccessToast(`Connecting to volunteer courier ${currentOrder.courierName}`)}
            className="px-3 py-2 bg-[#91000a] text-white rounded-lg font-bold text-xs flex items-center gap-1 shadow-sm active:scale-95 shrink-0"
          >
            <span className="material-symbols-outlined text-[16px]">call</span>
            <span>Call Driver</span>
          </a>
        </div>

        {/* Checkpoint Milestones */}
        <div className="space-y-2 pt-1">
          <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500 font-bold block">
            Corridor Waypoints
          </span>
          <div className="space-y-2 relative pl-4 border-l-2 border-slate-200 ml-2">
            {currentOrder.checkpoints.map((cp, idx) => {
              const isPassed = cp.status === 'passed';
              const isCurrent = cp.status === 'current';

              return (
                <div key={idx} className="relative flex items-center justify-between text-xs py-0.5">
                  {/* Dot */}
                  <div
                    className={`absolute -left-[23px] w-3 h-3 rounded-full border-2 border-white ${
                      isPassed
                        ? 'bg-emerald-600'
                        : isCurrent
                        ? 'bg-[#91000a] ring-2 ring-red-200 animate-pulse'
                        : 'bg-slate-300'
                    }`}
                  ></div>

                  <div className="flex flex-col min-w-0">
                    <span
                      className={`font-medium truncate ${
                        isCurrent
                          ? 'text-[#91000a] font-bold'
                          : isPassed
                          ? 'text-slate-800'
                          : 'text-slate-400'
                      }`}
                    >
                      {cp.name}
                    </span>
                  </div>

                  <span className="font-mono text-[11px] text-slate-500 shrink-0 pl-2">
                    {cp.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Corridor Notice Banner */}
      <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2.5 text-amber-900 text-xs">
        <span className="material-symbols-outlined text-[20px] text-amber-700 shrink-0">
          traffic
        </span>
        <p className="leading-snug">
          Coimbatore City Traffic Police have enabled automated green light priority along Avinashi Road and Trichy Road for this consignment.
        </p>
      </div>
    </div>
  );
};
