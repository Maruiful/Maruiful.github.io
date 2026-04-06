# Maruiful's Blog 项目文档

## 项目概述

这是一个基于 **VuePress 2** 和 **vuepress-theme-hope** 主题的个人技术博客/文档网站。

- **作者**: Maruiful (宛陵旧梦)
- **定位**: 个人技术博客，记录技术学习笔记、个人思考、校园生活
- **标语**: "试上高峰窥皓月，偶开天眼觑红尘"
- **副标语**: "记录学习，但不止于学习"
- **简介**: 211信息安全本科在读混子但是开发

## 技术栈

| 技术 | 版本 |
|------|------|
| VuePress | 2.0.0-rc.20 |
| vuepress-theme-hope | 2.0.0-rc.78 |
| Vue | 3.5.13 |
| Vite | (bundler-vite) |
| TypeScript | - |
| pnpm | - |

## 目录结构

```
my-docs/
├── .github/
│   └── workflows/
│       └── deploy-docs.yml    # GitHub Actions 自动部署工作流
├── src/
│   ├── .vuepress/
│   │   ├── config.ts           # VuePress 主配置
│   │   ├── theme.ts           # 主题配置
│   │   ├── navbar/            # 导航栏配置
│   │   │   ├── index.ts
│   │   │   ├── zh.ts          # 中文导航栏
│   │   │   └── en.ts         # 英文导航栏
│   │   ├── sidebar/           # 侧边栏配置
│   │   │   ├── index.ts
│   │   │   ├── zh.ts          # 中文侧边栏
│   │   │   └── en.ts         # 英文侧边栏
│   │   ├── styles/            # 样式配置
│   │   └── public/           # 静态资源 (logo, favicon 等)
│   ├── README.md             # 博客首页 (中文)
│   ├── intro.md              # 介绍页
│   ├── en/                   # 英文版本
│   ├── Java_backend_develop/ # Java后端开发板块
│   ├── storyOfWanling/       # 个人回忆录板块
│   └── 算法与手撕/            # 算法与手撕代码板块
├── package.json
└── tsconfig.json
```

## 内容板块

1. **Java后端开发** (`/Java_backend_develop/`)
   - Java后端开发学习笔记

2. **算法与手撕** (`/算法与手撕/`)
   - 算法题解、手撕代码实现
   - 示例：LRU 缓存算法

3. **个人回忆录** (`/storyOfWanling/`)
   - 个人生活、校园故事

4. **英文内容** (`/en/`)
   - 部分内容的英文版本

## 主题配置 (theme.ts)

- 使用 `vuepress-theme-hope` 主题
- 启用博客功能，作者名：Maruiful
- 双语支持：中文 (`/`) + 英文 (`/en/`)
- 社交链接：Gitee、GitHub
- Markdown 增强：代码高亮、任务列表、PlantUML 等
- 评论系统占位（Waline，已注释）
- PWA 支持占位（已注释）
- 密码保护：demo 页面需密码 `1234`

## 部署工作流

**触发条件**: 每当有代码推送到 `main` 分支时自动触发

**部署步骤**:
1. 拉取代码（完整 git 历史）
2. 安装 pnpm
3. 设置 Node.js 22（带缓存）
4. 安装依赖
5. 构建文档
6. 创建 `.nojekyll` 文件
7. 部署到 GitHub Pages 的 `gh-pages` 分支

## npm 脚本

| 脚本 | 说明 |
|------|------|
| `pnpm docs:dev` | 启动开发服务器 |
| `pnpm docs:build` | 构建生产版本 |
| `pnpm docs:clean-dev` | 清除缓存并启动开发服务器 |
| `pnpm docs:update-package` | 更新 VuePress 相关包 |

## 关键文件路径

- 主配置: [src/.vuepress/config.ts](src/.vuepress/config.ts)
- 主题配置: [src/.vuepress/theme.ts](src/.vuepress/theme.ts)
- 导航栏: [src/.vuepress/navbar/zh.ts](src/.vuepress/navbar/zh.ts)
- 侧边栏: [src/.vuepress/sidebar/zh.ts](src/.vuepress/sidebar/zh.ts)
- CI/CD: [.github/workflows/deploy-docs.yml](.github/workflows/deploy-docs.yml)
