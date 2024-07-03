import React from 'react';
import StarryCard from '@/components/CardLayout';
import { Button, Result } from 'antd';
import { useHistory } from 'umi';

const Error404 = () => {
    const history = useHistory();
    return (
        <StarryCard>
            <Result
                status="404"
                title="404"
                subTitle="对不起，您访问的页面不存在。"
                extra={
                    <Button onClick={() => history.push('/')} type="primary">
                        回到首页
                    </Button>
                }
            />
        </StarryCard>
    );
};

export default Error404;
