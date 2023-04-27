import type { IMahiroUse } from 'mahiro'
import getImage, { getAvatar } from '../../http'
import ky from 'ky'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-鼓掌') as typeof mahiro.logger

    mahiro.onGroupMessage('鼓掌', async (data) => {
      if (data?.msg?.Content === '鼓掌') {
        const formData = new FormData()
        const imageData = await getAvatar(mahiro, data.userId)
        formData.append('images', imageData)
        getImage('/memes/alike/', formData).then((res) => {
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
