import type { IMahiroUse } from 'mahiro'
import getMemeImage, { getImage } from '../../http'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-我永远喜欢') as typeof mahiro.logger

    mahiro.onGroupMessage('我永远喜欢', async (data) => {
      if (data?.msg?.Content?.includes('我永远喜欢') && (data?.msg?.Images?.length > 0 || data?.msg?.AtUinLists?.length > 0)) {
        const formData = new FormData()
        if (data?.msg?.Images?.length > 0) {
          const content = data.msg.Content.replace('我永远喜欢', '').trim()
          if (!!!content) {
            return
          }
          formData.append('texts', content)
        } else {
          const user = data.msg.AtUinLists[0]
          formData.append('texts', user.Nick)
        }
        const imageData = await getImage(mahiro, data)
        formData.append('images', imageData)
        getMemeImage('/memes/always_like/', formData).then((res) => {
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
