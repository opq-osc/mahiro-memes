import type { IMahiroUse } from 'mahiro'
import getImage from '../../http'
import ky from 'ky'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-问问') as typeof mahiro.logger

    mahiro.onGroupMessage('问问', async (data) => {
      if (data?.msg?.Content?.startsWith('问问') && data?.msg?.Images?.length > 0) {
        const content = data.msg.Content.replace('问问', '').trim()
        if (!!!content) return
        const images = data.msg.Images
        const formData = new FormData()
        const image = images[0]
        const imageData = await ky(image.Url).blob()
        formData.append('images', imageData)
        formData.append('texts', content)
        getImage('/memes/ask/', formData).then((res) => {
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
