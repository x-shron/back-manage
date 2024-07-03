import { ReactNode, useEffect, useState } from 'react';
import './index.less';

interface StarryInfoBlockProps {
    title?: string;
    operation?: ReactNode;
    border?: string[] | 'top' | 'bottom' | 'left' | 'right' | 'all';
    children?: ReactNode;
}

const StarryInfoBlock = (props: StarryInfoBlockProps) => {
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
            className="starry-info-block"
            style={{
                ...borderStyle,
            }}
        >
            <div className="starry-info-block-header">
                <div className="starry-info-block-header-title">
                    {props.title}
                </div>
                <div className="starry-info-block-header-operation">
                    {props.operation}
                </div>
            </div>
            {props.children}
        </div>
    );
};

export default StarryInfoBlock;
