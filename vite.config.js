import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.js',
      userscript: {
        name: 'imdb/douban top250 自动创建 neodb 收藏单',
        namespace: 'https://github.com/LesslsMore/neodb-top250',
        version: '0.0.2',
        author: 'lesslsmore',
        license: 'MIT',
        description: 'imdb/douban top250 自动创建 neodb 收藏单，调用 neodb api 实现, 需要填入 token',
        match: [
          'https://www.imdb.com/chart/top/*',
          'https://movie.douban.com/top250*',
        ],
      },
    }),
  ],
});
