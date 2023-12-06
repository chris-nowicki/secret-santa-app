export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      event: {
        Row: {
          createdAt: string
          date: string
          id: string
          name: string
          sendReminder: boolean
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          date: string
          id?: string
          name: string
          sendReminder: boolean
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          date?: string
          id?: string
          name?: string
          sendReminder?: boolean
          updatedAt?: string
        }
        Relationships: []
      }
      pairing: {
        Row: {
          createdAt: string
          eventId: string
          id: number
          personId: string
          santaId: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          eventId: string
          id?: number
          personId: string
          santaId: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          eventId?: string
          id?: number
          personId?: string
          santaId?: string
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "pairing_eventId_fkey"
            columns: ["eventId"]
            isOneToOne: false
            referencedRelation: "event"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pairing_personId_fkey"
            columns: ["personId"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pairing_santaId_fkey"
            columns: ["santaId"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
      }
      profile: {
        Row: {
          avatar: string | null
          createdAt: string
          email: string
          firstName: string | null
          id: string
          lastName: string | null
          role: Database["public"]["Enums"]["role"]
          updatedAt: string
        }
        Insert: {
          avatar?: string | null
          createdAt?: string
          email: string
          firstName?: string | null
          id: string
          lastName?: string | null
          role?: Database["public"]["Enums"]["role"]
          updatedAt?: string
        }
        Update: {
          avatar?: string | null
          createdAt?: string
          email?: string
          firstName?: string | null
          id?: string
          lastName?: string | null
          role?: Database["public"]["Enums"]["role"]
          updatedAt?: string
        }
        Relationships: []
      }
      thankYou: {
        Row: {
          createdAt: string
          eventId: string
          id: number
          message: string
          toUserId: string
          userId: string
        }
        Insert: {
          createdAt?: string
          eventId: string
          id?: number
          message: string
          toUserId: string
          userId: string
        }
        Update: {
          createdAt?: string
          eventId?: string
          id?: number
          message?: string
          toUserId?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "thankYou_eventId_fkey"
            columns: ["eventId"]
            isOneToOne: false
            referencedRelation: "event"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "thankYou_toUserId_fkey"
            columns: ["toUserId"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "thankYou_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
      }
      userStatus: {
        Row: {
          eventId: string
          id: number
          status: Database["public"]["Enums"]["inviteStatus"]
          userId: string
        }
        Insert: {
          eventId: string
          id?: number
          status?: Database["public"]["Enums"]["inviteStatus"]
          userId: string
        }
        Update: {
          eventId?: string
          id?: number
          status?: Database["public"]["Enums"]["inviteStatus"]
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "userStatus_eventId_fkey"
            columns: ["eventId"]
            isOneToOne: false
            referencedRelation: "event"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "userStatus_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
        ]
      }
      wishList: {
        Row: {
          createdAt: string
          eventId: string
          id: number
          name: string
          order: number
          siteDescription: string
          siteImage: string
          siteTitle: string
          updatedAt: string
          url: string
          userId: string
        }
        Insert: {
          createdAt?: string
          eventId: string
          id?: number
          name: string
          order: number
          siteDescription: string
          siteImage: string
          siteTitle: string
          updatedAt: string
          url: string
          userId: string
        }
        Update: {
          createdAt?: string
          eventId?: string
          id?: number
          name?: string
          order?: number
          siteDescription?: string
          siteImage?: string
          siteTitle?: string
          updatedAt?: string
          url?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishList_eventId_fkey"
            columns: ["eventId"]
            isOneToOne: false
            referencedRelation: "event"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wishList_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          }
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
      inviteStatus: "INVITED" | "DECLINED" | "ACCEPTED"
      role: "USER" | "ADMIN"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
