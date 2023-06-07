import { View, Button, Image, ScrollView, Modal } from "react-native";

const PopUp = (props) => {
    return(
        <Modal visible={props.visible} animationType="slide">
            <ScrollView>
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
            </ScrollView>
            
        </Modal>
    );
}

export default PopUp;