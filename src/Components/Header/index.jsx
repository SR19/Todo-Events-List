import React from "react";
import "../../styles.css";

export default function index({ setUserType }) {
  return (
    <div className="Header">
      {" "}
      <p>
        Select User Type:
        <label>
          <input
            type="radio"
            name="myRadio"
            value="user"
            onChange={(e) => setUserType(e.target.value)}
          />
          User
        </label>
        <label>
          <input
            type="radio"
            name="myRadio"
            value="admin"
            defaultChecked={true}
            onChange={(e) => setUserType(e.target.value)}
          />
          Admin
        </label>
      </p>
    </div>
  );
}
