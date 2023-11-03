import { Link } from "expo-router";
import { Text, View } from "react-native";

interface HeaderProps {
  pageNumber: number
}

export function Header({ pageNumber }: HeaderProps) {
  return (
    <View
      style={{
        backgroundColor: "#1e40af",
        padding: 22,
      }}
    >
      {pageNumber === 1 ? (
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <Text
            style={{
              color: "#bfdbfe",
              fontSize: 18,
            }}
          >
            Olá, bem-vindo
          </Text>
          <Link href={"/status"} asChild>
            <Text
              style={{
                color: "white",
                fontWeight: "500",
                fontSize: 18,
              }}
            >
              Status
            </Text>
          </Link>
        </View>
      ) : (
        <View style={{ flexDirection: "row" }}>
          <Link href={'/'} asChild>
            <Text
              style={{
                color: "#bfdbfe",
                flex: 1,
                fontSize: 18,
              }}
            >
              Voltar
            </Text>
          </Link>

          <Text
            style={{
              color: "white",
              fontWeight: "500",
              flex: 1,
              textAlign: "center",
              fontSize: 18,
            }}
          >
            Status
          </Text>
          <Text
            style={{
              color: "white",
              flex: 1,
            }}
          >
            {/* Este texto está aqui apenas para balancear o layout, deixando-o vazio */}
          </Text>
        </View>
      )}
    </View>
  );
}
