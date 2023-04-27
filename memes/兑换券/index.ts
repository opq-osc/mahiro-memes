import type { IMahiroUse } from 'mahiro'
import getMemeImage, { getImage } from '../../http'
import { trimGroupMsg } from '../../util'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-兑换券') as typeof mahiro.logger

    mahiro.onGroupMessage('兑换券', async (data) => {
      if (data?.msg?.Content?.includes('兑换券') && (data?.msg?.Images?.length > 0 || data?.msg?.AtUinLists?.length > 0)) {
        const formData = new FormData()
        const content = trimGroupMsg(['兑换券'], data)
        formData.append('texts', (content || '陪睡券'))
        const imageData = await getImage(mahiro, data)
        formData.append('images', imageData)
        getMemeImage('/memes/coupon/', formData).then((res) => {
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
