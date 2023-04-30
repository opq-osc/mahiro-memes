import type { IMahiroUse } from 'mahiro'
import getMemeImage, { getAvatar } from '../../http'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-防诱拐') as typeof mahiro.logger

    mahiro.onGroupMessage('防诱拐', async (data) => {
      if (data?.msg?.Content?.includes('防诱拐') && data?.msg?.AtUinLists?.length > 0) {
        const formData = new FormData()
        const avatar = await getAvatar(mahiro, data.msg.AtUinLists[0].Uin)
        formData.append('images', avatar)
        getMemeImage('/memes/anti_kidnap/', formData).then((res) => {
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
