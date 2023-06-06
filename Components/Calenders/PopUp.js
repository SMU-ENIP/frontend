import Modal from "react-native-modals";
import { View, Button, Image } from "react-native";

const PopUp = (props) => {
    return(
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <Image
                    source = {props.popUpImage}
                ></Image>
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="Cancel" onPress={props.onCancel} />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default PopUp;