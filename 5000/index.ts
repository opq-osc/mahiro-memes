import type { IMahiroUse } from 'mahiro'
import getImage from '../http'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('5000兆') as typeof mahiro.logger

    logger.info(`加载5000兆插件 ...`)

    mahiro.onGroupMessage('5000兆', async (data) => {
      if (data?.msg?.Content?.startsWith('5000 ')) {
        const content = data.msg.Content.replace('5000 ', '')
        const arr = content.split(' ', 2)
        if (arr.length === 1) {
          mahiro.sendGroupMessage({
            groupId: data.groupId,
            msg: {
              Content: '格式不正确，请发送：5000 xx xxx'
            }
          })
          return
        }
        const formData = new FormData()
        arr.map((i) => {
          formData.append('texts', i)
        })
        getImage('/memes/5000choyen/', formData).then((res) => {
          mahiro.sendGroupMessage({
            groupId: data.groupId,
            fastImage: res
          })
        })
      }
    })

    logger.success(`插件5000兆加载成功`)
  }
  return use
}
