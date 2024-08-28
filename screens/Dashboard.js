import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Card as PaperCard, Title, Paragraph } from 'react-native-paper';
import { LineChart, ProgressChart } from 'react-native-chart-kit';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
// import { Dimensions } from 'react-native';

// const windowWidth = Dimensions.get('window').width;

const Dashboard = () => {

    const navigation = useNavigation();
  
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // color of the line
        strokeWidth: 2,
      },
    ],
  };

  const datas = {
    labels: ["2024"], // optional
    data: [0.4]
  };

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };


  return (
    <View style={styles.container}>
    
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('ContactDetails')}>
          <FontAwesome name="user" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity >
          <FontAwesome name="bell" size={24} color="black" />
        </TouchableOpacity>
      </View>

    
      <ScrollView style={styles.scrollContainer}>
     
        <PaperCard style={styles.card}>
  <PaperCard.Content>
    <Title>Monthly Transactions</Title>
    <ScrollView horizontal>
      <LineChart
        data={data}
        width={300} // Adjust the width as needed
        height={200}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
    </ScrollView>
  </PaperCard.Content>
</PaperCard>

     
        <View style={{ marginTop: 16 }}>
          <PaperCard style={{ backgroundColor: '#87CEEB', overflow: 'hidden' }}>
            <PaperCard.Content>
              <Title>Yearly Breakup</Title>
              <Text>Yearly Breakup Content</Text>
            </PaperCard.Content>
            <ProgressChart
               data={datas}
               marginLeft={5}
               marginRight={5}
               width={350}
               height={100}
               strokeWidth={10}
               radius={36}
               chartConfig={chartConfig}
               hideLegend={false}
               style={{ marginLeft: 5, marginRight: 5, marginBottom: 5, borderRadius: 10 }}
            />

          </PaperCard>
        </View>

       
         <PaperCard style={styles.card}>
            <PaperCard.Content>
              <Title>Monthly Earnings</Title>
              <Text>Monthly Earnings Content</Text>
              <FontAwesome name="rupee" size={24} color="black" />
            </PaperCard.Content>
          </PaperCard>

     
        <PaperCard style={styles.card} onPress={() => navigation.navigate('Transactions')}>
          <PaperCard.Content>
            <Title>Recent Transactions</Title>
            <Text>Recent Transactions List</Text>
            <FontAwesome name="exchange" size={24} color="black" />
          </PaperCard.Content>
        </PaperCard>

       
        <View style={styles.productRowContainer}>
          <PaperCard style={styles.productCard} onPress={() => navigation.navigate('UsersScreen')}>
            <PaperCard.Content>
              <Title>Group Members</Title>
            </PaperCard.Content>
          </PaperCard>
          <PaperCard style={styles.productCard} onPress={() => navigation.navigate('MyPofile')}>
            <PaperCard.Content>
              <Title>My Pofile</Title>
            </PaperCard.Content>
          </PaperCard>
        </View>
      </ScrollView>

    
      <View style={styles.footer}>
        <Text style={styles.footerText}>Design and Developed Rajeshwari M</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 16,
    backgroundColor: '#87CEEB',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginVertical: 8,
    backgroundColor: '#87CEEB',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  productRowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  productCard: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: '#87CEEB',
  },
  footer: {
    alignItems: 'center',
    padding: 16,
  },
  footerText: {
    fontSize: 16,
  },
});

export default Dashboard;
