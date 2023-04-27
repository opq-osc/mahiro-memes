import type { IMahiroUse } from 'mahiro'
import getMemeImage, { getImage } from '../../http'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-字符画') as typeof mahiro.logger

    mahiro.onGroupMessage('字符画', async (data) => {
      if (data?.msg?.Content?.startsWith('字符画') && (data?.msg?.Images?.length > 0 || data?.msg?.AtUinLists?.length > 0)) {
        const images = data.msg.Images
        const formData = new FormData()
        const imageData = await getImage(mahiro, data)
        formData.append('images', imageData)
        getMemeImage('/memes/charpic/', formData).then((res) => {
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
