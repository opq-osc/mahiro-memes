import type { IMahiroUse } from 'mahiro'
import getMemeImage from '../../http'
import ky from 'ky'
import { trimGroupMsg } from '../../util'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-毒瘾发作') as typeof mahiro.logger

    mahiro.onGroupMessage('毒瘾发作', async (data) => {
      if (data?.msg?.Content?.includes('毒瘾发作') && data?.msg?.Images?.length > 0) {
        const content = trimGroupMsg(['毒瘾发作'], data)
        const images = data.msg.Images
        const formData = new FormData()
        const image = images[0]
        const imageData = await ky(image.Url).blob()
        formData.append('images', imageData)
        if (!!content) {
          formData.append('texts', content)
        }
        getMemeImage('/memes/addiction/', formData).then((res) => {
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
