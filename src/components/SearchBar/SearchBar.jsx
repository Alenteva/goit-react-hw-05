import { Field, Form, Formik } from 'formik';
import { HiOutlineSearch } from 'react-icons/hi';
import css from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (values, actions) => {
    const formattedSearch = values.query.trim().toLowerCase(); // змінено з 'values.search' на 'values.query'
    onSubmit(formattedSearch);
    actions.resetForm();
  };

  return (
    <div className={css['SearchBarBox']}>
      <Formik
        initialValues={{ query: '' }}
        onSubmit={handleSubmit} // використання функції handleSubmit
      >
        <Form className={css['FormContainer']}>
          <HiOutlineSearch />
          <Field
            className={css['SearchInput']}
            placeholder="Search movie"
            type="text"
            name="query"
          />
          <button className={css['SearchBtn']} type="submit">
            Search
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchBar;
