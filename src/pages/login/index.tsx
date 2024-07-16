import { useState, useEffect, useRef } from 'react';
import { history, useHistory } from 'umi';
import { Button, Form, Input, message, Select } from 'antd';
import Icon, { KeyOutlined, UserOutlined } from '@ant-design/icons';
// @ts-ignore
import { ReactComponent as TopLeft } from '@/assets/icons/ic_bugle_01.svg';
import { ReactComponent as TopRight } from '@/assets/icons/ic_bugle_02.svg';
import { ReactComponent as BottomLeft } from '@/assets/icons/ic_bugle_03.svg';
import { ReactComponent as BottomRight } from '@/assets/icons/ic_bugle_04.svg';
import { fetchAuthCode, userLogin } from '@/service/login';

import './index.less';

const FormItem = Form.Item;
const { Option } = Select;

export default () => {
    const [form] = Form.useForm();
    const [errInfo, setErrInfo] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const [codeSrc, setCodeSrc] = useState('');
    const [authParams, setAuthParams] = useState({
        uuid: '',
    });

    const getSrc = () => {
        return new Promise(async (resolve) => {
            await fetchAuthCode().then((data: any) => {
                resolve(data);
            });
        });
    };
    const refreshCode = async () => {
        const res: any = await getSrc();
        setAuthParams({
            uuid: res.uuid,
        });
        setCodeSrc(`data:image/gif;base64,${res.authCodePic}`);
    };

    useEffect(() => {
        // refreshCode();
    }, []);

    const codeRef = useRef(null);
    const history = useHistory();

    // 处理登录请求
    const handleLogin = () => {
        form.validateFields().then((values: any) => {
            setLoading(true);
            userLogin({
                userName: values.account,
                password: values.password,
            })
                .then((data: any) => {
                    message.success('登录成功');
                    console.log(data);
                    data && window.sessionStorage.setItem('AUTH_TOKEN', data);
                    history.push('/');
                })
                .finally(() => {
                    setLoading(false);
                });
        });
    };

    return (
        <>
            <div className="login">
                <div className="login-content">
                    <div className="login-content-form">
                        <div className="top-banner">
                            <TopLeft className="top-banner-left" />
                            <TopRight className="top-banner-right" />
                        </div>
                        <div className="login-form-title">登录</div>
                        <Form
                            form={form}
                            onKeyPress={(e) => {
                                if (e.code === 'Enter') {
                                    handleLogin();
                                }
                            }}
                        >
                            <FormItem
                                name="account"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入用户名',
                                    },
                                    {
                                        max: 50,
                                        message: '最多输入50个字符',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="请输入用户名"
                                    maxLength={50}
                                    prefix={
                                        <UserOutlined className="input-prefix" />
                                    }
                                    style={{ width: 360, height: 40 }}
                                />
                            </FormItem>
                            <FormItem
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入密码',
                                    },
                                    {
                                        max: 20,
                                        message: '最多输入20个字符',
                                    },
                                ]}
                            >
                                <Input
                                    type="password"
                                    placeholder="请输入密码"
                                    maxLength={20}
                                    prefix={
                                        <KeyOutlined className="input-prefix" />
                                    }
                                    style={{ width: 360, height: 40 }}
                                />
                            </FormItem>
                            {/* <FormItem className="code-form-item">
                                <FormItem
                                    name="authCode"
                                    noStyle
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入验证码',
                                        },
                                        {
                                            min: 4,
                                            message: '验证码至少填写4个字符',
                                        },
                                        {
                                            max: 4,
                                            message: '验证码不能超过4个字符',
                                        },
                                       
                                    ]}
                                >
                                    <Input
                                        className="authcode-input"
                                        autoComplete="off"
                                        placeholder='请输入验证码'
                                        maxLength={4}
                                        prefix={
                                            <InfoCircleOutlined  className="input-prefix"/>

                                        }
                                        style={{ width: 253, height: 40 }}
                                    />
                                </FormItem>
                                <img
                                    ref={codeRef}
                                    onClick={refreshCode}
                                    className="code-img"
                                    src={codeSrc}
                                    style={{ cursor: 'pointer' }}
                                />
                            </FormItem> */}
                        </Form>
                        <div className="error-info">{errInfo}</div>
                        <Button
                            loading={loading}
                            className="login-btn"
                            onClick={handleLogin}
                        >
                            登录
                        </Button>
                        <div className="bottom-banner">
                            <BottomLeft className="bottom-banner-left" />
                            <BottomRight className="bottom-banner-right" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
