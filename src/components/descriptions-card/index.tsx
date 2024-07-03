import { ReactNode, useEffect, useState } from 'react';
import './index.less';

interface detailsCardProps {
    title?: string;
    operation?: ReactNode;
    border?: string[] | 'top' | 'bottom' | 'left' | 'right' | 'all';
    children?: ReactNode;
}

const DetailsCard = (props: detailsCardProps) => {
    const { border } = props;
    const [borderStyle, setBorderStyle] = useState<any>({});

    useEffect(() => {
        if (typeof border === 'string') {
            if (border === 'all') {
                setBorderStyle({
                    border: '1px solid #eee',
                });
            } else {
                setBorderStyle({
                    [styleName(border)]: '1px solid #eee',
                });
            }
        } else {
            const result: any = {};
            (border || []).forEach((item: any) => {
                result[styleName(item)] = '1px solid #eee';
            });
            setBorderStyle(result);
        }
    }, [border]);

    function styleName(value: 'top' | 'bottom' | 'left' | 'right') {
        let name = '';
        switch (value) {
            case 'bottom':
                name = 'borderBottom';
                break;
            case 'top':
                name = 'borderTop';
                break;
            case 'right':
                name = 'borderRight';
                break;
            case 'left':
                name = 'borderLeft';
                break;
            default:
                break;
        }
        return name;
    }

    return (
        <div
            className="details-card"
            style={{
                ...borderStyle,
            }}
        >
            <div className="details-card-header">
                <div className="details-card-header-title">{props.title}</div>
                <div className="details-card-header-operation">
                    {props.operation}
                </div>
            </div>
            {props.children}
        </div>
    );
};

export default DetailsCard;
