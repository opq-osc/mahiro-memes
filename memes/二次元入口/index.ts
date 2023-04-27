import type { IMahiroUse } from 'mahiro'
import getImage from '../../http'
import ky from 'ky'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-二次元入口') as typeof mahiro.logger

    mahiro.onGroupMessage('二次元入口', async (data) => {
      if (data?.msg?.Content?.startsWith('二次元入口') && data?.msg?.Images?.length > 0) {
        const content = data.msg.Content.replace('二次元入口', '').trim()
        const images = data.msg.Images
        const formData = new FormData()
        const image = images[0]
        const imageData = await ky(image.Url).blob()
        formData.append('images', imageData)
        formData.append('texts', (content || '走，跟我去二次元吧'))
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
