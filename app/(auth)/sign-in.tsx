import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from "../../constants"
import FormField from '@/components/FormField'
import CustomButton from '@/components/custom-button'
import { Link, router } from 'expo-router'
import { signIn } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'

interface useForm {
    email: string,
    password: string,
}

const SignIn = () => {

    const [form, setForm] = useState<useForm>({
        email: '',
        password: '',
    })
    const [issubmitting, setIsSubmitting] = useState(false);
    const { setIsLoggedIn, setUser } = useGlobalContext();

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const submit = async () => {
        if (!form.email || !form.password) {
            Alert.alert('Error', 'Please fill in all the fields');
            return;
        }

        const sanitizedForm = {

            email: form.email.trim(),
            password: form.password.trim(),
        };

        // console.log("email on sign-up", sanitizedForm.email);

        const valid = isValidEmail(sanitizedForm.email);

        if (!valid) {
            Alert.alert("Please Enter a valid email address");
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await signIn(sanitizedForm.email, sanitizedForm.password);

            setUser(result);
            setIsLoggedIn(true);

            router.replace('/home');
        } catch (error) {
            Alert.alert('Error', error instanceof Error ? error.message : 'Error while Submitting form');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <SafeAreaView className='bg-primary h-full'>
            <ScrollView>
                <View className='w-full justify-center min-h-[83vh] px-4 my-6'>
                    <Image
                        source={images.logo}
                        resizeMode='contain'
                        className='w-[115px] h-[35px]'
                    />
                    <Text
                        className='text-2xl text-white font-semibold mt-10'
                    >
                        Log in to Aora
                    </Text>

                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(e: string) => setForm({ ...form, email: e })}
                        otherStyles="mt-7"
                        keyboardType="email-address"
                    />
                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e: string) => setForm({ ...form, password: e })}
                        otherStyles="mt-7"
                    />

                    <CustomButton
                        title='Sign In'
                        handlePress={submit}
                        ContainerStyles='mt-7'
                        isLoading={issubmitting}

                    />

                    <View
                        className='justify-center pt-5 flex-row gap-2'
                    >
                        <Text className='text-lg text-gray-100 font-pregular'>
                            Don't have account?
                        </Text>
                        <Link
                            href={"/sign-up"}
                            className='text-lg font-psemibold text-secondary'
                        >
                            Sign Up
                        </Link>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn