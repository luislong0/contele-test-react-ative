import { Text, View, ScrollView } from "react-native";
import { Header } from "../../components/Header";
import { PackageInfoBox } from "../../components/PackageInfoBox";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../store";

export default function Status() {
  const [pointIds, setPointIds] = useState([]);
  const [communicationData, setCommunicationData] = useState([]);

  const storedLocations = useAppSelector((state) => {
    return state.communication.storedLocations;
  });

  useEffect(() => {
    async function fetchPointIds() {
      try {
        const response = await axios.get(`http://127.0.0.1:8081/points/`);
        setPointIds(response.data.keys);
      } catch (error) {
        console.error("Erro ao buscar IDs dos pontos:", error);
      }
    }

    fetchPointIds();
    console.log(storedLocations);
  }, []);

  useEffect(() => {
    async function fetchCommunicationData(id) {
      console.log("ID: " + id);
      try {
        const response = await axios.get(`http://127.0.0.1:8081/points/${id}`);
        console.log(response.data)
        setCommunicationData((prevData) => [...prevData, response.data.points]);
      } catch (error) {
        console.error("Erro ao buscar dados de comunicação:", error);
      }
    }

    if (pointIds.length > 0) {
      pointIds.forEach((id) => {
        fetchCommunicationData(id);
        console.log(communicationData)
      });
    }
  }, [pointIds]);

  return (
    <View
      style={{
        backgroundColor: "#f4f4f5",
        flex: 1,
      }}
    >
      <Header pageNumber={2} />
      <SafeAreaView
        style={{
          paddingHorizontal: 20,
        }}
      >
        <ScrollView style={{ borderTopWidth: 1, borderTopColor: "#d4d4d8" }}>
          {storedLocations.map((point, i) => (
            <PackageInfoBox
              key={i}
              id={point.id}
              time={point.time}
              success={false}
            />
          ))}
          {communicationData.map((point, i) => (
            <PackageInfoBox
              key={i}
              id={point[0].id}
              time={point[0].time}
              success={true}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
