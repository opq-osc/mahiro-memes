
import type { IGroupMessage } from 'mahiro'
export function trimGroupMsg (keywords: string[], data: IGroupMessage) {
  let result = data.msg.Content
  for (const keyword of keywords) {
    result = result.replace(keyword, '')
  }
  if (data?.msg?.AtUinLists?.length > 0) {
    for (const user of data.msg.AtUinLists) {
      result = result.replace(`@${user.Nick}`, '')
    }
  }
  return result.trim()
}
