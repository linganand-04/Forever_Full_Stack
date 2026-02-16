function InputForm({
  name,
  type,
  placeholder,
  style,
  important = false,
  value,
  handlers,
  length,
}) {
  return (
    <>
      <input
        name={name}
        value={value}
        onChange={handlers}
        required={important}
        className={style}
        type={type}
        placeholder={placeholder}
        maxLength={length}
      />
    </>
  );
}

export default InputForm;
