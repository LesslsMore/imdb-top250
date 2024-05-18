import { saveAs } from 'file-saver'
import { api_catalog_search, api_me_collection, api_me_collection_item, api_catalog_fetch } from './neodb'

export function add_checkbox_all(list_dom, item_dom) {
    // 创建一个全选复选框
    var selectAllCheckbox = document.createElement('input');
    selectAllCheckbox.type = 'checkbox';
    selectAllCheckbox.addEventListener('change', function () {
        // 遍历每个列表项，设置复选框的选中状态
        item_dom.forEach(function (item, index) {
            var checkbox = item.querySelector('input[type="checkbox"]');
            checkbox.checked = selectAllCheckbox.checked;
            // 打印选择框的序号
            if (checkbox.checked) {
                console.log("Checkbox " + (index + 1) + " is checked.");
            }
        });
    });

    // 在列表之前插入全选复选框
    list_dom.parentNode.insertBefore(selectAllCheckbox, list_dom);
}

export function add_checkbox(item_dom) {
    // 遍历每个列表项
    item_dom.forEach(function (item, index) {
        // 创建一个多选框元素
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        // 将多选框添加到列表项中
        item.insertBefore(checkbox, item.firstChild);

        // 监听多选框的变化事件
        checkbox.addEventListener('change', function () {
            var allChecked = true;
            item_dom.forEach(function (checkbox) {
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

export function add_button(opt, btn_name, click_fun) {
    let btn = document.createElement("button");
    btn.innerHTML = btn_name;//innerText也可以,区别是innerText不会解析html
    btn.onclick = click_fun
    opt.insertBefore(btn, opt.firstChild);
}

export function save_fun(infos, json_name) {
    console.log(infos.length)

    var blob = new Blob([JSON.stringify(infos)], { type: "text/plain;charset=utf-8" });
    // var blob = new Blob(["Hello, world!"],{ type: "application/vnd.ms-excel" })
    saveAs(blob, json_name);
}


export async function neodb_fun(infos, title) {
    let json = await api_me_collection(title)
    let { uuid: collection_uuid } = json
    console.log(collection_uuid)

    console.log(infos.length)
    for (let info of infos) {

        console.log(info.url)
        // let { uuid: item_uuid } = await api_catalog_search(info.id)
        let { uuid: item_uuid } = await api_catalog_fetch(info.url)
        console.log(item_uuid)

        let json = await api_me_collection_item(collection_uuid, item_uuid)
        let { message } = json
        console.log(message)
    }
}

export function get_item_infos(item_dom, get_item_info) {
    let infos = []
    item_dom.forEach(
        item => {
            if (item.querySelector('input').checked) {
                let info = get_item_info(item)
                infos.push(info)
            }
        }
    )
    return infos
}