/*
 * @Author: your name
 * @Date: 2021-11-10 13:28:10
 * @LastEditTime: 2021-11-11 14:03:23
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \backstage-web\src\components\ColorSelector\index.tsx
 */
import { useRef, useState, useEffect } from 'react';
import { Input } from 'antd';
import { SketchPicker } from 'react-color';
import './index.less';

interface ColorSelectorProps {
    value?: string;
    onChange?: (v: string) => void;
    disabled?: boolean;
}

const ColorSelector = (props: ColorSelectorProps) => {
    const { value, onChange, disabled } = props;

    const pickerRef = useRef<any>();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [color, setColor] = useState<string>(value || '#D0021B');

    // 点击空白关闭拾色器
    useEffect(() => {
        const handler = (e: Event) => {
            if (!pickerRef.current?.contains(e.target)) {
                if (isOpen) setIsOpen(false);
            }
        };
        window.addEventListener('click', handler);
        return () => window.removeEventListener('click', handler);
    }, [isOpen]);

    useEffect(() => {
        setColor(value || '#D0021B');
    }, [value]);

    const ColorDiv = (
        <div
            className="color-div"
            style={{ background: color }}
            onClick={() => {
                !disabled && setIsOpen((state) => !state);
            }}
        />
    );

    const changeColor = (colorObj: any) => {
        setColor(colorObj.hex);
        onChange?.(colorObj.hex);
    };

    return (
        <div className="color-selector">
            <Input
                suffix={ColorDiv}
                readOnly
                value={color}
                disabled={disabled}
            />
            <div
                className="color-picker"
                ref={pickerRef}
                style={{ display: isOpen ? 'block' : 'none' }}
            >
                <SketchPicker
                    width={'calc(100% - 20px)'}
                    color={color}
                    onChangeComplete={changeColor}
                    presetColors={['#252324']}
                />
            </div>
        </div>
    );
};

export default ColorSelector;
