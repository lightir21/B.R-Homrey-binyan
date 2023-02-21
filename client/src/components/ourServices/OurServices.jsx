import "./ourServices.scss";
import { BsFillKeyFill } from "react-icons/bs";
import { MdHomeRepairService } from "react-icons/md";
import { FaTruckMoving } from "react-icons/fa";

const OurServices = () => {
  return (
    <div className="ourServices">
      <div className="ourServices__box">
        <FaTruckMoving className="ourServices__icon" />
        <p className="ourServices__text">משלוחים</p>
      </div>
      <div className="ourServices__box">
        <MdHomeRepairService className="ourServices__icon" />
        <p className="ourServices__text">תיקונים</p>
      </div>
      <div className="ourServices__box">
        <BsFillKeyFill className="ourServices__icon" />
        <p className="ourServices__text">
          שיכפול
          <br />
          מפתחות
        </p>
      </div>
    </div>
  );
};
export default OurServices;
