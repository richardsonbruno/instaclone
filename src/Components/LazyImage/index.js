import React, {useState, useEffect} from 'react';
import {Animated} from 'react-native';

import {Small, Original} from './styles';

export default function LazyImage({source, smallImage, aspectRatio}) {
  const opacity = new Animated.Value(0);
  const [loaded, setLoaded] = useState(false);

  const OriginalAnimated = Animated.createAnimatedComponent(Original);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, []);

  function handleAnimated() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Small
      source={smallImage}
      ratio={aspectRatio}
      resizeMode="contain"
      blurRadius={2}>
      {loaded && (
        <OriginalAnimated
          style={{opacity}}
          source={source}
          ratio={aspectRatio}
          resizeMode="contain"
          onLoadEnd={handleAnimated}
        />
      )}
    </Small>
  );
}
