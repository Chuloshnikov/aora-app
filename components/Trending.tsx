import { Text, FlatList, TouchableOpacity, ImageBackground, Image, ViewToken } from 'react-native';
import React, { useState, useCallback, useRef } from 'react';
import * as Animatable from 'react-native-animatable';


import { icons } from "../constants";

import { Video, ResizeMode } from 'expo-av';

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

interface TrendingItemProps {
  activeItem: string | null;
  item: {
    $id: string;
    thumbnail: string;
  };
}

const TrendingItem: React.FC<TrendingItemProps> = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
        source={{ uri: item.video }}
        className='w-52 h-72 rounded-[35px] mt-3 bg-white/10'
        resizeMode={ResizeMode.CONTAIN}
        useNativeControls
        shouldPlay
        onPlaybackStatusUpdate = {(status) => {
          if(status.didJustFinish) {
            setPlay(false);
          }
        }}
        />
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 first-letter:overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

interface TrendingProps {
  posts: {
    $id: string;
    thumbnail: string;
  }[];
}

const Trending: React.FC<TrendingProps> = ({ posts }) => {
  const [activeItem, setActiveItem] = useState<string | null>(posts[1]?.$id || null);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setActiveItem(viewableItems[0].item.$id);
      }
    },
    []
  );

  // Создаем пару для viewabilityConfigCallbackPairs
  const viewabilityConfigCallbackPairs = useRef([
    { onViewableItemsChanged, viewabilityConfig: { itemVisiblePercentThreshold: 70 } }
  ]);

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => <TrendingItem activeItem={activeItem} item={item} />}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current} // Используем пары вместо отдельных пропсов
      contentOffset={{ x: 170 }}
    />
  );
};

export default Trending;