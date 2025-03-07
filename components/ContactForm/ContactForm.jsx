import { Field, Form, Formik, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import css from "./contactForm.module.css";
import * as Yup from "yup";

export default function ContactForm({ onAdd }) {
  const initialValues = {
    name: "",
    number: "",
  };
  const FeedbackSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    number: Yup.string()
      .matches(/^\d{3}-\d{2}-\d{2}$/, "Format: 123-45-67")
      .required("Required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    onAdd({ id: nanoid(), ...values });
    resetForm();
  };

  const formatName = (value) => {
    if (!value) return "";
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, ""); // Видаляємо все, крім цифр
    const match = digits.match(/^(\d{0,3})(\d{0,2})(\d{0,2})$/);
    if (!match) return value;
    return [match[1], match[2], match[3]].filter(Boolean).join("-");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={FeedbackSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className={css.form}>
          <div className={css.formName}>
            <label>Name</label>
            <Field
              type="text"
              name="name"
              value={values.name}
              onChange={(e) =>
                setFieldValue("name", formatName(e.target.value))
              }
            />
            <ErrorMessage name="name" component="p" className={css.error} />
          </div>
          <div className={css.formNumber}>
            <label>Number</label>
            <Field
              name="number"
              value={values.number}
              onChange={(e) =>
                setFieldValue("number", formatPhoneNumber(e.target.value))
              }
            />
            <ErrorMessage name="number" component="p" className={css.error} />
          </div>
          <button type="submit" className={css.formBtn}>
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
}
