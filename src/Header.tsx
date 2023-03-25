import {Helmet} from "react-helmet";
import React, {useEffect} from "react";

interface HeaderProps
{
    preventRefreshOrClose:boolean
}

export function checkLocalStorageEnabled()
{
    // return false;
    if (typeof localStorage !== 'undefined') {
        try {
            localStorage.setItem('feature_test', 'yes');
            if (localStorage.getItem('feature_test') === 'yes') {
                localStorage.removeItem('feature_test');
                return true;
            } else {
                // localStorage is disabled
                return false;
            }
        } catch(e) {
            // localStorage is disabled
            return false;
        }
    } else {
        // localStorage is not available
        return false;
    }
}

export const Header: React.FC<HeaderProps> = ({preventRefreshOrClose}) => {
    let kofiSettings = "  " +
        " kofiWidgetOverlay.draw('chrispepper1989', {\n" +
        "    'type': 'floating-chat',\n" +
        "    'floating-chat.donateButton.text': 'Support me',\n" +
        "    'floating-chat.donateButton.background-color': '#ffffff',\n" +
        "    'floating-chat.donateButton.text-color': '#323842'\n" +
        "  });\n";

    
    
    
    
    useEffect(() => {

        if(!preventRefreshOrClose) return; //dont set up alert dialogue
        
        //set up alert dialogue
        function alertUser(ev: any) {
            ev.preventDefault();
            return ev.returnValue = 'Are you sure you want to close?';
        }
        window.addEventListener('beforeunload', alertUser)

        return () => {
            window.removeEventListener('beforeunload', alertUser)
        }
    })
    

    return <head>
        <title>Phone Of Dreams</title>
        Click Sound Effect by <a
        href="https://pixabay.com/users/irinairinafomicheva-25140203/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=13693">irinairinafomicheva</a> from <a
        href="https://pixabay.com/sound-effects//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=13693">Pixabay</a>
        Notification Sound Effect by <a
        href="https://pixabay.com/users/sergequadrado-24990007/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=21464">SergeQuadrado</a> from <a
        href="https://pixabay.com/sound-effects//?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=21464">Pixabay</a>

        <Helmet>
            <script src='https://storage.ko-fi.com/cdn/scripts/overlay-widget.js'/>
            <script>{kofiSettings}</script>

        </Helmet>

    </head>
}