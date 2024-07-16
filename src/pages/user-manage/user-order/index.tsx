import CardLayout from '@/components/CardLayout';
import {
    Button,
    Form,
    Input,
    message,
    Modal,
    Space,
    Tabs,
    Tooltip,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import StarryTable, { RefStarryTable } from '@/components/StarryTable';
import { getOrderList } from '@/service/matchmaker';
import { ColumnsType } from 'antd/es/table';

import './index.less';
import { useDebounceEffect, useUpdateEffect } from 'ahooks';
import { validatorHeartNo } from '@/utils/commonVal';
import UserSelect from '@/components/userSelect';
import { useHistory } from 'umi';
import { ContainerOutlined } from '@ant-design/icons';

const bizTypeMap = [
    {
        key: 4,
        label: '相亲订单',
    },
    {
        key: 2,
        label: 'VIP充值',
    },
    {
        key: 3,
        label: '畅聊充值',
    },
];

const UserOrder = () => {
    const [activeKey, setActiveKey] = useState<string | undefined>('-1');
    const tabREf = useRef<RefStarryTable>(null);

    const [userId, setUserId] = useState<any>(undefined);
    const history = useHistory();

    useUpdateEffect(() => {
        tabREf.current?.reload();
    }, [activeKey]);

    const goDetail = (id: string) => {
        history.push(`/user-list?id=${id}`);
    };

    const columns: ColumnsType<any> = [
        {
            title: '订单编号',
            dataIndex: 'id',
            fixed: 'left',
        },
        {
            title: '订单状态',
            dataIndex: 'status',
            fixed: 'left',
            render: (text) => {
                return orderStatusMap.find((item) => item.key == text)?.label;
            },
        },
        {
            title: '用户ID',
            dataIndex: 'userId',
            fixed: 'left',
            render: (id) => {
                return <a onClick={() => goDetail(id)}>{id}</a>;
            },
        },
        {
            title: '手机号',
            dataIndex: 'mobilePhone',
            fixed: 'left',
        },
        {
            title: '来源',
            dataIndex: 'source',
            fixed: 'left',
        },
        {
            title: '用户意向',
            dataIndex: 'intention',
            fixed: 'left',
        },
        {
            title: '项目名称',
            dataIndex: 'bizType',
            render: (text) => {
                return bizTypeMap.find((item) => item.key == text)?.label;
            },
        },
        {
            title: '项目金额',
            dataIndex: 'price',
            render: (text) => `${(text / 100).toFixed(2)}元`,
        },
        {
            title: '实际支付金额',
            dataIndex: 'payFee',
            render: (text) => `${(text / 100).toFixed(2)}元`,
        },
        {
            title: '下单时间',
            dataIndex: 'createTime',
        },
        {
            title: '支付时间',
            dataIndex: 'payTime',
        },
        {
            title: '支付方式',
            dataIndex: 'payChannel',
        },
        {
            title: '操作',
            dataIndex: 'id',
            fixed: 'right',
            width: 100,
            render: () => {
                return (
                    <Space>
                        <Tooltip title="详情">
                            <a>
                                <ContainerOutlined />
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
            status: activeKey == '-1' ? undefined : activeKey,
            userId,
        };
        return getOrderList(newParams);
    };

    const orderStatusMap = [
        {
            label: '全部',
            key: '-1',
        },
        {
            label: '待支付',
            key: '1',
        },
        {
            label: '支付中',
            key: '2',
        },
        {
            label: '已付款',
            key: '3',
        },
        {
            label: '取消',
            key: '4',
        },
        {
            label: '退款中',
            key: '5',
        },
        {
            label: '已退款',
            key: '6',
        },
    ];

    useDebounceEffect(
        () => {
            validatorHeartNo(undefined, userId).then(
                () => {
                    tabREf.current?.reload();
                },
                (error) => {
                    message.error(error);
                },
            );
        },
        [userId],
        { wait: 500 },
    );

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
                    leftTool={[
                        <Input
                            allowClear
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            placeholder="请输入心动号"
                        />,
                    ]}
                />
            </div>
            {/* <Modal 
                title={'订单详情'}
            >

            </Modal> */}
        </CardLayout>
    );
};

export default UserOrder;
