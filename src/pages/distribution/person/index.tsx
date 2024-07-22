import { useRef, useState, useEffect } from 'react';
import StarryCard from '@/components/CardLayout';
import './index.less';
import StarryTable, { RefStarryTable } from '@/components/StarryTable';
import { QueryFormProps } from '@/components/StarryTable/QueryFrom';
import {
    Cascader,
    Input,
    Select,
    Image,
    InputNumber,
    Space,
    Tooltip,
    Modal,
    message,
    Avatar,
    Button,
    Badge,
    DatePicker,
} from 'antd';
import { GENDER_OPTIONS, MARRIAGE_STATUS_OPTIONS } from '@/constant';
import {
    bindUser,
    deleteUser,
    getUserList,
    unbindUser,
} from '@/service/matchmaker';
import { ColumnsType } from 'antd/es/table';
import {
    getAreaAndCity,
    getJobMap,
    getSchoolMap,
    getTagMap,
    getUserRoleMap,
} from '@/service/common';
import { transFromToOptions } from '@/utils/commonVal';
import {
    DeleteOutlined,
    DownloadOutlined,
    LinkOutlined,
    NodeIndexOutlined,
    PoweroffOutlined,
} from '@ant-design/icons';
import { useLocation, useHistory } from 'umi';

const avater = require('@/assets/avter.jpg');

export default () => {
    const tableRef = useRef<RefStarryTable>(null);

    const columns: ColumnsType<any> = [
        {
            title: '心动号',
            ellipsis: true,
            dataIndex: 'id',
        },
        {
            title: '姓名',
            dataIndex: 'name',
            ellipsis: true,
            render: (text, record) => {
                return text || record.nickName;
            },
        },
        {
            title: '头像',
            ellipsis: true,
            dataIndex: 'headImg',
            render: (text, record) => {
                return (
                    <Avatar
                        style={{ cursor: 'pointer' }}
                        src={record.headImg || avater}
                    />
                );
            },
        },
        {
            title: '角色',
            ellipsis: true,
            dataIndex: 'sexName',
        },
        {
            title: '推广会员人数（10-30)一级直接推荐',
            dataIndex: 'age',
        },
        {
            title: '荐推广会员人数（999)一级直接推荐',
            dataIndex: 'mobilePhone',
        },
        {
            title: '推广会员人数（9999)一级直接推荐',
            dataIndex: 'houseStatusName',
        },
        {
            title: '现金红包累计',
            ellipsis: true,
            dataIndex: 'vocationName',
        },
        {
            title: '已提现金额',
            dataIndex: 'friendTypeName',
            ellipsis: true,
        },
        {
            title: '未提现金额',
            dataIndex: 'friendTypeName',
            ellipsis: true,
        },
        {
            title: '心动红包累计',
            dataIndex: 'friendTypeName',
            ellipsis: true,
        },
        {
            title: '已使用金额',
            dataIndex: 'friendTypeName',
            ellipsis: true,
        },

        {
            title: '未使用金额',
            dataIndex: 'friendTypeName',
            ellipsis: true,
        },
        {
            title: '操作',
            ellipsis: true,
            dataIndex: 'id',
            fixed: 'right',
            render: (text, record) => {
                return (
                    <Space>
                        <a>推广人</a>
                        <a>推广人订单</a>
                    </Space>
                );
            },
        },
    ];

    const queryFormFeild: QueryFormProps = [
        {
            label: '心动号',
            name: 'id',
            FeildProps: {
                placeholder: '请输入心动号',
            },
            feild: Input,
        },
        {
            label: '昵称/姓名',
            name: 'name',
            FeildProps: {
                placeholder: '请输入姓名或昵称',
            },
            feild: Input,
        },
        {
            label: '手机号',
            name: 'mobilePhone',
            FeildProps: {
                placeholder: '请输入手机号',
            },
            feild: Input,
        },

        {
            label: '时间选择',
            name: 'time',
            FeildProps: {
                allowClear: true,
            },
            colSpan: 6,
            feild: DatePicker.RangePicker,
        },
    ];

    const getDataSource = async (params: any) => {
        // const { areaIds } = params;
        // const [provinceId, cityId, areaId] = areaIds || [];
        // const newParams = {
        //     ...params,
        //     pageNum: params.pageNo,
        //     provinceId,
        //     cityId,
        //     areaId,
        // };
        // return getUserList(newParams);
    };

    return (
        <StarryCard>
            <div className="sub-tenant-manage-container">
                <StarryTable
                    columns={columns}
                    getDataSource={getDataSource}
                    queryFormFeild={queryFormFeild}
                    ref={tableRef}
                    fetchDataAfterMount={false}
                />
            </div>
        </StarryCard>
    );
};
