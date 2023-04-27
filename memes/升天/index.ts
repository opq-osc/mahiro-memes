import type { IMahiroUse } from 'mahiro'
import getMemeImage from '../../http'
import ky from 'ky'
import { trimGroupMsg } from '../../util'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes-升天') as typeof mahiro.logger

    mahiro.onGroupMessage('升天', async (data) => {
      if (data?.msg?.Content?.includes('升天')) {
        const content = trimGroupMsg(['升天'], data)
        if (!!!content) {
          return
        }
        const formData = new FormData()
        formData.append('texts', content)
        getMemeImage('/memes/ascension/', formData).then((res) => {
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
