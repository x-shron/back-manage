import moment from 'moment';

/**
 * @param list - 列表数据
 * @param label - 标签字段名 默认为 'name'
 * @param value - 值字段名 默认为 'id'
 * @returns {Array} - 转换后的列表
 */
export const transFromToOptions = (
    list: any,
    label: string = 'name',
    value: string = 'id',
) => {
    // 遍历列表中每个 item，转换其 label 和 value 字段
    return list.map((item: any) => ({
        // 将 item 中的 label 和 value 字段返回，并加上 label 和 value 字段
        ...item,
        label: item[label], // 标签字段值
        value: item[value], // 值字段值
    }));
};

export function randomColor(offset = 0) {
    let r = Math.floor(Math.random() * (256 - offset) + offset);
    let g = Math.floor(Math.random() * (256 - offset) + offset);
    let b = Math.floor(Math.random() * (256 - offset) + offset);
    let rgb = 'rgb(' + r + ',' + g + ',' + b + ')';
    return rgb;
}

// 格式化时间戳函数
export const formatTime = (times: any, correctToSec: any = true) => {
    if (!times) return;
    const type = correctToSec ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
    return moment(times * 1000).format(type);
};

export const formatParams = (obj: any) => {
    const result: string[] = [];
    for (const key in obj) {
        result.push(`${key}=${obj[key]}`);
    }
    return result.join('&');
};

// 校验密码
export const validatorPassword = (rule: any, value: any) => {
    if (value && !/^(?=[a-zA-Z\d])./g.test(value.trim())) {
        return Promise.reject('密码不能以符号开头');
    }

    if (
        value &&
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[()`~!@#$%^&*\-+=_|{}[\]:;'<>,\.?/])[A-Za-z\d()`~!@#$%^&*\-+=_|{}[\]:;'<>,\.?/]{8,20}/g.test(
            value.trim(),
        )
    ) {
        return Promise.reject('密码需要包含数字、符号、大小写字母');
    }

    return Promise.resolve();
};

export const validatorIllegalCharacter = (rule: any, value: string) => {
    if (value && /[\\/*？?‘’''“”""<>|｜]/g.test(value)) {
        return Promise.reject('非法字符');
    }
    return Promise.resolve();
};

export const validatorIllegalCharacter2 = (rule: any, value: string) => {
    if (value && /[\\/*?"<>|]/g.test(value)) {
        return Promise.reject('非法字符');
    }
    return Promise.resolve();
};

// 只能输入英文字母、数字、下划线且不能以数字开头
export const validatorUserName = (rule: any, value: string) => {
    if (value && !/^(?!\d)[0-9a-zA-Z_]+$/g.test(value)) {
        return Promise.reject('只能输入英文字母、数字、下划线且不能以数字开头');
    }
    return Promise.resolve();
};
// 只能输入英文字母和数字
export const validatorLettersAndNumber = (rule: any, value: any) => {
    if (value && !/^[0-9a-zA-Z]*$/g.test(value)) {
        return Promise.reject('只能输入英文字母、数字');
    }
    return Promise.resolve();
};

export const validatorHeartNo = (rule: any, value: any) => {
    if (value && !/^[0-9]*$/g.test(value)) {
        return Promise.reject('心动号只能输入数字');
    }
    return Promise.resolve();
};

/**
 *  @param {any[]} data 数据源
 *  第二个参数为一个对象，可传以下指进行配置
 *  @param {?string} [idFieldName='idFieldName'] id字段的字段名
 *  @param {?string} [parentIdFieldName='parentId'] 父ID字段的字段名
 *  @param {?null | string | number} [topIdValue=null] 顶级ID的值
 *  @param {?string} [order='id'] 按照哪个字段进行排序
 *  @param {?string} [sort='desc'] 排序方式 'asc' | 'desc'
 *  @param {?boolean} [parentInfo=true] 是否在子节点中加入父节点信息
 *  @return {any[]} 树结构数据
 */
export const arrayToTree = (
    data: any[],
    {
        idFieldName = 'id',
        parentIdFieldName = 'parentId',
        topIdValue = null,
        order = 'id',
        sort = 'desc',
        parentInfo = true,
    }: any,
) => {
    // 搜索所有子孙节点
    function findChild(list: any[], node: any) {
        const children = [];
        for (let i = 0; i < list.length; i++) {
            if (list[i][parentIdFieldName] === node[idFieldName]) {
                const obj = list[i];
                parentInfo && (obj.parentNode = node);
                obj.children = findChild(list, obj);
                children.push(obj);
            }
        }
        // 排序
        if (order) {
            children.sort((a, b) => {
                return sort === 'desc'
                    ? b[order] - a[order]
                    : a[order] - b[order];
            });
        }
        return children;
    }
    const result: any[] = [];
    let ids = data.map((x) => x[idFieldName]);
    // 处理根节点，包含非1级的情况
    data.forEach((item) => {
        if (!ids.includes(item[parentIdFieldName])) {
            item.children = findChild(data, item);
            result.push(item);
        }
    });

    if (order) {
        return result.sort((a, b) => {
            return sort === 'desc' ? b[order] - a[order] : a[order] - b[order];
        });
    } else {
        return result;
    }
};
