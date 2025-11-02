export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      data_source: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      org: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          name: string
          organisation_size:
            | Database["public"]["Enums"]["organisation_size"]
            | null
          plan: Database["public"]["Enums"]["plans"]
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          name: string
          organisation_size?:
            | Database["public"]["Enums"]["organisation_size"]
            | null
          plan?: Database["public"]["Enums"]["plans"]
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          name?: string
          organisation_size?:
            | Database["public"]["Enums"]["organisation_size"]
            | null
          plan?: Database["public"]["Enums"]["plans"]
        }
        Relationships: [
          {
            foreignKeyName: "org_created_by_user_id_fk"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      org_data_source_status: {
        Row: {
          connected: boolean
          data_source_id: string
          org_id: string
        }
        Insert: {
          connected?: boolean
          data_source_id: string
          org_id: string
        }
        Update: {
          connected?: boolean
          data_source_id?: string
          org_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "org_data_source_status_data_source_id_data_source_id_fk"
            columns: ["data_source_id"]
            isOneToOne: false
            referencedRelation: "data_source"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "org_data_source_status_org_id_org_id_fk"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "org"
            referencedColumns: ["id"]
          },
        ]
      }
      org_member: {
        Row: {
          id: string
          joined_at: string | null
          org_id: string
          role_id: string | null
          user_id: string
        }
        Insert: {
          id?: string
          joined_at?: string | null
          org_id: string
          role_id?: string | null
          user_id: string
        }
        Update: {
          id?: string
          joined_at?: string | null
          org_id?: string
          role_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "org_member_org_id_org_id_fk"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "org"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "org_member_role_id_org_role_id_fk"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "org_role"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "org_member_user_id_user_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      org_role: {
        Row: {
          id: string
          name: string
          org_id: string
        }
        Insert: {
          id?: string
          name: string
          org_id: string
        }
        Update: {
          id?: string
          name?: string
          org_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "org_role_org_id_org_id_fk"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "org"
            referencedColumns: ["id"]
          },
        ]
      }
      org_role_permissions: {
        Row: {
          can_view: boolean
          data_source_id: string
          org_id: string
          role_id: string
        }
        Insert: {
          can_view?: boolean
          data_source_id: string
          org_id: string
          role_id: string
        }
        Update: {
          can_view?: boolean
          data_source_id?: string
          org_id?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "org_role_permissions_data_source_id_data_source_id_fk"
            columns: ["data_source_id"]
            isOneToOne: false
            referencedRelation: "data_source"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "org_role_permissions_org_id_org_id_fk"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "org"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "org_role_permissions_role_id_org_role_id_fk"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "org_role"
            referencedColumns: ["id"]
          },
        ]
      }
      org_settings: {
        Row: {
          billing_email: string | null
          org_id: string
        }
        Insert: {
          billing_email?: string | null
          org_id: string
        }
        Update: {
          billing_email?: string | null
          org_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "org_settings_org_id_org_id_fk"
            columns: ["org_id"]
            isOneToOne: true
            referencedRelation: "org"
            referencedColumns: ["id"]
          },
        ]
      }
      shopify_order_fact: {
        Row: {
          created_at: string
          currency: string
          order_id: string
          org_id: string
          shop_id: string
          total_price: number
        }
        Insert: {
          created_at: string
          currency: string
          order_id: string
          org_id: string
          shop_id: string
          total_price: number
        }
        Update: {
          created_at?: string
          currency?: string
          order_id?: string
          org_id?: string
          shop_id?: string
          total_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "shopify_order_fact_org_id_org_id_fk"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "org"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          self_description:
            | Database["public"]["Enums"]["self_description"]
            | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id: string
          self_description?:
            | Database["public"]["Enums"]["self_description"]
            | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          self_description?:
            | Database["public"]["Enums"]["self_description"]
            | null
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          date_preset: Database["public"]["Enums"]["date_preset"]
          timezone: string
          updated_at: string
          user_id: string
        }
        Insert: {
          date_preset?: Database["public"]["Enums"]["date_preset"]
          timezone?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          date_preset?: Database["public"]["Enums"]["date_preset"]
          timezone?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_settings_user_id_user_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      daily_kpis: {
        Row: {
          daily_sales: number | null
        }
        Relationships: []
      }
      user_memberships: {
        Row: {
          org_id: string | null
          org_name: string | null
          org_plan: Database["public"]["Enums"]["plans"] | null
          role_id: string | null
          role_name: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "org_member_org_id_org_id_fk"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "org"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "org_member_role_id_org_role_id_fk"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "org_role"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "org_member_user_id_user_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      can_view_datasource: {
        Args: { p_data_source_id: string; p_org_id: string }
        Returns: boolean
      }
      get_users_org_id: { Args: never; Returns: string }
      is_org_admin: { Args: { p_org_id: string }; Returns: boolean }
      is_org_member: { Args: { p_org_id: string }; Returns: boolean }
      is_org_owner: { Args: { p_org_id: string }; Returns: boolean }
      user_role_in_org: { Args: { p_org_id: string }; Returns: string }
    }
    Enums: {
      date_preset:
        | "Yesterday"
        | "Last 7 days"
        | "Last 30 days"
        | "Last 60 days"
        | "Last 90 days"
        | "Last 365 days"
        | "This week to yesterday"
        | "Last week"
        | "2 weeks ago"
        | "This week last year"
        | "This week to yesterday last year"
        | "This month to yesterday"
        | "Last month"
        | "2 months ago"
        | "This month last year"
        | "This month to yesterday last year"
        | "This quarter to yesterday"
        | "Last quarter"
        | "2 quarters ago"
        | "This quarter last year"
        | "This quarter to yesterday last year"
        | "This year to yesterday"
        | "Last year"
        | "2 years ago"
        | "Last year to yesterday"
      member_role: "owner" | "admin" | "viewer"
      organisation_size: "1-5" | "6-20" | "21-100" | "+100"
      plans: "starter" | "basic" | "premium"
      self_description:
        | "runs_company"
        | "employee"
        | "agency"
        | "freelancer"
        | "investor"
        | "exploring"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      date_preset: [
        "Yesterday",
        "Last 7 days",
        "Last 30 days",
        "Last 60 days",
        "Last 90 days",
        "Last 365 days",
        "This week to yesterday",
        "Last week",
        "2 weeks ago",
        "This week last year",
        "This week to yesterday last year",
        "This month to yesterday",
        "Last month",
        "2 months ago",
        "This month last year",
        "This month to yesterday last year",
        "This quarter to yesterday",
        "Last quarter",
        "2 quarters ago",
        "This quarter last year",
        "This quarter to yesterday last year",
        "This year to yesterday",
        "Last year",
        "2 years ago",
        "Last year to yesterday",
      ],
      member_role: ["owner", "admin", "viewer"],
      organisation_size: ["1-5", "6-20", "21-100", "+100"],
      plans: ["starter", "basic", "premium"],
      self_description: [
        "runs_company",
        "employee",
        "agency",
        "freelancer",
        "investor",
        "exploring",
      ],
    },
  },
} as const
