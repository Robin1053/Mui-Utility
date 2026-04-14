import { SVGProps } from "react";

type SocialSvgProps = {
    size?: number | string;
    title?: string;
    Props?: {
        SVGProps?: SVGProps<SVGSVGElement>;
    };
};

export { SocialSvgProps };