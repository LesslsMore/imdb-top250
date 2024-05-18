import axios from 'axios';

const token = 'AeQ6GtXWj2vHowJ0AROG6A0X85PWoe';

// 创建一个 Axios 实例
const instance = axios.create({
    baseURL: "https://neodb.social",
    timeout: 10000, // 设置超时时间，单位为毫秒
    proxy: {
        protocol: 'http',
        host: '127.0.0.1',
        port: 7897,
    },
    headers: {
        'Authorization': `Bearer ${token}`
    },
});

export async function api_catalog_search(query) {
    var config = {
        method: 'get',
        url: `/api/catalog/search?query=${query}`,
    };

    let response = await instance(config)
    // console.log(response)
    let json = response.data

    let data = json.data[0]
    let {
        brief,
        display_title,
        duration,
        external_resources,
        id,
        imdb,
        rating,
        rating_count,
        year,
        uuid,
    } = data

    let info = {
        brief,
        display_title,
        duration,
        external_resources,
        id,
        imdb,
        rating,
        rating_count,
        year,
        uuid,
    }
    return info
}

export async function api_catalog_fetch(url){
    var config = {
        method: 'get',
        url: `/api/catalog/fetch?url=${url}`,
    };

    let response = await instance(config)
    // console.log(response)
    let json = response.data
    return json
}

// export async function api_me_shelf_item(method, url, uuid) {
//     var config = {
//         method: 'get',
//         url: `https://neodb.social/api/me/shelf/item/${uuid}`,
//     };

//     let response = await instance(config)
//     // console.log(response)
//     let json = response.data
//     return json
// }

export async function api_me_shelf_item(uuid) {
    var config = {
        method: 'get',
        url: `/api/me/shelf/item/${uuid}`,
    };

    let response = await instance(config)
    // console.log(response)
    let json = response.data
    return json
}

export async function data_me_shelf_item(uuid) {
    let json = api_me_shelf_item(uuid)
    let {
        shelf_type,
        item: {
            id,
            external_resources,
            title,
            brief,
            cover_image_url,
            rating,
            rating_count,
        },
        created_time,
        comment_text,
        rating_grade,
    } = json
    return {
        shelf_type,
        created_time,
        comment_text,
        rating_grade,

        id,
        external_resources,
        title,
        brief,
        cover_image_url,
        rating,
        rating_count,
    }
}

export async function api_me_collection(title) {
    let brief = `爬取时间: 
${new Date().toString()}
### neodb 收藏单 
- 筛选: 全选、已标记、未标记，
- 排序: 年份、人数、评分, 升序、降序, 
- 便于寻找出收藏单中未标记的条目

脚本链接
https://greasyfork.org/zh-CN/scripts/494732

勉强能用，如有需要可以试试`

    var config = {
        method: 'post',
        url: `/api/me/collection/`,


        data: {
            title,
            brief,
            "visibility": 0
        }
    };

    let response = await instance(config)
    // console.log(response)
    let json = response.data
    return json
}

export async function api_me_collection_item(collection_uuid, item_uuid) {
    var config = {
        method: 'post',
        url: `/api/me/collection/${collection_uuid}/item/`,
        data: {
            "item_uuid": item_uuid,
            "note":""
        }
    };

    let response = await instance(config)
    // console.log(response)
    let json = response.data
    return json
}

