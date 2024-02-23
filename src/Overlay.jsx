/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */

import { forwardRef } from "react"

const Overlay = forwardRef(({ caption, scroll }, ref) => (
  <div
    ref={ref}
    onScroll={(e) => {
      scroll.current = e.target.scrollTop / (e.target.scrollHeight - window.innerHeight)
      caption.current.innerText = scroll.current.toFixed(2)
    }}
    className="scroll">
    <div style={{ height: "400vh"}}>
      <div className="dot">
        <h1 style={{letterSpacing: "-2px"}}>Hongzdang</h1>
        3D Modeler, Visual Artist
      </div>
    </div>
    <div style={{ height: "200vh" }}>
      <div className="dot">
        <h1>My Room</h1>
        Model 1
      </div>
    </div>
    <div style={{ height: "200vh" }}>
      <div className="dot">
        <h1>Model 2</h1>
        Model 2
      </div>
    </div>
    <div style={{ height: "200vh" }}>
      <div className="dot">
        <h1>Model 3</h1>
        Model 3
      </div>
    </div>
    <div style={{ height: "200vh" }}>
      <div className="dot">
        <h1>Model 4</h1>
        Model 4
      </div>
    </div>
    <div style={{ height: "200vh" }}>
      <div className="dot">
        <h1>Model 5</h1>
        Model 5
        </div>
    </div>
    <div style={{ height: "200vh" }}>
      <div className="dot">
        <h1>Model 6</h1>
        Model 6
      </div>
    </div>
    <span className="caption" ref={caption}>
      0.00
    </span>
  </div>
))

export default Overlay


export function Profile() {
  return (
    <div> 
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          padding: 40,
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          pointerEvents: "none",
        }}>
      <div style={{ width: "100%", padding: 0, display: "inline-flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
        <p
          style={{
            fontFamily: "'Antonio', sans-serif",
            flex: "1 1 0%",
            height: 30,
            fontSize: 30,
            fontWeight: "700",
            lineHeight: "30px",
            color: "black",
            letterSpacing: -2,
          }}>
          {/* Jiwon Hong */}
        </p>
      </div>
    </div>

    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: 40,
        pointerEvents: "all",
        pointer: "auto",
        width: "100%",
        padding: 40,
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
      }}>
      <p className="full" style={{ whiteSpace: "nowrap", flex: "1 1 0%", fontSize: 12, lineHeight: "1.5em", color: "black" }}>
        <b className="white-text" style={{fontSize: 20}}>Jiwon Hong</b>
        <br />
        <b className="white-text">Visual Art</b>
        <br />
        <b className="white-text">Inha University</b>
      </p>
      <p className="full" style={{ flex: "1 1 0%", fontSize: 12, lineHeight: "1em", textAlign: "right", color: "black" }}></p>
    </div>

    <div style={{ position: "fixed", bottom: 60, right: 70 }}>
      <p style={{ flex: "1 1 0%", fontSize: 12, lineHeight: "1em", textAlign: "right", color: "black" }}>
        <a className="white-text" href="http://instagram/hongz_dang">instagram</a>
        <a className="white-text" href="http://instagram/hongz_dang">twitter</a>
        <a className="white-text" href="http://instagram/hongz_dang">pinterest</a>
      </p>
    </div>
  </div>
  )
}
