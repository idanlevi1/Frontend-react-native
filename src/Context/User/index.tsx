import React , { createContext, useState, useEffect } from 'react';
import Alert from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
import api from '~/Api/api'


const defaultContext : IUserContext = {
    isLoading : false,
    userInfo : undefined,
    circleInfo: [],
    tokenInfo : null,
    addCircle : (name : string, explanation : string, email : string) => {},
    login : (username: string, password: string) => {},
    logout: () =>{},
    userset : () => {},
    withdraw : (username : string, password : string) => {},
};


const UserContext = createContext(defaultContext);


interface Props {
    children: JSX.Element | Array<JSX.Element>;
}

const UserContextProvider = ({children}:Props) => {
    const [userInfo, setUSerInfo]= useState<IUserInfo | 
        undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [circleInfo, setCircleInfo] = useState<Array<ICircleInfo>>([]);
    const [tokenInfo,setTokenInfo] = useState<string | null>(null);

    const showError = (message: string) : void => {
        setTimeout(()=> {
            console.warn(message);
    
        },200);
        };

    

        useEffect(() => {
        SplashScreen.hide();
        userset().then(() => 
        {
            setIsLoading(true)
        });
        
        console.log('check usercontext useEffect')
        }, []);
    

        

    const login = (username: string, password : string) : void => {
    //     fetch ('http://junslim11.pythonanywhere.com/signup')
    //     .then((response) => 
    //     {
    //         console.warn(response.json)
    //         return response.json()

    //     }).then((response) => {
    //         console.warn(response)
    //     setUSerInfo({
    //         username : username,
    //         password : password
            
    //     });

    // })
    // .catch(error => {
    //     setIsLoading(true);
    //     showError('fail');
    // })
        api.logIn({
            username : username,
            password : password,
        }).then((response)=>{
            return response.data
        }).then((data)=>{
            AsyncStorage.setItem('token',data.token)
            setTokenInfo(data.token)
            setUSerInfo(data.user);
            setCircleInfo(data.circles);
        }).then(() => {
            setIsLoading(true);
         }).catch(error =>{
                setIsLoading(true);
                showError('잘못된 정보 입력입니다!');
            // });  
        })
    
    };


    const userset = async () => {
           await AsyncStorage.getItem('token').then((data) => {
                if(data !==null)
                setTokenInfo(data);
                
            });
        await api.user().then((response)=>{
            if(response.data){
                setUSerInfo(response.data.user);
                setCircleInfo(response.data.circles)
            }
            setIsLoading(true);
        })
        .catch(()=>{
            setUSerInfo(undefined);
            setIsLoading(true);
        });
    }

    const addCircle = (name : string, explaination : string , picture : string) : void=> {
        api.addCircle({
            name : name,
            explaination: explaination, 
            picture: picture,
    }).then((response)=> {
        return response.data
    }).then((data)=>{
        setCircleInfo(data)
        console.warn(data)
    })
};

    const logout = ():void => {
        AsyncStorage.removeItem('token');
        setTokenInfo(null);
        setUSerInfo(undefined);
        setCircleInfo([]);
    };

    const withdraw = (username : string, password : string):void => {
        api.withDraw({
            username : username,
            password : password
        })
        AsyncStorage.removeItem('token');
        setUSerInfo(undefined);
    }



    
    return (
        <UserContext.Provider
            value = {{
                isLoading,
                userInfo,
                tokenInfo,
                circleInfo,
                addCircle,
                login,
                logout,
                userset,
                withdraw,
            }}>
                {children}
            </UserContext.Provider>
    );
};

export {UserContextProvider, UserContext};