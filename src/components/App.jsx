import React, { Component } from 'react';
import ContactForm from './contactForm/ContactForm';
import ContactList from './contactList/ContactList';
import Filter from './filter/Filter';
import styles from './app.module.css';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: JSON.parse(localStorage.getItem('contacts')) || [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
      filter: '',
    };
    this.addContact = this.addContact.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.handleChangeFilterValue = this.handleChangeFilterValue.bind(this);
    this.checkFilterListContacts = this.checkFilterListContacts.bind(this);
  }

  componentDidMount() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  addContact(newContact) {
    if (
      this.state.contacts.some(contact =>
        contact.name.toLowerCase().includes(newContact.name.toLowerCase())
      )
    ) {
      return alert(`${newContact.name} is already in contacts`);
    } else {
      const updatedContacts = [...this.state.contacts, newContact];
      this.setState({ contacts: updatedContacts });
    }
  }

  deleteContact(id) {
    const updatedContacts = this.state.contacts.filter(
      contact => contact.id !== id
    );
    this.setState({ contacts: updatedContacts });
  }

  handleChangeFilterValue(e) {
    this.setState({ filter: e.target.value });
  }

  checkFilterListContacts() {
    const filterValue = this.state.filter.toLowerCase();

    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterValue)
    );
  }

  render() {
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
          <ContactForm onAddContact={this.addContact} />
        </div>
        <h2 className={styles.titles}>Contacts</h2>
        <Filter
          filter={this.state.filter}
          handleChangeFilterValue={this.handleChangeFilterValue}
        />
        <ContactList
          filterListContacts={this.checkFilterListContacts()}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
