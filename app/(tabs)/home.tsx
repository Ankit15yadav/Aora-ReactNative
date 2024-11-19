import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants"
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import EmptyState from '@/components/EmptyState'
import { getAllPosts, getLatestPosts } from '@/lib/appwrite'
import { useAppwrite } from '@/lib/useAppwrite'
import VideoCard from '@/components/videoCard'
import { LatestPost } from '@/types/type'

const Home = () => {
    const { data: posts, refetch } = useAppwrite(getAllPosts())
    const { data: latestPosts } = useAppwrite(getLatestPosts())

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true)
        //fetching any new video found
        refetch();
        setRefreshing(false);
    }

    // console.log("latestPost showing", latestPosts);

    // const reversedPosts = posts ? [...posts].reverse() : [];

    return (
        <SafeAreaView className='bg-primary h-full'>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <Text className=' text-3xl font-bold text-white'>
                        <VideoCard
                            video={item}
                        />
                    </Text>
                )}
                ListHeaderComponent={() => (
                    <View className='my-6 px-4 space-y-6'>
                        <View className='justify-between items-start flex-row mb-6'>
                            <View>
                                <Text className=' text-sm font-pmedium text-gray-100'>
                                    Welcome Back
                                </Text>
                                <Text className='text-2xl font-psemibold text-white'>
                                    Ankit yadav
                                </Text>
                            </View>
                            <View>
                                <Image
                                    source={images.logoSmall}
                                    className='w-9 h-10'
                                    resizeMode='contain'
                                >
                                </Image>
                            </View>
                        </View>

                        <SearchInput
                            placeholder='Search for video topic'
                            keyboardType='default'
                        />

                        <View
                            className='w-full flex-1 pt-5 pb-8'
                        >
                            <Text className='text-gray-100 text-lg mb-3 font-pregular'>
                                latest Videos
                            </Text>

                            <Trending
                                posts={latestPosts}
                            />
                        </View>

                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No Videos Found"
                        subTitle="Be the first one to uploada a video"
                    />
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}

                    />
                }
            />
        </SafeAreaView>
    )
}
export default Home