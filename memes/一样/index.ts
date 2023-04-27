import type { IMahiroUse } from 'mahiro'
import getMemeImage from '../../http'
import ky from 'ky'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-一样') as typeof mahiro.logger

    mahiro.onGroupMessage('一样', async (data) => {
      if (data?.msg?.Content?.startsWith('一样') && data?.msg?.Images?.length > 0) {
        const images = data.msg.Images
        const formData = new FormData()
        const image = images[0]
        const imageData = await ky(image.Url).blob()
        formData.append('images', imageData)
        getMemeImage('/memes/alike/', formData).then((res) => {
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
