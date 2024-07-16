import CardLayout from '@/components/CardLayout';
import React, { useEffect, useRef, useState } from 'react';
import './index.less';
import { Button, Form, Input, Space } from 'antd';
import * as echarts from 'echarts';
import { useDebounceFn, useFullscreen } from 'ahooks';
import { randomColor, validatorHeartNo } from '@/utils/commonVal';
import { ExpandOutlined, SelectOutlined } from '@ant-design/icons';
import { userRelationMap } from '@/service/matchmaker';
const avater = require('@/assets/avter.jpg');
import { cloneDeep } from 'lodash';
import UserSelect from '@/components/userSelect';

const defaultOptions = {
    series: [
        {
            type: 'graph',
            name: 'users',
            layout: 'force',
            edgeSymbol: ['circle', 'arrow'],
            roam: true,
            animation: true,
            edgeSymbolSize: [0, 10],
            nodes: [],
            edges: [],
            label: {
                show: true,
            },
            emphasis: {
                lineStyle: {
                    width: 10,
                },
            },
            force: {
                repulsion: 5000,
                edgeLength: 300,
            },
            lineStyle: {
                color: 'red',
                width: 4,
                curveness: 0.2,
            },
        },
    ],
};

const UserRelation = () => {
    const chartRef = useRef<echarts.EChartsType>();
    // 已经加载过的中间节点
    const hasLoadId = useRef<any>({});
    // 当前所有扁平数据array
    const flatDataMap = useRef<any>({});
    // 上次渲染的options
    const preOptions = useRef<any>(defaultOptions);

    const [fullScreen, { toggleFullscreen }] = useFullscreen(
        () => document.getElementById('full-dom') as HTMLElement,
    );

    const defaultNodeInfo = () => ({
        symbolSize: 100,
        label: {
            show: true,
        },
        itemStyle: {
            color: randomColor(50),
        },
    });

    const queryData = (values: any) => {
        // 重置相关数据
        preOptions.current = { ...cloneDeep(defaultOptions) };
        flatDataMap.current = {};
        hasLoadId.current = {};
        chartRef.current?.clear();
        drawGraph(values.userId);
    };

    useEffect(() => {
        // 注册eCharts实例
        chartRef.current = echarts.init(
            document.getElementById('chart') as HTMLElement,
        );
    }, []);

    const transName = (detail: any) => {
        return `${detail.name || detail.nickName}-${detail.id}`;
    };

    const drawGraph = (userId: string) => {
        if (hasLoadId.current[userId]) {
            return;
        }
        userRelationMap({ userId }).then((res) => {
            const { current, parent, children } = res;
            const options = cloneDeep(preOptions.current);
            const { nodes, edges } = options.series[0];
            options.tooltip = {
                formatter,
            };
            // 处理子节点信息
            (children || []).forEach((item: any) => {
                if (
                    nodes.findIndex(
                        (node: any) => node.name === transName(item),
                    ) !== -1
                ) {
                    return;
                }
                const node = {
                    ...defaultNodeInfo(),
                    name: transName(item),
                    // symbol: `image://${item.headImg || avater}`,
                };
                nodes.push(node);
                edges.push({
                    source: transName(item),
                    target: transName(current),
                });
                flatDataMap.current[item.id] = item;
            });
            // 处理当前节点信息
            if (
                nodes.findIndex(
                    (item: any) => item.name === transName(current),
                ) === -1
            ) {
                nodes.push({
                    ...defaultNodeInfo(),
                    itemStyle: {
                        color: 'rgba(255, 44, 44, 1)',
                        shadowBlur: 20,
                        shadowColor: 'red',
                        borderType: 'dashed',
                        borderWidth: 2,
                        borderColor: '#fff',
                    },
                    symbolSize: 150,
                    name: transName(current),
                    // symbol: `image://${current.headImg || avater}`,
                });
            }
            flatDataMap.current[current.id] = {
                ...current,
                childrenNum: children?.length || 0,
            };

            // 处理父节点
            if (
                parent &&
                nodes.findIndex(
                    (item: any) => item.name === transName(parent),
                ) === -1
            ) {
                nodes.push({
                    ...defaultNodeInfo(),
                    name: transName(parent),
                    // symbol: `image://${parent.headImg || avater}`,
                });
                edges.push({
                    source: transName(current),
                    target: transName(parent),
                });
                flatDataMap.current[parent.id] = parent;
            }
            chartRef.current?.setOption(options);
            preOptions.current = options;
            hasLoadId.current[userId] = true;
            chartRef.current?.on('click', { dataType: 'node' }, loadNode);
        });
    };

    const { run: loadNode } = useDebounceFn(
        (e: any) => {
            const id = e.data.name.split('-')[1];
            if (!hasLoadId.current[id]) {
                drawGraph(id);
            }
        },
        {
            wait: 500,
        },
    );

    const formatter = (params: any) => {
        const nodeId = params.data.name?.split('-')[1];
        if (!nodeId) {
            return null;
        }
        const {
            name,
            nickName,
            id,
            mobilePhone,
            createTime,
            province,
            city,
            area,
            childrenNum,
        } = flatDataMap.current[nodeId] || {};

        return `<div>
        <div>姓名： ${nickName || name}</div>
        <div>心动号： ${id}</div>
        <div>直接邀约人数： ${childrenNum ?? '-'}</div>
        <div>地址： ${province || '-'}${city || '-'}${area || '-'}</div>
        <div>手机号： ${mobilePhone}</div>
        <div>注册时间： ${createTime}</div>
      </div>`;
    };
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
                <Form onFinish={queryData} layout="inline">
                    <Form.Item
                        name={'userId'}
                        label="心动号"
                        rules={[
                            { required: true },
                            { validator: validatorHeartNo },
                        ]}
                    >
                        <UserSelect />
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
                <div id="full-dom" className="full">
                    <Button
                        className="full-button"
                        onClick={toggleFullscreen}
                        icon={
                            fullScreen ? <SelectOutlined /> : <ExpandOutlined />
                        }
                    ></Button>
                    <div id="chart" className="chart-box"></div>
                </div>
            </div>
        </CardLayout>
    );
};

export default UserRelation;
