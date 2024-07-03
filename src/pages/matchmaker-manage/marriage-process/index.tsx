import CardLayout from '@/components/CardLayout';
import { Space, Tabs, Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { marriage_process_type } from '../constant';
import StarryTable, { RefStarryTable } from '@/components/StarryTable';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { getMarriageList } from '@/service/matchmaker';
import { ColumnsType } from 'antd/es/table';

const MarriageProcess = () => {
    const [activeKey, setActiveKey] = useState<string | undefined>(undefined);
    const tabREf = useRef<RefStarryTable>(null);

    useEffect(() => {
        tabREf.current?.reload();
    }, [activeKey]);

    const columns: ColumnsType<any> = [
        {
            title: '序号',
            dataIndex: 'id',
            render: (text, record, index) => index + 1,
            fixed: 'left',
            width: 50,
        },
        {
            title: '心动号',
            dataIndex: 'id',
            width: 120,
            fixed: 'left',
        },
        {
            title: '申请人',
            dataIndex: 'name',
            width: 120,
            fixed: 'left',
        },
        {
            title: '被申请人',
            dataIndex: 'nickName',
            width: 120,
        },

        {
            title: '申请时间',
            dataIndex: 'sexName',
            width: 80,
        },
        {
            title: '操作',
            dataIndex: 'id',
            fixed: 'right',
            width: 50,
            render: () => {
                return (
                    <Space>
                        <Tooltip title="指派红娘">
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
        const newParams = {
            ...params,
            audit: activeKey == '-1' ? undefined : activeKey,
            type: '4', // 相亲
        };
        return getMarriageList(newParams);
    };

    return (
        <CardLayout>
            <Tabs
                activeKey={activeKey}
                items={marriage_process_type.map((item) => ({
                    key: item.value,
                    ...item,
                }))}
                onChange={setActiveKey}
                style={{
                    marginBottom: 16,
                }}
            />

            <StarryTable
                columns={columns}
                getDataSource={getDataSource}
                fetchDataAfterMount={false}
                ref={tabREf}
            />
        </CardLayout>
    );
};

export default MarriageProcess;
