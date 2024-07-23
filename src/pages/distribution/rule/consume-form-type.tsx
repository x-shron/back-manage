import { ConfigProvider, Divider, InputNumber, Segmented } from 'antd';
import React, { useState } from 'react';

const onlineConsumeType = ['vip', '999', '9999'];
const offlineConsumeType = ['999', '9999'];

const OnlineType: React.FC<any> = () => {
    const [type, setType] = useState('vip');
    return (
        <div className="card">
            <Segmented
                value={type}
                onChange={setType}
                block
                options={onlineConsumeType}
            />
            <div className="title">订单支付方</div>
            <div className="title-sub">一级分销:</div>
            <div className="content">
                现金红包 <InputNumber min={0} /> 心动红包
                <InputNumber min={0} />
            </div>
            <div className="title-sub">二级分销:</div>
            <div className="content">
                现金红包 <InputNumber min={0} /> 心动红包
                <InputNumber min={0} />
            </div>
            {type !== 'vip' && (
                <>
                    <Divider />
                    <div className="title">订单受方</div>
                    <div className="title-sub">一级分销:</div>
                    <div className="content">
                        现金红包 <InputNumber min={0} /> 心动红包
                        <InputNumber min={0} />
                    </div>
                    <div className="title-sub">二级分销:</div>
                    <div className="content">
                        现金红包 <InputNumber min={0} /> 心动红包
                        <InputNumber min={0} />
                    </div>
                </>
            )}
        </div>
    );
};

const OfflineType: React.FC<any> = () => {
    const [type, setType] = useState('999');
    return (
        <div className="card">
            <Segmented
                value={type}
                onChange={setType}
                block
                options={offlineConsumeType}
            />
            <div className="title">订单支付方</div>
            <div className="title-sub">一级分销:</div>
            <div className="content">
                现金红包 <InputNumber min={0} /> 心动红包
                <InputNumber min={0} />
            </div>
            <div className="title-sub">二级分销:</div>
            <div className="content">
                现金红包 <InputNumber min={0} /> 心动红包
                <InputNumber min={0} />
            </div>
        </div>
    );
};

const ConsumeFormType: React.FC<any> = ({ disabled, type }) => {
    return (
        <div className="consume-form-type">
            {type === 'a' && (
                <div className="card">
                    <div className="title">订单支付方</div>
                    <div className="title-sub">一级分销:</div>
                    <div className="content">
                        现金红包 <InputNumber min={0} /> 心动红包
                        <InputNumber min={0} />
                    </div>
                    <div className="title-sub">二级分销:</div>
                    <div className="content">
                        现金红包 <InputNumber min={0} /> 心动红包
                        <InputNumber min={0} />
                    </div>
                </div>
            )}
            {type === 'b' && <OnlineType />}
            {type === 'c' && <OfflineType />}
        </div>
    );
};

export default ConsumeFormType;
