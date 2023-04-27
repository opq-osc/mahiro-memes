import type { IMahiroUse } from 'mahiro'
import getImage from '../../http'
import ky from 'ky'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-升天') as typeof mahiro.logger

    mahiro.onGroupMessage('升天', async (data) => {
      if (data?.msg?.Content?.startsWith('升天')) {
        const content = data.msg.Content.replace('升天', '').trim()
        if (!!!content) {
          return
        }
        const formData = new FormData()
        formData.append('texts', content)
        getImage('/memes/ascension/', formData).then((res) => {
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
