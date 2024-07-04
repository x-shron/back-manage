import { useRef, useState, useEffect } from 'react';
import StarryCard from '@/components/CardLayout';
import './index.less';
import StarryTable from '@/components/StarryTable';
import { QueryFormProps } from '@/components/StarryTable/QueryFrom';
import {
    Cascader,
    Input,
    Select,
    Image,
    InputNumber,
    Space,
    Tooltip,
} from 'antd';
import { GENDER_OPTIONS, MARRIAGE_STATUS_OPTIONS } from '@/constant';
import { getMatchmakerList } from '@/service/matchmaker';
import { ColumnsType } from 'antd/es/table';
import {
    getAreaAndCity,
    getJobMap,
    getSchoolMap,
    getTagMap,
    getUserRoleMap,
} from '@/service/common';
import { transFromToOptions } from '@/utils/commonVal';
import DetailModal from './detail-modal';
import {
    DeleteOutlined,
    DownloadOutlined,
    LinkOutlined,
    NodeIndexOutlined,
    PoweroffOutlined,
} from '@ant-design/icons';

const avater = require('@/assets/avter.jpg');

export default () => {
    const [areaMap, setAreaMap] = useState([]);
    const [roleMap, setRoleMap] = useState([]);
    const [jobMap, setJobMap] = useState([]);
    const [tagMap, setTagMap] = useState([]);
    const [schoolMap, setSchoolMap] = useState([]);

    const [detailInfo, setDetailInfo] = useState(undefined);

    const columns: ColumnsType<any> = [
        {
            title: '序号',
            dataIndex: 'id',
            width: 60,
            ellipsis: true,
            render: (text, record, index) => index + 1,
        },
        {
            title: '心动号',
            ellipsis: true,
            dataIndex: 'id',
        },
        {
            title: '昵称',
            ellipsis: true,
            dataIndex: 'nickName',
        },
        {
            title: '真实姓名',
            dataIndex: 'name',
            ellipsis: true,
            render: (text, record) => {
                return <a onClick={() => setDetailInfo(record)}>{text}</a>;
            },
        },
        {
            title: '性别',
            ellipsis: true,
            dataIndex: 'mobilePhone',
        },
        {
            title: '年龄',
            ellipsis: true,
            dataIndex: 'id2',
        },
        {
            title: '手机号',
            ellipsis: true,
            dataIndex: 'id2',
        },
        {
            title: '所在地',
            ellipsis: true,
            dataIndex: 'id2',
        },
        {
            title: '职业',
            ellipsis: true,
            dataIndex: 'id2',
        },
        {
            title: '婚恋状况',
            dataIndex: 'id',
            ellipsis: true,
        },
        {
            title: '操作',
            ellipsis: true,
            dataIndex: 'id',
            fixed: 'right',
            width: 150,
            render: (text, record) => {
                return (
                    <Space>
                        <Tooltip title="注销用户">
                            <a>
                                <PoweroffOutlined />
                            </a>
                        </Tooltip>
                        <Tooltip title="解绑用户">
                            <a>
                                <LinkOutlined />
                            </a>
                        </Tooltip>
                        <Tooltip title="绑定用户">
                            <a>
                                <NodeIndexOutlined />
                            </a>
                        </Tooltip>
                    </Space>
                );
            },
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
            label: '昵称/姓名',
            name: 'name',
            FeildProps: {
                placeholder: '请输入姓名或昵称',
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
            label: '性别',
            name: 'gender',
            FeildProps: {
                placeholder: '请选择性别',
                options: GENDER_OPTIONS,
                allowClear: true,
            },
            feild: Select,
        },
        {
            label: '年龄',
            name: 'age',
            FeildProps: {
                placeholder: '请輸入年齡',
                allowClear: true,
            },
            feild: InputNumber,
        },
        {
            label: '职业',
            name: 'job',
            FeildProps: {
                placeholder: '请选择职业',
                options: jobMap,
                allowClear: true,
            },
            feild: Select,
        },
        {
            label: '婚恋状况 ',
            name: 'marriage',
            FeildProps: {
                placeholder: '请选择婚恋状况 ',
                options: MARRIAGE_STATUS_OPTIONS,
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
        getAreaAndCity().then((res: any) => {
            setAreaMap(res);
        });
        getUserRoleMap().then((res: any) => {
            setRoleMap(transFromToOptions(res));
        });
        getJobMap().then((res) => {
            setJobMap(transFromToOptions(res));
        });
        getSchoolMap().then((res) => {
            console.log('school', res);
        });
        getTagMap().then((res) => {
            setTagMap(transFromToOptions(res));
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
        return {
            records: [
                {
                    name: 'Mr. wang',
                    id: 1,
                },
            ],
            total: 1,
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
                    rightTool={[
                        <a title="下载">
                            <DownloadOutlined />
                        </a>,
                    ]}
                />
                <DetailModal
                    detailInfo={detailInfo}
                    onClose={() => setDetailInfo(undefined)}
                />
            </div>
        </StarryCard>
    );
};
