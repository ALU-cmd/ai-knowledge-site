import Link from 'next/link';
import projects from '@/data/projects.json';
import categories from '@/data/categories.json';
import links from '@/data/links.json';

export default function Home() {
  const topProjects = projects.slice(0, 12);
  const parentCategories = categories.filter((c: any) => !c.parent_name);

  // Group links by category
  const linkGroups: Record<string, any[]> = {};
  links.forEach((link: any) => {
    if (!linkGroups[link.category]) linkGroups[link.category] = [];
    linkGroups[link.category].push(link);
  });

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-950 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/50 px-4 py-1.5 text-xs font-medium text-blue-700 dark:text-blue-300 mb-6">
            收录 {projects.length} 个优质项目
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            AI 开源项目发现平台
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            系统化收录前沿 AI 开源项目，涵盖大语言模型、Agent 框架、RAG、多模态等领域。
            提供结构化分类与对比分析，帮助开发者快速发现优质工具。
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/projects"
              className="inline-flex h-11 items-center rounded-full bg-zinc-900 dark:bg-white px-6 text-sm font-medium text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 transition"
            >
              浏览项目库
            </Link>
            <Link
              href="/categories"
              className="inline-flex h-11 items-center rounded-full border border-zinc-300 dark:border-zinc-700 px-6 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition"
            >
              分类地图
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Overview */}
      <section className="py-16 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">核心领域</h2>
          <p className="mt-2 text-zinc-500">覆盖 AI 开源生态的 {parentCategories.length} 大领域</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {parentCategories.map((cat: any) => (
              <a
                key={cat.category_id}
                href={`/projects/?category=${encodeURIComponent(cat.name)}`}
                className="group rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all"
              >
                <div className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                  {cat.name}
                </div>
                <div className="mt-1 text-xs text-zinc-500">{cat.project_count} 个项目</div>
                <div className="mt-2 text-xs text-zinc-400 line-clamp-2">{cat.description}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Top Projects */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">热门项目</h2>
              <p className="mt-1 text-zinc-500">精选高质量 AI 开源项目</p>
            </div>
            <Link href="/projects" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              查看全部 →
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topProjects.map((project: any) => (
              <a
                key={project.rank_num}
                href={project.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-sm font-bold text-zinc-600 dark:text-zinc-300">
                    {project.rank_num}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-zinc-900 dark:text-white truncate group-hover:text-blue-600 transition">
                      {project.name}
                    </div>
                    <div className="text-xs text-zinc-500">{project.author}</div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 flex-1">
                  {project.title}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stars && (
                    <span className="inline-flex items-center rounded-full bg-amber-50 dark:bg-amber-950/50 px-2.5 py-1 text-xs font-medium text-amber-700 dark:text-amber-300">
                      ⭐ {project.stars}
                    </span>
                  )}
                  {project.language && (
                    <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:text-blue-300">
                      {project.language}
                    </span>
                  )}
                  {project.category_tag && (
                    <span className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 text-xs text-zinc-600 dark:text-zinc-400">
                      {project.category_tag}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Friend Links */}
      <section className="py-16 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">友情链接</h2>
          <p className="mt-2 text-zinc-500">AI 领域优质站点推荐</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Object.entries(linkGroups).map(([category, items]) => (
              <div key={category} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
                <div className="text-sm font-bold text-zinc-900 dark:text-white">{category}</div>
                <div className="mt-3 grid gap-2">
                  {items.map((link: any) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
