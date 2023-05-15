import React, { useState } from 'react';
import { customAlphabet } from 'nanoid';
import styles from './contactForn.module.css';
import classNames from 'classnames';

const ContactForm = ({ onAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const nanoid = customAlphabet('1234567890abcdef', 10);
    const id = nanoid();
    const newContact = {
      id,
      name,
      number,
    };
    onAddContact(newContact);
    setName('');
    setNumber('');
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeNumber = (e) => {
    setNumber(e.target.value);
  };

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
      <form onSubmit={handleFormSubmit}>
        <input
          className={inputValidName}
          placeholder="name"
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChangeName}
          value={name}
        ></input>
        <input
          className={inputValidNumber}
          placeholder="phone number"
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleChangeNumber}
          value={number}
        />
        <button className={styles.btnFormSubmit} type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
};

export default ContactForm;