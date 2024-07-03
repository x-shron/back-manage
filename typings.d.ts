declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
    export function ReactComponent(
        props: React.SVGProps<SVGSVGElement>,
    ): React.ReactElement;
    const url: string;
    export default url;
}

interface Window {
    APP_CONFIG: Record<string, any>;
    APP_LANG: string;
    APP_ID: string | number;
    APP_USER_INFO: Record<string, any>;
}
