import { IoIosContact } from "react-icons/io";
import { FaPhone } from "react-icons/fa";
import css from "./contact.module.css";

export default function Contact({ data: { id, name, number }, onDelete }) {
  return (
    <div className={css.contactContainer}>
      <div className={css.contact}>
        <p className={css.name}>
          <IoIosContact />
          {name}
        </p>
        <p className={css.phone}>
          <FaPhone />
          {number}
        </p>
      </div>
      <button onClick={() => onDelete(id)} className={css.btnDelete}>
        Delete
      </button>
    </div>
  );
}
