import { getUserList } from '@/service/matchmaker';
import { validatorHeartNo } from '@/utils/commonVal';
import { useDebounceFn } from 'ahooks';
import { Form, message, Select, Spin } from 'antd';
import React, { useState } from 'react';

const UserSelect = ({ onChange, value }: any) => {
    const [userList, setUserList] = useState([]);
    const [fetching, setFetching] = useState(false);

    const { run } = useDebounceFn(
        (value: string) => {
            if (fetching) return;
            validatorHeartNo(undefined, value).then(
                () => {
                    setFetching(true);
                    setUserList([]);
                    getUserList({ id: value })
                        .then((res) => {
                            const list = (res.records || []).map(
                                (item: any) => {
                                    return {
                                        value: item.id,
                                        label: `${
                                            item.name || item.nickName || '-'
                                        }(${item.id})`,
                                    };
                                },
                            );
                            setUserList(list);
                        })
                        .finally(() => {
                            setFetching(false);
                        });
                },
                (err) => {
                    message.error(err);
                },
            );
        },
        { wait: 500 },
    );

    return (
        <Select
            placeholder="请输入心动号并选择用户"
            options={userList}
            onSearch={run}
            showSearch
            style={{ width: 350 }}
            notFoundContent={
                fetching ? (
                    <Spin size="small">
                        <div style={{ height: 100 }}></div>
                    </Spin>
                ) : null
            }
            value={value}
            onChange={onChange}
        />
    );
};

export default UserSelect;
