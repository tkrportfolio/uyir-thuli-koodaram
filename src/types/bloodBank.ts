export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';

export interface BloodStockItem {
  group: BloodGroup;
  units: number;
  status: 'normal' | 'ample' | 'low' | 'critical' | 'out_of_stock' | 'reserved';
  label: string;
}

export interface BloodBank {
  id: string;
  name: string;
  areaTag: 'avinashi' | 'rspuram' | 'trichy' | 'gandhipuram' | 'all';
  areaName: string;
  address: string;
  badge: {
    text: string;
    variant: 'nabh' | 'rotary' | 'trauma' | 'ngo' | 'gov';
    iconName: string;
  };
  distance: string;
  eta: string;
  phone: string;
  verified24x7: boolean;
  borderAccentColor: string;
  stocks: BloodStockItem[];
  components: string[];
  alertNotice?: string;
  subsidizedInfo?: string;
  updatedTimeText: string;
  doctorInCharge?: string;
  specialty?: string;
  latitude: number;
  longitude: number;
}

export interface EmergencyRequest {
  id: string;
  patientName: string;
  hospital: string;
  bloodGroup: BloodGroup;
  units: number;
  component: string;
  urgency: 'Immediate (Trauma)' | 'Within 2 Hours' | 'Within 6 Hours';
  contactPhone: string;
  notes?: string;
  timestamp: string;
  status: 'active' | 'matched' | 'dispatched' | 'fulfilled';
  matchedDonorsCount?: number;
}

export interface TransitOrder {
  id: string;
  trackingCode: string;
  sourceHospital: string;
  destinationHospital: string;
  bloodGroup: BloodGroup;
  units: number;
  courierName: string;
  courierPhone: string;
  vehicleType: 'Emergency Courier Bike' | '108 Ambulance Green Corridor';
  temperatureCelsius: number;
  etaMinutes: number;
  status: 'Dispatched' | 'En Route' | 'Corridor Cleared' | 'Delivered';
  progressPercent: number;
  currentCheckpoint: string;
  checkpoints: { name: string; status: 'passed' | 'current' | 'upcoming'; time: string }[];
}

export interface DonationCamp {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  organizer: string;
  registeredCount: number;
  targetUnits: number;
}
