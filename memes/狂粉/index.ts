import type { IMahiroUse } from 'mahiro'
import getMemeImage from '../../http'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-狂粉') as typeof mahiro.logger

    mahiro.onGroupMessage('狂粉', async (data) => {
      if (data?.msg?.Content?.toLowerCase().startsWith('狂粉 ')) {
        const content = data.msg.Content.toLowerCase().replace('狂粉 ', '')
        const formData = new FormData()
        formData.append('texts', content)
        getMemeImage('/memes/fanatic/', formData).then((res) => {
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
