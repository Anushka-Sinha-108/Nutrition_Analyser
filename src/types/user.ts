import type { DietaryPreference, NutritionTotals } from './nutrition';

export type UserRole = 'student' | 'admin';

export type UserProfile = {
  id: string;
  displayName: string;
  email: string;
  role: UserRole;
  rollNumber?: string;
  dietaryPreference?: DietaryPreference;
  allergies?: string[];
  dailyTargets?: NutritionTotals;
  profileComplete?: boolean;
};
