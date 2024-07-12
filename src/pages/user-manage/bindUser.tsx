import { Form, message, Modal, Select, Spin } from 'antd';
import React, { useState } from 'react';
import { useDebounceFn } from 'ahooks';
import { getUserList } from '@/service/matchmaker';
import { validatorHeartNo } from '@/utils/commonVal';
import UserSelect from '@/components/userSelect';

interface Props {
    visible: boolean;
    onCancel: () => void;
    onOk: (value: any) => void;
}

const BindUser: React.FC<Props> = ({ visible, onCancel, onOk }) => {
    const [form] = Form.useForm();
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
                    <UserSelect />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default BindUser;
