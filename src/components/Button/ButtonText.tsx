import {Text} from 'react-native'


type ButtonTextProps = {
  children: React.ReactNode
}

export function ButtonText({children}:ButtonTextProps){
  return (
    <Text className='text-black font-medium text-base leading-6'>
      {children}
    </Text>
  );
}