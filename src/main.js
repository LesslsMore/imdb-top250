import { imdb } from './imdb'
import { douban } from './douban'

let url = window.location.href

console.log(url)

if (url.startsWith('https://www.imdb.com/chart/top/')) {
    imdb()
} else if (url.startsWith('https://movie.douban.com/top250')) {
    douban()
}