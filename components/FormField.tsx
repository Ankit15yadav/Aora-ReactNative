import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { icons } from "../constants";

type Props = {
    title: string;
    value: string;
    placeholder?: string;
    handleChangeText: (e: string) => void;
    otherStyles?: string;
    keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad';
};

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles = '', keyboardType = 'default' }: Props) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>

            <View className='w-full h-16 bg-black-100 rounded-2xl overflow-hidden focus:border-secondary'>
                <View className='flex-row items-center h-full px-4'>
                    <TextInput
                        className='flex-1 h-full text-white font-psemibold text-base'
                        value={value}
                        placeholder={placeholder}
                        placeholderTextColor="#7b7b8b"
                        onChangeText={handleChangeText}
                        secureTextEntry={title === 'Password' && !showPassword}
                        keyboardType={keyboardType}
                    />

                    {title === 'Password' && (
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            className='ml-2'
                        >
                            <Image
                                source={!showPassword ? icons.eye : icons.eyeHide}
                                resizeMode='contain'
                                className='w-6 h-6'
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
};

export default FormField;