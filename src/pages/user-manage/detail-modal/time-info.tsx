import { ClockCircleOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';
import React from 'react';

const TimeInfo = () => {
    return (
        <Timeline
            mode="left"
            items={[
                {
                    children: '发表说说 2015-09-01',
                },
                {
                    children: 'Solve initial network problems 2015-09-01',
                },
                {
                    children: 'Technical testing 2015-09-01',
                },
                {
                    children: '注册为用户2015-09-03',
                    dot: (
                        <ClockCircleOutlined className="timeline-clock-icon" />
                    ),
                    color: 'green',
                },
            ]}
        />
    );
};

export default TimeInfo;
