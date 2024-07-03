import CardLayout from '@/components/CardLayout';
import { Button, Form, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';

const index = () => {
    return (
        <CardLayout>
            <div style={{ margin: '10px 0 30px 0' }}>隐私政策</div>
            <Form>
                <Form.Item
                    rules={[{ required: true }]}
                    name={'policy'}
                    label={'隐私政策'}
                >
                    <TextArea
                        style={{ width: 600 }}
                        rows={8}
                        placeholder="请输入隐私政策"
                    />
                </Form.Item>
                <Form.Item
                    rules={[{ required: true }]}
                    required
                    name={'protocol'}
                    label={'服务协议'}
                >
                    <TextArea
                        style={{ width: 600 }}
                        rows={8}
                        placeholder="请输入服务协议"
                    />
                </Form.Item>
                <Form.Item>
                    <Space style={{ marginLeft: 80 }}>
                        <Button htmlType="reset">取消</Button>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </CardLayout>
    );
};

export default index;
