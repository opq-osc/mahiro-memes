import type { IMahiroUse } from 'mahiro'
import getImage from '../http'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-PH') as typeof mahiro.logger

    mahiro.onGroupMessage('PH', async (data) => {
      if (data?.msg?.Content?.toLowerCase().startsWith('ph ')) {
        const content = data.msg.Content.toLowerCase().replace('ph ', '')
        const arr = content.split(' ')
        if (arr.length !== 2) {
          return
        }
        const formData = new FormData()
        arr.map((i) => {
          formData.append('texts', i)
        })
        getImage('/memes/pornhub/', formData).then((res) => {
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
