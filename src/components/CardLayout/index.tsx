import { ReactNode } from 'react';
import classnames from 'classnames';
import './index.less';

interface cardLayoutProps {
    title?: string | ReactNode;
    operation?: ReactNode;
    children?: ReactNode;
    className?: string;
}

const CardLayout = (props: cardLayoutProps) => {
    const { title, operation, children, className, ...rest } = props;

    return (
        <div className={classnames(['card-layout', className])} {...rest}>
            {(title || operation) && (
                <div className="card-layout-header">
                    <div className="card-layout-header-title">{title}</div>
                    <div className="details-card-header-operation">
                        {operation}
                    </div>
                </div>
            )}
            <div className="card-layout-content">{children}</div>
        </div>
    );
};

export default CardLayout;
