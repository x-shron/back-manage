import { Affix, Breadcrumb } from 'antd';
import { pathToRegexp } from 'path-to-regexp';
import React, { useLayoutEffect, useMemo, useState } from 'react';

const BreadcrumbCustom = ({ breadcrumbs }: any) => {
    return (
        <Affix offsetTop={61}>
            <div className="breadcrumb-wrapper">
                <Breadcrumb>
                    {breadcrumbs.map((item: any, index: number) => {
                        return (
                            <Breadcrumb.Item key={item.title}>
                                {index < breadcrumbs.length - 1 ? (
                                    <a href={item.url}>{item.title}</a>
                                ) : (
                                    item.title
                                )}
                            </Breadcrumb.Item>
                        );
                    })}
                </Breadcrumb>
            </div>
        </Affix>
    );
};

export default BreadcrumbCustom;
