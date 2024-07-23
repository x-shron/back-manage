import {
    Descriptions,
    Divider,
    Input,
    message,
    Modal,
    Radio,
    Space,
    Spin,
    Tabs,
    TabsProps,
    Tag,
} from 'antd';
import { DescriptionsItemType } from 'antd/es/descriptions';
import React, { useEffect, useState } from 'react';
import './index.less';
import TimeInfo from './time-info';
import { EditOutlined } from '@ant-design/icons';
import { getUserDetail, modifyUserDetail } from '@/service/matchmaker';
import { randomColor } from '@/utils/commonVal';

const DetailModal: React.FC<any> = (props) => {
    const { detailInfo: info, onClose } = props;
    const [detailInfo, setDetailInfo] = useState<any>({});
    const [visible, setVisible] = useState(false);
    const [momVisible, setMomVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (info?.id) {
            setDetailInfo(info);
            setVisible(true);
            setLoading(true);
            getUserDetail({
                userId: info.id,
            })
                .then((res) => {
                    setDetailInfo({
                        ...info,
                        ...res.userBaseInfo,
                        ...res.userExtraInfo,
                        trendList: res.trendList || [],
                    });
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
        }
    }, [info]);

    const onCancel = () => {
        setVisible(false);
        onClose?.();
    };

    const baseInfoItems: DescriptionsItemType[] = [
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
            label: '所在地',
            children: detailInfo?.houseStatusNa || '--',
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
            children: detailInfo?.yearSalaryName || '--',
        },
        {
            label: '住房',
            children: detailInfo?.houseStatusNam || '--',
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
            label: '交友类别',
            children: detailInfo?.friendTypeName || '--',
        },
        {
            label: '平台备注' || '--',
            children: (
                <Space>
                    {detailInfo?.remark || '--'}
                    <a onClick={() => setMomVisible(true)}>
                        <EditOutlined />
                    </a>
                </Space>
            ),
        },
    ];

    const aboutHeItems: TabsProps['items'] = [
        {
            key: '0',
            label: 'TA的动态',
            children: <TimeInfo trendList={detailInfo.trendList || []} />,
        },
        {
            key: '1',
            label: '自我评价',
            children: (
                <pre className="pre-style">{detailInfo.introduce || '--'}</pre>
            ),
        },
        {
            key: '2',
            label: '家庭背景',
            children: (
                <pre className="pre-style">
                    {detailInfo.homeBackground || '--'}
                </pre>
            ),
        },
        {
            key: '3',
            label: '爱情观念',
            children: (
                <pre className="pre-style">
                    {detailInfo.loveConcept || '--'}
                </pre>
            ),
        },
        {
            key: '4',
            label: '理想的另一半',
            children: (
                <pre className="pre-style">{detailInfo.idealLover || '--'}</pre>
            ),
        },
    ];

    const labelItems: TabsProps['items'] = [
        {
            key: '0',
            label: '现在状态',
            children: (
                <>
                    {detailInfo?.tagList?.map((item: any) => {
                        return <Tag color={randomColor(128)}>{item}</Tag>;
                    })}
                </>
            ),
        },
        {
            key: '1',
            label: '理想生活',
            children: (
                <>
                    {detailInfo?.idealLifeListName?.map((item: any) => {
                        return <Tag color={randomColor(128)}>{item}</Tag>;
                    })}
                </>
            ),
        },
        {
            key: '2',
            label: '我的梦想',
            children: (
                <>
                    {detailInfo?.dreamListName?.map((item: any) => {
                        return <Tag color={randomColor()}>{item}</Tag>;
                    })}
                </>
            ),
        },
    ];

    const modifyRemark = () => {
        modifyUserDetail(detailInfo)
            .then((res) => {
                message.success('修改成功');
            })
            .finally(() => {
                setMomVisible(false);
            });
    };
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
            <Spin spinning={loading}>
                <div className="detail-modal-title">
                    基本信息
                    <span>{`注册时间： (${
                        detailInfo.createTime || '--'
                    })`}</span>
                </div>
                <Descriptions className="detail-item" items={baseInfoItems} />
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
                        items={aboutHeItems}
                    />
                </div>
                <div className="detail-modal-title">留言板</div>
                <div className="detail-item">{detailInfo.message || '--'}</div>
                <Modal
                    width={'30%'}
                    title={`平台备注`}
                    centered
                    onCancel={() => setMomVisible(false)}
                    open={momVisible}
                    destroyOnClose
                    onOk={modifyRemark}
                >
                    <Input.TextArea
                        autoSize={{ minRows: 4, maxRows: 8 }}
                        placeholder="请输入备注"
                        value={detailInfo.remark}
                        onChange={(e) => {
                            setDetailInfo({
                                ...detailInfo,
                                remark: e.target.value,
                            });
                        }}
                    />
                </Modal>
            </Spin>
        </Modal>
    );
};

export default DetailModal;
