import {
    Button,
    Col,
    Form,
    FormInstance,
    Input,
    Row,
    Select,
    Space,
} from 'antd';
import React, { ReactNode } from 'react';
export type QueryFormProps = {
    feild: any;
    name: ReactNode;
    label: ReactNode;
    colSpan?: number;
    initialValue?: any;
    rules?: any;
    FeildProps: any; // 数据录入属性
}[];
export interface Props {
    qeryForm?: QueryFormProps;
    onChange?: (value: any) => void;
}

export const QueryFrom: React.FC<Props> = (props) => {
    const { qeryForm, onChange } = props;

    const [form] = Form.useForm();

    if (!qeryForm?.length) {
        return null;
    }

    const onSubmit = (value: any) => {
        const params = form.getFieldsValue();
        onChange?.({ ...params });
    };
    const reset = () => {
        form.resetFields();
        const params = form.getFieldsValue();
        onChange?.({ ...params });
    };

    return (
        <div className="starry-table-form">
            <Form form={form} layout={'vertical'}>
                <Row gutter={16}>
                    {qeryForm.map((item, index) => {
                        const {
                            feild: Feild,
                            name,
                            label,
                            initialValue,
                            ...rest
                        } = item;
                        return (
                            <Col span={item.colSpan || 4} key={index}>
                                <Form.Item
                                    label={item.label}
                                    name={item.name}
                                    initialValue={initialValue}
                                    {...rest}
                                >
                                    {<Feild allowClear {...item.FeildProps} />}
                                </Form.Item>
                            </Col>
                        );
                    })}
                </Row>
            </Form>
            <div className="starry-table-form-button">
                <Button onClick={onSubmit} type="primary">
                    查询
                </Button>
                <Button onClick={reset}>重置</Button>
            </div>
        </div>
    );
};
