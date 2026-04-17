export type UserRole = "admin" | "zone" | "woreda";

export interface UserProfile {
  uid: string;
  name: string;
  phone: string;
  zone: string;
  woreda: string;
  email: string;
  role: UserRole;
}

export interface Report {
  id: string;
  zone: string;
  woreda: string;
  isPeaceful: boolean;
  crimeType: string;
  stationName: string;
  perpetrators: {
    male: number;
    female: number;
  };
  injuredCount: {
    male: number;
    female: number;
  };
  lightInjuries: {
    male: number;
    female: number;
  };
  heavyInjuries: {
    male: number;
    female: number;
  };
  propertyDamage: string;
  suspectsCaught: boolean;
  exhibit: string;
  description: string;
  reporterName: string;
  reporterPhone: string;
  status: "new" | "viewed";
  createdAt: any; // Firestore Timestamp
  updatedAt: any; // Firestore Timestamp
  createdBy: string;
}

export const ZONES = [
  "መተክል ዞን",
  "አሶሳ ዞን",
  "ከማሽ ዞን",
  "አሶሳ ከተማ አስተዳደር",
  "ግልገል በለስ ከተማ አስተዳደር",
  "ባምባሲ ከተማ አስተዳደር",
  "ከማሽ ከተማ አስተዳደር"
];
