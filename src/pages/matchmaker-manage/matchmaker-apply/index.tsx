import { useRef, useState, useEffect } from 'react';
import StarryCard from '@/components/CardLayout';
import './index.less';
import 'antd/dist/reset.css';
import StarryTable, { RefStarryTable } from '@/components/StarryTable';
import { QueryFormProps } from '@/components/StarryTable/QueryFrom';
import { Cascader, Input, Select, Image, Divider, Space, Tooltip } from 'antd';
import { GENDER_OPTIONS } from '@/constant';
import { getAreaAndCity, getMatchmakerList } from '@/service/matchmaker';
import { ColumnsType } from 'antd/es/table';
import classNames from 'classnames';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';

const avater = require('@/assets/avter.jpg');

export default () => {
    const [areaMap, setAreaMap] = useState([]);
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
            fixed: 'left',
        },
        {
            title: '姓名',
            dataIndex: 'name',
            width: 120,
            fixed: 'left',
        },
        {
            title: '昵称',
            dataIndex: 'nickName',
            width: 120,
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
            title: '性别',
            dataIndex: 'sexName',
            width: 80,
        },
        {
            title: '年龄',
            dataIndex: 'birth',
            width: 50,
        },
        {
            title: '从事职业',
            dataIndex: 'vocationName',
            width: 150,
        },
        {
            title: '联系电话',
            dataIndex: 'mobilePhone',
            width: 150,
        },
        {
            title: '地址',
            dataIndex: 'houseStatusName',
            width: 150,
        },
        {
            title: '是否从事过红娘职业',
            dataIndex: '24',
            width: 150,
        },
        {
            title: '备注',
            dataIndex: 'features',
            width: 150,
        },
        {
            title: '申请时间',
            dataIndex: 'createTime',
            width: 150,
        },
        {
            title: '操作',
            dataIndex: 'id',
            fixed: 'right',
            width: 50,
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

    const [status, setStatus] = useState('0');
    const tabREf = useRef<RefStarryTable>(null);

    const queryFormFeild: QueryFormProps = [
        {
            label: '红娘名字',
            name: 'name',
            FeildProps: {
                placeholder: '请输入红娘名字',
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

    useEffect(() => {
        tabREf.current?.reload();
    }, [status]);

    const getDataSource = async (params: any) => {
        const { areaIds } = params;
        const [provinceId, cityId, areaId] = areaIds || [];
        const newParams = {
            ...params,
            provinceId,
            cityId,
            areaId,
            status,
        };
        return getMatchmakerList(newParams);
    };

    return (
        <StarryCard>
            <div className="sub-tenant-manage-container">
                <div className="matchmaker-status">
                    <div
                        onClick={() => setStatus('0')}
                        className={classNames('status-item', {
                            active: status === '0',
                        })}
                    >
                        全部
                    </div>
                    <div
                        onClick={() => setStatus('1')}
                        className={classNames('status-item', {
                            active: status === '1',
                        })}
                    >
                        申请中
                    </div>
                    <div
                        onClick={() => setStatus('2')}
                        className={classNames('status-item', {
                            active: status === '2',
                        })}
                    >
                        申请通过
                    </div>
                    <div
                        onClick={() => setStatus('3')}
                        className={classNames('status-item', {
                            active: status === '3',
                        })}
                    >
                        申请驳回
                    </div>
                </div>
                <Divider />
                <StarryTable
                    columns={columns}
                    getDataSource={getDataSource}
                    queryFormFeild={queryFormFeild}
                    fetchDataAfterMount={false}
                    ref={tabREf}
                />
            </div>
        </StarryCard>
    );
};
