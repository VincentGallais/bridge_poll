import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const QuizzFilter = ({  }) => {
  return (
    <SafeAreaView>
        <View style={{backgroundColor:'red', paddingVertical: 8, alignItems: 'flex-start', paddingLeft: 16, flexDirection: 'column'}}>
            <Text>Filtrage</Text>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

});

export default QuizzFilter;
