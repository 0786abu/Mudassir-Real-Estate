import React from "react";
import { Range, getTrackBackground } from "react-range";
import { useDispatch, useSelector } from "react-redux";
import { Col, FormGroup, Label } from "reactstrap";
import { setPrice, setArea } from "@/redux-toolkit/reducers/inputsReducer";  

const RangeInputFields = ({ label, min, max, sm, lg }) => {
  const { price, area } = useSelector((state) => state.inputsReducer);
  const dispatch = useDispatch();

  // Step value
  const STEP = 1;

  return (
    <Col lg={lg || 12} sm={sm || 12}>
      <FormGroup>
        <div className='price-range'>
          <Label>
            {label}
          </Label>
          <div className='theme-range-3' id={label === "Price" ? "slider-1" : "slider-2"}>
            <Range
              values={[0,100000000]}
              step={STEP}
              min={min}
              max={max}
              onChange={(vals) => dispatch(setPrice(vals[0]))}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "5px",
                    width: "100%",
                    borderRadius: "4px",
                    background: getTrackBackground({
                      values: [0,100000000],
                      colors: ["#ccc", "var(--theme-default2)", "#ccc"],
                      min: min,
                      max: max,
                    }),
                    alignSelf: "center",
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => {
                const { key, ...restProps } = props;
                const prop = { ...restProps };
                return (
                  <div key={key} {...prop}>
                    <div
                      style={{
                        height: "16px",
                        width: "8px",
                        borderRadius: "30%",
                        backgroundColor: "var(--theme-default2)",
                      }}
                    />
                  </div>
                );
              }}
            />
          </div>
        </div>
      </FormGroup>
    </Col>
  );
};

export default RangeInputFields;
