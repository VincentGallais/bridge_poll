import React, { useEffect } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('screen');

const ProgressBar = ({ widthPct, barWidth }) => {
  const animatedWidth = React.useRef(new Animated.Value(0)).current;

  const finalWidth = (barWidth * widthPct) / 100;

  useEffect(() => {
    Animated.spring(animatedWidth, {
      toValue: finalWidth,
      bounciness: 10,
      speed: 2,
      useNativeDriver: false, // Ensure useNativeDriver is false
    }).start();
  }, [barWidth, finalWidth, widthPct]);

  return (
    <View style={[styles.barContainer, { width: barWidth }]}>
      <Animated.View style={[styles.progressBar, { width: animatedWidth }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    backgroundColor: '#eee',
    height: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  progressBar: {
    backgroundColor: 'purple',
    height: '100%',
    borderRadius: 15,
  },
});

export default ProgressBar;
