export const FIELDS = [
  'id',
  'name',
  'email',
  'phone',
  'source',
  'interest_product',
  'budget',
  'created_at',
]

export const FIELDS_MAP = {
  id: 'Id',
  name: 'Nombre',
  email: 'Email',
  phone: 'Teléfono',
  source: 'Fuente',
  interest_product: 'Producto de interés',
  budget: 'Presupuesto',
  created_at: 'Fecha de creación',
}

export const SOURCES = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  landing_page: 'Landing page',
  referred: 'Referido',
  other: 'Otro',
}

export const SOURCES_FIELDS = Object.entries(SOURCES).map(([value, label]) => ({
  value,
  label,
}))
