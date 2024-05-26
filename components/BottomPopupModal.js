import React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const BottomPopupModal = ({ visible, onClose, children }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <MaterialIcons name="close" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.childrenStyle}>
          {children}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    elevation: 5,
    height: '66%', // 2/3 of the screen height
    width: '100%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 15,
  },
  buttonText: {
    fontSize: 20,
  },
  childrenStyle: {
    width: '100%',
    padding: 20,
  },
});

export default BottomPopupModal;
