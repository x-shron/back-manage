import { useRef, useState, useEffect } from 'react';
import StarryCard from '@/components/CardLayout';
import StarryTable from '@/components/StarryTable';
import { QueryFormProps } from '@/components/StarryTable/QueryFrom';
import { Cascader, Input, Select, Image, Space, Tooltip, Button } from 'antd';
import { GENDER_OPTIONS } from '@/constant';
import { getAreaAndCity, getMatchmakerList } from '@/service/matchmaker';
import { ColumnsType } from 'antd/es/table';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';

export default () => {
    const [areaMap, setAreaMap] = useState([]);
    const columns: ColumnsType<any> = [
        {
            title: '序号',
            dataIndex: 'id',
            render: (text, record, index) => index + 1,
        },
        {
            title: '服务名称',
            dataIndex: 'id',
        },
        {
            title: '服务金额',
            dataIndex: 'nickName',
        },
        {
            title: '服务类型',
            dataIndex: 'name',
        },
        {
            title: '服务时间',
            dataIndex: 'mobilePhone',
        },
        {
            title: '服务介绍',
            dataIndex: 'id2',
        },
        {
            title: '操作',
            dataIndex: 'id',
            render: () => {
                return (
                    <Space>
                        <Tooltip title="编辑">
                            <a>
                                <EditTwoTone />
                            </a>
                        </Tooltip>
                        <Tooltip title="删除">
                            <a>
                                <DeleteTwoTone />
                            </a>
                        </Tooltip>
                    </Space>
                );
            },
        },
    ];

    const getDataSource = async (params: any) => {
        // const { areaIds } = params;
        // const [provinceId, cityId, areaId] = areaIds || [];
        // const newParams = {
        //     ...params,
        //     provinceId,
        //     cityId,
        //     areaId,
        // };
        // return getMatchmakerList(newParams);
    };
    return (
        <StarryCard>
            <div className="sub-tenant-manage-container">
                <StarryTable
                    columns={columns}
                    getDataSource={getDataSource}
                    leftTool={<Button type="primary">新增VIP服务</Button>}
                />
            </div>
        </StarryCard>
    );
};
