import type { IMahiroUse } from 'mahiro'
import getImage from '../http'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag(
      '记仇'
    ) as typeof mahiro.logger

    logger.info(`加载记仇插件 ...`)

    mahiro.onGroupMessage('记仇', async (data) => {
      if (data?.msg?.Content?.startsWith('记仇')) {
        const content = data.msg.Content.replace('记仇', '').trim()
        const formData = new FormData()
        formData.append('texts', content)
        getImage('/memes/hold_grudge/', formData).then((res) => {
          mahiro.sendGroupMessage({
            groupId: data.groupId,
            fastImage: res
          })
        })
      }
    })

    logger.success(`插件记仇加载成功`)
  }
  return use
}
