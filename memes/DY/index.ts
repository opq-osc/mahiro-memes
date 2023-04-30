import type { IMahiroUse } from 'mahiro'
import getMemeImage from '../../http'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-DY') as typeof mahiro.logger

    mahiro.onGroupMessage('DY', async (data) => {
      if (data?.msg?.Content?.toLowerCase().startsWith('dy ')) {
        const content = data.msg.Content.toLowerCase().replace('dy ', '')
        const formData = new FormData()
        formData.append('texts', content)
        getMemeImage('/memes/douyin/', formData).then((res) => {
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
