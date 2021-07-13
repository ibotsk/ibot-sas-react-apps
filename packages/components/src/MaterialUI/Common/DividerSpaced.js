import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

const DividerSpaced = withStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))(Divider);

export default DividerSpaced;
