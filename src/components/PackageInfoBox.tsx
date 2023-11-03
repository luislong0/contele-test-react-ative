import { View, Text } from "react-native";
import { format, utcToZonedTime } from "date-fns-tz";

interface PackageInfoBoxProps {
  id: string;
  time: string;
  success: boolean;
}

export function PackageInfoBox({ id, time, success }: PackageInfoBoxProps) {
  const timeZone = "America/Sao_Paulo";
  const zonedDate = utcToZonedTime(time, timeZone);
  const formattedDate = format(zonedDate, "HH:mm", { timeZone });

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        borderBottomWidth: 1,
        borderBottomColor: "#d4d4d8",
        paddingVertical: 20,
      }}
    >
      <View>
        <Text style={{ fontSize: 18, marginBottom: 4, maxWidth: 250 }}>
          Pacote ID: {id}
        </Text>
        <Text>{success === true ? "Sincronizado" : "Pendente a sincronizar"}</Text>
      </View>

      <Text style={{ color: "#71717a" }}>{formattedDate}</Text>
    </View>
  );
}