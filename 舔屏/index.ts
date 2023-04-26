import type { IMahiroUse } from 'mahiro'
import getImage, { getAvatar } from '../http'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('舔屏') as typeof mahiro.logger

    logger.info(`加载舔屏插件 ...`)

    mahiro.onGroupMessage('舔屏', async (data) => {
      if (data?.msg?.AtUinLists?.length > 0) {
        let content = data.msg.Content
        for (const user of data.msg.AtUinLists) {
          content = content.replace(`@${user.Nick}`, '')
        }
        content = content.trim()
        if (content.includes('舔屏') || content.includes('舔') || content.includes('pr')) {
          const target = data.msg.AtUinLists[0].Uin
          const avatar = await getAvatar(mahiro, target)
          const formData = new FormData()
          formData.append('images', avatar)
          getImage('/memes/prpr/', formData).then((res) => {
            mahiro.sendGroupMessage({
              groupId: data.groupId,
              fastImage: res
            })
          })
        }
      }
    })

    logger.success(`插件舔屏加载成功`)
  }
  return use
}
