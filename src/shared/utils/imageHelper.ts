export const processImagesInJson = async (
  json: Record<string, any>,
  callback: (key: string) => Promise<string | null>,
) => {
  const traverseObject = async (obj: any) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key]
        if (
          key.includes('img') ||
          key.includes('icon') ||
          key.includes('key')
        ) {
          const newValue = await callback(value)
          if (newValue !== null) {
            obj[key] = newValue
          }
        } else if (typeof value === 'object') {
          await traverseObject(value)
        }
      }
    }
  }

  await traverseObject(json)
  return json
}
