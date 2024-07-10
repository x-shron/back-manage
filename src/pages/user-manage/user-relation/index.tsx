import CardLayout from '@/components/CardLayout';
import React, { useEffect, useRef, useState } from 'react';
import './index.less';
import { Button, Form, Input, Space } from 'antd';
import * as echarts from 'echarts';
import { useDebounceFn } from 'ahooks';
import { randomColor } from '@/utils/commonVal';

const UserRelation = () => {
    const chartRef = useRef<echarts.EChartsType>();
    const [detail, setDetail] = useState({});

    const loadUser = () => {};

    useEffect(() => {
        // 注册eCharts实例
        chartRef.current = echarts.init(
            document.getElementById('chart') as HTMLElement,
        );
    }, []);

    const formatter = (params: any) => {
        return `<div>
        <div>姓名： -</div>
        <div>心动号： 123132312321</div>
        <div>申请时间： -</div>
        <div>手机号：121231</div>
      </div>`;
    };

    useEffect(() => {
        const option = {
            tooltip: {
                formatter: formatter,
            },
            lineStyle: {
                opacity: 0.9,
                width: 2,
                curveness: 0.2,
            },
            series: [
                {
                    type: 'graph',
                    layout: 'force',
                    edgeSymbol: ['circle', 'arrow'],
                    roam: true,
                    animation: true,
                    edgeSymbolSize: [0, 5],
                    data: [
                        {
                            name: '夏双',
                            value: 10,
                            symbolSize: 150,
                            itemStyle: {
                                color: 'red',
                                shadowBlur: 5.5,
                                shadowColor: 'rgba(220, 84, 84, 1)',
                            },
                        },
                        {
                            name: '张强',
                            value: 5,
                            symbolSize: 100,
                            itemStyle: {
                                color: randomColor(128),
                            },
                        },
                        {
                            name: 'ui',
                            value: 5,
                            symbolSize: 100,
                            itemStyle: {
                                color: randomColor(128),
                            },
                        },
                        {
                            name: '徐徐盛开',
                            value: 9,
                            symbolSize: 100,
                            itemStyle: {
                                color: randomColor(128),
                            },
                        },
                        {
                            name: '其他',
                            value: 7,
                            symbolSize: 100,
                            itemStyle: {
                                color: randomColor(128),
                            },
                        },
                    ],
                    links: [
                        {
                            source: '夏双',
                            target: '张强',
                        },
                        {
                            source: '夏双',
                            target: 'ui',
                        },
                        {
                            source: '夏双',
                            target: '徐徐盛开',
                        },
                        {
                            source: '徐徐盛开',
                            target: '其他',
                        },
                    ],
                    label: {
                        show: true,
                    },
                    force: {
                        repulsion: 5000,
                    },
                },
            ],
        };
        chartRef.current?.setOption(option);
    }, [detail]);

    const _resizeChart = () => {
        if (chartRef.current) {
            chartRef.current.resize();
        }
    };
    const { run: resizeChart } = useDebounceFn(_resizeChart, {
        wait: 100,
    });
    useEffect(() => {
        resizeChart();
        // 注册监听
        window.addEventListener('resize', resizeChart);
        return () => {
            window.removeEventListener('resize', resizeChart);
        };
    }, []);

    return (
        <CardLayout>
            <div className="user-relation-page">
                <Form onFinish={loadUser} layout="inline">
                    <Form.Item
                        name={'id'}
                        label="心动号"
                        rules={[{ required: true }]}
                    >
                        <Input placeholder="请输入心动号" />
                    </Form.Item>
                    <Form.Item>
                        <Space style={{ marginLeft: 80 }}>
                            <Button htmlType="reset">重置</Button>
                            <Button type="primary" htmlType="submit">
                                查询
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>

                <div id="chart" className="chart-box"></div>
            </div>
        </CardLayout>
    );
};

export default UserRelation;
