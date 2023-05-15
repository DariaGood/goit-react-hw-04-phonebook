import React, { Component } from 'react';
import { customAlphabet } from 'nanoid';
import styles from './contactForn.module.css';
import classNames from 'classnames';

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      number: '',
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeNumber = this.handleChangeNumber.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  classNames = require('classnames');

  handleFormSubmit(e) {
    e.preventDefault();

    const nanoid = customAlphabet('1234567890abcdef', 10);
    const id = nanoid();
    const newContact = {
      id,
      name: this.state.name,
      number: this.state.number,
    };
    this.props.onAddContact(newContact);
    this.setState({ name: '', number: '' });

  }

  handleChangeName(e) {
    this.setState({ name: e.target.value });
  }

  handleChangeNumber(e) {
    this.setState({ number: e.target.value });
  }

  render() {
    const { number, name } = this.state;

    const inputValidName = classNames(styles.inputContact, {
      [styles.invalid]: name === '', 
      [styles.valid]: name !== '',
    });

    const inputValidNumber = classNames(styles.inputContact, {
      [styles['invalid']]: typeof number !== 'number' || number < '',
      [styles['valid']]: typeof number === 'number' && !Number.isNaN(number),
    });

    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <input
            className={inputValidName}
            placeholder="name"
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleChangeName}
            value={this.state.name}
          ></input>
          <input
            className={inputValidNumber}
            placeholder="phone number"
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleChangeNumber}
            value={this.state.number}
          />
          <button className={styles.btnFormSubmit} type="submit">
            Add contact
          </button>
        </form>
      </div>
    );
  }
}


export default ContactForm;
