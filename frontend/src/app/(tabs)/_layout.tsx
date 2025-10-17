import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <FontAwesome name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="received-cards"
        options={{
          title: 'Received Cards',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="email-open-heart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="card-creator"
        options={{
          title: 'Card Creator',
          tabBarIcon: ({ color, size }) => <Entypo name="new-message" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="template-gallery"
        options={{
          title: 'Template Gallery',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="palette" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
