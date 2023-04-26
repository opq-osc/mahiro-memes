import type { IMahiroUse } from 'mahiro'
import getImage, { getAvatar } from '../http'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('RUA!') as typeof mahiro.logger

    logger.info(`加载RUA!插件 ...`)

    mahiro.onGroupMessage('RUA!', async (data) => {
      if (data?.msg?.Content?.toLowerCase().includes('rua') && data.msg.AtUinLists.length > 0) {
        const target = data.msg.AtUinLists[0].Uin
        const avatar = await getAvatar(mahiro, target)
        const formData = new FormData()
        formData.append('images', avatar)
        getImage('/memes/petpet/', formData).then((res) => {
          mahiro.sendGroupMessage({
            groupId: data.groupId,
            fastImage: res
          })
        })
      }
    })

    logger.success(`插件RUA!加载成功`)
  }
  return use
}
