import type { IMahiroUse } from 'mahiro'
import getMemeImage, { getImage } from '../../http'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-追火车') as typeof mahiro.logger

    mahiro.onGroupMessage('追火车', async (data) => {
      if (data?.msg?.Content === '追火车' && (data?.msg?.Images?.length > 0 || data?.msg?.AtUinLists?.length > 0)) {
        const formData = new FormData()
        const imageData = await getImage(mahiro, data)
        formData.append('images', imageData)
        getMemeImage('/memes/chase_train/', formData).then((res) => {
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
