import { Form, message, Modal, Select, Spin } from 'antd';
import React, { useState } from 'react';
import { useDebounceFn } from 'ahooks';
import { getUserList } from '@/service/matchmaker';
import { validatorHeartNo } from '@/utils/commonVal';

interface Props {
    visible: boolean;
    onCancel: () => void;
    onOk: (value: any) => void;
}

const BindUser: React.FC<Props> = ({ visible, onCancel, onOk }) => {
    const [userList, setUserList] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [form] = Form.useForm();

    const { run } = useDebounceFn(
        (value: string) => {
            if (fetching) return;
            validatorHeartNo(undefined, value).then(
                () => {
                    setFetching(true);
                    setUserList([]);
                    getUserList({ id: value })
                        .then((res) => {
                            const list = (res.records || []).map(
                                (item: any) => {
                                    return {
                                        value: item.id,
                                        label: `${
                                            item.name || item.nickName || '-'
                                        }(${item.id})`,
                                    };
                                },
                            );
                            setUserList(list);
                        })
                        .finally(() => {
                            setFetching(false);
                        });
                },
                (err) => {
                    message.error(err);
                },
            );
        },
        { wait: 500 },
    );

    const handle = () => {
        form.validateFields().then((values: any) => {
            onOk?.(values);
        });
    };
    return (
        <Modal
            title="绑定用户"
            centered
            open={visible}
            onCancel={onCancel}
            onOk={handle}
            destroyOnClose
            width={450}
        >
            <Form form={form} layout="inline" preserve={false}>
                <Form.Item
                    label="用户"
                    name="targetUserId"
                    rules={[{ required: true, message: '请选择用户' }]}
                >
                    <Select
                        placeholder="请输入心动号并选择用户"
                        options={userList}
                        onSearch={run}
                        showSearch
                        style={{ width: 350 }}
                        notFoundContent={
                            fetching ? (
                                <Spin size="small">
                                    <div style={{ height: 100 }}></div>
                                </Spin>
                            ) : null
                        }
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default BindUser;
