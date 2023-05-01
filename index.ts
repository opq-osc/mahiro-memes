import getMemeImage, { getAvatar, getImages } from './http'

import type { IMahiroUse } from 'mahiro'
import ky from 'ky'
import { trimGroupMsg } from './util'

interface memeInfo {
  "key": string,
  "keywords": string[]
  "patterns": string[],
  "params": {
    "min_images": number,
    "max_images": number,
    "min_texts": number,
    "max_texts": number,
    "default_texts": string[],
    "args": any[]
  }
}

interface pluginConfig {
  /**
   * api地址，默认为 http://127.0.0.1:2233
   */
  apiHost?: string
}

export default function Plugin (config?: pluginConfig) {
  const { apiHost = 'http://127.0.0.1:2233' } = config || {}
  const use: IMahiroUse = async (mahiro) => {
    const logger = mahiro.logger.withTag('Memes') as typeof mahiro.logger
    logger.info(`加载插件 Mahiro Memes...`)

    const memeArr = [] as memeInfo[]
    let keywords = [] as string[]

    try {
      const memes = await ky(`${apiHost}/memes/keys`).json<string[]>()
      memes.map((item) => {
        ky(`${apiHost}/memes/${item}/info`).json<memeInfo>().then((res) => {
          memeArr.push(res)
          keywords = keywords.concat(res.keywords)
        }).catch((err) => {
          logger.warn(item, '加载失败', err)
        })
      })
    } catch (error) {
      logger.error(`插件Mahiro Memes加载失败`, error)
      return
    }


    mahiro.onGroupMessage('Memes', async (data) => {
      if (data?.msg?.Content?.toLowerCase() === 'meme帮助') {
        mahiro.sendGroupMessage({
          groupId: data.groupId,
          msg: {
            Content: '「meme帮助」获取帮助\n「meme列表」获取可用memes\n「meme名称 帮助」获取具体meme的帮助'
          }
        })
        return
      }
      if (data?.msg?.Content?.toLowerCase() === 'meme列表') {
        ky.post(`${apiHost}/memes/render_list/`, {
          timeout: 1000 * 180
        }).blob().then(async (res) => {
          const imageBuffer = Buffer.from(await res.arrayBuffer())
          mahiro.sendGroupMessage({
            groupId: data.groupId,
            fastImage: imageBuffer.toString('base64')
          })
        }).catch((err) => {
          logger.warn('获取meme失败', err)
        })
        return
      }
      if (data?.msg?.Content?.length > 0) {
        let curKeyword = ''
        const filters = memeArr.filter((i) => i.keywords.some((j) => {
          const match = data.msg.Content.toLowerCase().includes(j)
          if (match) {
            curKeyword = j
          }
          return match
        }))
        if (filters.length == 0) {
          return
        }
        const meme = filters[0]
        let content = trimGroupMsg(keywords, data, true)
        if (content === '帮助') {
          ky.get(`${apiHost}/memes/${meme.key}/preview`, {
            timeout: 1000 * 180
          }).blob().then(async (res) => {
            const imageBuffer = Buffer.from(await res.arrayBuffer())
            let str = ''
            if (meme.params.min_texts > 0) {
              str += `至少需要${meme.params.min_texts}段文字，以空格分隔\n`
            }
            if (meme.params.min_images > 0) {
              str += `至少需要${meme.params.min_images}张图片或@${meme.params.min_images}个人`
            }
            mahiro.sendGroupMessage({
              groupId: data.groupId,
              fastImage: imageBuffer.toString('base64'),
              msg: {
                Content: str
              }
            })
          }).catch((err) => {
            logger.warn('获取meme失败', err)
          })
          return
        }

        const formData = new FormData()
        const args: any = {}
        // 需要图片
        if (meme.params.min_images > 0) {
          // 图片来源为图片消息或头像
          if (data?.msg?.Images?.length >= meme.params.min_images || data?.msg?.AtUinLists?.length >= meme.params.min_images) {
            // 防误触
            if (curKeyword.length === 1 && content !== '') {
              return
            }
            let imgDataArr = await getImages(mahiro, data)
            if (imgDataArr.length < meme.params.min_images) {
              return
            }
            imgDataArr = imgDataArr.slice(0, meme.params.max_images)
            for (const item of imgDataArr) {
              formData.append('images', item)
            }
            // 没有就拿头像
          } else {
            // 防误触
            if (curKeyword.length > 1 && meme.params.min_images === 1 && content === curKeyword) {
              const imgData = await getAvatar(mahiro, data.userId)
              formData.append('images', imgData)
            } else {
              return
            }
          }
        }
        // 需要文字
        const defaultTextContainKeyword = meme.params.default_texts.some((i) => i !== curKeyword && i.includes(curKeyword))
        const contentContainOtherKeywords = meme.keywords.some((i) => i !== curKeyword && data.msg.Content.includes(i))
        if (defaultTextContainKeyword || contentContainOtherKeywords) {
          content = trimGroupMsg(keywords, data, false)
          if (contentContainOtherKeywords) {
            content = content.replace(curKeyword, '').trim()
          }
        }
        if (meme.params.min_texts === meme.params.max_texts) {
          if (meme.params.min_texts === 1) {
            formData.append('texts', content)
          } else if (meme.params.min_texts > 1) {
            const arr = content.split(' ', meme.params.max_texts)
            arr.map((i) => {
              formData.append('texts', i)
            })
          }
        } else {
          const arr = content.split(' ', meme.params.min_texts)
          arr.map((i) => {
            formData.append('texts', i)
          })
        }
        // 需要参数
        if (meme.params.args.length > 0) {
          const memeArgs = meme.params.args[0]
          if (memeArgs.enum) {
            args[memeArgs.name] = memeArgs.enum[Math.floor(Math.random() * memeArgs.enum.length)]
          }
        }
        if (formData.has('texts') || formData.has('images')) {
          getMemeImage(apiHost, `/memes/${meme.key}/`, formData, args).then((res) => {
            mahiro.sendGroupMessage({
              groupId: data.groupId,
              fastImage: res
            })
          }).catch((err) => {
            logger.warn('获取meme失败', formData, args, err)
          })
        }
      }
    })

    logger.success(`插件Mahiro Memes加载成功`)
  }
  return use
}
