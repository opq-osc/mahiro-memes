import type { IMahiroUse } from 'mahiro'
import 喜悲报 from './喜悲报'
import 五千 from './5000'
import 要我一直 from './要我一直'
import RUA from './RUA'
import 记仇 from './记仇'
import PH from './PH'
import 舔屏 from './舔屏'
import 远离 from './远离'

export default function Plugin () {
  const use: IMahiroUse = (mahiro) => {
    const logger = mahiro.logger.withTag('Memes') as typeof mahiro.logger

    logger.info(`加载插件 Mahiro Memes...`)

    mahiro.use(喜悲报())
    mahiro.use(五千())
    mahiro.use(要我一直())
    mahiro.use(RUA())
    mahiro.use(记仇())
    mahiro.use(PH())
    mahiro.use(舔屏())
    mahiro.use(远离())

    logger.success(`插件Mahiro Memes加载成功`)
  }
  return use
}
