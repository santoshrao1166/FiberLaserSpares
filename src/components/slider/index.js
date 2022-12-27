/* eslint-disable */
import React, {Component} from 'react';
import {StyleSheet, SafeAreaView,Dimensions, Image} from 'react-native';
// import FastImage from 'react-native-fast-image';

import {SliderBox} from '../slider/SliderBox';
const {width, height} = Dimensions.get('window');

export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: this.props.images,
    };
  }

  onLayout = e => {
    this.setState({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container} onLayout={this.onLayout}>
        <SliderBox
          ShowArrow={this.props.showArrow}
          ImageComponent={Image}
          images={this.state.images}
          sliderBoxHeight={(this.props.sliderBoxHeight)?this.props.sliderBoxHeight:height*0.22}
          // onCurrentImagePressed={index =>
          //   console.warn(`image ${index} pressed`)
          // }
          //currentImageEmitter={index => console.warn(`image ${index} pressed`)}
          dotColor="#E85D51"
          inactiveDotColor="#D9D9D9"
          paginationBoxVerticalPadding={20}
          paginationBoxStyle={{
            // position: 'absolute',
            // bottom: 0,
            // padding: 0,
            // alignItems: 'center',
            // alignSelf: 'center',
            // justifyContent: 'center',
            // paddingVertical: 10,
          }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            padding: 0,
            margin: 0,
            backgroundColor: 'rgba(128, 128, 128, 0.92)',
          }}
          // autoplay
          circleLoop
          ImageComponentStyle={{
            borderRadius: 5,
            width: (this.props.width)?this.props.width:'98%', marginTop: 10}}
          imageLoadingColor="#2196F3"
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});