import type { IMahiroUse } from 'mahiro'
import ky from 'ky'
import getImage from '../http'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-要我一直') as typeof mahiro.logger

    mahiro.onGroupMessage('要我一直', async (data) => {
      if (data?.msg?.Content?.startsWith('要我一直')) {
        const images = data.msg.Images
        if (images.length > 0) {
          const image = images[0]
          const formData = new FormData()
          const imageData = await ky(image.Url).blob()
          formData.append('images', imageData)
          const modeArr = ['normal', 'circle', 'loop']
          const args = {
            mode: modeArr[Math.floor(Math.random() * modeArr.length)]
          }
          getImage('/memes/always/', formData, args).then((res) => {
            mahiro.sendGroupMessage({
              groupId: data.groupId,
              fastImage: res
            })
          })
        }
      }
    })

    logger.success(`插件要我一直加载成功`)
  }
  return use
}
