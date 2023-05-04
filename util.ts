import type { IGroupMessage } from 'mahiro'

// 在昵称为特殊格式时也许会失效
export function trimGroupMsg (keywords: string[], data: IGroupMessage, removeKeywords: boolean) {
  let result = data.msg.Content
  if (removeKeywords) {
    for (const keyword of keywords) {
      result = result.replace(keyword, '')
    }
  }
  if (data?.msg?.AtUinLists?.length > 0) {
    for (const user of data.msg.AtUinLists) {
      result = result.replace(`@${user.Nick}`, '')
    }
  }
  return result.trim()
}
