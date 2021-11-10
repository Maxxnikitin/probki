import React from "react";
import ReactSlider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from "./input-range.module.css";

export const InputRange = ({
  title = "",
  kind = "form",
  placeholder,
  label,
  extraClass = "",
}) => {
  const [from, setFrom] = React.useState(0);
  const [to, setTo] = React.useState(20);

  const handleRangeFrom = (val) => {
    return `${val}`;
  }
  const handleRangeTo = (val) => {
    return `${val}`;
  }

  return (
    <div className={`${styles.content} ${extraClass}`}>
      <p className="text text_type_medium text_color_secondary">{title}</p>
      <p>{from}</p>
      <p>{to}</p>
      {/* <ReactSlider.Range
        defaultValue={[10, 90]}
        value={[10, 65]}
        ariaLabelGroupForHandles={["eee", "ttt"]}
        ariaLabelledByGroupForHandles={["rrr", "yyy"]}
        ariaValueTextFormatterGroupForHandles={[handleRangeFrom, handleRangeTo]}
        onChange={handleRangeFrom}
      /> */}
      <ReactSlider.Range
            min={0}
            max={30}
            value={20}
            allowCross={false}
            pushable
            step={1}
            // onChange={this.onChange}
          />
          <ReactSlider
            min={0}
            max={30}
            value={10}
            step={1}
            // onChange={this.onChange}
          />
          <div className="text">
            <div className="from">{0}</div>
            <div className="to">{30}</div>
          </div>
    </div>
  );
};
