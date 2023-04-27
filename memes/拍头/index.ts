import type { IMahiroUse } from 'mahiro'
import getImage, { getAvatar } from '../../http'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-拍头') as typeof mahiro.logger

    mahiro.onGroupMessage('拍头', async (data) => {
      if (data?.msg?.Content?.startsWith('拍头') && data.msg.AtUinLists.length > 0) {
        const content = data.msg.Content.replace('拍头', '').trim()
        const target = data.msg.AtUinLists[0].Uin
        const avatar = await getAvatar(mahiro, target)
        const formData = new FormData()
        formData.append('images', avatar)
        formData.append('texts', content || '怎么说话的你')
        getImage('/memes/beat_head/', formData).then((res) => {
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
