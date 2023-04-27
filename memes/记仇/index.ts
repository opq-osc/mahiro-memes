import type { IMahiroUse } from 'mahiro'
import getMemeImage from '../../http'
import { trimGroupMsg } from '../../util'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-记仇') as typeof mahiro.logger

    mahiro.onGroupMessage('记仇', async (data) => {
      if (data?.msg?.Content?.startsWith('记仇')) {
        const content = trimGroupMsg(['记仇'], data)
        const formData = new FormData()
        formData.append('texts', content)
        getMemeImage('/memes/hold_grudge/', formData).then((res) => {
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
