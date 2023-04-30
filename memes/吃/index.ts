import type { IMahiroUse } from 'mahiro'
import getMemeImage, { getImage } from '../../http'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-吃') as typeof mahiro.logger

    mahiro.onGroupMessage('吃', async (data) => {
      if (data?.msg?.Content?.startsWith('吃') && (data?.msg?.Images?.length > 0 || data?.msg?.AtUinLists?.length > 0)) {
        const imageData = await getImage(mahiro, data)
        const formData = new FormData()
        formData.append('images', imageData)
        getMemeImage('/memes/eat/', formData).then((res) => {
          mahiro.sendGroupMessage({
            groupId: data.groupId,
            fastImage: res
          })
        })
      }
    })
  }
  return use
}
