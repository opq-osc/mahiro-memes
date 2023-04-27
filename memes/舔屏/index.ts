import type { IMahiroUse } from 'mahiro'
import getMemeImage, { getAvatar } from '../../http'
import { trimGroupMsg } from '../../util'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-舔屏') as typeof mahiro.logger

    mahiro.onGroupMessage('舔屏', async (data) => {
      if (data?.msg?.AtUinLists?.length > 0) {
        const content = trimGroupMsg(['舔屏'], data)
        if (content.includes('舔屏') || content.includes('舔') || content.includes('pr')) {
          const target = data.msg.AtUinLists[0].Uin
          const avatar = await getAvatar(mahiro, target)
          const formData = new FormData()
          formData.append('images', avatar)
          getMemeImage('/memes/prpr/', formData).then((res) => {
            mahiro.sendGroupMessage({
              groupId: data.groupId,
              fastImage: res
            })
          })
        }
      }
    })
  }
  return use
}
