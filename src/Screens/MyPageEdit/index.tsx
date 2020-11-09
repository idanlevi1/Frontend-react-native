import React, {useContext, useLayoutEffect, useEffect} from 'react';
import Styled from 'styled-components/native';
import {StackNavigationProp} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import {UserContext} from '~/Context/User';

type NavigationProp = StackNavigationProp<MyPageEditNaviParamList, 'MyPageEdit'>;

interface Props {
  navigation: NavigationProp;
}

const Container = Styled.SafeAreaView`
  flex: 1;
  background-color: #cceaff;
  align-items: center;
  justify-content: center;
`;

const HomeView = Styled.View`
    align-items : center;
`;

const HomeText = Styled.Text`
    align-items : center;
    color : black;
`;
const StyleButton = Styled.TouchableOpacity`
  padding: 8px;
`;
const Icon = Styled.Image`
`;

const MypageEdit =  ({navigation } : Props) => {
  

    useEffect(() => {
        SplashScreen.hide();
      }, []);


    return (
      <Container>
          <HomeView>
            <HomeText>
              mypageedit
            </HomeText>
        </HomeView>
      </Container> 
       
    );
};

export default MypageEdit;