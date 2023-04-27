import type { IMahiroUse } from 'mahiro'
import getMemeImage from '../../http'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-5000兆') as typeof mahiro.logger

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
        getMemeImage('/memes/5000choyen/', formData).then((res) => {
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
