import CardLayout from '@/components/CardLayout';
import {
    Button,
    Divider,
    Empty,
    Form,
    Input,
    message,
    Modal,
    Select,
    Space,
    Tabs,
    Tooltip,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { marriage_process_type } from '../constant';
import StarryTable, { RefStarryTable } from '@/components/StarryTable';
import {
    ApartmentOutlined,
    AuditOutlined,
    DeleteTwoTone,
    EditTwoTone,
    UnlockOutlined,
    UserAddOutlined,
} from '@ant-design/icons';
import {
    bindMatchMaker,
    getMarriageList,
    marriageStatusChange,
} from '@/service/matchmaker';
import { ColumnsType } from 'antd/es/table';
import { useHistory } from 'umi';
import UserSelect from '@/components/userSelect';

const MarriageProcess = () => {
    const [activeKey, setActiveKey] = useState<string | undefined>(undefined);
    const tabREf = useRef<RefStarryTable>(null);
    const history = useHistory();
    const [currentItem, setCurrentItem] = useState<any>();
    const [matchMakerVisible, setMatchMakerVisible] = useState(false);
    const [handleVisible, setHandleVisible] = useState(false);

    const [matchMarkerForm] = Form.useForm();
    const [handleForm] = Form.useForm();

    useEffect(() => {
        tabREf.current?.reload();
    }, [activeKey]);

    const goDetail = (id: string) => {
        history.push(`/user-list?id=${id}`);
    };
    const columns: ColumnsType<any> = [
        {
            title: '心动号',
            dataIndex: 'id',
            fixed: 'left',
        },
        {
            title: '申请人ID',
            dataIndex: 'name',
            fixed: 'left',
            render: (name, record) => {
                return (
                    <a
                        onClick={() => goDetail(record.userId)}
                    >{`${name} (${record.userId})`}</a>
                );
            },
        },
        {
            title: '申请人状态',
            dataIndex: 'statusName',
            fixed: 'left',
        },
        {
            title: '接受人ID',
            dataIndex: '123',
            render: (name, record) => {
                return name ? (
                    <a
                        onClick={() => goDetail(record.userId)}
                    >{`${name} (${record.userId})`}</a>
                ) : null;
            },
        },
        {
            title: '被接受时-状态',
            dataIndex: 'nickName',
        },
        {
            title: '申请时间',
            dataIndex: 'sexName',
        },
        {
            title: '红娘',
            dataIndex: 'matchMarkerName',
            render: (name, record) => {
                return (
                    <Space>
                        {name}
                        <Tooltip title="指派红娘">
                            <a
                                onClick={() => {
                                    setMatchMakerVisible(true);
                                    setCurrentItem(record);
                                }}
                            >
                                <UserAddOutlined />
                            </a>
                        </Tooltip>
                    </Space>
                );
            },
        },
        {
            title: '操作',
            dataIndex: 'id',
            render: (_, record) => {
                return (
                    <Space size={'large'}>
                        <Tooltip title="跟进">
                            <a
                                onClick={() => {
                                    setHandleVisible(true);
                                    setCurrentItem(record);
                                }}
                            >
                                <AuditOutlined />
                            </a>
                        </Tooltip>
                        <Tooltip title="解除用户相亲限制">
                            <a>
                                <UnlockOutlined />
                            </a>
                        </Tooltip>
                    </Space>
                );
            },
        },
        {
            title: '状态',
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

    const bindUser = () => {
        matchMarkerForm.validateFields().then((values) => {
            bindMatchMaker({
                ...values,
                taUserId: currentItem.userId,
                id: currentItem.id,
            })
                .then(() => {
                    tabREf.current?.reload();
                    message.success('绑定成功');
                })
                .finally(() => {
                    setCurrentItem(undefined);
                    setMatchMakerVisible(false);
                });
        });
    };

    const handleStatus = (values: any) => {
        marriageStatusChange({
            ...values,
            id: currentItem.id,
        })
            .then(() => {
                message.success('操作成功');
                tabREf.current?.reload();
            })
            .finally(() => {
                setCurrentItem(undefined);
                setHandleVisible(false);
            });
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
            <Modal
                title="跟进"
                centered
                destroyOnClose
                open={handleVisible}
                footer={null}
                onCancel={() => {
                    setCurrentItem(undefined);
                    setHandleVisible(false);
                }}
            >
                <Form
                    onFinish={handleStatus}
                    labelCol={{ span: 4 }}
                    preserve={false}
                    form={matchMarkerForm}
                >
                    <Form.Item
                        name="status"
                        label="线下状态"
                        rules={[
                            { required: true, message: '请选择跟进线下状态' },
                        ]}
                    >
                        <Select
                            placeholder="请选择跟进线下状态"
                            options={marriage_process_type.filter(
                                (item: any, i: number) => i,
                            )}
                        />
                    </Form.Item>
                    <Form.Item name="mark" label="备注">
                        <Input.TextArea placeholder="请输入跟进记录" />
                    </Form.Item>
                    <Form.Item>
                        <Space style={{ float: 'right' }} size="large">
                            <Button
                                onClick={() => {
                                    setHandleVisible(false);
                                    setCurrentItem(undefined);
                                }}
                            >
                                取消
                            </Button>
                            <Button htmlType="submit" type="primary">
                                确定
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
                <Divider />
                <div>全部跟进记录</div>
                <Empty />
            </Modal>
            <Modal
                title="指派红娘"
                centered
                width={400}
                open={matchMakerVisible}
                onOk={bindUser}
                destroyOnClose
                onCancel={() => {
                    setCurrentItem(undefined);
                    setMatchMakerVisible(false);
                }}
            >
                <Form preserve={false} form={matchMarkerForm}>
                    <Form.Item
                        name="matchmakerUserId"
                        rules={[{ required: true, message: '请选择红娘' }]}
                    >
                        {/* 6是红娘 */}
                        <UserSelect role="6" placeholder="请选择红娘" />
                    </Form.Item>
                </Form>
            </Modal>
        </CardLayout>
    );
};

export default MarriageProcess;
