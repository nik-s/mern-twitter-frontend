import React, { useState } from 'react'
import PropTypes from 'prop-types'

/**
 * TODO: handle errors
 */
const TextField = ({
  disabled,
  errorMessage,
  handleChange,
  handleValidation,
  id,
  label,
  required,
  showLength,
  testId,
  type,
  value,
}) => {
  const [val, setVal] = useState(value || '')
  const [touched, setTouchedStatus] = useState(false)
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        data-testid={testId}
        disabled={disabled}
        id={id}
        onBlur={e => {
          if (!touched) setTouchedStatus(true)
          handleChange(e.target.value)
          if (typeof handleValidation === 'function') {
            handleValidation(e.target.value)
          }
        }}
        onChange={e => {
          setVal(e.target.value)
        }}
        required={required}
        type={type}
        value={val}
      />
      {errorMessage && <div data-testid="input-error">{errorMessage}</div>}
      {showLength && (
        <div
          style={{
            color: val.length === 0 || val.length > 140 ? 'red' : '',
          }}
        >
          {val.length}
        </div>
      )}
    </div>
  )
}

TextField.propTypes = {
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleValidation: PropTypes.func,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  showLength: PropTypes.bool,
  testId: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
}

TextField.defaultProps = {
  disabled: false,
  required: false,
  testId: 'input',
  type: 'text',
}

export default TextField
