import CardLayout from '@/components/CardLayout';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';

const index = () => {
    return (
        <CardLayout>
            <div style={{ margin: '10px 0 30px 0' }}>帮助与客服</div>
            <Form>
                <Form.Item
                    rules={[{ required: true }]}
                    name={'policy'}
                    label={'客服电话'}
                >
                    <Input style={{ width: 250 }} />
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
