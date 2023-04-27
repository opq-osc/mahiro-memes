import type { IMahiroUse } from 'mahiro'
import getMemeImage, { getAvatar } from '../../http'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-啃') as typeof mahiro.logger

    mahiro.onGroupMessage('啃', async (data) => {
      if (data?.msg?.Content?.startsWith('啃') && data.msg.AtUinLists.length > 0) {
        const target = data.msg.AtUinLists[0].Uin
        const avatar = await getAvatar(mahiro, target)
        const formData = new FormData()
        formData.append('images', avatar)
        getMemeImage('/memes/bite/', formData).then((res) => {
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
