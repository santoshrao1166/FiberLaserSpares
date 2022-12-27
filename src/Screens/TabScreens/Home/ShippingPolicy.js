//import liraries
import React, {Component} from 'react';
import {View, Text, ScrollView, Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');

const data = [
  {
    title: 'SHIPPING CHARGES',
    description: 'Actual shipping charges, if any, will depend on the product.  These would be communicated at the time of order processing.',
  },
  {
    title: 'DELIVERY TIMES',
    description: 'We deliver your order within 3-5 working days after dispatch at the metros. For the rest of the cities, we deliver between 4-8 business days. For rural and remote areas, the delivery time will be up to 10 days.\n\nIf there are options for express delivery, they would be mentioned explicitly at the checkout. The shipping time will also depend on the mode of shipping. Air shipments will generally have the above-mentioned timelines. Road delivery will take more time (2-4 days extra, depending on the location).',
  },
  {
    title: 'DEFINITION OF WORKING DAYS',
    description: 'Public holidays, bank holidays and national holidays along with the weekends are not considered working days. Shipping will not generally be available on these days.',
  },
  {
    title: 'CHANGE IN DELIVERY ADDRESS',
    description: 'If you need to change the delivery address, please contact us on the email info@fiberlaserspares.com. If the order has not been dispatched, we would try to change the delivery address.\n\nIf the order has been dispatched, we will be unable to change the shipping address.',
  },
  {
    title: 'WHERE ALL CAN THE ORDER BE SHIPPED',
    description: 'Our delivery partners can service you across India. If, for some reason, we are unable to deliver at your location, you will be informed at the time about that before checkout.',
  }
];
// create a component
const Shipping = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{alignItems: 'center', paddingVertical: 10}}>
      {data?.map((item, index) => (
        <View style={{paddingTop: 30, width: width * 0.9}}>
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.description}>{item?.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 20,
    color: '#000000',
    fontWeight: '500',
  },
  description: {
    paddingTop: 10,
    fontSize: 15,
    color: '#000000',
    fontWeight: '400',
  },
});

//make this component available to the app
export default Shipping;
