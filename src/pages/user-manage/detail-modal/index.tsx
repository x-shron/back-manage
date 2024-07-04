import { Descriptions, Divider, Modal, Tabs, TabsProps, Tag } from 'antd';
import { DescriptionsItemType } from 'antd/es/descriptions';
import React, { useEffect, useState } from 'react';
import './index.less';

const DetailModal: React.FC<any> = ({ detailInfo, onClose }) => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (detailInfo?.id) {
            setVisible(true);
        }
    }, [detailInfo]);

    const onCancel = () => {
        setVisible(false);
        onClose?.();
    };

    const items: DescriptionsItemType[] = [
        {
            label: '姓名',
            children: detailInfo?.name || '--',
        },
        {
            label: '身高',
            children: detailInfo?.degree || '--',
        },
        {
            label: '体重',
            children: detailInfo?.degree || '--',
        },
        {
            label: '生肖',
            children: detailInfo?.degree || '--',
        },
        {
            label: '家乡',
            children: detailInfo?.degree || '--',
        },
        {
            label: '职业',
            children: detailInfo?.degree || '--',
        },
        {
            label: '学历',
            children: detailInfo?.degree || '--',
        },
        {
            label: '毕业学校',
            children: detailInfo?.degree || '--',
        },
        {
            label: '子女情况',
            children: detailInfo?.degree || '--',
        },
        {
            label: '年收入',
            children: detailInfo?.degree || '--',
        },
        {
            label: '住房',
            children: detailInfo?.degree || '--',
        },
        {
            label: '汽车',
            children: detailInfo?.degree || '--',
        },
        {
            label: '星座',
            children: detailInfo?.degree || '--',
        },
        {
            label: '平台备注',
            children: detailInfo?.degree || '--',
        },
    ];

    const tabsItems: TabsProps['items'] = [
        {
            key: '1',
            label: '自我评价',
            children: 'Content of Tab Pane 1',
        },
        {
            key: '2',
            label: '家庭背景',
            children: 'Content of Tab Pane 2',
        },
        {
            key: '3',
            label: '爱情观念',
            children: 'Content of Tab Pane 3',
        },
        {
            key: '4',
            label: '理想的另一半',
            children: 'Content of Tab Pane 3',
        },
    ];

    return (
        <Modal
            width={'70%'}
            title={`用户详情`}
            footer={null}
            centered
            onCancel={onCancel}
            open={visible}
            className="user-detail-modal"
        >
            <div className="detail-modal-title">基本信息</div>
            <Descriptions className="detail-item" items={items} />
            <div className="detail-modal-title">个性标签</div>
            <div className="detail-item">
                <Tag color="magenta">magenta</Tag>
                <Tag color="red">red</Tag>
                <Tag color="volcano">volcano</Tag>
                <Tag color="orange">orange</Tag>
                <Tag color="gold">gold</Tag>
            </div>
            <div className="detail-modal-title">关于他</div>
            <div className="detail-item">
                <Tabs type="card" defaultActiveKey="1" items={tabsItems} />
            </div>
            <div className="detail-modal-title">留言板</div>
            <div className="detail-item">
                <div>
                    <span className="detail-label">xxxxx留言: </span>
                    <span>你好啊</span>
                </div>
            </div>
        </Modal>
    );
};

export default DetailModal;
