import { useRef, useState, useEffect } from 'react';
import StarryCard from '@/components/CardLayout';
import './index.less';
import StarryTable from '@/components/StarryTable';
import { QueryFormProps } from '@/components/StarryTable/QueryFrom';
import { Cascader, Input, Select, Image } from 'antd';
import { GENDER_OPTIONS } from '@/constant';
import { getAreaAndCity, getMatchmakerList } from '@/service/matchmaker';
import { ColumnsType } from 'antd/es/table';

const avater = require('@/assets/avter.jpg');

export default () => {
    const [areaMap, setAreaMap] = useState([]);
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
            title: '头像',
            dataIndex: 'headImg',
            render: (headImg) => {
                return (
                    <Image
                        src={headImg}
                        width={60}
                        height={60}
                        fallback={
                            'https://api.dicebear.com/7.x/miniavs/svg?seed=1'
                        }
                    />
                );
            },
        },
        {
            title: '昵称',
            dataIndex: 'nickName',
        },
        {
            title: '红娘名字',
            dataIndex: 'name',
        },
        {
            title: '手机号',
            dataIndex: 'mobilePhone',
        },
        {
            title: '入职时间',
            dataIndex: 'id2',
        },
        {
            title: '邀请下级',
            dataIndex: 'id2',
        },
        {
            title: '邀请用户',
            dataIndex: 'id2',
        },
        {
            title: '成交数量',
            dataIndex: 'id',
        },
        {
            title: '红娘等级',
            dataIndex: 'id',
        },
        {
            title: '操作',
            dataIndex: 'id',
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
            label: '性别',
            name: 'gender',
            FeildProps: {
                placeholder: '请选择性别',
                options: GENDER_OPTIONS,
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
                    scroll={{ x: 'max-content' }}
                />
            </div>
        </StarryCard>
    );
};
