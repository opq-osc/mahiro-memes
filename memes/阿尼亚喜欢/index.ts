import type { IMahiroUse } from 'mahiro'
import getImage from '../../http'
import ky from 'ky'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-阿尼亚喜欢') as typeof mahiro.logger

    mahiro.onGroupMessage('阿尼亚喜欢', async (data) => {
      if (data?.msg?.Content?.startsWith('阿尼亚喜欢') && data?.msg?.Images?.length > 0) {
        const content = data.msg.Content.replace('阿尼亚喜欢', '').trim()
        const images = data.msg.Images
        const formData = new FormData()
        const image = images[0]
        const imageData = await ky(image.Url).blob()
        formData.append('images', imageData)
        formData.append('texts', (content || '阿尼亚喜欢这个'))
        getImage('/memes/anya_suki/', formData).then((res) => {
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
