import CardLayout from '@/components/CardLayout';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Space, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';

const index = () => {
    return (
        <CardLayout>
            <div style={{ margin: '10px 0 30px 0' }}>登录页封面图</div>

            <Form>
                <Form.Item
                    rules={[{ required: true }]}
                    name={'policy'}
                    label={'封面图'}
                >
                    <Upload action="/upload.do" listType="picture-card">
                        <button
                            style={{ border: 0, background: 'none' }}
                            type="button"
                        >
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    <Space style={{ marginLeft: 65 }}>
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
