import type { IMahiroUse } from 'mahiro'
import getImage from '../../http'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-二次元入口') as typeof mahiro.logger

    mahiro.onGroupMessage('二次元入口', async (data) => {
      if (data?.msg?.Content?.toLowerCase().startsWith('二次元入口')) {
        const content = data.msg.Content.toLowerCase().replace('二次元入口', '').trim()
        const formData = new FormData()
        formData.append('texts', content)
        getImage('/memes/acg_entrance/', formData).then((res) => {
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
