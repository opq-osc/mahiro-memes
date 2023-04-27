import type { IMahiroUse } from 'mahiro'
import getImage from '../../http'
import ky from 'ky'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-继续干活') as typeof mahiro.logger

    mahiro.onGroupMessage('继续干活', async (data) => {
      if ((data?.msg?.Content?.startsWith('继续干活') || data?.msg?.Content?.startsWith('继续打工')) && data?.msg?.Images?.length > 0) {
        const content = data.msg.Content.replace('继续干活', '').replace('继续打工', '').trim()
        const images = data.msg.Images
        const formData = new FormData()
        const image = images[0]
        const imageData = await ky(image.Url).blob()
        formData.append('images', imageData)
        formData.append('texts', (content || '继续干活'))
        getImage('/memes/back_to_work/', formData).then((res) => {
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
