export type Lead = {
  id: string | number
  name: string
  email: string
  phone?: string
  source: "instagram" | "facebook" | "landing_page" | "referred" | "other"
  interest_product?: string
  budget?: number
  created_at: Date | string
}

export enum Sources {
  instagram = "Instagram",
  facebook = "Facebook",
  landing_page = "Landing page",
  referred = "Referido",
  other = "Otro"
}
