//import liraries
import React, {Component} from 'react';
import {View, Text, ScrollView, Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');

const data = [
  {
    title: '1. INTRODUCTION',
    description:'These Website Standard Terms And Conditions (these “Terms” or these “Website Standard Terms And Conditions”) contained herein on this webpage, shall govern your use of this website, including all pages within this website (collectively referred to herein below as this “Website”). These Terms apply in full force and effect to your use of this Website and by using this Website, you expressly accept all terms and conditions contained herein in full. You must not use this Website, if you have any objection to any of these Website Standard Terms And Conditions.'
  },
  {
    title: '2. INTELLECTUAL PROPERTY RIGHTS',
    description:'Suyesha Technology Consulting and/or its licensors own all rights to the intellectual property and material contained in this Website, and all such rights are reserved.'
  },
  {
    title: '3. RESTRICTIONS',
    description:'You are expressly and emphatically restricted from all of the following:\n\n1. publishing any Website material in any media;\n2. sublicensing and/or otherwise commercializing any Website material;\n3. publicly performing and/or showing any Website material;\n4. using this Website in any way that is, or may be, damaging to this Website;\n5 .using this Website in any way that impacts user access to this Website;\n6 .using this Website contrary to applicable laws and regulations, or in a way that causes, or may cause, harm to the Website, or to any person or business entity;\n7. engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website, or while using this Website;\n8. using this Website to engage in any advertising or marketing;\n\nAny user ID and password you may have for this Website are confidential and you must maintain confidentiality of such information.'
  },
  {
    title: '4. LIMITATION OF LIABILITY',
    description:'In no event shall Suyesha Technology Consulting , nor any of its officers, directors and employees, be liable to you for anything arising out of or in any way connected with your use of this Website, whether such liability is under contract, tort or otherwise, and Suyesha Technology Consulting , including its officers, directors and employees shall not be liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.'
  },
  {
    title: '5. INDEMNIFICATION',
    description:'You hereby indemnify to the fullest extent Suyesha Technology Consulting from and against any and all liabilities, costs, demands, causes of action, damages and expenses (including reasonable attorney’s fees) arising out of or in any way related to your breach of any of the provisions of these Terms.'
  },
  {
    title: '6. SEVERABILITY',
    description:'If any provision of these Terms is found to be unenforceable or invalid under any applicable law, such unenforceability or invalidity shall not render these Terms unenforceable or invalid as a whole, and such provisions shall be deleted without affecting the remaining provisions herein.'
  },
  {
    title: '7. VARIATION OF TERMS',
    description:'Suyesha Technology Consulting is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review such Terms on a regular basis to ensure you understand all terms and conditions governing use of this Website.'
  },
  {
    title: '8. ASSIGNMENT',
    description:'Suyesha Technology Consulting shall be permitted to assign, transfer, and subcontract its rights and/or obligations under these Terms without any notification or consent required. However, .you shall not be permitted to assign, transfer, or subcontract any of your rights and/or obligations under these Terms.'
  },
  {
    title: '9. ENTIRE AGREEMENT',
    description:'These Terms, including any legal notices and disclaimers contained on this Website, constitute the entire agreement between Suyesha Technology Consulting and you in relation to your use of this Website, and supersede all prior agreements and understandings with respect to the same.'
  },
  {
    title: '10. GOVERNING LAW & JURISDICTION',
    description:'These Terms will be governed by and construed in accordance with the laws of the State of Karnataka, and you submit to the non-exclusive jurisdiction of the state and federal courts located in Karnataka for the resolution of any disputes.'
  },

];
// create a component
const TermCondition = () => {
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
export default TermCondition;
