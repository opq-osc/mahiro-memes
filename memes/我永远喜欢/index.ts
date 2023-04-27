import type { IMahiroUse } from 'mahiro'
import getImage, { getAvatar } from '../../http'
import ky from 'ky'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-我永远喜欢') as typeof mahiro.logger

    mahiro.onGroupMessage('我永远喜欢', async (data) => {
      if (data?.msg?.Content?.startsWith('我永远喜欢') && (data?.msg?.Images?.length > 0 || data?.msg?.AtUinLists?.length > 0)) {
        const formData = new FormData()
        if (data?.msg?.Images?.length > 0) {
          const content = data.msg.Content.replace('我永远喜欢', '').trim()
          if (!!!content) {
            return
          }
          const images = data.msg.Images
          const image = images[0]
          const imageData = await ky(image.Url).blob()
          formData.append('images', imageData)
          formData.append('texts', content)
        } else {
          const user = data.msg.AtUinLists[0]
          const imageData = await getAvatar(mahiro, user.Uin)
          formData.append('texts', user.Nick)
          formData.append('images', imageData)
        }
        getImage('/memes/always_like/', formData).then((res) => {
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
