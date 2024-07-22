import CardLayout from '@/components/CardLayout';
import React from 'react';
import './index.less';
import {
    Button,
    Divider,
    Empty,
    Form,
    Input,
    InputNumber,
    Radio,
    Segmented,
    Select,
    Space,
} from 'antd';

const index = () => {
    const [form] = Form.useForm();
    const disabled = Form.useWatch('status', form) === 0;

    return (
        <CardLayout>
            <div className="distribution-rule-setting">
                <div className="base-set">
                    <p>基本设置</p>
                    <Form form={form}>
                        <Form.Item
                            name={'status'}
                            label={'是否启用分销'}
                            initialValue={1}
                        >
                            <Radio.Group>
                                <Radio value={1}>开启</Radio>
                                <Radio value={0}>关闭</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label={'分销最低金额（元）'}>
                            <InputNumber disabled={disabled} min={0} />
                        </Form.Item>
                        <div className="title-text">相亲 分销触发规则</div>
                        <Form.Item
                            className="indent"
                            label={'主动方'}
                            name={'buyer'}
                            initialValue={0}
                        >
                            <Select
                                disabled={disabled}
                                options={[
                                    {
                                        label: '订单支付后',
                                        value: 0,
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            className="indent"
                            label={'被动方'}
                            name={'dealer'}
                            initialValue={0}
                        >
                            <Select
                                disabled={disabled}
                                options={[
                                    {
                                        label: '订单完成并8天犹豫期后',
                                        value: 0,
                                    },
                                ]}
                            />
                        </Form.Item>
                        <div className="title-text">捐献爱心</div>
                        <Form.Item className="indent" label={'现金红包（%）'}>
                            <InputNumber disabled={disabled} min={0} />
                        </Form.Item>
                        <Form.Item className="indent" label={'心动红包（%）'}>
                            <InputNumber disabled={disabled} min={0} />
                        </Form.Item>
                    </Form>
                </div>
                <div className="rule">
                    <p>分销提成规则</p>
                    <Segmented
                        defaultValue="一般用户(一级)"
                        style={{ marginBottom: 8 }}
                        options={[
                            '一般用户(一级)',
                            '线上红娘(两级)',
                            '线下红娘(两级)',
                        ]}
                    />
                    <Empty style={{ marginTop: 100 }} />
                </div>
            </div>
            <Divider />
            <Space className="distribution-rule-setting-button">
                <Button type="primary">保存</Button>
                <Button>取消</Button>
            </Space>
        </CardLayout>
    );
};

export default index;
