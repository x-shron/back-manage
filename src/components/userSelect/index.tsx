import { getUserList } from '@/service/matchmaker';
import { validatorHeartNo } from '@/utils/commonVal';
import { useDebounceFn } from 'ahooks';
import { Empty, Form, message, Select, Spin } from 'antd';
import React, { useEffect, useState } from 'react';

const UserSelect = ({ onChange, value, role, ...restProps }: any) => {
    const [userList, setUserList] = useState([]);
    const [fetching, setFetching] = useState(false);

    const handle = (id?: any) => {
        setFetching(true);
        setUserList([]);
        getUserList({ id, pageSize: 50, pageNo: 1, role })
            .then((res) => {
                const list = (res.records || []).map((item: any) => {
                    return {
                        value: item.id,
                        label: `${item.name || item.nickName || '-'}(${
                            item.id
                        })`,
                    };
                });
                setUserList(list);
            })
            .finally(() => {
                setFetching(false);
            });
    };

    const { run } = useDebounceFn(
        (value: string) => {
            if (fetching) return;
            validatorHeartNo(undefined, value).then(
                () => {
                    handle(value);
                },
                (err) => {
                    message.error(err);
                },
            );
        },
        { wait: 500 },
    );

    useEffect(() => {
        handle();
    }, []);

    return (
        <Select
            placeholder="请选择用户"
            options={userList}
            onSearch={run}
            showSearch
            style={{ width: 350 }}
            notFoundContent={
                fetching ? (
                    <Spin size="small">
                        <div style={{ height: 100 }}></div>
                    </Spin>
                ) : (
                    <Empty />
                )
            }
            value={value}
            filterOption={false}
            onChange={onChange}
            {...restProps}
        />
    );
};

export default UserSelect;
