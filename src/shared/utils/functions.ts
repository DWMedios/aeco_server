import { DateTime } from 'luxon'

/**
 * Normalize a string by removing diacritics and special characters.
 * @param str The string to normalize.
 * @returns The normalized string.
 */
export const normalizeString = (str: string): string => {
  return str
    .normalize('NFD') // Descompone el string en caracteres base + diacríticos
    .replace(/[\u0300-\u036f]/g, '') // Elimina los diacríticos (acentos)
    .replace(/[^a-zA-Z0-9 ]/g, '') // Elimina caracteres especiales
}

export const setDateToMidDay = (date: Date): Date | null => {
  const createdAtLuxon = DateTime.fromJSDate(new Date(date), {
    zone: 'America/Mexico_City',
  })
    .set({ hour: 12, minute: 0, second: 0, millisecond: 0 })
    .plus({ days: 1 })

  if (!createdAtLuxon.isValid) return null

  return createdAtLuxon.toJSDate()
}
