import type { IMahiroUse } from 'mahiro'
import getImage, { getAvatar } from '../../http'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-远离') as typeof mahiro.logger

    mahiro.onGroupMessage('远离', async (data) => {
      if (data?.msg?.Content?.includes('远离') && data?.msg?.AtUinLists?.length > 0) {
        const formData = new FormData()
        let content = data.msg.Content
        for (const user of data.msg.AtUinLists) {
          content = content.replace(`@${user.Nick}`, '')
          const target = user.Uin
          const avatar = await getAvatar(mahiro, target)
          formData.append('images', avatar)
        }

        content = content.replace('远离', '').trim()
        formData.append('texts', !!content ? content : '如何提高社交质量 :  远离以下头像的人')
        getImage('/memes/keep_away/', formData).then((res) => {
          mahiro.sendGroupMessage({
            groupId: data.groupId,
            fastImage: res
          })
        })
      }
    })

    logger.success(`插件远离加载成功`)
  }
  return use
}
