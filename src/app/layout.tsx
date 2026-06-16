import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Knowledge - AI 开源项目发现平台',
  description: '系统化收录前沿 AI 开源项目，涵盖大语言模型、Agent 框架、RAG、多模态等领域。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased min-h-screen bg-white dark:bg-zinc-950">
        <nav className="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-zinc-900 dark:text-white">
              AI Knowledge
            </a>
            <div className="flex items-center gap-6">
              <a href="/" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition">
                首页
              </a>
              <a href="/projects/" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition">
                项目库
              </a>
              <a href="/categories/" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition">
                分类地图
              </a>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 mt-20">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid gap-8 md:grid-cols-4">
              <div>
                <h3 className="font-bold text-zinc-900 dark:text-white">AI Knowledge</h3>
                <p className="mt-2 text-sm text-zinc-500">
                  发现优质 AI 开源项目，构建你的 AI 知识图谱。
                </p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-900 text-center text-sm text-zinc-500">
              © {new Date().getFullYear()} AI Knowledge · Powered by Next.js & GitHub Pages
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
