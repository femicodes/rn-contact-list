import React, { useState, useEffect } from 'react';
import {
  Text, View, TextInput, SafeAreaView, Platform, FlatList,
  ActivityIndicator
} from 'react-native';
import * as Contacts from 'expo-contacts';
import styles from './styles';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [inMemoryContacts, setInMemoryContacts] = useState([]);

  const loadContact = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status !== 'granted') {
      return
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails]
    });
    setContacts(data);
    setInMemoryContacts(data);
  }

  const searchContacts = (value) => {
    const filterContacts = inMemoryContacts.filter(contact => {
      let contactLowercase = (`${contact.firstName} ${contact.lastName}`).toLowerCase();
      let searchTermLowercase = value.toLowerCase();

      return contactLowercase.indexOf(searchTermLowercase) > -1;
    });

    setContacts(filterContacts);
  }

  useEffect(() => {
    setLoading(true);
    loadContact();
    setLoading(false);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.contactsRender}>
      <Text style={styles.contactsName}>
        {item.firstName} {item.lastName}
      </Text>
      <Text style={styles.contactsNumber}>
        {item.phoneNumbers[0].digits}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} />
      <TextInput
        placeholder='Search'
        placeholderTextColor='#dddddd'
        style={styles.textInput}
        onChangeText={(value) => searchContacts(value)}
      />
      <View style={styles.contactContainer}>
        {loading ?
          (<View style={styles.loading}>
            <ActivityIndicator size='large' color='#bad555' />
          </View>) : null}
        <FlatList
          data={contacts}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (
            <View style={styles.emptyList}>
              <Text style={{ color: '#bad555' }}>No contacts found</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

export default App;
