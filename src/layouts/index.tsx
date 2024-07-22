import { useState, useMemo, useLayoutEffect } from 'react';
import { ConfigProvider } from 'antd';
import './index.less';
import { pathToRegexp } from 'path-to-regexp';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Error404 from './Error404';
import { withRouter } from 'umi';
import AuthOuter from './AuthOuter';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import Header from './header';
import MenuCustom from './Menu';
import BreadcrumbCustom from './Breadcrumb';
interface PathRegexpItem {
    path: string;
    title?: string;
    regexp: RegExp;
}

const Layout = (props: any) => {
    const { children } = props;
    const [pathRegexps, setPathRegexps] = useState<PathRegexpItem[]>([]);

    const generatePathRegexp = (): PathRegexpItem[] => {
        const {
            route: { routes = [] },
        } = props;
        const pathRegexp: PathRegexpItem[] = [];
        routes.forEach((pathItem: any) => {
            const { path, title } = pathItem;
            pathRegexp.push({
                path,
                title,
                regexp: pathToRegexp(path),
            });
        });
        return pathRegexp;
    };

    useLayoutEffect(() => {
        setPathRegexps(generatePathRegexp());
    }, [props.route]);

    const breadcrumbs = useMemo(() => {
        const { pathname } = props.location;
        const result: any[] = [];
        const list = pathname.split('/').filter((p: any) => p);
        list.forEach((_: any, index: number) => {
            const url = `/${list.slice(0, index + 1).join('/')}`;
            const pathItem = pathRegexps.find((item) => item.regexp.test(url));
            if (pathItem) {
                result.push({ ...pathItem, url });
            }
        });
        return result;
    }, [props.location.pathname, pathRegexps]);

    return (
        <ConfigProvider locale={zhCN}>
            <AuthOuter>
                <div className="layouts">
                    <Header />
                    <div className="layouts-content">
                        <MenuCustom />
                        <div className="main-content">
                            <BreadcrumbCustom breadcrumbs={breadcrumbs} />
                            <TransitionGroup>
                                <CSSTransition
                                    key={location.pathname}
                                    classNames="fade"
                                    timeout={300}
                                >
                                    <div className="center-content-wrap">
                                        {breadcrumbs.length ? (
                                            children
                                        ) : (
                                            <Error404 />
                                        )}
                                    </div>
                                </CSSTransition>
                            </TransitionGroup>
                        </div>
                    </div>
                </div>
            </AuthOuter>
        </ConfigProvider>
    );
};

export default withRouter(Layout);
