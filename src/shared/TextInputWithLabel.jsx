import styles from './TextInputWithLabel.module.css';

function TextInputWithLabel({
  elementId,
  label,
  onChange,
  ref,
  value,
  placeholder,
}) {
  return (
    <div className={styles.container}>
      <label htmlFor={elementId} className={styles.label}>
        {label}
      </label>
      <input
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
}

export default TextInputWithLabel;
