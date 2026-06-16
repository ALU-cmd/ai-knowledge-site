# AI Knowledge Site 项目文档

## 基本信息

| 项目 | 内容 |
|------|------|
| 项目路径 | `D:\ai-knowledge-site` |
| GitHub 仓库 | https://github.com/ALU-cmd/ai-knowledge-site |
| 线上地址 | https://alu-cmd.github.io/ai-knowledge-site/ |
| 创建日期 | 2026-06-16 |

## 技术栈

- **框架**: Next.js 14（静态导出 `output: 'export'`）
- **前端**: React 18 + TypeScript + Tailwind CSS 3
- **部署**: GitHub Pages + GitHub Actions 自动构建
- **数据库**: MySQL 5.7（本地）
- **数据流**: MySQL → JSON 导出 → 静态构建 → GitHub Pages

## 项目结构

```
D:\ai-knowledge-site\
├── .github/workflows/deploy.yml   ← GitHub Actions 自动部署配置
├── scripts/export-data.mjs        ← MySQL → JSON 导出脚本
├── src/
│   ├── app/
│   │   ├── layout.tsx             ← 全局布局（导航栏 + 页脚）
│   │   ├── globals.css            ← 全局样式（Tailwind）
│   │   ├── page.tsx               ← 首页（Hero + 分类 + 热门项目 + 友链）
│   │   ├── projects/page.tsx      ← 项目库页（搜索/分类/语言筛选）
│   │   └── categories/page.tsx    ← 分类地图页（层级展示）
│   └── data/                      ← JSON 数据文件（从 MySQL 导出）
│       ├── categories.json        ← 86 条分类
│       ├── links.json             ← 32 条友情链接
│       └── projects.json          ← 100 个 AI 开源项目
├── next.config.mjs                ← basePath: '/ai-knowledge-site'
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## 数据库信息

- **数据库名**: `ai_knowledge`
- **连接**: localhost:3306, user=root, password=123456
- **MySQL 路径**: `C:\Program Files\MySQL\MySQL Server 5.7\bin\mysql.exe`

### 表结构

#### categories（86 条）
| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT AUTO_INCREMENT | 主键 |
| category_id | INT | 网站原始分类 ID |
| name | VARCHAR(100) | 分类名称 |
| parent_name | VARCHAR(100) | 父分类（NULL=一级分类） |
| description | VARCHAR(500) | 描述 |
| color_theme | VARCHAR(50) | 配色主题（Cyan/Emerald/Amber/Rose/Violet/Sky/Teal/Indigo） |
| project_count | INT | 项目数量 |

#### friend_links（32 条）
| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT AUTO_INCREMENT | 主键 |
| category | VARCHAR(100) | 链接分类 |
| name | VARCHAR(200) | 网站名称 |
| url | VARCHAR(500) | 链接地址 |
| description | VARCHAR(500) | 描述 |

#### projects（100 条）
| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT AUTO_INCREMENT | 主键 |
| rank_num | INT | 排名 |
| name | VARCHAR(200) | 项目名称 |
| author | VARCHAR(200) | 作者 |
| stars | VARCHAR(50) | Star 数 |
| language | VARCHAR(50) | 编程语言 |
| category_tag | VARCHAR(200) | 分类标签 |
| title | VARCHAR(500) | 一句话介绍 |
| description | TEXT | 详细描述 |
| source_url | VARCHAR(500) | GitHub 链接 |

## 数据更新流程

### 1. 新增项目数据

```sql
-- 连接 MySQL
"C:\Program Files\MySQL\MySQL Server 5.7\bin\mysql.exe" -uroot -p123456 ai_knowledge

-- 插入新项目
INSERT INTO projects (name, author, stars, language, category_tag, title, description, source_url)
VALUES ('项目名', '作者', '10K', 'Python', '分类标签', '一句话介绍', '详细描述', 'https://github.com/xxx/xxx');
```

### 2. 导出 JSON

```bash
cd D:\ai-knowledge-site
node scripts/export-data.mjs
```

### 3. 推送部署

```bash
git add .
git commit -m "data: add new projects"
git push
```

GitHub Actions 会自动构建并部署到 GitHub Pages（约 1-2 分钟）。

## 关键配置说明

### basePath
`next.config.mjs` 中设置 `basePath: '/ai-knowledge-site'`，因为 GitHub Pages 部署在子路径下。所有内部链接使用 Next.js `<Link>` 组件会自动添加前缀。

### GitHub Pages 设置
仓库 Settings → Pages → Build and deployment → Source 选择 "GitHub Actions"

### GitHub Token 要求
推送时需要 Personal Access Token 包含 `repo` + `workflow` 权限（因为包含 .github/workflows 文件）。

## 数据来源

| 来源 | 数据内容 |
|------|---------|
| Inferri.com 首页 | TOP 20 热门项目（免登录可见） |
| Inferri.com 分类地图 | 86 个分类完整层级体系 |
| Inferri.com 页脚 | 32 条友情链接 |
| GitHub Trending (Python Monthly) | 20 个热门项目 |
| 知名 AI 项目补充 | 60 个经典项目（LangChain、PyTorch、vLLM、Dify 等） |

## 本地开发

```bash
cd D:\ai-knowledge-site
npm run dev        # 启动开发服务器 http://localhost:3000
npm run build      # 构建静态站点到 ./out 目录
```
