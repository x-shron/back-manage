import CardLayout from '@/components/CardLayout';
import { Space, Tabs, Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import StarryTable, { RefStarryTable } from '@/components/StarryTable';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { getMarriageList } from '@/service/matchmaker';
import { ColumnsType } from 'antd/es/table';

import './index.less';

const UserOrder = () => {
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
            width: 60,
        },
        {
            title: '订单号',
            dataIndex: 'id',
            fixed: 'left',
        },
        {
            title: '订单状态',
            dataIndex: 'name',
            fixed: 'left',
        },
        {
            title: '项目名称',
            dataIndex: 'nickName',
        },

        {
            title: '项目金额',
            dataIndex: 'sexName',
        },
        {
            title: '下单时间',
            dataIndex: 'sexName',
        },
        {
            title: '到期时间',
            dataIndex: 'sexName',
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

    const orderStatusMap = [
        {
            label: '全部',
            key: '-1',
        },
        {
            label: '待支付',
            key: '0',
        },
        {
            label: '服务中',
            key: '1',
        },
        {
            label: '已取消',
            key: '2',
        },
        {
            label: '已完成',
            key: '3',
        },
    ];

    return (
        <CardLayout className="user-order-container">
            <Tabs
                activeKey={activeKey}
                items={orderStatusMap}
                onChange={setActiveKey}
                tabPosition="left"
                className="user-order-tabs"
            />
            <div className="user-order-table">
                <StarryTable
                    columns={columns}
                    getDataSource={getDataSource}
                    fetchDataAfterMount={false}
                    ref={tabREf}
                />
            </div>
        </CardLayout>
    );
};

export default UserOrder;
