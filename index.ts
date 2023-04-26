import type { IMahiroUse } from 'mahiro'

import fs from 'fs'
import path from 'path'

export default function Plugin () {
  const use: IMahiroUse = async (mahiro) => {
    const logger = mahiro.logger.withTag('Memes') as typeof mahiro.logger

    logger.info(`加载插件 Mahiro Memes...`)

    const dirs = await fs.promises.readdir(path.join(__dirname, 'memes'))
    for (const item of dirs) {
      const meme = await import(path.join(__dirname, 'memes', item))
      mahiro.use(meme.default())
    }

    logger.success(`插件Mahiro Memes加载成功`)
  }
  return use
}
