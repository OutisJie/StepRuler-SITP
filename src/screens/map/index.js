import React from "react";
import { MapView, UrlTile } from "expo";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { Icon } from 'react-native-elements'

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapIndex extends React.Component {
  static navigationOptions = {
    title: "地图"
  };
  constructor() {
    super();
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      urlTemplate: ''
    };
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      },
      (error) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      }
    );
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  animate() {
    const { coordinate } = this.state;
    const newCoordinate = {
      latitude: LATITUDE + ((Math.random() - 0.5) * (LATITUDE_DELTA / 2)),
      longitude: LONGITUDE + ((Math.random() - 0.5) * (LONGITUDE_DELTA / 2)),
    };

    if (Platform.OS === 'android') {
      if (this.marker) {
        this.marker._component.animateMarkerToCoordinate(newCoordinate, 500);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <MapView
          style={styles.map}
          showsUserLocation={true}
          region={this.state.region}
          onRegionChange={region => this.setState({ region })}
          onRegionChangeComplete={region => this.setState({ region })}
        >
          <MapView.Marker
            draggable
            onDragEnd={(e) => this.setState({ x: e.nativeEvent.coordinate })}
            coordinate={this.state.region}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => this.animate()}
            >
              <Icon
                name={Platform.OS === 'ios' ? 'ios-remove-circle-outline' : 'md-remove-circle-outline'} 
                type='ionicon'
                containerStyle={styles.bubble}
                iconStyle={{color: '#fff'}}
                />
            </TouchableOpacity>
          </View>
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 30,
    height: 30
  },
  icon: {
    color: 'white',
    fontSize: 40
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
})