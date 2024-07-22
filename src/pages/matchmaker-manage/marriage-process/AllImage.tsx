import React from 'react';
import './allImage.less';
import { Descriptions, Image } from 'antd';

const emptyImg = require('@/assets/empty.png');
const AllImage: React.FC<any> = ({ detail }) => {
    const items: any[] = [
        {
            label: '学历证',
            children: (
                <Image
                    width={140}
                    fallback={emptyImg}
                    src={detail?.educationImg}
                />
            ),
        },
        {
            label: '身份证',
            children: (
                <Image width={140} fallback={emptyImg} src={detail?.idImg} />
            ),
        },
        {
            label: '房产证',
            children: (
                <Image
                    width={140}
                    fallback={emptyImg}
                    src={detail?.propertyImg}
                />
            ),
        },
        {
            label: '驾驶证',
            children: (
                <Image
                    width={140}
                    fallback={emptyImg}
                    src={detail?.driverIdImg}
                />
            ),
        },
        {
            label: '工作证',
            children: (
                <Image width={140} fallback={emptyImg} src={detail?.jobImg} />
            ),
        },
    ];

    return (
        <div className="all-image-detail">
            <Descriptions items={items} />
        </div>
    );
};

export default AllImage;
