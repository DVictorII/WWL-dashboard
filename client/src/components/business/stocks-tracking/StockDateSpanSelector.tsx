import SwitchSelector from "react-switch-selector";
import { useStockTrackingStateStore } from "../../../store/StockTrackingStateStore";

const options = [
  {
    label: "5D",
    value: 5,
    fontColor: "#333",
    selectedFontColor: "#ffffff",
  },
  {
    label: "7D",
    value: 7,
    fontColor: "#333",
    selectedFontColor: "#ffffff",
  },
  {
    label: "1M",
    value: 31,
    fontColor: "#333",
    selectedFontColor: "#ffffff",
  },
  {
    label: "6M",
    value: 180,
    fontColor: "#333",
    selectedFontColor: "#ffffff",
  },
  {
    label: "1Y",
    value: 365,
    fontColor: "#333",
    selectedFontColor: "#ffffff",
  },
];

function StockDateSpanSelector() {
  const changeDaysSpan = useStockTrackingStateStore((s) => s.changeDaysSpan);

  const onChange = (newValue: any) => {
    changeDaysSpan(newValue);
  };

  const initialSelectedIndex = options.findIndex(({ value }) => value === 5);

  return (
    <div className="h-10 font-semibold">
      <SwitchSelector
        onChange={onChange}
        options={options}
        initialSelectedIndex={initialSelectedIndex}
        selectedBackgroundColor="#1c394a"
      />
    </div>
  );
}

export default StockDateSpanSelector;
