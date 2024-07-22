import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const HomeRedirect = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.navigate('Quizz');
  }, [navigation]);

  return null;
};

export default HomeRedirect;
