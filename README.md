# Mahiro Memes

一个使用 [Mahiro](https://github.com/opq-osc/mahiro) 和 [meme-generator](https://github.com/MeetWq/meme-generator) 的机器人插件集


## usage:

### 部署meme-generator

参见: [Docker部署](https://github.com/MeetWq/meme-generator/blob/main/docs/docker.md)

### 安装插件依赖

```bash
pnpm add ky mahiro-memes
```

### 加载插件

```typescript
...
import memes from 'mahiro-memes'

...
mahiro.use(memes())
...
```

### 使用插件

私聊或在群里发送「meme帮助」获得帮助
