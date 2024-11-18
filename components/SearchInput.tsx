import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { icons } from "../constants";

type Props = {
    title?: string;
    value?: string;
    placeholder?: string;
    handleChangeText?: (e: string) => void;
    otherStyles?: string;
    keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad';
};

const SearchInput = ({ title, value, placeholder, handleChangeText, otherStyles = '', keyboardType = 'default' }: Props) => {
    const [showPassword, setShowPassword] = useState(false);

    return (

        <View className='border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl 
         focus:border-secondary items-center flex-row space-x-4 '>
            <TextInput
                className='text-base mt-0.5 text-white w-full h-full flex-1 font-pregular'
                value={value}
                placeholder={placeholder}
                placeholderTextColor="#7b7b8b"
                onChangeText={handleChangeText}
                secureTextEntry={title === 'Password' && !showPassword}
                keyboardType={keyboardType}
            />

            <TouchableOpacity
            >
                <Image
                    source={icons.search}
                    className=' w-5 h-5'
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View>
    );
};

export default SearchInput;