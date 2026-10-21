import * as SVG from "./SVGs/SVGs";
import type { ProviderType, BuiltInProvider, ProviderPresentation, ProviderButtonStyle } from "@robineb/mui-utility";



const BUILT_IN_Provider_PRESENTATION: Record<BuiltInProvider, ProviderPresentation> = {
    google: { label: "Google", svg: <SVG.GoogleSVG /> },
    microsoft: { label: "Microsoft", svg: <SVG.MicrosoftSVG /> },
    apple: { label: "Apple", svg: <SVG.AppleSVG /> },
    github: { label: "GitHub", svg: <SVG.GitHubSVG /> },
    facebook: { label: "Facebook", svg: <SVG.FacebookSVG /> },
    linkedin: { label: "LinkedIn", svg: <SVG.LinkedInSVG /> },
    x: { label: "X", svg: <SVG.XSVG /> },
    gitlab: { label: "GitLab", svg: <SVG.GitLabSVG /> },
    discord: { label: "Discord", svg: <SVG.DiscordSVG /> },
    slack: { label: "Slack", svg: <SVG.SlackSVG /> },
    passkey: { label: "Passkey", svg: <SVG.PasskeySVG /> },
};

function resolveProviderPresentation(Provider: ProviderType): ProviderPresentation {
    if (typeof Provider === "object") {
        return {
            label: Provider.name,
            svg: Provider.svg,
        };
    }

    return BUILT_IN_Provider_PRESENTATION[Provider];
}


type ProviderColors = ProviderButtonStyle["button"];

// grosser und runder Button teilen sich die Farben
function bothVariants(colors: ProviderColors): ProviderButtonStyle {
    return { button: colors, circle: colors };
}

/**
 * Farben nach den offiziellen Vorgaben der Anbieter, soweit vorhanden:
 * - Google: https://developers.google.com/identity/branding-guidelines (Hover = State-Layer 8%)
 * - Microsoft: offizielle "Sign in with Microsoft"-SVGs (learn.microsoft.com, howto-add-branding-in-apps)
 * - Slack: https://docs.slack.dev/authentication/sign-in-with-slack/
 * - Facebook: Brand-Blau #1877F2, Discord: Blurple #5865F2, LinkedIn: #0A66C2
 * - GitHub hat keine Sign-in-Vorgaben; Werte aus dem GitHub-Designsystem Primer (Default-Button)
 * - GitLab: Markenfarben #FC6D26/#171321, Text dunkel statt orange wegen Kontrast (WCAG AA)
 */
function getProviderButtonStyles(Provider: ProviderType, isDark: boolean = false): ProviderButtonStyle {
    // eigene Provider bringen ihre Farben mit (vorher fielen sie auf die Google-Farben zurueck)
    if (typeof Provider === "object") {
        return bothVariants(Provider.color);
    }

    const styles: Record<BuiltInProvider, ProviderButtonStyle> = {
        google: isDark
            ? bothVariants({
                backgroundColor: '#131314',
                color: '#E3E3E3',
                border: '1px solid #8E918F',
                hoverBgColor: '#262627',
                hoverBorder: '#8E918F',
            })
            : bothVariants({
                backgroundColor: '#FFFFFF',
                color: '#1F1F1F',
                border: '1px solid #747775',
                hoverBgColor: '#EEEEEE',
                hoverBorder: '#747775',
            }),

        microsoft: isDark
            ? bothVariants({
                backgroundColor: '#2F2F2F',
                color: '#FFFFFF',
                // Vorgabe ist randlos; gleichfarbiger Rand haelt die Groesse identisch zur hellen Variante
                border: '1px solid #2F2F2F',
                hoverBgColor: '#3B3B3B',
                hoverBorder: '#3B3B3B',
            })
            : bothVariants({
                backgroundColor: '#FFFFFF',
                color: '#5E5E5E',
                border: '1px solid #8C8C8C',
                hoverBgColor: '#F3F3F3',
                hoverBorder: '#8C8C8C',
            }),

        apple: isDark
            ? bothVariants({
                backgroundColor: '#FFFFFF',
                color: '#000000',
                border: '1px solid #FFFFFF',
                hoverBgColor: '#F0F0F0',
                hoverBorder: '#F0F0F0',
                logoColor: '#000000',
                loadingcolor: '#000000',
            })
            : bothVariants({
                backgroundColor: '#000000',
                color: '#FFFFFF',
                border: '1px solid #000000',
                hoverBgColor: '#1C1C1C',
                hoverBorder: '#1C1C1C',
                logoColor: '#FFFFFF',
                loadingcolor: '#FFFFFF',
            }),

        github: isDark
            ? bothVariants({
                backgroundColor: '#212830',
                color: '#F0F6FC',
                border: '1px solid #3D444D',
                hoverBgColor: '#262C36',
                hoverBorder: '#3D444D',
                logoColor: '#FFFFFF',
            })
            : bothVariants({
                backgroundColor: '#F6F8FA',
                color: '#25292E',
                border: '1px solid #D1D9E0',
                hoverBgColor: '#EFF2F5',
                hoverBorder: '#D1D9E0',
                logoColor: '#1F2328',
            }),

        facebook: bothVariants({
            backgroundColor: '#1877F2',
            color: '#FFFFFF',
            border: '1px solid #1877F2',
            hoverBgColor: '#166FE5',
            hoverBorder: '#166FE5',
            logoColor: '#FFFFFF',
            loadingcolor: '#FFFFFF',
        }),

        linkedin: bothVariants({
            backgroundColor: '#0A66C2',
            color: '#FFFFFF',
            border: '1px solid #0A66C2',
            hoverBgColor: '#004182',
            hoverBorder: '#004182',
            logoColor: '#FFFFFF',
            loadingcolor: '#FFFFFF',
        }),

        x: isDark
            ? bothVariants({
                backgroundColor: '#000000',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.22)',
                hoverBgColor: '#272727',
                hoverBorder: 'rgba(255, 255, 255, 0.3)',
                logoColor: '#FFFFFF',
            })
            : bothVariants({
                backgroundColor: '#FFFFFF',
                color: '#000000',
                border: '1px solid rgba(0, 0, 0, 0.18)',
                hoverBgColor: '#F2F2F2',
                hoverBorder: 'rgba(0, 0, 0, 0.26)',
                logoColor: '#000000',
            }),

        gitlab: isDark
            ? bothVariants({
                backgroundColor: '#171321',
                color: '#FFFFFF',
                border: '1px solid #FC6D26',
                hoverBgColor: '#231C33',
                hoverBorder: '#FC6D26',
                loadingcolor: '#FC6D26',
            })
            : bothVariants({
                backgroundColor: '#FFFFFF',
                color: '#171321',
                border: '1px solid #FC6D26',
                hoverBgColor: '#FFF4EE',
                hoverBorder: '#FC6D26',
                loadingcolor: '#FC6D26',
            }),

        discord: bothVariants({
            backgroundColor: '#5865F2',
            color: '#FFFFFF',
            border: '1px solid #5865F2',
            hoverBgColor: '#4752C4',
            hoverBorder: '#4752C4',
            logoColor: '#FFFFFF',
            loadingcolor: '#FFFFFF',
        }),

        slack: isDark
            ? bothVariants({
                backgroundColor: '#4A154B',
                color: '#FFFFFF',
                // Vorgabe ist randlos; gleichfarbiger Rand haelt die Groesse identisch zur hellen Variante
                border: '1px solid #4A154B',
                hoverBgColor: '#5C2A5D',
                hoverBorder: '#5C2A5D',
                loadingcolor: '#FFFFFF',
            })
            : bothVariants({
                backgroundColor: '#FFFFFF',
                color: '#000000',
                border: '1px solid #DDDDDD',
                hoverBgColor: '#F8F8F8',
                hoverBorder: '#DDDDDD',
            }),

        passkey: isDark
            ? bothVariants({
                backgroundColor: '#1F222B',
                color: '#F8F5F1',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                hoverBgColor: '#2A2F3A',
                hoverBorder: 'rgba(255, 255, 255, 0.24)',
                loadingcolor: '#F8F5F1',
                logoColor: '#F8F5F1',
            })
            : bothVariants({
                backgroundColor: '#F4ECE4',
                color: '#2D1C12',
                border: '1px solid rgba(157, 112, 82, 0.32)',
                hoverBgColor: '#EDE1D5',
                hoverBorder: 'rgba(157, 112, 82, 0.48)',
                loadingcolor: '#2D1C12',
                logoColor: '#2D1C12',
            }),
    };

    return styles[Provider] ?? styles.google;
}
export {
    resolveProviderPresentation,
    getProviderButtonStyles,
}
