import type { IMahiroUse } from 'mahiro'
import getImage from '../http'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag(
      '喜悲报'
    ) as typeof mahiro.logger

    logger.info(`加载喜悲报插件 ...`)

    mahiro.onGroupMessage('喜悲报', async (data) => {
      if (data?.msg?.Content?.startsWith('喜报')) {
        const content = data.msg.Content.replace('喜报', '').trim()
        const formData = new FormData()
        formData.append('texts', content)
        getImage('/memes/good_news/', formData).then((res) => {
          mahiro.sendGroupMessage({
            groupId: data.groupId,
            fastImage: res
          })
        })
        return
      }
      if (data?.msg?.Content?.startsWith('悲报')) {
        const content = data.msg.Content.replace('悲报', '').trim()
        const formData = new FormData()
        formData.append('texts', content)
        getImage('/memes/bad_news/', formData).then((res) => {
          mahiro.sendGroupMessage({
            groupId: data.groupId,
            fastImage: res
          })
        })
      }
    })

    logger.success(`插件喜悲报加载成功`)
  }
  return use
}
