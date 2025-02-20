export function Slider({ min, max, step, value, onChange }) {
    return (
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="w-full cursor-pointer"
      />
    );
  }
  