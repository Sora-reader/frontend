import { HTMLAttributes, useCallback, useMemo } from 'react';
import { AppBar, createStyles, makeStyles, Tab, Tabs, Theme, useTheme } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { useRouter } from 'next/router';
import { shallowNavigate } from '../common/router';

interface TabPanelProps extends HTMLAttributes<any> {
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index ? children : ''}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

type Props = {
  panelNames: Array<string>;
  children: Array<JSX.Element>;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      boxShadow: 'none',
    },
    tab: {
      backgroundColor: theme.palette.background.paper,
    },
    tabPanel: {
      minHeight: '100vh',
    },
  })
);

export function SwipeableTabs({ panelNames, children }: Props) {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();
  const queryTab = router.query?.tab;

  const value = useMemo(() => {
    const queryValue = Number(queryTab);
    if ([0, 1].includes(queryValue)) {
      return queryValue;
    }
    return 0;
  }, [queryTab]);

  const changeTab = useCallback(
    (value: number) => {
      shallowNavigate(router, `${router.asPath.split('?')[0]}?tab=${value}`, 'replace');
    },
    [router]
  );
  const handleChange = useCallback(
    (_, newValue: number) => {
      changeTab(newValue);
    },
    [changeTab]
  );

  return (
    <>
      <AppBar position="static" color="default" className={classes.appBar}>
        <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" variant="fullWidth">
          {panelNames.map((label, index) => (
            <Tab className={classes.tab} key={index} label={label} {...a11yProps(index)} />
          ))}
        </Tabs>
      </AppBar>
      <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={changeTab}>
        {children.map((jsx, index) => (
          <TabPanel key={index} className={classes.tabPanel} value={value} index={index} dir={theme.direction}>
            {jsx}
          </TabPanel>
        ))}
      </SwipeableViews>
    </>
  );
}
