export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_task_logs: {
        Row: {
          agent_id: string
          created_at: string | null
          error_message: string | null
          id: string
          input_data: Json | null
          output_data: Json | null
          status: string | null
          task_type: string
          timestamp: string | null
        }
        Insert: {
          agent_id: string
          created_at?: string | null
          error_message?: string | null
          id: string
          input_data?: Json | null
          output_data?: Json | null
          status?: string | null
          task_type: string
          timestamp?: string | null
        }
        Update: {
          agent_id?: string
          created_at?: string | null
          error_message?: string | null
          id?: string
          input_data?: Json | null
          output_data?: Json | null
          status?: string | null
          task_type?: string
          timestamp?: string | null
        }
        Relationships: []
      }
      campaigns: {
        Row: {
          ai_generated: boolean | null
          budget_amount: number | null
          budget_currency: string | null
          channels: string[] | null
          created_at: string | null
          created_by: string | null
          end_date: string | null
          id: string
          last_updated: string | null
          name: string
          objective: string | null
          start_date: string | null
          status: string | null
        }
        Insert: {
          ai_generated?: boolean | null
          budget_amount?: number | null
          budget_currency?: string | null
          channels?: string[] | null
          created_at?: string | null
          created_by?: string | null
          end_date?: string | null
          id?: string
          last_updated?: string | null
          name: string
          objective?: string | null
          start_date?: string | null
          status?: string | null
        }
        Update: {
          ai_generated?: boolean | null
          budget_amount?: number | null
          budget_currency?: string | null
          channels?: string[] | null
          created_at?: string | null
          created_by?: string | null
          end_date?: string | null
          id?: string
          last_updated?: string | null
          name?: string
          objective?: string | null
          start_date?: string | null
          status?: string | null
        }
        Relationships: []
      }
      channel_configurations: {
        Row: {
          campaign_id: string | null
          channel: string
          created_at: string | null
          frequency_cap: number | null
          id: string
          personalization_enabled: boolean | null
          platforms: string[] | null
          send_window_end: string | null
          send_window_start: string | null
          templates: string[] | null
        }
        Insert: {
          campaign_id?: string | null
          channel: string
          created_at?: string | null
          frequency_cap?: number | null
          id?: string
          personalization_enabled?: boolean | null
          platforms?: string[] | null
          send_window_end?: string | null
          send_window_start?: string | null
          templates?: string[] | null
        }
        Update: {
          campaign_id?: string | null
          channel?: string
          created_at?: string | null
          frequency_cap?: number | null
          id?: string
          personalization_enabled?: boolean | null
          platforms?: string[] | null
          send_window_end?: string | null
          send_window_start?: string | null
          templates?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "channel_configurations_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      content_templates: {
        Row: {
          ai_generated: boolean | null
          body: string | null
          channel: string | null
          created_at: string | null
          id: string
          language: string | null
          name: string
          placeholders: string[] | null
          type: string | null
          version: number | null
        }
        Insert: {
          ai_generated?: boolean | null
          body?: string | null
          channel?: string | null
          created_at?: string | null
          id: string
          language?: string | null
          name: string
          placeholders?: string[] | null
          type?: string | null
          version?: number | null
        }
        Update: {
          ai_generated?: boolean | null
          body?: string | null
          channel?: string | null
          created_at?: string | null
          id?: string
          language?: string | null
          name?: string
          placeholders?: string[] | null
          type?: string | null
          version?: number | null
        }
        Relationships: []
      }
      customer_interactions: {
        Row: {
          action: string | null
          campaign_id: string | null
          channel: string | null
          content_id: string | null
          created_at: string | null
          customer_id: string
          id: string
          metadata: Json | null
          timestamp: string | null
        }
        Insert: {
          action?: string | null
          campaign_id?: string | null
          channel?: string | null
          content_id?: string | null
          created_at?: string | null
          customer_id: string
          id?: string
          metadata?: Json | null
          timestamp?: string | null
        }
        Update: {
          action?: string | null
          campaign_id?: string | null
          channel?: string | null
          content_id?: string | null
          created_at?: string | null
          customer_id?: string
          id?: string
          metadata?: Json | null
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_interactions_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customer_interactions_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      offline_activities: {
        Row: {
          actual_reach: number | null
          campaign_id: string | null
          channel_type: string | null
          created_at: string | null
          description: string | null
          end_time: string | null
          expected_reach: number | null
          id: string
          location: string | null
          start_time: string | null
        }
        Insert: {
          actual_reach?: number | null
          campaign_id?: string | null
          channel_type?: string | null
          created_at?: string | null
          description?: string | null
          end_time?: string | null
          expected_reach?: number | null
          id: string
          location?: string | null
          start_time?: string | null
        }
        Update: {
          actual_reach?: number | null
          campaign_id?: string | null
          channel_type?: string | null
          created_at?: string | null
          description?: string | null
          end_time?: string | null
          expected_reach?: number | null
          id?: string
          location?: string | null
          start_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "offline_activities_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      performance_metrics: {
        Row: {
          campaign_id: string | null
          channel: string
          clicks: number | null
          conversion_rate: number | null
          conversions: number | null
          created_at: string | null
          id: string
          impressions: number | null
          opens: number | null
          roi: number | null
          spend: number | null
          unsubscribes: number | null
          updated_at: string | null
        }
        Insert: {
          campaign_id?: string | null
          channel: string
          clicks?: number | null
          conversion_rate?: number | null
          conversions?: number | null
          created_at?: string | null
          id?: string
          impressions?: number | null
          opens?: number | null
          roi?: number | null
          spend?: number | null
          unsubscribes?: number | null
          updated_at?: string | null
        }
        Update: {
          campaign_id?: string | null
          channel?: string
          clicks?: number | null
          conversion_rate?: number | null
          conversions?: number | null
          created_at?: string | null
          id?: string
          impressions?: number | null
          opens?: number | null
          roi?: number | null
          spend?: number | null
          unsubscribes?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "performance_metrics_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      target_audiences: {
        Row: {
          ai_generated: boolean | null
          behavioral_last_interaction_days: string | null
          behavioral_purchases: string | null
          behavioral_website_visits: string | null
          campaign_id: string | null
          channel_preferences: string[] | null
          created_at: string | null
          custom_tags: string[] | null
          demographic_age_range: number[] | null
          demographic_gender: string[] | null
          demographic_location: string[] | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          ai_generated?: boolean | null
          behavioral_last_interaction_days?: string | null
          behavioral_purchases?: string | null
          behavioral_website_visits?: string | null
          campaign_id?: string | null
          channel_preferences?: string[] | null
          created_at?: string | null
          custom_tags?: string[] | null
          demographic_age_range?: number[] | null
          demographic_gender?: string[] | null
          demographic_location?: string[] | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          ai_generated?: boolean | null
          behavioral_last_interaction_days?: string | null
          behavioral_purchases?: string | null
          behavioral_website_visits?: string | null
          campaign_id?: string | null
          channel_preferences?: string[] | null
          created_at?: string | null
          custom_tags?: string[] | null
          demographic_age_range?: number[] | null
          demographic_gender?: string[] | null
          demographic_location?: string[] | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "target_audiences_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
