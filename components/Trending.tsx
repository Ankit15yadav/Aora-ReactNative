import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import { LatestPost } from '@/types/type'
import * as Animatable from "react-native-animatable"

type Props = {
    posts: LatestPost[]
}


const zoomIn = {
    0: {
        scale: 0.9
    },
    1: {
        scale: 1,
    }
}

const zoomOut = {
    0: {
        scale: 1,
    },
    1: {
        scale: 0.9,
    }
}

const TrendingItem = ({ activeItem, item }: any) => {
    return (
        <Animatable.View
            className='mr-5 '
        // animation={activeItem === item.$id ? zoomIn : zoomOut}
        >

        </Animatable.View>
    )
}

const Trending = ({ posts }: Props) => {

    const [activeItem, setActiveItem] = useState(posts[0]);

    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <TrendingItem
                    activeItem={activeItem}
                    item={item}
                />
            )}
            horizontal
        />
    )
}

export default Trending