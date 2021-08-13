export default function formatPrice(value: string) {
  if (!value) return ''

  value = value.toString()
  return value.replace(/\./g, ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
