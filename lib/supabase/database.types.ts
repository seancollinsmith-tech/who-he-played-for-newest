export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          is_admin: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          is_admin?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      franchises: {
        Row: {
          id: string;
          lineage_name: string;
          created_at: string;
        };
        Insert: {
          id: string;
          lineage_name: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["franchises"]["Insert"]>;
      };
      teams: {
        Row: {
          id: string;
          franchise_id: string;
          city: string;
          name: string;
          abbreviation: string;
          primary_color: string;
          secondary_color: string;
          display_order: number;
          icon: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          franchise_id: string;
          city: string;
          name: string;
          abbreviation: string;
          primary_color: string;
          secondary_color: string;
          display_order: number;
          icon?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["teams"]["Insert"]>;
      };
      players: {
        Row: {
          id: string;
          full_name: string;
          slug: string;
          image_url: string | null;
          career_start: number;
          career_end: number;
          career_years_label: string;
          difficulty: "easy" | "medium" | "hard";
          active_status: boolean;
          verification_status: "unverified" | "reviewed" | "verified" | "flagged";
          hints: string[];
          source_notes: string | null;
          last_verified_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          slug: string;
          image_url?: string | null;
          career_start: number;
          career_end: number;
          career_years_label: string;
          difficulty: "easy" | "medium" | "hard";
          active_status?: boolean;
          verification_status?: "unverified" | "reviewed" | "verified" | "flagged";
          hints: string[];
          source_notes?: string | null;
          last_verified_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["players"]["Insert"]>;
      };
      player_team_history: {
        Row: {
          id: string;
          player_id: string;
          team_id: string;
          franchise_id: string;
          team_name_used: string;
          first_season: string;
          last_season: string;
          sequence_number: number;
          games_played: number;
          answer_eligible: boolean;
          verification_notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          player_id: string;
          team_id: string;
          franchise_id: string;
          team_name_used: string;
          first_season: string;
          last_season: string;
          sequence_number: number;
          games_played: number;
          answer_eligible?: boolean;
          verification_notes?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["player_team_history"]["Insert"]>;
      };
      daily_games: {
        Row: {
          id: string;
          game_number: number;
          game_date: string;
          player_id: string;
          published: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          game_number: number;
          game_date: string;
          player_id: string;
          published?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["daily_games"]["Insert"]>;
      };
      game_results: {
        Row: {
          id: string;
          user_id: string;
          daily_game_id: string | null;
          player_id: string;
          mode: "daily" | "practice";
          correct_team_ids: string[];
          wrong_team_ids: string[];
          hints_used: number;
          score: number;
          status: "in_progress" | "won" | "lost";
          started_at: string;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          daily_game_id?: string | null;
          player_id: string;
          mode: "daily" | "practice";
          correct_team_ids?: string[];
          wrong_team_ids?: string[];
          hints_used?: number;
          score?: number;
          status?: "in_progress" | "won" | "lost";
          started_at?: string;
          completed_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["game_results"]["Insert"]>;
      };
      user_statistics: {
        Row: {
          user_id: string;
          current_streak: number;
          longest_streak: number;
          last_completed_game_date: string | null;
          total_games_played: number;
          total_wins: number;
          total_score: number;
          perfect_games: number;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          current_streak?: number;
          longest_streak?: number;
          last_completed_game_date?: string | null;
          total_games_played?: number;
          total_wins?: number;
          total_score?: number;
          perfect_games?: number;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["user_statistics"]["Insert"]>;
      };
    };
  };
}
