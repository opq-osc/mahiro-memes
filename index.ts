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
    mahiro.use(喜悲报())
    mahiro.use(五千())
    mahiro.use(要我一直())
    mahiro.use(RUA())
    mahiro.use(记仇())
    mahiro.use(PH())
    mahiro.use(舔屏())
    mahiro.use(远离())
  }
  return use
}
