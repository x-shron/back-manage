import {
    Descriptions,
    Divider,
    Input,
    Modal,
    Radio,
    Space,
    Tabs,
    TabsProps,
    Tag,
} from 'antd';
import { DescriptionsItemType } from 'antd/es/descriptions';
import React, { useEffect, useState } from 'react';
import './index.less';
import TimeInfo from './time-info';
import { EditOutlined } from '@ant-design/icons';

const DetailModal: React.FC<any> = (props) => {
    const { detailInfo = {}, onClose } = props;
    const [visible, setVisible] = useState(false);
    const [momVisible, setMomVisible] = useState(false);
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
            children: detailInfo?.name || detailInfo?.nickName || '--',
        },
        {
            label: '身高',
            children: detailInfo?.height || '--',
        },
        {
            label: '体重',
            children: detailInfo?.weight || '--',
        },
        {
            label: '生肖',
            children: detailInfo?.animalSignName || '--',
        },
        {
            label: '家乡',
            children:
                (detailInfo?.homeProvince || '-') +
                (detailInfo?.homeCity || '-') +
                (detailInfo?.homeArea || '-'),
        },
        {
            label: '职业',
            children: detailInfo?.vocationName || '--',
        },
        {
            label: '学历',
            children: detailInfo?.degreeName || '--',
        },
        {
            label: '毕业学校',
            children: detailInfo?.gradulateSchool || '--',
        },
        {
            label: '子女情况',
            children: detailInfo?.childrenStatusName || '--',
        },
        {
            label: '年收入',
            children: detailInfo?.yearSalary || '--',
        },
        {
            label: '住房',
            children: detailInfo?.houseStatusName || '--',
        },
        {
            label: '汽车',
            children: detailInfo?.carStatusName || '--',
        },
        {
            label: '星座',
            children: detailInfo?.starSignName || '--',
        },
        {
            label: '平台备注',
            children: (
                <Space>
                    {detailInfo?.degree || '--'}
                    <a onClick={() => setMomVisible(true)}>
                        <EditOutlined />
                    </a>
                </Space>
            ),
        },
    ];

    const tabsItems: TabsProps['items'] = [
        {
            key: '0',
            label: 'TA的动态',
            children: <TimeInfo />,
        },
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

    const labelItems: TabsProps['items'] = [
        {
            key: '0',
            label: '现在状态',
            children: (
                <>
                    <Tag color="magenta">magenta</Tag>
                    <Tag color="red">red</Tag>
                    <Tag color="green">green</Tag>
                    <Tag color="orange">orange</Tag>
                    <Tag color="gold">gold</Tag>
                </>
            ),
        },
        {
            key: '1',
            label: '理想生活',
            children: (
                <>
                    <Tag color="green">green</Tag>
                    <Tag color="cyan">cyan</Tag>
                    <Tag color="geekblue">geekblue</Tag>
                    <Tag color="purple">purple</Tag>
                </>
            ),
        },
        {
            key: '2',
            label: '我的梦想',
            children: (
                <>
                    <Tag color="blue">blue</Tag>
                </>
            ),
        },
    ];
    return (
        <Modal
            width={'60%'}
            title={`用户详情`}
            footer={null}
            centered
            onCancel={onCancel}
            open={visible}
            className="user-detail-modal"
            destroyOnClose
        >
            <div className="detail-modal-title">
                基本信息
                <span>{`注册时间： (${detailInfo.createTime || '--'})`}</span>
            </div>
            <Descriptions className="detail-item" items={items} />
            <div className="detail-modal-title">个性标签</div>
            <div className="detail-item">
                <Tabs
                    destroyInactiveTabPane
                    defaultActiveKey="0"
                    items={labelItems}
                />
            </div>
            <div className="detail-modal-title">关于他</div>
            <div className="detail-item">
                <Tabs
                    destroyInactiveTabPane
                    defaultActiveKey="0"
                    items={tabsItems}
                />
            </div>
            <div className="detail-modal-title">留言板</div>
            <div className="detail-item">
                <div>
                    <span className="detail-label">xxxxx留言: </span>
                    <span>你好啊</span>
                </div>
                <div>
                    <span className="detail-label">xxxxx留言: </span>
                    <span>来了啊</span>
                </div>
            </div>
            <Modal
                width={'30%'}
                title={`平台备注`}
                centered
                onCancel={() => setMomVisible(false)}
                open={momVisible}
                destroyOnClose
            >
                <Input.TextArea
                    autoSize={{ minRows: 4, maxRows: 8 }}
                    placeholder="请输入备注"
                />
            </Modal>
        </Modal>
    );
};

export default DetailModal;
