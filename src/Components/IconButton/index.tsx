import React from 'react';
import Styled from 'styled-components/native';

const Container = Styled.TouchableOpacity`
    padding : 16px;
`;

const Icon = Styled.Image`

`;

interface Props {
    iconName : 
        // | 'camera'
        // | 'live'
        // | 'send'
        // | 'dotMenu'
        // | 'favorite'
        // | 'comment'
         | 'drawericon'
        | 'menu'
        | 'search'
    style? : object;
    onPress ?: ()=> void
}

const IconButton = ({iconName,style,onPress}:Props)=>{

    const imageSource = {
        // camera : require('~/Assets/Image/ic_all.png'),
        // live : require('~/Assets/Image/ic_all.png'),
        // send : require('~/Assets/Image/ic_all.png'),
        // dotMenu : require('~/Assets/Image/ic_all.png'),
        // favorite : require('~/Assets/Image/ic_all.png'),
        // comment : require('~/Assets/Image/ic_all.png'),
        drawericon : require('~/Assets/Images/ic_all.png'),
        menu : require('~/Assets/Images/menu.png'),
        search : require('~/Assets/Images/search.png'),
    };

    return (
        <Container
            style={style}
            onPress={()=>{
                if(onPress && typeof onPress === 'function') {
                    onPress();
                }
            }}>
                <Icon source={imageSource[iconName]}/>
            </Container>
    );
};

export default IconButton;