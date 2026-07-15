export interface ICoupon {
    code: string
    type: string
    discount: number
    max_uses?: number
    times_used?: number
    valid_to?: string

    // Eksterni (Sportify) popusti
    source?: string // npr. 'sportify'
    scope?: string // npr. 'category' — popust vrijedi samo na određene kategorije
    scope_category_ids?: number[] // ID-evi kategorija na koje se popust primjenjuje (dresovi)
}
