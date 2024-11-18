import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Creator, VideoData } from '@/types/type'
import { icons } from '@/constants'

type Props = {
    video: VideoData
}


const VideoCard = ({ video: { title, thumbnail, creator } }: Props) => {

    const { avatar, username, } = creator || {};
    const [play, setPlay] = useState(false);

    return (
        <View className=' flex-col items-center px-4 mb-14'>

            <View className=' flex-row gap-3 items-start'>
                <View className=' justify-center items-center flex-1 flex-row'>
                    <View className='w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center'>
                        <Image
                            source={{ uri: avatar }}
                            className='w-full h-full rounded-lg'
                            resizeMode='cover'
                        />
                    </View>
                    <View className='justify-center flex-1 ml-3 gap-y-1'>
                        <Text className='font-psemibold text-sm text-white '
                            numberOfLines={1}
                        >
                            {title}
                        </Text>
                        <Text className='text-xs text-gray-100 font-pregular'
                            numberOfLines={1}
                        >
                            {username}
                        </Text>
                    </View>
                </View>

                <View className='pt-2 '>
                    <Image
                        source={icons.menu}
                        className='w-5 h-5'
                        resizeMode='contain'
                    />
                </View>
            </View>
            {
                play ?
                    (<Text className='text-white'>
                        Playing
                    </Text>)
                    :
                    (<TouchableOpacity
                        onPress={() => setPlay(true)}
                        activeOpacity={0.7}
                        className='w-full h-64 rounded-xl mt-3 mb-8 relative justify-center items-center'>
                        <Image
                            source={{ uri: thumbnail }}
                            className='w-full h-full rounded-xl mt-3'
                            resizeMode='cover'
                        />
                        <Image
                            source={icons.play}
                            className='w-12 h-12 absolute'
                            resizeMode='contain'
                        />
                    </TouchableOpacity>)
            }
        </View>
    )
}

export default VideoCard