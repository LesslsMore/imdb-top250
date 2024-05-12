import { saveAs } from 'file-saver'
import {api_catalog_search, api_me_collection, api_me_collection_item} from './neodb'
console.log('hello world')

let opt = document.querySelector(".chart-layout-view-options")

let btn = document.createElement("button");
btn.innerHTML = "imdb-top250 excel 导出";//innerText也可以,区别是innerText不会解析html
btn.onclick = function () {
    let infos = get_item_infos()
    console.log(infos.length)

    var blob = new Blob([JSON.stringify(infos)], { type: "text/plain;charset=utf-8" });
    // var blob = new Blob(["Hello, world!"],{ type: "application/vnd.ms-excel" })
    saveAs(blob, `imdb-top250.json`);
}
opt.insertBefore(btn, opt.firstChild);

let btn_neodb = document.createElement("button");
btn_neodb.innerHTML = "导入 neodb";//innerText也可以,区别是innerText不会解析html
btn_neodb.onclick = async function () {
    let json = await api_me_collection()
    let {uuid: collection_uuid} = json
    console.log(collection_uuid)

    let infos = get_item_infos()
    console.log(infos.length)
    for(let info of infos) {
        
        console.log(info.id)
        let {uuid: item_uuid} = await api_catalog_search(info.id)
        console.log(item_uuid)

        let json = await api_me_collection_item(collection_uuid, item_uuid)
        let {message} = json
        console.log(message)
    }
}
opt.insertBefore(btn_neodb, opt.firstChild);





// 获取列表元素
var list = document.querySelector('.ipc-metadata-list');

// 如果找到了列表元素
if (list) {
    // 获取列表中的所有列表项
    var listItems = list.querySelectorAll('.ipc-metadata-list-summary-item');


    // 创建一个全选复选框
    var selectAllCheckbox = document.createElement('input');
    selectAllCheckbox.type = 'checkbox';
    selectAllCheckbox.addEventListener('change', function () {
        // 遍历每个列表项，设置复选框的选中状态
        listItems.forEach(function (item, index) {
            var checkbox = item.querySelector('input[type="checkbox"]');
            checkbox.checked = selectAllCheckbox.checked;
            // 打印选择框的序号
            if (checkbox.checked) {
                console.log("Checkbox " + (index + 1) + " is checked.");
            }
        });
    });

    // 在列表之前插入全选复选框
    list.parentNode.insertBefore(selectAllCheckbox, list);

    // 遍历每个列表项
    listItems.forEach(function (item, index) {
        // 创建一个多选框元素
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        // 将多选框添加到列表项中
        item.insertBefore(checkbox, item.firstChild);

        // 监听多选框的变化事件
        checkbox.addEventListener('change', function () {
            var allChecked = true;
            listItems.forEach(function (checkbox) {
                if (!checkbox.checked) {
                    allChecked = false;
                }
            });
            selectAllCheckbox.checked = allChecked;
            // 打印选择框的序号
            console.log("Checkbox " + (index + 1) + " is " + (checkbox.checked ? "checked" : "unchecked") + ".");
        });
    });
}

// let item = document.querySelector(".ipc-metadata-list-summary-item")

function get_item_infos() {
    let infos = []
    document.querySelectorAll(".ipc-metadata-list-summary-item").forEach(
        item => {
            if (item.querySelector('input').checked) {
                let info = get_item_info(item)
                infos.push(info)
            }
        }
    )
    return infos
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



