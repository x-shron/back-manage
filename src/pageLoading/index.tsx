import { Spin } from 'antd';
import React from 'react';
import './index.less';

const PageLoading = () => {
    return (
        <Spin spinning size="large">
            <div className="page-loading" />
        </Spin>
    );
};

export default PageLoading;
