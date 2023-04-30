import type { IMahiroUse } from 'mahiro'
import getMemeImage, { getImage } from '../../http'
import { trimGroupMsg } from '../../util'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-入典') as typeof mahiro.logger

    mahiro.onGroupMessage('入典', async (data) => {
      if ((data?.msg?.Content?.includes('入典') || data?.msg?.Content?.includes('典中典') || data?.msg?.Content?.includes('黑白草图')) &&
        (data?.msg?.Images?.length > 0 || data?.msg?.AtUinLists?.length > 0)) {
        const formData = new FormData()
        const content = trimGroupMsg(['入典', '典中典', '黑白草图'], data)
        formData.append('texts', (content || '救命啊'))
        const imageData = await getImage(mahiro, data)
        formData.append('images', imageData)
        getMemeImage('/memes/dianzhongdian/', formData).then((res) => {
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
