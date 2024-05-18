import { add_button, add_checkbox, add_checkbox_all, get_item_infos, save_fun, neodb_fun } from "./common";

const list_path = 'ol'
const item_path = '.item'
const opt_path = "div.opt.mod"
const title = "douban-top250"

let opt_dom
let list_dom
let item_dom


export function douban() {
    let loading = false;
    const loadMoreThreshold = 300; // 当距离页面底部多少像素时加载更多

    // ("div.paginator > a:nth-child(11)").textContent


    // get_item_infos()

    opt_dom = document.querySelector(opt_path)
    list_dom = document.querySelector(list_path);

    if (list_dom) {
        // 获取列表中的所有列表项
        item_dom = list_dom.querySelectorAll(item_path);

        add_button(opt_dom, `${title} json 导出`, () => save_fun(get_item_infos(item_dom, get_item_info),`${title}.json`))
        add_button(opt_dom, "导入 neodb", () => neodb_fun(get_item_infos(item_dom, get_item_info), title))
    }


    function loadMoreItems() {
        if (loading) return;
        loading = true;
    
        let next = document.querySelector("span.next")
        let link = next.querySelector("link")
        if (link) {
            let href = link.href

            console.log(href)
    
            fetch(href)
                .then(response => response.text())
                .then(html => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
        
                    // console.log(doc)
                    doc.querySelector("ol.grid_view").querySelectorAll("li").forEach(
                        li => document.querySelector("ol.grid_view").appendChild(li)
                    )
    
                    document.querySelector("div.paginator").replaceWith(doc.querySelector("div.paginator"))
        
                    // const newItems = doc.querySelectorAll('.workshopItem');
        
                    // const container = document.querySelector('.workshopBrowseItems');
                    // newItems.forEach(item => container.appendChild(item));
        
                    loading = false;
                    // pageNumber++;
                })
                .catch(error => {
                    console.error('Error loading more items:', error);
                    loading = false;
                });
        } else {
            console.log("end")
            
            item_dom = list_dom.querySelectorAll(item_path);
            add_checkbox(item_dom)
            add_checkbox_all(list_dom, item_dom)
        }

        // ("span.next > link")


    }

    function onScroll() {
        const scrollPosition = window.innerHeight + window.scrollY;
        const thresholdPosition = document.body.offsetHeight - loadMoreThreshold;

        if (scrollPosition >= thresholdPosition) {
            loadMoreItems();
        }
    }

    window.addEventListener('scroll', onScroll);
}

function get_item_info(item) {
    let num = item.querySelector("em").textContent
    let url = item.querySelector(".pic > a").href
    let title = item.querySelector(".hd > a > span:nth-child(1)").textContent
    let year = item.querySelector(".bd > p:nth-child(1)").childNodes[2].data.split('/')[0].trim().slice(0,4)
    let rate = item.querySelector(".rating_num").textContent
    let vote = item.querySelector(".bd > div > span:nth-child(4)").textContent.slice(0, -3)
    let img = item.querySelector("img").src

    return {
        num,
        title,
        url,
        year,
        img,
        rate,
        vote,
    }
}

