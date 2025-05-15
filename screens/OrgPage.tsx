import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  Animated,
} from 'react-native';

const dummyPosts = [
  { id: '1', title: 'Insert post here hehe hoho', username: 'User One' },
  { id: '2', title: 'Insert post here hehe hoho', username: 'User Two' },
  { id: '3', title: 'Insert post here hehe hoho', username: 'User Three' },
  { id: '4', title: 'Insert post here hehe hoho', username: 'User Four' },
  { id: '5', title: 'Insert post here hehe hoho', username: 'User Five' },
];

const members = [
  { id: '1', name: 'member 1' },
  { id: '2', name: 'member 2' },
  { id: '3', name: 'member 3' },
  { id: '4', name: 'member 4' },
  { id: '5', name: 'member 5' },
  { id: '6', name: 'member 6' },
  { id: '7', name: 'member 7' },
  { id: '8', name: 'member 8' },
  { id: '9', name: 'member 9' },
  { id: '10', name: 'member 10' },
];

const HEADER_EXPANDED = 210;
const HEADER_COLLAPSED = 130;

export default function OrgPage() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(400)).current; // starts off screen right
  const [menuOpen, setMenuOpen] = useState(false);

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED - HEADER_COLLAPSED],
    outputRange: [HEADER_EXPANDED, HEADER_COLLAPSED],
    extrapolate: 'clamp',
  });

  const orgInfoOpacity = scrollY.interpolate({
    inputRange: [0, 20],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const orgNameTranslateY = scrollY.interpolate({
    inputRange: [0, 30],
    outputRange: [0, -20],
    extrapolate: 'clamp',
  });

  function openSlideMenu() {
    setMenuOpen(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  function closeSlideMenu() {
    Animated.timing(slideAnim, {
      toValue: 400,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setMenuOpen(false));
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E7F0E6' }}>
      <StatusBar barStyle="light-content" backgroundColor="#278086" />

      {/* Header */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: headerHeight,
          backgroundColor: '#278086',
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          paddingHorizontal: 16,
          justifyContent: 'flex-end',
          paddingBottom: 16,
          zIndex: 5,
        }}
      >
        {/* Org Info */}
        <Animated.View
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 12,
            padding: 16,
            elevation: 3,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 4,
            flexDirection: 'row',
            alignItems: 'center',
            opacity: orgInfoOpacity,
          }}
        >
          <View
            style={{
              width: 64,
              height: 64,
              backgroundColor: '#d8dee2',
              borderRadius: 8,
              marginRight: 12,
            }}
          />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#333',
                marginBottom: 4,
              }}
            >
              ORg
            </Text>
            <Text style={{ fontSize: 14, color: '#2e7d32' }}>
              Bio stuff wow super nice org
            </Text>
          </View>
        </Animated.View>

        {/* Org Name */}
        <Animated.Text
          style={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 20,
            transform: [{ translateY: orgNameTranslateY }],
          }}
        >
          ORg
        </Animated.Text>
      </Animated.View>

      {/* 3-dot button */}
      <TouchableOpacity
        onPress={openSlideMenu}
        style={{
          position: 'absolute',
          top: 20,
          right: 16,
          width: 32,
          height: 32,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255,255,255,0.25)',
          borderRadius: 16,
          zIndex: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 5,
        }}
      >
        {/* 3 dots */}
        <View
          style={{
            width: 6,
            height: 6,
            backgroundColor: '#fff',
            borderRadius: 3,
          }}
        />
        <View
          style={{
            width: 6,
            height: 6,
            backgroundColor: '#fff',
            borderRadius: 3,
          }}
        />
        <View
          style={{
            width: 6,
            height: 6,
            backgroundColor: '#fff',
            borderRadius: 3,
          }}
        />
      </TouchableOpacity>

      {/* Content Scroll */}
      <Animated.ScrollView
        contentContainerStyle={{
          paddingTop: HEADER_EXPANDED + 16,
          paddingBottom: 32,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Event Card */}
        <View
          style={{
            backgroundColor: '#E1E6D4',
            borderRadius: 32,
            padding: 16,
            marginHorizontal: 16,
            marginBottom: 24,
            elevation: 3,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 4,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flex: 1, paddingRight: 8 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: 4,
                }}
              >
                Insert event here wow it's happening on
              </Text>
              <Text style={{ fontSize: 12, color: '#555' }}>
                24/1/1291 : 8:00AM - 10:00AM
              </Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: '#DFBE73',
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 20,
              }}
            >
              <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>
                Attend
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Posts */}
        <View style={{ paddingHorizontal: 16 }}>
          <FlatList
            data={dummyPosts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 16,
                  elevation: 2,
                  shadowColor: '#000',
                  shadowOpacity: 0.05,
                  shadowRadius: 3,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: '#333',
                      marginBottom: 4,
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text style={{ fontSize: 13, color: '#666' }}>
                    {item.username}
                  </Text>
                </View>
                <View
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: '#e0e0e0',
                    borderRadius: 6,
                    marginLeft: 12,
                  }}
                />
              </View>
            )}
            scrollEnabled={false}
          />
        </View>
      </Animated.ScrollView>

      {/* Sliding Panel */}
      {menuOpen && (
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            width: '100%',
            backgroundColor: '#ffffff',
            transform: [{ translateX: slideAnim }],
            zIndex: 20,
            paddingTop: 60,
            paddingHorizontal: 20,
          }}
        >
          {/* Close Button */}
          <TouchableOpacity
            onPress={closeSlideMenu}
            style={{ alignSelf: 'flex-end', marginBottom: 20 }}
          >
            <Text
              style={{ fontSize: 16, color: '#278086', fontWeight: 'bold' }}
            >
              Close
            </Text>
          </TouchableOpacity>

          {/* Members List */}
          <FlatList
            data={members}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 100 }}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 12,
                  borderBottomWidth: 1,
                  borderBottomColor: '#eee',
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: '#d8dee2',
                    borderRadius: 20,
                    marginRight: 16,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: '#555', fontWeight: 'bold' }}>
                    {item.name.charAt(0)}
                  </Text>
                </View>
                <Text style={{ fontSize: 16, color: '#333' }}>{item.name}</Text>
              </View>
            )}
          />
        </Animated.View>
      )}
    </SafeAreaView>
  );
}
