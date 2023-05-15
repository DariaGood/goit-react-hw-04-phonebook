import React, { useState, useEffect } from 'react';
import ContactForm from './contactForm/ContactForm';
import ContactList from './contactList/ContactList';
import Filter from './filter/Filter';
import styles from './app.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts'));
    return storedContacts || [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (newContact) => {
    if (
      contacts.some((contact) =>
        contact.name.toLowerCase().includes(newContact.name.toLowerCase())
      )
    ) {
      return alert(`${newContact.name} is already in contacts`);
    } else {
      const updatedContacts = [...contacts, newContact];
      setContacts(updatedContacts);
    }
  };

  const deleteContact = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
  };

  const handleChangeFilterValue = (e) => {
    setFilter(e.target.value);
  };

  const checkFilterListContacts = () => {
    const filterValue = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filterValue)
    );
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        paddingTop: '50px',
        paddingBottom: '50px',
        margin: '0 auto',
        color: '#010101',
      }}
    >
      <div className={styles.form}>
        <h1 className={styles.titles}>Phonebook</h1>
        <ContactForm onAddContact={addContact} />
      </div>
      <h2 className={styles.titles}>Contacts</h2>
      <Filter
        filter={filter}
        handleChangeFilterValue={handleChangeFilterValue}
      />
      <ContactList
        filterListContacts={checkFilterListContacts()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};

