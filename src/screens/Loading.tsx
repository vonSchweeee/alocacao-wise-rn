import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux';
import { ReduxState } from '../store/types';

const Loading: React.FC = () => {
    return (
        <View>
            <Text>Carregando...</Text>
        </View>
    );
};

export default Loading;

const styles = StyleSheet.create({});
