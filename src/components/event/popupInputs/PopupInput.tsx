import "./PopupInput.css";

type EventPopupInputProps = {
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string | number;
  className?: string;
};

const EventPopupInput: React.FC<EventPopupInputProps> = ({
  label,
  value,
  onChange,
  placeholder = "",
  className = "",
}) => {
  return (
    <div className={`popup-input ${className}`}>
      <label>{label}</label>
      {typeof value === "string" ? (
        <input
          type="text"
          placeholder={placeholder as string}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input type="number" value={value} onChange={onChange} />
      )}
    </div>
  );
};

export default EventPopupInput;
