import React, {useState, useRef, useCallback, useEffect} from 'react';
import { StyleSheet ,View,Text} from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
export const SliderContainer = (props) => {
    const {caption, sliderValue, value ,setValue , trackMarks} = props;
    // const [value, setValue] = React.useState(
    //     sliderValue ? sliderValue : DEFAULT_VALUE,
    // );
    let renderTrackMarkComponent;

    if (trackMarks?.length && (!Array.isArray(value) || value?.length === 1)) {
        renderTrackMarkComponent = (index) => {
            const currentMarkValue = trackMarks[index];
            const currentSliderValue =
                value || (Array.isArray(value) && value[0]) || 0;
            const style =
                currentMarkValue > Math.max(currentSliderValue)
                    ? trackMarkStyles.activeMark
                    : trackMarkStyles.inactiveMark;
            return <View style={style} />;
        };
    }

    const renderChildren = () => {
        return React.Children.map(
            props.children,
            (child) => {
                if (!!child && child.type === Slider) {
                    return React.cloneElement(child, {
                         onValueChange: setValue,
                         renderTrackMarkComponent,
                         trackMarks,
                         value,
                    });
                }

                return child;
            },
        );
    };

    return (
        <View style={styles.sliderContainer}>
            <View style={styles.titleContainer}>
                <Text style={{color:'#000000'}}>{caption}</Text>
                <Text>{Array.isArray(value) ? value.join(' - ') : value}</Text>
            </View>
            {renderChildren()}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        margin: 16,
        paddingBottom: 32,
    },
    sliderContainer: {
        paddingVertical: 16,
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    vertical: {
      
    }
});