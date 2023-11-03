import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native";
import { useAppDispatch, useAppSelector } from "../store";
import { save } from "../store/slices/communication";

interface TimeButtonProps {
  text: string
  index: number
  timeInterval: number
}

export function TimeButton({text, index, timeInterval}: TimeButtonProps) {
  const dispatch = useAppDispatch();
  const time = useAppSelector((state) => {
    return state.communication.currentCommunicationIntervalNumber;
  });

  function handleChangeInterval() {
    dispatch(save([index, timeInterval]));
  }

  const isActivated = index === time

  return isActivated === true ? (
    <TouchableOpacity
      style={{
        backgroundColor: "#bbf7d0",
        maxWidth: 70,
        minWidth: 70,
        width: "auto",
        minHeight: 70,
        maxHeight: 70,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#16a34a",
      }}
    >
      <Text style={{ fontSize: 18, color: "black" }}>{text}</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={{
        backgroundColor: "#e4e4e7",
        maxWidth: 70,
        minWidth: 70,
        width: "auto",
        minHeight: 70,
        maxHeight: 70,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#71717a",
      }}
      onPress={handleChangeInterval}
    >
      <Text style={{ fontSize: 18, color: "#71717a" }}>{text}</Text>
    </TouchableOpacity>
  );
}