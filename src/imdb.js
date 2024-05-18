import { add_button, add_checkbox, add_checkbox_all, get_item_infos, save_fun, neodb_fun } from "./common";

export function imdb() {
    const list_path = ".ipc-metadata-list"
    const item_path = ".ipc-metadata-list-summary-item"
    const opt_path = ".chart-layout-view-options"
    const title = "imdb-top250"

    let opt_dom = document.querySelector(opt_path)
    let list_dom = document.querySelector(list_path);

    if (list_dom) {
        // 获取列表中的所有列表项
        let item_dom = list_dom.querySelectorAll(item_path);

        add_button(opt_dom, `${title} json 导出`, () => save_fun(get_item_infos(item_dom, get_item_info),`${title}.json`))
        add_button(opt_dom, "导入 neodb", () => neodb_fun(get_item_infos(item_dom, get_item_info), title))
        add_checkbox(item_dom)
        add_checkbox_all(list_dom, item_dom)
    }
}

function get_item_info(item) {
    let title__text = item.querySelector('.ipc-title__text').textContent

    let num = title__text.split('.')[0]
    let title = title__text.split('.')[1].trim()
    let url = item.querySelector('.ipc-title-link-wrapper').href.split('?')[0]
    let id = url.split('/')[4]

    let metadata = []
    item.querySelectorAll('.cli-title-metadata-item').forEach(el => metadata.push(el.textContent))

    let [year, time, limit] = metadata

    let img = item.querySelector('.ipc-image').src
    let rating = item.querySelector('.ipc-rating-star').textContent

    let rate = rating.split('(')[0].trim()
    let vote = rating.split('(')[1].split(')')[0]

    let info = {
        num,
        title,
        id,
        url,
        year,
        time,
        limit,
        img,
        rate,
        vote
    }
    return info
}