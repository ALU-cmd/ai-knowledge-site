/**
 * MySQL → JSON 数据导出脚本
 * 用法: node scripts/export-data.mjs
 * 
 * 从本地 MySQL ai_knowledge 库导出数据为 JSON 文件，供 Next.js 静态构建使用。
 */

import mysql from 'mysql2/promise';
import { writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'src', 'data');

const DB_CONFIG = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123456',
  database: 'ai_knowledge',
  charset: 'utf8mb4',
};

async function exportData() {
  console.log('Connecting to MySQL...');
  const conn = await mysql.createConnection(DB_CONFIG);

  try {
    // 导出分类
    const [categories] = await conn.query(
      'SELECT category_id, name, parent_name, description, color_theme, project_count FROM categories ORDER BY id'
    );
    
    // 导出友情链接
    const [links] = await conn.query(
      'SELECT category, name, url, description FROM friend_links ORDER BY id'
    );

    // 导出项目
    const [projects] = await conn.query(
      'SELECT rank_num, name, author, stars, language, category_tag, title, description, source_url FROM projects ORDER BY rank_num'
    );

    // 确保目录存在
    await mkdir(DATA_DIR, { recursive: true });

    // 写入 JSON 文件
    await writeFile(
      join(DATA_DIR, 'categories.json'),
      JSON.stringify(categories, null, 2),
      'utf-8'
    );
    console.log(`Exported ${categories.length} categories`);

    await writeFile(
      join(DATA_DIR, 'links.json'),
      JSON.stringify(links, null, 2),
      'utf-8'
    );
    console.log(`Exported ${links.length} friend links`);

    await writeFile(
      join(DATA_DIR, 'projects.json'),
      JSON.stringify(projects, null, 2),
      'utf-8'
    );
    console.log(`Exported ${projects.length} projects`);

    console.log('\nAll data exported to src/data/');
    console.log('Next steps: git add . && git commit -m "update data" && git push');
  } finally {
    await conn.end();
  }
}

exportData().catch((err) => {
  console.error('Export failed:', err.message);
  process.exit(1);
});
