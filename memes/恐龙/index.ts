import type { IMahiroUse } from 'mahiro'
import getMemeImage, { getAvatar } from '../../http'
import ky from 'ky'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-恐龙') as typeof mahiro.logger

    mahiro.onGroupMessage('恐龙', async (data) => {
      if (data?.msg?.Content === '恐龙') {
        const formData = new FormData()
        const imageData = await getAvatar(mahiro, data.userId)
        formData.append('images', imageData)
        getMemeImage('/memes/dinosaur/', formData).then((res) => {
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
