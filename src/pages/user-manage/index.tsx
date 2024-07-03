import { useRef, useState, useEffect } from 'react';
import StarryCard from '@/components/CardLayout';
import './index.less';
import StarryTable from '@/components/StarryTable';
import { QueryFormProps } from '@/components/StarryTable/QueryFrom';
import { Cascader, Input, Select, Image } from 'antd';
import { GENDER_OPTIONS } from '@/constant';
import {
    getAreaAndCity,
    getMatchmakerList,
    getUserRoleMap,
} from '@/service/matchmaker';
import { ColumnsType } from 'antd/es/table';

const avater = require('@/assets/avter.jpg');

export default () => {
    const [areaMap, setAreaMap] = useState([]);
    const [roleMap, setRoleMap] = useState([]);

    const columns: ColumnsType<any> = [
        {
            title: '序号',
            dataIndex: 'id',
            render: (text, record, index) => index + 1,
        },
        {
            title: '心动号',
            dataIndex: 'id',
        },
        {
            title: '昵称',
            dataIndex: 'nickName',
        },
        {
            title: '姓名',
            dataIndex: 'name',
        },
        {
            title: '性别',
            dataIndex: 'mobilePhone',
        },
        {
            title: '年龄',
            dataIndex: 'id2',
        },
        {
            title: '所在地',
            dataIndex: 'id2',
        },
        {
            title: '身高',
            dataIndex: 'id2',
        },
        {
            title: '体重',
            dataIndex: 'id',
        },
        {
            title: '生肖',
            dataIndex: 'id',
        },
        {
            title: '家乡',
            dataIndex: 'id',
        },
        {
            title: '职业',
            dataIndex: 'id',
        },
        {
            title: '学历',
            dataIndex: 'id',
        },
        {
            title: '毕业学校',
            dataIndex: 'id',
        },
        {
            title: '婚恋状况',
            dataIndex: 'id',
        },
        {
            title: '子女情况',
            dataIndex: 'id',
        },
        {
            title: '年收入',
            dataIndex: 'id',
        },
        {
            title: '住房',
            dataIndex: 'id',
        },
        {
            title: '汽车',
            dataIndex: 'id',
        },
        {
            title: '星座',
            dataIndex: 'id',
        },
        {
            title: '个性标签',
            dataIndex: 'id',
        },
        {
            title: '关于TA',
            dataIndex: 'id',
        },
        {
            title: '操作',
            dataIndex: 'id',
            fixed: 'right',
        },
    ];

    const queryFormFeild: QueryFormProps = [
        {
            label: '心动号',
            name: 'name',
            FeildProps: {
                placeholder: '请输入心动号',
            },
            feild: Input,
        },
        {
            label: '手机号',
            name: 'iphone',
            FeildProps: {
                placeholder: '请输入手机号',
            },
            feild: Input,
        },
        {
            label: '用户角色',
            name: 'role',
            FeildProps: {
                placeholder: '请选择用户角色',
                options: roleMap,
                allowClear: true,
            },
            feild: Select,
        },
        {
            label: '区域或城市',
            name: 'areaIds',
            FeildProps: {
                placeholder: '请选择区域或城市',
                options: areaMap,
                expandTrigger: 'hover',
                changeOnSelect: true,
            },
            feild: Cascader,
            colSpan: 8,
        },
    ];

    useEffect(() => {
        getAreaAndCity().then((res) => {
            setAreaMap(res);
        });
        getUserRoleMap().then((res) => {
            setRoleMap(
                res.map((item: any) => ({
                    label: item.name,
                    value: item.id,
                })),
            );
        });
    }, []);

    const getDataSource = async (params: any) => {
        const { areaIds } = params;
        const [provinceId, cityId, areaId] = areaIds || [];
        const newParams = {
            ...params,
            provinceId,
            cityId,
            areaId,
        };
        return getMatchmakerList(newParams);
    };
    return (
        <StarryCard>
            <div className="sub-tenant-manage-container">
                <StarryTable
                    columns={columns}
                    getDataSource={getDataSource}
                    queryFormFeild={queryFormFeild}
                />
            </div>
        </StarryCard>
    );
};
