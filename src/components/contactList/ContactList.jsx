import React from 'react';
import styles from './contactList.module.css';
import PropTypes from 'prop-types';

function ContactList(props) {
  const { onDeleteContact, filterListContacts } = props;

  return (
    <div>
      <ul className={styles.contactList}>
        {filterListContacts.map(item => (
          <li className={styles.contactItem} key={item.id}>
            <div>
              {item.name}: {item.number}
            </div>
            <button
              className={styles.btnDeleteContact}
              onClick={() => onDeleteContact(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

ContactList.propTypes = {
  filterListContacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
