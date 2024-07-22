import {
    CheckCircleOutlined,
    CheckCircleTwoTone,
    ClockCircleOutlined,
    CloseCircleOutlined,
    StopOutlined,
} from '@ant-design/icons';
import { Timeline, Image, Space, Tooltip, message } from 'antd';
import React, { useState } from 'react';
import { cloneDeep } from 'lodash';

const TimeInfo = ({ trendList }: any) => {
    const [temp, setTemp] = useState<any[]>([]);

    const audit = (status: any, index: any) => {
        message.error('功能后端尚未开放，敬请期待');
        const targetIndex = temp.findIndex((item) => item.index == index);
        if (targetIndex >= 0) {
            temp[targetIndex].status = status;
            setTemp([...temp]);
        } else {
            setTemp([...temp, { index, status }]);
        }
    };

    const getDot = (index: any) => {
        const targetIndex = temp.findIndex((item) => item.index == index);
        if (targetIndex > -1) {
            return (
                <Tooltip title="已审核">
                    {temp[targetIndex].status == 1 ? (
                        <CheckCircleOutlined className="audit-item-green" />
                    ) : (
                        <StopOutlined className="audit-item-red" />
                    )}
                </Tooltip>
            );
        }

        return (
            <Tooltip title="待审核">
                <ClockCircleOutlined className="audit-item-yellow " />
            </Tooltip>
        );
    };

    const info = (item: any, index: any) => {
        const targetIndex = temp.findIndex((item) => item.index == index);

        return (
            <div
                className={`detail-dynamic ${
                    temp[targetIndex]?.status == 0 ? 'audit-fail' : ''
                }`}
            >
                <pre
                    style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
                >{`${item.content}`}</pre>
                <div>
                    {item.imageList.map((item: any) => {
                        return (
                            <div className="image-item">
                                <Image src={item} alt="img" width={150} />
                            </div>
                        );
                    })}
                </div>
                <div style={{ color: 'gray', marginBottom: '20px' }}>
                    {item.createTime}
                    <Space size="large" className="operate-audit">
                        <Tooltip placement="left" title="审核通过">
                            <CheckCircleOutlined
                                onClick={() => audit(1, index)}
                                className="audit-item-green"
                            />
                        </Tooltip>
                        <Tooltip placement="right" title="审核不通过">
                            <StopOutlined
                                onClick={() => audit(0, index)}
                                className="audit-item-red"
                            />
                        </Tooltip>
                    </Space>
                </div>
            </div>
        );
    };
    return (
        <Timeline
            mode="left"
            items={cloneDeep(trendList || [])
                .reverse()
                .map((item: any, index: number) => {
                    return {
                        children: info(item, index),
                        dot: getDot(index),
                    };
                })}
        />
    );
};

export default TimeInfo;
