import { createUseStyles } from "react-jss";
import { CustomTheme } from "../../common/custom-theme";

export const useStyles = createUseStyles<CustomTheme>({
    stars : {
        color:"#55acee"
    },
    forks : {
        color:"#cd201f"
    }
  });