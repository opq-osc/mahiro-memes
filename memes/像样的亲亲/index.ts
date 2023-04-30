import type { IMahiroUse } from 'mahiro'
import getMemeImage, { getAvatar } from '../../http'
import ky from 'ky'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-像样的亲亲') as typeof mahiro.logger

    mahiro.onGroupMessage('像样的亲亲', async (data) => {
      if (data?.msg?.Content === '像样的亲亲') {
        const formData = new FormData()
        const imageData = await getAvatar(mahiro, data.userId)
        formData.append('images', imageData)
        getMemeImage('/memes/decent_kiss/', formData).then((res) => {
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
