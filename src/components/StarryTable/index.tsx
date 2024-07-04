import React, {
    ReactNode,
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
} from 'react';
import './index.less';
import { Affix, Button, Form, Pagination, PaginationProps, Table } from 'antd';
import { QueryFormProps, QueryFrom } from './QueryFrom';
import { ColumnsType } from 'antd/es/table';
import { useUpdateEffect } from 'ahooks';
import { TableProps } from 'antd/lib';
import { ReloadOutlined } from '@ant-design/icons';
interface Props extends TableProps {
    columns: ColumnsType<any>;
    getDataSource: (params: any) => Promise<any>;
    queryFormFeild?: QueryFormProps;
    fetchDataAfterMount?: boolean; // 是否在挂载后加载数据后
    leftTool?: ReactNode;
    showReload?: boolean;
}

export interface RefStarryTable {
    // 重新从首页
    reload: () => void;
    // 刷新当前页
    refresh: () => void;
}

const StarryTable: React.FC<Props> = (props, ref) => {
    const {
        columns,
        getDataSource,
        queryFormFeild,
        fetchDataAfterMount = true,
        leftTool,
        showReload = true,
        ...restProps
    } = props;
    const [loading, setLoading] = useState(false);
    const [currentData, setCurrentData] = useState([]);
    const [totalNum, setTotalNum] = useState(0);

    const [queryParams, setPueryParams] = useState({
        pageNo: 1,
        pageSize: 10,
    });

    useImperativeHandle(ref, () => ({
        reload: () => {
            setPueryParams({
                ...queryParams,
                pageNo: 1,
                pageSize: 10,
            });
        },
        refresh: () => setPueryParams({ ...queryParams }),
    }));

    const onPageChange: PaginationProps['onChange'] = (current, pageSize) => {
        setPueryParams({
            ...queryParams,
            pageNo: current,
            pageSize: pageSize,
        });
    };

    const queryFormChange = (value: any) => {
        const { pageNo, pageSize } = queryParams;
        setPueryParams({
            ...value,
            pageNo,
            pageSize,
        });
    };

    const fetchData = (params?: any) => {
        setLoading(true);
        getDataSource({ ...queryParams, ...params })
            .then((res: any) => {
                setCurrentData(res?.records || []);
                setTotalNum(res?.total || 0);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useUpdateEffect(() => {
        fetchData();
    }, [queryParams]);

    useEffect(() => {
        if (fetchDataAfterMount) {
            fetchData();
        }
    }, []);

    return (
        <div className="starry-table">
            <QueryFrom
                onChange={queryFormChange}
                qeryForm={queryFormFeild}
            ></QueryFrom>
            <div className="tool-bar-container">
                <div> {leftTool}</div>
                {showReload && (
                    <div>
                        <ReloadOutlined
                            onClick={() => fetchData()}
                            className="reload"
                            spin={loading}
                        />
                    </div>
                )}
            </div>
            <Table
                dataSource={currentData}
                columns={columns}
                loading={loading}
                pagination={false}
                {...restProps}
            />
            {!!totalNum && (
                <Affix offsetBottom={0}>
                    <Pagination
                        showSizeChanger
                        onChange={onPageChange}
                        pageSize={queryParams.pageSize}
                        current={queryParams.pageNo}
                        total={totalNum}
                        className="pagination-custorm"
                    />
                </Affix>
            )}
        </div>
    );
};

export default forwardRef<RefStarryTable, Props>(StarryTable as any);
