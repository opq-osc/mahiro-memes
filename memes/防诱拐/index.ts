import type { IMahiroUse } from 'mahiro'
import getImage, { getAvatar } from '../../http'
import ky from 'ky'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-防诱拐') as typeof mahiro.logger

    mahiro.onGroupMessage('防诱拐', async (data) => {
      if (data?.msg?.Content?.startsWith('防诱拐') && data?.msg?.AtUinLists?.length > 0) {
        const formData = new FormData()
        const avatar = await getAvatar(mahiro, data.msg.AtUinLists[0].Uin)
        formData.append('images', avatar)
        getImage('/memes/anti_kidnap/', formData).then((res) => {
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
