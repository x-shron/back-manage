import cn from 'classnames';
import './index.less';

const Menu = (props: any) => {
    const { items, activeKey, onChange } = props;
    return (
        <div className="switch-link">
            <div className="ink" />
            {items.map((item: any) => (
                <div
                    key={`${item.title}_${item.key}`}
                    className="switch-link-item"
                    onClick={() => onChange(item.key)}
                >
                    <span
                        className="active-ball"
                        style={{ opacity: activeKey === item.key ? 1 : 0 }}
                    />
                    <span
                        className={cn('text', 'text-overflow-ellipsis', {
                            'text-active': activeKey === item.key,
                        })}
                        title={item.title}
                    >
                        {item.title}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default Menu;
