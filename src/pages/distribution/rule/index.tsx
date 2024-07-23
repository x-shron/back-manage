import CardLayout from '@/components/CardLayout';
import React, { useState } from 'react';
import './index.less';
import {
    Button,
    ConfigProvider,
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
import {
    CheckCircleOutlined,
    EditOutlined,
    RedoOutlined,
    SaveOutlined,
} from '@ant-design/icons';
import ConsumeFormType from './consume-form-type';

const index = () => {
    const [form] = Form.useForm();
    const disabled = Form.useWatch('status', form) === 0;
    const [edit, setEdit] = useState(false);
    const [distributionType, setDistributionType] = useState('a');

    return (
        <CardLayout>
            <ConfigProvider componentDisabled={disabled || !edit}>
                <div className="distribution-rule-setting">
                    <div className="base-set">
                        <p>基本设置</p>
                        <Form form={form}>
                            <Form.Item
                                name={'status'}
                                label={'是否启用分销'}
                                initialValue={1}
                            >
                                <Radio.Group disabled={!edit}>
                                    <Radio value={1}>开启</Radio>
                                    <Radio value={0}>关闭</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label={'分销最低金额（元）'}>
                                <InputNumber min={0} />
                            </Form.Item>
                            <div className="title-text">相亲 分销触发规则</div>
                            <Form.Item
                                className="indent"
                                label={'主动方'}
                                name={'buyer'}
                                initialValue={0}
                            >
                                <Select
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
                                    options={[
                                        {
                                            label: '订单完成并8天犹豫期后',
                                            value: 0,
                                        },
                                    ]}
                                />
                            </Form.Item>
                            <div className="title-text">捐献爱心</div>
                            <Form.Item
                                className="indent"
                                label={'现金红包（%）'}
                            >
                                <InputNumber min={0} />
                            </Form.Item>
                            <Form.Item
                                className="indent"
                                label={'心动红包（%）'}
                            >
                                <InputNumber min={0} />
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="rule">
                        <p>分销提成规则</p>
                        <Radio.Group
                            disabled={false}
                            value={distributionType}
                            onChange={(e) =>
                                setDistributionType(e.target.value)
                            }
                            defaultValue="a"
                            buttonStyle="solid"
                        >
                            <Radio.Button value="a">
                                {'一般用户(一级)'}
                            </Radio.Button>
                            <Radio.Button value="b">
                                {'线上红娘(两级)'}
                            </Radio.Button>
                            <Radio.Button value="c">
                                {'线下红娘(两级)'}
                            </Radio.Button>
                        </Radio.Group>
                        {disabled ? (
                            <Empty
                                description={'已关闭分销功能'}
                                style={{ marginTop: 100 }}
                            />
                        ) : (
                            <ConsumeFormType type={distributionType} />
                        )}
                    </div>
                </div>
            </ConfigProvider>
            <Divider />
            <Space className="distribution-rule-setting-button">
                <Button
                    icon={edit ? <RedoOutlined /> : <EditOutlined />}
                    onClick={() => setEdit(!edit)}
                >
                    {edit ? '取消' : '编辑'}
                </Button>
                {edit ? (
                    <Button icon={<CheckCircleOutlined />} type="primary">
                        保存
                    </Button>
                ) : null}
            </Space>
        </CardLayout>
    );
};

export default index;
