import * as SVG from "./SVGs"
import { 
    ButtonProps
} from "@mui/material"
import { SocialSvgProps } from "./SVGs"

type SozialButtonProps = {
    Props? : { 
        ButtonProps?: ButtonProps
        SVGProps?: SocialSvgProps
    };
    Provider: ProviderType;
    variant: never;
    OnClick: void;
}

function SozialButton(){
return null
}

export {SozialButton}
export type {SozialButtonProps }