export interface User {
  id: string;
  name: string;
  instagram_id: string;
  phone: string | null;
  birthday_day: number | null;
  birthday_month: number | null;
  current_level_id: string | null;
  created_at: string;
}

export interface Purchase {
  id: string;
  user_id: string;
  amount: number;
  used_referral_code: string | null;
  created_at: string;
}

export interface ReferralCode {
  id: string;
  user_id: string;
  code: string;
  active: boolean;
  created_at: string;
}

export interface Referral {
  id: string;
  referrer_id: string;
  referred_user_id: string;
  created_at: string;
}

export interface LoyaltyLevel {
  id: string;
  name: "Bronze" | "Silver" | "Gold" | "VIP" | string;
  min_referrals: number;
  discount_percent: number;
  reward_description: string | null;
}

export interface CustomerOverview {
  id: string;
  name: string;
  instagram_id: string;
  phone: string | null;
  birthday_day: number | null;
  birthday_month: number | null;
  created_at: string;
  referral_code: string | null;
  level_name: string;
  discount_percent: number;
  successful_referrals: number;
  total_purchases: number;
  total_spent: number;
}

export interface RecordPurchaseResult {
  purchase_id: string;
  is_first_purchase: boolean;
  referral_code_granted: string | null;
  referral_applied: boolean;
  referrer_id: string | null;
  code_error: string | null;
}

export interface DashboardStats {
  total_customers: number;
  total_purchases: number;
  total_sales: number;
  vip_count: number;
  top_referrers: {
    id: string;
    name: string;
    instagram_id: string;
    successful_referrals: number;
    level_name: string;
  }[];
}

export interface Database {
  public: {
    Tables: {
      users: { Row: User; Insert: Partial<User>; Update: Partial<User> };
      purchases: { Row: Purchase; Insert: Partial<Purchase>; Update: Partial<Purchase> };
      referral_codes: {
        Row: ReferralCode;
        Insert: Partial<ReferralCode>;
        Update: Partial<ReferralCode>;
      };
      referrals: { Row: Referral; Insert: Partial<Referral>; Update: Partial<Referral> };
      loyalty_levels: {
        Row: LoyaltyLevel;
        Insert: Partial<LoyaltyLevel>;
        Update: Partial<LoyaltyLevel>;
      };
    };
    Views: {
      customer_overview: { Row: CustomerOverview };
    };
    Functions: {
      record_purchase: {
        Args: { p_user_id: string; p_amount: number; p_referral_code: string | null };
        Returns: RecordPurchaseResult;
      };
      refresh_user_level: {
        Args: { p_user_id: string };
        Returns: void;
      };
    };
  };
}
