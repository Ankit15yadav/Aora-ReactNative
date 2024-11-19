import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native';
import React, { useState } from 'react';
import { LatestPost } from '@/types/type';
import * as Animatable from 'react-native-animatable';
import { icons } from '@/constants';
import { VideoView, useVideoPlayer } from "expo-video"


type Props = {
    posts: LatestPost[];
};

const zoomIn = {
    from: {
        transform: [{ scale: 0.9 }],
    },
    to: {
        transform: [{ scale: 1.1 }],
    },
};

const zoomOut = {
    from: {
        transform: [{ scale: 1.1 }],
    },
    to: {
        transform: [{ scale: 0.9 }],
    },
};

const TrendingItem = ({ activeItem, item }: any) => {
    const [play, setPlay] = useState(false);
    const player = useVideoPlayer(item.video, player => {
        player.loop = true;
        player.play();
    })

    return (
        <Animatable.View
            style={{ marginRight: 10 }}
            animation={activeItem === item.$id ? zoomIn : zoomOut}
            duration={300}
        >
            {play ? (
                <VideoView
                    player={player}
                    allowsFullscreen
                    allowsPictureInPicture
                />
            ) : (
                <TouchableOpacity
                    className="relative justify-center items-center"
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                >
                    <ImageBackground
                        source={{ uri: item.thumbnail }}
                        className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
                        resizeMode="cover"
                    />
                    <Image
                        source={icons.play}
                        className="h-12 w-12 absolute"
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            )}
        </Animatable.View>
    );
};

const Trending = ({ posts }: Props) => {
    const [activeItem, setActiveItem] = useState(posts?.[2]);

    const viewableItemChanged = ({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key);
        }
    };

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 70,
    };

    if (!posts || posts.length === 0) {
        return <Text>No posts available</Text>;
    }

    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <TrendingItem activeItem={activeItem} item={item} />
            )}
            horizontal
            onViewableItemsChanged={viewableItemChanged}
            viewabilityConfig={viewabilityConfig}
        />
    );
};

export default Trending;
