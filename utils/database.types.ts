export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

  export interface Database {
    public: {
      Tables: {
        profiles: {
          Row: {
             id: string
          username: string
          school_id: string
          role: string
          firstname: string
          lastname: string
          grade: number
          avatar_url: string
          }
          Insert: {
               id: string
          username?: string | null
          school_id?: string | null
          role?: string | null
          firstname?: string | null
          lastname?: string | null
          grade?: number | null
          avatar_url?: string | null
          }
          Update: {
                id: string
          username?: string | null
          school_id?: string | null
          role?: string | null
          firstname?: string | null
          lastname?: string | null
          grade?: number | null
          avatar_url?: string | null
          }
        }
        school: {
          Row : {
            id: string
            creatd_at: string
            name: string
            streetAddress: string
            city: string
            image: string
          }
          Insert: {
              id: string
            creatd_at?: string
            name?: string | null
            streetAddress?: string | null
            city?: string | null
            image?: string | null
          }
          Update: {
                   id: string
            creatd_at?: string
            name?: string | null
            streetAddress?: string | null
            city?: string | null
            image?: string | null
          }
        }
        merits: {
          Row: {
            id: string
            created_at: string
            notes: string
            type: string
            points: number
            approved: boolean
            profile_id: {
                 id: string
          username: string | null
          school_id: string | null
          role: string | null
          firstname: string | null
          lastname: string | null
          grade: number | null
          avatar_url: number | null
            }
            school_id: {
               id: string
            creatd_at: string
            name: string | null
            streetAddress: string | null
            city: string | null
            }
          }
          Update: {
                  id: string
            created_at?: string
            notes?: string
            type?: string
            points?: number
            approved?: boolean
            profile_id?: string
            school_id?: string
          }
          Insert:{
                 id: string
            created_at?: string
            notes?: string
            type?: string
            points?: number
            approved?: boolean
            profile_id?: string
            school_id?: string
          }
        }
        event: {
         Row: {
           id: string
          created_at: string
          name: string
          description: string
          date: string
          time: string
          venue: string
          image: string
          organiser: string
          school_id: string
         }
         Update: {
              id: string
          created_at?: string
          name?: string
          description?: string
          date?: string
          time?: string
          venue?: string
          image?: string
          organiser?: string
          school_id?: string
         }
         Insert: {
              id?: string
          created_at?: string
          name?: string
          description?: string
          date?: string
          time?: string
          venue?: string
          image?: string
          organiser?: string
          school_id?: string
         }
        }
        competition: {
          Row: {
            id:string
            created_at:string
            title: string
            school_id: string
            end_date: string
          }
          Update: {
             id:string
            created_at:string
            title?: string
            school_id?: string
            end_date?: string
          }
             Insert: {
            id:string
            created_at:string
            title?: string
            school_id?: string
            end_date?: string
          }
        }
        prizes: {
          Row: {
            id:string
            created_at: string
            name: string
            image: string
            value: number
            winner: {
                id: string
                username: string
                school_id: string
                role: string
                firstname: string
                lastname: string
                grade: number
                avatar_url: string
            }
            competiton: string
            description: string
          }
          Update: {
             id:string
            created_at: string
            name?: string
            image?: string
            value?: number
            winner?: {
                id: string
                username: string
                school_id: string
                role: string
                firstname: string
                lastname: string
                grade: number
                avatar_url: string
            }
            competiton?: string
            description?: string
          }
          Insert : {
                id:string
            created_at: string
            name?: string
            image?: string
            value?: number
            winner?: {
                id: string
                username: string
                school_id: string
                role: string
                firstname: string
                lastname: string
                grade: number
                avatar_url: string
            }
            competiton?: string
            description?: string
          }
        }
        comments: {
          Row: {
            id: string
            created_at: string;
            content: string
            profile_id: string
            event_id: string
          }
          Update: {
            id: string
            created_at?: string;
            profile_id?: string
            content?: string
            event_id?: string
          }
          Insert: {
             id: string
            created_at?: string;
            profile_id?: string
            content?: string
            event_id?: string
          }
        }
      },

    }
  }


  export type LeaderboardItem = {
    id: string
    username: string
    school_id: string
    role: string
    firstname: string
    lastname: string
    grade: number
    avatar_url: string
    profileid: string
    points: number
    avatar: string
  }
