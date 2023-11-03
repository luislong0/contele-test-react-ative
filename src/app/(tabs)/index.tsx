import { Text, View, Switch } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { TimeButton } from "../../components/TimeButton";
import NetInfo from "@react-native-community/netinfo";
import * as Location from "expo-location";
import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";
import { useAppDispatch, useAppSelector } from "../../store";
import axios, {  } from "axios";
import { clearStoreLocation, storeLocation } from "../../store/slices/communication";

const communicationTimes = [
  {
    text: "10s",
    interval: 10000,
  },
  {
    text: "5s",
    interval: 5000,
  },
  {
    text: "3s",
    interval: 3000,
  },
  {
    text: "1s",
    interval: 1000,
  },
];

export interface LocationData {
  id: string;
  latitude: number;
  longitude: number;
  speed: number | null;
  time: string;
}

export default function Home() {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [isEnabled, setIsEnabled] = useState(true);
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const dispatch = useAppDispatch();

  const storedLocations = useAppSelector((state) => {
    return state.communication.storedLocations;
  });
  
  const interval = useAppSelector((state) => {
    return state.communication.currentInterval;
  });

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  
  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude, speed } = location.coords;
    const time = new Date(location.timestamp!).toISOString();

    setLocationData({
      id: await uuidv4(),
      latitude,
      longitude,
      speed: speed ?? 0,
      time,
    });
  }

  async function sendLocationToAPI(locationData: LocationData[]) {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8081/points/${locationData[0].id}`,
        locationData
      );

      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Erro na solicitação Axios:", error.message);
      }
    }
  }

  async function sendStoreLocations() {
    if (isConnected && storedLocations.length > 0) {
      console.log("STORAGE LOCATIONS: " + JSON.stringify(storedLocations));
      try {
        const response = await axios.post(
          `http://127.0.0.1:8081/points/${storedLocations[0].id}`,
          storedLocations
        );
        console.log(response.status);
        if (response.status === 201) {
          // Limpe o storedLocations após o envio bem-sucedido
          dispatch(clearStoreLocation());
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Erro na solicitação Axios:", error.message);
        }
      }
    }
  }

  useEffect(() => {
    const locationInterval = isEnabled
      ? setInterval(() => {
          getLocation();
        }, interval)
      : null;

    return () => {
      if (locationInterval) clearInterval(locationInterval);
    };
  }, [interval, isEnabled]);

  useEffect(() => {
    const unsubscribeNetInfo = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      if (state.isConnected && storedLocations.length > 0) {
        sendStoreLocations();
      }
    });

    return () => {
      unsubscribeNetInfo();
    };
  }, [storedLocations]);

  useEffect(() => {
    if (locationData) {
      if (isConnected) {
        sendLocationToAPI([locationData]);
      } else {
        console.log(storedLocations);
        dispatch(storeLocation(locationData));
      }
      setLocationData(null); // Limpa o locationData após o envio
    }
  }, [locationData, isConnected]);

  return (
    <View
      style={{
        backgroundColor: "#f4f4f5",
        flex: 1,
      }}
    >
      <Header pageNumber={1} />

      <View
        style={{
          padding: 25,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
          borderBottomWidth: 1,
          borderBottomColor: "#d4d4d8",
        }}
      >
        <MaterialCommunityIcons
          name="compass-outline"
          size={65}
          color={"#1e40af"}
        />

        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "#27272a",
            }}
          >
            My GPS - Tracking
          </Text>
          {isConnected === true ? (
            <Text
              style={{
                color: "#22c55e",
                fontSize: 16,
              }}
            >
              Online
            </Text>
          ) : (
            <Text
              style={{
                color: "#27272a",
                fontSize: 16,
              }}
            >
              Offline
            </Text>
          )}
        </View>
      </View>

      <View
        style={{
          padding: 25,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ fontSize: 18, marginBottom: 4 }}>
            Status do serviço
          </Text>
          <Text style={{ color: "#3f3f46" }}>
            Serviço {isEnabled === true ? "ativo" : "desativado"}
          </Text>
        </View>

        <Switch
          thumbColor={isEnabled ? "#22c55e" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <View
        style={{
          padding: 25,
          display: "flex",
        }}
      >
        <Text style={{ fontSize: 18, marginBottom: 4 }}>
          Intervalo de comunicação
        </Text>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          {communicationTimes.map((time, i) => {
            return (
              <TimeButton
                text={time.text}
                key={time.text}
                index={i}
                timeInterval={time.interval}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}
