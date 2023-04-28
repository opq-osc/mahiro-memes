import type { IMahiroUse } from 'mahiro'
import getMemeImage, { getAvatar } from '../../http'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-奶茶') as typeof mahiro.logger

    mahiro.onGroupMessage('奶茶', async (data) => {
      if (/^[喝]{0,1}奶茶/.test(data?.msg?.Content) && data?.msg?.AtUinLists?.length > 0) {
        const formData = new FormData()
        const imageData = await getAvatar(mahiro, data.userId)
        formData.append('images', imageData)
        const pos = ['left', 'right', 'both']
        const args = { position: pos[Math.floor(Math.random() * pos.length)] }
        getMemeImage('/memes/bubble_tea/', formData, args).then((res) => {
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
