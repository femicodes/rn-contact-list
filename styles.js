import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#2f363c',
    paddingTop: Platform.OS === 'android' ? 30 : 0
  },
  container: {
    flex: 1,
  },
  textInput: {
    backgroundColor: '#2f363c',
    height: Platform.OS === 'android' ? 70 : 50,
    fontSize: 36,
    padding: 10,
    color: 'white',
    borderBottomWidth: 0.5,
    borderBottomColor: '#7d90a0'
  },
  contactContainer: {
    flex: 1,
    backgroundColor: '#2f363c'
  },
  loading: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyList: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  contactsRender: {
    minHeight: 70,
    padding: 5,
  },
  contactsName: {
    color: '#bad555',
    fontWeight: 'bold',
    fontSize: 26
  },
  contactsNumber: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default styles;
