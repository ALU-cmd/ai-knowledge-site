'use client';

import { useState, useMemo } from 'react';
import projects from '@/data/projects.json';
import categories from '@/data/categories.json';

export default function ProjectsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLang, setSelectedLang] = useState('');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((p: any) => { if (p.category_tag) tags.add(p.category_tag); });
    return Array.from(tags).sort();
  }, []);

  const allLangs = useMemo(() => {
    const langs = new Set<string>();
    projects.forEach((p: any) => { if (p.language) langs.add(p.language); });
    return Array.from(langs).sort();
  }, []);

  const filtered = useMemo(() => {
    return projects.filter((p: any) => {
      const matchSearch = !search || 
        p.name?.toLowerCase().includes(search.toLowerCase()) ||
        p.title?.toLowerCase().includes(search.toLowerCase()) ||
        p.author?.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase());
      const matchCat = !selectedCategory || p.category_tag === selectedCategory;
      const matchLang = !selectedLang || p.language === selectedLang;
      return matchSearch && matchCat && matchLang;
    });
  }, [search, selectedCategory, selectedLang]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">项目库</h1>
          <p className="mt-2 text-zinc-500">共 {projects.length} 个项目 · 支持搜索和筛选</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="text"
            placeholder="搜索项目名称、作者、描述..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 h-10 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-10 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 text-sm text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">全部分类</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="h-10 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 text-sm text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">全部语言</option>
            {allLangs.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        {/* Results count */}
        <div className="mb-4 text-sm text-zinc-500">
          显示 {filtered.length} 个项目
          {(search || selectedCategory || selectedLang) && (
            <button
              onClick={() => { setSearch(''); setSelectedCategory(''); setSelectedLang(''); }}
              className="ml-3 text-blue-600 hover:text-blue-700"
            >
              重置筛选
            </button>
          )}
        </div>

        {/* Project Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((project: any, idx: number) => (
            <a
              key={idx}
              href={project.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-bold text-zinc-500">
                  #{project.rank_num || idx + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-zinc-900 dark:text-white truncate group-hover:text-blue-600 transition">
                    {project.name}
                  </div>
                  <div className="text-xs text-zinc-500 truncate">{project.author}</div>
                </div>
              </div>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 flex-1">
                {project.title || project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.stars && (
                  <span className="inline-flex items-center rounded-full bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-300">
                    ⭐ {project.stars}
                  </span>
                )}
                {project.language && (
                  <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-300">
                    {project.language}
                  </span>
                )}
                {project.category_tag && (
                  <span className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-xs text-zinc-600 dark:text-zinc-400">
                    {project.category_tag}
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-zinc-400">
            没有找到匹配的项目
          </div>
        )}
      </div>
    </div>
  );
}
