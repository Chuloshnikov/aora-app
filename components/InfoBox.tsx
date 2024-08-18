import { View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import React from 'react';

interface InfoBoxProps {
  title: string;
  subTitle: string;
  containerStyles?: string;
  titleStyles?: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({ title, subTitle, containerStyles, titleStyles }) => {
  return (
    <View className={containerStyles}>
      <Text className={`text-white text-center font-psemibold ${titleStyles}`}>
        {title}
      </Text>
      <Text className='text-sm text-gray-100 text-center font-pregular'>
        {subTitle}
      </Text>
    </View>
  );
};

export default InfoBox;