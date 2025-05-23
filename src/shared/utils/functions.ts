import { IAecoCoords } from '@common/domain/Types'
import { lookup } from 'geoip-lite'
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

/**
 * The function `currentDateTZ` returns the current date and time in the 'America/Mexico_City' time zone.
 * @returns A Date object representing the current date and time in the 'America/Mexico_City' time zone.
 */
export const currentDateTZ = (): Date => {
  const timeZone = 'America/Mexico_City'
  return DateTime.now().setZone(timeZone).toJSDate()
}

/**
 * The function `formatDate` takes a Date object, converts it to a specific time zone and locale, and returns the
 * date in the format 'yyyy-MM-dd'.
 * @param {Date} date - A JavaScript Date object that represents a specific date and time.
 * @returns The `formatDate` function returns a formatted date string in the format 'yyyy-MM-dd'.
 */
export const formatDate = (date: Date): string => {
  const dateTime = DateTime.fromJSDate(date, {
    zone: 'America/Mexico_City',
  }).setLocale('es')
  return dateTime.toFormat('yyyy-MM-dd hh:mm:ss a')
}

/**
 * Takes a string as input and removes special characters and slashes, returning a modified version of the input string.
 * @param {string} text - A string representing the file name that needs to be cleared.
 * @returns A modified version of the input `text` string.
 */
export const clearFileName = (text: string) => {
  return text
    .normalize('NFD') // Descompone el string en caracteres base + diacríticos
    .replace(/[&%$#¿?ª°œ@={}+()*~[\]<>,;`|]/g, '') // Elimina caracteres especiales
    .replace(/[\u0300-\u036f]/g, '') // Elimina los diacríticos (acentos)
    .replace(/\//g, ' ') // Elimina las barras
}

/**
 * File name as input and returns a formatted string with a unique key based on the file name and current date and time.
 * @param {string} fileName - The `fileName` parameter is a string that represents the name of a file.
 * @param {string} fileExtension - The `fileExtension` parameter is a string that represents the file extension (e.g., "jpg", "png").
 * @returns a string value.
 */
export const generateFileKey = (fileName: string, fileExtension: string) => {
  return `${fileName.substring(0, fileName.lastIndexOf('.')).toLocaleLowerCase()}!!${DateTime.now().toFormat(
    'yyyyMMddHHmmss',
  )}.${fileExtension}`
}

/**
 * Takes an S3 key as input and returns the file name by extracting it from the key and appending the file extension.
 * @param {string} s3Key - The `s3Key` represents the key or path of a file stored in an S3 bucket.
 * @returns the file name extracted from the given S3 key.
 */
export const getFileName = (s3Key: string): string => {
  const lastDot = s3Key.lastIndexOf('.')
  const fileExtension = s3Key.substring(lastDot + 1)
  const lastSlash = s3Key.lastIndexOf('/')
  const namePart = s3Key.substring(lastSlash + 1, s3Key.indexOf('!!'))

  return `${namePart}.${fileExtension}`
}

export const getCoordsFromIp = (ip: string): IAecoCoords | undefined => {
  if (!ip || ip === '::1') return undefined
  const geo = lookup(ip)
  const [latitude, longitude] = geo?.ll
  return {
    latitude: latitude ? String(latitude) : '',
    longitude: longitude ? String(longitude) : '',
  }
}
