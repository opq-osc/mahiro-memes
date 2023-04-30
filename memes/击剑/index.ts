import type { IMahiroUse } from 'mahiro'
import getMemeImage, { getAvatar } from '../../http'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-击剑') as typeof mahiro.logger

    mahiro.onGroupMessage('击剑', async (data) => {
      if ((data?.msg?.Content?.toLowerCase().includes('击剑') || data?.msg?.Content?.toLowerCase().includes('🤺')) && data?.msg?.AtUinLists?.length > 0) {
        const formData = new FormData()
        const source = data.userId
        const sAvatar = await getAvatar(mahiro, source)
        formData.append('images', sAvatar)
        const target = data.msg.AtUinLists[0].Uin
        const tAvatar = await getAvatar(mahiro, target)
        formData.append('images', tAvatar)
        getMemeImage('/memes/petpet/', formData).then((res) => {
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
