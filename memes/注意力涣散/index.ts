import type { IMahiroUse } from 'mahiro'
import getMemeImage, { getAvatar } from '../../http'
import ky from 'ky'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-注意力涣散') as typeof mahiro.logger

    mahiro.onGroupMessage('注意力涣散', async (data) => {
      if (data?.msg?.Content === '注意力涣散') {
        const formData = new FormData()
        const imageData = await getAvatar(mahiro, data.userId)
        formData.append('images', imageData)
        getMemeImage('/memes/distracted/', formData).then((res) => {
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
