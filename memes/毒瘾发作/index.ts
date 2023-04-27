import type { IMahiroUse } from 'mahiro'
import getImage from '../../http'
import ky from 'ky'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-毒瘾发作') as typeof mahiro.logger

    mahiro.onGroupMessage('毒瘾发作', async (data) => {
      if (data?.msg?.Content?.startsWith('毒瘾发作') && data?.msg?.Images?.length > 0) {
        const content = data.msg.Content.replace('毒瘾发作', '').trim()
        const images = data.msg.Images
        const formData = new FormData()
        const image = images[0]
        const imageData = await ky(image.Url).blob()
        formData.append('images', imageData)
        if (!!content) {
          formData.append('texts', content)
        }
        getImage('/memes/addiction/', formData).then((res) => {
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
