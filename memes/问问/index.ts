import type { IMahiroUse } from 'mahiro'
import getMemeImage, { getImage } from '../../http'
import { trimGroupMsg } from '../../util'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-问问') as typeof mahiro.logger

    mahiro.onGroupMessage('问问', async (data) => {
      if (data?.msg?.Content?.startsWith('问问') && (data?.msg?.Images?.length > 0 || data?.msg?.AtUinLists?.length > 0)) {
        const content = trimGroupMsg(['问问'], data)
        const formData = new FormData()
        const user = data.msg.AtUinLists[0]
        const imageData = await getImage(mahiro, data)
        formData.append('images', imageData)
        formData.append('texts', (content || user.Nick))
        getMemeImage('/memes/ask/', formData).then((res) => {
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
