import { ClockCircleOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';
import React from 'react';

const TimeInfo = ({ trendList }: any) => {
    return (
        <Timeline
            mode="left"
            items={trendList.map((item: any, index: number) => {
                return {
                    children: `${item.content} (${item.createTime})`,
                    dot:
                        index === trendList.length - 1 ? (
                            <ClockCircleOutlined className="timeline-clock-icon" />
                        ) : undefined,
                    color: index === trendList.length - 1 ? 'green' : undefined,
                };
            })}
        />
    );
};

export default TimeInfo;
