import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import "../Styles/toast.css";

import { useToast } from "../Contexts/toastContext";

export default function Toast() {

    const { toastDisplay, title} = useToast();

    return(
        <div className="toast" style={{display : toastDisplay}}>
            <div className="flx">
                <CheckCircleOutlineIcon />
                <p className="toast-msg">
                    {title} successfully
                </p>
            </div>
        </div>
    )
}
