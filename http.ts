import ky from 'ky'
import type { IGroupMessage, Mahiro } from 'mahiro'

const apiHost = 'http://127.0.0.1:2233'

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

export async function getImage (mahiro: Mahiro, data: IGroupMessage) {
  let imageData
  if (data?.msg?.Images?.length > 0) {
    imageData = await ky(data.msg.Images[0].Url).blob()
  } else {
    imageData = await getAvatar(mahiro, data.msg.AtUinLists[0].Uin)
  }
  return imageData
}
