import type { IMahiroUse } from 'mahiro'
import getMemeImage, { getImage } from '../../http'
import { trimGroupMsg } from '../../util'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-阿尼亚喜欢') as typeof mahiro.logger

    mahiro.onGroupMessage('阿尼亚喜欢', async (data) => {
      if (data?.msg?.Content?.startsWith('阿尼亚喜欢') && (data?.msg?.Images?.length > 0 || data?.msg?.AtUinLists?.length > 0)) {
        const content = trimGroupMsg(['阿尼亚喜欢'], data)
        const formData = new FormData()
        const imageData = await getImage(mahiro, data)
        formData.append('images', imageData)
        formData.append('texts', (content || '阿尼亚喜欢这个'))
        getMemeImage('/memes/anya_suki/', formData).then((res) => {
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
