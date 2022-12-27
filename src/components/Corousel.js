import React, {useState, useRef} from 'react';
import {Text, View, Dimensions, Image} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

export const SLIDER_WIDTH = Dimensions.get('window').width + 110;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);


const renderItem = ({item}) => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flex: 2,
          alignItems: 'center',
          backgroundColor: '#9572F8',
          borderRadius: 10,
          alignItems: 'center',
          justifyContent:'center',
          marginHorizontal:'5%'
        }}>
        <Image
          resizeMode="contain"
          style={{ height: 250}}
          source={require('../assets/images/saly.png')}
        />
      </View>
      <View
        style={{
          flex: 1,
          textAlign: 'center',
          justifyContent: 'flex-start',
          paddingVertical: 5,
        }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#464444',
          }}>
          {item.titleText + "\n"}{item.subTitleText}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: '#464444',
            paddingVertical: 5,
          }}>
          {item.para}
        </Text>
      </View>
    </View>
  );
};

const CarouselComp = ({data}) => {
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);
  return (
    <View style={{marginVertical: 0}}>
      <Carousel
        ref={isCarousel}
        data={data}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={index => setIndex(index)}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
        dotStyle={{
          width: 12,
          height: 12,
          borderRadius: 10,
          marginHorizontal: 8,
          backgroundColor: '#4285F4',
        }}
        tappableDots={true}
        inactiveDotStyle={{
            width: 20,
            height: 20,
            borderRadius: 10,
            marginHorizontal: 8,
            backgroundColor: '#000000',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

export default CarouselComp;


