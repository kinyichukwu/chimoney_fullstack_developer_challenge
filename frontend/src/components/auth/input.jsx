export const Input = ({
  type = "text",
  name = "name",
  value = "john",
  onChange = () => {},
  placeholder = "john",
  required = true,
}) => {
  return (
    <div>
      <label className="block text-sm leading-6 text-start text-gray-600">
        {name}
      </label>
      <div className="mt-2">
        <input
          name={name}
          type={type}
          autoComplete="email"
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="block w-full rounded-md border-0 py-1.5 px-3
   text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
    placeholder:text-gray-400 focus:ring-2 focus:ring-inset
     focus:ring-[#00d8709c] sm:text-sm sm:leading-6 outline-none"
        />
      </div>
    </div>
  );
};
