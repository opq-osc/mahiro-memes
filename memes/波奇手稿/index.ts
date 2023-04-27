import type { IMahiroUse } from 'mahiro'
import getImage from '../../http'
import ky from 'ky'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-波奇手稿') as typeof mahiro.logger

    mahiro.onGroupMessage('波奇手稿', async (data) => {
      if (data?.msg?.Content === '波奇手稿' && data?.msg?.Images?.length > 0) {
        const images = data.msg.Images
        const formData = new FormData()
        const image = images[0]
        const imageData = await ky(image.Url).blob()
        formData.append('images', imageData)
        getImage('/memes/bocchi_draft/', formData).then((res) => {
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
