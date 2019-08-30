import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { FormGroup, Input } from 'reactstrap';

const FormGroupInput = ({
  error,
  type,
  placeholder,
  name,
  onChange
}) => (
  <FormGroup>
    <Input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className={classnames({'is-invalid': error})}
    />
    {
      error && (
        <div className='invalid-feedback'>{error}</div>
      )
    }
  </FormGroup>
);

FormGroupInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

FormGroupInput.defaultProps = {
  type: 'text',
  placeholder: ''
};

export default FormGroupInput;
