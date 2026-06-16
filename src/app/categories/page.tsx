import categories from '@/data/categories.json';

export default function CategoriesPage() {
  const parentCategories = categories.filter((c: any) => !c.parent_name);

  const getChildren = (parentName: string) => {
    return categories.filter((c: any) => c.parent_name === parentName);
  };

  const colorMap: Record<string, string> = {
    Cyan: 'border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/30',
    Emerald: 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30',
    Amber: 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30',
    Rose: 'border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/30',
    Violet: 'border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-950/30',
    Sky: 'border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30',
    Teal: 'border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-950/30',
    Indigo: 'border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/30',
  };

  const textColorMap: Record<string, string> = {
    Cyan: 'text-cyan-700 dark:text-cyan-300',
    Emerald: 'text-emerald-700 dark:text-emerald-300',
    Amber: 'text-amber-700 dark:text-amber-300',
    Rose: 'text-rose-700 dark:text-rose-300',
    Violet: 'text-violet-700 dark:text-violet-300',
    Sky: 'text-sky-700 dark:text-sky-300',
    Teal: 'text-teal-700 dark:text-teal-300',
    Indigo: 'text-indigo-700 dark:text-indigo-300',
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
            AI 研究分类图谱
          </h1>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            从基础模型到智能应用，呈现完整技术脉络。以核心领域建立认知框架，以细分方向定位具体场景。
          </p>
          <div className="mt-6 flex justify-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-zinc-900 dark:text-white">{parentCategories.length}</div>
              <div className="text-xs text-zinc-500">核心领域</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-zinc-900 dark:text-white">{categories.length}</div>
              <div className="text-xs text-zinc-500">覆盖分类</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-zinc-900 dark:text-white">{categories.length - parentCategories.length}</div>
              <div className="text-xs text-zinc-500">细分方向</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tree */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-6">
            {parentCategories.map((parent: any, idx: number) => {
              const children = getChildren(parent.name);
              const theme = parent.color_theme || 'Cyan';
              return (
                <div
                  key={parent.category_id}
                  className={`rounded-3xl border p-6 ${colorMap[theme] || colorMap.Cyan}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`text-xs font-mono ${textColorMap[theme] || ''}`}>
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                      {parent.name}
                    </h3>
                    <span className="text-sm text-zinc-500">
                      {parent.project_count} 项目 · {children.length} 细分
                    </span>
                  </div>
                  {parent.description && (
                    <p className="mt-2 ml-10 text-sm text-zinc-500">{parent.description}</p>
                  )}
                  {children.length > 0 && (
                    <div className="mt-4 ml-10 flex flex-wrap gap-2">
                      {children.map((child: any) => (
                        <a
                          key={child.category_id}
                          href={`/projects/?category=${encodeURIComponent(child.name)}`}
                          className="inline-flex items-center rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-700 dark:text-zinc-300 hover:border-blue-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                        >
                          {child.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
