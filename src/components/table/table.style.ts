import { createUseStyles } from "react-jss";
import { CustomTheme } from "../../common/custom-theme";

export const useStyles = createUseStyles<CustomTheme>({
    table: {
      background: ({ theme }) => theme.background,
      border:({ theme }) => `1px solid ${theme.borderColor}`,
    },
    headerContainer : {
        display:'flex',
        flexDirection:'row',
        backgroundColor:({ theme }) => theme.borderColor,
    },
    header: {
        flex: '0 1 33.333%',
        padding:'16px',
        fontWeight:'bold'
    },
    dataContainer : {
    },
    row : {
        display:'flex',
        flexDirection:'row'
    },
    cell : {
        flex: '0 1 33.333%',
        padding:'16px'
    }
  });