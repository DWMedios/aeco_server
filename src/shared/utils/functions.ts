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
