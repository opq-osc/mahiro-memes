import type { IGroupMessage, Mahiro } from 'mahiro'

import { apiHost } from './config'
import ky from 'ky'

export default function getMemeImage (apiPath: `/memes/${string}/`, formData: FormData, args?: object) {
  if (!!args) {
    formData.append('args', JSON.stringify(args))
  }
  return ky.post(`${apiHost}${apiPath}`, {
    body: formData,
    timeout: 1000 * 180
  }).blob().then(async (res) => {
    const imageBuffer = Buffer.from(await res.arrayBuffer())
    return imageBuffer.toString('base64')
  })
}

export async function getAvatar (mahiro: Mahiro, qq: number) {
  const url = await mahiro.avatar.getUserAvatarUrl(qq, 100)
  return ky(url).blob()
  // return ky(`https://q.qlogo.cn/headimg_dl?dst_uin=${qq}&spec=100`).blob()
  // return ky(`http://q1.qlogo.cn/g?b=qq&nk=${qq}&s=100`).blob()
}

export async function getImages (mahiro: Mahiro, data: IGroupMessage) {
  const imageDataArr = []
  if (data?.msg?.Images?.length > 0) {
    for (const item of data.msg.Images) {
      try {
        const imageData = await ky(item.Url).blob()
        imageDataArr.push(imageData)
      } catch (error) {
        mahiro.logger.warn(error)
      }
    }
  } else {
    for (const item of data.msg.AtUinLists) {
      try {
        const imageData = await getAvatar(mahiro, item.Uin)
        imageDataArr.push(imageData)
      } catch (error) {
        mahiro.logger.warn(error)
      }
    }
  }
  return imageDataArr
}
