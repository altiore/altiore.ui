import { withStyles } from '@material-ui/core/styles';

import { PageJsx } from './page';
import { styles } from './styles';

import { withResize } from '@hooks/withResize';

export const Page = withResize(withStyles(styles, { withTheme: true })(PageJsx));
