export const VALID_CONTENT_TYPES = [
  'image/jpeg', // .jpg, .jpeg
  'image/png', // .png
  'image/svg+xml', // .svg
  'image/webp', // .webp
  'image/bmp', // .bmp
  'image/x-icon', // .ico
  'video/mp4', // .mp4
  'video/quicktime', // .mov
  'video/x-msvideo', // .avi
  'video/mpeg', // .mpeg, .mpg
]

export const VALID_ASSET_TYPES = ['image', 'video']

export const VALID_ASSET_EXTENSIONS = [
  'jpg',
  'jpeg',
  'png',
  'svg',
  'webp',
  'bmp',
  'ico',
  'mp4',
  'mov',
  'avi',
  'mpeg',
  'mpg',
]

export const ASSET_TYPE_RULES = {
  image: {
    allowedMimeTypes: [
      'image/jpeg',
      'image/png',
      'image/svg+xml',
      'image/webp',
      'image/bmp',
      'image/x-icon',
    ],
    allowedExtensions: ['jpg', 'jpeg', 'png', 'svg', 'webp', 'bmp', 'ico'],
  },
  video: {
    allowedMimeTypes: [
      'video/mp4',
      'video/quicktime',
      'video/x-msvideo',
      'video/mpeg',
    ],
    allowedExtensions: ['mp4', 'mov', 'avi', 'mpeg', 'mpg'],
  },
}

export const EXTENSION_TO_MIME_TYPE = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  webp: 'image/webp',
  bmp: 'image/bmp',
  ico: 'image/x-icon',
  mp4: 'video/mp4',
  mov: 'video/quicktime',
  avi: 'video/x-msvideo',
  mpeg: 'video/mpeg',
  mpg: 'video/mpeg',
}
