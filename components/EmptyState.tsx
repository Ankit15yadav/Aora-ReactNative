import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from "../constants"
import CustomButton from './custom-button'
import { router } from 'expo-router'

type Props = {
    title: string,
    subTitle: string,
}

const EmptyState = ({ title, subTitle }: Props) => {
    return (
        <View className=' justify-center items-center px-4'>
            <Image
                source={images.empty}
                className='w-[270px] h-[215px]'
                resizeMode='contain'
            />

            <Text className='text-xl text-center mt-2 font-psemibold text-white'>
                {title}
            </Text>
            <Text className=' text-sm font-pmedium text-gray-100'>
                {subTitle}
            </Text>

            <CustomButton
                title='Create Video'
                handlePress={() => router.push('/create')}
                ContainerStyles='w-full my-5'
            />
        </View>
    )
}

export default EmptyState