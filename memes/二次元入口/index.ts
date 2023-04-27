import type { IMahiroUse } from 'mahiro'
import getMemeImage from '../../http'
import ky from 'ky'
import { trimGroupMsg } from '../../util'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-二次元入口') as typeof mahiro.logger

    mahiro.onGroupMessage('二次元入口', async (data) => {
      if (data?.msg?.Content?.includes('二次元入口') && data?.msg?.Images?.length > 0) {
        const content = trimGroupMsg(['二次元入口'], data)
        const images = data.msg.Images
        const formData = new FormData()
        const image = images[0]
        const imageData = await ky(image.Url).blob()
        formData.append('images', imageData)
        formData.append('texts', (content || '走，跟我去二次元吧'))
        getMemeImage('/memes/acg_entrance/', formData).then((res) => {
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
