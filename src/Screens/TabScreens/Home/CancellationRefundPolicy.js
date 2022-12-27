//import liraries
import React, {Component} from 'react';
import {View, Text, ScrollView, Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');

const data = [
  {
    title: 'Overview',
    description:'Our refund and returns policy lasts 7 days. If 7 days have passed since your purchase, we can’t offer you a full refund or exchange.\n\n To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.\n\nSeveral types of goods are exempt from being returned.\n\nTo complete your return, we require a receipt or proof of purchase.\n\nThere are certain situations where only partial refunds are granted:\n\nIf some of the parts from a group purchase are used.\n\nAny item not in its original condition, is damaged or missing parts for reasons not due to our error.\n\nAny item that is returned more than 7 days after delivery'
  },
  {
    title: 'Refunds',
    description:'Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.\n\nIf you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.\n\nLate or missing refunds\n\nIf you haven’t received a refund yet, first check your bank account again.\n\nThen contact your credit card company, it may take some time before your refund is officially posted.\n\nNext contact your bank. There is often some processing time before a refund is posted.\n\nIf you’ve done all of this and you still have not received your refund yet, please contact us at {info@fiberlaserspares.com}.\n\nSale items\n\nOnly regular priced items may be refunded. Sale items cannot be refunded, unless otherwise stated.'
  },
  {
    title: 'Exchanges',
    description:'We only replace items if they are defective or damaged.'
  },
  {
    title: 'Shipping returns',
    description:'Shipping charges have to be borne by you and will not be refunded. f you receive a refund, the cost of to and fro shipping will be deducted from your refund.\n\nDepending on where you live, the time it may take for your exchanged product to reach you may vary.\n\nIf you are returning more expensive items, you may consider using a trackable shipping service or purchasing shipping insurance. We don’t guarantee that we will receive your returned item.'
  },
  {
    title: 'Need help?',
    description:'Contact us at {info@fiberlaserspares.com} for questions related to refunds and returns.'
  },
];
// create a component
const CancellationRefundPolicy = () => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{alignItems: 'center', paddingVertical: 10}}>
      {data?.map((item, index) => (
        <View key={index} style={{paddingTop: 30, width: width * 0.9}}>
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
export default CancellationRefundPolicy;
